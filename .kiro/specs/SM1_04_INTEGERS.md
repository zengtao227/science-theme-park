# SM1.04 Below Zero: Integers & Coordinates

## 1. Module Overview
**Code**: SM1.04
**Title**: BELOW ZERO
**Topic**: Integers, Number Line, Rational Numbers, 2D Coordinates
**Grade**: Sek 1 (7th Grade)

## 2. Basel Context / Scenarios
1.  **Negative Numbers**: "Basel Winter".
    - Scenario: Monitoring temperatures at EuroAirport. It's -5°C outside. Logic: Is -5 colder than -2?
2.  **Number Line / Depth**: "Rhine River Levels".
    - Scenario: The "Pegel" (water level) usually is +5m. During drought, it drops. Divers go below surface (negative depth).
3.  **Coordinates**: "City Grid Navigation".
    - Scenario: Mapping Basel landmarks on a 4-quadrant grid.
    - Q1: Grossbasel (Positive/Positive)
    - Q2: Kleinbasel (Negative/Positive)
    - Q3: Klybeck (Negative/Negative)
    - Q4: St. Alban (Positive/Negative)

## 3. Stages & Difficulties
This module must follow the standard 4-level difficulty (BASIC, CORE, ADVANCED, ELITE).

### Stage 1: NUMBER LINE (Integers)
- **Visual**: Vertical Thermometer or Water Level Gauge.
- **Basic**: Identify position (Where is -3?).
- **Core**: Comparisons (-5 < -2).
- **Advanced**: Distance/Absolute Value (| -5 - 2 |).
- **Elite**: Operations on line (-5 + 3).

### Stage 2: RATIONALS (Fractions/Decimals)
- **Visual**: Zoomable Number Line.
- **Basic**: Place 0.5 and -0.5.
- **Core**: Compare -1/2 vs -1/3.
- **Advanced**: Decimals (-0.75 vs -0.8).
- **Elite**: Ordering mixed set {-1.5, -3/2, 0, 1.2}.

### Stage 3: QUADRANTS (2D Coordinates)
- **Visual**: 2D Grid with Basel Map background.
- **Basic**: Identify Point (+2, +3).
- **Core**: Identify Quadrant for (-2, 5).
- **Advanced**: Reflections across Axis.
- **Elite**: Distance between horizontal/vertical points.

## 4. Technical Requirements
- Use `ChamberLayout`.
- Use `useQuestManager`.
- Visualization: `IntegerCanvas`.
    - Mode `THERMOMETER`: Vertical bar with animated mercury/water.
    - Mode `MAP`: 2D Grid with draggable points or removing points.
- **i18n**: Support EN, CN, DE.

## 5. Implementation Steps for Kiro
1.  Create `src/app/chamber/sm1-04/page.tsx`
2.  Create `src/components/chamber/sm1-04/IntegerCanvas.tsx`
3.  Update `src/lib/i18n.ts` with all translations.
