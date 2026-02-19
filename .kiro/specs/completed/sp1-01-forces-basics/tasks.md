# Implementation Plan: SP1.01 - Forces Basics Module

## Overview

This implementation plan breaks down the SP1.01 - Forces Basics module into discrete coding tasks. The approach follows a bottom-up strategy: first implementing core domain logic (force physics and validation), then building the data layer (quest content and storage), followed by presentation components (visualizations and UI), and finally integrating everything with the quest system. Each task builds incrementally, with property-based tests placed close to implementation to catch errors early.

## Tasks

- [x] 1. Set up project structure and dependencies
  - Create directory structure: `/src/domain`, `/src/data`, `/src/presentation`, `/src/app`
  - Install dependencies: React, TypeScript, fast-check, Jest, React Testing Library, KaTeX
  - Configure TypeScript with strict mode
  - Set up Jest configuration for unit and property tests
  - Create barrel exports for each module
  - _Requirements: All (foundational)_

- [x] 2. Implement core force physics domain logic
  - [x] 2.1 Create Vector and Force type definitions
    - Define `Vector`, `Force`, `CartesianVector`, `PolarVector` interfaces
    - Define unit types and conversion constants
    - _Requirements: 4.1, 4.3, 5.1_
  
  - [x] 2.2 Implement vector mathematics functions
    - Implement `addVectors`, `decomposeVector`, `calculateMagnitude`, `calculateAngle`
    - Implement `convertForceUnits` for N/kN/MN conversions
    - _Requirements: 5.1, 5.2, 4.3_
  
  - [ ]* 2.3 Write property test for vector addition
    - **Property 15: Force Composition Resultant Calculation**
    - **Validates: Requirements 7.3**
  
  - [ ]* 2.4 Write property test for unit conversions
    - Test round-trip conversions (N → kN → N)
    - Test conversion correctness with known values
    - _Requirements: 4.3_
  
  - [x] 2.5 Implement equilibrium checking
    - Implement `checkEquilibrium` function with tolerance
    - Implement `calculateResultant` for force systems
    - _Requirements: 6.1, 6.3_
  
  - [ ]* 2.6 Write property test for equilibrium validation
    - **Property 13: Equilibrium Condition Validation**
    - **Validates: Requirements 6.3**
  
  - [ ]* 2.7 Write property test for equilibrium analyzer correctness
    - **Property 16: Equilibrium Analyzer Correctness**
    - **Validates: Requirements 7.4**

- [x] 3. Implement validation engine
  - [x] 3.1 Create validation types and interfaces
    - Define `ValidationConfig`, `ValidationResult`, `Answer` interfaces
    - Define tolerance types and error types
    - _Requirements: 11.1, 11.2, 11.3_
  
  - [x] 3.2 Implement numerical answer validation
    - Implement exact and tolerance-based validation
    - Implement unit checking for force answers
    - Generate appropriate feedback messages
    - _Requirements: 5.3, 11.4, 4.4_
  
  - [ ]* 3.3 Write property test for numerical tolerance acceptance
    - **Property 11: Numerical Tolerance Acceptance**
    - **Validates: Requirements 5.3, 11.4**
  
  - [ ]* 3.4 Write property test for unit validation
    - **Property 9: Unit Validation in Force Answers**
    - **Validates: Requirements 4.4**
  
  - [x] 3.5 Implement vector answer validation
    - Validate both magnitude and direction with separate tolerances
    - Generate feedback for magnitude vs direction errors
    - _Requirements: 5.5, 11.5_
  
  - [ ]* 3.6 Write property test for vector validation completeness
    - **Property 12: Vector Answer Validation Completeness**
    - **Validates: Requirements 5.5, 11.5**
  
  - [x] 3.7 Implement feedback generation
    - Create feedback messages for correct/incorrect answers
    - Support multi-language feedback
    - _Requirements: 4.5, 11.2, 11.3_
  
  - [ ]* 3.8 Write property test for feedback provision
    - **Property 10: Feedback Provision for All Answers**
    - **Validates: Requirements 4.5, 11.2, 11.3**

