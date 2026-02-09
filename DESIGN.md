# Technical Design: Math Visualization Overhaul

## 1. Overview
This document outlines the technical architecture for the new math visualization modules (`SM2-01`, `SM2-02`, `SM2-03`). The goal is to replace abstract geometric representations with concrete, interactive biological and physical models.

## 2. Architecture Principles
- **Component-Level Rewrite**: Only the visualization components (`Canvas/SVG`) and their immediate state logic will be rewritten. The parent Page/Layout structure remains largely intact.
- **Physics-Driven**: Where applicable, use physics engines (Matter.js) or custom physics loops to provide intuitive feedback.
- **Responsive**: All new components must handle variable container sizes (mobile to desktop) gracefully.

---

## 3. Module Design

### 3.1 SM2-01: Mendel's Garden (Binomial Theorem)
**Concept**: Visualizing `(a+b)²` via Punnett Squares (Genetics).

#### Components
- `MendelGeneticsCanvas.tsx` (New)
  - **State**: `genotypeA` (e.g. "A"), `genotypeB` (e.g. "a"), `countA`, `countB`.
  - **Visualization**:
    - A dynamic SVG grid representing `(countA + countB) x (countA + countB)`.
    - Each cell `(i, j)` color-coded:
      - `AA` (Dominant Homozygous): Color 1 (e.g. Red)
      - `Aa`/`aA` (Heterozygous): Color 2 (e.g. Purple)
      - `aa` (Recessive Homozygous): Color 3 (e.g. White)
  - **Interaction**:
    - Sliders/Inputs for `countA` and `countB`.
    - Interactive tooltip on cells showing gene combination.

#### Data Flow
`Page` -> `QuestManager` -> `MendelGeneticsCanvas` (props: `a`, `b`)

---

### 3.2 SM2-02: The Fluid Chamber (Pythagoras)
**Concept**: Liquid pouring from squares `a²` and `b²` into `c²` to prove area conservation.

#### Strategy: Two-Tier Implementation
1.  **Tier 1 (Preferred)**: Physics Simulation via `matter-js`.
    - Real-time particle fluid simulation.
    - **Pros**: Extremely impressive and intuitive.
    - **Cons**: High performance cost, complex implementation on mobile.
2.  **Tier 2 (Fallback)**: Geometric Dissection (Perigal's Dissection).
    - SVG animation of `b²` cutting into 4 pieces and rearranging into `c²`.
    - **Pros**: Lightweight, deterministic, easier to implement.
    - **Cons**: Less "physical" feeling.

#### Technical Implementation (Tier 1)
- `PythagorasFluidCanvas.tsx`
  - **Engine**: `Matter.js` (`Engine`, `World`, `Bodies`).
  - **Scene**:
    - 3 hollow square bodies (`a`, `b`, `c`) attached to a central pivot constraint.
    - "Fluid" particles (small circles with high restitution and low friction).
  - **Interaction**:
    - Device orientation (mobile) or Drag (desktop) to rotate the container assembly.
  - **Optimization**:
    - Limit particle count (< 200).
    - Use collision categories to optimize performance.

---

### 3.3 SM2-03: Slope Rider (Linear Functions)
**Concept**: `y = mx + c` as a ski slope or flight path.

#### Components
- `SlopeRiderCanvas.tsx` (New)
  - **Rendering**: Canvas API (2D) for best performance with custom drawing.
  - **Physics**: Simple Euler integration loop (`pos += vel * dt`, `vel += acc * dt`).
  - **State**:
    - `slope` (m): Controls angle.
    - `intercept` (c): Controls starting y-position.
    - `playerPos`: {x, y}.
  - **Game Loop**:
    - `requestAnimationFrame`.
    - Check if player is on line (success) or hits obstacle (fail).

#### User Inputs
- **Sliders**:
  - `m` (Slope): -5 to 5.
  - `c` (Height): 0 to 10 (canvas height).

---

## 4. Implementation Phase Plan

### Phase 1: Infrastructure & POC (The Hardest Part)
- **Goal**: Validate Matter.js viability.
- **Task**: Implement rough prototype of `PythagorasFluidCanvas` (SM2-02).
- **Success Criteria**: >30fps on mobile, stable fluid behavior.
- **Fallback**: If fails, switch to Perigal's Dissection (Tier 2).

### Phase 2: Core Logic (The "Easy" Rewrites)
- **Goal**: Replace SM2-01 and SM2-03 visuals.
- **Task**:
  - Implement `MendelGeneticsCanvas`.
  - Implement `SlopeRiderCanvas`.

### Phase 3: Integration & Polish
- **Goal**: UX refinement.
- **Task**:
  - Add smooth transitions.
  - Add explanatory labels (math formulas overlay).
  - Final responsive tuning.
