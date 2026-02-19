/**
 * GB2.02 Endocrine System - Verification Logic
 * 
 * This module provides verification functions for hormone classification,
 * gland mapping, feedback loops, and clinical diagnoses.
 */

import { 
  Hormone, 
  HormoneType, 
  FeedbackLoop, 
  ClinicalCase,
  LabResult 
} from './gb2-02-types';

/**
 * Verifies hormone type classification
 * @param hormone - Hormone object
 * @param userAnswer - User's classification
 * @returns True if classification is correct
 */
export function verifyHormoneClassification(hormone: Hormone, userAnswer: HormoneType): boolean {
  return hormone.type === userAnswer;
}

/**
 * Verifies gland identification for a hormone
 * @param hormone - Hormone object
 * @param userAnswer - User's gland identification
 * @returns True if gland is correct
 */
export function verifyGlandIdentification(hormone: Hormone, userAnswer: string): boolean {
  return hormone.gland.toLowerCase() === userAnswer.toLowerCase();
}

/**
 * Verifies hormone function identification
 * @param hormone - Hormone object
 * @param userAnswer - User's function description
 * @returns True if function matches
 */
export function verifyHormoneFunction(hormone: Hormone, userAnswer: string): boolean {
  const expectedFunction = hormone.primaryFunction.toLowerCase();
  const userFunction = userAnswer.toLowerCase();
  
  // Check if user answer contains key terms from expected function
  const keyTerms = expectedFunction.split(/\s+/).filter(term => term.length > 3);
  const matchCount = keyTerms.filter(term => userFunction.includes(term)).length;
  
  // Consider correct if at least 50% of key terms match
  return matchCount >= keyTerms.length * 0.5;
}

/**
 * Verifies target organ identification
 * @param hormone - Hormone object
 * @param userAnswer - User's target organ(s)
 * @returns True if target organs are correct
 */
export function verifyTargetOrgans(hormone: Hormone, userAnswer: string | string[]): boolean {
  const expectedOrgans = hormone.targetOrgans.map(o => o.toLowerCase());
  const userOrgans = Array.isArray(userAnswer) 
    ? userAnswer.map(o => o.toLowerCase())
    : [userAnswer.toLowerCase()];
  
  // Check if all user answers are in expected organs
  return userOrgans.every(organ => expectedOrgans.includes(organ));
}

/**
 * Verifies negative feedback loop structure
 * @param feedbackLoop - Feedback loop object
 * @returns True if loop has correct negative feedback structure
 */
export function verifyNegativeFeedbackStructure(feedbackLoop: FeedbackLoop): boolean {
  if (feedbackLoop.type !== "negative") return false;
  
  // Must have stimulus, response, and feedback components
  const hasStimulus = feedbackLoop.components.some(c => c.type === "stimulus");
  const hasResponse = feedbackLoop.components.some(c => c.type === "response");
  const hasFeedback = feedbackLoop.components.some(c => c.type === "feedback");
  
  // Must have at least one inhibitory connection
  const hasInhibitory = feedbackLoop.components.some(c => c.connectionType === "inhibitory");
  
  return hasStimulus && hasResponse && hasFeedback && hasInhibitory;
}

/**
 * Verifies positive feedback loop structure
 * @param feedbackLoop - Feedback loop object
 * @returns True if loop has correct positive feedback structure
 */
export function verifyPositiveFeedbackStructure(feedbackLoop: FeedbackLoop): boolean {
  if (feedbackLoop.type !== "positive") return false;
  
  // Must have stimulus, response, and feedback components
  const hasStimulus = feedbackLoop.components.some(c => c.type === "stimulus");
  const hasResponse = feedbackLoop.components.some(c => c.type === "response");
  const hasFeedback = feedbackLoop.components.some(c => c.type === "feedback");
  
  // Must have stimulatory connections (amplification)
  const hasStimulatory = feedbackLoop.components.some(c => c.connectionType === "stimulatory");
  
  return hasStimulus && hasResponse && hasFeedback && hasStimulatory;
}

