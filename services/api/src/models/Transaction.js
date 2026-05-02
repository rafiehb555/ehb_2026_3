import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
  {
    fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    toUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: {
      type: String,
      enum: [
        'deposit',
        'withdrawal',
        'transfer',
        'escrow_lock',
        'escrow_release',
        'franchise_lock',
        'franchise_unlock',
        'commission_credit',
        'commission_debit',
        'stl_lock',
        'stl_unlock',
        'refund',
      ],
      required: true,
    },
    currency: { type: String, enum: ['EHBGC', 'USD', 'PKR'], default: 'EHBGC' },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'reversed'],
      default: 'pending',
      index: true,
    },
    referenceId: String, // e.g. orderId, applicationId, franchiseId
    referenceType: String,
    gatewayProvider: { type: String, enum: ['internal', 'jazzcash', 'easypaisa', 'stripe', 'bank'], default: 'internal' },
    gatewayRef: String,
    onChainHash: String,
    notes: String,
  },
  { timestamps: true }
);

TransactionSchema.index({ fromUserId: 1, createdAt: -1 });
TransactionSchema.index({ toUserId: 1, createdAt: -1 });
TransactionSchema.index({ type: 1, createdAt: -1 });
TransactionSchema.index({ referenceId: 1, referenceType: 1 });

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
