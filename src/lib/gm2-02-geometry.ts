// GM2.02 Analytical Geometry - Core Geometric Calculations

import { Point2D, Point3D, Vector2D, Vector3D, LineEquation, PlaneEquation, RelationshipType } from "./gm2-02-types";

// ============================================================================
// 2D LINE CALCULATIONS
// ============================================================================

/**
 * Calculate line equation from two points in 2D
 * Returns slope and y-intercept for y = mx + b form
 */
export function calculateLineFrom2Points(
  p1: Point2D,
  p2: Point2D
): LineEquation {
  if (p1.x === p2.x && p1.y === p2.y) {
    throw new Error("Points must be distinct");
  }

  // Handle vertical line case
  if (p1.x === p2.x) {
    return {
      slope: Infinity,
      yIntercept: NaN,
      equation: `x = ${p1.x}`
    };
  }

  const slope = (p2.y - p1.y) / (p2.x - p1.x);
  const yIntercept = p1.y - slope * p1.x;

  // Format equation
  const slopeStr = slope === 0 ? "0" : slope === 1 ? "" : slope === -1 ? "-" : slope.toString();
  const interceptStr = yIntercept >= 0 ? ` + ${yIntercept}` : ` - ${Math.abs(yIntercept)}`;
  const equation = slope === 0 ? `y = ${yIntercept}` : `y = ${slopeStr}x${interceptStr}`;

  return { slope, yIntercept, equation };
}

/**
 * Extract line parameters (slope and y-intercept) from equation
 * Supports forms: y = mx + b, Ax + By + C = 0
 */
export function extractLineParameters(equation: string): LineEquation {
  // Remove spaces
  const eq = equation.replace(/\s/g, "");

  // Try y = mx + b form
  const slopeInterceptMatch = eq.match(/y=([+-]?\d*\.?\d*)x([+-]\d+\.?\d*)?/);
  if (slopeInterceptMatch) {
    const slopeStr = slopeInterceptMatch[1] || "1";
    const slope = slopeStr === "" || slopeStr === "+" ? 1 : slopeStr === "-" ? -1 : parseFloat(slopeStr);
    const yIntercept = slopeInterceptMatch[2] ? parseFloat(slopeInterceptMatch[2]) : 0;
    return { slope, yIntercept, equation };
  }

  // Try Ax + By + C = 0 form
  const generalMatch = eq.match(/([+-]?\d*\.?\d*)x([+-]\d*\.?\d*)y([+-]\d+\.?\d*)=0/);
  if (generalMatch) {
    const A = parseFloat(generalMatch[1] || "1");
    const B = parseFloat(generalMatch[2] || "1");
    const C = parseFloat(generalMatch[3] || "0");
    
    if (B === 0) {
      // Vertical line
      return { slope: Infinity, yIntercept: NaN, equation };
    }
    
    const slope = -A / B;
    const yIntercept = -C / B;
    return { slope, yIntercept, equation };
  }

  throw new Error("Unable to parse line equation");
}

/**
 * Check if a point satisfies a line equation
 */
export function pointSatisfiesLine(
  point: Point2D,
  line: LineEquation,
  tolerance: number = 0.01
): boolean {
  if (line.slope === Infinity) {
    // Vertical line: check x-coordinate
    const xValue = parseFloat(line.equation.split("=")[1]);
    return Math.abs(point.x - xValue) < tolerance;
  }

  const expectedY = line.slope * point.x + line.yIntercept;
  return Math.abs(point.y - expectedY) < tolerance;
}

// ============================================================================
// 3D LINE CALCULATIONS
// ============================================================================

/**
 * Calculate 3D line in parametric form
 * Returns: (x, y, z) = (x0, y0, z0) + t(a, b, c)
 */
export function calculate3DLineParametric(
  point: Point3D,
  direction: Vector3D
): string {
  return `(x, y, z) = (${point.x}, ${point.y}, ${point.z}) + t(${direction.x}, ${direction.y}, ${direction.z})`;
}

/**
 * Calculate 3D line in symmetric form
 * Returns: (x-x0)/a = (y-y0)/b = (z-z0)/c
 */
export function calculate3DLineSymmetric(
  point: Point3D,
  direction: Vector3D
): string {
  if (direction.x === 0 || direction.y === 0 || direction.z === 0) {
    throw new Error("Direction vector components must be non-zero for symmetric form");
  }
  return `(x - ${point.x})/${direction.x} = (y - ${point.y})/${direction.y} = (z - ${point.z})/${direction.z}`;
}

/**
 * Check if a point satisfies a 3D line equation
 */
