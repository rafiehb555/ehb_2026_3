import mongoose from 'mongoose';

const BlockchainProofSchema = new mongoose.Schema(
  {
    hash: { type: String, required: true, unique: true, index: true },
    targetType: {
      type: String,
      enum: ['crb_certificate', 'pss_kyc', 'stl_milestone', 'wallet_escrow', 'franchise_activation', 'commission_settlement'],
      required: true,
      index: true,
    },
    targetId: { type: String, required: true, index: true },
    payload: mongoose.Schema.Types.Mixed, // original data that was hashed
    network: { type: String, enum: ['testnet', 'mainnet', 'stub'], default: 'stub' },
    parachain: { type: String, default: 'ehb-polkadot' },
    blockNumber: Number,
    blockHash: String,
    txHash: String,
    anchoredAt: Date,
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

BlockchainProofSchema.index({ targetType: 1, targetId: 1 });

export default mongoose.models.BlockchainProof ||
  mongoose.model('BlockchainProof', BlockchainProofSchema);
