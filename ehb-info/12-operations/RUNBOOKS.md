# Runbooks — EHB Platform

> **Owner:** SRE + Engineering
> Each alert links here. If no runbook exists, on-call writes one as part of incident closure.

## Index
1. API 5xx surge
2. Database connection pool exhausted
3. Payment provider down
4. Polkadot anchor failure
5. STL gold-master test fail (production)
6. Disk near full
7. Auth service down
8. AI service rate limited
9. Event queue dead-letter spike
10. SSL cert expiring

---

## 1. API 5xx surge

**Symptoms:** API 5xx rate > 1% for 5 min

**Diagnostic steps**
1. Check status page for ongoing incidents
2. Check APM (New Relic / Datadog) for top error endpoint
3. Check recent deploy log
4. Check DB / cache health

**Mitigation**
- Roll back if recent deploy correlated
- Scale horizontally if load-driven
- Restart problem pods if memory leak

**Escalation:** SEV-1 if external traffic affected → page Eng Lead

---

## 2. Database connection pool exhausted

**Symptoms:** "MongoServerSelectionError" in logs

**Diagnostic steps**
1. Check Mongo Atlas dashboard for active connections
2. Identify hot client (which service?)
3. Check for connection-leak in code

**Mitigation**
- Increase pool size temporarily
- Restart leaking service
- Add backpressure

---

## 3. Payment provider down

**Symptoms:** Stripe/JazzCash error rate > 5%

**Diagnostic steps**
1. Check provider status page
2. Confirm via test transaction

**Mitigation**
- Auto-failover to backup provider (if configured)
- Show user-friendly retry message
- Queue payment intents for retry
- Communicate via status page

---

## 4. Polkadot anchor failure

**Symptoms:** Anchor errors > 5% for 10 min

**Diagnostic steps**
1. Check Polkadot RPC node health
2. Check key custody (HSM signing OK?)
3. Check chain finality

**Mitigation**
- Failover to backup RPC endpoint
- Queue anchors to retry buffer (eventQueue dead-letter)
- DO NOT block user actions — anchor is async

---

## 5. STL gold-master test fail (production)

**Symptoms:** CI red on STL tests

**Diagnostic steps**
- Critical — STL formula is sacred
- Identify which test failed
- Check if `stlService.js` was modified

**Mitigation**
- IMMEDIATELY rollback the change
- DMO Council notified
- No deploy until investigation

---

## 6. Disk near full

**Symptoms:** Disk > 90% on host

**Mitigation**
- Rotate logs
- Archive old backups
- Scale up disk

---

## 7. Auth service down

**Symptoms:** /auth endpoints failing

**Mitigation**
- Restart auth pods
- Check JWT secret in secrets manager
- Failover region if persistent

---

## 8. AI service rate limited

**Symptoms:** OpenAI 429s

**Mitigation**
- Drop to cheaper model (GPT-3.5)
- Queue non-urgent prompts
- Increase rate limit if possible

---

## 9. Event queue dead-letter spike

**Symptoms:** > 0.1% events dead-lettered

**Diagnostic steps**
- Inspect dead-letter contents
- Identify failing handler
- Determine if data or code issue

**Mitigation**
- Fix handler bug if code issue
- Replay dead-letter via `eventQueue.replay()`
- DMO notified for trust-relevant events

---

## 10. SSL cert expiring

**Symptoms:** < 30 days to expiry

**Mitigation**
- Auto-renew via Let's Encrypt / cert-manager
- If manual cert, schedule renewal
- Update load balancer

## Linked
- `ONCALL.md`
- `INCIDENT-RESPONSE.md`
- `MONITORING.md`
