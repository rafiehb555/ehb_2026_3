# EHB · AI Capabilities (concrete · what AI exactly does)

> **Status:** Canonical v1.0 · 2026-04-30
> **Purpose:** Convert abstract "AI brain" into concrete inputs/outputs/actions per capability.

---

## 🔥 Master rule

> **AI = advisor · platform = final authority. Confidence-scored output. Human review for high-stakes.**

---

## 28 AI capabilities (categorized)

### 🛡 Verification AI (4 capabilities)

#### 1. Document Verifier
- **Input:** uploaded ID/passport image
- **Process:** OCR + cross-check with vendor (NADRA/Jumio/Onfido) + fake detection (metadata/EXIF)
- **Output:** `{verified: bool, confidence: 0-1, issues: [...]}`
- **Action:** if confidence ≥ 0.9 auto-approve · 0.7-0.9 human review · <0.7 reject
- **STL gate:** triggers PSS L3 → L5 transition

#### 2. Liveness Anti-Deepfake
- **Input:** selfie video (5-10 sec)
- **Process:** face detection + liveness (blink/turn) + deepfake classifier
- **Output:** `{is_live: bool, deepfake_probability: 0-1}`
- **Action:** if deepfake_probability > 0.3 reject · request fresh video

#### 3. Voice Biometric (L8+)
- **Input:** voice recording (10 sec)
- **Process:** voice fingerprint + deepfake check
- **Output:** `{voice_match: bool, fingerprint_id}`
- **Action:** required for PSS L8+ tier

#### 4. Stock-Image Detector
- **Input:** product/service photos
- **Process:** reverse image search + AI-image detector + EXIF check
- **Output:** `{is_genuine: bool, sources_found: [...]}`
- **Action:** if stock detected, flag listing for seller correction

### 🚨 Behavior & Risk AI (4 capabilities)

#### 5. Fraud Forecaster
- **Input:** user's recent activity (orders, reviews, complaints, login patterns)
- **Process:** ML classifier predicting fraud probability next 30 days
- **Output:** `{fraud_risk_30d: 0-1, signals: [...]}`
- **Action:** if >0.7, escalate to DMO Senior · 0.4-0.7 watch list · <0.4 normal

#### 6. Anomaly Detector
- **Input:** real-time event stream (orders, transactions, logins)
- **Process:** spike detection · pattern deviation · cluster analysis
- **Output:** `{anomalies: [...], severity}`
- **Action:** alert Up-Guard if T6 cluster pattern

#### 7. Buyer Trust Score
- **Input:** buyer's history (orders, complaints, review accuracy)
- **Process:** weighted score 0-100
- **Output:** `{bts: 0-100, tier: trusted/reliable/watched/high-risk}`
- **Action:** sellers see BTS · low-BTS triggers prepay requirement

#### 8. Behavior Pattern Analyzer
- **Input:** user history + cohort
- **Process:** identify suspicious patterns · cross-account links
- **Output:** `{patterns: [...], related_users: [...]}`
- **Action:** flag for DMO close-watch

### 🎓 Coaching & Engagement AI (4 capabilities)

#### 9. STL Coach Chatbot
- **Input:** user question about STL/upgrade
- **Process:** LLM with EHB knowledge base
- **Output:** `{answer, suggested_actions, expected_stl_gain}`
- **Action:** personalized advice (e.g., "complete CRB exam → +5 STL")

#### 10. Personalized Refill Reminder
- **Input:** user's refill schedule + past compliance
- **Process:** optimal-timing notification generation
- **Output:** `{message, send_at, channel}`
- **Action:** sends 7d, 3d, today reminders with personalized content

#### 11. STL Auditor (transparency)
- **Input:** user STL state
- **Process:** explain why STL is X (which source caps it · what to improve)
- **Output:** human-readable explanation
- **Action:** displayed when user clicks "Why is my STL X?"

#### 12. Personalized Path Advisor
- **Input:** user profile + market data
- **Process:** suggest best industry/category for user
- **Output:** `{recommendations: [{industry, fit_score, expected_earnings}]}`
- **Action:** displayed on STL dashboard

### ⚖ Quality & Dispute AI (4 capabilities)

#### 13. Skill Examiner
- **Input:** exam topic, candidate answers
- **Process:** adaptive question selection · auto-grade
- **Output:** `{score: 0-100, weak_topics: [...], pass: bool}`
- **Action:** issues CRB cert if pass

#### 14. Quality Scorer
- **Input:** product/service photos/videos
- **Process:** image classifier · quality metrics
- **Output:** `{quality_score: 0-100, issues: [...]}`
- **Action:** filter low-quality listings

#### 15. Pre-Dispute Mediator
- **Input:** complaint details from buyer
- **Process:** suggest fair settlement before formal dispute
- **Output:** `{suggested_resolution, both_parties_response_needed}`
- **Action:** if both accept, dispute auto-resolves (no DMO needed)

