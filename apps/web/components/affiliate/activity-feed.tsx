'use client';

import { PlasticCard } from '../ui/plastic-card';
import { Chip } from '../ui/chip';

/**
 * EHB Affiliate — Commission Activity Feed
 *
 * Recent commissions stream — last 10-20 events with type chip, amount, source.
 * Falls back to demo data when no commissions provided.
 */

export interface Commission {
  _id?: string;
  type:
    | 'direct_sale'
    | 'level_2'
    | 'level_3'
    | 'first_sale_bonus'
    | 'stl_purchase_bonus'
    | 'fast_sale_bonus'
    | 'matching_bonus'
    | 'rank_achievement'
    | 'team_performance'
    | 'retention_uplift'
    | 'monthly_leader'
    | 'super_franchise'
    | 'global_pool'
    | 'track_b_l1' | 'track_b_l2' | 'track_b_l3' | 'track_b_l4' | 'track_b_l5'
    | 'track_b_l6' | 'track_b_l7' | 'track_b_l8' | 'track_b_l9' | 'track_b_l10';
  amountUsd: number;
  status?: 'pending' | 'paid' | 'reversed';
  sourceUserName?: string;
  sourceProductName?: string;
  createdAt: string;
}

const TYPE_META: Record<
  string,
  { label: string; icon: string; color: string; tone: 'ok' | 'purple' | 'amber' | 'teal' }
> = {
  direct_sale: { label: 'Direct sale', icon: '🎯', color: '#2BBFA0', tone: 'ok' },
  level_2: { label: 'L2 cascade', icon: '🔁', color: '#7B6EF6', tone: 'purple' },
  level_3: { label: 'L3 cascade', icon: '🔁', color: '#A098F8', tone: 'purple' },
  first_sale_bonus: { label: 'First Sale Bonus', icon: '🎉', color: '#F0A030', tone: 'amber' },
  stl_purchase_bonus: { label: 'STL upgrade', icon: '⭐', color: '#EC4899', tone: 'purple' },
  fast_sale_bonus: { label: 'Fast Sale', icon: '⚡', color: '#38C878', tone: 'ok' },
  matching_bonus: { label: 'Matching bonus', icon: '🤝', color: '#7B6EF6', tone: 'purple' },
  rank_achievement: { label: 'Rank promo', icon: '🏆', color: '#F0C040', tone: 'amber' },
  team_performance: { label: 'Team perf', icon: '👥', color: '#2BBFA0', tone: 'teal' },
  retention_uplift: { label: 'Retention', icon: '📈', color: '#38C878', tone: 'ok' },
  monthly_leader: { label: 'Monthly leader', icon: '👑', color: '#F0A030', tone: 'amber' },
  super_franchise: { label: 'Super franchise', icon: '🏪', color: '#EC4899', tone: 'amber' },
  global_pool: { label: 'Global pool', icon: '🌍', color: '#A098F8', tone: 'purple' },
  track_b_l1: { label: 'Track B L1', icon: '🏛️', color: '#2BBFA0', tone: 'teal' },
  track_b_l2: { label: 'Track B L2', icon: '🏛️', color: '#2BBFA0', tone: 'teal' },
  track_b_l3: { label: 'Track B L3', icon: '🏛️', color: '#7B6EF6', tone: 'purple' },
  track_b_l4: { label: 'Track B L4', icon: '🏛️', color: '#7B6EF6', tone: 'purple' },
  track_b_l5: { label: 'Track B L5', icon: '🏛️', color: '#A098F8', tone: 'purple' },
};

