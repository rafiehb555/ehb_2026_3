'use client';

import { useState } from 'react';
import { PlasticCard } from '../ui/plastic-card';
import { Chip } from '../ui/chip';

/**
 * EHB Affiliate — Achievements / Badges
 *
 * Visual badge gallery showing earned + locked milestones. Drives gamification
 * engagement. Auto-derived from user state (no separate achievements API yet —
 * Phase 2 backlog item to persist on-chain via blockchainProofs collection).
 */

export interface UserState {
  isJoined?: boolean;
  rank?: string;
  directReferrals?: number;
  networkSize?: number;
  lifetimeEarningsUsd?: number;
  thisMonthEarningsUsd?: number;
  daysActive?: number;
  hasFranchise?: boolean;
  industriesEarned?: number;
  kycTier?: number;
  hasFirstSale?: boolean;
  fastSaleStreak?: number;
}

interface Badge {
  id: string;
  category: 'onboarding' | 'milestones' | 'rank' | 'earnings' | 'network' | 'special';
  icon: string;
  name: string;
  desc: string;
  earned: boolean;
  earnedAt?: string;
  progress?: number; // 0..1 if locked but partial
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  reward?: string;
}

const RARITY_COLORS: Record<Badge['rarity'], { bg: string; border: string; glow: string }> = {
  common: { bg: '#7B6EF6', border: '#7B6EF6', glow: '#7B6EF655' },
  rare: { bg: '#2BBFA0', border: '#2BBFA0', glow: '#2BBFA055' },
  epic: { bg: '#F0A030', border: '#F0A030', glow: '#F0A03077' },
  legendary: { bg: '#F0C040', border: '#F0C040', glow: '#F0C04099' },
};

const CATEGORY_META: Record<Badge['category'], { label: string; icon: string }> = {
  onboarding: { label: 'Onboarding', icon: '🚀' },
  milestones: { label: 'Milestones', icon: '🎯' },
  rank: { label: 'Rank', icon: '🏆' },
  earnings: { label: 'Earnings', icon: '💰' },
  network: { label: 'Network', icon: '🌳' },
  special: { label: 'Special', icon: '✨' },
};

