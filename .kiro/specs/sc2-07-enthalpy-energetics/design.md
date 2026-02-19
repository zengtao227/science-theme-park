# Design Document: SC2.07 - Enthalpy & Energetics

## Overview

The SC2.07 module is an interactive educational web application that teaches Sekundarstufe II students about thermochemistry, including enthalpy changes, Hess's Law, bond energy calculations, standard enthalpy of formation, and calorimetry. The module follows the Chamber Module Standards with a two-column layout: quest exercises on the left and dynamic visualizations on the right.

The module consists of three stages (Energy Changes, Hess's Law, Calorimetry), each with four difficulty levels (BASIC, CORE, ADVANCED, ELITE), providing 60 total quests. All content is available in three languages (EN/CN/DE) with Basel-specific scenarios featuring pharmaceutical synthesis at Novartis and Roche.

Key features:
- Interactive energy diagram visualization with enthalpy levels
- Hess's Law cycle builder for pathway exploration
- Calorimeter simulator with temperature measurements
- Bond breaking/forming animations with energy values
- LaTeX rendering for thermochemical equations using react-katex
- Basel pharmaceutical industry energy management scenarios

## Architecture

### Component Hierarchy

```
SC207EnthalpyEnergetics (Page Component)
├── ChamberLayout (Layout Container)
│   ├── Header (Title, Language Selector)
│   ├── DifficultySelector (BASIC/CORE/ADVANCED/ELITE)
│   ├── StageSelector (ENERGY_CHANGES/HESS_LAW/CALORIMETRY)
│   ├── Left Panel (Quest Content)
│   │   ├── ScenarioDescription
│   │   ├── QuestDisplay
│   │   │   ├── PromptText
│   │   │   ├── ThermochemicalEquationDisplay (react-katex)
│   │   │   ├── HessCycleBuilder (for Hess's Law stage)
│   │   │   │   ├── EquationSelector
│   │   │   │   ├── CycleDisplay
│   │   │   │   └── PathwayCalculator
│   │   │   ├── BondEnergyTable (reference)
│   │   │   ├── FormationEnthalpyTable (reference)
│   │   │   └── InputField(s)
│   │   └── FeedbackDisplay
│   ├── Right Panel (Visualization)
│   │   └── ThermochemistryVisualization
│   │       ├── EnergyDiagramView
│   │       │   ├── EnthalpyLevels
│   │       │   ├── ActivationEnergy
│   │       │   └── ReactionPathway
│   │       ├── HessCycleView
│   │       │   ├── CycleDiagram
│   │       │   ├── PathwayArrows
│   │       │   └── EnthalpyLabels
│   │       ├── BondEnergyView
│   │       │   ├── MolecularStructure
│   │       │   ├── BondBreakingAnimation
│   │       │   └── BondFormingAnimation
│   │       └── CalorimeterView
│   │           ├── CalorimeterApparatus
│   │           ├── ThermometerDisplay
│   │           └── HeatFlowAnimation
│   └── Footer (Verify/Next/Reset Buttons)
└── useQuestManager (State Management Hook)
```

### Data Flow

1. **Initialization**: useQuestManager loads quest pool based on initial difficulty (BASIC) and stage (ENERGY_CHANGES)
2. **Quest Selection**: System selects first quest from pool and displays it
3. **User Interaction**:
   - For energy changes: User calculates ΔH → System verifies calculation
   - For Hess's Law: User combines equations → System verifies pathway and total ΔH
   - For calorimetry: User calculates q = mcΔT → System verifies heat calculation
4. **Verification**: User clicks "Verify" → System validates answer (±1 kJ tolerance) → Displays feedback
5. **Navigation**: User clicks "Next" → System loads next quest → Updates visualization
6. **Stage/Difficulty Change**: User changes stage or difficulty → System rebuilds quest pool → Resets to first quest

### State Management

The module uses the `useQuestManager` hook which manages:
- Current difficulty level
- Current stage
- Quest pool (array of 5 quests per stage/difficulty)
- Current quest index
- User inputs (ΔH values, equation selections, calorimetry calculations)
- Selected equations for Hess's Law cycles
- Last verification result
- Quest completion status
- Stage completion tracking
- Reference table visibility (bond energies, formation enthalpies)

## Components and Interfaces

### 1. SC207EnthalpyEnergetics (Main Page Component)

**Purpose**: Root component that orchestrates the entire module

**Props**: None (uses URL routing)

**State**:
- `currentReaction: ThermochemicalReaction` - Current reaction for visualization
- `energyLevels: EnergyLevel[]` - Reactant and product energy levels
- `selectedPathway: HessPathway | null` - Selected Hess's Law pathway
- `calorimeterData: CalorimeterData | null` - Current calorimetry data

**Key Methods**:
- `buildStagePool(t, difficulty, stage)` - Generates quest pool for given difficulty and stage
- `handleDifficultyChange(newDifficulty)` - Switches difficulty level
- `handleStageChange(newStage)` - Switches stage
- `calculateEnthalpyChange(reactants, products)` - Calculates ΔH from enthalpies
- `calculateBondEnergy(bondsBroken, bondsFormed)` - Calculates ΔH from bond energies
- `calculateHeat(mass, specificHeat, tempChange)` - Calculates q = mcΔT
- `verifyHessPathway(equations, target)` - Verifies Hess's Law pathway is valid

**Responsibilities**:
- Initialize useQuestManager hook
- Build quest pools based on difficulty and stage
- Pass data to ChamberLayout and ThermochemistryVisualization
- Handle language switching via i18n
- Manage enthalpy calculation logic
- Manage Hess's Law pathway verification
- Manage calorimetry calculations

### 2. ThermochemistryVisualization Component

**Purpose**: Displays visual representations of energy diagrams, Hess cycles, bond energies, and calorimetry

**Props**:
```typescript
interface ThermochemistryVisualizationProps {
    quest: SC207Quest;
    stage: "ENERGY_CHANGES" | "HESS_LAW" | "CALORIMETRY";
    reaction: ThermochemicalReaction;
    energyLevels?: EnergyLevel[];
    selectedPathway?: HessPathway;
    calorimeterData?: CalorimeterData;
    translations: TranslationType;
}
```

**Rendering Logic**:

**Energy Diagram View**:
- Displays horizontal lines for reactant and product energy levels
- Shows vertical arrow for ΔH (downward for exothermic, upward for endothermic)
- Color codes: red for exothermic, blue for endothermic
- Displays activation energy curve (Ea)
- Shows numerical ΔH value with units (kJ or kJ/mol)
- Includes hover tooltips for energy values

**Hess Cycle View**:
- Displays enthalpy cycle diagram with multiple pathways
- Shows all reaction arrows with ΔH labels
- Highlights selected pathway when user clicks
- Uses consistent arrow notation: down for exothermic, up for endothermic
- Displays direct and indirect pathways side by side
- Shows calculation: ΔH(total) = ΔH₁ + ΔH₂ + ΔH₃

**Bond Energy View**:
- Displays molecular structures with visible bonds
- Animates bonds breaking (red flash, energy absorbed)
- Animates bonds forming (green flash, energy released)
- Shows bond energy values next to each bond
- Displays calculation: ΔH = Σ(bonds broken) - Σ(bonds formed)
- Uses standard bond notation: single (—), double (=), triple (≡)

**Calorimeter View**:
- Displays calorimeter apparatus with solution
- Shows thermometer with temperature scale
- Animates temperature change (rising or falling)
- Displays heat flow arrows (red for exothermic, blue for endothermic)
- Shows mass, specific heat, and ΔT values
- Displays calculation: q = mcΔT

### 3. HessCycleBuilder Component

**Purpose**: Interactive tool for building and verifying Hess's Law cycles

**Props**:
```typescript
interface HessCycleBuilderProps {
    availableEquations: ThermochemicalEquation[];
    targetEquation: ThermochemicalEquation;
    onPathwayChange: (pathway: HessPathway) => void;
    selectedEquations: ThermochemicalEquation[];
    translations: TranslationType;
}
```

**Features**:
- List of available equations with ΔH values
- Drag-and-drop or click to select equations
- Reverse button to flip equation and ΔH sign
- Multiply button to scale equation and ΔH
- Visual cycle diagram updates as equations are selected
- Verification that combined equations equal target
- Calculation of total ΔH from pathway
- Hint generation for incorrect pathways

**State**:
- `selectedEquations: ThermochemicalEquation[]` - Currently selected equations
- `totalDeltaH: number` - Sum of all ΔH values in pathway
- `isValid: boolean` - Whether pathway equals target equation

### 4. EnergyDiagram Component

**Purpose**: Displays interactive energy level diagrams for reactions

**Props**:
```typescript
interface EnergyDiagramProps {
    reaction: ThermochemicalReaction;
    deltaH: number;
    showActivationEnergy: boolean;
    onLevelHover: (level: EnergyLevel) => void;
    translations: TranslationType;
}
```

**Features**:
- Horizontal lines for reactant and product energy levels
- Vertical arrow showing ΔH magnitude and direction
- Activation energy curve (optional, for ADVANCED/ELITE)
- Color coding based on exothermic/endothermic
- Hover tooltips showing numerical values
- Comparison mode for multiple reactions
- Animated transitions when quest changes

### 5. CalorimeterSimulator Component

**Purpose**: Interactive calorimeter for heat measurement visualization

**Props**:
```typescript
interface CalorimeterSimulatorProps {
    mass: number;
    specificHeat: number;
    initialTemp: number;
    finalTemp: number;
    onCalculate: (heat: number) => void;
    translations: TranslationType;
}
```

**Features**:
- Visual calorimeter with solution
- Animated thermometer showing temperature change
- Heat flow arrows (direction based on exo/endo)
- Input fields for mass, c, ΔT (for interactive mode)
- Real-time calculation display
- Reset button to clear inputs
- Comparison with theoretical values

### 6. Quest Data Structure

```typescript
interface SC207Quest extends Quest {
    id: string;                           // e.g., "ENERGY_CHANGES_BASIC_1"
    difficulty: Difficulty;               // BASIC | CORE | ADVANCED | ELITE
    stage: Stage;                         // ENERGY_CHANGES | HESS_LAW | CALORIMETRY
    reaction: ThermochemicalReaction;     // Full reaction with state symbols
    deltaH?: number;                      // Enthalpy change in kJ or kJ/mol
    bondEnergies?: BondEnergyData;        // For bond energy calculations
    formationEnthalpies?: FormationData;  // For ΔH°f calculations
    calorimetryData?: CalorimeterData;    // For calorimetry calculations
    hessData?: HessLawData;               // For Hess's Law problems
    promptLatex: string;                  // Question text
    equationLatex: string;                // Equation in LaTeX format
    slots?: Array<{                       // Input fields
        id: string;
        labelLatex: string;
        placeholder: string;
        expected: number;
        unit: string;
    }>;
    baselContext?: string;                // Basel-specific scenario text
    reactionType: "exothermic" | "endothermic";
}

interface ThermochemicalReaction {
    reactants: Compound[];
    products: Compound[];
    coefficients: number[];
    deltaH: number;                       // kJ or kJ/mol
    stateSymbols: string[];               // (s), (l), (g), (aq)
}

interface Compound {
    formula: string;                      // e.g., "H2O"
    formulaLatex: string;                 // e.g., "\\text{H}_2\\text{O}"
    name: string;                         // e.g., "water"
    state: "s" | "l" | "g" | "aq";       // State symbol
    enthalpy?: number;                    // H value in kJ/mol
    formationEnthalpy?: number;           // ΔH°f in kJ/mol
    bonds?: Bond[];                       // For bond energy calculations
}

interface Bond {
    type: string;                         // e.g., "C-H", "C=O", "O-H"
    count: number;                        // Number of this bond type
    energy: number;                       // Bond energy in kJ/mol
}

interface BondEnergyData {
    bondsBroken: Bond[];                  // Bonds in reactants
    bondsFormed: Bond[];                  // Bonds in products
    totalBroken: number;                  // Sum of energies for bonds broken
    totalFormed: number;                  // Sum of energies for bonds formed
    deltaH: number;                       // totalBroken - totalFormed
}

interface FormationData {
    reactants: Array<{
        compound: Compound;
        coefficient: number;
        deltaHf: number;                  // ΔH°f in kJ/mol
    }>;
    products: Array<{
        compound: Compound;
        coefficient: number;
        deltaHf: number;                  // ΔH°f in kJ/mol
    }>;
    deltaH: number;                       // Σ(products) - Σ(reactants)
}

interface CalorimeterData {
    mass: number;                         // grams
    specificHeat: number;                 // J/g°C
    initialTemp: number;                  // °C
    finalTemp: number;                    // °C
    tempChange: number;                   // ΔT = final - initial
    heat: number;                         // q = mcΔT in J
    moles?: number;                       // For ΔH per mole calculation
    deltaH?: number;                      // q/moles in kJ/mol
}

interface HessLawData {
    targetEquation: ThermochemicalEquation;
    availableEquations: ThermochemicalEquation[];
    correctPathway: ThermochemicalEquation[];
    totalDeltaH: number;
}

interface ThermochemicalEquation {
    id: string;
    equation: string;                     // e.g., "C(s) + O2(g) → CO2(g)"
    equationLatex: string;
    deltaH: number;                       // kJ or kJ/mol
    reversed: boolean;                    // If equation has been reversed
    multiplier: number;                   // Coefficient multiplier
}

interface EnergyLevel {
    label: string;                        // "Reactants" or "Products"
    enthalpy: number;                     // Relative enthalpy value
    compounds: Compound[];
}

interface HessPathway {
    equations: ThermochemicalEquation[];
    totalDeltaH: number;
    isValid: boolean;
}
```

### 7. Quest Pool Generation

**buildStagePool Function**:

```typescript
function buildStagePool(
    t: TranslationType,
    difficulty: Difficulty,
    stage: Stage
): SC207Quest[]
```

**Logic**:
1. Select data array based on stage (ENERGY_CHANGES/HESS_LAW/CALORIMETRY)
2. Filter by difficulty level
3. Map each data item to a Quest object
4. Generate LaTeX strings for thermochemical equations
5. Calculate correct answers (ΔH, q, etc.)
6. Add Basel-specific context
7. Return array of 5 quests

**Data Organization**:
- Each stage has 4 difficulty levels
- Each difficulty level has 5 quests
- Total: 3 stages × 4 difficulties × 5 quests = 60 quests

## Data Models

### Energy Changes Stage Data

**BASIC**: Simple enthalpy calculations with given values
```typescript
{
  reaction: "H2(g) + 1/2 O2(g) → H2O(l)",
  deltaH: -286,
  reactionType: "exothermic",
  baselContext: "Hydrogen fuel cell research at Basel University Chemistry Department"
}
{
  reaction: "N2(g) + O2(g) → 2NO(g)",
  deltaH: +180,
  reactionType: "endothermic",
  baselContext: "Nitrogen oxide formation in Basel industrial processes"
}
```

**CORE**: Identifying exothermic/endothermic from energy diagrams
```typescript
{
  reaction: "CH4(g) + 2O2(g) → CO2(g) + 2H2O(l)",
  deltaH: -890,
  reactionType: "exothermic",
  baselContext: "Natural gas combustion analysis at Basel heating facility"
}
{
  reaction: "CaCO3(s) → CaO(s) + CO2(g)",
  deltaH: +178,
  reactionType: "endothermic",
  baselContext: "Limestone decomposition in Basel cement production"
}
```

**ADVANCED**: Calculations with activation energy
```typescript
{
  reaction: "2H2O2(l) → 2H2O(l) + O2(g)",
  deltaH: -196,
  activationEnergy: 75,
  reactionType: "exothermic",
  baselContext: "Hydrogen peroxide decomposition in Roche pharmaceutical sterilization"
}
```

**ELITE**: Pharmaceutical synthesis energetics
```typescript
{
  reaction: "C7H6O3 + C4H6O3 → C9H8O4 + H2O + CO2",
  deltaH: -180,
  reactionType: "exothermic",
  baselContext: "Aspirin synthesis at Novartis Basel - energy management for large-scale production"
}
```

### Hess's Law Stage Data

**BASIC**: Two-step pathways
```typescript
{
  targetEquation: "C(s) + O2(g) → CO2(g)",
  availableEquations: [
    { equation: "C(s) + 1/2 O2(g) → CO(g)", deltaH: -111 },
    { equation: "CO(g) + 1/2 O2(g) → CO2(g)", deltaH: -283 }
  ],
  correctDeltaH: -394,
  baselContext: "Carbon combustion pathways studied at Basel Chemistry Institute"
}
```

**CORE**: Three-step pathways with equation reversal
```typescript
{
  targetEquation: "CH4(g) + 2O2(g) → CO2(g) + 2H2O(l)",
  availableEquations: [
    { equation: "C(s) + 2H2(g) → CH4(g)", deltaH: -75 },
    { equation: "C(s) + O2(g) → CO2(g)", deltaH: -394 },
    { equation: "H2(g) + 1/2 O2(g) → H2O(l)", deltaH: -286 }
  ],
  correctDeltaH: -890,
  baselContext: "Methane combustion analysis for Basel natural gas infrastructure"
}
```

**ADVANCED**: Formation enthalpy calculations
```typescript
{
  targetEquation: "C2H5OH(l) + 3O2(g) → 2CO2(g) + 3H2O(l)",
  formationData: {
    reactants: [
      { compound: "C2H5OH(l)", deltaHf: -278 },
      { compound: "O2(g)", deltaHf: 0 }
    ],
    products: [
      { compound: "CO2(g)", deltaHf: -394 },
      { compound: "H2O(l)", deltaHf: -286 }
    ]
  },
  correctDeltaH: -1368,
  baselContext: "Ethanol combustion for pharmaceutical solvent recovery at Roche"
}
```

**ELITE**: Multi-step pharmaceutical synthesis
```typescript
{
  targetEquation: "Complex pharmaceutical synthesis pathway",
  multiStepPathway: [
    { step: 1, deltaH: -120 },
    { step: 2, deltaH: +85 },
    { step: 3, deltaH: -200 }
  ],
  correctDeltaH: -235,
  baselContext: "Multi-step drug synthesis optimization at Novartis Basel"
}
```

### Calorimetry Stage Data

**BASIC**: Simple q = mcΔT calculations
```typescript
{
  mass: 100,
  specificHeat: 4.18,
  initialTemp: 20,
  finalTemp: 25,
  heat: 2090,
  baselContext: "Calorimetry experiment at Basel Gymnasium chemistry lab"
}
{
  mass: 50,
  specificHeat: 4.18,
  initialTemp: 25,
  finalTemp: 20,
  heat: -1045,
  baselContext: "Endothermic dissolution experiment at Basel University"
}
```

**CORE**: Calculating ΔH per mole
```typescript
{
  mass: 200,
  specificHeat: 4.18,
  initialTemp: 20,
  finalTemp: 35,
  moles: 0.1,
  deltaH: -125.4,
  baselContext: "Neutralization reaction calorimetry at Basel Chemistry Institute"
}
```

**ADVANCED**: Calorimeter heat capacity corrections
```typescript
{
  mass: 150,
  specificHeat: 4.18,
  initialTemp: 22,
  finalTemp: 28,
  calorimeterHeatCapacity: 50,
  totalHeat: 4062,
  baselContext: "Precision calorimetry for pharmaceutical process validation at Roche"
}
```

**ELITE**: Industrial-scale calorimetry
```typescript
{
  mass: 5000,
  specificHeat: 3.5,
  initialTemp: 25,
  finalTemp: 45,
  moles: 10,
  deltaH: -350,
  baselContext: "Industrial reactor calorimetry for drug synthesis at Novartis Basel - process optimization and safety analysis"
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, I identified several areas of redundancy:

1. **Exothermic/Endothermic Classification**: Requirements 1.3, 1.4, 2.2, and 2.3 all specify the same ΔH sign rules - combined into Property 1
2. **Quest Pool Size**: Requirements 1.5, 2.4, 3.5, 4.5, 5.4, 6.5, 10.5, 10.7, and 14.2 all specify quest counts - combined into Property 2
3. **Hess's Law Operations**: Requirements 3.3, 3.4, 19.3, and 19.4 specify equation reversal and multiplication - combined into Properties 3 and 4
4. **LaTeX Rendering**: Requirements 1.7, 15.1, 15.2, 15.3, 15.4 all specify react-katex usage - combined into Property 5
5. **Translation Completeness**: Requirements 12.2, 12.3, 12.4, 12.5, and 12.7 overlap - combined into Property 27
6. **Basel Context**: Requirements 11.1, 11.2, 11.3, 11.6 all specify Basel references - combined into Property 21
7. **ELITE Authenticity**: Requirements 11.7, 22.1, 22.4 specify pharmaceutical authenticity - combined into Property 24

### Property 1: Reaction Type Classification by ΔH Sign

*For any* chemical reaction with calculated ΔH, if ΔH < 0 then the reaction should be classified as exothermic, and if ΔH > 0 then the reaction should be classified as endothermic.

**Validates: Requirements 1.3, 1.4, 2.2, 2.3**

### Property 2: Quest Pool Size Consistency

*For any* combination of difficulty level and stage, the generated quest pool should contain exactly 5 quests, and the total number of quests across all stages (3) and difficulties (4) should equal 60.

**Validates: Requirements 1.5, 2.4, 3.5, 4.5, 5.4, 6.5, 10.5, 10.7, 14.2**

### Property 3: Hess's Law Equation Reversal

*For any* thermochemical equation with enthalpy change ΔH, reversing the equation should negate the enthalpy change to -ΔH.

**Validates: Requirements 3.3, 19.3**

### Property 4: Hess's Law Equation Multiplication

*For any* thermochemical equation with enthalpy change ΔH and positive integer coefficient n, multiplying the equation by n should multiply the enthalpy change to n×ΔH.

**Validates: Requirements 3.4, 19.4**

### Property 5: React-Katex Rendering Consistency

*For any* thermochemical equation or formula displayed in the system, it should be rendered using react-katex (InlineMath for inline, BlockMath for block display) with double backslashes for LaTeX commands.

**Validates: Requirements 1.7, 15.1, 15.2, 15.3, 15.4**

### Property 6: Enthalpy Calculation Correctness

*For any* reaction with reactant enthalpies H(reactants) and product enthalpies H(products), the enthalpy change should be calculated as ΔH = H(products) - H(reactants).

**Validates: Requirements 1.2**

### Property 7: Hess's Law Pathway Validity

*For any* set of thermochemical equations that are combined (with appropriate reversals and multiplications), the sum of their ΔH values should equal the ΔH of the target equation if the pathway is valid.

**Validates: Requirements 3.2, 19.5, 19.6**

### Property 8: Answer Verification Tolerance

*For any* calculated ΔH value, user answers within ±1 kJ of the expected value should be accepted as correct.

**Validates: Requirements 3.7, 13.2**

### Property 9: Bond Energy Calculation Correctness

*For any* reaction with bonds broken in reactants and bonds formed in products, the enthalpy change should be calculated as ΔH = Σ(bond energies broken) - Σ(bond energies formed).

**Validates: Requirements 4.2**

### Property 10: Bond Counting Accuracy

*For any* molecule, the count of each bond type (C-H, C=O, O-H, etc.) should match the molecular structure, with all bonds in reactants counted for breaking and all bonds in products counted for forming.

**Validates: Requirements 4.3, 4.4**

### Property 11: Formation Enthalpy Calculation Correctness

*For any* reaction with standard formation enthalpies ΔH°f for all reactants and products, the standard enthalpy change should be calculated as ΔH° = Σ(coefficients × ΔH°f products) - Σ(coefficients × ΔH°f reactants).

**Validates: Requirements 5.2, 5.3**

### Property 12: Standard State Notation Consistency

*For any* standard enthalpy of formation value, it should be annotated with standard state conditions (25°C, 1 atm) and use the notation ΔH°f.

**Validates: Requirements 5.7**

### Property 13: Calorimetry Heat Calculation Correctness

*For any* calorimetry measurement with mass m (grams), specific heat capacity c (J/g°C), and temperature change ΔT (°C), the heat should be calculated as q = mcΔT in joules.

**Validates: Requirements 6.2**

### Property 14: Enthalpy Per Mole Calculation

*For any* heat measurement q (joules) and number of moles n, the molar enthalpy change should be calculated as ΔH = q/(1000n) in kJ/mol.

**Validates: Requirements 6.3**

### Property 15: Calorimeter Heat Capacity Inclusion

*For any* calorimetry calculation where the calorimeter has heat capacity C_cal, the total heat should include both solution heat (mcΔT) and calorimeter heat (C_cal × ΔT).

**Validates: Requirements 6.4**

### Property 16: Specific Heat Capacity Realism

*For any* calorimetry quest, the specific heat capacity values should be realistic: water should be approximately 4.18 J/g°C, and other substances should fall within known ranges for their material type.

**Validates: Requirements 6.7**

### Property 17: State Symbol Notation Consistency

*For any* thermochemical equation, all compounds should include state symbols in parentheses: (s) for solid, (l) for liquid, (g) for gas, (aq) for aqueous.

**Validates: Requirements 7.7, 14.5, 15.5**

### Property 18: Enthalpy Notation Consistency

*For any* enthalpy value displayed, it should use proper notation: ΔH for enthalpy change, ΔH° for standard enthalpy change, ΔH°f for standard enthalpy of formation.

**Validates: Requirements 15.6**

### Property 19: Reaction Arrow Notation

*For any* thermochemical equation in LaTeX format, the reaction arrow should be rendered using \\rightarrow.

**Validates: Requirements 15.7**

### Property 20: Difficulty Progression in Quest Types

*For any* BASIC difficulty quest, it should involve simple enthalpy calculations with given values; for CORE difficulty, bond energy or simple Hess's Law; for ADVANCED difficulty, formation enthalpies or complex Hess cycles; for ELITE difficulty, pharmaceutical synthesis or industrial calorimetry.

**Validates: Requirements 10.1, 10.2, 10.3, 10.4**

### Property 21: Basel Context Inclusion

*For any* quest scenario description, it should reference at least one Basel-specific location (Novartis, Roche, Basel Chemistry Institute, Basel University, Rhine River) or Basel pharmaceutical/industrial context.

**Validates: Requirements 11.1, 11.2, 11.3, 11.6**

### Property 22: Scenario Description Length

*For any* stage scenario description, the word count should be between 150 and 250 words inclusive.

**Validates: Requirements 11.4**

### Property 23: Scenario Content Richness

*For any* scenario description, it should include at least three of the following elements: specific people/roles, specific places, specific situations, numerical values, or real-world significance.

**Validates: Requirements 11.5**

### Property 24: ELITE Pharmaceutical Authenticity

*For any* ELITE difficulty quest involving pharmaceutical reactions, it should reference actual pharmaceutical synthesis processes, real drugs synthesized at Novartis or Roche Basel, and include authentic enthalpy data or industrial calorimetry data.

**Validates: Requirements 11.7, 22.1, 22.4, 22.6**

### Property 25: Multi-Step Synthesis Pathway Display

*For any* ELITE pharmaceutical quest, if it involves multi-step synthesis, it should display all synthesis steps with individual ΔH values.

**Validates: Requirements 22.2**

### Property 26: Multi-Step Enthalpy Summation

*For any* multi-step synthesis pathway with individual step enthalpies ΔH₁, ΔH₂, ..., ΔHₙ, the overall enthalpy change should equal the sum: ΔH_total = ΔH₁ + ΔH₂ + ... + ΔHₙ.

**Validates: Requirements 22.3**

### Property 27: Translation Completeness

*For any* UI text element (title, button, instruction, difficulty level, stage name, thermochemistry term), translations should exist and be non-empty for all three languages (EN, CN, DE), while chemical formulas and numerical values remain unchanged across languages.

**Validates: Requirements 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7**

### Property 28: Answer Verification Correctness

*For any* user answer submission, verification should return success if and only if the numerical answer matches the expected value within ±1 kJ tolerance.

**Validates: Requirements 13.1, 13.2**

### Property 29: Navigation State Management

*For any* quest verification that succeeds, the "Next" button should become enabled; clicking "Next" should advance to the next quest in the current stage and difficulty; users should not be able to advance without successful verification.

**Validates: Requirements 13.4, 13.5, 13.6**

### Property 30: Stage Completion Detection

*For any* stage, when all 5 quests in that stage are completed (verified successfully), the stage should be marked as complete and users should be allowed to change stages or difficulty.

**Validates: Requirements 13.7, 17.6**

### Property 31: Quest Data Structure Completeness

*For any* quest object, it should contain all required fields: id, difficulty, stage, reaction, and at least one of (deltaH, bondEnergies, formationEnthalpies, calorimetryData, hessData) depending on the quest type.

**Validates: Requirements 14.1, 14.6**

### Property 32: Expected Answer Precision

*For any* quest that requires calculation, the expected answer should be stored with appropriate precision (typically to 1 decimal place for kJ values).

**Validates: Requirements 14.3**

### Property 33: Unit Consistency

*For any* quest, enthalpy changes should use kJ or kJ/mol, heat should use J or kJ, temperature should use °C, mass should use grams, and specific heat should use J/g°C.

**Validates: Requirements 14.4**

### Property 34: Responsive Layout Breakpoint

*For any* screen width below 768px, the layout should stack vertically with quest content above visualization; for screen widths at or above 768px, the layout should display two columns side by side.

**Validates: Requirements 16.2**

### Property 35: Accessibility Minimum Sizes

*For any* text element, the font size should be at least 14px; for any interactive element (button, input field), the height should be at least 44px to meet touch target requirements.

**Validates: Requirements 16.3, 16.4**

### Property 36: Visualization Aspect Ratio Preservation

*For any* visualization resize event, the aspect ratio of energy diagrams, molecular structures, and calorimeter displays should remain constant to prevent distortion.

**Validates: Requirements 16.5**

### Property 37: ChamberLayout Component Usage

*For any* module instance, it should use the ChamberLayout component for consistent structure with other chamber modules.

**Validates: Requirements 16.6**

### Property 38: Horizontal Scroll Prevention

*For any* viewport width, all content should fit within the viewport width without requiring horizontal scrolling.

**Validates: Requirements 16.7**

### Property 39: Stage Configuration

*For any* module instance, exactly three stages should be available: Energy Changes, Hess's Law, and Calorimetry.

**Validates: Requirements 17.1**

### Property 40: Stage-Specific Quest Loading

*For any* stage selection, the system should load a quest pool containing only quests belonging to that stage, and changing stages should reset the quest index to 0 (first quest).

**Validates: Requirements 17.2, 17.3**

### Property 41: Stage Progress Independence

*For any* stage change, the progress and completion status of other stages should remain unchanged, allowing users to switch between stages without losing progress.

**Validates: Requirements 17.5**

### Property 42: Stage Completion Persistence

*For any* stage completion status, it should persist across browser sessions using localStorage or similar mechanism.

**Validates: Requirements 17.7**

### Property 43: Activation Energy Relationship

*For any* reaction with forward activation energy Ea(forward) and reverse activation energy Ea(reverse), the enthalpy change should equal ΔH = Ea(forward) - Ea(reverse).

**Validates: Requirements 18.5**

### Property 44: Bond Energy Reference Table Completeness

*For any* bond energy reference table, it should include all common bond types with accurate energies in kJ/mol: C-H (413), C-C (347), C=C (614), C≡C (839), C-O (358), C=O (799), O-H (464), N-H (391), H-H (436), O=O (498), N≡N (945), C≡N (891).

**Validates: Requirements 20.3, 20.4, 20.5**

### Property 45: Formation Enthalpy Reference Table Completeness

*For any* formation enthalpy reference table, it should include common compounds with accurate ΔH°f values in kJ/mol at standard conditions: H₂O(l) (-286), CO₂(g) (-394), CH₄(g) (-75), C₂H₅OH(l) (-278), NH₃(g) (-46), HCl(g) (-92).

**Validates: Requirements 21.3, 21.4**

### Property 46: Elements Standard State Zero Enthalpy

*For any* formation enthalpy reference table, it should note that ΔH°f for elements in their standard states (H₂(g), O₂(g), N₂(g), C(s), etc.) is zero.

**Validates: Requirements 21.5**

