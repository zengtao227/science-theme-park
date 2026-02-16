# Implementation Plan: Critical Modules Phase 1

## Overview

This implementation plan breaks down the development of four priority educational modules and homepage fixes into discrete, executable tasks. The plan follows a phased approach: P0 modules first (GM1.02 Integral Calculus, SC2.05 Acid-Base Chemistry), then P1 modules (GP3.01 Wave Physics, SC2.06 Redox Reactions), and finally homepage fixes.

Each module follows the established CHAMBER_MODULE_STANDARDS with Mixed Mode layout, ChamberLayout component, useQuestManager hook, complete EN/CN/DE translations, and Basel-contextualized scenarios.

## Tasks

- [ ] 1. Setup and Infrastructure
  - Create module directory structure for all four modules
  - Set up TypeScript interfaces for quest types
  - Configure testing framework with fast-check for property-based testing
  - _Requirements: 11.1, 11.2, 11.3, 11.6_

- [ ] 2. GM1.02 - Integral Calculus Module (P0)
  - [ ] 2.1 Create GM1.02 page structure and quest data pools
    - Create `src/app/chamber/gm1-02/page.tsx`
    - Define IntegralQuest interface extending Quest
    - Create data pools for three stages (Antiderivatives, Definite Integrals, Applications)
    - Each difficulty level (BASIC, CORE, ADVANCED, ELITE) with 4-5 questions
    - Implement buildStagePool function
    - _Requirements: 1.1, 1.2, 6.1, 6.2_

  - [ ] 2.2 Implement GM1.02 visualization component
    - Create `src/components/chamber/gm1-02/IntegralVisualization.tsx`
    - Implement 2D function graph with SVG
    - Add shaded area representation for definite integrals
    - Implement auto-scaling with 50% padding
    - Implement smart label positioning (avoid axes overlap)
    - Show function curve, integral bounds, and calculated area
    - _Requirements: 1.3, 1.8, 7.1, 7.2, 7.3, 7.4, 7.5_

  - [ ] 2.3 Add GM1.02 translations (EN/CN/DE)
    - Add translations to `src/lib/i18n/en/math.ts`
    - Add translations to `src/lib/i18n/cn/math.ts`
    - Add translations to `src/lib/i18n/de/math.ts`
    - Include detailed Basel-contextualized scenarios (150-250 words each)
    - Scenarios: Roche pharmaceutical dosage calculations, Basel bridge construction, Rhine River flow analysis
    - Ensure all LaTeX formulas use InlineMath/BlockMath components
    - _Requirements: 1.4, 1.6, 1.7, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 9.1, 9.2, 9.3, 9.4, 9.5_

  - [ ]* 2.4 Write property tests for GM1.02
    - **Property 1**: Question pool size (4-5 questions per difficulty)
    - **Property 2**: LaTeX rendering (all formulas use KaTeX)
    - **Property 3**: Numerical validation tolerance (±0.01)
    - **Property 6**: Auto-scaling bounds (50% padding)
    - **Property 7**: Smart label positioning (15° from axes)
    - **Validates: Requirements 1.2, 1.4, 1.5, 1.8, 7.4**

  - [ ]* 2.5 Write unit tests for GM1.02
    - Test specific integrals: ∫x dx = x²/2 + C, ∫₀¹ x² dx = 1/3
    - Test edge cases: zero bounds, negative bounds, large values
    - Test visualization with small and large function ranges
    - Test language switching updates all text
    - _Requirements: 1.5, 8.2_

- [ ] 3. SC2.05 - Acid-Base Chemistry Module (P0)
  - [ ] 3.1 Create SC2.05 page structure and quest data pools
    - Create `src/app/chamber/sc2-05/page.tsx`
    - Define AcidBaseQuest interface extending Quest
    - Create data pools for three stages (pH Basics, Neutralization, Titration)
    - Each difficulty level with 4-5 questions
    - Implement buildStagePool function
    - _Requirements: 2.1, 2.2, 6.1, 6.2_

  - [ ] 3.2 Implement SC2.05 visualization component
    - Create `src/components/chamber/sc2-05/AcidBaseVisualization.tsx`
    - Implement pH scale visualization (0-14 gradient)
    - Add molecular structure diagrams for acids/bases
    - Implement titration curve visualization
    - Use color coding: red (pH < 7), green (pH = 7), blue (pH > 7)
    - Implement auto-scaling for titration curves
    - _Requirements: 2.3, 2.8, 7.1, 7.2, 7.6_

  - [ ] 3.3 Add SC2.05 translations (EN/CN/DE)
    - Add translations to `src/lib/i18n/en/chemistry.ts`
    - Add translations to `src/lib/i18n/cn/chemistry.ts`
    - Add translations to `src/lib/i18n/de/chemistry.ts`
    - Include detailed Basel-contextualized scenarios (150-250 words each)
    - Scenarios: Novartis pharmaceutical pH control, Roche drug formulation, Basel water treatment
    - Ensure all chemical formulas use LaTeX
    - _Requirements: 2.4, 2.6, 2.7, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 9.1, 9.2, 9.3, 9.4, 9.5_

  - [ ]* 3.4 Write property tests for SC2.05
    - **Property 1**: Question pool size (4-5 questions per difficulty)
    - **Property 2**: LaTeX rendering (all formulas use KaTeX)
    - **Property 3**: Numerical validation tolerance (±0.1 for pH)
    - **Property 17**: Color coding (red/green/blue based on pH)
    - **Validates: Requirements 2.2, 2.4, 2.5, 2.8**

  - [ ]* 3.5 Write unit tests for SC2.05
    - Test specific pH calculations: pH of 0.1M HCl = 1, pH of water = 7
    - Test neutralization: moles acid = moles base at equivalence
    - Test color coding: pH=3→red, pH=7→green, pH=11→blue
    - Test edge cases: very strong acids (pH < 0), very strong bases (pH > 14)
    - _Requirements: 2.5, 2.8_

