/**
 * EHB Home — Section Header
 * Reusable title row with arrow links + L/R nav arrows.
 * Spec: ehb-info/15-ui-system/HOME-PAGE-DESIGN.md §Section header
 */
'use client';

import { homePremiumTokens } from '@/lib/dmo/theme';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  rightAccessory?: React.ReactNode;
  href?: string;
}

export function SectionHeader({ title, subtitle, rightAccessory, href }: SectionHeaderProps) {
  return (
    <div>
      <div className="mt-5 mb-1 flex items-center justify-between gap-3">
        <a
          href={href}
          className="flex items-center gap-2 text-[15px] font-medium text-white hover:opacity-80"
          style={{ color: homePremiumTokens.text }}
        >
          {title}
          <span style={{ color: homePremiumTokens.textSec }}>›</span>
        </a>
        <div className="flex items-center gap-1.5">
          {rightAccessory}
          <NavArrow direction="left" />
          <NavArrow direction="right" active />
        </div>
      </div>
      {subtitle && (
        <div className="text-[11px] mb-3" style={{ color: homePremiumTokens.textSec }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

export function NavArrow({ direction, active = false }: { direction: 'left' | 'right'; active?: boolean }) {
  return (
    <span
      className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px]"
      style={{
        background: active ? 'rgba(240,185,11,0.12)' : 'rgba(255,255,255,0.06)',
        color: active ? '#F0B90B' : '#8E92A8',
        border: `1px solid ${active ? 'rgba(240,185,11,0.3)' : 'rgba(255,255,255,0.08)'}`,
      }}
    >
      {direction === 'left' ? '‹' : '›'}
    </span>
  );
}

interface CountryChipsProps {
  active: string;
  countries: { code: string; label: string }[];
  onChange?: (code: string) => void;
}

export function CountryChips({ active, countries, onChange }: CountryChipsProps) {
  return (
    <div className="flex items-center gap-1.5">
      {countries.map((c) => {
        const isActive = c.code === active;
        return (
          <button
            key={c.code}
            type="button"
            onClick={() => onChange?.(c.code)}
            className="px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide"
            style={{
              background: isActive ? '#042C53' : 'rgba(255,255,255,0.04)',
              color: isActive ? '#F0B90B' : '#8E92A8',
              border: isActive ? '1px solid rgba(240,185,11,0.3)' : '1px solid transparent',
            }}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}

/** Premium card pill (for status / level badges). */
export function Pill({
  children,
  bg,
  color,
}: {
  children: React.ReactNode;
  bg: string;
  color: string;
}) {
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full text-[9px] font-medium tracking-wide"
      style={{ background: bg, color }}
    >
      {children}
    </span>
  );
}
