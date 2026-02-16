# Design Document: Critical Modules Phase 1

## Overview

This design document specifies the implementation of four priority educational modules and homepage fixes for the Science Theme Park platform. The modules target critical curriculum gaps identified in the Basel-Stadt and Basel-Landschaft educational requirements:

**P0 Priority (Immediate Implementation):**
- GM1.02 - Integral Calculus (积分): Gymnasium mathematics core requirement
- SC2.05 - Acid-Base Chemistry (酸碱化学): Lehrplan 21 explicit requirement

**P1 Priority (Near-term Implementation):**
- GP3.01 - Wave Physics (波动学): Gymnasium physics requirement
- SC2.06 - Redox Reactions (氧化还原): Chemistry foundation

**Sprint Priority:**
- Homepage display fixes for existing modules

All modules follow the established CHAMBER_MODULE_STANDARDS, implementing the Mixed Mode layout (left: questions, right: visualization), using ChamberLayout and useQuestManager, with complete EN/CN/DE translations and Basel-contextualized scenarios.

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                     Science Theme Park                       │
│                      Web Application                         │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
         ┌──────▼──────┐ ┌───▼────┐ ┌─────▼──────┐
         │   Module     │ │ Layout │ │    i18n    │
         │   Pages      │ │ System │ │   System   │
         └──────┬──────┘ └───┬────┘ └─────┬──────┘
                │             │             │
    ┌───────────┼─────────────┼─────────────┼───────────┐
    │           │             │             │           │
┌───▼────┐ ┌───▼────┐ ┌─────▼─────┐ ┌─────▼─────┐ ┌──▼───┐
│ GM1.02 │ │ SC2.05 │ │  GP3.01   │ │  SC2.06   │ │ Home │
│ Integ  │ │ Acid   │ │   Wave    │ │   Redox   │ │ Page │
│ Calc   │ │ Base   │ │  Physics  │ │ Reactions │ │ Fix  │
└───┬────┘ └───┬────┘ └─────┬─────┘ └─────┬─────┘ └──┬───┘
    │          │             │             │          │
    └──────────┴─────────────┴─────────────┴──────────┘
                              │
                    ┌─────────▼──────────┐
                    │  Visualization     │
                    │    Components      │
                    └────────────────────┘
```

### Technology Stack (Verified Versions)

- **Frontend Framework**: Next.js 16.1.5 (React 19.2.3)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4.1.18 (v4 config via `@tailwindcss/postcss`)
- **Math Rendering**: react-katex (KaTeX)
- **3D Graphics**: Three.js + React Three Fiber (select modules only)
- **2D Graphics**: SVG (preferred) + Canvas API (legacy)
- **Animation**: Framer Motion
- **State Management**: Zustand (via useAppStore)
- **Quest Management**: Custom useQuestManager hook (default tolerance = 0.1)
- **Testing**: Jest 30.2 + React Testing Library + fast-check 4.5.3

### Module Structure Pattern

Each module follows this consistent structure:

```
src/
├── app/
│   └── chamber/
│       └── {module-code}/
│           └── page.tsx              # Main module page
├── components/
│   └── chamber/
│       └── {module-code}/
│           └── Visualization.tsx     # Visualization component
└── lib/
    └── i18n/
        ├── en/
        │   ├── math.ts              # English translations
        │   ├── physics.ts
        │   └── chemistry.ts
        ├── cn/
        │   ├── math.ts              # Chinese translations
        │   ├── physics.ts
        │   └── chemistry.ts
        └── de/
            ├── math.ts              # German translations
            ├── physics.ts
            └── chemistry.ts
```

## Components and Interfaces

### 1. Module Page Component

Each module page implements the following structure.

**⚠️ IMPORTANT: Two i18n patterns coexist in the codebase:**
- **Old pattern** (gm1-01, sc2-01, etc.): `import { translations } from "@/lib/i18n"; const t = translations[currentLanguage].module_key;`
- **New pattern** (sb1-03, sb2-01, gb2-01): `import { useLanguage } from "@/lib/i18n"; const { t } = useLanguage();`

**All new modules MUST use the new `useLanguage()` pattern.**

```typescript
// src/app/chamber/{module-code}/page.tsx

