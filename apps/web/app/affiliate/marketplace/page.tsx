'use client';

/**
 * Digital Affiliate Marketplace (DAM) — v3.2 §12.3
 *
 * Spec: ehb-info/departments/Affiliate.md §12.3 (v3.2)
 * Founder lock: 2026-04-25
 *
 * Public-facing affiliate product listing page.
 * Sellers list products → affiliates browse → "Promote Now" generates referral link
 * → customer buys via link → affiliate earns commission (Track A 2-layer model).
 *
 * Features:
 *   ✓ Search bar
 *   ✓ 38-industry filter (6 categories)
 *   ✓ Product cards with seller margin + affiliate bonus availability
 *   ✓ Trending / High Commission / Verified badges
 *   ✓ Per-product "Promote Now" → referral link copy
 *   ✓ Hidden 5% network split (only "Affiliate Bonus Available" shown to public)
 */

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-context';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Button3D } from '@/components/ui/button-3d';
import { Chip } from '@/components/ui/chip';
import { PublicNav } from '@/components/ui/public-nav';
import { PublicFooter } from '@/components/ui/public-footer';

interface Product {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  industry?: string;
  priceUsd: number;
  productStl?: number;
  stats?: {
    views?: number;
    orders?: number;
    ratingAvg?: number;
    ratingCount?: number;
  };
  status?: string;
}

interface IndustryCategory {
  category: string;
  direct: number;
  l1: number;
  l2: number;
  description: string;
  industries: string[];
}

const INDUSTRY_GROUPS = [
  {
    label: '🟣 High-Margin (15%/5%/2%)',
    industries: ['OBS', 'OLS', 'ITS', 'MAS', 'FIN', 'INS'],
  },
  {
    label: '🟢 Standard (10%/5%/2%)',
    industries: ['GSM', 'FWS', 'BCS', 'FBS', 'EFS', 'GSS'],
  },
  {
    label: '🔵 Commodity (7%/3%/1%)',
    industries: ['LDS', 'AGTS', 'EDS', 'MFS', 'ATS'],
  },
  {
    label: '🟠 Recurring (8%/3%/1% per cycle)',
    industries: ['WMS', 'HPS', 'WES', 'HCS', 'TCS', 'CMS'],
  },
  {
    label: '🟡 Premium (5%/2%/1%)',
    industries: ['RES', 'CNS', 'HMS', 'EAS', 'SCS'],
  },
  {
    label: '⚪ Strategic (6%/2%/1%)',
    industries: ['GES', 'JPS', 'ERS', 'ELS', 'EHB_TUBE'],
  },
];

