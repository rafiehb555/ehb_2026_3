/**
 * EHB STL Service — Core trust scoring engine.
 *
 * PROTECTED: This file has the composite formula. Any change must be validated
 * against 58 gold-master regression tests (see stlService.test.js — to be
 * ported in Week 3).
 *
 * Formula (from EHB-MASTER-INFO + EHB-MASTER-SYSTEM-PHASES):
 *
 *   PSS_points = (PSS_level / 10) × 40      // 0–40
 *   CRB_points = (CRB_level / 10) × 40      // 0–40
 *   DMO_points = (DMO_level / 10) × 40      // 0–40
 *   Score      = PSS + CRB + DMO            // 0–120
 *   Final_STL  = MIN(Score / 1.2, lowest_component + 1)  // 0–100
 */

const LEVEL_NAMES = {
  1: 'FREE',
  2: 'BASIC',
  3: 'NORMAL',
  4: 'STANDARD',
  5: 'ADVANCED',
  6: 'HIGH',
  7: 'PRO',
  8: 'VIP',
  9: 'ELITE',
  10: 'SUPREME',
};

// Locked from canonical: ehb-info/5-specs/FLOW-SCHEMA.json `stl_lock_ladder`.
// DO NOT hardcode — must match canonical.
const EHBGC_LOCK_BY_LEVEL = {
  1: 0, 2: 20, 3: 40, 4: 100, 5: 200,
  6: 400, 7: 800, 8: 2000, 9: 4000, 10: 10000,
};

/** Convert composite score (0–100) → level (1–10). */
export function scoreToLevel(score) {
  if (score < 10) return 1;
  if (score < 20) return 2;
  if (score < 30) return 3;
  if (score < 40) return 4;
  if (score < 50) return 5;
  if (score < 60) return 6;
  if (score < 70) return 7;
  if (score < 80) return 8;
  if (score < 90) return 9;
  return 10;
}

/**
 * Calculate STL from the three source components.
 * Inputs are 0-10 levels (not scores).
 */
export function calculateSTL({ pssLevel = 0, crbLevel = 0, dmoLevel = 0 }) {
  const pss = Math.max(0, Math.min(10, pssLevel));
  const crb = Math.max(0, Math.min(10, crbLevel));
  const dmo = Math.max(0, Math.min(10, dmoLevel));

  const pssPoints = (pss / 10) * 40;
  const crbPoints = (crb / 10) * 40;
  const dmoPoints = (dmo / 10) * 40;
  const rawScore = pssPoints + crbPoints + dmoPoints; // 0..120

  const lowestComponent = Math.min(pss, crb, dmo);
  // Final_STL = MIN(Score / 1.2, lowest_component × 10 + 1 × 10) — cap translated to 0..100 scale
  const normalized = rawScore / 1.2; // 0..100
  const cap = lowestComponent * 10 + 10; // allow +1 level headroom
  const score = Math.max(0, Math.min(100, Math.min(normalized, cap)));
  const level = scoreToLevel(score);

  return {
    pssLevel: pss,
    crbLevel: crb,
    dmoLevel: dmo,
    rawScore: round2(rawScore),
    score: round2(score),
    level,
    levelName: LEVEL_NAMES[level],
    ehbgcLockRequired: EHBGC_LOCK_BY_LEVEL[level],
    breakdown: {
      pssPoints: round2(pssPoints),
      crbPoints: round2(crbPoints),
      dmoPoints: round2(dmoPoints),
      lowestComponent,
      cap,
    },
  };
}

/**
 * MIN-chain rule for product trust.
 * FINAL_STL = MIN(productSTL, sellerSTL, companySTL, ownerSTL)
 */
export function validateProductChain({
  productSTL = 10,
  sellerSTL = 10,
  companySTL = 10,
  ownerSTL = 10,
}) {
  const chain = [
    { name: 'product', level: productSTL },
    { name: 'seller', level: sellerSTL },
    { name: 'company', level: companySTL },
    { name: 'owner', level: ownerSTL },
  ];
  chain.sort((a, b) => a.level - b.level);
  const blocking = chain[0];
  return {
    finalStl: blocking.level,
    finalLevelName: LEVEL_NAMES[blocking.level] || 'UNKNOWN',
    blockingLayer: blocking.name,
    chain,
  };
}

/** Effects (visibility, fee, earnings cap) by STL level. Phase 1 stub values. */
export function effectsForLevel(level) {
  const clamped = Math.max(1, Math.min(10, level));
  return {
    level: clamped,
    levelName: LEVEL_NAMES[clamped],
    searchVisibilityMultiplier: 0.1 * clamped, // 0.1..1.0
    platformFeePct: Math.max(0.5, 3 - 0.25 * clamped), // high level → lower fee
    dailyEarningsCapUsd:
      clamped < 5 ? 200 : clamped < 8 ? 1500 : 10000, // stub tiers
    canList: clamped >= 4,
    canFranchise: clamped >= 7,
    ehbgcLockRequired: EHBGC_LOCK_BY_LEVEL[clamped],
  };
}

function round2(n) {
  return Math.round(n * 100) / 100;
}
