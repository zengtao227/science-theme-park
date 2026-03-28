import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { SB204Quest } from "@/lib/sb2-04-types";

function buildRuleLatex(quest: SB204Quest) {
  if (quest.stage === "DIGESTIVE_SYSTEM") return "\\text{Use digestive anatomy and process logic to identify the correct structure or outcome}";
  if (quest.stage === "RESPIRATORY_SYSTEM") return "\\text{Use airway and gas-exchange physiology to select the correct answer}";
  if (quest.stage === "CIRCULATORY_SYSTEM") return "\\text{Use circulation roles, vessel properties, and heart function to decide the answer}";
  if (quest.stage === "EXCRETORY_SYSTEM") return "\\text{Use kidney, filtration, and excretion physiology to identify the correct response}";
  return null;
}

function buildSolveLatex(quest: SB204Quest) {
  if (quest.explanation) {
    return `\\text{Reasoning: } ${escapeLatexText(quest.explanation)}`;
  }
  return `\\text{Use the } ${escapeLatexText(quest.questionType)} \\text{ clue to identify the matching physiological structure or outcome}`;
}

export function solveSB204(quest: SB204Quest, t: Translator) {
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
