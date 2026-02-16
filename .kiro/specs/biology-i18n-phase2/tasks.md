# Implementation Plan: Biology i18n Phase 2

## Overview

This implementation plan focuses on completing the internationalization upgrade for three core biology modules (SB1.03 Cell Division, SB2.01 Tissues & Organs, GB2.01 Neurobiology) in the Science Theme Park educational platform. The approach follows a systematic refactoring strategy: standardize module architecture, complete translation files, implement UI components, and ensure comprehensive testing.

## Tasks

- [ ] 1. Set up translation file structure and core interfaces
  - [x] 1.1 Create standardized translation interfaces for biology modules
    - Define `BiologyModuleTranslations` interface in shared types
    - Create type definitions for stage-specific translations
    - Ensure type safety for all translation keys
    - _Requirements: 1.3, 5.2_

  - [x] 1.2 Audit existing translation files for SB1.03, SB2.01, GB2.01
    - Check EN, CN, DE files for key symmetry
    - Identify missing or incomplete translation keys
    - Document hardcoded strings that need internationalization
    - _Requirements: 1.1, 5.1, 8.2_

  - [ ]* 1.3 Write property test for translation key symmetry
    - **Property 3: Translation key structure symmetry**
    - **Validates: Requirements 1.3, 2.5, 5.2**

- [ ] 2. Complete SB1.03 Cell Division translation files
  - [x] 2.1 Implement complete EN translation keys for SB1.03
    - Add `sb1_03_cell_division` section to `src/lib/i18n/en/biology.ts`
    - Include translations for mitosis, meiosis_i, meiosis_ii stages
    - Add Basel-contextualized scenario descriptions
    - Include all labels, prompts, and feedback messages
    - _Requirements: 1.1, 1.3, 1.4_

  - [x] 2.2 Implement complete CN translation keys for SB1.03
    - Mirror EN structure in `src/lib/i18n/cn/biology.ts`
    - Ensure accurate biological terminology in Chinese
    - Adapt Basel context for Chinese-speaking audience
    - _Requirements: 1.1, 1.3, 6.3_

  - [x] 2.3 Implement complete DE translation keys for SB1.03
    - Mirror EN structure in `src/lib/i18n/de/biology.ts`
    - Use precise German anatomical terminology
    - Localize Basel context for German-speaking audience
    - _Requirements: 1.1, 1.3, 6.3_

  - [ ]* 2.4 Write property test for translation completeness
    - **Property 1: Translation interface completeness verification**
    - **Validates: Requirements 1.1**

  - [ ]* 2.5 Write property test for hardcoded text detection
    - **Property 4: Hardcoded text internationalization**
    - **Validates: Requirements 1.5**

- [ ] 3. Refactor SB1.03 module to standard chamber structure
  - [x] 3.1 Create new chamber directory structure for SB1.03
    - Create `src/app/chamber/sb1-03-cell-division/` directory
    - Set up page.tsx with ChamberLayout integration
    - Create components subdirectory for visualizations
    - _Requirements: 1.1, 4.4_

  - [x] 3.2 Implement CellDivisionVisualization component
    - Create interactive chromosome visualization
    - Implement mitosis, meiosis I, and meiosis II animations
    - Use framer-motion for smooth transitions
    - Apply Premium UI styling (dark theme, glassmorphism, neon accents)
    - _Requirements: 1.1, 4.1, 4.2, 4.3_

  - [x] 3.3 Integrate useQuestManager for SB1.03 state management
    - Set up difficulty levels (BASIC, CORE, ADVANCED, ELITE)
    - Implement stage switching (mitosis, meiosis_i, meiosis_ii)
    - Add input validation and feedback logic
    - Connect to local storage for progress tracking
    - _Requirements: 1.2, 2.4, 7.4_

  - [x] 3.4 Wire SB1.03 translations to UI components
    - Replace all hardcoded strings with t() function calls
    - Implement language switching functionality
    - Add fallback mechanism for missing translations
    - _Requirements: 1.2, 1.5, 5.4_

  - [ ]* 3.5 Write property test for language switching
    - **Property 2: Language switching real-time update**
    - **Validates: Requirements 1.2**

  - [ ]* 3.6 Write unit tests for CellDivisionVisualization
    - Test chromosome rendering for different stages
    - Test animation state transitions
    - Test user interaction handlers
    - _Requirements: 1.1, 4.3_

