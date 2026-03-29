/**
 * SC2.07 Enthalpy & Energetics - Quest Builder
 * 
 * Builds quest pools for all stages and difficulties using full quest data
 * 
 * Requirements: 14.2, 14.6
 */

import { SC207Quest, Stage } from './sc2-07-types';
import { Difficulty } from '@/hooks/useQuestManager';
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

function buildCalorimetryData(data: any) {
  const tempChange = (data.finalTemp || 0) - (data.initialTemp || 0);
  const solutionHeat = (data.mass || 0) * (data.specificHeat || 0) * tempChange;
  const calorimeterHeat = (data.calorimeterCapacity || 0) * tempChange;
  const heat = solutionHeat + calorimeterHeat;
  const deltaH = data.moles ? -(heat / data.moles) / 1000 : undefined;

  return {
    mass: data.mass || 0,
    specificHeat: data.specificHeat || 0,
    initialTemp: data.initialTemp || 0,
    finalTemp: data.finalTemp || 0,
    tempChange,
    heat,
    moles: data.moles,
    deltaH,
    calorimeterCapacity: data.calorimeterCapacity,
  };
}

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
  const targetLabel = t ? t("sc2_07.labels.target") : "sc2_07.labels.target";
  const targetLatex = `\\\\text{${targetLabel}}`;
  const calorimetryData = stage === 'CALORIMETRY' ? buildCalorimetryData(data) : undefined;
  const calorimetryExpected: number = stage === 'CALORIMETRY'
    ? ((difficulty === 'CORE' || difficulty === 'ELITE')
        ? (calorimetryData?.deltaH ?? 0)
        : (calorimetryData?.heat ?? 0))
    : 0;
  const correctLatex = stage === 'CALORIMETRY'
    ? ((difficulty === 'CORE' || difficulty === 'ELITE')
        ? `${calorimetryData?.deltaH ?? 0} kJ\\,mol^{-1}`
        : `${calorimetryData?.heat ?? 0} J`)
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
    promptLatex: t(`sc2_07.prompts.${stage.toLowerCase()}`) || getPromptForStage(stage),
    equationLatex,
    expressionLatex,
    targetLatex,
    correctLatex,
    baselContext: t(`sc2_07.contexts.${data.id}`) || data.baselContext || '',
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
    quest.calorimetryData = calorimetryData;
    quest.slots = [{
      id: (difficulty === 'CORE' || difficulty === 'ELITE') ? 'deltaH' : 'heat',
      labelLatex: (difficulty === 'CORE' || difficulty === 'ELITE') ? '\\Delta H' : 'q',
      placeholder: 'Enter value',
      expected: calorimetryExpected,
      unit: (difficulty === 'CORE' || difficulty === 'ELITE') ? 'kJ/mol' : 'J'
    }];
    if (typeof calorimetryData?.deltaH === 'number') {
      quest.deltaH = calorimetryData.deltaH;
    }
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
