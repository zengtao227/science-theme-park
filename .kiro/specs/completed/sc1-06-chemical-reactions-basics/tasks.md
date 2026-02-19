# Implementation Plan: SC1.06 - Chemical Reactions Basics

## Overview

This implementation plan covers the SC1.06 Chemical Reactions Basics module, an interactive educational web application teaching students about chemical reactions. The module consists of three stages (Reaction Types, Equation Balancing, Reaction Simulation), each with four difficulty levels (BASIC, CORE, ADVANCED, ELITE), providing 60-65 total quests. All content is available in three languages (EN/CN/DE) with Basel-specific pharmaceutical scenarios.

Key implementation areas:
1. Core data structures and quest generation (60-65 quests total)
2. Interactive equation balancer with real-time atom count verification
3. Reaction type classifier with pattern recognition
4. Molecular simulator with animated bond breaking/forming
5. LaTeX rendering for chemical equations using react-katex (four-backslash standard)
6. Three-language support with Basel pharmaceutical contexts
7. Comprehensive testing including 12 property-based tests

## Tasks

- [x] 1. Set up project structure and core interfaces
  - [x] 1.1 Create TypeScript interfaces for chemical data models
    - Define ChemicalEquation, Compound, ElementCount interfaces
    - Define SC106Quest interface extending base Quest
    - Define ReactionType, ReactionMechanism, AtomCountMap types
    - Define Stage and Difficulty enums
    - _Requirements: 11.1, 11.3, 11.4, 11.7_
  
  - [x] 1.2 Set up react-katex for LaTeX rendering
    - Install react-katex and @types/katex dependencies
    - Import InlineMath and BlockMath components
    - Configure four-backslash standard for LaTeX commands
    - _Requirements: 1.4, 12.1, 12.2, 12.3, 12.4_
  
  - [x] 1.3 Create utility functions for chemical formulas
    - Implement formulaToLatex() conversion function
    - Implement parseCompound() to extract elements and counts
    - Implement validateChemicalNotation() for IUPAC standards
    - _Requirements: 1.7, 11.5, 12.5, 12.6, 12.7_


- [x] 2. Implement atom count calculation and balancing logic
  - [x] 2.1 Implement calculateAtomCounts() function
    - Parse compounds to extract element counts
    - Apply coefficients to calculate total atoms
    - Return AtomCountMap with reactant and product counts
    - Handle polyatomic ions (e.g., Ca(OH)₂, H₂SO₄)
    - _Requirements: 2.2, 10.2_
  
  - [ ]* 2.2 Write property test for atom count balance verification
    - **Property 2: Atom Count Balance Verification**
    - **Validates: Requirements 2.2, 10.2**
  
  - [x] 2.3 Implement equation balancing verification
    - Check if all elements have equal counts on both sides
    - Return boolean indicating if equation is balanced
    - Identify unbalanced elements for feedback
    - _Requirements: 2.2, 2.3, 2.4_
  
  - [ ]* 2.4 Write property test for unbalanced element identification
    - **Property 11: Unbalanced Element Identification**
    - **Validates: Requirements 2.4, 4.4**
  
  - [x] 2.5 Implement coefficient validation
    - Accept only positive integers (≥ 1)
    - Reject zero, negative, decimal, and non-numeric input
    - Return validation errors with helpful messages
    - _Requirements: 4.8_
  
  - [ ]* 2.6 Write property test for coefficient validation
    - **Property 9: Coefficient Validation**
    - **Validates: Requirements 4.8**

- [x] 3. Implement reaction type classification
  - [x] 3.1 Implement classifyReaction() function
    - Detect synthesis: A + B → AB
    - Detect decomposition: AB → A + B
    - Detect single replacement: A + BC → AC + B
    - Detect double replacement: AB + CD → AD + CB
    - Detect combustion: CₓHᵧ + O₂ → CO₂ + H₂O
    - _Requirements: 3.2, 3.3, 10.3_
  
  - [ ]* 3.2 Write property test for reaction type classification
    - **Property 3: Reaction Type Classification Correctness**
    - **Validates: Requirements 3.2, 3.3, 10.3**
  
  - [x] 3.3 Implement reaction pattern matching
    - Analyze reactant and product structures
    - Count elements and compounds on each side
    - Return reaction type with confidence score
    - _Requirements: 3.2, 5.1_

