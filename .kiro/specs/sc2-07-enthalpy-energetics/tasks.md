# Implementation Plan: SC2.07 - Enthalpy & Energetics

## Overview

This implementation plan covers the complete development of the SC2.07 Enthalpy & Energetics module for Sekundarstufe II chemistry students. The module teaches thermochemistry concepts including enthalpy changes, Hess's Law, bond energies, standard formation enthalpies, and calorimetry through interactive exercises and visualizations set in Basel pharmaceutical contexts.

The implementation follows a structured approach:
1. Set up project structure and core interfaces
2. Implement calculation functions (enthalpy, bond energy, calorimetry)
3. Build quest data for all stages and difficulties
4. Create interactive visualizations (energy diagrams, Hess cycles, calorimeter)
5. Implement UI components and navigation
6. Add translations (EN/CN/DE)
7. Comprehensive testing (unit tests and property-based tests)

## Tasks

- [x] 1. Set up project structure and core interfaces
  - Create SC207EnthalpyEnergetics page component
  - Define TypeScript interfaces for quest data structures
  - Set up ChamberLayout integration
  - Create useQuestManager hook for state management
  - _Requirements: 14.1, 16.6_

- [x] 2. Implement core calculation functions
  - [x] 2.1 Implement enthalpy calculation functions
    - Write calculateEnthalpyChange(hReactants, hProducts) → ΔH
    - Write classifyReaction(deltaH) → "exothermic" | "endothermic"
    - Ensure ΔH = H(products) - H(reactants)
    - _Requirements: 1.2, 1.3, 1.4_
  
  - [ ]* 2.2 Write property test for enthalpy calculations
    - **Property 1: Reaction Type Classification by ΔH Sign**
    - **Property 6: Enthalpy Calculation Correctness**
    - **Validates: Requirements 1.2, 1.3, 1.4**
  
  - [x] 2.3 Implement bond energy calculation functions
    - Write calculateBondEnergyDeltaH(bondsBroken, bondsFormed) → ΔH
    - Write countBonds(molecule) → Bond[]
    - Ensure ΔH = Σ(bonds broken) - Σ(bonds formed)
    - _Requirements: 4.2, 4.3, 4.4_
  
  - [ ]* 2.4 Write property test for bond energy calculations
    - **Property 9: Bond Energy Calculation Correctness**
    - **Property 10: Bond Counting Accuracy**
    - **Validates: Requirements 4.2, 4.3, 4.4**
  
  - [x] 2.5 Implement formation enthalpy calculation functions
    - Write calculateFormationDeltaH(reactants, products) → ΔH°
    - Apply stoichiometric coefficients correctly
    - Ensure ΔH° = Σ(coeff × ΔH°f products) - Σ(coeff × ΔH°f reactants)
    - _Requirements: 5.2, 5.3_
  
  - [ ]* 2.6 Write property test for formation enthalpy calculations
    - **Property 11: Formation Enthalpy Calculation Correctness**
    - **Validates: Requirements 5.2, 5.3**
  
  - [x] 2.7 Implement calorimetry calculation functions
    - Write calculateHeat(mass, specificHeat, tempChange) → q
    - Write calculateDeltaHPerMole(heat, moles) → ΔH
    - Write calculateTotalHeat(mass, c, ΔT, calorimeterCapacity) → q_total
    - Ensure q = mcΔT and ΔH = q/(1000n)
    - _Requirements: 6.2, 6.3, 6.4_
  
  - [ ]* 2.8 Write property test for calorimetry calculations
    - **Property 13: Calorimetry Heat Calculation Correctness**
    - **Property 14: Enthalpy Per Mole Calculation**
    - **Property 15: Calorimeter Heat Capacity Inclusion**
    - **Validates: Requirements 6.2, 6.3, 6.4**

- [x] 3. Implement Hess's Law functions
  - [x] 3.1 Implement equation manipulation functions
    - Write reverseEquation(equation) → reversed equation with -ΔH
    - Write multiplyEquation(equation, coefficient) → scaled equation with n×ΔH
    - Write combineEquations(equations) → combined equation
    - _Requirements: 3.3, 3.4_
  
  - [ ]* 3.2 Write property test for Hess's Law operations
    - **Property 3: Hess's Law Equation Reversal**
    - **Property 4: Hess's Law Equation Multiplication**
    - **Validates: Requirements 3.3, 3.4**
  
  - [x] 3.3 Implement pathway validation functions
    - Write validateHessPathway(equations, target) → boolean
    - Write calculatePathwayDeltaH(equations) → total ΔH
    - Verify pathway produces target equation
    - _Requirements: 3.2, 19.5, 19.6_
  
  - [ ]* 3.4 Write property test for pathway validation
    - **Property 7: Hess's Law Pathway Validity**
    - **Property 26: Multi-Step Enthalpy Summation**
    - **Validates: Requirements 3.2, 19.6, 22.3**

