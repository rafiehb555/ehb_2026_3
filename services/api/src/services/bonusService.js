// Bonus Service — v3.2 §12.7 (All 11 bonuses)
//
// Spec: ehb-info/departments/Affiliate.md §12.7 (v3.2)
// Founder lock: 2026-04-25
//
// MVP Phase 1 active: First Sale, STL Purchase, Fast Sale (in affiliateService.js)
// Phase 2 added in this file:
//   • Matching Bonus       (continuous, on every downline product/industry commission)
//   • Activation Bonus     (one-time, on referral's first purchase)
//   • Team Performance     (monthly, when team sale ≥ $100K)
//   • Retention Bonus      (per 3-month cycle, +1% uplift, max +2%)
//   • Monthly Leader Bonus (top 10 per country per month)
//   • Super Franchise Bonus (override on team sales for active franchise holders)
//   • Global Pool Bonus    (R8+ profit share, monthly)
//
// Some bonuses are scheduler-driven (Phase 2 cron job runs monthly).
// MVP exposes manual trigger endpoints + admin override.

import mongoose from 'mongoose';
import Affiliate from '../models/Affiliate.js';
import AffiliateCommission from '../models/AffiliateCommission.js';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import { isConnected } from '../config/db.js';
import { logActivity } from './auditService.js';
import { creditAffiliateWallet } from './affiliateWalletService.js';
import { applyCapAndLog } from './cappingService.js';

// ─── BONUS CONFIG (admin-tunable in Phase 2) ─────────────────────────────

export const BONUS_CONFIG = {
  matching:        { l1: 0.05, l2: 0.03, l3: 0.02, scope: ['direct', 'level'] }, // matches downline product+industry only
  activation:      { percent: 0.02 },
  teamPerformance: { thresholdMonthlyUsd: 100_000, percent: 0.02, period: 'monthly' },
  retention:       { monthsPerStep: 3, upliftPercent: 1, maxUpliftPercent: 2 },
  monthlyLeader:   { topN: 10, scopePerCountry: true, primaryMetric: 'salesVolume' },
  superFranchise:  { overridePercent: 0.02, requiresActiveFranchise: true },
  globalPool:      { sourceField: 'netProfit', percent: 0.01, minRank: 'R8', distribution: 'weighted' },
};

// ─── HELPERS ─────────────────────────────────────────────────────────────

function startOfUtcMonth(date = new Date()) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}

function rankIndex(r) {
  return ['R1','R2','R3','R4','R5','R6','R7','R8','R9','R10'].indexOf(r || 'R1');
}

/** Insert a bonus commission + bump aggregates + credit wallet. Idempotent if duplicate-keyed. */
async function awardBonus({ earnerUserId, sourceUserId, type, amountUsd, notes, orderId }) {
  if (!amountUsd || amountUsd <= 0) return { ok: false, reason: 'amount_zero' };

  // Cap check before crediting
  const { allowed, overflow, reason } = await applyCapAndLog(earnerUserId, amountUsd, {
    source: type,
    orderId,
  });
  if (allowed <= 0) {
    return { ok: false, reason: `capped:${reason}`, overflowUsd: overflow };
  }

  const finalNotes = overflow > 0
    ? `${notes || ''} · cap_trimmed:${reason} · overflow $${overflow.toFixed(2)}`
    : notes || '';

  const comm = await AffiliateCommission.create({
    earnerUserId,
    sourceUserId,
    type,
    track: null,
    amountUsd: allowed,
    rateApplied: null,
    status: 'paid',
    paidAt: new Date(),
    notes: finalNotes,
    orderId: orderId || undefined,
  });

  await Affiliate.updateOne(
    { userId: earnerUserId },
    {
      $inc: {
        'stats.lifetimeEarningsUsd': allowed,
        'stats.thisMonthEarningsUsd': allowed,
      },
    }
  );

  await Transaction.create({
    toUserId: earnerUserId,
    type: 'commission_credit',
    currency: 'USD',
    amount: allowed,
    status: 'completed',
    referenceType: `affiliate_${type}`,
    notes: finalNotes,
  });

  try {
    await creditAffiliateWallet(earnerUserId, allowed, { source: type, sourceUserId, orderId });
  } catch (e) {
    console.warn(`[bonus] wallet credit failed for ${type}:`, e.message);
  }

  return { ok: true, amountUsd: allowed, overflowUsd: overflow, commissionId: comm._id };
}

