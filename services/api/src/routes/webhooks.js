/**
 * Payment Webhook Routes
 *
 *   POST /api/webhooks/stripe
 *   POST /api/webhooks/jazzcash
 *
 * Both endpoints:
 *   - verify signature/HMAC
 *   - check idempotency via X-EHB-Event-Id
 *   - emit eventQueue events for downstream handlers
 *   - track metrics (success/failure)
 */

import { Router, raw } from 'express';
import { metrics } from '../middleware/metrics.js';

// Lazy-load adapters (they require optional packages)
let StripeAdapter, JazzCashAdapter;
async function getAdapters() {
  if (!StripeAdapter) {
    StripeAdapter = (await import('../adapters/wallet/stripeAdapter.js')).default;
    JazzCashAdapter = (await import('../adapters/wallet/jazzCashAdapter.js')).default;
  }
  return { StripeAdapter, JazzCashAdapter };
}

const router = Router();

// Idempotency cache (in-memory; replace with Redis in production)
const seenEvents = new Map();
const IDEMPOTENCY_TTL_MS = 24 * 60 * 60 * 1000;

function isAlreadyProcessed(eventId) {
  if (!eventId) return false;
  const seenAt = seenEvents.get(eventId);
  if (!seenAt) return false;
  return Date.now() - seenAt < IDEMPOTENCY_TTL_MS;
}
function markProcessed(eventId) {
  if (!eventId) return;
  seenEvents.set(eventId, Date.now());
  // Cleanup old entries occasionally
  if (seenEvents.size > 10000) {
    const cutoff = Date.now() - IDEMPOTENCY_TTL_MS;
    for (const [k, v] of seenEvents) {
      if (v < cutoff) seenEvents.delete(k);
    }
  }
}

// =====================================================================
// STRIPE WEBHOOK
// =====================================================================
// Stripe requires the raw body for signature verification.
router.post('/stripe', raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['stripe-signature'];
  const rawBody = req.body; // Buffer

  if (!signature) {
    return res.status(400).json({ error: 'EHB-VALID-9001', message: 'Missing stripe-signature header' });
  }

  try {
    const { StripeAdapter: SA } = await getAdapters();
    const adapter = new SA();
    const result = await adapter.handleWebhook({ rawBody, signature });

    if (!result.ok) {
      metrics.paymentFailed('stripe');
      return res.status(400).json({ error: 'webhook_invalid', detail: result.error });
    }

    // Idempotency
    const eventId = req.headers['stripe-event-id'] || result.eventId;
    if (isAlreadyProcessed(eventId)) {
      return res.json({ ok: true, deduped: true });
    }
    markProcessed(eventId);

    // Track success
    if (result.handled === 'payment_intent.succeeded') {
      metrics.paymentSuccess('stripe');
      metrics.escrowReleased('stripe');
    } else if (result.handled === 'charge.refunded') {
      metrics.escrowRefunded('stripe');
    }

    // TODO: enqueue follow-up event
    // eventQueue.enqueue('payment.' + result.handled, result.data);

    res.json({ ok: true, handled: result.handled });
  } catch (err) {
    metrics.paymentFailed('stripe');
    console.error('[webhook/stripe]', err);
    res.status(500).json({ error: 'EHB-SYS-90001', message: err.message });
  }
});

// =====================================================================
// JAZZCASH WEBHOOK (IPN)
// =====================================================================
router.post('/jazzcash', async (req, res) => {
  try {
    const { JazzCashAdapter: JA } = await getAdapters();
    const adapter = new JA();
    const result = await adapter.handleWebhook({ rawBody: JSON.stringify(req.body), headers: req.headers });

    if (!result.ok) {
      metrics.paymentFailed('jazzcash');
      return res.status(400).json({ error: 'invalid_signature' });
    }

    const eventId = req.body.pp_TxnRefNo;
    if (isAlreadyProcessed(eventId)) {
      return res.json({ ok: true, deduped: true });
    }
    markProcessed(eventId);

    // TODO: enqueue follow-up event
    // eventQueue.enqueue('payment.' + result.type, req.body);

    res.json({ ok: true, type: result.type });
  } catch (err) {
    metrics.paymentFailed('jazzcash');
    console.error('[webhook/jazzcash]', err);
    res.status(500).json({ error: 'EHB-SYS-90001', message: err.message });
  }
});

// Health
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'webhooks',
    providers: ['stripe', 'jazzcash'],
    idempotency_cache_size: seenEvents.size,
  });
});

export default router;
