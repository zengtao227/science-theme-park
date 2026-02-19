# Implementation Plan: SP2.01 - Circuit Basics // 电路基础

## Overview

This implementation plan converts the SP2.01 Circuit Basics design into actionable coding tasks. The module is an interactive educational web application teaching fundamental electricity concepts through circuit building, real-time simulation, and circuit diagram drawing. The implementation follows the Chamber Module Standards with ChamberLayout, uses TypeScript/React, supports three languages (EN/CN/DE), and includes Basel-specific scenarios.

## Tasks

- [x] 1. Set up project structure and core types
  - Create directory structure: `src/app/chamber/sp2-01/` and `src/components/chamber/sp2-01/`
  - Define TypeScript interfaces for SP201Quest, CircuitState, SimulationState, DiagramState
  - Define component types (BATTERY, BULB, SWITCH, WIRE, RESISTOR)
  - Define stage types (COMPONENTS, CIRCUITS, DIAGRAMS)
  - _Requirements: 13.1, 13.2_

- [x] 2. Implement quest data generation
  - [x] 2.1 Create buildStagePool function for COMPONENTS stage (BASIC difficulty)
    - Generate 20 BASIC quests for component identification
    - Include 5 quests each for: battery, bulb, switch, wire, resistor
    - Each quest includes component info (name, symbol, function) in EN/CN/DE
    - _Requirements: 1.1, 1.2, 1.8, 13.1_
  
  - [x] 2.2 Create buildStagePool function for CIRCUITS stage (CORE difficulty)
    - Generate 20 CORE quests for circuit construction
    - Include: 5 single bulb, 5 series, 5 parallel, 5 switch control circuits
    - Each quest specifies required components and target circuit configuration
    - _Requirements: 2.9, 13.2, 13.3_
  
  - [x] 2.3 Create buildStagePool function for DIAGRAMS stage (ADVANCED difficulty)
    - Generate 15 ADVANCED quests: 5 diagram drawing, 5 series/parallel comparison, 5 troubleshooting
    - Include target diagram configurations with IEC standard symbols
    - Include faulty circuits with specific fault types
    - _Requirements: 4.7, 5.7, 6.6, 13.4_
  
  - [x] 2.4 Create buildStagePool function for ELITE difficulty
    - Generate 5 ELITE quests for complex circuit design
    - Include design requirements (2 switches controlling 1 bulb, 3 bulbs with independent control)
    - Support multiple acceptable solutions
    - _Requirements: 7.2, 7.3, 13.5_
  
  - [x] 2.5 Add Basel-specific scenarios to all quests
    - Add 4 Basel scenarios: home electrical safety, Christmas lights, school labs, SBB train stations
    - Each scenario 150-250 words with specific Basel locations
    - Reference Swiss electrical standards (230V, Type J plugs)
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [x] 3. Implement translation keys
  - [x] 3.1 Add EN translations to i18n
    - Add sp2_01 namespace with title, stages, scenarios, components, instructions
    - Add difficulty labels (BASIC, CORE, ADVANCED, ELITE)
    - Add UI text (check, next, correct, incorrect, back)
    - _Requirements: 9.1, 9.2_
  
  - [x] 3.2 Add CN translations to i18n
    - Translate all sp2_01 keys to Chinese
    - Ensure component names use correct technical terms (电池, 灯泡, 开关, 电线, 电阻)
    - Translate difficulty levels (基础, 核心, 进阶, 精英)
    - _Requirements: 9.3, 9.4, 9.5_
  
  - [x] 3.3 Add DE translations to i18n
    - Translate all sp2_01 keys to German
    - Ensure component names use correct technical terms (Batterie, Glühbirne, Schalter, Draht, Widerstand)
    - Translate difficulty levels (BASIS, KERN, ERWEITERT, ELITE)
    - _Requirements: 9.3, 9.4, 9.5_
  
  - [x] 3.4 Ensure LaTeX formulas use four backslashes
    - Review all LaTeX strings in quest data
    - Replace double backslashes with four backslashes (\\\\)
    - Test rendering in all three languages
    - _Requirements: 9.10_

