/**
 * GB2.02 Endocrine System - Clinical Case Data
 * 
 * This module contains clinical case data for endocrine disorders,
 * including patient information, symptoms, lab results, and diagnoses.
 */

import { ClinicalCase, LabResult } from './gb2-02-types';

/**
 * Clinical cases database
 */
export const CLINICAL_CASES: ClinicalCase[] = [
  // Diabetes Mellitus (BASIC)
  {
    patientInfo: {
      age: 45,
      sex: "female",
      occupation: "teacher",
      relevantHistory: ["family history of diabetes"]
    },
    chiefComplaint: "Excessive thirst and frequent urination for 3 weeks",
    history: "Patient reports drinking 4-5 liters of water daily and urinating every 1-2 hours. Also experiencing fatigue and blurred vision.",
    examination: ["BMI 32", "blood pressure 140/85 mmHg", "no ketones in urine"],
    symptoms: ["excessive thirst", "frequent urination", "fatigue", "blurred vision"],
    labResults: [
      {
        hormone: "glucose",
        value: 250,
        unit: "mg/dL",
        referenceRange: { min: 70, max: 100 },
        status: "high"
      },
      {
        hormone: "HbA1c",
        value: 8.5,
        unit: "%",
        referenceRange: { min: 4, max: 5.6 },
        status: "high"
      }
    ],
    expectedDiagnosis: "diabetes mellitus",
    differentialDiagnoses: ["diabetes insipidus", "hyperthyroidism"],
    baselContext: "At Basel University Hospital Endocrinology Clinic, Dr. Weber examines a patient presenting with classic symptoms of hyperglycemia. The clinic, located in the heart of Basel's medical district, sees numerous diabetes cases annually. With Basel's pharmaceutical giants Novartis and Roche developing cutting-edge diabetes medications, the clinic participates in clinical trials for new insulin formulations and glucose monitoring technologies. The patient's symptoms align with Type 2 diabetes, common in Basel's aging population. The clinic's comprehensive diabetes management program includes dietary counseling, medication management, and regular monitoring. Basel's healthcare system emphasizes early detection and prevention, making endocrinology clinics crucial for managing chronic metabolic disorders. The patient will be referred to the Basel Diabetes Education Center for lifestyle modification support and potentially started on metformin, a medication extensively studied in Basel's pharmaceutical research facilities."
  },

  // Hypothyroidism (BASIC)
  {
    patientInfo: {
      age: 38,
      sex: "female",
      occupation: "office worker",
      relevantHistory: ["no significant medical history"]
    },
    chiefComplaint: "Weight gain and fatigue for 6 months",
    history: "Patient reports gaining 10 kg despite no change in diet. Experiencing constant fatigue, cold intolerance, and constipation.",
    examination: ["BMI 28", "dry skin", "slow reflexes", "bradycardia 55 bpm"],
    symptoms: ["weight gain", "fatigue", "cold intolerance", "constipation", "dry skin"],
    labResults: [
      {
        hormone: "TSH",
        value: 12,
        unit: "mIU/L",
        referenceRange: { min: 0.4, max: 4.0 },
        status: "high"
      },
      {
        hormone: "T4",
        value: 3,
        unit: "μg/dL",
        referenceRange: { min: 5, max: 12 },
        status: "low"
      }
    ],
    expectedDiagnosis: "hypothyroidism",
    differentialDiagnoses: ["depression", "chronic fatigue syndrome"],
    baselContext: "At Basel University Hospital's Thyroid Clinic, Dr. Müller evaluates a patient with classic hypothyroidism symptoms. The clinic, renowned throughout Switzerland for thyroid disorder management, collaborates closely with Roche's diagnostic division to develop advanced thyroid function tests. Basel's cold climate makes hypothyroidism particularly noticeable, as patients struggle with cold intolerance. The patient's elevated TSH and low T4 indicate primary hypothyroidism, likely Hashimoto's thyroiditis. Treatment will involve levothyroxine, a synthetic thyroid hormone manufactured by pharmaceutical companies in Basel's industrial district. The clinic's protocol includes regular monitoring every 6-8 weeks until optimal dosing is achieved. Basel's comprehensive healthcare system ensures patients receive ongoing endocrinology support. The patient will also undergo thyroid antibody testing to confirm autoimmune etiology, using diagnostic kits developed in Basel's biotechnology sector."
  },

  // Hyperthyroidism (BASIC)
  {
    patientInfo: {
      age: 32,
      sex: "female",
      occupation: "graphic designer",
      relevantHistory: ["family history of autoimmune disease"]
    },
    chiefComplaint: "Weight loss and rapid heartbeat for 2 months",
    history: "Patient reports losing 8 kg despite increased appetite. Experiencing palpitations, heat intolerance, and anxiety.",
    examination: ["BMI 19", "tachycardia 110 bpm", "tremor", "exophthalmos"],
    symptoms: ["weight loss", "rapid heartbeat", "heat intolerance", "anxiety", "tremor"],
    labResults: [
      {
        hormone: "TSH",
        value: 0.1,
        unit: "mIU/L",
        referenceRange: { min: 0.4, max: 4.0 },
        status: "low"
      },
      {
        hormone: "T4",
        value: 18,
        unit: "μg/dL",
        referenceRange: { min: 5, max: 12 },
        status: "high"
      }
    ],
    expectedDiagnosis: "hyperthyroidism",
    differentialDiagnoses: ["anxiety disorder", "pheochromocytoma"],
    baselContext: "At Basel University Hospital's Endocrinology Department, Dr. Schmidt examines a patient with Graves' disease symptoms. The department, a leading center for autoimmune endocrine disorders, conducts research on thyroid-stimulating immunoglobulins in collaboration with Novartis. Basel's medical community has extensive experience with Graves' disease, an autoimmune condition causing hyperthyroidism. The patient's low TSH and high T4, combined with exophthalmos (bulging eyes), strongly suggest Graves' disease. Treatment options include antithyroid medications (methimazole), radioactive iodine, or surgery. Basel's nuclear medicine department offers state-of-the-art radioiodine therapy. The clinic will also assess the patient for thyroid eye disease, requiring ophthalmology consultation. Basel's integrated healthcare approach ensures comprehensive management of complex endocrine disorders. The patient may participate in clinical trials for novel Graves' disease treatments being developed in Basel's pharmaceutical research facilities."
  },

  // Type 1 Diabetes (CORE)
  {
    patientInfo: {
      age: 12,
      sex: "male",
      occupation: "student",
      relevantHistory: ["recent viral infection"]
    },
    chiefComplaint: "Excessive thirst, urination, and weight loss for 2 weeks",
    history: "Parents report child drinking excessive water, urinating frequently, and losing 5 kg. Also experiencing fatigue and fruity breath odor.",
    examination: ["BMI 16", "dehydration", "Kussmaul breathing", "ketones in urine"],
    symptoms: ["excessive thirst", "frequent urination", "weight loss", "fatigue", "fruity breath"],
    labResults: [
      {
        hormone: "glucose",
        value: 400,
        unit: "mg/dL",
        referenceRange: { min: 70, max: 100 },
        status: "high"
      },
      {
        hormone: "insulin",
        value: 2,
        unit: "μU/mL",
        referenceRange: { min: 5, max: 25 },
        status: "low"
      },
      {
        hormone: "C-peptide",
        value: 0.3,
        unit: "ng/mL",
        referenceRange: { min: 0.9, max: 4.0 },
        status: "low"
      }
    ],
    expectedDiagnosis: "Type 1 diabetes",
    differentialDiagnoses: ["Type 2 diabetes", "MODY"],
    baselContext: "At Basel Children's Hospital Pediatric Endocrinology Department, Dr. Keller evaluates a child with diabetic ketoacidosis. The department, specializing in childhood diabetes, collaborates with Novartis on pediatric insulin formulations. Basel's children's hospital sees increasing Type 1 diabetes cases, requiring immediate insulin therapy. The patient's very high glucose, low insulin, and low C-peptide indicate autoimmune destruction of pancreatic beta cells. This is a medical emergency requiring hospitalization for IV fluids and insulin. The child will need lifelong insulin therapy, using advanced insulin pumps developed in Basel's medical technology sector. Basel's pediatric diabetes program provides comprehensive education for families, teaching insulin administration, glucose monitoring, and carbohydrate counting. The hospital's diabetes educators work closely with schools to ensure safe diabetes management. The patient will also be screened for other autoimmune conditions common in Type 1 diabetes. Basel's research facilities are developing artificial pancreas systems to improve Type 1 diabetes management."
  },

  // Type 2 Diabetes (CORE)
  {
    patientInfo: {
      age: 55,
      sex: "male",
      occupation: "accountant",
      relevantHistory: ["obesity", "sedentary lifestyle", "family history of diabetes"]
    },
    chiefComplaint: "Increased thirst and blurred vision for 3 months",
    history: "Patient reports gradual onset of symptoms. No weight loss. Sedentary job with poor diet.",
    examination: ["BMI 34", "blood pressure 145/90 mmHg", "acanthosis nigricans", "no ketones"],
    symptoms: ["increased thirst", "blurred vision", "fatigue", "slow wound healing"],
    labResults: [
      {
        hormone: "glucose",
        value: 180,
        unit: "mg/dL",
        referenceRange: { min: 70, max: 100 },
        status: "high"
      },
      {
        hormone: "insulin",
        value: 35,
        unit: "μU/mL",
        referenceRange: { min: 5, max: 25 },
        status: "high"
      },
      {
        hormone: "HbA1c",
        value: 7.8,
        unit: "%",
        referenceRange: { min: 4, max: 5.6 },
        status: "high"
      }
    ],
    expectedDiagnosis: "Type 2 diabetes",
    differentialDiagnoses: ["prediabetes", "metabolic syndrome"],
    baselContext: "At Basel University Hospital Metabolic Clinic, Dr. Weber evaluates a patient with Type 2 diabetes. The clinic, a center of excellence for metabolic disorders, participates in Roche's diabetes research programs. Basel's aging population faces increasing Type 2 diabetes prevalence, driven by lifestyle factors. The patient's high glucose with high insulin indicates insulin resistance, characteristic of Type 2 diabetes. Unlike Type 1, the pancreas still produces insulin but cells don't respond effectively. Treatment begins with lifestyle modification: diet, exercise, and weight loss. Basel's diabetes prevention program offers nutritional counseling and exercise classes. If lifestyle changes are insufficient, metformin will be prescribed, a medication extensively studied in Basel's pharmaceutical trials. The patient's acanthosis nigricans (dark skin patches) is a sign of insulin resistance. Basel's comprehensive approach includes screening for diabetes complications: retinopathy, nephropathy, and neuropathy. The clinic collaborates with Novartis on novel diabetes medications targeting insulin sensitivity and glucose metabolism."
  },

  // Primary Hypothyroidism (ADVANCED)
  {
    patientInfo: {
      age: 42,
      sex: "female",
      occupation: "nurse",
      relevantHistory: ["family history of autoimmune disease"]
    },
    chiefComplaint: "Fatigue and weight gain for 8 months",
    history: "Progressive symptoms despite normal diet. Cold intolerance, constipation, and depression.",
    examination: ["BMI 29", "bradycardia 52 bpm", "delayed reflexes", "goiter palpable"],
    symptoms: ["fatigue", "weight gain", "cold intolerance", "constipation", "depression", "dry skin"],
    labResults: [
      {
        hormone: "TSH",
        value: 15,
        unit: "mIU/L",
        referenceRange: { min: 0.4, max: 4.0 },
        status: "high"
      },
      {
        hormone: "T4",
        value: 2.5,
        unit: "μg/dL",
        referenceRange: { min: 5, max: 12 },
        status: "low"
      },
      {
        hormone: "anti-TPO antibodies",
        value: 450,
        unit: "IU/mL",
        referenceRange: { min: 0, max: 35 },
        status: "high"
      }
    ],
    expectedDiagnosis: "primary hypothyroidism",
    differentialDiagnoses: ["secondary hypothyroidism", "subclinical hypothyroidism"],
    baselContext: "At Basel University Hospital's Advanced Endocrinology Unit, Dr. Müller evaluates a patient with Hashimoto's thyroiditis. The unit, renowned for autoimmune endocrine research, collaborates with Roche on thyroid antibody assays. The patient's high TSH and low T4 indicate primary hypothyroidism, where the thyroid gland itself is failing. The elevated anti-TPO antibodies confirm Hashimoto's thyroiditis, an autoimmune condition destroying thyroid tissue. This is the most common cause of hypothyroidism in Basel's population. Treatment involves levothyroxine replacement, manufactured by Basel's pharmaceutical companies. The clinic's protocol includes starting with low doses and gradually increasing based on TSH monitoring. Basel's thyroid specialists emphasize the importance of consistent medication timing and avoiding interactions with calcium or iron supplements. The patient will require lifelong thyroid hormone replacement and regular monitoring. Basel's endocrinology research facilities are investigating novel thyroid hormone formulations and combination T3/T4 therapies to optimize treatment outcomes for patients who don't respond well to standard levothyroxine monotherapy."
  },

  // Primary Hyperaldosteronism (ELITE)
  {
    patientInfo: {
      age: 52,
      sex: "male",
      occupation: "executive",
      relevantHistory: ["resistant hypertension", "multiple antihypertensive medications"]
    },
    chiefComplaint: "Persistent high blood pressure despite medication",
    history: "Patient on three antihypertensive medications but blood pressure remains elevated. Experiencing muscle weakness and frequent urination.",
    examination: ["blood pressure 165/100 mmHg", "no edema", "muscle weakness"],
    symptoms: ["hypertension", "muscle weakness", "frequent urination", "fatigue"],
    labResults: [
      {
        hormone: "aldosterone",
        value: 35,
        unit: "ng/dL",
        referenceRange: { min: 4, max: 31 },
        status: "high"
      },
      {
        hormone: "renin",
        value: 0.5,
        unit: "ng/mL/hr",
        referenceRange: { min: 0.5, max: 3.3 },
        status: "low"
      },
      {
        hormone: "potassium",
        value: 2.8,
        unit: "mEq/L",
        referenceRange: { min: 3.5, max: 5.0 },
        status: "low"
      }
    ],
    expectedDiagnosis: "primary hyperaldosteronism",
    differentialDiagnoses: ["essential hypertension", "renal artery stenosis", "Cushing's syndrome"],
    baselContext: "At Basel University Hospital's Advanced Endocrinology Unit, in collaboration with Novartis pharmaceutical research, Dr. Schmidt evaluates a patient with Conn's syndrome. The unit specializes in complex endocrine hypertension, a field where Basel's medical expertise excels. The patient's high aldosterone with low renin indicates primary hyperaldosteronism, where the adrenal gland autonomously produces excess aldosterone. This causes hypertension and hypokalemia (low potassium), explaining the muscle weakness. The low renin distinguishes this from secondary hyperaldosteronism. Further testing with CT imaging will identify whether an adrenal adenoma or bilateral adrenal hyperplasia is the cause. Treatment options include surgical removal of adenoma or medical therapy with spironolactone, an aldosterone antagonist developed through research at Novartis Basel. The clinic's expertise in adrenal disorders makes it a referral center for complex cases throughout Switzerland. Basel's nuclear medicine department offers adrenal vein sampling to lateralize aldosterone production. The patient's resistant hypertension will likely improve dramatically with appropriate treatment, demonstrating the importance of screening for secondary causes of hypertension in Basel's specialized endocrinology clinics."
  }
];

/**
 * Gets a clinical case by diagnosis
 * @param diagnosis - Diagnosis name
 * @returns Clinical case or undefined
 */
export function getClinicalCaseByDiagnosis(diagnosis: string): ClinicalCase | undefined {
  const lowerDiagnosis = diagnosis.toLowerCase();
  return CLINICAL_CASES.find(c => 
    c.expectedDiagnosis.toLowerCase().includes(lowerDiagnosis)
  );
}

/**
 * Gets all clinical cases
 * @returns Array of all clinical cases
 */
export function getAllClinicalCases(): ClinicalCase[] {
  return CLINICAL_CASES;
}
