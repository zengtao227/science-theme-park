/**
 * GP2.03 Gas Laws Module - Core Type Definitions
 * 
 * This module teaches fundamental gas laws including Boyle's Law, Charles's Law,
 * Avogadro's Law, and the ideal gas equation (PV=nRT), with applications to
 * gas mixtures and partial pressures.
 */

// ============================================================================
// Language and Localization Types
// ============================================================================

export type Language = "en" | "cn" | "de";

export type LocalizedString = {
  en: string;
  cn: string;
  de: string;
};

// ============================================================================
// Stage and Difficulty Types
// ============================================================================

export type StageId = "BASIC_GAS_LAWS" | "IDEAL_GAS_EQUATION" | "GAS_MIXTURES";

export type Difficulty = "BASIC" | "CORE" | "ADVANCED" | "ELITE";

// ============================================================================
// Quest System Types
// ============================================================================

export interface Quest {
  id: string;
  stageId: StageId;
  difficulty: Difficulty;
  title: LocalizedString;
  description: LocalizedString;
  problem: LocalizedString;
  solution: QuestSolution;
  hints: LocalizedString[];
  requiredQuests: string[]; // Prerequisites
}

export type QuestSolutionType = "numerical" | "multiple-choice" | "expression";

export interface QuestSolution {
  type: QuestSolutionType;
  correctAnswer: number | string | string[];
  unit?: string;
  tolerance?: number; // For numerical answers (default 0.02)
  explanation: LocalizedString;
}

export interface ValidationResult {
  isCorrect: boolean;
  feedback: LocalizedString;
  correctAnswer?: number | string;
  relativeError?: number;
}

export interface QuestProgressMap {
  [questId: string]: {
    completed: boolean;
    attempts: number;
    lastAttemptTime: number;
  };
}

// ============================================================================
// Stage Types
// ============================================================================

export interface Stage {
  id: StageId;
  name: LocalizedString;
  description: LocalizedString;
  scenarios: Scenario[];
  concepts: Concept[];
  quests: Quest[];
}

export interface StageProgress {
  totalQuests: number;
  completedQuests: number;
  completionPercentage: number;
  isUnlocked: boolean;
}

// ============================================================================
// Content Types
// ============================================================================

export interface Scenario {
  id: string;
  title: LocalizedString;
  description: LocalizedString; // 150-250 words
  location?: BaselLocation;
  imageUrl?: string;
  relatedConcepts: string[];
}

export interface BaselLocation {
  name: LocalizedString;
  coordinates?: { lat: number; lng: number };
  description: LocalizedString;
}

export interface Concept {
  id: string;
  title: LocalizedString;
  content: LocalizedString;
  formulas: string[]; // LaTeX formulas
}

// ============================================================================
// Gas Parameters and State Types
// ============================================================================

export interface GasParameters {
  pressure: number; // Pa
  volume: number; // m^{3}
  temperature: number; // K
  moles: number; // mol
}

export interface GasState extends GasParameters {
  // Extends GasParameters with no additional fields for now
}

// ============================================================================
// Visualization Types
// ============================================================================

export interface GasLawSimulatorState extends GasParameters {
  animationSpeed: number;
  particleCount: number;
  containerDimensions: { width: number; height: number };
}

export type GasLawType = "boyle" | "charles" | "avogadro";

export type ThermodynamicProcessType = "isothermal" | "isobaric" | "isochoric" | "adiabatic";

export interface ThermodynamicProcess {
  type: ThermodynamicProcessType;
  startState: GasState;
  endState: GasState;
  color: string;
}

export interface PVPoint {
  pressure: number;
  volume: number;
  temperature?: number;
}

export interface GasComponent {
  id: string;
  name: string;
  moles: number;
  molarMass?: number;
}

export interface MixtureResult {
  totalPressure: number; // Pa
  totalMoles: number;
  components: {
    gas: GasComponent;
    moleFraction: number;
    partialPressure: number;
  }[];
  isValid: boolean;
  validationErrors: string[];
}

export interface VisualizationStateMap {
  gasLawSimulator: GasParameters;
  pvDiagram: PVDiagramState;
  partialPressureCalc: MixtureResult;
}

export interface PVDiagramState {
  processes: ThermodynamicProcess[];
  selectedPoint?: PVPoint;
}

// ============================================================================
// Module State Types
// ============================================================================

export interface ModuleState {
  currentStage: StageId;
  currentLanguage: Language;
  questProgress: QuestProgressMap;
  visualizationState: VisualizationStateMap;
}

// ============================================================================
// Constants
// ============================================================================

export const GAS_CONSTANT = {
  R: 8.314, // J/(mol·K)
  R_atm: 0.08206, // L·atm/(mol·K)
  R_bar: 0.08314, // L·bar/(mol·K)
} as const;

export const STANDARD_CONDITIONS = {
  STP: {
    temperature: 273.15, // K (0°C)
    pressure: 101325, // Pa (1 atm)
  },
  SATP: {
    temperature: 298.15, // K (25°C)
    pressure: 100000, // Pa (1 bar)
  },
} as const;

export const CONVERSIONS = {
  pressure: {
    Pa_to_atm: 1 / 101325,
    Pa_to_bar: 1 / 100000,
    Pa_to_mmHg: 760 / 101325,
  },
  volume: {
    m3_to_L: 1000,
    m3_to_mL: 1000000,
    L_to_m3: 0.001,
  },
  temperature: {
    C_to_K: (c: number) => c + 273.15,
    K_to_C: (k: number) => k - 273.15,
  },
} as const;

export const QUEST_DISTRIBUTION = {
  BASIC_GAS_LAWS: {
    BASIC: 15,
    CORE: 0,
    ADVANCED: 0,
    ELITE: 0,
  },
  IDEAL_GAS_EQUATION: {
    BASIC: 0,
    CORE: 20,
    ADVANCED: 0,
    ELITE: 0,
  },
  GAS_MIXTURES: {
    BASIC: 0,
    CORE: 0,
    ADVANCED: 15,
    ELITE: 10,
  },
} as const;

export const BREAKPOINTS = {
  mobile: 375,
  tablet: 768,
  desktop: 1024,
} as const;
