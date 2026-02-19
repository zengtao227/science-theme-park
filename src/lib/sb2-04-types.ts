/**
 * SB2.04 Human Physiology Module - Type Definitions
 * 
 * Defines core types for the Human Physiology educational module
 * covering Digestive, Respiratory, Circulatory, and Excretory systems.
 */

import { Quest, Difficulty } from "@/hooks/useQuestManager";

/**
 * Body system stages in the module
 */
export type Stage = 
  | "DIGESTIVE_SYSTEM" 
  | "RESPIRATORY_SYSTEM" 
  | "CIRCULATORY_SYSTEM" 
  | "EXCRETORY_SYSTEM";

/**
 * Question types by difficulty level
 */
export type QuestionType = 
  | "identification"  // BASIC: Structure identification
  | "process"         // CORE: Physiological process analysis
  | "coordination"    // ADVANCED: System coordination and disease
  | "comprehensive";  // ELITE: Comprehensive problems

/**
 * Quest interface for SB2.04 module
 */
export interface SB204Quest extends Quest {
  id: string;
  difficulty: Difficulty;
  stage: Stage;
  questionType: QuestionType;
  organ?: string;
  process?: string;
  baselScenario?: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

/**
 * Props for PhysiologyVisualization component
 */
export interface PhysiologyVisualizationProps {
  quest: SB204Quest;
  stage: Stage;
  translations: {
    digestive_system: string;
    respiratory_system: string;
    circulatory_system: string;
    excretory_system: string;
    [key: string]: string;
  };
}
