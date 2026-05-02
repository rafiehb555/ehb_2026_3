/**
 * EHB Home Page — Section Data
 *
 * SOURCE OF TRUTH for home page row content.
 * Spec: ehb-info/15-ui-system/HOME-PAGE-DESIGN.md + SECTION-CATALOG.md
 *
 * AUTO-SAVE PROTOCOL: Any change here MUST update SECTION-CATALOG.md too.
 * See ehb-info/15-ui-system/UIUX-AUTO-SAVE-PROTOCOL.md
 */

// ─────────────────────────────────────────────────────────────────────────────
// 1. AI MODULES (Section 5: EHB Dev AI for you)
// ─────────────────────────────────────────────────────────────────────────────
export interface AiModule {
  key: 'match' | 'detect' | 'generate' | 'analyze' | 'answer';
  label: string;
  title: string;
  example: string;
  pill: string;
  pillTone: 'free' | 'gated' | 'pro';
  from: string;
  to: string;
  textColor: string;
  accentColor: string;
}

export const aiModules: AiModule[] = [
  { key: 'match',    label: 'MATCH',    title: 'Industry & Service',     example: '"Find me a doctor in DHA"',     pill: 'Free 3/day',    pillTone: 'free',  from: '#6F62D6', to: '#3B2F8A', textColor: '#FFFFFF', accentColor: '#CECBF6' },
  { key: 'detect',   label: 'DETECT',   title: 'Fraud & Plagiarism',      example: 'Pre-purchase risk check',       pill: 'L2+ unlocked',  pillTone: 'gated', from: '#C44D8B', to: '#7A1F50', textColor: '#FFFFFF', accentColor: '#F4C0D1' },
  { key: 'generate', label: 'GENERATE', title: 'Listing & Cover Art',     example: 'Auto-write descriptions',       pill: 'L3+ unlocked',  pillTone: 'gated', from: '#4DAB7E', to: '#1F5A3E', textColor: '#FFFFFF', accentColor: '#9FE1CB' },
  { key: 'analyze',  label: 'ANALYZE',  title: 'Daily Brief & Trends',    example: "Today's priorities · 5 bullets",pill: 'Pro feature',   pillTone: 'pro',   from: '#F0B90B', to: '#7A5A04', textColor: '#412402', accentColor: '#FFE9A8' },
  { key: 'answer',   label: 'ANSWER',   title: 'STL Coach & Support',     example: '"Why is my STL not rising?"',   pill: 'Free',          pillTone: 'free',  from: '#185FA5', to: '#0C2E5C', textColor: '#FFFFFF', accentColor: '#B5D4F4' },
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. EARN PATHS (Section 7)
// ─────────────────────────────────────────────────────────────────────────────
export interface EarnPath {
  key: string;
  name: string;
  detail: string;
  iconLetter: string;
  from: string;
  to: string;
  textColor: string;
  pill: string;
  pillFrom: string;
  pillText: string;
}

export const earnPaths: EarnPath[] = [
  { key: 'sell',      name: 'Sell GoSellr',  detail: '85% you keep',   iconLetter: '$', from: '#4DAB7E', to: '#1F5A3E', textColor: '#fff',    pill: 'L1+',  pillFrom: 'rgba(77,171,126,0.2)',  pillText: '#9FE1CB' },
  { key: 'refer',     name: 'Refer & earn',  detail: '5/2/1% deep',    iconLetter: '★', from: '#6F62D6', to: '#3B2F8A', textColor: '#fff',    pill: 'All',  pillFrom: 'rgba(111,98,214,0.2)',  pillText: '#CECBF6' },
  { key: 'stake',     name: 'Stake EHBGC',   detail: '8 – 18% APY',    iconLetter: '%', from: '#F0B90B', to: '#7A5A04', textColor: '#412402', pill: 'L1+',  pillFrom: 'rgba(240,185,11,0.2)',  pillText: '#F0B90B' },
  { key: 'franchise', name: 'Run franchise', detail: '5 – 10% local',  iconLetter: 'F', from: '#185FA5', to: '#0C2E5C', textColor: '#F0B90B', pill: 'L5+',  pillFrom: 'rgba(24,95,165,0.25)',  pillText: '#85B7EB' },
  { key: 'jobs',      name: 'JPS jobs',      detail: 'Verified salary',iconLetter: 'J', from: '#C44D8B', to: '#7A1F50', textColor: '#fff',    pill: 'L1+',  pillFrom: 'rgba(196,77,139,0.2)',  pillText: '#F4C0D1' },
  { key: 'rider',     name: 'Rider deliver', detail: 'PKR 80–200',     iconLetter: 'R', from: '#8B4DC4', to: '#4F1F7A', textColor: '#fff',    pill: 'L2+',  pillFrom: 'rgba(139,77,196,0.2)',  pillText: '#E5C8FF' },
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. CATEGORIES (Section 9)
// ─────────────────────────────────────────────────────────────────────────────
export interface MegaCategory {
  key: string;
  name: string;
  count: number;
  avgL: string;
  from: string;
  to: string;
  textOnSubtitle: string;
}

export const megaCategories: MegaCategory[] = [
  { key: 'health',    name: 'Health',          count: 5, avgL: 'L4', from: '#A32D2D', to: '#501313', textOnSubtitle: '#F0995B' },
  { key: 'education', name: 'Education',       count: 4, avgL: 'L1', from: '#185FA5', to: '#0C2E5C', textOnSubtitle: '#85B7EB' },
  { key: 'business',  name: 'Business',        count: 8, avgL: 'L2', from: '#4DAB7E', to: '#1F5A3E', textOnSubtitle: '#9FE1CB' },
  { key: 'legalfin',  name: 'Legal & Finance', count: 6, avgL: 'L4', from: '#6F62D6', to: '#3B2F8A', textOnSubtitle: '#CECBF6' },
  { key: 'lifestyle', name: 'Lifestyle',       count: 8, avgL: 'L2', from: '#F0B90B', to: '#7A5A04', textOnSubtitle: '#7A5A04' },
  { key: 'media',     name: 'Media & Tech',    count: 6, avgL: 'L3', from: '#C44D8B', to: '#7A1F50', textOnSubtitle: '#F4C0D1' },
];

// ─────────────────────────────────────────────────────────────────────────────
// 4. FRANCHISE TIERS (Section 10)
// ─────────────────────────────────────────────────────────────────────────────
export interface FranchiseTier {
  key: 'country' | 'master' | 'corporate' | 'sub' | 'micro';
  name: string;
  price: string;
  scope: string;
  minStl: string;
  commission: string;
  seatsLeft: number;
  pillFrom: string;
  pillText: string;
}

export const franchiseTiers: FranchiseTier[] = [
  { key: 'country',   name: 'Country PK',          price: '$500K', scope: 'annual $25M GMV', minStl: 'L10', commission: '50%', seatsLeft: 3,   pillFrom: 'rgba(163,45,45,0.25)',  pillText: '#F09595' },
  { key: 'master',    name: 'Master KHI/LHE/ISB',  price: '$100K', scope: 'city-level',      minStl: 'L8',  commission: '30%', seatsLeft: 8,   pillFrom: 'rgba(240,185,11,0.2)',  pillText: '#F0B90B' },
  { key: 'corporate', name: 'Corporate region',    price: '$25K',  scope: 'zone-level',      minStl: 'L7',  commission: '15%', seatsLeft: 25,  pillFrom: 'rgba(77,171,126,0.2)',  pillText: '#9FE1CB' },
  { key: 'sub',       name: 'Sub-franchise',       price: '$5K',   scope: 'district',        minStl: 'L5',  commission: '8%',  seatsLeft: 50,  pillFrom: 'rgba(133,183,235,0.2)', pillText: '#85B7EB' },
  { key: 'micro',     name: 'Micro-franchise',     price: '$500',  scope: 'neighborhood',    minStl: 'L2',  commission: '3%',  seatsLeft: 200, pillFrom: 'rgba(111,98,214,0.2)',  pillText: '#CECBF6' },
];

// ─────────────────────────────────────────────────────────────────────────────
// 5. COUNTRIES (Section 14)
// ─────────────────────────────────────────────────────────────────────────────
export interface CountryEntry {
  code: string;
  name: string;
  status: 'live' | 'q3' | 'q4' | '2027' | '2028';
  iconFrom: string;
  iconTo: string;
  iconText: string;
}

export const countries: CountryEntry[] = [
  { code: 'PK', name: 'Pakistan', status: 'live', iconFrom: '#4DAB7E', iconTo: '#1F5A3E', iconText: '#fff' },
  { code: 'AE', name: 'UAE',      status: 'q3',   iconFrom: '#185FA5', iconTo: '#0C2E5C', iconText: '#fff' },
  { code: 'SA', name: 'Saudi',    status: 'q3',   iconFrom: '#4DAB7E', iconTo: '#1F5A3E', iconText: '#fff' },
  { code: 'TR', name: 'Turkey',   status: 'q4',   iconFrom: '#A32D2D', iconTo: '#501313', iconText: '#fff' },
  { code: 'MY', name: 'Malaysia', status: 'q4',   iconFrom: '#6F62D6', iconTo: '#3B2F8A', iconText: '#fff' },
  { code: 'QA', name: 'Qatar',    status: '2027', iconFrom: '#C44D8B', iconTo: '#7A1F50', iconText: '#fff' },
  { code: 'EG', name: 'Egypt',    status: '2027', iconFrom: '#F0B90B', iconTo: '#7A5A04', iconText: '#412402' },
  { code: 'GB', name: 'UK',       status: '2027', iconFrom: '#185FA5', iconTo: '#0C2E5C', iconText: '#fff' },
  { code: 'US', name: 'USA',      status: '2028', iconFrom: '#185FA5', iconTo: '#0C2E5C', iconText: '#fff' },
  { code: 'CN', name: 'China',    status: '2028', iconFrom: '#A32D2D', iconTo: '#501313', iconText: '#fff' },
];

export const countryStatusMeta: Record<CountryEntry['status'], { label: string; from: string; text: string }> = {
  live: { label: 'Live',  from: 'rgba(77,171,126,0.2)',  text: '#9FE1CB' },
  q3:   { label: 'Q3',    from: 'rgba(240,185,11,0.2)',  text: '#F0B90B' },
  q4:   { label: 'Q4',    from: 'rgba(240,185,11,0.2)',  text: '#F0B90B' },
  '2027':{label: '2027', from: 'rgba(111,98,214,0.2)',  text: '#CECBF6' },
  '2028':{label: '2028', from: 'rgba(163,45,45,0.25)',  text: '#F09595' },
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. STL BOOST PATHS (Section 16)
// ─────────────────────────────────────────────────────────────────────────────
export interface BoostPath {
  key: string;
  title: string;
  detail: string;
  boost: string;
  iconFrom: string;
  iconTo: string;
  iconText: string;
  pillFrom: string;
  pillText: string;
}

export const boostPaths: BoostPath[] = [
  { key: 'crb',  title: 'Pass CRB exam',     detail: '15 min · 70% pass', boost: 'CRB +1', iconFrom: '#4DA8B5', iconTo: '#1E5862', iconText: '#fff',     pillFrom: 'rgba(77,168,181,0.2)', pillText: '#A0DAE2' },
  { key: 'lock', title: 'Lock 250 EHBGC',    detail: '~$10 · 12% APY',    boost: 'PSS +1', iconFrom: '#F0B90B', iconTo: '#7A5A04', iconText: '#412402', pillFrom: 'rgba(240,185,11,0.2)', pillText: '#F0B90B' },
  { key: 'dmo',  title: '30 days clean',     detail: 'Zero complaints',   boost: 'DMO +1', iconFrom: '#4DAB7E', iconTo: '#1F5A3E', iconText: '#fff',     pillFrom: 'rgba(77,171,126,0.2)', pillText: '#9FE1CB' },
];

// ─────────────────────────────────────────────────────────────────────────────
// 7. COLLECTIONS (Section 19)
// ─────────────────────────────────────────────────────────────────────────────
export interface Collection {
  key: string;
  label: string;
  title: string;
  detail: string;
  from: string;
  to: string;
  labelText: string;
  detailText: string;
  titleText: string;
}

export const collections: Collection[] = [
  { key: 'health',    label: 'FAMILY HEALTH',    title: 'Doctor + Lab + Pharmacy', detail: '3 services · 25% bundle →', from: '#185FA5', to: '#0C2E5C', labelText: '#85B7EB',  detailText: '#B5D4F4',  titleText: '#fff' },
  { key: 'business',  label: 'START A BUSINESS', title: 'CA + Lawyer + Web',       detail: '3 services · L4 trust →',   from: '#F0B90B', to: '#7A5A04', labelText: '#7A5A04',  detailText: '#412402',  titleText: '#412402' },
  { key: 'expat',     label: 'EXPAT KIT',        title: 'Visa + Move + Setup',     detail: '5 services · 4 countries →',from: '#6F62D6', to: '#3B2F8A', labelText: '#CECBF6',  detailText: '#CECBF6',  titleText: '#fff' },
  { key: 'fresher',   label: 'FRESHER PACK',     title: 'Resume + Course + Job',   detail: 'JPS bundled · L1 entry →',  from: '#4DAB7E', to: '#1F5A3E', labelText: '#9FE1CB',  detailText: '#9FE1CB',  titleText: '#fff' },
];

// ─────────────────────────────────────────────────────────────────────────────
// 8. FOUNDER PICKS (Section 18)
// ─────────────────────────────────────────────────────────────────────────────
export interface FounderPick {
  title: string;
  detail: string;
  href: string;
}

export const founderPicks: FounderPick[] = [
  { title: 'Try AI Daily Brief',   detail: '5-bullet morning · save 30 min', href: '/dmo/daily-brief' },
  { title: 'Lock 500 EHBGC',       detail: '12% APY · STL +1 instantly',     href: '/wallet/lock' },
];

// ─────────────────────────────────────────────────────────────────────────────
// 9. TRUST-VERIFIED DEALS (Section 8)
// ─────────────────────────────────────────────────────────────────────────────
export interface TrustDeal {
  key: string;
  discount: string;
  service: string;
  priceWas: string;
  priceNow: string;
  verifiedAt: string; // L4, L5, etc.
  pillFrom: string;
  pillText: string;
}

export const trustDeals: TrustDeal[] = [
  { key: 'checkup',  discount: '−40%', service: 'Annual checkup',   priceWas: '5K',   priceNow: '3K',   verifiedAt: 'L4', pillFrom: 'rgba(77,168,181,0.2)',  pillText: '#A0DAE2' },
  { key: 'will',     discount: '−25%', service: 'Will drafting',    priceWas: '8K',   priceNow: '6K',   verifiedAt: 'L5', pillFrom: 'rgba(111,98,214,0.2)',  pillText: '#CECBF6' },
  { key: 'kurta',    discount: '−15%', service: 'Sapphire kurta',   priceWas: '4K',   priceNow: '3.4K', verifiedAt: 'L5', pillFrom: 'rgba(111,98,214,0.2)',  pillText: '#CECBF6' },
  { key: 'gym',      discount: '−30%', service: 'Gym membership',   priceWas: '12K',  priceNow: '8.4K', verifiedAt: 'L4', pillFrom: 'rgba(77,168,181,0.2)',  pillText: '#A0DAE2' },
  { key: 'english',  discount: '−50%', service: 'English course',   priceWas: '6K',   priceNow: '3K',   verifiedAt: 'L3', pillFrom: 'rgba(77,171,126,0.2)',  pillText: '#9FE1CB' },
];

// ─────────────────────────────────────────────────────────────────────────────
// 10. VERIFIED PROS NEAR YOU (Section 11)
// ─────────────────────────────────────────────────────────────────────────────
export interface NearbyPro {
  key: string;
  initials: string;
  name: string;
  sector: string;
  rating: string;
  level: number; // STL
  iconFrom: string;
  iconTo: string;
}

export const nearbyPros: NearbyPro[] = [
  { key: 'khan',    initials: 'DK', name: 'Dr. Khan',    sector: 'Cardio · 4.9★',   rating: '4.9', level: 4, iconFrom: '#4DA8B5', iconTo: '#1E5862' },
  { key: 'saira',   initials: 'SA', name: 'Adv. Saira',  sector: 'Family · 4.8★',   rating: '4.8', level: 5, iconFrom: '#6F62D6', iconTo: '#3B2F8A' },
  { key: 'imran',   initials: 'CA', name: 'CA Imran',    sector: 'Tax · 4.9★',      rating: '4.9', level: 6, iconFrom: '#8B4DC4', iconTo: '#4F1F7A' },
  { key: 'rabia',   initials: 'DR', name: 'Dr. Rabia',   sector: 'Pediatrics · 5★', rating: '5.0', level: 4, iconFrom: '#4DA8B5', iconTo: '#1E5862' },
  { key: 'vetcare', initials: 'VC', name: 'VetCare PK',  sector: 'Pets · 4.7★',     rating: '4.7', level: 3, iconFrom: '#4DAB7E', iconTo: '#1F5A3E' },
  { key: 'smile',   initials: 'SP', name: 'SmilePro',    sector: 'Dental · 4.8★',   rating: '4.8', level: 4, iconFrom: '#C44D8B', iconTo: '#7A1F50' },
];

// ─────────────────────────────────────────────────────────────────────────────
// 11. JPS JOBS (Section 12)
// ─────────────────────────────────────────────────────────────────────────────
export interface JpsJob {
  key: string;
  title: string;
  salary: string;
  employer: string;
  level: number;
  location: string;
}

export const jpsJobs: JpsJob[] = [
  { key: 'react',    title: 'React Developer',   salary: 'PKR 250K', employer: 'NetSol',   level: 7, location: 'Lahore' },
  { key: 'sales',    title: 'Sales Manager',     salary: 'PKR 180K', employer: 'Servis',   level: 5, location: 'Karachi' },
  { key: 'designer', title: 'Designer',          salary: 'PKR 150K', employer: 'Sapphire', level: 5, location: 'Remote' },
  { key: 'support',  title: 'Customer Support',  salary: 'PKR 80K',  employer: 'Bykea',    level: 4, location: 'Karachi' },
];

// ─────────────────────────────────────────────────────────────────────────────
// 12. EHB TUBE VIDEOS (Section 13)
// ─────────────────────────────────────────────────────────────────────────────
export interface TubeVideo {
  key: string;
  title: string;
  creator: string;
  views: string;
  duration: string;
  thumbFrom: string;
  thumbTo: string;
}

export const tubeVideos: TubeVideo[] = [
  { key: 'reach-l5',    title: 'How to reach EHB STL L5', creator: 'Founder Rafi · 24K views', views: '24K', duration: '12:30', thumbFrom: '#185FA5', thumbTo: '#0C2E5C' },
  { key: 'pk-launch',   title: 'Pakistan launch insider',  creator: 'Team EHB · 18K views',     views: '18K', duration: '8:15',  thumbFrom: '#4DAB7E', thumbTo: '#1F5A3E' },
  { key: 'affiliate',   title: 'Earn 50K/mo via affiliate',creator: 'Top earner · 32K views',   views: '32K', duration: '5:42',  thumbFrom: '#F0B90B', thumbTo: '#7A5A04' },
  { key: 'fraud',       title: 'Spotting fraud sellers',   creator: 'DMO officer · 9K views',   views: '9K',  duration: '15:20', thumbFrom: '#A32D2D', thumbTo: '#501313' },
];

// ─────────────────────────────────────────────────────────────────────────────
// 13. NEW SELLERS (Section 15)
// ─────────────────────────────────────────────────────────────────────────────
export interface NewSeller {
  key: string;
  initials: string;
  name: string;
  sector: string;
  newLevel: number;
  iconFrom: string;
  iconTo: string;
  iconText: string;
}

export const newSellers: NewSeller[] = [
  { key: 'fresh',  initials: 'FH', name: 'FreshHerbs',  sector: 'Organic produce',  newLevel: 3, iconFrom: '#4DAB7E', iconTo: '#1F5A3E', iconText: '#fff' },
  { key: 'pink',   initials: 'PB', name: 'PinkBakery',  sector: 'Custom cakes',     newLevel: 2, iconFrom: '#C44D8B', iconTo: '#7A1F50', iconText: '#fff' },
  { key: 'fix',    initials: 'QF', name: 'QuickFix',    sector: 'Home repair',      newLevel: 3, iconFrom: '#4DA8B5', iconTo: '#1E5862', iconText: '#fff' },
  { key: 'edu',    initials: 'EE', name: 'EduExpert',   sector: 'O/A level tutors', newLevel: 4, iconFrom: '#F0B90B', iconTo: '#7A5A04', iconText: '#412402' },
];

// ─────────────────────────────────────────────────────────────────────────────
// 9. FEATURED INDUSTRIES (Section 6)
// ─────────────────────────────────────────────────────────────────────────────
export interface FeaturedIndustry {
  code: string;
  name: string;
  detail: string;
  pill: string;
  pillFrom: string;
  pillText: string;
  coverFrom: string;
  coverTo: string;
  iconType: 'health' | 'legal' | 'cart' | 'cap' | 'bike' | 'bank' | 'ai' | 'franchise';
}

export const featuredIndustries: FeaturedIndustry[] = [
  { code: 'WMS',  name: 'WMS Healthcare',     detail: '1,240 doctors',   pill: 'L4 · 2.0×',  pillFrom: 'rgba(77,168,181,0.2)', pillText: '#A0DAE2', coverFrom: '#A32D2D', coverTo: '#501313', iconType: 'health' },
  { code: 'OLS',  name: 'OLS Legal',          detail: '340 lawyers',     pill: 'L3 · 2.0×',  pillFrom: 'rgba(111,98,214,0.2)', pillText: '#CECBF6', coverFrom: '#6F62D6', coverTo: '#3B2F8A', iconType: 'legal' },
  { code: 'GSM',  name: 'GSM Marketplace',    detail: '8,420 sellers',   pill: 'Live · L1',  pillFrom: 'rgba(77,171,126,0.2)', pillText: '#9FE1CB', coverFrom: '#F0B90B', coverTo: '#7A5A04', iconType: 'cart' },
  { code: 'HPS',  name: 'HPS Skills',         detail: 'Courses · Certs', pill: 'Beta · L1',  pillFrom: 'rgba(77,171,126,0.2)', pillText: '#9FE1CB', coverFrom: '#185FA5', coverTo: '#0C2E5C', iconType: 'cap' },
  { code: 'LDS',  name: 'LDS Delivery',       detail: 'Same-day · Bulk', pill: 'Live · L1',  pillFrom: 'rgba(77,171,126,0.2)', pillText: '#9FE1CB', coverFrom: '#4DAB7E', coverTo: '#1F5A3E', iconType: 'bike' },
  { code: 'FIN',  name: 'FIN Finance',        detail: 'Pay · Invest',    pill: 'L4 · 2.0×',  pillFrom: 'rgba(77,168,181,0.2)', pillText: '#A0DAE2', coverFrom: '#F0B90B', coverTo: '#7A5A04', iconType: 'bank' },
  { code: 'AI',   name: 'EHB Dev AI',         detail: '5 modules',       pill: '2/3 free',   pillFrom: 'rgba(111,98,214,0.2)', pillText: '#CECBF6', coverFrom: '#6F62D6', coverTo: '#3B2F8A', iconType: 'ai' },
  { code: 'FRX',  name: 'Franchise Network',  detail: '5-tier',          pill: '50 open',    pillFrom: 'rgba(77,171,126,0.2)', pillText: '#9FE1CB', coverFrom: '#1D9E75', coverTo: '#04342C', iconType: 'franchise' },
];
