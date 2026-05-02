'use client';

import { useState } from 'react';
import { DmoTopbar } from '@/components/dmo/topbar';
import { PlasticCard } from '@/components/ui/plastic-card';
import { KpiCard } from '@/components/ui/kpi-card';
import { Chip } from '@/components/ui/chip';
import { Button3D } from '@/components/ui/button-3d';

/**
 * EHB DMO — Campaign Management (Visily prototype screen #8)
 *
 * Admin page for marketing campaigns: KPIs strip, hero campaign cards,
 * campaigns table with status / performance metrics / actions.
 */

const CAMPAIGNS = [
  {
    id: 'CAMP-2024-001',
    name: 'Foundation Spaces Boost',
    type: 'banner',
    industry: 'OBS',
    budget: 5000,
    spent: 3214,
    clicks: 8900,
    conversions: 142,
    cpc: 0.36,
    cvr: 1.6,
    status: 'active',
    startDate: '2026-04-15',
    endDate: '2026-05-15',
    platform: 'Google + Meta',
    creative: '🎓',
  },
  {
    id: 'CAMP-2024-002',
    name: 'Retargeting Display Ads',
    type: 'retarget',
    industry: 'GSM',
    budget: 3000,
    spent: 2840,
    clicks: 8520,
    conversions: 73,
    cpc: 0.33,
    cvr: 0.86,
    status: 'active',
    startDate: '2026-04-10',
    endDate: '2026-05-10',
    platform: 'Meta + TikTok',
    creative: '🎯',
  },
  {
    id: 'CAMP-2024-003',
    name: 'Pakistan Pilot Awareness',
    type: 'awareness',
    industry: 'All',
    budget: 8000,
    spent: 5120,
    clicks: 24180,
    conversions: 412,
    cpc: 0.21,
    cvr: 1.7,
    status: 'active',
    startDate: '2026-04-01',
    endDate: '2026-06-01',
    platform: 'YouTube + Google',
    creative: '🇵🇰',
  },
  {
    id: 'CAMP-2024-004',
    name: 'Wellness Q2 Push',
    type: 'banner',
    industry: 'WMS',
    budget: 2500,
    spent: 2500,
    clicks: 6320,
    conversions: 89,
    cpc: 0.4,
    cvr: 1.4,
    status: 'completed',
    startDate: '2026-03-01',
    endDate: '2026-04-15',
    platform: 'Meta',
    creative: '🏥',
  },
  {
    id: 'CAMP-2024-005',
    name: 'Legal Services Awareness',
    type: 'awareness',
    industry: 'OLS',
    budget: 4000,
    spent: 0,
    clicks: 0,
    conversions: 0,
    cpc: 0,
    cvr: 0,
    status: 'pending',
    startDate: '2026-05-01',
    endDate: '2026-06-30',
    platform: 'LinkedIn',
    creative: '⚖️',
  },
  {
    id: 'CAMP-2024-006',
    name: 'Job Match Spring',
    type: 'banner',
    industry: 'JPS',
    budget: 1500,
    spent: 920,
    clicks: 2840,
    conversions: 18,
    cpc: 0.32,
    cvr: 0.6,
    status: 'paused',
    startDate: '2026-04-20',
    endDate: '2026-05-20',
    platform: 'LinkedIn',
    creative: '💼',
  },
];

const TYPE_META: Record<string, { label: string; color: string }> = {
  banner: { label: 'Banner', color: '#7B6EF6' },
  retarget: { label: 'Retargeting', color: '#2BBFA0' },
  awareness: { label: 'Awareness', color: '#F0A030' },
};

