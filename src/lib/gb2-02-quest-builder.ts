/**
 * GB2.02 Endocrine System - Quest Builder
 * 
 * This module generates quest pools dynamically for each stage and difficulty level.
 * It creates 60 total quests: 3 stages × 4 difficulties × 5 quests per combination.
 */

import { GB202Quest, Stage, GB202QuestSlot } from './gb2-02-types';
import { Difficulty } from '@/hooks/useQuestManager';
import { HORMONES } from './gb2-02-hormone-data';
import { NEGATIVE_FEEDBACK_LOOPS } from './gb2-02-feedback-data';
import { CLINICAL_CASES } from './gb2-02-clinical-data';

/**
 * Helper function to create a slot with default placeholder
 */
function createSlot(
  t: any,
  id: string,
  labelLatex: string,
  type: "select" | "input" | "multiselect",
  expected: string | number,
  options?: string[]
): GB202QuestSlot {
  return {
    id,
    labelLatex,
    placeholder: type === "select"
      ? placeholderText(t, "select")
      : placeholderText(t, "answer"),
    type,
    expected,
    options
  };
}

function placeholderText(t: any, key: "select" | "answer"): string {
  return textValue(t, `gb2_02.placeholders.${key}`);
}

function textValue(
  t: any,
  path: string,
  params?: Record<string, string | number>
): string {
  if (typeof t === "function") {
    const translated = t(path, params);
    return typeof translated === "string" ? translated : path;
  }

  const parts = path.split(".");
  let current = t;
  for (const part of parts) {
    current = current?.[part];
  }

  if (typeof current === "string") {
    return interpolate(current, params);
  }

  return path;
}

function builderText(
  t: any,
  key: string,
  params?: Record<string, string | number>
): string {
  return textValue(t, `gb2_02.builder.${key}`, params);
}

function latexBuilderText(
  t: any,
  key: string,
  params?: Record<string, string | number>
): string {
  return `\\text{${builderText(t, key, params)}}`;
}

function diagnosisOptionId(diagnosis: string): string {
  const normalized = diagnosis.toLowerCase();
  if (normalized === "diabetes mellitus") return "diabetes_mellitus";
  if (normalized === "hypothyroidism") return "hypothyroidism";
  if (normalized === "hyperthyroidism") return "hyperthyroidism";
  if (normalized === "addison's disease") return "addisons_disease";
  return normalized.replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  return Object.entries(params).reduce(
    (acc, [key, value]) => acc.replace(new RegExp(`\\{${key}\\}`, "g"), String(value)),
    template
  );
}

