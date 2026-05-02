# EHB · UI Consistency Rules

> **Status:** Canonical v1.0 · 2026-04-30
> **Purpose:** Ensure every page looks/feels like ONE EHB, not 50 different apps.

## Hard rules

```
✅ Same button style everywhere
✅ Same STL bar design
✅ Same rating format
✅ Same color palette
✅ Same typography
✅ Same spacing rhythm
✅ Same animations / transitions
✅ Same error states
✅ Same loading states
```

```
❌ Each industry has its own visual language
❌ Each page reinvents components
❌ Each developer picks their own colors
```

## Color palette (locked)

```
Primary:     #7B6EF6  Purple
Secondary:   #2BBFA0  Teal
Accent:      #F0A030  Amber
Bg:          #0C0E1A  Dark
Card:        #13162A  Card bg
Nested:      #1A1D33  Nested bg
Glass:       rgba(255,255,255,0.06)  Border
Text-primary: #fff
Text-muted:  #aaa · #888 · #666
Success:     #2BBFA0 / #5FE2B6
Warning:     #F0A030 / #FFC266
Danger:      #ff6b6b / #ff9e9e
Info:        #06b6d4 / #22d3ee
```

## Typography

- Primary font: **DM Sans**
- Sizes:
  - h1 → 22-32px (depending on context)
  - h2 → 16-20px
  - h3 → 13-15px
  - body → 11-14px
  - small → 9-10px
- Weights: 400 (regular) · 700 (bold) · 900 (display only)
- Line height: 1.5 (body) · 1.2 (headings)

## Layout rhythm

- Border radius: 12px (cards) · 8px (inputs) · 5-6px (chips)
- Padding inside cards: 16-20px
- Gap between sections: 24px (sm) · 32px (md) · 48px (lg)
- Container max-width: 1200px (desktop) · 100% (mobile)

## Spacing scale

```
2px  4px  8px  12px  16px  20px  24px  32px  48px  64px
```

Use these only. No custom values.

## Buttons

- **3D Button** for primary CTAs (Button3D component)
- Outline buttons for secondary
- Text buttons for tertiary
- Min touch target: 44px
- Always include hover + active states

## STL display rules

- ALWAYS show level number (L1-L10)
- ALWAYS show tier name (FREE/BASIC/.../SUPREME)
- Use canonical color per tier
- Use canonical badge symbol (per `8-trust-system/BADGES.md` §STL tier badges)
- Trust-weighted star averages (not raw)

## Rating format

- Show stars + numeric (e.g., "★★★★☆ 4.6")
- Always include reviewer count
- Always include reviewer-STL weight indicator
- Use trust-weighted average, label it

## Loading states

- Skeleton loaders for content (not spinners)
- Spinner only for actions (button click → loading)
- Optimistic UI for fast actions (immediate feedback)

## Error states

- Friendly tone (not technical)
- Action button to recover
- Specific error message (not "Something went wrong")
- Log error for ops (silent in UI)

## Empty states

- Explain what should be there
- CTA to populate
- Friendly illustration / icon
- Localized text

## Accessibility (per WCAG 2.1 AA)

- Color contrast 4.5:1 minimum
- Keyboard navigable
- Screen reader friendly (aria-labels)
- Focus indicators visible
- No flashing animations (epilepsy)
- Touch targets ≥ 44px

## Responsive

- Mobile-first (380px → 1440px)
- Bottom nav on mobile
- Sidebar collapses on tablet
- Multi-column on desktop
- Test on actual devices

## Animation

- Transitions: 200-300ms ease-out
- No flashy animations
- Reduce motion support
- Plastic 3D effect on cards (canonical EHB look)

## Internationalization

- All strings via i18n keys
- RTL support (for Arabic + Urdu)
- Number formatting per locale
- Currency formatting per locale
- Date/time formatting per locale

## Do's and Don'ts

| ✅ Do | ❌ Don't |
|---|---|
| Use existing components | Build custom one-offs |
| Stick to color palette | Pick random colors |
| Use canonical spacing | Custom margins |
| Reuse layouts | Reinvent each page |
| Test on mobile | Desktop-only design |
| Bilingual (UR/EN) | English-only |
| Plastic 3D cards | Flat ugly cards |

## Cross-references

- Components: `COMPONENT-LIBRARY.md`
- Settings: `PAGE-SETTINGS.md`
- Brand guidelines: `5-specs/BRAND-GUIDELINES.md` (TODO)
- Build blueprint: `5-specs/EHB-BUILD-BLUEPRINT.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial UI consistency rules |
