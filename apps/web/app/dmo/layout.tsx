import type { ReactNode } from 'react';
import { DmoThemeProvider } from '@/components/dmo/theme-provider';
import { DmoSidebar } from '@/components/dmo/sidebar';
import { MobileNav } from '@/components/dmo/mobile-nav';

export default function DmoLayout({ children }: { children: ReactNode }) {
  return (
    <DmoThemeProvider>
      <MobileNav title="EHB DMO" subtitle="Decentralized Management Office" />
      <div className="flex min-h-screen">
        <DmoSidebar />
        <div className="flex-1 overflow-x-hidden">{children}</div>
      </div>
    </DmoThemeProvider>
  );
}
