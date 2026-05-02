import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Legacy dark glass (non-DMO pages)
        bg: '#0C0E1A',
        card: '#13162A',
        nested: '#1A1D33',
        // EHB brand
        purple: { DEFAULT: '#7B6EF6', light: '#A098F8' },
        teal: '#2BBFA0',
        amber: '#F0A030',
        ok: '#38C878',
        fail: '#F05858',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        input: '8px',
        chip: '6px',
      },
      borderColor: {
        glass: 'rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
