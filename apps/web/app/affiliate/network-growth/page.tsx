'use client';

import { useState } from 'react';
import { CompliancePortalLayout } from '@/components/portal/layout';
import { PlasticCard } from '@/components/ui/plastic-card';
import { KpiCard } from '@/components/ui/kpi-card';
import { Chip } from '@/components/ui/chip';

/**
 * EHB Affiliate — Network Growth page (§6.6 from Affiliate.md)
 *
 * Growth chart 30/60/90-day · New referrals timeline ·
 * Network health score · Churn tracking · Milestone badges.
 */

const GROWTH_30D = [
  { day: 1, l1: 38, l2: 142, l3: 89 },
  { day: 7, l1: 42, l2: 168, l3: 112 },
  { day: 14, l1: 47, l2: 198, l3: 142 },
  { day: 21, l1: 52, l2: 224, l3: 178 },
  { day: 30, l1: 58, l2: 248, l3: 220 },
];

const NEW_REFERRALS_DAILY = [
  { date: 'Mon', l1: 2, l2: 8, l3: 5 },
  { date: 'Tue', l1: 1, l2: 12, l3: 9 },
  { date: 'Wed', l1: 3, l2: 6, l3: 12 },
  { date: 'Thu', l1: 4, l2: 14, l3: 8 },
  { date: 'Fri', l1: 2, l2: 18, l3: 14 },
  { date: 'Sat', l1: 5, l2: 22, l3: 18 },
  { date: 'Sun', l1: 3, l2: 14, l3: 11 },
];

const MILESTONES = [
  { count: 10, label: 'Connector', icon: '🔗', earned: true, earnedAt: '2025-12-04', reward: 'Bronze badge' },
  { count: 50, label: 'Builder', icon: '🏗️', earned: true, earnedAt: '2026-02-18', reward: 'Silver badge + $25' },
  { count: 100, label: 'Network Pro', icon: '🌐', earned: true, earnedAt: '2026-04-10', reward: 'Gold badge + $100' },
  { count: 500, label: 'Network Titan', icon: '👑', earned: false, progress: 526, target: 500, reward: 'Platinum + $500 + Trip' },
  { count: 1000, label: 'Network Legend', icon: '🏆', earned: false, progress: 526, target: 1000, reward: 'Diamond + $2,500 + Founders Circle' },
];

const HEALTH_FACTORS = [
  { label: 'Active referrals (last 30d)', value: 81, max: 100, weight: 40, color: '#2BBFA0' },
  { label: 'Verified KYC %', value: 76, max: 100, weight: 25, color: '#7B6EF6' },
  { label: 'Churn rate (inverse)', value: 88, max: 100, weight: 20, color: '#F0A030' },
  { label: 'Banned / flagged %', value: 95, max: 100, weight: 15, color: '#EC4899' },
];

