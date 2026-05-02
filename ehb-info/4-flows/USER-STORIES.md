# EHB User Stories — Formal Specs

> **Status:** v1.0 · 2026-04-30
> **Format:** *As a [role], I want [goal], so that [benefit]*
> **Used by:** Engineering planning, QA test cases, UX design.

---

## 🎯 Coverage

9 user types × 10-15 stories each = **~110 user stories**

User types per `4-flows/EHB-USER-TYPES.md`:
1. Buyer · 2. Seller · 3. Service Provider · 4. Rider · 5. Inspector
6. Franchise Owner · 7. Employer · 8. Job Seeker · 9. DMO Officer

---

## 1. BUYER

### B-01 — First-time discovery
**As a** new visitor unfamiliar with EHB,
**I want** to understand what EHB is in 30 seconds,
**so that** I decide whether to sign up.
- Acceptance: Landing page hero + 3 trust pillars + 1 CTA visible above fold.

### B-02 — Sign up
**As a** new buyer, **I want** to register with email + phone, **so that** I can transact.
- Path: `/signup` → email + password → OTP phone → PSS L2.

### B-03 — Browse industries
**As a** buyer, **I want** to see all 38 industries on one page, **so that** I find what I need.
- Path: `/industries` → filterable grid → click → `/industries/<code>`.

### B-04 — Search products/services
**As a** buyer, **I want** to search across industries, **so that** I find specific items.
- Path: `/gosellr/search?q=...&industry=...&min_stl=...`.

### B-05 — Trust check before buying
**As a** buyer, **I want** to see seller's STL + PSS + CRB on the product card, **so that** I assess trust.
- Acceptance: Every product card shows seller STL chain (product × seller × company × owner).

### B-06 — Add to cart + checkout
**As a** buyer, **I want** simple cart + escrow checkout, **so that** my money is safe.
- Path: `/cart` → `/checkout` → payment method → escrow lock confirmed.

### B-07 — Track order
**As a** buyer, **I want** real-time tracking, **so that** I know delivery status.
- Path: `/orders/<id>` → live status timeline.

### B-08 — Confirm delivery
**As a** buyer after receiving goods, **I want** to confirm delivery, **so that** seller gets paid.
- Action: `/orders/<id>/confirm` → escrow release → review prompt.

### B-09 — Leave review
**As a** buyer, **I want** to rate quality/communication/speed/value/trust (5 dims), **so that** future buyers benefit.
- Path: `/orders/<id>/review`.

### B-10 — File complaint
**As a** buyer if goods are bad, **I want** to file a complaint, **so that** DMO investigates.
- Path: `/orders/<id>/complaint` → tier auto-classified → DMO queue.

### B-11 — Request refund
**As a** buyer, **I want** to request refund within cooling period, **so that** I'm protected.
- Path: `/orders/<id>/refund` → auto-approve if in window, else DMO.

---

## 2. SELLER

### S-01 — Onboard as seller
**As a** new seller, **I want** to upgrade from buyer to seller, **so that** I can list products.
- Path: `/profile/upgrade-to-seller` → CRB exam (industry) → STL recompute.

### S-02 — Pass CRB exam
**As a** seller, **I want** to take CRB exam for my industry, **so that** I can list.
- Path: `/crb/exams/<industry>` → 50 MCQ + 5 practical → results.

### S-03 — List a product
**As a** seller, **I want** to add product with photos + pricing + variants, **so that** buyers can purchase.
- Path: `/gosellr/list` → form → DMO mode (FAST/STRICT) → live.

### S-04 — Manage inventory
**As a** seller, **I want** to track stock per SKU, **so that** I don't oversell.
- Path: `/seller/products` → bulk edit → low-stock alerts.

### S-05 — Accept order
**As a** seller, **I want** to accept (or decline) incoming orders, **so that** I control workload.
- Path: `/seller/orders/<id>` → accept/decline within SLA.

### S-06 — Mark fulfilled
**As a** seller after preparing goods, **I want** to mark fulfilled, **so that** rider picks up.
- Path: `/seller/orders/<id>` → mark ready.

### S-07 — Dashboard view
**As a** seller, **I want** one dashboard showing earnings + orders + STL + complaints, **so that** I run my business.
- Path: `/seller` (10 sections per `Seller.md`).

### S-08 — Withdraw earnings
**As a** seller, **I want** to withdraw to bank/wallet, **so that** I get paid.
- Path: `/wallet/withdraw` → bank/JazzCash → confirm.

