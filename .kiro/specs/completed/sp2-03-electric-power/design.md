# Design Document: SP2.03 - Electric Power & Energy

## Overview

The SP2.03 module is an interactive educational web application that teaches students about electric power (P=UI), energy consumption (W=Pt), and efficiency through a mixed-mode interface combining practice problems with real-time visualizations. The module follows the Chamber Module Standards with a two-column layout: quest exercises on the left and dynamic visualizations on the right.

The module consists of three stages (Power Basics, Energy Consumption, Efficiency), each with four difficulty levels (BASIC, CORE, ADVANCED, ELITE), providing 60 total quests (3 stages × 4 difficulties × 5 quests). All content is available in three languages (EN/CN/DE) with Basel-specific scenarios.

## Architecture

### Component Hierarchy

```
SP203ElectricPower (Page Component)
├── ChamberLayout (Layout Container)
│   ├── Header (Title, Language Selector)
│   ├── DifficultySelector (BASIC/CORE/ADVANCED/ELITE)
│   ├── StageSelector (POWER_BASICS/ENERGY_CONSUMPTION/EFFICIENCY)
│   ├── Left Panel (Quest Content)
│   │   ├── ScenarioDescription
│   │   ├── QuestDisplay
│   │   │   ├── PromptText
│   │   │   ├── FormulaDisplay (LaTeX)
│   │   │   └── InputField(s)
│   │   └── FeedbackDisplay
│   ├── Right Panel (Visualization)
│   │   └── PowerVisualization
│   │       ├── PowerBasicsView
│   │       ├── EnergyConsumptionView
│   │       └── EfficiencyView
│   └── Footer (Verify/Next Buttons)
└── useQuestManager (State Management Hook)
```

### Data Flow

1. **Initialization**: useQuestManager loads quest pool based on initial difficulty (BASIC) and stage (POWER_BASICS)
2. **Quest Selection**: System selects first quest from pool and displays it
3. **User Input**: User enters answer in input field(s)
4. **Verification**: User clicks "Verify" → System compares answer to expected value → Displays feedback
5. **Navigation**: User clicks "Next" → System loads next quest → Updates visualization
6. **Stage/Difficulty Change**: User changes stage or difficulty → System rebuilds quest pool → Resets to first quest

### State Management

The module uses the `useQuestManager` hook which manages:
- Current difficulty level
- Current stage
- Quest pool (array of 5 quests)
- Current quest index
- User inputs (key-value pairs)
- Last verification result
- Quest completion status

## Components and Interfaces

### 1. SP203ElectricPower (Main Page Component)

**Purpose**: Root component that orchestrates the entire module

**Props**: None (uses URL routing)

**State**:
- `currentPower: number` - Current power value for visualization

**Key Methods**:
- `buildStagePool(t, difficulty, stage)` - Generates quest pool for given difficulty and stage
- `handleDifficultyChange(newDifficulty)` - Switches difficulty level
- `handleStageChange(newStage)` - Switches stage

**Responsibilities**:
- Initialize useQuestManager hook
- Build quest pools based on difficulty and stage
- Pass data to ChamberLayout and PowerVisualization
- Handle language switching via i18n

### 2. PowerVisualization Component

**Purpose**: Displays visual representations of power, energy, and efficiency concepts

**Props**:
```typescript
interface PowerVisualizationProps {
    quest: SP203Quest;
    stage: "POWER_BASICS" | "ENERGY_CONSUMPTION" | "EFFICIENCY";
    power: number;
    translations: {
        power_basics: string;
        energy_consumption: string;
        efficiency: string;
    };
}
```

**Rendering Logic**:

**Power Basics View**:
- Displays animated pulsing circle with power value (W)
- Shows voltage (V) and current (A) in separate panels
- Uses yellow color for power, cyan for voltage, red for current
- Formula: P = U × I

**Energy Consumption View**:
- Displays power (W), time (h), energy (kWh), and cost (CHF) in stacked panels
- Uses green for energy, yellow for cost
- Formula: E = P × t
- Cost calculation: Cost = E × rate (CHF/kWh)

**Efficiency View**:
- Displays input power → output power flow diagram
- Shows efficiency percentage and power loss
- Animated efficiency bar showing percentage
- Uses blue for input, green for output, yellow for efficiency, red for loss
- Formula: η = (P_out / P_in) × 100%

### 3. Quest Data Structure

