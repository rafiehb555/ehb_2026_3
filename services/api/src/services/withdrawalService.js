// Withdrawal Service — Phase 8 Epic C.4
//
// Implements withdrawal request flow with 2FA + KYC tier check + admin approval.
// Adapter execution stubs for Phase 1 MVP.

import WithdrawalRequest from '../models/WithdrawalRequest.js';
import { isConnected } from '../config/db.js';
import { computeKycTier, checkTierLimit } from './kycService.js';
import { recordSignal } from './fraudSignalsService.js';
import { getBankAdapter } from '../adapters/bank/index.js';
import tronTrc20 from '../adapters/usdt/tron-trc20.js';
import { logActivity } from './auditService.js';

// ─── Fee Schedule (admin-tunable in Phase 2) ────────────────────────────

const FEE_SCHEDULE = {
  USDT_TRC20: { type: 'flat', flat: 1, min: 0, max: 1 },
  USDT_ERC20: { type: 'gas_passthrough', flat: 5, min: 5, max: 30 },
  USDT_BEP20: { type: 'flat', flat: 0.5, min: 0.5, max: 0.5 },
  BANK_PK_JAZZCASH: { type: 'percent', percent: 2, min: 2, max: 50 },
  BANK_PK_HBL: { type: 'percent', percent: 2, min: 2, max: 50 },
};

const LARGE_WITHDRAWAL_THRESHOLD_USD = 10_000;

function computeFee(destinationType, amountUsd) {
  const schedule = FEE_SCHEDULE[destinationType];
  if (!schedule) return 5; // default
  if (schedule.type === 'flat') return schedule.flat;
  if (schedule.type === 'percent') {
    const fee = amountUsd * (schedule.percent / 100);
    return Math.max(schedule.min, Math.min(schedule.max, fee));
  }
  if (schedule.type === 'gas_passthrough') return schedule.flat;
  return 5;
}

// ─── PUBLIC API ──────────────────────────────────────────────────────────

/**
 * Submit a withdrawal request.
 * Goes through: KYC check → 2FA pending → admin queue → execute via adapter.
 */
export async function submitWithdrawalRequest({
  userId,
  sourceWallet,
  amountUsd,
  destinationType,
  destinationAddress,
  destinationLabel,
  ipAddress,
  userAgent,
}) {
  if (!isConnected()) throw Object.assign(new Error('DB not connected'), { status: 503 });

  // KYC tier check
  const kycTier = await computeKycTier(userId);
  const tierCheck = await checkTierLimit({ userId, amountUsd, direction: 'out' });
  if (!tierCheck.allowed) {
    return {
      ok: false,
      reason: 'kyc_tier_insufficient',
      currentTier: kycTier,
      details: tierCheck.reason,
    };
  }

  const feeUsd = computeFee(destinationType, amountUsd);
  const netAmountUsd = amountUsd - feeUsd;

  if (netAmountUsd <= 0) {
    return { ok: false, reason: 'fee_exceeds_amount', feeUsd };
  }

  // Determine initial status — large withdrawals always go through admin review
  const requiresAdminReview = amountUsd >= LARGE_WITHDRAWAL_THRESHOLD_USD;
  const initialStatus = 'pending_2fa';

  const req = await WithdrawalRequest.create({
    userId,
    sourceWallet,
    amountUsd,
    destinationType,
    destinationAddress,
    destinationLabel,
    feeUsd,
    netAmountUsd,
    status: initialStatus,
    kycTierAtRequest: kycTier,
    ipAddress,
    userAgent,
  });

  // Record fraud signal
  try {
    await recordSignal({
      userId,
      eventType: 'withdrawal_requested',
      ipAddress,
      userAgent,
      orderId: req._id,
    });
  } catch (e) {
    /* ignore */
  }

  await logActivity({
    actorUserId: userId,
    action: 'withdrawal.requested',
    target: 'withdrawal_request',
    targetId: String(req._id),
    after: { amountUsd, destinationType, requiresAdminReview },
  });

  return {
    ok: true,
    requestId: req._id,
    status: initialStatus,
    feeUsd,
    netAmountUsd,
    requiresAdminReview,
    twoFactorRequired: true,
  };
}

