'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { PlasticCard } from '@/components/ui/plastic-card';
import { StlBadge } from '@/components/ui/stl-badge';
import { Chip } from '@/components/ui/chip';
import { PublicNav } from '@/components/ui/public-nav';
import { PublicFooter } from '@/components/ui/public-footer';

interface Product {
  _id: string;
  slug: string;
  title: string;
  description?: string;
  category?: string;
  priceUsd: number;
  productStl: number;
  images?: string[];
  stats?: { ratingAvg?: number; ratingCount?: number; deliverySpeedHours?: number };
}

const DEMO_PRODUCTS: Product[] = [
  { _id: 'd1', slug: 'demo-1', title: 'Organic Basmati Rice 5kg', priceUsd: 22, productStl: 7, category: 'Food', stats: { ratingAvg: 4.8, ratingCount: 42, deliverySpeedHours: 3 } },
  { _id: 'd2', slug: 'demo-2', title: 'Handcrafted Leather Wallet', priceUsd: 48, productStl: 8, category: 'Accessories', stats: { ratingAvg: 4.6, ratingCount: 18, deliverySpeedHours: 6 } },
  { _id: 'd3', slug: 'demo-3', title: 'Premium Tea Gift Set', priceUsd: 35, productStl: 6, category: 'Food', stats: { ratingAvg: 4.9, ratingCount: 89, deliverySpeedHours: 2 } },
  { _id: 'd4', slug: 'demo-4', title: 'Bluetooth Earbuds Pro', priceUsd: 85, productStl: 5, category: 'Electronics', stats: { ratingAvg: 4.2, ratingCount: 156, deliverySpeedHours: 4 } },
  { _id: 'd5', slug: 'demo-5', title: 'Vintage Ajrak Shawl', priceUsd: 62, productStl: 9, category: 'Apparel', stats: { ratingAvg: 5.0, ratingCount: 12, deliverySpeedHours: 12 } },
  { _id: 'd6', slug: 'demo-6', title: 'Ceramic Dinnerware Set', priceUsd: 120, productStl: 7, category: 'Home', stats: { ratingAvg: 4.7, ratingCount: 34, deliverySpeedHours: 8 } },
];

export default function GoSellrPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('rank');
  const [minStl, setMinStl] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<{ items: Product[] }>(`/api/gosellr/products?sort=${sort}&minStl=${minStl}`);
        setProducts(res.items?.length ? res.items : DEMO_PRODUCTS);
      } catch {
        setProducts(DEMO_PRODUCTS);
      } finally {
        setLoading(false);
      }
    })();
  }, [sort, minStl]);

  const filtered = q
    ? products.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()))
    : products;

  return (
    <>
      <PublicNav />
      <main className="min-h-screen">
      <section className="border-b border-glass bg-gradient-to-br from-[#13162A] via-[#0C0E1A] to-[#1A1D33]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
          <div className="inline-block rounded-chip border border-glass bg-card/60 px-3 py-1 text-[10px] text-teal sm:text-xs">
            GoSellr Marketplace · STL-ranked
          </div>
          <h1 className="mt-3 text-3xl font-bold sm:mt-4 sm:text-4xl md:text-5xl">
            Trusted marketplace.{' '}
            <span className="bg-gradient-to-r from-[#7B6EF6] to-[#2BBFA0] bg-clip-text text-transparent">
              Ranked by trust.
            </span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/60 sm:text-base">
            Every listing carries a composite STL level. MIN-chain enforcement means a low-trust
            seller caps the product's display rank.
          </p>
        </div>
      </section>

      {/* How this works intro */}
      <section className="border-b border-glass bg-nested/20">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="flex items-start gap-3 rounded-card border border-glass bg-card/60 p-4">
              <span className="text-2xl">🛒</span>
              <div>
                <div className="text-sm font-semibold">1. Browse & filter</div>
                <div className="mt-1 text-[11px] text-white/60">
                  Products ranked by composite STL × rating × delivery speed. Filter by min STL
                  for higher trust.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-card border border-glass bg-card/60 p-4">
              <span className="text-2xl">🔒</span>
              <div>
                <div className="text-sm font-semibold">2. Escrow checkout</div>
                <div className="mt-1 text-[11px] text-white/60">
                  Your EHBGC locks at payment. Seller ships → rider delivers → you confirm → funds
                  release.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-card border border-glass bg-card/60 p-4">
              <span className="text-2xl">⭐</span>
              <div>
                <div className="text-sm font-semibold">3. Rate & review</div>
                <div className="mt-1 text-[11px] text-white/60">
                  Your STL tier labels your review. Reviews feed into seller STL. Complaints go to
                  DMO with auto-SLA.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <PlasticCard className="mb-4 p-3 sm:mb-6 sm:p-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-input border border-glass bg-nested px-3 py-2 text-sm sm:w-64"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-input border border-glass bg-nested px-3 py-2 text-xs"
            >
              <option value="rank">Rank (STL × rating × speed)</option>
              <option value="price_asc">Price: low → high</option>
              <option value="price_desc">Price: high → low</option>
              <option value="newest">Newest</option>
            </select>
            <div className="flex items-center gap-2 text-xs text-white/60">
              <span>Min STL:</span>
              <select
                value={minStl}
                onChange={(e) => setMinStl(Number(e.target.value))}
                className="rounded-input border border-glass bg-nested px-2 py-1"
              >
                {[1, 3, 5, 7, 8, 9].map((l) => (
                  <option key={l} value={l}>
                    L{l}+
                  </option>
                ))}
              </select>
            </div>
            <div className="ml-auto text-xs text-white/40">
              {filtered.length} product{filtered.length === 1 ? '' : 's'}
            </div>
          </div>
        </PlasticCard>

        {loading ? (
          <div className="text-white/50">Loading…</div>
        ) : (
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <Link key={p._id} href={`/gosellr/${p.slug}`} className="group">
                <PlasticCard className="flex h-full flex-col p-5 transition group-hover:border-purple-light">
                  <div className="flex h-40 items-center justify-center rounded-card bg-gradient-to-br from-purple/20 to-teal/10 text-6xl">
                    📦
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-2">
                    <h3 className="text-base font-semibold leading-tight">{p.title}</h3>
                    <StlBadge level={p.productStl} size="xs" showName={false} />
                  </div>
                  {p.category ? <Chip>{p.category}</Chip> : null}
                  <div className="mt-auto pt-4 flex items-end justify-between">
                    <div>
                      <div className="text-xs text-white/40">Price</div>
                      <div className="text-xl font-bold tabular-nums">${p.priceUsd}</div>
                    </div>
                    <div className="text-right text-xs text-white/50">
                      <div>
                        ⭐ {p.stats?.ratingAvg?.toFixed(1) || '–'}{' '}
                        <span className="text-white/30">
                          ({p.stats?.ratingCount || 0})
                        </span>
                      </div>
                      <div>⏱ {p.stats?.deliverySpeedHours || '?'}h</div>
                    </div>
                  </div>
                </PlasticCard>
              </Link>
            ))}
          </div>
        )}
      </section>
      </main>
      <PublicFooter />
    </>
  );
}
