/**
 * Stripe Wallet Adapter — Production
 *
 * Implements WalletAdapter interface for credit-card escrow flows.
 * Uses Stripe's Payment Intents API for hold/release/capture/refund.
 *
 * Mode switch via STRIPE_LIVE_MODE env var:
 *   - test (default): uses sk_test_* + tw_*  webhook secrets
 *   - live: uses sk_live_* + production secrets
 *
 * Webhooks:
 *   - payment_intent.succeeded
 *   - payment_intent.payment_failed
 *   - charge.refunded
 *   - charge.dispute.created
 */

const { WalletAdapter } = require('./walletAdapter');

class StripeAdapter extends WalletAdapter {
  constructor(options = {}) {
    super();
    this.mode = options.mode || (process.env.STRIPE_LIVE_MODE === 'true' ? 'live' : 'test');
    this.secretKey = process.env.STRIPE_SECRET_KEY;
    this.webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    this.client = null; // lazy-init to avoid hard dep on `stripe` pkg until used
    if (!this.secretKey) {
      console.warn(`[StripeAdapter] STRIPE_SECRET_KEY missing — adapter will throw on use.`);
    }
  }

  async _client() {
    if (this.client) return this.client;
    try {
      // Lazy load — keeps `stripe` an optional dep
      const Stripe = require('stripe');
      this.client = new Stripe(this.secretKey, { apiVersion: '2024-04-10' });
      return this.client;
    } catch (err) {
      throw new Error('stripe package not installed. Run: pnpm add stripe');
    }
  }

  // Place + hold escrow → creates a Payment Intent with manual capture
  async escrowLock({ userId, amount, currency = 'USD', orderId, metadata = {} }) {
    const stripe = await this._client();
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // cents
      currency: currency.toLowerCase(),
      capture_method: 'manual',
      metadata: { ehb_user: userId, ehb_order: orderId, ...metadata },
    });
    return {
      success: true,
      lockId: intent.id, // pi_xxx
      provider: 'stripe',
      mode: this.mode,
      client_secret: intent.client_secret, // user-side confirmation
    };
  }

  // Release escrow to seller — captures the held intent
  async escrowRelease({ lockId }) {
    const stripe = await this._client();
    const captured = await stripe.paymentIntents.capture(lockId);
    return { success: true, lockId, status: captured.status, provider: 'stripe' };
  }

  // Refund — full or partial
  async escrowRefund({ lockId, amount = null, reason = 'requested_by_customer' }) {
    const stripe = await this._client();
    const refundParams = { payment_intent: lockId, reason };
    if (amount != null) refundParams.amount = Math.round(amount * 100);
    const refund = await stripe.refunds.create(refundParams);
    return { success: true, refundId: refund.id, status: refund.status, provider: 'stripe' };
  }

  // Slash — Stripe doesn't natively slash; treat as partial-capture + transfer to penalty account
  async slash({ lockId, amount, reason }) {
    // Strategy: capture the slash portion, refund the rest.
    return { success: false, message: 'Slash via Stripe = manual policy. Implement via partial capture + transfer.' };
  }

  // Webhook handler — verify signature + handle events
  async handleWebhook({ rawBody, signature }) {
    const stripe = await this._client();
    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, this.webhookSecret);
    } catch (err) {
      return { ok: false, error: `Webhook signature failed: ${err.message}` };
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        // emit eventQueue.enqueue('payment.succeeded', { intent: event.data.object })
        return { ok: true, handled: 'payment_intent.succeeded' };
      case 'payment_intent.payment_failed':
        return { ok: true, handled: 'payment_intent.payment_failed' };
      case 'charge.refunded':
        return { ok: true, handled: 'charge.refunded' };
      case 'charge.dispute.created':
        // Push to DMO queue
        return { ok: true, handled: 'charge.dispute.created' };
      default:
        return { ok: true, handled: 'unknown', type: event.type };
    }
  }
}

module.exports = StripeAdapter;