- [x] 4. Build quest data for all stages
  - [x] 4.1 Create Energy Changes quest data
    - Build 20 quests (5 per difficulty: BASIC, CORE, ADVANCED, ELITE)
    - Include simple ΔH calculations, exo/endo identification
    - Add Basel pharmaceutical contexts
    - _Requirements: 1.1, 1.5, 2.4, 10.1, 11.1_
  
  - [x] 4.2 Create Hess's Law quest data
    - Build 20 quests (5 per difficulty)
    - Include 2-step pathways (BASIC), 3-step with reversal (CORE)
    - Include formation enthalpy calculations (ADVANCED)
    - Include multi-step pharmaceutical synthesis (ELITE)
    - _Requirements: 3.1, 3.5, 10.2, 10.3, 10.4, 22.2_
  
  - [x] 4.3 Create Calorimetry quest data
    - Build 20 quests (5 per difficulty)
    - Include q = mcΔT (BASIC), ΔH per mole (CORE)
    - Include calorimeter heat capacity (ADVANCED)
    - Include industrial-scale calorimetry (ELITE)
    - _Requirements: 6.1, 6.5, 10.1, 10.2, 10.3, 10.4_
  
  - [ ]* 4.4 Write property test for quest pool generation
    - **Property 2: Quest Pool Size Consistency**
    - **Property 20: Difficulty Progression in Quest Types**
    - Test all stage/difficulty combinations return 5 quests
    - Test total quest count equals 60
    - **Validates: Requirements 1.5, 3.5, 6.5, 10.5, 10.7**

- [ ] 5. Checkpoint - Verify quest data completeness
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Create reference tables
  - [x] 6.1 Create bond energy reference table
    - Include all common bonds with accurate energies (kJ/mol)
    - C-H (413), C-C (347), C=C (614), C≡C (839), C-O (358), C=O (799)
    - O-H (464), N-H (391), H-H (436), O=O (498), N≡N (945), C≡N (891)
    - Make table searchable and accessible during quests
    - _Requirements: 4.7, 20.3, 20.4, 20.5_
  
  - [x] 6.2 Create formation enthalpy reference table
    - Include common compounds with accurate ΔH°f values (kJ/mol)
    - H₂O(l) (-286), CO₂(g) (-394), CH₄(g) (-75), C₂H₅OH(l) (-278)
    - NH₃(g) (-46), HCl(g) (-92)
    - Note that elements in standard states have ΔH°f = 0
    - _Requirements: 5.6, 21.3, 21.4, 21.5_
  
  - [ ]* 6.3 Write property test for reference table completeness
    - **Property 44: Bond Energy Reference Table Completeness**
    - **Property 45: Formation Enthalpy Reference Table Completeness**
    - **Property 46: Elements Standard State Zero Enthalpy**
    - **Validates: Requirements 20.3, 20.4, 20.5, 21.3, 21.4, 21.5**

- [x] 7. Implement visualization components
  - [x] 7.1 Create EnergyDiagram component
    - Display horizontal lines for reactant and product energy levels
    - Show vertical arrow for ΔH (down for exo, up for endo)
    - Color code: red for exothermic, blue for endothermic
    - Display activation energy curve (for ADVANCED/ELITE)
    - Add hover tooltips for numerical values
    - _Requirements: 1.6, 2.5, 2.6, 18.4, 18.5_
  
  - [x] 7.2 Create HessCycleView component
    - Display enthalpy cycle diagram with multiple pathways
    - Show all reaction arrows with ΔH labels
    - Highlight selected pathway on click
    - Use consistent arrow notation (down for exo, up for endo)
    - Display direct and indirect pathways
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.6_
  
  - [x] 7.3 Create BondEnergyView component
    - Display molecular structures with visible bonds
    - Animate bonds breaking (red flash, energy absorbed)
    - Animate bonds forming (green flash, energy released)
    - Show bond energy values next to each bond
    - Use standard bond notation: single (—), double (=), triple (≡)
    - _Requirements: 8.1, 8.2, 8.3, 8.5, 8.7_
  
  - [x] 7.4 Create CalorimeterView component
    - Display calorimeter apparatus with solution
    - Show thermometer with temperature scale
    - Animate temperature change (rising or falling)
    - Display heat flow arrows (red for exo, blue for endo)
    - Show mass, specific heat, and ΔT values
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_
  
  - [ ]* 7.5 Write integration test for visualization synchronization
    - Test visualization updates when quest changes
    - Test all four visualization modes
    - Verify data accuracy in visualizations
    - _Requirements: 1.6, 7.1, 8.1, 9.1_

