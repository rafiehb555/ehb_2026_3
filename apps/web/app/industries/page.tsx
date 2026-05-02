'use client';

import { useState } from 'react';
import Link from 'next/link';
import { INDUSTRIES, type IndustryDef } from '@/lib/industries';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';
import { PublicNav } from '@/components/ui/public-nav';
import { PublicFooter } from '@/components/ui/public-footer';

export default function IndustriesPage() {
  const [filter, setFilter] = useState<'all' | 1 | 2 | 3>('all');
  const [pillar, setPillar] = useState<'all' | IndustryDef['pillar']>('all');

  const items = INDUSTRIES.filter(
    (i) =>
      (filter === 'all' || i.phase === filter) &&
      (pillar === 'all' || i.pillar === pillar)
  );

  return (
    <>
      <PublicNav />
      <main className="min-h-screen">
      <section className="border-b border-glass bg-gradient-to-br from-[#13162A] via-[#0C0E1A] to-[#1A1D33]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
          <Chip tone="purple">
            EHB Industries · 38 across 3 pillars
          </Chip>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
            One platform. <span className="bg-gradient-to-r from-[#7B6EF6] via-[#A098F8] to-[#2BBFA0] bg-clip-text text-transparent">38 industries.</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/60 sm:text-base">
            Education · Health · Business — three pillars, 38 verticals. Each industry plugs into
            the same STL trust ladder, PSS verification, CRB credentialing, and DMO governance.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {(['all', 1, 2, 3] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-chip border px-3 py-2 text-xs ${
                  filter === f
                    ? 'border-purple-light bg-purple/20 text-white'
                    : 'border-glass text-white/60'
                }`}
              >
                {f === 'all' ? 'All phases' : `Phase ${f}`}
              </button>
            ))}
            <span className="mx-2 text-white/20">|</span>
            {(['all', 'Education', 'Health', 'Business'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPillar(p)}
                className={`rounded-chip border px-3 py-2 text-xs ${
                  pillar === p
                    ? 'border-teal bg-teal/20 text-white'
                    : 'border-glass text-white/60'
                }`}
              >
                {p === 'all' ? 'All pillars' : p}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <Link key={i.code} href={`/industries/${i.slug}`} className="group">
              <PlasticCard className="flex h-full flex-col p-5 transition group-hover:border-purple-light">
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-card text-2xl"
                    style={{ background: `linear-gradient(135deg, ${i.gradient.from}, ${i.gradient.to})` }}
                  >
                    {i.icon}
                  </div>
                  <Chip tone={i.status === 'live' ? 'ok' : i.status === 'beta' ? 'amber' : 'default'}>
                    {i.status}
                  </Chip>
                </div>
                <div className="mt-3">
                  <div className="font-mono text-[10px] text-white/40">{i.code}</div>
                  <h3 className="mt-1 text-lg font-bold">{i.name}</h3>
                  <p className="mt-1 text-xs text-white/60">{i.tagline}</p>
                </div>
                <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
                  <Chip>{i.pillar}</Chip>
                  <Chip>Phase {i.phase}</Chip>
                  <span className="text-[10px] text-white/40 self-center">
                    via {i.parentDept}
                  </span>
                </div>
              </PlasticCard>
            </Link>
          ))}
        </div>

        {items.length === 0 ? (
          <div className="text-center text-sm text-white/50">No industries match these filters.</div>
        ) : null}
      </section>
      </main>
      <PublicFooter />
    </>
  );
}
