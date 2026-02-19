# Design Document: SB1.05 - Animal Classification & Adaptation

## Overview

The SB1.05 module is an interactive educational web application that teaches Basel Sekundarschule students (ages 13-15) about animal classification, adaptation, and behavior through a mixed-mode interface combining practice quests with real-time visualizations. The module follows the Chamber Module Standards with a two-column layout: quest exercises on the left and dynamic visualizations on the right.

The module consists of three stages (ANIMAL_CLASSIFICATION, ADAPTATIONS, BEHAVIOR_EVOLUTION), each with four difficulty levels (BASIC, CORE, ADVANCED, ELITE), providing 60 total quests distributed as: 20 BASIC, 20 CORE, 15 ADVANCED, and 10 ELITE. All content is available in three languages (EN/CN/DE) with Basel-specific scenarios featuring local animals and ecosystems.

The module aligns with Lehrplan 21 NT.7.9 (Tiere) standards and provides comprehensive coverage of:
- Animal kingdom classification (vertebrates vs invertebrates)
- Major animal groups and their characteristics
- Adaptive features for different environments
- Animal behavior basics
- Evolution and adaptation concepts

## Architecture

### Component Hierarchy

```
SB105AnimalClassification (Page Component)
├── ChamberLayout (Layout Container)
│   ├── Header (Title, Language Selector)
│   ├── DifficultySelector (BASIC/CORE/ADVANCED/ELITE)
│   ├── StageSelector (ANIMAL_CLASSIFICATION/ADAPTATIONS/BEHAVIOR_EVOLUTION)
│   ├── Left Panel (Quest Content)
│   │   ├── ScenarioDescription (Basel-specific context)
│   │   ├── QuestDisplay
│   │   │   ├── PromptText
│   │   │   ├── AnimalImage (optional)
│   │   │   ├── CharacteristicsList
│   │   │   └── InputField(s) or MultipleChoice
│   │   └── FeedbackDisplay
│   ├── Right Panel (Visualization)
│   │   └── AnimalVisualization
│   │       ├── ClassificationTreeView
│   │       ├── AdaptationComparisonView
│   │       └── BehaviorSimulatorView
│   └── Footer (Verify/Next Buttons, Progress Indicator)
└── useQuestManager (State Management Hook)
```

### Data Flow

1. **Initialization**: useQuestManager loads quest pool based on initial difficulty and stage
2. **Quest Selection**: System selects first quest from pool and displays it with Basel scenario
3. **Visualization Update**: Right panel updates to show relevant classification tree, adaptation comparison, or behavior simulation
4. **User Interaction**: User answers quest (multiple choice, fill-in, or interactive visualization)
5. **Verification**: User clicks "Verify" → System validates answer → Displays feedback with educational explanation
6. **Navigation**: User clicks "Next" → System loads next quest → Updates visualization
7. **Stage/Difficulty Change**: User changes stage or difficulty → System rebuilds quest pool → Resets to first quest

### State Management

The module uses the `useQuestManager` hook which manages:
- Current difficulty level (BASIC/CORE/ADVANCED/ELITE)
- Current stage (ANIMAL_CLASSIFICATION/ADAPTATIONS/BEHAVIOR_EVOLUTION)
- Quest pool (variable size based on difficulty)
- Current quest index
- User inputs (answers, selections)
- Last verification result
- Quest completion status
- Selected language (EN/CN/DE)


## Components and Interfaces

### 1. SB105AnimalClassification (Main Page Component)

**Purpose**: Root component that orchestrates the entire module

**Props**: None (uses URL routing)

**State**:
- `selectedAnimal: string | null` - Currently selected animal for visualization
- `comparisonAnimals: string[]` - Animals being compared in adaptation view
- `behaviorState: BehaviorState` - Current state of behavior simulation

**Key Methods**:
- `buildStagePool(t, difficulty, stage)` - Generates quest pool for given difficulty and stage
- `handleDifficultyChange(newDifficulty)` - Switches difficulty level
- `handleStageChange(newStage)` - Switches stage
- `handleAnimalSelect(animalId)` - Updates visualization with selected animal