- [ ] 4. Checkpoint - P0 Modules Complete
  - Ensure all tests pass for GM1.02 and SC2.05
  - Run `npm run build` and verify no errors
  - Test all difficulty levels and stages in browser
  - Test all three languages (EN/CN/DE) in browser
  - Verify visualizations render correctly
  - Ask the user if questions arise

- [ ] 5. GP3.01 - Wave Physics Module (P1)
  - [ ] 5.1 Create GP3.01 page structure and quest data pools
    - Create `src/app/chamber/gp3-01/page.tsx`
    - Define WaveQuest interface extending Quest
    - Create data pools for three stages (Wave Properties, Interference, Applications)
    - Each difficulty level with 4-5 questions
    - Implement buildStagePool function
    - _Requirements: 3.1, 3.2, 6.1, 6.2_

  - [ ] 5.2 Implement GP3.01 visualization component
    - Create `src/components/chamber/gp3-01/WaveVisualization.tsx`
    - Implement animated wave visualization using Canvas API
    - Show amplitude, wavelength, and frequency visually
    - Implement interference patterns for superposition
    - Add real-time animation at 60fps
    - Implement auto-scaling for different wave parameters
    - _Requirements: 3.3, 7.1, 7.2, 7.7, 12.6_

  - [ ] 5.3 Add GP3.01 translations (EN/CN/DE)
    - Add translations to `src/lib/i18n/en/physics.ts`
    - Add translations to `src/lib/i18n/cn/physics.ts`
    - Add translations to `src/lib/i18n/de/physics.ts`
    - Include detailed Basel-contextualized scenarios (150-250 words each)
    - Scenarios: Rhine River wave analysis, Basel concert hall acoustics, seismic monitoring
    - Ensure all physics formulas use LaTeX
    - _Requirements: 3.4, 3.6, 3.7, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 9.1, 9.3, 9.4, 9.5_

  - [ ]* 5.4 Write property tests for GP3.01
    - **Property 1**: Question pool size (4-5 questions per difficulty)
    - **Property 2**: LaTeX rendering (all formulas use KaTeX)
    - **Property 3**: Numerical validation tolerance (±0.01)
    - **Property 18**: Animation frame rate (≥60fps)
    - **Validates: Requirements 3.2, 3.4, 3.5, 7.7, 12.6**

  - [ ]* 5.5 Write unit tests for GP3.01
    - Test wave equation: v = fλ with specific values
    - Test standing wave nodes at λ/2 intervals
    - Test interference patterns (constructive/destructive)
    - Test animation performance over 5 seconds
    - _Requirements: 3.5, 7.7_

