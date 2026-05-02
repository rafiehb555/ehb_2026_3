// Affiliate Wallet Service — v3.3 Phase 1 MVP
//
// Spec: ehb-info/departments/Affiliate.md §13.6 (v3.3)
// Founder lock: 2026-04-26
//
// MVP scope:
//   - Ensure (idempotent) affiliate wallet creation
//   - Credit affiliate wallet on commission earn (80/20 USDT/EHBGC default split)
//   - Transfer to Main Wallet (FREE, internal, instant) — uses existing Wallet.js
//   - Get balance, list transactions
//   - Refund clawback (debit on commission reverse)
//
// NOT in MVP (Phase 2+): USDT external withdrawal, bank deposits,
//                       KYC tier enforcement, withdrawal whitelist 24h hold,
//                       hot/cold custody split, scheduled 30-day hold promotion.

import mongoose from 'mongoose';
import AffiliateWallet from '../models/AffiliateWallet.js';
import Wallet from '../models/Wallet.js';
import Transaction from '../models/Transaction.js';
import { isConnected } from '../config/db.js';
import { logActivity } from './auditService.js';

// ─── CONFIG (admin-tunable in Phase 2 via affiliate_config) ────────────

/** Default payout mix per v3.3 founder lock */
export const DEFAULT_PAYOUT_MIX = { usdtPercent: 80, ehbgcPercent: 20 };

/** Internal transfer fees (FREE per §13.6.6) */
export const FEE_AFF_TO_MAIN = 0;
export const FEE_MAIN_TO_AFF = 0;

// ─── HELPERS ──────────────────────────────────────────────────────────

function currentMonthAnchor() {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
}

// ─── PUBLIC API ───────────────────────────────────────────────────────

/**
 * Idempotent: get or create affiliate wallet for userId.
 */
export async function ensureAffiliateWallet(userId) {
  if (!isConnected()) {
    return {
      userId,
      balances: { usdt: 0, ehbgc: 0 },
      pendingHold: 0,
      availableUsd: 0,
      stats: { lifetimeCreditedUsd: 0, lifetimeWithdrawnUsd: 0, thisMonthCreditedUsd: 0 },
      settings: { payoutMix: DEFAULT_PAYOUT_MIX },
      status: 'active',
    };
  }
  let wallet = await AffiliateWallet.findOne({ userId });
  if (!wallet) {
    wallet = await AffiliateWallet.create({
      userId,
      balances: { usdt: 0, ehbgc: 0 },
      pendingHold: 0,
      availableUsd: 0,
      stats: { monthAnchor: currentMonthAnchor() },
      settings: { payoutMix: DEFAULT_PAYOUT_MIX },
      status: 'active',
    });
  }
  return wallet.toObject ? wallet.toObject() : wallet;
}

/**
 * Credit an affiliate wallet with USD-equivalent commission.
 * Splits per user's payout mix (default 80% USDT + 20% EHBGC).
 *
 * @param {string} userId
 * @param {number} amountUsd - the USD-equivalent amount to credit
 * @param {object} meta - { source: 'direct'|'level'|'first_sale'|'stl_purchase'|'fast_sale', orderId, sourceUserId }
 */