**Responsibilities**:
- Initialize useQuestManager hook
- Build quest pools based on difficulty and stage distribution
- Pass data to ChamberLayout and AnimalVisualization
- Handle language switching via i18n
- Manage visualization state

### 2. AnimalVisualization Component

**Purpose**: Displays visual representations of animal classification, adaptations, and behavior

**Props**:
```typescript
interface AnimalVisualizationProps {
    quest: SB105Quest;
    stage: "ANIMAL_CLASSIFICATION" | "ADAPTATIONS" | "BEHAVIOR_EVOLUTION";
    selectedAnimal?: string;
    translations: {
        classification: string;
        adaptations: string;
        behavior: string;
    };
}
```

**Rendering Logic**:

**Classification Tree View** (ANIMAL_CLASSIFICATION stage):
- Displays hierarchical tree: Kingdom → Phylum → Class → Order
- Highlights current animal's classification path
- Interactive nodes showing characteristics
- Color-coded branches: vertebrates (blue), invertebrates (green)
- Shows scientific names in LaTeX italic format

**Adaptation Comparison View** (ADAPTATIONS stage):
- Side-by-side comparison of 2-3 animals
- Visual representation of adaptive features (body parts, coloration, behavior)
- Environment indicators (desert, arctic, aquatic, forest, alpine)
- Survival advantage explanations
- Interactive feature highlighting

**Behavior Simulator View** (BEHAVIOR_EVOLUTION stage):
- Animated behavior patterns (feeding, migration, mating, defense)
- Environmental context visualization
- Evolutionary timeline showing adaptation development
- Conservation status indicators
- Interactive controls for behavior playback

### 3. Quest Data Structure

```typescript
interface SB105Quest extends Quest {
    id: string;                    // Unique identifier
    difficulty: Difficulty;        // BASIC | CORE | ADVANCED | ELITE
    stage: Stage;                  // ANIMAL_CLASSIFICATION | ADAPTATIONS | BEHAVIOR_EVOLUTION
    animalName: string;            // Common name
    scientificName: string;        // LaTeX formatted: \\textit{Genus species}
    classification?: {             // For classification quests
        kingdom: string;
        phylum: string;
        class: string;
        order?: string;
    };
    adaptations?: Array<{          // For adaptation quests
        feature: string;
        type: "physical" | "behavioral";
        environment: "desert" | "arctic" | "aquatic" | "forest" | "alpine";
        advantage: string;
    }>;
    behavior?: {                   // For behavior quests
        pattern: string;
        purpose: "feeding" | "reproduction" | "defense" | "migration";
        evolutionaryContext: string;
    };
    baselContext: string;          // Basel-specific scenario (150-250 words)
    promptLatex: string;           // Question text
    questionType: "multiple_choice" | "fill_in" | "matching" | "interactive";
    options?: string[];            // For multiple choice
    correctAnswer: string | string[];
    explanation: string;           // Educational feedback
    learningObjective: string;     // Lehrplan 21 alignment
}
```


### 4. Quest Pool Generation

**buildStagePool Function**:

```typescript
function buildStagePool(
    t: TranslationType,
    difficulty: Difficulty,
    stage: Stage
): SB105Quest[]
```

**Logic**:
1. Select quest count based on difficulty:
   - BASIC: 20 quests total (distributed across 3 stages)
   - CORE: 20 quests total (distributed across 3 stages)
   - ADVANCED: 15 quests total (distributed across 3 stages)
   - ELITE: 10 quests total (distributed across 3 stages)

2. Distribute quests across stages:
   - ANIMAL_CLASSIFICATION: 40% of quests per difficulty
   - ADAPTATIONS: 35% of quests per difficulty
   - BEHAVIOR_EVOLUTION: 25% of quests per difficulty

3. Select appropriate content based on stage and difficulty
4. Generate quest objects with Basel scenarios
5. Return quest array for current stage

**Data Organization**:
- Total: 65 quests (20 BASIC + 20 CORE + 15 ADVANCED + 10 ELITE)
- Per stage distribution ensures comprehensive coverage
- Each quest includes Basel-specific context

## Data Models

### Animal Classification Data

