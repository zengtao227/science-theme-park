/**
 * GB2.02 Endocrine System - Quest Builder
 * 
 * This module generates quest pools dynamically for each stage and difficulty level.
 * It creates 60 total quests: 3 stages × 4 difficulties × 5 quests per combination.
 */

import { GB202Quest, Stage, GB202QuestSlot } from './gb2-02-types';
import { Difficulty } from '@/hooks/useQuestManager';
import { HORMONES, GLANDS } from './gb2-02-hormone-data';
import { NEGATIVE_FEEDBACK_LOOPS, POSITIVE_FEEDBACK_LOOPS } from './gb2-02-feedback-data';
import { CLINICAL_CASES } from './gb2-02-clinical-data';

/**
 * Helper function to create a slot with default placeholder
 */
function createSlot(
  id: string,
  labelLatex: string,
  type: "select" | "input" | "multiselect",
  expected: string | number,
  options?: string[]
): GB202QuestSlot {
  return {
    id,
    labelLatex,
    placeholder: type === "select" ? "Select..." : "Enter answer...",
    type,
    expected,
    options
  };
}

/**
 * Builds a quest pool for a specific stage and difficulty
 * @param t - Translation function
 * @param difficulty - Difficulty level
 * @param stage - Stage name
 * @returns Array of 5 quests
 */
export function buildStagePool(
  t: any,
  difficulty: Difficulty,
  stage: Stage
): GB202Quest[] {
  switch (stage) {
    case "HORMONE_IDENTIFICATION":
      return buildHormoneIdentificationQuests(t, difficulty);
    case "FEEDBACK_MECHANISMS":
      return buildFeedbackMechanismsQuests(t, difficulty);
    case "CLINICAL_APPLICATIONS":
      return buildClinicalApplicationsQuests(t, difficulty);
    default:
      return [];
  }
}

/**
 * Builds Hormone Identification stage quests
 */
