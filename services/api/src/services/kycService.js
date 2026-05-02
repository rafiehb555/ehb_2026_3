// KYC Service — v3.3 §13.6.5
//
// Spec: ehb-info/departments/Affiliate.md §13.6.5 (v3.3)
// Founder lock: 2026-04-26
//
// MVP scope (Phase 1):
//   ✓ Submit document (any tier 1-4 type)
//   ✓ Verify document (admin manual review)
//   ✓ Compute current tier from verified documents
//   ✓ Get tier limits (deposit/withdrawal caps)
//
// Phase 2+ adds: Jumio/Onfido/Sumsub/NADRA adapter integration,
//                automated OCR, liveness check, AML screening,
//                expiry tracking + auto-renewal, document re-verification.

import KycDocument from '../models/KycDocument.js';
import User from '../models/User.js';
import { isConnected } from '../config/db.js';
import { logActivity } from './auditService.js';

// ─── TIER LIMITS (admin-tunable in Phase 2 via affiliate_config) ─────────

/** Per-tier deposit/withdrawal limits in USD per spec §13.6.5 */
export const TIER_LIMITS = {
  0: { name: 'Sandbox',       monthlyInUsd:    100, monthlyOutUsd:    50, requirements: ['email', 'phone'] },
  1: { name: 'Basic',         monthlyInUsd:   1000, monthlyOutUsd:   500, requirements: ['+ ID document'] },
  2: { name: 'Standard',      monthlyInUsd:  10000, monthlyOutUsd:  5000, requirements: ['+ selfie', '+ address proof'] },
  3: { name: 'Pro',           monthlyInUsd: 100000, monthlyOutUsd: 50000, requirements: ['+ bank statement', '+ source-of-funds'] },
  4: { name: 'Institutional', monthlyInUsd: -1,     monthlyOutUsd: -1,    requirements: ['+ corporate docs', '+ audit report'] },
};

/** Required document types per tier (verified status needed) */
export const TIER_REQUIRED_DOCUMENTS = {
  1: ['cnic'], // OR passport/national_id/driving_license — any single ID counts
  2: ['selfie', 'address_proof'],
  3: ['bank_statement', 'source_of_funds_letter'], // OR tax_return
  4: ['corporate_certificate', 'business_license', 'audit_report'],
};

// ─── HELPERS ─────────────────────────────────────────────────────────────

/** Tier 1 alternative ID types (any one of these counts) */
const TIER_1_ANY_OF = ['cnic', 'passport', 'national_id', 'driving_license'];
/** Tier 3 alternative source-of-funds types */
const TIER_3_ANY_OF = ['bank_statement', 'source_of_funds_letter', 'tax_return'];

// ─── PUBLIC API ──────────────────────────────────────────────────────────

/** Get tier-limit ladder (public). */
export function getTierLadder() {
  return {
    tiers: TIER_LIMITS,
    requiredDocuments: TIER_REQUIRED_DOCUMENTS,
    note:
      'Per v3.3 §13.6.5. Tier 0 default on signup (email + phone). ' +
      'Higher tiers require verified documents. ' +
      'Adapter (Phase 2): Jumio · Onfido · Sumsub · NADRA (Pakistan).',
  };
}

/** Submit a new KYC document (user-initiated). */
export async function submitDocument({ userId, documentType, fileUrl, extractedData = {} }) {
  if (!isConnected()) {
    return { ok: false, note: 'in-memory — DB required for KYC' };
  }

  // Determine which tier this document contributes to
  let contributesToTier = 1;
  if (TIER_1_ANY_OF.includes(documentType)) contributesToTier = 1;
  else if (TIER_REQUIRED_DOCUMENTS[2].includes(documentType)) contributesToTier = 2;
  else if (TIER_3_ANY_OF.includes(documentType)) contributesToTier = 3;
  else if (TIER_REQUIRED_DOCUMENTS[4].includes(documentType)) contributesToTier = 4;

  const doc = await KycDocument.create({
    userId,
    documentType,
    fileUrl,
    extractedData,
    contributesToTier,
    status: 'pending',
    adapter: 'manual',
  });

  await logActivity({
    actorUserId: userId,
    action: 'kyc.document_submitted',
    target: 'kyc_document',
    targetId: doc._id.toString(),
    after: { documentType, contributesToTier },
  });

  return { ok: true, documentId: doc._id, contributesToTier, status: 'pending' };
}

/** Admin verify (or reject) a submitted document. */
export async function verifyDocument({ documentId, reviewerId, decision, rejectedReason }) {
  if (!isConnected()) return { ok: false };

  const doc = await KycDocument.findById(documentId);
  if (!doc) throw Object.assign(new Error('Document not found'), { status: 404 });

  if (decision === 'verified') {
    doc.status = 'verified';
    doc.verifiedAt = new Date();
  } else if (decision === 'rejected') {
    doc.status = 'rejected';
    doc.rejectedReason = rejectedReason || 'no reason provided';
  } else {
    throw Object.assign(new Error('decision must be verified|rejected'), { status: 400 });
  }
  doc.reviewedAt = new Date();
  doc.reviewedBy = reviewerId;
  await doc.save();

  await logActivity({
    actorUserId: reviewerId,
    action: 'kyc.document_reviewed',
    target: 'kyc_document',
    targetId: doc._id.toString(),
    after: { decision, rejectedReason: rejectedReason || null },
  });

  // Recompute user tier and persist
  const newTier = await computeAndPersistTier(doc.userId);
  return { ok: true, decision, newTier };
}

