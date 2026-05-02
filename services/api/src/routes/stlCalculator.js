/**
 * EHB · STL Calculator — Public preview tool
 *
 * Lets anyone (no auth required) preview their STL score before signing up.
 *
 * Endpoint: POST /api/stl/calculate
 * Body: { pssLevel: 1-10, crbLevel: 1-10, dmoLevel: 1-10, ehbgcLocked?: number }
 * Response: { score, level, levelName, ehbgcLockRequired, breakdown, gateStatus, climbingPath }
 *
 * Uses canonical formula from stlService.js (same engine production uses).
 * NOT for actual STL changes — only preview.
 */

import { Router } from 'express';
import { calculateSTL } from '../services/stlService.js';

const router = Router();

// =====================================================================
// Level metadata (mirrors apps/web/lib/stl/levels.ts)
// =====================================================================
const LEVEL_INFO = {
  1: { name: 'FREE',     ehbgcLock: 0,     authority: 'Browse only',                    tier: 'Entry' },
  2: { name: 'BASIC',    ehbgcLock: 20,    authority: 'Read-only browsing',             tier: 'Entry' },
  3: { name: 'NORMAL',   ehbgcLock: 40,    authority: 'Buying enabled',                 tier: 'Foundation' },
  4: { name: 'STANDARD', ehbgcLock: 100,   authority: 'Service listing + reviews',      tier: 'Foundation' },
  5: { name: 'ADVANCED', ehbgcLock: 200,   authority: 'Full seller tools',              tier: 'Growth' },
  6: { name: 'HIGH',     ehbgcLock: 400,   authority: '50+ listings · multi-service',   tier: 'Growth' },
  7: { name: 'PRO',      ehbgcLock: 800,   authority: '100+ listings · franchise',      tier: 'Elite' },
  8: { name: 'VIP',      ehbgcLock: 2000,  authority: '200+ listings · team accounts',  tier: 'Elite' },
  9: { name: 'ELITE',    ehbgcLock: 4000,  authority: '500+ listings · governance',     tier: 'Supreme' },
  10:{ name: 'SUPREME',  ehbgcLock: 10000, authority: 'Unlimited · policy override',    tier: 'Supreme' },
};

// =====================================================================
// Industry gate map (which industries unlock at this level)
// =====================================================================
// SOT merged into ITS on 2026-04-30 — total industries reduced 38 → 37
const INDUSTRY_BY_GATE = {
  1: ['GSM', 'HPS', 'OBS', 'LDS', 'AGTS', 'EPS', 'EAS', 'ELS', 'TUBE',
      'FBS', 'BCS', 'FWS', 'GES', 'MUSIC', 'WES', 'EDS', 'GSS', 'CMS'],
  2: ['HMS', 'ITS', 'ERS', 'ATS', 'CNS', 'MAS', 'PTS', 'TCS', 'LSM', 'RES', 'RRS'],
  3: ['OLS', 'EFS', 'MFS', 'INS', 'HCS', 'SCS'],
  4: ['WMS', 'FIN'],
};

function industriesUnlockedAt(level) {
  const out = [];
  for (let l = 1; l <= level; l++) {
    if (INDUSTRY_BY_GATE[l]) out.push(...INDUSTRY_BY_GATE[l]);
  }
  return out;
}

// =====================================================================
// POST /api/stl/calculate
// =====================================================================
router.post('/calculate', (req, res) => {
  const { pssLevel = 0, crbLevel = 0, dmoLevel = 0, ehbgcLocked = 0 } = req.body || {};

  // Validate range
  for (const [k, v] of Object.entries({ pssLevel, crbLevel, dmoLevel })) {
    if (typeof v !== 'number' || v < 0 || v > 10) {
      return res.status(400).json({
        error: 'EHB-VALID-9003',
        message: `${k} must be 0-10`,
      });
    }
  }

  // Compute STL using canonical engine
  const result = calculateSTL({ pssLevel, crbLevel, dmoLevel });

  // Lock check
  const lockRequired = LEVEL_INFO[result.level]?.ehbgcLock || 0;
  const lockSatisfied = ehbgcLocked >= lockRequired;
  const effectiveLevel = lockSatisfied ? result.level : Math.max(1, result.level - 1);

  // Climbing path — what's needed for next level
  const next = result.level < 10 ? LEVEL_INFO[result.level + 1] : null;
  const path = next ? {
    nextLevel: result.level + 1,
    nextName: next.name,
    nextLockNeeded: next.ehbgcLock,
    nextAuthority: next.authority,
    pointsNeeded: Math.max(0, (result.level * 10) - result.score),
  } : { nextLevel: null, message: 'Already at SUPREME — top level' };

  res.json({
    inputs: { pssLevel, crbLevel, dmoLevel, ehbgcLocked },
    score: result.score,
    rawScore: result.rawScore,
    level: effectiveLevel,
    levelName: LEVEL_INFO[effectiveLevel]?.name,
    levelTier: LEVEL_INFO[effectiveLevel]?.tier,
    authority: LEVEL_INFO[effectiveLevel]?.authority,
    breakdown: result.breakdown,
    minChainCap: result.breakdown.cap,
    weakestComponent: result.breakdown.lowestComponent,
    weakestComponentName: ['none', 'PSS', 'CRB', 'DMO'][
      [pssLevel, crbLevel, dmoLevel].indexOf(result.breakdown.lowestComponent) + 1
    ] || '—',
    lockRequired,
    lockSatisfied,
    industriesUnlocked: industriesUnlockedAt(effectiveLevel),
    industriesGateAtThisLevel: INDUSTRY_BY_GATE[effectiveLevel] || [],
    climbingPath: path,
    formula: 'PSS×0.4 + CRB×0.3 + DMO×0.3 → MIN(score/1.2, lowest+1)',
    note: 'Preview only. Real STL changes require completing PSS+CRB+DMO actions.',
  });
});

router.get('/calculate/info', (req, res) => {
  res.json({
    levels: LEVEL_INFO,
    industries_by_gate: INDUSTRY_BY_GATE,
    formula: {
      score: 'PSS_pts + CRB_pts + DMO_pts where each = (level/10) × 40',
      final: 'MIN(score / 1.2, lowest_component + 1)',
      caps: {
        PSS_source: 5,
        Franchise_source: 8,
        CRB_source: 9,
        DMO_source: 10,
      },
    },
  });
});

router.get('/calculate/health', (req, res) => {
  res.json({ status: 'ok', service: 'stl-calculator', formula_version: 'v1.1' });
});

export default router;
