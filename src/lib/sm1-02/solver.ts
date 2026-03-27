import type { PlatformSolutionStep } from "@/hooks/useQuestManager";

type Stage = "VARIABLES" | "TERMS" | "SUBSTITUTION";

export interface SM102FeedbackQuestShape {
  stage: Stage;
  promptLatex: string;
  expressionLatex?: string;
  targetLatex?: string;
}

type Translator = (key: string, params?: Record<string, string | number>) => string;

interface ParsedTerm {
  coefficient: number;
  variable: string | null;
  power: number;
}

function makeStep(stepNumber: number, justification: string, expressionLatex: string, emphasis?: PlatformSolutionStep["emphasis"]): PlatformSolutionStep {
  return { stepNumber, justification, expressionLatex, emphasis };
}

function buildFullSolution(steps: PlatformSolutionStep[]) {
  return steps.map((s) => `\\text{${s.justification}} \\implies ${s.expressionLatex}`).join(" \\\\ ");
}

function extractAssignments(prompt: string) {
  const assignments = new Map<string, number>();
  const regex = /([a-zA-Z])=(-?\d+(?:\.\d+)?)/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(prompt)) !== null) {
    assignments.set(match[1], Number(match[2]));
  }
  return assignments;
}

function normalizeExpression(expr: string) {
  return expr.replace(/\s+/g, "").replace(/−/g, "-");
}

function tokenize(expr: string) {
  const normalized = normalizeExpression(expr);
  return normalized
    .replace(/-/g, "+-")
    .split("+")
    .map((token) => token.trim())
    .filter(Boolean);
}

function parseTerm(token: string): ParsedTerm | null {
  if (/^[+-]?\d+(?:\.\d+)?$/.test(token)) {
    return { coefficient: Number(token), variable: null, power: 0 };
  }
  const match = token.match(/^([+-]?\d*(?:\.\d+)?)?([a-zA-Z])(?:\^(\d+))?$/);
  if (!match) return null;
  const [, rawCoeff = "", variable, rawPower] = match;
  let coefficient = 1;
  if (rawCoeff === "-" ) coefficient = -1;
  else if (rawCoeff !== "" && rawCoeff !== "+") coefficient = Number(rawCoeff);
  const power = rawPower ? Number(rawPower) : 1;
  return { coefficient, variable, power };
}

function parseExpression(expr: string) {
  const terms = tokenize(expr).map(parseTerm);
  if (terms.some((term) => term == null)) {
    return null;
  }
  return terms as ParsedTerm[];
}

function formatSignedNumber(value: number) {
  return value < 0 ? `(${value})` : `${value}`;
}

function formatParsedTerm(term: ParsedTerm) {
  if (!term.variable) return `${term.coefficient}`;
  const coeff =
    term.coefficient === 1
      ? ""
      : term.coefficient === -1
        ? "-"
        : `${term.coefficient}`;
  return `${coeff}${term.variable}${term.power > 1 ? `^${term.power}` : ""}`;
}

function formatPolynomial(terms: ParsedTerm[]) {
  const visible = terms.filter((term) => term.coefficient !== 0);
  if (visible.length === 0) return "0";
  return visible
    .map((term, index) => {
      const raw = formatParsedTerm(term);
      if (index === 0) return raw;
      return raw.startsWith("-") ? raw : `+${raw}`;
    })
    .join("");
}

function evaluateExpression(terms: ParsedTerm[], assignments: Map<string, number>) {
  let total = 0;
  const substituted = terms.map((term) => {
    if (!term.variable) {
      total += term.coefficient;
      return `${term.coefficient}`;
    }
    const value = assignments.get(term.variable);
    if (value == null) return null;
    const contribution = term.coefficient * value ** term.power;
    total += contribution;
    if (term.power === 1) {
      return `${term.coefficient === 1 ? "" : term.coefficient === -1 ? "-" : `${term.coefficient}\\cdot `}${formatSignedNumber(value)}`;
    }
    return `${term.coefficient === 1 ? "" : term.coefficient === -1 ? "-" : `${term.coefficient}\\cdot `}${formatSignedNumber(value)}^{${term.power}}`;
  });
  if (substituted.some((part) => part == null)) return null;
  return { total, substituted: substituted as string[] };
}

