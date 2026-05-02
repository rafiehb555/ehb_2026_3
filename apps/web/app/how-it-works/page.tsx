'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PublicNav } from '@/components/ui/public-nav';
import { PublicFooter } from '@/components/ui/public-footer';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';
import { StlBadge } from '@/components/ui/stl-badge';

const PATHS = [
  {
    id: 'buyer',
    name: 'Buyer',
    icon: '🛒',
    gradient: 'from-[#06b6d4] to-[#0891b2]',
    steps: [
      { t: 'Register', d: 'Email + password, 30 seconds', href: '/register' },
      { t: 'PSS verify', d: 'Upload CNIC + liveness → STL L3', href: '/pss' },
      { t: 'Browse GoSellr', d: 'Filter by category, STL, rating', href: '/gosellr' },
      { t: 'Add to cart', d: 'Review MIN-chain trust on product page', href: '/cart' },
      { t: 'Checkout', d: 'Escrow locks your EHBGC', href: '/checkout' },
      { t: 'Track order', d: 'Live delivery status', href: '/orders' },
      { t: 'Confirm delivery', d: 'Release escrow + leave review', href: '/orders' },
      { t: 'File complaint if needed', d: 'DMO resolves within tier SLA', href: '/complaints/file' },
    ],
  },
  {
    id: 'seller',
    name: 'Seller',
    icon: '🏪',
    gradient: 'from-[#8b5cf6] to-[#7c3aed]',
    steps: [
      { t: 'Register', d: 'Email + password', href: '/register' },
      { t: 'PSS + optional CRB', d: 'L4+ STL to list products; CRB for regulated goods', href: '/pss' },
      { t: 'List product', d: 'Via GoSellr dashboard (coming in your seller flow)', href: '/gosellr' },
      { t: 'Receive order', d: 'Notification + escrow already locked', href: '/orders' },
      { t: 'Mark ready', d: 'Package goods → status: ready', href: '/orders' },
      { t: 'Rider assigned', d: 'DMO auto-assigns highest-scoring rider', href: '/rider' },
      { t: 'Delivery complete', d: 'Buyer confirms → 70% of order lands in your wallet', href: null },
      { t: 'Grow STL', d: 'Reviews, consistency, CRB exams → higher ranking + lower fees', href: '/dmo/stl' },
    ],
  },
  {
    id: 'rider',
    name: 'Rider',
    icon: '🛵',
    gradient: 'from-[#F0A030] to-[#F8B830]',
    steps: [
      { t: 'Register + PSS L3', d: 'Identity + address verified', href: '/register' },
      { t: 'Apply as rider', d: 'Zone + vehicle type', href: '/rider' },
      { t: 'CRB vehicle check', d: 'Basic vehicle + safety cert', href: '/crb/exams' },
      { t: 'Go online', d: 'Toggle availability', href: '/rider' },
      { t: 'Auto-assigned orders', d: 'Scored by rating × STL × zone × active orders', href: null },
      { t: 'Pickup → transit → deliver', d: 'Update status at each step', href: null },
      { t: 'Earn 10% per order', d: 'Auto-settled on buyer confirm', href: null },
      { t: 'Grow STL', d: 'Rating > 4.5 unlocks senior rider tiers', href: '/dmo/stl' },
    ],
  },
  {
    id: 'franchisee',
    name: 'Franchisee',
    icon: '🌐',
    gradient: 'from-[#7B6EF6] to-[#A098F8]',
    steps: [
      { t: 'Register + PSS L5', d: 'Full identity verification', href: '/register' },
      { t: 'Pick tier', d: 'Sub L1 ($5K) to Country ($500K+), or Online OF1–OF4', href: '/franchise' },
      { t: 'Apply', d: '4-step form: area → KYC → pricing → submit', href: '/franchise/apply' },
      { t: 'DMO review', d: '48h SLA · approves / rejects / asks for more', href: '/dmo/approvals' },
      { t: 'Serial assigned', d: 'EHB-PK-R1-P1-Lx-NNN + wallet lock', href: null },
      { t: 'Run territory', d: 'Onboard sellers + riders in zone', href: null },
      { t: 'Earn commission', d: '40/25/20/15 split on every order in your zone', href: '/franchise/calculator' },
      { t: 'Upgrade tier', d: 'Credit 50% of previous tier toward upgrade', href: null },
    ],
  },
  {
    id: 'service_provider',
    name: 'Service Provider',
    icon: '🛠️',
    gradient: 'from-[#2BBFA0] to-[#38C878]',
    steps: [
      { t: 'Register + PSS L4', d: 'Identity + address', href: '/register' },
      { t: 'CRB professional exam', d: 'Bar / medical / teaching / domain-specific', href: '/crb/exams' },
      { t: 'Practical + inspection', d: 'Field audit + photos by CRB inspector', href: '/dmo/crb' },
      { t: 'Certificate hashed', d: 'On-chain Polkadot anchor', href: '/dmo/blockchain-control' },
      { t: 'List services', d: 'Within your industry (WMS / OLS / HPS / ITS)', href: '/industries' },
      { t: 'Client books + escrow', d: 'Funds locked until session complete', href: null },
      { t: '6-month refill', d: 'Auto-reminder 30 days before expiry', href: '/dmo/refill-management' },
      { t: 'Climb to L9 ELITE', d: 'CRB source cap = L9 (DMO board for L10)', href: '/dmo/stl' },
    ],
  },
  {
    id: 'affiliate',
    name: 'Affiliate',
    icon: '🤝',
    gradient: 'from-[#ec4899] to-[#db2777]',
    steps: [
      { t: 'Register', d: 'Any STL level', href: '/register' },
      { t: 'Join Affiliate', d: 'Get unique referral code', href: '/affiliate' },
      { t: 'Share link', d: '/register?ref=yourcode-XXXX', href: null },
      { t: 'Earn 5% direct (L1)', d: 'Every order from users you refer', href: null },
      { t: 'Earn L2–L5 (3% → 0.5%)', d: 'Multi-level network effects', href: null },
      { t: 'Tier promotes', d: '10 refs → Promoter, 25 → Ambassador, 50 → Master', href: null },
      { t: 'Pool bonus', d: 'Monthly shared pool if 5+ direct refs', href: null },
      { t: 'Earn without selling', d: 'Pure referral income + product bounties', href: '/affiliate' },
    ],
  },
];

