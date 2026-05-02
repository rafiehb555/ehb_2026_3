import mongoose from 'mongoose';

/**
 * Franchise Record Model — per ER diagram + state machine diagram
 *
 * Represents an individual franchise instance owned by a user.
 * Distinct from the existing `Franchise` model (which is the franchise tier catalog);
 * this is the per-user owned franchise record.
 *
 * State machine (per founder lock 2026-04-25 + diagram):
 *   LOCKED → CERTIFIED → VERIFIED → LICENSED → ACTIVE
 *   ↓
 *   REJECTED (any failure path)
 *
 * Transitions:
 *   LOCKED      ← affiliate earns franchise via reward / direct purchase
 *   CERTIFIED   ← user completes Education Department training (8 modules)
 *   VERIFIED    ← CRB physical verification passes (3-7 day SLA)
 *   LICENSED    ← DMO License Approval issued
 *   ACTIVE      ← Dashboard activation; passive income flow begins
 *   REJECTED    ← any step fails
 */

const FranchiseRecordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    /** Tier — OF1 / OF2 / OF3 / OF4 / SUB_L1..SUB_L10 / MASTER */
    tier: {
      type: String,
      enum: [
        'OF1', 'OF2', 'OF3', 'OF4',
        'SUB_L1', 'SUB_L2', 'SUB_L3', 'SUB_L4', 'SUB_L5',
        'SUB_L6', 'SUB_L7', 'SUB_L8', 'SUB_L9', 'SUB_L10',
        'MASTER',
      ],
      required: true,
      index: true,
    },
    /** Country of operation (drives bank rails + KYC vendor) */
    country: { type: String, required: true, index: true },
    /** State machine */
    status: {
      type: String,
      enum: ['LOCKED', 'CERTIFIED', 'VERIFIED', 'LICENSED', 'ACTIVE', 'REJECTED', 'SUSPENDED'],
      default: 'LOCKED',
      index: true,
    },
    /** How the franchise was earned */
    acquisitionType: {
      type: String,
      enum: ['affiliate_reward', 'direct_purchase', 'admin_grant', 'migration'],
      required: true,
    },
    purchasePriceUsd: Number,
    purchaseEhbgcLocked: Number,
    /** Step timestamps (for SLA tracking + state machine audit) */
    lockedAt: { type: Date, default: Date.now },
    certifiedAt: Date,
    verifiedAt: Date,
    licensedAt: Date,
    activeAt: Date,
    rejectedAt: Date,
    rejectedReason: String,
    suspendedAt: Date,
    suspendedReason: String,
    /** Training (Education Dept) */
    trainingStartedAt: Date,
    trainingCompletedAt: Date,
    trainingCertificateId: String,
    trainingModulesCompleted: [String],
    /** CRB Physical Verification */
    crbCheckedAt: Date,
    crbInspectorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    crbVerificationDocs: [{
      docType: String,
      url: String,
      uploadedAt: Date,
    }],
    crbNotes: String,
    /** DMO License */
    dmoLicenseId: String,
    dmoApproverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    /** Dashboard / passive income tracking */
    dashboardActivatedAt: Date,
    lifetimeIncomeUsd: { type: Number, default: 0 },
    thisMonthIncomeUsd: { type: Number, default: 0 },
    /** Upgrade chain */
    upgradedFromTier: String,
    upgradedAt: Date,
    upgradeRequestedAt: Date,
  },
  { timestamps: true }
);

FranchiseRecordSchema.index({ userId: 1, status: 1 });
FranchiseRecordSchema.index({ tier: 1, country: 1, status: 1 });
FranchiseRecordSchema.index({ status: 1, lockedAt: -1 });

/** Helper: check if a state transition is legal per spec */
FranchiseRecordSchema.methods.canTransitionTo = function (nextStatus) {
  const transitions = {
    LOCKED: ['CERTIFIED', 'REJECTED'],
    CERTIFIED: ['VERIFIED', 'REJECTED'],
    VERIFIED: ['LICENSED', 'REJECTED'],
    LICENSED: ['ACTIVE', 'REJECTED'],
    ACTIVE: ['SUSPENDED', 'REJECTED'],
    SUSPENDED: ['ACTIVE', 'REJECTED'], // recoverable
    REJECTED: [], // terminal
  };
  return (transitions[this.status] || []).includes(nextStatus);
};

export default mongoose.models.FranchiseRecord ||
  mongoose.model('FranchiseRecord', FranchiseRecordSchema);
