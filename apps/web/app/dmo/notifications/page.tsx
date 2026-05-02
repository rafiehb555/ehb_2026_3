'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';
import { DmoTopbar } from '@/components/dmo/topbar';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';
import { Button3D } from '@/components/ui/button-3d';

const TONE: Record<string, 'purple' | 'teal' | 'amber' | 'fail' | 'default'> = {
  order: 'teal',
  delivery: 'teal',
  franchise: 'purple',
  complaint: 'amber',
  stl: 'fail',
  ai: 'purple',
  system: 'default',
  wallet: 'teal',
};

export default function DmoNotificationsPage() {
  const [notifs, setNotifs] = useState<any[]>([]);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    try {
      const r = await api.get<{ notifications: any[] }>('/api/notifications/my');
      setNotifs(r.notifications);
    } catch (e: any) {
      setErr(e?.message);
    }
  }
  useEffect(() => { load(); }, []);

  async function readAll() {
    try {
      await api.post('/api/notifications/read-all');
      load();
    } catch {}
  }

  return (
    <>
      <DmoTopbar
        title="Notifications"
        subtitle="Live alerts — Socket.IO streamed + persistent queue"
        breadcrumb={['Intelligence', 'Notifications']}
      />
      <div className="p-4 sm:p-6">
        {err ? (
          <div className="mb-4 rounded-card border border-[#F0A030]/40 bg-[#F0A030]/10 p-3 text-sm text-[#F0A030]">
            {err} — sign in to see personal notifications
          </div>
        ) : null}
        <PlasticCard className="p-0">
          <div className="flex items-center justify-between border-b border-glass px-5 py-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/40">Recent</div>
              <h3 className="mt-1 text-lg font-semibold">{notifs.length} notifications</h3>
            </div>
            <Button3D size="sm" variant="blue" onClick={readAll}>
              Mark all read
            </Button3D>
          </div>
          {notifs.length === 0 ? (
            <div className="p-10 text-center text-sm text-white/50">All caught up.</div>
          ) : (
            <ul className="divide-y divide-white/5">
              {notifs.map((n) => (
                <li
                  key={n._id}
                  className={`flex items-start gap-3 p-4 ${n.read ? 'opacity-60' : ''}`}
                >
                  <Chip tone={TONE[n.category] || 'default'}>{n.category}</Chip>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{n.title}</div>
                    {n.body ? <div className="mt-1 text-xs text-white/60">{n.body}</div> : null}
                    <div className="mt-1 text-[10px] text-white/40">
                      {new Date(n.createdAt).toLocaleString()}
                    </div>
                  </div>
                  {!n.read ? <span className="h-2 w-2 rounded-full bg-purple" /> : null}
                </li>
              ))}
            </ul>
          )}
        </PlasticCard>
      </div>
    </>
  );
}
