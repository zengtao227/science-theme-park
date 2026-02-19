# SP1.01 - Forces Basics Module

## Overview

The SP1.01 Forces Basics module is an interactive educational application that teaches fundamental physics concepts about forces to Sekundarschule Sek 2 students (ages 14-16). The system delivers gamified quests across three progressive stages, with content available in English, Chinese, and German.

## Architecture

The module follows a layered architecture:

```
src/lib/sp1-01/
├── domain/           # Core business logic
│   ├── types.ts      # Type definitions
│   ├── physics.ts    # Force physics calculations
│   ├── validation.ts # Answer validation
│   └── QuestEngine.ts # Quest management
├── data/             # Data layer
│   ├── quests/       # Quest content (JSON)
│   ├── translations/ # Multi-language support
│   ├── questLoader.ts
│   ├── LanguageManager.ts
│   └── ProgressStorage.ts
└── index.ts          # Barrel exports
```

## Features Implemented

### Core Domain Logic
- ✅ Vector mathematics (addition, decomposition, magnitude, angle)
- ✅ Force calculations (resultant, equilibrium checking)
- ✅ Unit conversions (N, kN, MN)
- ✅ Equilibrium analysis

### Validation Engine
- ✅ Numerical answer validation with tolerance
- ✅ Vector answer validation (magnitude + direction)
- ✅ Unit checking
- ✅ Multi-language feedback generation

### Quest Content
- ✅ 25 quests implemented (MVP subset)
  - 15 BASIC quests (Force Concepts)
  - 8 CORE quests (Force Concepts)
  - 1 BASIC quest (Force Composition)
  - 1 CORE quest (Force Equilibrium)
- ✅ 4 Basel scenarios with 150-250 word descriptions
- ✅ Quest progression with prerequisites

### Translation System
- ✅ English, Chinese, German support
- ✅ Language preference persistence
- ✅ Dynamic language switching
- ✅ Multi-language content for all UI elements

### Progress Storage
- ✅ LocalStorage-based persistence
- ✅ Quest completion tracking
- ✅ Stage and difficulty progress
- ✅ Export/import functionality
- ✅ Error handling (quota exceeded, corrupted data)

### Interactive Components
- ✅ LaTeX rendering with KaTeX
- ✅ Force Vector Diagram (interactive)
- ✅ Responsive design (mobile + desktop)
- ✅ Main page with quest flow

## Usage

### Starting the Module

```typescript
import { getQuestEngine, getLanguageManager } from '@/lib/sp1-01';

// Initialize
const questEngine = getQuestEngine();
const languageManager = getLanguageManager();

// Load first quest
const firstQuest = questEngine.getFirstQuest();
questEngine.loadQuest(firstQuest.id);

// Set language
languageManager.setLanguage('en');
```

### Submitting Answers

```typescript
const answer = {
  value: 50,
  units: 'N'
};

const result = await questEngine.submitAnswer(answer);

if (result.isCorrect) {
  // Move to next quest
  const nextQuest = questEngine.getNextQuest();
}
```

### Tracking Progress

```typescript
// Get overall progress
const progress = await questEngine.getOverallProgress();

// Get stage progress
const stageProgress = await questEngine.getStageProgress(Stage.FORCE_CONCEPTS);

// Get difficulty progress
const diffProgress = await questEngine.getDifficultyProgress(Difficulty.BASIC);
```

## Quest Content Structure

Each quest follows this structure:

```json
{
  "id": "SP1.01.001",
  "stage": "FORCE_CONCEPTS",
  "difficulty": "BASIC",
  "type": "NUMERICAL",
  "content": {
    "en": "Question in English",
    "cn": "中文问题",
    "de": "Frage auf Deutsch"
  },
  "validation": {
    "type": "tolerance",
    "correctAnswer": {
      "value": 50,
      "units": "N"
    },
    "tolerance": 0.01
  },
  "feedback": {
    "correct": { "en": "...", "cn": "...", "de": "..." },
    "incorrect": { "en": "...", "cn": "...", "de": "..." }
  },
  "prerequisites": []
}
```

## Basel Scenarios

Four Basel-themed scenarios are included:
1. **Basel Tram Braking Forces** - Tram deceleration at Barfüsserplatz
2. **Rhine River Bridge Cable Tensions** - Mittlere Brücke cable analysis
3. **Basel Münster Tower Structural Forces** - Gothic tower force equilibrium
4. **Basel Marathon Runner Biomechanics** - Running forces and biomechanics

## Testing

The module includes comprehensive validation:
- Unit conversions (N ↔ kN ↔ MN)
- Vector operations (addition, decomposition)
- Equilibrium checking
- Answer validation with tolerance
- Multi-language content consistency

## Future Enhancements

To complete the full specification (65 quests):
1. Add remaining 40 quests across all stages
2. Implement ForceCompositionTool component
3. Implement EquilibriumAnalyzer component
4. Add property-based tests (marked with * in tasks)
5. Add integration tests
6. Enhance visualizations with more interactivity

## Notes

This is an MVP implementation focusing on core functionality. All optional property tests (marked with * in the task list) were skipped for faster delivery. The architecture is designed to easily accommodate the remaining quests and features.

## License

Part of the Science Theme Park educational platform.