- [x] 4. Implement CircuitBuilder component
  - [x] 4.1 Create ComponentPalette subcomponent
    - Render 5 component types with icons and labels
    - Support drag-and-drop from palette to workspace
    - Display component info on hover/selection
    - _Requirements: 1.1, 2.1_
  
  - [x] 4.2 Create CircuitWorkspace canvas
    - Implement drag-and-drop for component placement
    - Support snap-to-grid positioning
    - Handle component removal (drag to trash or Delete key)
    - Prevent placement outside workspace bounds
    - _Requirements: 2.2, 14.2, 16.1_
  
  - [x] 4.3 Create ConnectionManager for wiring
    - Implement click-to-connect between component terminals
    - Draw wire connections as lines
    - Support connection removal
    - Validate terminal compatibility
    - _Requirements: 2.3, 16.2_
  
  - [x] 4.4 Add switch toggle functionality
    - Implement click handler for switch components
    - Toggle between OPEN and CLOSED states
    - Update visual representation
    - _Requirements: 2.6, 10.4_

- [x] 5. Implement CircuitSimulator component
  - [x] 5.1 Create circuit analysis algorithm
    - Detect complete circuits (closed loop from battery + to -)
    - Identify series vs parallel configurations
    - Check switch states
    - Calculate total resistance
    - _Requirements: 2.4, 2.5, 5.1, 5.2_
  
  - [x] 5.2 Create current flow calculation
    - Calculate current using Ohm's law (I = V/R)
    - Handle series circuits (same current through all)
    - Handle parallel circuits (current splits at junctions)
    - Handle open circuits (current = 0)
    - _Requirements: 3.2, 3.7, 3.8_
  
  - [x] 5.3 Create component state calculation
    - Calculate bulb brightness based on power (P = I²R)
    - Determine wire states (active/inactive)
    - Update switch visual states
    - _Requirements: 3.3, 5.3, 5.4_
  
  - [x] 5.4 Create current flow animation
    - Animate moving dots along wires with current
    - Color wires blue (active) or gray (inactive)
    - Show bulbs lighting up with appropriate brightness
    - Maintain 30 FPS animation
    - _Requirements: 3.1, 3.4, 3.9, 18.3_
  
  - [x] 5.5 Add short circuit detection
    - Detect direct battery terminal connections
    - Prevent short circuit configurations
    - Display safety warning with educational message
    - _Requirements: 16.1, 16.2, 10.8_

- [x] 6. Implement DiagramDrawer component
  - [x] 6.1 Create SymbolPalette with IEC symbols
    - Render standard electrical symbols (battery, bulb, switch, wire, resistor)
    - Support symbol selection and placement
    - Display symbol names in current language
    - _Requirements: 4.1, 4.2_
  
  - [x] 6.2 Create GridCanvas for diagram drawing
    - Implement 20x20 grid-based canvas
    - Support symbol placement at grid intersections
    - Snap symbols to grid positions
    - _Requirements: 4.3, 14.3_
  
  - [x] 6.3 Create ConnectionDrawer for wiring
    - Draw straight lines (horizontal/vertical) between symbols
    - Support multi-segment wire paths
    - Enforce correct symbol orientation
    - _Requirements: 4.4, 4.5_
  
  - [x] 6.4 Implement diagram verification
    - Compare drawn diagram topology to target circuit
    - Check component types and connections
    - Provide specific error feedback
    - _Requirements: 4.6, 4.10_

- [x] 7. Implement main SP201CircuitBasics page component
  - [x] 7.1 Set up ChamberLayout integration
    - Import and configure ChamberLayout
    - Pass title, moduleCode (SP2.01), difficulty, stages
    - Configure left panel (CircuitBuilder/DiagramDrawer) and right panel (quest content)
    - _Requirements: 14.1, 14.2_
  
  - [x] 7.2 Integrate useQuestManager hook
    - Initialize with buildStagePool function
    - Set initial stage to COMPONENTS
    - Handle difficulty and stage changes
    - Manage quest navigation (verify, next)
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 15.1, 15.2_
  
  - [x] 7.3 Implement quest display
    - Render scenario description for current stage
    - Display quest prompt and instructions
    - Show component info for COMPONENTS stage
    - Show circuit requirements for CIRCUITS/DIAGRAMS stages
    - _Requirements: 1.2, 2.10, 4.6_
  
  - [x] 7.4 Implement verification logic
    - For COMPONENTS: verify component selection
    - For CIRCUITS: compare circuit topology to target
    - For DIAGRAMS: compare diagram to target circuit
    - Display success/error feedback
    - _Requirements: 12.1, 12.2, 12.3, 35, 36_
  
  - [x] 7.5 Add quest navigation
    - Enable "Next" button on successful verification
    - Load next quest on "Next" click
    - Display completion message when stage finished
    - _Requirements: 12.4, 12.5, 12.6, 37_