"use client";

import { useEffect, useCallback, useMemo } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";  // ✅ New pattern
import ChamberLayout from "@/components/layout/ChamberLayout";
import ModuleVisualization from "@/components/chamber/{module-code}/Visualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "STAGE_1" | "STAGE_2" | "STAGE_3";

interface ModuleQuest extends Quest {
  stage: Stage;
  // Module-specific quest properties
}

const round2 = (v: number) => Math.round(v * 100) / 100;

// Data pools: 5 questions per difficulty per stage
const stage1DataBasic = [/* exactly 5 questions */];
const stage1DataCore = [/* exactly 5 questions */];
const stage1DataAdvanced = [/* exactly 5 questions */];
const stage1DataElite = [/* exactly 5 questions */];

export default function ModulePage() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();  // ✅ Use useLanguage hook
  
  // ✅ Wrap buildStagePool in useCallback to prevent quest regeneration
  const buildStagePool = useCallback(
    (difficulty: Difficulty, stage: Stage): ModuleQuest[] => {
      let dataSet;
      switch (difficulty) {
        case "BASIC": dataSet = stage1DataBasic; break;
        case "CORE": dataSet = stage1DataCore; break;
        case "ADVANCED": dataSet = stage1DataAdvanced; break;
        case "ELITE": dataSet = stage1DataElite; break;
        default: dataSet = stage1DataBasic;
      }
      return dataSet.map((item) => ({
        id: item.id,
        difficulty,
        stage,
        promptLatex: t("module_key.prompts.some_prompt", { param: item.value }),
        // ... build quest
      }));
    },
    [t]
  );

  const {
    difficulty,
    stage,
    inputs,
    lastCheck,
    currentQuest,
    setInputs,
    verify,
    next,
    handleDifficultyChange,
    handleStageChange,
  } = useQuestManager<ModuleQuest, Stage>({
    buildPool: buildStagePool,
    initialStage: "STAGE_1",
    // tolerance: 0.1 (default), use 0.01 for higher precision if needed
  });

  return (
    <ChamberLayout
      title={t("module_key.title")}
      moduleCode="{MODULE_CODE}"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "STAGE_1", label: t("module_key.stages.stage_1") },
        { id: "STAGE_2", label: t("module_key.stages.stage_2") },
        { id: "STAGE_3", label: t("module_key.stages.stage_3") },
      ]}
      currentStage={stage}
      onStageChange={handleStageChange}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t("module_key.footer_left")}
      translations={{
        back: t("module_key.back"),
        check: t("module_key.check"),
        next: t("module_key.next"),
        correct: t("module_key.correct"),
        incorrect: t("module_key.incorrect"),
        ready: t("module_key.ready"),
        monitor_title: t("module_key.monitor_title"),
        difficulty: {
          basic: t("module_key.difficulty.basic"),
          core: t("module_key.difficulty.core"),
          advanced: t("module_key.difficulty.advanced"),
          elite: t("module_key.difficulty.elite"),
        },
      }}
      monitorContent={
        <ModuleVisualization
          quest={currentQuest}
          inputs={inputs}
          checkStatus={lastCheck}
        />
      }
    >
      {/* Question content */}
    </ChamberLayout>
  );
}
```

### 2. Visualization Component Interface

```typescript
// src/components/chamber/{module-code}/Visualization.tsx

interface VisualizationProps {
  quest: ModuleQuest | null;
  inputs: Record<string, string>;
  checkStatus: { ok: boolean; correct: string } | null;
}

