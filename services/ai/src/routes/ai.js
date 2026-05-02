const { Router } = require('express');
const { invokeService, listServices } = require('../modules/registry');

const router = Router();

// Per-user/service daily quota (in-memory; Redis in production)
const FREE_QUOTA = Number(process.env.AI_FREE_DAILY_QUOTA || 3);
const quotaMap = new Map(); // key: "userId:service:YYYY-MM-DD" → count

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function quotaKey(userId, service) {
  return `${userId || 'anon'}:${service}:${todayKey()}`;
}

function incrementQuota(userId, service) {
  const k = quotaKey(userId, service);
  const n = (quotaMap.get(k) || 0) + 1;
  quotaMap.set(k, n);
  return n;
}

function getQuota(userId, service) {
  return quotaMap.get(quotaKey(userId, service)) || 0;
}

async function logInvocation(record) {
  // Fire-and-forget to API service to persist into MongoDB
  try {
    const apiUrl = process.env.API_SERVICE_URL || 'http://localhost:5000';
    await fetch(`${apiUrl}/api/dmo/ai-invocation-log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    });
  } catch {
    /* ignore — logging is best-effort */
  }
}

router.get('/services', (req, res) => {
  res.json({ services: listServices() });
});

router.get('/quota', (req, res) => {
  const userId = req.query.userId || 'anon';
  const all = {};
  for (const s of listServices()) {
    all[s.id] = { used: getQuota(userId, s.id), free: FREE_QUOTA };
  }
  res.json({ userId, date: todayKey(), quotas: all });
});

router.post('/:service', async (req, res, next) => {
  try {
    const { service } = req.params;
    const userId = req.headers['x-ehb-user'] || 'anon';

    // Quota check
    const used = getQuota(userId, service);
    if (used >= FREE_QUOTA) {
      return res.status(429).json({
        error: 'Free daily quota exhausted',
        service,
        quota: { used, free: FREE_QUOTA },
        note: 'Upgrade to paid tier (EHBGC) to continue. See /franchise for options.',
      });
    }

    const result = await invokeService(service, req.body || {});
    incrementQuota(userId, service);

    // Log invocation (best-effort)
    logInvocation({
      userId,
      service,
      input: req.body,
      output: result.output,
    });

    res.json({
      ...result,
      quota: { used: used + 1, free: FREE_QUOTA },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
