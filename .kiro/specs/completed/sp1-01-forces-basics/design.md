# Design Document: SP1.01 - Forces Basics Module

## Overview

The SP1.01 - Forces Basics module is an interactive educational application that teaches fundamental physics concepts about forces to Sekundarschule Sek 2 students (ages 14-16). The system delivers 65 gamified quests across three progressive stages, with content available in English, Chinese, and German. The architecture follows a component-based design using React/TypeScript, with interactive visualizations built on Canvas/SVG, and content management through a structured JSON-based quest system.

The module aligns with Lehrplan 21 NT.3.1.a (Kräfte) and incorporates Basel-themed scenarios to connect abstract physics concepts to familiar real-world contexts. The design emphasizes immediate feedback, visual learning through interactive tools, and progressive difficulty scaling from basic concepts to complex force system analysis.

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                     Application Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Quest UI   │  │  Language    │  │   Progress   │      │
│  │  Controller  │  │   Manager    │  │   Tracker    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                   Presentation Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ ChamberLayout│  │ Interactive  │  │    LaTeX     │      │
│  │  Component   │  │Visualizations│  │   Renderer   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                      Domain Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    Quest     │  │    Force     │  │  Validation  │      │
│  │    Engine    │  │   Physics    │  │    Engine    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                       Data Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    Quest     │  │   Progress   │  │  Language    │      │
│  │   Content    │  │   Storage    │  │    i18n      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

**Application Layer:**
- Quest UI Controller: Orchestrates quest flow, navigation, and user interactions
- Language Manager: Handles language selection and content translation
- Progress Tracker: Manages quest completion state and unlocking logic

**Presentation Layer:**
- ChamberLayout Component: Responsive container for quest content and visualizations
- Interactive Visualizations: Three tools (force vector diagram, composition tool, equilibrium analyzer)
- LaTeX Renderer: Mathematical notation display using KaTeX or MathJax

**Domain Layer:**
- Quest Engine: Quest state management, progression logic, and difficulty scaling
- Force Physics: Vector mathematics, force calculations, and equilibrium validation
- Validation Engine: Answer checking with tolerance handling and feedback generation

**Data Layer:**
- Quest Content: JSON-based quest definitions with multi-language support
- Progress Storage: LocalStorage/IndexedDB for persistence
- Language i18n: Translation files for EN/CN/DE

## Components and Interfaces

### Quest Data Model

```typescript
interface Quest {
  id: string;                    // Unique identifier (e.g., "SP1.01.001")
  stage: Stage;                  // FORCE_CONCEPTS | FORCE_COMPOSITION | FORCE_EQUILIBRIUM
  difficulty: Difficulty;        // BASIC | CORE | ADVANCED | ELITE
  type: QuestType;              // MULTIPLE_CHOICE | NUMERICAL | VECTOR | INTERACTIVE
  content: MultiLangContent;     // Question text in EN/CN/DE
  scenario?: BaselScenario;      // Optional Basel-themed context
  visualization?: VisualizationType; // Optional interactive tool
  validation: ValidationConfig;  // Answer validation rules
  feedback: FeedbackConfig;      // Success/error messages
  prerequisites: string[];       // Quest IDs that must be completed first
}

interface MultiLangContent {
  en: string;
  cn: string;
  de: string;
}

interface BaselScenario {
  title: MultiLangContent;
  description: MultiLangContent;  // 150-250 words
  imageUrl?: string;
  location: string;
}

interface ValidationConfig {
  type: 'exact' | 'tolerance' | 'vector' | 'equilibrium';
  correctAnswer: Answer;
  tolerance?: number;             // Percentage (e.g., 0.01 for 1%)
  units?: string;
  vectorTolerance?: {
    magnitude: number;
    angle: number;               // Degrees
  };
}

interface Answer {
  value: number | number[] | Vector;
  units?: string;
}

interface Vector {
  magnitude: number;
  angle: number;                 // Degrees from positive x-axis
  components?: {
    x: number;
    y: number;
  };
}
```

### Quest Engine Interface

