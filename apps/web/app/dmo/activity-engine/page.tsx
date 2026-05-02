'use client';

import { useState } from 'react';
import { DmoTopbar } from '@/components/dmo/topbar';
import { PlasticCard } from '@/components/ui/plastic-card';
import { KpiCard } from '@/components/ui/kpi-card';
import { Chip } from '@/components/ui/chip';

const MODULES = ['all', 'orders', 'franchise', 'ai', 'wallet', 'complaints', 'crb', 'pss'] as const;
type ModuleFilter = (typeof MODULES)[number];

const ACTIVITY = [
  { ts: '14:22:05', user: 'user-001', module: 'orders', action: 'order.placed', detail: 'ORD-DEMO-00042 · $180' },
  { ts: '14:20:12', user: 'dmo.manager', module: 'franchise', action: 'application.approved', detail: 'APP-1001 → EHB-PK-R1-P1-L3-045' },
  { ts: '14:18:44', user: 'user-018', module: 'ai', action: 'ai.invoked', detail: 'service=resume, confidence=0.87' },
  { ts: '14:15:02', user: 'user-007', module: 'wallet', action: 'wallet.lock', detail: '5,000 EHBGC for franchise' },
  { ts: '14:12:55', user: 'user-042', module: 'complaints', action: 'complaint.filed', detail: 'CMP-DEMO-0009 · tier 6' },
  { ts: '14:10:08', user: 'user-011', module: 'crb', action: 'crb.passed', detail: 'CRB-WMS-L5-MCQ · 82%' },
  { ts: '14:05:33', user: 'user-033', module: 'pss', action: 'pss.verified', detail: 'L3 ADVANCED auto-approved' },
  { ts: '14:02:19', user: 'user-008', module: 'orders', action: 'order.confirmed', detail: 'ORD-DEMO-00039 · $450 settled' },
  { ts: '13:58:47', user: 'user-022', module: 'ai', action: 'ai.invoked', detail: 'service=diagnosis, flagged' },
  { ts: '13:52:11', user: 'user-045', module: 'wallet', action: 'wallet.transfer', detail: '1,200 EHBGC → user-009' },
];

const COLORS: Record<string, string> = {
  orders: '#2BBFA0',
  franchise: '#7B6EF6',
  ai: '#ec4899',
  wallet: '#38C878',
  complaints: '#F05858',
  crb: '#F0A030',
  pss: '#3b82f6',
};

export default function ActivityEnginePage() {
  const [filter, setFilter] = useState<ModuleFilter>('all');
  const [window, setWindow] = useState<'24h' | '7d' | '30d'>('24h');

  const filtered = filter === 'all' ? ACTIVITY : ACTIVITY.filter((a) => a.module === filter);

  return (
    <>
      <DmoTopbar
        title="Activity Engine"
        subtitle="Live event feed · rolling windows · per-module filter"
        breadcrumb={['Intelligence', 'Activity']}
      />
      <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Events (last 1h)" value="1,284" tone="teal" icon="⚡" />
          <KpiCard label="Unique users" value="342" tone="purple" icon="👥" />
          <KpiCard label="AI invocations" value="156" tone="amber" icon="🤖" />
          <KpiCard label="Anomalies" value="4" delta="needs review" tone="fail" icon="⚠️" />
        </div>

        <PlasticCard className="p-0">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-glass px-4 py-3 sm:px-5 sm:py-4">
            <div className="flex flex-wrap gap-1.5">
              {MODULES.map((m) => (
                <button
                  key={m}
                  onClick={() => setFilter(m)}
                  className={`rounded-chip border px-2.5 py-1 text-[11px] capitalize ${
                    filter === m
                      ? 'border-purple-light bg-purple/20 text-white'
                      : 'border-glass text-white/60'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
            <div className="flex gap-1">
              {(['24h', '7d', '30d'] as const).map((w) => (
                <button
                  key={w}
                  onClick={() => setWindow(w)}
                  className={`rounded-chip border px-2.5 py-1 text-[11px] ${
                    window === w
                      ? 'border-teal bg-teal/20 text-white'
                      : 'border-glass text-white/60'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
          <ul className="divide-y divide-white/5">
            {filtered.map((a, i) => (
              <li key={i} className="flex items-start gap-3 p-3 sm:p-4">
                <div className="w-16 shrink-0 text-[11px] font-mono text-white/40">{a.ts}</div>
                <div
                  className="h-2 w-2 shrink-0 rounded-full mt-1.5"
                  style={{ background: COLORS[a.module] || '#888' }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Chip>{a.module}</Chip>
                    <span className="font-mono text-[11px] text-white/60">{a.action}</span>
                  </div>
                  <div className="mt-1 text-xs text-white/70">
                    <span className="text-white/50">by {a.user} — </span>
                    {a.detail}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </PlasticCard>
      </div>
    </>
  );
}
