import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type OrganicQuest = {
  stage: "ALKANES" | "AROMATICS" | "BIOMOLECULES";
  promptLatex: string;
  correctLatex: string;
  simConfig: { molecule: string };
};

function getRuleLatex(stage: OrganicQuest["stage"], t: Translator) {
  switch (stage) {
    case "ALKANES":
      return `\\text{${t("chemistry.gc2_01.solver.rule_alkanes")}}`;
    case "AROMATICS":
      return `\\text{${t("chemistry.gc2_01.solver.rule_aromatics")}}`;
    case "BIOMOLECULES":
      return `\\text{${t("chemistry.gc2_01.solver.rule_biomolecules")}}`;
    default:
      return null;
  }
}

export function solveGC201(quest: OrganicQuest, t: Translator) {
  const ruleLatex = getRuleLatex(quest.stage, t);
  if (!ruleLatex) return { steps: [], fullSolutionLatex: null };

  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), `\\text{${t("chemistry.gc2_01.solver.molecule_shown_label")}} \\text{${escapeLatexText(quest.simConfig.molecule)}}`),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\text{${t("chemistry.gc2_01.solver.match_feature_to_concept")}}`),
    makeStep(4, t("common.feedback_reasons.state_final_result"), `\\text{${escapeLatexText(quest.correctLatex)}}`, "key"),
  ];

  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
