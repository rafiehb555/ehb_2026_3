# EHB — Start All 3 Services in Separate Windows
# Usage: .\scripts\start-all.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot

Write-Host "Starting EHB services from: $root" -ForegroundColor Cyan

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root'; Write-Host 'EHB API (port 5000)' -ForegroundColor Cyan; pnpm dev:api"
Start-Sleep -Seconds 2

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root'; Write-Host 'EHB AI (port 8080)' -ForegroundColor Cyan; pnpm dev:ai"
Start-Sleep -Seconds 2

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root'; Write-Host 'EHB Web (port 3000)' -ForegroundColor Cyan; pnpm dev:web"

Write-Host ""
Write-Host "3 windows opened. Once all show 'ready', open:" -ForegroundColor Green
Write-Host "  Web:  http://localhost:3000" -ForegroundColor White
Write-Host "  API:  http://localhost:5000/api/health" -ForegroundColor White
Write-Host "  AI:   http://localhost:8080/api/health" -ForegroundColor White
