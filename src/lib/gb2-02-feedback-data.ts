/**
 * GB2.02 Endocrine System - Feedback Loop Data
 * 
 * This module contains comprehensive data for feedback mechanisms,
 * including negative and positive feedback loops.
 */

import { FeedbackLoop } from './gb2-02-types';

/**
 * Negative feedback loops database
 */
export const NEGATIVE_FEEDBACK_LOOPS: FeedbackLoop[] = [
  // Blood Glucose Regulation (Insulin)
  {
    type: "negative",
    stimulus: "high_blood_glucose",
    response: "glucose_uptake_and_storage",
    description: "blood_glucose_regulation_insulin",
    components: [
      {
        id: "glucose_stimulus",
        type: "stimulus",
        name: "high_blood_glucose",
        description: "elevated_glucose_levels_after_eating",
        connectionType: "stimulatory"
      },
      {
        id: "pancreas_sensor",
        type: "sensor",
        name: "pancreatic_beta_cells",
        description: "detect_high_glucose_levels",
        connectionType: "stimulatory"
      },
      {
        id: "insulin_release",
        type: "control_center",
        name: "insulin_secretion",
        description: "beta_cells_release_insulin",
        connectionType: "stimulatory"
      },
      {
        id: "glucose_uptake",
        type: "effector",
        name: "liver_muscle_adipose_tissue",
        description: "take_up_glucose_from_blood",
        connectionType: "stimulatory"
      },
      {
        id: "glucose_lowered",
        type: "response",
        name: "blood_glucose_decreases",
        description: "glucose_levels_return_to_normal",
        connectionType: "stimulatory"
      },
      {
        id: "insulin_inhibition",
        type: "feedback",
        name: "reduced_insulin_secretion",
        description: "low_glucose_inhibits_further_insulin_release",
        connectionType: "inhibitory"
      }
    ]
  },

  // Blood Glucose Regulation (Glucagon)
  {
    type: "negative",
    stimulus: "low_blood_glucose",
    response: "glucose_release_from_liver",
    description: "blood_glucose_regulation_glucagon",
    components: [
      {
        id: "low_glucose_stimulus",
        type: "stimulus",
        name: "low_blood_glucose",
        description: "decreased_glucose_levels_during_fasting",
        connectionType: "stimulatory"
      },
      {
        id: "pancreas_alpha_sensor",
        type: "sensor",
        name: "pancreatic_alpha_cells",
        description: "detect_low_glucose_levels",
        connectionType: "stimulatory"
      },
      {
        id: "glucagon_release",
        type: "control_center",
        name: "glucagon_secretion",
        description: "alpha_cells_release_glucagon",
        connectionType: "stimulatory"
      },
      {
        id: "glucose_production",
        type: "effector",
        name: "liver",
        description: "releases_glucose_into_blood",
        connectionType: "stimulatory"
      },
      {
        id: "glucose_raised",
        type: "response",
        name: "blood_glucose_increases",
        description: "glucose_levels_return_to_normal",
        connectionType: "stimulatory"
      },
      {
        id: "glucagon_inhibition",
        type: "feedback",
        name: "reduced_glucagon_secretion",
        description: "normal_glucose_inhibits_further_glucagon_release",
        connectionType: "inhibitory"
      }
    ]
  },

  // Thyroid Hormone Regulation
  {
    type: "negative",
    stimulus: "low_thyroid_hormone_levels",
    response: "increased_t3_t4_production",
    setPoint: 1.0,
    description: "thyroid_hormone_regulation_hpt_axis",
    components: [
      {
        id: "low_t3t4_stimulus",
        type: "stimulus",
        name: "low_t3_t4_levels",
        description: "decreased_thyroid_hormone_in_blood",
        connectionType: "stimulatory"
      },
      {
        id: "hypothalamus_sensor",
        type: "sensor",
        name: "hypothalamus",
        description: "detects_low_thyroid_hormone",
        connectionType: "stimulatory"
      },
      {
        id: "trh_release",
        type: "control_center",
        name: "trh_secretion",
        description: "hypothalamus_releases_trh",
        connectionType: "stimulatory"
      },
      {
        id: "pituitary_tsh",
        type: "control_center",
        name: "tsh_secretion",
        description: "pituitary_releases_tsh",
        connectionType: "stimulatory"
      },
      {
        id: "thyroid_effector",
        type: "effector",
        name: "thyroid_gland",
        description: "produces_t3_and_t4",
        connectionType: "stimulatory"
      },
      {
        id: "t3t4_increased",
        type: "response",
        name: "t3_t4_levels_increase",
        description: "thyroid_hormones_return_to_normal",
        connectionType: "stimulatory"
      },
      {
        id: "negative_feedback",
        type: "feedback",
        name: "inhibition_of_trh_and_tsh",
        description: "high_t3_t4_inhibits_hypothalamus_and_pituitary",
        connectionType: "inhibitory"
      }
    ]
  },

  // Cortisol Regulation (HPA Axis)
  {
    type: "negative",
    stimulus: "stress",
    response: "cortisol_release",
    description: "stress_response_hpa_axis",
    components: [
      {
        id: "stress_stimulus",
        type: "stimulus",
        name: "stress",
        description: "physical_or_psychological_stressor",
        connectionType: "stimulatory"
      },
      {
        id: "hypothalamus_crh",
        type: "control_center",
        name: "crh_secretion",
        description: "hypothalamus_releases_crh",
        connectionType: "stimulatory"
      },
      {
        id: "pituitary_acth",
        type: "control_center",
        name: "acth_secretion",
        description: "pituitary_releases_acth",
        connectionType: "stimulatory"
      },
      {
        id: "adrenal_cortex",
        type: "effector",
        name: "adrenal_cortex",
        description: "produces_cortisol",
        connectionType: "stimulatory"
      },
      {
        id: "cortisol_effects",
        type: "response",
        name: "cortisol_effects",
        description: "increased_glucose_suppressed_immune_response",
        connectionType: "stimulatory"
      },
      {
        id: "cortisol_feedback",
        type: "feedback",
        name: "inhibition_of_crh_and_acth",
        description: "high_cortisol_inhibits_hypothalamus_and_pituitary",
        connectionType: "inhibitory"
      }
    ]
  },

  // Calcium Homeostasis (PTH)
  {
    type: "negative",
    stimulus: "low_blood_calcium",
    response: "increased_calcium_reabsorption",
    setPoint: 2.5,
    description: "calcium_regulation_parathyroid_hormone",
    components: [
      {
        id: "low_calcium_stimulus",
        type: "stimulus",
        name: "low_blood_calcium",
        description: "decreased_calcium_levels",
        connectionType: "stimulatory"
      },
      {
        id: "parathyroid_sensor",
        type: "sensor",
        name: "parathyroid_glands",
        description: "detect_low_calcium",
        connectionType: "stimulatory"
      },
      {
        id: "pth_release",
        type: "control_center",
        name: "pth_secretion",
        description: "parathyroid_releases_pth",
        connectionType: "stimulatory"
      },
      {
        id: "calcium_mobilization",
        type: "effector",
        name: "bone_kidney_intestine",
        description: "increase_calcium_release_and_reabsorption",
        connectionType: "stimulatory"
      },
      {
        id: "calcium_increased",
        type: "response",
        name: "blood_calcium_increases",
        description: "calcium_levels_return_to_normal",
        connectionType: "stimulatory"
      },
      {
        id: "pth_inhibition",
        type: "feedback",
        name: "reduced_pth_secretion",
        description: "normal_calcium_inhibits_pth_release",
        connectionType: "inhibitory"
      }
    ]
  },

  // Water Balance (ADH)
  {
    type: "negative",
    stimulus: "dehydration",
    response: "increased_water_reabsorption",
    description: "water_balance_regulation_adh",
    components: [
      {
        id: "dehydration_stimulus",
        type: "stimulus",
        name: "dehydration",
        description: "high_blood_osmolality",
        connectionType: "stimulatory"
      },
      {
        id: "hypothalamus_osmoreceptors",
        type: "sensor",
        name: "hypothalamic_osmoreceptors",
        description: "detect_high_osmolality",
        connectionType: "stimulatory"
      },
      {
        id: "adh_release",
        type: "control_center",
        name: "adh_secretion",
        description: "posterior_pituitary_releases_adh",
        connectionType: "stimulatory"
      },
      {
        id: "kidney_reabsorption",
        type: "effector",
        name: "kidney_collecting_ducts",
        description: "increase_water_reabsorption",
        connectionType: "stimulatory"
      },
      {
        id: "osmolality_decreased",
        type: "response",
        name: "blood_osmolality_decreases",
        description: "water_balance_restored",
        connectionType: "stimulatory"
      },
      {
        id: "adh_inhibition",
        type: "feedback",
        name: "reduced_adh_secretion",
        description: "normal_osmolality_inhibits_adh_release",
        connectionType: "inhibitory"
      }
    ]
  }
];

