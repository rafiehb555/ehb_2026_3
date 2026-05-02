/**
 * EHB Home — Premium Hero (Section 2)
 * Spec: ehb-info/15-ui-system/HOME-PAGE-DESIGN.md §Hero
 */
'use client';

import Link from 'next/link';
import { homePremiumTokens } from '@/lib/dmo/theme';

interface PremiumHeroProps {
  userName?: string;
  userScore?: number;
  userLevel?: number;
  ehbgcLocked?: number;
  responsibility?: number;
}

export function PremiumHero({
  userName = 'Muhammad Rafi',
  userScore = 97,
  userLevel = 8,
  ehbgcLocked = 2000,
  responsibility = 95,
}: PremiumHeroProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-3.5">
      {/* Main hero with gauge */}
      <div
        className="relative overflow-hidden rounded-2xl p-5 md:col-span-2"
        style={{
          background: 'linear-gradient(135deg, #1A1D33 0%, #0C0E1A 100%)',
          border: `1px solid ${homePremiumTokens.borderSubtle}`,
          minHeight: 200,
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(240,185,11,0.4), transparent)',
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            background: 'radial-gradient(circle, rgba(240,185,11,0.18), transparent 70%)',
          }}
        />

        <div className="relative">
          <div className="flex items-center gap-1.5 mb-3.5">
            <span
              className="px-2 py-0.5 rounded-full text-[9px] font-medium tracking-wide"
              style={{
                background: 'rgba(45,180,127,0.18)',
                color: '#4DAB7E',
                border: '1px solid rgba(45,180,127,0.3)',
              }}
            >
              ● Live
            </span>
            <span
              className="px-2 py-0.5 rounded-full text-[9px] font-medium tracking-wide"
              style={{
                background: 'rgba(240,185,11,0.15)',
                color: '#F0B90B',
                border: '1px solid rgba(240,185,11,0.3)',
              }}
            >
              L{userLevel} VIP
            </span>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-3.5 items-center">
            <ConicGauge score={userScore} />
            <div>
              <div className="text-lg md:text-xl font-medium text-white mb-0.5">{userName}</div>
              <div className="text-[11px] mb-2" style={{ color: homePremiumTokens.textSec }}>
                EHB Founder · Pakistan 🇵🇰
              </div>
              <div
                className="inline-block text-[10px] px-3 py-1.5 rounded-full font-medium"
                style={{
                  background: `linear-gradient(135deg, ${homePremiumTokens.gold}, ${homePremiumTokens.goldDark})`,
                  color: '#412402',
                  boxShadow: '0 2px 6px rgba(240,185,11,0.4)',
                }}
              >
                L{userLevel} VIP ★ EHB Super User
              </div>
            </div>
          </div>

          <div
            className="mt-3.5 pt-3 flex justify-between text-[10px]"
            style={{ borderTop: `1px solid ${homePremiumTokens.borderSubtle}` }}
          >
            <div>
              <span style={{ color: homePremiumTokens.textSec }}>EHBGC Locked </span>
              <span style={{ color: '#F0B90B', fontWeight: 500 }}>{ehbgcLocked.toLocaleString()} / 4,000</span>
            </div>
            <div>
              <span style={{ color: homePremiumTokens.textSec }}>Responsibility </span>
              <span style={{ color: '#4DAB7E', fontWeight: 500 }}>{responsibility}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Side cards */}
      <div className="grid grid-rows-2 gap-2.5">
        <SideCardPremium />
        <SideCardFranchise />
      </div>
    </div>
  );
}

