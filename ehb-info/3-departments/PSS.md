# PSS — Proof & Security System

**Status:** Canonical spec (v3.0) · Comprehensive rewrite with 10-level ladder, 9 user types, L0 pre-level, 9-step verification flow, EHB responsibility %, token lock mechanics · 2026-04-18

**Related:** `STL.md` (composite formula), `CRB.md` (certification ladder), `DMO.md` (governance), `EHB-PSS-MASTER-PLAN.md` (implementation detail)

> **Naming:** PSS = "Proof & Security System" (canonical). Legacy "Personal Security System" deprecated. Merged from HTML ecosystem flow + founder Q&A + existing canonical files.

---

## 1. Purpose

PSS is the **identity + security verification backbone** of the entire EHB platform. Every user (buyer, seller, rider, inspector, franchise owner, admin) must pass PSS verification gates before accessing platform features.

PSS does NOT compute STL by itself — it feeds a **0–40 point component** into the composite STL formula:

```
STL_Score = (PSS × 0.4) + (CRB × 0.3) + (DMO × 0.3)
Final_STL = MIN(Score, lowest_component + 1)
```

PSS alone determines only the PSS level (L1–L10); CRB and DMO each have their own 10-level ladders. Only **EHB-STL** shows named labels (FREE/BASIC/NORMAL/STANDARD/ADVANCED/HIGH/PRO/VIP/ELITE/SUPREME). PSS/CRB/DMO display as **level numbers only**.

---

## 2. PSS 10-Level Ladder

| Level | Name | Verification Required | Use Case |
|-------|------|----------------------|----------|
| **L0** | FREE / Pre-Level | Email signup only, no verification | Browse, search, explore only. Outside PSS system. |
| **L1** | Email Verified | Email confirmation + CAPTCHA | Can list products (unverified badge). Limited visibility. |
| **L2** | Phone Verified | OTP verification from registered phone | Phone added to profile. Higher visibility. |
| **L3** | ID Verified | CNIC/Passport OCR + NADRA cross-check | Government identity confirmed. Basic KYC. |
| **L4** | Face Verified | Face match with ID document (liveness + anti-spoof) | Biometric match. Higher trust. |
| **L5** | Address Verified | Address proof (utility bill/bank statement) + postal verification | Physical location confirmed. |
| **L6** | Liveness Check | Live video/motion anti-spoof (realtime challenge) | Continuous behavioral verification. |
| **L7** | Device Binding | Device fingerprint lock + geofencing + impossible-travel detection | Multi-account block (max 2 per device). |
| **L8** | Video KYC | Full video call with PSS agent or AI | Live verification by human. Highest manual verification. |
| **L9** | Continuous Monitoring | Ongoing behavior + fraud tracking + periodic re-verification | Flagged automatically if anomalies detected. |
| **L10** | Full Verified | All checks complete + clean 90-day history + zero fraud flags | Supreme level. Unrestricted access. Eligible for premium tiers. |

**Key:** L0 is **free but outside PSS**. No verification = no growth beyond browsing. L1+ are **PSS levels** (0–40 points to STL).

---

## 3. PSS 27 Verification Features (5 Categories)

### Category A: Identity Verification (6 features)

| # | Feature | What | EHB Use | Phase |
|---|---------|------|---------|-------|
| 1 | ID Verification | Passport/CNIC/license scan + OCR + NADRA cross-check | ALL users at signup (STL L3 min) | 1 |
| 2 | Liveness Detection | Blink/smile/head turn anti-spoofing AI | Required with ID, prevents fake accounts | 1 |
| 3 | AML Screening | Sanctions/terrorist/PEP lists (OFAC, UN, EU) | Sellers L3+, franchise, high-value buyers 50K+ | 1 |
| 4 | Address Verification | Utility bill/bank statement + OCR + optional CRB physical | Sellers, franchise, riders | 1 |
| 5 | Ongoing ID Monitoring | Post-onboarding continuous checks, expiry alerts | All verified users | 2 |
| 6 | Questionnaires | Custom onboarding questions by role | Dynamic forms per user type/industry | 1 |

### Category B: Financial Monitoring (2 features)

