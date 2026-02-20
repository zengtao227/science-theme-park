// GM2.02 Analytical Geometry - Quest Data Generation

import { GM202Quest, Difficulty, Stage, GeometryData } from "./gm2-02-types";
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
  calculatePlanePlaneIntersection,
  calculate3DLineParametric
} from "./gm2-02-geometry";

// ============================================================================
// LINE EQUATIONS STAGE - BASIC (15 quests)
// ============================================================================

export function generateLineEquationsBasicQuests(): GM202Quest[] {
  const quests: GM202Quest[] = [];

  // Quest 1-3: Find line equation from two points
  const twoPointsData = [
    { p1: { x: 1, y: 2 }, p2: { x: 3, y: 6 }, id: 1 },
    { p1: { x: 0, y: 1 }, p2: { x: 2, y: 5 }, id: 2 },
    { p1: { x: -1, y: 3 }, p2: { x: 2, y: 9 }, id: 3 }
  ];

  twoPointsData.forEach(({ p1, p2, id }) => {
    const line = calculateLineFrom2Points(p1, p2);
    quests.push({
      id: `LINE_EQUATIONS_BASIC_${id}`,
      difficulty: "BASIC",
      stage: "LINE_EQUATIONS",
      points: [[p1.x, p1.y], [p2.x, p2.y]],
      slope: line.slope,
      yIntercept: line.yIntercept,
      promptLatex: `Find the equation of the line passing through points (${p1.x}, ${p1.y}) and (${p2.x}, ${p2.y}).`,
      expressionLatex: `y = mx + b`,
      targetLatex: `y`,
      slots: [
        {
          id: "equation",
          labelLatex: "Line equation:",
          placeholder: "y = mx + b",
          expected: line.equation,
          type: "expression"
        }
      ],
      correctLatex: line.equation,
      answer: line.equation,
      visualizationData: {
        lines: [{
          type: "2D",
          point: p1,
          direction: { x: p2.x - p1.x, y: p2.y - p1.y },
          color: "blue"
        }],
        points: [
          { coordinates: [p1.x, p1.y], label: "P1", color: "red" },
          { coordinates: [p2.x, p2.y], label: "P2", color: "red" }
        ]
      }
    });
  });

  // Quest 4-6: Find slope from line equation
  const slopeData = [
    { equation: "y = 3x + 5", slope: 3, id: 4 },
    { equation: "y = -2x + 7", slope: -2, id: 5 },
    { equation: "y = 0.5x - 1", slope: 0.5, id: 6 }
  ];

  slopeData.forEach(({ equation, slope, id }) => {
    quests.push({
      id: `LINE_EQUATIONS_BASIC_${id}`,
      difficulty: "BASIC",
      stage: "LINE_EQUATIONS",
      promptLatex: `Find the slope of the line: ${equation}`,
      expressionLatex: equation,
      targetLatex: `m`,
      slots: [
        {
          id: "slope",
          labelLatex: "Slope m:",
          placeholder: "Enter slope",
          expected: slope,
          type: "number"
        }
      ],
      correctLatex: `m = ${slope}`,
      answer: slope,
      visualizationData: {
        lines: [{
          type: "2D",
          point: { x: 0, y: parseFloat(equation.split("+")[1] || equation.split("-")[1]) },
          direction: { x: 1, y: slope },
          color: "blue"
        }]
      }
    });
  });

  // Quest 7-9: Find y-intercept from line equation
  const interceptData = [
    { equation: "y = 2x + 4", intercept: 4, id: 7 },
    { equation: "y = -x + 3", intercept: 3, id: 8 },
    { equation: "y = 3x - 2", intercept: -2, id: 9 }
  ];

  interceptData.forEach(({ equation, intercept, id }) => {
    quests.push({
      id: `LINE_EQUATIONS_BASIC_${id}`,
      difficulty: "BASIC",
      stage: "LINE_EQUATIONS",
      promptLatex: `Find the y-intercept of the line: ${equation}`,
      expressionLatex: equation,
      targetLatex: `b`,
      slots: [
        {
          id: "intercept",
          labelLatex: "Y-intercept b:",
          placeholder: "Enter y-intercept",
          expected: intercept,
          type: "number"
        }
      ],
      correctLatex: `b = ${intercept}`,
      answer: intercept,
      visualizationData: {
        lines: [{
          type: "2D",
          point: { x: 0, y: intercept },
          direction: { x: 1, y: parseFloat(equation.split("x")[0].replace("y=", "").replace("=", "")) || 1 },
          color: "blue"
        }],
        points: [
          { coordinates: [0, intercept], label: "y-intercept", color: "red" }
        ]
      }
    });
  });

  // Quest 10-12: Convert to slope-intercept form
  const conversionData = [
    { equation: "2x + 3y = 6", slope: -2/3, intercept: 2, id: 10 },
    { equation: "x - 2y = 4", slope: 0.5, intercept: -2, id: 11 },
    { equation: "3x + y = 9", slope: -3, intercept: 9, id: 12 }
  ];

  conversionData.forEach(({ equation, slope, intercept, id }) => {
    const answer = `y = ${slope}x + ${intercept}`;
    quests.push({
      id: `LINE_EQUATIONS_BASIC_${id}`,
      difficulty: "BASIC",
      stage: "LINE_EQUATIONS",
      promptLatex: `Convert the line equation ${equation} to slope-intercept form y = mx + b.`,
      expressionLatex: equation,
      targetLatex: `y`,
      slots: [
        {
          id: "equation",
          labelLatex: "Slope-intercept form:",
          placeholder: "y = mx + b",
          expected: answer,
          type: "expression"
        }
      ],
      correctLatex: answer,
      answer: answer,
      visualizationData: {
        lines: [{
          type: "2D",
          point: { x: 0, y: intercept },
          direction: { x: 1, y: slope },
          color: "blue"
        }]
      }
    });
  });

  // Quest 13-15: 3D line in parametric form
  const parametric3DData = [
    { point: { x: 1, y: 2, z: 3 }, direction: { x: 2, y: -1, z: 4 }, id: 13 },
    { point: { x: 0, y: 1, z: -1 }, direction: { x: 1, y: 1, z: 1 }, id: 14 },
    { point: { x: -1, y: 0, z: 2 }, direction: { x: 3, y: 2, z: -1 }, id: 15 }
  ];

  parametric3DData.forEach(({ point, direction, id }) => {
    const answer = calculate3DLineParametric(point, direction);
    quests.push({
      id: `LINE_EQUATIONS_BASIC_${id}`,
      difficulty: "BASIC",
      stage: "LINE_EQUATIONS",
      points: [[point.x, point.y, point.z]],
      promptLatex: `Write the parametric equation of the line passing through point (${point.x}, ${point.y}, ${point.z}) with direction vector (${direction.x}, ${direction.y}, ${direction.z}).`,
      expressionLatex: `\\vec{r}(t) = \\vec{r}_0 + t\\vec{d}`,
      targetLatex: `\\vec{r}(t)`,
      slots: [
        {
          id: "parametric",
          labelLatex: "Parametric form:",
          placeholder: "(x, y, z) = (x0, y0, z0) + t(a, b, c)",
          expected: answer,
          type: "expression"
        }
      ],
      correctLatex: answer,
      answer: answer,
      visualizationData: {
        lines: [{
          type: "3D",
          point: point,
          direction: direction,
          color: "blue"
        }],
        points: [
          { coordinates: [point.x, point.y, point.z], label: "P0", color: "red" }
        ]
      }
    });
  });

  return quests;
}

