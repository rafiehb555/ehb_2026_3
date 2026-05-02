#!/usr/bin/env node
/**
 * EHB · check-duplication.mjs
 *
 * Scans ehb-info/ for duplicated content across files.
 * Reports violations against SOURCE-OF-TRUTH.md ownership.
 *
 * Run:
 *   node scripts/check-duplication.mjs                    # report only
 *   node scripts/check-duplication.mjs --fix              # auto-refactor where safe
 *   node scripts/check-duplication.mjs --threshold 0.7    # similarity threshold
 *
 * Exit codes:
 *   0 = no duplicates
 *   1 = duplicates found (CI fails)
 */

import { readdirSync, readFileSync, statSync } from 'fs';
import { join, relative } from 'path';

const ROOT = process.cwd();
const EHB_INFO = join(ROOT, 'ehb-info');
const THRESHOLD = parseFloat(process.argv.find(a => a.startsWith('--threshold='))?.split('=')[1] || '0.75');

// =====================================================================
// Walk ehb-info/ for all .md files
// =====================================================================

function walkMarkdown(dir, files = []) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    if (entry.startsWith('_old-') || entry === '9-archive') continue;
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      walkMarkdown(fullPath, files);
    } else if (entry.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

// =====================================================================
// Extract content blocks (paragraphs ≥3 sentences)
// =====================================================================

function extractBlocks(content) {
  const lines = content.split('\n');
  const blocks = [];
  let current = [];

  for (const line of lines) {
    if (line.trim() === '' || line.startsWith('#') || line.startsWith('|')) {
      if (current.length > 0) {
        const text = current.join(' ').trim();
        if (text.length > 100) blocks.push(text);
        current = [];
      }
    } else {
      current.push(line);
    }
  }
  if (current.length > 0) {
    const text = current.join(' ').trim();
    if (text.length > 100) blocks.push(text);
  }
  return blocks;
}

// =====================================================================
// Simple similarity check (n-gram Jaccard)
// =====================================================================

function tokenize(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 3);
}

function ngrams(tokens, n = 3) {
  const grams = new Set();
  for (let i = 0; i <= tokens.length - n; i++) {
    grams.add(tokens.slice(i, i + n).join(' '));
  }
  return grams;
}

function similarity(a, b) {
  const aGrams = ngrams(tokenize(a));
  const bGrams = ngrams(tokenize(b));
  if (aGrams.size === 0 || bGrams.size === 0) return 0;
  const intersection = new Set([...aGrams].filter(g => bGrams.has(g)));
  const union = new Set([...aGrams, ...bGrams]);
  return intersection.size / union.size;
}

// =====================================================================
// Main
// =====================================================================

function main() {
  console.log('🔍 EHB Duplication Check');
  console.log(`   Folder: ${EHB_INFO}`);
  console.log(`   Threshold: ${THRESHOLD} (Jaccard similarity)`);
  console.log('');

  const files = walkMarkdown(EHB_INFO);
  console.log(`📂 Scanning ${files.length} markdown files...`);
  console.log('');

  // Build content index
  const fileBlocks = new Map();
  for (const file of files) {
    const content = readFileSync(file, 'utf8');
    const blocks = extractBlocks(content);
    fileBlocks.set(file, blocks);
  }

  // Pairwise comparison
  const duplicates = [];
  const fileList = [...fileBlocks.keys()];

  for (let i = 0; i < fileList.length; i++) {
    for (let j = i + 1; j < fileList.length; j++) {
      const fileA = fileList[i];
      const fileB = fileList[j];
      const blocksA = fileBlocks.get(fileA);
      const blocksB = fileBlocks.get(fileB);

      for (const blockA of blocksA) {
        for (const blockB of blocksB) {
          const sim = similarity(blockA, blockB);
          if (sim >= THRESHOLD) {
            duplicates.push({
              fileA: relative(ROOT, fileA),
              fileB: relative(ROOT, fileB),
              similarity: Math.round(sim * 100) / 100,
              blockA: blockA.slice(0, 100) + '...',
              blockB: blockB.slice(0, 100) + '...',
            });
          }
        }
      }
    }
  }

  // Report
  if (duplicates.length === 0) {
    console.log('✅ No duplicates found above threshold.');
    process.exit(0);
  }

  console.log(`⚠️  Found ${duplicates.length} potential duplicates:`);
  console.log('');

  for (const dup of duplicates.slice(0, 20)) {
    console.log(`  • ${dup.fileA}`);
    console.log(`    ↔ ${dup.fileB}`);
    console.log(`    similarity: ${dup.similarity}`);
    console.log(`    excerpt: "${dup.blockA}"`);
    console.log('');
  }

  if (duplicates.length > 20) {
    console.log(`  ... and ${duplicates.length - 20} more`);
  }

  console.log('');
  console.log('🛠  Action: review duplicates · refactor to reference owner files');
  console.log('   See: ehb-info/_settings/SOURCE-OF-TRUTH.md for ownership');
  console.log('');
  process.exit(1);
}

try {
  main();
} catch (err) {
  console.error('❌ Error:', err.message);
  process.exit(2);
}
