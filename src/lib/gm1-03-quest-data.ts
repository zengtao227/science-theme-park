/**
 * GM1.03 - Limits & Continuity Module
 * Quest data pools for all stages and difficulty levels
 */

import { LimitBasicsData, LimitOperationsData, ContinuityData } from "./gm1-03-types";

// ============================================================================
// LIMIT_BASICS STAGE DATA
// ============================================================================

// BASIC: Simple polynomial limits, direct substitution
export const limitBasicsDataBasic: LimitBasicsData[] = [
  {
    id: "LB_B1",
    functionExpr: "x + 2",
    limitPoint: 3,
    limitValue: 5,
    type: "direct",
  },
  {
    id: "LB_B2",
    functionExpr: "2x - 1",
    limitPoint: 2,
    limitValue: 3,
    type: "direct",
  },
  {
    id: "LB_B3",
    functionExpr: "x^{2}",
    limitPoint: 2,
    limitValue: 4,
    type: "direct",
  },
  {
    id: "LB_B4",
    functionExpr: "3x + 5",
    limitPoint: 1,
    limitValue: 8,
    type: "direct",
  },
  {
    id: "LB_B5",
    functionExpr: "x^{2} + 1",
    limitPoint: 1,
    limitValue: 2,
    type: "direct",
  },
];

// CORE: Rational functions, factoring required
export const limitBasicsDataCore: LimitBasicsData[] = [
  {
    id: "LB_C1",
    functionExpr: "(x^{2} - 4) / (x - 2)",
    limitPoint: 2,
    limitValue: 4,
    type: "indeterminate",
  },
  {
    id: "LB_C2",
    functionExpr: "(x^{2} - 9) / (x - 3)",
    limitPoint: 3,
    limitValue: 6,
    type: "indeterminate",
  },
  {
    id: "LB_C3",
    functionExpr: "(x^{2} - 1) / (x - 1)",
    limitPoint: 1,
    limitValue: 2,
    type: "indeterminate",
  },
  {
    id: "LB_C4",
    functionExpr: "(x^{2} + 3x + 2) / (x + 1)",
    limitPoint: -1,
    limitValue: 1,
    type: "indeterminate",
  },
  {
    id: "LB_C5",
    functionExpr: "(x^{2} - 16) / (x - 4)",
    limitPoint: 4,
    limitValue: 8,
    type: "indeterminate",
  },
];

// ADVANCED: Limits at infinity, horizontal asymptotes
export const limitBasicsDataAdvanced: LimitBasicsData[] = [
  {
    id: "LB_A1",
    functionExpr: "(3x^{2} + 2x) / (x^{2} - 1)",
    limitPoint: Infinity,
    limitValue: 3,
    type: "infinity",
  },
  {
    id: "LB_A2",
    functionExpr: "(2x^{2} - 5) / (x^{2} + 3)",
    limitPoint: Infinity,
    limitValue: 2,
    type: "infinity",
  },
  {
    id: "LB_A3",
    functionExpr: "(x^{2} + 4x) / (2x^{2} - 1)",
    limitPoint: Infinity,
    limitValue: 0.5,
    type: "infinity",
  },
  {
    id: "LB_A4",
    functionExpr: "(4x^{2} + x) / (x^{2} + 2)",
    limitPoint: Infinity,
    limitValue: 4,
    type: "infinity",
  },
  {
    id: "LB_A5",
    functionExpr: "(x^{2} - 3x) / (3x^{2} + 1)",
    limitPoint: Infinity,
    limitValue: 0.33,
    type: "infinity",
  },
];

// ELITE: ε-δ definition, one-sided limits
export const limitBasicsDataElite: LimitBasicsData[] = [
  {
    id: "LB_E1",
    functionExpr: "sqrt(x - 1)",
    limitPoint: 1,
    leftLimit: "DNE",
    rightLimit: 0,
    limitValue: 0,
    type: "one-sided",
  },
  {
    id: "LB_E2",
    functionExpr: "sqrt(x)",
    limitPoint: 0,
    leftLimit: "DNE",
    rightLimit: 0,
    limitValue: 0,
    type: "one-sided",
  },
  {
    id: "LB_E3",
    functionExpr: "1 / x",
    limitPoint: 0,
    leftLimit: -Infinity,
    rightLimit: Infinity,
    limitValue: "DNE",
    type: "one-sided",
  },
  {
    id: "LB_E4",
    functionExpr: "abs(x) / x",
    limitPoint: 0,
    leftLimit: -1,
    rightLimit: 1,
    limitValue: "DNE",
    type: "one-sided",
  },
  {
    id: "LB_E5",
    functionExpr: "sqrt(4 - x)",
    limitPoint: 4,
    leftLimit: 0,
    rightLimit: "DNE",
    limitValue: 0,
    type: "one-sided",
  },
];

