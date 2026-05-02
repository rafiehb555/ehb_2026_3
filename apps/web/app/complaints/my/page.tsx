'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';

const TONE: Record<string, 'purple' | 'teal' | 'amber' | 'ok' | 'fail' | 'default'> = {
  open: 'amber',
  in_review: 'purple',
  resolved: 'ok',
  rejected: 'fail',
  escalated: 'fail',
  appealing: 'warn' as any,
};

export default function MyComplaintsPage() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<{ complaints: any[] }>('/api/complaints/my')
      .then((r) => setComplaints(r.complaints))
      .catch((e) => setErr(e?.message || 'Sign in to view complaints'));
  }, []);

  return (
    <main className="min-h-screen py-8">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-3xl font-bold">My Complaints</h1>

        {err ? (
          <PlasticCard className="mt-6 p-6 text-amber">{err}</PlasticCard>
        ) : complaints.length === 0 ? (
          <PlasticCard className="mt-6 p-8 text-center text-white/60">
            No complaints filed. <Link href="/orders" className="text-purple-light">Visit orders</Link>{' '}
            to file one.
          </PlasticCard>
        ) : (
          <ul className="mt-6 space-y-3">
            {complaints.map((c) => (
              <li key={c._id}>
                <PlasticCard className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-mono text-xs text-white/50">{c.complaintNumber}</div>
                      <div className="mt-1 text-sm font-semibold">{c.category}</div>
                      <div className="mt-1 text-xs text-white/50">
                        Filed {new Date(c.createdAt).toLocaleString()} · SLA{' '}
                        {new Date(c.slaDeadlineAt).toLocaleString()}
                      </div>
                      {c.summary ? (
                        <div className="mt-2 text-sm text-white/70">{c.summary}</div>
                      ) : null}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Chip tone={TONE[c.status] || 'default'}>{c.status}</Chip>
                      <Chip tone="purple">Tier {c.tier}</Chip>
                    </div>
                  </div>
                </PlasticCard>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
