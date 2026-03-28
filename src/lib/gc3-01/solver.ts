import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { GC301Quest } from "./quests";

function getRuleLatex(stage: GC301Quest["stage"], t: Translator) {
  switch (stage) {
    case "CONCENTRATION":
      return `\\text{${t("chemistry.gc3_01.solver.rule_concentration")}}`;
    case "TEMPERATURE":
      return `\\text{${t("chemistry.gc3_01.solver.rule_temperature")}}`;
    case "PRESSURE":
      return `\\text{${t("chemistry.gc3_01.solver.rule_pressure")}}`;
    default:
      return null;
  }
}

export function solveGC301(quest: GC301Quest, t: Translator) {
  const ruleLatex = getRuleLatex(quest.stage, t);
  if (!ruleLatex) return { steps: [], fullSolutionLatex: null };

  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), `\\text{${t("chemistry.gc3_01.solver.reaction_label")}} A + B \\rightleftharpoons C + D`),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\text{${t("chemistry.gc3_01.solver.determine_shift_or_effect")}}`),
    makeStep(4, t("common.feedback_reasons.state_final_result"), `\\text{${quest.correctLatex}}`, "key"),
  ];

  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
