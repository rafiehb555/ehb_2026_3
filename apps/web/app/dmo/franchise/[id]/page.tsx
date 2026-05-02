'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { DmoTopbar } from '@/components/dmo/topbar';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';
import { StlBadge } from '@/components/ui/stl-badge';

export default function FranchiseDetailPage() {
  const params = useParams<{ id: string }>();
  const serial = params?.id ?? 'unknown';

  // Demo payload — Week 8 wires to /api/franchise/:id
  const f = {
    serial,
    type: 'Sub',
    level: 'L1',
    owner: { name: 'Ahmed Raza', email: 'ahmed@demo.ehb', pss: 3, crb: 0 },
    area: 'F-10 Islamabad',
    status: 'active',
    stl: 3,
    pricing: { usdPaid: 5000, ehbgcLocked: 5000, commissionCapPerDay: 200 },
    application: {
      submittedAt: '2026-04-15T10:00:00Z',
      reviewedAt: '2026-04-16T14:00:00Z',
      reviewer: 'Manager · Pakistan',
      decision: 'approved',
    },
    ledger: [
      { ts: '2026-04-20', orderValue: 180, cut: 3.6, share: 0.9 },
      { ts: '2026-04-19', orderValue: 220, cut: 4.4, share: 1.1 },
      { ts: '2026-04-18', orderValue: 95, cut: 1.9, share: 0.48 },
    ],
  };

  return (
    <>
      <DmoTopbar
        title={f.serial}
        subtitle={`${f.type} ${f.level} · ${f.area}`}
        breadcrumb={['Operations', 'Franchise', f.serial]}
      />
      <div className="grid gap-6 p-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <PlasticCard className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/40">Owner</div>
                <div className="mt-1 text-lg font-semibold">{f.owner.name}</div>
                <div className="text-xs text-white/50">{f.owner.email}</div>
                <div className="mt-3 flex gap-2">
                  <Chip tone="purple">PSS L{f.owner.pss}</Chip>
                  <Chip tone={f.owner.crb ? 'teal' : 'warn'}>CRB L{f.owner.crb}</Chip>
                  <StlBadge level={f.stl} size="xs" />
                </div>
              </div>
              <div className="text-right">
                <Chip tone={f.status === 'active' ? 'ok' : 'fail'}>{f.status}</Chip>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Metric label="USD paid" value={`$${f.pricing.usdPaid.toLocaleString()}`} />
              <Metric label="EHBGC locked" value={f.pricing.ehbgcLocked.toLocaleString()} />
              <Metric label="Cap/day" value={`$${f.pricing.commissionCapPerDay}`} />
            </div>
          </PlasticCard>

          <PlasticCard className="p-5">
            <div className="text-xs uppercase tracking-widest text-white/40">Commission ledger</div>
            <h3 className="mt-1 text-lg font-semibold">Recent settlements</h3>
            <table className="mt-3 w-full text-left text-xs">
              <thead className="border-b border-glass text-[10px] uppercase text-white/40">
                <tr>
                  <th className="py-2">Date</th>
                  <th className="py-2">Order value</th>
                  <th className="py-2">Platform cut (2%)</th>
                  <th className="py-2">Your share (25%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {f.ledger.map((l) => (
                  <tr key={l.ts}>
                    <td className="py-2 text-white/60">{l.ts}</td>
                    <td className="py-2 tabular-nums">${l.orderValue}</td>
                    <td className="py-2 tabular-nums text-white/60">${l.cut}</td>
                    <td className="py-2 tabular-nums text-teal">${l.share}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PlasticCard>
        </div>

        <div className="space-y-6">
          <PlasticCard className="p-5">
            <div className="text-xs uppercase tracking-widest text-white/40">Application</div>
            <div className="mt-3 space-y-2 text-xs text-white/60">
              <Row label="Submitted" value={new Date(f.application.submittedAt).toLocaleString()} />
              <Row label="Reviewed" value={new Date(f.application.reviewedAt).toLocaleString()} />
              <Row label="Reviewer" value={f.application.reviewer} />
              <Row label="Decision" value={f.application.decision} highlight />
            </div>
          </PlasticCard>

          <PlasticCard className="p-5">
            <div className="text-xs uppercase tracking-widest text-white/40">DMO actions</div>
            <div className="mt-3 space-y-2 text-xs">
              <Link
                href={`/dmo/franchise`}
                className="block rounded-chip border border-glass bg-nested/60 px-3 py-2 text-white/70 hover:border-purple-light"
              >
                ← Back to list
              </Link>
              <button className="block w-full rounded-chip border border-glass bg-nested/60 px-3 py-2 text-left text-white/70 hover:border-amber/60">
                Suspend franchise
              </button>
              <button className="block w-full rounded-chip border border-glass bg-nested/60 px-3 py-2 text-left text-white/70 hover:border-red-500/60">
                Terminate
              </button>
            </div>
          </PlasticCard>
        </div>
      </div>
    </>
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

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      {highlight ? <Chip tone="ok">{value}</Chip> : <span className="text-white/80">{value}</span>}
    </div>
  );
}
