import type { Difficulty, Quest } from "@/hooks/useQuestManager";

export type Stage = "LEVERS" | "PULLEYS" | "INCLINED_PLANES";

export interface SP305Quest extends Quest {
  difficulty: Difficulty;
  stage: Stage;
  machineType?: "lever" | "pulley" | "inclined_plane";
  effort?: number;
  load?: number;
  effortArm?: number;
  loadArm?: number;
  leverClass?: number;
  efficiency?: number;
  stagesCount?: number;
  strands?: number;
  movable?: number;
  fixed?: number;
  blocks?: number;
  height?: number;
  length?: number;
  angle?: number;
  friction?: number;
  pitch?: number;
  radius?: number;
}
