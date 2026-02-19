# Implementation Plan: GB2.02 - Endocrine System

## Overview

This implementation plan covers the GB2.02 Endocrine System module, an interactive educational web application teaching Gymnasium Biology students about the endocrine system. The module consists of three stages (Hormone Identification, Feedback Mechanisms, Clinical Applications), each with four difficulty levels (BASIC, CORE, ADVANCED, ELITE), providing 60 total quests. All content is available in three languages (EN/CN/DE) with Basel-specific pharmaceutical and medical scenarios.

Key implementation areas:
1. Core data structures and quest generation (60 quests total: 3 stages × 4 difficulties × 5 quests)
2. Hormone pathway visualization with gland-to-target organ flow
3. Feedback loop diagrams showing negative and positive feedback mechanisms
4. Anatomical gland visualization with clickable components
5. Clinical case presentations with lab results and diagnostic reasoning
6. LaTeX rendering for scientific notation using react-katex
7. Three-language support with Basel pharmaceutical industry contexts
8. Comprehensive testing including 40 property-based tests

## Tasks

- [ ] 1. Set up project structure and core interfaces
  - [ ] 1.1 Create TypeScript interfaces for endocrine data models
    - Define Hormone, EndocrineGland, HormonePathway interfaces
    - Define FeedbackLoop, FeedbackComponent interfaces
    - Define ClinicalCase, PatientInfo, LabResult interfaces
    - Define GB202Quest interface extending base Quest
    - Define Stage and Difficulty enums
    - Define HormoneType type (peptide | steroid | amino_acid_derived)
    - _Requirements: 1.1, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1, 8.1, 9.1, 10.1, 22.1_
  
  - [ ] 1.2 Set up react-katex for LaTeX rendering
    - Install react-katex and @types/katex dependencies
    - Import InlineMath component for hormone notation
    - Configure LaTeX rendering for subscripts (T₃, T₄)
    - Test rendering of hormone abbreviations (TSH, ACTH, FSH, LH)
    - _Requirements: 30.1, 30.2, 30.4, 30.5, 30.6_
  
  - [ ] 1.3 Create utility functions for hormone data
    - Implement getHormoneType() to classify hormone structure
    - Implement getGlandForHormone() for gland-hormone mapping
    - Implement getTargetOrgans() for hormone-target mapping
    - Implement validateHormoneData() for data completeness
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 3.1, 4.1_


- [ ] 2. Implement hormone classification and verification logic
  - [ ] 2.1 Implement hormone type classification
    - Classify peptide hormones (amino acid chains)
    - Classify steroid hormones (cholesterol-derived)
    - Classify amino acid-derived hormones (single amino acid)
    - Return hormone type with structural description
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  
  - [ ]* 2.2 Write property test for hormone type classification
    - **Property 2: Hormone Type Classification Correctness**
    - **Validates: Requirements 1.1, 1.2, 1.3, 1.4**
  
  - [ ] 2.3 Implement gland-hormone mapping verification
    - Verify pituitary hormones (GH, TSH, ACTH, FSH, LH, prolactin, ADH, oxytocin)
    - Verify thyroid hormones (T4, T3)
    - Verify adrenal hormones (cortisol, aldosterone, adrenaline)
    - Verify pancreatic hormones (insulin, glucagon)
    - Verify gonadal hormones (testosterone, estrogen, progesterone)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_
  
  - [ ]* 2.4 Write property test for hormone-gland mapping
    - **Property 12: Hormone-Gland Mapping Correctness**
    - **Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6**
  
  - [ ] 2.5 Implement hormone function verification
    - Verify insulin lowers blood glucose
    - Verify glucagon raises blood glucose
    - Verify thyroxine regulates metabolic rate
    - Verify adrenaline prepares for fight-or-flight
    - Verify cortisol regulates stress response
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_
  
  - [ ]* 2.6 Write property test for hormone function mapping
    - **Property 13: Hormone Function Mapping Correctness**
    - **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6**
  
  - [ ] 2.7 Implement target organ verification
    - Verify insulin targets liver/muscle/adipose tissue
    - Verify ADH targets kidney collecting ducts
    - Verify TSH targets thyroid gland
    - Verify FSH/LH target gonads
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  
  - [ ]* 2.8 Write property test for target organ mapping
    - **Property 14: Target Organ Mapping Correctness**
    - **Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5**

- [ ] 3. Implement feedback loop analysis logic
  - [ ] 3.1 Implement negative feedback loop structure verification
    - Verify stimulus triggers hormone release
    - Verify hormone acts on target organs
    - Verify response inhibits further hormone release
    - Verify homeostasis is maintained
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  
  - [ ]* 3.2 Write property test for negative feedback loop structure
    - **Property 15: Negative Feedback Loop Structure**
    - **Validates: Requirements 5.1, 5.2, 5.3, 5.4**
  
  - [ ] 3.3 Implement positive feedback loop verification
    - Verify response amplifies initial stimulus
    - Verify reinforcing cycle continues
    - Verify external event terminates loop
    - _Requirements: 6.1, 6.2, 6.3_
  
  - [ ]* 3.4 Write property test for positive feedback amplification
    - **Property 16: Positive Feedback Loop Amplification**
    - **Validates: Requirements 6.1, 6.2, 6.3**
  
  - [ ] 3.5 Implement homeostatic response verification
    - Verify high glucose triggers insulin
    - Verify low glucose triggers glucagon
    - Verify high calcium triggers calcitonin
    - Verify low calcium triggers PTH
    - Verify low blood pressure triggers aldosterone and ADH
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_
  
  - [ ]* 3.6 Write property test for homeostatic response
    - **Property 17: Homeostatic Response Correctness**
    - **Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5, 7.6**
  
  - [ ] 3.7 Implement hypothalamic-pituitary axis mapping
    - Verify TSH is released by TRH
    - Verify ACTH is released by CRH
    - Verify growth hormone is released by GHRH
    - Verify prolactin is inhibited by dopamine
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  
  - [ ]* 3.8 Write property test for hypothalamic-pituitary axis
    - **Property 18: Hypothalamic-Pituitary Axis Mapping**
    - **Validates: Requirements 8.1, 8.2, 8.3, 8.4, 8.5**

