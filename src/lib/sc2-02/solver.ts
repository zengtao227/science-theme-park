import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, formatNumber, makeStep, round2, type Translator } from "@/lib/feedback/solverSupport";
import type { TitrationQuest } from "./types";

function parseExpected(quest: TitrationQuest) {
  return quest.slots[0]?.expected;
}

function inferCurveLabel(quest: TitrationQuest, t: Translator) {
  return quest.simConfig.acidType === "strong"
    ? `\\text{${t("chemistry.sc2_02.solver.curve_family_strong_strong")}}`
    : `\\text{${t("chemistry.sc2_02.solver.curve_family_weak_strong")}}`;
}

function inferIndicator(expected: string, t: Translator) {
  if (expected === "phenolphthalein") return `\\text{${t("chemistry.sc2_02.solver.indicator_basic_range")}}`;
  if (expected === "methyl_orange") return `\\text{${t("chemistry.sc2_02.solver.indicator_acidic_range")}}`;
  return `\\text{${t("chemistry.sc2_02.solver.indicator_broad_range")}}`;
}

export function solveSC202(quest: TitrationQuest, t: Translator) {
  const steps: PlatformSolutionStep[] = [makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex)];
  const expected = parseExpected(quest);

  switch (quest.stage) {
    case "CURVES": {
      if (typeof expected === "string") {
        steps.push(
          makeStep(
            2,
            t("common.feedback_reasons.select_formula_or_rule"),
            `\\text{${t("chemistry.sc2_02.solver.acid_type_label")}} = \\text{${t(
              `chemistry.sc2_02.solver.acid_type_${quest.simConfig.acidType}`
            )}}`
          )
        );
        steps.push(
          makeStep(
            3,
            t("common.feedback_reasons.solve_step_by_step"),
            `\\text{${t("chemistry.sc2_02.solver.curve_family_label")}} = ${inferCurveLabel(quest, t)}`
          )
        );
      } else {
        const equivalenceVolume = round2((quest.simConfig.acidConc * 50) / quest.simConfig.baseConc);
        if (Math.abs(expected - equivalenceVolume) < 0.2) {
          steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "V_a C_a = V_b C_b"));
          steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `V_b = \\frac{50 \\cdot ${formatNumber(quest.simConfig.acidConc)}}{${formatNumber(quest.simConfig.baseConc)}} = ${formatNumber(equivalenceVolume)}`));
        } else if (Math.abs(expected - 4.75) < 0.05) {
          steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${t("chemistry.sc2_02.solver.half_equivalence_rule")}}`));
          steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "pH = 4.75"));
        } else if (quest.simConfig.acidType === "strong" && Math.abs(expected - 7) < 0.05) {
          steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${t("chemistry.sc2_02.solver.strong_equivalence_rule")}}`));
          steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "pH = 7"));
        } else {
          steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${t("chemistry.sc2_02.solver.weak_equivalence_rule")}}`));
          steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `pH \\approx ${formatNumber(typeof expected === "number" ? expected : Number(expected))}`));
        }
      }
      break;
    }
    case "EQUIVALENCE": {
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "V_a C_a = V_b C_b"));
      steps.push(
        makeStep(
          3,
          t("common.feedback_reasons.solve_step_by_step"),
          `V_b = \\frac{50 \\cdot ${formatNumber(quest.simConfig.acidConc)}}{${formatNumber(quest.simConfig.baseConc)}} = ${formatNumber(Number(expected))}`
        )
      );
      break;
    }
    case "INDICATORS": {
      const indicator = typeof expected === "string" ? expected : String(expected);
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), inferIndicator(indicator, t)));
      steps.push(
        makeStep(
          3,
          t("common.feedback_reasons.solve_step_by_step"),
          `\\text{${t("chemistry.sc2_02.solver.best_indicator_label")}} = \\text{${indicator.replace(/_/g, " ")}}`
        )
      );
      break;
    }
    default:
      return { steps: [], fullSolutionLatex: null };
  }

  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
