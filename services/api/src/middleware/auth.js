/**
 * EHB Auth Middleware — JWT-based authentication.
 *
 * Issues + verifies tokens. Adds password hashing, refresh tokens,
 * recent-auth checks for sensitive ops, and API keys for partners.
 *
 * Imports: ESM (matches services/api stack).
 */

import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const ACCESS_TTL = process.env.JWT_EXPIRES_IN || '24h';
const REFRESH_TTL = process.env.JWT_REFRESH_TTL || '30d';
const REAUTH_INTERVAL_MS = 60 * 60 * 1000; // 1h for sensitive actions

// =====================================================================
// Token issue + verify
// =====================================================================

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TTL });
}

export function issueAccessToken(user) {
  return jwt.sign({
    sub: user.id || user._id?.toString(),
    role: user.role,
    stl: user.stl?.level,
    bts: user.bts,
    country: user.country,
    iat: Math.floor(Date.now() / 1000),
  }, JWT_SECRET, { expiresIn: ACCESS_TTL });
}

export function issueRefreshToken(user) {
  return jwt.sign({
    sub: user.id || user._id?.toString(),
    type: 'refresh',
  }, JWT_SECRET, { expiresIn: REFRESH_TTL });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

// =====================================================================
// Middleware
// =====================================================================

export function requireAuth(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const payload = verifyToken(token);
    if (payload.type === 'refresh') {
      return res.status(401).json({ error: 'Refresh token cannot be used for access' });
    }
    req.user = {
      id: payload.sub,
      role: payload.role,
      stl: { level: payload.stl },
      bts: payload.bts,
      country: payload.country,
      tokenIssuedAt: (payload.iat || 0) * 1000,
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token', detail: err.message });
  }
}

/** Require RECENT auth (within REAUTH_INTERVAL_MS). For sensitive ops. */
export function requireRecentAuth(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Authentication required' });
  const tokenAge = Date.now() - (req.user.tokenIssuedAt || 0);
  if (tokenAge > REAUTH_INTERVAL_MS) {
    return res.status(401).json({
      error: 'Re-authentication required for this action',
      maxAgeMs: REAUTH_INTERVAL_MS,
      tokenAgeMs: tokenAge,
    });
  }
  next();
}

/** Optional auth — populates req.user if token present, ignores if not. */
export function optionalAuth(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return next();
  try {
    const payload = verifyToken(token);
    req.user = {
      id: payload.sub,
      role: payload.role,
      stl: { level: payload.stl },
      bts: payload.bts,
      country: payload.country,
      tokenIssuedAt: (payload.iat || 0) * 1000,
    };
  } catch {
    // Silent — invalid token treated as no auth
  }
  next();
}

/** RBAC — require one of the given roles. */
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden', required: roles });
    }
    next();
  };
}

// =====================================================================
// Password hashing
// =====================================================================

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
    .toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes(':')) return false;
  const [salt, hash] = storedHash.split(':');
  const computed = crypto
    .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
    .toString('hex');
  // Use timing-safe compare
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(computed, 'hex'));
}

// =====================================================================
// API key auth (for partners)
// =====================================================================

const apiKeys = new Map();

export function registerApiKey(partnerId, scopes = ['read']) {
  const key = `ehb_${crypto.randomBytes(24).toString('hex')}`;
  apiKeys.set(key, { partnerId, scopes, createdAt: new Date() });
  return key;
}

export function requireApiKey(requiredScope) {
  return (req, res, next) => {
    const key = req.headers['x-api-key'];
    if (!key) return res.status(401).json({ error: 'API key required' });
    const info = apiKeys.get(key);
    if (!info) return res.status(401).json({ error: 'Invalid API key' });
    if (requiredScope && !info.scopes.includes(requiredScope)) {
      return res.status(403).json({ error: `Scope required: ${requiredScope}` });
    }
    req.apiKey = info;
    next();
  };
}
