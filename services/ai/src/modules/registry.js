// EHB AI Services Registry — 7 flagship modules (Phase 1).
// All services fall back to a deterministic stub when OPENAI_API_KEY is missing.

const OpenAI = require('openai');

const hasKey = Boolean(process.env.OPENAI_API_KEY);
const openai = hasKey ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

const SERVICES = {
  lawyer: {
    id: 'lawyer',
    displayName: 'AI Lawyer',
    industry: 'OLS',
    desc: 'Legal case triage, document drafting, risk analysis.',
    stlMin: 5,
    model: 'gpt-4',
    systemPrompt:
      'You are AI Lawyer for EHB. Triage the user case in 3 sections: (1) classification, (2) risk probability 0-1, (3) next 3 steps. Always end with: "This is not legal advice. Consult a licensed lawyer."',
    disclaimer: 'This is not legal advice. Consult a licensed lawyer.',
  },
  diagnosis: {
    id: 'diagnosis',
    displayName: 'AI Diagnosis',
    industry: 'WMS',
    desc: 'Symptom-based prediction with referral guidance.',
    stlMin: 5,
    model: 'gpt-4',
    systemPrompt:
      'You are AI Diagnosis for EHB. Given symptoms, return: (1) top 3 possible conditions with probabilities, (2) severity (mild/moderate/severe/emergency), (3) recommended next step. Always end with: "This is informational only. Please consult a qualified doctor."',
    disclaimer: 'This is informational only. Please consult a qualified doctor.',
  },
  tutor: {
    id: 'tutor',
    displayName: 'AI Tutor',
    industry: 'HPS',
    desc: 'Adaptive study plans, topic explanations, practice.',
    stlMin: 3,
    model: 'gpt-3.5-turbo',
    systemPrompt:
      'You are AI Tutor for EHB. Given a topic and level, produce a 5-step study plan, 3 practice questions, and 2 common mistakes to avoid.',
    disclaimer: 'AI-generated study material. Verify with your curriculum.',
  },
  resume: {
    id: 'resume',
    displayName: 'AI Resume Builder',
    industry: 'JPS',
    desc: 'CV generation from JPS profile data.',
    stlMin: 3,
    model: 'gpt-3.5-turbo',
    systemPrompt:
      'You are AI Resume Builder for EHB. Convert the JPS profile into a concise, well-formatted CV with sections: Summary, Skills, Experience, Education.',
    disclaimer: 'AI-generated draft. Review before sending to employers.',
  },
  business: {
    id: 'business',
    displayName: 'AI Business Advisor',
    industry: 'GoSellr',
    desc: 'SME consulting, pricing, inventory optimization.',
    stlMin: 4,
    model: 'gpt-3.5-turbo',
    systemPrompt:
      'You are AI Business Advisor for EHB. Answer the SME question in 4 parts: (1) diagnosis, (2) 3 actions this week, (3) risk watch, (4) KPI to track.',
    disclaimer: 'Advisory only. Not financial or tax advice.',
  },
  fraud: {
    id: 'fraud',
    displayName: 'AI Fraud Detector',
    industry: 'DMO',
    desc: 'Transaction anomaly + review abuse detection.',
    stlMin: 5,
    model: 'gpt-3.5-turbo',
    systemPrompt:
      'You are AI Fraud Detector for EHB. Return a risk score 0-1, top 3 red flags, and recommendation (approve/review/block).',
    disclaimer: 'Advisory signal only — DMO operator must confirm action.',
  },
  recommend: {
    id: 'recommend',
    displayName: 'AI Recommendation',
    industry: 'Cross',
    desc: 'Personalized product/service/job suggestions.',
    stlMin: 3,
    model: 'gpt-3.5-turbo',
    systemPrompt:
      'You are AI Recommendation for EHB. Based on the context, return 5 ranked suggestions with a 1-line rationale each.',
    disclaimer: 'Recommendations are suggestions, not endorsements.',
  },
};

function listServices() {
  return Object.values(SERVICES).map((s) => ({
    id: s.id,
    displayName: s.displayName,
    industry: s.industry,
    desc: s.desc,
    stlMin: s.stlMin,
    model: s.model,
  }));
}

async function invokeService(serviceId, input) {
  const svc = SERVICES[serviceId];
  if (!svc) {
    const err = new Error(`Unknown AI service: ${serviceId}`);
    err.status = 404;
    throw err;
  }

  const userPayload = JSON.stringify(input);
  const started = Date.now();

  if (!openai) {
    // Stub mode — deterministic echo for local dev without a key
    return {
      service: svc.id,
      output: {
        text: `[STUB ${svc.displayName}] Received input: ${userPayload}. Connect OPENAI_API_KEY in .env for real responses.`,
        confidence: 0.5,
        disclaimer: svc.disclaimer,
        meta: { model: 'stub', latencyMs: Date.now() - started },
      },
    };
  }

  const completion = await openai.chat.completions.create({
    model: svc.model,
    messages: [
      { role: 'system', content: svc.systemPrompt },
      { role: 'user', content: userPayload },
    ],
    temperature: 0.4,
  });

  const text = completion.choices?.[0]?.message?.content || '';
  return {
    service: svc.id,
    output: {
      text,
      confidence: 0.85,
      disclaimer: svc.disclaimer,
      meta: {
        model: svc.model,
        latencyMs: Date.now() - started,
        tokensUsed: completion.usage?.total_tokens,
      },
    },
  };
}

module.exports = { listServices, invokeService };
