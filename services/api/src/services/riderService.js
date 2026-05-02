import Rider from '../models/Rider.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import Delivery from '../models/Delivery.js';
import { isConnected } from '../config/db.js';
import { logActivity } from './auditService.js';
import { emit as emitRealtime } from './realtime.js';

/** Rider activation gate: PSS L3+, STL L3+ */
export async function applyAsRider({ userId, zone, vehicleType }) {
  if (!isConnected()) throw Object.assign(new Error('DB not connected'), { status: 503 });
  const user = await User.findById(userId);
  if (!user) throw Object.assign(new Error('User not found'), { status: 404 });

  const gate = {
    pssLevel: user.pss?.level || 0,
    crbLevel: user.crb?.level || 0,
    stlLevel: user.stl?.level || 1,
    met: (user.pss?.level || 0) >= 3 && (user.stl?.level || 1) >= 3,
  };

  const existing = await Rider.findOne({ userId });
  if (existing) {
    existing.zone = zone || existing.zone;
    existing.vehicleType = vehicleType || existing.vehicleType;
    await existing.save();
    return existing.toObject();
  }

  const rider = await Rider.create({
    userId,
    zone,
    vehicleType: vehicleType || 'bike',
    activationGate: gate,
    verified: gate.met,
    status: gate.met ? 'active' : 'pending',
  });

  await logActivity({
    actorUserId: userId,
    action: 'rider.applied',
    target: 'rider',
    targetId: rider._id.toString(),
    after: { zone, vehicleType, met: gate.met },
  });

  return rider.toObject();
}

export async function setAvailability(userId, online) {
  if (!isConnected()) return null;
  const rider = await Rider.findOne({ userId });
  if (!rider) throw Object.assign(new Error('Rider profile not found'), { status: 404 });
  rider.online = Boolean(online);
  await rider.save();
  return rider.toObject();
}

export async function getMyRider(userId) {
  if (!isConnected()) return null;
  return Rider.findOne({ userId }).lean();
}

/**
 * Assignment algorithm:
 *   score = rating × 2 + stlLevel × 1.5 − activeOrders × 0.5 + (sameZone ? 5 : 0)
 * Picks the highest-scoring online rider.
 */
export async function assignRiderToOrder(orderId) {
  if (!isConnected()) throw Object.assign(new Error('DB not connected'), { status: 503 });
  const order = await Order.findById(orderId);
  if (!order) throw Object.assign(new Error('Order not found'), { status: 404 });
  if (order.delivery?.riderId) return { alreadyAssigned: true, riderId: order.delivery.riderId };

  const zone = inferZone(order.delivery?.address || '');
  const candidates = await Rider.find({ online: true, status: 'active' }).lean();
  if (!candidates.length) throw Object.assign(new Error('No online riders available'), { status: 503 });

  // Score candidates
  const userIds = candidates.map((c) => c.userId);
  const users = await User.find({ _id: { $in: userIds } }).select('stl').lean();
  const stlByUser = new Map(users.map((u) => [String(u._id), u.stl?.level || 1]));

  let best = null;
  let bestScore = -Infinity;
  for (const r of candidates) {
    const stl = stlByUser.get(String(r.userId)) || 1;
    const sameZone = zone && r.zone && r.zone.toLowerCase().includes(zone.toLowerCase()) ? 5 : 0;
    const score =
      (r.rating || 5) * 2 + stl * 1.5 - (r.stats?.activeOrders || 0) * 0.5 + sameZone;
    if (score > bestScore) {
      bestScore = score;
      best = r;
    }
  }
  if (!best) throw new Error('No suitable rider');

  // Create delivery + attach to order
  const delivery = await Delivery.create({
    orderId: order._id,
    riderId: best._id,
    pickupAddress: `Seller zone ${zone || 'TBD'}`,
    dropoffAddress: order.delivery?.address,
    status: 'assigned',
    assignedAt: new Date(),
    slaDeadlineAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2h default SLA
    events: [{ at: new Date(), event: 'assigned' }],
  });

  order.delivery.riderId = best._id;
  order.delivery.deliveryId = delivery._id;
  order.status = 'assigned';
  order.timeline.push({ at: new Date(), event: 'rider_assigned', by: 'system', meta: { riderId: best._id } });
  await order.save();

  await Rider.updateOne({ _id: best._id }, { $inc: { 'stats.activeOrders': 1 } });

  emitRealtime('/delivery', 'rider:assigned', {
    orderNumber: order.orderNumber,
    riderId: String(best._id),
    bestScore,
  });

  return { delivery: delivery.toObject(), riderId: best._id, score: bestScore };
}

export async function recordDeliveryEvent({ deliveryId, event, lat, lng, notes }) {
  if (!isConnected()) throw Object.assign(new Error('DB not connected'), { status: 503 });
  const d = await Delivery.findById(deliveryId);
  if (!d) throw Object.assign(new Error('Delivery not found'), { status: 404 });

  const at = new Date();
  d.events.push({ at, event, lat, lng, notes });

  if (event === 'picked_up') {
    d.status = 'picked_up';
    d.pickedUpAt = at;
  } else if (event === 'in_transit') {
    d.status = 'in_transit';
  } else if (event === 'delivered') {
    d.status = 'delivered';
    d.deliveredAt = at;
    // Update order
    await Order.updateOne({ _id: d.orderId }, { status: 'delivered', $push: { timeline: { at, event: 'delivered', by: 'rider' } } });
    // Free up rider active slot
    if (d.riderId) {
      await Rider.updateOne(
        { _id: d.riderId },
        { $inc: { 'stats.totalDeliveries': 1, 'stats.activeOrders': -1 } }
      );
    }
  } else if (event === 'failed') {
    d.status = 'failed';
  }

  await d.save();
  emitRealtime('/delivery', `delivery:${event}`, { deliveryId: String(d._id), orderId: String(d.orderId) });
  return d.toObject();
}

export async function listOnlineRiders() {
  if (!isConnected()) return [];
  return Rider.find({ online: true, status: 'active' }).lean();
}

function inferZone(address = '') {
  const cities = ['Islamabad', 'Lahore', 'Karachi', 'Rawalpindi', 'Multan', 'Peshawar'];
  for (const c of cities) if (address.toLowerCase().includes(c.toLowerCase())) return c;
  return null;
}