```typescript
interface QuestEngine {
  // Quest navigation
  loadQuest(questId: string): Quest;
  getCurrentQuest(): Quest;
  getNextQuest(): Quest | null;
  getPreviousQuest(): Quest | null;
  
  // Quest progression
  submitAnswer(answer: Answer): ValidationResult;
  completeQuest(questId: string): void;
  isQuestUnlocked(questId: string): boolean;
  
  // Stage management
  getStageProgress(stage: Stage): StageProgress;
  isStageUnlocked(stage: Stage): boolean;
  
  // Difficulty tracking
  getDifficultyProgress(difficulty: Difficulty): DifficultyProgress;
}

interface ValidationResult {
  isCorrect: boolean;
  feedback: MultiLangContent;
  correctAnswer?: Answer;        // Shown only if incorrect
  explanation?: MultiLangContent;
}

interface StageProgress {
  stage: Stage;
  totalQuests: number;
  completedQuests: number;
  unlockedQuests: number;
}

interface DifficultyProgress {
  difficulty: Difficulty;
  totalQuests: number;
  completedQuests: number;
}
```

### Force Physics Interface

```typescript
interface ForcePhysics {
  // Vector operations
  addVectors(vectors: Vector[]): Vector;
  decomposeVector(vector: Vector): { x: number; y: number };
  calculateMagnitude(x: number, y: number): number;
  calculateAngle(x: number, y: number): number;
  
  // Force-specific calculations
  calculateResultant(forces: Force[]): Force;
  checkEquilibrium(forces: Force[]): boolean;
  resolveForceComponents(force: Force, angle: number): { parallel: number; perpendicular: number };
  
  // Unit conversions
  convertForceUnits(value: number, fromUnit: string, toUnit: string): number;
}

interface Force extends Vector {
  pointOfApplication?: { x: number; y: number };
  label?: string;
}
```

### Interactive Visualization Interface

```typescript
interface InteractiveVisualization {
  // Lifecycle
  initialize(container: HTMLElement, config: VisualizationConfig): void;
  destroy(): void;
  
  // Interaction
  onUserInput(callback: (data: VisualizationData) => void): void;
  updateVisualization(data: VisualizationData): void;
  reset(): void;
  
  // State
  getState(): VisualizationState;
  setState(state: VisualizationState): void;
}

interface VisualizationConfig {
  type: 'force_vector' | 'force_composition' | 'equilibrium_analyzer';
  width: number;
  height: number;
  interactive: boolean;
  showGrid: boolean;
  showComponents: boolean;
  maxForces?: number;
}

interface VisualizationData {
  forces: Force[];
  resultant?: Force;
  isEquilibrium?: boolean;
}
```

### Language Manager Interface

```typescript
interface LanguageManager {
  // Language selection
  setLanguage(lang: 'en' | 'cn' | 'de'): void;
  getCurrentLanguage(): 'en' | 'cn' | 'de';
  
  // Translation
  translate(key: string): string;
  translateContent(content: MultiLangContent): string;
  
  // Persistence
  saveLanguagePreference(): void;
  loadLanguagePreference(): 'en' | 'cn' | 'de';
}
```

### Progress Storage Interface

```typescript
interface ProgressStorage {
  // Quest completion
  saveQuestCompletion(questId: string, result: ValidationResult): Promise<void>;
  getQuestCompletion(questId: string): Promise<QuestCompletion | null>;
  getAllCompletions(): Promise<QuestCompletion[]>;
  
  // Stage progress
  getStageProgress(stage: Stage): Promise<StageProgress>;
  
  // User preferences
  savePreference(key: string, value: any): Promise<void>;
  getPreference(key: string): Promise<any>;
  
  // Data management
  clearProgress(): Promise<void>;
  exportProgress(): Promise<string>;
  importProgress(data: string): Promise<void>;
}

interface QuestCompletion {
  questId: string;
  completedAt: Date;
  attempts: number;
  lastAnswer: Answer;
  wasCorrect: boolean;
}
```

## Data Models

### Quest Content Structure

Quest content is organized in JSON files by stage and difficulty:

```
/content/
  /quests/
    /force-concepts/
      basic.json          (BASIC quests for FORCE_CONCEPTS)
      core.json           (CORE quests for FORCE_CONCEPTS)
    /force-composition/
      basic.json
      core.json
      advanced.json
    /force-equilibrium/
      core.json
      advanced.json
      elite.json
  /scenarios/
    basel-scenarios.json  (Basel-themed scenario content)
  /translations/
    en.json
    cn.json
    de.json
```

### Quest Distribution by Stage and Difficulty

