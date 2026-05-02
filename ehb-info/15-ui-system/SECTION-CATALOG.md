# EHB Home Page — Section Catalog

> **Status:** LOCKED v1.0 · 2026-05-02
> **Parent:** `HOME-PAGE-DESIGN.md`

20 primary rows + 5 legacy preserved sections. Each row follows MS Store pattern (title + subtitle + nav arrows + horizontal scroll OR grid).

---

## Row pattern (template)

```
┌──────────────────────────────────────────────────────┐
│ [Title]  ›                     [country chips] [‹] [›]│
│ [Subtitle one line]                                   │
├──────────────────────────────────────────────────────┤
│ [tile][tile][tile][tile][tile]  → scroll →            │
└──────────────────────────────────────────────────────┘
```

---

## 1. Top Nav with Theme Switcher

- **Type:** Sticky bar (top)
- **Components:** EHB logo · 5 nav items (Home/Industries/AI/Franchise/Wallet) · iOS Classic/Diamond toggle · iPhone/PC Desktop toggle · RM avatar
- **Data:** static
- **Auth:** logged-in shows avatar, logged-out shows Login button

## 2. Hero — gauge + 2 side cards

- **Type:** 2-column premium card
- **Left:** EHB STL conic gauge (97/100) + Muhammad Rafi name + L8 VIP gold pill + EHBGC locked + Responsibility %
- **Right top:** Premium "Build EHB STL L4" (dark blue glass)
- **Right bottom:** Franchise "Sub L8 from $5K" (gold gloss)
- **Data:** session user + static promo cards

## 3. EHB STL Trust Ladder

- **Type:** Horizontal scroll (10 tiles)
- **Tiles:** L1 → L10 with per-level gradient + L8 ★ YOU + L9/L10 lock overlay
- **Country chips:** PK (active) · UAE · KSA
- **Data:** `stl-levels.ts`
- **Component:** `StlLadderRow`

## 4. Top {country} companies

- **Type:** Horizontal scroll (10 tiles)
- **Tiles:** Initials-square + name + sector + STL chip
- **Data:** `companies-by-stl.ts` filtered by country
- **Component:** `CompaniesRow`

## 5. EHB Dev AI for you

- **Type:** Horizontal scroll (5 large feature cards)
- **Modules:** MATCH (Industry/Service Matcher) · DETECT (Fraud/Plagiarism) · GENERATE (Listing/Cover Art) · ANALYZE (Daily Brief) · ANSWER (STL Coach)
- **Data:** `ai-modules.ts`
- **Component:** `AiServicesRow`

## 6. Featured industries

- **Type:** 4-column grid (2 rows)
- **Cards:** 8 industries with custom SVG illustrations
- **Industries:** WMS, OLS, GSM, HPS, LDS, FIN, AI, Franchise (8 featured)
- **Data:** `industries-featured.ts`
- **Component:** `FeaturedIndustriesGrid`

## 7. Earn with EHB

- **Type:** Horizontal scroll (6 small tiles)
- **Paths:** Sell GoSellr · Refer & earn · Stake EHBGC · Run franchise · JPS jobs · Rider deliver
- **Data:** `earn-paths.ts`
- **Component:** `EarnPathsRow`

## 8. Trust-verified deals

- **Type:** Horizontal scroll
- **Tiles:** Discount % · service name · price · STL verification chip
- **Data:** API `/deals/featured`
- **Component:** `DealsRow`

## 9. Browse by category

- **Type:** 3-column grid (2 rows)
- **Categories:** Health · Education · Business · Legal & Finance · Lifestyle · Media & Tech (6 mega)
- **Data:** `categories.ts`
- **Component:** `CategoryGrid`

## 10. Become a franchisee

- **Type:** Horizontal scroll (5 tiles)
- **Tiers:** Country · Master · Corporate · Sub · Micro
- **Data:** `franchise-tiers.ts` (price, seats open, commission %)
- **Component:** `FranchiseSeatsRow`

## 11. Verified pros near you

