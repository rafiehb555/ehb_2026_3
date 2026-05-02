'use client';

import { useMemo, useState } from 'react';
import { DmoTopbar } from '@/components/dmo/topbar';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';
import { StlBadge } from '@/components/ui/stl-badge';
import { Button3D } from '@/components/ui/button-3d';

const SIGNAL_SOURCES = [
  { key: 'pss', label: 'PSS', icon: '🛡️', color: '#7B6EF6', live: 42, flags: 3 },
  { key: 'crb', label: 'CRB', icon: '📜', color: '#2BBFA0', live: 28, flags: 1 },
  { key: 'dmo', label: 'DMO', icon: '🏛️', color: '#F0A030', live: 67, flags: 2 },
  { key: 'wallet', label: 'Wallet', icon: '💰', color: '#38C878', live: 184, flags: 5 },
  { key: 'complaint', label: 'Complaints', icon: '⚠️', color: '#F05858', live: 12, flags: 8 },
  { key: 'ai', label: 'AI Fraud', icon: '🤖', color: '#ec4899', live: 156, flags: 4 },
];

const DEMO_ALERTS = [
  { id: 'A-1001', severity: 'critical', source: 'ai', user: 'user-042', msg: 'Unusual withdrawal pattern — 5× usual in last hour', ago: '2m', status: 'new' },
  { id: 'A-1002', severity: 'warn', source: 'pss', user: 'user-018', msg: 'Doc image tampering detected by OCR', ago: '15m', status: 'escalated' },
  { id: 'A-1003', severity: 'warn', source: 'wallet', user: 'user-007', msg: 'Chargeback rate >2% — 3 in last 7 days', ago: '34m', status: 'reviewing' },
  { id: 'A-1004', severity: 'info', source: 'dmo', user: 'user-033', msg: '30-day streak achieved — +5 DMO bonus applied', ago: '1h', status: 'auto-resolved' },
  { id: 'A-1005', severity: 'critical', source: 'complaint', user: 'user-022', msg: 'Tier 6 fraud complaint filed against', ago: '1h', status: 'new' },
  { id: 'A-1006', severity: 'warn', source: 'ai', user: 'user-045', msg: 'Fake review cluster detected (5 accounts)', ago: '2h', status: 'reviewing' },
  { id: 'A-1007', severity: 'info', source: 'crb', user: 'user-011', msg: 'CRB refill due in 28 days', ago: '3h', status: 'notified' },
];

const STREAKS = [
  { user: 'user-001 Ahmed Raza', streak: 45, bonus: '+5 DMO' },
  { user: 'user-003 Bilal Khan', streak: 32, bonus: '+5 DMO' },
  { user: 'user-007 Hamza Tariq', streak: 21, bonus: 'pending at 30d' },
];

