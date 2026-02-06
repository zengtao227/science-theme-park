# Implementation Plan: Science Park Fixes

## Overview

This implementation plan addresses critical issues in the Science Theme Park application following a two-phase approach: Week 1 focuses on critical fixes (titles, layout, graphics, routing), and Week 2-3 covers enhancements (translations, localization, user system). All tasks build incrementally and maintain existing functionality.

## Tasks

- [ ] 1. Fix missing module titles on homepage
  - Verify translation keys exist for SM2.07, SM3.02, SM3.04 in src/lib/i18n.ts
  - Update module arrays in src/app/page.tsx to properly reference translation keys
  - Add fallback mechanism in ModuleCard component for missing titles
  - Test title display for all three modules in all languages (EN, DE, CN)
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ]* 1.1 Write property test for translation key retrieval
  - **Property 1: Translation Key Retrieval**
  - **Validates: Requirements 1.1, 1.2**

- [ ]* 1.2 Write unit tests for specific module titles
  - Test SM2.07, SM3.02, SM3.04 title display
  - Test fallback for missing translation keys
  - _Requirements: 1.3, 1.4_

- [ ] 2. Research and document SM1.02 curriculum alignment
  - Review Basel curriculum documents (Lehrplan 21) for Sekundarschule Year 1
  - Document whether 4D Hyper-Geometry is age-appropriate for 7th grade
  - Create curriculum metadata structure for all modules
  - Decide on SM1.02 placement (move to Gymnasium or mark as Enrichment)
  - Update module organization in src/app/page.tsx based on decision
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ]* 2.1 Write property test for module metadata completeness
  - **Property 12: Module Metadata Completeness**
  - **Validates: Requirements 5.4, 5.5**

- [ ] 3. Convert horizontal layouts to vertical orientation
  - [ ] 3.1 Analyze SM2.03 reference implementation
    - Document canvas configuration and layout pattern
    - Identify key characteristics of vertical layout
    - _Requirements: 2.2_
  
  - [ ] 3.2 Convert SM2.02 (Pythagoras) to vertical layout
    - Update PythagorasCanvas component dimensions
    - Adjust camera position for vertical view
    - Reposition 3D triangle objects
    - Test interactive functionality
    - _Requirements: 2.1, 2.3, 2.4_
  
  - [ ] 3.3 Convert SM2.01 (Binomial Factory) to vertical layout
    - Update BinomialCanvas component dimensions
    - Adjust square dissection visualization
    - Reposition interactive blocks
    - Test drag-and-drop functionality
    - _Requirements: 2.1, 2.3, 2.4_
  
  - [ ] 3.4 Convert SM3.02 (Trigonometry) to vertical layout
    - Update TrigCanvas component dimensions
    - Adjust circle and wave visualizations
    - Optimize for vertical monitor area
    - Test angle controls and wave display
    - _Requirements: 2.1, 2.3, 2.4_

- [ ]* 3.5 Write property test for vertical aspect ratio
  - **Property 3: Vertical Layout Aspect Ratio**
  - **Validates: Requirements 2.3, 2.4**

- [ ] 4. Checkpoint - Verify layout conversions
  - Ensure all converted modules display correctly
  - Test interactive elements work in vertical layout
  - Ask user if questions arise


- [ ] 5. Enlarge 3D graphics and visualizations
  - [ ] 5.1 Increase canvas dimensions for all 3D modules
    - Update canvas style height to 900px (from ~600px)
    - Ensure width: 100% with max-width constraints
    - Add responsive aspect-ratio CSS
    - _Requirements: 3.1_
  
  - [ ] 5.2 Scale 3D objects in visualizations
    - Increase mesh scale factors by 1.5x minimum
    - Adjust camera FOV and position for larger objects
    - Update lighting for larger scenes
    - _Requirements: 3.1, 3.3_
  
  - [ ] 5.3 Enlarge SM3.02 trigonometry circle specifically
    - Increase circle radius from 2 to 3.5 units
    - Adjust wave amplitude and frequency display
    - Update coordinate labels for larger scale
    - _Requirements: 3.2_
  
  - [ ] 5.4 Verify no horizontal overflow
    - Test at 1920x1080 resolution
    - Add CSS overflow: hidden to monitor containers
    - Ensure responsive behavior on smaller screens
    - _Requirements: 3.5_

