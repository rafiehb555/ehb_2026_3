# EHB · CORE ENGINE (system brain + control tower)

> **Status:** Canonical v1.0 · 2026-04-30
> **Purpose:** One unified engine that controls AI, Blockchain, Tools, and System Flows across all EHB industries
> **Why critical:** Without this single source of truth, the system fragments — duplicate AI, duplicate wallets, duplicate flows. With it: clean, scalable, no redundancy.

---

## 0. The 1-line truth

> **"Every industry plugs into ONE core engine. No duplication. No silos. Single brain."**

If anyone (developer, AI agent, founder) ever proposes to "build separate AI for X" or "separate wallet for Y" → reject. Point them to this file.

---

## 1. Core Engine Overview

```
EHB Core Engine = AI + Blockchain + Automation + Shared Services

Goal:
- Duplicate tools eliminate
- Central AI intelligence
- Single blockchain layer
- Reusable modules
```

---

## 2. Core Modules (system heart) — 5 modules

### 🟢 A) AI CORE ENGINE

```
Name: EHB-AI-BRAIN
Code: services/ai/

Used in:
- Fraud detection
- Recommendation
- Matching (buyer ↔ seller)
- Risk scoring
- Support chatbot
- Pricing intelligence
- Industry verification
- Document authenticity
- Liveness anti-deepfake
- Anomaly detection

Rule:
❌ Har jagah alag AI nahi banega
✅ Sirf ek central AI use hoga
```

**Single AI brain** powers all 28 AI touchpoints (per `6-audits/EHB-STL-AUDIT-AND-IMPROVEMENTS.md §5`). Each industry/feature consumes via API.

### 🔵 B) BLOCKCHAIN CORE

```
Name: EHB-CHAIN
Base: Polkadot
Code: services/api/src/services/blockchainService.js

Used for:
- Escrow lock
- Transaction proof
- Reputation logs
- Dispute history
- Smart contracts
- STL milestone anchors
- Franchise contracts
- Slashing events
- KYC certificate hashes
- Audit trail (everything)

Rule:
❌ Har module apni chain nahi banayega
✅ Single ledger for all industries
```

### 🟡 C) PAYMENT + WALLET CORE

```
Name: EHB-WALLET
Code: services/api/src/services/walletService.js + adapters/payment/

Includes:
- User wallet (multi-currency)
- Escrow system
- Franchise wallet
- Treasury wallet
- Fees system
- EHBGC token
- Lock vault
- Yield streaming
- Slashing destination

Rule:
✅ Sab industries same wallet use karengi
✅ Multi-currency adapter pattern (one interface, many providers)
```

### 🔴 D) TRUST SYSTEM CORE

```
Name: EHB-TRUST
Code: services/api/src/services/{stlService,pssService,crbService,dmoService}.js

Includes:
- STL levels (L1-L10 ladder)
- PSS verification (KYC/KYB)
- CRB skill + exams
- DMO governance
- Ratings (multi-aspect + reviewer-weighted)
- Buyer Trust Score (BTS)
- Badges
- Penalties + slashing
- MIN-chain rule (4-layer)
- Industry boost multipliers

Rule:
✅ Trust system universal hoga
✅ One STL formula, applies to ALL entities (user/seller/product/service/franchise)
```

### 🟣 E) FLOW ENGINE (auto-system)

```
Name: EHB-FLOW-ENGINE
Code: services/api/src/services/flowEngine.js (to be built)

Controls:
- Order flow (universal 9-step)
- Payment flow
- Dispute flow
- Refund flow
- Escrow logic
- Verification flow
- Franchise onboarding flow
- Promotion flow (Micro → Sub → ...)

Rule:
❌ Har industry apna flow nahi banayegi
✅ Central flow engine reuse hoga · industry-specific only differs in CRB checklist + DMO mode + AI prompts
```

---

## 3. Master Flow (auto-system)

```
USER →
SEARCH →
AI MATCHING →
ORDER CREATE →
PAYMENT →
ESCROW LOCK (BLOCKCHAIN) →
SERVICE DELIVERY →
AI MONITORING →
COMPLETION →
RELEASE FUNDS →
RATING + STL UPDATE →
ANCHOR ON-CHAIN
```

Universal across all 38 industries. Industry-specific only changes:
- CRB checklist (what gets verified)
- DMO mode (FAST/BALANCED/STRICT/CRITICAL)
- AI prompts (domain knowledge)
- UI layout (industry-specific fields)
- Compliance per country

