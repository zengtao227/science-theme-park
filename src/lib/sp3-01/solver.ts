import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { SP301Quest } from "./types";

type Translator = (key: string, params?: Record<string, string | number>) => string;

function makeStep(
  stepNumber: number,
  justification: string,
  expressionLatex: string,
  emphasis?: PlatformSolutionStep["emphasis"]
): PlatformSolutionStep {
  return { stepNumber, justification, expressionLatex, emphasis };
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

function countSigFigs(value: string) {
  const trimmed = value.trim();
  if (trimmed.includes(".")) {
    const noDot = trimmed.replace(".", "");
    const noLeading = noDot.replace(/^0+/, "");
    return noLeading.length;
  }
  const noLeading = trimmed.replace(/^0+/, "");
  const noTrailing = noLeading.replace(/0+$/, "");
  return noTrailing.length || 1;
}

function roundToSigFigs(value: number, sigFigs: number) {
  return Number.parseFloat(value.toPrecision(sigFigs)).toString();
}

function evaluateExpression(expr: string) {
  const normalized = expr.replace(/×/g, "*").replace(/÷/g, "/");
  // Trusted local quest data only.
  return Function(`"use strict"; return (${normalized});`)() as number;
}

function parseMeasurement(value?: string) {
  if (!value) return null;
  const match = value.match(/^\s*([0-9.]+)\s*±\s*([0-9.]+)\s*$/);
  if (!match) return null;
  return { measured: Number(match[1]), uncertainty: Number(match[2]) };
}

export function solveSP301(quest: SP301Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];

  switch (quest.scenarioKey) {
    case "si_base_unit":
      steps.push(
        makeStep(1, t("sp3_01.reasons.identify_measurement_category"), `\\text{${quest.measurement ?? ""}}`),
        makeStep(2, t("sp3_01.reasons.state_unit_equivalence"), quest.correctLatex, "key")
      );
      break;
    case "si_derived_unit":
    case "equivalent_unit":
      steps.push(
        makeStep(1, t("sp3_01.reasons.state_unit_equivalence"), quest.expressionLatex),
        makeStep(2, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
      break;
    case "single_conversion":
    case "multi_step_conversion":
    case "compound_conversion":
      steps.push(
        makeStep(1, t("sp3_01.reasons.identify_conversion_factor"), `${quest.value ?? ""}\\,\\text{${quest.fromUnit ?? ""}}`),
        makeStep(2, t("common.feedback_reasons.substitute_known_values"), quest.correctLatex),
        makeStep(3, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
      break;
    case "area_volume_conversion":
      steps.push(
        makeStep(1, t("sp3_01.reasons.identify_conversion_factor"), `${quest.value ?? ""}\\,\\text{${quest.fromUnit ?? ""}}`),
        makeStep(2, t("sp3_01.reasons.apply_squared_or_cubed_factor"), quest.expressionLatex),
        makeStep(3, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
      break;
    case "count_sig_figs": {
      const value = String(quest.value ?? "");
      const count = countSigFigs(value);
      steps.push(
        makeStep(1, t("sp3_01.reasons.count_significant_figures"), value),
        makeStep(2, t("common.feedback_reasons.state_final_result"), `${count}`, "key")
      );
      break;
    }
    case "round_sig_figs": {
      const raw = Number(quest.value);
      const sig = Number(quest.sigfigsCount);
      const rounded = roundToSigFigs(raw, sig);
      steps.push(
        makeStep(1, t("sp3_01.reasons.round_to_requested_sig_figs"), `${quest.value} \\to ${sig}\\text{ sf}`),
        makeStep(2, t("common.feedback_reasons.state_final_result"), rounded, "key")
      );
      break;
    }
    case "calculate_sig_figs": {
      const raw = evaluateExpression(quest.expressionLatex);
      steps.push(
        makeStep(1, t("sp3_01.reasons.evaluate_expression_with_rounding_rule"), `${quest.expressionLatex} = ${raw}`),
        makeStep(2, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
      break;
    }
    case "percent_uncertainty": {
      const parsed = parseMeasurement(quest.measurement);
      if (parsed) {
        const percent = ((parsed.uncertainty / parsed.measured) * 100).toFixed(1).replace(/\.0$/, "");
        steps.push(
          makeStep(1, t("sp3_01.reasons.apply_uncertainty_ratio"), `\\frac{${parsed.uncertainty}}{${parsed.measured}} \\times 100\\%`),
          makeStep(2, t("common.feedback_reasons.state_final_result"), `${percent}\\%`, "key")
        );
      }
      break;
    }
    default:
      steps.push(makeStep(1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));
      break;
  }

  return {
    steps,
    fullSolutionLatex: steps.length ? buildFullSolution(steps) : null,
  };
}