export default function ModuleVisualization({
  quest,
  inputs,
  checkStatus
}: VisualizationProps) {
  // Auto-scaling bounds calculation
  const bounds = useMemo(() => {
    if (!quest) return defaultBounds;
    
    // Collect all points/values to display
    const values = [/* extract from quest */];
    
    // Calculate min/max with 50% padding
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;
    const padding = 0.5; // 50% padding to prevent label overflow
    
    return {
      min: min - range * padding,
      max: max + range * padding,
    };
  }, [quest]);

  // Dynamic scale calculation
  const scale = useMemo(() => {
    const range = bounds.max - bounds.min;
    return canvasSize / Math.max(range, 10);
  }, [bounds]);

  // Smart label positioning
  const getLabelOffset = (x: number, y: number) => {
    // Calculate angle from origin
    const angle = Math.atan2(y, x);
    const distance = 25; // pixels
    
    // Adjust to avoid axes (±15° threshold)
    const threshold = Math.PI / 12;
    let adjustedAngle = angle;
    
    // Avoid horizontal axis
    if (Math.abs(angle) < threshold) {
      adjustedAngle = threshold;
    } else if (Math.abs(angle - Math.PI) < threshold) {
      adjustedAngle = Math.PI - threshold;
    }
    
    // Avoid vertical axis
    if (Math.abs(angle - Math.PI / 2) < threshold) {
      adjustedAngle = Math.PI / 2 + threshold;
    } else if (Math.abs(angle + Math.PI / 2) < threshold) {
      adjustedAngle = -Math.PI / 2 - threshold;
    }
    
    return {
      dx: Math.cos(adjustedAngle) * distance,
      dy: -Math.sin(adjustedAngle) * distance,
    };
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {/* Scenario description */}
      <div className="text-sm text-white/80 leading-relaxed">
        {quest?.scenario}
      </div>
      
      {/* Visualization canvas */}
      <div className="flex-1 relative">
        {/* SVG or Canvas rendering */}
      </div>
      
      {/* Status indicator */}
      <div className="text-xs text-white/60 font-mono">
        {checkStatus ? (
          checkStatus.ok ? "✓ VERIFIED" : "✗ MISMATCH"
        ) : "READY"}
      </div>
    </div>
  );
}
```

### 3. Translation Structure

```typescript
// src/lib/i18n/en/{subject}.ts

export const en{Subject} = {
  {module_key}: {
    back: "Back to Nexus",
    title: "{MODULE_CODE} // {MODULE_NAME}",
    difficulty: {
      basic: "BASIC",
      core: "CORE",
      advanced: "ADVANCED",
      elite: "ELITE"
    },
    stages: {
      stage_1: "STAGE 1 NAME",
      stage_2: "STAGE 2 NAME",
      stage_3: "STAGE 3 NAME",
    },
    scenarios: {
      stage_1: `Detailed Basel-contextualized scenario (150-250 words).
        Must include: specific location, specific people/roles, specific
        numbers with units, real-world significance, connection to student
        life. Example: "You are working at Novartis Basel pharmaceutical
        lab analyzing 100 samples where 85 passed quality tests..."`,
      stage_2: `Another detailed scenario...`,
      stage_3: `Another detailed scenario...`,
    },
    check: "Verify",
    next: "Next Challenge",
    correct: "Verified",
    incorrect: "Mismatch",
    ready: "Ready",
    monitor_title: "{MODULE_CODE}_MONITOR",
    footer_left: "{MODULE_CODE} // NODE: BASEL",
  },
};
```

## Data Models

### Quest Data Model

```typescript
interface Quest {
  id: string;                    // Unique identifier (e.g., "B1", "C2", "A3", "E4")
  difficulty: Difficulty;        // "BASIC" | "CORE" | "ADVANCED" | "ELITE"
  stage: string;                 // Stage identifier
  promptLatex: string;           // Question prompt in LaTeX
  expressionLatex: string;       // Mathematical expression
  targetLatex: string;           // Target/goal description
  slots: Slot[];                 // Input slots for answers
  correctLatex: string;          // Correct answer display
  hintLatex?: string[];          // Optional progressive hints
  visual?: unknown;              // Module-specific visualization data
}

