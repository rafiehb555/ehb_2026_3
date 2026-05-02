# RUN EHB LOCALLY — Windows Setup Guide

> **Goal:** Get the EHB Phase 1 demo running on your Windows PC in ~15 minutes.
> Three services: Web (port 3000) · API (5000) · AI (8080).

---

## 1. Prerequisites (One-Time Setup)

Install these if you don't have them (each is a Next-Next-Finish installer):

| Tool | Download | Check in PowerShell |
|------|----------|---------------------|
| **Node.js 20+** | <https://nodejs.org/en/download> (LTS) | `node --version` → v20 or v22 |
| **pnpm 9+** | After Node installs, run `npm install -g pnpm` | `pnpm --version` → 9.x |
| **Git** (optional, for version control) | <https://git-scm.com/download/win> | `git --version` |

### MongoDB — Pick ONE option:

- **Option A (easiest) — MongoDB Atlas (cloud, free tier):**
  1. Sign up at <https://www.mongodb.com/cloud/atlas/register>
  2. Create a free M0 cluster
  3. Create a DB user (username + password)
  4. Network access → "Allow access from anywhere" (0.0.0.0/0)
  5. Get the connection string (looks like `mongodb+srv://user:pass@cluster0.xxxx.mongodb.net/ehb_dev`)
  6. Paste it into `.env` as `MONGODB_URI`

- **Option B — Local MongoDB via Docker Desktop:**
  1. Install Docker Desktop: <https://www.docker.com/products/docker-desktop/>
  2. In PowerShell: `docker run -d --name ehb-mongo -p 27017:27017 mongo:7`
  3. `MONGODB_URI=mongodb://localhost:27017/ehb_dev`

- **Option C — Skip DB for now:** Leave `MONGODB_URI` blank. API runs in
  in-memory stub mode (good enough for Week 1 smoke testing).

### OpenAI API key (optional for Phase 1):

- Get from <https://platform.openai.com/api-keys>
- Paste into `.env` as `OPENAI_API_KEY`
- **Without a key**, AI Marketplace services return deterministic stub responses
  (good enough to verify routing works).

---

## 2. Auto-Setup (Recommended — Single Command)

Open PowerShell **as Administrator** in `D:\ehb_2026_3` and run:

```powershell
.\scripts\setup.ps1
```

This script will:

1. Check Node + pnpm versions
2. Copy `.env.example` to `.env` (if missing)
3. Run `pnpm install` at the repo root
4. Print next steps

If PowerShell blocks the script, run first:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

---

## 3. Manual Setup (If You Prefer)

```powershell
# 1. Navigate to project
cd D:\ehb_2026_3

# 2. Copy env file and edit with your keys
copy .env.example .env
notepad .env   # Fill MONGODB_URI and OPENAI_API_KEY (optional)

# 3. Install dependencies (takes 2–5 minutes first time)
pnpm install

# 4. Start all 3 services together (in separate terminals ideally)
pnpm dev
```

---

## 4. Start Services Individually (Recommended for Debugging)

Open **3 separate PowerShell windows**, each in `D:\ehb_2026_3`:

**Terminal 1 — API (port 5000):**
```powershell
pnpm dev:api
```
Expected output:
```
[API] MongoDB connected   (or: running without DB)
[API] EHB API listening on http://localhost:5000
```

**Terminal 2 — AI service (port 8080):**
```powershell
pnpm dev:ai
```
Expected output:
```
[AI] EHB AI listening on http://localhost:8080
```

**Terminal 3 — Web (port 3000):**
```powershell
pnpm dev:web
```
Expected output:
```
▲ Next.js 14.2.5
- Local:        http://localhost:3000
✓ Ready in 2.1s
```

Then open <http://localhost:3000> in your browser.

---

## 5. Verify Everything Works

### Test API

