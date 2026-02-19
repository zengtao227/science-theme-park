/**
 * SC2.07 Enthalpy & Energetics - Quest Builder
 * 
 * Builds quest pools for all stages and difficulties using full quest data
 * 
 * Requirements: 14.2, 14.6
 */

import { SC207Quest, Stage, ThermochemicalReaction } from './sc2-07-types';
import { Difficulty } from '@/hooks/useQuestManager';
import { createCompound, formatEquationToLatex } from './sc2-07-utils';
import {
  energyChangesBasic,
  energyChangesCore,
  energyChangesAdvanced,
  energyChangesElite,
  hessLawBasic,
  hessLawCore,
  hessLawAdvanced,
  hessLawElite,
  calorimetryBasic,
  calorimetryCore,
  calorimetryAdvanced,
  calorimetryElite,
} from './sc2-07-quest-data';

/**
 * Build quest pool for a specific stage and difficulty
 * Returns 5 quests per stage/difficulty combination
 * 
 * Requirements: 14.2
 * Property 2: Quest Pool Size Consistency
 */
export function buildStagePool(
  t: any,
  difficulty: Difficulty,
  stage: Stage
): SC207Quest[] {
  // Get the appropriate data array based on stage and difficulty
  let rawData: any[];
  
  if (stage === 'ENERGY_CHANGES') {
    switch (difficulty) {
      case 'BASIC': rawData = energyChangesBasic; break;
      case 'CORE': rawData = energyChangesCore; break;
      case 'ADVANCED': rawData = energyChangesAdvanced; break;
      case 'ELITE': rawData = energyChangesElite; break;
      default: rawData = energyChangesBasic;
    }
  } else if (stage === 'HESS_LAW') {
    switch (difficulty) {
      case 'BASIC': rawData = hessLawBasic; break;
      case 'CORE': rawData = hessLawCore; break;
      case 'ADVANCED': rawData = hessLawAdvanced; break;
      case 'ELITE': rawData = hessLawElite; break;
      default: rawData = hessLawBasic;
    }
  } else { // CALORIMETRY
    switch (difficulty) {
      case 'BASIC': rawData = calorimetryBasic; break;
      case 'CORE': rawData = calorimetryCore; break;
      case 'ADVANCED': rawData = calorimetryAdvanced; break;
      case 'ELITE': rawData = calorimetryElite; break;
      default: rawData = calorimetryBasic;
    }
  }
  
  // Convert raw data to quest objects
  return rawData.map(data => buildQuestFromData(t, data, difficulty, stage));
}

/**
 * Build a quest from raw data
 */
function buildQuestFromData(
  t: any,
  data: any,
  difficulty: Difficulty,
  stage: Stage
): SC207Quest {
  // Generate required Quest interface fields
  const equationLatex = data.reactionLatex || data.targetReactionLatex || '';
  const expressionLatex = equationLatex; // Use equation as expression context
  const targetLatex = stage === 'ENERGY_CHANGES'
    ? '\\Delta H = [value] kJ'
    : stage === 'HESS_LAW'
    ? '\\Delta H = [value] kJ (using Hess\'s Law)'
    : 'q = [value] J';
  const correctLatex = stage === 'CALORIMETRY'
    ? `${data.calorimetryData?.heat || 0} J`
    : `${data.deltaH || data.targetDeltaH || 0} kJ`;
  
  const quest: SC207Quest = {
    id: data.id,
    difficulty,
    stage,
    reaction: {
      reactants: [],
      products: [],
      coefficients: [],
      deltaH: data.deltaH || data.targetDeltaH || 0,
      stateSymbols: []
    },
    promptLatex: getPromptForStage(stage),
    equationLatex,
    expressionLatex,
    targetLatex,
    correctLatex,
    baselContext: data.baselContext || '',
    reactionType: data.reactionType || 'exothermic',
    slots: [] // Will be populated below
  };

  // Add stage-specific data
  if (stage === 'ENERGY_CHANGES') {
    quest.deltaH = data.deltaH;
    quest.slots = [{
      id: 'deltaH',
      labelLatex: '\\Delta H',
      placeholder: 'Enter value',
      expected: data.deltaH,
      unit: 'kJ'
    }];
    if (difficulty === 'ADVANCED' || difficulty === 'ELITE') {
      quest.activationEnergy = data.activationEnergy || 75;
    }
  } else if (stage === 'HESS_LAW') {
    // Convert raw Hess data to proper format
    quest.hessData = {
      targetEquation: {
        id: 'target',
        equation: data.targetReaction || '',
        equationLatex: data.targetReactionLatex || '',
        deltaH: data.targetDeltaH || 0,
        reversed: false,
        multiplier: 1
      },
      availableEquations: (data.availableEquations || []).map((eq: any, index: number) => ({
        id: `eq${index + 1}`,
        equation: eq.equation || '',
        equationLatex: eq.equationLatex || '',
        deltaH: eq.deltaH || 0,
        reversed: false,
        multiplier: 1
      })),
      correctPathway: [],
      totalDeltaH: data.targetDeltaH || 0
    };
    quest.deltaH = data.targetDeltaH;
    quest.slots = [{
      id: 'deltaH',
      labelLatex: '\\Delta H',
      placeholder: 'Enter value',
      expected: data.targetDeltaH,
      unit: 'kJ'
    }];
  } else if (stage === 'CALORIMETRY') {
    quest.calorimetryData = data.calorimetryData;
    quest.slots = [{
      id: 'heat',
      labelLatex: 'q',
      placeholder: 'Enter value',
      expected: data.calorimetryData.heat,
      unit: 'J'
    }];
  }

  return quest;
}

/**
 * Get prompt text for each stage
 */
function getPromptForStage(stage: Stage): string {
  switch (stage) {
    case 'ENERGY_CHANGES':
      return 'Calculate the enthalpy change (\\Delta H) for this reaction:';
    case 'HESS_LAW':
      return 'Use Hess\'s Law to calculate \\Delta H for the target reaction:';
    case 'CALORIMETRY':
      return 'Calculate the heat change using q = mc\\Delta T:';
    default:
      return 'Solve the problem:';
  }
}