- [ ] 4. Checkpoint - Verify core logic
  - Ensure all tests pass, ask the user if questions arise.


- [ ] 5. Implement clinical diagnosis logic
  - [ ] 5.1 Implement disorder diagnosis from symptoms
    - Diagnose diabetes mellitus from excessive thirst/urination/high glucose
    - Diagnose hypothyroidism from weight gain/fatigue/cold intolerance
    - Diagnose hyperthyroidism from weight loss/heat intolerance/rapid heartbeat
    - Diagnose gigantism from excessive growth
    - Diagnose hyperaldosteronism from high blood pressure/low potassium
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_
  
  - [ ]* 5.2 Write property test for clinical disorder diagnosis
    - **Property 19: Clinical Disorder Diagnosis from Symptoms**
    - **Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5, 9.6**
  
  - [ ] 5.3 Implement hormone level interpretation
    - Interpret high TSH + low T4 as primary hypothyroidism
    - Interpret low TSH + high T4 as primary hyperthyroidism
    - Interpret low TSH + low T4 as secondary hypothyroidism
    - Interpret high cortisol + low ACTH as adrenal tumor
    - Interpret high cortisol + high ACTH as pituitary tumor
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_
  
  - [ ]* 5.4 Write property test for hormone level interpretation
    - **Property 20: Hormone Level Interpretation Correctness**
    - **Validates: Requirements 10.1, 10.2, 10.3, 10.4, 10.5, 10.6**
  
  - [ ] 5.5 Implement diabetes type differentiation
    - Identify Type 1 by autoimmune beta cell destruction
    - Identify Type 1 by insulin requirement from diagnosis
    - Identify Type 2 by insulin resistance
    - Identify Type 2 by initial lifestyle/oral medication treatment
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_
  
  - [ ]* 5.6 Write property test for diabetes type differentiation
    - **Property 21: Diabetes Type Differentiation**
    - **Validates: Requirements 11.1, 11.2, 11.3, 11.4, 11.5**
  
  - [ ] 5.7 Implement thyroid disorder mechanism identification
    - Identify Graves' disease by autoimmune TSH receptor stimulation
    - Identify Hashimoto's thyroiditis by autoimmune thyroid destruction
    - Identify iodine deficiency by reduced T3/T4 synthesis and goiter
    - Identify thyroid nodules by autonomous hormone production
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_
  
  - [ ]* 5.8 Write property test for thyroid disorder mechanisms
    - **Property 22: Thyroid Disorder Mechanism Identification**
    - **Validates: Requirements 12.1, 12.2, 12.3, 12.4, 12.5**
  
  - [ ] 5.9 Implement hormone therapy matching
    - Match hypothyroidism with levothyroxine
    - Match Type 1 diabetes with insulin
    - Match Addison's disease with hydrocortisone and fludrocortisone
    - Match growth hormone deficiency with recombinant growth hormone
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_
  
  - [ ]* 5.10 Write property test for hormone therapy matching
    - **Property 23: Hormone Therapy Matching**
    - **Validates: Requirements 13.1, 13.2, 13.3, 13.4, 13.5**


- [ ] 6. Create quest data for Hormone Identification stage
  - [ ] 6.1 Create BASIC difficulty quest data (5 quests)
    - Simple hormone type classification (insulin=peptide, cortisol=steroid, thyroxine=amino acid-derived)
    - Simple gland identification (insulin→pancreas, cortisol→adrenal cortex)
    - Clear examples with common hormones
    - Add Basel context (Roche Diagnostics, Novartis Endocrinology Lab)
    - _Requirements: 1.5, 1.7, 2.7, 19.1, 19.2, 19.4_
  
  - [ ] 6.2 Create CORE difficulty quest data (5 quests)
    - Hormone function matching (thyroxine→metabolic rate, ADH→water reabsorption)
    - Target organ identification (insulin→liver/muscle/adipose, ADH→kidney)
    - Requires understanding of hormone actions
    - Add Basel University Hospital and research center contexts
    - _Requirements: 3.7, 3.8, 4.6, 19.1, 19.2, 19.4_
  
  - [ ] 6.3 Create ADVANCED difficulty quest data (5 quests)
    - Hypothalamic-pituitary axis (TSH←TRH, ACTH←CRH, GH←GHRH)
    - Complex hormone interactions
    - Feedback mechanisms
    - Add Basel University Hospital Thyroid Clinic contexts
    - _Requirements: 8.6, 19.1, 19.2, 19.4_
  
  - [ ] 6.4 Create ELITE difficulty quest data (5 quests)
    - Pharmaceutical hormone applications (recombinant GH, levothyroxine)
    - Real pharmaceutical processes from Novartis/Roche Basel
    - Therapeutic uses and manufacturing
    - Add authentic Basel pharmaceutical production contexts
    - _Requirements: 13.6, 13.7, 19.1, 19.2, 19.4, 19.7_
  
  - [ ]* 6.5 Write property test for quest pool size
    - **Property 1: Quest Pool Size Consistency**
    - **Validates: Requirements 1.5, 2.7, 3.7, 4.6, 22.2**


