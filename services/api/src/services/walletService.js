// Wallet Service — atomic lock/unlock, transfers, ledger queries.
// Phase 1: EHBGC ledger simulated in MongoDB.
// Real payment gateway adapters below (stubbed).

import mongoose from 'mongoose';
import Wallet from '../models/Wallet.js';
import Transaction from '../models/Transaction.js';
import { isConnected } from '../config/db.js';
import { logActivity } from './auditService.js';
import { metrics } from '../middleware/metrics.js';
import { emit as emitEvent } from './eventBus.js';

/**
 * Ensure a wallet document exists for userId. Idempotent.
 */
export async function ensureWallet(userId) {
  if (!isConnected()) {
    return { userId, ehbgcBalance: 10000, ehbgcLocked: 0, usdBalance: 0, locks: [] };
  }
  let w = await Wallet.findOne({ userId });
  if (!w) {
    w = await Wallet.create({ userId, ehbgcBalance: 10000, ehbgcLocked: 0, usdBalance: 0, locks: [] });
  }
  return w.toObject ? w.toObject() : w;
}

export async function getBalance(userId) {
  return ensureWallet(userId);
}

/**
 * Atomically lock EHBGC for a purpose (e.g. franchise activation).
 * Throws if insufficient unlocked balance.
 */
export async function lockEhbgc({ userId, amount, purpose, referenceId }) {
  if (!amount || amount <= 0) throw Object.assign(new Error('amount > 0 required'), { status: 400 });
  if (!isConnected()) {
    // Memory-only stub success
    return { ok: true, note: 'in-memory — no DB lock persisted' };
  }

  const wallet = await Wallet.findOne({ userId });
  if (!wallet) throw Object.assign(new Error('Wallet not found'), { status: 404 });
  if (wallet.ehbgcBalance < amount) {
    throw Object.assign(new Error(`Insufficient EHBGC: need ${amount}, have ${wallet.ehbgcBalance}`), {
      status: 402,
    });
  }

  wallet.ehbgcBalance -= amount;
  wallet.ehbgcLocked += amount;
  wallet.locks.push({ purpose, amount, referenceId, lockedAt: new Date() });
  await wallet.save();

  await Transaction.create({
    fromUserId: userId,
    type: 'stl_lock',
    currency: 'EHBGC',
    amount,
    status: 'completed',
    referenceId,
    referenceType: purpose,
  });

  await logActivity({
    actorUserId: userId,
    action: 'wallet.lock',
    target: 'wallet',
    targetId: userId.toString(),
    after: { amount, purpose, referenceId },
  });

  metrics.escrowLocked('ehbgc');
  emitEvent('payment.success', { userId: String(userId), provider: 'ehbgc', amount, referenceId, type: 'lock' }).catch(() => {});
  return { ok: true, balance: wallet.ehbgcBalance, locked: wallet.ehbgcLocked };
}

export async function unlockEhbgc({ userId, amount, referenceId }) {
  if (!isConnected()) return { ok: true, note: 'in-memory' };
  const wallet = await Wallet.findOne({ userId });
  if (!wallet) throw Object.assign(new Error('Wallet not found'), { status: 404 });
  if (wallet.ehbgcLocked < amount) {
    throw Object.assign(new Error('Insufficient locked balance'), { status: 400 });
  }
  wallet.ehbgcBalance += amount;
  wallet.ehbgcLocked -= amount;
  wallet.locks = wallet.locks.filter((l) => l.referenceId !== referenceId);
  await wallet.save();

  await Transaction.create({
    fromUserId: userId,
    type: 'stl_unlock',
    currency: 'EHBGC',
    amount,
    status: 'completed',
    referenceId,
  });

  metrics.escrowReleased('ehbgc');
  emitEvent('payment.refund', { userId: String(userId), provider: 'ehbgc', amount, referenceId, type: 'unlock' }).catch(() => {});
  return { ok: true, balance: wallet.ehbgcBalance, locked: wallet.ehbgcLocked };
}

/**
 * Atomic EHBGC transfer using Mongo session transaction.
 */
export async function transferEhbgc({ fromUserId, toUserId, amount, notes }) {
  if (!amount || amount <= 0) throw Object.assign(new Error('amount > 0'), { status: 400 });
  if (!isConnected()) return { ok: true, note: 'in-memory' };

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const from = await Wallet.findOne({ userId: fromUserId }).session(session);
    const to = await Wallet.findOne({ userId: toUserId }).session(session);
    if (!from || !to) throw new Error('Wallet(s) not found');
    if (from.ehbgcBalance < amount) throw new Error('Insufficient balance');
    from.ehbgcBalance -= amount;
    to.ehbgcBalance += amount;
    await from.save({ session });
    await to.save({ session });
    const tx = await Transaction.create(
      [
        {
          fromUserId,
          toUserId,
          type: 'transfer',
          currency: 'EHBGC',
          amount,
          status: 'completed',
          notes,
        },
      ],
      { session }
    );
    await session.commitTransaction();
    return { ok: true, transactionId: tx[0]._id, fromBalance: from.ehbgcBalance };
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
}

export async function listTransactions({ userId, limit = 50 }) {
  if (!isConnected()) return [];
  return Transaction.find({
    $or: [{ fromUserId: userId }, { toUserId: userId }],
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
}
