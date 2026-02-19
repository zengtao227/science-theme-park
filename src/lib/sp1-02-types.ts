/**
 * SP1.02 Newton's Laws Module - Type Definitions
 */

export type Stage = "FIRST_LAW" | "SECOND_LAW" | "THIRD_LAW";
export type Difficulty = "BASIC" | "CORE" | "ADVANCED" | "ELITE";

export interface SP102Quest {
  id: string;
  difficulty: Difficulty;
  stage: Stage;
  promptLatex: string;
  expressionLatex: string;
  targetLatex: string;
  slots: Array<{
    id: string;
    labelLatex: string;
    placeholder: string;
    expected: string;
  }>;
  correctLatex: string;
  answer: string;
  relatedLaw: "FIRST" | "SECOND" | "THIRD";
}

export interface BaselScenario {
  id: string;
  stage: Stage;
  title: {
    en: string;
    cn: string;
    de: string;
  };
  description: {
    en: string;
    cn: string;
    de: string;
  };
  location: string;
  relatedQuests: string[];
}

export interface ModuleData {
  code: string;
  lehrplanAlignment: string;
  targetAudience: string;
  totalQuests: number;
  stages: Stage[];
  baselScenarios: BaselScenario[];
}