/** Verify 2FA code and move request forward. */
export async function verifyTwoFactor({ requestId, twoFactorCode }) {
  if (!isConnected()) return { ok: false };

  // MVP stub: accept any 6-digit code. Phase 2: integrate real TOTP.
  if (!/^\d{6}$/.test(String(twoFactorCode))) {
    return { ok: false, reason: 'invalid_code_format' };
  }

  const req = await WithdrawalRequest.findById(requestId);
  if (!req) throw Object.assign(new Error('Request not found'), { status: 404 });
  if (req.status !== 'pending_2fa') {
    return { ok: false, reason: `wrong_state:${req.status}` };
  }

  req.twoFactorVerifiedAt = new Date();
  req.status =
    req.amountUsd >= LARGE_WITHDRAWAL_THRESHOLD_USD ? 'pending_admin_review' : 'admin_approved';
  await req.save();

  return { ok: true, newStatus: req.status };
}

/** Admin approves a withdrawal request. */
export async function adminApprove({ requestId, adminId, notes }) {
  if (!isConnected()) return { ok: false };
  const req = await WithdrawalRequest.findById(requestId);
  if (!req) throw Object.assign(new Error('Request not found'), { status: 404 });
  if (req.status !== 'pending_admin_review') {
    return { ok: false, reason: `wrong_state:${req.status}` };
  }
  req.status = 'admin_approved';
  req.adminReviewerId = adminId;
  req.adminReviewedAt = new Date();
  req.adminApprovalNotes = notes;
  await req.save();
  return { ok: true };
}

/** Admin rejects. */
export async function adminReject({ requestId, adminId, reason }) {
  if (!isConnected()) return { ok: false };
  const req = await WithdrawalRequest.findById(requestId);
  if (!req) throw Object.assign(new Error('Request not found'), { status: 404 });
  req.status = 'admin_rejected';
  req.adminReviewerId = adminId;
  req.adminReviewedAt = new Date();
  req.adminApprovalNotes = reason;
  req.failedAt = new Date();
  req.failureReason = reason || 'admin rejected';
  await req.save();
  return { ok: true };
}

/** Execute approved withdrawal via adapter (Phase 2 swaps stub for real). */
export async function executeWithdrawal({ requestId }) {
  if (!isConnected()) return { ok: false };
  const req = await WithdrawalRequest.findById(requestId);
  if (!req) throw Object.assign(new Error('Request not found'), { status: 404 });
  if (req.status !== 'admin_approved') {
    return { ok: false, reason: `wrong_state:${req.status}` };
  }

  req.status = 'in_payout';
  await req.save();

  try {
    let adapterResult;
    if (req.destinationType.startsWith('USDT_')) {
      adapterResult = await tronTrc20.withdraw({
        userId: req.userId,
        amountUsdt: req.netAmountUsd,
        destinationAddress: req.destinationAddress,
      });
      req.adapterUsed = 'tron-trc20';
    } else if (req.destinationType.startsWith('BANK_PK_')) {
      const adapterKey = req.destinationType === 'BANK_PK_JAZZCASH' ? 'JAZZCASH_PK' : 'HBL_PK';
      const bank = getBankAdapter(adapterKey);
      adapterResult = await bank.withdraw({
        userId: req.userId,
        amountUsd: req.netAmountUsd,
        destAccountInfo: req.destinationAddress,
        country: 'PK',
      });
      req.adapterUsed = adapterKey;
    } else {
      throw new Error(`Adapter not yet wired for ${req.destinationType}`);
    }

    req.adapterTransactionId = adapterResult.externalRefId || adapterResult.externalTxHash;
    req.adapterResponseRaw = adapterResult;
    req.status = 'completed';
    req.completedAt = new Date();
    await req.save();
    return { ok: true, adapterResult };
  } catch (e) {
    req.status = 'failed';
    req.failedAt = new Date();
    req.failureReason = e.message;
    await req.save();
    return { ok: false, reason: e.message };
  }
}

/** List user's own withdrawal history. */
export async function listMyWithdrawals(userId, { limit = 50 } = {}) {
  if (!isConnected()) return [];
  return WithdrawalRequest.find({ userId }).sort({ createdAt: -1 }).limit(limit).lean();
}

/** Admin: list pending review queue. */
export async function listAdminQueue({ status = 'pending_admin_review', limit = 50 } = {}) {
  if (!isConnected()) return [];
  return WithdrawalRequest.find({ status }).populate('userId', 'name email').sort({ createdAt: 1 }).limit(limit).lean();
}
