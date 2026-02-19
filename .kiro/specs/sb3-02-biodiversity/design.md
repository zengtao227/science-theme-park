# Design Document: SB3.02 Biodiversity Module

## Overview

The SB3.02 Biodiversity Module is an interactive educational application for Sekundarschule Sek 2 students (ages 14-16) that teaches biodiversity concepts through a quest-based learning system. The module presents 60 quests across three stages (SPECIES_DIVERSITY, ECOSYSTEM_DIVERSITY, CONSERVATION) with four difficulty levels (BASIC, CORE, ADVANCED, ELITE). Content is delivered in three languages (English, Chinese, German) with Basel-specific scenarios and interactive visualizations.

The system follows a component-based architecture using React/TypeScript, with the ChamberLayout component providing consistent UI structure. Three interactive visualizations (species diversity calculator, ecosystem map, conservation planner) enable hands-on exploration of biodiversity concepts. All mathematical and scientific notation is rendered using LaTeX for clarity.

## Architecture

### System Components

The module follows a layered architecture:

1. **Presentation Layer**: React components using ChamberLayout for consistent UI
2. **Content Layer**: Quest data, scenario content, and translations stored as structured data
3. **Visualization Layer**: Interactive components for biodiversity exploration
4. **State Management Layer**: Local browser storage for progress persistence
5. **Localization Layer**: i18n system for three-language support

### Technology Stack

- **Frontend Framework**: React with TypeScript
- **UI Components**: ChamberLayout component system
- **Mathematical Rendering**: KaTeX or MathJax for LaTeX support
- **State Management**: React Context API or Zustand for global state
- **Storage**: Browser LocalStorage for progress persistence
- **Internationalization**: react-i18next or similar i18n library
- **Responsive Design**: CSS Grid/Flexbox with mobile-first approach

### Data Flow

```
User Interaction → Component Event Handler → State Update → 
LocalStorage Persistence → UI Re-render → Visual Feedback
```

Language selection flows through:
```
Language Selector → i18n Context Update → All Components Re-render → 
Content Displayed in Selected Language
```

## Components and Interfaces

### Core Components

#### 1. ModuleContainer
```typescript
interface ModuleContainerProps {
  moduleCode: string;
  moduleName: { en: string; cn: string; de: string };
  stages: Stage[];
  currentLanguage: Language;
}
```

Top-level component that orchestrates the entire module, manages stage navigation, and provides language context.

#### 2. StageView
```typescript
interface StageViewProps {
  stage: Stage;
  quests: Quest[];
  onQuestComplete: (questId: string) => void;
  language: Language;
}
```

Displays a single stage with its associated quests, handles quest selection and completion tracking.

#### 3. QuestCard
```typescript
interface QuestCardProps {
  quest: Quest;
  isCompleted: boolean;
  onComplete: () => void;
  language: Language;
}
```

Renders individual quest content, questions, and feedback. Handles quest interaction and completion.

#### 4. BaselScenarioPanel
```typescript
interface BaselScenarioPanelProps {
  scenario: BaselScenario;
  language: Language;
}
```

Displays Basel-specific case studies with localized content (150-250 words).

#### 5. VisualizationContainer
```typescript
interface VisualizationContainerProps {
  type: 'diversity-calculator' | 'ecosystem-map' | 'conservation-planner';
  data: VisualizationData;
  onInteraction: (event: InteractionEvent) => void;
  language: Language;
}
```

Wrapper for interactive visualizations with consistent interface and responsive behavior.

### Data Models

#### Quest Model
```typescript
interface Quest {
  id: string;
  stageId: string;
  difficulty: 'BASIC' | 'CORE' | 'ADVANCED' | 'ELITE';
  title: LocalizedString;
  description: LocalizedString;
  content: QuestContent;
  questions: Question[];
  feedback: LocalizedString;
}

interface QuestContent {
  text: LocalizedString;
  latex?: string[];
  images?: string[];
}

interface Question {
  id: string;
  type: 'multiple-choice' | 'short-answer' | 'matching';
  prompt: LocalizedString;
  options?: LocalizedString[];
  correctAnswer: string | string[];
  explanation: LocalizedString;
}
```

#### Stage Model
```typescript
interface Stage {
  id: string;
  name: 'SPECIES_DIVERSITY' | 'ECOSYSTEM_DIVERSITY' | 'CONSERVATION';
  title: LocalizedString;
  description: LocalizedString;
  questIds: string[];
  order: number;
}
```

#### Basel Scenario Model
```typescript
interface BaselScenario {
  id: string;
  title: LocalizedString;
  content: LocalizedString; // 150-250 words
  location: string;
  relatedConcepts: string[];
  images?: string[];
}
```

