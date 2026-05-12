/**
 * EHB STL · MIN-Chain Utilities
 *
 * Per File 3 §6 (Integration Master Plan) + STL canonical formula:
 *   Final EHB-STL = MIN(productSTL, sellerSTL, companySTL, ownerSTL)
 *
 * Source of truth: services/api/src/services/stlService.js (58 gold-master tests)
 * Canonical: ehb-info/3-departments/STL.md v1.1
 *
 * 🚨 DO NOT modify the formula. Tests will break.
 */

import { STL_LEVELS, type StlLevelDef } from './levels';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type StlLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface StlComponents {
  pss?: number; // 0-10
  crb?: number; // 0-10
  dmo?: number; // 0-10
  franchise?: number; // 0-10
}

export interface MinChainInput {
  productStl?: number;
  sellerStl?: number;
  companyStl?: number;
  ownerStl?: number;
  facultyAvgStl?: number;
  institutionStl?: number;
  tutorStl?: number;
  courseStl?: number;
  serviceStl?: number;
  providerStl?: number;
  employerStl?: number;
}

export interface RefillStatus {
  due: boolean;
  expiredDays?: number; // negative = days until due, positive = days expired
  warningWindow?: number; // days remaining in warning window (default 7)
}

export interface StlDisplayData {
  finalLevel: StlLevel;
  finalLevelName: string;
  components: Array<{ label: string; level: number }>;
  isLocked: boolean; // current user STL < this STL
  refill?: RefillStatus;
  badgeColor: { from: string; to: string };
}

// ─────────────────────────────────────────────────────────────────────────────
// CORE FORMULAS (mirror of services/api/src/services/stlService.js)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Compute STL score from PSS/CRB/DMO components (per canonical formula).
 * Score 0-100. Each component is 0-10 (level form).
 */
export function computeStlScore(c: StlComponents): number {
  const pss = (c.pss ?? 0) / 10;
  const crb = (c.crb ?? 0) / 10;
  const dmo = (c.dmo ?? 0) / 10;
  const score = (pss * 40) + (crb * 40) + (dmo * 40); // 0-120
  const lowest = Math.min(c.pss ?? 10, c.crb ?? 10, c.dmo ?? 10);
  return Math.min(Math.round(score / 1.2), lowest + 1);
}

/**
 * Convert score 0-100 to level 1-10.
 * Score 0-9 = L1 · 10-19 = L2 · ... · 90-100 = L10.
 */
export function scoreToLevel(score: number): StlLevel {
  const s = Math.max(0, Math.min(100, score));
  return Math.max(1, Math.min(10, Math.floor(s / 10) + 1)) as StlLevel;
}

/**
 * MIN-chain rule (the founder lock):
 * Final EHB-STL = MIN of all STL components in the chain.
 *
 * @param input All STL components on a card
 * @returns lowest non-undefined STL level
 */
export function computeMinChain(input: MinChainInput): StlLevel {
  const values = Object.values(input).filter(
    (v) => typeof v === 'number' && v > 0
  ) as number[];
  if (values.length === 0) return 1;
  const min = Math.min(...values);
  return Math.max(1, Math.min(10, Math.round(min))) as StlLevel;
}

/**
 * Get level definition (icon · gradient · authority · etc.)
 */
export function getLevelDef(level: number): StlLevelDef | null {
  return STL_LEVELS.find((l) => l.level === level) ?? null;
}

/**
 * Get level name (e.g., "L4 STANDARD")
 */
