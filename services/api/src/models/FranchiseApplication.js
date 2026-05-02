import mongoose from 'mongoose';

const FranchiseApplicationSchema = new mongoose.Schema(
  {
    applicationId: { type: String, required: true, unique: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, enum: ['sub', 'online', 'master', 'corporate', 'country'], required: true },
    level: { type: String, required: true },
    country: { type: String, default: 'PK' },
    area: String,
    pricingConfirmed: {
      usdPaid: Number,
      ehbgcReserved: Number,
    },
    kycSnapshot: {
      pssLevel: Number,
      crbLevel: Number,
      stlLevel: Number,
      stlScore: Number,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'needs_info'],
      default: 'pending',
      index: true,
    },
    submittedAt: { type: Date, default: Date.now, index: true },
    reviewedAt: Date,
    reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    decisionReason: String,
    franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Franchise' },
    notes: String,
  },
  { timestamps: true }
);

FranchiseApplicationSchema.index({ status: 1, submittedAt: -1 });

export default mongoose.models.FranchiseApplication ||
  mongoose.model('FranchiseApplication', FranchiseApplicationSchema);
