# Math Visualization Overhaul - Requirements

**Feature Name**: math-visualization-overhaul  
**Status**: APPROVED  
**Priority**: HIGH  
**Target Modules**: SM2-01, SM2-02, SM2-03  
**Estimated Effort**: 3-5 days  

---

## 1. Background & Motivation

### Current Problems
1. **SM2-01 (Binomial)**: "Architect/Scrapper" scenarios feel forced and disconnected from the formula `(a+b)²`
2. **SM2-02 (Pythagoras)**: Static grid visualization is boring, "counting squares" is inefficient
3. **SM2-03 (Linear Functions)**: "Laser reflection" gameplay doesn't help students understand slope (m) and intercept (c)

### Goals
- Replace abstract calculations with **physical intuition**
- Introduce **real-world scenarios** that naturally demonstrate mathematical concepts
- Achieve **5-second comprehension** - students should understand the concept without reading lengthy explanations
- Provide **immediate visual feedback** for all parameter adjustments

---

## 2. User Stories

### US-1: Genetics-Based Binomial Learning
**As a** student learning binomial expansion  
**I want to** see genetic inheritance patterns (Punnett Square)  
**So that** I can understand why `(A+a)² = AA + 2Aa + aa` and where the coefficient 2 comes from

**Acceptance Criteria**:
- AC-1.1: User can input parent genotypes (e.g., Aa × Aa, Aa × aa)
- AC-1.2: System displays offspring distribution in a 2×2 or 2×1 grid
- AC-1.3: Visual distinction between AA (pure dominant), 2Aa (heterozygous), aa (pure recessive)
- AC-1.4: Color coding shows phenotype distribution (e.g., red flowers vs white flowers)
- AC-1.5: Animation shows how 2Aa appears from both Aa and aA combinations

### US-2: Fluid-Based Pythagoras Proof
**As a** student learning Pythagorean theorem  
**I want to** see liquid flow between containers representing a², b², c²  
**So that** I can understand area conservation without counting squares

**Acceptance Criteria**:
- AC-2.1: Three square containers (a², b², c²) are displayed around a right triangle
- AC-2.2: Containers a² and b² start filled with "fluid particles"
- AC-2.3: User can rotate the entire apparatus
- AC-2.4: Fluid flows under gravity from a² and b² into c²
- AC-2.5: Fluid exactly fills c², demonstrating `a² + b² = c²` visually
- AC-2.6: Physics simulation uses Matter.js for realistic fluid behavior

### US-3: Slope as Physical Gradient
**As a** student learning linear functions  
**I want to** control a skier/aircraft path by adjusting slope and altitude  
**So that** I can understand m (slope) as steepness and c (intercept) as starting height

**Acceptance Criteria**:
- AC-3.1: Scene shows a ski slope or flight path
- AC-3.2: User can adjust m (slope) parameter with immediate visual feedback
- AC-3.3: Positive m creates upward slope, negative m creates downward slope
- AC-3.4: Larger |m| creates steeper angle
- AC-3.5: User can adjust c (intercept) to change starting height
- AC-3.6: Character (skier/aircraft) animates along the path y = mx + c
- AC-3.7: Optional: obstacles/rings to navigate through

---

## 3. Technical Requirements

### TR-1: Physics Engine Integration
- Install and configure Matter.js for SM2-02 fluid simulation
- Particle system with realistic gravity and collision detection
- Performance: maintain 60fps with 200+ particles

### TR-2: Component Architecture
- Create new components without breaking existing functionality
- Maintain backward compatibility during transition
- Follow existing naming conventions: `[ModuleName]Canvas.tsx`

### TR-3: Responsive Design
- All visualizations must work on screens 800px+ wide
- Maintain 800px minimum height for graphics
- Support both mouse and touch interactions

### TR-4: Internationalization
- All new UI text must support EN, DE, CN languages
- Use existing i18n structure in `src/lib/i18n.ts`
- Maintain consistent terminology with existing modules

---

## 4. Non-Functional Requirements

### NFR-1: Performance
- Initial load time < 2 seconds
- Animation frame rate ≥ 60fps
- Physics simulation should not block UI thread

### NFR-2: Accessibility
- Color-blind friendly palettes
- Keyboard navigation support
- Screen reader compatible labels

### NFR-3: Maintainability
- Well-documented code with JSDoc comments
- Reusable utility functions for common physics operations
- Clear separation of concerns (physics, rendering, UI)

---

## 5. Out of Scope (Phase 1)

- Advanced genetic scenarios (multiple genes, linkage)
- 3D fluid simulation (stick to 2D for performance)
- Multiplayer/competitive modes
- Mobile-specific optimizations (desktop-first approach)

---

## 6. Dependencies

### External Libraries
- `matter-js`: ^0.19.0 (for physics simulation)
- `@types/matter-js`: ^0.19.0 (TypeScript definitions)

### Internal Dependencies
- Existing ChamberLayout component
- Existing i18n system
- Existing quest management hooks

---

## 7. Success Metrics

### Quantitative
- Student comprehension time reduced from 30s to 5s (measured via user testing)
- Task completion rate > 90% (students successfully complete exercises)
- Engagement time increased by 50% (time spent interacting with visualization)

### Qualitative
- Positive feedback on "fun factor" and "clarity"
- Teachers report improved student understanding
- Reduced need for supplementary explanations

---

## 8. Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Matter.js performance issues | High | Medium | Implement particle pooling, limit particle count |
| Complex genetics confuses students | Medium | Low | Start with simple Aa×Aa case, add complexity gradually |
| Physics simulation feels "toy-like" | Low | Medium | Fine-tune parameters for realistic behavior |
| Breaking existing functionality | High | Low | Thorough testing, feature flags for gradual rollout |

---

## 9. Implementation Phases

### Phase 1: Foundation (Current)
- Set up Matter.js
- Create basic component structure
- Implement SM2-02 (Pythagoras Fluid) as proof of concept

### Phase 2: Core Features
- Implement SM2-01 (Mendel's Garden)
- Implement SM2-03 (Slope Rider)
- Add animations and polish

### Phase 3: Polish & Testing
- User testing with target audience
- Performance optimization
- Bug fixes and refinements

---

## 10. Approval

**Approved by**: Trae (Acting Director)  
**Date**: 2026-02-09  
**Next Step**: Create design document and implementation tasks
