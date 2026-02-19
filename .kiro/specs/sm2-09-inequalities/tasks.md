# Implementation Plan: SM2.09 - Inequalities Module

## Overview

This implementation plan breaks down the SM2.09 Inequalities module into discrete coding tasks. The module teaches inequality concepts through interactive visualizations and Basel-specific scenarios, supporting three languages (EN/CN/DE) and following the Chamber Module Standards. The implementation follows an incremental approach, building core functionality first, then adding visualizations, and finally integrating testing.

## Tasks

- [x] 1. Set up project structure and core types
  - Create directory structure: `src/modules/sm2-09-inequalities/`
  - Define TypeScript interfaces for SM209Quest, Interval, SolutionStep, InequalityType, SolutionType
  - Define types for quest pool generation and validation
  - Set up i18n translation files for EN, CN, DE
  - _Requirements: 1.7, 6.1_

- [-] 2. Implement quest data models and generation
  - [x] 2.1 Create quest data arrays for all stages and difficulties
    - Implement INEQUALITY_BASICS data (20 quests: 8 BASIC, 5 CORE, 4 ADVANCED, 3 ELITE)
    - Implement SYSTEMS data (26 quests: 7 BASIC, 9 CORE, 7 ADVANCED, 3 ELITE)
    - Implement ABSOLUTE_VALUE data (29 quests: 5 BASIC, 11 CORE, 9 ADVANCED, 4 ELITE)
    - Ensure total quest count equals 75
    - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4_

  - [ ]* 2.2 Write property test for quest distribution
    - **Property 1: Quest Distribution Correctness**
    - **Validates: Requirements 1.1, 1.2**

  - [ ] 2.3 Implement buildStagePool function
    - Accept parameters: translations, difficulty, stage
    - Filter quests by difficulty and stage
    - Map data to SM209Quest objects
    - Calculate solution sets for each quest
    - Return array of quests
    - _Requirements: 1.4, 1.5, 1.6_

  - [ ]* 2.4 Write property test for quest assignment uniqueness
    - **Property 2: Quest Assignment Uniqueness**
    - **Validates: Requirements 1.7**

- [x] 3. Implement inequality solving algorithms
  - [x] 3.1 Create linear inequality solver
    - Parse inequality expression (ax + b < c)
    - Solve for variable x
    - Generate solution interval
    - Generate step-by-step solution with justifications
    - Mark steps that reverse inequality direction
    - _Requirements: 2.2, 2.6_

  - [ ]* 3.2 Write property test for inequality direction reversal
    - **Property 3: Inequality Direction Reversal Marking**
    - **Validates: Requirements 2.6, 4.3**

  - [x] 3.3 Create absolute value inequality solver
    - Parse absolute value expression (|f(x)| < a)
    - Split into two cases for < inequalities
    - Split into disjunction for > inequalities
    - Generate solution intervals
    - Generate step-by-step solution showing case splitting
    - _Requirements: 2.4, 14.1, 14.2, 14.3, 14.4_

  - [ ]* 3.4 Write property test for absolute value case splitting
    - **Property 16: Absolute Value Case Splitting**
    - **Validates: Requirements 14.2, 14.3, 14.4**

  - [x] 3.5 Create system of inequalities solver
    - Parse multiple inequality expressions
    - Calculate intersection of solution sets
    - Determine if solution is empty, bounded, or unbounded
    - Generate graphical representation data
    - _Requirements: 2.3, 2.7_

- [x] 4. Checkpoint - Ensure solving algorithms work correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement answer validation system
  - [x] 5.1 Create interval notation parser
    - Parse formats: "(-∞, 5]", "[2, 10)", "(-∞, -3] ∪ [3, ∞)"
    - Handle various spacing and infinity representations
    - Convert to internal Interval representation
    - _Requirements: 10.2_

  - [ ]* 5.2 Write property test for interval notation equivalence
    - **Property 8: Interval Notation Equivalence**
    - **Validates: Requirements 10.2**

  - [x] 5.3 Create solution set validator
    - Compare submitted answer to expected solution
    - Accept multiple equivalent representations (interval, set-builder, inequality)
    - Return validation result with specific error feedback
    - _Requirements: 10.1, 10.3, 10.4, 10.5_

  - [ ]* 5.4 Write property test for solution set validation
    - **Property 9: Solution Set Validation Correctness**
    - **Validates: Requirements 10.1, 10.5**

