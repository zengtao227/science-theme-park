/**
 * GM1.03 - Limits & Continuity Module
 * Type definitions for quest data structures
 */

import { Quest, Difficulty } from "@/hooks/useQuestManager";

export type Stage = "LIMIT_BASICS" | "LIMIT_OPERATIONS" | "CONTINUITY";

export type DiscontinuityType = "removable" | "jump" | "infinite" | null;

export interface GM103Quest extends Quest {
  stage: Stage;
  functionExpr: string;          // Function expression (e.g., "x^{2} + 3x - 2")
  limitPoint: number;            // x-value where limit is evaluated
  limitValue?: number | string;  // Expected limit value ("DNE" for does not exist)
  leftLimit?: number | string;   // Left-hand limit
  rightLimit?: number | string;  // Right-hand limit
  isContinuous?: boolean;        // Whether function is continuous at point
  discontinuityType?: DiscontinuityType;
}

// Quest data structure for LIMIT_BASICS stage
export interface LimitBasicsData {
  id: string;
  functionExpr: string;
  limitPoint: number;
  limitValue: number | string;
  type: "direct" | "indeterminate" | "infinity" | "one-sided";
  leftLimit?: number | string;
  rightLimit?: number | string;
}

// Quest data structure for LIMIT_OPERATIONS stage
export interface LimitOperationsData {
  id: string;
  f: string;
  g: string;
  limitPoint: number;
  operation: "sum" | "product" | "quotient" | "composition";
  answer: number | string;
  method?: "lhopital";
}

// Quest data structure for CONTINUITY stage
export interface ContinuityData {
  id: string;
  functionExpr: string;
  point: number;
  isContinuous: boolean;
  discontinuityType: DiscontinuityType;
  leftLimit?: number | string;
  rightLimit?: number | string;
  limitValue?: number | string;
  functionValue?: number | string;
}
