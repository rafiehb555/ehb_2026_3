'use client';

/**
 * AffiliateCard — promo / live-stats card for Affiliate Program v3.2-MVP
 *
 * Spec: ehb-info/departments/Affiliate.md §12 (v3.2)
 *
 * Two visual modes:
 *  - Promo (no user / not joined): pitch + "Join free" CTA + earnings teaser
 *  - Live (joined user):           referral code copy + earnings + share button
 *
 * Embeds: homepage promo, user dashboard, inline anywhere needing affiliate entry.
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-context';
import { PlasticCard } from './plastic-card';
import { Button3D } from './button-3d';
import { Chip } from './chip';

interface AffiliateCardProps {
  /** Compact = small widget for sidebars/dashboards. Default false (full hero card). */
  compact?: boolean;
  /** Hide the "Why join" stats teaser (joined-user mode auto-hides this anyway) */
  hideTeaser?: boolean;
  /** Optional className to append */
  className?: string;
}

interface AffiliateData {
  referralCode?: string;
  rank?: string;
  stats?: {
    directReferrals?: number;
    networkSize?: number;
    lifetimeEarningsUsd?: number;
    thisMonthEarningsUsd?: number;
    directEarnedUsd?: number;
    level2EarnedUsd?: number;
    firstSaleBonusEarnedUsd?: number;
    stlBonusEarnedUsd?: number;
    fastSaleBonusFreePackages?: number;
  };
  note?: string;
}

