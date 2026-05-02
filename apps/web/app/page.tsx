/**
 * EHB Home Page — Premium dark + MS Store layout
 *
 * Spec (LOCKED): ehb-info/15-ui-system/HOME-PAGE-DESIGN.md
 * AUTO-SAVE: Any change here MUST update the canonical files in 15-ui-system.
 * See ehb-info/15-ui-system/UIUX-AUTO-SAVE-PROTOCOL.md
 *
 * Original (pre-2026-05-02) preserved at: backup/page-tsx-2026-05-02/
 * Legacy sections (affiliate, FAQ, audiences, flow, systems) PRESERVED below
 * after the new premium MS Store rows.
 */
import Link from 'next/link';
import { PublicNav } from '@/components/ui/public-nav';
import { PublicFooter } from '@/components/ui/public-footer';
import { AffiliateCard } from '@/components/ui/affiliate-card';
import {
  PremiumHero,
  StlLadderRow,
  CompaniesRow,
  AiServicesRow,
  FeaturedIndustriesGrid,
  EarnPathsRow,
  DealsRow,
  CategoryGrid,
  FranchiseSeatsRow,
  NearbyProsRow,
  JobsRow,
  TubeRow,
  CountryRow,
  NewSellersRow,
  BoostStlRow,
  ReferBanner,
  FoundersPickRow,
  CollectionsGrid,
  FinalCta,
} from '@/components/home';

/* ───────────────────────────────────────────────────────── */
/* LEGACY DATA (preserved from pre-2026-05-02 page.tsx)      */
/* These sections render after the new premium MS Store rows */
/* ───────────────────────────────────────────────────────── */

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
  { name: 'PSS', full: 'Personal Security Score', role: 'Identity + KYC', cap: 'L5 ADVANCED', desc: 'Verifies who you are. OCR + liveness + AML.', href: '/dmo/pss' },
  { name: 'CRB', full: 'Certification, Refill & Background', role: 'Credentials + exams', cap: 'L9 ELITE', desc: 'Verifies what you can do. Hashed on Polkadot.', href: '/dmo/crb' },
  { name: 'DMO', full: 'Digital Management Office', role: 'Governance + activity', cap: 'L10 SUPREME', desc: 'Activity + behavior + performance score.', href: '/dmo' },
  { name: 'STL', full: 'Service Trust Level', role: 'Composite score', cap: '—', desc: 'Final trust ladder L1 FREE → L10 SUPREME.', href: '/dmo/stl' },
];

const FAQ = [
  { q: 'What is EHB in one line?', a: 'A global super-app unifying 37 industries on a single trust ladder. Every user, seller, product, and franchise gets an STL score (L1 FREE → L10 SUPREME) built from identity (PSS), credentials (CRB), and behavior (DMO).' },
  { q: 'Why do I need to verify my identity?', a: 'PSS (Personal Security Score) prevents fraud at scale. A verified L3+ user can transact, file complaints, and earn. It takes about 2 minutes and unlocks everything.' },
  { q: 'What is EHBGC?', a: 'EHB Global Coin — our platform token. Used for wallet locks (per STL level), franchise activation deposits, and premium service access. 1 EHBGC ≈ 1 USD in our demo (mainnet in Phase 4).' },
  { q: 'How does the MIN-chain rule work?', a: 'For any product, the final displayed STL = MIN(product STL, seller STL, company STL, owner STL). One weak link caps the chain. This prevents trust-spoofing.' },
  { q: 'Can I earn without selling anything?', a: 'Yes — become an Affiliate (refer users, earn 5% direct + 0.5–3% across 5 levels), a Rider (10% per delivery), or a Franchisee (territorial commission).' },
  { q: 'What happens if someone scams me?', a: 'File a complaint on your order page. DMO resolves per tier SLA (2h for fraud → 72h for quality issue). Upheld complaints trigger an automatic penalty ladder on the offender: warning → fine → STL drop → suspension.' },
  { q: 'Is my money safe?', a: 'Every order uses escrow. Funds only release when you confirm delivery. Disputes freeze escrow until DMO rules.' },
  { q: 'What about regulations?', a: 'PSS is OFAC/UN-sanctions-ready. CRB certifications cross-check with professional boards. All major events (KYC, certs, settlements) anchored on Polkadot for audit immutability.' },
];

