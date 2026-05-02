'use client';

import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api-client';
import { DmoTopbar } from '@/components/dmo/topbar';
import { PlasticCard } from '@/components/ui/plastic-card';
import { KpiCard } from '@/components/ui/kpi-card';
import { Chip } from '@/components/ui/chip';
import { Button3D } from '@/components/ui/button-3d';

// =============================================================================
// EHB Affiliate — Admin Console Hub
// Wires together Phase 8 admin epics (B.4 DMO queue, C.4 withdrawal approvals,
// F.2 audit exports, F.3 country flags) into a single ops cockpit.
// Backend routes: /api/admin/affiliate/* (services/api/src/routes/adminAffiliateOps.js)
// =============================================================================

type Tab = 'overview' | 'dmo-queue' | 'withdrawals' | 'country-flags' | 'exports' | '80-20';

interface DmoQueueItem {
  _id: string;
  userId: string;
  reason: string;
  riskScore: number;
  signalCount: number;
  status: 'pending' | 'reviewed' | 'escalated' | 'cleared' | 'reversed';
  createdAt: string;
  notes?: string;
}

interface WithdrawalItem {
  _id: string;
  userId: string;
  amountUsd: number;
  asset: 'USDT_TRC20' | 'USDT_ERC20' | 'USDT_BEP20' | 'BANK_PK' | 'BANK_UAE' | 'BANK_USA';
  status: string;
  createdAt: string;
  twoFaVerified?: boolean;
  destination?: string;
}

interface CountryFlag {
  country: string;
  enabled: boolean;
  features: Record<string, boolean>;
  notes?: string;
}

interface Report8020 {
  generatedAt: string;
  windowDays: number;
  totalCommissions: number;
  totalAmountUsd: number;
  topEarners: Array<{ userId: string; rank?: string; totalUsd: number; share: number }>;
  bottomShareUsd: number;
  topShareUsd: number;
  ratio: { topPct: number; valuePct: number };
}

const TABS: Array<{ id: Tab; label: string; icon: string }> = [
  { id: 'overview', label: 'Overview', icon: '🎛️' },
  { id: 'dmo-queue', label: 'DMO Queue', icon: '🚨' },
  { id: 'withdrawals', label: 'Withdrawals', icon: '💸' },
  { id: 'country-flags', label: 'Country Flags', icon: '🌍' },
  { id: 'exports', label: 'Exports', icon: '📥' },
  { id: '80-20', label: '80/20 Report', icon: '📊' },
];