- [x] 4. Checkpoint - Verify core calculation logic
  - Ensure all tests pass, ask the user if questions arise.


- [x] 5. Create quest data for Reaction Types stage
  - [x] 5.1 Create BASIC difficulty quest data (5 quests)
    - Simple synthesis reactions (H₂ + O₂ → H₂O)
    - Simple decomposition reactions (H₂O → H₂ + O₂)
    - Clear examples with 2-3 substances
    - Add Basel context (water treatment, chemistry lab)
    - _Requirements: 1.5, 3.4, 3.6, 7.1, 8.1, 8.2, 8.4_
  
  - [x] 5.2 Create CORE difficulty quest data (5 quests)
    - Single replacement (Zn + HCl → ZnCl₂ + H₂)
    - Double replacement (NaCl + AgNO₃ → NaNO₃ + AgCl)
    - Requires pattern analysis
    - Add Novartis/Roche research lab contexts
    - _Requirements: 3.4, 3.7, 7.2, 8.1, 8.2, 8.4_
  
  - [x] 5.3 Create ADVANCED difficulty quest data (5 quests)
    - Organic combustion (CH₄ + O₂ → CO₂ + H₂O)
    - Complex synthesis reactions
    - Ambiguous cases requiring deeper understanding
    - Add Basel heating facility and industrial contexts
    - _Requirements: 3.4, 3.8, 7.3, 8.1, 8.2, 8.4_
  
  - [x] 5.4 Create ELITE difficulty quest data (5 quests)
    - Pharmaceutical synthesis (C₆H₅COOH + CH₃OH → C₆H₅COOCH₃ + H₂O)
    - Complex redox and acid-base reactions
    - Real pharmaceutical processes from Roche/Novartis
    - Add authentic Basel pharmaceutical contexts
    - _Requirements: 3.4, 3.9, 7.4, 8.1, 8.2, 8.4, 8.7_
  
  - [ ]* 5.5 Write property test for Basel context inclusion
    - **Property 18: Basel Context Inclusion**
    - **Validates: Requirements 8.1, 8.2, 8.3**

- [x] 6. Create quest data for Equation Balancing stage
  - [x] 6.1 Create BASIC difficulty quest data (5 quests)
    - Coefficients 1-3 only
    - Simple compounds (H₂, O₂, H₂O, N₂, NH₃)
    - Binary compounds (NaCl, CO₂, H₂O)
    - Add Basel University and fuel cell contexts
    - _Requirements: 1.5, 2.5, 2.7, 7.1, 8.1, 8.2, 8.4_
  
  - [x] 6.2 Create CORE difficulty quest data (5 quests)
    - Coefficients up to 5
    - Polyatomic ions (Ca(OH)₂, H₃PO₄, Ca₃(PO₄)₂)
    - More complex balancing
    - Add Basel water treatment contexts
    - _Requirements: 2.5, 2.8, 7.2, 8.1, 8.2, 8.4_
  
  - [x] 6.3 Create ADVANCED difficulty quest data (5 quests)
    - Coefficients up to 10
    - Organic compounds (C₃H₈, C₂H₅OH)
    - Combustion reactions
    - Add Basel Chemistry Institute contexts
    - _Requirements: 2.5, 2.9, 7.3, 8.1, 8.2, 8.4_
  
  - [x] 6.4 Create ELITE difficulty quest data (5 quests)
    - Complex pharmaceutical synthesis (aspirin, acetylation)
    - Large coefficients and complex molecules
    - Real Novartis/Roche synthesis processes
    - Add authentic pharmaceutical plant contexts
    - _Requirements: 2.5, 2.10, 7.4, 8.1, 8.2, 8.4, 8.7_
  
  - [ ]* 6.5 Write property test for coefficient range by difficulty
    - **Property 8: Coefficient Range by Difficulty**
    - **Validates: Requirements 2.7, 2.8, 2.9, 2.10**


