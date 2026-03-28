import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "DIGESTIVE" | "CIRCULATORY" | "RESPIRATORY";

export interface SB202SolverQuest extends Quest {
  stage: Stage;
  organ?: string;
  system?: string;
}

function buildRuleLatex(quest: SB202SolverQuest) {
  if (quest.stage === "DIGESTIVE") return "\\text{Match each digestive organ to its role in breakdown, secretion, or absorption}";
  if (quest.stage === "CIRCULATORY") return "\\text{Match each circulatory structure to pumping, transport, or exchange}";
  if (quest.stage === "RESPIRATORY") return "\\text{Match each respiratory structure to ventilation or gas exchange}";
  return null;
}

function buildSolveLatex(quest: SB202SolverQuest) {
  return `\\text{Use the clue to identify the body-system structure } \\text{${quest.organ || "described in the prompt"}}`;
}

export function solveSB202(quest: SB202SolverQuest, t: Translator) {
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
