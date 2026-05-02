'use client';

/**
 * EHB Affiliate — i18n dictionary + helper hook
 *
 * Supports English (default) + Roman Urdu (Pakistani readability).
 * Future: Urdu RTL script (Phase 2).
 *
 * Usage:
 *   const t = useAffiliateT();
 *   <h1>{t('welcome.title')}</h1>
 */

import { useEffect, useState } from 'react';

export type Lang = 'en' | 'ur-roman';

const DICT: Record<string, Record<Lang, string>> = {
  // ─── Welcome / general ──────────────────────────────────────
  'welcome.title': {
    en: 'Earn from real product sales',
    'ur-roman': 'Real product sales se kamao',
  },
  'welcome.subtitle': {
    en: '10% direct + 5% L2 + 11 bonuses + Track B 10-level franchise cascade. No income from joining fees — real sales only.',
    'ur-roman': '10% direct + 5% L2 + 11 bonuses + Track B 10-level cascade. Joining fees se koi income nahi — sirf real sales se.',
  },
  'welcome.ctaJoin': {
    en: 'Join Affiliate Program — Free',
    'ur-roman': 'Affiliate Program join karein — Free',
  },
  'welcome.ctaLogin': {
    en: 'Login',
    'ur-roman': 'Login',
  },
  'welcome.ctaSignup': {
    en: 'Sign up & join',
    'ur-roman': 'Sign up karke join karein',
  },

  // ─── Tabs ───────────────────────────────────────────────────
  'tab.welcome': { en: 'Welcome', 'ur-roman': 'Welcome' },
  'tab.dashboard': { en: 'Dashboard', 'ur-roman': 'Dashboard' },
  'tab.marketplace': { en: 'Marketplace', 'ur-roman': 'Marketplace' },
  'tab.wallet': { en: 'Wallet', 'ur-roman': 'Wallet' },
  'tab.bonuses': { en: 'Bonuses & Ranks', 'ur-roman': 'Bonuses aur Ranks' },
  'tab.compliance': { en: 'Compliance', 'ur-roman': 'Compliance' },

  // ─── Stats / KPIs ───────────────────────────────────────────
  'kpi.totalAffiliates': { en: 'Total affiliates', 'ur-roman': 'Total affiliates' },
  'kpi.medianMonthly': { en: 'Median monthly', 'ur-roman': 'Median monthly' },
  'kpi.top1Pct': { en: 'Top 1% monthly', 'ur-roman': 'Top 1% monthly' },
  'kpi.lifetimePaid': { en: 'Lifetime paid out', 'ur-roman': 'Lifetime ada kiya gaya' },
  'kpi.totalEarnings': { en: 'Total Earnings', 'ur-roman': 'Total Kamai' },
  'kpi.pendingClearance': { en: 'Pending Clearance', 'ur-roman': 'Pending Clearance' },
  'kpi.availableWithdraw': { en: 'Available to Withdraw', 'ur-roman': 'Withdraw karne ke liye available' },
  'kpi.todayPerformance': { en: "Today's Performance", 'ur-roman': 'Aaj ki Performance' },
  'kpi.lifetime': { en: 'Lifetime', 'ur-roman': 'Lifetime' },
  'kpi.thisMonth': { en: 'This month', 'ur-roman': 'Iss mahine' },
  'kpi.directRefs': { en: 'Direct refs', 'ur-roman': 'Direct refs' },
  'kpi.network': { en: 'Network', 'ur-roman': 'Network' },

  // ─── Tracks ─────────────────────────────────────────────────
  'track.a.label': { en: 'Track A — Product Sale', 'ur-roman': 'Track A — Product Sale' },
  'track.a.title': { en: '2-layer GoSellr cascade', 'ur-roman': '2-layer GoSellr cascade' },
  'track.a.desc': {
    en: 'Layer 1: seller-defined 5–30% margin → direct salesperson. Layer 2: hidden 5% network pool split L1 3% / L2 1.5% / L3 0.5%.',
    'ur-roman':
      'Layer 1: seller-defined 5–30% margin → direct salesperson. Layer 2: hidden 5% network pool split L1 3% / L2 1.5% / L3 0.5%.',
  },
  'track.b.label': { en: 'Track B — Franchise Sale', 'ur-roman': 'Track B — Franchise Sale' },
  'track.b.title': { en: '10-level rank-gated cascade', 'ur-roman': '10-level rank-gated cascade' },
  'track.b.desc': {
    en: 'L1 5% → L10 0.3% (~15% total). Each upline earns levels their rank unlocks. R10 reaches L10. Unclaimed % flows to EHB rebate pool.',
    'ur-roman':
      'L1 5% → L10 0.3% (~15% total). Har upline apne rank ke hisaab se levels kamaata hai. R10 puray L10 tak pohnchta hai. Unclaimed % EHB rebate pool me jata hai.',
  },

  // ─── CTAs / actions ─────────────────────────────────────────
  'cta.copyLink': { en: 'Copy link', 'ur-roman': 'Link copy karein' },
  'cta.copyCode': { en: 'Copy code', 'ur-roman': 'Code copy karein' },
  'cta.copied': { en: '✓ Copied', 'ur-roman': '✓ Copy ho gaya' },
  'cta.share': { en: 'Share', 'ur-roman': 'Share karein' },
  'cta.promote': { en: 'Promote', 'ur-roman': 'Promote karein' },
  'cta.buyNow': { en: 'Buy Now', 'ur-roman': 'Abhi khareedein' },
  'cta.viewDetails': { en: 'View Details', 'ur-roman': 'Tafseelat dekhein' },
  'cta.transfer': { en: 'Transfer', 'ur-roman': 'Transfer karein' },
  'cta.withdraw': { en: 'Withdraw', 'ur-roman': 'Withdraw karein' },
  'cta.approve': { en: 'Approve', 'ur-roman': 'Approve karein' },
  'cta.reject': { en: 'Reject', 'ur-roman': 'Reject karein' },
  'cta.escalate': { en: 'Escalate', 'ur-roman': 'Escalate karein' },
  'cta.clear': { en: 'Clear', 'ur-roman': 'Clear karein' },

  // ─── Pillars ────────────────────────────────────────────────
  'pillar.bonuses': { en: '11 Bonuses', 'ur-roman': '11 Bonuses' },
  'pillar.bonusesSub': { en: '4 stacking tiers', 'ur-roman': '4 stacking tiers' },
  'pillar.ranks': { en: 'R1–R10 Ranks', 'ur-roman': 'R1–R10 Ranks' },
  'pillar.ranksSub': { en: 'Auto-promotion', 'ur-roman': 'Auto-promotion' },
  'pillar.wallet': { en: 'Dual Wallet', 'ur-roman': 'Dual Wallet' },
  'pillar.walletSub': { en: '80/20 USDT/EHBGC', 'ur-roman': '80/20 USDT/EHBGC' },
  'pillar.notMlm': { en: 'NOT MLM', 'ur-roman': 'NOT MLM' },
  'pillar.notMlmSub': { en: 'FTC compliant', 'ur-roman': 'FTC compliant' },

  // ─── Compliance ─────────────────────────────────────────────
  'compliance.notMlmTitle': { en: 'EHB is NOT an MLM', 'ur-roman': 'EHB MLM nahi hai' },
  'compliance.notMlmBody': {
    en: 'EHB is an Affiliate + Marketplace + Service Platform. Income comes only from real product/service sales — never joining fees, recruitment alone, or self-purchase loops.',
    'ur-roman':
      'EHB ek Affiliate + Marketplace + Service Platform hai. Kamai sirf real product/service sales se aati hai — joining fees, recruitment, ya self-purchase loops se kabhi nahi.',
  },
  'compliance.disclaimer': {
    en: 'Individual results vary with effort, network quality, and market conditions. Most affiliates earn modest amounts. EHB makes no income guarantee.',
    'ur-roman':
      'Individual results aap ki mehnat, network quality, aur market conditions par depend karte hain. Aksar affiliates modest amounts kamatey hain. EHB koi income guarantee nahi deta.',
  },

  // ─── Empty / error states ───────────────────────────────────
  'state.noData': { en: 'No data yet', 'ur-roman': 'Abhi koi data nahi' },
  'state.loading': { en: 'Loading…', 'ur-roman': 'Load ho raha hai…' },
  'state.error': { en: 'Something went wrong', 'ur-roman': 'Kuch ghalat ho gaya' },
  'state.retry': { en: 'Try again', 'ur-roman': 'Phir koshish karein' },
  'state.noReferralsYet': { en: 'No referrals yet', 'ur-roman': 'Abhi koi referrals nahi' },
  'state.shareToStart': {
    en: 'Share your referral link to start growing your network.',
    'ur-roman': 'Apna referral link share karke network barhana shuru karein.',
  },

  // ─── Forbidden / approved phrases (compliance reference) ────
  'phrase.forbidden': {
    en: 'Forbidden phrases (auto-flagged)',
    'ur-roman': 'Mana karda phrases (auto-flag honge)',
  },
  'phrase.approved': { en: 'Approved phrases', 'ur-roman': 'Approved phrases' },
};

