import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { MatrixQuest } from "./types";

type Translator = (key: string, params?: Record<string, string | number>) => string;

function makeStep(stepNumber: number, justification: string, expressionLatex: string, emphasis?: PlatformSolutionStep["emphasis"]): PlatformSolutionStep {
  return { stepNumber, justification, expressionLatex, emphasis };
}

function escapeLatexText(text: string) {
  return text.replace(/\\/g, "\\textbackslash{}").replace(/([{}%$&#_^])/g, "\\$1").replace(/~/g, "\\textasciitilde{}");
}

function buildFullSolution(steps: PlatformSolutionStep[]) {
  return steps.map((step) => `\\text{${escapeLatexText(step.justification)}} \\implies ${step.expressionLatex}`).join(" \\\\ ");
}

function formatMatrixAnswer(correctLatex: string) {
  const parts = correctLatex.split(",").map((part) => part.trim());
  if (parts.length === 4) return `\\begin{bmatrix} ${parts[0]} & ${parts[1]} \\\\ ${parts[2]} & ${parts[3]} \\end{bmatrix}`;
  return correctLatex;
}

function finalStep(stepNumber: number, t: Translator, quest: MatrixQuest) {
  const finalExpression = quest.type === "calculate_matrix" ? formatMatrixAnswer(quest.correctLatex) : quest.correctLatex;
  return makeStep(stepNumber, t("common.feedback_reasons.state_final_result"), finalExpression, "key");
}

function firstReason(quest: MatrixQuest, t: Translator) {
  if (quest.type === "calculate_det") return t("em2_01.reasons.select_determinant_rule");
  if (quest.type === "identify") return t("em2_01.reasons.inspect_matrix_structure");
  if (quest.stage === "COMPOSITION") return t("em2_01.reasons.select_matrix_composition_rule");
  return t("em2_01.reasons.select_transformation_rule");
}

function calculationExpression(quest: MatrixQuest) {
  if (quest.type === "calculate_det") return "det(A)=ad-bc";
  if (quest.type === "calculate_matrix" && quest.matrixA && quest.matrixB) {
    if (quest.question.toLowerCase().includes("inv")) return "A^{-1}=\\frac{1}{\\det(A)}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}";
    return "AB=\\begin{bmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{bmatrix}\\begin{bmatrix} b_{11} & b_{12} \\\\ b_{21} & b_{22} \\end{bmatrix}";
  }
  return quest.expressionLatex || quest.targetLatex;
}

export function solveEM201(quest: MatrixQuest, t: Translator): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null; hasFullSolution: boolean } {
  const steps: PlatformSolutionStep[] = [
    makeStep(1, firstReason(quest, t), quest.expressionLatex || quest.targetLatex),
    makeStep(2, t("em2_01.reasons.apply_matrix_calculation"), calculationExpression(quest)),
    finalStep(3, t, quest),
  ];
  const fullSolutionLatex = buildFullSolution(steps);
  return { steps, fullSolutionLatex, hasFullSolution: !!fullSolutionLatex };
}
