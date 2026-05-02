import mongoose from 'mongoose';

/**
 * EHB Affiliate Commission Model — v3.2-MVP
 *
 * Spec: ehb-info/departments/Affiliate.md §12 (v3.2)
 *
 * MVP commission types (Phase 1):
 *   direct        — Track A direct sale (L1 of network 5% pool = 3% of product price)
 *   level         — Track A L2 (1.5% of product price; level field = 2)
 *   first_sale    — First Sale Bonus ($5 fixed, one-time per user)
 *   stl_purchase  — STL Upgrade Purchase Bonus (3%/2%/1% one-time on referral upgrade)
 *   fast_sale     — Fast Sale Bonus (free package reward; amountUsd = package value)
 *
 * Phase 2 types (declared in enum for forward compat, not written in MVP):
 *   matching · rank_achievement · team_performance · retention ·
 *   monthly_leader · super_franchise · global_pool · franchise_cascade
 *
 * v1.0 legacy types kept for backward compat: pool · franchise · product
 */

const AffiliateCommissionSchema = new mongoose.Schema(
  {
    earnerUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    sourceUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },

    type: {
      type: String,
      enum: [
        // v3.2-MVP active types
        'direct',
        'level',
        'first_sale',
        'stl_purchase',
        'fast_sale',
        // v3.2 Phase 2 types (forward compat)
        'matching',
        'rank_achievement',
        'team_performance',
        'retention',
        'monthly_leader',
        'super_franchise',
        'global_pool',
        'franchise_cascade',
        // v1.0 legacy
        'pool',
        'franchise',
        'product',
      ],
      required: true,
      index: true,
    },

    /** Track identifier — A (product), B (franchise), or null (bonus/legacy) */
    track: {
      type: String,
      enum: ['A', 'B', null],
      default: null,
    },

    /** Cascade level — L1 = direct, L2 = 2nd-tier, … L10 (Phase 2). MVP writes 1 or 2. */
    level: { type: Number, min: 1, max: 10 },

    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },

    productPriceUsd: Number, // price the cascade was calculated on (Track A)
    orderValueUsd: Number,   // backward-compat alias
    rateApplied: Number,     // 0.03 = 3%, etc.
    amountUsd: { type: Number, required: true },

    /** Track A — Layer 1 audit fields (network split is hidden from public, recorded for admin/audit) */
    sellerProfitPercent: Number,                   // what seller defined (5–30%)
    networkPoolPercent: { type: Number, default: 5 },  // always 5 in v3.2 MVP

    /** Industry tag (optional, for category-based reporting in Phase 2) */
    industryCode: String,

    status: {
      type: String,
      enum: ['pending', 'paid', 'reversed'],
      default: 'pending',
      index: true,
    },
    paidAt: Date,

    /** Refund clawback (anti-fraud per §12.13) */
    reversedAt: Date,
    reversedReason: String,
  },
  { timestamps: true }
);

AffiliateCommissionSchema.index({ earnerUserId: 1, createdAt: -1 });
AffiliateCommissionSchema.index({ type: 1, createdAt: -1 });
AffiliateCommissionSchema.index({ orderId: 1 });
AffiliateCommissionSchema.index({ track: 1, level: 1 });
// Audit fix #14 — capping aggregation queries paidAt + status frequently
AffiliateCommissionSchema.index({ earnerUserId: 1, status: 1, paidAt: -1 });
// Audit fix #8 — rank achievement bonus idempotency (compound unique on type+notes per earner)
AffiliateCommissionSchema.index(
  { earnerUserId: 1, type: 1, notes: 1 },
  { unique: true, partialFilterExpression: { type: 'rank_achievement' } }
);

export default mongoose.models.AffiliateCommission ||
  mongoose.model('AffiliateCommission', AffiliateCommissionSchema);