export function levelName(level: number): string {
  const def = getLevelDef(level);
  return def ? `L${def.level} ${def.name}` : `L${level}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// REFILL STATUS (CRB cycle)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Check refill status given an expiry date.
 * @param expiryDate ISO date string of CRB cert expiry
 * @param warningWindowDays defaults to 7
 */
export function getRefillStatus(
  expiryDate?: string | Date | null,
  warningWindowDays = 7
): RefillStatus {
  if (!expiryDate) return { due: false };
  const expiry = new Date(expiryDate);
  const now = new Date();
  const diffMs = expiry.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      due: true,
      expiredDays: Math.abs(diffDays),
      warningWindow: 0,
    };
  }
  if (diffDays <= warningWindowDays) {
    return {
      due: true,
      expiredDays: -diffDays, // negative = days until expiry
      warningWindow: diffDays,
    };
  }
  return { due: false };
}

// ─────────────────────────────────────────────────────────────────────────────
// LOCKED TIER CHECK (user trying to access higher-tier card)
// ─────────────────────────────────────────────────────────────────────────────

export function isCardLocked(currentUserStl: number, cardStl: number): boolean {
  return currentUserStl < cardStl;
}

// ─────────────────────────────────────────────────────────────────────────────
// IMPROVEMENT PATH (used by AI Coach)
// ─────────────────────────────────────────────────────────────────────────────

export interface ImprovementStep {
  action: string;
  impact: string; // "+1 CRB · +0.5 STL"
  estimatedDays: number;
}

export function suggestImprovementPath(
  current: StlComponents,
  targetLevel: number = 10
): ImprovementStep[] {
  const steps: ImprovementStep[] = [];
  const pss = current.pss ?? 0;
  const crb = current.crb ?? 0;
  const dmo = current.dmo ?? 0;

  // PSS gaps (max L5 alone · L8+ needs combined)
  if (pss < 4 && targetLevel >= 4) {
    steps.push({
      action: 'Verify CNIC + selfie + address',
      impact: `+${4 - pss} PSS · +${(4 - pss) * 0.4} STL`,
      estimatedDays: 1,
    });
  }
  if (pss < 6 && targetLevel >= 6) {
    steps.push({
      action: 'Complete video KYC + business proof',
      impact: `+${6 - pss} PSS · +${(6 - pss) * 0.4} STL`,
      estimatedDays: 3,
    });
  }

  // CRB gaps
  if (crb < 3 && targetLevel >= 3) {
    steps.push({
      action: 'Take any CRB exam',
      impact: '+1-3 CRB · +0.4-1.2 STL',
      estimatedDays: 1,
    });
  }
  if (crb < 6 && targetLevel >= 6) {
    steps.push({
      action: 'Complete subject-specific CRB cert',
      impact: '+2-3 CRB · +0.8-1.2 STL',
      estimatedDays: 7,
    });
  }

  // DMO gaps (clean record)
  if (dmo < 7 && targetLevel >= 4) {
    steps.push({
      action: 'Resolve open complaints + maintain clean record',
      impact: '+1-2 DMO · +0.4-0.8 STL',
      estimatedDays: 30,
    });
  }

  return steps;
}

// ─────────────────────────────────────────────────────────────────────────────
// COLOR + GRADIENT (per ehb-info/15-ui-system/STL-LADDER-COMPONENT.md)
// ─────────────────────────────────────────────────────────────────────────────

export const STL_GRADIENTS: Record<number, { from: string; to: string }> = {
  1: { from: '#5C6072', to: '#2C2E3A' }, // gray
  2: { from: '#4A7FBC', to: '#1E3A5F' }, // blue
  3: { from: '#4DAB7E', to: '#1F5A3E' }, // green
  4: { from: '#4DA8B5', to: '#1E5862' }, // teal
  5: { from: '#6F62D6', to: '#3B2F8A' }, // purple
  6: { from: '#8B4DC4', to: '#4F1F7A' }, // violet
  7: { from: '#C44D8B', to: '#7A1F50' }, // magenta
  8: { from: '#F0B90B', to: '#7A5A04' }, // gold
  9: { from: '#8B6B3F', to: '#3F2D14' }, // bronze
  10: { from: '#5F4D7A', to: '#2F1F4A' }, // royal
};

export function getStlGradient(level: number): { from: string; to: string } {
  const l = Math.max(1, Math.min(10, Math.round(level)));
  return STL_GRADIENTS[l];
}
