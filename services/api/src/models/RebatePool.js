import mongoose from 'mongoose';

/**
 * Rebate Pool Model — v3.3 §13.2.2
 *
 * Tracks per-event overflow USD when commissions exceed user caps.
 * Per spec §13.2.2: "excess flows to EHB rebate pool (used for marketing /
 * customer rewards / NET PROFIT base for Global Pool Bonus)".
 *
 * Phase 1 MVP: simple ledger + monthly aggregate.
 * Phase 2: dedicated admin UI + payout to Global Pool Bonus.
 */

const RebatePoolSchema = new mongoose.Schema(
  {
    /** Source of the overflow */
    sourceUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    sourceCommissionType: String, // 'direct' | 'level' | 'matching' | etc.
    sourceOrderId: String,

    /** USD amount that overflowed */
    amountUsd: { type: Number, required: true },

    /** Why it overflowed */
    reason: {
      type: String,
      enum: ['per_tx', 'daily', 'monthly', 'global', 'rank_gap', 'wallet_frozen'],
      required: true,
      index: true,
    },

    /** Disposition */
    status: {
      type: String,
      enum: ['accumulated', 'allocated_marketing', 'allocated_global_pool', 'allocated_other'],
      default: 'accumulated',
      index: true,
    },

    /** Period bucket for monthly aggregation */
    periodKey: { type: String, index: true }, // 'YYYY-MM'

    /** Allocation audit (set when admin assigns this overflow to a use) */
    allocatedAt: Date,
    allocatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    allocatedTo: String, // 'marketing' | 'global_pool' | 'customer_rewards'
    allocationNotes: String,
  },
  { timestamps: true }
);

RebatePoolSchema.index({ periodKey: 1, status: 1 });
RebatePoolSchema.index({ createdAt: -1 });

export default mongoose.models.RebatePool || mongoose.model('RebatePool', RebatePoolSchema);