export default function DamPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<IndustryCategory[]>([]);
  const [search, setSearch] = useState('');
  const [filterIndustry, setFilterIndustry] = useState<string | null>(null);
  const [filterTab, setFilterTab] = useState<'all' | 'trending' | 'high_commission' | 'verified'>('all');
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [copiedProduct, setCopiedProduct] = useState<string | null>(null);

  useEffect(() => {
    api.get('/api/gosellr/products').then((r: any) => setProducts(r.products || r || []));
    api
      .get('/api/affiliate/industries/categories')
      .then((r: any) => setCategories(r.categories || []));
    if (user) {
      api
        .get('/api/affiliate/me')
        .then((r: any) => setReferralCode(r?.referralCode || null))
        .catch(() => {});
    }
  }, [user]);

  // Lookup industry rate for a product
  const ratesByIndustry = useMemo(() => {
    const map: Record<string, IndustryCategory> = {};
    for (const c of categories) {
      for (const ind of c.industries || []) {
        map[ind] = c;
      }
    }
    return map;
  }, [categories]);

  // Filtered + sorted products
  const filtered = useMemo(() => {
    let list = products.filter((p) => p.status === 'active');
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.industry?.toLowerCase().includes(q)
      );
    }
    if (filterIndustry) {
      list = list.filter((p) => p.industry === filterIndustry);
    }
    if (filterTab === 'trending') {
      list = [...list].sort((a, b) => (b.stats?.orders || 0) - (a.stats?.orders || 0)).slice(0, 12);
    } else if (filterTab === 'high_commission') {
      // Show high-margin or premium products
      list = list.filter((p) => {
        const cat = ratesByIndustry[p.industry || 'GSM'];
        return cat && cat.direct >= 0.10;
      });
    } else if (filterTab === 'verified') {
      list = list.filter((p) => (p.productStl || 0) >= 7);
    }
    return list;
  }, [products, search, filterIndustry, filterTab, ratesByIndustry]);

  function copyReferralLink(productId: string) {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    if (!referralCode) {
      // Auto-join the affiliate program
      api
        .post('/api/affiliate/join', {})
        .then((r: any) => {
          setReferralCode(r.referralCode);
          actuallyCopy(r.referralCode, productId);
        })
        .catch(() => alert('Could not join affiliate program. Please try again.'));
      return;
    }
    actuallyCopy(referralCode, productId);
  }

  function actuallyCopy(code: string, productId: string) {
    const baseUrl =
      typeof window !== 'undefined' ? window.location.origin : 'https://ehb.com';
    const link = `${baseUrl}/gosellr/${productId}?ref=${code}`;
    navigator.clipboard?.writeText(link);
    setCopiedProduct(productId);
    setTimeout(() => setCopiedProduct(null), 2000);
  }

  return (
    <>
      <PublicNav />
      <main className="min-h-screen py-6 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Hero */}
          <PlasticCard className="overflow-hidden p-0">
            <div
              className="relative p-5 sm:p-8"
              style={{
                background:
                  'linear-gradient(135deg, rgba(123, 110, 246, 0.15), rgba(43, 191, 160, 0.05) 60%, transparent)',
              }}
            >
              <div className="flex flex-wrap items-start gap-4 sm:gap-6">
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-card text-4xl shadow-2xl sm:h-20 sm:w-20 sm:text-5xl"
                  style={{
                    background: 'linear-gradient(135deg, #7B6EF6, #2BBFA0)',
                    boxShadow: '0 12px 40px rgba(123,110,246,0.4)',
                  }}
                >
                  🛍️
                </div>
                <div className="min-w-0 flex-1">
                  <Chip tone="purple">Digital Affiliate Marketplace · DAM v3.2</Chip>
                  <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
                    Promote real products. Earn real commissions.
                  </h1>
                  <p className="mt-2 text-sm text-white/70">
                    Browse all EHB products. Click <strong className="text-teal">Promote Now</strong>{' '}
                    to copy your unique referral link. When customers buy via your link, you earn
                    Track A commission (10% direct + 5% L2 + bonuses).
                  </p>
                </div>
              </div>
            </div>
          </PlasticCard>

          {/* Search + filters */}
          <PlasticCard className="mt-4 p-4 sm:p-5">
            <div className="flex flex-col gap-3">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔍 Search products, industries, or categories..."
                className="w-full rounded-input border border-glass bg-nested px-4 py-2.5 text-sm"
              />

              <div className="flex flex-wrap gap-2">
                {(['all', 'trending', 'high_commission', 'verified'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilterTab(tab)}
                    className={`rounded-chip px-3 py-1.5 text-xs font-medium transition ${
                      filterTab === tab
                        ? 'bg-gradient-to-r from-purple-light to-teal text-white shadow'
                        : 'border border-glass bg-card/40 text-white/70 hover:border-purple-light'
                    }`}
                  >
                    {tab === 'all' && '📋 All Products'}
                    {tab === 'trending' && '🔥 Trending'}
                    {tab === 'high_commission' && '💰 High Commission'}
                    {tab === 'verified' && '✅ Verified (STL ≥ 7)'}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-1">
                <button
                  onClick={() => setFilterIndustry(null)}
                  className={`rounded-chip px-2.5 py-1 text-[10px] ${
                    !filterIndustry
                      ? 'bg-teal/20 text-teal border border-teal'
                      : 'border border-glass bg-nested/30 text-white/50'
                  }`}
                >
                  All industries
                </button>
                {INDUSTRY_GROUPS.flatMap((g) => g.industries).map((ind) => (
                  <button
                    key={ind}
                    onClick={() => setFilterIndustry(ind === filterIndustry ? null : ind)}
                    className={`rounded-chip px-2.5 py-1 text-[10px] ${
                      filterIndustry === ind
                        ? 'bg-teal/20 text-teal border border-teal'
                        : 'border border-glass bg-nested/30 text-white/50 hover:border-teal'
                    }`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>
          </PlasticCard>

          {/* Industry rate legend */}
          <PlasticCard className="mt-4 p-4">
            <div className="text-[10px] uppercase tracking-widest text-white/40">
              Commission rates by industry category
            </div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {INDUSTRY_GROUPS.map((g) => (
                <div
                  key={g.label}
                  className="rounded-card border border-glass bg-nested/40 p-2.5 text-xs"
                >
                  <div className="font-semibold text-white/80">{g.label}</div>
                  <div className="text-[10px] text-white/50">
                    {g.industries.slice(0, 6).join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </PlasticCard>

          {/* Product grid */}
          <div className="mt-4">
            {filtered.length === 0 ? (
              <PlasticCard className="p-10 text-center">
                <div className="text-5xl">🔍</div>
                <h3 className="mt-3 text-lg font-semibold">No products match</h3>
                <p className="mt-1 text-sm text-white/60">Try a different search or filter.</p>
              </PlasticCard>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p) => {
                  const cat = ratesByIndustry[p.industry || 'GSM'];
                  const directPct = cat ? (cat.direct * 100).toFixed(0) : '10';
                  const networkPoolUsd = (p.priceUsd * 0.05).toFixed(2);
                  const isCopied = copiedProduct === p._id;
                  const isVerified = (p.productStl || 0) >= 7;
                  const isTrending = (p.stats?.orders || 0) > 50;

                  return (
                    <PlasticCard key={p._id} className="overflow-hidden p-0">
                      <div className="relative p-4">
                        {/* Badges */}
                        <div className="absolute right-3 top-3 flex flex-col gap-1">
                          {isTrending ? <Chip tone="purple">🔥</Chip> : null}
                          {isVerified ? <Chip tone="ok">✅</Chip> : null}
                        </div>

                        <div className="text-3xl">📦</div>
                        <h4 className="mt-2 line-clamp-2 text-sm font-semibold">{p.title}</h4>
                        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-white/50">
                          <span>{p.industry || 'GSM'}</span>
                          {p.category ? <span>· {p.category}</span> : null}
                        </div>

                        <div className="mt-3 flex items-baseline gap-2">
                          <span className="text-xl font-bold text-teal">
                            ${p.priceUsd.toFixed(2)}
                          </span>
                          {p.stats?.ratingAvg ? (
                            <span className="text-[11px] text-amber">
                              ⭐ {p.stats.ratingAvg.toFixed(1)}
                            </span>
                          ) : null}
                        </div>

                        <div className="mt-2 rounded-input border border-glass bg-nested/40 p-2 text-[10px]">
                          <div className="flex items-center justify-between">
                            <span className="text-white/50">Affiliate Bonus</span>
                            <Chip tone="ok">Available ✓</Chip>
                          </div>
                          <div className="mt-1 text-white/70">
                            🔥 Earn up to <strong className="text-teal">${networkPoolUsd}</strong> per
                            sale (L1 ${(p.priceUsd * (cat?.direct || 0.10)).toFixed(2)})
                          </div>
                        </div>

                        <div className="mt-3 flex gap-2">
                          <Button3D
                            variant="purple"
                            size="sm"
                            className="flex-1"
                            onClick={() => copyReferralLink(p._id)}
                          >
                            {isCopied ? '✓ Link copied!' : '📤 Promote Now'}
                          </Button3D>
                          <Link
                            href={`/gosellr/${p._id}`}
                            className="flex items-center justify-center rounded-chip border border-glass bg-card/60 px-3 text-xs hover:border-teal"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </PlasticCard>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer call-to-action */}
          {!user ? (
            <PlasticCard className="mt-4 p-5 text-center">
              <h3 className="text-lg font-semibold">Want to start earning?</h3>
              <p className="mt-1 text-sm text-white/60">
                Sign up free, click "Promote Now" on any product, and share your referral link.
              </p>
              <div className="mt-3 flex justify-center gap-2">
                <Link
                  href="/register"
                  className="rounded-chip bg-gradient-to-r from-[#7B6EF6] to-[#A098F8] px-4 py-2 text-sm font-semibold"
                >
                  Sign up free
                </Link>
                <Link
                  href="/affiliate"
                  className="rounded-chip border border-glass bg-card/60 px-4 py-2 text-sm hover:border-purple-light"
                >
                  How it works →
                </Link>
              </div>
            </PlasticCard>
          ) : null}

          {/* Legal */}
          <PlasticCard className="mt-4 p-4">
            <div className="flex items-start gap-3 text-xs text-white/60">
              <div className="text-2xl">⚖️</div>
              <div>
                <strong className="text-white/80">EHB is NOT MLM.</strong> All commissions come from
                real product/service sales — never joining fees, recruitment alone, or self-purchase
                loops.{' '}
                <a
                  href="/api/compliance/ids"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal hover:underline"
                >
                  Income Disclosure Statement →
                </a>
              </div>
            </div>
          </PlasticCard>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
