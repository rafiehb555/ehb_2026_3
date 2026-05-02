/**
 * EHB AI Core Entry Point — POST /api/ai/route
 *
 * The single entry where any user message hits the platform.
 * Detects intent → routes to the correct subsystem.
 *
 * Flow: User → AI Route → Intent → Next Step
 *
 * Intents detected:
 *   - apply       (franchise / DMO officer / job application)
 *   - complaint   (file dispute, report issue)
 *   - service     (find service, list service, browse industries)
 *   - job         (job search / post / apply)
 *   - signup      (new user)
 *   - kyc         (verification, identity)
 *   - refill      (CRB refill, exam, certification)
 *   - wallet      (balance, lock, withdraw)
 *   - help        (general support)
 *   - unknown     (fallback to AI proxy)
 */

import { Router } from 'express';
import { optionalAuth } from '../middleware/auth.js';
import { metrics } from '../middleware/metrics.js';

const router = Router();

// =====================================================================
// Intent rules — keyword-based fast path
// =====================================================================

const INTENT_RULES = [
  {
    intent: 'complaint',
    keywords: ['complaint', 'dispute', 'fraud', 'scam', 'refund', 'cheat', 'stolen', 'shikayat', 'shikaayat'],
    next: { route: '/help/dispute', module: 'dmo', action: 'open_complaint_form' },
  },
  {
    intent: 'apply',
    keywords: ['apply', 'application', 'become franchise', 'register franchise', 'franchise apply', 'apply karna', 'application dena'],
    next: { route: '/franchise/apply', module: 'franchise', action: 'open_application' },
  },
  {
    intent: 'job',
    keywords: ['job', 'jobs', 'employment', 'career', 'naukri', 'kaam', 'hire', 'employer'],
    next: { route: '/jobs', module: 'jps', action: 'browse_or_post' },
  },
  {
    intent: 'service',
    keywords: ['service', 'find', 'buy', 'order', 'product', 'sell', 'list', 'industry', 'industries'],
    next: { route: '/industries', module: 'gosellr', action: 'browse_industries' },
  },
  {
    intent: 'signup',
    keywords: ['signup', 'sign up', 'register', 'create account', 'new user', 'join'],
    next: { route: '/signup', module: 'auth', action: 'register' },
  },
  {
    intent: 'kyc',
    keywords: ['kyc', 'verify', 'verification', 'identity', 'pss', 'pehchaan'],
    next: { route: '/onboarding', module: 'pss', action: 'start_verification' },
  },
  {
    intent: 'refill',
    keywords: ['refill', 'exam', 'certification', 'crb', 'course', 'semester'],
    next: { route: '/crb/exams', module: 'crb', action: 'view_refill_status' },
  },
  {
    intent: 'wallet',
    keywords: ['wallet', 'balance', 'money', 'paisa', 'withdraw', 'deposit', 'lock', 'ehbgc'],
    next: { route: '/wallet', module: 'wallet', action: 'view_wallet' },
  },
  {
    intent: 'stl',
    keywords: ['stl', 'trust', 'level', 'score', 'badge'],
    next: { route: '/stl', module: 'stl', action: 'view_score' },
  },
  {
    intent: 'help',
    keywords: ['help', 'how', 'what is', 'kya hai', 'kya hota', 'samjhao', 'support'],
    next: { route: '/concepts', module: 'support', action: 'show_help' },
  },
];

// =====================================================================
// Detect intent from user input
// =====================================================================

function detectIntent(text) {
  if (!text || typeof text !== 'string') return null;
  const lower = text.toLowerCase().trim();
  if (lower.length < 2) return null;

  // Multi-keyword scoring → confidence
  const scores = INTENT_RULES.map((rule) => {
    let hits = 0;
    let firstMatch = null;
    for (const kw of rule.keywords) {
      if (lower.includes(kw)) {
        hits += 1;
        if (!firstMatch) firstMatch = kw;
      }
    }
    return { rule, hits, firstMatch };
  }).filter((s) => s.hits > 0);

  if (scores.length === 0) return null;

  // Best by hits; tie-broken by keyword length (longer = more specific)
  scores.sort((a, b) => {
    if (b.hits !== a.hits) return b.hits - a.hits;
    return (b.firstMatch?.length || 0) - (a.firstMatch?.length || 0);
  });

  const best = scores[0];
  const totalHits = scores.reduce((s, x) => s + x.hits, 0);
  const confidence = Math.min(0.5 + best.hits / Math.max(totalHits, 1) * 0.5, 0.99);

  return {
    intent: best.rule.intent,
    matched: best.firstMatch,
    confidence: Number(confidence.toFixed(2)),
    candidates: scores.length,
    ...best.rule.next,
  };
}