/**
 * Verifies feedback pathway sequence
 * @param feedbackLoop - Feedback loop object
 * @param userPathway - User's pathway sequence
 * @returns True if pathway is correct
 */
export function verifyFeedbackPathway(feedbackLoop: FeedbackLoop, userPathway: string[]): boolean {
  const expectedComponents = feedbackLoop.components.map(c => c.name.toLowerCase());
  const userComponents = userPathway.map(c => c.toLowerCase());
  
  // Check if user pathway matches expected sequence
  if (userComponents.length !== expectedComponents.length) return false;
  
  return userComponents.every((component, index) => 
    expectedComponents[index].includes(component) || component.includes(expectedComponents[index])
  );
}

/**
 * Verifies homeostatic response
 * @param stimulus - The stimulus (e.g., "high blood glucose")
 * @param userResponse - User's identified hormonal response
 * @param expectedResponse - Expected hormonal response
 * @returns True if response is correct
 */
export function verifyHomeostaticResponse(
  stimulus: string, 
  userResponse: string, 
  expectedResponse: string
): boolean {
  return userResponse.toLowerCase() === expectedResponse.toLowerCase();
}

/**
 * Verifies hypothalamic-pituitary axis mapping
 * @param pituitaryHormone - Pituitary hormone name
 * @param userAnswer - User's identified hypothalamic hormone
 * @returns True if mapping is correct
 */
export function verifyHypothalamicPituitaryAxis(
  pituitaryHormone: string, 
  userAnswer: string
): boolean {
  const mappings: Record<string, string> = {
    "tsh": "trh",
    "acth": "crh",
    "growth hormone": "ghrh",
    "gh": "ghrh",
    "fsh": "gnrh",
    "lh": "gnrh",
    "prolactin": "dopamine"
  };
  
  const expected = mappings[pituitaryHormone.toLowerCase()];
  return expected === userAnswer.toLowerCase();
}

/**
 * Verifies clinical disorder diagnosis from symptoms
 * @param symptoms - Array of symptoms
 * @param labResults - Lab results
 * @param userDiagnosis - User's diagnosis
 * @param expectedDiagnosis - Expected diagnosis
 * @returns True if diagnosis is correct
 */
export function verifyDisorderDiagnosis(
  symptoms: string[],
  labResults: LabResult[],
  userDiagnosis: string,
  expectedDiagnosis: string
): boolean {
  return userDiagnosis.toLowerCase() === expectedDiagnosis.toLowerCase();
}

/**
 * Verifies hormone level interpretation
 * @param tsh - TSH level
 * @param t4 - T4 level
 * @param userInterpretation - User's interpretation
 * @returns True if interpretation is correct
 */
export function verifyHormoneLevelInterpretation(
  tsh: { value: number; status: string },
  t4: { value: number; status: string },
  userInterpretation: string
): boolean {
  const interpretation = userInterpretation.toLowerCase();
  
  // Primary hypothyroidism: high TSH, low T4
  if (tsh.status === "high" && t4.status === "low") {
    return interpretation.includes("primary hypothyroidism");
  }
  
  // Primary hyperthyroidism: low TSH, high T4
  if (tsh.status === "low" && t4.status === "high") {
    return interpretation.includes("primary hyperthyroidism");
  }
  
  // Secondary hypothyroidism: low TSH, low T4
  if (tsh.status === "low" && t4.status === "low") {
    return interpretation.includes("secondary hypothyroidism");
  }
  
  return false;
}

/**
 * Verifies diabetes type differentiation
 * @param characteristics - Disease characteristics
 * @param userType - User's identified type
 * @returns True if type is correct
 */
