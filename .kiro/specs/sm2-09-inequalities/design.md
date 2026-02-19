# Design Document: SM2.09 - Inequalities Module

## Overview

The SM2.09 module is an interactive educational web application that teaches Basel Sekundarschule Sek 2 students (ages 14-16) about inequalities through a mixed-mode interface combining practice problems with real-time visualizations. The module follows the Chamber Module Standards with a two-column layout: quest exercises on the left and dynamic inequality visualizations on the right.

The module consists of three stages (INEQUALITY_BASICS, SYSTEMS, ABSOLUTE_VALUE), each with four difficulty levels (BASIC, CORE, ADVANCED, ELITE), providing 75 total quests (3 stages × 4 difficulties × variable quests per stage). All content is available in three languages (EN/CN/DE) with Basel-specific scenarios connecting abstract mathematics to real-world applications.

## Architecture

### Component Hierarchy

```
SM209Inequalities (Page Component)
├── ChamberLayout (Layout Container)
│   ├── Header (Title, Language Selector)
│   ├── DifficultySelector (BASIC/CORE/ADVANCED/ELITE)
│   ├── StageSelector (INEQUALITY_BASICS/SYSTEMS/ABSOLUTE_VALUE)
│   ├── Left Panel (Quest Content)
│   │   ├── ScenarioDescription
│   │   ├── QuestDisplay
│   │   │   ├── PromptText
│   │   │   ├── FormulaDisplay (LaTeX)
│   │   │   └── InputField(s)
│   │   ├── StepBySt
epSolver
│   │   └── FeedbackDisplay
│   ├── Right Panel (Visualization)
│   │   └── InequalityVisualization
│   │       ├── NumberLineVisualizer
│   │       ├── GraphPlotter
│   │       └── SolutionSetVisualizer
│   └── Footer (Verify/Next/Show Steps Buttons)
└── useQuestManager (State Management Hook)
```

### Data Flow

1. **Initialization**: useQuestManager loads quest pool based on initial difficulty (BASIC) and stage (INEQUALITY_BASICS)
2. **Quest Selection**: System selects first quest from pool and displays it
3. **User Input**: User enters answer in input field(s) or interacts with visualizations
4. **Verification**: User clicks "Verify" → System compares answer to expected solution set → Displays feedback
5. **Step-by-Step**: User clicks "Show Steps" → System displays solution walkthrough
6. **Navigation**: User clicks "Next" → System loads next quest → Updates visualization
7. **Stage/Difficulty Change**: User changes stage or difficulty → System rebuilds quest pool → Resets to first quest

### State Management

The module uses the `useQuestManager` hook which manages:
- Current difficulty level
- Current stage
- Quest pool (variable size based on difficulty distribution)
- Current quest index
- User inputs (solution sets, interval notation)
- Last verification result
- Quest completion status
- Step-by-step solver visibility

## Components and Interfaces

### 1. SM209Inequalities (Main Page Component)

**Purpose**: Root component that orchestrates the entire module

**Props**: None (uses URL routing)

**State**:
- `currentInequality: InequalityExpression` - Current inequality for visualization
- `showSteps: boolean` - Whether to display step-by-step solver
- `interactionMode: 'input' | 'drag'` - Input mode for number line

**Key Methods**:
- `buildStagePool(t, difficulty, stage)` - Generates quest pool for given difficulty and stage
- `handleDifficultyChange(newDifficulty)` - Switches difficulty level
- `handleStageChange(newStage)` - Switches stage
- `toggleStepSolver()` - Shows/hides step-by-step solution
- `handleNumberLineDrag(value)` - Updates inequality based on dragged boundary

**Responsibilities**:
- Initialize useQuestManager hook
- Build quest pools based on difficulty and stage
- Pass data to ChamberLayout and InequalityVisualization
- Handle language switching via i18n
- Manage step-by-step solver state

### 2. InequalityVisualization Component

**Purpose**: Displays visual representations of inequalities, solution sets, and graphs

**Props**:
```typescript
interface InequalityVisualizationProps {
    quest: SM209Quest;
    stage: "INEQUALITY_BASICS" | "SYSTEMS" | "ABSOLUTE_VALUE";
    onBoundaryDrag?: (value: number) => void;
    translations: {
        number_line: string;
        graph: string;
        solution_set: string;
    };
}
```

**Rendering Logic**:

**Number Line Visualizer**:
- Displays horizontal number line with appropriate scale (-10 to 10 default)
- Shows solution intervals with shaded regions
- Renders boundary points as filled circles (included) or open circles (excluded)
- Supports draggable boundary points for exploration
- Displays interval notation below the number line
- Uses blue for solution regions, gray for non-solution regions

**Graph Plotter**:
- Displays coordinate system with x and y axes
- Renders inequality boundary lines (solid for ≤/≥, dashed for </> )
- Shades solution regions using semi-transparent fill
- Shows multiple inequalities simultaneously for systems
- Highlights intersection regions for systems of inequalities
- Uses different colors for each inequality in a system
- Displays legend showing which color corresponds to which inequality

