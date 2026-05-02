'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { PublicNav } from '@/components/ui/public-nav';
import { PublicFooter } from '@/components/ui/public-footer';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';
import { StlBadge } from '@/components/ui/stl-badge';
import { Button3D } from '@/components/ui/button-3d';
import { CircularGauge } from '@/components/ui/circular-gauge';
import { StlJourney, type JourneyStep } from '@/components/ui/stl-journey';
import { AffiliateCard } from '@/components/ui/affiliate-card';
import { useAuth } from '@/lib/auth-context';
import { getLevelDef } from '@/lib/stl/levels';

// ============================================================================
// Demo data — will be replaced with real aggregates when API wired
// ============================================================================
const DEMO_STL = {
  score: 78.6,
  level: 7,
  levelName: 'Trusted Partner',
  progressToNext: 78.6,
  nextLevelPoints: 21.4,
  ehbgcBalance: 12450.75,
  ehbgcLocked: 24500,
  globalRank: 1243,
  aiEarnings30d: 342.5, // $ earned via AI marketplace in last 30 days
  aiSessionsMonth: 28,
  breakdown: [
    { key: 'pss', label: 'PSS Score', icon: '🛡️', score: 80, max: 100, from: '#7B6EF6', to: '#A098F8' },
    { key: 'crb', label: 'CRB Score', icon: '📜', score: 75, max: 100, from: '#2BBFA0', to: '#38C878' },
    { key: 'perf', label: 'Performance', icon: '🚀', score: 82, max: 100, from: '#F0A030', to: '#F8B830' },
    { key: 'behav', label: 'Behavior', icon: '💫', score: 70, max: 100, from: '#ec4899', to: '#db2777' },
    { key: 'ind', label: 'Industry Boost', icon: '🌍', score: 85, max: 100, from: '#06b6d4', to: '#0891b2' },
  ],
  industries: [
    { code: 'GSM', name: 'GoSellr', level: 7, score: 78, icon: '🛒', href: '/gosellr', from: '#2BBFA0', to: '#38C878' },
    { code: 'JPS', name: 'JPS', level: 5, score: 65, icon: '📄', href: '/jobs', from: '#ec4899', to: '#db2777' },
    { code: 'WMS', name: 'WMS (Health)', level: 6, score: 70, icon: '🩺', href: '/industries/wms', from: '#F05858', to: '#C03030' },
    { code: 'HPS', name: 'HPS (Education)', level: 7, score: 75, icon: '🎓', href: '/industries/hps', from: '#7B6EF6', to: '#A098F8' },
    { code: 'SOT', name: 'SOT (Tech)', level: 6, score: 68, icon: '🏕️', href: '/industries/sot', from: '#fbbf24', to: '#f59e0b' },
    { code: 'OTHER', name: 'Others', level: 5, score: 60, icon: '🌐', href: '/industries', from: '#3b82f6', to: '#2563eb' },
  ],
  recentActivity: [
    { delta: 2.5, title: 'CRB Verification Completed', ago: '2 hours ago', type: 'positive', src: 'CRB' },
    { delta: 1.2, title: 'EHBGC Locked (+5k)', ago: '1 day ago', type: 'positive', src: 'Wallet' },
    { delta: 3.0, title: '5-star review on ORD-1042', ago: '2 days ago', type: 'positive', src: 'GoSellr' },
    { delta: -1.0, title: 'Late delivery penalty', ago: '5 days ago', type: 'negative', src: 'DMO' },
    { delta: 2.0, title: 'Order completion bonus', ago: '1 week ago', type: 'positive', src: 'GoSellr' },
    { delta: 0.8, title: 'AI Tutor 5-star rating', ago: '1 week ago', type: 'positive', src: 'AI Marketplace' },
  ],
};

