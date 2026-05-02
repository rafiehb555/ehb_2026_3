import mongoose from 'mongoose';

/**
 * Fraud Signal Model — Phase 8 Epic B.1 (Signals Collection Pipeline)
 *
 * Captures behavioral + device signals for fraud detection.
 * Phase 1 MVP: collected at signup, login, order placement, withdrawal.
 * Phase 2: feeds into ML anomaly detection model.
 */

const FraudSignalSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    /** Event type — what action triggered this signal */
    eventType: {
      type: String,
      enum: [
        'signup', 'login', 'order_placed', 'order_confirmed', 'commission_credited',
        'withdrawal_requested', 'kyc_submitted', 'referral_join', 'self_purchase_attempt',
        'velocity_burst', 'wash_trade_suspected', 'pattern_anomaly',
      ],
      required: true,
      index: true,
    },
    /** Raw signal data */
    ipAddress: { type: String, index: true },
    userAgent: String,
    deviceFingerprint: String, // FingerprintJS hash (Phase 2)
    geoCountry: String,
    geoCity: String,
    referrerUrl: String,
    /** Linked entities */
    relatedUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // e.g., affiliate when buyer signal
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    sessionId: String,
    /** Risk scoring */
    riskScore: { type: Number, default: 0, min: 0, max: 100 },
    flags: [String], // e.g., 'same_ip_as_referrer', 'high_velocity', 'tor_exit_node'
    /** Outcome */
    action: {
      type: String,
      enum: ['allowed', 'flagged', 'blocked', 'queued_for_review'],
      default: 'allowed',
    },
    reviewedAt: Date,
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviewNotes: String,
  },
  { timestamps: true }
);

FraudSignalSchema.index({ userId: 1, createdAt: -1 });
FraudSignalSchema.index({ eventType: 1, createdAt: -1 });
FraudSignalSchema.index({ ipAddress: 1, createdAt: -1 });
FraudSignalSchema.index({ riskScore: -1, action: 1 });

export default mongoose.models.FraudSignal || mongoose.model('FraudSignal', FraudSignalSchema);
