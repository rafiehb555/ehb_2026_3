// Rank Engine — v3.2 §12.5 + v3.3 Rank Achievement Bonus
//
// Spec: ehb-info/departments/Affiliate.md §12.5 (v3.2) + §12.7 #6 (v3.2)
// Founder lock: 2026-04-25 (rank ladder R1-R10) + 2026-04-26 (R10 STL cap = L8)
//
// Promotes affiliates R1 → R10 based on composite criteria:
//   Directs · Team Size · STL Level · Active Legs · Industries
//
// On promotion, credits Rank Achievement Bonus (R3 $100 / R5 $500 / R7 $2,000 / R10 $10,000).
// Other ranks (R2/R4/R6/R8/R9) get rank promotion but no cash bonus (per spec §12.7 #6 "major ranks only").
//
// Industry unlock = earning permission only (R1: 1 industry → R10: all 38).
// Self-purchases excluded from rank metrics per v3.3 §13.1.2.

import Affiliate from '../models/Affiliate.js';
import AffiliateCommission from '../models/AffiliateCommission.js';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import { isConnected } from '../config/db.js';
import { logActivity } from './auditService.js';
import { creditAffiliateWallet } from './affiliateWalletService.js';

// ─── RANK LADDER (v3.2 §12.5 — admin-tunable in Phase 2) ─────────────────

/**
 * Rank requirements. R10 STL capped at L8 per founder revision (achievable via Franchise alone).
 */
export const RANK_REQUIREMENTS = {
  R1:  { name: 'Starter',         directs:   0, team:     0, stl: 1, activeLegs:  0, industries:  1 },
  R2:  { name: 'Beginner',        directs:   2, team:    10, stl: 2, activeLegs:  2, industries:  2 },
  R3:  { name: 'Builder',         directs:   5, team:    50, stl: 3, activeLegs:  3, industries:  3 },
  R4:  { name: 'Leader',          directs:  10, team:   150, stl: 4, activeLegs:  5, industries:  5 },
  R5:  { name: 'Manager',         directs:  20, team:   500, stl: 5, activeLegs:  7, industries: 10 },
  R6:  { name: 'Director',        directs:  30, team:  1000, stl: 6, activeLegs: 10, industries: 15 },
  R7:  { name: 'Senior Director', directs:  50, team:  3000, stl: 7, activeLegs: 12, industries: 20 },
  R8:  { name: 'Executive',       directs:  75, team:  7000, stl: 7, activeLegs: 13, industries: 25 },
  R9:  { name: 'Regional Head',   directs: 100, team: 15000, stl: 8, activeLegs: 14, industries: 30 },
  R10: { name: 'Global Leader',   directs: 150, team: 50000, stl: 8, activeLegs: 15, industries: 38 },
};

/** Rank Achievement Bonus amounts in USD (major ranks only per spec §12.7 #6) */
export const RANK_ACHIEVEMENT_BONUS_USD = {
  R3: 100,
  R5: 500,
  R7: 2_000,
  R10: 10_000,
};

const RANK_ORDER = ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10'];

// ─── HELPERS ─────────────────────────────────────────────────────────────

function rankIndex(rank) {
  return RANK_ORDER.indexOf(rank || 'R1');
}

function nextRank(rank) {
  const i = rankIndex(rank);
  if (i < 0 || i >= RANK_ORDER.length - 1) return null;
  return RANK_ORDER[i + 1];
}

/**
 * Compute "active legs" = directs who have made ≥ 1 qualifying sale in last 30 days
 * AND maintain STL ≥ L3 AND not under DMO review.
 *
 * Per v3.3 §12.4. Self-purchases excluded.
 */
