'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PublicNav } from '@/components/ui/public-nav';
import { PublicFooter } from '@/components/ui/public-footer';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';
import { Button3D } from '@/components/ui/button-3d';

/**
 * EHB Affiliate — Help & Legal Center (Visily prototype screen #12)
 *
 * Standalone resource center with Legal Documents library + Support Topics
 * + full T&Cs content viewer + KYC/AML guidelines.
 */

type DocId = 'terms' | 'privacy' | 'kyc' | 'income' | 'cookie';

const LEGAL_DOCS: Array<{ id: DocId; icon: string; title: string; updated: string; pages: number }> = [
  { id: 'terms', icon: '📜', title: 'Terms and Conditions', updated: '2026-04-26', pages: 12 },
  { id: 'privacy', icon: '🔒', title: 'Privacy Policy', updated: '2026-04-26', pages: 8 },
  { id: 'kyc', icon: '🆔', title: 'KYC / AML Guidelines', updated: '2026-04-26', pages: 5 },
  { id: 'income', icon: '📊', title: 'Income Disclosure Statement', updated: '2026-04-26', pages: 3 },
  { id: 'cookie', icon: '🍪', title: 'Cookie Policy', updated: '2026-04-26', pages: 2 },
];

const SUPPORT_TOPICS = [
  {
    icon: '❓',
    title: 'Frequently Asked Questions',
    desc: '10 most-asked questions covering joining, earnings, KYC, withdrawals, refunds.',
    href: '/affiliate/how-it-works#faq',
    color: '#7B6EF6',
  },
  {
    icon: '💬',
    title: 'Contact Support',
    desc: 'Live chat (9am-9pm PKT), email support@ehb.com, phone +92-XXX-XXXXXXX.',
    href: 'mailto:support@ehb.com',
    color: '#2BBFA0',
  },
  {
    icon: '📚',
    title: 'How It Works Guide',
    desc: 'Step-by-step walkthrough — sign up to first withdrawal in 6 steps.',
    href: '/affiliate/how-it-works',
    color: '#F0A030',
  },
  {
    icon: '🎓',
    title: 'Affiliate Training Center',
    desc: 'Video tutorials + best practices for sharing and growing your network.',
    href: '/concepts',
    color: '#EC4899',
  },
];

