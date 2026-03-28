import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "MONOHYBRID" | "PROBABILITY" | "DIHYBRID";
type Genotype = "RR" | "Rr" | "rr" | "AA" | "Aa" | "aa" | "BB" | "Bb" | "bb";

export interface SB203SolverQuest extends Quest {
  stage: Stage;
  p1: Genotype;
  p2: Genotype;
}

function buildRuleLatex(quest: SB203SolverQuest) {
  if (quest.stage === "MONOHYBRID") return "\\text{Build a 2\\times 2 Punnett square and compare dominant and recessive outcomes}";
  if (quest.stage === "PROBABILITY") return "\\text{Use Punnett-square outcomes as probabilities for the requested genotype or phenotype}";
  if (quest.stage === "DIHYBRID") return "\\text{Combine independent trait outcomes or use the classic 9:3:3:1 dihybrid model}";
  return null;
}

function buildSolveLatex(quest: SB203SolverQuest) {
  return `\\text{Cross } ${quest.p1} \\times ${quest.p2} \\text{ and count the matching offspring outcomes}`;
}

export function solveSB203(quest: SB203SolverQuest, t: Translator) {
  const ruleLatex = buildRuleLatex(quest);
  const solveLatex = buildSolveLatex(quest);
  if (!ruleLatex || !solveLatex) return { steps: [], fullSolutionLatex: null };
  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex || quest.promptLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), solveLatex),
    makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