export function AffiliateCard({ compact = false, hideTeaser = false, className = '' }: AffiliateCardProps) {
  const { user } = useAuth();
  const [data, setData] = useState<AffiliateData | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) return;
    api
      .get('/api/affiliate/me')
      .then((r) => setData(r as AffiliateData))
      .catch(() => setData(null));
  }, [user]);

  const isJoined = Boolean(data?.referralCode);
  const refLink = isJoined
    ? `${typeof window !== 'undefined' ? window.location.origin : 'https://ehb.com'}/register?ref=${data?.referralCode}`
    : '';

  const copyLink = () => {
    if (!refLink) return;
    navigator.clipboard?.writeText(refLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ─── PROMO MODE (not signed in OR not joined) ───────────────────────
  if (!user || !isJoined) {
    return (
      <PlasticCard
        className={`overflow-hidden p-0 ${className}`}
      >
        <div
          className={`relative ${compact ? 'p-4' : 'p-5 sm:p-7'}`}
          style={{
            background:
              'linear-gradient(135deg, rgba(123, 110, 246, 0.18), rgba(236, 72, 153, 0.08) 60%, transparent)',
          }}
        >
          <div className="flex flex-wrap items-start gap-4">
            <div
              className={`flex shrink-0 items-center justify-center rounded-card shadow-2xl ${
                compact ? 'h-12 w-12 text-2xl' : 'h-16 w-16 text-3xl sm:h-20 sm:w-20 sm:text-4xl'
              }`}
              style={{
                background: 'linear-gradient(135deg, #7B6EF6, #ec4899)',
                boxShadow: '0 12px 40px rgba(236,72,153,0.35)',
              }}
            >
              🤝
            </div>
            <div className="min-w-0 flex-1">
              <Chip tone="purple">EHB Affiliate Program</Chip>
              <h3
                className={`mt-2 font-bold ${
                  compact ? 'text-base' : 'text-lg sm:text-xl'
                }`}
              >
                Earn from your network — share & earn
              </h3>
              {!compact ? (
                <p className="mt-2 text-sm text-white/70">
                  Refer friends to EHB. Earn <strong className="text-teal">10% direct</strong> on
                  product sales + <strong className="text-teal">5% on level-2</strong> + bonuses
                  (First Sale, STL upgrade, Fast Sale).
                </p>
              ) : (
                <p className="mt-1 text-xs text-white/60">
                  Earn 10% direct + 5% L2 + bonuses
                </p>
              )}

              {!hideTeaser && !compact ? (
                <div className="mt-3 grid grid-cols-3 gap-2 rounded-card border border-glass bg-nested/40 p-3">
                  <div className="text-center">
                    <div className="text-[10px] uppercase tracking-wider text-white/40">Direct</div>
                    <div className="text-lg font-bold text-teal">10%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] uppercase tracking-wider text-white/40">Level 2</div>
                    <div className="text-lg font-bold text-purple-light">5%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] uppercase tracking-wider text-white/40">Bonuses</div>
                    <div className="text-lg font-bold text-amber">3</div>
                  </div>
                </div>
              ) : null}

              <div className={`mt-${compact ? '3' : '4'} flex flex-wrap gap-2`}>
                <Link href="/affiliate">
                  <Button3D variant="purple" size={compact ? 'sm' : 'md'}>
                    {!user ? 'Sign up & join' : 'Join free'}
                  </Button3D>
                </Link>
                {!compact ? (
                  <Link href="/affiliate">
                    <button className="rounded-chip border border-glass bg-card/60 px-4 py-2 text-sm hover:border-purple-light">
                      How it works →
                    </button>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </PlasticCard>
    );
  }

  // ─── LIVE MODE (joined user) ────────────────────────────────────────
  const lifetime = data?.stats?.lifetimeEarningsUsd || 0;
  const thisMonth = data?.stats?.thisMonthEarningsUsd || 0;
  const directs = data?.stats?.directReferrals || 0;
  const network = data?.stats?.networkSize || 0;
  const rank = data?.rank || 'R1';

  return (
    <PlasticCard className={`overflow-hidden p-0 ${className}`}>
      <div
        className={`relative ${compact ? 'p-4' : 'p-5 sm:p-6'}`}
        style={{
          background:
            'linear-gradient(135deg, rgba(43, 191, 160, 0.12), rgba(123, 110, 246, 0.06) 70%, transparent)',
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <Chip tone="purple">{rank} Starter</Chip>
              <Chip tone="ok">Active</Chip>
            </div>
            <h3 className={`mt-2 font-bold ${compact ? 'text-sm' : 'text-base sm:text-lg'}`}>
              Your Affiliate Dashboard
            </h3>
          </div>
          <Link
            href="/affiliate"
            className="rounded-chip border border-glass bg-white/5 px-3 py-1.5 text-xs hover:border-teal"
          >
            Open →
          </Link>
        </div>

        {/* Referral code */}
        <div className="mt-3 rounded-card border border-glass bg-nested/60 p-3">
          <div className="text-[10px] uppercase tracking-widest text-white/40">
            Your referral link
          </div>
          <div className="mt-1.5 flex items-center gap-2">
            <code className="min-w-0 flex-1 truncate rounded-input border border-glass bg-card/40 px-2.5 py-1.5 font-mono text-[11px] sm:text-xs text-teal">
              {refLink}
            </code>
            <button
              onClick={copyLink}
              className={`shrink-0 rounded-chip border px-3 py-1.5 text-xs font-medium transition ${
                copied
                  ? 'border-teal bg-teal/20 text-teal'
                  : 'border-glass bg-white/5 hover:border-teal'
              }`}
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Stats grid */}
        <div className={`mt-3 grid gap-2 ${compact ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
          <div className="rounded-card border border-glass bg-nested/40 p-2.5 text-center">
            <div className="text-[10px] uppercase tracking-wider text-white/40">Lifetime</div>
            <div className="text-base font-bold tabular-nums text-teal sm:text-lg">
              ${lifetime.toFixed(2)}
            </div>
          </div>
          <div className="rounded-card border border-glass bg-nested/40 p-2.5 text-center">
            <div className="text-[10px] uppercase tracking-wider text-white/40">This month</div>
            <div className="text-base font-bold tabular-nums text-amber sm:text-lg">
              ${thisMonth.toFixed(2)}
            </div>
          </div>
          {!compact ? (
            <>
              <div className="rounded-card border border-glass bg-nested/40 p-2.5 text-center">
                <div className="text-[10px] uppercase tracking-wider text-white/40">Direct refs</div>
                <div className="text-base font-bold tabular-nums sm:text-lg">{directs}</div>
              </div>
              <div className="rounded-card border border-glass bg-nested/40 p-2.5 text-center">
                <div className="text-[10px] uppercase tracking-wider text-white/40">Network</div>
                <div className="text-base font-bold tabular-nums sm:text-lg">{network}</div>
              </div>
            </>
          ) : null}
        </div>

        {!compact ? (
          <div className="mt-3 flex flex-wrap gap-2">
            <Button3D
              variant="teal"
              size="sm"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Join EHB',
                    text: 'Join EHB through my referral and start earning.',
                    url: refLink,
                  }).catch(() => {});
                } else {
                  copyLink();
                }
              }}
            >
              📤 Share
            </Button3D>
            <Link href="/wallet">
              <button className="rounded-chip border border-glass bg-card/60 px-3 py-1.5 text-xs hover:border-teal">
                💰 Wallet
              </button>
            </Link>
            <Link href="/affiliate">
              <button className="rounded-chip border border-glass bg-card/60 px-3 py-1.5 text-xs hover:border-teal">
                Earnings →
              </button>
            </Link>
          </div>
        ) : null}
      </div>
    </PlasticCard>
  );
}
