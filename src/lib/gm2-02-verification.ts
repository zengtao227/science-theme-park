// GM2.02 Analytical Geometry - Answer Verification

/**
 * Verify numerical answer with tolerance
 * Default tolerance is ±0.01
 */
export function verifyNumericalAnswer(
  userAnswer: string | number,
  expected: string | number,
  tolerance: number = 0.01
): boolean {
  const userNum = typeof userAnswer === "string" ? parseFloat(userAnswer) : userAnswer;
  const expectedNum = typeof expected === "string" ? parseFloat(expected) : expected;

  if (isNaN(userNum) || isNaN(expectedNum)) {
    return false;
  }

  return Math.abs(userNum - expectedNum) <= tolerance;
}

/**
 * Verify algebraic expression
 * Checks if two expressions are equivalent
 */
export function verifyAlgebraicExpression(
  userExpr: string,
  expectedExpr: string
): boolean {
  // Normalize both expressions
  const normalizedUser = normalizeExpression(userExpr);
  const normalizedExpected = normalizeExpression(expectedExpr);

  // Direct string comparison after normalization
  if (normalizedUser === normalizedExpected) {
    return true;
  }

  // Check if expressions are equivalent by parsing coefficients
  return checkEquivalence(normalizedUser, normalizedExpected);
}

/**
 * Normalize algebraic expression
 * Removes spaces, standardizes operators, sorts terms
 */
export function normalizeExpression(expr: string): string {
  // Remove all spaces
  let normalized = expr.replace(/\s+/g, "");

  // Convert to lowercase
  normalized = normalized.toLowerCase();

  // Standardize minus signs
  normalized = normalized.replace(/\+-/g, "-");
  normalized = normalized.replace(/-\+/g, "-");

  // Handle implicit multiplication (e.g., 2x -> 2*x)
  normalized = normalized.replace(/(\d)([a-z])/g, "$1*$2");

  // Remove leading + sign
  if (normalized.startsWith("+")) {
    normalized = normalized.substring(1);
  }

  return normalized;
}

/**
 * Check if two normalized expressions are equivalent
 * Handles different forms of the same equation
 */
function checkEquivalence(expr1: string, expr2: string): boolean {
  // Try to extract coefficients for line equations
  const lineCoeffs1 = extractLineCoefficients(expr1);
  const lineCoeffs2 = extractLineCoefficients(expr2);

  if (lineCoeffs1 && lineCoeffs2) {
    return compareLineCoefficients(lineCoeffs1, lineCoeffs2);
  }

  // Try to extract coefficients for plane equations
  const planeCoeffs1 = extractPlaneCoefficients(expr1);
  const planeCoeffs2 = extractPlaneCoefficients(expr2);

  if (planeCoeffs1 && planeCoeffs2) {
    return comparePlaneCoefficients(planeCoeffs1, planeCoeffs2);
  }

  // Try to extract point coordinates
  const point1 = extractPointCoordinates(expr1);
  const point2 = extractPointCoordinates(expr2);

  if (point1 && point2) {
    return comparePoints(point1, point2);
  }

  // Fallback to string comparison
  return expr1 === expr2;
}

/**
 * Extract coefficients from line equation
 * Supports forms: y = mx + b, Ax + By + C = 0
 */
function extractLineCoefficients(expr: string): { A: number; B: number; C: number } | null {
  // Try y = mx + b form
  const slopeInterceptMatch = expr.match(/y=([+-]?\d*\.?\d*)x([+-]?\d+\.?\d*)?/);
  if (slopeInterceptMatch) {
    const m = parseFloat(slopeInterceptMatch[1] || "1");
    const b = parseFloat(slopeInterceptMatch[2] || "0");
    return { A: -m, B: 1, C: -b };
  }

  // Try Ax + By + C = 0 form
  const generalMatch = expr.match(/([+-]?\d*\.?\d*)x([+-]?\d*\.?\d*)y([+-]?\d+\.?\d*)=0/);
  if (generalMatch) {
    const A = parseFloat(generalMatch[1] || "1");
    const B = parseFloat(generalMatch[2] || "1");
    const C = parseFloat(generalMatch[3] || "0");
    return { A, B, C };
  }

  return null;
}