- [x] 7. Create quest data for Reaction Simulation stage
  - [x] 7.1 Create BASIC difficulty quest data (5 quests)
    - Simple molecular animations (H₂ + Cl₂ → HCl)
    - Clear bond breaking and forming
    - Exothermic/endothermic indicators
    - Add Basel laboratory demonstration contexts
    - _Requirements: 3.4, 6.1, 6.8, 7.1, 8.1, 8.2, 8.4_
  
  - [x] 7.2 Create CORE difficulty quest data (5 quests)
    - Multiple bond changes (CH₄ + O₂ → CO₂ + H₂O)
    - More complex molecular structures
    - Energy diagrams
    - Add Basel laboratory contexts
    - _Requirements: 3.4, 6.1, 6.8, 7.2, 8.1, 8.2, 8.4_
  
  - [x] 7.3 Create ADVANCED difficulty quest data (5 quests)
    - Organic reactions with mechanisms (C₂H₄ + H₂ → C₂H₆)
    - Hydrogenation and addition reactions
    - Mechanism steps included
    - Add Roche chemical synthesis contexts
    - _Requirements: 3.4, 6.1, 6.8, 7.3, 8.1, 8.2, 8.4, 15.1_
  
  - [x] 7.4 Create ELITE difficulty quest data (5 quests)
    - Pharmaceutical synthesis with detailed mechanisms
    - Acetylation, esterification reactions
    - Intermediates and transition states
    - Real Novartis Basel drug synthesis processes
    - _Requirements: 3.4, 6.1, 6.8, 7.4, 8.1, 8.2, 8.4, 8.7, 15.1, 15.3, 15.4, 15.7_
  
  - [ ]* 7.5 Write property test for quest pool size consistency
    - **Property 4: Quest Pool Size Consistency**
    - **Validates: Requirements 1.5, 2.5, 3.4, 7.5, 7.7, 11.2**

- [x] 8. Checkpoint - Verify quest data completeness
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Implement buildStagePool() quest generation function
  - [x] 9.1 Implement quest pool generation logic
    - Filter quests by stage and difficulty
    - Map data to SC106Quest objects
    - Generate LaTeX strings for all equations
    - Calculate correct answers (coefficients or types)
    - Return array of exactly 5 quests per stage/difficulty
    - _Requirements: 1.5, 2.5, 3.4, 11.2_
  
  - [x] 9.2 Implement LaTeX generation for chemical equations
    - Convert formulas to LaTeX with four backslashes
    - Use \\text{} for element symbols
    - Use subscripts (_) and superscripts (^) correctly
    - Use \\rightarrow for reaction arrows
    - _Requirements: 1.4, 12.4, 12.5, 12.6, 12.7, 12.8_
  
  - [ ]* 9.3 Write property test for LaTeX formatting consistency
    - **Property 1: LaTeX Formatting Consistency**
    - **Validates: Requirements 1.4, 11.6, 12.4, 12.8**
  
  - [ ]* 9.4 Write property test for quest data structure completeness
    - **Property 14: Quest Data Structure Completeness**
    - **Validates: Requirements 11.1, 11.3, 11.4, 11.7**


- [x] 10. Implement translations for all three languages
  - [x] 10.1 Add complete English translations to i18n
    - Add module title and all UI text
    - Add stage names (Reaction Types, Equation Balancing, Reaction Simulation)
    - Add difficulty levels (BASIC, CORE, ADVANCED, ELITE)
    - Add reaction type names (synthesis, decomposition, etc.)
    - Add all scenario descriptions (150-250 words each)
    - Add button labels (Verify, Next, Reset, Play, Pause, Restart)
    - Add feedback messages (correct, incorrect, hints)
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_
  
  - [x] 10.2 Add complete Chinese translations to i18n
    - Translate all UI text to Chinese
    - Translate stage names (反应类型, 方程式配平, 反应模拟)
    - Translate difficulty levels (基础, 核心, 进阶, 精英)
    - Translate reaction types (化合, 分解, 置换, 复分解, 燃烧)
    - Translate all scenario descriptions
    - Keep chemical formulas unchanged
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_
  
  - [x] 10.3 Add complete German translations to i18n
    - Translate all UI text to German
    - Translate stage names (Reaktionstypen, Gleichungsausgleich, Reaktionssimulation)
    - Translate difficulty levels (BASIS, KERN, ERWEITERT, ELITE)
    - Translate reaction types (Synthese, Zersetzung, Einfachersatz, Doppelaustausch, Verbrennung)
    - Translate all scenario descriptions
    - Keep chemical formulas unchanged
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_
  
  - [ ]* 10.4 Write property test for translation completeness
    - **Property 5: Translation Completeness**
    - **Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7**