- [ ] 6. SC2.06 - Redox Reactions Module (P1)
  - [ ] 6.1 Create SC2.06 page structure and quest data pools
    - Create `src/app/chamber/sc2-06/page.tsx`
    - Define RedoxQuest interface extending Quest
    - Create data pools for three stages (Oxidation States, Electron Transfer, Electrochemical Cells)
    - Each difficulty level with 4-5 questions
    - Implement buildStagePool function
    - _Requirements: 4.1, 4.2, 6.1, 6.2_

  - [ ] 6.2 Implement SC2.06 visualization component
    - Create `src/components/chamber/sc2-06/RedoxVisualization.tsx`
    - Implement electron flow diagram with animated arrows
    - Show oxidation state changes with color coding
    - Implement electrochemical cell diagram (anode/cathode)
    - Use color coding to distinguish oxidation (red) and reduction (blue)
    - Implement auto-scaling for complex reactions
    - _Requirements: 4.3, 4.8, 7.1, 7.2, 7.6_

  - [ ] 6.3 Add SC2.06 translations (EN/CN/DE)
    - Add translations to `src/lib/i18n/en/chemistry.ts`
    - Add translations to `src/lib/i18n/cn/chemistry.ts`
    - Add translations to `src/lib/i18n/de/chemistry.ts`
    - Include detailed Basel-contextualized scenarios (150-250 words each)
    - Scenarios: Novartis pharmaceutical synthesis, Roche battery research, Basel electroplating industry
    - Ensure all chemical equations use LaTeX
    - _Requirements: 4.4, 4.6, 4.7, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 9.1, 9.2, 9.3, 9.4, 9.5_

  - [ ]* 6.4 Write property tests for SC2.06
    - **Property 1**: Question pool size (4-5 questions per difficulty)
    - **Property 2**: LaTeX rendering (all formulas use KaTeX)
    - **Property 3**: Numerical validation tolerance (±0.01)
    - **Validates: Requirements 4.2, 4.4, 4.5**

  - [ ]* 6.5 Write unit tests for SC2.06
    - Test oxidation state calculations: Fe in Fe₂O₃ is +3
    - Test electron balance: electrons lost = electrons gained
    - Test electrochemical cell potential calculations
    - Test edge cases: zero oxidation state, fractional oxidation states
    - _Requirements: 4.5_

- [ ] 7. Checkpoint - P1 Modules Complete
  - Ensure all tests pass for GP3.01 and SC2.06
  - Run `npm run build` and verify no errors
  - Test all difficulty levels and stages in browser
  - Test all three languages (EN/CN/DE) in browser
  - Verify visualizations and animations render correctly
  - Ask the user if questions arise

- [ ] 8. Homepage Display Fixes
  - [ ] 8.1 Add missing module links to homepage
    - Add GP2.02 (Thermodynamics I) to physics section in `src/app/page.tsx`
    - Add SC1.05 (Bonding Lab) to chemistry section
    - Add SC3.05 (Chemical Bonds Advanced) to chemistry section
    - Verify links navigate to correct module pages
    - _Requirements: 5.1, 5.2, 5.3, 5.6_

  - [ ] 8.2 Resolve SB2.02 duplication
    - Identify duplicate entries for SB2.02 and SB2.02-body-systems
    - Keep only one entry (SB2.02) with correct title and link
    - Remove duplicate entry
    - Verify no broken links
    - _Requirements: 5.4_

  - [ ] 8.3 Verify SP3.07 content
    - Check that SP3.07 module page exists at `src/app/chamber/sp3-07/page.tsx`
    - Verify module renders correctly
    - Verify translations exist for all three languages
    - Verify visualization component works
    - If issues found, document and fix
    - _Requirements: 5.5_

  - [ ]* 8.4 Write property tests for homepage
    - **Property 12**: Module link navigation (all links go to /chamber/{code})
    - **Property 13**: Module card styling consistency
    - **Validates: Requirements 5.6, 5.7**

  - [ ]* 8.5 Write unit tests for homepage
    - Test GP2.02 link exists and navigates correctly
    - Test SC1.05 link exists and navigates correctly
    - Test SC3.05 link exists and navigates correctly
    - Test no duplicate SB2.02 entries
    - Test SP3.07 link exists and navigates correctly
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 9. Integration Testing and Quality Assurance
  - [ ] 9.1 Run comprehensive test suite
    - Run all unit tests: `npm test`
    - Run all property tests with 100+ iterations
    - Verify all tests pass
    - Generate coverage report
    - Ensure coverage meets thresholds (80% minimum)
    - _Requirements: 10.1, 10.2, 10.3, 10.10_

  - [ ] 9.2 Browser testing - English (EN)
    - Test all four modules in English
    - Verify all text displays correctly
    - Verify all LaTeX formulas render correctly
    - Verify all visualizations render correctly
    - Test all difficulty levels and stages
    - Test input validation and error messages
    - _Requirements: 8.2, 8.10_

  - [ ] 9.3 Browser testing - Chinese (CN)
    - Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
    - Switch to Chinese language
    - Test all four modules in Chinese
    - Verify difficulty labels show "基础/核心/进阶/精英" (not BASIC/CORE/ADVANCED/ELITE)
    - Verify all scenarios are in Chinese (150-250 words)
    - Verify LaTeX formulas with Chinese text use \\text{} wrapper
    - Test all stages and difficulty levels
    - _Requirements: 8.2, 8.3, 8.4, 8.6, 8.10_

  - [ ] 9.4 Browser testing - German (DE)
    - Clear browser cache
    - Switch to German language
    - Test all four modules in German
    - Verify difficulty labels show "BASIS/KERN/ERWEITERT/ELITE"
    - Verify all scenarios are in German (150-250 words)
    - Test German decimal comma format (3,14 parses correctly)
    - Test all stages and difficulty levels
    - _Requirements: 8.2, 8.3, 8.4, 8.7, 8.10_

  - [ ] 9.5 Performance testing
    - Test module load time < 2 seconds on 3G connection
    - Test animation frame rate ≥ 60fps for wave physics
    - Test visualization rendering with large data sets
    - Test memory usage during extended use
    - _Requirements: 12.1, 12.6_

  - [ ] 9.6 Accessibility testing
    - Test keyboard navigation (Tab, Enter, Space)
    - Verify all interactive elements are ≥ 44×44px
    - Test with screen reader (basic functionality)
    - Verify semantic HTML structure
    - Check text contrast ratios (≥ 4.5:1)
    - _Requirements: 12.3, 12.4, 12.5, 12.10_

  - [ ] 9.7 Mobile responsive testing
    - Test on mobile viewport (375×667px)
    - Test on tablet viewport (768×1024px)
    - Test on desktop viewport (1920×1080px)
    - Verify all layouts adapt correctly
    - Verify touch targets are adequate
    - _Requirements: 12.2, 12.3_

