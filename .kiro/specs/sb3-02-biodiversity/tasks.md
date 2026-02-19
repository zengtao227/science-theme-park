# Implementation Plan: SB3.02 Biodiversity Module

## Overview

This implementation plan breaks down the SB3.02 Biodiversity Module into discrete coding tasks. The module is a React/TypeScript application with 60 quests across 3 stages, 4 Basel scenarios, 3 interactive visualizations, and support for 3 languages (EN/CN/DE). Implementation follows a bottom-up approach: data models → core components → visualizations → integration → testing.

## Tasks

- [x] 1. Set up project structure and dependencies
  - Create directory structure for components, content, tests, and utilities
  - Install dependencies: React, TypeScript, fast-check, KaTeX/MathJax, react-i18next, testing libraries
  - Configure TypeScript with strict mode
  - Set up Jest/Vitest with React Testing Library
  - Configure fast-check for property-based testing
  - _Requirements: All (foundation for entire module)_

- [x] 2. Implement core data models and TypeScript interfaces
  - [x] 2.1 Create type definitions for Quest, Stage, BaselScenario, and Progress models
    - Define interfaces in `types/models.ts` matching design specifications
    - Include LocalizedString, Language, and difficulty level types
    - Add validation helper types
    - _Requirements: 1.1, 1.2, 1.3, 2.4, 3.1, 10.4_
  
  - [x] 2.2 Create type definitions for visualization data models
    - Define DiversityCalculatorData, EcosystemMapData, ConservationPlannerData interfaces
    - Include all nested types (SpeciesEntry, EcosystemRegion, Threat, Strategy, etc.)
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 3. Implement localization system
  - [x] 3.1 Set up i18n configuration with react-i18next
    - Configure language detection and fallback to English
    - Create translation resource files for EN, CN, DE
    - Implement language switching context
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  
  - [ ]* 3.2 Write property test for language consistency
    - **Property 3: Language Consistency Across Content**
    - **Validates: Requirements 5.2, 5.3, 5.4**
  
  - [ ]* 3.3 Write unit tests for i18n utilities
    - Test language switching
    - Test fallback behavior
    - Test missing translation handling
    - _Requirements: 5.1, 5.2_

- [x] 4. Implement progress persistence system
  - [x] 4.1 Create LocalStorage wrapper with UserProgress interface
    - Implement saveProgress, loadProgress, clearProgress functions
    - Add error handling for quota exceeded
    - Include timestamp tracking
    - _Requirements: 10.1, 10.2, 10.4_
  
  - [ ]* 4.2 Write property test for progress persistence round trip
    - **Property 5: Progress Persistence Round Trip**
    - **Validates: Requirements 10.1, 10.2**
  
  - [ ]* 4.3 Write property test for language switch preserving progress
    - **Property 6: Language Switch Preserves Progress**
    - **Validates: Requirements 10.3**
  
  - [ ]* 4.4 Write unit tests for storage edge cases
    - Test quota exceeded handling
    - Test corrupted data recovery
    - Test empty state initialization
    - _Requirements: 10.1, 10.2, 10.4_

- [x] 5. Create quest content data files
  - [x] 5.1 Create JSON structure for 20 SPECIES_DIVERSITY quests
    - 6 BASIC quests (species identification, basic diversity concepts)
    - 7 CORE quests (diversity indices, richness vs evenness)
    - 5 ADVANCED quests (comparative analysis, diversity patterns)
    - 2 ELITE quests (comprehensive diversity assessment)
    - Include all three language translations
    - _Requirements: 1.1, 1.3, 2.1_
  
  - [x] 5.2 Create JSON structure for 20 ECOSYSTEM_DIVERSITY quests
    - 5 BASIC quests (habitat types, ecosystem identification)
    - 7 CORE quests (ecosystem services, habitat analysis)
    - 5 ADVANCED quests (ecosystem interactions, service valuation)
    - 3 ELITE quests (ecosystem management planning)
    - Include all three language translations
    - _Requirements: 1.1, 1.3, 2.2_
  
  - [x] 5.3 Create JSON structure for 20 CONSERVATION quests
    - 4 BASIC quests (threats identification, basic conservation concepts)
    - 6 CORE quests (conservation strategies, threat assessment)
    - 5 ADVANCED quests (case study analysis, strategy evaluation)
    - 5 ELITE quests (comprehensive conservation plan design)
    - Include all three language translations
    - _Requirements: 1.1, 1.3, 2.3_
  
  - [ ]* 5.4 Write unit tests verifying quest count and distribution
    - Test total quest count equals 60
    - Test difficulty distribution (15 BASIC, 20 CORE, 15 ADVANCED, 10 ELITE)
    - Test stage distribution (20 per stage)
    - _Requirements: 1.1, 1.2, 1.3_

