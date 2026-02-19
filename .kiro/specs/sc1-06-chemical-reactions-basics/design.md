# Design Document: SC1.06 - Chemical Reactions Basics

## Overview

The SC1.06 Chemical Reactions Basics module is a React-based educational web application that teaches students (ages 13-15) fundamental concepts about chemical reactions through interactive exercises. The module covers three main areas: identifying reaction types, balancing chemical equations, and visualizing reaction mechanisms. All content is contextualized with Basel-specific scenarios (pharmaceutical industry, local chemistry) and supports three languages (English, Chinese, German).

The application follows the established chamber pattern used across the curriculum, with a two-column layout featuring quest content on the left and interactive visualizations on the right. Students progress through four difficulty levels (BASIC, CORE, ADVANCED, ELITE) across three thematic stages (Reaction Types, Equation Balancing, Reaction Simulation), with 60-65 total quests providing comprehensive coverage of chemical reaction fundamentals.

Key technical challenges include:
- Rendering chemical equations with proper notation using react-katex
- Implementing real-time equation balancing verification with atom counting
- Creating interactive molecular visualizations and animations
- Supporting three-language translations while maintaining chemical notation standards
- Providing progressive difficulty scaling from simple reactions to complex pharmaceutical synthesis

## Architecture

### Component Hierarchy

```
SC106ChemicalReactionsBasics (Main Container)
├── ChamberLayout
│   ├── QuestPanel (Left Column)
│   │   ├── StageSelector
│   │   ├── DifficultySelector
│   │   ├── ScenarioDescription
│   │   ├── QuestContent
│   │   │   ├── EquationDisplay (react-katex)
│   │   │   ├── EquationBalancer (for balancing stage)
│   │   │   ├── ReactionTypeSelector (for classification stage)
│   │   │   └── AnswerInput
│   │   ├── FeedbackDisplay
│   │   └── NavigationButtons
│   └── VisualizationPanel (Right Column)
│       ├── MolecularVisualization
│       ├── BalancingTable
│       ├── ReactionAnimator
│       └── MechanismDiagram (ELITE only)
└── LanguageSelector
```

### Data Flow

1. **Quest Loading**: User selects stage + difficulty → System filters quest pool → Loads first quest
2. **Answer Submission**: User inputs answer → Verification logic checks correctness → Feedback displayed → Next button enabled/disabled
3. **Equation Balancing**: User enters coefficients → Real-time atom counting → Visual feedback on balance status
4. **Reaction Classification**: User selects type → Verification against expected type → Explanation provided
5. **Language Switching**: User changes language → All UI text re-rendered → Chemical formulas unchanged

### State Management

The module uses React hooks for state management:

```typescript
interface ModuleState {
  currentStage: 'reaction-types' | 'equation-balancing' | 'reaction-simulation';
  currentDifficulty: 'BASIC' | 'CORE' | 'ADVANCED' | 'ELITE';
  currentQuestIndex: number;
  questPool: Quest[];
  userAnswer: any;
  isCorrect: boolean | null;
  feedback: string;
  language: 'EN' | 'CN' | 'DE';
  stageCompletion: Record<string, boolean>;
}
```

## Components and Interfaces

### Core Components

#### 1. EquationDisplay Component
Renders chemical equations using react-katex with proper LaTeX formatting.

```typescript
interface EquationDisplayProps {
  equation: string; // LaTeX format with four backslashes
  centered?: boolean; // Use BlockMath vs InlineMath
}

// Example usage:
// equation = "2\\text{H}_2 + \\text{O}_2 \\rightarrow 2\\text{H}_2\\text{O}"
```

#### 2. EquationBalancer Component
Interactive tool for balancing chemical equations with real-time feedback.

```typescript
interface EquationBalancerProps {
  reactants: ChemicalFormula[];
  products: ChemicalFormula[];
  correctCoefficients: number[];
  onBalanceChange: (coefficients: number[], isBalanced: boolean) => void;
}

interface ChemicalFormula {
  formula: string; // e.g., "H2O"
  elements: Record<string, number>; // e.g., { H: 2, O: 1 }
}
```

#### 3. ReactionTypeSelector Component
UI for classifying reactions by type with pattern display.

```typescript
interface ReactionTypeSelectorProps {
  equation: string;
  correctType: ReactionType;
  onSelect: (selectedType: ReactionType) => void;
}

type ReactionType = 
  | 'synthesis' 
  | 'decomposition' 
  | 'single-replacement' 
  | 'double-replacement' 
  | 'combustion';
```

#### 4. MolecularVisualization Component
Displays molecular structures using ball-and-stick models.

