import Link from 'next/link';
import { PublicNav } from '@/components/ui/public-nav';
import { PublicFooter } from '@/components/ui/public-footer';
import { AffiliateCard } from '@/components/ui/affiliate-card';

const pillars = [
  {
    title: 'GoSellr Marketplace',
    subtitle: 'STL-ranked E-commerce',
    desc: 'Buy with escrow protection. Every product carries a composite trust score.',
    href: '/gosellr',
    accent: 'from-[#2BBFA0] to-[#38C878]',
    icon: '🛒',
  },
  {
    title: 'DMO Dashboard',
    subtitle: 'Governance Brain',
    desc: '19 modules. Approvals, STL leaderboard, live KPIs — all in one control room.',
    href: '/dmo',
    accent: 'from-[#7B6EF6] to-[#A098F8]',
    icon: '🏛️',
  },
  {
    title: 'Franchise Network',
    subtitle: '5-Level + 4-Tier Online',
    desc: 'Own a territory or run an online franchise. 40/25/20/15 revenue split.',
    href: '/franchise',
    accent: 'from-[#F0A030] to-[#F8B830]',
    icon: '🌐',
  },
  {
    title: 'AI Marketplace',
    subtitle: '7 Flagship Modules',
    desc: 'Lawyer, Diagnosis, Tutor, Resume, Business Advisor, Fraud, Recommendation.',
    href: '/ai-marketplace',
    accent: 'from-[#A098F8] to-[#2BBFA0]',
    icon: '🤖',
  },
  {
    title: '38 Industries',
    subtitle: 'Education · Health · Business',
    desc: 'WMS, OLS, HPS, AGTS, ITS, SOT — all on the same trust ladder.',
    href: '/industries',
    accent: 'from-[#3b82f6] to-[#7B6EF6]',
    icon: '🌍',
  },
  {
    title: 'Affiliate Program',
    subtitle: 'Track A · 2-Layer · 11 Bonuses',
    desc: 'Earn 10% direct + 5% L2 on real product sales + First Sale, STL & Fast Sale bonuses.',
    href: '/affiliate',
    accent: 'from-[#ec4899] to-[#7B6EF6]',
    icon: '🤝',
  },
];

const FLOW = [
  { step: 1, title: 'Register', desc: 'Email + password — 30 seconds', icon: '✍️', color: '#7B6EF6' },
  { step: 2, title: 'Verify identity (PSS)', desc: 'Upload CNIC + liveness → STL L3 unlocked', icon: '🛡️', color: '#A098F8' },
  { step: 3, title: 'Your STL score assigned', desc: 'Composite of PSS + CRB + DMO', icon: '⭐', color: '#2BBFA0' },
  { step: 4, title: 'Browse / buy / sell / earn', desc: 'GoSellr, AI services, Franchise, or rider', icon: '🛍️', color: '#38C878' },
  { step: 5, title: 'Orders flow with escrow', desc: 'Funds locked until delivery confirmed', icon: '💰', color: '#F0A030' },
  { step: 6, title: 'Commission auto-settles', desc: '70% seller + 10% rider + 10% EHB + 10% franchise', icon: '📈', color: '#F8B830' },
  { step: 7, title: 'Disputes via DMO', desc: 'Complaint → SLA timer → resolution + penalty', icon: '⚖️', color: '#ec4899' },
  { step: 8, title: 'STL grows, unlocks more', desc: 'Better ranking, lower fees, priority', icon: '🚀', color: '#F05858' },
];

const AUDIENCES = [
  { who: 'Buyer', icon: '🛒', path: 'Register → PSS L3 → Browse GoSellr → Checkout with escrow → Review', gradient: 'from-[#06b6d4] to-[#0891b2]' },
  { who: 'Seller', icon: '🏪', path: 'Register → PSS L3+ → List products → Fulfill orders → Earn 70%', gradient: 'from-[#8b5cf6] to-[#7c3aed]' },
  { who: 'Service Provider', icon: '🛠️', path: 'Register → PSS + CRB exam → List services → Build reputation', gradient: 'from-[#2BBFA0] to-[#38C878]' },
  { who: 'Rider', icon: '🛵', path: 'Register → PSS L3+ CRB vehicle → Go online → 10% per delivery', gradient: 'from-[#F0A030] to-[#F8B830]' },
  { who: 'Franchisee', icon: '🌐', path: 'Register → PSS L5 → Apply Sub L1–L10 → $200–$unlimited/day cap', gradient: 'from-[#7B6EF6] to-[#A098F8]' },
  { who: 'Affiliate', icon: '🤝', path: 'Register → Join → Share code → Earn 5 levels deep (up to 5%)', gradient: 'from-[#ec4899] to-[#db2777]' },
];

