# EHB PSS — Master Plan (v3.0, 2026-04-18)

> **Status:** v3.0 — Complete rewrite with 10-level PSS ladder, 9 user types, L0 pre-level, EHB responsibility %, token lock, 9-step flow, personal STL master key, and franchise rules
>
> **Authoritative sources (canonical; read these first):**
> - `ehb-info/departments/PSS.md` v3.0 — PSS = **Personal Security System** (10 levels, 27 features, 9 user types, L0 free)
> - `ehb-info/departments/STL.md` v1.0 — **10-level ladder L1–L10** + composite formula
> - `ehb-info/departments/CRB.md` v2.0 — **Central Record Blockchain** (verification + exams + refills)
> - `ehb-info/departments/DMO.md` v2.0 — **Decentralized Management Office** (governance, oversight)
>
> If anything in this file conflicts with canonical files above, the canonical files win.

---

## 1. PSS — What It Actually Is

**PSS = Personal Security System.** The identity + security verification backbone. Every user (buyer, seller, rider, inspector, franchise, admin) must pass PSS before accessing platform features.

PSS contributes **0–40 points** to the composite STL formula (alongside CRB 0–40 and DMO 0–40):

```
STL_Score = (PSS × 0.4) + (CRB × 0.3) + (DMO × 0.3)
Final = MIN(Score, lowest_component + 1)
```

**Five objectives:**
1. Real user verification (KYC/KYB) — prove the human/business behind the account
2. Profile authenticity — prevent impersonation, bot accounts, fake companies
3. Ongoing monitoring — continuous post-onboarding identity & behavior tracking
4. Financial compliance — AML, transaction monitoring, regulatory reporting
5. Trust score calculation — output 0–40 points consumed by STL formula

---

## 2. The PSS 10-Level Ladder (v3.0)

| Level | Name | Score | Features Required | Visibility | EHB Responsibility |
|-------|------|-------|-------------------|------------|-------------------|
| **L0** | FREE / Pre-Level | —— | Email signup only | Browse only | 0% |
| **L1** | Email Verified | 0–10 | Email confirmation + CAPTCHA | Limited listing | 10% |
| **L2** | Phone Verified | 11–20 | OTP verification | Moderate visibility | 20% |
| **L3** | ID Verified | 21–35 | CNIC/Passport OCR + NADRA | Standard access | 40% |
| **L4** | Face Verified | 36–45 | Face match with ID (liveness) | Good trust | 55% |
| **L5** | Address Verified | 46–60 | Address proof + postal check | Advanced access | 70% |
| **L6** | Liveness Check | 61–70 | Live video / motion anti-spoof | High trust | 80% |
| **L7** | Device Binding | 71–80 | Device fingerprint + geofencing | Professional | 90% |
| **L8** | Video KYC | 81–90 | Full video call with PSS agent | VIP level | 95% |
| **L9** | Continuous Monitoring | 91–98 | Ongoing behavior + fraud tracking | Elite | 98% |
| **L10** | Full Verified | 99–100 | All checks + clean 90-day history | Supreme | 100% |

**Key points:**
- L0 = free, **outside PSS system**, 0% EHB guarantee
- L1–L10 = PSS levels, each with escalating verification depth
- EHB Responsibility % shown on product cards (buyer confidence metric)
- Token lock required per level (L2–L10, ranging 50–25,000 EHBGC)

---

## 3. 27 Verification Features (5 Categories) — Reference

Full table in `departments/PSS.md §4`. Summary:

| Category | Feature count | Examples | STL Points |
|----------|---|---|---|
| A — Identity | 6 | ID OCR, Liveness, AML, Address, Ongoing, Questionnaires | 15 |
| B — Financial | 2 | Transaction monitoring, Crypto monitoring | 8 |
| C — Business | 1 | KYB (SECP, director check) | 10 |
| D — Behavioral & Device | 7 | Behavior, Face 2FA, Scoring, Device, Email, Phone, IP risk | 4 |
| E — Compliance & Screening | 11 | Travel rule, Non-doc, Reusable KYC, Age, Video, Counterparty, Institution, Payment, Suspicious, Periodic, SAR reports | 3 |
| **TOTAL** | **27** | — | **40** |

