/**
 * EHB Database Models — Mongoose schemas
 *
 * All models in one place for easy import + schema overview.
 * Uses Mongoose 7 (ESM-aware via require()).
 */

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// =====================================================================
// USER (canonical identity entity)
// =====================================================================

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  phone: { type: String, index: true },
  passwordHash: { type: String, required: true },
  name: String,
  country: { type: String, index: true }, // ISO code: PK, AE, SA, etc.
  language: { type: String, default: 'en' },
  currency: { type: String, default: 'USD' },

  role: {
    type: String,
    enum: ['GUEST','USER','BUYER','SELLER','SERVICE_PROVIDER','RIDER','INSPECTOR',
           'EMPLOYER','JOB_SEEKER','PRODUCTION_CO','MICRO_FRANCHISE','SUB_FRANCHISE',
           'CORPORATE_FRANCHISE','MASTER_FRANCHISE','COUNTRY_FRANCHISE',
           'DMO_STAFF','PSS_OFFICER','CRB_OFFICER','DMO_SENIOR','DMO_COUNCIL','FOUNDER'],
    default: 'USER',
    index: true,
  },

  pssLevel: { type: Number, min: 0, max: 10, default: 0 },
  crbLevel: { type: Number, min: 0, max: 10, default: 0 },
  dmoLevel: { type: Number, min: 0, max: 10, default: 0 },

  stl: {
    score: { type: Number, default: 0 },
    level: { type: Number, min: 1, max: 10, default: 1 },
    levelName: { type: String, default: 'FREE' },
    lastComputedAt: Date,
  },

  bts: { type: Number, default: 50 }, // Buyer Trust Score 0-100

  industries: [String], // Industry codes user is active in

  status: {
    type: String,
    enum: ['ACTIVE','SUSPENDED_24H','SUSPENDED_7D','SUSPENDED_30D','BANNED','UNDER_REVIEW'],
    default: 'ACTIVE',
    index: true,
  },

  lastSlashDate: Date,
  totalEarnedUsd: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

UserSchema.index({ 'stl.level': -1 });

// =====================================================================
// ENTITY (Service / Shop / Production / Franchise — earning entities with locks)
// =====================================================================

