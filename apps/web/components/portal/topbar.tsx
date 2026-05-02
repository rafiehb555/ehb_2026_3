'use client';

import { useState } from 'react';

/**
 * EHB Compliance Portal — Top bar
 * Search · Breadcrumb · Notifications · User avatar
 */

interface Props {
  title?: string;
  breadcrumb?: string[];
  onMenuClick?: () => void;
  searchPlaceholder?: string;
}

export function CompliancePortalTopBar({
  title,
  breadcrumb,
  onMenuClick,
  searchPlaceholder = 'Search products, sellers, transactions, users...',
}: Props) {
  const [search, setSearch] = useState('');

  return (
    <header className="sticky top-0 z-30 border-b border-glass bg-bg/80 backdrop-blur-md">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        {/* Mobile menu button — only shows on phones (sm and below) */}
        <button
          onClick={onMenuClick}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-card border border-glass bg-card/40 md:hidden"
          aria-label="Open menu"
        >
          ☰
        </button>

        {/* Breadcrumb / Title — visible on phones + tablets */}
        <div className="min-w-0 flex-1 lg:hidden">
          <h1 className="truncate text-sm font-bold">{title || 'Portal'}</h1>
          {breadcrumb && breadcrumb.length > 0 && (
            <div className="truncate text-[10px] text-white/40">
              {breadcrumb.join(' / ')}
            </div>
          )}
        </div>

        {/* Search bar (desktop) */}
        <div className="hidden flex-1 max-w-md lg:block">
          <div className="flex items-center gap-2 rounded-card border border-glass bg-card/40 px-3 py-2 transition focus-within:border-purple-light/50">
            <span className="text-white/40">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="flex-1 bg-transparent text-xs outline-none placeholder:text-white/40"
            />
            <kbd className="hidden rounded border border-glass bg-nested px-1.5 py-0.5 text-[9px] text-white/40 sm:inline-block">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <button
            className="relative flex h-9 w-9 items-center justify-center rounded-card border border-glass bg-card/40 hover:border-purple-light/50"
            aria-label="Notifications"
          >
            <span className="text-base">🔔</span>
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-400 text-[8px] font-bold text-white">
              3
            </span>
          </button>
          <button
            className="hidden h-9 w-9 items-center justify-center rounded-card border border-glass bg-card/40 hover:border-purple-light/50 sm:flex"
            aria-label="Help"
          >
            ?
          </button>
          <div className="hidden h-9 w-px bg-glass sm:block" />
          <button className="hidden items-center gap-2 rounded-card border border-glass bg-card/40 px-3 py-2 hover:border-purple-light/50 sm:flex">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-amber to-pink-400 text-[10px] font-bold text-white">
              SJ
            </div>
            <span className="text-xs">Sarah J.</span>
            <span className="text-[10px] text-white/40">▾</span>
          </button>
        </div>
      </div>

      {/* Breadcrumb row (desktop) */}
      {breadcrumb && breadcrumb.length > 0 && (
        <div className="hidden border-t border-glass px-6 py-2 lg:block">
          <div className="flex items-center gap-1.5 text-[11px] text-white/50">
            {breadcrumb.map((b, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className={i === breadcrumb.length - 1 ? 'text-white' : ''}>{b}</span>
                {i < breadcrumb.length - 1 && <span className="text-white/20">/</span>}
              </span>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
