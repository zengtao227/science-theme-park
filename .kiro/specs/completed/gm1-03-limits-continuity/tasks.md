# Implementation Plan: GM1.03 - Limits & Continuity Module

## Overview

This implementation plan breaks down the GM1.03 module into discrete coding tasks that build incrementally. The module follows the Chamber Module Standards with a mixed-mode interface (left: quests, right: visualizations), three stages (LIMIT_BASICS, LIMIT_OPERATIONS, CONTINUITY), four difficulty levels (BASIC, CORE, ADVANCED, ELITE), and 60 total quests with Basel-themed scenarios in three languages (EN/CN/DE).

## Tasks

- [x] 1. Set up project structure and core interfaces
  - Create directory `src/app/chamber/gm1-03/`
  - Create directory `src/components/chamber/gm1-03/`
  - Define TypeScript interfaces for GM103Quest, Stage, and quest data structures
  - Set up testing framework configuration for property-based tests
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

- [x] 2. Implement quest data and generation system
  - [x] 2.1 Create quest data arrays for LIMIT_BASICS stage
    - Define 20 quest data items (5 per difficulty: BASIC, CORE, ADVANCED, ELITE)
    - Include function expressions, limit points, and expected answers
    - Cover direct substitution, factoring, limits at infinity, and one-sided limits
    - _Requirements: 1.2, 2.1, 2.2, 2.3, 2.4, 2.5, 8.1_
  
  - [x] 2.2 Create quest data arrays for LIMIT_OPERATIONS stage
    - Define 20 quest data items (5 per difficulty)
    - Include sum, product, quotient, and composition operations
    - Cover L'Hôpital's rule applications for ELITE difficulty
    - _Requirements: 1.3, 2.1, 2.2, 2.3, 2.4, 2.5, 8.2_
  
  - [x] 2.3 Create quest data arrays for CONTINUITY stage
    - Define 20 quest data items (5 per difficulty)
    - Include continuous functions, removable, jump, and infinite discontinuities
    - _Requirements: 1.4, 2.1, 2.2, 2.3, 2.4, 2.5, 8.3, 8.4_
  
  - [x] 2.4 Implement buildStagePool function
    - Accept difficulty, stage, and translations as parameters
    - Select appropriate data array based on difficulty and stage
    - Map data to GM103Quest objects with LaTeX formatting
    - Calculate expected answers using limit rules
    - Return array of exactly 5 quests
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 9.1, 9.2, 9.3_
  
  - [ ]* 2.5 Write property test for quest pool size
    - **Property 19: Quest pool size per difficulty**
    - **Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5**
  
  - [ ]* 2.6 Write property test for quest ID uniqueness
    - **Property 7: Quest ID uniqueness**
    - **Validates: Requirements 9.1**

- [x] 3. Implement limit calculation functions
  - [x] 3.1 Implement direct substitution limit calculator
    - Evaluate f(x) at limit point for continuous functions
    - Handle polynomial and rational functions
    - Return calculated limit value
    - _Requirements: 8.1, 8.2_
  
  - [x] 3.2 Implement limit arithmetic operations
    - Implement sum rule: lim[f + g] = lim f + lim g
    - Implement product rule: lim[f · g] = lim f · lim g
    - Implement quotient rule: lim[f / g] = lim f / lim g (when lim g ≠ 0)
    - _Requirements: 8.2_
  
  - [x] 3.3 Implement one-sided limit calculator
    - Calculate left-hand limit lim(x→a⁻) f(x)
    - Calculate right-hand limit lim(x→a⁺) f(x)
    - Determine if two-sided limit exists
    - _Requirements: 8.1_
  
  - [ ]* 3.4 Write property test for direct substitution correctness
    - **Property 12: Direct substitution limit correctness**
    - **Validates: Requirements 8.1, 8.2**
  
  - [ ]* 3.5 Write property test for limit sum rule
    - **Property 13: Limit sum rule correctness**
    - **Validates: Requirements 8.2**
  
  - [ ]* 3.6 Write property test for limit product rule
    - **Property 14: Limit product rule correctness**
    - **Validates: Requirements 8.2**
  
  - [ ]* 3.7 Write property test for limit quotient rule
    - **Property 15: Limit quotient rule correctness**
    - **Validates: Requirements 8.2**
  
  - [ ]* 3.8 Write property test for one-sided limit consistency
    - **Property 20: One-sided limit consistency**
    - **Validates: Requirements 8.1**

