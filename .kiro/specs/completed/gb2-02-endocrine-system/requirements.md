# Requirements Document: GB2.02 - Endocrine System

## Introduction

This module teaches Gymnasium Biology students (Sekundarstufe II, advanced level) about the endocrine system, including hormone types and functions, major endocrine glands, feedback mechanisms, hormone regulation and homeostasis, and clinical applications. Students will learn through interactive exercises set in Basel-specific contexts, including pharmaceutical research at Novartis/Roche and clinical scenarios from Basel University Hospital. The module aligns with Maturität Endocrinology curriculum and targets advanced secondary students (16-19 years old).

## Glossary

- **System**: The GB2.02 Endocrine System module web application
- **User**: A Gymnasium student (16-19 years old) using the module to learn about endocrinology
- **Quest**: An individual practice problem with specific parameters and expected answers
- **Stage**: A thematic section of the module (Hormone Identification, Feedback Mechanisms, or Clinical Applications)
- **Difficulty**: One of four levels (BASIC, CORE, ADVANCED, ELITE) that determines problem complexity
- **Visualization**: The interactive graphical display showing hormone pathways, feedback loops, or gland anatomy
- **Hormone**: A chemical messenger produced by endocrine glands that regulates physiological processes
- **Endocrine_Gland**: An organ that secretes hormones directly into the bloodstream
- **Feedback_Loop**: A regulatory mechanism where the output of a system influences its own production
- **Negative_Feedback**: A regulatory mechanism that reduces or inhibits hormone production when levels are high
- **Positive_Feedback**: A regulatory mechanism that amplifies hormone production when levels increase
- **Homeostasis**: The maintenance of stable internal conditions in the body
- **Target_Organ**: The specific organ or tissue that responds to a particular hormone
- **Peptide_Hormone**: A hormone made of amino acid chains (e.g., insulin, growth hormone)
- **Steroid_Hormone**: A hormone derived from cholesterol (e.g., cortisol, testosterone, estrogen)
- **Amino_Acid_Derived_Hormone**: A hormone synthesized from single amino acids (e.g., thyroid hormones, adrenaline)
- **Translation**: Text content in one of three supported languages (EN/CN/DE)

## Requirements

### Requirement 1: Hormone Type Classification

**User Story:** As a student, I want to classify hormones by their chemical structure, so that I can understand how different hormone types function in the body.

#### Acceptance Criteria

1. WHEN a user is presented with a hormone, THE System SHALL ask them to identify its type (peptide, steroid, or amino acid-derived)
2. WHEN a user identifies a peptide hormone, THE System SHALL verify it is composed of amino acid chains
3. WHEN a user identifies a steroid hormone, THE System SHALL verify it is derived from cholesterol
4. WHEN a user identifies an amino acid-derived hormone, THE System SHALL verify it is synthesized from single amino acids
5. THE System SHALL provide 5 quests for BASIC difficulty focusing on hormone type identification
6. WHEN displaying hormone structures, THE Visualization SHALL show the chemical structure and functional groups
7. THE System SHALL include examples: insulin (peptide), cortisol (steroid), thyroxine (amino acid-derived), adrenaline (amino acid-derived)

### Requirement 2: Endocrine Gland Identification

**User Story:** As a student, I want to identify major endocrine glands and their hormones, so that I can understand the organization of the endocrine system.

#### Acceptance Criteria

1. WHEN a user is presented with a hormone, THE System SHALL ask them to identify which gland produces it
2. WHEN a user identifies the pituitary gland, THE System SHALL verify it produces growth hormone, TSH, ACTH, FSH, LH, prolactin, ADH, and oxytocin
3. WHEN a user identifies the thyroid gland, THE System SHALL verify it produces thyroxine (T4) and triiodothyronine (T3)
4. WHEN a user identifies the adrenal glands, THE System SHALL verify they produce cortisol, aldosterone, and adrenaline
5. WHEN a user identifies the pancreas, THE System SHALL verify it produces insulin and glucagon
6. WHEN a user identifies the gonads, THE System SHALL verify they produce testosterone, estrogen, and progesterone
7. THE System SHALL provide 5 quests for BASIC difficulty in the Hormone Identification stage
8. WHEN displaying glands, THE Visualization SHALL show anatomical location and hormone secretion pathways

### Requirement 3: Hormone Function Matching

