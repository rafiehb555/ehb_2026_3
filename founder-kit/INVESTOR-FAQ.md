# Investor FAQ — Common Questions + Strong Answers

> **Use:** Demo prep · objection handling · written email replies
> **Tone:** Confident, specific, honest about unknowns

---

## 🎯 PRODUCT QUESTIONS

### **Q1. Why won't Daraz / Foodpanda copy STL?**

**A:** Three reasons.

1. **Architectural cost** — STL requires PSS + CRB + DMO infrastructure
   on day 1. Daraz would have to redesign their entire backend. Not a
   feature, it's a foundation.
2. **Trust loss** — even if Daraz adds a "trust score", users won't trust
   Daraz to compute trust. Polkadot anchor is third-party verification.
3. **Speed of execution** — by the time Daraz ships, we'll have 5
   countries + 1M users + portable reputation. Switching cost = whole
   identity history.

> **Counter-strength:** EHB is purpose-built around trust. They added
> trust as a feature; we built the platform on it.

---

### **Q2. Trust scores fail in low-trust markets. Why will EHB's work?**

**A:** Existing trust scores fail because they're either:
- Self-reported (Yelp/Trustpilot — gameable)
- Platform-controlled (Daraz can edit Daraz reviews)
- Single-dimension (just "rating")

**EHB STL is different:**
- **3-dimensional** — identity + skills + behavior
- **MIN-chain rule** — weakest dimension caps the whole score (anti-game)
- **Polkadot-anchored** — EHB itself can't tamper
- **Industry-gated** — high-risk industries require deeper verification

We've already coded 58 gold-master regression tests on the STL formula —
ANY change has to pass them. Provable consistency.

---

### **Q3. What if Polkadot fails / pivots?**

**A:** Adapter pattern. Our `BlockchainAdapter` abstracts Polkadot. Migration
to Cosmos / Solana / private chain = 1 file change. ~3 days work.

We chose Polkadot because:
- Substrate makes custom parachains trivial
- Lower fees than Ethereum
- Pakistan-friendly (no sanctions concerns)

But we're not married to it. The trust system itself works on any
blockchain or even centralised audit log.

---

### **Q4. AI hype — what does AI actually do here?**

**A:** Specific, narrow, useful AI:

1. **Industry matcher** — "I want a doctor" → routed to WMS L4+ verified
   providers nearby. Saves user 10 clicks.
2. **Fraud detection** — pattern recognition (velocity spikes, fake reviews,
   duplicate accounts). Already wired.
3. **Listing quality** — auto-rate listings on completeness/honesty.
4. **Daily founder brief** — generates morning summary from real metrics.

We don't claim "AI revolution." We claim AI saves time on specific tasks.

---

### **Q5. Why 37 industries? Won't focus be better?**

**A:** Two answers:

1. **We're not building 37 industries.** We're building 1 platform that
   serves 37 industries via configuration. The differential cost of
   industry #38 is near zero.

2. **Phase 1 launches with 5** (GSM, OLS, HPS, OBS, JPS, ELS). The other
   32 are sleeping in code, ready to wake up. Focus is on Pakistan + 5
   industries first.

The 37-industry framing is for narrative + roadmap. Operationally,
we're laser-focused.

---

## 💰 BUSINESS QUESTIONS

### **Q6. CAC — Customer Acquisition Cost?**

**A:** Estimated $0.50–$2 per signup in Pakistan.

Sources:
- Referral program — 95% target via friends-and-family virality (incentive: $5 each)
- Influencer marketing — micro-influencers in PK at $500/post
- Founder Twitter / LinkedIn — free
- Press — first-mover trust angle gets free coverage

LTV: Year-1 average user generates $7-10 GMV → $0.70-$1 EHB revenue.
LTV/CAC > 1 in Year 1, > 4 by Year 2.

---

### **Q7. Take rate — is 10% defensible?**

**A:** Yes — and competitive.

| Competitor | Take rate |
|------------|-----:|
| Daraz | 8-15% |
| Foodpanda | 25-30% |
| Stripe | 2.9% (payments only) |
| Uber | 25% |
| Airbnb | 12-15% |
| **EHB** | **10%** |