---

## 4. 9 User Types + PSS Requirements

| Role | Min PSS L | Required Features | Notes |
|------|---|---|---|
| Buyer | L1 | Email, Phone (L2 for >50K orders) | Basic marketplace access |
| Seller | L3 | ID, Liveness, AML, Address, Device | Enhanced merchant KYC |
| Service Provider | L3 | ID, Liveness, AML, Address, Video (L8 preferred) | Freelance/professional |
| Rider | L3 | ID, Liveness, Address, Phone, Device, Face 2FA | Public-facing role |
| Inspector | L4 | ID, Liveness, AML, Address, Video, Device, Face 2FA, Background | Physical verification authority |
| Franchise | L5 | All identity + KYB + AML + Video + Continuous monitoring | Territory management |
| Employer | L2 | Email, Phone (L3 recommended) | Job posting access |
| Job Seeker | L1 | Email (L3 recommended for visibility) | Job applications |
| Production Company | L4 | All + KYB + AML + ongoing monitoring | Supply chain authority |
| **Admin** | L8 | ID, Liveness, Face 2FA, Device, IP, Background, 2FA mandatory | **DMO-only internal role** |

**Rules:** One PSS per identity; multiple roles allowed; multiple accounts prohibited (device binding enforced).

---

## 5. L0 / FREE Zone

**For users who haven't verified:**

- **Allowed:** Browse, search, read reviews, explore
- **Blocked:** Orders, selling, services, wallet, affiliate earnings
- **UI:** Industry pages show separate "⚠️ Free Zone" section
- **Button:** "Get Verified" → PSS flow
- **EHB Responsibility:** 0% (user bears all risk)

---

## 6. Composite STL Formula (PSS + CRB + DMO)

**New v3.0 formula:**

```
PSS_Input = (PSS_Level / 10) × 40        // 0–40 points
CRB_Input = (CRB_Level / 10) × 40        // 0–40 points
DMO_Input = (DMO_Level / 10) × 40        // 0–40 points

Raw_Score = PSS_Input + CRB_Input + DMO_Input  // 0–120 points
Final_Score = MIN(Raw_Score / 1.2, lowest_of_three + 1)  // 0–100, MIN chain

Final_STL = map_to_L1_L10(Final_Score)
```

**Example:**
- PSS = L6 (60 points) → 24 STL pts
- CRB = L4 (40 points) → 16 STL pts
- DMO = L3 (30 points) → 12 STL pts
- Raw = 52 pts → /1.2 = 43.3
- MIN(43.3, 30+1=31) = 31 pts
- Final_STL ≈ L3 NORMAL

**MIN-chain rule:** If any component is low, the entire STL is capped. This prevents "reputation laundering" across components.

---

## 7. EHB Responsibility % Ladder

Shown on product cards as "🛡️ X% Safe for Deal":

| STL Level | EHB Guarantee % | Badge |
|---|---|---|
| L0 FREE | 0% | ⚠️ UNVERIFIED |
| L1 | 10% | 🔶 Minimal |
| L2 | 20% | 🟡 Basic |
| L3 | 40% | 🟠 Moderate |
| L4 | 55% | 🟠 Good |
| L5 | 70% | 🟢 Advanced |
| L6 | 80% | 🟢 High |
| L7 | 90% | 🟢 Professional |
| L8 | 95% | 🟢 VIP |
| L9 | 98% | ✅ Elite |
| L10 | 100% | ✅ SUPREME |

---

## 8. Personal STL = Master Key (Freeze + Cap)

**If personal PSS is low, all derived STLs freeze + cap at personal level.**

- **Freeze:** Existing seller/product STL levels do NOT drop
- **Cap:** Cannot grow above personal PSS level
- **Example:** Personal PSS L3 → Seller STL capped at L3 (until personal reaches L4+)

**Why:** Identity is the foundation. Weak identity = weak trust across all platforms.

---

## 9. Token Lock (EHBGC) Stability Mechanism

