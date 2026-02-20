/**
 * SC1.06 Chemical Reactions Basics - Quest Builder
 * 
 * This file contains the buildStagePool function that generates quest pools
 * for each stage and difficulty level.
 * 
 * Requirements: 1.5, 2.5, 3.4, 11.2, 1.4, 12.4, 12.5, 12.6, 12.7, 12.8
 */

import { SC106Quest, Stage, Difficulty, ChemicalEquation } from './sc1-06-types';
import { getQuestData } from './sc1-06-quest-data';
import { createCompound, formulaToLatex } from './sc1-06-utils';

/**
 * Build a quest pool for a specific stage and difficulty
 * 
 * This function:
 * 1. Filters quest data by stage and difficulty
 * 2. Maps raw data to SC106Quest objects with unique IDs
 * 3. Generates LaTeX strings for equations using formulaToLatex()
 * 4. Returns exactly `count` quests (typically 5 per stage/difficulty)
 * 
 * Requirements: 1.5, 2.5, 3.4, 11.2
 * 
 * @param t - Translation function (for consistency with other modules)
 * @param difficulty - Difficulty level (BASIC, CORE, ADVANCED, ELITE)
 * @param stage - Stage type (REACTION_TYPES, EQUATION_BALANCING, REACTION_SIMULATION)
 * @param count - Number of quests to return (default: 5)
 * @returns Array of SC106Quest objects
 */
export function buildStagePool(
  t: any,
  difficulty: Difficulty,
  stage: Stage,
  count: number = 5
): SC106Quest[] {
  // Get raw quest data for this stage and difficulty
  const rawData = getQuestData(stage, difficulty);

  if (!rawData || rawData.length === 0) {
    console.warn(`No quest data found for stage ${stage}, difficulty ${difficulty}`);
    return [];
  }

  // Take exactly `count` quests (or all available if less than count)
  const selectedData = rawData.slice(0, count);

  // Map raw data to SC106Quest objects
  const quests: SC106Quest[] = selectedData.map((data, index) => {
    // Create Compound objects for reactants and products
    const reactantCompounds = data.reactants.map(formula => createCompound(formula));
    const productCompounds = data.products.map(formula => createCompound(formula));

    // Build ChemicalEquation object
    const equation: ChemicalEquation = {
      reactants: reactantCompounds,
      products: productCompounds,
      coefficients: data.coefficients,
      type: data.type
    };

    // Generate LaTeX string for the equation
    const equationLatex = generateEquationLatex(
      reactantCompounds.map(c => c.formulaLatex),
      productCompounds.map(c => c.formulaLatex),
      data.coefficients
    );

    // Generate prompt based on stage
    const promptText = t ? t(`sc1_06.prompts.${stage}`) : "";
    const promptLatex = generatePromptLatex(stage, equation, promptText);

    // Generate slots based on stage
    const slots = generateSlots(stage, equation, data, t);

    // Generate required Quest interface fields
    const expressionLatex = equationLatex; // Use equation as expression context
    const initialTargetLatex = stage === 'REACTION_TYPES'
      ? 'Reaction type: [type]'
      : stage === 'EQUATION_BALANCING'
        ? 'Balanced coefficients'
        : 'Reaction identification';
    const correctLatex = stage === 'REACTION_TYPES'
      ? data.type
      : stage === 'EQUATION_BALANCING'
        ? data.coefficients.join(', ')
        : data.type;

    // Build the quest object
    const finalContext = t ? t(`sc1_06.contexts.${data.id}`) : data.baselContext;
    const quest: SC106Quest = {
      id: data.id,
      difficulty,
      stage,
      equation,
      reactants: data.reactants,
      products: data.products,
      coefficients: data.coefficients,
      reactionType: data.type,
      promptLatex,
      equationLatex,
      expressionLatex,
      targetLatex: `\\\\text{${t ? t("sc1_06.labels.target") : initialTargetLatex}}`,
      correctLatex,
      energyChange: data.energyChange,
      baselContext: t(`sc1_06.contexts.${data.id}`),
      slots
    };

    return quest;
  });

  return quests;
}

