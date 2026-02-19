/**
 * SB2.04 Human Physiology Module - Quest Data
 * 
 * Contains all quest data for the four body systems:
 * - Digestive System (20 quests: 5 BASIC, 6 CORE, 5 ADVANCED, 2 ELITE)
 * - Respiratory System (19 quests: 5 BASIC, 6 CORE, 5 ADVANCED, 3 ELITE)
 * - Circulatory System (19 quests: 5 BASIC, 7 CORE, 5 ADVANCED, 2 ELITE)
 * - Excretory System (17 quests: 5 BASIC, 6 CORE, 5 ADVANCED, 3 ELITE)
 * Total: 75 quests (20 BASIC, 25 CORE, 20 ADVANCED, 10 ELITE)
 */

import { Difficulty } from "@/hooks/useQuestManager";
import { SB204Quest, Stage, QuestionType } from "./sb2-04-types";

/**
 * Helper function to create quest objects
 */
function createQuest(
  id: string,
  difficulty: Difficulty,
  stage: Stage,
  questionType: QuestionType,
  promptKey: string,
  correctAnswer: string,
  options?: string[],
  organ?: string,
  process?: string,
  baselScenario?: string
): SB204Quest {
  return {
    id,
    difficulty,
    stage,
    questionType,
    promptLatex: promptKey,
    expressionLatex: "",
    targetLatex: "",
    slots: [{
      id: "answer",
      labelLatex: "\\text{Answer}",
      placeholder: correctAnswer.toLowerCase(),
      expected: correctAnswer.toLowerCase()
    }],
    correctLatex: correctAnswer.toLowerCase(),
    hintLatex: [],
    organ,
    process,
    options,
    correctAnswer: correctAnswer.toLowerCase(),
    baselScenario,
  };
}

// ============================================================================
// DIGESTIVE SYSTEM QUESTS (20 total: 5 BASIC, 6 CORE, 5 ADVANCED, 2 ELITE)
// ============================================================================

export const digestiveBasicQuests: SB204Quest[] = [
  createQuest(
    "DIGESTIVE_BASIC_1",
    "BASIC",
    "DIGESTIVE_SYSTEM",
    "identification",
    "sb2_04.quests.digestive.basic_1",
    "stomach",
    ["stomach", "liver", "pancreas"],
    "stomach"
  ),
  createQuest(
    "DIGESTIVE_BASIC_2",
    "BASIC",
    "DIGESTIVE_SYSTEM",
    "identification",
    "sb2_04.quests.digestive.basic_2",
    "small intestine",
    ["stomach", "small intestine", "large intestine"],
    "small_intestine"
  ),
  createQuest(
    "DIGESTIVE_BASIC_3",
    "BASIC",
    "DIGESTIVE_SYSTEM",
    "identification",
    "sb2_04.quests.digestive.basic_3",
    "liver",
    ["liver", "pancreas", "gallbladder"],
    "liver"
  ),
  createQuest(
    "DIGESTIVE_BASIC_4",
    "BASIC",
    "DIGESTIVE_SYSTEM",
    "identification",
    "sb2_04.quests.digestive.basic_4",
    "pancreas",
    ["liver", "pancreas", "stomach"],
    "pancreas"
  ),
  createQuest(
    "DIGESTIVE_BASIC_5",
    "BASIC",
    "DIGESTIVE_SYSTEM",
    "identification",
    "sb2_04.quests.digestive.basic_5",
    "esophagus",
    ["trachea", "esophagus", "intestine"],
    "esophagus"
  ),
];

