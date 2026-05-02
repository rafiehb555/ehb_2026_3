# Testing Strategy — EHB Platform

> **Owner:** Engineering Lead

## Testing Pyramid

```
              /\
             /  \  Manual / Exploratory  (5%)
            /----\
           /      \  E2E (10%)
          /--------\
         /          \  Integration (25%)
        /------------\
       /              \  Unit (60%)
      /________________\
```

## Unit Tests (60%)

### What to test
- Pure functions
- Single-class behavior
- Adapters in isolation (with mocks)
- Schema parsers
- STL formula (gold-master)

### Tools
- Jest (services + scripts)
- Vitest (web)

### Standards
- 80%+ coverage on services
- 60%+ on UI
- Run on every commit
- Test name = behavior described

## Integration Tests (25%)

### What to test
- Route → service → DB flow
- Adapter swap (in-mem → real-mock)
- Event queue → handler flow
- Multi-step transactions

### Tools
- Jest with supertest
- mongodb-memory-server
- Test containers for Redis / external

### Run
- On PR
- Pre-deploy gate

## E2E Tests (10%)

### What to test
- Critical user paths:
  - Sign-up → KYC → first order → settle
  - Refund flow
  - Slash flow
  - Franchise application
  - DMO dispute resolution

### Tools
- Playwright
- Sandbox environment

### Run
- Nightly + pre-prod deploy

## Manual / Exploratory (5%)

### When
- New industry launch
- Country launch
- Major UI redesign
- Pre-major-release

### Format
- Test charter (1h sessions)
- Document findings + repro steps
- Convert findings to automated tests

## Special Test Suites

### Gold-Master STL (58 tests)
- Lock canonical STL outputs
- Run on every CI
- ANY change to `stlService.js` regenerates these
- DMO Council approves regeneration

### Revenue Flow (8 tests)
- Validate 70/10/10/10 + franchise 5-tier split
- Run on every CI

### Adapter Contract Tests
- Each adapter implementation must pass shared contract
- Ensures swap-ready

### Performance Tests
- k6 against staging
- Run weekly + before traffic spike events

## Test Data
- Seed scripts for typical scenarios
- Fixture builders (factories) for one-off cases
- No production data in test environments

## Flaky Test Policy
- Flaky test detected → marked + isolated
- Owner has 7 days to fix or remove
- Repeated flakiness → quarantined to nightly suite

## CI Configuration
- Lint + type → unit → integration on PR
- Add E2E on main
- Add perf on nightly
- Block merge if any required suite red

## Linked
- `ehb-info/6-audits/CODE-QUALITY-AUDIT.md`
- `DEVELOPER-GUIDE.md`
