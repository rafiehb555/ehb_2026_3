'use client';

import { useState } from 'react';
import { DmoTopbar } from '@/components/dmo/topbar';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';
import { Button3D } from '@/components/ui/button-3d';

const ROLES = [
  { role: 'SUPER_ADMIN', desc: 'Full platform access, final policy', count: 2, pssMin: 10 },
  { role: 'DMO_DIRECTOR', desc: 'Heads DMO, reports to board', count: 1, pssMin: 9 },
  { role: 'DMO_MANAGER', desc: 'Per-module ownership (PSS, CRB, STL…)', count: 6, pssMin: 8 },
  { role: 'DMO_ANALYST', desc: 'Data monitoring + reports', count: 4, pssMin: 7 },
  { role: 'DMO_SUPPORT', desc: 'Complaint handling, tier 1–3', count: 12, pssMin: 6 },
  { role: 'DMO_INSPECTOR', desc: 'CRB / PSS audit oversight', count: 8, pssMin: 7 },
  { role: 'AI_SYSTEM', desc: 'Automated scoring / routing', count: 1, pssMin: 0 },
];

export default function SettingsPage() {
  const [flags, setFlags] = useState({
    BLOCKCHAIN_ENABLED: false,
    PAYMENT_GATEWAY_ENABLED: false,
    AI_FRAUD_AUTO_BLOCK: true,
    NEW_USER_GOSELLR_PROMO: true,
    FRANCHISE_CAP_OVERRIDE: false,
    MOBILE_APP_BETA: false,
  });

  function toggle(key: keyof typeof flags) {
    setFlags({ ...flags, [key]: !flags[key] });
  }

  return (
    <>
      <DmoTopbar
        title="Settings"
        subtitle="Roles · feature flags · regional policy · franchise round/phase admin"
        breadcrumb={['Intelligence', 'Settings']}
      />
      <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
        {/* Feature flags */}
        <PlasticCard className="p-5">
          <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
            Feature flags
          </div>
          <h3 className="mt-1 text-lg font-semibold">Platform-wide toggles</h3>
          <div className="mt-4 space-y-2">
            {Object.entries(flags).map(([k, v]) => (
              <div
                key={k}
                className="flex flex-wrap items-center justify-between gap-2 rounded-card border border-glass bg-nested/60 p-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-xs font-semibold">{k}</div>
                  <div className="mt-0.5 text-[11px] text-white/50">
                    {descForFlag(k)}
                  </div>
                </div>
                <button
                  onClick={() => toggle(k as any)}
                  className={`relative h-6 w-11 rounded-full transition ${
                    v ? 'bg-gradient-to-r from-[#2BBFA0] to-[#38C878]' : 'bg-white/10'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                      v ? 'left-5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </PlasticCard>

        {/* Franchise round/phase */}
        <PlasticCard className="p-5">
          <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
            Franchise phase admin
          </div>
          <h3 className="mt-1 text-lg font-semibold">Per-country round + phase control</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="text-[11px] uppercase text-white/40">
                <tr>
                  <th className="py-2">Country</th>
                  <th className="py-2 text-center">Round</th>
                  <th className="py-2 text-center">Phase</th>
                  <th className="py-2 text-right">Franchises booked</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { country: 'Pakistan (PK)', round: 1, phase: 1, booked: 10, status: 'active' },
                  { country: 'Saudi Arabia (SA)', round: 0, phase: 0, booked: 0, status: 'pending' },
                  { country: 'UAE (AE)', round: 0, phase: 0, booked: 0, status: 'pending' },
                  { country: 'UK (GB)', round: 0, phase: 0, booked: 0, status: 'pending' },
                ].map((c) => (
                  <tr key={c.country}>
                    <td className="py-2 font-semibold">{c.country}</td>
                    <td className="py-2 text-center tabular-nums">R{c.round}</td>
                    <td className="py-2 text-center tabular-nums">P{c.phase}</td>
                    <td className="py-2 text-right tabular-nums">{c.booked} / 100</td>
                    <td className="py-2">
                      {c.status === 'active' ? (
                        <Button3D size="sm" variant="blue">
                          Force next phase
                        </Button3D>
                      ) : (
                        <Button3D size="sm" variant="green">
                          Activate
                        </Button3D>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PlasticCard>

        {/* DMO roles */}
        <PlasticCard className="p-5">
          <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
            DMO roles
          </div>
          <h3 className="mt-1 text-lg font-semibold">
            Internal staff hierarchy (PSS L6+ + 2FA required)
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ROLES.map((r) => (
              <div key={r.role} className="rounded-card border border-glass bg-nested/60 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold">{r.role}</span>
                  <Chip>{r.count}</Chip>
                </div>
                <div className="mt-2 text-xs text-white/60">{r.desc}</div>
                {r.pssMin > 0 ? (
                  <div className="mt-2 text-[10px] text-white/40">
                    Min PSS L{r.pssMin} + 2FA
                  </div>
                ) : (
                  <div className="mt-2 text-[10px] text-white/40">Automated system</div>
                )}
              </div>
            ))}
          </div>
        </PlasticCard>

        {/* Regional policy */}
        <PlasticCard className="p-5">
          <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
            Regional policy overrides
          </div>
          <h3 className="mt-1 text-lg font-semibold">Country-specific rules</h3>
          <div className="mt-4 space-y-2 text-xs">
            {[
              { policy: 'PK — Tax filer status required for L7+', enabled: true },
              { policy: 'SA — Arabic language UI pinned', enabled: false },
              { policy: 'AE — Additional AML check for expat users', enabled: false },
              { policy: 'Global — GDPR data residency (EU)', enabled: true },
            ].map((p) => (
              <div
                key={p.policy}
                className="flex items-center justify-between rounded-card border border-glass bg-nested/60 p-3"
              >
                <span className="text-white/80">{p.policy}</span>
                <Chip tone={p.enabled ? 'ok' : 'default'}>
                  {p.enabled ? 'Active' : 'Pending'}
                </Chip>
              </div>
            ))}
          </div>
        </PlasticCard>
      </div>
    </>
  );
}

function descForFlag(key: string): string {
  const map: Record<string, string> = {
    BLOCKCHAIN_ENABLED: 'Switch from SHA-256 stub to Polkadot mainnet anchor',
    PAYMENT_GATEWAY_ENABLED: 'Enable JazzCash / Easypaisa / Stripe real charges',
    AI_FRAUD_AUTO_BLOCK: 'Auto-freeze accounts on high-confidence fraud signal',
    NEW_USER_GOSELLR_PROMO: 'Grant new users $10 discount on first order',
    FRANCHISE_CAP_OVERRIDE: 'Allow >25 subs per Master (manager permission)',
    MOBILE_APP_BETA: 'Expose /api/mobile endpoints for React Native build',
  };
  return map[key] || 'No description';
}
