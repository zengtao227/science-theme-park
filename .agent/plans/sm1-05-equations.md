# SM1.05 // EQUATION BALANCE (LINEAR EQUATIONS)

## 1. Overview
**Module Code**: SM1.05
**Title**: Equation Balance
**Subtitle**: Solve linear equations by balancing scales, applying inverse operations, and isolating variables.
**Learning Goal**: Understand the concept of "balance" in equations and the logic of performing the same operation on both sides.

## 2. Basel Context (Local Flavor)
*   **Marktplatz Scales**: Weighing produce at the Basel City Market.
*   **Roche Lab Scales**: Precision balancing of chemical compounds.
*   **Customs Weight Check**: Balancing cargo loads at the port of Basel (Kleinhüningen).

## 3. Stages
### Stage 1: SCALES (Visual Balance)
*   **Concept**: $x + a = b$. Balance visualization.
*   **Visual**: A traditional two-pan balance scale. One side has 'x' boxes and '1' weights. The other has only '1' weights.
*   **Goal**: Find the weight of 'x' by visually removing weights from both sides.
*   **Problems**:
    *   Basic: x + 2 = 5
    *   Core: 2x = 6 (removing groups)

### Stage 2: INVERSE (Operations)
*   **Concept**: Performing the inverse operation to isolate x. $+3 \to -3$. $\times 2 \to \div 2$.
*   **Visual**: An equation where the operation is highlighted, and the user must select the correct "undo" action button.
*   **Problems**:
    *   Basic: x - 4 = 10 (Action: +4)
    *   Core: 3x = 12 (Action: /3)

### Stage 3: SOLVER (Multi-Step)
*   **Concept**: $ax + b = c$. Two-step equations.
*   **Visual**: Step-by-step solver interface. First handle the constant, then the coefficient.
*   **Problems**:
    *   Basic: 2x + 1 = 9
    *   Core: 3x - 2 = 10
    *   Advanced: 5 - x = 2
    *   Elite: 2(x + 1) = 8

## 4. Technical Requirements
*   **Canvas**: `BalanceCanvas.tsx`
*   **Visuals**:
    *   **Scales Mode**: SVG/Canvas drawing of a balance that tips if inputs are wrong.
    *   **Solver Mode**: Interactive equation text manipulation.
*   **Input**:
    *   Clicking "Remove 1", "Divide by 2" buttons.
    *   Final numeric input for x.

## 5. Difficulty Levels
*   **Basic**: Standard $x+a=b$, positive integers only.
*   **Core**: $ax=b$ and simple two-step.
*   **Advanced**: Involves negative numbers or subtraction logic.
*   **Elite**: Parentheses or variable on both sides (e.g., $2x + 1 = x + 5$).

## 6. Implementation Steps
1.  **Setup**: Create `src/app/chamber/sm1-05/page.tsx` and `src/components/chamber/sm1-05/BalanceCanvas.tsx`.
2.  **Logic**: Implement `useQuestManager`.
3.  **Visuals**: Implement the interactive Balance Scale.
4.  **Content**: **5 Questions per Stage/Difficulty** (Total 60).
5.  **i18n**: Translations.
