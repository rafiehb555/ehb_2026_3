# Deployment — EHB Platform

> **Owner:** SRE / DevOps

## Environments

| Env | Purpose | URL Pattern |
|-----|---------|-------------|
| local | Developer machine | localhost |
| dev | Daily merge target | dev.ehb.com |
| staging | Pre-prod validation | staging.ehb.com |
| prod | Live | ehb.com + country sub-domains |

## Branch Strategy
- `main` — staging-deployable
- `release/x.y.z` — promotion to prod
- Feature branches → PR → main → auto-deploy dev → manual promote staging → tagged release prod

## CI/CD Pipeline
1. PR opened → run unit + lint + type
2. PR merged to main → run integration + E2E + deploy dev
3. Manual approval → deploy staging
4. Manual approval + tag → deploy prod
5. Auto-rollback on health check fail (5 min)

## Deployment Checklist
- [ ] All STL gold-master tests green
- [ ] Revenue flow tests green
- [ ] Linting + type-check pass
- [ ] Schema migration reviewed
- [ ] Feature flags configured
- [ ] Changelog entry added
- [ ] Status page incident scheduled (if downtime)

## Migration Strategy
- Forward-compatible code first (deploy)
- Then schema change (DB migration)
- Then cleanup (remove old code path)
- Never break running pods

## Rollback
- Tag rollback ready before every deploy
- DB migrations: forward + reverse scripts
- Feature flags: kill-switch per feature
- Cache invalidation plan documented

## Service-Specific Notes
- **API:** rolling deploy, 1 pod at a time, health-check gate
- **Web:** atomic Vercel/CloudFront swap
- **AI:** sticky sessions for multi-turn, drain before deploy

## Country Rollout
- Dark launch (feature flag off) on launch day
- Internal QA in country
- Beta cohort (10%)
- Gradual ramp (25 → 50 → 100%)

## Linked
- `RUNBOOKS.md`
- `../6-audits/CODE-QUALITY-AUDIT.md`