| # | Feature | What | EHB Use | Phase |
|---|---------|------|---------|-------|
| 7 | Transaction Monitoring | Suspicious money patterns, amounts, frequency | All wallet/escrow/affiliate transactions | 1→2 |
| 8 | Crypto Monitoring | Blockchain wallet risk, mixer/tumbler detection | EHBGC transactions, Polkadot integration | 2-3 |

### Category C: Business Verification (1 feature)

| # | Feature | What | EHB Use | Phase |
|---|---------|------|---------|-------|
| 9 | KYB (Know Your Business) | SECP check, director verification, legitimacy | Corporate/Master franchise, Manufacturer/Wholesaler, 500K+ monthly | 1 |

### Category D: Behavioral & Device Intelligence (7 features)

| # | Feature | What | EHB Use | Phase |
|---|---------|------|---------|-------|
| 10 | Behavior Monitoring | Bot detection, account takeover, impossible travel | Fake orders, affiliate fraud, inspector manipulation | 1→2 |
| 11 | Face Auth 2FA | Face scan for sensitive operations | Withdrawals >10K, escrow release, STL changes | 1 |
| 17 | Applicant Scoring | Composite 0-100 score from ALL PSS data | Direct 0-40 mapping to STL formula | 1→2 |
| 18 | Device Intelligence | Fingerprint, multi-account (max 2), emulator, root detect | Fraud prevention, device binding | 1 |
| 19 | Email Risk Scoring | Disposable/temporary/fake email detection | Signup gate, disposable = blocked | 1 |
| 20 | Phone Risk Scoring | Burner/VoIP/SIM swap detection, PTA database | Signup gate, SIM swap = freeze | 1 |
| 21 | IP Scoring | VPN/proxy/Tor/datacenter, geo-mismatch | VPN = warning, Tor = blocked for finance | 1 |

### Category E: Compliance & Screening (11 features)

| # | Feature | What | EHB Use | Phase |
|---|---------|------|---------|-------|
| 12 | Travel Rule | FATF crypto sender/receiver info sharing | Cross-border EHBGC transfers | 3 |
| 13 | Non-Doc Verification | NADRA/credit bureau/telco records | Alternative path, speeds onboarding | 1→2 |
| 14 | Reusable KYC | Verify once, use across all 32 industries | Single PSS vault, user controls sharing | 1 |
| 15 | Age Estimation | AI face age vs. ID DOB cross-check | Mismatch = flag, child safety | 2 |
| 16 | Video Identification | Live video call with PSS agent or AI | L8+ STL, Country/Corporate franchise, inspector cert | 2 |
| 22 | Counterparty Screening | Transfer recipients vs. sanctions lists | Real-time on every outbound transfer | 1 |
| 23 | Institution Screening | Bank sanctions check | When adding payout bank accounts | 1 |
| 24 | Payment Details Screening | NLP scan of payment notes | Suspicious content detection | 2 |
| 25 | Suspicious Payment Details | Structuring/smurfing/wash detection | Rule engine + ML on metadata | 1→2 |
| 26 | Periodic Verifications | Scheduled re-verification by STL level | L1-3=annual, L4-6=semi-annual, L7+=quarterly | 1 |
| 27 | Regulatory Reports | SAR filing to FMU (State Bank Pakistan) | Auto-draft from flags → compliance review | 1→2 |

---

## 4. PSS → STL Point Mapping (40 points max)

| Bucket | Features | Points |
|--------|----------|--------|
| Identity Core | ID(1) + Liveness(2) + Address(4) | 15 |
| Financial Compliance | AML(3) + Transaction(7) + Counterparty(22) | 8 |
| Business | KYB(9) + Questionnaire(6) | 10 |
| Digital Trust | Email(19) + Phone(20) + Device(18) + IP(21) | 4 |
| Premium Verification | Video(16) + Non-doc(13) | 3 |
| **TOTAL** | **27 features** | **40** |

---

## 5. 9 User Types + PSS Requirements

