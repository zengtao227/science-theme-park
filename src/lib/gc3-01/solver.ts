import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { GC301Quest } from "./quests";

function getRuleLatex(stage: GC301Quest["stage"]) {
  switch (stage) {
    case "CONCENTRATION":
      return "\\text{By Le Chatelier's principle, the equilibrium shifts to oppose a concentration change}";
    case "TEMPERATURE":
      return "\\text{Heating favors the endothermic direction; cooling favors the exothermic direction}";
    case "PRESSURE":
      return "\\text{Increasing pressure favors the side with fewer gas particles}";
    default:
      return null;
  }
}

export function solveGC301(quest: GC301Quest, t: Translator) {
  const ruleLatex = getRuleLatex(quest.stage);
  if (!ruleLatex) return { steps: [], fullSolutionLatex: null };

  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), "\\text{Reaction: } A + B \\rightleftharpoons C + D"),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "\\text{Determine the direction of shift or the equilibrium effect requested by the prompt}"),
    makeStep(4, t("common.feedback_reasons.state_final_result"), `\\text{${quest.correctLatex}}`, "key"),
  ];

  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