#### Localization Model
```typescript
type Language = 'en' | 'cn' | 'de';

interface LocalizedString {
  en: string;
  cn: string;
  de: string;
}
```

#### Progress Model
```typescript
interface UserProgress {
  moduleId: string;
  completedQuests: string[];
  currentStage: string;
  lastAccessed: Date;
  language: Language;
}
```

### Visualization Interfaces

#### Species Diversity Calculator
```typescript
interface DiversityCalculatorData {
  species: SpeciesEntry[];
  totalIndividuals: number;
}

interface SpeciesEntry {
  name: LocalizedString;
  count: number;
  imageUrl?: string;
}

interface DiversityMetrics {
  speciesRichness: number;
  shannonIndex: number;
  simpsonIndex: number;
  evenness: number;
}
```

Calculates and displays biodiversity indices based on user-input species data.

#### Ecosystem Map
```typescript
interface EcosystemMapData {
  regions: EcosystemRegion[];
  selectedRegion?: string;
}

interface EcosystemRegion {
  id: string;
  name: LocalizedString;
  type: string;
  biodiversityScore: number;
  keySpecies: string[];
  threats: string[];
  coordinates: { lat: number; lng: number };
}
```

Interactive map showing Basel region ecosystems with biodiversity information.

#### Conservation Planner
```typescript
interface ConservationPlannerData {
  threats: Threat[];
  strategies: Strategy[];
  budget: number;
}

interface Threat {
  id: string;
  name: LocalizedString;
  severity: number;
  affectedSpecies: string[];
}

interface Strategy {
  id: string;
  name: LocalizedString;
  cost: number;
  effectiveness: number;
  addressedThreats: string[];
}

interface ConservationPlan {
  selectedStrategies: string[];
  totalCost: number;
  expectedImpact: number;
}
```

Tool for designing conservation plans by selecting strategies within budget constraints.

## Data Models

### Quest Distribution

The 60 quests are distributed as follows:

**Stage 1: SPECIES_DIVERSITY (20 quests)**
- BASIC: 6 quests (species identification, basic diversity concepts)
- CORE: 7 quests (diversity indices, richness vs evenness)
- ADVANCED: 5 quests (comparative analysis, diversity patterns)
- ELITE: 2 quests (comprehensive diversity assessment)

**Stage 2: ECOSYSTEM_DIVERSITY (20 quests)**
- BASIC: 5 quests (habitat types, ecosystem identification)
- CORE: 7 quests (ecosystem services, habitat analysis)
- ADVANCED: 5 quests (ecosystem interactions, service valuation)
- ELITE: 3 quests (ecosystem management planning)

**Stage 3: CONSERVATION (20 quests)**
- BASIC: 4 quests (threats identification, basic conservation concepts)
- CORE: 6 quests (conservation strategies, threat assessment)
- ADVANCED: 5 quests (case study analysis, strategy evaluation)
- ELITE: 5 quests (comprehensive conservation plan design)

### Basel Scenarios

Four scenarios are included:

1. **Basel Zoo Conservation Programs**: Focus on ex-situ conservation, breeding programs, and species reintroduction efforts
2. **Rhine River Ecosystem Biodiversity**: Explore aquatic biodiversity, riparian habitats, and river ecosystem services
3. **Basel Botanical Garden Species Collection**: Examine plant diversity, seed banking, and botanical conservation
4. **Swiss Alps Biodiversity Hotspots**: Investigate alpine ecosystems, endemic species, and climate change impacts

Each scenario is 150-250 words and includes:
- Context and location description
- Key biodiversity features
- Conservation challenges
- Connections to module concepts

### Content Storage Structure

```typescript
// Content organized by language and stage
const moduleContent = {
  metadata: {
    code: 'SB3.02',
    name: { en: 'BIODIVERSITY', cn: '生物多样性', de: 'BIODIVERSITÄT' },
    targetAge: '14-16',
    lehrplanAlignment: 'NT.8.2'
  },
  stages: Stage[],
  quests: Quest[],
  scenarios: BaselScenario[],
  visualizations: VisualizationConfig[]
};
```

Content files organized as:
```
/content
  /quests
    /species-diversity
      basic-001.json
      core-001.json
      ...
    /ecosystem-diversity
      ...
    /conservation
      ...
  /scenarios
    basel-zoo.json
    rhine-river.json
    botanical-garden.json
    swiss-alps.json
  /translations
    en.json
    cn.json
    de.json
```


## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: Stage Ordering Invariant

*For any* quest system configuration, the stages should always be ordered as SPECIES_DIVERSITY (order 1), ECOSYSTEM_DIVERSITY (order 2), and CONSERVATION (order 3).

