import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type OrganicQuest = {
  stage: "ALKANES" | "AROMATICS" | "BIOMOLECULES";
  promptLatex: string;
  correctLatex: string;
  simConfig: { molecule: string };
};

function getRuleLatex(stage: OrganicQuest["stage"]) {
  switch (stage) {
    case "ALKANES":
      return "\\text{Use the displayed structure to count atoms, bonds, or identify the molecular formula}";
    case "AROMATICS":
      return "\\text{Aromatic systems are identified by delocalized } \\pi \\text{ electrons and resonance stability}";
    case "BIOMOLECULES":
      return "\\text{Identify the functional group or biomolecule class from the molecular structure}";
    default:
      return null;
  }
}

export function solveGC201(quest: OrganicQuest, t: Translator) {
  const ruleLatex = getRuleLatex(quest.stage);
  if (!ruleLatex) return { steps: [], fullSolutionLatex: null };

  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), `\\text{Molecule shown: } \\text{${quest.simConfig.molecule}}`),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "\\text{Match the observed structural feature to the requested organic chemistry concept}"),
    makeStep(4, t("common.feedback_reasons.state_final_result"), `\\text{${quest.correctLatex}}`, "key"),
  ];

  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