- [ ] 8. Implement interactive tools
  - [ ] 8.1 Create HessCycleBuilder component
    - Provide list of available equations with ΔH values
    - Allow equation selection (drag-and-drop or click)
    - Add reverse button to flip equation and ΔH sign
    - Add multiply button to scale equation and ΔH
    - Update cycle diagram as equations are selected
    - Verify combined equations equal target
    - Calculate total ΔH from pathway
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 19.6_
  
  - [ ]* 8.2 Write unit test for HessCycleBuilder
    - Test equation selection and deselection
    - Test equation reversal
    - Test equation multiplication
    - Test pathway validation
    - _Requirements: 19.3, 19.4, 19.5_

- [ ] 9. Implement answer verification
  - [ ] 9.1 Add verification logic with tolerance
    - Implement ±1 kJ tolerance for numerical answers
    - Display success feedback in green
    - Display error feedback in red with hints
    - Enable "Next" button only after correct answer
    - _Requirements: 13.1, 13.2, 13.3, 13.4_
  
  - [ ]* 9.2 Write property test for answer verification
    - **Property 8: Answer Verification Tolerance**
    - **Property 28: Answer Verification Correctness**
    - Test verification with exact matches
    - Test verification within ±1 kJ tolerance
    - Test verification outside tolerance
    - **Validates: Requirements 3.7, 13.1, 13.2**
  
  - [ ]* 9.3 Write unit tests for edge cases
    - Test empty input handling
    - Test non-numeric input handling
    - Test extremely large/small numbers
    - Test unit conversion hints (J vs kJ)
    - _Requirements: 13.1, 13.2, 13.3_

- [ ] 10. Checkpoint - Verify core functionality
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Implement LaTeX formula rendering
  - [ ] 11.1 Add react-katex to all formula displays
    - Import InlineMath and BlockMath components
    - Replace plain text formulas with LaTeX rendering
    - Use double backslashes for LaTeX commands (\\text{}, \\Delta, \\rightarrow)
    - _Requirements: 1.7, 15.1, 15.2, 15.3, 15.4_
  
  - [ ] 11.2 Format thermochemical equations correctly
    - Use state symbols in parentheses: (s), (l), (g), (aq)
    - Use proper enthalpy notation: ΔH, ΔH°, ΔH°f
    - Use \\rightarrow for reaction arrows
    - Ensure consistent formatting across all quests
    - _Requirements: 15.5, 15.6, 15.7, 7.7_
  
  - [ ]* 11.3 Write property test for LaTeX rendering
    - **Property 5: React-Katex Rendering Consistency**
    - **Property 17: State Symbol Notation Consistency**
    - **Property 18: Enthalpy Notation Consistency**
    - **Property 19: Reaction Arrow Notation**
    - Test all formulas render without errors
    - **Validates: Requirements 1.7, 15.1, 15.5, 15.6, 15.7**

