/**
 * SC1.06 Chemical Reactions Basics - Utility Functions
 * 
 * This file contains utility functions for chemical formula processing,
 * LaTeX conversion, and IUPAC validation.
 * 
 * Requirements: 1.7, 11.5, 12.5, 12.6, 12.7
 */

import { ElementCount, Compound } from './sc1-06-types';

/**
 * Convert a chemical formula to LaTeX format with four backslashes
 * 
 * Examples:
 * - "H2O" → "\\text{H}_2\\text{O}"
 * - "Ca(OH)2" → "\\text{Ca}(\\text{OH})_2"
 * - "Fe3+" → "\\text{Fe}^{3+}"
 * - "SO42-" → "\\text{SO}_4^{2-}"
 * 
 * Requirements: 12.4, 12.5, 12.6, 12.7, 12.8
 * 
 * @param formula - Chemical formula in standard notation
 * @returns LaTeX string with four backslashes
 */
export function formulaToLatex(formula: string): string {
  if (!formula) return '';
  
  // Check if formula ends with a charge (e.g., 3+, 2-, +, -)
  // Charge is a single digit (0-9) followed by + or -, or just + or -
  const chargeMatch = formula.match(/(\d?)([+-])$/);
  let mainFormula = formula;
  let charge = '';
  
  if (chargeMatch && chargeMatch[1] !== '') {
    // Only treat as charge if there's a digit before +/- or it's just +/-
    charge = chargeMatch[0];
    mainFormula = formula.slice(0, -charge.length);
  } else if (chargeMatch && chargeMatch[1] === '' && (formula.endsWith('+') || formula.endsWith('-'))) {
    // Handle bare + or - at the end
    charge = chargeMatch[0];
    mainFormula = formula.slice(0, -charge.length);
  }
  
  let latex = '';
  let i = 0;
  
  while (i < mainFormula.length) {
    const char = mainFormula[i];
    
    // Handle opening parenthesis
    if (char === '(') {
      latex += '(';
      i++;
      continue;
    }
    
    // Handle closing parenthesis
    if (char === ')') {
      latex += ')';
      i++;
      continue;
    }
    
    // Handle element symbols (uppercase letter, possibly followed by lowercase)
    if (char >= 'A' && char <= 'Z') {
      let element = char;
      i++;
      
      // Check for lowercase letter (e.g., Ca, Cl)
      if (i < mainFormula.length && mainFormula[i] >= 'a' && mainFormula[i] <= 'z') {
        element += mainFormula[i];
        i++;
      }
      
      latex += `\\\\text{${element}}`;
      continue;
    }
    
    // Handle numbers (subscripts)
    if (char >= '0' && char <= '9') {
      let number = '';
      while (i < mainFormula.length && mainFormula[i] >= '0' && mainFormula[i] <= '9') {
        number += mainFormula[i];
        i++;
      }
      latex += `_${number}`;
      continue;
    }
    
    // Handle other characters (shouldn't happen in valid formulas)
    i++;
  }
  
  // Add charge as superscript if present
  if (charge) {
    latex += `^{${charge}}`;
  }
  
  return latex;
}

/**
 * Parse a chemical compound formula to extract elements and their counts
 * 
 * Examples:
 * - "H2O" → [{element: "H", count: 2}, {element: "O", count: 1}]
 * - "Ca(OH)2" → [{element: "Ca", count: 1}, {element: "O", count: 2}, {element: "H", count: 2}]
 * - "H2SO4" → [{element: "H", count: 2}, {element: "S", count: 1}, {element: "O", count: 4}]
 * 
 * Requirements: 11.5
 * 
 * @param formula - Chemical formula in standard notation
 * @returns Array of ElementCount objects
 */
