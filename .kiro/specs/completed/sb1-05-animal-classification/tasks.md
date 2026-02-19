# Implementation Plan: SB1.05 - Animal Classification & Adaptation

## Overview

This implementation plan converts the SB1.05 Animal Classification & Adaptation module design into actionable coding tasks. The module will be built using TypeScript, React, Next.js, and follows the Chamber Module Standards with a mixed-mode interface (quest exercises + visualizations).

The implementation will create 60 quests across 3 stages and 4 difficulty levels, with interactive visualizations for animal classification, adaptations, and behavior. All content will be available in three languages (EN/CN/DE) with Basel-specific scenarios.

## Tasks

- [x] 1. Set up module structure and core interfaces
  - Create directory structure: `src/app/chamber/sb1-05/` and `src/components/chamber/sb1-05/`
  - Define TypeScript interfaces for SB105Quest, AnimalData, AdaptationData, BehaviorData
  - Set up i18n translation structure in `src/lib/i18n.ts` for sb1_05 module
  - Configure ChamberLayout component integration
  - _Requirements: 1.1, 1.3, 7.1, 8.1_

- [x] 2. Implement quest data and generation system
  - [x] 2.1 Create animal classification quest data
    - Define data for vertebrates (mammals, birds, reptiles, amphibians, fish)
    - Define data for invertebrates (arthropods, mollusks)
    - Include scientific names with LaTeX formatting (\\textit{Genus species})
    - Distribute across difficulty levels: BASIC (8 quests), CORE (8 quests), ADVANCED (6 quests), ELITE (4 quests)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ]* 2.2 Write property test for quest pool distribution
    - **Property 1: Quest pool structure consistency**
    - **Validates: Requirements 1.2, 1.3, 1.4**

  - [x] 2.3 Create adaptation quest data
    - Define adaptations for five environments (desert, arctic, aquatic, forest, alpine)
    - Include physical and behavioral adaptations with survival advantages
    - Include specific animal examples for each adaptation
    - Distribute across difficulty levels: BASIC (7 quests), CORE (7 quests), ADVANCED (5 quests), ELITE (3 quests)
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [ ]* 2.4 Write property test for adaptation survival advantages
    - **Property 4: Adaptation survival advantage explanation**
    - **Validates: Requirements 3.3, 3.4**

  - [x] 2.5 Create behavior and evolution quest data
    - Define behavior patterns (feeding, reproduction, defense, migration)
    - Include evolutionary context and conservation concepts
    - Distribute across difficulty levels: BASIC (5 quests), CORE (5 quests), ADVANCED (4 quests), ELITE (3 quests)
    - _Requirements: 4.1, 4.2, 4.4, 4.5_

  - [x] 2.6 Implement buildStagePool function
    - Create function to generate quest pools based on difficulty and stage
    - Implement quest distribution logic (20 BASIC, 20 CORE, 15 ADVANCED, 10 ELITE)
    - Ensure each quest has all required fields
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [ ]* 2.7 Write property test for quest object completeness
    - **Property 2: Quest object completeness**
    - **Validates: Requirements 1.4, 10.4**

- [ ] 3. Create Basel-specific scenarios
  - [x] 3.1 Write Basel Zoo scenario
    - Create 150-250 word scenario about Basel Zoo animal classification
    - Include specific animals and educational context
    - Translate to EN, CN, DE
    - _Requirements: 6.1, 6.2, 6.6, 6.7_

  - [x] 3.2 Write Rhine River ecosystem scenario
    - Create 150-250 word scenario about Rhine River animals and adaptations
    - Include European eel, grey heron, European beaver
    - Translate to EN, CN, DE
    - _Requirements: 6.1, 6.3, 6.6, 6.7_

  - [x] 3.3 Write Alpine animals scenario
    - Create 150-250 word scenario about Swiss Alps biodiversity
    - Include Alpine ibex, Alpine marmot, Golden eagle
    - Translate to EN, CN, DE
    - _Requirements: 6.1, 6.4, 6.6, 6.7_

  - [x] 3.4 Write wildlife conservation scenario
    - Create 150-250 word scenario about Basel region conservation
    - Include European beaver, peregrine falcon, European lynx
    - Translate to EN, CN, DE
    - _Requirements: 6.1, 6.5, 6.6, 6.7_

  - [ ]* 3.5 Write property test for Basel scenario word count
    - **Property 6: Basel scenario word count**
    - **Validates: Requirements 6.6**

- [ ] 4. Checkpoint - Ensure data structure tests pass
  - Ensure all tests pass, ask the user if questions arise.


