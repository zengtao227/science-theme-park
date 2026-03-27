import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { G401Quest } from "./quests";

type Translator = (key: string, params?: Record<string, string | number>) => string;

function round2(value: number) {
  return Math.round(value * 100) / 100;
}

function formatNumber(value: number) {
  if (Number.isInteger(value)) return String(value);
  return String(round2(value));
}

function formatComplex(re: number, im: number) {
  const sign = im >= 0 ? "+" : "-";
  return `${formatNumber(re)} ${sign} ${formatNumber(Math.abs(im))}i`;
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

export function solveGM401(
  quest: G401Quest,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  const steps: PlatformSolutionStep[] = [];

  if (quest.stage === "BASICS") {
    if (!quest.z1) return { steps: [], fullSolutionLatex: null };

    const { re, im } = quest.z1;
    const magnitudeSquared = round2(re * re + im * im);

    steps.push(
      makeStep(1, t("gm4_01.reasons.identify_complex_components"), `z=${formatComplex(re, im)}`),
      makeStep(
        2,
        t("gm4_01.reasons.apply_modulus_formula"),
        `|z|=\\sqrt{(${formatNumber(re)})^{2}+(${formatNumber(im)})^{2}}`
      ),
      makeStep(
        3,
        t("gm4_01.reasons.compute_square_sum"),
        `|z|=\\sqrt{${formatNumber(re * re)}+${formatNumber(im * im)}}=\\sqrt{${formatNumber(magnitudeSquared)}}`
      ),
      makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
    );
  } else if (quest.stage === "OPERATIONS") {
    if (!quest.z1 || !quest.z2 || !quest.operation) return { steps: [], fullSolutionLatex: null };

    const { z1, z2 } = quest;
    if (quest.operation === "add") {
      const resultRe = round2(z1.re + z2.re);
      const resultIm = round2(z1.im + z2.im);

      steps.push(
        makeStep(1, t("gm4_01.reasons.identify_complex_numbers"), `z_1=${formatComplex(z1.re, z1.im)},\\;z_2=${formatComplex(z2.re, z2.im)}`),
        makeStep(
          2,
          t("gm4_01.reasons.add_components"),
          `z_1+z_2=(${formatNumber(z1.re)}+${formatNumber(z2.re)})+(${formatNumber(z1.im)}+${formatNumber(z2.im)})i`
        ),
        makeStep(
          3,
          t("gm4_01.reasons.compute_rectangular_result"),
          `z_1+z_2=${formatNumber(resultRe)}+${formatNumber(resultIm)}i`
        ),
        makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else if (quest.operation === "multiply") {
      const ac = round2(z1.re * z2.re);
      const bd = round2(z1.im * z2.im);
      const ad = round2(z1.re * z2.im);
      const bc = round2(z1.im * z2.re);
      const resultRe = round2(ac - bd);
      const resultIm = round2(ad + bc);

      steps.push(
        makeStep(1, t("gm4_01.reasons.identify_complex_numbers"), `z_1=${formatComplex(z1.re, z1.im)},\\;z_2=${formatComplex(z2.re, z2.im)}`),
        makeStep(
          2,
          t("gm4_01.reasons.apply_complex_product"),
          `(a+bi)(c+di)=(ac-bd)+(ad+bc)i`
        ),
        makeStep(
          3,
          t("gm4_01.reasons.compute_rectangular_result"),
          `z_1z_2=(${formatNumber(ac)}-${formatNumber(bd)})+(${formatNumber(ad)}+${formatNumber(bc)})i=${formatNumber(resultRe)}+${formatNumber(resultIm)}i`
        ),
        makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    }
  } else if (quest.stage === "POLAR") {
    if (!quest.z1 || !quest.power) return { steps: [], fullSolutionLatex: null };

    const { re, im } = quest.z1;
    const n = quest.power;
    const r = Math.sqrt(re * re + im * im);
    const theta = Math.atan2(im, re);
    const resultR = Math.pow(r, n);
    const resultTheta = theta * n;
    const resultRe = round2(resultR * Math.cos(resultTheta));
    const resultIm = round2(resultR * Math.sin(resultTheta));

    steps.push(
      makeStep(1, t("gm4_01.reasons.identify_complex_components"), `z=${formatComplex(re, im)},\\;n=${formatNumber(n)}`),
      makeStep(
        2,
        t("gm4_01.reasons.convert_to_polar_form"),
        `r=\\sqrt{(${formatNumber(re)})^{2}+(${formatNumber(im)})^{2}}=${formatNumber(round2(r))},\\;\\theta=\\operatorname{atan2}(${formatNumber(im)},${formatNumber(re)})\\approx ${formatNumber(round2(theta))}`
      ),
      makeStep(
        3,
        t("gm4_01.reasons.apply_de_moivre"),
        `z^{${formatNumber(n)}}=r^{${formatNumber(n)}}\\left(\\cos(${formatNumber(n)}\\theta)+i\\sin(${formatNumber(n)}\\theta)\\right)=${formatNumber(round2(resultR))}\\left(\\cos(${formatNumber(round2(resultTheta))})+i\\sin(${formatNumber(round2(resultTheta))})\\right)`
      ),
      makeStep(
        4,
        t("gm4_01.reasons.compute_rectangular_result"),
        `z^{${formatNumber(n)}}=${formatNumber(resultRe)}+${formatNumber(resultIm)}i`
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
