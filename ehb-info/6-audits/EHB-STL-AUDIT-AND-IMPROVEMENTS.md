# EHB STL — Audit, Gaps, Improvements & Complete User Flow

> **Purpose:** Audit founder-provided STL master chart against canonical
> `ehb-info/departments/STL.md` v1.1 + `EHB-MASTER-INFO.md §4.3` + `USER-TYPES.md`,
> identify gaps, propose improvements, additional rules, and expanded AI use cases.
>
> **Created:** 2026-04-25 · **Author:** Claude (per founder request)
> **Status:** Working draft — review needed before applying to UI/code

---

## 1. Founder-provided chart (input)

```text
PSS  → CRB  → DMO  → EHB FINAL STL
```

Formula given: `EHB STL = PSS + CRB + DMO; FINAL = MIN(weakest)`

Multi-layer entities given: User · Product · Company · Manufacturer · Industry · Rating

---

## 2. GAPS — what was missing

### 2.1 Formula incomplete

| Founder | Canonical (STL.md §3) |
|---|---|
| `STL = PSS + CRB + DMO` | `Score = (PSS/10)×40 + (CRB/10)×40 + (DMO/10)×40` (each 0–40, total 0–120) |
| `FINAL = MIN(weakest)` | `Final_STL = MIN(Score / 1.2, lowest_component + 1)` (0–100) |

The `+1` over the lowest component matters — gives weakest source a small boost so
it doesn't cap to its raw value.

### 2.2 Source caps missing

| Source | Cap (alone) | Notes |
|---|---|---|
| PSS | L5 ADVANCED | identity proves only so much |
| Franchise | L8 VIP | Franchisee role only |
| CRB | L9 ELITE | skill / refill / certification |
| DMO | L10 SUPREME | live behavior, the real test |

### 2.3 EHBGC token lock — 4th input missing

| Level | Min EHBGC lock |
|---|---:|
| L2 | 20 |
| L3 | 40 |
| L4 | 100 |
| L5 | 200 |
| L6 | 400 |
| L7 | 800 |
| L8 | 2,000 |
| L9 | 4,000 |
| L10 | 10,000+ |

Unlock = 15-day grace period + 2-level downgrade.

### 2.4 MIN-chain Owner missing

| Founder chain | Canonical |
|---|---|
| `MIN(Seller, Company, Product Rating)` | `MIN(productSTL, sellerSTL, companySTL, ownerSTL)` |

Owner = the human running the company. Separate from company entity STL. Owner can
sink everything below.

### 2.5 Five entity types — corrections

| Founder list | Canonical (STL.md §11) |
|---|---|
| User STL | Personal STL ✓ |
| Product STL | Product STL ✓ |
| Company STL | Production Company STL ✓ |
| Manufacturer STL | (= Production Company) |
| Industry STL | calibration layer (boost) — not an entity |
| (missing) | **Service STL** ← lawyer / doctor / tutor |
| (missing) | **Franchise STL** ← territory trust |

So the canonical 5 entity types are: **Personal · Product · Service · Franchise · Production Company.**

### 2.6 Time-based mechanics missing

- **Refill cadence per CRB level:** L1=0, L2=1, L3=2, L4=3, L5=4, L6=5, L7=6, L8=7, L9=8, L10=10+ per window
- **Inactivity decay:** 30+ days idle → −1 level/month
- **Complaint window:** 3+ unresolved in 3 weeks → −2 levels
- **Refill miss:** automatic downgrade
- **Recompute:** event-driven (orders, complaints, exam) + nightly sweep

### 2.7 EHB responsibility % missing

User-facing transparency — kitna risk EHB le raha hai vs user:

| Level | EHB resp % | User risk |
|---|---:|---:|
| L0 | 0% | 100% |
| L1 | 10% | 90% |
| L2 | 20% | 80% |
| L3 | 40% | 60% |
| L4 | 55% | 45% |
| L5 | 70% | 30% |
| L6 | 80% | 20% |
| L7 | 90% | 10% |
| L8 | 95% | 5% |
| L9 | 98% | 2% |
| L10 | 100% | 0% |

### 2.8 10 user types vs 2 in chart

Founder chart shows only Service Provider + Service Receiver. Canonical USER-TYPES.md has 10:
Buyer · Seller · Service Provider · Rider · Inspector · Franchisee · Employer ·
Job Seeker · Production Company · Admin (DMO). Each has its own STL source matrix.

### 2.9 L0 pre-level missing

User browsing/searching without any verification. Outside STL system. Cannot transact.
EHB responsibility 0%.

### 2.10 Industry STL boost missing

Per industry, not just "Industry STL" entity (MASTER-INFO §5.3):

| Industry | Boost | Tier | Audit cycle |
|---|:---:|---|---|
| Healthcare | +5 | Premium | 3 months |
| Legal | +5 | Premium | 12 months |
| Electrical / Solar | +5 | High | 6 months |
| Construction / Security | +4 | High | 6 months |
| IT / Electronics | +4 | Medium | 6 months |
| Automotive / Plumbing / HVAC | +3 | Medium | 6 months |

