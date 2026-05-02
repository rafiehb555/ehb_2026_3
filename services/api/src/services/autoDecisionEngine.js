/**
 * EHB · AI Auto-Decision Engine
 *
 * Rules-based auto actions to reduce manual DMO load.
 * Runs on every relevant event (post-order, post-review, post-complaint, daily sweep).
 *
 * Decisions:
 *   - Low STL → reduce visibility
 *   - High STL → boost visibility
 *   - Fraud pattern → auto-flag (escalate to DMO)
 *   - Repeated complaints → auto-penalty
 *
 * Each decision is logged + reversible by DMO override.
 */

import { metrics } from '../middleware/metrics.js';

// =====================================================================
// Rule definitions (configurable via DMO admin panel later)
// =====================================================================
export const DEFAULT_RULES = {
  visibility: {
    low_stl_threshold: 3,        // STL < 3 → reduced visibility
    high_stl_threshold: 7,       // STL ≥ 7 → boost
    boost_pct: 25,               // % boost on top of base ranking
    reduce_pct: 50,              // % reduction in visibility
  },
  fraud: {
    multi_account_same_device: 2,        // 2+ accounts → flag
    rapid_orders_per_hour: 10,           // 10+ orders/hour → flag
    velocity_spike_multiplier: 3,        // 3× normal pattern → flag
    refund_rate_threshold_pct: 30,       // > 30% refund rate → flag
    review_burst_per_day: 20,            // 20+ reviews/day from one user → flag
  },
  penalty: {
    upheld_complaints_30d_for_warning: 2,
    upheld_complaints_30d_for_5pct_slash: 3,
    upheld_complaints_30d_for_10pct_slash: 5,
    upheld_complaints_180d_for_ban: 10,
  },
};

// =====================================================================
// Decision functions — pure (input → decision)
// =====================================================================

export function decideVisibility({ stl, rules = DEFAULT_RULES.visibility }) {
  if (stl < rules.low_stl_threshold) {
    return { action: 'reduce', adjustment_pct: -rules.reduce_pct, reason: `STL < ${rules.low_stl_threshold}` };
  }
  if (stl >= rules.high_stl_threshold) {
    return { action: 'boost', adjustment_pct: rules.boost_pct, reason: `STL ≥ ${rules.high_stl_threshold}` };
  }
  return { action: 'normal', adjustment_pct: 0, reason: 'within normal range' };
}

export function decideFraudFlag({ signals, rules = DEFAULT_RULES.fraud }) {
  const flags = [];
  if (signals.accounts_per_device >= rules.multi_account_same_device) flags.push('multi_account');
  if (signals.orders_last_hour >= rules.rapid_orders_per_hour) flags.push('rapid_orders');
  if (signals.velocity_multiplier >= rules.velocity_spike_multiplier) flags.push('velocity_spike');
  if (signals.refund_rate_pct >= rules.refund_rate_threshold_pct) flags.push('high_refund_rate');
  if (signals.reviews_today >= rules.review_burst_per_day) flags.push('review_burst');

  if (flags.length === 0) return { flagged: false, signals_fired: [], severity: 'none' };

  const severity = flags.length >= 3 ? 'critical' : flags.length === 2 ? 'high' : 'medium';
  return { flagged: true, signals_fired: flags, severity, recommended: 'escalate_to_dmo' };
}

export function decidePenalty({ uphelComplaints30d, uphelComplaints180d, rules = DEFAULT_RULES.penalty }) {
  if (uphelComplaints180d >= rules.upheld_complaints_180d_for_ban) {
    return { action: 'ban', slash_pct: 100, reason: `${rules.upheld_complaints_180d_for_ban}+ upheld in 180d` };
  }
  if (uphelComplaints30d >= rules.upheld_complaints_30d_for_10pct_slash) {
    return { action: 'slash', slash_pct: 10, reason: `${uphelComplaints30d} upheld in 30d` };
  }
  if (uphelComplaints30d >= rules.upheld_complaints_30d_for_5pct_slash) {
    return { action: 'slash', slash_pct: 5, reason: `${uphelComplaints30d} upheld in 30d` };
  }
  if (uphelComplaints30d >= rules.upheld_complaints_30d_for_warning) {
    return { action: 'warn', slash_pct: 0, reason: `${uphelComplaints30d} upheld in 30d` };
  }
  return { action: 'none', slash_pct: 0, reason: 'within tolerance' };
}

// =====================================================================
// Apply decision (side effects + audit)
// =====================================================================
export async function applyAutoDecision({ user, signals = {}, complaints = {} }) {
  const decisions = {};

  decisions.visibility = decideVisibility({ stl: user.stl?.level || 0 });
  decisions.fraud = decideFraudFlag({ signals });
  decisions.penalty = decidePenalty({
    uphelComplaints30d: complaints.upheld_30d || 0,
    uphelComplaints180d: complaints.upheld_180d || 0,
  });

  // Track metrics for fraud signals
  if (decisions.fraud.flagged) {
    for (const s of decisions.fraud.signals_fired) metrics.fraudDetected(s);
  }
  if (decisions.penalty.action === 'slash' || decisions.penalty.action === 'ban') {
    metrics.slashing(decisions.penalty.action);
  }

  return {
    user_id: user.id,
    decisions,
    timestamp: new Date().toISOString(),
    reversible: true,
    requires_dmo_review: decisions.fraud.flagged || decisions.penalty.action === 'ban',
  };
}

export default {
  decideVisibility,
  decideFraudFlag,
  decidePenalty,
  applyAutoDecision,
  DEFAULT_RULES,
};
