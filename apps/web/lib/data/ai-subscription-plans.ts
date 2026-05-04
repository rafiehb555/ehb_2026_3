/**
 * EHB AI Subscription Plans (11 tiers, L0-L10)
 *
 * Spec: ehb-info/10-ai-system/AI-LEVEL-SYSTEM.md
 *
 * STL ≠ AI Level — independent dimensions.
 *
 * AUTO-SAVE: Any change here MUST update AI-LEVEL-SYSTEM.md.
 */

export interface AiPlan {
  level: number;       // 0-10
  name: string;
  priceUsd: number;
  quotaDaily: number;  // -1 = unlimited
  features: string[];
  modes: ('assistant' | 'agent' | 'robot')[];
  speed: 'normal' | 'priority' | 'fast' | 'fastest';
  highlight?: boolean;
  badge?: string;
  gradientFrom: string;
  gradientTo: string;
  textColor: string;
}

export const AI_PLANS: AiPlan[] = [
  {
    level: 0,
    name: 'Free',
    priceUsd: 0,
    quotaDaily: 3,
    features: ['Basic chat', 'Industry matcher', 'Service matcher', 'STL coach', 'Onboarding coach'],
    modes: ['assistant'],
    speed: 'normal',
    gradientFrom: '#5C6072',
    gradientTo: '#2C2E3A',
    textColor: '#fff',
  },
  {
    level: 1,
    name: 'Starter',
    priceUsd: 10,
    quotaDaily: 10,
    features: ['Free + listing tools', 'Plagiarism check', 'Fraud detector lite'],
    modes: ['assistant'],
    speed: 'normal',
    gradientFrom: '#4A7FBC',
    gradientTo: '#1E3A5F',
    textColor: '#fff',
  },
  {
    level: 2,
    name: 'Basic',
    priceUsd: 20,
    quotaDaily: 25,
    features: ['Starter + cover art', 'Master audio', 'Listing copy writer'],
    modes: ['assistant'],
    speed: 'normal',
    gradientFrom: '#4DAB7E',
    gradientTo: '#1F5A3E',
    textColor: '#fff',
  },
  {
    level: 3,
    name: 'Standard',
    priceUsd: 30,
    quotaDaily: 50,
    features: ['Basic + multi-industry matcher', 'Resume builder', 'Job matcher'],
    modes: ['assistant'],
    speed: 'normal',
    gradientFrom: '#4DA8B5',
    gradientTo: '#1E5862',
    textColor: '#fff',
  },
  {
    level: 4,
    name: 'Advanced',
    priceUsd: 50,
    quotaDaily: 100,
    features: ['Standard + AI Diagnosis (WMS)', 'AI Lawyer (OLS)', 'ROI calculator'],
    modes: ['assistant'],
    speed: 'priority',
    gradientFrom: '#6F62D6',
    gradientTo: '#3B2F8A',
    textColor: '#fff',
    highlight: true,
    badge: 'Most popular',
  },
  {
    level: 5,
    name: 'Pro',
    priceUsd: 80,
    quotaDaily: 250,
    features: ['Advanced + Business advisor', 'Market trend', 'Course tutor', 'Daily Brief LIMITED'],
    modes: ['assistant'],
    speed: 'priority',
    gradientFrom: '#8B4DC4',
    gradientTo: '#4F1F7A',
    textColor: '#fff',
  },
  {
    level: 6,
    name: 'Expert',
    priceUsd: 120,
    quotaDaily: 500,
    features: ['Pro + Daily Brief FULL', 'Cross-industry insights', 'Deep analysis'],
    modes: ['assistant'],
    speed: 'fast',
    gradientFrom: '#C44D8B',
    gradientTo: '#7A1F50',
    textColor: '#fff',
  },
  {
    level: 7,
    name: 'Elite',
    priceUsd: 200,
    quotaDaily: 1000,
    features: ['Expert + Agent mode', 'Multi-step task execution', 'Fraud admin tools'],
    modes: ['assistant', 'agent'],
    speed: 'fast',
    gradientFrom: '#F0B90B',
    gradientTo: '#7A5A04',
    textColor: '#412402',
  },
  {
    level: 8,
    name: 'Master',
    priceUsd: 300,
    quotaDaily: 2500,
    features: ['Elite + Multi-agent (parallel)', 'Bulk operations', 'Priority support'],
    modes: ['assistant', 'agent'],
    speed: 'fast',
    gradientFrom: '#8B6B3F',
    gradientTo: '#3F2D14',
    textColor: '#fff',
  },
  {
    level: 9,
    name: 'Ultra',
    priceUsd: 500,
    quotaDaily: -1,
    features: ['Master + Unlimited calls', 'Priority queue', 'Custom prompts', 'Robot mode'],
    modes: ['assistant', 'agent', 'robot'],
    speed: 'priority',
    gradientFrom: '#5F4D7A',
    gradientTo: '#2F1F4A',
    textColor: '#fff',
  },
  {
    level: 10,
    name: 'God Mode',
    priceUsd: 1000,
    quotaDaily: -1,
    features: ['Ultra + Custom fine-tuned models', 'API access', 'Founder-tier features'],
    modes: ['assistant', 'agent', 'robot'],
    speed: 'fastest',
    gradientFrom: '#A32D2D',
    gradientTo: '#501313',
    textColor: '#fff',
    badge: 'Free 15-day trial',
  },
];

export const TRIAL_DAYS = 15;
export const YEARLY_DISCOUNT_PCT = 20;

export function getPlan(level: number): AiPlan {
  return AI_PLANS[Math.max(0, Math.min(10, level))];
}

export function quotaText(level: number): string {
  const q = AI_PLANS[level]?.quotaDaily ?? 3;
  return q === -1 ? 'Unlimited' : `${q}/day`;
}