export const digestiveCoreQuests: SB204Quest[] = [
  createQuest(
    "DIGESTIVE_CORE_1",
    "CORE",
    "DIGESTIVE_SYSTEM",
    "process",
    "sb2_04.quests.digestive.core_1",
    "mechanical",
    undefined,
    undefined,
    "mechanical_digestion"
  ),
  createQuest(
    "DIGESTIVE_CORE_2",
    "CORE",
    "DIGESTIVE_SYSTEM",
    "process",
    "sb2_04.quests.digestive.core_2",
    "pepsin",
    undefined,
    undefined,
    "enzyme_action"
  ),
  createQuest(
    "DIGESTIVE_CORE_3",
    "CORE",
    "DIGESTIVE_SYSTEM",
    "process",
    "sb2_04.quests.digestive.core_3",
    "emulsifies",
    undefined,
    undefined,
    "bile_function"
  ),
  createQuest(
    "DIGESTIVE_CORE_4",
    "CORE",
    "DIGESTIVE_SYSTEM",
    "process",
    "sb2_04.quests.digestive.core_4",
    "villi",
    undefined,
    undefined,
    "absorption"
  ),
  createQuest(
    "DIGESTIVE_CORE_5",
    "CORE",
    "DIGESTIVE_SYSTEM",
    "process",
    "sb2_04.quests.digestive.core_5",
    "large intestine",
    undefined,
    undefined,
    "water_absorption"
  ),
  createQuest(
    "DIGESTIVE_CORE_6",
    "CORE",
    "DIGESTIVE_SYSTEM",
    "process",
    "sb2_04.quests.digestive.core_6",
    "peristalsis",
    undefined,
    undefined,
    "peristalsis"
  ),
];

export const digestiveAdvancedQuests: SB204Quest[] = [
  createQuest(
    "DIGESTIVE_ADVANCED_1",
    "ADVANCED",
    "DIGESTIVE_SYSTEM",
    "coordination",
    "sb2_04.quests.digestive.advanced_1",
    "different ph levels",
    undefined,
    undefined,
    "enzyme_pH"
  ),
  createQuest(
    "DIGESTIVE_ADVANCED_2",
    "ADVANCED",
    "DIGESTIVE_SYSTEM",
    "coordination",
    "sb2_04.quests.digestive.advanced_2",
    "ulcer forms",
    undefined,
    undefined,
    "ulcer"
  ),
  createQuest(
    "DIGESTIVE_ADVANCED_3",
    "ADVANCED",
    "DIGESTIVE_SYSTEM",
    "coordination",
    "sb2_04.quests.digestive.advanced_3",
    "hormones",
    undefined,
    undefined,
    "hormone_regulation"
  ),
  createQuest(
    "DIGESTIVE_ADVANCED_4",
    "ADVANCED",
    "DIGESTIVE_SYSTEM",
    "coordination",
    "sb2_04.quests.digestive.advanced_4",
    "lactase",
    undefined,
    undefined,
    "lactose_intolerance"
  ),
  createQuest(
    "DIGESTIVE_ADVANCED_5",
    "ADVANCED",
    "DIGESTIVE_SYSTEM",
    "coordination",
    "sb2_04.quests.digestive.advanced_5",
    "bloodstream",
    undefined,
    undefined,
    "nutrient_transport"
  ),
];

export const digestiveEliteQuests: SB204Quest[] = [
  createQuest(
    "DIGESTIVE_ELITE_1",
    "ELITE",
    "DIGESTIVE_SYSTEM",
    "comprehensive",
    "sb2_04.quests.digestive.elite_1",
    "blood diverted to muscles, reduced digestive function",
    undefined,
    undefined,
    undefined,
    "basel_marathon"
  ),
  createQuest(
    "DIGESTIVE_ELITE_2",
    "ELITE",
    "DIGESTIVE_SYSTEM",
    "comprehensive",
    "sb2_04.quests.digestive.elite_2",
    "balanced macronutrients, proper timing",
    undefined,
    undefined,
    undefined,
    "nutrition_program"
  ),
  createQuest(
    "DIGESTIVE_ELITE_3",
    "ELITE",
    "DIGESTIVE_SYSTEM",
    "comprehensive",
    "sb2_04.quests.digestive.elite_3",
    "sglt1",
    undefined,
    undefined,
    undefined,
    "intestinal_absorption"
  ),
  createQuest(
    "DIGESTIVE_ELITE_4",
    "ELITE",
    "DIGESTIVE_SYSTEM",
    "comprehensive",
    "sb2_04.quests.digestive.elite_4",
    "enterohepatic circulation",
    undefined,
    undefined,
    undefined,
    "bile_recycling"
  ),
  createQuest(
    "DIGESTIVE_ELITE_5",
    "ELITE",
    "DIGESTIVE_SYSTEM",
    "comprehensive",
    "sb2_04.quests.digestive.elite_5",
    "short-chain fatty acids",
    undefined,
    undefined,
    undefined,
    "microbiome_metabolism"
  ),
];

// ============================================================================
// RESPIRATORY SYSTEM QUESTS (19 total: 5 BASIC, 6 CORE, 5 ADVANCED, 3 ELITE)
// ============================================================================

