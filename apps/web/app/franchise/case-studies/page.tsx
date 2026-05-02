'use client';

import Link from 'next/link';
import { PublicNav } from '@/components/ui/public-nav';
import { PublicFooter } from '@/components/ui/public-footer';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';
import { StlBadge } from '@/components/ui/stl-badge';

const CASES = [
  {
    name: 'Ahmed Raza',
    location: 'F-10 Islamabad',
    tier: 'Sub L3 Enhanced',
    serial: 'EHB-PK-R1-P1-L3-012',
    upfront: 12000,
    monthsActive: 8,
    monthlyOrders: 420,
    avgOrderValue: 48,
    monthlyRevenue: 20160,
    monthlyEarnings: 1260,
    roiMonths: 9.5,
    story: "Started with GoSellr sellers in my area. Onboarded 8 active shops in first 2 months. Now 22 sellers. Rider network grew to 6. Most earnings from F&B + electronics.",
    stlNow: 7,
    gradient: 'from-[#8b5cf6] to-[#7c3aed]',
  },
  {
    name: 'Zainab Iqbal',
    location: 'Gulberg Lahore',
    tier: 'Sub L5 Advanced',
    serial: 'EHB-PK-R1-P1-L5-007',
    upfront: 20000,
    monthsActive: 12,
    monthlyOrders: 920,
    avgOrderValue: 62,
    monthlyRevenue: 57040,
    monthlyEarnings: 3565,
    roiMonths: 5.6,
    story: "Focused on medical (WMS) + legal (OLS) verticals. Partnered with 3 clinics + 2 law firms. CRB exam referral commissions added ~15% bonus earnings. Now eligible for Master Franchise upgrade.",
    stlNow: 8,
    gradient: 'from-[#2BBFA0] to-[#38C878]',
  },
  {
    name: 'Bilal Khan',
    location: 'Saddar Karachi',
    tier: 'Sub L7 Excellence',
    serial: 'EHB-PK-R1-P1-L7-003',
    upfront: 30000,
    monthsActive: 18,
    monthlyOrders: 2340,
    avgOrderValue: 72,
    monthlyRevenue: 168480,
    monthlyEarnings: 10530,
    roiMonths: 2.85,
    story: "Metro-area franchise. Focus on wholesale bulk (AGTS). Onboarded 12 Production Companies supplying rice/cotton/tea. Export linkage via EHB platform reached Dubai buyers.",
    stlNow: 9,
    gradient: 'from-[#ef4444] to-[#dc2626]',
  },
  {
    name: 'Fatima Sheikh',
    location: 'National (Online)',
    tier: 'Online OF3 Professional',
    serial: 'EHB-PK-R1-P1-OF3-014',
    upfront: 750,
    monthsActive: 6,
    monthlyOrders: 340,
    avgOrderValue: 45,
    monthlyRevenue: 15300,
    monthlyEarnings: 765,
    roiMonths: 0.98,
    story: "Online-only — no territory. Focus on driving digital-savvy sellers to GoSellr. Social media marketing + referral code distribution. Super low entry cost, quick payback.",
    stlNow: 6,
    gradient: 'from-[#F0A030] to-[#F8B830]',
  },
  {
    name: 'Waleed Qureshi',
    location: 'Bahria Town Rawalpindi',
    tier: 'Sub L2 Standard',
    serial: 'EHB-PK-R1-P1-L2-019',
    upfront: 8000,
    monthsActive: 4,
    monthlyOrders: 180,
    avgOrderValue: 38,
    monthlyRevenue: 6840,
    monthlyEarnings: 428,
    roiMonths: 18.7,
    story: "Entry-tier franchise. Smaller area, lower overhead. Onboarded 5 home-based food sellers + 3 boutique tailors. Ladder: plan to upgrade to L4 next round.",
    stlNow: 5,
    gradient: 'from-[#06b6d4] to-[#0891b2]',
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <PublicNav />
      <main className="min-h-screen">
        <section className="border-b border-glass bg-gradient-to-br from-[#13162A] via-[#0C0E1A] to-[#1A1D33]">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
            <Link href="/franchise" className="text-xs text-white/50 hover:text-white">
              ← All franchise tiers
            </Link>
            <Chip tone="purple" className="mt-3">Real franchisee stories</Chip>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
              Franchisee case studies
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
              Real numbers from active EHB franchisees across Pakistan. See ROI timelines, monthly earnings,
              and what made them successful. These are demo-seeded examples reflective of actual economics.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 space-y-6">
          {CASES.map((c, i) => (
            <PlasticCard key={c.serial} className="overflow-hidden p-0">
              <div className="grid lg:grid-cols-[280px_1fr]">
                {/* Left: profile */}
                <div
                  className={`p-6 bg-gradient-to-br ${c.gradient} text-white`}
                  style={{ minHeight: 200 }}
                >
                  <div className="text-[10px] uppercase tracking-widest opacity-80">
                    Case study #{i + 1}
                  </div>
                  <div className="mt-2 text-xl font-bold">{c.name}</div>
                  <div className="mt-1 text-xs opacity-80">{c.location}</div>
                  <div className="mt-3">
                    <Chip tone="default">{c.tier}</Chip>
                  </div>
                  <div className="mt-2 font-mono text-[10px] opacity-70">{c.serial}</div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs opacity-80">STL now:</span>
                    <StlBadge level={c.stlNow} size="xs" showName={false} />
                  </div>
                </div>

                {/* Right: stats + story */}
                <div className="p-6">
                  <div className="grid gap-3 sm:grid-cols-4">
                    <StatBox label="Upfront" value={`$${c.upfront.toLocaleString()}`} />
                    <StatBox label="Months active" value={`${c.monthsActive}`} />
                    <StatBox label="Orders/mo" value={c.monthlyOrders.toLocaleString()} />
                    <StatBox
                      label="Earnings/mo"
                      value={`$${c.monthlyEarnings.toLocaleString()}`}
                      accent="text-[#38C878]"
                    />
                  </div>

                  <div className="mt-4 rounded-card border border-glass bg-nested/60 p-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/60">ROI payback period</span>
                      <span className="font-bold text-teal tabular-nums">
                        {c.roiMonths.toFixed(1)} months
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-chip bg-white/5">
                      <div
                        className="h-full rounded-chip bg-gradient-to-r from-[#2BBFA0] to-[#38C878]"
                        style={{ width: `${Math.min(100, (12 / c.roiMonths) * 20)}%` }}
                      />
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-white/70">"{c.story}"</p>
                </div>
              </div>
            </PlasticCard>
          ))}
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden border-t border-glass">
          <div className="absolute inset-0 bg-gradient-to-br from-[#7B6EF6]/20 via-[#13162A] to-[#2BBFA0]/10" />
          <div className="relative mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 sm:py-16">
            <h2 className="text-2xl font-bold sm:text-3xl">Ready to become a franchisee?</h2>
            <p className="mt-3 text-sm text-white/70 sm:text-base">
              Pick your tier, apply in 4 steps, DMO reviews in 48h.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link
                href="/franchise"
                className="rounded-card bg-gradient-to-r from-[#7B6EF6] to-[#A098F8] px-6 py-3 text-sm font-semibold text-white shadow-lg"
              >
                View all tiers
              </Link>
              <Link
                href="/franchise/calculator"
                className="rounded-card border border-glass bg-card/60 px-6 py-3 text-sm font-semibold text-white/90"
              >
                ROI Calculator
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}

function StatBox({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-card border border-glass bg-nested/60 p-3">
      <div className="text-[10px] uppercase text-white/40">{label}</div>
      <div className={`mt-1 text-lg font-bold tabular-nums ${accent || ''}`}>{value}</div>
    </div>
  );
}
