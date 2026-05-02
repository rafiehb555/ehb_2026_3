/**
 * EHB Industries — Phase 1 (16) + Phase 2 (16) + Phase 3 (6) = 38 total.
 * Source: ehb-info/EHB-INDUSTRIES-MAP.md.
 */

export interface IndustryDef {
  code: string;
  name: string;
  slug: string;
  icon: string;
  pillar: 'Education' | 'Health' | 'Business';
  phase: 1 | 2 | 3;
  status: 'live' | 'beta' | 'planned';
  parentDept: string;
  tagline: string;
  gradient: { from: string; to: string };
}

export const INDUSTRIES: IndustryDef[] = [
  // Phase 1 — Live
  { code: 'GSM', name: 'GoSellr Marketplace', slug: 'gosellr', icon: '🛒', pillar: 'Business', phase: 1, status: 'live', parentDept: 'Wallet + Franchise', tagline: 'STL-ranked e-commerce', gradient: { from: '#2BBFA0', to: '#38C878' } },
  { code: 'WMS', name: 'Wellness & Medical Services', slug: 'wms', icon: '🩺', pillar: 'Health', phase: 1, status: 'beta', parentDept: 'PSS + CRB', tagline: 'Doctors, pharmacy, clinics', gradient: { from: '#F05858', to: '#C03030' } },
  { code: 'HPS', name: 'Human Professional Services', slug: 'hps', icon: '🎓', pillar: 'Education', phase: 1, status: 'beta', parentDept: 'CRB + Franchise', tagline: 'Tutors, consultants, coaches', gradient: { from: '#7B6EF6', to: '#A098F8' } },
  { code: 'OBS', name: 'Online Business School', slug: 'obs', icon: '📚', pillar: 'Education', phase: 1, status: 'beta', parentDept: 'Franchise + Affiliate', tagline: 'Courses + certifications', gradient: { from: '#3b82f6', to: '#2563eb' } },
  { code: 'OLS', name: 'Online Legal Services', slug: 'ols', icon: '⚖️', pillar: 'Business', phase: 1, status: 'beta', parentDept: 'PSS + CRB', tagline: 'Lawyers, contracts, notarization', gradient: { from: '#7B6EF6', to: '#5B4EE6' } },
  { code: 'LDS', name: 'Logistics & Delivery', slug: 'lds', icon: '🛵', pillar: 'Business', phase: 1, status: 'live', parentDept: 'Wallet + Franchise', tagline: 'Riders + last-mile delivery', gradient: { from: '#F0A030', to: '#F8B830' } },
  { code: 'AGTS', name: 'Agro-Tech Services', slug: 'agts', icon: '🌾', pillar: 'Business', phase: 1, status: 'planned', parentDept: 'Franchise + DMO', tagline: 'Farmers + bulk supply', gradient: { from: '#1a7020', to: '#38C878' } },
  { code: 'HMS', name: 'Hotel & Hospitality', slug: 'hms', icon: '🏨', pillar: 'Business', phase: 1, status: 'planned', parentDept: 'Wallet + Franchise', tagline: 'Stays, events, bookings', gradient: { from: '#ec4899', to: '#db2777' } },
  { code: 'ITS', name: 'IT & Software Services', slug: 'its', icon: '💻', pillar: 'Business', phase: 1, status: 'planned', parentDept: 'Franchise + CRB', tagline: 'Developers, agencies, projects', gradient: { from: '#0080c8', to: '#30d0ff' } },
  { code: 'SOT', name: 'Sports & Outdoor Tourism', slug: 'sot', icon: '🏕️', pillar: 'Business', phase: 1, status: 'planned', parentDept: 'Franchise + Wallet', tagline: 'Guides, tours, equipment', gradient: { from: '#fbbf24', to: '#f59e0b' } },
  { code: 'JPS', name: 'Job Profile & Skill', slug: 'jps', icon: '📄', pillar: 'Education', phase: 1, status: 'beta', parentDept: 'CRB + AI', tagline: 'AI job matching + exams', gradient: { from: '#ec4899', to: '#db2777' } },
  { code: 'EHB_TUBE', name: 'EHB Tube', slug: 'tube', icon: '🎥', pillar: 'Business', phase: 1, status: 'planned', parentDept: 'Affiliate + DMO', tagline: 'Video creator economy', gradient: { from: '#F05858', to: '#7B6EF6' } },
  // Phase 2
  { code: 'RES', name: 'Real Estate', slug: 'res', icon: '🏠', pillar: 'Business', phase: 2, status: 'planned', parentDept: 'Franchise + PSS', tagline: 'Buy / sell / rent properties', gradient: { from: '#7a4a00', to: '#F0A030' } },
  { code: 'FBS', name: 'Food & Beverage', slug: 'fbs', icon: '🍽️', pillar: 'Business', phase: 2, status: 'planned', parentDept: 'Franchise + PSS', tagline: 'Restaurants, food delivery', gradient: { from: '#F05858', to: '#F0A030' } },
  { code: 'FIN', name: 'Finance & Banking', slug: 'fin', icon: '🏦', pillar: 'Business', phase: 2, status: 'planned', parentDept: 'Wallet + Blockchain', tagline: 'Banking, lending, insurance', gradient: { from: '#1a7020', to: '#38C878' } },
  { code: 'WES', name: 'Wellness & Fitness', slug: 'wes', icon: '💪', pillar: 'Health', phase: 2, status: 'planned', parentDept: 'CRB + Franchise', tagline: 'Gyms, trainers, nutrition', gradient: { from: '#F0A030', to: '#F05858' } },
  // ...truncated for brevity. Add more from EHB-MASTER-PLAN.md as needed.
];

export function getIndustry(slug: string): IndustryDef | null {
  return INDUSTRIES.find((i) => i.slug === slug) || null;
}