We're mid-market. 10% allows the 5-tier franchise distribution while still
beating Foodpanda and matching Daraz. Sellers get 70% (vs Daraz's 65-70%).

---

### **Q8. How do you reach 1M users in Year 2?**

**A:** Funnel + math:

```
Pakistan: 2026 internet users = 130M
Target: 1% market = 1.3M users
Y1 close: 165K (validated funnel works)
Y2 ramp: 1.5M users (10x via referral + paid)
```

Path:
- Pakistan word-of-mouth (35% YoY ecommerce growth)
- 5-tier franchise = 200+ local champions promoting
- Influencer + press partnerships
- Pakistani diaspora seeding UAE/SA/UK

If we miss 1M and only hit 500K → still profitable, still attractive
for Series A.

---

### **Q9. Where's your moat after launch?**

**A:** 4 layers of moat:

1. **Data moat** — STL history is non-portable to competitors. After 1 year,
   our top sellers have years of trust score that they LOSE if they leave.
2. **Network moat** — buyers + sellers + franchises + riders all on EHB.
   Multi-sided.
3. **Code moat** — 1,500+ lines of production code, 58 STL tests, full
   adapter pattern. Reproducing = 12-18 months for a competitor.
4. **Brand + community moat** — Pakistan-first, Pakistani-founded,
   Pakistani-loyalty. Daraz is Chinese-owned (Alibaba); EHB is local.

---

### **Q10. Pakistan regulators — too risky?**

**A:** We've researched. Specific risks + mitigations:

| Risk | Mitigation |
|------|-----------|
| SBP blocks fintech license | We use partner (JazzCash) for payment regulation |
| FBR tax issues | CA from Day 1 · NTN registered |
| Data law (PDPA) | Compliance docs ready · data residency in PK |
| Industry licenses (medical, legal) | CRB system gates these · users provide local licenses |
| Crypto restriction | EHBGC = utility token, not investment vehicle |

Pakistan is actually MORE founder-friendly than US for fintech in 2026
(SECP simplified company registration, SBP open banking).

---

## 👥 TEAM QUESTIONS

### **Q11. Why are you the right founder?**

**A:**

> "I've spent [X months] building this from scratch. I architected the
> entire system, wrote the spec for 38 industries, designed the STL formula,
> and shipped 1,500+ lines of working code. I've made every single
> decision so far — what to build, what NOT to build, what's defensible,
> what's filler.
>
> What I haven't done yet: scale a team, run a Series A, manage 100+
> employees. That's why I'm raising — I want strong advisors and 5
> hires who fill those gaps. I'll learn ops, but I'll always know the
> product better than anyone."

---

### **Q12. Solo founder — risky?**

**A:** Yes — and we're solving it:

- **Hiring co-founder caliber engineer Day 1** — they'll have 1.5%
  equity allocation
- **3 advisor slots** with 0.25-0.5% each (regulatory · scale · ME expansion)
- **Spousal stability** — yes, family supports the venture

Solo founder is statistically OK for capital efficiency. We're not
forcing a co-founder for vanity.

---

### **Q13. Hiring in Pakistan — talent scarcity?**

**A:** Counter-intuitive: Pakistan has STRONG senior tech talent for our
needs:
- LUMS / NUST / FAST graduates working at Microsoft / Google in PK
- Diaspora returning (post-COVID trend)
- Salaries 10-15× cheaper than US for equivalent skill

We're using HR Ways agency (proven track record). Senior dev hires within
4 weeks at PKR 250-400K/mo (~$900-1400 USD).

---

## 🎯 ASK QUESTIONS

### **Q14. Why $500K and not $1M / not $250K?**

**A:**

- **$250K** is too small. We'd run out before MEV (minimum executable launch).
- **$1M** is too big. Hard to give meaningful equity ($1M @ $3M pre = 25%) — kills future options.
- **$500K** = 14% pool, 18-month runway, exact gap to revenue-funded growth.

After this round: if we hit $1M monthly revenue by Month 12, Series A is
$3-5M at $25M+ pre-money. Clean.

---

### **Q15. Valuation — how did you arrive at $3M pre-money?**

**A:** Comparables:

| Stage | Pakistan startup | Pre-money |
|-------|------------------|----------:|
| Pre-seed (idea) | Various | $1-2M |
| Pre-seed (built) | Tag · Bagallery | $2-3M |
| **EHB (built + 99% complete)** | | **$3M** |
| Seed (with traction) | Foodpanda PK | $5M+ |

We're between pre-seed and seed. Built but not yet launched. $3M reflects
that we've eliminated 80% of execution risk.

If you think it's high: I'm open to discussion. If you think it's low —
I won't go higher because that puts unfair pressure on us at Series A.

---

### **Q16. SAFE vs equity round?**

**A:** SAFE for speed:
- Standard YC SAFE document
- $3M valuation cap
- 20% discount to next round
- Pro-rata rights for $50K+ checks
- No board seat at this stage

If you need an equity round (priced) — happy to convert SAFE on signing.

---

### **Q17. Exit strategy?**

**A:** Three paths (we won't promise any):

1. **Series A → Series B → IPO** at $1B+ in 5-7 years (unicorn path)
2. **Strategic acquisition** by Daraz/Alibaba/SoftBank at $50-200M in 3-5 years
3. **Profitable lifestyle business** — at $40M annual net by Y3, this is
   already attractive without exit

We're optimizing for path #1. Founder is committed long-term.

---

### **Q18. What if Year 1 numbers miss?**

**A:** Bear scenario:

```
Bear Y1: 50K users (vs 165K target) · $500K revenue (vs $1.17M)
Bear Y3: $15M revenue (vs $75M)
Still profitable. Still attractive for Series A.
```

Even in bear, Pakistan-only EHB is a defensible business. We've stress-tested
the model.

If we miss by 50%, you have a $5M company instead of $25M company at
Series A. Still 1.7x for seed investors at $3M pre.

If we miss by 80%, we'd close down — but that's <5% probability given
99% code complete.

---

## 🚀 CLOSING QUESTIONS

### **Q19. What's the minimum check?**

$5K for friends and family. $10K for angels. $25K+ for funds.

### **Q20. When does the round close?**

We're targeting close by **[date - 8-12 weeks from start]**. Earlier
commits get better terms (no premium, but they get pro-rata in Series A).

### **Q21. Can I see the cap table?**

Yes — share if asked: founder 100% pre-funding · 14% pool to seed · 5%
team pool · 86% founder retains pre-Series A.

### **Q22. References?**

[Provide 3 references: technical advisor, mutual contact, beta tester or
early user once we have them.]

---

## ⚠️ DON'T-SAY List

❌ "We're going to be the next [Daraz/Uber/Amazon]"
❌ "Our TAM is $5T" (without explaining)
❌ "We don't have competition"
❌ "Trust me — the product is amazing"
❌ Talking too much about features, not enough about money

✅ DO say specific numbers, real risks, honest unknowns, concrete next steps.

---

## Linked
- `INVESTOR-PITCH-DECK.html` — visual story
- `DEMO-SCRIPT.md` — live walkthrough
- `INVESTOR-EMAIL-TEMPLATES.md` — outreach
- `FINANCIAL-MODEL.md` — full numbers
- `INVESTOR-TARGET-LIST.md` — who to email
