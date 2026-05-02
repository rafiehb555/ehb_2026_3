/**
 * EHB STL Level Canonical Data — L1 FREE → L10 SUPREME.
 * Source: ehb-info/departments/STL.md + EHB-MASTER-PLAN.md §7.
 * Every level has: icon, gradient, score range, EHBGC lock, authority, eligibility.
 */

export interface StlLevelDef {
  level: number;
  name: string;
  icon: string; // emoji
  from: string; // gradient start
  to: string; // gradient end
  scoreMin: number;
  scoreMax: number;
  ehbgcLock: number;
  authority: string;
  rules: string[];
  eligibility: string[];
  userTypes: string[];
  upgradeTo?: string;
  downgradeTriggers: string[];
  tier: 'Entry' | 'Foundation' | 'Growth' | 'Elite' | 'Supreme';
}

export const STL_LEVELS: StlLevelDef[] = [
  {
    level: 1,
    name: 'FREE',
    icon: '🆓',
    from: '#64748b',
    to: '#475569',
    scoreMin: 0,
    scoreMax: 9,
    ehbgcLock: 0,
    authority: 'Browse-only — no public listings, no buying',
    rules: [
      'Default level for unverified users',
      'Must complete PSS KYC to progress',
      'Cannot list services or products',
      'Marked with "Unverified" badge across platform',
    ],
    eligibility: ['Anyone on signup'],
    userTypes: ['Visitor', 'Pending KYC'],
    upgradeTo: 'Complete PSS verification → L2',
    downgradeTriggers: ['Fraud detected → L1 freeze'],
    tier: 'Entry',
  },
  {
    level: 2,
    name: 'BASIC',
    icon: '🔰',
    from: '#22c55e',
    to: '#16a34a',
    scoreMin: 10,
    scoreMax: 19,
    ehbgcLock: 20,
    authority: 'Read-only, limited browsing',
    rules: [
      'PSS L1+ verified (basic KYC)',
      'Can view products but not purchase',
      'Cannot file complaints',
      'No earnings eligibility',
    ],
    eligibility: ['PSS L1 verified'],
    userTypes: ['Buyer (browse only)'],
    upgradeTo: 'Score ≥ 20 → L3',
    downgradeTriggers: ['30 days inactivity', 'Policy violation'],
    tier: 'Entry',
  },
  {
    level: 3,
    name: 'NORMAL',
    icon: '🛒',
    from: '#06b6d4',
    to: '#0891b2',
    scoreMin: 20,
    scoreMax: 29,
    ehbgcLock: 40,
    authority: 'Buying enabled, limited selling',
    rules: [
      'Can place orders with escrow protection',
      'Can file complaints',
      'Limited to 3 complaint filings/month',
      'Cannot list products (need L4+)',
    ],
    eligibility: ['PSS L3 + any DMO activity'],
    userTypes: ['Buyer', 'Rider (min)', 'Freelancer (min)'],
    upgradeTo: 'Complete orders + reviews → L4',
    downgradeTriggers: ['3 complaints in 3 weeks → -2 levels'],
    tier: 'Foundation',
  },
  {
    level: 4,
    name: 'STANDARD',
    icon: '🏪',
    from: '#3b82f6',
    to: '#2563eb',
    scoreMin: 30,
    scoreMax: 39,
    ehbgcLock: 80,
    authority: 'Service listing + reviews',
    rules: [
      'Can list up to 10 products/services',
      'Can post reviews (shown with tier badge)',
      'Eligible for basic franchise (Sub L1–L2)',
      'AI services accessible (basic gate)',
    ],
    eligibility: ['PSS L3 + CRB L2 + DMO L3'],
    userTypes: ['Seller (basic)', 'Service Provider', 'Inspector (min)'],
    upgradeTo: 'Raise CRB via exams + consistent activity → L5',
    downgradeTriggers: ['Low on-time delivery <80%', 'Rating below 3.5'],
    tier: 'Foundation',
  },
  {
    level: 5,
    name: 'ADVANCED',
    icon: '⭐',
    from: '#8b5cf6',
    to: '#7c3aed',
    scoreMin: 40,
    scoreMax: 49,
    ehbgcLock: 200,
    authority: 'Full seller tools (PSS source cap)',
    rules: [
      'Unlimited basic listings',
      'Access to AI Lawyer + AI Diagnosis',
      'Eligible for Sub L3–L5 franchise',
      'PSS SOURCE CAP — PSS alone cannot go higher',
      'Must complete CRB exams to break L5 ceiling',
    ],
    eligibility: ['PSS L5 + CRB L4 + DMO L4'],
    userTypes: ['Seller (advanced)', 'Employer (basic)', 'Rider (full)'],
    upgradeTo: 'CRB exam pass → L6',
    downgradeTriggers: ['Fraud signal', 'Refill expired'],
    tier: 'Growth',
  },
  {
    level: 6,
    name: 'HIGH',
    icon: '🚀',
    from: '#f59e0b',
    to: '#d97706',
    scoreMin: 50,
    scoreMax: 59,
    ehbgcLock: 400,
    authority: '50+ listings, multi-service',
    rules: [
      '50+ product/service listings',
      'Access to all 7 AI services',
      'Eligible for Master Franchise application',
      'Can mentor lower-tier sellers',
      'Priority in search ranking',
    ],
    eligibility: ['PSS L5 + CRB L5 + DMO L6'],
    userTypes: ['Seller (multi-service)', 'Senior Employer', 'Senior Rider'],
    upgradeTo: 'Sustained 30-day performance → L7',
    downgradeTriggers: ['Complaints >3%', 'Inactivity >45 days'],
    tier: 'Growth',
  },
  {
    level: 7,
    name: 'PRO',
    icon: '💎',
    from: '#ef4444',
    to: '#dc2626',
    scoreMin: 60,
    scoreMax: 69,
    ehbgcLock: 800,
    authority: '100+ listings, franchise eligible',
    rules: [
      '100+ active listings allowed',
      'Can own Sub L6–L10 franchise',
      'Priority customer support',
      'Reduced platform fees (1.25% vs 2%)',
      'Can onboard team accounts',
    ],
    eligibility: ['PSS L5 + CRB L7 + DMO L7'],
    userTypes: ['Pro Seller', 'Franchise Owner', 'Senior Inspector'],
    upgradeTo: 'Franchise activation or governance → L8',
    downgradeTriggers: ['Franchise KPI red zone', 'Complaint tier 5+'],
    tier: 'Elite',
  },
  {
    level: 8,
    name: 'VIP',
    icon: '👑',
    from: '#ec4899',
    to: '#db2777',
    scoreMin: 70,
    scoreMax: 79,
    ehbgcLock: 2000,
    authority: '200+ listings, team accounts (Franchise SOURCE CAP)',
    rules: [
      '200+ listings, multi-user team',
      'Franchise Master / Corporate eligibility',
      'FRANCHISE SOURCE CAP — franchise alone caps at L8',
      'Reduced platform fees (1%)',
      'Can vote on regional policy proposals',
    ],
    eligibility: ['PSS L5 + CRB L8 + DMO L8 OR franchise upgrade'],
    userTypes: ['VIP Seller', 'Master/Corporate Franchisee', 'Board Advisor'],
    upgradeTo: 'CRB exam L9 + DMO governance vote → L9',
    downgradeTriggers: ['Board review flag', 'Regional dispute loss'],
    tier: 'Elite',
  },
  {
    level: 9,
    name: 'ELITE',
    icon: '🏆',
    from: '#f97316',
    to: '#ea580c',
    scoreMin: 80,
    scoreMax: 89,
    ehbgcLock: 5000,
    authority: '500+ listings, bulk ops (CRB SOURCE CAP)',
    rules: [
      '500+ listings, bulk operations',
      'Country Franchise eligible',
      'CRB SOURCE CAP — CRB alone caps at L9',
      'Zero platform fees on select categories',
      'Voice in national policy & STL calibration',
    ],
    eligibility: ['PSS L5 + CRB L9 + DMO L9'],
    userTypes: ['Country Franchise Owner', 'Governance Voter', 'Elite Inspector'],
    upgradeTo: 'DMO Board approval (founder sign-off) → L10',
    downgradeTriggers: ['Board revocation', 'L10 denies upgrade'],
    tier: 'Supreme',
  },
  {
    level: 10,
    name: 'SUPREME',
    icon: '💠',
    from: '#fbbf24',
    to: '#f59e0b',
    scoreMin: 90,
    scoreMax: 100,
    ehbgcLock: 10000,
    authority: 'Unlimited, policy voice, governance (DMO SOURCE CAP)',
    rules: [
      'Unlimited listings, team size, operations',
      'Founder-level policy override within jurisdiction',
      'DMO SOURCE CAP — reached only via DMO board approval',
      'Zero platform fees everywhere',
      'Can ban/freeze any user below L9',
      'Immutable STL — cannot be demoted by system',
    ],
    eligibility: ['Founder-only sign-off from DMO board'],
    userTypes: ['Super Admin', 'DMO Director', 'Founder'],
    upgradeTo: 'Highest level — no further promotion',
    downgradeTriggers: ['DMO board unanimous vote only'],
    tier: 'Supreme',
  },
];

