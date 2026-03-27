import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { SM213FeedbackData } from "@/lib/sm2-13-quest-data";

type Translator = (key: string, params?: Record<string, string | number>) => string;

function step(
  stepNumber: number,
  justification: string,
  expressionLatex: string,
  emphasis?: PlatformSolutionStep["emphasis"]
): PlatformSolutionStep {
  return { stepNumber, justification, expressionLatex, emphasis };
}

function buildFullSolution(steps: PlatformSolutionStep[]) {
  return steps
    .map((s) => `\\text{${s.justification}} \\implies ${s.expressionLatex}`)
    .join(" \\\\ ");
}

export function solveSM213(
  data: SM213FeedbackData | undefined,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  if (!data) {
    return { steps: [], fullSolutionLatex: null };
  }

  const steps: PlatformSolutionStep[] = [];

  switch (data.kind) {
    case "reflection-basic":
      steps.push(
        step(1, t("sm2_13.reasons.identify_reflection_axis"), `${data.axis}\\text{-axis}:\\;(x,y)\\mapsto ${data.axis === "x" ? "(x,-y)" : "(-x,y)"}`),
        step(2, t("sm2_13.reasons.apply_point_coordinates"), `P(${data.x},${data.y})\\mapsto P'(${data.xPrime},${data.yPrime})`, "key")
      );
      break;
    case "reflection-core":
      steps.push(
        step(1, t("sm2_13.reasons.identify_diagonal_reflection"), `${data.line}:\\;${data.line === "y = x" ? "(x,y)\\mapsto(y,x)" : "(x,y)\\mapsto(-y,-x)"}`),
        step(2, t("sm2_13.reasons.apply_point_coordinates"), `P(${data.x},${data.y})\\mapsto P'(${data.xPrime},${data.yPrime})`, "key")
      );
      break;
    case "reflection-advanced":
      steps.push(
        step(1, t("sm2_13.reasons.measure_offset_reflection"), `${data.lineAxis}=${data.offset}\\Rightarrow ${data.lineAxis === "x" ? "x'" : "y'"}=2\\cdot ${data.offset}-${data.lineAxis === "x" ? data.x : data.y}`),
        step(2, t("sm2_13.reasons.keep_other_coordinate"), `P'(${data.xPrime},${data.yPrime})`, "key")
      );
      break;
    case "reflection-elite":
      steps.push(
        step(1, t("sm2_13.reasons.build_perpendicular_line"), `y-${data.y}=${-1 / data.slope}(x-${data.x})`),
        step(2, t("sm2_13.reasons.find_line_intersection"), `x_{\\mathrm{int}}\\approx ${data.xIntersect}`),
        step(3, t("sm2_13.reasons.double_intersection_shift"), `x'=2x_{\\mathrm{int}}-x\\approx ${data.xPrime}`, "key")
      );
      break;
    case "translation-basic":
      steps.push(
        step(1, t("sm2_13.reasons.add_translation_vector"), `(${data.x},${data.y})+(${data.dx},${data.dy})`),
        step(2, t("sm2_13.reasons.compute_translated_point"), `P'(${data.xPrime},${data.yPrime})`, "key")
      );
      break;
    case "translation-core":
      steps.push(
        step(1, t("sm2_13.reasons.reverse_translation_vector"), `P=P'-\\vec v=(${data.xPrime},${data.yPrime})-(${data.dx},${data.dy})`),
        step(2, t("sm2_13.reasons.compute_original_point"), `P(${data.x},${data.y})`, "key")
      );
      break;
    case "translation-advanced":
      steps.push(
        step(1, t("sm2_13.reasons.translate_line_formula"), `y-${data.dy}=${data.slope}(x-${data.dx})+${data.intercept}`),
        step(2, t("sm2_13.reasons.simplify_new_intercept"), `b'=${data.intercept}+${data.dy}-${data.slope}\\cdot ${data.dx}=${data.newIntercept}`, "key")
      );
      break;
    case "translation-elite":
      steps.push(
        step(1, t("sm2_13.reasons.translate_circle_center"), `C(${data.centerX},${data.centerY})\\mapsto C'(${data.translatedX},${data.translatedY})`),
        step(2, t("sm2_13.reasons.compute_origin_distance"), `d=\\sqrt{${data.translatedX}^2+${data.translatedY}^2}\\approx ${data.distance}`, "key")
      );
      break;
    case "rotation-basic":
      steps.push(
        step(1, t("sm2_13.reasons.use_origin_rotation_rule"), `${data.angle}^\\circ\\;${data.clockwise ? t("sm2_13.labels.cw") : t("sm2_13.labels.ccw")}`),
        step(2, t("sm2_13.reasons.compute_rotated_point"), `P(${data.x},${data.y})\\mapsto P'(${data.xPrime},${data.yPrime})`, "key")
      );
      break;
    case "rotation-core":
      steps.push(
        step(1, t("sm2_13.reasons.translate_to_rotation_center"), `(${data.x},${data.y})\\mapsto (${data.translatedX},${data.translatedY})`),
        step(2, t("sm2_13.reasons.rotate_shifted_point"), `(${data.translatedX},${data.translatedY})\\mapsto (${data.rotatedX},${data.rotatedY})`),
        step(3, t("sm2_13.reasons.translate_back_after_rotation"), `P'(${data.xPrime},${data.yPrime})`, "key")
      );
      break;
    case "rotation-advanced":
      steps.push(
        step(1, t("sm2_13.reasons.apply_rotation_formula"), `x'=x\\cos ${data.thetaDegrees}^\\circ-y\\sin ${data.thetaDegrees}^\\circ`),
        step(2, t("sm2_13.reasons.compute_requested_coordinate"), `x'\\approx ${data.xPrime}`, "key")
      );
      break;
    case "rotation-elite":
      steps.push(
        step(1, t("sm2_13.reasons.normalize_rotated_line"), `b'=\\frac{b}{\\cos ${data.thetaDegrees}^\\circ}`),
        step(2, t("sm2_13.reasons.compute_requested_coordinate"), `b'\\approx ${data.transformedIntercept}`, "key")
      );
      break;
    case "composition-basic":
      steps.push(
        step(1, t("sm2_13.reasons.compose_translation_then_reflection"), `(${data.x},${data.y})\\mapsto (${data.translatedX},${data.y})`),
        step(2, t("sm2_13.reasons.reflect_final_coordinate"), `P'(${data.translatedX},${data.yPrime})`, "key")
      );
      break;
    case "composition-core":
      steps.push(
        step(1, t("sm2_13.reasons.reflect_over_diagonal"), `(${data.x},${data.y})\\mapsto (${data.reflectedX},${data.reflectedY})`),
        step(2, t("sm2_13.reasons.rotate_reflected_point"), `P'(${data.xPrime},${data.yPrime})`, "key")
      );
      break;
    case "composition-advanced":
      steps.push(
        step(1, t("sm2_13.reasons.combine_translation_offsets"), `\\Delta x=2(${data.dy}-${data.dx})`),
        step(2, t("sm2_13.reasons.compute_requested_coordinate"), `\\Delta x=${data.deltaX}`, "key")
      );
      break;
    case "composition-elite":
      steps.push(
        step(1, t("sm2_13.reasons.use_invariant_sum"), `x_c+y_c=dx+dy`),
        step(2, t("sm2_13.reasons.compute_requested_coordinate"), `${data.dx}+${data.dy}=${data.sum}`, "key")
      );
      break;
  }

  return {
    steps,
    fullSolutionLatex: steps.length ? buildFullSolution(steps) : null,
  };
}