/**
 * Get current language from cookie/localStorage (with fallback).
 * Defaults to 'en'.
 */
export function getCurrentLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = window.localStorage.getItem('ehb_lang');
    if (stored === 'en' || stored === 'ur-roman') return stored;
  } catch {
    /* ignore */
  }
  return 'en';
}

/** Set language preference. */
export function setLang(lang: Lang) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem('ehb_lang', lang);
    window.dispatchEvent(new CustomEvent('ehb:lang-change', { detail: lang }));
  } catch {
    /* ignore */
  }
}

/**
 * Translate function — returns the translated string or the key as fallback.
 * Use directly without React if rendering on server: t('welcome.title', 'en')
 */
export function t(key: string, lang?: Lang): string {
  const language = lang || getCurrentLang();
  const entry = DICT[key];
  if (!entry) return key;
  return entry[language] || entry.en || key;
}

/**
 * React hook — re-renders when the language preference changes.
 * Returns a translation function bound to the current language.
 */
export function useAffiliateT() {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    setLangState(getCurrentLang());
    const handler = (e: Event) => {
      const ce = e as CustomEvent<Lang>;
      setLangState(ce.detail);
    };
    window.addEventListener('ehb:lang-change', handler);
    return () => window.removeEventListener('ehb:lang-change', handler);
  }, []);

  return (key: string) => t(key, lang);
}

/** Available languages — for the language switcher UI */
export const AVAILABLE_LANGUAGES: Array<{ code: Lang; label: string; flag: string }> = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ur-roman', label: 'Roman Urdu', flag: '🇵🇰' },
];