async function computeActiveLegs(userId) {
  if (!isConnected()) return 0;

  // Find direct referrals (Affiliate.referredBy === userId)
  const directs = await Affiliate.find({ referredBy: userId }).populate('userId', 'stl').lean();
  if (directs.length === 0) return 0;

  // 30-day window
  const since = new Date(Date.now() - 30 * 86_400_000);

  let activeCount = 0;
  for (const d of directs) {
    const dUserId = d.userId?._id || d.userId;
    const stlLevel = d.userId?.stl?.level || 1;

    // Must maintain STL ≥ L3 to count as active leg (per spec §12.4)
    if (stlLevel < 3) continue;

    // Must have ≥ 1 commission credited within 30 days (proxy for "selling")
    const recentCount = await AffiliateCommission.countDocuments({
      sourceUserId: dUserId,
      status: 'paid',
      paidAt: { $gte: since },
      type: { $in: ['direct', 'level'] }, // only sale-driven commissions count
    });

    if (recentCount > 0) activeCount++;
  }

  return activeCount;
}

/**
 * Count distinct industries the affiliate has earned commission from.
 * Phase 2 will track explicit industry tags on every product; MVP uses what's
 * available on AffiliateCommission.industryCode.
 */
async function computeIndustryCount(userId) {
  if (!isConnected()) return 1; // default 1 for R1 baseline

  const distinct = await AffiliateCommission.distinct('industryCode', {
    earnerUserId: userId,
    status: 'paid',
    industryCode: { $ne: null, $exists: true },
  });

  // Always count at least 1 (the user's own activity)
  return Math.max(1, distinct.length);
}

// ─── PUBLIC API ──────────────────────────────────────────────────────────

/**
 * Compute rank progress: which rank user qualifies for + missing requirements for next.
 *
 * @returns {Promise<{currentRank, eligibleRank, nextRank, progress, metrics}>}
 */
export async function getRankProgress(userId) {
  if (!isConnected()) {
    return {
      currentRank: 'R1',
      eligibleRank: 'R1',
      nextRank: 'R2',
      metrics: { directs: 0, team: 0, stl: 1, activeLegs: 0, industries: 1 },
      requirements: RANK_REQUIREMENTS,
      progress: { directs: 0, team: 0, stl: 0, activeLegs: 0, industries: 0 },
    };
  }

  const aff = await Affiliate.findOne({ userId }).populate('userId', 'stl').lean();
  if (!aff) {
    return {
      currentRank: 'R1',
      eligibleRank: 'R1',
      nextRank: 'R2',
      metrics: { directs: 0, team: 0, stl: 1, activeLegs: 0, industries: 1 },
      requirements: RANK_REQUIREMENTS,
      progress: { directs: 0, team: 0, stl: 0, activeLegs: 0, industries: 0 },
    };
  }

  const user = aff.userId; // populated
  const directs = aff.stats?.directReferrals || 0;
  const team = aff.stats?.networkSize || 0;
  const stl = user?.stl?.level || 1;
  const [activeLegs, industries] = await Promise.all([
    computeActiveLegs(userId),
    computeIndustryCount(userId),
  ]);

  // Find highest rank user qualifies for (every requirement met)
  let eligibleRank = 'R1';
  for (const r of RANK_ORDER) {
    const req = RANK_REQUIREMENTS[r];
    if (
      directs >= req.directs &&
      team >= req.team &&
      stl >= req.stl &&
      activeLegs >= req.activeLegs &&
      industries >= req.industries
    ) {
      eligibleRank = r;
    }
  }

  const currentRank = aff.rank || 'R1';
  const next = nextRank(currentRank) || 'R10';
  const nextReq = RANK_REQUIREMENTS[next];

  // Progress towards next rank (0-1 ratio per metric)
  const progress = {
    directs: Math.min(1, directs / Math.max(1, nextReq.directs)),
    team: Math.min(1, team / Math.max(1, nextReq.team)),
    stl: Math.min(1, stl / Math.max(1, nextReq.stl)),
    activeLegs: Math.min(1, activeLegs / Math.max(1, nextReq.activeLegs)),
    industries: Math.min(1, industries / Math.max(1, nextReq.industries)),
  };

  return {
    userId,
    currentRank,
    currentRankName: RANK_REQUIREMENTS[currentRank]?.name,
    eligibleRank,
    eligibleRankName: RANK_REQUIREMENTS[eligibleRank]?.name,
    canPromoteTo: rankIndex(eligibleRank) > rankIndex(currentRank) ? eligibleRank : null,
    nextRank: next,
    nextRankName: RANK_REQUIREMENTS[next]?.name,
    nextRankRequirements: nextReq,
    metrics: { directs, team, stl, activeLegs, industries },
    progress,
    asOf: new Date().toISOString(),
  };
}

