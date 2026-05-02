'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { aiApi } from '@/lib/api-client';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';
import { Button3D } from '@/components/ui/button-3d';
import { StlBadge } from '@/components/ui/stl-badge';

// Per-service input forms — Phase 1 keeps them simple.
const FORM_CONFIG: Record<string, { placeholder: string; sampleInput: any; label: string }> = {
  lawyer: {
    label: 'Case description',
    placeholder:
      'Describe the legal situation: parties, jurisdiction, what happened, what you want.',
    sampleInput: {
      caseDescription:
        'Tenant in Islamabad hasn\'t paid rent for 3 months; landlord wants to evict. Lease is 1-year, still 4 months remaining.',
    },
  },
  diagnosis: {
    label: 'Symptoms + history',
    placeholder:
      'List symptoms, when they started, age, any existing conditions or medications.',
    sampleInput: {
      symptoms: ['persistent cough', 'low-grade fever', 'fatigue'],
      duration: '10 days',
      age: 35,
      history: 'No known chronic illness; vaccinated.',
    },
  },
  tutor: {
    label: 'Topic and current level',
    placeholder: 'What do you want to learn, and where are you now?',
    sampleInput: { topic: 'React hooks', currentLevel: 'beginner', goalHours: 20 },
  },
  resume: {
    label: 'JPS profile JSON',
    placeholder: 'Paste your profile: name, skills, experience.',
    sampleInput: {
      name: 'Ahmed Raza',
      targetRole: 'Full-stack Engineer',
      skills: ['Node.js', 'React', 'MongoDB', 'TypeScript'],
      experience: [
        { company: 'XYZ Tech', role: 'Backend Engineer', years: 2 },
        { company: 'ABC Systems', role: 'Intern', years: 1 },
      ],
    },
  },
  business: {
    label: 'Business question',
    placeholder: 'Describe your SME situation and the decision you\'re facing.',
    sampleInput: {
      businessStage: 'early growth',
      question:
        'My online clothing store has 50 orders/day at 15% margin. Should I invest in my own warehouse or stick with 3PL?',
    },
  },
  fraud: {
    label: 'Transaction data',
    placeholder: 'Paste transaction fields for risk analysis.',
    sampleInput: {
      amountUsd: 5800,
      hoursSinceSignup: 6,
      country: 'PK',
      ipRiskScore: 0.78,
      deviceNew: true,
    },
  },
  recommend: {
    label: 'User context',
    placeholder: 'What should we recommend?',
    sampleInput: {
      context: 'Looking for AI services to grow a small online business in Pakistan',
    },
  },
};

export default function AiServicePage() {
  const params = useParams<{ service: string }>();
  const service = params?.service ?? '';
  const cfg = FORM_CONFIG[service] || {
    label: 'Input',
    placeholder: 'Describe your input…',
    sampleInput: {},
  };

  const [services, setServices] = useState<any[]>([]);
  const [input, setInput] = useState(JSON.stringify(cfg.sampleInput, null, 2));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    aiApi.get('/api/ai/services').then((r: any) => setServices(r.services || [])).catch(() => {});
  }, []);

  const svc = services.find((s) => s.id === service);

  async function invoke() {
    setLoading(true);
    setResult(null);
    try {
      let payload: any;
      try {
        payload = JSON.parse(input);
      } catch {
        payload = { text: input };
      }
      const res = await aiApi.post(`/api/ai/${service}`, payload);
      setResult(res);
      setHistory((h) => [{ ts: Date.now(), res, payload }, ...h].slice(0, 5));
    } catch (e: any) {
      setResult({ error: e?.message || 'Invocation failed' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen py-6 sm:py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Link href="/ai-marketplace" className="text-xs text-white/50 hover:text-white">
          ← All AI services
        </Link>

        <PlasticCard className="mt-4 p-5 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4">
            <div className="min-w-0 flex-1">
              <Chip tone="amber">AI Services Marketplace</Chip>
              <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
                {svc?.displayName || service.toUpperCase()}
              </h1>
              <p className="mt-2 text-xs text-white/60 sm:text-sm">
                {svc?.desc || 'Configure input below and invoke.'}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {svc ? <StlBadge level={svc.stlMin} size="xs" /> : null}
              {svc ? <Chip tone="purple">{svc.model}</Chip> : null}
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:mt-6 lg:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium text-white/70">{cfg.label}</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={12}
                placeholder={cfg.placeholder}
                className="w-full resize-none rounded-input border border-glass bg-nested px-3 py-2 font-mono text-xs outline-none ring-purple/40 focus:ring-2"
              />
              <div className="mt-3 flex items-center justify-between">
                <button
                  onClick={() => setInput(JSON.stringify(cfg.sampleInput, null, 2))}
                  className="text-xs text-white/50 hover:text-white"
                >
                  ↺ Reset to sample
                </button>
                <Button3D onClick={invoke} disabled={loading} variant="amber">
                  {loading ? 'Invoking…' : `Invoke ${svc?.displayName || service}`}
                </Button3D>
              </div>
            </div>

            <div className="rounded-card border border-glass bg-nested p-4">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-widest text-white/40">Response</div>
                {result?.output?.confidence ? (
                  <Chip tone="ok">
                    confidence {(result.output.confidence * 100).toFixed(0)}%
                  </Chip>
                ) : null}
              </div>
              <div className="mt-3 min-h-[220px] text-sm">
                {!result ? (
                  <div className="text-white/40">
                    Invoke to see the AI response. Without an OpenAI key, you'll see a deterministic
                    stub — still validates end-to-end routing.
                  </div>
                ) : result.error ? (
                  <div className="rounded-input border border-[#F05858]/40 bg-[#F05858]/10 p-3 text-xs text-[#F05858]">
                    {result.error}
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap text-white/85">
                    {result.output?.text || '(empty response)'}
                  </div>
                )}
              </div>
              {result?.output?.disclaimer ? (
                <div className="mt-4 rounded-input border border-amber/30 bg-amber/5 px-3 py-2 text-[11px] text-amber">
                  ⚠ {result.output.disclaimer}
                </div>
              ) : null}
              {result?.output?.meta ? (
                <div className="mt-3 flex flex-wrap gap-2 text-[10px] text-white/40">
                  <span>model: {result.output.meta.model}</span>
                  <span>· latency {result.output.meta.latencyMs}ms</span>
                  {result.output.meta.tokensUsed ? (
                    <span>· {result.output.meta.tokensUsed} tokens</span>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </PlasticCard>

        {history.length ? (
          <PlasticCard className="mt-6 p-5">
            <div className="text-xs uppercase tracking-widest text-white/40">Your invocations</div>
            <ul className="mt-3 divide-y divide-white/5">
              {history.map((h) => (
                <li key={h.ts} className="py-2 text-xs">
                  <span className="text-white/50">
                    {new Date(h.ts).toLocaleTimeString()} —{' '}
                  </span>
                  <span className="text-white/70">
                    {(h.res?.output?.text || '(error)').slice(0, 140)}…
                  </span>
                </li>
              ))}
            </ul>
          </PlasticCard>
        ) : null}
      </div>
    </main>
  );
}
