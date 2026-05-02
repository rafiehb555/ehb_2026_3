/**
 * EHB Home — Grid rows
 * Sections: 6 (Featured industries), 9 (Categories), 10 (Franchise tiers)
 * Spec: ehb-info/15-ui-system/SECTION-CATALOG.md
 */
'use client';

import Link from 'next/link';
import { homePremiumTokens } from '@/lib/dmo/theme';
import {
  featuredIndustries,
  megaCategories,
  franchiseTiers,
  type FeaturedIndustry,
  type MegaCategory,
  type FranchiseTier,
} from '@/lib/data/home-sections';
import { SectionHeader, Pill } from './section-header';

/* ─────────────────────────────────────────────────────────────────────── */
/* Section 6: Featured industries (with SVG illustrations)                 */
/* ─────────────────────────────────────────────────────────────────────── */

export function FeaturedIndustriesGrid() {
  return (
    <div>
      <SectionHeader title="Featured industries" subtitle="37 verified industries · trust-anchored" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {featuredIndustries.map((i) => (
          <IndustryCard key={i.code} i={i} />
        ))}
      </div>
    </div>
  );
}

function IndustryCard({ i }: { i: FeaturedIndustry }) {
  return (
    <Link
      href={`/industries/${i.code.toLowerCase()}`}
      className="relative rounded-xl overflow-hidden block"
      style={{
        background: homePremiumTokens.surface,
        border: `1px solid ${homePremiumTokens.borderSubtle}`,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px z-10"
        style={{ background: homePremiumTokens.glossTopLine }}
      />
      <div
        className="relative flex items-center justify-center"
        style={{
          height: 70,
          background: `linear-gradient(135deg, ${i.coverFrom}, ${i.coverTo})`,
        }}
      >
        <div
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: '30%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.2), transparent)',
          }}
        />
        <IllustrationByType type={i.iconType} />
      </div>
      <div className="p-2.5">
        <div className="text-[11px] font-medium text-white">{i.name}</div>
        <div className="text-[10px] mb-1.5" style={{ color: homePremiumTokens.textSec }}>
          {i.detail}
        </div>
        <Pill bg={i.pillFrom} color={i.pillText}>
          {i.pill}
        </Pill>
      </div>
    </Link>
  );
}

function IllustrationByType({ type }: { type: FeaturedIndustry['iconType'] }) {
  const W = 36;
  switch (type) {
    case 'health':
      return (
        <svg width={W} height={W} viewBox="0 0 64 64">
          <circle cx="20" cy="14" r="5" fill="white" />
          <circle cx="38" cy="14" r="5" fill="white" />
          <path d="M20 19 L20 32 Q20 44 32 44 Q44 44 44 32 L44 26" stroke="white" strokeWidth="3" fill="none" />
        </svg>
      );
    case 'legal':
      return (
        <svg width={W} height={W} viewBox="0 0 64 64">
          <line x1="32" y1="10" x2="32" y2="50" stroke="white" strokeWidth="3" />
          <line x1="14" y1="20" x2="50" y2="20" stroke="white" strokeWidth="3" />
        </svg>
      );
    case 'cart':
      return (
        <svg width={W} height={W} viewBox="0 0 64 64">
          <path d="M10 18 L18 18 L24 40 L52 40 L56 24 L20 24" stroke="#412402" strokeWidth="3" fill="none" />
          <circle cx="28" cy="48" r="3" fill="#412402" />
          <circle cx="48" cy="48" r="3" fill="#412402" />
        </svg>
      );
    case 'cap':
      return (
        <svg width={W} height={W} viewBox="0 0 64 64">
          <path d="M8 26 L32 16 L56 26 L32 36 Z" fill="white" />
          <path d="M16 30 L16 42 Q16 46 32 46 Q48 46 48 42 L48 30" stroke="white" strokeWidth="2" fill="none" />
        </svg>
      );
    case 'bike':
      return (
        <svg width={W} height={W} viewBox="0 0 64 64">
          <rect x="10" y="22" width="28" height="18" rx="2" fill="white" />
          <path d="M38 28 L48 28 L54 36 L54 40 L38 40 Z" fill="white" />
          <circle cx="20" cy="44" r="6" fill="#173404" stroke="white" strokeWidth="2" />
          <circle cx="46" cy="44" r="6" fill="#173404" stroke="white" strokeWidth="2" />
        </svg>
      );
    case 'bank':
      return (
        <svg width={W} height={W} viewBox="0 0 64 64">
          <path d="M12 22 L32 12 L52 22 L52 26 L12 26 Z" fill="#412402" />
          <rect x="14" y="26" width="4" height="20" fill="#412402" />
          <rect x="46" y="26" width="4" height="20" fill="#412402" />
          <rect x="30" y="26" width="4" height="20" fill="#412402" />
        </svg>
      );
    case 'ai':
      return (
        <svg width={W} height={W} viewBox="0 0 64 64">
          <rect x="18" y="14" width="28" height="32" rx="6" fill="white" />
          <circle cx="26" cy="26" r="3" fill="#26215C" />
          <circle cx="38" cy="26" r="3" fill="#26215C" />
          <rect x="24" y="34" width="16" height="3" rx="1" fill="#F0B90B" />
        </svg>
      );
    case 'franchise':
      return (
        <svg width={W} height={W} viewBox="0 0 64 64">
          <rect x="8" y="30" width="14" height="20" fill="white" opacity="0.6" />
          <rect x="22" y="20" width="14" height="30" fill="white" opacity="0.8" />
          <rect x="36" y="14" width="14" height="36" fill="white" />
        </svg>
      );
    default:
      return null;
  }
}

