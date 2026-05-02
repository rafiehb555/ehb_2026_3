import mongoose from 'mongoose';

// Atomic counter for franchise serial numbers.
// Keyed by country-round-phase-level bucket.
const SerialCounterSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true }, // e.g. "PK-R1-P1-L3"
    seq: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.SerialCounter || mongoose.model('SerialCounter', SerialCounterSchema);
