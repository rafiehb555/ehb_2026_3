/**
 * EHB Home — Horizontal scroll rows
 * Sections: 4 (Companies), 5 (AI), 7 (Earn), 14 (Country), 19 (Collections)
 * Spec: ehb-info/15-ui-system/SECTION-CATALOG.md
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { homePremiumTokens, homeStlLevels } from '@/lib/dmo/theme';
import {
  aiModules,
  earnPaths,
  countries,
  countryStatusMeta,
  collections,
  type AiModule,
  type EarnPath,
  type CountryEntry,
  type Collection,
} from '@/lib/data/home-sections';
import { getCompaniesByCountry, type CompanyByStl } from '@/lib/data/companies-by-stl';
import { SectionHeader, Pill } from './section-header';

/* ─────────────────────────────────────────────────────────────────────── */
/* Section 4: Top {country} companies                                      */
/* ─────────────────────────────────────────────────────────────────────── */

export function CompaniesRow({ defaultCountry = 'PK' }: { defaultCountry?: string }) {
  const [country] = useState(defaultCountry);
  const list = getCompaniesByCountry(country);

  return (
    <div>
      <SectionHeader
        title={`Top ${countryName(country)} companies`}
        subtitle="Verified placements at each STL tier"
      />
      <div className="flex gap-2 overflow-x-auto pb-1.5 -mx-1 px-1 ehb-no-scrollbar">
        {list.map((c) => (
          <CompanyTile key={`${c.countryCode}-${c.name}`} c={c} />
        ))}
      </div>
    </div>
  );
}

function countryName(code: string): string {
  return { PK: 'Pakistan', AE: 'UAE', SA: 'Saudi', TR: 'Turkey', MY: 'Malaysia' }[code] || code;
}

