'use client';

import { useState, ReactNode } from 'react';
import { CompliancePortalSidebar } from './sidebar';
import { CompliancePortalTopBar } from './topbar';

/**
 * EHB Compliance Portal — Layout wrapper
 *
 * Wraps page content with sidebar nav (left) + top bar + main area.
 * Handles mobile drawer toggle.
 *
 * Usage in any /portal/* page:
 *   <CompliancePortalLayout title="Campaigns" breadcrumb={['Affiliate', 'Campaigns']}>
 *     {pageContent}
 *   </CompliancePortalLayout>
 */

interface Props {
  children: ReactNode;
  title?: string;
  breadcrumb?: string[];
}

export function CompliancePortalLayout({ children, title, breadcrumb }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg">
      <div className="flex">
        <CompliancePortalSidebar
          mobileOpen={mobileMenuOpen}
          onMobileClose={() => setMobileMenuOpen(false)}
        />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <CompliancePortalTopBar
            title={title}
            breadcrumb={breadcrumb}
            onMenuClick={() => setMobileMenuOpen(true)}
          />

          <main className="flex-1 px-4 py-5 sm:px-6 sm:py-6">{children}</main>

          <footer className="border-t border-glass px-6 py-3 text-[10px] text-white/40">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>© 2026 EHB Compliance Portal · All rights reserved</div>
              <div className="flex gap-3">
                <span>v3.12</span>
                <span>·</span>
                <a href="/affiliate/help" className="hover:text-white/70">
                  Help &amp; Legal
                </a>
                <span>·</span>
                <a href="mailto:support@ehb.com" className="hover:text-white/70">
                  Support
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