**Validates: Requirements 2.4**

### Property 2: Basel Scenario Word Count Bounds

*For any* Basel scenario in any language, the word count of the content should be between 150 and 250 words inclusive.

**Validates: Requirements 3.6**

### Property 3: Language Consistency Across Content

*For any* selected language (English, Chinese, or German) and any content type (quest, scenario, visualization label), all displayed content should be in the selected language with no mixing of languages.

**Validates: Requirements 5.2, 5.3, 5.4**

### Property 4: LaTeX Rendering for Mathematical Content

*For any* content containing mathematical formulas or scientific notation, the rendering system should use LaTeX formatting to display the content.

**Validates: Requirements 6.1, 6.2**

### Property 5: Progress Persistence Round Trip

*For any* set of completed quests, persisting the progress state and then restoring it should produce an equivalent progress state with the same completed quests.

**Validates: Requirements 10.1, 10.2**

### Property 6: Language Switch Preserves Progress

*For any* progress state and any language switch operation, the set of completed quests should remain unchanged after the language switch.

**Validates: Requirements 10.3**

## Error Handling

### Quest Loading Errors

**Scenario**: Quest data fails to load from content files
- **Handling**: Display user-friendly error message in current language
- **Recovery**: Provide retry mechanism, fall back to cached content if available
- **Logging**: Log error details for debugging (quest ID, error type, timestamp)

### Language Loading Errors

**Scenario**: Translation data for selected language is unavailable
- **Handling**: Fall back to English as default language
- **User Notification**: Display message indicating fallback language is being used
- **Recovery**: Attempt to reload translations in background

### Visualization Rendering Errors

**Scenario**: Interactive visualization fails to render or crashes
- **Handling**: Display error boundary with fallback UI
- **User Experience**: Show static image or simplified version of visualization
- **Recovery**: Provide "Reload Visualization" button

### LocalStorage Quota Exceeded

**Scenario**: Browser storage limit reached when persisting progress
- **Handling**: Implement storage cleanup strategy (remove oldest data)
- **User Notification**: Warn user about storage limitations
- **Fallback**: Use in-memory storage for current session

### Invalid Quest Data

**Scenario**: Quest data structure is malformed or missing required fields
- **Handling**: Validate quest data on load, skip invalid quests
- **User Experience**: Log validation errors, continue with valid quests
- **Development**: Provide detailed validation error messages in development mode

### LaTeX Rendering Failures

**Scenario**: LaTeX formula fails to parse or render
- **Handling**: Display raw LaTeX string with error indicator
- **User Notification**: Show "Formula rendering error" message
- **Fallback**: Render as plain text if LaTeX library unavailable

### Network Errors (Future Enhancement)

**Scenario**: Content loaded from remote server fails
- **Handling**: Use service worker for offline caching
- **User Experience**: Display offline mode indicator
- **Recovery**: Sync progress when connection restored

## Testing Strategy

### Dual Testing Approach

The module will use both unit testing and property-based testing to ensure comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, and error conditions
- **Property tests**: Verify universal properties across all inputs

Together, these approaches provide comprehensive coverage where unit tests catch concrete bugs and property tests verify general correctness.

### Unit Testing

Unit tests will focus on:

1. **Component Rendering**: Verify each component renders correctly with valid props
2. **User Interactions**: Test button clicks, form submissions, navigation
3. **Edge Cases**: Empty quest lists, missing translations, invalid data
4. **Error Boundaries**: Verify error handling displays appropriate messages
5. **Integration Points**: Test component communication and data flow

Example unit tests:
- QuestCard renders with all required elements (title, description, questions)
- Language selector updates context and triggers re-render
- Progress persistence saves to LocalStorage on quest completion
- Basel scenario displays exactly 4 scenarios
- Visualization container handles missing data gracefully

### Property-Based Testing

Property-based testing will be implemented using **fast-check** (for TypeScript/JavaScript). Each property test will:
- Run a minimum of 100 iterations
- Generate random valid inputs
- Verify the property holds for all generated inputs
- Reference the design document property in a comment tag

