/**
 * EHB STL Level Icons (L1 → L10)
 * Custom SVG paths per level, matching spec in
 * ehb-info/15-ui-system/STL-LADDER-COMPONENT.md
 */

interface LevelIconProps {
  iconKey: 'dot' | 'leaf' | 'check' | 'shield' | 'star' | 'gem' | 'trophy' | 'crown' | 'lightning' | 'sun';
  fill: string;
  size?: number;
  bgRing?: string; // optional outer ring fill (white circle)
}

export function LevelIcon({ iconKey, fill, size = 46, bgRing }: LevelIconProps) {
  const inner = INNER_PATHS[iconKey];
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      {bgRing && <circle cx="32" cy="32" r="22" fill={bgRing} />}
      {inner(fill)}
    </svg>
  );
}

const INNER_PATHS: Record<string, (fill: string) => JSX.Element> = {
  dot: (f) => <circle cx="32" cy="32" r="9" fill={f} />,
  leaf: (f) => <path d="M32 16 C24 24 24 38 32 50 C40 38 40 24 32 16" fill={f} />,
  check: (f) => (
    <path d="M20 32 L28 40 L44 22" stroke={f} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  shield: (f) => <path d="M32 14 L46 20 L46 32 C46 42 40 50 32 52 C24 50 18 42 18 32 L18 20 Z" fill={f} />,
  star: (f) => <path d="M32 14 L36 26 L46 26 L38 33 L41 43 L32 37 L23 43 L26 33 L18 26 L28 26 Z" fill={f} />,
  gem: (f) => <path d="M32 16 L42 24 L38 44 L26 44 L22 24 Z" fill={f} />,
  trophy: (f) => (
    <path
      d="M22 18 L42 18 L42 26 C42 32 38 36 32 36 C26 36 22 32 22 26 Z M27 36 L37 36 L37 44 L41 44 L41 48 L23 48 L23 44 L27 44 Z"
      fill={f}
    />
  ),
  crown: (f) => <path d="M16 24 L22 36 L32 18 L42 36 L48 24 L46 46 L18 46 Z" fill={f} />,
  lightning: (f) => <path d="M36 16 L20 32 L32 32 L26 50 L46 28 L34 28 Z" fill={f} />,
  sun: (f) => <path d="M32 14 L37 26 L48 30 L37 34 L32 46 L27 34 L16 30 L27 26 Z" fill={f} />,
};

/** Lock SVG used as overlay on L9, L10 tiles. */
export function LockOverlay({ size = 24 }: { size?: number }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
        zIndex: 2,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="6" y="11" width="12" height="9" rx="1" fill="rgba(255,255,255,0.4)" />
        <path d="M9 11 V8 a3 3 0 0 1 6 0 V11" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" />
      </svg>
    </div>
  );
}
