/**
 * GB2.02 Endocrine System - Type Definitions
 * 
 * This module defines all TypeScript interfaces and types for the endocrine system module,
 * including hormones, glands, feedback loops, clinical cases, and quest structures.
 */

import { Difficulty } from '@/hooks/useQuestManager';

/**
 * Hormone types based on chemical structure
 */
export type HormoneType = "peptide" | "steroid" | "amino_acid_derived";

/**
 * Module stages
 */
export type Stage = 
  | "HORMONE_IDENTIFICATION" 
  | "FEEDBACK_MECHANISMS" 
  | "CLINICAL_APPLICATIONS";

/**
 * Feedback loop types
 */
export type FeedbackType = "negative" | "positive";

/**
 * Feedback component types
 */
export type FeedbackComponentType = 
  | "stimulus" 
  | "sensor" 
  | "control_center" 
  | "effector" 
  | "response" 
  | "feedback";

/**
 * Connection types in feedback loops
 */
export type ConnectionType = "stimulatory" | "inhibitory";

/**
 * Lab result status
 */
export type LabStatus = "normal" | "high" | "low";

/**
 * Patient sex
 */
export type PatientSex = "male" | "female";

/**
 * Hormone interface
 * Represents a hormone with its properties and functions
 */
export interface Hormone {
  name: string;                        // e.g., "insulin"
  nameLatex: string;                   // e.g., "\\text{Insulin}"
  abbreviation?: string;               // e.g., "TSH", "T_3", "T_4"
  type: HormoneType;                   // peptide | steroid | amino_acid_derived
  gland: string;                       // Producing gland
  targetOrgans: string[];              // Target organs
  primaryFunction: string;             // Main physiological function
  structure?: string;                  // Chemical structure description
  regulationMechanism?: string;        // How it's regulated
}

/**
 * Endocrine gland interface
 * Represents an endocrine gland with its location and hormones
 */
export interface EndocrineGland {
  name: string;                        // e.g., "pituitary"
  displayName: string;                 // e.g., "Pituitary Gland"
  location: {                          // Anatomical location
    x: number;                         // Percentage from left
    y: number;                         // Percentage from top
  };
  hormones: string[];                  // Hormones produced
  functions: string[];                 // Main functions
  subdivisions?: string[];             // e.g., ["anterior", "posterior"] for pituitary
}

/**
 * Hormone pathway interface
 * Represents the flow from gland to target organ
 */
export interface HormonePathway {
  gland: string;                       // Starting gland
  hormone: string;                     // Hormone released
  transport: "bloodstream";            // Transport mechanism
  targetOrgans: string[];              // Target organs
  effects: string[];                   // Physiological effects
  regulatedBy?: string[];              // Regulatory factors
}

/**
 * Feedback component interface
 * Represents a single component in a feedback loop
 */
export interface FeedbackComponent {
  id: string;
  type: FeedbackComponentType;
  name: string;                        // Component name
  description: string;                 // What it does
  connectionType: ConnectionType;
}

/**
 * Feedback loop interface
 * Represents a complete feedback mechanism
 */
export interface FeedbackLoop {
  type: FeedbackType;                  // negative | positive
  components: FeedbackComponent[];     // Loop components in order
  stimulus: string;                    // Initial stimulus
  response: string;                    // Final response
  setPoint?: number;                   // For homeostatic mechanisms
  description: string;                 // Loop description
}

/**
 * Patient information interface
 */
export interface PatientInfo {
  age: number;
  sex: PatientSex;
  occupation?: string;
  relevantHistory?: string[];
}

/**
 * Lab result interface
 * Represents a single hormone measurement
 */
export interface LabResult {
  hormone: string;                     // Hormone name
  value: number;                       // Measured value
  unit: string;                        // e.g., "mIU/L", "ng/dL"
  referenceRange: {
    min: number;
    max: number;
  };
  status: LabStatus;                   // normal | high | low
}

/**
 * Reference range interface
 */
export interface ReferenceRange {
  hormone: string;
  unit: string;
  normalRange: {
    min: number;
    max: number;
  };
  criticalLow?: number;
  criticalHigh?: number;
}

/**
 * Clinical case interface
 * Represents a complete clinical scenario
 */
export interface ClinicalCase {
  patientInfo: PatientInfo;
  chiefComplaint: string;
  history: string;
  examination: string[];
  symptoms: string[];
  labResults: LabResult[];
  expectedDiagnosis: string;
  differentialDiagnoses?: string[];    // Other possible diagnoses
  baselContext: string;                // Basel University Hospital context
}

/**
 * Quest slot interface
 * Represents an input field or selection in a quest
 */
export interface GB202QuestSlot {
  id: string;
  labelLatex: string;
  placeholder: string;
  type: "select" | "input" | "multiselect";
  options?: string[];
  expected: string | number;  // Match Slot interface - no string[]
  unit?: string;
}

/**
 * GB2.02 Quest interface
 * Matches the Quest interface from useQuestManager with endocrine-specific properties
 */
export interface GB202Quest {
  id: string;                           // e.g., "HORMONE_ID_BASIC_1"
  difficulty: Difficulty;               // BASIC | CORE | ADVANCED | ELITE
  stage: Stage;                         // HORMONE_IDENTIFICATION | FEEDBACK_MECHANISMS | CLINICAL_APPLICATIONS
  promptLatex: string;                 // Question text
  expressionLatex: string;             // Expression to display (required by Quest)
  targetLatex: string;                 // Target value (required by Quest)
  slots: GB202QuestSlot[];             // Input fields or selections (required, not optional)
  correctLatex: string;                // Correct answer display (required by Quest)
  hintLatex?: string[];                // Optional hints
  visual?: unknown;                    // Optional visual data
  // Endocrine-specific properties
  hormone?: Hormone;                    // Hormone object
  gland?: EndocrineGland;              // Gland object
  targetOrgans?: string[];             // Target organ names
  feedbackLoop?: FeedbackLoop;         // Feedback loop data
  clinicalCase?: ClinicalCase;         // Clinical case data
  baselContext?: string;               // Basel-specific scenario text
  // Additional properties for compatibility
  title?: string;
  description?: string;
  concept?: string;
}

/**
 * Pathway component interface
 * Used for building hormone pathways interactively
 */
export interface PathwayComponent {
  id: string;
  type: "gland" | "hormone" | "target_organ" | "effect";
  name: string;
  description: string;
}

/**
 * Clinical data interface
 * Used for visualization of clinical information
 */
export interface ClinicalData {
  patientInfo: PatientInfo;
  symptoms: string[];
  labResults: LabResult[];
  referenceRanges: ReferenceRange[];
}
