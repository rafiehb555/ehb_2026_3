#!/usr/bin/env node
/**
 * EHB · Agent Task-Complete Hook
 *
 * Called by agents (or manually) at the END of every task.
 * Wraps:
 *   1. Smoke test (verify nothing broke)
 *   2. Auto-push to GitHub (if EHB_AUTO_PUSH=1)
 *   3. Status log entry
 *
 * Usage from agent:
 *   node scripts/agent-task-complete.mjs --task-id 139 --message "feat(auth): add 2FA"
 *   node scripts/agent-task-complete.mjs --message "fix(stl): drift correction"
 *   node scripts/agent-task-complete.mjs --skip-smoke --message "docs: update"
 *
 * Behaviour:
 *   - Smoke test runs by default (skip with --skip-smoke)
 *   - Push only if EHB_AUTO_PUSH=1 (agent runs) OR --force-push
 *   - Logs to .ehb/task-log.jsonl (append-only audit trail)
 */

import { execSync, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
function getArg(name) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : null;
}
const taskId = getArg('task-id');
const message = getArg('message') || `chore(task-${taskId || 'unknown'}): complete`;
const skipSmoke = args.includes('--skip-smoke');
const forcePush = args.includes('--force-push');

const LOG_FILE = '.ehb/task-log.jsonl';
function appendLog(entry) {
  fs.mkdirSync('.ehb', { recursive: true });
  fs.appendFileSync(LOG_FILE, JSON.stringify({ ...entry, ts: new Date().toISOString() }) + '\n');
}

const run = (cmd) => execSync(cmd, { encoding: 'utf8', stdio: 'pipe' });
const runVisible = (cmd) => execSync(cmd, { stdio: 'inherit' });

console.log(`\n🔔 Task complete hook: ${message}\n`);

let smokeOk = true;
if (!skipSmoke && fs.existsSync('scripts/smoke-test-e2e.mjs')) {
  console.log('🧪 Running smoke test...');
  const r = spawnSync('node', ['scripts/smoke-test-e2e.mjs'], { stdio: 'inherit' });
  smokeOk = r.status === 0;
  if (!smokeOk) {
    console.error('❌ Smoke test failed — push BLOCKED');
    appendLog({ task_id: taskId, message, smoke_ok: false, pushed: false });
    process.exit(1);
  }
}

const shouldPush = forcePush || process.env.EHB_AUTO_PUSH === '1';
let pushed = false;
let pushErr = null;

if (shouldPush) {
  try {
    console.log('🚀 Auto-pushing to GitHub...');
    runVisible(`node scripts/auto-push.mjs "${message}"${taskId ? ` --task-id ${taskId}` : ''}`);
    pushed = true;
  } catch (err) {
    pushErr = err.message;
    console.error('⚠️ Push failed (continuing):', err.message);
  }
} else {
  console.log('ℹ️  Skipping push (set EHB_AUTO_PUSH=1 or pass --force-push)');
}

appendLog({ task_id: taskId, message, smoke_ok: smokeOk, pushed, push_error: pushErr });

console.log('\n✅ Task complete hook finished');
console.log(`   smoke_test: ${smokeOk ? 'PASS' : 'FAIL'}`);
console.log(`   pushed:     ${pushed ? 'YES' : 'NO'}`);
if (pushErr) console.log(`   error:      ${pushErr}`);
