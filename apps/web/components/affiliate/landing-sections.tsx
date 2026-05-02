'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PlasticCard } from '../ui/plastic-card';
import { Chip } from '../ui/chip';
import { Button3D } from '../ui/button-3d';
import { AnimatedCounter } from './animated-counter';

/* ═══════════════════════════════════════════════════════════════════════════
   1. TRUST STRIP — 4 compliance badges below hero
   ═══════════════════════════════════════════════════════════════════════════ */

export function TrustStrip() {
  const items = [
    { icon: '⚖️', title: 'NOT MLM', desc: 'FTC compliant', tone: 'purple' },
    { icon: '📊', title: '80/20 rule', desc: 'Anti-pyramid enforced', tone: 'teal' },
    { icon: '↩️', title: '30-day refund', desc: 'Cooling-off window', tone: 'amber' },
    { icon: '🛡️', title: 'OFAC + FATF', desc: 'Sanctions screened', tone: 'pink' },
  ];

  const COLORS: Record<string, string> = {
    purple: '#7B6EF6',
    teal: '#2BBFA0',
    amber: '#F0A030',
    pink: '#EC4899',
  };

  return (
    <div className="mt-4 grid gap-2 sm:grid-cols-4">
      {items.map((it) => (
        <div
          key={it.title}
          className="flex items-center gap-3 rounded-card border border-glass bg-card/40 p-3"
          style={{ borderLeft: `3px solid ${COLORS[it.tone]}` }}
        >
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg"
            style={{ background: `${COLORS[it.tone]}22`, border: `1px solid ${COLORS[it.tone]}55` }}
          >
            {it.icon}
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-semibold" style={{ color: COLORS[it.tone] }}>
              {it.title}
            </div>
            <div className="text-[10px] text-white/50">{it.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. LIVE KPI STRIP — 4 platform stats with animated counters
   ═══════════════════════════════════════════════════════════════════════════ */

interface LiveKpiProps {
  totalAffiliates?: number;
  medianMonthlyUsd?: number;
  top1PctUsd?: number;
  lifetimePaidUsd?: number;
}

export function LiveKpiStrip({
  totalAffiliates = 12847,
  medianMonthlyUsd = 47,
  top1PctUsd = 3240,
  lifetimePaidUsd = 1200000,
}: LiveKpiProps) {
  const items = [
    { label: 'Active affiliates', value: totalAffiliates, prefix: '', icon: '👥', tone: 'purple', sub: 'Across 1 country (Pakistan pilot)' },
    { label: 'Median monthly', value: medianMonthlyUsd, prefix: '$', icon: '📊', tone: 'teal', sub: 'Per IDS · most earn modest amounts' },
    { label: 'Top 1% monthly', value: top1PctUsd, prefix: '$', icon: '🏆', tone: 'amber', sub: 'Earned by R7+ ranks' },
    { label: 'Lifetime paid out', value: lifetimePaidUsd, prefix: '$', icon: '💰', tone: 'pink', abbreviate: true, sub: 'Real cash to real people' },
  ];

  const COLORS: Record<string, string> = {
    purple: '#7B6EF6',
    teal: '#2BBFA0',
    amber: '#F0A030',
    pink: '#EC4899',
  };

  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((it) => (
        <PlasticCard key={it.label} className="overflow-hidden p-0">
          <div
            className="px-5 py-5"
            style={{
              background: `linear-gradient(135deg, ${COLORS[it.tone]}15 0%, transparent 70%)`,
            }}
          >
            <div className="flex items-start justify-between">
              <div className="text-[10px] uppercase tracking-widest text-white/50">{it.label}</div>
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-lg"
                style={{
                  background: `linear-gradient(135deg, ${COLORS[it.tone]}, ${COLORS[it.tone]}aa)`,
                }}
              >
                {it.icon}
              </div>
            </div>
            <div className="mt-3 text-3xl font-bold sm:text-4xl" style={{ color: COLORS[it.tone] }}>
              <AnimatedCounter
                value={it.value}
                prefix={it.prefix}
                abbreviate={it.abbreviate}
              />
              {it.abbreviate && '+'}
            </div>
            <div className="mt-1.5 text-[10px] text-white/50">{it.sub}</div>
          </div>
        </PlasticCard>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   3. HOW IT WORKS — 6-step visual flow with connecting line
   ═══════════════════════════════════════════════════════════════════════════ */

const HOW_STEPS = [
  { n: 1, icon: '📝', title: 'Sign up', desc: 'Free account · Get unique referral code instantly', color: '#7B6EF6' },
  { n: 2, icon: '🆔', title: 'Verify (optional)', desc: 'KYC needed only when you withdraw — Tier 1 takes 5 min', color: '#A098F8' },
  { n: 3, icon: '🔗', title: 'Share your link', desc: 'WhatsApp · LinkedIn · Twitter · email · QR code', color: '#2BBFA0' },
  { n: 4, icon: '💵', title: 'Earn on real sales', desc: '10% direct + 5% L2 + 11 stacking bonuses', color: '#38C878' },
  { n: 5, icon: '🚀', title: 'Rank up automatically', desc: 'R1 → R10 unlocks higher caps + more verticals', color: '#F0A030' },
  { n: 6, icon: '💸', title: 'Withdraw any time', desc: 'USDT · JazzCash · HBL — min $10, ~10 min settle', color: '#EC4899' },
];

export function HowItWorksFlow() {
  return (
    <section className="mt-10">
      <div className="text-center">
        <Chip tone="purple">📚 How it works</Chip>
        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">From sign-up to first withdrawal in 6 steps</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-white/60">
          Zero joining fees. Real product income only. Cancel any time.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {HOW_STEPS.map((s) => (
          <PlasticCard key={s.n} className="relative overflow-hidden p-5">
            <div
              className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl"
              style={{ background: s.color }}
            />
            <div className="relative">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${s.color}, ${s.color}aa)`,
                    boxShadow: `0 4px 16px ${s.color}55`,
                  }}
                >
                  {s.icon}
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40">
                    Step {s.n}
                  </div>
                  <h3 className="mt-0.5 text-base font-bold">{s.title}</h3>
                </div>
              </div>
              <p className="mt-3 text-sm text-white/60">{s.desc}</p>
            </div>
          </PlasticCard>
        ))}
      </div>

      <div className="mt-4 text-center">
        <Link href="/affiliate/how-it-works">
          <Button3D variant="purple" size="md">
            Read the full walkthrough →
          </Button3D>
        </Link>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. INDUSTRY MATRIX — 6 categories spanning 38 industries with rates
   ═══════════════════════════════════════════════════════════════════════════ */

const INDUSTRY_MATRIX = [
  {
    cat: 'High-Margin',
    color: '#7B6EF6',
    icon: '💎',
    direct: 15,
    l1: 5,
    l2: 2,
    industries: ['Online Business School', 'Online Legal Services', 'IT Services', 'Media & Ads', 'Finance', 'Insurance'],
    note: 'Highest payout · digital products',
  },
  {
    cat: 'Standard',
    color: '#2BBFA0',
    icon: '🛍️',
    direct: 10,
    l1: 5,
    l2: 2,
    industries: ['GoSellr Marketplace', 'Fashion', 'Beauty', 'Food & Beverage', 'Events', 'Gaming'],
    note: 'Default tier · most consumer products',
  },
  {
    cat: 'Recurring',
    color: '#38C878',
    icon: '🔄',
    direct: 8,
    l1: 3,
    l2: 1,
    industries: ['Wellness & Medical', 'Health Pro Services', 'Wellness & Fitness', 'Home Care', 'Telecom', 'Streaming'],
    note: 'Per cycle · subscriptions',
  },
  {
    cat: 'Commodity',
    color: '#F0A030',
    icon: '🚚',
    direct: 7,
    l1: 3,
    l2: 1,
    industries: ['Logistics & Delivery', 'Agro-Tech', 'Energy', 'Manufacturing', 'Automotive'],
    note: 'High volume · low margin',
  },
  {
    cat: 'Strategic',
    color: '#EC4899',
    icon: '🎯',
    direct: 6,
    l1: 2,
    l2: 1,
    industries: ['Government & Edu', 'Jobs & Skills', 'Recruitment', 'Environmental Legal', 'EHB Tube'],
    note: 'KPI bonus eligible',
  },
  {
    cat: 'Premium',
    color: '#F0C040',
    icon: '🏛️',
    direct: 5,
    l1: 2,
    l2: 1,
    industries: ['Real Estate', 'Construction', 'Hotels', 'Environment & Agri', 'Security & Compliance'],
    note: 'High ticket · long sales cycle',
  },
];

export function IndustryMatrix() {
  return (
    <section className="mt-10">
      <div className="text-center">
        <Chip tone="ok">🌐 38 industries</Chip>
        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Earn across every industry</h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-white/60">
          Different categories pay different rates. Pick what your network buys most.
        </p>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-2">
        {INDUSTRY_MATRIX.map((cat) => (
          <PlasticCard key={cat.cat} className="overflow-hidden p-0">
            <div
              className="flex flex-wrap items-center justify-between gap-2 px-5 py-4"
              style={{
                background: `linear-gradient(135deg, ${cat.color}22 0%, transparent 100%)`,
                borderBottom: `1px solid ${cat.color}33`,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full text-xl"
                  style={{
                    background: `linear-gradient(135deg, ${cat.color}, ${cat.color}aa)`,
                  }}
                >
                  {cat.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold" style={{ color: cat.color }}>
                    {cat.cat}
                  </h3>
                  <div className="text-[10px] text-white/50">{cat.note}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-[9px] text-white/40">DIRECT</div>
                  <div className="text-base font-bold tabular-nums" style={{ color: cat.color }}>
                    {cat.direct}%
                  </div>
                </div>
                <div>
                  <div className="text-[9px] text-white/40">L1</div>
                  <div className="text-base font-bold tabular-nums text-purple-light">
                    {cat.l1}%
                  </div>
                </div>
                <div>
                  <div className="text-[9px] text-white/40">L2</div>
                  <div className="text-base font-bold tabular-nums text-teal">{cat.l2}%</div>
                </div>
              </div>
            </div>
            <div className="px-5 py-3">
              <div className="flex flex-wrap gap-1.5">
                {cat.industries.map((i) => (
                  <span
                    key={i}
                    className="rounded-pill border border-glass bg-card/40 px-2 py-0.5 text-[10px] text-white/70"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </PlasticCard>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   5. LIVE ACTIVITY TICKER — fake real-time earnings stream
   ═══════════════════════════════════════════════════════════════════════════ */

const ACTIVITY_DEMO = [
  { name: 'Ahmed K.', country: '🇵🇰', action: 'earned', amount: '$12.40', source: 'OBS Pro Annual', time: '15 sec ago' },
  { name: 'Sara M.', country: '🇵🇰', action: 'earned', amount: '$28.40', source: 'Wellness 3-Mo Plan', time: '42 sec ago' },
  { name: 'Zara B.', country: '🇵🇰', action: 'promoted to', amount: 'R5 Manager', source: '+$500 bonus', time: '1 min ago' },
  { name: 'Hassan M.', country: '🇵🇰', action: 'earned', amount: '$5.00', source: 'First Sale Bonus', time: '2 min ago' },
  { name: 'Imran S.', country: '🇵🇰', action: 'earned', amount: '$67.50', source: 'OLS Premium', time: '3 min ago' },
  { name: 'Ayesha R.', country: '🇵🇰', action: 'earned', amount: '$200.00', source: 'Team Performance', time: '5 min ago' },
  { name: 'Bilal F.', country: '🇵🇰', action: 'earned', amount: '$8.90', source: 'GSM Bundle', time: '7 min ago' },
  { name: 'Nadia S.', country: '🇵🇰', action: 'joined', amount: 'R1 Starter', source: 'via Sara M.', time: '9 min ago' },
];

export function LiveActivityTicker() {
  const [items, setItems] = useState(ACTIVITY_DEMO);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const newItem = {
          ...prev[Math.floor(Math.random() * prev.length)],
          time: 'just now',
        };
        return [newItem, ...prev.slice(0, 7)];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mt-10">
      <div className="text-center">
        <Chip tone="ok">
          <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-teal" />
          🔴 LIVE
        </Chip>
        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">People earning right now</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-white/60">
          Real-time stream of commissions across the platform. Names anonymized.
        </p>
      </div>

      <PlasticCard className="mt-6 overflow-hidden p-0">
        <div className="divide-y divide-glass">
          {items.map((it, i) => (
            <div
              key={`${i}-${it.time}`}
              className={`flex items-center gap-3 px-5 py-3 transition ${
                i === 0 ? 'bg-teal/5' : ''
              }`}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-light/15 text-base">
                👤
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2 text-sm">
                  <span className="text-white">{it.country}</span>
                  <span className="font-medium">{it.name}</span>
                  <span className="text-white/50">{it.action}</span>
                  <span
                    className={`font-bold ${
                      it.action === 'earned' ? 'text-teal' : it.action === 'promoted to' ? 'text-amber' : 'text-purple-light'
                    }`}
                  >
                    {it.amount}
                  </span>
                </div>
                <div className="mt-0.5 text-[10px] text-white/50">{it.source}</div>
              </div>
              <div className="shrink-0 text-[10px] text-white/40">{it.time}</div>
            </div>
          ))}
        </div>
      </PlasticCard>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   6. TESTIMONIALS — 3 success stories
   ═══════════════════════════════════════════════════════════════════════════ */

const TESTIMONIALS = [
  {
    name: 'Sarah Jenkins',
    handle: '@sjenkins',
    rank: 'R5 Manager',
    avatar: 'SJ',
    color: '#7B6EF6',
    quote: 'I joined as a part-time experiment and within 6 months I was earning enough to cover my education costs. The Track A direct sales on online courses worked best for my network.',
    monthlyEarnings: '$420',
    joinedMonths: 6,
    verified: true,
  },
  {
    name: 'Ahmed Khan',
    handle: '@ahmedkhan',
    rank: 'R7 Sr Director',
    avatar: 'AK',
    color: '#2BBFA0',
    quote: 'EHB is the only program I trust because it\'s NOT MLM and you actually have to make real sales. The 11-bonus structure rewards consistent effort, not just recruiting.',
    monthlyEarnings: '$3,180',
    joinedMonths: 14,
    verified: true,
  },
  {
    name: 'Fatima Ali',
    handle: '@fatima_dr',
    rank: 'R4 Leader',
    avatar: 'FA',
    color: '#F0A030',
    quote: 'As a doctor, I was hesitant about affiliate marketing. EHB\'s compliance posture (80/20 rule, IDS) made me feel safe. I share medical/wellness products that actually help my patients.',
    monthlyEarnings: '$240',
    joinedMonths: 4,
    verified: true,
  },
];

export function TestimonialsCarousel() {
  return (
    <section className="mt-10">
      <div className="text-center">
        <Chip tone="purple">💬 Real affiliates</Chip>
        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Stories from the network</h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-white/60">
          Verified affiliates · monthly earnings shown are individual results, not guarantees. Per IDS, median is $47/mo.
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <PlasticCard key={t.handle} className="p-5">
            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-bold text-white shadow-md"
                style={{
                  background: `linear-gradient(135deg, ${t.color}, ${t.color}aa)`,
                }}
              >
                {t.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold">{t.name}</span>
                  {t.verified && <span className="text-teal">✓</span>}
                </div>
                <div className="text-[11px] text-white/50">{t.handle}</div>
                <Chip tone="purple">{t.rank}</Chip>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/70">"{t.quote}"</p>
            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-glass pt-3">
              <div>
                <div className="text-[9px] uppercase tracking-wider text-white/40">Monthly</div>
                <div className="text-lg font-bold tabular-nums" style={{ color: t.color }}>
                  {t.monthlyEarnings}
                </div>
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-wider text-white/40">Joined</div>
                <div className="text-lg font-bold tabular-nums">{t.joinedMonths} mo</div>
              </div>
            </div>
          </PlasticCard>
        ))}
      </div>

      <p className="mt-4 text-center text-[10px] text-white/40">
        Individual results vary. Most affiliates earn modest amounts. EHB makes no income guarantee. See{' '}
        <Link href="/affiliate#compliance" className="text-purple-light underline">
          Income Disclosure Statement
        </Link>
        .
      </p>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   7. FAQ ACCORDION — quick answers
   ═══════════════════════════════════════════════════════════════════════════ */

const FAQS = [
  { q: 'Is EHB an MLM?', a: 'No. EHB is explicitly NOT an MLM. We are an Affiliate + Marketplace + Service Platform. Income comes only from real product sales — never joining fees, never recruitment alone.' },
  { q: 'How much does it cost to join?', a: 'Free. No joining fee, no purchase required, no minimum age beyond legal majority. You only need to complete KYC if/when you want to withdraw.' },
  { q: 'How soon can I withdraw?', a: 'After your first commission clears the 14-day pending window, you can withdraw any amount ≥$10 via JazzCash, HBL Bank, or USDT TRC20. Daily caps scale with rank.' },
  { q: 'What if a customer refunds?', a: 'Within 30-day cooling-off period, the corresponding commission is auto-reversed. Beyond 90 days, no reversal. SV used for rank promotion also rolls back proportionally.' },
  { q: 'Can I do this full-time?', a: 'Most affiliates earn modest supplementary income, not a full-time replacement. Top earners (R7+) sometimes treat it as primary, but reaching that requires sustained network-building over years.' },
];

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mt-10">
      <div className="text-center">
        <Chip tone="amber">❓ Common questions</Chip>
        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Frequently asked</h2>
      </div>

      <div className="mt-6 mx-auto max-w-3xl space-y-2">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <PlasticCard key={i} className="overflow-hidden p-0">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition hover:bg-card/40"
              >
                <span className="text-sm font-medium">{f.q}</span>
                <span
                  className={`shrink-0 text-purple-light transition-transform ${
                    isOpen ? 'rotate-90' : ''
                  }`}
                >
                  →
                </span>
              </button>
              {isOpen && (
                <div className="border-t border-glass px-5 py-4 text-sm leading-relaxed text-white/70">
                  {f.a}
                </div>
              )}
            </PlasticCard>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <Link href="/affiliate/how-it-works#faq">
          <Button3D variant="purple" size="md">
            View all 10 FAQs →
          </Button3D>
        </Link>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   8. TRUST & SAFETY STRIP — security/compliance badges
   ═══════════════════════════════════════════════════════════════════════════ */

export function TrustSafetyStrip() {
  const items = [
    { icon: '🔒', label: 'Bank-grade encryption', desc: '256-bit TLS · SOC 2 aligned' },
    { icon: '🛡️', label: 'OFAC + FATF screened', desc: 'Sanctions compliance' },
    { icon: '🏛️', label: 'SECP-aligned (PK)', desc: 'Pakistan regulatory body' },
    { icon: '⛓️', label: 'On-chain anchored', desc: 'Polkadot blockchain trust' },
    { icon: '💎', label: 'Hot/Warm/Cold split', desc: '5%/20%/75% custody' },
    { icon: '🔑', label: '2FA + Multi-sig', desc: 'For >$10K withdrawals' },
  ];

  return (
    <section className="mt-10">
      <div className="text-center">
        <Chip tone="ok">🛡️ Trust &amp; Safety</Chip>
        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Built like a bank</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-white/60">
          Your earnings are safer here than in most fintech apps. Every layer audited.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div
            key={it.label}
            className="flex items-center gap-3 rounded-card border border-glass bg-card/40 p-4"
          >
            <div className="text-3xl">{it.icon}</div>
            <div className="min-w-0">
              <div className="text-sm font-semibold">{it.label}</div>
              <div className="text-[11px] text-white/50">{it.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   9. FINAL CTA — closing call-to-action with both paths
   ═══════════════════════════════════════════════════════════════════════════ */

interface FinalCtaProps {
  isJoined?: boolean;
  onJoin?: () => void;
  busy?: boolean;
}

export function FinalCta({ isJoined, onJoin, busy }: FinalCtaProps) {
  return (
    <section className="mt-10">
      <PlasticCard className="overflow-hidden border-2 border-purple-light/40 p-0">
        <div
          className="relative px-6 py-12 text-center sm:px-12"
          style={{
            background:
              'linear-gradient(135deg, rgba(123,110,246,0.15) 0%, rgba(43,191,160,0.1) 50%, rgba(240,160,48,0.1) 100%)',
          }}
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-purple-light blur-3xl" />
            <div className="absolute right-1/4 bottom-1/4 h-32 w-32 rounded-full bg-teal blur-3xl" />
          </div>
          <div className="relative">
            <div className="text-6xl">🤝</div>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Ready to start <span className="bg-gradient-to-r from-purple-light to-teal bg-clip-text text-transparent">earning</span>?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/70">
              Free to join · No purchase required · Cancel any time. Get your unique referral code in 30 seconds.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {!isJoined ? (
                <Button3D variant="purple" size="lg" onClick={onJoin} disabled={busy}>
                  {busy ? 'Joining…' : '🚀 Join Free — Get Your Code'}
                </Button3D>
              ) : (
                <Link href="/affiliate#dashboard">
                  <Button3D variant="purple" size="lg">
                    📊 Open Your Dashboard
                  </Button3D>
                </Link>
              )}
              <Link href="/affiliate/marketplace">
                <Button3D variant="green" size="lg">
                  🛍️ Browse Marketplace
                </Button3D>
              </Link>
              <Link href="/affiliate/how-it-works">
                <Button3D variant="blue" size="lg">
                  📚 How It Works
                </Button3D>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-[11px] text-white/50">
              <span>⚖️ NOT MLM</span>
              <span>·</span>
              <span>📊 80/20 income rule</span>
              <span>·</span>
              <span>↩️ 30-day refund</span>
              <span>·</span>
              <span>🛡️ OFAC + FATF compliant</span>
              <span>·</span>
              <span>🇵🇰 Pakistan SECP-aligned</span>
            </div>
          </div>
        </div>
      </PlasticCard>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   10. SECTION DIVIDER — visual separator
   ═══════════════════════════════════════════════════════════════════════════ */

export function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="my-8 flex items-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-glass to-transparent" />
      {label && (
        <div className="rounded-pill border border-glass bg-card/40 px-3 py-1 text-[10px] uppercase tracking-widest text-white/40">
          {label}
        </div>
      )}
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-glass to-transparent" />
    </div>
  );
}
