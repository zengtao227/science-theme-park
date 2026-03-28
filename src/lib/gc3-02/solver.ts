import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { GC302Quest } from "./quests";

function getRuleLatex(stage: GC302Quest["stage"], t: Translator) {
  switch (stage) {
    case "SC":
      return `\\text{${t("chemistry.gc3_02.solver.rule_sc")}}`;
    case "BCC":
      return `\\text{${t("chemistry.gc3_02.solver.rule_bcc")}}`;
    case "FCC":
      return `\\text{${t("chemistry.gc3_02.solver.rule_fcc")}}`;
    default:
      return null;
  }
}

export function solveGC302(quest: GC302Quest, t: Translator) {
  const ruleLatex = getRuleLatex(quest.stage, t);
  if (!ruleLatex) return { steps: [], fullSolutionLatex: null };

  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), `\\text{${t("chemistry.gc3_02.solver.lattice_type_label")}} \\text{${escapeLatexText(quest.stage)}}`),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\text{${t("chemistry.gc3_02.solver.read_lattice_property")}}`),
    makeStep(4, t("common.feedback_reasons.state_final_result"), `\\text{${escapeLatexText(quest.correctLatex)}}`, "key"),
  ];

  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