- [x] 12. Add complete translations (EN/CN/DE)
  - [x] 12.1 Add English translations to i18n
    - Add all scenario descriptions (150-250 words each)
    - Add stage names and UI text
    - Add thermochemistry terms (enthalpy, exothermic, endothermic, etc.)
    - Ensure Basel-specific context in scenarios
    - _Requirements: 11.4, 11.5, 12.1, 12.2_
  
  - [x] 12.2 Add Chinese translations to i18n
    - Translate all scenario descriptions
    - Translate difficulty levels (基础/核心/进阶/精英)
    - Translate stage names and thermochemistry terms (焓/放热/吸热)
    - Keep chemical formulas and numerical values unchanged
    - _Requirements: 12.1, 12.3, 12.5, 12.6_
  
  - [x] 12.3 Add German translations to i18n
    - Translate all scenario descriptions
    - Translate difficulty levels (BASIS/KERN/ERWEITERT/ELITE)
    - Translate stage names and thermochemistry terms (Enthalpie/exotherm/endotherm)
    - Keep chemical formulas and numerical values unchanged
    - _Requirements: 12.1, 12.3, 12.5, 12.6_
  
  - [ ]* 12.4 Write property test for translation completeness
    - **Property 27: Translation Completeness**
    - Test all keys exist in EN/CN/DE
    - Test chemical formulas remain unchanged
    - Test numerical values remain unchanged
    - **Validates: Requirements 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7**

- [ ] 13. Implement Basel-specific scenarios
  - [ ] 13.1 Write scenario descriptions for Energy Changes stage
    - Reference Novartis/Roche pharmaceutical synthesis
    - Reference Basel University Chemistry Department
    - Include specific people, places, situations, numerical values
    - Ensure 150-250 words per scenario
    - _Requirements: 11.1, 11.2, 11.4, 11.5_
  
  - [ ] 13.2 Write scenario descriptions for Hess's Law stage
    - Reference Basel Chemistry Institute
    - Reference pharmaceutical process optimization
    - Include multi-step synthesis pathways for ELITE
    - Ensure 150-250 words per scenario
    - _Requirements: 11.1, 11.2, 11.4, 11.5, 11.6_
  
  - [ ] 13.3 Write scenario descriptions for Calorimetry stage
    - Reference Basel University experiments
    - Reference Roche pharmaceutical manufacturing
    - Include industrial calorimetry for ELITE
    - Ensure 150-250 words per scenario
    - _Requirements: 11.1, 11.3, 11.4, 11.5_
  
  - [ ]* 13.4 Write property test for Basel context and scenario quality
    - **Property 21: Basel Context Inclusion**
    - **Property 22: Scenario Description Length**
    - **Property 23: Scenario Content Richness**
    - **Property 24: ELITE Pharmaceutical Authenticity**
    - **Validates: Requirements 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7**