interface Slot {
  id: string;                    // Slot identifier
  labelLatex: string;            // Label in LaTeX
  placeholder: string;           // Placeholder text
  expected: number | string;     // Expected answer
  unit?: string;                 // Optional unit (e.g., "m", "kg", "pH")
}
```

### Module-Specific Quest Extensions

#### GM1.02 - Integral Calculus Quest

```typescript
interface IntegralQuest extends Quest {
  data: {
    function: string;            // Function to integrate (e.g., "x^2")
    lowerBound?: number;         // For definite integrals
    upperBound?: number;         // For definite integrals
    constant?: number;           // Integration constant
    application?: {              // For application problems
      context: string;           // "area" | "volume" | "work" | "distance"
      description: string;
    };
  };
}
```

#### SC2.05 - Acid-Base Chemistry Quest

```typescript
interface AcidBaseQuest extends Quest {
  data: {
    substance: string;           // Chemical formula (e.g., "HCl", "NaOH")
    concentration?: number;      // Molarity (M)
    volume?: number;             // Volume (mL)
    pH?: number;                 // pH value
    reactionType: "dissociation" | "neutralization" | "titration";
    products?: string[];         // Reaction products
  };
}
```

#### GP3.01 - Wave Physics Quest

```typescript
interface WaveQuest extends Quest {
  data: {
    waveType: "transverse" | "longitudinal" | "standing";
    amplitude: number;           // Amplitude (m)
    frequency: number;           // Frequency (Hz)
    wavelength?: number;         // Wavelength (m)
    velocity?: number;           // Wave velocity (m/s)
    medium?: string;             // Propagation medium
    application?: {
      context: string;           // "sound" | "light" | "water" | "seismic"
      description: string;
    };
  };
}
```

#### SC2.06 - Redox Reactions Quest

```typescript
interface RedoxQuest extends Quest {
  data: {
    reactants: Array<{
      formula: string;
      oxidationState: number;
    }>;
    products: Array<{
      formula: string;
      oxidationState: number;
    }>;
    electronsTransferred: number;
    reactionType: "oxidation" | "reduction" | "redox" | "electrochemical";
    cellPotential?: number;      // For electrochemical cells (V)
  };
}
```

### Difficulty Level Specifications

Each difficulty level must follow these guidelines:

#### BASIC Difficulty
- **Concept**: Direct observation and single-step calculations
- **Numbers**: Simple integers (1-10)
- **Complexity**: One concept per question
- **Calculation**: Mental math possible
- **Example (Integrals)**: ∫x dx, ∫2x dx, ∫x² dx
- **Example (pH)**: pH of 0.1M HCl, pH of pure water

#### CORE Difficulty
- **Concept**: Multi-step calculations and combined concepts
- **Numbers**: Integers requiring paper calculation (10-100)
- **Complexity**: Two concepts combined
- **Calculation**: Requires written work
- **Example (Integrals)**: ∫(x² + 3x) dx, ∫₀² x² dx
- **Example (pH)**: pH after mixing acids, buffer calculations

#### ADVANCED Difficulty
- **Concept**: Conditional problems and complex scenarios
- **Numbers**: Decimals and fractions
- **Complexity**: Multiple concepts with conditions
- **Calculation**: Full solution process required
- **Example (Integrals)**: ∫x·sin(x) dx (integration by parts), volume of revolution
- **Example (pH)**: Titration curves, polyprotic acids

#### ELITE Difficulty
- **Concept**: Comprehensive strategy and synthesis
- **Numbers**: Complex decimals and scientific notation
- **Complexity**: Requires strategic thinking and multiple approaches
- **Calculation**: Deep understanding required
- **Example (Integrals)**: ∫e^x·cos(x) dx, optimization problems
- **Example (pH)**: Complex buffer systems, pH-dependent equilibria

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Question Pool Size Consistency
*For any* module (GM1.02, SC2.05, GP3.01, SC2.06) and any difficulty level (BASIC, CORE, ADVANCED, ELITE), the question pool for that difficulty should contain between 4 and 5 unique questions.

**Validates: Requirements 1.2, 2.2, 3.2, 4.2**

### Property 2: LaTeX Formula Rendering
*For any* mathematical or chemical formula in any module, the rendered output should contain KaTeX CSS classes indicating LaTeX rendering was applied (not raw LaTeX code displayed).

**Validates: Requirements 1.4, 2.4, 3.4, 4.4**

### Property 3: Numerical Validation Tolerance
*For any* numerical answer slot with expected value E and tolerance T, submitting a value V should pass validation if and only if |V - E| ≤ T, where T = 0.1 (useQuestManager default). Modules requiring higher precision must explicitly pass `tolerance: 0.01`.

**Validates: Requirements 1.5, 2.5, 3.5, 4.5, 10.6**

### Property 4: Translation Completeness
*For any* module and any translation key (title, difficulty labels, stage names, scenarios, UI text), all three language versions (EN, CN, DE) should exist in the i18n structure at the correct module key path.

**Validates: Requirements 1.7, 2.7, 3.7, 4.7, 8.1, 8.5, 8.9**

### Property 5: Visualization Rendering
*For any* question in any module, when the question is displayed, a visualization component should render containing at least one SVG or Canvas element with question-specific data.

**Validates: Requirements 1.3, 2.3, 3.3, 4.3, 7.1, 7.8**

### Property 6: Auto-Scaling Bounds Calculation
*For any* set of data points to be visualized, the calculated bounds should include all points with exactly 50% padding (i.e., if range = max - min, then bounds = [min - 0.5×range, max + 0.5×range]).

**Validates: Requirements 1.8, 7.2, 7.3, 10.8**

### Property 7: Smart Label Positioning
*For any* label at position (x, y) in a visualization, the label offset should position the label at least 15° away from both horizontal and vertical axes to prevent overlap.

**Validates: Requirements 7.4**

### Property 8: Scenario Content Requirements
*For any* stage scenario in any module, the scenario text should: (1) contain 150-250 words, (2) include at least one Basel location keyword (Roche, Novartis, Rhine, Basel University Hospital, Claraspital), (3) include at least one numeric value with units, and (4) exist in all three languages.

**Validates: Requirements 1.6, 2.6, 3.6, 4.6, 8.4, 9.1, 9.2, 9.3, 9.4, 9.5**

### Property 9: Difficulty Level Independence
*For any* module and any difficulty level selection, the displayed questions should contain only questions matching that exact difficulty level (not cumulative from lower levels).

**Validates: Requirements 6.2**

### Property 10: Difficulty Progression Characteristics
*For any* module, BASIC questions should use only integer values, CORE questions should require multi-step calculations, ADVANCED questions should include conditional logic, and ELITE questions should require strategic synthesis.

**Validates: Requirements 6.3, 6.4, 6.5, 6.6**

### Property 11: Difficulty Change Reset
*For any* difficulty level change, the question index should reset to 0 (first question of new difficulty).

**Validates: Requirements 6.7**

### Property 12: Homepage Module Display
*For any* module link on the homepage, clicking the link should navigate to a URL matching the pattern /chamber/{module-code}.

**Validates: Requirements 5.6**

### Property 13: Module Card Styling Consistency
*For any* two module cards on the homepage, they should share the same CSS class names for card container, title, and description elements.

**Validates: Requirements 5.7**

### Property 14: Language Switching Reactivity
*For any* language change (EN ↔ CN ↔ DE), all displayed text (title, difficulty labels, scenarios, UI buttons) should update to the new language within one render cycle.

**Validates: Requirements 8.2**

### Property 15: German Decimal Format Support
*For any* numeric input in German language mode, entering a value with comma as decimal separator (e.g., "3,14") should be parsed identically to the dot separator version (e.g., "3.14").

**Validates: Requirements 8.7**

### Property 16: LaTeX Text Wrapper for Non-English
*For any* LaTeX formula containing Chinese or German text, the text should be wrapped in \\text{} command to ensure proper rendering.

**Validates: Requirements 8.6**

### Property 17: Color Coding Consistency
*For any* pH value V in acid-base visualizations, the color should be red if V < 7, blue if V > 7, and green if V = 7.

**Validates: Requirements 2.8**

### Property 18: Wave Animation Frame Rate
*For any* wave physics visualization with animation enabled, the animation should maintain at least 60 frames per second during continuous playback.

**Validates: Requirements 7.7, 12.6**

### Property 19: Touch Target Minimum Size
*For any* interactive element (button, input, link), the rendered dimensions should be at least 44×44 pixels to meet touch accessibility standards.

**Validates: Requirements 12.3**

### Property 20: Keyboard Navigation Support
*For any* interactive control in a module, pressing Tab should move focus to the next control, and pressing Enter/Space on a focused button should trigger its action.

**Validates: Requirements 12.4**

### Property 21: Semantic HTML Structure
*For any* module page, the rendered HTML should use semantic elements (header, main, aside, footer, button, nav) rather than generic div elements for structural components.

**Validates: Requirements 12.5**

### Property 22: Lazy Loading Behavior
*For any* visualization component, the component should not be imported or rendered until the module page is navigated to (not on initial app load).

**Validates: Requirements 12.7**

### Property 23: Memoization Optimization
*For any* expensive calculation (bounds, scale, label positions), changing unrelated props should not trigger recalculation (verified by useMemo dependency arrays).

**Validates: Requirements 12.8**

### Property 24: Text Contrast Ratio
*For any* text element on dark background, the contrast ratio between text color and background color should be at least 4.5:1 (WCAG AA standard).

**Validates: Requirements 12.10**

### Property 25: Module Load Performance
*For any* module page navigation, the time from route change to first contentful paint should be less than 2000ms on a standard 3G connection.

**Validates: Requirements 12.1**

## Error Handling

### Input Validation Errors

**Empty Input Handling:**
```typescript
// When user submits without filling all slots
if (anySlotEmpty) {
  return {
    ok: false,
    correct: `${correctAnswer} \\text{ (Empty: ${emptySlotNames.join(', ')})}`
  };
}
```

**Numeric Parsing Errors:**
```typescript
// When user enters non-numeric value for numeric slot
const parsed = parseNumberLike(input);
if (parsed === null) {
  return {
    ok: false,
    correct: `${correctAnswer} \\text{ (Invalid number format)}`
  };
}
```

**Tolerance Validation:**
```typescript
// When answer is outside acceptable tolerance
if (Math.abs(parsed - expected) > tolerance) {
  return {
    ok: false,
    correct: `${correctAnswer} \\text{ (Expected: ${expected} ± ${tolerance})}`
  };
}
```

### Visualization Errors

**Missing Quest Data:**
```typescript
// When visualization receives null quest
if (!quest) {
  return (
    <div className="text-white/60 text-sm">
      No question data available
    </div>
  );
}
```

**Invalid Data Range:**
```typescript
// When all data points are identical (zero range)
const range = Math.max(maxValue - minValue, 10); // Minimum range of 10
const scale = canvasSize / range;
```

**Label Overflow Prevention:**
```typescript
// When labels would extend beyond canvas
const padding = 0.5; // 50% padding ensures labels stay visible
const bounds = {
  min: minValue - range * padding,
  max: maxValue + range * padding,
};
```

### Translation Errors

**Missing Translation Key:**
```typescript
// Fallback to English if translation missing
const text = translations[currentLanguage]?.module?.key ?? 
             translations.EN.module.key;