function ConicGauge({ score }: { score: number }) {
  const successAngle = (score / 100) * 360;
  return (
    <div
      className="rounded-full flex items-center justify-center"
      style={{
        width: 78,
        height: 78,
        background: `conic-gradient(#4DAB7E 0deg ${successAngle - 30}deg, #F0B90B ${successAngle - 30}deg ${successAngle}deg, rgba(255,255,255,0.1) ${successAngle}deg 360deg)`,
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
      }}
    >
      <div
        className="rounded-full flex flex-col items-center justify-center"
        style={{
          width: 64,
          height: 64,
          background: '#0C0E1A',
        }}
      >
        <div className="text-[8px] tracking-widest" style={{ color: homePremiumTokens.textSec }}>
          EHB STL
        </div>
        <div className="text-xl font-medium" style={{ color: '#F0B90B' }}>
          {score}
        </div>
        <div className="text-[7px]" style={{ color: homePremiumTokens.textSec }}>
          / 100
        </div>
      </div>
    </div>
  );
}

function SideCardPremium() {
  return (
    <Link
      href="/dmo/stl"
      className="relative overflow-hidden rounded-xl p-3.5 flex flex-col justify-between"
      style={{
        background: 'linear-gradient(135deg, #1A1D33, #0C2E5C)',
        border: '1px solid rgba(133,183,235,0.2)',
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(133,183,235,0.4), transparent)',
        }}
      />
      <div>
        <div className="px-2 py-0.5 inline-block rounded-full text-[9px] font-medium tracking-wide" style={{ background: 'rgba(133,183,235,0.15)', color: '#85B7EB' }}>
          PREMIUM
        </div>
        <div className="text-[13px] font-medium mt-1.5 text-white">Build EHB STL L4</div>
        <div className="text-[10px]" style={{ color: '#85B7EB' }}>
          Unlock 35 industries
        </div>
      </div>
      <div className="absolute right-3 bottom-2.5 text-sm" style={{ color: '#F0B90B' }}>
        →
      </div>
    </Link>
  );
}

function SideCardFranchise() {
  return (
    <Link
      href="/franchise"
      className="relative overflow-hidden rounded-xl p-3.5 flex flex-col justify-between"
      style={{
        background: `linear-gradient(135deg, ${homePremiumTokens.gold}, ${homePremiumTokens.goldDark})`,
        color: '#412402',
      }}
    >
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: '35%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.25), transparent)',
        }}
      />
      <div className="relative">
        <div className="px-2 py-0.5 inline-block rounded-full text-[9px] font-medium tracking-wide" style={{ background: 'rgba(65,36,2,0.2)', color: '#412402' }}>
          FRANCHISE
        </div>
        <div className="text-[13px] font-medium mt-1.5">Sub L8 from $5K</div>
        <div className="text-[10px]">200 seats · Pakistan</div>
      </div>
      <div className="absolute right-3 bottom-2.5 text-sm">→</div>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* Theme + Layout switcher (top-bar pills)                                */
/* ─────────────────────────────────────────────────────────────────────── */

export function ThemeLayoutSwitcher() {
  return (
    <div className="flex items-center gap-2.5 text-[10px]">
      <PillToggle options={['iOS Classic', 'Diamond']} active="iOS Classic" />
      <PillToggle options={['iPhone', 'PC Desktop']} active="PC Desktop" tone="blue" />
    </div>
  );
}

function PillToggle({ options, active, tone = 'dark' }: { options: string[]; active: string; tone?: 'dark' | 'blue' }) {
  return (
    <div
      className="flex gap-0.5 rounded-full p-0.5"
      style={{
        background: 'rgba(0,0,0,0.3)',
        border: `1px solid ${homePremiumTokens.borderSubtle}`,
      }}
    >
      {options.map((opt) => {
        const isActive = opt === active;
        return (
          <span
            key={opt}
            className="px-2.5 py-1 rounded-full"
            style={
              isActive
                ? {
                    background:
                      tone === 'blue'
                        ? 'linear-gradient(135deg, #185FA5, #0C2E5C)'
                        : 'linear-gradient(135deg, #1A1D33, #0C0E1A)',
                    color: '#fff',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }
                : { color: homePremiumTokens.textSec }
            }
          >
            {opt}
          </span>
        );
      })}
    </div>
  );
}
