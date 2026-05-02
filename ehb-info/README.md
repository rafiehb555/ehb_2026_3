# EHB Info · Single Source of Truth

> **Yeh folder EHB project ki saari canonical information ka home hai.**
> Code mein kuch change karna ho, decision lena ho, ya naya feature plan karna ho —
> pehle yahan dekho. Chat mein decision yaad rakhne ki zarurat nahi.

**Maintained by:** Muhammad Rafi (Founder) + Claude AI
**Locked structure:** 2026-04-30 · v1.0

---

## 🗺 Folder map

| Folder | Purpose | When to look here |
|---|---|---|
| `0-index/` | Navigation, source registry, communication rules | Kuch dhundna ho · AI ki rules check karni ho |
| `1-master/` | Master vision, plan, founder playbook | Big-picture vision · phase planning |
| `2-phases/` | Phase 1, Phase 2, system phases | Kab kya launch hoga |
| `3-departments/` | Per-department canonical specs | STL/PSS/CRB/DMO formula ya rule |
| `4-flows/` | User flows, user types, ecosystem map | User journey · 10 user types |
| `5-specs/` | API spec, DB schema, build blueprint | Technical specs |
| `6-audits/` | My analysis, gap audits, improvement plans | Recently locked decisions · open questions |
| `7-affiliate/` | Affiliate-specific bundle | Affiliate launches / runbooks |
| `8-prototypes/` | HTML mockups | Visual prototypes |
| `9-archive/` | Deprecated / superseded files | DO NOT USE — old versions only |
| `_settings/` | Auto-discovery config (REGISTRY.json, DOMAIN-MAP, UPDATE-RULES) | AI ko bhejne ke liye |

---

## 🚀 Quick start (3 most important files)

### For founders / non-technical

1. **`1-master/EHB-MASTER-INFO.md`** — The bible. Vision, departments, industries, tech stack.
2. **`1-master/EHB-PROJECT-WITH-CLAUDE-PLAYBOOK.md`** — 12 master rules for working with AI.
3. **`0-index/CLAUDE-FOUNDER-COMMUNICATION-RULES.md`** — How Claude responds (auto-applied).

### For developers / AI agents

1. **`_settings/REGISTRY.json`** — Machine-readable index of all topics.
2. **`_settings/DOMAIN-MAP.md`** — Topic → file lookup table.
3. **`_settings/UPDATE-RULES.md`** — When X changes, also update Y.

### For STL / lock economics work

1. **`3-departments/STL.md`** — Formula, ladder, MIN-chain.
2. **`6-audits/EHB-STL-AUDIT-AND-IMPROVEMENTS.md`** — 10 locked decisions + open items.
3. **`4-flows/EHB-USER-TYPES.md`** — STL source matrix per user type.

---

## 📋 Conventions

1. **Numbered folders** (`0-`, `1-`, …) indicate read order — start at 0, work up.
2. **Underscore folders** (`_settings/`) are config / meta — not regular content.
3. **Canonical files** have `Status:` and `Version:` headers + Changelog table.
4. **Deprecated files** moved to `9-archive/` with `-DEPRECATED` suffix in name.
5. **Code paths in registry** are relative to workspace root, not ehb-info/.
6. **Cross-references** use folder-prefixed paths (e.g. `3-departments/STL.md §3`).

---

## 🔄 Updating canonical content

When you change a canonical file:

1. Bump the version in file header (v1.0 → v1.1)
2. Add a row to the file's Changelog table
3. Read `_settings/UPDATE-RULES.md` to see what else needs updating
4. If code is affected, run relevant tests
5. Update `ehb-status.json` (workspace root) with what changed

---

## 🚨 What stays at workspace root (NOT here)

These files MUST stay at workspace root — they're tool-controlled:

- `CLAUDE.md` — Claude Code project rules (Claude Code requires)
- `README.md` — Standard Git/GitHub README
- `RUN-LOCAL.md` — Developer run instructions
- `ehb-status.json` — Live project pulse
- `package.json`, `tsconfig.base.json`, `turbo.json` — Build configs

Everything else canonical → `ehb-info/` ke andar.

---

## 📞 Help

If you can't find something:

1. Check `_settings/DOMAIN-MAP.md` first
2. Check `0-index/EHB-CANONICAL-INDEX.md` next
3. Search the folder tree by topic name
4. As last resort, ask Claude with: "topic X kahan hai?"
