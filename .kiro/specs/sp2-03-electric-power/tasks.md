# Implementation Plan: SP2.03 - Electric Power & Energy

## Overview

This implementation plan covers the completion of the SP2.03 Electric Power & Energy module. The module already has basic page structure and visualization components created. This plan focuses on:
1. Completing and verifying all translations (EN/CN/DE)
2. Ensuring all 60 quests are properly implemented (3 stages × 4 difficulties × 5 quests)
3. Improving visualizations to match educational standards
4. Adding comprehensive testing
5. Browser testing and validation

## Tasks

- [ ] 1. Complete and verify translations
  - [ ] 1.1 Add complete English translations to i18n
    - Add all scenario descriptions (150-250 words each)
    - Add all stage names and UI text
    - Ensure Basel-specific context in scenarios
    - _Requirements: 6.1, 6.4, 6.5, 7.1, 7.4_
  
  - [ ] 1.2 Add complete Chinese translations to i18n
    - Translate all scenario descriptions
    - Translate difficulty levels (基础/核心/进阶/精英)
    - Translate stage names and UI text
    - _Requirements: 7.1, 7.2, 7.3, 7.4_
  
  - [ ] 1.3 Add complete German translations to i18n
    - Translate all scenario descriptions
    - Translate difficulty levels (BASIS/KERN/ERWEITERT/ELITE)
    - Translate stage names and UI text
    - _Requirements: 7.1, 7.2, 7.3, 7.4_
  
  - [ ] 1.4 Verify translation completeness
    - Check all translation keys exist in EN/CN/DE
    - Verify scenario descriptions are 150-250 words
    - Verify Basel-specific references in all languages
    - _Requirements: 7.1, 7.4, 6.4_

- [ ] 2. Verify and complete quest data
  - [ ] 2.1 Verify Power Basics quest data
    - Ensure 5 quests per difficulty (20 total)
    - Verify calculations: P=UI, I=P/U, U=P/I
    - Check difficulty progression (simple integers → industrial scale)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 4.1, 4.2, 4.3, 4.4_
  
  - [ ]* 2.2 Write property test for power calculations
    - **Property 1: Power Calculation Correctness**
    - **Property 2: Current Calculation Correctness**
    - **Property 3: Voltage Calculation Correctness**
    - **Validates: Requirements 1.2, 1.3, 1.4, 1.7**
  
  - [ ] 2.3 Verify Energy Consumption quest data
    - Ensure 5 quests per difficulty (20 total)
    - Verify calculations: E=Pt (Wh and kWh), Cost=E×rate
    - Check Swiss electricity rates (0.20-0.30 CHF/kWh)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.7, 4.1, 4.2, 4.3, 4.4_
  
  - [ ]* 2.4 Write property test for energy and cost calculations
    - **Property 4: Energy Calculation Correctness (Wh)**
    - **Property 5: Energy Calculation Correctness (kWh)**
    - **Property 6: Cost Calculation Correctness**
    - **Validates: Requirements 2.2, 2.3, 2.4, 2.7**
  
  - [ ] 2.5 Verify Efficiency quest data
    - Ensure 5 quests per difficulty (20 total)
    - Verify calculations: η=(P_out/P_in)×100%, Loss=P_in-P_out
    - Check ELITE includes real devices (LED, incandescent, motor, transformer, solar)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.8, 4.1, 4.2, 4.3, 4.4_
  
  - [ ]* 2.6 Write property test for efficiency calculations
    - **Property 7: Efficiency Calculation Correctness**
    - **Property 8: Output Power Calculation Correctness**
    - **Property 9: Input Power Calculation Correctness**
    - **Property 10: Power Loss Calculation Correctness**
    - **Validates: Requirements 3.2, 3.3, 3.4, 3.5, 3.7**

- [ ] 3. Checkpoint - Verify quest data completeness
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Improve visualizations
  - [ ] 4.1 Enhance Power Basics visualization
    - Ensure voltage, current, and power display with correct units
    - Add animated elements to show energy flow
    - Use color coding: cyan for voltage, red for current, yellow for power
    - Display formula: P = U × I using LaTeX
    - _Requirements: 5.1, 5.4, 5.5, 5.6, 5.7_
  
  - [ ] 4.2 Enhance Energy Consumption visualization
    - Display power, time, energy (kWh), and cost (CHF) in clear panels
    - Use color coding: green for energy, yellow for cost
    - Show calculation flow: Power → Time → Energy → Cost
    - Display formula: E = P × t using LaTeX
    - _Requirements: 5.2, 5.4, 5.5, 5.6, 5.7_
  
  - [ ] 4.3 Enhance Efficiency visualization
    - Display input → output flow with efficiency bar
    - Show efficiency percentage and power loss
    - Use color coding: blue for input, green for output, yellow for efficiency, red for loss
    - Animate efficiency bar to show percentage visually
    - Display formula: η = (P_out / P_in) × 100% using LaTeX
    - _Requirements: 5.3, 5.4, 5.5, 5.6, 5.7_
  
  - [ ]* 4.4 Write integration test for visualization synchronization
    - Test visualization updates when quest changes
    - Test all three visualization modes (Power, Energy, Efficiency)
    - Verify data accuracy in visualizations
    - _Requirements: 5.4, 5.6_

