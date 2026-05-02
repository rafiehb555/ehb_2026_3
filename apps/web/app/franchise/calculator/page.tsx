'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';

export default function CalculatorPage() {
  const [volume, setVolume] = useState(100000);
  const [pricing, setPricing] = useState<any>(null);

  useEffect(() => {
    api.get('/api/franchise/pricing').then(setPricing).catch(() => {});
  }, []);

  const platformCut = volume * 0.02;
  const split = useMemo(
    () => ({
      company: platformCut * 0.4,
      sub: platformCut * 0.25,
      master: platformCut * 0.2,
      corporate: platformCut * 0.15,
    }),
    [platformCut]
  );

  const subTiers = pricing?.subFranchises ?? [];

  return (
    <main className="min-h-screen py-10">
      <div className="mx-auto max-w-5xl px-6">
        <Link href="/franchise" className="text-xs text-white/50 hover:text-white">
          ← Back
        </Link>

        <PlasticCard className="mt-4 p-8">
          <div className="text-xs uppercase tracking-widest text-teal">Commission Calculator</div>
          <h1 className="mt-2 text-3xl font-bold">Project your network earnings</h1>
          <p className="mt-2 text-sm text-white/60">
            2% platform cut on every order → split 40/25/20/15 across Company / Sub / Master /
            Corporate. Daily caps vary by tier.
          </p>

          <div className="mt-6 rounded-card border border-glass bg-nested p-5">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-widest text-white/50">
                Monthly order volume (USD)
              </label>
              <div className="text-2xl font-bold tabular-nums">
                ${volume.toLocaleString()}
              </div>
            </div>
            <input
              type="range"
              min={1000}
              max={1000000}
              step={1000}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="mt-4 w-full accent-purple"
            />
            <div className="mt-1 flex justify-between text-[10px] text-white/30">
              <span>$1K</span>
              <span>$100K</span>
              <span>$500K</span>
              <span>$1M</span>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            <SplitBox label="Sub (25%)" value={split.sub} tone="teal" big />
            <SplitBox label="Master (20%)" value={split.master} tone="amber" />
            <SplitBox label="Corporate (15%)" value={split.corporate} tone="purple" />
            <SplitBox label="Company (40%)" value={split.company} tone="default" />
          </div>

          <div className="mt-4 rounded-card border border-glass bg-nested p-3 text-xs text-white/60">
            Total platform cut at ${volume.toLocaleString()}/month ={' '}
            <span className="font-semibold text-white">${platformCut.toFixed(2)}</span>
          </div>
        </PlasticCard>

        {/* Tier cap analysis */}
        {subTiers.length ? (
          <PlasticCard className="mt-6 p-5">
            <div className="text-xs uppercase tracking-widest text-white/40">
              How your monthly Sub earnings compare to daily caps
            </div>
            <h3 className="mt-1 text-lg font-semibold">Am I under my cap?</h3>
            <div className="mt-4 space-y-2 text-xs">
              {subTiers.map((t: any) => {
                const dailySub = split.sub / 30;
                const cap = t.commissionCapPerDayUsd === 'unlimited' ? Infinity : t.commissionCapPerDayUsd;
                const pct = cap === Infinity ? 0 : Math.min(100, (dailySub / cap) * 100);
                const over = cap !== Infinity && dailySub > cap;
                return (
                  <div key={t.code} className="flex items-center gap-3">
                    <div className="w-12 text-xs font-bold text-white/60">{t.code}</div>
                    <div className="flex-1">
                      <div className="h-2 w-full overflow-hidden rounded-chip bg-white/5">
                        <div
                          className={`h-full rounded-chip ${over ? 'bg-[#F05858]' : 'bg-gradient-to-r from-teal to-ok'}`}
                          style={{ width: `${cap === Infinity ? 100 : pct}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-32 text-right text-[11px] text-white/60">
                      ${dailySub.toFixed(2)}/day · cap{' '}
                      {cap === Infinity ? '∞' : `$${cap}`}
                    </div>
                    {over ? <Chip tone="fail">Over cap</Chip> : null}
                  </div>
                );
              })}
            </div>
          </PlasticCard>
        ) : null}
      </div>
    </main>
  );
}

function SplitBox({
  label,
  value,
  tone,
  big,
}: {
  label: string;
  value: number;
  tone: 'teal' | 'amber' | 'purple' | 'default';
  big?: boolean;
}) {
  const toneBg: Record<typeof tone, string> = {
    teal: 'from-[#2BBFA0]/20 to-[#38C878]/10 border-[#2BBFA0]/30',
    amber: 'from-[#F0A030]/20 to-[#F8B830]/10 border-[#F0A030]/30',
    purple: 'from-[#7B6EF6]/20 to-[#A098F8]/10 border-[#7B6EF6]/30',
    default: 'from-white/10 to-white/0 border-white/10',
  };
  return (
    <div
      className={`rounded-card border bg-gradient-to-br p-4 ${toneBg[tone]} ${big ? 'ring-2 ring-teal/40' : ''}`}
    >
      <div className="text-xs uppercase text-white/50">{label}</div>
      <div className="mt-1 text-xl font-bold tabular-nums">
        ${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </div>
      <div className="mt-1 text-[10px] text-white/40">per month</div>
    </div>
  );
}
