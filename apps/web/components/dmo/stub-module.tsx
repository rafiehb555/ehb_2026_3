'use client';

import Link from 'next/link';
import { DmoTopbar } from './topbar';
import { PlasticCard } from '../ui/plastic-card';
import { Chip } from '../ui/chip';

interface Props {
  title: string;
  subtitle: string;
  group: string;
  phase: string; // e.g. "Phase 2 — Week 6"
  bullets: string[];
}

export function DmoStubModule({ title, subtitle, group, phase, bullets }: Props) {
  return (
    <>
      <DmoTopbar title={title} subtitle={subtitle} breadcrumb={[group, title]} />
      <div className="p-6">
        <PlasticCard className="p-8">
          <div className="flex flex-wrap items-start gap-3">
            <Chip tone="warn">Coming soon</Chip>
            <Chip tone="purple">{phase}</Chip>
          </div>
          <h3 className="mt-4 text-xl font-bold">Scheduled for {phase}</h3>
          <p className="mt-2 text-sm text-white/60">
            This module is routed and reachable — its full UI lands in the build wave listed above.
            See <code className="rounded bg-white/5 px-1 py-0.5">EHB-PHASE-1-DMO-FRANCHISE-AI.md</code> §3.1 for scope.
          </p>

          <div className="mt-6 grid gap-2 text-sm text-white/70">
            {bullets.map((b) => (
              <div key={b} className="flex items-start gap-2 rounded-card border border-glass bg-nested p-3">
                <span className="text-teal">●</span>
                <span>{b}</span>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link href="/dmo" className="text-xs text-purple-light hover:underline">
              ← Back to dashboard
            </Link>
          </div>
        </PlasticCard>
      </div>
    </>
  );
}
