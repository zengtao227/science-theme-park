import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { SB204Quest } from "@/lib/sb2-04-types";

function buildRuleLatex(quest: SB204Quest, t: Translator) {
  if (quest.stage === "DIGESTIVE_SYSTEM") return `\\text{${escapeLatexText(t("biology.sb2_04.solver.rule_digestive"))}}`;
  if (quest.stage === "RESPIRATORY_SYSTEM") return `\\text{${escapeLatexText(t("biology.sb2_04.solver.rule_respiratory"))}}`;
  if (quest.stage === "CIRCULATORY_SYSTEM") return `\\text{${escapeLatexText(t("biology.sb2_04.solver.rule_circulatory"))}}`;
  if (quest.stage === "EXCRETORY_SYSTEM") return `\\text{${escapeLatexText(t("biology.sb2_04.solver.rule_excretory"))}}`;
  return null;
}

function buildSolveLatex(quest: SB204Quest, t: Translator) {
  if (quest.explanation) {
    return `\\text{${escapeLatexText(t("biology.sb2_04.solver.reasoning_label"))}} ${escapeLatexText(quest.explanation)}`;
  }
  return `\\text{${escapeLatexText(t("biology.sb2_04.solver.use_question_type_clue", { type: quest.questionType }))}}`;
}

export function solveSB204(quest: SB204Quest, t: Translator) {
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
