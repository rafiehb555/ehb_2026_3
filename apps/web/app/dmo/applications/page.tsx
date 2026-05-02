'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { DmoTopbar } from '@/components/dmo/topbar';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';

const APP_TYPES = [
  { key: 'franchise', label: 'Franchise', icon: '🌐', href: '/dmo/approvals', color: '#7B6EF6', pending: 7, avgSla: '48h' },
  { key: 'crb', label: 'CRB cert', icon: '📜', href: '/dmo/crb', color: '#2BBFA0', pending: 12, avgSla: '72h' },
  { key: 'rider', label: 'Rider', icon: '🛵', href: '/dmo/riders', color: '#F0A030', pending: 5, avgSla: '24h' },
  { key: 'seller', label: 'Seller onboarding', icon: '🏪', href: '/dmo', color: '#ec4899', pending: 18, avgSla: '24h' },
  { key: 'inspector', label: 'Inspector', icon: '🔎', href: '/dmo', color: '#F05858', pending: 2, avgSla: '7d' },
  { key: 'employer', label: 'Employer posting', icon: '🧑‍💼', href: '/dmo', color: '#3b82f6', pending: 24, avgSla: '4h' },
];

const RECENT = [
  { id: 'APP-2001', type: 'franchise', user: 'Ahmed Raza', submittedAt: '2m ago', priority: 'high' },
  { id: 'APP-2002', type: 'crb', user: 'Bilal Khan', submittedAt: '14m ago', priority: 'medium' },
  { id: 'APP-2003', type: 'rider', user: 'Usman Ali', submittedAt: '32m ago', priority: 'medium' },
  { id: 'APP-2004', type: 'employer', user: 'Acme Corp', submittedAt: '1h ago', priority: 'low' },
  { id: 'APP-2005', type: 'inspector', user: 'Hamza Tariq', submittedAt: '2h ago', priority: 'high' },
  { id: 'APP-2006', type: 'seller', user: 'Fatima Sheikh', submittedAt: '3h ago', priority: 'medium' },
];

export default function ApplicationsPage() {
  const [filter, setFilter] = useState<string>('all');
  const filtered = useMemo(
    () => (filter === 'all' ? RECENT : RECENT.filter((r) => r.type === filter)),
    [filter]
  );
  const total = APP_TYPES.reduce((a, b) => a + b.pending, 0);

  return (
    <>
      <DmoTopbar
        title="Applications"
        subtitle="All inbound applications across EHB — master operator view"
        breadcrumb={['Operations', 'Applications']}
      />
      <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
        <PlasticCard className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <Chip tone="purple">6 types</Chip>
              <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{total} pending</h1>
              <p className="mt-1 text-sm text-white/60">
                Every inbound request — franchise, CRB, rider, seller, inspector, employer —
                routed to the right DMO manager based on type + region.
              </p>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-widest text-white/40">SLA breach</div>
              <div className="text-xl font-bold text-[#F05858] tabular-nums">2</div>
            </div>
          </div>
        </PlasticCard>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {APP_TYPES.map((t) => (
            <Link key={t.key} href={t.href}>
              <PlasticCard className="p-5 transition hover:border-purple-light">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{t.icon}</span>
                    <span className="text-sm font-semibold" style={{ color: t.color }}>
                      {t.label}
                    </span>
                  </div>
                  <Chip tone={t.pending > 15 ? 'fail' : t.pending > 5 ? 'warn' as any : 'ok'}>
                    {t.pending}
                  </Chip>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <div className="text-white/40">Pending</div>
                    <div className="text-lg font-bold tabular-nums">{t.pending}</div>
                  </div>
                  <div>
                    <div className="text-white/40">Avg SLA</div>
                    <div className="text-lg font-bold tabular-nums">{t.avgSla}</div>
                  </div>
                </div>
                <div className="mt-3 text-xs text-purple-light">Open queue →</div>
              </PlasticCard>
            </Link>
          ))}
        </div>

        <PlasticCard className="p-0">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-glass px-4 py-3 sm:px-5 sm:py-4">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                Unified feed
              </div>
              <h3 className="mt-1 text-sm font-semibold sm:text-lg">Recent submissions</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setFilter('all')}
                className={`rounded-chip border px-2.5 py-1 text-[11px] ${
                  filter === 'all'
                    ? 'border-purple-light bg-purple/20 text-white'
                    : 'border-glass text-white/60'
                }`}
              >
                all
              </button>
              {APP_TYPES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setFilter(t.key)}
                  className={`rounded-chip border px-2.5 py-1 text-[11px] capitalize ${
                    filter === t.key
                      ? 'border-purple-light bg-purple/20 text-white'
                      : 'border-glass text-white/60'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <ul className="divide-y divide-white/5">
            {filtered.map((r) => {
              const type = APP_TYPES.find((t) => t.key === r.type);
              return (
                <li key={r.id} className="flex items-center gap-3 p-4">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-card text-lg"
                    style={{ background: `${type?.color}22`, color: type?.color }}
                  >
                    {type?.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-[11px] text-white/50">{r.id}</span>
                      <Chip>{type?.label}</Chip>
                      <span className="text-[11px] text-white/40">{r.submittedAt}</span>
                    </div>
                    <div className="mt-1 text-sm font-semibold">{r.user}</div>
                  </div>
                  <Chip
                    tone={r.priority === 'high' ? 'fail' : r.priority === 'medium' ? 'warn' as any : 'default'}
                  >
                    {r.priority}
                  </Chip>
                </li>
              );
            })}
          </ul>
        </PlasticCard>
      </div>
    </>
  );
}
