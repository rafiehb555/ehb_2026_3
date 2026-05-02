'use client';

import Link from 'next/link';
import { PublicNav } from '@/components/ui/public-nav';
import { PublicFooter } from '@/components/ui/public-footer';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';
import { Button3D } from '@/components/ui/button-3d';
import { KpiCard } from '@/components/ui/kpi-card';

/**
 * EHB Affiliate — Rank & Industry Unlocks (Visily prototype screen #9)
 *
 * Detailed rank status page showing current rank tier, team metrics,
 * leg volumes, industry verticals, recommendations for next rank, compliance.
 */

const RANK_TIERS = [
  { rank: 'R1', name: 'Starter', color: '#7B6EF6', emoji: '🌱', team: 0, legs: 0 },
  { rank: 'R2', name: 'Beginner', color: '#A098F8', emoji: '🌿', team: 10, legs: 2 },
  { rank: 'R3', name: 'Builder', color: '#2BBFA0', emoji: '🌳', team: 50, legs: 3 },
  { rank: 'R4', name: 'Leader', color: '#38C878', emoji: '🏆', team: 150, legs: 5 },
  { rank: 'R5', name: 'Manager', color: '#F0A030', emoji: '⭐', team: 500, legs: 7 },
  { rank: 'R6', name: 'Director', color: '#F8B830', emoji: '💎', team: 1000, legs: 10 },
  { rank: 'R7', name: 'Sr Director', color: '#EC4899', emoji: '👑', team: 3000, legs: 12 },
  { rank: 'R8', name: 'Executive', color: '#F472B6', emoji: '🥇', team: 7000, legs: 13 },
  { rank: 'R9', name: 'Regional Head', color: '#F05858', emoji: '🌟', team: 15000, legs: 14 },
  { rank: 'R10', name: 'Global Leader', color: '#F0C040', emoji: '🌍', team: 50000, legs: 15 },
];

const INDUSTRY_VERTICALS = [
  { id: 'OBS', name: 'Online Business School', icon: '🎓', unlocked: true, monthlyEarnings: 1240 },
  { id: 'WMS', name: 'Wellness & Medical', icon: '🏥', unlocked: true, monthlyEarnings: 890 },
  { id: 'OLS', name: 'Online Legal Services', icon: '⚖️', unlocked: true, monthlyEarnings: 620 },
  { id: 'GSM', name: 'GoSellr Marketplace', icon: '🛍️', unlocked: false, requiredRank: 'R6' },
  { id: 'JPS', name: 'Jobs & Skills', icon: '💼', unlocked: false, requiredRank: 'R6' },
  { id: 'ITS', name: 'IT Services', icon: '💻', unlocked: false, requiredRank: 'R7' },
  { id: 'FIN', name: 'Finance & Banking', icon: '🏦', unlocked: false, requiredRank: 'R7' },
  { id: 'INS', name: 'Insurance', icon: '🛡️', unlocked: false, requiredRank: 'R8' },
  { id: 'HMS', name: 'Hotel & Hospitality', icon: '🏨', unlocked: false, requiredRank: 'R8' },
  { id: 'RES', name: 'Real Estate', icon: '🏠', unlocked: false, requiredRank: 'R9' },
];

const RECOMMENDED_ACTIONS = [
  {
    icon: '👥',
    title: 'Recruit 12 more strong-leg referrals',
    desc: 'You have 2 legs at $19,300 + need a third leg at $25,000 to qualify for Gold Director.',
    progress: 0.77,
    color: '#F0A030',
  },
  {
    icon: '📊',
    title: 'Increase team monthly volume to $80K',
    desc: 'Current team monthly: $52,400. Need $27,600 more from existing legs.',
    progress: 0.66,
    color: '#7B6EF6',
  },
  {
    icon: '🎓',
    title: 'Add 2 more industry verticals',
    desc: 'You have 3 unlocked. R6 Director requires 6+ active industries.',
    progress: 0.5,
    color: '#2BBFA0',
  },
];