export function parseCompound(formula: string): ElementCount[] {
  const elementCounts: Map<string, number> = new Map();
  
  // Remove charges (e.g., Fe3+ → Fe, SO42- → SO4)
  const cleanFormula = formula.replace(/\d*[+-]$/, '');
  
  // Parse the formula recursively
  const parseSegment = (segment: string, multiplier: number = 1): void => {
    let i = 0;
    
    while (i < segment.length) {
      const char = segment[i];
      
      // Handle parentheses
      if (char === '(') {
        // Find matching closing parenthesis
        let depth = 1;
        let j = i + 1;
        while (j < segment.length && depth > 0) {
          if (segment[j] === '(') depth++;
          if (segment[j] === ')') depth--;
          j++;
        }
        
        // Extract content inside parentheses
        const inside = segment.substring(i + 1, j - 1);
        
        // Get the multiplier after the closing parenthesis
        let subMultiplier = '';
        while (j < segment.length && segment[j] >= '0' && segment[j] <= '9') {
          subMultiplier += segment[j];
          j++;
        }
        
        const mult = subMultiplier ? parseInt(subMultiplier) : 1;
        parseSegment(inside, multiplier * mult);
        
        i = j;
        continue;
      }
      
      // Handle element symbols
      if (char >= 'A' && char <= 'Z') {
        let element = char;
        i++;
        
        // Check for lowercase letter
        if (i < segment.length && segment[i] >= 'a' && segment[i] <= 'z') {
          element += segment[i];
          i++;
        }
        
        // Get the count
        let countStr = '';
        while (i < segment.length && segment[i] >= '0' && segment[i] <= '9') {
          countStr += segment[i];
          i++;
        }
        
        const count = countStr ? parseInt(countStr) : 1;
        const currentCount = elementCounts.get(element) || 0;
        elementCounts.set(element, currentCount + count * multiplier);
        continue;
      }
      
      i++;
    }
  };
  
  parseSegment(cleanFormula);
  
  // Convert map to array
  const result: ElementCount[] = [];
  elementCounts.forEach((count, element) => {
    result.push({ element, count });
  });
  
  return result;
}

/**
 * Validate chemical notation according to IUPAC standards
 * 
 * Checks:
 * - Element symbols are properly capitalized (e.g., "H2O" not "h2o")
 * - No invalid characters
 * - Proper use of parentheses
 * - Valid element symbols
 * 
 * Requirements: 1.7, 11.5
 * 
 * @param formula - Chemical formula to validate
 * @returns true if valid, false otherwise
 */
export function validateChemicalNotation(formula: string): boolean {
  if (!formula || formula.length === 0) return false;
  
  // Common element symbols (not exhaustive, but covers most cases)
  const validElements = new Set([
    'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne',
    'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca',
    'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn',
    'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr',
    'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn',
    'Sb', 'Te', 'I', 'Xe', 'Cs', 'Ba', 'La', 'Ce', 'Pr', 'Nd',
    'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb',
    'Lu', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg',
    'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn', 'Fr', 'Ra', 'Ac', 'Th',
    'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm',
    'Md', 'No', 'Lr', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds',
    'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og'
  ]);
  
  // Check for balanced parentheses
  let parenDepth = 0;
  for (const char of formula) {
    if (char === '(') parenDepth++;
    if (char === ')') parenDepth--;
    if (parenDepth < 0) return false; // Closing before opening
  }
  if (parenDepth !== 0) return false; // Unbalanced
  
  // Extract and validate element symbols
  let i = 0;
  while (i < formula.length) {
    const char = formula[i];
    
    // Skip parentheses and numbers
    if (char === '(' || char === ')' || (char >= '0' && char <= '9')) {
      i++;
      continue;
    }
    
    // Skip charges
    if (char === '+' || char === '-') {
      i++;
      continue;
    }
    
    // Check for uppercase letter (start of element symbol)
    if (char >= 'A' && char <= 'Z') {
      let element = char;
      i++;
      
      // Check for lowercase letter
      if (i < formula.length && formula[i] >= 'a' && formula[i] <= 'z') {
        element += formula[i];
        i++;
      }
      
      // Validate element symbol
      if (!validElements.has(element)) {
        return false;
      }
      continue;
    }
    
    // Check for lowercase letter at start (invalid - must be capitalized)
    if (char >= 'a' && char <= 'z') {
      return false;
    }
    
    // Invalid character
    return false;
  }
  
  return true;
}

/**
 * Create a Compound object from a formula string
 * 
 * @param formula - Chemical formula in standard notation
 * @param name - Common name of the compound
 * @returns Compound object
 */
