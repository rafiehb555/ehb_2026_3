import mongoose from 'mongoose';

/**
 * EHB Affiliate Model — v3.2-MVP (Track A Product Affiliate)
 *
 * Spec: ehb-info/departments/Affiliate.md §12 (v3.2)
 * Founder lock: 2026-04-25
 *
 * MVP scope (Phase 1):
 *   - Track A: 2-level commission cascade (L1 10%, L2 5% — applied per industry category)
 *     For DAM products with no industry tag: defaults to Standard category (10%/5%/2%)
 *     Latest founder rule: Track A network 5% of product price split 60/30/10 → L1 3% / L2 1.5% / L3 0.5%
 *     MVP simplification: cap at 2 levels (L1 + L2) until Phase 2.
 *   - 3 bonuses: First Sale ($5 fixed), STL Purchase (3%/2%/1%), Fast Sale (4 sales/week → 1 free pkg, cap 2/week)
 *
 * Phase 2 will add: R1–R10 rank computation, Track B 10-level cascade,
 *                  remaining 8 bonuses, dynamic pricing, 3-layer price lock,
 *                  active legs, multi-industry trackers, franchise activation flow.
 */

const FastSaleTrackerSchema = new mongoose.Schema(
  {
    /** ISO week key, e.g. "2026-W17" — auto-resets when week changes */
    weekKey: { type: String, default: '' },
    /** Map of productId → sales count this week */
    sameProductSales: { type: Map, of: Number, default: () => new Map() },
    /** How many free packages already awarded this week (cap = 2 per spec §12.7 #1) */
    freePackagesAwardedThisWeek: { type: Number, default: 0 },
  },
  { _id: false }
);

const AffiliateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    referralCode: { type: String, required: true, unique: true, index: true },
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },

    /**
     * Upstream chain (oldest = direct upline at index 0).
     * MVP uses indexes 0 (L1 direct) and 1 (L2).
     * Phase 2 extends to L1–L10 for Track B franchise cascade.
     */
    upstream: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    /**
     * v3.2 rank (R1 Starter → R10 Global Leader).
     * MVP: every user starts at R1 (rank engine deferred to Phase 2).
     * Phase 2 computes from directs + team + STL + activeLegs + industries.
     */
    rank: {
      type: String,
      enum: ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10'],
      default: 'R1',
      index: true,
    },

    /**
     * Legacy v1.0 tier — kept for backward compatibility during migration.
     * Will be deprecated in Phase 2 once rank engine is live.
     */
    tier: {
      type: String,
      enum: ['L1_REFERRER', 'L2_PROMOTER', 'L3_AMBASSADOR', 'L4_MASTER', 'L5_ELITE'],
      default: 'L1_REFERRER',
    },

    stats: {
      directReferrals: { type: Number, default: 0 },
      networkSize: { type: Number, default: 0 },
      lifetimeEarningsUsd: { type: Number, default: 0 },
      thisMonthEarningsUsd: { type: Number, default: 0 },
      pendingEarningsUsd: { type: Number, default: 0 },

      // v3.2 per-bonus tracking (MVP)
      directEarnedUsd: { type: Number, default: 0 },          // Track A L1 commission
      level2EarnedUsd: { type: Number, default: 0 },          // Track A L2 commission
      firstSaleBonusEarnedUsd: { type: Number, default: 0 },  // one-time $5
      stlBonusEarnedUsd: { type: Number, default: 0 },        // STL purchase bonus accumulator
      fastSaleBonusFreePackages: { type: Number, default: 0 },// lifetime count of free packages

      // Phase 2 trackers (declared now, written later)
      activeLegsCount: { type: Number, default: 0 },
      industriesActiveCount: { type: Number, default: 0 },
      saleVolumeUsd: { type: Number, default: 0 },
    },

    /**
     * First Sale Bonus — one-time per user (Phase 1 MVP).
     * Spec §12.7 #4. Default $5 USD (admin-tunable in Phase 2).
     */
    firstSaleClaimedAt: { type: Date, default: null },

    /**
     * Fast Sale Bonus weekly tracker (Phase 1 MVP).
     * Spec §12.7 #1. Resets per ISO week. Cap 2 free packages/week.
     */
    fastSaleTracker: { type: FastSaleTrackerSchema, default: () => ({}) },

    /** Track A enabled flag (admin can disable per user) */
    productAffiliateEnabled: { type: Boolean, default: true },

    /** STL-gated earning eligibility (set by stlService callbacks) */
    eligible: { type: Boolean, default: false },
    activatedAt: Date,
  },
  { timestamps: true }
);

AffiliateSchema.index({ referredBy: 1, createdAt: -1 });
AffiliateSchema.index({ rank: 1, 'stats.lifetimeEarningsUsd': -1 });

export default mongoose.models.Affiliate || mongoose.model('Affiliate', AffiliateSchema);