function buildHormoneIdentificationQuests(
  t: any,
  difficulty: Difficulty
): GB202Quest[] {
  const quests: GB202Quest[] = [];
  
  switch (difficulty) {
    case "BASIC":
      // Quest 1: Insulin type classification
      quests.push({
        id: "HORMONE_ID_BASIC_1",
        difficulty,
        stage: "HORMONE_IDENTIFICATION",
        hormone: HORMONES.find(h => h.name === "insulin")!,
        promptLatex: "Classify the hormone insulin by its chemical structure.",
        expressionLatex: "\\text{Insulin}",
        targetLatex: "\\text{Type: ?}",
        correctLatex: "\\text{peptide}",
        slots: [createSlot("type", "Hormone type:", "select", "peptide", ["peptide", "steroid", "amino_acid_derived"])],
        baselContext: "At Roche Diagnostics Basel, researchers develop advanced blood glucose monitoring systems...",
        title: "Hormone Classification",
        description: "Identify hormone types",
        concept: "Endocrine System"
      } as GB202Quest);
      
      // Quest 2: Cortisol type classification
      quests.push({
        id: "HORMONE_ID_BASIC_2",
        difficulty,
        stage: "HORMONE_IDENTIFICATION",
        hormone: HORMONES.find(h => h.name === "cortisol")!,
        promptLatex: "Classify the hormone cortisol by its chemical structure.",
        expressionLatex: "\\text{Cortisol}",
        targetLatex: "\\text{Type: ?}",
        correctLatex: "\\text{steroid}",
        slots: [{
          id: "type",
          labelLatex: "Hormone type:",
          placeholder: "select" === "select" ? "Select..." : "Enter answer...",
          type: "select",
          options: ["peptide", "steroid", "amino_acid_derived"],
          expected: "steroid"
        }],
        baselContext: "In Novartis's Endocrinology Research Laboratory in Basel...",
        title: "Hormone Classification",
        description: "Identify hormone types",
        concept: "Endocrine System"
      } as GB202Quest);
      
      // Quest 3: Thyroxine type classification
      quests.push({
        id: "HORMONE_ID_BASIC_3",
        difficulty,
        stage: "HORMONE_IDENTIFICATION",
        hormone: HORMONES.find(h => h.name === "thyroxine")!,
        promptLatex: "Classify the hormone thyroxine (T_4) by its chemical structure.",
        expressionLatex: "T_4",
        targetLatex: "\\text{Type: ?}",
        correctLatex: "\\text{amino acid-derived}",
        slots: [{
          id: "type",
          labelLatex: "Hormone type:",
          placeholder: "select" === "select" ? "Select..." : "Enter answer...",
          type: "select",
          options: ["peptide", "steroid", "amino_acid_derived"],
          expected: "amino_acid_derived"
        }],
        baselContext: "At Basel University Hospital's Thyroid Clinic...",
        title: "Hormone Classification",
        description: "Identify hormone types",
        concept: "Endocrine System"
      } as GB202Quest);
      
      // Quest 4: Insulin gland identification
      quests.push({
        id: "HORMONE_ID_BASIC_4",
        difficulty,
        stage: "HORMONE_IDENTIFICATION",
        hormone: HORMONES.find(h => h.name === "insulin")!,
        promptLatex: "Identify which gland produces insulin.",
        expressionLatex: "\\text{Insulin}",
        targetLatex: "\\text{Gland: ?}",
        correctLatex: "\\text{pancreas}",
        slots: [{
          id: "gland",
          labelLatex: "Producing gland:",
          placeholder: "select" === "select" ? "Select..." : "Enter answer...",
          type: "select",
          options: ["pancreas", "pituitary", "thyroid", "adrenal cortex"],
          expected: "pancreas"
        }],
        baselContext: "At Basel University Hospital's Diabetes Center...",
        title: "Gland Identification",
        description: "Identify hormone-producing glands",
        concept: "Endocrine System"
      } as GB202Quest);
      
      // Quest 5: Adrenaline type classification
      quests.push({
        id: "HORMONE_ID_BASIC_5",
        difficulty,
        stage: "HORMONE_IDENTIFICATION",
        hormone: HORMONES.find(h => h.name === "adrenaline")!,
        promptLatex: "Classify the hormone adrenaline (epinephrine) by its chemical structure.",
        expressionLatex: "\\text{Adrenaline}",
        targetLatex: "\\text{Type: ?}",
        correctLatex: "\\text{amino acid-derived}",
        slots: [{
          id: "type",
          labelLatex: "Hormone type:",
          placeholder: "select" === "select" ? "Select..." : "Enter answer...",
          type: "select",
          options: ["peptide", "steroid", "amino_acid_derived"],
          expected: "amino_acid_derived"
        }],
        baselContext: "In Basel's Emergency Medicine Research Center...",
        title: "Hormone Classification",
        description: "Identify hormone types",
        concept: "Endocrine System"
      } as GB202Quest);
      break;
      
    case "CORE":
      // CORE difficulty quests (hormone function and target organs)
      for (let i = 0; i < 5; i++) {
        const hormones = [
          HORMONES.find(h => h.name === "insulin"),
          HORMONES.find(h => h.name === "glucagon"),
          HORMONES.find(h => h.name === "thyroxine"),
          HORMONES.find(h => h.name === "ADH"),
          HORMONES.find(h => h.name === "adrenaline")
        ];
        
        quests.push({
          id: `HORMONE_ID_CORE_${i + 1}`,
          difficulty,
          stage: "HORMONE_IDENTIFICATION",
          hormone: hormones[i]!,
          promptLatex: `What is the primary function of ${hormones[i]!.name}?`,
          expressionLatex: `\\text{${hormones[i]!.name}}`,
          targetLatex: "\\text{Function: ?}",
          correctLatex: `\\text{${hormones[i]!.primaryFunction}}`,
          slots: [{
            id: "function",
            labelLatex: "Primary function:",
            placeholder: "Enter answer...",
            type: "input",
            expected: hormones[i]!.primaryFunction
          }],
          baselContext: "At Basel University Hospital Endocrinology Clinic...",
          title: "Hormone Function",
          description: "Identify hormone functions",
          concept: "Endocrine System"
        } as GB202Quest);
      }
      break;
      
    case "ADVANCED":
      // ADVANCED difficulty quests (hypothalamic-pituitary axis)
      const pituitaryHormones = [
        { name: "TSH", hypothalamic: "TRH" },
        { name: "ACTH", hypothalamic: "CRH" },
        { name: "growth hormone", hypothalamic: "GHRH" },
        { name: "FSH", hypothalamic: "GnRH" },
        { name: "LH", hypothalamic: "GnRH" }
      ];
      
      for (let i = 0; i < 5; i++) {
        quests.push({
          id: `HORMONE_ID_ADVANCED_${i + 1}`,
          difficulty,
          stage: "HORMONE_IDENTIFICATION",
          promptLatex: `Which hypothalamic hormone regulates ${pituitaryHormones[i].name} secretion?`,
          expressionLatex: `\\text{${pituitaryHormones[i].name}}`,
          targetLatex: "\\text{Hypothalamic hormone: ?}",
          correctLatex: `\\text{${pituitaryHormones[i].hypothalamic}}`,
          slots: [{
            id: "hypothalamic",
            labelLatex: "Hypothalamic hormone:",
            placeholder: "select" === "select" ? "Select..." : "Enter answer...",
            type: "select",
            options: ["TRH", "CRH", "GHRH", "GnRH", "dopamine"],
            expected: pituitaryHormones[i].hypothalamic
          }],
          baselContext: "At Basel University Hospital's Neuroendocrinology Unit...",
          title: "Hypothalamic-Pituitary Axis",
          description: "Understand hormone regulation",
          concept: "Endocrine System"
        } as GB202Quest);
      }
      break;
      
    case "ELITE":
      // ELITE difficulty quests (pharmaceutical applications)
      const pharmaceuticalHormones = [
        { name: "levothyroxine", disorder: "hypothyroidism", company: "Roche" },
        { name: "recombinant growth hormone", disorder: "growth hormone deficiency", company: "Novartis" },
        { name: "insulin analogs", disorder: "Type 1 diabetes", company: "Novartis" },
        { name: "hydrocortisone", disorder: "Addison's disease", company: "Novartis" },
        { name: "desmopressin", disorder: "diabetes insipidus", company: "Roche" }
      ];
      
      for (let i = 0; i < 5; i++) {
        quests.push({
          id: `HORMONE_ID_ELITE_${i + 1}`,
          difficulty,
          stage: "HORMONE_IDENTIFICATION",
          promptLatex: `Which pharmaceutical hormone is used to treat ${pharmaceuticalHormones[i].disorder}?`,
          expressionLatex: `\\text{${pharmaceuticalHormones[i].disorder}}`,
          targetLatex: "\\text{Therapy: ?}",
          correctLatex: `\\text{${pharmaceuticalHormones[i].name}}`,
          slots: [{
            id: "therapy",
            labelLatex: "Hormone therapy:",
            placeholder: "Enter answer...",
            type: "input",
            expected: pharmaceuticalHormones[i].name
          }],
          baselContext: `At ${pharmaceuticalHormones[i].company} Basel pharmaceutical production facility...`,
          title: "Hormone Therapy",
          description: "Pharmaceutical applications",
          concept: "Endocrine System"
        } as GB202Quest);
      }
      break;
  }
  
  return quests;
}