- [ ] 7. Create quest data for Feedback Mechanisms stage
  - [ ] 7.1 Create BASIC difficulty quest data (5 quests)
    - Simple negative feedback (blood glucose regulation via insulin/glucagon)
    - Clear stimulus-response-feedback pathways
    - Homeostatic mechanisms
    - Add Basel Diabetes Research Center contexts
    - _Requirements: 5.5, 7.7, 19.1, 19.2, 19.4_
  
  - [ ] 7.2 Create CORE difficulty quest data (5 quests)
    - Thyroid hormone regulation (hypothalamus→TRH→pituitary→TSH→thyroid→T3/T4)
    - Water balance regulation (ADH, aldosterone)
    - Set point and deviation concepts
    - Add Basel Endocrinology Research Institute contexts
    - _Requirements: 5.5, 18.6, 18.7, 19.1, 19.2, 19.4_
  
  - [ ] 7.3 Create ADVANCED difficulty quest data (5 quests)
    - Positive feedback (oxytocin during childbirth, LH surge)
    - HPA axis stress response (stress→CRH→ACTH→cortisol)
    - Calcium homeostasis (PTH, calcitonin)
    - Add Basel Stress Physiology Laboratory contexts
    - _Requirements: 5.5, 6.4, 6.6, 14.5, 17.6, 19.1, 19.2, 19.4_
  
  - [ ] 7.4 Create ELITE difficulty quest data (5 quests)
    - Multi-hormone interactions (reproductive hormone cycle)
    - Pharmaceutical interventions (oral contraceptives suppress GnRH)
    - Complex regulatory networks
    - Add Novartis Reproductive Endocrinology Research contexts
    - _Requirements: 5.5, 16.6, 19.1, 19.2, 19.4, 19.7_
  
  - [ ]* 7.5 Write property test for feedback loop visualization
    - **Property 5: Feedback Loop Visualization Correctness**
    - **Validates: Requirements 5.6, 5.7, 23.3, 23.5, 25.1, 25.2, 25.3, 25.4, 25.6**


