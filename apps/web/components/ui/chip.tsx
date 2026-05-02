import type { PropsWithChildren } from 'react';

interface Props {
  tone?: 'default' | 'ok' | 'warn' | 'fail' | 'purple' | 'teal' | 'amber';
  className?: string;
}

const TONES: Record<NonNullable<Props['tone']>, string> = {
  default: 'bg-white/10 text-white/80 border-white/15',
  ok: 'bg-[#38C878]/15 text-[#38C878] border-[#38C878]/30',
  warn: 'bg-[#F0A030]/15 text-[#F0A030] border-[#F0A030]/30',
  fail: 'bg-[#F05858]/15 text-[#F05858] border-[#F05858]/30',
  purple: 'bg-purple/15 text-purple-light border-purple/30',
  teal: 'bg-teal/15 text-teal border-teal/30',
  amber: 'bg-amber/15 text-amber border-amber/30',
};

export function Chip({ children, tone = 'default', className = '' }: PropsWithChildren<Props>) {
  return (
    <span
      className={`inline-flex items-center rounded-chip border px-2 py-0.5 text-xs font-medium ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
