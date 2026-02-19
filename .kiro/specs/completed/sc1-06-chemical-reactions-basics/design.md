# Design Document: SC1.06 - Chemical Reactions Basics

## Overview

The SC1.06 module is an interactive educational web application that teaches students about chemical reactions, including reaction types, equation balancing, and molecular-level understanding. The module follows the Chamber Module Standards with a two-column layout: quest exercises on the left and dynamic visualizations on the right.

The module consists of three stages (Reaction Types, Equation Balancing, Reaction Simulation), each with four difficulty levels (BASIC, CORE, ADVANCED, ELITE), providing 60-65 total quests. All content is available in three languages (EN/CN/DE) with Basel-specific scenarios featuring pharmaceutical contexts from Novartis and Roche.

Key features include:
- Interactive equation balancer with real-time atom count verification
- Reaction type classifier with pattern recognition
- Molecular simulator with animated bond breaking/forming
- LaTeX rendering for chemical equations using react-katex
- Basel pharmaceutical industry scenarios

## Architecture

### Component Hierarchy

```
SC106ChemicalReactions (Page Component)
├── ChamberLayout (Layout Container)
│   ├── Header (Title, Language Selector)
│   ├── DifficultySelector (BASIC/CORE/ADVANCED/ELITE)
│   ├── StageSelector (REACTION_TYPES/EQUATION_BALANCING/REACTION_SIMULATION)
│   ├── Left Panel (Quest Content)
│   │   ├── ScenarioDescription
│   │   ├── QuestDisplay
│   │   │   ├── PromptText
│   │   │   ├── ChemicalEquationDisplay (react-katex)
│   │   │   ├── EquationBalancer (for balancing stage)
│   │   │   │   ├── CoefficientInput[]
│   │   │   │   ├── AtomCountTable
│   │   │   │   └── HintDisplay
│   │   │   ├── ReactionTypeSelector (for classification stage)
│   │   │   └── InputField(s)
│   │   └── FeedbackDisplay
│   ├── Right Panel (Visualization)
│   │   └── ChemistryVisualization
│   │       ├── ReactionTypesView
│   │       ├── EquationBalancerView
│   │       └── ReactionSimulatorView
│   │           ├── MolecularAnimation
│   │           ├── BondVisualization
│   │           └── EnergyDiagram
│   └── Footer (Verify/Next/Reset Buttons)
└── useQuestManager (State Management Hook)
```

### Data Flow

1. **Initialization**: useQuestManager loads quest pool based on initial difficulty (BASIC) and stage (REACTION_TYPES)
2. **Quest Selection**: System selects first quest from pool and displays it
3. **User Interaction**: 
   - For balancing: User enters coefficients → System updates atom counts in real-time
   - For classification: User selects reaction type → System verifies selection
   - For simulation: User controls animation playback
4. **Verification**: User clicks "Verify" → System validates answer → Displays feedback
5. **Navigation**: User clicks "Next" → System loads next quest → Updates visualization
6. **Stage/Difficulty Change**: User changes stage or difficulty → System rebuilds quest pool → Resets to first quest

### State Management

The module uses the `useQuestManager` hook which manages:
- Current difficulty level
- Current stage
- Quest pool (array of 5 quests per stage/difficulty)
- Current quest index
- User inputs (coefficients, selected reaction type)
- Atom counts (for balancing verification)
- Last verification result
- Quest completion status
- Stage completion tracking

## Components and Interfaces

### 1. SC106ChemicalReactions (Main Page Component)

**Purpose**: Root component that orchestrates the entire module

**Props**: None (uses URL routing)

**State**:
- `currentEquation: ChemicalEquation` - Current equation for visualization
- `atomCounts: AtomCountMap` - Current atom counts for balancing visualization

**Key Methods**:
- `buildStagePool(t, difficulty, stage)` - Generates quest pool for given difficulty and stage
- `handleDifficultyChange(newDifficulty)` - Switches difficulty level
- `handleStageChange(newStage)` - Switches stage
- `calculateAtomCounts(equation, coefficients)` - Calculates atom counts for verification
- `classifyReaction(equation)` - Determines reaction type

**Responsibilities**:
- Initialize useQuestManager hook
- Build quest pools based on difficulty and stage
- Pass data to ChamberLayout and ChemistryVisualization
- Handle language switching via i18n
- Manage equation balancing logic
- Manage reaction type classification logic

### 2. ChemistryVisualization Component

**Purpose**: Displays visual representations of chemical reactions, equations, and molecular processes

**Props**:
```typescript
interface ChemistryVisualizationProps {
    quest: SC106Quest;
    stage: "REACTION_TYPES" | "EQUATION_BALANCING" | "REACTION_SIMULATION";
    equation: ChemicalEquation;
    atomCounts?: AtomCountMap;
    translations: {
        reaction_types: string;
        equation_balancing: string;
        reaction_simulation: string;
        // ... other translations
    };
}
```

**Rendering Logic**:

**Reaction Types View**:
- Displays reaction pattern (e.g., A + B → AB for synthesis)
- Shows specific example with molecular structures
- Color-codes reactants (blue) and products (green)
- Displays reaction type name and description
- Shows real-world examples from Basel contexts