- [ ] 4. Checkpoint - Verify SB1.03 module functionality
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Optimize SB2.01 Tissues & Organs translation structure
  - [x] 5.1 Restructure sb2_01_tissues translation keys in EN
    - Organize by hierarchy: tissues, organs, systems
    - Add anatomical labels for epithelial, connective, muscle, nervous tissues
    - Include functional descriptions for each tissue type
    - Add Basel-contextualized medical scenarios
    - _Requirements: 2.1, 2.2, 6.1_

  - [x] 5.2 Update CN translation keys for SB2.01
    - Mirror restructured EN keys
    - Ensure accurate anatomical terminology in Chinese
    - Maintain cultural adaptation for Basel context
    - _Requirements: 2.1, 2.5, 6.3_

  - [x] 5.3 Update DE translation keys for SB2.01
    - Mirror restructured EN keys
    - Use precise German medical terminology
    - Localize Basel medical institution references
    - _Requirements: 2.1, 2.5, 6.3_

  - [ ]* 5.4 Write property test for anatomical label completeness
    - **Property 5: Anatomical label completeness**
    - **Validates: Requirements 2.2**

- [ ] 6. Enhance SB2.01 module with multi-stage learning design
  - [~] 6.1 Update SB2.01 page.tsx with three-stage structure
    - Implement tissues, organs, systems stages
    - Add stage-specific visualizations
    - Integrate ChamberLayout with stage navigation
    - _Requirements: 2.3, 4.4_

  - [~] 6.2 Create TissueOrganVisualization component
    - Implement 2D/3D anatomy diagrams
    - Add interactive labeling system
    - Support cross-section views
    - Apply Premium UI styling
    - _Requirements: 2.2, 4.1, 4.2_

  - [~] 6.3 Implement responsive input validation for SB2.01
    - Add real-time input validation
    - Provide immediate visual feedback
    - Implement hint system for incorrect answers
    - _Requirements: 2.4, 7.4_

  - [ ]* 6.4 Write property test for multi-stage learning functionality
    - **Property 6: Multi-stage learning functionality**
    - **Validates: Requirements 2.3**

  - [ ]* 6.5 Write property test for interaction feedback consistency
    - **Property 7: Interaction feedback consistency**
    - **Validates: Requirements 2.4, 7.4**

  - [ ]* 6.6 Write unit tests for TissueOrganVisualization
    - Test tissue type rendering
    - Test organ hierarchy display
    - Test interactive label toggling
    - _Requirements: 2.2, 2.3_

- [ ] 7. Checkpoint - Verify SB2.01 module functionality
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Verify and enhance GB2.01 Neurobiology translations
  - [-] 8.1 Audit GB2.01 translation completeness and accuracy
    - Verify all neurobiology terminology translations
    - Check scientific accuracy across EN, CN, DE
    - Identify any missing translation keys
    - _Requirements: 3.1, 3.2, 3.3_

  - [~] 8.2 Add missing translations for GB2.01 if needed
    - Complete any gaps in EN, CN, DE files
    - Ensure precise professional terminology
    - Add Basel biomedical research context
    - _Requirements: 3.2, 3.3, 6.1, 6.2_

  - [~] 8.3 Verify KaTeX formula rendering in GB2.01
    - Check action potential formulas render correctly
    - Verify Nernst equation and other mathematical expressions
    - Test formula rendering across all languages
    - _Requirements: 3.4_

  - [ ]* 8.4 Write property test for professional terminology completeness
    - **Property 8: Professional terminology translation completeness**
    - **Validates: Requirements 3.2**

  - [ ]* 8.5 Write property test for mathematical formula rendering
    - **Property 9: Mathematical formula rendering correctness**
    - **Validates: Requirements 3.4**

  - [ ]* 8.6 Write unit tests for neuron visualization components
    - Test action potential state transitions
    - Test ion channel state rendering
    - Test synaptic activity visualization
    - _Requirements: 3.1, 3.4_

