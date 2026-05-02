'use client';

import { useMemo, useState } from 'react';
import { DmoTopbar } from '@/components/dmo/topbar';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';
import { StlBadge } from '@/components/ui/stl-badge';
import { UserTypeSelector } from '@/components/dmo/user-type-selector';
import { StlSourceMatrix } from '@/components/dmo/stl-source-matrix';
import { getUserType, type UserTypeId } from '@/lib/stl/user-types';

const PSS_CATEGORIES = [
  {
    name: 'Identity',
    icon: '🆔',
    color: '#7B6EF6',
    features: [
      'CNIC / Passport / Driver License OCR',
      'Biometric liveness (face match)',
      'Address proof upload',
      'Phone number OTP verification',
      'Email verification',
      'Selfie + document side-by-side',
    ],
  },
  {
    name: 'Financial',
    icon: '💳',
    color: '#2BBFA0',
    features: [
      'Bank account linking',
      'JazzCash / Easypaisa wallet link',
      'Income proof (salary slip / bank statement)',
      'Tax filer status (FBR cross-check)',
      'Credit history stub (future)',
    ],
  },
  {
    name: 'Business',
    icon: '🏢',
    color: '#F0A030',
    features: [
      'KYB — NTN / SECP registration',
      'Director identity verification',
      'Business address validation',
      'Industry certification (if regulated)',
      'Company ownership chain',
    ],
  },
  {
    name: 'Behavioral',
    icon: '📊',
    color: '#ec4899',
    features: [
      'Transaction pattern analysis',
      'Device fingerprint',
      'Geolocation consistency',
      'Login velocity monitoring',
      'Session anomaly detection',
    ],
  },
  {
    name: 'Compliance',
    icon: '⚖️',
    color: '#F05858',
    features: [
      'OFAC / UN sanctions screening',
      'PEP (politically-exposed persons) check',
      'AML rule engine',
      'GDPR / data residency flag',
      'Regulator watchlist cross-check',
    ],
  },
];

const PSS_FLOW = [
  { step: 1, title: 'Submit', desc: 'User uploads doc + liveness capture', icon: '📸' },
  { step: 2, title: 'OCR extract', desc: 'Vendor extracts name, DOB, doc#', icon: '🔍' },
  { step: 3, title: 'AML screen', desc: 'Sanctions + PEP + watchlist check', icon: '🛡️' },
  { step: 4, title: 'Liveness verify', desc: 'Face match confidence ≥ 0.9', icon: '🤳' },
  { step: 5, title: 'Auto-decision', desc: 'High confidence → L3 instant', icon: '🤖' },
  { step: 6, title: 'Manual review', desc: 'Low confidence → DMO queue', icon: '👤' },
];

const BENEFITS_BY_PARTY = [
  {
    party: 'User / Applicant',
    icon: '👤',
    benefits: [
      'Unlock buying + selling on platform',
      'Higher STL = better ranking, lower fees',
      'Priority support + faster disputes',
      'Insurance coverage on disputes',
      'Build provable trust history (on-chain anchored)',
    ],
  },
  {
    party: 'Platform (EHB)',
    icon: '🏛️',
    benefits: [
      'Fraud reduction — real-time AML catches bad actors',
      'Regulatory compliance (PK + US + EU ready)',
      'Reduced chargeback liability',
      'Clean user base attracts premium sellers',
      'Automated KYC scales without ops cost',
    ],
  },
  {
    party: 'Counterparties',
    icon: '🤝',
    benefits: [
      "Know who you're transacting with (MIN-chain visibility)",
      'Faster resolution on disputes (identity proven)',
      'Higher trust = negotiate better terms',
      'Rider/seller verification before hiring',
    ],
  },
];