export default function UpGuardPage() {
  const [filter, setFilter] = useState<'all' | 'critical' | 'warn' | 'info'>('all');
  const filtered = useMemo(
    () => (filter === 'all' ? DEMO_ALERTS : DEMO_ALERTS.filter((a) => a.severity === filter)),
    [filter]
  );

  return (
    <>
      <DmoTopbar
        title="Up-Guard"
        subtitle="Continuous monitoring — live signals across PSS + CRB + DMO + Wallet + AI"
        breadcrumb={['Verification', 'Up-Guard']}
      />
      <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
        {/* Hero */}
        <PlasticCard className="p-5 sm:p-6">
          <div className="flex flex-wrap items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-card bg-gradient-to-br from-[#F05858] to-[#C03030] text-4xl shadow-2xl">
              👁️
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Chip tone="fail">
                  <span className="mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#F05858]" />
                  LIVE
                </Chip>
                <Chip>6 signal sources</Chip>
                <Chip tone="warn">23 open alerts</Chip>
              </div>
              <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Continuous Monitoring Layer</h1>
              <p className="mt-2 text-sm text-white/70">
                Up-Guard fuses signals from all verification + ops systems into a real-time
                anomaly feed. AI Fraud Detector (DMO module) surfaces patterns; human operators
                action via escalation queue.
              </p>
            </div>
          </div>
        </PlasticCard>

        {/* Signal source grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {SIGNAL_SOURCES.map((s) => (
            <PlasticCard key={s.key} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{s.icon}</span>
                  <span className="text-sm font-semibold" style={{ color: s.color }}>
                    {s.label}
                  </span>
                </div>
                {s.flags > 0 ? (
                  <Chip tone="fail">{s.flags} flags</Chip>
                ) : (
                  <Chip tone="ok">clean</Chip>
                )}
              </div>
              <div className="mt-3 text-xs text-white/50">Signals (last hour)</div>
              <div className="mt-1 text-2xl font-bold tabular-nums">{s.live}</div>
              <div
                className="mt-2 h-1 rounded-chip"
                style={{
                  background: `linear-gradient(to right, ${s.color}, ${s.color}33)`,
                  width: `${Math.min(100, s.live)}%`,
                }}
              />
            </PlasticCard>
          ))}
        </div>

        {/* Alerts feed + streaks sidebar */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_340px]">
          <PlasticCard className="p-0">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-glass px-4 py-3 sm:px-5 sm:py-4">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                  Live alerts feed
                </div>
                <h3 className="mt-1 text-sm font-semibold sm:text-lg">
                  {filtered.length} events · auto-refreshing
                </h3>
              </div>
              <div className="flex gap-1.5">
                {(['all', 'critical', 'warn', 'info'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`rounded-chip border px-2.5 py-1 text-[11px] capitalize ${
                      filter === f
                        ? 'border-purple-light bg-purple/20 text-white'
                        : 'border-glass text-white/60'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <ul className="divide-y divide-white/5">
              {filtered.map((a) => {
                const source = SIGNAL_SOURCES.find((s) => s.key === a.source);
                return (
                  <li key={a.id} className="flex items-start gap-3 p-4">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-card text-lg"
                      style={{ background: `${source?.color}22`, color: source?.color }}
                    >
                      {source?.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-mono text-[10px] text-white/40">{a.id}</span>
                        <Chip
                          tone={
                            a.severity === 'critical'
                              ? 'fail'
                              : a.severity === 'warn'
                                ? 'warn' as any
                                : 'default'
                          }
                        >
                          {a.severity}
                        </Chip>
                        <span className="text-[10px] text-white/40">{a.ago} ago</span>
                      </div>
                      <div className="mt-1 text-sm text-white/90">{a.msg}</div>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-white/50">
                        <span>user: {a.user}</span>
                        <span>·</span>
                        <Chip>{a.status}</Chip>
                      </div>
                    </div>
                    {a.status === 'new' ? (
                      <Button3D size="sm" variant="blue">
                        Investigate
                      </Button3D>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </PlasticCard>

          <div className="space-y-4">
            <PlasticCard className="p-5">
              <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                Streak bonuses
              </div>
              <h3 className="mt-1 text-sm font-semibold">30-day activity rewards</h3>
              <ul className="mt-3 space-y-2 text-xs">
                {STREAKS.map((s) => (
                  <li key={s.user} className="rounded-card border border-glass bg-nested/60 p-3">
                    <div className="flex items-center justify-between">
                      <span className="truncate font-semibold">{s.user}</span>
                      <Chip tone="ok">{s.streak}d</Chip>
                    </div>
                    <div className="mt-1 text-white/60">{s.bonus}</div>
                  </li>
                ))}
              </ul>
            </PlasticCard>

            <PlasticCard className="p-5">
              <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                Response rules
              </div>
              <h3 className="mt-1 text-sm font-semibold">What triggers what</h3>
              <ul className="mt-3 space-y-2 text-xs text-white/70">
                <li className="flex gap-2">
                  <span className="text-[#F05858]">●</span>
                  <span>STL &lt; 40 auto-signal → PSS review queue</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber">●</span>
                  <span>SLA timer expires → auto-escalate to next tier</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-teal">●</span>
                  <span>30-day no complaints → +5 DMO score bonus</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#F05858]">●</span>
                  <span>Fraud flag → immediate L1 FREE freeze</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber">●</span>
                  <span>3 complaints / 3 weeks → STL −2</span>
                </li>
              </ul>
            </PlasticCard>
          </div>
        </div>
      </div>
    </>
  );
}
