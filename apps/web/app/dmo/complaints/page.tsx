'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';
import { DmoTopbar } from '@/components/dmo/topbar';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';
import { Button3D } from '@/components/ui/button-3d';

const TIER_TONE: Record<number, 'default' | 'purple' | 'teal' | 'amber' | 'warn' | 'fail'> = {
  1: 'default',
  2: 'teal',
  3: 'purple',
  4: 'amber',
  5: 'warn' as any,
  6: 'fail',
};

export default function DmoComplaintsPage() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [actioned, setActioned] = useState<Record<string, string>>({});
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    try {
      const r = await api.get<{ complaints: any[] }>('/api/complaints/pending');
      setComplaints(r.complaints);
    } catch (e: any) {
      setErr(e?.message || 'Failed to load');
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function resolve(id: string, action: 'resolved' | 'rejected', notes?: string) {
    setActioned((s) => ({ ...s, [id]: action }));
    try {
      await api.post(`/api/complaints/${id}/resolve`, {
        upheld: action === 'resolved',
        action: action === 'resolved' ? 'penalty_applied' : 'dismissed',
        notes,
      });
      await load();
    } catch (e: any) {
      setErr(e?.message);
    }
  }

  return (
    <>
      <DmoTopbar
        title="Complaints Queue"
        subtitle="Tier-sorted pending complaints — upheld ones auto-trigger penalty ladder"
        breadcrumb={['Operations', 'Complaints']}
      />
      <div className="p-4 sm:p-6">
        {err ? (
          <div className="mb-4 rounded-card border border-[#F0A030]/40 bg-[#F0A030]/10 p-3 text-sm text-[#F0A030]">
            {err} — sign in as DMO_MANAGER at /login
          </div>
        ) : null}
        <PlasticCard className="p-0">
          <div className="flex items-center justify-between border-b border-glass px-5 py-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/40">Pending queue</div>
              <h3 className="mt-1 text-lg font-semibold">{complaints.length} open</h3>
            </div>
            <Chip tone="warn">Tier 6 = 2h SLA · Tier 1 = 72h</Chip>
          </div>

          {complaints.length === 0 ? (
            <div className="p-10 text-center text-sm text-white/50">
              No pending complaints. Nice.
            </div>
          ) : (
            <ul className="divide-y divide-white/5">
              {complaints.map((c) => (
                <li key={c._id} className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-white/40">{c.complaintNumber}</span>
                        <Chip tone={TIER_TONE[c.tier]}>Tier {c.tier}</Chip>
                        <Chip>{c.category}</Chip>
                      </div>
                      {c.summary ? (
                        <div className="mt-2 text-sm font-semibold">{c.summary}</div>
                      ) : null}
                      {c.details ? (
                        <div className="mt-1 max-w-xl text-xs text-white/60">{c.details}</div>
                      ) : null}
                      <div className="mt-2 text-xs text-white/40">
                        Filed {new Date(c.createdAt).toLocaleString()} · SLA{' '}
                        {new Date(c.slaDeadlineAt).toLocaleString()}
                      </div>
                    </div>

                    {actioned[c._id] ? (
                      <Chip tone={actioned[c._id] === 'resolved' ? 'ok' : 'fail'}>
                        {actioned[c._id]}
                      </Chip>
                    ) : (
                      <div className="flex gap-2">
                        <Button3D size="sm" variant="green" onClick={() => resolve(c._id, 'resolved')}>
                          Uphold + penalize
                        </Button3D>
                        <Button3D size="sm" variant="red" onClick={() => resolve(c._id, 'rejected')}>
                          Dismiss
                        </Button3D>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </PlasticCard>
      </div>
    </>
  );
}