export const respiratoryBasicQuests: SB204Quest[] = [
  createQuest(
    "RESPIRATORY_BASIC_1",
    "BASIC",
    "RESPIRATORY_SYSTEM",
    "identification",
    "sb2_04.quests.respiratory.basic_1",
    "trachea",
    ["esophagus", "trachea", "bronchi"],
    "trachea"
  ),
  createQuest(
    "RESPIRATORY_BASIC_2",
    "BASIC",
    "RESPIRATORY_SYSTEM",
    "identification",
    "sb2_04.quests.respiratory.basic_2",
    "alveoli",
    ["bronchi", "trachea", "alveoli"],
    "alveoli"
  ),
  createQuest(
    "RESPIRATORY_BASIC_3",
    "BASIC",
    "RESPIRATORY_SYSTEM",
    "identification",
    "sb2_04.quests.respiratory.basic_3",
    "diaphragm",
    ["diaphragm", "heart", "intercostals"],
    "diaphragm"
  ),
  createQuest(
    "RESPIRATORY_BASIC_4",
    "BASIC",
    "RESPIRATORY_SYSTEM",
    "identification",
    "sb2_04.quests.respiratory.basic_4",
    "bronchi",
    ["alveoli", "bronchi", "bronchioles"],
    "bronchi"
  ),
  createQuest(
    "RESPIRATORY_BASIC_5",
    "BASIC",
    "RESPIRATORY_SYSTEM",
    "identification",
    "sb2_04.quests.respiratory.basic_5",
    "nose",
    ["mouth", "nose", "trachea"],
    "nose"
  ),
];

export const respiratoryCoreQuests: SB204Quest[] = [
  createQuest(
    "RESPIRATORY_CORE_1",
    "CORE",
    "RESPIRATORY_SYSTEM",
    "process",
    "sb2_04.quests.respiratory.core_1",
    "contracts and moves down",
    undefined,
    undefined,
    "inhalation"
  ),
  createQuest(
    "RESPIRATORY_CORE_2",
    "CORE",
    "RESPIRATORY_SYSTEM",
    "process",
    "sb2_04.quests.respiratory.core_2",
    "oxygen",
    undefined,
    undefined,
    "gas_exchange"
  ),
  createQuest(
    "RESPIRATORY_CORE_3",
    "CORE",
    "RESPIRATORY_SYSTEM",
    "process",
    "sb2_04.quests.respiratory.core_3",
    "decreases",
    undefined,
    undefined,
    "exhalation"
  ),
  createQuest(
    "RESPIRATORY_CORE_4",
    "CORE",
    "RESPIRATORY_SYSTEM",
    "process",
    "sb2_04.quests.respiratory.core_4",
    "hemoglobin",
    undefined,
    undefined,
    "oxygen_transport"
  ),
  createQuest(
    "RESPIRATORY_CORE_5",
    "CORE",
    "RESPIRATORY_SYSTEM",
    "process",
    "sb2_04.quests.respiratory.core_5",
    "exhaled through lungs",
    undefined,
    undefined,
    "co2_removal"
  ),
  createQuest(
    "RESPIRATORY_CORE_6",
    "CORE",
    "RESPIRATORY_SYSTEM",
    "process",
    "sb2_04.quests.respiratory.core_6",
    "high co2 levels",
    undefined,
    undefined,
    "breathing_rate"
  ),
];

export const respiratoryAdvancedQuests: SB204Quest[] = [
  createQuest(
    "RESPIRATORY_ADVANCED_1",
    "ADVANCED",
    "RESPIRATORY_SYSTEM",
    "coordination",
    "sb2_04.quests.respiratory.advanced_1",
    "increased breathing rate and depth",
    undefined,
    undefined,
    "oxygen_demand"
  ),
  createQuest(
    "RESPIRATORY_ADVANCED_2",
    "ADVANCED",
    "RESPIRATORY_SYSTEM",
    "coordination",
    "sb2_04.quests.respiratory.advanced_2",
    "constriction and inflammation",
    undefined,
    undefined,
    "asthma"
  ),
  createQuest(
    "RESPIRATORY_ADVANCED_3",
    "ADVANCED",
    "RESPIRATORY_SYSTEM",
    "coordination",
    "sb2_04.quests.respiratory.advanced_3",
    "increased red blood cell production",
    undefined,
    undefined,
    "altitude_adaptation"
  ),
  createQuest(
    "RESPIRATORY_ADVANCED_4",
    "ADVANCED",
    "RESPIRATORY_SYSTEM",
    "coordination",
    "sb2_04.quests.respiratory.advanced_4",
    "reduces oxygen absorption",
    undefined,
    undefined,
    "pneumonia"
  ),
  createQuest(
    "RESPIRATORY_ADVANCED_5",
    "ADVANCED",
    "RESPIRATORY_SYSTEM",
    "coordination",
    "sb2_04.quests.respiratory.advanced_5",
    "controls co2 levels",
    undefined,
    undefined,
    "ph_regulation"
  ),
];

