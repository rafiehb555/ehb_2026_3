/**
 * AI Chat — Real LLM endpoint
 *
 * POST /api/ai/chat
 *
 * Body: { message, user_context?, ask?, model? }
 *
 * Flow:
 *   1. Try keyword intent classifier (fast)
 *   2. If asked or low confidence → call LLM
 *   3. 5s timeout, 1 retry
 *   4. Safe fallback if LLM unavailable
 *
 * Response:
 *   { intent, confidence, reply, source: 'keyword'|'llm'|'fallback', tokens?, model? }
 */

const { Router } = require('express');

const router = Router();

const TIMEOUT_MS = 5000;
const MAX_RETRIES = 1;

// =====================================================================
// Lightweight intent classifier (fast path)
// =====================================================================
const INTENT_KEYWORDS = {
  complaint: ['complaint', 'dispute', 'fraud', 'shikayat', 'refund'],
  apply: ['apply', 'application', 'franchise apply'],
  job: ['job', 'naukri', 'hire', 'career'],
  service: ['buy', 'order', 'service', 'product'],
  signup: ['signup', 'register', 'join'],
  kyc: ['verify', 'kyc', 'identity'],
  refill: ['refill', 'exam', 'crb', 'course'],
  wallet: ['wallet', 'balance', 'paisa', 'withdraw'],
  stl: ['stl', 'trust', 'level', 'score'],
  help: ['help', 'how', 'what is', 'kya hai'],
};

function classifyByKeyword(text) {
  if (!text) return null;
  const lower = text.toLowerCase();
  let best = { intent: null, hits: 0, matched: null };
  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
    let hits = 0;
    let firstMatch = null;
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        hits += 1;
        if (!firstMatch) firstMatch = kw;
      }
    }
    if (hits > best.hits) best = { intent, hits, matched: firstMatch };
  }
  if (!best.intent) return null;
  return {
    intent: best.intent,
    matched: best.matched,
    confidence: Math.min(0.5 + best.hits * 0.15, 0.95),
    source: 'keyword',
  };
}

// =====================================================================
// LLM call — OpenAI primary, with timeout + retry
// =====================================================================
async function callLLM({ message, user_context, ask = 'reply', model = null }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const sysPrompt = ask === 'classify_intent'
    ? `You are EHB's intent classifier. Given a user's message, return ONLY JSON:
{ "intent": "<one of: complaint|apply|job|service|signup|kyc|refill|wallet|stl|help|unknown>",
  "confidence": 0-1,
  "reply": "short helpful reply" }`
    : `You are EHB's helpful assistant. Be concise, friendly. Speak the user's language (Roman Urdu + English bilingual OK).
EHB context: 38 industries, 17 countries, STL trust system L1-L10. User context: ${JSON.stringify(user_context || {})}`;

  const body = {
    model: model || process.env.OPENAI_MODEL || 'gpt-4o-mini',
    messages: [
      { role: 'system', content: sysPrompt },
      { role: 'user', content: message },
    ],
    temperature: 0.3,
    max_tokens: 500,
  };

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const ctl = new AbortController();
      const t = setTimeout(() => ctl.abort(), TIMEOUT_MS);
      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify(body),
        signal: ctl.signal,
      });
      clearTimeout(t);
      if (!resp.ok) {
        if (resp.status === 429) await new Promise((r) => setTimeout(r, 1000));
        continue;
      }
      const data = await resp.json();
      const content = data.choices?.[0]?.message?.content || '';
      return {
        content,
        tokens: data.usage?.total_tokens || 0,
        model: data.model || body.model,
      };
    } catch (err) {
      if (attempt === MAX_RETRIES) {
        console.warn('[ai/chat] LLM call failed:', err.message);
        return null;
      }
    }
  }
  return null;
}

function safeFallback(message) {
  return {
    intent: 'unknown',
    confidence: 0,
    reply: "Sorry, mujhe abhi samajh nahi aaya. Aap likhain: 'help' for menu.",
    source: 'fallback',
  };
}

// =====================================================================
// Routes
// =====================================================================

/**
 * POST /api/ai/chat
 */
router.post('/chat', async (req, res) => {
  const { message, user_context, ask = 'reply', model } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'EHB-VALID-9001', message: 'Field required: message' });
  }

  // Step 1: Fast keyword classifier
  const keywordIntent = classifyByKeyword(message);

  // Step 2: If only intent classification asked AND high keyword confidence → return immediately
  if (ask === 'classify_intent' && keywordIntent && keywordIntent.confidence >= 0.7) {
    return res.json({
      intent: keywordIntent.intent,
      matched: keywordIntent.matched,
      confidence: keywordIntent.confidence,
      source: 'keyword',
      reply: null,
    });
  }

  // Step 3: Call LLM (real or stub)
  const llm = await callLLM({ message, user_context, ask, model });

  if (!llm) {
    // Fallback combines keyword (if any) + safe message
    const fb = safeFallback(message);
    return res.json({
      ...fb,
      ...(keywordIntent && { intent: keywordIntent.intent, confidence: keywordIntent.confidence, matched: keywordIntent.matched, source: 'keyword' }),
    });
  }

  // If LLM was asked to classify, parse JSON
  if (ask === 'classify_intent') {
    try {
      const parsed = JSON.parse(llm.content);
      return res.json({
        ...parsed,
        source: 'llm',
        tokens: llm.tokens,
        model: llm.model,
      });
    } catch {
      // Fall through to plain reply
    }
  }

  res.json({
    intent: keywordIntent?.intent || 'unknown',
    confidence: keywordIntent?.confidence || 0.5,
    matched: keywordIntent?.matched,
    reply: llm.content,
    source: 'llm',
    tokens: llm.tokens,
    model: llm.model,
  });
});

router.get('/chat/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ai-chat',
    has_openai_key: Boolean(process.env.OPENAI_API_KEY),
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    timeout_ms: TIMEOUT_MS,
    max_retries: MAX_RETRIES,
  });
});

module.exports = router;