- [ ] 14. Implement navigation and state management
  - [ ] 14.1 Add stage navigation logic
    - Implement stage switching (Energy Changes, Hess's Law, Calorimetry)
    - Reset to first quest when stage changes
    - Visually indicate current stage
    - Allow stage changes at any time
    - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5_
  
  - [ ] 14.2 Add difficulty navigation logic
    - Implement difficulty switching (BASIC, CORE, ADVANCED, ELITE)
    - Load independent quest pools (5 quests per stage/difficulty)
    - Reset to first quest when difficulty changes
    - _Requirements: 10.5, 10.7_
  
  - [ ] 14.3 Implement quest progression logic
    - Enable "Next" button only after successful verification
    - Advance to next quest on "Next" click
    - Prevent skipping ahead without solving
    - Track quest completion status
    - _Requirements: 13.4, 13.5, 13.6_
  
  - [ ] 14.4 Implement stage completion tracking
    - Mark stage complete when all 5 quests verified
    - Persist completion status across sessions (localStorage)
    - Allow stage/difficulty changes after completion
    - _Requirements: 13.7, 17.6, 17.7_
  
  - [ ]* 14.5 Write property test for navigation and state management
    - **Property 29: Navigation State Management**
    - **Property 30: Stage Completion Detection**
    - **Property 39: Stage Configuration**
    - **Property 40: Stage-Specific Quest Loading**
    - **Property 41: Stage Progress Independence**
    - **Property 42: Stage Completion Persistence**
    - **Validates: Requirements 13.4, 13.5, 13.6, 13.7, 17.1, 17.2, 17.3, 17.5, 17.6, 17.7**

- [ ] 15. Checkpoint - Verify navigation and state
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 16. Implement responsive layout
  - [ ] 16.1 Verify ChamberLayout usage
    - Ensure two-column layout on desktop (≥768px)
    - Ensure vertical stack on mobile (<768px)
    - Verify all text is readable (min 14px)
    - _Requirements: 16.1, 16.2, 16.3, 16.7_
  
  - [ ] 16.2 Verify accessibility requirements
    - Ensure buttons are at least 44px tall
    - Ensure input fields are at least 44px tall
    - Test touch targets on mobile devices
    - _Requirements: 16.4_
  
  - [ ] 16.3 Verify visualization scaling
    - Ensure visualizations scale proportionally
    - Maintain aspect ratio on resize
    - Test on various screen sizes
    - Verify no horizontal scrolling
    - _Requirements: 16.5, 16.7_
  
  - [ ]* 16.4 Write property test for responsive layout
    - **Property 34: Responsive Layout Breakpoint**
    - **Property 35: Accessibility Minimum Sizes**
    - **Property 36: Visualization Aspect Ratio Preservation**
    - **Property 37: ChamberLayout Component Usage**
    - **Property 38: Horizontal Scroll Prevention**
    - **Validates: Requirements 16.2, 16.3, 16.4, 16.5, 16.6, 16.7**

- [ ] 17. Add comprehensive unit testing
  - [ ]* 17.1 Write unit tests for calculation functions
    - Test enthalpy calculations with known values
    - Test bond energy calculations
    - Test formation enthalpy calculations
    - Test calorimetry calculations
    - Test edge cases (zero, negative, very large values)
    - _Requirements: 1.2, 4.2, 5.2, 6.2_
  
  - [ ]* 17.2 Write unit tests for Hess's Law functions
    - Test equation reversal
    - Test equation multiplication
    - Test pathway validation
    - Test pathway ΔH summation
    - _Requirements: 3.3, 3.4, 3.2, 19.6_
  
  - [ ]* 17.3 Write unit tests for quest generation
    - Test buildStagePool for all stages and difficulties
    - Test quest pool contains exactly 5 quests
    - Test quest objects have all required fields
    - Test expected answers are calculated correctly
    - _Requirements: 14.1, 14.2, 14.3_
  
  - [ ]* 17.4 Write unit tests for answer verification
    - Test exact match acceptance
    - Test ±1 kJ tolerance acceptance
    - Test outside tolerance rejection
    - Test non-numeric input rejection
    - Test empty input rejection
    - _Requirements: 13.1, 13.2, 13.3_

- [ ] 18. Add property-based testing
  - [ ]* 18.1 Configure fast-check for property testing
    - Set up fast-check library
    - Configure minimum 100 iterations per test
    - Add property test tags: "Feature: sc2-07-enthalpy-energetics, Property N: [description]"
    - _Requirements: All (testing framework)_
  
  - [ ]* 18.2 Write remaining property tests
    - Implement all 46 properties from design document
    - Ensure each property references design document
    - Test with random generated inputs
    - Verify all properties pass with 100+ iterations
    - _Requirements: All (comprehensive property coverage)_

- [ ] 19. Browser testing
  - [ ] 19.1 Test in Chrome/Edge
    - Load module and verify no console errors
    - Test all quests display correctly
    - Test input fields and buttons work
    - Test visualizations render and animate
    - Test language switching
    - Test responsive layout
    - _Requirements: All_
  
  - [ ] 19.2 Test in Firefox
    - Repeat all tests from Chrome/Edge
    - Verify LaTeX formulas render correctly
    - Verify animations work smoothly
    - _Requirements: All_
  
  - [ ] 19.3 Test in Safari
    - Repeat all tests from Chrome/Edge
    - Verify iOS compatibility (if applicable)
    - Verify all features work
    - _Requirements: All_
  
  - [ ] 19.4 Test on mobile devices
    - Test on iOS Safari
    - Test on Android Chrome
    - Verify touch interactions work
    - Verify responsive layout
    - _Requirements: 16.2, 16.4_

- [ ] 20. Final checkpoint - Complete module verification
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties (minimum 100 iterations each)
- Unit tests validate specific examples and edge cases
- Integration tests validate end-to-end flows
- Browser testing ensures cross-platform compatibility

## Testing Configuration

**Property-Based Testing**:
- Library: fast-check (TypeScript/JavaScript)
- Minimum iterations: 100 per test
- Tag format: `// Feature: sc2-07-enthalpy-energetics, Property N: [description]`

**Unit Testing**:
- Framework: Jest with React Testing Library
- Coverage target: 80% for core logic
- Focus on calculation functions, quest generation, and edge cases

**Integration Testing**:
- Framework: Jest with React Testing Library
- Test complete user flows
- Test component interactions

**Browser Testing**:
- Manual testing in Chrome, Firefox, Safari
- Mobile testing on iOS and Android
- Verify no console errors or warnings
