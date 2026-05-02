# EHB · Master Pages List

> **Status:** Canonical v1.0 · 2026-04-30
> **Purpose:** Every public + authenticated page in EHB. Single source for navigation, sitemap, SEO.

## 🌐 Public Pages (no login)

| # | Page | URL | Purpose |
|---|---|---|---|
| 1 | Landing / Home | `/` | Brand vision · CTAs |
| 2 | About | `/about` | Mission · team |
| 3 | How It Works | `/how-it-works` | User flow explainer |
| 4 | Industries Grid | `/industries` | All 38 industries |
| 5 | Industry Detail | `/industries/<code>` | Per-industry pillar (38 pages) |
| 6 | STL Explainer | `/concepts/stl` | What is STL |
| 7 | Trust System | `/concepts/trust` | How EHB trust works |
| 8 | Pricing | `/pricing` | Tiers + commission |
| 9 | Franchise Info | `/franchise` | Apply for franchise |
| 10 | Sign Up | `/signup` | New user |
| 11 | Sign In | `/signin` | Returning user |
| 12 | Help / Support | `/help` | FAQ + AI bot |
| 13 | Glossary | `/concepts` | EHB terms |
| 14 | Blog | `/blog` | Articles |
| 15 | Contact | `/contact` | Reach EHB |
| 16 | Terms | `/terms` | ToS |
| 17 | Privacy | `/privacy` | Privacy policy |

## 👤 User-Authenticated Pages

| # | Page | URL | Visible to |
|---|---|---|---|
| 18 | My Dashboard | `/dashboard` | All logged-in (role-routed) |
| 19 | My STL | `/stl` | All |
| 20 | Profile | `/profile` | All |
| 21 | Wallet | `/wallet` | All |
| 22 | Notifications | `/notifications` | All |
| 23 | Settings | `/settings` | All |
| 24 | Cart | `/cart` | Buyers |
| 25 | Checkout | `/checkout` | Buyers |
| 26 | Orders | `/orders` | All |
| 27 | Order Detail | `/orders/<id>` | Order parties |
| 28 | Reviews | `/reviews` | All |

## 🛒 GoSellr / Marketplace Pages

| # | Page | URL |
|---|---|---|
| 29 | GoSellr Home | `/gosellr` |
| 30 | Product Detail | `/gosellr/<id>` |
| 31 | Search Results | `/gosellr/search` |
| 32 | Seller Profile | `/seller/<id>` |
| 33 | List Product | `/gosellr/list` |
| 34 | Seller Dashboard | `/gosellr/seller` |

## 🤖 AI Marketplace Pages

| # | Page | URL |
|---|---|---|
| 35 | AI Marketplace Home | `/ai-marketplace` |
| 36 | AI Service Detail | `/ai-marketplace/<service>` |
| 37 | AI Session History | `/ai-marketplace/sessions` |

## 📄 JPS / Jobs Pages

| # | Page | URL |
|---|---|---|
| 38 | Jobs Home | `/jobs` |
| 39 | Job Detail | `/jobs/<id>` |
| 40 | Post Job | `/jobs/post` |
| 41 | Applications | `/jobs/applications` |

## 🛡 PSS / Verification Pages

| # | Page | URL |
|---|---|---|
| 42 | PSS | `/pss` |
| 43 | KYC Upload | `/pss/upload` |
| 44 | Liveness Check | `/pss/liveness` |

## 📜 CRB / Exams Pages

| # | Page | URL |
|---|---|---|
| 45 | CRB Home | `/crb` |
| 46 | Exams List | `/crb/exams` |
| 47 | Exam Take | `/crb/exam/<id>` |
| 48 | Certificates | `/crb/certificates` |

## 🌐 Franchise Pages

| # | Page | URL |
|---|---|---|
| 49 | Franchise Apply | `/franchise/apply` |
| 50 | Franchise Dashboard | `/franchise/dashboard` |
| 51 | Territory Map | `/franchise/territory` |
| 52 | Sub Management (Master+) | `/franchise/subs` |

## 🏛 DMO Pages (Admin role only)

| # | Page | URL |
|---|---|---|
| 53 | DMO Home | `/dmo` |
| 54 | DMO Dashboard | `/dmo/dashboard` |
| 55 | Approvals Queue | `/dmo/approvals` |
| 56 | Up-Guard Monitor | `/dmo/up-guard` |
| 57 | Flagged Users | `/dmo/flagged` |
| 58 | Complaints | `/dmo/complaints` |
| 59 | STL Leaderboard | `/dmo/stl` |
| 60 | PSS Officer | `/dmo/pss` |
| 61 | CRB Officer | `/dmo/crb` |
| 62 | Wallet Control | `/dmo/wallet-control` |
| 63 | AI Ops Panel | `/dmo/ai-assistant` |
| 64 | Analytics Hub | `/dmo/analytics` |
| 65 | Blockchain Control | `/dmo/blockchain` |
| 66 | Settings | `/dmo/settings` |

## 🎥 EHB Tube Pages

| # | Page | URL |
|---|---|---|
| 67 | Tube Home | `/tube` |
| 68 | Video Detail | `/tube/<id>` |
| 69 | Channel | `/tube/channel/<id>` |
| 70 | Upload | `/tube/upload` |

## 🏥 Industry-specific Pages (per-industry · 38 industries)

Each industry has these pages:
- `/industries/<code>` — pillar page
- `/industries/<code>/listings` — browse
- `/industries/<code>/listing/<id>` — detail
- `/industries/<code>/dashboard` — industry-specific dashboard

That's 38 × 4 = 152 industry sub-pages.

## Total page count

- Public: 17
- Authenticated: 11
- GoSellr: 6
- AI Marketplace: 3
- JPS: 4
- PSS/CRB: 7
- Franchise: 4
- DMO: 14
- EHB Tube: 4
- Industry sub-pages: 152
- **Total: ~222 pages**

## Cross-references

- Tools per page: `PAGE-TOOLS-MAP.md`
- Settings per page: `PAGE-SETTINGS.md`
- Components: `COMPONENT-LIBRARY.md`
- UI rules: `UI-RULES.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial pages list |