**Solution Set Visualizer**:
- Displays solution set in multiple representations:
  - Interval notation: (-∞, 3] ∪ [5, ∞)
  - Set-builder notation: {x | x ≤ 3 or x ≥ 5}
  - Graphical representation (number line or coordinate plane)
- Supports compound inequalities and disjunctions
- Handles absolute value inequality solutions (two intervals)
- Shows empty set (∅) when no solution exists
- Shows all real numbers (ℝ) when all values are solutions

### 3. StepBySt
epSolver Component

**Purpose**: Displays step-by-step solution process for inequality problems

**Props**:
```typescript
interface StepBySolverProps {
    quest: SM209Quest;
    visible: boolean;
    translations: {
        step: string;
        justification: string;
        final_solution: string;
    };
}
```

**Step Display Logic**:
- Each step shows:
  - Step number
  - Algebraic expression at that step
  - Justification (e.g., "Add 3 to both sides", "Multiply by -1 and reverse inequality")
  - Visual indicator when inequality direction reverses
- Highlights operations that reverse inequality direction in red
- Uses LaTeX for all mathematical expressions
- Displays final solution in interval notation and on number line

**Example Step Sequence for 2x - 3 < 5**:
```
Step 1: 2x - 3 < 5
        (Original inequality)

Step 2: 2x < 8
        (Add 3 to both sides)

Step 3: x < 4
        (Divide both sides by 2)

Final Solution: (-∞, 4)
```

### 4. Quest Data Structure

```typescript
interface SM209Quest extends Quest {
    id: string;                    // Unique identifier (e.g., "INEQUALITY_BASICS_BASIC_1")
    difficulty: Difficulty;        // BASIC | CORE | ADVANCED | ELITE
    stage: Stage;                  // INEQUALITY_BASICS | SYSTEMS | ABSOLUTE_VALUE
    inequalityType: InequalityType; // LINEAR | SYSTEM | ABSOLUTE_VALUE | COMPOUND
    expression: string;            // Inequality expression (e.g., "2x - 3 < 5")
    variable: string;              // Variable name (usually "x")
    coefficients?: number[];       // Coefficients for linear inequalities
    constants?: number[];          // Constants in the inequality
    systemInequalities?: string[]; // Array of inequalities for systems
    absoluteValueExpression?: string; // Expression inside absolute value
    promptLatex: string;           // Question text
    expressionLatex: string;       // Inequality in LaTeX
    solutionType: SolutionType;    // INTERVAL | POINT | EMPTY | ALL_REALS
    solutionInterval?: Interval;   // Solution as interval(s)
    solutionSet?: string;          // Solution in set-builder notation
    steps?: SolutionStep[];        // Step-by-step solution
    slots: Array<{                 // Input fields
        id: string;
        labelLatex: string;
        placeholder: string;
        expected: string;
        acceptedFormats: string[]; // ["interval", "set-builder", "inequality"]
    }>;
    correctLatex: string;          // Correct answer display
    answer: string;                // Expected answer value
    baselScenario?: string;        // Basel-specific context (150-250 words)
}

interface Interval {
    start: number | '-∞';
    end: number | '∞';
    startInclusive: boolean;
    endInclusive: boolean;
}

interface SolutionStep {
    stepNumber: number;
    expression: string;
    expressionLatex: string;
    justification: string;
    reversesInequality: boolean;
}

type InequalityType = 
    | "LINEAR"           // ax + b < c
    | "SYSTEM"           // Multiple inequalities
    | "ABSOLUTE_VALUE"   // |ax + b| < c
    | "COMPOUND";        // a < x < b

type SolutionType = 
    | "INTERVAL"         // Single or multiple intervals
    | "POINT"            // Single point solution
    | "EMPTY"            // No solution
    | "ALL_REALS";       // All real numbers
```

### 5. Quest Pool Generation

**buildStagePool Function**:

```typescript
function buildStagePool(
    t: TranslationType,
    difficulty: Difficulty,
    stage: Stage
): SM209Quest[]
```

**Logic**:
1. Select quest count based on difficulty:
   - BASIC: 20 quests
   - CORE: 25 quests
   - ADVANCED: 20 quests
   - ELITE: 10 quests
2. Distribute quests across stages:
   - INEQUALITY_BASICS: 40% of quests
   - SYSTEMS: 35% of quests
   - ABSOLUTE_VALUE: 25% of quests
3. Generate quest data based on stage and difficulty
4. Calculate solution sets and generate solution steps
5. Return array of quests

**Data Organization**:
- Total: 75 quests
- BASIC: 20 quests (8 basics, 7 systems, 5 absolute value)
- CORE: 25 quests (10 basics, 9 systems, 6 absolute value)
- ADVANCED: 20 quests (8 basics, 7 systems, 5 absolute value)
- ELITE: 10 quests (4 basics, 3 systems, 3 absolute value)

## Data Models

### Inequality Basics Data