- [x] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement continuity detection system
  - [x] 5.1 Implement continuity checker function
    - Check if lim(x→a) f(x) exists
    - Check if f(a) is defined
    - Check if lim(x→a) f(x) = f(a)
    - Return boolean indicating continuity
    - _Requirements: 8.3_
  
  - [x] 5.2 Implement discontinuity classifier
    - Detect removable discontinuity: limit exists but f(a) undefined or different
    - Detect jump discontinuity: left and right limits exist but differ
    - Detect infinite discontinuity: at least one one-sided limit is infinite
    - Return discontinuity type string
    - _Requirements: 8.4_
  
  - [ ]* 5.3 Write property test for continuity detection
    - **Property 4: Continuity detection correctness**
    - **Validates: Requirements 4.7**
  
  - [ ]* 5.4 Write property test for removable discontinuity detection
    - **Property 16: Removable discontinuity detection**
    - **Validates: Requirements 8.4**
  
  - [ ]* 5.5 Write property test for jump discontinuity detection
    - **Property 17: Jump discontinuity detection**
    - **Validates: Requirements 8.4**
  
  - [ ]* 5.6 Write property test for infinite discontinuity detection
    - **Property 18: Infinite discontinuity detection**
    - **Validates: Requirements 8.4**

- [x] 6. Implement internationalization (i18n)
  - [x] 6.1 Add English translations to src/lib/i18n.ts
    - Add gm1_03 section with title, difficulty labels, stage names
    - Add 3-4 Basel scenarios (150-250 words each): tram speed, Rhine water level, Roche concentration, Basel enrollment
    - Add UI labels: check, next, correct, incorrect, instructions
    - Ensure all LaTeX formulas use double backslashes
    - _Requirements: 6.1, 6.2, 7.1, 7.2, 7.3, 7.4_
  
  - [x] 6.2 Add Chinese translations to src/lib/i18n.ts
    - Translate all gm1_03 content to Chinese
    - Translate difficulty labels: 基础/核心/进阶/精英
    - Translate all Basel scenarios to Chinese
    - Ensure LaTeX formulas remain identical to English version
    - _Requirements: 6.1, 6.3, 7.1, 7.2, 7.3, 7.4_
  
  - [x] 6.3 Add German translations to src/lib/i18n.ts
    - Translate all gm1_03 content to German
    - Translate difficulty labels: BASIS/KERN/ERWEITERT/ELITE
    - Translate all Basel scenarios to German
    - Ensure LaTeX formulas remain identical to English version
    - _Requirements: 6.1, 6.4, 7.1, 7.2, 7.3, 7.4_
  
  - [ ]* 6.4 Write property test for translation completeness
    - **Property 5: Translation completeness**
    - **Validates: Requirements 6.2, 6.3, 6.4**
  
  - [ ]* 6.5 Write property test for LaTeX consistency
    - **Property 6: LaTeX consistency across languages**
    - **Validates: Requirements 6.6**
  
  - [ ]* 6.6 Write property test for scenario word count
    - **Property 1: Scenario word count range**
    - **Validates: Requirements 3.2**

- [x] 7. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Implement visualization components
  - [x] 8.1 Create LimitVisualizer component
    - Render 2D canvas with coordinate axes
    - Plot function curve using provided expression
    - Animate point approaching limit value
    - Display x → a and f(x) → L annotations
    - Implement epsilon-delta visualization for ELITE difficulty
    - Use react-katex for all mathematical notation
    - _Requirements: 4.1, 4.2, 4.5, 5.1, 5.2, 5.3, 5.4, 5.5_
  
  - [x] 8.2 Create GraphPlotter component
    - Render function graph with accurate y-values for all x-values
    - Display grid and axis labels
    - Highlight limit point with marker
    - Support multiple functions for LIMIT_OPERATIONS stage
    - Implement zoom and pan controls
    - _Requirements: 4.1, 4.3, 4.6, 5.1, 5.2, 5.3, 5.4, 5.5_
  
  - [x] 8.3 Create ContinuityChecker component
    - Display function graph with discontinuity markers
    - Color-code discontinuity types: green (removable), yellow (jump), red (infinite)
    - Show left and right limit values at discontinuity points
    - Animate trace showing approach from both sides
    - Display continuity status indicator
    - _Requirements: 4.1, 4.4, 4.7, 5.1, 5.2, 5.3, 5.4, 5.5_
  
  - [x] 8.4 Create LimitsContinuityVisualization wrapper component
    - Accept quest and stage as props
    - Render appropriate visualization based on stage
    - LIMIT_BASICS → LimitVisualizer
    - LIMIT_OPERATIONS → GraphPlotter with multiple functions
    - CONTINUITY → ContinuityChecker
    - Pass quest data to child components
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 5.1, 5.2, 5.3_
  
  - [ ]* 8.5 Write property test for graph plotting accuracy
    - **Property 3: Graph plotting accuracy**
    - **Validates: Requirements 4.6**
  
  - [ ]* 8.6 Write property test for visualization real-time update
    - **Property 2: Visualization real-time update**
    - **Validates: Requirements 4.5**

