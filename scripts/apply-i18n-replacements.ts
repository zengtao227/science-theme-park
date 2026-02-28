import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

type Candidate = {
  line: number;
  field: string;
  raw: string;
  suggested_key: string | null;
  suggested_exempt?: boolean;
};

type CandidateFile = {
  module: string;
  source_file: string;
  candidates: Candidate[];
};

type TranslationMap = Record<string, Record<string, string>>;
type ReviewedTranslationFile = {
  module: string;
  translations: Record<
    string,
    {
      en: string;
      cn: string;
      de: string;
    }
  >;
};

function getArg(name: string): string | undefined {
  const idx = process.argv.indexOf(name);
  return idx >= 0 ? process.argv[idx + 1] : undefined;
}

function hasFlag(name: string): boolean {
  return process.argv.includes(name);
}

function usage(): never {
  console.error(
    "Usage: node --experimental-strip-types scripts/apply-i18n-replacements.ts --candidates <candidates.json> --translations <translations.json> [--dry-run]"
  );
  process.exit(1);
}

function parseJsonFile<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function normalizeTranslations(input: TranslationMap | ReviewedTranslationFile): TranslationMap {
  // Format A (native): { en: {key: val}, cn: {...}, de: {...} }
  if (
    typeof input === "object" &&
    input !== null &&
    "en" in input &&
    "cn" in input &&
    "de" in input
  ) {
    return input as TranslationMap;
  }

  // Format B (reviewed): { module: "...", translations: { key: {en,cn,de} } }
  const reviewed = input as ReviewedTranslationFile;
  if (!reviewed || typeof reviewed !== "object" || !reviewed.translations) {
    throw new Error("Unsupported translations JSON format");
  }
  const out: TranslationMap = { en: {}, cn: {}, de: {} };
  for (const [key, vals] of Object.entries(reviewed.translations)) {
    out.en[key] = vals.en;
    out.cn[key] = vals.cn;
    out.de[key] = vals.de;
  }
  return out;
}

function resolvePagePath(c: CandidateFile): string {
  return path.resolve(c.source_file);
}

function replaceOnLine(line: string, raw: string, key: string): string {
  const replacement = `t("${key}")`;
  const tokens = [`\`${raw}\``, `"${raw}"`, `'${raw}'`];
  let out = line;
  for (const token of tokens) {
    if (out.includes(token)) {
      out = out.replace(token, replacement);
      break;
    }
  }
  return out;
}

function applyPageReplacements(cFile: CandidateFile, dryRun: boolean): { changed: number; pagePath: string } {
  const pagePath = resolvePagePath(cFile);
  const lines = fs.readFileSync(pagePath, "utf8").split("\n");
  let changed = 0;

  for (const c of cFile.candidates) {
    if (c.suggested_exempt || !c.suggested_key) continue;
    const idx = c.line - 1;
    if (idx < 0 || idx >= lines.length) continue;
    const before = lines[idx];
    const after = replaceOnLine(before, c.raw, c.suggested_key);
    if (after !== before) {
      lines[idx] = after;
      changed += 1;
    }
  }

  if (!dryRun) fs.writeFileSync(pagePath, `${lines.join("\n")}\n`, "utf8");
  return { changed, pagePath };
}

function findModuleBlock(text: string, moduleKey: string): { start: number; end: number; indent: string } | null {
  const marker = `${moduleKey}: {`;
  const markerIndex = text.indexOf(marker);
  if (markerIndex < 0) return null;
  const start = text.indexOf("{", markerIndex);
  if (start < 0) return null;

  let depth = 0;
  let quote: string | null = null;
  let escape = false;
  for (let i = start; i < text.length; i += 1) {
    const ch = text[i];
    if (quote) {
      if (escape) {
        escape = false;
      } else if (ch === "\\") {
        escape = true;
      } else if (ch === quote) {
        quote = null;
      }
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch;
      continue;
    }
    if (ch === "{") depth += 1;
    if (ch === "}") {
      depth -= 1;
      if (depth === 0) {
        const lineStart = text.lastIndexOf("\n", markerIndex) + 1;
        const indent = text.slice(lineStart, markerIndex);
        return { start, end: i, indent };
      }
    }
  }
  return null;
}

function findObjectBlockWithin(
  text: string,
  parentStart: number,
  parentEnd: number,
  objectKey: string
): { start: number; end: number; keyStart: number } | null {
  const scope = text.slice(parentStart, parentEnd + 1);
  const rel = scope.indexOf(`${objectKey}: {`);
  if (rel < 0) return null;
  const keyStart = parentStart + rel;
  const start = text.indexOf("{", keyStart);
  if (start < 0) return null;

  let depth = 0;
  let quote: string | null = null;
  let escape = false;
  for (let i = start; i <= parentEnd; i += 1) {
    const ch = text[i];
    if (quote) {
      if (escape) escape = false;
      else if (ch === "\\") escape = true;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch;
      continue;
    }
    if (ch === "{") depth += 1;
    if (ch === "}") {
      depth -= 1;
      if (depth === 0) return { start, end: i, keyStart };
    }
  }
  return null;
}

