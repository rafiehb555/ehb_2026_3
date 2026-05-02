import type { PropsWithChildren } from 'react';

interface Props {
  className?: string;
  variant?: 'default' | 'nested' | 'glass';
  shimmer?: boolean;
}

/**
 * EHB Plastic Card — 3-layer coating (gloss + shimmer + depth shadow).
 * Use this as the base card everywhere in the DMO workspace.
 */
export function PlasticCard({
  children,
  className = '',
  variant = 'default',
  shimmer = true,
}: PropsWithChildren<Props>) {
  const bg =
    variant === 'nested'
      ? 'bg-nested'
      : variant === 'glass'
        ? 'bg-card/60 backdrop-blur-sm'
        : 'bg-card';
  return (
    <div
      className={`relative overflow-hidden rounded-card border border-glass ${bg} ${className}`}
      style={{
        boxShadow:
          '0 1px 0 rgba(255,255,255,0.25) inset, 0 -1px 0 rgba(0,0,0,0.15) inset, 0 8px 28px rgba(0,0,0,0.22)',
      }}
    >
      {/* Gloss layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[48%]"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%)',
        }}
      />
      {/* Shimmer layer */}
      {shimmer ? <span aria-hidden className="plastic-shimmer" /> : null}
      <div className="relative">{children}</div>
    </div>
  );
}
