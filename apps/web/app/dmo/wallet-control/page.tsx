'use client';

import { DmoTopbar } from '@/components/dmo/topbar';
import { PlasticCard } from '@/components/ui/plastic-card';
import { KpiCard } from '@/components/ui/kpi-card';
import { Chip } from '@/components/ui/chip';
import { Button3D } from '@/components/ui/button-3d';

const LOCK_LADDER = [
  { level: 'L1', lock: 0, users: 180 },
  { level: 'L2', lock: 20, users: 92 },
  { level: 'L3', lock: 40, users: 145 },
  { level: 'L4', lock: 80, users: 88 },
  { level: 'L5', lock: 200, users: 56 },
  { level: 'L6', lock: 400, users: 34 },
  { level: 'L7', lock: 800, users: 18 },
  { level: 'L8', lock: 2000, users: 9 },
  { level: 'L9', lock: 5000, users: 3 },
  { level: 'L10', lock: 10000, users: 1 },
];

const PENDING_LARGE = [
  { id: 'TX-9001', user: 'user-001', amount: 15000, currency: 'EHBGC', reason: 'Franchise activation L8', status: 'pending' },
  { id: 'TX-9002', user: 'user-008', amount: 8500, currency: 'EHBGC', reason: 'Withdrawal request', status: 'pending' },
  { id: 'TX-9003', user: 'user-014', amount: 22000, currency: 'USD', reason: 'Large escrow lock', status: 'pending' },
];

const AML = [
  { id: 'AML-401', user: 'user-042', risk: 0.85, reason: 'Round-number deposits × 5', ago: '4m' },
  { id: 'AML-402', user: 'user-018', risk: 0.62, reason: 'Velocity anomaly', ago: '1h' },
  { id: 'AML-403', user: 'user-007', risk: 0.48, reason: 'Cross-country transfer', ago: '3h' },
];

export default function WalletControlPage() {
  return (
    <>
      <DmoTopbar
        title="Wallet Control"
        subtitle="EHB Wallet + escrow + coin lock ladder + AML queue"
        breadcrumb={['Operations', 'Wallet']}
      />
      <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Total EHBGC" value="4.2M" tone="teal" icon="💰" />
          <KpiCard label="Locked in escrow" value="480K" tone="purple" icon="🔒" />
          <KpiCard label="Active escrows" value="324" tone="amber" icon="📦" />
          <KpiCard label="AML flags today" value="8" delta="3 critical" tone="fail" icon="🛡️" />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
          {/* Lock ladder */}
          <PlasticCard className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                  EHBGC lock ladder
                </div>
                <h3 className="mt-1 text-lg font-semibold">Per-STL-level coin locks</h3>
              </div>
              <Chip tone="teal">Live</Chip>
            </div>
            <div className="mt-4 space-y-2 text-xs">
              {LOCK_LADDER.map((t) => (
                <div key={t.level} className="flex items-center gap-3">
                  <div className="w-10 text-xs font-bold text-white/60">{t.level}</div>
                  <div className="w-20 tabular-nums text-white/80">
                    {t.lock.toLocaleString()} EHBGC
                  </div>
                  <div className="flex-1">
                    <div className="h-2 overflow-hidden rounded-chip bg-white/5">
                      <div
                        className="h-full rounded-chip bg-gradient-to-r from-[#2BBFA0] to-[#38C878]"
                        style={{ width: `${Math.min(100, (t.users / 200) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-14 text-right tabular-nums text-white/70">{t.users}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-[11px] text-white/40">
              Total locked across all tiers: {LOCK_LADDER.reduce((a, b) => a + b.lock * b.users, 0).toLocaleString()} EHBGC
            </div>
          </PlasticCard>

          {/* Large transfer approvals */}
          <div className="space-y-4">
            <PlasticCard className="p-5">
              <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                Large transfer approvals
              </div>
              <h3 className="mt-1 text-sm font-semibold">Requires DMO sign-off (&gt;10K)</h3>
              <ul className="mt-3 space-y-2 text-xs">
                {PENDING_LARGE.map((t) => (
                  <li key={t.id} className="rounded-card border border-glass bg-nested/60 p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-white/40">{t.id}</span>
                      <Chip tone="warn">{t.currency}</Chip>
                    </div>
                    <div className="mt-1 text-sm font-semibold tabular-nums">
                      {t.amount.toLocaleString()} {t.currency}
                    </div>
                    <div className="mt-1 text-[11px] text-white/60">{t.reason}</div>
                    <div className="mt-2 flex gap-1.5">
                      <Button3D size="sm" variant="green">
                        Approve
                      </Button3D>
                      <Button3D size="sm" variant="red">
                        Deny
                      </Button3D>
                    </div>
                  </li>
                ))}
              </ul>
            </PlasticCard>

            <PlasticCard className="p-5">
              <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                AML queue
              </div>
              <h3 className="mt-1 text-sm font-semibold">Risk-scored anomalies</h3>
              <ul className="mt-3 space-y-2 text-xs">
                {AML.map((a) => (
                  <li key={a.id} className="rounded-card border border-glass bg-nested/60 p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-white/40">{a.id}</span>
                      <Chip tone={a.risk > 0.7 ? 'fail' : 'warn' as any}>
                        risk {(a.risk * 100).toFixed(0)}%
                      </Chip>
                    </div>
                    <div className="mt-1 text-white/80">user: {a.user}</div>
                    <div className="mt-0.5 text-white/60">{a.reason}</div>
                    <div className="mt-0.5 text-[10px] text-white/40">{a.ago} ago</div>
                  </li>
                ))}
              </ul>
            </PlasticCard>
          </div>
        </div>
      </div>
    </>
  );
}