/**
 * Extract coefficients from plane equation
 * Supports form: Ax + By + Cz + D = 0
 */
function extractPlaneCoefficients(expr: string): { A: number; B: number; C: number; D: number } | null {
  const match = expr.match(/([+-]?\d*\.?\d*)x([+-]?\d*\.?\d*)y([+-]?\d*\.?\d*)z([+-]?\d+\.?\d*)=0/);
  if (match) {
    const A = parseFloat(match[1] || "1");
    const B = parseFloat(match[2] || "1");
    const C = parseFloat(match[3] || "1");
    const D = parseFloat(match[4] || "0");
    return { A, B, C, D };
  }

  return null;
}

/**
 * Extract point coordinates from expression
 * Supports form: (x, y) or (x, y, z)
 */
function extractPointCoordinates(expr: string): number[] | null {
  const match = expr.match(/\(([+-]?\d+\.?\d*),([+-]?\d+\.?\d*),?([+-]?\d+\.?\d*)?\)/);
  if (match) {
    const coords = [parseFloat(match[1]), parseFloat(match[2])];
    if (match[3]) {
      coords.push(parseFloat(match[3]));
    }
    return coords;
  }

  return null;
}

/**
 * Compare line coefficients (allowing for scalar multiples)
 */
function compareLineCoefficients(
  coeffs1: { A: number; B: number; C: number },
  coeffs2: { A: number; B: number; C: number },
  tolerance: number = 0.01
): boolean {
  // Check if coefficients are proportional
  const ratio1 = coeffs1.A !== 0 ? coeffs2.A / coeffs1.A : 0;
  const ratio2 = coeffs1.B !== 0 ? coeffs2.B / coeffs1.B : 0;
  const ratio3 = coeffs1.C !== 0 ? coeffs2.C / coeffs1.C : 0;

  // All non-zero ratios should be equal
  const ratios = [ratio1, ratio2, ratio3].filter(r => r !== 0);
  if (ratios.length === 0) return false;

  const firstRatio = ratios[0];
  return ratios.every(r => Math.abs(r - firstRatio) < tolerance);
}

/**
 * Compare plane coefficients (allowing for scalar multiples)
 */
function comparePlaneCoefficients(
  coeffs1: { A: number; B: number; C: number; D: number },
  coeffs2: { A: number; B: number; C: number; D: number },
  tolerance: number = 0.01
): boolean {
  // Check if coefficients are proportional
  const ratio1 = coeffs1.A !== 0 ? coeffs2.A / coeffs1.A : 0;
  const ratio2 = coeffs1.B !== 0 ? coeffs2.B / coeffs1.B : 0;
  const ratio3 = coeffs1.C !== 0 ? coeffs2.C / coeffs1.C : 0;
  const ratio4 = coeffs1.D !== 0 ? coeffs2.D / coeffs1.D : 0;

  // All non-zero ratios should be equal
  const ratios = [ratio1, ratio2, ratio3, ratio4].filter(r => r !== 0);
  if (ratios.length === 0) return false;

  const firstRatio = ratios[0];
  return ratios.every(r => Math.abs(r - firstRatio) < tolerance);
}

/**
 * Compare point coordinates
 */
function comparePoints(
  point1: number[],
  point2: number[],
  tolerance: number = 0.01
): boolean {
  if (point1.length !== point2.length) return false;

  return point1.every((coord, i) => Math.abs(coord - point2[i]) < tolerance);
}

/**
 * Verify answer based on quest slot type
 */
export function verifyAnswer(
  userAnswer: string,
  expected: string | number,
  type: "number" | "expression"
): boolean {
  if (type === "number") {
    return verifyNumericalAnswer(userAnswer, expected);
  } else {
    return verifyAlgebraicExpression(userAnswer, expected.toString());
  }
}