- [x] 6. Implement visualization components
  - [x] 6.1 Create NumberLineVisualizer component
    - Render horizontal number line with scale
    - Display solution intervals with shaded regions
    - Render boundary points as filled/open circles based on inclusivity
    - Implement draggable boundary points
    - Update inequality expression on drag
    - Display interval notation below number line
    - _Requirements: 3.1, 3.2, 13.1, 13.2, 13.3, 13.4, 13.5, 13.6_

  - [ ]* 6.2 Write property test for boundary point rendering
    - **Property 13: Boundary Point Rendering Consistency**
    - **Validates: Requirements 13.4, 13.5**

  - [ ]* 6.3 Write property test for visualization reactivity
    - **Property 14: Visualization Reactivity**
    - **Validates: Requirements 3.7, 13.6**

  - [x] 6.4 Create GraphPlotter component
    - Render coordinate system with x and y axes
    - Render boundary lines (solid for ≤/≥, dashed for </> )
    - Shade solution regions using semi-transparent fill
    - Support multiple inequalities simultaneously
    - Highlight intersection regions for systems
    - Display legend for multiple inequalities
    - _Requirements: 3.3, 3.4, 12.1, 12.2, 12.3, 12.4, 12.5, 12.6_

  - [ ]* 6.5 Write property test for boundary line rendering
    - **Property 12: Boundary Line Rendering Consistency**
    - **Validates: Requirements 12.3, 12.4, 12.5**

  - [ ]* 6.6 Write property test for system intersection shading
    - **Property 15: System Intersection Shading**
    - **Validates: Requirements 12.2, 15.2**

  - [x] 6.7 Create SolutionSetVisualizer component
    - Display solution in interval notation
    - Display solution in set-builder notation
    - Display graphical representation (number line or coordinate plane)
    - Handle empty set (∅) and all real numbers (ℝ)
    - Support compound inequalities and disjunctions
    - _Requirements: 3.5, 15.5, 19_

  - [x] 6.8 Create InequalityVisualization container component
    - Integrate NumberLineVisualizer, GraphPlotter, SolutionSetVisualizer
    - Route to appropriate visualizer based on quest type
    - Pass quest data and interaction handlers
    - _Requirements: 3.6_

- [x] 7. Implement step-by-step solver component
  - [x] 7.1 Create StepBySolver component
    - Display solution steps with step numbers
    - Show algebraic expression at each step using LaTeX
    - Display justification for each step
    - Highlight steps that reverse inequality direction in red
    - Display final solution in interval notation and on number line
    - Toggle visibility with "Show Steps" / "Hide Steps" button
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [ ]* 7.2 Write property test for step justification completeness
    - **Property 4: Step Justification Completeness**
    - **Validates: Requirements 4.2, 4.4**

- [x] 8. Implement Basel-specific scenarios
  - [x] 8.1 Create Basel scenario data
    - Write Basel tram ticket pricing scenario (150-250 words)
    - Write Roche pharmaceutical dosage scenario (150-250 words)
    - Write Basel Marathon qualification scenario (150-250 words)
    - Write University Basel admission scenario (150-250 words)
    - Translate all scenarios to CN and DE
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [ ]* 8.2 Write property test for Basel scenario word count
    - **Property 5: Basel Scenario Word Count**
    - **Validates: Requirements 5.6**

  - [x] 8.3 Integrate scenarios into quest data
    - Link scenarios to appropriate quests
    - Display scenario context in quest UI
    - Ensure scenarios are contextually relevant to quest content
    - _Requirements: 5.7_

- [x] 9. Implement translation and internationalization
  - [x] 9.1 Create translation files for all UI text
    - Create EN translation file with all keys
    - Create CN translation file with all keys (不等式, 解集, 数轴, etc.)
    - Create DE translation file with all keys (Ungleichung, Lösungsmenge, Zahlenstrahl, etc.)
    - Include quest text, instructions, button labels, feedback messages
    - _Requirements: 6.1, 6.2_

  - [ ]* 9.2 Write property test for translation completeness
    - **Property 6: Translation Completeness**
    - **Validates: Requirements 6.2, 6.4**

  - [x] 9.3 Implement language switching logic
    - Create language selector component
    - Update i18n context on language change
    - Preserve quest progress and state during language switch
    - Persist language preference in localStorage
    - _Requirements: 6.3_

  - [ ]* 9.4 Write property test for language switch state preservation
    - **Property 11: Language Switch State Preservation**
    - **Validates: Requirements 6.3**

  - [x] 9.5 Ensure LaTeX consistency across languages
    - Verify mathematical expressions use identical LaTeX across all languages
    - Test that inequality symbols render correctly in all languages
    - _Requirements: 6.5, 6.6_

  - [ ]* 9.6 Write property test for LaTeX mathematical consistency
    - **Property 7: LaTeX Mathematical Consistency**
    - **Validates: Requirements 6.5, 8.1**

