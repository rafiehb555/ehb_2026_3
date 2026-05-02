// Track B Service — v3.2 §12.4 + §12.5 (Franchise Sale Cascade)
//
// Spec: ehb-info/departments/Affiliate.md §12.4 (v3.2)
// Founder lock: 2026-04-25
//
// Triggered ONLY on franchise tier purchases (OF1-OF4 + Sub L1-L10 + Master).
// 10-level rank-gated cascade — each upline only earns levels their rank unlocks.
// Unclaimed % flows to EHB rebate pool (not credited to anyone).
//
// Track A (Product) and Track B (Franchise) are independent — same affiliate
// can earn from BOTH simultaneously on different transaction types.

import mongoose from 'mongoose';
import Affiliate from '../models/Affiliate.js';
import AffiliateCommission from '../models/AffiliateCommission.js';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import { isConnected } from '../config/db.js';
import { logActivity } from './auditService.js';
import { creditAffiliateWallet } from './affiliateWalletService.js';
import { applyCapAndLog } from './cappingService.js';
import { evaluateAndPromote, RANK_REQUIREMENTS } from './rankEngineService.js';

// ─── TRACK B 10-LEVEL CASCADE (spec §12.4 — admin-tunable in Phase 2) ────

export const TRACK_B_LEVEL_RATES = {
  1: 0.05,   // L1 = 5%
  2: 0.03,   // L2 = 3%
  3: 0.02,   // L3 = 2%
  4: 0.015,  // L4 = 1.5%
  5: 0.01,   // L5 = 1%
  6: 0.008,  // L6 = 0.8%
  7: 0.006,  // L7 = 0.6%
  8: 0.005,  // L8 = 0.5%
  9: 0.003,  // L9 = 0.3%
  10: 0.003, // L10 = 0.3%
  // Total ~15%
};

export const TRACK_B_TOTAL_RATE = Object.values(TRACK_B_LEVEL_RATES).reduce((a, b) => a + b, 0);

// ─── HELPERS ─────────────────────────────────────────────────────────────

/**
 * Get the highest cascade level a rank can earn from.
 * Per spec §12.5: R1 → L1, R2 → L1-L2, R3 → L1-L3, ..., R10 → L1-L10.
 */
function levelAccessForRank(rank) {
  const map = {
    R1: 1, R2: 2, R3: 3, R4: 4, R5: 5,
    R6: 6, R7: 7, R8: 8, R9: 9, R10: 10,
  };
  return map[rank] || 1;
}

// ─── PUBLIC API ──────────────────────────────────────────────────────────

/**
 * Process a franchise tier purchase — distribute Track B 10-level commission.
 *
 * Each upline earns commission only on levels their rank has unlocked.
 * Unclaimed levels (rank too low) → EHB rebate pool (logged via cappingService overflow).
 *
 * @param {object} purchase - { buyerId, franchiseTier, priceUsd, purchaseId }
 * @returns {Promise<{distributed, totalUsd, unclaimed, capTrimmed}>}
 */
