#!/usr/bin/env bash
# EHB · One-time setup for auto-push
# Run once: bash scripts/setup-git-hooks.sh

set -euo pipefail

REPO_URL="https://github.com/rafiehb555/ehb_2026_3.git"
BRANCH="EHB-PVT-LTD-4"

echo "🔧 EHB Auto-Push Setup"
echo ""

# 1. Verify git installed
if ! command -v git &>/dev/null; then
  echo "❌ git not installed"
  exit 1
fi

# 2. Init repo if needed
if [ ! -d ".git" ]; then
  echo "📦 Initializing git repo on branch $BRANCH"
  git init -b "$BRANCH"
fi

# 3. Set remote
if ! git remote get-url origin >/dev/null 2>&1; then
  echo "🔗 Adding remote: $REPO_URL"
  git remote add origin "$REPO_URL"
else
  echo "✓ Remote already configured"
fi

# 4. Configure user (won't override if set)
git config user.email "ehb.rafi.mr@gmail.com" 2>/dev/null || true
git config user.name "rafiehb555" 2>/dev/null || true

# 5. Create post-commit hook (auto-push on commit, optional)
HOOK_FILE=".git/hooks/post-commit"
if [ ! -f "$HOOK_FILE" ]; then
  cat > "$HOOK_FILE" <<'HOOK'
#!/usr/bin/env bash
# EHB post-commit hook — auto-push if EHB_AUTO_PUSH=1
if [ "${EHB_AUTO_PUSH:-0}" = "1" ]; then
  echo "[hook] EHB_AUTO_PUSH=1 → pushing..."
  git push -u origin "$(git rev-parse --abbrev-ref HEAD)" 2>&1 | sed 's/^/[hook] /'
fi
HOOK
  chmod +x "$HOOK_FILE"
  echo "✓ post-commit hook installed"
fi

# 6. Create pre-push hook (run smoke test before push)
PREPUSH=".git/hooks/pre-push"
if [ ! -f "$PREPUSH" ]; then
  cat > "$PREPUSH" <<'HOOK'
#!/usr/bin/env bash
# EHB pre-push — run smoke test (skip with EHB_SKIP_SMOKE=1)
if [ "${EHB_SKIP_SMOKE:-0}" = "1" ]; then exit 0; fi
if [ -f "scripts/smoke-test-e2e.mjs" ]; then
  node scripts/smoke-test-e2e.mjs || {
    echo "❌ smoke test failed — push blocked. Set EHB_SKIP_SMOKE=1 to override."
    exit 1
  }
fi
HOOK
  chmod +x "$PREPUSH"
  echo "✓ pre-push hook installed (runs smoke test)"
fi

# 7. Create initial commit if repo is empty
if ! git rev-parse HEAD >/dev/null 2>&1; then
  echo ""
  echo "📥 First-time setup — creating initial commit"
  git add .gitignore README.md START-HERE.md CLAUDE.md 2>/dev/null || git add -A
  git commit -m "$(cat <<'EOF'
chore: initial EHB project commit

Bootstrap commit by setup-git-hooks.sh. Includes:
- Project foundation (CLAUDE.md, START-HERE.md)
- 230+ canonical docs in ehb-info/
- Phase 0-5 code (api, web, ai services)
- Auto-push system

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
fi

echo ""
echo "═══════════════════════════════════════════════"
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo ""
echo "  1. Push initial state to GitHub:"
echo "     git push -u origin $BRANCH"
echo ""
echo "  2. (Optional) Enable auto-push on every commit:"
echo "     export EHB_AUTO_PUSH=1"
echo ""
echo "  3. Manual push anytime:"
echo "     bash scripts/auto-push.sh \"feat(x): description\""
echo "     # or"
echo "     node scripts/auto-push.mjs \"feat(x): description\""
echo ""
echo "═══════════════════════════════════════════════"