/* ─────────────────────────────────────────────────────────────────────── */
/* Section 9: Browse by category                                           */
/* ─────────────────────────────────────────────────────────────────────── */

export function CategoryGrid() {
  return (
    <div>
      <SectionHeader title="Browse by category" subtitle="37 industries · 6 mega-categories" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {megaCategories.map((c) => (
          <CategoryCard key={c.key} c={c} />
        ))}
      </div>
    </div>
  );
}

function CategoryCard({ c }: { c: MegaCategory }) {
  return (
    <Link
      href={`/categories/${c.key}`}
      className="relative overflow-hidden rounded-xl p-3.5 flex flex-col justify-between block"
      style={{
        background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
        minHeight: 80,
        boxShadow: `0 4px 14px ${c.from}40`,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: '25%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.2), transparent)',
        }}
      />
      <div className="relative text-[13px] font-medium text-white">{c.name}</div>
      <div className="relative text-[10px]" style={{ color: c.textOnSubtitle }}>
        {c.count} industries · {c.avgL} avg
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* Section 10: Become a franchisee                                         */
/* ─────────────────────────────────────────────────────────────────────── */

export function FranchiseSeatsRow() {
  return (
    <div>
      <SectionHeader title="Become a franchisee" subtitle="5-tier territory operator network · open seats" />
      <div className="flex gap-2 overflow-x-auto pb-1.5 -mx-1 px-1 ehb-no-scrollbar">
        {franchiseTiers.map((t) => (
          <FranchiseTierCard key={t.key} t={t} />
        ))}
      </div>
    </div>
  );
}

function FranchiseTierCard({ t }: { t: FranchiseTier }) {
  return (
    <Link
      href={`/franchise/apply?tier=${t.key}`}
      className="relative flex-shrink-0 rounded-xl p-3.5 overflow-hidden block"
      style={{
        flexBasis: 200,
        minWidth: 200,
        background: homePremiumTokens.surface,
        border: `1px solid ${homePremiumTokens.borderSubtle}`,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: homePremiumTokens.glossTopLine }}
      />
      <Pill bg={t.pillFrom} color={t.pillText}>
        {t.seatsLeft} left
      </Pill>
      <div className="text-[13px] font-medium text-white mt-1.5 mb-0.5">{t.name}</div>
      <div className="text-[10px] mb-2" style={{ color: homePremiumTokens.textSec }}>
        {t.price} · {t.scope}
      </div>
      <div className="text-[10px]" style={{ color: t.pillText }}>
        {t.minStl} needed · {t.commission} commission
      </div>
    </Link>
  );
}
