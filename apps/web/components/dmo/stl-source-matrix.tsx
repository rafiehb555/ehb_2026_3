'use client';

import type { UserTypeDef } from '@/lib/stl/user-types';
import { PlasticCard } from '../ui/plastic-card';
import { Chip } from '../ui/chip';
import { StlBadge } from '../ui/stl-badge';

interface Props {
  type: UserTypeDef;
}

/**
 * Visual matrix showing where a user of this type can earn STL from —
 * which source contributes, what max they can reach, realistic typical level.
 */
export function StlSourceMatrix({ type }: Props) {
  const sources = [
    {
      key: 'PSS',
      icon: '🛡️',
      label: 'PSS (Identity)',
      tagline: 'KYC + liveness + AML',
      max: type.maxFrom.pss,
      required: type.requires.pss,
      weight: 33,
      from: '#7B6EF6',
      to: '#A098F8',
    },
    {
      key: 'CRB',
      icon: '📜',
      label: 'CRB (Credentials)',
      tagline: 'Exams + inspections + on-chain hash',
      max: type.maxFrom.crb,
      required: type.requires.crb,
      weight: 33,
      from: '#2BBFA0',
      to: '#38C878',
    },
    {
      key: 'DMO',
      icon: '🏛️',
      label: 'DMO (Governance)',
      tagline: 'Activity + behavior + performance',
      max: type.maxFrom.dmo,
      required: 0,
      weight: 34,
      from: '#F0A030',
      to: '#F8B830',
    },
    {
      key: 'Franchise',
      icon: '🌐',
      label: 'Franchise (Network)',
      tagline: 'Own L1–L10 or OF1–OF4',
      max: type.maxFrom.franchise,
      required: 0,
      weight: 0,
      from: '#ec4899',
      to: '#db2777',
      note: type.maxFrom.franchise > 0 ? 'Adds direct STL boost up to L8' : 'Not applicable',
    },
  ];

  return (
    <PlasticCard className="p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
            STL source matrix · {type.name}
          </div>
          <h3 className="mt-1 text-base font-semibold sm:text-lg">
            Where your STL comes from
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-white/50">Typical:</span>
          <StlBadge level={type.typicalStl} size="xs" />
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {sources.map((s) => {
          const isActive = s.max > 0;
          const pctMax = (s.max / 10) * 100;
          return (
            <div
              key={s.key}
              className={`rounded-card border p-3 transition ${
                isActive
                  ? 'border-glass bg-nested/60'
                  : 'border-glass bg-nested/30 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{s.icon}</span>
                  <div>
                    <div className="text-sm font-semibold">{s.label}</div>
                    <div className="text-[10px] text-white/50">{s.tagline}</div>
                  </div>
                </div>
                {isActive ? (
                  <StlBadge level={s.max} size="xs" showName={false} />
                ) : (
                  <Chip>—</Chip>
                )}
              </div>

              {isActive ? (
                <>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-chip bg-white/5">
                    <div
                      className="h-full rounded-chip"
                      style={{
                        width: `${pctMax}%`,
                        background: `linear-gradient(to right, ${s.from}, ${s.to})`,
                      }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-white/50">
                    <span>
                      {s.required > 0 ? `Min: L${s.required}` : 'No minimum'}
                    </span>
                    <span>Max alone: L{s.max}</span>
                  </div>
                </>
              ) : (
                <div className="mt-2 text-[11px] text-white/40">
                  {s.note || 'Not applicable'}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-card border border-glass bg-nested/40 p-3 text-xs">
        <div className="mb-1 text-[10px] uppercase tracking-widest text-white/40">
          Primary sources for this type
        </div>
        <div className="flex flex-wrap gap-2">
          {type.primarySources.map((s, i) => (
            <Chip key={s} tone={i === 0 ? 'purple' : i === 1 ? 'teal' : 'amber'}>
              #{i + 1} {s}
            </Chip>
          ))}
        </div>
        <div className="mt-2 text-white/60">
          Final EHB-STL = MIN(source_score, lowest_component × 10 + 10) — weakest link caps the chain.
        </div>
      </div>
    </PlasticCard>
  );
}
