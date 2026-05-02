'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';
import { Button3D } from '@/components/ui/button-3d';
import { StlBadge } from '@/components/ui/stl-badge';

const STATUS_STEPS = [
  'pending',
  'paid',
  'ready',
  'assigned',
  'in_transit',
  'delivered',
  'confirmed',
];

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function reload() {
    try {
      const o = await api.get<any>(`/api/orders/${params?.id}`);
      setOrder(o);
    } catch (e: any) {
      setErr(e?.message || 'Order not found');
    }
  }

  useEffect(() => {
    reload();
  }, [params?.id]);

  async function confirmDelivery() {
    setBusy(true);
    try {
      await api.post(`/api/orders/${params?.id}/confirm-delivery`);
      await reload();
    } catch (e: any) {
      setErr(e?.message || 'Confirm failed');
    } finally {
      setBusy(false);
    }
  }

  async function cancelOrder() {
    setBusy(true);
    try {
      await api.post(`/api/orders/${params?.id}/cancel`);
      await reload();
    } catch (e: any) {
      setErr(e?.message || 'Cancel failed');
    } finally {
      setBusy(false);
    }
  }

  if (err) return <div className="p-10 text-[#F05858]">{err}</div>;
  if (!order) return <div className="p-10 text-white/50">Loading…</div>;

  const currentStep = STATUS_STEPS.indexOf(order.status);
  const progress = Math.max(0, (currentStep / (STATUS_STEPS.length - 1)) * 100);

  return (
    <main className="min-h-screen py-4 sm:py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Link href="/orders" className="text-xs text-white/50 hover:text-white">
          ← My orders
        </Link>

        <PlasticCard className="mt-4 p-4 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="font-mono text-[11px] text-white/50 sm:text-xs">{order.orderNumber}</div>
              <h1 className="mt-1 text-xl font-bold sm:text-2xl">
                Order · ${order.totals?.totalUsd?.toFixed(2)}
              </h1>
              <div className="mt-2 text-[11px] text-white/40 sm:text-xs">
                Placed {new Date(order.createdAt).toLocaleString()}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Chip tone={order.status === 'confirmed' ? 'ok' : order.status === 'cancelled' ? 'fail' : 'purple'}>
                {order.status}
              </Chip>
              {order.finalStl ? (
                <div className="text-xs text-white/40">
                  MIN-chain: <StlBadge level={order.finalStl} size="xs" showName={false} />
                </div>
              ) : null}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="h-2 overflow-hidden rounded-chip bg-white/5">
              <div
                className="h-full rounded-chip bg-gradient-to-r from-purple to-teal transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 flex flex-wrap gap-3 text-[10px] text-white/40">
              {STATUS_STEPS.map((s, i) => (
                <span key={s} className={i <= currentStep ? 'text-white/70' : ''}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Timeline */}
          {order.timeline?.length ? (
            <div className="mt-6">
              <div className="text-xs uppercase tracking-widest text-white/40">Timeline</div>
              <ul className="mt-2 space-y-1 text-xs">
                {order.timeline.map((t: any, i: number) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-white/30">{new Date(t.at).toLocaleString()}</span>
                    <Chip>{t.event}</Chip>
                    <span className="text-white/40">by {t.by}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </PlasticCard>

        <PlasticCard className="mt-4 p-6">
          <h3 className="text-lg font-semibold">Items</h3>
          <ul className="mt-3 divide-y divide-white/5">
            {order.items?.map((it: any) => (
              <li key={it._id || it.productId} className="flex items-center gap-4 py-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-card bg-gradient-to-br from-purple/20 to-teal/10 text-2xl">
                  📦
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{it.title}</div>
                  <div className="text-xs text-white/40">
                    qty {it.quantity} × ${it.unitPriceUsd}
                  </div>
                </div>
                <StlBadge level={it.productStl || 5} size="xs" showName={false} />
                <div className="w-20 text-right text-sm tabular-nums">
                  ${it.subtotalUsd?.toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        </PlasticCard>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap gap-3">
          {['ready', 'assigned', 'in_transit', 'delivered'].includes(order.status) ? (
            <Button3D variant="green" onClick={confirmDelivery} disabled={busy}>
              {busy ? 'Confirming…' : 'I received my order (confirm delivery)'}
            </Button3D>
          ) : null}
          {['pending', 'paid'].includes(order.status) ? (
            <Button3D variant="red" onClick={cancelOrder} disabled={busy}>
              Cancel order
            </Button3D>
          ) : null}
          <Link
            href={`/complaints/file?orderId=${order._id}`}
            className="rounded-chip border border-glass bg-card/60 px-4 py-2 text-sm hover:border-[#F0A030]"
          >
            File a complaint
          </Link>
        </div>
      </div>
    </main>
  );
}
