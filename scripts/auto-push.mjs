#!/usr/bin/env node
/**
 * EHB · Auto-Push (Node.js wrapper)
 *
 * Cross-platform alternative to auto-push.sh — works on Windows/Mac/Linux.
 * Called by agents after task completion.
 *
 * Usage:
 *   node scripts/auto-push.mjs "feat(api): add fraud detector"
 *   node scripts/auto-push.mjs --task-id 139 --status completed
 *
 * Modes:
 *   - sync:  push immediately (blocks until done)
 *   - async: spawn detached, return immediately
 *
 * Env:
 *   EHB_AUTO_PUSH=1     enable auto-push (default off in dev, on in agent runs)
 *   EHB_PUSH_BRANCH     override branch (default EHB-PVT-LTD-4)
 *   EHB_PUSH_REMOTE     override remote URL
 */

import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const REPO_URL = process.env.EHB_PUSH_REMOTE || 'https://github.com/rafiehb555/ehb_2026_3.git';
const BRANCH = process.env.EHB_PUSH_BRANCH || 'EHB-PVT-LTD-4';
const LOG_DIR = '.ehb';
const LOG_FILE = path.join(LOG_DIR, 'push.log');

// ===== CLI args =====
const args = process.argv.slice(2);
const taskIdIdx = args.indexOf('--task-id');
const taskId = taskIdIdx >= 0 ? args[taskIdIdx + 1] : null;
const statusIdx = args.indexOf('--status');
const status = statusIdx >= 0 ? args[statusIdx + 1] : null;
const isAsync = args.includes('--async');
const message = args.find((a) => !a.startsWith('--') && a !== taskId && a !== status)
  || (taskId ? `chore(task-${taskId}): ${status || 'progress'}` : `chore(auto): ${new Date().toISOString().slice(0, 16)}`);

// ===== Async mode — spawn + detach =====
if (isAsync) {
  const child = spawn(process.execPath, [import.meta.url.replace('file://', ''), ...args.filter((a) => a !== '--async')], {
    detached: true,
    stdio: 'ignore',
  });
  child.unref();
  console.log('[auto-push] spawned async child, returning');
  process.exit(0);
}

// ===== Sync mode =====
function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });
}
function log(msg) {
  ensureLogDir();
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  fs.appendFileSync(LOG_FILE, line);
  process.stdout.write(line);
}
function sh(cmd, opts = {}) {
  return execSync(cmd, { encoding: 'utf8', stdio: opts.silent ? 'pipe' : 'inherit', ...opts });
}
function shSilent(cmd) {
  try { return sh(cmd, { silent: true }).trim(); } catch { return null; }
}

try {
  if (!fs.existsSync('.git')) {
    log(`🆕 git init -b ${BRANCH}`);
    sh(`git init -b ${BRANCH}`);
  }

  const remote = shSilent('git remote get-url origin');
  if (!remote) {
    log(`🔗 adding origin ${REPO_URL}`);
    sh(`git remote add origin ${REPO_URL}`);
  }

  const current = shSilent('git rev-parse --abbrev-ref HEAD');
  if (current !== BRANCH) {
    log(`🌿 switch to ${BRANCH}`);
    sh(`git checkout -B ${BRANCH}`);
  }

  sh('git add -A');

  // Check if there's anything staged
  const diff = shSilent('git diff --cached --quiet || echo "DIRTY"');
  if (diff !== 'DIRTY') {
    log('✓ no changes — nothing to push');
    process.exit(0);
  }

  const fullMsg = `${message}\n\nAuto-pushed by EHB agent system.\n\nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`;
  // Write commit message to temp file (cross-platform safe for multi-line)
  const msgFile = path.join(LOG_DIR, '.commit-msg.tmp');
  fs.writeFileSync(msgFile, fullMsg);
  sh(`git commit -F "${msgFile}"`);
  fs.unlinkSync(msgFile);
  log(`✅ committed: ${message}`);

  // Pull --rebase if remote has the branch
  const remoteHas = shSilent(`git ls-remote --heads origin ${BRANCH}`);
  if (remoteHas) {
    log(`🔄 rebasing on origin/${BRANCH}`);
    try { sh(`git pull --rebase origin ${BRANCH}`); }
    catch { log('⚠️ rebase failed — proceeding to push (may force needed)'); }
  }

  log(`🚀 pushing to origin/${BRANCH}`);
  sh(`git push -u origin ${BRANCH}`);
  log('✅ push complete');

  if (taskId) log(`📋 linked to task #${taskId} (${status})`);
} catch (err) {
  log(`❌ push failed: ${err.message}`);
  process.exit(1);
}
