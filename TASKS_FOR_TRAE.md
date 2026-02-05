# Mission Verification & New Assignment

## 1. Work Verification (P3.01 GEOMETRICAL OPTICS)
**Status:** ✅ **APPROVED**
- Physical logic for Reflection, Refraction (Snell's Law), and Lenses ($1/f = 1/u + 1/v$) is correctly implemented.
- Interaction model (dragging light source/lens) works as expected.
- Code has been refactored and pushed to Vercel (pending build fix).

---

## 2. New Assignment: C1.02 // MOLE MASTER
**Objective:** Create a Chemistry module focused on Stoichiometry (Mole Calculation).

### Core Features
1.  **Stage 1: Molar Mass**
    *   **Goal:** Calculate the molar mass of a given compound (e.g., $H_2O$, $CO_2$, $C_6H_{12}O_6$).
    *   **Logic:** Implement a mini database of atomic weights (H=1.008, C=12.01, O=16.00, etc.).
    *   **Hint:** Show the breakdown ($2 \times 1.008 + 15.999$).

2.  **Stage 2: Reaction Ratios**
    *   **Goal:** distinct mole ratios in a balanced equation.
    *   **Example:** $2H_2 + O_2 \rightarrow 2H_2O$. If you have 4 moles of $H_2$, how many moles of $O_2$ do you need?

3.  **Visuals (Canvas)**
    *   Use **HTML5 Canvas** (or R3F if you're comfortable) to render a **Digital Scale** or **Mole Counter**.
    *   When the user inputs a value, visualize it "filling up" a beaker or balancing a scale.

### Technical Constraints
*   **File Path:** 
    *   Page: `src/app/chamber/c1-02/page.tsx`
    *   Canvas: `src/components/chamber/c1-02/MoleCanvas.tsx`
*   **Structure:** Must use `useQuestManager` hook like other modules.
*   **Language:** Use existing `translations.EN.c1_02` keys from `src/lib/i18n.ts`.

---

## 3. Important Notes
- **Fix "use client":** Remember that any component using hooks (`useState`, `useEffect`) must have `"use client";` at the very top.
- **Quest Interface:** Ensure your `Quest` object strictly follows the interface defined in `useQuestManager`. Do not miss required fields like `expressionLatex` or `promptLatex`.

**Action:** Please read this brief and start development on C1.02 immediately.
