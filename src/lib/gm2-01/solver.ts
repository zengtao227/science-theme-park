import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { G201Quest } from "./quests";

type Translator = (key: string, params?: Record<string, string | number>) => string;

function round2(value: number) {
  return Math.round(value * 100) / 100;
}

function formatNumber(value: number) {
  return Number.isInteger(value) ? String(value) : String(round2(value));
}

function formatVector(vector: [number, number, number]) {
  return `\\langle ${vector.map(formatNumber).join(", ")} \\rangle`;
}

function square(value: number) {
  return round2(value * value);
}

function escapeLatexText(text: string) {
  return text
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/([{}%$&#_^])/g, "\\$1")
    .replace(/~/g, "\\textasciitilde{}");
}

function buildFullSolution(steps: PlatformSolutionStep[]) {
  return steps
    .map((step) => `\\text{${escapeLatexText(step.justification)}} \\implies ${step.expressionLatex}`)
    .join(" \\\\ ");
}

function makeStep(
  stepNumber: number,
  justification: string,
  expressionLatex: string,
  emphasis?: PlatformSolutionStep["emphasis"]
): PlatformSolutionStep {
  return { stepNumber, justification, expressionLatex, emphasis };
}

export function solveGM201(
  quest: G201Quest,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  const steps: PlatformSolutionStep[] = [];

  if (quest.stage === "NAVIGATION") {
    if (!quest.pointA || !quest.pointB) return { steps: [], fullSolutionLatex: null };

    const [ax, ay, az] = quest.pointA;
    const [bx, by, bz] = quest.pointB;
    const vx = round2(bx - ax);
    const vy = round2(by - ay);
    const vz = round2(bz - az);
    const magnitude = round2(Math.sqrt(vx ** 2 + vy ** 2 + vz ** 2));

    steps.push(
      makeStep(1, t("gm2_01.reasons.identify_points"), `A=${formatVector(quest.pointA)},\\;B=${formatVector(quest.pointB)}`),
      makeStep(
        2,
        t("gm2_01.reasons.compute_displacement"),
        `\\vec v = B-A = \\langle ${formatNumber(bx)}-${formatNumber(ax)},\\;${formatNumber(by)}-${formatNumber(ay)},\\;${formatNumber(bz)}-${formatNumber(az)} \\rangle = ${formatVector([vx, vy, vz])}`
      ),
      makeStep(
        3,
        t("gm2_01.reasons.compute_magnitude"),
        `|\\vec v|=\\sqrt{${formatNumber(vx)}^{2}+${formatNumber(vy)}^{2}+${formatNumber(vz)}^{2}}=\\sqrt{${formatNumber(square(vx))}+${formatNumber(square(vy))}+${formatNumber(square(vz))}}=${formatNumber(magnitude)}`
      ),
      makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
    );
  } else if (quest.stage === "DOT") {
    if (!quest.vectorV || !quest.vectorW) return { steps: [], fullSolutionLatex: null };

    const [vx, vy, vz] = quest.vectorV;
    const [wx, wy, wz] = quest.vectorW;
    const productX = round2(vx * wx);
    const productY = round2(vy * wy);
    const productZ = round2(vz * wz);
    const dot = round2(productX + productY + productZ);

    steps.push(
      makeStep(1, t("gm2_01.reasons.identify_vectors"), `\\vec v=${formatVector(quest.vectorV)},\\;\\vec w=${formatVector(quest.vectorW)}`),
      makeStep(
        2,
        t("gm2_01.reasons.multiply_components"),
        `\\vec v\\cdot\\vec w = (${formatNumber(vx)}\\cdot${formatNumber(wx)}) + (${formatNumber(vy)}\\cdot${formatNumber(wy)}) + (${formatNumber(vz)}\\cdot${formatNumber(wz)})`
      ),
      makeStep(
        3,
        t("gm2_01.reasons.sum_products"),
        `\\vec v\\cdot\\vec w = ${formatNumber(productX)} + ${formatNumber(productY)} + ${formatNumber(productZ)} = ${formatNumber(dot)}`
      ),
      makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
    );
  } else if (quest.stage === "MISSION") {
    if (!quest.pointA || !quest.pointB || !quest.vectorW) return { steps: [], fullSolutionLatex: null };

    const [ax, ay, az] = quest.pointA;
    const [bx, by, bz] = quest.pointB;
    const [sx, sy, sz] = quest.vectorW;
    const vx = round2(bx - ax);
    const vy = round2(by - ay);
    const vz = round2(bz - az);
    const dot = round2(vx * sx + vy * sy + vz * sz);
    const magnitude = round2(Math.sqrt(vx ** 2 + vy ** 2 + vz ** 2));

    steps.push(
      makeStep(1, t("gm2_01.reasons.identify_points_and_support"), `A=${formatVector(quest.pointA)},\\;B=${formatVector(quest.pointB)},\\;\\vec s=${formatVector(quest.vectorW)}`),
      makeStep(
        2,
        t("gm2_01.reasons.compute_displacement"),
        `\\vec v = B-A = \\langle ${formatNumber(bx)}-${formatNumber(ax)},\\;${formatNumber(by)}-${formatNumber(ay)},\\;${formatNumber(bz)}-${formatNumber(az)} \\rangle = ${formatVector([vx, vy, vz])}`
      ),
      makeStep(
        3,
        t("gm2_01.reasons.multiply_components"),
        `\\vec v\\cdot\\vec s = (${formatNumber(vx)}\\cdot${formatNumber(sx)}) + (${formatNumber(vy)}\\cdot${formatNumber(sy)}) + (${formatNumber(vz)}\\cdot${formatNumber(sz)}) = ${formatNumber(dot)}`
      ),
      makeStep(
        4,
        t("gm2_01.reasons.compute_magnitude"),
        `|\\vec v|=\\sqrt{${formatNumber(vx)}^{2}+${formatNumber(vy)}^{2}+${formatNumber(vz)}^{2}}=${formatNumber(magnitude)}`
      ),
      makeStep(5, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
    );
  }

  if (steps.length === 0) {
    return { steps: [], fullSolutionLatex: null };
  }

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