#### 16. Translation
- **Input:** review/complaint/message text
- **Process:** AI translation (UR/EN/AR/HI/PS/SD)
- **Output:** translated text
- **Action:** for fair cross-language review

### 🛒 Marketplace AI (4 capabilities)

#### 17. Industry Recommender
- **Input:** user STL profile + interests
- **Process:** match to best industries
- **Output:** `{industries: [{code, fit_score}]}`
- **Action:** displayed when user signs up · or when looking to expand

#### 18. Pricing Advisor
- **Input:** seller's product/service · market data
- **Process:** market scan + price optimization
- **Output:** `{suggested_price, market_range, confidence}`
- **Action:** suggested when seller lists or updates listing

#### 19. Earnings Forecaster
- **Input:** user STL + historical activity
- **Process:** time-series prediction
- **Output:** `{30d_forecast, 90d_forecast, factors}`
- **Action:** displayed on user dashboard

#### 20. Service Match Engine
- **Input:** buyer's service request
- **Process:** match to best provider (STL · location · price · availability)
- **Output:** `{matches: [{provider_id, match_score}]}`
- **Action:** auto-assign if confidence ≥ 0.85 · else top-N for buyer choice

### 🤖 AI Marketplace modules (6 — STL-gated)

#### 21. Resume Helper (L3+)
- AI-powered CV builder
- Interview coach
- Optimized for jobs market

#### 22. AI Tutor (L3+)
- Curriculum-aligned subject tutor
- Adaptive learning path
- Practice questions

#### 23. Business Advisor (L5+)
- Growth strategy
- Pricing recommendations
- Market entry advice

#### 24. Lawyer AI (L5+)
- Contract review
- Legal research
- Jurisdiction-aware

#### 25. Diagnosis AI (L7+)
- Symptom triage
- Differential diagnosis
- DOCTOR-REVIEWED disclaimer

#### 26. Fraud Detection (L9+)
- Transaction anomaly
- Seller risk scoring
- For DMO operators

### 🛡 DMO Operator AI (2 capabilities)

#### 27. Complaint Triage
- **Input:** all open complaints
- **Process:** prioritize by severity · assign to DMO staff
- **Output:** prioritized queue
- **Action:** routes to right DMO tier

#### 28. Suspicion Cluster Detector
- **Input:** user behavior graph
- **Process:** graph analysis for fraud rings
- **Output:** `{clusters: [...], confidence}`
- **Action:** Up-Guard alert for senior DMO

---

## 🤖 AI service infrastructure

```
AI request →
   ↓
API gateway (rate-limit per user)
   ↓
Confidence check (model-specific threshold)
   ↓
   ├─ if confidence ≥ threshold → execute action
   └─ if below → human review queue
   ↓
Audit log (input + output + decision)
   ↓
Response with confidence score
```

---

## Confidence thresholds per capability

| Capability | Auto-action threshold | Human review threshold |
|---|:---:|:---:|
| Document Verifier | 0.9 | 0.7-0.9 |
| Liveness | 0.95 | 0.8-0.95 |
| Fraud Forecaster | 0.85 | 0.6-0.85 |
| Anomaly Detector | 0.8 | 0.5-0.8 |
| Recommend Engine | 0.7 | 0.5-0.7 |
| Smart Matching | 0.85 | 0.7-0.85 |
| Diagnosis AI | 0.95 + doctor review | mandatory doctor |
| Lawyer AI | 0.9 + lawyer review | mandatory lawyer |
| Skill Examiner | 0.8 | 0.6-0.8 |
| Pricing Advisor | suggestion only (no auto) | always |

---

## Privacy + ethics

- Personal data NOT used for model training (without consent)
- Anonymized aggregates only
- AI advisory always with disclaimer
- High-stakes (medical/legal/financial) require human professional
- Bias monitoring + correction
- Right to explanation (user can request "why?")

---

## Implementation

```
services/ai/
├── document-verifier/
├── liveness/
├── fraud-forecaster/
├── anomaly-detector/
├── stl-coach/
├── pre-dispute-mediator/
├── industry-recommender/
├── pricing-advisor/
├── earnings-forecaster/
├── service-match/
├── moderation/
└── ai-marketplace/
    ├── resume-helper/
    ├── tutor/
    ├── business-advisor/
    ├── lawyer/
    ├── diagnosis/
    └── fraud-detection/
```

Each module: own folder, own model, own API endpoint.

---

## Cross-references

- AI master: `3-departments/AI.md`
- Recommendation: `RECOMMENDATION-ENGINE.md`
- Fraud: `FRAUD-DETECTION.md`
- Smart Matching: `SMART-MATCHING.md`
- Core Engine: `_settings/EHB-CORE-ENGINE.md §A`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial AI capabilities · 28 capabilities documented · concrete I/O |
