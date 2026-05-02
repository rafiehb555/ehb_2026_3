'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

/**
 * EHB Compliance Portal — Sidebar Navigation
 *
 * Matches Visily prototype desktop layout — grouped nav (AFFILIATE / SELLER /
 * ADMIN / SYSTEM), active item highlighted, collapsible on mobile.
 */

interface NavItem {
  href: string;
  label: string;
  icon: string;
  badge?: string | number;
  badgeTone?: 'purple' | 'teal' | 'amber' | 'red';
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

// Sidebar links point to CANONICAL existing pages — single unified navigation
// Removes duplicate /portal/* routes; uses existing /affiliate, /dmo, /seller, /wallet, /kyc
const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Affiliate',
    items: [
      { href: '/portal', label: 'Overview', icon: '🏠' },
      { href: '/affiliate', label: 'My Dashboard', icon: '📊' },
      { href: '/affiliate/analytics', label: 'Analytics', icon: '📈' },
      { href: '/affiliate/network-growth', label: 'Network Growth', icon: '🌳' },
      { href: '/affiliate/notifications', label: 'Notifications', icon: '🔔', badge: 5, badgeTone: 'purple' },
      { href: '/affiliate/marketplace', label: 'Marketplace', icon: '🛍️' },
      { href: '/affiliate/rank-detail', label: 'Ranks & Unlocks', icon: '🏆' },
      { href: '/dmo/campaigns', label: 'Campaigns', icon: '📢' },
      { href: '/affiliate/how-it-works', label: 'How it works', icon: '📚' },
    ],
  },
  {
    label: 'Wallet & KYC',
    items: [
      { href: '/wallet', label: 'My Wallet', icon: '💰' },
      { href: '/kyc', label: 'KYC Documents', icon: '🆔' },
      { href: '/reports/commission-statement', label: 'Statement (PDF)', icon: '📄' },
    ],
  },
  {
    label: 'Seller',
    items: [
      { href: '/seller/analytics', label: 'Analytics', icon: '📊' },
      { href: '/gosellr/sell', label: 'My Products', icon: '📦' },
      { href: '/gosellr/sell/new', label: 'New Product', icon: '✨', badge: 'NEW', badgeTone: 'teal' },
    ],
  },
  {
    label: 'Admin · DMO',
    items: [
      { href: '/dmo/affiliate-admin', label: 'Affiliate Admin', icon: '🛡️', badge: 12, badgeTone: 'amber' },
      { href: '/dmo/product-moderation', label: 'Moderation', icon: '🚨', badge: 4, badgeTone: 'red' },
      { href: '/dmo/price-lock', label: 'Price Locks', icon: '🔒' },
      { href: '/dmo/wallet-control', label: 'Wallet Control', icon: '💳' },
      { href: '/dmo/earnings-engine', label: 'Earnings Engine', icon: '⚙️' },
    ],
  },
  {
    label: 'System',
    items: [
      { href: '/portal/test-checkout', label: 'Test Checkout', icon: '🧪' },
      { href: '/portal/settings', label: 'Settings', icon: '⚙️' },
      { href: '/affiliate/help', label: 'Help & Legal', icon: '📚' },
    ],
  },
];

const BADGE_COLORS: Record<NonNullable<NavItem['badgeTone']>, string> = {
  purple: 'bg-purple-light/20 text-purple-light border-purple-light/30',
  teal: 'bg-teal/20 text-teal border-teal/30',
  amber: 'bg-amber/20 text-amber border-amber/30',
  red: 'bg-red-400/20 text-red-400 border-red-400/30',
};

interface Props {
  /** When true, sidebar is collapsed to icon-only on desktop */
  collapsed?: boolean;
  /** Mobile drawer open/close state */
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function CompliancePortalSidebar({
  collapsed = false,
  mobileOpen = false,
  onMobileClose,
}: Props) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/portal') return pathname === '/portal';
    return pathname?.startsWith(href);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-glass bg-bg/95 backdrop-blur transition-all md:sticky md:top-0 md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${collapsed ? 'md:w-16 lg:w-16' : 'md:w-20 lg:w-64'}`}
      >
        {/* Logo / Brand */}
        <div className="flex h-16 shrink-0 items-center gap-3 border-b border-glass px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-card bg-gradient-to-br from-purple-light to-teal text-sm font-bold text-white shadow-lg">
            E
          </div>
          <div className="hidden min-w-0 lg:block">
            <div className="truncate text-sm font-bold">EHB Compliance Portal</div>
            <div className="text-[10px] text-white/40">Affiliate v3.13</div>
          </div>
        </div>

        {/* Nav groups */}
        <nav className="flex-1 overflow-y-auto py-4">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="mb-5">
              <div className="hidden px-5 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/30 lg:block">
                {group.label}
              </div>
              <ul className="space-y-0.5 px-2">
                {group.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onMobileClose}
                        className={`group relative flex items-center gap-3 rounded-card px-3 py-2 text-sm transition md:justify-center md:px-2 lg:justify-start lg:px-3 ${
                          active
                            ? 'bg-purple-light/15 text-purple-light shadow-sm'
                            : 'text-white/65 hover:bg-card/40 hover:text-white'
                        }`}
                        title={item.label}
                      >
                        <span className="text-base">{item.icon}</span>
                        <span className="min-w-0 flex-1 truncate md:hidden lg:inline">
                          {item.label}
                        </span>
                        {item.badge !== undefined && (
                          <span
                            className={`shrink-0 rounded-pill border px-1.5 py-0.5 text-[9px] font-semibold md:hidden lg:inline-block ${
                              BADGE_COLORS[item.badgeTone || 'purple']
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        {active && (
                          <span className="absolute left-0 top-1/2 hidden h-6 w-0.5 -translate-y-1/2 rounded-r bg-purple-light lg:block" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer — user profile */}
        <div className="border-t border-glass p-3">
          <div className="flex items-center gap-3 rounded-card bg-card/40 p-2.5 md:justify-center md:p-1 lg:justify-start lg:p-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber to-pink-400 text-xs font-bold text-white shadow">
              SJ
            </div>
            <div className="min-w-0 flex-1 md:hidden lg:block">
              <div className="truncate text-xs font-semibold">Sarah Jenkins</div>
              <div className="truncate text-[10px] text-white/50">DMO Manager · R5</div>
            </div>
            <button
              className="text-white/40 hover:text-white md:hidden lg:inline-block"
              aria-label="User menu"
            >
              ⋮
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
