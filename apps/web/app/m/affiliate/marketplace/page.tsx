'use client';

import Link from 'next/link';
import { MobileBottomNav } from '@/components/affiliate/mobile-bottom-nav';
import { Chip } from '@/components/ui/chip';

/**
 * EHB Affiliate — Mobile Marketplace (Visily mobile prototype #14)
 *
 * Mobile-first marketplace with: search bar, category filter chips,
 * Featured Opportunities row (horizontal scroll), Approved Marketplace grid,
 * Promote/Buy Now buttons per card, bottom tab nav.
 */

const CATEGORIES = ['All', 'Compliance', 'Legal Tech', 'Marketing', 'Education', 'Health', 'Finance'];

const FEATURED = [
  { name: 'EHB Global Compliance Suite', tag: 'Top Seller', commission: 'Up to 30%', emoji: '⚖️', bg: 'from-purple-light to-teal' },
  { name: 'Anti-Fraud Pro', tag: 'New', commission: 'Flat $50', emoji: '🛡️', bg: 'from-amber to-pink-400' },
];

const PRODUCTS = [
  { rating: 4.8, name: 'Legal Disclaimer Generator API', industry: 'Legal Tech', price: '$29.99/mo', sellerProfit: 80, affiliBonus: '20% RevShare', emoji: '⚖️' },
  { rating: 4.9, name: 'Affiliate Marketing Masterclass 2024', industry: 'Education', price: '$199.00', sellerProfit: 55, affiliBonus: '$100 Flat', emoji: '🎓' },
  { rating: 4.7, name: 'Secure Payout Gateway Integration', industry: 'Security', price: '$149.00', sellerProfit: 30, affiliBonus: '$150 Flat', emoji: '🔒' },
  { rating: 4.5, name: 'EHB Brand Ambassador Kit', industry: 'Marketing', price: '$49.00', sellerProfit: 85, affiliBonus: '30% RevShare', emoji: '🎁' },
  { rating: 4.6, name: 'Data Privacy Audit Tool', industry: 'Compliance', price: '$89.99', sellerProfit: 40, affiliBonus: '40% RevShare', emoji: '🔐' },
  { rating: 4.8, name: 'Tax Compliance Module', industry: 'Legal Tech', price: '$39.00/mo', sellerProfit: 75, affiliBonus: '25% RevShare', emoji: '📊' },
  { rating: 4.4, name: 'AI Copywriter Pro', industry: 'AI & Automation', price: '$69.00/mo', sellerProfit: 60, affiliBonus: '100% First Mo', emoji: '✍️' },
  { rating: 4.5, name: 'Global Nomad Remote Pass', industry: 'Travel & Leisure', price: '$2,499.00', sellerProfit: 30, affiliBonus: '$300 Flat', emoji: '🌍' },
  { rating: 4.7, name: 'LegalDraft Templates', industry: 'Business Services', price: '$199.00', sellerProfit: 90, affiliBonus: '50% RevShare', emoji: '📄' },
];