**User Story:** As a student, I want to match hormones with their primary functions, so that I can understand what each hormone does in the body.

#### Acceptance Criteria

1. WHEN a user is presented with a hormone, THE System SHALL ask them to identify its primary function
2. WHEN a user matches insulin, THE System SHALL verify its function is lowering blood glucose levels
3. WHEN a user matches glucagon, THE System SHALL verify its function is raising blood glucose levels
4. WHEN a user matches thyroxine, THE System SHALL verify its function is regulating metabolic rate
5. WHEN a user matches adrenaline, THE System SHALL verify its function is preparing the body for fight-or-flight response
6. WHEN a user matches cortisol, THE System SHALL verify its function is regulating stress response and metabolism
7. THE System SHALL provide 5 quests for CORE difficulty focusing on hormone function matching
8. THE System SHALL include at least 12 different hormones across all difficulty levels

### Requirement 4: Target Organ Identification

**User Story:** As a student, I want to identify target organs for specific hormones, so that I can understand where hormones act in the body.

#### Acceptance Criteria

1. WHEN a user is presented with a hormone, THE System SHALL ask them to identify its target organ(s)
2. WHEN a user identifies insulin targets, THE System SHALL verify they include liver, muscle, and adipose tissue
3. WHEN a user identifies ADH targets, THE System SHALL verify they include kidney collecting ducts
4. WHEN a user identifies TSH targets, THE System SHALL verify they include the thyroid gland
5. WHEN a user identifies FSH/LH targets, THE System SHALL verify they include the gonads (ovaries/testes)
6. THE System SHALL provide 5 quests for CORE difficulty in the Hormone Identification stage
7. WHEN displaying target organs, THE Visualization SHALL show the pathway from gland to target with arrows

### Requirement 5: Negative Feedback Loop Analysis

**User Story:** As a student, I want to analyze negative feedback loops, so that I can understand how the body maintains hormone homeostasis.

#### Acceptance Criteria

1. WHEN a user is presented with a hormone system, THE System SHALL ask them to identify the negative feedback mechanism
2. WHEN a user analyzes thyroid hormone regulation, THE System SHALL verify they identify: hypothalamus → TRH → pituitary → TSH → thyroid → T3/T4 → inhibits TRH and TSH
3. WHEN a user analyzes cortisol regulation, THE System SHALL verify they identify: hypothalamus → CRH → pituitary → ACTH → adrenal → cortisol → inhibits CRH and ACTH
4. WHEN a user analyzes blood glucose regulation, THE System SHALL verify they identify: high glucose → insulin → lowers glucose → reduces insulin secretion
5. THE System SHALL provide 5 quests for each difficulty level (BASIC, CORE, ADVANCED, ELITE) in the Feedback Mechanisms stage
6. WHEN displaying feedback loops, THE Visualization SHALL show the complete pathway with inhibitory arrows
7. THE System SHALL use color coding: stimulatory pathways (green arrows), inhibitory pathways (red arrows)

### Requirement 6: Positive Feedback Loop Analysis

**User Story:** As a student, I want to analyze positive feedback loops, so that I can understand amplification mechanisms in the endocrine system.

#### Acceptance Criteria

1. WHEN a user is presented with a positive feedback scenario, THE System SHALL ask them to identify the amplification mechanism
2. WHEN a user analyzes oxytocin during childbirth, THE System SHALL verify they identify: uterine contractions → oxytocin release → stronger contractions → more oxytocin
3. WHEN a user analyzes LH surge during ovulation, THE System SHALL verify they identify: estrogen rise → LH release → more estrogen → LH surge
4. THE System SHALL provide 5 quests for ADVANCED difficulty focusing on positive feedback
5. WHEN displaying positive feedback, THE Visualization SHALL show the amplification cycle with reinforcing arrows
6. THE System SHALL explain why positive feedback is less common than negative feedback in the body

### Requirement 7: Homeostasis Regulation

**User Story:** As a student, I want to understand how hormones maintain homeostasis, so that I can explain physiological balance mechanisms.

#### Acceptance Criteria

