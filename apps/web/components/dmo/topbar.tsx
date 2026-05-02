'use client';

import { ThemeSwitcher } from './theme-switcher';
import { Chip } from '../ui/chip';

interface Props {
  title: string;
  subtitle?: string;
  breadcrumb?: string[];
}

export function DmoTopbar({ title, subtitle, breadcrumb }: Props) {
  return (
    <header className="border-b border-glass bg-card/30 backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          {breadcrumb ? (
            <div className="mb-1 truncate text-[11px] text-white/40">
              {breadcrumb.join(' / ')}
            </div>
          ) : null}
          <h1 className="truncate text-lg font-bold sm:text-xl">{title}</h1>
          {subtitle ? (
            <div className="mt-0.5 text-xs text-white/50 sm:text-sm">{subtitle}</div>
          ) : null}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Chip tone="ok" className="hidden sm:inline-flex">
            <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#38C878]" />
            LIVE
          </Chip>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
