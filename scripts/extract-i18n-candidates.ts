import fs from "node:fs";
import path from "node:path";

type FormulaField =
  | "promptLatex"
  | "expressionLatex"
  | "labelLatex"
  | "hintLatex"
  | "correctLatex"
  | "targetLatex";

type Candidate = {
  line: number;
  field: FormulaField;
  raw: string;
  suggested_key: string | null;
  has_interpolation: boolean;
  has_math_symbols: boolean;
  auto_exempt: boolean;
  auto_exempt_reason?: string;
  suggested_exempt: boolean;
  exempt_reason?: string;
};

type ExtractResult = {
  module: string;
  source_file: string;
  generated_at: string;
  candidates: Candidate[];
};

function getArg(name: string): string | undefined {
  const idx = process.argv.indexOf(name);
  return idx >= 0 ? process.argv[idx + 1] : undefined;
}

function usage(): never {
  console.error(
    "Usage: node --experimental-strip-types scripts/extract-i18n-candidates.ts --module <src/app/chamber/<mod>/page.tsx> [--out <output.json>]"
  );
  process.exit(1);
}

function moduleFromPath(filePath: string): string {
  const moduleName = path.basename(path.dirname(filePath));
  return moduleName.replace(/-/g, "_");
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/\\text\{([^}]*)\}/g, "$1")
    .replace(/\\[a-zA-Z]+/g, " ")
    .replace(/[$^{}_()[\]<>=%,+\-*/|]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
}

function suggestNamespace(field: FormulaField): "prompts" | "expr" | "labels" | "hints" {
  if (field === "promptLatex") return "prompts";
  if (field === "expressionLatex") return "expr";
  if (field === "hintLatex") return "hints";
  return "labels";
}

function parseLiteral(line: string, field: FormulaField): string | null {
  const direct = new RegExp(`${field}\\s*:\\s*([\\\`"'])(.*?)\\1`);
  const m1 = line.match(direct);
  if (m1) return m1[2];

  if (field === "hintLatex") {
    const inArray = /hintLatex\s*:\s*\[\s*([`"'])(.*?)\1/;
    const m2 = line.match(inArray);
    if (m2) return m2[2];
  }

  return null;
}

function containsTextCommand(raw: string): boolean {
  return raw.includes("\\text{");
}

function hasInterpolation(raw: string): boolean {
  return /\$\{[^}]+\}/.test(raw);
}

function hasMathSymbols(raw: string): boolean {
  return /\\(frac|log|sqrt|times|cdot|approx|Delta|sum|int|rightarrow)|[_^=]/.test(raw);
}

function hasUnitText(raw: string): boolean {
  // Unit-like text inside \text{...}, e.g. Pa, mol, mL, m^3, K, kg
  return /\\text\{\s*[^}]*[A-Za-z%°][^}]*\}/.test(raw);
}

function textContentRatio(raw: string): number {
  const textMatches = [...raw.matchAll(/\\text\{([^}]*)\}/g)];
  const textLen = textMatches.reduce((sum, m) => sum + (m[1]?.length ?? 0), 0);
  const plain = raw.replace(/\\[a-zA-Z]+/g, "").replace(/[{}]/g, "");
  const totalLen = Math.max(plain.length, 1);
  return textLen / totalLen;
}

function main(): void {
  const modulePathArg = getArg("--module");
  if (!modulePathArg) usage();

  const absModulePath = path.resolve(modulePathArg);
  if (!fs.existsSync(absModulePath)) {
    console.error(`File not found: ${absModulePath}`);
    process.exit(1);
  }

  const moduleKey = moduleFromPath(absModulePath);
  const outArg = getArg("--out");
  const outPath = outArg
    ? path.resolve(outArg)
    : path.resolve("temp/handoff", `${moduleKey}-i18n-candidates.json`);

  const lines = fs.readFileSync(absModulePath, "utf8").split("\n");
  const fields: FormulaField[] = [
    "promptLatex",
    "expressionLatex",
    "labelLatex",
    "hintLatex",
    "correctLatex",
    "targetLatex"
  ];

  const candidates: Candidate[] = [];

  lines.forEach((line, idx) => {
    const field = fields.find((f) => line.includes(f));
    if (!field) return;

    const raw = parseLiteral(line, field);
    if (!raw || !containsTextCommand(raw)) return;

    const interpolation = hasInterpolation(raw);
    const mathSymbols = hasMathSymbols(raw);
    const ratio = textContentRatio(raw);

    let autoExempt = false;
    let autoExemptReason: string | undefined;

    // Rule 1 - numeric result with unit text
    if ((/\\approx|=\s*[\d]/.test(raw) && hasUnitText(raw))) {
      autoExempt = true;
      autoExemptReason = "numeric result";
    }

    // Rule 2 - physical variable + unit, e.g. P \text{ (Pa)}
    if (!autoExempt && /^[A-Za-z_]\d*\s*\\text\{\s*\(/.test(raw)) {
      autoExempt = true;
      autoExemptReason = "physical variable + unit";
    }

    // Rule 3 - math-dominant formula
    if (!autoExempt && /\\(propto|times|frac|sqrt|approx)/.test(raw) && ratio < 0.5) {
      autoExempt = true;
      autoExemptReason = "math formula";
    }

    let suggestedExempt = false;
    let exemptReason: string | undefined;

    if (interpolation) {
      suggestedExempt = true;
      exemptReason = "runtime interpolation";
    } else if (autoExempt) {
      suggestedExempt = true;
      exemptReason = autoExemptReason;
    } else if (mathSymbols && (field === "promptLatex" || field === "hintLatex" || field === "expressionLatex")) {
      suggestedExempt = true;
      exemptReason = "math symbols mixed with text";
    }

    const namespace = suggestNamespace(field);
    const stem = slugify(raw) || `${field.toLowerCase()}_${idx + 1}`;
    const suggestedKey = suggestedExempt ? null : `${moduleKey}.${namespace}.${stem}`;

    candidates.push({
      line: idx + 1,
      field,
      raw,
      suggested_key: suggestedKey,
      has_interpolation: interpolation,
      has_math_symbols: mathSymbols,
      auto_exempt: autoExempt,
      ...(autoExemptReason ? { auto_exempt_reason: autoExemptReason } : {}),
      suggested_exempt: suggestedExempt,
      ...(exemptReason ? { exempt_reason: exemptReason } : {})
    });
  });

  const result: ExtractResult = {
    module: moduleKey,
    source_file: path.relative(process.cwd(), absModulePath),
    generated_at: new Date().toISOString(),
    candidates
  };

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");

  console.log(`Extracted ${candidates.length} candidates`);
  console.log(`Output: ${outPath}`);
}

main();