1. WHEN a user is presented with a homeostatic challenge, THE System SHALL ask them to identify the hormonal response
2. WHEN blood glucose rises, THE System SHALL verify the user identifies insulin secretion and glucose uptake
3. WHEN blood glucose falls, THE System SHALL verify the user identifies glucagon secretion and glucose release
4. WHEN blood calcium rises, THE System SHALL verify the user identifies calcitonin secretion
5. WHEN blood calcium falls, THE System SHALL verify the user identifies parathyroid hormone (PTH) secretion
6. WHEN blood pressure falls, THE System SHALL verify the user identifies aldosterone and ADH secretion
7. THE System SHALL provide 5 quests for CORE difficulty in the Feedback Mechanisms stage
8. WHEN displaying homeostasis, THE Visualization SHALL show the set point, deviation, and corrective response

### Requirement 8: Hypothalamic-Pituitary Axis

**User Story:** As a student, I want to understand the hypothalamic-pituitary axis, so that I can explain how the brain controls endocrine function.

#### Acceptance Criteria

1. WHEN a user is presented with a pituitary hormone, THE System SHALL ask them to identify the hypothalamic releasing hormone
2. WHEN a user identifies TSH, THE System SHALL verify the hypothalamic hormone is TRH (thyrotropin-releasing hormone)
3. WHEN a user identifies ACTH, THE System SHALL verify the hypothalamic hormone is CRH (corticotropin-releasing hormone)
4. WHEN a user identifies growth hormone, THE System SHALL verify the hypothalamic hormone is GHRH (growth hormone-releasing hormone)
5. WHEN a user identifies prolactin, THE System SHALL verify the hypothalamic factor is dopamine (inhibitory)
6. THE System SHALL provide 5 quests for ADVANCED difficulty focusing on hypothalamic-pituitary connections
7. WHEN displaying the axis, THE Visualization SHALL show the hypothalamus, pituitary portal system, and target glands

### Requirement 9: Clinical Disorder Diagnosis

**User Story:** As a student, I want to diagnose endocrine disorders from symptoms, so that I can apply my knowledge to clinical scenarios.

#### Acceptance Criteria

1. WHEN a user is presented with clinical symptoms, THE System SHALL ask them to identify the endocrine disorder
2. WHEN symptoms include excessive thirst, urination, and high blood glucose, THE System SHALL verify the diagnosis is diabetes mellitus
3. WHEN symptoms include weight gain, fatigue, and cold intolerance, THE System SHALL verify the diagnosis is hypothyroidism
4. WHEN symptoms include weight loss, heat intolerance, and rapid heartbeat, THE System SHALL verify the diagnosis is hyperthyroidism
5. WHEN symptoms include excessive growth in children, THE System SHALL verify the diagnosis is gigantism (excess growth hormone)
6. WHEN symptoms include high blood pressure and low potassium, THE System SHALL verify the diagnosis is hyperaldosteronism
7. THE System SHALL provide 5 quests for each difficulty level in the Clinical Applications stage
8. THE System SHALL include Basel University Hospital case scenarios for ELITE difficulty

### Requirement 10: Hormone Level Interpretation

**User Story:** As a student, I want to interpret hormone level data, so that I can identify endocrine dysfunction from laboratory results.

#### Acceptance Criteria

1. WHEN a user is presented with hormone level data, THE System SHALL ask them to identify if levels are normal, high, or low
2. WHEN TSH is high and T4 is low, THE System SHALL verify the interpretation is primary hypothyroidism
3. WHEN TSH is low and T4 is high, THE System SHALL verify the interpretation is primary hyperthyroidism
4. WHEN TSH is low and T4 is low, THE System SHALL verify the interpretation is secondary hypothyroidism (pituitary problem)
5. WHEN cortisol is high and ACTH is low, THE System SHALL verify the interpretation is adrenal tumor
6. WHEN cortisol is high and ACTH is high, THE System SHALL verify the interpretation is pituitary tumor or ectopic ACTH
7. THE System SHALL provide 5 quests for ADVANCED difficulty focusing on hormone level interpretation
8. THE System SHALL display reference ranges for normal hormone levels

### Requirement 11: Diabetes Mellitus Types

**User Story:** As a student, I want to distinguish between Type 1 and Type 2 diabetes, so that I can understand different mechanisms of glucose dysregulation.

#### Acceptance Criteria