- [x] 8. Implement circuit state management
  - [x] 8.1 Create CircuitState class
    - Store components (id, type, position, properties)
    - Store connections (from, to, terminals)
    - Provide methods: placeComponent, removeComponent, createConnection, removeConnection
    - _Requirements: 2.2, 2.3, 13.3_
  
  - [x] 8.2 Create SimulationState interface
    - Store isComplete, current, componentStates, currentPath
    - Update on circuit modifications
    - Trigger re-render on state changes
    - _Requirements: 10.1, 10.2, 10.3, 31_
  
  - [x] 8.3 Create DiagramState class
    - Store symbols (id, type, gridPosition, orientation)
    - Store connections (from, to, path)
    - Provide methods: placeSymbol, removeSymbol, drawConnection
    - _Requirements: 4.3, 4.4, 13.9_

- [x] 9. Implement progress tracking and persistence
  - [x] 9.1 Add localStorage integration
    - Save quest completion status on verify success
    - Save circuit state for partially completed quests
    - Load progress on module initialization
    - _Requirements: 19.1, 19.2, 19.4, 47_
  
  - [x] 9.2 Add progress display
    - Show "X/60 quests completed" in UI
    - Show stage completion status
    - Track time spent per quest
    - _Requirements: 19.6, 19.9, 15.8, 41_
  
  - [x] 9.3 Handle storage errors
    - Detect localStorage unavailable (private mode)
    - Handle quota exceeded
    - Handle corrupted data
    - Display appropriate user messages
    - _Requirements: 19.7, 19.8_

- [x] 10. Implement troubleshooting features (ADVANCED)
  - [x] 10.1 Create faulty circuit generator
    - Generate circuits with specific faults (broken wire, dead battery, burned bulb, open switch)
    - Display observable symptoms
    - _Requirements: 6.1, 6.4_
  
  - [x] 10.2 Add component testing functionality
    - Allow users to click components to test them
    - Provide diagnostic information
    - _Requirements: 6.2_
  
  - [x] 10.3 Implement fault diagnosis verification
    - Verify user's identified fault matches actual fault
    - Provide feedback on correct/incorrect diagnosis
    - _Requirements: 6.3, 21_
  
  - [x] 10.4 Add fault correction
    - Allow users to replace/fix faulty components
    - Verify circuit works after fix
    - _Requirements: 6.5, 22_

- [x] 11. Implement design challenges (ELITE)
  - [x] 11.1 Create design requirement parser
    - Parse functional requirements (e.g., "2 switches control 1 bulb")
    - Generate acceptance criteria
    - _Requirements: 7.3, 23_
  
  - [x] 11.2 Implement multi-solution verification
    - Accept any circuit meeting functional requirements
    - Check circuit completeness, connections, and functionality
    - Don't require specific topology
    - _Requirements: 7.4, 7.5, 7.6, 24, 25_
  
  - [x] 11.3 Add interactive testing mode
    - Allow users to test all functions (toggle switches, observe bulbs)
    - Verify all requirements are met through testing
    - _Requirements: 7.8, 26_

- [x] 12. Add responsive layout and accessibility
  - [x] 12.1 Implement responsive breakpoints
    - Stack layout vertically below 768px
    - Scale circuit workspace proportionally
    - Ensure touch targets are at least 44px
    - _Requirements: 14.3, 14.4, 14.5_
  
  - [x] 12.2 Add keyboard navigation
    - Support Tab navigation through all interactive elements
    - Support arrow keys for component palette
    - Support Enter/Space for selection
    - Support Delete for component removal
    - _Requirements: 17.3, 17.4, 17.8_
  
  - [x] 12.3 Add ARIA labels and screen reader support
    - Add aria-label to all components
    - Announce circuit state changes
    - Announce verification feedback
    - _Requirements: 17.1, 17.2_
  
  - [x] 12.4 Ensure color contrast and accessibility
    - Test all text meets WCAG AA (4.5:1 contrast)
    - Don't rely solely on color (use labels/patterns)
    - Provide option to reduce motion
    - _Requirements: 17.5, 17.6, 17.7_

