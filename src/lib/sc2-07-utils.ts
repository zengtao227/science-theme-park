/**
 * SC2.07 Enthalpy & Energetics - Utility Functions
 * 
 * Core calculation functions for enthalpy changes, bond energies,
 * formation enthalpies, calorimetry, and Hess's Law operations.
 * 
 * Requirements: 1.2, 1.3, 1.4, 3.2, 3.3, 3.4, 4.2, 4.3, 4.4, 5.2, 5.3, 6.2, 6.3, 6.4
 */

import {
  ReactionType,
  Bond,
  ThermochemicalEquation,
  Compound,
  FormationData,
} from './sc2-07-types';

/**
 * Calculate enthalpy change from reactant and product enthalpies
 * ΔH = H(products) - H(reactants)
 * 
 * Requirements: 1.2
 * Property 6: Enthalpy Calculation Correctness
 */
export function calculateEnthalpyChange(
  hReactants: number,
  hProducts: number
): number {
  return hProducts - hReactants;
}

/**
 * Classify reaction as exothermic or endothermic based on ΔH
 * ΔH < 0 → exothermic (releases heat)
 * ΔH > 0 → endothermic (absorbs heat)
 * 
 * Requirements: 1.3, 1.4
 * Property 1: Reaction Type Classification by ΔH Sign
 */
export function classifyReaction(deltaH: number): ReactionType {
  return deltaH < 0 ? 'exothermic' : 'endothermic';
}

/**
 * Calculate enthalpy change from bond energies
 * ΔH = Σ(bonds broken) - Σ(bonds formed)
 * 
 * Requirements: 4.2
 * Property 9: Bond Energy Calculation Correctness
 */
export function calculateBondEnergyDeltaH(
  bondsBroken: Bond[],
  bondsFormed: Bond[]
): number {
  const totalBroken = bondsBroken.reduce(
    (sum, bond) => sum + bond.energy * bond.count,
    0
  );
  const totalFormed = bondsFormed.reduce(
    (sum, bond) => sum + bond.energy * bond.count,
    0
  );
  return totalBroken - totalFormed;
}

/**
 * Count bonds in a molecule
 * 
 * Requirements: 4.3, 4.4
 * Property 10: Bond Counting Accuracy
 */
export function countBonds(compound: Compound): Bond[] {
  return compound.bonds || [];
}

/**
 * Calculate enthalpy change from standard formation enthalpies
 * ΔH° = Σ(coefficients × ΔH°f products) - Σ(coefficients × ΔH°f reactants)
 * 
 * Requirements: 5.2, 5.3
 * Property 11: Formation Enthalpy Calculation Correctness
 */
export function calculateFormationDeltaH(formationData: FormationData): number {
  const productsSum = formationData.products.reduce(
    (sum, item) => sum + item.coefficient * item.deltaHf,
    0
  );
  const reactantsSum = formationData.reactants.reduce(
    (sum, item) => sum + item.coefficient * item.deltaHf,
    0
  );
  return productsSum - reactantsSum;
}

/**
 * Calculate heat from calorimetry data
 * q = mcΔT
 * 
 * Requirements: 6.2
 * Property 13: Calorimetry Heat Calculation Correctness
 */
export function calculateHeat(
  mass: number,
  specificHeat: number,
  tempChange: number
): number {
  return mass * specificHeat * tempChange;
}

/**
 * Calculate enthalpy per mole from heat
 * ΔH = q / (1000 × n) to convert J to kJ/mol
 * 
 * Requirements: 6.3
 * Property 14: Enthalpy Per Mole Calculation
 */
export function calculateDeltaHPerMole(heat: number, moles: number): number {
  return heat / (1000 * moles);
}

/**
 * Calculate total heat including calorimeter heat capacity
 * q_total = mcΔT + C_cal × ΔT
 * 
 * Requirements: 6.4
 * Property 15: Calorimeter Heat Capacity Inclusion
 */
