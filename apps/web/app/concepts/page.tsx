'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { PublicNav } from '@/components/ui/public-nav';
import { PublicFooter } from '@/components/ui/public-footer';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';

interface ConceptDef {
  term: string;
  category: 'Trust' | 'Money' | 'Governance' | 'Roles' | 'Industries' | 'Tech';
  icon: string;
  short: string;
  long: string;
  relatedLinks?: Array<{ href: string; label: string }>;
}

const CONCEPTS: ConceptDef[] = [
  // Trust
  {
    term: 'STL (Service Trust Level)',
    category: 'Trust',
    icon: '⭐',
    short: 'Composite trust score from L1 FREE → L10 SUPREME.',
    long:
      'The master trust ladder. Every user, product, service, seller, company, and franchise has an STL. Built from PSS (identity, max L5) + CRB (credentials, max L9) + DMO (activity, max L10). Formula: PSS_pts + CRB_pts + DMO_pts, then MIN(sum÷1.2, lowest×10+10). Shows next to your name everywhere.',
    relatedLinks: [{ href: '/dmo/stl', label: 'STL Management' }],
  },
  {
    term: 'PSS (Personal Security System)',
    category: 'Trust',
    icon: '🛡️',
    short: 'Identity verification backbone — KYC + liveness + AML.',
    long:
      'Verifies who you are. 27 features across 5 categories: Identity (CNIC/liveness), Financial (bank, FBR), Business (KYB), Behavioral (patterns), Compliance (OFAC/PEP/AML). Source cap: L5 ADVANCED. Required for all users. 10 levels L0 None → L10 Full Verified.',
    relatedLinks: [{ href: '/dmo/pss', label: 'PSS Monitoring' }, { href: '/pss', label: 'Submit PSS' }],
  },
  {
    term: 'CRB (Central Record Blockchain)',
    category: 'Trust',
    icon: '📜',
    short: 'Credential & exam validation with on-chain hashing.',
    long:
      'Verifies what you can do. Three exam formats: MCQ (AI-proctored), Practical (inspector-graded), Video (live demo). Every certificate is hashed (SHA-256 → blake2) and anchored on Polkadot. 6-month mandatory refill cycle. Source cap: L9 ELITE.',
    relatedLinks: [{ href: '/dmo/crb', label: 'CRB Monitoring' }, { href: '/crb/exams', label: 'Take an exam' }],
  },
  {
    term: 'DMO (Decentralized Management Office)',
    category: 'Governance',
    icon: '🏛️',
    short: 'Governance brain — 7 roles, 19 modules, policy engine.',
    long:
      'The brain that approves, routes, audits, and enforces. 7 internal roles (SUPER_ADMIN, DMO_DIRECTOR, DMO_MANAGER, DMO_ANALYST, DMO_SUPPORT, DMO_INSPECTOR, AI_SYSTEM). 19 operator modules spanning verification, operations, intelligence. Source cap: L10 SUPREME (board approval only).',
    relatedLinks: [{ href: '/dmo', label: 'DMO Dashboard' }],
  },
  {
    term: 'MIN-chain rule',
    category: 'Trust',
    icon: '🔗',
    short: 'Final STL = MIN(product, seller, company, owner).',
    long:
      'Anti-fraud cap. For any product listing, the displayed STL is the lowest of product/seller/company/owner STL. Prevents a L10 seller from boosting a low-trust product. One weak link collapses the whole chain. Validated via POST /api/stl/validate-product.',
  },
  {
    term: 'Source cap',
    category: 'Trust',
    icon: '🧱',
    short: 'Max level reachable from a single source alone.',
    long:
      'PSS alone caps at L5 ADVANCED. Franchise alone caps at L8 VIP. CRB alone caps at L9 ELITE. DMO board approval required for L10 SUPREME. Forces multi-source trust diversification — no single thing unlocks the top.',
  },

  // Money
  {
    term: 'EHBGC',
    category: 'Money',
    icon: '💰',
    short: 'EHB Global Coin — platform token for locks + payments.',
    long:
      'EHB\'s native token. Used for: wallet locks per STL level (L1=0, L5=200, L10=10K+), franchise activation deposits (1:1 USD match), premium AI service access, governance voting. Currently simulated 1 EHBGC = 1 USD. Polkadot mainnet in Phase 4.',
    relatedLinks: [{ href: '/dmo/wallet-control', label: 'Wallet Control' }],
  },
  {
    term: 'Escrow',
    category: 'Money',
    icon: '🔒',
    short: 'Funds locked from checkout to confirmed delivery.',
    long:
      'Every order creates an escrow lock at checkout. Funds sit locked until buyer confirms delivery (triggering settlement) or the order is canceled/refunded. If disputed, escrow freezes until DMO rules. Protects both buyer and seller.',
  },
  {
    term: '40/25/20/15 split',
    category: 'Money',
    icon: '📊',
    short: 'Franchise commission breakdown on platform cut.',
    long:
      'Per order: Seller 70%, Rider 10%, EHB platform 10%, Franchise network 10%. That franchise 10% splits further: 40% Company (EHB HQ), 25% Sub franchise (area), 20% Master (city), 15% Corporate (region). On a $100 order, Sub earns $2.50, Master $2, Corporate $1.50, Company $4.',
    relatedLinks: [{ href: '/franchise/calculator', label: 'Commission calculator' }],
  },
  {
    term: 'Wallet lock ladder',
    category: 'Money',
    icon: '🪜',
    short: 'EHBGC you must hold locked per STL level.',
    long:
      'L1 = 0, L2 = 20, L3 = 40, L4 = 80, L5 = 200, L6 = 400, L7 = 800, L8 = 2000, L9 = 5000, L10 = 10000+. Locked in wallet to maintain that level. Unlocking requires 15-day grace period and STL drop of 2 levels.',
  },

  // Governance
  {
    term: 'Penalty ladder',
    category: 'Governance',
    icon: '⚖️',
    short: 'Progressive consequences for violations.',
    long:
      '1st upheld complaint → warning. 2nd in 3 weeks → fine (scaled by tier). 3rd → STL −2 levels. Fraud category (tier 6) → immediate L1 FREE freeze. Missed CRB refill → upgrade blocked. Appeal via /complaints/[id]/appeal.',
  },
  {
    term: 'Complaint tier',
    category: 'Governance',
    icon: '🏷️',
    short: 'T1 (low) to T6 (critical) auto-classification.',
    long:
      'T1 (72h SLA): other. T2 (48h): late delivery. T3 (24h): item damaged, quality. T4 (12h): refund dispute. T5 (6h): abusive behavior. T6 (2h): fraud. Higher tier = faster SLA + stricter penalty. DMO_MANAGER handles T5+, DMO_DIRECTOR arbitrates T6.',
    relatedLinks: [{ href: '/complaints/file', label: 'File a complaint' }],
  },
  {
    term: 'SLA timer',
    category: 'Governance',
    icon: '⏰',
    short: 'Resolution deadline auto-started on filing.',
    long:
      'Every complaint, task, and application has a Service Level Agreement timer. Countdown auto-escalates if breached. Visible in DMO queue with color-coded chips. Operator workload balanced by owner distribution.',
  },
  {
    term: 'On-chain anchor',
    category: 'Tech',
    icon: '🔗',
    short: 'Immutable hash written to Polkadot.',
    long:
      'Key events (CRB certs, PSS KYC proofs, STL milestones, commission settlements, franchise activations) hashed and anchored on Polkadot parachain. Creates immutable audit trail. Currently SHA-256 stub; blake2 on mainnet in Phase 4.',
    relatedLinks: [{ href: '/dmo/blockchain-control', label: 'Blockchain Control' }],
  },

  // Roles
  {
    term: 'Franchise tiers',
    category: 'Roles',
    icon: '🌐',
    short: 'Physical (Sub L1–L10) + Online (OF1–OF4) + higher (M/C/Country).',
    long:
      'Physical: Sub L1 $5K → L10 $50K (10-level area franchises), Master $10K–$50K (city), Corporate $50K–$150K (region), Country $100K–$500K+ (national). Online: OF1 $100 → OF4 $1,500 (unlimited, parallel). Dual pricing — USD entry + EHBGC lock.',
    relatedLinks: [{ href: '/franchise', label: 'All tiers' }],
  },
  {
    term: 'User types',
    category: 'Roles',
    icon: '👥',
    short: '10 public types + DMO-internal admin.',
    long:
      'Buyer, Seller, Service Provider, Rider, Inspector, Franchisee, Employer, Job Seeker, Production Company, Admin (DMO-internal only, L8+ + 2FA). Each has its own STL source matrix — which sources contribute how much.',
    relatedLinks: [{ href: '/dmo/stl', label: 'User types matrix' }],
  },
  {
    term: 'Affiliate tiers',
    category: 'Roles',
    icon: '🤝',
    short: 'L1 Referrer → L5 Elite.',
    long:
      'L1 Referrer (default, 5% direct commission). L2 Promoter (10+ refs, +0.5% bonus). L3 Ambassador (25+). L4 Master (50+). L5 Elite (100+, Founders Circle). Plus commissions L2–L5 in referral chain: 3%, 2%, 1%, 0.5%.',
    relatedLinks: [{ href: '/affiliate', label: 'Affiliate Program' }],
  },

  // Industries
  {
    term: 'GoSellr / GSM',
    category: 'Industries',
    icon: '🛒',
    short: 'Main e-commerce marketplace.',
    long:
      'Product listings, escrow orders, ratings/reviews, STL-weighted ranking. Min STL L4 to list, L3 to buy. Ranking score = STL × 10 + rating × 15 − complaints × 5 + orders × 0.05 + delivery-speed factor.',
    relatedLinks: [{ href: '/gosellr', label: 'Browse' }],
  },
  {
    term: '38 industries',
    category: 'Industries',
    icon: '🌍',
    short: '3 pillars: Education + Health + Business.',
    long:
      'Phase 1 (16): GSM, WMS, HPS, OBS, OLS, LDS, AGTS, HMS, ITS, SOT, JPS, EHB Tube + more. Phase 2 (16): RES, FBS, FIN, WES, etc. Phase 3 (6): INS, LSM, HCS, SCS, RRS, CMS. All on same STL ladder.',
    relatedLinks: [{ href: '/industries', label: 'All 38 industries' }],
  },

  // Tech
  {
    term: 'Gold-master tests',
    category: 'Tech',
    icon: '✅',
    short: '58 immutable regression tests for STL formula.',
    long:
      'The STL calculation is protected by 58 locked test cases covering edge cases, ladder transitions, MIN-chain rule, source caps, and effects. Any formula change requires regenerating all expected values and getting sign-off. Run: pnpm test:stl.',
  },
  {
    term: 'Socket.IO namespaces',
    category: 'Tech',
    icon: '📡',
    short: 'Real-time event streams for DMO + orders + delivery.',
    long:
      '/dmo namespace: franchise applications, complaints, STL alerts, notifications. /orders: placed, paid, ready, confirmed, cancelled. /delivery: rider assigned, picked-up, in-transit, delivered. Persistent Notification collection for offline catchup.',
  },
  {
    term: 'Polkadot parachain',
    category: 'Tech',
    icon: '⛓️',
    short: 'EHB\'s chosen blockchain for trust anchoring.',
    long:
      'Polkadot provides interoperable parachains with shared security. EHB parachain stores CRB certificate hashes, PSS KYC proofs, and major transaction anchors. Phase 4 migration from stub SHA-256 to real blake2 blake2-as-hex + @polkadot/api.',
  },
];

