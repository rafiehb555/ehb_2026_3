#!/usr/bin/env node
/**
 * EHB · Exam AI Generator
 *
 * Generates additional MCQs for an industry using OpenAI.
 *
 * Usage:
 *   node scripts/generate-exam.mjs --industry WMS --count 35 --difficulty mixed
 *
 * Reads existing exam JSON, appends new questions (deduplicates by stem hash),
 * saves back to file with version bump.
 *
 * Anti-cheat features:
 *   - Question shuffle order
 *   - Distractor randomization
 *   - Per-attempt question subset (40 of 50)
 *   - Time limits per question
 *   - IP + device fingerprint tracking
 */

import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const argv = process.argv.slice(2);
function arg(name, def) {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : def;
}

const INDUSTRY = arg('industry');
const COUNT = parseInt(arg('count', '35'), 10);
const DIFFICULTY = arg('difficulty', 'mixed'); // L1..L10 or 'mixed'
const DRY_RUN = argv.includes('--dry-run');

if (!INDUSTRY) {
  console.error('Usage: node scripts/generate-exam.mjs --industry <CODE> --count <N>');
  process.exit(1);
}

const ROOT = process.cwd();
const EXAM_PATH = path.join(ROOT, 'ehb-info/_settings/exams', `${INDUSTRY}.json`);

async function main() {
  const existing = JSON.parse(await fs.readFile(EXAM_PATH, 'utf8'));
  const seenStems = new Set(existing.theory_mcqs.map((q) => q.stem.toLowerCase().trim()));

  console.log(`📚 Industry: ${INDUSTRY} — currently ${existing.theory_mcqs.length} MCQs`);
  console.log(`🎯 Target: +${COUNT} new questions (difficulty: ${DIFFICULTY})`);

  if (!process.env.OPENAI_API_KEY && !DRY_RUN) {
    console.error('❌ OPENAI_API_KEY not set. Use --dry-run or export key.');
    process.exit(1);
  }

  const generated = [];
  const startId = existing.theory_mcqs.length + 1;

  for (let i = 0; i < COUNT; i++) {
    if (DRY_RUN) {
      generated.push({
        id: `${INDUSTRY}-T-${String(startId + i).padStart(3, '0')}`,
        stem: `[STUB ${i + 1}] Sample MCQ for ${INDUSTRY}`,
        options: ['A', 'B', 'C', 'D'],
        answer_index: i % 4,
        category: 'auto',
        difficulty: DIFFICULTY === 'mixed' ? `L${(i % 7) + 2}` : DIFFICULTY,
        generated_at: new Date().toISOString(),
      });
      continue;
    }

    const q = await generateQuestion(INDUSTRY, DIFFICULTY, existing.name);
    if (!q) continue;

    const hash = crypto.createHash('sha256').update(q.stem.toLowerCase().trim()).digest('hex').slice(0, 12);
    if (seenStems.has(q.stem.toLowerCase().trim())) {
      console.log(`  ⏭  duplicate skipped`);
      continue;
    }
    seenStems.add(q.stem.toLowerCase().trim());
    q.id = `${INDUSTRY}-T-${String(startId + generated.length).padStart(3, '0')}`;
    q.hash = hash;
    q.generated_at = new Date().toISOString();
    generated.push(q);
    console.log(`  ✅ ${q.id} (${q.difficulty})`);
  }

  existing.theory_mcqs.push(...generated);
  existing.version = bumpVersion(existing.version || '1.0');
  existing._last_generated = new Date().toISOString();
  existing._generator_count = (existing._generator_count || 0) + generated.length;

  if (!DRY_RUN) {
    await fs.writeFile(EXAM_PATH, JSON.stringify(existing, null, 2));
    console.log(`\n✅ Saved ${generated.length} new MCQs to ${EXAM_PATH}`);
    console.log(`   Total: ${existing.theory_mcqs.length} MCQs · version ${existing.version}`);
  } else {
    console.log(`\n📝 Dry run complete. Would have added ${generated.length} questions.`);
  }
}

async function generateQuestion(industry, difficulty, industryName) {
  const sys = `You are an exam writer for EHB. Generate ONE multiple-choice question for the ${industryName} (${industry}) industry at difficulty ${difficulty}.
Return ONLY JSON: { "stem": "...", "options": ["A","B","C","D"], "answer_index": 0-3, "category": "...", "difficulty": "L1-L10" }
Make distractors plausible. Avoid trivia. Test practical professional knowledge.`;

  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: sys },
          { role: 'user', content: `Generate a question.` },
        ],
        temperature: 0.8,
        max_tokens: 400,
        response_format: { type: 'json_object' },
      }),
    });
    if (!resp.ok) return null;
    const data = await resp.json();
    return JSON.parse(data.choices?.[0]?.message?.content || '{}');
  } catch (err) {
    console.error('  ❌ generation failed:', err.message);
    return null;
  }
}

function bumpVersion(v) {
  const [major, minor] = v.split('.').map(Number);
  return `${major}.${(minor || 0) + 1}`;
}

main().catch((err) => {
  console.error('FATAL:', err);
  process.exit(2);
});