export function createCompound(formula: string, name: string = ''): Compound {
  return {
    formula,
    formulaLatex: formulaToLatex(formula),
    name,
    elements: parseCompound(formula)
  };
}

/**
 * Calculate atom counts for reactants and products with given coefficients
 * 
 * This function takes a chemical equation and coefficients, then calculates
 * the total number of atoms of each element on both the reactant and product sides.
 * 
 * Examples:
 * - H2 + O2 → H2O with coefficients [2, 1, 2]
 *   Returns: Map { "H" => {reactants: 4, products: 4}, "O" => {reactants: 2, products: 2} }
 * 
 * - N2 + H2 → NH3 with coefficients [1, 3, 2]
 *   Returns: Map { "N" => {reactants: 2, products: 2}, "H" => {reactants: 6, products: 6} }
 * 
 * Requirements: 2.2, 10.2
 * 
 * @param equation - Chemical equation with reactants and products
 * @param coefficients - Array of coefficients (reactants first, then products)
 * @returns AtomCountMap with element counts on both sides
 */
export function calculateAtomCounts(
  equation: { reactants: { formula: string; elements: { element: string; count: number }[] }[]; products: { formula: string; elements: { element: string; count: number }[] }[] },
  coefficients: number[]
): Map<string, { reactants: number; products: number }> {
  const atomCounts = new Map<string, { reactants: number; products: number }>();
  
  // Calculate reactant side atom counts
  equation.reactants.forEach((compound, index) => {
    const coefficient = coefficients[index] || 1;
    
    compound.elements.forEach(({ element, count }) => {
      const totalCount = count * coefficient;
      const current = atomCounts.get(element) || { reactants: 0, products: 0 };
      atomCounts.set(element, { ...current, reactants: current.reactants + totalCount });
    });
  });
  
  // Calculate product side atom counts
  const productStartIndex = equation.reactants.length;
  equation.products.forEach((compound, index) => {
    const coefficient = coefficients[productStartIndex + index] || 1;
    
    compound.elements.forEach(({ element, count }) => {
      const totalCount = count * coefficient;
      const current = atomCounts.get(element) || { reactants: 0, products: 0 };
      atomCounts.set(element, { ...current, products: current.products + totalCount });
    });
  });
  
  return atomCounts;
}

/**
 * Check if a chemical equation is balanced
 * 
 * An equation is balanced when the count of each element is equal
 * on both the reactant and product sides.
 * 
 * Requirements: 2.2, 2.3
 * 
 * @param atomCounts - AtomCountMap from calculateAtomCounts()
 * @returns true if all elements are balanced, false otherwise
 */
export function isEquationBalanced(
  atomCounts: Map<string, { reactants: number; products: number }>
): boolean {
  for (const [, counts] of atomCounts) {
    if (counts.reactants !== counts.products) {
      return false;
    }
  }
  return true;
}

/**
 * Identify which elements are unbalanced in a chemical equation
 * 
 * Returns an array of element symbols that have different counts
 * on the reactant and product sides.
 * 
 * Requirements: 2.4, 4.4
 * 
 * @param atomCounts - AtomCountMap from calculateAtomCounts()
 * @returns Array of unbalanced element symbols
 */
export function identifyUnbalancedElements(
  atomCounts: Map<string, { reactants: number; products: number }>
): string[] {
  const unbalanced: string[] = [];
  
  for (const [element, counts] of atomCounts) {
    if (counts.reactants !== counts.products) {
      unbalanced.push(element);
    }
  }
  
  return unbalanced;
}

/**
 * Validation result for coefficient input
 */
export interface CoefficientValidationResult {
  valid: boolean;
  error?: string;
  value?: number;
}

/**
 * Validate coefficient input
 * 
 * Coefficients must be positive integers (≥ 1).
 * Rejects:
 * - Zero or negative numbers
 * - Decimal numbers
 * - Non-numeric input
 * 
 * Requirements: 4.8
 * 
 * @param input - User input string or number
 * @returns Validation result with error message if invalid
 */
