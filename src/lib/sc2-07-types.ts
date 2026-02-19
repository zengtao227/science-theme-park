/**
 * SC2.07 Enthalpy & Energetics - Type Definitions
 * 
 * Core TypeScript interfaces for quest data structures, thermochemical reactions,
 * bond energies, formation enthalpies, calorimetry data, and Hess's Law pathways.
 * 
 * Requirements: 14.1, 14.4, 14.5
 */

import { Quest, Difficulty } from '@/hooks/useQuestManager';

/**
 * Stage types for the three main sections of the module
 */
export type Stage = 'ENERGY_CHANGES' | 'HESS_LAW' | 'CALORIMETRY';

/**
 * Reaction type classification
 */
export type ReactionType = 'exothermic' | 'endothermic';

/**
 * State symbols for compounds
 */
export type StateSymbol = 's' | 'l' | 'g' | 'aq';

/**
 * Individual compound in a reaction
 */
export interface Compound {
  formula: string;                    // e.g., "H2O"
  formulaLatex: string;               // e.g., "\\text{H}_2\\text{O}"
  name: string;                       // e.g., "water"
  state: StateSymbol;                 // State symbol
  enthalpy?: number;                  // H value in kJ/mol
  formationEnthalpy?: number;         // ΔH°f in kJ/mol
  bonds?: Bond[];                     // For bond energy calculations
}

/**
 * Chemical bond with energy value
 */
export interface Bond {
  type: string;                       // e.g., "C-H", "C=O", "O-H"
  count: number;                      // Number of this bond type
  energy: number;                     // Bond energy in kJ/mol
}

/**
 * Complete thermochemical reaction
 */
export interface ThermochemicalReaction {
  reactants: Compound[];
  products: Compound[];
  coefficients: number[];
  deltaH: number;                     // kJ or kJ/mol
  stateSymbols: string[];             // (s), (l), (g), (aq)
}

/**
 * Bond energy calculation data
 */
export interface BondEnergyData {
  bondsBroken: Bond[];                // Bonds in reactants
  bondsFormed: Bond[];                // Bonds in products
  totalBroken: number;                // Sum of energies for bonds broken
  totalFormed: number;                // Sum of energies for bonds formed
  deltaH: number;                     // totalBroken - totalFormed
}

/**
 * Formation enthalpy calculation data
 */
export interface FormationData {
  reactants: Array<{
    compound: Compound;
    coefficient: number;
    deltaHf: number;                  // ΔH°f in kJ/mol
  }>;
  products: Array<{
    compound: Compound;
    coefficient: number;
    deltaHf: number;                  // ΔH°f in kJ/mol
  }>;
  deltaH: number;                     // Σ(products) - Σ(reactants)
}

/**
 * Calorimetry measurement data
 */
export interface CalorimeterData {
  mass: number;                       // grams
  specificHeat: number;               // J/g°C
  initialTemp: number;                // °C
  finalTemp: number;                  // °C
  tempChange: number;                 // ΔT = final - initial
  heat: number;                       // q = mcΔT in J
  moles?: number;                     // For ΔH per mole calculation
  deltaH?: number;                    // q/moles in kJ/mol
  calorimeterCapacity?: number;       // J/°C for advanced problems
}

/**
 * Thermochemical equation for Hess's Law
 */
export interface ThermochemicalEquation {
  id: string;
  equation: string;                   // e.g., "C(s) + O2(g) → CO2(g)"
  equationLatex: string;
  deltaH: number;                     // kJ or kJ/mol
  reversed: boolean;                  // If equation has been reversed
  multiplier: number;                 // Coefficient multiplier
}

/**
 * Hess's Law problem data
 */
export interface HessLawData {
  targetEquation: ThermochemicalEquation;
  availableEquations: ThermochemicalEquation[];
  correctPathway: ThermochemicalEquation[];
  totalDeltaH: number;
}

/**
 * Energy level for visualization
 */
export interface EnergyLevel {
  label: string;                      // "Reactants" or "Products"
  enthalpy: number;                   // Relative enthalpy value
  compounds: Compound[];
}

/**
 * Hess's Law pathway
 */
export interface HessPathway {
  equations: ThermochemicalEquation[];
  totalDeltaH: number;
  isValid: boolean;
}

/**
 * Main quest interface for SC2.07
 */
export interface SC207Quest extends Quest {
  id: string;
  difficulty: Difficulty;
  stage: Stage;
  reaction: ThermochemicalReaction;
  deltaH?: number;
  bondEnergies?: BondEnergyData;
  formationEnthalpies?: FormationData;
  calorimetryData?: CalorimeterData;
  hessData?: HessLawData;
  promptLatex: string;
  equationLatex: string;
  expressionLatex: string;            // Required by base Quest
  targetLatex: string;                // Required by base Quest
  correctLatex: string;               // Required by base Quest
  slots: Array<{                      // Required by base Quest
    id: string;
    labelLatex: string;
    placeholder: string;
    expected: number;
    unit: string;
  }>;
  baselContext?: string;
  reactionType: ReactionType;
  activationEnergy?: number;          // For ADVANCED/ELITE quests
}

/**
 * Bond energy reference entry
 */
export interface BondEnergyReference {
  bondType: string;                   // e.g., "C-H", "C=O"
  energy: number;                     // kJ/mol
  description: string;                // e.g., "Carbon-Hydrogen single bond"
}

/**
 * Formation enthalpy reference entry
 */
export interface FormationEnthalpyReference {
  formula: string;                    // e.g., "H2O(l)"
  formulaLatex: string;               // e.g., "\\text{H}_2\\text{O}(l)"
  name: string;                       // e.g., "water"
  deltaHf: number;                    // kJ/mol
  state: StateSymbol;
}
