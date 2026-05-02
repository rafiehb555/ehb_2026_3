'use client';

import { ReactNode } from 'react';
import { PlasticCard } from './plastic-card';
import { Button3D } from './button-3d';

/**
 * EHB — Reusable UI state components
 *
 *   <EmptyState />     — when there's no data yet
 *   <ErrorState />     — when something failed
 *   <LoadingSkeleton /> — while data is loading (animated)
 *   <SuccessState />   — after a successful action
 *
 * All variants are friendly, brand-consistent, and include CTAs.
 */

interface EmptyStateProps {
  icon?: string;
  title: string;
  desc?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaOnClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function EmptyState({
  icon = '📭',
  title,
  desc,
  ctaLabel,
  ctaHref,
  ctaOnClick,
  size = 'md',
  className = '',
}: EmptyStateProps) {
  const padding = size === 'sm' ? 'p-6' : size === 'lg' ? 'p-12' : 'p-8';
  const iconSize = size === 'sm' ? 'text-3xl' : size === 'lg' ? 'text-6xl' : 'text-5xl';

  return (
    <PlasticCard className={`${padding} text-center ${className}`}>
      <div className={iconSize}>{icon}</div>
      <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
      {desc && <p className="mx-auto mt-2 max-w-md text-sm text-white/60">{desc}</p>}
      {ctaLabel && (ctaHref || ctaOnClick) && (
        <div className="mt-4">
          {ctaHref ? (
            <a href={ctaHref}>
              <Button3D variant="purple" size="md">
                {ctaLabel}
              </Button3D>
            </a>
          ) : (
            <Button3D variant="purple" size="md" onClick={ctaOnClick}>
              {ctaLabel}
            </Button3D>
          )}
        </div>
      )}
    </PlasticCard>
  );
}

interface ErrorStateProps {
  icon?: string;
  title?: string;
  desc?: string;
  errorDetail?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  icon = '⚠️',
  title = 'Something went wrong',
  desc = 'We couldn\'t load this data. Please try again.',
  errorDetail,
  onRetry,
  className = '',
}: ErrorStateProps) {
  return (
    <PlasticCard className={`border-2 border-red-400/30 bg-red-400/5 p-8 text-center ${className}`}>
      <div className="text-5xl">{icon}</div>
      <h3 className="mt-3 text-lg font-semibold text-red-400">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-white/70">{desc}</p>
      {errorDetail && (
        <div className="mx-auto mt-3 max-w-md rounded-card border border-glass bg-card/40 p-3 text-left">
          <div className="text-[10px] uppercase tracking-wider text-white/40">Error details</div>
          <code className="mt-1 block break-all text-[10px] text-red-400">{errorDetail}</code>
        </div>
      )}
      {onRetry && (
        <div className="mt-4">
          <Button3D variant="red" size="md" onClick={onRetry}>
            🔄 Try Again
          </Button3D>
        </div>
      )}
    </PlasticCard>
  );
}

interface LoadingSkeletonProps {
  variant?: 'card' | 'list' | 'table' | 'kpi-grid' | 'chart';
  rows?: number;
  className?: string;
}