- [x] 6. Create Basel scenario content
  - [x] 6.1 Write Basel Zoo conservation programs scenario
    - Create JSON with 150-250 word content in EN/CN/DE
    - Include focus on ex-situ conservation and breeding programs
    - Add related concepts and images
    - _Requirements: 3.1, 3.2, 3.6_
  
  - [x] 6.2 Write Rhine River ecosystem biodiversity scenario
    - Create JSON with 150-250 word content in EN/CN/DE
    - Include aquatic biodiversity and riparian habitats
    - Add related concepts and images
    - _Requirements: 3.1, 3.3, 3.6_
  
  - [x] 6.3 Write Basel Botanical Garden species collection scenario
    - Create JSON with 150-250 word content in EN/CN/DE
    - Include plant diversity and seed banking
    - Add related concepts and images
    - _Requirements: 3.1, 3.4, 3.6_
  
  - [x] 6.4 Write Swiss Alps biodiversity hotspots scenario
    - Create JSON with 150-250 word content in EN/CN/DE
    - Include alpine ecosystems and endemic species
    - Add related concepts and images
    - _Requirements: 3.1, 3.5, 3.6_
  
  - [ ]* 6.5 Write property test for scenario word count bounds
    - **Property 2: Basel Scenario Word Count Bounds**
    - **Validates: Requirements 3.6**

- [ ] 7. Checkpoint - Verify content data structure
  - Ensure all content files are valid JSON
  - Verify quest counts and distributions are correct
  - Verify scenario word counts are within bounds
  - Ask the user if questions arise

- [x] 8. Implement LaTeX rendering utility
  - [x] 8.1 Create LaTeX renderer component using KaTeX or MathJax
    - Implement inline and block math rendering
    - Add error boundary for rendering failures
    - Support responsive sizing
    - _Requirements: 6.1, 6.2_
  
  - [ ]* 8.2 Write property test for LaTeX rendering
    - **Property 4: LaTeX Rendering for Mathematical Content**
    - **Validates: Requirements 6.1, 6.2**
  
  - [ ]* 8.3 Write unit tests for LaTeX edge cases
    - Test invalid LaTeX syntax handling
    - Test empty formula handling
    - Test fallback to plain text
    - _Requirements: 6.1, 6.2_

- [x] 9. Implement core UI components
  - [x] 9.1 Create QuestCard component
    - Render quest title, description, and questions
    - Handle multiple question types (multiple-choice, short-answer, matching)
    - Display feedback and explanations
    - Support LaTeX rendering in content
    - Include completion state and onComplete callback
    - _Requirements: 1.1, 5.2, 6.1, 10.1_
  
  - [x] 9.2 Create BaselScenarioPanel component
    - Render scenario title and content
    - Display location and related concepts
    - Support image display
    - Ensure responsive layout
    - _Requirements: 3.1, 3.6, 5.3_
  
  - [x] 9.3 Create StageView component
    - Display stage title and description
    - Render list of QuestCard components
    - Filter quests by stage
    - Track and display completion progress
    - _Requirements: 1.2, 2.4, 5.2_
  
  - [ ]* 9.4 Write unit tests for core components
    - Test QuestCard rendering with various question types
    - Test BaselScenarioPanel with different scenarios
    - Test StageView with different quest lists
    - Test component props and callbacks
    - _Requirements: 1.1, 1.2, 3.1_

- [x] 10. Implement ChamberLayout integration
  - [x] 10.1 Create ModuleContainer component using ChamberLayout
    - Integrate ChamberLayout for consistent UI structure
    - Implement stage navigation
    - Add language selector in header
    - Display module metadata (code, name, target age)
    - _Requirements: 7.1, 7.2, 5.1_
  
  - [ ]* 10.2 Write unit tests for ModuleContainer
    - Test stage navigation
    - Test language switching
    - Test ChamberLayout integration
    - _Requirements: 7.1, 5.1_

- [x] 11. Implement Species Diversity Calculator visualization
  - [x] 11.1 Create DiversityCalculator component
    - Build UI for adding/removing species entries
    - Implement Shannon index calculation: H' = -Σ(pi * ln(pi))
    - Implement Simpson index calculation: D = 1 - Σ(pi²)
    - Calculate species richness and evenness
    - Display results with LaTeX-formatted formulas
    - Support all three languages for labels
    - _Requirements: 4.1, 4.2, 5.4, 6.1_
  
  - [ ]* 11.2 Write unit tests for diversity calculations
    - Test Shannon index with known datasets
    - Test Simpson index with known datasets
    - Test edge cases (empty data, single species)
    - _Requirements: 4.2_

- [x] 12. Implement Ecosystem Map visualization
  - [x] 12.1 Create EcosystemMap component
    - Build interactive map of Basel region
    - Display ecosystem regions with biodiversity scores
    - Implement region selection and detail view
    - Show key species and threats for selected region
    - Support all three languages for labels and descriptions
    - Ensure responsive design for mobile and desktop
    - _Requirements: 4.1, 4.3, 5.4_
  
  - [ ]* 12.2 Write unit tests for ecosystem map interactions
    - Test region selection
    - Test data display for different regions
    - Test empty state handling
    - _Requirements: 4.3_