// ============================================================================
// LIMIT_OPERATIONS STAGE DATA
// ============================================================================

// BASIC: Sum and difference of limits
export const limitOperationsDataBasic: LimitOperationsData[] = [
  {
    id: "LO_B1",
    f: "x + 1",
    g: "2x - 3",
    limitPoint: 2,
    operation: "sum",
    answer: 6,
  },
  {
    id: "LO_B2",
    f: "x^{2}",
    g: "x",
    limitPoint: 1,
    operation: "sum",
    answer: 2,
  },
  {
    id: "LO_B3",
    f: "2x",
    g: "3",
    limitPoint: 2,
    operation: "sum",
    answer: 7,
  },
  {
    id: "LO_B4",
    f: "x + 2",
    g: "x - 1",
    limitPoint: 1,
    operation: "sum",
    answer: 3,
  },
  {
    id: "LO_B5",
    f: "3x",
    g: "2x + 1",
    limitPoint: 1,
    operation: "sum",
    answer: 6,
  },
];

// CORE: Product and quotient of limits
export const limitOperationsDataCore: LimitOperationsData[] = [
  {
    id: "LO_C1",
    f: "x^{2}",
    g: "x + 1",
    limitPoint: 2,
    operation: "product",
    answer: 12,
  },
  {
    id: "LO_C2",
    f: "x + 3",
    g: "x - 1",
    limitPoint: 2,
    operation: "product",
    answer: 5,
  },
  {
    id: "LO_C3",
    f: "x^{2} + 1",
    g: "x",
    limitPoint: 2,
    operation: "quotient",
    answer: 2.5,
  },
  {
    id: "LO_C4",
    f: "2x",
    g: "x + 1",
    limitPoint: 1,
    operation: "product",
    answer: 4,
  },
  {
    id: "LO_C5",
    f: "x^{2} - 1",
    g: "x - 1",
    limitPoint: 2,
    operation: "quotient",
    answer: 3,
  },
];

// ADVANCED: Composition of limits
export const limitOperationsDataAdvanced: LimitOperationsData[] = [
  {
    id: "LO_A1",
    f: "x^{2} + 1",
    g: "sqrt(x)",
    limitPoint: 4,
    operation: "composition",
    answer: 5,
  },
  {
    id: "LO_A2",
    f: "x + 2",
    g: "x^{2}",
    limitPoint: 2,
    operation: "composition",
    answer: 6,
  },
  {
    id: "LO_A3",
    f: "2x",
    g: "x + 1",
    limitPoint: 1,
    operation: "composition",
    answer: 4,
  },
  {
    id: "LO_A4",
    f: "x^{2}",
    g: "x - 1",
    limitPoint: 3,
    operation: "composition",
    answer: 4,
  },
  {
    id: "LO_A5",
    f: "x + 3",
    g: "2x",
    limitPoint: 2,
    operation: "composition",
    answer: 7,
  },
];

// ELITE: L'Hôpital's rule applications
export const limitOperationsDataElite: LimitOperationsData[] = [
  {
    id: "LO_E1",
    f: "sin(x) / x",
    g: "",
    limitPoint: 0,
    operation: "quotient",
    answer: 1,
    method: "lhopital",
  },
  {
    id: "LO_E2",
    f: "(e^x - 1) / x",
    g: "",
    limitPoint: 0,
    operation: "quotient",
    answer: 1,
    method: "lhopital",
  },
  {
    id: "LO_E3",
    f: "(x^{2} - 1) / (x - 1)",
    g: "",
    limitPoint: 1,
    operation: "quotient",
    answer: 2,
    method: "lhopital",
  },
  {
    id: "LO_E4",
    f: "(1 - cos(x)) / x^{2}",
    g: "",
    limitPoint: 0,
    operation: "quotient",
    answer: 0.5,
    method: "lhopital",
  },
  {
    id: "LO_E5",
    f: "ln(x) / (x - 1)",
    g: "",
    limitPoint: 1,
    operation: "quotient",
    answer: 1,
    method: "lhopital",
  },
];

// ============================================================================
// CONTINUITY STAGE DATA
// ============================================================================

// BASIC: Continuous functions, direct evaluation
export const continuityDataBasic: ContinuityData[] = [
  {
    id: "C_B1",
    functionExpr: "x^{2} + 3x - 2",
    point: 2,
    isContinuous: true,
    discontinuityType: null,
    functionValue: 8,
  },
  {
    id: "C_B2",
    functionExpr: "2x + 1",
    point: 1,
    isContinuous: true,
    discontinuityType: null,
    functionValue: 3,
  },
  {
    id: "C_B3",
    functionExpr: "x^{2}",
    point: 3,
    isContinuous: true,
    discontinuityType: null,
    functionValue: 9,
  },
  {
    id: "C_B4",
    functionExpr: "3x - 5",
    point: 2,
    isContinuous: true,
    discontinuityType: null,
    functionValue: 1,
  },
  {
    id: "C_B5",
    functionExpr: "x^{2} + 2x",
    point: 1,
    isContinuous: true,
    discontinuityType: null,
    functionValue: 3,
  },
];

