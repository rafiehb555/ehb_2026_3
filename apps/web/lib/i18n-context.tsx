'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type LangId = 'en' | 'ur';

/**
 * EHB i18n — Roman Urdu + English.
 * Roman Urdu chosen over Urdu script for phase 1 (no RTL complexity).
 * Full Urdu script with RTL in Phase 2.
 */
const DICT: Record<LangId, Record<string, string>> = {
  en: {
    // Nav
    'nav.how': 'How it works',
    'nav.concepts': 'Concepts',
    'nav.gosellr': 'GoSellr',
    'nav.industries': 'Industries',
    'nav.franchise': 'Franchise',
    'nav.ai': 'AI Marketplace',
    'nav.affiliate': 'Affiliate',
    'nav.login': 'Login',
    'nav.start': 'Get Started',

    // Hero
    'hero.badge': 'EHB Technologies (Pvt.) Ltd. · Founded 2008 · Islamabad',
    'hero.title1': 'One Platform.',
    'hero.title2': '38 Industries.',
    'hero.tagline':
      'A single super-app that unifies Education, Health, and Business across 38 verticals. Every user, seller, product, and franchise carries a composite trust score (L1 FREE → L10 SUPREME). AI assists. Blockchain anchors. DMO governs.',
    'hero.cta.start': 'Get Started — 2 minutes',
    'hero.cta.how': 'See how it works →',
    'hero.tag1': '🏛️ AI + Polkadot trust backbone',
    'hero.tag2': '🤝 Escrow on every order',
    'hero.tag3': '📜 On-chain credential hashing',

    // What is EHB
    'what.eyebrow': 'What is EHB?',
    'what.title': 'Trust, unified across every industry.',

    // Flow
    'flow.eyebrow': 'Your journey',
    'flow.title': 'From signup to earning in 8 steps',
    'flow.subtitle':
      'The same flow works whether you come to buy, sell, deliver, teach, or refer. STL grows with every positive action.',
    'flow.cta': 'Full walkthrough →',

    // Audiences
    'aud.eyebrow': "Who it's for",
    'aud.title': 'Your quickest path, by role',

    // Pillars
    'pillar.eyebrow': 'Six entry points',
    'pillar.title': 'Pick where to start',

    // FAQ
    'faq.eyebrow': 'Common questions',
    'faq.title': 'Frequently asked',

    // Final
    'final.title': 'Ready to join EHB?',
    'final.subtitle':
      'Register in 30 seconds. Verify identity in 2 minutes. Your STL is assigned immediately. Start buying, selling, earning.',
    'final.cta.start': 'Get Started',
    'final.cta.concepts': 'Learn the concepts',

    // Common
    'common.register': 'Register',
    'common.login': 'Login',
  },
  ur: {
    // Nav
    'nav.how': 'Kaise kaam karta hai',
    'nav.concepts': 'Concepts',
    'nav.gosellr': 'GoSellr',
    'nav.industries': 'Industries',
    'nav.franchise': 'Franchise',
    'nav.ai': 'AI Marketplace',
    'nav.affiliate': 'Affiliate',
    'nav.login': 'Login karein',
    'nav.start': 'Shuru karein',

    // Hero
    'hero.badge': 'EHB Technologies (Pvt.) Ltd. · 2008 mein qaim · Islamabad',
    'hero.title1': 'Ek Platform.',
    'hero.title2': '38 Industries.',
    'hero.tagline':
      'Aik super-app jo Education, Health, aur Business ko 38 verticals mein unify karta hai. Har user, seller, product, franchise ka composite trust score hota hai (L1 FREE → L10 SUPREME). AI madad karta hai. Blockchain record karta hai. DMO manage karta hai.',
    'hero.cta.start': 'Shuru karein — 2 minute',
    'hero.cta.how': 'Kaise kaam karta hai →',
    'hero.tag1': '🏛️ AI + Polkadot trust backbone',
    'hero.tag2': '🤝 Har order par escrow protection',
    'hero.tag3': '📜 On-chain credential hashing',

    // What
    'what.eyebrow': 'EHB kya hai?',
    'what.title': 'Har industry mein ek hi trust system.',

    // Flow
    'flow.eyebrow': 'Aap ka safar',
    'flow.title': '8 steps mein signup se kamai tak',
    'flow.subtitle':
      'Chahe aap khareedne, bechne, delivery, padhaane, ya refer karne aaen — yeh hi flow kaam karta hai. STL har positive action se barhta hai.',
    'flow.cta': 'Full walkthrough →',

    // Aud
    'aud.eyebrow': 'Yeh kis ke liye hai',
    'aud.title': 'Role ke hisab se sab se tez raasta',

    // Pillars
    'pillar.eyebrow': 'Che entry points',
    'pillar.title': 'Kahan se shuru karein',

    // FAQ
    'faq.eyebrow': 'Aam sawaal',
    'faq.title': 'Akser poochay jaane wale sawaal',

    // Final
    'final.title': 'EHB join karne ke liye tayyar hain?',
    'final.subtitle':
      '30 second mein register karein. 2 minute mein identity verify karein. Aap ka STL foran milta hai. Khareedna, bechna, kamana shuru karein.',
    'final.cta.start': 'Shuru karein',
    'final.cta.concepts': 'Concepts seekhain',

    // Common
    'common.register': 'Register karein',
    'common.login': 'Login karein',
  },
};

interface Ctx {
  lang: LangId;
  setLang: (l: LangId) => void;
  t: (key: string) => string;
}

const C = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangId>('en');

  // Restore saved preference (from cookie or default)
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const saved = document.cookie.match(/ehb_lang=([a-z]{2})/);
    if (saved?.[1] === 'ur' || saved?.[1] === 'en') {
      setLangState(saved[1] as LangId);
    }
  }, []);

  const setLang = useCallback((l: LangId) => {
    setLangState(l);
    if (typeof document !== 'undefined') {
      document.cookie = `ehb_lang=${l}; path=/; max-age=31536000`;
    }
  }, []);

  const t = useCallback(
    (key: string) => {
      return DICT[lang][key] || DICT.en[key] || key;
    },
    [lang]
  );

  return <C.Provider value={{ lang, setLang, t }}>{children}</C.Provider>;
}

export function useI18n() {
  const ctx = useContext(C);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

export function LangToggle() {
  const { lang, setLang } = useI18nSafe();
  if (!setLang) return null;
  return (
    <div className="inline-flex rounded-chip border border-glass bg-card/60 p-0.5 text-[10px]">
      <button
        onClick={() => setLang('en')}
        className={`rounded-chip px-2 py-0.5 font-semibold transition ${
          lang === 'en' ? 'bg-purple/30 text-white' : 'text-white/60'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang('ur')}
        className={`rounded-chip px-2 py-0.5 font-semibold transition ${
          lang === 'ur' ? 'bg-teal/30 text-white' : 'text-white/60'
        }`}
      >
        اردو
      </button>
    </div>
  );
}

// Safe version that returns null if not in provider — allows LangToggle to render in any page
function useI18nSafe() {
  const ctx = useContext(C);
  return ctx || { lang: 'en' as LangId, setLang: null, t: (k: string) => DICT.en[k] || k };
}