1. WHEN a user is presented with diabetes characteristics, THE System SHALL ask them to identify the type
2. WHEN characteristics include autoimmune destruction of beta cells, THE System SHALL verify the type is Type 1 diabetes
3. WHEN characteristics include insulin resistance and relative insulin deficiency, THE System SHALL verify the type is Type 2 diabetes
4. WHEN treatment includes insulin injections from diagnosis, THE System SHALL verify the type is Type 1 diabetes
5. WHEN treatment includes lifestyle modification and oral medications initially, THE System SHALL verify the type is Type 2 diabetes
6. THE System SHALL provide 5 quests for CORE difficulty in the Clinical Applications stage
7. THE System SHALL include Basel pharmaceutical research context for diabetes medications

### Requirement 12: Thyroid Disorder Mechanisms

**User Story:** As a student, I want to understand thyroid disorder mechanisms, so that I can explain the pathophysiology of thyroid diseases.

#### Acceptance Criteria

1. WHEN a user is presented with thyroid disorder scenarios, THE System SHALL ask them to explain the mechanism
2. WHEN Graves' disease is presented, THE System SHALL verify the user identifies autoimmune stimulation of TSH receptors
3. WHEN Hashimoto's thyroiditis is presented, THE System SHALL verify the user identifies autoimmune destruction of thyroid tissue
4. WHEN iodine deficiency is presented, THE System SHALL verify the user identifies reduced T3/T4 synthesis and goiter formation
5. WHEN thyroid nodules are presented, THE System SHALL verify the user identifies autonomous hormone production
6. THE System SHALL provide 5 quests for ADVANCED difficulty focusing on thyroid pathophysiology
7. THE System SHALL include Basel University Hospital endocrinology clinic scenarios

### Requirement 13: Pharmaceutical Hormone Therapy

**User Story:** As a student, I want to understand hormone replacement therapy, so that I can explain how pharmaceutical interventions treat endocrine disorders.

#### Acceptance Criteria

1. WHEN a user is presented with an endocrine disorder, THE System SHALL ask them to identify appropriate hormone therapy
2. WHEN hypothyroidism is presented, THE System SHALL verify the therapy is levothyroxine (synthetic T4)
3. WHEN Type 1 diabetes is presented, THE System SHALL verify the therapy is insulin injections
4. WHEN Addison's disease is presented, THE System SHALL verify the therapy is hydrocortisone and fludrocortisone
5. WHEN growth hormone deficiency is presented, THE System SHALL verify the therapy is recombinant growth hormone
6. THE System SHALL provide 5 quests for ELITE difficulty in the Clinical Applications stage
7. THE System SHALL reference Novartis and Roche pharmaceutical development in Basel

### Requirement 14: Stress Response Pathway

**User Story:** As a student, I want to understand the stress response pathway, so that I can explain how the body responds to acute and chronic stress.

#### Acceptance Criteria

1. WHEN a user is presented with a stress scenario, THE System SHALL ask them to identify the hormonal response
2. WHEN acute stress is presented, THE System SHALL verify the user identifies rapid adrenaline release from adrenal medulla
3. WHEN chronic stress is presented, THE System SHALL verify the user identifies sustained cortisol release via HPA axis
4. WHEN the user traces the HPA axis, THE System SHALL verify they identify: stress → hypothalamus (CRH) → pituitary (ACTH) → adrenal cortex (cortisol)
5. THE System SHALL provide 5 quests for CORE difficulty focusing on stress hormones
6. WHEN displaying stress response, THE Visualization SHALL show both rapid (adrenaline) and slow (cortisol) pathways
7. THE System SHALL explain the physiological effects of each stress hormone

### Requirement 15: Growth and Development Hormones

**User Story:** As a student, I want to understand hormones that regulate growth and development, so that I can explain developmental processes.

#### Acceptance Criteria

1. WHEN a user is presented with growth scenarios, THE System SHALL ask them to identify the relevant hormones
2. WHEN childhood growth is presented, THE System SHALL verify the user identifies growth hormone and thyroid hormones
3. WHEN puberty is presented, THE System SHALL verify the user identifies sex hormones (testosterone, estrogen) and GnRH/FSH/LH
4. WHEN bone growth is presented, THE System SHALL verify the user identifies growth hormone, thyroid hormones, and sex hormones
5. WHEN growth disorders are presented, THE System SHALL verify the user identifies hormone deficiencies or excesses
6. THE System SHALL provide 5 quests for ADVANCED difficulty focusing on growth regulation
7. THE System SHALL include scenarios about growth hormone therapy at Basel pediatric clinics

