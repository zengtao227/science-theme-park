# Implementation Plan: Cross-Disciplinary ELITE Questions Phase 1

## Overview

This implementation adds 10 competition-level ELITE difficulty questions that integrate vector mathematics with force mechanics. The questions are distributed across GM2.01 (Vectors) and SP3.02 (Newton's Laws), with authentic Basel scenarios and three-language support (EN/CN/DE). All implementation will be done in TypeScript following existing quest data structures.

## Tasks

- [x] 1. Create GM2.01 ELITE quest data with physics integration
  - [x] 1.1 Add 2 NAVIGATION ELITE questions with force vector concepts
    - Design questions incorporating force vector decomposition
    - Calculate expected answers (magnitudes) with 2 decimal precision
    - Assign quest IDs N_E6 and N_E7
    - Add to navigationDataElite array in src/app/chamber/gm2-01/page.tsx
    - Include Basel scenarios (Rhine bridge, Basel tram)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 6.1, 6.2, 6.3_
  
  - [x] 1.2 Add 2 DOT ELITE questions with work/energy concepts
    - Design questions using force · displacement for work calculations
    - Calculate expected dot product answers with 2 decimal precision
    - Assign quest IDs D_E6 and D_E7
    - Add to dotDataElite array in src/app/chamber/gm2-01/page.tsx
    - Include Basel scenarios (Roche Tower, Basel Port)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 6.1, 6.2, 6.3_
  
  - [x] 1.3 Add 1 MISSION ELITE question with combined force analysis
    - Design question combining vector operations with force mechanics
    - Calculate expected answers (components, dot product, magnitude) with 2 decimal precision
    - Assign quest ID M_E6
    - Add to missionDataElite array in src/app/chamber/gm2-01/page.tsx
    - Include Basel scenario (University Hospital drone delivery)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 6.1, 6.2, 6.3_

- [x] 2. Create SP3.02 ELITE quest data with vector mathematics integration
  - [x] 2.1 Add 2 NEWTON_1 ELITE questions with 3D vector equilibrium
    - Design questions incorporating 3D force vector analysis and equilibrium
    - Calculate expected force answers with 2 decimal precision
    - Assign quest IDs Q6 and Q7
    - Add to QUEST_DATA.NEWTON_1.ELITE array in src/app/chamber/sp3-02/page.tsx
    - Include Basel scenarios (Rhine bridge forces, Basel tram)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 6.1, 6.2, 6.3_
  
  - [x] 2.2 Add 2 NEWTON_2 ELITE questions with vector force decomposition
    - Design questions using F=ma with 3D vector components
    - Calculate expected acceleration/force answers with 2 decimal precision
    - Assign quest IDs Q6 and Q7
    - Add to QUEST_DATA.NEWTON_2.ELITE array in src/app/chamber/sp3-02/page.tsx
    - Include Basel scenarios (Roche Tower structural analysis, Basel Port crane)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 6.1, 6.2, 6.3_
  
  - [x] 2.3 Add 1 FRICTION ELITE question with 3D vector friction analysis
    - Design question with friction forces on inclined planes using vector decomposition
    - Calculate expected friction force answer with 2 decimal precision
    - Assign quest ID Q6
    - Add to QUEST_DATA.FRICTION.ELITE array in src/app/chamber/sp3-02/page.tsx
    - Include Basel scenario (University Hospital equipment)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 6.1, 6.2, 6.3_

- [x] 3. Checkpoint - Verify quest data structure and calculations
  - Ensure all quest data follows TypeScript interfaces correctly
  - Verify all expected answers calculated with 2 decimal precision
  - Confirm all Basel scenarios are authentic and realistic
  - Ask the user if questions arise

- [x] 4. Create three-language translations for all scenarios
  - [x] 4.1 Add English translations for GM2.01 scenarios
    - Add 5 scenario descriptions to src/lib/i18n/en/math.ts under gm2_01.scenarios
    - Use proper LaTeX escape sequences (\\\\\\\\vec{}, \\\\\\\\cdot, \\\\\\\\theta)
    - Include Rhine bridge, Basel tram, Roche Tower, Basel Port, University Hospital contexts
    - _Requirements: 3.1, 3.5, 4.1, 4.2, 4.3, 4.4, 7.1, 7.2_
  
  - [x] 4.2 Add English translations for SP3.02 scenarios
    - Add 5 prompt descriptions to src/lib/i18n/en/physics.ts under sp3_02.prompts
    - Add 5 hint descriptions to src/lib/i18n/en/physics.ts under sp3_02.hints
    - Use proper LaTeX escape sequences for force notation (\\\\\\\\vec{F}, \\\\\\\\mu)
    - Include Basel scenarios matching GM2.01 contexts
    - _Requirements: 3.1, 3.5, 4.1, 4.2, 4.3, 4.4, 6.5, 7.1, 7.2_
  
  - [x] 4.3 Add Chinese translations for all scenarios
    - Translate GM2.01 scenarios to Chinese in src/lib/i18n/cn/math.ts
    - Translate SP3.02 prompts and hints to Chinese in src/lib/i18n/cn/physics.ts
    - Keep LaTeX notation identical to English version
    - Appropriately translate/transliterate Basel landmark names
    - _Requirements: 3.2, 3.5, 7.1, 7.3_
  
  - [x] 4.4 Add German translations for all scenarios
    - Translate GM2.01 scenarios to German in src/lib/i18n/de/math.ts
    - Translate SP3.02 prompts and hints to German in src/lib/i18n/de/physics.ts
    - Keep LaTeX notation identical to English version
    - Use correct German names for Basel landmarks
    - _Requirements: 3.3, 3.5, 7.1, 7.3_

- [x] 5. Checkpoint - Verify translations and LaTeX rendering
  - Ensure all translation keys exist in all three languages
  - Verify LaTeX notation is consistent across languages
  - Test LaTeX rendering in development environment
  - Ask the user if questions arise

- [ ]* 6. Write property-based tests for correctness properties
  - [ ]* 6.1 Set up property test infrastructure
    - Create test file: tests/cross-disciplinary-elite-questions.property.test.ts
    - Import fast-check library and quest data from both modules
    - Configure tests with minimum 100 iterations
    - _Requirements: 8.1, 8.2, 8.3_
  
  - [ ]* 6.2 Write Property 1 test: Quest Data Completeness
    - **Property 1: Quest Data Completeness**
    - **Validates: Requirements 1.1, 1.3, 2.1, 2.3**
    - Verify 5 ELITE questions per module, at least 1 per stage
  
  - [ ]* 6.3 Write Property 2 test: Answer Precision Consistency
    - **Property 2: Answer Precision Consistency**
    - **Validates: Requirements 1.5, 2.5, 9.1**
    - Verify all expected answers have exactly 2 decimal places
  
  - [ ]* 6.4 Write Property 3 test: Basel Scenario Authenticity
    - **Property 3: Basel Scenario Authenticity**
    - **Validates: Requirements 1.4, 2.4, 7.1, 7.3**
    - Verify all scenarios reference authentic Basel landmarks
  
  - [ ]* 6.5 Write Property 4 test: Translation Completeness
    - **Property 4: Translation Completeness**
    - **Validates: Requirements 3.1, 3.2, 3.3, 3.5**
    - Verify translation keys exist in EN, CN, DE with consistent LaTeX
  
  - [ ]* 6.6 Write Property 5 test: LaTeX Syntax Correctness
    - **Property 5: LaTeX Syntax Correctness**
    - **Validates: Requirements 4.1, 4.2, 4.3, 4.4**
    - Verify proper escape sequences and mathematical notation
  
  - [ ]* 6.7 Write Property 6 test: LaTeX Rendering Success
    - **Property 6: LaTeX Rendering Success**
    - **Validates: Requirements 4.5, 8.5**
    - Verify KaTeX renders all expressions without errors
  
  - [ ]* 6.8 Write Property 7 test: Quest ID Uniqueness and Format
    - **Property 7: Quest ID Uniqueness and Format**
    - **Validates: Requirements 5.5**
    - Verify unique IDs following naming conventions
  
  - [ ]* 6.9 Write Property 8 test: Decimal Parameter Inclusion
    - **Property 8: Decimal Parameter Inclusion**
    - **Validates: Requirements 6.3**
    - Verify at least one non-integer parameter per question
  
  - [ ]* 6.10 Write Property 9 test: Answer Validation Tolerance
    - **Property 9: Answer Validation Tolerance**
    - **Validates: Requirements 9.2, 9.3**
    - Verify validation accepts answers within ±0.01 tolerance
  
  - [ ]* 6.11 Write Property 10 test: Expected Answer Presence
    - **Property 10: Expected Answer Presence**
    - **Validates: Requirements 9.5**
    - Verify all quests include non-null expected answers

- [ ]* 7. Write unit tests for specific examples
  - [ ]* 7.1 Create GM2.01 unit tests
    - Create test file: tests/gm2-01-elite-questions.test.ts
    - Test: Verify 5 new ELITE questions added across all stages
    - Test: Verify at least 1 question per stage
    - Test: Verify quest IDs follow N_E[6-10], D_E[6-10], M_E[6-10] pattern
    - Test: Verify vector magnitude calculation for specific example
    - Test: Verify dot product calculation for specific example
    - _Requirements: 1.1, 1.3, 5.5, 8.1, 8.2_
  
  - [ ]* 7.2 Create SP3.02 unit tests
    - Create test file: tests/sp3-02-elite-questions.test.ts
    - Test: Verify 5 new ELITE questions added across all stages
    - Test: Verify at least 1 question per stage
    - Test: Verify quest IDs follow Q[6-10] pattern
    - Test: Verify force calculation for specific example
    - Test: Verify friction calculation for specific example
    - _Requirements: 2.1, 2.3, 5.5, 8.1, 8.2_
  
  - [ ]* 7.3 Create translation unit tests
    - Create test file: tests/elite-questions-translations.test.ts
    - Test: Verify all English translation keys exist
    - Test: Verify all Chinese translation keys exist
    - Test: Verify all German translation keys exist
    - Test: Verify LaTeX notation consistency across languages
    - _Requirements: 3.1, 3.2, 3.3, 3.5, 8.1, 8.2_
  
  - [ ]* 7.4 Create integration tests
    - Create test file: tests/elite-questions-integration.test.ts
    - Test: Verify quest manager loads ELITE questions correctly
    - Test: Verify answer validation accepts correct answers
    - Test: Verify LaTeX rendering displays without errors
    - Test: Verify language switching updates displayed text
    - _Requirements: 3.4, 5.1, 5.2, 8.1, 8.2, 8.5_

- [-] 8. Verify TypeScript compilation and build
  - [x] 8.1 Run TypeScript type checking
    - Run: npm run type-check
    - Verify no type errors in GM2.01 quest data
    - Verify no type errors in SP3.02 quest data
    - Verify no type errors in translation files
    - _Requirements: 5.1, 5.2, 5.4, 8.1, 8.4_
  
  - [x] 8.2 Build application and verify success
    - Run: npm run build
    - Verify build completes successfully
    - Verify no warnings related to new quest data
    - Verify bundle size increase is minimal (<10KB)
    - _Requirements: 8.1, 8.3_
  
  - [ ]* 8.3 Run test suite
    - Run: npm test
    - Verify all property-based tests pass
    - Verify all unit tests pass
    - Verify all integration tests pass
    - Verify existing tests still pass
    - _Requirements: 8.2_

- [x] 9. Final checkpoint - Ensure all tests pass and application builds
  - Verify TypeScript compilation successful
  - Verify build completes without errors
  - Verify all automated tests pass
  - Ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- All implementation uses TypeScript following existing quest data structures
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties across all questions
- Unit tests validate specific examples and edge cases
- All 10 questions incorporate authentic Basel scenarios for local relevance
- Three-language support (EN/CN/DE) maintained throughout

