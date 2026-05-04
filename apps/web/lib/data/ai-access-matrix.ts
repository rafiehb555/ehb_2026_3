/**
 * EHB AI Marketplace — Access Matrix
 *
 * Spec: ehb-info/15-ui-system/AI-MARKETPLACE-USER-MATRIX.md
 * Source: FOUNDER-DECISIONS-2026-05-03 Q5
 *
 * AUTO-SAVE: Any change here MUST update AI-MARKETPLACE-USER-MATRIX.md.
 */

export type UserType =
  | 'buyer'
  | 'seller'
  | 'service_provider'
  | 'rider'
  | 'franchisee'
  | 'job_seeker'
  | 'employer'
  | 'inspector'
  | 'dmo_officer'
  | 'founder';

export type AiServiceKey =
  | 'industry_matcher'
  | 'service_matcher'
  | 'listing_quality'
  | 'fraud_detector_lite'
  | 'fraud_detector_full'
  | 'plagiarism'
  | 'diagnosis_wms'
  | 'lawyer_ols'
  | 'resume_builder'
  | 'course_tutor'
  | 'cover_art'
  | 'master_audio'
  | 'listing_copy'
  | 'business_advisor'
  | 'market_trend'
  | 'daily_brief_limited'
  | 'daily_brief_full'
  | 'roi_calculator'
  | 'job_matcher'
  | 'onboarding_coach'
  | 'stl_coach'
  | 'dispute_summariser'
  | 'fraud_admin'
  | 'bulk_hiring'
  | 'founder_brief';

export interface AccessRule {
  userType: UserType;
  service: AiServiceKey;
  minStl: number;
  industryFilter?: string; // 'WMS', 'OLS', 'HPS' etc.
  paid?: boolean;
  notes?: string;
}

/**
 * Universal services available to all user types from L1.
 */
const UNIVERSAL: AiServiceKey[] = [
  'industry_matcher',
  'service_matcher',
  'onboarding_coach',
  'stl_coach',
];

/** Free quota per user type per day (-1 = unlimited). */
export const QUOTA_BY_USER_TYPE: Record<UserType, number> = {
  buyer: 3,
  seller: 5,
  service_provider: 5,
  rider: 3,
  franchisee: 10,
  job_seeker: 3,
  employer: 5,
  inspector: -1,
  dmo_officer: -1,
  founder: -1,
};

/** Service-specific monthly caps (e.g. Resume Builder for Job Seeker). */
export const SPECIAL_CAPS: { userType: UserType; service: AiServiceKey; cap: number; period: 'day' | 'month' }[] = [
  { userType: 'job_seeker', service: 'resume_builder', cap: 3, period: 'month' },
  { userType: 'service_provider', service: 'daily_brief_limited', cap: 1, period: 'day' },
];

