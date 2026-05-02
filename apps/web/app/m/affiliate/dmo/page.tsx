'use client';

import { MobileBottomNav } from '@/components/affiliate/mobile-bottom-nav';
import { Chip } from '@/components/ui/chip';

/**
 * EHB Affiliate — Mobile DMO Review (Visily mobile prototype #18)
 *
 * Mobile-first DMO admin view: pending queue + critical risk KPIs,
 * active queue with risk score cards, expanded detail with risk signals,
 * action buttons (Reverse / Soft Block / Hard Block).
 */

const ALERTS = [
  {
    name: 'Marcus Vance',
    role: 'Affiliate',
    minsAgo: 4,
    score: 98,
    txnId: 'TXN-9928-A4',
    amount: 2450,
    riskLevel: 'critical',
    signals: ['IP Country Mismatch', 'Velocity Spike (x5)', 'Prepaid Card Used'],
    ipAddress: '194.55.21.XX (Proxy)',
    deviceFp: 'Windows / Chrome 114',
    accountHistory: 'New Account (< 24h)',
    paymentMethod: 'Visa **4421 (Stripe)',
    lastAudit: 'System assigned score 98 due to rapid successive purchases from known VPN subnet.',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Customer',
    minsAgo: 12,
    score: 82,
    txnId: 'TXN-3110-B9',
    amount: 125,
    riskLevel: 'high',
    expanded: false,
  },
  {
    name: 'David Chen',
    role: 'Affiliate',
    minsAgo: 45,
    score: 65,
    txnId: 'TXN-7741-C2',
    amount: 850,
    riskLevel: 'medium',
    expanded: false,
  },
];

export default function MobileDmoPage() {
  return (
    <div className="min-h-screen bg-bg pb-24">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 text-xs font-semibold">
        <span>9:41</span>
        <span>📶 📶 🔋</span>
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-5 py-3">
        <h1 className="text-2xl font-bold">DMO Review</h1>
        <button className="flex h-9 w-9 items-center justify-center rounded-full border border-glass bg-card/40">
          ⚙️
        </button>
      </header>

      {/* KPIs */}
      <div className="mx-4 grid grid-cols-2 gap-2">
        <div className="rounded-card border border-glass bg-card/40 p-3">
          <div className="flex items-center gap-1">
            <span className="text-[10px] uppercase tracking-wider text-white/50">Pending Queue</span>
            <span className="text-[10px]">⏳</span>
          </div>
          <div className="mt-1 text-2xl font-bold tabular-nums">24</div>
        </div>
        <div className="rounded-card border-2 border-red-400/40 bg-red-400/10 p-3">
          <div className="flex items-center gap-1">
            <span className="text-[10px] uppercase tracking-wider text-red-400">Critical Risk</span>
            <span className="text-[10px]">🚨</span>
          </div>
          <div className="mt-1 text-2xl font-bold tabular-nums text-red-400">7</div>
        </div>
      </div>

      {/* Active Queue */}
      <div className="mx-4 mt-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-bold">Active Queue</h2>
          <span className="text-[10px] text-white/40">Sorted by: Risk Score</span>
        </div>

        <div className="mt-2 space-y-3">
          {ALERTS.map((a, i) => {
            const isExpanded = i === 0;
            const borderColor =
              a.riskLevel === 'critical' ? 'border-red-400' : a.riskLevel === 'high' ? 'border-amber' : 'border-purple-light/40';
            const scoreColor =
              a.riskLevel === 'critical' ? 'text-red-400' : a.riskLevel === 'high' ? 'text-amber' : 'text-purple-light';
            const tone =
              a.riskLevel === 'critical' ? 'fail' : a.riskLevel === 'high' ? 'warn' : 'purple';

            return (
              <div
                key={i}
                className={`overflow-hidden rounded-card border-2 ${borderColor} bg-card/40`}
              >
                {/* Card header */}
                <div className="flex items-center gap-3 p-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-light/15">
                    👤
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-semibold">{a.name}</span>
                      <div className={`text-right ${scoreColor}`}>
                        <div className="text-[8px] uppercase tracking-wider opacity-70">Score</div>
                        <div className="text-2xl font-bold tabular-nums leading-none">{a.score}</div>
                      </div>
                    </div>
                    <div className="text-[10px] text-white/50">
                      {a.role} · {a.minsAgo} mins ago
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-[10px] font-mono text-white/60">{a.txnId}</span>
                      <span className="text-[11px] font-bold tabular-nums">${(a.amount as number).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Expanded detail (only first card) */}
                {isExpanded && (a as any).signals && (
                  <>
                    <div className="border-t border-glass px-3 py-2">
                      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-red-400">
                        <span>🚨</span>
                        <span>Risk Signals</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {(a as any).signals.map((s: string, j: number) => (
                          <span
                            key={j}
                            className="rounded-pill border border-red-400/40 bg-red-400/10 px-2 py-0.5 text-[10px] text-red-400"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 border-t border-glass p-3 text-[10px]">
                      <div>
                        <div className="uppercase tracking-wider text-white/40">IP Address</div>
                        <div className="mt-0.5 font-mono text-white/80">{(a as any).ipAddress}</div>
                      </div>
                      <div>
                        <div className="uppercase tracking-wider text-white/40">Device Fingerprint</div>
                        <div className="mt-0.5 text-white/80">{(a as any).deviceFp}</div>
                      </div>
                      <div>
                        <div className="uppercase tracking-wider text-white/40">Account History</div>
                        <div className="mt-0.5 text-white/80">{(a as any).accountHistory}</div>
                      </div>
                      <div>
                        <div className="uppercase tracking-wider text-white/40">Payment Method</div>
                        <div className="mt-0.5 text-white/80">{(a as any).paymentMethod}</div>
                      </div>
                    </div>

                    <div className="border-t border-glass p-3">
                      <div className="text-[10px] uppercase tracking-wider text-white/40">Last Audit</div>
                      <p className="mt-1 text-[11px] leading-relaxed text-white/70">
                        {(a as any).lastAudit}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-3 gap-1.5 border-t border-glass p-3">
                      <button className="rounded-card border border-glass bg-card/60 px-2 py-2 text-[10px] hover:border-teal">
                        ↩️ Reverse
                      </button>
                      <button className="rounded-card border border-amber/40 bg-amber/10 px-2 py-2 text-[10px] text-amber hover:bg-amber/20">
                        🚫 Soft Block
                      </button>
                      <button className="rounded-card bg-red-400 px-2 py-2 text-[10px] font-semibold text-white">
                        🛑 Hard Block
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 rounded-card border border-dashed border-glass bg-card/20 p-4 text-center text-[10px] text-white/40">
          ⊕ No more high-risk cases pending
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