export default function MobileMarketplacePage() {
  return (
    <div className="min-h-screen bg-bg pb-24">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 text-xs font-semibold">
        <span>9:41</span>
        <span>📶 📶 🔋</span>
      </div>

      {/* Header */}
      <header className="px-5 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Marketplace</h1>
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-glass bg-card/40">
            🛒
          </button>
        </div>

        {/* Search */}
        <div className="mt-3 flex items-center gap-2 rounded-card border border-glass bg-card/40 px-3 py-2.5">
          <span className="text-white/40">🔍</span>
          <input
            type="text"
            placeholder="Search products, sellers, or keywords..."
            className="flex-1 bg-transparent text-xs outline-none placeholder:text-white/40"
          />
          <button className="text-white/40">⚙️</button>
        </div>
      </header>

      {/* Category filter chips */}
      <div className="flex gap-2 overflow-x-auto px-5 pb-2 no-scrollbar">
        {CATEGORIES.map((c, i) => (
          <button
            key={c}
            className={`shrink-0 rounded-pill border px-4 py-1.5 text-xs whitespace-nowrap transition ${
              i === 0
                ? 'border-purple-light bg-purple-light/15 text-purple-light'
                : 'border-glass bg-card/40 text-white/60'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Featured Opportunities */}
      <div className="mt-3">
        <div className="flex items-center justify-between px-5">
          <h2 className="text-sm font-bold">📈 Featured Opportunities</h2>
        </div>
        <div className="mt-2 flex gap-3 overflow-x-auto px-5 pb-2 no-scrollbar">
          {FEATURED.map((f) => (
            <div key={f.name} className="shrink-0 w-64 overflow-hidden rounded-card border border-glass">
              <div
                className={`relative flex h-24 items-center justify-center bg-gradient-to-br ${f.bg} text-5xl`}
              >
                <span className="absolute left-2 top-2 rounded bg-black/40 px-2 py-0.5 text-[9px] font-bold text-white">
                  {f.tag}
                </span>
                {f.emoji}
              </div>
              <div className="bg-card/40 p-3">
                <div className="text-sm font-semibold">{f.name}</div>
                <div className="mt-2 flex items-end justify-between">
                  <div>
                    <div className="text-[9px] uppercase text-white/40">Commission</div>
                    <div className="text-xs font-bold text-teal">{f.commission}</div>
                  </div>
                  <button className="rounded bg-purple-light px-3 py-1.5 text-[10px] font-semibold text-white">
                    Promote Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Approved Marketplace */}
      <div className="mt-3 px-5">
        <h2 className="text-sm font-bold">✅ Approved Marketplace</h2>
        <p className="text-[10px] text-white/40">All Products (1,248 results)</p>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 px-5">
        {PRODUCTS.map((p, i) => (
          <div key={i} className="overflow-hidden rounded-card border border-glass bg-card/40">
            <div className="relative flex h-24 items-center justify-center bg-gradient-to-br from-purple-light/15 to-teal/15 text-3xl">
              <span className="absolute left-1.5 top-1.5 rounded bg-black/40 px-1.5 py-0.5 text-[9px] font-semibold">
                ⭐ {p.rating}
              </span>
              {p.emoji}
            </div>
            <div className="p-2">
              <div className="text-[9px] uppercase tracking-wide text-purple-light">{p.industry}</div>
              <div className="line-clamp-2 mt-0.5 text-[11px] font-semibold leading-tight">{p.name}</div>
              <div className="mt-1.5 grid grid-cols-3 gap-0.5 text-center">
                <div>
                  <div className="text-[8px] text-white/40">PRICE</div>
                  <div className="text-[10px] font-bold tabular-nums">{p.price}</div>
                </div>
                <div>
                  <div className="text-[8px] text-white/40">PROFIT</div>
                  <div className="text-[10px] font-bold tabular-nums text-teal">{p.sellerProfit}%</div>
                </div>
                <div>
                  <div className="text-[8px] text-white/40">AFFIL BONUS</div>
                  <div className="text-[9px] font-bold tabular-nums text-amber leading-tight">
                    {p.affiliBonus}
                  </div>
                </div>
              </div>
              <div className="mt-2 flex gap-1">
                <button className="flex-1 rounded border border-purple-light/40 bg-purple-light/10 py-1 text-[9px] text-purple-light">
                  📤 Promote
                </button>
                <button className="flex-1 rounded bg-purple-light py-1 text-[9px] font-semibold text-white">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mx-5 mt-4 flex items-center justify-center gap-1">
        <button className="rounded border border-glass bg-card/40 px-2 py-1 text-[10px]">‹</button>
        {[1, 2, 3, '...', 12].map((p, i) => (
          <button
            key={i}
            className={`rounded px-2 py-1 text-[10px] ${
              p === 1
                ? 'bg-purple-light text-white'
                : 'border border-glass bg-card/40 text-white/60'
            }`}
          >
            {p}
          </button>
        ))}
        <button className="rounded border border-glass bg-card/40 px-2 py-1 text-[10px]">›</button>
      </div>

      <MobileBottomNav />
    </div>
  );
}
