/**
 * GB2.02 Endocrine System - Hormone Data
 * 
 * This module contains comprehensive data for all hormones used in the module,
 * including their types, glands, target organs, and functions.
 */

import { Hormone, EndocrineGland } from './gb2-02-types';

/**
 * Complete hormone database
 */
export const HORMONES: Hormone[] = [
  // Peptide Hormones (amino acid chains)
  {
    name: "insulin",
    nameLatex: "\\text{Insulin}",
    type: "peptide",
    gland: "pancreas",
    targetOrgans: ["liver", "muscle", "adipose tissue"],
    primaryFunction: "lowers blood glucose levels",
    structure: "composed of amino acid chains (51 amino acids in two chains)",
    regulationMechanism: "secreted in response to high blood glucose"
  },
  {
    name: "glucagon",
    nameLatex: "\\text{Glucagon}",
    type: "peptide",
    gland: "pancreas",
    targetOrgans: ["liver"],
    primaryFunction: "raises blood glucose levels",
    structure: "composed of amino acid chains (29 amino acids)",
    regulationMechanism: "secreted in response to low blood glucose"
  },
  {
    name: "growth hormone",
    nameLatex: "\\text{Growth Hormone}",
    abbreviation: "GH",
    type: "peptide",
    gland: "anterior pituitary",
    targetOrgans: ["liver", "bone", "muscle"],
    primaryFunction: "stimulates growth and cell reproduction",
    structure: "composed of amino acid chains (191 amino acids)",
    regulationMechanism: "regulated by GHRH and somatostatin from hypothalamus"
  },
  {
    name: "TSH",
    nameLatex: "\\text{TSH}",
    abbreviation: "TSH",
    type: "peptide",
    gland: "anterior pituitary",
    targetOrgans: ["thyroid gland"],
    primaryFunction: "stimulates thyroid hormone production",
    structure: "composed of amino acid chains (glycoprotein)",
    regulationMechanism: "regulated by TRH from hypothalamus and negative feedback from T3/T4"
  },
  {
    name: "ACTH",
    nameLatex: "\\text{ACTH}",
    abbreviation: "ACTH",
    type: "peptide",
    gland: "anterior pituitary",
    targetOrgans: ["adrenal cortex"],
    primaryFunction: "stimulates cortisol production",
    structure: "composed of amino acid chains (39 amino acids)",
    regulationMechanism: "regulated by CRH from hypothalamus and negative feedback from cortisol"
  },
  {
    name: "FSH",
    nameLatex: "\\text{FSH}",
    abbreviation: "FSH",
    type: "peptide",
    gland: "anterior pituitary",
    targetOrgans: ["gonads"],
    primaryFunction: "stimulates follicle development and spermatogenesis",
    structure: "composed of amino acid chains (glycoprotein)",
    regulationMechanism: "regulated by GnRH from hypothalamus"
  },
  {
    name: "LH",
    nameLatex: "\\text{LH}",
    abbreviation: "LH",
    type: "peptide",
    gland: "anterior pituitary",
    targetOrgans: ["gonads"],
    primaryFunction: "triggers ovulation and testosterone production",
    structure: "composed of amino acid chains (glycoprotein)",
    regulationMechanism: "regulated by GnRH from hypothalamus"
  },
  {
    name: "prolactin",
    nameLatex: "\\text{Prolactin}",
    type: "peptide",
    gland: "anterior pituitary",
    targetOrgans: ["mammary glands"],
    primaryFunction: "stimulates milk production",
    structure: "composed of amino acid chains (199 amino acids)",
    regulationMechanism: "inhibited by dopamine from hypothalamus"
  },
  {
    name: "ADH",
    nameLatex: "\\text{ADH}",
    abbreviation: "ADH",
    type: "peptide",
    gland: "posterior pituitary",
    targetOrgans: ["kidney collecting ducts"],
    primaryFunction: "increases water reabsorption",
    structure: "composed of amino acid chains (9 amino acids)",
    regulationMechanism: "secreted in response to dehydration and high blood osmolality"
  },
  {
    name: "oxytocin",
    nameLatex: "\\text{Oxytocin}",
    type: "peptide",
    gland: "posterior pituitary",
    targetOrgans: ["uterus", "mammary glands"],
    primaryFunction: "stimulates uterine contractions and milk ejection",
    structure: "composed of amino acid chains (9 amino acids)",
    regulationMechanism: "positive feedback during childbirth"
  },
  {
    name: "PTH",
    nameLatex: "\\text{PTH}",
    abbreviation: "PTH",
    type: "peptide",
    gland: "parathyroid",
    targetOrgans: ["bone", "kidney", "intestine"],
    primaryFunction: "increases blood calcium levels",
    structure: "composed of amino acid chains (84 amino acids)",
    regulationMechanism: "secreted in response to low blood calcium"
  },
  {
    name: "calcitonin",
    nameLatex: "\\text{Calcitonin}",
    type: "peptide",
    gland: "thyroid",
    targetOrgans: ["bone", "kidney"],
    primaryFunction: "decreases blood calcium levels",
    structure: "composed of amino acid chains (32 amino acids)",
    regulationMechanism: "secreted in response to high blood calcium"
  },

  // Steroid Hormones (cholesterol-derived)
  {
    name: "cortisol",
    nameLatex: "\\text{Cortisol}",
    type: "steroid",
    gland: "adrenal cortex",
    targetOrgans: ["liver", "muscle", "adipose tissue", "immune cells"],
    primaryFunction: "regulates stress response and metabolism",
    structure: "derived from cholesterol",
    regulationMechanism: "regulated by ACTH via HPA axis"
  },
  {
    name: "aldosterone",
    nameLatex: "\\text{Aldosterone}",
    type: "steroid",
    gland: "adrenal cortex",
    targetOrgans: ["kidney"],
    primaryFunction: "increases sodium and water reabsorption",
    structure: "derived from cholesterol",
    regulationMechanism: "regulated by renin-angiotensin system and blood potassium"
  },
  {
    name: "testosterone",
    nameLatex: "\\text{Testosterone}",
    type: "steroid",
    gland: "testes",
    targetOrgans: ["muscle", "bone", "reproductive organs"],
    primaryFunction: "promotes male sexual characteristics and muscle growth",
    structure: "derived from cholesterol",
    regulationMechanism: "regulated by LH from pituitary"
  },
  {
    name: "estrogen",
    nameLatex: "\\text{Estrogen}",
    type: "steroid",
    gland: "ovaries",
    targetOrgans: ["uterus", "breast", "bone"],
    primaryFunction: "promotes female sexual characteristics and regulates menstrual cycle",
    structure: "derived from cholesterol",
    regulationMechanism: "regulated by FSH and LH from pituitary"
  },
  {
    name: "progesterone",
    nameLatex: "\\text{Progesterone}",
    type: "steroid",
    gland: "ovaries",
    targetOrgans: ["uterus"],
    primaryFunction: "prepares uterus for pregnancy and maintains pregnancy",
    structure: "derived from cholesterol",
    regulationMechanism: "produced by corpus luteum after ovulation"
  },

  // Amino Acid-Derived Hormones (synthesized from single amino acids)
  {
    name: "thyroxine",
    nameLatex: "T_4",
    abbreviation: "T4",
    type: "amino_acid_derived",
    gland: "thyroid",
    targetOrgans: ["all body cells"],
    primaryFunction: "regulates metabolic rate",
    structure: "synthesized from single amino acid tyrosine",
    regulationMechanism: "regulated by TSH from pituitary"
  },
  {
    name: "triiodothyronine",
    nameLatex: "T_3",
    abbreviation: "T3",
    type: "amino_acid_derived",
    gland: "thyroid",
    targetOrgans: ["all body cells"],
    primaryFunction: "regulates metabolic rate (more potent than T4)",
    structure: "synthesized from single amino acid tyrosine",
    regulationMechanism: "regulated by TSH from pituitary"
  },
  {
    name: "adrenaline",
    nameLatex: "\\text{Adrenaline}",
    type: "amino_acid_derived",
    gland: "adrenal medulla",
    targetOrgans: ["heart", "blood vessels", "liver", "muscle"],
    primaryFunction: "prepares body for fight-or-flight response",
    structure: "synthesized from single amino acid tyrosine",
    regulationMechanism: "released in response to stress via sympathetic nervous system"
  },
  {
    name: "noradrenaline",
    nameLatex: "\\text{Noradrenaline}",
    type: "amino_acid_derived",
    gland: "adrenal medulla",
    targetOrgans: ["blood vessels", "heart"],
    primaryFunction: "increases blood pressure and heart rate",
    structure: "synthesized from single amino acid tyrosine",
    regulationMechanism: "released in response to stress via sympathetic nervous system"
  },
];

