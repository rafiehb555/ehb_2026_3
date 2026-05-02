# EHB STL Ladder — Component Spec

> **Status:** LOCKED v1.0 · 2026-05-02
> **Implementation:** `apps/web/components/home/StlLadderRow.tsx`
> **Data:** `apps/web/lib/data/stl-levels.ts`

---

## 🎯 Purpose

Show all 10 EHB STL levels (L1 → L10) as a horizontal-scrolling row of premium plastic-coated tiles. Highlight user's current level. Lock L9/L10 with overlay.

---

## 📊 10-Level Data Spec

| L# | Name | Pts range | Lock (EHBGC) | Resp % | Gradient (155deg) | Icon | Roles |
|----|------|-----------|-------------:|-------:|-------------------|------|-------|
| L1 | FREE | 0–20 | 0 | 10% | `#5C6072 → #2C2E3A` | dot | browser |
| L2 | BASIC | 21–40 | 50 | 20% | `#4A7FBC → #1E3A5F` | leaf | rider, micro |
| L3 | NORMAL | 41–60 | 100 | 40% | `#4DAB7E → #1F5A3E` | check | seller, lawyer |
| L4 | STANDARD | 61–75 | 250 | 55% | `#4DA8B5 → #1E5862` | shield | doctor, AI inspector |
| L5 | ADVANCED | 76–85 | 500 | 70% | `#6F62D6 → #3B2F8A` | star | sub franchise |
| L6 | HIGH | 86–92 | 1,000 | 80% | `#8B4DC4 → #4F1F7A` | gem | CRB inspector |
| L7 | PRO | 93–96 | 2,500 | 90% | `#C44D8B → #7A1F50` | trophy | wholesale, master |
| L8 | VIP | 97–98 | 5,000 | 95% | `#F0B90B → #7A5A04` | crown | DMO officer |
| L9 | ELITE | 99 | 10,000 | 98% | `#8B6B3F → #3F2D14` | lightning | corporate franchise |
| L10 | SUPREME | 100 | 25,000+ | 100% | `#5F4D7A → #2F1F4A` | sun | country, founder |

> **Source of truth:** `services/api/src/services/stlService.js` (58 gold-master tests). Any change here requires regenerating tests.

---

## 🧱 Tile Anatomy

```
┌──────────────────────┐  ← per-level gradient (155deg)
│  ▒▒▒▒▒ gloss top ▒▒▒│  ← 35% white→transparent overlay
│         L#           │  ← 9px label, color: lighter ramp
│        ICON          │  ← 22-46px SVG centered
│        NAME          │  ← 13px/500 letter-spaced 1px
│      pts range       │  ← 9px subtitle
│      X EHBGC         │  ← 9px lock requirement
│        XX%           │  ← 11px responsibility (bottom)
└──────────────────────┘
   box-shadow: 0 4px 14px rgba(<level>,0.3), inset 0 1px 0 rgba(255,255,255,0.18)
```

### L8 VIP variant (current user)
- Add ★ YOU badge top-right (rgba(0,0,0,0.4) bg + #F0B90B text)
- Border: 1px rgba(255,255,255,0.25)
- Stronger glow: `0 4px 18px rgba(240,185,11,0.5)`

### L9/L10 lock variant
- Background: dark bronze/purple (locked palette)
- Overlay: `rgba(0,0,0,0.5)` + `backdrop-filter: blur(2px)`
- Lock SVG centered (24×24, white 0.4 opacity)
- z-index ensures overlay above content

---

## 🔁 Interactions

- **Click tile** → opens drawer with full level info: requirements, top companies at this level, exam links, EHBGC stake CTA
- **Hover** (desktop) → tile lifts +2px, glow intensifies
- **Long-press / tap** (mobile) → same as click
- **L9/L10 lock click** → modal: "Reach L9 by [requirements]" + boost path

---

## 📦 Component API (TypeScript)

```ts
interface StlLevel {
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  name: string;           // "FREE", "BASIC", ...
  ptsRange: [number, number];
  lockEhbgc: number;
  responsibilityPct: number;
  gradient: { from: string; to: string };
  icon: 'dot' | 'leaf' | 'check' | 'shield' | 'star' | 'gem' | 'trophy' | 'crown' | 'lightning' | 'sun';
  roles: string[];
  locked: boolean;        // true for L9, L10 (until user reaches)
}

interface StlLadderRowProps {
  currentLevel: number;   // user's current STL (1-10)
  country: 'PK' | 'AE' | 'SA' | 'TR' | 'MY' | string;
  onTileClick?: (level: number) => void;
  showCountrySwitch?: boolean;  // default true
}
```

---

## 🧠 Boost Path (3-tile companion section)

After ladder, show "Build your EHB STL" with 3 tiles:

| Path | Boost | Difficulty | Cost | Note |
|------|------:|-----------|------|------|
| Pass CRB exam | CRB +1 | 15-min · 70% pass | Free | per-industry exam |
| Lock 250 EHBGC | PSS +1 | instant | ~$10 | earns 12% APY |
| 30 days clean DMO | DMO +1 | 30 days | none | zero complaints required |

Each tile shows current state + path to next L (e.g., L4 → L5).

---

## ✅ Acceptance Tests

- [ ] All 10 tiles render with correct gradient
- [ ] Current user's level shows ★ YOU badge
- [ ] L9 and L10 show lock overlay until user reaches them
- [ ] Click tile opens drawer with level details
- [ ] Country switch refetches `companies-by-stl.ts` data
- [ ] Horizontal scroll works on mobile (min 5 visible)
- [ ] Boost path tiles show below ladder (when collapsed view)
- [ ] Theme switcher (iOS Classic / Diamond) re-styles tiles via tokens
- [ ] Plastic gloss visible on every tile

---

## Linked
- `HOME-PAGE-DESIGN.md` — parent design
- `COMPANIES-BY-STL.md` — companies at each level
- `apps/web/lib/dmo/theme.ts` `stlLevelGradients`
- `services/api/src/services/stlService.js` — formula source
- `ehb-info/3-departments/STL.md` — STL canonical doc
