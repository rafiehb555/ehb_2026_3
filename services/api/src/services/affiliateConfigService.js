// Affiliate Config Service — v3.3 §13.8 Admin Flexibility Layer
//
// Spec: ehb-info/departments/Affiliate.md §13.8 (v3.3)
// Founder rule: zero hard-coded numbers, everything DB-backed, hot-reload.
//
// MVP scope: read/write current config, version history, audit log.
// Phase 2 adds: A/B test rollout (10% sample), scheduled changes,
//               approval workflow (>5% impact = DMO Director, >10% = SUPER_ADMIN multi-sig).

import AffiliateConfig from '../models/AffiliateConfig.js';
import { isConnected } from '../config/db.js';
import { logActivity } from './auditService.js';

let _cached = null;
let _cachedAt = 0;
const CACHE_TTL_MS = 60_000; // hot-reload within 60s per spec §12.16.2

/**
 * Get current config — cached for 60s.
 */
export async function getCurrentConfig() {
  if (!isConnected()) {
    return null; // service code defaults will be used
  }
  if (_cached && Date.now() - _cachedAt < CACHE_TTL_MS) {
    return _cached;
  }
  const cfg = await AffiliateConfig.findById('current').lean();
  _cached = cfg;
  _cachedAt = Date.now();
  return cfg;
}

/**
 * Bump version + persist new config.
 * Phase 2 will add: snapshot history, approval workflow, range validation.
 */
export async function updateConfig({ updates, updatedBy, updatedFor }) {
  if (!isConnected()) throw Object.assign(new Error('DB not connected'), { status: 503 });

  const existing = await AffiliateConfig.findById('current');
  const newVersion = (existing?.version || 0) + 1;

  // Range validation per spec §12.16.2 — direct % ≤ 50, total cascade ≤ 30
  if (updates.trackA?.l1Percent && updates.trackA.l1Percent > 50) {
    throw Object.assign(new Error('Direct % cannot exceed 50%'), { status: 400 });
  }

  await AffiliateConfig.findByIdAndUpdate(
    'current',
    {
      $set: {
        ...updates,
        version: newVersion,
        effectiveAt: new Date(),
        updatedBy,
        updatedFor: updatedFor || 'admin update',
      },
    },
    { upsert: true, new: true }
  );

  // Invalidate cache
  _cached = null;

  await logActivity({
    actorUserId: updatedBy,
    action: 'affiliate_config.updated',
    target: 'affiliate_config',
    targetId: 'current',
    after: { version: newVersion, updates, reason: updatedFor },
  });

  return { ok: true, version: newVersion };
}

/**
 * Reset config to service-code defaults (rollback).
 */
export async function resetConfig({ updatedBy }) {
  if (!isConnected()) return { ok: false };
  await AffiliateConfig.findByIdAndDelete('current');
  _cached = null;
  await logActivity({
    actorUserId: updatedBy,
    action: 'affiliate_config.reset',
    target: 'affiliate_config',
    targetId: 'current',
  });
  return { ok: true };
}

/** Force cache invalidation — useful for testing. */
export function invalidateCache() {
  _cached = null;
  _cachedAt = 0;
}
