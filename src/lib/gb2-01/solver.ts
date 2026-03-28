import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import {
  buildFullSolution,
  escapeLatexText,
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
    return `\\text{Function: } ${escapeLatexText(quest.data.func || "")}`;
  }
  if (quest.stage === "POTENTIAL" && quest.data) {
    return `E = 61\\log_{10}\\!\\left(\\frac{${quest.data.cout}}{${quest.data.cin}}\\right)`;
  }
  if (quest.stage === "SYNAPSE" && quest.data) {
    return `\\text{Neurotransmitter: } ${escapeLatexText(quest.data.nt_name || "")},\\ \\text{effect: } ${escapeLatexText(quest.data.nt_effect || "")}`;
  }
  return quest.expressionLatex || quest.promptLatex;
}

function buildRuleLatex(quest: GB201SolverQuest) {
  if (quest.stage === "ANATOMY") {
    return "\\text{Match the described neuronal function to the correct structure}";
  }
  if (quest.stage === "POTENTIAL") {
    return "E = 61\\log_{10}\\!\\left(\\frac{[\\text{ion}]_{out}}{[\\text{ion}]_{in}}\\right)";
  }
  if (quest.stage === "SYNAPSE") {
    return "\\text{Classify the neurotransmitter response from its effect on the postsynaptic cell}";
  }
  return null;
}

function buildSolveLatex(quest: GB201SolverQuest) {
  if (quest.stage === "ANATOMY" && quest.data) {
    return `\\text{The function } ${escapeLatexText(quest.data.func || "")} \\text{ corresponds to } ${escapeLatexText(quest.data.name || "")}`;
  }
  if (quest.stage === "POTENTIAL" && quest.data) {
    return `\\text{Use } [${escapeLatexText(quest.data.ion || "")}]_{out}=${quest.data.cout},\\ [${escapeLatexText(quest.data.ion || "")}]_{in}=${quest.data.cin}`;
  }
  if (quest.stage === "SYNAPSE" && quest.data) {
    return `\\text{An effect such as } ${escapeLatexText(quest.data.nt_effect || "")} \\text{ indicates a } ${escapeLatexText(quest.data.nt_type || "")} \\text{ response}`;
  }
  return null;
}

export function solveGB201(quest: GB201SolverQuest, t: Translator) {
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
