'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PublicNav } from '@/components/ui/public-nav';
import { PublicFooter } from '@/components/ui/public-footer';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';
import { Button3D } from '@/components/ui/button-3d';

/**
 * EHB Affiliate — How it works
 *
 * Standalone page with step-by-step visual walkthrough, FAQ, math examples,
 * and compliance reassurance. Reachable from /affiliate Welcome tab + footer.
 */

const STEPS = [
  {
    n: 1,
    icon: '📝',
    title: 'Sign up — free',
    desc: 'Register on EHB. No joining fee, no purchase required, no minimum age beyond legal majority. Optional sponsor code if someone referred you.',
    extras: ['Email + phone verification', 'Auto-creates affiliate wallet', 'Unique referral code generated'],
    color: '#7B6EF6',
  },
  {
    n: 2,
    icon: '🆔',
    title: 'Submit KYC (optional for browsing)',
    desc: 'KYC is needed only when you want to withdraw earnings. Tier 1 ($1K/mo) requires just an ID document. Higher tiers unlock larger limits.',
    extras: ['T0 Sandbox: $100/mo · email + phone', 'T1 Basic: $1K/mo · + ID', 'T2 Standard: $10K/mo · + selfie + address'],
    color: '#F0A030',
  },
  {
    n: 3,
    icon: '🔗',
    title: 'Share your link',
    desc: 'Use the Sharing Tools panel to post on WhatsApp, Facebook, LinkedIn, Twitter, or Email — pre-written templates with your code embedded. Use Promo Materials for branded banners.',
    extras: ['6 social channels with one-click share', '6 banner sizes (square/story/landscape...)', '4 copy templates (short/medium/long/professional)'],
    color: '#2BBFA0',
  },
  {
    n: 4,
    icon: '💵',
    title: 'Earn on real sales',
    desc: 'When someone clicks your link and makes a real purchase, you earn commission instantly to your Affiliate Wallet (80% USDT + 20% EHBGC by default).',
    extras: ['Track A: 5–30% direct + 5% network pool (L1 3% / L2 1.5% / L3 0.5%)', 'Track B: 10-level rank-gated franchise cascade (5% → 0.3%)', '11 stacking bonuses across 4 tiers'],
    color: '#38C878',
  },
  {
    n: 5,
    icon: '🚀',
    title: 'Rank up automatically',
    desc: 'As your network grows, you auto-promote through R1 → R10. Each rank unlocks more Track B levels, higher daily caps, and rank-achievement bonuses ($100 → $10,000).',
    extras: ['R3 = $100 bonus + OF2 unlock', 'R5 = $500 + Sub L1 franchise', 'R10 = $10,000 + Master + DMO endorsement'],
    color: '#EC4899',
  },
  {
    n: 6,
    icon: '💸',
    title: 'Withdraw any time',
    desc: 'Cash out via USDT TRC20 ($1 fee, <10min), JazzCash, or HBL Bank (PK pilot). Min $10. Daily caps scale with rank: R1 $100/day → R10 $50K/day.',
    extras: ['USDT TRC20: $1 flat · <10 min', 'JazzCash: 2% fee · 1–3 days', 'HBL Bank: 2% fee · 1–3 days', 'Withdrawals >$10K: 2FA + 24h hold + DMO multi-sig'],
    color: '#F0C040',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Is EHB an MLM?',
    a: 'No. EHB is explicitly NOT an MLM. We are an Affiliate + Marketplace + Service Platform. Income comes only from real product/service sales — never joining fees, never recruitment alone. We follow strict 80/20 rule (R3+ must earn ≥80% from external customers, not downline self-buys), 30-day cooling-off period, OFAC sanctions screening, and FTC Endorsement Guides compliance. Forbidden phrases ("Get paid to recruit", "Investment ROI", "Guaranteed earnings") are auto-flagged.',
  },
  {
    q: 'How much can I realistically earn?',
    a: 'Per the public Income Disclosure Statement (IDS), the median monthly earnings is around $47, top 10% earn ~$612/mo, top 1% earn ~$3,240/mo. Most affiliates earn modest amounts. Earnings depend on network quality + effort + market conditions. EHB makes no income guarantee. Use the Earnings Calculator on /affiliate to project conservatively.',
  },
  {
    q: 'What is "Track A" vs "Track B"?',
    a: 'Track A = product sales on GoSellr Marketplace. 2-layer cascade: Layer 1 is seller-defined margin (5–30%) to direct salesperson; Layer 2 is hidden 5% network pool split L1 3% / L2 1.5% / L3 0.5%. Track B = franchise sale cascade. 10-level rank-gated: R2 unlocks 2 levels, R10 reaches all 10 levels (5% → 0.3%, total ~15% across 10 levels).',
  },
  {
    q: 'Can I self-purchase to earn commission?',
    a: 'No. Self-purchase counts toward your STL (Service Trust Level) but pays ZERO downline commission. The First Sale Bonus only triggers if your referral makes an external purchase within 30 days. This is enforced by the anti-self-buy detection layer (compliance §13.1.2).',
  },
  {
    q: 'What happens if a customer refunds?',
    a: '30-day cooling-off period. If a customer refunds within that window, the corresponding commission is auto-reversed in your wallet (no clawback beyond the original commission). Beyond 90 days, no reversal. SV (sales volume) used for rank promotion also rolls back proportionally.',
  },
  {
    q: 'How are commissions computed?',
    a: 'Per industry category (6 categories spanning 38 industries). Example for "Standard" industries (GSM, Fashion, Food, etc.): direct 10% / L1 5% / L2 2%. "High-Margin" (OBS, OLS, ITS, etc.) pays direct 15% / L1 5% / L2 2%. Strategic and Commodity industries pay less. Bonuses (Matching 5%, First Sale $5, Fast Sale free package, etc.) stack on top.',
  },
  {
    q: 'What is STL?',
    a: 'Service Trust Level — a 100-point composite score (PSS + CRB + DMO points / 1.2, with min-component cap). Determines what services you can buy/sell, your commission tier, and your franchise eligibility. STL is verified on Polkadot blockchain. L1 FREE → L10 SUPREME. Most users sit at L3-L5.',
  },
  {
    q: 'Where is the program legally cleared?',
    a: 'Pakistan SECP-aligned (pilot live). UAE, India, UK, USA expansion 2026-2027 as licenses complete. Each country has feature flags so the program activates only where legally cleared. Commission rates auto-adjust to local jurisdiction caps.',
  },
  {
    q: 'Can I do this full-time?',
    a: 'Most affiliates earn modest supplementary income, not a full-time replacement. Top earners (R7+ ranks) sometimes treat it as primary income, but reaching that requires significant network-building effort over years. Realistic expectations are critical — use the Earnings Calculator with conservative inputs.',
  },
  {
    q: 'How do I cancel / leave?',
    a: 'You can stop sharing your link any time — no obligation, no exit fee. Your earned commissions stay in your wallet. If you want to delete the affiliate record entirely, contact support. Earnings unclaimed after 60 days of inactivity flow to the EHB rebate pool.',
  },
];

