import mongoose from 'mongoose';

const PenaltySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    reason: String,
    action: {
      type: String,
      enum: ['warning', 'fine', 'stl_drop', 'suspend', 'terminate'],
      required: true,
    },
    severity: { type: Number, min: 1, max: 10 },
    complaintId: { type: mongoose.Schema.Types.ObjectId, ref: 'Complaint' },
    appliedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    stlDrop: Number, // levels dropped (if stl_drop)
    fineUsd: Number,
    effectiveUntil: Date,
  },
  { timestamps: true }
);

PenaltySchema.index({ userId: 1, createdAt: -1 });
PenaltySchema.index({ action: 1 });

export default mongoose.models.Penalty || mongoose.model('Penalty', PenaltySchema);
