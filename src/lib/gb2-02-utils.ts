/**
 * GB2.02 Endocrine System - Utility Functions
 * 
 * This module provides utility functions for hormone classification, gland mapping,
 * target organ identification, and data validation.
 */

import { 
  Hormone, 
  HormoneType, 
  EndocrineGland, 
  GB202Quest,
  FeedbackLoop,
  ClinicalCase,
  LabResult,
  LabStatus
} from './gb2-02-types';

/**
 * Gets the hormone type based on its chemical structure
 * @param hormone - Hormone object
 * @returns Hormone type classification
 */
export function getHormoneType(hormone: Hormone): HormoneType {
  return hormone.type;
}

/**
 * Verifies if a hormone is correctly classified by type
 * @param hormone - Hormone object
 * @param expectedType - Expected hormone type
 * @returns True if classification is correct
 */
export function verifyHormoneType(hormone: Hormone, expectedType: HormoneType): boolean {
  return hormone.type === expectedType;
}

/**
 * Gets the gland that produces a specific hormone
 * @param hormone - Hormone object
 * @returns Gland name
 */
export function getGlandForHormone(hormone: Hormone): string {
  return hormone.gland;
}

/**
 * Verifies if a hormone is produced by the specified gland
 * @param hormone - Hormone object
 * @param expectedGland - Expected gland name
 * @returns True if gland is correct
 */
export function verifyGlandForHormone(hormone: Hormone, expectedGland: string): boolean {
  return hormone.gland.toLowerCase() === expectedGland.toLowerCase();
}

/**
 * Gets the target organs for a specific hormone
 * @param hormone - Hormone object
 * @returns Array of target organ names
 */
export function getTargetOrgans(hormone: Hormone): string[] {
  return hormone.targetOrgans;
}

/**
 * Verifies if the target organs are correct for a hormone
 * @param hormone - Hormone object
 * @param expectedOrgans - Expected target organs
 * @returns True if all organs match
 */
export function verifyTargetOrgans(hormone: Hormone, expectedOrgans: string[]): boolean {
  const hormoneOrgans = hormone.targetOrgans.map(o => o.toLowerCase()).sort();
  const expected = expectedOrgans.map(o => o.toLowerCase()).sort();
  
  if (hormoneOrgans.length !== expected.length) return false;
  
  return hormoneOrgans.every((organ, index) => organ === expected[index]);
}

/**
 * Gets the primary function of a hormone
 * @param hormone - Hormone object
 * @returns Primary function description
 */
export function getHormoneFunction(hormone: Hormone): string {
  return hormone.primaryFunction;
}

/**
 * Verifies if the hormone function is correct
 * @param hormone - Hormone object
 * @param expectedFunction - Expected function description
 * @returns True if function matches
 */
export function verifyHormoneFunction(hormone: Hormone, expectedFunction: string): boolean {
  return hormone.primaryFunction.toLowerCase().includes(expectedFunction.toLowerCase());
}

/**
 * Validates that a hormone object has all required fields
 * @param hormone - Hormone object to validate
 * @returns True if hormone data is complete
 */
export function validateHormoneData(hormone: Hormone): boolean {
  return !!(
    hormone.name &&
    hormone.nameLatex &&
    hormone.type &&
    hormone.gland &&
    hormone.targetOrgans &&
    hormone.targetOrgans.length > 0 &&
    hormone.primaryFunction
  );
}

/**
 * Validates that a gland object has all required fields
 * @param gland - Gland object to validate
 * @returns True if gland data is complete
 */
export function validateGlandData(gland: EndocrineGland): boolean {
  return !!(
    gland.name &&
    gland.displayName &&
    gland.location &&
    typeof gland.location.x === 'number' &&
    typeof gland.location.y === 'number' &&
    gland.hormones &&
    gland.hormones.length > 0 &&
    gland.functions &&
    gland.functions.length > 0
  );
}

/**
 * Validates that a feedback loop has all required components
 * @param feedbackLoop - Feedback loop object to validate
 * @returns True if feedback loop is complete
 */
export function validateFeedbackLoop(feedbackLoop: FeedbackLoop): boolean {
  return !!(
    feedbackLoop.type &&
    feedbackLoop.components &&
    feedbackLoop.components.length > 0 &&
    feedbackLoop.stimulus &&
    feedbackLoop.response &&
    feedbackLoop.description
  );
}

/**
 * Validates that a clinical case has all required fields
 * @param clinicalCase - Clinical case object to validate
 * @returns True if clinical case is complete
 */