**BASIC**: Simple one-step inequalities
```typescript
{ expression: "x + 3 < 7", solution: "(-∞, 4)", type: "LINEAR" }
{ expression: "2x ≥ 10", solution: "[5, ∞)", type: "LINEAR" }
{ expression: "x - 5 > 2", solution: "(7, ∞)", type: "LINEAR" }
{ expression: "-x ≤ 4", solution: "[-4, ∞)", type: "LINEAR", reversesInequality: true }
```

**CORE**: Two-step inequalities, fractions
```typescript
{ expression: "2x + 3 < 11", solution: "(-∞, 4)", type: "LINEAR" }
{ expression: "3x - 7 ≥ 8", solution: "[5, ∞)", type: "LINEAR" }
{ expression: "x/2 + 1 > 4", solution: "(6, ∞)", type: "LINEAR" }
{ expression: "-2x + 5 ≤ 1", solution: "[2, ∞)", type: "LINEAR", reversesInequality: true }
```

**ADVANCED**: Multi-step inequalities, variables on both sides
```typescript
{ expression: "3x + 5 < 2x + 9", solution: "(-∞, 4)", type: "LINEAR" }
{ expression: "5x - 3 ≥ 2x + 12", solution: "[5, ∞)", type: "LINEAR" }
{ expression: "4(x - 2) > 3x + 1", solution: "(9, ∞)", type: "LINEAR" }
{ expression: "-3x + 7 ≤ -2x + 3", solution: "[4, ∞)", type: "LINEAR", reversesInequality: true }
```

**ELITE**: Complex inequalities, inequality proofs
```typescript
{ expression: "(2x + 1)/3 - (x - 2)/2 < 1", solution: "(-∞, 6)", type: "LINEAR" }
{ expression: "3(x - 1) - 2(x + 3) ≥ x - 11", solution: "ℝ", type: "LINEAR" }
{ expression: "Prove: If a < b and c < 0, then ac > bc", type: "PROOF" }
```

### Systems of Inequalities Data

**BASIC**: Two simple inequalities
```typescript
{ 
    system: ["x > 2", "x < 5"], 
    solution: "(2, 5)", 
    type: "SYSTEM",
    graphType: "NUMBER_LINE"
}
{ 
    system: ["x ≥ -1", "x ≤ 3"], 
    solution: "[-1, 3]", 
    type: "SYSTEM",
    graphType: "NUMBER_LINE"
}
```

**CORE**: Two-variable linear inequalities
```typescript
{ 
    system: ["y > x + 1", "y < -x + 5"], 
    solution: "Intersection region", 
    type: "SYSTEM",
    graphType: "COORDINATE_PLANE"
}
{ 
    system: ["y ≤ 2x - 1", "y ≥ -x + 2"], 
    solution: "Intersection region", 
    type: "SYSTEM",
    graphType: "COORDINATE_PLANE"
}
```

**ADVANCED**: Three or more inequalities, bounded regions
```typescript
{ 
    system: ["x ≥ 0", "y ≥ 0", "x + y ≤ 10"], 
    solution: "Triangular region", 
    type: "SYSTEM",
    graphType: "COORDINATE_PLANE"
}
{ 
    system: ["y ≥ x", "y ≤ -x + 6", "y ≥ 0"], 
    solution: "Triangular region", 
    type: "SYSTEM",
    graphType: "COORDINATE_PLANE"
}
```

**ELITE**: Optimization problems, no solution cases
```typescript
{ 
    system: ["2x + 3y ≤ 12", "x + 2y ≤ 8", "x ≥ 0", "y ≥ 0"], 
    solution: "Feasible region for optimization", 
    type: "SYSTEM",
    graphType: "COORDINATE_PLANE",
    optimization: "Maximize 3x + 4y"
}
{ 
    system: ["x > 5", "x < 3"], 
    solution: "∅ (no solution)", 
    type: "SYSTEM",
    graphType: "NUMBER_LINE"
}
```

### Absolute Value Inequalities Data

**BASIC**: Simple absolute value inequalities
```typescript
{ expression: "|x| < 3", solution: "(-3, 3)", type: "ABSOLUTE_VALUE" }
{ expression: "|x| ≥ 2", solution: "(-∞, -2] ∪ [2, ∞)", type: "ABSOLUTE_VALUE" }
{ expression: "|x| ≤ 5", solution: "[-5, 5]", type: "ABSOLUTE_VALUE" }
{ expression: "|x| > 1", solution: "(-∞, -1) ∪ (1, ∞)", type: "ABSOLUTE_VALUE" }
```

**CORE**: Absolute value with linear expressions
```typescript
{ expression: "|x - 2| < 4", solution: "(-2, 6)", type: "ABSOLUTE_VALUE" }
{ expression: "|x + 3| ≥ 5", solution: "(-∞, -8] ∪ [2, ∞)", type: "ABSOLUTE_VALUE" }
{ expression: "|2x - 1| ≤ 7", solution: "[-3, 4]", type: "ABSOLUTE_VALUE" }
{ expression: "|3x + 2| > 8", solution: "(-∞, -10/3) ∪ (2, ∞)", type: "ABSOLUTE_VALUE" }
```

