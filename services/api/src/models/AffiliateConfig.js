import mongoose from 'mongoose';

/**
 * Affiliate Config Model — v3.3 §13.8 Admin Flexibility Layer
 *
 * Spec: ehb-info/departments/Affiliate.md §13.8 (v3.3)
 * Founder lock: 2026-04-26
 *
 * Single-document collection (always _id: 'current') holding admin-tunable
 * affiliate parameters. Hot-reloadable — changes take effect within 60 seconds
 * across the cluster (Phase 2 cache invalidation).
 *
 * History preserved via versioning: every save bumps version + creates a copy.
 */

const AffiliateConfigSchema = new mongoose.Schema(
  {
    _id: { type: String, default: 'current' },
    version: { type: Number, default: 1 },
    effectiveAt: { type: Date, default: Date.now },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedFor: String, // reason for change

    // Track A overrides (default = service code values)
    trackA: {
      networkPoolPercent: Number,         // default 5
      l1Percent: Number,                  // default 3
      l2Percent: Number,                  // default 1.5
      mvpMaxDepth: Number,                // default 2
    },

    // Track B overrides
    trackB: {
      enabled: { type: Boolean, default: true },
      levelRates: mongoose.Schema.Types.Mixed, // { 1: 0.05, 2: 0.03, ... }
    },

    // Bonuses — toggle + override values
    bonuses: mongoose.Schema.Types.Mixed,

    // Capping overrides
    capping: {
      dailyByRank: mongoose.Schema.Types.Mixed,
      monthlyMultiplier: Number,
      perTxCapUsd: Number,
    },

    // Industry category rate overrides
    industryRates: mongoose.Schema.Types.Mixed,

    // Pricing
    priceLock: {
      lockDays: Number,
      graceDays: Number,
      graceIncreasePercent: Number,
    },

    dynamicPricing: {
      phaseThreshold: Number,
      phaseStepPercent: Number,
      phasesPerRound: Number,
      maxMultiplier: Number,
    },

    // Anti-fraud thresholds
    antiFraud: {
      refundWindowDays: Number,
      burstSignupPerIp: Number,
      activeLegWindowDays: Number,
      inactivityDays: Number,
      stlDropGraceDays: Number,
    },
  },
  { timestamps: true, _id: false, minimize: false }
);

export default mongoose.models.AffiliateConfig ||
  mongoose.model('AffiliateConfig', AffiliateConfigSchema);