---

## 3. IMPROVEMENTS — make it better

| Area | Current | Improvement |
|---|---|---|
| Card display | 3 bars (PSS/CRB/DMO) | 4 bars + EHBGC Lock %, plus blocking-layer indicator |
| Progress bar | `████░░` | Add band labels — "76–85 = ADVANCED" |
| Trust badge | Single tier | Triple badge: Personal + Entity + Final STL |
| Color coding | Generic | Tier-color: Bronze L1–L4, Silver L5–L6, Gold L7–L8, Diamond L9–L10 |
| MIN-chain visualization | Hidden | "Blocking layer: Owner L4 caps to L4" displayed prominently |
| Refill counter | Missing | Pill: "3/4 refills done · next due 12 days" |
| Decay timer | Missing | "Inactivity timer: 7 days remaining before −1 level" |
| Audit trail | Missing | Full STL history with reason for each delta — Polkadot-anchored |
| Cross-entity hint | Missing | "Product L7 par owner L4 — final L4. Owner boost = product unlocked." |

---

## 4. ADDITIONAL RULES — proposed

1. **Probation period** — L1–L2 fresh users no high-value transactions for 30 days (AML)
2. **Multi-source bonus** — PSS L8 + CRB L8 simultaneously = +1 STL bonus
3. **Region-specific caps** — local-law-driven (some areas restricted from Healthcare)
4. **Industry minimum STL** — Healthcare L5+, Legal L5+, Construction L4+ to list
5. **Complaint cap per level** — L1=3 allowed, L5=2, L8=1, L10=0
6. **Streak bonus** — 90 days clean record + 5-star avg = +1 STL
7. **Cross-entity downgrade chain** — owner downgraded → all sub-companies/products/services follow
8. **EHBGC burn vs lock** — burn = permanent +1, lock = recoverable
9. **Anti-gaming spike** — 50+ orders in 7 days on unverified seller → DMO review
10. **Time-bound certifications** — PSS 1 year, Healthcare CRB 3 months, Legal 12 months, Electrical 6 months
11. **Buyer Trust Score (separate)** — buyers also have trust (false-complaint history) shown to sellers
12. **Up-Guard escalation** — warning → 24h block → 7d suspend → permanent ban
13. **EHBGC dynamic minimum** — USD-pegged, auto-adjusts on price moves
14. **Franchise vouching** — Sub L5+ vouches user → +1 (franchise carries co-risk)
15. **Witness verification** — 3 verified L7+ users vouch → boost L4 user
16. **Activity diversity bonus** — active in 3+ industries with positive signals → +0.5 cross-trust

---

## 5. EXPANDED AI USE — 28 touchpoints across STL pipeline

### 5.1 Verification AI

1. **AI Document Verifier** — OCR + NADRA cross-check + fake detection (PSS uploads)
2. **AI Liveness Anti-Deepfake** — selfie video deepfake detection
3. **AI Voice Biometric** — voice + face combined
4. **AI Stock-Image Detector** — flag products using stolen / stock photos

### 5.2 Behavior & Risk AI

5. **AI Fraud Forecaster** — predict next-30-day fraud likelihood
6. **AI Anomaly Detector** — order spikes, review bombing, fake-account clusters
7. **AI Buyer Trust Score** — false-complaint history score (separate from STL)
8. **AI Behavior Pattern Analyzer** — flag users for DMO close-watch

### 5.3 Coaching & Engagement AI

9. **AI STL Coach Chatbot** — personalized "what to do next" guidance
10. **AI Refill Reminder (personalized)** — context-aware nudges, not generic
11. **AI STL Auditor (transparency)** — explain "why my STL is L4 not L5"
12. **AI Personalized Path Advisor** — best industry / category for user's profile

### 5.4 Quality & Dispute AI

13. **AI Skill Examiner** — adaptive CRB exams, focus on weak areas
14. **AI Quality Scorer** — score product / service quality from images / video
15. **AI Pre-Dispute Mediator** — settlement suggestion before formal complaint
16. **AI Translation** — Urdu / English / Pashto / Sindhi for fair review

### 5.5 Marketplace AI

17. **AI Industry Recommender** — STL profile → best industry suggestions
18. **AI Pricing Advisor** — market scan → optimal price (esp. L4–L7 sellers)
19. **AI Earnings Forecaster** — 3-month projection
20. **AI Service-Match Engine** — buyer ↔ provider routing

### 5.6 Existing AI Marketplace (STL-gated)

21. **Resume Helper** — L3+
22. **AI Tutor** — L3+
23. **Lawyer AI** — L5+
24. **Business Advisor** — L5+
25. **Diagnosis AI** — L7+
26. **Fraud Detection** — L9+

### 5.7 DMO Operator AI

