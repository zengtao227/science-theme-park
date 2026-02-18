# Design Document: GP3.02 - Electromagnetism Basics

## Overview

The GP3.02 module is an interactive educational web application that teaches Gymnasium students (16-18 years old) about fundamental electromagnetic concepts through a mixed-mode interface combining practice problems with real-time visualizations. The module follows the Chamber Module Standards with a two-column layout: quest exercises on the left and dynamic electromagnetic field visualizations on the right.

The module consists of three stages (Electric Fields, Magnetic Fields, Particle Motion), each with four difficulty levels (BASIC, CORE, ADVANCED, ELITE), providing 60 total quests (3 stages × 4 difficulties × 5 quests). All content is available in three languages (EN/CN/DE) with Basel-specific scenarios connecting abstract physics to real-world applications.

## Architecture

### Component Hierarchy

```
GP302Electromagnetism (Page Component)
├── ChamberLayout (Layout Container)
│   ├── Header (Title, Language Selector)
│   ├── DifficultySelector (BASIC/CORE/ADVANCED/ELITE)
│   ├── StageSelector (ELECTRIC_FIELDS/MAGNETIC_FIELDS/PARTICLE_MOTION)
│   ├── Left Panel (Quest Content)
│   │   ├── ScenarioDescription
│   │   ├── QuestDisplay
│   │   │   ├── PromptText
│   │   │   ├── FormulaDisplay (LaTeX)
│   │   │   └── InputField(s)
│   │   └── FeedbackDisplay
│   ├── Right Panel (Visualization)
│   │   └── ElectromagnetismVisualization
│   │       ├── ElectricFieldView
│   │       ├── MagneticFieldView
│   │       └── ParticleMotionView
│   └── Footer (Verify/Next Buttons)
└── useQuestManager (State Management Hook)
```

### Data Flow

1. **Initialization**: useQuestManager loads quest pool based on initial difficulty (BASIC) and stage (ELECTRIC_FIELDS)
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

### 1. GP302Electromagnetism (Main Page Component)

**Purpose**: Root component that orchestrates the entire module

**Props**: None (uses URL routing)

**State**:
- `currentFieldStrength: number` - Current field strength for visualization
- `currentParticleVelocity: number` - Current particle velocity for visualization

**Key Methods**:
- `buildStagePool(t, difficulty, stage)` - Generates quest pool for given difficulty and stage
- `handleDifficultyChange(newDifficulty)` - Switches difficulty level
- `handleStageChange(newStage)` - Switches stage

**Responsibilities**:
- Initialize useQuestManager hook
- Build quest pools based on difficulty and stage
- Pass data to ChamberLayout and ElectromagnetismVisualization
- Handle language switching via i18n

### 2. ElectromagnetismVisualization Component

**Purpose**: Displays visual representations of electric fields, magnetic fields, and particle motion

**Props**:
```typescript
interface ElectromagnetismVisualizationProps {
    quest: GP302Quest;
    stage: "ELECTRIC_FIELDS" | "MAGNETIC_FIELDS" | "PARTICLE_MOTION";
    translations: {
        electric_fields: string;
        magnetic_fields: string;
        particle_motion: string;
    };
}
```

**Rendering Logic**:

**Electric Field View**:
- Displays point charges with field lines radiating outward
- Shows field strength vectors at key points
- Uses blue for positive charges, red for negative charges
- Displays field strength magnitude and direction
- Formula: E = kQ/r²

**Magnetic Field View**:
- Displays current-carrying wires with circular field lines
- Shows field direction using right-hand rule indicators
- Uses green for magnetic field lines
- Displays field strength at specific distances
- Formula: B = μ₀I/(2πr) for straight wire, B = μ₀I/(2R) for circular loop

**Particle Motion View**:
- Displays charged particle trajectory in electromagnetic fields
- Shows velocity vectors (yellow), force vectors (orange)
- Animates particle motion along calculated path
- Displays circular motion in magnetic fields
- Shows straight-line motion in electric fields
- Formula: F = qE (electric), F = qvB (magnetic), r = mv/(qB) (circular motion)

