/**
 * EHB · Prometheus Metrics Middleware
 *
 * Exposes /api/metrics endpoint for Prometheus scraping.
 *
 * Tracks:
 *  - http_requests_total{service, method, route, status}
 *  - http_request_duration_seconds{service, method, route, status}
 *  - ehb_stl_recomputes_total
 *  - ehb_complaints_filed_total
 *  - ehb_payment_failures_total
 *  - ehb_polkadot_anchor_total / failures
 *  - ehb_ai_429_responses_total
 *  - ehb_ai_daily_cost_usd
 *  - ehb_stl_formula_version_mismatch
 *
 * Uses prom-client (lazy-load to keep optional).
 */

import { Router } from 'express';

let promClient = null;
let registry = null;
let counters = null;
let histograms = null;
let gauges = null;

async function lazyInit() {
  if (promClient) return;
  try {
    promClient = await import('prom-client');
    registry = new promClient.Registry();
    promClient.collectDefaultMetrics({ register: registry, prefix: 'ehb_' });

    counters = {
      http: new promClient.Counter({ name: 'http_requests_total', help: 'Total HTTP requests', labelNames: ['service', 'method', 'route', 'status'], registers: [registry] }),
      stlRecomputes: new promClient.Counter({ name: 'ehb_stl_recomputes_total', help: 'STL recompute count', registers: [registry] }),
      stlUpgrades: new promClient.Counter({ name: 'ehb_stl_upgrades_total', help: 'STL level ups', labelNames: ['from_level', 'to_level'], registers: [registry] }),
      stlDowngrades: new promClient.Counter({ name: 'ehb_stl_downgrades_total', help: 'STL level downs', labelNames: ['from_level', 'to_level'], registers: [registry] }),
      complaintsFiled: new promClient.Counter({ name: 'ehb_complaints_filed_total', help: 'Complaints filed', labelNames: ['type'], registers: [registry] }),
      escrowLocked: new promClient.Counter({ name: 'ehb_escrow_locked_total', help: 'Escrow lock events', labelNames: ['provider'], registers: [registry] }),
      escrowReleased: new promClient.Counter({ name: 'ehb_escrow_released_total', help: 'Escrow release events', labelNames: ['provider'], registers: [registry] }),
      escrowRefunded: new promClient.Counter({ name: 'ehb_escrow_refunded_total', help: 'Escrow refund events', labelNames: ['provider'], registers: [registry] }),
      paymentAttempts: new promClient.Counter({ name: 'ehb_payment_attempts_total', help: 'Payment attempts', labelNames: ['provider'], registers: [registry] }),
      paymentSuccess: new promClient.Counter({ name: 'ehb_payment_success_total', help: 'Successful payments', labelNames: ['provider'], registers: [registry] }),
      paymentFailures: new promClient.Counter({ name: 'ehb_payment_failures_total', help: 'Payment failures', labelNames: ['provider'], registers: [registry] }),
      anchorTotal: new promClient.Counter({ name: 'ehb_polkadot_anchor_total', help: 'Anchor attempts', registers: [registry] }),
      anchorFailures: new promClient.Counter({ name: 'ehb_polkadot_anchor_failures_total', help: 'Anchor failures', registers: [registry] }),
      ai429: new promClient.Counter({ name: 'ehb_ai_429_responses_total', help: 'AI 429 responses', registers: [registry] }),
      aiIntents: new promClient.Counter({ name: 'ehb_ai_intents_total', help: 'AI intent classifications', labelNames: ['intent', 'source'], registers: [registry] }),
      aiLlmFallback: new promClient.Counter({ name: 'ehb_ai_llm_fallback_total', help: 'LLM fallback uses', registers: [registry] }),
      slashingEvents: new promClient.Counter({ name: 'ehb_slashing_events_total', help: 'Slash events', labelNames: ['reason'], registers: [registry] }),
      ordersCreated: new promClient.Counter({ name: 'ehb_orders_created_total', help: 'Orders created', labelNames: ['industry'], registers: [registry] }),
      ordersSettled: new promClient.Counter({ name: 'ehb_orders_settled_total', help: 'Orders settled', labelNames: ['industry'], registers: [registry] }),
      fraudDetected: new promClient.Counter({ name: 'ehb_fraud_detected_total', help: 'Fraud signals fired', labelNames: ['signal'], registers: [registry] }),
    };

    histograms = {
      requestDuration: new promClient.Histogram({
        name: 'http_request_duration_seconds',
        help: 'Request duration',
        labelNames: ['service', 'method', 'route', 'status'],
        buckets: [0.05, 0.1, 0.25, 0.5, 1, 2, 5, 10],
        registers: [registry],
      }),
    };

    gauges = {
      aiDailyCost: new promClient.Gauge({
        name: 'ehb_ai_daily_cost_usd',
        help: 'AI daily spend in USD',
        registers: [registry],
      }),
      stlFormulaMismatch: new promClient.Gauge({
        name: 'ehb_stl_formula_version_mismatch',
        help: '1 if formula drift detected',
        registers: [registry],
      }),
    };
  } catch (err) {
    console.warn('[metrics] prom-client not installed; /api/metrics disabled. pnpm add prom-client');
  }
}