const SYSTEMS = [
  { name: 'PSS', full: 'Personal Security System', role: 'Identity + KYC', cap: 'L5 ADVANCED', desc: 'Verifies who you are. OCR + liveness + AML.', href: '/dmo/pss' },
  { name: 'CRB', full: 'Central Record Blockchain', role: 'Credentials + exams', cap: 'L9 ELITE', desc: 'Verifies what you can do. Hashed on Polkadot.', href: '/dmo/crb' },
  { name: 'DMO', full: 'Decentralized Management Office', role: 'Governance + activity', cap: 'L10 SUPREME', desc: 'Activity + behavior + performance score.', href: '/dmo' },
  { name: 'STL', full: 'Service Trust Level', role: 'Composite score', cap: '—', desc: 'Final trust ladder L1 FREE → L10 SUPREME.', href: '/dmo/stl' },
];

const FAQ = [
  {
    q: 'What is EHB in one line?',
    a: 'A global super-app unifying 38 industries on a single trust ladder. Every user, seller, product, and franchise gets an STL score (L1 FREE → L10 SUPREME) built from identity (PSS), credentials (CRB), and behavior (DMO).',
  },
  {
    q: 'Why do I need to verify my identity?',
    a: 'PSS (Personal Security System) prevents fraud at scale. A verified L3+ user can transact, file complaints, and earn. It takes about 2 minutes and unlocks everything.',
  },
  {
    q: 'What is EHBGC?',
    a: 'EHB Global Coin — our platform token. Used for wallet locks (per STL level), franchise activation deposits, and premium service access. 1 EHBGC ≈ 1 USD in our demo (mainnet in Phase 4).',
  },
  {
    q: 'How does the MIN-chain rule work?',
    a: 'For any product, the final displayed STL = MIN(product STL, seller STL, company STL, owner STL). One weak link caps the chain. This prevents trust-spoofing.',
  },
  {
    q: 'Can I earn without selling anything?',
    a: 'Yes — become an Affiliate (refer users, earn 5% direct + 0.5–3% across 5 levels), a Rider (10% per delivery), or a Franchisee (territorial commission).',
  },
  {
    q: 'What happens if someone scams me?',
    a: 'File a complaint on your order page. DMO resolves per tier SLA (2h for fraud → 72h for quality issue). Upheld complaints trigger an automatic penalty ladder on the offender: warning → fine → STL drop → suspension.',
  },
  {
    q: 'Is my money safe?',
    a: 'Every order uses escrow. Funds only release when you confirm delivery. Disputes freeze escrow until DMO rules.',
  },
  {
    q: 'What about regulations?',
    a: 'PSS is OFAC/UN-sanctions-ready. CRB certifications cross-check with professional boards. All major events (KYC, certs, settlements) anchored on Polkadot for audit immutability.',
  },
];