```powershell
curl http://localhost:5000/api/health
# Expected: {"status":"ok","service":"EHB API",...}

curl http://localhost:5000/api/stl/score/demo-user
# Expected: STL score object with level, breakdown

curl http://localhost:5000/api/franchise/pricing
# Expected: full 14-tier pricing matrix

curl http://localhost:5000/api/dmo/kpis
# Expected: dashboard KPI numbers
```

### Test AI service

```powershell
curl http://localhost:8080/api/health
# Expected: {"status":"ok","openaiConfigured":true|false}

curl http://localhost:8080/api/ai/services
# Expected: list of 7 AI services

# POST — PowerShell curl is 'Invoke-WebRequest'. Use this instead:
Invoke-RestMethod -Method Post -Uri http://localhost:8080/api/ai/resume -ContentType 'application/json' -Body '{"name":"Ahmed","skills":["Node","React"]}'
# Expected: AI-generated CV (or stub echo if no OPENAI_API_KEY)
```

### Test Web

- Open <http://localhost:3000>
- You should see the landing page with "One Platform. 38 Industries." headline
- 3 pillar cards: DMO Dashboard / Franchise Model / AI Services Marketplace

---

## 6. Common Issues

| Problem | Fix |
|---------|-----|
| `pnpm: command not found` | Run `npm install -g pnpm` in PowerShell |
| `EACCES` or permission denied | Run PowerShell as Administrator |
| `Port 3000 already in use` | Close other Next.js instances, or change port in `apps/web/package.json` script |
| `MongoDB connection failed` | Check `MONGODB_URI` in `.env`; or leave empty to run in-memory |
| Next.js compile errors | Delete `apps/web/.next` and `apps/web/node_modules`, re-run `pnpm install` |
| `OPENAI_API_KEY` warning | Safe to ignore for Phase 1 — stub mode works |

---

## 7. What's in This Phase 1 Skeleton

**Live endpoints (API port 5000):**

- `GET  /api/health` — service status
- `POST /api/auth/register` — create account
- `POST /api/auth/login` — get JWT token
- `GET  /api/auth/me` — current user (with Bearer token)
- `GET  /api/stl/score/:userId` — STL formula output
- `POST /api/stl/validate-product` — MIN-chain rule demo
- `GET  /api/stl/effects/:level` — effects by level (1–10)
- `GET  /api/franchise/pricing` — 14-tier pricing matrix
- `GET  /api/franchise/calculator?tier=L3&monthlyVolume=50000` — commission projection
- `POST /api/franchise/apply` — submit franchise application (stub)
- `GET  /api/dmo/kpis` — dashboard numbers (stub)
- `GET  /api/dmo/applications/queue` — pending applications (stub)

**Live endpoints (AI port 8080):**

- `GET  /api/health`
- `GET  /api/ai/services` — 7 AI services catalog
- `POST /api/ai/lawyer` — legal triage
- `POST /api/ai/diagnosis` — symptom prediction
- `POST /api/ai/tutor` — study plan
- `POST /api/ai/resume` — CV generator
- `POST /api/ai/business` — SME advisor
- `POST /api/ai/fraud` — anomaly detection
- `POST /api/ai/recommend` — suggestions

**Live Web (port 3000):**

- `/` — landing with 3 pillar cards
- (More pages added in Weeks 2–12 per `EHB-PHASE-1-DMO-FRANCHISE-AI.md`)

---

## 8. Next Development Week (Week 2)

From `EHB-PHASE-1-DMO-FRANCHISE-AI.md` §8:

- Full auth flow (register/login/JWT) end-to-end
- `POST /api/pss/submit` with file upload
- Web pages: `/login`, `/register`, `/pss` multi-step form
- Test: user registers → logs in → sees STL level in dashboard

---

*EHB Technologies (Pvt.) Ltd. — Local Run Guide v1.0 — 2026-04-21*
*Questions? See `EHB-PHASE-1-DMO-FRANCHISE-AI.md` for full roadmap.*
