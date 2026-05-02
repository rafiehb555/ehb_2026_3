'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Button3D } from '@/components/ui/button-3d';
import { Chip } from '@/components/ui/chip';
import { PublicNav } from '@/components/ui/public-nav';
import { PublicFooter } from '@/components/ui/public-footer';

type Filter = 'all' | 'sub' | 'online';

export default function FranchiseLandingPage() {
  const [pricing, setPricing] = useState<any>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    api
      .get('/api/franchise/pricing')
      .then(setPricing)
      .catch((e) => setErr(e?.message || 'Failed to load pricing'));
  }, []);

  const items =
    !pricing
      ? []
      : filter === 'sub'
        ? pricing.subFranchises
        : filter === 'online'
          ? pricing.onlineFranchises
          : [...pricing.subFranchises, ...pricing.onlineFranchises];

  return (
    <>
      <PublicNav />
      <main className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-glass bg-gradient-to-br from-[#13162A] via-[#0C0E1A] to-[#1A1D33]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
          <div className="inline-block rounded-chip border border-glass bg-card/60 px-3 py-1 text-[10px] text-teal sm:text-xs">
            Franchise Model · Dual Track
          </div>
          <h1 className="mt-3 text-3xl font-bold sm:mt-4 sm:text-4xl md:text-5xl">
            Physical + Online Franchise Network
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/60 sm:mt-4 sm:text-base">
            5-level physical hierarchy (Country → Corporate → Master → Sub L1–L10) plus a parallel
            4-tier online network. USD + EHBGC dual pricing. 2% platform cut split 40/25/20/15.
          </p>

          <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
            {(['all', 'sub', 'online'] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-chip border px-3 py-2 text-xs ${
                  filter === f
                    ? 'border-purple-light bg-purple/20 text-white'
                    : 'border-glass text-white/60 hover:text-white'
                }`}
              >
                {f === 'all' ? 'All Tiers' : f === 'sub' ? 'Physical (L1–L10)' : 'Online (OF1–OF4)'}
              </button>
            ))}
            <Link
              href="/franchise/calculator"
              className="ml-auto rounded-chip border border-glass bg-white/5 px-3 py-2 text-xs hover:border-purple-light"
            >
              Calculator →
            </Link>
          </div>
        </div>
      </section>

      {/* How franchise works intro */}
      <section className="border-b border-glass bg-nested/20">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="rounded-card border border-glass bg-card/60 p-4">
              <div className="text-2xl">1️⃣</div>
              <div className="mt-2 text-sm font-semibold">Pick tier</div>
              <div className="mt-1 text-[11px] text-white/60">
                Sub L1 ($5K) → L10 ($50K) or Online OF1 ($100) → OF4 ($1,500).
              </div>
            </div>
            <div className="rounded-card border border-glass bg-card/60 p-4">
              <div className="text-2xl">2️⃣</div>
              <div className="mt-2 text-sm font-semibold">Apply</div>
              <div className="mt-1 text-[11px] text-white/60">
                4-step form: area → KYC → USD+EHBGC pricing → submit.
              </div>
            </div>
            <div className="rounded-card border border-glass bg-card/60 p-4">
              <div className="text-2xl">3️⃣</div>
              <div className="mt-2 text-sm font-semibold">DMO approves (48h)</div>
              <div className="mt-1 text-[11px] text-white/60">
                Serial issued: EHB-PK-R1-P1-Lx-NNN. Wallet lock activated.
              </div>
            </div>
            <div className="rounded-card border border-glass bg-card/60 p-4">
              <div className="text-2xl">4️⃣</div>
              <div className="mt-2 text-sm font-semibold">Earn commission</div>
              <div className="mt-1 text-[11px] text-white/60">
                40/25/20/15 split on every order in your zone.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing grid */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {err ? (
          <div className="mb-4 rounded-card border border-[#F0A030]/40 bg-[#F0A030]/10 p-3 text-xs text-[#F0A030] sm:mb-6 sm:p-4 sm:text-sm">
            {err}
          </div>
        ) : null}

        {!pricing ? (
          <div className="text-white/50">Loading pricing…</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item: any) => {
              const isSub = item.type === 'sub';
              return (
                <PlasticCard key={item.code} className="flex flex-col p-5">
                  <div className="flex items-center justify-between">
                    <Chip tone={isSub ? 'purple' : 'teal'}>
                      {isSub ? `Sub · ${item.series}` : 'Online'}
                    </Chip>
                    <div className="text-xs text-white/40">{item.code}</div>
                  </div>
                  <h3 className="mt-3 text-xl font-bold">{item.name}</h3>
                  <div className="mt-1 text-xs text-white/50">{item.targetMarket}</div>

                  <div className="my-4 border-t border-glass" />

                  <div className="space-y-2 text-xs">
                    <Row label="USD entry" value={`$${item.usd.toLocaleString()}`} />
                    <Row label="EHBGC hold" value={`${item.ehbgc.toLocaleString()} EHBGC`} />
                    <Row
                      label="Commission cap/day"
                      value={
                        item.commissionCapPerDayUsd === 'unlimited'
                          ? 'Unlimited'
                          : `$${item.commissionCapPerDayUsd}`
                      }
                    />
                    {item.directCommissionRatePct ? (
                      <Row label="Direct rate" value={`${item.directCommissionRatePct}%`} />
                    ) : null}
                  </div>

                  <div className="mt-auto pt-5">
                    <Link href={`/franchise/apply?tier=${item.type}&level=${item.code}`}>
                      <Button3D variant={isSub ? 'purple' : 'blue'} className="w-full">
                        Apply for {item.code}
                      </Button3D>
                    </Link>
                  </div>
                </PlasticCard>
              );
            })}
          </div>
        )}
      </section>

      {/* Revenue split reminder */}
      {pricing ? (
        <section className="mx-auto max-w-6xl px-6 pb-12">
          <PlasticCard className="p-6">
            <div className="mb-3 text-xs uppercase tracking-widest text-white/40">
              Revenue split · 2% platform cut
            </div>
            <div className="grid gap-3 sm:grid-cols-4">
              {Object.entries(pricing.revenueSplit.split).map(([who, pct]: any) => (
                <div key={who} className="rounded-card border border-glass bg-nested p-3">
                  <div className="text-xs uppercase text-white/40">{who}</div>
                  <div className="mt-1 text-2xl font-bold tabular-nums">{pct}%</div>
                </div>
              ))}
            </div>
          </PlasticCard>
        </section>
      ) : null}
      </main>
      <PublicFooter />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/50">{label}</span>
      <span className="font-medium tabular-nums">{value}</span>
    </div>
  );
}
