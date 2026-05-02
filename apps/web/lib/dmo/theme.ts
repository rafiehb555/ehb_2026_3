/**
 * EHB DMO — iOS Classic + Diamond Dual Theme Tokens
 *
 * PROTECTED: The `ThemeTokens` type contract must not be changed without a
 * review of every consumer (DmoThemeProvider, ThemeCSSInjector, every card).
 *
 * Source: ehb-info/EHB-COMPLETE-PROJECT-MAP.md §5, apps/web/lib/dmo/theme.ts
 * spec in EHB-MASTER-INFO.md.
 */

export type ThemeId = 'iosClassic' | 'diamond';

export interface ThemeTokens {
  id: ThemeId;
  bg: string;
  card: string;
  nested: string;
  a1: string; // dark accent
  a2: string; // medium accent
  a3: string; // bright accent
  a4: string; // light accent
  text: string;
  textSecondary: string;
  textMuted: string;
  ok: string;
  wn: string; // warning
  fl: string; // fail
}

export const iosClassic: ThemeTokens = {
  id: 'iosClassic',
  bg: '#e8edf2',
  card: '#bdd0e0',
  nested: '#b5c8d8',
  a1: '#b8780a',
  a2: '#d89020',
  a3: '#f8b830',
  a4: '#ffe090',
  text: '#18283a',
  textSecondary: '#2a3c50',
  textMuted: '#4a5c70',
  ok: '#1a7020',
  wn: '#7a4a00',
  fl: '#7a1010',
};

export const diamond: ThemeTokens = {
  id: 'diamond',
  bg: '#04060e',
  card: '#081420',
  nested: '#060e1c',
  a1: '#0080c8',
  a2: '#00a8e8',
  a3: '#30d0ff',
  a4: '#b0f0ff',
  text: '#d8f4ff',
  textSecondary: '#a0d8f0',
  textMuted: '#5898b8',
  ok: '#00b050',
  wn: '#c89000',
  fl: '#e04040',
};

export const themes: Record<ThemeId, ThemeTokens> = {
  iosClassic,
  diamond,
};

/**
 * STL level → gradient map (L1 FREE → L10 SUPREME).
 * Used for level badges, rings, and plastic-coat accents.
 *
 * NOTE: `stlLevelGradients` (legacy palette) is retained for backwards-compat
 * with /dmo pages. NEW home page premium palette is in `homeStlLevelGradients`
 * below, locked per `ehb-info/15-ui-system/STL-LADDER-COMPONENT.md`.
 */
export const stlLevelGradients: Record<number, { from: string; to: string }> = {
  1: { from: '#64748b', to: '#475569' },
  2: { from: '#22c55e', to: '#16a34a' },
  3: { from: '#06b6d4', to: '#0891b2' },
  4: { from: '#3b82f6', to: '#2563eb' },
  5: { from: '#8b5cf6', to: '#7c3aed' },
  6: { from: '#f59e0b', to: '#d97706' },
  7: { from: '#ef4444', to: '#dc2626' },
  8: { from: '#ec4899', to: '#db2777' },
  9: { from: '#f97316', to: '#ea580c' },
  10: { from: '#fbbf24', to: '#f59e0b' },
};

/**
 * HOME PAGE PREMIUM PALETTE — Locked 2026-05-02
 * Spec: `ehb-info/15-ui-system/STL-LADDER-COMPONENT.md`
 * Each level: gradient + accent text + lock state.
 */
export interface HomeStlLevel {
  level: number;
  name: string;
  ptsRange: [number, number];
  lockEhbgc: number;
  responsibilityPct: number;
  from: string;
  to: string;
  accentLight: string;     // text-on-gradient highlight
  textOnTile: string;      // body text color on the gradient
  locked: boolean;         // L9, L10 (locked overlay until reached)
  iconKey: 'dot' | 'leaf' | 'check' | 'shield' | 'star' | 'gem' | 'trophy' | 'crown' | 'lightning' | 'sun';
}