### Requirement 16: Reproductive Hormone Cycles

**User Story:** As a student, I want to understand reproductive hormone cycles, so that I can explain menstrual cycle regulation and fertility.

#### Acceptance Criteria

1. WHEN a user is presented with menstrual cycle phases, THE System SHALL ask them to identify hormone levels
2. WHEN the follicular phase is presented, THE System SHALL verify the user identifies rising FSH and estrogen
3. WHEN ovulation is presented, THE System SHALL verify the user identifies the LH surge
4. WHEN the luteal phase is presented, THE System SHALL verify the user identifies high progesterone from corpus luteum
5. WHEN pregnancy is presented, THE System SHALL verify the user identifies hCG maintaining corpus luteum
6. THE System SHALL provide 5 quests for ELITE difficulty focusing on reproductive endocrinology
7. WHEN displaying the cycle, THE Visualization SHALL show hormone level graphs over the 28-day cycle

### Requirement 17: Calcium Homeostasis

**User Story:** As a student, I want to understand calcium regulation, so that I can explain how the body maintains blood calcium levels.

#### Acceptance Criteria

1. WHEN a user is presented with calcium level changes, THE System SHALL ask them to identify the hormonal response
2. WHEN blood calcium is low, THE System SHALL verify the user identifies PTH secretion from parathyroid glands
3. WHEN PTH is released, THE System SHALL verify the user identifies increased bone resorption, kidney calcium reabsorption, and vitamin D activation
4. WHEN blood calcium is high, THE System SHALL verify the user identifies calcitonin secretion from thyroid C cells
5. WHEN calcitonin is released, THE System SHALL verify the user identifies decreased bone resorption and increased calcium excretion
6. THE System SHALL provide 5 quests for ADVANCED difficulty focusing on calcium homeostasis
7. THE System SHALL explain the role of vitamin D in calcium absorption

### Requirement 18: Water Balance Regulation

**User Story:** As a student, I want to understand water balance regulation, so that I can explain how ADH and aldosterone maintain fluid homeostasis.

#### Acceptance Criteria

1. WHEN a user is presented with dehydration, THE System SHALL verify the user identifies ADH (vasopressin) release from posterior pituitary
2. WHEN ADH is released, THE System SHALL verify the user identifies increased water reabsorption in kidney collecting ducts
3. WHEN blood pressure is low, THE System SHALL verify the user identifies aldosterone release from adrenal cortex
4. WHEN aldosterone is released, THE System SHALL verify the user identifies increased sodium and water reabsorption
5. WHEN diabetes insipidus is presented, THE System SHALL verify the user identifies ADH deficiency or resistance
6. THE System SHALL provide 5 quests for CORE difficulty focusing on water balance
7. THE System SHALL explain the renin-angiotensin-aldosterone system (RAAS)

### Requirement 19: Basel-Specific Scenarios

**User Story:** As a Basel student, I want problems set in familiar local contexts, so that I can connect abstract endocrinology concepts to real-world applications.

#### Acceptance Criteria

1. WHEN a user reads scenario descriptions, THE System SHALL reference Basel locations (Basel University Hospital, Novartis, Roche, Basel Endocrinology Clinic)
2. WHEN a user sees pharmaceutical scenarios, THE System SHALL reference hormone drug development at Basel pharmaceutical companies
3. WHEN a user sees clinical scenarios, THE System SHALL include patient cases from Basel University Hospital endocrinology department
4. THE System SHALL provide scenario descriptions of 150-250 words for each stage
5. WHEN displaying scenarios, THE System SHALL include specific people, places, situations, numerical values, and real-world significance
6. THE System SHALL connect scenarios to Basel's pharmaceutical industry and medical research
7. FOR ELITE difficulty, THE System SHALL include actual pharmaceutical hormone products developed in Basel

### Requirement 20: Three-Language Support

**User Story:** As a multilingual student in Basel, I want to use the module in my preferred language, so that I can learn effectively in English, Chinese, or German.

#### Acceptance Criteria