- [ ] 5. Implement main page component
  - [x] 5.1 Create SB105AnimalClassification page component
    - Set up page structure with useQuestManager hook
    - Implement difficulty and stage change handlers
    - Connect to ChamberLayout component
    - Implement language switching
    - _Requirements: 7.1, 7.2, 8.1, 8.2_

  - [x] 5.2 Implement quest display logic
    - Display quest prompt with LaTeX rendering
    - Implement input fields for fill-in questions
    - Implement multiple choice options
    - Display Basel scenario context
    - _Requirements: 1.4, 6.6, 7.4_

  - [x] 5.3 Implement answer verification
    - Create verification function for exact match
    - Implement case-insensitive matching for animal names
    - Implement array comparison for multiple answers
    - Display feedback with educational explanations
    - _Requirements: 8.2_

  - [ ]* 5.4 Write property test for answer verification
    - **Property 9: Answer verification accuracy**
    - **Validates: Requirements 8.2**

  - [x] 5.5 Implement progress tracking
    - Display quest completion indicators
    - Update progress on quest completion
    - Show stage completion status
    - _Requirements: 8.4, 8.5_

  - [ ]* 5.6 Write unit tests for page component
    - Test quest loading and display
    - Test difficulty and stage switching
    - Test answer submission and verification
    - Test progress updates
    - _Requirements: 1.1, 8.2, 8.5_

- [ ] 6. Implement classification tree visualization
  - [x] 6.1 Create ClassificationTreeView component
    - Design hierarchical tree structure (Kingdom → Phylum → Class → Order)
    - Implement interactive nodes with hover effects
    - Color-code branches (vertebrates blue, invertebrates green)
    - Display animal characteristics on node selection
    - _Requirements: 5.1, 5.5_

  - [x] 6.2 Implement animal path highlighting
    - Highlight classification path for current quest animal
    - Animate path traversal from kingdom to class
    - Display scientific names in LaTeX italic format
    - Show defining characteristics at each level
    - _Requirements: 2.4, 2.5, 5.1_

  - [x] 6.3 Add responsive design
    - Implement mobile-friendly tree layout
    - Add touch interactions for mobile devices
    - Ensure readability on small screens
    - _Requirements: 5.6_

  - [ ]* 6.4 Write unit tests for classification tree
    - Test tree rendering with different animals
    - Test path highlighting accuracy
    - Test interactive node selection
    - Test LaTeX rendering of scientific names
    - _Requirements: 5.1, 5.5_

- [ ] 7. Implement adaptation comparison visualization
  - [x] 7.1 Create AdaptationComparisonView component
    - Design side-by-side comparison layout for 2-3 animals
    - Display animal images or silhouettes
    - Show adaptive features with visual indicators
    - Display environment context (desert, arctic, aquatic, forest, alpine)
    - _Requirements: 5.2, 5.5_

  - [x] 7.2 Implement feature highlighting
    - Create interactive feature highlighting on hover
    - Display survival advantage explanations
    - Show physical vs behavioral adaptation indicators
    - Animate feature comparisons
    - _Requirements: 3.3, 3.4, 5.2_

  - [x] 7.3 Add environment visualization
    - Display environment-specific backgrounds or icons
    - Show environmental challenges (temperature, terrain, water availability)
    - Connect features to environmental challenges visually
    - _Requirements: 3.2, 3.5_

  - [ ]* 7.4 Write unit tests for adaptation comparison
    - Test comparison rendering with different animals
    - Test feature highlighting interactions
    - Test survival advantage display
    - Test environment visualization
    - _Requirements: 5.2, 5.5_

- [ ] 8. Implement behavior simulator visualization
  - [x] 8.1 Create BehaviorSimulatorView component
    - Design animated behavior pattern display
    - Implement behavior types (feeding, migration, mating, defense)
    - Show environmental context for behaviors
    - Display evolutionary timeline
    - _Requirements: 5.3, 5.5_

  - [x] 8.2 Implement behavior animations
    - Create animations for different behavior patterns
    - Add playback controls (play, pause, restart)
    - Show behavior purpose and survival benefit
    - Display conservation status indicators for ELITE quests
    - _Requirements: 4.1, 4.2, 4.4, 5.3_

  - [x] 8.3 Add evolution tree builder
    - Create interactive evolution tree component
    - Show evolutionary relationships between species
    - Display time scales and common ancestors
    - Connect to conservation concepts
    - _Requirements: 5.4, 4.2_

  - [ ]* 8.4 Write unit tests for behavior simulator
    - Test behavior animation rendering
    - Test playback controls
    - Test evolution tree display
    - Test conservation status indicators
    - _Requirements: 5.3, 5.4, 5.5_

- [ ] 9. Checkpoint - Ensure visualization tests pass
  - Ensure all tests pass, ask the user if questions arise.


