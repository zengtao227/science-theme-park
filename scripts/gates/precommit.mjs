#!/usr/bin/env node
/**
 * scripts/gates/precommit.mjs
 * Anti-regression pre-commit gate for science-theme-park.
 *
 * Checks staged files only (fast). For full-tree CI check, use
 * scripts/architecture-check.mjs instead.
 *
 * Activated via .husky/pre-commit.
 * To bypass a locked-file block (with approval): LOCK_OVERRIDE=1 git commit
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

// ── Staged file list ──────────────────────────────────────────────────────────

let staged;
try {
  staged = execSync('git diff --cached --name-only', { encoding: 'utf8' })
    .split('\n')
    .filter(Boolean);
} catch {
  console.error('⚠️  Could not read staged files — skipping precommit check.');
  process.exit(0);
}

if (staged.length === 0) {
  console.log('✅ Anti-regression: no staged files.');
  process.exit(0);
}

// ── Rule definitions ──────────────────────────────────────────────────────────

const LOCKED_FILES = [
  'src/components/ui/AchievementVault.tsx',
  'src/lib/i18n/index.ts',
  'src/lib/i18n/home-i18n.ts',
  'src/app/layout.tsx',
  'src/lib/store.ts',
  'src/app/page.tsx',
];

// Files that form the homepage import graph — must NOT use the full i18n barrel.
const HOMEPAGE_SCOPE = new Set([
  'src/app/page.tsx',
  'src/components/EntryProtocol.tsx',
  'src/components/UserSwitcher.tsx',
  'src/components/UserSetup.tsx',
  'src/components/ui/AchievementVault.tsx',
]);

// Chamber paths are allowed to use Three.js and the full i18n barrel.
const CHAMBER_PREFIXES = ['src/app/chamber/', 'src/components/chamber/'];

const I18N_BARREL_RE = /from\s+['"]@\/lib\/i18n['"]/;
const I18N_HOME_RE   = /from\s+['"]@\/lib\/i18n\/home-i18n['"]/;
const THREE_RE       = /from\s+['"](?:three|@react-three\/)/;

// ── CHECK 1: Locked file modification ─────────────────────────────────────────

if (!process.env.LOCK_OVERRIDE) {
  for (const file of staged) {
    if (LOCKED_FILES.includes(file)) {
      console.error('\n❌ PRECOMMIT BLOCKED: Locked file staged without approval.');
      console.error(`   File:  ${file}`);
      console.error('   Rule:  docs/ARCHITECTURE_CONTRACT.md §3');
      console.error('   To proceed with explicit approval:');
      console.error('     LOCK_OVERRIDE=1 git commit -m "your message"\n');
      process.exit(1);
    }
  }
}

// ── CHECK 2: i18n barrel regression in homepage scope ─────────────────────────

for (const file of staged) {
  if (!HOMEPAGE_SCOPE.has(file)) continue;

  const fullPath = path.join(ROOT, file);
  if (!existsSync(fullPath)) continue;

  const content = readFileSync(fullPath, 'utf8');

  if (I18N_BARREL_RE.test(content) && !I18N_HOME_RE.test(content)) {
    console.error('\n❌ PRECOMMIT BLOCKED: i18n barrel imported in homepage scope.');
    console.error(`   File:    ${file}`);
    console.error('   Found:   import from "@/lib/i18n"');
    console.error('   Fix:     use "@/lib/i18n/home-i18n" → useHomeLanguage()');
    console.error('   Rule:    docs/ARCHITECTURE_CONTRACT.md §1\n');
    process.exit(1);
  }
}

// ── CHECK 3: Three.js outside chamber routes ───────────────────────────────────

for (const file of staged) {
  if (!/\.(tsx?|[mc]?js)$/.test(file)) continue;

  const isChamber = CHAMBER_PREFIXES.some(p => file.startsWith(p));
  if (isChamber) continue;

  const fullPath = path.join(ROOT, file);
  if (!existsSync(fullPath)) continue;

  const content = readFileSync(fullPath, 'utf8');

  if (THREE_RE.test(content)) {
    console.error('\n❌ PRECOMMIT BLOCKED: Three.js imported outside chamber routes.');
    console.error(`   File:  ${file}`);
    console.error('   Rule:  docs/ARCHITECTURE_CONTRACT.md §2');
    console.error('   Three.js is only allowed in src/app/chamber/ and src/components/chamber/\n');
    process.exit(1);
  }
}

// ── All checks passed ─────────────────────────────────────────────────────────

console.log(`✅ Anti-regression: ${staged.length} staged file(s) checked — no violations.`);
process.exit(0);
