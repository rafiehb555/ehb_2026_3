// PSS Service — Identity verification with AML / sanctions / risk interfaces.
// Phase 1: stub drivers. Production: swap to real KYC vendor (Jumio/Onfido/NADRA), AML
// provider (ComplyAdvantage/Refinitiv), device fingerprinting.

import User from '../models/User.js';
import { isConnected } from '../config/db.js';
import { calculateSTL } from './stlService.js';
import { logActivity } from './auditService.js';

const DOC_TYPES = ['CNIC', 'Passport', 'Driver License', 'NIC'];

/** Adapter interface — swap to real OCR vendor in production */
export const ocrDriver = {
  /** Returns { extracted: { name, dob, docNumber }, confidence: 0-1 } */
  async extract({ docType, docImageUrl, docNumber }) {
    // Stub: return what was submitted with high confidence
    return {
      extracted: { name: null, dob: null, docNumber },
      confidence: 0.85,
      provider: 'stub',
    };
  },
};

/** Adapter interface — AML / sanctions / PEP screening */
export const amlDriver = {
  /** Returns { clear: boolean, risk: 0-1, matches: [{ list, name, score }] } */
  async screen({ name, dob, country }) {
    // Stub: always clear for demo; real driver returns genuine screening result.
    return { clear: true, risk: 0.05, matches: [], provider: 'stub' };
  },
};

/** Adapter interface — liveness check (face match against doc) */
export const livenessDriver = {
  async verify({ livenessPayload, docImageUrl }) {
    return { pass: Boolean(livenessPayload), confidence: 0.9, provider: 'stub' };
  },
};

/**
 * Main PSS submission handler.
 * Runs OCR → AML → liveness → computes PSS level + derived STL.
 */
export async function submitPss({ userId, docType, docNumber, livenessOk, docImageUrl, country = 'PK' }) {
  if (!DOC_TYPES.includes(docType)) {
    throw Object.assign(new Error(`Unsupported docType: ${docType}`), { status: 400 });
  }
  if (!docNumber || docNumber.length < 5) {
    throw Object.assign(new Error('docNumber required (min length 5)'), { status: 400 });
  }

  const ocr = await ocrDriver.extract({ docType, docImageUrl, docNumber });
  const aml = await amlDriver.screen({
    name: ocr.extracted.name,
    dob: ocr.extracted.dob,
    country,
  });
  const liveness = await livenessDriver.verify({ livenessPayload: livenessOk, docImageUrl });

  // Decision matrix (Phase 1 simple version)
  let pssLevel = 0;
  let status = 'pending';
  const reasons = [];

  if (!aml.clear) {
    status = 'rejected';
    reasons.push('AML sanctions match');
  } else if (!liveness.pass) {
    status = 'rejected';
    reasons.push('Liveness failed');
  } else if (ocr.confidence < 0.6) {
    status = 'pending'; // escalate to manual review
    reasons.push('Low OCR confidence → manual review');
  } else {
    status = 'verified';
    // Phase 1 mapping:
    // docType CNIC + liveness + clean AML → L3
    // Extra signals (e.g. address proof, income proof) would push to L4/L5
    pssLevel = 3;
  }

  // Auto-promote to L4 if high OCR confidence
  if (status === 'verified' && ocr.confidence >= 0.9) pssLevel = 4;

  // Compute STL with current PSS, keep CRB=0 and DMO=2 (default starter)
  const stl = calculateSTL({ pssLevel, crbLevel: 0, dmoLevel: 2 });

  // Persist to user if connected
  if (isConnected() && userId) {
    const update = {
      'pss.level': pssLevel,
      'pss.status': status,
      'pss.submittedAt': new Date(),
      'pss.verifiedAt': status === 'verified' ? new Date() : undefined,
      'stl.score': stl.score,
      'stl.level': stl.level,
    };
    await User.updateOne({ _id: userId }, { $set: update });
    await logActivity({
      actorUserId: userId,
      action: `pss.${status}`,
      target: 'user',
      targetId: userId,
      after: { pssLevel, status, reasons },
    });
  }

  return {
    ok: true,
    status,
    reasons,
    pss: {
      level: pssLevel,
      status,
      docType,
      docNumberMasked: maskNumber(docNumber),
    },
    crb: { level: 0 },
    dmo: { level: 2 },
    stl,
    audit: {
      ocr: { confidence: ocr.confidence, provider: ocr.provider },
      aml: { clear: aml.clear, risk: aml.risk, provider: aml.provider },
      liveness: { pass: liveness.pass, confidence: liveness.confidence, provider: liveness.provider },
    },
  };
}

export async function getPssStatus(userId) {
  if (isConnected() && userId) {
    const u = await User.findById(userId).select('pss crb dmo stl').lean();
    if (!u) return null;
    return { userId, ...u };
  }
  return null;
}

function maskNumber(n) {
  if (!n || n.length < 4) return '***';
  return n.slice(0, 2) + '***' + n.slice(-2);
}
