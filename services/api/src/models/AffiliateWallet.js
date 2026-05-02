import mongoose from 'mongoose';

/**
 * EHB Affiliate Wallet — v3.3 Phase 1 (MVP)
 *
 * Spec: ehb-info/departments/Affiliate.md §13.6 (v3.3)
 * Founder lock: 2026-04-26
 *
 * Separate from Main Wallet (services/api/src/models/Wallet.js — kept untouched).
 *
 * Founder rule (locked): commissions stored Hybrid 80% USDT + 20% EHBGC default.
 * Phase 1 MVP: balance tracking + internal transfer to Main only.
 * Phase 2+ adds: USDT TRC20 deposit/withdraw, bank rails, KYC tier checks, hot/cold split.
 *
 * Spec rules embedded:
 *   - 30-day pending hold (per §6 of v2.0 — earnings move pending → available after 30 days)
 *   - Anti-fraud: refund clawback within 90 days reduces balances (handled by affiliateService)
 *   - Aff→Aff direct transfer NOT allowed (must route via Main)
 */

const AffiliateWalletSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },

    /**
     * Hybrid balance per v3.3 founder lock: 80% USDT + 20% EHBGC default split.
     * User can opt to 100% EHBGC via settings.payoutMix (Phase 2 admin UI).
     */
    balances: {
      // USDT-equivalent (stored as USD-decimal for MVP; Phase 2 adds network breakdown TRC20/ERC20/BEP20)
      usdt: { type: Number, default: 0, min: 0 },
      // EHBGC native token (currently 1 USD = 1 EHBGC simulated peg)
      ehbgc: { type: Number, default: 0, min: 0 },
    },

    /**
     * 30-day pending hold field (anti-fraud safety net per audit #6).
     *
     * **Phase 1 MVP behavior**: pendingHold stays at 0 — all credits go straight to balances.
     *   Refund clawback (within 90-day window per spec §13.6.7) directly debits balances.
     *
     * **Phase 2 (Q3 2026) implementation**:
     *   - creditAffiliateWallet routes amount → pendingHold (not balances)
     *   - Scheduled job runs daily, promotes pendingHold → balances after 30 days
     *   - Refund clawback (within 30 days) debits pendingHold directly (no user impact)
     *   - Refund clawback (30-90 days) attempts balances debit, logs skip if drained
     */
    pendingHold: { type: Number, default: 0, min: 0 },

    /** Total available withdrawable (cached aggregate of usdt + ehbgc converted) */
    availableUsd: { type: Number, default: 0 },

    /** Lifetime aggregates (never decrease except on refund clawback) */
    stats: {
      lifetimeCreditedUsd: { type: Number, default: 0 },
      lifetimeWithdrawnUsd: { type: Number, default: 0 },
      thisMonthCreditedUsd: { type: Number, default: 0 },
      monthAnchor: { type: String, default: '' }, // "2026-04" for monthly reset
    },

    /**
     * Payout mix preference — admin-tunable per spec §13.6.
     * Default 80% USDT + 20% EHBGC.
     */
    settings: {
      payoutMix: {
        usdtPercent: { type: Number, default: 80, min: 0, max: 100 },
        ehbgcPercent: { type: Number, default: 20, min: 0, max: 100 },
      },
      /** User-allowed transfer destinations (Phase 2: bank IBANs, Phase 3: USDT addresses) */
      whitelistedAddresses: [
        {
          network: String, // 'TRC20' | 'ERC20' | 'BEP20' | 'IBAN_PK' etc.
          address: String,
          label: String,
          addedAt: { type: Date, default: Date.now },
          verifiedAt: Date,
          // 24h hold before first use per spec §13.6.7
          activeAfter: Date,
        },
      ],
    },

    /** Last credit/transfer timestamps for activity tracking */
    lastCreditedAt: Date,
    lastTransferredAt: Date,

    /** Frozen status (DMO can freeze suspicious accounts per §13.6.10) */
    status: {
      type: String,
      enum: ['active', 'frozen', 'under_review'],
      default: 'active',
      index: true,
    },
    frozenReason: String,
    frozenAt: Date,
  },
  { timestamps: true }
);

AffiliateWalletSchema.index({ status: 1 });

// Helper method: total balance in USD-equivalent
AffiliateWalletSchema.methods.totalUsd = function () {
  return (this.balances?.usdt || 0) + (this.balances?.ehbgc || 0); // 1:1 peg in MVP
};

export default mongoose.models.AffiliateWallet ||
  mongoose.model('AffiliateWallet', AffiliateWalletSchema);