export default function PssPage() {
  const [userType, setUserType] = useState<UserTypeId>('seller');
  const type = useMemo(() => getUserType(userType), [userType]);

  return (
    <>
      <DmoTopbar
        title="PSS Monitoring"
        subtitle="Personal Security System — identity + behavioral verification backbone"
        breadcrumb={['Verification', 'PSS']}
      />
      <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
        {/* User type selector */}
        <PlasticCard className="p-4 sm:p-5">
          <UserTypeSelector value={userType} onChange={setUserType} />
        </PlasticCard>

        {/* Hero overview */}
        <PlasticCard className="overflow-hidden p-0">
          <div
            className="relative p-5 sm:p-8"
            style={{
              background:
                'linear-gradient(135deg, rgba(123, 110, 246, 0.15), rgba(44, 191, 160, 0.05) 60%, transparent)',
            }}
          >
            <div className="flex flex-wrap items-start gap-4 sm:gap-6">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-card text-4xl shadow-2xl sm:h-20 sm:w-20 sm:text-5xl"
                style={{
                  background: 'linear-gradient(135deg, #7B6EF6, #A098F8)',
                  boxShadow: '0 12px 40px rgba(123,110,246,0.4)',
                }}
              >
                🛡️
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Chip tone="purple">Core System #1</Chip>
                  <Chip>27 features · 5 categories</Chip>
                </div>
                <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
                  Personal Security System (PSS)
                </h1>
                <p className="mt-2 text-sm text-white/70 sm:text-base">
                  Identity verification backbone — every EHB user must pass PSS to transact.
                  10 levels (L0 None → L10 Full Verified). Source cap:{' '}
                  <b>L5 ADVANCED</b> — PSS alone cannot take you higher.
                </p>
              </div>
              <div className="flex w-full justify-between gap-3 border-t border-glass pt-4 sm:w-auto sm:flex-col sm:border-t-0 sm:pt-0">
                <StatMini label="STL contribution" value="0–40 pts" />
                <StatMini label="Source cap" value="L5 ADVANCED" />
              </div>
            </div>
          </div>
        </PlasticCard>

        {/* What / How / Benefits */}
        <div className="grid gap-4 lg:grid-cols-3">
          <PlasticCard className="p-5">
            <div className="text-[10px] uppercase tracking-widest text-[#7B6EF6] sm:text-xs">
              What PSS does
            </div>
            <h3 className="mt-1 text-lg font-semibold">Identity backbone of every transaction</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <Bullet>Real-time identity verification — not one-time</Bullet>
              <Bullet>KYC + liveness + AML + behavioral monitoring</Bullet>
              <Bullet>Cross-check against government DBs (NADRA, FBR)</Bullet>
              <Bullet>Continuous risk scoring based on transaction patterns</Bullet>
              <Bullet>Anchors KYC proofs on Polkadot for dispute use</Bullet>
            </ul>
          </PlasticCard>

          <PlasticCard className="p-5">
            <div className="text-[10px] uppercase tracking-widest text-[#2BBFA0] sm:text-xs">
              How PSS works
            </div>
            <h3 className="mt-1 text-lg font-semibold">Automated decision + human escalation</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <Bullet>OCR extraction via adapter (Jumio / Onfido / NADRA)</Bullet>
              <Bullet>AML adapter (ComplyAdvantage / Refinitiv) screens sanctions</Bullet>
              <Bullet>Liveness vendor returns confidence score</Bullet>
              <Bullet>≥ 0.9 auto-approve L3, lower → DMO manual queue</Bullet>
              <Bullet>Risk engine downgrades on anomaly signals</Bullet>
            </ul>
          </PlasticCard>

          <PlasticCard className="p-5">
            <div className="text-[10px] uppercase tracking-widest text-[#F0A030] sm:text-xs">
              Why PSS matters
            </div>
            <h3 className="mt-1 text-lg font-semibold">Trust without friction at scale</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <Bullet>Prevents fake accounts + multi-account fraud</Bullet>
              <Bullet>Enables instant escrow + high-value transactions</Bullet>
              <Bullet>Regulatory compliance (SECP, FBR, OFAC-ready)</Bullet>
              <Bullet>Foundation for STL composite score</Bullet>
              <Bullet>Unlocks platform features tied to trust level</Bullet>
            </ul>
          </PlasticCard>
        </div>

        {/* STL source matrix for selected user type */}
        <StlSourceMatrix type={type} />

        {/* User-type-specific benefits + rules */}
        <PlasticCard className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                As a {type.name}
              </div>
              <h3 className="mt-1 text-lg font-semibold">Your PSS benefits + rules</h3>
            </div>
            <Chip tone="purple">{type.tagline}</Chip>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <div className="mb-2 text-xs uppercase tracking-widest text-[#38C878]">
                Benefits at each STL tier
              </div>
              <ul className="space-y-2 text-sm">
                {type.benefits.map((b, i) => (
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
                Rules + downgrade triggers
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

        {/* 27 features across 5 categories */}
        <PlasticCard className="p-5">
          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
              Complete capability map
            </div>
            <h3 className="mt-1 text-lg font-semibold">27 PSS features · 5 categories</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PSS_CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                className="rounded-card border border-glass bg-nested/60 p-4"
                style={{ borderLeft: `3px solid ${cat.color}` }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{cat.icon}</span>
                  <span className="text-sm font-semibold" style={{ color: cat.color }}>
                    {cat.name}
                  </span>
                  <Chip>{cat.features.length}</Chip>
                </div>
                <ul className="mt-3 space-y-1 text-xs text-white/70">
                  {cat.features.map((f) => (
                    <li key={f} className="flex gap-1.5">
                      <span style={{ color: cat.color }}>•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </PlasticCard>

        {/* Flow */}
        <PlasticCard className="p-5">
          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
              Submission flow
            </div>
            <h3 className="mt-1 text-lg font-semibold">From upload to decision in seconds</h3>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {PSS_FLOW.map((s) => (
              <div
                key={s.step}
                className="flex items-start gap-3 rounded-card border border-glass bg-nested/60 p-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-gradient-to-br from-purple/30 to-teal/20 text-xl">
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

        {/* Benefits by party */}
        <PlasticCard className="p-5">
          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
              Who benefits
            </div>
            <h3 className="mt-1 text-lg font-semibold">Why PSS is a net positive for everyone</h3>
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