// ─── 1. MATCHING BONUS — continuous, on every downline product/industry commission ──

/**
 * Matching Bonus per spec §12.7 #3.
 * 5% / 3% / 2% across 3 levels of downline earnings.
 * SCOPE: only Track A 'direct' and 'level' commissions (NOT STL/Rank/Franchise — prevents stacking).
 *
 * Triggered after each Track A commission is credited (called from affiliateService).
 */
export async function applyMatchingBonus({ downlineEarnerId, downlineEarningUsd, downlineCommissionType, orderId }) {
  if (!isConnected()) return { distributed: 0 };

  // Scope check — only apply on Track A direct/level
  const scope = BONUS_CONFIG.matching.scope;
  if (!scope.includes(downlineCommissionType)) {
    return { distributed: 0, note: `scope_excluded:${downlineCommissionType}` };
  }

  // Build upline chain of the DOWNLINE EARNER (not the buyer)
  const downlineAff = await Affiliate.findOne({ userId: downlineEarnerId }).lean();
  if (!downlineAff) return { distributed: 0 };

  const chain = [downlineAff.referredBy, ...(downlineAff.upstream || [])].filter(Boolean);
  const distributed = [];

  for (let i = 0; i < Math.min(chain.length, 3); i++) {
    const upstreamId = chain[i];
    const lvl = i + 1;
    const rate = BONUS_CONFIG.matching[`l${lvl}`];
    if (!rate) continue;

    const matchAmount = downlineEarningUsd * rate;
    if (matchAmount <= 0) continue;

    const result = await awardBonus({
      earnerUserId: upstreamId,
      sourceUserId: downlineEarnerId,
      type: 'matching',
      amountUsd: matchAmount,
      notes: `match_L${lvl}_${(rate * 100).toFixed(1)}%_of_$${downlineEarningUsd.toFixed(2)}`,
      orderId,
    });
    if (result.ok) distributed.push(result);
  }

  return { distributed: distributed.length, totalUsd: distributed.reduce((a, b) => a + b.amountUsd, 0) };
}

// ─── 2. ACTIVATION BONUS — one-time on referral's first purchase ─────────

export async function applyActivationBonus({ buyerUserId, referrerUserId, purchaseAmountUsd, orderId }) {
  if (!isConnected()) return { ok: false };
  if (!referrerUserId) return { ok: false, reason: 'no_referrer' };

  // Idempotency: only one activation bonus per (referrer, buyer)
  const existing = await AffiliateCommission.findOne({
    earnerUserId: referrerUserId,
    sourceUserId: buyerUserId,
    type: 'activation',
  });
  if (existing) return { ok: false, reason: 'already_activated' };

  const amount = purchaseAmountUsd * BONUS_CONFIG.activation.percent;
  return awardBonus({
    earnerUserId: referrerUserId,
    sourceUserId: buyerUserId,
    type: 'activation',
    amountUsd: amount,
    notes: `activation_2pct_of_$${purchaseAmountUsd.toFixed(2)}`,
    orderId,
  });
}

// ─── 3. TEAM PERFORMANCE BONUS — monthly, when team sale ≥ $100K ─────────