export default function HomePage() {
  return (
    <>
      <PublicNav />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-glass">
          <div className="absolute inset-0 bg-gradient-to-br from-[#13162A] via-[#0C0E1A] to-[#1A1D33] opacity-60" />
          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-28">
            <div className="inline-block rounded-chip border border-glass bg-card/60 px-3 py-1 text-[10px] tracking-wide text-purple-light sm:text-xs">
              EHB Technologies (Pvt.) Ltd. · Founded 2008 · Islamabad
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:mt-6 sm:text-5xl md:text-6xl">
              One Platform.
              <br />
              <span className="bg-gradient-to-r from-[#7B6EF6] via-[#A098F8] to-[#2BBFA0] bg-clip-text text-transparent">
                38 Industries.
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/70 sm:mt-6 sm:text-lg">
              A single super-app that unifies Education, Health, and Business across 38 verticals.
              Every user, seller, product, and franchise carries a composite trust score
              (L1 FREE → L10 SUPREME). AI assists. Blockchain anchors. DMO governs.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
              <Link
                href="/register"
                className="flex-1 rounded-card bg-gradient-to-r from-[#7B6EF6] to-[#A098F8] px-6 py-3 text-center text-sm font-semibold text-white shadow-lg transition hover:translate-y-[-2px] sm:flex-none"
              >
                Get Started — 2 minutes
              </Link>
              <Link
                href="/how-it-works"
                className="flex-1 rounded-card border border-glass bg-card/60 px-6 py-3 text-center text-sm font-semibold text-white/90 backdrop-blur-sm transition hover:border-purple-light sm:flex-none"
              >
                See how it works →
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-[11px] text-white/50 sm:text-xs">
              <span>🏛️ AI + Polkadot trust backbone</span>
              <span>·</span>
              <span>🤝 Escrow on every order</span>
              <span>·</span>
              <span>📜 On-chain credential hashing</span>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
             AFFILIATE QUICK ACTIONS STRIP (per Affiliate.md spec §6 + §12.3)
             8 prominent buttons covering all primary affiliate flows
             ═══════════════════════════════════════════════════════════════ */}
        <section className="border-b border-glass bg-gradient-to-br from-[#7B6EF6]/10 via-transparent to-[#2BBFA0]/10">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
            <div className="text-center">
              <div className="inline-block rounded-chip border border-purple-light/30 bg-purple-light/10 px-3 py-1 text-[10px] uppercase tracking-widest text-purple-light sm:text-xs">
                EHB Affiliate Program · v3.12
              </div>
              <h2 className="mt-3 text-2xl font-bold sm:text-3xl md:text-4xl">
                Earn from <span className="bg-gradient-to-r from-[#7B6EF6] to-[#2BBFA0] bg-clip-text text-transparent">real product sales</span>
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-xs text-white/60 sm:text-sm">
                10% direct + 5% L2 + 11 bonuses + Track B 10-level franchise cascade · No income from joining fees · NOT MLM
              </p>
            </div>

            {/* 8-button affiliate action grid — every primary CTA from spec */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {/* 1. Join Affiliate Program — primary CTA */}
              <Link
                href="/affiliate#join"
                className="group flex flex-col items-start gap-2 rounded-card border-2 border-purple-light/40 bg-gradient-to-br from-purple-light/15 to-purple-light/5 p-4 transition hover:-translate-y-0.5 hover:border-purple-light hover:shadow-lg hover:shadow-purple-light/20"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-light/20 text-xl">
                  🤝
                </div>
                <div className="text-sm font-bold text-purple-light">Join Affiliate</div>
                <div className="text-[10px] text-white/60">Free · 30 seconds · Get unique referral code</div>
                <div className="mt-auto text-[10px] text-purple-light group-hover:translate-x-1 transition">
                  Start earning →
                </div>
              </Link>

              {/* 2. Browse Marketplace (DAM) */}
              <Link
                href="/affiliate/marketplace"
                className="group flex flex-col items-start gap-2 rounded-card border-2 border-teal/40 bg-gradient-to-br from-teal/15 to-teal/5 p-4 transition hover:-translate-y-0.5 hover:border-teal hover:shadow-lg hover:shadow-teal/20"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/20 text-xl">
                  🛍️
                </div>
                <div className="text-sm font-bold text-teal">Marketplace</div>
                <div className="text-[10px] text-white/60">DAM · 38 industries · Promote any product</div>
                <div className="mt-auto text-[10px] text-teal group-hover:translate-x-1 transition">
                  Browse products →
                </div>
              </Link>

              {/* 3. Earnings Calculator */}
              <Link
                href="/affiliate#welcome"
                className="group flex flex-col items-start gap-2 rounded-card border-2 border-amber/40 bg-gradient-to-br from-amber/15 to-amber/5 p-4 transition hover:-translate-y-0.5 hover:border-amber hover:shadow-lg hover:shadow-amber/20"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber/20 text-xl">
                  🧮
                </div>
                <div className="text-sm font-bold text-amber">Earnings Calculator</div>
                <div className="text-[10px] text-white/60">Project monthly income · Pick rank + sales + industry</div>
                <div className="mt-auto text-[10px] text-amber group-hover:translate-x-1 transition">
                  Try the calculator →
                </div>
              </Link>

              {/* 4. How It Works */}
              <Link
                href="/affiliate/how-it-works"
                className="group flex flex-col items-start gap-2 rounded-card border-2 border-pink-400/40 bg-gradient-to-br from-pink-400/15 to-pink-400/5 p-4 transition hover:-translate-y-0.5 hover:border-pink-400 hover:shadow-lg hover:shadow-pink-400/20"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-400/20 text-xl">
                  📚
                </div>
                <div className="text-sm font-bold text-pink-400">How It Works</div>
                <div className="text-[10px] text-white/60">6-step walkthrough · 10 FAQs · Earnings examples</div>
                <div className="mt-auto text-[10px] text-pink-400 group-hover:translate-x-1 transition">
                  Read the guide →
                </div>
              </Link>

              {/* 5. Rank & Industry Unlocks */}
              <Link
                href="/affiliate/rank-detail"
                className="group flex flex-col items-start gap-2 rounded-card border border-glass bg-card/40 p-4 transition hover:-translate-y-0.5 hover:border-purple-light/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-light/15 text-xl">
                  🏆
                </div>
                <div className="text-sm font-bold">R1–R10 Ranks</div>
                <div className="text-[10px] text-white/60">10-rank ladder · Auto-promotion · Industry unlocks</div>
                <div className="mt-auto text-[10px] text-purple-light/70 group-hover:translate-x-1 transition">
                  View rank ladder →
                </div>
              </Link>

              {/* 6. Bonuses & Cascades */}
              <Link
                href="/affiliate#bonuses"
                className="group flex flex-col items-start gap-2 rounded-card border border-glass bg-card/40 p-4 transition hover:-translate-y-0.5 hover:border-teal/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/15 text-xl">
                  🎁
                </div>
                <div className="text-sm font-bold">11 Bonuses</div>
                <div className="text-[10px] text-white/60">4 stacking tiers · Track B 10-level cascade</div>
                <div className="mt-auto text-[10px] text-teal/70 group-hover:translate-x-1 transition">
                  See all bonuses →
                </div>
              </Link>

              {/* 7. Wallet & Withdraw */}
              <Link
                href="/wallet"
                className="group flex flex-col items-start gap-2 rounded-card border border-glass bg-card/40 p-4 transition hover:-translate-y-0.5 hover:border-amber/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber/15 text-xl">
                  💰
                </div>
                <div className="text-sm font-bold">My Wallet</div>
                <div className="text-[10px] text-white/60">Dual wallet · USDT/EHBGC · JazzCash + HBL</div>
                <div className="mt-auto text-[10px] text-amber/70 group-hover:translate-x-1 transition">
                  Open wallet →
                </div>
              </Link>

              {/* 8. Compliance & Legal */}
              <Link
                href="/affiliate/help"
                className="group flex flex-col items-start gap-2 rounded-card border border-glass bg-card/40 p-4 transition hover:-translate-y-0.5 hover:border-pink-400/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-400/15 text-xl">
                  ⚖️
                </div>
                <div className="text-sm font-bold">Help &amp; Legal</div>
                <div className="text-[10px] text-white/60">T&amp;Cs · Privacy · KYC · IDS · NOT MLM</div>
                <div className="mt-auto text-[10px] text-pink-400/70 group-hover:translate-x-1 transition">
                  View docs →
                </div>
              </Link>
            </div>

            {/* Trust strip below buttons */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-[10px] text-white/40 sm:text-xs">
              <span>⚖️ NOT MLM</span>
              <span>·</span>
              <span>📊 80/20 income rule</span>
              <span>·</span>
              <span>↩️ 30-day refund</span>
              <span>·</span>
              <span>🛡️ OFAC + FATF</span>
              <span>·</span>
              <span>🇵🇰 Pakistan SECP-aligned</span>
            </div>

            {/* AffiliateCard with stats — kept below button grid */}
            <div className="mt-6">
              <AffiliateCard />
            </div>
          </div>
        </section>

        {/* What is EHB */}
        <section className="border-b border-glass">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <div className="text-[10px] uppercase tracking-widest text-teal sm:text-xs">
              What is EHB?
            </div>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Trust, unified across every industry.
            </h2>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <div className="space-y-3 text-sm text-white/70 sm:text-base">
                <p>
                  Today, trust online is fragmented. A verified lawyer on one site, a rated seller on
                  another, a badge here, a review there — none of it portable.
                </p>
                <p>
                  EHB replaces this with a <b className="text-white">single composite trust score</b>{' '}
                  — the <b className="text-white">STL ladder</b> (L1 FREE → L10 SUPREME). It combines:
                </p>
                <ul className="ml-4 space-y-1.5 text-sm">
                  <li>
                    <span className="text-purple-light">●</span> PSS (identity: KYC + liveness + AML)
                  </li>
                  <li>
                    <span className="text-teal">●</span> CRB (credentials: exams + on-chain certs)
                  </li>
                  <li>
                    <span className="text-amber">●</span> DMO (behavior: orders + reviews + conduct)
                  </li>
                </ul>
                <p>
                  Your STL shows next to your name on every product, service, review, and application.
                  Higher STL = better ranking, lower fees, priority support. MIN-chain rule ensures
                  no weak link can fake trust.
                </p>
              </div>
              <div className="grid gap-3">
                {SYSTEMS.map((s) => (
                  <Link
                    key={s.name}
                    href={s.href}
                    className="group flex items-start gap-3 rounded-card border border-glass bg-card/60 p-4 transition hover:border-purple-light"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-card bg-gradient-to-br from-purple/30 to-teal/20 text-base font-bold">
                      {s.name}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between text-sm font-semibold">
                        <span>{s.full}</span>
                        <span className="text-[10px] text-white/40">cap {s.cap}</span>
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-teal">
                        {s.role}
                      </div>
                      <div className="mt-1 text-xs text-white/60">{s.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How it works — 8 step flow */}
        <section className="border-b border-glass bg-nested/20">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <div className="text-[10px] uppercase tracking-widest text-amber sm:text-xs">
              Your journey
            </div>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              From signup to earning in 8 steps
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-white/60 sm:text-base">
              The same flow works whether you come to buy, sell, deliver, teach, or refer. STL grows
              with every positive action.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {FLOW.map((f) => (
                <div
                  key={f.step}
                  className="group relative overflow-hidden rounded-card border border-glass bg-card/60 p-4 transition hover:border-purple-light"
                >
                  <div
                    className="absolute left-0 top-0 h-full w-1"
                    style={{ background: f.color }}
                  />
                  <div className="flex items-start gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card text-xl"
                      style={{ background: `${f.color}22`, color: f.color }}
                    >
                      {f.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-white/40">Step {f.step}</div>
                      <div className="text-sm font-semibold">{f.title}</div>
                      <div className="mt-0.5 text-[11px] text-white/60">{f.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/how-it-works"
                className="inline-block rounded-card border border-glass bg-card/60 px-5 py-2.5 text-sm font-semibold hover:border-purple-light"
              >
                Full walkthrough →
              </Link>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="border-b border-glass">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <div className="text-[10px] uppercase tracking-widest text-teal sm:text-xs">
              Who it's for
            </div>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Your quickest path, by role
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {AUDIENCES.map((a) => (
                <div
                  key={a.who}
                  className="rounded-card border border-glass bg-card/60 p-5 transition hover:border-purple-light"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-card bg-gradient-to-br ${a.gradient} text-2xl shadow-lg`}
                  >
                    {a.icon}
                  </div>
                  <h3 className="mt-3 text-lg font-bold">{a.who}</h3>
                  <p className="mt-1 text-xs text-white/60">{a.path}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6 pillars */}
        <section className="border-b border-glass bg-nested/20">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <div className="text-[10px] uppercase tracking-widest text-purple-light sm:text-xs">
              Six entry points
            </div>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Pick where to start
            </h2>
            <div className="mt-6 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pillars.map((p) => (
                <Link
                  key={p.title}
                  href={p.href}
                  className="group relative overflow-hidden rounded-card border border-glass bg-card p-5 transition hover:border-purple-light sm:p-6"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-card bg-gradient-to-br ${p.accent} text-2xl`}
                    >
                      {p.icon}
                    </div>
                    <div
                      className={`rounded-chip bg-gradient-to-r ${p.accent} px-3 py-1 text-[10px] font-semibold text-white`}
                    >
                      {p.subtitle}
                    </div>
                  </div>
                  <h3 className="mt-3 text-lg font-bold sm:text-xl">{p.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{p.desc}</p>
                  <div className="mt-4 text-sm font-semibold text-purple-light transition">
                    Explore →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-glass">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
            <div className="text-[10px] uppercase tracking-widest text-amber sm:text-xs">
              Common questions
            </div>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Frequently asked</h2>
            <div className="mt-6 space-y-3">
              {FAQ.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-card border border-glass bg-card/60 p-4 open:border-purple-light"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold">
                    <span>{f.q}</span>
                    <span className="ml-3 text-purple-light transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-white/70">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#7B6EF6]/20 via-[#13162A] to-[#2BBFA0]/10" />
          <div className="relative mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-16">
            <h2 className="text-3xl font-bold sm:text-4xl">Ready to join EHB?</h2>
            <p className="mt-3 text-sm text-white/70 sm:text-base">
              Register in 30 seconds. Verify identity in 2 minutes. Your STL is assigned
              immediately. Start buying, selling, earning.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/register"
                className="rounded-card bg-gradient-to-r from-[#7B6EF6] to-[#A098F8] px-6 py-3 text-sm font-semibold text-white shadow-lg"
              >
                Get Started
              </Link>
              <Link
                href="/concepts"
                className="rounded-card border border-glass bg-card/60 px-6 py-3 text-sm font-semibold text-white/90"
              >
                Learn the concepts
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
