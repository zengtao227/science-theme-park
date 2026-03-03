import fs from "node:fs";
import path from "node:path";

type IssueType = "EMPTY" | "SAME_AS_KEY" | "TODO_MARKER" | "POSSIBLE_UNTRANSLATED";

type Issue = {
  file: string;
  line: number;
  lang: "en" | "cn" | "de";
  key: string;
  value: string;
  type: IssueType;
  reason: string;
};

type Report = {
  generated_at: string;
  summary: {
    files_scanned: number;
    issues_total: number;
    by_type: Record<IssueType, number>;
    by_lang: Record<"en" | "cn" | "de", number>;
  };
  issues: Issue[];
};

function todayCompact(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}${m}${day}`;
}

function stripInlineComment(line: string): string {
  let inString = false;
  let quote = "";
  let escaped = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === quote) {
        inString = false;
        quote = "";
      }
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inString = true;
      quote = ch;
      continue;
    }
    if (ch === "/" && line[i + 1] === "/") return line.slice(0, i);
  }
  return line;
}

function isKnownExempt(key: string, value: string): boolean {
  if (key.includes("placeholder")) return true;
  if (/^[-+]?[\d\s.,%]+$/.test(value)) return true;
  if (/^\\/.test(value)) return true; // latex/formula-like
  if (/[{}$]/.test(value)) return true; // template-ish values
  if (/^[A-Za-z]{1,3}$/.test(value)) return true; // unit/symbol-like tokens (m, km, ab)
  if (/^[A-Z_]{2,}$/.test(value)) return true; // enum-like stage/status tokens
  return false;
}

function looksEnglishLikePhrase(value: string): boolean {
  const tokens = (value.toLowerCase().match(/[a-z]{2,}/g) || []).filter((t) => t.length >= 2);
  if (tokens.length < 3) return false;

  const englishHintWords = new Set([
    "the",
    "and",
    "with",
    "from",
    "into",
    "between",
    "what",
    "which",
    "is",
    "are",
    "use",
    "count",
    "calculate",
    "determine",
    "find",
    "next",
    "answer",
    "problem",
    "show",
    "check",
    "hint"
  ]);

  let hits = 0;
  for (const t of tokens) {
    if (englishHintWords.has(t)) hits += 1;
  }
  return hits >= 2 && hits / tokens.length >= 0.2;
}

function scanFile(filePath: string, lang: "en" | "cn" | "de"): Issue[] {
  const lines = fs.readFileSync(filePath, "utf8").split("\n");
  const issues: Issue[] = [];
  const stack: string[] = [];

  for (let i = 0; i < lines.length; i += 1) {
    const lineNo = i + 1;
    const rawLine = lines[i];
    const line = stripInlineComment(rawLine).trim();
    if (!line) continue;

    // object open: key: {
    const openMatch = line.match(/^([A-Za-z0-9_]+)\s*:\s*\{$/);
    if (openMatch) {
      stack.push(openMatch[1]);
      continue;
    }

    // key-value string: key: "..."
    const kvMatch = line.match(/^([A-Za-z0-9_]+)\s*:\s*"((?:\\.|[^"\\])*)"\s*,?\s*$/);
    if (kvMatch) {
      const key = [...stack, kvMatch[1]].join(".");
      const value = kvMatch[2];
      if (!isKnownExempt(key, value)) {
        if (value === "") {
          issues.push({ file: filePath, line: lineNo, lang, key, value, type: "EMPTY", reason: "empty string value" });
        }
        if (value === kvMatch[1] && lang !== "en") {
          issues.push({
            file: filePath,
            line: lineNo,
            lang,
            key,
            value,
            type: "SAME_AS_KEY",
            reason: "value equals leaf key"
          });
        }
        if (/TODO|FIXME|TBD|PLACEHOLDER/i.test(value)) {
          issues.push({
            file: filePath,
            line: lineNo,
            lang,
            key,
            value,
            type: "TODO_MARKER",
            reason: "contains TODO/FIXME/TBD marker"
          });
        }
        if (lang !== "en" && value.length > 10 && looksEnglishLikePhrase(value)) {
          issues.push({
            file: filePath,
            line: lineNo,
            lang,
            key,
            value,
            type: "POSSIBLE_UNTRANSLATED",
            reason: "contains long English-like text"
          });
        }
      }
    }

    // close object(s)
    const closes = (line.match(/\}/g) || []).length;
    for (let c = 0; c < closes; c += 1) {
      if (stack.length > 0) stack.pop();
    }
  }

  return issues;
}

function main(): void {
  const root = path.resolve("src/lib/i18n");
  const langs: Array<"en" | "cn" | "de"> = ["en", "cn", "de"];
  const issues: Issue[] = [];
  let filesScanned = 0;

  for (const lang of langs) {
    const dir = path.join(root, lang);
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".ts"));
    for (const f of files) {
      const fp = path.join(dir, f);
      filesScanned += 1;
      issues.push(...scanFile(fp, lang));
    }
  }

  const byType: Record<IssueType, number> = {
    EMPTY: 0,
    SAME_AS_KEY: 0,
    TODO_MARKER: 0,
    POSSIBLE_UNTRANSLATED: 0
  };
  const byLang: Record<"en" | "cn" | "de", number> = { en: 0, cn: 0, de: 0 };
  for (const it of issues) {
    byType[it.type] += 1;
    byLang[it.lang] += 1;
  }

  const report: Report = {
    generated_at: new Date().toISOString(),
    summary: {
      files_scanned: filesScanned,
      issues_total: issues.length,
      by_type: byType,
      by_lang: byLang
    },
    issues
  };

  const outDir = path.resolve("candidates");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `quality-issues-${todayCompact()}.json`);
  fs.writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  console.log(`Scanned ${filesScanned} files`);
  console.log(`Found ${issues.length} issues`);
  console.log(`Output: ${outPath}`);
}

main();
