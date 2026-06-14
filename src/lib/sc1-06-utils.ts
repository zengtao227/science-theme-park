import { ElementCount, Compound } from './sc1-06-types';

const VALID_ELEMENTS = new Set([
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

type EquationLike = {
  reactants: { formula: string; elements: ElementCount[] }[];
  products: { formula: string; elements: ElementCount[] }[];
};

export function formulaToLatex(formula: string): string {
  if (!formula) return '';

  const chargeMatch = formula.match(/(\d?)([+-])$/);
  let mainFormula = formula;
  let charge = '';

  if (chargeMatch) {
    charge = chargeMatch[0];
    mainFormula = formula.slice(0, -charge.length);
  }

  let latex = '';
  let i = 0;

  while (i < mainFormula.length) {
    const char = mainFormula[i];

    if (char === '(' || char === ')') {
      latex += char;
      i++;
      continue;
    }

    if (char >= 'A' && char <= 'Z') {
      let element = char;
      i++;
      if (i < mainFormula.length && mainFormula[i] >= 'a' && mainFormula[i] <= 'z') {
        element += mainFormula[i];
        i++;
      }
      latex += `\\text{${element}}`;
      continue;
    }

    if (char >= '0' && char <= '9') {
      let number = '';
      while (i < mainFormula.length && mainFormula[i] >= '0' && mainFormula[i] <= '9') {
        number += mainFormula[i];
        i++;
      }
      latex += `_${number}`;
      continue;
    }

    i++;
  }

  return charge ? `${latex}^{${charge}}` : latex;
}

export function parseCompound(formula: string): ElementCount[] {
  const elementCounts = new Map<string, number>();
  const cleanFormula = formula.replace(/\d*[+-]$/, '');

  const parseSegment = (segment: string, multiplier = 1): void => {
    let i = 0;
    while (i < segment.length) {
      const char = segment[i];

      if (char === '(') {
        let depth = 1;
        let j = i + 1;
        while (j < segment.length && depth > 0) {
          if (segment[j] === '(') depth++;
          if (segment[j] === ')') depth--;
          j++;
        }
        const inside = segment.substring(i + 1, j - 1);
        let subMultiplier = '';
        while (j < segment.length && segment[j] >= '0' && segment[j] <= '9') {
          subMultiplier += segment[j];
          j++;
        }
        parseSegment(inside, multiplier * (subMultiplier ? parseInt(subMultiplier, 10) : 1));
        i = j;
        continue;
      }

      if (char >= 'A' && char <= 'Z') {
        let element = char;
        i++;
        if (i < segment.length && segment[i] >= 'a' && segment[i] <= 'z') {
          element += segment[i];
          i++;
        }
        let countStr = '';
        while (i < segment.length && segment[i] >= '0' && segment[i] <= '9') {
          countStr += segment[i];
          i++;
        }
        const count = countStr ? parseInt(countStr, 10) : 1;
        elementCounts.set(element, (elementCounts.get(element) || 0) + count * multiplier);
        continue;
      }

      i++;
    }
  };

  parseSegment(cleanFormula);
  return Array.from(elementCounts, ([element, count]) => ({ element, count }));
}

export function validateChemicalNotation(formula: string): boolean {
  if (!formula) return false;

  let parenDepth = 0;
  for (const char of formula) {
    if (char === '(') parenDepth++;
    if (char === ')') parenDepth--;
    if (parenDepth < 0) return false;
  }
  if (parenDepth !== 0) return false;

  let i = 0;
  while (i < formula.length) {
    const char = formula[i];
    if (char === '(' || char === ')' || (char >= '0' && char <= '9') || char === '+' || char === '-') {
      i++;
      continue;
    }

    if (char >= 'A' && char <= 'Z') {
      let element = char;
      i++;
      if (i < formula.length && formula[i] >= 'a' && formula[i] <= 'z') {
        element += formula[i];
        i++;
      }
      if (!VALID_ELEMENTS.has(element)) return false;
      continue;
    }

    return false;
  }

  return true;
}

export function createCompound(formula: string, name: string = ''): Compound {
  return {
    formula,
    formulaLatex: formulaToLatex(formula),
    name,
    elements: parseCompound(formula)
  };
}

export function calculateAtomCounts(
  equation: EquationLike,
  coefficients: number[]
): Map<string, { reactants: number; products: number }> {
  const atomCounts = new Map<string, { reactants: number; products: number }>();

  equation.reactants.forEach((compound, index) => {
    const coefficient = coefficients[index] || 1;
    compound.elements.forEach(({ element, count }) => {
      const current = atomCounts.get(element) || { reactants: 0, products: 0 };
      atomCounts.set(element, { ...current, reactants: current.reactants + count * coefficient });
    });
  });

  const productStartIndex = equation.reactants.length;
  equation.products.forEach((compound, index) => {
    const coefficient = coefficients[productStartIndex + index] || 1;
    compound.elements.forEach(({ element, count }) => {
      const current = atomCounts.get(element) || { reactants: 0, products: 0 };
      atomCounts.set(element, { ...current, products: current.products + count * coefficient });
    });
  });

  return atomCounts;
}

export function isEquationBalanced(
  atomCounts: Map<string, { reactants: number; products: number }>
): boolean {
  return Array.from(atomCounts.values()).every((counts) => counts.reactants === counts.products);
}

export function identifyUnbalancedElements(
  atomCounts: Map<string, { reactants: number; products: number }>
): string[] {
  return Array.from(atomCounts.entries())
    .filter(([, counts]) => counts.reactants !== counts.products)
    .map(([element]) => element);
}

export interface CoefficientValidationResult {
  valid: boolean;
  error?: string;
  value?: number;
}

export function validateCoefficient(input: string | number): CoefficientValidationResult {
  if (input === '' || input === null || input === undefined) {
    return { valid: true, value: 1 };
  }

  const inputStr = String(input).trim();
  if (!/^-?\d+\.?\d*$/.test(inputStr)) {
    return { valid: false, error: 'Please enter a positive integer' };
  }

  const numValue = Number(inputStr);
  if (Number.isNaN(numValue)) {
    return { valid: false, error: 'Please enter a positive integer' };
  }
  if (numValue <= 0) {
    return { valid: false, error: 'Coefficients must be positive integers (≥ 1)' };
  }
  if (!Number.isInteger(numValue)) {
    return { valid: false, error: 'Coefficients must be whole numbers' };
  }
  if (numValue > 100) {
    return { valid: true, value: numValue, error: 'Are you sure? This coefficient seems unusually large' };
  }

  return { valid: true, value: numValue };
}

export function classifyReaction(equation: EquationLike): string {
  const numReactants = equation.reactants.length;
  const numProducts = equation.products.length;

  if (isCombustion(equation)) return 'combustion';
  if (numReactants >= 2 && numProducts === 1) return 'synthesis';
  if (numReactants === 1 && numProducts >= 2) return 'decomposition';
  if (numReactants === 2 && numProducts === 2 && isSingleReplacement(equation)) return 'single_replacement';
  if (numReactants === 2 && numProducts === 2 && isDoubleReplacement(equation)) return 'double_replacement';
  return 'synthesis';
}

function isCombustion(equation: EquationLike): boolean {
  const hasO2 = equation.reactants.some(r => r.formula === 'O2');
  if (!hasO2) return false;
  const hasCO2 = equation.products.some(p => p.formula === 'CO2');
  const hasH2O = equation.products.some(p => p.formula === 'H2O');
  const hasHydrocarbon = equation.reactants.some(r => {
    const hasC = r.elements.some(e => e.element === 'C');
    const hasH = r.elements.some(e => e.element === 'H');
    return hasC && hasH;
  });
  return hasCO2 && hasH2O && hasHydrocarbon;
}

function isSingleReplacement(equation: EquationLike): boolean {
  const singleElementReactants = equation.reactants.filter(r => r.elements.length === 1);
  const compoundReactants = equation.reactants.filter(r => r.elements.length > 1);
  if (singleElementReactants.length !== 1 || compoundReactants.length !== 1) return false;
  const singleElementProducts = equation.products.filter(p => p.elements.length === 1);
  const compoundProducts = equation.products.filter(p => p.elements.length > 1);
  return singleElementProducts.length === 1 && compoundProducts.length === 1;
}

function isDoubleReplacement(equation: EquationLike): boolean {
  return equation.reactants.every(r => r.elements.length > 1) &&
    equation.products.every(p => p.elements.length > 1);
}

export function analyzeReactionPattern(equation: EquationLike): {
  type: string;
  confidence: number;
  pattern: string;
  description: string;
} {
  const type = classifyReaction(equation);
  const numReactants = equation.reactants.length;
  const numProducts = equation.products.length;

  switch (type) {
    case 'synthesis':
      return {
        type,
        confidence: numReactants >= 2 && numProducts === 1 ? 0.95 : 0.7,
        pattern: 'A + B → AB',
        description: `${numReactants} reactants combine into ${numProducts} product`,
      };
    case 'decomposition':
      return {
        type,
        confidence: numReactants === 1 && numProducts >= 2 ? 0.95 : 0.7,
        pattern: 'AB → A + B',
        description: `${numReactants} reactant breaks into ${numProducts} products`,
      };
    case 'single_replacement':
      return { type, confidence: 0.85, pattern: 'A + BC → AC + B', description: 'One element replaces another in a compound' };
    case 'double_replacement':
      return { type, confidence: 0.85, pattern: 'AB + CD → AD + CB', description: 'Two compounds exchange parts' };
    case 'combustion':
      return { type, confidence: 0.95, pattern: 'CₓHᵧ + O_2 → CO_2 + H_2O', description: 'Hydrocarbon burns with oxygen' };
    default:
      return { type, confidence: 0.5, pattern: 'Unknown', description: 'Unable to classify reaction' };
  }
}