function promptText(
  t: any,
  key: string,
  params?: Record<string, string | number>
): string {
  return textValue(t, `gb2_02.prompts.${key}`, params);
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
        promptLatex: promptText(t, "classify_hormone_structure", { hormone: "insulin" }),
        expressionLatex: "\\text{Insulin}",
        targetLatex: latexBuilderText(t, "formulas.type_target"),
        correctLatex: latexBuilderText(t, "answers.peptide"),
        slots: [createSlot(t, "type", builderText(t, "labels.slot_hormone_type"), "select", "peptide", ["peptide", "steroid", "amino_acid_derived"])],
        baselContext: builderText(t, "contexts.roche_diagnostics_basel"),
        title: builderText(t, "quest_meta.titles.hormone_classification"),
        description: builderText(t, "quest_meta.descriptions.identify_hormone_types"),
        concept: builderText(t, "quest_meta.concepts.endocrine_system")
      } as GB202Quest);
      
      // Quest 2: Cortisol type classification
      quests.push({
        id: "HORMONE_ID_BASIC_2",
        difficulty,
        stage: "HORMONE_IDENTIFICATION",
        hormone: HORMONES.find(h => h.name === "cortisol")!,
        promptLatex: promptText(t, "classify_hormone_structure", { hormone: "cortisol" }),
        expressionLatex: "\\text{Cortisol}",
        targetLatex: latexBuilderText(t, "formulas.type_target"),
        correctLatex: latexBuilderText(t, "answers.steroid"),
        slots: [{
          id: "type",
          labelLatex: builderText(t, "labels.slot_hormone_type"),
          placeholder: placeholderText(t, "select"),
          type: "select",
          options: ["peptide", "steroid", "amino_acid_derived"],
          expected: "steroid"
        }],
        baselContext: builderText(t, "contexts.novartis_endocrinology_lab_basel"),
        title: builderText(t, "quest_meta.titles.hormone_classification"),
        description: builderText(t, "quest_meta.descriptions.identify_hormone_types"),
        concept: builderText(t, "quest_meta.concepts.endocrine_system")
      } as GB202Quest);
      
      // Quest 3: Thyroxine type classification
      quests.push({
        id: "HORMONE_ID_BASIC_3",
        difficulty,
        stage: "HORMONE_IDENTIFICATION",
        hormone: HORMONES.find(h => h.name === "thyroxine")!,
        promptLatex: promptText(t, "classify_hormone_structure", { hormone: "thyroxine (T_4)" }),
        expressionLatex: "T_4",
        targetLatex: latexBuilderText(t, "formulas.type_target"),
        correctLatex: latexBuilderText(t, "answers.amino_acid_derived"),
        slots: [{
          id: "type",
          labelLatex: builderText(t, "labels.slot_hormone_type"),
          placeholder: placeholderText(t, "select"),
          type: "select",
          options: ["peptide", "steroid", "amino_acid_derived"],
          expected: "amino_acid_derived"
        }],
        baselContext: builderText(t, "contexts.basel_thyroid_clinic"),
        title: builderText(t, "quest_meta.titles.hormone_classification"),
        description: builderText(t, "quest_meta.descriptions.identify_hormone_types"),
        concept: builderText(t, "quest_meta.concepts.endocrine_system")
      } as GB202Quest);
      
      // Quest 4: Insulin gland identification
      quests.push({
        id: "HORMONE_ID_BASIC_4",
        difficulty,
        stage: "HORMONE_IDENTIFICATION",
        hormone: HORMONES.find(h => h.name === "insulin")!,
        promptLatex: promptText(t, "identify_insulin_gland"),
        expressionLatex: "\\text{Insulin}",
        targetLatex: latexBuilderText(t, "formulas.gland_target"),
        correctLatex: latexBuilderText(t, "answers.pancreas"),
        slots: [{
          id: "gland",
          labelLatex: builderText(t, "labels.slot_producing_gland"),
          placeholder: placeholderText(t, "select"),
          type: "select",
          options: ["pancreas", "pituitary", "thyroid", "adrenal_cortex"],
          expected: "pancreas"
        }],
        baselContext: builderText(t, "contexts.basel_diabetes_center"),
        title: builderText(t, "quest_meta.titles.gland_identification"),
        description: builderText(t, "quest_meta.descriptions.identify_hormone_producing_glands"),
        concept: builderText(t, "quest_meta.concepts.endocrine_system")
      } as GB202Quest);
      
      // Quest 5: Adrenaline type classification
      quests.push({
        id: "HORMONE_ID_BASIC_5",
        difficulty,
        stage: "HORMONE_IDENTIFICATION",
        hormone: HORMONES.find(h => h.name === "adrenaline")!,
        promptLatex: promptText(t, "classify_hormone_structure", { hormone: "adrenaline (epinephrine)" }),
        expressionLatex: "\\text{Adrenaline}",
        targetLatex: latexBuilderText(t, "formulas.type_target"),
        correctLatex: latexBuilderText(t, "answers.amino_acid_derived"),
        slots: [{
          id: "type",
          labelLatex: builderText(t, "labels.slot_hormone_type"),
          placeholder: placeholderText(t, "select"),
          type: "select",
          options: ["peptide", "steroid", "amino_acid_derived"],
          expected: "amino_acid_derived"
        }],
        baselContext: builderText(t, "contexts.basel_emergency_medicine_research"),
        title: builderText(t, "quest_meta.titles.hormone_classification"),
        description: builderText(t, "quest_meta.descriptions.identify_hormone_types"),
        concept: builderText(t, "quest_meta.concepts.endocrine_system")
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
          promptLatex: promptText(t, "primary_function_of", { hormone: hormones[i]!.name }),
          expressionLatex: `\\text{${hormones[i]!.name}}`,
          targetLatex: latexBuilderText(t, "formulas.function_target"),
          correctLatex: `\\text{${hormones[i]!.primaryFunction}}`,
          slots: [{
            id: "function",
            labelLatex: builderText(t, "labels.slot_primary_function"),
            placeholder: placeholderText(t, "answer"),
            type: "input",
            expected: hormones[i]!.primaryFunction
          }],
          baselContext: builderText(t, "contexts.basel_endocrinology_clinic"),
          title: builderText(t, "quest_meta.titles.hormone_function"),
          description: builderText(t, "quest_meta.descriptions.identify_hormone_functions"),
          concept: builderText(t, "quest_meta.concepts.endocrine_system")
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
          promptLatex: promptText(t, "regulates_secretion_of", { hormone: pituitaryHormones[i].name }),
          expressionLatex: `\\text{${pituitaryHormones[i].name}}`,
          targetLatex: latexBuilderText(t, "formulas.hypothalamic_hormone_target"),
          correctLatex: `\\text{${pituitaryHormones[i].hypothalamic}}`,
          slots: [{
            id: "hypothalamic",
            labelLatex: builderText(t, "labels.slot_hypothalamic_hormone"),
            placeholder: placeholderText(t, "select"),
            type: "select",
            options: ["TRH", "CRH", "GHRH", "GnRH", "dopamine"],
            expected: pituitaryHormones[i].hypothalamic
          }],
          baselContext: builderText(t, "contexts.basel_neuroendocrinology_unit"),
          title: builderText(t, "quest_meta.titles.hypothalamic_pituitary_axis"),
          description: builderText(t, "quest_meta.descriptions.understand_hormone_regulation"),
          concept: builderText(t, "quest_meta.concepts.endocrine_system")
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
          promptLatex: promptText(t, "therapy_for_disorder", { disorder: pharmaceuticalHormones[i].disorder }),
          expressionLatex: `\\text{${pharmaceuticalHormones[i].disorder}}`,
          targetLatex: latexBuilderText(t, "formulas.therapy_target"),
          correctLatex: `\\text{${pharmaceuticalHormones[i].name}}`,
          slots: [{
            id: "therapy",
            labelLatex: builderText(t, "labels.slot_hormone_therapy"),
            placeholder: placeholderText(t, "answer"),
            type: "input",
            expected: pharmaceuticalHormones[i].name
          }],
          baselContext: builderText(
            t,
            pharmaceuticalHormones[i].company === "Roche"
              ? "contexts.roche_basel_pharmaceutical_production"
              : "contexts.novartis_basel_pharmaceutical_production"
          ),
          title: builderText(t, "quest_meta.titles.hormone_therapy"),
          description: builderText(t, "quest_meta.descriptions.pharmaceutical_applications"),
          concept: builderText(t, "quest_meta.concepts.endocrine_system")
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
        const loopDescription = builderText(t, `feedback_descriptions.${loops[i].description}`);
        quests.push({
          id: `FEEDBACK_BASIC_${i + 1}`,
          difficulty,
          stage: "FEEDBACK_MECHANISMS",
          feedbackLoop: loops[i],
          promptLatex: promptText(t, "identify_feedback_type", { description: loopDescription }),
          expressionLatex: `\\text{${loopDescription}}`,
          targetLatex: latexBuilderText(t, "formulas.feedback_type_target"),
          correctLatex: latexBuilderText(t, "answers.negative"),
          slots: [{
            id: "feedback_type",
            labelLatex: builderText(t, "labels.slot_feedback_type"),
            placeholder: placeholderText(t, "select"),
            type: "select",
            options: ["negative", "positive"],
            expected: "negative"
          }],
          baselContext: builderText(t, "contexts.basel_endocrinology_research_institute"),
          title: builderText(t, "quest_meta.titles.feedback_mechanisms"),
          description: builderText(t, "quest_meta.descriptions.identify_feedback_types"),
          concept: builderText(t, "quest_meta.concepts.endocrine_system")
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
          promptLatex: promptText(t, "analyze_feedback_mechanism"),
          expressionLatex: latexBuilderText(t, "formulas.feedback_loop"),
          targetLatex: latexBuilderText(t, "formulas.analysis_target"),
          correctLatex: latexBuilderText(t, "answers.feedback_analysis"),
          slots: [{
            id: "analysis",
            labelLatex: builderText(t, "labels.slot_mechanism"),
            placeholder: placeholderText(t, "answer"),
            type: "input",
            expected: builderText(t, "answers.feedback_analysis")
          }],
          baselContext: builderText(t, "contexts.basel_university_hospital"),
          title: builderText(t, "quest_meta.titles.feedback_analysis"),
          description: builderText(t, "quest_meta.descriptions.analyze_feedback_loops"),
          concept: builderText(t, "quest_meta.concepts.endocrine_system")
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
          promptLatex: promptText(t, "clinical_diagnosis_from_case"),
          expressionLatex: latexBuilderText(t, "formulas.clinical_case"),
          targetLatex: latexBuilderText(t, "formulas.diagnosis_target"),
          correctLatex: `\\text{${basicCases[i].expectedDiagnosis}}`,
          slots: [{
            id: "diagnosis",
            labelLatex: builderText(t, "labels.slot_diagnosis"),
            placeholder: placeholderText(t, "select"),
            type: "select",
            options: ["diabetes_mellitus", "hypothyroidism", "hyperthyroidism", "addisons_disease"],
            expected: diagnosisOptionId(basicCases[i].expectedDiagnosis)
          }],
          baselContext: builderText(t, "contexts.basel_university_hospital"),
          title: builderText(t, "quest_meta.titles.clinical_diagnosis"),
          description: builderText(t, "quest_meta.descriptions.diagnose_endocrine_disorders"),
          concept: builderText(t, "quest_meta.concepts.endocrine_system")
        } as GB202Quest);
      }
      // Add 2 more basic quests
      for (let i = 3; i < 5; i++) {
        quests.push({
          id: `CLINICAL_BASIC_${i + 1}`,
          difficulty,
          stage: "CLINICAL_APPLICATIONS",
          promptLatex: promptText(t, "identify_endocrine_disorder"),
          expressionLatex: latexBuilderText(t, "formulas.disorder"),
          targetLatex: latexBuilderText(t, "formulas.diagnosis_target"),
          correctLatex: latexBuilderText(t, "answers.disorder_name"),
          slots: [{
            id: "diagnosis",
            labelLatex: builderText(t, "labels.slot_diagnosis"),
            placeholder: placeholderText(t, "answer"),
            type: "input",
            expected: builderText(t, "answers.disorder_name")
          }],
          baselContext: builderText(t, "contexts.basel_university_hospital"),
          title: builderText(t, "quest_meta.titles.clinical_diagnosis"),
          description: builderText(t, "quest_meta.descriptions.diagnose_endocrine_disorders"),
          concept: builderText(t, "quest_meta.concepts.endocrine_system")
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
          promptLatex: promptText(t, "analyze_clinical_case"),
          expressionLatex: latexBuilderText(t, "formulas.clinical_case"),
          targetLatex: latexBuilderText(t, "formulas.diagnosis_target"),
          correctLatex: latexBuilderText(t, "answers.diagnosis"),
          slots: [{
            id: "diagnosis",
            labelLatex: builderText(t, "labels.slot_diagnosis"),
            placeholder: placeholderText(t, "answer"),
            type: "input",
            expected: builderText(t, "answers.diagnosis")
          }],
          baselContext: builderText(t, "contexts.basel_advanced_endocrinology_unit"),
          title: builderText(t, "quest_meta.titles.clinical_analysis"),
          description: builderText(t, "quest_meta.descriptions.complex_case_analysis"),
          concept: builderText(t, "quest_meta.concepts.endocrine_system")
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