- [x] 11. Implement EquationBalancer component
  - [x] 11.1 Create EquationBalancer component structure
    - Create input fields for each compound's coefficient
    - Display chemical equation with LaTeX rendering
    - Show atom count table with elements as rows
    - Add Verify, Reset, and Hint buttons
    - _Requirements: 4.1, 4.5, 4.6, 4.7_
  
  - [x] 11.2 Implement real-time atom count updates
    - Update atom counts immediately on coefficient change
    - Highlight balanced elements in green
    - Highlight unbalanced elements in red
    - Display counts for reactants and products side by side
    - _Requirements: 4.2, 4.3, 4.4_
  
  - [ ]* 11.3 Write property test for real-time atom count updates
    - **Property 10: Real-Time Atom Count Updates**
    - **Validates: Requirements 4.2**
  
  - [x] 11.4 Implement hint generation
    - Identify unbalanced elements
    - Suggest coefficient adjustments
    - Display hints in user-friendly language
    - _Requirements: 4.7_
  
  - [ ]* 11.5 Write property test for hint generation relevance
    - **Property 12: Hint Generation Relevance**
    - **Validates: Requirements 4.7**
  
  - [x] 11.6 Implement coefficient reset functionality
    - Reset all coefficients to 1 (default)
    - Clear all user inputs
    - Reset atom count display
    - _Requirements: 4.6_
  
  - [ ]* 11.7 Write property test for coefficient reset completeness
    - **Property 13: Coefficient Reset Completeness**
    - **Validates: Requirements 4.6**


- [x] 12. Implement ReactionTypeSelector component
  - [x] 12.1 Create ReactionTypeSelector component structure
    - Create radio buttons or dropdown for five reaction types
    - Display reaction type patterns (A+B→AB, etc.)
    - Show examples from daily life and industry
    - Add immediate visual feedback on selection
    - _Requirements: 5.1, 5.2, 5.4_
  
  - [x] 12.2 Implement reaction type verification
    - Verify selected type matches expected classification
    - Display success message with explanation for correct answers
    - Display error message with correct type for incorrect answers
    - _Requirements: 5.3, 5.7, 5.8_
  
  - [x] 12.3 Add reaction type examples and patterns
    - Display general pattern for each type
    - Show specific examples for each type
    - Include Basel pharmaceutical and industrial examples
    - _Requirements: 5.5, 5.6_

- [ ] 13. Implement ChemistryVisualization component
  - [ ] 13.1 Create ChemistryVisualization component structure
    - Create container with stage-based rendering logic
    - Implement ReactionTypesView sub-component
    - Implement EquationBalancerView sub-component
    - Implement ReactionSimulatorView sub-component
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  
  - [ ] 13.2 Implement ReactionTypesView
    - Display reaction pattern (e.g., A + B → AB)
    - Show specific example with molecular structures
    - Color-code reactants (blue) and products (green)
    - Display reaction type name and description
    - Show real-world Basel examples
    - _Requirements: 5.1, 5.4, 5.5, 5.6, 5.7_
  
  - [ ] 13.3 Implement EquationBalancerView
    - Display atom count table with elements as rows
    - Show reactant side counts vs product side counts
    - Highlight balanced elements in green, unbalanced in red
    - Display coefficient values above each compound
    - Show visual balance scale metaphor
    - _Requirements: 4.2, 4.3, 4.4, 5.4, 5.5, 5.6_
  
  - [ ] 13.4 Implement ReactionSimulatorView base structure
    - Create canvas or SVG container for molecular animation
    - Set up animation controls (play, pause, restart)
    - Display energy diagram (exothermic/endothermic)
    - Show reaction progress bar
    - _Requirements: 6.1, 6.7, 6.8, 5.4, 5.5, 5.6_

- [x] 14. Checkpoint - Verify component functionality
  - Ensure all tests pass, ask the user if questions arise.


