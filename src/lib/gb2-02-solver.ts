import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import {
  buildFullSolution,
  escapeLatexText,
  makeStep,
  type Translator,
} from "@/lib/feedback/solverSupport";
import type { GB202Quest } from "./gb2-02-types";

function buildIdentifyLatex(quest: GB202Quest) {
  if (quest.hormone) {
    return quest.hormone.nameLatex || `\\text{${escapeLatexText(quest.hormone.name)}}`;
  }
  if (quest.feedbackLoop) {
    return `\\text{${escapeLatexText(quest.feedbackLoop.description)}}`;
  }
  if (quest.clinicalCase) {
    const chiefComplaint = escapeLatexText(quest.clinicalCase.chiefComplaint);
    return `\\text{Chief complaint: } ${chiefComplaint}`;
  }
  return quest.expressionLatex || quest.promptLatex;
}

function buildRuleLatex(quest: GB202Quest) {
  if (quest.stage === "HORMONE_IDENTIFICATION") {
    if (quest.id.includes("BASIC")) return "\\text{Match the hormone to its chemical class or producing gland}";
    if (quest.id.includes("CORE")) return "\\text{Use the known target organs and primary function of the hormone}";
    if (quest.id.includes("ADVANCED")) return "\\text{Follow the hypothalamic-pituitary axis to identify the releasing hormone}";
    return "\\text{Match the endocrine disorder to the appropriate hormone therapy}";
  }
  if (quest.stage === "FEEDBACK_MECHANISMS") {
    if (quest.feedbackLoop) return "\\text{Negative feedback counteracts the initial change and returns the system toward its set point}";
    return "\\text{Trace the endocrine loop from stimulus to response and identify the stabilizing signal}";
  }
  if (quest.stage === "CLINICAL_APPLICATIONS") {
    if (quest.clinicalCase) return "\\text{Combine symptoms and abnormal lab findings to select the most likely endocrine diagnosis}";
    return "\\text{Interpret the clinical prompt and connect it to the matching endocrine disorder}";
  }
  return null;
}

function buildSolveLatex(quest: GB202Quest) {
  if (quest.stage === "HORMONE_IDENTIFICATION" && quest.hormone) {
    if (quest.id.includes("CORE")) {
      return `\\text{${escapeLatexText(quest.hormone.name)} acts on } ${quest.hormone.targetOrgans.map((organ) => `\\text{${escapeLatexText(organ)}}`).join(", ")} \\text{ to regulate } \\text{${escapeLatexText(quest.hormone.primaryFunction)}}`;
    }
    if (quest.id.includes("ADVANCED")) {
      return `\\text{Identify the hypothalamic signal that controls } \\text{${escapeLatexText(quest.hormone.name || quest.expressionLatex)}}`;
    }
    return `\\text{Use the known endocrine classification or gland assignment for } ${quest.hormone.nameLatex}`;
  }
  if (quest.stage === "FEEDBACK_MECHANISMS" && quest.feedbackLoop) {
    return `\\text{Stimulus: } ${escapeLatexText(quest.feedbackLoop.stimulus)} \\to \\text{ response: } ${escapeLatexText(quest.feedbackLoop.response)}`;
  }
  if (quest.stage === "CLINICAL_APPLICATIONS" && quest.clinicalCase) {
    const abnormalLabs = quest.clinicalCase.labResults
      .filter((lab) => lab.status !== "normal")
      .map((lab) => `\\text{${escapeLatexText(lab.hormone)}: ${lab.status}}`)
      .join(", ");
    return abnormalLabs
      ? `\\text{Focus on the abnormal labs } ${abnormalLabs}`
      : "\\text{Use the symptom pattern and case context to determine the diagnosis}";
  }
  return `\\text{Use the endocrine context given in the prompt to justify } ${quest.correctLatex}`;
}

export function solveGB202(quest: GB202Quest, t: Translator) {
  const identifyLatex = buildIdentifyLatex(quest);
  const ruleLatex = buildRuleLatex(quest);
  const solveLatex = buildSolveLatex(quest);
  if (!identifyLatex || !ruleLatex || !solveLatex || !quest.correctLatex) {
    return { steps: [], fullSolutionLatex: null };
  }

  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), identifyLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), solveLatex),
    makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
