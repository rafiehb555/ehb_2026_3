@echo off
setlocal

REM Auto-push only data-related paths to GitHub.
cd /d "%~dp0"

set "REMOTE=origin"
set "BRANCH=EHB-PVT-LTD-4"
REM Seeds + web lib datasets (education/DMO/STL/notifications live here too)
set "DATA_PATHS=data apps/web/lib/data apps/web/lib/education apps/web/lib/dmo/v2-data.ts apps/web/lib/stl/min-chain.ts apps/web/lib/notifications/templates.ts"

echo [1/5] Checking git repository...
git rev-parse --is-inside-work-tree >nul 2>nul
if errorlevel 1 (
  echo ERROR: This folder is not a git repository.
  exit /b 1
)

echo [2/5] Staging data paths...
git add %DATA_PATHS%

echo [3/5] Checking for staged data changes...
git diff --cached --quiet
if not errorlevel 1 (
  echo No new data changes found. Pushing current branch anyway...
  git push %REMOTE% %BRANCH%
  if errorlevel 1 (
    echo ERROR: Push failed.
    exit /b 1
  )
  echo Done: branch is already up-to-date on GitHub.
  exit /b 0
)

for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format \"yyyy-MM-dd HH:mm:ss\""') do set "TS=%%i"
set "MSG=chore(data): auto push data sync %TS%"

echo [4/5] Creating commit...
git commit -m "%MSG%"
if errorlevel 1 (
  echo ERROR: Commit failed.
  exit /b 1
)

echo [5/5] Pushing to GitHub...
git push %REMOTE% %BRANCH%
if errorlevel 1 (
  echo ERROR: Push failed.
  exit /b 1
)

echo Success: data changes committed and pushed.
endlocal
