# SM1.03 Algebra Quest - Design Document

## 1. Overview
- **Module**: SM1.03 Algebra Quest
- **Grade**: Sek 1 (7th Grade)
- **Topic**: Algebra Foundation (Variables & Terms)
- **Objective**: Introduce variables, simplifying expressions, and substitution using visual and hands-on metaphors.

## 2. Basel Context / Scenarios
- **Variables**: "Rhybadhüsli" (Rhine Swim House) Locker Management.
    - Metaphor: A variable ($x$) is a container (locker). The value is what's inside.
- **Simplifying Terms**: "Marktplatz Fruit Stand".
    - Metaphor: You cannot add Apples ($x$) and Pears ($y$).
    - Task: Group like items (e.g., $3a + 2a = 5a$).
- **Substitution**: "Basel Tram Ticket Vending Machine".
    - Metaphor: Insert value into the formula (ticket price calculation).

## 3. Stages & Difficulties

### Stage 1: VARIABLES (Concept)
- **Visual**: "Variables as Containers" (Boxes on a shelf).
- **Basic**: Identify variable vs. value ($x = 5$).
- **Core**: Simple addition ($x + x = 2x$).
- **Advanced**: Mixed variables ($x + y$).
- **Elite**: Understanding $2x$ vs $x^2$ (visual difference).

### Stage 2: TERMS (Simplification)
- **Visual**: "Like Terms Sorter" (Drag and drop items into bins).
- **Basic**: Combine positive integers ($3x + 2x$).
- **Core**: Combine with subtraction ($5x - 2x$).
- **Advanced**: Multiple variables ($3x + 2y + x$).
- **Elite**: With coefficients and constants ($3x + 5 - x + 2$).

### Stage 3: SUBSTITUTION (Evaluation)
- **Visual**: "Formula Machine" (Input slot → Processing → Output).
- **Basic**: Simple one-step ($x=3$, find $2x$).
- **Core**: Two-step ($x=4$, find $2x + 1$).
- **Advanced**: Two variables ($x=2, y=3$, find $2x + y$).
- **Elite**: Powers ($x=3$, find $x^2 + 2$).

## 4. Technical Architecture
- **Layout**: `ChamberLayout` (standard).
- **Manager**: `useQuestManager`.
- **Visualization**:
    - **Variables**: SVG Boxes with labels.
    - **Terms**: Sorting animation (React Spring / Framer Motion).
    - **Substitution**: Machine animation or Function diagram.
- **i18n**: Full EN/CN/DE support.

## 5. Quest Examples

### Stage 2 (Terms)
- **Prompt**: "Simplify the expression by combining like terms."
- **Scenario**: "At the Marktplatz market, group all the apples together."
- **Expression**: $3a + 2b + 5a$
- **Target**: $8a + 2b$
- **Visual**: 3 red apples, 2 green pears, 5 red apples -> animate to 8 red apples, 2 green pears.
