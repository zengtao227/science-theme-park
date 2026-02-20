/**
 * GB2.02 Endocrine System - Quest Data
 * 
 * This module contains all quest data for the three stages:
 * - Hormone Identification (20 quests: 4 difficulties × 5 quests)
 * - Feedback Mechanisms (20 quests: 4 difficulties × 5 quests)
 * - Clinical Applications (20 quests: 4 difficulties × 5 quests)
 * Total: 60 quests
 */

import { GB202Quest, Stage } from './gb2-02-types';
import { Difficulty } from '@/hooks/useQuestManager';
import { HORMONES, GLANDS } from './gb2-02-hormone-data';
import { NEGATIVE_FEEDBACK_LOOPS, POSITIVE_FEEDBACK_LOOPS } from './gb2-02-feedback-data';
import { CLINICAL_CASES } from './gb2-02-clinical-data';

/**
 * Hormone Identification Stage - BASIC Difficulty (5 quests)
 */
const HORMONE_ID_BASIC: Partial<GB202Quest>[] = [
  {
    id: "HORMONE_ID_BASIC_1",
    difficulty: "BASIC" as Difficulty,
    stage: "HORMONE_IDENTIFICATION" as Stage,
    hormone: HORMONES.find(h => h.name === "insulin"),
    promptLatex: "Classify the hormone insulin by its chemical structure.",
    slots: [
      {
        id: "type",
        labelLatex: "Hormone type:",
        placeholder: "Select hormone type...",
        type: "select",
        options: ["peptide", "steroid", "amino_acid_derived"],
        expected: "peptide"
      }
    ],
    baselContext: "At Roche Diagnostics Basel, researchers develop advanced blood glucose monitoring systems that detect insulin levels in real-time. The company's diabetes care division, located in Basel's Grenzacherstrasse facility, has pioneered continuous glucose monitoring technology used worldwide. Insulin, discovered in 1921, revolutionized diabetes treatment. Understanding its peptide structure—composed of 51 amino acids in two chains—is crucial for developing insulin analogs. Basel's pharmaceutical industry has been at the forefront of insulin research, with Roche collaborating on novel insulin formulations that improve glucose control. The city's expertise in protein chemistry and biotechnology makes it an ideal location for insulin research. Modern insulin production uses recombinant DNA technology, a field where Basel's biotech companies excel. This quest explores insulin's classification as a peptide hormone, fundamental knowledge for understanding diabetes pathophysiology and treatment strategies employed in Basel's world-renowned endocrinology clinics."
  },
  {
    id: "HORMONE_ID_BASIC_2",
    difficulty: "BASIC" as Difficulty,
    stage: "HORMONE_IDENTIFICATION" as Stage,
    hormone: HORMONES.find(h => h.name === "cortisol"),
    promptLatex: "Classify the hormone cortisol by its chemical structure.",
    slots: [
      {
        id: "type",
        labelLatex: "Hormone type:",
        placeholder: "Select hormone type...",
        type: "select",
        options: ["peptide", "steroid", "amino_acid_derived"],
        expected: "steroid"
      }
    ],
    baselContext: "In Novartis's Endocrinology Research Laboratory in Basel, scientists study cortisol's role in stress response and metabolism. The lab, situated in the Novartis Campus near the Rhine, focuses on developing medications for adrenal disorders. Cortisol, a steroid hormone derived from cholesterol, is essential for life. Its lipid-soluble structure allows it to cross cell membranes and bind to intracellular receptors. Basel's pharmaceutical companies have extensive experience with steroid chemistry, developing synthetic corticosteroids for treating inflammatory and autoimmune conditions. The city's chemical industry heritage provides a strong foundation for steroid research. Novartis manufactures hydrocortisone, a synthetic cortisol used in hormone replacement therapy for Addison's disease. Understanding cortisol's steroid structure is fundamental for comprehending its mechanism of action and developing targeted therapies. This knowledge is applied daily in Basel University Hospital's endocrinology department, where patients with adrenal insufficiency receive carefully calibrated cortisol replacement therapy."
  },
  {
    id: "HORMONE_ID_BASIC_3",
    difficulty: "BASIC" as Difficulty,
    stage: "HORMONE_IDENTIFICATION" as Stage,
    hormone: HORMONES.find(h => h.name === "thyroxine"),
    promptLatex: "Classify the hormone thyroxine (T_4) by its chemical structure.",
    slots: [
      {
        id: "type",
        labelLatex: "Hormone type:",
        placeholder: "Select hormone type...",
        type: "select",
        options: ["peptide", "steroid", "amino_acid_derived"],
        expected: "amino_acid_derived"
      }
    ],
    baselContext: "At Basel University Hospital's Thyroid Clinic, endocrinologists treat hundreds of thyroid disorder patients annually using levothyroxine, synthetic T_4. The clinic, located in Basel's Petersgraben medical district, collaborates with Roche on thyroid function testing. Thyroxine, synthesized from the amino acid tyrosine, contains four iodine atoms. Its unique structure makes it the primary thyroid hormone regulating metabolism. Basel's pharmaceutical industry produces levothyroxine tablets, one of the most prescribed medications worldwide. The city's expertise in organic chemistry enables precise synthesis of thyroid hormones. Understanding T_4's amino acid-derived structure explains why iodine deficiency causes thyroid disorders—a condition rare in Switzerland due to iodized salt programs. Basel's thyroid specialists emphasize the importance of consistent levothyroxine dosing, as even small variations affect metabolism. The clinic's research focuses on optimizing thyroid hormone replacement, ensuring patients achieve euthyroid status. This fundamental knowledge of thyroid hormone structure underpins all thyroid disorder management in Basel's healthcare system."
  },
  {
    id: "HORMONE_ID_BASIC_4",
    difficulty: "BASIC" as Difficulty,
    stage: "HORMONE_IDENTIFICATION" as Stage,
    hormone: HORMONES.find(h => h.name === "insulin"),
    promptLatex: "Identify which gland produces insulin.",
    slots: [
      {
        id: "gland",
        labelLatex: "Producing gland:",
        placeholder: "Select gland...",
        type: "select",
        options: ["pancreas", "pituitary", "thyroid", "adrenal cortex"],
        expected: "pancreas"
      }
    ],
    baselContext: "At Basel University Hospital's Diabetes Center, patients learn about pancreatic function and insulin production. The center, a leading diabetes care facility in Switzerland, educates patients about the islets of Langerhans—clusters of endocrine cells in the pancreas that produce insulin. Basel's medical education emphasizes understanding pancreatic anatomy and physiology. The pancreas, located behind the stomach, has both exocrine (digestive enzymes) and endocrine (hormone) functions. Beta cells within pancreatic islets synthesize and secrete insulin in response to blood glucose. This knowledge is crucial for understanding Type 1 diabetes, where autoimmune destruction of beta cells eliminates insulin production. Basel's diabetes research facilities, in collaboration with Novartis, study ways to protect or regenerate beta cells. The city's comprehensive diabetes care includes pancreas transplantation for select patients, performed at Basel University Hospital's transplant center. Understanding the pancreas as insulin's source is fundamental for all diabetes education programs in Basel's healthcare system."
  },
  {
    id: "HORMONE_ID_BASIC_5",
    difficulty: "BASIC" as Difficulty,
    stage: "HORMONE_IDENTIFICATION" as Stage,
    hormone: HORMONES.find(h => h.name === "adrenaline"),
    promptLatex: "Classify the hormone adrenaline (epinephrine) by its chemical structure.",
    slots: [
      {
        id: "type",
        labelLatex: "Hormone type:",
        placeholder: "Select hormone type...",
        type: "select",
        options: ["peptide", "steroid", "amino_acid_derived"],
        expected: "amino_acid_derived"
      }
    ],
    baselContext: "In Basel's Emergency Medicine Research Center, physicians study adrenaline's role in acute stress response and resuscitation. The center, part of Basel University Hospital, uses adrenaline in cardiac arrest protocols and anaphylaxis treatment. Adrenaline, synthesized from the amino acid tyrosine, is a catecholamine hormone and neurotransmitter. Its rapid synthesis and action make it ideal for emergency situations. Basel's pharmaceutical companies manufacture adrenaline auto-injectors for severe allergic reactions, devices carried by thousands of Swiss residents. Understanding adrenaline's amino acid-derived structure explains its quick onset—unlike steroid hormones, it acts within seconds by binding to cell surface receptors. The adrenal medulla, the inner part of the adrenal gland, produces adrenaline in response to sympathetic nervous system activation. Basel's physiology research facilities study the fight-or-flight response, where adrenaline increases heart rate, blood pressure, and glucose availability. This fundamental knowledge of adrenaline's structure and function is essential for emergency medicine practiced daily in Basel's hospitals and clinics."
  }
];

/**
 * Gets all quest data for a specific stage and difficulty
 * @param stage - Quest stage
 * @param difficulty - Quest difficulty
 * @returns Array of quests
 */
export function getQuestsByStageAndDifficulty(
  stage: Stage,
  difficulty: Difficulty
): Partial<GB202Quest>[] {
  // For now, return BASIC hormone identification quests
  // This will be expanded with all 60 quests
  if (stage === "HORMONE_IDENTIFICATION" && difficulty === "BASIC") {
    return HORMONE_ID_BASIC;
  }
  
  // Return empty array for other combinations (to be implemented)
  return [];
}

/**
 * Gets total number of quests
 * @returns Total quest count (should be 60)
 */
export function getTotalQuestCount(): number {
  // This will return 60 when all quests are implemented
  return HORMONE_ID_BASIC.length; // Currently 5
}
