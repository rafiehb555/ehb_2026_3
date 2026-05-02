'use client';

import { PlasticCard } from '../ui/plastic-card';
import { Chip } from '../ui/chip';

/**
 * EHB Affiliate — Earnings Overview area chart
 *
 * 7-day earnings trend as smooth SVG area chart with gradient fill.
 * Matches Visily prototype "Earnings Overview" card.
 */

interface DataPoint {
  label: string;   // 'Mon', 'Tue', etc
  value: number;   // USD earnings
}

interface Props {
  /** 7 data points (Mon-Sun). Falls back to demo if missing. */
  data?: DataPoint[];
  /** Currency symbol (default $) */
  currency?: string;
  title?: string;
  subtitle?: string;
}

const DEMO_WEEK: DataPoint[] = [
  { label: 'Mon', value: 1240 },
  { label: 'Tue', value: 2180 },
  { label: 'Wed', value: 1890 },
  { label: 'Thu', value: 3420 },
  { label: 'Fri', value: 2640 },
  { label: 'Sat', value: 3850 },
  { label: 'Sun', value: 2980 },
];

export function AffiliateEarningsChart({
  data,
  currency = '$',
  title = 'Earnings Overview',
  subtitle = 'Last 7 days',
}: Props) {
  const series = data && data.length > 0 ? data : DEMO_WEEK;
  const usingDemo = series === DEMO_WEEK;

  const max = Math.max(...series.map((d) => d.value), 1);
  const min = Math.min(...series.map((d) => d.value), 0);
  const total = series.reduce((s, d) => s + d.value, 0);
  const avg = total / series.length;

  // Chart dimensions
  const W = 700;
  const H = 220;
  const padL = 50; // left padding for Y axis labels
  const padR = 20;
  const padT = 20;
  const padB = 30; // bottom padding for X labels

  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  // Map points to SVG coordinates
  const points = series.map((d, i) => {
    const x = padL + (i / (series.length - 1)) * innerW;
    const y = padT + innerH - ((d.value - 0) / max) * innerH;
    return { x, y, ...d };
  });

  // Create smooth path using cardinal-spline-like Bezier curves
  function smoothPath(pts: typeof points): string {
    if (pts.length < 2) return '';
    let path = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cpx = (p0.x + p1.x) / 2;
      path += ` C ${cpx},${p0.y} ${cpx},${p1.y} ${p1.x},${p1.y}`;
    }
    return path;
  }

  const linePath = smoothPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x},${padT + innerH} L ${points[0].x},${padT + innerH} Z`;

  // Y axis ticks (4 levels)
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((p) => ({
    value: max * p,
    y: padT + innerH - p * innerH,
  }));

  // Trend
  const lastVal = series[series.length - 1].value;
  const firstVal = series[0].value;
  const trendPct = firstVal > 0 ? ((lastVal - firstVal) / firstVal) * 100 : 0;
  const trendUp = trendPct >= 0;

  return (
    <PlasticCard className="mt-4 p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
            📈 {subtitle}
          </div>
          <h3 className="mt-1 text-lg font-semibold">{title}</h3>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-wider text-white/40">7-day total</div>
          <div className="mt-1 text-2xl font-bold tabular-nums text-teal">
            {currency}
            {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="mt-1 flex items-center justify-end gap-2 text-[11px]">
            <Chip tone={trendUp ? 'ok' : 'fail'}>
              {trendUp ? '↑' : '↓'} {Math.abs(trendPct).toFixed(1)}%
            </Chip>
            <span className="text-white/50">vs week start</span>
          </div>
        </div>
      </div>

      {usingDemo && (
        <div className="mt-2">
          <Chip tone="amber">Demo data</Chip>
        </div>
      )}

      {/* Chart */}
      <div className="mt-4 overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="earnings-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2BBFA0" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#2BBFA0" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="earnings-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7B6EF6" />
              <stop offset="100%" stopColor="#2BBFA0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Y-axis grid lines */}
          {yTicks.map((t, i) => (
            <g key={i}>
              <line
                x1={padL}
                y1={t.y}
                x2={W - padR}
                y2={t.y}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
              />
              <text
                x={padL - 8}
                y={t.y + 4}
                textAnchor="end"
                fontSize="10"
                fill="rgba(255,255,255,0.4)"
                fontFamily="system-ui,-apple-system,sans-serif"
              >
                {currency}
                {t.value >= 1000 ? (t.value / 1000).toFixed(1) + 'K' : t.value.toFixed(0)}
              </text>
            </g>
          ))}

          {/* Area fill */}
          <path d={areaPath} fill="url(#earnings-area)" />

          {/* Line */}
          <path
            d={linePath}
            fill="none"
            stroke="url(#earnings-line)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />

          {/* Data points */}
          {points.map((p, i) => {
            const isLast = i === points.length - 1;
            return (
              <g key={i}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isLast ? 5 : 4}
                  fill={isLast ? '#2BBFA0' : '#7B6EF6'}
                  stroke="#04060e"
                  strokeWidth="2"
                />
                {isLast && (
                  <>
                    <rect
                      x={p.x - 38}
                      y={p.y - 30}
                      width="76"
                      height="20"
                      rx="10"
                      fill="#2BBFA0"
                      opacity="0.95"
                    />
                    <text
                      x={p.x}
                      y={p.y - 16}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="700"
                      fill="white"
                      fontFamily="system-ui,-apple-system,sans-serif"
                    >
                      {currency}
                      {p.value.toLocaleString()}
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {/* X-axis labels */}
          {points.map((p, i) => (
            <text
              key={i}
              x={p.x}
              y={H - 10}
              textAnchor="middle"
              fontSize="11"
              fill="rgba(255,255,255,0.5)"
              fontFamily="system-ui,-apple-system,sans-serif"
            >
              {p.label}
            </text>
          ))}
        </svg>
      </div>

      {/* Stats strip */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-card border border-glass bg-card/40 p-3 text-center">
          <div className="text-[10px] uppercase text-white/40">Daily avg</div>
          <div className="mt-1 text-base font-bold tabular-nums text-purple-light">
            {currency}
            {avg.toFixed(2)}
          </div>
        </div>
        <div className="rounded-card border border-glass bg-card/40 p-3 text-center">
          <div className="text-[10px] uppercase text-white/40">Best day</div>
          <div className="mt-1 text-base font-bold tabular-nums text-teal">
            {currency}
            {max.toFixed(2)}
          </div>
        </div>
        <div className="rounded-card border border-glass bg-card/40 p-3 text-center">
          <div className="text-[10px] uppercase text-white/40">Lowest</div>
          <div className="mt-1 text-base font-bold tabular-nums text-amber">
            {currency}
            {min.toFixed(2)}
          </div>
        </div>
      </div>
    </PlasticCard>
  );
}
