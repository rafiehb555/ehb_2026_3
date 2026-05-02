# STL — Service Trust Level

**Status:** Canonical spec (v1.0) · Merged from `uploads/ehb_stl.md` (Batch-2, 2026-04-11)
**Related:** `DMO.md §22` (Batch-1) · `DMO.md §24` (contradictions) · `EHB-MASTER-INFO.md §4.3`
**Code:** `services/api/stl-replit/services/stlService.js` (legacy L0-L8, protected by 58 gold-master tests)

---

## 1. Purpose

STL is the **core ranking + trust score** that controls a user's, seller's, product's, or franchise's **visibility, earnings, access, and fee tier** across the entire EHB ecosystem. Every entity in EHB has an STL. The system is designed to be **fraud-resistant, dynamic, and auditable**.

## 2. Canonical 10-level ladder (v3.0, PSS.md aligned)

| Level | Name      | Score band | Role in ecosystem | EHB Responsibility |
|-------|-----------|-----------:|---|---|
| **L0** | **FREE** (pre-level) | —— | Browse/search only, outside STL system | 0% |
| L1    | FREE (email verified) |       0–20 | Entry — email only, heavy restrictions    | 10% |
| L2    | BASIC     |      21–40 | Phone/email verified, basic listing            | 20% |
| L3    | NORMAL    |      41–60 | KYC verified, standard marketplace access      | 40% |
| L4    | STANDARD  |      61–75 | CRB basic + activity streak                    | 55% |
| L5    | ADVANCED  |      76–85 | CRB advanced, regular refills                  | 70% |
| L6    | HIGH      |      86–92 | CRB professional, low complaints               | 80% |
| L7    | PRO       |      93–96 | Verified professional, priority ranking        | 90% |
| L8    | VIP       |      97–98 | Top-tier earnings, lower fees                  | 95% |
| L9    | ELITE     |         99 | By DMO invitation / performance               | 98% |
| L10   | SUPREME   |        100 | Manual DMO approval + full coin lock + 0 complaints | 100% |

**Note:** L0 = pre-level, **outside PSS system**. User has not entered PSS verification flow; can only browse. EHB responsibility = 0% (user bears all risk). L1–L10 are **STL levels within PSS system** with escalating verification depth and EHB responsibility guarantees.

> ⚠️ **Code migration notes** — production code + 58 gold-master tests currently use legacy **L0 → L8 SUPREME (9 levels, no pre-level L0)**. Migration plan: feature flag `STL_V3_ENABLED` to switch ladder. Legacy L0 (email verified) maps to new L1. Legacy L8 maps to new L8. New L0 (pre-level) is purely UI-side filtering. **Do not rewrite `stlService.js` until user sign-off and tests regenerated.**

## 3. Composite score inputs (v3.0)

**Canonical formula (PSS.md v3.0 §3):**

```
PSS_points = (PSS_level / 10) × 40        // 0–40 points
CRB_points = (CRB_level / 10) × 40        // 0–40 points  
DMO_points = (DMO_level / 10) × 40        // 0–40 points

Score = PSS_points + CRB_points + DMO_points  // 0–120 total

Final_STL = MIN(Score / 1.2, lowest_component + 1)  // 0–100, MIN-chain
```

**Weights:**
- PSS = 0.4 (identity/KYC)
- CRB = 0.3 (certification/refills)
- DMO = 0.3 (behavior/activity)

**Inputs:**

1. **PSS** — identity verification (L0–L10, see `PSS.md §2`)
   - L0 = no verification (outside PSS, 0 points)
   - L10 = full verified + clean history (40 points)
2. **CRB** — certification + exams + refill adherence (L0–L10, see `CRB.md §3`)
   - L0 = no certification (0 points)
   - L10 = certified + all refills met (40 points)
3. **DMO** — activity + behavior + risk scoring (L0–L10)
   - L0 = inactive / high risk (0 points)
   - L10 = active + clean behavioral history (40 points)
4. **Token lock** — EHBGC locked per level (see `PSS.md §9`)
   - L2–L10 lock amounts enforce commitment
   - Lock removal triggers 15-day grace + 2-level downgrade
5. **Complaints** — weighted count over rolling window (negative modifier)
   - 3+ complaints unresolved ≥3 weeks → -2 STL levels

**MIN-chain rule (anti-fraud):** If ANY component (PSS, CRB, DMO) is low, the entire STL is capped. Example: PSS L3 + CRB L10 + DMO L10 → Final capped at ≈L3 (personal identity is weakest link).

## 4. Master anti-fraud rule (MIN chain)

```
FINAL_EHB_STL = MIN(productSTL, sellerSTL, companySTL, ownerSTL)
```

If **any** layer is FREE → the whole chain is FREE. This cannot be bypassed by upgrading the product alone. Surface API: `POST /api/stl/validate-product` returning `{ finalStl, blockingLayer }` so UI can display which layer is dragging the chain down (see `DMO.md §22.2`, suggestion S3 "STL badge bleed").

## 5. Upgrade conditions

A user may upgrade to level N+1 only if **all five** hold:

1. PSS trust stable above floor for N+1
2. CRB requirements met (verifications + exam pass + refill adherence)
3. DMO activity score above floor for N+1
4. Wallet locked EHBGC ≥ minimum for N+1 (see `Wallet.md §3`)
5. Complaints ≤ cap for N+1

## 6. Downgrade conditions

Any one of these triggers a downgrade candidate (DMO confirms):

- Complaints breach level cap
- Locked coins fall below required minimum
- Activity drops below floor for rolling window
- Missed/expired refill
- Up-Guard fraud flag (see `DMO.md §22.7`)

## 7. Effects by level

- **Higher STL** → better search ranking, lower platform fees, higher earning cap, faster payout, verified badge
- **Lower STL** → reduced visibility, capped daily earnings, fewer categories, manual review on big orders

## 8. Recalculation model

- **Event-driven:** order complete, complaint filed, refill submitted, coin lock change, exam pass
- **Periodic:** nightly sweep for decay, streak bonuses, complaint window rollover

## 9. Security invariants

- No manual STL edits from admin UI — everything is derived from events
- Every STL delta is logged (audit trail) and optionally on-chain (see `Blockchain.md §3`)
- The STL formula is **protected by 58 gold-master regression tests** — any change that breaks even one test must be rolled back

## 10. Open questions for next batch

1. **Weight numbers** (w_pss, w_crb, w_dmo, w_lock, w_complaint) — what are the production values?
2. **Decay rate** — if a user is idle, how fast does STL drop?
3. **Complaint window** — 30, 60, 90 days?
4. **Score bands for entities other than users** — do products use the same 0–100 bands?
5. **L10 SUPREME approval** — who exactly approves? (DMO council? founder?)

## 11. STL Entity Types

Five types of STL exist in the EHB ecosystem:

1. **Personal STL** — User's own identity trust (Master Key — blocks all others if low)
2. **Product STL** — Individual product quality/trust = Seller STL + CRB + Reviews + Complaints
3. **Service STL** — Service provider service trust
4. **Franchise STL** — Franchise territory trust
5. **Production Company STL** — Manufacturer company trust

Each entity gets its own EHB-STL-Level independently. The MIN-chain still applies: `FINAL = MIN(productSTL, sellerSTL, companySTL, ownerSTL)`.

## Changelog

| Date       | Ver | Change |
|------------|-----|--------|
| 2026-04-11 | 1.0 | Created from Batch-2 `uploads/ehb_stl.md` with Batch-1 master MIN rule + migration flag |
| 2026-04-18 | 1.1 | Added 5 STL entity types (Personal, Product, Service, Franchise, Production Company) |
