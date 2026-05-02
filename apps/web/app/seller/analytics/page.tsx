'use client';

import { PublicNav } from '@/components/ui/public-nav';
import { PublicFooter } from '@/components/ui/public-footer';
import { PlasticCard } from '@/components/ui/plastic-card';
import { KpiCard } from '@/components/ui/kpi-card';
import { Chip } from '@/components/ui/chip';
import { Button3D } from '@/components/ui/button-3d';
import Link from 'next/link';

/**
 * EHB Seller Analytics dashboard (Visily prototype screen #3)
 *
 * Seller-side performance dashboard: KPIs (sales, conversions, conversion rate),
 * Clicks vs Conversions chart, Top Performing Products, Product Performance,
 * Recent Payouts.
 */

const KPI_DATA = {
  totalSales: 66231,
  conversionCount: 9165,
  conversionsThisPeriod: 17403,
  conversionRate: 3.8,
  totalSalesDelta: 14.5,
  conversionRateDelta: -0.2,
};

const CLICKS_VS_CONVERSIONS = [
  { day: 'Mon', clicks: 4200, conversions: 142 },
  { day: 'Tue', clicks: 5180, conversions: 198 },
  { day: 'Wed', clicks: 6420, conversions: 240 },
  { day: 'Thu', clicks: 7180, conversions: 287 },
  { day: 'Fri', clicks: 8640, conversions: 332 },
  { day: 'Sat', clicks: 9120, conversions: 365 },
  { day: 'Sun', clicks: 7890, conversions: 314 },
];

const TOP_PRODUCTS = [
  { id: 'P-101', name: 'Enterprise Compliance Suite', revenue: 14500, clicks: 4500, conversions: 145, status: 'active' },
  { id: 'P-102', name: 'Global Tax Mapper Pro', revenue: 9800, clicks: 3200, conversions: 98, status: 'active' },
  { id: 'P-103', name: 'Basic Fraud Detection', revenue: 8500, clicks: 6100, conversions: 210, status: 'active' },
  { id: 'P-104', name: 'Seller Toolkit Add-on', revenue: 2125, clicks: 1900, conversions: 85, status: 'active' },
  { id: 'P-105', name: 'Legacy Support Package', revenue: 1290, clicks: 400, conversions: 12, status: 'paused' },
];

const PRODUCT_PERFORMANCE = [
  { name: 'Enterprise Compliance Suite', category: 'Software', clicks: 4500, conversions: 145, revenue: 14500, status: 'active' },
  { name: 'Global Tax Mapper Pro', category: 'Service', clicks: 3200, conversions: 98, revenue: 9800, status: 'active' },
  { name: 'Basic Fraud Detection', category: 'Software', clicks: 6100, conversions: 210, revenue: 8500, status: 'warning' },
  { name: 'Seller Toolkit Add-on', category: 'Plugin', clicks: 1900, conversions: 85, revenue: 2125, status: 'active' },
  { name: 'Legacy Support Package', category: 'Service', clicks: 400, conversions: 12, revenue: 1290, status: 'inactive' },
];

const RECENT_PAYOUTS = [
  { id: 'PYO-001', date: 'Oct 31, 2023', amount: 3450, status: 'Paid' },
  { id: 'PYO-002', date: 'Sep 18, 2023', amount: 1860.5, status: 'Paid' },
  { id: 'PYO-003', date: 'Aug 22, 2023', amount: 2300, status: 'Pending' },
];