- [ ] 15. Implement molecular animation for ReactionSimulatorView
  - [ ] 15.1 Implement molecular structure rendering
    - Use standard atom colors (H=white, O=red, C=black, N=blue, Cl=green, S=yellow, P=orange)
    - Display atoms as spheres with correct colors
    - Display bonds as lines or cylinders
    - Use ball-and-stick model representation
    - _Requirements: 6.2, 6.5_
  
  - [ ]* 15.2 Write property test for atom color coding consistency
    - **Property 32: Atom Color Coding Consistency**
    - **Validates: Requirements 6.5**
  
  - [ ] 15.3 Implement bond breaking and forming animations
    - Animate bonds breaking with red flash effect
    - Animate bonds forming with green flash effect
    - Show smooth transitions between states
    - Use Framer Motion or CSS animations
    - _Requirements: 6.3, 6.4_
  
  - [ ] 15.4 Implement animation controls
    - Play button starts animation from current position
    - Pause button stops animation at current frame
    - Restart button resets to initial state
    - Display current animation progress
    - _Requirements: 6.7_
  
  - [ ]* 15.5 Write property test for simulator control functionality
    - **Property 33: Simulator Control Functionality**
    - **Validates: Requirements 6.7**
  
  - [ ] 15.6 Implement energy change visualization
    - Display energy diagram showing reactants and products
    - Show exothermic reactions (energy released, downward arrow)
    - Show endothermic reactions (energy absorbed, upward arrow)
    - Animate energy level changes during reaction
    - _Requirements: 6.8_
  
  - [ ]* 15.7 Write property test for energy change display
    - **Property 34: Energy Change Display**
    - **Validates: Requirements 6.8**

- [ ] 16. Implement ELITE difficulty reaction mechanisms
  - [ ] 16.1 Create ReactionMechanism data structure
    - Define MechanismStep interface with electron movement
    - Define intermediate species and transition states
    - Store mechanism data for ELITE quests
    - _Requirements: 15.1, 15.3, 15.4_
  
  - [ ] 16.2 Implement mechanism visualization
    - Display mechanism steps sequentially
    - Show curved arrows for electron movement
    - Display intermediate species
    - Show transition states with dashed structures
    - _Requirements: 15.2, 15.5_
  
  - [ ]* 16.3 Write property test for Elite mechanism visualization
    - **Property 35: Elite Mechanism Visualization**
    - **Validates: Requirements 15.1, 15.3, 15.4**
  
  - [ ] 16.4 Implement mechanism step navigation
    - Add forward/backward buttons for mechanism steps
    - Display current step number and description
    - Highlight active step in mechanism sequence
    - _Requirements: 15.6_
  
  - [ ]* 16.5 Write property test for mechanism step navigation
    - **Property 36: Mechanism Step Navigation**
    - **Validates: Requirements 15.6**
  
  - [ ] 16.6 Add pharmaceutical mechanism authenticity
    - Use real reaction pathways from Basel drug synthesis
    - Include authentic intermediate species
    - Reference actual Novartis/Roche processes
    - _Requirements: 15.7_
  
  - [ ]* 16.7 Write property test for pharmaceutical mechanism authenticity
    - **Property 38: Pharmaceutical Mechanism Authenticity**
    - **Validates: Requirements 15.7**


- [x] 17. Implement SC106ChemicalReactions main page component
  - [x] 17.1 Create SC106ChemicalReactions component structure
    - Set up useQuestManager hook integration
    - Initialize state for current equation and atom counts
    - Implement stage and difficulty change handlers
    - Set up language switching via i18n
    - _Requirements: 9.1, 14.1, 14.2_
  
  - [x] 17.2 Implement quest pool building
    - Call buildStagePool() for current stage and difficulty
    - Load initial quest (index 0)
    - Update visualization when quest changes
    - _Requirements: 1.5, 2.5, 3.4, 11.2_
  
  - [x] 17.3 Implement answer verification logic
    - For balancing: verify all atom counts are equal
    - For classification: verify selected type matches expected
    - Display success/error feedback
    - Enable "Next" button only after correct answer
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_
  
  - [ ]* 17.4 Write property test for answer verification correctness
    - **Property 22: Answer Verification Correctness**
    - **Validates: Requirements 10.1**
  
  - [x] 17.5 Implement navigation logic
    - "Next" button advances to next quest
    - Reset quest index when stage or difficulty changes
    - Track stage completion status
    - Persist progress in localStorage
    - _Requirements: 10.6, 10.7, 10.8, 14.3, 14.6, 14.7_
  
  - [ ]* 17.6 Write property test for navigation state management
    - **Property 23: Navigation State Management**
    - **Validates: Requirements 10.6, 10.7, 10.8**