/**
 * Positive feedback loops database
 */
export const POSITIVE_FEEDBACK_LOOPS: FeedbackLoop[] = [
  // Oxytocin during Childbirth
  {
    type: "positive",
    stimulus: "uterine_contractions",
    response: "stronger_contractions",
    description: "oxytocin_positive_feedback_childbirth",
    components: [
      {
        id: "initial_contractions",
        type: "stimulus",
        name: "uterine_contractions",
        description: "initial_contractions_during_labor",
        connectionType: "stimulatory"
      },
      {
        id: "stretch_receptors",
        type: "sensor",
        name: "cervical_stretch_receptors",
        description: "detect_cervical_stretching",
        connectionType: "stimulatory"
      },
      {
        id: "oxytocin_release",
        type: "control_center",
        name: "oxytocin_secretion",
        description: "posterior_pituitary_releases_oxytocin",
        connectionType: "stimulatory"
      },
      {
        id: "uterine_muscle",
        type: "effector",
        name: "uterine_smooth_muscle",
        description: "contracts_more_strongly",
        connectionType: "stimulatory"
      },
      {
        id: "stronger_contractions",
        type: "response",
        name: "stronger_contractions",
        description: "increased_force_and_frequency",
        connectionType: "stimulatory"
      },
      {
        id: "amplification",
        type: "feedback",
        name: "more_oxytocin_release",
        description: "stronger_contractions_trigger_more_oxytocin",
        connectionType: "stimulatory"
      }
    ]
  },

  // LH Surge during Ovulation
  {
    type: "positive",
    stimulus: "rising_estrogen_levels",
    response: "lh_surge",
    description: "lh_surge_positive_feedback_ovulation",
    components: [
      {
        id: "estrogen_rise",
        type: "stimulus",
        name: "rising_estrogen",
        description: "estrogen_from_developing_follicle",
        connectionType: "stimulatory"
      },
      {
        id: "hypothalamus_gnrh",
        type: "control_center",
        name: "gnrh_secretion",
        description: "hypothalamus_releases_gnrh",
        connectionType: "stimulatory"
      },
      {
        id: "pituitary_lh",
        type: "control_center",
        name: "lh_secretion",
        description: "pituitary_releases_lh",
        connectionType: "stimulatory"
      },
      {
        id: "follicle_maturation",
        type: "effector",
        name: "ovarian_follicle",
        description: "produces_more_estrogen",
        connectionType: "stimulatory"
      },
      {
        id: "lh_surge",
        type: "response",
        name: "lh_surge",
        description: "rapid_increase_in_lh_levels",
        connectionType: "stimulatory"
      },
      {
        id: "positive_feedback",
        type: "feedback",
        name: "more_estrogen_and_lh",
        description: "high_estrogen_amplifies_lh_release",
        connectionType: "stimulatory"
      }
    ]
  }
];

/**
 * Gets all feedback loops (negative and positive)
 * @returns Array of all feedback loops
 */
export function getAllFeedbackLoops(): FeedbackLoop[] {
  return [...NEGATIVE_FEEDBACK_LOOPS, ...POSITIVE_FEEDBACK_LOOPS];
}

/**
 * Gets a feedback loop by description
 * @param description - Partial description to search for
 * @returns Feedback loop or undefined
 */
export function getFeedbackLoopByDescription(description: string): FeedbackLoop | undefined {
  const lowerDesc = description.toLowerCase();
  return getAllFeedbackLoops().find(loop => 
    loop.description.toLowerCase().includes(lowerDesc)
  );
}

/**
 * Gets all negative feedback loops
 * @returns Array of negative feedback loops
 */
export function getNegativeFeedbackLoops(): FeedbackLoop[] {
  return NEGATIVE_FEEDBACK_LOOPS;
}

/**
 * Gets all positive feedback loops
 * @returns Array of positive feedback loops
 */
export function getPositiveFeedbackLoops(): FeedbackLoop[] {
  return POSITIVE_FEEDBACK_LOOPS;
}
