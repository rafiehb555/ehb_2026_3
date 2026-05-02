# EHB Development 2026 — Windows Setup Script
# Usage: .\scripts\setup.ps1
#
# If blocked: Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "  EHB Technologies (Pvt.) Ltd. — Setup        " -ForegroundColor Cyan
Write-Host "  Phase 1: DMO + Franchise + AI Marketplace   " -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

# --- 1. Check Node version ---
Write-Host "[1/5] Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "      Node: $nodeVersion" -ForegroundColor Green
    $major = [int]($nodeVersion -replace 'v(\d+)\..*','$1')
    if ($major -lt 20) {
        Write-Host "      WARNING: Node 20+ required. Upgrade at https://nodejs.org" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "      Node.js not found. Install from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# --- 2. Check pnpm ---
Write-Host "[2/5] Checking pnpm..." -ForegroundColor Yellow
try {
    $pnpmVersion = pnpm --version
    Write-Host "      pnpm: $pnpmVersion" -ForegroundColor Green
} catch {
    Write-Host "      pnpm not found. Installing globally..." -ForegroundColor Yellow
    npm install -g pnpm@9
    $pnpmVersion = pnpm --version
    Write-Host "      pnpm: $pnpmVersion installed" -ForegroundColor Green
}

# --- 3. Copy .env ---
Write-Host "[3/5] Setting up .env..." -ForegroundColor Yellow
if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
    Write-Host "      Created .env from .env.example" -ForegroundColor Green
    Write-Host "      EDIT .env to set MONGODB_URI and (optional) OPENAI_API_KEY" -ForegroundColor Yellow
} else {
    Write-Host "      .env already exists, skipping" -ForegroundColor Green
}

# --- 4. Install dependencies ---
Write-Host "[4/5] Installing dependencies (this may take 2-5 minutes)..." -ForegroundColor Yellow
pnpm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "      Install failed. Check errors above." -ForegroundColor Red
    exit 1
}
Write-Host "      Dependencies installed." -ForegroundColor Green

# --- 5. Summary ---
Write-Host "[5/5] Setup complete!" -ForegroundColor Yellow
Write-Host ""
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "  NEXT STEPS" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Edit .env — set MONGODB_URI (Atlas or Docker) and OPENAI_API_KEY (optional)" -ForegroundColor White
Write-Host ""
Write-Host "2. Start services in THREE separate PowerShell windows:" -ForegroundColor White
Write-Host "     Window 1:  pnpm dev:api" -ForegroundColor Gray
Write-Host "     Window 2:  pnpm dev:ai" -ForegroundColor Gray
Write-Host "     Window 3:  pnpm dev:web" -ForegroundColor Gray
Write-Host ""
Write-Host "   OR run all together:" -ForegroundColor White
Write-Host "     pnpm dev" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Open http://localhost:3000 in your browser" -ForegroundColor White
Write-Host ""
Write-Host "See RUN-LOCAL.md for full guide and troubleshooting." -ForegroundColor White
Write-Host ""