- [x] 9. Implement main page component
  - [x] 9.1 Create GM103LimitsContinuity page component
    - Import ChamberLayout and useQuestManager
    - Initialize useQuestManager with buildStagePool function
    - Set initial difficulty to BASIC and stage to LIMIT_BASICS
    - Implement handleDifficultyChange and handleStageChange
    - Pass translations from i18n to all components
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_
  
  - [x] 9.2 Integrate ChamberLayout component
    - Pass module title: "GM1.03 // LIMITS & CONTINUITY // 函数极限与连续性"
    - Pass moduleCode: "GM1.03"
    - Configure difficulty selector with 4 levels
    - Configure stage selector with 3 stages
    - Pass verify and next handlers from useQuestManager
    - Pass translations for all UI elements
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 10.1, 10.2, 10.3, 10.4_
  
  - [x] 9.3 Integrate LimitsContinuityVisualization in monitor panel
    - Pass currentQuest from useQuestManager
    - Pass current stage
    - Pass translations for visualization labels
    - Ensure visualization updates when quest changes
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.3_
  
  - [x] 9.4 Implement quest display in left panel
    - Display scenario description from translations
    - Display quest prompt using react-katex for LaTeX
    - Display function expression using react-katex
    - Render input fields for answer slots
    - Display feedback after verification
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 5.1, 5.2, 5.3, 5.4, 5.5_
  
  - [x] 9.5 Implement answer verification logic
    - Compare user input to expected answer with ±0.01 tolerance
    - Handle special values: "DNE", "∞", "-∞"
    - Display success feedback for correct answers
    - Display error feedback for incorrect answers
    - Update checkStatus in useQuestManager
    - _Requirements: 8.2_

- [x] 10. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Implement responsive design and accessibility
  - [x] 11.1 Add responsive CSS for mobile devices
    - Ensure ChamberLayout adapts to small screens
    - Stack left and right panels vertically on mobile
    - Adjust font sizes for readability
    - Ensure touch targets are at least 44x44 pixels
    - _Requirements: 7.2, 7.3, 7.4, 7.5, 7.6_
  
  - [x] 11.2 Add responsive CSS for tablet devices
    - Optimize layout for medium screen sizes
    - Adjust visualization canvas size
    - Ensure LaTeX formulas remain readable
    - _Requirements: 7.2, 7.3, 7.4, 7.5, 7.6_
  
  - [x] 11.3 Test and fix LaTeX rendering on all devices
    - Verify all formulas use double backslashes (\\lim, \\frac, etc.)
    - Verify units use \\text{} wrapper
    - Test rendering on mobile, tablet, and desktop
    - Fix any rendering issues
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 12. Final integration and testing
  - [x] 12.1 Test complete quest flow
    - Load module and verify initial quest displays
    - Complete all 5 quests in LIMIT_BASICS/BASIC
    - Switch to CORE difficulty and verify new quests load
    - Switch to LIMIT_OPERATIONS stage and verify visualization changes
    - Switch to CONTINUITY stage and verify discontinuity detection works
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4, 2.5_
  
  - [x] 12.2 Test language switching
    - Load module in English and verify all text
    - Switch to Chinese and verify all text updates
    - Switch to German and verify all text updates
    - Verify LaTeX formulas remain consistent
    - Verify scenario word counts are in range (150-250 words)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 7.1, 7.2, 7.3, 7.4_
  
  - [x] 12.3 Test all 60 quests
    - Verify each stage has 20 quests (5 per difficulty)
    - Verify BASIC has 15 total quests across all stages
    - Verify CORE has 20 total quests across all stages
    - Verify ADVANCED has 15 total quests across all stages
    - Verify ELITE has 10 total quests across all stages
    - Verify all quest IDs are unique
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 9.1_
  
  - [ ]* 12.4 Run all property-based tests
    - Execute all property tests with 100 iterations each
    - Verify all tests pass
    - Fix any failing tests
    - Document any edge cases discovered
  
  - [x] 12.5 Browser compatibility testing
    - Test on Chrome/Edge (latest)
    - Test on Firefox (latest)
    - Test on Safari (latest)
    - Verify no console errors or warnings
    - Verify all visualizations render correctly
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

- [x] 13. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- All mathematical formulas must use react-katex with proper LaTeX syntax
- All translations must be complete for EN, CN, and DE
- Total of 60 quests: 3 stages × 4 difficulties × 5 quests
- Basel scenarios must be 150-250 words and connect to real-world applications
