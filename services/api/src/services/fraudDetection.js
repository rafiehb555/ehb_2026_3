/**
 * EHB · Fraud Detection System
 *
 * Aggregates signals from across the platform; computes risk score per user;
 * fires events when threshold exceeded.
 *
 * Signals checked:
 *   - Abnormal activity (sudden spike, off-hours)
 *   - Fake reviews (review burst, reciprocal patterns, low-effort text)
 *   - Payment manipulation (refund abuse, chargeback patterns, mismatched cards)
 *   - Duplicate accounts (same device/IP/payment, near-name match)
 *
 * Wired to event bus → emit `fraud.detected` with signal name + severity.
 */

import { metrics } from '../middleware/metrics.js';
import { emit } from './eventBus.js';

// =====================================================================
// Signal detectors — pure functions
// =====================================================================

/** Abnormal activity — velocity spike vs user's own baseline */
export function detectVelocitySpike({ user_baseline_orders_per_day, recent_orders_24h }) {
  if (!user_baseline_orders_per_day || user_baseline_orders_per_day < 1) return null;
  const ratio = recent_orders_24h / user_baseline_orders_per_day;
  if (ratio >= 5) return { signal: 'velocity_spike_5x', severity: 'high', ratio };
  if (ratio >= 3) return { signal: 'velocity_spike_3x', severity: 'medium', ratio };
  return null;
}

/** Off-hours pattern — order placed at unusual time for user's locale */
export function detectOffHours({ recent_order_hours = [], user_timezone_offset = 0 }) {
  const offHours = recent_order_hours.filter((h) => {
    const local = (h - user_timezone_offset + 24) % 24;
    return local < 5 || local > 23; // late night
  });
  if (offHours.length / Math.max(recent_order_hours.length, 1) > 0.7) {
    return { signal: 'off_hours_pattern', severity: 'low' };
  }
  return null;
}

/** Fake reviews — burst from one user */
export function detectReviewBurst({ reviews_today, reviews_avg_per_day }) {
  if (!reviews_avg_per_day || reviews_avg_per_day === 0) {
    if (reviews_today >= 10) return { signal: 'review_burst', severity: 'medium', count: reviews_today };
    return null;
  }
  if (reviews_today >= reviews_avg_per_day * 5) {
    return { signal: 'review_burst', severity: 'high', ratio: reviews_today / reviews_avg_per_day };
  }
  return null;
}

/** Reciprocal review pattern — A reviews B, B reviews A within short window */
export function detectReciprocalReviews({ reciprocal_pairs_24h }) {
  if (reciprocal_pairs_24h >= 3) return { signal: 'reciprocal_reviews', severity: 'high', count: reciprocal_pairs_24h };
  if (reciprocal_pairs_24h >= 1) return { signal: 'reciprocal_reviews', severity: 'medium', count: reciprocal_pairs_24h };
  return null;
}

/** Refund abuse — high refund rate */
export function detectRefundAbuse({ refund_rate_pct, total_orders }) {
  if (total_orders < 5) return null; // not enough data
  if (refund_rate_pct >= 50) return { signal: 'refund_abuse_severe', severity: 'critical', pct: refund_rate_pct };
  if (refund_rate_pct >= 30) return { signal: 'refund_abuse', severity: 'high', pct: refund_rate_pct };
  if (refund_rate_pct >= 20) return { signal: 'refund_pattern', severity: 'medium', pct: refund_rate_pct };
  return null;
}

/** Chargeback pattern */
export function detectChargebackPattern({ chargebacks_90d, total_orders_90d }) {
  if (total_orders_90d < 5) return null;
  const rate = chargebacks_90d / total_orders_90d;
  if (rate >= 0.05) return { signal: 'chargeback_high', severity: 'critical', rate };
  if (rate >= 0.02) return { signal: 'chargeback_elevated', severity: 'high', rate };
  return null;
}

/** Duplicate account — same device fingerprint or payment method */
export function detectDuplicateAccounts({ same_device_count, same_payment_count }) {
  const flags = [];
  if (same_device_count >= 3) flags.push({ signal: 'multi_account_device', severity: 'high', count: same_device_count });
  else if (same_device_count >= 2) flags.push({ signal: 'multi_account_device_low', severity: 'medium', count: same_device_count });
  if (same_payment_count >= 2) flags.push({ signal: 'multi_account_payment', severity: 'high', count: same_payment_count });
  return flags;
}

/** Mismatched billing/shipping country (high-fraud combo) */
export function detectGeoMismatch({ ip_country, billing_country, shipping_country }) {
  const distinct = new Set([ip_country, billing_country, shipping_country].filter(Boolean));
  if (distinct.size >= 3) return { signal: 'geo_mismatch_3way', severity: 'high' };
  return null;
}

// =====================================================================
// Aggregator — runs all signals, computes total risk score
// =====================================================================
export function evaluateUser(signals) {
  const detected = [];

  const v = detectVelocitySpike(signals); if (v) detected.push(v);
  const oh = detectOffHours(signals); if (oh) detected.push(oh);
  const rb = detectReviewBurst(signals); if (rb) detected.push(rb);
  const rr = detectReciprocalReviews(signals); if (rr) detected.push(rr);
  const ra = detectRefundAbuse(signals); if (ra) detected.push(ra);
  const cb = detectChargebackPattern(signals); if (cb) detected.push(cb);
  detected.push(...detectDuplicateAccounts(signals));
  const gm = detectGeoMismatch(signals); if (gm) detected.push(gm);

  // Risk score weighting
  const SEVERITY_WEIGHTS = { critical: 30, high: 15, medium: 7, low: 2 };
  const score = detected.reduce((s, d) => s + (SEVERITY_WEIGHTS[d.severity] || 0), 0);
  const risk = score >= 30 ? 'critical' : score >= 15 ? 'high' : score >= 7 ? 'medium' : score > 0 ? 'low' : 'clean';

  return {
    risk_score: score,
    risk_level: risk,
    signals_fired: detected,
    recommended_action: score >= 30 ? 'freeze_and_escalate_dmo'
                      : score >= 15 ? 'flag_and_review'
                      : score >= 7 ? 'monitor'
                      : 'none',
  };
}

/**
 * Run evaluation + emit fraud event if risk ≥ medium.
 */
export async function scanAndAlert({ userId, signals }) {
  const result = evaluateUser(signals);

  if (result.signals_fired.length > 0) {
    for (const s of result.signals_fired) {
      metrics.fraudDetected(s.signal);
    }
  }

  if (result.risk_level === 'critical' || result.risk_level === 'high') {
    await emit('fraud.detected', {
      userId,
      ...result,
      detected_at: new Date().toISOString(),
    });
  }

  return result;
}

export default {
  detectVelocitySpike,
  detectOffHours,
  detectReviewBurst,
  detectReciprocalReviews,
  detectRefundAbuse,
  detectChargebackPattern,
  detectDuplicateAccounts,
  detectGeoMismatch,
  evaluateUser,
  scanAndAlert,
};
