import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "MONOHYBRID" | "PROBABILITY" | "DIHYBRID";
type Genotype = "RR" | "Rr" | "rr" | "AA" | "Aa" | "aa" | "BB" | "Bb" | "bb";

export interface SB203SolverQuest extends Quest {
  stage: Stage;
  p1: Genotype;
  p2: Genotype;
}

function gametes(genotype: Genotype) {
  if (genotype.length !== 2) return [genotype];
  return genotype[0] === genotype[1] ? [genotype[0]] : [genotype[0], genotype[1]];
}

function combineGametes(a: string, b: string) {
  return [a, b].sort((x, y) => {
    const xl = x.toLowerCase();
    const yl = y.toLowerCase();
    if (xl === yl) return x === xl ? 1 : -1;
    return xl.localeCompare(yl);
  }).join("");
}

function punnettOutcomes(quest: SB203SolverQuest) {
  const left = gametes(quest.p1);
  const right = gametes(quest.p2);
  const outcomes: string[] = [];
  for (const a of left) {
    for (const b of right) outcomes.push(combineGametes(a, b));
  }
  return outcomes;
}

function listGametesLatex(genotype: Genotype) {
  return gametes(genotype).join(",\\ ");
}

function countGenotypes(outcomes: string[]) {
  return outcomes.reduce<Record<string, number>>((acc, outcome) => {
    acc[outcome] = (acc[outcome] ?? 0) + 1;
    return acc;
  }, {});
}

function dominantPhenotypeCount(outcomes: string[]) {
  return outcomes.filter((outcome) => /[A-Z]/.test(outcome[0])).length;
}

function recessivePhenotypeCount(outcomes: string[]) {
  return outcomes.length - dominantPhenotypeCount(outcomes);
}

function parseTargetGenotype(quest: SB203SolverQuest) {
  const match = quest.expressionLatex.match(/P\(([^)]+)\)/);
  return match?.[1] ?? null;
}

function ratioFraction(answer: string) {
  const normalized = answer.replace(/\\%/g, "%");
  switch (normalized) {
    case "56.25%":
    case "0.5625":
      return { numerator: 9, denominator: 16 };
    case "18.75%":
    case "0.1875":
      return { numerator: 3, denominator: 16 };
    case "6.25%":
    case "0.0625":
    case "0.25":
    case "25%":
      return { numerator: 1, denominator: 4 };
    case "75%":
    case "0.75":
      return { numerator: 3, denominator: 4 };
    case "50%":
    case "0.5":
      return { numerator: 1, denominator: 2 };
    case "100%":
    case "1.0":
      return { numerator: 1, denominator: 1 };
    case "0%":
      return { numerator: 0, denominator: 1 };
    default:
      return null;
  }
}

function buildRuleLatex(quest: SB203SolverQuest, t: Translator) {
  if (quest.stage === "MONOHYBRID") return `\\text{${escapeLatexText(t("biology.sb2_03.solver.rule_monohybrid"))}}`;
  if (quest.stage === "PROBABILITY") return `\\text{${escapeLatexText(t("biology.sb2_03.solver.rule_probability"))}}`;
  if (quest.stage === "DIHYBRID") return `\\text{${escapeLatexText(t("biology.sb2_03.solver.rule_dihybrid"))}}`;
  return null;
}

function buildGameteStepLatex(quest: SB203SolverQuest, t: Translator) {
  if (quest.stage === "DIHYBRID") {
    return `\\text{${escapeLatexText(t("biology.sb2_03.solver.classic_dihybrid_gametes"))}}`;
  }
  return `\\text{${escapeLatexText(t("biology.sb2_03.solver.gametes_from"))}} ${quest.p1}: ${listGametesLatex(quest.p1)};\\ \\text{${escapeLatexText(t("biology.sb2_03.solver.gametes_from"))}} ${quest.p2}: ${listGametesLatex(quest.p2)}`;
}

function buildOutcomeStepLatex(quest: SB203SolverQuest, t: Translator) {
  if (quest.stage === "DIHYBRID") {
    return `\\text{${escapeLatexText(t("biology.sb2_03.solver.dihybrid_outcomes_label"))}}\\ 9:3:3:1`;
  }

  const outcomes = punnettOutcomes(quest).join(",\\ ");
  return `\\text{${escapeLatexText(t("biology.sb2_03.solver.outcomes_label"))}} ${outcomes}`;
}

function buildCountStepLatex(quest: SB203SolverQuest, t: Translator) {
  const outcomes = punnettOutcomes(quest);

  if (quest.stage === "MONOHYBRID") {
    const genotypeCounts = countGenotypes(outcomes);
    if (quest.correctLatex.includes(":2:")) {
      const values = Object.entries(genotypeCounts)
        .map(([genotype, count]) => `${genotype}:${count}`)
        .join(",\\ ");
      return `\\text{${escapeLatexText(t("biology.sb2_03.solver.genotype_count_label"))}} ${values}`;
    }

    const dominant = dominantPhenotypeCount(outcomes);
    const recessive = recessivePhenotypeCount(outcomes);
    return `\\text{${escapeLatexText(t("biology.sb2_03.solver.phenotype_count_label"))}} ${dominant}:${recessive}`;
  }

  if (quest.stage === "PROBABILITY") {
    const target = parseTargetGenotype(quest) ?? quest.correctLatex;
    const matching = outcomes.filter((outcome) => outcome === target).length;
    return `\\text{${escapeLatexText(t("biology.sb2_03.solver.matching_outcomes_label"))}} ${matching}/${outcomes.length}`;
  }

  const fraction = ratioFraction(quest.correctLatex);
  if (!fraction) {
    return `\\text{${escapeLatexText(t("biology.sb2_03.solver.treat_cross_as_independent"))}} ${quest.p1} \\times ${quest.p2}`;
  }
  return `\\text{${escapeLatexText(t("biology.sb2_03.solver.convert_ratio_label"))}} \\frac{${fraction.numerator}}{${fraction.denominator}}`;
}

export function solveSB203(quest: SB203SolverQuest, t: Translator) {
  const ruleLatex = buildRuleLatex(quest, t);
  if (!ruleLatex) return { steps: [], fullSolutionLatex: null };
  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex || quest.promptLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("biology.sb2_03.solver.list_parent_gametes"), buildGameteStepLatex(quest, t)),
    makeStep(4, t("biology.sb2_03.solver.build_punnett_square"), buildOutcomeStepLatex(quest, t)),
    makeStep(5, t("biology.sb2_03.solver.count_matching_offspring"), buildCountStepLatex(quest, t)),
    makeStep(6, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
