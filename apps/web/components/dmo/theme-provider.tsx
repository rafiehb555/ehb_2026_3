'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getTheme, type ThemeId, type ThemeTokens } from '@/lib/dmo/theme';

interface Ctx {
  themeId: ThemeId;
  theme: ThemeTokens;
  setThemeId: (id: ThemeId) => void;
}

const C = createContext<Ctx | null>(null);

export function DmoThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>('diamond');
  const theme = useMemo(() => getTheme(themeId), [themeId]);

  // Propagate data-theme to <html> so global CSS overrides apply everywhere —
  // this is what makes iOS Classic / Diamond actually switch colors.
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', themeId);
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.documentElement.removeAttribute('data-theme');
      }
    };
  }, [themeId]);

  return (
    <C.Provider value={{ themeId, theme, setThemeId }}>
      <div data-theme={themeId} className="min-h-screen transition-colors duration-300">
        {children}
      </div>
    </C.Provider>
  );
}

export function useDmoTheme() {
  const ctx = useContext(C);
  if (!ctx) throw new Error('useDmoTheme must be used inside DmoThemeProvider');
  return ctx;
}
