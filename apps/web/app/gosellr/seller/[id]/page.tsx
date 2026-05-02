'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { PlasticCard } from '@/components/ui/plastic-card';
import { StlBadge } from '@/components/ui/stl-badge';
import { Chip } from '@/components/ui/chip';

export default function SellerStorefrontPage() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.get(`/api/gosellr/sellers/${params?.id}`).then(setData).catch(() => setData({ demo: true }));
  }, [params?.id]);

  const seller = data?.seller || { name: 'Demo Seller', stl: { level: 7 } };
  const products = data?.products || [];
  const aggregate = data?.aggregate || { avg: 4.6, count: 28 };

  return (
    <main className="min-h-screen py-8">
      <div className="mx-auto max-w-5xl px-6">
        <Link href="/gosellr" className="text-xs text-white/50 hover:text-white">
          ← Marketplace
        </Link>

        <PlasticCard className="mt-4 p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-teal">Seller storefront</div>
              <h1 className="mt-2 text-3xl font-bold">{seller.name || seller.email}</h1>
              <div className="mt-2 flex items-center gap-3 text-sm text-white/60">
                <span>
                  ⭐ {aggregate.avg?.toFixed(1)} ({aggregate.count} reviews)
                </span>
                <span>•</span>
                <span>{products.length} products</span>
              </div>
            </div>
            <StlBadge level={seller.stl?.level || 1} size="lg" />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Chip tone="purple">PSS L{seller.pss?.level || 0}</Chip>
            <Chip tone="teal">CRB L{seller.crb?.level || 0}</Chip>
            <Chip tone="ok">Verified</Chip>
          </div>
        </PlasticCard>

        <PlasticCard className="mt-6 p-6">
          <h3 className="text-lg font-semibold">Products</h3>
          {products.length === 0 ? (
            <div className="mt-3 text-sm text-white/40">No products listed yet.</div>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p: any) => (
                <Link key={p._id} href={`/gosellr/${p.slug}`}>
                  <div className="rounded-card border border-glass bg-nested p-4 hover:border-purple-light">
                    <div className="flex h-24 items-center justify-center rounded-card bg-gradient-to-br from-purple/20 to-teal/10 text-4xl">
                      📦
                    </div>
                    <div className="mt-3 text-sm font-semibold">{p.title}</div>
                    <div className="mt-1 flex items-center justify-between text-xs">
                      <span className="tabular-nums">${p.priceUsd}</span>
                      <StlBadge level={p.productStl} size="xs" showName={false} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </PlasticCard>
      </div>
    </main>
  );
}
