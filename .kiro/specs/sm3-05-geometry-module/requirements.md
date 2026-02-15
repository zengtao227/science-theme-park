# SM3.05 3D Geometry Module - Requirements

**Feature Name**: sm3-05-geometry-module  
**Status**: DRAFT  
**Priority**: HIGH  
**Target Module**: SM3.05 (3D Geometry Advanced)  
**Estimated Effort**: 1-2 days  

---

## 1. Background & Motivation

### Current Problems
1. **Incomplete Implementation**: SM3.05 currently uses simplified pattern with placeholder questions
2. **Build Failure**: Module doesn't follow the full quest pool pattern required by CHAMBER_MODULE_STANDARDS.md
3. **Missing Quest Content**: Only has 1 placeholder question per stage instead of 4-5 questions per difficulty level
4. **Incomplete Integration**: Visualization component exists but not properly integrated with ChamberLayout

### Goals
- Implement SM3.05 following the full quest pool pattern (like SM2.10 and SP3.05)
- Create detailed quest pools with 4-5 questions per difficulty level (BASIC/CORE/ADVANCED/ELITE)
- Ensure all three languages (EN/DE/CN) have complete 150-250 word scenarios
- Integrate GeometryVisualization component properly
- Pass build verification (`npm run build`)

---

## 2. User Stories

### US-1: Complete Quest Pool Implementation
**As a** student learning 3D geometry  
**I want to** practice with multiple questions at each difficulty level  
**So that** I can progressively master polyhedra, cross-sections, and spatial reasoning

**Acceptance Criteria**:
- AC-1.1: POLYHEDRA stage has 4-5 questions each for BASIC, CORE, ADVANCED, ELITE difficulties
- AC-1.2: CROSS_SECTIONS stage has 4-5 questions each for BASIC, CORE, ADVANCED, ELITE difficulties
- AC-1.3: SPATIAL_REASONING stage has 4-5 questions each for BASIC, CORE, ADVANCED, ELITE difficulties
- AC-1.4: Each question has proper LaTeX formatting for prompts, expressions, and answers
- AC-1.5: Questions progress logically from simple to complex within each stage
- AC-1.6: All questions are mathematically accurate and educationally sound

### US-2: Proper ChamberLayout Integration
**As a** developer maintaining the codebase  
**I want** SM3.05 to follow the same pattern as SM2.10 and SP3.05  
**So that** the module is consistent with other modules and maintainable

**Acceptance Criteria**:
- AC-2.1: Page component uses individual props (not questManager prop) for ChamberLayout
- AC-2.2: Implements all required hooks: useQuestManager, useEffect, useCallback, useMemo
- AC-2.3: Properly handles stage completion with completeStage callback
- AC-2.4: Displays scenarios from translations in objective section
- AC-2.5: Shows "Module Complete!" message when all quests are done
- AC-2.6: Integrates GeometryVisualization component in monitorContent prop

### US-3: Complete Multilingual Support
**As a** student using the platform in different languages  
**I want** complete and detailed scenario descriptions in my language  
**So that** I understand the context and purpose of each geometry stage

**Acceptance Criteria**:
- AC-3.1: English scenarios are 150-250 words with detailed Basel context
- AC-3.2: German scenarios are 150-250 words, complete and detailed (not simplified)
- AC-3.3: Chinese scenarios are 150-250 words, complete translation
- AC-3.4: All UI text (title, stages, buttons) translated in all three languages
- AC-3.5: Translations already exist in i18n files (verified in context transfer)

---

## 3. Technical Requirements

### TR-1: Quest Pool Structure
- Implement `buildStagePool` function with actual geometry questions
- Each stage (POLYHEDRA, CROSS_SECTIONS, SPATIAL_REASONING) must have complete quest pools
- Each difficulty level (BASIC, CORE, ADVANCED, ELITE) must have 4-5 questions
- Questions must include:
  - Unique ID (e.g., "POLY-B1", "CS-C2", "SR-A3")
  - Stage identifier
  - Difficulty level
  - LaTeX-formatted prompt
  - LaTeX-formatted expression/formula
  - Target answer in LaTeX
  - Input slots with labels and expected values
  - Correct answer in LaTeX
  - Optional hints in LaTeX

### TR-2: Component Architecture
- Follow the exact pattern used in SM2.10 and SP3.05
- Use `useQuestManager` hook with proper type parameters
- Implement proper state management with useEffect, useCallback, useMemo
- Pass individual props to ChamberLayout (not questManager object)
- Integrate visualization component via monitorContent prop

### TR-3: Visualization Integration
- Use existing GeometryVisualization component
- Pass current stage to visualization
- Ensure visualization updates when stage changes
- Visualization should be educational, not just decorative

### TR-4: Build Verification
- Module must pass `npm run build` without errors
- No TypeScript compilation errors
- No missing translation keys
- No runtime errors in browser

---

## 4. Quest Content Requirements