- [ ] 18. Implement stage and difficulty management
  - [ ] 18.1 Implement stage switching
    - Create stage selector UI (Reaction Types, Equation Balancing, Reaction Simulation)
    - Load appropriate quest pool when stage changes
    - Reset to first quest (index 0)
    - Update visualization to match stage
    - _Requirements: 14.1, 14.2, 14.3_
  
  - [ ]* 18.2 Write property test for stage-specific quest loading
    - **Property 29: Stage-Specific Quest Loading**
    - **Validates: Requirements 14.2, 14.3**
  
  - [ ] 18.3 Implement difficulty switching
    - Create difficulty selector UI (BASIC, CORE, ADVANCED, ELITE)
    - Load independent quest pools (not cumulative)
    - Reset to first quest when difficulty changes
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  
  - [ ] 18.4 Implement stage progress independence
    - Track progress separately for each stage
    - Preserve progress when switching stages
    - Allow users to switch freely between stages
    - _Requirements: 14.5_
  
  - [ ]* 18.5 Write property test for stage progress independence
    - **Property 30: Stage Progress Independence**
    - **Validates: Requirements 14.5**
  
  - [ ] 18.6 Implement stage completion tracking
    - Mark stage as complete when all quests verified
    - Persist completion status across sessions
    - Display completion indicators in UI
    - _Requirements: 14.6, 14.7_
  
  - [ ]* 18.7 Write property test for stage completion tracking
    - **Property 31: Stage Completion Tracking**
    - **Validates: Requirements 14.6, 14.7**

- [ ] 19. Checkpoint - Verify core module functionality
  - Ensure all tests pass, ask the user if questions arise.


- [ ] 20. Implement responsive layout and accessibility
  - [ ] 20.1 Integrate ChamberLayout component
    - Use ChamberLayout for two-column structure
    - Place quest content in left panel
    - Place visualization in right panel
    - Ensure proper header and footer integration
    - _Requirements: 13.1_
  
  - [ ] 20.2 Implement responsive breakpoints
    - Two-column layout for screens ≥768px
    - Vertical stack for screens <768px
    - Quest content above visualization on mobile
    - _Requirements: 13.2_
  
  - [ ]* 20.3 Write property test for responsive layout breakpoint
    - **Property 24: Responsive Layout Breakpoint**
    - **Validates: Requirements 13.2**
  
  - [ ] 20.4 Ensure accessibility minimum sizes
    - Set minimum font size to 14px for all text
    - Set minimum height to 44px for all interactive elements
    - Ensure touch targets meet accessibility standards
    - _Requirements: 13.3, 13.4_
  
  - [ ]* 20.5 Write property test for accessibility minimum sizes
    - **Property 25: Accessibility Minimum Sizes**
    - **Validates: Requirements 13.3, 13.4**
  
  - [ ] 20.6 Implement visualization aspect ratio preservation
    - Maintain constant aspect ratio during resize
    - Prevent distortion of molecular structures
    - Scale proportionally on all screen sizes
    - _Requirements: 13.5_
  
  - [ ]* 20.7 Write property test for visualization aspect ratio preservation
    - **Property 26: Visualization Aspect Ratio Preservation**
    - **Validates: Requirements 13.5**
  
  - [ ] 20.8 Prevent horizontal scrolling
    - Ensure all content fits within viewport width
    - Test on various screen sizes
    - Use responsive units (%, vw, rem)
    - _Requirements: 13.7_
  
  - [ ]* 20.9 Write property test for horizontal scroll prevention
    - **Property 27: Horizontal Scroll Prevention**
    - **Validates: Requirements 13.7**

- [ ] 21. Implement error handling
  - [ ] 21.1 Add input validation error handling
    - Display error messages for invalid coefficients
    - Handle non-numeric input gracefully
    - Provide helpful error messages
    - _Requirements: 4.8_
  
  - [ ] 21.2 Add quest loading error handling
    - Handle missing quest data gracefully
    - Display loading states
    - Retry failed quest loads
    - Log errors for debugging
    - _Requirements: 11.1, 11.3_
  
  - [ ] 21.3 Add LaTeX rendering error handling
    - Fall back to plain text if LaTeX fails
    - Display warning for rendering issues
    - Ensure functionality remains intact
    - _Requirements: 12.1, 12.2_
  
  - [ ] 21.4 Add visualization error handling
    - Fall back to simplified visualizations if needed
    - Handle missing molecular data
    - Display static structures if animation fails
    - _Requirements: 5.4, 6.1_
  
  - [ ] 21.5 Add translation error handling
    - Fall back to English for missing translations
    - Log missing translation keys
    - Continue with available translations
    - _Requirements: 9.1, 9.2_


