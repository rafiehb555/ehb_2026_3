'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';
import { DmoTopbar } from '@/components/dmo/topbar';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';
import { Button3D } from '@/components/ui/button-3d';

interface App {
  id: string;
  userId: string;
  tier: string;
  level: string;
  country: string;
  submittedAt: string;
  status: string;
}

export default function ApprovalsPage() {
  const [queue, setQueue] = useState<App[]>([]);
  const [actioned, setActioned] = useState<Record<string, string>>({});

  useEffect(() => {
    api
      .get<{ queue: App[] }>('/api/dmo/applications/queue')
      .then((r) => setQueue(r.queue))
      .catch(() => {});
  }, []);

  function act(id: string, action: 'approved' | 'rejected' | 'info') {
    setActioned((s) => ({ ...s, [id]: action }));
    // Phase 1: local state only; Week 6 wires to real endpoint + DB
  }

  function generateSerial(app: App, idx: number) {
    const pad = String(idx + 1).padStart(3, '0');
    return `EHB-${app.country}-R1-P1-${app.level}-${pad}`;
  }

  return (
    <>
      <DmoTopbar
        title="Franchise Approvals"
        subtitle="Queue of pending applications"
        breadcrumb={['Operations', 'Approvals']}
      />
      <div className="p-6">
        <PlasticCard className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-glass px-5 py-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/40">Queue</div>
              <h3 className="mt-1 text-lg font-semibold">{queue.length} pending</h3>
            </div>
            <div className="flex gap-2">
              <Chip tone="warn">SLA 48h</Chip>
              <Chip tone="purple">You: DMO Manager</Chip>
            </div>
          </div>

          {queue.length === 0 ? (
            <div className="p-10 text-center text-sm text-white/50">
              No pending applications. Applicants appear here when someone submits via
              /franchise/apply.
            </div>
          ) : (
            <ul className="divide-y divide-white/5">
              {queue.map((app, idx) => {
                const status = actioned[app.id] || app.status;
                return (
                  <li key={app.id} className="p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="text-xs text-white/40">
                          <span className="font-mono">{app.id}</span> · submitted{' '}
                          {new Date(app.submittedAt).toLocaleString()}
                        </div>
                        <div className="mt-1 text-sm">
                          <span className="font-semibold">User:</span> {app.userId} ·{' '}
                          <Chip tone={app.tier === 'Sub' ? 'purple' : 'teal'}>
                            {app.tier} {app.level}
                          </Chip>{' '}
                          <Chip>{app.country}</Chip>
                        </div>
                      </div>

                      {status === 'pending' ? (
                        <div className="flex gap-2">
                          <Button3D size="sm" variant="green" onClick={() => act(app.id, 'approved')}>
                            Approve
                          </Button3D>
                          <Button3D size="sm" variant="red" onClick={() => act(app.id, 'rejected')}>
                            Reject
                          </Button3D>
                          <Button3D size="sm" variant="blue" onClick={() => act(app.id, 'info')}>
                            Request info
                          </Button3D>
                        </div>
                      ) : status === 'approved' ? (
                        <div className="flex items-center gap-2">
                          <Chip tone="ok">Approved</Chip>
                          <span className="font-mono text-xs text-white/60">
                            {generateSerial(app, idx)}
                          </span>
                        </div>
                      ) : status === 'rejected' ? (
                        <Chip tone="fail">Rejected</Chip>
                      ) : (
                        <Chip tone="warn">Info requested</Chip>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </PlasticCard>
      </div>
    </>
  );
}
