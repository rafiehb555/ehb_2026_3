'use client';

import Link from 'next/link';
import { PlasticCard } from '../ui/plastic-card';
import { Chip } from '../ui/chip';

/**
 * EHB Affiliate — Quick Actions / Next Steps
 *
 * Personalized actionable next-steps panel based on user state.
 * Drives engagement by showing 3-5 highest-value actions the user can take right now.
 */

export interface UserSnapshot {
  isJoined?: boolean;
  kycTier?: number; // 0..4
  directReferrals?: number;
  hasFirstSale?: boolean;
  rank?: string;
  canPromoteTo?: string | null;
  pendingBonusUsd?: number;
  hasFranchise?: boolean;
  affiliateBalanceUsd?: number;
  stlLevel?: number;
}

export interface QuickAction {
  id: string;
  icon: string;
  title: string;
  desc: string;
  href: string;
  cta: string;
  priority: number; // higher = surfaced first
  toneColor: string;
  badge?: { label: string; tone: 'ok' | 'warn' | 'fail' | 'purple' | 'amber' | 'teal' };
}

function generateActions(s: UserSnapshot): QuickAction[] {
  const actions: QuickAction[] = [];

  if (!s.isJoined) {
    actions.push({
      id: 'join',
      icon: '🤝',
      title: 'Join the affiliate program',
      desc: 'Free to join — get your unique referral code instantly.',
      href: '#join',
      cta: 'Join now',
      priority: 100,
      toneColor: '#7B6EF6',
      badge: { label: 'Required', tone: 'purple' },
    });
    return actions; // before joining, only this one matters
  }

  // KYC ladder
  if (!s.kycTier || s.kycTier < 1) {
    actions.push({
      id: 'kyc-t1',
      icon: '🆔',
      title: 'Complete KYC Tier 1',
      desc: 'Submit ID document to unlock $1K/mo deposit + $500/mo withdrawal.',
      href: '/kyc',
      cta: 'Submit ID',
      priority: 95,
      toneColor: '#F0A030',
      badge: { label: 'Unlock withdrawals', tone: 'amber' },
    });
  } else if (s.kycTier < 2) {
    actions.push({
      id: 'kyc-t2',
      icon: '📸',
      title: 'Upgrade to KYC Tier 2',
      desc: 'Add selfie + address proof for $10K/mo limits + P2P transfers.',
      href: '/kyc',
      cta: 'Upgrade KYC',
      priority: 70,
      toneColor: '#F0A030',
    });
  }

  // No referrals yet
  if ((s.directReferrals || 0) === 0) {
    actions.push({
      id: 'first-referral',
      icon: '🔗',
      title: 'Invite your first referral',
      desc: 'Share your unique referral link. Earn 3% on every sale they make.',
      href: '#share',
      cta: 'Copy link',
      priority: 90,
      toneColor: '#2BBFA0',
      badge: { label: 'High impact', tone: 'ok' },
    });
  }

  // Pending bonus to claim
  if ((s.pendingBonusUsd || 0) > 0) {
    actions.push({
      id: 'claim-bonus',
      icon: '🎁',
      title: `$${s.pendingBonusUsd!.toFixed(2)} bonus ready`,
      desc: 'Pending bonus available — claim now to add to wallet.',
      href: '#bonuses',
      cta: 'Claim bonus',
      priority: 85,
      toneColor: '#EC4899',
      badge: { label: 'Available', tone: 'ok' },
    });
  }

  // Rank promotion
  if (s.canPromoteTo) {
    actions.push({
      id: 'rank-up',
      icon: '🏆',
      title: `Promote to ${s.canPromoteTo}`,
      desc: 'You meet all requirements. Claim your rank achievement bonus.',
      href: '#bonuses',
      cta: 'Claim rank',
      priority: 80,
      toneColor: '#F8B830',
      badge: { label: 'Eligible', tone: 'ok' },
    });
  }

  // STL upgrade prompts
  if ((s.stlLevel || 1) < 3) {
    actions.push({
      id: 'stl-upgrade',
      icon: '⭐',
      title: 'Upgrade STL to L3+',
      desc: 'L3 ADVANCED unlocks higher commission rates + product limits.',
      href: '/stl-upgrade',
      cta: 'Upgrade STL',
      priority: 50,
      toneColor: '#7B6EF6',
    });
  }

  // First sale not yet
  if (!s.hasFirstSale && (s.directReferrals || 0) > 0) {
    actions.push({
      id: 'first-sale',
      icon: '💵',
      title: 'Make your first sale',
      desc: 'Help your referral place an order to earn the $5 First Sale Bonus.',
      href: '/affiliate/marketplace',
      cta: 'Browse marketplace',
      priority: 75,
      toneColor: '#38C878',
    });
  }

  // No franchise yet, R2+
  if (!s.hasFranchise && (s.rank || 'R1') !== 'R1') {
    actions.push({
      id: 'franchise',
      icon: '🏪',
      title: 'Unlock your first franchise',
      desc: 'OF1 Digital Starter — $100 to unlock 3% direct franchise income.',
      href: '/franchise',
      cta: 'View franchise',
      priority: 60,
      toneColor: '#F0A030',
    });
  }

  // Withdrawal available
  if ((s.affiliateBalanceUsd || 0) >= 10 && (s.kycTier || 0) >= 1) {
    actions.push({
      id: 'withdraw',
      icon: '💸',
      title: 'Withdraw earnings',
      desc: `$${s.affiliateBalanceUsd!.toFixed(2)} ready to withdraw via JazzCash, HBL, or USDT.`,
      href: '/wallet',
      cta: 'Withdraw',
      priority: 65,
      toneColor: '#2BBFA0',
    });
  }

  // Default activity tip if nothing else
  if (actions.length === 0) {
    actions.push({
      id: 'browse-dam',
      icon: '🛍️',
      title: 'Browse the Marketplace',
      desc: 'Find products with high commission rates and share with your network.',
      href: '/affiliate/marketplace',
      cta: 'Open Marketplace',
      priority: 40,
      toneColor: '#7B6EF6',
    });
  }

  return actions.sort((a, b) => b.priority - a.priority).slice(0, 5);
}

