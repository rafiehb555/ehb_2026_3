'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';

const TONE: Record<string, 'purple' | 'teal' | 'amber' | 'ok' | 'fail' | 'default'> = {
  pending: 'default',
  paid: 'purple',
  ready: 'teal',
  assigned: 'amber',
  in_transit: 'amber',
  delivered: 'teal',
  confirmed: 'ok',
  cancelled: 'fail',
  disputed: 'fail',
  refunded: 'fail',
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<{ orders: any[] }>('/api/orders/my')
      .then((r) => setOrders(r.orders))
      .catch((e) => setErr(e?.message || 'Sign in to see your orders'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen py-8">
      <div className="mx-auto max-w-4xl px-6">
        <Link href="/gosellr" className="text-xs text-white/50 hover:text-white">
          ← Marketplace
        </Link>
        <h1 className="mt-4 text-3xl font-bold">My Orders</h1>

        {loading ? (
          <div className="mt-6 text-white/50">Loading…</div>
        ) : err ? (
          <PlasticCard className="mt-6 p-6 text-sm text-amber">{err}</PlasticCard>
        ) : orders.length === 0 ? (
          <PlasticCard className="mt-6 p-8 text-center">
            <div className="text-4xl">📭</div>
            <div className="mt-3 text-white/60">No orders yet.</div>
            <Link href="/gosellr" className="mt-3 inline-block text-sm text-purple-light">
              Start shopping →
            </Link>
          </PlasticCard>
        ) : (
          <ul className="mt-6 space-y-3">
            {orders.map((o) => (
              <li key={o._id}>
                <Link href={`/orders/${o._id}`}>
                  <PlasticCard className="p-4 transition hover:border-purple-light">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono text-white/50">{o.orderNumber}</div>
                        <div className="mt-1 text-sm font-semibold">
                          {o.items?.length || 0} item{o.items?.length === 1 ? '' : 's'} · $
                          {o.totals?.totalUsd?.toFixed(2)}
                        </div>
                        <div className="mt-1 text-xs text-white/40">
                          Placed {new Date(o.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <Chip tone={TONE[o.status] || 'default'}>{o.status}</Chip>
                    </div>
                  </PlasticCard>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