### S-09 — Refill subscription
**As a** seller wanting to keep STL level, **I want** to schedule refills, **so that** I don't drop level.
- Path: `/seller/refill` → exam schedule + auto-pay.

### S-10 — Respond to review
**As a** seller, **I want** to reply to reviews, **so that** my side is heard.
- Path: `/seller/reviews/<id>/reply`.

### S-11 — Open dispute (against buyer)
**As a** seller in case of buyer abuse, **I want** to file complaint, **so that** I'm protected.
- Path: `/seller/disputes/new` → DMO triage.

### S-12 — Apply for STL boost
**As a** seller, **I want** to buy STL boost, **so that** I rank higher temporarily.
- Path: `/seller/boost` → pay $50-400 → 30-day boost.

---

## 3. SERVICE PROVIDER (subset of seller, services not goods)

### SP-01 — Find local franchise for verification
**As a** service provider needing physical CRB, **I want** to find nearest franchise, **so that** I can complete L4+ verification.
- Path: `/crb/verify-physical` → cascade lookup (Sub L8/9/10 → Master → Country auto).

### SP-02 — Schedule physical verification
**As a** SP, **I want** to book 3-90 day practical at franchise, **so that** I get verified.
- Path: `/crb/verify-physical/<franchise-id>` → calendar → confirm.

### SP-03 — Submit work proof (video/photo)
**As a** SP after delivery, **I want** to upload proof, **so that** I can show work.
- Path: `/seller/orders/<id>/proof` → upload → CRB scoring.

---

## 4. RIDER

### R-01 — Onboard as rider
**As a** new rider, **I want** to register vehicle + license, **so that** I get pickups.
- Path: `/rider/onboard` → vehicle + license + KYC → CRB-Rider exam.

### R-02 — Set availability
**As a** rider, **I want** to toggle online/offline, **so that** I control hours.
- Path: `/rider` → toggle button.

### R-03 — Accept pickup
**As a** rider, **I want** to accept nearby orders, **so that** I earn.
- Path: `/rider/orders` → live map → accept.

### R-04 — Navigate + deliver
**As a** rider, **I want** turn-by-turn directions, **so that** I deliver fast.
- Path: `/rider/orders/<id>/navigate` → embedded map.

### R-05 — Confirm delivery
**As a** rider, **I want** to mark delivered + collect signature, **so that** I get paid.
- Path: `/rider/orders/<id>/deliver` → photo + signature → confirm.

### R-06 — Earnings tracking
**As a** rider, **I want** to see commission per order + weekly total, **so that** I know my income.
- Path: `/rider/earnings`.

---

## 5. INSPECTOR (CRB officer in field)

### I-01 — Pickup inspection job
**As a** CRB inspector, **I want** to see assigned inspections, **so that** I plan my day.
- Path: `/inspector/queue` → list with location + priority.

### I-02 — Conduct on-site visit
**As an** inspector, **I want** mobile checklist + GPS proof, **so that** I document compliantly.
- Path: `/inspector/visits/<id>` → checklist → photos with EXIF.

### I-03 — Submit report
**As an** inspector, **I want** to score the verification + sign off, **so that** CRB is updated.
- Path: `/inspector/visits/<id>/submit` → CRB level recommendation.

### I-04 — Trusty wallet check
**As an** inspector, **I want** to see my locked EHBGC + capacity, **so that** I know request availability.
- Path: `/inspector/trusty-wallet`.

---

## 6. FRANCHISE OWNER

### F-01 — Apply for franchise
**As an** aspirant, **I want** to apply for Sub/Corp/Master/Country tier, **so that** I run a territory.
- Path: `/franchise/apply` → form + capital lock → DMO approval.

### F-02 — View territory dashboard
**As a** franchise, **I want** to see my territory's revenue/users/orders, **so that** I manage operations.
- Path: `/franchise/dashboard`.

### F-03 — Manage sub-franchises
**As a** Master, **I want** to oversee my Sub franchises, **so that** I delegate territory.
- Path: `/franchise/subs` → list + actions.

### F-04 — Earnings + payouts
**As a** franchise, **I want** to see my revenue split (40/15/25/15/5), **so that** I track income.
- Path: `/franchise/earnings`.

### F-05 — Verify users (L8+ only)
**As a** Sub L8+, **I want** to receive verification requests, **so that** I earn 45% fee.
- Path: `/franchise/verifications` → queue.