// ============================================================================
// The 6-step user journey — PSS → CRB → DMO → EHBGC → AI Marketplace
// ============================================================================
const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 1,
    title: 'Register & KYC',
    subtitle: 'Email, phone, wallet — earn your L1 badge in 2 minutes.',
    icon: '👤',
    status: 'done',
    cap: 'L1',
    href: '/signup',
    from: '#6b7280',
    to: '#9ca3af',
  },
  {
    id: 2,
    title: 'PSS Verification',
    subtitle: 'CNIC + selfie + liveness check. OCR + AML sanctions scan.',
    icon: '🛡️',
    status: 'done',
    cap: 'L5',
    href: '/pss',
    cta: 'Re-verify',
    from: '#7B6EF6',
    to: '#A098F8',
  },
  {
    id: 3,
    title: 'CRB Exam',
    subtitle: 'Category-specific skill test. Certificates signed on-chain.',
    icon: '📜',
    status: 'current',
    cap: 'L9',
    href: '/crb/exams',
    cta: 'Take exam',
    from: '#2BBFA0',
    to: '#38C878',
  },
  {
    id: 4,
    title: 'DMO Performance',
    subtitle: 'Order completion, complaints, response time — monitored live.',
    icon: '🚀',
    status: 'locked',
    cap: 'L10',
    href: '/dmo',
    from: '#F0A030',
    to: '#F8B830',
  },
  {
    id: 5,
    title: 'EHBGC Lock + Franchise',
    subtitle: 'Lock EHBGC coin or join a franchise to boost and stabilize STL.',
    icon: '🔒',
    status: 'locked',
    cap: 'L10',
    href: '/wallet',
    from: '#ec4899',
    to: '#db2777',
  },
  {
    id: 6,
    title: 'Active on AI Marketplace',
    subtitle: 'Earn per-session as verified service provider (lawyer, tutor, doctor).',
    icon: '🤖',
    status: 'locked',
    cap: 'Earn',
    href: '/ai-marketplace',
    from: '#06b6d4',
    to: '#0891b2',
  },
];

// ============================================================================
// AI Marketplace — which services unlock at which STL level
// ============================================================================
const AI_SERVICES = [
  {
    id: 'resume',
    name: 'Resume Helper',
    icon: '📄',
    minLevel: 3,
    category: 'JPS',
    desc: 'AI-powered CV builder + interview coach',
    from: '#0080c8',
    to: '#30d0ff',
  },
  {
    id: 'tutor',
    name: 'AI Tutor',
    icon: '🎓',
    minLevel: 3,
    category: 'HPS',
    desc: 'Curriculum-aligned subject tutor for K-12',
    from: '#2BBFA0',
    to: '#38C878',
  },
  {
    id: 'business',
    name: 'Business Advisor',
    icon: '📈',
    minLevel: 5,
    category: 'GSM',
    desc: 'Growth, pricing, and market entry advice',
    from: '#F0A030',
    to: '#F8B830',
  },
  {
    id: 'lawyer',
    name: 'Lawyer AI',
    icon: '⚖️',
    minLevel: 5,
    category: 'OLS',
    desc: 'Contract review + legal-research assistant',
    from: '#7B6EF6',
    to: '#A098F8',
  },
  {
    id: 'diagnosis',
    name: 'Diagnosis AI',
    icon: '🩺',
    minLevel: 7,
    category: 'WMS',
    desc: 'Symptom triage + differential — doctor-reviewed',
    from: '#F05858',
    to: '#C03030',
  },
  {
    id: 'fraud',
    name: 'Fraud Detection',
    icon: '🛡️',
    minLevel: 9,
    category: 'DMO',
    desc: 'Transaction anomaly + seller risk scoring',
    from: '#7a1010',
    to: '#F05858',
  },
];

// ============================================================================
// Up / Down rules
// ============================================================================
const UP_RULES = [
  { icon: '✅', title: 'Complete CRB exam', pts: '+2 to +5', src: 'CRB' },
  { icon: '🔒', title: 'Lock EHBGC (≥ 5,000)', pts: '+1 per tier', src: 'Wallet' },
  { icon: '⭐', title: '5-star reviews on orders', pts: '+0.2 each', src: 'GoSellr' },
  { icon: '🚀', title: 'Fast order fulfillment', pts: '+0.5 weekly', src: 'DMO' },
  { icon: '🏛', title: 'Join a franchise tier', pts: '+1 to +3', src: 'Franchise' },
  { icon: '🤖', title: 'Top-rated AI sessions', pts: '+0.3 each', src: 'AI Marketplace' },
];

