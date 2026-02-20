# 🎯 Engineering Standards & Guidelines

This document consolidates our architectural, design, and data standards to ensure consistency across the Science Theme Park platform.

---

## 🏗️ 1. Architecture Standards

### 1.1 Unified Layout
All laboratory/chamber modules **must** use the `ChamberLayout` component for a consistent UI/UX.
- **Left Panel**: Interactive quest system.
- **Right Panel (Monitor)**: Real-time 2D/3D visualization.

### 1.2 State Management
All modules **must** use the `useQuestManager` hook to manage:
- Difficulty levels (BASIC, CORE, ADVANCED, ELITE).
- Stage management.
- Input validation & tolerance.
- Progress tracking and persistence.
- Hint & error tracking systems.

---

## 🧪 2. Quest & Pedagogy Standards

### 2.1 The 4-Level Difficulty System
Difficulty is defined by **conceptual depth**, not just "bigger numbers".
- **BASIC**: Fundamental definitions, direct observation, simple mental calculation.
- **CORE**: Multi-step reasoning, combination of concepts, pencil-and-paper complexity.
- **ADVANCED**: Conditional logic, constraints, changing sample spaces or parameters.
- **ELITE**: Interdisciplinary synthesis, decomposition of complex problems, competition-level strategies.

### 2.2 Quest Quantity
Each stage in a module should ideally have **4-5 unique quests per difficulty level** to ensure adequate practice without feeling repetitive.

---

## 🌍 3. Internationalization (i18n) & Scenarios

### 3.1 Trilingualism
Complete support for **English (EN)**, **Chinese (CN)**, and **German (DE)** is mandatory.
- No hardcoded strings in components.
- Accurate mapping of technical terms (e.g., "Momentum" vs "Impuls" vs "动量").

### 3.2 Detailed Scenarios (The Basel Narrative)
Every quest must be grounded in a concrete real-world context, preferably using **Basel-specific locations and companies**.
- **Role**: Define the user's role (e.g., Engineer at Roche).
- **Location**: Roche Tower, Rhine River, University of Basel, etc.
- **Mission**: Clear "why" behind the calculation.
- **Length**: 3-5 sentences (80-250 characters).

---

## 🔢 4. LaTeX & Mathematical Standards

### 4.1 The Quadruple-Backslash Rule (\\\\)
In TypeScript strings (i18n files, pool builders), use **quadruple backslashes** for LaTeX commands.
- `\\\\text{kg}` instead of `\\text{kg}`.
- For environment line breaks (`\\`), use **eight backslashes** (`\\\\\\\\`).

### 4.2 Formatting
- **Units**: Must be in roman font using `\\\\text{}` (e.g., `\\\\text{ m/s}^2`).
- **Indices/Powers**: Use LaTeX syntax (`^2`, `_1`), never Unicode superscripts/subscripts.
- **Fractions**: Use `\\\\frac{a}{b}` for better readability.

---

## 🎨 5. Visualization Standards

### 5.1 Concept Match
Visualizations must match the current quest's concepts.
- **Math**: Dynamic graphs, unit circles, Venn diagrams.
- **Physics**: 3D force vectors, momentum collisions, circuit diagrams.
- **Chemistry**: 3D molecular structures, pH titration curves.

### 5.2 Automatic Scaling
Visual containers must automatically calculate bounds and scale to fit the quest data range, ensuring no elements are cut off or too small to read.

---

## 🛂 6. Migration & Integrity Standards

### 6.1 Zero Data Loss
When migrating legacy modules to the new system:
- **Audit**: Count existing quests and map every field.
- **Verify**: Use automated scripts to compare original IDs with i18n keys.
- **Conclusion**: Report 100% completion before deleting legacy code.

### 6.2 Code Cleanup
Upon successful migration and verification:
- Delete temporary migration scripts.
- Remove legacy hardcoded quest data files.
- Commit all changes with clear messages (`fix/feat/refactor`).
