import mongoose from 'mongoose';

const FranchiseSchema = new mongoose.Schema(
  {
    serialNumber: { type: String, required: true, unique: true, index: true },
    ownerUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: {
      type: String,
      enum: ['sub', 'online', 'master', 'corporate', 'country'],
      required: true,
    },
    level: { type: String, required: true }, // L1..L10, OF1..OF4, M, C, C1..C5
    country: { type: String, default: 'PK' },
    round: { type: Number, default: 1 },
    phase: { type: Number, default: 1 },
    pricing: {
      usdPaid: { type: Number, required: true },
      ehbgcLocked: { type: Number, required: true },
      commissionCapPerDay: { type: mongoose.Schema.Types.Mixed, default: 0 }, // number | 'unlimited'
      directCommissionRatePct: Number,
    },
    geography: {
      area: String,
      city: String,
      state: String,
    },
    parent: {
      masterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Franchise' },
      corporateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Franchise' },
      countryFranchiseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Franchise' },
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'suspended', 'terminated'],
      default: 'active',
    },
    activatedAt: Date,
    kpi: {
      usersInZone: { type: Number, default: 0 },
      ordersThisMonth: { type: Number, default: 0 },
      earningsThisMonth: { type: Number, default: 0 },
      complaintsThisMonth: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

FranchiseSchema.index({ country: 1, round: 1, phase: 1, level: 1 });
FranchiseSchema.index({ status: 1 });

export default mongoose.models.Franchise || mongoose.model('Franchise', FranchiseSchema);