// ============================================================================
// PLANE GEOMETRY STAGE - CORE (20 quests)
// ============================================================================

export function generatePlaneGeometryCoreQuests(): GM202Quest[] {
  const quests: GM202Quest[] = [];

  // Quest 1-5: Find plane equation from three points
  const threePointsData = [
    { p1: { x: 1, y: 0, z: 0 }, p2: { x: 0, y: 1, z: 0 }, p3: { x: 0, y: 0, z: 1 }, id: 1 },
    { p1: { x: 2, y: 1, z: 3 }, p2: { x: 1, y: 2, z: 1 }, p3: { x: 3, y: 1, z: 2 }, id: 2 },
    { p1: { x: 1, y: 1, z: 1 }, p2: { x: 2, y: 3, z: 4 }, p3: { x: 3, y: 2, z: 5 }, id: 3 },
    { p1: { x: 0, y: 0, z: 2 }, p2: { x: 1, y: 1, z: 2 }, p3: { x: 2, y: 0, z: 2 }, id: 4 },
    { p1: { x: 1, y: 2, z: 0 }, p2: { x: 2, y: 1, z: 1 }, p3: { x: 0, y: 3, z: 2 }, id: 5 }
  ];

  threePointsData.forEach(({ p1, p2, p3, id }) => {
    const plane = calculatePlaneFrom3Points(p1, p2, p3);
    quests.push({
      id: `PLANE_GEOMETRY_CORE_${id}`,
      difficulty: "CORE",
      stage: "PLANE_GEOMETRY",
      points: [[p1.x, p1.y, p1.z], [p2.x, p2.y, p2.z], [p3.x, p3.y, p3.z]],
      promptLatex: `Find the equation of the plane passing through points (${p1.x}, ${p1.y}, ${p1.z}), (${p2.x}, ${p2.y}, ${p2.z}), and (${p3.x}, ${p3.y}, ${p3.z}).`,
      expressionLatex: `Ax + By + Cz + D = 0`,
      targetLatex: `Ax + By + Cz + D`,
      slots: [
        {
          id: "equation",
          labelLatex: "Plane equation:",
          placeholder: "Ax + By + Cz + D = 0",
          expected: plane.equation,
          type: "expression"
        }
      ],
      correctLatex: plane.equation,
      answer: plane.equation,
      visualizationData: {
        planes: [{
          coefficients: [plane.A, plane.B, plane.C, plane.D],
          color: "green",
          opacity: 0.3
        }],
        points: [
          { coordinates: [p1.x, p1.y, p1.z], label: "P1", color: "red" },
          { coordinates: [p2.x, p2.y, p2.z], label: "P2", color: "red" },
          { coordinates: [p3.x, p3.y, p3.z], label: "P3", color: "red" }
        ]
      }
    });
  });

  // Quest 6-10: Find normal vector from plane equation
  const normalVectorData = [
    { A: 2, B: -3, C: 4, D: 5, id: 6 },
    { A: 1, B: 1, C: 1, D: -3, id: 7 },
    { A: 3, B: 0, C: -2, D: 7, id: 8 },
    { A: -1, B: 2, C: 3, D: 0, id: 9 },
    { A: 4, B: -1, C: 2, D: -6, id: 10 }
  ];

  normalVectorData.forEach(({ A, B, C, D, id }) => {
    const equation = `${A}x + ${B}y + ${C}z + ${D} = 0`;
    const answer = `(${A}, ${B}, ${C})`;
    quests.push({
      id: `PLANE_GEOMETRY_CORE_${id}`,
      difficulty: "CORE",
      stage: "PLANE_GEOMETRY",
      normalVector: [A, B, C],
      promptLatex: `Find the normal vector of the plane: ${equation}`,
      expressionLatex: equation,
      targetLatex: `\\vec{n}`,
      slots: [
        {
          id: "normal",
          labelLatex: "Normal vector:",
          placeholder: "(A, B, C)",
          expected: answer,
          type: "expression"
        }
      ],
      correctLatex: `\\vec{n} = ${answer}`,
      answer: answer,
      visualizationData: {
        planes: [{
          coefficients: [A, B, C, D],
          color: "green",
          opacity: 0.3
        }]
      }
    });
  });

  // Quest 11-15: Find plane equation from point and normal
  const pointNormalData = [
    { point: { x: 1, y: 2, z: 3 }, normal: { x: 2, y: -1, z: 3 }, id: 11 },
    { point: { x: 0, y: 1, z: -1 }, normal: { x: 1, y: 1, z: 1 }, id: 12 },
    { point: { x: 2, y: 0, z: 1 }, normal: { x: 3, y: 2, z: -1 }, id: 13 },
    { point: { x: -1, y: 3, z: 2 }, normal: { x: 1, y: -2, z: 4 }, id: 14 },
    { point: { x: 3, y: 1, z: 0 }, normal: { x: 2, y: 3, z: 1 }, id: 15 }
  ];

  pointNormalData.forEach(({ point, normal, id }) => {
    const plane = calculatePlaneFromPointNormal(point, normal);
    quests.push({
      id: `PLANE_GEOMETRY_CORE_${id}`,
      difficulty: "CORE",
      stage: "PLANE_GEOMETRY",
      planePoint: [point.x, point.y, point.z],
      normalVector: [normal.x, normal.y, normal.z],
      promptLatex: `Find the equation of the plane passing through point (${point.x}, ${point.y}, ${point.z}) with normal vector (${normal.x}, ${normal.y}, ${normal.z}).`,
      expressionLatex: `\\vec{n} \\cdot (\\vec{r} - \\vec{r}_0) = 0`,
      targetLatex: `Ax + By + Cz + D`,
      slots: [
        {
          id: "equation",
          labelLatex: "Plane equation:",
          placeholder: "Ax + By + Cz + D = 0",
          expected: plane.equation,
          type: "expression"
        }
      ],
      correctLatex: plane.equation,
      answer: plane.equation,
      visualizationData: {
        planes: [{
          coefficients: [plane.A, plane.B, plane.C, plane.D],
          color: "green",
          opacity: 0.3
        }],
        points: [
          { coordinates: [point.x, point.y, point.z], label: "P0", color: "red" }
        ]
      }
    });
  });

  // Quest 16-20: Find intercepts of plane
  const interceptsData = [
    { A: 2, B: 3, C: 6, D: -12, id: 16 },
    { A: 1, B: 2, C: 4, D: -8, id: 17 },
    { A: 3, B: 4, C: 2, D: -24, id: 18 },
    { A: 1, B: 1, C: 1, D: -6, id: 19 },
    { A: 2, B: 1, C: 3, D: -6, id: 20 }
  ];

  interceptsData.forEach(({ A, B, C, D, id }) => {
    const xInt = -D / A;
    const yInt = -D / B;
    const zInt = -D / C;
    const equation = `${A}x + ${B}y + ${C}z + ${D} = 0`;
    const answer = `(${xInt.toFixed(1)}, ${yInt.toFixed(1)}, ${zInt.toFixed(1)})`;
    
    quests.push({
      id: `PLANE_GEOMETRY_CORE_${id}`,
      difficulty: "CORE",
      stage: "PLANE_GEOMETRY",
      promptLatex: `Find the x, y, and z intercepts of the plane: ${equation}`,
      expressionLatex: equation,
      targetLatex: `(x_{int}, y_{int}, z_{int})`,
      slots: [
        {
          id: "intercepts",
          labelLatex: "Intercepts:",
          placeholder: "(x, y, z)",
          expected: answer,
          type: "expression"
        }
      ],
      correctLatex: answer,
      answer: answer,
      visualizationData: {
        planes: [{
          coefficients: [A, B, C, D],
          color: "green",
          opacity: 0.3
        }],
        points: [
          { coordinates: [xInt, 0, 0], label: "x-int", color: "red" },
          { coordinates: [0, yInt, 0], label: "y-int", color: "red" },
          { coordinates: [0, 0, zInt], label: "z-int", color: "red" }
        ]
      }
    });
  });

  return quests;
}

