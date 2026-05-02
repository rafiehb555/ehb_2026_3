# EHB UI/UX Design System

> **Status:** v1.0 · 2026-04-30
> **Source:** `apps/web/lib/dmo/theme.ts` (machine source) + this doc (human source)
> **Used by:** Designers + frontend devs.

---

## 🎨 Color Palette

### Brand Colors
| Token | Hex | Use |
|-------|-----|-----|
| `primary` | `#7B6EF6` | Main brand purple — CTAs, primary buttons, links |
| `primary-dark` | `#5C4DD0` | Hover state for primary |
| `primary-light` | `#A098F8` | Soft accent, focus rings |
| `teal` | `#2BBFA0` | Success, growth, trust positive |
| `amber` | `#F0A030` | Warning, attention, caution |
| `red` | `#F05858` | Error, destructive, fraud alert |
| `green` | `#38C878` | Confirmed, success states |

### Neutrals
| Token | Hex | Use |
|-------|-----|-----|
| `bg-base` | `#0C0E1A` | Main app background (dark) |
| `bg-card` | `#13162A` | Card surface |
| `bg-nested` | `#1A1D33` | Nested cards inside cards |
| `bg-elevated` | `#222644` | Hover state |
| `text-primary` | `#F4F5FA` | Main text |
| `text-secondary` | `#A0A4BC` | Secondary text |
| `text-muted` | `#6B7088` | Tertiary, hints |
| `border` | `#2D3147` | Default borders |
| `border-subtle` | `#1F2238` | Faint borders |

### Semantic States
| Token | Hex | Used When |
|-------|-----|-----------|
| `success` | `#38C878` | Confirm action, positive event |
| `warning` | `#F0A030` | Pending action, low risk |
| `danger` | `#F05858` | Error, slash, fraud |
| `info` | `#7B6EF6` | Informational |

### STL Level Gradients (L1-L10)
| Level | Name | Gradient |
|-------|------|----------|
| L1 | FREE | `#64748b → #475569` (slate) |
| L2 | BASIC | `#94a3b8 → #64748b` |
| L3 | NORMAL | `#3b82f6 → #2563eb` (blue) |
| L4 | STANDARD | `#10b981 → #059669` (emerald) |
| L5 | ADVANCED | `#06b6d4 → #0891b2` (cyan) |
| L6 | HIGH | `#8b5cf6 → #7c3aed` (violet) |
| L7 | PRO | `#a855f7 → #9333ea` (purple) |
| L8 | VIP | `#f59e0b → #d97706` (amber) |
| L9 | ELITE | `#ef4444 → #dc2626` (red) |
| L10 | SUPREME | `#fbbf24 → #f59e0b → #ef4444` (gold-fire) |

---

## ✍️ Typography

### Fonts
- **Default (Latin):** DM Sans
- **iOS:** SF Pro Display
- **Arabic:** Cairo
- **Urdu:** Noto Nastaliq

### Type Scale
| Token | Size | Weight | Use |
|-------|-----:|-------:|-----|
| `display` | 72px | 700 | Hero headlines |
| `h1` | 48px | 700 | Page titles |
| `h2` | 36px | 600 | Section headers |
| `h3` | 24px | 600 | Card titles |
| `h4` | 20px | 500 | Sub-section |
| `body-lg` | 18px | 400 | Lead paragraphs |
| `body` | 16px | 400 | Default |
| `body-sm` | 14px | 400 | Secondary |
| `caption` | 12px | 400 | Labels, hints |

### Line Height
- Tight (display): 1.1
- Standard (body): 1.5
- Spacious (long-form): 1.7

---

## 📐 Spacing Scale

8px base unit — multiples for everything.

| Token | px | Use |
|-------|---:|-----|
| `space-0` | 0 | Reset |
| `space-1` | 4 | Tight gaps (badges) |
| `space-2` | 8 | Icon-text gap |
| `space-3` | 12 | Small padding |
| `space-4` | 16 | Default padding |
| `space-5` | 24 | Card padding |
| `space-6` | 32 | Section gaps |
| `space-8` | 48 | Major sections |
| `space-10` | 64 | Page-level gaps |

---

## 🎭 Border Radius

| Token | px | Use |
|-------|---:|-----|
| `radius-pill` | 999 | Buttons, badges |
| `radius-card` | 12 | Default cards |
| `radius-input` | 8 | Form inputs |
| `radius-chip` | 5-6 | Chips, tags |
| `radius-image` | 8 | Image corners |

---

## 🌟 Shadows / Glass

### Plastic Coating (DMO Pages — iOS Classic theme)
3-layer effect on every card:
1. **Gloss layer:** `linear-gradient(180deg, rgba(255,255,255,0.08), transparent 50%)`
2. **Shimmer layer:** subtle moving highlight (CSS keyframe)
3. **Depth shadow:** `0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)`

### Default Dark Glass (Other pages)
- `box-shadow: 0 4px 16px rgba(0,0,0,0.3)`
- `backdrop-filter: blur(8px)` on overlays

### Hover lift
- `transform: translateY(-2px)` + intensified shadow

---

## 🧩 Component Anatomy

### Button (Primary)
```
Padding: 12px 24px
Border-radius: 999 (pill)
Background: var(--primary)
Text: var(--text-primary), 14px, 600
Hover: var(--primary-dark) + scale(1.02)
Disabled: opacity 0.5, no pointer
```