export function validateCoefficient(input: string | number): CoefficientValidationResult {
  // Handle empty input - treat as 1 (default)
  if (input === '' || input === null || input === undefined) {
    return { valid: true, value: 1 };
  }
  
  // Convert to string for validation
  const inputStr = String(input).trim();
  
  // Check if it's a valid number
  if (!/^-?\d+\.?\d*$/.test(inputStr)) {
    return {
      valid: false,
      error: 'Please enter a positive integer'
    };
  }
  
  const numValue = Number(inputStr);
  
  // Check if it's NaN
  if (isNaN(numValue)) {
    return {
      valid: false,
      error: 'Please enter a positive integer'
    };
  }
  
  // Check if it's zero or negative
  if (numValue <= 0) {
    return {
      valid: false,
      error: 'Coefficients must be positive integers (≥ 1)'
    };
  }
  
  // Check if it's a decimal
  if (!Number.isInteger(numValue)) {
    return {
      valid: false,
      error: 'Coefficients must be whole numbers'
    };
  }
  
  // Check if it's extremely large (> 100)
  if (numValue > 100) {
    return {
      valid: true,
      value: numValue,
      error: 'Are you sure? This coefficient seems unusually large'
    };
  }
  
  return { valid: true, value: numValue };
}

/**
 * Classify a chemical reaction based on its structure
 * 
 * Detects five reaction types:
 * 1. Synthesis: A + B → AB (two or more reactants combine into one product)
 * 2. Decomposition: AB → A + B (one reactant breaks into two or more products)
 * 3. Single Replacement: A + BC → AC + B (one element replaces another)
 * 4. Double Replacement: AB + CD → AD + CB (two compounds exchange parts)
 * 5. Combustion: CₓHᵧ + O₂ → CO₂ + H₂O (hydrocarbon burns with oxygen)
 * 
 * Requirements: 3.2, 3.3, 10.3
 * 
 * @param equation - Chemical equation to classify
 * @returns ReactionType classification
 */
export function classifyReaction(equation: {
  reactants: { formula: string; elements: { element: string; count: number }[] }[];
  products: { formula: string; elements: { element: string; count: number }[] }[];
}): string {
  const numReactants = equation.reactants.length;
  const numProducts = equation.products.length;
  
  // Check for combustion first (most specific pattern)
  if (isCombustion(equation)) {
    return 'combustion';
  }
  
  // Synthesis: Multiple reactants → Single product
  if (numReactants >= 2 && numProducts === 1) {
    return 'synthesis';
  }
  
  // Decomposition: Single reactant → Multiple products
  if (numReactants === 1 && numProducts >= 2) {
    return 'decomposition';
  }
  
  // Single Replacement: 2 reactants → 2 products, one is an element
  if (numReactants === 2 && numProducts === 2) {
    if (isSingleReplacement(equation)) {
      return 'single_replacement';
    }
  }
  
  // Double Replacement: 2 reactants → 2 products, both are compounds
  if (numReactants === 2 && numProducts === 2) {
    if (isDoubleReplacement(equation)) {
      return 'double_replacement';
    }
  }
  
  // Default to synthesis if unclear
  return 'synthesis';
}

/**
 * Check if a reaction is a combustion reaction
 * 
 * Combustion reactions have:
 * - Oxygen (O2) as a reactant
 * - Carbon dioxide (CO2) and water (H2O) as products
 * - A hydrocarbon or organic compound as the other reactant
 * 
 * @param equation - Chemical equation
 * @returns true if combustion, false otherwise
 */
function isCombustion(equation: {
  reactants: { formula: string; elements: { element: string; count: number }[] }[];
  products: { formula: string; elements: { element: string; count: number }[] }[];
}): boolean {
  // Check for O2 in reactants
  const hasO2 = equation.reactants.some(r => r.formula === 'O2');
  if (!hasO2) return false;
  
  // Check for CO2 in products
  const hasCO2 = equation.products.some(p => p.formula === 'CO2');
  
  // Check for H2O in products
  const hasH2O = equation.products.some(p => p.formula === 'H2O');
  
  // Check if there's a hydrocarbon (contains C and H)
  const hasHydrocarbon = equation.reactants.some(r => {
    const hasC = r.elements.some(e => e.element === 'C');
    const hasH = r.elements.some(e => e.element === 'H');
    return hasC && hasH;
  });
  
  // Combustion typically produces CO2 and H2O
  return hasCO2 && hasH2O && hasHydrocarbon;
}

