// Tron USDT (TRC20) Adapter — v3.3 §13.6.3
//
// Phase 1 MVP: STUB. Phase 2: TronWeb integration.
// Real implementation will need:
//   - TRON_NODE_URL (e.g. https://api.trongrid.io)
//   - TRON_HOT_WALLET_PRIVATE_KEY (hardware-secured)
//   - TRON_USDT_CONTRACT (TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t)

import { EventEmitter } from 'events';

class TronTrc20Adapter {
  constructor() {
    this.name = 'tron-trc20';
    this.vendor = 'TRON';
    this.network = 'TRC20';
    this.enabled = true;
    this.isStub = true;
    this.feeUsd = 1; // $1 flat per spec §13.6.6
  }

  async init(config) {
    if (config?.tronNodeUrl && config?.hotWalletKey) this.isStub = false;
  }

  async healthCheck() {
    return {
      ok: true,
      latencyMs: 200,
      vendor: this.vendor,
      network: this.network,
      mode: this.isStub ? 'stub' : 'production',
      currentNetworkFeeUsd: this.feeUsd,
    };
  }

  /**
   * Generate a deposit address for the user (HD wallet derivation in production).
   */
  async generateDepositAddress(userId) {
    if (this.isStub) {
      // Real: derive deterministic address from userId via HD wallet
      const stubAddress = `TStub${String(userId).slice(0, 6).padStart(6, '0').toUpperCase()}STUBxxxxxxxxxxxx`;
      return {
        address: stubAddress,
        network: 'TRC20',
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?data=${stubAddress}`,
        note: 'STUB — Phase 2 will use TronWeb HD wallet derivation',
      };
    }
    throw new Error('Tron production adapter not yet implemented');
  }

  /**
   * Withdraw USDT to external Tron address.
   */
  async withdraw({ userId, amountUsdt, destinationAddress, idempotencyKey }) {
    if (this.isStub) {
      await new Promise((r) => setTimeout(r, 600));
      return {
        ok: true,
        externalTxHash: `STUB_TRC20_${Date.now().toString(16)}`,
        network: 'TRC20',
        destinationAddress,
        amountUsdt,
        feeUsd: this.feeUsd,
        status: 'completed',
        settledAtMs: Date.now() + 60_000, // 1 min
        note: 'STUB — Phase 2 will broadcast real TRC20 transaction',
      };
    }
    throw new Error('Tron production adapter not yet implemented');
  }

  /**
   * Watch a deposit address for incoming transactions.
   * Phase 2 returns EventEmitter that emits `deposit` events.
   */
  watchAddress(address) {
    const emitter = new EventEmitter();
    if (this.isStub) {
      // Stub: never emits
      return emitter;
    }
    throw new Error('Tron production adapter not yet implemented');
  }

  async getNetworkFee() {
    return this.feeUsd;
  }
}

export default new TronTrc20Adapter();