/**
 * Endocrine gland database
 */
export const GLANDS: EndocrineGland[] = [
  {
    name: "hypothalamus",
    displayName: "Hypothalamus",
    location: { x: 50, y: 15 },
    hormones: ["TRH", "CRH", "GHRH", "GnRH", "dopamine"],
    functions: ["regulates pituitary function", "controls body temperature", "regulates hunger and thirst"],
  },
  {
    name: "pituitary",
    displayName: "Pituitary Gland",
    location: { x: 50, y: 18 },
    hormones: ["GH", "TSH", "ACTH", "FSH", "LH", "prolactin", "ADH", "oxytocin"],
    functions: ["master gland controlling other endocrine glands", "regulates growth", "regulates reproduction"],
    subdivisions: ["anterior", "posterior"],
  },
  {
    name: "pineal",
    displayName: "Pineal Gland",
    location: { x: 50, y: 12 },
    hormones: ["melatonin"],
    functions: ["regulates sleep-wake cycle"],
  },
  {
    name: "thyroid",
    displayName: "Thyroid Gland",
    location: { x: 50, y: 25 },
    hormones: ["T3", "T4", "calcitonin"],
    functions: ["regulates metabolism", "regulates calcium levels"],
  },
  {
    name: "parathyroid",
    displayName: "Parathyroid Glands",
    location: { x: 50, y: 26 },
    hormones: ["PTH"],
    functions: ["regulates calcium and phosphate levels"],
  },
  {
    name: "thymus",
    displayName: "Thymus",
    location: { x: 50, y: 35 },
    hormones: ["thymosin"],
    functions: ["develops T-cells for immune system"],
  },
  {
    name: "adrenal",
    displayName: "Adrenal Glands",
    location: { x: 50, y: 50 },
    hormones: ["cortisol", "aldosterone", "adrenaline", "noradrenaline"],
    functions: ["regulates stress response", "regulates blood pressure", "regulates metabolism"],
    subdivisions: ["cortex", "medulla"],
  },
  {
    name: "pancreas",
    displayName: "Pancreas",
    location: { x: 50, y: 55 },
    hormones: ["insulin", "glucagon"],
    functions: ["regulates blood glucose levels"],
  },
  {
    name: "ovaries",
    displayName: "Ovaries",
    location: { x: 50, y: 75 },
    hormones: ["estrogen", "progesterone"],
    functions: ["produces female sex hormones", "regulates menstrual cycle"],
  },
  {
    name: "testes",
    displayName: "Testes",
    location: { x: 50, y: 80 },
    hormones: ["testosterone"],
    functions: ["produces male sex hormones", "produces sperm"],
  },
];

