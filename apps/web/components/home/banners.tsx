/**
 * EHB Home — Banners + Founder Picks + Final CTA
 * Sections: 17 (Refer banner), 18 (Founder picks), 20 (Final CTA)
 */
'use client';

import Link from 'next/link';
import { homePremiumTokens } from '@/lib/dmo/theme';
import { founderPicks } from '@/lib/data/home-sections';
import { SectionHeader } from './section-header';

/* ─────────────────────────────────────────────────────────────────────── */
/* Section 17: Refer & earn banner                                         */
/* ─────────────────────────────────────────────────────────────────────── */

export function ReferBanner() {
  return (
    <div
      className="relative overflow-hidden rounded-xl p-5 flex flex-col sm:flex-row gap-4 sm:items-center justify-between mt-4"
      style={{
        background: 'linear-gradient(135deg, #0C2E5C 0%, #0C0E1A 100%)',
        border: `1px solid ${homePremiumTokens.borderGold}`,
        boxShadow: '0 4px 18px rgba(0,0,0,0.4)',
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(240,185,11,0.5), transparent)' }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          right: -30,
          top: -30,
          width: 140,
          height: 140,
          background: 'radial-gradient(circle, rgba(240,185,11,0.25), transparent 70%)',
        }}
      />
      <div className="relative">
        <div className="text-[9px] font-medium tracking-widest mb-1" style={{ color: '#F0B90B' }}>
          REFER &amp; EARN
        </div>
        <div className="text-base font-medium text-white mb-1">5% / 2% / 1% on 3 levels deep</div>
        <div className="text-[11px]" style={{ color: '#85B7EB' }}>
          Top earner: PKR 240K/mo · just by sharing
        </div>
      </div>
      <Link
        href="/affiliate"
        className="relative inline-block text-[11px] px-4 py-2 rounded-full font-medium self-start sm:self-auto"
        style={{
          background: `linear-gradient(135deg, ${homePremiumTokens.gold}, ${homePremiumTokens.goldDark})`,
          color: '#412402',
          boxShadow: '0 2px 8px rgba(240,185,11,0.4)',
        }}
      >
        Get my link →
      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* Section 18: Founder's pick                                              */
/* ─────────────────────────────────────────────────────────────────────── */

export function FoundersPickRow() {
  return (
    <div>
      <SectionHeader title="Founder's pick" subtitle="What Rafi recommends this week" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {founderPicks.map((p) => (
          <Link
            key={p.title}
            href={p.href}
            className="relative rounded-xl p-3 flex items-center gap-2.5 overflow-hidden block"
            style={{
              background: homePremiumTokens.surface,
              border: `1px solid ${homePremiumTokens.borderSubtle}`,
            }}
          >
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: homePremiumTokens.glossTopLine }}
            />
            <div
              className="relative h-12 w-12 rounded-xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${homePremiumTokens.gold}, ${homePremiumTokens.goldDark})`,
                color: '#412402',
                fontSize: 18,
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25)',
              }}
            >
              ★
            </div>
            <div className="relative">
              <div className="text-xs font-medium text-white">{p.title}</div>
              <div className="text-[10px]" style={{ color: homePremiumTokens.textSec }}>
                {p.detail}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* Section 20: Final CTA                                                   */
/* ─────────────────────────────────────────────────────────────────────── */

export function FinalCta() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-6 sm:p-8 mt-5 text-center"
      style={{
        background: 'linear-gradient(135deg, #0C2E5C 0%, #1F5A3E 100%)',
        border: `1px solid ${homePremiumTokens.borderGold}`,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(240,185,11,0.5), transparent)' }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          left: -40,
          bottom: -40,
          width: 160,
          height: 160,
          background: 'radial-gradient(circle, rgba(240,185,11,0.2), transparent 70%)',
        }}
      />
      <div className="relative">
        <div className="text-[9px] font-medium tracking-widest mb-1.5" style={{ color: '#F0B90B' }}>
          EHB SUPER-APP
        </div>
        <div className="text-lg sm:text-xl font-medium text-white mb-1.5">
          37 industries. 17 countries. 1 trust.
        </div>
        <div className="text-[11px] mb-4" style={{ color: '#85B7EB' }}>
          Built in Pakistan · powered by Polkadot · made for the world
        </div>
        <Link
          href="/register"
          className="inline-block text-[12px] px-5 py-2.5 rounded-full font-medium"
          style={{
            background: `linear-gradient(135deg, ${homePremiumTokens.gold}, ${homePremiumTokens.goldDark})`,
            color: '#412402',
            boxShadow: '0 2px 10px rgba(240,185,11,0.5)',
          }}
        >
          Start your journey →
        </Link>
      </div>
    </div>
  );
}
