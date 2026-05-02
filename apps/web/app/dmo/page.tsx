'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { DmoTopbar } from '@/components/dmo/topbar';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';
import { StlBadge } from '@/components/ui/stl-badge';
import { Sparkline } from '@/components/ui/sparkline';

// ===========================================================================
// Types
// ===========================================================================
interface Kpis {
  activeUsers: number;
  pendingFranchiseApps: number;
  aiInvocationsToday: number;
  platformRevenueUsd: number;
  stlDistribution: Record<string, number>;
  updatedAt: string;
}

type Period = 'today' | '7d' | '30d' | 'mtd' | 'ytd';

// ===========================================================================
// Demo data (will be wired to API in Phase 1.5)
// ===========================================================================
const DEMO_SPARKS: Record<string, number[]> = {
  users: [3120, 3180, 3240, 3290, 3360, 3420, 3488],
  signups: [24, 31, 28, 42, 37, 51, 48],
  orders: [812, 895, 903, 921, 978, 1042, 1118],
  revenue: [12400, 13280, 14100, 13890, 15220, 16480, 17340],
  franchise: [6, 7, 8, 9, 9, 11, 12],
  complaints: [14, 12, 9, 11, 8, 7, 6],
  ai: [4200, 4510, 4890, 5120, 5380, 5640, 5920],
  anchors: [84, 89, 92, 96, 101, 108, 114],
};

const CRITICAL_ALERTS = [
  {
    id: 'a1',
    tone: 'danger' as const,
    icon: '⚠️',
    title: 'T6 fraud spike — Karachi R1',
    body: '3 sellers downgraded in last 2h. Cluster pattern detected.',
    href: '/dmo/flagged',
  },
  {
    id: 'a2',
    tone: 'warn' as const,
    icon: '📉',
    title: '14 users dropped below L3',
    body: 'Auto-downgrade triggered — EHBGC lock may trigger next.',
    href: '/dmo/downgrades',
  },
  {
    id: 'a3',
    tone: 'warn' as const,
    icon: '⏰',
    title: '9 franchises refill due in <48h',
    body: 'Refill pipeline health 87%. Notify Sub L3 owners.',
    href: '/dmo/franchise/refill',
  },
];

const LIVE_EVENTS = [
  { t: '14:32', type: 'STL', user: 'zahid.k', msg: 'upgraded L4 → L5 (PSS verified)', tone: 'ok' },
  { t: '14:31', type: 'Order', user: 'sana.m', msg: 'placed order #OR-82341 ($142)', tone: 'default' },
  { t: '14:30', type: 'Franchise', user: 'adeel.r', msg: 'Sub L2 Karachi approved', tone: 'purple' },
  { t: '14:29', type: 'AI', user: 'system', msg: '5920 invocations cumulative today', tone: 'teal' },
  { t: '14:28', type: 'Alert', user: 'fraud-bot', msg: 'flagged seller #S-8712 (T6)', tone: 'warn' },
  { t: '14:27', type: 'STL', user: 'hamza.q', msg: 'downgraded L5 → L4 (complaints)', tone: 'warn' },
  { t: '14:26', type: 'Blockchain', user: 'anchor', msg: 'batch #114 anchored to Polkadot', tone: 'teal' },
  { t: '14:25', type: 'Payment', user: 'ayesha.n', msg: 'wallet refill $50 via JazzCash', tone: 'ok' },
];

const QUEUES = [
  { label: 'Franchise apps awaiting review', count: 12, sla: '48h', href: '/dmo/approvals', tone: 'amber' as const },
  { label: 'KYC documents in queue', count: 38, sla: '24h', href: '/dmo/pss', tone: 'purple' as const },
  { label: 'Complaints open > 24h', count: 7, sla: 'Overdue', href: '/dmo/complaints', tone: 'danger' as const },
  { label: 'STL recomputes scheduled', count: 145, sla: 'Nightly', href: '/dmo/stl', tone: 'teal' as const },
];

