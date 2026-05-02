'use client';

interface Props {
  values: number[];
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
  fill?: boolean;
}

/** Small inline SVG sparkline for KPI cards. */
export function Sparkline({
  values,
  color = '#2BBFA0',
  width = 100,
  height = 28,
  strokeWidth = 1.5,
  fill = true,
}: Props) {
  if (!values.length) return null;
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const step = width / Math.max(values.length - 1, 1);
  const points = values
    .map((v, i) => `${i * step},${height - ((v - min) / range) * (height - strokeWidth) - strokeWidth / 2}`)
    .join(' ');
  const pathD = `M ${points.replace(/ /g, ' L ')}`;
  const fillD = fill ? `${pathD} L ${width},${height} L 0,${height} Z` : '';
  const id = `sp-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.35" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill ? <path d={fillD} fill={`url(#${id})`} /> : null}
      <path d={pathD} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
