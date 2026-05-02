'use client';

import { DmoTopbar } from '@/components/dmo/topbar';
import { PlasticCard } from '@/components/ui/plastic-card';
import { KpiCard } from '@/components/ui/kpi-card';
import { Chip } from '@/components/ui/chip';

const MONTHLY_REVENUE = [
  { month: 'Jan', value: 8500 },
  { month: 'Feb', value: 12200 },
  { month: 'Mar', value: 15800 },
  { month: 'Apr', value: 18400 },
];

const INDUSTRY_SPLIT = [
  { industry: 'GoSellr', orders: 1842, revenue: 14200, color: '#2BBFA0' },
  { industry: 'WMS (Medical)', orders: 312, revenue: 5600, color: '#F05858' },
  { industry: 'OLS (Legal)', orders: 96, revenue: 4200, color: '#7B6EF6' },
  { industry: 'HPS (Education)', orders: 420, revenue: 2800, color: '#F0A030' },
  { industry: 'JPS (Jobs)', orders: 156, revenue: 1800, color: '#3b82f6' },
];

const COHORT = [
  { week: 'W-12', signups: 42, retained4w: 34, retained12w: 28 },
  { week: 'W-8',  signups: 68, retained4w: 52, retained12w: 0 },
  { week: 'W-4',  signups: 95, retained4w: 71, retained12w: 0 },
  { week: 'W-0',  signups: 142, retained4w: 0, retained12w: 0 },
];

export default function AnalyticsPage() {
  const maxRev = Math.max(...MONTHLY_REVENUE.map((m) => m.value));
  const totalRev = INDUSTRY_SPLIT.reduce((a, b) => a + b.revenue, 0);

  return (
    <>
      <DmoTopbar
        title="Analytics"
        subtitle="KPI dashboards · cohorts · industry breakdown · trend charts"
        breadcrumb={['Intelligence', 'Analytics']}
      />
      <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="MTD revenue" value="$18.4K" delta="+22% MoM" tone="ok" icon="📈" />
          <KpiCard label="Orders MTD" value="2,826" tone="teal" icon="📦" />
          <KpiCard label="Active franchises" value="10" delta="5 pending" tone="purple" icon="🌐" />
          <KpiCard label="STL L7+ users" value="24" delta="+6 this month" tone="amber" icon="👑" />
        </div>

        {/* Revenue trend */}
        <PlasticCard className="p-5">
          <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
            Revenue trend
          </div>
          <h3 className="mt-1 text-lg font-semibold">Monthly platform revenue (USD)</h3>
          <div className="mt-5 flex items-end gap-2 sm:gap-4" style={{ height: 200 }}>
            {MONTHLY_REVENUE.map((m) => {
              const pct = (m.value / maxRev) * 100;
              return (
                <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                  <div className="w-full flex-1 flex items-end">
                    <div
                      className="w-full rounded-card bg-gradient-to-t from-[#7B6EF6] to-[#2BBFA0] shadow-lg"
                      style={{ height: `${pct}%`, minHeight: 12 }}
                    />
                  </div>
                  <div className="text-[11px] font-semibold text-white/70">{m.month}</div>
                  <div className="text-[11px] tabular-nums text-white/50">
                    ${(m.value / 1000).toFixed(1)}K
                  </div>
                </div>
              );
            })}
          </div>
        </PlasticCard>

        {/* Industry split */}
        <div className="grid gap-4 lg:grid-cols-2">
          <PlasticCard className="p-5">
            <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
              Industry split
            </div>
            <h3 className="mt-1 text-lg font-semibold">Revenue by industry (MTD)</h3>
            <div className="mt-4 space-y-3">
              {INDUSTRY_SPLIT.map((i) => {
                const pct = (i.revenue / totalRev) * 100;
                return (
                  <div key={i.industry}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-white/80">{i.industry}</span>
                      <span className="tabular-nums text-white/60">
                        ${i.revenue.toLocaleString()} · {i.orders} orders
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-chip bg-white/5">
                      <div
                        className="h-full rounded-chip"
                        style={{ width: `${pct}%`, background: i.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </PlasticCard>

          <PlasticCard className="p-5">
            <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
              User cohorts
            </div>
            <h3 className="mt-1 text-lg font-semibold">Signup cohort retention</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead className="text-[11px] uppercase text-white/40">
                  <tr>
                    <th className="py-2">Cohort</th>
                    <th className="py-2 text-right">Signups</th>
                    <th className="py-2 text-right">4-wk</th>
                    <th className="py-2 text-right">12-wk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {COHORT.map((c) => (
                    <tr key={c.week}>
                      <td className="py-2 font-semibold">{c.week}</td>
                      <td className="py-2 text-right tabular-nums">{c.signups}</td>
                      <td className="py-2 text-right tabular-nums text-teal">
                        {c.retained4w || '—'}
                      </td>
                      <td className="py-2 text-right tabular-nums text-amber">
                        {c.retained12w || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 text-[11px] text-white/40">
              4-wk retention hovering ~75%, healthy for marketplace cold-start phase.
            </div>
          </PlasticCard>
        </div>

        {/* Regional heatmap stub */}
        <PlasticCard className="p-5">
          <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
            Regional activity
          </div>
          <h3 className="mt-1 text-lg font-semibold">Top zones by order count</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { zone: 'Islamabad', orders: 842, growth: '+18%' },
              { zone: 'Lahore', orders: 612, growth: '+12%' },
              { zone: 'Karachi', orders: 524, growth: '+24%' },
              { zone: 'Rawalpindi', orders: 342, growth: '+8%' },
            ].map((z) => (
              <div key={z.zone} className="rounded-card border border-glass bg-nested/60 p-4">
                <div className="text-sm font-semibold">{z.zone}</div>
                <div className="mt-2 text-2xl font-bold tabular-nums">
                  {z.orders.toLocaleString()}
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs">
                  <Chip tone="ok">{z.growth}</Chip>
                  <span className="text-white/40">MoM</span>
                </div>
              </div>
            ))}
          </div>
        </PlasticCard>
      </div>
    </>
  );
}