- **Type:** Horizontal scroll
- **Tiles:** Initials + name + sector + rating + STL chip
- **Data:** API `/pros/nearby?lat=&lng=` (geo-located)
- **Component:** `NearbyProsRow`

## 12. JPS — jobs hiring now

- **Type:** 2-column grid
- **Cards:** Job title · salary · employer · STL · location
- **Data:** API `/jobs/featured`
- **Component:** `JobsRow`

## 13. EHB Tube — featured videos

- **Type:** Horizontal scroll
- **Tiles:** Thumbnail with play button · title · creator · views · duration
- **Data:** API `/tube/featured`
- **Component:** `TubeRow`

## 14. 17 country expansion

- **Type:** Horizontal scroll
- **Tiles:** Country code square + name + status chip (Live/Q3/2027/2028)
- **Data:** `countries.ts`
- **Component:** `CountryRow`

## 15. New on EHB this week

- **Type:** Horizontal scroll
- **Tiles:** Initials + name + sector + "New L#" chip
- **Data:** API `/sellers/new?since=7d`
- **Component:** `NewSellersRow`

## 16. Build your EHB STL

- **Type:** 3-column grid
- **Tiles:** Pass CRB exam (CRB+1) · Lock 250 EHBGC (PSS+1) · 30 days clean (DMO+1)
- **Data:** `stl-boost.ts`
- **Component:** `BoostStlRow`

## 17. Refer & earn banner

- **Type:** Premium full-width banner
- **Content:** "5% / 2% / 1% on 3 levels · Top earner: PKR 240K/mo" + CTA
- **Data:** static + (optional) live top-earner API
- **Component:** `ReferBanner`

## 18. Founder's pick

- **Type:** 2-column list
- **Items:** What Rafi recommends this week
- **Data:** `founder-picks.ts` (admin-curated)
- **Component:** `FoundersPickRow`

## 19. Collections

- **Type:** 2×2 grid
- **Bundles:** Family Health · Start a Business · Expat Kit · Fresher Pack
- **Data:** `collections.ts`
- **Component:** `CollectionsGrid`

## 20. Final CTA

- **Type:** Premium banner
- **Content:** "37 industries. 17 countries. 1 trust." + Get Started CTA
- **Data:** static
- **Component:** `FinalCta`

---

## Legacy preserved sections (insert between Row 19 and Row 20)

| L# | Section | Source | Lines (current page.tsx) |
|----|---------|--------|--------------------------|
| L1 | Affiliate quick action strip (8 buttons) | inline | 173–328 |
| L2 | What is EHB + SYSTEMS (PSS/CRB/DMO/STL) | inline | 331–391 |
| L3 | 8-step flow grid | inline | 394–443 |
| L4 | Audiences (6-role) | inline | 446–472 |
| L5 | FAQ accordion (8 Q&A) | inline | 514–535 |

These sections contain founder-curated copy and remain in the new home page **after** the new MS Store rows. They're considered LEGACY-LOCKED — preserved as-is.

---

## 📊 Section Render Order (final)

```
1.  Top Nav (sticky)
2.  Hero
3.  STL Trust Ladder
4.  Top {country} companies
5.  EHB Dev AI
6.  Featured industries
7.  Earn with EHB
8.  Trust-verified deals
9.  Browse by category
10. Become a franchisee
11. Verified pros near you
12. JPS jobs
13. EHB Tube
14. 17 country expansion
15. New on EHB
16. Build your EHB STL
17. Refer & earn banner

— LEGACY BLOCK —
L1. Affiliate quick action strip
L2. What is EHB + SYSTEMS
L3. 8-step flow
L4. Audiences
L5. FAQ

18. Founder's pick
19. Collections
20. Final CTA
```

---

## 🔁 Update Rule

When adding/removing/reordering sections:
1. Update this file (section number + position)
2. Update `HOME-PAGE-DESIGN.md` (lock statement + acceptance checklist)
3. Update `apps/web/app/page.tsx` (component order)
4. Update `apps/web/lib/data/home-sections.ts` (config array)
5. Run smoke test `pnpm --filter web build`

See `UIUX-AUTO-SAVE-PROTOCOL.md` for full change-management.