- [x] 10. Checkpoint - Ensure visualizations and translations work
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Implement main page component and layout
  - [x] 11.1 Create SM209Inequalities page component
    - Initialize useQuestManager hook
    - Implement buildStagePool function calls
    - Handle difficulty and stage changes
    - Manage step-by-step solver visibility state
    - Pass data to child components
    - _Requirements: 7.1, 7.2_

  - [x] 11.2 Integrate ChamberLayout component
    - Set up two-column layout (quest content left, visualization right)
    - Add header with title and language selector
    - Add difficulty selector (BASIC/CORE/ADVANCED/ELITE)
    - Add stage selector (INEQUALITY_BASICS/SYSTEMS/ABSOLUTE_VALUE)
    - Add footer with Verify/Next/Show Steps buttons
    - Ensure responsive design for mobile and desktop
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 9.1, 9.2, 9.3_

  - [x] 11.3 Implement quest display logic
    - Display scenario description
    - Display quest prompt with LaTeX
    - Display input fields for answers
    - Display feedback after verification
    - Handle quest navigation (Next button)
    - _Requirements: 10.3, 10.4_

- [x] 12. Implement progress tracking system
  - [x] 12.1 Create progress state management
    - Track completion status for all 75 quests
    - Persist completion state to localStorage
    - Display progress indicators per stage
    - Display progress indicators per difficulty
    - Restore progress state on page load
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

  - [ ]* 12.2 Write property test for progress state persistence
    - **Property 10: Progress State Persistence**
    - **Validates: Requirements 11.2, 11.5**

- [x] 13. Implement LaTeX rendering
  - [x] 13.1 Set up react-katex for LaTeX rendering
    - Install and configure react-katex
    - Create LaTeX wrapper component
    - Ensure proper escaping and syntax
    - _Requirements: 8.1_

  - [x] 13.2 Implement LaTeX for all mathematical expressions
    - Render inequality symbols: <, >, ≤, ≥, ≠
    - Render absolute value bars: |x|
    - Render fractions, exponents, subscripts
    - Ensure readability on mobile devices
    - _Requirements: 8.2, 8.3, 8.4, 8.5_

  - [ ]* 13.3 Write property test for LaTeX symbol support
    - **Property 18: LaTeX Symbol Support**
    - **Validates: Requirements 8.2, 8.3**

- [x] 14. Implement responsive design and accessibility
  - [x] 14.1 Implement responsive layout breakpoints
    - Single-column layout for width < 768px
    - Multi-column layout for width ≥ 768px
    - Test on mobile, tablet, and desktop viewports
    - _Requirements: 9.1, 9.2, 9.3_

  - [x] 14.2 Ensure touch target sizes for mobile
    - Set minimum touch target size to 44x44 pixels
    - Test all interactive elements on mobile
    - _Requirements: 9.4, 9.5_

  - [ ]* 14.3 Write property test for touch target minimum size
    - **Property 17: Touch Target Minimum Size**
    - **Validates: Requirements 9.4**

- [x] 15. Implement error handling
  - [x] 15.1 Add input validation error handling
    - Handle invalid interval notation
    - Handle empty input
    - Handle ambiguous notation
    - Display helpful error messages
    - _Requirements: 10.3_

  - [x] 15.2 Add quest loading error handling
    - Handle missing quest data
    - Handle invalid quest structure
    - Handle solution calculation errors
    - Display loading states and fallbacks
    - _Requirements: 1.1_

  - [x] 15.3 Add visualization error handling
    - Handle missing quest properties
    - Handle rendering failures
    - Handle drag interaction failures
    - Display fallback visualizations
    - _Requirements: 3.1, 3.3, 3.5_

  - [x] 15.4 Add translation error handling
    - Handle missing translation keys
    - Handle language switch failures
    - Handle LaTeX rendering errors
    - Display English fallback text
    - _Requirements: 6.2_

- [x] 16. Integration and wiring
  - [x] 16.1 Wire all components together
    - Connect quest manager to page component
    - Connect visualizations to quest data
    - Connect step-by-step solver to quest data
    - Connect validation system to user input
    - Connect progress tracking to quest completion
    - _Requirements: All_

  - [ ]* 16.2 Write integration tests
    - Test end-to-end quest flow
    - Test visualization synchronization
    - Test step-by-step solver
    - Test language switching
    - Test Basel scenarios
    - _Requirements: All_

- [x] 17. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- Total quest count must equal 75 (20 BASIC + 25 CORE + 20 ADVANCED + 10 ELITE)
- All Basel scenarios must be 150-250 words
- All UI text must be translated to EN, CN, DE
- All mathematical expressions must use LaTeX rendering
- Responsive design must work on mobile (< 768px) and desktop (≥ 768px)