const MY_TASKS = [
  { id: 't1', label: 'Approve 3 Sub L4 Lahore applications', due: 'Today 18:00', priority: 'high' },
  { id: 't2', label: 'Review flagged seller batch #47', due: 'Today 22:00', priority: 'high' },
  { id: 't3', label: 'Sign off STL formula patch v2.3', due: 'Tomorrow', priority: 'med' },
  { id: 't4', label: 'Review GoSellr HPS launch checklist', due: 'Fri', priority: 'med' },
  { id: 't5', label: 'Monthly DMO report for investors', due: 'Next Mon', priority: 'low' },
];

const TOP_SELLERS = [
  { rank: 1, name: 'Aisha Traders', rev: 48200, stl: 9, industry: 'GSM', trend: 'up' },
  { rank: 2, name: 'Bilal Electronics', rev: 41800, stl: 8, industry: 'GSM', trend: 'up' },
  { rank: 3, name: 'MedLink Pharma', rev: 36400, stl: 8, industry: 'HPS', trend: 'flat' },
  { rank: 4, name: 'EHB Ride PK', rev: 34100, stl: 7, industry: 'WMS', trend: 'down' },
  { rank: 5, name: 'LawConnect', rev: 29800, stl: 9, industry: 'OLS', trend: 'up' },
];

const TOP_FRANCHISES = [
  { rank: 1, name: 'Karachi R1 P1 Sub L5', rev: 18200, share: '40%', health: 96 },
  { rank: 2, name: 'Lahore R2 P1 Sub L4', rev: 15400, share: '40%', health: 92 },
  { rank: 3, name: 'Islamabad R3 P1 Sub L3', rev: 12800, share: '40%', health: 89 },
  { rank: 4, name: 'Faisalabad R2 P2 Sub L2', rev: 9600, share: '40%', health: 87 },
];

const GEO_ZONES = [
  { zone: 'R1 — Karachi', users: 1240, rev: 84200, stlAvg: 5.4, active: 38 },
  { zone: 'R2 — Lahore', users: 1080, rev: 72100, stlAvg: 5.1, active: 34 },
  { zone: 'R3 — Islamabad', users: 640, rev: 48900, stlAvg: 5.6, active: 22 },
  { zone: 'R4 — Peshawar', users: 320, rev: 18400, stlAvg: 4.2, active: 12 },
  { zone: 'R5 — Quetta', users: 208, rev: 9800, stlAvg: 3.9, active: 8 },
];

const FLAGGED_USERS = [
  { id: 'u-8712', name: 'Hassan R.', type: 'Seller', reason: 'T6 — repeat complaint', stl: 3, action: 'review' },
  { id: 'u-4431', name: 'Noor A.', type: 'Rider', reason: 'Low trip completion', stl: 4, action: 'warn' },
  { id: 'u-9923', name: 'Rashid M.', type: 'Service', reason: 'Invalid license claim', stl: 2, action: 'suspend' },
];

const INDUSTRY_HEALTH = [
  { name: 'GoSellr (GSM)', health: 94, orders: 1118, rev: 62400 },
  { name: 'WMS', health: 88, orders: 342, rev: 18200 },
  { name: 'HPS', health: 91, orders: 208, rev: 34100 },
  { name: 'OLS', health: 86, orders: 94, rev: 12800 },
  { name: 'JPS', health: 90, orders: 62, rev: 8400 },
];

// ===========================================================================
// Sub components
// ===========================================================================
function KpiSpark({
  label,
  value,
  delta,
  deltaTone = 'ok',
  icon,
  color,
  sparkKey,
}: {
  label: string;
  value: string | number;
  delta: string;
  deltaTone?: 'ok' | 'warn' | 'danger';
  icon: string;
  color: string;
  sparkKey: keyof typeof DEMO_SPARKS;
}) {
  const tonalDelta =
    deltaTone === 'ok' ? 'text-teal' : deltaTone === 'warn' ? 'text-amber' : 'text-red-400';
  return (
    <PlasticCard className="relative overflow-hidden p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/50">
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
          </div>
          <div className="mt-2 text-2xl font-bold tabular-nums sm:text-3xl" style={{ color }}>
            {value}
          </div>
          <div className={`mt-1 text-[11px] font-semibold ${tonalDelta}`}>{delta}</div>
        </div>
        <div className="-mr-2">
          <Sparkline values={DEMO_SPARKS[sparkKey]} color={color} width={90} height={32} />
        </div>
      </div>
    </PlasticCard>
  );
}