- [x] 4. Create quest content data structure
  - [x] 4.1 Define quest content schema
    - Create JSON schema for quest definitions
    - Define stage and difficulty enums
    - Create TypeScript types matching schema
    - _Requirements: 1.1, 1.2, 1.3_
  
  - [x] 4.2 Create quest content files for FORCE_CONCEPTS stage
    - Create `force-concepts/basic.json` with 15 quests
    - Create `force-concepts/core.json` with 8 quests
    - Include unit conversion problems
    - _Requirements: 1.3, 4.1, 4.2, 4.3_
  
  - [x] 4.3 Create quest content files for FORCE_COMPOSITION stage
    - Create `force-composition/basic.json` with 5 quests
    - Create `force-composition/core.json` with 8 quests
    - Create `force-composition/advanced.json` with 8 quests
    - Include problems at 0°, 30°, 45°, 60°, 90° angles
    - _Requirements: 1.3, 5.1, 5.2, 5.4_
  
  - [x] 4.4 Create quest content files for FORCE_EQUILIBRIUM stage
    - Create `force-equilibrium/core.json` with 4 quests
    - Create `force-equilibrium/advanced.json` with 7 quests
    - Create `force-equilibrium/elite.json` with 10 quests
    - Include problems with 2, 3, and 4 forces
    - _Requirements: 1.3, 6.2, 6.4, 6.5_
  
  - [x] 4.5 Create Basel scenario content
    - Create `basel-scenarios.json` with 3-4 scenarios
    - Include: tram braking, bridge cables, Münster tower, Marathon runner
    - Ensure each scenario has 150-250 words of context
    - Distribute scenarios across difficulty levels
    - _Requirements: 3.1, 3.2, 3.3, 3.4_
  
  - [ ]* 4.6 Write unit test to verify quest distribution
    - Verify exactly 65 total quests
    - Verify difficulty distribution: 20 BASIC, 20 CORE, 15 ADVANCED, 10 ELITE
    - Verify stage distribution matches design
    - _Requirements: 1.2, 1.3_
  
  - [ ]* 4.7 Write property test for Basel scenario word count
    - **Property 7: Basel Scenario Word Count Constraint**
    - **Validates: Requirements 3.3**
  
  - [ ]* 4.8 Write property test for Basel scenario visual content
    - **Property 8: Basel Scenario Visual Content**
    - **Validates: Requirements 3.5**

- [x] 5. Implement translation system
  - [x] 5.1 Create translation files
    - Create `translations/en.json` with all UI strings
    - Create `translations/cn.json` with Chinese translations
    - Create `translations/de.json` with German translations
    - _Requirements: 2.1, 2.2_
  
  - [x] 5.2 Implement LanguageManager
    - Implement language selection and persistence
    - Implement translation lookup with fallback to English
    - Implement `translateContent` for MultiLangContent
    - _Requirements: 2.1, 2.2, 2.5_
  
  - [ ]* 5.3 Write property test for multi-language content consistency
    - **Property 3: Multi-Language Content Consistency**
    - **Validates: Requirements 2.2**
  
  - [ ]* 5.4 Write property test for preference persistence
    - **Property 6: Preference Persistence Round-Trip**
    - **Validates: Requirements 2.5, 12.3**
  
  - [ ]* 5.5 Write property test for state preservation across language changes
    - **Property 5: State Preservation Across Language Changes**
    - **Validates: Requirements 2.4**

- [x] 6. Implement progress storage system
  - [x] 6.1 Create storage interfaces and types
    - Define `ProgressStorage`, `UserProgress`, `QuestCompletion` interfaces
    - Define storage error types
    - _Requirements: 12.1, 12.2_
  
  - [x] 6.2 Implement LocalStorage-based storage
    - Implement `saveQuestCompletion`, `getQuestCompletion`, `getAllCompletions`
    - Implement `savePreference`, `getPreference`
    - Implement error handling for quota exceeded and unavailable storage
    - _Requirements: 12.1, 12.2, 12.3, 12.5_
  
  - [ ]* 6.3 Write property test for quest completion persistence
    - **Property 25: Quest Completion Persistence Round-Trip**
    - **Validates: Requirements 10.3, 12.1**
  
  - [ ]* 6.4 Write property test for progress state persistence
    - **Property 28: Progress State Persistence Round-Trip**
    - **Validates: Requirements 12.2, 12.4**
  
  - [ ]* 6.5 Write property test for storage failure error handling
    - **Property 29: Storage Failure Error Handling**
    - **Validates: Requirements 12.5**
  
  - [x] 6.3 Implement data export/import
    - Implement `exportProgress` to JSON string
    - Implement `importProgress` with validation
    - Handle corrupted data gracefully
    - _Requirements: 12.2_

