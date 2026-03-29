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

function buildRuleLatex(quest: SB203SolverQuest, t: Translator) {
  if (quest.stage === "MONOHYBRID") return `\\text{${escapeLatexText(t("biology.sb2_03.solver.rule_monohybrid"))}}`;
  if (quest.stage === "PROBABILITY") return `\\text{${escapeLatexText(t("biology.sb2_03.solver.rule_probability"))}}`;
  if (quest.stage === "DIHYBRID") return `\\text{${escapeLatexText(t("biology.sb2_03.solver.rule_dihybrid"))}}`;
  return null;
}

function buildSolveLatex(quest: SB203SolverQuest, t: Translator) {
  const outcomes = punnettOutcomes(quest).join(",\\ ");
  if (quest.stage === "PROBABILITY") {
    return `\\text{${escapeLatexText(t("biology.sb2_03.solver.gametes_from"))}} ${quest.p1}: ${gametes(quest.p1).join(", ")};\\ \\text{${escapeLatexText(t("biology.sb2_03.solver.gametes_from"))}} ${quest.p2}: ${gametes(quest.p2).join(", ")}.\\ \\text{${escapeLatexText(t("biology.sb2_03.solver.outcomes_label"))}} ${outcomes}`;
  }
  if (quest.stage === "DIHYBRID") {
    return `\\text{${escapeLatexText(t("biology.sb2_03.solver.treat_cross_as_independent"))}} ${quest.p1} \\times ${quest.p2}`;
  }
  return `\\text{${escapeLatexText(t("biology.sb2_03.solver.cross_label"))}} ${quest.p1} \\times ${quest.p2}.\\ \\text{${escapeLatexText(t("biology.sb2_03.solver.outcomes_label"))}} ${outcomes}`;
}

export function solveSB203(quest: SB203SolverQuest, t: Translator) {
  const ruleLatex = buildRuleLatex(quest, t);
  const solveLatex = buildSolveLatex(quest, t);
  if (!ruleLatex || !solveLatex) return { steps: [], fullSolutionLatex: null };
  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex || quest.promptLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), solveLatex),
    makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
