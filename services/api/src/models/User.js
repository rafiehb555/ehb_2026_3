import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String },
    role: {
      type: String,
      enum: [
        'user',
        'franchisee',
        'DMO_MANAGER',
        'DMO_ANALYST',
        'DMO_SUPPORT',
        'DMO_INSPECTOR',
        'DMO_DIRECTOR',
        'SUPER_ADMIN',
      ],
      default: 'user',
    },
    pss: {
      level: { type: Number, default: 0, min: 0, max: 10 },
      status: {
        type: String,
        enum: ['pending', 'verified', 'rejected'],
        default: 'pending',
      },
      submittedAt: Date,
      verifiedAt: Date,
    },
    crb: {
      level: { type: Number, default: 0, min: 0, max: 10 },
      certifications: [{ name: String, issuer: String, hash: String, expiresAt: Date }],
    },
    dmo: {
      level: { type: Number, default: 1, min: 1, max: 10 },
      score: { type: Number, default: 0, min: 0, max: 100 },
      lastRecalc: Date,
    },
    stl: {
      score: { type: Number, default: 0, min: 0, max: 100 },
      level: { type: Number, default: 1, min: 1, max: 10 },
      history: [{ ts: Date, score: Number, event: String }],
    },
    wallet: {
      ehbgcBalance: { type: Number, default: 0 },
      ehbgcLocked: { type: Number, default: 0 },
      usdBalance: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1 });

export default mongoose.models.User || mongoose.model('User', UserSchema);
