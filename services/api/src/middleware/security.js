/**
 * EHB · Security Middleware Suite
 *
 * Provides:
 *   - Rate limiting per route (login / payments / AI / webhooks)
 *   - Input validation + sanitization (NoSQL injection prevention)
 *   - Device tracking
 *   - Webhook idempotency + replay-attack guard
 */

import rateLimit from 'express-rate-limit';
import crypto from 'crypto';

// =====================================================================
// RATE LIMITERS — per-route presets
// =====================================================================

// Login: 5 per IP per 15 min (brute force prevention)
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'EHB-SYS-90003', message: 'Too many login attempts. Try again in 15 minutes.' },
});

// Signup: 3 per IP per hour
export const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { error: 'EHB-SYS-90003', message: 'Signup limit reached. Try again later.' },
});

// Payments: 30 per user per minute
export const paymentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  keyGenerator: (req) => req.user?.id || req.ip,
  message: { error: 'EHB-SYS-90003', message: 'Payment rate limit exceeded.' },
});

// AI routes: 60 per user per minute
export const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  keyGenerator: (req) => req.user?.id || req.ip,
  message: { error: 'EHB-SYS-90003', message: 'AI rate limit. Slow down.' },
});

// Webhook endpoints (provider-side, just IP-based)
export const webhookLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  message: { error: 'EHB-SYS-90003', message: 'Webhook rate limit.' },
});

// Generic API limiter (default for other routes)
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  keyGenerator: (req) => req.user?.id || req.ip,
});

// =====================================================================
// INPUT SANITIZATION — strip Mongo operators + control chars
// =====================================================================
function sanitizeValue(val) {
  if (typeof val === 'string') {
    // Strip null bytes + control chars
    return val.replace(/[\x00-\x1F\x7F]/g, '');
  }
  if (Array.isArray(val)) return val.map(sanitizeValue);
  if (val && typeof val === 'object') {
    const cleaned = {};
    for (const [k, v] of Object.entries(val)) {
      // Block Mongo operator injection
      if (k.startsWith('$') || k.includes('.')) continue;
      cleaned[k] = sanitizeValue(v);
    }
    return cleaned;
  }
  return val;
}

export function sanitizeInputs(req, res, next) {
  if (req.body) req.body = sanitizeValue(req.body);
  if (req.query) {
    for (const [k, v] of Object.entries(req.query)) req.query[k] = sanitizeValue(v);
  }
  if (req.params) {
    for (const [k, v] of Object.entries(req.params)) req.params[k] = sanitizeValue(v);
  }
  next();
}

// =====================================================================
// DEVICE TRACKING — fingerprint + binding
// =====================================================================
export function deviceFingerprint(req, res, next) {
  const ua = req.headers['user-agent'] || '';
  const accept = req.headers['accept-language'] || '';
  const ip = (req.headers['x-forwarded-for'] || req.ip || '').split(',')[0].trim();
  const fingerprint = crypto.createHash('sha256').update(`${ip}|${ua}|${accept}`).digest('hex').slice(0, 16);
  req.deviceFingerprint = fingerprint;
  req.clientIp = ip;
  next();
}

// =====================================================================
// WEBHOOK REPLAY GUARD — reject events older than 5 min
// =====================================================================
export function webhookReplayGuard(maxAgeSec = 300) {
  return (req, res, next) => {
    const ts = req.headers['x-ehb-timestamp'] || req.headers['stripe-timestamp'];
    if (!ts) return next(); // provider-specific check still happens in adapter
    const eventTime = parseInt(ts, 10);
    if (isNaN(eventTime)) return next();
    const ageSec = Math.floor(Date.now() / 1000) - eventTime;
    if (ageSec > maxAgeSec) {
      return res.status(400).json({ error: 'webhook_too_old', age_sec: ageSec, max_age_sec: maxAgeSec });
    }
    next();
  };
}

// =====================================================================
// SECURITY HEADERS — minimal set
// =====================================================================
export function securityHeaders(req, res, next) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');
  next();
}

export default {
  loginLimiter,
  signupLimiter,
  paymentLimiter,
  aiLimiter,
  webhookLimiter,
  apiLimiter,
  sanitizeInputs,
  deviceFingerprint,
  webhookReplayGuard,
  securityHeaders,
};