function generateBadges(s: UserState): Badge[] {
  const lifetimeEarnings = s.lifetimeEarningsUsd ?? 0;
  const directRefs = s.directReferrals ?? 0;
  const networkSize = s.networkSize ?? 0;
  const monthEarnings = s.thisMonthEarningsUsd ?? 0;
  const daysActive = s.daysActive ?? 0;
  const industries = s.industriesEarned ?? 1;
  const kycTier = s.kycTier ?? 0;
  const rank = s.rank || 'R1';
  const rankIdx = parseInt(rank.replace('R', '')) || 1;

  return [
    // ─── Onboarding ──────────────────────────────────────────────
    {
      id: 'joined',
      category: 'onboarding',
      icon: '🤝',
      name: 'Welcome aboard',
      desc: 'Joined the EHB Affiliate Program',
      earned: !!s.isJoined,
      rarity: 'common',
      reward: 'Free referral code + dashboard',
    },
    {
      id: 'kyc-t1',
      category: 'onboarding',
      icon: '🆔',
      name: 'KYC Tier 1',
      desc: 'Verified ID document',
      earned: kycTier >= 1,
      rarity: 'common',
      reward: 'Withdrawal unlocked',
    },
    {
      id: 'kyc-t2',
      category: 'onboarding',
      icon: '📸',
      name: 'KYC Tier 2',
      desc: 'Selfie + address verified',
      earned: kycTier >= 2,
      rarity: 'rare',
      reward: '$10K/mo limits',
    },
    {
      id: 'kyc-t3',
      category: 'onboarding',
      icon: '🛡️',
      name: 'KYC Tier 3 Pro',
      desc: 'Source-of-funds verified',
      earned: kycTier >= 3,
      rarity: 'epic',
      reward: '$100K/mo limits',
    },

    // ─── Network milestones ─────────────────────────────────────
    {
      id: 'first-referral',
      category: 'network',
      icon: '🔗',
      name: 'First referral',
      desc: 'Brought in your first downline',
      earned: directRefs >= 1,
      rarity: 'common',
      progress: directRefs > 0 ? 1 : 0,
    },
    {
      id: 'connector',
      category: 'network',
      icon: '🌟',
      name: 'Connector',
      desc: '10 direct referrals',
      earned: directRefs >= 10,
      progress: Math.min(1, directRefs / 10),
      rarity: 'rare',
    },
    {
      id: 'magnet',
      category: 'network',
      icon: '🧲',
      name: 'People magnet',
      desc: '50 direct referrals',
      earned: directRefs >= 50,
      progress: Math.min(1, directRefs / 50),
      rarity: 'epic',
    },
    {
      id: 'network-100',
      category: 'network',
      icon: '🌳',
      name: 'Forest builder',
      desc: '100-person network across L1+L2+L3',
      earned: networkSize >= 100,
      progress: Math.min(1, networkSize / 100),
      rarity: 'rare',
    },
    {
      id: 'network-1k',
      category: 'network',
      icon: '🌲',
      name: 'Network titan',
      desc: '1,000-person network',
      earned: networkSize >= 1000,
      progress: Math.min(1, networkSize / 1000),
      rarity: 'epic',
    },
    {
      id: 'network-10k',
      category: 'network',
      icon: '🏔️',
      name: 'Network legend',
      desc: '10,000-person network',
      earned: networkSize >= 10000,
      progress: Math.min(1, networkSize / 10000),
      rarity: 'legendary',
    },

    // ─── Earnings ──────────────────────────────────────────────
    {
      id: 'first-sale',
      category: 'earnings',
      icon: '🎉',
      name: 'First sale',
      desc: '$5 First Sale Bonus claimed',
      earned: !!s.hasFirstSale,
      rarity: 'common',
      reward: '$5 USD',
    },
    {
      id: 'earn-100',
      category: 'earnings',
      icon: '💵',
      name: '$100 earned',
      desc: 'Lifetime $100 in commissions',
      earned: lifetimeEarnings >= 100,
      progress: Math.min(1, lifetimeEarnings / 100),
      rarity: 'common',
    },
    {
      id: 'earn-1k',
      category: 'earnings',
      icon: '💰',
      name: '$1K club',
      desc: 'Lifetime $1,000 in commissions',
      earned: lifetimeEarnings >= 1000,
      progress: Math.min(1, lifetimeEarnings / 1000),
      rarity: 'rare',
    },
    {
      id: 'earn-10k',
      category: 'earnings',
      icon: '💎',
      name: '$10K diamond',
      desc: 'Lifetime $10,000 in commissions',
      earned: lifetimeEarnings >= 10000,
      progress: Math.min(1, lifetimeEarnings / 10000),
      rarity: 'epic',
    },
    {
      id: 'earn-100k',
      category: 'earnings',
      icon: '👑',
      name: '$100K crown',
      desc: 'Lifetime $100,000 in commissions',
      earned: lifetimeEarnings >= 100000,
      progress: Math.min(1, lifetimeEarnings / 100000),
      rarity: 'legendary',
    },
    {
      id: 'month-1k',
      category: 'earnings',
      icon: '📈',
      name: '$1K month',
      desc: 'Earned $1,000 in a single month',
      earned: monthEarnings >= 1000,
      progress: Math.min(1, monthEarnings / 1000),
      rarity: 'rare',
    },

    // ─── Rank ─────────────────────────────────────────────────
    {
      id: 'r2',
      category: 'rank',
      icon: '🥉',
      name: 'R2 Beginner',
      desc: 'Reached rank R2',
      earned: rankIdx >= 2,
      rarity: 'common',
      reward: 'OF1 unlock',
    },
    {
      id: 'r3',
      category: 'rank',
      icon: '🥈',
      name: 'R3 Builder',
      desc: 'Reached rank R3',
      earned: rankIdx >= 3,
      rarity: 'rare',
      reward: '$100 USD bonus',
    },
    {
      id: 'r5',
      category: 'rank',
      icon: '🥇',
      name: 'R5 Manager',
      desc: 'Reached rank R5',
      earned: rankIdx >= 5,
      rarity: 'epic',
      reward: '$500 + Sub L1',
    },
    {
      id: 'r7',
      category: 'rank',
      icon: '🏆',
      name: 'R7 Sr Director',
      desc: 'Reached rank R7',
      earned: rankIdx >= 7,
      rarity: 'epic',
      reward: '$2,000 + Sub L5-L6',
    },
    {
      id: 'r10',
      category: 'rank',
      icon: '🌍',
      name: 'R10 Global Leader',
      desc: 'Reached the highest rank',
      earned: rankIdx >= 10,
      rarity: 'legendary',
      reward: '$10,000 + Master + DMO',
    },

    // ─── Milestones / special ─────────────────────────────────
    {
      id: 'first-franchise',
      category: 'milestones',
      icon: '🏪',
      name: 'Franchise owner',
      desc: 'Unlocked your first franchise (OF1+)',
      earned: !!s.hasFranchise,
      rarity: 'rare',
    },
    {
      id: 'multi-industry',
      category: 'milestones',
      icon: '🌐',
      name: 'Polymath',
      desc: 'Earned in 5+ industries',
      earned: industries >= 5,
      progress: Math.min(1, industries / 5),
      rarity: 'rare',
    },
    {
      id: 'all-industries',
      category: 'milestones',
      icon: '🎓',
      name: 'Universalist',
      desc: 'Earned in all 38 industries',
      earned: industries >= 38,
      progress: Math.min(1, industries / 38),
      rarity: 'legendary',
    },
    {
      id: '30-day-streak',
      category: 'milestones',
      icon: '🔥',
      name: '30-day streak',
      desc: 'Active for 30 consecutive days',
      earned: daysActive >= 30,
      progress: Math.min(1, daysActive / 30),
      rarity: 'common',
    },
    {
      id: '365-day-streak',
      category: 'milestones',
      icon: '🌟',
      name: 'Year of grit',
      desc: 'Active for 365 consecutive days',
      earned: daysActive >= 365,
      progress: Math.min(1, daysActive / 365),
      rarity: 'epic',
    },
    {
      id: 'fast-sale',
      category: 'special',
      icon: '⚡',
      name: 'Fast Sale champion',
      desc: '4 same-package sales in 1 week',
      earned: (s.fastSaleStreak || 0) >= 4,
      rarity: 'rare',
      reward: '1 free same package',
    },
    {
      id: 'pioneer',
      category: 'special',
      icon: '🚀',
      name: 'Pakistan pilot pioneer',
      desc: 'Joined during the soft-launch pilot',
      earned: !!s.isJoined,
      rarity: 'epic',
    },
  ];
}

