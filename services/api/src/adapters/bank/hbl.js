// HBL (Pakistan Habib Bank Limited) Bank Adapter — v3.3 §13.6.4
//
// Phase 1 MVP: STUB. Phase 2: HBL Merchant API + IBFT rail.

import { BankAdapterBase } from './bank-interface.js';

class HblAdapter extends BankAdapterBase {
  constructor() {
    super({ name: 'hbl', vendor: 'Habib Bank Limited', country: 'PK', enabled: true });
    this.isStub = true;
  }

  async init(config) {
    if (config?.merchantId && config?.apiKey) this.isStub = false;
  }

  async healthCheck() {
    return { ok: true, latencyMs: 80, vendor: this.vendor, mode: this.isStub ? 'stub' : 'production' };
  }

  async deposit(req) {
    if (this.isStub) {
      await new Promise((r) => setTimeout(r, 1500));
      return {
        ok: true,
        externalRefId: `HBL_STUB_${Date.now()}`,
        status: 'pending',
        settledAtMs: Date.now() + 86400_000, // 1 day for RTGS
        amountPkr: req.amountUsd * 280,
        feeUsd: req.amountUsd * 0.015,
        note: 'STUB — settles within 1 business day via RTGS',
      };
    }
    throw new Error('HBL production adapter not yet implemented');
  }

  async withdraw(req) {
    if (this.isStub) {
      await new Promise((r) => setTimeout(r, 2000));
      return {
        ok: true,
        externalRefId: `HBL_WD_STUB_${Date.now()}`,
        status: 'pending',
        settledAtMs: Date.now() + 86400_000,
        feeUsd: Math.max(2, Math.min(50, req.amountUsd * 0.02)),
        note: 'STUB — IBFT settles within 1 business day',
      };
    }
    throw new Error('HBL production adapter not yet implemented');
  }

  async status(externalRefId) {
    return { ok: true, externalRefId, status: 'completed', settledAtMs: Date.now() };
  }

  async webhook(req) {
    return { ok: true, eventType: 'payment_completed', externalRefId: req.body?.txRef || 'unknown' };
  }
}

export default new HblAdapter();