export default function RankDetailPage() {
  const currentRankIdx = 4; // R5 Silver Executive (Manager)
  const currentRank = RANK_TIERS[currentRankIdx];
  const nextRank = RANK_TIERS[currentRankIdx + 1];

  // Demo data
  const totalTeamSize = 539;
  const strongLegVolume = 19300;
  const strongLegTarget = 25000;
  const activeLegs = 2;
  const requiredLegs = 3;
  const monthlyTeamVolume = 52400;
  const requiredVolume = 80000;

  return (
    <>
      <PublicNav />
      <main className="min-h-screen bg-bg pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Hero status card */}
          <section className="pt-8">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-white/50">
              <Link href="/affiliate" className="flex items-center gap-1 hover:text-purple-light">
                ← Back to Affiliate Dashboard
              </Link>
              <Chip tone="ok">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-teal" />
                Account Active
              </Chip>
            </div>

            <PlasticCard className="overflow-hidden p-0">
              <div
                className="relative px-6 py-8"
                style={{
                  background: `linear-gradient(135deg, ${currentRank.color}33 0%, ${currentRank.color}11 100%)`,
                  borderBottom: `2px solid ${currentRank.color}55`,
                }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-20 w-20 items-center justify-center rounded-full text-5xl shadow-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${currentRank.color}, ${currentRank.color}aa)`,
                        boxShadow: `0 8px 32px ${currentRank.color}66`,
                      }}
                    >
                      {currentRank.emoji}
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/50">
                        Current Status
                      </div>
                      <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
                        {currentRank.rank} <span style={{ color: currentRank.color }}>{currentRank.name}</span>
                      </h1>
                      <p className="mt-1 text-sm text-white/60">
                        Track your progress, fulfill requirements, and unlock earning verticals.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-[10px] uppercase tracking-wider text-white/40">
                      30-day activity
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-3xl font-bold tabular-nums"
                        style={{ color: currentRank.color }}
                      >
                        +12%
                      </span>
                      <Chip tone="ok">↑ Growing</Chip>
                    </div>
                  </div>
                </div>
              </div>

              {/* KPIs */}
              <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-4">
                <KpiCard
                  label="Total Team Size"
                  value={totalTeamSize.toLocaleString()}
                  delta={`Need ${(nextRank.team - totalTeamSize).toLocaleString()} for ${nextRank.rank}`}
                  tone="purple"
                  icon="🌳"
                />
                <KpiCard
                  label="Strong Leg Volume"
                  value={`$${strongLegVolume.toLocaleString()}`}
                  delta={`/ $${strongLegTarget.toLocaleString()} target`}
                  tone="teal"
                  icon="💪"
                />
                <KpiCard
                  label="Active Legs"
                  value={`${activeLegs} / ${requiredLegs}`}
                  delta={`${requiredLegs - activeLegs} more needed`}
                  tone="amber"
                  icon="🦵"
                />
                <KpiCard
                  label="Industry Verticals"
                  value={`${INDUSTRY_VERTICALS.filter((i) => i.unlocked).length} / ${INDUSTRY_VERTICALS.length}`}
                  delta="Unlocks per rank"
                  tone="ok"
                  icon="🎯"
                />
              </div>
            </PlasticCard>
          </section>

          {/* Rank ladder */}
          <section className="mt-8">
            <h2 className="text-xl font-bold">R1 → R10 Rank Ladder</h2>
            <p className="mt-1 text-sm text-white/60">
              Each rank unlocks more Track B levels, higher daily caps, and rank-achievement bonuses.
            </p>

            <PlasticCard className="mt-4 overflow-hidden p-5">
              <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
                {RANK_TIERS.map((r, i) => {
                  const isCompleted = i < currentRankIdx;
                  const isCurrent = i === currentRankIdx;
                  const isUpcoming = i > currentRankIdx;
                  return (
                    <div
                      key={r.rank}
                      className="flex flex-col items-center"
                      title={`${r.rank} ${r.name}`}
                    >
                      <div
                        className={`relative flex h-12 w-12 items-center justify-center rounded-full text-xl shadow-md transition ${
                          isCompleted
                            ? 'opacity-90'
                            : isCurrent
                            ? 'animate-pulse ring-4'
                            : 'opacity-30 grayscale'
                        }`}
                        style={{
                          background: isCompleted || isCurrent
                            ? `linear-gradient(135deg, ${r.color}, ${r.color}aa)`
                            : 'rgba(255,255,255,0.05)',
                          boxShadow: isCurrent ? `0 0 16px ${r.color}aa` : undefined,
                        }}
                      >
                        {isCompleted ? '✓' : r.emoji}
                      </div>
                      <div
                        className={`mt-2 text-[10px] font-semibold ${
                          isCurrent ? '' : 'text-white/50'
                        }`}
                        style={isCurrent ? { color: r.color } : undefined}
                      >
                        {r.rank}
                      </div>
                      <div className="text-[9px] text-white/40">{r.name.split(' ')[0]}</div>
                    </div>
                  );
                })}
              </div>
            </PlasticCard>
          </section>

          {/* Recommendations for next rank */}
          <section className="mt-8">
            <h2 className="text-xl font-bold">
              Recommendations for {nextRank.rank} {nextRank.name}
            </h2>
            <p className="mt-1 text-sm text-white/60">
              Complete these 3 milestones to auto-promote to {nextRank.rank}.
            </p>

            <div className="mt-4 grid gap-3 lg:grid-cols-3">
              {RECOMMENDED_ACTIONS.map((a, i) => (
                <PlasticCard key={i} className="p-5" style={{ borderTop: `3px solid ${a.color}` }}>
                  <div className="flex items-start gap-3">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl"
                      style={{
                        background: `${a.color}22`,
                        border: `1px solid ${a.color}55`,
                      }}
                    >
                      {a.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold">{a.title}</h3>
                      <p className="mt-1 text-xs text-white/60">{a.desc}</p>
                      <div className="mt-3">
                        <div className="h-1.5 overflow-hidden rounded-full bg-nested">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${a.progress * 100}%`, background: a.color }}
                          />
                        </div>
                        <div className="mt-1 flex items-center justify-between text-[10px]">
                          <span className="text-white/50">{(a.progress * 100).toFixed(0)}% complete</span>
                          <span style={{ color: a.color }}>
                            {((1 - a.progress) * 100).toFixed(0)}% to go
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </PlasticCard>
              ))}
            </div>
          </section>

          {/* Industry verticals */}
          <section className="mt-8">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold">Industry Verticals</h2>
                <p className="mt-1 text-sm text-white/60">
                  {INDUSTRY_VERTICALS.filter((i) => i.unlocked).length} of {INDUSTRY_VERTICALS.length} unlocked. Each rank unlocks new verticals.
                </p>
              </div>
              <Link href="/affiliate/marketplace">
                <Button3D variant="purple" size="sm">
                  Browse Marketplace →
                </Button3D>
              </Link>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {INDUSTRY_VERTICALS.map((v) => (
                <div
                  key={v.id}
                  className={`group rounded-card border p-4 transition ${
                    v.unlocked
                      ? 'border-glass bg-card/40 hover:-translate-y-0.5 hover:border-teal'
                      : 'border-dashed border-glass bg-nested/30 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-3xl">{v.icon}</div>
                    {v.unlocked ? (
                      <Chip tone="ok">✓ Active</Chip>
                    ) : (
                      <Chip tone="warn">🔒 {v.requiredRank}+</Chip>
                    )}
                  </div>
                  <div className="mt-3">
                    <div className="text-[10px] text-white/40">{v.id}</div>
                    <div className="mt-0.5 text-sm font-semibold">{v.name}</div>
                  </div>
                  {v.unlocked ? (
                    <div className="mt-3 rounded border border-glass bg-nested/40 p-2 text-center">
                      <div className="text-[9px] text-white/50">Monthly earnings</div>
                      <div className="mt-0.5 text-sm font-bold tabular-nums text-teal">
                        ${v.monthlyEarnings?.toFixed(0)}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 rounded border border-dashed border-glass bg-nested/20 p-2 text-center">
                      <div className="text-[9px] text-white/40">Reach {v.requiredRank} to unlock</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Compliance note */}
          <section className="mt-8">
            <PlasticCard className="border-2 border-amber/30 bg-amber/5 p-5">
              <div className="flex items-start gap-3">
                <div className="text-3xl">⚖️</div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold">Compliance Note</h3>
                  <p className="mt-2 text-xs text-white/70">
                    All earnings and rank promotions are subject to the 80/20 income rule (R3+ must earn ≥80% from external sales) and 30-day cooling-off refund window. Income from joining fees or pure recruitment is NOT permitted. Rank promotions are auto-evaluated and require minimum 7 days of stable team activity.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link href="/affiliate#compliance">
                      <button className="rounded-chip border border-glass bg-card/60 px-3 py-1.5 text-xs hover:border-amber">
                        🛡️ View Income Disclosure
                      </button>
                    </Link>
                    <Link href="/affiliate/help">
                      <button className="rounded-chip border border-glass bg-card/60 px-3 py-1.5 text-xs hover:border-amber">
                        📚 Help &amp; Legal
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </PlasticCard>
          </section>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
