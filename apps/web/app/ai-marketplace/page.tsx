'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { aiApi } from '@/lib/api-client';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';
import { PublicNav } from '@/components/ui/public-nav';
import { PublicFooter } from '@/components/ui/public-footer';

// ============================================================================
// Types
// ============================================================================
interface Svc {
  id: string;
  displayName: string;
  industry: string;
  desc: string;
  stlMin: number;
  model: string;
}

// ============================================================================
// Service catalog — visual config (icons, colors, earnings)
// ============================================================================
const ICONS: Record<string, string> = {
  resume: '📄',
  tutor: '🎓',
  business: '📈',
  lawyer: '⚖️',
  diagnosis: '🩺',
  fraud: '🛡️',
  recommend: '✨',
};

const SERVICE_COLOR: Record<string, { from: string; to: string }> = {
  resume: { from: '#0080c8', to: '#30d0ff' },
  tutor: { from: '#2BBFA0', to: '#38C878' },
  business: { from: '#F0A030', to: '#F8B830' },
  lawyer: { from: '#7B6EF6', to: '#A098F8' },
  diagnosis: { from: '#F05858', to: '#C03030' },
  fraud: { from: '#7a1010', to: '#F05858' },
  recommend: { from: '#A098F8', to: '#2BBFA0' },
};

const SERVICE_EARNINGS: Record<string, string> = {
  resume: '$15–30 / session',
  tutor: '$40–80 / hour',
  business: '$60–120 / session',
  lawyer: '$80–200 / case',
  diagnosis: '$50–100 / consult',
  fraud: '$120–250 / audit',
  recommend: '$25–60 / report',
};

// ============================================================================
// STL Tiers — visual grouping
// ============================================================================
type TierKey = 'all' | 'bronze' | 'silver' | 'gold' | 'diamond';

const TIERS: Record<
  Exclude<TierKey, 'all'>,
  { name: string; range: string; min: number; max: number; from: string; to: string; emoji: string; subtitle: string }
> = {
  bronze: {
    name: 'Bronze Tier',
    range: 'L1 – L4',
    min: 1,
    max: 4,
    from: '#a16207',
    to: '#ca8a04',
    emoji: '🥉',
    subtitle: 'Entry-level — basic verified users',
  },
  silver: {
    name: 'Silver Tier',
    range: 'L5 – L6',
    min: 5,
    max: 6,
    from: '#94a3b8',
    to: '#cbd5e1',
    emoji: '🥈',
    subtitle: 'Standard professional — PSS verified + base CRB',
  },
  gold: {
    name: 'Gold Tier',
    range: 'L7 – L8',
    min: 7,
    max: 8,
    from: '#F0A030',
    to: '#FFC266',
    emoji: '🥇',
    subtitle: 'Trusted partner — active CRB + clean DMO record',
  },
  diamond: {
    name: 'Diamond Tier',
    range: 'L9 – L10',
    min: 9,
    max: 10,
    from: '#7B6EF6',
    to: '#2BBFA0',
    emoji: '💎',
    subtitle: 'Elite expert — top-tier with EHBGC lock + franchise',
  },
};

function tierForLevel(level: number): keyof typeof TIERS {
  if (level >= 9) return 'diamond';
  if (level >= 7) return 'gold';
  if (level >= 5) return 'silver';
  return 'bronze';
}

