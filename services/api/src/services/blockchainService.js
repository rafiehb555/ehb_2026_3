// Blockchain Service — Polkadot-ready hash anchor + verification.
// Phase 1: stub driver (deterministic hashes, no network call).
// Phase 4 / Wave 14: swap to real Polkadot parachain via @polkadot/api.

import { createHash, randomBytes } from 'node:crypto';
import BlockchainProof from '../models/BlockchainProof.js';
import { isConnected } from '../config/db.js';
import { logActivity } from './auditService.js';

const ENABLED = process.env.BLOCKCHAIN_ENABLED === 'true';
const NETWORK = ENABLED ? (process.env.BLOCKCHAIN_NETWORK || 'testnet') : 'stub';

/**
 * Deterministic keccak256-style hash of a canonical JSON representation.
 * Polkadot uses blake2 primarily — we use SHA-256 as an interoperable stand-in;
 * swap to @polkadot-utils-crypto blake2AsHex in production.
 */
export function hashPayload(payload) {
  const canonical = JSON.stringify(sortKeys(payload));
  return '0x' + createHash('sha256').update(canonical).digest('hex');
}

/**
 * Anchor a payload on-chain (or simulate if BLOCKCHAIN_ENABLED=false).
 * @returns { hash, network, blockNumber, blockHash, txHash }
 */
export async function anchor({ targetType, targetId, payload }) {
  if (!targetType || !targetId) {
    throw Object.assign(new Error('targetType and targetId required'), { status: 400 });
  }
  const hash = hashPayload({ targetType, targetId, payload });

  const anchorResult = ENABLED
    ? await anchorOnPolkadot({ hash, targetType, targetId }) // placeholder
    : {
        network: 'stub',
        blockNumber: Math.floor(Date.now() / 1000),
        blockHash: '0x' + randomBytes(32).toString('hex'),
        txHash: '0x' + randomBytes(32).toString('hex'),
      };

  const proof = {
    hash,
    targetType,
    targetId,
    payload,
    network: anchorResult.network,
    parachain: 'ehb-polkadot',
    blockNumber: anchorResult.blockNumber,
    blockHash: anchorResult.blockHash,
    txHash: anchorResult.txHash,
    anchoredAt: new Date(),
    verified: anchorResult.network !== 'stub',
  };

  if (isConnected()) {
    try {
      await BlockchainProof.create(proof);
    } catch (e) {
      if (e.code !== 11000) throw e; // duplicate hash is idempotent
    }
    await logActivity({
      action: 'blockchain.anchored',
      target: targetType,
      targetId,
      after: { hash, network: proof.network },
    });
  }

  return proof;
}

/** Verify that a given hash was anchored and optionally matches a payload. */
export async function verify({ hash, payload }) {
  if (!hash) throw Object.assign(new Error('hash required'), { status: 400 });
  if (!isConnected()) {
    if (payload) {
      const recomputed = hashPayload(payload);
      return { found: false, matches: recomputed === hash, recomputed };
    }
    return { found: false, note: 'DB not connected' };
  }

  const proof = await BlockchainProof.findOne({ hash }).lean();
  if (!proof) return { found: false };

  let matches = null;
  if (payload) {
    matches = hashPayload({ ...proof, payload }) === hashPayload(proof.payload);
  }

  return {
    found: true,
    hash: proof.hash,
    targetType: proof.targetType,
    targetId: proof.targetId,
    network: proof.network,
    blockNumber: proof.blockNumber,
    blockHash: proof.blockHash,
    txHash: proof.txHash,
    anchoredAt: proof.anchoredAt,
    verified: proof.verified,
    matches,
  };
}

export async function listProofs({ targetType, targetId, limit = 50 }) {
  if (!isConnected()) return [];
  const q = {};
  if (targetType) q.targetType = targetType;
  if (targetId) q.targetId = targetId;
  return BlockchainProof.find(q).sort({ createdAt: -1 }).limit(limit).lean();
}

// --- Polkadot driver placeholder -------------------------------------------
async function anchorOnPolkadot({ hash, targetType, targetId }) {
  // Real implementation will:
  // 1. Connect to parachain RPC via @polkadot/api
  // 2. Submit a remark (or custom pallet call) with hash + metadata
  // 3. Wait for finalization
  // 4. Return real block + tx hashes
  throw new Error(
    'BLOCKCHAIN_ENABLED=true but Polkadot driver not yet implemented. See Wave 14.'
  );
}

function sortKeys(v) {
  if (Array.isArray(v)) return v.map(sortKeys);
  if (v && typeof v === 'object') {
    return Object.keys(v)
      .sort()
      .reduce((acc, k) => ((acc[k] = sortKeys(v[k])), acc), {});
  }
  return v;
}

export const blockchainMeta = {
  enabled: ENABLED,
  network: NETWORK,
  parachain: 'ehb-polkadot',
  hashAlgo: 'sha256 (→ blake2 in production)',
};
