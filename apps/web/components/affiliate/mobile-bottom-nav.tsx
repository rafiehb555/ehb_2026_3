'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * EHB Affiliate — Mobile bottom navigation
 *
 * Fixed bottom tab bar for the mobile-optimized views (/m/*).
 * Matches Visily mobile prototype screens.
 */

const TABS = [
  { id: 'marketplace', label: 'Marketplace', icon: '🛍️', href: '/m/affiliate/marketplace' },
  { id: 'dashboard', label: 'Dashboard', icon: '📊', href: '/m/affiliate' },
  { id: 'dmo', label: 'DMO Review', icon: '🛡️', href: '/m/affiliate/dmo' },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-glass bg-card/95 backdrop-blur-md">
      <div className="grid grid-cols-3">
        {TABS.map((t) => {
          const active = pathname === t.href || (t.id === 'dashboard' && pathname === '/m/affiliate');
          return (
            <Link
              key={t.id}
              href={t.href}
              className={`flex flex-col items-center gap-1 px-2 py-3 text-[10px] transition ${
                active ? 'text-purple-light' : 'text-white/50'
              }`}
            >
              <span className="text-xl">{t.icon}</span>
              <span className={active ? 'font-semibold' : ''}>{t.label}</span>
              {active && (
                <span className="absolute top-0 h-0.5 w-12 rounded-full bg-purple-light" />
              )}
            </Link>
          );
        })}
      </div>
      {/* Safe-area inset for iPhone notch */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
