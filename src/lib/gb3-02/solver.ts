import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import {
  buildFullSolution,
  escapeLatexText,
  makeStep,
  type Translator,
} from "@/lib/feedback/solverSupport";

type Stage = "INNATE" | "ADAPTIVE" | "VACCINES";

interface GB302Data {
  pathogen: string;
  cell: string;
  role: string;
  lag?: number;
  prim?: number;
}

export interface GB302SolverQuest extends Quest {
  stage: Stage;
  data?: GB302Data;
}

function buildIdentifyLatex(quest: GB302SolverQuest) {
  if (quest.stage === "INNATE" && quest.data) {
    return `\\text{Pathogen: } ${escapeLatexText(quest.data.pathogen)}`;
  }
  if (quest.stage === "ADAPTIVE" && quest.data) {
    return `\\text{Cell: } ${escapeLatexText(quest.data.cell)}`;
  }
  if (quest.stage === "VACCINES" && quest.data) {
    return `\\text{Primary lag } = ${quest.data.prim}\\text{ days},\\ \\text{secondary lag } = ${quest.data.lag}\\text{ days}`;
  }
  return quest.expressionLatex || quest.promptLatex;
}

function buildRuleLatex(quest: GB302SolverQuest) {
  if (quest.stage === "INNATE") {
    return "\\text{Choose the innate immune cell whose frontline role best matches the pathogen challenge}";
  }
  if (quest.stage === "ADAPTIVE") {
    return "\\text{Match each adaptive immune cell to its characteristic effector function}";
  }
  if (quest.stage === "VACCINES") {
    return "\\text{Memory factor} = \\frac{\\text{primary lag}}{\\text{secondary lag}}";
  }
  return null;
}

function buildSolveLatex(quest: GB302SolverQuest) {
  if (quest.stage === "INNATE" && quest.data) {
    return `\\text{A response involving } ${escapeLatexText(quest.data.role)} \\text{ is carried out by } ${escapeLatexText(quest.data.cell)}`;
  }
  if (quest.stage === "ADAPTIVE" && quest.data) {
    return `\\text{The function } ${escapeLatexText(quest.data.role)} \\text{ is the hallmark of } ${escapeLatexText(quest.data.cell)}`;
  }
  if (quest.stage === "VACCINES" && quest.data) {
    return `\\text{Compute } \\frac{${quest.data.prim}}{${quest.data.lag}}`;
  }
  return null;
}

export function solveGB302(quest: GB302SolverQuest, t: Translator) {
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
