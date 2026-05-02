// Capping Service — v3.3 §13.2
//
// Spec: ehb-info/departments/Affiliate.md §13.2 (v3.3)
// Founder lock: 2026-04-26
// Founder rule (locked): "Unlimited earning is dangerous"
//
// MVP enforces per-rank daily + monthly + per-transaction earning caps.
// Excess → EHB rebate pool (NEVER clawed back; user keeps already-earned amount).
//
// Cap ladder per founder:
//   R1: $100/day · R5: $500/day · R10: $5,000/day (revised down from $50K for fraud safety)
// Monthly cap = 25 × daily.
// Per-transaction cap = $10,000.
//
// KYC tier multiplier (Phase 2): T0=50% · T1=75% · T2+=100% · T4=200% of rank cap.
// MVP applies rank cap directly without tier modifier.

import mongoose from 'mongoose';
import AffiliateCommission from '../models/AffiliateCommission.js';
import Affiliate from '../models/Affiliate.js';
import { isConnected } from '../config/db.js';
import { logActivity } from './auditService.js';

/**
 * Normalize userId for aggregation (audit fix #3).
 * If string → wrap as ObjectId. If already ObjectId/Mongoose object → return as-is.
 */
function toObjectId(userId) {
  if (!userId) return userId;
  if (typeof userId === 'string') return new mongoose.Types.ObjectId(userId);
  return userId;
}

// ─── CAP LADDER (admin-tunable in Phase 2 via affiliate_config) ──────────

/** Daily caps per rank in USD (founder-locked v3.3 §13.8.2 #9 — revised from $50K) */
export const DAILY_CAP_BY_RANK = {
  R1: 100,
  R2: 200,
  R3: 300,
  R4: 400,
  R5: 500,
  R6: 1000,
  R7: 2000,
  R8: 3000,
  R9: 4000,
  R10: 5000,
};

/** Monthly cap = 25 × daily (per spec §13.2.1) */
export const MONTHLY_CAP_MULTIPLIER = 25;

/** Per-transaction hard cap in USD */
export const PER_TX_CAP_USD = 10_000;

/** Global daily cap as % of platform revenue (Phase 2 enforcement) */
export const GLOBAL_DAILY_CAP_PERCENT_REVENUE = 5;

/** KYC tier multipliers (Phase 2 enforcement; MVP uses 1.0) */
export const KYC_TIER_MULTIPLIERS = {
  0: 0.5,
  1: 0.75,
  2: 1.0,
  3: 1.0,
  4: 2.0,
};

// ─── HELPERS ─────────────────────────────────────────────────────────────

/** Format date as ISO YYYY-MM-DD UTC for daily aggregation */
function utcDayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function utcMonthKey(date = new Date()) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
}

function startOfUtcDay(date = new Date()) {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

function startOfUtcMonth(date = new Date()) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}

// ─── PUBLIC API ──────────────────────────────────────────────────────────

/** Look up daily cap for a rank. Defaults to R1 ($100) if rank unknown. */
export function getDailyCapForRank(rank) {
  return DAILY_CAP_BY_RANK[rank] || DAILY_CAP_BY_RANK.R1;
}

/** Look up monthly cap (25× daily) for a rank. */
export function getMonthlyCapForRank(rank) {
  return getDailyCapForRank(rank) * MONTHLY_CAP_MULTIPLIER;
}

/**
 * Sum the user's already-earned commissions today (UTC).
 * Returns 0 if not connected.
 */
export async function getCurrentDailyEarnedUsd(userId) {
  if (!isConnected()) return 0;
  const start = startOfUtcDay();
  const result = await AffiliateCommission.aggregate([
    {
      $match: {
        earnerUserId: toObjectId(userId),
        status: 'paid',
        paidAt: { $gte: start },
      },
    },
    { $group: { _id: null, total: { $sum: '$amountUsd' } } },
  ]);
  return result[0]?.total || 0;
}

/**
 * Sum the user's already-earned commissions this month (UTC).
 */
export async function getCurrentMonthEarnedUsd(userId) {
  if (!isConnected()) return 0;
  const start = startOfUtcMonth();
  const result = await AffiliateCommission.aggregate([
    {
      $match: {
        earnerUserId: toObjectId(userId),
        status: 'paid',
        paidAt: { $gte: start },
      },
    },
    { $group: { _id: null, total: { $sum: '$amountUsd' } } },
  ]);
  return result[0]?.total || 0;
}

/**
 * Get the user's current cap status for dashboard display.
 * Returns: { rank, dailyCap, dailyEarned, dailyRemaining, monthlyCap, monthlyEarned, monthlyRemaining, perTxCap }
 */