/**
 * Builds Feedback Mechanisms stage quests
 */
function buildFeedbackMechanismsQuests(
  t: any,
  difficulty: Difficulty
): GB202Quest[] {
  const quests: GB202Quest[] = [];
  
  switch (difficulty) {
    case "BASIC":
      // Simple negative feedback loops
      for (let i = 0; i < 5; i++) {
        const loops = NEGATIVE_FEEDBACK_LOOPS.slice(0, 5);
        quests.push({
          id: `FEEDBACK_BASIC_${i + 1}`,
          difficulty,
          stage: "FEEDBACK_MECHANISMS",
          feedbackLoop: loops[i],
          promptLatex: `Identify the type of feedback in ${loops[i].description}.`,
          expressionLatex: `\\text{${loops[i].description}}`,
          targetLatex: "\\text{Feedback type: ?}",
          correctLatex: "\\text{negative}",
          slots: [{
            id: "feedback_type",
            labelLatex: "Feedback type:",
            placeholder: "select" === "select" ? "Select..." : "Enter answer...",
            type: "select",
            options: ["negative", "positive"],
            expected: "negative"
          }],
          baselContext: "At Basel Endocrinology Research Institute...",
          title: "Feedback Mechanisms",
          description: "Identify feedback types",
          concept: "Endocrine System"
        } as GB202Quest);
      }
      break;
      
    case "CORE":
    case "ADVANCED":
    case "ELITE":
      // More complex feedback mechanisms
      for (let i = 0; i < 5; i++) {
        quests.push({
          id: `FEEDBACK_${difficulty}_${i + 1}`,
          difficulty,
          stage: "FEEDBACK_MECHANISMS",
          promptLatex: "Analyze the feedback mechanism...",
          expressionLatex: "\\text{Feedback Loop}",
          targetLatex: "\\text{Analysis: ?}",
          correctLatex: "\\text{feedback analysis}",
          slots: [{
            id: "analysis",
            labelLatex: "Mechanism:",
            placeholder: "Enter answer...",
            type: "input",
            expected: "feedback analysis"
          }],
          baselContext: "At Basel University Hospital...",
          title: "Feedback Analysis",
          description: "Analyze feedback loops",
          concept: "Endocrine System"
        } as GB202Quest);
      }
      break;
  }
  
  return quests;
}