const KEY_CONCEPTS = [
  {
    name: 'STL Score',
    icon: '⭐',
    explain:
      'Your composite trust level (L1 FREE → L10 SUPREME). Built from PSS (identity), CRB (credentials), and DMO (activity/behavior). Shows on every product, review, and application.',
  },
  {
    name: 'MIN-chain',
    icon: '🔗',
    explain:
      'For any product: Final STL = MIN(product, seller, company, owner). The weakest link caps the display. Prevents a L10 seller from boosting a low-trust product.',
  },
  {
    name: 'Escrow',
    icon: '🔒',
    explain:
      'Every order locks your funds when you pay. Releases only when you confirm delivery. If you dispute, DMO rules and funds are protected.',
  },
  {
    name: 'EHBGC lock',
    icon: '💰',
    explain:
      'To reach higher STL levels, you lock platform tokens. L5 = 200 EHBGC. L10 = 10,000+. Prevents gaming the system. Unlock takes a 15-day grace period.',
  },
  {
    name: '40/25/20/15',
    icon: '📊',
    explain:
      'Franchise commission split: 40% EHB platform, 25% Sub franchise, 20% Master, 15% Corporate. 10% of every order value. Rider gets 10% separately, seller 70%.',
  },
  {
    name: 'Penalty ladder',
    icon: '⚖️',
    explain:
      '1st upheld complaint = warning. 2nd = fine. 3rd in 3 weeks = STL −2. Fraud category = immediate L1 FREE freeze. Appeal path via /complaints/my.',
  },
];