const MATH_EXAMPLES = [
  {
    scenario: 'Casual sharer · 3 active referrals',
    breakdown: [
      { label: 'Track A direct (10% × $200/mo)', amount: 20 },
      { label: 'L1 cascade (5% × $200/mo × 2 indirect)', amount: 20 },
      { label: 'First Sale Bonus (1 new × $5)', amount: 5 },
    ],
    total: 45,
    tone: 'common',
  },
  {
    scenario: 'Active builder · R3 · 15 directs · 80-person team',
    breakdown: [
      { label: 'Track A direct (10% × $1,200/mo)', amount: 120 },
      { label: 'L1 cascade (5% × $1,800/mo team)', amount: 90 },
      { label: 'L2 cascade (2% × $1,200/mo)', amount: 24 },
      { label: 'Matching Bonus (5% × $90)', amount: 4.5 },
      { label: 'STL upgrade bonuses (avg)', amount: 12 },
      { label: 'Fast Sale (1 free pkg ≈ $50)', amount: 50 },
    ],
    total: 300.5,
    tone: 'rare',
  },
  {
    scenario: 'Top 1% · R7 · 50 directs · 3,000-person team',
    breakdown: [
      { label: 'Track A direct (10% × $5,000/mo)', amount: 500 },
      { label: 'L1 + L2 cascade (avg 5%)', amount: 750 },
      { label: 'Track B franchise cascade (R7 = 7 levels)', amount: 980 },
      { label: 'Matching Bonus', amount: 75 },
      { label: 'Team Performance ($100K threshold met)', amount: 200 },
      { label: 'Retention uplift', amount: 80 },
      { label: 'Monthly Leader (top-10 country)', amount: 200 },
      { label: 'Super Franchise override', amount: 220 },
    ],
    total: 3005,
    tone: 'epic',
  },
];