/**
 * Fallback to upstream AI service (LLM) for free-form inputs.
 * Calls AI_SERVICE_URL/api/ai/chat with the user's text + intent context.
 */
async function llmFallback(text, user) {
  const url = (process.env.AI_SERVICE_URL || 'http://localhost:8080') + '/api/ai/chat';
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: text,
        user_context: user ? { id: user.id, stl: user.stl, role: user.role } : null,
        ask: 'classify_intent',
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!resp.ok) return null;
    return await resp.json();
  } catch (err) {
    console.warn('[ai-core] LLM fallback unavailable:', err.message);
    return null;
  }
}

// =====================================================================
// Personalize next-step based on user state
// =====================================================================

function personalizeForUser(intent, user) {
  if (!user) {
    // Guest user — push to signup before most flows
    if (intent.intent !== 'help' && intent.intent !== 'service' && intent.intent !== 'signup') {
      return {
        ...intent,
        gate: 'auth_required',
        suggested_first: { route: '/signup', reason: 'Sign up to access this' },
      };
    }
    return intent;
  }

  const stl = user.stl?.level || 0;
  const pssLevel = user.pssLevel || 0;

  // Gate: certain intents need min PSS or STL
  if (intent.intent === 'apply' && pssLevel < 3) {
    return {
      ...intent,
      gate: 'pss_required',
      suggested_first: { route: '/onboarding', reason: 'Complete PSS L3 (KYC) before applying' },
    };
  }
  if (intent.intent === 'service' && intent.module === 'gosellr' && stl < 1) {
    return {
      ...intent,
      gate: 'stl_required',
      suggested_first: { route: '/stl', reason: 'Build STL L1 to transact' },
    };
  }

  return intent;
}

// =====================================================================
// Routes
// =====================================================================

/**
 * POST /api/ai/route
 *
 * Body: { text: "user message" }
 *
 * Response: {
 *   intent: "complaint" | "apply" | ...,
 *   matched: "keyword that matched",
 *   route: "/help/dispute",
 *   module: "dmo",
 *   action: "open_complaint_form",
 *   gate?: "auth_required" | "pss_required" | "stl_required",
 *   suggested_first?: { route, reason },
 *   user_context?: { id, stl, pss }
 * }
 */
router.post('/route', optionalAuth, async (req, res) => {
  const { text } = req.body || {};

  if (!text) {
    return res.status(400).json({
      error: 'EHB-VALID-9001',
      message: 'Field required: text',
    });
  }

  let detected = detectIntent(text);

  // If keyword detection low confidence (<0.6) or no match → try LLM fallback
  if (!detected || detected.confidence < 0.6) {
    metrics.aiLlmFallback();
    const llm = await llmFallback(text, req.user);
    if (llm && llm.intent) {
      detected = {
        intent: llm.intent,
        matched: llm.matched || 'llm',
        confidence: llm.confidence || 0.7,
        source: 'llm',
        ...(INTENT_RULES.find((r) => r.intent === llm.intent)?.next || {}),
      };
    }
  }

  if (detected) {
    metrics.aiIntent(detected.intent, detected.source || 'keyword');
  }

  if (!detected) {
    // Final fallback — frontend should escalate to chat UI
    return res.json({
      intent: 'unknown',
      confidence: 0,
      route: null,
      module: null,
      action: 'escalate_to_llm',
      hint: 'No keyword match + LLM unavailable. Forward to chat UI.',
      escalate_endpoint: '/api/ai/chat',
      user_context: req.user ? { id: req.user.id, stl: req.user.stl, role: req.user.role } : null,
    });
  }

  const personalized = personalizeForUser(detected, req.user);

  return res.json({
    ...personalized,
    user_context: req.user ? { id: req.user.id, stl: req.user.stl, role: req.user.role } : null,
    timestamp: new Date().toISOString(),
  });
});

/**
 * GET /api/ai/intents
 *
 * Lists all supported intents (for client autocomplete + docs).
 */
router.get('/intents', (req, res) => {
  res.json({
    intents: INTENT_RULES.map((r) => ({
      intent: r.intent,
      keywords: r.keywords,
      route: r.next.route,
      module: r.next.module,
    })),
    fallback: 'unknown → escalates to LLM via /api/ai/chat',
  });
});

/**
 * GET /api/ai/health
 *
 * Health check for the AI Core entry layer.
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ai-core-entry',
    intents_count: INTENT_RULES.length,
    upstream_ai_service: process.env.AI_SERVICE_URL || 'http://localhost:8080',
  });
});

export default router;
export { detectIntent, personalizeForUser, INTENT_RULES };