// ============================================================================
// Fallback service catalog when API down
// ============================================================================
const FALLBACK_SERVICES: Svc[] = [
  { id: 'resume', displayName: 'Resume Helper', industry: 'JPS', desc: 'AI-powered CV builder, cover letter writer, interview coach.', stlMin: 3, model: 'gpt-4o-mini' },
  { id: 'tutor', displayName: 'AI Tutor', industry: 'HPS', desc: 'Curriculum-aligned subject tutor for K-12 and college courses.', stlMin: 3, model: 'gpt-4o' },
  { id: 'business', displayName: 'Business Advisor', industry: 'GSM', desc: 'Growth strategy, pricing, and market entry recommendations.', stlMin: 5, model: 'gpt-4o' },
  { id: 'lawyer', displayName: 'Lawyer AI', industry: 'OLS', desc: 'Contract review and legal-research assistant for common queries.', stlMin: 5, model: 'gpt-4o' },
  { id: 'diagnosis', displayName: 'Diagnosis AI', industry: 'WMS', desc: 'Symptom triage + differential diagnosis — doctor-reviewed.', stlMin: 7, model: 'gpt-4o' },
  { id: 'recommend', displayName: 'Recommend Engine', industry: 'GSM', desc: 'Product/service recommendations using user preferences and trust signals.', stlMin: 7, model: 'gpt-4o-mini' },
  { id: 'fraud', displayName: 'Fraud Detection', industry: 'DMO', desc: 'Transaction anomaly detection + seller risk scoring engine.', stlMin: 9, model: 'gpt-4o' },
];