**Equation Balancing View**:
- Displays atom count table with elements as rows
- Shows reactant side counts vs product side counts
- Highlights balanced elements in green, unbalanced in red
- Displays coefficient values above each compound
- Shows visual balance scale metaphor

**Reaction Simulation View**:
- Displays animated molecular structures
- Shows bonds breaking (red flash) and forming (green flash)
- Uses standard atom colors (H=white, O=red, C=black, N=blue, Cl=green, etc.)
- Displays energy diagram showing exothermic/endothermic
- Shows reaction progress bar
- Includes play/pause/restart controls

### 3. EquationBalancer Component

**Purpose**: Interactive tool for balancing chemical equations

**Props**:
```typescript
interface EquationBalancerProps {
    equation: ChemicalEquation;
    onCoefficientsChange: (coefficients: number[]) => void;
    atomCounts: AtomCountMap;
    isBalanced: boolean;
    translations: TranslationType;
}
```

**Features**:
- Input fields for each compound's coefficient
- Real-time atom count updates
- Visual feedback (green for balanced, red for unbalanced)
- Hint generation based on unbalanced elements
- Reset button to clear all coefficients
- Validation for positive integers only

**State**:
- `coefficients: number[]` - Current coefficient values
- `showHint: boolean` - Whether to display hint
- `hintText: string` - Generated hint message

### 4. ReactionTypeSelector Component

**Purpose**: Interface for classifying reaction types

**Props**:
```typescript
interface ReactionTypeSelectorProps {
    equation: ChemicalEquation;
    onTypeSelect: (type: ReactionType) => void;
    selectedType?: ReactionType;
    showFeedback: boolean;
    correctType: ReactionType;
    translations: TranslationType;
}
```

**Features**:
- Radio buttons or dropdown for five reaction types
- Pattern display for each type
- Immediate visual feedback on selection
- Explanation text for correct/incorrect selections
- Examples from daily life and industry

### 5. Quest Data Structure

```typescript
interface SC106Quest extends Quest {
    id: string;                           // e.g., "REACTION_TYPES_BASIC_1"
    difficulty: Difficulty;               // BASIC | CORE | ADVANCED | ELITE
    stage: Stage;                         // REACTION_TYPES | EQUATION_BALANCING | REACTION_SIMULATION
    equation: ChemicalEquation;           // Full equation object
    reactants: string[];                  // Array of reactant formulas
    products: string[];                   // Array of product formulas
    coefficients?: number[];              // Correct coefficients for balancing
    reactionType?: ReactionType;          // Expected reaction type
    promptLatex: string;                  // Question text
    equationLatex: string;                // Equation in LaTeX format
    slots?: Array<{                       // Input fields
        id: string;
        labelLatex: string;
        placeholder: string;
        expected: string | number;
    }>;
    mechanism?: ReactionMechanism;        // For ELITE difficulty
    energyChange?: "exothermic" | "endothermic";
    baselContext?: string;                // Basel-specific scenario text
}

interface ChemicalEquation {
    reactants: Compound[];
    products: Compound[];
    coefficients: number[];
    type: ReactionType;
}

interface Compound {
    formula: string;                      // e.g., "H2O"
    formulaLatex: string;                 // e.g., "\\text{H}_2\\text{O}"
    name: string;                         // e.g., "water"
    elements: ElementCount[];             // e.g., [{element: "H", count: 2}, {element: "O", count: 1}]
}

interface ElementCount {
    element: string;                      // Element symbol
    count: number;                        // Number of atoms
}

type ReactionType = 
    | "synthesis"           // A + B → AB
    | "decomposition"       // AB → A + B
    | "single_replacement"  // A + BC → AC + B
    | "double_replacement"  // AB + CD → AD + CB
    | "combustion";         // CxHy + O2 → CO2 + H2O

interface ReactionMechanism {
    steps: MechanismStep[];
    intermediates: Compound[];
    transitionStates: string[];
}

interface MechanismStep {
    description: string;
    electronMovement: string[];           // Curved arrow notation
    before: Compound[];
    after: Compound[];
}

type AtomCountMap = Map<string, { reactants: number; products: number }>;
```

### 6. Quest Pool Generation

**buildStagePool Function**:

```typescript
function buildStagePool(
    t: TranslationType,
    difficulty: Difficulty,
    stage: Stage
): SC106Quest[]
```

**Logic**:
1. Select data array based on stage (REACTION_TYPES/EQUATION_BALANCING/REACTION_SIMULATION)
2. Filter by difficulty level
3. Map each data item to a Quest object
4. Generate LaTeX strings for equations
5. Calculate correct answers (coefficients or reaction types)
6. Add Basel-specific context
7. Return array of 5 quests

**Data Organization**:
- Each stage has 4 difficulty levels
- Each difficulty level has 5 quests
- Total: 3 stages × 4 difficulties × 5 quests = 60 quests
- Additional 5 quests for variety = 65 total

## Data Models

### Reaction Types Stage Data

**BASIC**: Clear examples with simple compounds
```typescript
{
  reactants: ["H2", "O2"],
  products: ["H2O"],
  type: "synthesis",
  baselContext: "Water formation at Basel water treatment plant"
}
{
  reactants: ["H2O"],
  products: ["H2", "O2"],
  type: "decomposition",
  baselContext: "Electrolysis demonstration at Basel Chemistry Lab"
}
```

