'use client';

import Link from 'next/link';
import { MobileBottomNav } from '@/components/affiliate/mobile-bottom-nav';
import { Chip } from '@/components/ui/chip';

/**
 * EHB Affiliate — Mobile Dashboard (Visily mobile prototype #17)
 *
 * Mobile-first 390px viewport with: status bar, header with bell,
 * Earnings Cap Reached alert, KPIs, daily cap progress, 7-day chart,
 * Quick Promote, Recent Activity, bottom tab nav.
 */

const RECENT_ACTIVITY = [
  { icon: '⚖️', name: 'EHB Legal Suite Pro', from: 'Acme Corp', amount: 150, status: 'PAID', when: 'Today, 2:45 PM' },
  { icon: '🛡️', name: 'Compliance Audit Tool', from: 'TechStart Inc', amount: 75.5, status: 'PENDING', when: 'Today, 11:20 AM' },
  { icon: '📈', name: 'Volume Bonus - Tier 1', from: 'System', amount: 500, status: 'PAID', when: 'Yesterday, 5:00 PM' },
  { icon: '🎓', name: 'EHB Basic License', from: 'Global Retailers', amount: 25, status: 'PAID', when: 'Oct 24, 9:15 AM' },
];

const QUICK_PROMOTE = [
  { name: 'Legal Suite Pro', rate: '20%', img: '⚖️' },
  { name: 'Audit Tool X', rate: '15%', img: '🛡️' },
  { name: 'Compliance', rate: '10%', img: '📋' },
];

const SEVEN_DAY = [
  { d: 'Mon', v: 280 },
  { d: 'Tue', v: 380 },
  { d: 'Wed', v: 320 },
  { d: 'Thu', v: 480 },
  { d: 'Fri', v: 360 },
  { d: 'Sat', v: 555 },
  { d: 'Sun', v: 412 },
];

export default function MobileAffiliateDashboard() {
  const max = Math.max(...SEVEN_DAY.map((d) => d.v));

  return (
    <div className="min-h-screen bg-bg pb-24">
      {/* iOS-style status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 text-xs font-semibold">
        <span>9:41</span>
        <span className="flex items-center gap-1">
          <span>📶</span>
          <span>📶</span>
          <span>🔋</span>
        </span>
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-5 py-3">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full border border-glass bg-card/40">
          <span className="text-base">🔔</span>
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-400 text-[8px] font-bold text-white">
            3
          </span>
        </button>
      </header>

      {/* Earnings Cap Reached banner */}
      <div className="mx-4 rounded-card border-2 border-amber/40 bg-amber/10 p-3">
        <div className="flex items-start gap-2">
          <span className="text-lg">⚠️</span>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold text-amber">Earnings Cap Reached</div>
            <p className="mt-0.5 text-[10px] leading-snug text-white/70">
              You've hit your daily limit of $500. Further earnings today are being routed to the throttled overflow pool for DMO review.
            </p>
          </div>
          <span className="shrink-0 text-amber">→</span>
        </div>
      </div>

      {/* KPIs row */}
      <div className="mx-4 mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-card border border-glass bg-card/40 p-3">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-wider text-white/50">This Month</span>
            <span className="text-[8px] text-teal">$</span>
          </div>
          <div className="mt-1 text-xl font-bold tabular-nums">$12,450</div>
          <div className="text-[10px] text-teal">↑ 14.5% vs last</div>
        </div>
        <div className="rounded-card border border-glass bg-card/40 p-3">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-wider text-white/50">Active Referrals</span>
          </div>
          <div className="mt-1 text-xl font-bold tabular-nums">342</div>
          <div className="text-[10px] text-teal">↑ +12 this week</div>
        </div>
      </div>

      {/* Daily Cap Progress */}
      <div className="mx-4 mt-3 rounded-card border border-glass bg-card/40 p-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider text-white/50">Daily Cap Progress</span>
          <span className="text-[10px] font-bold text-amber">OVERFLOW</span>
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-lg font-bold tabular-nums">$550</span>
          <span className="text-xs text-white/60">/ $500</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-nested">
          <div className="h-full rounded-full bg-gradient-to-r from-purple-light via-amber to-red-400" style={{ width: '110%' }} />
        </div>
      </div>

      {/* 7-Day Earnings */}
      <div className="mx-4 mt-3 rounded-card border border-glass bg-card/40 p-3">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-white/50">7-Day Earnings</div>
            <div className="mt-0.5 text-[10px] text-white/40">Net commissions vs daily cap</div>
          </div>
          <span className="text-lg font-bold tabular-nums">$2,785</span>
        </div>
        <div className="mt-3 flex h-24 items-end gap-1">
          {SEVEN_DAY.map((d, i) => {
            const isLast = i === SEVEN_DAY.length - 1;
            const heightPct = (d.v / max) * 100;
            return (
              <div key={i} className="relative flex flex-1 flex-col items-center justify-end">
                <div
                  className="w-full rounded-t bg-gradient-to-t from-purple-light to-teal"
                  style={{ height: `${heightPct}%`, opacity: isLast ? 1 : 0.7 }}
                />
                <span className="mt-1 text-[9px] text-white/50">{d.d}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Promote */}
      <div className="mx-4 mt-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-base font-bold">Quick Promote</h2>
          <Link href="/m/affiliate/marketplace" className="text-xs text-purple-light">
            View All →
          </Link>
        </div>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {QUICK_PROMOTE.map((p) => (
            <div
              key={p.name}
              className="shrink-0 w-32 overflow-hidden rounded-card border border-glass bg-card/40"
            >
              <div className="flex h-20 items-center justify-center bg-gradient-to-br from-purple-light/20 to-teal/20 text-4xl">
                {p.img}
              </div>
              <div className="p-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold">{p.rate}</span>
                </div>
                <div className="mt-0.5 truncate text-[11px] font-medium">{p.name}</div>
                <button className="mt-1.5 w-full rounded border border-purple-light/40 bg-purple-light/10 py-1 text-[10px] text-purple-light">
                  📤 Promote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mx-4 mt-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-base font-bold">Recent Activity</h2>
          <button className="text-[10px] text-white/50">⚙️ Filter</button>
        </div>
        <div className="mt-2 space-y-1.5">
          {RECENT_ACTIVITY.map((a, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-card border border-glass bg-card/40 p-2.5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-light/15 text-base">
                {a.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-xs font-medium">{a.name}</div>
                <div className="truncate text-[10px] text-white/50">{a.from}</div>
                <div className="text-[9px] text-white/40">{a.when}</div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-sm font-bold tabular-nums text-teal">
                  ${a.amount.toFixed(a.amount < 100 ? 2 : 0)}
                </div>
                <Chip tone={a.status === 'PAID' ? 'ok' : 'warn'}>{a.status}</Chip>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