27. **AI Complaint Triage** — high-priority routing
28. **AI Suspicion Cluster Detector** — region-level fraud rings

### 5.8 Vision AI (cross-cutting)

- Product image authenticity
- Damage detection on returns
- Workshop / store layout verification
- ID-on-document face matching

---

## 6. COMPLETE USER FLOW — integrated

### Stage 0 — Browse (L0 Pre-level)

- Discover platform, view products / services, no transactions
- AI: search + recommend
- EHB responsibility: 0%

### Stage 1 — Register (→ L1 FREE)

- Email + phone + wallet creation
- Basic profile
- AI: onboarding chatbot, language preference detection

### Stage 2 — PSS Verification (→ up to L5)

- CNIC / passport upload
- Selfie + liveness
- AML sanctions scan
- Adapter pattern: NADRA / Jumio / Onfido (swap-ready)
- AI: doc verifier + liveness anti-deepfake

### Stage 3 — CRB Process (→ up to L9)

- Choose category (industry)
- Submit credential documents
- Theory exam (MCQ) + practical exam (task)
- Multimedia proof (video / photos)
- L6+: Franchise on-site visit
- Refill cycle starts (per-level cadence)
- Certificates anchored to Polkadot
- AI: examiner + quality scorer + document verifier

### Stage 4 — DMO Behavior Monitor (→ up to L10)

