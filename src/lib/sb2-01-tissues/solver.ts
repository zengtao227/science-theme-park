import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "TISSUES" | "ORGANS" | "SYSTEMS";

export interface SB201TissuesSolverQuest extends Quest {
  stage: Stage;
  tissueType?: string;
  organName?: string;
  systemName?: string;
}

function buildRuleLatex(quest: SB201TissuesSolverQuest) {
  if (quest.stage === "TISSUES") return "\\text{Match the tissue clue to the tissue type or its defining function}";
  if (quest.stage === "ORGANS") return "\\text{Use the named organ to identify the tissue, structure, or physiological fact being tested}";
  if (quest.stage === "SYSTEMS") return "\\text{Use the biological hierarchy or the defining role of the organ system}";
  return null;
}

function buildSolveLatex(quest: SB201TissuesSolverQuest) {
  if (quest.stage === "TISSUES") return `\\text{Use the clue for } \\text{${quest.tissueType || "the tissue"}} \\text{ to determine the answer}`;
  if (quest.stage === "ORGANS") return `\\text{Interpret the organ-specific clue for } \\text{${quest.organName || "the organ"}}`;
  return `\\text{Interpret the system clue for } \\text{${quest.systemName || "the biological hierarchy"}}`;
}

export function solveSB201Tissues(quest: SB201TissuesSolverQuest, t: Translator) {
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
