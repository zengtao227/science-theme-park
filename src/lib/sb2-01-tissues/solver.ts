import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "TISSUES" | "ORGANS" | "SYSTEMS";

export interface SB201TissuesSolverQuest extends Quest {
  stage: Stage;
  tissueType?: string;
  organName?: string;
  systemName?: string;
}

function buildRuleLatex(quest: SB201TissuesSolverQuest, t: Translator) {
  if (quest.stage === "TISSUES") return `\\text{${escapeLatexText(t("biology.sb2_01_tissues.solver.rule_tissues"))}}`;
  if (quest.stage === "ORGANS") return `\\text{${escapeLatexText(t("biology.sb2_01_tissues.solver.rule_organs"))}}`;
  if (quest.stage === "SYSTEMS") return `\\text{${escapeLatexText(t("biology.sb2_01_tissues.solver.rule_systems"))}}`;
  return null;
}

function buildSolveLatex(quest: SB201TissuesSolverQuest, t: Translator) {
  if (quest.stage === "TISSUES") return `\\text{${escapeLatexText(t("biology.sb2_01_tissues.solver.solve_tissues", { name: quest.tissueType || t("biology.sb2_01_tissues.solver.default_tissue") }))}}`;
  if (quest.stage === "ORGANS") return `\\text{${escapeLatexText(t("biology.sb2_01_tissues.solver.solve_organs", { name: quest.organName || t("biology.sb2_01_tissues.solver.default_organ") }))}}`;
  return `\\text{${escapeLatexText(t("biology.sb2_01_tissues.solver.solve_systems", { name: quest.systemName || t("biology.sb2_01_tissues.solver.default_system") }))}}`;
}

export function solveSB201Tissues(quest: SB201TissuesSolverQuest, t: Translator) {
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