- [x] 13. Add error handling and validation
  - [x] 13.1 Implement input validation
    - Prevent component placement outside bounds
    - Prevent invalid connections
    - Prevent overlapping components
    - Handle empty circuit verification
    - _Requirements: 16.1, 16.8_
  
  - [x] 13.2 Add safety warnings
    - Warn about high voltage (multiple batteries in series)
    - Warn about component overload
    - Warn about reversed polarity
    - _Requirements: 16.3, 16.4, 16.5_
  
  - [x] 13.3 Handle quest loading errors
    - Display loading state
    - Handle missing quest data
    - Handle invalid quest structure
    - Log errors to console
    - _Requirements: 13.6, 13.7_
  
  - [x] 13.4 Handle simulation errors
    - Handle animation failures gracefully
    - Handle performance degradation
    - Handle state synchronization errors
    - _Requirements: 18.4, 18.9_

- [x] 14. Implement visualization components
  - [x] 14.1 Create CircuitSimulator visualization overlay
    - Render current flow animation on top of circuit
    - Update in real-time as circuit changes
    - Show bulb brightness levels
    - _Requirements: 3.1, 3.3, 10.1_
  
  - [x] 14.2 Add measurement tools (ADVANCED/ELITE)
    - Add voltage measurement across components
    - Add current measurement through components
    - Display values with units (V, A) and precision (2 decimals)
    - _Requirements: 10.5, 10.6, 10.7, 33_
  
  - [x] 14.3 Add animation speed control
    - Provide slider to adjust animation speed
    - Default to 1x speed
    - Range from 0.5x to 2x
    - _Requirements: 3.10_

- [x] 15. Optimize performance
  - [x] 15.1 Optimize initial load time
    - Lazy load quest data
    - Cache component images and symbols
    - Minimize bundle size
    - Target < 3 seconds load time
    - _Requirements: 18.1, 18.6, 18.8_
  
  - [x] 15.2 Optimize quest transitions
    - Preload next quest data
    - Use AnimatePresence for smooth transitions
    - Target < 500ms transition time
    - _Requirements: 18.2, 44_
  
  - [x] 15.3 Optimize simulation performance
    - Use requestAnimationFrame for animations
    - Throttle simulation updates
    - Maintain 30 FPS minimum
    - _Requirements: 18.3, 18.7, 45, 46_
  
  - [x] 15.4 Optimize for low-end devices
    - Reduce animation quality on slow devices
    - Simplify rendering for complex circuits
    - Test on budget laptops and tablets
    - _Requirements: 18.9_

- [x] 16. Add educational scaffolding
  - [x] 16.1 Implement hint system
    - Provide hints after 2 minutes of struggle
    - Offer progressive hints (3 levels)
    - Don't give away complete solution
    - _Requirements: 20.2, 20.3, 6.8_
  
  - [x] 16.2 Add introductory explanations
    - Show concept explanation when starting new difficulty
    - Provide interactive demonstrations for new components
    - _Requirements: 20.1, 20.7_
  
  - [x] 16.3 Implement constructive feedback
    - Explain why incorrect circuits don't work
    - Connect concepts to previous material
    - Provide positive reinforcement on success
    - _Requirements: 20.4, 20.5, 20.6, 20.9_

- [x] 17. Final integration and testing
  - [x] 17.1 Wire all components together
    - Connect CircuitBuilder, CircuitSimulator, DiagramDrawer to main page
    - Ensure state flows correctly between components
    - Test all stage transitions
    - _Requirements: All_
  
  - [x] 17.2 Test all difficulty levels
    - Verify BASIC has 20 quests
    - Verify CORE has 20 quests
    - Verify ADVANCED has 15 quests
    - Verify ELITE has 5 quests
    - _Requirements: 11.10, 38_
  
  - [x] 17.3 Test all three languages
    - Switch between EN/CN/DE
    - Verify all text translates
    - Verify LaTeX renders correctly
    - Verify component names translate
    - _Requirements: 9.1, 9.2, 9.8, 27_
  
  - [x] 17.4 Test Basel scenarios
    - Verify all 4 scenarios display correctly
    - Verify Basel-specific details are accurate
    - Verify Swiss electrical standards referenced
    - _Requirements: 8.1, 8.2, 8.3_
  
  - [x] 17.5 Test on multiple browsers
    - Test on Chrome, Firefox, Safari
    - Test on desktop, tablet, mobile
    - Test touch interactions on tablets
    - Verify no console errors
    - _Requirements: 14.7, 14.8, 14.9_

- [x] 18. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- The implementation uses TypeScript/React with Next.js
- ChamberLayout provides consistent two-column structure
- CircuitSimulator provides real-time visualization
- All content supports EN/CN/DE languages
- Basel scenarios connect learning to local context
- Total of 60 quests distributed across 4 difficulty levels
- Module follows Chamber Module Standards for consistency