| Role | Description | PSS Min Level | Required Features | Notes |
|------|-------------|---|-----------------|-------|
| **Buyer** | Purchases products/services | L1 | Email, Phone (L2 for high-value orders >50K) | Basic KYC for marketplace access |
| **Seller** | Sells products (under Services Provider) | L3 | ID, Liveness, AML, Address, Device | Enhanced verification for merchant onboarding |
| **Service Provider** | Provides services (freelance/professional) | L3 | ID, Liveness, AML, Address, Video (L8 preferred) | Same as Seller + video for credibility |
| **Rider** | Delivery partner | L3 | ID, Liveness, Address, Phone, Device, Face 2FA | Enhanced for public-facing role |
| **Inspector** | CRB physical verification agent | L4 | ID, Liveness, AML, Address, Video, Device, Face 2FA, Background check | Full verification + authorization |
| **Franchise** | Manages area (Online/City/State/Country tiers) | L5 | All identity + KYB + AML + Video + Continuous monitoring | Highest standard for authority role |
| **Employer** | Posts jobs (JPS system) | L2 | Email, Phone (L3 recommended for hiring) | Basic for job posting access |
| **Job Seeker** | Applies for jobs (JPS system) | L1 | Email (L3 recommended for profile visibility) | Basic for applications |
| **Production Company** | Manufactures products (own STL) | L4 | All + KYB + AML + ongoing monitoring | Highest verification for supply chain authority |
| **Admin** | EHB internal staff (inside DMO) | L8 | ID, Liveness, Face 2FA, Device, IP, Background check, 2FA mandatory | NOT a separate user type — role inside DMO only |

**Key Rules:**
- One PSS = all roles (single identity, multiple roles allowed)
- Multiple accounts NOT allowed per identity (device binding enforced)
- Admin is **DMO-only**, not a public user type

---

## 6. L0 / FREE Users

- **What:** Entry-level, zero verification. Email signup only.
- **Allowed:** Browse, search, explore, read reviews
- **NOT allowed:** Orders, selling, services, wallet access, affiliate earnings
- **UI:** Every industry page shows separate "⚠️ Free Zone Products" section (user can explore what L0 offers)
- **CTA Button:** "Get Verified" or "Unlock Full Access" linking to PSS flow
- **EHB Responsibility:** 0% (user opted out of verification)

---

## 7. EHB Responsibility Ladder

**Definition:** "EHB guarantees this provider is X% safe for deal."

| EHB-STL Level | EHB Responsibility % | Badge | Meaning |
|---|---|---|---|
| L0 FREE | 0% | ⚠️ UNVERIFIED | User bears 100% risk |
| L1 | 10% | 🔶 Minimal Trust | Email only — high-risk tier |
| L2 | 20% | 🟡 Basic Trust | Phone verified — low risk |
| L3 | 40% | 🟠 Moderate Trust | ID verified — medium risk |
| L4 | 55% | 🟠 Good Trust | Face verified — moderate risk |
| L5 | 70% | 🟢 Advanced Trust | Address verified — lower risk |
| L6 | 80% | 🟢 High Trust | Liveness checked — low risk |
| L7 | 90% | 🟢 Professional | Device bound — very low risk |
| L8 | 95% | 🟢 VIP Trust | Video KYC — highest trust |
| L9 | 98% | ✅ Elite Trust | Continuous monitoring active |
| L10 | 100% | ✅ Fully Verified | All checks complete + clean history |

**Usage:** Displayed on product cards as overlay badge. Buyers see the responsibility percentage before placing orders.

---

## 8. Personal STL = Master Key (FREEZE + PARTIAL CAP)

**Rule:** If personal PSS is low, all derived STLs (seller, product, service, franchise) **FREEZE** and **CANNOT GROW**.

- **Freeze:** Existing levels do NOT drop
- **Partial Cap:** Cannot grow above personal PSS level
- **Path Forward:** User must fix personal profile first (take additional verification steps)
- **Example:** Personal PSS at L3 → Seller STL capped at L3 (until personal reaches L4+)

**Why:** The weakest identity link in the chain determines the chain's strength.

---

## 9. Token Lock (EHBGC) for STL Stability

Locking coins in the wallet enforces commitment. Locked coins cannot be withdrawn.