1. THE System SHALL support three languages: English (EN), Chinese (CN), and German (DE)
2. WHEN a user switches languages, THE System SHALL translate all UI text including titles, buttons, and instructions
3. WHEN a user switches languages, THE System SHALL translate difficulty levels (BASIC/基础/BASIS, CORE/核心/KERN, ADVANCED/进阶/ERWEITERT, ELITE/精英/ELITE)
4. WHEN a user switches languages, THE System SHALL translate stage names and scenario descriptions
5. WHEN a user switches languages, THE System SHALL translate hormone names and endocrine terms
6. THE System SHALL keep chemical formulas and abbreviations in international notation (TSH, ACTH, T3, T4, etc.)
7. THE System SHALL ensure all translations are complete and accurate for each language

### Requirement 21: Answer Verification and Feedback

**User Story:** As a student, I want immediate feedback on my answers, so that I can learn from mistakes and reinforce correct understanding.

#### Acceptance Criteria

1. WHEN a user submits an answer, THE System SHALL compare it to the expected value
2. WHEN answers are correct, THE System SHALL display a success message in green
3. WHEN answers are incorrect, THE System SHALL display an error message in red with hints
4. WHEN verification succeeds, THE System SHALL enable the "Next" button to proceed to the next quest
5. WHEN a user clicks "Next", THE System SHALL load the next quest in the current difficulty and stage
6. THE System SHALL maintain quest state so users can't skip ahead without solving problems
7. WHEN all 5 quests in a stage are completed, THE System SHALL allow users to change stages or difficulty

### Requirement 22: Quest Data Structure

**User Story:** As a developer, I want well-structured quest data, so that the system can generate diverse problems and verify answers correctly.

#### Acceptance Criteria

1. THE System SHALL store quest data with fields: id, difficulty, stage, hormone, gland, function, targetOrgan, feedbackType, disorder
2. WHEN building a quest pool, THE System SHALL generate 60 total quests (3 stages × 4 difficulties × 5 quests)
3. WHEN a quest requires identification, THE System SHALL store the expected answer
4. WHEN a quest requires pathway tracing, THE System SHALL store the complete pathway sequence
5. THE System SHALL use consistent terminology following medical and biological standards
6. THE System SHALL validate that all quest data is complete before rendering
7. WHEN quest data is missing, THE System SHALL display a loading state or error message

### Requirement 23: Hormone Pathway Visualization

**User Story:** As a student, I want to see visual representations of hormone pathways, so that I can understand the flow from gland to target organ.

#### Acceptance Criteria

1. WHEN a user views a hormone pathway quest, THE Visualization SHALL display the complete pathway
2. WHEN displaying pathways, THE Visualization SHALL show: endocrine gland → bloodstream → target organ → physiological effect
3. WHEN displaying feedback loops, THE Visualization SHALL show the feedback signal returning to the gland or hypothalamus
4. THE Visualization SHALL use arrows to indicate direction of hormone flow
5. THE Visualization SHALL use color coding: stimulatory signals (green), inhibitory signals (red), hormone transport (blue)
6. THE Visualization SHALL allow users to click on pathway components to see detailed information
7. THE Visualization SHALL animate hormone release and transport for dynamic understanding

### Requirement 24: Gland Anatomy Visualization

**User Story:** As a student, I want to see anatomical visualizations of endocrine glands, so that I can understand their location and structure.

#### Acceptance Criteria

1. WHEN a user views a gland identification quest, THE Visualization SHALL display the gland's anatomical location
2. THE Visualization SHALL show the following glands: hypothalamus, pituitary (anterior and posterior), pineal, thyroid, parathyroid, thymus, adrenal (cortex and medulla), pancreas (islets of Langerhans), ovaries, testes
3. WHEN a user clicks on a gland, THE Visualization SHALL display its hormones and functions
4. THE Visualization SHALL show the relative size and position of glands in the body
5. THE Visualization SHALL use anatomically accurate colors and shapes
6. THE Visualization SHALL allow zooming in on specific glands for detailed view
7. THE Visualization SHALL label all major structures in the selected language

### Requirement 25: Feedback Loop Diagram

**User Story:** As a student, I want to see feedback loop diagrams, so that I can understand regulatory mechanisms visually.

#### Acceptance Criteria

