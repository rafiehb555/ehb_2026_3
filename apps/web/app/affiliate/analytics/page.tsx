'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CompliancePortalLayout } from '@/components/portal/layout';
import { PlasticCard } from '@/components/ui/plastic-card';
import { KpiCard } from '@/components/ui/kpi-card';
import { Chip } from '@/components/ui/chip';
import { Button3D } from '@/components/ui/button-3d';

/**
 * EHB Affiliate — Analytics page (§6.5 from Affiliate.md)
 *
 * Click tracking · Conversion funnel · Product breakdown ·
 * Geographic distribution · Time trends.
 */

const FUNNEL = [
  { stage: 'Clicks', count: 24180, pct: 100, color: '#7B6EF6' },
  { stage: 'Signups', count: 1842, pct: 7.6, color: '#A098F8' },
  { stage: 'Verified (KYC)', count: 1245, pct: 5.1, color: '#2BBFA0' },
  { stage: 'First purchase', count: 412, pct: 1.7, color: '#38C878' },
];

const TOP_PRODUCTS_BY_CLICKS = [
  { name: 'OBS Pro Annual', clicks: 4820, conv: 142, revenue: 14500, cat: 'OBS' },
  { name: 'Wellness 3-Mo Plan', clicks: 3210, conv: 98, revenue: 9800, cat: 'WMS' },
  { name: 'Legal Consult Premium', clicks: 2890, conv: 67, revenue: 8500, cat: 'OLS' },
  { name: 'GoSellr Bundle', clicks: 2640, conv: 89, revenue: 6200, cat: 'GSM' },
  { name: 'IT Audit Package', clicks: 1820, conv: 34, revenue: 5400, cat: 'ITS' },
];

const GEO_BREAKDOWN = [
  { country: '🇵🇰 Pakistan', signups: 1245, pct: 67.6, revenue: 32400 },
  { country: '🇦🇪 UAE', signups: 248, pct: 13.5, revenue: 8200 },
  { country: '🇮🇳 India', signups: 142, pct: 7.7, revenue: 4100 },
  { country: '🇬🇧 UK', signups: 89, pct: 4.8, revenue: 3800 },
  { country: '🇺🇸 USA', signups: 64, pct: 3.5, revenue: 2900 },
  { country: '🌍 Others', signups: 54, pct: 2.9, revenue: 1100 },
];

const DAILY_TREND = [
  { day: 'Mon', clicks: 2840, signups: 198, revenue: 1240 },
  { day: 'Tue', clicks: 3120, signups: 215, revenue: 1380 },
  { day: 'Wed', clicks: 2980, signups: 187, revenue: 1190 },
  { day: 'Thu', clicks: 3540, signups: 248, revenue: 1620 },
  { day: 'Fri', clicks: 4120, signups: 312, revenue: 1980 },
  { day: 'Sat', clicks: 4480, signups: 342, revenue: 2240 },
  { day: 'Sun', clicks: 3100, signups: 240, revenue: 1490 },
];

