import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { GC101Quest } from "./quests";

function getRuleLatex(stage: GC101Quest["stage"]) {
  switch (stage) {
    case "BUILD":
      return null;
    case "MEASURE":
      return "E_{cell} = E^\\circ_{cathode} - E^\\circ_{anode}";
    case "ANALYZE":
      return "E = E^\\circ - \\frac{0.0592}{n}\\log Q";
    default:
      return null;
  }
}

export function solveGC101(quest: GC101Quest, t: Translator) {
  const ruleLatex = quest.stage === "BUILD"
    ? `\\text{${escapeLatexText(t("chemistry.gc1_01.solver.rule_build"))}}`
    : getRuleLatex(quest.stage);
  if (!ruleLatex) return { steps: [], fullSolutionLatex: null };

  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), `\\text{${escapeLatexText(t("chemistry.gc1_01.solver.zn_cu_cell_at_temp", { temp: quest.simConfig.temp }))}}`),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\text{${escapeLatexText(t("chemistry.gc1_01.solver.solve_use_cell_rule"))}}`),
    makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];

  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
