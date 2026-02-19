# Design Document: GM1.03 - Limits & Continuity Module

## Overview

The GM1.03 module is an interactive educational web application that teaches Gymnasium students (Maturität level) about function limits and continuity through a mixed-mode interface combining practice problems with real-time visualizations. The module follows the Chamber Module Standards with a two-column layout: quest exercises on the left and dynamic visualizations on the right.

The module consists of three stages (LIMIT_BASICS, LIMIT_OPERATIONS, CONTINUITY), each with four difficulty levels (BASIC, CORE, ADVANCED, ELITE), providing 60 total quests (3 stages × 4 difficulties × 5 quests). All content is available in three languages (EN/CN/DE) with Basel-specific scenarios that connect mathematical concepts to real-world applications.

## Architecture

### Component Hierarchy

```
GM103LimitsContinuity (Page Component)
├── ChamberLayout (Layout Container)
│   ├── Header (Title, Language Selector)
│   ├── DifficultySelector (BASIC/CORE/ADVANCED/ELITE)
│   ├── StageSelector (LIMIT_BASICS/LIMIT_OPERATIONS/CONTINUITY)
│   ├── Left Panel (Quest Content)
│   │   ├── ScenarioDescription
│   │   ├── QuestDisplay
│   │   │   ├── PromptText
│   │   │   ├── FormulaDisplay (LaTeX)
│   │   │   └── InputField(s)
│   │   └── FeedbackDisplay
│   ├── Right Panel (Visualization)
│   │   └── LimitsContinuityVisualization
│   │       ├── LimitVisualizer (interactive limit exploration)
│   │       ├── GraphPlotter (function graphing)
│   │       └── ContinuityChecker (continuity analysis)
│   └── Footer (Verify/Next Buttons)
└── useQuestManager (State Management Hook)
```

### Data Flow

1. **Initialization**: useQuestManager loads quest pool based on initial difficulty (BASIC) and stage (LIMIT_BASICS)
2. **Quest Selection**: System selects first quest from pool and displays it
3. **User Input**: User enters answer in input field(s)
4. **Verification**: User clicks "Verify" → System compares answer to expected value → Displays feedback
5. **Visualization Update**: Quest data updates visualization in real-time
6. **Navigation**: User clicks "Next" → System loads next quest → Updates visualization
7. **Stage/Difficulty Change**: User changes stage or difficulty → System rebuilds quest pool → Resets to first quest

### State Management

The module uses the `useQuestManager` hook which manages:
- Current difficulty level (BASIC/CORE/ADVANCED/ELITE)
- Current stage (LIMIT_BASICS/LIMIT_OPERATIONS/CONTINUITY)
- Quest pool (array of 5 quests per difficulty per stage)
- Current quest index
- User inputs (key-value pairs)
- Last verification result
- Quest completion status

## Components and Interfaces

### 1. GM103LimitsContinuity (Main Page Component)

**Purpose**: Root component that orchestrates the entire module

**Props**: None (uses URL routing)

**State**:
- `currentFunction: string` - Current function expression for visualization
- `currentLimit: { x: number, value: number | string }` - Current limit point

**Key Methods**:
- `buildStagePool(t, difficulty, stage)` - Generates quest pool for given difficulty and stage
- `handleDifficultyChange(newDifficulty)` - Switches difficulty level
- `handleStageChange(newStage)` - Switches stage

**Responsibilities**:
- Initialize useQuestManager hook
- Build quest pools based on difficulty and stage
- Pass data to ChamberLayout and LimitsContinuityVisualization
- Handle language switching via i18n

### 2. LimitsContinuityVisualization Component

**Purpose**: Displays visual representations of limits and continuity concepts

**Props**:
```typescript
interface LimitsContinuityVisualizationProps {
    quest: GM103Quest;
    stage: "LIMIT_BASICS" | "LIMIT_OPERATIONS" | "CONTINUITY";
    translations: {
        limit_basics: string;
        limit_operations: string;
        continuity: string;
    };
}
```

**Rendering Logic**:

**Limit Basics View (LIMIT_BASICS stage)**:
- Interactive graph showing function approaching limit point
- Animated point moving along curve toward x-value
- Display of x → a and f(x) → L
- Epsilon-delta visualization for ELITE difficulty
- Color-coded: function curve (cyan), limit point (yellow), approaching values (green)

**Limit Operations View (LIMIT_OPERATIONS stage)**:
- Side-by-side comparison of multiple functions
- Visual demonstration of limit arithmetic (sum, product, quotient)
- Animated combination of limits
- Color-coded: f(x) (cyan), g(x) (magenta), combined (yellow)

