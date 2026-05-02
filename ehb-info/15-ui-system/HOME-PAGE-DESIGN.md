# EHB Home Page — Canonical Design Spec (LOCKED)

> **Status:** LOCKED v1.0 · 2026-05-02
> **Owner:** Founder + Design + Frontend
> **Implementation:** `apps/web/app/page.tsx`
> **Demo reference:** Cowork session 2026-05-02 (premium dark + MS Store layout)

---

## 🔒 Lock Statement

The EHB home page **structure** (sections + order + row pattern) and **theme** (premium dark + iOS Classic / Diamond plastic coating) is **LOCKED**. Future changes to:
- Section count or order
- Card patterns or anatomy
- Color tokens or gradients
- Theme switcher behavior

…must update **this file** + `STL-LADDER-COMPONENT.md` + `SECTION-CATALOG.md` + `apps/web/lib/dmo/theme.ts` simultaneously. See `UIUX-AUTO-SAVE-PROTOCOL.md`.

---

## 🎨 Design Decisions (locked)

| # | Decision | Choice | Why |
|---|----------|--------|-----|
| 1 | Layout pattern | **Microsoft Store** — horizontal scrolling rows | Familiar · scannable · scales to 20+ sections |
| 2 | Theme | **Premium dark** — `#0C0E1A` base + `#13162A` cards | Founder-feel · iOS Classic + Diamond compatible |
| 3 | Card surface | **Plastic coating** — gloss + shimmer + depth shadow | Per existing `plasticCoatTokens` (theme.ts) |
| 4 | Theme switcher | **iOS Classic / Diamond** + **iPhone / PC Desktop** pills | Top-bar pill toggle group |
| 5 | Accent | **Binance gold** `#F0B90B` + **EHB tri-color** (red/blue/green) | Premium + recognizable |
| 6 | STL ladder | **10 horizontal tiles** with per-level gradient + lock overlay (L9/L10) | One source of trust visual |
| 7 | Companies | **Initials-square** tiles with country selector (PK/AE/SA/TR/MY...) | Social proof + global feel |
| 8 | Section count | **20 rows** including hero + final CTA | Growth + retention + loyalty optimized |

---

## 🏗 Section Catalog (top → bottom)

Full list maintained in `SECTION-CATALOG.md`. Summary:

| # | Section | Type | Component | Data source |
|---|---------|------|-----------|-------------|
| 1 | Top nav with theme/layout switcher | Sticky bar | `TopNavWithThemeSwitch` | static |
| 2 | Hero (gauge + 2 side cards) | Premium card | `HomeHero` | `home-sections.ts` |
| 3 | EHB STL Trust Ladder (10 tiles) | Horizontal scroll | `StlLadderRow` | `stl-levels.ts` |
| 4 | Top {country} companies | Horizontal scroll | `CompaniesRow` | `companies-by-stl.ts` |
| 5 | EHB Dev AI for you (5 modules) | Horizontal scroll | `AiServicesRow` | `ai-modules.ts` |
| 6 | Featured industries | 2×4 grid | `FeaturedIndustriesGrid` | `industries.ts` |
| 7 | Earn with EHB (6 paths) | Horizontal scroll | `EarnPathsRow` | `earn-paths.ts` |
| 8 | Trust-verified deals | Horizontal scroll | `DealsRow` | `home-deals.ts` |
| 9 | Browse by category (6 mega) | 3×2 grid | `CategoryGrid` | `categories.ts` |
| 10 | Become a franchisee (5-tier) | Horizontal scroll | `FranchiseSeatsRow` | `franchise-tiers.ts` |
| 11 | Verified pros near you | Horizontal scroll | `NearbyProsRow` | API: nearby-by-location |
| 12 | JPS jobs hiring now | 2×N grid | `JobsRow` | API: open-jobs |
| 13 | EHB Tube — featured videos | Horizontal scroll | `TubeRow` | API: featured-videos |
| 14 | 17 country expansion | Horizontal scroll | `CountryRow` | `countries.ts` |
| 15 | New on EHB this week | Horizontal scroll | `NewSellersRow` | API: new-sellers |
| 16 | Build your EHB STL (3 paths) | 3-col grid | `BoostStlRow` | `stl-boost.ts` |
| 17 | Refer & earn banner | Premium banner | `ReferBanner` | static |
| 18 | Founder's pick | 2-col list | `FoundersPickRow` | `founder-picks.ts` |
| 19 | Collections (4 themed) | 2×2 grid | `CollectionsGrid` | `collections.ts` |
| 20 | Final CTA | Premium banner | `FinalCta` | static |
| L1 | (legacy preserved) Affiliate quick actions | 8-button grid | existing `AffiliateCard` block | inline |
| L2 | (legacy preserved) What is EHB / SYSTEMS | 2-col + cards | `SystemsBlock` | inline |
| L3 | (legacy preserved) 8-step flow | 4-col grid | `FlowGrid` | inline |
| L4 | (legacy preserved) Audiences | 3-col grid | `AudiencesGrid` | inline |
| L5 | (legacy preserved) FAQ | accordion | `FaqAccordion` | inline |

---

## 🎨 Color Tokens

### Background layers
```ts
bg.home        = '#0C0E1A'  // deepest base
bg.surface     = '#13162A'  // card base
bg.elevated    = '#1A1D33'  // elevated surface
border.subtle  = 'rgba(255,255,255,0.06)'
border.accent  = 'rgba(255,255,255,0.15)'
border.gold    = 'rgba(240,185,11,0.3)'
```