/**
 * Check if a reaction is a single replacement reaction
 * 
 * Single replacement has:
 * - 2 reactants, 2 products
 * - One reactant is a single element (only one element type)
 * - One reactant is a compound (multiple element types)
 * - Products follow the pattern: element swaps with one element in compound
 * 
 * @param equation - Chemical equation
 * @returns true if single replacement, false otherwise
 */
function isSingleReplacement(equation: {
  reactants: { formula: string; elements: { element: string; count: number }[] }[];
  products: { formula: string; elements: { element: string; count: number }[] }[];
}): boolean {
  // Check if one reactant is a single element
  const singleElementReactants = equation.reactants.filter(r => r.elements.length === 1);
  const compoundReactants = equation.reactants.filter(r => r.elements.length > 1);
  
  // Should have exactly 1 single element and 1 compound
  if (singleElementReactants.length !== 1 || compoundReactants.length !== 1) {
    return false;
  }
  
  // Check products - should have 1 single element and 1 compound
  const singleElementProducts = equation.products.filter(p => p.elements.length === 1);
  const compoundProducts = equation.products.filter(p => p.elements.length > 1);
  
  return singleElementProducts.length === 1 && compoundProducts.length === 1;
}

/**
 * Check if a reaction is a double replacement reaction
 * 
 * Double replacement has:
 * - 2 reactants, 2 products
 * - Both reactants are compounds (multiple element types)
 * - Both products are compounds
 * - Elements exchange partners (AB + CD → AD + CB)
 * 
 * @param equation - Chemical equation
 * @returns true if double replacement, false otherwise
 */
function isDoubleReplacement(equation: {
  reactants: { formula: string; elements: { element: string; count: number }[] }[];
  products: { formula: string; elements: { element: string; count: number }[] }[];
}): boolean {
  // Both reactants should be compounds (more than 1 element type)
  const allReactantsAreCompounds = equation.reactants.every(r => r.elements.length > 1);
  
  // Both products should be compounds
  const allProductsAreCompounds = equation.products.every(p => p.elements.length > 1);
  
  return allReactantsAreCompounds && allProductsAreCompounds;
}

/**
 * Analyze reaction pattern and return detailed classification info
 * 
 * This function provides more detailed information about the reaction,
 * including a confidence score and pattern description.
 * 
 * Requirements: 3.2, 5.1
 * 
 * @param equation - Chemical equation to analyze
 * @returns Object with reaction type, confidence, and pattern description
 */
export function analyzeReactionPattern(equation: {
  reactants: { formula: string; elements: { element: string; count: number }[] }[];
  products: { formula: string; elements: { element: string; count: number }[] }[];
}): {
  type: string;
  confidence: number;
  pattern: string;
  description: string;
} {
  const type = classifyReaction(equation);
  const numReactants = equation.reactants.length;
  const numProducts = equation.products.length;
  
  let confidence = 0.8; // Default confidence
  let pattern = '';
  let description = '';
  
  switch (type) {
    case 'synthesis':
      pattern = 'A + B → AB';
      description = `${numReactants} reactants combine into ${numProducts} product`;
      confidence = numReactants >= 2 && numProducts === 1 ? 0.95 : 0.7;
      break;
      
    case 'decomposition':
      pattern = 'AB → A + B';
      description = `${numReactants} reactant breaks into ${numProducts} products`;
      confidence = numReactants === 1 && numProducts >= 2 ? 0.95 : 0.7;
      break;
      
    case 'single_replacement':
      pattern = 'A + BC → AC + B';
      description = 'One element replaces another in a compound';
      confidence = 0.85;
      break;
      
    case 'double_replacement':
      pattern = 'AB + CD → AD + CB';
      description = 'Two compounds exchange parts';
      confidence = 0.85;
      break;
      
    case 'combustion':
      pattern = 'CₓHᵧ + O₂ → CO₂ + H₂O';
      description = 'Hydrocarbon burns with oxygen';
      confidence = 0.95;
      break;
      
    default:
      pattern = 'Unknown';
      description = 'Unable to classify reaction';
      confidence = 0.5;
  }
  
  return { type, confidence, pattern, description };
}