// ============================================================================
// SPATIAL RELATIONSHIPS STAGE - ADVANCED (20 quests)
// ============================================================================

export function generateSpatialRelationshipsAdvancedQuests(): GM202Quest[] {
  const quests: GM202Quest[] = [];

  // Quest 1-5: Distance from point to line in 2D
  const point2DLineData = [
    { point: { x: 2, y: 3 }, A: 3, B: 4, C: -5, id: 1 },
    { point: { x: 1, y: 1 }, A: 1, B: 1, C: -4, id: 2 },
    { point: { x: 0, y: 0 }, A: 2, B: -1, C: 3, id: 3 },
    { point: { x: -1, y: 2 }, A: 1, B: -2, C: 5, id: 4 },
    { point: { x: 3, y: -1 }, A: 2, B: 3, C: -6, id: 5 }
  ];

  point2DLineData.forEach(({ point, A, B, C, id }) => {
    const distance = pointToLine2DDistance(point, A, B, C);
    const equation = `${A}x + ${B}y + ${C} = 0`;
    
    quests.push({
      id: `SPATIAL_RELATIONSHIPS_ADVANCED_${id}`,
      difficulty: "ADVANCED",
      stage: "SPATIAL_RELATIONSHIPS",
      distanceFrom: [point.x, point.y],
      distanceTo: {
        type: "line",
        equation: equation,
        coefficients: [A, B, C]
      },
      promptLatex: `Calculate the distance from point (${point.x}, ${point.y}) to the line ${equation}.`,
      expressionLatex: `d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^{2} + B^2}}`,
      targetLatex: `d`,
      slots: [
        {
          id: "distance",
          labelLatex: "Distance:",
          placeholder: "Enter distance",
          expected: distance.toFixed(2),
          type: "number"
        }
      ],
      correctLatex: `d = ${distance.toFixed(2)}`,
      answer: distance.toFixed(2),
      visualizationData: {
        lines: [{
          type: "2D",
          point: { x: 0, y: -C / B },
          direction: { x: 1, y: -A / B },
          color: "blue"
        }],
        points: [
          { coordinates: [point.x, point.y], label: "P", color: "red" }
        ],
        distances: [{
          from: { coordinates: [point.x, point.y], label: "P", color: "red" },
          to: { coordinates: [point.x, point.y], label: "", color: "blue" } as any,
          value: distance,
          showSegment: true
        }]
      }
    });
  });

  // Quest 6-10: Distance from point to line in 3D
  const point3DLineData = [
    { point: { x: 1, y: 2, z: 3 }, linePoint: { x: 0, y: 0, z: 0 }, direction: { x: 1, y: 1, z: 1 }, id: 6 },
    { point: { x: 2, y: 1, z: 0 }, linePoint: { x: 1, y: 0, z: 1 }, direction: { x: 1, y: 2, z: -1 }, id: 7 },
    { point: { x: 0, y: 3, z: 2 }, linePoint: { x: 1, y: 1, z: 1 }, direction: { x: 2, y: 0, z: 1 }, id: 8 },
    { point: { x: -1, y: 1, z: 4 }, linePoint: { x: 0, y: 2, z: 1 }, direction: { x: 1, y: -1, z: 2 }, id: 9 },
    { point: { x: 3, y: 0, z: 1 }, linePoint: { x: 1, y: 1, z: 0 }, direction: { x: 2, y: 1, z: 3 }, id: 10 }
  ];

  point3DLineData.forEach(({ point, linePoint, direction, id }) => {
    const distance = pointToLine3DDistance(point, linePoint, direction);
    const parametric = calculate3DLineParametric(linePoint, direction);
    
    quests.push({
      id: `SPATIAL_RELATIONSHIPS_ADVANCED_${id}`,
      difficulty: "ADVANCED",
      stage: "SPATIAL_RELATIONSHIPS",
      distanceFrom: [point.x, point.y, point.z],
      distanceTo: {
        type: "line",
        equation: parametric
      },
      promptLatex: `Calculate the distance from point (${point.x}, ${point.y}, ${point.z}) to the line ${parametric}.`,
      expressionLatex: `d = \\frac{||\\vec{PL_0} \\times \\vec{d}||}{||\\vec{d}||}`,
      targetLatex: `d`,
      slots: [
        {
          id: "distance",
          labelLatex: "Distance:",
          placeholder: "Enter distance",
          expected: distance.toFixed(2),
          type: "number"
        }
      ],
      correctLatex: `d = ${distance.toFixed(2)}`,
      answer: distance.toFixed(2),
      visualizationData: {
        lines: [{
          type: "3D",
          point: linePoint,
          direction: direction,
          color: "blue"
        }],
        points: [
          { coordinates: [point.x, point.y, point.z], label: "P", color: "red" }
        ]
      }
    });
  });

  // Quest 11-15: Distance from point to plane
  const pointPlaneData = [
    { point: { x: 1, y: 2, z: 3 }, A: 2, B: -1, C: 2, D: -3, id: 11 },
    { point: { x: 0, y: 0, z: 5 }, A: 1, B: 1, C: 1, D: -6, id: 12 },
    { point: { x: 2, y: 1, z: 0 }, A: 3, B: 2, C: -1, D: 4, id: 13 },
    { point: { x: -1, y: 3, z: 2 }, A: 1, B: -2, C: 3, D: 5, id: 14 },
    { point: { x: 4, y: 0, z: 1 }, A: 2, B: 3, C: 1, D: -7, id: 15 }
  ];

  pointPlaneData.forEach(({ point, A, B, C, D, id }) => {
    const plane = { A, B, C, D, equation: `${A}x + ${B}y + ${C}z + ${D} = 0` };
    const distance = pointToPlaneDistance(point, plane);
    
    quests.push({
      id: `SPATIAL_RELATIONSHIPS_ADVANCED_${id}`,
      difficulty: "ADVANCED",
      stage: "SPATIAL_RELATIONSHIPS",
      distanceFrom: [point.x, point.y, point.z],
      distanceTo: {
        type: "plane",
        equation: plane.equation,
        coefficients: [A, B, C, D]
      },
      promptLatex: `Calculate the distance from point (${point.x}, ${point.y}, ${point.z}) to the plane ${plane.equation}.`,
      expressionLatex: `d = \\frac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^{2} + B^{2} + C^2}}`,
      targetLatex: `d`,
      slots: [
        {
          id: "distance",
          labelLatex: "Distance:",
          placeholder: "Enter distance",
          expected: distance.toFixed(2),
          type: "number"
        }
      ],
      correctLatex: `d = ${distance.toFixed(2)}`,
      answer: distance.toFixed(2),
      visualizationData: {
        planes: [{
          coefficients: [A, B, C, D],
          color: "green",
          opacity: 0.3
        }],
        points: [
          { coordinates: [point.x, point.y, point.z], label: "P", color: "red" }
        ]
      }
    });
  });

  // Quest 16-18: Distance between parallel lines
  const parallelLinesData = [
    { line1: { A: 2, B: 3, C: 5 }, line2: { A: 2, B: 3, C: 10 }, id: 16 },
    { line1: { A: 1, B: 1, C: -4 }, line2: { A: 1, B: 1, C: 2 }, id: 17 },
    { line1: { A: 3, B: -2, C: 7 }, line2: { A: 3, B: -2, C: -1 }, id: 18 }
  ];

  parallelLinesData.forEach(({ line1, line2, id }) => {
    const distance = parallelLinesDistance(line1, line2);
    const eq1 = `${line1.A}x + ${line1.B}y + ${line1.C} = 0`;
    const eq2 = `${line2.A}x + ${line2.B}y + ${line2.C} = 0`;
    
    quests.push({
      id: `SPATIAL_RELATIONSHIPS_ADVANCED_${id}`,
      difficulty: "ADVANCED",
      stage: "SPATIAL_RELATIONSHIPS",
      promptLatex: `Calculate the distance between parallel lines ${eq1} and ${eq2}.`,
      expressionLatex: `d = \\frac{|C_1 - C_2|}{\\sqrt{A^{2} + B^2}}`,
      targetLatex: `d`,
      slots: [
        {
          id: "distance",
          labelLatex: "Distance:",
          placeholder: "Enter distance",
          expected: distance.toFixed(2),
          type: "number"
        }
      ],
      correctLatex: `d = ${distance.toFixed(2)}`,
      answer: distance.toFixed(2),
      visualizationData: {
        lines: [
          {
            type: "2D",
            point: { x: 0, y: -line1.C / line1.B },
            direction: { x: 1, y: -line1.A / line1.B },
            color: "blue"
          },
          {
            type: "2D",
            point: { x: 0, y: -line2.C / line2.B },
            direction: { x: 1, y: -line2.A / line2.B },
            color: "green"
          }
        ]
      }
    });
  });

  // Quest 19-20: Distance between parallel planes
  const parallelPlanesData = [
    { plane1: { A: 1, B: 1, C: 1, D: -3 }, plane2: { A: 1, B: 1, C: 1, D: -6 }, id: 19 },
    { plane1: { A: 2, B: -1, C: 2, D: 4 }, plane2: { A: 2, B: -1, C: 2, D: -2 }, id: 20 }
  ];

  parallelPlanesData.forEach(({ plane1, plane2, id }) => {
    const p1 = { ...plane1, equation: `${plane1.A}x + ${plane1.B}y + ${plane1.C}z + ${plane1.D} = 0` };
    const p2 = { ...plane2, equation: `${plane2.A}x + ${plane2.B}y + ${plane2.C}z + ${plane2.D} = 0` };
    const distance = parallelPlanesDistance(p1, p2);
    
    quests.push({
      id: `SPATIAL_RELATIONSHIPS_ADVANCED_${id}`,
      difficulty: "ADVANCED",
      stage: "SPATIAL_RELATIONSHIPS",
      promptLatex: `Calculate the distance between parallel planes ${p1.equation} and ${p2.equation}.`,
      expressionLatex: `d = \\frac{|D_1 - D_2|}{\\sqrt{A^{2} + B^{2} + C^2}}`,
      targetLatex: `d`,
      slots: [
        {
          id: "distance",
          labelLatex: "Distance:",
          placeholder: "Enter distance",
          expected: distance.toFixed(2),
          type: "number"
        }
      ],
      correctLatex: `d = ${distance.toFixed(2)}`,
      answer: distance.toFixed(2),
      visualizationData: {
        planes: [
          {
            coefficients: [plane1.A, plane1.B, plane1.C, plane1.D],
            color: "green",
            opacity: 0.3
          },
          {
            coefficients: [plane2.A, plane2.B, plane2.C, plane2.D],
            color: "blue",
            opacity: 0.3
          }
        ]
      }
    });
  });

  return quests;
}