export function pointSatisfies3DLine(
  point: Point3D,
  linePoint: Point3D,
  lineDirection: Vector3D,
  tolerance: number = 0.01
): boolean {
  // Point P is on line if (P - P0) is parallel to direction vector d
  // This means (P - P0) × d = 0 (cross product is zero)
  const diff: Vector3D = {
    x: point.x - linePoint.x,
    y: point.y - linePoint.y,
    z: point.z - linePoint.z
  };

  const cross = crossProduct(diff, lineDirection);
  const magnitude = vectorMagnitude(cross);
  
  return magnitude < tolerance;
}

// ============================================================================
// PLANE CALCULATIONS
// ============================================================================

/**
 * Calculate plane equation from three non-collinear points
 * Returns coefficients [A, B, C, D] for Ax + By + Cz + D = 0
 */
export function calculatePlaneFrom3Points(
  p1: Point3D,
  p2: Point3D,
  p3: Point3D
): PlaneEquation {
  if (areCollinear(p1, p2, p3)) {
    throw new Error("Points must be non-collinear");
  }

  // Create two vectors in the plane
  const v1: Vector3D = {
    x: p2.x - p1.x,
    y: p2.y - p1.y,
    z: p2.z - p1.z
  };

  const v2: Vector3D = {
    x: p3.x - p1.x,
    y: p3.y - p1.y,
    z: p3.z - p1.z
  };

  // Normal vector is cross product of v1 and v2
  const normal = crossProduct(v1, v2);
  
  // Plane equation: A(x - x1) + B(y - y1) + C(z - z1) = 0
  // Expanding: Ax + By + Cz + D = 0, where D = -(Ax1 + By1 + Cz1)
  const A = normal.x;
  const B = normal.y;
  const C = normal.z;
  const D = -(A * p1.x + B * p1.y + C * p1.z);

  const equation = `${A}x + ${B}y + ${C}z + ${D} = 0`;

  return { A, B, C, D, equation };
}

/**
 * Check if three points are collinear
 */
export function areCollinear(
  p1: Point3D,
  p2: Point3D,
  p3: Point3D,
  tolerance: number = 0.01
): boolean {
  const v1: Vector3D = {
    x: p2.x - p1.x,
    y: p2.y - p1.y,
    z: p2.z - p1.z
  };

  const v2: Vector3D = {
    x: p3.x - p1.x,
    y: p3.y - p1.y,
    z: p3.z - p1.z
  };

  const cross = crossProduct(v1, v2);
  const magnitude = vectorMagnitude(cross);
  
  return magnitude < tolerance;
}

/**
 * Check if a point satisfies a plane equation
 */
export function pointSatisfiesPlane(
  point: Point3D,
  plane: PlaneEquation,
  tolerance: number = 0.01
): boolean {
  const result = plane.A * point.x + plane.B * point.y + plane.C * point.z + plane.D;
  return Math.abs(result) < tolerance;
}

/**
 * Calculate plane equation from point and normal vector
 */
export function calculatePlaneFromPointNormal(
  point: Point3D,
  normal: Vector3D
): PlaneEquation {
  const A = normal.x;
  const B = normal.y;
  const C = normal.z;
  const D = -(A * point.x + B * point.y + C * point.z);

  const equation = `${A}x + ${B}y + ${C}z + ${D} = 0`;

  return { A, B, C, D, equation };
}

/**
 * Extract normal vector from plane equation
 */
export function extractNormalVector(plane: PlaneEquation): Vector3D {
  return {
    x: plane.A,
    y: plane.B,
    z: plane.C
  };
}

/**
 * Calculate plane intercepts with coordinate axes
 */
export function calculatePlaneIntercepts(plane: PlaneEquation): {
  xIntercept: number | null;
  yIntercept: number | null;
  zIntercept: number | null;
} {
  return {
    xIntercept: plane.A !== 0 ? -plane.D / plane.A : null,
    yIntercept: plane.B !== 0 ? -plane.D / plane.B : null,
    zIntercept: plane.C !== 0 ? -plane.D / plane.C : null
  };
}

// ============================================================================
// DISTANCE CALCULATIONS
// ============================================================================

/**
 * Calculate distance from point to line in 2D
 * Uses formula: d = |Ax0 + By0 + C| / sqrt(A^2 + B^2)
 */
export function pointToLine2DDistance(
  point: Point2D,
  A: number,
  B: number,
  C: number
): number {
  const numerator = Math.abs(A * point.x + B * point.y + C);
  const denominator = Math.sqrt(A * A + B * B);
  return numerator / denominator;
}