const CATS = ['All', 'Trust', 'Money', 'Governance', 'Roles', 'Industries', 'Tech'] as const;

export default function ConceptsPage() {
  const [cat, setCat] = useState<(typeof CATS)[number]>('All');
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    let list = CONCEPTS;
    if (cat !== 'All') list = list.filter((c) => c.category === cat);
    if (q) {
      const needle = q.toLowerCase();
      list = list.filter(
        (c) =>
          c.term.toLowerCase().includes(needle) ||
          c.short.toLowerCase().includes(needle) ||
          c.long.toLowerCase().includes(needle)
      );
    }
    return list.sort((a, b) => a.term.localeCompare(b.term));
  }, [cat, q]);

  return (
    <>
      <PublicNav />
      <main className="min-h-screen">
        <section className="border-b border-glass bg-gradient-to-br from-[#13162A] via-[#0C0E1A] to-[#1A1D33]">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
            <Chip tone="teal">Glossary · {CONCEPTS.length} concepts</Chip>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
              EHB concepts &{' '}
              <span className="bg-gradient-to-r from-[#2BBFA0] to-[#7B6EF6] bg-clip-text text-transparent">
                glossary
              </span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
              Every term you'll see across EHB, explained once — so the rest of the platform just clicks.
            </p>
          </div>
        </section>

        <section className="border-b border-glass bg-nested/20">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
            <div className="flex flex-wrap items-center gap-2">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search concepts…"
                className="w-full rounded-input border border-glass bg-nested px-3 py-2.5 text-sm sm:w-64"
              />
              <div className="flex flex-wrap gap-1.5">
                {CATS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={`rounded-chip border px-3 py-2 text-xs ${
                      cat === c
                        ? 'border-teal bg-teal/20 text-white'
                        : 'border-glass text-white/60 hover:text-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="ml-auto text-xs text-white/40">
                {filtered.length} of {CONCEPTS.length}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          {filtered.length === 0 ? (
            <div className="p-10 text-center text-sm text-white/50">
              No concepts match. Try a different search or category.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((c) => (
                <PlasticCard key={c.term} className="flex h-full flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{c.icon}</span>
                      <Chip tone={categoryTone(c.category)}>{c.category}</Chip>
                    </div>
                  </div>
                  <h3 className="mt-3 text-base font-bold sm:text-lg">{c.term}</h3>
                  <p className="mt-1 text-sm text-white/70">{c.short}</p>
                  <details className="mt-3 group">
                    <summary className="cursor-pointer list-none text-xs text-purple-light hover:underline">
                      Read full explanation
                    </summary>
                    <p className="mt-2 text-xs text-white/60">{c.long}</p>
                    {c.relatedLinks?.length ? (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {c.relatedLinks.map((l) => (
                          <Link
                            key={l.href}
                            href={l.href}
                            className="rounded-chip border border-glass bg-white/5 px-2 py-1 text-[10px] text-white/70 hover:border-purple-light"
                          >
                            {l.label} →
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </details>
                </PlasticCard>
              ))}
            </div>
          )}
        </section>
      </main>
      <PublicFooter />
    </>
  );
}

function categoryTone(cat: ConceptDef['category']): 'purple' | 'teal' | 'amber' | 'ok' | 'fail' | 'default' {
  return (
    {
      Trust: 'purple',
      Money: 'ok',
      Governance: 'amber',
      Roles: 'teal',
      Industries: 'default',
      Tech: 'fail',
    } as const
  )[cat];
}