- [x] 7. Checkpoint - Ensure domain and data layer tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Implement Quest Engine
  - [x] 8.1 Create QuestEngine class
    - Implement quest loading from content files
    - Implement quest navigation (next, previous, current)
    - Implement prerequisite checking
    - _Requirements: 1.4, 1.5_
  
  - [x] 8.2 Implement quest progression logic
    - Implement `submitAnswer` with validation integration
    - Implement `completeQuest` with storage integration
    - Implement `isQuestUnlocked` based on prerequisites
    - _Requirements: 1.4, 1.5, 10.3_
  
  - [ ]* 8.3 Write property test for quest unlocking progression
    - **Property 1: Quest Unlocking Progression**
    - **Validates: Requirements 1.4**
  
  - [ ]* 8.4 Write property test for stage unlocking
    - **Property 2: Stage Unlocking**
    - **Validates: Requirements 1.5**
  
  - [x] 8.5 Implement stage and difficulty progress tracking
    - Implement `getStageProgress` with accurate counts
    - Implement `getDifficultyProgress` with accurate counts
    - _Requirements: 10.1, 10.2_
  
  - [ ]* 8.6 Write property test for progress display accuracy
    - **Property 24: Progress Display Accuracy**
    - **Validates: Requirements 10.1, 10.2**

- [x] 9. Implement LaTeX rendering component
  - [x] 9.1 Create LaTeXRenderer component
    - Integrate KaTeX library
    - Implement rendering with error handling
    - Support inline and block equations
    - _Requirements: 8.1_
  
  - [x] 9.2 Add vector notation support
    - Implement arrow notation for vectors
    - Implement bold formatting option
    - _Requirements: 8.2_
  
  - [ ]* 9.3 Write property test for LaTeX rendering success
    - **Property 17: LaTeX Rendering Success**
    - **Validates: Requirements 8.1**
  
  - [ ]* 9.4 Write property test for vector notation formatting
    - **Property 18: Vector Notation Formatting**
    - **Validates: Requirements 8.2**
  
  - [ ]* 9.5 Write property test for force equation unit inclusion
    - **Property 19: Force Equation Unit Inclusion**
    - **Validates: Requirements 8.3**
  
  - [ ]* 9.6 Write property test for mathematical notation language independence
    - **Property 4: Mathematical Notation Language Independence**
    - **Validates: Requirements 2.3, 8.4**

- [x] 10. Implement interactive visualizations
  - [x] 10.1 Create base InteractiveVisualization interface
    - Define common lifecycle methods
    - Define interaction event types
    - Create Canvas/SVG rendering utilities
    - _Requirements: 7.1_
  
  - [x] 10.2 Implement ForceVectorDiagram component
    - Render force vector with arrow
    - Display magnitude, angle, and components
    - Support dragging to change magnitude/direction
    - Update display in real-time
    - _Requirements: 7.2_
  
  - [ ]* 10.3 Write property test for force vector diagram updates
    - **Property 14: Interactive Visualization Real-Time Updates**
    - **Validates: Requirements 7.2**
  
  - [x] 10.4 Implement ForceCompositionTool component
    - Allow adding/removing multiple force vectors
    - Calculate and display resultant vector
    - Update resultant dynamically as forces change
    - Show vector addition graphically
    - _Requirements: 7.3_
  
  - [ ]* 10.5 Write unit test for force composition tool
    - Test with 2, 3, and 4 forces
    - Test with forces at special angles (0°, 90°, 180°)
    - _Requirements: 7.3_
  
  - [x] 10.6 Implement EquilibriumAnalyzer component
    - Display multiple forces with adjustable magnitudes/directions
    - Calculate net force continuously
    - Indicate equilibrium status (balanced/unbalanced)
    - Show sum of x and y components
    - _Requirements: 7.4_
  
  - [ ]* 10.7 Write unit test for equilibrium analyzer
    - Test with known equilibrium configurations
    - Test with known non-equilibrium configurations
    - _Requirements: 7.4_

