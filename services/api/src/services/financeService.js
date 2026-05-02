/**
 * EHB · Finance Service — money handling above wallet, below DMO.
 *
 * Responsibilities:
 *   1. Earnings ledger (pending → approved → paid)
 *   2. Reconciliation (compare DB vs payment provider)
 *   3. Reports (P&L, GMV, take-rate, per-country, per-industry)
 *   4. Tax computation (delegates to taxEngine)
 *   5. FX conversion (delegates to fxService)
 *   6. Withdrawal management
 *
 * Wired:
 *   - Listens: order.settled → record earnings
 *   - Emits:  finance.earnings_approved / finance.payout_complete
 */

import mongoose from 'mongoose';
import { computeTax, computeWithholding, generateTaxInvoice } from './taxEngine.js';
import { convert as fxConvert } from './fxService.js';
import { metrics } from '../middleware/metrics.js';
import { emit as emitEvent } from './eventBus.js';

// =====================================================================
// Earnings ledger schema (Mongoose model — can be moved to /models)
// =====================================================================
const EarningSchema = new mongoose.Schema({
  earningId: { type: String, unique: true, index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  orderId: { type: String, index: true },
  industry: { type: String, index: true },
  country: { type: String, index: true },

  type: {
    type: String,
    enum: ['ORDER_SHARE', 'COMMISSION', 'BONUS', 'YIELD', 'REFUND', 'ADJUSTMENT', 'WITHDRAWAL'],
    required: true,
    index: true,
  },

  gross_amount: Number,
  tax_amount: Number,
  withholding_amount: Number,
  fee_amount: Number,
  net_amount: Number,
  currency: { type: String, default: 'USD' },
  fx_rate_to_usd: Number,
  amount_usd: Number,

  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'PAID', 'REJECTED', 'REVERSED', 'HELD_BY_DMO'],
    default: 'PENDING',
    index: true,
  },

  approved_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approved_at: Date,
  paid_at: Date,
  rejected_reason: String,

  notes: String,
  audit: {
    polkadot_hash: String,
    block_number: Number,
  },

  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

EarningSchema.index({ userId: 1, status: 1, createdAt: -1 });
EarningSchema.index({ industry: 1, country: 1, status: 1 });

const Earning = mongoose.models.Earning || mongoose.model('Earning', EarningSchema);

// =====================================================================
// Record earning (called on order.settled)
// =====================================================================
export async function recordEarning({ userId, orderId, industry, country, grossAmount, currency = 'USD', type = 'ORDER_SHARE' }) {
  const tax = computeTax({ amount: grossAmount, country, industry });
  const wh = computeWithholding({ grossAmount: tax.net, country, isCrossBorder: false });
  const usdConversion = currency === 'USD'
    ? { ok: true, to_amount: tax.gross, rate: 1 }
    : fxConvert({ amount: tax.gross, from: currency, to: 'USD' });

  const earning = await Earning.create({
    earningId: `EARN_${Date.now()}_${userId.toString().slice(-6)}`,
    userId,
    orderId,
    industry,
    country,
    type,
    gross_amount: grossAmount,
    tax_amount: tax.tax,
    withholding_amount: wh.withhold,
    fee_amount: 0,
    net_amount: wh.net,
    currency,
    fx_rate_to_usd: usdConversion.ok ? usdConversion.rate : null,
    amount_usd: usdConversion.ok ? usdConversion.to_amount : null,
    status: 'PENDING',
  });

  return earning.toObject();
}

// =====================================================================
// Approve earning (DMO action — required before payout)
// =====================================================================
export async function approveEarning({ earningId, approvedBy, notes }) {
  const earning = await Earning.findOneAndUpdate(
    { earningId, status: 'PENDING' },
    { $set: { status: 'APPROVED', approved_by: approvedBy, approved_at: new Date(), notes } },
    { new: true },
  );
  if (!earning) throw Object.assign(new Error('Earning not found or not pending'), { status: 404 });

  await emitEvent('finance.earnings_approved', { earningId, userId: earning.userId, amount: earning.net_amount });
  return earning;
}

// =====================================================================
// Reject earning (DMO holds)
// =====================================================================
export async function rejectEarning({ earningId, rejectedBy, reason }) {
  return Earning.findOneAndUpdate(
    { earningId },
    { $set: { status: 'REJECTED', approved_by: rejectedBy, approved_at: new Date(), rejected_reason: reason } },
    { new: true },
  );
}

// =====================================================================
// Mark paid (after wallet release)
// =====================================================================
export async function markPaid({ earningId, polkadotHash = null }) {
  const earning = await Earning.findOneAndUpdate(
    { earningId, status: 'APPROVED' },
    { $set: { status: 'PAID', paid_at: new Date(), 'audit.polkadot_hash': polkadotHash } },
    { new: true },
  );
  if (earning) {
    metrics.escrowReleased('finance');
    await emitEvent('finance.payout_complete', { earningId, userId: earning.userId, amount: earning.net_amount });
  }
  return earning;
}

// =====================================================================
// Reports
// =====================================================================
export async function getUserEarnings({ userId, status, fromDate, toDate, limit = 100 }) {
  const filter = { userId };
  if (status) filter.status = status;
  if (fromDate || toDate) {
    filter.createdAt = {};
    if (fromDate) filter.createdAt.$gte = new Date(fromDate);
    if (toDate) filter.createdAt.$lte = new Date(toDate);
  }
  return Earning.find(filter).sort('-createdAt').limit(limit).lean();
}

export async function getPlatformReport({ fromDate, toDate, groupBy = 'industry' } = {}) {
  const match = {};
  if (fromDate) match.createdAt = { $gte: new Date(fromDate) };
  if (toDate) match.createdAt = { ...match.createdAt, $lte: new Date(toDate) };

  const groupField = `$${groupBy}`;
  const agg = await Earning.aggregate([
    { $match: match },
    {
      $group: {
        _id: groupField,
        count: { $sum: 1 },
        total_gross: { $sum: '$gross_amount' },
        total_tax: { $sum: '$tax_amount' },
        total_net: { $sum: '$net_amount' },
        total_usd: { $sum: '$amount_usd' },
      },
    },
    { $sort: { total_usd: -1 } },
  ]);
  return agg;
}

export async function getOverview() {
  const [pending, approved, paid] = await Promise.all([
    Earning.countDocuments({ status: 'PENDING' }),
    Earning.countDocuments({ status: 'APPROVED' }),
    Earning.countDocuments({ status: 'PAID' }),
  ]);
  const totalUsdAgg = await Earning.aggregate([{ $group: { _id: null, total: { $sum: '$amount_usd' } } }]);
  return {
    earnings_count: { pending, approved, paid },
    total_usd_lifetime: totalUsdAgg[0]?.total || 0,
  };
}

// =====================================================================
// Reconciliation — compare DB earnings vs wallet movements
// =====================================================================
export async function reconcile({ fromDate, toDate }) {
  // Sum approved earnings
  const earningsAgg = await Earning.aggregate([
    { $match: { status: { $in: ['APPROVED', 'PAID'] }, createdAt: { $gte: new Date(fromDate), $lte: new Date(toDate) } } },
    { $group: { _id: null, total: { $sum: '$net_amount' } } },
  ]);
  const earningsTotal = earningsAgg[0]?.total || 0;

  // TODO: also fetch from walletService.getReleasedAmount(...)
  // and from payment providers (Stripe / JazzCash) → compare totals

  return {
    earnings_total: earningsTotal,
    wallet_released_total: 0,    // stub
    provider_total: 0,            // stub
    discrepancy: 0,
    reconciled_at: new Date().toISOString(),
  };
}

// =====================================================================
// Re-export tax + fx helpers
// =====================================================================
export { computeTax, computeWithholding, generateTaxInvoice, fxConvert };

export default {
  recordEarning,
  approveEarning,
  rejectEarning,
  markPaid,
  getUserEarnings,
  getPlatformReport,
  getOverview,
  reconcile,
  Earning,
};
