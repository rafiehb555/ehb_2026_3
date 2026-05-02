'use client';

import Link from 'next/link';
import { CompliancePortalLayout } from '@/components/portal/layout';
import { PlasticCard } from '@/components/ui/plastic-card';
import { KpiCard } from '@/components/ui/kpi-card';
import { Chip } from '@/components/ui/chip';
import { Button3D } from '@/components/ui/button-3d';

/**
 * EHB Compliance Portal — Hub / Overview
 *
 * Main entry for the Compliance Portal. Shows KPI strip, quick actions,
 * recent activity, system status. Matches Visily Compliance Portal design.
 */

const QUICK_ACTIONS = [
  { href: '/portal/payments', icon: '💸', label: 'Process Payouts', count: 12, tone: 'amber' },
  { href: '/portal/moderation', icon: '🛡️', label: 'Review Products', count: 4, tone: 'red' },
  { href: '/portal/campaigns', icon: '📢', label: 'Active Campaigns', count: 6, tone: 'purple' },
  { href: '/portal/reconciliation', icon: '⚖️', label: 'Open Reconciliations', count: 2, tone: 'teal' },
];

const RECENT_ACTIVITY = [
  { type: 'commission', actor: 'Ahmed K.', action: 'earned $12.40 from OBS Pro', time: '2 min ago', tone: 'ok' },
  { type: 'kyc', actor: 'Sarah M.', action: 'submitted KYC Tier 2 docs', time: '8 min ago', tone: 'purple' },
  { type: 'flag', actor: 'System', action: 'flagged user Marcus V. (risk 98)', time: '14 min ago', tone: 'fail' },
  { type: 'withdrawal', actor: 'Zara B.', action: 'requested $1,250 withdrawal', time: '23 min ago', tone: 'amber' },
  { type: 'rank', actor: 'Imran S.', action: 'promoted to R5 Manager', time: '32 min ago', tone: 'ok' },
  { type: 'campaign', actor: 'admin@ehb', action: 'launched Pakistan Pilot Awareness', time: '1h ago', tone: 'purple' },
];

const SYSTEM_HEALTH = [
  { service: 'API Gateway', status: 'healthy', latency: '142ms', uptime: '99.98%' },
  { service: 'Affiliate Engine', status: 'healthy', latency: '48ms', uptime: '99.99%' },
  { service: 'Wallet Service', status: 'healthy', latency: '67ms', uptime: '99.95%' },
  { service: 'KYC Service', status: 'healthy', latency: '231ms', uptime: '99.92%' },
  { service: 'Compliance', status: 'healthy', latency: '89ms', uptime: '99.99%' },
  { service: 'Notification', status: 'degraded', latency: '1240ms', uptime: '99.45%' },
];

