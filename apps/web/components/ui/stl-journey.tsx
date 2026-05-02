'use client';

import Link from 'next/link';

export interface JourneyStep {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  status: 'done' | 'current' | 'locked';
  cap?: string; // e.g. "L5"
  href?: string;
  cta?: string;
  from: string;
  to: string;
}

interface Props {
  steps: JourneyStep[];
  currentLevel: number;
}

/**
 * StlJourney — visual stepper showing the user's path through the EHB trust
 * pipeline: Register → PSS → CRB → DMO → EHBGC Lock → AI Marketplace access.
 * Each step shows its source cap (max STL that step can contribute) and
 * current status (done / current / locked).
 */
export function StlJourney({ steps, currentLevel }: Props) {
  return (
    <div className="relative">
      {/* Desktop: horizontal stepper with connecting line */}
      <div className="hidden lg:block">
        <div className="absolute left-0 right-0 top-[46px] h-0.5 bg-gradient-to-r from-[#2BBFA0] via-[#7B6EF6] to-white/10" />
        <div className="relative grid grid-cols-6 gap-2">
          {steps.map((s) => (
            <StepNode key={s.id} step={s} currentLevel={currentLevel} layout="desktop" />
          ))}
        </div>
      </div>

      {/* Mobile / tablet: vertical stack */}
      <div className="lg:hidden space-y-3">
        {steps.map((s, i) => (
          <div key={s.id} className="relative">
            {i < steps.length - 1 ? (
              <div
                className="absolute left-6 top-14 h-6 w-0.5 bg-gradient-to-b from-white/30 to-white/5"
                aria-hidden
              />
            ) : null}
            <StepNode step={s} currentLevel={currentLevel} layout="mobile" />
          </div>
        ))}
      </div>
    </div>
  );
}

function StepNode({
  step,
  currentLevel,
  layout,
}: {
  step: JourneyStep;
  currentLevel: number;
  layout: 'desktop' | 'mobile';
}) {
  const statusColor =
    step.status === 'done'
      ? { bg: '#2BBFA0', border: '#2BBFA0', ring: 'rgba(43,191,160,0.35)' }
      : step.status === 'current'
        ? { bg: '#7B6EF6', border: '#7B6EF6', ring: 'rgba(123,110,246,0.5)' }
        : { bg: '#1A1D33', border: '#2c2f45', ring: 'rgba(255,255,255,0.05)' };

  const labelColor =
    step.status === 'done'
      ? 'text-teal'
      : step.status === 'current'
        ? 'text-purple-light'
        : 'text-white/40';

  const badge =
    step.status === 'done' ? 'DONE' : step.status === 'current' ? 'IN PROGRESS' : 'LOCKED';

  const content = (
    <>
      <div
        className={`flex items-center gap-3 ${layout === 'desktop' ? 'flex-col text-center' : ''}`}
      >
        {/* Node circle */}
        <div
          className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl transition"
          style={{
            background: step.status === 'locked'
              ? statusColor.bg
              : `linear-gradient(135deg, ${step.from}, ${step.to})`,
            border: `2px solid ${statusColor.border}`,
            boxShadow: step.status !== 'locked' ? `0 0 18px ${statusColor.ring}` : 'none',
          }}
        >
          {step.status === 'done' ? (
            <span className="text-lg text-white">✓</span>
          ) : (
            <span>{step.icon}</span>
          )}
          {step.status === 'current' ? (
            <span
              className="absolute inset-0 animate-ping rounded-full opacity-40"
              style={{ background: statusColor.bg }}
            />
          ) : null}
        </div>

        {/* Text block */}
        <div className={`min-w-0 ${layout === 'desktop' ? 'mt-2' : ''}`}>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
              Step {step.id}
            </span>
            {step.cap ? (
              <span className="rounded-chip bg-white/10 px-1.5 py-0.5 text-[9px] font-bold text-white/60">
                Cap {step.cap}
              </span>
            ) : null}
          </div>
          <div className="mt-0.5 truncate text-xs font-bold sm:text-sm">{step.title}</div>
          <div
            className={`mt-0.5 ${layout === 'desktop' ? 'text-[10px]' : 'text-[11px]'} ${labelColor} font-semibold`}
          >
            {badge}
          </div>
          <div className="mt-1 line-clamp-2 text-[10px] text-white/50 sm:text-[11px]">
            {step.subtitle}
          </div>
          {step.status === 'current' && step.cta ? (
            <div className="mt-2">
              <span className="inline-block rounded-chip bg-purple-light/20 px-2 py-0.5 text-[10px] font-bold text-purple-light">
                {step.cta} →
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );

  if (step.href) {
    return (
      <Link
        href={step.href}
        className="block rounded-card border border-glass bg-nested/40 p-3 transition hover:border-purple-light hover:bg-nested"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="rounded-card border border-glass bg-nested/40 p-3">
      {content}
    </div>
  );
}