export async function creditAffiliateWallet(userId, amountUsd, meta = {}) {
  if (!isConnected()) return { ok: true, note: 'in-memory — no DB credit persisted' };
  if (!amountUsd || amountUsd <= 0) return { ok: false, note: 'amount must be > 0' };

  // Ensure wallet exists
  let wallet = await AffiliateWallet.findOne({ userId });
  if (!wallet) {
    wallet = await AffiliateWallet.create({
      userId,
      balances: { usdt: 0, ehbgc: 0 },
      stats: { monthAnchor: currentMonthAnchor() },
      settings: { payoutMix: DEFAULT_PAYOUT_MIX },
    });
  }

  // Frozen wallets: still record but don't credit balances
  if (wallet.status !== 'active') {
    await Transaction.create({
      toUserId: userId,
      type: 'affiliate_credit_blocked',
      currency: 'USD',
      amount: amountUsd,
      status: 'failed',
      notes: `Wallet ${wallet.status}: ${wallet.frozenReason || 'no reason'}`,
      referenceId: meta.orderId ? String(meta.orderId) : null,
      referenceType: meta.source || 'unknown',
    });
    // Audit fix #12: include frozenReason so frontend can show user why
    return { ok: false, status: wallet.status, frozenReason: wallet.frozenReason || null };
  }

  const mix = wallet.settings?.payoutMix || DEFAULT_PAYOUT_MIX;
  const usdtShare = (amountUsd * (mix.usdtPercent || 80)) / 100;
  const ehbgcShare = (amountUsd * (mix.ehbgcPercent || 20)) / 100;

  // Reset monthly counter if month rolled over
  const currentMonth = currentMonthAnchor();
  const monthReset = wallet.stats?.monthAnchor !== currentMonth;

  const update = {
    $inc: {
      'balances.usdt': usdtShare,
      'balances.ehbgc': ehbgcShare,
      availableUsd: amountUsd,
      'stats.lifetimeCreditedUsd': amountUsd,
      'stats.thisMonthCreditedUsd': monthReset ? -1 * (wallet.stats?.thisMonthCreditedUsd || 0) + amountUsd : amountUsd,
    },
    $set: {
      lastCreditedAt: new Date(),
      ...(monthReset ? { 'stats.monthAnchor': currentMonth } : {}),
    },
  };

  await AffiliateWallet.updateOne({ _id: wallet._id }, update);

  await Transaction.create({
    toUserId: userId,
    type: 'affiliate_commission_credit',
    currency: 'USD',
    amount: amountUsd,
    status: 'completed',
    referenceId: meta.orderId ? String(meta.orderId) : `bonus_${Date.now()}`,
    referenceType: `affiliate_${meta.source || 'unknown'}`,
    notes: `USDT ${usdtShare.toFixed(2)} + EHBGC ${ehbgcShare.toFixed(2)}`,
  });

  await logActivity({
    actorUserId: userId,
    action: 'affiliateWallet.credit',
    target: 'affiliateWallet',
    targetId: wallet._id.toString(),
    after: { amountUsd, usdtShare, ehbgcShare, source: meta.source },
  });

  return { ok: true, usdtShare, ehbgcShare };
}

/**
 * Transfer from Affiliate Wallet → Main Wallet (FREE, instant, internal).
 * MVP: transfers entire amount as EHBGC into Main Wallet's ehbgcBalance.
 * Phase 2 adds: split-currency transfer (USDT portion stays in main as USDT).
 *
 * @param {string} userId
 * @param {number} amountUsd - USD-equivalent amount to transfer
 */
