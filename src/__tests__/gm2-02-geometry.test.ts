// GM2.02 Analytical Geometry - Geometric Calculations Tests

import {
  calculateLineFrom2Points,
  extractLineParameters,
  pointSatisfiesLine,
  calculate3DLineParametric,
  calculate3DLineSymmetric,
  pointSatisfies3DLine,
  calculatePlaneFrom3Points,
  areCollinear,
  pointSatisfiesPlane,
  calculatePlaneFromPointNormal,
  extractNormalVector,
  calculatePlaneIntercepts,
  pointToLine2DDistance,
  pointToLine3DDistance,
  pointToPlaneDistance,
  parallelLinesDistance,
  parallelPlanesDistance,
  classifyLineLine2D,
  classifyLineLine3D,
  classifyLinePlane,
  classifyPlanePlane,
  calculateLineLineIntersection,
  calculateLinePlaneIntersection,
  calculatePlanePlaneIntersection,
  crossProduct,
  dotProduct,
  vectorMagnitude,
} from "../lib/gm2-02-geometry";

describe("GM2.02 Geometric Calculations", () => {
  // ============================================================================
  // 2D LINE CALCULATIONS
  // ============================================================================

  describe("2D Line Calculations", () => {
    test("calculateLineFrom2Points - basic slope", () => {
      const p1 = { x: 0, y: 0 };
      const p2 = { x: 1, y: 2 };
      const result = calculateLineFrom2Points(p1, p2);
      
      expect(result.slope).toBe(2);
      expect(result.yIntercept).toBe(0);
    });

    test("calculateLineFrom2Points - negative slope", () => {
      const p1 = { x: 0, y: 4 };
      const p2 = { x: 2, y: 0 };
      const result = calculateLineFrom2Points(p1, p2);
      
      expect(result.slope).toBe(-2);
      expect(result.yIntercept).toBe(4);
    });

    test("calculateLineFrom2Points - vertical line", () => {
      const p1 = { x: 3, y: 0 };
      const p2 = { x: 3, y: 5 };
      const result = calculateLineFrom2Points(p1, p2);
      
      expect(result.slope).toBe(Infinity);
      expect(result.equation).toBe("x = 3");
    });

    test("calculateLineFrom2Points - horizontal line", () => {
      const p1 = { x: 0, y: 5 };
      const p2 = { x: 10, y: 5 };
      const result = calculateLineFrom2Points(p1, p2);
      
      expect(result.slope).toBe(0);
      expect(result.yIntercept).toBe(5);
    });

    test("calculateLineFrom2Points - throws on identical points", () => {
      const p1 = { x: 1, y: 1 };
      const p2 = { x: 1, y: 1 };
      
      expect(() => calculateLineFrom2Points(p1, p2)).toThrow("Points must be distinct");
    });

    test("pointSatisfiesLine - point on line", () => {
      const line = { slope: 2, yIntercept: 1, equation: "y = 2x + 1" };
      const point = { x: 3, y: 7 };
      
      expect(pointSatisfiesLine(point, line)).toBe(true);
    });

    test("pointSatisfiesLine - point not on line", () => {
      const line = { slope: 2, yIntercept: 1, equation: "y = 2x + 1" };
      const point = { x: 3, y: 8 };
      
      expect(pointSatisfiesLine(point, line)).toBe(false);
    });
  });

  // ============================================================================
  // 3D LINE CALCULATIONS
  // ============================================================================

  describe("3D Line Calculations", () => {
    test("calculate3DLineParametric", () => {
      const point = { x: 1, y: 2, z: 3 };
      const direction = { x: 2, y: -1, z: 4 };
      const result = calculate3DLineParametric(point, direction);
      
      expect(result).toBe("(x, y, z) = (1, 2, 3) + t(2, -1, 4)");
    });

    test("calculate3DLineSymmetric", () => {
      const point = { x: 1, y: 2, z: 3 };
      const direction = { x: 2, y: -1, z: 4 };
      const result = calculate3DLineSymmetric(point, direction);
      
      expect(result).toBe("(x - 1)/2 = (y - 2)/-1 = (z - 3)/4");
    });

    test("pointSatisfies3DLine - point on line", () => {
      const linePoint = { x: 1, y: 2, z: 3 };
      const direction = { x: 2, y: -1, z: 4 };
      const testPoint = { x: 3, y: 1, z: 7 }; // linePoint + 1*direction
      
      expect(pointSatisfies3DLine(testPoint, linePoint, direction)).toBe(true);
    });

    test("pointSatisfies3DLine - point not on line", () => {
      const linePoint = { x: 1, y: 2, z: 3 };
      const direction = { x: 2, y: -1, z: 4 };
      const testPoint = { x: 3, y: 1, z: 8 };
      
      expect(pointSatisfies3DLine(testPoint, linePoint, direction)).toBe(false);
    });
  });

  // ============================================================================
  // PLANE CALCULATIONS
  // ============================================================================

  describe("Plane Calculations", () => {
    test("calculatePlaneFrom3Points", () => {
      const p1 = { x: 1, y: 0, z: 0 };
      const p2 = { x: 0, y: 1, z: 0 };
      const p3 = { x: 0, y: 0, z: 1 };
      const result = calculatePlaneFrom3Points(p1, p2, p3);
      
      // Plane should be x + y + z - 1 = 0
      expect(result.A).toBe(1);
      expect(result.B).toBe(1);
      expect(result.C).toBe(1);
      expect(result.D).toBe(-1);
    });

    test("areCollinear - collinear points", () => {
      const p1 = { x: 0, y: 0, z: 0 };
      const p2 = { x: 1, y: 1, z: 1 };
      const p3 = { x: 2, y: 2, z: 2 };
      
      expect(areCollinear(p1, p2, p3)).toBe(true);
    });

    test("areCollinear - non-collinear points", () => {
      const p1 = { x: 1, y: 0, z: 0 };
      const p2 = { x: 0, y: 1, z: 0 };
      const p3 = { x: 0, y: 0, z: 1 };
      
      expect(areCollinear(p1, p2, p3)).toBe(false);
    });

    test("pointSatisfiesPlane - point on plane", () => {
      const plane = { A: 1, B: 1, C: 1, D: -3, equation: "x + y + z - 3 = 0" };
      const point = { x: 1, y: 1, z: 1 };
      
      expect(pointSatisfiesPlane(point, plane)).toBe(true);
    });

    test("pointSatisfiesPlane - point not on plane", () => {
      const plane = { A: 1, B: 1, C: 1, D: -3, equation: "x + y + z - 3 = 0" };
      const point = { x: 1, y: 1, z: 2 };
      
      expect(pointSatisfiesPlane(point, plane)).toBe(false);
    });

    test("calculatePlaneFromPointNormal", () => {
      const point = { x: 1, y: 2, z: 3 };
      const normal = { x: 2, y: -1, z: 1 };
      const result = calculatePlaneFromPointNormal(point, normal);
      
      // 2(x-1) - 1(y-2) + 1(z-3) = 0
      // 2x - y + z - 3 = 0
      expect(result.A).toBe(2);
      expect(result.B).toBe(-1);
      expect(result.C).toBe(1);
      expect(result.D).toBe(-3);
    });

    test("extractNormalVector", () => {
      const plane = { A: 2, B: -1, C: 3, D: -5, equation: "2x - y + 3z - 5 = 0" };
      const normal = extractNormalVector(plane);
      
      expect(normal.x).toBe(2);
      expect(normal.y).toBe(-1);
      expect(normal.z).toBe(3);
    });

    test("calculatePlaneIntercepts", () => {
      const plane = { A: 2, B: 3, C: 6, D: -12, equation: "2x + 3y + 6z - 12 = 0" };
      const intercepts = calculatePlaneIntercepts(plane);
      
      expect(intercepts.xIntercept).toBe(6);
      expect(intercepts.yIntercept).toBe(4);
      expect(intercepts.zIntercept).toBe(2);
    });
  });

  // ============================================================================
  // DISTANCE CALCULATIONS
  // ============================================================================

  describe("Distance Calculations", () => {
    test("pointToLine2DDistance", () => {
      // Line: 3x + 4y - 5 = 0
      // Point: (1, 1)
      // Distance should be |3*1 + 4*1 - 5| / sqrt(9 + 16) = 2/5 = 0.4
      const distance = pointToLine2DDistance({ x: 1, y: 1 }, 3, 4, -5);
      
      expect(distance).toBeCloseTo(0.4, 2);
    });

    test("pointToLine3DDistance", () => {
      const point = { x: 1, y: 1, z: 1 };
      const linePoint = { x: 0, y: 0, z: 0 };
      const lineDirection = { x: 1, y: 0, z: 0 };
      const distance = pointToLine3DDistance(point, linePoint, lineDirection);
      
      // Distance should be sqrt(1^2 + 1^2) = sqrt(2)
      expect(distance).toBeCloseTo(Math.sqrt(2), 2);
    });

    test("pointToPlaneDistance", () => {
      const point = { x: 1, y: 1, z: 1 };
      const plane = { A: 1, B: 0, C: 0, D: -2, equation: "x - 2 = 0" };
      const distance = pointToPlaneDistance(point, plane);
      
      // Distance should be |1 - 2| / 1 = 1
      expect(distance).toBe(1);
    });

    test("parallelLinesDistance", () => {
      const line1 = { A: 3, B: 4, C: -5 };
      const line2 = { A: 3, B: 4, C: 5 };
      const distance = parallelLinesDistance(line1, line2);
      
      // Distance should be |(-5) - 5| / sqrt(9 + 16) = 10/5 = 2
      expect(distance).toBe(2);
    });

    test("parallelPlanesDistance", () => {
      const plane1 = { A: 1, B: 0, C: 0, D: -2, equation: "x - 2 = 0" };
      const plane2 = { A: 1, B: 0, C: 0, D: -5, equation: "x - 5 = 0" };
      const distance = parallelPlanesDistance(plane1, plane2);
      
      // Distance should be 3
      expect(distance).toBeCloseTo(3, 2);
    });
  });

  // ============================================================================
  // POSITION RELATIONSHIP CLASSIFICATION
  // ============================================================================

  describe("Position Relationship Classification", () => {
    test("classifyLineLine2D - parallel", () => {
      const line1 = { slope: 2 };
      const line2 = { slope: 2 };
      
      expect(classifyLineLine2D(line1, line2)).toBe("parallel");
    });

    test("classifyLineLine2D - perpendicular", () => {
      const line1 = { slope: 2 };
      const line2 = { slope: -0.5 };
      
      expect(classifyLineLine2D(line1, line2)).toBe("perpendicular");
    });

    test("classifyLineLine2D - intersecting", () => {
      const line1 = { slope: 2 };
      const line2 = { slope: 3 };
      
      expect(classifyLineLine2D(line1, line2)).toBe("intersecting");
    });

    test("classifyLineLine3D - parallel", () => {
      const line1 = {
        point: { x: 0, y: 0, z: 0 },
        direction: { x: 1, y: 2, z: 3 }
      };
      const line2 = {
        point: { x: 1, y: 1, z: 1 },
        direction: { x: 2, y: 4, z: 6 }
      };
      
      expect(classifyLineLine3D(line1, line2)).toBe("parallel");
    });

    test("classifyLineLine3D - skew", () => {
      // Line 1: passes through origin along x-axis
      const line1 = {
        point: { x: 0, y: 0, z: 0 },
        direction: { x: 1, y: 0, z: 0 }
      };
      // Line 2: passes through (0,1,1) along direction (1,1,0)
      // These lines are skew (not parallel, not intersecting, not perpendicular)
      const line2 = {
        point: { x: 0, y: 1, z: 1 },
        direction: { x: 1, y: 1, z: 0 }
      };
      
      expect(classifyLineLine3D(line1, line2)).toBe("skew");
    });

    test("classifyLinePlane - parallel", () => {
      const line = { direction: { x: 1, y: 0, z: 0 } };
      const plane = { A: 0, B: 0, C: 1, D: -5, equation: "z - 5 = 0" };
      
      expect(classifyLinePlane(line, plane)).toBe("parallel");
    });

    test("classifyLinePlane - perpendicular", () => {
      const line = { direction: { x: 0, y: 0, z: 1 } };
      const plane = { A: 0, B: 0, C: 1, D: -5, equation: "z - 5 = 0" };
      
      expect(classifyLinePlane(line, plane)).toBe("perpendicular");
    });

    test("classifyPlanePlane - parallel", () => {
      const plane1 = { A: 1, B: 0, C: 0, D: -2, equation: "x - 2 = 0" };
      const plane2 = { A: 1, B: 0, C: 0, D: -5, equation: "x - 5 = 0" };
      
      expect(classifyPlanePlane(plane1, plane2)).toBe("parallel");
    });

    test("classifyPlanePlane - perpendicular", () => {
      const plane1 = { A: 1, B: 0, C: 0, D: 0, equation: "x = 0" };
      const plane2 = { A: 0, B: 1, C: 0, D: 0, equation: "y = 0" };
      
      expect(classifyPlanePlane(plane1, plane2)).toBe("perpendicular");
    });
  });

  // ============================================================================
  // INTERSECTION CALCULATIONS
  // ============================================================================

  describe("Intersection Calculations", () => {
    test("calculateLineLineIntersection - intersecting lines", () => {
      const line1 = { A: 1, B: -1, C: 0 }; // x - y = 0
      const line2 = { A: 1, B: 1, C: -2 }; // x + y - 2 = 0
      const intersection = calculateLineLineIntersection(line1, line2);
      
      expect(intersection).not.toBeNull();
      expect(intersection!.x).toBeCloseTo(1, 2);
      expect(intersection!.y).toBeCloseTo(1, 2);
    });

    test("calculateLineLineIntersection - parallel lines", () => {
      const line1 = { A: 1, B: -1, C: 0 };
      const line2 = { A: 1, B: -1, C: -2 };
      const intersection = calculateLineLineIntersection(line1, line2);
      
      expect(intersection).toBeNull();
    });

    test("calculateLinePlaneIntersection - intersecting", () => {
      const line = {
        point: { x: 0, y: 0, z: 0 },
        direction: { x: 0, y: 0, z: 1 }
      };
      const plane = { A: 0, B: 0, C: 1, D: -5, equation: "z - 5 = 0" };
      const intersection = calculateLinePlaneIntersection(line, plane);
      
      expect(intersection).not.toBeNull();
      expect(intersection!.x).toBe(0);
      expect(intersection!.y).toBe(0);
      expect(intersection!.z).toBeCloseTo(5, 2);
    });

    test("calculateLinePlaneIntersection - parallel", () => {
      const line = {
        point: { x: 0, y: 0, z: 0 },
        direction: { x: 1, y: 0, z: 0 }
      };
      const plane = { A: 0, B: 0, C: 1, D: -5, equation: "z - 5 = 0" };
      const intersection = calculateLinePlaneIntersection(line, plane);
      
      expect(intersection).toBeNull();
    });
  });

  // ============================================================================
  // VECTOR OPERATIONS
  // ============================================================================

  describe("Vector Operations", () => {
    test("crossProduct", () => {
      const v1 = { x: 1, y: 0, z: 0 };
      const v2 = { x: 0, y: 1, z: 0 };
      const result = crossProduct(v1, v2);
      
      expect(result.x).toBe(0);
      expect(result.y).toBe(0);
      expect(result.z).toBe(1);
    });

    test("dotProduct", () => {
      const v1 = { x: 1, y: 2, z: 3 };
      const v2 = { x: 4, y: 5, z: 6 };
      const result = dotProduct(v1, v2);
      
      // 1*4 + 2*5 + 3*6 = 4 + 10 + 18 = 32
      expect(result).toBe(32);
    });

    test("vectorMagnitude", () => {
      const v = { x: 3, y: 4, z: 0 };
      const magnitude = vectorMagnitude(v);
      
      expect(magnitude).toBe(5);
    });

    test("vectorMagnitude - 3D", () => {
      const v = { x: 1, y: 2, z: 2 };
      const magnitude = vectorMagnitude(v);
      
      // sqrt(1 + 4 + 4) = sqrt(9) = 3
      expect(magnitude).toBe(3);
    });
  });
});