export async function evaluateTeamPerformanceBonus(userId, { period = 'monthly' } = {}) {
  if (!isConnected()) return { ok: false };

  const aff = await Affiliate.findOne({ userId }).lean();
  if (!aff) return { ok: false, reason: 'no_affiliate' };

  // Sum team's monthly sale volume (sourceUserId is downline — directs + transitive in upstream)
  const since = startOfUtcMonth();

  // Find all users where this user is in their upstream chain (i.e., team)
  const teamAffiliates = await Affiliate.find({ upstream: aff.userId }).select('userId').lean();
  const teamUserIds = teamAffiliates.map((a) => a.userId);

  if (teamUserIds.length === 0) return { ok: false, reason: 'no_team' };

  const result = await AffiliateCommission.aggregate([
    {
      $match: {
        sourceUserId: { $in: teamUserIds },
        status: 'paid',
        paidAt: { $gte: since },
        type: { $in: ['direct', 'level'] },
      },
    },
    { $group: { _id: null, totalSalesUsd: { $sum: '$productPriceUsd' } } },
  ]);
  const teamSalesUsd = result[0]?.totalSalesUsd || 0;

  if (teamSalesUsd < BONUS_CONFIG.teamPerformance.thresholdMonthlyUsd) {
    return {
      ok: false,
      reason: `below_threshold:${teamSalesUsd}/${BONUS_CONFIG.teamPerformance.thresholdMonthlyUsd}`,
    };
  }

  // Idempotency: one Team Performance Bonus per user per month
  const monthKey = `${new Date().getUTCFullYear()}-${String(new Date().getUTCMonth() + 1).padStart(2, '0')}`;
  const existing = await AffiliateCommission.findOne({
    earnerUserId: userId,
    type: 'team_performance',
    notes: { $regex: monthKey },
  });
  if (existing) return { ok: false, reason: 'already_paid_this_month' };

  // Bonus = 2% of team volume above threshold
  const above = teamSalesUsd - BONUS_CONFIG.teamPerformance.thresholdMonthlyUsd;
  const bonusAmount = above * BONUS_CONFIG.teamPerformance.percent;

  return awardBonus({
    earnerUserId: userId,
    type: 'team_performance',
    amountUsd: bonusAmount,
    notes: `team_perf_${monthKey}_2pct_of_$${above.toFixed(2)}_above_threshold`,
  });
}

// ─── 4. RETENTION BONUS — +1% uplift per 3 months active, max +2% ────────

export async function evaluateRetentionUplift(userId) {
  if (!isConnected()) return { upliftPercent: 0 };

  const aff = await Affiliate.findOne({ userId }).lean();
  if (!aff || !aff.activatedAt) return { upliftPercent: 0 };

  const monthsActive = Math.floor((Date.now() - new Date(aff.activatedAt).getTime()) / (30 * 86_400_000));
  const stepsEarned = Math.floor(monthsActive / BONUS_CONFIG.retention.monthsPerStep);
  const uplift = Math.min(stepsEarned * BONUS_CONFIG.retention.upliftPercent, BONUS_CONFIG.retention.maxUpliftPercent);

  return { upliftPercent: uplift, monthsActive, stepsEarned };
}

// ─── 5. MONTHLY LEADER BONUS — top 10 per country per month ──────────────

export async function awardMonthlyLeaderBonuses({ country, prizeUsdEach = 100 } = {}) {
  if (!isConnected()) return { awarded: 0 };

  const since = startOfUtcMonth();
  const monthKey = `${new Date().getUTCFullYear()}-${String(new Date().getUTCMonth() + 1).padStart(2, '0')}`;

  // Aggregate this-month sales volume per affiliate (driven by team sales)
  const top = await AffiliateCommission.aggregate([
    { $match: { status: 'paid', paidAt: { $gte: since }, type: { $in: ['direct', 'level'] } } },
    { $group: { _id: '$earnerUserId', total: { $sum: '$amountUsd' } } },
    { $sort: { total: -1 } },
    { $limit: BONUS_CONFIG.monthlyLeader.topN },
  ]);

  const awarded = [];
  for (const t of top) {
    // Idempotency: one Monthly Leader bonus per user per month
    const existing = await AffiliateCommission.findOne({
      earnerUserId: t._id,
      type: 'monthly_leader',
      notes: { $regex: monthKey },
    });
    if (existing) continue;

    const result = await awardBonus({
      earnerUserId: t._id,
      type: 'monthly_leader',
      amountUsd: prizeUsdEach,
      notes: `monthly_leader_${monthKey}_top10`,
    });
    if (result.ok) awarded.push(t._id);
  }

  return { awarded: awarded.length, monthKey, prizeUsdEach };
}

