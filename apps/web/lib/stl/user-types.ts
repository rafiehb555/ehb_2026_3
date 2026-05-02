/**
 * EHB User Type Definitions — STL source matrix per type.
 * Source: ehb-info/departments/PSS.md + DMO.md + Franchise.md + Industries.md.
 *
 * Every user type has:
 *  - Required minimum PSS / CRB / STL to operate
 *  - Max STL reachable from each source
 *  - Typical realistic level for active users
 *  - Role-specific benefits + rules
 */

export type UserTypeId =
  | 'buyer'
  | 'seller'
  | 'service_provider'
  | 'rider'
  | 'inspector'
  | 'franchisee'
  | 'employer'
  | 'job_seeker'
  | 'production_company'
  | 'admin';

export interface UserTypeDef {
  id: UserTypeId;
  name: string;
  icon: string;
  gradient: { from: string; to: string };
  tagline: string;
  description: string;
  /** Required minimum levels to operate as this user type */
  requires: {
    pss: number;
    crb: number;
    stl: number;
  };
  /** Max STL reachable from each source alone */
  maxFrom: {
    pss: number; // usually 5 (PSS cap)
    crb: number;
    dmo: number;
    franchise: number;
  };
  /** Realistic typical STL for an active user of this type */
  typicalStl: number;
  /** What they can do at each STL tier */
  benefits: string[];
  /** Role-specific rules */
  rules: string[];
  /** Key sources that matter most for this type (ordered by weight) */
  primarySources: Array<'PSS' | 'CRB' | 'DMO' | 'Franchise'>;
}