export default function HowItWorksPage() {
  const [activePath, setActivePath] = useState('buyer');
  const path = PATHS.find((p) => p.id === activePath) || PATHS[0];

  return (
    <>
      <PublicNav />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="border-b border-glass bg-gradient-to-br from-[#13162A] via-[#0C0E1A] to-[#1A1D33]">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
            <Chip tone="purple">Full walkthrough</Chip>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
              How EHB works —{' '}
              <span className="bg-gradient-to-r from-[#7B6EF6] to-[#2BBFA0] bg-clip-text text-transparent">
                end to end
              </span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
              Pick your role below and follow the steps. Every path starts with the same foundation
              (Register + PSS) and branches into what you want to do — buy, sell, deliver, serve,
              own, or refer.
            </p>
          </div>
        </section>

        {/* Path selector */}
        <section className="border-b border-glass bg-nested/20">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
            <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
              Your role
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {PATHS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePath(p.id)}
                  className={`rounded-chip border px-4 py-2 text-sm font-semibold transition ${
                    activePath === p.id
                      ? 'border-purple-light text-white shadow-lg'
                      : 'border-glass text-white/60 hover:border-white/30 hover:text-white'
                  }`}
                  style={
                    activePath === p.id
                      ? {
                          background: `linear-gradient(135deg, ${p.gradient.replace('from-[', '').replace(']', '').split(' to-[')[0]}, ${p.gradient.split('to-[')[1]?.replace(']', '')})`,
                        }
                      : undefined
                  }
                >
                  <span className="mr-1.5 text-base">{p.icon}</span>
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
          <PlasticCard className="overflow-hidden p-0">
            <div
              className={`border-b border-glass bg-gradient-to-br ${path.gradient} p-5 sm:p-6`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-card bg-black/20 text-3xl">
                  {path.icon}
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-white/80">
                    Path for
                  </div>
                  <h2 className="text-2xl font-bold sm:text-3xl">{path.name}</h2>
                </div>
              </div>
            </div>

            <ol className="relative">
              {path.steps.map((s, i) => (
                <li key={i} className="relative flex gap-4 p-5 sm:p-6">
                  {/* connector line */}
                  {i < path.steps.length - 1 ? (
                    <div className="absolute left-[38px] top-[56px] h-full w-px bg-gradient-to-b from-purple/40 to-transparent sm:left-[44px]" />
                  ) : null}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7B6EF6] to-[#2BBFA0] text-base font-bold text-white shadow-lg sm:h-12 sm:w-12 sm:text-lg">
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold sm:text-base">{s.t}</div>
                    <p className="mt-1 text-xs text-white/60 sm:text-sm">{s.d}</p>
                    {s.href ? (
                      <Link
                        href={s.href}
                        className="mt-2 inline-block text-xs text-purple-light hover:underline"
                      >
                        Go there →
                      </Link>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </PlasticCard>
        </section>

        {/* Key concepts */}
        <section className="border-y border-glass bg-nested/20">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
            <div className="text-[10px] uppercase tracking-widest text-amber sm:text-xs">
              Key concepts you'll see everywhere
            </div>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              6 terms every user should know
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-white/60">
              Once these click, the rest of the platform makes sense.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {KEY_CONCEPTS.map((k) => (
                <div
                  key={k.name}
                  className="rounded-card border border-glass bg-card/60 p-5"
                >
                  <div className="text-3xl">{k.icon}</div>
                  <h3 className="mt-3 text-lg font-bold">{k.name}</h3>
                  <p className="mt-2 text-xs text-white/70">{k.explain}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/concepts"
                className="inline-block rounded-card border border-glass bg-card/60 px-5 py-2.5 text-sm font-semibold hover:border-purple-light"
              >
                Full glossary →
              </Link>
            </div>
          </div>
        </section>

        {/* Common flows */}
        <section className="border-b border-glass">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
            <div className="text-[10px] uppercase tracking-widest text-teal sm:text-xs">
              Common scenarios
            </div>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Real flows end-to-end</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <ScenarioCard
                icon="🛒"
                title="I want to buy a product"
                steps={[
                  'Browse /gosellr, filter by min STL',
                  'Product page shows MIN-chain (L7 seller L6 product)',
                  'Add to cart, checkout — escrow locks your EHBGC',
                  'Rider delivers, you confirm, escrow releases',
                  'If wrong item: file complaint → DMO reviews → refund',
                ]}
              />
              <ScenarioCard
                icon="📜"
                title="I'm a doctor, I want to list services"
                steps={[
                  'Register, complete PSS L5',
                  'Take CRB medical license MCQ + video demo',
                  'Inspector visits clinic, files on-chain report',
                  'Certificate issued + 6-month refill reminder set',
                  'List consultation, patients book via /industries/wms',
                ]}
              />
              <ScenarioCard
                icon="🛵"
                title="I want to earn by delivering"
                steps={[
                  'Register + PSS L3 (identity + address)',
                  'Apply on /rider with bike/car info',
                  'CRB vehicle check (photos, license)',
                  'Go online — auto-assigned orders nearby',
                  '10% per order auto-deposited when buyer confirms',
                ]}
              />
              <ScenarioCard
                icon="🌐"
                title="I want to own a territory franchise"
                steps={[
                  'Register + PSS L5',
                  'Pick tier on /franchise (Sub L1 $5K → Country $500K+)',
                  'Apply — 4-step form with USD + EHBGC dual pricing',
                  'DMO reviews in 48h, serial assigned',
                  '40/25/20/15 commission on every order in your zone',
                ]}
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#7B6EF6]/20 via-[#13162A] to-[#2BBFA0]/10" />
          <div className="relative mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 sm:py-16">
            <h2 className="text-2xl font-bold sm:text-3xl">You understand the flow.</h2>
            <p className="mt-3 text-sm text-white/70 sm:text-base">
              Time to pick a role and start. Everything STL-gated unlocks as your level climbs.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link
                href="/register"
                className="rounded-card bg-gradient-to-r from-[#7B6EF6] to-[#A098F8] px-6 py-3 text-sm font-semibold text-white shadow-lg"
              >
                Register in 30 seconds
              </Link>
              <Link
                href="/concepts"
                className="rounded-card border border-glass bg-card/60 px-6 py-3 text-sm font-semibold text-white/90"
              >
                Concepts glossary
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}

function ScenarioCard({
  icon,
  title,
  steps,
}: {
  icon: string;
  title: string;
  steps: string[];
}) {
  return (
    <PlasticCard className="p-5">
      <div className="flex items-center gap-3">
        <div className="text-3xl">{icon}</div>
        <h3 className="text-base font-semibold sm:text-lg">{title}</h3>
      </div>
      <ol className="mt-4 space-y-1.5 text-xs text-white/70">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-2">
            <span className="font-mono text-purple-light">{i + 1}.</span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
    </PlasticCard>
  );
}
