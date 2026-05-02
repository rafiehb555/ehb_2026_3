// Velocity Middleware — v3.3 §13.1.3 #9
// Spec: ehb-info/departments/Affiliate.md §13.1.3 (v3.3)
//
// Enforces 50 signups/IP/24h burst-prevention rule.
// Apply via: app.use('/api/auth/register', velocityGuard, registerHandler)

import { trackSignupVelocity } from '../services/complianceService.js';

/**
 * Express middleware that runs velocity check before signup.
 * Rejects with 429 if IP exceeds 50 signups/24h (per spec §13.1.3 #9).
 *
 * Phase 2 will also enforce per-device limit (10/24h via fingerprint).
 */
export async function velocityGuard(req, res, next) {
  try {
    const ipAddress = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.ip;
    const result = await trackSignupVelocity(ipAddress);

    if (!result.allowed) {
      return res.status(429).json({
        error: 'Velocity limit exceeded',
        reason: result.reason,
        retryAfterSeconds: 24 * 3600,
        spec: 'v3.3 §13.1.3 #9 — 50 signups/IP/24h limit',
      });
    }

    // Attach velocity info for downstream handlers
    req.velocity = result;
    next();
  } catch (e) {
    // Fail open in MVP (don't block legit signups on infra issues)
    console.warn('[velocity] check failed (allowing through):', e.message);
    next();
  }
}
