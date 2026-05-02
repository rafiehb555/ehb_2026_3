'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dmoNavigation } from './navigation';

interface Props {
  onNavigate?: () => void; // close mobile drawer when a link is tapped
}

/**
 * Shared sidebar content — used by both desktop static sidebar
 * and mobile drawer. No outer wrapper, just the nav block.
 */
export function DmoSidebarContent({ onNavigate }: Props) {
  const pathname = usePathname();
  return (
    <>
      <Link
        href="/"
        onClick={onNavigate}
        className="flex items-center gap-2 px-2 py-3"
      >
        <div className="h-9 w-9 rounded-card bg-gradient-to-br from-[#7B6EF6] to-[#2BBFA0] text-center text-base font-bold leading-9 text-white shadow-lg">
          E
        </div>
        <div>
          <div className="text-sm font-bold">EHB DMO</div>
          <div className="text-[10px] uppercase tracking-widest text-white/40">
            Governance Brain
          </div>
        </div>
      </Link>

      <nav className="mt-4 space-y-5">
        {dmoNavigation.map((group) => (
          <div key={group.label}>
            <div className="mb-2 px-2 text-[10px] uppercase tracking-widest text-white/40">
              {group.label}
            </div>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const active =
                  pathname === item.href || pathname?.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={`flex min-h-[40px] items-center justify-between rounded-chip px-2 py-2 text-sm transition ${
                        active
                          ? 'bg-gradient-to-r from-purple/30 to-purple/10 text-white'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base leading-none">{item.icon}</span>
                        <span>{item.label}</span>
                      </span>
                      {item.stub ? (
                        <span className="rounded-chip border border-white/10 bg-white/5 px-1.5 text-[9px] uppercase text-white/40">
                          soon
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </>
  );
}
