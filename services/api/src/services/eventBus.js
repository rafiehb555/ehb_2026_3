/**
 * EHB · Event Bus
 *
 * Thin facade over eventQueue.js for emitting domain events.
 * Each service that wants to publish an event imports this and calls `emit(eventName, payload)`.
 *
 * Standard EHB events:
 *   - user.signup
 *   - user.kyc_completed
 *   - order.created
 *   - order.payment_held
 *   - order.accepted
 *   - order.fulfilled
 *   - order.reviewed
 *   - order.settled
 *   - order.cancelled
 *   - payment.success
 *   - payment.failed
 *   - payment.refunded
 *   - complaint.filed
 *   - complaint.resolved
 *   - stl.upgraded
 *   - stl.downgraded
 *   - stl.slashed
 *   - ai.intent
 *   - franchise.applied
 *   - franchise.approved
 *   - fraud.detected
 */

import { metrics } from '../middleware/metrics.js';

let queue = null;
async function getQueue() {
  if (queue) return queue;
  const mod = await import('./eventQueue.js');
  queue = mod.default || mod.eventQueue || mod.EventQueue;
  return queue;
}

/**
 * Emit a domain event onto the queue.
 * Returns the event id (or null if queue unavailable).
 */
export async function emit(eventName, payload = {}, options = {}) {
  const q = await getQueue();
  if (!q || typeof q.enqueue !== 'function') {
    console.warn('[eventBus] queue unavailable; dropping event', eventName);
    return null;
  }

  // Track per-event metrics
  switch (eventName) {
    case 'order.created':
      metrics.orderCreated(payload.industry || 'unknown');
      break;
    case 'order.settled':
      metrics.orderSettled(payload.industry || 'unknown');
      break;
    case 'payment.success':
      metrics.paymentSuccess(payload.provider || 'unknown');
      break;
    case 'payment.failed':
      metrics.paymentFailed(payload.provider || 'unknown');
      break;
    case 'complaint.filed':
      metrics.complaintFiled(payload.type || 'unknown');
      break;
    case 'stl.upgraded':
      metrics.stlUpgrade(payload.from_level, payload.to_level);
      break;
    case 'stl.downgraded':
      metrics.stlDowngrade(payload.from_level, payload.to_level);
      break;
    case 'stl.slashed':
      metrics.slashing(payload.reason || 'unknown');
      break;
    case 'fraud.detected':
      metrics.fraudDetected(payload.signal || 'unknown');
      break;
  }

  return q.enqueue(eventName, { ...payload, emitted_at: new Date().toISOString() }, options);
}

/**
 * Subscribe a handler to an event (registered with the queue).
 */
export async function subscribe(eventName, handler) {
  const q = await getQueue();
  if (!q || typeof q.on !== 'function') {
    console.warn('[eventBus] queue does not support subscribe');
    return false;
  }
  q.on(eventName, handler);
  return true;
}

/**
 * Built-in subscriptions wiring core flows.
 * Call `wireDefaultSubscriptions()` once at server startup.
 */
export async function wireDefaultSubscriptions() {
  // order.settled → trigger STL recompute for both buyer + seller
  await subscribe('order.settled', async (payload) => {
    // Lazy import to avoid circular
    const { recomputeUserStl } = await import('./stlServiceWrapper.js').catch(() => ({}));
    if (recomputeUserStl && payload.buyerId) recomputeUserStl(payload.buyerId);
    if (recomputeUserStl && payload.sellerId) recomputeUserStl(payload.sellerId);
  });

  // complaint.filed → enqueue auto-decision evaluation
  await subscribe('complaint.filed', async (payload) => {
    const { applyAutoDecision } = await import('./autoDecisionEngine.js').catch(() => ({}));
    if (applyAutoDecision && payload.userId) {
      // signals + complaints loaded by service in production
      applyAutoDecision({ user: { id: payload.userId, stl: payload.user_stl }, signals: {}, complaints: { upheld_30d: 1 } });
    }
  });

  // fraud.detected → push to DMO queue
  await subscribe('fraud.detected', async (payload) => {
    console.log('[eventBus] fraud.detected →', payload.signal, 'user', payload.userId);
    // TODO: call POST /api/dmo/control/items via internal helper
  });

  console.log('[eventBus] default subscriptions wired');
}

export default { emit, subscribe, wireDefaultSubscriptions };
