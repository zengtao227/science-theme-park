import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "FOOD_CHAINS" | "ENERGY_FLOW" | "CYCLES" | "ELITE";

export interface SB301SolverQuest extends Quest {
  stage: Stage;
  scenario: string;
}

function buildRuleLatex(quest: SB301SolverQuest) {
  if (quest.stage === "FOOD_CHAINS") return "\\text{Follow producer } \\to \\text{ consumer } \\to \\text{ higher consumer}";
  if (quest.stage === "ENERGY_FLOW") return "E_{next} = 0.1 \\times E_{current}";
  if (quest.stage === "CYCLES") return "\\text{Match the biogeochemical process to its product or next reservoir}";
  if (quest.stage === "ELITE") return "\\text{Use the ecological formula or biodiversity model shown in the expression}";
  return null;
}

function buildSolveLatex(quest: SB301SolverQuest) {
  if (quest.stage === "FOOD_CHAINS") return "\\text{Identify the next trophic level from the chain given in the prompt}";
  if (quest.stage === "ENERGY_FLOW") return "\\text{Apply the 10\\% transfer rule to the energy value provided}";
  if (quest.stage === "CYCLES") return "\\text{Use the named cycle and process to infer the correct product}";
  if (quest.id.startsWith("ELITE-B1")) return `${quest.expressionLatex} = ${quest.correctLatex}`;
  if (quest.id.startsWith("ELITE-B2")) return "\\text{Compute each } p_i\\ln(p_i) \\text{ term, sum them, and change the sign to get the Shannon index.}";
  if (quest.id.startsWith("ELITE-C1")) return "\\text{Divide both sides by the initial population, take the natural logarithm, then isolate } r.";
  if (quest.id.startsWith("ELITE-C2")) return `${quest.expressionLatex} = ${quest.correctLatex}`;
  if (quest.id.startsWith("ELITE-A1")) return "\\text{Evaluate the logistic growth factor } \\left(1-\\frac{N}{K}\\right) \\text{ and multiply by } rN.";
  if (quest.id.startsWith("ELITE-A2")) return `${quest.expressionLatex} = ${quest.correctLatex}`;
  return "\\text{Apply the ecological relation shown to compute the target quantity}";
}

export function solveSB301(quest: SB301SolverQuest, t: Translator) {
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
