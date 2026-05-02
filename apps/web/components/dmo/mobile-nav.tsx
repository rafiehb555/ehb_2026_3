'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { DmoSidebarContent } from './sidebar-content';
import { ThemeSwitcher } from './theme-switcher';
import { Chip } from '../ui/chip';

/**
 * Mobile nav — hamburger in a floating header bar on small screens,
 * slide-in drawer from left with overlay. Auto-closes on route change.
 */
export function MobileNav({ title, subtitle }: { title?: string; subtitle?: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when drawer open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Mobile sticky header (lg:hidden) */}
      <div className="sticky top-0 z-40 flex items-center gap-3 border-b border-glass bg-card/70 px-4 py-3 backdrop-blur-md lg:hidden">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          className="flex h-10 w-10 items-center justify-center rounded-card border border-glass bg-nested text-lg transition active:scale-95"
        >
          ☰
        </button>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-bold">{title || 'EHB DMO'}</div>
          {subtitle ? (
            <div className="truncate text-[11px] text-white/50">{subtitle}</div>
          ) : null}
        </div>
        <Chip tone="ok">
          <span className="mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#38C878]" />
          LIVE
        </Chip>
      </div>

      {/* Drawer + overlay */}
      {open ? (
        <>
          {/* Overlay */}
          <button
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          />
          {/* Drawer */}
          <aside
            className="fixed left-0 top-0 z-[60] h-full w-72 max-w-[85vw] overflow-y-auto border-r border-glass bg-card p-4 shadow-2xl lg:hidden"
            style={{ animation: 'slideInLeft 0.25s ease-out' }}
          >
            <div className="mb-2 flex items-center justify-end">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-card border border-glass bg-nested text-sm"
              >
                ✕
              </button>
            </div>
            <DmoSidebarContent onNavigate={() => setOpen(false)} />
            <div className="mt-6 border-t border-glass pt-4">
              <div className="mb-2 text-[10px] uppercase tracking-widest text-white/40">Theme</div>
              <ThemeSwitcher />
            </div>
          </aside>
        </>
      ) : null}

      <style jsx global>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