function upsertModuleKeys(
  filePath: string,
  moduleKey: string,
  langKeys: Record<string, string>,
  dryRun: boolean
): number {
  let text = fs.readFileSync(filePath, "utf8");
  const moduleBlock = findModuleBlock(text, moduleKey);
  if (!moduleBlock) throw new Error(`Module ${moduleKey} not found in ${filePath}`);
  let applied = 0;

  const grouped = new Map<string, Array<{ key: string; value: string }>>();
  for (const [flat, value] of Object.entries(langKeys)) {
    const parts = flat.split(".");
    if (parts.length !== 3) continue;
    if (parts[0] !== moduleKey) continue;
    const [, ns, key] = parts;
    if (!grouped.has(ns)) grouped.set(ns, []);
    grouped.get(ns)!.push({ key, value });
  }

  // Recompute module block each loop because text shifts.
  for (const [ns, entries] of grouped) {
    let currentModule = findModuleBlock(text, moduleKey);
    if (!currentModule) throw new Error(`Module ${moduleKey} disappeared in ${filePath}`);
    let nsBlock = findObjectBlockWithin(text, currentModule.start, currentModule.end, ns);

    if (!nsBlock) {
      const insertAt = currentModule.end;
      const blockIndent = `${currentModule.indent}    `;
      const entryIndent = `${blockIndent}    `;
      const body = entries.map((e) => `${entryIndent}${e.key}: ${JSON.stringify(e.value)},`).join("\n");
      const addition = `\n${blockIndent}${ns}: {\n${body}\n${blockIndent}},`;
      text = `${text.slice(0, insertAt)}${addition}${text.slice(insertAt)}`;
      applied += entries.length;
      continue;
    }

    for (const e of entries) {
      const existsRegex = new RegExp(`\\b${e.key}\\s*:`);
      const nsSlice = text.slice(nsBlock.start, nsBlock.end + 1);
      if (existsRegex.test(nsSlice)) continue;

      const beforeClose = nsBlock.end;
      const inner = text.slice(nsBlock.start, nsBlock.end + 1);
      const firstEntryMatch = inner.match(/\n(\s+)[a-zA-Z0-9_]+\s*:/);
      const entryIndent = firstEntryMatch ? firstEntryMatch[1] : `${currentModule.indent}        `;
      const addition = `\n${entryIndent}${e.key}: ${JSON.stringify(e.value)},`;
      text = `${text.slice(0, beforeClose)}${addition}${text.slice(beforeClose)}`;
      applied += 1;
      // refresh ns block after text shift
      currentModule = findModuleBlock(text, moduleKey)!;
      nsBlock = findObjectBlockWithin(text, currentModule.start, currentModule.end, ns)!;
    }
  }

  if (!dryRun) fs.writeFileSync(filePath, text, "utf8");
  return applied;
}

function findI18nFileForModule(lang: "en" | "cn" | "de", moduleKey: string): string {
  const dir = path.resolve("src/lib/i18n", lang);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".ts"));
  for (const f of files) {
    const p = path.join(dir, f);
    const content = fs.readFileSync(p, "utf8");
    if (content.includes(`${moduleKey}: {`)) return p;
  }
  throw new Error(`Cannot locate module ${moduleKey} in src/lib/i18n/${lang}`);
}

function runCmd(cmd: string): void {
  execSync(cmd, { stdio: "inherit" });
}

function main(): void {
  const candidatesArg = getArg("--candidates");
  const translationsArg = getArg("--translations");
  const dryRun = hasFlag("--dry-run");
  if (!candidatesArg || !translationsArg) usage();

  const cFile = parseJsonFile<CandidateFile>(path.resolve(candidatesArg));
  const tRaw = parseJsonFile<TranslationMap | ReviewedTranslationFile>(path.resolve(translationsArg));
  const tFile = normalizeTranslations(tRaw);

  const pageResult = applyPageReplacements(cFile, dryRun);
  console.log(`Updated page lines: ${pageResult.changed}`);

  const moduleKey = cFile.module;
  let totalKeys = 0;
  for (const lang of ["en", "cn", "de"] as const) {
    if (!tFile[lang]) continue;
    const i18nPath = findI18nFileForModule(lang, moduleKey);
    const count = upsertModuleKeys(i18nPath, moduleKey, tFile[lang], dryRun);
    totalKeys += count;
    console.log(`${lang}: ${count} keys upserted in ${path.relative(process.cwd(), i18nPath)}`);
  }

  if (dryRun) {
    console.log("Dry-run completed. No files written.");
    return;
  }

  console.log(`Total i18n keys upserted: ${totalKeys}`);

  // Validation pipeline
  runCmd("npm run build");

  const domainFile = findI18nFileForModule("en", moduleKey);
  const domain = path.basename(domainFile, ".ts");
  if (["biology", "chemistry", "physics", "math"].includes(domain)) {
    runCmd(`npm run validate:translations ${domain}`);
  } else {
    console.log(`Skip validate:translations for unsupported domain: ${domain}`);
  }
  runCmd("bash scripts/audit-rendering.sh");
}

main();
