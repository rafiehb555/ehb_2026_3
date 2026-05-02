'use client';

import { USER_TYPES, type UserTypeId, getUserType } from '@/lib/stl/user-types';
import { StlBadge } from '../ui/stl-badge';

interface Props {
  value: UserTypeId;
  onChange: (id: UserTypeId) => void;
  /** Filter — hide Admin for public/client-facing pages if needed */
  hideAdmin?: boolean;
}

/**
 * Top horizontal scrollable selector for user types + admin.
 * Picks a user type to view "as if they were this role" — shows STL matrix.
 */
export function UserTypeSelector({ value, onChange, hideAdmin = false }: Props) {
  const types = hideAdmin ? USER_TYPES.filter((t) => t.id !== 'admin') : USER_TYPES;
  const selected = getUserType(value);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
            Viewing as
          </div>
          <div className="text-sm font-semibold sm:text-base">
            {selected.name} · <span className="text-white/60">{selected.tagline}</span>
          </div>
        </div>
        <StlBadge level={selected.typicalStl} size="xs" showName={false} />
      </div>

      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {types.map((t) => {
          const active = t.id === value;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={`shrink-0 rounded-chip border px-3 py-2 text-xs font-semibold transition ${
                active
                  ? 'text-white shadow-lg'
                  : 'border-glass bg-nested/60 text-white/70 hover:border-white/30 hover:text-white'
              }`}
              style={
                active
                  ? {
                      background: `linear-gradient(135deg, ${t.gradient.from}, ${t.gradient.to})`,
                      borderColor: t.gradient.to as any,
                    }
                  : undefined
              }
            >
              <span className="mr-1.5 text-sm">{t.icon}</span>
              {t.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