- [ ] 9. Implement unified Premium UI design across all modules
  - [~] 9.1 Apply dark theme and glassmorphism to all biology modules
    - Update CSS/Tailwind classes for dark backgrounds
    - Add backdrop-blur effects for glassmorphism
    - Ensure consistent visual hierarchy
    - _Requirements: 4.1, 4.4_

  - [~] 9.2 Integrate neon accent colors (cyan, emerald) consistently
    - Apply neon-cyan and neon-emerald to interactive elements
    - Add glow effects for hover states
    - Ensure accessibility contrast ratios
    - _Requirements: 4.2, 4.5_

  - [~] 9.3 Add framer-motion animations to all interactive elements
    - Implement smooth transitions for stage changes
    - Add entrance/exit animations for components
    - Create micro-interactions for user feedback
    - _Requirements: 4.3_

  - [ ]* 9.4 Write property test for Premium UI style consistency
    - **Property 10: Premium UI style consistency**
    - **Validates: Requirements 4.1, 4.2**

  - [ ]* 9.5 Write property test for animation integration
    - **Property 11: Animation integration completeness**
    - **Validates: Requirements 4.3**

  - [ ]* 9.6 Write property test for layout component standardization
    - **Property 12: Layout component standardization**
    - **Validates: Requirements 4.4**

- [ ] 10. Implement translation management utilities
  - [~] 10.1 Create translation validation script
    - Check key symmetry across EN, CN, DE files
    - Validate translation format and structure
    - Report missing or incomplete translations
    - _Requirements: 5.2, 5.3, 8.1_

  - [~] 10.2 Implement translation fallback mechanism
    - Add fallback to English for missing translations
    - Log missing translation warnings in development
    - Ensure graceful degradation in production
    - _Requirements: 5.4_

  - [~] 10.3 Add support for parameterized translations
    - Implement parameter substitution in translation strings
    - Add type safety for translation parameters
    - Handle edge cases (missing parameters, type mismatches)
    - _Requirements: 5.5, 8.3_

  - [ ]* 10.4 Write property test for translation fallback mechanism
    - **Property 13: Translation fallback mechanism**
    - **Validates: Requirements 5.4**

  - [ ]* 10.5 Write property test for parameterized translation handling
    - **Property 14: Parameterized translation handling**
    - **Validates: Requirements 5.5, 8.3**

- [ ] 11. Optimize performance and user experience
  - [~] 11.1 Implement translation preloading
    - Preload current language translations on module load
    - Cache translations in memory for fast access
    - Implement progressive loading for large translation sets
    - _Requirements: 7.2, 7.5_

  - [~] 11.2 Optimize language switching performance
    - Ensure language switch completes within 200ms
    - Batch UI updates to minimize reflows
    - Add loading states for smooth transitions
    - _Requirements: 7.1_

  - [~] 11.3 Optimize image and animation resources
    - Compress visualization assets
    - Implement lazy loading for non-critical images
    - Use appropriate image formats (WebP, AVIF)
    - _Requirements: 7.3_

  - [ ]* 11.4 Write property test for translation preloading
    - **Property 15: Translation content preloading**
    - **Validates: Requirements 7.2**

  - [ ]* 11.5 Write performance tests for language switching
    - Test language switch completes within 200ms
    - Test UI responsiveness during switch
    - _Requirements: 7.1_

- [ ] 12. Implement comprehensive testing suite
  - [~] 12.1 Set up fast-check for property-based testing
    - Install and configure fast-check library
    - Create test utilities for translation testing
    - Set up test configuration (minimum 100 runs per property)
    - _Requirements: 8.1, 8.2_

  - [~] 12.2 Create automated translation completeness tests
    - Test all translation keys exist in EN, CN, DE
    - Verify translation format correctness
    - Check parameter placeholder consistency
    - _Requirements: 8.1, 8.2_

  - [~] 12.3 Implement UI consistency tests across languages
    - Test layout consistency for all languages
    - Verify functionality parity across languages
    - Check text overflow and truncation handling
    - _Requirements: 8.4_

  - [ ]* 12.4 Write integration tests for complete user flows
    - Test complete learning flow for each module
    - Test language switching during active sessions
    - Test progress persistence across sessions
    - _Requirements: 7.4, 8.4_

- [ ] 13. Final checkpoint - Comprehensive testing and validation
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties (minimum 100 iterations each)
- Unit tests validate specific examples, edge cases, and error conditions
- All property tests should be tagged with: **Feature: biology-i18n-phase2, Property {number}: {property_text}**
- Translation files must maintain strict key symmetry across EN, CN, DE
- All modules must use ChamberLayout for consistent UI structure
- Premium UI styling (dark theme, glassmorphism, neon accents) must be applied consistently
- Basel-contextualized scenarios should reference local research institutions and medical centers
