import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import {
  buildFullSolution,
  escapeLatexText,
  formatNumber,
  makeStep,
  type Translator,
} from "@/lib/feedback/solverSupport";

type Stage = "ANATOMY" | "POTENTIAL" | "SYNAPSE";

interface GB201Data {
  part?: string;
  func?: string;
  name?: string;
  ion?: string;
  cout?: number;
  cin?: number;
  nt_name?: string;
  nt_type?: string;
  nt_effect?: string;
}

export interface GB201SolverQuest extends Quest {
  stage: Stage;
  data?: GB201Data;
}

function buildIdentifyLatex(quest: GB201SolverQuest) {
  if (quest.stage === "ANATOMY" && quest.data) {
    return null;
  }
  if (quest.stage === "POTENTIAL" && quest.data) {
    return `E = 61\\log_{10}\\!\\left(\\frac{${quest.data.cout}}{${quest.data.cin}}\\right)`;
  }
  if (quest.stage === "SYNAPSE" && quest.data) {
    return null;
  }
  return quest.expressionLatex || quest.promptLatex;
}

function buildRuleLatex(quest: GB201SolverQuest, t: Translator) {
  if (quest.stage === "ANATOMY") {
    return `\\text{${escapeLatexText(t("biology.gb2_01.solver.rule_anatomy"))}}`;
  }
  if (quest.stage === "POTENTIAL") {
    return `E = 61\\log_{10}\\!\\left(\\frac{[\\text{${escapeLatexText(t("biology.gb2_01.solver.ion_outside_label"))}}]_{out}}{[\\text{${escapeLatexText(t("biology.gb2_01.solver.ion_inside_label"))}}]_{in}}\\right)`;
  }
  if (quest.stage === "SYNAPSE") {
    return `\\text{${escapeLatexText(t("biology.gb2_01.solver.rule_synapse"))}}`;
  }
  return null;
}

function buildSolveLatex(quest: GB201SolverQuest, t: Translator) {
  if (quest.stage === "ANATOMY" && quest.data) {
    return `\\text{${escapeLatexText(t("biology.gb2_01.solver.solve_anatomy", {
      func: quest.data.func || "",
      name: quest.data.name || "",
    }))}}`;
  }
  if (quest.stage === "POTENTIAL" && quest.data) {
    const ratio = (quest.data.cout ?? 0) / (quest.data.cin ?? 1);
    const potential = 61 * Math.log10(ratio);
    return `E = 61\\log_{10}\\!\\left(\\frac{${quest.data.cout}}{${quest.data.cin}}\\right) = 61\\log_{10}\\!(${formatNumber(ratio)}) \\approx ${formatNumber(potential)}`;
  }
  if (quest.stage === "SYNAPSE" && quest.data) {
    return `\\text{${escapeLatexText(t("biology.gb2_01.solver.solve_synapse", {
      effect: quest.data.nt_effect || "",
      type: quest.data.nt_type || "",
    }))}}`;
  }
  return null;
}

export function solveGB201(quest: GB201SolverQuest, t: Translator) {
  const identifyLatex =
    quest.stage === "ANATOMY" && quest.data
      ? `\\text{${escapeLatexText(t("biology.gb2_01.solver.function_label"))}}: ${escapeLatexText(quest.data.func || "")}`
      : quest.stage === "SYNAPSE" && quest.data
        ? `\\text{${escapeLatexText(t("biology.gb2_01.solver.neurotransmitter_label"))}}: ${escapeLatexText(quest.data.nt_name || "")},\\ \\text{${escapeLatexText(t("biology.gb2_01.solver.effect_label"))}}: ${escapeLatexText(quest.data.nt_effect || "")}`
        : buildIdentifyLatex(quest);
  const ruleLatex = buildRuleLatex(quest, t);
  const solveLatex = buildSolveLatex(quest, t);
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
