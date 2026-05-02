'use client';

import { useState } from 'react';
import { DmoTopbar } from '@/components/dmo/topbar';
import { PlasticCard } from '@/components/ui/plastic-card';
import { KpiCard } from '@/components/ui/kpi-card';
import { Chip } from '@/components/ui/chip';
import { Button3D } from '@/components/ui/button-3d';

/**
 * EHB DMO — Price Lock Management (Visily prototype screen #11)
 *
 * Admin page for franchise tier dynamic pricing — current locks, per-tier prices,
 * dynamic pricing engine config, recent activity logs.
 */

const STEPS = [
  { n: 1, label: 'Initial Pricing', desc: 'Base prices set' },
  { n: 2, label: 'Sales Threshold', desc: 'Wait 100 sales' },
  { n: 3, label: 'Step 1 (+10%)', desc: 'First increment' },
  { n: 4, label: 'Step 2 (+10%)', desc: 'Second increment' },
  { n: 5, label: 'Step 3 (+10%)', desc: 'Phase 1 done' },
  { n: 6, label: 'Phase 1 Lock', desc: '60-day lock' },
  { n: 7, label: 'Step 4 (+10%)', desc: 'Phase 2 begins' },
  { n: 8, label: 'Step 5 (+10%)', desc: 'Mid Phase 2' },
  { n: 9, label: 'Step 6 (+10%)', desc: 'End Phase 2' },
  { n: 10, label: 'Phase 2 Lock', desc: '60-day lock' },
  { n: 11, label: 'Step 7-9 (+10%×3)', desc: 'Final phase' },
  { n: 12, label: 'Max Cap (3×)', desc: 'Locked at ceiling' },
];

const FRANCHISE_PRICES = [
  { tier: 'OF1 Digital Starter', country: 'PK', basePrice: 100, currentPrice: 209, locked: 'Step 5 of 12', salesThisStep: 67, salesNeeded: 100, status: 'active' },
  { tier: 'OF2 Digital Growth', country: 'PK', basePrice: 250, currentPrice: 412, locked: 'Step 4 of 12', salesThisStep: 32, salesNeeded: 100, status: 'active' },
  { tier: 'OF3 Digital Professional', country: 'PK', basePrice: 750, currentPrice: 1000, locked: 'Step 2 of 12', salesThisStep: 89, salesNeeded: 100, status: 'active' },
  { tier: 'OF4 Digital Elite', country: 'PK', basePrice: 1500, currentPrice: 1500, locked: 'Initial', salesThisStep: 23, salesNeeded: 100, status: 'active' },
  { tier: 'Sub L1 Basic', country: 'PK', basePrice: 5000, currentPrice: 5000, locked: 'Initial', salesThisStep: 4, salesNeeded: 100, status: 'active' },
  { tier: 'Sub L5 Advanced', country: 'PK', basePrice: 20000, currentPrice: 20000, locked: 'Initial', salesThisStep: 1, salesNeeded: 100, status: 'paused' },
  { tier: 'OF1 Digital Starter', country: 'AE', basePrice: 120, currentPrice: 120, locked: 'Initial', salesThisStep: 0, salesNeeded: 100, status: 'pending' },
  { tier: 'OF1 Digital Starter', country: 'IN', basePrice: 80, currentPrice: 80, locked: 'Initial', salesThisStep: 0, salesNeeded: 100, status: 'pending' },
];

const RECENT_ACTIVITY = [
  { ts: '15 mins ago', type: 'system', actor: 'System', action: 'Price step incremented', detail: 'OF1 PK · Step 4 → Step 5 increased to $209', tone: 'ok' },
  { ts: '1 hour ago', type: 'admin', actor: 'admin@ehb', action: 'Manual override', detail: 'Price for OF2 PK adjusted to $412.00', tone: 'warn' },
  { ts: '3 hours ago', type: 'system', actor: 'System', action: 'Grace period expired', detail: 'OF3 PK reverted to market price $1,000', tone: 'fail' },
  { ts: '5 hours ago', type: 'system', actor: 'System', action: 'Sales threshold met', detail: 'OF1 PK reached 100 sales · advancing step', tone: 'ok' },
  { ts: '1 day ago', type: 'admin', actor: 'admin@ehb', action: 'New tier added', detail: 'Sub L5 Advanced added for PK at $20,000', tone: 'purple' },
];