export async function transferAffiliateToMain(userId, amountUsd) {
  if (!isConnected()) return { ok: true, note: 'in-memory' };
  if (!amountUsd || amountUsd <= 0) {
    throw Object.assign(new Error('amount must be > 0'), { status: 400 });
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const affWallet = await AffiliateWallet.findOne({ userId }).session(session);
    if (!affWallet) throw Object.assign(new Error('Affiliate wallet not found'), { status: 404 });
    if (affWallet.status !== 'active') {
      throw Object.assign(new Error(`Affiliate wallet ${affWallet.status}`), { status: 403 });
    }

    const total = (affWallet.balances?.usdt || 0) + (affWallet.balances?.ehbgc || 0);
    if (total < amountUsd) {
      throw Object.assign(new Error(`Insufficient affiliate balance: have ${total}, need ${amountUsd}`), {
        status: 402,
      });
    }

    // Take from USDT first, then EHBGC
    let remaining = amountUsd;
    let fromUsdt = Math.min(remaining, affWallet.balances?.usdt || 0);
    remaining -= fromUsdt;
    let fromEhbgc = remaining;

    affWallet.balances.usdt = (affWallet.balances?.usdt || 0) - fromUsdt;
    affWallet.balances.ehbgc = (affWallet.balances?.ehbgc || 0) - fromEhbgc;
    affWallet.availableUsd = (affWallet.availableUsd || 0) - amountUsd;
    affWallet.lastTransferredAt = new Date();
    await affWallet.save({ session });

    // Credit Main Wallet — MVP: convert entire amount to EHBGC at 1:1 peg
    let mainWallet = await Wallet.findOne({ userId }).session(session);
    if (!mainWallet) {
      // ensureWallet idempotent equivalent within tx
      mainWallet = await Wallet.create([{ userId, ehbgcBalance: 0, ehbgcLocked: 0, usdBalance: 0, locks: [] }], { session });
      mainWallet = mainWallet[0];
    }
    mainWallet.ehbgcBalance = (mainWallet.ehbgcBalance || 0) + amountUsd; // 1:1 peg in MVP
    await mainWallet.save({ session });

    const tx = await Transaction.create(
      [
        {
          fromUserId: userId,
          toUserId: userId,
          type: 'affiliate_to_main_transfer',
          currency: 'USD',
          amount: amountUsd,
          status: 'completed',
          referenceType: 'internal_transfer',
          notes: `From Affiliate (USDT ${fromUsdt.toFixed(2)} + EHBGC ${fromEhbgc.toFixed(2)}) → Main (EHBGC)`,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    await logActivity({
      actorUserId: userId,
      action: 'affiliateWallet.transfer',
      target: 'affiliateWallet',
      targetId: affWallet._id.toString(),
      after: { amountUsd, fromUsdt, fromEhbgc, transactionId: tx[0]._id.toString() },
    });

    return {
      ok: true,
      amountUsd,
      fromUsdt,
      fromEhbgc,
      transactionId: tx[0]._id,
      mainBalanceEhbgc: mainWallet.ehbgcBalance,
    };
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
}

/**
 * Get full affiliate wallet snapshot for dashboard.
 */
export async function getAffiliateWalletBalance(userId) {
  const wallet = await ensureAffiliateWallet(userId);
  const total = (wallet.balances?.usdt || 0) + (wallet.balances?.ehbgc || 0);
  return {
    userId,
    balances: wallet.balances,
    pendingHold: wallet.pendingHold || 0,
    availableUsd: wallet.availableUsd || total,
    totalUsd: total,
    stats: wallet.stats || {},
    settings: wallet.settings || {},
    status: wallet.status,
    lastCreditedAt: wallet.lastCreditedAt,
  };
}

/**
 * List affiliate-wallet related transactions for a user.
 */
export async function listAffiliateTransactions(userId, { limit = 50, type } = {}) {
  if (!isConnected()) return [];
  const q = {
    $or: [{ fromUserId: userId }, { toUserId: userId }],
    type: {
      $in: [
        'affiliate_commission_credit',
        'affiliate_to_main_transfer',
        'affiliate_credit_blocked',
        'commission_credit',
      ],
    },
  };
  if (type) q.type = type;
  return Transaction.find(q).sort({ createdAt: -1 }).limit(limit).lean();
}

/**
 * Refund clawback — debit affiliate wallet when commission is reversed.
 * Called by affiliateService.reverseOrderCommissions.
 *
 * @param {string} userId
 * @param {number} amountUsd
 * @param {object} meta - { reason, orderId, originalCommissionType }
 */
export async function debitAffiliateWalletForReversal(userId, amountUsd, meta = {}) {
  if (!isConnected()) return { ok: true, note: 'in-memory' };
  if (!amountUsd || amountUsd <= 0) return { ok: false };

  const wallet = await AffiliateWallet.findOne({ userId });
  if (!wallet) return { ok: false, note: 'wallet not found' };

  // Take proportionally from USDT and EHBGC, but not below 0
  const total = (wallet.balances?.usdt || 0) + (wallet.balances?.ehbgc || 0);
  const debitable = Math.min(amountUsd, total);

  if (debitable === 0) {
    // Wallet already drained — record negative-impact event but don't go negative
    await Transaction.create({
      fromUserId: userId,
      type: 'affiliate_clawback_skipped',
      currency: 'USD',
      amount: amountUsd,
      status: 'failed',
      referenceId: meta.orderId ? String(meta.orderId) : null,
      notes: `Clawback skipped — wallet empty. User may already have withdrawn.`,
    });
    return { ok: false, note: 'wallet empty', skipped: amountUsd };
  }

  const usdtRatio = (wallet.balances?.usdt || 0) / total;
  const fromUsdt = debitable * usdtRatio;
  const fromEhbgc = debitable - fromUsdt;

  await AffiliateWallet.updateOne(
    { _id: wallet._id },
    {
      $inc: {
        'balances.usdt': -fromUsdt,
        'balances.ehbgc': -fromEhbgc,
        availableUsd: -debitable,
        'stats.lifetimeCreditedUsd': -debitable,
      },
    }
  );

  await Transaction.create({
    fromUserId: userId,
    type: 'affiliate_clawback',
    currency: 'USD',
    amount: debitable,
    status: 'completed',
    referenceId: meta.orderId ? String(meta.orderId) : null,
    referenceType: meta.originalCommissionType || 'unknown',
    notes: meta.reason || 'commission reversed',
  });

  return { ok: true, debited: debitable, fromUsdt, fromEhbgc };
}