| PSS L | Lock (EHBGC) | Lock Period | Grace Period |
|---|---|---|---|
| L0–L1 | 0 | — | — |
| L2 | 50 | Fixed | 15 days on removal request |
| L3 | 100 | Fixed | 15 days |
| L4 | 250 | Fixed | 15 days |
| L5 | 500 | Fixed | 15 days |
| L6 | 1,000 | Fixed | 15 days |
| L7 | 2,500 | Fixed | 15 days |
| L8 | 5,000 | Fixed | 15 days |
| L9 | 10,000 | Fixed | 15 days |
| L10 | 25,000 | Fixed | 15 days |

**Removal Flow:**
1. User requests unlock
2. 15-day warning period (notifications sent)
3. If user confirms: downgrade by 2 levels
4. If user cancels within 15 days: lock reinstated

**Resilience:** Locked coins can be recovered by EHB if fraud occurs → recovery fund.

---

## 10. Upgrade System

- **95% AI auto-verification** (ID OCR, NADRA check, liveness, device fingerprint, behavioral scoring)
- **5% manual review** (CRB physical inspection cases only)

**Flow:** Submit docs → AI evaluation → If ≥95% confidence, auto-approve → Else, escalate to CRB review queue → Officer decides

---

## 11. Downgrade Conditions

Any ONE of these triggers downgrade or downgrade queue:

1. **Fraud detected** → instant L0 + ban + blacklist
2. **Document expiry** → drop 2 levels (refill required)
3. **3+ unresolved complaints (3+ weeks)** → drop 2 levels
4. **Inactivity** → drop 1 level per month (no orders, no activity)
5. **Token lock removed** → 15-day grace, then drop 2 levels
6. **Behavior anomaly** → flagged for review (takeover attempts, impossible travel)

**Weekly warnings:** User gets tasks/notifications before downgrade executes.

---

## 12. 9-Step Verification Flow (from HTML ecosystem)

| Step | Action | Output |
|------|--------|--------|
| 01 | Platform calls PSS via `@ehb/pss-client` | `sq_request_id` created |
| 02 | PSS creates `stl_request` (status=pending) | Document persisted |
| 03 | Run feature checks (identity, AML, device, behavior) | Evaluation matrix |
| 04 | Compute PSS score (0–100%) | Score = sum(passed weights) / sum(all weights) |
| 05 | Apply rule engine (95/80/60/40% thresholds) | Routing decision |
| 06 | Route to action (auto_approve / franchise / crb / reject) | Event emitted |
| 07 | Apply source caps (PSS→L5, Franchise→L8, CRB→L9, DMO→L10) | Level ceiling |
| 08 | Deliver decision via webhook (Bull/Redis HMAC-signed) | Platform receives result |
| 09 | Persist + audit log + signed webhook to platform | Immutable record |

---

## 13. Rule Engine Thresholds (v3.0)

**Evaluation criteria (first-match-wins):**

| Priority | Rule | Condition | Action | SQ Level |
|---|---|---|---|---|
| 1 | Elite Auto-Approve | score ≥ 95% | auto_approve | L10 SUPREME |
| 2 | High Auto-Approve | score ≥ 80% | auto_approve | L3–L7 |
| 3 | Franchise Review Band | score ≥ 60% | franchise | TBD by reviewer |
| 4 | CRB Review Band | score ≥ 40% | crb | TBD by reviewer |
| 5 | Auto-Reject | score < 40% | reject | None |

---

## 14. Source Caps (Who Can Assign Which Ceiling)

| Verification Source | Can Assign Up To |
|---|---|
| PSS auto (rule engine) | L5 ADVANCED |
| Franchise reviewer | L8 VIP |
| CRB officer (physical + on-chain) | L9 ELITE |
| DMO council (manual override) | L10 SUPREME |

---

## 15. Franchise 4-Tier System