- [ ] 22. Add comprehensive unit testing
  - [ ]* 22.1 Write unit tests for quest generation
    - Test buildStagePool for all stages and difficulties
    - Test quest pool contains exactly 5 quests
    - Test quest objects have all required fields
    - Test LaTeX strings are properly formatted
    - Test coefficients are within expected ranges
    - Test reaction types are correctly assigned
  
  - [ ]* 22.2 Write unit tests for atom count calculation
    - Test with simple compounds (H₂O, CO₂)
    - Test with polyatomic ions (Ca(OH)₂, H₂SO₄)
    - Test with organic compounds (C₆H₁₂O₆, CH₃COOH)
    - Test with complex pharmaceutical molecules
    - Test edge cases (single atoms, large coefficients)
  
  - [ ]* 22.3 Write unit tests for equation balancing
    - Test with balanced equations
    - Test with unbalanced equations
    - Test with partially balanced equations
    - Test with all coefficients = 1
    - Test with large coefficients (> 10)
  
  - [ ]* 22.4 Write unit tests for reaction type classification
    - Test synthesis reactions (A + B → AB)
    - Test decomposition reactions (AB → A + B)
    - Test single replacement (A + BC → AC + B)
    - Test double replacement (AB + CD → AD + CB)
    - Test combustion reactions (CₓHᵧ + O₂ → CO₂ + H₂O)
  
  - [ ]* 22.5 Write unit tests for LaTeX formatting
    - Test formulaToLatex conversion
    - Test four-backslash formatting
    - Test subscripts and superscripts
    - Test reaction arrows
    - Test no Unicode characters in output
  
  - [ ]* 22.6 Write unit tests for input validation
    - Test coefficient validation (positive integers only)
    - Test rejection of zero, negative, decimal values
    - Test rejection of non-numeric input
    - Test empty input handling
    - Test very large numbers

- [ ]* 23. Add integration testing
  - [ ]* 23.1 Write end-to-end quest flow tests
    - Test load module → verify initial quest displays
    - Test enter coefficients → verify atom counts update
    - Test enter correct answer → verify success feedback
    - Test click "Next" → verify next quest loads
    - Test complete all 5 quests → verify stage completion
  
  - [ ]* 23.2 Write visualization synchronization tests
    - Test quest change updates visualization
    - Test stage change updates visualization type
    - Test coefficient change updates atom count display
    - Test animation controls work correctly
  
  - [ ]* 23.3 Write language switching tests
    - Test load in English → verify all text is English
    - Test switch to Chinese → verify text updates
    - Test switch to German → verify text updates
    - Test chemical formulas remain unchanged
  
  - [ ]* 23.4 Write navigation tests
    - Test stage switching loads correct quest pool
    - Test difficulty switching loads correct quest pool
    - Test progress persists within stage/difficulty
    - Test stage completion tracking

- [ ] 24. Checkpoint - Verify testing coverage
  - Ensure all tests pass, ask the user if questions arise.


- [ ] 25. Browser testing and validation
  - [ ] 25.1 Test in Chrome/Edge
    - Load module and verify no console errors
    - Test all quests display correctly with LaTeX rendering
    - Test coefficient input fields accept numeric input
    - Test reaction type selector displays all options
    - Test Verify button triggers validation
    - Test Next button advances to next quest
    - Test Reset button clears coefficients
    - Test visualizations render correctly
    - Test animations play smoothly (60fps target)
    - Test language switching works
    - Test responsive layout on various screen sizes
    - _Requirements: All_
  
  - [ ] 25.2 Test in Firefox
    - Repeat all tests from Chrome/Edge
    - Verify LaTeX formulas render correctly
    - Verify animations work smoothly
    - Verify molecular structures display correctly
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
    - Test coefficient input on mobile keyboards
    - Test animation performance on mobile
    - _Requirements: 13.2, 13.3, 13.4_