- Order completion rate
- Complaint count / outcome
- Response time
- Review quality (signed by reviewer's STL weight)
- Up-Guard continuous fraud watch
- AI: anomaly + fraud forecaster + cluster detector

### Stage 5 — EHBGC Token Lock (modifier)

- L2 = 20 EHBGC ... L10 = 10,000+
- Lock enforces commitment
- Unlock = 15-day grace + 2-level downgrade
- Burn (vs lock) = permanent +1

### Stage 6 — Franchise (optional, Franchisee role)

- Sub L1–L10 onboarding
- Master / Corporate / Country tiers
- Cap L8 alone for the Franchisee
- Enables physical CRB visits + refill assistance

### Stage 7 — STL Composite Calculation

- `Score = PSS_pts + CRB_pts + DMO_pts` (0–120)
- `Final = MIN(Score / 1.2, lowest + 1)` (0–100)
- Apply industry boost
- Apply MIN-chain: `MIN(product, seller, company, owner)`
- Display blocking layer to user

### Stage 8 — AI Marketplace Activation (L3+)

- Different services unlock at different levels
- Earnings cap scaled by STL (L5: $50/day, L7: $200/day, L10: unlimited)
- AI: industry recommender + pricing advisor + earnings forecaster

### Stage 9 — Continuous Loop

- Daily DMO scans
- Weekly refill check
- Monthly complaint window rollover
- Quarterly industry audit (per industry cadence)
- Annual PSS re-verification
- AI: STL coach chatbot, personalized refill reminders, STL auditor (transparency)

### Stage 10 — Dispute / Penalty (when triggered)

- Complaint filed → AI pre-dispute mediator
- DMO triage by AI complaint triage
- Up-Guard escalation: warning → 24h block → 7d suspend → ban
- Polkadot audit log of every Δ

---

## 7. Open questions for next batch

These were inherited from `STL.md §10` and remain open:

1. **Weight numbers** (`w_pss`, `w_crb`, `w_dmo`, `w_lock`, `w_complaint`) — production values?
2. **Decay rate** — exact %/month for inactivity?
3. **Complaint window** — 30 / 60 / 90 days?
4. **Score bands for entities other than users** — products use same 0–100?
5. **L10 SUPREME approval** — DMO council? founder?

Plus from this audit:

6. **Industry minimum STL list** — confirm all 32 industries have explicit min STL gates
7. **Multi-source bonus** — confirm whether triple-source (PSS L8 + CRB L8 + DMO L8) gives +2 (vs +1 for double)
8. **Buyer Trust Score** — separate ladder or share STL system?

---

---

## 9. BATCH 2 — Product Card design audit

### 9.1 Founder-provided product card structure

```
[ Image · Name · Price · Rating(STL) ]
[ EHB STL LEVEL (main, prominent) ]
[ Product STL · Seller STL · Company STL · Manufacturer STL ]
[ Industry Verifications (multi) · STL each ]
[ Refilling: N times ]
[ Trust Badge ]
+ Hover popup: PSS / CRB / DMO breakdown
```

### 9.2 Strong points

- Hover popup with PSS/CRB/DMO breakdown — transparency win
- Multi-layer entity STL display
- Reviewer STL weight on ratings — solves fake-review problem
- Same-company collapse rule (Manufacturer = Seller → one STL)
- Product-vs-Service decision tree at card load

### 9.3 GAPS

1. **Owner STL missing** — MIN-chain has 4 layers; founder showed 3
2. **Service STL missing as entity** — service products (lawyer consult, doctor visit) need separate STL
3. **Franchise endorsement missing** — local franchise that vouches the seller
4. **Blocking-layer indicator missing** — UI must show which layer caps the chain
5. **Refill counter incomplete** — needs per-level quota + countdown
6. **EHB Responsibility % missing** — buyer-facing risk pill
7. **Trust delta / momentum missing** — direction (▲ / ▼) over last week/month
8. **Lock status not shown** — locked EHBGC as proof of skin-in-game
9. **Geographic compliance missing** — region-specific license expiry red flags
10. **Buyer Trust Score on reviewers** — separate from reviewer's STL
11. **Product damage/return history** — sold/returned/complaints stats
12. **AI confidence indicators** — every AI advisory has confidence %
13. **Time-bound cert expiry** — Healthcare 3-mo, Legal 12-mo, etc.
14. **No "direct from manufacturer" vs "reseller" flag**

### 9.4 Improvements

- Tier-color aura on whole card (Bronze/Silver/Gold/Diamond)
- MIN-chain visual pipeline (4 dots, weakest highlighted red)
- Inline "boost path" CTA for buyers ("Filter by L8+")
- Industry verification badges with hover-to-show validity dates
- Trust-weighted star average (instead of raw)
- Color-coded refill timer (green / amber / red)
- AI Quality Score chip
- Lock-pool transparency badge
- Cross-entity warning banner (recent owner downgrades)
- Multi-currency price display (USD / EHBGC)

### 9.5 Additional rules for product card

1. **Visibility threshold** — L1-L2 sellers' products only via direct-link, not browse
2. **Auto-collapse same-entity** — single owner+company+manufacturer+seller = ONE STL with note
3. **Reviewer weight rule** — L7+ review = 3x weight, L4-L6 = 1x, L1-L3 = 0.3x
4. **Premium-industry verification mandatory** — Healthcare/Legal must have ≥1 industry verification
5. **Trust badge tier rule** — only L7+ products can show "Premium Trust" badge
6. **Refill cliff rule** — refill expired >7 days → hidden from browse
7. **Manufacturer disclosure** — Manufacturer ≠ Seller → flag genuine origin
8. **Lock-vs-listing ratio** — seller cannot list inventory >5× locked EHBGC value
9. **Open complaint freeze** — auto banner if open complaint exists

### 9.6 Product card AI uses

1. AI Image Authenticator — stock/AI/stolen photo detection
2. AI Description Quality — copy-paste / suspicious listing flag
3. AI Price Sanity Checker — too-cheap-to-be-real flag
4. AI Personalized Trust Verdict — buyer-history-aware match score
5. AI Auto-Translate — Urdu / English / Sindhi
6. AI Comparison Generator — alternate L8+ products
7. AI Trust Q&A — "Is this safe to ship?" with explanation

---

## 10. BATCH 2 — EHBGC Coin Lock placement rule

### 10.1 Founder's rule

> **"Coin lock identity pe nahi — responsibility pe hota hai"**
>
> - PSS / User Profile STL → ❌ NO lock (identity only)
> - JPS / Skill profile → ❌ NO baseline (maybe on paid contracts)
> - Service / Shop / Rider / Franchise → ✅ YES lock (earning entity)
> - Multiple services = multiple separate locks

### 10.2 Strong points

- Skin-in-game principle correct
- Identity unbundled from capital → opens platform for low-capital users
- Multi-entity decoupling matches DeFi bonded-stake model

### 10.3 GAPS / OPEN QUESTIONS

1. **Conflict with canonical EHBGC table** in `MASTER-INFO §4.3` (L2=20...L10=10,000+) — that table implies user-level lock; new rule says entity-level. Resolve.
2. **JPS "mostly no" too vague** — paid contract = escrow vs STL lock? Decide.
3. **Franchise lock not in rule** — `Franchise.md` says Sub L1=$5K...L10=$50K. Map explicitly.
4. **Production Company / Manufacturer lock not in rule** — earning entity, must define
5. **Inspector role** — earns per inspection, lock yes/no?
6. **Buyer no-lock implicit but not written**
7. **Lock currency** — EHBGC only or USD-equivalent? Founders to decide
8. **Slashing rules undefined** — when does lock burn?
9. **Lock release timing** — entity closure → immediate / cool-off / wait?
10. **Downgrade refund** — over-locked amount on STL drop?
11. **Pooling rules** — multi-entity lock sharing?
12. **Insurance alternative** — premium instead of principal?
13. **Beneficiary nomination** — locked coin on account closure?
14. **Cross-border** — currency / PPP normalization?
15. **Lock vs Burn distinction** — separate paths?
16. **Premature unlock penalty** — STL.md says 15-day grace + 2-level downgrade. Reconfirm.

### 10.4 Improvements

- 3-tier lock model: Identity (0) / Skill (per-engagement escrow) / Earning entity (full per-level lock)
- Time-tier discount — 6mo=100%, 12mo=80%, 24mo=60%
- Insurance alternative — 5% annual premium
- Franchise-vouched discount — -30% if vouched
- Group lock pool — multi-seller shop pool
- Auto-graduation — clean 90 days = -25% lock
- Lock yield — 4-6% APY on locked EHBGC
- Burn-vs-lock toggle — user choice
- Slashing schedule defined — fraud 100%, complaint 25%, refill miss 10%, late del 5%
- Region-pegged minimums — PPP-adjusted

### 10.5 Lock matrix per entity

| Entity STL | Lock | Source |
|---|---|---|
| Personal (PSS) | ❌ NO | identity-only |
| Buyer profile | ❌ NO | no earning |
| JPS Skill | ❌ baseline NO | per-engagement escrow on paid contract |
| Job Seeker | ❌ NO | applicant side |
| Service Provider | ✅ YES | per-service, scales with STL |
| Seller / Shop | ✅ YES | per-shop, scales with STL |
| Rider | ✅ YES (smaller) | delivery risk |
| Inspector | ✅ YES (smaller) | reputational risk |
| Franchisee | ✅ YES (large) | territory commitment |
| Production Company | ✅ YES (large) | multi-product impact |
| Employer | ✅ YES (medium) | wage commitment |
| Admin (DMO) | ❌ NO | EHB-employed |

### 10.6 Slashing schedule (proposed)

- Confirmed fraud → 100% slash + ban
- Unresolved complaint > 30 days → 25% slash
- Refill miss × 2 → 10% slash
- Late delivery > 3 in window → 5% slash

### 10.7 Lock-related AI uses

1. AI Lock Optimizer — recommends split across entities
2. AI Slashing Risk Predictor — monthly risk %
3. AI Insurance Pricer — premium alternative
4. AI Lock-vs-Burn Coach — long-term sim
5. AI Refund Calculator — closure-scenario simulation

---

---

## 12. STL LEVEL BADGE SYSTEM (visual identity per level)

> **Founder requirement (Batch-3):** "Final EHB STL Level L7-PRO ke saath PRO STL ki picture
> bhi lagao, har level ki picture bhi honi chahiye. Neeche owner / company / seller / products
> ke saath short but important details bhi ani chaiy — owner ka name, seller ki shop ka name."

### 12.1 10-level visual badge convention

| Level | Tier | Symbol | Shape | Color gradient | Score band | Lock | EHB resp |
|:---:|---|---|---|---|:---:|---:|---:|
| L1 | Bronze | 🌱 sapling | circle | gray (#6b7280→#9ca3af) | 0–20 | 0 | 10% |
| L2 | Bronze | coin | circle + ring | bronze (#854d0e→#ca8a04) | 21–40 | 20 | 20% |
| L3 | Bronze | shield | shield | bronze-amber (#a16207→#eab308) | 41–60 | 40 | 40% |
| L4 | Bronze | star | 5-point star | amber (#b45309→#f59e0b) | 61–75 | 100 | 55% |
| L5 | Silver | hexagon | hex | silver (#64748b→#cbd5e1) | 76–85 | 200 | 70% |
| L6 | Silver | shield+star | shield with embedded star | silver-bright (#475569→#e2e8f0) | 86–92 | 400 | 80% |
| L7 | Gold | medal+ribbon | circle with purple ribbon | gold (#F0A030→#FFC266) | 93–96 | 800 | 90% |
| L8 | Gold | crown | crown with 3 gems | gold-bright (#d97706→#fde047) | 97–98 | 2,000 | 95% |
| L9 | Diamond | diamond | diamond shape | purple (#7B6EF6→#A098F8) | 99 | 4,000 | 98% |
| L10 | Diamond | trophy+aura | trophy with glow + sparkles | purple-teal (#7B6EF6→#2BBFA0) | 100 | 10,000+ | 100% |

### 12.2 Badge rendering rules

- Always show: shape + level number ("L7") + tier name ("PRO")
- Mini badge size: 36×60px (shape + label below)
- Card hero badge size: 220×170px (large embedded medal + giant level + tier)
- L7+ badges have ribbon on top (medal style)
- L9+ badges have outer glow filter (Gaussian blur)
- L10 has sparkle accents (small white circles around the badge)

### 12.3 Entity row name + details requirement

Every entity row on a product card MUST show:

| Layer | Visible name | Important details (3–4 lines) |
|---|---|---|
| 🧑 Owner | Full name (e.g., "Muhammad Ali Khan") | Title (CEO/Founder), phone, PSS-verify date, region, Polkadot ID |
| 🏢 Company | Legal name (e.g., "TechCo Pakistan (Pvt) Ltd") | Reg date, website, address, employees, SECP/FBR status |
| 🏭 Manufacturer | Brand name (e.g., "Samsung Electronics") | Country, est. year, employees, distribution channel, anti-counterfeit cert |
| 🏪 Seller / Shop | Shop name (e.g., "Aisha Mobile Mart") | Shop number, location, owner-of-shop name, active since, sold/returned counts |
| 📦 Product | Product name (e.g., "Samsung A55 5G — 256GB Black") | SKU, serial, IMEI, MIN-chain explanation |

Each row must also show:

- The level badge (mini size)
- Status pill (verified ✓ / blocking ⚠ / locked 🔒)
- "View profile / shop / brand →" mini-CTA
- If it's the blocking layer: red border + "⚠ Blocking layer · caps L#"

### 12.4 Special case rules

1. **Same-entity collapse:** if Owner = Company-owner = Seller (single-person shop), show ONE merged card with note "Single-entity seller (owner/manager/shop = same person)"
2. **Foreign manufacturer:** show country flag emoji + "Direct distribution PK" or "Authorized reseller" pill
3. **Family-run shop:** if Seller name ≠ Owner name but same surname / linked profile, show "Family-run" tag
4. **Franchise endorsement:** if product seller is endorsed by a franchise, surface that as a 5th entity card with the franchise's STL badge

### 12.5 Implementation note

The badge component should live in:

```
apps/web/components/ui/stl-badge-icon.tsx   (10 distinct SVG badges)
apps/web/components/ui/entity-card.tsx       (Owner / Company / Seller / Manufacturer / Product)
apps/web/lib/stl/level-visuals.ts            (canonical badge config — generated from this section)
```

When `STL.md` or this audit file is updated, the canonical config regenerates and all UI auto-updates.

---

---

## 14. EHBGC LOCK — final canonical answers (Batch-4, awaiting recheck)

> **Master principle (Founder, locked):** `LOCK = Responsibility (entity level), NOT identity (PSS)`

### 14.1 Final answers to 16 open questions

| # | Question | Final answer | Status |
|---:|---|---|:---:|
| 1 | PSS-table-lock vs entity-lock | **Entity lock only** | ✅ |
| 2 | JPS escrow per project | YES — selective (paid contracts only) | ✅ |
| 3 | Lock currency | EHBGC primary · USD display | ✅ |
| 4 | Slashing % | Fraud 100% + ban · Complaint(30d) 25% · Refill miss 10% · Late deliv 5% | ✅ |
| 5 | Lock release timing | Order complete → 7–30 days cooling → release if no complaint | ✅ |
| 6 | Downgrade case | HOLD default · BURN on fraud | ✅ |
| 7 | Multi-entity pooling | YES with control · risk shared | ✅ |
| 8 | Insurance alternative | YES · 5% yearly premium replaces lock | ✅ |
| 9 | Beneficiary nomination | YES · MANDATORY for large locks | ✅ |
| 10 | Cross-border PPP | YES · adjust by country purchasing power | ✅ |
| 11 | Burn vs Lock toggle | User choice · Burn = permanent + STL boost | ✅ |
| 12 | Premature unlock | 15% penalty + STL downgrade | ⚠️ conflicts with STL.md (2-level + 15-day grace) |
| 13 | Lock yield | 4–6% APY | ✅ |
| 14 | Inspector lock tier | Medium | ⚠️ undefined numeric |
| 15 | Employer wage commit | Medium (salary guarantee) | ⚠️ undefined numeric |
| 16 | Lock-to-listing ratio | MAX 5× rule | ✅ |

### 14.2 Final entity lock matrix (locked)

```
USER (PSS)            → ❌ NO LOCK
JPS / Skill Profile   → ❌ baseline (per-project escrow when paid)
Buyer                 → ❌ NO LOCK
Job Seeker            → ❌ NO LOCK
Admin (DMO)           → ❌ NO LOCK (employed)
─────────────────────────────────────────────
Service Provider      → ✅ YES (per-service)
Seller / Shop         → ✅ YES (per-shop)
Rider                 → ✅ YES (small)
Inspector             → ✅ YES (medium)
Franchisee            → ✅ YES (large)
Production Company    → ✅ YES (large)
Employer              → ✅ YES (medium)
```

### 14.3 Conflicts to resolve before code

1. **`MASTER-INFO §4.3` ladder (L2=20…L10=10,000+):** confirm = **entity-STL per-level minimum** (apply to Service/Shop/Production etc.) — NOT user STL
2. **Premature unlock penalty:** STL.md says "15-day grace + 2-level downgrade", new answer says "15% + STL downgrade". Final unified rule needed:
   - Proposed: "15-day grace period → after grace: 15% slash on unlocked amount + 2-level STL downgrade"

### 14.4 Numeric definitions for "Small / Medium / Large" (proposed, awaiting confirm)

| Term | Range |
|---|---|
| Small | 50–200 EHBGC (Rider) |
| Medium | 200–800 EHBGC (Inspector, Employer) |
| Standard ladder | 20–10,000 EHBGC per STL level (Service/Shop/Production) |
| Large | $5,000–$50,000 (Franchise) |

### 14.5 Sub-questions emerging from final answers (Batch-5 discussion)

**On Q1 (entity lock):**
- Q1.1: Is `MASTER-INFO §4.3` table the entity-STL per-level minimum?
- Q1.2: Different ladders per entity type (Service vs Shop vs Franchise)?

**On Q2 (JPS escrow):**
- Q2.1: Escrow size — % of project? Fixed?
- Q2.2: Escrow holder — platform / smart contract / trustee?
- Q2.3: Release condition — submission / approval / auto-after-N-days?
- Q2.4: Dispute path
- Q2.5: Who funds escrow

**On Q3 (currency):**
- Q3.1: Volatility — auto-rebalance lock count if EHBGC drops?
- Q3.2: Buyer-facing price currency

**On Q4 (slashing):**
- Q4.1: Stacking rule (cumulative or single)
- Q4.2: Max cap per window (50%? 75%?)
- Q4.3: Time decay on slash debt
- Q4.4: Multiple complaints — 25% each or 25% total

**On Q5 (release):**
- Q5.1: Entity base lock release timing (vs per-order escrow)
- Q5.2: 7 vs 30 days — what determines
- Q5.3: Active complaint behavior on release

**On Q6 (downgrade):**
- Q6.1: Hold duration
- Q6.2: Yield during hold
- Q6.3: Usability during hold
- Q6.4: Withdraw from hold possible?

**On Q7 (pooling):**
- Q7.1: Pool efficiency bonus (e.g., 30% reduction)?
- Q7.2: Cross-slash risk (whole pool or single entity)
- Q7.3: Same user only or family/group
- Q7.4: Pool exit mechanics

**On Q8 (insurance):**
- Q8.1: 5% of what (lock amount)?
- Q8.2: Underwriter (EHB / 3rd party)
- Q8.3: Coverage scope (slash events / collapse only)
- Q8.4: Claim mechanism
- Q8.5: Refusal cases
- Q8.6: Hybrid lock+insurance allowed?

**On Q9 (beneficiary):**
- Q9.1: "Large" threshold (L8+ / L6+ / all)
- Q9.2: Beneficiary KYC requirement
- Q9.3: Multiple beneficiaries with split %?
- Q9.4: Inheritance dispute jurisdiction
- Q9.5: Minor beneficiary handling

**On Q10 (PPP):**
- Q10.1: PPP source (IMF / WB / OECD)
- Q10.2: Update frequency
- Q10.3: User country change handling
- Q10.4: Direction (low-PPP user pays less or more EHBGC)

**On Q11 (burn vs lock):**
- Q11.1: Lock → Burn one-way conversion allowed?
- Q11.2: Burn STL boost exact value (+1, +N, proportional)
- Q11.3: Min burn amount
- Q11.4: Burn fee / tax
- Q11.5: STL boost cap on large burns

**On Q12 (premature unlock):**
- Q12.1: Final unified rule with STL.md
- Q12.2: 15% on unlocked amount or total locked
- Q12.3: 15-day grace still applies?
- Q12.4: Repeated premature unlocks — escalating penalty?

**On Q13 (yield):**
- Q13.1: Yield source (treasury / fees / inflation)
- Q13.2: Variable rate determinant
- Q13.3: Currency of payout
- Q13.4: Compounding or streaming
- Q13.5: Higher STL = higher yield?
- Q13.6: Yield pause during slashing
- Q13.7: Sustainability at scale

**On Q14 (Inspector):**
- Q14.1: Numeric range
- Q14.2: Per-inspection vs per-tenure
- Q14.3: False-report slashing rule

**On Q15 (Employer):**
- Q15.1: Numeric range
- Q15.2: Tied to wages offered or fixed
- Q15.3: Per-posting or per-entity
- Q15.4: Wage default slashing

**On Q16 (5× ratio):**
- Q16.1: "Listing value" exact definition
- Q16.2: Service equivalent
- Q16.3: Cross-entity pooling
- Q16.4: Soft cap (warn) or hard cap (block)

### 14.6 Cross-cutting concerns

1. **Two lock types must be distinguished in spec:**
   - **Entity Base Lock** — long-term, per STL level, released on entity closure
   - **Per-Engagement Escrow** — short-term, per order/project, released after cooling period

2. **Insurance needs separate spec** — `Insurance.md` to be authored next batch

3. **Yield sustainability** — at scale, treasury impact analysis needed

4. **Appeal / contest mechanism** — undefined; user-protection requirement

5. **Negative slash debt handling** — if slash > locked, recovery path?

6. **Burn cap on STL boost** — sanity ceiling required

---

---

## 16. ECONOMIC RULES — 10 LOCKED + 3 PROPOSALS (Batch-5)

> **System identity (locked):** "Dynamic Trust-Backed Economy"

### 16.1 The 10 locked rules

| # | Rule | Final form |
|:---:|---|---|
| 1 | STL Ladder model | **HYBRID** = Base STL lock × Industry multiplier (admin-tunable live) |
| 2 | Escrow size | **100% project value** · auto-release on approve / no-response · DMO arbitrates disputes |
| 3 | Entity lock release | **Manual close request + 30-day cooling period** (anti-fraud safeguard) |
| 4 | Slashing cap | **MAX 50%** total per window (multiple issues combine but capped) |
| 5 | Volatility handling | **USD-pegged auto-adjust** (coin value ↓ → required coins ↑) |
| 6 | Pooling risk | **Only faulty entity slashed**, pool stays safe |
| 7 | Insurance | **Optional add-on** · user choice · separate module (`Insurance.md` later) |
| 8 | Yield model | **All sources** (fees + treasury + inflation + hybrid) · **MAX 6% APY hard cap** |
| 9 | Premature unlock | **15-day grace = no penalty** · After grace: **15% on unlocked + STL downgrade** · repeat = escalating |
| 10 | Lock-types split | **Entity Lock (long-term, STL × industry mult) ≠ Per-Engagement Escrow (per order, 100% value)** — officially separated |

### 16.2 3 proposed values (awaiting founder confirm)

#### 16.2.1 Coin table (proposed = MASTER-INFO §4.3)

| Level | EHBGC base | USD-eq (≈ $0.10/EHBGC) |
|---|---:|---:|
| L1 FREE | 0 | $0 |
| L2 BASIC | 20 | $2 |
| L3 NORMAL | 40 | $4 |
| L4 STANDARD | 100 | $10 |
| L5 ADVANCED | 200 | $20 |
| L6 HIGH | 400 | $40 |
| L7 PRO | 800 | $80 |
| L8 VIP | 2,000 | $200 |
| L9 ELITE | 4,000 | $400 |
| L10 SUPREME | 10,000+ | $1,000+ |

#### 16.2.2 Industry multipliers

| Industry | Multiplier | Reason |
|---|:---:|---|
| Healthcare (WMS) | 2.0× | high stakes, life-impact |
| Legal (OLS) | 2.0× | high stakes, fraud risk |
| Electrical / Solar | 1.5× | safety-critical |
| Construction / Security | 1.5× | safety-critical |
| Electronics (GSM) | 1.3× | medium |
| Education (HPS) | 1.2× | medium-low |
| Automotive | 1.2× | medium |
| Plumbing / HVAC | 1.1× | low-medium |
| Food / Retail | 1.0× | base |
| Other | 1.0× | default |

**Formula:** `Final Lock = Base STL Lock × Industry Multiplier`
**Example:** Service L7 in Healthcare = 800 × 2.0 = **1,600 EHBGC**

#### 16.2.3 Entity lock thresholds

| Entity | Tier | Min lock | Notes |
|---|---|---|---|
| Rider | SMALL | 50 EHBGC base · scales L2-L8 | L7 Rider = 50 EHBGC |
| Inspector | MEDIUM | 200-800 · per-tenure | L7 Inspector = 200 base |
| Employer | MEDIUM | 500 EHBGC per active job posting | bigger wage = bigger lock |
| Service / Shop | STANDARD | STL ladder × industry mult | L7 Healthcare = 1,600 EHBGC |
| Franchisee | LARGE | $5K (Sub L1) – $50K (Sub L10) | per `Franchise.md` |
| Production Company | LARGE | $10K – $100K | multi-product impact |

### 16.3 Master flow (locked)

```
User Create
   ↓
PSS Verify (NO LOCK)
   ↓
Entity Create (Service / Shop / Rider etc.)
   ↓
Entity STL initialized
   ↓
Lock Required = Base STL × Industry Multiplier
   ↓
EHBGC Lock applied (USD-pegged)
   ↓
User Works → Per-Order Escrow (100%)
   ↓
DMO Monitor (live)
   ↓
Slash (max 50%) / Reward
   ↓
STL Update + Lock Adjust
```

### 16.4 Items deferred to separate spec docs

1. **Insurance.md** — full spec for optional add-on (premium structure, claims, refusal, hybrid)
2. **Yield-source full spec** — sustainability model, treasury management, inflation rules
3. **Slashing time-decay** — how slash debt fades over time
4. **Pool exit mechanics** — how pooled entity disconnects cleanly
5. **PPP source + update cadence** — IMF/WB choice, recalibration frequency

---

## 17. Changelog

| Date | Ver | Change |
|---|---|---|
| 2026-04-25 | 1.0 | Initial audit of founder chart vs canonical STL.md |
| 2026-04-25 | 1.1 | Batch-2: Product Card audit + Coin Lock placement rule (16 questions) |
| 2026-04-25 | 1.2 | Batch-3: STL Level Badge System (10 distinct badges + entity naming) |
| 2026-04-25 | 1.3 | Batch-4: 16 final answers + 2 conflicts + 50+ sub-questions |
| 2026-04-25 | 1.4 | Batch-5: 10 economic rules LOCKED + 3 detail proposals (coin table / industry mult / entity thresholds) + system identity "Dynamic Trust-Backed Economy" + 5 deferred specs listed |