### Card (Default)
```
Padding: 24px
Border-radius: 12
Background: var(--bg-card)
Border: 1px solid var(--border)
Shadow: default-glass
```

### Input
```
Padding: 12px 16px
Border-radius: 8
Background: var(--bg-nested)
Border: 1px solid var(--border)
Focus: 2px solid var(--primary-light)
```

### Badge / Chip
```
Padding: 4px 10px
Border-radius: 5-6
Font: 12px, 500
Variants: default, primary, success, warning, danger
```

### STL Gauge (custom)
- SVG-based circular gauge
- Animated stroke draw on mount
- Gradient fill matching level
- Center label: level number + name
- Component: `apps/web/components/ui/stl-badge.tsx` + `circular-gauge.tsx`

### MultiRingGauge (4 concentric)
- Outer ring: STL
- Ring 2: PSS contribution
- Ring 3: CRB contribution
- Ring 4: DMO contribution
- Component: `apps/web/components/ui/MultiRingGauge.tsx`

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Behavior |
|------------|------:|----------|
| `sm` | 640px+ | Mobile-first base |
| `md` | 768px+ | Tablet (sidebar appears) |
| `lg` | 1024px+ | Desktop (full nav) |
| `xl` | 1280px+ | Wide desktop |
| `2xl` | 1536px+ | Ultra-wide |

### Mobile First Rules
- Default = mobile layout
- Single-column always on mobile
- Sidebar drawer (not pinned) below `md`
- Bottom nav on mobile (5 icons), top nav on desktop

---

## ♿ Accessibility (WCAG 2.1 AA)

- Color contrast: ≥ 4.5:1 for text, ≥ 3:1 for UI
- Focus indicators visible (2px primary-light ring)
- All interactive elements ≥ 44×44 px touch target
- Keyboard navigable (tab order logical)
- Screen reader: ARIA labels on icon-only buttons
- Reduced motion: respect `prefers-reduced-motion`

---

## 🌍 RTL (Right-to-Left)

Languages: Arabic, Urdu (some)
- Use CSS logical properties (`margin-inline-start` not `margin-left`)
- Mirror directional icons (chevrons, arrows)
- Layout: HTML `dir="rtl"` switch
- Testing: Cypress test with both LTR and RTL

---

## 🎬 Motion & Animation

### Standard transitions
- Hover: 150ms ease-out
- Page transition: 300ms ease-in-out
- Modal/drawer: 250ms cubic-bezier(.4,0,.2,1)

### Hero animations
- Stagger reveal: 50ms delay between elements
- STL gauge: 1.5s draw on mount
- Skeleton loaders: 1s pulse loop

### Loading states
- Spinner: brand purple, 24px
- Skeleton: `bg-elevated` pulsing
- Progress bar: gradient fill

---

## 🔊 Voice & Tone (UX Copy)

Per `ehb-info/14-growth/CONTENT-STRATEGY.md`:
- **Friendly + Professional**
- Bilingual default (Roman Urdu + English in PK)
- No jargon (STL is OK; over-explained on first occurrence)
- Action-oriented (verbs first)
- Empathetic on errors ("We couldn't find that. Try again?")

---

## 🎯 Page Templates (re-usable layouts)

### Marketing
- Hero · Features grid · Testimonials · CTA footer

### Dashboard (Cowork)
- Sidebar (240px) · Top bar · Main grid · Right rail (optional)

### Form
- Stepper (top) · Form fields · Help text · Submit footer

### Detail
- Hero header · Tab bar · Sections · CTA bar (sticky bottom on mobile)

### List
- Filter rail · Table/grid · Pagination · Empty state

---

## 📊 Implementation Status

| Element | Designed | Coded | Documented |
|---------|:--------:|:-----:|:----------:|
| Colors + tokens | ✅ | ✅ `theme.ts` | ✅ |
| Typography | ✅ | ✅ Tailwind | ✅ |
| Spacing | ✅ | ✅ Tailwind | ✅ |
| Buttons | ✅ | ✅ shadcn/ui | ✅ |
| Cards | ✅ | ✅ | ✅ |
| Inputs | ✅ | ✅ | ✅ |
| STL Gauge | ✅ | ✅ | ✅ |
| MultiRingGauge | ✅ | ✅ | ✅ |
| Sidebar | ✅ | ✅ | ✅ |
| Bottom nav (mobile) | ✅ | ✅ | ✅ |
| RTL support | 🟡 | 🟡 partial | ✅ |
| Reduced motion | 🟡 | ❌ | ✅ |
| Dark/Light theme switch | ✅ | ✅ | ✅ |

---

## 🎨 Brand Personality

EHB's visual personality:
1. **Trustworthy** — solid colors, clean lines, no gimmicks
2. **Modern** — gradients, motion, depth
3. **Premium** — quality typography, spacious layouts
4. **Inclusive** — multi-language, accessible, RTL-ready
5. **Confident** — bold, direct, decisive

What we AVOID:
- Cartoony illustrations
- Excessive emoji
- Cluttered layouts
- Stock photos
- Comic Sans :)

---

## 🔗 Linked
- Machine source: `apps/web/lib/dmo/theme.ts`
- Component code: `apps/web/components/ui/*`
- Page templates: `apps/web/app/*`
- `PAGES-LIST.md`
- `PAGE-DATA-MAP.md`
- `COMPONENT-LIBRARY.md`
- `14-growth/BRANDING.md`
