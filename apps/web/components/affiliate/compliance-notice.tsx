'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PlasticCard } from '../ui/plastic-card';

/**
 * EHB Affiliate — Compliance Notice Banner
 *
 * Yellow/amber dismissible banner that appears above the dashboard when:
 *  - KYC tier is below threshold for upcoming milestone
 *  - Withdrawal pending action
 *  - Compliance document expired / required
 *
 * Matches Visily prototype Dashboard hero design.
 */

export interface ComplianceNotice {
  id: string;
  severity: 'info' | 'warning' | 'critical';
  icon: string;
  title: string;
  message: string;
  ctaLabel: string;
  ctaHref: string;
}

interface Props {
  notices?: ComplianceNotice[];
  /** When true, derive notices automatically from user state */
  userState?: {
    kycTier?: number;
    pendingClearanceUsd?: number;
    franchiseExpiresInDays?: number;
    nextMilestone?: string;
  };
}

const SEVERITY_STYLES = {
  info: {
    border: 'border-purple-light/40',
    bg: 'bg-purple-light/10',
    iconBg: 'bg-purple-light/20',
    iconColor: 'text-purple-light',
    titleColor: 'text-purple-light',
    ctaBg: 'bg-purple-light hover:bg-purple-light/90',
  },
  warning: {
    border: 'border-amber/40',
    bg: 'bg-amber/10',
    iconBg: 'bg-amber/20',
    iconColor: 'text-amber',
    titleColor: 'text-amber',
    ctaBg: 'bg-amber hover:bg-amber/90',
  },
  critical: {
    border: 'border-red-400/40',
    bg: 'bg-red-400/10',
    iconBg: 'bg-red-400/20',
    iconColor: 'text-red-400',
    titleColor: 'text-red-400',
    ctaBg: 'bg-red-400 hover:bg-red-400/90',
  },
};

function deriveNoticesFromState(s?: Props['userState']): ComplianceNotice[] {
  if (!s) return [];
  const out: ComplianceNotice[] = [];

  if ((s.kycTier ?? 0) < 1) {
    out.push({
      id: 'kyc-tier-1-required',
      severity: 'warning',
      icon: '⚠️',
      title: 'Compliance Notice (DMO)',
      message:
        'Your account requires updated KYC documentation for the upcoming quarter. Please navigate to your wallet settings to upload the necessary files to avoid payout delays.',
      ctaLabel: 'Update KYC',
      ctaHref: '/kyc',
    });
  } else if ((s.kycTier ?? 0) < 2 && (s.pendingClearanceUsd ?? 0) >= 1000) {
    out.push({
      id: 'kyc-tier-2-recommended',
      severity: 'info',
      icon: 'ℹ️',
      title: 'KYC upgrade recommended',
      message: `You have $${(s.pendingClearanceUsd ?? 0).toLocaleString()} pending. Upgrade to Tier 2 to unlock $10K/mo limits and faster clearance.`,
      ctaLabel: 'Upgrade to T2',
      ctaHref: '/kyc',
    });
  }

  if ((s.franchiseExpiresInDays ?? 999) < 14) {
    out.push({
      id: 'franchise-expiring',
      severity: 'critical',
      icon: '🚨',
      title: 'Franchise renewal due',
      message: `Your franchise tier expires in ${s.franchiseExpiresInDays} days. Renew now to keep cascade earnings active.`,
      ctaLabel: 'Renew now',
      ctaHref: '/franchise',
    });
  }

  return out;
}

export function AffiliateComplianceNotice({ notices, userState }: Props) {
  const list = notices && notices.length > 0 ? notices : deriveNoticesFromState(userState);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const visible = list.filter((n) => !dismissed.includes(n.id));

  if (visible.length === 0) return null;

  return (
    <div className="mt-4 space-y-2">
      {visible.map((n) => {
        const s = SEVERITY_STYLES[n.severity];
        return (
          <PlasticCard key={n.id} className={`${s.border} ${s.bg} border-2 p-4`}>
            <div className="flex flex-wrap items-start gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl ${s.iconBg}`}
              >
                {n.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className={`text-sm font-bold ${s.titleColor}`}>{n.title}</div>
                <p className="mt-1 text-xs leading-relaxed text-white/70">{n.message}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link href={n.ctaHref}>
                  <button
                    className={`rounded-card px-4 py-2 text-xs font-semibold text-white shadow ${s.ctaBg} transition hover:-translate-y-0.5`}
                  >
                    {n.ctaLabel} →
                  </button>
                </Link>
                <button
                  onClick={() => setDismissed((d) => [...d, n.id])}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-glass bg-card/40 text-white/40 transition hover:border-white/30 hover:text-white/80"
                  aria-label="Dismiss"
                >
                  ✕
                </button>
              </div>
            </div>
          </PlasticCard>
        );
      })}
    </div>
  );
}