const DOWN_RULES = [
  { icon: '⚠️', title: 'T6 fraud complaint upheld', pts: '-3 + flag', src: 'DMO' },
  { icon: '⏰', title: 'Late delivery (>3 orders)', pts: '-1 per', src: 'GoSellr' },
  { icon: '📉', title: 'CRB certificate expired', pts: '-2', src: 'CRB' },
  { icon: '🔓', title: 'EHBGC unlocked early', pts: '-1 per tier', src: 'Wallet' },
  { icon: '❌', title: 'Ignored refund request', pts: '-1.5', src: 'DMO' },
  { icon: '🚫', title: 'Failed PSS re-verification', pts: '-5 + cap', src: 'PSS' },
];

// ============================================================================
// Recommended next actions
// ============================================================================
const RECOMMENDATIONS = [
  {
    priority: 'high',
    title: 'Take GoSellr CRB exam (Category: Retail)',
    detail: 'Raise CRB score 75 → 85. Unlocks Sub L4 franchise eligibility.',
    expectedGain: '+5.0 STL',
    href: '/crb/exams',
    cta: 'Start exam',
    icon: '📜',
  },
  {
    priority: 'high',
    title: 'Lock 10,000 EHBGC (Tier 2)',
    detail: 'Stabilizes your STL floor at L6 for next 12 months.',
    expectedGain: '+2.0 STL',
    href: '/wallet',
    cta: 'Lock EHBGC',
    icon: '🔒',
  },
  {
    priority: 'med',
    title: 'Activate AI Tutor service (HPS)',
    detail: 'Unlocks $40-80/hour earnings as verified tutor.',
    expectedGain: '+$320/mo',
    href: '/ai-marketplace',
    cta: 'Go live',
    icon: '🤖',
  },
  {
    priority: 'med',
    title: 'Complete 10 more orders this week',
    detail: 'Weekly DMO bonus for consistent fulfillment.',
    expectedGain: '+1.5 STL',
    href: '/gosellr',
    cta: 'View orders',
    icon: '🚀',
  },
];

