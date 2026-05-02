/**
 * EHB Canonical Constants
 *
 * Single source of truth — IMPORTS DIRECTLY from ehb-info/5-specs/FLOW-SCHEMA.json
 * Both client + server use this module.
 *
 * DO NOT hardcode STL values, slashing %, or industry multipliers anywhere else.
 * Read this module, and admin runtime config can override per `RULES-VS-CONFIG.md`.
 */

import schema from '../../../../ehb-info/5-specs/FLOW-SCHEMA.json';

// =====================================================================
// Type definitions
// =====================================================================

export type StlLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type StlLevelName =
  | 'FREE' | 'BASIC' | 'NORMAL' | 'STANDARD' | 'ADVANCED'
  | 'HIGH' | 'PRO' | 'VIP' | 'ELITE' | 'SUPREME';

export type DmoMode = 'FAST' | 'BALANCED' | 'STRICT' | 'CRITICAL';

export type IndustryCode = keyof typeof schema.industry_multipliers;

export interface SlashingConfig {
  fraud_T6: number;
  complaint_unresolved_30d: number;
  refill_miss_2x: number;
  late_delivery_3x: number;
  max_per_window: number;
}

// =====================================================================
// STL ladder (L1-L10)
// =====================================================================

export const STL_LEVEL_NAMES: Record<StlLevel, StlLevelName> = {
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

export const STL_LOCK_LADDER = schema.stl_lock_ladder as Record<string, number>;

// EHB Responsibility % per level
export const EHB_RESPONSIBILITY: Record<StlLevel, number> = {
  1: 10, 2: 20, 3: 40, 4: 55, 5: 70,
  6: 80, 7: 90, 8: 95, 9: 98, 10: 100,
};

// =====================================================================
// Source caps (per source, alone can reach max level)
// =====================================================================

export const SOURCE_CAPS = {
  PSS: 5 as StlLevel,
  CRB: 9 as StlLevel,
  DMO: 10 as StlLevel,
  FRANCHISE: 8 as StlLevel,  // only Franchisee role
} as const;

// =====================================================================
// STL Formula
// =====================================================================

export const STL_FORMULA = {
  description: schema.constants.stl_formula,
  minChain: schema.constants.min_chain,
};

/**
 * Calculate STL from PSS + CRB + DMO levels.
 * Formula: MIN(Score/1.2, lowest_component × 10 + 10)
 */
export function calculateSTL(
  pssLevel: number,
  crbLevel: number,
  dmoLevel: number
): { score: number; level: StlLevel; levelName: StlLevelName } {
  const pss = clamp(pssLevel, 0, 10);
  const crb = clamp(crbLevel, 0, 10);
  const dmo = clamp(dmoLevel, 0, 10);

  const pssPoints = (pss / 10) * 40;
  const crbPoints = (crb / 10) * 40;
  const dmoPoints = (dmo / 10) * 40;
  const rawScore = pssPoints + crbPoints + dmoPoints;

  const lowestComponent = Math.min(pss, crb, dmo);
  const cap = lowestComponent * 10 + 10;
  const score = clamp(Math.min(rawScore / 1.2, cap), 0, 100);
  const level = scoreToLevel(score);

  return {
    score: Math.round(score * 100) / 100,
    level,
    levelName: STL_LEVEL_NAMES[level],
  };
}

/** MIN-chain — final STL = weakest entity. */
export function minChain(layers: { name: string; level: number }[]): {
  finalLevel: number;
  blockingLayer: string;
} {
  const sorted = [...layers].sort((a, b) => a.level - b.level);
  return {
    finalLevel: sorted[0].level,
    blockingLayer: sorted[0].name,
  };
}

// =====================================================================
// Revenue split (locked: 70/10/10/10 + 40/15/25/15/5)
// =====================================================================

export const REVENUE_SPLIT = {
  seller: 0.70,
  rider: 0.10,
  franchise: 0.10,
  ehb: 0.10,
};

export const FRANCHISE_SPLIT = {
  sub: 0.40,
  corporate: 0.15,
  master: 0.25,
  country: 0.15,
  hq_buffer: 0.05,
};

// =====================================================================
// Slashing schedule
// =====================================================================

export const SLASHING: SlashingConfig = schema.constants.slashing as SlashingConfig;

/**
 * Calculate cumulative slash with 50% cap.
 */
export function calculateSlash(violations: {
  fraud?: boolean;
  complaints?: number;
  refillMisses?: number;
  lateDeliveries?: number;
}): { totalPct: number; capped: boolean; reason: string[] } {
  if (violations.fraud) {
    return { totalPct: SLASHING.fraud_T6, capped: false, reason: ['T6 fraud confirmed'] };
  }

  let total = 0;
  const reasons: string[] = [];

  if (violations.complaints && violations.complaints > 0) {
    const slash = SLASHING.complaint_unresolved_30d * violations.complaints;
    total += slash;
    reasons.push(`${violations.complaints} complaints × 25% = ${slash}%`);
  }

  if (violations.refillMisses && violations.refillMisses >= 2) {
    total += SLASHING.refill_miss_2x;
    reasons.push(`Refill miss × 2 = 10%`);
  }

  if (violations.lateDeliveries && violations.lateDeliveries >= 3) {
    total += SLASHING.late_delivery_3x;
    reasons.push(`Late delivery × 3+ = 5%`);
  }

  const capped = total > SLASHING.max_per_window;
  return {
    totalPct: capped ? SLASHING.max_per_window : total,
    capped,
    reason: reasons,
  };
}

// =====================================================================
// Lock formula (Hybrid: Base × Industry Multiplier)
// =====================================================================

export const INDUSTRY_MULTIPLIERS = schema.industry_multipliers as Record<string, number>;

/**
 * Calculate required EHBGC lock for an entity at given STL level + industry.
 */
export function calculateLock(
  stlLevel: StlLevel,
  industry: string
): { baseLock: number; multiplier: number; finalLock: number } {
  const baseLock = STL_LOCK_LADDER[`L${stlLevel}`] || 0;
  const multiplier = INDUSTRY_MULTIPLIERS[industry] || INDUSTRY_MULTIPLIERS._default || 1.0;
  const finalLock = baseLock * multiplier;

  return { baseLock, multiplier, finalLock };
}

// =====================================================================
// Industry config
// =====================================================================

export const MIN_STL_PER_INDUSTRY = schema.min_stl_per_industry as Record<string, number>;
export const DMO_MODES_PER_INDUSTRY = schema.dmo_modes_per_industry as Record<DmoMode, string[]>;

/**
 * Get DMO mode for a given industry.
 */
export function getDmoMode(industry: string): DmoMode | null {
  for (const [mode, industries] of Object.entries(DMO_MODES_PER_INDUSTRY)) {
    if (industries.includes(industry)) return mode as DmoMode;
  }
  return null;
}

/**
 * Cooling period in days based on DMO mode.
 */
export function getCoolingDays(mode: DmoMode): number {
  const map: Record<DmoMode, number> = {
    FAST: 7,
    BALANCED: 14,
    STRICT: 30,
    CRITICAL: 30,
  };
  return map[mode] || 30;
}

// =====================================================================
// Premature unlock penalty (per Q12 unified rule)
// =====================================================================

export const PREMATURE_UNLOCK = schema.constants.premature_unlock;

// =====================================================================
// Yield rate (4-6% APY)
// =====================================================================

export const YIELD_APY_RANGE = schema.constants.yield_apy_range as [number, number];

/**
 * Calculate APY rate based on STL level (higher = better rate).
 */
export function getYieldRate(stlLevel: StlLevel): number {
  if (stlLevel >= 9) return 0.06;  // L9-L10: 6%
  if (stlLevel >= 7) return 0.05;  // L7-L8: 5%
  if (stlLevel >= 4) return 0.045; // L4-L6: 4.5%
  return 0.04;                     // L1-L3: 4%
}

// =====================================================================
// Helpers
// =====================================================================

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function scoreToLevel(score: number): StlLevel {
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

// =====================================================================
// Export schema for direct event-engine use
// =====================================================================

export const FLOW_EVENTS = schema.events;
export const FLOW_STATE_MACHINES = schema.flow_state_machines;
export default {
  STL_LEVEL_NAMES,
  STL_LOCK_LADDER,
  EHB_RESPONSIBILITY,
  SOURCE_CAPS,
  STL_FORMULA,
  calculateSTL,
  minChain,
  REVENUE_SPLIT,
  FRANCHISE_SPLIT,
  SLASHING,
  calculateSlash,
  INDUSTRY_MULTIPLIERS,
  calculateLock,
  MIN_STL_PER_INDUSTRY,
  DMO_MODES_PER_INDUSTRY,
  getDmoMode,
  getCoolingDays,
  PREMATURE_UNLOCK,
  YIELD_APY_RANGE,
  getYieldRate,
  FLOW_EVENTS,
  FLOW_STATE_MACHINES,
};