// Express middleware: track every request
export function trackRequest(req, res, next) {
  const start = process.hrtime.bigint();
  res.on('finish', () => {
    if (!counters) return;
    const route = req.route?.path || req.path || 'unknown';
    const labels = {
      service: 'api',
      method: req.method,
      route,
      status: String(res.statusCode),
    };
    const seconds = Number(process.hrtime.bigint() - start) / 1e9;
    counters.http.inc(labels);
    histograms.requestDuration.observe(labels, seconds);
  });
  next();
}

// Helpers for business metrics
export const metrics = {
  // STL
  stlRecompute: () => counters?.stlRecomputes.inc(),
  stlUpgrade: (from, to) => counters?.stlUpgrades.inc({ from_level: String(from), to_level: String(to) }),
  stlDowngrade: (from, to) => counters?.stlDowngrades.inc({ from_level: String(from), to_level: String(to) }),

  // Complaints
  complaintFiled: (type = 'unknown') => counters?.complaintsFiled.inc({ type }),

  // Payments
  escrowLocked: (provider = 'inmem') => counters?.escrowLocked.inc({ provider }),
  escrowReleased: (provider = 'inmem') => counters?.escrowReleased.inc({ provider }),
  escrowRefunded: (provider = 'inmem') => counters?.escrowRefunded.inc({ provider }),
  paymentAttempt: (provider) => counters?.paymentAttempts.inc({ provider }),
  paymentSuccess: (provider) => counters?.paymentSuccess.inc({ provider }),
  paymentFailed: (provider) => counters?.paymentFailures.inc({ provider }),

  // Chain
  anchorAttempted: () => counters?.anchorTotal.inc(),
  anchorFailed: () => counters?.anchorFailures.inc(),

  // AI
  ai429: () => counters?.ai429.inc(),
  aiIntent: (intent, source = 'keyword') => counters?.aiIntents.inc({ intent, source }),
  aiLlmFallback: () => counters?.aiLlmFallback.inc(),
  setAiDailyCost: (usd) => gauges?.aiDailyCost.set(usd),

  // Trust
  setStlFormulaMismatch: (n) => gauges?.stlFormulaMismatch.set(n),
  slashing: (reason = 'unknown') => counters?.slashingEvents.inc({ reason }),

  // Orders
  orderCreated: (industry = 'unknown') => counters?.ordersCreated.inc({ industry }),
  orderSettled: (industry = 'unknown') => counters?.ordersSettled.inc({ industry }),

  // Fraud
  fraudDetected: (signal = 'unknown') => counters?.fraudDetected.inc({ signal }),
};

// Router
const router = Router();

router.get('/metrics', async (req, res) => {
  await lazyInit();
  if (!registry) {
    return res.status(503).type('text/plain').send('# metrics not available — install prom-client');
  }
  res.set('Content-Type', registry.contentType);
  res.send(await registry.metrics());
});

export default router;