**CORE**: Requires pattern analysis
```typescript
{
  reactants: ["Zn", "HCl"],
  products: ["ZnCl2", "H2"],
  type: "single_replacement",
  baselContext: "Metal reactivity experiment at Novartis research lab"
}
{
  reactants: ["NaCl", "AgNO3"],
  products: ["NaNO3", "AgCl"],
  type: "double_replacement",
  baselContext: "Precipitation reaction in Basel pharmaceutical quality control"
}
```

**ADVANCED**: Organic compounds
```typescript
{
  reactants: ["CH4", "O2"],
  products: ["CO2", "H2O"],
  type: "combustion",
  baselContext: "Natural gas combustion at Basel heating facility"
}
```

**ELITE**: Complex pharmaceutical reactions
```typescript
{
  reactants: ["C6H5COOH", "CH3OH"],
  products: ["C6H5COOCH3", "H2O"],
  type: "synthesis",
  baselContext: "Ester synthesis for drug formulation at Roche Basel"
}
```

### Equation Balancing Stage Data

**BASIC**: Coefficients 1-3, simple compounds
```typescript
{
  equation: "H2 + O2 → H2O",
  coefficients: [2, 1, 2],
  baselContext: "Hydrogen fuel cell research at Basel University"
}
{
  equation: "N2 + H2 → NH3",
  coefficients: [1, 3, 2],
  baselContext: "Ammonia synthesis for pharmaceutical production"
}
```

**CORE**: Coefficients up to 5, polyatomic ions
```typescript
{
  equation: "Ca(OH)2 + H3PO4 → Ca3(PO4)2 + H2O",
  coefficients: [3, 2, 1, 6],
  baselContext: "Phosphate chemistry at Basel water treatment"
}
```

**ADVANCED**: Coefficients up to 10, organic compounds
```typescript
{
  equation: "C3H8 + O2 → CO2 + H2O",
  coefficients: [1, 5, 3, 4],
  baselContext: "Propane combustion analysis at Basel Chemistry Institute"
}
```

**ELITE**: Complex pharmaceutical synthesis
```typescript
{
  equation: "C7H6O3 + C4H6O3 → C9H8O4 + H2O + CO2",
  coefficients: [2, 1, 1, 1, 1],
  baselContext: "Aspirin synthesis at Novartis pharmaceutical plant"
}
```

### Reaction Simulation Stage Data

**BASIC**: Simple molecular animations
```typescript
{
  equation: "H2 + Cl2 → HCl",
  coefficients: [1, 1, 2],
  energyChange: "exothermic",
  baselContext: "Hydrogen chloride formation demonstration"
}
```

**CORE**: Multiple bond changes
```typescript
{
  equation: "CH4 + O2 → CO2 + H2O",
  coefficients: [1, 2, 1, 2],
  energyChange: "exothermic",
  baselContext: "Methane combustion in Basel laboratory"
}
```

**ADVANCED**: Organic reactions with mechanisms
```typescript
{
  equation: "C2H4 + H2 → C2H6",
  coefficients: [1, 1, 1],
  energyChange: "exothermic",
  mechanism: { /* hydrogenation mechanism */ },
  baselContext: "Hydrogenation process at Roche chemical synthesis"
}
```

