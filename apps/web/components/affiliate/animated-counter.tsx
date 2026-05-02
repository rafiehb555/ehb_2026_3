'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * EHB — AnimatedCounter
 *
 * Counts up from 0 to the target value when the element scrolls into view.
 * Uses IntersectionObserver to defer animation until visible (perf-friendly).
 *
 * Supports:
 *   - Number formatting (commas, decimals)
 *   - Prefix / suffix (e.g. "$", "+", "M")
 *   - Customizable duration + easing
 *   - Reduced-motion fallback (respects prefers-reduced-motion)
 */

interface Props {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  durationMs?: number;
  className?: string;
  abbreviate?: boolean; // 1200 → 1.2K, 1200000 → 1.2M
}

function formatNumber(n: number, decimals: number, abbreviate?: boolean): string {
  if (abbreviate) {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  }
  return n.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  durationMs = 1600,
  className = '',
  abbreviate = false,
}: Props) {
  const [current, setCurrent] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setCurrent(value);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / durationMs, 1);
            // ease-out-cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCurrent(value * eased);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, durationMs, hasAnimated]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {formatNumber(current, decimals, abbreviate)}
      {suffix}
    </span>
  );
}
