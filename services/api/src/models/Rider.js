import mongoose from 'mongoose';

const RiderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    zone: { type: String, index: true }, // e.g. "F-10 Islamabad"
    vehicleType: { type: String, enum: ['bike', 'car', 'van'], default: 'bike' },
    verified: { type: Boolean, default: false },
    online: { type: Boolean, default: false, index: true },
    rating: { type: Number, default: 5.0, min: 0, max: 5 },
    stats: {
      totalDeliveries: { type: Number, default: 0 },
      onTimeDeliveries: { type: Number, default: 0 },
      activeOrders: { type: Number, default: 0 },
      earningsTotalUsd: { type: Number, default: 0 },
    },
    activationGate: {
      pssLevel: Number, // snapshot at apply
      crbLevel: Number,
      stlLevel: Number,
      met: Boolean,
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'suspended', 'terminated'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

RiderSchema.index({ zone: 1, online: 1 });

export default mongoose.models.Rider || mongoose.model('Rider', RiderSchema);