- [ ]* 5.5 Write property test for graphics size increase
  - **Property 4: Graphics Size Increase**
  - **Validates: Requirements 3.1, 3.3**

- [ ]* 5.6 Write property test for no horizontal overflow
  - **Property 5: No Horizontal Overflow**
  - **Validates: Requirements 3.5**

- [ ] 6. Fix SM2.01 intermittent 404 errors
  - [ ] 6.1 Add error boundary to SM2.01 module
    - Create src/app/chamber/sm2-01/error.tsx
    - Implement error UI with retry button
    - Add error logging
    - _Requirements: 6.3, 6.4_
  
  - [ ] 6.2 Add loading state to SM2.01 module
    - Create src/app/chamber/sm2-01/loading.tsx
    - Implement loading spinner/skeleton
    - _Requirements: 6.1_
  
  - [ ] 6.3 Verify static generation configuration
    - Add metadata export to page.tsx
    - Remove any dynamic server dependencies
    - Test build output for static generation
    - _Requirements: 6.5_
  
  - [ ] 6.4 Add component lifecycle logging
    - Log mount/unmount events
    - Track navigation to SM2.01 route
    - Monitor for load failures
    - _Requirements: 6.4_

- [ ]* 6.5 Write property test for route accessibility
  - **Property 10: Route Accessibility**
  - **Validates: Requirements 6.5**

- [ ]* 6.6 Write property test for error logging
  - **Property 11: Error Logging**
  - **Validates: Requirements 6.3, 6.4**

- [ ] 7. Checkpoint - Week 1 fixes complete
  - Verify all Week 1 tasks completed
  - Test critical fixes on deployed version
  - Ensure all tests pass
  - Ask user if questions arise

- [ ] 8. Audit and fix hardcoded translations
  - [ ] 8.1 Create translation audit utility
    - Implement src/lib/translation-audit.ts
    - Scan for hardcoded string literals in components
    - Generate report of violations
    - _Requirements: 4.2_
  
  - [ ] 8.2 Fix SM1.02 hardcoded English text
    - Add missing translation keys to src/lib/i18n.ts
    - Replace hardcoded strings with translation references
    - Test in all three languages
    - _Requirements: 4.4_
  
  - [ ] 8.3 Audit and fix remaining modules
    - Run translation audit on all module components
    - Add missing translation keys
    - Replace hardcoded strings systematically
    - _Requirements: 4.1, 4.2_
  
  - [ ] 8.4 Implement translation fallback mechanism
    - Add warning logging for missing keys
    - Display key name as fallback
    - Test with non-existent keys
    - _Requirements: 4.3_

- [ ]* 8.5 Write property test for translation completeness
  - **Property 2: Translation Completeness**
  - **Validates: Requirements 4.1, 4.2, 4.5**

- [ ]* 8.6 Write property test for translation fallback
  - **Property 8: Translation Fallback**
  - **Validates: Requirements 4.3**


- [ ] 9. Add Basel-specific localization
  - [ ] 9.1 Create Basel context database
    - Implement src/lib/basel-context.ts
    - Add geometry, chemistry, physics, finance contexts
    - Include translations for all three languages
    - _Requirements: 7.1, 7.2, 7.3, 7.4_
  
  - [ ] 9.2 Integrate Basel context into geometry modules
    - Update SM1.01 (Areas & Volumes) with Basel tram windows
    - Update SM2.02 (Pythagoras) with Basel Cathedral shadows
    - Update relevant quest prompts and examples
    - _Requirements: 7.1_
  
  - [ ] 9.3 Integrate Basel context into chemistry modules
    - Update SC1.02 (Mole Master) with Novartis/Roche references
    - Update chemistry lab examples
    - _Requirements: 7.2_
  
  - [ ] 9.4 Integrate Basel context into physics modules
    - Update SP1.03 (Energy & Power) with Rhine hydropower
    - Update relevant physics examples with Basel trams
    - _Requirements: 7.4_
  
  - [ ] 9.5 Integrate Basel context into finance modules
    - Update SM3.03 (Exponential Growth) with Swiss bank examples
    - Update compound interest problems
    - _Requirements: 7.3_