function SplitBar({
  segments,
}: {
  segments: { label: string; pct: number; color: string }[];
}) {
  return (
    <div>
      <div className="flex h-4 w-full overflow-hidden rounded-chip bg-white/5">
        {segments.map((s) => (
          <div
            key={s.label}
            className="h-full"
            style={{ width: `${s.pct}%`, background: s.color }}
            title={`${s.label}: ${s.pct}%`}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-3 text-[11px]">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5 text-white/70">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: s.color }}
            />
            {s.label} {s.pct}%
          </div>
        ))}
      </div>
    </div>
  );
}

function HealthBox({
  label,
  status,
  detail,
}: {
  label: string;
  status: 'ok' | 'warn' | 'down' | 'stub';
  detail: string;
}) {
  const colors = {
    ok: { bg: '#14c78a22', dot: '#2BBFA0', text: '#5FE2B6' },
    warn: { bg: '#F0A03022', dot: '#F0A030', text: '#F0A030' },
    down: { bg: '#ff6b6b22', dot: '#ff6b6b', text: '#ff6b6b' },
    stub: { bg: '#7B6EF622', dot: '#7B6EF6', text: '#9a90fa' },
  };
  const c = colors[status];
  return (
    <div
      className="rounded-card border p-3"
      style={{ background: c.bg, borderColor: `${c.dot}44` }}
    >
      <div className="flex items-center gap-2">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ background: c.dot, boxShadow: `0 0 10px ${c.dot}` }}
        />
        <span className="text-xs font-semibold text-white/80">{label}</span>
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-wider" style={{ color: c.text }}>
        {status}
      </div>
      <div className="mt-1 text-[11px] text-white/50">{detail}</div>
    </div>
  );
}