**ADVANCED**: Complex absolute value inequalities
```typescript
{ expression: "|2x + 3| < |x - 1|", solution: "(-4, -2/3)", type: "ABSOLUTE_VALUE" }
{ expression: "|x - 1| + |x + 2| ≤ 5", solution: "[-3, 2]", type: "ABSOLUTE_VALUE" }
{ expression: "2|x - 3| - 5 ≥ 3", solution: "(-∞, -1] ∪ [7, ∞)", type: "ABSOLUTE_VALUE" }
```

**ELITE**: Absolute value with parameters, no solution cases
```typescript
{ expression: "|x - a| < b (where a, b are parameters)", type: "ABSOLUTE_VALUE", parametric: true }
{ expression: "|x| < -2", solution: "∅ (no solution)", type: "ABSOLUTE_VALUE" }
{ expression: "|x - 3| + 2 < 1", solution: "∅ (no solution)", type: "ABSOLUTE_VALUE" }
```

### Basel-Specific Scenarios

**Basel Tram Ticket Pricing** (150-250 words):
```
Basel's public transport system (BVB/BLT) offers various ticket options. A single ticket costs CHF 3.80, 
while a day pass costs CHF 9.00. You're planning your daily commute and want to determine when buying 
a day pass becomes more economical than buying individual tickets.

Let x represent the number of tram rides you take in a day. The cost of individual tickets is 3.80x CHF, 
while the day pass costs a flat 9.00 CHF. To find when the day pass is cheaper, we need to solve the 
inequality: 3.80x > 9.00

This inequality helps you make an informed decision about which ticket option saves you money based on 
your travel patterns. Understanding inequalities in this context demonstrates how mathematics applies to 
everyday financial decisions in Basel's public transport system.
```

**Roche Pharmaceutical Dosage Constraints** (150-250 words):
```
Roche, one of Basel's largest employers, develops medications that require precise dosing guidelines. 
Consider a medication where the therapeutic dose must be between 50mg and 200mg per day to be effective 
while remaining safe. The dosage depends on the patient's body weight.

For a patient weighing w kilograms, the recommended dose is 2.5w mg per day. To ensure the dose falls 
within the safe and effective range, we need to solve the compound inequality: 50 ≤ 2.5w ≤ 200

This translates to determining the range of patient weights for which this dosing formula is appropriate. 
Solving this system of inequalities gives us: 20 ≤ w ≤ 80, meaning the formula is suitable for patients 
weighing between 20 and 80 kilograms.

This example illustrates how pharmaceutical companies like Roche use mathematical inequalities to establish 
safe dosing guidelines, ensuring patient safety while maintaining therapeutic effectiveness.
```

**Basel Marathon Time Qualifications** (150-250 words):
```
The Basel Marathon (Basel Stadt Lauf) has different qualification standards for various age categories. 
To qualify for the elite wave start, runners must have completed a previous marathon within specific time 
limits based on their age group.

For the men's elite category (ages 18-39), the qualification time is under 3 hours 15 minutes (195 minutes). 
For ages 40-49, the time extends to under 3 hours 30 minutes (210 minutes). Let t represent your marathon 
time in minutes, and let a represent your age.

The qualification criteria can be expressed as a system of inequalities:
- If 18 ≤ a ≤ 39, then t < 195
- If 40 ≤ a ≤ 49, then t < 210

These compound inequalities help runners determine whether they qualify for elite wave placement. Understanding 
how to work with systems of inequalities is essential for interpreting qualification standards in competitive 
sports events like the Basel Marathon.
```