| PSS Level | Lock Amount (EHBGC) |
|---|---|
| L0, L1 | 0 (no lock required) |
| L2 | 50 |
| L3 | 100 |
| L4 | 250 |
| L5 | 500 |
| L6 | 1,000 |
| L7 | 2,500 |
| L8 | 5,000 |
| L9 | 10,000 |
| L10 | 25,000 |

**Lock Removal Flow:**
1. User requests unlock
2. 15-day grace period + warning notifications
3. If unlock proceeds: STL downgrade triggered (loses 2 levels)
4. If user cancels: unlock reversed, lock reinstated

**Resilience:** Even if fraud detected later, locked coins provide recovery fund.

---

## 10. Upgrade System

- **95% AI Auto-verification** — ID OCR, address cross-check, liveness anti-spoof, device fingerprint, behavioral scoring
- **5% Manual Review** — CRB physical inspection cases only (fraud suspicion, high-value approvals)

**Flow:** User submits documents → AI checks → If OK (≥95% confidence), auto-upgrade, else → review queue → CRB officer decides

---

## 11. Downgrade Conditions

Any one of these triggers immediate downgrade or downgrade queue:

1. **Fraud detected** → instant drop to L0 (ban list + blacklist)
2. **Document expiry** → PSS level drops 2 levels (refill required)
3. **Complaints (3+ + 3 weeks unresolved)** → -2 levels
4. **Inactivity** → -1 level per month (no transaction, no activity)
5. **Token lock removed** → 15-day grace period, then -2 levels
6. **Behavior anomaly** → flagged for review (impossible travel, account takeover attempts)

**Weekly Warning System:** User gets tasks/notifications to resolve complaints before downgrade executes.

---

## 12. Product Display

**Format on marketplace cards:**

```
⭐ 4.7  🏅 Trusted  STL: L6  🛡️ 80% Safe
```

Breakdown:
- **⭐ Rating** — customer review average
- **🏅 Badge** — custom per-platform badge (e.g., "Trusted", "Expert")
- **STL: Level** — numeric level (L0–L10)
- **🛡️ EHB Responsibility %** — percentage guarantee from ladder above

---

## 13. Ranking Engine

Within search results, order by (priority):

1. **STL Level** (L10 first → L0 last)
2. **Rating** ⭐ (5.0 → 1.0)
3. **Complaints** (fewer = higher)
4. **Order volume** (more sales = higher)
5. **Delivery speed** (faster = higher)
6. **Response time** (faster replies = higher)
7. **Location** (nearby boost)
8. **Freshness** (new active users get 2-week boost)

**Boost Zone:** L7+ ("Top Ranking" section) gets 3x visibility multiplier in search.

---

## 14. 9-Step Verification Flow (from HTML ecosystem + founder Q&A)

### Step 01: Platform Calls PSS

Sub-platform (GoSellr, OLS, JPS, etc.) calls PSS via `@ehb/pss-client` shared lib with entity data (product, service, profile). Only entry point to PSS.

```
POST /api/stl/submit
{
  entity_id, entity_type, platform_id, user_id,
  entity_data: { title, description, area, ... }
}
```

### Step 02: PSS Creates Request

PSS creates `stl_request` document with `status=pending`. Returns `stl_request_id` to platform.

### Step 03: Run PSS Feature Checks

Load criteria set → evaluate identity (NADRA, liveness, AML) → device (fingerprint, multi-account) → behavior (impossible travel, velocity)

### Step 04: Compute PSS Score

```
PSS_Score = sum(passed_feature_weights) / sum(all_weights) × 100
Range: 0–100% (mapped to 0–40 STL points)
```

### Step 05: Apply Rule Engine

Evaluate platform rules in priority order (first-match-wins):

```
score ≥ 95%  → auto-approve (L10)
score ≥ 80%  → auto-approve (L3–L7)
score ≥ 60%  → franchise review (L3–L8)
score ≥ 40%  → CRB review (L3–L9)
score < 40%  → auto-reject (reason provided)
```

### Step 06: Route per First-Match-Wins Priority

