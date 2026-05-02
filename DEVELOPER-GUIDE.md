# Developer Guide — EHB Engineering Handbook

> Read after `START-HERE.md`. This is the deep-dive.

## Code Standards

### General
- ES2022+ in Node 20
- TypeScript strict mode in `apps/web`
- ESM in `services/api`, CommonJS in `services/ai`
- Lowercase filenames for components
- No `any` types — use `unknown` + narrowing

### Naming
- Files: `kebab-case.ts`
- Components: `PascalCase` exported
- Hooks: `useCamelCase`
- Constants: `UPPER_SNAKE`
- Functions: `camelCase`, verb-first

### Imports
- Absolute imports via `@/` alias
- No relative paths going up 3+ levels
- Side-effect-free where possible
- Tree-shakeable named exports

## Architecture Rules

### Layered
```
Routes  → Services  → Models  → Adapters
   ↓         ↓         ↓
  HTTP    Business    DB
```

Never skip layers. Routes don't touch DB directly. Services don't issue HTTP.

### Adapters Pattern
External systems are abstracted:
- `WalletAdapter` (Stripe, JazzCash, in-memory)
- `BlockchainAdapter` (Polkadot, mock)
- `KYCAdapter` (NADRA, Onfido)
- `PaymentAdapter` (per provider)

Swap implementations without changing business logic.

### Single Source of Truth
- All flow constants → `ehb-info/5-specs/FLOW-SCHEMA-V2.json`
- Code reads from schema, never hardcodes
- Schema changes go through review

## Testing Pyramid
```
       /\         E2E (10%)
      /  \        Integration (30%)
     /____\       Unit (60%)
```

- 58 STL gold-master tests must pass on every CI
- Revenue flow tests must pass
- Adapter contract tests for all adapters
- E2E for: auth, order, settle, refund, slash

## Git Workflow

### Branch
- `main` — staging-deployable
- `feat/<area>/<short>` — features
- `fix/<area>/<short>` — bug fixes
- `docs/<short>` — doc-only

### Commit
```
feat(franchise): add serial number generator for L1-L10

Implements EHB-PK-R1-P1-L{level}-{seq} format with atomic counter.
Tested against 14 tier scenarios.

Refs: ehb-info/11-franchise/FRANCHISE-CONFIG.md
```

Modules: stl, dmo, pss, crb, jps, wallet, franchise, ai, web, api, infra, docs

### PR
- Title: `feat(<module>): <imperative summary>`
- Body: what + why + risks + test plan
- Link to issue / spec
- Self-review before requesting reviewers

## Code Review

### Reviewer checklist
- [ ] Tests added / updated
- [ ] Schema changes documented
- [ ] No hardcoded constants (read from schema)
- [ ] Adapter pattern respected
- [ ] Logging added for debug + audit
- [ ] No PII in logs
- [ ] Error paths handled
- [ ] Backward compatibility maintained

### Author etiquette
- Self-review first
- Smaller PRs better
- Respond to comments within 24h
- "Approve with nits" is fine — fix in same PR

## Local Dev

### Setup
```bash
pnpm install
cp .env.example .env
docker-compose up -d mongo
pnpm dev
```

### Useful scripts
- `pnpm test <name>` — run specific test
- `pnpm lint --fix` — auto-fix
- `pnpm typecheck`
- `node scripts/check-duplication.mjs`

## Performance
See `ehb-info/6-audits/PERFORMANCE-AUDIT.md`.

## Security
See `ehb-info/6-audits/SECURITY-AUDIT.md`.

## Releases
See `ehb-info/12-operations/DEPLOYMENT.md`.
