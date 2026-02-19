/**
 * GM1.03 - Limits & Continuity Module
 * Limit calculation and continuity detection functions
 */

const EPSILON = 0.01; // Tolerance for limit calculations

/**
 * Evaluate a function at a given x value
 * Supports basic mathematical expressions
 */
function evaluateFunction(expr: string, x: number): number | null {
  try {
    // Replace mathematical notation with JavaScript equivalents
    let jsExpr = expr
      .replace(/\^/g, "**")
      .replace(/sqrt\(/g, "Math.sqrt(")
      .replace(/abs\(/g, "Math.abs(")
      .replace(/sin\(/g, "Math.sin(")
      .replace(/cos\(/g, "Math.cos(")
      .replace(/tan\(/g, "Math.tan(")
      .replace(/ln\(/g, "Math.log(")
      .replace(/floor\(/g, "Math.floor(")
      .replace(/sign\(/g, "Math.sign(")
      .replace(/e\*\*/g, "Math.E**")
      .replace(/x/g, `(${x})`);

    // Evaluate the expression
    const result = eval(jsExpr);
    
    if (!Number.isFinite(result)) {
      return null;
    }
    
    return result;
  } catch (error) {
    return null;
  }
}

/**
 * Calculate limit using direct substitution
 * For continuous functions at the limit point
 */
export function calculateDirectLimit(
  functionExpr: string,
  limitPoint: number
): number | null {
  return evaluateFunction(functionExpr, limitPoint);
}

/**
 * Calculate limit by approaching from both sides
 * Uses numerical approximation
 */
export function calculateLimit(
  functionExpr: string,
  limitPoint: number,
  fromLeft: boolean = false,
  fromRight: boolean = false
): number | string {
  // Handle limits at infinity
  if (!Number.isFinite(limitPoint)) {
    const sign = limitPoint > 0 ? 1 : -1;
    const largeX = sign * 1000000;
    const result = evaluateFunction(functionExpr, largeX);
    return result !== null ? Math.round(result * 100) / 100 : "DNE";
  }

  // Calculate one-sided limits
  if (fromLeft) {
    const leftValues: number[] = [];
    for (let i = 1; i <= 10; i++) {
      const x = limitPoint - EPSILON / i;
      const val = evaluateFunction(functionExpr, x);
      if (val !== null) leftValues.push(val);
    }
    if (leftValues.length === 0) return "DNE";
    const avg = leftValues.reduce((a, b) => a + b, 0) / leftValues.length;
    return Math.round(avg * 100) / 100;
  }

  if (fromRight) {
    const rightValues: number[] = [];
    for (let i = 1; i <= 10; i++) {
      const x = limitPoint + EPSILON / i;
      const val = evaluateFunction(functionExpr, x);
      if (val !== null) rightValues.push(val);
    }
    if (rightValues.length === 0) return "DNE";
    const avg = rightValues.reduce((a, b) => a + b, 0) / rightValues.length;
    return Math.round(avg * 100) / 100;
  }

  // Calculate two-sided limit
  const leftLimit = calculateLimit(functionExpr, limitPoint, true, false);
  const rightLimit = calculateLimit(functionExpr, limitPoint, false, true);

  if (leftLimit === "DNE" || rightLimit === "DNE") return "DNE";
  if (typeof leftLimit === "number" && typeof rightLimit === "number") {
    if (Math.abs(leftLimit - rightLimit) < EPSILON) {
      return Math.round(leftLimit * 100) / 100;
    }
  }

  return "DNE";
}

/**
 * Calculate limit of sum: lim[f(x) + g(x)] = lim f(x) + lim g(x)
 */
export function calculateLimitSum(
  f: string,
  g: string,
  limitPoint: number
): number | string {
  const limitF = calculateLimit(f, limitPoint);
  const limitG = calculateLimit(g, limitPoint);

  if (limitF === "DNE" || limitG === "DNE") return "DNE";
  if (typeof limitF === "number" && typeof limitG === "number") {
    return Math.round((limitF + limitG) * 100) / 100;
  }

  return "DNE";
}

/**
 * Calculate limit of product: lim[f(x) · g(x)] = lim f(x) · lim g(x)
 */
export function calculateLimitProduct(
  f: string,
  g: string,
  limitPoint: number
): number | string {
  const limitF = calculateLimit(f, limitPoint);
  const limitG = calculateLimit(g, limitPoint);

  if (limitF === "DNE" || limitG === "DNE") return "DNE";
  if (typeof limitF === "number" && typeof limitG === "number") {
    return Math.round((limitF * limitG) * 100) / 100;
  }

  return "DNE";
}

/**
 * Calculate limit of quotient: lim[f(x) / g(x)] = lim f(x) / lim g(x)
 */
export function calculateLimitQuotient(
  f: string,
  g: string,
  limitPoint: number
): number | string {
  const limitF = calculateLimit(f, limitPoint);
  const limitG = calculateLimit(g, limitPoint);

  if (limitF === "DNE" || limitG === "DNE") return "DNE";
  if (typeof limitF === "number" && typeof limitG === "number") {
    if (Math.abs(limitG) < EPSILON) return "DNE";
    return Math.round((limitF / limitG) * 100) / 100;
  }

  return "DNE";
}

/**
 * Calculate one-sided limits
 */
export function calculateOneSidedLimits(
  functionExpr: string,
  limitPoint: number
): { left: number | string; right: number | string } {
  const left = calculateLimit(functionExpr, limitPoint, true, false);
  const right = calculateLimit(functionExpr, limitPoint, false, true);

  return { left, right };
}

/**
 * Check if function is continuous at a point
 * A function is continuous at x=a if:
 * 1. f(a) is defined
 * 2. lim(x→a) f(x) exists
 * 3. lim(x→a) f(x) = f(a)
 */
export function checkContinuity(
  functionExpr: string,
  point: number
): boolean {
  // Check if f(a) is defined
  const fa = evaluateFunction(functionExpr, point);
  if (fa === null) return false;

  // Check if limit exists
  const limit = calculateLimit(functionExpr, point);
  if (limit === "DNE") return false;

  // Check if limit equals function value
  if (typeof limit === "number") {
    return Math.abs(limit - fa) < EPSILON;
  }

  return false;
}

/**
 * Classify discontinuity type
 * - removable: limit exists but f(a) is undefined or different
 * - jump: left and right limits exist but differ
 * - infinite: at least one one-sided limit is infinite
 */
export function classifyDiscontinuity(
  functionExpr: string,
  point: number
): "removable" | "jump" | "infinite" | null {
  // Check if continuous
  if (checkContinuity(functionExpr, point)) {
    return null;
  }

  // Get one-sided limits
  const { left, right } = calculateOneSidedLimits(functionExpr, point);

  // Check for infinite discontinuity
  if (left === "DNE" || right === "DNE") {
    // Try to detect if it's actually infinite
    const leftValues: number[] = [];
    const rightValues: number[] = [];

    for (let i = 1; i <= 5; i++) {
      const xLeft = point - EPSILON / i;
      const xRight = point + EPSILON / i;
      const valLeft = evaluateFunction(functionExpr, xLeft);
      const valRight = evaluateFunction(functionExpr, xRight);

      if (valLeft !== null) leftValues.push(Math.abs(valLeft));
      if (valRight !== null) rightValues.push(Math.abs(valRight));
    }

    // If values are growing without bound, it's infinite
    const leftGrowing = leftValues.length > 0 && leftValues[leftValues.length - 1] > 100;
    const rightGrowing = rightValues.length > 0 && rightValues[rightValues.length - 1] > 100;

    if (leftGrowing || rightGrowing) {
      return "infinite";
    }
  }

  // Check for jump discontinuity
  if (typeof left === "number" && typeof right === "number") {
    if (Math.abs(left - right) >= EPSILON) {
      return "jump";
    }
  }

  // Check for removable discontinuity
  const fa = evaluateFunction(functionExpr, point);
  const limit = calculateLimit(functionExpr, point);

  if (typeof limit === "number" && (fa === null || Math.abs(limit - fa) >= EPSILON)) {
    return "removable";
  }

  return "infinite";
}
