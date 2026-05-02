import mongoose from 'mongoose';

/**
 * Earning Model — per ER diagram
 *
 * One Earning represents a single income event for a user (any source).
 * Commission is a sub-record describing HOW the earning was calculated.
 *
 * Earning has many Commissions (e.g., a referral order may yield direct + matching).
 *
 * Source taxonomy aligns with v3.2 §12.7 bonus catalog:
 *   product_sale · franchise_sale · stl_purchase · first_sale · activation ·
 *   matching · rank_achievement · team_performance · retention ·
 *   monthly_leader · super_franchise · global_pool · fast_sale_reward
 */

const EarningSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', index: true },
    /** What kind of earning event */
    source: {
      type: String,
      enum: [
        'product_sale', 'franchise_sale',
        'stl_purchase', 'first_sale', 'activation', 'matching',
        'rank_achievement', 'team_performance', 'retention',
        'monthly_leader', 'super_franchise', 'global_pool',
        'fast_sale_reward', 'other',
      ],
      required: true,
      index: true,
    },
    amountUsd: { type: Number, required: true, min: 0 },
    /** Status follows the order/franchise lifecycle */
    status: {
      type: String,
      enum: ['pending', 'available', 'withdrawn', 'reversed', 'on_hold'],
      default: 'pending',
      index: true,
    },
    earningDate: { type: Date, default: Date.now, index: true },
    /** Phase 2 30-day hold: pending → available after 30 days */
    availableAt: Date,
    /** Reference back to commission record (1:1 typically) */
    commissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'AffiliateCommission' },
    /** Currency (default USD; Phase 2 multi-currency) */
    currency: { type: String, default: 'USD' },
    notes: String,
  },
  { timestamps: true }
);

EarningSchema.index({ userId: 1, status: 1, earningDate: -1 });
EarningSchema.index({ source: 1, status: 1 });

export default mongoose.models.Earning || mongoose.model('Earning', EarningSchema);