**Property Test Configuration**:
```typescript
import fc from 'fast-check';

// Example property test structure
describe('Feature: sb3-02-biodiversity, Property 1: Stage Ordering Invariant', () => {
  it('should maintain stage order across all configurations', () => {
    fc.assert(
      fc.property(
        fc.array(stageArbitrary, { minLength: 3, maxLength: 3 }),
        (stages) => {
          const orderedStages = sortStagesByOrder(stages);
          return (
            orderedStages[0].name === 'SPECIES_DIVERSITY' &&
            orderedStages[1].name === 'ECOSYSTEM_DIVERSITY' &&
            orderedStages[2].name === 'CONSERVATION'
          );
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

**Property Tests to Implement**:

1. **Stage Ordering Invariant** (Property 1)
   - Generate random stage configurations
   - Verify order is always correct
   - Tag: `Feature: sb3-02-biodiversity, Property 1: Stage Ordering Invariant`

2. **Basel Scenario Word Count Bounds** (Property 2)
   - Generate random scenarios with content in all languages
   - Verify word count is 150-250 for each language
   - Tag: `Feature: sb3-02-biodiversity, Property 2: Basel Scenario Word Count Bounds`

3. **Language Consistency Across Content** (Property 3)
   - Generate random content selections and language choices
   - Verify no language mixing occurs
   - Tag: `Feature: sb3-02-biodiversity, Property 3: Language Consistency Across Content`

4. **LaTeX Rendering for Mathematical Content** (Property 4)
   - Generate random content with LaTeX formulas
   - Verify LaTeX renderer is invoked for all mathematical content
   - Tag: `Feature: sb3-02-biodiversity, Property 4: LaTeX Rendering for Mathematical Content`

5. **Progress Persistence Round Trip** (Property 5)
   - Generate random progress states
   - Persist and restore, verify equivalence
   - Tag: `Feature: sb3-02-biodiversity, Property 5: Progress Persistence Round Trip`

6. **Language Switch Preserves Progress** (Property 6)
   - Generate random progress states and language switches
   - Verify completed quests remain unchanged
   - Tag: `Feature: sb3-02-biodiversity, Property 6: Language Switch Preserves Progress`

### Test Data Generators

Custom arbitraries for property-based testing:

```typescript
// Generate valid quests
const questArbitrary = fc.record({
  id: fc.uuid(),
  stageId: fc.constantFrom('SPECIES_DIVERSITY', 'ECOSYSTEM_DIVERSITY', 'CONSERVATION'),
  difficulty: fc.constantFrom('BASIC', 'CORE', 'ADVANCED', 'ELITE'),
  title: localizedStringArbitrary,
  description: localizedStringArbitrary,
  // ... other fields
});

// Generate localized strings
const localizedStringArbitrary = fc.record({
  en: fc.lorem({ maxCount: 20 }),
  cn: fc.lorem({ maxCount: 20 }),
  de: fc.lorem({ maxCount: 20 })
});

// Generate Basel scenarios with word count constraints
const baselScenarioArbitrary = fc.record({
  id: fc.uuid(),
  title: localizedStringArbitrary,
  content: fc.record({
    en: fc.lorem({ minCount: 150, maxCount: 250, mode: 'words' }),
    cn: fc.lorem({ minCount: 150, maxCount: 250, mode: 'words' }),
    de: fc.lorem({ minCount: 150, maxCount: 250, mode: 'words' })
  }),
  location: fc.string(),
  relatedConcepts: fc.array(fc.string())
});

// Generate progress states
const progressArbitrary = fc.record({
  moduleId: fc.constant('SB3.02'),
  completedQuests: fc.array(fc.uuid(), { maxLength: 60 }),
  currentStage: fc.constantFrom('SPECIES_DIVERSITY', 'ECOSYSTEM_DIVERSITY', 'CONSERVATION'),
  lastAccessed: fc.date(),
  language: fc.constantFrom('en', 'cn', 'de')
});
```

### Testing Tools

- **Unit Testing**: Jest or Vitest
- **Property-Based Testing**: fast-check
- **Component Testing**: React Testing Library
- **E2E Testing** (optional): Playwright or Cypress
- **Coverage**: Istanbul/nyc for code coverage reporting

### Test Organization

```
/tests
  /unit
    /components
      ModuleContainer.test.tsx
      StageView.test.tsx
      QuestCard.test.tsx
      BaselScenarioPanel.test.tsx
      VisualizationContainer.test.tsx
    /utils
      localization.test.ts
      storage.test.ts
  /property
    stage-ordering.property.test.ts
    scenario-word-count.property.test.ts
    language-consistency.property.test.ts
    latex-rendering.property.test.ts
    progress-persistence.property.test.ts
    language-switch-progress.property.test.ts
  /integration
    quest-completion-flow.test.tsx
    language-switching.test.tsx
  /arbitraries
    quest.arbitrary.ts
    scenario.arbitrary.ts
    progress.arbitrary.ts
```

### Continuous Integration

- Run all tests on every commit
- Enforce minimum 80% code coverage
- Run property tests with 100 iterations in CI
- Run extended property tests (1000+ iterations) nightly
- Block merges if any test fails
