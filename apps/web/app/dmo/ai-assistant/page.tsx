'use client';

import { useEffect, useState } from 'react';
import { aiApi } from '@/lib/api-client';
import { DmoTopbar } from '@/components/dmo/topbar';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';
import { Button3D } from '@/components/ui/button-3d';

// Phase 1 demo — invocation stats are synthesized client-side
const demoStats = [
  { id: 'resume', name: 'AI Resume Builder', today: 42, week: 280, downs: 2 },
  { id: 'tutor', name: 'AI Tutor', today: 28, week: 184, downs: 0 },
  { id: 'recommend', name: 'AI Recommendation', today: 21, week: 152, downs: 1 },
  { id: 'business', name: 'AI Business Advisor', today: 15, week: 96, downs: 0 },
  { id: 'diagnosis', name: 'AI Diagnosis', today: 12, week: 64, downs: 3 },
  { id: 'lawyer', name: 'AI Lawyer', today: 7, week: 40, downs: 1 },
  { id: 'fraud', name: 'AI Fraud Detector', today: 3, week: 19, downs: 0 },
];

const flaggedDemo = [
  { id: 'inv-401', service: 'diagnosis', reason: 'No disclaimer shown', ago: '5m' },
  { id: 'inv-388', service: 'lawyer', reason: 'Hallucinated case law', ago: '22m' },
  { id: 'inv-372', service: 'diagnosis', reason: 'Patient reported wrong severity', ago: '1h' },
];

export default function AiAssistantOpsPage() {
  const [health, setHealth] = useState<any>(null);

  useEffect(() => {
    aiApi.get('/api/health').then(setHealth).catch(() => setHealth({ error: true }));
  }, []);

  const totalToday = demoStats.reduce((a, b) => a + b.today, 0);
  const totalWeek = demoStats.reduce((a, b) => a + b.week, 0);
  const totalFlags = demoStats.reduce((a, b) => a + b.downs, 0);

  return (
    <>
      <DmoTopbar
        title="AI Assistant · Ops Panel"
        subtitle="Invocation stats, flagged responses, retraining queue"
        breadcrumb={['Intelligence', 'AI Assistant']}
      />
      <div className="grid gap-4 p-4 sm:gap-6 sm:p-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          {/* Totals */}
          <div className="grid gap-4 sm:grid-cols-3">
            <PlasticCard className="p-5">
              <div className="text-xs uppercase tracking-widest text-white/40">Today</div>
              <div className="mt-2 text-3xl font-bold tabular-nums">{totalToday}</div>
              <div className="mt-1 text-xs text-teal">invocations</div>
            </PlasticCard>
            <PlasticCard className="p-5">
              <div className="text-xs uppercase tracking-widest text-white/40">This week</div>
              <div className="mt-2 text-3xl font-bold tabular-nums">{totalWeek}</div>
              <div className="mt-1 text-xs text-purple-light">rolling 7d</div>
            </PlasticCard>
            <PlasticCard className="p-5">
              <div className="text-xs uppercase tracking-widest text-white/40">Flagged</div>
              <div className="mt-2 text-3xl font-bold tabular-nums">{totalFlags}</div>
              <div className="mt-1 text-xs text-[#F05858]">need review</div>
            </PlasticCard>
          </div>

          <PlasticCard className="p-0">
            <div className="flex items-center justify-between border-b border-glass px-5 py-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/40">Per service</div>
                <h3 className="mt-1 text-lg font-semibold">Invocation breakdown</h3>
              </div>
              <Chip tone="purple">7 services</Chip>
            </div>
            <div className="overflow-x-auto"><table className="w-full min-w-[520px] text-left text-sm">
              <thead className="text-[11px] uppercase text-white/40">
                <tr>
                  <th className="px-5 py-3">Service</th>
                  <th className="px-5 py-3 text-right">Today</th>
                  <th className="px-5 py-3 text-right">Week</th>
                  <th className="px-5 py-3 text-right">👎</th>
                  <th className="px-5 py-3">Health</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {demoStats.map((s) => (
                  <tr key={s.id}>
                    <td className="px-5 py-3 font-semibold">{s.name}</td>
                    <td className="px-5 py-3 text-right tabular-nums">{s.today}</td>
                    <td className="px-5 py-3 text-right tabular-nums">{s.week}</td>
                    <td className="px-5 py-3 text-right tabular-nums">
                      {s.downs ? <Chip tone="fail">{s.downs}</Chip> : <span className="text-white/30">0</span>}
                    </td>
                    <td className="px-5 py-3">
                      <Chip tone={s.downs > 2 ? 'warn' : 'ok'}>
                        {s.downs > 2 ? 'watch' : 'healthy'}
                      </Chip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table></div>
          </PlasticCard>
        </div>

        {/* Side: flagged queue + health */}
        <div className="space-y-6">
          <PlasticCard className="p-5">
            <div className="text-xs uppercase tracking-widest text-white/40">AI service health</div>
            <h3 className="mt-1 text-sm font-semibold">services/ai @ :8080</h3>
            <div className="mt-3 space-y-1 text-xs">
              {!health ? (
                <span className="text-white/40">Checking…</span>
              ) : health.error ? (
                <Chip tone="fail">unreachable</Chip>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-white/50">Status</span>
                    <Chip tone="ok">{health.status}</Chip>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">OpenAI key</span>
                    <Chip tone={health.openaiConfigured ? 'ok' : 'warn'}>
                      {health.openaiConfigured ? 'configured' : 'stub mode'}
                    </Chip>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Uptime</span>
                    <span>{health.uptimeSec}s</span>
                  </div>
                </>
              )}
            </div>
          </PlasticCard>

          <PlasticCard className="p-5">
            <div className="text-xs uppercase tracking-widest text-white/40">Flagged queue</div>
            <h3 className="mt-1 text-sm font-semibold">Review + retrain candidates</h3>
            <ul className="mt-3 space-y-2 text-xs">
              {flaggedDemo.map((f) => (
                <li
                  key={f.id}
                  className="flex items-start justify-between rounded-card border border-glass bg-nested/60 p-3"
                >
                  <div>
                    <div className="font-mono text-[10px] text-white/40">{f.id}</div>
                    <div className="mt-0.5 font-medium text-white/80">{f.service}</div>
                    <div className="mt-1 text-white/60">{f.reason}</div>
                  </div>
                  <div className="text-[10px] text-white/40">{f.ago}</div>
                </li>
              ))}
            </ul>
            <Button3D size="sm" variant="blue" className="mt-4 w-full">
              Export for retraining
            </Button3D>
          </PlasticCard>
        </div>
      </div>
    </>
  );
}