/**
 * Generate LaTeX string for a chemical equation
 * 
 * Combines reactant and product LaTeX strings with coefficients and arrow.
 * Uses four-backslash standard: \\\\text{}, \\\\rightarrow
 * 
 * Example:
 * - Reactants: ["\\\\text{H}_2", "\\\\text{O}_2"]
 * - Products: ["\\\\text{H}_2\\\\text{O}"]
 * - Coefficients: [2, 1, 2]
 * - Result: "2\\\\text{H}_2 + \\\\text{O}_2 \\\\rightarrow 2\\\\text{H}_2\\\\text{O}"
 * 
 * Requirements: 1.4, 12.4, 12.5, 12.6, 12.7, 12.8
 * 
 * @param reactantLatexStrings - Array of LaTeX strings for reactants
 * @param productLatexStrings - Array of LaTeX strings for products
 * @param coefficients - Array of coefficients (reactants first, then products)
 * @returns Complete equation LaTeX string
 */
function generateEquationLatex(
  reactantLatexStrings: string[],
  productLatexStrings: string[],
  coefficients: number[]
): string {
  // Build reactant side
  const reactantSide = reactantLatexStrings.map((latex, index) => {
    const coeff = coefficients[index];
    // Only show coefficient if it's greater than 1
    return coeff > 1 ? `${coeff}${latex}` : latex;
  }).join(' + ');

  // Build product side
  const productStartIndex = reactantLatexStrings.length;
  const productSide = productLatexStrings.map((latex, index) => {
    const coeff = coefficients[productStartIndex + index];
    // Only show coefficient if it's greater than 1
    return coeff > 1 ? `${coeff}${latex}` : latex;
  }).join(' + ');

  // Combine with arrow (using four backslashes)
  return `${reactantSide} \\\\rightarrow ${productSide}`;
}

/**
 * Generate prompt text based on stage
 * 
 * @param stage - Current stage
 * @param equation - Chemical equation
 * @returns Prompt LaTeX string
 */
function generatePromptLatex(stage: Stage, equation: ChemicalEquation, translatedText?: string): string {
  if (translatedText && !translatedText.includes("sc1_06")) {
    return `\\\\text{${translatedText}}`;
  }
  switch (stage) {
    case 'REACTION_TYPES':
      return '\\\\text{Classify this chemical reaction:}';

    case 'EQUATION_BALANCING':
      return '\\\\text{Balance this chemical equation by entering the correct coefficients:}';

    case 'REACTION_SIMULATION':
      return '\\\\text{Observe the molecular animation and identify the reaction:}';

    default:
      return '\\\\text{Analyze this chemical reaction:}';
  }
}

/**
 * Generate input slots based on stage
 * 
 * @param stage - Current stage
 * @param equation - Chemical equation
 * @param data - Raw quest data
 * @returns Array of slot objects
 */
function generateSlots(
  stage: Stage,
  equation: ChemicalEquation,
  data: any,
  t?: any
): Array<{ id: string; labelLatex: string; placeholder: string; expected: string | number }> {
  const slots: Array<{ id: string; labelLatex: string; placeholder: string; expected: string | number }> = [];

  switch (stage) {
    case 'EQUATION_BALANCING':
      // Create slots for each compound's coefficient
      equation.reactants.forEach((compound, index) => {
        slots.push({
          id: `reactant_${index}`,
          labelLatex: compound.formulaLatex,
          placeholder: '1',
          expected: data.coefficients[index]
        });
      });

      equation.products.forEach((compound, index) => {
        const coeffIndex = equation.reactants.length + index;
        slots.push({
          id: `product_${index}`,
          labelLatex: compound.formulaLatex,
          placeholder: '1',
          expected: data.coefficients[coeffIndex]
        });
      });
      break;

    case 'REACTION_TYPES':
      // Single slot for reaction type selection
      slots.push({
        id: 'reaction_type',
        labelLatex: 'Reaction Type',
        placeholder: 'Select type',
        expected: data.type
      });
      break;

    case 'REACTION_SIMULATION':
      // Slots for identifying reactants and products
      slots.push({
        id: 'reaction_type',
        labelLatex: 'Reaction Type',
        placeholder: 'Select type',
        expected: data.type
      });
      break;
  }

  return slots;
}
