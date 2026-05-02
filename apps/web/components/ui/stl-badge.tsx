import { stlLevelGradients } from '@/lib/dmo/theme';

const NAMES = [
  '',
  'FREE',
  'BASIC',
  'NORMAL',
  'STANDARD',
  'ADVANCED',
  'HIGH',
  'PRO',
  'VIP',
  'ELITE',
  'SUPREME',
];

interface Props {
  level: number; // 1-10
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showName?: boolean;
}

export function StlBadge({ level, size = 'sm', showName = true }: Props) {
  const l = Math.max(1, Math.min(10, Math.round(level)));
  const g = stlLevelGradients[l];
  const sz =
    size === 'xs'
      ? 'h-5 min-w-[28px] text-[10px] px-1.5'
      : size === 'sm'
        ? 'h-6 min-w-[32px] text-[11px] px-2'
        : size === 'md'
          ? 'h-7 min-w-[40px] text-xs px-2.5'
          : 'h-9 min-w-[48px] text-sm px-3';
  return (
    <span
      className={`inline-flex items-center justify-center gap-1.5 rounded-chip font-bold tracking-wide text-white ${sz}`}
      style={{
        background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
        boxShadow: `0 0 0 1px rgba(255,255,255,0.15) inset, 0 2px 6px ${g.to}55`,
      }}
      title={`STL Level ${l} (${NAMES[l]})`}
    >
      <span>L{l}</span>
      {showName ? <span className="opacity-90">{NAMES[l]}</span> : null}
    </span>
  );
}
