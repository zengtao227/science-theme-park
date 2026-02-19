/**
 * SC1.06 Chemical Reactions Basics - Type Definitions
 * 
 * This file contains all TypeScript interfaces and types for the Chemical Reactions module.
 * Requirements: 11.1, 11.3, 11.4, 11.7
 */

import { Quest } from '@/hooks/useQuestManager';

/**
 * Stage types for the Chemical Reactions module
 */
export type Stage = 
  | "REACTION_TYPES" 
  | "EQUATION_BALANCING" 
  | "REACTION_SIMULATION";

/**
 * Difficulty levels for quests
 */
export type Difficulty = "BASIC" | "CORE" | "ADVANCED" | "ELITE";

/**
 * Reaction type classifications
 */
export type ReactionType = 
  | "synthesis"           // A + B → AB
  | "decomposition"       // AB → A + B
  | "single_replacement"  // A + BC → AC + B
  | "double_replacement"  // AB + CD → AD + CB
  | "combustion";         // CxHy + O2 → CO2 + H2O

/**
 * Energy change type for reactions
 */
export type EnergyChange = "exothermic" | "endothermic";

/**
 * Element count in a compound
 */
export interface ElementCount {
  element: string;   // Element symbol (e.g., "H", "O", "C")
  count: number;     // Number of atoms
}

/**
 * Chemical compound representation
 */
export interface Compound {
  formula: string;           // e.g., "H2O"
  formulaLatex: string;      // e.g., "\\text{H}_2\\text{O}"
  name: string;              // e.g., "water"
  elements: ElementCount[];  // e.g., [{element: "H", count: 2}, {element: "O", count: 1}]
}

/**
 * Chemical equation representation
 */
export interface ChemicalEquation {
  reactants: Compound[];     // Compounds on the left side of the arrow
  products: Compound[];      // Compounds on the right side of the arrow
  coefficients: number[];    // Coefficients for balancing (reactants first, then products)
  type: ReactionType;        // Classification of the reaction
}

/**
 * Mechanism step for ELITE difficulty
 */
export interface MechanismStep {
  description: string;           // Description of this step
  electronMovement: string[];    // Curved arrow notation
  before: Compound[];            // Compounds before this step
  after: Compound[];             // Compounds after this step
}

/**
 * Reaction mechanism for ELITE difficulty
 */
export interface ReactionMechanism {
  steps: MechanismStep[];        // Individual mechanism steps
  intermediates: Compound[];     // Intermediate species
  transitionStates: string[];    // Transition state descriptions
}

/**
 * Atom count map for balancing verification
 * Maps element symbol to counts on reactant and product sides
 */
export type AtomCountMap = Map<string, { reactants: number; products: number }>;

/**
 * SC106 Quest interface extending base Quest
 */
export interface SC106Quest extends Quest {
  id: string;                           // e.g., "REACTION_TYPES_BASIC_1"
  difficulty: Difficulty;               // BASIC | CORE | ADVANCED | ELITE
  stage: Stage;                         // REACTION_TYPES | EQUATION_BALANCING | REACTION_SIMULATION
  equation: ChemicalEquation;           // Full equation object
  reactants: string[];                  // Array of reactant formulas
  products: string[];                   // Array of product formulas
  coefficients?: number[];              // Correct coefficients for balancing
  reactionType?: ReactionType;          // Expected reaction type
  promptLatex: string;                  // Question text
  equationLatex: string;                // Equation in LaTeX format
  expressionLatex: string;              // Expression context (required by base Quest)
  targetLatex: string;                  // Target format (required by base Quest)
  correctLatex: string;                 // Correct answer (required by base Quest)
  slots: Array<{                        // Input fields (required by base Quest)
    id: string;
    labelLatex: string;
    placeholder: string;
    expected: string | number;
  }>;
  mechanism?: ReactionMechanism;        // For ELITE difficulty
  energyChange?: EnergyChange;          // Exothermic or endothermic
  baselContext?: string;                // Basel-specific scenario text
}
