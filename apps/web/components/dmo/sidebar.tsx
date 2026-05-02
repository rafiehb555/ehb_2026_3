'use client';

import { DmoSidebarContent } from './sidebar-content';

/** Desktop-only static sidebar (lg+). Mobile uses MobileNav drawer. */
export function DmoSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-glass bg-card/40 p-4 lg:block">
      <DmoSidebarContent />
    </aside>
  );
}
