# 🚀 EHB Auto-Push Setup — One-Time Guide

> **Read once, run once, then everything is automatic.**

## 🎯 What This Does

After setup:
- Agent (or you) completes a task → code auto-pushes to GitHub
- Smoke test runs before every push (broken code blocked)
- All commits land on branch `EHB-PVT-LTD-4`
- Repo: `https://github.com/rafiehb555/ehb_2026_3`

---

## 🛠 Setup (Run Once)

### Step 1 — Open terminal in project folder

Aap ke laptop par Windows PowerShell ya Mac/Linux Terminal kholain. Project folder mein navigate karein:

```bash
cd "D:\ehb_2026_3"   # Windows path (your local folder)
```

### Step 2 — Run the setup script

```bash
bash scripts/setup-git-hooks.sh
```

**Yeh kya karega:**
- Git repo init kare ga (agar nahi hai)
- Remote `origin` add kare ga (`https://github.com/rafiehb555/ehb_2026_3.git`)
- Branch `EHB-PVT-LTD-4` set kare ga
- Git hooks install kare ga (post-commit + pre-push smoke test)
- Initial commit banae ga

### Step 3 — First push (manual, one-time)

```bash
git push -u origin EHB-PVT-LTD-4
```

GitHub credentials maange ga (browser open ho ga). Login → done.

### Step 4 — Enable auto-push

```bash
# Windows PowerShell
$env:EHB_AUTO_PUSH = "1"

# Mac/Linux
export EHB_AUTO_PUSH=1
```

Persistent banane ke liye:
- Windows: System Properties → Environment Variables → New `EHB_AUTO_PUSH=1`
- Mac/Linux: `echo 'export EHB_AUTO_PUSH=1' >> ~/.bashrc` (or `.zshrc`)

---

## 🤖 How Agents Use It

When agent finishes any task, it runs:

```bash
node scripts/agent-task-complete.mjs --task-id 139 --message "feat(auth): add 2FA"
```

Behind the scenes:
1. Smoke test runs (22 checks)
2. If green → auto-pushes to GitHub
3. If red → push blocked + alert

---

## 📋 Manual Commands

### Push current changes:
```bash
node scripts/auto-push.mjs "feat(stl): improve formula"
```

### Push without smoke test:
```bash
node scripts/agent-task-complete.mjs --skip-smoke --message "docs: update"
```

### Push async (don't wait):
```bash
node scripts/auto-push.mjs --async "feat: hot fix"
```

### Check push log:
```bash
cat .ehb/push.log         # all push history
cat .ehb/task-log.jsonl   # all task completions
```

---

## ✅ Verify Setup Working

After Step 4, test:

```bash
# Make a tiny change
echo "test" >> README.md

# Trigger auto-push
node scripts/agent-task-complete.mjs --message "test: auto-push verification"

# Check GitHub
# → https://github.com/rafiehb555/ehb_2026_3/tree/EHB-PVT-LTD-4
# → New commit should be visible within seconds
```

---

## 🔁 Continuous Integration (Auto)

`.github/workflows/auto-deploy.yml` already configured. On every push:
- Smoke test runs in GitHub Actions
- Lint runs
- Duplication scan runs
- ✅ Green = build healthy
- ❌ Red = build broken (you get email)

---

## 🚨 Troubleshooting

### "Permission denied" on push
GitHub asking auth — install GitHub CLI:
```bash
gh auth login
```

### "non-fast-forward" rejected
Someone else pushed. Pull first:
```bash
git pull --rebase origin EHB-PVT-LTD-4
node scripts/auto-push.mjs "your message"
```

### Hook not running
Verify executable:
```bash
chmod +x .git/hooks/post-commit
chmod +x .git/hooks/pre-push
chmod +x scripts/auto-push.sh
```

### Smoke test failing
Read the failure, fix the code, retry. Smoke test is a SAFETY GATE — never disable in production.

---

## 🎯 Summary

| Setup step | Run when | Time |
|------------|---------|------|
| `bash scripts/setup-git-hooks.sh` | Once | 30 sec |
| `git push -u origin EHB-PVT-LTD-4` | Once | 1 min |
| `export EHB_AUTO_PUSH=1` | Once (persistent) | 5 sec |

**Total setup: ~2 minutes. After that — fully automatic.**