/** Full access matrix — every (userType, service) pair allowed. */
export const ACCESS_RULES: AccessRule[] = [
  // Buyer
  { userType: 'buyer', service: 'industry_matcher', minStl: 1 },
  { userType: 'buyer', service: 'service_matcher', minStl: 1 },
  { userType: 'buyer', service: 'listing_quality', minStl: 1 },
  { userType: 'buyer', service: 'fraud_detector_lite', minStl: 1, notes: 'lite — yes/no risk only' },
  { userType: 'buyer', service: 'plagiarism', minStl: 3 },
  { userType: 'buyer', service: 'diagnosis_wms', minStl: 4, industryFilter: 'WMS' },
  { userType: 'buyer', service: 'lawyer_ols', minStl: 4, industryFilter: 'OLS' },
  { userType: 'buyer', service: 'onboarding_coach', minStl: 1 },
  { userType: 'buyer', service: 'stl_coach', minStl: 1 },

  // Seller
  { userType: 'seller', service: 'industry_matcher', minStl: 1 },
  { userType: 'seller', service: 'service_matcher', minStl: 1 },
  { userType: 'seller', service: 'listing_quality', minStl: 1 },
  { userType: 'seller', service: 'fraud_detector_lite', minStl: 3 },
  { userType: 'seller', service: 'plagiarism', minStl: 3 },
  { userType: 'seller', service: 'cover_art', minStl: 3 },
  { userType: 'seller', service: 'master_audio', minStl: 4 },
  { userType: 'seller', service: 'listing_copy', minStl: 3 },
  { userType: 'seller', service: 'business_advisor', minStl: 3 },
  { userType: 'seller', service: 'market_trend', minStl: 3 },
  { userType: 'seller', service: 'onboarding_coach', minStl: 1 },
  { userType: 'seller', service: 'stl_coach', minStl: 1 },

  // Service Provider
  { userType: 'service_provider', service: 'industry_matcher', minStl: 1 },
  { userType: 'service_provider', service: 'service_matcher', minStl: 1 },
  { userType: 'service_provider', service: 'listing_quality', minStl: 1 },
  { userType: 'service_provider', service: 'fraud_detector_lite', minStl: 5 },
  { userType: 'service_provider', service: 'plagiarism', minStl: 5 },
  { userType: 'service_provider', service: 'diagnosis_wms', minStl: 5, industryFilter: 'WMS' },
  { userType: 'service_provider', service: 'lawyer_ols', minStl: 5, industryFilter: 'OLS' },
  { userType: 'service_provider', service: 'course_tutor', minStl: 5, industryFilter: 'HPS' },
  { userType: 'service_provider', service: 'resume_builder', minStl: 5 },
  { userType: 'service_provider', service: 'cover_art', minStl: 5 },
  { userType: 'service_provider', service: 'master_audio', minStl: 5 },
  { userType: 'service_provider', service: 'listing_copy', minStl: 5 },
  { userType: 'service_provider', service: 'business_advisor', minStl: 5 },
  { userType: 'service_provider', service: 'market_trend', minStl: 5 },
  { userType: 'service_provider', service: 'daily_brief_limited', minStl: 5, notes: '1 call/day free' },
  { userType: 'service_provider', service: 'onboarding_coach', minStl: 1 },
  { userType: 'service_provider', service: 'stl_coach', minStl: 1 },

  // Rider
  { userType: 'rider', service: 'industry_matcher', minStl: 1 },
  { userType: 'rider', service: 'service_matcher', minStl: 1 },
  { userType: 'rider', service: 'fraud_detector_lite', minStl: 2 },
  { userType: 'rider', service: 'onboarding_coach', minStl: 1 },
  { userType: 'rider', service: 'stl_coach', minStl: 1 },

  // Franchisee
  { userType: 'franchisee', service: 'industry_matcher', minStl: 1 },
  { userType: 'franchisee', service: 'service_matcher', minStl: 1 },
  { userType: 'franchisee', service: 'listing_quality', minStl: 1 },
  { userType: 'franchisee', service: 'fraud_detector_lite', minStl: 5 },
  { userType: 'franchisee', service: 'plagiarism', minStl: 5 },
  { userType: 'franchisee', service: 'business_advisor', minStl: 5, notes: 'advanced version' },
  { userType: 'franchisee', service: 'market_trend', minStl: 5, notes: 'advanced version' },
  { userType: 'franchisee', service: 'roi_calculator', minStl: 5 },
  { userType: 'franchisee', service: 'listing_copy', minStl: 5 },
  { userType: 'franchisee', service: 'resume_builder', minStl: 5 },
  { userType: 'franchisee', service: 'dispute_summariser', minStl: 5, notes: 'DMO-LITE: read-only' },
  { userType: 'franchisee', service: 'fraud_admin', minStl: 5, notes: 'DMO-LITE: view fraud flags' },
  { userType: 'franchisee', service: 'onboarding_coach', minStl: 1 },
  { userType: 'franchisee', service: 'stl_coach', minStl: 1 },

  // Job Seeker
  { userType: 'job_seeker', service: 'industry_matcher', minStl: 1 },
  { userType: 'job_seeker', service: 'service_matcher', minStl: 1 },
  { userType: 'job_seeker', service: 'resume_builder', minStl: 1, notes: '3/mo free' },
  { userType: 'job_seeker', service: 'job_matcher', minStl: 1 },
  { userType: 'job_seeker', service: 'course_tutor', minStl: 3, paid: true, notes: 'premium courses' },
  { userType: 'job_seeker', service: 'plagiarism', minStl: 3 },
  { userType: 'job_seeker', service: 'onboarding_coach', minStl: 1 },
  { userType: 'job_seeker', service: 'stl_coach', minStl: 1 },

  // Employer
  { userType: 'employer', service: 'industry_matcher', minStl: 1 },
  { userType: 'employer', service: 'service_matcher', minStl: 1 },
  { userType: 'employer', service: 'listing_quality', minStl: 1 },
  { userType: 'employer', service: 'fraud_detector_lite', minStl: 3 },
  { userType: 'employer', service: 'plagiarism', minStl: 3 },
  { userType: 'employer', service: 'resume_builder', minStl: 3, notes: 'Reviewer mode' },
  { userType: 'employer', service: 'job_matcher', minStl: 3 },
  { userType: 'employer', service: 'listing_copy', minStl: 3 },
  { userType: 'employer', service: 'business_advisor', minStl: 3 },
  { userType: 'employer', service: 'market_trend', minStl: 3 },
  { userType: 'employer', service: 'roi_calculator', minStl: 3 },
  { userType: 'employer', service: 'bulk_hiring', minStl: 3, paid: true },
  { userType: 'employer', service: 'onboarding_coach', minStl: 1 },
  { userType: 'employer', service: 'stl_coach', minStl: 1 },

  // Inspector
  { userType: 'inspector', service: 'industry_matcher', minStl: 1 },
  { userType: 'inspector', service: 'service_matcher', minStl: 1 },
  { userType: 'inspector', service: 'listing_quality', minStl: 1 },
  { userType: 'inspector', service: 'fraud_detector_full', minStl: 7 },
  { userType: 'inspector', service: 'plagiarism', minStl: 7 },
  { userType: 'inspector', service: 'market_trend', minStl: 7 },
  { userType: 'inspector', service: 'daily_brief_full', minStl: 7 },
  { userType: 'inspector', service: 'dispute_summariser', minStl: 7 },
  { userType: 'inspector', service: 'onboarding_coach', minStl: 1 },
  { userType: 'inspector', service: 'stl_coach', minStl: 1 },

  // DMO Officer
  { userType: 'dmo_officer', service: 'industry_matcher', minStl: 1 },
  { userType: 'dmo_officer', service: 'service_matcher', minStl: 1 },
  { userType: 'dmo_officer', service: 'listing_quality', minStl: 1 },
  { userType: 'dmo_officer', service: 'fraud_detector_full', minStl: 8 },
  { userType: 'dmo_officer', service: 'fraud_admin', minStl: 8 },
  { userType: 'dmo_officer', service: 'plagiarism', minStl: 8 },
  { userType: 'dmo_officer', service: 'market_trend', minStl: 8 },
  { userType: 'dmo_officer', service: 'daily_brief_full', minStl: 8 },
  { userType: 'dmo_officer', service: 'dispute_summariser', minStl: 8 },
  { userType: 'dmo_officer', service: 'onboarding_coach', minStl: 1 },
  { userType: 'dmo_officer', service: 'stl_coach', minStl: 1 },

  // Founder — all access
  { userType: 'founder', service: 'founder_brief', minStl: 10 },
  // (other services accessible via UNIVERSAL + role overrides; founder has full access)
];

/** Quick lookup: is this service available to this user type? */
export function canAccess(
  userType: UserType,
  service: AiServiceKey,
  userStl: number,
  userIndustry?: string,
): { allowed: boolean; reason?: string; rule?: AccessRule } {
  // Founder has full access
  if (userType === 'founder') return { allowed: true };

  const rule = ACCESS_RULES.find((r) => r.userType === userType && r.service === service);
  if (!rule) return { allowed: false, reason: `Service ${service} not available for ${userType}` };

  if (userStl < rule.minStl) {
    return { allowed: false, reason: `Reach EHB STL L${rule.minStl} to unlock`, rule };
  }
  if (rule.industryFilter && userIndustry !== rule.industryFilter) {
    return {
      allowed: false,
      reason: `${service} requires industry ${rule.industryFilter}; you are in ${userIndustry || 'none'}`,
      rule,
    };
  }
  if (rule.paid) {
    return { allowed: false, reason: 'Premium feature — upgrade required', rule };
  }
  return { allowed: true, rule };
}
