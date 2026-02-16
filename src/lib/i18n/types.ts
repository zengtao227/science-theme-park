/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * i18n Type Definitions
 * Generated from i18n.ts refactoring
 */

export type Language = "EN" | "CN" | "DE";

/**
 * Common translations shared across all modules
 * Includes: protocol, common, home, profile
 */
export interface CommonTranslations {
  protocol: Record<string, any>;
  common: Record<string, any>;
  home: Record<string, any>;
  profile: Record<string, any>;
  labels: {
    mission_objective: string;
    scenario_context: string;
    terminal_input: string;
    system_status: string;
    active: string;
    stability: string;
    node: string;
    calculation_valid: string;
    calculation_error: string;
    next_mission: string;
    hint: string;
  };
}

/**
 * Mathematics module translations
 * Includes: SM1.*, SM2.*, SM3.*, GM*.*, EM*.*
 */
export interface MathTranslations {
  [key: string]: Record<string, any>;
}

/**
 * Physics module translations
 * Includes: SP1.*, SP2.*, SP3.*, GP*.*
 */
export interface PhysicsTranslations {
  [key: string]: Record<string, any>;
}

/**
 * Chemistry module translations
 * Includes: SC1.*, SC2.*, SC3.*, GC*.*
 */
export interface ChemistryTranslations {
  [key: string]: Record<string, any>;
}

/**
 * Standardized biology module translation structure
 * Based on Biology i18n Phase 2 design specifications
 */
export interface BiologyModuleTranslations {
  title: string;
  back: string;
  check: string;
  next: string;
  correct: string;
  incorrect: string;
  ready: string;
  monitor_title: string;
  footer_left: string;
  objective_title: string;
  difficulty: {
    basic: string;
    core: string;
    advanced: string;
    elite: string;
  };
  stages: Record<string, string>;
  labels: Record<string, string>;
  prompts: Record<string, string>;
  scenarios: Record<string, string>;
  results?: {
    valid: string;
    invalid: string;
    valid_desc: string;
    invalid_desc: string;
    next: string;
  };
  feedback: {
    correct: string;
    incorrect: string;
  };
}

/**
 * Stage-specific translation structure for multi-stage biology modules
 * Used for modules with distinct learning phases (e.g., mitosis, meiosis_i, meiosis_ii)
 */
export interface BiologyStageTranslations {
  [stageId: string]: {
    name: string;
    description?: string;
    prompts?: Record<string, string>;
    labels?: Record<string, string>;
  };
}

/**
 * Cell Division module (SB1.03) specific translations
 */
export interface CellDivisionTranslations extends BiologyModuleTranslations {
  stages: {
    mitosis: string;
    meiosis_i: string;
    meiosis_ii: string;
  };
  scenarios: {
    mitosis: string;
    meiosis_i: string;
    meiosis_ii: string;
  };
}

/**
 * Tissues & Organs module (SB2.01) specific translations
 */
export interface TissuesOrgansTranslations extends BiologyModuleTranslations {
  stages: {
    tissues: string;
    organs: string;
    systems: string;
  };
  anatomy?: {
    tissues: Record<string, {
      name: string;
      function: string;
      subtypes?: string;
      location?: string;
    }>;
    organs?: Record<string, string>;
    hierarchy?: Record<string, string>;
  };
}

/**
 * Neurobiology module (GB2.01) specific translations
 */
export interface NeurobiologyTranslations extends BiologyModuleTranslations {
  stages: {
    anatomy: string;
    potential: string;
    synapse: string;
  };
  scenarios: {
    basel_biomedicine: string;
    roche_neuroscience: string;
    neural_plasticity: string;
    friedrich_miescher: string;
  };
}

/**
 * Biology module translations
 * Includes: SB1.*, SB2.*, SB3.*, GB*.*
 */
export interface BiologyTranslations {
  sb1_03?: CellDivisionTranslations;
  sb2_01?: TissuesOrgansTranslations;
  sb2_01_tissues?: TissuesOrgansTranslations;
  gb2_01?: NeurobiologyTranslations;
  [key: string]: BiologyModuleTranslations | Record<string, any> | undefined;
}

/**
 * Complete translation structure for a single language
 */
export interface Translations
  extends CommonTranslations,
  MathTranslations,
  PhysicsTranslations,
  ChemistryTranslations,
  BiologyTranslations { }

/**
 * All languages translations
 */
export interface AllTranslations {
  EN: Translations;
  CN: Translations;
  DE: Translations;
}