// ============================================================================
// MAIN PAGE
// ============================================================================
export default function AiMarketplacePage() {
  const [services, setServices] = useState<Svc[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [activeTier, setActiveTier] = useState<TierKey>('all');

  // Demo: user's current STL (would come from auth/api)
  const userStl = 7;

  useEffect(() => {
    aiApi
      .get<{ services: Svc[] }>('/api/ai/services')
      .then((r) => setServices(r.services?.length ? r.services : FALLBACK_SERVICES))
      .catch(() => {
        setServices(FALLBACK_SERVICES);
        setErr('AI service offline — showing demo catalog. Start :8080 for live data.');
      });
  }, []);

  // Group services by tier
  const grouped = useMemo(() => {
    const out: Record<keyof typeof TIERS, Svc[]> = {
      bronze: [],
      silver: [],
      gold: [],
      diamond: [],
    };
    services.forEach((s) => {
      const t = tierForLevel(s.stlMin);
      out[t].push(s);
    });
    return out;
  }, [services]);

  const totalUnlocked = services.filter((s) => userStl >= s.stlMin).length;
  const totalLocked = services.length - totalUnlocked;

  const visibleTiers: (keyof typeof TIERS)[] =
    activeTier === 'all'
      ? (['bronze', 'silver', 'gold', 'diamond'] as const)
      : [activeTier];

  return (
    <>
      <PublicNav />
      <main className="min-h-screen">
        {/* ============================================================ */}
        {/* HERO */}
        {/* ============================================================ */}
        <section className="border-b border-glass bg-gradient-to-br from-[#13162A] via-[#0C0E1A] to-[#1A1D33]">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
            <div className="inline-block rounded-chip border border-glass bg-card/60 px-3 py-1 text-[10px] text-amber sm:text-xs">
              AI Services Marketplace · STL-gated · Phase 1
            </div>
            <h1 className="mt-3 text-3xl font-bold sm:mt-4 sm:text-4xl md:text-5xl">
              AI Services by{' '}
              <span className="bg-gradient-to-r from-[#F0A030] via-[#F8B830] to-[#2BBFA0] bg-clip-text text-transparent">
                Trust Tier
              </span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-white/60 sm:mt-4 sm:text-base">
              Har service apni minimum STL level chahti hai. Aap jis tier pe ho — wahi services
              aapke liye unlocked hain. Higher trust = higher value AI access + higher earnings.
            </p>

            {/* User STL pill */}
            <div className="mt-5 inline-flex items-center gap-3 rounded-card border border-purple-light/40 bg-purple/10 px-4 py-3 backdrop-blur">
              <div className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-black text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #F0A030, #FFC266)' }}>
                L{userStl}
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">
                  Your current STL
                </div>
                <div className="text-sm font-bold">
                  {totalUnlocked} services unlocked · {totalLocked} need higher trust
                </div>
                <Link href="/stl" className="text-[11px] text-purple-light hover:underline">
                  View my STL dashboard →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* TIER LEGEND — 4 tier cards */}
        {/* ============================================================ */}
        <section className="border-b border-glass bg-nested/20">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                  4 Trust Tiers
                </div>
                <h2 className="mt-1 text-lg font-bold sm:text-xl">
                  Click a tier to filter services
                </h2>
              </div>
              <button
                onClick={() => setActiveTier('all')}
                className={`rounded-chip border px-3 py-1.5 text-xs ${
                  activeTier === 'all'
                    ? 'border-purple-light bg-purple/20 text-purple-light'
                    : 'border-glass bg-white/5 text-white/60 hover:border-purple-light'
                }`}
              >
                Show all tiers
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {(['bronze', 'silver', 'gold', 'diamond'] as const).map((tk) => {
                const t = TIERS[tk];
                const count = grouped[tk]?.length ?? 0;
                const userInTier = userStl >= t.min;
                const active = activeTier === tk;
                return (
                  <button
                    key={tk}
                    onClick={() => setActiveTier(active ? 'all' : tk)}
                    className={`group rounded-card border p-4 text-left transition ${
                      active
                        ? 'border-white/40 bg-white/5'
                        : 'border-glass bg-card/40 hover:border-white/20'
                    }`}
                    style={{
                      borderTop: `3px solid ${t.to}`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-3xl">{t.emoji}</div>
                      {userInTier ? (
                        <span className="rounded-chip bg-teal/20 px-2 py-0.5 text-[9px] font-bold text-teal">
                          ● YOUR TIER+
                        </span>
                      ) : (
                        <span className="rounded-chip bg-white/10 px-2 py-0.5 text-[9px] font-bold text-white/50">
                          🔒 LOCKED
                        </span>
                      )}
                    </div>
                    <div
                      className="mt-3 text-sm font-bold uppercase tracking-wider"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${t.from}, ${t.to})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {t.name}
                    </div>
                    <div className="mt-1 text-xs text-white/70">{t.range}</div>
                    <div className="mt-1 text-[11px] text-white/50">{t.subtitle}</div>
                    <div className="mt-3 flex items-center justify-between border-t border-glass pt-2">
                      <span className="text-[11px] text-white/50">
                        {count} {count === 1 ? 'service' : 'services'}
                      </span>
                      <span className="text-[11px] font-semibold text-purple-light">
                        {active ? 'Filtered ✓' : 'View →'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* HOW TO USE */}
        {/* ============================================================ */}
        <section className="border-b border-glass bg-nested/10">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
            <div className="grid gap-3 sm:grid-cols-4">
              <HowStep step="1" icon="🎯" title="Pick service" body="7 modules — each has its min STL + model." />
              <HowStep step="2" icon="📝" title="Provide input" body="Sample payloads included for each service." />
              <HowStep step="3" icon="🤖" title="Invoke" body="Response includes confidence score + disclaimer." />
              <HowStep step="4" icon="⭐" title="Rate" body="Thumbs up/down. Flagged answers go to DMO review." />
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SERVICES BY TIER */}
        {/* ============================================================ */}
        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          {err ? (
            <div className="mb-6 rounded-card border border-amber/40 bg-amber/10 p-3 text-xs text-amber sm:p-4 sm:text-sm">
              {err}
            </div>
          ) : null}

          {visibleTiers.map((tk) => {
            const t = TIERS[tk];
            const tierServices = grouped[tk] || [];
            if (tierServices.length === 0) return null;
            return (
              <div key={tk} className="mb-10 last:mb-0">
                {/* Tier header */}
                <div
                  className="mb-4 flex items-center gap-3 rounded-card border p-4"
                  style={{
                    background: `linear-gradient(135deg, ${t.from}11, transparent 80%)`,
                    borderColor: `${t.to}55`,
                    borderLeft: `4px solid ${t.to}`,
                  }}
                >
                  <div className="text-4xl">{t.emoji}</div>
                  <div className="flex-1">
                    <div
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{
                        color: t.to,
                      }}
                    >
                      {t.name} · {t.range}
                    </div>
                    <div className="mt-0.5 text-sm text-white/70">{t.subtitle}</div>
                  </div>
                  <div className="hidden text-right sm:block">
                    <div className="text-[10px] uppercase text-white/40">Services</div>
                    <div
                      className="text-2xl font-black tabular-nums"
                      style={{ color: t.to }}
                    >
                      {tierServices.length}
                    </div>
                  </div>
                </div>

                {/* Service grid */}
                <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {tierServices.map((s) => (
                    <ServiceCard key={s.id} svc={s} userStl={userStl} tier={t} />
                  ))}
                </div>
              </div>
            );
          })}

          {services.length === 0 && !err ? (
            <div className="text-sm text-white/50">Loading services…</div>
          ) : null}
        </section>

        {/* ============================================================ */}
        {/* CTA strip */}
        {/* ============================================================ */}
        <section className="border-t border-glass bg-gradient-to-br from-purple/10 via-transparent to-teal/10 py-10">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h3 className="text-xl font-bold sm:text-2xl">
              Higher STL = More AI services + Higher earnings
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Reach Diamond tier (L9-L10) to unlock all 7 services and earn $200-500/case.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/stl"
                className="rounded-card bg-gradient-to-r from-purple to-purple-light px-5 py-2.5 text-sm font-bold text-white shadow-lg"
              >
                Boost my STL →
              </Link>
              <Link
                href="/crb/exams"
                className="rounded-card border border-teal/40 bg-teal/10 px-5 py-2.5 text-sm font-bold text-teal hover:bg-teal/20"
              >
                Take CRB exam →
              </Link>
              <Link
                href="/wallet"
                className="rounded-card border border-amber/40 bg-amber/10 px-5 py-2.5 text-sm font-bold text-amber hover:bg-amber/20"
              >
                Lock EHBGC →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}

// ===========================================================================
// ServiceCard — prominent STL level display
// ===========================================================================
function ServiceCard({
  svc,
  userStl,
  tier,
}: {
  svc: Svc;
  userStl: number;
  tier: (typeof TIERS)[keyof typeof TIERS];
}) {
  const unlocked = userStl >= svc.stlMin;
  const color = SERVICE_COLOR[svc.id] || { from: '#7B6EF6', to: '#A098F8' };
  const earnings = SERVICE_EARNINGS[svc.id] || '$ varies';
  const icon = ICONS[svc.id] || '🤖';

  const card = (
    <PlasticCard
      className={`relative flex h-full flex-col overflow-hidden p-0 transition ${
        unlocked
          ? 'border-glass group-hover:border-purple-light'
          : 'border-glass opacity-90'
      }`}
    >
      {/* HUGE STL LEVEL BANNER on top */}
      <div
        className="relative flex items-center justify-between px-5 py-4"
        style={{
          background: unlocked
            ? `linear-gradient(135deg, ${tier.from}, ${tier.to})`
            : 'linear-gradient(135deg, #1A1D33, #13162A)',
        }}
      >
        {/* Gigantic L## badge */}
        <div className="flex items-center gap-3">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full text-2xl font-black shadow-2xl ${
              unlocked ? 'bg-white text-black' : 'bg-white/10 text-white/40'
            }`}
            style={{
              boxShadow: unlocked
                ? `0 0 24px ${tier.to}, inset 0 -2px 0 rgba(0,0,0,0.15)`
                : 'none',
            }}
          >
            L{svc.stlMin}
          </div>
          <div>
            <div className="text-[9px] font-bold uppercase tracking-widest text-white/80">
              Min STL Required
            </div>
            <div className="text-xs font-bold text-white">
              {tier.emoji} {tier.name}
            </div>
            <div className="mt-0.5 text-[10px] text-white/70">{tier.range}</div>
          </div>
        </div>

        {/* Status pill */}
        {unlocked ? (
          <div className="flex flex-col items-end gap-1">
            <span className="rounded-chip bg-white/95 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-black">
              ● Unlocked
            </span>
            <span className="text-[9px] font-semibold text-white/80">
              You: L{userStl} ✓
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-end gap-1">
            <span className="rounded-chip bg-black/40 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white/70">
              🔒 Locked
            </span>
            <span className="text-[9px] font-semibold text-white/60">
              Need +{svc.stlMin - userStl} levels
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-card text-2xl shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
              boxShadow: `0 4px 16px ${color.to}66`,
              filter: unlocked ? 'none' : 'grayscale(40%)',
            }}
          >
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold sm:text-lg">{svc.displayName}</h3>
            <div className="mt-0.5 text-[11px] text-white/50">
              Industry: <span className="font-semibold text-white/70">{svc.industry}</span>
            </div>
          </div>
        </div>

        <p className="mt-3 text-sm text-white/70">{svc.desc}</p>

        {/* Visual STL ladder strip */}
        <div className="mt-4">
          <div className="text-[9px] uppercase tracking-widest text-white/40">
            STL ladder
          </div>
          <div className="mt-1 flex h-2 w-full overflow-hidden rounded-chip bg-white/5">
            {[...Array(10)].map((_, i) => {
              const lvl = i + 1;
              const isMin = lvl === svc.stlMin;
              const isReached = lvl <= userStl;
              const isReq = lvl >= svc.stlMin;
              return (
                <div
                  key={lvl}
                  className="flex-1 border-r border-black/30 last:border-0"
                  style={{
                    background: isMin
                      ? `linear-gradient(135deg, ${tier.from}, ${tier.to})`
                      : isReached
                        ? 'rgba(43, 191, 160, 0.45)'
                        : isReq
                          ? 'rgba(255,255,255,0.05)'
                          : 'rgba(255,255,255,0.02)',
                  }}
                  title={`L${lvl}${isMin ? ' (required)' : ''}${isReached ? ' (you)' : ''}`}
                />
              );
            })}
          </div>
          <div className="mt-1 flex items-center justify-between text-[9px] text-white/40">
            <span>L1</span>
            <span style={{ color: tier.to }}>● Min L{svc.stlMin}</span>
            <span>L10</span>
          </div>
        </div>

        {/* Earnings + model + free tier */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          <span className="rounded-chip bg-teal/15 px-2 py-0.5 text-[10px] font-bold text-teal">
            💰 {earnings}
          </span>
          <Chip>{svc.model}</Chip>
          <Chip tone="purple">3 free/day</Chip>
        </div>

        {/* CTA at bottom */}
        <div className="mt-auto pt-4">
          {unlocked ? (
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] text-teal">
                ✓ Ready to invoke
              </span>
              <span className="rounded-chip bg-gradient-to-r from-teal to-[#38C878] px-3 py-1.5 text-xs font-bold text-white">
                Use service →
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] text-white/50">
                Reach L{svc.stlMin} to unlock
              </span>
              <Link
                href="/stl"
                onClick={(e) => e.stopPropagation()}
                className="rounded-chip border border-purple-light/40 bg-purple/15 px-3 py-1.5 text-xs font-bold text-purple-light hover:bg-purple/25"
              >
                Boost STL →
              </Link>
            </div>
          )}
        </div>
      </div>
    </PlasticCard>
  );

  if (unlocked) {
    return (
      <Link href={`/ai-marketplace/${svc.id}`} className="group block">
        {card}
      </Link>
    );
  }
  return <div className="block">{card}</div>;
}

// ===========================================================================
// HowStep
// ===========================================================================
function HowStep({
  step,
  icon,
  title,
  body,
}: {
  step: string;
  icon: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-card border border-glass bg-card/60 p-4">
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple/20 text-[10px] font-black text-purple-light">
          {step}
        </span>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="mt-2 text-sm font-semibold">{title}</div>
      <div className="mt-1 text-[11px] text-white/60">{body}</div>
    </div>
  );
}
