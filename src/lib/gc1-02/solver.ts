import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { GC102Quest } from "./quests";

function getRuleLatex(quest: GC102Quest, t: Translator) {
  switch (quest.stage) {
    case "PRINCIPLES":
      return "m = \\frac{I \\cdot t \\cdot M}{z \\cdot F}";
    case "PLATING":
      return `\\text{${t("chemistry.gc1_02.solver.rule_plating")}}`;
    case "CORROSION":
      return `\\text{${t("chemistry.gc1_02.solver.rule_corrosion")}}`;
    default:
      return null;
  }
}

export function solveGC102(quest: GC102Quest, t: Translator) {
  const ruleLatex = getRuleLatex(quest, t);
  if (!ruleLatex) return { steps: [], fullSolutionLatex: null };

  const givenLatex =
    quest.stage === "PRINCIPLES"
      ? `I=${quest.current}\\text{ A},\\ t=${quest.time}\\text{ s},\\ \\text{${escapeLatexText(t("chemistry.gc1_02.solver.metal_label"))}}=${escapeLatexText(quest.metal)}`
      : `\\text{${escapeLatexText(t("chemistry.gc1_02.solver.metal_label"))}}=${escapeLatexText(quest.metal)},\\ \\text{${escapeLatexText(t("chemistry.gc1_02.solver.solution_label"))}}=${escapeLatexText(quest.solution)}`;

  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), givenLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\text{${t("chemistry.gc1_02.solver.apply_rule_to_outcome")}}`),
    makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];

  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