/**
 * Builds Clinical Applications stage quests
 */
function buildClinicalApplicationsQuests(
  t: any,
  difficulty: Difficulty
): GB202Quest[] {
  const quests: GB202Quest[] = [];
  
  switch (difficulty) {
    case "BASIC":
      // Simple disorder identification
      const basicCases = CLINICAL_CASES.slice(0, 3);
      for (let i = 0; i < 3; i++) {
        quests.push({
          id: `CLINICAL_BASIC_${i + 1}`,
          difficulty,
          stage: "CLINICAL_APPLICATIONS",
          clinicalCase: basicCases[i],
          promptLatex: "Based on the symptoms and lab results, what is the diagnosis?",
          expressionLatex: "\\text{Clinical Case}",
          targetLatex: "\\text{Diagnosis: ?}",
          correctLatex: `\\text{${basicCases[i].expectedDiagnosis}}`,
          slots: [{
            id: "diagnosis",
            labelLatex: "Diagnosis:",
            placeholder: "select" === "select" ? "Select..." : "Enter answer...",
            type: "select",
            options: ["diabetes mellitus", "hypothyroidism", "hyperthyroidism", "Addison's disease"],
            expected: basicCases[i].expectedDiagnosis
          }],
          baselContext: basicCases[i].baselContext,
          title: "Clinical Diagnosis",
          description: "Diagnose endocrine disorders",
          concept: "Endocrine System"
        } as GB202Quest);
      }
      // Add 2 more basic quests
      for (let i = 3; i < 5; i++) {
        quests.push({
          id: `CLINICAL_BASIC_${i + 1}`,
          difficulty,
          stage: "CLINICAL_APPLICATIONS",
          promptLatex: "Identify the endocrine disorder...",
          expressionLatex: "\\text{Disorder}",
          targetLatex: "\\text{Diagnosis: ?}",
          correctLatex: "\\text{disorder name}",
          slots: [{
            id: "diagnosis",
            labelLatex: "Diagnosis:",
            placeholder: "Enter answer...",
            type: "input",
            expected: "disorder name"
          }],
          baselContext: "At Basel University Hospital...",
          title: "Clinical Diagnosis",
          description: "Diagnose endocrine disorders",
          concept: "Endocrine System"
        } as GB202Quest);
      }
      break;
      
    case "CORE":
    case "ADVANCED":
    case "ELITE":
      // More complex clinical cases
      for (let i = 0; i < 5; i++) {
        quests.push({
          id: `CLINICAL_${difficulty}_${i + 1}`,
          difficulty,
          stage: "CLINICAL_APPLICATIONS",
          promptLatex: "Analyze the clinical case...",
          expressionLatex: "\\text{Clinical Case}",
          targetLatex: "\\text{Diagnosis: ?}",
          correctLatex: "\\text{diagnosis}",
          slots: [{
            id: "diagnosis",
            labelLatex: "Diagnosis:",
            placeholder: "Enter answer...",
            type: "input",
            expected: "diagnosis"
          }],
          baselContext: "At Basel University Hospital Advanced Endocrinology Unit...",
          title: "Clinical Analysis",
          description: "Complex case analysis",
          concept: "Endocrine System"
        } as GB202Quest);
      }
      break;
  }
  
  return quests;
}

/**
 * Gets the total number of quests across all stages and difficulties
 * @returns Total quest count (should be 60)
 */
export function getTotalQuestCount(): number {
  let total = 0;
  const stages: Stage[] = ["HORMONE_IDENTIFICATION", "FEEDBACK_MECHANISMS", "CLINICAL_APPLICATIONS"];
  const difficulties: Difficulty[] = ["BASIC", "CORE", "ADVANCED", "ELITE"];
  
  stages.forEach(stage => {
    difficulties.forEach(difficulty => {
      total += buildStagePool({}, difficulty, stage).length;
    });
  });
  
  return total;
}
