'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-context';
import { PublicNav } from '@/components/ui/public-nav';
import { PublicFooter } from '@/components/ui/public-footer';
import { PlasticCard } from '@/components/ui/plastic-card';
import { KpiCard } from '@/components/ui/kpi-card';
import { Button3D } from '@/components/ui/button-3d';
import { Chip } from '@/components/ui/chip';
import { StlBadge } from '@/components/ui/stl-badge';

interface MyOrder {
  _id: string;
  orderNumber: string;
  status: string;
  totals: { totalUsd: number };
  createdAt: string;
  items: any[];
}

const STATUS_TONE: Record<string, 'purple' | 'teal' | 'amber' | 'ok' | 'fail' | 'default'> = {
  pending: 'default',
  paid: 'purple',
  ready: 'teal',
  assigned: 'amber',
  in_transit: 'amber',
  delivered: 'teal',
  confirmed: 'ok',
  cancelled: 'fail',
};

export default function SellerDashboardPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<MyOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    api
      .get<{ orders: MyOrder[] }>('/api/orders/seller')
      .then((r) => setOrders(r.orders || []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [user]);

  const totalEarnings = orders
    .filter((o) => o.status === 'confirmed')
    .reduce((a, b) => a + (b.totals?.totalUsd || 0) * 0.7, 0);
  const pendingOrders = orders.filter((o) => ['paid', 'ready', 'assigned', 'in_transit', 'delivered'].includes(o.status)).length;
  const confirmedOrders = orders.filter((o) => o.status === 'confirmed').length;

  if (!user) {
    return (
      <>
        <PublicNav />
        <main className="flex min-h-screen items-center justify-center p-6">
          <PlasticCard className="max-w-md p-8 text-center">
            <div className="text-5xl">🏪</div>
            <h2 className="mt-4 text-xl font-semibold">Sign in as a seller</h2>
            <p className="mt-2 text-sm text-white/60">
              Sellers need STL L4+ to list products.
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <Link href="/login" className="rounded-chip border border-glass bg-card/60 px-4 py-2 text-sm">
                Login
              </Link>
              <Link href="/register" className="rounded-chip bg-gradient-to-r from-[#7B6EF6] to-[#A098F8] px-4 py-2 text-sm font-semibold">
                Register
              </Link>
            </div>
          </PlasticCard>
        </main>
        <PublicFooter />
      </>
    );
  }

  const sellerStlLevel = user.stl?.level || 1;
  const canList = sellerStlLevel >= 4;

  return (
    <>
      <PublicNav />
      <main className="min-h-screen py-6 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Hero */}
          <PlasticCard className="overflow-hidden p-0">
            <div
              className="p-5 sm:p-8"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(44, 191, 160, 0.05) 60%, transparent)',
              }}
            >
              <div className="flex flex-wrap items-start gap-4 sm:gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-card bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] text-4xl shadow-2xl sm:h-20 sm:w-20 sm:text-5xl">
                  🏪
                </div>
                <div className="min-w-0 flex-1">
                  <Chip tone="purple">Seller Dashboard</Chip>
                  <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
                    Welcome back{user.name ? `, ${user.name}` : ''}
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-white/60">Your STL:</span>
                    <StlBadge level={sellerStlLevel} size="xs" />
                    {canList ? (
                      <Chip tone="ok">Can list</Chip>
                    ) : (
                      <Chip tone="warn">Need L4+ to list</Chip>
                    )}
                  </div>
                </div>
                <Link href="/gosellr/sell/new">
                  <Button3D variant="purple" disabled={!canList}>
                    + List new product
                  </Button3D>
                </Link>
              </div>
            </div>
          </PlasticCard>

          {!canList ? (
            <PlasticCard className="mt-4 p-5">
              <div className="flex items-start gap-3">
                <div className="text-3xl">🔒</div>
                <div>
                  <h3 className="text-lg font-semibold">Unlock selling — reach STL L4</h3>
                  <p className="mt-2 text-sm text-white/60">
                    You're currently L{sellerStlLevel}. To list products on GoSellr, you need
                    STL L4 STANDARD. Here's how to get there:
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs text-white/70">
                    <li>• Take a CRB MCQ exam (any category) — raises CRB level</li>
                    <li>• Complete 5 buying transactions — builds DMO score</li>
                    <li>• Lock 80 EHBGC in wallet (L4 requirement)</li>
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link href="/crb/exams">
                      <Button3D size="sm" variant="blue">
                        Take CRB exam
                      </Button3D>
                    </Link>
                    <Link href="/dmo/stl">
                      <Button3D size="sm" variant="purple">
                        View STL ladder
                      </Button3D>
                    </Link>
                  </div>
                </div>
              </div>
            </PlasticCard>
          ) : null}

          {/* KPIs */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <KpiCard label="Lifetime earnings (70%)" value={`$${totalEarnings.toFixed(2)}`} tone="ok" icon="💰" />
            <KpiCard label="Confirmed orders" value={confirmedOrders} tone="teal" icon="✅" />
            <KpiCard label="In progress" value={pendingOrders} tone="amber" icon="⏳" />
            <KpiCard label="Your STL" value={`L${sellerStlLevel}`} tone="purple" icon="⭐" />
          </div>

          {/* Recent orders */}
          <PlasticCard className="mt-6 p-0">
            <div className="border-b border-glass px-5 py-4">
              <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                Recent orders on your products
              </div>
              <h3 className="mt-1 text-base font-semibold sm:text-lg">
                {orders.length} total · {pendingOrders} pending action
              </h3>
            </div>
            {loading ? (
              <div className="p-8 text-center text-sm text-white/50">Loading…</div>
            ) : orders.length === 0 ? (
              <div className="p-8 text-center text-sm text-white/50">
                No orders yet. List a product to start receiving orders.
              </div>
            ) : (
              <ul className="divide-y divide-white/5">
                {orders.slice(0, 10).map((o) => (
                  <li key={o._id} className="p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="font-mono text-[11px] text-white/50">{o.orderNumber}</span>
                          <Chip tone={STATUS_TONE[o.status] || 'default'}>{o.status}</Chip>
                        </div>
                        <div className="mt-1 text-sm font-semibold">
                          {o.items?.length || 0} item · ${o.totals?.totalUsd?.toFixed(2)}
                          <span className="ml-2 text-xs text-[#38C878]">
                            Your cut: ${((o.totals?.totalUsd || 0) * 0.7).toFixed(2)}
                          </span>
                        </div>
                        <div className="mt-1 text-[11px] text-white/40">
                          Placed {new Date(o.createdAt).toLocaleString()}
                        </div>
                      </div>
                      {o.status === 'paid' ? (
                        <Button3D size="sm" variant="green">
                          Mark ready
                        </Button3D>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </PlasticCard>

          {/* Seller journey explainer */}
          <PlasticCard className="mt-6 p-5">
            <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
              Seller journey
            </div>
            <h3 className="mt-1 text-lg font-semibold">How you earn as a seller</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <JourneyStep n={1} t="List product" d="Add title, price, stock, images, product STL" />
              <JourneyStep n={2} t="Receive order" d="Buyer pays — escrow locks 100% of order" />
              <JourneyStep n={3} t="Mark ready" d="Package goods — system auto-assigns rider" />
              <JourneyStep n={4} t="Delivery confirmed" d="You get 70% instantly. Rider 10%. EHB 10%. Franchise 10%." />
            </div>
          </PlasticCard>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}

function JourneyStep({ n, t, d }: { n: number; t: string; d: string }) {
  return (
    <div className="rounded-card border border-glass bg-nested/60 p-3">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-purple to-teal text-xs font-bold">
          {n}
        </div>
        <div className="text-sm font-semibold">{t}</div>
      </div>
      <div className="mt-2 text-[11px] text-white/60">{d}</div>
    </div>
  );
}