export function verifyDiabetesType(
  characteristics: string[],
  userType: "Type 1" | "Type 2"
): boolean {
  const charLower = characteristics.map(c => c.toLowerCase());
  
  // Type 1 indicators
  const type1Indicators = [
    "autoimmune",
    "beta cell destruction",
    "insulin from diagnosis",
    "ketoacidosis",
    "young age"
  ];
  
  // Type 2 indicators
  const type2Indicators = [
    "insulin resistance",
    "lifestyle",
    "oral medication",
    "obesity",
    "adult onset"
  ];
  
  const type1Matches = type1Indicators.filter(indicator => 
    charLower.some(char => char.includes(indicator))
  ).length;
  
  const type2Matches = type2Indicators.filter(indicator => 
    charLower.some(char => char.includes(indicator))
  ).length;
  
  if (userType === "Type 1") {
    return type1Matches > type2Matches;
  } else {
    return type2Matches > type1Matches;
  }
}

/**
 * Verifies thyroid disorder mechanism
 * @param disorder - Disorder name
 * @param userMechanism - User's identified mechanism
 * @returns True if mechanism is correct
 */
export function verifyThyroidDisorderMechanism(
  disorder: string,
  userMechanism: string
): boolean {
  const mechanisms: Record<string, string[]> = {
    "graves' disease": ["autoimmune", "tsh receptor", "stimulation"],
    "hashimoto's thyroiditis": ["autoimmune", "thyroid destruction"],
    "iodine deficiency": ["reduced t3/t4", "goiter"],
    "thyroid nodules": ["autonomous", "hormone production"]
  };
  
  const disorderLower = disorder.toLowerCase();
  const mechanismLower = userMechanism.toLowerCase();
  
  const expectedTerms = mechanisms[disorderLower] || [];
  const matchCount = expectedTerms.filter(term => mechanismLower.includes(term)).length;
  
  return matchCount >= expectedTerms.length * 0.5;
}

/**
 * Verifies hormone therapy matching
 * @param disorder - Endocrine disorder
 * @param userTherapy - User's identified therapy
 * @returns True if therapy is correct
 */
export function verifyHormoneTherapy(
  disorder: string,
  userTherapy: string
): boolean {
  const therapies: Record<string, string[]> = {
    "hypothyroidism": ["levothyroxine", "t4"],
    "type 1 diabetes": ["insulin"],
    "addison's disease": ["hydrocortisone", "fludrocortisone"],
    "growth hormone deficiency": ["recombinant growth hormone", "growth hormone"]
  };
  
  const disorderLower = disorder.toLowerCase();
  const therapyLower = userTherapy.toLowerCase();
  
  const expectedTherapies = therapies[disorderLower] || [];
  return expectedTherapies.some(therapy => therapyLower.includes(therapy));
}

/**
 * Verifies stress response pathway
 * @param stressType - Type of stress (acute or chronic)
 * @param userResponse - User's identified hormonal response
 * @returns True if response is correct
 */
export function verifyStressResponse(
  stressType: "acute" | "chronic",
  userResponse: string
): boolean {
  const responseLower = userResponse.toLowerCase();
  
  if (stressType === "acute") {
    return responseLower.includes("adrenaline") || responseLower.includes("epinephrine");
  } else {
    return responseLower.includes("cortisol") || responseLower.includes("hpa axis");
  }
}

/**
 * Verifies calcium homeostasis response
 * @param calciumLevel - "high" or "low"
 * @param userResponse - User's identified hormonal response
 * @returns True if response is correct
 */
export function verifyCalciumHomeostasis(
  calciumLevel: "high" | "low",
  userResponse: string
): boolean {
  const responseLower = userResponse.toLowerCase();
  
  if (calciumLevel === "low") {
    return responseLower.includes("pth") || responseLower.includes("parathyroid hormone");
  } else {
    return responseLower.includes("calcitonin");
  }
}

/**
 * Verifies water balance regulation
 * @param condition - "dehydration" or "low blood pressure"
 * @param userResponse - User's identified hormonal response
 * @returns True if response is correct
 */
export function verifyWaterBalance(
  condition: string,
  userResponse: string
): boolean {
  const responseLower = userResponse.toLowerCase();
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes("dehydration")) {
    return responseLower.includes("adh") || responseLower.includes("vasopressin");
  } else if (conditionLower.includes("blood pressure")) {
    return responseLower.includes("aldosterone") || responseLower.includes("adh");
  }
  
  return false;
}