export const respiratoryEliteQuests: SB204Quest[] = [
  createQuest(
    "RESPIRATORY_ELITE_1",
    "ELITE",
    "RESPIRATORY_SYSTEM",
    "comprehensive",
    "sb2_04.quests.respiratory.elite_1",
    "increased breathing rate, vasoconstriction, oxygen conservation",
    undefined,
    undefined,
    undefined,
    "rhine_swimming"
  ),
  createQuest(
    "RESPIRATORY_ELITE_2",
    "ELITE",
    "RESPIRATORY_SYSTEM",
    "comprehensive",
    "sb2_04.quests.respiratory.elite_2",
    "alveolar damage, poor ventilation, or circulation issues",
    undefined,
    undefined,
    undefined,
    "hospital_case"
  ),
  createQuest(
    "RESPIRATORY_ELITE_3",
    "ELITE",
    "RESPIRATORY_SYSTEM",
    "comprehensive",
    "sb2_04.quests.respiratory.elite_3",
    "breathing exercises, air quality monitoring, lung capacity training",
    undefined,
    undefined,
    undefined,
    "public_health"
  ),
  createQuest(
    "RESPIRATORY_ELITE_4",
    "ELITE",
    "RESPIRATORY_SYSTEM",
    "comprehensive",
    "sb2_04.quests.respiratory.elite_4",
    "decreases",
    undefined,
    undefined,
    undefined,
    "equilibrium_logic"
  ),
  createQuest(
    "RESPIRATORY_ELITE_5",
    "ELITE",
    "RESPIRATORY_SYSTEM",
    "comprehensive",
    "sb2_04.quests.respiratory.elite_5",
    "bicarbonate buffer",
    undefined,
    undefined,
    undefined,
    "acidosis_response"
  ),
];

// ============================================================================
// CIRCULATORY SYSTEM QUESTS (19 total: 5 BASIC, 7 CORE, 5 ADVANCED, 2 ELITE)
// ============================================================================

export const circulatoryBasicQuests: SB204Quest[] = [
  createQuest(
    "CIRCULATORY_BASIC_1",
    "BASIC",
    "CIRCULATORY_SYSTEM",
    "identification",
    "sb2_04.quests.circulatory.basic_1",
    "left ventricle",
    ["left atrium", "left ventricle", "right ventricle"],
    "left_ventricle"
  ),
  createQuest(
    "CIRCULATORY_BASIC_2",
    "BASIC",
    "CIRCULATORY_SYSTEM",
    "identification",
    "sb2_04.quests.circulatory.basic_2",
    "arteries",
    ["arteries", "veins", "capillaries"],
    "arteries"
  ),
  createQuest(
    "CIRCULATORY_BASIC_3",
    "BASIC",
    "CIRCULATORY_SYSTEM",
    "identification",
    "sb2_04.quests.circulatory.basic_3",
    "right atrium",
    ["right atrium", "left atrium", "right ventricle"],
    "right_atrium"
  ),
  createQuest(
    "CIRCULATORY_BASIC_4",
    "BASIC",
    "CIRCULATORY_SYSTEM",
    "identification",
    "sb2_04.quests.circulatory.basic_4",
    "capillaries",
    ["arteries", "veins", "capillaries"],
    "capillaries"
  ),
  createQuest(
    "CIRCULATORY_BASIC_5",
    "BASIC",
    "CIRCULATORY_SYSTEM",
    "identification",
    "sb2_04.quests.circulatory.basic_5",
    "valves",
    ["valves", "chambers", "vessels"],
    "valves"
  ),
];

