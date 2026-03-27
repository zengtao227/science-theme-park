import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { GC102Quest } from "./quests";

function getRuleLatex(quest: GC102Quest) {
  switch (quest.stage) {
    case "PRINCIPLES":
      return "m = \\frac{I \\cdot t \\cdot M}{z \\cdot F}";
    case "PLATING":
      return "\\text{The object being plated is connected to the cathode, where reduction deposits metal}";
    case "CORROSION":
      return "\\text{A sacrificial anode must be more reactive than iron so it oxidizes first}";
    default:
      return null;
  }
}

export function solveGC102(quest: GC102Quest, t: Translator) {
  const ruleLatex = getRuleLatex(quest);
  if (!ruleLatex) return { steps: [], fullSolutionLatex: null };

  const givenLatex =
    quest.stage === "PRINCIPLES"
      ? `I=${quest.current}\\text{ A},\\ t=${quest.time}\\text{ s},\\ \\text{metal}=${quest.metal}`
      : `\\text{Metal}=${quest.metal},\\ \\text{solution}=${quest.solution}`;

  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), givenLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "\\text{Apply the electrolysis or corrosion rule to determine the requested outcome}"),
    makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];

  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
