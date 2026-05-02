'use client';

interface Props {
  score: number; // 0-100
  max?: number;
  level: number; // 1-10
  levelName: string;
  label?: string;
  size?: number;
  strokeWidth?: number;
  gradientFrom?: string;
  gradientTo?: string;
  gradientGlow?: string;
  /** Optional sub-label shown below big number */
  subLabel?: string;
}

/**
 * EHB Circular Gauge — animated SVG arc with gradient + glow.
 * Used on /stl and /dmo/stl dashboards.
 */
export function CircularGauge({
  score,
  max = 100,
  level,
  levelName,
  label = 'STL SCORE',
  size = 240,
  strokeWidth = 18,
  gradientFrom = '#7B6EF6',
  gradientTo = '#2BBFA0',
  gradientGlow,
  subLabel,
}: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(max, score));
  const pct = clamped / max;
  const dashOffset = circumference * (1 - pct);
  const id = `gauge-${Math.random().toString(36).slice(2, 8)}`;
  const glow = gradientGlow || gradientTo;

  return (
    <div className="relative inline-block">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rotate-[-90deg]"
        style={{ filter: `drop-shadow(0 0 18px ${glow}66)` }}
      >
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={gradientFrom} />
            <stop offset="100%" stopColor={gradientTo} />
          </linearGradient>
        </defs>
        {/* Background track */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>

      {/* Center content */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[10px] uppercase tracking-widest text-white/50">{label}</div>
        <div
          className="text-5xl font-black leading-none tabular-nums tracking-tight sm:text-6xl"
          style={{
            backgroundImage: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {score.toFixed(1)}
        </div>
        <div className="mt-1 text-xs text-white/50">/{max}</div>
        {subLabel ? (
          <div className="mt-1 text-[10px] uppercase tracking-widest" style={{ color: gradientTo }}>
            {subLabel}
          </div>
        ) : null}
        <div
          className="mt-2 rounded-chip border px-3 py-1 text-sm font-bold"
          style={{
            background: `linear-gradient(135deg, ${gradientFrom}33, ${gradientTo}22)`,
            borderColor: `${gradientTo}66`,
            color: gradientTo,
          }}
        >
          LEVEL {level}
        </div>
        <div className="mt-0.5 text-xs text-white/70">{levelName}</div>
      </div>
    </div>
  );
}