export function validateClinicalCase(clinicalCase: ClinicalCase): boolean {
  return !!(
    clinicalCase.patientInfo &&
    clinicalCase.chiefComplaint &&
    clinicalCase.symptoms &&
    clinicalCase.symptoms.length > 0 &&
    clinicalCase.labResults &&
    clinicalCase.labResults.length > 0 &&
    clinicalCase.expectedDiagnosis
  );
}

/**
 * Validates that a quest object has all required fields
 * @param quest - Quest object to validate
 * @returns True if quest data is complete
 */
export function validateQuestData(quest: GB202Quest): boolean {
  const hasRequiredFields = !!(quest.id && quest.difficulty && quest.stage && quest.promptLatex);
  
  // Must have at least one content type
  const hasContent = !!(quest.hormone || quest.feedbackLoop || quest.clinicalCase);
  
  // If has slots, they must have expected answers
  const slotsValid = !quest.slots || quest.slots.every(slot => slot.expected !== undefined);
  
  return hasRequiredFields && hasContent && slotsValid;
}

/**
 * Determines the lab result status based on value and reference range
 * @param value - Measured value
 * @param referenceRange - Normal range
 * @returns Status (normal, high, or low)
 */
export function determineLabStatus(
  value: number, 
  referenceRange: { min: number; max: number }
): LabStatus {
  if (value < referenceRange.min) return "low";
  if (value > referenceRange.max) return "high";
  return "normal";
}

/**
 * Calculates lab results with status indicators
 * @param labResults - Array of lab results
 * @returns Lab results with calculated status
 */
export function calculateLabStatuses(labResults: LabResult[]): LabResult[] {
  return labResults.map(result => ({
    ...result,
    status: determineLabStatus(result.value, result.referenceRange)
  }));
}

/**
 * Checks if a hormone is peptide type (amino acid chains)
 * @param hormone - Hormone object
 * @returns True if peptide hormone
 */
export function isPeptideHormone(hormone: Hormone): boolean {
  return hormone.type === "peptide";
}

/**
 * Checks if a hormone is steroid type (cholesterol-derived)
 * @param hormone - Hormone object
 * @returns True if steroid hormone
 */
export function isSteroidHormone(hormone: Hormone): boolean {
  return hormone.type === "steroid";
}

/**
 * Checks if a hormone is amino acid-derived type
 * @param hormone - Hormone object
 * @returns True if amino acid-derived hormone
 */
export function isAminoAcidDerivedHormone(hormone: Hormone): boolean {
  return hormone.type === "amino_acid_derived";
}

/**
 * Gets all hormones of a specific type from a list
 * @param hormones - Array of hormones
 * @param type - Hormone type to filter by
 * @returns Filtered array of hormones
 */
export function getHormonesByType(hormones: Hormone[], type: HormoneType): Hormone[] {
  return hormones.filter(h => h.type === type);
}

/**
 * Gets all hormones produced by a specific gland
 * @param hormones - Array of hormones
 * @param gland - Gland name
 * @returns Filtered array of hormones
 */
export function getHormonesByGland(hormones: Hormone[], gland: string): Hormone[] {
  return hormones.filter(h => h.gland.toLowerCase() === gland.toLowerCase());
}

/**
 * Counts unique hormones in a quest pool
 * @param quests - Array of quests
 * @returns Number of unique hormones
 */
export function countUniqueHormones(quests: GB202Quest[]): number {
  const hormoneNames = new Set<string>();
  
  quests.forEach(quest => {
    if (quest.hormone) {
      hormoneNames.add(quest.hormone.name);
    }
  });
  
  return hormoneNames.size;
}

/**
 * Checks if Basel context is present and meets word count requirements
 * @param baselContext - Basel context string
 * @returns True if context is valid (150-250 words)
 */
export function validateBaselContext(baselContext: string | undefined): boolean {
  if (!baselContext) return false;
  
  const wordCount = baselContext.split(/\s+/).length;
  return wordCount >= 150 && wordCount <= 250;
}

/**
 * Checks if Basel context includes required location references
 * @param baselContext - Basel context string
 * @returns True if includes Basel-specific locations
 */
export function hasBaselReferences(baselContext: string | undefined): boolean {
  if (!baselContext) return false;
  
  const baselLocations = [
    "Basel University Hospital",
    "Novartis",
    "Roche",
    "Basel Endocrinology Clinic",
    "Basel"
  ];
  
  return baselLocations.some(location => 
    baselContext.toLowerCase().includes(location.toLowerCase())
  );
}