| Tier | Territory | Capital (EHBGC) | Order Cap | Min PSS | Removal |
|---|---|---|---|---|---|
| Online | Pan-country | 5,000 | Unlimited | L5 | 3 warnings → 80% refund + 20% penalty |
| City | Urban metro | 20,000 | 500/day | L5 | 3 warnings → 80% refund + 20% penalty |
| State | Province/region | 50,000 | 1000/day | L6 | 3 warnings → 80% refund + 20% penalty |
| Country | National | 100,000+ | Unlimited | L7 | 3 warnings → 80% refund + 20% penalty |

**Activation:** Minimum PSS L5 + token lock + KYB verification. Replacement system auto-selects high-STL candidates on removal.

---

## 16. CRB Officer Edit Authority

CRB officers reviewing submissions can **EDIT entity data** before deciding (approve/reject). Edits logged in audit trail. Allows correcting typos and minor data entry errors without forcing resubmission.

---

## 17. Phase Strategy

| Phase | Focus | Platforms | Features |
|---|---|---|---|
| **1** | E-commerce heavy lift | GoSellr | Full PSS + rule engine + webhook |
| **1.5** | Jobs + light services | JPS, OLS basic | Basic feature set + L3 min |
| **2** | High-stakes sectors | HPS (L5+), OLS legal, AGTS | Video KYC + CRB physical |
| **3** | Blockchain + finance | All + crypto | Travel rule + cross-border transfers |

---

## 18. Code Locations (Reference)

| What | Where |
|------|-------|
| PSS backend (NestJS + MongoDB) | `services/pss/` |
| Shared PSS client lib | `packages/pss-client/` |
| STL composite engine (v3.0) | `services/pss/src/modules/stl-engine/` |
| Criteria evaluator | `services/pss/src/modules/criteria/` |
| Rule engine | `services/pss/src/modules/rule-engine/` |
| Webhook module (Bull/Redis) | `services/pss/src/modules/webhook/` |
| CRB integration module | `services/pss/src/modules/crb/` |
| DMO integration module | `services/pss/src/modules/dmo/` |
| Audit log (immutable) | `services/pss/src/modules/audit/` |
| Frontend routes (user) | `apps/web/app/pss/{submit,status,refill,badges,page}.tsx` |
| Frontend routes (DMO) | `apps/web/app/dmo/pss/{queue,cases,rules,webhooks}.tsx` |
| Reusable UI components | `apps/web/components/pss/` |

---

## 19. MongoDB Collections (PSS)

| Collection | Purpose |
|---|---|
| `pss_requests` | One doc per evaluation. Full lifecycle tracking. |
| `criteria_sets` | Per-platform, per-entity-type criteria + weights. |
| `rules` | Platform rule definitions with thresholds + actions. |
| `franchise_reviews` | Pending/completed franchise area reviews. |
| `crb_reviews` | CRB physical inspection cases. |
| `dmo_overrides` | DMO manual decisions + appeals. |
| `platforms` | Registered sub-platforms with webhook URLs + HMAC secrets. |
| `webhook_logs` | Delivery attempts, statuses, response codes. |
| `audit_logs` | Immutable audit trail (actor, timestamp, old/new values). |
| `tokens_locked` | User token lock status + unlock grace periods. |

---

## Changelog

| Date | Ver | Change |
|---|---|---|
| 2026-04-18 | 3.0 | **Major rewrite from v2.0.** Added: 10-level PSS ladder (L0 FREE outside system through L10 SUPREME), 9 user types (admin as DMO-only), EHB Responsibility % ladder (0–100%), token lock table per level with 15-day grace + 2-level downgrade on removal, personal STL master key (freeze + cap rule), composite STL formula with MIN-chain, 9-step verification flow from HTML ecosystem, rule engine thresholds (95/80/60/40%), CRB officer edit authority, franchise 4-tier system with capital/order caps, downgrade conditions (fraud/expiry/complaints/inactivity/lock/anomaly), phase strategy. All 27 features retained. Merged HTML ecosystem flow + founder Q&A. |
| 2026-04-15 | 2.0 | Re-aligned with canonical files. PSS renamed, STL ladder upgraded to 10 levels, refill cadence added, MIN-chain noted. |
| 2026-04-14 | 1.0 | Initial PSS Master Plan (legacy 9-level STL). |
