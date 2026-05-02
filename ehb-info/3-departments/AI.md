# EHB Dev AI — Intelligent Advisory System (single brain)

> **Renamed 2026-04-30 by founder:** Department officially called **"EHB Dev AI"** (the single AI brain serving all 38 industries via config).

> **Version:** 1.1  
> **Created:** 2026-04-12  
> **Build status:** ~40% complete

---

## 1. Purpose

The AI Department powers EHB's intelligent layer — providing recommendations, fraud detection, automated advisory, and smart matching across all 32 industries. The AI system always ADVISES; the DMO/platform CONFIRMS. AI never makes final decisions alone.

## 2. Core Rule

**AI advises → Platform/DMO confirms.**  
AI can suggest, recommend, flag, and score — but approval, rejection, and enforcement are always human or DMO-validated.

## 3. Six Flagship AI Modules (Phase 1)

### 3.1 AI Lawyer (OLS - Legal Services)
- Case triage and classification
- Legal document drafting assistance
- Risk analysis and probability scoring
- Contract review and clause flagging
- Legal research across jurisdictions
- Integration: OLS module, CRB legal verification

### 3.2 AI Diagnosis (WMS - Medical Services)
- Symptom-based disease prediction with confidence scoring (95%+ accuracy target)
- Treatment recommendations with risk assessment
- Medical report explanation in simple language
- Emergency protocol automation (severity detection)
- Cardiology specialization: ECG monitoring, biomarker analysis
- Integration: WMS module, doctor referral system

### 3.3 AI Resume Builder (JPS - Jobs)
- CV generation from JPS profile data
- Optimization for specific job postings
- Skill gap analysis with learning recommendations
- Cover letter generation
- Integration: JPS module, job matching

### 3.4 AI Course Tutor (HPS - Education)
- Adaptive learning paths based on student performance
- Personalized study plans
- Progress tracking and weak-area identification
- Practice question generation
- Integration: HPS/OBS modules, CRB certification prep

### 3.5 AI Business Advisor (Commerce/GoSellr)
- SME consulting and growth recommendations
- Market analysis and pricing suggestions
- Inventory optimization
- Customer behavior analysis
- Integration: GoSellr, DMO analytics

### 3.6 AI Fraud Detector (DMO - Governance)
- Transaction pattern analysis (anomaly detection)
- Review abuse detection (fake reviews, rating manipulation)
- Up-Guard automated monitoring
- Seller collusion detection
- Account takeover prevention
- Integration: DMO Up-Guard, PSS complaint system, STL scoring

## 4. AI Widget (Always-Visible Assistant)

### Placement
- Fixed position: bottom-right corner of every page
- Always visible: persists across all navigation
- Z-index: 50 (above page content)

### Appearance
- Collapsed: 56px circular floating button with EHB brand gradient + pulsing glow
- Expanded: 360x480px chat panel, slides up from button

### Input Modes
- **Text:** Standard chat input field
- **Voice:** Microphone button, Web Speech API for voice-to-text
- Visual waveform animation during voice listening

### Capabilities
- Answer questions about EHB platform
- Navigate user to any page ("take me to GoSellr")
- Show STL level status on request
- Explain verification steps
- Provide industry-specific help based on current page context
- Suggest services based on user behavior

### Contextual Behavior
| User's Current Page | AI Widget Context |
|--------------------|--------------------|
| Home | General platform help, industry overview |
| GoSellr | Product search, order help, seller tips |
| Medical (WMS) | Symptom checker, doctor finder, appointment help |
| Legal (OLS) | Case triage, document help, lawyer matching |
| Education (HPS) | Course finder, study tips, exam prep |
| Jobs (JPS) | Job search, resume tips, interview prep |
| DMO Dashboard | Governance help, STL explanation, policy info |
| Wallet | Transaction help, coin lock explanation, escrow status |

## 5. AI Marketplace (Future)

- Plugin marketplace with 100+ AI tools
- Custom agent creation for businesses
- Paid AI plugins with subscription model
- Business intelligence dashboards
- Advanced analytics and reporting

## 6. Technical Architecture

### Current Stack
- Backend: Node 20 + Express + OpenAI API (port 8080)
- Models: GPT-4 for complex tasks, GPT-3.5 for simple queries
- Confidence scoring on all AI outputs

### Future Stack
- Custom fine-tuned models per industry
- scikit-learn for recommendation algorithms
- TensorFlow for fraud detection models
- On-device inference for mobile (privacy-sensitive features)

## 7. API Endpoints

- `POST /api/ai/chat` — General AI chat
- `POST /api/ai/recommend` — Get recommendations
- `POST /api/ai/diagnose` — Medical symptom analysis
- `POST /api/ai/legal` — Legal case triage
- `POST /api/ai/resume` — Resume generation
- `POST /api/ai/fraud-check` — Fraud analysis
- `POST /api/ai/adjust` — Adjust AI parameters (admin)
- `GET /api/ai/health` — AI service health check

## 8. Safety & Compliance

- All AI outputs include confidence scores
- Medical AI always includes "consult a real doctor" disclaimer
- Legal AI always includes "not legal advice" disclaimer
- Fraud detection has appeal process (DMO manual review)
- User data processed per privacy policy (data minimization)
- Voice recordings NOT stored (processed and discarded)

---

*EHB Technologies (Pvt.) Ltd. — AI Department · v1.0 · 2026-04-12*