function combineLikeTerms(terms: ParsedTerm[]) {
  const grouped = new Map<string, ParsedTerm>();
  for (const term of terms) {
    const key = `${term.variable ?? "const"}^${term.power}`;
    const existing = grouped.get(key);
    if (existing) existing.coefficient += term.coefficient;
    else grouped.set(key, { ...term });
  }
  return Array.from(grouped.values()).filter((term) => term.coefficient !== 0);
}

export function solveSM102(
  quest: SM102FeedbackQuestShape,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  if (!quest.expressionLatex) return { steps: [], fullSolutionLatex: null };
  const parsed = parseExpression(quest.expressionLatex);
  if (!parsed) return { steps: [], fullSolutionLatex: null };

  const steps: PlatformSolutionStep[] = [];

  if (quest.stage === "VARIABLES") {
    const assignments = extractAssignments(quest.promptLatex);
    if (assignments.size === 0) return { steps: [], fullSolutionLatex: null };
    const assignmentLatex = Array.from(assignments.entries()).map(([v, n]) => `${v}=${n}`).join(",\\;");
    steps.push(makeStep(1, t("sm1_02.reasons.identify_given_values"), assignmentLatex));
    const evaluated = evaluateExpression(parsed, assignments);
    if (!evaluated) return { steps: [], fullSolutionLatex: null };
    steps.push(makeStep(2, t("sm1_02.reasons.substitute_values"), `${normalizeExpression(quest.expressionLatex)}=${evaluated.substituted.join("+").replace(/\+\-/g, "-")}`));
    steps.push(makeStep(3, t("sm1_02.reasons.compute_final_result"), `${quest.targetLatex ?? evaluated.total}`, "key"));
  } else if (quest.stage === "TERMS") {
    steps.push(makeStep(1, t("sm1_02.reasons.identify_like_terms"), parsed.map(formatParsedTerm).join("+").replace(/\+\-/g, "-")));
    const grouped = combineLikeTerms(parsed);
    const variableTerms = grouped.filter((term) => term.variable);
    const constantTerms = grouped.filter((term) => !term.variable);
    if (variableTerms.length > 0) {
      steps.push(makeStep(2, t("sm1_02.reasons.combine_variable_terms"), formatPolynomial(variableTerms)));
    }
    if (constantTerms.length > 0) {
      steps.push(makeStep(steps.length + 1, t("sm1_02.reasons.combine_constant_terms"), formatPolynomial(constantTerms)));
    }
    steps.push(makeStep(steps.length + 1, t("sm1_02.reasons.rewrite_simplified_expression"), quest.targetLatex ?? formatPolynomial(grouped), "key"));
  } else {
    const assignments = extractAssignments(quest.promptLatex);
    if (assignments.size === 0) return { steps: [], fullSolutionLatex: null };
    const assignmentLatex = Array.from(assignments.entries()).map(([v, n]) => `${v}=${n}`).join(",\\;");
    steps.push(makeStep(1, t("sm1_02.reasons.identify_given_values"), assignmentLatex));
    if (parsed.some((term) => term.power > 1)) {
      steps.push(makeStep(2, t("sm1_02.reasons.evaluate_power_terms"), normalizeExpression(quest.expressionLatex)));
    } else {
      steps.push(makeStep(2, t("sm1_02.reasons.substitute_values"), normalizeExpression(quest.expressionLatex)));
    }
    const evaluated = evaluateExpression(parsed, assignments);
    if (!evaluated) return { steps: [], fullSolutionLatex: null };
    steps.push(makeStep(3, t("sm1_02.reasons.substitute_values"), `${normalizeExpression(quest.expressionLatex)}=${evaluated.substituted.join("+").replace(/\+\-/g, "-")}`));
    steps.push(makeStep(4, t("sm1_02.reasons.compute_final_result"), `${quest.targetLatex ?? evaluated.total}`, "key"));
  }

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
