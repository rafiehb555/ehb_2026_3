'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';
import { DmoTopbar } from '@/components/dmo/topbar';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';

export default function DmoRidersPage() {
  const [riders, setRiders] = useState<any[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<{ riders: any[] }>('/api/riders/online')
      .then((r) => setRiders(r.riders))
      .catch((e) => setErr(e?.message || 'Failed to load riders'));
  }, []);

  return (
    <>
      <DmoTopbar
        title="Riders"
        subtitle="Online active riders — assignment algorithm candidates"
        breadcrumb={['Operations', 'Riders']}
      />
      <div className="p-4 sm:p-6">
        {err ? (
          <div className="mb-4 rounded-card border border-[#F0A030]/40 bg-[#F0A030]/10 p-3 text-sm text-[#F0A030]">
            {err}
          </div>
        ) : null}
        <PlasticCard className="p-0">
          <div className="flex items-center justify-between border-b border-glass px-5 py-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/40">Online</div>
              <h3 className="mt-1 text-lg font-semibold">{riders.length} rider{riders.length === 1 ? '' : 's'}</h3>
            </div>
            <Chip tone="ok">● live</Chip>
          </div>
          {riders.length === 0 ? (
            <div className="p-10 text-center text-sm text-white/50">No online riders right now.</div>
          ) : (
            <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-glass text-[11px] uppercase text-white/40">
                  <th className="px-5 py-3">Rider</th>
                  <th className="px-5 py-3">Zone</th>
                  <th className="px-5 py-3">Vehicle</th>
                  <th className="px-5 py-3 text-right">Rating</th>
                  <th className="px-5 py-3 text-right">Active</th>
                  <th className="px-5 py-3 text-right">Done</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {riders.map((r) => (
                  <tr key={r._id}>
                    <td className="px-5 py-3 font-mono text-xs">{String(r._id).slice(-6)}</td>
                    <td className="px-5 py-3">{r.zone}</td>
                    <td className="px-5 py-3">{r.vehicleType}</td>
                    <td className="px-5 py-3 text-right tabular-nums">⭐ {r.rating?.toFixed(1) || '–'}</td>
                    <td className="px-5 py-3 text-right tabular-nums">{r.stats?.activeOrders || 0}</td>
                    <td className="px-5 py-3 text-right tabular-nums">{r.stats?.totalDeliveries || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          )}
        </PlasticCard>
      </div>
    </>
  );
}
