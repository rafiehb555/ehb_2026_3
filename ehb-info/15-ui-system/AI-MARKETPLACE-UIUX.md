# AI Marketplace — UI/UX Design Spec

> **Status:** Canonical v1.0 · 2026-04-30
> **Owner:** Founder + Design + Frontend
> **Implementation:** `apps/web/app/ai-marketplace/page.tsx`

---

## 🎯 Design Decisions (locked)

| # | Decision | Choice | Why |
|---|----------|--------|-----|
| 1 | Layout style | **Conversational hero + trending below** | Modern · founder-feel · ChatGPT-familiar pattern |
| 2 | Service cards | **Big visual + output preview** | Demo-ready · investor-pitch friendly |
| 3 | STL integration | **Gate + incentive (both)** | Drives STL upgrades · clear unlock path |
| 4 | Categorization | **By use-case** | Match · Detect · Generate · Analyze · Answer |
| 5 | Pricing display | **Free 3/day + paid clear** | Transparent · no surprise charges |

---

## 🖼 Page Layout (top → bottom)

### **1. Conversational Hero (top, full-width)**

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│           Powered by EHB Dev AI                              │
│                                                              │
│      [💬 Ask anything · "Find me a doctor in DHA"  ]         │
│                                                              │
│      ↓  Try: "Best legal advice for tenant" · "Top sellers"  │
│                                                              │
│      Free 3/day · Premium unlimited · L4+ unlocks more       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

- Large search bar with placeholder examples
- Quick-prompt chips below
- STL-aware messaging
- Single CTA — "Ask"

### **2. Your AI Quota (if logged in)**

Small status card:
```
[● 2/3 free calls today · L3 STL]   [Upgrade ↗]
```

### **3. Trending Now (carousel/grid)**

Top 3 AI services this week with usage counts.

### **4. By Use-Case (5 sections)**

Each section is a horizontal scrolling row of big cards:

#### **🎯 Match** (helps you find)
- Industry Matcher — "What industry fits my need?"
- Service Matcher — "Top 5 sellers for X"
- Job Matcher (JPS) — "Which jobs fit my skills?"

#### **🔍 Detect** (helps you stay safe)
- Fraud Detector — "Is this seller suspicious?"
- Plagiarism Check — "Is this content original?"
- Listing Quality Checker — "Score my listing"

#### **✨ Generate** (helps you create)
- AI Cover Art — "Generate album cover"
- AI Master (audio) — "Master my track"
- Listing Copy Writer — "Write product description"

#### **📊 Analyze** (helps you decide)
- Dispute Summariser — "Summarize this case"
- Founder Daily Brief — "Today's priorities"
- Market Trend Analyzer — "What's selling in my area?"

#### **💬 Answer** (helps you understand)
- STL Explainer — "Why is my STL L3?"
- Onboarding Coach — "How do I get to L4?"
- Customer Support AI — "Help with my order"

### **5. Industry-Specific AI Block**

Mini-row showing AI specialized per industry — "Healthcare AI" · "Legal AI" · "Finance AI" etc.

### **6. Footer CTA**

```
Want unlimited AI? Reach STL L4 → unlock 50 calls/day
[Upgrade STL →]   [Become Premium →]
```

---

## 🎨 Visual Design Tokens

### Colors (per use-case)

| Use-case | Primary | Subtle bg | Use |
|----------|---------|----------|-----|
| Match | Purple `#7B6EF6` | `#7B6EF622` | Discovery |
| Detect | Red `#F05858` | `#F0585822` | Safety |
| Generate | Teal `#2BBFA0` | `#2BBFA022` | Creation |
| Analyze | Amber `#F0A030` | `#F0A03022` | Insight |
| Answer | Blue `#3b82f6` | `#3b82f622` | Help |

### Card anatomy

```
┌──────────────────────────────┐
│  [emoji icon, 32px]          │
│                              │
│  Service name                │  ← 16px / 500 weight
│  One-line description        │  ← 13px / 400, secondary
│                              │
│  ┌─────────────────────┐    │
│  │ Sample output       │    │  ← preview box
│  │ (1-2 lines)         │    │
│  └─────────────────────┘    │
│                              │
│  Free / 3 daily · L1+        │  ← cost + STL gate
│  [Try it →]                  │
└──────────────────────────────┘
```

Card size: ~280px wide × 220px tall · radius 12 · border 1px

### Hero variants (responsive)