### Text
```ts
text.primary   = '#E8EAF4'
text.secondary = '#8E92A8'
text.tertiary  = '#5C6080'
text.gold      = '#F0B90B'
```

### STL level gradients (155deg)
```
L1  FREE      #5C6072 → #2C2E3A   (gray)
L2  BASIC     #4A7FBC → #1E3A5F   (blue)
L3  NORMAL    #4DAB7E → #1F5A3E   (green)
L4  STANDARD  #4DA8B5 → #1E5862   (teal)
L5  ADVANCED  #6F62D6 → #3B2F8A   (purple)
L6  HIGH      #8B4DC4 → #4F1F7A   (violet)
L7  PRO       #C44D8B → #7A1F50   (magenta)
L8  VIP       #F0B90B → #7A5A04   (gold) ← current user
L9  ELITE     #8B6B3F → #3F2D14   (bronze, locked)
L10 SUPREME   #5F4D7A → #2F1F4A   (dark purple, locked)
```

### Accents
```
binance.gold      = #F0B90B (primary CTA · current level)
binance.gold.dark = #BA7517
ehb.red           = #A32D2D (Education / Health hero)
ehb.blue          = #185FA5 (Premium · authority)
ehb.green         = #1D9E75 (Live · success)
```

### Plastic coating (per card)
```css
position: relative;
overflow: hidden;
&::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; height: 35%;
  background: linear-gradient(180deg, rgba(255,255,255,0.18), transparent);
  pointer-events: none;
}
box-shadow:
  0 4px 14px rgba(0,0,0,0.4),
  inset 0 1px 0 rgba(255,255,255,0.15);
```

---

## 📐 Card Patterns

### STL level tile (116px × auto)
- Background: per-level gradient (155deg)
- Top gloss highlight (35% height white→transparent)
- Box shadow: depth + color glow
- Content: L# label · NAME · pts range · EHBGC lock · responsibility %
- L8 VIP: ★ YOU badge + extra glow + 1px white border
- L9/L10: dark gradient + lock overlay (rgba(0,0,0,0.5) + backdrop-blur 2px) + lock SVG

### App tile (110px × ~140px)
- Background: `#13162A` + 1px border `rgba(255,255,255,0.06)`
- Top gloss line (1px linear-gradient)
- Icon square 48×48 with per-tier color gradient + gloss
- Name 11px/500 + category 10px/secondary + STL pill

### Feature card (large — AI modules, deals, hero side)
- Background: per-feature gradient (135deg)
- Top 30% gloss
- Box shadow color-matched to gradient
- Pill-style chip for category + main title + description

### Section header
```
[Title ›]                                    [‹] [›]
[Subtitle - 1 line, 11px, #8E92A8]
```

### Country/level chips (top-right of section)
- Active: `linear-gradient(135deg, #F0B90B, #BA7517)` text `#412402`
- Inactive: `rgba(255,255,255,0.04)` text `#8E92A8`

---

## 📱 Responsive

| Breakpoint | Behavior |
|------------|----------|
| Desktop ≥1024px | All rows full width, scroll arrows visible |
| Tablet 768–1023px | Same rows, smaller tile width (96 → 80px) |
| Mobile <768px | Hero stacks (gauge + side cards vertically), STL ladder still horizontal-scroll, sticky bottom CTA |

---

## 🔁 Theme Switcher Behavior

Top-bar dual-pill toggle:
- Pill 1: **iOS Classic** | Diamond
- Pill 2: iPhone | **PC Desktop** (default)

Switching theme:
- Recomputes via `DmoThemeProvider` (existing)
- Plastic coating + level gradients adapt (already locked in `theme.ts`)
- Layout switch toggles density: PC = full grid, iPhone = single-col stack

---

## ✅ Acceptance Checklist

- [ ] Top bar with EHB logo + 5 nav items + theme/layout pills + RM avatar
- [ ] Hero with conic-gradient gauge (97/100) + 2 side cards (Premium L4 + Franchise gold)
- [ ] 10-tile STL ladder with per-level gradient + L8 ★ YOU + L9/L10 lock overlay
- [ ] Country selector chips (PK active default, UAE/KSA/...)
- [ ] 20 sections in correct order
- [ ] All preserved legacy sections still render (affiliate, FAQ, audiences, flow, systems)
- [ ] Plastic coating gloss visible on every card (top 35% gradient)
- [ ] Box shadows color-matched to gradient
- [ ] Lock overlays with backdrop-blur on L9/L10
- [ ] Refer & earn premium banner with gold radial glow
- [ ] Final CTA with tri-color gradient
- [ ] Mobile responsive (sticky bottom CTA)
- [ ] Both themes (iOS Classic + Diamond) work via existing provider
- [ ] Existing affiliate page still routable from /affiliate links

---

## Linked
- `STL-LADDER-COMPONENT.md` — 10-level component spec
- `SECTION-CATALOG.md` — every row's data structure
- `COMPANIES-BY-STL.md` — country × STL company data
- `UIUX-AUTO-SAVE-PROTOCOL.md` — change-management rule
- `UIUX-DESIGN-SYSTEM.md` — global design tokens
- `apps/web/lib/dmo/theme.ts` — runtime tokens
- `apps/web/app/page.tsx` — implementation
- `apps/web/components/home/` — row components
- `apps/web/lib/data/home-sections.ts` — section data
