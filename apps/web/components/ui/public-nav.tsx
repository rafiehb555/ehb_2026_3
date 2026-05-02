'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n, LangToggle } from '@/lib/i18n-context';

export function PublicNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  const NAV = [
    { label: t('nav.how'), href: '/how-it-works', icon: '❓' },
    { label: 'My STL', href: '/stl', icon: '⭐' },
    { label: t('nav.gosellr'), href: '/gosellr', icon: '🛒' },
    { label: t('nav.industries'), href: '/industries', icon: '🌍' },
    { label: t('nav.franchise'), href: '/franchise', icon: '🌐' },
    { label: t('nav.ai'), href: '/ai-marketplace', icon: '🤖' },
    { label: t('nav.affiliate'), href: '/affiliate', icon: '🤝' },
    { label: 'Wallet', href: '/wallet', icon: '💰' },
    { label: 'KYC', href: '/kyc', icon: '🛡️' },
    { label: t('nav.concepts'), href: '/concepts', icon: '📖' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-glass bg-[#0c0e1a]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-card bg-gradient-to-br from-[#7B6EF6] to-[#2BBFA0] text-center text-sm font-bold leading-8 text-white shadow">
            E
          </div>
          <div className="font-bold">EHB</div>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-chip px-3 py-1.5 text-xs font-medium transition ${
                  active
                    ? 'bg-gradient-to-r from-purple/30 to-purple/10 text-white'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <LangToggle />
          <Link
            href="/login"
            className="hidden rounded-chip border border-glass bg-card/60 px-3 py-1.5 text-xs hover:border-purple-light sm:inline-block"
          >
            {t('nav.login')}
          </Link>
          <Link
            href="/register"
            className="rounded-chip bg-gradient-to-r from-[#7B6EF6] to-[#A098F8] px-3 py-1.5 text-xs font-semibold text-white shadow"
          >
            {t('nav.start')}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="flex h-8 w-8 items-center justify-center rounded-card border border-glass bg-nested lg:hidden"
            aria-label="Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-glass bg-card/90 lg:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-chip px-3 py-2.5 text-sm text-white/80 hover:bg-white/5"
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
