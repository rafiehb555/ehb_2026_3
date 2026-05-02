import mongoose from 'mongoose';

const DeliverySchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true, index: true },
    riderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Rider', index: true },
    pickupAddress: String,
    dropoffAddress: String,
    status: {
      type: String,
      enum: ['unassigned', 'assigned', 'picked_up', 'in_transit', 'delivered', 'failed'],
      default: 'unassigned',
      index: true,
    },
    slaDeadlineAt: Date,
    events: [
      {
        at: Date,
        event: String,
        lat: Number,
        lng: Number,
        notes: String,
      },
    ],
    assignedAt: Date,
    pickedUpAt: Date,
    deliveredAt: Date,
  },
  { timestamps: true }
);

export default mongoose.models.Delivery || mongoose.model('Delivery', DeliverySchema);
