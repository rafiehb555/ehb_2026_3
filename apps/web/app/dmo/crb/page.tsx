'use client';

import { useMemo, useState } from 'react';
import { DmoTopbar } from '@/components/dmo/topbar';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';
import { StlBadge } from '@/components/ui/stl-badge';
import { UserTypeSelector } from '@/components/dmo/user-type-selector';
import { StlSourceMatrix } from '@/components/dmo/stl-source-matrix';
import { getUserType, type UserTypeId } from '@/lib/stl/user-types';

const EXAM_TYPES = [
  {
    type: 'MCQ',
    icon: '📝',
    color: '#7B6EF6',
    desc: 'Multiple-choice, AI-proctored',
    details: [
      'Timed — typical 30 min per exam',
      'Randomized question bank',
      'AI proctoring via webcam',
      'Auto-graded instantly',
      'Pass threshold configurable (default 70%)',
    ],
  },
  {
    type: 'Practical',
    icon: '🧪',
    color: '#2BBFA0',
    desc: 'Task-based assessment',
    details: [
      'Real-world task submission',
      'CRB inspector scores submission',
      'Photo / video / file upload',
      'Rubric-based evaluation',
      'Pass + appeal process',
    ],
  },
  {
    type: 'Video',
    icon: '🎥',
    color: '#F0A030',
    desc: 'Live skill demonstration',
    details: [
      'Candidate records live demo',
      'Inspector reviews async',
      'Can request follow-up session',
      'Used for clinical / hands-on skills',
      'Cert hash anchored on-chain',
    ],
  },
];

const CRB_INSPECTION_FLOW = [
  { step: 1, title: 'Apply', desc: 'User requests CRB certification', icon: '📋' },
  { step: 2, title: 'Auto-validate', desc: 'System checks prerequisites (PSS L3+, exam pass)', icon: '✅' },
  { step: 3, title: 'Inspector assigned', desc: 'DMO routes to available inspector in zone', icon: '👤' },
  { step: 4, title: 'Physical audit', desc: 'Inspector visits premises (GPS-tagged, photos, checklist)', icon: '🔎' },
  { step: 5, title: 'Report submitted', desc: 'On-chain report with inspector signature', icon: '📄' },
  { step: 6, title: 'DMO review', desc: 'DMO manager approves / rejects / requests more info', icon: '🏛️' },
  { step: 7, title: 'Cert issued', desc: 'Blockchain hash + 6-month expiry set', icon: '🏅' },
  { step: 8, title: 'Refill reminder', desc: 'Auto-notify 30 days before expiry', icon: '🔄' },
];

const BENEFITS_BY_PARTY = [
  {
    party: 'Professional / Seller',
    icon: '🎓',
    benefits: [
      'Credentials portable across platforms (on-chain)',
      'Higher STL = better client matching',
      'Command premium rates (expert tier)',
      'Reduced platform fees at L7+',
      'Priority in specialized industry searches',
    ],
  },
  {
    party: 'Client / Buyer',
    icon: '🛡️',
    benefits: [
      'Provably certified professionals only',
      'Exam results visible (if opted in)',
      'Inspection reports archive',
      'Insurance-grade trust for high-value services',
      'Lower risk of fraud on specialized services',
    ],
  },
  {
    party: 'Regulator / Platform',
    icon: '⚖️',
    benefits: [
      'Immutable audit trail for compliance',
      'Quick dispute resolution with hash proofs',
      'Sector-level quality signals',
      'Refill cadence ensures standards stay current',
      'Inspector accountability via on-chain signatures',
    ],
  },
];

const INDUSTRY_MAP = [
  { industry: 'OLS (Legal)', exams: ['Bar association MCQ', 'Case study practical'], refill: 'Annual' },
  { industry: 'WMS (Medical)', exams: ['Medical license MCQ', 'Clinical video demo', 'Hospital inspection'], refill: '6 months' },
  { industry: 'HPS (Education)', exams: ['Teaching license', 'Classroom demo video'], refill: '6 months' },
  { industry: 'JPS (Jobs)', exams: ['Skill-specific MCQ', 'Practical task'], refill: 'None for candidates' },
  { industry: 'AGTS (Agro)', exams: ['Soil test certification', 'Farm audit'], refill: '6 months' },
  { industry: 'ITS (Tech)', exams: ['Portfolio review', 'Code audit'], refill: 'Annual' },
];