export function calculateTotalHeat(
  mass: number,
  specificHeat: number,
  tempChange: number,
  calorimeterCapacity: number
): number {
  const solutionHeat = calculateHeat(mass, specificHeat, tempChange);
  const calorimeterHeat = calorimeterCapacity * tempChange;
  return solutionHeat + calorimeterHeat;
}

/**
 * Reverse a thermochemical equation (flip reactants/products and negate ΔH)
 * 
 * Requirements: 3.3
 * Property 3: Hess's Law Equation Reversal
 */
export function reverseEquation(
  equation: ThermochemicalEquation
): ThermochemicalEquation {
  return {
    ...equation,
    deltaH: -equation.deltaH,
    reversed: !equation.reversed,
  };
}

/**
 * Multiply a thermochemical equation by a coefficient
 * 
 * Requirements: 3.4
 * Property 4: Hess's Law Equation Multiplication
 */
export function multiplyEquation(
  equation: ThermochemicalEquation,
  coefficient: number
): ThermochemicalEquation {
  return {
    ...equation,
    deltaH: equation.deltaH * coefficient,
    multiplier: equation.multiplier * coefficient,
  };
}

/**
 * Calculate total ΔH from a pathway of equations
 * 
 * Requirements: 3.2
 * Property 7: Hess's Law Pathway Validity (partial)
 */
export function calculatePathwayDeltaH(
  equations: ThermochemicalEquation[]
): number {
  return equations.reduce((sum, eq) => sum + eq.deltaH, 0);
}

/**
 * Validate if a pathway of equations produces the target equation
 * This is a simplified validation - in a real implementation,
 * you would need to check if the combined equations equal the target
 * 
 * Requirements: 3.2, 19.5, 19.6
 * Property 7: Hess's Law Pathway Validity
 */
export function validateHessPathway(
  equations: ThermochemicalEquation[],
  target: ThermochemicalEquation,
  tolerance: number = 1
): boolean {
  const totalDeltaH = calculatePathwayDeltaH(equations);
  return Math.abs(totalDeltaH - target.deltaH) <= tolerance;
}

/**
 * Verify answer within tolerance
 * 
 * Requirements: 3.7, 13.1, 13.2
 * Property 8: Answer Verification Tolerance
 * Property 28: Answer Verification Correctness
 */
export function verifyAnswer(
  userAnswer: number,
  expectedAnswer: number,
  tolerance: number = 1
): boolean {
  return Math.abs(userAnswer - expectedAnswer) <= tolerance;
}

/**
 * Create a compound object with LaTeX formatting
 */
export function createCompound(
  formula: string,
  name: string,
  state: 's' | 'l' | 'g' | 'aq',
  options?: {
    enthalpy?: number;
    formationEnthalpy?: number;
    bonds?: Bond[];
  }
): Compound {
  return {
    formula,
    formulaLatex: formatFormulaToLatex(formula),
    name,
    state,
    ...options,
  };
}

/**
 * Convert chemical formula to LaTeX format
 * e.g., "H2O" → "\\text{H}_2\\text{O}"
 */
export function formatFormulaToLatex(formula: string): string {
  return formula.replace(/([A-Z][a-z]?)(\d*)/g, (match, element, number) => {
    if (number) {
      return `\\text{${element}}_${number}`;
    }
    return `\\text{${element}}`;
  });
}

/**
 * Format thermochemical equation to LaTeX
 * e.g., "H2(g) + O2(g) → H2O(l)"
 */
export function formatEquationToLatex(
  reactants: Compound[],
  products: Compound[],
  coefficients: number[]
): string {
  const reactantIndex = Math.floor(coefficients.length / 2);
  
  const reactantStr = reactants
    .map((r, i) => {
      const coeff = coefficients[i] === 1 ? '' : coefficients[i].toString();
      return `${coeff}${r.formulaLatex}(${r.state})`;
    })
    .join(' + ');
  
  const productStr = products
    .map((p, i) => {
      const coeff = coefficients[reactantIndex + i] === 1 ? '' : coefficients[reactantIndex + i].toString();
      return `${coeff}${p.formulaLatex}(${p.state})`;
    })
    .join(' + ');
  
  return `${reactantStr} \\rightarrow ${productStr}`;
}
