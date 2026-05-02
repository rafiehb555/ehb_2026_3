'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { getIndustry } from '@/lib/industries';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';
import { Button3D } from '@/components/ui/button-3d';
import { StlBadge } from '@/components/ui/stl-badge';

interface IndustryContent {
  whatItIs: string;
  services: Array<{ name: string; desc: string; minStl: number; icon: string }>;
  crbExams: string[];
  pssGate: string;
  benefits: { user: string[]; provider: string[]; platform: string[] };
  stats: Array<{ label: string; value: string }>;
}

const CONTENT_BY_SLUG: Record<string, IndustryContent> = {
  wms: {
    whatItIs:
      'Wellness & Medical Services — connect verified doctors, clinics, pharmacies, and patients. CRB exams validate medical licenses; AI Diagnosis provides triage; appointment booking with escrow.',
    services: [
      { name: 'Doctor consultation', desc: 'Video / in-person bookings', minStl: 5, icon: '👨‍⚕️' },
      { name: 'AI Diagnosis', desc: 'Symptom-based triage', minStl: 5, icon: '🤖' },
      { name: 'Pharmacy delivery', desc: 'Verified drugs, escrow', minStl: 4, icon: '💊' },
      { name: 'Lab tests', desc: 'Sample pickup + results', minStl: 5, icon: '🧪' },
      { name: 'Hospital booking', desc: 'Inpatient + day surgery', minStl: 7, icon: '🏥' },
    ],
    crbExams: ['Medical license MCQ', 'Clinical demo video', 'Hospital inspection (premises)'],
    pssGate: 'Doctor: PSS L5 + medical board CRB cert. Patient: PSS L3+.',
    benefits: {
      user: ['Verified-only doctors', 'AI triage before appointment', 'Insurance-grade trust', 'Online + offline'],
      provider: ['Steady patient flow', 'Reduced fees at L7+', 'AI-aided diagnosis', 'Hospital partnerships'],
      platform: ['Quality signal across health vertical', 'Anchored licenses on-chain', 'Reduced malpractice exposure'],
    },
    stats: [
      { label: 'Verified doctors', value: '142' },
      { label: 'Pharmacy partners', value: '38' },
      { label: 'AI diagnoses/mo', value: '1,840' },
      { label: 'Avg STL', value: 'L6' },
    ],
  },
  ols: {
    whatItIs:
      'Online Legal Services — bar-verified lawyers handle contracts, case triage, notarization. AI Lawyer pre-screens cases; CRB exam confirms bar admission.',
    services: [
      { name: 'AI case triage', desc: 'Free 1-min screening', minStl: 5, icon: '🤖' },
      { name: 'Lawyer consultation', desc: '30-min slots', minStl: 5, icon: '⚖️' },
      { name: 'Contract drafting', desc: 'Custom + escrow', minStl: 5, icon: '📜' },
      { name: 'Notarization', desc: 'On-chain signature', minStl: 6, icon: '✍️' },
      { name: 'Court representation', desc: 'Engagement letter', minStl: 7, icon: '🏛️' },
    ],
    crbExams: ['Bar association MCQ', 'Case study practical', 'Annual ethics refresher'],
    pssGate: 'Lawyer: PSS L5 + bar CRB cert + practical pass. Client: PSS L3+.',
    benefits: {
      user: ['AI screening saves money', 'Verified bar members only', 'Escrow for retainer', 'Contract notarized on-chain'],
      provider: ['Steady client pipeline', 'AI-assisted research', 'Reduced 1.25% fee at L7+', 'Reputation portable'],
      platform: ['Legal verticals trust signal', 'Dispute resolution faster (notarized)', 'Bar-board cross-check automated'],
    },
    stats: [
      { label: 'Verified lawyers', value: '64' },
      { label: 'Cases triaged', value: '1,260' },
      { label: 'Contracts notarized', value: '94' },
      { label: 'Avg STL', value: 'L7' },
    ],
  },
  hps: {
    whatItIs:
      'Human Professional Services — tutors, coaches, consultants. CRB validates teaching/professional credentials. AI Tutor provides adaptive study plans.',
    services: [
      { name: '1-on-1 tutoring', desc: 'Hourly bookings', minStl: 4, icon: '👨‍🏫' },
      { name: 'AI Tutor plans', desc: 'Adaptive study path', minStl: 3, icon: '🤖' },
      { name: 'Group classes', desc: 'Live + recorded', minStl: 5, icon: '👥' },
      { name: 'Career coaching', desc: 'Resume + interview prep', minStl: 5, icon: '🎯' },
      { name: 'Consulting projects', desc: 'Engagement letters', minStl: 6, icon: '📊' },
    ],
    crbExams: ['Teaching license MCQ', 'Subject-matter practical', 'Classroom video demo'],
    pssGate: 'Tutor: PSS L4 + teaching CRB. Student: PSS L1+.',
    benefits: {
      user: ['Verified teachers only', 'Adaptive study via AI', 'Pay per session escrow', 'Public reviews with STL tier'],
      provider: ['Continuous student flow', 'AI-aided lesson plans', 'Lower fees at L6+', 'Career coaching upsell'],
      platform: ['Education vertical quality', 'Course marketplace synergy with OBS', 'Career outcomes tracked'],
    },
    stats: [
      { label: 'Active tutors', value: '218' },
      { label: 'Students enrolled', value: '1,742' },
      { label: 'Sessions/month', value: '3,420' },
      { label: 'Avg STL', value: 'L6' },
    ],
  },
  agts: {
    whatItIs:
      'Agro-Tech Services — farmers, suppliers, bulk buyers. Soil tests + farm audits via CRB. STL ranking for bulk order trust. Production Company integration.',
    services: [
      { name: 'Bulk wholesale', desc: 'Min 100kg orders', minStl: 5, icon: '🌾' },
      { name: 'Soil testing', desc: 'CRB-certified labs', minStl: 5, icon: '🧪' },
      { name: 'Farm equipment', desc: 'Buy / rent', minStl: 4, icon: '🚜' },
      { name: 'Crop insurance', desc: 'Yield-based', minStl: 6, icon: '🛡️' },
      { name: 'Export linkage', desc: 'International buyers', minStl: 7, icon: '🌍' },
    ],
    crbExams: ['Soil-test certification', 'Farm inspection (annual)', 'Organic-cert audit'],
    pssGate: 'Farmer: PSS L4 + farm address verified. Buyer: PSS L3+.',
    benefits: {
      user: ['Verified-source produce', 'Bulk pricing', 'Quality audit trails', 'Direct from farmer'],
      provider: ['Direct buyer access', 'Soil test → premium pricing', 'No middleman', 'Insurance available'],
      platform: ['Food security signal', 'Rural economic activation', 'Audit-trail compliance'],
    },
    stats: [
      { label: 'Verified farms', value: '86' },
      { label: 'Bulk orders/mo', value: '142' },
      { label: 'Tons traded', value: '4,200' },
      { label: 'Avg STL', value: 'L5' },
    ],
  },
  its: {
    whatItIs:
      'IT & Software Services — developers, agencies, freelancers. Portfolio audits + code reviews via CRB. Project escrow + milestone payouts.',
    services: [
      { name: 'Freelance projects', desc: 'Hourly / milestone', minStl: 4, icon: '💻' },
      { name: 'Code audits', desc: 'CRB inspector review', minStl: 6, icon: '🔍' },
      { name: 'Agency engagements', desc: 'Team + retainer', minStl: 7, icon: '🏢' },
      { name: 'AI Resume Builder', desc: 'For developers', minStl: 3, icon: '🤖' },
      { name: 'Open-source bounties', desc: 'Per-issue payout', minStl: 5, icon: '🎯' },
    ],
    crbExams: ['Portfolio review', 'Code audit (random sample)', 'Stack-specific certification'],
    pssGate: 'Developer: PSS L4 + portfolio. Client: PSS L3+.',
    benefits: {
      user: ['Verified developers', 'Milestone escrow', 'Code-audit transparency', 'Reviews per project'],
      provider: ['Client pipeline', 'Verified portfolio = premium rates', 'Reduced fees at L7+', 'Bounty marketplace'],
      platform: ['Tech vertical credibility', 'Cross-border project enablement', 'Reduced scope-disputes'],
    },
    stats: [
      { label: 'Active developers', value: '342' },
      { label: 'Projects/month', value: '186' },
      { label: 'Code audits done', value: '124' },
      { label: 'Avg STL', value: 'L6' },
    ],
  },
  sot: {
    whatItIs:
      'Sports & Outdoor Tourism — guides, equipment rental, group tours. Safety certifications via CRB. Insurance integration via Wallet.',
    services: [
      { name: 'Tour guides', desc: 'Local expert booking', minStl: 5, icon: '🥾' },
      { name: 'Equipment rental', desc: 'Trekking, water sports', minStl: 4, icon: '🎒' },
      { name: 'Group tours', desc: 'Multi-day packages', minStl: 6, icon: '🚌' },
      { name: 'Adventure insurance', desc: 'Day-rate coverage', minStl: 5, icon: '🛡️' },
      { name: 'Photography services', desc: 'On-tour photographers', minStl: 5, icon: '📸' },
    ],
    crbExams: ['Safety certification', 'First-aid practical', 'Equipment inspection'],
    pssGate: 'Guide: PSS L5 + safety CRB. Tourist: PSS L1+.',
    benefits: {
      user: ['Verified safe guides', 'Insurance bundled', 'Group sizes capped per STL', 'Reviews tier-segmented'],
      provider: ['High-margin bookings', 'Equipment rental upsell', 'Insurance commission share'],
      platform: ['Tourism vertical credibility', 'Safety record trackable', 'Cross-border tour packages'],
    },
    stats: [
      { label: 'Certified guides', value: '54' },
      { label: 'Tours run/month', value: '92' },
      { label: 'Equipment items', value: '320' },
      { label: 'Avg STL', value: 'L6' },
    ],
  },
};

