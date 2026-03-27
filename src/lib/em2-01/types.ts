import type { Quest } from "@/hooks/useQuestManager";

export type Stage = "BASIC_TRANSFORMS" | "DETERMINANT" | "COMPOSITION";

export interface MatrixQuest extends Quest {
  stage: Stage;
  type: "identify" | "calculate_det" | "calculate_matrix" | "predict";
  matrix?: number[][];
  matrixA?: number[][];
  matrixB?: number[][];
  question: string;
  options?: string[];
  answer: string | number;
  explanation: string;
}
