import mongoose from 'mongoose';

const WalletSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    ehbgcBalance: { type: Number, default: 0 },
    ehbgcLocked: { type: Number, default: 0 },
    usdBalance: { type: Number, default: 0 },
    locks: [
      {
        purpose: String, // 'franchise_L3', 'stl_cap_L7', etc.
        amount: Number,
        referenceId: String,
        lockedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Wallet || mongoose.model('Wallet', WalletSchema);
