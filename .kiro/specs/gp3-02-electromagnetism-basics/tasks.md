# Implementation Plan: GP3.02 - Electromagnetism Basics

## Overview

This implementation plan covers the creation of the GP3.02 Electromagnetism Basics module for Gymnasium students (16-18 years old). The module teaches fundamental electromagnetic concepts through 60 interactive quests across three stages (Electric Fields, Magnetic Fields, Particle Motion) with four difficulty levels each. The implementation focuses on:
1. Setting up the module structure with ChamberLayout
2. Implementing electromagnetic field calculations with correct physical constants
3. Creating three distinct visualizations (electric field lines, magnetic field lines, particle trajectories)
4. Building quest pools with 60 quests total (3 stages × 4 difficulties × 5 quests)
5. Adding three-language support (EN/CN/DE) with Basel-specific scenarios
6. Implementing comprehensive testing

## Tasks

- [x] 1. Set up project structure and core interfaces
  - Create GP302Electromagnetism page component in TypeScript
  - Define GP302Quest interface with electromagnetic properties (charge, distance, current, fieldStrength, velocity, mass, radius)
  - Set up ChamberLayout with two-column structure
  - Initialize useQuestManager hook
  - _Requirements: 9.1, 10.1, 10.6_

- [ ] 2. Implement physical constants module
  - [ ] 2.1 Create constants.ts file with all physical constants
    - Define k = 8.99 × 10⁹ N·m²/C² (Coulomb's constant)
    - Define μ₀ = 4π × 10⁻⁷ T·m/A (permeability of free space)
    - Define e = 1.60 × 10⁻¹⁹ C (elementary charge)
    - Define mₑ = 9.11 × 10⁻³¹ kg (electron mass)
    - Define mₚ = 1.67 × 10⁻²⁷ kg (proton mass)
    - Export getConstant() function for accessing constants
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6_
  
  - [ ]* 2.2 Write property test for physical constants accuracy
    - **Property 11: Physical Constants Accuracy**
    - Test all constants are within acceptable precision
    - **Validates: Requirements 13.1, 13.2, 13.3, 13.4, 13.5**

- [ ] 3. Implement electromagnetic calculation functions
  - [ ] 3.1 Create electricField.ts with electric field calculations
    - Implement calculateElectricField(charge, distance): E = kQ/r²
    - Implement calculateElectricForce(charge, field): F = qE
    - Implement calculateFieldAtPoint(charges[], point): field superposition
    - Use k constant from constants.ts
    - _Requirements: 1.2, 1.3, 1.4, 13.1_
  
  - [ ]* 3.2 Write property test for electric field calculations
    - **Property 1: Electric Field Calculation Correctness**
    - **Property 2: Electric Force Calculation Correctness**
    - Test with random charge and distance values
    - **Validates: Requirements 1.2, 1.3, 13.1**
  
  - [ ] 3.3 Create magneticField.ts with magnetic field calculations
    - Implement calculateMagneticFieldStraightWire(current, distance): B = μ₀I/(2πr)
    - Implement calculateMagneticFieldCircularLoop(current, radius): B = μ₀I/(2R)
    - Implement calculateMagneticForce(field, current, length, angle): F/L = BIsinθ
    - Use μ₀ constant from constants.ts
    - _Requirements: 2.2, 2.3, 2.4, 2.7, 13.2_
  
  - [ ]* 3.4 Write property test for magnetic field calculations
    - **Property 3: Magnetic Field from Straight Wire Correctness**
    - **Property 4: Magnetic Field from Circular Loop Correctness**
    - **Property 5: Magnetic Force Calculation Correctness**
    - Test with random current and distance values
    - **Validates: Requirements 2.2, 2.3, 2.4, 2.7, 13.2**
  
  - [ ] 3.5 Create particleMotion.ts with particle motion calculations
    - Implement calculateAcceleration(charge, mass, field): a = qE/m
    - Implement calculateCircularRadius(mass, velocity, charge, field): r = mv/(qB)
    - Implement calculateVelocitySelector(electricField, magneticField): v = E/B
    - _Requirements: 3.2, 3.3, 3.4_
  
  - [ ]* 3.6 Write property test for particle motion calculations
    - **Property 6: Particle Acceleration in Electric Field Correctness**
    - **Property 7: Circular Motion Radius in Magnetic Field Correctness**
    - **Property 8: Velocity Selector Condition Correctness**
    - Test with random particle properties
    - **Validates: Requirements 3.2, 3.3, 3.4**

- [ ] 4. Checkpoint - Verify calculation functions
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Build quest data for Electric Fields stage
  - [ ] 5.1 Create BASIC difficulty quests (5 quests)
    - Single point charge, simple field calculations
    - Integer values, distances 0.1-1.0 m, charges 1e-6 to 1e-5 C
    - Calculate E = kQ/r²
    - _Requirements: 1.1, 1.2, 1.5, 4.1_
  
  - [ ] 5.2 Create CORE difficulty quests (5 quests)
    - Multiple charges, field superposition
    - Realistic physical values, force calculations F = qE
    - Test charges 1e-9 C, source charges 1e-6 to 1e-5 C
    - _Requirements: 1.3, 1.4, 1.5, 4.2_
  
  - [ ] 5.3 Create ADVANCED difficulty quests (5 quests)
    - Non-uniform fields, vector decomposition
    - Calculate field at point (x,y), vector addition
    - Multiple charges at different positions
    - _Requirements: 1.4, 1.5, 4.3_
  
  - [ ] 5.4 Create ELITE difficulty quests (5 quests)
    - Real-world applications: electrostatic precipitator, capacitors
    - Basel context: Roche Tower air filtration, University Hospital equipment
    - Complex geometries, comprehensive analysis
    - _Requirements: 1.5, 4.4, 6.1, 6.2, 6.3_

- [ ] 6. Build quest data for Magnetic Fields stage
  - [ ] 6.1 Create BASIC difficulty quests (5 quests)
    - Straight wire, simple field calculations
    - Currents 1-20 A, distances 0.01-0.1 m
    - Calculate B = μ₀I/(2πr)
    - _Requirements: 2.1, 2.2, 2.5, 4.1_
  
  - [ ] 6.2 Create CORE difficulty quests (5 quests)
    - Circular loops, solenoids
    - Calculate B = μ₀I/(2R) at center
    - Solenoid field B = μ₀nI
    - _Requirements: 2.3, 2.5, 4.2_
  
  - [ ] 6.3 Create ADVANCED difficulty quests (5 quests)
    - Force on current-carrying wires F/L = BIsinθ
    - Force between parallel wires
    - Angle variations (0°, 30°, 45°, 90°)
    - _Requirements: 2.4, 2.5, 4.3_
  
  - [ ] 6.4 Create ELITE difficulty quests (5 quests)
    - Real-world applications: maglev trains, MRI machines
    - Basel context: Rhine River magnetic field measurements, University Hospital MRI
    - Complex configurations, device applications
    - _Requirements: 2.5, 4.4, 6.1, 6.2_

- [ ] 7. Build quest data for Particle Motion stage
  - [ ] 7.1 Create BASIC difficulty quests (5 quests)
    - Particle in uniform electric field
    - Calculate acceleration a = qE/m
    - Electrons and protons, fields 100-10000 N/C
    - _Requirements: 3.1, 3.2, 3.5, 4.1_
  
  - [ ] 7.2 Create CORE difficulty quests (5 quests)
    - Particle in uniform magnetic field (circular motion)
    - Calculate radius r = mv/(qB)
    - Velocities 1e5 to 1e7 m/s, fields 0.001-0.1 T
    - _Requirements: 3.3, 3.5, 4.2_
  
  - [ ] 7.3 Create ADVANCED difficulty quests (5 quests)
    - Crossed electric and magnetic fields
    - Velocity selector v = E/B
    - Trajectory calculations with vector decomposition
    - _Requirements: 3.4, 3.5, 4.3_
  
  - [ ] 7.4 Create ELITE difficulty quests (5 quests)
    - Real-world applications: mass spectrometer, cyclotron
    - Basel context: CERN collaboration, Novartis/Roche quality control labs
    - Calculate mass from radius, cyclotron frequency
    - _Requirements: 3.5, 3.7, 4.4, 6.1, 6.3_

- [ ] 8. Checkpoint - Verify quest data completeness
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Implement quest pool generation
  - [ ] 9.1 Create buildStagePool function
    - Accept difficulty and stage parameters
    - Return array of 5 quests for the specified stage and difficulty
    - Map quest data to GP302Quest interface
    - Calculate expected answers using calculation functions
    - _Requirements: 9.1, 9.2, 9.3_
  
  - [ ]* 9.2 Write property test for quest pool consistency
    - **Property 9: Quest Pool Size Consistency**
    - Test all 12 combinations (3 stages × 4 difficulties)
    - Verify each returns exactly 5 quests
    - **Validates: Requirements 1.5, 2.5, 3.5, 9.2**
  
  - [ ]* 9.3 Write unit tests for quest data validation
    - Test all quest objects have required fields
    - Test expected answers are calculated correctly
    - Test quest IDs are unique
    - _Requirements: 9.1, 9.3, 9.6_

- [ ] 10. Implement answer verification with tolerance
  - [ ] 10.1 Create verification function
    - Accept user input and expected answer
    - Apply ±0.01 tolerance for values ≥ 1
    - Apply ±1% tolerance for values < 1
    - Handle scientific notation input (e.g., "1.6e-19")
    - Return success/failure with feedback message
    - _Requirements: 1.7, 8.1, 8.2, 8.3_
  
  - [ ]* 10.2 Write property test for answer verification tolerance
    - **Property 10: Answer Verification Tolerance**
    - Test with random expected values and deltas
    - Test both absolute and percentage tolerance
    - **Validates: Requirements 1.7, 8.2**
  
  - [ ]* 10.3 Write unit tests for edge cases
    - Test empty input handling
    - Test non-numeric input handling
    - Test scientific notation parsing
    - Test extremely large/small numbers
    - _Requirements: 8.1, 8.2, 8.3_

- [ ] 11. Create Electric Field visualization
  - [ ] 11.1 Implement ElectricFieldView component
    - Display point charges as circles (blue for positive, red for negative)
    - Draw field lines radiating from charges
    - Show field strength vectors at key points
    - Display charge values and distances with units
    - Use Framer Motion for animations
    - _Requirements: 5.1, 5.4, 5.5, 5.6, 5.7_
  
  - [ ] 11.2 Add field line calculation algorithm
    - Calculate field line paths using numerical integration
    - Start field lines from charge surfaces
    - Follow E field direction (away from positive, toward negative)
    - Handle multiple charges with field superposition
    - _Requirements: 5.1, 5.4_
  
  - [ ]* 11.3 Write integration test for electric field visualization
    - Test visualization updates when quest changes
    - Test field lines render correctly
    - Test charge colors match sign
    - _Requirements: 5.1, 5.4_

- [ ] 12. Create Magnetic Field visualization
  - [ ] 12.1 Implement MagneticFieldView component
    - Display current-carrying wires (cross-section view)
    - Draw circular field lines around wires
    - Show right-hand rule indicator
    - Display current values and field strength with units
    - Use green for magnetic field lines
    - _Requirements: 5.2, 5.4, 5.5, 5.6, 5.7_
  
  - [ ] 12.2 Add field line calculation for magnetic fields
    - Calculate circular field lines around straight wires
    - Calculate field lines for circular loops
    - Show field direction with arrows
    - Handle multiple current sources
    - _Requirements: 5.2, 5.4_
  
  - [ ]* 12.3 Write integration test for magnetic field visualization
    - Test visualization updates when quest changes
    - Test field lines are circular
    - Test right-hand rule indicator displays
    - _Requirements: 5.2, 5.4_

- [ ] 13. Create Particle Motion visualization
  - [ ] 13.1 Implement ParticleMotionView component
    - Display charged particle as animated circle
    - Show particle trajectory path (yellow)
    - Display velocity vectors (yellow arrows)
    - Display force vectors (orange arrows)
    - Show field representations (electric or magnetic)
    - Animate particle motion along calculated path
    - _Requirements: 5.3, 5.4, 5.5, 5.6, 5.7_
  
  - [ ] 13.2 Add trajectory calculation algorithms
    - Calculate straight-line motion in electric field
    - Calculate circular motion in magnetic field
    - Calculate helical motion in combined fields
    - Update particle position frame-by-frame
    - _Requirements: 5.3, 5.4_
  
  - [ ]* 13.3 Write integration test for particle motion visualization
    - Test particle animates along trajectory
    - Test velocity and force vectors display
    - Test circular motion in magnetic field
    - _Requirements: 5.3, 5.4_

- [ ] 14. Checkpoint - Verify visualizations
  - Ensure all tests pass, ask the user if questions arise.

- [x] 15. Add three-language support
  - [x] 15.1 Create English translations
    - Add all UI text (title, buttons, instructions)
    - Add stage names: "Electric Fields", "Magnetic Fields", "Particle Motion"
    - Add difficulty levels: "BASIC", "CORE", "ADVANCED", "ELITE"
    - Add scenario descriptions (150-250 words each) with Basel context
    - Include Roche Tower, University Hospital, CERN collaboration references
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 7.1, 7.2, 7.4_
  
  - [x] 15.2 Create Chinese translations
    - Translate all UI text
    - Add stage names: "电场", "磁场", "粒子运动"
    - Add difficulty levels: "基础", "核心", "进阶", "精英"
    - Translate scenario descriptions with Basel context
    - _Requirements: 7.1, 7.2, 7.3, 7.4_
  
  - [x] 15.3 Create German translations
    - Translate all UI text
    - Add stage names: "Elektrisches Feld", "Magnetfeld", "Teilchenbewegung"
    - Add difficulty levels: "BASIS", "KERN", "ERWEITERT", "ELITE"
    - Translate scenario descriptions with Basel context
    - _Requirements: 7.1, 7.2, 7.3, 7.4_
  
  - [ ]* 15.4 Write property test for translation completeness
    - **Property 12: Translation Completeness**
    - Test all keys exist in EN/CN/DE
    - Test scenario descriptions are 150-250 words
    - **Validates: Requirements 7.1, 7.2, 7.3, 7.4**

- [ ] 16. Implement LaTeX formula rendering
  - [ ] 16.1 Add react-katex to all formula displays
    - Import InlineMath and BlockMath components
    - Replace plain text formulas with LaTeX rendering
    - Use double backslashes for LaTeX commands (\\frac{}, \\times, \\mu_0)
    - _Requirements: 7.5, 11.1, 11.2, 11.4_
  
  - [ ] 16.2 Format all electromagnetic formulas
    - Electric field: E = \\frac{kQ}{r^2}
    - Electric force: F = qE
    - Magnetic field (straight wire): B = \\frac{\\mu_0 I}{2\\pi r}
    - Magnetic field (circular loop): B = \\frac{\\mu_0 I}{2R}
    - Magnetic force: F = BIL\\sin\\theta
    - Particle acceleration: a = \\frac{qE}{m}
    - Circular motion radius: r = \\frac{mv}{qB}
    - Velocity selector: v = \\frac{E}{B}
    - _Requirements: 7.5, 11.4_
  
  - [ ] 16.3 Format units correctly in LaTeX
    - Use \\text{} for all units (N/C, T, m/s, N, C, A, kg)
    - Never use Unicode superscripts (², ³)
    - Ensure consistent formatting across all formulas
    - _Requirements: 11.5, 11.6_
  
  - [ ]* 16.4 Write property test for LaTeX rendering
    - **Property 13: LaTeX Formula Rendering**
    - Test all formulas use double backslashes
    - Test units use \\text{}
    - Test no Unicode superscripts
    - **Validates: Requirements 11.1, 11.4, 11.5**

- [ ] 17. Implement stage and difficulty navigation
  - [ ] 17.1 Add stage navigation logic
    - Implement stage switching (ELECTRIC_FIELDS, MAGNETIC_FIELDS, PARTICLE_MOTION)
    - Reset to first quest when stage changes
    - Visually indicate current stage
    - Load appropriate visualization for each stage
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_
  
  - [ ] 17.2 Add difficulty navigation logic
    - Implement difficulty switching (BASIC, CORE, ADVANCED, ELITE)
    - Load independent quest pools (not cumulative)
    - Reset to first quest when difficulty changes
    - Maintain difficulty progression (simple → complex)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_
  
  - [ ]* 17.3 Write integration test for navigation
    - Test stage switching loads correct quests
    - Test difficulty switching loads correct quests
    - Test quest state persists within stage/difficulty
    - Test visualization changes with stage
    - _Requirements: 12.2, 12.3, 4.5_

- [ ] 18. Implement responsive layout
  - [ ] 18.1 Verify ChamberLayout usage
    - Ensure two-column layout on desktop (quests left, visualization right)
    - Ensure vertical stack on mobile (<768px)
    - Verify all text is readable (min 14px)
    - _Requirements: 10.1, 10.2, 10.3, 10.7_
  
  - [ ] 18.2 Verify touch targets
    - Ensure buttons are at least 44px tall
    - Ensure input fields are at least 44px tall
    - Test on mobile devices
    - _Requirements: 10.4_
  
  - [ ] 18.3 Verify visualization scaling
    - Ensure visualizations scale proportionally
    - Test on various screen sizes (desktop, tablet, mobile)
    - Verify no horizontal scrolling
    - _Requirements: 10.5, 10.7_

- [ ] 19. Add comprehensive testing
  - [ ]* 19.1 Write unit tests for all calculation functions
    - Test electric field calculations with known values
    - Test magnetic field calculations with known values
    - Test particle motion calculations with known values
    - Test edge cases (zero values, very large/small values)
  
  - [ ]* 19.2 Write integration tests for end-to-end flow
    - Test complete quest flow (load → answer → verify → next)
    - Test stage completion (all 5 quests)
    - Test difficulty switching
    - Test language switching
    - Test visualization synchronization
  
  - [ ]* 19.3 Write unit tests for error handling
    - Test invalid input handling
    - Test missing quest data handling
    - Test visualization error handling
    - Test translation fallback

- [ ] 20. Browser testing
  - [ ] 20.1 Test in Chrome/Edge
    - Load module and verify no console errors
    - Test all quests display correctly
    - Test input fields accept numeric and scientific notation
    - Test visualizations render and animate
    - Test language switching (EN/CN/DE)
    - Test LaTeX formulas render correctly
    - Test responsive layout
    - _Requirements: All_
  
  - [ ] 20.2 Test in Firefox
    - Repeat all tests from Chrome/Edge
    - Verify electromagnetic visualizations work
    - Verify animations are smooth
    - _Requirements: All_
  
  - [ ] 20.3 Test in Safari
    - Repeat all tests from Chrome/Edge
    - Verify iOS compatibility (if applicable)
    - Verify all features work
    - _Requirements: All_
  
  - [ ] 20.4 Test on mobile devices
    - Test on iOS Safari
    - Test on Android Chrome
    - Verify touch interactions work
    - Verify responsive layout
    - Verify visualizations scale correctly
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [ ] 21. Final checkpoint - Complete module verification
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties (minimum 100 iterations each)
- Unit tests validate specific examples and edge cases
- Integration tests validate end-to-end flows
- Browser testing ensures cross-platform compatibility
- All electromagnetic calculations must use correct physical constants from constants.ts
- All formulas must be rendered using LaTeX with proper formatting
- All scenarios must include Basel-specific context (150-250 words)

## Testing Configuration

**Property-Based Testing**:
- Library: fast-check (TypeScript)
- Minimum iterations: 100 per test
- Tag format: `// Feature: gp3-02-electromagnetism-basics, Property N: [description]`

**Unit Testing**:
- Framework: Jest with React Testing Library
- Coverage target: 80% for core logic
- Focus on calculation functions and edge cases

**Integration Testing**:
- Framework: Jest with React Testing Library
- Test complete user flows
- Test component interactions
- Test visualization synchronization

**Browser Testing**:
- Manual testing in Chrome, Firefox, Safari
- Mobile testing on iOS and Android
- Verify no console errors or warnings
- Verify all electromagnetic visualizations work correctly