**Continuity View (CONTINUITY stage)**:
- Function graph with highlighted discontinuity points
- Classification markers: removable (green), jump (yellow), infinite (red)
- Animated trace showing left and right limits
- Continuity status indicator

### 3. Quest Data Structure

```typescript
interface GM103Quest extends Quest {
    id: string;                    // Unique identifier
    difficulty: Difficulty;        // BASIC | CORE | ADVANCED | ELITE
    stage: Stage;                  // LIMIT_BASICS | LIMIT_OPERATIONS | CONTINUITY
    functionExpr: string;          // Function expression (e.g., "x^2 + 3x - 2")
    limitPoint: number;            // x-value where limit is evaluated
    limitValue?: number | string;  // Expected limit value ("DNE" for does not exist)
    leftLimit?: number | string;   // Left-hand limit
    rightLimit?: number | string;  // Right-hand limit
    isContinuous?: boolean;        // Whether function is continuous at point
    discontinuityType?: string;    // "removable" | "jump" | "infinite" | null
    promptLatex: string;           // Question text
    expressionLatex: string;       // Formula in LaTeX
    targetLatex: string;           // Target variable
    slots: Array<{                 // Input fields
        id: string;
        labelLatex: string;
        placeholder: string;
        expected: string | number;
    }>;
    correctLatex: string;          // Correct answer display
}
```

### 4. Quest Pool Generation

**buildStagePool Function**:

```typescript
function buildStagePool(
    t: TranslationType,
    difficulty: Difficulty,
    stage: Stage
): GM103Quest[]
```

**Logic**:
1. Select data array based on difficulty (BASIC/CORE/ADVANCED/ELITE)
2. Select data subset based on stage (LIMIT_BASICS/LIMIT_OPERATIONS/CONTINUITY)
3. Map each data item to a Quest object
4. Calculate expected answers based on limit rules
5. Return array of 5 quests

**Data Organization**:
- Each stage has 4 difficulty levels
- Each difficulty level has 5 quests
- Total: 3 stages × 4 difficulties × 5 quests = 60 quests

## Data Models

### Limit Basics Data

**BASIC**: Simple polynomial limits, direct substitution
```typescript
{
  functionExpr: "x + 2",
  limitPoint: 3,
  limitValue: 5,
  type: "direct"
}
// lim(x→3) (x + 2) = 5
```

**CORE**: Rational functions, factoring required
```typescript
{
  functionExpr: "(x^2 - 4) / (x - 2)",
  limitPoint: 2,
  limitValue: 4,
  type: "indeterminate"
}
// lim(x→2) (x^2 - 4)/(x - 2) = lim(x→2) (x + 2) = 4
```

**ADVANCED**: Limits at infinity, horizontal asymptotes
```typescript
{
  functionExpr: "(3x^2 + 2x) / (x^2 - 1)",
  limitPoint: Infinity,
  limitValue: 3,
  type: "infinity"
}
// lim(x→∞) (3x^2 + 2x)/(x^2 - 1) = 3
```

**ELITE**: ε-δ definition, one-sided limits
```typescript
{
  functionExpr: "sqrt(x - 1)",
  limitPoint: 1,
  leftLimit: "DNE",
  rightLimit: 0,
  limitValue: 0,
  type: "one-sided"
}
// lim(x→1⁺) √(x-1) = 0, lim(x→1⁻) √(x-1) = DNE
```

### Limit Operations Data

**BASIC**: Sum and difference of limits
```typescript
{
  f: "x + 1",
  g: "2x - 3",
  limitPoint: 2,
  operation: "sum",
  answer: 6
}
// lim(x→2) [(x+1) + (2x-3)] = 3 + 1 = 6
```

**CORE**: Product and quotient of limits
```typescript
{
  f: "x^2",
  g: "x + 1",
  limitPoint: 2,
  operation: "product",
  answer: 12
}
// lim(x→2) [x^2 · (x+1)] = 4 · 3 = 12
```

**ADVANCED**: Composition of limits
```typescript
{
  f: "x^2 + 1",
  g: "sqrt(x)",
  limitPoint: 4,
  operation: "composition",
  answer: 5
}
// lim(x→4) f(g(x)) = lim(x→4) (√x)^2 + 1 = 4 + 1 = 5
```

