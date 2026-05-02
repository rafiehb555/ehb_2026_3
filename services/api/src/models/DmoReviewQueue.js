import mongoose from 'mongoose';

/**
 * DMO Review Queue Model — Phase 8 Epic B.4
 *
 * Flagged affiliate cases requiring DMO inspector review.
 * Sources: high-risk fraud signals, velocity bursts, refund spikes,
 * ML anomaly model (Phase 2), manual user reports.
 */

const DmoReviewQueueSchema = new mongoose.Schema(
  {
    targetUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    targetType: {
      type: String,
      enum: ['affiliate', 'order', 'commission', 'withdrawal', 'kyc'],
      required: true,
    },
    targetId: String, // ObjectId of affiliate/order/commission/withdrawal record
    /** What flagged this */
    flagReason: {
      type: String,
      enum: [
        'velocity_burst', 'self_purchase_pattern', 'wash_trade_ip_match',
        'refund_spike', 'ml_high_risk_score', 'manual_report',
        'ofac_potential_match', 'kyc_document_quality', 'large_withdrawal',
      ],
      required: true,
      index: true,
    },
    flagSeverity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
      index: true,
    },
    flagDetails: String,
    relatedSignals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FraudSignal' }],
    /** Status */
    status: {
      type: String,
      enum: ['pending', 'in_review', 'resolved_clear', 'resolved_action', 'escalated'],
      default: 'pending',
      index: true,
    },
    /** Resolution */
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resolvedAt: Date,
    resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resolution: {
      type: String,
      enum: ['clear', 'soft_block', 'hard_block', 'reverse_commissions', 'reduce_rank', 'kyc_required', 'other'],
    },
    resolutionNotes: String,
    /** Appeal */
    appealedAt: Date,
    appealNotes: String,
    appealStatus: {
      type: String,
      enum: ['none', 'pending', 'upheld', 'overturned'],
      default: 'none',
    },
  },
  { timestamps: true }
);

DmoReviewQueueSchema.index({ status: 1, flagSeverity: 1, createdAt: -1 });
DmoReviewQueueSchema.index({ targetUserId: 1, status: 1 });

export default mongoose.models.DmoReviewQueue || mongoose.model('DmoReviewQueue', DmoReviewQueueSchema);