export async function getCapStatus(userId) {
  const aff = isConnected() ? await Affiliate.findOne({ userId }).lean() : null;
  const rank = aff?.rank || 'R1';
  const dailyCap = getDailyCapForRank(rank);
  const monthlyCap = getMonthlyCapForRank(rank);

  const [dailyEarned, monthlyEarned] = await Promise.all([
    getCurrentDailyEarnedUsd(userId),
    getCurrentMonthEarnedUsd(userId),
  ]);

  return {
    userId,
    rank,
    dailyCap,
    dailyEarned: +dailyEarned.toFixed(2),
    dailyRemaining: Math.max(0, +(dailyCap - dailyEarned).toFixed(2)),
    monthlyCap,
    monthlyEarned: +monthlyEarned.toFixed(2),
    monthlyRemaining: Math.max(0, +(monthlyCap - monthlyEarned).toFixed(2)),
    perTxCap: PER_TX_CAP_USD,
    monthlyCapMultiplier: MONTHLY_CAP_MULTIPLIER,
    asOf: new Date().toISOString(),
  };
}

/**
 * Evaluate whether a proposed commission credit is allowed under all caps.
 *
 * @param {string} userId
 * @param {number} proposedAmount - USD-equivalent commission about to be credited
 * @returns {Promise<{allowed: number, overflow: number, reason: string|null, capStatus: object}>}
 *   allowed = portion that can be credited (0 if fully blocked)
 *   overflow = portion that exceeds caps (0 if fully allowed)
 *   reason = which cap was hit ('per_tx', 'daily', 'monthly', or null if all allowed)
 */
export async function evaluateCap(userId, proposedAmount) {
  if (!proposedAmount || proposedAmount <= 0) {
    return { allowed: 0, overflow: 0, reason: 'invalid_amount', capStatus: null };
  }

  // Per-transaction hard cap (always applies)
  if (proposedAmount > PER_TX_CAP_USD) {
    return {
      allowed: PER_TX_CAP_USD,
      overflow: proposedAmount - PER_TX_CAP_USD,
      reason: 'per_tx',
      capStatus: null,
    };
  }

  if (!isConnected()) {
    // No DB: allow full amount (fallback for dev/in-memory testing)
    return { allowed: proposedAmount, overflow: 0, reason: null, capStatus: null };
  }

  const status = await getCapStatus(userId);

  // Determine the binding constraint
  const dailyAllowed = status.dailyRemaining;
  const monthlyAllowed = status.monthlyRemaining;
  const constraint = Math.min(dailyAllowed, monthlyAllowed);

  if (proposedAmount <= constraint) {
    return { allowed: proposedAmount, overflow: 0, reason: null, capStatus: status };
  }

  const allowed = Math.max(0, constraint);
  const overflow = +(proposedAmount - allowed).toFixed(2);
  const reason = dailyAllowed <= monthlyAllowed ? 'daily' : 'monthly';

  return { allowed: +allowed.toFixed(2), overflow, reason, capStatus: status };
}

/**
 * Log overflow → EHB rebate pool. Per spec §13.2.2: "excess flows to EHB rebate pool
 * (used for marketing / customer rewards / NET PROFIT base for Global Pool Bonus)".
 * Phase 1 MVP: log to ActivityLog. Phase 2: dedicated RebatePool collection.
 */
export async function routeOverflowToRebatePool({ userId, amount, reason, source, orderId }) {
  if (!amount || amount <= 0) return;
  await logActivity({
    actorUserId: userId,
    action: 'cap.overflow_to_rebate_pool',
    target: 'affiliate_cap',
    targetId: userId.toString(),
    after: {
      amountUsd: amount,
      reason,
      source,
      orderId: orderId ? String(orderId) : null,
      timestamp: new Date().toISOString(),
    },
  });
}

/**
 * One-shot guard: evaluates cap + credits the allowed portion + routes overflow.
 * Returns the amount that was actually allowed (caller credits this to wallet).
 *
 * @param {string} userId
 * @param {number} proposedAmount
 * @param {object} meta - { source, orderId } for audit trail
 * @returns {Promise<{allowed: number, overflow: number, reason: string|null}>}
 */
export async function applyCapAndLog(userId, proposedAmount, meta = {}) {
  const result = await evaluateCap(userId, proposedAmount);

  if (result.overflow > 0) {
    await routeOverflowToRebatePool({
      userId,
      amount: result.overflow,
      reason: result.reason,
      source: meta.source || 'unknown',
      orderId: meta.orderId,
    });
  }

  return { allowed: result.allowed, overflow: result.overflow, reason: result.reason };
}
