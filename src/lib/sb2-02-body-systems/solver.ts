import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "DIGESTIVE" | "CIRCULATORY" | "RESPIRATORY";

export interface SB202BodySystemsSolverQuest extends Quest {
  stage: Stage;
  systemType?: string;
  organPath?: string[];
}

function buildRuleLatex(quest: SB202BodySystemsSolverQuest) {
  if (quest.stage === "DIGESTIVE") return "\\text{Use digestive anatomy and process knowledge to justify the organ or function}";
  if (quest.stage === "CIRCULATORY") return "\\text{Use blood-flow logic, vessel roles, and circulation facts}";
  if (quest.stage === "RESPIRATORY") return "\\text{Use airway, lung, and gas-exchange physiology to justify the answer}";
  return null;
}

function buildSolveLatex(quest: SB202BodySystemsSolverQuest) {
  return `\\text{Interpret the system-specific clue for } \\text{${quest.systemType || "the current body system"}}`;
}

export function solveSB202BodySystems(quest: SB202BodySystemsSolverQuest, t: Translator) {
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