// ─── 6. SUPER FRANCHISE BONUS — override on team sales (active franchise) ──

export async function applySuperFranchiseBonus({ franchiseHolderUserId, teamSaleAmountUsd, orderId }) {
  if (!isConnected()) return { ok: false };
  // Phase 2: check whether user has active franchise (LOCKED status etc.)
  // MVP stub: assume user is franchise holder if rank ≥ R5 (R5 unlocks Sub L1)
  const aff = await Affiliate.findOne({ userId: franchiseHolderUserId }).lean();
  if (!aff) return { ok: false, reason: 'no_affiliate' };
  if (rankIndex(aff.rank) < 4) {
    // R1 (idx 0) → R4 (idx 3) — not eligible
    return { ok: false, reason: 'rank_below_R5' };
  }

  const amount = teamSaleAmountUsd * BONUS_CONFIG.superFranchise.overridePercent;
  return awardBonus({
    earnerUserId: franchiseHolderUserId,
    type: 'super_franchise',
    amountUsd: amount,
    notes: `super_franchise_override_2pct_of_$${teamSaleAmountUsd.toFixed(2)}`,
    orderId,
  });
}

// ─── 7. GLOBAL POOL BONUS — R8+ monthly profit share ─────────────────────

export async function distributeGlobalPool({ poolUsd } = {}) {
  if (!isConnected() || !poolUsd || poolUsd <= 0) return { distributed: 0 };

  const eligible = await Affiliate.find({
    rank: { $in: ['R8', 'R9', 'R10'] },
  }).lean();
  if (eligible.length === 0) return { distributed: 0, note: 'no_R8+_users' };

  const monthKey = `${new Date().getUTCFullYear()}-${String(new Date().getUTCMonth() + 1).padStart(2, '0')}`;

  // Weighted by user volume (this-month earnings) per spec §13.8.2 Decision #11
  const totalVolume = eligible.reduce((a, b) => a + (b.stats?.thisMonthEarningsUsd || 0), 0);
  if (totalVolume === 0) return { distributed: 0, note: 'no_R8+_volume_this_month' };

  const distributed = [];
  for (const aff of eligible) {
    const userVolume = aff.stats?.thisMonthEarningsUsd || 0;
    if (userVolume === 0) continue;

    // Idempotency
    const existing = await AffiliateCommission.findOne({
      earnerUserId: aff.userId,
      type: 'global_pool',
      notes: { $regex: monthKey },
    });
    if (existing) continue;

    const share = (userVolume / totalVolume) * poolUsd;
    if (share <= 0) continue;

    const result = await awardBonus({
      earnerUserId: aff.userId,
      type: 'global_pool',
      amountUsd: share,
      notes: `global_pool_${monthKey}_weighted_${((userVolume / totalVolume) * 100).toFixed(2)}pct`,
    });
    if (result.ok) distributed.push(result);
  }

  return { distributed: distributed.length, totalUsd: distributed.reduce((a, b) => a + b.amountUsd, 0), monthKey };
}

// ─── EXPORT ALL ──────────────────────────────────────────────────────────

export default {
  applyMatchingBonus,
  applyActivationBonus,
  evaluateTeamPerformanceBonus,
  evaluateRetentionUplift,
  awardMonthlyLeaderBonuses,
  applySuperFranchiseBonus,
  distributeGlobalPool,
  BONUS_CONFIG,
};