```

**Incomplete Translation:**
```typescript
// Validate all required keys exist
const requiredKeys = ['title', 'difficulty', 'stages', 'scenarios'];
const missingKeys = requiredKeys.filter(key => !translations[lang][module][key]);
if (missingKeys.length > 0) {
  console.warn(`Missing translations for ${module}: ${missingKeys.join(', ')}`);
}
```

### Module Loading Errors

**Component Import Failure:**
```typescript
// Lazy load with error boundary
const Visualization = lazy(() => 
  import('./Visualization').catch(err => {
    console.error('Failed to load visualization:', err);
    return { default: () => <div>Visualization unavailable</div> };
  })
);
```

**Quest Pool Build Failure:**
```typescript
// Fallback to basic difficulty if build fails
try {
  return buildStagePool(t, difficulty, stage);
} catch (error) {
  console.error('Failed to build quest pool:', error);
  return buildStagePool(t, 'BASIC', stage);
}
```

## Testing Strategy

### Dual Testing Approach

The testing strategy employs both unit tests and property-based tests as complementary approaches:

**Unit Tests** focus on:
- Specific examples demonstrating correct behavior
- Edge cases (empty inputs, boundary values, special characters)
- Integration points between components
- Error conditions and error messages
- Specific UI interactions

**Property-Based Tests** focus on:
- Universal properties that hold for all inputs
- Comprehensive input coverage through randomization
- Invariants that must be maintained
- Round-trip properties (e.g., parse → format → parse)
- Metamorphic properties (relationships between operations)

### Property-Based Testing Configuration

**Library Selection:**
- JavaScript/TypeScript: **fast-check** (recommended for React/Next.js projects)
- Minimum 100 iterations per property test
- Seed-based reproducibility for failed tests

**Test Tagging Format:**
```typescript
describe('Feature: critical-modules-phase1, Property 1: Question Pool Size Consistency', () => {
  it('should have 4-5 questions for any module and difficulty', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('GM1.02', 'SC2.05', 'GP3.01', 'SC2.06'),
        fc.constantFrom('BASIC', 'CORE', 'ADVANCED', 'ELITE'),
        (moduleCode, difficulty) => {
          const pool = buildQuestionPool(moduleCode, difficulty);
          return pool.length >= 4 && pool.length <= 5;
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Test Coverage by Requirement

#### Module Functionality Tests

**GM1.02 - Integral Calculus:**
- Unit: Test specific integrals (∫x dx = x²/2 + C, ∫₀¹ x² dx = 1/3)
- Property: For any polynomial function, integration then differentiation returns original function
- Property: For any definite integral with bounds [a, b], result should equal F(b) - F(a)

**SC2.05 - Acid-Base Chemistry:**
- Unit: Test specific pH calculations (pH of 0.1M HCl = 1, pH of water = 7)
- Property: For any strong acid concentration C, pH = -log₁₀(C)
- Property: For any neutralization reaction, moles of acid should equal moles of base at equivalence point

**GP3.01 - Wave Physics:**
- Unit: Test specific wave calculations (v = fλ with f=2Hz, λ=3m gives v=6m/s)
- Property: For any wave, velocity = frequency × wavelength
- Property: For any standing wave, nodes occur at integer multiples of λ/2

**SC2.06 - Redox Reactions:**
- Unit: Test specific oxidation states (Fe in Fe₂O₃ is +3, O is -2)
- Property: For any balanced redox reaction, total electrons lost = total electrons gained
- Property: For any compound, sum of oxidation states = overall charge

#### Visualization Tests

**Auto-Scaling:**
- Unit: Test with specific data points ([1, 2, 3] should give bounds [-1, 4.5] with 50% padding)
- Property: For any set of points, all points should be within calculated bounds
- Property: For any data range R, padding should equal 0.5 × R on each side

**Label Positioning:**
- Unit: Test specific angles (0°, 45°, 90°, 180°, 270°) for correct offset
- Property: For any point (x, y), label offset angle should be at least 15° from axes
- Property: For any label, distance from point should be constant (25px)

**Color Coding:**
- Unit: Test specific pH values (pH=3 → red, pH=7 → green, pH=11 → blue)
- Property: For any pH < 7, color should be red
- Property: For any pH > 7, color should be blue

#### Translation Tests

**Completeness:**
- Unit: Test specific keys exist (gm1_02.title in EN, CN, DE)
- Property: For any module key, all three languages should have the same set of sub-keys
- Property: For any scenario, word count should be 150-250 in all languages

**Format Support:**
- Unit: Test specific German numbers ("3,14" parses to 3.14)
- Property: For any number N, parsing "N" and "N,..." (German format) should give same result
- Property: For any LaTeX with Chinese text, \\text{} wrapper should be present

#### Performance Tests

**Load Time:**
- Unit: Test specific module loads under 2s
- Property: For any module navigation, time to first contentful paint < 2000ms

**Animation Performance:**
- Unit: Test wave animation maintains 60fps for 5 seconds
- Property: For any animation frame, time between frames should be ≤ 16.67ms (60fps)

**Memoization:**
- Unit: Test specific prop changes don't trigger recalculation
- Property: For any memoized calculation, changing unrelated props should not trigger recomputation

### Test Execution

**Development:**
```bash
npm test                    # Run all tests
npm test -- --watch        # Watch mode for development
npm test -- --coverage     # Generate coverage report
```

**CI/CD Pipeline:**
```bash
npm run test:ci            # Run tests with coverage in CI
npm run build              # Ensure build succeeds
npm run lint               # Check code quality
```

**Property Test Configuration:**
```typescript
// jest.config.js
module.exports = {
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverageFrom: [
    'src/app/chamber/**/*.tsx',
    'src/components/chamber/**/*.tsx',
    'src/hooks/**/*.ts',
    '!**/*.d.ts',
  ],
  coverageThresholds: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

## Implementation Notes

### Module Development Order

**Phase 1 (P0 Priority - Week 1-2):**
1. GM1.02 - Integral Calculus
   - Day 1-2: Page structure, quest data pools, buildStagePool function
   - Day 3-4: Visualization component (2D function graphs with shaded areas)
   - Day 5-6: Translations (EN/CN/DE), scenarios, testing
   - Day 7: Integration, bug fixes, documentation

2. SC2.05 - Acid-Base Chemistry
   - Day 8-9: Page structure, quest data pools, buildStagePool function
   - Day 10-11: Visualization component (pH scale, molecular structures, titration curves)
   - Day 12-13: Translations (EN/CN/DE), scenarios, testing
   - Day 14: Integration, bug fixes, documentation

**Phase 2 (P1 Priority - Week 3-4):**
3. GP3.01 - Wave Physics
   - Similar 7-day cycle

4. SC2.06 - Redox Reactions
   - Similar 7-day cycle

**Phase 3 (Sprint - Week 5):**
5. Homepage Display Fixes
   - Day 1-2: Add missing module links (GP2.02, SC1.05, SC3.05)
   - Day 3: Resolve SB2.02 duplication
   - Day 4: Verify SP3.07 content
   - Day 5: Testing and validation

### Code Quality Standards

**TypeScript:**
- Strict mode enabled
- No `any` types (use `unknown` with type guards)
- Explicit return types for functions
- Interface over type for object shapes

**React:**
- Functional components only
- Custom hooks for reusable logic
- Proper dependency arrays for useEffect/useMemo/useCallback
- Avoid inline function definitions in JSX

**Performance:**
- Lazy load visualization components
- Memoize expensive calculations
- Use React.memo for pure components
- Debounce user input handlers

**Accessibility:**
- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Sufficient color contrast (4.5:1 minimum)

### Deployment Checklist

Before deploying any module:

- [ ] All unit tests pass
- [ ] All property tests pass (100+ iterations each)
- [ ] `npm run build` succeeds without errors
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] All three languages tested in browser
- [ ] All difficulty levels tested
- [ ] All stages tested
- [ ] Visualizations render correctly
- [ ] LaTeX formulas render correctly
- [ ] Mobile responsive design verified
- [ ] Keyboard navigation works
- [ ] Performance metrics meet targets (< 2s load, 60fps animation)
- [ ] Documentation updated

### Known Limitations

1. **Browser Compatibility**: Requires modern browsers with ES2020 support (Chrome 80+, Firefox 75+, Safari 13.1+, Edge 80+)

2. **Mobile Performance**: Complex 3D visualizations may have reduced frame rates on older mobile devices

3. **Offline Support**: Modules require internet connection for initial load (no offline mode)

4. **Screen Reader Support**: Mathematical formulas rendered as images may have limited screen reader accessibility

5. **Translation Quality**: Automated translation tools not used; all translations are manual and may require native speaker review

6. **Data Persistence**: User progress is stored in browser localStorage only (not synced across devices)

### Future Enhancements

1. **Adaptive Difficulty**: Automatically adjust difficulty based on student performance

2. **Progress Tracking**: Comprehensive analytics dashboard for teachers

3. **Collaborative Features**: Multi-player problem-solving modes

4. **Extended Content**: Additional modules for complete curriculum coverage

5. **Mobile App**: Native iOS/Android applications

6. **Offline Mode**: Service worker for offline access to previously loaded modules

7. **Voice Input**: Speech recognition for answer input

8. **Gamification**: Achievements, leaderboards, and rewards system

---

**Document Version**: 1.0  
**Last Updated**: 2026-02-15  
**Status**: Ready for Implementation  
**Next Review**: After P0 modules completion