export default function PriceLockPage() {
  const [selectedTier, setSelectedTier] = useState(0);
  const tier = FRANCHISE_PRICES[selectedTier];
  const stepNum = parseInt(tier.locked.match(/\d+/)?.[0] || '1');

  return (
    <>
      <DmoTopbar
        title="Price Lock Management"
        subtitle="Track price steps, manage requirements, and monitor pricing integrity"
        breadcrumb={['Operations', 'Price Lock']}
      />
      <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
        {/* KPIs strip */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Current Locked Base"
            value={`$${tier.currentPrice.toLocaleString()}`}
            delta={`${tier.tier} · ${tier.country}`}
            tone="purple"
            icon="🔒"
          />
          <KpiCard
            label="Active Price Locks"
            value={FRANCHISE_PRICES.filter((p) => p.status === 'active').length}
            delta={`of ${FRANCHISE_PRICES.length} total`}
            tone="ok"
            icon="✅"
          />
          <KpiCard
            label="Awaiting Threshold"
            value={FRANCHISE_PRICES.reduce((s, p) => s + (p.salesNeeded - p.salesThisStep), 0)}
            delta="sales until next step"
            tone="amber"
            icon="📊"
          />
          <KpiCard
            label="Active Tracking Sessions"
            value="1,420"
            delta="Live volume monitoring"
            tone="teal"
            icon="📡"
          />
        </div>

        {/* Stepper for selected tier */}
        <PlasticCard className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/40">
                Step {stepNum} of 12 — {tier.tier} · {tier.country}
              </div>
              <h3 className="mt-1 text-lg font-semibold">
                <span className="text-amber">${tier.currentPrice.toLocaleString()}</span>{' '}
                <span className="text-xs text-white/40">
                  (base ${tier.basePrice.toLocaleString()} ·{' '}
                  +{(((tier.currentPrice - tier.basePrice) / tier.basePrice) * 100).toFixed(0)}%)
                </span>
              </h3>
            </div>
            <Chip tone={tier.status === 'active' ? 'ok' : tier.status === 'paused' ? 'warn' : 'fail'}>
              {tier.status}
            </Chip>
          </div>

          <div className="mt-4 relative overflow-x-auto">
            <div className="grid min-w-[800px] grid-cols-12 gap-1">
              {STEPS.map((s) => {
                const isCompleted = s.n < stepNum;
                const isCurrent = s.n === stepNum;
                return (
                  <div
                    key={s.n}
                    className={`flex flex-col items-center gap-1 rounded-card border p-2 text-center transition ${
                      isCompleted
                        ? 'border-teal/40 bg-teal/10 text-teal'
                        : isCurrent
                        ? 'border-purple-light bg-purple-light/15 text-purple-light shadow-lg'
                        : 'border-glass bg-nested/30 text-white/40'
                    }`}
                    style={isCurrent ? { boxShadow: '0 0 16px rgba(123,110,246,0.4)' } : undefined}
                  >
                    <div className="text-xs font-bold">{isCompleted ? '✓' : s.n}</div>
                    <div className="text-[9px] font-medium leading-tight">{s.label}</div>
                    <div className="text-[8px] opacity-70">{s.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress to next step */}
          <div className="mt-4 rounded-card border border-glass bg-nested/40 p-3">
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-white/60">Sales until next step</span>
              <span className="font-bold text-purple-light">
                {tier.salesThisStep} / {tier.salesNeeded}
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-card/60">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-light to-amber"
                style={{ width: `${(tier.salesThisStep / tier.salesNeeded) * 100}%` }}
              />
            </div>
          </div>
        </PlasticCard>

        {/* Per-Franchise Pricing table */}
        <PlasticCard className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-glass px-5 py-4">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/40">Per-Franchise Pricing</div>
              <h3 className="mt-1 text-lg font-semibold">All tiers across countries</h3>
            </div>
            <div className="flex gap-2">
              <Button3D variant="purple" size="sm">
                + Add Tier
              </Button3D>
              <Button3D variant="gold" size="sm">
                ⚡ Emergency Halt
              </Button3D>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-card/40 text-left text-[10px] uppercase tracking-wider text-white/40">
                <tr>
                  <th className="px-5 py-3">Tier</th>
                  <th className="px-5 py-3">Country</th>
                  <th className="px-5 py-3">Base</th>
                  <th className="px-5 py-3">Current</th>
                  <th className="px-5 py-3">Step</th>
                  <th className="px-5 py-3">Progress</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-glass">
                {FRANCHISE_PRICES.map((p, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelectedTier(i)}
                    className={`cursor-pointer hover:bg-card/30 ${
                      selectedTier === i ? 'bg-purple-light/5' : ''
                    }`}
                  >
                    <td className="px-5 py-3 text-sm font-medium">{p.tier}</td>
                    <td className="px-5 py-3">
                      <Chip tone="purple">{p.country}</Chip>
                    </td>
                    <td className="px-5 py-3 tabular-nums text-white/60">${p.basePrice.toLocaleString()}</td>
                    <td className="px-5 py-3 font-bold tabular-nums text-amber">${p.currentPrice.toLocaleString()}</td>
                    <td className="px-5 py-3 text-xs">{p.locked}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-16 overflow-hidden rounded-full bg-nested">
                          <div
                            className="h-full rounded-full bg-purple-light"
                            style={{ width: `${(p.salesThisStep / p.salesNeeded) * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-white/50">
                          {p.salesThisStep}/{p.salesNeeded}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <Chip tone={p.status === 'active' ? 'ok' : p.status === 'paused' ? 'warn' : 'fail'}>
                        {p.status}
                      </Chip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PlasticCard>

        {/* Dynamic Pricing Engine + Save Configuration */}
        <div className="grid gap-4 lg:grid-cols-2">
          <PlasticCard className="p-5">
            <div className="text-[10px] uppercase tracking-widest text-white/40">
              Dynamic Pricing Engine
            </div>
            <h3 className="mt-1 text-lg font-semibold">Locked Configuration</h3>
            <div className="mt-4 space-y-2">
              {[
                { label: 'Sales Threshold per Step', value: '100 sales', editable: true },
                { label: 'Step Increment', value: '+10%', editable: false },
                { label: 'Phases per Round', value: '3 phases × 3 steps each', editable: false },
                { label: 'Per-Round Cap', value: '+30% per round', editable: false },
                { label: 'Max Multiplier', value: '3× original', editable: false },
                { label: 'Lock Duration', value: '60 days', editable: true },
                { label: 'Grace Period', value: '+10% for 30 days', editable: true },
              ].map((c, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded border border-glass bg-card/40 px-3 py-2 text-sm"
                >
                  <span className="text-white/70">{c.label}</span>
                  <span className="font-bold text-purple-light">
                    {c.value}{' '}
                    {c.editable && <span className="ml-1 text-[10px] text-white/40">(editable)</span>}
                  </span>
                </div>
              ))}
            </div>
            <Button3D variant="purple" size="md" className="mt-4 w-full">
              💾 Save Configuration
            </Button3D>
          </PlasticCard>

          <PlasticCard className="overflow-hidden">
            <div className="border-b border-glass px-5 py-4">
              <div className="text-[10px] uppercase tracking-widest text-white/40">
                Recent Activity &amp; Logs
              </div>
              <h3 className="mt-1 text-lg font-semibold">Audit trail</h3>
            </div>
            <div className="divide-y divide-glass">
              {RECENT_ACTIVITY.map((a, i) => (
                <div key={i} className="flex items-start gap-3 px-5 py-3 text-sm">
                  <Chip tone={a.tone as any}>{a.type}</Chip>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium">{a.action}</div>
                    <div className="mt-0.5 text-[11px] text-white/60">{a.detail}</div>
                    <div className="mt-0.5 text-[10px] text-white/40">
                      {a.actor} · {a.ts}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PlasticCard>
        </div>
      </div>
    </>
  );
}
