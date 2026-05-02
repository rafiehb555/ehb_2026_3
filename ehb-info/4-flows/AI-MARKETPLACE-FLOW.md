# AI Marketplace — User Journey Flow

> **Status:** Canonical v1.0 · 2026-04-30
> **Linked:** `15-ui-system/AI-MARKETPLACE-UIUX.md` · `services/ai/src/routes/chat.js`

---

## 🎯 Entry Points (4)

Users land on AI Marketplace from:
1. **Direct URL** — `/ai-marketplace` (marketing campaigns)
2. **Sidebar nav** — "AI" link in user dashboard
3. **Industry page** — "Use AI to find" CTA on each industry
4. **Chat bubble** — floating AI helper (always-on, top-right)

---

## 🚶 Primary User Journey (logged-in user)

### **Path 1 — "I have a question" (most common)**

```
1. User lands on /ai-marketplace
2. Sees conversational hero
3. Types: "Find me a doctor in DHA"
4. Hits Enter → calls POST /api/ai/route
5. AI classifies intent = "service" + industry = WMS
6. Routes to → /ai-marketplace/service-matcher?industry=WMS
7. Shows ranked list of L4+ doctors
8. User clicks one → /seller/<id>
9. Books consultation → wallet escrow → STL boost
```

**Time-to-value:** < 30 seconds.

---

### **Path 2 — "Browse what AI can do"**

```
1. User lands on /ai-marketplace
2. Scrolls past hero
3. Browses 5 use-case sections (Match · Detect · Generate · Analyze · Answer)
4. Clicks "Listing Quality Checker" card
5. Goes to /ai-marketplace/listing-checker
6. Pastes their listing
7. AI returns score 0-100 + 3 suggestions
8. User edits listing → reposts
9. STL +0.1 (engagement)
```

---

### **Path 3 — "I'm stuck, need help"**

```
1. User clicks chat bubble (top-right) anywhere on platform
2. Mini AI window opens
3. User: "Why is my STL not going up?"
4. AI: classifies = "stl" intent
5. Pulls user's actual STL data
6. Returns: "Your CRB is L2. Take exam X to reach L3 → STL boost +1"
7. Inline button: "Take CRB exam now"
8. User clicks → /crb/exams
```

---

## 🔓 Gating Flow (STL/quota check)

Before every AI call:

```
User clicks "Try AI service X"
       ↓
Check 1: User logged in?
   → No → /signin?next=/ai-marketplace/X
       ↓ Yes
Check 2: User STL ≥ service minimum?
   → No → Show "Reach L<n> to unlock" + path to upgrade
       ↓ Yes
Check 3: Free quota remaining today?
   → No → Show "0/3 free used. Upgrade or wait 4h"
       ↓ Yes
Execute AI call
   → Success → Show result + decrement quota
   → Fail → Retry 1× → fall back to safe message
```

---

## 💸 Payment Flow (Pro users)

```
User on AI service page
       ↓
Quota exhausted (3/3 used)
       ↓
Modal: "Continue with Pro? $0.20/call"
       → Yes → wallet.charge($0.20) → call AI → return result
       → No → "Wait 4h" or "Upgrade STL for free quota"
```

---

## 🎨 UI States (per card / per service)

### **Default (logged out)**
- Card shows service info
- CTA: "Sign up to try"

### **Logged-in, STL too low**
- Card shows service info
- Lock icon overlay
- CTA: "Reach L<n> to unlock" → links to STL improvement path

### **Logged-in, quota available**
- Card fully active
- CTA: "Try free (2/3 left today)"
- Click → service detail page

### **Logged-in, quota exhausted**
- Card greyed
- Status: "Today's free calls done"
- CTA: "Pro $0.20/call" or "Reset in 4h"

### **Pro user**
- Card fully active
- Status: "Pro · unlimited"
- Track usage in /wallet

---

## 📊 Backend Flow (under the hood)

```
Frontend                         Backend
────────                         ───────
POST /api/ai/route               → ai.route.js
   { text: "find doctor" }       → detectIntent() (keyword)
                                  → if confidence < 0.6 → llmFallback()
                                  → personalizeForUser()
                                  ← returns intent + route + gate

POST /api/ai/chat                → services/ai/chat.js
   { message: "...", ask: "" }   → keyword classifier
                                  → if low confidence → callLLM(OpenAI)
                                  → 5s timeout, 1 retry
                                  ← returns reply + tokens + model

Track:
   metrics.aiIntent(intent, source)
   metrics.aiLlmFallback() if used
   wallet.charge() if pro
```

---

## 🔁 Repeat Flow (returning user)

If user has used AI before:
- Show "Recent" row on top (last 5 services used)
- Show personalized recommendations based on their industry + STL
- "Continue where you left off" if conversation in progress

---

## 🎯 Conversion Funnel

```
1,000 visitors land on /ai-marketplace
   → 800 stay > 30 sec       (80% engagement)
   → 400 try at least 1 AI    (40% activation)
   → 200 try 3+ AIs           (20% deep engagement)
   → 50 hit quota limit        (5% upsell candidates)
   → 10 buy Pro                (1% paid conversion)
```

Target: 1% paid conversion = $0.10 ARPU/visitor in Pakistan.

---

## ✅ Acceptance Tests

- [ ] Empty state (no history)
- [ ] First-time user signup-required
- [ ] Quota shown correctly (3/3 → 2/3 → 1/3 → locked)
- [ ] STL-gated services show lock + path
- [ ] Pro upgrade flow works end-to-end
- [ ] AI failures fall back to keyword reply
- [ ] Mobile sticky bottom CTA
- [ ] RTL works for Urdu/Arabic placeholders

---

## Linked
- `15-ui-system/AI-MARKETPLACE-UIUX.md` — visual design
- `15-ui-system/PAGE-DATA-MAP.md` — data per page
- `5-specs/EHB-API-SPEC.md` — API contracts
- `services/ai/src/routes/chat.js` — chat endpoint