export default function CrbPage() {
  const [userType, setUserType] = useState<UserTypeId>('service_provider');
  const type = useMemo(() => getUserType(userType), [userType]);

  return (
    <>
      <DmoTopbar
        title="CRB Monitoring"
        subtitle="Central Record Blockchain — certifications, inspections, on-chain hashes"
        breadcrumb={['Verification', 'CRB']}
      />
      <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
        <PlasticCard className="p-4 sm:p-5">
          <UserTypeSelector value={userType} onChange={setUserType} />
        </PlasticCard>

        {/* Hero */}
        <PlasticCard className="overflow-hidden p-0">
          <div
            className="relative p-5 sm:p-8"
            style={{
              background:
                'linear-gradient(135deg, rgba(44, 191, 160, 0.15), rgba(56, 200, 120, 0.05) 60%, transparent)',
            }}
          >
            <div className="flex flex-wrap items-start gap-4 sm:gap-6">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-card text-4xl shadow-2xl sm:h-20 sm:w-20 sm:text-5xl"
                style={{
                  background: 'linear-gradient(135deg, #2BBFA0, #38C878)',
                  boxShadow: '0 12px 40px rgba(44,191,160,0.4)',
                }}
              >
                📜
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Chip tone="teal">Core System #2</Chip>
                  <Chip>3 exam types · On-chain hashing</Chip>
                </div>
                <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
                  Central Record Blockchain (CRB)
                </h1>
                <p className="mt-2 text-sm text-white/70 sm:text-base">
                  Quality assurance + physical verification layer. Validates professional
                  credentials (exams, licenses, practical tests) and anchors every certificate on
                  Polkadot. Source cap: <b>L9 ELITE</b> — CRB alone can take you nearly to the top.
                </p>
              </div>
              <div className="flex w-full justify-between gap-3 border-t border-glass pt-4 sm:w-auto sm:flex-col sm:border-t-0 sm:pt-0">
                <StatMini label="STL contribution" value="0–40 pts" />
                <StatMini label="Source cap" value="L9 ELITE" />
              </div>
            </div>
          </div>
        </PlasticCard>

        {/* What / How / Benefits */}
        <div className="grid gap-4 lg:grid-cols-3">
          <PlasticCard className="p-5">
            <div className="text-[10px] uppercase tracking-widest text-[#2BBFA0] sm:text-xs">
              What CRB does
            </div>
            <h3 className="mt-1 text-lg font-semibold">Verifies skill, not just identity</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <Bullet>Proctored exams (MCQ / Practical / Video)</Bullet>
              <Bullet>Field inspections by certified inspectors</Bullet>
              <Bullet>License + credential cross-check with boards</Bullet>
              <Bullet>Certificate issuance + 6-month refill cycle</Bullet>
              <Bullet>Blockchain hash anchoring (Polkadot) for every cert</Bullet>
            </ul>
          </PlasticCard>

          <PlasticCard className="p-5">
            <div className="text-[10px] uppercase tracking-widest text-[#F0A030] sm:text-xs">
              How CRB works
            </div>
            <h3 className="mt-1 text-lg font-semibold">End-to-end: apply → audit → anchor</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <Bullet>User applies through JPS or industry-specific portal</Bullet>
              <Bullet>Prerequisites auto-validated (PSS L3+, exam pass)</Bullet>
              <Bullet>Inspector auto-assigned by zone + availability</Bullet>
              <Bullet>Physical audit with photos + GPS + checklist</Bullet>
              <Bullet>DMO final review → certificate + on-chain hash</Bullet>
            </ul>
          </PlasticCard>

          <PlasticCard className="p-5">
            <div className="text-[10px] uppercase tracking-widest text-[#7B6EF6] sm:text-xs">
              Why CRB matters
            </div>
            <h3 className="mt-1 text-lg font-semibold">Trust beyond identity</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <Bullet>PSS verifies "who you are" — CRB verifies "what you can do"</Bullet>
              <Bullet>Immutable credentials — cannot be forged</Bullet>
              <Bullet>Portable across platforms (standard hash format)</Bullet>
              <Bullet>Refill cycle keeps skills current (no stale credentials)</Bullet>
              <Bullet>Inspector accountability via signed reports</Bullet>
            </ul>
          </PlasticCard>
        </div>

        <StlSourceMatrix type={type} />

        {/* User-type-specific CRB benefits */}
        <PlasticCard className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                As a {type.name}
              </div>
              <h3 className="mt-1 text-lg font-semibold">CRB benefits + rules</h3>
            </div>
            <Chip tone="teal">
              {type.requires.crb > 0 ? `Min CRB L${type.requires.crb}` : 'CRB optional'}
            </Chip>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <div className="mb-2 text-xs uppercase tracking-widest text-[#38C878]">
                Benefits
              </div>
              <ul className="space-y-2 text-sm">
                {type.benefits.slice(0, 5).map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 rounded-card border border-glass bg-nested/60 p-3"
                  >
                    <span className="text-[#38C878]">✓</span>
                    <span className="text-white/80">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-2 text-xs uppercase tracking-widest text-[#F05858]">
                Rules
              </div>
              <ul className="space-y-2 text-sm">
                {type.rules.map((r, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 rounded-card border border-glass bg-nested/60 p-3"
                  >
                    <span className="text-[#F05858]">⚠</span>
                    <span className="text-white/80">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </PlasticCard>

        {/* Exam types */}
        <PlasticCard className="p-5">
          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
              Exam formats
            </div>
            <h3 className="mt-1 text-lg font-semibold">3 certification modalities</h3>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {EXAM_TYPES.map((e) => (
              <div
                key={e.type}
                className="rounded-card border border-glass bg-nested/60 p-4"
                style={{ borderLeft: `3px solid ${e.color}` }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{e.icon}</span>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: e.color }}>
                      {e.type}
                    </div>
                    <div className="text-[11px] text-white/50">{e.desc}</div>
                  </div>
                </div>
                <ul className="mt-3 space-y-1 text-xs text-white/70">
                  {e.details.map((d) => (
                    <li key={d} className="flex gap-1.5">
                      <span style={{ color: e.color }}>•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </PlasticCard>

        {/* Inspection flow */}
        <PlasticCard className="p-5">
          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
              End-to-end flow
            </div>
            <h3 className="mt-1 text-lg font-semibold">
              From application to on-chain certificate
            </h3>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {CRB_INSPECTION_FLOW.map((s) => (
              <div
                key={s.step}
                className="flex items-start gap-3 rounded-card border border-glass bg-nested/60 p-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-gradient-to-br from-teal/30 to-amber/20 text-xl">
                  {s.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-white/40">Step {s.step}</div>
                  <div className="text-sm font-semibold">{s.title}</div>
                  <div className="mt-0.5 text-xs text-white/60">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </PlasticCard>

        {/* Industry map */}
        <PlasticCard className="p-5">
          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
              Per-industry certification
            </div>
            <h3 className="mt-1 text-lg font-semibold">
              What CRB looks like across EHB industries
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-glass text-[11px] uppercase text-white/40">
                  <th className="px-2 py-2">Industry</th>
                  <th className="px-2 py-2">Exams</th>
                  <th className="px-2 py-2">Refill</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {INDUSTRY_MAP.map((i) => (
                  <tr key={i.industry}>
                    <td className="px-2 py-2 font-semibold">{i.industry}</td>
                    <td className="px-2 py-2 text-white/70">
                      {i.exams.map((e) => (
                        <span
                          key={e}
                          className="mr-1 inline-block rounded-chip border border-glass bg-nested/40 px-1.5 py-0.5 text-xs"
                        >
                          {e}
                        </span>
                      ))}
                    </td>
                    <td className="px-2 py-2">
                      <Chip tone={i.refill.includes('None') ? 'default' : 'amber'}>
                        {i.refill}
                      </Chip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PlasticCard>

        {/* Benefits by party */}
        <PlasticCard className="p-5">
          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
              Who benefits
            </div>
            <h3 className="mt-1 text-lg font-semibold">
              CRB makes specialized services trustworthy
            </h3>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {BENEFITS_BY_PARTY.map((b) => (
              <div key={b.party} className="rounded-card border border-glass bg-nested/60 p-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{b.icon}</span>
                  <span className="text-sm font-semibold">{b.party}</span>
                </div>
                <ul className="mt-3 space-y-1.5 text-xs text-white/70">
                  {b.benefits.map((x) => (
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

        {/* CRB 10-level ladder */}
        <PlasticCard className="p-5">
          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
              CRB 10-level ladder
            </div>
            <h3 className="mt-1 text-lg font-semibold">L1 Basic docs → L10 Certified</h3>
            <p className="mt-1 text-xs text-white/50">
              Source cap: L9 ELITE. L10 only via DMO board approval.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { l: 1, name: 'Basic docs', req: 'Docs uploaded' },
              { l: 2, name: 'Reviewed', req: 'DMO reviewed' },
              { l: 3, name: 'Exam pass', req: 'MCQ pass' },
              { l: 4, name: 'Practical', req: 'Practical pass' },
              { l: 5, name: 'Inspected', req: 'Field audit complete' },
              { l: 6, name: 'Verified', req: 'Regulator cross-check' },
              { l: 7, name: 'Elite exam', req: 'Advanced practical' },
              { l: 8, name: 'Audit passed', req: 'Full business audit' },
              { l: 9, name: 'ELITE', req: 'Expert tier — source cap' },
              { l: 10, name: 'Certified', req: 'DMO board approval' },
            ].map((t) => (
              <div key={t.l} className="rounded-card border border-glass bg-nested/60 p-3">
                <div className="flex items-center justify-between">
                  <StlBadge level={t.l} size="xs" showName={false} />
                  <span className="text-xs font-semibold text-white/80">{t.name}</span>
                </div>
                <div className="mt-2 text-[11px] text-white/50">{t.req}</div>
              </div>
            ))}
          </div>
        </PlasticCard>
      </div>
    </>
  );
}

function StatMini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
        {label}
      </div>
      <div className="mt-0.5 text-base font-bold sm:text-lg">{value}</div>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-0.5 text-teal">●</span>
      <span>{children}</span>
    </li>
  );
}