// CORE: Removable discontinuities
export const continuityDataCore: ContinuityData[] = [
  {
    id: "C_C1",
    functionExpr: "(x^{2} - 1) / (x - 1)",
    point: 1,
    isContinuous: false,
    discontinuityType: "removable",
    leftLimit: 2,
    rightLimit: 2,
    limitValue: 2,
    functionValue: "undefined",
  },
  {
    id: "C_C2",
    functionExpr: "(x^{2} - 4) / (x - 2)",
    point: 2,
    isContinuous: false,
    discontinuityType: "removable",
    leftLimit: 4,
    rightLimit: 4,
    limitValue: 4,
    functionValue: "undefined",
  },
  {
    id: "C_C3",
    functionExpr: "(x^{2} - 9) / (x - 3)",
    point: 3,
    isContinuous: false,
    discontinuityType: "removable",
    leftLimit: 6,
    rightLimit: 6,
    limitValue: 6,
    functionValue: "undefined",
  },
  {
    id: "C_C4",
    functionExpr: "(x^{2} + 2x) / x",
    point: 0,
    isContinuous: false,
    discontinuityType: "removable",
    leftLimit: 2,
    rightLimit: 2,
    limitValue: 2,
    functionValue: "undefined",
  },
  {
    id: "C_C5",
    functionExpr: "(x^{2} - 16) / (x - 4)",
    point: 4,
    isContinuous: false,
    discontinuityType: "removable",
    leftLimit: 8,
    rightLimit: 8,
    limitValue: 8,
    functionValue: "undefined",
  },
];

// ADVANCED: Jump discontinuities
export const continuityDataAdvanced: ContinuityData[] = [
  {
    id: "C_A1",
    functionExpr: "floor(x)",
    point: 2,
    isContinuous: false,
    discontinuityType: "jump",
    leftLimit: 1,
    rightLimit: 2,
    limitValue: "DNE",
  },
  {
    id: "C_A2",
    functionExpr: "floor(x)",
    point: 1,
    isContinuous: false,
    discontinuityType: "jump",
    leftLimit: 0,
    rightLimit: 1,
    limitValue: "DNE",
  },
  {
    id: "C_A3",
    functionExpr: "abs(x) / x",
    point: 0,
    isContinuous: false,
    discontinuityType: "jump",
    leftLimit: -1,
    rightLimit: 1,
    limitValue: "DNE",
  },
  {
    id: "C_A4",
    functionExpr: "floor(x)",
    point: 3,
    isContinuous: false,
    discontinuityType: "jump",
    leftLimit: 2,
    rightLimit: 3,
    limitValue: "DNE",
  },
  {
    id: "C_A5",
    functionExpr: "sign(x)",
    point: 0,
    isContinuous: false,
    discontinuityType: "jump",
    leftLimit: -1,
    rightLimit: 1,
    limitValue: "DNE",
  },
];

// ELITE: Infinite discontinuities
export const continuityDataElite: ContinuityData[] = [
  {
    id: "C_E1",
    functionExpr: "1 / (x - 3)",
    point: 3,
    isContinuous: false,
    discontinuityType: "infinite",
    leftLimit: -Infinity,
    rightLimit: Infinity,
    limitValue: "DNE",
  },
  {
    id: "C_E2",
    functionExpr: "1 / x",
    point: 0,
    isContinuous: false,
    discontinuityType: "infinite",
    leftLimit: -Infinity,
    rightLimit: Infinity,
    limitValue: "DNE",
  },
  {
    id: "C_E3",
    functionExpr: "1 / (x - 2)^{2}",
    point: 2,
    isContinuous: false,
    discontinuityType: "infinite",
    leftLimit: Infinity,
    rightLimit: Infinity,
    limitValue: "DNE",
  },
  {
    id: "C_E4",
    functionExpr: "1 / (x + 1)",
    point: -1,
    isContinuous: false,
    discontinuityType: "infinite",
    leftLimit: -Infinity,
    rightLimit: Infinity,
    limitValue: "DNE",
  },
  {
    id: "C_E5",
    functionExpr: "tan(x)",
    point: Math.PI / 2,
    isContinuous: false,
    discontinuityType: "infinite",
    leftLimit: Infinity,
    rightLimit: -Infinity,
    limitValue: "DNE",
  },
];
