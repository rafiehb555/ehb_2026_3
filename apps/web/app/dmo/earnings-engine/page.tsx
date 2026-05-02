'use client';

import { DmoTopbar } from '@/components/dmo/topbar';
import { PlasticCard } from '@/components/ui/plastic-card';
import { KpiCard } from '@/components/ui/kpi-card';
import { Chip } from '@/components/ui/chip';

const SPLIT = [
  { label: 'Seller', pct: 70, color: '#2BBFA0', desc: '70% direct to seller / provider' },
  { label: 'Rider', pct: 10, color: '#F0A030', desc: '10% to rider on delivery' },
  { label: 'Franchise network', pct: 10, color: '#7B6EF6', desc: 'Split 40/25/20/15' },
  { label: 'EHB platform', pct: 10, color: '#ec4899', desc: '10% to EHB HQ' },
];

const FRANCHISE_SUB = [
  { label: 'Company (EHB)', pct: 40, color: '#7B6EF6' },
  { label: 'Sub franchise', pct: 25, color: '#2BBFA0' },
  { label: 'Master', pct: 20, color: '#F0A030' },
  { label: 'Corporate', pct: 15, color: '#ec4899' },
];

const RECENT_SETTLEMENTS = [
  { orderId: 'ORD-DEMO-00042', total: 180, seller: 126, rider: 18, franchise: 18, ehb: 18, at: '2m ago' },
  { orderId: 'ORD-DEMO-00041', total: 220, seller: 154, rider: 22, franchise: 22, ehb: 22, at: '12m ago' },
  { orderId: 'ORD-DEMO-00040', total: 95, seller: 66.5, rider: 9.5, franchise: 9.5, ehb: 9.5, at: '28m ago' },
  { orderId: 'ORD-DEMO-00039', total: 450, seller: 315, rider: 45, franchise: 45, ehb: 45, at: '1h ago' },
  { orderId: 'ORD-DEMO-00038', total: 62, seller: 43.4, rider: 6.2, franchise: 6.2, ehb: 6.2, at: '2h ago' },
];

export default function EarningsEnginePage() {
  const totalToday = RECENT_SETTLEMENTS.reduce((a, b) => a + b.total, 0);

  return (
    <>
      <DmoTopbar
        title="Earnings Engine"
        subtitle="70/10/10/10 split + 40/25/20/15 franchise sub-split · settlement ledger"
        breadcrumb={['Operations', 'Earnings']}
      />
      <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Settled today" value={`$${totalToday.toFixed(0)}`} tone="ok" icon="💰" />
          <KpiCard label="EHB cut today" value={`$${(totalToday * 0.1).toFixed(2)}`} delta="10%" tone="purple" icon="🏛️" />
          <KpiCard label="Franchise cut" value={`$${(totalToday * 0.1).toFixed(2)}`} delta="10% split 40/25/20/15" tone="amber" icon="🌐" />
          <KpiCard label="Pending payout" value="$842" tone="teal" icon="⏳" />
        </div>

        {/* Split visualization */}
        <div className="grid gap-4 lg:grid-cols-2">
          <PlasticCard className="p-5">
            <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
              Revenue split · Every order
            </div>
            <h3 className="mt-1 text-lg font-semibold">70/10/10/10 distribution</h3>
            <div className="mt-4 space-y-3">
              {SPLIT.map((s) => (
                <div key={s.label}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-white/80">{s.label}</span>
                    <span className="font-semibold tabular-nums" style={{ color: s.color }}>
                      {s.pct}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-chip bg-white/5">
                    <div
                      className="h-full rounded-chip"
                      style={{ width: `${s.pct}%`, background: s.color }}
                    />
                  </div>
                  <div className="mt-1 text-[10px] text-white/50">{s.desc}</div>
                </div>
              ))}
            </div>
          </PlasticCard>

          <PlasticCard className="p-5">
            <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
              Franchise 10% sub-split
            </div>
            <h3 className="mt-1 text-lg font-semibold">40 / 25 / 20 / 15</h3>
            <div className="mt-4 space-y-3">
              {FRANCHISE_SUB.map((s) => (
                <div key={s.label}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-white/80">{s.label}</span>
                    <span className="font-semibold tabular-nums" style={{ color: s.color }}>
                      {s.pct}% (of 10%)
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-chip bg-white/5">
                    <div
                      className="h-full rounded-chip"
                      style={{ width: `${s.pct}%`, background: s.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-card border border-glass bg-nested/60 p-3 text-[11px] text-white/60">
              Per-order math on $100 order: Company $4, Sub $2.50, Master $2, Corporate $1.50.
            </div>
          </PlasticCard>
        </div>

        {/* Recent settlements */}
        <PlasticCard className="p-0">
          <div className="flex items-center justify-between border-b border-glass px-4 py-3 sm:px-5 sm:py-4">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                Recent settlements
              </div>
              <h3 className="mt-1 text-sm font-semibold sm:text-lg">
                Commission ledger — auto-settled on confirm-delivery
              </h3>
            </div>
            <Chip tone="ok">Live</Chip>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead>
                <tr className="border-b border-glass text-[11px] uppercase text-white/40">
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3 text-right">Total</th>
                  <th className="px-4 py-3 text-right text-[#2BBFA0]">Seller</th>
                  <th className="px-4 py-3 text-right text-[#F0A030]">Rider</th>
                  <th className="px-4 py-3 text-right text-[#7B6EF6]">Franchise</th>
                  <th className="px-4 py-3 text-right text-[#ec4899]">EHB</th>
                  <th className="px-4 py-3">When</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {RECENT_SETTLEMENTS.map((s) => (
                  <tr key={s.orderId}>
                    <td className="px-4 py-3 font-mono text-xs">{s.orderId}</td>
                    <td className="px-4 py-3 text-right font-semibold tabular-nums">${s.total}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-[#2BBFA0]">${s.seller}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-[#F0A030]">${s.rider}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-[#7B6EF6]">${s.franchise}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-[#ec4899]">${s.ehb}</td>
                    <td className="px-4 py-3 text-xs text-white/50">{s.at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PlasticCard>
      </div>
    </>
  );
}