- [ ] 10. Implement internationalization
  - [x] 10.1 Create English translations
    - Add all module text to i18n.ts EN section
    - Include title, difficulty levels, stage names
    - Add all quest prompts and explanations
    - Include all Basel scenarios
    - Add UI labels and instructions
    - _Requirements: 7.1, 7.2, 7.4_

  - [x] 10.2 Create Chinese translations
    - Translate all module text to Chinese
    - Ensure scientific names remain in LaTeX format
    - Translate Basel scenarios maintaining local context
    - Translate UI elements and instructions
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [x] 10.3 Create German translations
    - Translate all module text to German
    - Ensure scientific names remain in LaTeX format
    - Translate Basel scenarios maintaining local context
    - Translate UI elements and instructions
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [ ]* 10.4 Write property test for translation completeness
    - **Property 5: Translation completeness**
    - **Validates: Requirements 7.2, 7.4, 6.7**

  - [ ]* 10.5 Write property test for LaTeX formatting consistency
    - **Property 3: Scientific name LaTeX formatting**
    - **Validates: Requirements 2.5, 7.5**

  - [ ]* 10.6 Write unit tests for language switching
    - Test switching between EN, CN, DE
    - Test all text updates correctly
    - Test LaTeX formulas render in all languages
    - Test Basel scenarios display in all languages
    - _Requirements: 7.1, 7.2, 7.4, 7.5_

- [ ] 11. Implement responsive design and accessibility
  - [ ] 11.1 Add responsive layout for mobile devices
    - Implement mobile-friendly quest display
    - Adapt visualizations for small screens
    - Ensure touch interactions work properly
    - Test on various screen sizes
    - _Requirements: 5.6, 8.6_

  - [ ] 11.2 Add accessibility features
    - Implement keyboard navigation for all interactions
    - Add ARIA labels for screen readers
    - Ensure sufficient color contrast
    - Add alt text for animal images
    - _Requirements: 5.5, 8.1_

  - [ ]* 11.3 Write integration tests for responsive design
    - Test layout on different screen sizes
    - Test touch interactions on mobile
    - Test keyboard navigation
    - Test screen reader compatibility
    - _Requirements: 5.6, 8.6_

- [ ] 12. Integration and wiring
  - [x] 12.1 Connect all components
    - Wire page component to visualizations
    - Connect quest data to visualization updates
    - Implement state synchronization between components
    - Ensure smooth transitions between quests and stages
    - _Requirements: 1.1, 5.5, 8.5_

  - [x] 12.2 Implement error handling
    - Add error boundaries for component failures
    - Handle missing quest data gracefully
    - Implement fallbacks for missing translations
    - Handle image loading failures
    - Add loading states for async operations
    - _Requirements: Error Handling section_

  - [x] 12.3 Add performance optimizations
    - Implement lazy loading for animal images
    - Optimize animation performance
    - Add memoization for expensive calculations
    - Reduce re-renders with React.memo
    - _Requirements: 5.5, 5.6_

  - [ ]* 12.4 Write integration tests for end-to-end flow
    - Test complete quest flow from start to finish
    - Test stage and difficulty switching
    - Test visualization synchronization
    - Test language switching with all components
    - Test Basel scenario display
    - _Requirements: 1.1, 5.5, 7.1, 8.5_

  - [ ]* 12.5 Write property test for visualization feedback
    - **Property 7: Visualization interaction feedback**
    - **Validates: Requirements 5.5, 8.5**

- [ ] 13. Final testing and polish
  - [ ] 13.1 Browser compatibility testing
    - Test on Chrome/Edge (latest)
    - Test on Firefox (latest)
    - Test on Safari (latest)
    - Fix any browser-specific issues
    - _Requirements: Testing Strategy section_

  - [ ] 13.2 Content review
    - Verify all 60 quests are present and correct
    - Verify quest distribution (20 BASIC, 20 CORE, 15 ADVANCED, 10 ELITE)
    - Verify all Basel scenarios are 150-250 words
    - Verify all scientific names use LaTeX formatting
    - Verify all translations are complete
    - _Requirements: 1.1, 1.2, 2.5, 6.6, 7.2_

  - [ ] 13.3 Educational alignment review
    - Verify content aligns with Lehrplan 21 NT.7.9
    - Verify age-appropriate language for 13-15 year olds
    - Verify learning objectives are clear
    - Verify difficulty progression is appropriate
    - _Requirements: 1.5, 10.1, 10.2, 10.3_

  - [ ]* 13.4 Write property test for difficulty progression
    - **Property 8: Difficulty progression content focus**
    - **Validates: Requirements 9.1, 9.2, 9.3, 9.4**

  - [ ]* 13.5 Write property test for stage-specific visualization
    - **Property 10: Stage-specific visualization rendering**
    - **Validates: Requirements 5.1, 5.2, 5.3**

- [ ] 14. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- Integration tests validate end-to-end functionality
- The module follows Chamber Module Standards for consistency
- All content must be available in three languages (EN/CN/DE)
- Basel-specific scenarios must be 150-250 words
- Scientific names must use LaTeX italic formatting
- Quest distribution must follow: 20 BASIC, 20 CORE, 15 ADVANCED, 10 ELITE