### F-06 — Capital lock management
**As a** franchise, **I want** to monitor my locked EHBGC, **so that** I maintain status.
- Path: `/franchise/capital`.

---

## 7. EMPLOYER (JPS)

### E-01 — Post a job
**As an** employer, **I want** to post a job with skills/location/salary, **so that** I find candidates.
- Path: `/jobs/post` → form → STL gate → live.

### E-02 — Review applications
**As an** employer, **I want** to see ranked candidates by STL+match, **so that** I shortlist.
- Path: `/jobs/<id>/applications` → AI-ranked list.

### E-03 — Conduct interview
**As an** employer, **I want** to schedule interview + take notes, **so that** I evaluate.
- Path: `/jobs/<id>/applications/<aid>/interview`.

### E-04 — Hire + start contract
**As an** employer, **I want** to hire + lock salary in escrow, **so that** worker starts.
- Path: `/jobs/<id>/hire/<aid>` → contract + escrow.

### E-05 — Approve milestone
**As an** employer, **I want** to approve milestones, **so that** worker gets paid in tranches.
- Path: `/jobs/contracts/<cid>/milestone/approve`.

---

## 8. JOB SEEKER (JPS)

### J-01 — Build profile
**As a** seeker, **I want** to build CV with skills + certifications + STL, **so that** employers see me.
- Path: `/jobs/profile`.

### J-02 — Apply to jobs
**As a** seeker, **I want** to apply with one click, **so that** I get into shortlists.
- Path: `/jobs/<id>` → apply → AI match score visible.

### J-03 — Track applications
**As a** seeker, **I want** to see all my applications + status, **so that** I follow up.
- Path: `/jobs/applications`.

### J-04 — Take skill exam (CRB)
**As a** seeker, **I want** to take CRB exams, **so that** my skills are verified.
- Path: `/crb/exams/<skill>`.

### J-05 — Receive salary in escrow
**As a** seeker after hiring, **I want** salary in escrow, **so that** I get paid securely.
- Path: `/jobs/contracts/<cid>` → milestone payouts.

---

## 9. DMO OFFICER (admin)

### D-01 — View work queue
**As a** DMO officer, **I want** to see prioritized cases, **so that** I work efficiently.
- Path: `/dmo/queue` (filtered by industry/severity/type).

### D-02 — Investigate complaint
**As a** DMO officer, **I want** to see all evidence + history, **so that** I judge fairly.
- Path: `/dmo/complaints/<id>`.

### D-03 — Apply decision
**As a** DMO officer, **I want** to approve/reject/escalate/penalize, **so that** I close cases.
- Path: `/dmo/complaints/<id>/action`.

### D-04 — Review fraud signals
**As a** DMO officer, **I want** AI-flagged fraud cases, **so that** I act on prevention.
- Path: `/dmo/up-guard`.

### D-05 — Approve franchise application
**As a** DMO Senior, **I want** to approve franchise applications, **so that** territories get filled.
- Path: `/dmo/franchise/applications`.

### D-06 — Override STL (rare)
**As a** DMO Manager, **I want** to override an individual STL with reason + audit, **so that** corrections happen.
- Path: `/dmo/stl/<userId>/override`.

### D-07 — Configure feature flags
**As a** Founder, **I want** to toggle features, **so that** I control rollout.
- Path: `/dmo/settings/flags`.

### D-08 — Daily brief
**As a** Founder, **I want** auto-generated daily brief, **so that** I focus on top priorities.
- Path: `/dmo/daily-brief` (AI-generated).

---

## 📊 Story Coverage Summary

| Role | # stories | Status |
|------|----------:|:------:|
| Buyer | 11 | ✅ |
| Seller | 12 | ✅ |
| Service Provider | 3 | ✅ |
| Rider | 6 | ✅ |
| Inspector | 4 | ✅ |
| Franchise Owner | 6 | ✅ |
| Employer (JPS) | 5 | ✅ |
| Job Seeker (JPS) | 5 | ✅ |
| DMO Officer | 8 | ✅ |
| **Total** | **60** | |

Each story:
- Has acceptance criteria
- Maps to a route/page
- Maps to a service/event in code

## Linked
- `EHB-USER-TYPES.md` — user type definitions
- `USER-FLOWS-COMPLETE.md` — flow narratives
- `15-ui-system/PAGES-LIST.md` — page mapping