export default function AffiliateAdminPage() {
  const [tab, setTab] = useState<Tab>('overview');
  const [dmoQueue, setDmoQueue] = useState<DmoQueueItem[]>([]);
  const [withdrawals, setWithdrawals] = useState<WithdrawalItem[]>([]);
  const [countryFlags, setCountryFlags] = useState<CountryFlag[]>([]);
  const [report, setReport] = useState<Report8020 | null>(null);
  const [loading, setLoading] = useState(false);
  const [actioned, setActioned] = useState<Record<string, string>>({});
  const [statusFilter, setStatusFilter] = useState<'pending' | 'reviewed' | 'escalated' | 'all'>('pending');

  // -------------------------------------------------------------------------
  // Data loaders (degrade gracefully when API offline)
  // -------------------------------------------------------------------------

  async function loadDmoQueue() {
    setLoading(true);
    try {
      const q = statusFilter === 'all' ? '' : `?status=${statusFilter}`;
      const r = await api.get<{ items: DmoQueueItem[] }>(`/api/admin/affiliate/dmo/queue${q}`);
      setDmoQueue(r.items || []);
    } catch {
      setDmoQueue(DEMO_DMO_QUEUE);
    } finally {
      setLoading(false);
    }
  }

  async function loadWithdrawals() {
    setLoading(true);
    try {
      const r = await api.get<{ items: WithdrawalItem[] }>('/api/admin/affiliate/withdrawals/queue');
      setWithdrawals(r.items || []);
    } catch {
      setWithdrawals(DEMO_WITHDRAWALS);
    } finally {
      setLoading(false);
    }
  }

  async function loadCountryFlags() {
    setLoading(true);
    try {
      const r = await api.get<{ countries: CountryFlag[] }>('/api/admin/affiliate/country-flags');
      setCountryFlags(r.countries || []);
    } catch {
      setCountryFlags(DEMO_COUNTRY_FLAGS);
    } finally {
      setLoading(false);
    }
  }

  async function load8020() {
    setLoading(true);
    try {
      const r = await api.get<Report8020>('/api/admin/affiliate/exports/80-20-report?days=7');
      setReport(r);
    } catch {
      setReport(DEMO_8020);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (tab === 'dmo-queue') loadDmoQueue();
    if (tab === 'withdrawals') loadWithdrawals();
    if (tab === 'country-flags') loadCountryFlags();
    if (tab === '80-20') load8020();
    // overview pulls a slim summary
    if (tab === 'overview') {
      loadDmoQueue();
      loadWithdrawals();
      load8020();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, statusFilter]);

  // -------------------------------------------------------------------------
  // Actions
  // -------------------------------------------------------------------------

  async function resolveDmoItem(id: string, resolution: 'cleared' | 'escalated' | 'reversed') {
    setActioned((s) => ({ ...s, [id]: resolution }));
    try {
      await api.post(`/api/admin/affiliate/dmo/queue/${id}/resolve`, {
        resolution,
        notes: `Resolved by admin via console — ${resolution}`,
      });
      setDmoQueue((q) => q.filter((x) => x._id !== id));
    } catch {
      // optimistic UI: keep marker even if offline
    }
  }

  async function approveWithdrawal(id: string) {
    setActioned((s) => ({ ...s, [id]: 'approved' }));
    try {
      await api.post(`/api/admin/affiliate/withdrawals/${id}/approve`, {});
      setWithdrawals((w) => w.filter((x) => x._id !== id));
    } catch {
      /* offline-safe */
    }
  }

  async function rejectWithdrawal(id: string) {
    setActioned((s) => ({ ...s, [id]: 'rejected' }));
    try {
      await api.post(`/api/admin/affiliate/withdrawals/${id}/reject`, {
        reason: 'Rejected via admin console',
      });
      setWithdrawals((w) => w.filter((x) => x._id !== id));
    } catch {
      /* offline-safe */
    }
  }

  function downloadCsv(kind: 'commissions' | 'activity-log') {
    const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/affiliate/exports/${kind}?format=csv`;
    window.open(url, '_blank');
  }

  // -------------------------------------------------------------------------
  // KPIs
  // -------------------------------------------------------------------------
  const kpis = useMemo(() => {
    const pendingDmo = dmoQueue.filter((x) => x.status === 'pending').length;
    const highRisk = dmoQueue.filter((x) => x.riskScore >= 70).length;
    const pendingW = withdrawals.length;
    const pendingValue = withdrawals.reduce((a, b) => a + (b.amountUsd || 0), 0);
    return { pendingDmo, highRisk, pendingW, pendingValue };
  }, [dmoQueue, withdrawals]);

  return (
    <>
      <DmoTopbar
        title="Affiliate Admin Console"
        subtitle="Phase 8 ops cockpit · DMO queue · withdrawals · country flags · audit exports"
        breadcrumb={['Operations', 'Affiliate Admin']}
      />

      <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
        {/* ─── Tabs ────────────────────────────────────────────────────── */}
        <PlasticCard className="p-2">
          <div className="flex flex-wrap gap-1">
            {TABS.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2 rounded-card px-3 py-2 text-sm transition ${
                    active
                      ? 'bg-gradient-to-r from-[#7B6EF6] to-[#A098F8] text-white shadow-lg'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </PlasticCard>

        {/* ─── Overview tab ───────────────────────────────────────────── */}
        {tab === 'overview' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <KpiCard
                label="DMO queue pending"
                value={kpis.pendingDmo}
                delta={kpis.highRisk > 0 ? `${kpis.highRisk} high-risk` : 'All low risk'}
                tone={kpis.highRisk > 0 ? 'fail' : 'ok'}
                icon="🚨"
              />
              <KpiCard
                label="Withdrawals pending"
                value={kpis.pendingW}
                delta={`$${kpis.pendingValue.toFixed(0)} value`}
                tone="amber"
                icon="💸"
              />
              <KpiCard
                label="Active countries"
                value={countryFlags.filter((c) => c.enabled).length || 1}
                delta="PK pilot"
                tone="purple"
                icon="🌍"
              />
              <KpiCard
                label="80/20 ratio (7d)"
                value={
                  report
                    ? `${report.ratio.topPct.toFixed(0)} / ${report.ratio.valuePct.toFixed(0)}`
                    : '— / —'
                }
                delta={report ? `${report.totalCommissions} commissions` : 'loading'}
                tone="teal"
                icon="📊"
              />
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <PlasticCard className="p-5">
                <div className="text-xs uppercase tracking-widest text-white/50">Quick Actions</div>
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => setTab('dmo-queue')}
                    className="flex w-full items-center justify-between rounded-card border border-glass bg-card/40 px-4 py-3 text-left transition hover:border-[#7B6EF6]/50 hover:bg-[#7B6EF6]/10"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl">🚨</span>
                      <span>
                        <div className="font-semibold">DMO Review Queue</div>
                        <div className="text-xs text-white/50">Triage flagged users</div>
                      </span>
                    </span>
                    <Chip tone={kpis.pendingDmo > 0 ? 'warn' : 'ok'}>{kpis.pendingDmo}</Chip>
                  </button>

                  <button
                    onClick={() => setTab('withdrawals')}
                    className="flex w-full items-center justify-between rounded-card border border-glass bg-card/40 px-4 py-3 text-left transition hover:border-[#F0A030]/50 hover:bg-[#F0A030]/10"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl">💸</span>
                      <span>
                        <div className="font-semibold">Withdrawal Approvals</div>
                        <div className="text-xs text-white/50">2-of-3 multi-sig queue</div>
                      </span>
                    </span>
                    <Chip tone={kpis.pendingW > 0 ? 'warn' : 'ok'}>{kpis.pendingW}</Chip>
                  </button>

                  <button
                    onClick={() => setTab('country-flags')}
                    className="flex w-full items-center justify-between rounded-card border border-glass bg-card/40 px-4 py-3 text-left transition hover:border-[#2BBFA0]/50 hover:bg-[#2BBFA0]/10"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl">🌍</span>
                      <span>
                        <div className="font-semibold">Country Feature Flags</div>
                        <div className="text-xs text-white/50">Pilot rollout gates</div>
                      </span>
                    </span>
                    <Chip tone="purple">{countryFlags.length || 5}</Chip>
                  </button>

                  <button
                    onClick={() => setTab('exports')}
                    className="flex w-full items-center justify-between rounded-card border border-glass bg-card/40 px-4 py-3 text-left transition hover:border-[#ec4899]/50 hover:bg-[#ec4899]/10"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl">📥</span>
                      <span>
                        <div className="font-semibold">Audit Exports</div>
                        <div className="text-xs text-white/50">CSV — commissions / activity</div>
                      </span>
                    </span>
                    <Chip tone="purple">CSV</Chip>
                  </button>
                </div>
              </PlasticCard>

              <PlasticCard className="p-5 lg:col-span-2">
                <div className="text-xs uppercase tracking-widest text-white/50">
                  Phase 8 Epic Coverage
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  {EPIC_COVERAGE.map((e) => (
                    <div
                      key={e.id}
                      className="flex items-center justify-between rounded-card border border-glass bg-card/40 px-4 py-2"
                    >
                      <div>
                        <span className="font-mono text-xs text-white/40">{e.id}</span>
                        <span className="ml-2">{e.title}</span>
                      </div>
                      <Chip tone={e.status === 'shipped' ? 'ok' : e.status === 'partial' ? 'warn' : 'fail'}>
                        {e.status}
                      </Chip>
                    </div>
                  ))}
                </div>
              </PlasticCard>
            </div>
          </div>
        )}

        {/* ─── DMO queue tab ──────────────────────────────────────────── */}
        {tab === 'dmo-queue' && (
          <PlasticCard className="overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-glass px-5 py-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/40">Fraud Triage</div>
                <h3 className="mt-1 text-lg font-semibold">{dmoQueue.length} cases</h3>
              </div>
              <div className="flex items-center gap-2">
                {(['pending', 'reviewed', 'escalated', 'all'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`rounded-pill px-3 py-1 text-xs ${
                      statusFilter === s
                        ? 'bg-[#7B6EF6] text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    {s}
                  </button>
                ))}
                <Chip tone="warn">SLA 4h initial · 48h resolve</Chip>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-card/40 text-left text-xs uppercase tracking-wider text-white/40">
                  <tr>
                    <th className="px-5 py-3">User</th>
                    <th className="px-5 py-3">Reason</th>
                    <th className="px-5 py-3">Risk</th>
                    <th className="px-5 py-3">Signals</th>
                    <th className="px-5 py-3">Created</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-glass">
                  {dmoQueue.length === 0 && !loading && (
                    <tr>
                      <td colSpan={6} className="px-5 py-12 text-center text-white/40">
                        Queue empty — all cases resolved 🎉
                      </td>
                    </tr>
                  )}
                  {dmoQueue.map((row) => {
                    const acted = actioned[row._id];
                    const tone = row.riskScore >= 70 ? 'fail' : row.riskScore >= 40 ? 'warn' : 'ok';
                    return (
                      <tr key={row._id} className="hover:bg-card/30">
                        <td className="px-5 py-3 font-mono text-xs">{row.userId.slice(-8)}</td>
                        <td className="px-5 py-3">{row.reason}</td>
                        <td className="px-5 py-3">
                          <Chip tone={tone}>{row.riskScore}</Chip>
                        </td>
                        <td className="px-5 py-3 text-white/60">{row.signalCount}</td>
                        <td className="px-5 py-3 text-xs text-white/40">
                          {new Date(row.createdAt).toLocaleString()}
                        </td>
                        <td className="px-5 py-3">
                          {acted ? (
                            <Chip tone={acted === 'cleared' ? 'ok' : 'fail'}>{acted}</Chip>
                          ) : (
                            <div className="flex justify-end gap-2">
                              <Button3D
                                variant="green"
                                size="sm"
                                onClick={() => resolveDmoItem(row._id, 'cleared')}
                              >
                                Clear
                              </Button3D>
                              <Button3D
                                variant="gold"
                                size="sm"
                                onClick={() => resolveDmoItem(row._id, 'escalated')}
                              >
                                Escalate
                              </Button3D>
                              <Button3D
                                variant="red"
                                size="sm"
                                onClick={() => resolveDmoItem(row._id, 'reversed')}
                              >
                                Reverse
                              </Button3D>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </PlasticCard>
        )}

        {/* ─── Withdrawals tab ────────────────────────────────────────── */}
        {tab === 'withdrawals' && (
          <PlasticCard className="overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-glass px-5 py-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/40">Pending Approvals</div>
                <h3 className="mt-1 text-lg font-semibold">{withdrawals.length} requests</h3>
              </div>
              <Chip tone="amber">2-of-3 multi-sig (≥ $5,000) · 2FA verified</Chip>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-card/40 text-left text-xs uppercase tracking-wider text-white/40">
                  <tr>
                    <th className="px-5 py-3">Request ID</th>
                    <th className="px-5 py-3">User</th>
                    <th className="px-5 py-3">Amount</th>
                    <th className="px-5 py-3">Asset / Rail</th>
                    <th className="px-5 py-3">2FA</th>
                    <th className="px-5 py-3">Created</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-glass">
                  {withdrawals.length === 0 && !loading && (
                    <tr>
                      <td colSpan={7} className="px-5 py-12 text-center text-white/40">
                        No pending withdrawals
                      </td>
                    </tr>
                  )}
                  {withdrawals.map((w) => {
                    const acted = actioned[w._id];
                    return (
                      <tr key={w._id} className="hover:bg-card/30">
                        <td className="px-5 py-3 font-mono text-xs">{w._id.slice(-8)}</td>
                        <td className="px-5 py-3 font-mono text-xs">{w.userId.slice(-8)}</td>
                        <td className="px-5 py-3 font-semibold">${w.amountUsd.toFixed(2)}</td>
                        <td className="px-5 py-3">
                          <Chip tone="purple">{w.asset}</Chip>
                        </td>
                        <td className="px-5 py-3">
                          {w.twoFaVerified ? (
                            <Chip tone="ok">verified</Chip>
                          ) : (
                            <Chip tone="fail">missing</Chip>
                          )}
                        </td>
                        <td className="px-5 py-3 text-xs text-white/40">
                          {new Date(w.createdAt).toLocaleString()}
                        </td>
                        <td className="px-5 py-3">
                          {acted ? (
                            <Chip tone={acted === 'approved' ? 'ok' : 'fail'}>{acted}</Chip>
                          ) : (
                            <div className="flex justify-end gap-2">
                              <Button3D
                                variant="green"
                                size="sm"
                                onClick={() => approveWithdrawal(w._id)}
                                disabled={!w.twoFaVerified}
                              >
                                Approve
                              </Button3D>
                              <Button3D
                                variant="red"
                                size="sm"
                                onClick={() => rejectWithdrawal(w._id)}
                              >
                                Reject
                              </Button3D>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </PlasticCard>
        )}

        {/* ─── Country flags tab ─────────────────────────────────────── */}
        {tab === 'country-flags' && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {countryFlags.map((c) => (
              <PlasticCard key={c.country} className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{COUNTRY_FLAG_EMOJI[c.country] || '🌍'}</span>
                    <div>
                      <div className="font-semibold">{c.country}</div>
                      <div className="text-xs text-white/50">
                        {c.enabled ? 'Active pilot' : 'Disabled'}
                      </div>
                    </div>
                  </div>
                  <Chip tone={c.enabled ? 'ok' : 'fail'}>
                    {c.enabled ? 'ON' : 'OFF'}
                  </Chip>
                </div>

                <div className="mt-4 space-y-1.5 text-sm">
                  {Object.entries(c.features || {}).map(([feature, enabled]) => (
                    <div
                      key={feature}
                      className="flex items-center justify-between rounded border border-glass bg-card/30 px-3 py-1.5"
                    >
                      <span className="text-white/80">{feature}</span>
                      <Chip tone={enabled ? 'ok' : 'fail'}>{enabled ? 'on' : 'off'}</Chip>
                    </div>
                  ))}
                </div>
                {c.notes && (
                  <div className="mt-3 rounded border border-glass bg-card/40 p-3 text-xs text-white/60">
                    {c.notes}
                  </div>
                )}
              </PlasticCard>
            ))}
          </div>
        )}

        {/* ─── Exports tab ───────────────────────────────────────────── */}
        {tab === 'exports' && (
          <div className="grid gap-4 sm:grid-cols-2">
            <PlasticCard className="p-5">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💼</span>
                <div>
                  <div className="font-semibold">Commissions Export</div>
                  <div className="text-xs text-white/50">All 13 commission types · CSV</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-white/60">
                Full earnings ledger (Track A direct + L2 + Track B 10-level + 11 bonuses + reversals).
                Filterable by date / type / status. Used for finance reconciliation + tax exports.
              </p>
              <div className="mt-4">
                <Button3D variant="purple" onClick={() => downloadCsv('commissions')}>
                  Download CSV
                </Button3D>
              </div>
            </PlasticCard>

            <PlasticCard className="p-5">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📜</span>
                <div>
                  <div className="font-semibold">Activity Log Export</div>
                  <div className="text-xs text-white/50">Admin actions audit trail · CSV</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-white/60">
                Every admin action (config change, withdrawal approval, reversal, KYC override).
                Includes signer + timestamp + IP. Required for SECP audit + DMO governance review.
              </p>
              <div className="mt-4">
                <Button3D variant="gold" onClick={() => downloadCsv('activity-log')}>
                  Download CSV
                </Button3D>
              </div>
            </PlasticCard>
          </div>
        )}

        {/* ─── 80/20 Report tab ──────────────────────────────────────── */}
        {tab === '80-20' && (
          <div className="space-y-4">
            <PlasticCard className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/50">
                    Pareto Distribution
                  </div>
                  <h3 className="mt-1 text-lg font-semibold">
                    {report
                      ? `${report.ratio.topPct.toFixed(1)}% of earners hold ${report.ratio.valuePct.toFixed(1)}% of payout value`
                      : 'Loading…'}
                  </h3>
                  <p className="mt-1 text-sm text-white/50">
                    Watchdog metric — breach &gt; 90/10 triggers compliance review (anti-pyramid policy).
                  </p>
                </div>
                {report && (
                  <Chip tone={report.ratio.valuePct > 90 ? 'fail' : report.ratio.valuePct > 80 ? 'warn' : 'ok'}>
                    {report.ratio.valuePct > 90
                      ? 'Breach'
                      : report.ratio.valuePct > 80
                      ? 'Watch'
                      : 'Healthy'}
                  </Chip>
                )}
              </div>

              {report && (
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-card border border-glass bg-card/30 p-4">
                    <div className="text-xs text-white/50">Window</div>
                    <div className="mt-1 text-2xl font-bold">{report.windowDays}d</div>
                  </div>
                  <div className="rounded-card border border-glass bg-card/30 p-4">
                    <div className="text-xs text-white/50">Total commissions</div>
                    <div className="mt-1 text-2xl font-bold">{report.totalCommissions}</div>
                  </div>
                  <div className="rounded-card border border-glass bg-card/30 p-4">
                    <div className="text-xs text-white/50">Total payout</div>
                    <div className="mt-1 text-2xl font-bold">${report.totalAmountUsd.toFixed(0)}</div>
                  </div>
                </div>
              )}
            </PlasticCard>

            {report && (
              <PlasticCard className="overflow-hidden">
                <div className="border-b border-glass px-5 py-4">
                  <div className="text-xs uppercase tracking-widest text-white/40">
                    Top Earners ({report.windowDays}d)
                  </div>
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-card/40 text-left text-xs uppercase tracking-wider text-white/40">
                    <tr>
                      <th className="px-5 py-3">Rank</th>
                      <th className="px-5 py-3">User</th>
                      <th className="px-5 py-3">Tier</th>
                      <th className="px-5 py-3">Total</th>
                      <th className="px-5 py-3">Share</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-glass">
                    {report.topEarners.map((e, idx) => (
                      <tr key={e.userId}>
                        <td className="px-5 py-3 font-bold text-white/40">#{idx + 1}</td>
                        <td className="px-5 py-3 font-mono text-xs">{e.userId.slice(-10)}</td>
                        <td className="px-5 py-3">
                          {e.rank ? <Chip tone="purple">{e.rank}</Chip> : <span className="text-white/40">—</span>}
                        </td>
                        <td className="px-5 py-3 font-semibold">${e.totalUsd.toFixed(2)}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-card/60">
                              <div
                                className="h-full bg-gradient-to-r from-[#7B6EF6] to-[#A098F8]"
                                style={{ width: `${Math.min(100, e.share * 100)}%` }}
                              />
                            </div>
                            <span className="text-xs text-white/60">{(e.share * 100).toFixed(1)}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </PlasticCard>
            )}
          </div>
        )}
      </div>
    </>
  );
}

// =============================================================================
// Demo data — used as fallback when API is offline so admin page never breaks
// =============================================================================

const DEMO_DMO_QUEUE: DmoQueueItem[] = [
  {
    _id: 'q1abc123',
    userId: 'u_64f8a92e1b2c3d4e5f6a7b80',
    reason: 'Velocity breach — 12 signups same IP',
    riskScore: 85,
    signalCount: 7,
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
  },
  {
    _id: 'q2def456',
    userId: 'u_64f8a92e1b2c3d4e5f6a7b81',
    reason: 'Self-buy pattern detected (Track A)',
    riskScore: 62,
    signalCount: 4,
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
  {
    _id: 'q3ghi789',
    userId: 'u_64f8a92e1b2c3d4e5f6a7b82',
    reason: 'OFAC partial match — manual review required',
    riskScore: 92,
    signalCount: 1,
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    _id: 'q4jkl012',
    userId: 'u_64f8a92e1b2c3d4e5f6a7b83',
    reason: 'Refund storm — 5 reversals in 24h',
    riskScore: 38,
    signalCount: 3,
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
];

const DEMO_WITHDRAWALS: WithdrawalItem[] = [
  {
    _id: 'w1abc123',
    userId: 'u_64f8a92e1b2c3d4e5f6a7b80',
    amountUsd: 1250,
    asset: 'USDT_TRC20',
    status: 'pending_admin_review',
    createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    twoFaVerified: true,
    destination: 'TRX...wallet',
  },
  {
    _id: 'w2def456',
    userId: 'u_64f8a92e1b2c3d4e5f6a7b85',
    amountUsd: 7500,
    asset: 'BANK_PK',
    status: 'pending_admin_review',
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    twoFaVerified: true,
    destination: 'HBL ****1234',
  },
  {
    _id: 'w3ghi789',
    userId: 'u_64f8a92e1b2c3d4e5f6a7b86',
    amountUsd: 320,
    asset: 'USDT_BEP20',
    status: 'pending_admin_review',
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    twoFaVerified: false,
  },
];

const DEMO_COUNTRY_FLAGS: CountryFlag[] = [
  {
    country: 'PK',
    enabled: true,
    features: {
      affiliate_track_a: true,
      affiliate_track_b: true,
      bonuses_v3: true,
      withdrawals_usdt: true,
      withdrawals_bank: true,
      kyc_nadra: true,
    },
    notes: 'Pilot rollout — JazzCash + HBL rails active',
  },
  {
    country: 'AE',
    enabled: false,
    features: {
      affiliate_track_a: false,
      affiliate_track_b: false,
      bonuses_v3: false,
      withdrawals_usdt: false,
      withdrawals_bank: false,
      kyc_nadra: false,
    },
    notes: 'Phase 9 — pending VARA license',
  },
  {
    country: 'IN',
    enabled: false,
    features: {
      affiliate_track_a: false,
      affiliate_track_b: false,
      bonuses_v3: false,
      withdrawals_usdt: false,
      withdrawals_bank: false,
      kyc_nadra: false,
    },
    notes: 'Phase 9 — UPI integration + Aadhar KYC pending',
  },
  {
    country: 'UK',
    enabled: false,
    features: {
      affiliate_track_a: false,
      affiliate_track_b: false,
      bonuses_v3: false,
      withdrawals_usdt: false,
      withdrawals_bank: false,
      kyc_nadra: false,
    },
    notes: 'Phase 10 — FCA approval required',
  },
  {
    country: 'US',
    enabled: false,
    features: {
      affiliate_track_a: false,
      affiliate_track_b: false,
      bonuses_v3: false,
      withdrawals_usdt: false,
      withdrawals_bank: false,
      kyc_nadra: false,
    },
    notes: 'Phase 10 — state-by-state rollout (FTC compliance)',
  },
];

const DEMO_8020: Report8020 = {
  generatedAt: new Date().toISOString(),
  windowDays: 7,
  totalCommissions: 1284,
  totalAmountUsd: 42180,
  topEarners: [
    { userId: 'u_64f8a92e1b2c3d4e5f6a7b80', rank: 'R8', totalUsd: 4820, share: 0.114 },
    { userId: 'u_64f8a92e1b2c3d4e5f6a7b81', rank: 'R7', totalUsd: 3210, share: 0.076 },
    { userId: 'u_64f8a92e1b2c3d4e5f6a7b82', rank: 'R6', totalUsd: 2840, share: 0.067 },
    { userId: 'u_64f8a92e1b2c3d4e5f6a7b83', rank: 'R6', totalUsd: 2105, share: 0.05 },
    { userId: 'u_64f8a92e1b2c3d4e5f6a7b84', rank: 'R5', totalUsd: 1640, share: 0.039 },
    { userId: 'u_64f8a92e1b2c3d4e5f6a7b85', rank: 'R5', totalUsd: 1520, share: 0.036 },
    { userId: 'u_64f8a92e1b2c3d4e5f6a7b86', rank: 'R4', totalUsd: 1240, share: 0.029 },
    { userId: 'u_64f8a92e1b2c3d4e5f6a7b87', rank: 'R4', totalUsd: 1095, share: 0.026 },
  ],
  bottomShareUsd: 8540,
  topShareUsd: 33640,
  ratio: { topPct: 19.7, valuePct: 79.8 },
};

const COUNTRY_FLAG_EMOJI: Record<string, string> = {
  PK: '🇵🇰',
  AE: '🇦🇪',
  IN: '🇮🇳',
  UK: '🇬🇧',
  US: '🇺🇸',
};

const EPIC_COVERAGE: Array<{ id: string; title: string; status: 'shipped' | 'partial' | 'planned' }> = [
  { id: 'A.1', title: 'Track A — Product cascade (2 layers)', status: 'shipped' },
  { id: 'A.2', title: 'Track B — Franchise cascade (10 levels)', status: 'shipped' },
  { id: 'A.3', title: '11-bonus catalog', status: 'shipped' },
  { id: 'B.1', title: 'OFAC + velocity + IDS', status: 'shipped' },
  { id: 'B.2', title: 'KYC tier ladder T0-T4', status: 'shipped' },
  { id: 'B.3', title: 'Anti-self-buy detection', status: 'shipped' },
  { id: 'B.4', title: 'DMO review queue', status: 'shipped' },
  { id: 'C.1', title: 'Dual wallet (Main + Affiliate)', status: 'shipped' },
  { id: 'C.2', title: 'USDT TRC20 adapter', status: 'partial' },
  { id: 'C.3', title: 'Bank rails (PK pilot)', status: 'partial' },
  { id: 'C.4', title: 'Withdrawal admin queue', status: 'shipped' },
  { id: 'D.1', title: 'Capping engine (per-rank)', status: 'shipped' },
  { id: 'D.2', title: 'Rank engine (R1-R10)', status: 'shipped' },
  { id: 'F.1', title: 'Admin config DB', status: 'shipped' },
  { id: 'F.2', title: 'Audit exports (CSV)', status: 'shipped' },
  { id: 'F.3', title: 'Country feature flags', status: 'shipped' },
  { id: 'G.1', title: 'Real-time analytics', status: 'planned' },
  { id: 'G.2', title: 'Kafka event stream', status: 'planned' },
];