export default function IndustryDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const industry = slug ? getIndustry(slug) : null;
  if (!industry) return notFound();

  const content = CONTENT_BY_SLUG[slug || ''] || {
    whatItIs: `${industry.name} — full content coming in ${industry.phase === 1 ? 'Phase 1 expansion' : 'a future phase'}.`,
    services: [],
    crbExams: [],
    pssGate: 'Standard PSS L3+ for buyers, L4+ for providers.',
    benefits: { user: [], provider: [], platform: [] },
    stats: [],
  };

  return (
    <main className="min-h-screen">
      <section
        className="border-b border-glass"
        style={{
          background: `linear-gradient(135deg, ${industry.gradient.from}11, ${industry.gradient.to}05 60%, transparent), linear-gradient(135deg, #13162A, #0C0E1A)`,
        }}
      >
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
          <Link href="/industries" className="text-xs text-white/50 hover:text-white">
            ← All industries
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div
              className="flex h-20 w-20 items-center justify-center rounded-card text-5xl shadow-2xl sm:h-24 sm:w-24 sm:text-6xl"
              style={{
                background: `linear-gradient(135deg, ${industry.gradient.from}, ${industry.gradient.to})`,
                boxShadow: `0 16px 48px ${industry.gradient.to}66`,
              }}
            >
              {industry.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Chip tone={industry.status === 'live' ? 'ok' : industry.status === 'beta' ? 'amber' : 'default'}>
                  {industry.status}
                </Chip>
                <Chip>Phase {industry.phase}</Chip>
                <Chip tone="purple">{industry.pillar}</Chip>
                <span className="font-mono text-[10px] text-white/40">{industry.code}</span>
              </div>
              <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{industry.name}</h1>
              <p className="mt-2 text-sm text-white/60 sm:text-base">{industry.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 space-y-4 sm:space-y-6">
        {/* What it is */}
        <PlasticCard className="p-5 sm:p-6">
          <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
            What it is
          </div>
          <h3 className="mt-1 text-lg font-semibold">{industry.name}</h3>
          <p className="mt-3 text-sm text-white/70 sm:text-base">{content.whatItIs}</p>
          <div className="mt-3 text-xs text-white/50">
            Parent department: <span className="text-teal">{industry.parentDept}</span>
          </div>
        </PlasticCard>

        {/* Stats */}
        {content.stats.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {content.stats.map((s) => (
              <PlasticCard key={s.label} className="p-4">
                <div className="text-[10px] uppercase tracking-widest text-white/40">{s.label}</div>
                <div className="mt-1 text-2xl font-bold tabular-nums">{s.value}</div>
              </PlasticCard>
            ))}
          </div>
        ) : null}

        {/* Services */}
        {content.services.length > 0 ? (
          <PlasticCard className="p-5 sm:p-6">
            <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
              Services in {industry.code}
            </div>
            <h3 className="mt-1 text-lg font-semibold">Available now</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {content.services.map((svc) => (
                <div
                  key={svc.name}
                  className="rounded-card border border-glass bg-nested/60 p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{svc.icon}</span>
                      <div className="text-sm font-semibold">{svc.name}</div>
                    </div>
                    <StlBadge level={svc.minStl} size="xs" showName={false} />
                  </div>
                  <div className="mt-2 text-xs text-white/60">{svc.desc}</div>
                  <div className="mt-2 text-[10px] text-white/40">Min STL L{svc.minStl}</div>
                </div>
              ))}
            </div>
          </PlasticCard>
        ) : null}

        {/* PSS + CRB gates */}
        <div className="grid gap-4 lg:grid-cols-2">
          <PlasticCard className="p-5">
            <div className="text-[10px] uppercase tracking-widest text-[#7B6EF6] sm:text-xs">
              PSS gate
            </div>
            <h3 className="mt-1 text-lg font-semibold">Identity requirements</h3>
            <p className="mt-3 text-sm text-white/70">{content.pssGate}</p>
            <Link href="/dmo/pss" className="mt-3 inline-block text-xs text-purple-light hover:underline">
              Learn about PSS →
            </Link>
          </PlasticCard>
          <PlasticCard className="p-5">
            <div className="text-[10px] uppercase tracking-widest text-[#2BBFA0] sm:text-xs">
              CRB exams
            </div>
            <h3 className="mt-1 text-lg font-semibold">Required certifications</h3>
            {content.crbExams.length > 0 ? (
              <ul className="mt-3 space-y-1 text-sm text-white/70">
                {content.crbExams.map((e) => (
                  <li key={e} className="flex gap-2">
                    <span className="text-teal">•</span>
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-3 text-sm text-white/50">No CRB exams required for buyers.</div>
            )}
            <Link href="/dmo/crb" className="mt-3 inline-block text-xs text-teal hover:underline">
              Learn about CRB →
            </Link>
          </PlasticCard>
        </div>

        {/* Benefits */}
        {content.benefits.user.length > 0 ? (
          <PlasticCard className="p-5">
            <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
              Who benefits
            </div>
            <h3 className="mt-1 text-lg font-semibold">Why this industry on EHB</h3>
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              {[
                { party: 'Users / Buyers', icon: '👤', list: content.benefits.user },
                { party: 'Providers', icon: '🛠️', list: content.benefits.provider },
                { party: 'Platform', icon: '🏛️', list: content.benefits.platform },
              ].map((b) => (
                <div key={b.party} className="rounded-card border border-glass bg-nested/60 p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{b.icon}</span>
                    <span className="text-sm font-semibold">{b.party}</span>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-xs text-white/70">
                    {b.list.map((x) => (
                      <li key={x} className="flex gap-1.5">
                        <span className="text-[#38C878]">+</span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </PlasticCard>
        ) : null}

        {/* CTA */}
        <PlasticCard className="p-5 text-center sm:p-8">
          <h3 className="text-xl font-bold sm:text-2xl">Ready to get started?</h3>
          <p className="mt-2 text-sm text-white/60">
            {industry.status === 'planned'
              ? 'This industry is in roadmap. Sign up to get early access.'
              : 'Verified providers are onboarding now. Join the platform.'}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link href="/register">
              <Button3D variant="purple">Get started</Button3D>
            </Link>
            <Link href="/industries" className="rounded-chip border border-glass bg-card/60 px-4 py-2 text-sm">
              ← All industries
            </Link>
          </div>
        </PlasticCard>
      </section>
    </main>
  );
}
