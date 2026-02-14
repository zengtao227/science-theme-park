# SM1.06 // RATIO LAB (PROPORTIONALITY)

## 1. Overview
**Module Code**: SM1.06
**Title**: Ratio Lab
**Subtitle**: Master ratios, proportions, percentage calculations, and mixing problems using Basel's pharmaceutical context.
**Learning Goal**: Understand relationship between quantities, scaling, percentages, and concentration.

## 2. Basel Context (Local Flavor)
*   **Roche Tower Mixing**: Mixing chemical solutions in precise ratios for new medicines.
*   **Basler Läckerli Recipe**: Scaling ingredients for the famous cookie (honey, almonds, kirsch) for different batch sizes.
*   **Rhein Ferry Speed**: Distance vs. Time proportionality.

## 3. Stages
### Stage 1: RECIPES (Direct Proportion)
*   **Concept**: Scaling up/down. $y = kx$.
*   **Visual**: Ingredient cards or simple bars.
*   **Problems**:
    *   Original recipe: 2 eggs for 4 people. How many for 6 people?
    *   Scale logical quantities (integer & simple fraction multipliers).

### Stage 2: PERCENTAGE (Parts per 100)
*   **Concept**: %, fraction to %, part/whole.
*   **Visual**: Liquid fill in a beaker or progress bar.
*   **Problems**:
    *   What is 20% of 50?
    *   Convert 3/4 to percentage.
    *   Discount calculation (sale at Marktplatz).

### Stage 3: MIXTURES (Concentration)
*   **Concept**: Ratio of solute to solvent.
*   **Visual**: Two colored liquids mixing in a flask.
*   **Problems**:
    *   Mix 20ml syrup with 80ml water. What is the concentration?
    *   Advanced: Mixing two solutions of different concentrations.

## 4. Technical Requirements
*   **Canvas**: `RatioCanvas.tsx`
*   **Visuals**:
    *   **Recipe Mode**: Icons of ingredients scaling up/down.
    *   **Beaker Mode**: SVG container filling up with colored liquid layers.
*   **Input**:
    *   Numeric slots for missing values in proportion tables.
    *   Slider (optional) or input for percentage.

## 5. Difficulty Levels
*   **Basic**: Simple integers, 1:2, 50%.
*   **Core**: Common fractions, 1:3, 25%, 33%.
*   **Advanced**: Decimals, 1.5 scaling, compound percentages.
*   **Elite**: Complex mixing, reverse percentage (finding original price from final).

## 6. Implementation Steps
1.  **Setup**: Create `src/app/chamber/sm1-06/page.tsx` and `src/components/chamber/sm1-06/RatioCanvas.tsx`.
2.  **Logic**: Implement `useQuestManager` with the 3 stages: `RECIPES`, `PERCENT`, `MIXTURES`.
3.  **Visuals**: Build `RatioCanvas` to support the visual modes for each stage.
4.  **Content Requirement (CRITICAL)**:
    *   You MUST implement **5 distinct problems** for EACH difficulty (Basic, Core, Advanced, Elite) in EACH stage.
    *   Total: 3 Stages * 4 Difficulties * 5 Questons = **60 Total Questions**.
    *   Ensure variety in the generated numbers or scenarios within the same difficulty.
5.  **i18n**: Add accurate EN/CN/DE translations for all texts.