// Build SVG dual-line chart
function ClicksVsConversionsChart() {
  const W = 700;
  const H = 240;
  const padL = 50;
  const padR = 60;
  const padT = 20;
  const padB = 30;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const maxClicks = Math.max(...CLICKS_VS_CONVERSIONS.map((d) => d.clicks));
  const maxConv = Math.max(...CLICKS_VS_CONVERSIONS.map((d) => d.conversions));

  const points = CLICKS_VS_CONVERSIONS.map((d, i) => {
    const x = padL + (i / (CLICKS_VS_CONVERSIONS.length - 1)) * innerW;
    const yClicks = padT + innerH - (d.clicks / maxClicks) * innerH;
    const yConv = padT + innerH - (d.conversions / maxConv) * innerH;
    return { x, yClicks, yConv, ...d };
  });

  function smoothPath(yKey: 'yClicks' | 'yConv'): string {
    if (points.length < 2) return '';
    let path = `M ${points[0].x},${points[0][yKey]}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpx = (p0.x + p1.x) / 2;
      path += ` C ${cpx},${p0[yKey]} ${cpx},${p1[yKey]} ${p1.x},${p1[yKey]}`;
    }
    return path;
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="clicks-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7B6EF6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7B6EF6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="conv-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2BBFA0" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#2BBFA0" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Y axis grid */}
      {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
        <line
          key={i}
          x1={padL}
          y1={padT + innerH - p * innerH}
          x2={W - padR}
          y2={padT + innerH - p * innerH}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
        />
      ))}

      {/* Areas */}
      <path
        d={`${smoothPath('yClicks')} L ${points[points.length - 1].x},${padT + innerH} L ${points[0].x},${padT + innerH} Z`}
        fill="url(#clicks-grad)"
      />
      <path
        d={`${smoothPath('yConv')} L ${points[points.length - 1].x},${padT + innerH} L ${points[0].x},${padT + innerH} Z`}
        fill="url(#conv-grad)"
      />

      {/* Lines */}
      <path
        d={smoothPath('yClicks')}
        fill="none"
        stroke="#7B6EF6"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={smoothPath('yConv')}
        fill="none"
        stroke="#2BBFA0"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Data points */}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.yClicks} r="3" fill="#7B6EF6" stroke="#04060e" strokeWidth="2" />
          <circle cx={p.x} cy={p.yConv} r="3" fill="#2BBFA0" stroke="#04060e" strokeWidth="2" />
        </g>
      ))}

      {/* X labels */}
      {points.map((p, i) => (
        <text
          key={i}
          x={p.x}
          y={H - 10}
          textAnchor="middle"
          fontSize="10"
          fill="rgba(255,255,255,0.5)"
          fontFamily="system-ui,-apple-system,sans-serif"
        >
          {p.day}
        </text>
      ))}

      {/* Legend */}
      <g transform={`translate(${padL}, 8)`}>
        <circle cx="0" cy="0" r="4" fill="#7B6EF6" />
        <text x="8" y="4" fontSize="10" fill="rgba(255,255,255,0.7)" fontFamily="system-ui">
          Clicks
        </text>
        <circle cx="60" cy="0" r="4" fill="#2BBFA0" />
        <text x="68" y="4" fontSize="10" fill="rgba(255,255,255,0.7)" fontFamily="system-ui">
          Conversions
        </text>
      </g>
    </svg>
  );
}

export default function SellerAnalyticsPage() {
  return (
    <>
      <PublicNav />
      <main className="min-h-screen bg-bg pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Header */}
          <section className="pt-8">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <Link href="/seller" className="text-xs text-white/50 hover:text-purple-light">
                ← Back to Seller Hub
              </Link>
              <div className="flex flex-wrap items-center gap-2">
                <select className="rounded-card border border-glass bg-card/40 px-3 py-1.5 text-xs text-white/80">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>This Month</option>
                  <option>This Quarter</option>
                </select>
                <Button3D variant="purple" size="sm">
                  ⬇️ Export CSV
                </Button3D>
                <Link href="/gosellr/sell/new">
                  <Button3D variant="green" size="sm">
                    + New Product
                  </Button3D>
                </Link>
              </div>
            </div>

            <div>
              <Chip tone="purple">Seller Analytics</Chip>
              <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Performance overview</h1>
              <p className="mt-2 text-sm text-white/60">
                Monitor your sales performance, product engagement, and commission payouts.
              </p>
            </div>
          </section>

          {/* KPIs */}
          <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <KpiCard
              label="Total Sales"
              value={`$${KPI_DATA.totalSales.toLocaleString()}`}
              delta={`↑ ${KPI_DATA.totalSalesDelta}% vs last`}
              tone="ok"
              icon="💰"
            />
            <KpiCard
              label="Conversion Count"
              value={KPI_DATA.conversionCount.toLocaleString()}
              delta="last 7 days"
              tone="purple"
              icon="🎯"
            />
            <KpiCard
              label="Conversions This Period"
              value={KPI_DATA.conversionsThisPeriod.toLocaleString()}
              delta="↑ 12% growth"
              tone="teal"
              icon="📈"
            />
            <KpiCard
              label="Conversion Rate"
              value={`${KPI_DATA.conversionRate}%`}
              delta={`${KPI_DATA.conversionRateDelta >= 0 ? '↑' : '↓'} ${Math.abs(KPI_DATA.conversionRateDelta)}% from last period`}
              tone={KPI_DATA.conversionRateDelta >= 0 ? 'ok' : 'amber'}
              icon="🔄"
            />
          </section>

          {/* Clicks vs Conversions chart */}
          <section className="mt-6 grid gap-4 lg:grid-cols-3">
            <PlasticCard className="p-5 lg:col-span-2">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40">
                    📊 Clicks vs Conversions
                  </div>
                  <h3 className="mt-1 text-lg font-semibold">Performance overview for the selected period</h3>
                </div>
              </div>
              <div className="mt-4 overflow-x-auto">
                <ClicksVsConversionsChart />
              </div>
            </PlasticCard>

            {/* Top performing products */}
            <PlasticCard className="overflow-hidden p-0">
              <div className="border-b border-glass px-5 py-4">
                <div className="text-[10px] uppercase tracking-widest text-white/40">🏆 Top Performing Products</div>
                <h3 className="mt-1 text-base font-semibold">By revenue</h3>
              </div>
              <div className="divide-y divide-glass">
                {TOP_PRODUCTS.map((p, i) => (
                  <div key={p.id} className="flex items-center gap-3 px-5 py-3 text-sm">
                    <span className="font-bold text-white/30">#{i + 1}</span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{p.name}</div>
                      <div className="text-[10px] text-white/40">
                        {p.clicks.toLocaleString()} clicks · {p.conversions} conv
                      </div>
                    </div>
                    <span className="shrink-0 text-sm font-bold tabular-nums text-teal">
                      ${p.revenue.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </PlasticCard>
          </section>

          {/* Product Performance + Recent Payouts */}
          <section className="mt-6 grid gap-4 lg:grid-cols-2">
            <PlasticCard className="overflow-hidden">
              <div className="flex items-center justify-between border-b border-glass px-5 py-4">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40">
                    📦 Product Performance
                  </div>
                  <h3 className="mt-1 text-lg font-semibold">Detailed metrics for all your listings</h3>
                </div>
                <input
                  placeholder="Search products..."
                  className="rounded-card border border-glass bg-nested px-3 py-1.5 text-xs"
                />
              </div>
              <table className="w-full text-sm">
                <thead className="bg-card/40 text-left text-[10px] uppercase tracking-wider text-white/40">
                  <tr>
                    <th className="px-5 py-3">Product</th>
                    <th className="px-5 py-3">Cat.</th>
                    <th className="px-5 py-3">Clicks</th>
                    <th className="px-5 py-3">Conv.</th>
                    <th className="px-5 py-3">Revenue</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-glass">
                  {PRODUCT_PERFORMANCE.map((p, i) => (
                    <tr key={i} className="hover:bg-card/30">
                      <td className="px-5 py-3 text-xs font-medium">{p.name}</td>
                      <td className="px-5 py-3">
                        <Chip tone="purple">{p.category}</Chip>
                      </td>
                      <td className="px-5 py-3 tabular-nums text-white/60">{p.clicks.toLocaleString()}</td>
                      <td className="px-5 py-3 tabular-nums">{p.conversions}</td>
                      <td className="px-5 py-3 font-bold tabular-nums text-teal">
                        ${p.revenue.toLocaleString()}
                      </td>
                      <td className="px-5 py-3">
                        <Chip
                          tone={
                            p.status === 'active' ? 'ok' : p.status === 'warning' ? 'warn' : 'fail'
                          }
                        >
                          {p.status}
                        </Chip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </PlasticCard>

            <PlasticCard className="overflow-hidden">
              <div className="border-b border-glass px-5 py-4">
                <div className="text-[10px] uppercase tracking-widest text-white/40">
                  💸 Recent Payouts
                </div>
                <h3 className="mt-1 text-lg font-semibold">Your latest commission transfers</h3>
              </div>
              <div className="divide-y divide-glass">
                {RECENT_PAYOUTS.map((p) => (
                  <div key={p.id} className="flex items-center gap-3 px-5 py-4">
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-xs text-white/40">{p.id}</div>
                      <div className="mt-0.5 text-sm">{p.date}</div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="text-base font-bold tabular-nums text-teal">
                        ${p.amount.toFixed(2)}
                      </div>
                      <Chip tone={p.status === 'Paid' ? 'ok' : 'warn'}>{p.status}</Chip>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-glass px-5 py-3 text-center">
                <button className="text-xs text-purple-light hover:underline">View All Payouts →</button>
              </div>
            </PlasticCard>
          </section>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