```typescript
interface SP203Quest extends Quest {
    id: string;                    // Unique identifier (e.g., "POWER_BASICS_BASIC_1")
    difficulty: Difficulty;        // BASIC | CORE | ADVANCED | ELITE
    stage: Stage;                  // POWER_BASICS | ENERGY_CONSUMPTION | EFFICIENCY
    voltage?: number;              // Voltage in Volts (V)
    current?: number;              // Current in Amperes (A)
    power?: number;                // Power in Watts (W)
    time?: number;                 // Time in hours (h)
    energy?: number;               // Energy in Wh or kWh
    cost?: number;                 // Electricity rate in CHF/kWh
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
    answer: string;                // Expected answer value
}
```

### 4. Quest Pool Generation

**buildStagePool Function**:

```typescript
function buildStagePool(
    t: TranslationType,
    difficulty: Difficulty,
    stage: Stage
): SP203Quest[]
```

**Logic**:
1. Select data array based on difficulty (BASIC/CORE/ADVANCED/ELITE)
2. Select data subset based on stage (POWER_BASICS/ENERGY_CONSUMPTION/EFFICIENCY)
3. Map each data item to a Quest object
4. Calculate expected answers based on formulas
5. Return array of 5 quests

**Data Organization**:
- Each stage has 4 difficulty levels
- Each difficulty level has 5 quests
- Total: 3 stages × 4 difficulties × 5 quests = 60 quests

## Data Models

### Power Basics Data

**BASIC**: Simple integer values, single-step calculations
```typescript
{ voltage: 12, current: 2, power: "24" }  // Find P given U and I
{ power: 60, voltage: 12, current: "5" }  // Find I given P and U
```

**CORE**: Household voltage (220V), decimal currents
```typescript
{ voltage: 220, current: 0.5, power: "110" }
{ power: 1000, voltage: 220, current: "4.55" }
```

**ADVANCED**: Higher power devices, more precision
```typescript
{ voltage: 230, current: 4.35, power: "1000" }
{ power: 2000, voltage: 220, current: "9.09" }
```

**ELITE**: Industrial/commercial scale, 3-phase power
```typescript
{ voltage: 380, current: 16, power: "6080" }  // 3-phase
{ power: 10000, current: 45, voltage: "222" }  // 10kW
```

### Energy Consumption Data

**BASIC**: Energy in Watt-hours (Wh)
```typescript
{ power: 100, time: 10, energy: "1000" }  // 100W × 10h = 1000Wh
```

**CORE**: Energy in kilowatt-hours (kWh)
```typescript
{ power: 1000, time: 5, energy: "5" }  // 1kW × 5h = 5kWh
```

**ADVANCED**: Cost calculations with Swiss rates
```typescript
{ power: 1000, time: 30, cost: 0.25, answer: "7.5" }  // 1kW × 30 days × 0.25 CHF/kWh
```

**ELITE**: Annual/long-term costs
```typescript
{ power: 5000, time: 365, cost: 0.25, answer: "10950" }  // 5kW × 365 days × 0.25 CHF/kWh
```

### Efficiency Data

**BASIC**: Calculate efficiency percentage
```typescript
{ input: 100, output: 80, efficiency: "80" }  // (80/100) × 100% = 80%
```

**CORE**: Calculate output or input given efficiency
```typescript
{ input: 1000, efficiency: 85, output: "850" }  // 1000W × 0.85 = 850W
{ output: 750, efficiency: 75, input: "1000" }  // 750W / 0.75 = 1000W
```

**ADVANCED**: Calculate power loss
```typescript
{ input: 1000, output: 850, loss: "150" }  // 1000W - 850W = 150W
```