**BASIC Difficulty**: Simple identification of major groups
```typescript
{
    animalName: "Dog",
    scientificName: "\\textit{Canis familiaris}",
    classification: { kingdom: "Animalia", phylum: "Chordata", class: "Mammalia" },
    characteristics: ["warm-blooded", "fur", "live birth", "milk production"],
    correctAnswer: "Mammalia"
}
```

**CORE Difficulty**: Distinguishing between similar groups
```typescript
{
    animalName: "Frog",
    scientificName: "\\textit{Rana temporaria}",
    classification: { kingdom: "Animalia", phylum: "Chordata", class: "Amphibia" },
    characteristics: ["cold-blooded", "moist skin", "metamorphosis", "eggs in water"],
    correctAnswer: "Amphibia",
    confusers: ["Reptilia", "Pisces"]  // Similar groups to distinguish
}
```

**ADVANCED Difficulty**: Multiple classification criteria
```typescript
{
    animalName: "Octopus",
    scientificName: "\\textit{Octopus vulgaris}",
    classification: { kingdom: "Animalia", phylum: "Mollusca", class: "Cephalopoda", order: "Octopoda" },
    characteristics: ["invertebrate", "eight arms", "beak", "ink sac", "three hearts"],
    correctAnswer: ["Mollusca", "Cephalopoda"],
    requiresMultipleAnswers: true
}
```

**ELITE Difficulty**: Evolutionary relationships and conservation
```typescript
{
    animalName: "European Lynx",
    scientificName: "\\textit{Lynx lynx}",
    classification: { kingdom: "Animalia", phylum: "Chordata", class: "Mammalia", order: "Carnivora" },
    evolutionaryContext: "Evolved from common ancestor with domestic cats 10 million years ago",
    conservationStatus: "Near Threatened",
    swissContext: "Reintroduced to Swiss Alps in 1970s",
    correctAnswer: "Carnivora"
}
```

### Adaptation Data

**BASIC Difficulty**: Identifying obvious adaptations
```typescript
{
    animalName: "Polar Bear",
    scientificName: "\\textit{Ursus maritimus}",
    environment: "arctic",
    adaptations: [
        { feature: "thick white fur", type: "physical", advantage: "insulation and camouflage" },
        { feature: "large paws", type: "physical", advantage: "walking on ice and swimming" }
    ],
    correctAnswer: "arctic"
}
```

**CORE Difficulty**: Matching adaptations to environments
```typescript
{
    animalName: "Camel",
    scientificName: "\\textit{Camelus dromedarius}",
    environment: "desert",
    adaptations: [
        { feature: "hump stores fat", type: "physical", advantage: "energy reserve without water" },
        { feature: "wide feet", type: "physical", advantage: "walking on sand" },
        { feature: "closes nostrils", type: "behavioral", advantage: "prevents sand inhalation" }
    ],
    correctAnswer: ["hump stores fat", "wide feet", "closes nostrils"]
}
```

**ADVANCED Difficulty**: Complex adaptation analysis
```typescript
{
    animalName: "Alpine Ibex",
    scientificName: "\\textit{Capra ibex}",
    environment: "alpine",
    adaptations: [
        { feature: "split hooves", type: "physical", advantage: "grip on steep rocky terrain" },
        { feature: "thick coat", type: "physical", advantage: "insulation at high altitude" },
        { feature: "seasonal migration", type: "behavioral", advantage: "access to food year-round" }
    ],
    baselContext: "Found in Swiss Alps near Basel, observable at Basel Zoo",
    correctAnswer: "All three adaptations work together for alpine survival"
}
```

**ELITE Difficulty**: Evolutionary adaptation and conservation
```typescript
{
    animalName: "Rhine Salmon",
    scientificName: "\\textit{Salmo salar}",
    environment: "aquatic",
    adaptations: [
        { feature: "osmoregulation", type: "physical", advantage: "survives in both fresh and salt water" },
        { feature: "homing behavior", type: "behavioral", advantage: "returns to birthplace to spawn" }
    ],
    evolutionaryContext: "Evolved anadromous lifecycle over millions of years",
    conservationStatus: "Locally extinct in Rhine, reintroduction efforts ongoing",
    baselContext: "Historical Rhine River population, Basel conservation project",
    correctAnswer: "Osmoregulation and homing behavior evolved together"
}
```


