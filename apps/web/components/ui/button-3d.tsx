import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

/**
 * EHB — 3D depth Button
 *
 * Accepts canonical variants (gold/blue/green/red/purple) AND tolerates legacy
 * aliases used across the codebase (teal/amber/ok/fail/warn/info/cyan/pink)
 * so that no caller throws a runtime error if the variant string is unknown.
 */

type Variant =
  | 'gold'
  | 'blue'
  | 'green'
  | 'red'
  | 'purple'
  // Legacy / semantic aliases — tolerated, mapped to canonical
  | 'teal'
  | 'amber'
  | 'ok'
  | 'fail'
  | 'warn'
  | 'info'
  | 'pink';

const VARIANTS: Record<string, { from: string; to: string; shadow: string }> = {
  // Canonical
  gold: { from: '#F8B830', to: '#D89020', shadow: '#B8780A' },
  blue: { from: '#7B6EF6', to: '#5B4EE6', shadow: '#3B2EC6' },
  green: { from: '#38C878', to: '#1A7020', shadow: '#0F5010' },
  red: { from: '#F05858', to: '#C03030', shadow: '#801010' },
  purple: { from: '#A098F8', to: '#7B6EF6', shadow: '#5A4ED8' },
  // Aliases (mapped to nearest canonical color family)
  teal: { from: '#2BBFA0', to: '#1A8870', shadow: '#0F5050' },
  amber: { from: '#F0A030', to: '#C87010', shadow: '#A05010' },
  ok: { from: '#38C878', to: '#1A7020', shadow: '#0F5010' },
  fail: { from: '#F05858', to: '#C03030', shadow: '#801010' },
  warn: { from: '#F0A030', to: '#C87010', shadow: '#A05010' },
  info: { from: '#7B6EF6', to: '#5B4EE6', shadow: '#3B2EC6' },
  pink: { from: '#EC4899', to: '#C02468', shadow: '#801838' },
};

const FALLBACK = VARIANTS.purple;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant | string;
  size?: 'sm' | 'md' | 'lg';
}

export function Button3D({
  children,
  variant = 'purple',
  size = 'md',
  className = '',
  style,
  ...rest
}: PropsWithChildren<Props>) {
  // Defensive lookup — never crash if variant is misspelled or unknown
  const v = (variant && VARIANTS[variant]) || FALLBACK;
  const sz =
    size === 'sm' ? 'px-3 py-1.5 text-xs' : size === 'lg' ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm';
  return (
    <button
      {...rest}
      className={`relative inline-flex items-center justify-center rounded-card font-semibold text-white shadow transition-transform hover:-translate-y-0.5 active:translate-y-[5px] active:shadow-none ${sz} ${className}`}
      style={{
        background: `linear-gradient(180deg, ${v.from} 0%, ${v.to} 100%)`,
        boxShadow: `0 5px 0 ${v.shadow}, 0 8px 20px rgba(0,0,0,0.25)`,
        ...style,
      }}
    >
      {children}
    </button>
  );
}