function CompanyTile({ c }: { c: CompanyByStl }) {
  const lvlMeta = homeStlLevels.find((l) => l.level === c.level);
  return (
    <div
      className="relative flex-shrink-0 rounded-xl p-3 text-center overflow-hidden"
      style={{
        flexBasis: 110,
        minWidth: 110,
        background: homePremiumTokens.surface,
        border: `1px solid ${homePremiumTokens.borderSubtle}`,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: homePremiumTokens.glossTopLine }}
      />
      <div
        className="relative h-12 w-12 mx-auto mb-2 rounded-xl flex items-center justify-center text-sm font-medium overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${c.iconFrom}, ${c.iconTo})`,
          color: c.iconText,
        }}
      >
        <div
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: '35%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.22), transparent)',
            borderRadius: '11px 11px 0 0',
          }}
        />
        <span className="relative">{c.initials}</span>
      </div>
      <div className="text-[11px] font-medium text-white">{c.name}</div>
      <div className="text-[10px] mb-1.5" style={{ color: homePremiumTokens.textSec }}>
        {c.sector}
      </div>
      {lvlMeta && (
        <Pill
          bg={`linear-gradient(135deg, ${lvlMeta.from}40, ${lvlMeta.to}30)`}
          color={lvlMeta.accentLight}
        >
          L{c.level}
        </Pill>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* Section 5: EHB Dev AI for you                                           */
/* ─────────────────────────────────────────────────────────────────────── */

export function AiServicesRow() {
  return (
    <div>
      <SectionHeader title="EHB Dev AI for you" subtitle="5 modules · 3 free calls/day · single brain" />
      <div className="flex gap-2.5 overflow-x-auto pb-1.5 -mx-1 px-1 ehb-no-scrollbar">
        {aiModules.map((m) => (
          <AiModuleCard key={m.key} m={m} />
        ))}
      </div>
    </div>
  );
}

function AiModuleCard({ m }: { m: AiModule }) {
  return (
    <Link
      href={`/ai-marketplace/${m.key}`}
      className="relative flex-shrink-0 rounded-xl p-3.5 overflow-hidden flex flex-col justify-between"
      style={{
        flexBasis: 200,
        minWidth: 200,
        minHeight: 110,
        background: `linear-gradient(135deg, ${m.from}, ${m.to})`,
        boxShadow: `0 4px 14px ${m.from}50`,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: '30%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.18), transparent)',
        }}
      />
      <div className="relative">
        <div
          className="inline-block px-2 py-0.5 rounded-full text-[9px] font-medium tracking-wide"
          style={{ background: 'rgba(0,0,0,0.25)', color: m.accentColor }}
        >
          {m.label}
        </div>
        <div className="text-sm font-medium mt-1.5 mb-1" style={{ color: m.textColor }}>
          {m.title}
        </div>
        <div className="text-[10px]" style={{ color: m.accentColor }}>
          {m.example}
        </div>
      </div>
      <div
        className="relative inline-block px-2 py-0.5 rounded-full text-[9px] font-medium self-start mt-2"
        style={{ background: 'rgba(255,255,255,0.18)', color: '#fff' }}
      >
        {m.pill}
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* Section 7: Earn with EHB                                                */
/* ─────────────────────────────────────────────────────────────────────── */

export function EarnPathsRow() {
  return (
    <div>
      <SectionHeader title="Earn with EHB" subtitle="6 ways to make money on platform" />
      <div className="flex gap-2 overflow-x-auto pb-1.5 -mx-1 px-1 ehb-no-scrollbar">
        {earnPaths.map((e) => (
          <EarnTile key={e.key} e={e} />
        ))}
      </div>
    </div>
  );
}

function EarnTile({ e }: { e: EarnPath }) {
  return (
    <div
      className="relative flex-shrink-0 rounded-xl p-3 text-center overflow-hidden"
      style={{
        flexBasis: 124,
        minWidth: 124,
        background: homePremiumTokens.surface,
        border: `1px solid ${homePremiumTokens.borderSubtle}`,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: homePremiumTokens.glossTopLine }}
      />
      <div
        className="relative h-12 w-12 mx-auto mb-2 rounded-xl flex items-center justify-center font-medium overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${e.from}, ${e.to})`,
          color: e.textColor,
          fontSize: 14,
        }}
      >
        <div
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: '35%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.22), transparent)',
            borderRadius: '11px 11px 0 0',
          }}
        />
        <span className="relative">{e.iconLetter}</span>
      </div>
      <div className="text-[11px] font-medium text-white">{e.name}</div>
      <div className="text-[10px] mb-1.5" style={{ color: homePremiumTokens.textSec }}>
        {e.detail}
      </div>
      <Pill bg={e.pillFrom} color={e.pillText}>
        {e.pill}
      </Pill>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* Section 14: 17 Country expansion                                        */
/* ─────────────────────────────────────────────────────────────────────── */

export function CountryRow() {
  return (
    <div>
      <SectionHeader title="17 country expansion" subtitle="Same STL · same trust · ported across borders" />
      <div className="flex gap-2 overflow-x-auto pb-1.5 -mx-1 px-1 ehb-no-scrollbar">
        {countries.map((c) => (
          <CountryTile key={c.code} c={c} />
        ))}
      </div>
    </div>
  );
}

function CountryTile({ c }: { c: CountryEntry }) {
  const meta = countryStatusMeta[c.status];
  return (
    <div
      className="relative flex-shrink-0 rounded-xl p-3 text-center overflow-hidden"
      style={{
        flexBasis: 100,
        minWidth: 100,
        background: homePremiumTokens.surface,
        border: `1px solid ${homePremiumTokens.borderSubtle}`,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: homePremiumTokens.glossTopLine }}
      />
      <div
        className="relative h-12 w-12 mx-auto mb-2 rounded-xl flex items-center justify-center text-sm font-medium overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${c.iconFrom}, ${c.iconTo})`,
          color: c.iconText,
        }}
      >
        <div
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: '35%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.22), transparent)',
            borderRadius: '11px 11px 0 0',
          }}
        />
        <span className="relative">{c.code}</span>
      </div>
      <div className="text-[11px] font-medium text-white">{c.name}</div>
      <div className="mt-1.5">
        <Pill bg={meta.from} color={meta.text}>
          {meta.label}
        </Pill>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* Section 19: Collections                                                 */
/* ─────────────────────────────────────────────────────────────────────── */

export function CollectionsGrid() {
  return (
    <div>
      <SectionHeader title="Collections" subtitle="Themed bundles · save more by combining" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {collections.map((c) => (
          <CollectionCard key={c.key} c={c} />
        ))}
      </div>
    </div>
  );
}

function CollectionCard({ c }: { c: Collection }) {
  return (
    <Link
      href={`/collections/${c.key}`}
      className="relative overflow-hidden rounded-xl p-4 flex flex-col justify-between"
      style={{
        background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
        minHeight: 100,
        boxShadow: `0 4px 14px ${c.from}40`,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: '25%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.18), transparent)',
        }}
      />
      <div className="relative">
        <div className="text-[9px] font-medium tracking-wider" style={{ color: c.labelText }}>
          {c.label}
        </div>
        <div className="text-sm font-medium mt-1" style={{ color: c.titleText }}>
          {c.title}
        </div>
      </div>
      <div className="relative text-[11px] mt-2" style={{ color: c.detailText }}>
        {c.detail}
      </div>
    </Link>
  );
}