**ELITE**: Real-world device efficiencies
```typescript
{ device: "LED", input: 10, output: 9, efficiency: "90" }
{ device: "Incandescent", input: 60, output: 6, efficiency: "10" }
{ device: "Solar Panel", input: 1000, output: 200, efficiency: "20" }
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Power Calculation Correctness

*For any* quest in the Power Basics stage with given voltage U and current I, the calculated power P should equal U × I within a tolerance of ±0.01.

**Validates: Requirements 1.2, 1.7**

### Property 2: Current Calculation Correctness

*For any* quest in the Power Basics stage with given power P and voltage U, the calculated current I should equal P / U within a tolerance of ±0.01.

**Validates: Requirements 1.3, 1.7**

### Property 3: Voltage Calculation Correctness

*For any* quest in the Power Basics stage with given power P and current I, the calculated voltage U should equal P / I within a tolerance of ±0.01.

**Validates: Requirements 1.4, 1.7**

### Property 4: Energy Calculation Correctness (Wh)

*For any* BASIC difficulty quest in the Energy Consumption stage with given power P (in Watts) and time t (in hours), the calculated energy E should equal P × t in Watt-hours within a tolerance of ±0.01.

**Validates: Requirements 2.2, 2.7**

### Property 5: Energy Calculation Correctness (kWh)

*For any* CORE difficulty quest in the Energy Consumption stage with given power P (in Watts) and time t (in hours), the calculated energy E should equal (P × t) / 1000 in kilowatt-hours within a tolerance of ±0.01.

**Validates: Requirements 2.3, 2.7**

### Property 6: Cost Calculation Correctness

*For any* ADVANCED or ELITE difficulty quest in the Energy Consumption stage with given power P, time t, and rate r (CHF/kWh), the calculated cost should equal (P × t / 1000) × r in Swiss Francs within a tolerance of ±0.01.

**Validates: Requirements 2.4, 2.7**

### Property 7: Efficiency Calculation Correctness

*For any* quest in the Efficiency stage with given input power P_in and output power P_out, the calculated efficiency η should equal (P_out / P_in) × 100 as a percentage within a tolerance of ±0.01.

**Validates: Requirements 3.2, 3.7**

### Property 8: Output Power Calculation Correctness

*For any* quest in the Efficiency stage with given input power P_in and efficiency η (as percentage), the calculated output power P_out should equal P_in × (η / 100) within a tolerance of ±0.01.

**Validates: Requirements 3.3, 3.7**

### Property 9: Input Power Calculation Correctness

*For any* quest in the Efficiency stage with given output power P_out and efficiency η (as percentage), the calculated input power P_in should equal P_out / (η / 100) within a tolerance of ±0.01.

**Validates: Requirements 3.4, 3.7**

### Property 10: Power Loss Calculation Correctness

*For any* quest in the Efficiency stage with given input power P_in and output power P_out, the calculated power loss should equal P_in - P_out within a tolerance of ±0.01.

**Validates: Requirements 3.5, 3.7**

### Property 11: Quest Pool Size Consistency

*For any* combination of difficulty and stage, the generated quest pool should contain exactly 5 quests.

**Validates: Requirements 1.5, 2.5, 3.6, 9.2**

### Property 12: Answer Verification Tolerance

*For any* user input that differs from the expected answer by less than or equal to 0.01, the verification should return success (ok: true).

**Validates: Requirements 1.7, 8.2**

### Property 13: Translation Completeness

*For any* UI text element (title, button, instruction, scenario), translations should exist for all three languages (EN, CN, DE).

**Validates: Requirements 7.1, 7.2, 7.3, 7.4**

### Property 14: LaTeX Formula Rendering

*For any* mathematical formula displayed in the UI, it should be rendered using react-katex with proper LaTeX syntax (double backslashes, \\text{} for units).

**Validates: Requirements 7.5, 11.1, 11.2, 11.4, 11.5**

### Property 15: Visualization Data Synchronization

*For any* quest displayed, the visualization should reflect the quest's numerical values (voltage, current, power, time, energy, cost, efficiency) accurately.

**Validates: Requirements 5.1, 5.2, 5.3, 5.4**

## Error Handling

### Input Validation

**Invalid Number Format**:
- User enters non-numeric text (e.g., "abc")
- System: Treat as incorrect answer, display error feedback
- No crash or exception

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
- Quest object missing required fields (id, difficulty, stage, slots)
- System: Skip invalid quest, load next valid quest
- Log warning to console

### Visualization Errors

**Missing Quest Properties**:
- Quest lacks voltage, current, or power values
- System: Use default values (voltage: 220V, current: 1A, power: 220W)
- Display visualization with defaults

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

## Testing Strategy

### Unit Testing

**Quest Generation Tests**:
- Test `buildStagePool` function for each stage and difficulty
- Verify quest pool contains exactly 5 quests
- Verify quest objects have all required fields
- Verify expected answers are calculated correctly

**Calculation Tests**:
- Test power calculation: P = U × I
- Test current calculation: I = P / U
- Test voltage calculation: U = P / I
- Test energy calculation: E = P × t
- Test cost calculation: Cost = E × rate
- Test efficiency calculation: η = (P_out / P_in) × 100%
- Test power loss calculation: Loss = P_in - P_out

**Answer Verification Tests**:
- Test verification with exact match
- Test verification with ±0.01 tolerance
- Test verification with values outside tolerance
- Test verification with invalid input (non-numeric, empty)

**Translation Tests**:
- Test all translation keys exist for EN, CN, DE
- Test language switching updates UI text
- Test LaTeX formulas render correctly in all languages

### Property-Based Testing

**Configuration**: Use fast-check library for TypeScript, minimum 100 iterations per test

**Property Test 1: Power Calculation Round Trip**
```typescript
// Feature: sp2-03-electric-power, Property 1: Power calculation correctness
fc.assert(
  fc.property(
    fc.float({ min: 1, max: 500 }),    // voltage
    fc.float({ min: 0.1, max: 50 }),   // current
    (voltage, current) => {
      const power = voltage * current;
      const calculatedPower = round2(power);
      const expected = round2(voltage * current);
      return Math.abs(calculatedPower - expected) <= 0.01;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 2: Energy Calculation Consistency**
```typescript
// Feature: sp2-03-electric-power, Property 4: Energy calculation correctness (Wh)
fc.assert(
  fc.property(
    fc.float({ min: 10, max: 5000 }),  // power in Watts
    fc.float({ min: 0.5, max: 24 }),   // time in hours
    (power, time) => {
      const energy = power * time;
      const calculatedEnergy = round2(energy);
      const expected = round2(power * time);
      return Math.abs(calculatedEnergy - expected) <= 0.01;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 3: Efficiency Calculation Bounds**
```typescript
// Feature: sp2-03-electric-power, Property 7: Efficiency calculation correctness
fc.assert(
  fc.property(
    fc.float({ min: 100, max: 10000 }),  // input power
    fc.float({ min: 0.1, max: 1.0 }),    // efficiency ratio (0.1 to 1.0)
    (inputPower, efficiencyRatio) => {
      const outputPower = inputPower * efficiencyRatio;
      const efficiency = (outputPower / inputPower) * 100;
      return efficiency >= 0 && efficiency <= 100;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 4: Cost Calculation Monotonicity**
```typescript
// Feature: sp2-03-electric-power, Property 6: Cost calculation correctness
fc.assert(
  fc.property(
    fc.float({ min: 100, max: 5000 }),   // power
    fc.float({ min: 1, max: 365 }),      // time in days
    fc.float({ min: 0.15, max: 0.35 }),  // rate in CHF/kWh
    (power, time, rate) => {
      const energy = (power * time) / 1000;  // kWh
      const cost1 = energy * rate;
      const cost2 = energy * (rate * 1.1);   // 10% higher rate
      return cost2 > cost1;  // Higher rate should mean higher cost
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 5: Quest Pool Consistency**
```typescript
// Feature: sp2-03-electric-power, Property 11: Quest pool size consistency
fc.assert(
  fc.property(
    fc.constantFrom("BASIC", "CORE", "ADVANCED", "ELITE"),
    fc.constantFrom("POWER_BASICS", "ENERGY_CONSUMPTION", "EFFICIENCY"),
    (difficulty, stage) => {
      const pool = buildStagePool(mockTranslations, difficulty, stage);
      return pool.length === 5;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 6: Answer Verification Symmetry**
```typescript
// Feature: sp2-03-electric-power, Property 12: Answer verification tolerance
fc.assert(
  fc.property(
    fc.float({ min: 0, max: 10000 }),    // expected answer
    fc.float({ min: -0.01, max: 0.01 }), // tolerance delta
    (expected, delta) => {
      const userAnswer = expected + delta;
      const isCorrect = Math.abs(userAnswer - expected) <= 0.01;
      return isCorrect === true;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 7: Translation Key Existence**
```typescript
// Feature: sp2-03-electric-power, Property 13: Translation completeness
fc.assert(
  fc.property(
    fc.constantFrom("EN", "CN", "DE"),
    fc.constantFrom("title", "check", "next", "correct", "incorrect"),
    (language, key) => {
      const translations = getTranslations(language);
      return translations.sp2_03[key] !== undefined;
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
1. Load Power Basics quest → Verify visualization shows voltage, current, power
2. Load Energy Consumption quest → Verify visualization shows power, time, energy, cost
3. Load Efficiency quest → Verify visualization shows input, output, efficiency, loss
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
- [ ] Input fields accept numeric input
- [ ] Verify button triggers validation
- [ ] Next button advances to next quest
- [ ] Visualizations render and animate
- [ ] Language switching works
- [ ] LaTeX formulas render correctly
- [ ] Responsive layout works on mobile/tablet
- [ ] No console errors or warnings