export async function processFranchiseSale(purchase) {
  if (!isConnected()) return { distributed: 0 };
  if (!purchase || !purchase.buyerId || !purchase.priceUsd) {
    return { distributed: 0, note: 'invalid purchase' };
  }
  if (purchase.priceUsd <= 0) return { distributed: 0, note: 'zero-price purchase' };

  const buyerAff = await Affiliate.findOne({ userId: purchase.buyerId });
  if (!buyerAff) return { distributed: 0, note: 'buyer not in affiliate program' };

  const commissions = [];
  let unclaimedUsd = 0;

  // Build upstream chain (up to 10 deep for Track B vs MVP_MAX_DEPTH=2 for Track A)
  const chain = [buyerAff.referredBy, ...(buyerAff.upstream || [])].filter(Boolean);

  for (let i = 0; i < Math.min(chain.length, 10); i++) {
    const upstreamUserId = chain[i];
    const level = i + 1;
    const rate = TRACK_B_LEVEL_RATES[level];
    if (!rate) continue;

    // Anti-fraud: skip self-referral chain
    if (String(purchase.buyerId) === String(upstreamUserId)) continue;

    const earnerAff = await Affiliate.findOne({ userId: upstreamUserId }).lean();
    if (!earnerAff) {
      unclaimedUsd += purchase.priceUsd * rate;
      continue;
    }

    // Rank gating: check if this upline's rank unlocks level L
    const maxLevel = levelAccessForRank(earnerAff.rank || 'R1');
    if (level > maxLevel) {
      // Upline doesn't have rank to claim this level — flows to rebate pool
      unclaimedUsd += purchase.priceUsd * rate;
      continue;
    }

    const amount = purchase.priceUsd * rate;
    if (amount <= 0) continue;

    commissions.push({
      earnerUserId: upstreamUserId,
      sourceUserId: purchase.buyerId,
      type: 'franchise_cascade',
      track: 'B',
      level,
      productPriceUsd: purchase.priceUsd,
      orderValueUsd: purchase.priceUsd,
      rateApplied: rate,
      amountUsd: amount,
      industryCode: 'FRANCHISE',
      status: 'paid',
      paidAt: new Date(),
      notes: `franchise_${purchase.franchiseTier || 'unknown'}_L${level}`,
    });
  }

  // Apply capping per commission (overflow → rebate pool)
  for (const c of commissions) {
    try {
      const { allowed, overflow, reason } = await applyCapAndLog(c.earnerUserId, c.amountUsd, {
        source: 'franchise_cascade',
        orderId: purchase.purchaseId,
      });
      if (overflow > 0) {
        c.amountUsd = allowed;
        c.notes = `${c.notes || ''} · cap_trimmed:${reason} · overflow $${overflow.toFixed(2)}`;
        unclaimedUsd += overflow;
      }
    } catch (e) {
      console.warn('[trackB] cap evaluation failed:', e.message);
    }
  }

  // Persist + credit wallet
  const allowed = commissions.filter((c) => c.amountUsd > 0);
  if (allowed.length > 0) {
    await AffiliateCommission.insertMany(allowed);

    for (const c of allowed) {
      await Affiliate.updateOne(
        { userId: c.earnerUserId },
        {
          $inc: {
            'stats.lifetimeEarningsUsd': c.amountUsd,
            'stats.thisMonthEarningsUsd': c.amountUsd,
          },
        }
      );

      await Transaction.create({
        toUserId: c.earnerUserId,
        type: 'commission_credit',
        currency: 'USD',
        amount: c.amountUsd,
        status: 'completed',
        referenceId: purchase.purchaseId ? String(purchase.purchaseId) : `franchise_${Date.now()}`,
        referenceType: `affiliate_track_B_L${c.level}`,
        notes: c.notes,
      });

      try {
        await creditAffiliateWallet(c.earnerUserId, c.amountUsd, {
          source: 'franchise_cascade',
          orderId: purchase.purchaseId,
          sourceUserId: purchase.buyerId,
        });
      } catch (e) {
        console.warn('[trackB] wallet credit failed:', e.message);
      }
    }

    // Re-evaluate ranks after Track B distribution
    const earnerIds = [...new Set(allowed.map((c) => String(c.earnerUserId)))];
    for (const eid of earnerIds) {
      try {
        await evaluateAndPromote(eid);
      } catch (e) {
        console.warn(`[trackB] rank eval failed for ${eid}:`, e.message);
      }
    }
  }

  await logActivity({
    actorUserId: purchase.buyerId,
    action: 'affiliate.track_b_distributed',
    target: 'franchise_purchase',
    targetId: purchase.purchaseId ? String(purchase.purchaseId) : 'unknown',
    after: {
      franchiseTier: purchase.franchiseTier,
      priceUsd: purchase.priceUsd,
      distributed: allowed.length,
      totalCreditedUsd: allowed.reduce((a, b) => a + b.amountUsd, 0),
      unclaimedUsd: +unclaimedUsd.toFixed(2),
    },
  });

  return {
    distributed: allowed.length,
    totalUsd: +allowed.reduce((a, b) => a + b.amountUsd, 0).toFixed(2),
    unclaimedUsd: +unclaimedUsd.toFixed(2), // routed to EHB rebate pool
    capTrimmed: commissions.filter((c) => c.notes?.includes('cap_trimmed')).length,
  };
}

/**
 * Reverse all Track B commissions for a refunded franchise purchase.
 */
export async function reverseFranchiseCommissions({ purchaseId, reason = 'franchise_refund' }) {
  if (!isConnected()) return { reversed: 0 };

  const commissions = await AffiliateCommission.find({
    type: 'franchise_cascade',
    status: 'paid',
    notes: { $regex: new RegExp(`franchise_.*_L\\d+`) }, // best-effort match
  })
    .where('referenceId')
    .equals(String(purchaseId))
    .lean();

  if (commissions.length === 0) return { reversed: 0 };

  await AffiliateCommission.updateMany(
    { _id: { $in: commissions.map((c) => c._id) } },
    { $set: { status: 'reversed', reversedAt: new Date(), reversedReason: reason } }
  );

  return { reversed: commissions.length };
}

export const RATES = TRACK_B_LEVEL_RATES;
export const LEVEL_ACCESS_FOR_RANK = levelAccessForRank;