- [x] 13. Implement Conservation Planner visualization
  - [x] 13.1 Create ConservationPlanner component
    - Build UI for selecting conservation strategies
    - Display threats with severity indicators
    - Implement budget tracking and constraint enforcement
    - Calculate total cost and expected impact
    - Show which threats are addressed by selected strategies
    - Support all three languages for labels and descriptions
    - _Requirements: 4.1, 4.4, 5.4_
  
  - [ ]* 13.2 Write unit tests for conservation planner logic
    - Test budget constraint enforcement
    - Test impact calculation
    - Test threat-strategy matching
    - _Requirements: 4.4_

- [x] 14. Implement VisualizationContainer wrapper
  - [x] 14.1 Create VisualizationContainer component
    - Wrap all three visualizations with consistent interface
    - Add error boundaries for visualization failures
    - Implement loading states
    - Ensure responsive behavior
    - _Requirements: 4.1, 4.5, 4.6_
  
  - [ ]* 14.2 Write unit tests for visualization container
    - Test error boundary behavior
    - Test loading state display
    - Test visualization type switching
    - _Requirements: 4.1_

- [ ] 15. Checkpoint - Test visualizations independently
  - Manually test each visualization with sample data
  - Verify calculations are correct
  - Verify responsive behavior on different screen sizes
  - Ensure all tests pass, ask the user if questions arise

- [x] 16. Integrate all components into ModuleContainer
  - [x] 16.1 Wire StageView components with quest data
    - Load quest data from JSON files
    - Pass quests to appropriate StageView components
    - Implement stage navigation logic
    - _Requirements: 1.1, 1.2, 2.4_
  
  - [x] 16.2 Integrate BaselScenarioPanel components
    - Load scenario data from JSON files
    - Display scenarios in appropriate sections
    - Ensure scenarios are accessible from all stages
    - _Requirements: 3.1, 3.6_
  
  - [x] 16.3 Integrate visualization components
    - Add visualizations to appropriate stages
    - Pass visualization data from content files
    - Ensure visualizations are interactive and responsive
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  
  - [x] 16.4 Connect progress persistence to quest completion
    - Call saveProgress when quest is completed
    - Load progress on module initialization
    - Update UI to reflect completed quests
    - _Requirements: 10.1, 10.2_
  
  - [x] 16.5 Connect language switching to all components
    - Ensure language changes propagate to all components
    - Verify progress is maintained across language switches
    - Test all three languages display correctly
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 10.3_

- [ ]* 17. Write property test for stage ordering invariant
  - **Property 1: Stage Ordering Invariant**
  - **Validates: Requirements 2.4**

- [ ]* 18. Write integration tests for complete user flows
  - Test complete quest completion flow
  - Test language switching during quest progression
  - Test progress persistence across sessions
  - Test navigation between stages
  - Test visualization interactions
  - _Requirements: 1.1, 2.4, 5.1, 10.1, 10.2_

- [x] 19. Implement error handling and boundaries
  - [x] 19.1 Add error boundaries to all major components
    - Wrap ModuleContainer, StageView, and visualizations
    - Display user-friendly error messages in current language
    - Provide recovery mechanisms (retry, reload)
    - _Requirements: All (error handling)_
  
  - [x] 19.2 Implement storage error handling
    - Handle LocalStorage quota exceeded
    - Implement cleanup strategy for old data
    - Add user notifications for storage issues
    - _Requirements: 10.1, 10.4_
  
  - [x] 19.3 Implement content loading error handling
    - Handle missing or malformed quest data
    - Handle missing translations
    - Provide fallback content where appropriate
    - _Requirements: 5.1, 5.2_
  
  - [ ]* 19.4 Write unit tests for error scenarios
    - Test error boundary rendering
    - Test storage error handling
    - Test content loading failures
    - Test LaTeX rendering errors
    - _Requirements: All (error handling)_

- [ ] 20. Final checkpoint and polish
  - Run all unit tests and property tests
  - Verify all 60 quests are accessible
  - Verify all 4 Basel scenarios display correctly
  - Verify all 3 visualizations work correctly
  - Test all 3 languages thoroughly
  - Test on mobile and desktop devices
  - Ensure all tests pass, ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties with 100+ iterations
- Unit tests validate specific examples and edge cases
- Content creation (tasks 5-6) can be done in parallel with component development
- Visualizations (tasks 11-14) can be developed independently and integrated later
- The module uses TypeScript for type safety and React for UI components
- LaTeX rendering ensures scientific notation is displayed correctly
- Progress persistence uses browser LocalStorage for simplicity
- All content must be provided in three languages (EN/CN/DE)
