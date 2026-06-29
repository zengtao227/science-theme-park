# SYSTEM CONTRACT (HARD RULES)

This file defines immutable architecture rules.
Any violation = CI failure + pre-commit block.

---

## 1. i18n ARCHITECTURE

### Homepage
Homepage and its component graph MUST ONLY use:
- `src/lib/i18n/home-i18n.ts` → `useHomeLanguage()`

FORBIDDEN in homepage-scope files:
- `import ... from "@/lib/i18n"`
- `import ... from "@/lib/i18n/index"`

Homepage-scope files (locked):
- `src/app/page.tsx`
- `src/components/EntryProtocol.tsx`
- `src/components/UserSwitcher.tsx`
- `src/components/UserSetup.tsx`
- `src/components/ui/AchievementVault.tsx`

### Chamber pages
Chamber pages MAY use:
- `src/lib/i18n/index.ts` → `useLanguage()` / `useNamespace()`

ONLY inside:
- `src/app/chamber/**`
- `src/components/chamber/**`

### home-i18n.ts isolation invariant
`home-i18n.ts` imports ONLY:
- `./en/common` (direct file, not barrel)
- `./cn/common` (direct file, not barrel)
- `./de/common` (direct file, not barrel)

If any math/physics/chemistry/biology module is added to this import list,
the 836 KB i18n chunk will re-enter the homepage bundle.

---

## 2. THREE.JS ISOLATION RULE

Three.js and React-Three-Fiber MUST ONLY appear inside:
- `src/app/chamber/**`
- `src/components/chamber/**`

AND MUST be loaded via:
- `next/dynamic(() => import("..."), { ssr: false })`

FORBIDDEN:
- Static `import * from "three"` anywhere outside chamber routes
- Static `import * from "@react-three/fiber"` outside chamber routes
- Importing a chamber Canvas component directly into a non-chamber file

---

## 3. LOCKED FILES (REQUIRE EXPLICIT APPROVAL)

The following files MUST NOT be modified without explicit written approval
from the project owner. Modification without approval blocks CI and pre-commit.

| File | Reason |
|------|--------|
| `src/components/ui/AchievementVault.tsx` | Was modified out-of-scope in production incident |
| `src/lib/i18n/index.ts` | Core i18n barrel — affects all 111 chamber pages |
| `src/lib/i18n/home-i18n.ts` | Homepage i18n isolation boundary |
| `src/app/layout.tsx` | Root layout — affects all routes |
| `src/lib/store.ts` | Global Zustand store |
| `src/app/page.tsx` | Homepage entry point |

To bypass lock (with approval): `LOCK_OVERRIDE=1 git commit`

---

## 4. BUNDLE SIZE BASELINE

| Metric | Baseline | Max Allowed (+15%) |
|--------|----------|--------------------|
| Homepage First Load JS | 275 kB gz | 316 kB gz |
| Largest single chunk on homepage | 62 kB gz | — |
| Chunks > 100 kB on homepage | 0 | 0 |

A bundle regression is defined as:
- `homepage_first_load_js > 316 kB gz` → CI fails
- Any chunk > 100 kB appearing in homepage HTML → review required

---

## 5. REGRESSION DEFINITION

A regression is ANY of:
- Homepage bundle exceeds baseline + 15%
- `@/lib/i18n` barrel re-imported in homepage-scope files
- Three.js imported outside chamber routes
- Locked file modified without LOCK_OVERRIDE

All regressions block the PR via GitHub Actions.

---

## 6. ENFORCEMENT LAYERS

| Layer | Mechanism | Scope |
|-------|-----------|-------|
| Pre-commit | `.husky/pre-commit` → `scripts/gates/precommit.mjs` | Staged files |
| CI structural | `scripts/architecture-check.mjs` | Full src/ |
| CI bundle | `scripts/bundle-check.mjs` | Build output |
| CI locked files | `anti-regression.yml` git diff check | PR diff |

Activate local hook: `git config core.hooksPath .husky`
