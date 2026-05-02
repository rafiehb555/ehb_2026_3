import mongoose from 'mongoose';

const ComplaintSchema = new mongoose.Schema(
  {
    complaintNumber: { type: String, required: true, unique: true, index: true },
    filerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    againstUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', index: true },
    category: {
      type: String,
      enum: [
        'late_delivery',
        'item_damaged',
        'not_as_described',
        'fraud',
        'abusive_behavior',
        'refund_dispute',
        'quality_issue',
        'other',
      ],
      required: true,
    },
    tier: { type: Number, min: 1, max: 6, default: 1 }, // 1=low, 6=critical
    summary: String,
    details: String,
    evidence: [String], // file URLs
    slaDeadlineAt: Date,
    status: {
      type: String,
      enum: ['open', 'in_review', 'resolved', 'rejected', 'escalated', 'appealing'],
      default: 'open',
      index: true,
    },
    resolution: {
      by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      at: Date,
      action: String, // 'refund', 'replace', 'penalty_applied', 'dismissed'
      notes: String,
    },
    appealNotes: String,
  },
  { timestamps: true }
);

ComplaintSchema.index({ status: 1, createdAt: -1 });
ComplaintSchema.index({ againstUserId: 1, createdAt: -1 });
ComplaintSchema.index({ tier: -1, status: 1 });

export default mongoose.models.Complaint || mongoose.model('Complaint', ComplaintSchema);