### Stage 1: POLYHEDRA
**BASIC**: Counting faces, edges, vertices of simple polyhedra (cube, tetrahedron, octahedron)  
**CORE**: Euler's formula (V - E + F = 2), surface area calculations  
**ADVANCED**: Volume calculations, dual polyhedra relationships  
**ELITE**: Complex polyhedra (dodecahedron, icosahedron), Platonic solids properties

### Stage 2: CROSS_SECTIONS
**BASIC**: Identifying 2D shapes from simple cuts (cube → square, triangle)  
**CORE**: Predicting cross-section shapes from different cutting angles  
**ADVANCED**: Calculating cross-section areas, maximum cross-section problems  
**ELITE**: Complex cross-sections, conic sections from cylinders and cones

### Stage 3: SPATIAL_REASONING
**BASIC**: Counting cubes in simple 3D arrangements  
**CORE**: Visualizing rotations, identifying hidden faces  
**ADVANCED**: Net folding problems, 3D coordinate geometry  
**ELITE**: Complex spatial transformations, 3D vector problems

---

## 5. Non-Functional Requirements

### NFR-1: Code Quality
- Follow TypeScript best practices
- Use proper type annotations
- Follow existing code style and conventions
- Add comments for complex logic

### NFR-2: Performance
- Module loads in < 2 seconds
- No lag when switching stages or difficulties
- Visualization renders smoothly

### NFR-3: Maintainability
- Code structure matches SM2.10 and SP3.05 patterns
- Easy to add new questions in the future
- Clear separation of concerns

### NFR-4: Accessibility
- All LaTeX formulas render correctly
- Input fields have proper labels
- Color contrast meets WCAG standards

---

## 6. Out of Scope

- Creating new visualization components (use existing GeometryVisualization)
- Adding new difficulty levels beyond BASIC/CORE/ADVANCED/ELITE
- Implementing interactive 3D manipulation in visualization
- Adding animation to geometry visualization
- Mobile-specific optimizations

---

## 7. Dependencies

### Internal Dependencies
- Existing ChamberLayout component
- Existing useQuestManager hook
- Existing i18n system with sm3_05 translations
- Existing GeometryVisualization component at `src/components/chamber/sm3-05/GeometryVisualization.tsx`

### External Dependencies
- react-katex for LaTeX rendering
- katex CSS for formula styling

---

## 8. Success Metrics

### Quantitative
- Build passes without errors
- All 3 stages × 4 difficulties × 4-5 questions = 48-60 total questions implemented
- All 3 languages display correctly in browser
- Module completion rate > 90%

### Qualitative
- Code follows established patterns
- Questions are educationally sound
- Scenarios provide meaningful context
- Visualization enhances understanding

---

## 9. Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Questions too difficult for target level | Medium | Low | Review Basel curriculum standards, test with sample students |
| LaTeX rendering issues | Low | Low | Use tested LaTeX patterns from SM2.10/SP3.05 |
| Visualization not helpful | Low | Medium | Focus on educational value, show key geometric properties |
| Build failures | High | Low | Test build after each major change |
| Translation inconsistencies | Low | Low | Translations already complete, just verify display |

---

## 10. Implementation Phases

### Phase 1: Quest Pool Implementation
**Goal**: Create all questions for all stages and difficulties
- Implement buildStagePool function
- Create POLYHEDRA questions (BASIC, CORE, ADVANCED, ELITE)
- Create CROSS_SECTIONS questions (BASIC, CORE, ADVANCED, ELITE)
- Create SPATIAL_REASONING questions (BASIC, CORE, ADVANCED, ELITE)
- Verify LaTeX formatting

### Phase 2: Component Integration
**Goal**: Integrate with ChamberLayout following established pattern
- Rewrite page.tsx to follow SM2.10/SP3.05 pattern
- Implement all required hooks and state management
- Integrate GeometryVisualization component
- Add stage completion tracking
- Display scenarios from translations

### Phase 3: Testing & Verification
**Goal**: Ensure module works correctly in all languages
- Run `npm run build` and fix any errors
- Test in browser with all three languages
- Test all stages and difficulties
- Verify visualization displays correctly
- Test stage completion and progress tracking

---

## 11. Related Documentation Updates

This spec also requires updating project documentation:

### Update 1: CHAMBER_MODULE_STANDARDS.md
Add new sections:
1. **Mandatory Full Quest Pool Pattern**: Document that all modules MUST use the full pattern with detailed quest pools (4-5 questions per difficulty), not simplified patterns
2. **Visualization Design Principles**: Graphics must serve educational purpose, emphasize readability and UI aesthetics
3. **Translation Quality Standards**: All scenarios must be 150-250 words in all languages (EN/DE/CN)
4. **Future Translation Upgrade Task**: Note that existing modules need scenario translation quality upgrade

### Update 2: CURRICULUM_PLAN_UPDATE_2026_v2.md
Add future phase task:
- **Translation Quality Upgrade**: Review and upgrade all existing module scenarios to meet 150-250 word standard in all three languages

---

## 12. Approval

**Status**: DRAFT - Awaiting Review  
**Next Step**: Review requirements and create design document