interface Props {
  user?: UserState;
}

export function AffiliateAchievements({ user }: Props) {
  const snapshot: UserState = user || {
    isJoined: true,
    rank: 'R3',
    directReferrals: 8,
    networkSize: 47,
    lifetimeEarningsUsd: 1240.6,
    thisMonthEarningsUsd: 312.4,
    daysActive: 92,
    hasFranchise: false,
    industriesEarned: 4,
    kycTier: 1,
    hasFirstSale: true,
    fastSaleStreak: 2,
  };

  const allBadges = generateBadges(snapshot);
  const earned = allBadges.filter((b) => b.earned);
  const locked = allBadges.filter((b) => !b.earned);
  const totalProgress = earned.length / allBadges.length;

  const [filter, setFilter] = useState<'all' | 'earned' | 'locked' | Badge['category']>('all');

  const visible = allBadges.filter((b) => {
    if (filter === 'all') return true;
    if (filter === 'earned') return b.earned;
    if (filter === 'locked') return !b.earned;
    return b.category === filter;
  });

  return (
    <PlasticCard className="mt-4 p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
            🏅 Achievements
          </div>
          <h3 className="mt-1 text-lg font-semibold">
            {earned.length} / {allBadges.length} earned
          </h3>
          <p className="mt-1 text-xs text-white/50">
            Milestones, rank promotions, and special badges. Earned badges anchor on-chain (Phase 2).
          </p>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-wider text-white/40">Completion</div>
          <div className="mt-1 text-2xl font-bold tabular-nums text-teal">
            {(totalProgress * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-nested">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-light via-teal to-amber"
          style={{ width: `${totalProgress * 100}%` }}
        />
      </div>

      {/* Filter chips */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {(['all', 'earned', 'locked'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-pill border px-3 py-1 text-[11px] transition ${
              filter === f
                ? 'border-purple-light bg-purple-light/15 text-purple-light'
                : 'border-glass bg-card/40 text-white/60 hover:border-purple-light/50'
            }`}
          >
            {f === 'all' ? 'All' : f === 'earned' ? `Earned (${earned.length})` : `Locked (${locked.length})`}
          </button>
        ))}
        <span className="mx-1 text-white/20">·</span>
        {(Object.entries(CATEGORY_META) as [Badge['category'], typeof CATEGORY_META[Badge['category']]][]).map(
          ([k, v]) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`rounded-pill border px-3 py-1 text-[11px] transition ${
                filter === k
                  ? 'border-purple-light bg-purple-light/15 text-purple-light'
                  : 'border-glass bg-card/40 text-white/60 hover:border-purple-light/50'
              }`}
            >
              {v.icon} {v.label}
            </button>
          )
        )}
      </div>

      {/* Badges grid */}
      <div className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((b) => {
          const colors = RARITY_COLORS[b.rarity];
          return (
            <div
              key={b.id}
              className={`group relative overflow-hidden rounded-card border p-3 text-center transition hover:-translate-y-0.5 ${
                b.earned
                  ? 'border-glass bg-card/60 hover:shadow-lg'
                  : 'border-dashed border-glass bg-nested/30 opacity-60'
              }`}
              style={
                b.earned
                  ? {
                      borderColor: colors.border,
                      boxShadow: `0 0 0 0 ${colors.glow}, 0 4px 12px ${colors.glow}`,
                    }
                  : undefined
              }
              title={b.desc}
            >
              {/* Rarity tag */}
              <div className="absolute right-1 top-1">
                <span
                  className="rounded-pill border px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider"
                  style={{
                    borderColor: colors.border,
                    color: b.earned ? colors.bg : 'rgba(255,255,255,0.3)',
                    background: b.earned ? `${colors.bg}11` : 'transparent',
                  }}
                >
                  {b.rarity}
                </span>
              </div>

              <div
                className={`mx-auto mt-2 flex h-12 w-12 items-center justify-center rounded-full text-2xl shadow-md transition group-hover:scale-110`}
                style={{
                  background: b.earned
                    ? `linear-gradient(135deg, ${colors.bg}, ${colors.bg}aa)`
                    : 'rgba(255,255,255,0.05)',
                  filter: b.earned ? 'none' : 'grayscale(1) brightness(0.5)',
                }}
              >
                {b.icon}
              </div>

              <div className="mt-2 text-[11px] font-semibold">{b.name}</div>
              <div className="mt-0.5 text-[9px] text-white/50">{b.desc}</div>

              {/* Progress for locked */}
              {!b.earned && b.progress !== undefined && b.progress > 0 && (
                <div className="mt-2">
                  <div className="h-1 overflow-hidden rounded-full bg-nested">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${b.progress * 100}%`,
                        background: colors.bg,
                      }}
                    />
                  </div>
                  <div className="mt-0.5 text-[8px] text-white/40">
                    {(b.progress * 100).toFixed(0)}%
                  </div>
                </div>
              )}

              {/* Reward */}
              {b.earned && b.reward && (
                <div className="mt-1.5">
                  <Chip tone="ok">{b.reward}</Chip>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {visible.length === 0 && (
        <div className="mt-4 rounded-card border border-dashed border-glass bg-card/20 p-8 text-center text-sm text-white/50">
          No badges in this category yet.
        </div>
      )}
    </PlasticCard>
  );
}
