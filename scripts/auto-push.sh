#!/usr/bin/env bash
# EHB · Auto-Push Script
# Called by agents (or git hooks) after every meaningful change.
#
# Usage:
#   bash scripts/auto-push.sh "feat(api): add fraud detector"
#   bash scripts/auto-push.sh "$AUTO"   # picks up message from $AUTO env
#
# Behaviour:
#   1. Verifies repo is initialized + remote configured
#   2. Stages all changes (respects .gitignore)
#   3. Skips commit if nothing changed
#   4. Commits with message + co-author
#   5. Pulls --rebase to avoid conflicts
#   6. Pushes to origin EHB-PVT-LTD-4
#   7. Logs to .ehb/push.log (durable record)

set -euo pipefail

REPO_URL="https://github.com/rafiehb555/ehb_2026_3.git"
BRANCH="EHB-PVT-LTD-4"
LOG_DIR=".ehb"
LOG_FILE="${LOG_DIR}/push.log"

mkdir -p "$LOG_DIR"
log() { echo "[$(date -Iseconds)] $*" | tee -a "$LOG_FILE"; }

# 1. Init repo if missing
if [ ! -d ".git" ]; then
  log "🆕 git repo missing — running git init"
  git init -b "$BRANCH"
fi

# 2. Set remote if missing
if ! git remote get-url origin >/dev/null 2>&1; then
  log "🔗 remote 'origin' missing — adding $REPO_URL"
  git remote add origin "$REPO_URL"
fi

# 3. Ensure on correct branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")
if [ "$CURRENT_BRANCH" != "$BRANCH" ]; then
  log "🌿 switching to branch $BRANCH"
  git checkout -B "$BRANCH"
fi

# 4. Stage changes
git add -A

# 5. Check if anything to commit
if git diff --cached --quiet; then
  log "✓ no changes — nothing to push"
  exit 0
fi

# 6. Commit message
MSG="${1:-chore(auto): incremental save $(date +%Y-%m-%d-%H%M)}"

git commit -m "$(cat <<EOF
$MSG

Auto-pushed by EHB agent system.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"

log "✅ committed: $MSG"

# 7. Pull --rebase first (avoid conflicts on shared branch)
git fetch origin "$BRANCH" 2>/dev/null || true
if git rev-parse "origin/$BRANCH" >/dev/null 2>&1; then
  log "🔄 rebasing on origin/$BRANCH"
  git pull --rebase origin "$BRANCH" || {
    log "❌ rebase failed — manual intervention needed"
    exit 1
  }
fi

# 8. Push
log "🚀 pushing to origin/$BRANCH..."
git push -u origin "$BRANCH"
log "✅ push complete"