### 3. Quest Data Structure

```typescript
interface GP302Quest extends Quest {
    id: string;                    // Unique identifier (e.g., "ELECTRIC_FIELDS_BASIC_1")
    difficulty: Difficulty;        // BASIC | CORE | ADVANCED | ELITE
    stage: Stage;                  // ELECTRIC_FIELDS | MAGNETIC_FIELDS | PARTICLE_MOTION
    charge?: number;               // Charge in Coulombs (C)
    distance?: number;             // Distance in meters (m)
    current?: number;              // Current in Amperes (A)
    fieldStrength?: number;        // Electric field in N/C or magnetic field in T
    velocity?: number;             // Particle velocity in m/s
    mass?: number;                 // Particle mass in kg
    radius?: number;               // Radius for circular motion in m
    angle?: number;                // Angle for vector decomposition in degrees
    promptLatex: string;           // Question text
    expressionLatex: string;       // Formula in LaTeX
    targetLatex: string;           // Target variable
    slots: Array<{                 // Input fields
        id: string;
        labelLatex: string;
        placeholder: string;
        expected: string | number;
        unit: string;
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
): GP302Quest[]
```

**Logic**:
1. Select data array based on difficulty (BASIC/CORE/ADVANCED/ELITE)
2. Select data subset based on stage (ELECTRIC_FIELDS/MAGNETIC_FIELDS/PARTICLE_MOTION)
3. Map each data item to a Quest object
4. Calculate expected answers based on formulas
5. Return array of 5 quests

**Data Organization**:
- Each stage has 4 difficulty levels
- Each difficulty level has 5 quests
- Total: 3 stages × 4 difficulties × 5 quests = 60 quests

## Data Models

### Electric Fields Data

**BASIC**: Single point charge, simple field calculations
```typescript
{ charge: 1e-6, distance: 0.1, answer: "899000" }  // E = kQ/r²
{ charge: 2e-6, distance: 0.2, answer: "449500" }
```

**CORE**: Multiple charges, field superposition
```typescript
{ charge1: 1e-6, charge2: -1e-6, distance1: 0.1, distance2: 0.15, answer: "..." }
{ charge: 5e-6, distance: 0.3, force: "...", testCharge: 1e-9 }  // F = qE
```

**ADVANCED**: Non-uniform fields, vector decomposition
```typescript
{ charge: 3e-6, x: 0.2, y: 0.15, answer: "..." }  // E at point (x,y)
{ charge1: 2e-6, charge2: -3e-6, angle: 45, answer: "..." }  // Vector addition
```

**ELITE**: Real-world applications (electrostatic precipitator, capacitors)
```typescript
{ device: "precipitator", voltage: 50000, distance: 0.05, answer: "1000000" }  // E = V/d
{ device: "capacitor", charge: 1e-4, area: 0.01, distance: 0.001, answer: "..." }
```

### Magnetic Fields Data

**BASIC**: Straight wire, simple field calculations
```typescript
{ current: 10, distance: 0.05, answer: "4e-5" }  // B = μ₀I/(2πr)
{ current: 5, distance: 0.1, answer: "1e-5" }
```

**CORE**: Circular loops, solenoids
```typescript
{ current: 8, radius: 0.1, answer: "5.03e-5" }  // B = μ₀I/(2R) at center
{ current: 10, turns: 100, length: 0.5, answer: "2.51e-3" }  // B = μ₀nI for solenoid
```

**ADVANCED**: Force on current-carrying wires
```typescript
{ current: 15, length: 0.5, field: 0.2, angle: 90, answer: "1.5" }  // F = BILsinθ
{ current1: 10, current2: 10, distance: 0.1, length: 1, answer: "2e-4" }  // Force between wires
```

**ELITE**: Real-world applications (maglev trains, MRI machines)
```typescript
{ device: "maglev", current: 1000, distance: 0.1, answer: "..." }
{ device: "MRI", field: 1.5, frequency: "...", answer: "..." }  // Larmor frequency
```