export const circulatoryCoreQuests: SB204Quest[] = [
  createQuest(
    "CIRCULATORY_CORE_1",
    "CORE",
    "CIRCULATORY_SYSTEM",
    "process",
    "sb2_04.quests.circulatory.core_1",
    "systemic circulation",
    undefined,
    undefined,
    "systemic_circulation"
  ),
  createQuest(
    "CIRCULATORY_CORE_2",
    "CORE",
    "CIRCULATORY_SYSTEM",
    "process",
    "sb2_04.quests.circulatory.core_2",
    "pulmonary circulation",
    undefined,
    undefined,
    "pulmonary_circulation"
  ),
  createQuest(
    "CIRCULATORY_CORE_3",
    "CORE",
    "CIRCULATORY_SYSTEM",
    "process",
    "sb2_04.quests.circulatory.core_3",
    "red blood cells",
    undefined,
    undefined,
    "blood_composition"
  ),
  createQuest(
    "CIRCULATORY_CORE_4",
    "CORE",
    "CIRCULATORY_SYSTEM",
    "process",
    "sb2_04.quests.circulatory.core_4",
    "systole",
    undefined,
    undefined,
    "heart_contraction"
  ),
  createQuest(
    "CIRCULATORY_CORE_5",
    "CORE",
    "CIRCULATORY_SYSTEM",
    "process",
    "sb2_04.quests.circulatory.core_5",
    "heart contraction",
    undefined,
    undefined,
    "blood_pressure"
  ),
  createQuest(
    "CIRCULATORY_CORE_6",
    "CORE",
    "CIRCULATORY_SYSTEM",
    "process",
    "sb2_04.quests.circulatory.core_6",
    "white blood cells",
    undefined,
    undefined,
    "white_blood_cells"
  ),
  createQuest(
    "CIRCULATORY_CORE_7",
    "CORE",
    "CIRCULATORY_SYSTEM",
    "process",
    "sb2_04.quests.circulatory.core_7",
    "platelets",
    undefined,
    undefined,
    "blood_clotting"
  ),
];

export const circulatoryAdvancedQuests: SB204Quest[] = [
  createQuest(
    "CIRCULATORY_ADVANCED_1",
    "ADVANCED",
    "CIRCULATORY_SYSTEM",
    "coordination",
    "sb2_04.quests.circulatory.advanced_1",
    "increases to deliver more oxygen",
    undefined,
    undefined,
    "exercise_response"
  ),
  createQuest(
    "CIRCULATORY_ADVANCED_2",
    "ADVANCED",
    "CIRCULATORY_SYSTEM",
    "coordination",
    "sb2_04.quests.circulatory.advanced_2",
    "reduced blood flow, high blood pressure",
    undefined,
    undefined,
    "atherosclerosis"
  ),
  createQuest(
    "CIRCULATORY_ADVANCED_3",
    "ADVANCED",
    "CIRCULATORY_SYSTEM",
    "coordination",
    "sb2_04.quests.circulatory.advanced_3",
    "platelets form clot",
    undefined,
    undefined,
    "blood_clotting"
  ),
  createQuest(
    "CIRCULATORY_ADVANCED_4",
    "ADVANCED",
    "CIRCULATORY_SYSTEM",
    "coordination",
    "sb2_04.quests.circulatory.advanced_4",
    "insufficient oxygen delivery",
    undefined,
    undefined,
    "anemia"
  ),
  createQuest(
    "CIRCULATORY_ADVANCED_5",
    "ADVANCED",
    "CIRCULATORY_SYSTEM",
    "coordination",
    "sb2_04.quests.circulatory.advanced_5",
    "vasodilation and vasoconstriction",
    undefined,
    undefined,
    "temperature_regulation"
  ),
];

