/**
 * EHB STL Trust Ladder (Section 3) + Boost Paths (Section 16)
 * Spec: ehb-info/15-ui-system/STL-LADDER-COMPONENT.md
 *
 * AUTO-SAVE: Any change here MUST update STL-LADDER-COMPONENT.md
 */
'use client';

import { useState } from 'react';
import { homeStlLevels, homePremiumTokens, type HomeStlLevel } from '@/lib/dmo/theme';
import { boostPaths } from '@/lib/data/home-sections';
import { SectionHeader, CountryChips, Pill } from './section-header';
import { LevelIcon, LockOverlay } from './level-icon';

interface StlLadderRowProps {
  currentLevel?: number; // user's current level (1-10), default 8
  defaultCountry?: string;
}

export function StlLadderRow({ currentLevel = 8, defaultCountry = 'PK' }: StlLadderRowProps) {
  const [country, setCountry] = useState(defaultCountry);

  return (
    <div>
      <SectionHeader
        title="EHB STL Trust Ladder"
        subtitle="10 levels · plastic coated · click to drill in"
        rightAccessory={
          <CountryChips
            active={country}
            onChange={setCountry}
            countries={[
              { code: 'PK', label: 'Pakistan' },
              { code: 'AE', label: 'UAE' },
              { code: 'SA', label: 'KSA' },
            ]}
          />
        }
      />
      <div className="flex gap-2 overflow-x-auto pb-1.5 -mx-1 px-1 ehb-no-scrollbar">
        {homeStlLevels.map((lvl) => (
          <StlTile key={lvl.level} level={lvl} isCurrent={lvl.level === currentLevel} />
        ))}
      </div>
    </div>
  );
}

function StlTile({ level, isCurrent }: { level: HomeStlLevel; isCurrent: boolean }) {
  const isLocked = level.locked;

  return (
    <div
      className="relative flex-shrink-0 rounded-xl text-center overflow-hidden"
      style={{
        flexBasis: '116px',
        minWidth: '116px',
        padding: '12px 10px',
        background: `linear-gradient(155deg, ${level.from} 0%, ${level.to} 100%)`,
        boxShadow: isCurrent
          ? `0 4px 18px ${level.from}80, inset 0 1px 0 rgba(255,255,255,0.3)`
          : `0 4px 14px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.18)`,
        border: isCurrent ? '1px solid rgba(255,255,255,0.25)' : '1px solid transparent',
      }}
    >
      {/* gloss top */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{ height: '35%', background: homePremiumTokens.glossTopGradient }}
      />

      {isCurrent && !isLocked && (
        <div
          className="absolute right-1 top-1 px-1.5 py-0.5 rounded-full text-[7px] font-medium z-10"
          style={{ background: 'rgba(0,0,0,0.4)', color: '#F0B90B' }}
        >
          ★ YOU
        </div>
      )}

      <div className="relative" style={{ color: level.accentLight, fontSize: 9, letterSpacing: 1.2, fontWeight: 500 }}>
        L{level.level}
      </div>
      <div className="relative my-1.5 flex items-center justify-center">
        <LevelIcon iconKey={level.iconKey} fill={isCurrent && level.level === 8 ? '#412402' : level.textOnTile} size={36} />
      </div>
      <div
        className="relative"
        style={{ color: level.textOnTile, fontSize: 13, fontWeight: 500, letterSpacing: 1, marginBottom: 2 }}
      >
        {level.name}
      </div>
      <div className="relative" style={{ color: level.accentLight, fontSize: 9, opacity: 0.85, marginBottom: 6 }}>
        {level.ptsRange[0]}–{level.ptsRange[1]} pts
      </div>
      <div className="relative" style={{ color: level.accentLight, fontSize: 9, opacity: 0.85 }}>
        {level.lockEhbgc.toLocaleString()} EHBGC
      </div>
      <div
        className="relative"
        style={{ color: level.textOnTile, fontSize: 11, fontWeight: 500, marginTop: 6 }}
      >
        {level.responsibilityPct}%
      </div>

      {isLocked && <LockOverlay />}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* Boost STL Row (Section 16)                                              */
/* ─────────────────────────────────────────────────────────────────────── */

export function BoostStlRow() {
  return (
    <div>
      <SectionHeader title="Build your EHB STL" subtitle="3 paths to boost from L4 → L5" />
      <div className="grid grid-cols-3 gap-2">
        {boostPaths.map((p) => (
          <div
            key={p.key}
            className="relative rounded-xl p-3.5 overflow-hidden"
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
              className="relative h-12 w-12 rounded-xl flex items-center justify-center text-sm font-medium mb-2"
              style={{
                background: `linear-gradient(135deg, ${p.iconFrom}, ${p.iconTo})`,
                color: p.iconText,
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.22)',
              }}
            >
              {p.boost.split(' ')[1]}
            </div>
            <div className="text-xs font-medium text-white">{p.title}</div>
            <div className="text-[10px] mb-2" style={{ color: homePremiumTokens.textSec }}>
              {p.detail}
            </div>
            <Pill bg={p.pillFrom} color={p.pillText}>
              {p.boost}
            </Pill>
          </div>
        ))}
      </div>
    </div>
  );
}
