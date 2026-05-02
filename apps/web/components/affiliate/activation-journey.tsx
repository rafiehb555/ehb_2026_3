'use client';

import { PlasticCard } from '../ui/plastic-card';
import { Chip } from '../ui/chip';

/**
 * EHB Affiliate / Franchise — Activation Journey Stepper
 *
 * Horizontal 7-step indicator matching Visily prototype:
 * Select Tier → Verify KYC → Eligibility → Payment → Sign Contract → Approval → Active
 *
 * Reusable for franchise activation, full onboarding, or any multi-step flow.
 * Mobile collapses to vertical stack.
 */

export interface JourneyStep {
  n: number;
  icon: string;
  label: string;
  /** Optional sub-label / description */
  desc?: string;
  /** Optional CTA href when this step is current */
  href?: string;
}

interface Props {
  /** 1-indexed current step (1..steps.length+1 where N+1 means all complete) */
  currentStep?: number;
  steps?: JourneyStep[];
  title?: string;
  subtitle?: string;
}

const DEFAULT_STEPS: JourneyStep[] = [
  { n: 1, icon: '📦', label: 'Select Tier', desc: 'Choose OF1-OF4 / Sub L1-L10' },
  { n: 2, icon: '🆔', label: 'Verify KYC', desc: 'ID + selfie + address' },
  { n: 3, icon: '✅', label: 'Eligibility', desc: 'Rank + SV + active legs check' },
  { n: 4, icon: '💳', label: 'Payment', desc: 'USDT / EHBGC lock' },
  { n: 5, icon: '📝', label: 'Sign Contract', desc: 'Digital agreement' },
  { n: 6, icon: '🛡️', label: 'Approval', desc: 'DMO license issued' },
  { n: 7, icon: '⚡', label: 'Active', desc: 'Cascade earnings begin' },
];

export function AffiliateActivationJourney({
  currentStep = 3,
  steps,
  title = 'Activation Journey',
  subtitle,
}: Props) {
  const list = steps || DEFAULT_STEPS;
  const totalSteps = list.length;
  const isComplete = currentStep > totalSteps;
  const progressPct = Math.min(100, ((currentStep - 1) / (totalSteps - 1)) * 100);

  return (
    <PlasticCard className="mt-4 p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
            🛤️ {title}
          </div>
          <h3 className="mt-1 text-lg font-semibold">
            {isComplete ? (
              <span className="text-teal">Complete · all 7 steps done</span>
            ) : (
              <>
                Step {currentStep} of {totalSteps}:{' '}
                <span className="text-purple-light">{list[currentStep - 1]?.label}</span>
              </>
            )}
          </h3>
          {subtitle && <p className="mt-1 text-xs text-white/50">{subtitle}</p>}
        </div>
        <Chip tone={isComplete ? 'ok' : 'purple'}>
          {Math.round((Math.min(currentStep, totalSteps) / totalSteps) * 100)}% complete
        </Chip>
      </div>

      {/* Horizontal stepper (desktop / tablet) */}
      <div className="mt-6 hidden sm:block">
        <div className="relative">
          {/* Background track */}
          <div className="absolute left-6 right-6 top-6 h-1 rounded-full bg-nested" />
          {/* Filled track */}
          <div
            className="absolute left-6 top-6 h-1 rounded-full bg-gradient-to-r from-purple-light via-teal to-amber transition-all"
            style={{ width: `calc((100% - 48px) * ${progressPct / 100})` }}
          />

          <div className="relative grid" style={{ gridTemplateColumns: `repeat(${totalSteps}, 1fr)` }}>
            {list.map((step) => {
              const isCompleted = step.n < currentStep;
              const isCurrent = step.n === currentStep;
              const isUpcoming = step.n > currentStep;
              return (
                <div key={step.n} className="flex flex-col items-center">
                  <div
                    className={`relative flex h-12 w-12 items-center justify-center rounded-full text-xl shadow-md transition-all ${
                      isCompleted
                        ? 'bg-gradient-to-br from-teal to-purple-light text-white'
                        : isCurrent
                        ? 'animate-pulse bg-gradient-to-br from-purple-light to-amber text-white ring-4 ring-purple-light/30'
                        : 'bg-nested/60 text-white/30'
                    }`}
                  >
                    {isCompleted ? '✓' : step.icon}
                    {isCurrent && (
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber text-[8px] font-bold text-white">
                        !
                      </span>
                    )}
                  </div>
                  <div
                    className={`mt-2 text-center text-[11px] font-medium ${
                      isCompleted
                        ? 'text-teal'
                        : isCurrent
                        ? 'text-purple-light'
                        : 'text-white/40'
                    }`}
                  >
                    {step.label}
                  </div>
                  {step.desc && (
                    <div className="mt-0.5 text-center text-[9px] text-white/40 px-1 leading-tight">
                      {isCurrent ? step.desc : ''}
                    </div>
                  )}
                  <div className="mt-0.5 text-[9px] text-white/30">Step {step.n}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Vertical stepper (mobile) */}
      <div className="mt-4 space-y-2 sm:hidden">
        {list.map((step) => {
          const isCompleted = step.n < currentStep;
          const isCurrent = step.n === currentStep;
          return (
            <div
              key={step.n}
              className={`flex items-center gap-3 rounded-card border p-3 ${
                isCurrent
                  ? 'border-purple-light bg-purple-light/10'
                  : isCompleted
                  ? 'border-glass bg-card/40'
                  : 'border-glass bg-nested/30 opacity-60'
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg ${
                  isCompleted
                    ? 'bg-gradient-to-br from-teal to-purple-light text-white'
                    : isCurrent
                    ? 'bg-gradient-to-br from-purple-light to-amber text-white'
                    : 'bg-nested/60 text-white/30'
                }`}
              >
                {isCompleted ? '✓' : step.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] text-white/40">Step {step.n}</span>
                  <span className={`text-sm font-medium ${isCurrent ? 'text-purple-light' : ''}`}>
                    {step.label}
                  </span>
                </div>
                {step.desc && <div className="text-[10px] text-white/50">{step.desc}</div>}
              </div>
              {isCurrent && <Chip tone="purple">In progress</Chip>}
              {isCompleted && <Chip tone="ok">Done</Chip>}
            </div>
          );
        })}
      </div>
    </PlasticCard>
  );
}