/**
 * Compute the user's current KYC tier based on their verified documents.
 * Returns highest tier where ALL required documents are verified.
 */
export async function computeKycTier(userId) {
  if (!isConnected()) return 0;

  const verifiedDocs = await KycDocument.find({
    userId,
    status: 'verified',
  }).lean();

  const verifiedTypes = new Set(verifiedDocs.map((d) => d.documentType));

  // Check tier 4 first, then descend to find highest tier all reqs met
  for (let tier = 4; tier >= 1; tier--) {
    const reqs = TIER_REQUIRED_DOCUMENTS[tier] || [];
    let allMet = true;

    if (tier === 1) {
      // Any one of TIER_1_ANY_OF satisfies tier 1
      allMet = TIER_1_ANY_OF.some((t) => verifiedTypes.has(t));
    } else if (tier === 3) {
      // bank_statement (or alternative) AND any tier 1 ID + tier 2 components
      const tier3Met = TIER_3_ANY_OF.some((t) => verifiedTypes.has(t));
      const tier2Met = TIER_REQUIRED_DOCUMENTS[2].every((t) => verifiedTypes.has(t));
      const tier1Met = TIER_1_ANY_OF.some((t) => verifiedTypes.has(t));
      allMet = tier3Met && tier2Met && tier1Met;
    } else {
      allMet = reqs.every((t) => verifiedTypes.has(t));
      // Higher tiers also require all lower-tier reqs
      if (tier === 4 && allMet) {
        const tier3Met = TIER_3_ANY_OF.some((t) => verifiedTypes.has(t));
        if (!tier3Met) allMet = false;
      }
      if (tier === 2 && allMet) {
        const tier1Met = TIER_1_ANY_OF.some((t) => verifiedTypes.has(t));
        if (!tier1Met) allMet = false;
      }
    }

    if (allMet) return tier;
  }

  return 0; // Sandbox default
}

/** Compute + persist tier on user record. */
export async function computeAndPersistTier(userId) {
  const tier = await computeKycTier(userId);
  if (isConnected()) {
    await User.updateOne({ _id: userId }, { $set: { 'kyc.tier': tier, 'kyc.lastEvaluatedAt': new Date() } });
  }
  return tier;
}

/**
 * Full KYC status for current user — for /kyc page + /wallet limits display.
 */
export async function getMyKycStatus(userId) {
  if (!isConnected()) {
    return {
      tier: 0,
      tierName: 'Sandbox',
      limits: TIER_LIMITS[0],
      verifiedDocs: [],
      pendingDocs: [],
      rejectedDocs: [],
      nextTier: 1,
      nextTierMissing: ['ID document (CNIC, passport, or national ID)'],
    };
  }

  const tier = await computeKycTier(userId);
  const docs = await KycDocument.find({ userId }).sort({ createdAt: -1 }).lean();

  const verified = docs.filter((d) => d.status === 'verified');
  const pending = docs.filter((d) => d.status === 'pending' || d.status === 'under_review');
  const rejected = docs.filter((d) => d.status === 'rejected');

  // Compute what's missing to reach next tier
  const verifiedTypes = new Set(verified.map((d) => d.documentType));
  const nextTier = Math.min(4, tier + 1);
  const nextTierMissing = [];

  if (nextTier === 1) {
    if (!TIER_1_ANY_OF.some((t) => verifiedTypes.has(t))) {
      nextTierMissing.push('ID document (CNIC, passport, national ID, or driving license)');
    }
  } else if (nextTier === 2) {
    for (const t of TIER_REQUIRED_DOCUMENTS[2]) {
      if (!verifiedTypes.has(t)) nextTierMissing.push(t);
    }
  } else if (nextTier === 3) {
    if (!TIER_3_ANY_OF.some((t) => verifiedTypes.has(t))) {
      nextTierMissing.push('Bank statement, source-of-funds letter, or tax return');
    }
  } else if (nextTier === 4) {
    for (const t of TIER_REQUIRED_DOCUMENTS[4]) {
      if (!verifiedTypes.has(t)) nextTierMissing.push(t);
    }
  }

  return {
    userId,
    tier,
    tierName: TIER_LIMITS[tier]?.name || 'Sandbox',
    limits: TIER_LIMITS[tier],
    verifiedDocs: verified,
    pendingDocs: pending,
    rejectedDocs: rejected,
    nextTier: tier < 4 ? nextTier : null,
    nextTierMissing,
    nextTierLimits: tier < 4 ? TIER_LIMITS[nextTier] : null,
  };
}

/** Check if a proposed wallet operation is within user's tier limits. */
export async function checkTierLimit({ userId, amountUsd, direction = 'in' }) {
  const tier = await computeKycTier(userId);
  const limit = direction === 'out' ? TIER_LIMITS[tier]?.monthlyOutUsd : TIER_LIMITS[tier]?.monthlyInUsd;

  // -1 = unlimited (Tier 4)
  if (limit === -1) return { allowed: true, tier, limit: 'unlimited' };

  // Phase 2: aggregate this user's actual monthly in/out and compare
  // MVP: simple per-tx cap based on monthly limit
  if (amountUsd > limit) {
    return {
      allowed: false,
      tier,
      limit,
      reason: `Tier ${tier} ${direction} cap is $${limit}/mo; requested $${amountUsd}`,
    };
  }
  return { allowed: true, tier, limit };
}
