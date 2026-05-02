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
  { code: 'HMS', name: 'Hotel Management Services', slug: 'hms', icon: '🏨', pillar: 'Business', phase: 1, status: 'planned', parentDept: 'Wallet + Franchise', tagline: 'Stays, hospitality, events, bookings', gradient: { from: '#ec4899', to: '#db2777' } },
  { code: 'ITS', name: 'Information Technology Services', slug: 'its', icon: '💻', pillar: 'Business', phase: 1, status: 'planned', parentDept: 'Franchise + CRB', tagline: 'Web/app/AI dev + cloud + cybersec + IoT + automation', gradient: { from: '#0080c8', to: '#30d0ff' } },
  // SOT (Services of Technology) merged into ITS on 2026-04-30. Slug 'sot' now redirects to 'its'.
  { code: 'JPS', name: 'Job Profile & Skill', slug: 'jps', icon: '📄', pillar: 'Education', phase: 1, status: 'beta', parentDept: 'CRB + AI', tagline: 'AI job matching + exams', gradient: { from: '#ec4899', to: '#db2777' } },
  { code: 'EHB_TUBE', name: 'EHB Tube', slug: 'tube', icon: '🎥', pillar: 'Business', phase: 1, status: 'planned', parentDept: 'Affiliate + DMO', tagline: 'Video creator economy', gradient: { from: '#F05858', to: '#7B6EF6' } },
  // Phase 2
  { code: 'RES', name: 'Real Estate', slug: 'res', icon: '🏠', pillar: 'Business', phase: 2, status: 'planned', parentDept: 'Franchise + PSS', tagline: 'Buy / sell / rent properties', gradient: { from: '#7a4a00', to: '#F0A030' } },
  { code: 'FBS', name: 'Food & Beverage', slug: 'fbs', icon: '🍽️', pillar: 'Business', phase: 2, status: 'planned', parentDept: 'Franchise + PSS', tagline: 'Restaurants, food delivery', gradient: { from: '#F05858', to: '#F0A030' } },
  { code: 'FIN', name: 'Finance & Banking', slug: 'fin', icon: '🏦', pillar: 'Business', phase: 2, status: 'planned', parentDept: 'Wallet + Blockchain', tagline: 'Banking, lending, insurance', gradient: { from: '#1a7020', to: '#38C878' } },
  { code: 'WES', name: 'Wellness & Fitness', slug: 'wes', icon: '💪', pillar: 'Health', phase: 2, status: 'planned', parentDept: 'CRB + Franchise', tagline: 'Gyms, trainers, nutrition', gradient: { from: '#F0A030', to: '#F05858' } },
  { code: 'ERS', name: 'EHB Real Estate Services', slug: 'ers', icon: '🏗️', pillar: 'Business', phase: 1, status: 'planned', parentDept: 'PSS + Franchise', tagline: 'Property buy/sell/rent + valuation', gradient: { from: '#7B6EF6', to: '#5C4DD0' } },
  { code: 'EFS', name: 'EHB Financial Services', slug: 'efs', icon: '💳', pillar: 'Business', phase: 1, status: 'planned', parentDept: 'Wallet + Compliance', tagline: 'Payments, investments, crypto', gradient: { from: '#1a7020', to: '#38C878' } },
  { code: 'EPS', name: 'EHB Professional Services', slug: 'eps', icon: '👔', pillar: 'Business', phase: 1, status: 'planned', parentDept: 'CRB + JPS', tagline: 'Freelancers, consultants', gradient: { from: '#7B6EF6', to: '#5B4EE6' } },
  { code: 'EAS', name: 'EHB Agriculture Services', slug: 'eas', icon: '🌱', pillar: 'Business', phase: 1, status: 'planned', parentDept: 'Franchise + DMO', tagline: 'Farming, equipment, livestock', gradient: { from: '#1a7020', to: '#38C878' } },
  { code: 'ELS', name: 'EHB Local Services', slug: 'els', icon: '🏪', pillar: 'Business', phase: 1, status: 'planned', parentDept: 'Franchise + Local', tagline: 'Handymen, tutors, cleaning', gradient: { from: '#F0A030', to: '#F8B830' } },
  // Phase 2 — additional
  { code: 'ATS', name: 'Automotive & Transport', slug: 'ats', icon: '🚗', pillar: 'Business', phase: 2, status: 'planned', parentDept: 'Franchise + LDS', tagline: 'Car sales, rentals, repair', gradient: { from: '#3b82f6', to: '#2563eb' } },
  { code: 'CNS', name: 'Construction & Engineering', slug: 'cns', icon: '👷', pillar: 'Business', phase: 2, status: 'planned', parentDept: 'Franchise + CRB', tagline: 'Contractors, civil engineering', gradient: { from: '#7a4a00', to: '#F0A030' } },
  { code: 'BCS', name: 'Beauty & Cosmetics', slug: 'bcs', icon: '💄', pillar: 'Health', phase: 2, status: 'planned', parentDept: 'CRB + Franchise', tagline: 'Salons, spas, beauty products', gradient: { from: '#ec4899', to: '#db2777' } },
  { code: 'FWS', name: 'Fashion & Wardrobe', slug: 'fws', icon: '👗', pillar: 'Business', phase: 2, status: 'planned', parentDept: 'Franchise + GoSellr', tagline: 'Clothing, tailors, design', gradient: { from: '#a855f7', to: '#9333ea' } },
  { code: 'MAS', name: 'Manufacturing & Assembly', slug: 'mas', icon: '🏭', pillar: 'Business', phase: 2, status: 'planned', parentDept: 'Franchise + DMO', tagline: 'Contract manufacturing, parts', gradient: { from: '#64748b', to: '#475569' } },
  { code: 'GES', name: 'Gaming & Entertainment', slug: 'ges', icon: '🎮', pillar: 'Business', phase: 2, status: 'planned', parentDept: 'AI + Affiliate', tagline: 'Gaming, esports, events', gradient: { from: '#a855f7', to: '#9333ea' } },
  { code: 'EHB_MUSIC', name: 'Music & Audio', slug: 'music', icon: '🎵', pillar: 'Business', phase: 2, status: 'planned', parentDept: 'Affiliate + DMO', tagline: 'Streaming, production, lessons', gradient: { from: '#7B6EF6', to: '#a855f7' } },
  { code: 'PTS', name: 'Pets & Animal Services', slug: 'pts', icon: '🐾', pillar: 'Health', phase: 2, status: 'planned', parentDept: 'CRB + Franchise', tagline: 'Vet, grooming, supplies', gradient: { from: '#38C878', to: '#1a7020' } },
  { code: 'TCS', name: 'Telecom & Communication', slug: 'tcs', icon: '📱', pillar: 'Business', phase: 2, status: 'planned', parentDept: 'Compliance + Franchise', tagline: 'Mobile, ISP, hosting', gradient: { from: '#0080c8', to: '#30d0ff' } },
  { code: 'MFS', name: 'Manufacturing & Food Safety', slug: 'mfs', icon: '🔬', pillar: 'Health', phase: 2, status: 'planned', parentDept: 'CRB + Compliance', tagline: 'Quality audits, certification', gradient: { from: '#F05858', to: '#C03030' } },
  { code: 'EDS', name: 'Education & Development', slug: 'eds', icon: '🎯', pillar: 'Education', phase: 2, status: 'planned', parentDept: 'CRB + JPS', tagline: 'Tutoring, vocational, courses', gradient: { from: '#A098F8', to: '#7B6EF6' } },
  { code: 'GSS', name: 'Green & Sustainable', slug: 'gss', icon: '🌱', pillar: 'Business', phase: 2, status: 'planned', parentDept: 'Franchise + DMO', tagline: 'Solar, recycling, eco-consulting', gradient: { from: '#38C878', to: '#1a7020' } },
  // Phase 3 — emerging
  { code: 'INS', name: 'Insurance Services', slug: 'ins', icon: '🛡️', pillar: 'Business', phase: 3, status: 'planned', parentDept: 'Wallet + Compliance', tagline: 'Health, auto, life insurance', gradient: { from: '#F05858', to: '#C03030' } },
  { code: 'LSM', name: 'Logistics & Supply Chain', slug: 'lsm', icon: '🚢', pillar: 'Business', phase: 3, status: 'planned', parentDept: 'LDS + Franchise', tagline: 'Warehousing, distribution', gradient: { from: '#7B6EF6', to: '#5C4DD0' } },
  { code: 'HCS', name: 'Health & Compliance', slug: 'hcs', icon: '✅', pillar: 'Health', phase: 3, status: 'planned', parentDept: 'CRB + Compliance', tagline: 'Regulatory auditing, certification', gradient: { from: '#F05858', to: '#7B6EF6' } },
  { code: 'SCS', name: 'Security & Cyber', slug: 'scs', icon: '🔐', pillar: 'Business', phase: 3, status: 'planned', parentDept: 'PSS + Compliance', tagline: 'Cybersecurity, physical security', gradient: { from: '#1f2937', to: '#374151' } },
  { code: 'RRS', name: 'Research & R&D', slug: 'rrs', icon: '🔭', pillar: 'Education', phase: 3, status: 'planned', parentDept: 'CRB + AI', tagline: 'Market research, R&D labs', gradient: { from: '#A098F8', to: '#7B6EF6' } },
  { code: 'CMS', name: 'Consulting & Management', slug: 'cms', icon: '📋', pillar: 'Business', phase: 3, status: 'planned', parentDept: 'CRB + JPS', tagline: 'Business consulting, strategy', gradient: { from: '#7B6EF6', to: '#5B4EE6' } },
];

export function getIndustry(slug: string): IndustryDef | null {
  return INDUSTRIES.find((i) => i.slug === slug) || null;
}