export const homeStlLevels: HomeStlLevel[] = [
  { level: 1, name: 'FREE',     ptsRange: [0, 20],   lockEhbgc: 0,      responsibilityPct: 10,  from: '#5C6072', to: '#2C2E3A', accentLight: '#D3D1C7', textOnTile: '#FFFFFF', locked: false, iconKey: 'dot' },
  { level: 2, name: 'BASIC',    ptsRange: [21, 40],  lockEhbgc: 50,     responsibilityPct: 20,  from: '#4A7FBC', to: '#1E3A5F', accentLight: '#B5D4F4', textOnTile: '#FFFFFF', locked: false, iconKey: 'leaf' },
  { level: 3, name: 'NORMAL',   ptsRange: [41, 60],  lockEhbgc: 100,    responsibilityPct: 40,  from: '#4DAB7E', to: '#1F5A3E', accentLight: '#9FE1CB', textOnTile: '#FFFFFF', locked: false, iconKey: 'check' },
  { level: 4, name: 'STANDARD', ptsRange: [61, 75],  lockEhbgc: 250,    responsibilityPct: 55,  from: '#4DA8B5', to: '#1E5862', accentLight: '#A0DAE2', textOnTile: '#FFFFFF', locked: false, iconKey: 'shield' },
  { level: 5, name: 'ADVANCED', ptsRange: [76, 85],  lockEhbgc: 500,    responsibilityPct: 70,  from: '#6F62D6', to: '#3B2F8A', accentLight: '#CECBF6', textOnTile: '#FFFFFF', locked: false, iconKey: 'star' },
  { level: 6, name: 'HIGH',     ptsRange: [86, 92],  lockEhbgc: 1000,   responsibilityPct: 80,  from: '#8B4DC4', to: '#4F1F7A', accentLight: '#E5C8FF', textOnTile: '#FFFFFF', locked: false, iconKey: 'gem' },
  { level: 7, name: 'PRO',      ptsRange: [93, 96],  lockEhbgc: 2500,   responsibilityPct: 90,  from: '#C44D8B', to: '#7A1F50', accentLight: '#F4C0D1', textOnTile: '#FFFFFF', locked: false, iconKey: 'trophy' },
  { level: 8, name: 'VIP',      ptsRange: [97, 98],  lockEhbgc: 5000,   responsibilityPct: 95,  from: '#F0B90B', to: '#7A5A04', accentLight: '#FFE9A8', textOnTile: '#412402', locked: false, iconKey: 'crown' },
  { level: 9, name: 'ELITE',    ptsRange: [99, 99],  lockEhbgc: 10000,  responsibilityPct: 98,  from: '#8B6B3F', to: '#3F2D14', accentLight: '#F0997B', textOnTile: '#FFFFFF', locked: true,  iconKey: 'lightning' },
  { level: 10,name: 'SUPREME',  ptsRange: [100, 100],lockEhbgc: 25000,  responsibilityPct: 100, from: '#5F4D7A', to: '#2F1F4A', accentLight: '#CECBF6', textOnTile: '#FFFFFF', locked: true,  iconKey: 'sun' },
];

/** Premium dark home page surface tokens. */
export const homePremiumTokens = {
  bg:          '#0C0E1A',
  surface:     '#13162A',
  elevated:    '#1A1D33',
  borderSubtle:'rgba(255,255,255,0.06)',
  borderAccent:'rgba(255,255,255,0.15)',
  borderGold:  'rgba(240,185,11,0.30)',
  text:        '#E8EAF4',
  textSec:     '#8E92A8',
  textTri:     '#5C6080',
  gold:        '#F0B90B',
  goldDark:    '#BA7517',
  ehbRed:      '#A32D2D',
  ehbBlue:     '#185FA5',
  ehbGreen:    '#1D9E75',
  /** Top gloss highlight applied as ::before on every premium card. */
  glossTopGradient: 'linear-gradient(180deg, rgba(255,255,255,0.18), transparent)',
  /** Top 1px highlight line. */
  glossTopLine: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
} as const;

/** Plastic coating tokens — applied to every card in the DMO workspace. */
export const plasticCoatTokens = {
  gloss: 'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 48%)',
  shimmerDuration: '4.5s',
  depthShadow: {
    top: '0 1px 0 rgba(255,255,255,0.25) inset',
    bottom: '0 -1px 0 rgba(0,0,0,0.15) inset',
    spread: '0 8px 28px rgba(0,0,0,0.22)',
  },
};

/** 3D button elevation tokens. */
export const buttonTokens = {
  depthBarHeight: '5px',
  hoverLift: 'translateY(-2px)',
  activePress: 'translateY(5px)',
};

/** Returns the active theme object. Default: iosClassic. */
export function getTheme(id?: ThemeId): ThemeTokens {
  return themes[id ?? 'iosClassic'];
}
