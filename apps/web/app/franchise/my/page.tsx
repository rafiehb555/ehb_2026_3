'use client';

import Link from 'next/link';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';
import { Button3D } from '@/components/ui/button-3d';
import { StlBadge } from '@/components/ui/stl-badge';

// Phase 1 demo — shows a simulated approved franchise.
// In Week 6 this is wired to /api/franchise/my with real DB data.

export default function MyFranchisePage() {
  const demo = {
    serial: 'EHB-PK-R1-P1-L1-001',
    level: 'L1 Basic',
    type: 'Sub · Foundation',
    usdPaid: 5000,
    ehbgcLocked: 5000,
    commissionCapPerDay: 200,
    area: 'F-10 Islamabad',
    status: 'active',
    kpi: {
      usersInZone: 0,
      ordersThisMonth: 0,
      earningsThisMonth: 0,
    },
    stl: 3,
  };

  const monthlyVolume = 50000;
  const platformCut = monthlyVolume * 0.02;
  const split = {
    company: platformCut * 0.4,
    sub: platformCut * 0.25,
    master: platformCut * 0.2,
    corporate: platformCut * 0.15,
  };

  return (
    <main className="min-h-screen py-10">
      <div className="mx-auto max-w-5xl px-6">
        <Link href="/franchise" className="text-xs text-white/50 hover:text-white">
          ← All franchise tiers
        </Link>

        {/* Header */}
        <PlasticCard className="mt-4 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Chip tone="ok">{demo.status}</Chip>
              <h1 className="mt-3 text-2xl font-bold">{demo.type} · {demo.level}</h1>
              <div className="mt-1 font-mono text-xs text-white/50">{demo.serial}</div>
              <div className="mt-2 text-sm text-white/60">Area: {demo.area}</div>
            </div>
            <StlBadge level={demo.stl} size="lg" />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Metric label="USD paid" value={`$${demo.usdPaid.toLocaleString()}`} />
            <Metric label="EHBGC locked" value={`${demo.ehbgcLocked.toLocaleString()}`} />
            <Metric
              label="Commission cap/day"
              value={`$${demo.commissionCapPerDay}`}
            />
          </div>
        </PlasticCard>

        {/* KPIs + Projection */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <PlasticCard className="p-5">
            <div className="text-xs uppercase tracking-widest text-white/40">
              Live KPIs (this month)
            </div>
            <h3 className="mt-1 text-lg font-semibold">Your territory performance</h3>
            <div className="mt-4 space-y-3">
              <KpiRow label="Users in zone" value={demo.kpi.usersInZone} />
              <KpiRow label="Orders completed" value={demo.kpi.ordersThisMonth} />
              <KpiRow
                label="Earnings settled"
                value={`$${demo.kpi.earningsThisMonth.toLocaleString()}`}
              />
            </div>
            <div className="mt-4 rounded-card border border-glass bg-nested p-3 text-xs text-white/60">
              You're a brand-new franchisee. Start by onboarding sellers and riders in your zone
              to unlock commission.
            </div>
          </PlasticCard>

          <PlasticCard className="p-5">
            <div className="text-xs uppercase tracking-widest text-white/40">
              Projected earnings
            </div>
            <h3 className="mt-1 text-lg font-semibold">
              At {`$${monthlyVolume.toLocaleString()}`} monthly volume
            </h3>
            <div className="mt-4 space-y-2 text-xs">
              <SplitRow label="Your (Sub) cut" value={`$${split.sub.toFixed(2)}`} tone="teal" />
              <SplitRow label="Master" value={`$${split.master.toFixed(2)}`} tone="amber" />
              <SplitRow label="Corporate" value={`$${split.corporate.toFixed(2)}`} tone="purple" />
              <SplitRow label="Company (EHB)" value={`$${split.company.toFixed(2)}`} tone="default" />
            </div>
            <div className="mt-4 flex justify-end">
              <Link href="/franchise/calculator">
                <Button3D size="sm" variant="blue">
                  Model other volumes →
                </Button3D>
              </Link>
            </div>
          </PlasticCard>
        </div>

        {/* Serial breakdown */}
        <PlasticCard className="mt-6 p-5">
          <div className="text-xs uppercase tracking-widest text-white/40">Serial breakdown</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Chip>Country: PK</Chip>
            <Chip>Round: R1</Chip>
            <Chip>Phase: P1</Chip>
            <Chip tone="purple">Level: L1</Chip>
            <Chip tone="ok">Number: 001</Chip>
          </div>
          <p className="mt-3 text-xs text-white/50">
            Format: <code className="rounded bg-white/5 px-1 py-0.5">EHB-[CountryCode]-R[Round]-P[Phase]-L[Level]-[Number]</code>
          </p>
        </PlasticCard>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-card border border-glass bg-nested p-3">
      <div className="text-xs uppercase text-white/40">{label}</div>
      <div className="mt-1 text-xl font-bold tabular-nums">{value}</div>
    </div>
  );
}

function KpiRow({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex items-center justify-between rounded-chip border border-glass bg-nested/60 px-3 py-2">
      <span className="text-xs text-white/60">{label}</span>
      <span className="text-sm font-semibold tabular-nums">{value}</span>
    </div>
  );
}

function SplitRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'purple' | 'teal' | 'amber' | 'default';
}) {
  return (
    <div className="flex items-center justify-between">
      <Chip tone={tone}>{label}</Chip>
      <span className="tabular-nums text-white/80">{value}</span>
    </div>
  );
}
