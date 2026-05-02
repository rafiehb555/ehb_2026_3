'use client';

export interface RingData {
  label: string; // e.g. "PSS", "CRB", "DMO"
  value: number; // 0-100 percentage
  from: string;
  to: string;
}

interface Props {
  // Main center gauge
  score: number;
  max?: number;
  level: number;
  levelName: string;
  label?: string;
  mainFrom?: string;
  mainTo?: string;
  /** Outer concentric rings (drawn from closest to main → outermost). */
  rings?: RingData[];
  size?: number;
  mainStroke?: number;
  ringStroke?: number;
  ringGap?: number;
}

/**
 * EHB MultiRingGauge — SVG-based circular gauge with a bold center arc
 * and N outer concentric progress rings. Each ring has a floating percentage
 * chip at its arc endpoint. Matches the teal/pink multi-ring reference design.
 */
export function MultiRingGauge({
  score,
  max = 100,
  level,
  levelName,
  label = 'STL SCORE',
  mainFrom = '#7B6EF6',
  mainTo = '#2BBFA0',
  rings = [],
  size = 340,
  mainStroke = 16,
  ringStroke = 10,
  ringGap = 6,
}: Props) {
  const cx = size / 2;
  const cy = size / 2;
  // Main ring radius — innermost. Outer rings wrap around it.
  const mainR =
    (size - mainStroke) / 2 - rings.length * (ringStroke + ringGap);
  const mainC = 2 * Math.PI * mainR;
  const mainPct = Math.max(0, Math.min(max, score)) / max;
  const idBase = `mrg-${Math.random().toString(36).slice(2, 8)}`;

  function endPoint(r: number, pct: number) {
    const angle = (pct / 100) * 2 * Math.PI - Math.PI / 2;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  }

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{
          transform: 'rotate(-90deg)',
          filter: `drop-shadow(0 0 16px ${mainTo}55)`,
        }}
      >
        <defs>
          <linearGradient id={`${idBase}-main`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={mainFrom} />
            <stop offset="100%" stopColor={mainTo} />
          </linearGradient>
          {rings.map((r, i) => (
            <linearGradient
              key={i}
              id={`${idBase}-r${i}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={r.from} />
              <stop offset="100%" stopColor={r.to} />
            </linearGradient>
          ))}
        </defs>

        {/* Outer rings */}
        {rings.map((ring, i) => {
          const r = mainR + (i + 1) * (ringStroke + ringGap);
          const c = 2 * Math.PI * r;
          const pct = Math.max(0, Math.min(100, ring.value)) / 100;
          return (
            <g key={i}>
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth={ringStroke}
              />
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={`url(#${idBase}-r${i})`}
                strokeWidth={ringStroke}
                strokeLinecap="round"
                strokeDasharray={c}
                strokeDashoffset={c * (1 - pct)}
                style={{ transition: 'stroke-dashoffset 1s ease-out' }}
              />
            </g>
          );
        })}

        {/* Main center arc (thicker) */}
        <circle
          cx={cx}
          cy={cy}
          r={mainR}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={mainStroke}
        />
        <circle
          cx={cx}
          cy={cy}
          r={mainR}
          fill="none"
          stroke={`url(#${idBase}-main)`}
          strokeWidth={mainStroke}
          strokeLinecap="round"
          strokeDasharray={mainC}
          strokeDashoffset={mainC * (1 - mainPct)}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>

      {/* Center content */}
      <div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
      >
        <div className="text-[9px] uppercase tracking-widest text-white/50 sm:text-[10px]">
          {label}
        </div>
        <div
          className="text-4xl font-black leading-none tabular-nums sm:text-5xl"
          style={{
            backgroundImage: `linear-gradient(135deg, ${mainFrom}, ${mainTo})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {score.toFixed(1)}
        </div>
        <div className="mt-0.5 text-[10px] text-white/50">/{max}</div>
        <div
          className="mt-2 rounded-chip border px-3 py-0.5 text-sm font-bold"
          style={{
            background: `linear-gradient(135deg, ${mainFrom}33, ${mainTo}22)`,
            borderColor: `${mainTo}66`,
            color: mainTo,
          }}
        >
          LEVEL {level}
        </div>
        <div className="mt-0.5 text-[11px] text-white/70">{levelName}</div>
      </div>

      {/* Floating ring labels at arc endpoints */}
      {rings.map((ring, i) => {
        const r = mainR + (i + 1) * (ringStroke + ringGap);
        const { x, y } = endPoint(r, ring.value);
        return (
          <div
            key={i}
            className="pointer-events-none absolute whitespace-nowrap rounded-chip px-2 py-0.5 text-[10px] font-semibold text-white shadow-lg"
            style={{
              left: x,
              top: y,
              transform: 'translate(-50%, -50%)',
              background: `linear-gradient(135deg, ${ring.from}, ${ring.to})`,
              boxShadow: `0 2px 12px ${ring.to}99`,
              zIndex: 10,
            }}
          >
            {ring.label} {Math.round(ring.value)}%
          </div>
        );
      })}
    </div>
  );
}
