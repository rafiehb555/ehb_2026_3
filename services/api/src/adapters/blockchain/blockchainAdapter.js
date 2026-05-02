/**
 * EHB Blockchain Adapter
 *
 * Real interface for blockchain operations. Implementations:
 * - InMemoryChain (default · for dev/test)
 * - PolkadotChain (production · Phase-2+)
 *
 * Hash computation runs every time. Real chain calls only in prod adapter.
 */

const crypto = require('crypto');

class BlockchainAdapter {
  async anchor(payload) { throw new Error('not implemented'); }
  async verify(hash) { throw new Error('not implemented'); }
  async getAuditTrail(entityId, options) { throw new Error('not implemented'); }
  async batchAnchor(payloads) { throw new Error('not implemented'); }
}

// =====================================================================
// In-Memory implementation (dev/test)
// =====================================================================

class InMemoryChain extends BlockchainAdapter {
  constructor() {
    super();
    this.anchors = new Map();   // hash → { payload, blockNumber, timestamp, signers }
    this.byEntity = new Map();  // entityId → [hashes]
    this.blockNumber = 1;
  }

  /**
   * Compute hash + record anchor. Returns immediately.
   * In production: queues for batch + on-chain submission.
   */
  async anchor({ entityType, entityId, payload, signers = [] }) {
    const data = JSON.stringify({ entityType, entityId, payload });
    const hash = '0x' + crypto.createHash('sha256').update(data).digest('hex');

    const block = {
      hash,
      blockNumber: this.blockNumber++,
      entityType,
      entityId,
      payload,
      signers,
      timestamp: new Date().toISOString(),
      previousHash: this.anchors.size > 0 ? [...this.anchors.keys()].pop() : null,
    };

    this.anchors.set(hash, block);

    if (entityId) {
      if (!this.byEntity.has(entityId)) this.byEntity.set(entityId, []);
      this.byEntity.get(entityId).push(hash);
    }

    return {
      success: true,
      hash,
      blockNumber: block.blockNumber,
      timestamp: block.timestamp,
    };
  }

  async verify(hash) {
    const block = this.anchors.get(hash);
    return {
      verified: !!block,
      block: block || null,
    };
  }

  async getAuditTrail(entityId, options = {}) {
    const hashes = this.byEntity.get(entityId) || [];
    const blocks = hashes.map(h => this.anchors.get(h));

    if (options.fromDate) {
      const from = new Date(options.fromDate).getTime();
      return blocks.filter(b => new Date(b.timestamp).getTime() >= from);
    }
    return blocks;
  }

  async batchAnchor(payloads) {
    const results = [];
    for (const p of payloads) {
      results.push(await this.anchor(p));
    }
    return { success: true, count: results.length, anchors: results };
  }

  // Test helpers
  _getAllAnchors() { return [...this.anchors.values()]; }
  _reset() { this.anchors.clear(); this.byEntity.clear(); this.blockNumber = 1; }
}

const blockchain = new InMemoryChain();

module.exports = blockchain;
module.exports.BlockchainAdapter = BlockchainAdapter;
module.exports.InMemoryChain = InMemoryChain;
module.exports.default = blockchain;