**University Basel Admission Score Requirements** (150-250 words):
```
The University of Basel uses a points-based admission system for competitive programs like Medicine and 
Psychology. Applicants are evaluated on multiple criteria: Matura grade (maximum 6.0 points), entrance 
exam score (maximum 100 points), and interview performance (maximum 20 points).

For the Medicine program, the total score S must satisfy: S ≥ 110 points for guaranteed admission. 
Additionally, no single component can fall below minimum thresholds:
- Matura grade: M ≥ 5.0
- Entrance exam: E ≥ 60
- Interview: I ≥ 12

The total score is calculated as: S = 10M + E + I

To determine if you qualify for guaranteed admission, you must solve the system of inequalities:
- 10M + E + I ≥ 110
- M ≥ 5.0
- E ≥ 60
- I ≥ 12

This system of inequalities helps prospective students understand the minimum requirements across all 
evaluation criteria. It demonstrates how universities use mathematical inequalities to establish fair 
and transparent admission standards.
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

After analyzing all acceptance criteria, I've identified the following consolidations to eliminate redundancy:

**Redundancies Identified:**
1. Properties 12.4 and 12.5 (solid vs dashed lines) are subsumed by 12.3 (distinct visual styling)
2. Properties 13.4 and 13.5 (filled vs open circles) are subsumed by a general boundary rendering property
3. Properties 6.2, 6.4, 6.5, 6.6 (various translation aspects) can be combined into comprehensive translation properties
4. Properties 3.2, 3.4, 3.7 (visualization interactions) overlap and can be consolidated
5. Properties 10.1, 10.2, 10.5 (validation aspects) can be combined into comprehensive validation properties

**Consolidated Properties:**
- Combine boundary rendering properties into single comprehensive property
- Combine translation properties into two properties: completeness and consistency
- Combine visualization interaction properties into reactivity property
- Combine validation properties into equivalence checking property

### Property 1: Quest Distribution Correctness

*For any* complete quest pool, the total count should equal 75 quests, with exactly 20 BASIC, 25 CORE, 20 ADVANCED, and 10 ELITE quests.

**Validates: Requirements 1.1, 1.2**

### Property 2: Quest Assignment Uniqueness

*For any* quest in the system, it should be assigned to exactly one difficulty tier and exactly one stage.

**Validates: Requirements 1.7**

### Property 3: Inequality Direction Reversal Marking

*For any* solution step that multiplies or divides by a negative number, the step should be marked with reversesInequality: true and the inequality symbol should be reversed.

**Validates: Requirements 2.6, 4.3**

### Property 4: Step Justification Completeness

*For any* quest with a step-by-step solution, each step should have a non-empty justification explaining the algebraic operation performed.

**Validates: Requirements 4.2, 4.4**

### Property 5: Basel Scenario Word Count

*For any* Basel-specific scenario, the context text word count should be between 150 and 250 words inclusive.

**Validates: Requirements 5.6**

### Property 6: Translation Completeness

*For any* UI text element (quest text, instruction, button label, scenario), translations should exist for all three languages (EN, CN, DE) and none should be empty strings.

**Validates: Requirements 6.2, 6.4**

### Property 7: LaTeX Mathematical Consistency

*For any* mathematical expression, the LaTeX representation should be identical across all three language versions, ensuring language-independent notation.

**Validates: Requirements 6.5, 8.1**

### Property 8: Interval Notation Equivalence

*For any* two interval notations representing the same solution set (e.g., "(-∞, 3)" and "(-infinity, 3)"), the validation system should accept both as correct.

**Validates: Requirements 10.2**

### Property 9: Solution Set Validation Correctness

*For any* submitted answer and expected solution, the validation should return true if and only if the submitted answer represents the same mathematical solution set as the expected answer.

**Validates: Requirements 10.1, 10.5**

### Property 10: Progress State Persistence

*For any* quest completion event, marking a quest as completed should persist the state such that reloading the page preserves the completion status.

**Validates: Requirements 11.2, 11.5**

### Property 11: Language Switch State Preservation

*For any* language switch operation, the current quest index, user inputs, and completion status should remain unchanged after the language change.

**Validates: Requirements 6.3**

### Property 12: Boundary Line Rendering Consistency

*For any* inequality with ≤ or ≥, the boundary line should be rendered as solid; for any inequality with < or >, the boundary line should be rendered as dashed.

**Validates: Requirements 12.3, 12.4, 12.5**

### Property 13: Boundary Point Rendering Consistency

*For any* solution interval with an inclusive boundary, the boundary point should be rendered as a filled circle; for any exclusive boundary, it should be rendered as an open circle.

**Validates: Requirements 13.4, 13.5**

### Property 14: Visualization Reactivity

*For any* change to inequality parameters (coefficients, constants, boundaries), all active visualizations should update to reflect the new values within one render cycle.

**Validates: Requirements 3.7, 13.6**

### Property 15: System Intersection Shading

*For any* system of two or more inequalities, the Graph_Plotter should shade only the region where all inequalities are simultaneously satisfied, excluding regions where any inequality is violated.

**Validates: Requirements 12.2, 15.2**

### Property 16: Absolute Value Case Splitting

*For any* absolute value inequality of the form |f(x)| < a (where a > 0), the solver should display the equivalent compound inequality -a < f(x) < a; for |f(x)| > a, it should display f(x) < -a OR f(x) > a.

**Validates: Requirements 14.2, 14.3, 14.4**

### Property 17: Touch Target Minimum Size

*For any* interactive element on mobile viewports (width < 768px), the touch target should be at least 44x44 pixels to ensure accessibility.

**Validates: Requirements 9.4**

### Property 18: LaTeX Symbol Support

*For any* inequality expression containing symbols <, >, ≤, ≥, ≠, or absolute value bars, the LaTeX renderer should correctly display these symbols without rendering errors.

**Validates: Requirements 8.2, 8.3**

### Property 19: Empty Solution Set Indication

*For any* inequality or system with no solution, the Solution_Set_Visualizer should display the empty set symbol (∅) and the Graph_Plotter should indicate no feasible region exists.

**Validates: Requirements 15.3**

### Property 20: Absolute Value Dual Interval Display

*For any* absolute value inequality with solution type "two intervals" (e.g., |x| > 3), the Number_Line_Visualizer should display both intervals on the number line with appropriate boundary markers.

**Validates: Requirements 14.5**

## Error Handling

### Input Validation

**Invalid Interval Notation**:
- User enters malformed interval notation (e.g., "(3, 5])")
- System: Parse and attempt to interpret, or display error feedback
- Suggest correct format: "Use format like (-∞, 5] or [2, 10)"

**Empty Input**:
- User clicks "Verify" with empty input field
- System: Treat as incorrect answer, display error feedback
- Prompt user to enter a solution

**Ambiguous Notation**:
- User enters "x < 3 or x > 5" vs interval notation
- System: Accept multiple equivalent formats
- Parse both inequality notation and interval notation

**Invalid Inequality Expression**:
- User enters non-mathematical text
- System: Display error feedback
- Provide example of correct format

### Quest Loading Errors

**Missing Quest Data**:
- Quest pool generation fails or returns wrong count
- System: Display loading state with message "Loading quests..."
- Log error to console for debugging
- Fallback to default quest set

**Invalid Quest Structure**:
- Quest object missing required fields (id, difficulty, stage, expression)
- System: Skip invalid quest, load next valid quest
- Log warning to console

**Solution Calculation Errors**:
- Inequality solving algorithm produces invalid solution
- System: Use fallback solution or skip quest
- Log error to console

### Visualization Errors

**Missing Quest Properties**:
- Quest lacks expression or solution interval
- System: Use default values or display placeholder
- Show message: "Visualization unavailable for this quest"

**Rendering Failures**:
- SVG rendering fails for number line or graph
- System: Display static fallback visualization
- Functionality remains intact

**Drag Interaction Failures**:
- Drag handlers fail to attach or respond
- System: Disable drag interaction, keep visualization static
- Display message: "Interactive mode unavailable"

### Translation Errors

**Missing Translation Key**:
- Requested translation key doesn't exist in i18n
- System: Display English fallback text
- Log warning to console

**Language Switch Failure**:
- Language change doesn't update UI
- System: Force re-render of components
- Persist language preference in localStorage

**LaTeX Rendering Errors**:
- LaTeX syntax error prevents rendering
- System: Display raw LaTeX string as fallback
- Log error to console with problematic LaTeX

### Step-by-Step Solver Errors

**Missing Solution Steps**:
- Quest lacks steps array or steps are incomplete
- System: Generate basic steps algorithmically
- Display message: "Detailed steps unavailable"

**Step Calculation Errors**:
- Intermediate step calculation produces invalid result
- System: Skip problematic step, continue with remaining steps
- Log error to console

## Testing Strategy

### Unit Testing

**Quest Generation Tests**:
- Test `buildStagePool` function for each stage and difficulty
- Verify total quest count equals 75
- Verify quest distribution: 20 BASIC, 25 CORE, 20 ADVANCED, 10 ELITE
- Verify each quest has required fields
- Verify solution sets are calculated correctly

**Inequality Solving Tests**:
- Test linear inequality solving: ax + b < c
- Test compound inequality solving: a < x < b
- Test absolute value inequality solving: |x - a| < b
- Test system of inequalities solving
- Test inequality direction reversal when multiplying/dividing by negative

**Interval Notation Parsing Tests**:
- Test parsing "(-∞, 5]"
- Test parsing "[2, 10)"
- Test parsing "(-∞, -3] ∪ [3, ∞)"
- Test parsing equivalent notations
- Test invalid notation handling

**Answer Verification Tests**:
- Test verification with exact match
- Test verification with equivalent interval notation
- Test verification with set-builder notation
- Test verification with inequality notation
- Test verification with invalid input

**Translation Tests**:
- Test all translation keys exist for EN, CN, DE
- Test language switching updates UI text
- Test LaTeX formulas remain consistent across languages
- Test Basel scenario translations are 150-250 words

**Visualization Tests**:
- Test number line renders correctly for various intervals
- Test graph plotter renders boundary lines correctly
- Test solution set visualizer displays correct notation
- Test solid vs dashed line rendering
- Test filled vs open circle rendering

### Property-Based Testing

**Configuration**: Use fast-check library for TypeScript, minimum 100 iterations per test

**Property Test 1: Quest Distribution**
```typescript
// Feature: sm2-09-inequalities, Property 1: Quest distribution correctness
fc.assert(
  fc.property(
    fc.constant(null),
    () => {
      const allQuests = getAllQuests();
      const basicCount = allQuests.filter(q => q.difficulty === "BASIC").length;
      const coreCount = allQuests.filter(q => q.difficulty === "CORE").length;
      const advancedCount = allQuests.filter(q => q.difficulty === "ADVANCED").length;
      const eliteCount = allQuests.filter(q => q.difficulty === "ELITE").length;
      
      return (
        allQuests.length === 75 &&
        basicCount === 20 &&
        coreCount === 25 &&
        advancedCount === 20 &&
        eliteCount === 10
      );
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 2: Quest Assignment Uniqueness**
```typescript
// Feature: sm2-09-inequalities, Property 2: Quest assignment uniqueness
fc.assert(
  fc.property(
    fc.constantFrom(...getAllQuests()),
    (quest) => {
      const difficulties = ["BASIC", "CORE", "ADVANCED", "ELITE"];
      const stages = ["INEQUALITY_BASICS", "SYSTEMS", "ABSOLUTE_VALUE"];
      
      const hasSingleDifficulty = difficulties.filter(d => quest.difficulty === d).length === 1;
      const hasSingleStage = stages.filter(s => quest.stage === s).length === 1;
      
      return hasSingleDifficulty && hasSingleStage;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 3: Inequality Direction Reversal**
```typescript
// Feature: sm2-09-inequalities, Property 3: Inequality direction reversal marking
fc.assert(
  fc.property(
    fc.float({ min: -10, max: -0.1 }),  // negative multiplier
    fc.float({ min: 1, max: 10 }),      // left side
    fc.float({ min: 1, max: 10 }),      // right side
    (multiplier, left, right) => {
      const steps = solveInequality(`${left}x < ${right}`, [
        { operation: "multiply", value: multiplier }
      ]);
      
      const multiplyStep = steps.find(s => s.operation === "multiply");
      return multiplyStep.reversesInequality === true;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 4: Basel Scenario Word Count**
```typescript
// Feature: sm2-09-inequalities, Property 5: Basel scenario word count
fc.assert(
  fc.property(
    fc.constantFrom(...getBaselScenarios()),
    (scenario) => {
      const wordCount = scenario.context.split(/\\s+/).length;
      return wordCount >= 150 && wordCount <= 250;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 5: Translation Completeness**
```typescript
// Feature: sm2-09-inequalities, Property 6: Translation completeness
fc.assert(
  fc.property(
    fc.constantFrom("EN", "CN", "DE"),
    fc.constantFrom(...getAllTranslationKeys()),
    (language, key) => {
      const translation = getTranslation(language, key);
      return translation !== undefined && translation !== "";
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 6: LaTeX Consistency Across Languages**
```typescript
// Feature: sm2-09-inequalities, Property 7: LaTeX mathematical consistency
fc.assert(
  fc.property(
    fc.constantFrom(...getAllQuests()),
    (quest) => {
      const enLatex = getQuestLatex(quest, "EN");
      const cnLatex = getQuestLatex(quest, "CN");
      const deLatex = getQuestLatex(quest, "DE");
      
      return enLatex === cnLatex && cnLatex === deLatex;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 7: Interval Notation Equivalence**
```typescript
// Feature: sm2-09-inequalities, Property 8: Interval notation equivalence
fc.assert(
  fc.property(
    fc.float({ min: -100, max: 100 }),
    fc.float({ min: -100, max: 100 }),
    (a, b) => {
      const [start, end] = a < b ? [a, b] : [b, a];
      const notation1 = `(${start}, ${end})`;
      const notation2 = `(${start},${end})`;  // no space
      const notation3 = start === -Infinity ? `(-∞, ${end})` : notation1;
      
      const parsed1 = parseInterval(notation1);
      const parsed2 = parseInterval(notation2);
      const parsed3 = parseInterval(notation3);
      
      return (
        parsed1.start === parsed2.start &&
        parsed1.end === parsed2.end &&
        (start !== -Infinity || parsed3.start === parsed1.start)
      );
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 8: Solution Set Validation**
```typescript
// Feature: sm2-09-inequalities, Property 9: Solution set validation correctness
fc.assert(
  fc.property(
    fc.float({ min: -100, max: 100 }),
    fc.float({ min: -100, max: 100 }),
    (a, b) => {
      const [start, end] = a < b ? [a, b] : [b, a];
      const expected = { start, end, startInclusive: false, endInclusive: false };
      
      // Test various equivalent representations
      const submitted1 = `(${start}, ${end})`;
      const submitted2 = `{x | ${start} < x < ${end}}`;
      const submitted3 = `x > ${start} and x < ${end}`;
      
      return (
        validateSolution(submitted1, expected) &&
        validateSolution(submitted2, expected) &&
        validateSolution(submitted3, expected)
      );
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 9: Progress State Persistence**
```typescript
// Feature: sm2-09-inequalities, Property 10: Progress state persistence
fc.assert(
  fc.property(
    fc.constantFrom(...getAllQuests()),
    (quest) => {
      // Mark quest as completed
      markQuestCompleted(quest.id);
      
      // Simulate page reload
      const restoredState = loadProgressState();
      
      return restoredState.completedQuests.includes(quest.id);
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 10: Language Switch Preservation**
```typescript
// Feature: sm2-09-inequalities, Property 11: Language switch state preservation
fc.assert(
  fc.property(
    fc.integer({ min: 0, max: 74 }),  // quest index
    fc.constantFrom("EN", "CN", "DE"),
    fc.constantFrom("EN", "CN", "DE"),
    (questIndex, fromLang, toLang) => {
      // Set initial state
      setCurrentQuest(questIndex);
      setLanguage(fromLang);
      const initialState = getCurrentState();
      
      // Switch language
      setLanguage(toLang);
      const newState = getCurrentState();
      
      return (
        newState.questIndex === initialState.questIndex &&
        newState.completedQuests.length === initialState.completedQuests.length
      );
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 11: Boundary Line Rendering**
```typescript
// Feature: sm2-09-inequalities, Property 12: Boundary line rendering consistency
fc.assert(
  fc.property(
    fc.constantFrom("<", ">", "≤", "≥"),
    (symbol) => {
      const inequality = `y ${symbol} 2x + 1`;
      const rendering = renderBoundaryLine(inequality);
      
      const shouldBeSolid = symbol === "≤" || symbol === "≥";
      const shouldBeDashed = symbol === "<" || symbol === ">";
      
      return (
        (shouldBeSolid && rendering.lineStyle === "solid") ||
        (shouldBeDashed && rendering.lineStyle === "dashed")
      );
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 12: Boundary Point Rendering**
```typescript
// Feature: sm2-09-inequalities, Property 13: Boundary point rendering consistency
fc.assert(
  fc.property(
    fc.float({ min: -10, max: 10 }),
    fc.boolean(),
    (boundary, inclusive) => {
      const interval = { start: boundary, startInclusive: inclusive };
      const rendering = renderBoundaryPoint(interval, "start");
      
      return (
        (inclusive && rendering.pointStyle === "filled") ||
        (!inclusive && rendering.pointStyle === "open")
      );
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 13: Visualization Reactivity**
```typescript
// Feature: sm2-09-inequalities, Property 14: Visualization reactivity
fc.assert(
  fc.property(
    fc.float({ min: -10, max: 10 }),
    fc.float({ min: -10, max: 10 }),
    (oldBoundary, newBoundary) => {
      // Set initial boundary
      setBoundary(oldBoundary);
      const initialVisualization = getVisualizationState();
      
      // Update boundary
      setBoundary(newBoundary);
      const updatedVisualization = getVisualizationState();
      
      return updatedVisualization.boundary === newBoundary;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 14: System Intersection Shading**
```typescript
// Feature: sm2-09-inequalities, Property 15: System intersection shading
fc.assert(
  fc.property(
    fc.float({ min: -10, max: 10 }),
    fc.float({ min: -10, max: 10 }),
    (x, y) => {
      const system = ["y > x + 1", "y < -x + 5"];
      const shading = getGraphShading(system);
      
      const satisfiesAll = y > x + 1 && y < -x + 5;
      const isShaded = shading.isPointShaded(x, y);
      
      return satisfiesAll === isShaded;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 15: Absolute Value Case Splitting**
```typescript
// Feature: sm2-09-inequalities, Property 16: Absolute value case splitting
fc.assert(
  fc.property(
    fc.float({ min: 0.1, max: 10 }),
    fc.constantFrom("<", ">"),
    (a, symbol) => {
      const inequality = `|x| ${symbol} ${a}`;
      const steps = solveAbsoluteValue(inequality);
      
      if (symbol === "<") {
        // Should show -a < x < a
        return steps.some(s => s.expression.includes(`-${a} < x < ${a}`));
      } else {
        // Should show x < -a OR x > a
        return steps.some(s => s.expression.includes(`x < -${a}`) && s.expression.includes(`x > ${a}`));
      }
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
4. Complete all quests in a stage → Verify stage completion
5. Change difficulty → Verify new quest pool loads
6. Change stage → Verify appropriate visualization displays

**Visualization Synchronization**:
1. Load linear inequality quest → Verify number line shows solution interval
2. Load system of inequalities quest → Verify graph shows intersection region
3. Load absolute value inequality quest → Verify number line shows two intervals
4. Drag boundary point → Verify inequality expression updates
5. Change quest → Verify visualization updates in real-time

**Step-by-Step Solver**:
1. Click "Show Steps" → Verify steps display
2. Verify each step has justification
3. Verify steps that reverse inequality are highlighted
4. Verify final solution matches expected answer
5. Click "Hide Steps" → Verify steps hide

**Language Switching**:
1. Load module in English → Verify all text is English
2. Switch to Chinese → Verify all text updates to Chinese (including 不等式, 解集)
3. Switch to German → Verify all text updates to German (including Ungleichung, Lösungsmenge)
4. Verify LaTeX formulas remain consistent across languages
5. Verify progress is preserved after language switch

**Basel Scenarios**:
1. Load Basel tram scenario → Verify context displays
2. Verify word count is 150-250 words
3. Verify scenario is translated in all three languages
4. Solve inequality → Verify solution relates to scenario context

### Browser Testing

**Supported Browsers**:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

**Test Checklist**:
- [ ] Module loads without errors
- [ ] All 75 quests display correctly
- [ ] Input fields accept interval notation and inequality notation
- [ ] Verify button triggers validation
- [ ] Next button advances to next quest
- [ ] Show Steps button displays step-by-step solution
- [ ] Number line visualizer renders correctly
- [ ] Graph plotter renders correctly with shading
- [ ] Solution set visualizer displays correct notation
- [ ] Draggable boundary points work on number line
- [ ] Language switching works (EN/CN/DE)
- [ ] LaTeX formulas render correctly (≤, ≥, |x|, etc.)
- [ ] Responsive layout works on mobile/tablet
- [ ] Touch targets are at least 44x44 pixels on mobile
- [ ] Basel scenarios display correctly in all languages
- [ ] Progress tracking persists across page reloads
- [ ] No console errors or warnings