/**
 * Gets a hormone by name
 * @param name - Hormone name or abbreviation
 * @returns Hormone object or undefined
 */
export function getHormoneByName(name: string): Hormone | undefined {
  const lowerName = name.toLowerCase();
  return HORMONES.find(h => 
    h.name.toLowerCase() === lowerName || 
    h.abbreviation?.toLowerCase() === lowerName
  );
}

/**
 * Gets a gland by name
 * @param name - Gland name
 * @returns Gland object or undefined
 */
export function getGlandByName(name: string): EndocrineGland | undefined {
  const lowerName = name.toLowerCase();
  return GLANDS.find(g => g.name.toLowerCase() === lowerName);
}

/**
 * Gets all peptide hormones
 * @returns Array of peptide hormones
 */
export function getPeptideHormones(): Hormone[] {
  return HORMONES.filter(h => h.type === "peptide");
}

/**
 * Gets all steroid hormones
 * @returns Array of steroid hormones
 */
export function getSteroidHormones(): Hormone[] {
  return HORMONES.filter(h => h.type === "steroid");
}

/**
 * Gets all amino acid-derived hormones
 * @returns Array of amino acid-derived hormones
 */
export function getAminoAcidDerivedHormones(): Hormone[] {
  return HORMONES.filter(h => h.type === "amino_acid_derived");
}

/**
 * Gets all hormones produced by a specific gland
 * @param glandName - Name of the gland
 * @returns Array of hormones
 */
export function getHormonesByGland(glandName: string): Hormone[] {
  const lowerGland = glandName.toLowerCase();
  return HORMONES.filter(h => h.gland.toLowerCase() === lowerGland);
}