### Behavior and Evolution Data

**BASIC Difficulty**: Identifying basic behaviors
```typescript
{
    animalName: "Robin",
    scientificName: "\\textit{Erithacus rubecula}",
    behavior: {
        pattern: "territorial singing",
        purpose: "defense",
        description: "Males sing to establish territory boundaries"
    },
    correctAnswer: "defense"
}
```

**CORE Difficulty**: Connecting behavior to survival
```typescript
{
    animalName: "European Hedgehog",
    scientificName: "\\textit{Erinaceus europaeus}",
    behavior: {
        pattern: "hibernation",
        purpose: "survival",
        description: "Enters torpor during winter when food is scarce",
        physiologicalChanges: ["lowered heart rate", "reduced body temperature"]
    },
    baselContext: "Common in Basel gardens and parks",
    correctAnswer: "Hibernation conserves energy when insects are unavailable"
}
```

**ADVANCED Difficulty**: Behavioral adaptation analysis
```typescript
{
    animalName: "European Bee-eater",
    scientificName: "\\textit{Merops apiaster}",
    behavior: {
        pattern: "seasonal migration",
        purpose: "feeding",
        description: "Migrates from Europe to Africa following insect availability",
        distance: "10,000 km round trip"
    },
    evolutionaryContext: "Migration pattern evolved to track seasonal insect populations",
    correctAnswer: "Migration maximizes food availability year-round"
}
```

**ELITE Difficulty**: Evolution, adaptation, and conservation synthesis
```typescript
{
    animalName: "European Beaver",
    scientificName: "\\textit{Castor fiber}",
    behavior: {
        pattern: "dam building",
        purpose: "habitat modification",
        description: "Constructs dams to create deep water habitat",
        ecosystemImpact: "Creates wetlands benefiting multiple species"
    },
    evolutionaryContext: "Dam-building behavior evolved over 20 million years",
    conservationStatus: "Recovered from near extinction",
    baselContext: "Reintroduced to Basel region, now thriving along Rhine tributaries",
    correctAnswer: "Dam building is an evolved behavior that creates ecosystem benefits and demonstrates successful conservation"
}
```

### Basel-Specific Scenarios

**Scenario 1: Basel Zoo Animals** (ANIMAL_CLASSIFICATION stage)
```
Basel Zoo Biodiversity Tour: You are a student guide at Basel Zoo (Zolli), 
preparing an educational tour about animal classification. The zoo houses over 
600 species from all major animal groups. Your task is to create a classification 
guide for visitors.

Today you're focusing on the African Savanna exhibit, which includes lions 
(Panthera leo), zebras (Equus quagga), and ostriches (Struthio camelus). You 
need to explain how these animals are classified into different groups despite 
living in the same habitat.

The zoo's education program emphasizes understanding that classification is based 
on evolutionary relationships and shared characteristics, not just where animals 
live. This helps visitors appreciate biodiversity and the importance of 
conservation efforts.

Your task: Classify each animal into its correct class (Mammalia, Aves, or 
Reptilia) and explain the key characteristics that define each group.

This knowledge helps zoo visitors understand why conservation strategies must 
consider each species' unique biological needs based on their classification.
```

**Scenario 2: Rhine River Ecosystem** (ADAPTATIONS stage)
```
Rhine River Ecosystem Research: You are part of a Basel University research team 
studying the Rhine River ecosystem. The Rhine flows through Basel and supports 
diverse aquatic and riparian life despite being one of Europe's busiest waterways.

Your team is documenting how different animals have adapted to life in and around 
the river. You're comparing three species: the European eel (Anguilla anguilla) 
that migrates thousands of kilometers, the grey heron (Ardea cinerea) that hunts 
in shallow water, and the European beaver (Castor fiber) that was recently 
reintroduced.

Each species has unique adaptations for the aquatic environment. The eel can 
survive in both fresh and salt water, the heron has specialized hunting 
adaptations, and the beaver modifies its habitat through dam building.

Your task: Identify and explain the specific adaptations each animal uses to 
survive in the Rhine River ecosystem, and explain how these adaptations provide 
survival advantages.

Understanding these adaptations helps inform conservation efforts to maintain 
biodiversity in the Rhine, which is crucial for Basel's environmental health.
```

