import mongoose from 'mongoose';

/**
 * Referral Model — per ER diagram
 *
 * Records a single referrer→referred relationship event.
 * Existing Affiliate.referredBy + upstream[] tracks the CHAIN; this model
 * tracks each referral as its own entity for analytics + audit + reporting.
 *
 * Use cases:
 *   - "Show me everyone Ahmed referred in March" (date filtering)
 *   - "What % of referrals activated within 7 days"
 *   - Referral attribution disputes
 */

const ReferralSchema = new mongoose.Schema(
  {
    referrerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    referredUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // one referrer per user
    },
    referralCodeUsed: String,
    signupDate: { type: Date, default: Date.now },
    /** Activation tracking */
    activatedAt: Date, // when the referred user makes first qualifying purchase
    activationOrderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    /** Lifecycle status */
    status: {
      type: String,
      enum: ['signed_up', 'verified', 'activated', 'inactive', 'banned'],
      default: 'signed_up',
      index: true,
    },
    /** Attribution metadata */
    sourceCampaign: String,         // utm_campaign or named affiliate campaign
    sourceMedium: String,           // 'whatsapp' | 'email' | 'social' | etc.
    deviceFingerprint: String,
    ipAddress: String,
    geoCountry: String,
    /** Earnings attributed to this referral (denormalized for fast queries) */
    totalEarningsForReferrerUsd: { type: Number, default: 0 },
    lastEarningAt: Date,
  },
  { timestamps: true }
);

ReferralSchema.index({ referrerId: 1, status: 1, signupDate: -1 });
ReferralSchema.index({ status: 1, signupDate: -1 });

export default mongoose.models.Referral || mongoose.model('Referral', ReferralSchema);
