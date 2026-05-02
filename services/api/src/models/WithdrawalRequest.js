import mongoose from 'mongoose';

/**
 * Withdrawal Request Model — Phase 8 Epic C.4
 *
 * Tracks user-initiated withdrawal requests through admin approval pipeline.
 * MVP: stub flow (request → admin queue → manual approve/reject).
 * Phase 2: integrate real adapters (USDT TRC20, JazzCash, HBL).
 */

const WithdrawalRequestSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    sourceWallet: {
      type: String,
      enum: ['main', 'affiliate'],
      required: true,
    },
    amountUsd: { type: Number, required: true, min: 0 },
    /** Destination */
    destinationType: {
      type: String,
      enum: ['USDT_TRC20', 'USDT_ERC20', 'USDT_BEP20', 'BANK_PK_JAZZCASH', 'BANK_PK_HBL', 'BANK_AE', 'BANK_US', 'BANK_IN', 'BANK_UK'],
      required: true,
    },
    destinationAddress: String, // USDT address or bank account
    destinationLabel: String,    // user-friendly name
    /** Fees */
    feeUsd: { type: Number, default: 0 },
    netAmountUsd: { type: Number, required: true },
    /** State machine */
    status: {
      type: String,
      enum: [
        'pending_2fa',         // user must complete 2FA
        'pending_kyc',         // KYC tier insufficient
        'pending_admin_review', // routed to admin queue
        'admin_approved',
        'admin_rejected',
        'in_payout',           // executing via adapter
        'completed',
        'failed',
        'reversed',
      ],
      default: 'pending_2fa',
      index: true,
    },
    /** 2FA verification */
    twoFactorVerifiedAt: Date,
    /** KYC check */
    kycTierAtRequest: { type: Number, min: 0, max: 4 },
    /** Admin approval */
    adminReviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    adminReviewedAt: Date,
    adminApprovalNotes: String,
    /** Adapter execution */
    adapterUsed: String,
    adapterTransactionId: String,
    adapterResponseRaw: mongoose.Schema.Types.Mixed,
    /** Timestamps */
    requestedAt: { type: Date, default: Date.now },
    completedAt: Date,
    failedAt: Date,
    failureReason: String,
    /** Audit */
    ipAddress: String,
    userAgent: String,
  },
  { timestamps: true }
);

WithdrawalRequestSchema.index({ userId: 1, status: 1, createdAt: -1 });
WithdrawalRequestSchema.index({ status: 1, createdAt: -1 }); // admin queue queries
WithdrawalRequestSchema.index({ adapterTransactionId: 1 });

export default mongoose.models.WithdrawalRequest || mongoose.model('WithdrawalRequest', WithdrawalRequestSchema);