- [x] 11. Implement ChamberLayout component
  - [x] 11.1 Create responsive ChamberLayout component
    - Implement CSS Grid/Flexbox layout
    - Support mobile (320px+) and desktop (768px+) breakpoints
    - Stack visualizations vertically on mobile
    - Arrange visualizations side-by-side on desktop
    - _Requirements: 9.1, 9.2, 9.3_
  
  - [ ]* 11.2 Write property test for responsive layout adaptation
    - **Property 20: Responsive Layout Adaptation**
    - **Validates: Requirements 9.1**
  
  - [ ]* 11.3 Write property test for layout mode appropriate arrangement
    - **Property 21: Layout Mode Appropriate Arrangement**
    - **Validates: Requirements 9.2, 9.3**
  
  - [x] 11.4 Implement touch-friendly interaction targets
    - Ensure all buttons/controls are at least 44x44px on mobile
    - Add appropriate padding and spacing
    - _Requirements: 9.4_
  
  - [ ]* 11.5 Write property test for touch target minimum size
    - **Property 22: Touch Target Minimum Size**
    - **Validates: Requirements 9.4**
  
  - [ ]* 11.6 Write property test for cross-platform functionality preservation
    - **Property 23: Cross-Platform Functionality Preservation**
    - **Validates: Requirements 9.5**

- [x] 12. Implement quest UI components
  - [x] 12.1 Create QuestDisplay component
    - Display quest content with LaTeX rendering
    - Display Basel scenario context when present
    - Show associated visualization when specified
    - Support multi-language content
    - _Requirements: 2.2, 3.5, 7.1_
  
  - [x] 12.2 Create AnswerInput component
    - Support numerical input with unit selection
    - Support vector input (magnitude + angle)
    - Validate input format before submission
    - Show error messages for invalid formats
    - _Requirements: 4.4, 5.5_
  
  - [x] 12.3 Create FeedbackDisplay component
    - Show correct/incorrect status
    - Display feedback messages
    - Show correct answer when incorrect
    - Provide "Next Quest" button on success
    - _Requirements: 11.2, 11.3_
  
  - [x] 12.4 Create ProgressIndicator component
    - Display stage progress (completed/total)
    - Display difficulty progress
    - Show visual indicators (checkmarks, progress bars)
    - Highlight current quest
    - _Requirements: 10.1, 10.2, 10.4_
  
  - [ ]* 12.5 Write property test for completed quest visual indicators
    - **Property 26: Completed Quest Visual Indicators**
    - **Validates: Requirements 10.4**
  
  - [ ]* 12.6 Write property test for completed quest accessibility
    - **Property 27: Completed Quest Accessibility**
    - **Validates: Requirements 10.5**

- [x] 13. Implement main application controller
  - [x] 13.1 Create QuestUIController component
    - Integrate QuestEngine, LanguageManager, ProgressStorage
    - Manage application state (current quest, language, progress)
    - Handle quest navigation
    - Handle answer submission
    - Handle language switching
    - _Requirements: 1.4, 2.2, 2.4, 11.1_
  
  - [x] 13.2 Implement error boundary
    - Catch and display rendering errors
    - Provide recovery options
    - Log errors for debugging
    - _Requirements: 12.5_
  
  - [x] 13.3 Implement loading states
    - Show loading indicator while content loads
    - Handle content loading errors
    - Implement retry mechanism
    - _Requirements: Error Handling_

- [x] 14. Wire everything together
  - [x] 14.1 Create main App component
    - Initialize QuestEngine with content
    - Initialize LanguageManager with translations
    - Initialize ProgressStorage
    - Render QuestUIController with ChamberLayout
    - _Requirements: All_
  
  - [x] 14.2 Set up routing (if needed)
    - Route to specific quests by ID
    - Route to stage overview
    - Handle deep linking
    - _Requirements: 10.5_
  
  - [x] 14.3 Add accessibility attributes
    - Add ARIA labels to interactive elements
    - Ensure keyboard navigation works
    - Test with screen reader
    - _Requirements: 9.4, 9.5_

- [x] 15. Integration testing
  - [ ]* 15.1 Write integration test for complete quest flow
    - Test loading quest → answering → validation → progression
    - Test across multiple quests
    - _Requirements: 1.4, 1.5, 11.1_
  
  - [ ]* 15.2 Write integration test for language switching
    - Test switching language preserves progress
    - Test all content updates to new language
    - _Requirements: 2.2, 2.4_
  
  - [ ]* 15.3 Write integration test for storage persistence
    - Test completing quests → closing app → reopening → progress restored
    - _Requirements: 12.1, 12.2_

- [x] 16. Final checkpoint - Ensure all tests pass
  - Run full test suite (unit + property + integration)
  - Verify test coverage meets goals (>80% line coverage)
  - Ensure all 29 correctness properties have corresponding tests
  - Ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties with 100+ iterations
- Unit tests validate specific examples and edge cases
- Integration tests validate end-to-end flows
- Checkpoints ensure incremental validation at major milestones
