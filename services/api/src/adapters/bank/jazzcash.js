// JazzCash (Pakistan) Bank Adapter — v3.3 §13.6.4
//
// Phase 1 MVP: STUB — returns simulated success after 1s delay.
// Phase 2: replace with JazzCash Merchant Services API integration.
//
// Real implementation will need:
//   - JAZZCASH_MERCHANT_ID
//   - JAZZCASH_PASSWORD
//   - JAZZCASH_INTEGRITY_SALT
//   - JAZZCASH_RETURN_URL (webhook)
// All from .env per founder rule "no hardcoded secrets".

import { BankAdapterBase } from './bank-interface.js';

class JazzCashAdapter extends BankAdapterBase {
  constructor() {
    super({ name: 'jazzcash', vendor: 'JazzCash (Mobilink)', country: 'PK', enabled: true });
    this.isStub = true; // Set false when real vendor onboarded
  }

  async init(config) {
    // Phase 2: validate env vars + setup HTTP client + webhook listener
    if (config?.merchantId) this.isStub = false;
  }

  async healthCheck() {
    return { ok: true, latencyMs: 50, vendor: this.vendor, mode: this.isStub ? 'stub' : 'production' };
  }

  /**
   * Deposit USD-equivalent into user's Main Wallet via JazzCash.
   * Phase 2 will trigger JazzCash payment page; user completes on their end.
   */
  async deposit(req) {
    if (this.isStub) {
      await new Promise((r) => setTimeout(r, 1000)); // simulate API latency
      return {
        ok: true,
        externalRefId: `JAZZCASH_STUB_${Date.now()}`,
        status: 'completed',
        settledAtMs: Date.now(),
        amountPkr: req.amountUsd * 280, // ~280 PKR/USD
        feeUsd: req.amountUsd * 0.015,    // 1.5% per spec §13.6.6
        note: 'STUB — Phase 2 will integrate JazzCash Merchant Services API',
      };
    }
    throw new Error('JazzCash production adapter not yet implemented');
  }

  /**
   * Withdraw USD-equivalent from user's Main Wallet to JazzCash.
   */
  async withdraw(req) {
    if (this.isStub) {
      await new Promise((r) => setTimeout(r, 1500));
      return {
        ok: true,
        externalRefId: `JAZZCASH_WD_STUB_${Date.now()}`,
        status: 'pending',
        settledAtMs: Date.now() + 7200_000, // 2 hours
        feeUsd: Math.max(2, Math.min(50, req.amountUsd * 0.02)),
        note: 'STUB — settles in 1-2 hours per JazzCash IBFT',
      };
    }
    throw new Error('JazzCash production adapter not yet implemented');
  }

  async status(externalRefId) {
    if (this.isStub) {
      return {
        ok: true,
        externalRefId,
        status: 'completed',
        settledAtMs: Date.now(),
      };
    }
    throw new Error('JazzCash production adapter not yet implemented');
  }

  async webhook(req) {
    return { ok: true, eventType: 'payment_completed', externalRefId: req.body?.txRefNo || 'unknown' };
  }
}

export default new JazzCashAdapter();