// ============================================================================
// SPATIAL RELATIONSHIPS STAGE - ELITE (10 quests)
// ============================================================================

export function generateSpatialRelationshipsEliteQuests(): GM202Quest[] {
  const quests: GM202Quest[] = [];

  // Quest 1-3: Determine line-line relationship in 3D
  const lineLine3DData = [
    {
      line1: { point: { x: 0, y: 0, z: 0 }, direction: { x: 1, y: 2, z: 3 } },
      line2: { point: { x: 1, y: 1, z: 1 }, direction: { x: 2, y: 4, z: 6 } },
      id: 1
    },
    {
      line1: { point: { x: 1, y: 0, z: 0 }, direction: { x: 1, y: 1, z: 0 } },
      line2: { point: { x: 0, y: 1, z: 0 }, direction: { x: -1, y: 1, z: 0 } },
      id: 2
    },
    {
      line1: { point: { x: 0, y: 0, z: 0 }, direction: { x: 1, y: 0, z: 0 } },
      line2: { point: { x: 0, y: 1, z: 0 }, direction: { x: 0, y: 1, z: 0 } },
      id: 3
    }
  ];

  lineLine3DData.forEach(({ line1, line2, id }) => {
    const relationship = classifyLineLine3D(line1, line2);
    const param1 = calculate3DLineParametric(line1.point, line1.direction);
    const param2 = calculate3DLineParametric(line2.point, line2.direction);
    
    quests.push({
      id: `SPATIAL_RELATIONSHIPS_ELITE_${id}`,
      difficulty: "ELITE",
      stage: "SPATIAL_RELATIONSHIPS",
      promptLatex: `Determine the relationship between lines L1: ${param1} and L2: ${param2}.`,
      expressionLatex: `\\text{parallel, perpendicular, intersecting, or skew}`,
      targetLatex: `\\text{relationship}`,
      slots: [
        {
          id: "relationship",
          labelLatex: "Relationship:",
          placeholder: "parallel, perpendicular, intersecting, or skew",
          expected: relationship,
          type: "expression"
        }
      ],
      correctLatex: relationship,
      answer: relationship,
      visualizationData: {
        lines: [
          {
            type: "3D",
            point: line1.point,
            direction: line1.direction,
            color: "blue"
          },
          {
            type: "3D",
            point: line2.point,
            direction: line2.direction,
            color: "green"
          }
        ]
      }
    });
  });

  // Quest 4-6: Determine line-plane relationship
  const linePlaneData = [
    {
      line: { point: { x: 1, y: 0, z: 0 }, direction: { x: 1, y: 1, z: 0 } },
      plane: { A: 1, B: 1, C: 0, D: -5, equation: "x + y - 5 = 0" },
      id: 4
    },
    {
      line: { point: { x: 0, y: 0, z: 0 }, direction: { x: 1, y: 0, z: 0 } },
      plane: { A: 1, B: 0, C: 0, D: -3, equation: "x - 3 = 0" },
      id: 5
    },
    {
      line: { point: { x: 1, y: 1, z: 1 }, direction: { x: 2, y: 1, z: 3 } },
      plane: { A: 1, B: 2, C: -1, D: 4, equation: "x + 2y - z + 4 = 0" },
      id: 6
    }
  ];

  linePlaneData.forEach(({ line, plane, id }) => {
    const relationship = classifyLinePlane(line, plane);
    const parametric = calculate3DLineParametric(line.point, line.direction);
    const planeEq = `${plane.A}x + ${plane.B}y + ${plane.C}z + ${plane.D} = 0`;
    
    quests.push({
      id: `SPATIAL_RELATIONSHIPS_ELITE_${id}`,
      difficulty: "ELITE",
      stage: "SPATIAL_RELATIONSHIPS",
      promptLatex: `Determine the relationship between line ${parametric} and plane ${planeEq}.`,
      expressionLatex: `\\text{parallel, perpendicular, or intersecting}`,
      targetLatex: `\\text{relationship}`,
      slots: [
        {
          id: "relationship",
          labelLatex: "Relationship:",
          placeholder: "parallel, perpendicular, or intersecting",
          expected: relationship,
          type: "expression"
        }
      ],
      correctLatex: relationship,
      answer: relationship,
      visualizationData: {
        lines: [{
          type: "3D",
          point: line.point,
          direction: line.direction,
          color: "blue"
        }],
        planes: [{
          coefficients: [plane.A, plane.B, plane.C, plane.D],
          color: "green",
          opacity: 0.3
        }]
      }
    });
  });

  // Quest 7-8: Find intersection of line and plane
  const lineIntersectionData = [
    {
      line: { point: { x: 0, y: 0, z: 0 }, direction: { x: 1, y: 2, z: 3 } },
      plane: { A: 1, B: 1, C: 1, D: -6 },
      id: 7
    },
    {
      line: { point: { x: 1, y: 1, z: 0 }, direction: { x: 2, y: -1, z: 1 } },
      plane: { A: 2, B: 3, C: 1, D: -10 },
      id: 8
    }
  ];

  lineIntersectionData.forEach(({ line, plane, id }) => {
    const planeObj = { ...plane, equation: `${plane.A}x + ${plane.B}y + ${plane.C}z + ${plane.D} = 0` };
    const intersection = calculateLinePlaneIntersection(line, planeObj);
    const parametric = calculate3DLineParametric(line.point, line.direction);
    const answer = intersection ? `(${intersection.x.toFixed(1)}, ${intersection.y.toFixed(1)}, ${intersection.z.toFixed(1)})` : "no intersection";
    
    quests.push({
      id: `SPATIAL_RELATIONSHIPS_ELITE_${id}`,
      difficulty: "ELITE",
      stage: "SPATIAL_RELATIONSHIPS",
      promptLatex: `Find the intersection point of line ${parametric} and plane ${planeObj.equation}.`,
      expressionLatex: `\\vec{r} = \\vec{r}_0 + t\\vec{d}`,
      targetLatex: `(x, y, z)`,
      slots: [
        {
          id: "intersection",
          labelLatex: "Intersection point:",
          placeholder: "(x, y, z)",
          expected: answer,
          type: "expression"
        }
      ],
      correctLatex: answer,
      answer: answer,
      visualizationData: {
        lines: [{
          type: "3D",
          point: line.point,
          direction: line.direction,
          color: "blue"
        }],
        planes: [{
          coefficients: [plane.A, plane.B, plane.C, plane.D],
          color: "green",
          opacity: 0.3
        }],
        points: intersection ? [
          { coordinates: [intersection.x, intersection.y, intersection.z], label: "Intersection", color: "red" }
        ] : []
      }
    });
  });

  // Quest 9-10: Determine plane-plane relationship
  const planePlaneData = [
    {
      plane1: { A: 1, B: 2, C: 3, D: -4 },
      plane2: { A: 2, B: 4, C: 6, D: -8 },
      id: 9
    },
    {
      plane1: { A: 1, B: 1, C: 0, D: -3 },
      plane2: { A: 1, B: -1, C: 0, D: 2 },
      id: 10
    }
  ];

  planePlaneData.forEach(({ plane1, plane2, id }) => {
    const p1 = { ...plane1, equation: `${plane1.A}x + ${plane1.B}y + ${plane1.C}z + ${plane1.D} = 0` };
    const p2 = { ...plane2, equation: `${plane2.A}x + ${plane2.B}y + ${plane2.C}z + ${plane2.D} = 0` };
    const relationship = classifyPlanePlane(p1, p2);
    
    quests.push({
      id: `SPATIAL_RELATIONSHIPS_ELITE_${id}`,
      difficulty: "ELITE",
      stage: "SPATIAL_RELATIONSHIPS",
      promptLatex: `Determine the relationship between planes ${p1.equation} and ${p2.equation}.`,
      expressionLatex: `\\text{parallel, perpendicular, or intersecting}`,
      targetLatex: `\\text{relationship}`,
      slots: [
        {
          id: "relationship",
          labelLatex: "Relationship:",
          placeholder: "parallel, perpendicular, or intersecting",
          expected: relationship,
          type: "expression"
        }
      ],
      correctLatex: relationship,
      answer: relationship,
      visualizationData: {
        planes: [
          {
            coefficients: [plane1.A, plane1.B, plane1.C, plane1.D],
            color: "green",
            opacity: 0.3
          },
          {
            coefficients: [plane2.A, plane2.B, plane2.C, plane2.D],
            color: "blue",
            opacity: 0.3
          }
        ]
      }
    });
  });

  return quests;
}

// ============================================================================
// QUEST POOL BUILDER
// ============================================================================

export function getAllQuests(): GM202Quest[] {
  return [
    ...generateLineEquationsBasicQuests(),
    ...generatePlaneGeometryCoreQuests(),
    ...generateSpatialRelationshipsAdvancedQuests(),
    ...generateSpatialRelationshipsEliteQuests()
  ];
}