---

## 4. AI Flow (detailed sub-pipeline)

```
User Input →
AI Analysis (intent + context) →
Fraud Check →
Best Match Suggest →
Price Suggest →
Order Monitoring →
Anomaly Detection →
Dispute Prediction →
Auto Resolution Suggest
```

Per `10-ai-system/` files:
- Recommendation Engine
- Fraud Detection
- Smart Matching
- Plus 25 more AI touchpoints (verification, behavior, coaching, quality)

---

## 5. Blockchain Flow

```
Order Created →
Hash Generated →
Escrow Locked (smart contract) →
Transaction Recorded →
Completion Proof Stored →
Final Settlement →
Audit Anchor (Polkadot batch)
```

Daily batches reduce transaction cost while maintaining trail.

---

## 6. Reusable Components (cost-saving)

These exist ONCE and used everywhere:

| Component | Single source | Used by |
|---|---|---|
| Search Engine | `services/api/.../searchService.js` | Every page with search |
| Notification System | `services/api/.../notificationService.js` | All real-time events |
| Auth System | `services/api/.../authService.js` | Every authenticated route |
| Dashboard framework | `apps/web/components/dashboard/` | All role dashboards |
| KYC adapter | `services/api/src/adapters/kyc/` | All identity verification |
| Payment adapter | `services/api/src/adapters/payment/` | All transactions |
| Email/SMS | `services/api/.../messagingService.js` | All comms |
| File upload | `services/api/.../uploadService.js` | All file handling |
| Image processing | `services/api/.../imageService.js` | All photos/videos |
| PDF generation | `services/api/.../pdfService.js` | All receipts/contracts |

**Result:**
- Lower cost (build once)
- Faster development (reuse)
- Fewer bugs (single fix propagates)
- Consistent UX (same patterns)

---

## 7. Anti-Duplication Rules (HARD)

```
❌ Har department apna AI nahi banayega
❌ Har industry apna wallet nahi banayegi
❌ Alag blockchain allowed nahi
❌ Duplicate notification systems prohibited
❌ Custom auth per industry forbidden
❌ Per-industry STL formula NOT allowed (one formula, with industry boost)

✅ Sab kuch CORE ENGINE se connect hoga
✅ New industry = adapter + config, NOT new infrastructure
✅ Adapter pattern for vendor swaps (KYC/payment/blockchain provider changes)
```

If a developer or AI agent proposes duplication:
1. Reject with reference to this file
2. Suggest using core module
3. If genuinely new module needed, add to Core Engine, then use everywhere

---

## 8. Industry Connection Model

Each industry connects to all 5 cores:

```
Industry (GSM / WMS / OLS / etc.)
   ↓
Connect to:
   - AI CORE       (recommendations, fraud, matching)
   - WALLET CORE   (payments, lock, escrow)
   - TRUST CORE    (STL, PSS, CRB, DMO)
   - FLOW ENGINE   (order/payment/dispute flows)
   - BLOCKCHAIN    (audit anchor)
```

Plus industry-specific layer:
- CRB checklist (what to verify)
- DMO mode (approval speed)
- AI prompts (domain knowledge)
- UI layout (industry fields)
- Compliance config (per country)

---

## 9. Performance Rules

```
AI response < 2 sec (p95)
Payment confirmation < 5 sec
Escrow lock instant (smart-contract)
Fraud detection real-time (< 100ms)
Search results < 300ms
Page load < 2.5 sec
API p99 < 500ms
```

If any rule violated for >5% of requests:
- Auto-alert ops team
- Auto-escalate after 1 hour
- DMO Senior reviews root cause

---

## 10. Security Layer

```
Multi-layer auth (per AUTH-SYSTEM.md)
Blockchain verification (immutable audit)
AI fraud detection (real-time)
Manual override (admin per RBAC)
End-to-end encryption (transit + rest)
Region-scoped data (per local laws)
```

Plus:
- Bank-level encryption (AES-256)
- Pen-test annually
- Bug bounty program
- Security threat model `5-specs/SECURITY-THREAT-MODEL.md` (TODO)

---

## 11. Admin Control

Per `4-flows/USER-ROLES-PERMISSIONS.md`:

```
Admin can:
- Change rules (config)
- Adjust AI behavior (prompts, thresholds)
- Control fees (per industry/region)
- Freeze accounts (with audit)
- Override disputes (DMO Council)
- Tune industry multipliers
- Mint/burn EHBGC (Founder only)
- Add new industries (Founder only)
```

Every admin action: logged + Polkadot anchored + reviewable.

---

## 12. Future Expansion (the magic)

```
New industry added →
No new system needed →
Just connect to CORE ENGINE
```

Steps to add new industry (in days, not months):

1. **Add to `3-departments/Industries.md`** with code + tier + DMO mode
2. **Create CRB checklist** for new industry (`3-departments/CRB.md`)
3. **Configure AI prompts** for industry domain
4. **Add UI fields** in industry sub-spec (`3-departments/industries/<CODE>.md`)
5. **Set compliance** per country
6. **Set industry multiplier** (`4-flows/INDUSTRY-STL-MULTIPLIER.md`)
7. **Map to franchise tiers** (`11-franchise/EHB-INDUSTRY-FRANCHISE-MAP.md`)
8. **Update REGISTRY.json**
9. **Launch** — uses existing infrastructure

No new database. No new wallet. No new AI. No new blockchain. Just config + adapters.

---

## 13. EXTRA improvements (founder approved or proposed)

### 🧠 A) AI Memory System

```
AI learns over time:
- User behavior patterns
- Fraud patterns
- Market trends per industry
- Successful match patterns
- Conversation context (per user)
```

Implementation: vector DB + per-user context persistence.

Privacy: anonymized aggregate · personal opt-in.

### 🔄 B) Auto-Optimization

```
AI improves system itself:
- Better matching (A/B test outcomes)
- Better pricing (market response)
- Faster resolution (learn from past disputes)
- Auto-tune thresholds (false positive minimization)
```

Continuous learning loop. DMO reviews major changes.

### 🌐 C) API-First Design

```
Every feature exposed as API
   ↓
Future apps connect easily
   ↓
Partners integrate in days
   ↓
EHB becomes platform-of-platforms
```

Public API roadmap:
- Phase-1: Internal use only
- Phase-2: Partner API (B2B)
- Phase-3: Public API + developer ecosystem

---

## 14. Module ownership map

| Core | File owner | Code path |
|---|---|---|
| AI Core | `3-departments/AI.md` + `10-ai-system/` | `services/ai/` |
| Blockchain Core | `3-departments/Blockchain.md` | `services/api/src/services/blockchainService.js` |
| Wallet Core | `3-departments/Wallet.md` + `Token.md` | `services/api/src/services/walletService.js` |
| Trust Core | `3-departments/STL.md` + `PSS.md` + `CRB.md` + `DMO.md` | `services/api/src/services/{stl,pss,crb,dmo}Service.js` |
| Flow Engine | `4-flows/` (universal) | `services/api/src/services/flowEngine.js` (TODO build) |

---

## 15. Health check (continuous)

These metrics MUST stay green:

| Health | Owner | Check |
|---|---|---|
| AI uptime | AI team | < 1% downtime/month |
| Blockchain anchor success | Tech team | > 99% batch success |
| Wallet reconciliation | Treasury | Daily 100% match |
| Trust formula tests | Tech team | 58/58 gold-master |
| Flow engine no-failures | Ops | < 0.1% flow stuck |

Failure of any → Founder notified within 1 hour.

---

## 16. Cross-references

- AI: `3-departments/AI.md` + `10-ai-system/`
- Blockchain: `3-departments/Blockchain.md`
- Wallet: `3-departments/Wallet.md` + `Token.md`
- Trust: `3-departments/STL.md` + `PSS.md` + `CRB.md` + `DMO.md`
- Flow: `4-flows/USER-FLOWS-COMPLETE.md` + `INDUSTRY-FLOWS.md` + `ORDER-FLOW.md`
- Industries: `3-departments/Industries.md`
- Franchise: `11-franchise/EHB-FRANCHISE-MODEL.md`
- Registry: `REGISTRY.json`

---

## Final result

```
System ban jata hai:
- Clean
- Scalable
- AI-powered
- Blockchain-backed
- No duplication
- API-first
- Auto-learning
- Future-proof
```

This single file = the spine of EHB. Every other file references it. Code quality is measured against it. New features pass through it.

---

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial Core Engine architecture · 5 cores · anti-duplication rules · 3 advanced additions (AI memory, auto-optimization, API-first) |
