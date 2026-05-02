# Industry × Department Matrix — How 38 × 17 Connect

> **Status:** v1.0 · 2026-04-30
> **Purpose:** Show exactly which departments serve each industry and how.

---

## 🏗 Architectural Truth

```
ALL 38 industries use the SAME 17 departments.
No industry has its own engine. Industry = config, NOT code.
```

This file is the **proof** of that — every cell shows how a department serves an industry.

---

## 📊 The Universal Pattern (applies to ALL 38)

Every industry's flow:

```
[User] → AI Core → PSS → CRB → STL gate → Industry routing → 
         Service/Product/Job → Wallet (escrow) → Work → 
         Review → Settlement → Anchor → STL update → 
         (DMO if dispute) → Loop
```

Same 17 departments. Different config per industry.

---

## 🔀 Per-Industry × Per-Department Configuration

### Tier 1 Industries — Detail

#### **GSM** (GoSellr Marketplace · L1 · FAST · 1.0×)
| Department | What it does for GSM |
|-----------|----------------------|
| AI | Match buyer queries → products; recommend |
| PSS | L1 minimum (email + phone) |
| CRB | L1 self-declared OK for general goods |
| STL | Buyer L1 OK; seller L1 OK |
| DMO | FAST mode — auto-approve listings |
| Wallet | Standard escrow |
| Token | Standard EHBGC |
| Commission | 70/10/10/10 |
| Finance | Standard tax (per country) |
| Seller | Full seller dashboard |
| Rider | LDS handles delivery |
| JPS | N/A |
| Franchise | All 5 tiers serve GSM |
| Affiliate | Standard 5/3/2 cascade |
| Blockchain | Standard anchor |
| GoSellr | Native (this IS GoSellr) |

#### **WMS** (Healthcare · L4 · CRITICAL · 2.0×)
| Department | What it does for WMS |
|-----------|----------------------|
| AI | Symptom checker, specialist match, AI diagnosis |
| PSS | L3+ KYC required |
| CRB | L4+ industry exam (medical board) |
| STL | Buyer L1+ OK; provider L4+ required |
| DMO | CRITICAL mode — 7-14 day approval, senior + legal |
| Wallet | Premium escrow + insurance integration |
| Token | Standard |
| Commission | 70/10/10/10 + insurance share |
| Finance | Healthcare-specific tax (often 0% or reduced) |
| Seller | Provider dashboard with patient records |
| Rider | LDS for medication delivery (cold chain) |
| JPS | Healthcare jobs vertical |
| Franchise | Sub L8+ mandatory; Hospital chains for Master |
| Affiliate | Reduced commission (regulated) |
| Blockchain | Anchor every consultation + prescription |

#### **OLS** (Legal · L3 · CRITICAL · 2.0×)
| Department | What it does for OLS |
|-----------|----------------------|
| AI | Legal research, contract drafting assistance |
| PSS | L3+ KYC |
| CRB | L4+ bar/license verified |
| STL | Provider L3+ |
| DMO | CRITICAL — director + legal review |
| Wallet | Escrow + retainer holds |
| Commission | Standard but seller % can be 80% (high-skill) |
| Finance | Country-specific |
| Seller | Lawyer/firm dashboard |
| Franchise | Corporate + Master only (regulatory) |
| Affiliate | Limited (must disclose) |
| Blockchain | Notarized output anchored |

#### **HPS** (Skills/Education · L1 · BALANCED · 1.0×)
| Department | What it does |
|-----------|--------------|
| AI | Personalized learning paths |
| PSS | L1 |
| CRB | L1+ for teachers |
| Seller | Course creator dashboard |
| Affiliate | Education category 8-15% commission |
| Blockchain | Certificates anchored on-chain |

#### **OBS** (Books · L1 · BALANCED · 1.0×)
Same as GSM but books-only.

#### **AGTS** (Travel · L1 · BALANCED · 1.3×)
| Department | What it does |
|-----------|--------------|
| AI | Itinerary builder |
| Wallet | Multi-currency escrow |
| Finance | Travel tax handling |
| Franchise | Travel agencies |
| Blockchain | Booking proofs |

#### **HMS · ITS · SOT** (Industrial / Tech)
Standard pattern with L2+ STL. CRB has industry exams.

#### **ERS** (Real Estate · L2 · STRICT · 1.5×)
| Department | What it does |
|-----------|--------------|
| PSS | L4 KYC for high-value txns |
| CRB | Real estate license verified |
| Wallet | Multi-stage escrow (deposits, closing) |
| DMO | STRICT — senior approval |
| Franchise | Master + Country cover regions |
| Blockchain | Title-anchor proofs |

#### **EFS** (Financial Services · L3 · CRITICAL · 2.0×)
Same as FIN below — full financial regulatory stack.

#### **EPS** (Professional Freelance · L1 · BALANCED · 1.0×)
Standard freelancer pattern. JPS integration for hiring.

#### **EAS** (Agriculture · L1 · BALANCED · 1.0×)
| Department | What it does |
|-----------|--------------|
| Seller | Farmer dashboard |
| Rider | Cold-chain delivery |
| Finance | Crop insurance integration |

#### **ELS** (Local Services · L1 · FAST · 1.0×)
Hyper-local pattern. Franchise micro-tier dominant.

#### **EHB_TUBE** (Media · L1 · BALANCED · 1.0×)
| Department | What it does |
|-----------|--------------|
| AI | Content recommendation, copyright check |
| Wallet | Creator monetization |
| Affiliate | Creator referrals |

---