export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <PublicNav />
      <main className="min-h-screen bg-bg pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Hero */}
          <section className="pt-10 sm:pt-16">
            <div className="text-center">
              <Chip tone="purple">EHB Affiliate · How it works</Chip>
              <h1 className="mt-4 text-3xl font-bold sm:text-5xl">
                Earn from <span className="text-teal">real product sales</span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm text-white/60 sm:text-base">
                A transparent, FTC-compliant affiliate program with strict 80/20 rule, 30-day
                cooling-off, on-chain trust ladder, and zero joining fees. Pakistan pilot live.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Link href="/affiliate">
                  <Button3D variant="purple" size="lg">
                    Open the program →
                  </Button3D>
                </Link>
                <Link href="/affiliate#welcome">
                  <Button3D variant="green" size="lg">
                    Try the calculator
                  </Button3D>
                </Link>
              </div>
            </div>

            {/* Trust strip */}
            <div className="mt-8 grid gap-2 sm:grid-cols-4">
              {[
                { k: 'NOT MLM', v: 'FTC compliant' },
                { k: '80/20 rule', v: 'Anti-pyramid' },
                { k: '30-day refund', v: 'Cooling-off' },
                { k: 'OFAC screen', v: 'Sanctions clean' },
              ].map((t) => (
                <div key={t.k} className="rounded-card border border-glass bg-card/40 p-3 text-center">
                  <div className="text-xs font-semibold text-purple-light">{t.k}</div>
                  <div className="mt-0.5 text-[10px] text-white/50">{t.v}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 6-step walkthrough */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold">The 6-step flow</h2>
            <p className="mt-1 text-sm text-white/60">From sign-up to first withdrawal — what to expect at each step.</p>

            <div className="mt-6 space-y-3">
              {STEPS.map((s) => (
                <PlasticCard key={s.n} className="p-5">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-2xl font-bold text-white shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${s.color}, ${s.color}aa)`,
                        boxShadow: `0 4px 16px ${s.color}55`,
                      }}
                    >
                      {s.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-white/40">Step {s.n}</span>
                      </div>
                      <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
                      <p className="mt-1 text-sm text-white/70">{s.desc}</p>
                      <div className="mt-3 grid gap-1.5 sm:grid-cols-3">
                        {s.extras.map((e, i) => (
                          <div
                            key={i}
                            className="rounded-card border border-glass bg-nested/40 px-3 py-1.5 text-[11px] text-white/70"
                          >
                            ✓ {e}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </PlasticCard>
              ))}
            </div>
          </section>

          {/* Math examples */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold">What can I actually earn?</h2>
            <p className="mt-1 text-sm text-white/60">
              3 illustrative scenarios — these are <strong>projections, not guarantees</strong>. Real earnings depend on network + effort + market.
            </p>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {MATH_EXAMPLES.map((m, i) => (
                <PlasticCard key={i} className="p-5">
                  <Chip tone={m.tone === 'common' ? 'purple' : m.tone === 'rare' ? 'ok' : 'amber'}>
                    {m.tone === 'common' ? 'Casual' : m.tone === 'rare' ? 'Active' : 'Top earner'}
                  </Chip>
                  <h3 className="mt-2 text-sm font-bold">{m.scenario}</h3>
                  <div className="mt-3 space-y-1">
                    {m.breakdown.map((b, j) => (
                      <div
                        key={j}
                        className="flex items-baseline justify-between text-[11px] text-white/70"
                      >
                        <span className="truncate">{b.label}</span>
                        <span className="ml-2 shrink-0 font-bold tabular-nums text-teal">
                          ${b.amount.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 border-t border-glass pt-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-white/50">Monthly total</span>
                      <span className="text-2xl font-bold tabular-nums text-teal">
                        ${m.total.toFixed(0)}
                      </span>
                    </div>
                    <div className="mt-1 text-[10px] text-white/40">
                      Annual: ${(m.total * 12).toFixed(0)}
                    </div>
                  </div>
                </PlasticCard>
              ))}
            </div>

            <p className="mt-4 text-center text-[11px] text-white/40">
              Per IDS: median is ~$47/mo. Most affiliates earn modest amounts. EHB makes no income guarantee.
            </p>
          </section>

          {/* FAQ */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold">Frequently asked questions</h2>

            <div className="mt-6 space-y-2">
              {FAQ_ITEMS.map((f, i) => {
                const open = openFaq === i;
                return (
                  <PlasticCard key={i} className="overflow-hidden p-0">
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition hover:bg-card/40"
                    >
                      <span className="text-sm font-medium">{f.q}</span>
                      <span
                        className={`shrink-0 text-purple-light transition-transform ${open ? 'rotate-90' : ''}`}
                      >
                        →
                      </span>
                    </button>
                    {open && (
                      <div className="border-t border-glass px-5 py-4 text-sm leading-relaxed text-white/70">
                        {f.a}
                      </div>
                    )}
                  </PlasticCard>
                );
              })}
            </div>
          </section>

          {/* Compliance card */}
          <section className="mt-12">
            <PlasticCard className="border-2 border-amber/30 bg-amber/5 p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">⚖️</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold">Legal &amp; compliance posture</h3>
                  <p className="mt-2 text-sm text-white/70">
                    EHB is <strong>NOT an MLM</strong>. We are an Affiliate + Marketplace + Service Platform.
                    Income comes only from real product/service sales.
                  </p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {[
                      'No income from joining fees',
                      'No income from pure recruitment',
                      'No fake / overpriced / empty packages',
                      '80/20 income rule (R3+ must earn ≥80% external)',
                      '30-day cooling-off refund window',
                      'OFAC + FATF compliance',
                      'Income Disclosure Statement (IDS) public',
                      'Forbidden phrases auto-flagged',
                    ].map((rule, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-white/70">
                        <span className="text-teal">✓</span>
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link href="/affiliate#compliance">
                      <button className="rounded-chip border border-glass bg-card/60 px-3 py-1.5 text-xs hover:border-amber">
                        🛡️ View IDS →
                      </button>
                    </Link>
                    <a
                      href="/api/compliance/info"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-chip border border-glass bg-card/60 px-3 py-1.5 text-xs hover:border-amber"
                    >
                      📄 Compliance docs →
                    </a>
                  </div>
                </div>
              </div>
            </PlasticCard>
          </section>

          {/* Final CTA */}
          <section className="mt-12 text-center">
            <h2 className="text-2xl font-bold">Ready to start?</h2>
            <p className="mt-2 text-sm text-white/60">Free to join. No purchase required. Cancel any time.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Link href="/affiliate">
                <Button3D variant="purple" size="lg">
                  Join the program →
                </Button3D>
              </Link>
              <Link href="/affiliate/marketplace">
                <Button3D variant="green" size="lg">
                  Browse Marketplace
                </Button3D>
              </Link>
            </div>
          </section>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