- [ ] 10. Review and fix German translations
  - [ ] 10.1 Create Hochdeutsch validation utility
    - Implement Swiss dialect pattern detection
    - Create standard German math vocabulary reference
    - _Requirements: 8.1, 8.2, 8.4_
  
  - [ ] 10.2 Audit all German translations
    - Run validation on all DE translations in src/lib/i18n.ts
    - Identify Swiss dialect violations
    - Check mathematical terminology
    - _Requirements: 8.1, 8.2, 8.4_
  
  - [ ] 10.3 Fix German translation violations
    - Replace Swiss dialect with Hochdeutsch
    - Standardize mathematical terms
    - Ensure academic tone
    - _Requirements: 8.1, 8.2, 8.4_
  
  - [ ] 10.4 Verify German terminology consistency
    - Check same concepts use same terms across modules
    - Create terminology glossary
    - _Requirements: 8.5_

- [ ]* 10.5 Write property test for Hochdeutsch compliance
  - **Property 6: Hochdeutsch Compliance**
  - **Validates: Requirements 8.1, 8.2, 8.4**

- [ ]* 10.6 Write property test for German terminology consistency
  - **Property 7: German Terminology Consistency**
  - **Validates: Requirements 8.5**

- [ ] 11. Implement user identification system
  - [ ] 11.1 Extend Zustand store with user state
    - Add UserProfile interface to src/lib/store.ts
    - Add currentUser, users, userProgress, userHistory state
    - Implement user management actions
    - _Requirements: 9.2, 9.3, 9.5_
  
  - [ ] 11.2 Create UserSetup component
    - Implement src/components/UserSetup.tsx
    - Add username input form
    - Handle first-visit flow
    - _Requirements: 9.1_
  
  - [ ] 11.3 Create UserSwitcher component
    - Implement src/components/UserSwitcher.tsx
    - Add user dropdown menu
    - Add "Add User" functionality
    - _Requirements: 9.4_
  
  - [ ] 11.4 Integrate user system into app
    - Check for currentUser on app load
    - Show UserSetup if no user exists
    - Add UserSwitcher to header
    - _Requirements: 9.1, 9.4_
  
  - [ ] 11.5 Scope progress and history by user
    - Update completeStage to use currentUser
    - Update getModuleProgress to use currentUser
    - Update history tracking to use currentUser
    - Test data isolation between users
    - _Requirements: 9.3, 9.5_

- [ ]* 11.6 Write property test for user data isolation
  - **Property 9: User Data Isolation**
  - **Validates: Requirements 9.2, 9.3, 9.5**

- [ ] 12. Final integration and testing
  - [ ] 12.1 Run full test suite
    - Execute all unit tests
    - Execute all property tests
    - Verify 100+ iterations per property test
    - _Requirements: 10.3_
  
  - [ ] 12.2 Manual testing checklist
    - Test all Week 1 fixes
    - Test all Week 2-3 enhancements
    - Test on multiple browsers
    - Test responsive design
    - _Requirements: 10.3_
  
  - [ ] 12.3 Verify Vercel deployment
    - Push changes to repository
    - Monitor auto-deploy process
    - Test deployed application
    - _Requirements: 10.3_

- [ ]* 12.4 Write property test for existing functionality preservation
  - **Property 13: Existing Functionality Preservation**
  - **Validates: Requirements 10.3**

- [ ] 13. Final checkpoint - All fixes complete
  - Ensure all tests pass
  - Verify no regressions
  - Document any remaining issues
  - Ask user for final approval

## Notes

- Tasks marked with `*` are optional property-based tests and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Week 1 tasks (1-7) are critical fixes
- Week 2-3 tasks (8-13) are enhancements
- All changes maintain existing functionality
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
