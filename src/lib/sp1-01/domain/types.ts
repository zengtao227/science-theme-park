/**
 * SP1.01 - Forces Basics Module
 * Core type definitions for force physics domain
 */

// ============================================================================
// Vector and Force Types
// ============================================================================

/**
 * Vector representation in Cartesian coordinates
 */
export interface CartesianVector {
  x: number;
  y: number;
}

/**
 * Vector representation in polar coordinates
 * Angle is measured counterclockwise from positive x-axis in degrees
 */
export interface PolarVector {
  magnitude: number;
  angle: number; // Degrees
}

/**
 * Generic vector with both representations
 */
export interface Vector {
  magnitude: number;
  angle: number; // Degrees from positive x-axis
  components?: CartesianVector;
}

/**
 * Force with all three elements: magnitude, direction, point of application
 */
export interface Force extends Vector {
  pointOfApplication?: { x: number; y: number };
  label?: string;
  units?: string;
}

/**
 * Complete force representation with all properties
 */
export interface CompleteForce {
  magnitude: number;
  direction: number; // Angle in degrees
  pointOfApplication: { x: number; y: number };
  label: string;
  units: string;
}

// ============================================================================
// Unit Types
// ============================================================================

export type ForceUnit = 'N' | 'kN' | 'MN';

export const FORCE_UNIT_CONVERSIONS: Record<ForceUnit, number> = {
  N: 1,
  kN: 1000,
  MN: 1000000,
};

// ============================================================================
// Equilibrium Analysis Types
// ============================================================================

/**
 * Result of equilibrium analysis
 */
export interface EquilibriumAnalysis {
  isInEquilibrium: boolean;
  netForce: Vector;
  netForceMagnitude: number;
  sumOfXComponents: number;
  sumOfYComponents: number;
  tolerance: number;
}

// ============================================================================
// Quest System Types
// ============================================================================

export enum Stage {
  FORCE_CONCEPTS = 'FORCE_CONCEPTS',
  FORCE_COMPOSITION = 'FORCE_COMPOSITION',
  FORCE_EQUILIBRIUM = 'FORCE_EQUILIBRIUM',
}

export enum Difficulty {
  BASIC = 'BASIC',
  CORE = 'CORE',
  ADVANCED = 'ADVANCED',
  ELITE = 'ELITE',
}

export enum QuestType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  NUMERICAL = 'NUMERICAL',
  VECTOR = 'VECTOR',
  INTERACTIVE = 'INTERACTIVE',
}

export enum VisualizationType {
  FORCE_VECTOR = 'force_vector',
  FORCE_COMPOSITION = 'force_composition',
  EQUILIBRIUM_ANALYZER = 'equilibrium_analyzer',
}

// ============================================================================
// Multi-Language Content
// ============================================================================

export interface MultiLangContent {
  en: string;
  cn: string;
  de: string;
}

// ============================================================================
// Basel Scenario Types
// ============================================================================

export interface BaselScenario {
  title: MultiLangContent;
  description: MultiLangContent; // 150-250 words
  imageUrl?: string;
  location: string;
}

// ============================================================================
// Validation Types
// ============================================================================

export type ValidationType = 'exact' | 'tolerance' | 'vector' | 'equilibrium';

export interface VectorTolerance {
  magnitude: number; // Percentage (e.g., 0.01 for 1%)
  angle: number; // Degrees
}

export interface ValidationConfig {
  type: ValidationType;
  correctAnswer: Answer;
  tolerance?: number; // Percentage (e.g., 0.01 for 1%)
  units?: string;
  vectorTolerance?: VectorTolerance;
}

export interface Answer {
  value: number | number[] | Vector;
  units?: string;
}

export interface ValidationResult {
  isCorrect: boolean;
  feedback: MultiLangContent;
  correctAnswer?: Answer; // Shown only if incorrect
  explanation?: MultiLangContent;
}

export interface FeedbackConfig {
  correct: MultiLangContent;
  incorrect: MultiLangContent;
  explanation?: MultiLangContent;
}

// ============================================================================
// Quest Content Types
// ============================================================================

export interface Quest {
  id: string; // e.g., "SP1.01.001"
  stage: Stage;
  difficulty: Difficulty;
  type: QuestType;
  content: MultiLangContent;
  scenario?: BaselScenario;
  visualization?: VisualizationType;
  validation: ValidationConfig;
  feedback: FeedbackConfig;
  prerequisites: string[]; // Quest IDs that must be completed first
}

// ============================================================================
// Progress Tracking Types
// ============================================================================

export interface QuestCompletion {
  questId: string;
  completedAt: Date;
  attempts: number;
  lastAnswer: Answer;
  wasCorrect: boolean;
}

export interface StageProgress {
  stage: Stage;
  totalQuests: number;
  completedQuests: number;
  unlockedQuests: number;
}

export interface DifficultyProgress {
  difficulty: Difficulty;
  totalQuests: number;
  completedQuests: number;
}

export interface UserProgress {
  userId?: string;
  lastAccessedQuest: string;
  completedQuests: Set<string>;
  stageProgress: Map<Stage, StageProgress>;
  difficultyProgress: Map<Difficulty, DifficultyProgress>;
  languagePreference: 'en' | 'cn' | 'de';
  questHistory: QuestCompletion[];
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// Visualization Types
// ============================================================================

export interface VisualizationConfig {
  type: VisualizationType;
  width: number;
  height: number;
  interactive: boolean;
  showGrid: boolean;
  showComponents: boolean;
  maxForces?: number;
}

export interface VisualizationData {
  forces: Force[];
  resultant?: Force;
  isEquilibrium?: boolean;
}

export interface VisualizationState {
  forces: Force[];
  resultant?: Force;
  isEquilibrium?: boolean;
  scale: number;
  offset: { x: number; y: number };
}