- [ ] 26. Performance optimization
  - [ ] 26.1 Optimize quest loading performance
    - Ensure initial page load < 2 seconds
    - Ensure quest transition < 200ms
    - Lazy load quest data if needed
    - _Requirements: Performance targets_
  
  - [ ] 26.2 Optimize real-time updates
    - Ensure coefficient input response < 50ms
    - Debounce atom count calculations if needed
    - Optimize re-renders with React.memo
    - _Requirements: 4.2_
  
  - [ ] 26.3 Optimize animation performance
    - Target 60fps for molecular animations
    - Use requestAnimationFrame for smooth playback
    - Optimize canvas/SVG rendering
    - Test on lower-end devices
    - _Requirements: 6.3, 6.4_
  
  - [ ] 26.4 Monitor memory usage
    - Test for memory leaks during extended use
    - Verify animations don't accumulate memory
    - Test with 50+ quest transitions
    - Ensure cleanup on component unmount
    - _Requirements: Performance targets_

- [ ] 27. Final integration and wiring
  - [ ] 27.1 Wire all components together
    - Connect SC106ChemicalReactions to ChamberLayout
    - Connect EquationBalancer to quest state
    - Connect ReactionTypeSelector to quest state
    - Connect ChemistryVisualization to quest state
    - Ensure all data flows correctly
    - _Requirements: All_
  
  - [ ] 27.2 Verify all 60-65 quests are accessible
    - Test all 3 stages load correctly
    - Test all 4 difficulty levels load correctly
    - Verify 5 quests per stage/difficulty combination
    - Verify total quest count is 60-65
    - _Requirements: 1.5, 2.5, 3.4, 7.5, 7.7_
  
  - [ ] 27.3 Verify Basel-specific scenarios
    - Check all quests have Basel context
    - Verify Novartis/Roche references are accurate
    - Verify pharmaceutical reactions are authentic
    - Verify scenario descriptions are 150-250 words
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.7_
  
  - [ ] 27.4 Verify three-language support
    - Test complete module in English
    - Test complete module in Chinese
    - Test complete module in German
    - Verify all text translates correctly
    - Verify chemical formulas remain unchanged
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

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
- The module includes 60-65 total quests: 3 stages × 4 difficulties × 5 quests = 60, plus 5 additional for variety
- All chemical equations use react-katex with four-backslash standard (\\\\text{}, \\\\rightarrow)
- All scenarios include Basel-specific contexts (Novartis, Roche, Basel University, Rhine River)
- ELITE difficulty includes authentic pharmaceutical synthesis processes from Basel industry

## Testing Configuration

**Property-Based Testing**:
- Library: fast-check (TypeScript)
- Minimum iterations: 100 per test
- Tag format: `// Feature: sc1-06-chemical-reactions-basics, Property N: [description]`
- Total property tests: 12 (covering atom counting, balancing, classification, LaTeX formatting, translations, navigation, accessibility)

**Unit Testing**:
- Framework: Jest with React Testing Library
- Coverage target: 80% for core logic
- Focus on calculation functions, validation, and edge cases
- Test all five reaction types
- Test all difficulty levels

**Integration Testing**:
- Framework: Jest with React Testing Library
- Test complete user flows (load → answer → verify → next)
- Test component interactions (quest state → visualization updates)
- Test language switching across all components
- Test stage and difficulty navigation

**Browser Testing**:
- Manual testing in Chrome, Firefox, Safari
- Mobile testing on iOS Safari and Android Chrome
- Verify LaTeX rendering in all browsers
- Verify animations perform at 60fps
- Verify no console errors or warnings
- Test responsive layout at 768px breakpoint

**Performance Targets**:
- Initial page load: < 2 seconds
- Quest transition: < 200ms
- Coefficient input response: < 50ms (real-time)
- Language switch: < 500ms
- Visualization render: < 300ms
- Animation frame rate: 60fps

## Quest Data Summary

**Reaction Types Stage** (20 quests):
- BASIC: 5 quests with simple synthesis/decomposition
- CORE: 5 quests with single/double replacement
- ADVANCED: 5 quests with organic combustion
- ELITE: 5 quests with pharmaceutical synthesis

**Equation Balancing Stage** (20 quests):
- BASIC: 5 quests with coefficients 1-3
- CORE: 5 quests with coefficients up to 5, polyatomic ions
- ADVANCED: 5 quests with coefficients up to 10, organic compounds
- ELITE: 5 quests with complex pharmaceutical synthesis

**Reaction Simulation Stage** (20-25 quests):
- BASIC: 5 quests with simple molecular animations
- CORE: 5 quests with multiple bond changes
- ADVANCED: 5 quests with organic mechanisms
- ELITE: 5-10 quests with detailed pharmaceutical mechanisms

**Total**: 60-65 quests with Basel-specific scenarios in three languages (EN/CN/DE)