Rule Engine executes one of four routing actions:
- **auto_approve** → emit `stl.decision (approved)`
- **franchise** → emit `franchise.review_requested`
- **crb** → emit `crb.review_requested` (note: CRB used for high-stakes oversight)
- **reject** → emit `stl.decision (rejected)`

### Step 07: Apply Source Caps

Each verification source has a ceiling:

| Source | Cap |
|--------|-----|
| PSS auto | L5 ADVANCED |
| Franchise reviewer | L8 VIP |
| CRB physical inspection | L9 ELITE |
| DMO council (manual) | L10 SUPREME |

### Step 08: Webhook Delivery (Bull/Redis Push + Pull Fallback)

PSS queues HMAC-SHA256 signed webhook to platform callback URL via Bull/Redis.

**Payload:**
```json
{
  "event": "stl.decision",
  "stl_request_id": "req_abc",
  "entity_id": "prod_123",
  "decision": "approved",
  "stl_level": 6,
  "decided_by": "rule_engine",
  "decided_at": "2026-04-18T10:00:00Z",
  "rejection_reason": null
}
```

**Fallback:** If Redis down, seller clicks "Refresh Status" → platform polls `GET /api/sq/:entityId/status` → PSS returns authoritative status → written locally.

### Step 09: Persist + Audit Log + Signed Webhook

Record all state changes in immutable `audit_logs` (actor, timestamp, old/new values). Entity becomes searchable/visible on platform.

---

## 15. CRB Officer Authority (Edit Before Decide)

CRB officers reviewing a submission can **EDIT submitted entity data** before making approval/rejection decision. Edits logged in audit trail. This allows:

- Correcting typos / minor data entry errors
- Clarifying ambiguous fields
- Fast-tracking borderline cases without forcing resubmission

**Example:** Address misspelled → CRB officer fixes → approves (vs. forcing seller to resubmit).

---

## 16. Franchise Rules

Four tiers with different capital requirements and order caps:

| Tier | Territory | Min. Capital (EHBGC) | Order Cap | Min PSS L. |
|------|-----------|---|---|---|
| Online | Pan-country | 5,000 | Unlimited | L5 |
| City | Urban area (metro) | 20,000 | 500/day | L5 |
| State | Province/region | 50,000 | 1000/day | L6 |
| Country | National authority | 100,000+ | Unlimited | L7 |

**Activation Rules:**
- Booking: no STL required (pre-approval)
- Activation: minimum PSS L5
- Low-performing franchises (3 warnings) → REMOVED
- Removal: 80% capital refund + 20% penalty
- Replacement: system auto-selects high-STL candidates or top performers from queue

---

## 17. Phase Strategy

| Phase | Focus | Platforms |
|-------|-------|-----------|
| **Phase 1** | E-commerce heavy lift | GoSellr (full PSS integration) |
| **Phase 1.5** | Jobs + Light services | JPS + basic service listings (OLS) |
| **Phase 2** | High-stakes sectors | Medical (HPS, requires L5+), Legal (OLS), Travel (AGTS) |
| **Phase 3** | Blockchain + Finance | Crypto monitoring (Feature 8), cross-border (Travel Rule) |

---

## Changelog

| Date | Ver | Change |
|---|---|---|
| 2026-04-18 | 3.0 | **Complete rewrite from v2.0.** Added: 10-level PSS ladder (L0–L10) with names, 9 user types + Admin as DMO-only role, L0 FREE pre-level (outside PSS, 0% EHB responsibility), EHB Responsibility % ladder (0–100%), token lock table by level with 15-day grace + downgrade, personal STL master key (freeze + cap rule), downgrade conditions (fraud, expiry, complaints, inactivity), 9-step verification flow from HTML ecosystem, rule engine thresholds (95/80/60/40%), source caps per verifier, CRB officer edit authority, franchise 4-tier system with capital/cap table, phase strategy. Merged founder Q&A + HTML ecosystem flow. All 27 features + point mapping retained. |
| 2026-04-13 | 2.0 | Deep rewrite — 27 verification features fully defined, STL point allocation, role-based requirements. |
| 2026-04-11 | 1.0 | Created from initial upload. |