export default function NetworkGrowthPage() {
  const [period, setPeriod] = useState<'30d' | '60d' | '90d'>('30d');
  const maxGrowth = Math.max(...GROWTH_30D.map((g) => g.l1 + g.l2 + g.l3));
  const maxDaily = Math.max(...NEW_REFERRALS_DAILY.map((d) => d.l1 + d.l2 + d.l3));

  // Network health score
  const healthScore = HEALTH_FACTORS.reduce((s, f) => s + (f.value * f.weight) / 100, 0);

  return (
    <CompliancePortalLayout title="Network Growth" breadcrumb={['Affiliate', 'Network Growth']}>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <Chip tone="ok">§6.6 Network Growth</Chip>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Network Growth Tracker</h1>
            <p className="mt-1 text-sm text-white/60">
              30/60/90-day referral growth · health score · churn tracking · milestone badges
            </p>
          </div>
          <div className="flex items-center gap-2">
            {(['30d', '60d', '90d'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`rounded-pill border px-3 py-1 text-xs transition ${
                  period === p
                    ? 'border-purple-light bg-purple-light/15 text-purple-light'
                    : 'border-glass bg-card/40 text-white/60 hover:border-purple-light/50'
                }`}
              >
                {p === '30d' ? '30 days' : p === '60d' ? '60 days' : '90 days'}
              </button>
            ))}
          </div>
        </div>

        {/* KPIs */}
        <div className="grid gap-3 grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Total Network" value="526" delta="↑ 142 in 30 days" tone="purple" icon="🌳" />
          <KpiCard label="L1 Direct" value="58" delta="↑ 20 in 30 days" tone="ok" icon="🎯" />
          <KpiCard label="L2 + L3" value="468" delta="↑ 122 indirect" tone="teal" icon="🔁" />
          <KpiCard label="Health Score" value={`${healthScore.toFixed(0)}/100`} delta={healthScore >= 80 ? 'Excellent' : 'Good'} tone={healthScore >= 80 ? 'ok' : 'amber'} icon="💚" />
        </div>

        {/* Growth Chart 30/60/90-day */}
        <PlasticCard className="p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/40">📈 Growth Chart</div>
              <h3 className="mt-1 text-base font-semibold">
                {period === '30d' ? '30-day' : period === '60d' ? '60-day' : '90-day'} cumulative referral growth
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 text-[10px]">
              <Chip tone="ok">L1 +20</Chip>
              <Chip tone="purple">L2 +56</Chip>
              <Chip tone="amber">L3 +66</Chip>
            </div>
          </div>
          <div className="mt-4 flex h-48 items-end gap-3">
            {GROWTH_30D.map((g) => {
              const total = g.l1 + g.l2 + g.l3;
              const heightPct = (total / maxGrowth) * 100;
              const l1Pct = (g.l1 / total) * 100;
              const l2Pct = (g.l2 / total) * 100;
              const l3Pct = (g.l3 / total) * 100;
              return (
                <div key={g.day} className="relative flex flex-1 flex-col items-center justify-end gap-1">
                  <div className="absolute -top-6 text-[10px] font-bold text-teal">{total}</div>
                  <div
                    className="flex w-full flex-col overflow-hidden rounded-t"
                    style={{ height: `${heightPct}%` }}
                  >
                    <div className="bg-amber" style={{ height: `${l3Pct}%` }} />
                    <div className="bg-purple-light" style={{ height: `${l2Pct}%` }} />
                    <div className="bg-teal" style={{ height: `${l1Pct}%` }} />
                  </div>
                  <div className="text-[10px] text-white/50">D{g.day}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex justify-center gap-4 text-[10px] text-white/60">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded bg-teal" /> L1 Direct</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded bg-purple-light" /> L2</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded bg-amber" /> L3</span>
          </div>
        </PlasticCard>

        {/* Daily new referrals */}
        <PlasticCard className="p-5">
          <div className="text-[10px] uppercase tracking-widest text-white/40">📅 Daily new signups (last 7 days)</div>
          <h3 className="mt-1 text-base font-semibold">Stacked by referral level</h3>
          <div className="mt-4 flex h-40 items-end gap-2">
            {NEW_REFERRALS_DAILY.map((d) => {
              const total = d.l1 + d.l2 + d.l3;
              const heightPct = (total / maxDaily) * 100;
              return (
                <div key={d.date} className="relative flex flex-1 flex-col items-center justify-end gap-1">
                  <div className="absolute -top-5 text-[10px] font-bold">{total}</div>
                  <div
                    className="flex w-full flex-col overflow-hidden rounded-t"
                    style={{ height: `${heightPct}%` }}
                  >
                    <div className="bg-amber" style={{ height: `${(d.l3 / total) * 100}%` }} />
                    <div className="bg-purple-light" style={{ height: `${(d.l2 / total) * 100}%` }} />
                    <div className="bg-teal" style={{ height: `${(d.l1 / total) * 100}%` }} />
                  </div>
                  <div className="text-[10px] text-white/50">{d.date}</div>
                </div>
              );
            })}
          </div>
        </PlasticCard>

        {/* Health Score Breakdown */}
        <PlasticCard className="p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/40">💚 Network Health Score</div>
              <h3 className="mt-1 text-base font-semibold">{healthScore.toFixed(0)}/100 — Excellent</h3>
            </div>
            <Chip tone="ok">Top 5% of affiliates</Chip>
          </div>
          <div className="mt-4 space-y-3">
            {HEALTH_FACTORS.map((f) => (
              <div key={f.label}>
                <div className="flex items-baseline justify-between text-xs">
                  <span>{f.label}</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold tabular-nums" style={{ color: f.color }}>
                      {f.value}/100
                    </span>
                    <span className="text-[10px] text-white/40">weight {f.weight}%</span>
                  </div>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-nested">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${f.value}%`, background: f.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </PlasticCard>

        {/* Churn Tracking */}
        <div className="grid gap-4 lg:grid-cols-2">
          <PlasticCard className="p-5">
            <div className="text-[10px] uppercase tracking-widest text-white/40">📉 Churn Tracking</div>
            <h3 className="mt-1 text-base font-semibold">Inactivity + ban metrics</h3>
            <div className="mt-4 space-y-3">
              <div>
                <div className="flex items-baseline justify-between text-sm">
                  <span>Inactive 30+ days</span>
                  <span className="font-bold text-amber">12 (2.3%)</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-nested">
                  <div className="h-full rounded-full bg-amber" style={{ width: '2.3%' }} />
                </div>
                <div className="mt-1 text-[10px] text-white/40">Healthy · industry avg is 8-12%</div>
              </div>
              <div>
                <div className="flex items-baseline justify-between text-sm">
                  <span>Banned for abuse</span>
                  <span className="font-bold text-red-400">2 (0.4%)</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-nested">
                  <div className="h-full rounded-full bg-red-400" style={{ width: '0.4%' }} />
                </div>
                <div className="mt-1 text-[10px] text-white/40">Excellent · industry avg is 1-3%</div>
              </div>
              <div>
                <div className="flex items-baseline justify-between text-sm">
                  <span>Pending KYC re-verification</span>
                  <span className="font-bold text-purple-light">8 (1.5%)</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-nested">
                  <div className="h-full rounded-full bg-purple-light" style={{ width: '1.5%' }} />
                </div>
              </div>
            </div>
          </PlasticCard>

          <PlasticCard className="p-5">
            <div className="text-[10px] uppercase tracking-widest text-white/40">📊 Network Composition</div>
            <h3 className="mt-1 text-base font-semibold">Distribution by status</h3>
            <div className="mt-4 space-y-2">
              {[
                { label: '✅ Active (transacted last 30d)', count: 426, pct: 81, tone: 'ok' as const },
                { label: '🟡 Inactive (signed up, no activity)', count: 76, pct: 14.4, tone: 'warn' as const },
                { label: '🔴 Banned / flagged', count: 2, pct: 0.4, tone: 'fail' as const },
                { label: '⏳ Pending KYC', count: 22, pct: 4.2, tone: 'purple' as const },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between rounded-card border border-glass bg-card/40 p-3">
                  <div className="text-sm">{s.label}</div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold tabular-nums">{s.count}</span>
                    <Chip tone={s.tone}>{s.pct}%</Chip>
                  </div>
                </div>
              ))}
            </div>
          </PlasticCard>
        </div>

        {/* Milestone Badges */}
        <PlasticCard className="p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/40">🏆 Milestone Badges</div>
              <h3 className="mt-1 text-base font-semibold">Rewards for hitting referral count milestones</h3>
            </div>
            <Chip tone="ok">3 of 5 earned</Chip>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {MILESTONES.map((m) => (
              <div
                key={m.label}
                className={`rounded-card border-2 p-4 text-center transition ${
                  m.earned
                    ? 'border-amber/40 bg-gradient-to-br from-amber/15 to-amber/5'
                    : 'border-dashed border-glass bg-nested/30 opacity-70'
                }`}
              >
                <div className={`text-4xl ${m.earned ? '' : 'grayscale'}`}>{m.icon}</div>
                <div className="mt-2 text-xs font-bold">{m.label}</div>
                <div className="text-[10px] text-white/60">{m.count} referrals</div>
                {m.earned ? (
                  <>
                    <Chip tone="ok">✓ Earned</Chip>
                    <div className="mt-1 text-[9px] text-white/40">{m.earnedAt}</div>
                    <div className="mt-1 text-[10px] text-amber">{m.reward}</div>
                  </>
                ) : (
                  <>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-nested">
                      <div
                        className="h-full rounded-full bg-purple-light"
                        style={{ width: `${Math.min(100, ((m.progress || 0) / m.target!) * 100)}%` }}
                      />
                    </div>
                    <div className="mt-1 text-[9px] text-white/50">
                      {m.progress}/{m.target} ({Math.round(((m.progress || 0) / m.target!) * 100)}%)
                    </div>
                    <div className="mt-1 text-[10px] text-purple-light">{m.reward}</div>
                  </>
                )}
              </div>
            ))}
          </div>
        </PlasticCard>
      </div>
    </CompliancePortalLayout>
  );
}
