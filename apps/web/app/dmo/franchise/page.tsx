'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DmoTopbar } from '@/components/dmo/topbar';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';
import { StlBadge } from '@/components/ui/stl-badge';

// Phase 1 demo list
const demoFranchises = [
  { serial: 'EHB-PK-R1-P1-L1-001', type: 'Sub', level: 'L1', owner: 'Ahmed Raza', area: 'F-10 Isl', status: 'active', stl: 3, ordersThisMonth: 48 },
  { serial: 'EHB-PK-R1-P1-L2-002', type: 'Sub', level: 'L2', owner: 'Zainab Iqbal', area: 'Gulberg Lhr', status: 'active', stl: 5, ordersThisMonth: 122 },
  { serial: 'EHB-PK-R1-P1-L3-003', type: 'Sub', level: 'L3', owner: 'Bilal Khan', area: 'Saddar Khi', status: 'active', stl: 6, ordersThisMonth: 280 },
  { serial: 'EHB-PK-R1-P1-OF1-001', type: 'Online', level: 'OF1', owner: 'Fatima Sheikh', area: 'National', status: 'active', stl: 4, ordersThisMonth: 34 },
  { serial: 'EHB-PK-R1-P1-OF2-002', type: 'Online', level: 'OF2', owner: 'Usman Ali', area: 'Punjab', status: 'active', stl: 5, ordersThisMonth: 95 },
  { serial: 'EHB-PK-R1-P1-L5-004', type: 'Sub', level: 'L5', owner: 'Ayesha Malik', area: 'DHA Khi', status: 'suspended', stl: 3, ordersThisMonth: 0 },
];

export default function DmoFranchiseListPage() {
  const [filter, setFilter] = useState<'all' | 'Sub' | 'Online'>('all');
  const [q, setQ] = useState('');

  const filtered = demoFranchises.filter(
    (f) =>
      (filter === 'all' || f.type === filter) &&
      (q === '' ||
        f.serial.toLowerCase().includes(q.toLowerCase()) ||
        f.owner.toLowerCase().includes(q.toLowerCase()) ||
        f.area.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <>
      <DmoTopbar
        title="Franchise Control"
        subtitle="All active + suspended franchises in your jurisdiction"
        breadcrumb={['Operations', 'Franchise']}
      />
      <div className="p-4 sm:p-6">
        <PlasticCard className="overflow-hidden">
          <div className="flex flex-wrap items-center gap-2 border-b border-glass px-4 py-3 sm:gap-3 sm:px-5 sm:py-4">
            <div className="flex gap-2">
              {(['all', 'Sub', 'Online'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-chip border px-3 py-2 text-xs ${
                    filter === f
                      ? 'border-purple-light bg-purple/20 text-white'
                      : 'border-glass text-white/60 hover:text-white'
                  }`}
                >
                  {f === 'all' ? 'All' : f}
                </button>
              ))}
            </div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search serial / owner / area…"
              className="w-full rounded-input border border-glass bg-nested px-3 py-2 text-xs sm:ml-auto sm:w-64"
            />
          </div>
          <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-glass text-[11px] uppercase text-white/40">
                <th className="px-5 py-3">Serial</th>
                <th className="px-5 py-3">Type/Level</th>
                <th className="px-5 py-3">Owner</th>
                <th className="px-5 py-3">Area</th>
                <th className="px-5 py-3">STL</th>
                <th className="px-5 py-3">Orders/mo</th>
                <th className="px-5 py-3">Status</th>
                <th />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((f) => (
                <tr key={f.serial} className="hover:bg-white/[0.02]">
                  <td className="px-5 py-3 font-mono text-xs text-white/70">{f.serial}</td>
                  <td className="px-5 py-3">
                    <Chip tone={f.type === 'Sub' ? 'purple' : 'teal'}>
                      {f.type} {f.level}
                    </Chip>
                  </td>
                  <td className="px-5 py-3">{f.owner}</td>
                  <td className="px-5 py-3 text-white/60">{f.area}</td>
                  <td className="px-5 py-3">
                    <StlBadge level={f.stl} size="xs" />
                  </td>
                  <td className="px-5 py-3 tabular-nums">{f.ordersThisMonth}</td>
                  <td className="px-5 py-3">
                    {f.status === 'active' ? (
                      <Chip tone="ok">{f.status}</Chip>
                    ) : (
                      <Chip tone="fail">{f.status}</Chip>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <Link
                      href={`/dmo/franchise/${f.serial}`}
                      className="text-xs text-purple-light hover:underline"
                    >
                      Open →
                    </Link>
                  </td>
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
