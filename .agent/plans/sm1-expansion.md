# 📅 SM1 (Sekundarschule Year 1) Curriculum Expansion Plan

**Status**: Planning
**Date**: 2026-02-14
**Objective**: Fill the critical gaps in the 7th Grade (Sek 1) Mathematics curriculum to align with Basel (Lehrplan 21) standards.

---

## 🚨 Current Situation Analysis
- **Existing**:
    - SM1.01 (Geometry: Areas & Volumes) - ✅ Ready
    - SM1.02 (Hyper-Geometry) - ⚠️ Too advanced (Tesseract), acts as an outlier.
- **Missing**:
    - **Algebra Foundation** (Variables, Terms)
    - **Number Systems** (Integers, Rational Numbers, Fractions)
    - **Linear Equations I** (Introduction)
    - **Proportionality** (Direct/Inverse, Percentage)

## 🗺️ Execution Roadmap

### 📦 Phase 1: The Foundation (Critical Priority)

#### 1. SM1.03 // ALGEBRA QUEST (Variables & Terms)
- **Concept**: Introduction to variables ($x, y$), simplifying expressions ($3x + 2x$), and substitution.
- **Stages**:
    - **VARIABLES**: Visualizing variables as containers.
    - **TERMS**: Combining like terms (fruit shop analogy).
    - **SUBSTITUTION**: Evaluating expressions.
- **Basel Context**: "Rhybadhüsli" (Rhine Swim House) locker management.

#### 2. SM1.04 // BELOW ZERO (Integers & Coordinates)
- **Concept**: Negative numbers, number line, 4-quadrant coordinate system.
- **Stages**:
    - **NUMBER_LINE**: Thermometer in winter ($+5^\circ C$ to $-10^\circ C$).
    - **OPERATIONS**: Adding/Subtracting negatives.
    - **COORDINATES**: Plotting points in all 4 quadrants.
- **Basel Context**: "Basel Winter & Rhine Depth" (Water level vs. Street level).

### 📦 Phase 2: The Logic (High Priority)

#### 3. SM1.05 // EQUATION BALANCE (Linear Equations I)
- **Concept**: Solving linear equations $ax + b = c$ using the balance scale model.
- **Stages**:
    - **BALANCE**: Visual scale (add/remove weights).
    - **ISOLATE**: Inverse operations.
    - **SOLVE**: Finding $x$.
- **Basel Context**: "Marktplatz Scales" (Weighing veggies).

#### 4. SM1.06 // RATIO LAB (Proportionality)
- **Concept**: Direct/Inverse proportionality, Rule of Three, Percentages.
- **Stages**:
    - **DIRECT**: Recipe scaling (Basler Läckerli).
    - **INVERSE**: Speed vs. Time (Train to Zurich).
    - **PERCENT**: Discounts and Tax.
- **Basel Context**: "Basler Läckerli Bakery".

---

## 🛠 Development Standards Compliance
All new modules must strictly follow `CHAMBER_MODULE_STANDARDS.md`:

1.  **Architecture**:
    - Use `ChamberLayout` and `useQuestManager`.
    - 4 Difficulty Levels: BASIC / CORE / ADVANCED / ELITE.
    - Mixed Mode: Left Quest / Right Visualization.

2.  **Visualization**:
    - Real-time reactivity.
    - **SM1.03**: Drag-and-drop algebra tiles.
    - **SM1.04**: Interactive thermometer/depth gauge.
    - **SM1.05**: Physics-based balance scale.
    - **SM1.06**: Dynamic sliders and charts.

3.  **Localization (i18n)**:
    - EN / CN / DE support from Day 1.
    - Basel-specific scenarios (Roche, Rhine, Tinguely, etc.).

---

## 📅 Immediate Action
**Next Step**: implementation of **SM1.03 // ALGEBRA QUEST**.
This is the prerequisite for all subsequent modules.