**ELITE**: Pharmaceutical synthesis with detailed mechanisms
```typescript
{
  equation: "C6H5NH2 + CH3COCl → C6H5NHCOCH3 + HCl",
  coefficients: [1, 1, 1, 1],
  energyChange: "exothermic",
  mechanism: { /* acetylation mechanism */ },
  baselContext: "Acetylation step in drug synthesis at Novartis Basel"
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, I identified several areas of redundancy:

1. **LaTeX Formatting**: Requirements 1.4, 11.6, and 12.4 all specify four-backslash formatting - combined into Property 1
2. **Atom Count Verification**: Requirements 2.2 and 10.2 both specify atom count matching - combined into Property 2
3. **Reaction Type Verification**: Requirements 3.3 and 10.3 both specify type matching - combined into Property 3
4. **Quest Pool Size**: Requirements 1.5, 2.5, 3.4, 7.5, and 11.2 all specify quest counts - combined into Property 4
5. **Translation Completeness**: Requirements 9.2, 9.4, and 9.7 overlap - combined into Property 5
6. **Difficulty Progression**: Requirements 7.1-7.4 specify compound complexity per difficulty - combined into Property 6

### Property 1: LaTeX Formatting Consistency

*For any* chemical formula or equation displayed in the system, the LaTeX string should use four backslashes for all LaTeX commands (e.g., "\\\\text{}", "\\\\rightarrow") and never contain Unicode chemical symbols.

**Validates: Requirements 1.4, 11.6, 12.4, 12.8**

### Property 2: Atom Count Balance Verification

*For any* chemical equation with given coefficients, the equation is balanced if and only if the count of each element type on the reactant side equals the count on the product side.

**Validates: Requirements 2.2, 10.2**

### Property 3: Reaction Type Classification Correctness

*For any* chemical equation, the classified reaction type should match one of the five supported types (synthesis, decomposition, single replacement, double replacement, combustion) based on the structural pattern of reactants and products.

**Validates: Requirements 3.2, 3.3, 10.3**

### Property 4: Quest Pool Size Consistency

*For any* combination of difficulty level and stage, the generated quest pool should contain exactly 5 quests, and the total number of quests across all stages and difficulties should be between 60 and 65.

**Validates: Requirements 1.5, 2.5, 3.4, 7.5, 7.7, 11.2**

### Property 5: Translation Completeness

*For any* UI text element (title, button, instruction, difficulty level, stage name, reaction type name), translations should exist and be non-empty for all three languages (EN, CN, DE), while chemical formulas and equations remain unchanged across languages.

**Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7**

### Property 6: Difficulty Progression in Compound Complexity

*For any* quest at BASIC difficulty, all compounds should be simple (single elements or binary compounds like H₂O, CO₂, NaCl); for CORE difficulty, compounds should include polyatomic ions; for ADVANCED difficulty, compounds should include organic molecules; for ELITE difficulty, compounds should include pharmaceutical or industrial molecules.

**Validates: Requirements 7.1, 7.2, 7.3, 7.4**

### Property 7: Reactant and Product Position Verification

*For any* chemical equation, all substances identified as reactants should appear on the left side of the reaction arrow, and all substances identified as products should appear on the right side of the reaction arrow.

**Validates: Requirements 1.2, 1.3**

### Property 8: Coefficient Range by Difficulty

*For any* BASIC difficulty balancing quest, all coefficients should be in the range [1, 3]; for CORE difficulty, coefficients should be in the range [1, 5]; for ADVANCED difficulty, coefficients should be in the range [1, 10]; for ELITE difficulty, coefficients may exceed 10.

**Validates: Requirements 2.7, 2.8, 2.9, 2.10**

### Property 9: Coefficient Validation

*For any* user-entered coefficient in the equation balancer, the system should accept only positive integers (values ≥ 1) and reject zero, negative numbers, decimals, and non-numeric input.

**Validates: Requirements 4.8**

### Property 10: Real-Time Atom Count Updates

*For any* coefficient change in the equation balancer, the displayed atom counts for all elements should update immediately to reflect the new coefficient values before any verification action.

**Validates: Requirements 4.2**

### Property 11: Unbalanced Element Identification

*For any* unbalanced equation, the system should identify and display exactly those elements whose reactant-side count does not equal their product-side count.

**Validates: Requirements 2.4, 4.4**

### Property 12: Hint Generation Relevance

*For any* unbalanced equation, generated hints should reference specific elements that are unbalanced and suggest coefficient adjustments that would move toward balance.

**Validates: Requirements 4.7**

### Property 13: Coefficient Reset Completeness

*For any* equation balancer state, the reset action should set all coefficients to 1 (the default value) and clear all user inputs.

**Validates: Requirements 4.6**

### Property 14: Quest Data Structure Completeness

*For any* quest object, it should contain all required fields: id, difficulty, stage, equation, reactants, products, and either coefficients (for balancing quests) or reactionType (for classification quests).

**Validates: Requirements 11.1, 11.3, 11.4, 11.7**

### Property 15: Chemical Notation Consistency

*For any* chemical formula in the system, it should follow IUPAC standards with element symbols capitalized correctly (e.g., "H2O" not "h2o", "NaCl" not "NaCL") and use standard notation accepted internationally.

**Validates: Requirements 1.7, 11.5**

### Property 16: React-Katex Component Usage

*For any* chemical formula displayed inline, the system should use the InlineMath component from react-katex; for any equation displayed as a block, the system should use the BlockMath component from react-katex.

**Validates: Requirements 12.1, 12.2, 12.3**

### Property 17: LaTeX Subscript and Superscript Syntax

*For any* chemical formula in LaTeX format, subscripts should use underscore notation (e.g., "H_2O") and superscripts should use caret notation (e.g., "Fe^{3+}"), and reaction arrows should use "\\\\rightarrow".

**Validates: Requirements 12.5, 12.6, 12.7**

### Property 18: Basel Context Inclusion

*For any* quest scenario description, it should reference at least one Basel-specific location (Novartis, Roche, Basel Chemistry Lab, Rhine River, Basel University) or Basel daily life context.

**Validates: Requirements 8.1, 8.2, 8.3**

### Property 19: Scenario Description Length

*For any* stage scenario description, the word count should be between 150 and 250 words inclusive.

**Validates: Requirements 8.4**

### Property 20: Scenario Content Richness

*For any* scenario description, it should include at least three of the following elements: specific people/roles, specific places, specific situations, numerical values, or real-world significance.

**Validates: Requirements 8.5**

### Property 21: Elite Pharmaceutical Authenticity

*For any* ELITE difficulty quest, if it involves pharmaceutical reactions, it should reference actual pharmaceutical synthesis processes or compounds used in Basel pharmaceutical industry.

**Validates: Requirements 8.7**

### Property 22: Answer Verification Correctness

*For any* user answer submission, the verification should return success if and only if the answer matches the expected value (for balancing: all atom counts balanced; for classification: correct reaction type selected).

**Validates: Requirements 10.1**

### Property 23: Navigation State Management

*For any* quest verification that succeeds, the "Next" button should become enabled; clicking "Next" should advance to the next quest in the current stage and difficulty; users should not be able to advance without successful verification.

**Validates: Requirements 10.6, 10.7, 10.8**

### Property 24: Responsive Layout Breakpoint

*For any* screen width below 768px, the layout should stack vertically with quest content above visualization; for screen widths at or above 768px, the layout should display two columns side by side.

**Validates: Requirements 13.2**

### Property 25: Accessibility Minimum Sizes

*For any* text element, the font size should be at least 14px; for any interactive element (button, input field), the height should be at least 44px to meet touch target requirements.

**Validates: Requirements 13.3, 13.4**

### Property 26: Visualization Aspect Ratio Preservation

*For any* visualization resize event, the aspect ratio of molecular structures and diagrams should remain constant to prevent distortion.

**Validates: Requirements 13.5**

### Property 27: Horizontal Scroll Prevention

*For any* viewport width, all content should fit within the viewport width without requiring horizontal scrolling.

**Validates: Requirements 13.7**

### Property 28: Stage Configuration

*For any* module instance, exactly three stages should be available: Reaction Types, Equation Balancing, and Reaction Simulation.

**Validates: Requirements 14.1**

### Property 29: Stage-Specific Quest Loading

*For any* stage selection, the system should load a quest pool containing only quests belonging to that stage, and changing stages should reset the quest index to 0 (first quest).

**Validates: Requirements 14.2, 14.3**

### Property 30: Stage Progress Independence

*For any* stage change, the progress and completion status of other stages should remain unchanged, allowing users to switch between stages without losing progress.

**Validates: Requirements 14.5**

### Property 31: Stage Completion Tracking

*For any* stage, when all quests in that stage are completed (verified successfully), the stage should be marked as complete, and this status should persist across browser sessions.

**Validates: Requirements 14.6, 14.7**

### Property 32: Atom Color Coding Consistency

*For any* molecular visualization in the reaction simulator, atoms should use standard colors: H=white, O=red, C=black, N=blue, Cl=green, S=yellow, P=orange, following standard chemistry visualization conventions.

**Validates: Requirements 6.5**

### Property 33: Simulator Control Functionality

*For any* reaction simulation, the play/pause/restart controls should correctly start, pause, and reset the animation state.

**Validates: Requirements 6.7**

### Property 34: Energy Change Display

*For any* reaction simulation, the system should display whether the reaction is exothermic (releases energy) or endothermic (absorbs energy) based on the reaction's energy profile.

**Validates: Requirements 6.8**

### Property 35: Elite Mechanism Visualization

*For any* ELITE difficulty quest in the Reaction Simulation stage, the quest should include reaction mechanism data showing intermediate species and transition states.

**Validates: Requirements 15.1, 15.3, 15.4**

### Property 36: Mechanism Step Navigation

*For any* reaction mechanism visualization, users should be able to step forward and backward through individual mechanism steps.

**Validates: Requirements 15.6**

### Property 37: Mechanism Notation Standards

*For any* reaction mechanism displayed, it should use standard organic chemistry notation including curved arrows for electron movement and proper representation of intermediates and transition states.

**Validates: Requirements 15.5**

### Property 38: Pharmaceutical Mechanism Authenticity

*For any* ELITE difficulty pharmaceutical reaction with mechanism, the mechanism should represent actual reaction pathways used in Basel drug synthesis processes.

**Validates: Requirements 15.7**


## Error Handling

### Input Validation

**Invalid Coefficient Input**:
- User enters non-numeric text (e.g., "abc") in coefficient field
- System: Treat as invalid, display error message "Please enter a positive integer"
- Prevent verification until valid input provided

**Zero or Negative Coefficients**:
- User enters 0 or negative number
- System: Display error message "Coefficients must be positive integers (≥ 1)"
- Reset field to 1 (default value)

**Decimal Coefficients**:
- User enters decimal number (e.g., "2.5")
- System: Display error message "Coefficients must be whole numbers"
- Suggest rounding or using different approach

**Empty Coefficient Fields**:
- User clicks "Verify" with empty coefficient fields
- System: Treat empty fields as 1 (default coefficient)
- Proceed with verification using default values

**Out of Range Coefficients**:
- User enters extremely large numbers (> 100)
- System: Display warning "Are you sure? This coefficient seems unusually large"
- Allow user to proceed or revise

### Quest Loading Errors

**Missing Quest Data**:
- Quest pool generation fails or returns empty array
- System: Display loading state with message "Loading chemistry quests..."
- Log error to console for debugging
- Retry quest loading after 2 seconds

**Invalid Quest Structure**:
- Quest object missing required fields (id, equation, reactants, products)
- System: Skip invalid quest, load next valid quest
- Log warning to console with missing field details
- Ensure at least 3 valid quests available per stage/difficulty

**Malformed Chemical Equations**:
- Equation string cannot be parsed
- System: Display error message "Unable to load this quest"
- Skip to next quest
- Log parsing error details

### LaTeX Rendering Errors

**Invalid LaTeX Syntax**:
- LaTeX string contains syntax errors
- System: Display fallback text notation (e.g., "H2O" instead of formatted version)
- Log LaTeX error to console
- Continue with functionality intact

**React-Katex Library Failure**:
- react-katex fails to load or render
- System: Fall back to plain text chemical notation
- Display warning banner "Chemical formulas may not display correctly"
- Ensure all functionality remains operational

**Missing LaTeX Strings**:
- Quest missing formulaLatex or equationLatex fields
- System: Generate LaTeX from plain formula string
- Use conversion function: `formulaToLatex(formula)`
- Log warning about missing LaTeX data

### Visualization Errors

**Missing Molecular Data**:
- Quest lacks molecular structure data for visualization
- System: Display simplified ball-and-stick model using formula
- Use default atom positions and bonds
- Show equation text as fallback

**Animation Failures**:
- Framer Motion or animation library fails
- System: Display static molecular structures
- Show before/after states without animation
- Functionality remains intact

**Canvas Rendering Issues**:
- Browser doesn't support required graphics features
- System: Fall back to SVG-based visualization
- Display warning about limited visualization
- Ensure core learning objectives still achievable

### Translation Errors

**Missing Translation Key**:
- Requested translation key doesn't exist in i18n
- System: Display English fallback text
- Log warning to console with missing key
- Continue with English text for that element

**Language Switch Failure**:
- Language change doesn't update UI
- System: Force re-render of all components
- Persist language preference in localStorage
- Reload page if necessary

**Incomplete Translations**:
- Some translations missing for selected language
- System: Use English for missing translations
- Display language indicator showing mixed content
- Log incomplete translation keys

### Atom Count Calculation Errors

**Invalid Element Symbols**:
- Equation contains unrecognized element symbols
- System: Display error "Unknown element: [symbol]"
- Prevent verification
- Suggest checking equation format

**Parsing Failures**:
- Cannot parse compound formula (e.g., malformed polyatomic ion)
- System: Display error "Unable to parse formula: [formula]"
- Skip to next quest
- Log parsing error details

**Coefficient Overflow**:
- Atom counts exceed safe integer limits
- System: Display warning "Atom counts are very large"
- Continue with calculation using BigInt if necessary
- Ensure comparison logic handles large numbers

### Stage and Navigation Errors

**Invalid Stage Selection**:
- User attempts to access non-existent stage
- System: Redirect to first valid stage (Reaction Types)
- Log warning about invalid stage
- Display available stages clearly

**Quest Index Out of Bounds**:
- System attempts to load quest beyond pool size
- System: Wrap to first quest or display completion message
- Mark stage as complete if all quests verified
- Offer to change difficulty or stage

**Progress Persistence Failure**:
- localStorage unavailable or quota exceeded
- System: Continue with in-memory state only
- Display warning "Progress will not be saved"
- Suggest clearing browser data


## Testing Strategy

### Unit Testing

**Quest Generation Tests**:
- Test `buildStagePool` function for each stage and difficulty
- Verify quest pool contains exactly 5 quests
- Verify quest objects have all required fields
- Verify equations are properly formatted
- Verify coefficients are within expected ranges for each difficulty
- Verify reaction types are correctly assigned

**Atom Count Calculation Tests**:
- Test `calculateAtomCounts` with simple compounds (H₂O, CO₂)
- Test with polyatomic ions (Ca(OH)₂, H₂SO₄)
- Test with organic compounds (C₆H₁₂O₆, CH₃COOH)
- Test with complex pharmaceutical molecules
- Verify counts are accurate for all elements
- Test edge cases (single atoms, large coefficients)

**Equation Balancing Tests**:
- Test balancing verification with balanced equations
- Test with unbalanced equations
- Test with partially balanced equations
- Test with all coefficients = 1
- Test with large coefficients (> 10)
- Verify correct identification of unbalanced elements

**Reaction Type Classification Tests**:
- Test synthesis reactions (A + B → AB)
- Test decomposition reactions (AB → A + B)
- Test single replacement (A + BC → AC + B)
- Test double replacement (AB + CD → AD + CB)
- Test combustion reactions (CₓHᵧ + O₂ → CO₂ + H₂O)
- Test edge cases and ambiguous reactions

**LaTeX Formatting Tests**:
- Test `formulaToLatex` conversion function
- Verify four-backslash formatting
- Test subscripts (H₂ → H_2)
- Test superscripts (Fe³⁺ → Fe^{3+})
- Test reaction arrows (→ → \\rightarrow)
- Verify no Unicode characters in LaTeX strings

**Translation Tests**:
- Test all translation keys exist for EN, CN, DE
- Test language switching updates UI text
- Test chemical formulas remain unchanged across languages
- Test difficulty level translations
- Test stage name translations
- Test reaction type translations

**Input Validation Tests**:
- Test coefficient validation (positive integers only)
- Test rejection of zero, negative, decimal values
- Test rejection of non-numeric input
- Test empty input handling
- Test very large numbers

**Navigation Tests**:
- Test stage switching loads correct quest pool
- Test difficulty switching loads correct quest pool
- Test "Next" button advances to next quest
- Test quest index wraps or shows completion
- Test progress tracking across stage changes

### Property-Based Testing

**Configuration**: Use fast-check library for TypeScript, minimum 100 iterations per test

**Property Test 1: Atom Count Balance Verification**
```typescript
// Feature: sc1-06-chemical-reactions-basics, Property 2: Atom count balance verification
fc.assert(
  fc.property(
    fc.array(fc.integer({ min: 1, max: 10 }), { minLength: 2, maxLength: 6 }),
    (coefficients) => {
      const equation = generateRandomEquation(coefficients);
      const atomCounts = calculateAtomCounts(equation, coefficients);
      
      // Check if all elements are balanced
      const isBalanced = Array.from(atomCounts.values()).every(
        counts => counts.reactants === counts.products
      );
      
      return isBalanced === true;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 2: Coefficient Range by Difficulty**
```typescript
// Feature: sc1-06-chemical-reactions-basics, Property 8: Coefficient range by difficulty
fc.assert(
  fc.property(
    fc.constantFrom("BASIC", "CORE", "ADVANCED", "ELITE"),
    (difficulty) => {
      const pool = buildStagePool(mockTranslations, difficulty, "EQUATION_BALANCING");
      const maxCoefficient = Math.max(...pool.flatMap(q => q.coefficients || []));
      
      if (difficulty === "BASIC") return maxCoefficient <= 3;
      if (difficulty === "CORE") return maxCoefficient <= 5;
      if (difficulty === "ADVANCED") return maxCoefficient <= 10;
      return true; // ELITE has no upper limit
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 3: Quest Pool Size Consistency**
```typescript
// Feature: sc1-06-chemical-reactions-basics, Property 4: Quest pool size consistency
fc.assert(
  fc.property(
    fc.constantFrom("BASIC", "CORE", "ADVANCED", "ELITE"),
    fc.constantFrom("REACTION_TYPES", "EQUATION_BALANCING", "REACTION_SIMULATION"),
    (difficulty, stage) => {
      const pool = buildStagePool(mockTranslations, difficulty, stage);
      return pool.length === 5;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 4: LaTeX Formatting Consistency**
```typescript
// Feature: sc1-06-chemical-reactions-basics, Property 1: LaTeX formatting consistency
fc.assert(
  fc.property(
    fc.string({ minLength: 1, maxLength: 50 }),
    (formula) => {
      const latex = formulaToLatex(formula);
      
      // Check for four backslashes in LaTeX commands
      const hasFourBackslashes = /\\\\text|\\\\rightarrow/.test(latex);
      
      // Check no Unicode chemical symbols
      const hasNoUnicode = !/[₀-₉⁰-⁹]/.test(latex);
      
      return hasFourBackslashes && hasNoUnicode;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 5: Translation Completeness**
```typescript
// Feature: sc1-06-chemical-reactions-basics, Property 5: Translation completeness
fc.assert(
  fc.property(
    fc.constantFrom("EN", "CN", "DE"),
    fc.constantFrom("title", "check", "next", "correct", "incorrect", "reset"),
    (language, key) => {
      const translations = getTranslations(language);
      const value = translations.sc1_06[key];
      return value !== undefined && value.length > 0;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 6: Reactant and Product Position**
```typescript
// Feature: sc1-06-chemical-reactions-basics, Property 7: Reactant and product position verification
fc.assert(
  fc.property(
    fc.array(fc.string(), { minLength: 1, maxLength: 3 }),
    fc.array(fc.string(), { minLength: 1, maxLength: 3 }),
    (reactants, products) => {
      const equation = createEquation(reactants, products);
      const equationString = formatEquation(equation);
      
      // Verify reactants appear before arrow
      const arrowIndex = equationString.indexOf('→');
      const leftSide = equationString.substring(0, arrowIndex);
      const rightSide = equationString.substring(arrowIndex + 1);
      
      const allReactantsOnLeft = reactants.every(r => leftSide.includes(r));
      const allProductsOnRight = products.every(p => rightSide.includes(p));
      
      return allReactantsOnLeft && allProductsOnRight;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 7: Coefficient Validation**
```typescript
// Feature: sc1-06-chemical-reactions-basics, Property 9: Coefficient validation
fc.assert(
  fc.property(
    fc.oneof(
      fc.integer({ min: 1, max: 100 }),
      fc.integer({ max: 0 }),
      fc.double(),
      fc.string()
    ),
    (input) => {
      const isValid = validateCoefficient(input);
      const shouldBeValid = Number.isInteger(input) && input >= 1;
      return isValid === shouldBeValid;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 8: Unbalanced Element Identification**
```typescript
// Feature: sc1-06-chemical-reactions-basics, Property 11: Unbalanced element identification
fc.assert(
  fc.property(
    fc.array(fc.integer({ min: 1, max: 5 }), { minLength: 2, maxLength: 4 }),
    (coefficients) => {
      const equation = generateRandomEquation(coefficients);
      const wrongCoefficients = coefficients.map((c, i) => i === 0 ? c + 1 : c);
      const atomCounts = calculateAtomCounts(equation, wrongCoefficients);
      const unbalanced = identifyUnbalancedElements(atomCounts);
      
      // At least one element should be unbalanced
      return unbalanced.length > 0;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 9: Scenario Word Count**
```typescript
// Feature: sc1-06-chemical-reactions-basics, Property 19: Scenario description length
fc.assert(
  fc.property(
    fc.constantFrom("REACTION_TYPES", "EQUATION_BALANCING", "REACTION_SIMULATION"),
    (stage) => {
      const scenario = getStageScenario(mockTranslations, stage);
      const wordCount = scenario.split(/\s+/).length;
      return wordCount >= 150 && wordCount <= 250;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 10: Basel Context Inclusion**
```typescript
// Feature: sc1-06-chemical-reactions-basics, Property 18: Basel context inclusion
fc.assert(
  fc.property(
    fc.constantFrom("BASIC", "CORE", "ADVANCED", "ELITE"),
    fc.constantFrom("REACTION_TYPES", "EQUATION_BALANCING", "REACTION_SIMULATION"),
    (difficulty, stage) => {
      const pool = buildStagePool(mockTranslations, difficulty, stage);
      const baselKeywords = ["Novartis", "Roche", "Basel", "Rhine"];
      
      return pool.every(quest => 
        baselKeywords.some(keyword => 
          quest.baselContext?.includes(keyword)
        )
      );
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 11: Navigation State Management**
```typescript
// Feature: sc1-06-chemical-reactions-basics, Property 23: Navigation state management
fc.assert(
  fc.property(
    fc.integer({ min: 0, max: 4 }),
    (questIndex) => {
      const state = createQuestState(questIndex);
      
      // Before verification, Next should be disabled
      expect(state.canAdvance).toBe(false);
      
      // After successful verification, Next should be enabled
      const verifiedState = verifyAnswer(state, correctAnswer);
      expect(verifiedState.canAdvance).toBe(true);
      
      // After clicking Next, index should increment
      const nextState = advanceQuest(verifiedState);
      return nextState.questIndex === questIndex + 1;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 12: Stage Progress Independence**
```typescript
// Feature: sc1-06-chemical-reactions-basics, Property 30: Stage progress independence
fc.assert(
  fc.property(
    fc.constantFrom("REACTION_TYPES", "EQUATION_BALANCING", "REACTION_SIMULATION"),
    fc.constantFrom("REACTION_TYPES", "EQUATION_BALANCING", "REACTION_SIMULATION"),
    fc.integer({ min: 0, max: 4 }),
    (stage1, stage2, progress1) => {
      const state = createModuleState();
      state.stageProgress[stage1] = progress1;
      
      // Switch to different stage
      const newState = changeStage(state, stage2);
      
      // Original stage progress should be unchanged
      return newState.stageProgress[stage1] === progress1;
    }
  ),
  { numRuns: 100 }
);
```

### Integration Testing

**End-to-End Quest Flow**:
1. Load module → Verify initial quest displays with equation
2. For Balancing stage:
   - Enter coefficients → Verify atom counts update in real-time
   - Enter correct coefficients → Click "Verify" → Verify success feedback
   - Click "Next" → Verify next quest loads
3. For Classification stage:
   - Select reaction type → Click "Verify" → Verify feedback
   - Select correct type → Verify success message with explanation
4. For Simulation stage:
   - Click "Play" → Verify animation starts
   - Click "Pause" → Verify animation pauses
   - Click "Restart" → Verify animation resets
5. Complete all 5 quests → Verify stage completion
6. Change difficulty → Verify new quest pool loads
7. Change stage → Verify appropriate visualization displays

**Visualization Synchronization**:
1. Load Reaction Types quest → Verify visualization shows reaction pattern
2. Load Equation Balancing quest → Verify atom count table displays
3. Load Reaction Simulation quest → Verify molecular animation displays
4. Change quest → Verify visualization updates immediately
5. Enter coefficients → Verify atom counts update in visualization

**Language Switching**:
1. Load module in English → Verify all text is English
2. Switch to Chinese → Verify all text updates to Chinese
3. Switch to German → Verify all text updates to German
4. Verify chemical formulas remain unchanged across languages
5. Verify LaTeX rendering works in all languages

**Error Recovery**:
1. Enter invalid coefficient → Verify error message displays
2. Correct input → Verify error clears
3. Submit with empty fields → Verify defaults used
4. Trigger LaTeX error → Verify fallback text displays
5. Simulate network error → Verify retry mechanism works

### Browser Testing

**Supported Browsers**:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

**Test Checklist**:
- [ ] Module loads without errors
- [ ] All quests display correctly with LaTeX rendering
- [ ] Coefficient input fields accept numeric input
- [ ] Reaction type selector displays all options
- [ ] Verify button triggers validation
- [ ] Next button advances to next quest
- [ ] Reset button clears coefficients
- [ ] Visualizations render correctly
- [ ] Animations play smoothly (60fps target)
- [ ] Language switching works
- [ ] LaTeX formulas render correctly in all browsers
- [ ] Responsive layout works on mobile/tablet (768px breakpoint)
- [ ] Touch targets meet 44px minimum
- [ ] No console errors or warnings
- [ ] Progress persists across page reloads
- [ ] Stage completion tracking works
- [ ] Basel scenarios display correctly

### Performance Testing

**Load Time Targets**:
- Initial page load: < 2 seconds
- Quest transition: < 200ms
- Coefficient input response: < 50ms (real-time)
- Language switch: < 500ms
- Visualization render: < 300ms

**Memory Usage**:
- Monitor for memory leaks during extended use
- Verify animations don't accumulate memory
- Test with 50+ quest transitions
- Ensure cleanup on component unmount

**Animation Performance**:
- Target 60fps for molecular animations
- Use requestAnimationFrame for smooth playback
- Optimize canvas/SVG rendering
- Test on lower-end devices