1. WHEN a user views a feedback mechanism quest, THE Visualization SHALL display a complete feedback loop diagram
2. WHEN displaying negative feedback, THE Visualization SHALL show the inhibitory pathway with a minus sign or red arrow
3. WHEN displaying positive feedback, THE Visualization SHALL show the amplification pathway with a plus sign or green arrow
4. THE Visualization SHALL show all components: stimulus → sensor → control center → effector → response → feedback
5. THE Visualization SHALL allow users to trace the loop step by step
6. THE Visualization SHALL highlight the feedback signal that closes the loop
7. THE Visualization SHALL display set points and deviations for homeostatic mechanisms

### Requirement 26: Clinical Case Presentation

**User Story:** As a student, I want realistic clinical case presentations, so that I can practice diagnostic reasoning with endocrine disorders.

#### Acceptance Criteria

1. WHEN a user views a clinical quest, THE System SHALL present patient information including age, sex, symptoms, and lab results
2. WHEN lab results are presented, THE System SHALL display hormone levels with reference ranges
3. WHEN symptoms are presented, THE System SHALL include relevant clinical findings (vital signs, physical exam)
4. THE System SHALL present cases in a structured format: chief complaint, history, examination, investigations, diagnosis
5. THE System SHALL include realistic Basel University Hospital case scenarios
6. THE System SHALL require users to integrate multiple pieces of information to reach a diagnosis
7. FOR ELITE difficulty, THE System SHALL present complex cases with multiple endocrine abnormalities

### Requirement 27: Difficulty Progression

**User Story:** As a student, I want problems that increase in complexity, so that I can build my understanding progressively from simple to advanced concepts.

#### Acceptance Criteria

1. WHEN a user selects BASIC difficulty, THE System SHALL present simple hormone identification and gland matching
2. WHEN a user selects CORE difficulty, THE System SHALL present hormone function analysis and simple feedback loops
3. WHEN a user selects ADVANCED difficulty, THE System SHALL present complex feedback mechanisms and clinical disorder diagnosis
4. WHEN a user selects ELITE difficulty, THE System SHALL present pharmaceutical applications and complex clinical cases
5. WHEN a user changes difficulty, THE System SHALL load an independent set of 5 quests per stage
6. THE System SHALL ensure each difficulty level teaches progressively deeper concepts
7. THE System SHALL provide 60 total quests across all difficulties and stages

### Requirement 28: Responsive Layout

**User Story:** As a student using different devices, I want the module to work well on various screen sizes, so that I can learn on desktop, tablet, or mobile.

#### Acceptance Criteria

1. THE System SHALL use a two-column layout with quests on the left and visualization on the right
2. WHEN screen width is below 768px, THE System SHALL stack the layout vertically
3. THE System SHALL ensure all text is readable at minimum font size of 14px
4. THE System SHALL ensure all interactive elements (buttons, input fields) are at least 44px tall for touch targets
5. THE Visualization SHALL scale proportionally to maintain aspect ratio
6. THE System SHALL use the ChamberLayout component for consistent structure
7. THE System SHALL ensure all content is accessible without horizontal scrolling

### Requirement 29: Stage Navigation

**User Story:** As a student, I want to navigate between different stages, so that I can focus on specific topics (hormone identification, feedback mechanisms, or clinical applications).

#### Acceptance Criteria

1. THE System SHALL provide three stages: Hormone Identification, Feedback Mechanisms, and Clinical Applications
2. WHEN a user selects a stage, THE System SHALL load the appropriate quest pool for that stage
3. WHEN a user changes stages, THE System SHALL reset to the first quest of the selected stage
4. THE System SHALL visually indicate the current stage in the navigation
5. THE System SHALL allow stage changes at any time without losing progress in other stages
6. WHEN a user completes all quests in a stage, THE System SHALL mark that stage as complete
7. THE System SHALL persist stage completion status across sessions

### Requirement 30: Formula and Notation Rendering

**User Story:** As a student, I want to see properly formatted scientific notation, so that I can understand hormone names and chemical structures clearly.

#### Acceptance Criteria

1. THE System SHALL render all scientific notation using react-katex library
2. WHEN displaying hormone abbreviations, THE System SHALL use proper formatting (T₃, T₄, etc.)
3. WHEN displaying chemical structures, THE System SHALL use standard biochemical notation
4. THE System SHALL use subscripts for numbers in hormone names (T₃ not T3 in display)
5. THE System SHALL render Greek letters properly (α, β, Δ) in hormone names
6. THE System SHALL use InlineMath component for inline notation
7. WHEN formulas fail to render, THE System SHALL display an error message

