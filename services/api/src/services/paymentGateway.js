// Payment Gateway Adapters — unified interface for JazzCash, Easypaisa, Stripe, bank.
// Phase 1 = stub driver (simulates success). Real integrations land in Wave 6 /
// Phase 17 per EHB-BUILD-BLUEPRINT.md.

const ENABLED = process.env.PAYMENT_GATEWAY_ENABLED === 'true';

/**
 * Unified charge interface.
 * @param {Object} p
 * @param {string} p.provider  'jazzcash' | 'easypaisa' | 'stripe' | 'bank' | 'stub'
 * @param {number} p.amount
 * @param {string} p.currency
 * @param {Object} p.meta
 */
export async function charge({ provider = 'stub', amount, currency = 'PKR', meta = {} }) {
  if (!amount || amount <= 0) throw new Error('amount > 0 required');
  if (!ENABLED || provider === 'stub') {
    return {
      success: true,
      provider: 'stub',
      gatewayRef: `STUB-${Date.now()}`,
      amount,
      currency,
      note: 'Payment simulated. Set PAYMENT_GATEWAY_ENABLED=true and add real credentials.',
    };
  }

  // Real provider dispatch (not implemented in Phase 1).
  switch (provider) {
    case 'jazzcash':
      return { success: false, error: 'JazzCash integration pending Wave 6' };
    case 'easypaisa':
      return { success: false, error: 'Easypaisa integration pending Wave 6' };
    case 'stripe':
      return { success: false, error: 'Stripe integration pending Wave 6' };
    case 'bank':
      return { success: false, error: 'Bank transfer integration pending Wave 6' };
    default:
      return { success: false, error: `Unknown provider: ${provider}` };
  }
}

export async function refund({ provider = 'stub', gatewayRef, amount, reason }) {
  if (!gatewayRef) throw new Error('gatewayRef required');
  if (!ENABLED || provider === 'stub') {
    return {
      success: true,
      provider: 'stub',
      refundRef: `REFUND-${Date.now()}`,
      originalRef: gatewayRef,
      amount,
      reason,
    };
  }
  return { success: false, error: `Refund for ${provider} pending Wave 6` };
}