interface Props {
  user?: UserSnapshot;
}

export function AffiliateQuickActions({ user }: Props) {
  // Default snapshot — assumes a typical newly-joined user with R1 + no KYC + 1 referral
  const snapshot: UserSnapshot = user || {
    isJoined: true,
    kycTier: 0,
    directReferrals: 1,
    hasFirstSale: false,
    rank: 'R1',
    canPromoteTo: null,
    pendingBonusUsd: 0,
    hasFranchise: false,
    affiliateBalanceUsd: 4.2,
    stlLevel: 2,
  };

  const actions = generateActions(snapshot);

  return (
    <PlasticCard className="mt-4 p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
            🎯 Next steps
          </div>
          <h3 className="mt-1 text-lg font-semibold">
            {actions.length} action{actions.length === 1 ? '' : 's'} for you
          </h3>
          <p className="mt-1 text-xs text-white/50">
            Personalized highest-value actions to grow earnings — sorted by impact.
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {actions.map((a, idx) => (
          <Link
            key={a.id}
            href={a.href}
            className="group flex items-center gap-3 rounded-card border border-glass bg-card/40 px-4 py-3 transition hover:-translate-y-0.5 hover:border-purple-light hover:bg-purple-light/5 hover:shadow-lg"
            style={{ borderLeft: `3px solid ${a.toneColor}` }}
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl"
              style={{
                background: `linear-gradient(135deg, ${a.toneColor}33, ${a.toneColor}11)`,
                border: `1px solid ${a.toneColor}55`,
              }}
            >
              {a.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-sm font-semibold">{a.title}</span>
                {a.badge && <Chip tone={a.badge.tone}>{a.badge.label}</Chip>}
              </div>
              <div className="mt-0.5 text-xs text-white/60">{a.desc}</div>
            </div>
            <div className="shrink-0 text-right">
              <span
                className="inline-flex items-center gap-1 rounded-pill border px-3 py-1 text-xs font-medium transition group-hover:translate-x-1"
                style={{
                  borderColor: `${a.toneColor}66`,
                  color: a.toneColor,
                  background: `${a.toneColor}11`,
                }}
              >
                {a.cta}
                <span>→</span>
              </span>
              <div className="mt-1 text-[9px] text-white/30">#{idx + 1} priority</div>
            </div>
          </Link>
        ))}
      </div>
    </PlasticCard>
  );
}
