'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { useCart } from '@/lib/cart-context';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Button3D } from '@/components/ui/button-3d';
import { Chip } from '@/components/ui/chip';
import { StlBadge } from '@/components/ui/stl-badge';

export default function ProductDetailPage() {
  const params = useParams<{ productId: string }>();
  const router = useRouter();
  const { add, count } = useCart();
  const [p, setP] = useState<any>(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<any>(`/api/gosellr/products/${params?.productId}`);
        setP(res);
      } catch {
        // Fallback demo
        setP({
          _id: 'demo',
          slug: params?.productId,
          title: 'Demo Product',
          description: 'This is a demo product. Connect MongoDB and seed to see real ones.',
          priceUsd: 99,
          productStl: 7,
          stats: { ratingAvg: 4.5, ratingCount: 20, deliverySpeedHours: 6 },
          seller: { name: 'Demo Seller', email: 'seller@demo.ehb', stl: { level: 6 } },
          chain: { finalStl: 6, finalLevelName: 'HIGH', blockingLayer: 'seller' },
          recentReviews: [],
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [params?.productId]);

  function addToCart() {
    add({
      productId: p._id,
      title: p.title,
      priceUsd: p.priceUsd,
      quantity: qty,
      sellerId: p.seller?._id,
      productStl: p.productStl,
    });
    router.push('/cart');
  }

  if (loading) return <div className="p-10 text-white/50">Loading…</div>;
  if (!p) return <div className="p-10 text-white/50">Product not found.</div>;

  return (
    <main className="min-h-screen py-4 sm:py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Link href="/gosellr" className="text-xs text-white/50 hover:text-white">
            ← Marketplace
          </Link>
          <Link
            href="/cart"
            className="rounded-chip border border-glass bg-card/60 px-3 py-2 text-xs hover:border-purple-light"
          >
            🛒 Cart ({count})
          </Link>
        </div>

        <div className="mt-4 grid gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-[1fr_360px]">
          <PlasticCard className="p-5 sm:p-8">
            <div className="flex h-48 items-center justify-center rounded-card bg-gradient-to-br from-purple/20 to-teal/10 text-7xl sm:h-72 sm:text-9xl">
              📦
            </div>
            <div className="mt-5 flex items-start justify-between gap-3 sm:mt-6 sm:gap-4">
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-bold sm:text-3xl">{p.title}</h1>
                {p.category ? <Chip className="mt-2">{p.category}</Chip> : null}
                <p className="mt-3 text-sm text-white/70">{p.description}</p>
              </div>
              <StlBadge level={p.productStl} size="lg" />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm sm:mt-6 sm:gap-6">
              <div>
                <div className="text-xs text-white/40">Rating</div>
                <div>
                  ⭐ {p.stats?.ratingAvg?.toFixed(1) || '–'}{' '}
                  <span className="text-white/40">({p.stats?.ratingCount || 0})</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-white/40">Delivery</div>
                <div>⏱ ~{p.stats?.deliverySpeedHours || '?'}h</div>
              </div>
              <div>
                <div className="text-xs text-white/40">Stock</div>
                <div>{p.stock ?? '—'}</div>
              </div>
            </div>
          </PlasticCard>

          <div className="space-y-4">
            <PlasticCard className="p-5">
              <div className="text-xs uppercase tracking-widest text-white/40">Price</div>
              <div className="mt-1 text-4xl font-bold tabular-nums">
                ${p.priceUsd?.toLocaleString()}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="h-8 w-8 rounded-chip border border-glass bg-nested text-sm hover:border-purple-light"
                >
                  −
                </button>
                <div className="w-10 text-center tabular-nums">{qty}</div>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="h-8 w-8 rounded-chip border border-glass bg-nested text-sm hover:border-purple-light"
                >
                  +
                </button>
                <span className="ml-auto text-xs text-white/40">
                  = ${(p.priceUsd * qty).toLocaleString()}
                </span>
              </div>

              <Button3D variant="green" size="lg" className="mt-4 w-full" onClick={addToCart}>
                Add to Cart
              </Button3D>
            </PlasticCard>

            {p.seller ? (
              <Link href={`/gosellr/seller/${p.seller._id || 'demo'}`}>
                <PlasticCard className="p-4 transition hover:border-purple-light">
                  <div className="text-xs uppercase tracking-widest text-white/40">Seller</div>
                  <div className="mt-1 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">{p.seller.name || p.seller.email}</div>
                      <div className="text-xs text-white/50">Visit storefront →</div>
                    </div>
                    <StlBadge level={p.seller.stl?.level || 1} size="xs" />
                  </div>
                </PlasticCard>
              </Link>
            ) : null}

            {p.chain ? (
              <PlasticCard className="p-4">
                <div className="text-xs uppercase tracking-widest text-white/40">
                  MIN-chain validation
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-white/70">Final STL</span>
                  <StlBadge level={p.chain.finalStl} size="xs" />
                </div>
                <div className="mt-1 flex items-center justify-between text-xs">
                  <span className="text-white/50">Blocking layer</span>
                  <Chip tone="warn">{p.chain.blockingLayer}</Chip>
                </div>
                <p className="mt-3 text-[11px] text-white/40">
                  Lowest of product / seller / company / owner STL caps the trust rating.
                </p>
              </PlasticCard>
            ) : null}
          </div>
        </div>

        {/* Reviews */}
        <PlasticCard className="mt-6 p-6">
          <div className="text-xs uppercase tracking-widest text-white/40">Reviews</div>
          <h3 className="mt-1 text-lg font-semibold">
            What verified buyers say ({p.recentReviews?.length || 0})
          </h3>
          {p.recentReviews?.length ? (
            <ul className="mt-4 space-y-3">
              {p.recentReviews.map((r: any) => (
                <li key={r._id} className="rounded-card border border-glass bg-nested p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-amber">{'⭐'.repeat(r.rating)}</span>
                      <Chip tone="purple">L{r.buyerStlTier || 1} buyer</Chip>
                    </div>
                    <span className="text-xs text-white/40">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {r.title ? <div className="mt-2 text-sm font-semibold">{r.title}</div> : null}
                  {r.body ? <div className="mt-1 text-sm text-white/70">{r.body}</div> : null}
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4 text-sm text-white/40">No reviews yet.</div>
          )}
        </PlasticCard>
      </div>
    </main>
  );
}
