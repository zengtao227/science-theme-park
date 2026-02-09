# Math Visualization Overhaul - Implementation Tasks

**Spec**: math-visualization-overhaul  
**Status**: Ready for Implementation  
**Start Date**: 2026-02-09  

---

## Phase 1: Infrastructure & POC (SM2-02 Fluid Chamber)

### 1.1 Setup Matter.js
- [x] Install Matter.js dependencies
  - Run `npm install matter-js @types/matter-js`
  - Verify installation and TypeScript types
- [x] Create utility wrapper for Matter.js
  - File: `src/lib/physics/matterUtils.ts`
  - Export helper functions for common operations
  - Add TypeScript type definitions

### 1.2 Create PythagorasFluidCanvas Component
- [x] Create component file
  - File: `src/components/chamber/sm2-02/PythagorasFluidCanvas.tsx`
  - Set up basic component structure with props interface
  - Add Matter.js engine initialization
- [x] Implement container geometry
  - Create three square container bodies (a², b², c²)
  - Position containers around right triangle vertices
  - Add pivot constraint for rotation
- [x] Implement fluid particle system
  - Create 100-200 small circle bodies as "fluid"
  - Set physics properties (high restitution, low friction)
  - Implement particle pooling for performance
- [x] Add rotation interaction
  - Desktop: drag to rotate
  - Mobile: device orientation API (optional)
  - Smooth rotation with damping
- [x] Implement rendering loop
  - Use Canvas API for drawing
  - Draw containers with borders
  - Draw particles with color coding
  - Add FPS counter for debugging

### 1.3 Performance Testing & Optimization
- [-] Test on target devices
  - Desktop: Chrome, Firefox, Safari
  - Mobile: iOS Safari, Android Chrome
  - Measure FPS with 100, 150, 200 particles
- [ ] Optimize if needed
  - Implement collision categories
  - Reduce particle count if <30fps
  - Add quality settings (low/medium/high)
- [ ] **Decision Point**: Continue with Matter.js or pivot to fallback?

### 1.4 Fallback Implementation (If Needed)
- [ ] Create PythagorasDissectionCanvas Component
  - File: `src/components/chamber/sm2-02/PythagorasDissectionCanvas.tsx`
  - Use SVG for geometric shapes
  - Implement Perigal's dissection animation
  - Use Framer Motion for smooth transitions

### 1.5 Integration into SM2-02
- [ ] Update page component
  - File: `src/app/chamber/sm2-02/page.tsx`
  - Import new canvas component
  - Replace `PythagorasSimple2D` with new component
  - Pass props (a, b, c values)
- [ ] Add UI controls
  - Sliders for a and b values
  - Reset button
  - Instructions overlay
- [ ] Test complete user flow
  - Verify quest system integration
  - Test all difficulty levels
  - Check i18n translations

---

## Phase 2: Core Logic Implementation

### 2.1 Implement Mendel's Garden (SM2-01)

#### 2.1.1 Create MendelGeneticsCanvas Component
- [ ] Create component file
  - File: `src/components/chamber/sm2-01/MendelGeneticsCanvas.tsx`
  - Set up props interface (genotypeA, genotypeB, countA, countB)
  - Initialize component state
- [ ] Implement Punnett Square grid
  - Calculate grid dimensions based on counts
  - Generate all genotype combinations
  - Create SVG grid layout
