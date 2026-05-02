/**
 * EHB Wallet Adapter
 *
 * Real interface for wallet operations. Implementations:
 * - InMemoryWallet (default · for dev/test)
 * - MongoWallet (persistence · production)
 * - SmartContractWallet (on-chain · Phase-2+)
 *
 * NEVER hardcode wallet logic in services. Always use this interface.
 *
 * Usage:
 *   const wallet = require('./adapters/wallet/walletAdapter').default;
 *   await wallet.lockFunds({ userId, amount, reason });
 */

class WalletAdapter {
  constructor() {
    if (this.constructor === WalletAdapter) {
      throw new Error('WalletAdapter is abstract');
    }
  }

  /**
   * Lock funds in escrow.
   * @param {{userId, amount, currency, reason, orderId?}} params
   * @returns {Promise<{lockId, success, balance}>}
   */
  async lockFunds(params) { throw new Error('not implemented'); }

  /**
   * Release locked funds back to user OR distribute per split.
   * @param {{lockId, distribution?: {sellerId,riderId,franchiseIds...,amounts}}}
   * @returns {Promise<{success, transactions: []}>}
   */
  async releaseFunds(params) { throw new Error('not implemented'); }

  /**
   * Move funds buyer → escrow.
   * @param {{buyerId, amount, currency, orderId}}
   */
  async escrowLock(params) { throw new Error('not implemented'); }

  /**
   * Distribute escrow per 70/10/10/10 + 5-tier franchise split.
   * @param {{orderId, distribution}}
   */
  async escrowRelease(params) { throw new Error('not implemented'); }

  /**
   * Reverse escrow (refund).
   */
  async escrowRefund(params) { throw new Error('not implemented'); }

  /**
   * Slash locked funds (burn / redistribute).
   * @param {{userId, amount, reason, distribution: {treasury%, sub%, master%}}}
   */
  async slash(params) { throw new Error('not implemented'); }

  /**
   * Get balance.
   */
  async getBalance(userId) { throw new Error('not implemented'); }

  /**
   * Get locked amount per user / per entity.
   */
  async getLockedAmount(userId, entityType) { throw new Error('not implemented'); }

  /**
   * Add yield (daily streaming).
   */
  async addYield(userId, amount) { throw new Error('not implemented'); }
}

// =====================================================================
// In-Memory implementation (default for dev / test)
// =====================================================================

class InMemoryWallet extends WalletAdapter {
  constructor() {
    super();
    this.balances = new Map(); // userId → { balance, locked, currency }
    this.locks = new Map();    // lockId → { userId, amount, status, ... }
    this.transactions = [];
  }

  _ensureUser(userId, currency = 'USD') {
    if (!this.balances.has(userId)) {
      this.balances.set(userId, { balance: 0, locked: 0, currency });
    }
    return this.balances.get(userId);
  }

  async lockFunds({ userId, amount, currency = 'USD', reason, orderId }) {
    const user = this._ensureUser(userId, currency);
    if (user.balance < amount) {
      throw new Error(`Insufficient balance: ${user.balance} < ${amount}`);
    }
    user.balance -= amount;
    user.locked += amount;

    const lockId = `lock_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    this.locks.set(lockId, {
      lockId, userId, amount, currency, reason, orderId,
      status: 'LOCKED',
      createdAt: new Date(),
    });
    this.transactions.push({
      type: 'LOCK', userId, amount, lockId, reason, at: new Date(),
    });
    return { lockId, success: true, balance: user.balance };
  }

  async releaseFunds({ lockId, distribution = null }) {
    const lock = this.locks.get(lockId);
    if (!lock) throw new Error(`Lock not found: ${lockId}`);
    if (lock.status !== 'LOCKED') throw new Error(`Lock not active: ${lock.status}`);

    const owner = this._ensureUser(lock.userId);
    owner.locked -= lock.amount;
    lock.status = 'RELEASED';
    lock.releasedAt = new Date();

    const transactions = [];

    if (distribution) {
      // Multi-party split
      for (const [recipientId, amount] of Object.entries(distribution)) {
        if (amount > 0) {
          const recipient = this._ensureUser(recipientId);
          recipient.balance += amount;
          transactions.push({
            type: 'TRANSFER_FROM_LOCK',
            from: lock.userId, to: recipientId, amount, lockId, at: new Date(),
          });
        }
      }
    } else {
      // Return to owner
      owner.balance += lock.amount;
      transactions.push({
        type: 'UNLOCK_TO_OWNER',
        userId: lock.userId, amount: lock.amount, lockId, at: new Date(),
      });
    }

    this.transactions.push(...transactions);
    return { success: true, transactions };
  }

  async escrowLock({ buyerId, amount, currency, orderId }) {
    return this.lockFunds({ userId: buyerId, amount, currency, reason: 'escrow', orderId });
  }

  async escrowRelease({ orderId, distribution }) {
    // Find lock by orderId
    const lock = [...this.locks.values()].find(l => l.orderId === orderId && l.status === 'LOCKED');
    if (!lock) throw new Error(`No active escrow for order: ${orderId}`);
    return this.releaseFunds({ lockId: lock.lockId, distribution });
  }

  async escrowRefund({ orderId }) {
    const lock = [...this.locks.values()].find(l => l.orderId === orderId && l.status === 'LOCKED');
    if (!lock) throw new Error(`No active escrow for order: ${orderId}`);
    // Return to buyer (no distribution = back to owner)
    return this.releaseFunds({ lockId: lock.lockId, distribution: null });
  }

  async slash({ userId, amount, reason, distribution = { treasury: 0.6, sub: 0.25, master: 0.15 } }) {
    const user = this._ensureUser(userId);
    const locked = user.locked;
    const slashAmount = Math.min(amount, locked);

    user.locked -= slashAmount;

    // Distribute slash per rules
    const treasury = slashAmount * (distribution.treasury || 0.6);
    const sub = slashAmount * (distribution.sub || 0.25);
    const master = slashAmount * (distribution.master || 0.15);

    this.transactions.push({
      type: 'SLASH', userId, amount: slashAmount, reason,
      distribution: { treasury, sub, master },
      at: new Date(),
    });

    return { success: true, slashAmount, distribution: { treasury, sub, master } };
  }

  async getBalance(userId) {
    const user = this._ensureUser(userId);
    return { ...user };
  }

  async getLockedAmount(userId, entityType = null) {
    const user = this._ensureUser(userId);
    const locks = [...this.locks.values()].filter(l =>
      l.userId === userId && l.status === 'LOCKED'
    );
    return {
      total: user.locked,
      locks: locks.length,
      detail: locks,
    };
  }

  async addYield(userId, amount) {
    const user = this._ensureUser(userId);
    user.balance += amount;
    this.transactions.push({
      type: 'YIELD', userId, amount, at: new Date(),
    });
    return { success: true, newBalance: user.balance };
  }

  // Test helpers
  _seed(userId, balance, currency = 'USD') {
    this._ensureUser(userId, currency).balance = balance;
  }

  _getTransactions() { return [...this.transactions]; }
  _reset() { this.balances.clear(); this.locks.clear(); this.transactions = []; }
}

// =====================================================================
// Default export — singleton
// =====================================================================

const wallet = new InMemoryWallet();

module.exports = wallet;
module.exports.WalletAdapter = WalletAdapter;
module.exports.InMemoryWallet = InMemoryWallet;
module.exports.default = wallet;
