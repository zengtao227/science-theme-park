import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "FOOD_CHAINS" | "ENERGY_FLOW" | "CYCLES" | "ELITE";

export interface SB301SolverQuest extends Quest {
  stage: Stage;
  scenario: string;
}

function buildRuleLatex(quest: SB301SolverQuest, t: Translator) {
  if (quest.stage === "FOOD_CHAINS") return `\\text{${escapeLatexText(t("biology.sb3_01.solver.rule_food_chains"))}}`;
  if (quest.stage === "ENERGY_FLOW") return "E_{next} = 0.1 \\times E_{current}";
  if (quest.stage === "CYCLES") return `\\text{${escapeLatexText(t("biology.sb3_01.solver.rule_cycles"))}}`;
  if (quest.stage === "ELITE") return `\\text{${escapeLatexText(t("biology.sb3_01.solver.rule_elite"))}}`;
  return null;
}

function buildSolveLatex(quest: SB301SolverQuest, t: Translator) {
  if (quest.stage === "FOOD_CHAINS") return `\\text{${escapeLatexText(t("biology.sb3_01.solver.solve_food_chains"))}}`;
  if (quest.stage === "ENERGY_FLOW") return `\\text{${escapeLatexText(t("biology.sb3_01.solver.solve_energy_flow"))}}`;
  if (quest.stage === "CYCLES") return `\\text{${escapeLatexText(t("biology.sb3_01.solver.solve_cycles"))}}`;
  if (quest.id.startsWith("ELITE-B1")) return `\\text{${escapeLatexText(t("biology.sb3_01.solver.solve_elite_b1"))}}\\; \\eta = \\frac{E_c}{E_a}\\times 100\\%`;
  if (quest.id.startsWith("ELITE-B2")) return `\\text{${escapeLatexText(t("biology.sb3_01.solver.solve_elite_b2"))}}`;
  if (quest.id.startsWith("ELITE-C1")) return `\\text{${escapeLatexText(t("biology.sb3_01.solver.solve_elite_c1"))}}`;
  if (quest.id.startsWith("ELITE-C2")) return `\\text{${escapeLatexText(t("biology.sb3_01.solver.solve_elite_c2"))}}\\; R = \\frac{B_p}{B_s}`;
  if (quest.id.startsWith("ELITE-A1")) return `\\text{${escapeLatexText(t("biology.sb3_01.solver.solve_elite_a1"))}}\\; \\left(1-\\frac{N}{K}\\right)`;
  if (quest.id.startsWith("ELITE-A2")) return `\\text{${escapeLatexText(t("biology.sb3_01.solver.solve_elite_a2"))}}\\; N(t)=N_0(1+r)^t`;
  return `\\text{${escapeLatexText(t("biology.sb3_01.solver.solve_default"))}}`;
}

export function solveSB301(quest: SB301SolverQuest, t: Translator) {
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