- [ ] Add color coding
  - AA (pure dominant): Red (#ff3131)
  - Aa/aA (heterozygous): Purple (#a855f7)
  - aa (pure recessive): White/Light gray
  - Add legend explaining colors
- [ ] Implement interactive features
  - Hover tooltips showing genotype
  - Click to highlight specific combinations
  - Animation when grid updates

#### 2.1.2 Integration into SM2-01
- [ ] Update page component
  - File: `src/app/chamber/sm2-01/page.tsx`
  - Import `MendelGeneticsCanvas`
  - Replace `BinomialSquareCanvas` with new component
  - Map quest parameters to genetics parameters
- [ ] Update quest scenarios
  - Modify architect scenario to genetics context
  - Update scrapper scenario to genetics context
  - Adjust i18n strings for genetics terminology
- [ ] Add educational overlays
  - Show formula: (A+a)² = AA + 2Aa + aa
  - Explain why coefficient is 2
  - Link to phenotype ratios

### 2.2 Implement Slope Rider (SM2-03)

#### 2.2.1 Create SlopeRiderCanvas Component
- [ ] Create component file
  - File: `src/components/chamber/sm2-03/SlopeRiderCanvas.tsx`
  - Set up Canvas API rendering
  - Initialize physics state
- [ ] Implement scene rendering
  - Draw background (sky, ground)
  - Draw slope line (y = mx + c)
  - Draw character (skier or aircraft)
  - Add obstacles/targets
- [ ] Implement physics loop
  - Simple Euler integration
  - Gravity force
  - Slope force based on m
  - Collision detection
- [ ] Add game mechanics
  - Start/stop controls
  - Success condition (reach target)
  - Fail condition (crash/miss)
  - Score/feedback display

#### 2.2.2 Integration into SM2-03
- [ ] Update page component
  - File: `src/app/chamber/sm2-03/page.tsx`
  - Import `SlopeRiderCanvas`
  - Replace existing canvas component
  - Wire up quest parameters
- [ ] Add parameter controls
  - Slider for m (slope): -5 to 5
  - Slider for c (intercept): 0 to 10
  - Real-time line preview
  - Reset button
- [ ] Update quest scenarios
  - Create slope-based challenges
  - Add target coordinates
  - Adjust difficulty progression

---

## Phase 3: Integration & Polish

### 3.1 Responsive Layout
- [ ] Add resize handling
  - Implement `useResizeObserver` hook
  - Update canvas dimensions on resize
  - Maintain aspect ratios
- [ ] Test on different screen sizes
  - Desktop: 1920×1080, 1366×768
  - Tablet: 1024×768
  - Mobile: 375×667 (minimum)
- [ ] Adjust UI for small screens
  - Stack controls vertically on mobile
  - Reduce particle count on mobile
  - Simplify animations if needed

### 3.2 Educational Overlays
- [ ] Add formula displays
  - SM2-01: Show (a+b)² = a² + 2ab + b²
  - SM2-02: Show a² + b² = c²
  - SM2-03: Show y = mx + c
- [ ] Add contextual help
  - Tooltips explaining parameters
  - "How it works" modal
  - Link to mathematical concepts
- [ ] Add progress indicators
  - Show completion status
  - Highlight learning objectives
  - Celebrate successes

### 3.3 Internationalization
- [ ] Update i18n files
  - File: `src/lib/i18n.ts`
  - Add new strings for all three modules
  - Translate to EN, DE, CN
- [ ] Test all languages
  - Verify text fits in UI
  - Check for translation errors
  - Ensure consistent terminology

### 3.4 Testing & Bug Fixes
- [ ] Functional testing
  - Test all user interactions
  - Verify quest progression
  - Check edge cases (extreme values)
- [ ] Performance testing
  - Measure FPS on target devices
  - Check memory usage
  - Profile for bottlenecks
- [ ] Cross-browser testing
  - Chrome, Firefox, Safari, Edge
  - iOS Safari, Android Chrome
  - Fix browser-specific issues
- [ ] User acceptance testing
  - Test with target audience (students)
  - Gather feedback on clarity
  - Measure comprehension time

### 3.5 Documentation
- [ ] Update component documentation
  - Add JSDoc comments
  - Document props and state
  - Add usage examples
- [ ] Create developer guide
  - Explain physics implementation
  - Document performance optimizations
  - Add troubleshooting section
- [ ] Update user-facing help
  - Add in-app instructions
  - Create tutorial videos (optional)
  - Update FAQ

---

## Acceptance Criteria Summary

### SM2-01 (Mendel's Garden)
- ✓ User can input parent genotypes
- ✓ Punnett Square displays correctly
- ✓ Color coding distinguishes genotypes
- ✓ Animation shows 2Aa formation
- ✓ Formula overlay explains math connection

### SM2-02 (Fluid Chamber)
- ✓ Three containers display around triangle
- ✓ Fluid particles flow realistically
- ✓ Rotation interaction works smoothly
- ✓ c² container fills exactly (visual proof)
- ✓ Performance: >30fps on mobile

### SM2-03 (Slope Rider)
- ✓ Line preview updates in real-time
- ✓ Character animates along path
- ✓ m parameter controls steepness
- ✓ c parameter controls height
- ✓ Success/fail feedback is clear

### Overall
- ✓ 5-second comprehension achieved
- ✓ Immediate visual feedback for all inputs
- ✓ Fun and engaging interactions
- ✓ No breaking changes to existing functionality

---

## Notes

- **Priority**: Phase 1 is highest risk and should be completed first
- **Fallback**: Be prepared to switch to Perigal's dissection if Matter.js performance is insufficient
- **Testing**: Test on real mobile devices, not just browser emulation
- **Performance**: Monitor FPS continuously during development
- **User Feedback**: Gather feedback early and iterate

---

## Estimated Timeline

- **Phase 1**: 2-3 days (includes testing and potential fallback)
- **Phase 2**: 2-3 days (parallel development of SM2-01 and SM2-03)
- **Phase 3**: 1-2 days (polish and testing)
- **Total**: 5-8 days

---

## Dependencies

- Matter.js installation (Phase 1.1)
- Performance validation (Phase 1.3) before proceeding to Phase 2
- All Phase 2 tasks can be done in parallel
- Phase 3 requires Phase 2 completion