```typescript
interface MolecularVisualizationProps {
  molecules: Molecule[];
  showBonds?: boolean;
  colorScheme?: 'standard' | 'cpk'; // CPK: H=white, O=red, C=black, N=blue
}

interface Molecule {
  formula: string;
  atoms: Atom[];
  bonds: Bond[];
}

interface Atom {
  element: string;
  position: [number, number, number];
}

interface Bond {
  atom1: number;
  atom2: number;
  order: 1 | 2 | 3; // single, double, triple
}
```

#### 5. ReactionAnimator Component
Animates chemical reactions showing bond breaking/forming.

```typescript
interface ReactionAnimatorProps {
  reactants: Molecule[];
  products: Molecule[];
  reactionType: ReactionType;
  energyChange: 'exothermic' | 'endothermic';
  onComplete?: () => void;
}
```

#### 6. BalancingTable Component
Displays atom counts for verification during balancing.

```typescript
interface BalancingTableProps {
  reactantCounts: Record<string, number>;
  productCounts: Record<string, number>;
  isBalanced: boolean;
}
```

#### 7. MechanismDiagram Component (ELITE)
Shows detailed reaction mechanisms with electron movement.

```typescript
interface MechanismDiagramProps {
  steps: MechanismStep[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

interface MechanismStep {
  description: string;
  structure: string; // SMILES or MOL format
  arrows: ElectronArrow[];
  intermediates?: string[];
}

interface ElectronArrow {
  from: [number, number];
  to: [number, number];
  type: 'single' | 'double'; // electron pair movement
}
```

## Data Models

### Quest Data Structure

```typescript
interface Quest {
  id: string;
  difficulty: 'BASIC' | 'CORE' | 'ADVANCED' | 'ELITE';
  stage: 'reaction-types' | 'equation-balancing' | 'reaction-simulation';
  
  // Equation data
  equation: {
    reactants: ChemicalFormula[];
    products: ChemicalFormula[];
    latex: string; // Full equation in LaTeX format
  };
  
  // Answer data (varies by stage)
  answer: {
    reactionType?: ReactionType;
    coefficients?: number[];
    balancedEquation?: string;
  };
  
  // Scenario context
  scenario: {
    title: Record<'EN' | 'CN' | 'DE', string>;
    description: Record<'EN' | 'CN' | 'DE', string>;
    location?: string; // Basel-specific location
  };
  
  // Visualization data
  visualization?: {
    molecules?: Molecule[];
    mechanism?: MechanismStep[];
    energyDiagram?: EnergyLevel[];
  };
}
```

### Chemical Formula Parser

The system needs a parser to convert chemical formulas into element counts:

```typescript
interface FormulaParser {
  parse(formula: string): Record<string, number>;
  // Examples:
  // "H2O" → { H: 2, O: 1 }
  // "Ca(OH)2" → { Ca: 1, O: 2, H: 2 }
  // "Fe2(SO4)3" → { Fe: 2, S: 3, O: 12 }
}
```

### Translation Data Structure

```typescript
interface Translations {
  stages: {
    'reaction-types': Record<Language, string>;
    'equation-balancing': Record<Language, string>;
    'reaction-simulation': Record<Language, string>;
  };
  
  difficulties: {
    BASIC: Record<Language, string>;
    CORE: Record<Language, string>;
    ADVANCED: Record<Language, string>;
    ELITE: Record<Language, string>;
  };
  
  reactionTypes: {
    synthesis: Record<Language, string>;
    decomposition: Record<Language, string>;
    'single-replacement': Record<Language, string>;
    'double-replacement': Record<Language, string>;
    combustion: Record<Language, string>;
  };
  
  ui: Record<string, Record<Language, string>>;
}

type Language = 'EN' | 'CN' | 'DE';
```

### Quest Pool Organization

```typescript
interface QuestPool {
  'reaction-types': {
    BASIC: Quest[]; // 5 quests
    CORE: Quest[]; // 5 quests
    ADVANCED: Quest[]; // 5 quests
    ELITE: Quest[]; // 5 quests
  };
  'equation-balancing': {
    BASIC: Quest[]; // 5 quests
    CORE: Quest[]; // 5 quests
    ADVANCED: Quest[]; // 5 quests
    ELITE: Quest[]; // 5 quests
  };
  'reaction-simulation': {
    BASIC: Quest[]; // 5 quests
    CORE: Quest[]; // 5 quests
    ADVANCED: Quest[]; // 5 quests
    ELITE: Quest[]; // 5 quests
  };
}
// Total: 3 stages × 4 difficulties × 5 quests = 60 quests minimum
```

