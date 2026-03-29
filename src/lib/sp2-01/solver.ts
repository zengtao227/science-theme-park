import type { FeedbackContent } from "@/hooks/useQuestManager";
import {
  buildFullSolution,
  escapeLatexText,
  makeStep,
  type Translator,
} from "@/lib/feedback/solverSupport";
import type { SP201Quest } from "@/types/sp2-01-types";

function toLatexText(text: string) {
  return `\\text{${escapeLatexText(text)}}`;
}

function getFaultLabel(quest: SP201Quest, t: Translator) {
  return quest.fault
    ? t(`sp2_01.faults.${quest.fault.toLowerCase()}`)
    : t("sp2_01.faults.unknown");
}

function getRequestedOutput(quest: SP201Quest) {
  const slot = quest.slots[0];
  if (!slot) return quest.targetLatex || quest.correctLatex;
  return `${slot.labelLatex}: ${slot.placeholder || quest.targetLatex || quest.correctLatex}`;
}

function getFocusStep(quest: SP201Quest, t: Translator) {
  switch (quest.type) {
    case "IDENTIFY":
      return makeStep(
        1,
        t("sp2_01.reasons.identify_component_feature"),
        quest.componentInfo?.symbol ? toLatexText(quest.componentInfo.symbol) : getRequestedOutput(quest)
      );
    case "BUILD":
      return makeStep(
        1,
        t("sp2_01.reasons.confirm_series_or_parallel"),
        toLatexText(quest.circuitType ?? "Circuit")
      );
    case "DRAW":
      return makeStep(1, t("sp2_01.reasons.read_iec_diagram"), getRequestedOutput(quest));
    case "TROUBLESHOOT":
      return makeStep(1, t("sp2_01.reasons.identify_fault_and_fix"), toLatexText(getFaultLabel(quest, t)));
    default:
      return makeStep(
        1,
        t("sp2_01.reasons.check_design_requirements"),
        toLatexText(`${quest.designRequirements?.length ?? 0} requirements`)
      );
  }
}

function getEvidenceStep(quest: SP201Quest, t: Translator) {
  switch (quest.type) {
    case "IDENTIFY":
      return makeStep(2, t("common.feedback_reasons.identify_given_values"), getRequestedOutput(quest));
    case "BUILD":
      return makeStep(
        2,
        t("common.feedback_reasons.identify_given_values"),
        toLatexText(
          `${quest.requiredComponents?.length ?? 0} components, ${quest.circuitType?.toLowerCase() ?? "circuit"} layout`
        )
      );
    case "DRAW":
      return makeStep(
        2,
        t("common.feedback_reasons.identify_given_values"),
        toLatexText(`${quest.targetDiagram?.symbols.length ?? 0} IEC symbols`)
      );
    case "TROUBLESHOOT":
      return makeStep(
        2,
        t("common.feedback_reasons.identify_given_values"),
        toLatexText(`${getFaultLabel(quest, t)} -> repair`)
      );
    default:
      return makeStep(
        2,
        t("common.feedback_reasons.identify_given_values"),
        toLatexText((quest.designRequirements ?? []).join("; ") || "requirements")
      );
  }
}

function getReasoningStep(quest: SP201Quest, t: Translator) {
  switch (quest.type) {
    case "IDENTIFY":
      return makeStep(3, t("sp2_01.reasons.match_component_role"), quest.correctLatex);
    case "BUILD":
      return makeStep(
        3,
        t("sp2_01.reasons.confirm_series_or_parallel"),
        toLatexText(
          quest.circuitType === "PARALLEL"
            ? t("sp2_01.feedback.parallel_reason")
            : t("sp2_01.feedback.series_reason")
        )
      );
    case "DRAW":
      return makeStep(3, t("sp2_01.reasons.read_iec_diagram"), toLatexText(t("sp2_01.feedback.draw_reason")));
    case "TROUBLESHOOT":
      return makeStep(
        3,
        t("sp2_01.reasons.identify_fault_and_fix"),
        toLatexText(t("sp2_01.feedback.troubleshoot_reason", { fault: getFaultLabel(quest, t) }))
      );
    default:
      return makeStep(
        3,
        t("sp2_01.reasons.check_design_requirements"),
        toLatexText(t("sp2_01.feedback.design_reason", { count: quest.designRequirements?.length ?? 0 }))
      );
  }
}

export function solveSP201(quest: SP201Quest, t: Translator): Omit<FeedbackContent, "hint"> {
  const steps = [
    getFocusStep(quest, t),
    getEvidenceStep(quest, t),
    getReasoningStep(quest, t),
    makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];

  const fullSolutionLatex = buildFullSolution(steps);
  return { steps, fullSolutionLatex, hasFullSolution: !!fullSolutionLatex };
}
