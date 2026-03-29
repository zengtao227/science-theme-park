import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { GM202Quest, Line3D, Plane, Point3D, Vector3D } from "./gm2-02-types";
import {
  calculateLineFrom2Points,
  calculatePlaneFrom3Points,
  calculatePlaneFromPointNormal,
  pointToLine2DDistance,
  pointToLine3DDistance,
  pointToPlaneDistance,
  parallelLinesDistance,
  parallelPlanesDistance,
  classifyLineLine3D,
  classifyLinePlane,
  classifyPlanePlane,
  calculateLinePlaneIntersection,
  crossProduct,
  dotProduct,
} from "./gm2-02-geometry";

type Translator = (key: string, params?: Record<string, string | number>) => string;

function round2(value: number) {
  return Math.round(value * 100) / 100;
}

function formatNumber(value: number) {
  const rounded = round2(value);
  return Number.isInteger(rounded) ? String(rounded) : String(rounded);
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

function relationshipText(t: Translator, relationship: string) {
  switch (relationship) {
    case "parallel":
      return t("gm2_02.answers.parallel");
    case "perpendicular":
      return t("gm2_02.answers.perpendicular");
    case "intersecting":
      return t("gm2_02.answers.intersecting");
    case "skew":
      return t("gm2_02.answers.skew");
    default:
      return relationship;
  }
}

function formatPoint2D(point: [number, number]) {
  return `(${formatNumber(point[0])}, ${formatNumber(point[1])})`;
}

function formatPoint3DTuple(point: [number, number, number]) {
  return `(${formatNumber(point[0])}, ${formatNumber(point[1])}, ${formatNumber(point[2])})`;
}

function formatPoint3D(point: Point3D) {
  return `(${formatNumber(point.x)}, ${formatNumber(point.y)}, ${formatNumber(point.z)})`;
}

function formatVector3D(vector: Vector3D) {
  return `\\langle ${formatNumber(vector.x)}, ${formatNumber(vector.y)}, ${formatNumber(vector.z)} \\rangle`;
}

function formatPlaneEquation(A: number, B: number, C: number, D: number) {
  const parts = [`${formatNumber(A)}x`, `${B >= 0 ? "+" : "-"} ${formatNumber(Math.abs(B))}y`, `${C >= 0 ? "+" : "-"} ${formatNumber(Math.abs(C))}z`, `${D >= 0 ? "+" : "-"} ${formatNumber(Math.abs(D))}`];
  return `${parts.join(" ")} = 0`;
}

function parse2DGeneralLine(eq: string) {
  const match = eq.replace(/\s+/g, "").match(/^([+-]?\d*\.?\d*)x([+-]\d*\.?\d*)y([+-]\d+\.?\d*)=0$/);
  if (!match) return null;
  const parseCoeff = (value: string) => {
    if (value === "" || value === "+") return 1;
    if (value === "-") return -1;
    return Number(value);
  };
  return {
    A: parseCoeff(match[1]),
    B: parseCoeff(match[2]),
    C: Number(match[3]),
  };
}

function parsePlaneEquation(eq: string) {
  const match = eq.replace(/\s+/g, "").match(/^([+-]?\d*\.?\d*)x([+-]\d*\.?\d*)y([+-]\d*\.?\d*)z([+-]\d+\.?\d*)=0$/);
  if (!match) return null;
  const parseCoeff = (value: string) => {
    if (value === "" || value === "+") return 1;
    if (value === "-") return -1;
    return Number(value);
  };
  return {
    A: parseCoeff(match[1]),
    B: parseCoeff(match[2]),
    C: parseCoeff(match[3]),
    D: Number(match[4]),
  };
}

function line3DFromVisualization(quest: GM202Quest): Line3D | null {
  const line = quest.visualizationData.lines?.find((item) => item.type === "3D");
  return line && line.type === "3D" ? line : null;
}

function planeFromVisualization(quest: GM202Quest): Plane | null {
  return quest.visualizationData.planes?.[0] ?? null;
}

export function solveGM202(
  quest: GM202Quest,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  const steps: PlatformSolutionStep[] = [];

  if (quest.stage === "LINE_EQUATIONS") {
    if (quest.points?.length === 2 && quest.points[0].length === 2 && quest.points[1].length === 2) {
      const p1 = quest.points[0] as [number, number];
      const p2 = quest.points[1] as [number, number];
      const line = calculateLineFrom2Points({ x: p1[0], y: p1[1] }, { x: p2[0], y: p2[1] });
      steps.push(
        makeStep(1, t("gm2_02.reasons.identify_points"), `P_1=${formatPoint2D(p1)},\\;P_2=${formatPoint2D(p2)}`),
        makeStep(2, t("gm2_02.reasons.compute_slope"), `m = \\frac{${formatNumber(p2[1])}-${formatNumber(p1[1])}}{${formatNumber(p2[0])}-${formatNumber(p1[0])}} = ${formatNumber(line.slope)}`),
        makeStep(3, t("gm2_02.reasons.compute_intercept_or_form"), `b = y - mx = ${formatNumber(p1[1])} - ${formatNumber(line.slope)} \\cdot ${formatNumber(p1[0])} = ${formatNumber(line.yIntercept)}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else if (quest.targetLatex === "m" && typeof quest.answer === "number") {
      steps.push(
        makeStep(1, t("gm2_02.reasons.identify_given_equation"), quest.expressionLatex),
        makeStep(2, t("gm2_02.reasons.read_slope_intercept_form"), `y = mx + b \\Rightarrow m = ${formatNumber(quest.answer)}`),
        makeStep(3, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else if (quest.targetLatex === "b" && typeof quest.answer === "number") {
      steps.push(
        makeStep(1, t("gm2_02.reasons.identify_given_equation"), quest.expressionLatex),
        makeStep(2, t("gm2_02.reasons.read_slope_intercept_form"), `y = mx + b \\Rightarrow b = ${formatNumber(quest.answer)}`),
        makeStep(3, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else if (quest.targetLatex === "y") {
      const parsed = parse2DGeneralLine(quest.expressionLatex);
      if (!parsed) return { steps: [], fullSolutionLatex: null };
      const m = round2(-parsed.A / parsed.B);
      const b = round2(-parsed.C / parsed.B);
      steps.push(
        makeStep(1, t("gm2_02.reasons.identify_given_equation"), quest.expressionLatex),
        makeStep(2, t("gm2_02.reasons.rearrange_equation"), `${formatNumber(parsed.B)}y = ${formatNumber(-parsed.A)}x ${-parsed.C >= 0 ? "+" : "-"} ${formatNumber(Math.abs(-parsed.C))}`),
        makeStep(3, t("gm2_02.reasons.compute_intercept_or_form"), `y = ${formatNumber(m)}x ${b >= 0 ? "+" : "-"} ${formatNumber(Math.abs(b))}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else if (quest.targetLatex === "\\vec{r}(t)") {
      const line = line3DFromVisualization(quest);
      if (!line) return { steps: [], fullSolutionLatex: null };
      steps.push(
        makeStep(1, t("gm2_02.reasons.identify_point_and_direction"), `P_0=${formatPoint3D(line.point)},\\;\\vec d=${formatVector3D(line.direction)}`),
        makeStep(2, t("gm2_02.reasons.build_parametric_form"), `\\vec r(t) = ${formatPoint3D(line.point)} + t${formatVector3D(line.direction)}`),
        makeStep(3, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else {
      return { steps: [], fullSolutionLatex: null };
    }
  } else if (quest.stage === "PLANE_GEOMETRY") {
    if (quest.points?.length === 3) {
      const p1 = quest.points[0] as [number, number, number];
      const p2 = quest.points[1] as [number, number, number];
      const p3 = quest.points[2] as [number, number, number];
      const plane = calculatePlaneFrom3Points(
        { x: p1[0], y: p1[1], z: p1[2] },
        { x: p2[0], y: p2[1], z: p2[2] },
        { x: p3[0], y: p3[1], z: p3[2] }
      );
      const v1 = { x: p2[0] - p1[0], y: p2[1] - p1[1], z: p2[2] - p1[2] };
      const v2 = { x: p3[0] - p1[0], y: p3[1] - p1[1], z: p3[2] - p1[2] };
      const normal = crossProduct(v1, v2);
      steps.push(
        makeStep(1, t("gm2_02.reasons.identify_points"), `P_1=${formatPoint3DTuple(p1)},\\;P_2=${formatPoint3DTuple(p2)},\\;P_3=${formatPoint3DTuple(p3)}`),
        makeStep(2, t("gm2_02.reasons.build_direction_vectors"), `\\vec v_1=${formatVector3D(v1)},\\;\\vec v_2=${formatVector3D(v2)}`),
        makeStep(3, t("gm2_02.reasons.compute_normal_vector"), `\\vec n = \\vec v_1 \\times \\vec v_2 = ${formatVector3D(normal)}`),
        makeStep(4, t("gm2_02.reasons.substitute_point_into_plane"), formatPlaneEquation(plane.A, plane.B, plane.C, plane.D)),
        makeStep(5, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else if (quest.normalVector && !quest.planePoint && quest.targetLatex === "\\vec{n}") {
      steps.push(
        makeStep(1, t("gm2_02.reasons.identify_given_equation"), quest.expressionLatex),
        makeStep(2, t("gm2_02.reasons.compute_normal_vector"), `\\vec n = ${formatVector3D({ x: quest.normalVector[0], y: quest.normalVector[1], z: quest.normalVector[2] })}`),
        makeStep(3, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else if (quest.normalVector && quest.planePoint) {
      const plane = calculatePlaneFromPointNormal(
        { x: quest.planePoint[0], y: quest.planePoint[1], z: quest.planePoint[2] },
        { x: quest.normalVector[0], y: quest.normalVector[1], z: quest.normalVector[2] }
      );
      steps.push(
        makeStep(1, t("gm2_02.reasons.identify_point_and_normal"), `P_0=${formatPoint3DTuple(quest.planePoint)},\\;\\vec n=${formatVector3D({ x: quest.normalVector[0], y: quest.normalVector[1], z: quest.normalVector[2] })}`),
        makeStep(2, t("gm2_02.reasons.substitute_point_into_plane"), `${quest.normalVector[0]}(x-${formatNumber(quest.planePoint[0])}) + ${quest.normalVector[1]}(y-${formatNumber(quest.planePoint[1])}) + ${quest.normalVector[2]}(z-${formatNumber(quest.planePoint[2])}) = 0`),
        makeStep(3, t("gm2_02.reasons.compute_intercept_or_form"), formatPlaneEquation(plane.A, plane.B, plane.C, plane.D)),
        makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else if (quest.targetLatex === "(x_{int}, y_{int}, z_{int})") {
      const parsed = parsePlaneEquation(quest.expressionLatex);
      if (!parsed) return { steps: [], fullSolutionLatex: null };
      const xInt = round2(-parsed.D / parsed.A);
      const yInt = round2(-parsed.D / parsed.B);
      const zInt = round2(-parsed.D / parsed.C);
      steps.push(
        makeStep(1, t("gm2_02.reasons.identify_given_equation"), quest.expressionLatex),
        makeStep(2, t("gm2_02.reasons.find_axis_intercepts"), `x\\text{-int}: y=z=0 \\Rightarrow x=${formatNumber(xInt)},\\; y\\text{-int}: x=z=0 \\Rightarrow y=${formatNumber(yInt)},\\; z\\text{-int}: x=y=0 \\Rightarrow z=${formatNumber(zInt)}`),
        makeStep(3, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else {
      return { steps: [], fullSolutionLatex: null };
    }
  } else if (quest.stage === "SPATIAL_RELATIONSHIPS") {
    if (quest.distanceFrom && quest.distanceFrom.length === 2 && quest.distanceTo?.type === "line" && quest.distanceTo.coefficients?.length === 3) {
      const [x0, y0] = quest.distanceFrom as [number, number];
      const [A, B, C] = quest.distanceTo.coefficients;
      const distance = pointToLine2DDistance({ x: x0, y: y0 }, A, B, C);
      steps.push(
        makeStep(1, t("gm2_02.reasons.identify_point_and_line"), `P=${formatPoint2D([x0, y0])},\\; ${quest.distanceTo.equation}`),
        makeStep(2, t("gm2_02.reasons.apply_distance_formula"), `d = \\frac{|${formatNumber(A)}\\cdot${formatNumber(x0)} + ${formatNumber(B)}\\cdot${formatNumber(y0)} + ${formatNumber(C)}|}{\\sqrt{${formatNumber(A)}^2 + ${formatNumber(B)}^2}}`),
        makeStep(3, t("gm2_02.reasons.compute_numeric_result"), `d = ${formatNumber(distance)}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else if (quest.distanceFrom && quest.distanceFrom.length === 3 && quest.distanceTo?.type === "line") {
      const line = line3DFromVisualization(quest);
      if (!line) return { steps: [], fullSolutionLatex: null };
      const point = { x: quest.distanceFrom[0], y: quest.distanceFrom[1], z: quest.distanceFrom[2] };
      const diff = { x: point.x - line.point.x, y: point.y - line.point.y, z: point.z - line.point.z };
      const cross = crossProduct(diff, line.direction);
      const distance = pointToLine3DDistance(point, line.point, line.direction);
      steps.push(
        makeStep(1, t("gm2_02.reasons.identify_point_and_line"), `P=${formatPoint3D(point)},\\;P_0=${formatPoint3D(line.point)},\\;\\vec d=${formatVector3D(line.direction)}`),
        makeStep(2, t("gm2_02.reasons.build_displacement_vector"), `\\overrightarrow{P_0P} = ${formatVector3D(diff)}`),
        makeStep(3, t("gm2_02.reasons.apply_cross_product_distance"), `\\overrightarrow{P_0P} \\times \\vec d = ${formatVector3D(cross)},\\; d = \\frac{\\|\\overrightarrow{P_0P} \\times \\vec d\\|}{\\|\\vec d\\|}`),
        makeStep(4, t("gm2_02.reasons.compute_numeric_result"), `d = ${formatNumber(distance)}`),
        makeStep(5, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else if (quest.distanceFrom && quest.distanceFrom.length === 3 && quest.distanceTo?.type === "plane" && quest.distanceTo.coefficients?.length === 4) {
      const [x0, y0, z0] = quest.distanceFrom as [number, number, number];
      const [A, B, C, D] = quest.distanceTo.coefficients;
      const distance = pointToPlaneDistance({ x: x0, y: y0, z: z0 }, { A, B, C, D, equation: quest.distanceTo.equation });
      steps.push(
        makeStep(1, t("gm2_02.reasons.identify_point_and_plane"), `P=${formatPoint3DTuple([x0, y0, z0])},\\; ${quest.distanceTo.equation}`),
        makeStep(2, t("gm2_02.reasons.apply_distance_formula"), `d = \\frac{|${formatNumber(A)}\\cdot${formatNumber(x0)} + ${formatNumber(B)}\\cdot${formatNumber(y0)} + ${formatNumber(C)}\\cdot${formatNumber(z0)} + ${formatNumber(D)}|}{\\sqrt{${formatNumber(A)}^2 + ${formatNumber(B)}^2 + ${formatNumber(C)}^2}}`),
        makeStep(3, t("gm2_02.reasons.compute_numeric_result"), `d = ${formatNumber(distance)}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else if (quest.id.includes("ADVANCED_16") || quest.id.includes("ADVANCED_17") || quest.id.includes("ADVANCED_18")) {
      const lines = quest.visualizationData.lines;
      if (!lines || lines.length < 2 || lines[0].type !== "2D" || lines[1].type !== "2D") return { steps: [], fullSolutionLatex: null };
      const c1 = -round2(lines[0].point.y);
      const c2 = -round2(lines[1].point.y);
      const m = round2(lines[0].direction.y / lines[0].direction.x);
      const A = -m;
      const B = 1;
      const distance = parallelLinesDistance({ A, B, C: c1 }, { A, B, C: c2 });
      steps.push(
        makeStep(1, t("gm2_02.reasons.identify_parallel_objects"), `${quest.promptLatex}`),
        makeStep(2, t("gm2_02.reasons.apply_parallel_distance"), `d = \\frac{|${formatNumber(c1)} - (${formatNumber(c2)})|}{\\sqrt{${formatNumber(A)}^2 + ${formatNumber(B)}^2}}`),
        makeStep(3, t("gm2_02.reasons.compute_numeric_result"), `d = ${formatNumber(distance)}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else if (quest.id.includes("ADVANCED_19") || quest.id.includes("ADVANCED_20")) {
      const planes = quest.visualizationData.planes;
      if (!planes || planes.length < 2) return { steps: [], fullSolutionLatex: null };
      const p1 = { A: planes[0].coefficients[0], B: planes[0].coefficients[1], C: planes[0].coefficients[2], D: planes[0].coefficients[3], equation: "" };
      const p2 = { A: planes[1].coefficients[0], B: planes[1].coefficients[1], C: planes[1].coefficients[2], D: planes[1].coefficients[3], equation: "" };
      const distance = parallelPlanesDistance(p1, p2);
      steps.push(
        makeStep(1, t("gm2_02.reasons.identify_parallel_objects"), quest.promptLatex),
        makeStep(2, t("gm2_02.reasons.apply_parallel_distance"), `d = \\frac{|${formatNumber(p1.D)} - (${formatNumber(p2.D)})|}{\\sqrt{${formatNumber(p1.A)}^2 + ${formatNumber(p1.B)}^2 + ${formatNumber(p1.C)}^2}}`),
        makeStep(3, t("gm2_02.reasons.compute_numeric_result"), `d = ${formatNumber(distance)}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else if (quest.id.includes("ELITE_1") || quest.id.includes("ELITE_2") || quest.id.includes("ELITE_3")) {
      const lines = quest.visualizationData.lines;
      if (!lines || lines.length < 2 || lines[0].type !== "3D" || lines[1].type !== "3D") return { steps: [], fullSolutionLatex: null };
      const relationship = classifyLineLine3D(
        { point: lines[0].point, direction: lines[0].direction },
        { point: lines[1].point, direction: lines[1].direction }
      );
      const cross = crossProduct(lines[0].direction, lines[1].direction);
      const dot = dotProduct(lines[0].direction, lines[1].direction);
      steps.push(
        makeStep(1, t("gm2_02.reasons.identify_geometric_objects"), `\\vec d_1=${formatVector3D(lines[0].direction)},\\;\\vec d_2=${formatVector3D(lines[1].direction)}`),
        makeStep(2, t("gm2_02.reasons.compare_direction_vectors"), `\\vec d_1 \\times \\vec d_2 = ${formatVector3D(cross)},\\; \\vec d_1 \\cdot \\vec d_2 = ${formatNumber(dot)}`),
        makeStep(3, t("gm2_02.reasons.classify_relationship"), `\\text{${relationshipText(t, relationship)}}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else if (quest.id.includes("ELITE_4") || quest.id.includes("ELITE_5") || quest.id.includes("ELITE_6")) {
      const line = line3DFromVisualization(quest);
      const plane = planeFromVisualization(quest);
      if (!line || !plane) return { steps: [], fullSolutionLatex: null };
      const planeObj = { A: plane.coefficients[0], B: plane.coefficients[1], C: plane.coefficients[2], D: plane.coefficients[3], equation: "" };
      const relationship = classifyLinePlane({ direction: line.direction }, planeObj);
      const normal = { x: plane.coefficients[0], y: plane.coefficients[1], z: plane.coefficients[2] };
      const dot = dotProduct(line.direction, normal);
      steps.push(
        makeStep(1, t("gm2_02.reasons.identify_geometric_objects"), `\\vec d=${formatVector3D(line.direction)},\\;\\vec n=${formatVector3D(normal)}`),
        makeStep(2, t("gm2_02.reasons.compare_direction_vectors"), `\\vec d \\cdot \\vec n = ${formatNumber(dot)}`),
        makeStep(3, t("gm2_02.reasons.classify_relationship"), `\\text{${relationshipText(t, relationship)}}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else if (quest.id.includes("ELITE_7") || quest.id.includes("ELITE_8")) {
      const line = line3DFromVisualization(quest);
      const plane = planeFromVisualization(quest);
      if (!line || !plane) return { steps: [], fullSolutionLatex: null };
      const planeObj = { A: plane.coefficients[0], B: plane.coefficients[1], C: plane.coefficients[2], D: plane.coefficients[3], equation: "" };
      const intersection = calculateLinePlaneIntersection({ point: line.point, direction: line.direction }, planeObj);
      if (!intersection) return { steps: [], fullSolutionLatex: null };
      const numerator = -(planeObj.A * line.point.x + planeObj.B * line.point.y + planeObj.C * line.point.z + planeObj.D);
      const denominator = dotProduct(line.direction, { x: planeObj.A, y: planeObj.B, z: planeObj.C });
      const tValue = round2(numerator / denominator);
      steps.push(
        makeStep(1, t("gm2_02.reasons.identify_geometric_objects"), `P_0=${formatPoint3D(line.point)},\\;\\vec d=${formatVector3D(line.direction)},\\;\\pi: ${formatPlaneEquation(planeObj.A, planeObj.B, planeObj.C, planeObj.D)}`),
        makeStep(2, t("gm2_02.reasons.solve_intersection_parameter"), `t = \\frac{${formatNumber(numerator)}}{${formatNumber(denominator)}} = ${formatNumber(tValue)}`),
        makeStep(3, t("gm2_02.reasons.compute_intersection_point"), `(x,y,z) = ${formatPoint3D(intersection)}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else if (quest.id.includes("ELITE_9") || quest.id.includes("ELITE_10")) {
      const planes = quest.visualizationData.planes;
      if (!planes || planes.length < 2) return { steps: [], fullSolutionLatex: null };
      const p1 = { A: planes[0].coefficients[0], B: planes[0].coefficients[1], C: planes[0].coefficients[2], D: planes[0].coefficients[3], equation: "" };
      const p2 = { A: planes[1].coefficients[0], B: planes[1].coefficients[1], C: planes[1].coefficients[2], D: planes[1].coefficients[3], equation: "" };
      const relationship = classifyPlanePlane(p1, p2);
      const n1 = { x: p1.A, y: p1.B, z: p1.C };
      const n2 = { x: p2.A, y: p2.B, z: p2.C };
      steps.push(
        makeStep(1, t("gm2_02.reasons.identify_geometric_objects"), `\\vec n_1=${formatVector3D(n1)},\\;\\vec n_2=${formatVector3D(n2)}`),
        makeStep(2, t("gm2_02.reasons.compare_direction_vectors"), `\\vec n_1 \\times \\vec n_2 = ${formatVector3D(crossProduct(n1, n2))},\\; \\vec n_1 \\cdot \\vec n_2 = ${formatNumber(dotProduct(n1, n2))}`),
        makeStep(3, t("gm2_02.reasons.classify_relationship"), `\\text{${relationshipText(t, relationship)}}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else {
      return { steps: [], fullSolutionLatex: null };
    }
  } else {
    return { steps: [], fullSolutionLatex: null };
  }

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