### Tier 2 — Pattern Summary

**RES (Construction):** STRICT mode + L2 STL + Master/Corporate franchise heavy
**FBS (F&B):** FAST mode + L1 + Rider critical + Cold chain
**ATS (Auto):** BALANCED + L2 + parts marketplace + service bookings
**CNS (Engineering):** STRICT + L2 + license verified
**BCS (Beauty):** FAST + L1 + ELS-like local
**FWS (Fashion):** BALANCED + L1 + photo-heavy listings
**MAS (Manufacturing):** BALANCED + L2 + B2B contracts
**GES (Gaming):** BALANCED + L1 + content moderation heavy
**EHB_MUSIC:** BALANCED + L1 + royalty system
**PTS (Pets):** BALANCED + L2 + vet license
**WES (Weddings):** BALANCED + L1 + multi-vendor coordination
**FIN (Finance):** CRITICAL + L4 + heavy compliance
**TCS (Telecom):** BALANCED + L2 + bulk/B2B
**MFS (Food Safety):** STRICT + L3 + audit-driven
**EDS (Education):** BALANCED + L1 + similar to HPS
**GSS (Green/Sustainable):** BALANCED + L1 + carbon tracking

---

### Tier 3 — High-Risk Industries

**INS (Insurance):** CRITICAL + L3 + claims automation + reinsurance
**LSM (Supply Chain):** STRICT + L2 + B2B + cold chain
**HCS (Health Compliance):** STRICT + L3 + audit-heavy
**SCS (Security/Cyber):** CRITICAL + L3 + clearance verification
**RRS (R&D):** BALANCED + L2 + patent integration
**CMS (Consulting):** BALANCED + L1 + similar to EPS

---

## 📋 The 17 × 38 Service Matrix (Compact)

For each industry, default services from each department:

```
                     |GSM|WMS|HPS|OBS|OLS|...|CMS|
═════════════════════════════════════════════════
PSS verification     | ✓ | ✓ | ✓ | ✓ | ✓ |...| ✓ |
CRB exam             | ✓ | ✓ | ✓ |   | ✓ |...| ✓ |
STL gate (industry)  | ✓ | ✓ | ✓ | ✓ | ✓ |...| ✓ |
Wallet escrow        | ✓ | ✓ | ✓ | ✓ | ✓ |...| ✓ |
Commission split     | ✓ | ✓ | ✓ | ✓ | ✓ |...| ✓ |
DMO oversight        | ✓ | ✓ | ✓ | ✓ | ✓ |...| ✓ |
Blockchain anchor    | ✓ | ✓ | ✓ | ✓ | ✓ |...| ✓ |
AI matching          | ✓ | ✓ | ✓ | ✓ | ✓ |...| ✓ |
Franchise integration| ✓ | ✓ | ✓ | ✓ | ✓ |...| ✓ |
Affiliate commission | ✓ | ✓ | ✓ | ✓ | ✓ |...| ✓ |
Industry-specific UI | ✓ | ✓ | ✓ | ✓ | ✓ |...| ✓ |
Compliance handling  | ✓ | ✓ | ✓ |   | ✓ |...| ✓ |
JPS jobs vertical    | ✓ | ✓ | ✓ |   | ✓ |...| ✓ |
Rider delivery       | ✓ | ✓ |   | ✓ |   |...|   |
Cold chain           |   | ✓ |   |   |   |   |   |
Cross-border txn     | ✓ | ✓ | ✓ | ✓ | ✓ |...| ✓ |
```

The pattern: **All 17 departments × All 38 industries = 646 cells**, but ~95% follow the same standard config. Per-industry deltas are small (multiplier, min STL, DMO mode, special compliance).

---

## 🎯 Adding a New Industry — Checklist

To add industry #39 (or any new one):
1. Add code to `Industries.md` table
2. Set `industry_multiplier` in `FLOW-SCHEMA-V2.json`
3. Set `min_stl_per_industry`
4. Assign DMO mode (FAST/BALANCED/STRICT/CRITICAL)
5. Define services + micro-services (in `INDUSTRY-SERVICES-CATALOG.md`)
6. Optional: per-country compliance flags
7. Generate UI page from template (`apps/web/app/industries/<code>/page.tsx`)
8. Generate per-industry CRB exam (script: `scripts/generate-exam.mjs --industry <code>`)
9. Done — system serves it through the same 17 departments.

**No new code needed for industry-specific.** Config-only.

---

## 🎯 Adding a New Department — Bigger Lift

If you ever need a NEW dept (not in current 17):
1. Define purpose + scope
2. Spec file: `3-departments/<name>.md`
3. Implement service: `services/api/src/services/<name>Service.js`
4. Adapter pattern if external integration
5. Add to AGENT-CONTEXT-BUNDLE
6. Wire events to `eventBus.js`
7. Add metrics counters
8. Add to admin panel: `apps/web/app/dmo/<name>/page.tsx`
9. Add user-facing pages if relevant
10. Update this matrix

(But ideally: **don't** add a new dept. Use existing 17 + config.)

---

## Linked
- `../3-departments/Industries.md` — 38 industries master
- `../3-departments/INDUSTRY-SERVICES-CATALOG.md` — services per industry
- `../5-specs/FLOW-SCHEMA-V2.json` — machine constants
- `INDUSTRY-MAPPING.md` — domain mapping
- `INDUSTRY-RULES.md` — rule logic
- `INDUSTRY-FLOWS.md` — flow narratives
- `INDUSTRY-STL-MULTIPLIER.md` — multipliers
