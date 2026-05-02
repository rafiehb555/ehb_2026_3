import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: String,
    unitPriceUsd: Number,
    quantity: { type: Number, default: 1, min: 1 },
    subtotalUsd: Number,
    productStl: Number, // snapshot at order time
    sellerStl: Number,
  },
  { _id: true }
);

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    items: [OrderItemSchema],
    totals: {
      subtotalUsd: Number,
      shippingUsd: { type: Number, default: 0 },
      platformFeeUsd: Number, // 2% of subtotal
      totalUsd: Number,
    },
    escrow: {
      locked: { type: Boolean, default: false },
      amountUsd: Number,
      lockedAt: Date,
      releasedAt: Date,
    },
    status: {
      type: String,
      enum: [
        'pending', // created, escrow not yet locked
        'paid', // escrow locked
        'ready', // seller prepared
        'assigned', // rider assigned
        'in_transit',
        'delivered',
        'confirmed', // buyer confirmed → funds released
        'cancelled',
        'disputed',
        'refunded',
      ],
      default: 'pending',
      index: true,
    },
    finalStl: { type: Number }, // MIN-chain snapshot
    blockingLayer: String,
    franchise: {
      subId: { type: mongoose.Schema.Types.ObjectId, ref: 'Franchise' },
      masterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Franchise' },
      corporateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Franchise' },
    },
    delivery: {
      riderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Rider' },
      deliveryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Delivery' },
      address: String,
      estimatedAt: Date,
    },
    payment: {
      provider: { type: String, default: 'stub' },
      gatewayRef: String,
    },
    commissionSettled: { type: Boolean, default: false },
    commissionBreakdown: mongoose.Schema.Types.Mixed,
    timeline: [
      {
        at: Date,
        event: String,
        by: String, // userId or 'system'
        meta: mongoose.Schema.Types.Mixed,
      },
    ],
  },
  { timestamps: true }
);

OrderSchema.index({ buyerId: 1, createdAt: -1 });
OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ 'franchise.subId': 1 });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