/* ───────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      <PublicNav />
      <main
        className="min-h-screen ehb-home-premium"
        style={{ background: '#0C0E1A' }}
      >
        {/* Premium dark wrapper — MS Store style rows */}
        <div className="mx-auto max-w-6xl px-3 sm:px-5 py-4">
          {/* Section 2: Hero */}
          <PremiumHero />

          {/* Section 3: EHB STL Trust Ladder */}
          <StlLadderRow currentLevel={8} defaultCountry="PK" />

          {/* Section 4: Top Pakistan companies */}
          <CompaniesRow defaultCountry="PK" />

          {/* Section 5: EHB Dev AI */}
          <AiServicesRow />

          {/* Section 6: Featured industries */}
          <FeaturedIndustriesGrid />

          {/* Section 7: Earn with EHB */}
          <EarnPathsRow />

          {/* Section 8: Trust-verified deals */}
          <DealsRow />

          {/* Section 9: Browse by category */}
          <CategoryGrid />

          {/* Section 10: Become a franchisee */}
          <FranchiseSeatsRow />

          {/* Section 11: Verified pros near you */}
          <NearbyProsRow />

          {/* Section 12: JPS jobs hiring now */}
          <JobsRow />

          {/* Section 13: EHB Tube — featured videos */}
          <TubeRow />

          {/* Section 14: 17 country expansion */}
          <CountryRow />

          {/* Section 15: New on EHB this week */}
          <NewSellersRow />

          {/* Section 16: Build your EHB STL */}
          <BoostStlRow />

          {/* Section 17: Refer & earn banner */}
          <ReferBanner />

          {/* Section 18: Founder's pick */}
          <FoundersPickRow />

          {/* Section 19: Collections */}
          <CollectionsGrid />
        </div>

        {/* ═══════════════════════════════════════════════════
             LEGACY PRESERVED SECTIONS (pre-2026-05-02 content)
             Per SECTION-CATALOG.md L1-L5
             ═══════════════════════════════════════════════════ */}

        {/* L1: Affiliate quick action strip */}
        <section className="border-t border-glass bg-gradient-to-br from-[#7B6EF6]/10 via-transparent to-[#2BBFA0]/10">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
            <div className="text-center">
              <div className="inline-block rounded-chip border border-purple-light/30 bg-purple-light/10 px-3 py-1 text-[10px] uppercase tracking-widest text-purple-light sm:text-xs">
                EHB Affiliate Program · v3.12
              </div>
              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                Earn from <span className="bg-gradient-to-r from-[#7B6EF6] to-[#2BBFA0] bg-clip-text text-transparent">real product sales</span>
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-xs text-white/60 sm:text-sm">
                10% direct + 5% L2 + 11 bonuses + Track B 10-level franchise cascade · No income from joining fees · NOT MLM
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/affiliate#join" className="group flex flex-col items-start gap-2 rounded-card border-2 border-purple-light/40 bg-gradient-to-br from-purple-light/15 to-purple-light/5 p-4 transition hover:-translate-y-0.5 hover:border-purple-light hover:shadow-lg hover:shadow-purple-light/20">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-light/20 text-xl">🤝</div>
                <div className="text-sm font-bold text-purple-light">Join Affiliate</div>
                <div className="text-[10px] text-white/60">Free · 30 seconds · Get unique referral code</div>
              </Link>
              <Link href="/affiliate/marketplace" className="group flex flex-col items-start gap-2 rounded-card border-2 border-teal/40 bg-gradient-to-br from-teal/15 to-teal/5 p-4 transition hover:-translate-y-0.5 hover:border-teal">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/20 text-xl">🛍️</div>
                <div className="text-sm font-bold text-teal">Marketplace</div>
                <div className="text-[10px] text-white/60">DAM · 37 industries · Promote any product</div>
              </Link>
              <Link href="/affiliate#welcome" className="group flex flex-col items-start gap-2 rounded-card border-2 border-amber/40 bg-gradient-to-br from-amber/15 to-amber/5 p-4 transition hover:-translate-y-0.5 hover:border-amber">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber/20 text-xl">🧮</div>
                <div className="text-sm font-bold text-amber">Earnings Calculator</div>
                <div className="text-[10px] text-white/60">Project monthly income · Pick rank + sales + industry</div>
              </Link>
              <Link href="/affiliate/how-it-works" className="group flex flex-col items-start gap-2 rounded-card border-2 border-pink-400/40 bg-gradient-to-br from-pink-400/15 to-pink-400/5 p-4 transition hover:-translate-y-0.5 hover:border-pink-400">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-400/20 text-xl">📚</div>
                <div className="text-sm font-bold text-pink-400">How It Works</div>
                <div className="text-[10px] text-white/60">6-step walkthrough · 10 FAQs · Earnings examples</div>
              </Link>
            </div>

            <div className="mt-6">
              <AffiliateCard />
            </div>
          </div>
        </section>

        {/* L2: What is EHB / SYSTEMS */}
        <section className="border-t border-glass">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
            <div className="text-[10px] uppercase tracking-widest text-teal sm:text-xs">What is EHB?</div>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Trust, unified across every industry.</h2>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <div className="space-y-3 text-sm text-white/70 sm:text-base">
                <p>Today, trust online is fragmented. A verified lawyer on one site, a rated seller on another, a badge here, a review there — none of it portable.</p>
                <p>EHB replaces this with a <b className="text-white">single composite trust score</b> — the <b className="text-white">STL ladder</b> (L1 FREE → L10 SUPREME). It combines:</p>
                <ul className="ml-4 space-y-1.5 text-sm">
                  <li><span className="text-purple-light">●</span> PSS (identity: KYC + liveness + AML)</li>
                  <li><span className="text-teal">●</span> CRB (credentials: exams + on-chain certs)</li>
                  <li><span className="text-amber">●</span> DMO (behavior: orders + reviews + conduct)</li>
                </ul>
                <p>Your STL shows next to your name on every product, service, review, and application. MIN-chain rule ensures no weak link can fake trust.</p>
              </div>
              <div className="grid gap-3">
                {SYSTEMS.map((s) => (
                  <Link key={s.name} href={s.href} className="group flex items-start gap-3 rounded-card border border-glass bg-card/60 p-4 transition hover:border-purple-light">
                    <div className="flex h-10 w-10 items-center justify-center rounded-card bg-gradient-to-br from-purple/30 to-teal/20 text-base font-bold">{s.name}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between text-sm font-semibold">
                        <span>{s.full}</span>
                        <span className="text-[10px] text-white/40">cap {s.cap}</span>
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-teal">{s.role}</div>
                      <div className="mt-1 text-xs text-white/60">{s.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* L3: 8-step flow */}
        <section className="border-t border-glass bg-nested/20">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
            <div className="text-[10px] uppercase tracking-widest text-amber sm:text-xs">Your journey</div>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">From signup to earning in 8 steps</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {FLOW.map((f) => (
                <div key={f.step} className="group relative overflow-hidden rounded-card border border-glass bg-card/60 p-4 transition hover:border-purple-light">
                  <div className="absolute left-0 top-0 h-full w-1" style={{ background: f.color }} />
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card text-xl" style={{ background: `${f.color}22`, color: f.color }}>{f.icon}</div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-white/40">Step {f.step}</div>
                      <div className="text-sm font-semibold">{f.title}</div>
                      <div className="mt-0.5 text-[11px] text-white/60">{f.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* L4: Audiences */}
        <section className="border-t border-glass">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
            <div className="text-[10px] uppercase tracking-widest text-teal sm:text-xs">Who it's for</div>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Your quickest path, by role</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {AUDIENCES.map((a) => (
                <div key={a.who} className="rounded-card border border-glass bg-card/60 p-5 transition hover:border-purple-light">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-card bg-gradient-to-br ${a.gradient} text-2xl shadow-lg`}>{a.icon}</div>
                  <h3 className="mt-3 text-lg font-bold">{a.who}</h3>
                  <p className="mt-1 text-xs text-white/60">{a.path}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* L5: FAQ */}
        <section className="border-t border-glass">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-14">
            <div className="text-[10px] uppercase tracking-widest text-amber sm:text-xs">Common questions</div>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Frequently asked</h2>
            <div className="mt-6 space-y-3">
              {FAQ.map((f) => (
                <details key={f.q} className="group rounded-card border border-glass bg-card/60 p-4 open:border-purple-light">
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

        {/* Section 20: Final CTA */}
        <div className="mx-auto max-w-6xl px-3 sm:px-5 pb-8">
          <FinalCta />
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
                                                                                                                                                                                                                                                    