export default function PortalHub() {
  return (
    <CompliancePortalLayout title="Overview" breadcrumb={['Affiliate', 'Overview']}>
      {/* Welcome banner */}
      <div className="mb-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <Chip tone="purple">EHB Compliance Portal · v3.12</Chip>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
              Welcome back, Sarah 👋
            </h1>
            <p className="mt-1 text-sm text-white/60">
              Pakistan pilot · 6 active campaigns · 4 critical-risk cases pending DMO review
            </p>
          </div>
          <div className="flex gap-2">
            <Button3D variant="purple" size="md">
              + Quick Action
            </Button3D>
            <Button3D variant="green" size="md">
              📊 Run Daily Report
            </Button3D>
          </div>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total Sales (24h)"
          value="$66,231"
          delta="↑ 14.5% vs yesterday"
          tone="ok"
          icon="💰"
        />
        <KpiCard
          label="Active Affiliates"
          value="12,847"
          delta="↑ 142 new this week"
          tone="purple"
          icon="👥"
        />
        <KpiCard
          label="Pending Payouts"
          value="$45,232"
          delta="12 requests waiting"
          tone="amber"
          icon="⏳"
        />
        <KpiCard
          label="Critical Risk Queue"
          value="4"
          delta="↑ 1 since yesterday"
          tone="fail"
          icon="🚨"
        />
      </div>

      {/* Quick actions + Recent activity */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* Quick actions */}
        <PlasticCard className="p-5">
          <div className="text-[10px] uppercase tracking-widest text-white/40">
            🎯 Quick Actions
          </div>
          <h3 className="mt-1 text-base font-semibold">Things waiting for you</h3>
          <div className="mt-4 space-y-2">
            {QUICK_ACTIONS.map((a) => {
              const colors: Record<string, string> = {
                purple: '#7B6EF6',
                teal: '#2BBFA0',
                amber: '#F0A030',
                red: '#F05858',
              };
              const color = colors[a.tone] || '#7B6EF6';
              return (
                <Link
                  key={a.href}
                  href={a.href}
                  className="group flex items-center gap-3 rounded-card border border-glass bg-card/40 p-3 transition hover:-translate-y-0.5 hover:border-purple-light/50"
                  style={{ borderLeft: `3px solid ${color}` }}
                >
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base"
                    style={{ background: `${color}22`, border: `1px solid ${color}55` }}
                  >
                    {a.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium">{a.label}</div>
                  </div>
                  <span
                    className="rounded-pill border px-2 py-0.5 text-xs font-bold"
                    style={{
                      borderColor: `${color}55`,
                      background: `${color}11`,
                      color,
                    }}
                  >
                    {a.count}
                  </span>
                  <span className="text-white/30 transition group-hover:translate-x-1 group-hover:text-white/70">
                    →
                  </span>
                </Link>
              );
            })}
          </div>
        </PlasticCard>

        {/* Recent activity feed */}
        <PlasticCard className="overflow-hidden p-0 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-glass px-5 py-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/40">
                ⚡ Live Activity
              </div>
              <h3 className="mt-1 text-base font-semibold">Last 6 events</h3>
            </div>
            <Chip tone="ok">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-teal" />
              LIVE
            </Chip>
          </div>
          <div className="divide-y divide-glass">
            {RECENT_ACTIVITY.map((a, i) => {
              const icons: Record<string, string> = {
                commission: '💵',
                kyc: '🆔',
                flag: '🚨',
                withdrawal: '💸',
                rank: '🏆',
                campaign: '📢',
              };
              const tones: Record<string, 'ok' | 'purple' | 'amber' | 'fail'> = {
                ok: 'ok',
                purple: 'purple',
                amber: 'amber',
                fail: 'fail',
              };
              return (
                <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-card/30">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-card/60 text-base">
                    {icons[a.type] || '•'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm">
                      <span className="font-medium">{a.actor}</span>{' '}
                      <span className="text-white/60">{a.action}</span>
                    </div>
                    <div className="text-[10px] text-white/40">{a.time}</div>
                  </div>
                  <Chip tone={tones[a.tone] || 'purple'}>{a.type}</Chip>
                </div>
              );
            })}
          </div>
          <div className="border-t border-glass px-5 py-3 text-center">
            <button className="text-xs text-purple-light hover:underline">
              View full activity log →
            </button>
          </div>
        </PlasticCard>
      </div>

      {/* System health */}
      <PlasticCard className="mt-6 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-glass px-5 py-3">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">
              🔍 System Health
            </div>
            <h3 className="mt-1 text-base font-semibold">All services nominal</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip tone="ok">5 healthy</Chip>
            <Chip tone="warn">1 degraded</Chip>
            <a
              href="/api/health/affiliate"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-pill border border-glass bg-card/40 px-3 py-1 text-xs hover:border-purple-light"
            >
              Open detailed health →
            </a>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-card/30 text-left text-[10px] uppercase tracking-wider text-white/40">
              <tr>
                <th className="px-5 py-2.5">Service</th>
                <th className="px-5 py-2.5">Status</th>
                <th className="px-5 py-2.5">Latency (p95)</th>
                <th className="px-5 py-2.5">Uptime (30d)</th>
                <th className="px-5 py-2.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass">
              {SYSTEM_HEALTH.map((s) => (
                <tr key={s.service} className="hover:bg-card/20">
                  <td className="px-5 py-3 font-medium">{s.service}</td>
                  <td className="px-5 py-3">
                    {s.status === 'healthy' ? (
                      <Chip tone="ok">
                        <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-teal" />
                        Healthy
                      </Chip>
                    ) : (
                      <Chip tone="warn">
                        <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-amber" />
                        Degraded
                      </Chip>
                    )}
                  </td>
                  <td className="px-5 py-3 tabular-nums text-white/70">{s.latency}</td>
                  <td className="px-5 py-3 tabular-nums">
                    <span className={s.uptime.startsWith('99.9') ? 'text-teal' : 'text-amber'}>
                      {s.uptime}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button className="rounded border border-glass bg-card/60 px-2 py-1 text-[10px] hover:border-purple-light">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PlasticCard>
    </CompliancePortalLayout>
  );
}