- **Desktop (>1024px):** Big hero, multi-column trending
- **Tablet (768-1024px):** Hero + 2-col grid
- **Mobile (<768px):** Hero + single-col stack, sticky bottom CTA

---

## 📝 Content Library (paste-ready)

### Hero placeholder examples (rotate every 3 sec)
- "Find me a doctor in DHA Karachi"
- "Best lawyer for tenant dispute"
- "Top 5 sellers under L7 in GSM"
- "Is this listing high quality?"
- "Generate cover art for my song"
- "Why is my STL not increasing?"

### Service one-liners

| Service | Description |
|---------|-------------|
| Industry Matcher | Tell AI what you need — get the right industry instantly |
| Service Matcher | Top 5 verified providers for your need, ranked by STL |
| Fraud Detector | Check any seller's fraud-risk score before buying |
| Plagiarism Check | Verify content is original before listing |
| Listing Quality Checker | Score your listing 0-100 + improvement tips |
| AI Cover Art | Generate professional album/product art |
| AI Master | Auto-master your audio track to broadcast standards |
| Listing Copy Writer | Auto-write product descriptions in your language |
| Dispute Summariser | TL;DR of a complaint thread for officers |
| Founder Daily Brief | Your morning priorities in 5 bullets |
| STL Explainer | Plain-language guide to your trust score |
| Onboarding Coach | Step-by-step path to next STL level |

### CTA copy
- Primary: **"Try it free"**
- Locked (below STL): **"Reach L<n> to unlock"**
- Premium-only: **"Premium feature →"**
- Empty quota: **"Reset in 4h · Upgrade STL"**

### Empty states
- No history yet → "Ask your first question to see results here"
- All 3 quota used → "You've used today's free calls. Upgrade or wait 4h."
- Service down → "This AI is taking a quick break. Try again in a minute."

---

## 🎯 Pricing Tiers (visible on cards + filter)

| Tier | Cost | Quota | Who |
|------|-----:|-------|-----|
| **Free** | 0 | 3 calls/day | Everyone L1+ |
| **Pro** | $0.20/call | Unlimited | Pay-per-use |
| **Premium** | $50/mo | 1,000 calls/mo | Subscriptions |
| **Enterprise** | $500/mo | Unlimited | Business |

---

## 🛡 STL Gates per AI Service

Some AI services require minimum STL (anti-abuse + regulatory):

| Service | Min STL | Why gated |
|---------|:------:|-----------|
| Industry Matcher | L1 | Universal |
| Service Matcher | L1 | Universal |
| STL Explainer | L1 | Help feature |
| Listing Quality Checker | L1 | Universal |
| Fraud Detector (basic) | L2 | Verified buyer needed |
| Plagiarism Check | L3 | Prevents abuse |
| Listing Copy Writer | L3 | Prevents spam |
| AI Cover Art | L3 | Cost control |
| AI Master | L4 | Pro creator tool |
| Dispute Summariser | DMO_STAFF | Officers only |
| Founder Daily Brief | FOUNDER | Founder only |

---

## ✅ Acceptance Checklist (when implementing)

- [ ] Hero search bar with rotating placeholder
- [ ] Quick-prompt chips below hero (5 examples)
- [ ] STL/quota status card (logged-in users)
- [ ] Trending row (top 3 services)
- [ ] 5 use-case sections (Match · Detect · Generate · Analyze · Answer)
- [ ] Each card shows: icon · name · description · output preview · cost · STL gate
- [ ] Click card → `/ai-marketplace/<service>` detail page
- [ ] Empty/locked/quota-exceeded states handled
- [ ] Responsive (mobile sticky CTA)
- [ ] RTL support (for Urdu/Arabic)

---

## 📊 Success Metrics (track post-launch)

- Daily active AI users (DAU/MAU ratio)
- Avg calls per user per day
- Quota-exceed rate (signal for upselling)
- Free → Pro conversion rate
- Most-used services by industry
- AI satisfaction (5-star rating per call)

---

## Linked
- `services/ai/src/routes/chat.js` — chat endpoint
- `services/api/src/routes/ai.route.js` — intent classifier
- `ehb-info/10-ai-system/AI-PROMPTS.md` — prompt library
- `ehb-info/15-ui-system/UIUX-DESIGN-SYSTEM.md` — global tokens
- `apps/web/app/ai-marketplace/page.tsx` — implementation
- `AI-MARKETPLACE-FLOW.md` — user journey (next file)