/** Lookup by level. */
export function getLevelDef(level: number): StlLevelDef {
  const l = Math.max(1, Math.min(10, Math.round(level)));
  return STL_LEVELS[l - 1];
}

/** Progress toward next level as 0–1. */
export function progressToNext(score: number): { current: StlLevelDef; next?: StlLevelDef; pct: number } {
  const current = STL_LEVELS.find((l) => score >= l.scoreMin && score <= l.scoreMax) || STL_LEVELS[0];
  const next = STL_LEVELS[current.level]; // level indices 0-9, level is 1-10 so STL_LEVELS[level] = next
  if (!next) return { current, pct: 100 };
  const span = next.scoreMin - current.scoreMin || 1;
  const within = score - current.scoreMin;
  return { current, next, pct: Math.max(0, Math.min(100, (within / span) * 100)) };
}

/** Source caps per spec. */
export const SOURCE_CAPS = {
  PSS: { cap: 5, name: 'ADVANCED', desc: 'PSS alone maxes at L5' },
  Franchise: { cap: 8, name: 'VIP', desc: 'Franchise alone caps at L8' },
  CRB: { cap: 9, name: 'ELITE', desc: 'CRB alone caps at L9' },
  DMO: { cap: 10, name: 'SUPREME', desc: 'Only DMO board approval reaches L10' },
} as const;

/** Formula constants. */
export const STL_FORMULA = {
  pssWeight: 40,
  crbWeight: 40,
  dmoWeight: 40,
  divisor: 1.2,
  description: 'PSS × 40/10 + CRB × 40/10 + DMO × 40/10, then MIN(sum/1.2, lowest×10+10)',
};
