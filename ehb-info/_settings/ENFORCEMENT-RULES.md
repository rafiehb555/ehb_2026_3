# EHB · Enforcement Rules (rules → action)

> **Status:** Canonical v1.0 · 2026-04-30
> **Purpose:** Convert "rules" into "enforced behaviors" via pre/post checks + scripts.

---

## 🔥 The problem

> **"No duplication" rule defined hai · enforcement nahi hai.**
> Without enforcement → rules become documentation, not action.

---

## ✅ Enforcement layers

### Layer 1: PRE-WRITE checks (before AI writes)

Every time Claude writes / updates a file:

```
BEFORE WRITE:
1. Search SOURCE-OF-TRUTH.md for topic
2. If owner exists: edit OWNER (not new file)
3. Run duplication check: grep canonical text in other files
4. If duplicate found: stop · refactor to reference
5. Validate folder routing per AUTO-DISTRIBUTION-RULES.md
6. Confirm RULE vs CONFIG separation
```

### Layer 2: POST-WRITE validation

```
AFTER WRITE:
1. Verify file is in correct folder
2. Verify cross-references valid (no dead links)
3. Verify changelog updated
4. Verify version bumped if needed
5. Update REGISTRY.json
6. Run duplication scan vs other files
7. Update MASTER-DASHBOARD if major
```

### Layer 3: AUTOMATED SCRIPTS

Scripts to enforce automatically:

```
scripts/check-duplication.mjs
scripts/validate-references.mjs
scripts/registry-rebuild.mjs
scripts/health-check.mjs
scripts/version-bump.mjs
```

---

## 🛠 Enforcement scripts (specs)

### `scripts/check-duplication.mjs`

```javascript
// Purpose: Detect content that exists in 2+ files
// Run: weekly (cron) + pre-commit hook
// Algorithm:
//   1. Read all canonical files
//   2. Extract paragraphs (≥3 sentences)
//   3. Compare semantic similarity (>80% match = duplicate)
//   4. Compare against SOURCE-OF-TRUTH ownership
//   5. Report violations

// Output:
//   - duplicates.json: { topic, owner, found_in: [...], action_needed }
//   - exit code 1 if duplicates found (fails CI)
```

### `scripts/validate-references.mjs`

```javascript
// Purpose: Verify all `path/to/file.md` references resolve
// Run: pre-commit hook
// Algorithm:
//   1. Find all `*.md` link patterns
//   2. Verify target file exists
//   3. If section reference (#X), verify section exists
//   4. Report broken references

// Output:
//   - broken-refs.json: { from_file, to_file, line, status }
//   - exit code 1 if broken refs
```

### `scripts/registry-rebuild.mjs`

```javascript
// Purpose: Auto-regenerate REGISTRY.json from folder structure
// Run: on file create/move/delete
// Algorithm:
//   1. Walk ehb-info/ folder tree
//   2. Extract metadata from each file (frontmatter, headers, tags)
//   3. Build REGISTRY.json
//   4. Diff vs existing
//   5. Update if changed

// Output:
//   - REGISTRY.json (updated)
//   - registry-diff.json (what changed)
```

### `scripts/health-check.mjs`

```javascript
// Purpose: Verify system invariants
// Run: daily
// Checks:
//   - 58 STL gold-master tests still pass
//   - All 38 industries in canonical Industries.md
//   - All Phase-1 industries have sub-spec
//   - All flows have corresponding page settings
//   - Code paths in REGISTRY actually exist
//   - Backups recent (within 7 days)

// Output:
//   - health-report.json
//   - ehb-status.json updated
//   - alerts if FAIL
```

### `scripts/version-bump.mjs`

```javascript
// Purpose: Auto-bump version + add changelog row when canonical file changes
// Run: pre-commit hook
// Algorithm:
//   1. Detect modified canonical files
//   2. Parse current version
//   3. Bump (patch · minor · major based on change type)
//   4. Add changelog row
//   5. Commit with bumped versions

// Output:
//   - File version bumped
//   - Changelog table updated
```

---

## 🤖 Claude AI enforcement (built-in)

Claude must follow these checks WITHOUT external tooling:

### Before any write:

```
□ Searched SOURCE-OF-TRUTH for topic owner?
□ If owner exists: editing OWNER (not new file)?
□ Confirmed folder routing per AUTO-DISTRIBUTION?
□ Checked for similar content elsewhere?
□ RULE vs CONFIG correctly classified?
□ Reference syntax used (not duplicate)?
```

### After any write:

```
□ Cross-references verified?
□ Changelog updated?
□ Version bumped?
□ REGISTRY.json updated?
□ Related files updated per UPDATE-RULES?
□ Founder summary in template?
```

If any check fails → stop, ask founder, do not proceed.

---

## 🚨 Violation handling

When duplication / drift detected:

| Severity | Action |
|---|---|
| Minor (small overlap) | Auto-refactor to reference |
| Medium (logical duplication) | Flag for human review |
| Major (conflicting rules) | STOP · alert founder · do not proceed |
| Critical (rule violated) | Block all writes until resolved |

---

## 📊 Enforcement metrics

Track these:

- Duplication count (target: 0)
- Broken references (target: 0)
- REGISTRY drift count (target: 0)
- Files NOT in correct folder (target: 0)
- Version skip count (target: 0)
- 58 gold-master tests pass rate (target: 100%)

Report in `ehb-status.json` daily.

---

## 🔧 Implementation roadmap

### Phase A (immediate)
- Manual enforcement (Claude follows checklist)
- Founder spot-checks

### Phase B (next sprint)
- Build `scripts/check-duplication.mjs`
- Build `scripts/validate-references.mjs`
- Run weekly

### Phase C (Phase-1 build)
- Pre-commit hooks active
- CI/CD integration
- Auto-fix where possible

### Phase D (mature)
- Full automation
- AI-assisted refactoring
- Self-healing system

---

## Cross-references

- Source of truth: `SOURCE-OF-TRUTH.md`
- Auto-distribution: `AUTO-DISTRIBUTION-RULES.md`
- Update rules: `UPDATE-RULES.md`
- Health checks: `0-index/MASTER-DASHBOARD.md`

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-04-30 | 1.0 | Initial enforcement rules with 5 scripts spec'd |