const DOC_CONTENT: Record<DocId, { title: string; sections: Array<{ heading: string; body: string }> }> = {
  terms: {
    title: 'Terms and Conditions',
    sections: [
      {
        heading: '1. Acceptance of Terms',
        body: 'By accessing and using the EHB Compliance Portal and its associated Affiliate System, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you are prohibited from using the platform.',
      },
      {
        heading: '2. User Accounts & Responsibilities',
        body: 'Account Security: You are responsible for maintaining the confidentiality of your login credentials and two-factor authentication methods. Accurate Information: All information provided during the KYC process must be accurate, current, and complete. Prohibited Activities: Users shall not engage in fraudulent transactions, attempt to manipulate the product systems, or violate regional regulatory requirements supported within the platform.',
      },
      {
        heading: '3. Financial Transactions & Payouts',
        body: "All commissions and payouts are subject to the EHB system's financial reconciliation process. The platform reserves the right to withhold payments if a user's activity is suspected, pending a Compliance audit. Payout schedules are determined by the administrative settings and your specific affiliate tier. Any discrepancies must be reported within 30 days of the Transaction date.",
      },
      {
        heading: '4. Intellectual Property',
        body: 'All content, trademarks, software architecture, and branding associated with the EHB Affiliate System remain the exclusive property of the company. Users are granted a limited, non-exclusive license to use promotional materials provided within the Campaigns Management module strictly for sales and marketing purposes.',
      },
      {
        heading: '5. Compliance & Anti-Fraud',
        body: 'EHB enforces strict 80/20 income rule (Rank R3+ must earn ≥80% from external customers, not downline self-buys), 30-day cooling-off refund window, OFAC sanctions screening, FATF Travel Rule for crypto transfers ≥$1,000, and velocity caps (50 signups per IP per 24 hours). Violations result in account suspension and potential commission reversal.',
      },
      {
        heading: '6. NOT MLM Positioning',
        body: 'EHB is explicitly NOT a multi-level marketing scheme. We are an Affiliate + Marketplace + Service Platform. Income comes only from real product/service sales — never joining fees, never recruitment-only income. Forbidden marketing phrases ("Get paid to recruit", "Investment opportunity / ROI", "Guaranteed earnings", "Passive income with no work") are auto-detected and result in account warnings.',
      },
      {
        heading: '7. Termination',
        body: "Either party may terminate this agreement at any time. Upon termination, the user's affiliate code is deactivated, but earned commissions remaining in the wallet may be withdrawn within 60 days subject to KYC verification. Earnings unclaimed beyond 60 days flow to the EHB rebate pool.",
      },
      {
        heading: '8. Governing Law',
        body: 'These Terms are governed by the laws of the Islamic Republic of Pakistan (SECP regulations). Disputes shall be resolved through binding arbitration in Islamabad, Pakistan. Cross-border disputes for UAE/India/UK/USA users shall be resolved per the respective jurisdictional posture documented in §13.1.6 of the Affiliate spec.',
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    sections: [
      {
        heading: '1. Information We Collect',
        body: 'We collect information you provide directly (registration, KYC documents, banking details), information collected automatically (device info, IP address, usage patterns), and information from third parties (KYC vendors, payment gateways).',
      },
      {
        heading: '2. How We Use Your Information',
        body: 'To provide the affiliate service, process transactions, prevent fraud, comply with legal obligations (OFAC, FATF, FBR), improve the platform, and communicate with you about your account.',
      },
      {
        heading: '3. Data Sharing',
        body: 'We do not sell your personal data. We share with KYC vendors (Jumio/Onfido/NADRA), payment gateways (JazzCash/HBL/Stripe), regulatory authorities when required, and law enforcement upon valid legal process.',
      },
      {
        heading: '4. Your Rights',
        body: 'You have the right to access, correct, delete, or export your personal data. You may withdraw consent for marketing communications at any time via Account Settings → Notification Preferences.',
      },
      {
        heading: '5. Data Retention',
        body: 'Account data is retained as long as your account is active. After account closure: financial records retained 7 years (regulatory requirement), KYC documents retained 5 years, marketing data deleted within 90 days.',
      },
    ],
  },
  kyc: {
    title: 'KYC / AML Guidelines',
    sections: [
      {
        heading: 'KYC Tier Ladder',
        body: 'Tier 0 Sandbox ($100/mo): email + phone. Tier 1 Basic ($1K/mo): + ID document. Tier 2 Standard ($10K/mo): + selfie + address proof. Tier 3 Pro ($100K/mo): + bank statement + source-of-funds. Tier 4 Institutional (unlimited): + corporate docs + audit.',
      },
      {
        heading: 'Acceptable Documents',
        body: 'Pakistan: NADRA CNIC + utility bill. UAE: Emirates ID + Etisalat bill. India: Aadhar + UPI proof. UK: Passport + bank statement. USA: Driver license + SSN + bank statement.',
      },
      {
        heading: 'AML Screening',
        body: 'All users are screened against OFAC, EU sanctions list, UN sanctions list, and PEP (Politically Exposed Persons) database during onboarding and continuously every 30 days.',
      },
      {
        heading: 'Suspicious Activity Reporting',
        body: 'EHB is required to report suspicious activity to FBR (Pakistan FIU), FinCEN (USA), Aadhar Authority (India), VARA (UAE), and FCA (UK) per local regulations.',
      },
    ],
  },
  income: {
    title: 'Income Disclosure Statement',
    sections: [
      {
        heading: 'FTC Compliance Notice',
        body: 'Per FTC Endorsement Guides, EHB publishes the following aggregate platform statistics. Individual results vary with effort, network quality, and market conditions. Most affiliates earn modest amounts. EHB makes no income guarantee.',
      },
      {
        heading: 'Earnings Distribution (Last 30 Days)',
        body: 'Total active affiliates: 12,847. Median monthly earnings: $47. Top 10% monthly: $612. Top 1% monthly: $3,240. 64.2% of affiliates earned less than $50/month. 1.0% earned more than $1,000/month.',
      },
      {
        heading: 'Income Source Mix',
        body: 'Track A direct sales (10-30%): primary. Track A network cascade L1+L2 (5%): secondary. Track B franchise cascade: only at R2+. 11 stacking bonuses: opportunistic. Real product/service sales only — no income from joining fees or pure recruitment.',
      },
    ],
  },
  cookie: {
    title: 'Cookie Policy',
    sections: [
      {
        heading: 'Cookies We Use',
        body: 'Strictly necessary (session, security), Performance (analytics), Functionality (preferences), Marketing (only with consent).',
      },
      {
        heading: 'Managing Cookies',
        body: 'You can manage cookie preferences via the cookie banner shown on first visit, or via Account Settings → Privacy → Cookie Preferences.',
      },
    ],
  },
};

export default function HelpPage() {
  const [activeDoc, setActiveDoc] = useState<DocId>('terms');
  const doc = DOC_CONTENT[activeDoc];

  return (
    <>
      <PublicNav />
      <main className="min-h-screen bg-bg pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Hero */}
          <section className="pt-8">
            <div className="mb-3 text-xs">
              <Link href="/affiliate" className="text-white/50 hover:text-purple-light">
                ← Back to Affiliate
              </Link>
            </div>
            <div className="text-center">
              <Chip tone="purple">EHB Affiliate · Help &amp; Legal Center</Chip>
              <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Resources &amp; documentation</h1>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-white/60">
                Last Updated: October 26, 2023. Browse legal documents, support topics, and KYC guidelines below.
              </p>
            </div>
          </section>

          <div className="mt-8 grid gap-6 lg:grid-cols-[260px,1fr]">
            {/* Sidebar */}
            <aside className="space-y-4">
              <PlasticCard className="p-4">
                <div className="text-[10px] uppercase tracking-widest text-white/40">
                  Legal Documents
                </div>
                <div className="mt-3 space-y-1">
                  {LEGAL_DOCS.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setActiveDoc(d.id)}
                      className={`flex w-full items-center gap-3 rounded-card px-3 py-2 text-left text-sm transition ${
                        activeDoc === d.id
                          ? 'bg-purple-light/15 text-purple-light'
                          : 'text-white/70 hover:bg-card/40'
                      }`}
                    >
                      <span className="text-lg">{d.icon}</span>
                      <span className="min-w-0 flex-1 truncate">{d.title}</span>
                      {activeDoc === d.id && <span>→</span>}
                    </button>
                  ))}
                </div>
              </PlasticCard>

              <PlasticCard className="p-4">
                <div className="text-[10px] uppercase tracking-widest text-white/40">Support</div>
                <div className="mt-3 space-y-1">
                  {SUPPORT_TOPICS.map((t) => (
                    <Link
                      key={t.title}
                      href={t.href}
                      className="group flex items-center gap-3 rounded-card px-3 py-2 text-left text-sm text-white/70 transition hover:bg-card/40"
                    >
                      <span className="text-lg">{t.icon}</span>
                      <span className="min-w-0 flex-1 truncate">{t.title.split(' ').slice(0, 3).join(' ')}</span>
                      <span className="opacity-0 transition group-hover:opacity-100">→</span>
                    </Link>
                  ))}
                </div>
              </PlasticCard>
            </aside>

            {/* Doc viewer */}
            <div>
              <PlasticCard className="overflow-hidden p-0">
                <div className="border-b border-glass px-6 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/40">
                        {LEGAL_DOCS.find((d) => d.id === activeDoc)?.icon}{' '}
                        {LEGAL_DOCS.find((d) => d.id === activeDoc)?.pages} pages · Last updated{' '}
                        {LEGAL_DOCS.find((d) => d.id === activeDoc)?.updated}
                      </div>
                      <h2 className="mt-1 text-2xl font-bold">{doc.title}</h2>
                    </div>
                    <div className="flex gap-2">
                      <Button3D variant="purple" size="sm" onClick={() => window.print()}>
                        🖨️ Print
                      </Button3D>
                      <Button3D
                        variant="green"
                        size="sm"
                        onClick={() => {
                          const text = doc.sections.map((s) => `${s.heading}\n\n${s.body}\n\n`).join('');
                          const blob = new Blob([text], { type: 'text/plain' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `${activeDoc}-${new Date().toISOString().split('T')[0]}.txt`;
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                      >
                        ⬇️ Download
                      </Button3D>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 px-6 py-6">
                  {doc.sections.map((s, i) => (
                    <section key={i}>
                      <h3 className="text-base font-bold text-purple-light">{s.heading}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/75">{s.body}</p>
                    </section>
                  ))}
                </div>

                <div className="border-t border-glass px-6 py-4 text-xs text-white/50">
                  Document version 1.0 · effective 2026-04-26 · For questions:{' '}
                  <a href="mailto:legal@ehb.com" className="text-purple-light underline">
                    legal@ehb.com
                  </a>
                </div>
              </PlasticCard>

              {/* Support topics */}
              <div className="mt-6">
                <h2 className="text-xl font-bold">Quick Support</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {SUPPORT_TOPICS.map((t) => (
                    <Link
                      key={t.title}
                      href={t.href}
                      className="group rounded-card border border-glass bg-card/40 p-4 transition hover:-translate-y-0.5 hover:shadow-lg"
                      style={{ borderLeft: `3px solid ${t.color}` }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl"
                          style={{
                            background: `${t.color}22`,
                            border: `1px solid ${t.color}55`,
                          }}
                        >
                          {t.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-semibold">{t.title}</h3>
                          <p className="mt-1 text-xs text-white/60">{t.desc}</p>
                        </div>
                        <span className="text-purple-light opacity-0 transition group-hover:opacity-100">
                          →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
