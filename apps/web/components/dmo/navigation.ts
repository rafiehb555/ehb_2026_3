/**
 * DMO sidebar — 19 canonical modules grouped into 4 sections.
 * Source: ehb-info/DMO-DEVELOPMENT-PHASES.md.
 */

export interface DmoNavItem {
  label: string;
  href: string;
  icon: string;
  stub?: boolean;
}

export interface DmoNavGroup {
  label: string;
  items: DmoNavItem[];
}

export const dmoNavigation: DmoNavGroup[] = [
  {
    label: 'Overview',
    items: [{ label: 'Dashboard', href: '/dmo', icon: '🏠' }],
  },
  {
    label: 'Verification',
    items: [
      { label: 'STL Management', href: '/dmo/stl', icon: '🏆' },
      { label: 'PSS Monitoring', href: '/dmo/pss', icon: '🛡️' },
      { label: 'CRB Monitoring', href: '/dmo/crb', icon: '📜' },
      { label: 'Up-Guard', href: '/dmo/up-guard', icon: '👁️' },
    ],
  },
  {
    label: 'Operations',
    items: [
      { label: 'Applications', href: '/dmo/applications', icon: '📝' },
      { label: 'Approvals', href: '/dmo/approvals', icon: '✅' },
      { label: 'Wallet Control', href: '/dmo/wallet-control', icon: '💰' },
      { label: 'Earnings Engine', href: '/dmo/earnings-engine', icon: '📈' },
      { label: 'Refill Management', href: '/dmo/refill-management', icon: '🔄' },
      { label: 'Complaints', href: '/dmo/complaints', icon: '⚠️' },
      { label: 'Riders', href: '/dmo/riders', icon: '🛵' },
      { label: 'Franchise Control', href: '/dmo/franchise', icon: '🌐' },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { label: 'Activity Engine', href: '/dmo/activity-engine', icon: '⚡' },
      { label: 'Task System', href: '/dmo/task-system', icon: '🧩' },
      { label: 'AI Assistant', href: '/dmo/ai-assistant', icon: '🤖' },
      { label: 'Analytics', href: '/dmo/analytics', icon: '📊' },
      { label: 'Blockchain Control', href: '/dmo/blockchain-control', icon: '🔗' },
      { label: 'Notifications', href: '/dmo/notifications', icon: '🔔' },
      { label: 'Settings', href: '/dmo/settings', icon: '⚙️' },
    ],
  },
];
