# Code Quality Audit — EHB Platform

> **Owner:** Engineering Lead
> **Cadence:** Sprint review

## Targets

| Metric | Target |
|--------|--------|
| Test coverage | > 80% (services), > 60% (UI) |
| ESLint errors | 0 |
| TypeScript strict | enabled |
| Cyclomatic complexity | < 10/function |
| Duplication | < 3% (jscpd) |
| Bundle size | tracked, alert on +10% |

## Audit Checklist

### Architecture
- [ ] Adapter pattern for all external services
- [ ] No direct DB calls from controllers
- [ ] Single source: FLOW-SCHEMA-V2.json
- [ ] No circular dependencies
- [ ] Layered: routes → services → models → adapters

### Code Style
- [ ] ESLint + Prettier configured
- [ ] Pre-commit hook running
- [ ] Naming conventions enforced (camelCase JS, kebab-case files)
- [ ] No commented-out code
- [ ] No `console.log` in production paths

### Testing
- [ ] STL 58 gold-master tests run on every CI
- [ ] Revenue flow tests (8) green
- [ ] Adapter contract tests pass
- [ ] E2E for critical paths (auth, order, settle)
- [ ] Snapshot tests for UI

### Documentation
- [ ] JSDoc on public exports
- [ ] README per service
- [ ] API spec auto-generated
- [ ] Changelog updated per PR

### Security in Code
- [ ] No SQL/NoSQL injection patterns
- [ ] Input validation on all routes
- [ ] Output encoding for HTML/JSON
- [ ] Rate limiting per route
- [ ] CORS allow-list

### Performance in Code
- [ ] No synchronous file I/O in hot paths
- [ ] Database indexes match query patterns
- [ ] No memory leaks (heap snapshot review)

## Tools
ESLint, Prettier, TypeScript, Jest, jscpd, SonarCloud, Snyk, Lighthouse CI.

## Linked
- `12-operations/RUNBOOKS.md`
- `TESTING-STRATEGY.md`