// ============================================================================
// MAIN PAGE
// ============================================================================
export default function MyStlPage() {
  const { user } = useAuth();
  const [selectedBreakdown, setSelectedBreakdown] = useState<string | null>(null);
  const levelDef = useMemo(() => getLevelDef(DEMO_STL.level), []);

  return (
    <>
      <PublicNav />
      <main className="min-h-screen py-6 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* ================================================================ */}
          {/* Header */}
          {/* ================================================================ */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                My Service Trust Level
              </div>
              <h1 className="mt-1 text-2xl font-bold sm:text-3xl">STL Dashboard</h1>
              <p className="mt-1 max-w-xl text-xs text-white/55 sm:text-sm">
                Aapka trust score 3 sources se aata hai — PSS (L5 cap) + CRB (L9 cap) + DMO (L10 cap).
                AI Marketplace tak pahunchne ka ye gateway hai.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <PlasticCard className="px-3 py-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-lg">💰</span>
                  <div>
                    <div className="text-[9px] uppercase tracking-widest text-white/40">
                      EHBGC Balance
                    </div>
                    <div className="text-sm font-bold tabular-nums">
                      {DEMO_STL.ehbgcBalance.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                </div>
              </PlasticCard>
            </div>
          </div>

          {/* ================================================================ */}
          {/* HERO — Gauge + Sidebar */}
          {/* ================================================================ */}
          <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
            <PlasticCard className="overflow-hidden p-0">
              <div
                className="relative flex flex-col items-center p-6 sm:p-8"
                style={{
                  background:
                    'radial-gradient(ellipse at top, rgba(123, 110, 246, 0.12), transparent 60%), linear-gradient(135deg, rgba(43, 191, 160, 0.06), transparent 80%)',
                }}
              >
                <CircularGauge
                  score={DEMO_STL.score}
                  level={DEMO_STL.level}
                  levelName={DEMO_STL.levelName.toUpperCase()}
                  size={280}
                  strokeWidth={20}
                  gradientFrom={levelDef.from}
                  gradientTo={levelDef.to}
                  gradientGlow={levelDef.to}
                />

                <div className="mt-6 w-full max-w-md">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/70">Progress to Level {DEMO_STL.level + 1}</span>
                    <span className="tabular-nums font-semibold" style={{ color: levelDef.to }}>
                      {DEMO_STL.progressToNext}%
                    </span>
                  </div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-chip bg-white/5">
                    <div
                      className="h-full rounded-chip transition-all"
                      style={{
                        width: `${DEMO_STL.progressToNext}%`,
                        background: `linear-gradient(to right, ${levelDef.from}, ${levelDef.to})`,
                        boxShadow: `0 0 12px ${levelDef.to}66`,
                      }}
                    />
                  </div>
                  <div className="mt-2 text-center text-xs text-white/50">
                    Need{' '}
                    <span className="font-semibold text-white/80">
                      {DEMO_STL.nextLevelPoints}
                    </span>{' '}
                    more points
                  </div>
                </div>
              </div>
            </PlasticCard>

            <div className="space-y-4">
              <PlasticCard className="p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-card bg-gradient-to-br from-[#7B6EF6] to-[#A098F8] text-xl">
                    🔒
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40">
                      EHBGC Locked
                    </div>
                    <div className="text-xl font-bold tabular-nums">
                      {DEMO_STL.ehbgcLocked.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-white/50">Locked for STL Boost</div>
                  </div>
                </div>
              </PlasticCard>

              <PlasticCard className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40">
                      Global Rank
                    </div>
                    <div className="text-2xl font-bold tabular-nums">
                      #{DEMO_STL.globalRank}
                    </div>
                    <div className="mt-1 text-[10px] text-teal">Top 8% worldwide</div>
                  </div>
                  <div className="text-3xl">🏆</div>
                </div>
              </PlasticCard>

              <PlasticCard className="p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-card bg-gradient-to-br from-[#06b6d4] to-[#0891b2] text-xl">
                    🤖
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40">
                      AI Marketplace (30d)
                    </div>
                    <div className="text-xl font-bold tabular-nums text-teal">
                      ${DEMO_STL.aiEarnings30d.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-white/50">
                      {DEMO_STL.aiSessionsMonth} sessions this month
                    </div>
                  </div>
                </div>
              </PlasticCard>
            </div>
          </div>

          {/* ================================================================ */}
          {/* AFFILIATE CARD — compact widget on user STL dashboard */}
          {/* ================================================================ */}
          <div className="mt-4">
            <AffiliateCard />
          </div>

          {/* ================================================================ */}
          {/* USER JOURNEY STEPPER (NEW) */}
          {/* ================================================================ */}
          <PlasticCard className="mt-4 p-5 sm:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                  Your EHB Trust Journey
                </div>
                <h2 className="mt-1 text-lg font-semibold sm:text-xl">
                  Register → PSS → CRB → DMO → AI Marketplace
                </h2>
                <p className="mt-1 text-xs text-white/55">
                  Har step apni STL cap deta hai. Sab complete karein → L10 tak pahuchen → AI
                  Marketplace par earn karein.
                </p>
              </div>
              <Chip tone="purple">6 steps · 3 done</Chip>
            </div>
            <StlJourney steps={JOURNEY_STEPS} currentLevel={DEMO_STL.level} />
          </PlasticCard>

          {/* ================================================================ */}
          {/* PSS + CRB + DMO triple card (source caps explained) */}
          {/* ================================================================ */}
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {/* PSS card */}
            <PlasticCard className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-card bg-gradient-to-br from-[#7B6EF6] to-[#A098F8] text-2xl">
                    🛡️
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40">
                      Identity Source
                    </div>
                    <h3 className="text-lg font-bold">PSS</h3>
                  </div>
                </div>
                <span className="rounded-chip bg-teal/20 px-2 py-0.5 text-[10px] font-bold text-teal">
                  VERIFIED
                </span>
              </div>
              <div className="text-xs text-white/60">
                Personal Security System — identity verification via CNIC/passport + selfie
                liveness + AML sanctions scan.
              </div>
              <div className="mt-3 space-y-1.5 text-[11px]">
                <Row label="Current score" value="80 / 100" tone="teal" />
                <Row label="Source cap" value="L5" tone="purple" />
                <Row label="Documents" value="CNIC + selfie" tone="default" />
                <Row label="Next check" value="Jun 2027" tone="default" />
              </div>
              <Link
                href="/pss"
                className="mt-3 flex items-center justify-center rounded-chip border border-purple-light/40 bg-purple/10 px-3 py-1.5 text-[11px] font-semibold text-purple-light hover:bg-purple/20"
              >
                View PSS details →
              </Link>
            </PlasticCard>

            {/* CRB card */}
            <PlasticCard className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-card bg-gradient-to-br from-[#2BBFA0] to-[#38C878] text-2xl">
                    📜
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40">
                      Skill Source
                    </div>
                    <h3 className="text-lg font-bold">CRB</h3>
                  </div>
                </div>
                <span className="rounded-chip bg-amber/20 px-2 py-0.5 text-[10px] font-bold text-amber">
                  IN PROGRESS
                </span>
              </div>
              <div className="text-xs text-white/60">
                Credential & Reputation Board — category-specific exams, signed certificates
                anchored to Polkadot.
              </div>
              <div className="mt-3 space-y-1.5 text-[11px]">
                <Row label="Current score" value="75 / 100" tone="teal" />
                <Row label="Source cap" value="L9" tone="purple" />
                <Row label="Exams passed" value="2 of 3" tone="amber" />
                <Row label="Certificates" value="On-chain ✓" tone="teal" />
              </div>
              <Link
                href="/crb/exams"
                className="mt-3 flex items-center justify-center rounded-chip border border-teal/40 bg-teal/10 px-3 py-1.5 text-[11px] font-semibold text-teal hover:bg-teal/20"
              >
                Take next exam →
              </Link>
            </PlasticCard>

            {/* DMO card */}
            <PlasticCard className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-card bg-gradient-to-br from-[#F0A030] to-[#F8B830] text-2xl">
                    🚀
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40">
                      Performance Source
                    </div>
                    <h3 className="text-lg font-bold">DMO</h3>
                  </div>
                </div>
                <span className="rounded-chip bg-teal/20 px-2 py-0.5 text-[10px] font-bold text-teal">
                  LIVE
                </span>
              </div>
              <div className="text-xs text-white/60">
                Decentralized Management Office — real-time monitoring: order fulfillment,
                complaints, response time, behavior.
              </div>
              <div className="mt-3 space-y-1.5 text-[11px]">
                <Row label="Current score" value="82 / 100" tone="teal" />
                <Row label="Source cap" value="L10" tone="purple" />
                <Row label="Orders (30d)" value="124 / 118 fulfilled" tone="teal" />
                <Row label="Complaints" value="0 open" tone="teal" />
              </div>
              <Link
                href="/dmo/stl"
                className="mt-3 flex items-center justify-center rounded-chip border border-amber/40 bg-amber/10 px-3 py-1.5 text-[11px] font-semibold text-amber hover:bg-amber/20"
              >
                View DMO panel →
              </Link>
            </PlasticCard>
          </div>

          {/* ================================================================ */}
          {/* FORMULA EXPLAINER */}
          {/* ================================================================ */}
          <PlasticCard className="mt-4 p-5 sm:p-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-2xl">🧮</span>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">
                  Protected formula (58 gold-master tests)
                </div>
                <h2 className="text-lg font-bold sm:text-xl">How your STL is calculated</h2>
              </div>
            </div>
            <div className="grid gap-3 lg:grid-cols-2">
              <div className="rounded-card border border-glass bg-nested p-4 font-mono text-xs leading-6 text-white/80">
                <div>
                  <span className="text-purple-light">PSS_points</span> ={' '}
                  <span className="text-amber">(PSS_level / 10)</span> × 40
                </div>
                <div>
                  <span className="text-teal">CRB_points</span> ={' '}
                  <span className="text-amber">(CRB_level / 10)</span> × 40
                </div>
                <div>
                  <span className="text-[#F0A030]">DMO_points</span> ={' '}
                  <span className="text-amber">(DMO_level / 10)</span> × 40
                </div>
                <div className="mt-2 border-t border-glass pt-2">
                  <span className="text-white">Score</span> = PSS_points + CRB_points + DMO_points{' '}
                  <span className="text-white/40">// 0–120</span>
                </div>
                <div className="mt-1">
                  <span className="text-white">Final_STL</span> = MIN(Score / 1.2,{' '}
                  <span className="text-[#ec4899]">lowest_component + 1</span>)
                </div>
              </div>
              <div className="space-y-2 text-xs text-white/70">
                <div className="flex items-start gap-2">
                  <span className="text-teal">①</span>
                  <span>
                    3 sources (PSS, CRB, DMO) har ek 40 points de sakta hai. Total 120.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-teal">②</span>
                  <span>Score / 1.2 = tentative STL (max 100).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber">③</span>
                  <span>
                    <strong>MIN-chain rule:</strong> koi ek source kamzor hai to overall STL wahi
                    bottleneck ban jata hai (lowest + 1).
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-light">④</span>
                  <span>
                    Source caps: PSS → L5, Franchise → L8, CRB → L9, DMO → L10.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#ec4899]">⑤</span>
                  <span>
                    Final EHB STL = MIN(productSTL, sellerSTL, companySTL, ownerSTL).
                  </span>
                </div>
              </div>
            </div>
          </PlasticCard>

          {/* ================================================================ */}
          {/* AI MARKETPLACE ACCESS — what you unlock at each level */}
          {/* ================================================================ */}
          <PlasticCard className="mt-4 p-5 sm:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                  AI Marketplace Access
                </div>
                <h2 className="mt-1 text-lg font-semibold sm:text-xl">
                  Services unlock based on your STL level
                </h2>
                <p className="mt-1 text-xs text-white/55">
                  Higher STL = higher-value AI services + higher per-session earnings.
                </p>
              </div>
              <Link
                href="/ai-marketplace"
                className="rounded-chip border border-glass bg-white/5 px-3 py-1.5 text-xs hover:border-purple-light"
              >
                Open marketplace →
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {AI_SERVICES.map((s) => {
                const unlocked = DEMO_STL.level >= s.minLevel;
                return (
                  <div
                    key={s.id}
                    className={`relative overflow-hidden rounded-card border p-4 transition ${
                      unlocked
                        ? 'border-teal/40 bg-gradient-to-br from-teal/5 to-transparent'
                        : 'border-glass bg-nested/40 opacity-70'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-card text-2xl"
                        style={{
                          background: `linear-gradient(135deg, ${s.from}, ${s.to})`,
                          boxShadow: unlocked ? `0 4px 16px ${s.to}55` : 'none',
                          filter: unlocked ? 'none' : 'grayscale(60%)',
                        }}
                      >
                        {s.icon}
                      </div>
                      <span
                        className={`rounded-chip px-2 py-0.5 text-[9px] font-bold ${
                          unlocked
                            ? 'bg-teal/20 text-teal'
                            : 'bg-white/10 text-white/50'
                        }`}
                      >
                        {unlocked ? '● UNLOCKED' : `🔒 L${s.minLevel}+`}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5">
                      <span className="text-sm font-bold">{s.name}</span>
                      <span className="rounded-chip bg-white/10 px-1.5 py-0.5 text-[9px] font-bold text-white/60">
                        {s.category}
                      </span>
                    </div>
                    <div className="mt-1 text-[11px] text-white/55">{s.desc}</div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-[10px] text-white/40">
                        Min STL: <span className="font-bold text-white/70">L{s.minLevel}</span>
                      </div>
                      {unlocked ? (
                        <Link
                          href={`/ai-marketplace/${s.id}`}
                          className="rounded-chip bg-teal/20 px-2 py-0.5 text-[10px] font-bold text-teal hover:bg-teal/30"
                        >
                          Use →
                        </Link>
                      ) : (
                        <span className="text-[10px] text-white/40">
                          Need +{s.minLevel - DEMO_STL.level} levels
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </PlasticCard>

          {/* ================================================================ */}
          {/* Industry STL Levels */}
          {/* ================================================================ */}
          <PlasticCard className="mt-4 p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                  Industry STL Levels
                </div>
                <h2 className="mt-1 text-lg font-semibold sm:text-xl">
                  Per-industry trust scores
                </h2>
              </div>
              <Link href="/industries" className="text-xs text-purple-light hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {DEMO_STL.industries.map((ind) => (
                <Link key={ind.code} href={ind.href} className="group">
                  <div
                    className="rounded-card border border-glass bg-nested/60 p-4 text-center transition hover:scale-105"
                    style={{ borderTop: `2px solid ${ind.to}66` }}
                  >
                    <div
                      className="mx-auto flex h-12 w-12 items-center justify-center rounded-card text-2xl shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${ind.from}, ${ind.to})`,
                        boxShadow: `0 4px 16px ${ind.to}55`,
                      }}
                    >
                      {ind.icon}
                    </div>
                    <div className="mt-3 text-xs font-semibold text-white/90">{ind.name}</div>
                    <div className="mt-2">
                      <StlBadge level={ind.level} size="xs" showName={false} />
                    </div>
                    <div className="mt-2 text-[11px] text-white/50 tabular-nums">
                      {ind.score}/100
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </PlasticCard>

          {/* ================================================================ */}
          {/* Score Breakdown horizontal cards */}
          {/* ================================================================ */}
          <PlasticCard className="mt-4 p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                  STL Score Breakdown
                </div>
                <h2 className="mt-1 text-lg font-semibold sm:text-xl">Component scores</h2>
              </div>
              <button
                onClick={() => setSelectedBreakdown(null)}
                className="text-xs text-purple-light hover:underline"
              >
                View Details →
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {DEMO_STL.breakdown.map((b) => (
                <div
                  key={b.key}
                  className={`rounded-card border p-4 transition ${
                    selectedBreakdown === b.key ? 'ring-2' : 'border-glass'
                  }`}
                  style={{
                    borderTopColor: `${b.to}88`,
                    borderTopWidth: 3,
                    background: `linear-gradient(180deg, ${b.from}11, transparent 80%)`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-white/80">
                      <span className="text-base">{b.icon}</span>
                      {b.label}
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-bold tabular-nums" style={{ color: b.to }}>
                      {b.score}
                    </span>
                    <span className="text-sm text-white/40">/{b.max}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-chip bg-white/5">
                    <div
                      className="h-full rounded-chip transition-all"
                      style={{
                        width: `${(b.score / b.max) * 100}%`,
                        background: `linear-gradient(to right, ${b.from}, ${b.to})`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </PlasticCard>

          {/* ================================================================ */}
          {/* UP / DOWN rules split view */}
          {/* ================================================================ */}
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <PlasticCard className="p-5 sm:p-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-2xl">📈</span>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-teal">
                    Go up
                  </div>
                  <h3 className="text-lg font-bold">How to increase your STL</h3>
                </div>
              </div>
              <div className="space-y-2">
                {UP_RULES.map((r) => (
                  <div
                    key={r.title}
                    className="flex items-center gap-3 rounded-card border border-teal/20 bg-teal/5 p-2.5"
                  >
                    <span className="text-xl">{r.icon}</span>
                    <div className="flex-1">
                      <div className="text-xs font-semibold">{r.title}</div>
                      <div className="mt-0.5 text-[10px] text-white/50">via {r.src}</div>
                    </div>
                    <div className="rounded-chip bg-teal/20 px-2 py-0.5 text-[10px] font-bold text-teal">
                      {r.pts}
                    </div>
                  </div>
                ))}
              </div>
            </PlasticCard>

            <PlasticCard className="p-5 sm:p-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-2xl">📉</span>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[#ff9e9e]">
                    Go down
                  </div>
                  <h3 className="text-lg font-bold">What drops your STL</h3>
                </div>
              </div>
              <div className="space-y-2">
                {DOWN_RULES.map((r) => (
                  <div
                    key={r.title}
                    className="flex items-center gap-3 rounded-card border border-red-400/20 bg-red-400/5 p-2.5"
                  >
                    <span className="text-xl">{r.icon}</span>
                    <div className="flex-1">
                      <div className="text-xs font-semibold">{r.title}</div>
                      <div className="mt-0.5 text-[10px] text-white/50">via {r.src}</div>
                    </div>
                    <div className="rounded-chip bg-red-400/20 px-2 py-0.5 text-[10px] font-bold text-red-300">
                      {r.pts}
                    </div>
                  </div>
                ))}
              </div>
            </PlasticCard>
          </div>

          {/* ================================================================ */}
          {/* AI RECOMMENDATIONS — next best actions */}
          {/* ================================================================ */}
          <PlasticCard className="mt-4 p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">✨</span>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">
                  AI-powered recommendations
                </div>
                <h2 className="text-lg font-semibold sm:text-xl">Your next best actions</h2>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {RECOMMENDATIONS.map((rec, i) => {
                const tone =
                  rec.priority === 'high'
                    ? { border: 'border-purple-light/40', bg: 'bg-purple/10', pill: 'HIGH', pillBg: 'bg-purple/30 text-purple-light' }
                    : { border: 'border-teal/40', bg: 'bg-teal/5', pill: 'MEDIUM', pillBg: 'bg-teal/20 text-teal' };
                return (
                  <div
                    key={i}
                    className={`rounded-card border p-4 ${tone.border} ${tone.bg}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{rec.icon}</div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-chip px-1.5 py-0.5 text-[9px] font-bold ${tone.pillBg}`}
                          >
                            {tone.pill}
                          </span>
                          <span className="rounded-chip bg-teal/15 px-1.5 py-0.5 text-[9px] font-bold text-teal">
                            {rec.expectedGain}
                          </span>
                        </div>
                        <div className="mt-2 text-sm font-semibold">{rec.title}</div>
                        <div className="mt-1 text-[11px] text-white/60">{rec.detail}</div>
                        <Link
                          href={rec.href}
                          className="mt-3 inline-block rounded-chip border border-glass bg-white/5 px-3 py-1 text-[11px] font-semibold hover:border-purple-light"
                        >
                          {rec.cta} →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </PlasticCard>

          {/* ================================================================ */}
          {/* Recent activity */}
          {/* ================================================================ */}
          <PlasticCard className="mt-4 p-5 sm:p-6">
            <div className="mb-4">
              <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                Recent Activity
              </div>
              <h2 className="mt-1 text-lg font-semibold sm:text-xl">STL history</h2>
            </div>
            <div className="space-y-2">
              {DEMO_STL.recentActivity.map((a, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-card border border-glass bg-nested p-3"
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-chip text-sm font-bold ${
                      a.type === 'positive'
                        ? 'bg-teal/20 text-teal'
                        : 'bg-red-400/20 text-red-300'
                    }`}
                  >
                    {a.delta > 0 ? '+' : ''}
                    {a.delta}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold">{a.title}</div>
                    <div className="mt-0.5 flex items-center gap-2 text-[11px] text-white/50">
                      <span>{a.ago}</span>
                      <span className="rounded-chip bg-white/10 px-1.5 py-0.5 text-[9px] font-bold text-white/60">
                        {a.src}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PlasticCard>

          {/* ================================================================ */}
          {/* Footer CTA bar */}
          {/* ================================================================ */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Link
              href="/crb/exams"
              className="rounded-card border border-teal/40 bg-gradient-to-br from-teal/10 to-transparent p-4 transition hover:border-teal"
            >
              <div className="text-[10px] uppercase tracking-widest text-teal">Next boost</div>
              <div className="mt-1 text-sm font-bold">Take CRB exam</div>
              <div className="mt-0.5 text-[11px] text-white/50">+5 STL available</div>
            </Link>
            <Link
              href="/wallet"
              className="rounded-card border border-purple-light/40 bg-gradient-to-br from-purple/10 to-transparent p-4 transition hover:border-purple-light"
            >
              <div className="text-[10px] uppercase tracking-widest text-purple-light">
                Stabilize
              </div>
              <div className="mt-1 text-sm font-bold">Lock EHBGC</div>
              <div className="mt-0.5 text-[11px] text-white/50">+2 STL + tier floor</div>
            </Link>
            <Link
              href="/ai-marketplace"
              className="rounded-card border border-amber/40 bg-gradient-to-br from-amber/10 to-transparent p-4 transition hover:border-amber"
            >
              <div className="text-[10px] uppercase tracking-widest text-amber">Earn</div>
              <div className="mt-1 text-sm font-bold">Go live on AI Marketplace</div>
              <div className="mt-0.5 text-[11px] text-white/50">$40-80 / hour</div>
            </Link>
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}

// ===========================================================================
// Small helper — single-row stat line
// ===========================================================================
function Row({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'teal' | 'purple' | 'amber' | 'default';
}) {
  const color = {
    teal: 'text-teal',
    purple: 'text-purple-light',
    amber: 'text-amber',
    default: 'text-white/80',
  }[tone];
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/50">{label}</span>
      <span className={`font-semibold tabular-nums ${color}`}>{value}</span>
    </div>
  );
}