/**
 * Calculate distance from point to line in 3D
 * Uses cross product formula: d = ||(P - L0) × d|| / ||d||
 */
export function pointToLine3DDistance(
  point: Point3D,
  linePoint: Point3D,
  lineDirection: Vector3D
): number {
  const diff: Vector3D = {
    x: point.x - linePoint.x,
    y: point.y - linePoint.y,
    z: point.z - linePoint.z
  };

  const cross = crossProduct(diff, lineDirection);
  const crossMagnitude = vectorMagnitude(cross);
  const directionMagnitude = vectorMagnitude(lineDirection);

  return crossMagnitude / directionMagnitude;
}

/**
 * Calculate distance from point to plane
 * Uses formula: d = |Ax0 + By0 + Cz0 + D| / sqrt(A^2 + B^2 + C^2)
 */
export function pointToPlaneDistance(
  point: Point3D,
  plane: PlaneEquation
): number {
  const numerator = Math.abs(
    plane.A * point.x + plane.B * point.y + plane.C * point.z + plane.D
  );
  const denominator = Math.sqrt(
    plane.A * plane.A + plane.B * plane.B + plane.C * plane.C
  );
  return numerator / denominator;
}

/**
 * Calculate distance between parallel lines in 2D
 */
export function parallelLinesDistance(
  line1: { A: number; B: number; C: number },
  line2: { A: number; B: number; C: number }
): number {
  // Lines must be parallel (same A and B coefficients)
  if (line1.A !== line2.A || line1.B !== line2.B) {
    throw new Error("Lines must be parallel");
  }

  // Distance = |C1 - C2| / sqrt(A^2 + B^2)
  return Math.abs(line1.C - line2.C) / Math.sqrt(line1.A * line1.A + line1.B * line1.B);
}

/**
 * Calculate distance between parallel planes
 */
export function parallelPlanesDistance(
  plane1: PlaneEquation,
  plane2: PlaneEquation
): number {
  // Planes must be parallel (proportional normal vectors)
  const ratio1 = plane2.A / plane1.A;
  const ratio2 = plane2.B / plane1.B;
  const ratio3 = plane2.C / plane1.C;

  if (Math.abs(ratio1 - ratio2) > 0.01 || Math.abs(ratio2 - ratio3) > 0.01) {
    throw new Error("Planes must be parallel");
  }

  // Normalize plane1 coefficients
  const magnitude = Math.sqrt(plane1.A * plane1.A + plane1.B * plane1.B + plane1.C * plane1.C);
  const D1_normalized = plane1.D / magnitude;
  const D2_normalized = plane2.D / magnitude;

  return Math.abs(D1_normalized - D2_normalized);
}

// ============================================================================
// POSITION RELATIONSHIP CLASSIFICATION
// ============================================================================

/**
 * Classify relationship between two lines in 2D
 */
export function classifyLineLine2D(
  line1: { slope: number },
  line2: { slope: number }
): RelationshipType {
  if (line1.slope === line2.slope) {
    return "parallel";
  }
  if (line1.slope * line2.slope === -1) {
    return "perpendicular";
  }
  return "intersecting";
}

/**
 * Classify relationship between two lines in 3D
 */
export function classifyLineLine3D(
  line1: { point: Point3D; direction: Vector3D },
  line2: { point: Point3D; direction: Vector3D }
): RelationshipType {
  const d1 = line1.direction;
  const d2 = line2.direction;

  const cross = crossProduct(d1, d2);
  const crossMag = vectorMagnitude(cross);
  const dot = dotProduct(d1, d2);

  // Parallel if cross product is zero
  if (crossMag < 0.01) {
    return "parallel";
  }

  // Perpendicular if dot product is zero
  if (Math.abs(dot) < 0.01) {
    return "perpendicular";
  }

  // Check if lines intersect
  const diff: Vector3D = {
    x: line2.point.x - line1.point.x,
    y: line2.point.y - line1.point.y,
    z: line2.point.z - line1.point.z
  };

  const scalarTripleProduct = dotProduct(diff, cross);
  
  if (Math.abs(scalarTripleProduct) < 0.01) {
    return "intersecting";
  }

  return "skew";
}

/**
 * Classify relationship between line and plane
 */
export function classifyLinePlane(
  line: { direction: Vector3D },
  plane: PlaneEquation
): RelationshipType {
  const normal = extractNormalVector(plane);
  const dot = dotProduct(line.direction, normal);

  // Parallel if dot product is zero
  if (Math.abs(dot) < 0.01) {
    return "parallel";
  }

  // Perpendicular if direction is parallel to normal
  const cross = crossProduct(line.direction, normal);
  const crossMag = vectorMagnitude(cross);
  
  if (crossMag < 0.01) {
    return "perpendicular";
  }

  return "intersecting";
}

