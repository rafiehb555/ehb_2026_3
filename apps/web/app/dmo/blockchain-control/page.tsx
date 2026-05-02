'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';
import { DmoTopbar } from '@/components/dmo/topbar';
import { PlasticCard } from '@/components/ui/plastic-card';
import { KpiCard } from '@/components/ui/kpi-card';
import { Chip } from '@/components/ui/chip';
import { Button3D } from '@/components/ui/button-3d';

interface Meta {
  enabled: boolean;
  network: string;
  parachain: string;
  hashAlgo: string;
}

const DEMO_PROOFS = [
  { hash: '0x2f4a9e1b6c3d8f7e2a1b4c6d8e9f0a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f', type: 'pss_kyc', user: 'user-001', network: 'stub', at: '2m ago' },
  { hash: '0x7b3c9e5d1a8f2b4c6d8e0a2b4c6e8f1a3b5c7d9e1f2a4b6c8d0e2f4a6b8c0d2e', type: 'crb_certificate', user: 'user-003', network: 'stub', at: '15m ago' },
  { hash: '0x4c8d1e3f5a7b9c2d4e6f8a0b2c4d6e8f1a3b5c7d9e1f2a4b6c8d0e2f4a6b8c0d', type: 'commission_settlement', user: 'ORD-DEMO-00042', network: 'stub', at: '1h ago' },
  { hash: '0x9e1f3a5b7c9d2e4f6a8b0c2d4e6f8a1b3c5d7e9f1a3b5c7d9e1f2a4b6c8d0e2f', type: 'franchise_activation', user: 'EHB-PK-R1-P1-L3-045', network: 'stub', at: '3h ago' },
];

export default function BlockchainControlPage() {
  const [meta, setMeta] = useState<Meta | null>(null);

  useEffect(() => {
    api.get<Meta>('/api/blockchain/meta').then(setMeta).catch(() => {});
  }, []);

  return (
    <>
      <DmoTopbar
        title="Blockchain Control"
        subtitle="Polkadot parachain anchor · CRB cert hashes · STL proofs"
        breadcrumb={['Intelligence', 'Blockchain']}
      />
      <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
        <PlasticCard className="p-5">
          <div className="flex flex-wrap items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-card bg-gradient-to-br from-[#7B6EF6] to-[#2BBFA0] text-3xl shadow-2xl">
              🔗
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Chip tone={meta?.enabled ? 'ok' : 'warn'}>
                  {meta?.enabled ? 'Mainnet / Testnet' : 'Stub driver'}
                </Chip>
                <Chip>{meta?.network || 'stub'}</Chip>
                <Chip tone="purple">{meta?.parachain || 'ehb-polkadot'}</Chip>
              </div>
              <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
                On-chain trust anchor
              </h1>
              <p className="mt-2 text-sm text-white/70">
                Every CRB certificate, PSS KYC proof, STL milestone, and commission settlement
                gets hashed (SHA-256 in stub; blake2 in production) and anchored on our Polkadot
                parachain. Immutable evidence for disputes, regulatory audits, and cross-platform
                credential portability.
              </p>
              <div className="mt-2 text-[11px] text-white/50">
                Hash algo: <code className="rounded bg-white/5 px-1">{meta?.hashAlgo || 'sha256'}</code>
              </div>
            </div>
          </div>
        </PlasticCard>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Total proofs" value="1,284" tone="purple" icon="🔐" />
          <KpiCard label="CRB certs" value="312" tone="teal" icon="📜" />
          <KpiCard label="PSS KYC anchors" value="842" tone="amber" icon="🛡️" />
          <KpiCard label="Settlement hashes" value="130" tone="ok" icon="💰" />
        </div>

        {/* Proof types grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { type: 'CRB Certificate', desc: 'Exam pass → hash → 6-month cycle', icon: '📜', color: '#2BBFA0' },
            { type: 'PSS KYC', desc: 'Identity verify → proof anchor', icon: '🛡️', color: '#7B6EF6' },
            { type: 'STL Milestone', desc: 'Level-up events logged', icon: '⭐', color: '#F0A030' },
            { type: 'Wallet Escrow', desc: 'Order escrow lock/release', icon: '💰', color: '#38C878' },
            { type: 'Franchise Activation', desc: 'Serial issued → chain entry', icon: '🌐', color: '#ec4899' },
            { type: 'Commission Settle', desc: 'Post-confirmation hash', icon: '💸', color: '#F05858' },
          ].map((t) => (
            <PlasticCard key={t.type} className="p-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{t.icon}</span>
                <span className="text-sm font-semibold" style={{ color: t.color }}>
                  {t.type}
                </span>
              </div>
              <div className="mt-2 text-xs text-white/60">{t.desc}</div>
            </PlasticCard>
          ))}
        </div>

        {/* Recent proofs */}
        <PlasticCard className="p-0">
          <div className="flex items-center justify-between border-b border-glass px-4 py-3 sm:px-5 sm:py-4">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                Recent proofs
              </div>
              <h3 className="mt-1 text-sm font-semibold sm:text-lg">
                Latest chain anchors · click hash to verify
              </h3>
            </div>
            <Chip tone="purple">Live</Chip>
          </div>
          <ul className="divide-y divide-white/5">
            {DEMO_PROOFS.map((p) => (
              <li key={p.hash} className="p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Chip>{p.type}</Chip>
                  <span className="text-[11px] text-white/40">{p.at}</span>
                  <Chip tone={p.network === 'stub' ? 'warn' as any : 'ok'}>{p.network}</Chip>
                </div>
                <div className="mt-2 font-mono text-[10px] break-all text-teal">
                  {p.hash}
                </div>
                <div className="mt-1 text-xs text-white/60">
                  Target: <span className="font-mono">{p.user}</span>
                </div>
                <div className="mt-2">
                  <Button3D size="sm" variant="blue">
                    Verify on-chain
                  </Button3D>
                </div>
              </li>
            ))}
          </ul>
        </PlasticCard>

        {/* Migration readiness */}
        <PlasticCard className="p-5">
          <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
            Migration readiness
          </div>
          <h3 className="mt-1 text-lg font-semibold">Testnet → Mainnet path</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            <StageBox stage={1} title="Stub driver" status="active" desc="SHA-256 deterministic" />
            <StageBox stage={2} title="Testnet" status="pending" desc="@polkadot/api + Rococo" />
            <StageBox stage={3} title="Audit" status="pending" desc="Smart-contract audit" />
            <StageBox stage={4} title="Mainnet" status="pending" desc="Production anchor" />
          </div>
        </PlasticCard>
      </div>
    </>
  );
}

function StageBox({ stage, title, status, desc }: { stage: number; title: string; status: 'active' | 'pending'; desc: string }) {
  return (
    <div className={`rounded-card border p-3 ${status === 'active' ? 'border-teal/60 bg-teal/10' : 'border-glass bg-nested/60'}`}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-white/40">Stage {stage}</span>
        <Chip tone={status === 'active' ? 'ok' : 'default'}>{status}</Chip>
      </div>
      <div className="mt-1 text-sm font-semibold">{title}</div>
      <div className="mt-1 text-xs text-white/60">{desc}</div>
    </div>
  );
}
