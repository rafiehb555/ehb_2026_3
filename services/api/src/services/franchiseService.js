import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import Franchise from '../models/Franchise.js';
import FranchiseApplication from '../models/FranchiseApplication.js';
import Wallet from '../models/Wallet.js';
import Transaction from '../models/Transaction.js';
import { nextSerial } from './serialGenerator.js';
import { isConnected } from '../config/db.js';
import { logActivity } from './auditService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pricingPath = join(__dirname, '../../../../data/seeds/franchise-pricing.json');

let _pricing = null;
function getPricing() {
  if (!_pricing) _pricing = JSON.parse(readFileSync(pricingPath, 'utf8'));
  return _pricing;
}

// In-memory fallback store for demo when Mongo is disconnected
const memApplications = [];
const memFranchises = [];

/** Find pricing for a given tier code (L1..L10 or OF1..OF4). */
export function findTierPricing(level) {
  const p = getPricing();
  return (
    p.subFranchises.find((t) => t.code === level) ||
    p.onlineFranchises.find((t) => t.code === level) ||
    null
  );
}

export async function submitApplication({ userId, type, level, country = 'PK', area, kycSnapshot }) {
  const tier = findTierPricing(level);
  if (!tier) {
    const err = new Error(`Unknown franchise level: ${level}`);
    err.status = 400;
    throw err;
  }

  const appId = `APP-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

  const applicationData = {
    applicationId: appId,
    userId,
    type: type || tier.type,
    level,
    country,
    area,
    pricingConfirmed: {
      usdPaid: tier.usd,
      ehbgcReserved: tier.ehbgc,
    },
    kycSnapshot: kycSnapshot || {},
    status: 'pending',
    submittedAt: new Date(),
  };

  if (isConnected() && userId) {
    const app = await FranchiseApplication.create(applicationData);
    await logActivity({
      actorUserId: userId,
      action: 'franchise.application.submitted',
      target: 'franchise_application',
      targetId: app._id.toString(),
      after: { level, country, usdPaid: tier.usd },
    });
    return app.toObject();
  }

  const app = { _id: appId, ...applicationData };
  memApplications.push(app);
  return app;
}

export async function listPendingApplications({ limit = 50 } = {}) {
  if (isConnected()) {
    return FranchiseApplication.find({ status: 'pending' })
      .sort({ submittedAt: 1 })
      .limit(limit)
      .lean();
  }
  return memApplications.filter((a) => a.status === 'pending').slice(0, limit);
}

export async function approveApplication({ applicationId, reviewerId, notes }) {
  if (isConnected()) {
    const app = await FranchiseApplication.findOne({ applicationId });
    if (!app) throw Object.assign(new Error('Application not found'), { status: 404 });
    if (app.status !== 'pending') {
      throw Object.assign(new Error(`Already ${app.status}`), { status: 409 });
    }

    const { serialNumber } = await nextSerial({
      country: app.country,
      round: 1,
      phase: 1,
      level: app.level,
    });

    const tier = findTierPricing(app.level) || {};
    const franchise = await Franchise.create({
      serialNumber,
      ownerUserId: app.userId,
      type: app.type,
      level: app.level,
      country: app.country,
      round: 1,
      phase: 1,
      pricing: {
        usdPaid: app.pricingConfirmed.usdPaid,
        ehbgcLocked: app.pricingConfirmed.ehbgcReserved,
        commissionCapPerDay: tier.commissionCapPerDayUsd,
        directCommissionRatePct: tier.directCommissionRatePct,
      },
      geography: { area: app.area },
      status: 'active',
      activatedAt: new Date(),
    });

    // Lock EHBGC in wallet (simulated)
    try {
      const wallet = await Wallet.findOneAndUpdate(
        { userId: app.userId },
        {
          $inc: {
            ehbgcBalance: -app.pricingConfirmed.ehbgcReserved,
            ehbgcLocked: app.pricingConfirmed.ehbgcReserved,
          },
          $push: {
            locks: {
              purpose: `franchise_${app.level}`,
              amount: app.pricingConfirmed.ehbgcReserved,
              referenceId: serialNumber,
            },
          },
        },
        { upsert: true, new: true }
      );
      await Transaction.create({
        fromUserId: app.userId,
        type: 'franchise_lock',
        currency: 'EHBGC',
        amount: app.pricingConfirmed.ehbgcReserved,
        status: 'completed',
        referenceId: serialNumber,
        referenceType: 'franchise',
      });
    } catch (e) {
      // Wallet lock is best-effort in demo
      console.warn('[franchiseService] wallet lock failed:', e.message);
    }

    app.status = 'approved';
    app.reviewedAt = new Date();
    app.reviewerId = reviewerId;
    app.franchiseId = franchise._id;
    app.notes = notes;
    await app.save();

    await logActivity({
      actorUserId: reviewerId,
      action: 'franchise.application.approved',
      target: 'franchise_application',
      targetId: app._id.toString(),
      before: { status: 'pending' },
      after: { status: 'approved', serialNumber },
    });

    return { application: app.toObject(), franchise: franchise.toObject() };
  }

  // Memory fallback
  const app = memApplications.find((a) => a.applicationId === applicationId);
  if (!app) throw Object.assign(new Error('Application not found'), { status: 404 });
  if (app.status !== 'pending') throw Object.assign(new Error(`Already ${app.status}`), { status: 409 });
  const { serialNumber } = await nextSerial({ country: app.country, round: 1, phase: 1, level: app.level });
  const tier = findTierPricing(app.level) || {};
  const franchise = {
    _id: `fr-${Date.now()}`,
    serialNumber,
    ownerUserId: app.userId,
    type: app.type,
    level: app.level,
    country: app.country,
    round: 1,
    phase: 1,
    pricing: {
      usdPaid: app.pricingConfirmed.usdPaid,
      ehbgcLocked: app.pricingConfirmed.ehbgcReserved,
      commissionCapPerDay: tier.commissionCapPerDayUsd,
    },
    status: 'active',
    activatedAt: new Date(),
  };
  memFranchises.push(franchise);
  app.status = 'approved';
  app.reviewedAt = new Date();
  app.reviewerId = reviewerId;
  app.notes = notes;
  return { application: app, franchise };
}

export async function rejectApplication({ applicationId, reviewerId, reason }) {
  if (isConnected()) {
    const app = await FranchiseApplication.findOne({ applicationId });
    if (!app) throw Object.assign(new Error('Application not found'), { status: 404 });
    if (app.status !== 'pending') throw Object.assign(new Error(`Already ${app.status}`), { status: 409 });
    app.status = 'rejected';
    app.reviewedAt = new Date();
    app.reviewerId = reviewerId;
    app.decisionReason = reason || 'no reason provided';
    await app.save();
    await logActivity({
      actorUserId: reviewerId,
      action: 'franchise.application.rejected',
      target: 'franchise_application',
      targetId: app._id.toString(),
      after: { reason },
    });
    return app.toObject();
  }
  const app = memApplications.find((a) => a.applicationId === applicationId);
  if (!app) throw Object.assign(new Error('Application not found'), { status: 404 });
  app.status = 'rejected';
  app.decisionReason = reason;
  return app;
}

export async function requestInfo({ applicationId, reviewerId, message }) {
  if (isConnected()) {
    const app = await FranchiseApplication.findOne({ applicationId });
    if (!app) throw Object.assign(new Error('Application not found'), { status: 404 });
    app.status = 'needs_info';
    app.decisionReason = message || 'Additional documents requested';
    await app.save();
    await logActivity({
      actorUserId: reviewerId,
      action: 'franchise.application.info_requested',
      target: 'franchise_application',
      targetId: app._id.toString(),
      after: { message },
    });
    return app.toObject();
  }
  const app = memApplications.find((a) => a.applicationId === applicationId);
  if (!app) throw Object.assign(new Error('Application not found'), { status: 404 });
  app.status = 'needs_info';
  app.decisionReason = message;
  return app;
}

export async function listFranchises({ status, type, country, limit = 100 } = {}) {
  if (isConnected()) {
    const q = {};
    if (status) q.status = status;
    if (type) q.type = type;
    if (country) q.country = country;
    return Franchise.find(q).sort({ createdAt: -1 }).limit(limit).lean();
  }
  return memFranchises.slice(0, limit);
}

export async function getFranchiseBySerial(serialNumber) {
  if (isConnected()) {
    return Franchise.findOne({ serialNumber }).lean();
  }
  return memFranchises.find((f) => f.serialNumber === serialNumber) || null;
}

export async function getMyFranchises(userId) {
  if (isConnected()) {
    return Franchise.find({ ownerUserId: userId }).lean();
  }
  return memFranchises.filter((f) => String(f.ownerUserId) === String(userId));
}