| Stage | BASIC | CORE | ADVANCED | ELITE | Total |
|-------|-------|------|----------|-------|-------|
| FORCE_CONCEPTS | 15 | 8 | 0 | 0 | 23 |
| FORCE_COMPOSITION | 5 | 8 | 8 | 0 | 21 |
| FORCE_EQUILIBRIUM | 0 | 4 | 7 | 10 | 21 |
| **Total** | **20** | **20** | **15** | **10** | **65** |

### Progress Data Model

```typescript
interface UserProgress {
  userId?: string;
  lastAccessedQuest: string;
  completedQuests: Set<string>;
  stageProgress: Map<Stage, StageProgress>;
  difficultyProgress: Map<Difficulty, DifficultyProgress>;
  languagePreference: 'en' | 'cn' | 'de';
  questHistory: QuestCompletion[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Force Calculation Models

```typescript
// Vector representation in Cartesian coordinates
interface CartesianVector {
  x: number;
  y: number;
}

// Vector representation in polar coordinates
interface PolarVector {
  magnitude: number;
  angle: number;  // Degrees, measured counterclockwise from positive x-axis
}

// Force with all three elements
interface CompleteForce {
  magnitude: number;
  direction: number;  // Angle in degrees
  pointOfApplication: { x: number; y: number };
  label: string;
  units: string;
}

