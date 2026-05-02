/**
 * STL Access Control Middleware
 *
 * Gates routes by minimum STL level.
 * Reads MIN_STL_PER_INDUSTRY from FLOW-SCHEMA.json.
 *
 * Usage:
 *   const stlGate = require('../middleware/stlGate');
 *
 *   // Require min STL 4 to access this route
 *   app.post('/api/orders', stlGate.requireSTL(4), handler);
 *
 *   // Industry-specific gate
 *   app.post('/api/listings/wms', stlGate.requireIndustry('WMS'), handler);
 *
 *   // Custom check
 *   app.post('/api/dmo/slash', stlGate.requireRole('DMO_Senior'), handler);
 */

const fs = require('fs');
const path = require('path');

// Canonical V2 schema only. v1 is deprecated (see FLOW-SCHEMA.json _deprecated flag).
const SCHEMA_PATH_V2 = path.join(
  __dirname,
  '../../../..',
  'ehb-info/5-specs/FLOW-SCHEMA-V2.json'
);

let schema;
try {
  schema = JSON.parse(fs.readFileSync(SCHEMA_PATH_V2, 'utf8'));
  if (schema._deprecated) {
    throw new Error('Loaded a deprecated schema. Use V2 only.');
  }
} catch (err) {
  console.error('[stlGate] Failed to load FLOW-SCHEMA-V2.json:', err.message);
  schema = { min_stl_per_industry: {}, industry_multipliers: {} };
}

const MIN_STL_PER_INDUSTRY = schema.min_stl_per_industry || {};

/**
 * Require minimum STL level.
 */
function requireSTL(minLevel) {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const userSTL = user.stl?.level || 0;
    if (userSTL < minLevel) {
      return res.status(403).json({
        error: 'Insufficient STL level',
        required: minLevel,
        current: userSTL,
        upgrade_path: `/stl?required=L${minLevel}`,
      });
    }

    next();
  };
}

/**
 * Require user STL ≥ industry minimum.
 */
function requireIndustry(industryCode) {
  const minSTL = MIN_STL_PER_INDUSTRY[industryCode] || 1;

  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const userSTL = user.stl?.level || 0;
    if (userSTL < minSTL) {
      return res.status(403).json({
        error: `Insufficient STL for ${industryCode}`,
        required: minSTL,
        current: userSTL,
        industry: industryCode,
        message: `${industryCode} requires STL L${minSTL}+. Your current STL is L${userSTL}.`,
        upgrade_path: `/stl?industry=${industryCode}`,
      });
    }

    next();
  };
}

/**
 * Require specific role (or higher).
 */
function requireRole(roleName) {
  const ROLE_HIERARCHY = {
    'GUEST': 0,
    'USER': 1,
    'BUYER': 2,
    'SELLER': 3,
    'SERVICE_PROVIDER': 3,
    'RIDER': 3,
    'INSPECTOR': 4,
    'EMPLOYER': 4,
    'JOB_SEEKER': 1,
    'PRODUCTION_CO': 5,
    'MICRO_FRANCHISE': 5,
    'SUB_FRANCHISE': 6,
    'CORPORATE_FRANCHISE': 7,
    'MASTER_FRANCHISE': 8,
    'COUNTRY_FRANCHISE': 9,
    'DMO_STAFF': 7,
    'PSS_OFFICER': 7,
    'CRB_OFFICER': 7,
    'DMO_SENIOR': 8,
    'DMO_COUNCIL': 9,
    'FOUNDER': 10,
  };

  const requiredLevel = ROLE_HIERARCHY[roleName] || 0;

  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const userLevel = ROLE_HIERARCHY[user.role] || 0;
    if (userLevel < requiredLevel) {
      return res.status(403).json({
        error: 'Insufficient role',
        required: roleName,
        current: user.role,
      });
    }

    next();
  };
}

/**
 * Require user has clean record (no recent slashes).
 */
function requireCleanRecord(daysSinceLastSlash = 30) {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const lastSlashDate = user.lastSlashDate ? new Date(user.lastSlashDate) : null;
    if (lastSlashDate) {
      const daysSince = (Date.now() - lastSlashDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSince < daysSinceLastSlash) {
        return res.status(403).json({
          error: 'Recent slashing event blocks this action',
          daysSinceSlash: Math.floor(daysSince),
          requiredCleanDays: daysSinceLastSlash,
        });
      }
    }

    next();
  };
}

/**
 * Require ALL conditions pass (composable).
 *
 * Usage:
 *   stlGate.all([
 *     stlGate.requireSTL(5),
 *     stlGate.requireIndustry('WMS'),
 *     stlGate.requireCleanRecord(30),
 *   ])
 */
function all(checks) {
  return (req, res, next) => {
    let i = 0;
    const runNext = () => {
      if (i >= checks.length) return next();
      const check = checks[i++];
      check(req, res, (err) => {
        if (err) return next(err);
        runNext();
      });
    };
    runNext();
  };
}

module.exports = {
  requireSTL,
  requireIndustry,
  requireRole,
  requireCleanRecord,
  all,
  MIN_STL_PER_INDUSTRY,
};