export default function AffiliateAnalyticsPage() {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('7d');
  const maxRevenue = Math.max(...DAILY_TREND.map((d) => d.revenue));

  return (
    <CompliancePortalLayout title="Analytics" breadcrumb={['Affiliate', 'Analytics']}>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <Chip tone="purple">§6.5 Analytics</Chip>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Performance Analytics</h1>
            <p className="mt-1 text-sm text-white/60">
              Click tracking · conversion funnel · top products · geographic + time-trend insights
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as any)}
              className="rounded-card border border-glass bg-card/40 px-3 py-1.5 text-xs"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <Button3D variant="purple" size="sm">⬇️ Export CSV</Button3D>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid gap-3 grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Total Clicks" value="24,180" delta="↑ 18% vs last period" tone="purple" icon="👆" />
          <KpiCard label="Unique Visitors" value="18,420" delta="76% of clicks" tone="teal" icon="👀" />
          <KpiCard label="Conversion Rate" value="1.7%" delta="↓ 0.2% from last" tone="amber" icon="🔄" />
          <KpiCard label="Total Revenue" value="$42,180" delta="↑ 14.5% growth" tone="ok" icon="💰" />
        </div>

        {/* Conversion Funnel */}
        <PlasticCard className="p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/40">🔻 Conversion Funnel</div>
              <h3 className="mt-1 text-base font-semibold">Click → Signup → Verified → First Purchase</h3>
            </div>
            <Chip tone="ok">1.7% end-to-end</Chip>
          </div>
          <div className="mt-4 space-y-2">
            {FUNNEL.map((f, i) => {
              const widthPct = (f.count / FUNNEL[0].count) * 100;
              const dropFromPrev = i > 0 ? ((FUNNEL[i - 1].count - f.count) / FUNNEL[i - 1].count) * 100 : 0;
              return (
                <div key={f.stage}>
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="font-medium">{f.stage}</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold tabular-nums" style={{ color: f.color }}>
                        {f.count.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-white/40">({f.pct}% of clicks)</span>
                      {i > 0 && (
                        <Chip tone="fail">−{dropFromPrev.toFixed(1)}% drop-off</Chip>
                      )}
                    </div>
                  </div>
                  <div className="mt-1.5 h-7 overflow-hidden rounded-card bg-nested">
                    <div
                      className="flex h-full items-center justify-end px-3 text-xs font-bold text-white"
                      style={{
                        width: `${widthPct}%`,
                        background: `linear-gradient(90deg, ${f.color}aa, ${f.color})`,
                      }}
                    >
                      {f.count.toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </PlasticCard>

        {/* Daily Trend Chart */}
        <PlasticCard className="p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/40">📈 Daily Trend (last 7 days)</div>
              <h3 className="mt-1 text-base font-semibold">Clicks · Signups · Revenue</h3>
            </div>
          </div>
          <div className="mt-4 flex h-52 items-end gap-2">
            {DAILY_TREND.map((d, i) => {
              const heightPct = (d.revenue / maxRevenue) * 100;
              const isLast = i === DAILY_TREND.length - 1;
              return (
                <div key={d.day} className="relative flex flex-1 flex-col items-center justify-end gap-1">
                  <div className="absolute -top-6 text-[10px] font-bold text-teal">${d.revenue}</div>
                  <div
                    className="w-full rounded-t bg-gradient-to-t from-purple-light to-teal transition"
                    style={{ height: `${heightPct}%`, opacity: isLast ? 1 : 0.7 }}
                  />
                  <div className="text-[10px] text-white/50">{d.day}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex justify-around text-[10px] text-white/50">
            <span>Clicks: {DAILY_TREND.reduce((s, d) => s + d.clicks, 0).toLocaleString()}</span>
            <span>Signups: {DAILY_TREND.reduce((s, d) => s + d.signups, 0).toLocaleString()}</span>
            <span>Revenue: ${DAILY_TREND.reduce((s, d) => s + d.revenue, 0).toLocaleString()}</span>
          </div>
        </PlasticCard>

        {/* Top Products + Geo Breakdown */}
        <div className="grid gap-4 lg:grid-cols-2">
          <PlasticCard className="overflow-hidden p-0">
            <div className="border-b border-glass px-5 py-4">
              <div className="text-[10px] uppercase tracking-widest text-white/40">🏆 Top Products by Clicks</div>
              <h3 className="mt-1 text-base font-semibold">Highest-engagement listings</h3>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-card/40 text-left text-[10px] uppercase tracking-wider text-white/40">
                <tr>
                  <th className="px-5 py-3">Product</th>
                  <th className="px-5 py-3">Clicks</th>
                  <th className="px-5 py-3">Conv.</th>
                  <th className="px-5 py-3">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-glass">
                {TOP_PRODUCTS_BY_CLICKS.map((p) => (
                  <tr key={p.name} className="hover:bg-card/30">
                    <td className="px-5 py-3">
                      <div className="font-medium">{p.name}</div>
                      <Chip tone="purple">{p.cat}</Chip>
                    </td>
                    <td className="px-5 py-3 tabular-nums">{p.clicks.toLocaleString()}</td>
                    <td className="px-5 py-3 tabular-nums text-teal">{p.conv}</td>
                    <td className="px-5 py-3 font-bold tabular-nums text-amber">${p.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PlasticCard>

          <PlasticCard className="overflow-hidden p-0">
            <div className="border-b border-glass px-5 py-4">
              <div className="text-[10px] uppercase tracking-widest text-white/40">🌍 Geographic Breakdown</div>
              <h3 className="mt-1 text-base font-semibold">Signups by country</h3>
            </div>
            <div className="divide-y divide-glass">
              {GEO_BREAKDOWN.map((g) => (
                <div key={g.country} className="flex items-center gap-3 px-5 py-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="font-medium">{g.country}</span>
                      <span className="font-bold tabular-nums">{g.signups.toLocaleString()}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-nested">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-light to-teal"
                        style={{ width: `${g.pct}%` }}
                      />
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[10px] text-white/50">
                      <span>{g.pct}% of total</span>
                      <span>${g.revenue.toLocaleString()} revenue</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PlasticCard>
        </div>

        {/* Per-link click tracking */}
        <PlasticCard className="p-5">
          <div className="text-[10px] uppercase tracking-widest text-white/40">🔗 Per-Link Performance</div>
          <h3 className="mt-1 text-base font-semibold">Your top referral links</h3>
          <div className="mt-4 space-y-2">
            {[
              { link: 'ehb.com/?ref=sjenkins-PRO', clicks: 8420, signups: 412, conv: '4.9%', revenue: 14500 },
              { link: 'ehb.com/product/obs-pro?ref=sjenkins-PRO', clicks: 4820, signups: 142, conv: '2.9%', revenue: 9200 },
              { link: 'ehb.com/affiliate/marketplace?ref=sjenkins-PRO', clicks: 3120, signups: 87, conv: '2.8%', revenue: 6400 },
              { link: 'ehb.com/franchise?ref=sjenkins-PRO', clicks: 1240, signups: 24, conv: '1.9%', revenue: 8900 },
            ].map((l, i) => (
              <div key={i} className="rounded-card border border-glass bg-card/40 p-3">
                <code className="block truncate font-mono text-[11px] text-teal">{l.link}</code>
                <div className="mt-2 grid grid-cols-4 gap-2 text-center text-[11px]">
                  <div>
                    <div className="text-white/40">CLICKS</div>
                    <div className="font-bold tabular-nums">{l.clicks.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-white/40">SIGNUPS</div>
                    <div className="font-bold tabular-nums text-purple-light">{l.signups}</div>
                  </div>
                  <div>
                    <div className="text-white/40">CONV</div>
                    <div className="font-bold tabular-nums text-teal">{l.conv}</div>
                  </div>
                  <div>
                    <div className="text-white/40">REVENUE</div>
                    <div className="font-bold tabular-nums text-amber">${l.revenue.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PlasticCard>
      </div>
    </CompliancePortalLayout>
  );
}
