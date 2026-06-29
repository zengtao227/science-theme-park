#!/usr/bin/env node
/**
 * scripts/architecture-check.mjs
 * Full-tree architecture contract enforcement for CI.
 * Scans entire src/ directory — not just staged files.
 *
 * Rules enforced:
 *   1. Homepage-scope files must NOT import @/lib/i18n barrel.
 *   2. Three.js must NOT be imported outside chamber routes.
 *   3. [Reverse allowlist] ANY file using legacy i18n must be in permitted scope.
 *      Catches transitive import attacks via intermediate wrapper files.
 *
 * Usage:
 *   node scripts/architecture-check.mjs
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Homepage-scope files: must use home-i18n, not the full barrel.
const HOMEPAGE_SCOPE = new Set([
  'src/app/page.tsx',
  'src/components/EntryProtocol.tsx',
  'src/components/UserSwitcher.tsx',
  'src/components/UserSetup.tsx',
  'src/components/ui/AchievementVault.tsx',
]);

const CHAMBER_PREFIXES = ['src/app/chamber/', 'src/components/chamber/'];

const I18N_BARREL_RE   = /from\s+['"]@\/lib\/i18n['"]/;
const I18N_INDEX_RE    = /from\s+['"]@\/lib\/i18n\/index['"]/;
const DYNAMIC_I18N_RE  = /import\s*\(\s*['"]@\/lib\/i18n(?:\/index)?['"]\s*\)/;
const USE_LANGUAGE_RE  = /\buseLanguage\s*\(/;
const USE_NAMESPACE_RE = /\buseNamespace\s*\(/;
const THREE_RE         = /from\s+['"](?:three|@react-three\/)/;

// Rule 3: files using legacy i18n must be in one of these prefix paths.
// Any file OUTSIDE these paths that uses legacy i18n is a boundary violation —
// it could become a transitive import chain into homepage scope.
const LEGACY_I18N_ALLOWED_PREFIXES = [
  // Chamber routes and sub-components (primary home for legacy i18n)
  'src/app/chamber/',
  'src/components/chamber/',
  // i18n source directory itself
  'src/lib/i18n/',
  // Quest libraries named by module-code convention (sm/sp/sc/gb/gm/gp/gc/em)
  'src/lib/sm',
  'src/lib/sp',
  'src/lib/sc',
  'src/lib/gb',
  // Non-chamber app routes that legitimately use full i18n
  'src/app/nexus/',
  'src/app/profile/',
  'src/app/sb1-03/',
  'src/app/sc1-05/',
  // Shared components used only by non-homepage routes
  'src/components/coop/',
  'src/components/layout/',
  'src/components/profile/',
  // Test files
  'src/__tests__/',
];

// Individual files outside the prefix conventions — confirmed safe, grandfathered.
// New files matching these patterns are NOT automatically grandfathered.
// TODO: Migrate to src/components/chamber/.
const LEGACY_I18N_GRANDFATHERED = new Set([
  'src/components/sc2-07/HessCycleView.tsx',
  'src/components/sc2-07/CalorimeterView.tsx',
  'src/components/sc2-07/BondEnergyView.tsx',
  'src/components/ui/NotificationToast.tsx',
]);

// Pre-existing violations that need migration (do not block CI, emit warning only).
// These existed before the enforcement system was introduced.
// TODO: Migrate these to src/components/chamber/ before expanding enforcement.
const THREE_GRANDFATHERED = new Set([
  'src/components/sc1-06/ChemicalReaction3D.tsx',
  'src/lib/physics/kinematics.ts',
]);

// ── File walker ───────────────────────────────────────────────────────────────

function* walkSrc(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry.startsWith('.')) continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      yield* walkSrc(full);
    } else if (/\.(tsx?|[mc]?js)$/.test(entry)) {
      yield { full, rel: path.relative(ROOT, full) };
    }
  }
}

// ── Checks ────────────────────────────────────────────────────────────────────

let violations = 0;

for (const { full, rel } of walkSrc(path.join(ROOT, 'src'))) {
  let content;
  try {
    content = readFileSync(full, 'utf8');
  } catch {
    continue;
  }

  // Rule 1: i18n regression check for homepage-scope files.
  if (HOMEPAGE_SCOPE.has(rel)) {
    const found = [];
    if (I18N_BARREL_RE.test(content))   found.push('imports "@/lib/i18n" barrel');
    if (I18N_INDEX_RE.test(content))    found.push('imports "@/lib/i18n/index" directly');
    if (USE_LANGUAGE_RE.test(content))  found.push('calls useLanguage() — legacy i18n hook');
    if (USE_NAMESPACE_RE.test(content)) found.push('calls useNamespace() — legacy i18n hook');

    if (found.length > 0) {
      console.error(`❌ [i18n-regression] ${rel}`);
      for (const msg of found) console.error(`   → ${msg}`);
      console.error(`   Homepage scope must use "@/lib/i18n/home-i18n" only.`);
      console.error(`   Rule: docs/ARCHITECTURE_CONTRACT.md §1\n`);
      violations++;
    }
  }

  // Rule 3: Reverse allowlist — any file using legacy i18n must be in permitted scope.
  // Skips homepage-scope files (already covered by Rule 1 with precise messages).
  if (!HOMEPAGE_SCOPE.has(rel)) {
    const usesLegacyI18n =
      I18N_BARREL_RE.test(content) ||
      I18N_INDEX_RE.test(content) ||
      DYNAMIC_I18N_RE.test(content) ||
      USE_LANGUAGE_RE.test(content) ||
      USE_NAMESPACE_RE.test(content);

    if (usesLegacyI18n) {
      const inAllowed = LEGACY_I18N_ALLOWED_PREFIXES.some(p => rel.startsWith(p));
      if (!inAllowed) {
        if (LEGACY_I18N_GRANDFATHERED.has(rel)) {
          console.warn(`⚠️  [i18n-scope-legacy] ${rel}`);
          console.warn(`   Pre-existing legacy i18n outside chamber — needs migration.`);
          console.warn(`   See: docs/ARCHITECTURE_CONTRACT.md §1\n`);
        } else {
          console.error(`❌ [i18n-boundary] ${rel}`);
          console.error(`   Uses legacy i18n outside permitted scope.`);
          console.error(`   Permitted: src/app/chamber/, src/components/chamber/, src/lib/i18n/`);
          console.error(`   This file could create a transitive import path into homepage.`);
          console.error(`   Rule: docs/ARCHITECTURE_CONTRACT.md §1\n`);
          violations++;
        }
      }
    }
  }

  // Rule 2: Three.js outside chamber routes.
  const isChamber = CHAMBER_PREFIXES.some(p => rel.startsWith(p));
  if (!isChamber && THREE_RE.test(content)) {
    if (THREE_GRANDFATHERED.has(rel)) {
      console.warn(`⚠️  [three-js-legacy] ${rel}`);
      console.warn(`   Pre-existing Three.js import outside chamber — needs migration.`);
      console.warn(`   See: docs/ARCHITECTURE_CONTRACT.md §2\n`);
    } else {
      console.error(`❌ [three-js-leak] ${rel}`);
      console.error(`   Three.js imported outside chamber routes.`);
      console.error(`   Rule: docs/ARCHITECTURE_CONTRACT.md §2\n`);
      violations++;
    }
  }
}

// ── Report ────────────────────────────────────────────────────────────────────

if (violations > 0) {
  console.error(`\n${violations} architecture violation(s) — PR blocked.`);
  console.error('See docs/ARCHITECTURE_CONTRACT.md for fix instructions.');
  process.exit(1);
}

console.log('✅ Architecture check passed — no violations in src/.');
process.exit(0);
