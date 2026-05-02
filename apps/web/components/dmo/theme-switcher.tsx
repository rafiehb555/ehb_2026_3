'use client';

import { useDmoTheme } from './theme-provider';

export function ThemeSwitcher() {
  const { themeId, setThemeId } = useDmoTheme();
  return (
    <div className="inline-flex rounded-card border border-glass bg-card/60 p-1 text-xs backdrop-blur-sm">
      <button
        onClick={() => setThemeId('iosClassic')}
        className={`rounded-chip px-3 py-1.5 font-semibold transition ${
          themeId === 'iosClassic'
            ? 'bg-gradient-to-r from-[#F8B830] to-[#D89020] text-white shadow'
            : 'text-white/60 hover:text-white'
        }`}
      >
        iOS Classic
      </button>
      <button
        onClick={() => setThemeId('diamond')}
        className={`rounded-chip px-3 py-1.5 font-semibold transition ${
          themeId === 'diamond'
            ? 'bg-gradient-to-r from-[#30d0ff] to-[#0080c8] text-white shadow'
            : 'text-white/60 hover:text-white'
        }`}
      >
        Diamond
      </button>
    </div>
  );
}