export default function CampaignsPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'pending' | 'paused' | 'completed'>('all');

  const filtered = CAMPAIGNS.filter((c) => filter === 'all' || c.status === filter);
  const totalClicks = CAMPAIGNS.reduce((s, c) => s + c.clicks, 0);
  const totalConversions = CAMPAIGNS.reduce((s, c) => s + c.conversions, 0);
  const totalSpent = CAMPAIGNS.reduce((s, c) => s + c.spent, 0);
  const avgCvr = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

  return (
    <>
      <DmoTopbar
        title="Campaign Management"
        subtitle="Create, track, manage marketing campaigns, and analyze performance"
        breadcrumb={['Operations', 'Campaigns']}
      />
      <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
        {/* KPIs strip */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Total Clicks (30d)"
            value={totalClicks.toLocaleString()}
            delta={`${CAMPAIGNS.filter((c) => c.status === 'active').length} active campaigns`}
            tone="purple"
            icon="👆"
          />
          <KpiCard
            label="Total Signups"
            value={totalConversions.toLocaleString()}
            delta="From campaign attribution"
            tone="ok"
            icon="✅"
          />
          <KpiCard
            label="Avg Conversion Rate"
            value={`${avgCvr.toFixed(1)}%`}
            delta={avgCvr > 1.5 ? '↑ above target' : '↓ below target'}
            tone={avgCvr > 1.5 ? 'ok' : 'amber'}
            icon="📊"
          />
          <KpiCard
            label="Total Spend"
            value={`$${totalSpent.toLocaleString()}`}
            delta={`$${(totalSpent / totalClicks).toFixed(2)} CPC`}
            tone="amber"
            icon="💰"
          />
        </div>

        {/* Hero campaign banner */}
        <div className="grid gap-3 lg:grid-cols-2">
          {CAMPAIGNS.slice(0, 2).map((c) => {
            const typeMeta = TYPE_META[c.type] || TYPE_META.banner;
            return (
              <PlasticCard
                key={c.id}
                className="overflow-hidden p-0"
                style={{ borderTop: `3px solid ${typeMeta.color}` }}
              >
                <div
                  className="px-5 py-4"
                  style={{
                    background: `linear-gradient(135deg, ${typeMeta.color}22 0%, transparent 100%)`,
                  }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl"
                        style={{
                          background: `${typeMeta.color}33`,
                          border: `1px solid ${typeMeta.color}55`,
                        }}
                      >
                        {c.creative}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2">
                          <Chip tone="purple">{typeMeta.label}</Chip>
                          <Chip tone="ok">{c.status}</Chip>
                        </div>
                        <h3 className="mt-1 text-lg font-bold">{c.name}</h3>
                        <p className="mt-0.5 text-xs text-white/60">
                          {c.industry} · {c.platform} · {c.startDate} → {c.endDate}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-wider text-white/40">Conversions</div>
                      <div className="text-2xl font-bold tabular-nums text-teal">{c.conversions}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 px-5 py-3">
                  <div className="text-center">
                    <div className="text-[9px] text-white/40">CLICKS</div>
                    <div className="mt-0.5 text-sm font-bold tabular-nums">{c.clicks.toLocaleString()}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[9px] text-white/40">CVR</div>
                    <div className="mt-0.5 text-sm font-bold tabular-nums text-teal">{c.cvr.toFixed(2)}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[9px] text-white/40">CPC</div>
                    <div className="mt-0.5 text-sm font-bold tabular-nums text-amber">${c.cpc.toFixed(2)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[9px] text-white/40">SPEND</div>
                    <div className="mt-0.5 text-sm font-bold tabular-nums">
                      ${c.spent.toLocaleString()}
                      <span className="text-[9px] text-white/40">/${c.budget.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-glass px-5 py-2">
                  <div className="h-1 overflow-hidden rounded-full bg-nested">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(c.spent / c.budget) * 100}%`,
                        background: typeMeta.color,
                      }}
                    />
                  </div>
                </div>
              </PlasticCard>
            );
          })}
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap items-center gap-2">
          {(['all', 'active', 'pending', 'paused', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-pill border px-3 py-1.5 text-xs transition ${
                filter === f
                  ? 'border-purple-light bg-purple-light/15 text-purple-light'
                  : 'border-glass bg-card/40 text-white/60 hover:border-purple-light/50'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}{' '}
              {f !== 'all' && `(${CAMPAIGNS.filter((c) => c.status === f).length})`}
            </button>
          ))}
          <div className="flex-1" />
          <Button3D variant="purple" size="sm">
            + Create Campaign
          </Button3D>
        </div>

        {/* Campaigns table */}
        <PlasticCard className="overflow-hidden">
          <div className="border-b border-glass px-5 py-4">
            <h3 className="text-lg font-semibold">{filtered.length} campaigns</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-card/40 text-left text-[10px] uppercase tracking-wider text-white/40">
                <tr>
                  <th className="px-5 py-3">Campaign</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Platform</th>
                  <th className="px-5 py-3">Clicks</th>
                  <th className="px-5 py-3">Conv.</th>
                  <th className="px-5 py-3">CVR</th>
                  <th className="px-5 py-3">Spend / Budget</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-glass">
                {filtered.map((c) => {
                  const tm = TYPE_META[c.type] || TYPE_META.banner;
                  const burnRate = c.budget > 0 ? c.spent / c.budget : 0;
                  return (
                    <tr key={c.id} className="hover:bg-card/30">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{c.creative}</span>
                          <div>
                            <div className="font-medium">{c.name}</div>
                            <div className="text-[9px] text-white/40">{c.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <Chip tone="purple">{tm.label}</Chip>
                      </td>
                      <td className="px-5 py-3 text-xs text-white/60">{c.platform}</td>
                      <td className="px-5 py-3 tabular-nums">{c.clicks.toLocaleString()}</td>
                      <td className="px-5 py-3 tabular-nums font-bold text-teal">{c.conversions}</td>
                      <td className="px-5 py-3 tabular-nums">
                        <Chip tone={c.cvr >= 1.5 ? 'ok' : c.cvr >= 1 ? 'warn' : 'fail'}>
                          {c.cvr.toFixed(2)}%
                        </Chip>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-12 overflow-hidden rounded-full bg-nested">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${Math.min(100, burnRate * 100)}%`,
                                background: tm.color,
                              }}
                            />
                          </div>
                          <span className="text-[10px] tabular-nums text-white/60">
                            ${c.spent.toLocaleString()}/{(c.budget / 1000).toFixed(0)}K
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <Chip
                          tone={
                            c.status === 'active'
                              ? 'ok'
                              : c.status === 'paused'
                              ? 'warn'
                              : c.status === 'pending'
                              ? 'purple'
                              : 'default'
                          }
                        >
                          {c.status}
                        </Chip>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex justify-end gap-1.5">
                          <button className="rounded border border-glass bg-card/60 px-2 py-1 text-[10px] hover:border-purple-light">
                            View
                          </button>
                          {c.status === 'active' && (
                            <button className="rounded border border-glass bg-card/60 px-2 py-1 text-[10px] hover:border-amber">
                              Pause
                            </button>
                          )}
                          {c.status === 'paused' && (
                            <button className="rounded border border-glass bg-card/60 px-2 py-1 text-[10px] hover:border-teal">
                              Resume
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </PlasticCard>
      </div>
    </>
  );
}