const EntitySchema = new Schema({
  type: {
    type: String,
    enum: ['SERVICE','SHOP','RIDER','INSPECTOR','EMPLOYER','PRODUCTION_CO',
           'FRANCHISE_MICRO','FRANCHISE_SUB','FRANCHISE_CORPORATE','FRANCHISE_MASTER','FRANCHISE_COUNTRY'],
    required: true,
    index: true,
  },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: String,
  industry: { type: String, index: true },
  country: { type: String, index: true },
  region: String,
  metro: String,
  zone: String,

  stl: {
    level: { type: Number, min: 1, max: 10, default: 1 },
    score: Number,
  },

  ehbgcLocked: { type: Number, default: 0 },
  industryMultiplier: { type: Number, default: 1.0 },

  status: {
    type: String,
    enum: ['ACTIVE','PENDING','SUSPENDED','CLOSED','UNDER_REVIEW'],
    default: 'PENDING',
  },

  // Franchise-specific
  franchiseTier: { type: String }, // L1-L10 for Sub
  parentFranchiseId: { type: Schema.Types.ObjectId, ref: 'Entity' },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

// =====================================================================
// ORDER (transaction core)
// =====================================================================

const OrderSchema = new Schema({
  orderId: { type: String, unique: true, index: true }, // human-readable
  buyerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  sellerEntityId: { type: Schema.Types.ObjectId, ref: 'Entity' },
  riderId: { type: Schema.Types.ObjectId, ref: 'User' },

  industry: { type: String, required: true, index: true },
  productId: Schema.Types.ObjectId,

  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },

  // Franchise tier IDs (for revenue split)
  subFranchiseId: { type: Schema.Types.ObjectId, ref: 'Entity' },
  corporateFranchiseId: { type: Schema.Types.ObjectId, ref: 'Entity' },
  masterFranchiseId: { type: Schema.Types.ObjectId, ref: 'Entity' },
  countryFranchiseId: { type: Schema.Types.ObjectId, ref: 'Entity' },

  state: {
    type: String,
    enum: ['DRAFT','SUBMITTED','PAYMENT_HELD','ACCEPTED','IN_PROGRESS','FULFILLED',
           'REVIEWED','SETTLED','ANCHORED','CANCELLED','DISPUTE_OPEN','DISPUTE_RESOLVED',
           'REFUND_REQUESTED','REFUND_APPROVED','REFUNDED'],
    default: 'DRAFT',
    index: true,
  },

  paymentMethod: String, // stripe, jazzcash, ehbgc, etc.
  escrowLockId: String,

  fulfillmentSlaHours: { type: Number, default: 24 },
  coolingDays: { type: Number, default: 7 },

  reviewSubmittedAt: Date,
  settledAt: Date,
  anchoredHash: String,

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

OrderSchema.index({ state: 1, createdAt: -1 });
OrderSchema.index({ industry: 1, state: 1 });

// =====================================================================
// TRANSACTION (every money movement)
// =====================================================================

const TransactionSchema = new Schema({
  type: {
    type: String,
    enum: ['LOCK','UNLOCK','TRANSFER','SLASH','YIELD','REFUND','MINT','BURN','FEE'],
    required: true,
    index: true,
  },
  fromUserId: { type: Schema.Types.ObjectId, ref: 'User' },
  toUserId: { type: Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  orderId: { type: String, index: true },
  lockId: String,
  reason: String,
  audit: {
    polkadotHash: String,
    blockNumber: Number,
  },
  createdAt: { type: Date, default: Date.now, index: true },
});

// =====================================================================
// LOCK (EHBGC locks per entity)
// =====================================================================

const LockSchema = new Schema({
  lockId: { type: String, unique: true, index: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  entityId: { type: Schema.Types.ObjectId, ref: 'Entity', index: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'EHBGC' },
  purpose: { type: String, enum: ['ENTITY_BASE','ESCROW','BURN','OTHER'] },
  status: {
    type: String,
    enum: ['LOCKED','GRACE_PERIOD','RELEASING','RELEASED','SLASHED','BURNED'],
    default: 'LOCKED',
    index: true,
  },
  yieldRate: { type: Number, default: 0.04 },
  yieldEarned: { type: Number, default: 0 },
  unlockRequestedAt: Date,
  releasedAt: Date,
  createdAt: { type: Date, default: Date.now },
});

// =====================================================================
// COMPLAINT (disputes)
// =====================================================================

const ComplaintSchema = new Schema({
  complaintId: { type: String, unique: true, index: true },
  type: { type: String, enum: ['T1','T2','T3','T4','T5','T6','T7','T8'], required: true },
  filedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  against: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  orderId: { type: String, index: true },
  description: String,
  evidence: [{
    type: String, // url
    description: String,
  }],
  status: {
    type: String,
    enum: ['OPEN','IN_REVIEW','MEDIATING','RESOLVED','REJECTED','APPEALING','CLOSED'],
    default: 'OPEN',
    index: true,
  },
  resolution: String,
  outcome: { type: String, enum: ['UPHELD','REJECTED','PARTIAL'] },
  slashAppliedPct: Number,
  resolvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  resolvedAt: Date,
  createdAt: { type: Date, default: Date.now, index: true },
});

// =====================================================================
// DMO QUEUE ITEM (unified queue for complaints + applications + flagged users)
// =====================================================================

const DmoQueueItemSchema = new Schema({
  itemId: { type: String, unique: true, index: true },
  type: {
    type: String,
    enum: ['COMPLAINT', 'APPLICATION', 'FLAGGED_USER', 'FRAUD_ALERT', 'APPEAL'],
    required: true,
    index: true,
  },
  reason: { type: String, enum: ['fraud', 'dispute', 'violation', 'application', 'review'], index: true },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium',
    index: true,
  },
  industry: { type: String, index: true },
  country: { type: String, index: true },
  status: {
    type: String,
    enum: ['OPEN', 'IN_REVIEW', 'ESCALATED', 'RESOLVED', 'CLOSED'],
    default: 'OPEN',
    index: true,
  },
  outcome: { type: String, enum: ['UPHELD', 'REJECTED', 'PARTIAL'] },
  slashPct: Number,
  payload: Schema.Types.Mixed,
  autoFlags: [String],

  userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  escalatedTo: { type: Schema.Types.ObjectId, ref: 'User' },

  history: [{
    action: { type: String, enum: ['approve', 'reject', 'escalate', 'penalize', 'assign', 'comment'] },
    reason: String,
    slashPct: Number,
    actorId: { type: Schema.Types.ObjectId, ref: 'User' },
    actorRole: String,
    at: { type: Date, default: Date.now },
  }],

  resolvedAt: Date,
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

DmoQueueItemSchema.index({ status: 1, severity: 1, createdAt: -1 });
DmoQueueItemSchema.index({ industry: 1, status: 1 });

// =====================================================================
// REVIEW
// =====================================================================

const ReviewSchema = new Schema({
  orderId: { type: String, required: true, index: true },
  reviewerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  targetUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  reviewerSTL: { type: Number },
  reviewerWeight: { type: Number, default: 1.0 },
  ratings: {
    quality: { type: Number, min: 1, max: 5 },
    communication: { type: Number, min: 1, max: 5 },
    speed: { type: Number, min: 1, max: 5 },
    value: { type: Number, min: 1, max: 5 },
    trust: { type: Number, min: 1, max: 5 },
  },
  text: String,
  weightedAverage: Number,
  createdAt: { type: Date, default: Date.now, index: true },
});

// =====================================================================
// STL EVENT (audit trail)
// =====================================================================

const StlEventSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  delta: { type: Number, required: true },
  oldLevel: Number,
  newLevel: Number,
  oldScore: Number,
  newScore: Number,
  reason: String,
  triggerEvent: String, // e.g. "order.reviewed"
  triggerEntityId: String,
  audit: {
    polkadotHash: String,
  },
  createdAt: { type: Date, default: Date.now, index: true },
});

// =====================================================================
// FRANCHISE APPLICATION
// =====================================================================

const FranchiseAppSchema = new Schema({
  applicantId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  tier: { type: String, enum: ['MICRO','SUB','CORPORATE','MASTER','COUNTRY'], required: true },
  subLevel: Number, // 1-10 for Sub
  industries: [String],
  country: String,
  region: String,
  metro: String,
  zone: String,
  capitalUsd: Number,
  status: {
    type: String,
    enum: ['SUBMITTED','SCREENING','INTERVIEW','BACKGROUND_CHECK','APPROVED','REJECTED','CAPITAL_LOCK','ACTIVE'],
    default: 'SUBMITTED',
  },
  documents: [{ type: String, url: String }],
  references: [String],
  createdAt: { type: Date, default: Date.now },
});

// =====================================================================
// Export models
// =====================================================================

module.exports = {
  User: model('User', UserSchema),
  Entity: model('Entity', EntitySchema),
  Order: model('Order', OrderSchema),
  Transaction: model('Transaction', TransactionSchema),
  Lock: model('Lock', LockSchema),
  Complaint: model('Complaint', ComplaintSchema),
  DmoQueueItem: model('DmoQueueItem', DmoQueueItemSchema),
  Review: model('Review', ReviewSchema),
  StlEvent: model('StlEvent', StlEventSchema),
  FranchiseApp: model('FranchiseApp', FranchiseAppSchema),
};