- [ ] 8. Create quest data for Clinical Applications stage
  - [ ] 8.1 Create BASIC difficulty quest data (5 quests)
    - Simple disorder identification (diabetes from high glucose/thirst/urination)
    - Clear symptom patterns
    - Single hormone abnormalities
    - Add Basel University Hospital Endocrinology Clinic contexts
    - _Requirements: 9.7, 19.1, 19.2, 19.4_
  
  - [ ] 8.2 Create CORE difficulty quest data (5 quests)
    - Diabetes type differentiation (Type 1 vs Type 2)
    - Thyroid disorders (hypothyroidism, hyperthyroidism)
    - Lab result interpretation with reference ranges
    - Add Basel Children's Hospital and thyroid clinic contexts
    - _Requirements: 11.6, 12.6, 19.1, 19.2, 19.4_
  
  - [ ] 8.3 Create ADVANCED difficulty quest data (5 quests)
    - Hormone level interpretation (TSH/T4 patterns)
    - Growth and development disorders
    - Calcium homeostasis disorders
    - Add Basel University Hospital specialized clinics contexts
    - _Requirements: 10.7, 10.8, 15.6, 17.6, 19.1, 19.2, 19.4_
  
  - [ ] 8.4 Create ELITE difficulty quest data (5 quests)
    - Complex multi-hormone disorders (primary hyperaldosteronism, Cushing's syndrome)
    - Pharmaceutical interventions (spironolactone, levothyroxine)
    - Real Basel University Hospital cases with Novartis pharmaceutical research
    - Add authentic Basel pharmaceutical treatment contexts
    - _Requirements: 9.8, 13.6, 13.7, 16.6, 19.1, 19.2, 19.4, 19.7, 26.5, 26.7_
  
  - [ ]* 8.5 Write property test for Basel context inclusion
    - **Property 9: Basel Context Inclusion**
    - **Validates: Requirements 19.1, 19.2, 19.3, 19.4, 19.5, 19.6**

- [ ] 9. Checkpoint - Verify quest data completeness
  - Ensure all tests pass, ask the user if questions arise.


- [ ] 10. Implement buildStagePool() quest generation function
  - [ ] 10.1 Implement quest pool generation logic
    - Filter quests by stage and difficulty
    - Map hormone/feedback/clinical data to GB202Quest objects
    - Generate LaTeX strings for hormone notation
    - Set expected answers for verification
    - Return array of exactly 5 quests per stage/difficulty
    - _Requirements: 1.5, 2.7, 3.7, 4.6, 5.5, 9.7, 22.1, 22.2_
  
  - [ ] 10.2 Implement LaTeX generation for hormone notation
    - Convert hormone abbreviations to LaTeX (T₃, T₄, etc.)
    - Use InlineMath for subscripts and superscripts
    - Render Greek letters properly (α, β, Δ)
    - Keep international notation consistent across languages
    - _Requirements: 30.1, 30.2, 30.3, 30.4, 30.5, 30.6_
  
  - [ ]* 10.3 Write property test for quest data structure completeness
    - **Property 31: Quest Data Structure Completeness**
    - **Validates: Requirements 22.1, 22.3, 22.4, 22.6**
  
  - [ ]* 10.4 Write property test for hormone count diversity
    - **Property 34: Hormone Count Diversity**
    - **Validates: Requirements 3.8**


- [ ] 11. Implement translations for all three languages
  - [ ] 11.1 Add complete English translations to i18n
    - Add module title and all UI text
    - Add stage names (Hormone Identification, Feedback Mechanisms, Clinical Applications)
    - Add difficulty levels (BASIC, CORE, ADVANCED, ELITE)
    - Add hormone names and endocrine terms
    - Add all scenario descriptions (150-250 words each)
    - Add button labels (Verify, Next, Reset)
    - Add feedback messages (correct, incorrect, hints)
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5_
  
  - [ ] 11.2 Add complete Chinese translations to i18n
    - Translate all UI text to Chinese
    - Translate stage names (激素识别, 反馈机制, 临床应用)
    - Translate difficulty levels (基础, 核心, 进阶, 精英)
    - Translate hormone names and endocrine terms
    - Translate all scenario descriptions
    - Keep chemical formulas and abbreviations unchanged (TSH, ACTH, T3, T4)
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5, 20.6_
  
  - [ ] 11.3 Add complete German translations to i18n
    - Translate all UI text to German
    - Translate stage names (Hormonidentifikation, Rückkopplungsmechanismen, Klinische Anwendungen)
    - Translate difficulty levels (BASIS, KERN, ERWEITERT, ELITE)
    - Translate hormone names and endocrine terms
    - Translate all scenario descriptions
    - Keep chemical formulas and abbreviations unchanged
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5, 20.6_
  
  - [ ]* 11.4 Write property test for translation completeness
    - **Property 3: Translation Completeness**
    - **Validates: Requirements 20.1, 20.2, 20.3, 20.4, 20.5, 20.6, 20.7**


- [ ] 12. Implement EndocrineVisualization component
  - [ ] 12.1 Create EndocrineVisualization component structure
    - Create container with stage-based rendering logic
    - Implement HormonePathwayView sub-component
    - Implement FeedbackLoopView sub-component
    - Implement GlandAnatomyView sub-component
    - Implement ClinicalDataView sub-component
    - _Requirements: 23.1, 24.1, 25.1, 26.1_
  
  - [ ] 12.2 Implement HormonePathwayView
    - Display endocrine gland with anatomical location
    - Show hormone release into bloodstream (animated blue flow)
    - Display target organ(s) with arrows
    - Show physiological effect text
    - Use color coding: glands (purple), bloodstream (blue), target organs (orange), effects (green)
    - Add hover tooltips for detailed information
    - _Requirements: 23.1, 23.2, 23.4, 23.6_
  
  - [ ]* 12.3 Write property test for hormone pathway visualization
    - **Property 4: Hormone Pathway Visualization Completeness**
    - **Validates: Requirements 23.1, 23.2, 23.4**
  
  - [ ] 12.4 Implement FeedbackLoopView
    - Display complete feedback loop diagram
    - Show stimulus → sensor → control center → effector → response → feedback
    - Use green arrows for stimulatory pathways
    - Use red arrows with minus signs for inhibitory pathways
    - Display set point and deviation indicators
    - Animate feedback signal flow
    - Highlight negative vs positive feedback mechanisms
    - _Requirements: 25.1, 25.2, 25.3, 25.4, 25.5, 25.6, 25.7_
  
  - [ ]* 12.5 Write property test for visualization color coding
    - **Property 8: Visualization Color Coding Consistency**
    - **Validates: Requirements 5.7, 23.5**
  
  - [ ] 12.6 Implement GlandAnatomyView
    - Display human body outline with gland locations
    - Show all major endocrine glands (hypothalamus, pituitary, pineal, thyroid, parathyroid, thymus, adrenal, pancreas, gonads)
    - Allow clicking on glands to see detailed information
    - Display gland size and position accurately
    - Show zoom controls for detailed view
    - Label all structures in selected language
    - Use anatomically accurate colors
    - _Requirements: 24.1, 24.2, 24.3, 24.4, 24.5, 24.6, 24.7_
  
  - [ ]* 12.7 Write property test for gland anatomy visualization
    - **Property 6: Gland Anatomy Visualization Completeness**
    - **Validates: Requirements 24.1, 24.2, 24.3, 24.4, 24.5, 24.7**
  
  - [ ] 12.8 Implement ClinicalDataView
    - Display lab result charts with hormone levels
    - Show reference ranges with color-coded indicators (green=normal, red=abnormal)
    - Display trend graphs for hormone levels over time
    - Show patient information and symptoms
    - Include diagnostic reasoning support
    - _Requirements: 26.1, 26.2, 26.3, 26.4_
  
  - [ ]* 12.9 Write property test for clinical case presentation
    - **Property 7: Clinical Case Presentation Completeness**
    - **Validates: Requirements 26.1, 26.2, 26.3, 26.4**

- [ ] 13. Checkpoint - Verify visualization components
  - Ensure all tests pass, ask the user if questions arise.


- [ ] 14. Implement HormonePathwayBuilder component
  - [ ] 14.1 Create HormonePathwayBuilder component structure
    - Create list of available pathway components
    - Implement drag-and-drop or click-to-select interface
    - Display visual pathway diagram
    - Add verification button
    - Add reset button
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  
  - [ ] 14.2 Implement pathway component selection
    - Allow selection of glands, hormones, target organs, effects
    - Update pathway diagram as components are selected
    - Validate pathway completeness
    - Highlight selected components
    - _Requirements: 5.1, 5.2_
  
  - [ ] 14.3 Implement pathway verification
    - Check if pathway includes all required components
    - Verify correct sequence (gland → hormone → target → effect)
    - Display success/error feedback
    - Generate hints for incorrect pathways
    - _Requirements: 5.3, 5.4_
  
  - [ ] 14.4 Implement pathway reset functionality
    - Clear all selected components
    - Reset pathway diagram to initial state
    - Allow user to start over
    - _Requirements: 5.4_


- [ ] 15. Implement ClinicalCaseDisplay component
  - [ ] 15.1 Create ClinicalCaseDisplay component structure
    - Display patient information (age, sex, occupation)
    - Show chief complaint and history
    - Display examination findings
    - Show symptoms checklist
    - Display lab results table
    - Add diagnosis selection interface
    - _Requirements: 26.1, 26.2, 26.3, 26.4_
  
  - [ ] 15.2 Implement lab results display
    - Create table with hormone levels and reference ranges
    - Color-code abnormal values (red for high, blue for low)
    - Display units for each measurement
    - Show status indicators (normal/high/low)
    - _Requirements: 26.2, 26.3_
  
  - [ ] 15.3 Implement diagnosis selection
    - Provide multiple choice or dropdown for diagnosis
    - Include differential diagnoses as options
    - Verify selected diagnosis against expected
    - Display feedback with explanation
    - _Requirements: 26.4, 26.6_
  
  - [ ] 15.4 Add Basel University Hospital case context
    - Display Basel University Hospital branding
    - Include realistic case presentation format
    - Add Basel-specific medical context
    - _Requirements: 19.1, 19.2, 26.5_


- [ ] 16. Implement GlandAnatomyVisualization component
  - [ ] 16.1 Create GlandAnatomyVisualization component structure
    - Create human body outline SVG
    - Add clickable gland markers at anatomical positions
    - Implement gland detail panel
    - Add zoom and pan controls
    - Add label toggle
    - _Requirements: 24.1, 24.2, 24.3, 24.6_
  
  - [ ] 16.2 Implement gland positioning
    - Position hypothalamus at brain base
    - Position pituitary below hypothalamus
    - Position pineal in brain center
    - Position thyroid at neck
    - Position parathyroid behind thyroid
    - Position thymus in upper chest
    - Position adrenal glands above kidneys
    - Position pancreas in abdomen
    - Position gonads (ovaries/testes) in pelvis
    - _Requirements: 24.2, 24.4_
  
  - [ ] 16.3 Implement gland click interaction
    - Display gland name on click
    - Show hormones produced by gland
    - Display gland functions
    - Show subdivisions if applicable (anterior/posterior pituitary)
    - _Requirements: 24.3_
  
  - [ ] 16.4 Implement zoom controls
    - Add zoom in/out buttons
    - Allow zooming on specific glands
    - Maintain aspect ratio during zoom
    - Reset zoom to default view
    - _Requirements: 24.6_
  
  - [ ] 16.5 Implement label toggle
    - Show/hide gland labels
    - Display labels in selected language
    - Position labels clearly near glands
    - _Requirements: 24.7_


- [ ] 17. Implement GB202EndocrineSystem main page component
  - [ ] 17.1 Create GB202EndocrineSystem component structure
    - Set up useQuestManager hook integration
    - Initialize state for current hormone, pathway, feedback loop
    - Implement stage and difficulty change handlers
    - Set up language switching via i18n
    - _Requirements: 20.1, 29.1, 29.2_
  
  - [ ] 17.2 Implement quest pool building
    - Call buildStagePool() for current stage and difficulty
    - Load initial quest (index 0)
    - Update visualization when quest changes
    - _Requirements: 1.5, 2.7, 3.7, 4.6, 5.5, 9.7, 22.2_
  
  - [ ] 17.3 Implement answer verification logic
    - For hormone identification: verify hormone type, gland, function, or target organ
    - For feedback mechanisms: verify feedback pathway and components
    - For clinical applications: verify diagnosis from symptoms and lab results
    - Display success/error feedback
    - Enable "Next" button only after correct answer
    - _Requirements: 21.1, 21.2, 21.3, 21.4_
  
  - [ ]* 17.4 Write property test for answer verification
    - **Property 29: Answer Verification Correctness**
    - **Validates: Requirements 21.1, 21.2, 21.3**
  
  - [ ] 17.5 Implement navigation logic
    - "Next" button advances to next quest
    - Reset quest index when stage or difficulty changes
    - Track stage completion status
    - Persist progress in localStorage
    - _Requirements: 21.5, 21.6, 21.7, 29.5, 29.6, 29.7_
  
  - [ ]* 17.6 Write property test for navigation state management
    - **Property 30: Navigation State Management**
    - **Validates: Requirements 21.4, 21.5, 21.6, 21.7**

- [ ] 18. Checkpoint - Verify core module functionality
  - Ensure all tests pass, ask the user if questions arise.


- [ ] 19. Implement stage and difficulty management
  - [ ] 19.1 Implement stage switching
    - Create stage selector UI (Hormone Identification, Feedback Mechanisms, Clinical Applications)
    - Load appropriate quest pool when stage changes
    - Reset to first quest (index 0)
    - Update visualization to match stage
    - Visually indicate current stage
    - _Requirements: 29.1, 29.2, 29.3, 29.4_
  
  - [ ]* 19.2 Write property test for stage configuration
    - **Property 11: Stage Configuration and Navigation**
    - **Validates: Requirements 29.1, 29.2, 29.3, 29.5, 29.6, 29.7**
  
  - [ ] 19.3 Implement difficulty switching
    - Create difficulty selector UI (BASIC, CORE, ADVANCED, ELITE)
    - Load independent quest pools (not cumulative)
    - Reset to first quest when difficulty changes
    - _Requirements: 27.1, 27.2, 27.3, 27.4, 27.5_
  
  - [ ]* 19.4 Write property test for difficulty progression
    - **Property 38: Difficulty Progression in Quest Types**
    - **Validates: Requirements 27.1, 27.2, 27.3, 27.4, 27.5**
  
  - [ ] 19.5 Implement stage progress independence
    - Track progress separately for each stage
    - Preserve progress when switching stages
    - Allow users to switch freely between stages
    - _Requirements: 29.5_
  
  - [ ] 19.6 Implement stage completion tracking
    - Mark stage as complete when all quests verified
    - Persist completion status across sessions
    - Display completion indicators in UI
    - _Requirements: 29.6, 29.7_


- [ ] 20. Implement responsive layout and accessibility
  - [ ] 20.1 Integrate ChamberLayout component
    - Use ChamberLayout for two-column structure
    - Place quest content in left panel
    - Place visualization in right panel
    - Ensure proper header and footer integration
    - _Requirements: 28.1, 28.6_
  
  - [ ]* 20.2 Write property test for ChamberLayout usage
    - **Property 40: ChamberLayout Component Usage**
    - **Validates: Requirements 28.6**
  
  - [ ] 20.3 Implement responsive breakpoints
    - Two-column layout for screens ≥768px
    - Vertical stack for screens <768px
    - Quest content above visualization on mobile
    - _Requirements: 28.1, 28.2_
  
  - [ ]* 20.4 Write property test for responsive layout
    - **Property 10: Responsive Layout Behavior**
    - **Validates: Requirements 28.1, 28.2, 28.3, 28.4, 28.7**
  
  - [ ] 20.5 Ensure accessibility minimum sizes
    - Set minimum font size to 14px for all text
    - Set minimum height to 44px for all interactive elements
    - Ensure touch targets meet accessibility standards
    - _Requirements: 28.3, 28.4_
  
  - [ ] 20.6 Implement visualization aspect ratio preservation
    - Maintain constant aspect ratio during resize
    - Prevent distortion of anatomical diagrams
    - Scale proportionally on all screen sizes
    - _Requirements: 28.5_
  
  - [ ]* 20.7 Write property test for aspect ratio preservation
    - **Property 39: Visualization Aspect Ratio Preservation**
    - **Validates: Requirements 28.5**
  
  - [ ] 20.8 Prevent horizontal scrolling
    - Ensure all content fits within viewport width
    - Test on various screen sizes
    - Use responsive units (%, vw, rem)
    - _Requirements: 28.7_


- [ ] 21. Implement error handling
  - [ ] 21.1 Add input validation error handling
    - Display error messages for invalid selections
    - Handle empty selections gracefully
    - Provide helpful error messages
    - Highlight fields that need attention
    - _Requirements: 21.1_
  
  - [ ] 21.2 Add quest loading error handling
    - Handle missing quest data gracefully
    - Display loading states
    - Retry failed quest loads
    - Log errors for debugging
    - Skip invalid quests
    - _Requirements: 22.1, 22.6_
  
  - [ ] 21.3 Add LaTeX rendering error handling
    - Fall back to plain text if LaTeX fails
    - Display warning for rendering issues
    - Ensure functionality remains intact
    - _Requirements: 30.7_
  
  - [ ] 21.4 Add visualization error handling
    - Fall back to simplified visualizations if needed
    - Handle missing pathway data
    - Display static structures if animation fails
    - Handle missing gland location data
    - _Requirements: 23.1, 24.1, 25.1_
  
  - [ ] 21.5 Add translation error handling
    - Fall back to English for missing translations
    - Log missing translation keys
    - Continue with available translations
    - Display language indicator for mixed content
    - _Requirements: 20.1, 20.2_
  
  - [ ] 21.6 Add clinical data error handling
    - Handle missing lab results gracefully
    - Use standard reference ranges if data missing
    - Display warnings for unusual lab values
    - Allow diagnosis based on available data
    - _Requirements: 26.1, 26.2_


- [ ] 22. Add comprehensive unit testing
  - [ ]* 22.1 Write unit tests for quest generation
    - Test buildStagePool for all stages and difficulties
    - Test quest pool contains exactly 5 quests
    - Test quest objects have all required fields
    - Test LaTeX strings are properly formatted
    - Test expected answers are set correctly
    - Test at least 12 different hormones exist
  
  - [ ]* 22.2 Write unit tests for hormone classification
    - Test peptide hormone identification (insulin, growth hormone)
    - Test steroid hormone identification (cortisol, testosterone, estrogen)
    - Test amino acid-derived hormone identification (thyroxine, adrenaline)
    - Test hormone structure descriptions
  
  - [ ]* 22.3 Write unit tests for gland-hormone mapping
    - Test pituitary hormones (GH, TSH, ACTH, FSH, LH, prolactin, ADH, oxytocin)
    - Test thyroid hormones (T4, T3)
    - Test adrenal hormones (cortisol, aldosterone, adrenaline)
    - Test pancreatic hormones (insulin, glucagon)
    - Test gonadal hormones (testosterone, estrogen, progesterone)
  
  - [ ]* 22.4 Write unit tests for feedback loop structure
    - Test negative feedback loops (thyroid, cortisol, glucose)
    - Test positive feedback loops (oxytocin, LH surge)
    - Test homeostatic responses
    - Test hypothalamic-pituitary axis mappings
  
  - [ ]* 22.5 Write unit tests for clinical diagnosis
    - Test disorder diagnosis from symptoms
    - Test hormone level interpretation
    - Test diabetes type differentiation
    - Test thyroid disorder mechanisms
    - Test hormone therapy matching
  
  - [ ]* 22.6 Write unit tests for LaTeX rendering
    - Test hormone abbreviation formatting (T₃, T₄, TSH, ACTH)
    - Test subscript rendering
    - Test Greek letter rendering (α, β, Δ)
    - Test InlineMath component usage

- [ ] 23. Checkpoint - Verify testing coverage
  - Ensure all tests pass, ask the user if questions arise.


- [ ]* 24. Add integration testing
  - [ ]* 24.1 Write end-to-end quest flow tests
    - Test load module → verify initial quest displays
    - Test select correct answer → verify success feedback
    - Test click "Next" → verify next quest loads
    - Test complete all 5 quests → verify stage completion
    - Test change difficulty → verify new quest pool loads
    - Test change stage → verify appropriate visualization displays
  
  - [ ]* 24.2 Write visualization synchronization tests
    - Test quest change updates visualization
    - Test stage change updates visualization type
    - Test hormone pathway displays correctly
    - Test feedback loop displays correctly
    - Test gland anatomy displays correctly
    - Test clinical data displays correctly
  
  - [ ]* 24.3 Write language switching tests
    - Test load in English → verify all text is English
    - Test switch to Chinese → verify text updates
    - Test switch to German → verify text updates
    - Test hormone abbreviations remain unchanged
    - Test chemical formulas remain in international notation
  
  - [ ]* 24.4 Write clinical case interaction tests
    - Test load clinical case → verify patient info displays
    - Test review lab results → verify reference ranges shown
    - Test select diagnosis → verify feedback indicates correct/incorrect
    - Test view visualization → verify hormone levels displayed


- [ ] 25. Browser testing and validation
  - [ ] 25.1 Test in Chrome/Edge
    - Load module and verify no console errors
    - Test all quests display correctly with LaTeX rendering
    - Test hormone selection inputs work properly
    - Test feedback loop tracing works
    - Test clinical case diagnosis selection works
    - Test Verify button triggers validation
    - Test Next button advances to next quest
    - Test visualizations render correctly
    - Test animations play smoothly
    - Test language switching works
    - Test responsive layout on various screen sizes
    - Test gland anatomy is clickable
    - _Requirements: All_
  
  - [ ] 25.2 Test in Firefox
    - Repeat all tests from Chrome/Edge
    - Verify LaTeX formulas render correctly
    - Verify animations work smoothly
    - Verify anatomical diagrams display correctly
    - Test react-katex compatibility
    - _Requirements: All_
  
  - [ ] 25.3 Test in Safari
    - Repeat all tests from Chrome/Edge
    - Verify iOS compatibility (if applicable)
    - Test touch interactions on iPad
    - Verify all features work
    - _Requirements: All_
  
  - [ ] 25.4 Test on mobile devices
    - Test on iOS Safari (iPhone/iPad)
    - Test on Android Chrome
    - Verify touch interactions work (44px minimum)
    - Verify responsive layout (vertical stack <768px)
    - Test selection inputs on mobile
    - Test visualization scaling on mobile
    - _Requirements: 28.2, 28.3, 28.4_


- [ ] 26. Performance optimization
  - [ ] 26.1 Optimize quest loading performance
    - Ensure initial page load < 2 seconds
    - Ensure quest transition < 200ms
    - Lazy load quest data if needed
    - _Requirements: Performance targets_
  
  - [ ] 26.2 Optimize visualization rendering
    - Ensure visualization updates < 300ms
    - Optimize SVG rendering for anatomy view
    - Use React.memo for visualization components
    - Test on lower-end devices
    - _Requirements: 23.1, 24.1, 25.1_
  
  - [ ] 26.3 Optimize animation performance
    - Target 60fps for hormone flow animations
    - Use requestAnimationFrame for smooth playback
    - Optimize canvas/SVG rendering
    - Test feedback loop animations
    - _Requirements: 23.7, 25.5_
  
  - [ ] 26.4 Monitor memory usage
    - Test for memory leaks during extended use
    - Verify animations don't accumulate memory
    - Test with 50+ quest transitions
    - Ensure cleanup on component unmount
    - _Requirements: Performance targets_


- [ ] 27. Final integration and wiring
  - [ ] 27.1 Wire all components together
    - Connect GB202EndocrineSystem to ChamberLayout
    - Connect EndocrineVisualization to quest state
    - Connect HormonePathwayBuilder to quest state
    - Connect ClinicalCaseDisplay to quest state
    - Connect GlandAnatomyVisualization to quest state
    - Ensure all data flows correctly
    - _Requirements: All_
  
  - [ ] 27.2 Verify all 60 quests are accessible
    - Test all 3 stages load correctly
    - Test all 4 difficulty levels load correctly
    - Verify 5 quests per stage/difficulty combination
    - Verify total quest count is 60
    - _Requirements: 1.5, 2.7, 3.7, 4.6, 5.5, 9.7, 22.2, 27.7_
  
  - [ ] 27.3 Verify Basel-specific scenarios
    - Check all quests have Basel context
    - Verify Novartis/Roche references are accurate
    - Verify Basel University Hospital references are authentic
    - Verify pharmaceutical processes are realistic
    - Verify scenario descriptions are 150-250 words
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 19.6, 19.7_
  
  - [ ] 27.4 Verify three-language support
    - Test complete module in English
    - Test complete module in Chinese
    - Test complete module in German
    - Verify all text translates correctly
    - Verify hormone abbreviations remain unchanged
    - Verify chemical formulas remain in international notation
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5, 20.6, 20.7_
  
  - [ ] 27.5 Verify visualization completeness
    - Test hormone pathway visualization shows all components
    - Test feedback loop visualization uses correct colors
    - Test gland anatomy visualization shows all glands
    - Test clinical data visualization displays lab results
    - Test all visualizations work in all three languages
    - _Requirements: 23.1, 23.2, 23.3, 23.4, 23.5, 24.1, 24.2, 24.3, 24.4, 24.5, 24.6, 24.7, 25.1, 25.2, 25.3, 25.4, 25.5, 25.6, 25.7, 26.1, 26.2, 26.3, 26.4_

- [ ] 28. Final checkpoint - Complete module verification
  - Ensure all tests pass, ask the user if questions arise.


## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties (minimum 100 iterations each)
- Unit tests validate specific examples and edge cases
- Integration tests validate end-to-end flows and component interactions
- Browser testing ensures cross-platform compatibility
- The module includes 60 total quests: 3 stages × 4 difficulties × 5 quests
- All hormone notation uses react-katex with InlineMath component
- All scenarios include Basel-specific contexts (Novartis, Roche, Basel University Hospital)
- ELITE difficulty includes authentic pharmaceutical hormone products from Basel industry

## Testing Configuration

**Property-Based Testing**:
- Library: fast-check (TypeScript)
- Minimum iterations: 100 per test
- Tag format: `// Feature: gb2-02-endocrine-system, Property N: [description]`
- Total property tests: 40 (covering hormone classification, gland mapping, feedback loops, clinical diagnosis, translations, navigation, accessibility, visualizations)

**Unit Testing**:
- Framework: Jest with React Testing Library
- Coverage target: 80% for core logic
- Focus on classification functions, verification logic, and edge cases
- Test all hormone types, glands, and feedback mechanisms
- Test all difficulty levels and stages

**Integration Testing**:
- Framework: Jest with React Testing Library
- Test complete user flows (load → answer → verify → next)
- Test component interactions (quest state → visualization updates)
- Test language switching across all components
- Test stage and difficulty navigation
- Test clinical case interactions

**Browser Testing**:
- Manual testing in Chrome, Firefox, Safari
- Mobile testing on iOS Safari and Android Chrome
- Verify LaTeX rendering in all browsers
- Verify animations perform smoothly
- Verify no console errors or warnings
- Test responsive layout at 768px breakpoint
- Test gland anatomy clickability

**Performance Targets**:
- Initial page load: < 2 seconds
- Quest transition: < 200ms
- Visualization render: < 300ms
- Animation frame rate: 60fps
- Language switch: < 500ms

## Quest Data Summary

**Hormone Identification Stage** (20 quests):
- BASIC: 5 quests with simple hormone type classification and gland identification
- CORE: 5 quests with hormone function matching and target organ identification
- ADVANCED: 5 quests with hypothalamic-pituitary axis and complex interactions
- ELITE: 5 quests with pharmaceutical hormone applications from Novartis/Roche Basel

**Feedback Mechanisms Stage** (20 quests):
- BASIC: 5 quests with simple negative feedback (blood glucose regulation)
- CORE: 5 quests with thyroid hormone regulation and water balance
- ADVANCED: 5 quests with positive feedback, HPA axis, and calcium homeostasis
- ELITE: 5 quests with multi-hormone interactions and pharmaceutical interventions

**Clinical Applications Stage** (20 quests):
- BASIC: 5 quests with simple disorder identification from symptoms
- CORE: 5 quests with diabetes type differentiation and thyroid disorders
- ADVANCED: 5 quests with hormone level interpretation and growth disorders
- ELITE: 5 quests with complex multi-hormone disorders and pharmaceutical treatments

**Total**: 60 quests with Basel-specific scenarios in three languages (EN/CN/DE)

## Visualization Summary

**Hormone Pathway Visualization**:
- Displays endocrine gland → bloodstream → target organ → physiological effect
- Color coding: glands (purple), bloodstream (blue), target organs (orange), effects (green)
- Animated hormone flow
- Hover tooltips for detailed information

**Feedback Loop Visualization**:
- Complete feedback loop diagram with all components
- Green arrows for stimulatory pathways
- Red arrows for inhibitory pathways
- Set point and deviation indicators
- Animated feedback signal flow
- Highlights negative vs positive feedback

**Gland Anatomy Visualization**:
- Human body outline with all major endocrine glands
- Clickable glands showing hormones and functions
- Zoom controls for detailed view
- Labels in selected language
- Anatomically accurate positioning and colors

**Clinical Data Visualization**:
- Lab result charts with hormone levels
- Reference ranges with color-coded indicators
- Trend graphs for hormone levels over time
- Patient information and symptoms
- Diagnostic reasoning support