export function LoadingSkeleton({
  variant = 'card',
  rows = 3,
  className = '',
}: LoadingSkeletonProps) {
  if (variant === 'kpi-grid') {
    return (
      <div className={`grid gap-3 sm:grid-cols-2 xl:grid-cols-4 ${className}`}>
        {[0, 1, 2, 3].map((i) => (
          <PlasticCard key={i} className="p-5">
            <div className="flex justify-between">
              <Bar width="60px" />
              <Bar width="32px" height="32px" />
            </div>
            <div className="mt-4">
              <Bar width="80%" height="28px" />
              <Bar width="40%" className="mt-2" height="12px" />
            </div>
          </PlasticCard>
        ))}
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <PlasticCard className={`overflow-hidden ${className}`}>
        <div className="space-y-1">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3">
              <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-white/10" />
              <div className="min-w-0 flex-1">
                <Bar width="70%" />
                <Bar width="40%" className="mt-1.5" height="10px" />
              </div>
              <Bar width="60px" />
            </div>
          ))}
        </div>
      </PlasticCard>
    );
  }

  if (variant === 'table') {
    return (
      <PlasticCard className={`overflow-hidden ${className}`}>
        <div className="border-b border-glass px-5 py-3">
          <Bar width="200px" height="20px" />
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 border-b border-glass px-5 py-3 last:border-0">
            <Bar width="50px" />
            <Bar width="180px" />
            <div className="flex-1" />
            <Bar width="80px" />
            <Bar width="60px" />
          </div>
        ))}
      </PlasticCard>
    );
  }

  if (variant === 'chart') {
    return (
      <PlasticCard className={`p-5 ${className}`}>
        <Bar width="40%" height="20px" />
        <Bar width="60%" className="mt-2" height="14px" />
        <div className="mt-6 flex h-40 items-end gap-2">
          {[40, 70, 50, 85, 65, 90, 75].map((h, i) => (
            <div
              key={i}
              className="flex-1 animate-pulse rounded-t bg-white/10"
              style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      </PlasticCard>
    );
  }

  // default 'card'
  return (
    <PlasticCard className={`p-5 ${className}`}>
      <Bar width="50%" height="20px" />
      <Bar width="80%" className="mt-3" />
      <Bar width="60%" className="mt-1.5" />
      <Bar width="70%" className="mt-1.5" />
    </PlasticCard>
  );
}

interface SuccessStateProps {
  icon?: string;
  title: string;
  desc?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaOnClick?: () => void;
  className?: string;
}

export function SuccessState({
  icon = '✅',
  title,
  desc,
  ctaLabel,
  ctaHref,
  ctaOnClick,
  className = '',
}: SuccessStateProps) {
  return (
    <PlasticCard className={`border-2 border-teal/30 bg-teal/5 p-8 text-center ${className}`}>
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal/20 text-3xl">
        {icon}
      </div>
      <h3 className="mt-3 text-lg font-semibold text-teal">{title}</h3>
      {desc && <p className="mx-auto mt-2 max-w-md text-sm text-white/70">{desc}</p>}
      {ctaLabel && (ctaHref || ctaOnClick) && (
        <div className="mt-4">
          {ctaHref ? (
            <a href={ctaHref}>
              <Button3D variant="green" size="md">
                {ctaLabel}
              </Button3D>
            </a>
          ) : (
            <Button3D variant="green" size="md" onClick={ctaOnClick}>
              {ctaLabel}
            </Button3D>
          )}
        </div>
      )}
    </PlasticCard>
  );
}

/* ────────── Internal helper — animated bar primitive ────────── */
interface BarProps {
  width?: string;
  height?: string;
  className?: string;
}
function Bar({ width = '100%', height = '14px', className = '' }: BarProps) {
  return (
    <div
      className={`animate-pulse rounded bg-white/10 ${className}`}
      style={{ width, height }}
    />
  );
}

/* ────────── Inline state badge for tighter contexts ────────── */
interface InlineStateProps {
  status: 'loading' | 'error' | 'empty' | 'success';
  message?: string;
}
export function InlineState({ status, message }: InlineStateProps) {
  const config = {
    loading: { icon: '⏳', color: 'text-purple-light', defaultMsg: 'Loading…' },
    error: { icon: '⚠️', color: 'text-red-400', defaultMsg: 'Failed to load' },
    empty: { icon: '📭', color: 'text-white/40', defaultMsg: 'No data' },
    success: { icon: '✓', color: 'text-teal', defaultMsg: 'Done' },
  }[status];
  return (
    <div className={`flex items-center gap-2 text-xs ${config.color}`}>
      <span>{config.icon}</span>
      <span>{message || config.defaultMsg}</span>
    </div>
  );
}
