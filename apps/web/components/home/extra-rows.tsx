/**
 * EHB Home — Extra rows
 * Sections: 8 (Trust deals), 11 (Nearby pros), 12 (JPS jobs), 13 (EHB Tube), 15 (New sellers)
 * Spec: ehb-info/15-ui-system/SECTION-CATALOG.md
 */
'use client';

import Link from 'next/link';
import { homePremiumTokens, homeStlLevels } from '@/lib/dmo/theme';
import {
  trustDeals,
  nearbyPros,
  jpsJobs,
  tubeVideos,
  newSellers,
  type TrustDeal,
  type NearbyPro,
  type JpsJob,
  type TubeVideo,
  type NewSeller,
} from '@/lib/data/home-sections';
import { SectionHeader, Pill } from './section-header';

/* ─────────────────────────────────────────────────────────────────────── */
/* Section 8: Trust-verified deals                                         */
/* ─────────────────────────────────────────────────────────────────────── */

export function DealsRow() {
  return (
    <div>
      <SectionHeader title="Trust-verified deals" subtitle="Discounts backed by L4+ STL guarantee" />
      <div className="flex gap-2 overflow-x-auto pb-1.5 -mx-1 px-1 ehb-no-scrollbar">
        {trustDeals.map((d) => (
          <DealTile key={d.key} d={d} />
        ))}
      </div>
    </div>
  );
}