**ELITE**: L'Hôpital's rule applications
```typescript
{
  functionExpr: "sin(x) / x",
  limitPoint: 0,
  limitValue: 1,
  method: "lhopital"
}
// lim(x→0) sin(x)/x = lim(x→0) cos(x)/1 = 1
```

### Continuity Data

**BASIC**: Continuous functions, direct evaluation
```typescript
{
  functionExpr: "x^2 + 3x - 2",
  point: 2,
  isContinuous: true,
  discontinuityType: null,
  value: 8
}
```

**CORE**: Removable discontinuities
```typescript
{
  functionExpr: "(x^2 - 1) / (x - 1)",
  point: 1,
  isContinuous: false,
  discontinuityType: "removable",
  leftLimit: 2,
  rightLimit: 2,
  limitValue: 2,
  functionValue: "undefined"
}
```

**ADVANCED**: Jump discontinuities
```typescript
{
  functionExpr: "floor(x)",
  point: 2,
  isContinuous: false,
  discontinuityType: "jump",
  leftLimit: 1,
  rightLimit: 2,
  limitValue: "DNE"
}
```

**ELITE**: Infinite discontinuities
```typescript
{
  functionExpr: "1 / (x - 3)",
  point: 3,
  isContinuous: false,
  discontinuityType: "infinite",
  leftLimit: -Infinity,
  rightLimit: Infinity,
  limitValue: "DNE"
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

After analyzing all acceptance criteria, I identified the following testable properties. I've eliminated redundancy by:
- Combining quest count properties (2.2-2.5) into a single distribution property
- Combining language translation properties (6.2-6.4) into a single completeness property
- Combining quest data structure properties (9.2-9.3) into a single structure property

### Property 1: Scenario Word Count Range

*For any* Basel scenario in the system, the word count should be between 150 and 250 words inclusive.

**Validates: Requirements 3.2**

### Property 2: Visualization Real-Time Update

*For any* change to the Limit_Visualizer input parameters, the visualization should update within 100ms to reflect the new values.

**Validates: Requirements 4.5**

### Property 3: Graph Plotting Accuracy

*For any* function f(x) and x-value in the Graph_Plotter, the plotted y-coordinate should equal f(x) within a tolerance of ±0.01.

**Validates: Requirements 4.6**

### Property 4: Continuity Detection Correctness

*For any* function and point x=a, the Continuity_Checker should correctly identify the function as continuous if and only if lim(x→a) f(x) = f(a) and both values exist.

**Validates: Requirements 4.7**

### Property 5: Translation Completeness

*For any* UI text element (title, button, instruction, scenario), translations should exist and be non-empty for all three languages (EN, CN, DE).

**Validates: Requirements 6.2, 6.3, 6.4**

### Property 6: LaTeX Consistency Across Languages

*For any* mathematical expression in a quest, the LaTeX representation should be identical across all three language versions.

**Validates: Requirements 6.6**

### Property 7: Quest ID Uniqueness

*For any* two quests in the system, their identifiers should be different (no duplicate IDs).

**Validates: Requirements 9.1**

### Property 8: Quest Structure Completeness

*For any* quest in the system, it should have exactly one stage value, exactly one difficulty value, and at least one input slot.

**Validates: Requirements 9.2, 9.3**

### Property 9: Quest Translation Completeness

*For any* quest in the system, it should have non-empty question text in all three languages (EN, CN, DE).

**Validates: Requirements 9.4**

### Property 10: Quest Solution Data Completeness

*For any* quest in the system, it should have solution data including expected answer and correctness criteria.

**Validates: Requirements 9.5**

### Property 11: LaTeX Format Validation

*For any* quest that includes mathematical expressions, the expressions should be stored as valid LaTeX strings (containing LaTeX commands like \\lim, \\frac, etc.).

**Validates: Requirements 9.6**

### Property 12: Direct Substitution Limit Correctness

*For any* polynomial or rational function f(x) that is defined at x=a, the calculated limit lim(x→a) f(x) should equal f(a) within a tolerance of ±0.01.

**Validates: Requirements 8.1, 8.2**

### Property 13: Limit Sum Rule Correctness

*For any* two functions f(x) and g(x) with limits L₁ and L₂ at x=a, the limit of their sum lim(x→a) [f(x) + g(x)] should equal L₁ + L₂ within a tolerance of ±0.01.

**Validates: Requirements 8.2**

### Property 14: Limit Product Rule Correctness

*For any* two functions f(x) and g(x) with limits L₁ and L₂ at x=a, the limit of their product lim(x→a) [f(x) · g(x)] should equal L₁ · L₂ within a tolerance of ±0.01.

**Validates: Requirements 8.2**

### Property 15: Limit Quotient Rule Correctness

*For any* two functions f(x) and g(x) with limits L₁ and L₂ at x=a where L₂ ≠ 0, the limit of their quotient lim(x→a) [f(x) / g(x)] should equal L₁ / L₂ within a tolerance of ±0.01.

**Validates: Requirements 8.2**

### Property 16: Removable Discontinuity Detection

*For any* function f(x) at point x=a where lim(x→a) f(x) exists but f(a) is undefined or f(a) ≠ lim(x→a) f(x), the system should classify this as a removable discontinuity.

**Validates: Requirements 8.4**

### Property 17: Jump Discontinuity Detection

*For any* function f(x) at point x=a where lim(x→a⁻) f(x) ≠ lim(x→a⁺) f(x) and both one-sided limits exist and are finite, the system should classify this as a jump discontinuity.

**Validates: Requirements 8.4**

### Property 18: Infinite Discontinuity Detection

*For any* function f(x) at point x=a where at least one of lim(x→a⁻) f(x) or lim(x→a⁺) f(x) is infinite, the system should classify this as an infinite discontinuity.

**Validates: Requirements 8.4**

### Property 19: Quest Pool Size Per Difficulty

*For any* combination of stage and difficulty level, the generated quest pool should contain exactly 5 quests.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5**

### Property 20: One-Sided Limit Consistency

*For any* function f(x) at point x=a, if both lim(x→a⁻) f(x) and lim(x→a⁺) f(x) exist and are equal to L, then lim(x→a) f(x) should equal L.

**Validates: Requirements 8.1**

## Error Handling

### Input Validation

**Invalid Number Format**:
- User enters non-numeric text (e.g., "abc") for a limit value
- System: Treat as incorrect answer, display error feedback
- No crash or exception

**Special Limit Values**:
- User enters "DNE" (does not exist), "∞", or "-∞"
- System: Accept as valid string answers for appropriate questions
- Compare against expected special values

**Empty Input**:
- User clicks "Verify" with empty input field
- System: Treat as incorrect answer, display error feedback
- Prompt user to enter a value

**Out of Range Values**:
- User enters extremely large or small numbers
- System: Still verify against expected answer
- If incorrect, display standard error feedback

### Quest Loading Errors

**Missing Quest Data**:
- Quest pool generation fails or returns empty array
- System: Display loading state with message "Loading quests..."
- Log error to console for debugging

**Invalid Quest Structure**:
- Quest object missing required fields (id, difficulty, stage, functionExpr)
- System: Skip invalid quest, load next valid quest
- Log warning to console

**Invalid Function Expression**:
- Function expression cannot be parsed or evaluated
- System: Display error message "Invalid function"
- Allow user to proceed to next quest

### Visualization Errors

**Function Evaluation Errors**:
- Function undefined at certain points (e.g., division by zero)
- System: Mark those points as undefined on graph
- Display discontinuity markers

**Rendering Errors**:
- Canvas fails to render graph
- System: Display static fallback visualization
- Show numerical limit values in text format

**Animation Failures**:
- Framer Motion animation fails to render
- System: Display static visualization without animation
- Functionality remains intact

### Translation Errors

**Missing Translation Key**:
- Requested translation key doesn't exist in i18n
- System: Display English fallback text
- Log warning to console

**Language Switch Failure**:
- Language change doesn't update UI
- System: Force re-render of components
- Persist language preference in localStorage

### Mathematical Computation Errors

**Indeterminate Forms**:
- Limit evaluation results in 0/0 or ∞/∞
- System: Apply algebraic simplification or L'Hôpital's rule
- If still indeterminate, return "DNE"

**Numerical Precision Issues**:
- Floating-point arithmetic causes small errors
- System: Use tolerance of ±0.01 for all comparisons
- Round displayed values to 2 decimal places

## Testing Strategy

### Unit Testing

**Quest Generation Tests**:
- Test `buildStagePool` function for each stage and difficulty
- Verify quest pool contains exactly 5 quests
- Verify quest objects have all required fields
- Verify expected answers are calculated correctly

**Limit Calculation Tests**:
- Test direct substitution: lim(x→a) f(x) = f(a)
- Test factoring: lim(x→2) (x²-4)/(x-2) = 4
- Test sum rule: lim[f(x) + g(x)] = lim f(x) + lim g(x)
- Test product rule: lim[f(x) · g(x)] = lim f(x) · lim g(x)
- Test quotient rule: lim[f(x) / g(x)] = lim f(x) / lim g(x)
- Test limits at infinity: lim(x→∞) (3x²)/(x²+1) = 3

**Continuity Tests**:
- Test continuous function: f(x) = x² at x = 2
- Test removable discontinuity: f(x) = (x²-1)/(x-1) at x = 1
- Test jump discontinuity: f(x) = floor(x) at x = 2
- Test infinite discontinuity: f(x) = 1/x at x = 0

**Answer Verification Tests**:
- Test verification with exact match
- Test verification with ±0.01 tolerance
- Test verification with special values ("DNE", "∞")
- Test verification with invalid input (non-numeric, empty)

**Translation Tests**:
- Test all translation keys exist for EN, CN, DE
- Test language switching updates UI text
- Test LaTeX formulas remain consistent across languages

### Property-Based Testing

**Configuration**: Use fast-check library for TypeScript, minimum 100 iterations per test

**Property Test 1: Direct Substitution Correctness**
```typescript
// Feature: gm1-03-limits-continuity, Property 12: Direct substitution limit correctness
fc.assert(
  fc.property(
    fc.float({ min: -10, max: 10 }),  // coefficient a
    fc.float({ min: -10, max: 10 }),  // coefficient b
    fc.float({ min: -5, max: 5 }),    // limit point x
    (a, b, x) => {
      const f = (t: number) => a * t + b;
      const limit = f(x);
      const calculated = calculateLimit(f, x);
      return Math.abs(calculated - limit) <= 0.01;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 2: Limit Sum Rule**
```typescript
// Feature: gm1-03-limits-continuity, Property 13: Limit sum rule correctness
fc.assert(
  fc.property(
    fc.float({ min: -10, max: 10 }),  // f(x) = ax + b
    fc.float({ min: -10, max: 10 }),
    fc.float({ min: -10, max: 10 }),  // g(x) = cx + d
    fc.float({ min: -10, max: 10 }),
    fc.float({ min: -5, max: 5 }),    // limit point
    (a, b, c, d, x) => {
      const f = (t: number) => a * t + b;
      const g = (t: number) => c * t + d;
      const limitF = f(x);
      const limitG = g(x);
      const limitSum = calculateLimit((t) => f(t) + g(t), x);
      return Math.abs(limitSum - (limitF + limitG)) <= 0.01;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 3: Limit Product Rule**
```typescript
// Feature: gm1-03-limits-continuity, Property 14: Limit product rule correctness
fc.assert(
  fc.property(
    fc.float({ min: -5, max: 5 }),
    fc.float({ min: -5, max: 5 }),
    fc.float({ min: -5, max: 5 }),
    fc.float({ min: -5, max: 5 }),
    fc.float({ min: -3, max: 3 }),
    (a, b, c, d, x) => {
      const f = (t: number) => a * t + b;
      const g = (t: number) => c * t + d;
      const limitF = f(x);
      const limitG = g(x);
      const limitProduct = calculateLimit((t) => f(t) * g(t), x);
      return Math.abs(limitProduct - (limitF * limitG)) <= 0.01;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 4: Continuity Detection**
```typescript
// Feature: gm1-03-limits-continuity, Property 4: Continuity detection correctness
fc.assert(
  fc.property(
    fc.float({ min: -10, max: 10 }),  // coefficient
    fc.float({ min: -10, max: 10 }),  // constant
    fc.float({ min: -5, max: 5 }),    // point
    (a, b, x) => {
      const f = (t: number) => a * t + b;
      const isContinuous = checkContinuity(f, x);
      // Polynomial functions are continuous everywhere
      return isContinuous === true;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 5: Removable Discontinuity Detection**
```typescript
// Feature: gm1-03-limits-continuity, Property 16: Removable discontinuity detection
fc.assert(
  fc.property(
    fc.float({ min: 1, max: 10 }),  // point of discontinuity
    (a) => {
      // f(x) = (x² - a²) / (x - a), undefined at x = a
      const f = (x: number) => x === a ? undefined : (x * x - a * a) / (x - a);
      const discontinuityType = classifyDiscontinuity(f, a);
      return discontinuityType === "removable";
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 6: Quest Pool Size Consistency**
```typescript
// Feature: gm1-03-limits-continuity, Property 19: Quest pool size per difficulty
fc.assert(
  fc.property(
    fc.constantFrom("BASIC", "CORE", "ADVANCED", "ELITE"),
    fc.constantFrom("LIMIT_BASICS", "LIMIT_OPERATIONS", "CONTINUITY"),
    (difficulty, stage) => {
      const pool = buildStagePool(mockTranslations, difficulty, stage);
      return pool.length === 5;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 7: Quest ID Uniqueness**
```typescript
// Feature: gm1-03-limits-continuity, Property 7: Quest ID uniqueness
fc.assert(
  fc.property(
    fc.constantFrom("BASIC", "CORE", "ADVANCED", "ELITE"),
    fc.constantFrom("LIMIT_BASICS", "LIMIT_OPERATIONS", "CONTINUITY"),
    (difficulty, stage) => {
      const pool = buildStagePool(mockTranslations, difficulty, stage);
      const ids = pool.map(q => q.id);
      const uniqueIds = new Set(ids);
      return ids.length === uniqueIds.size;  // No duplicates
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 8: Translation Completeness**
```typescript
// Feature: gm1-03-limits-continuity, Property 5: Translation completeness
fc.assert(
  fc.property(
    fc.constantFrom("EN", "CN", "DE"),
    fc.constantFrom("title", "check", "next", "correct", "incorrect"),
    (language, key) => {
      const translations = getTranslations(language);
      return translations.gm1_03[key] !== undefined && 
             translations.gm1_03[key].length > 0;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 9: LaTeX Consistency**
```typescript
// Feature: gm1-03-limits-continuity, Property 6: LaTeX consistency across languages
fc.assert(
  fc.property(
    fc.constantFrom("BASIC", "CORE", "ADVANCED", "ELITE"),
    fc.constantFrom("LIMIT_BASICS", "LIMIT_OPERATIONS", "CONTINUITY"),
    fc.integer({ min: 0, max: 4 }),  // quest index
    (difficulty, stage, index) => {
      const poolEN = buildStagePool(translationsEN, difficulty, stage);
      const poolCN = buildStagePool(translationsCN, difficulty, stage);
      const poolDE = buildStagePool(translationsDE, difficulty, stage);
      
      if (index >= poolEN.length) return true;  // Skip if out of bounds
      
      const latexEN = poolEN[index].expressionLatex;
      const latexCN = poolCN[index].expressionLatex;
      const latexDE = poolDE[index].expressionLatex;
      
      return latexEN === latexCN && latexCN === latexDE;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 10: Scenario Word Count**
```typescript
// Feature: gm1-03-limits-continuity, Property 1: Scenario word count range
fc.assert(
  fc.property(
    fc.constantFrom("EN", "CN", "DE"),
    fc.constantFrom("tram_speed", "rhine_water", "roche_concentration", "basel_enrollment"),
    (language, scenarioKey) => {
      const translations = getTranslations(language);
      const scenario = translations.gm1_03.scenarios[scenarioKey];
      const wordCount = scenario.split(/\s+/).length;
      return wordCount >= 150 && wordCount <= 250;
    }
  ),
  { numRuns: 100 }
);
```

### Integration Testing

**End-to-End Quest Flow**:
1. Load module → Verify initial quest displays
2. Enter correct answer → Click "Verify" → Verify success feedback
3. Click "Next" → Verify next quest loads
4. Complete all 5 quests → Verify stage completion
5. Change difficulty → Verify new quest pool loads
6. Change stage → Verify appropriate visualization displays

**Visualization Synchronization**:
1. Load Limit Basics quest → Verify visualization shows function and limit point
2. Load Limit Operations quest → Verify visualization shows multiple functions
3. Load Continuity quest → Verify visualization highlights discontinuities
4. Change quest → Verify visualization updates in real-time

**Language Switching**:
1. Load module in English → Verify all text is English
2. Switch to Chinese → Verify all text updates to Chinese
3. Switch to German → Verify all text updates to German
4. Verify LaTeX formulas remain consistent across languages

### Browser Testing

**Supported Browsers**:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

**Test Checklist**:
- [ ] Module loads without errors
- [ ] All quests display correctly
- [ ] Input fields accept numeric input and special values ("DNE", "∞")
- [ ] Verify button triggers validation
- [ ] Next button advances to next quest
- [ ] Visualizations render and animate
- [ ] Language switching works
- [ ] LaTeX formulas render correctly
- [ ] Responsive layout works on mobile/tablet
- [ ] No console errors or warnings
- [ ] Graph plotting is accurate
- [ ] Continuity detection works correctly
- [ ] All 60 quests are accessible
