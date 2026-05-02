/**
 * Founder Control Panel — high-privilege endpoints for the founder/board.
 * Mounted at /api/founder.
 *
 * Capabilities:
 *   - Platform-wide metrics overview
 *   - STL weight tweaks (PSS×0.4 + CRB×0.3 + DMO×0.3 default)
 *   - Industry rule edits (min STL, multipliers)
 *   - Country toggles (enable/disable)
 *   - Feature flags
 *   - Daily AI brief
 *
 * Auth: ROLE === 'FOUNDER' or 'SUPER_ADMIN' only.
 */

import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { requireAuth } from '../middleware/auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCHEMA_PATH = path.join(__dirname, '../../../../ehb-info/5-specs/FLOW-SCHEMA-V2.json');

const router = Router();

function requireFounder(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'EHB-AUTH-1003' });
  if (!['FOUNDER', 'SUPER_ADMIN'].includes(req.user.role)) {
    return res.status(403).json({ error: 'EHB-AUTH-1008', message: 'Founder access required' });
  }
  next();
}

// In-memory feature flags + runtime overrides (replace with DB in prod)
const featureFlags = new Map([
  ['ai_marketplace', true],
  ['franchise_applications', true],
  ['polkadot_anchoring', true],
  ['mobile_signup', true],
  ['cross_country_orders', false],
]);

// Country toggles (override country JSON `status: active`)
const countryOverrides = new Map();

// =====================================================================
// OVERVIEW — high-level platform metrics
// =====================================================================
router.get('/overview', requireAuth, requireFounder, async (req, res) => {
  // Aggregate from models (best-effort with DB unavailable fallback)
  const models = await import('../models/index.js').catch(() => null);
  const out = {
    timestamp: new Date().toISOString(),
    users: { total: 0, active_30d: 0, by_role: {} },
    stl: { distribution: {}, average: 0 },
    revenue: { gmv_24h: 0, settled_24h: 0 },
    complaints: { open: 0, resolved_24h: 0 },
    industries: { active_count: 0, top_5_by_volume: [] },
    countries: { active: [], pending: [] },
    feature_flags: Object.fromEntries(featureFlags),
  };

  if (models?.User && models?.DmoQueueItem) {
    try {
      const [total, byRole, openComplaints] = await Promise.all([
        models.User.countDocuments(),
        models.User.aggregate([{ $group: { _id: '$role', count: { $sum: 1 } } }]),
        models.DmoQueueItem.countDocuments({ status: 'OPEN' }),
      ]);
      out.users.total = total;
      out.users.by_role = Object.fromEntries(byRole.map((r) => [r._id, r.count]));
      out.complaints.open = openComplaints;
    } catch (err) {
      out._db_error = err.message;
    }
  }

  res.json(out);
});

// =====================================================================
// STL WEIGHTS — read + propose change
// =====================================================================
router.get('/stl-weights', requireAuth, requireFounder, (req, res) => {
  res.json({
    current: { pss: 0.4, crb: 0.3, dmo: 0.3 },
    formula: 'STL_score = PSS × 0.4 + CRB × 0.3 + DMO × 0.3',
    note: 'Changes require Council vote + 58 gold-master test re-run.',
    last_changed: '2026-04-30',
  });
});

router.post('/stl-weights/propose', requireAuth, requireFounder, (req, res) => {
  const { pss, crb, dmo, reason } = req.body || {};
  if (!pss || !crb || !dmo || !reason) {
    return res.status(400).json({ error: 'EHB-VALID-9001', message: 'Required: pss, crb, dmo, reason' });
  }
  const sum = Number(pss) + Number(crb) + Number(dmo);
  if (Math.abs(sum - 1.0) > 0.01) {
    return res.status(400).json({ error: 'EHB-VALID-9003', message: 'Weights must sum to 1.0' });
  }
  // In production: open a Council proposal
  res.json({
    proposal_id: `prop_${Date.now()}`,
    status: 'pending_council_vote',
    proposed: { pss, crb, dmo },
    reason,
    timeline: 'Vote within 7 days, ratification 14 days, implementation 30 days',
  });
});

// =====================================================================
// INDUSTRY RULES — read + edit min STL / multipliers
// =====================================================================
router.get('/industries', requireAuth, requireFounder, async (req, res) => {
  try {
    const schema = JSON.parse(await fs.readFile(SCHEMA_PATH, 'utf8'));
    res.json({
      multipliers: schema.industry_multipliers,
      min_stl: schema.min_stl_per_industry,
      dmo_modes: schema.dmo_modes_per_industry,
    });
  } catch (err) {
    res.status(500).json({ error: 'EHB-SYS-90001', message: err.message });
  }
});

router.post('/industries/:code/rules', requireAuth, requireFounder, async (req, res) => {
  const { code } = req.params;
  const { min_stl, multiplier, dmo_mode, reason } = req.body || {};

  // For now, log proposal — actual schema edit requires file write + git commit
  res.json({
    proposal_id: `ind_${Date.now()}`,
    industry: code,
    proposed_changes: { min_stl, multiplier, dmo_mode },
    reason,
    status: 'logged',
    note: 'Schema change requires repo commit. Ops team to apply.',
  });
});

// =====================================================================
// FEATURE FLAGS
// =====================================================================
router.get('/flags', requireAuth, requireFounder, (req, res) => {
  res.json({ flags: Object.fromEntries(featureFlags) });
});

router.post('/flags/:name', requireAuth, requireFounder, (req, res) => {
  const { name } = req.params;
  const { enabled } = req.body || {};
  featureFlags.set(name, Boolean(enabled));
  res.json({ name, enabled: Boolean(enabled), updated_by: req.user.id });
});

// =====================================================================
// COUNTRY TOGGLES
// =====================================================================
router.post('/countries/:code/status', requireAuth, requireFounder, (req, res) => {
  const { code } = req.params;
  const { active } = req.body || {};
  countryOverrides.set(code, { active: Boolean(active), at: new Date(), by: req.user.id });
  res.json({ country: code, active: Boolean(active), override: true });
});

router.get('/countries', requireAuth, requireFounder, (req, res) => {
  res.json({ overrides: Object.fromEntries(countryOverrides) });
});

// =====================================================================
// DAILY BRIEF — AI-generated summary
// =====================================================================
router.get('/daily-brief', requireAuth, requireFounder, async (req, res) => {
  // In production: call AI service to generate
  res.json({
    date: new Date().toISOString().slice(0, 10),
    summary: 'EHB stable. 0 critical incidents. Top action: review 3 pending franchise applications.',
    top_decisions_needed: [
      'Approve Pakistan Country Franchise candidate (3 days waiting)',
      'Sign off on FIN industry exam library',
      'Review WMS pricing override request',
    ],
    going_well: ['Phase 1 country signups +12% WoW', 'GMV +8%'],
    risks: ['Stripe integration not yet live', 'CRB exam content only at 5/38 industries'],
    suggested_focus: 'Founder Q&A: 12 DMO governance questions pending lock.',
    generated_by: 'stub — wire AI service in P4',
  });
});

// =====================================================================
// HEALTH
// =====================================================================
router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'founder-console', flags: featureFlags.size, country_overrides: countryOverrides.size });
});

export default router;