export const circulatoryEliteQuests: SB204Quest[] = [
  createQuest(
    "CIRCULATORY_ELITE_1",
    "ELITE",
    "CIRCULATORY_SYSTEM",
    "comprehensive",
    "sb2_04.quests.circulatory.elite_1",
    "increased heart rate, stroke volume, blood redistribution",
    undefined,
    undefined,
    undefined,
    "basel_marathon"
  ),
  createQuest(
    "CIRCULATORY_ELITE_2",
    "ELITE",
    "CIRCULATORY_SYSTEM",
    "comprehensive",
    "sb2_04.quests.circulatory.elite_2",
    "vessel resistance, cardiac output, lifestyle changes",
    undefined,
    undefined,
    undefined,
    "hospital_case"
  ),
  createQuest(
    "CIRCULATORY_ELITE_3",
    "ELITE",
    "CIRCULATORY_SYSTEM",
    "comprehensive",
    "sb2_04.quests.circulatory.elite_3",
    "buffers > breathing > kidneys",
    undefined,
    undefined,
    undefined,
    "system_coordination"
  ),
  createQuest(
    "CIRCULATORY_ELITE_4",
    "ELITE",
    "CIRCULATORY_SYSTEM",
    "comprehensive",
    "sb2_04.quests.circulatory.elite_4",
    "frank-starling law",
    undefined,
    undefined,
    undefined,
    "cardiac_efficiency"
  ),
  createQuest(
    "CIRCULATORY_ELITE_5",
    "ELITE",
    "CIRCULATORY_SYSTEM",
    "comprehensive",
    "sb2_04.quests.circulatory.elite_5",
    "radius to the fourth power",
    undefined,
    undefined,
    undefined,
    "blood_flow_physics"
  ),
];

// ============================================================================
// EXCRETORY SYSTEM QUESTS (17 total: 5 BASIC, 6 CORE, 5 ADVANCED, 3 ELITE)
// ============================================================================

export const excretoryBasicQuests: SB204Quest[] = [
  createQuest(
    "EXCRETORY_BASIC_1",
    "BASIC",
    "EXCRETORY_SYSTEM",
    "identification",
    "sb2_04.quests.excretory.basic_1",
    "kidneys",
    ["kidneys", "liver", "lungs"],
    "kidneys"
  ),
  createQuest(
    "EXCRETORY_BASIC_2",
    "BASIC",
    "EXCRETORY_SYSTEM",
    "identification",
    "sb2_04.quests.excretory.basic_2",
    "bladder",
    ["kidneys", "bladder", "ureters"],
    "bladder"
  ),
  createQuest(
    "EXCRETORY_BASIC_3",
    "BASIC",
    "EXCRETORY_SYSTEM",
    "identification",
    "sb2_04.quests.excretory.basic_3",
    "ureters",
    ["ureters", "urethra", "nephrons"],
    "ureters"
  ),
  createQuest(
    "EXCRETORY_BASIC_4",
    "BASIC",
    "EXCRETORY_SYSTEM",
    "identification",
    "sb2_04.quests.excretory.basic_4",
    "urethra",
    ["ureter", "urethra", "bladder"],
    "urethra"
  ),
  createQuest(
    "EXCRETORY_BASIC_5",
    "BASIC",
    "EXCRETORY_SYSTEM",
    "identification",
    "sb2_04.quests.excretory.basic_5",
    "nephron",
    ["nephron", "glomerulus", "tubule"],
    "nephron"
  ),
];

export const excretoryCoreQuests: SB204Quest[] = [
  createQuest(
    "EXCRETORY_CORE_1",
    "CORE",
    "EXCRETORY_SYSTEM",
    "process",
    "sb2_04.quests.excretory.core_1",
    "filtration",
    undefined,
    undefined,
    "filtration"
  ),
  createQuest(
    "EXCRETORY_CORE_2",
    "CORE",
    "EXCRETORY_SYSTEM",
    "process",
    "sb2_04.quests.excretory.core_2",
    "reabsorbed into blood",
    undefined,
    undefined,
    "reabsorption"
  ),
  createQuest(
    "EXCRETORY_CORE_3",
    "CORE",
    "EXCRETORY_SYSTEM",
    "process",
    "sb2_04.quests.excretory.core_3",
    "secretion from blood",
    undefined,
    undefined,
    "secretion"
  ),
  createQuest(
    "EXCRETORY_CORE_4",
    "CORE",
    "EXCRETORY_SYSTEM",
    "process",
    "sb2_04.quests.excretory.core_4",
    "adh",
    undefined,
    undefined,
    "water_balance"
  ),
  createQuest(
    "EXCRETORY_CORE_5",
    "CORE",
    "EXCRETORY_SYSTEM",
    "process",
    "sb2_04.quests.excretory.core_5",
    "urea",
    undefined,
    undefined,
    "urea"
  ),
  createQuest(
    "EXCRETORY_CORE_6",
    "CORE",
    "EXCRETORY_SYSTEM",
    "process",
    "sb2_04.quests.excretory.core_6",
    "collecting duct",
    undefined,
    undefined,
    "concentration"
  ),
];