### Particle Motion Data

**BASIC**: Particle in uniform electric field
```typescript
{ charge: 1.6e-19, mass: 9.11e-31, field: 1000, answer: "1.76e14" }  // a = qE/m
{ charge: 1.6e-19, field: 500, velocity: 1e6, answer: "..." }  // Kinetic energy change
```

**CORE**: Particle in uniform magnetic field (circular motion)
```typescript
{ charge: 1.6e-19, mass: 9.11e-31, velocity: 1e7, field: 0.01, answer: "5.69e-3" }  // r = mv/(qB)
{ charge: 1.6e-19, mass: 1.67e-27, velocity: 1e6, field: 0.1, answer: "..." }  // Proton radius
```

**ADVANCED**: Crossed fields, velocity selector
```typescript
{ electricField: 1000, magneticField: 0.01, answer: "1e5" }  // v = E/B
{ charge: 1.6e-19, mass: 9.11e-31, eField: 500, bField: 0.005, answer: "..." }  // Trajectory
```

**ELITE**: Real-world applications (mass spectrometer, cyclotron)
```typescript
{ device: "mass_spectrometer", charge: 1.6e-19, field: 0.5, radius: 0.1, answer: "..." }  // m = qBr/v
{ device: "cyclotron", charge: 1.6e-19, mass: 1.67e-27, field: 1.5, answer: "..." }  // f = qB/(2πm)
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Electric Field Calculation Correctness

*For any* point charge Q and distance r, the calculated electric field strength E should equal kQ/r² (where k = 8.99 × 10⁹ N·m²/C²) within a tolerance of ±0.01 or ±1% for very small values.

**Validates: Requirements 1.2, 13.1**

### Property 2: Electric Force Calculation Correctness

*For any* test charge q and electric field strength E, the calculated force F should equal qE within a tolerance of ±0.01 or ±1% for very small values.

**Validates: Requirements 1.3**

### Property 3: Magnetic Field from Straight Wire Correctness

*For any* current I and distance r from a straight wire, the calculated magnetic field B should equal μ₀I/(2πr) (where μ₀ = 4π × 10⁻⁷ T·m/A) within a tolerance of ±0.01 or ±1% for very small values.

**Validates: Requirements 2.2, 2.7, 13.2**

### Property 4: Magnetic Field from Circular Loop Correctness

*For any* current I and loop radius R, the calculated magnetic field at the center B should equal μ₀I/(2R) within a tolerance of ±0.01 or ±1% for very small values.

**Validates: Requirements 2.3, 2.7, 13.2**

### Property 5: Magnetic Force Calculation Correctness

*For any* magnetic field B, current I, length L, and angle θ, the calculated force per unit length should equal BIsinθ within a tolerance of ±0.01 or ±1% for very small values.

**Validates: Requirements 2.4**

### Property 6: Particle Acceleration in Electric Field Correctness

*For any* charged particle with charge q, mass m, and electric field E, the calculated acceleration a should equal qE/m within a tolerance of ±0.01 or ±1% for very small values.

**Validates: Requirements 3.2**

### Property 7: Circular Motion Radius in Magnetic Field Correctness

*For any* charged particle with mass m, velocity v, charge q, and magnetic field B, the calculated circular motion radius r should equal mv/(qB) within a tolerance of ±0.01 or ±1% for very small values.

**Validates: Requirements 3.3**

### Property 8: Velocity Selector Condition Correctness

*For any* crossed electric field E and magnetic field B, the calculated velocity for straight-line motion v should equal E/B within a tolerance of ±0.01 or ±1% for very small values.

**Validates: Requirements 3.4**

### Property 9: Quest Pool Size Consistency

*For any* combination of difficulty (BASIC, CORE, ADVANCED, ELITE) and stage (ELECTRIC_FIELDS, MAGNETIC_FIELDS, PARTICLE_MOTION), the generated quest pool should contain exactly 5 quests.

**Validates: Requirements 1.5, 2.5, 3.5, 9.2**

### Property 10: Answer Verification Tolerance

*For any* user input that differs from the expected answer by less than or equal to 0.01 (or 1% for values less than 1), the verification should return success (ok: true).

**Validates: Requirements 1.7, 8.2**

### Property 11: Physical Constants Accuracy

*For any* calculation involving physical constants, the system should use k = 8.99 × 10⁹ N·m²/C², μ₀ = 4π × 10⁻⁷ T·m/A, e = 1.60 × 10⁻¹⁹ C, mₑ = 9.11 × 10⁻³¹ kg, and mₚ = 1.67 × 10⁻²⁷ kg with appropriate precision.

**Validates: Requirements 13.1, 13.2, 13.3, 13.4, 13.5**

### Property 12: Translation Completeness

*For any* UI text element (title, button, instruction, scenario, difficulty level, stage name), translations should exist for all three languages (EN, CN, DE).

**Validates: Requirements 7.1, 7.2, 7.3, 7.4**

### Property 13: LaTeX Formula Rendering

*For any* mathematical formula displayed in the UI, it should be rendered using react-katex with proper LaTeX syntax (double backslashes, \\text{} for units, no Unicode superscripts).

**Validates: Requirements 11.1, 11.4, 11.5**



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
- User enters extremely large or small numbers (e.g., 1e100)
- System: Still verify against expected answer
- If incorrect, display standard error feedback

**Scientific Notation**:
- User enters values in scientific notation (e.g., "1.6e-19")
- System: Parse and accept scientific notation
- Verify against expected answer with tolerance

### Quest Loading Errors

**Missing Quest Data**:
- Quest pool generation fails or returns empty array
- System: Display loading state with message "Loading quests..."
- Log error to console for debugging

**Invalid Quest Structure**:
- Quest object missing required fields (id, difficulty, stage, slots)
- System: Skip invalid quest, load next valid quest
- Log warning to console

**Calculation Errors**:
- Division by zero in formula calculations
- System: Use default safe values or skip quest
- Log error to console

### Visualization Errors

**Missing Quest Properties**:
- Quest lacks charge, distance, or field values
- System: Use default values (charge: 1e-6 C, distance: 0.1 m, field: 1000 N/C)
- Display visualization with defaults

**Animation Failures**:
- Framer Motion animation fails to render
- System: Display static visualization without animation
- Functionality remains intact

**Field Line Rendering**:
- Field line calculation produces invalid coordinates
- System: Skip invalid field lines, render valid ones
- Ensure at least basic visualization displays

### Translation Errors

**Missing Translation Key**:
- Requested translation key doesn't exist in i18n
- System: Display English fallback text
- Log warning to console

**Language Switch Failure**:
- Language change doesn't update UI
- System: Force re-render of components
- Persist language preference in localStorage

### Physical Constants Errors

**Constant Not Found**:
- Required physical constant not defined
- System: Use standard SI values as fallback
- Log warning to console

**Precision Issues**:
- Floating-point arithmetic produces rounding errors
- System: Apply tolerance checking (±0.01 or ±1%)
- Accept answers within tolerance range

## Testing Strategy

### Unit Testing

**Quest Generation Tests**:
- Test `buildStagePool` function for each stage and difficulty
- Verify quest pool contains exactly 5 quests
- Verify quest objects have all required fields
- Verify expected answers are calculated correctly

**Calculation Tests**:
- Test electric field calculation: E = kQ/r²
- Test electric force calculation: F = qE
- Test magnetic field from straight wire: B = μ₀I/(2πr)
- Test magnetic field from circular loop: B = μ₀I/(2R)
- Test magnetic force calculation: F/L = BIsinθ
- Test particle acceleration: a = qE/m
- Test circular motion radius: r = mv/(qB)
- Test velocity selector: v = E/B

**Answer Verification Tests**:
- Test verification with exact match
- Test verification with ±0.01 tolerance
- Test verification with ±1% tolerance for small values
- Test verification with values outside tolerance
- Test verification with invalid input (non-numeric, empty)
- Test verification with scientific notation

**Translation Tests**:
- Test all translation keys exist for EN, CN, DE
- Test language switching updates UI text
- Test LaTeX formulas render correctly in all languages
- Test scenario descriptions are 150-250 words

**Physical Constants Tests**:
- Test k = 8.99 × 10⁹ N·m²/C² is used correctly
- Test μ₀ = 4π × 10⁻⁷ T·m/A is used correctly
- Test e = 1.60 × 10⁻¹⁹ C is used correctly
- Test mₑ = 9.11 × 10⁻³¹ kg is used correctly
- Test mₚ = 1.67 × 10⁻²⁷ kg is used correctly

### Property-Based Testing

**Configuration**: Use fast-check library for TypeScript, minimum 100 iterations per test

**Property Test 1: Electric Field Calculation**
```typescript
// Feature: gp3-02-electromagnetism-basics, Property 1: Electric field calculation correctness
fc.assert(
  fc.property(
    fc.float({ min: 1e-9, max: 1e-3 }),    // charge in Coulombs
    fc.float({ min: 0.01, max: 10 }),      // distance in meters
    (charge, distance) => {
      const k = 8.99e9;
      const expectedField = k * charge / (distance * distance);
      const calculatedField = calculateElectricField(charge, distance);
      const tolerance = expectedField < 1 ? expectedField * 0.01 : 0.01;
      return Math.abs(calculatedField - expectedField) <= tolerance;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 2: Magnetic Field from Straight Wire**
```typescript
// Feature: gp3-02-electromagnetism-basics, Property 3: Magnetic field from straight wire correctness
fc.assert(
  fc.property(
    fc.float({ min: 0.1, max: 100 }),      // current in Amperes
    fc.float({ min: 0.01, max: 1 }),       // distance in meters
    (current, distance) => {
      const mu0 = 4 * Math.PI * 1e-7;
      const expectedField = (mu0 * current) / (2 * Math.PI * distance);
      const calculatedField = calculateMagneticFieldStraightWire(current, distance);
      const tolerance = expectedField < 1 ? expectedField * 0.01 : 0.01;
      return Math.abs(calculatedField - expectedField) <= tolerance;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 3: Circular Motion Radius**
```typescript
// Feature: gp3-02-electromagnetism-basics, Property 7: Circular motion radius correctness
fc.assert(
  fc.property(
    fc.float({ min: 9.11e-31, max: 1.67e-27 }),  // mass (electron to proton)
    fc.float({ min: 1e5, max: 1e8 }),            // velocity in m/s
    fc.float({ min: 1.6e-19, max: 1.6e-19 }),    // charge (elementary)
    fc.float({ min: 0.001, max: 1 }),            // magnetic field in Tesla
    (mass, velocity, charge, field) => {
      const expectedRadius = (mass * velocity) / (charge * field);
      const calculatedRadius = calculateCircularMotionRadius(mass, velocity, charge, field);
      const tolerance = expectedRadius < 1 ? expectedRadius * 0.01 : 0.01;
      return Math.abs(calculatedRadius - expectedRadius) <= tolerance;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 4: Quest Pool Consistency**
```typescript
// Feature: gp3-02-electromagnetism-basics, Property 9: Quest pool size consistency
fc.assert(
  fc.property(
    fc.constantFrom("BASIC", "CORE", "ADVANCED", "ELITE"),
    fc.constantFrom("ELECTRIC_FIELDS", "MAGNETIC_FIELDS", "PARTICLE_MOTION"),
    (difficulty, stage) => {
      const pool = buildStagePool(mockTranslations, difficulty, stage);
      return pool.length === 5;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 5: Answer Verification Tolerance**
```typescript
// Feature: gp3-02-electromagnetism-basics, Property 10: Answer verification tolerance
fc.assert(
  fc.property(
    fc.float({ min: 0, max: 1e6 }),          // expected answer
    fc.float({ min: -0.01, max: 0.01 }),     // tolerance delta
    (expected, delta) => {
      const userAnswer = expected + delta;
      const tolerance = expected < 1 ? expected * 0.01 : 0.01;
      const isCorrect = Math.abs(userAnswer - expected) <= tolerance;
      return isCorrect === true;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 6: Physical Constants Accuracy**
```typescript
// Feature: gp3-02-electromagnetism-basics, Property 11: Physical constants accuracy
fc.assert(
  fc.property(
    fc.constant(null),
    () => {
      const k = getConstant('k');
      const mu0 = getConstant('mu0');
      const e = getConstant('e');
      const me = getConstant('me');
      const mp = getConstant('mp');
      
      return (
        Math.abs(k - 8.99e9) < 1e6 &&
        Math.abs(mu0 - 4 * Math.PI * 1e-7) < 1e-10 &&
        Math.abs(e - 1.60e-19) < 1e-22 &&
        Math.abs(me - 9.11e-31) < 1e-34 &&
        Math.abs(mp - 1.67e-27) < 1e-30
      );
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 7: Translation Completeness**
```typescript
// Feature: gp3-02-electromagnetism-basics, Property 12: Translation completeness
fc.assert(
  fc.property(
    fc.constantFrom("EN", "CN", "DE"),
    fc.constantFrom("title", "check", "next", "correct", "incorrect", "electric_fields", "magnetic_fields", "particle_motion"),
    (language, key) => {
      const translations = getTranslations(language);
      return translations.gp3_02[key] !== undefined;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 8: LaTeX Formula Rendering**
```typescript
// Feature: gp3-02-electromagnetism-basics, Property 13: LaTeX formula rendering
fc.assert(
  fc.property(
    fc.constantFrom(
      "E = \\frac{kQ}{r^2}",
      "B = \\frac{\\mu_0 I}{2\\pi r}",
      "F = qE",
      "r = \\frac{mv}{qB}",
      "v = \\frac{E}{B}"
    ),
    (formula) => {
      // Test that formula uses double backslashes
      const hasDoubleBackslash = formula.includes('\\');
      // Test that units use \text{} if present
      const unitsCorrect = !formula.includes('N/C²') || formula.includes('\\text{');
      // Test no Unicode superscripts
      const noUnicode = !formula.includes('²') && !formula.includes('³');
      
      return hasDoubleBackslash && unitsCorrect && noUnicode;
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
1. Load Electric Fields quest → Verify visualization shows charges and field lines
2. Load Magnetic Fields quest → Verify visualization shows current and circular field lines
3. Load Particle Motion quest → Verify visualization shows particle trajectory with vectors
4. Change quest → Verify visualization updates in real-time

**Language Switching**:
1. Load module in English → Verify all text is English
2. Switch to Chinese → Verify all text updates to Chinese (including 电场强度, 磁感应强度)
3. Switch to German → Verify all text updates to German (including Elektrisches Feld, Magnetfeld)
4. Verify LaTeX formulas remain consistent across languages

**Physical Calculations**:
1. Test electric field calculation with known values
2. Test magnetic field calculation with known values
3. Test particle motion calculation with known values
4. Verify all calculations use correct physical constants

### Browser Testing

**Supported Browsers**:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

**Test Checklist**:
- [ ] Module loads without errors
- [ ] All quests display correctly
- [ ] Input fields accept numeric input and scientific notation
- [ ] Verify button triggers validation
- [ ] Next button advances to next quest
- [ ] Visualizations render and animate (field lines, particle trajectories)
- [ ] Language switching works (EN/CN/DE)
- [ ] LaTeX formulas render correctly (E = kQ/r², B = μ₀I/(2πr), etc.)
- [ ] Responsive layout works on mobile/tablet
- [ ] No console errors or warnings
- [ ] Physical constants are used correctly in all calculations
- [ ] Basel-specific scenarios display correctly