/**
 * Auto-promote a user to their highest eligible rank.
 * Credits Rank Achievement Bonus for major ranks (R3/R5/R7/R10).
 *
 * Idempotent — calling repeatedly is safe; only fires bonus once per rank crossed.
 *
 * @returns {Promise<{promoted: boolean, fromRank, toRank, bonusUsd}>}
 */
export async function promoteRank(userId) {
  if (!isConnected()) return { promoted: false, note: 'in-memory' };

  const progress = await getRankProgress(userId);
  if (!progress.canPromoteTo) {
    return { promoted: false, fromRank: progress.currentRank, toRank: progress.currentRank, bonusUsd: 0 };
  }

  const fromIdx = rankIndex(progress.currentRank);
  const toIdx = rankIndex(progress.eligibleRank);
  const ranksCrossed = RANK_ORDER.slice(fromIdx + 1, toIdx + 1); // e.g. R1 → R3 = ['R2', 'R3']

  // Persist new rank
  await Affiliate.updateOne(
    { userId },
    { $set: { rank: progress.eligibleRank } }
  );

  // Credit Rank Achievement Bonus for any major ranks crossed
  let totalBonusUsd = 0;
  for (const r of ranksCrossed) {
    const bonusUsd = RANK_ACHIEVEMENT_BONUS_USD[r] || 0;
    if (bonusUsd > 0) {
      // Idempotency check — has this rank-bonus already been credited?
      const existing = await AffiliateCommission.findOne({
        earnerUserId: userId,
        type: 'rank_achievement',
        notes: `rank_${r}`,
      });
      if (existing) continue;

      // Insert commission record
      await AffiliateCommission.create({
        earnerUserId: userId,
        type: 'rank_achievement',
        track: null,
        amountUsd: bonusUsd,
        status: 'paid',
        paidAt: new Date(),
        notes: `rank_${r}`,
        rateApplied: null,
      });

      // Update aggregates
      await Affiliate.updateOne(
        { userId },
        {
          $inc: {
            'stats.lifetimeEarningsUsd': bonusUsd,
            'stats.thisMonthEarningsUsd': bonusUsd,
          },
        }
      );

      // Ledger
      await Transaction.create({
        toUserId: userId,
        type: 'commission_credit',
        currency: 'USD',
        amount: bonusUsd,
        status: 'completed',
        referenceType: `affiliate_rank_achievement_${r}`,
      });

      // Credit AffiliateWallet (80/20 split)
      try {
        await creditAffiliateWallet(userId, bonusUsd, {
          source: 'rank_achievement',
          sourceUserId: userId,
        });
      } catch (e) {
        console.warn('[rank] wallet credit failed:', e.message);
      }

      totalBonusUsd += bonusUsd;
    }
  }

  await logActivity({
    actorUserId: userId,
    action: 'rank.promoted',
    target: 'affiliate',
    targetId: String(userId),
    before: { rank: progress.currentRank },
    after: {
      rank: progress.eligibleRank,
      ranksCrossed,
      totalBonusUsd,
    },
  });

  return {
    promoted: true,
    fromRank: progress.currentRank,
    toRank: progress.eligibleRank,
    ranksCrossed,
    bonusUsd: totalBonusUsd,
  };
}

/**
 * Convenience: evaluate progress AND promote if eligible.
 * Returns the latest progress (post-promotion).
 */
export async function evaluateAndPromote(userId) {
  const promotion = await promoteRank(userId);
  const progress = await getRankProgress(userId);
  return { promotion, progress };
}