**Scenario 3: Alpine Animals in Swiss Mountains** (ADAPTATIONS stage)
```
Swiss Alps Biodiversity Study: You are participating in a field study of alpine 
animals in the Swiss mountains near Basel. The alpine environment presents extreme 
challenges: low oxygen, cold temperatures, steep terrain, and seasonal food 
scarcity.

Your study focuses on three iconic Swiss alpine species: the Alpine ibex (Capra 
ibex) with its remarkable climbing ability, the Alpine marmot (Marmota marmota) 
that hibernates for 6-7 months, and the Golden eagle (Aquila chrysaetos) that 
hunts across vast territories.

Each species has evolved specific adaptations for alpine survival. The ibex has 
split hooves for grip on rocks, the marmot has physiological adaptations for 
hibernation, and the eagle has exceptional vision and flight adaptations for 
hunting in mountainous terrain.

Your task: Analyze how each animal's adaptations specifically address the 
challenges of the alpine environment (low oxygen, cold, steep terrain, limited 
food).

This research contributes to understanding how climate change affects alpine 
species and informs conservation strategies for Switzerland's mountain ecosystems.
```

**Scenario 4: Local Wildlife Conservation** (BEHAVIOR_EVOLUTION stage)
```
Basel Region Wildlife Conservation Project: You are working with the Basel 
Cantonal Nature Conservation Office on a project to protect and restore local 
wildlife populations. The Basel region has seen significant changes in wildlife 
over the past century due to urbanization and habitat loss.

Your project focuses on three conservation success stories: the European beaver 
(Castor fiber) reintroduced in the 1970s and now thriving, the peregrine falcon 
(Falco peregrinus) that has adapted to nesting on Basel's tall buildings, and 
the European lynx (Lynx lynx) slowly returning to Swiss forests.

Each species demonstrates different aspects of conservation biology. The beaver 
shows successful reintroduction, the falcon shows urban adaptation, and the lynx 
shows natural recolonization. Understanding their behaviors and evolutionary 
adaptations is crucial for conservation planning.

Your task: Analyze how each species' behavior and evolutionary history influences 
conservation strategies, and explain why understanding evolution is essential for 
effective wildlife management.

This work directly contributes to Basel's biodiversity goals and demonstrates how 
scientific understanding of animal behavior and evolution informs real-world 
conservation decisions that benefit both wildlife and human communities.
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Quest Pool Structure Consistency

*For any* combination of difficulty level and stage, the generated quest pool should contain the correct number of quests according to the distribution: BASIC stages should have 6-7 quests each, CORE stages should have 6-7 quests each, ADVANCED stages should have 5 quests each, and ELITE stages should have 3-4 quests each.

**Validates: Requirements 1.2, 1.3, 1.4**

### Property 2: Quest Object Completeness

*For any* generated quest, the quest object should contain all required fields: id, difficulty, stage, animalName, scientificName, baselContext, promptLatex, questionType, correctAnswer, explanation, and learningObjective.

**Validates: Requirements 1.4, 10.4**

### Property 3: Scientific Name LaTeX Formatting

*For any* quest containing a scientific name, the name should be formatted using LaTeX italic notation (\\textit{Genus species}) consistently across all three languages (EN, CN, DE).

**Validates: Requirements 2.5, 7.5**

### Property 4: Adaptation Survival Advantage Explanation

*For any* quest in the ADAPTATIONS stage that presents an adaptive feature, the quest should include an explanation of the survival advantage that feature provides in the specified environment.

**Validates: Requirements 3.3, 3.4**

### Property 5: Translation Completeness

*For any* quest, UI element, or Basel scenario, complete translations should exist for all three supported languages (EN, CN, DE), including all text fields, labels, and instructions.

**Validates: Requirements 7.2, 7.4, 6.7**

### Property 6: Basel Scenario Word Count

*For any* Basel scenario text, the word count should be between 150 and 250 words to ensure adequate contextual detail without overwhelming students.

**Validates: Requirements 6.6**

### Property 7: Visualization Interaction Feedback

*For any* user interaction with a visualization component (clicking a node, selecting an animal, triggering a behavior), the system should provide immediate visual or textual feedback within 100ms.

**Validates: Requirements 5.5, 8.5**

### Property 8: Difficulty Progression Content Focus

*For any* quest at a given difficulty level, the content focus should match the specified criteria: BASIC focuses on identification, CORE on recognition and matching, ADVANCED on analysis, and ELITE on synthesis and conservation.

**Validates: Requirements 9.1, 9.2, 9.3, 9.4**

### Property 9: Answer Verification Accuracy

*For any* user answer submission, the verification should correctly determine if the answer matches the expected answer (exact match for text, case-insensitive for animal names, array comparison for multiple answers).

**Validates: Requirements 8.2**

### Property 10: Stage-Specific Visualization Rendering

*For any* quest in a given stage, the visualization component should render the appropriate view: ClassificationTreeView for ANIMAL_CLASSIFICATION, AdaptationComparisonView for ADAPTATIONS, and BehaviorSimulatorView for BEHAVIOR_EVOLUTION.

**Validates: Requirements 5.1, 5.2, 5.3**

## Error Handling

### Input Validation

**Invalid Answer Format**:
- User enters unexpected format (e.g., numbers for text answer)
- System: Accept input, validate against expected answer
- Display appropriate feedback if incorrect

**Empty Input**:
- User clicks "Verify" with empty input field
- System: Display prompt "Please provide an answer before verifying"
- Do not mark as incorrect, allow user to try again

**Multiple Choice Selection**:
- User doesn't select any option
- System: Display prompt "Please select an answer"
- Highlight selection area

### Quest Loading Errors

**Missing Quest Data**:
- Quest pool generation returns fewer quests than expected
- System: Log warning, use available quests
- Display message if no quests available: "Content loading error, please refresh"

**Invalid Quest Structure**:
- Quest object missing required fields
- System: Skip invalid quest, load next valid quest
- Log error with quest ID for debugging

**Missing Translation**:
- Translation key doesn't exist for selected language
- System: Fall back to English translation
- Log warning for missing translation key

### Visualization Errors

**Missing Animal Data**:
- Visualization component receives quest without required animal data
- System: Display placeholder visualization with message "Data loading..."
- Log error for debugging

**Image Loading Failure**:
- Animal image fails to load
- System: Display placeholder icon or silhouette
- Continue with text-based content

**Animation Performance**:
- Browser struggles with complex animations
- System: Detect performance issues, reduce animation complexity
- Maintain functionality without animations if necessary

### Basel Scenario Errors

**Scenario Text Too Long**:
- Scenario exceeds 250 words
- System: Truncate with "..." and "Read more" button
- Full text available on expansion

**Scenario Missing Translation**:
- Basel scenario not translated to selected language
- System: Display English version with language indicator
- Log missing translation for future update


## Testing Strategy

### Unit Testing

**Quest Generation Tests**:
- Test `buildStagePool` function for each stage and difficulty combination
- Verify quest pool sizes match distribution (20 BASIC, 20 CORE, 15 ADVANCED, 10 ELITE)
- Verify quest objects have all required fields
- Verify scientific names use LaTeX formatting
- Verify Basel scenarios are 150-250 words

**Classification Tests**:
- Test vertebrate classification (mammals, birds, reptiles, amphibians, fish)
- Test invertebrate classification (arthropods, mollusks)
- Test characteristic matching for each animal group
- Verify classification hierarchy (kingdom → phylum → class → order)

**Adaptation Tests**:
- Test adaptation-environment matching (desert, arctic, aquatic, forest, alpine)
- Test physical vs behavioral adaptation categorization
- Test survival advantage explanations are present
- Verify adaptation data completeness

**Behavior Tests**:
- Test behavior pattern identification (feeding, reproduction, defense, migration)
- Test behavior-purpose connections
- Test evolutionary context explanations
- Verify conservation status data for ELITE quests

**Translation Tests**:
- Test all translation keys exist for EN, CN, DE
- Test language switching updates all UI text
- Test LaTeX formulas render correctly in all languages
- Test Basel scenarios translated completely

**Answer Verification Tests**:
- Test exact match verification (text answers)
- Test case-insensitive verification (animal names)
- Test array comparison (multiple answers)
- Test partial credit for multi-part questions

### Property-Based Testing

**Configuration**: Use fast-check library for TypeScript, minimum 100 iterations per test

**Property Test 1: Quest Pool Distribution**
```typescript
// Feature: sb1-05-animal-classification, Property 1: Quest pool structure consistency
fc.assert(
  fc.property(
    fc.constantFrom("BASIC", "CORE", "ADVANCED", "ELITE"),
    fc.constantFrom("ANIMAL_CLASSIFICATION", "ADAPTATIONS", "BEHAVIOR_EVOLUTION"),
    (difficulty, stage) => {
      const pool = buildStagePool(mockTranslations, difficulty, stage);
      const expectedCounts = {
        BASIC: { ANIMAL_CLASSIFICATION: 8, ADAPTATIONS: 7, BEHAVIOR_EVOLUTION: 5 },
        CORE: { ANIMAL_CLASSIFICATION: 8, ADAPTATIONS: 7, BEHAVIOR_EVOLUTION: 5 },
        ADVANCED: { ANIMAL_CLASSIFICATION: 6, ADAPTATIONS: 5, BEHAVIOR_EVOLUTION: 4 },
        ELITE: { ANIMAL_CLASSIFICATION: 4, ADAPTATIONS: 3, BEHAVIOR_EVOLUTION: 3 }
      };
      return pool.length === expectedCounts[difficulty][stage];
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 2: Quest Object Completeness**
```typescript
// Feature: sb1-05-animal-classification, Property 2: Quest object completeness
fc.assert(
  fc.property(
    fc.constantFrom("BASIC", "CORE", "ADVANCED", "ELITE"),
    fc.constantFrom("ANIMAL_CLASSIFICATION", "ADAPTATIONS", "BEHAVIOR_EVOLUTION"),
    (difficulty, stage) => {
      const pool = buildStagePool(mockTranslations, difficulty, stage);
      return pool.every(quest => 
        quest.id && 
        quest.difficulty && 
        quest.stage && 
        quest.animalName && 
        quest.scientificName && 
        quest.baselContext && 
        quest.promptLatex && 
        quest.questionType && 
        quest.correctAnswer !== undefined && 
        quest.explanation && 
        quest.learningObjective
      );
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 3: LaTeX Scientific Name Formatting**
```typescript
// Feature: sb1-05-animal-classification, Property 3: Scientific name LaTeX formatting
fc.assert(
  fc.property(
    fc.constantFrom("BASIC", "CORE", "ADVANCED", "ELITE"),
    fc.constantFrom("ANIMAL_CLASSIFICATION", "ADAPTATIONS", "BEHAVIOR_EVOLUTION"),
    fc.constantFrom("EN", "CN", "DE"),
    (difficulty, stage, language) => {
      const translations = getTranslations(language);
      const pool = buildStagePool(translations, difficulty, stage);
      return pool.every(quest => 
        quest.scientificName.includes("\\textit{") && 
        quest.scientificName.includes("}")
      );
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 4: Adaptation Survival Advantage**
```typescript
// Feature: sb1-05-animal-classification, Property 4: Adaptation survival advantage explanation
fc.assert(
  fc.property(
    fc.constantFrom("BASIC", "CORE", "ADVANCED", "ELITE"),
    (difficulty) => {
      const pool = buildStagePool(mockTranslations, difficulty, "ADAPTATIONS");
      return pool.every(quest => 
        quest.adaptations && 
        quest.adaptations.every(adaptation => 
          adaptation.advantage && 
          adaptation.advantage.length > 10
        )
      );
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 5: Translation Completeness**
```typescript
// Feature: sb1-05-animal-classification, Property 5: Translation completeness
fc.assert(
  fc.property(
    fc.constantFrom("EN", "CN", "DE"),
    fc.constantFrom("BASIC", "CORE", "ADVANCED", "ELITE"),
    fc.constantFrom("ANIMAL_CLASSIFICATION", "ADAPTATIONS", "BEHAVIOR_EVOLUTION"),
    (language, difficulty, stage) => {
      const translations = getTranslations(language);
      const pool = buildStagePool(translations, difficulty, stage);
      return pool.every(quest => 
        quest.promptLatex && 
        quest.explanation && 
        quest.baselContext &&
        translations.sb1_05.title &&
        translations.sb1_05.stages[stage]
      );
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 6: Basel Scenario Word Count**
```typescript
// Feature: sb1-05-animal-classification, Property 6: Basel scenario word count
fc.assert(
  fc.property(
    fc.constantFrom("BASIC", "CORE", "ADVANCED", "ELITE"),
    fc.constantFrom("ANIMAL_CLASSIFICATION", "ADAPTATIONS", "BEHAVIOR_EVOLUTION"),
    (difficulty, stage) => {
      const pool = buildStagePool(mockTranslations, difficulty, stage);
      return pool.every(quest => {
        const wordCount = quest.baselContext.split(/\s+/).length;
        return wordCount >= 150 && wordCount <= 250;
      });
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 7: Answer Verification Correctness**
```typescript
// Feature: sb1-05-animal-classification, Property 9: Answer verification accuracy
fc.assert(
  fc.property(
    fc.constantFrom("BASIC", "CORE", "ADVANCED", "ELITE"),
    fc.constantFrom("ANIMAL_CLASSIFICATION", "ADAPTATIONS", "BEHAVIOR_EVOLUTION"),
    (difficulty, stage) => {
      const pool = buildStagePool(mockTranslations, difficulty, stage);
      return pool.every(quest => {
        // Test exact match
        const exactMatch = verifyAnswer(quest.correctAnswer, quest.correctAnswer);
        // Test case insensitive for animal names
        const caseInsensitive = typeof quest.correctAnswer === 'string' ? 
          verifyAnswer(quest.correctAnswer.toLowerCase(), quest.correctAnswer) : true;
        return exactMatch && caseInsensitive;
      });
    }
  ),
  { numRuns: 100 }
);
```

### Integration Testing

**End-to-End Quest Flow**:
1. Load module → Verify initial quest displays with Basel scenario
2. View classification tree visualization → Verify animal highlighted
3. Enter correct answer → Click "Verify" → Verify success feedback with explanation
4. Click "Next" → Verify next quest loads with updated visualization
5. Complete all quests in stage → Verify stage completion indicator
6. Change difficulty → Verify new quest pool loads with appropriate content
7. Change stage → Verify appropriate visualization displays

**Visualization Synchronization**:
1. Load ANIMAL_CLASSIFICATION quest → Verify classification tree shows animal's path
2. Load ADAPTATIONS quest → Verify comparison view shows adaptive features
3. Load BEHAVIOR_EVOLUTION quest → Verify behavior simulator shows pattern
4. Change quest → Verify visualization updates immediately
5. Interact with visualization → Verify feedback displays

**Language Switching**:
1. Load module in English → Verify all text is English including Basel scenarios
2. Switch to Chinese → Verify all text updates including scientific names in LaTeX
3. Switch to German → Verify all text updates including Basel context
4. Verify LaTeX formulas render consistently across languages
5. Verify Basel scenarios maintain local context in all languages

**Basel Scenario Display**:
1. Load quest → Verify Basel scenario displays (150-250 words)
2. Verify scenario includes specific Basel locations (Zoo, Rhine, Alps)
3. Verify scenario connects to quest content
4. Verify scenario available in all three languages
5. Verify scenario provides educational context

### Browser Testing

**Supported Browsers**:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

**Test Checklist**:
- [ ] Module loads without errors
- [ ] All quests display correctly with Basel scenarios
- [ ] Input fields and multiple choice work
- [ ] Verify button triggers validation
- [ ] Next button advances to next quest
- [ ] Visualizations render (classification tree, adaptation comparison, behavior simulator)
- [ ] Animations play smoothly
- [ ] Language switching works for all content
- [ ] LaTeX formulas render correctly (scientific names in italics)
- [ ] Basel scenarios display completely (150-250 words)
- [ ] Responsive layout works on mobile/tablet
- [ ] No console errors or warnings
- [ ] Images load correctly
- [ ] Progress indicators update

