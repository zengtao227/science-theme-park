/**
 * GB2.02 Endocrine System - Feedback Loop Data
 * 
 * This module contains comprehensive data for feedback mechanisms,
 * including negative and positive feedback loops.
 */

import { FeedbackLoop, FeedbackComponent } from './gb2-02-types';

/**
 * Negative feedback loops database
 */
export const NEGATIVE_FEEDBACK_LOOPS: FeedbackLoop[] = [
  // Blood Glucose Regulation (Insulin)
  {
    type: "negative",
    stimulus: "high blood glucose",
    response: "glucose uptake and storage",
    description: "Blood glucose regulation via insulin",
    components: [
      {
        id: "glucose_stimulus",
        type: "stimulus",
        name: "High blood glucose",
        description: "Elevated glucose levels after eating",
        connectionType: "stimulatory"
      },
      {
        id: "pancreas_sensor",
        type: "sensor",
        name: "Pancreatic beta cells",
        description: "Detect high glucose levels",
        connectionType: "stimulatory"
      },
      {
        id: "insulin_release",
        type: "control_center",
        name: "Insulin secretion",
        description: "Beta cells release insulin",
        connectionType: "stimulatory"
      },
      {
        id: "glucose_uptake",
        type: "effector",
        name: "Liver, muscle, adipose tissue",
        description: "Take up glucose from blood",
        connectionType: "stimulatory"
      },
      {
        id: "glucose_lowered",
        type: "response",
        name: "Blood glucose decreases",
        description: "Glucose levels return to normal",
        connectionType: "stimulatory"
      },
      {
        id: "insulin_inhibition",
        type: "feedback",
        name: "Reduced insulin secretion",
        description: "Low glucose inhibits further insulin release",
        connectionType: "inhibitory"
      }
    ]
  },

  // Blood Glucose Regulation (Glucagon)
  {
    type: "negative",
    stimulus: "low blood glucose",
    response: "glucose release from liver",
    description: "Blood glucose regulation via glucagon",
    components: [
      {
        id: "low_glucose_stimulus",
        type: "stimulus",
        name: "Low blood glucose",
        description: "Decreased glucose levels during fasting",
        connectionType: "stimulatory"
      },
      {
        id: "pancreas_alpha_sensor",
        type: "sensor",
        name: "Pancreatic alpha cells",
        description: "Detect low glucose levels",
        connectionType: "stimulatory"
      },
      {
        id: "glucagon_release",
        type: "control_center",
        name: "Glucagon secretion",
        description: "Alpha cells release glucagon",
        connectionType: "stimulatory"
      },
      {
        id: "glucose_production",
        type: "effector",
        name: "Liver",
        description: "Releases glucose into blood",
        connectionType: "stimulatory"
      },
      {
        id: "glucose_raised",
        type: "response",
        name: "Blood glucose increases",
        description: "Glucose levels return to normal",
        connectionType: "stimulatory"
      },
      {
        id: "glucagon_inhibition",
        type: "feedback",
        name: "Reduced glucagon secretion",
        description: "Normal glucose inhibits further glucagon release",
        connectionType: "inhibitory"
      }
    ]
  },

  // Thyroid Hormone Regulation
  {
    type: "negative",
    stimulus: "low thyroid hormone levels",
    response: "increased T3/T4 production",
    setPoint: 1.0,
    description: "Thyroid hormone regulation via hypothalamic-pituitary-thyroid axis",
    components: [
      {
        id: "low_t3t4_stimulus",
        type: "stimulus",
        name: "Low T3/T4 levels",
        description: "Decreased thyroid hormone in blood",
        connectionType: "stimulatory"
      },
      {
        id: "hypothalamus_sensor",
        type: "sensor",
        name: "Hypothalamus",
        description: "Detects low thyroid hormone",
        connectionType: "stimulatory"
      },
      {
        id: "trh_release",
        type: "control_center",
        name: "TRH secretion",
        description: "Hypothalamus releases TRH",
        connectionType: "stimulatory"
      },
      {
        id: "pituitary_tsh",
        type: "control_center",
        name: "TSH secretion",
        description: "Pituitary releases TSH",
        connectionType: "stimulatory"
      },
      {
        id: "thyroid_effector",
        type: "effector",
        name: "Thyroid gland",
        description: "Produces T3 and T4",
        connectionType: "stimulatory"
      },
      {
        id: "t3t4_increased",
        type: "response",
        name: "T3/T4 levels increase",
        description: "Thyroid hormones return to normal",
        connectionType: "stimulatory"
      },
      {
        id: "negative_feedback",
        type: "feedback",
        name: "Inhibition of TRH and TSH",
        description: "High T3/T4 inhibits hypothalamus and pituitary",
        connectionType: "inhibitory"
      }
    ]
  },

  // Cortisol Regulation (HPA Axis)
  {
    type: "negative",
    stimulus: "stress",
    response: "cortisol release",
    description: "Stress response via hypothalamic-pituitary-adrenal axis",
    components: [
      {
        id: "stress_stimulus",
        type: "stimulus",
        name: "Stress",
        description: "Physical or psychological stressor",
        connectionType: "stimulatory"
      },
      {
        id: "hypothalamus_crh",
        type: "control_center",
        name: "CRH secretion",
        description: "Hypothalamus releases CRH",
        connectionType: "stimulatory"
      },
      {
        id: "pituitary_acth",
        type: "control_center",
        name: "ACTH secretion",
        description: "Pituitary releases ACTH",
        connectionType: "stimulatory"
      },
      {
        id: "adrenal_cortex",
        type: "effector",
        name: "Adrenal cortex",
        description: "Produces cortisol",
        connectionType: "stimulatory"
      },
      {
        id: "cortisol_effects",
        type: "response",
        name: "Cortisol effects",
        description: "Increased glucose, suppressed immune response",
        connectionType: "stimulatory"
      },
      {
        id: "cortisol_feedback",
        type: "feedback",
        name: "Inhibition of CRH and ACTH",
        description: "High cortisol inhibits hypothalamus and pituitary",
        connectionType: "inhibitory"
      }
    ]
  },

  // Calcium Homeostasis (PTH)
  {
    type: "negative",
    stimulus: "low blood calcium",
    response: "increased calcium reabsorption",
    setPoint: 2.5,
    description: "Calcium regulation via parathyroid hormone",
    components: [
      {
        id: "low_calcium_stimulus",
        type: "stimulus",
        name: "Low blood calcium",
        description: "Decreased calcium levels",
        connectionType: "stimulatory"
      },
      {
        id: "parathyroid_sensor",
        type: "sensor",
        name: "Parathyroid glands",
        description: "Detect low calcium",
        connectionType: "stimulatory"
      },
      {
        id: "pth_release",
        type: "control_center",
        name: "PTH secretion",
        description: "Parathyroid releases PTH",
        connectionType: "stimulatory"
      },
      {
        id: "calcium_mobilization",
        type: "effector",
        name: "Bone, kidney, intestine",
        description: "Increase calcium release and reabsorption",
        connectionType: "stimulatory"
      },
      {
        id: "calcium_increased",
        type: "response",
        name: "Blood calcium increases",
        description: "Calcium levels return to normal",
        connectionType: "stimulatory"
      },
      {
        id: "pth_inhibition",
        type: "feedback",
        name: "Reduced PTH secretion",
        description: "Normal calcium inhibits PTH release",
        connectionType: "inhibitory"
      }
    ]
  },

  // Water Balance (ADH)
  {
    type: "negative",
    stimulus: "dehydration",
    response: "increased water reabsorption",
    description: "Water balance regulation via ADH",
    components: [
      {
        id: "dehydration_stimulus",
        type: "stimulus",
        name: "Dehydration",
        description: "High blood osmolality",
        connectionType: "stimulatory"
      },
      {
        id: "hypothalamus_osmoreceptors",
        type: "sensor",
        name: "Hypothalamic osmoreceptors",
        description: "Detect high osmolality",
        connectionType: "stimulatory"
      },
      {
        id: "adh_release",
        type: "control_center",
        name: "ADH secretion",
        description: "Posterior pituitary releases ADH",
        connectionType: "stimulatory"
      },
      {
        id: "kidney_reabsorption",
        type: "effector",
        name: "Kidney collecting ducts",
        description: "Increase water reabsorption",
        connectionType: "stimulatory"
      },
      {
        id: "osmolality_decreased",
        type: "response",
        name: "Blood osmolality decreases",
        description: "Water balance restored",
        connectionType: "stimulatory"
      },
      {
        id: "adh_inhibition",
        type: "feedback",
        name: "Reduced ADH secretion",
        description: "Normal osmolality inhibits ADH release",
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
    stimulus: "uterine contractions",
    response: "stronger contractions",
    description: "Oxytocin positive feedback during childbirth",
    components: [
      {
        id: "initial_contractions",
        type: "stimulus",
        name: "Uterine contractions",
        description: "Initial contractions during labor",
        connectionType: "stimulatory"
      },
      {
        id: "stretch_receptors",
        type: "sensor",
        name: "Cervical stretch receptors",
        description: "Detect cervical stretching",
        connectionType: "stimulatory"
      },
      {
        id: "oxytocin_release",
        type: "control_center",
        name: "Oxytocin secretion",
        description: "Posterior pituitary releases oxytocin",
        connectionType: "stimulatory"
      },
      {
        id: "uterine_muscle",
        type: "effector",
        name: "Uterine smooth muscle",
        description: "Contracts more strongly",
        connectionType: "stimulatory"
      },
      {
        id: "stronger_contractions",
        type: "response",
        name: "Stronger contractions",
        description: "Increased force and frequency",
        connectionType: "stimulatory"
      },
      {
        id: "amplification",
        type: "feedback",
        name: "More oxytocin release",
        description: "Stronger contractions trigger more oxytocin",
        connectionType: "stimulatory"
      }
    ]
  },

  // LH Surge during Ovulation
  {
    type: "positive",
    stimulus: "rising estrogen levels",
    response: "LH surge",
    description: "LH surge positive feedback during ovulation",
    components: [
      {
        id: "estrogen_rise",
        type: "stimulus",
        name: "Rising estrogen",
        description: "Estrogen from developing follicle",
        connectionType: "stimulatory"
      },
      {
        id: "hypothalamus_gnrh",
        type: "control_center",
        name: "GnRH secretion",
        description: "Hypothalamus releases GnRH",
        connectionType: "stimulatory"
      },
      {
        id: "pituitary_lh",
        type: "control_center",
        name: "LH secretion",
        description: "Pituitary releases LH",
        connectionType: "stimulatory"
      },
      {
        id: "follicle_maturation",
        type: "effector",
        name: "Ovarian follicle",
        description: "Produces more estrogen",
        connectionType: "stimulatory"
      },
      {
        id: "lh_surge",
        type: "response",
        name: "LH surge",
        description: "Rapid increase in LH levels",
        connectionType: "stimulatory"
      },
      {
        id: "positive_feedback",
        type: "feedback",
        name: "More estrogen and LH",
        description: "High estrogen amplifies LH release",
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