- [ ] 5. Implement LaTeX formula rendering
  - [ ] 5.1 Add react-katex to all formula displays
    - Import InlineMath and BlockMath components
    - Replace plain text formulas with LaTeX rendering
    - Use double backslashes for LaTeX commands (\\text{}, \\times)
    - _Requirements: 7.5, 11.1, 11.2, 11.4_
  
  - [ ] 5.2 Format units correctly in LaTeX
    - Use \\text{} for all units (W, V, A, kWh, CHF, %)
    - Never use Unicode superscripts (², ³)
    - Ensure consistent formatting across all formulas
    - _Requirements: 11.5, 11.6_
  
  - [ ]* 5.3 Write unit test for LaTeX rendering
    - Test all formulas render without errors
    - Test units display in roman font
    - Test formulas work in all three languages
    - _Requirements: 11.1, 11.7_

- [ ] 6. Implement answer verification
  - [ ] 6.1 Add verification logic with tolerance
    - Implement ±0.01 tolerance for numerical answers
    - Display success feedback in green
    - Display error feedback in red
    - Enable "Next" button only after correct answer
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  
  - [ ]* 6.2 Write property test for answer verification
    - **Property 12: Answer Verification Tolerance**
    - Test verification with exact matches
    - Test verification within ±0.01 tolerance
    - Test verification outside tolerance
    - **Validates: Requirements 8.2, 8.3**
  
  - [ ]* 6.3 Write unit tests for edge cases
    - Test empty input handling
    - Test non-numeric input handling
    - Test extremely large/small numbers
    - _Requirements: 8.1, 8.2, 8.3_

- [ ] 7. Checkpoint - Verify core functionality
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Implement quest navigation
  - [ ] 8.1 Add stage navigation logic
    - Implement stage switching (Power Basics, Energy Consumption, Efficiency)
    - Reset to first quest when stage changes
    - Visually indicate current stage
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_
  
  - [ ] 8.2 Add difficulty navigation logic
    - Implement difficulty switching (BASIC, CORE, ADVANCED, ELITE)
    - Load independent quest pools (not cumulative)
    - Reset to first quest when difficulty changes
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  
  - [ ]* 8.3 Write integration test for navigation
    - Test stage switching loads correct quests
    - Test difficulty switching loads correct quests
    - Test quest state persists within stage/difficulty
    - _Requirements: 12.2, 12.3, 4.5_

- [ ] 9. Implement responsive layout
  - [ ] 9.1 Verify ChamberLayout usage
    - Ensure two-column layout on desktop
    - Ensure vertical stack on mobile (<768px)
    - Verify all text is readable (min 14px)
    - _Requirements: 10.1, 10.2, 10.3, 10.7_
  
  - [ ] 9.2 Verify touch targets
    - Ensure buttons are at least 44px tall
    - Ensure input fields are at least 44px tall
    - Test on mobile devices
    - _Requirements: 10.4_
  
  - [ ] 9.3 Verify visualization scaling
    - Ensure visualization scales proportionally
    - Test on various screen sizes
    - Verify no horizontal scrolling
    - _Requirements: 10.5, 10.7_

- [ ] 10. Add comprehensive testing
  - [ ]* 10.1 Write unit tests for quest generation
    - Test buildStagePool for all stages and difficulties
    - Test quest pool contains exactly 5 quests
    - Test quest objects have all required fields
    - Test expected answers are calculated correctly
  
  - [ ]* 10.2 Write property test for quest pool consistency
    - **Property 11: Quest Pool Size Consistency**
    - Test all stage/difficulty combinations return 5 quests
    - **Validates: Requirements 1.5, 2.5, 3.6, 9.2**
  
  - [ ]* 10.3 Write property test for translation completeness
    - **Property 13: Translation Completeness**
    - Test all keys exist in EN/CN/DE
    - **Validates: Requirements 7.1, 7.2, 7.3, 7.4**
  
  - [ ]* 10.4 Write integration tests for end-to-end flow
    - Test complete quest flow (load → answer → verify → next)
    - Test stage completion
    - Test difficulty switching
    - Test language switching

- [ ] 11. Browser testing
  - [ ] 11.1 Test in Chrome/Edge
    - Load module and verify no console errors
    - Test all quests display correctly
    - Test input fields and buttons work
    - Test visualizations render and animate
    - Test language switching
    - Test responsive layout
    - _Requirements: All_
  
  - [ ] 11.2 Test in Firefox
    - Repeat all tests from Chrome/Edge
    - Verify LaTeX formulas render correctly
    - Verify animations work smoothly
    - _Requirements: All_
  
  - [ ] 11.3 Test in Safari
    - Repeat all tests from Chrome/Edge
    - Verify iOS compatibility (if applicable)
    - Verify all features work
    - _Requirements: All_
  
  - [ ] 11.4 Test on mobile devices
    - Test on iOS Safari
    - Test on Android Chrome
    - Verify touch interactions work
    - Verify responsive layout
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [ ] 12. Final checkpoint - Complete module verification
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
- Library: fast-check (TypeScript)
- Minimum iterations: 100 per test
- Tag format: `// Feature: sp2-03-electric-power, Property N: [description]`

**Unit Testing**:
- Framework: Jest with React Testing Library
- Coverage target: 80% for core logic
- Focus on calculation functions and edge cases

**Integration Testing**:
- Framework: Jest with React Testing Library
- Test complete user flows
- Test component interactions

**Browser Testing**:
- Manual testing in Chrome, Firefox, Safari
- Mobile testing on iOS and Android
- Verify no console errors or warnings