- [ ] 10. Code Quality and Linting
  - [ ] 10.1 Run linting and type checking
    - Run `npm run lint` and fix all warnings
    - Run `npm run type-check` (or `tsc --noEmit`) and fix all errors
    - Ensure no `any` types used
    - Ensure all functions have explicit return types
    - _Requirements: 11.7, 11.8_

  - [ ] 10.2 Code review checklist
    - Verify all modules use ChamberLayout component
    - Verify all modules use useQuestManager hook
    - Verify all translations in correct i18n file locations
    - Verify all LaTeX formulas use InlineMath/BlockMath
    - Verify all visualizations implement auto-scaling
    - Verify all visualizations implement smart label positioning
    - Verify all scenarios are 150-250 words
    - Verify all scenarios reference Basel locations/companies
    - _Requirements: 1.9, 1.10, 2.9, 2.10, 3.9, 3.10, 4.9, 4.10, 11.1, 11.2, 11.5, 11.6_

- [ ] 11. Final Build and Deployment Preparation
  - [ ] 11.1 Production build
    - Run `npm run build`
    - Verify build completes without errors
    - Verify build output size is reasonable
    - Test production build locally
    - _Requirements: 10.10_

  - [ ] 11.2 Documentation updates
    - Update CURRICULUM_PLAN_UPDATE_2026_v2.md with completion status
    - Update DEVELOPMENT_STATUS_2026-02-15.md with new module count
    - Create or update module-specific documentation
    - Document any known issues or limitations
    - _Requirements: N/A (documentation)_

  - [ ] 11.3 Git commit and push
    - Stage all changes: `git add -A`
    - Commit with descriptive message: `git commit -m "feat: implement critical modules phase 1 (GM1.02, SC2.05, GP3.01, SC2.06) and homepage fixes"`
    - Push to GitHub: `git push`
    - _Requirements: N/A (deployment)_

- [ ] 12. Final Checkpoint - Complete
  - All modules implemented and tested
  - All tests passing (unit + property)
  - All three languages verified in browser
  - Build succeeds without errors
  - Code quality checks pass
  - Documentation updated
  - Changes pushed to GitHub
  - Ask the user for final approval

## Notes

- Tasks marked with `*` are optional test-related sub-tasks that can be skipped for faster MVP
- Each module follows the same pattern: page structure → visualization → translations → tests
- P0 modules (GM1.02, SC2.05) must be completed before P1 modules (GP3.01, SC2.06)
- Homepage fixes can be done in parallel with P1 modules
- Checkpoints ensure incremental validation and early issue detection
- Browser testing in all three languages is critical - do not skip
- Performance and accessibility testing ensure production readiness

## Estimated Timeline

- **Week 1**: GM1.02 (P0) - 7 days
- **Week 2**: SC2.05 (P0) - 7 days
- **Week 3**: GP3.01 (P1) - 7 days
- **Week 4**: SC2.06 (P1) - 7 days
- **Week 5**: Homepage fixes + Integration testing + QA - 5 days

**Total**: 33 days (approximately 6-7 weeks with buffer)

## Success Criteria

- All four modules (GM1.02, SC2.05, GP3.01, SC2.06) fully functional
- Homepage displays all required modules without duplicates
- All tests pass (unit + property, 100+ iterations each)
- All three languages (EN/CN/DE) verified in browser
- Build succeeds without errors or warnings
- Performance targets met (< 2s load, 60fps animation)
- Accessibility standards met (WCAG AA)
- Code quality standards met (no lint errors, no TypeScript errors)
- Documentation updated and complete