// Equilibrium analysis result
interface EquilibriumAnalysis {
  isInEquilibrium: boolean;
  netForce: Vector;
  netForceMagnitude: number;
  sumOfXComponents: number;
  sumOfYComponents: number;
  tolerance: number;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Quest Unlocking Progression
*For any* quest with a next quest in the same stage, completing that quest should unlock the next sequential quest.
**Validates: Requirements 1.4**

### Property 2: Stage Unlocking
*For any* stage with a next stage, completing all quests in that stage should unlock the next stage.
**Validates: Requirements 1.5**

### Property 3: Multi-Language Content Consistency
*For any* quest and any supported language (EN/CN/DE), selecting that language should display all quest content, UI elements, and instructions in that language.
**Validates: Requirements 2.2**

### Property 4: Mathematical Notation Language Independence
*For any* mathematical expression, rendering it in different languages should produce identical output.
**Validates: Requirements 2.3, 8.4**

### Property 5: State Preservation Across Language Changes
*For any* user progress state and any language change, the progress state should remain unchanged after the language switch.
**Validates: Requirements 2.4**

### Property 6: Preference Persistence Round-Trip
*For any* language preference or user setting, saving then loading should return the same preference value.
**Validates: Requirements 2.5, 12.3**

### Property 7: Basel Scenario Word Count Constraint
*For any* Basel scenario, the context text word count should be between 150 and 250 words (inclusive).
**Validates: Requirements 3.3**

### Property 8: Basel Scenario Visual Content
*For any* Basel scenario, there should be associated visual content (image URL or visual context).
**Validates: Requirements 3.5**

### Property 9: Unit Validation in Force Answers
*For any* force concept question that requires units, the validation should check both the numerical value and the unit correctness.
**Validates: Requirements 4.4**

### Property 10: Feedback Provision for All Answers
*For any* answer submission (correct or incorrect), the system should provide feedback with appropriate messaging.
**Validates: Requirements 4.5, 11.2, 11.3**

### Property 11: Numerical Tolerance Acceptance
*For any* numerical answer within the specified tolerance range (typically 1-2%) of the correct value, the answer should be accepted as correct.
**Validates: Requirements 5.3, 11.4**

### Property 12: Vector Answer Validation Completeness
*For any* vector answer in force composition or equilibrium problems, validation should check both magnitude and direction correctness.
**Validates: Requirements 5.5, 11.5**

### Property 13: Equilibrium Condition Validation
*For any* equilibrium problem solution, the validation should verify that the sum of all force vectors equals zero (within tolerance).
**Validates: Requirements 6.3**

### Property 14: Interactive Visualization Real-Time Updates
*For any* user interaction with the force vector diagram, the displayed magnitude, direction, and components should update to reflect the current state.
**Validates: Requirements 7.2**

### Property 15: Force Composition Resultant Calculation
*For any* set of input forces in the composition tool, the displayed resultant should equal the vector sum of all input forces.
**Validates: Requirements 7.3**

### Property 16: Equilibrium Analyzer Correctness
*For any* force configuration in the equilibrium analyzer, the equilibrium status indication should correctly reflect whether the forces sum to zero (within tolerance).
**Validates: Requirements 7.4**

### Property 17: LaTeX Rendering Success
*For any* valid LaTeX mathematical notation input, the renderer should produce rendered output without errors.
**Validates: Requirements 8.1**

### Property 18: Vector Notation Formatting
*For any* vector notation in LaTeX, the rendered output should include proper formatting (arrows or bold).
**Validates: Requirements 8.2**

### Property 19: Force Equation Unit Inclusion
*For any* force equation with units in the LaTeX input, the rendered output should include those units.
**Validates: Requirements 8.3**

### Property 20: Responsive Layout Adaptation
*For any* screen width between 320px and 2560px, the ChamberLayout should render without breaking or losing functionality.
**Validates: Requirements 9.1**

### Property 21: Layout Mode Appropriate Arrangement
*For any* viewport width, interactive visualizations should be arranged vertically on mobile (<768px) and horizontally on desktop (≥768px) where appropriate.
**Validates: Requirements 9.2, 9.3**

### Property 22: Touch Target Minimum Size
*For any* interactive element on mobile devices, the touch target should be at least 44x44 pixels.
**Validates: Requirements 9.4**

### Property 23: Cross-Platform Functionality Preservation
*For any* functionality available on desktop, the same functionality should be available on mobile (though layout may differ).
**Validates: Requirements 9.5**

### Property 24: Progress Display Accuracy
*For any* stage or difficulty level, the displayed completion count should match the actual number of completed quests.
**Validates: Requirements 10.1, 10.2**

### Property 25: Quest Completion Persistence Round-Trip
*For any* quest completion, saving the completion status then loading it should return the same completion state.
**Validates: Requirements 10.3, 12.1**

### Property 26: Completed Quest Visual Indicators
*For any* completed quest, visual indicators (checkmarks, progress bars) should be displayed in the UI.
**Validates: Requirements 10.4**

### Property 27: Completed Quest Accessibility
*For any* completed quest, the quest should remain accessible for review by the student.
**Validates: Requirements 10.5**

### Property 28: Progress State Persistence Round-Trip
*For any* complete user progress state (including quest completions, stage progress, and attempt history), saving then loading should restore the identical state.
**Validates: Requirements 12.2, 12.4**

### Property 29: Storage Failure Error Handling
*For any* storage operation failure, the system should notify the user and attempt to retry the operation.
**Validates: Requirements 12.5**

## Error Handling

### Validation Errors

**Invalid Answer Format:**
- Detect when user input doesn't match expected format (e.g., text instead of number)
- Provide clear error message: "Please enter a numerical value" (translated)
- Do not count as an incorrect attempt
- Allow user to correct input

**Missing Units:**
- Detect when answer requires units but none provided
- Prompt user: "Please include units (e.g., N, kN, MN)"
- Do not count as incorrect attempt
- Highlight unit input field

**Out of Range Values:**
- Detect physically impossible values (e.g., negative magnitudes)
- Provide feedback: "Force magnitude cannot be negative"
- Count as incorrect attempt with educational feedback

### Storage Errors

**LocalStorage Full:**
- Catch QuotaExceededError
- Notify user: "Storage is full. Some progress may not be saved."
- Attempt to clear old data (keep recent 100 quest completions)
- Retry save operation
- If retry fails, offer export option

**Storage Unavailable:**
- Detect when localStorage is disabled or unavailable
- Notify user: "Progress saving is disabled. Enable browser storage to save progress."
- Continue with in-memory state (session-only)
- Warn before page navigation

**Corrupted Data:**
- Detect when loaded data doesn't match expected schema
- Log error for debugging
- Clear corrupted data
- Start fresh with empty progress
- Notify user: "Progress data was corrupted and has been reset."

### Content Loading Errors

**Quest Content Missing:**
- Detect when quest ID doesn't exist in content files
- Log error with quest ID
- Display fallback message: "This quest is not available yet."
- Disable navigation to missing quest
- Report error to monitoring system

**Translation Missing:**
- Detect when translation key doesn't exist for selected language
- Fall back to English translation
- Log missing translation key
- Display content with fallback indicator
- Continue normal operation

**Image Loading Failure:**
- Detect when Basel scenario image fails to load
- Display placeholder image with scenario title
- Provide alt text description
- Continue with text-only scenario
- Retry image load on user request

### Visualization Errors

**Canvas Not Supported:**
- Detect when browser doesn't support Canvas API
- Fall back to SVG-based visualization
- If SVG also unavailable, show static diagrams
- Notify user of limited interactivity

**Rendering Timeout:**
- Set 5-second timeout for visualization rendering
- If timeout occurs, show error message
- Offer "Retry" button
- Log error with browser/device info
- Continue with non-visual quest content

**Invalid Force Configuration:**
- Detect when user creates impossible force configuration (e.g., division by zero)
- Prevent invalid state from being set
- Show tooltip: "This configuration is not physically valid"
- Reset to last valid state
- Provide guidance on valid ranges

### Network Errors (Future Consideration)

While the current design uses local content, future versions may load content from a server:

**Content Fetch Failure:**
- Implement retry with exponential backoff (3 attempts)
- Cache previously loaded content
- Fall back to cached content if available
- Display offline indicator
- Allow offline mode with cached quests

## Testing Strategy

### Dual Testing Approach

The testing strategy employs both unit tests and property-based tests to ensure comprehensive coverage:

**Unit Tests** focus on:
- Specific examples demonstrating correct behavior
- Edge cases (empty inputs, boundary values, special angles)
- Error conditions and error handling paths
- Integration points between components
- Specific Basel scenario content validation

**Property-Based Tests** focus on:
- Universal properties that hold for all inputs
- Comprehensive input coverage through randomization
- Mathematical correctness across wide input ranges
- State consistency across operations
- Round-trip properties for serialization and persistence

Together, these approaches provide comprehensive coverage where unit tests catch concrete bugs and property tests verify general correctness.

### Property-Based Testing Configuration

**Testing Library:** Use `fast-check` for TypeScript/JavaScript property-based testing

**Test Configuration:**
- Minimum 100 iterations per property test (due to randomization)
- Each property test must reference its design document property
- Tag format: `// Feature: sp1-01-forces-basics, Property {number}: {property_text}`

**Example Property Test Structure:**

```typescript
import fc from 'fast-check';

// Feature: sp1-01-forces-basics, Property 11: Numerical Tolerance Acceptance
test('accepts answers within tolerance range', () => {
  fc.assert(
    fc.property(
      fc.float({ min: 1, max: 1000 }),  // correct answer
      fc.float({ min: 0, max: 0.01 }),  // tolerance (0-1%)
      (correctAnswer, tolerance) => {
        const userAnswer = correctAnswer * (1 + tolerance * 0.5);
        const result = validateNumericalAnswer(userAnswer, correctAnswer, tolerance);
        expect(result.isCorrect).toBe(true);
      }
    ),
    { numRuns: 100 }
  );
});
```

### Unit Testing Strategy

**Component Testing:**
- Test each React component in isolation
- Mock external dependencies (storage, content loading)
- Verify rendering with different props
- Test user interaction handlers
- Verify accessibility attributes

**Domain Logic Testing:**
- Test force physics calculations with known examples
- Test vector operations (addition, decomposition, magnitude, angle)
- Test unit conversions with specific values
- Test equilibrium detection with 2, 3, and 4 force examples
- Test tolerance validation with boundary cases

**Integration Testing:**
- Test quest flow from start to completion
- Test language switching with progress preservation
- Test storage save/load cycles
- Test visualization updates with user interactions
- Test error recovery paths

**Edge Cases to Test:**
- Zero magnitude forces
- Forces at 0°, 90°, 180°, 270° angles
- Forces with very small magnitudes (< 0.001 N)
- Forces with very large magnitudes (> 1,000,000 N)
- Equilibrium with floating-point precision issues
- Empty progress state
- Maximum storage capacity
- Missing translations
- Corrupted storage data

### Test Coverage Goals

- Line coverage: > 80%
- Branch coverage: > 75%
- Function coverage: > 90%
- Property test coverage: 100% of correctness properties

### Testing Tools

- **Unit Testing:** Jest with React Testing Library
- **Property Testing:** fast-check
- **E2E Testing:** Playwright (for future integration)
- **Visual Regression:** Percy or Chromatic (for UI consistency)
- **Accessibility:** axe-core with jest-axe

### Continuous Testing

- Run unit tests on every commit
- Run property tests on every pull request
- Run full test suite before deployment
- Monitor test execution time (target < 30 seconds for unit tests)
- Fail build on any test failure or coverage regression