function QuickAction({
  href,
  icon,
  title,
  subtitle,
  badge,
  tone,
}: {
  href: string;
  icon: string;
  title: string;
  subtitle: string;
  badge?: string;
  tone: 'purple' | 'teal' | 'amber' | 'red';
}) {
  const borderColor = {
    purple: 'hover:border-[#7B6EF6]',
    teal: 'hover:border-[#2BBFA0]',
    amber: 'hover:border-[#F0A030]',
    red: 'hover:border-[#ff6b6b]',
  }[tone];
  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 rounded-card border border-glass bg-nested p-3 transition ${borderColor}`}
    >
      <div className="text-2xl">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold">{title}</div>
        <div className="mt-0.5 truncate text-[11px] text-white/50">{subtitle}</div>
      </div>
      {badge ? (
        <div className="rounded-chip bg-white/10 px-2 py-0.5 text-[10px] font-bold">{badge}</div>
      ) : null}
    </Link>
  );
}

// ===========================================================================
// Main page
// ===========================================================================
export default function DmoDashboard() {
  const [kpis, setKpis] = useState<Kpis | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period>('today');

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get<Kpis>('/api/dmo/kpis');
        setKpis(data);
      } catch (e: any) {
        setErr(e?.message || 'Failed to load KPIs. Is the API running on :5000?');
      }
    })();
  }, []);

  const stlTotal = useMemo(() => {
    const d = kpis?.stlDistribution ?? {};
    return Object.values(d).reduce((a, b) => a + b, 0);
  }, [kpis]);

  return (
    <>
      <DmoTopbar
        title="DMO Dashboard"
        subtitle="Decentralized Management Office — governance brain"
        breadcrumb={['Overview']}
      />

      <div className="space-y-6 p-4 sm:p-6">
        {/* ============================================================ */}
        {/* 1. Period selector + meta */}
        {/* ============================================================ */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-white/40">Period:</span>
            {(['today', '7d', '30d', 'mtd', 'ytd'] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`rounded-chip border px-3 py-1 text-xs transition ${
                  period === p
                    ? 'border-purple-light bg-purple/20 text-white'
                    : 'border-glass bg-white/5 text-white/60 hover:border-purple-light'
                }`}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-white/50">
            <span>Last sync:</span>
            <span className="tabular-nums text-white/80">
              {kpis ? new Date(kpis.updatedAt).toLocaleTimeString() : '—'}
            </span>
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-teal" />
            <span className="text-teal">Live</span>
          </div>
        </div>

        {err ? (
          <div className="rounded-card border border-[#F0A030]/40 bg-[#F0A030]/10 p-4 text-sm text-[#F0A030]">
            {err}
          </div>
        ) : null}

        {/* ============================================================ */}
        {/* 2. Critical alerts ribbon */}
        {/* ============================================================ */}
        <div className="grid gap-3 md:grid-cols-3">
          {CRITICAL_ALERTS.map((a) => {
            const color =
              a.tone === 'danger'
                ? { border: '#ff6b6b55', bg: '#ff6b6b11', text: '#ff9e9e' }
                : { border: '#F0A03055', bg: '#F0A03011', text: '#F0A030' };
            return (
              <Link
                key={a.id}
                href={a.href}
                className="rounded-card border p-3 transition hover:brightness-110"
                style={{ borderColor: color.border, background: color.bg }}
              >
                <div className="flex items-start gap-2">
                  <div className="text-xl">{a.icon}</div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold" style={{ color: color.text }}>
                      {a.title}
                    </div>
                    <div className="mt-0.5 text-[11px] text-white/60">{a.body}</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* 3. 8 Primary KPIs */}
        {/* ============================================================ */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiSpark
            label="Active users"
            value={kpis?.activeUsers?.toLocaleString() ?? '3,488'}
            delta="+12% WoW"
            icon="👥"
            color="#7B6EF6"
            sparkKey="users"
          />
          <KpiSpark
            label="Signups today"
            value={48}
            delta="+27% vs yesterday"
            icon="✨"
            color="#2BBFA0"
            sparkKey="signups"
          />
          <KpiSpark
            label="Orders placed"
            value="1,118"
            delta="+7% WoW"
            icon="🛒"
            color="#F0A030"
            sparkKey="orders"
          />
          <KpiSpark
            label="Platform revenue"
            value={kpis ? `$${kpis.platformRevenueUsd.toLocaleString()}` : '$17,340'}
            delta="+8% WoW"
            icon="💰"
            color="#5FE2B6"
            sparkKey="revenue"
          />
          <KpiSpark
            label="Franchise apps"
            value={kpis?.pendingFranchiseApps ?? 12}
            delta="SLA 48h"
            icon="🏛"
            color="#7B6EF6"
            sparkKey="franchise"
          />
          <KpiSpark
            label="Complaints"
            value={6}
            delta="-57% WoW"
            icon="📣"
            color="#F0A030"
            sparkKey="complaints"
          />
          <KpiSpark
            label="AI invocations"
            value={kpis?.aiInvocationsToday?.toLocaleString() ?? '5,920'}
            delta="+8% vs yesterday"
            icon="🤖"
            color="#2BBFA0"
            sparkKey="ai"
          />
          <KpiSpark
            label="Polkadot anchors"
            value={114}
            delta="batch 114 sealed"
            icon="🔗"
            color="#9a90fa"
            sparkKey="anchors"
          />
        </div>

        {/* ============================================================ */}
        {/* 4. 3-column row: Live events + Queues + My tasks */}
        {/* ============================================================ */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Live activity feed */}
          <PlasticCard className="p-5 lg:col-span-1">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">
                  Live activity
                </div>
                <h3 className="mt-1 text-sm font-bold">Platform stream</h3>
              </div>
              <Chip tone="teal">Live</Chip>
            </div>
            <div className="space-y-2 text-xs">
              {LIVE_EVENTS.map((e, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 border-b border-glass/50 pb-2 last:border-0"
                >
                  <div className="w-11 shrink-0 font-mono text-[10px] text-white/40">{e.t}</div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`rounded-chip px-1.5 py-0.5 text-[9px] font-bold ${
                          e.tone === 'ok'
                            ? 'bg-teal/20 text-teal'
                            : e.tone === 'purple'
                              ? 'bg-purple/20 text-purple-light'
                              : e.tone === 'warn'
                                ? 'bg-amber/20 text-amber'
                                : e.tone === 'teal'
                                  ? 'bg-teal/15 text-teal'
                                  : 'bg-white/10 text-white/70'
                        }`}
                      >
                        {e.type}
                      </span>
                      <span className="font-semibold text-white/80">{e.user}</span>
                    </div>
                    <div className="mt-0.5 text-white/60">{e.msg}</div>
                  </div>
                </div>
              ))}
            </div>
          </PlasticCard>

          {/* Priority queues */}
          <PlasticCard className="p-5">
            <div className="mb-3">
              <div className="text-[10px] uppercase tracking-widest text-white/40">
                Priority queues
              </div>
              <h3 className="mt-1 text-sm font-bold">Needs attention</h3>
            </div>
            <div className="space-y-2">
              {QUEUES.map((q) => {
                const toneColors = {
                  amber: 'border-amber/40 bg-amber/10',
                  purple: 'border-purple-light/40 bg-purple/10',
                  danger: 'border-red-400/40 bg-red-400/10',
                  teal: 'border-teal/40 bg-teal/10',
                }[q.tone];
                return (
                  <Link
                    key={q.label}
                    href={q.href}
                    className={`block rounded-card border p-3 transition hover:brightness-110 ${toneColors}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white/90">{q.label}</div>
                        <div className="mt-0.5 text-[10px] text-white/50">SLA {q.sla}</div>
                      </div>
                      <div className="text-2xl font-black tabular-nums">{q.count}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </PlasticCard>

          {/* My tasks */}
          <PlasticCard className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">Your tasks</div>
                <h3 className="mt-1 text-sm font-bold">Open items</h3>
              </div>
              <span className="rounded-chip bg-purple/20 px-2 py-0.5 text-[10px] font-bold text-purple-light">
                {MY_TASKS.length}
              </span>
            </div>
            <div className="space-y-2 text-xs">
              {MY_TASKS.map((t) => {
                const pri =
                  t.priority === 'high'
                    ? 'border-red-400/50'
                    : t.priority === 'med'
                      ? 'border-amber/50'
                      : 'border-teal/50';
                const priDot =
                  t.priority === 'high' ? '#ff6b6b' : t.priority === 'med' ? '#F0A030' : '#2BBFA0';
                return (
                  <div key={t.id} className={`rounded-card border-l-2 bg-nested p-2.5 ${pri}`}>
                    <div className="flex items-start gap-2">
                      <input type="checkbox" className="mt-0.5 accent-purple" />
                      <div className="min-w-0 flex-1">
                        <div className="text-[12px] text-white/85">{t.label}</div>
                        <div className="mt-0.5 flex items-center gap-2 text-[10px] text-white/50">
                          <span
                            className="inline-block h-1.5 w-1.5 rounded-full"
                            style={{ background: priDot }}
                          />
                          <span>Due {t.due}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </PlasticCard>
        </div>

        {/* ============================================================ */}
        {/* 5. Trust distribution + Industry health */}
        {/* ============================================================ */}
        <div className="grid gap-4 lg:grid-cols-3">
          <PlasticCard className="p-5 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">
                  Trust distribution
                </div>
                <h3 className="mt-1 text-lg font-semibold">STL levels across platform</h3>
              </div>
              <Link
                href="/dmo/stl"
                className="rounded-chip border border-glass bg-white/5 px-3 py-1.5 text-xs hover:border-purple-light"
              >
                Open STL board →
              </Link>
            </div>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((lvl) => {
                const key = `L${lvl}`;
                const count = kpis?.stlDistribution?.[key] ?? Math.max(0, 420 - lvl * 38);
                const total = stlTotal || 2100;
                const pct = total ? Math.round((count / total) * 100) : 0;
                return (
                  <div key={key} className="flex items-center gap-3">
                    <StlBadge level={lvl} size="xs" showName={false} />
                    <div className="flex-1">
                      <div className="h-2 w-full overflow-hidden rounded-chip bg-white/5">
                        <div
                          className="h-full rounded-chip bg-gradient-to-r from-purple to-teal"
                          style={{ width: `${Math.max(pct, 2)}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-12 text-right text-[11px] tabular-nums text-white/60">
                      {count}
                    </div>
                    <div className="w-10 text-right text-[10px] tabular-nums text-white/40">
                      {pct}%
                    </div>
                  </div>
                );
              })}
            </div>
          </PlasticCard>

          <PlasticCard className="p-5">
            <div className="mb-3">
              <div className="text-[10px] uppercase tracking-widest text-white/40">
                Industry health
              </div>
              <h3 className="mt-1 text-lg font-semibold">Across 5 live verticals</h3>
            </div>
            <div className="space-y-3">
              {INDUSTRY_HEALTH.map((ind) => (
                <div key={ind.name}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white/80">{ind.name}</span>
                    <span className="tabular-nums text-white/60">{ind.health}%</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-chip bg-white/5">
                    <div
                      className="h-full rounded-chip"
                      style={{
                        width: `${ind.health}%`,
                        background:
                          ind.health >= 90
                            ? 'linear-gradient(90deg,#2BBFA0,#5FE2B6)'
                            : ind.health >= 80
                              ? 'linear-gradient(90deg,#F0A030,#FFC266)'
                              : 'linear-gradient(90deg,#ff6b6b,#ff9e9e)',
                      }}
                    />
                  </div>
                  <div className="mt-1 text-[10px] text-white/40">
                    {ind.orders.toLocaleString()} orders · ${ind.rev.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </PlasticCard>
        </div>

        {/* ============================================================ */}
        {/* 6. Revenue split + Top franchises */}
        {/* ============================================================ */}
        <div className="grid gap-4 lg:grid-cols-2">
          <PlasticCard className="p-5">
            <div className="mb-4">
              <div className="text-[10px] uppercase tracking-widest text-white/40">
                Revenue split
              </div>
              <h3 className="mt-1 text-lg font-semibold">Where each $ flows</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="mb-2 text-[11px] font-semibold text-white/70">
                  Order revenue (70/10/10/10)
                </div>
                <SplitBar
                  segments={[
                    { label: 'Seller', pct: 70, color: '#2BBFA0' },
                    { label: 'Rider', pct: 10, color: '#F0A030' },
                    { label: 'Franchise', pct: 10, color: '#7B6EF6' },
                    { label: 'EHB', pct: 10, color: '#5FE2B6' },
                  ]}
                />
              </div>
              <div>
                <div className="mb-2 text-[11px] font-semibold text-white/70">
                  Franchise layer (Sub / Master / Corporate / Country — 40/25/20/15)
                </div>
                <SplitBar
                  segments={[
                    { label: 'Sub', pct: 40, color: '#7B6EF6' },
                    { label: 'Master', pct: 25, color: '#9a90fa' },
                    { label: 'Corporate', pct: 20, color: '#2BBFA0' },
                    { label: 'Country', pct: 15, color: '#5FE2B6' },
                  ]}
                />
              </div>
              <div className="mt-3 rounded-card border border-glass bg-nested p-3 text-xs text-white/60">
                <span className="font-semibold text-white/80">Today:</span>{' '}
                <span className="tabular-nums">$17,340</span> · Seller{' '}
                <span className="text-teal">$12,138</span> · Rider{' '}
                <span className="text-amber">$1,734</span> · Franchise{' '}
                <span className="text-purple-light">$1,734</span> · EHB{' '}
                <span className="text-teal">$1,734</span>
              </div>
            </div>
          </PlasticCard>

          <PlasticCard className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">
                  Top franchises
                </div>
                <h3 className="mt-1 text-lg font-semibold">By revenue contribution</h3>
              </div>
              <Link
                href="/dmo/franchise"
                className="rounded-chip border border-glass bg-white/5 px-3 py-1.5 text-xs hover:border-purple-light"
              >
                All →
              </Link>
            </div>
            <div className="space-y-2">
              {TOP_FRANCHISES.map((f) => (
                <div
                  key={f.rank}
                  className="flex items-center gap-3 rounded-card border border-glass bg-nested p-2.5"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-chip bg-purple/20 text-xs font-bold text-purple-light">
                    #{f.rank}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-xs font-semibold">{f.name}</div>
                    <div className="mt-0.5 flex items-center gap-2 text-[10px] text-white/50">
                      <span>Share {f.share}</span>
                      <span>· Health {f.health}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold tabular-nums">${f.rev.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </PlasticCard>
        </div>

        {/* ============================================================ */}
        {/* 7. Geographic zones + Top sellers */}
        {/* ============================================================ */}
        <div className="grid gap-4 lg:grid-cols-2">
          <PlasticCard className="p-5">
            <div className="mb-4">
              <div className="text-[10px] uppercase tracking-widest text-white/40">
                Geographic zones
              </div>
              <h3 className="mt-1 text-lg font-semibold">PK regional breakdown</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-glass text-[10px] uppercase tracking-wider text-white/40">
                    <th className="px-2 py-2 text-left">Zone</th>
                    <th className="px-2 py-2 text-right">Users</th>
                    <th className="px-2 py-2 text-right">Revenue</th>
                    <th className="px-2 py-2 text-right">Avg STL</th>
                    <th className="px-2 py-2 text-right">Franchises</th>
                  </tr>
                </thead>
                <tbody>
                  {GEO_ZONES.map((z) => (
                    <tr key={z.zone} className="border-b border-glass/40">
                      <td className="px-2 py-2 font-semibold">{z.zone}</td>
                      <td className="px-2 py-2 text-right tabular-nums">
                        {z.users.toLocaleString()}
                      </td>
                      <td className="px-2 py-2 text-right tabular-nums text-teal">
                        ${z.rev.toLocaleString()}
                      </td>
                      <td className="px-2 py-2 text-right tabular-nums">{z.stlAvg.toFixed(1)}</td>
                      <td className="px-2 py-2 text-right tabular-nums">{z.active}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </PlasticCard>

          <PlasticCard className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">
                  Top sellers
                </div>
                <h3 className="mt-1 text-lg font-semibold">Across all industries</h3>
              </div>
              <Link
                href="/dmo/sellers"
                className="rounded-chip border border-glass bg-white/5 px-3 py-1.5 text-xs hover:border-purple-light"
              >
                All →
              </Link>
            </div>
            <div className="space-y-2">
              {TOP_SELLERS.map((s) => (
                <div
                  key={s.rank}
                  className="flex items-center gap-3 rounded-card border border-glass bg-nested p-2.5"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-chip bg-teal/20 text-xs font-bold text-teal">
                    #{s.rank}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-xs font-semibold">{s.name}</span>
                      <span className="rounded-chip bg-white/10 px-1.5 py-0.5 text-[9px] font-bold text-white/70">
                        {s.industry}
                      </span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-2">
                      <StlBadge level={s.stl} size="xs" showName={false} />
                      <span
                        className={`text-[10px] ${
                          s.trend === 'up'
                            ? 'text-teal'
                            : s.trend === 'down'
                              ? 'text-amber'
                              : 'text-white/50'
                        }`}
                      >
                        {s.trend === 'up' ? '▲ rising' : s.trend === 'down' ? '▼ falling' : '─ flat'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold tabular-nums">${s.rev.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </PlasticCard>
        </div>

        {/* ============================================================ */}
        {/* 8. Flagged users */}
        {/* ============================================================ */}
        <PlasticCard className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/40">
                Flagged users
              </div>
              <h3 className="mt-1 text-lg font-semibold">Requires DMO review</h3>
            </div>
            <Link
              href="/dmo/flagged"
              className="rounded-chip border border-red-400/40 bg-red-400/10 px-3 py-1.5 text-xs text-red-300 hover:brightness-110"
            >
              Open all {FLAGGED_USERS.length} →
            </Link>
          </div>
          <div className="space-y-2">
            {FLAGGED_USERS.map((u) => (
              <div
                key={u.id}
                className="flex flex-wrap items-center gap-3 rounded-card border border-red-400/20 bg-red-400/5 p-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-400/20 text-sm font-bold text-red-300">
                  ⚠
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{u.name}</span>
                    <span className="rounded-chip bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-white/70">
                      {u.type}
                    </span>
                    <StlBadge level={u.stl} size="xs" showName={false} />
                  </div>
                  <div className="mt-0.5 text-[11px] text-white/60">{u.reason}</div>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-chip border border-amber/50 bg-amber/10 px-3 py-1 text-[11px] font-semibold text-amber hover:brightness-110">
                    Warn
                  </button>
                  <button className="rounded-chip border border-red-400/50 bg-red-400/10 px-3 py-1 text-[11px] font-semibold text-red-300 hover:brightness-110">
                    Suspend
                  </button>
                  <button className="rounded-chip border border-teal/50 bg-teal/10 px-3 py-1 text-[11px] font-semibold text-teal hover:brightness-110">
                    Clear
                  </button>
                </div>
              </div>
            ))}
          </div>
        </PlasticCard>

        {/* ============================================================ */}
        {/* 9. System health */}
        {/* ============================================================ */}
        <PlasticCard className="p-5">
          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-white/40">System health</div>
            <h3 className="mt-1 text-lg font-semibold">All services — live</h3>
          </div>
          <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <HealthBox label="API" status="ok" detail=":5000 · 43ms" />
            <HealthBox label="AI Service" status="ok" detail=":8080 · 118ms" />
            <HealthBox label="MongoDB" status="ok" detail=":27017 · 14ms" />
            <HealthBox label="Socket.IO" status="ok" detail="342 clients" />
            <HealthBox label="Polkadot" status="stub" detail="testnet only" />
            <HealthBox label="Payments" status="stub" detail="vendor pending" />
          </div>
        </PlasticCard>

        {/* ============================================================ */}
        {/* 10. Quick actions */}
        {/* ============================================================ */}
        <PlasticCard className="p-5">
          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-white/40">Quick actions</div>
            <h3 className="mt-1 text-lg font-semibold">Jump to any module</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <QuickAction
              href="/dmo/approvals"
              icon="✅"
              title="Franchise approvals"
              subtitle={`${kpis?.pendingFranchiseApps ?? 12} pending`}
              badge="12"
              tone="amber"
            />
            <QuickAction
              href="/dmo/pss"
              icon="🛡"
              title="PSS queue"
              subtitle="38 KYC to review"
              badge="38"
              tone="purple"
            />
            <QuickAction
              href="/dmo/complaints"
              icon="📣"
              title="Complaints"
              subtitle="7 overdue"
              badge="7"
              tone="red"
            />
            <QuickAction
              href="/dmo/stl"
              icon="📊"
              title="STL board"
              subtitle="10-level trust ladder"
              tone="teal"
            />
            <QuickAction
              href="/dmo/ai-assistant"
              icon="🤖"
              title="AI ops panel"
              subtitle="5,920 invocations today"
              tone="teal"
            />
            <QuickAction
              href="/dmo/franchise"
              icon="🏛"
              title="Franchise control"
              subtitle="28 active franchises"
              tone="purple"
            />
            <QuickAction
              href="/dmo/flagged"
              icon="🚩"
              title="Flagged users"
              subtitle={`${FLAGGED_USERS.length} under review`}
              badge="3"
              tone="red"
            />
            <QuickAction
              href="/dmo/reports"
              icon="📈"
              title="Reports & exports"
              subtitle="Monthly / quarterly"
              tone="amber"
            />
          </div>
        </PlasticCard>

        {/* Status strip */}
        <div className="flex flex-wrap gap-3">
          <Chip tone="ok">API: healthy</Chip>
          <Chip tone="ok">AI service: reachable</Chip>
          <Chip tone="purple">Theme: live</Chip>
          <Chip tone="warn">CRB on-chain: stub</Chip>
          {kpis ? (
            <Chip tone="default">
              Updated {new Date(kpis.updatedAt).toLocaleTimeString()}
            </Chip>
          ) : null}
        </div>
      </div>
    </>
  );
}
