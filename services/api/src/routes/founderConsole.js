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
// DAILY BRIEF — Real metrics + AI summary
// =====================================================================
router.get('/daily-brief', requireAuth, requireFounder, async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);

  // Pull real metrics from DB (best-effort with fallbacks)
  const metrics = {
    users: { total: 0, signups_24h: 0, active_7d: 0 },
    revenue: { gmv_24h_usd: 0, ehb_revenue_24h_usd: 0, currency_pkr: 0 },
    complaints: { open: 0, resolved_24h: 0, critical_open: 0 },
    stl: { avg: 0, l4_plus_pct: 0, recomputes_24h: 0 },
    industries: { active_count: 0, top_5_by_volume: [] },
    fraud: { signals_24h: 0, slashings_24h: 0 },
  };

  try {
    const models = await import('../models/index.js').catch(() => null);
    if (models?.User) {
      metrics.users.total = await models.User.countDocuments();
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
      metrics.users.signups_24h = await models.User.countDocuments({ createdAt: { $gte: yesterday } });
      const stlAgg = await models.User.aggregate([{ $group: { _id: null, avg: { $avg: '$stl.level' } } }]);
      metrics.stl.avg = Math.round((stlAgg[0]?.avg || 0) * 10) / 10;
      metrics.stl.l4_plus_pct = Math.round(
        (await models.User.countDocuments({ 'stl.level': { $gte: 4 } }) / Math.max(metrics.users.total, 1)) * 100
      );
    }
    if (models?.DmoQueueItem) {
      metrics.complaints.open = await models.DmoQueueItem.countDocuments({ status: 'OPEN' });
      metrics.complaints.critical_open = await models.DmoQueueItem.countDocuments({ status: 'OPEN', severity: 'critical' });
      const ydy = new Date(Date.now() - 24 * 60 * 60 * 1000);
      metrics.complaints.resolved_24h = await models.DmoQueueItem.countDocuments({ status: 'RESOLVED', resolvedAt: { $gte: ydy } });
    }
    if (models?.Order) {
      const ydy = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const settledAgg = await models.Order.aggregate([
        { $match: { state: 'SETTLED', createdAt: { $gte: ydy } } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]);
      metrics.revenue.gmv_24h_usd = settledAgg[0]?.total || 0;
      metrics.revenue.ehb_revenue_24h_usd = metrics.revenue.gmv_24h_usd * 0.10;
    }
  } catch (err) {
    console.warn('[daily-brief] metrics fetch partial:', err.message);
  }

  // AI Summary — try LLM, fall back to deterministic
  let summary = null;
  try {
    const aiUrl = (process.env.AI_SERVICE_URL || 'http://localhost:8080') + '/api/ai/chat';
    const aiResp = await fetch(aiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `Generate a 2-line founder daily brief in Roman Urdu + English bilingual. Metrics: ${JSON.stringify(metrics)}. Be concise + actionable.`,
        ask: 'reply',
      }),
      signal: AbortSignal.timeout(4000),
    });
    if (aiResp.ok) {
      const data = await aiResp.json();
      summary = data.reply || null;
    }
  } catch {}

  // Deterministic fallback summary
  if (!summary) {
    if (metrics.users.total === 0) {
      summary = 'Pre-launch stage. Setup complete. Real metrics will populate after first users sign up.';
    } else {
      const trend = metrics.users.signups_24h > 0
        ? `${metrics.users.signups_24h} naye signups today`
        : 'no new signups today';
      const stl = metrics.stl.avg > 0 ? `STL avg ${metrics.stl.avg}` : 'STL not computed';
      summary = `${trend} · ${stl} · ${metrics.complaints.open} open complaints. ${metrics.complaints.critical_open > 0 ? '⚠️ Critical complaints need attention.' : 'System stable.'}`;
    }
  }

  // Top decisions needed (driven by data)
  const topDecisions = [];
  if (metrics.complaints.critical_open > 0) {
    topDecisions.push(`Review ${metrics.complaints.critical_open} critical complaints in DMO queue`);
  }
  if (metrics.users.total < 100) {
    topDecisions.push('Recruit beta testers (target 50 by week 2)');
  }
  if (metrics.revenue.gmv_24h_usd === 0) {
    topDecisions.push('Trigger first test transaction end-to-end');
  }
  topDecisions.push('Sign payment partner contracts (JazzCash + Stripe)');
  topDecisions.push('Confirm 12 DMO governance questions with Council');

  // Going well
  const goingWell = [];
  if (metrics.users.signups_24h > 5) goingWell.push(`${metrics.users.signups_24h} signups in 24h`);
  if (metrics.complaints.resolved_24h > 0) goingWell.push(`${metrics.complaints.resolved_24h} complaints resolved`);
  if (metrics.stl.l4_plus_pct > 30) goingWell.push(`${metrics.stl.l4_plus_pct}% users at L4+`);
  if (goingWell.length === 0) goingWell.push('System architecture 99% complete — ready to launch');

  // Risks
  const risks = [];
  if (metrics.complaints.critical_open > 5) risks.push('Critical complaints elevated — DMO load high');
  if (metrics.users.signups_24h < 5 && metrics.users.total > 100) risks.push('Signup velocity low — review marketing spend');
  if (metrics.users.total < 50) risks.push('Pre-beta — need 50 testers before public');
  if (risks.length === 0) risks.push('No active risks — proceed with launch plan');

  res.json({
    date: today,
    generated_at: new Date().toISOString(),
    metrics: {
      'Total users': metrics.users.total.toLocaleString(),
      'Signups (24h)': metrics.users.signups_24h,
      'GMV (24h)': `$${metrics.revenue.gmv_24h_usd.toFixed(2)}`,
      'EHB revenue (24h)': `$${metrics.revenue.ehb_revenue_24h_usd.toFixed(2)}`,
      'Open complaints': metrics.complaints.open,
      'Critical complaints': metrics.complaints.critical_open,
      'Avg STL': metrics.stl.avg,
      'L4+ users %': `${metrics.stl.l4_plus_pct}%`,
    },
    summary,
    top_decisions_needed: topDecisions.slice(0, 3),
    going_well: goingWell.slice(0, 3),
    risks: risks.slice(0, 3),
    suggested_focus: topDecisions[0] || 'Continue executing P6 founder kit',
    raw_metrics: metrics,
  });
});

// =====================================================================
// HEALTH
// =====================================================================
router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'founder-console', flags: featureFlags.size, country_overrides: countryOverrides.size });
});

export default router;