function DealTile({ d }: { d: TrustDeal }) {
  return (
    <div
      className="relative flex-shrink-0 rounded-xl p-3 text-center overflow-hidden"
      style={{
        flexBasis: 130,
        minWidth: 130,
        background: homePremiumTokens.surface,
        border: `1px solid ${homePremiumTokens.borderSubtle}`,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: homePremiumTokens.glossTopLine }}
      />
      <div
        className="relative h-12 w-12 mx-auto mb-2 rounded-xl flex items-center justify-center font-medium text-xs overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #A32D2D, #501313)',
          color: '#fff',
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
        <span className="relative">{d.discount}</span>
      </div>
      <div className="text-[11px] font-medium text-white">{d.service}</div>
      <div className="text-[10px] mb-1.5" style={{ color: homePremiumTokens.textSec }}>
        Was {d.priceWas} → {d.priceNow}
      </div>
      <Pill bg={d.pillFrom} color={d.pillText}>
        {d.verifiedAt} verified
      </Pill>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* Section 11: Verified pros near you                                      */
/* ─────────────────────────────────────────────────────────────────────── */

export function NearbyProsRow() {
  return (
    <div>
      <SectionHeader title="Verified pros near you" subtitle="DHA Karachi · L4+ providers within 5 km" />
      <div className="flex gap-2 overflow-x-auto pb-1.5 -mx-1 px-1 ehb-no-scrollbar">
        {nearbyPros.map((p) => (
          <ProTile key={p.key} p={p} />
        ))}
      </div>
    </div>
  );
}

function ProTile({ p }: { p: NearbyPro }) {
  const lvlMeta = homeStlLevels.find((l) => l.level === p.level);
  return (
    <Link
      href={`/pros/${p.key}`}
      className="relative flex-shrink-0 rounded-xl p-3 text-center overflow-hidden block"
      style={{
        flexBasis: 130,
        minWidth: 130,
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
          background: `linear-gradient(135deg, ${p.iconFrom}, ${p.iconTo})`,
          color: '#fff',
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
        <span className="relative">{p.initials}</span>
      </div>
      <div className="text-[11px] font-medium text-white">{p.name}</div>
      <div className="text-[10px] mb-1.5" style={{ color: homePremiumTokens.textSec }}>
        {p.sector}
      </div>
      {lvlMeta && (
        <Pill
          bg={`linear-gradient(135deg, ${lvlMeta.from}40, ${lvlMeta.to}30)`}
          color={lvlMeta.accentLight}
        >
          L{p.level}
        </Pill>
      )}
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* Section 12: JPS jobs hiring now                                         */
/* ─────────────────────────────────────────────────────────────────────── */

export function JobsRow() {
  return (
    <div>
      <SectionHeader title="JPS — jobs hiring now" subtitle="Verified salaries · contracts on chain" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {jpsJobs.map((j) => (
          <JobCard key={j.key} j={j} />
        ))}
      </div>
    </div>
  );
}

function JobCard({ j }: { j: JpsJob }) {
  return (
    <Link
      href={`/jps/jobs/${j.key}`}
      className="relative rounded-xl p-3 overflow-hidden block"
      style={{
        background: homePremiumTokens.surface,
        border: `1px solid ${homePremiumTokens.borderSubtle}`,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: homePremiumTokens.glossTopLine }}
      />
      <div className="flex justify-between items-center mb-1">
        <div className="text-xs font-medium text-white">{j.title}</div>
        <Pill bg="rgba(240,185,11,0.2)" color="#F0B90B">
          {j.salary}
        </Pill>
      </div>
      <div className="text-[10px]" style={{ color: homePremiumTokens.textSec }}>
        {j.employer} · L{j.level} · {j.location}
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* Section 13: EHB Tube — featured videos                                  */
/* ─────────────────────────────────────────────────────────────────────── */

export function TubeRow() {
  return (
    <div>
      <SectionHeader title="EHB Tube — featured videos" subtitle="Trust-verified creators · learn while you grow" />
      <div className="flex gap-2 overflow-x-auto pb-1.5 -mx-1 px-1 ehb-no-scrollbar">
        {tubeVideos.map((v) => (
          <TubeCard key={v.key} v={v} />
        ))}
      </div>
    </div>
  );
}

function TubeCard({ v }: { v: TubeVideo }) {
  return (
    <Link
      href={`/tube/${v.key}`}
      className="relative flex-shrink-0 rounded-xl overflow-hidden block"
      style={{
        flexBasis: 180,
        minWidth: 180,
        background: homePremiumTokens.surface,
        border: `1px solid ${homePremiumTokens.borderSubtle}`,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px z-10"
        style={{ background: homePremiumTokens.glossTopLine }}
      />
      <div
        className="relative"
        style={{
          height: 100,
          background: `linear-gradient(135deg, ${v.thumbFrom}, ${v.thumbTo})`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: 36,
              height: 36,
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '10px solid white',
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                marginLeft: 3,
              }}
            />
          </div>
        </div>
        <div
          className="absolute bottom-1.5 right-1.5 text-[9px] text-white px-1.5 py-0.5 rounded"
          style={{ background: 'rgba(0,0,0,0.7)' }}
        >
          {v.duration}
        </div>
      </div>
      <div className="p-2.5">
        <div className="text-[11px] font-medium text-white">{v.title}</div>
        <div className="text-[10px]" style={{ color: homePremiumTokens.textSec }}>
          {v.creator}
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* Section 15: New on EHB this week                                        */
/* ─────────────────────────────────────────────────────────────────────── */

export function NewSellersRow() {
  return (
    <div>
      <SectionHeader title="New on EHB this week" subtitle="Fresh sellers + services · just verified" />
      <div className="flex gap-2 overflow-x-auto pb-1.5 -mx-1 px-1 ehb-no-scrollbar">
        {newSellers.map((s) => (
          <NewSellerTile key={s.key} s={s} />
        ))}
      </div>
    </div>
  );
}

function NewSellerTile({ s }: { s: NewSeller }) {
  return (
    <div
      className="relative flex-shrink-0 rounded-xl p-3 text-center overflow-hidden"
      style={{
        flexBasis: 130,
        minWidth: 130,
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
          background: `linear-gradient(135deg, ${s.iconFrom}, ${s.iconTo})`,
          color: s.iconText,
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
        <span className="relative">{s.initials}</span>
      </div>
      <div className="text-[11px] font-medium text-white">{s.name}</div>
      <div className="text-[10px] mb-1.5" style={{ color: homePremiumTokens.textSec }}>
        {s.sector}
      </div>
      <Pill bg="rgba(77,171,126,0.2)" color="#9FE1CB">
        New L{s.newLevel}
      </Pill>
    </div>
  );
}