const DEMO_COMMISSIONS: Commission[] = [
  {
    _id: 'c1',
    type: 'direct_sale',
    amountUsd: 12.4,
    status: 'paid',
    sourceUserName: 'Ahmed K.',
    sourceProductName: 'Online Business School — Pro',
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
  },
  {
    _id: 'c2',
    type: 'level_2',
    amountUsd: 4.2,
    status: 'paid',
    sourceUserName: 'Sara M. (via Ahmed)',
    sourceProductName: 'GoSellr — Order #4821',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    _id: 'c3',
    type: 'first_sale_bonus',
    amountUsd: 5.0,
    status: 'paid',
    sourceUserName: 'Hassan M.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    _id: 'c4',
    type: 'stl_purchase_bonus',
    amountUsd: 9.6,
    status: 'paid',
    sourceUserName: 'Zara B.',
    sourceProductName: 'STL upgrade L3 → L4',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
  {
    _id: 'c5',
    type: 'matching_bonus',
    amountUsd: 0.62,
    status: 'paid',
    sourceUserName: 'Sara M.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    _id: 'c6',
    type: 'direct_sale',
    amountUsd: 28.4,
    status: 'paid',
    sourceUserName: 'Ayesha R.',
    sourceProductName: 'Wellness Plan — 3-Mo',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
  {
    _id: 'c7',
    type: 'fast_sale_bonus',
    amountUsd: 0,
    status: 'paid',
    sourceUserName: 'You — 4 sales this week',
    sourceProductName: '🎁 1 free same package unlocked',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
  },
  {
    _id: 'c8',
    type: 'level_2',
    amountUsd: 3.6,
    status: 'pending',
    sourceUserName: 'Faraz Q. (via Ayesha)',
    sourceProductName: 'GoSellr — Order #4839',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
  },
  {
    _id: 'c9',
    type: 'rank_achievement',
    amountUsd: 100,
    status: 'paid',
    sourceUserName: 'You',
    sourceProductName: 'R3 Builder achieved',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 60).toISOString(),
  },
  {
    _id: 'c10',
    type: 'direct_sale',
    amountUsd: 18.0,
    status: 'paid',
    sourceUserName: 'Imran S.',
    sourceProductName: 'Legal Consult — Premium',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
];

function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const min = Math.floor(ms / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min}m ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  const w = Math.floor(d / 7);
  return `${w}w ago`;
}

interface Props {
  commissions?: Commission[];
  limit?: number;
  isJoined?: boolean;
}

export function AffiliateActivityFeed({ commissions, limit = 10, isJoined = true }: Props) {
  const list = commissions && commissions.length > 0 ? commissions : DEMO_COMMISSIONS;
  const usingDemo = list === DEMO_COMMISSIONS;
  const visible = list.slice(0, limit);

  const totalThisWeek = visible.reduce((s, c) => {
    const days = (Date.now() - new Date(c.createdAt).getTime()) / 86400000;
    return days <= 7 ? s + (c.amountUsd || 0) : s;
  }, 0);

  return (
    <PlasticCard className="mt-4 p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
            ⚡ Recent activity
          </div>
          <h3 className="mt-1 text-lg font-semibold">
            {visible.length} commissions ·{' '}
            <span className="text-teal">${totalThisWeek.toFixed(2)}</span>{' '}
            <span className="text-xs font-normal text-white/50">this week</span>
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {usingDemo && <Chip tone="amber">Demo data</Chip>}
          {!isJoined && <Chip tone="warn">Preview</Chip>}
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        {visible.length === 0 ? (
          <div className="rounded-card border border-dashed border-glass bg-card/20 p-8 text-center">
            <div className="text-3xl">📭</div>
            <p className="mt-2 text-sm text-white/60">No commissions yet</p>
            <p className="mt-1 text-xs text-white/40">
              Your downline's first sale will show up here in real time.
            </p>
          </div>
        ) : (
          visible.map((c) => {
            const meta = TYPE_META[c.type] || {
              label: c.type.replace(/_/g, ' '),
              icon: '💵',
              color: '#7B6EF6',
              tone: 'purple' as const,
            };
            const isReversed = c.status === 'reversed';
            const isPending = c.status === 'pending';
            return (
              <div
                key={c._id || `${c.type}-${c.createdAt}`}
                className={`flex items-center gap-3 rounded-card border border-glass bg-card/30 px-3 py-2 transition hover:border-purple-light/50 ${
                  isReversed ? 'opacity-60' : ''
                }`}
                style={{ borderLeft: `3px solid ${meta.color}` }}
              >
                <span className="text-xl">{meta.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-sm font-medium">
                      {c.sourceProductName || c.sourceUserName || 'Commission'}
                    </span>
                    <span
                      className={`shrink-0 text-sm font-bold tabular-nums ${
                        isReversed ? 'text-red-400 line-through' : 'text-teal'
                      }`}
                    >
                      {c.amountUsd > 0 ? `+$${c.amountUsd.toFixed(2)}` : 'FREE'}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-[10px] text-white/50">
                    <Chip tone={meta.tone}>{meta.label}</Chip>
                    {c.sourceUserName && c.sourceProductName && (
                      <span className="text-white/40">from {c.sourceUserName}</span>
                    )}
                    {isPending && <Chip tone="warn">pending</Chip>}
                    {isReversed && <Chip tone="fail">reversed</Chip>}
                    <span className="ml-auto text-white/40">{timeAgo(c.createdAt)}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {visible.length > 0 && (
        <button className="mt-3 w-full rounded-card border border-glass bg-card/30 py-2 text-xs text-white/60 hover:border-teal hover:text-teal">
          View full earnings history →
        </button>
      )}
    </PlasticCard>
  );
}
