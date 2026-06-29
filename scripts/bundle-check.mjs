#!/usr/bin/env node
/**
 * scripts/bundle-check.mjs
 * Bundle size regression gate for CI.
 *
 * Reads .next/server/app/index.html, identifies all <script> tags,
 * computes gzip size of each referenced chunk, sums to homepage
 * First Load JS, and compares against baseline.
 *
 * Baseline: 275 kB gz (established after i18n split, commit 1a8de343)
 * Threshold: +15% → max 316 kB gz
 *
 * Usage:
 *   npm run build && node scripts/bundle-check.mjs
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { gzipSync } from 'zlib';
import { fileURLToPath } from 'url';
import path from 'path';

const ROOT       = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const NEXT_DIR   = path.join(ROOT, '.next');
const CHUNKS_DIR = path.join(NEXT_DIR, 'static', 'chunks');
const HTML_PATHS = [
  path.join(NEXT_DIR, 'server', 'app', 'index.html'),
  path.join(NEXT_DIR, 'server', 'pages', 'index.html'),
];

const BASELINE_KB   = 275;
const THRESHOLD_PCT = 0.15;
const MAX_KB        = Math.round(BASELINE_KB * (1 + THRESHOLD_PCT)); // 316

// ── Locate homepage HTML ──────────────────────────────────────────────────────

const HTML_PATH = HTML_PATHS.find(existsSync);
if (!HTML_PATH) {
  console.error('❌ Bundle check: .next/server/app/index.html not found.');
  console.error('   Run `npm run build` first.');
  process.exit(1);
}

const html = readFileSync(HTML_PATH, 'utf8');

// ── Extract <script src> tags ─────────────────────────────────────────────────

const scriptRe = /<script[^>]+src=["']([^"']+\.js(?:\?[^"']+)?)["']/gi;
const scriptSrcs = [];
let m;
while ((m = scriptRe.exec(html)) !== null) {
  scriptSrcs.push(m[1]);
}

if (scriptSrcs.length === 0) {
  console.error('❌ Bundle check: no <script src> tags found in homepage HTML.');
  console.error('   This is unexpected — check the build output.');
  process.exit(1);
}

// ── Map URL path to local file ────────────────────────────────────────────────

/**
 * Next.js emits script tags like:
 *   /_next/static/chunks/foo-abc123.js
 * The file lives at:
 *   .next/static/chunks/foo-abc123.js
 */
function resolveChunk(src) {
  // Strip query strings
  const cleanSrc = src.split('?')[0];
  // Strip leading /_next/ or _next/
  const rel = cleanSrc.replace(/^\/?_next\//, '');
  return path.join(NEXT_DIR, rel);
}

// ── Compute gzip sizes ────────────────────────────────────────────────────────

let totalGzBytes = 0;
const missing = [];
const chunks = [];

for (const src of scriptSrcs) {
  const filePath = resolveChunk(src);
  if (!existsSync(filePath)) {
    missing.push({ src, filePath });
    continue;
  }
  const raw     = readFileSync(filePath);
  const gz      = gzipSync(raw, { level: 9 });
  const gzKB    = gz.length / 1024;
  totalGzBytes += gz.length;
  chunks.push({ src, gzKB });
}

if (missing.length > 0) {
  console.warn('⚠️  Some script files were not found locally:');
  for (const { src } of missing) console.warn(`   ${src}`);
  console.warn('   They may be CDN-hosted or from a previous build. Skipping them.');
}

// ── Report ────────────────────────────────────────────────────────────────────

const totalKB = totalGzBytes / 1024;

console.log('\n── Bundle Check ─────────────────────────────────────────────');
console.log(`  Chunks measured: ${chunks.length}`);
for (const { src, gzKB } of chunks.sort((a, b) => b.gzKB - a.gzKB)) {
  const flag = gzKB > 100 ? ' ⚠️  >100kB' : '';
  console.log(`  ${gzKB.toFixed(1).padStart(7)} kB gz  ${path.basename(src.split('?')[0])}${flag}`);
}
console.log(`${'─'.repeat(60)}`);
console.log(`  Total:   ${totalKB.toFixed(1)} kB gz`);
console.log(`  Baseline: ${BASELINE_KB} kB gz`);
console.log(`  Max allowed: ${MAX_KB} kB gz (+${THRESHOLD_PCT * 100}%)`);

const chunksOver100 = chunks.filter(c => c.gzKB > 100);
let failed = false;

if (totalKB > MAX_KB) {
  console.error(`\n❌ BUNDLE REGRESSION: ${totalKB.toFixed(1)} kB gz > ${MAX_KB} kB gz limit`);
  console.error(`   Increase: +${(totalKB - BASELINE_KB).toFixed(1)} kB gz over baseline`);
  console.error('   Rule: docs/ARCHITECTURE_CONTRACT.md §4');
  failed = true;
}

if (chunksOver100.length > 0) {
  console.error(`\n⚠️  ${chunksOver100.length} chunk(s) >100 kB on homepage:`);
  for (const { src, gzKB } of chunksOver100) {
    console.error(`   ${gzKB.toFixed(1)} kB gz  ${path.basename(src.split('?')[0])}`);
  }
  console.error('   Rule: docs/ARCHITECTURE_CONTRACT.md §4 — review required');
  // This is a warning, not a hard failure (requires review, not auto-block)
}

if (failed) {
  process.exit(1);
}

console.log(`\n✅ Bundle check passed — ${totalKB.toFixed(1)} kB gz (baseline ${BASELINE_KB} kB gz, limit ${MAX_KB} kB gz).`);
process.exit(0);