export const USER_TYPES: UserTypeDef[] = [
  {
    id: 'buyer',
    name: 'Buyer',
    icon: '🛒',
    gradient: { from: '#06b6d4', to: '#0891b2' },
    tagline: 'Purchase with escrow protection',
    description:
      'Everyday shopper on GoSellr. STL reflects buying history, review quality, and complaint record. Low STL limits access to premium sellers.',
    requires: { pss: 1, crb: 0, stl: 1 },
    maxFrom: { pss: 5, crb: 0, dmo: 10, franchise: 0 },
    typicalStl: 4,
    benefits: [
      'L2+: Place orders with escrow',
      'L3+: File complaints (max 3/mo)',
      'L4+: Post verified reviews with tier badge',
      'L5+: Access premium sellers + priority support',
      'L6+: Exclusive drops + higher refund SLA',
      'L7+: Ambassador status — earn from referrals',
    ],
    rules: [
      'PSS L1+ mandatory to purchase',
      'CRB not required (no listings)',
      '3+ complaints / 3 weeks = STL −2',
      'Rating < 3 from sellers blocks promotion',
    ],
    primarySources: ['PSS', 'DMO'],
  },
  {
    id: 'seller',
    name: 'Seller',
    icon: '🏪',
    gradient: { from: '#8b5cf6', to: '#7c3aed' },
    tagline: 'List products, earn commission',
    description:
      'GoSellr merchant. Needs PSS for identity, CRB for product category expertise (optional for basic goods), DMO for sustained performance. Higher STL = better ranking + lower fees.',
    requires: { pss: 3, crb: 0, stl: 4 },
    maxFrom: { pss: 5, crb: 9, dmo: 10, franchise: 8 },
    typicalStl: 6,
    benefits: [
      'L4+: List up to 10 products',
      'L5+: Unlimited basic listings + AI Business Advisor',
      'L6+: 50+ listings, multi-service',
      'L7+: 100+ listings, 1.25% fee (vs 2%)',
      'L8+: 200+ listings, team accounts, 1% fee',
      'L9+: 500+ listings, zero fees on select categories',
    ],
    rules: [
      'PSS L3+ to list, L4+ for service listings',
      'CRB required for regulated categories (medical, legal, food)',
      'Low on-time delivery (<80%) blocks promotion',
      'Fraud flag = immediate L1 freeze',
    ],
    primarySources: ['PSS', 'CRB', 'DMO'],
  },
  {
    id: 'service_provider',
    name: 'Service Provider',
    icon: '🛠️',
    gradient: { from: '#2BBFA0', to: '#38C878' },
    tagline: 'Deliver services (OLS, WMS, HPS)',
    description:
      'Lawyer, doctor, teacher, consultant. CRB certification is critical — exams + practical validation anchor trust. STL = visibility to clients.',
    requires: { pss: 4, crb: 5, stl: 5 },
    maxFrom: { pss: 5, crb: 9, dmo: 10, franchise: 8 },
    typicalStl: 7,
    benefits: [
      'L5+: Full service listing + AI Lawyer/Diagnosis access',
      'L6+: Featured in search + reduced case fees',
      'L7+: Priority client matching + AI consult credits',
      'L8+: Expert tier — premium rate card unlocked',
      'L9+: Thought-leader status, speaking engagements',
    ],
    rules: [
      'CRB professional exam required (bar/medical/teaching)',
      '6-month refill mandatory — missed = demotion watch',
      'Malpractice complaint at T5+ = STL −2 + review',
      'Sector regulator flag = platform suspension',
    ],
    primarySources: ['CRB', 'PSS', 'DMO'],
  },
  {
    id: 'rider',
    name: 'Rider',
    icon: '🛵',
    gradient: { from: '#F0A030', to: '#F8B830' },
    tagline: 'Last-mile delivery',
    description:
      'Motorbike / car / van delivery partner. Assignment scores by rating × STL × zone × active-orders. 10% of every order value settles to rider.',
    requires: { pss: 3, crb: 2, stl: 3 },
    maxFrom: { pss: 5, crb: 8, dmo: 10, franchise: 0 },
    typicalStl: 5,
    benefits: [
      'L3+: Eligible for assignments',
      'L4+: Priority in same-zone queue',
      'L5+: Bonus $2/delivery for consistency',
      'L6+: Senior rider — mentor new riders',
      'L7+: Team lead eligibility (5+ rider team)',
      'L8+: Regional rider supervisor',
    ],
    rules: [
      'PSS L3+ + vehicle CRB verification',
      'Rating < 4.0 blocks promotion',
      'Late deliveries > 15% = warning',
      'No-show 3×/month = suspension',
    ],
    primarySources: ['PSS', 'CRB', 'DMO'],
  },
  {
    id: 'inspector',
    name: 'Inspector',
    icon: '🔎',
    gradient: { from: '#F05858', to: '#C03030' },
    tagline: 'CRB physical audits + site verification',
    description:
      'Field auditor for CRB. Visits premises, verifies claims, submits on-chain reports. High STL required — cannot delegate trust.',
    requires: { pss: 4, crb: 5, stl: 5 },
    maxFrom: { pss: 5, crb: 9, dmo: 10, franchise: 0 },
    typicalStl: 7,
    benefits: [
      'L5+: Eligible for field inspection assignments',
      'L6+: Base 20K PKR/month + 300-800/inspection',
      'L7+: Premium audit tier (larger premises)',
      'L8+: Regional inspector supervisor',
      'L9+: Appeal arbitration panel member',
    ],
    rules: [
      'PSS L4+ mandatory (background check)',
      'CRB inspector exam required (annual)',
      'False report = L1 freeze + legal action',
      'Bribery flag = permanent ban',
    ],
    primarySources: ['CRB', 'PSS', 'DMO'],
  },
  {
    id: 'franchisee',
    name: 'Franchisee',
    icon: '🌐',
    gradient: { from: '#7B6EF6', to: '#A098F8]' as any },
    tagline: 'Own a Sub / Master / Corporate franchise',
    description:
      'Territorial operator. Franchise source gives direct STL boost — L8 VIP cap from franchise alone. Earns from network 40/25/20/15 split.',
    requires: { pss: 5, crb: 0, stl: 6 },
    maxFrom: { pss: 5, crb: 9, dmo: 10, franchise: 8 },
    typicalStl: 8,
    benefits: [
      'L6+: Sub franchise L1–L3 eligible ($5K–$12K)',
      'L7+: Sub L4–L10 + Master Franchise eligible',
      'L8+: Corporate Franchise + Regional authority',
      'L9+: Country Franchise (entire country rights)',
      'L10+: Founder-level policy voice',
    ],
    rules: [
      'PSS L5+ to activate',
      'EHBGC lock = USD paid (1:1 ratio)',
      'KPI red zone = termination warning',
      'Sub cap: 25 per Master, Master cap: 25 per Corporate',
    ],
    primarySources: ['Franchise', 'PSS', 'DMO'],
  },
  {
    id: 'employer',
    name: 'Employer',
    icon: '🧑‍💼',
    gradient: { from: '#3b82f6', to: '#2563eb' },
    tagline: 'Hire through JPS',
    description:
      'Companies and SMEs posting jobs. High STL attracts better candidates. STL reflects past hiring fairness, contract honor, salary timeliness.',
    requires: { pss: 2, crb: 0, stl: 3 },
    maxFrom: { pss: 5, crb: 9, dmo: 10, franchise: 8 },
    typicalStl: 6,
    benefits: [
      'L3+: Post basic jobs',
      'L5+: AI Resume Builder credits for candidates',
      'L6+: Promoted listings + priority shortlisting',
      'L7+: Bulk hiring (10+ positions) discount',
      'L8+: Employer of the Year eligibility',
    ],
    rules: [
      'PSS L2+ for basic posting, L3+ recommended',
      'Salary delay > 30 days = STL −1 + warning',
      'Contract violation = STL −2 + review',
      'Fake job posting = L1 freeze',
    ],
    primarySources: ['PSS', 'DMO'],
  },
  {
    id: 'job_seeker',
    name: 'Job Seeker',
    icon: '📄',
    gradient: { from: '#ec4899', to: '#db2777' },
    tagline: 'Apply through JPS',
    description:
      'Candidates in JPS. CRB exams validate skills, PSS validates identity, DMO tracks interview attendance + contract honor.',
    requires: { pss: 1, crb: 0, stl: 1 },
    maxFrom: { pss: 5, crb: 9, dmo: 10, franchise: 0 },
    typicalStl: 5,
    benefits: [
      'L1+: Browse jobs, limited apply (3/week)',
      'L3+: AI Resume Builder access',
      'L5+: Priority shortlisting + verified badge',
      'L7+: Premium job access (L7+ salary tier)',
      'L8+: Invitation-only executive roles',
    ],
    rules: [
      'PSS L1 can browse, L3+ for priority',
      'CRB exam pass = shown first to employers',
      'No-show interview 3× = STL −1',
      'Early termination penalty: STL −2 + contract fee',
    ],
    primarySources: ['CRB', 'PSS', 'DMO'],
  },
  {
    id: 'production_company',
    name: 'Production Company',
    icon: '🏭',
    gradient: { from: '#fbbf24', to: '#f59e0b' },
    tagline: 'Manufacture / wholesale at scale',
    description:
      'Bulk supplier with factory-level verification. Needs both company STL + owner STL — MIN-chain applies.',
    requires: { pss: 8, crb: 7, stl: 8 },
    maxFrom: { pss: 5, crb: 9, dmo: 10, franchise: 8 },
    typicalStl: 8,
    benefits: [
      'L8+: Bulk supplier listing',
      'L9+: Featured in B2B wholesale (AGTS, MFS)',
      'L10+: Preferred manufacturer (platform-wide)',
    ],
    rules: [
      'KYB verification mandatory (PSS L8+ for owner)',
      'Factory inspection (CRB L7+)',
      'Product recall = STL −3 + platform review',
      'Quality failure rate > 2% = suspension',
    ],
    primarySources: ['PSS', 'CRB', 'DMO'],
  },
  {
    id: 'admin',
    name: 'Admin (DMO)',
    icon: '🏛️',
    gradient: { from: '#f97316', to: '#ea580c' },
    tagline: 'Internal EHB governance staff',
    description:
      'DMO employees — not a public user type. Staff PSS L8+ + mandatory 2FA. 7 internal roles (SUPER_ADMIN, DMO_DIRECTOR, DMO_MANAGER, etc.).',
    requires: { pss: 8, crb: 0, stl: 8 },
    maxFrom: { pss: 5, crb: 9, dmo: 10, franchise: 8 },
    typicalStl: 9,
    benefits: [
      'DMO dashboard full access',
      'Approve/reject franchise applications',
      'Resolve complaints (tier 5+)',
      'Manual STL adjustments (L10 only)',
      'Policy override within jurisdiction',
    ],
    rules: [
      'PSS L8+ + 2FA mandatory',
      'Background check required',
      'All actions logged to immutable audit',
      'Cannot hold customer-facing user role simultaneously',
    ],
    primarySources: ['PSS', 'DMO'],
  },
];

export function getUserType(id: UserTypeId): UserTypeDef {
  return USER_TYPES.find((u) => u.id === id) || USER_TYPES[0];
}