/**
 * Classify relationship between two planes
 */
export function classifyPlanePlane(
  plane1: PlaneEquation,
  plane2: PlaneEquation
): RelationshipType {
  const n1 = extractNormalVector(plane1);
  const n2 = extractNormalVector(plane2);

  const cross = crossProduct(n1, n2);
  const crossMag = vectorMagnitude(cross);
  const dot = dotProduct(n1, n2);

  // Parallel if cross product is zero
  if (crossMag < 0.01) {
    return "parallel";
  }

  // Perpendicular if dot product is zero
  if (Math.abs(dot) < 0.01) {
    return "perpendicular";
  }

  return "intersecting";
}

/**
 * Calculate intersection point of two lines in 2D
 */
export function calculateLineLineIntersection(
  line1: { A: number; B: number; C: number },
  line2: { A: number; B: number; C: number }
): Point2D | null {
  const det = line1.A * line2.B - line2.A * line1.B;
  
  if (Math.abs(det) < 0.01) {
    return null; // Lines are parallel
  }

  const x = (line1.B * line2.C - line2.B * line1.C) / det;
  const y = (line2.A * line1.C - line1.A * line2.C) / det;

  return { x, y };
}

/**
 * Calculate intersection point of line and plane
 */
export function calculateLinePlaneIntersection(
  line: { point: Point3D; direction: Vector3D },
  plane: PlaneEquation
): Point3D | null {
  const normal = extractNormalVector(plane);
  const dot = dotProduct(line.direction, normal);

  if (Math.abs(dot) < 0.01) {
    return null; // Line is parallel to plane
  }

  // Calculate parameter t
  const numerator = -(plane.A * line.point.x + plane.B * line.point.y + plane.C * line.point.z + plane.D);
  const t = numerator / dot;

  // Calculate intersection point
  return {
    x: line.point.x + t * line.direction.x,
    y: line.point.y + t * line.direction.y,
    z: line.point.z + t * line.direction.z
  };
}

/**
 * Calculate intersection line of two planes
 */
export function calculatePlanePlaneIntersection(
  plane1: PlaneEquation,
  plane2: PlaneEquation
): { point: Point3D; direction: Vector3D } | null {
  const n1 = extractNormalVector(plane1);
  const n2 = extractNormalVector(plane2);

  const direction = crossProduct(n1, n2);
  const dirMag = vectorMagnitude(direction);

  if (dirMag < 0.01) {
    return null; // Planes are parallel
  }

  // Find a point on the intersection line
  // Set z = 0 and solve for x and y
  const det = plane1.A * plane2.B - plane2.A * plane1.B;
  
  if (Math.abs(det) > 0.01) {
    const x = (plane1.B * plane2.D - plane2.B * plane1.D) / det;
    const y = (plane2.A * plane1.D - plane1.A * plane2.D) / det;
    return { point: { x, y, z: 0 }, direction };
  }

  // Try setting y = 0
  const det2 = plane1.A * plane2.C - plane2.A * plane1.C;
  if (Math.abs(det2) > 0.01) {
    const x = (plane1.C * plane2.D - plane2.C * plane1.D) / det2;
    const z = (plane2.A * plane1.D - plane1.A * plane2.D) / det2;
    return { point: { x, y: 0, z }, direction };
  }

  // Try setting x = 0
  const det3 = plane1.B * plane2.C - plane2.B * plane1.C;
  if (Math.abs(det3) > 0.01) {
    const y = (plane1.C * plane2.D - plane2.C * plane1.D) / det3;
    const z = (plane2.B * plane1.D - plane1.B * plane2.D) / det3;
    return { point: { x: 0, y, z }, direction };
  }

  return null;
}

// ============================================================================
// VECTOR OPERATIONS
// ============================================================================

/**
 * Calculate cross product of two 3D vectors
 */
export function crossProduct(v1: Vector3D, v2: Vector3D): Vector3D {
  return {
    x: v1.y * v2.z - v1.z * v2.y,
    y: v1.z * v2.x - v1.x * v2.z,
    z: v1.x * v2.y - v1.y * v2.x
  };
}

/**
 * Calculate dot product of two 3D vectors
 */
export function dotProduct(v1: Vector3D, v2: Vector3D): number {
  return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}

/**
 * Calculate magnitude of a 3D vector
 */
export function vectorMagnitude(v: Vector3D): number {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}