export const excretoryAdvancedQuests: SB204Quest[] = [
  createQuest(
    "EXCRETORY_ADVANCED_1",
    "ADVANCED",
    "EXCRETORY_SYSTEM",
    "coordination",
    "sb2_04.quests.excretory.advanced_1",
    "control blood volume through water retention",
    undefined,
    undefined,
    "blood_pressure_regulation"
  ),
  createQuest(
    "EXCRETORY_ADVANCED_2",
    "ADVANCED",
    "EXCRETORY_SYSTEM",
    "coordination",
    "sb2_04.quests.excretory.advanced_2",
    "mineral crystallization",
    undefined,
    undefined,
    "kidney_stones"
  ),
  createQuest(
    "EXCRETORY_ADVANCED_3",
    "ADVANCED",
    "EXCRETORY_SYSTEM",
    "coordination",
    "sb2_04.quests.excretory.advanced_3",
    "excrete h+ ions, reabsorb bicarbonate",
    undefined,
    undefined,
    "acid_base_balance"
  ),
  createQuest(
    "EXCRETORY_ADVANCED_4",
    "ADVANCED",
    "EXCRETORY_SYSTEM",
    "coordination",
    "sb2_04.quests.excretory.advanced_4",
    "exceeds reabsorption capacity",
    undefined,
    undefined,
    "diabetes_effect"
  ),
  createQuest(
    "EXCRETORY_ADVANCED_5",
    "ADVANCED",
    "EXCRETORY_SYSTEM",
    "coordination",
    "sb2_04.quests.excretory.advanced_5",
    "increase water reabsorption, concentrated urine",
    undefined,
    undefined,
    "dehydration_response"
  ),
];

export const excretoryEliteQuests: SB204Quest[] = [
  createQuest(
    "EXCRETORY_ELITE_1",
    "ELITE",
    "EXCRETORY_SYSTEM",
    "comprehensive",
    "sb2_04.quests.excretory.elite_1",
    "waste accumulation, fluid imbalance, electrolyte disruption, blood pressure issues",
    undefined,
    undefined,
    undefined,
    "hospital_case"
  ),
  createQuest(
    "EXCRETORY_ELITE_2",
    "ELITE",
    "EXCRETORY_SYSTEM",
    "comprehensive",
    "sb2_04.quests.excretory.elite_2",
    "water intake, low sodium, diabetes prevention",
    undefined,
    undefined,
    undefined,
    "public_health"
  ),
  createQuest(
    "EXCRETORY_ELITE_3",
    "ELITE",
    "EXCRETORY_SYSTEM",
    "comprehensive",
    "sb2_04.quests.excretory.elite_3",
    "dialysis, kidney transplant, medication management",
    undefined,
    undefined,
    undefined,
    "hospital_treatment"
  ),
  createQuest(
    "EXCRETORY_ELITE_4",
    "ELITE",
    "EXCRETORY_SYSTEM",
    "comprehensive",
    "sb2_04.quests.excretory.elite_4",
    "intercalated cells",
    undefined,
    undefined,
    undefined,
    "renal_homeostasis"
  ),
  createQuest(
    "EXCRETORY_ELITE_5",
    "ELITE",
    "EXCRETORY_SYSTEM",
    "comprehensive",
    "sb2_04.quests.excretory.elite_5",
    "higher buffer capacity at blood ph",
    undefined,
    undefined,
    undefined,
    "interdisciplinary_analysis"
  ),
];

// ============================================================================
// QUEST POOL EXPORTS
// ============================================================================

export const allQuests: SB204Quest[] = [
  ...digestiveBasicQuests,
  ...digestiveCoreQuests,
  ...digestiveAdvancedQuests,
  ...digestiveEliteQuests,
  ...respiratoryBasicQuests,
  ...respiratoryCoreQuests,
  ...respiratoryAdvancedQuests,
  ...respiratoryEliteQuests,
  ...circulatoryBasicQuests,
  ...circulatoryCoreQuests,
  ...circulatoryAdvancedQuests,
  ...circulatoryEliteQuests,
  ...excretoryBasicQuests,
  ...excretoryCoreQuests,
  ...excretoryAdvancedQuests,
  ...excretoryEliteQuests,
];
