// Bank Adapter Interface — v3.3 §13.6.4
//
// Common contract that every bank rail implementation must satisfy.
// Phase 1 MVP: all 5 country adapters are stubs returning simulated success.
// Phase 2: real vendor integrations replace stubs (env-var swap).

/**
 * @typedef {Object} BankDepositRequest
 * @property {string} userId
 * @property {number} amountUsd
 * @property {string} sourceAccountInfo  // bank acct number / IBAN / phone (for mobile wallets)
 * @property {string} country - 'PK' | 'AE' | 'US' | 'IN' | 'GB'
 * @property {string} idempotencyKey
 */

/**
 * @typedef {Object} BankWithdrawRequest
 * @property {string} userId
 * @property {number} amountUsd
 * @property {string} destAccountInfo
 * @property {string} country
 * @property {string} idempotencyKey
 */

/**
 * @typedef {Object} TransactionResult
 * @property {boolean} ok
 * @property {string} externalRefId
 * @property {string} status - 'pending' | 'processing' | 'completed' | 'failed'
 * @property {number} settledAtMs
 * @property {string} [errorCode]
 * @property {string} [errorMessage]
 */

/** Default abstract base — all bank adapters extend this. */
export class BankAdapterBase {
  constructor({ name, vendor, country, enabled = true }) {
    this.name = name;
    this.vendor = vendor;
    this.country = country;
    this.enabled = enabled;
  }

  async init(config) {
    /* override in concrete adapter */
  }

  async healthCheck() {
    return { ok: true, latencyMs: 0, note: 'base healthcheck — override in adapter' };
  }

  // eslint-disable-next-line no-unused-vars
  async deposit(req) {
    throw new Error(`deposit() not implemented in ${this.name}`);
  }

  // eslint-disable-next-line no-unused-vars
  async withdraw(req) {
    throw new Error(`withdraw() not implemented in ${this.name}`);
  }

  // eslint-disable-next-line no-unused-vars
  async status(externalRefId) {
    throw new Error(`status() not implemented in ${this.name}`);
  }

  // eslint-disable-next-line no-unused-vars
  async webhook(req) {
    throw new Error(`webhook() not implemented in ${this.name}`);
  }
}
