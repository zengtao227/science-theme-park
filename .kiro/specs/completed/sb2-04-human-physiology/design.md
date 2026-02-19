# Design Document: SB2.04 - Human Physiology

## Overview

The SB2.04 module is an interactive educational web application that teaches Sekundarschule Sek 2 students (ages 14-16) about human physiology through a mixed-mode interface combining practice problems with real-time anatomical visualizations. The module follows the Chamber Module Standards with a two-column layout: quest exercises on the left and dynamic body system visualizations on the right.

The module consists of four stages (Digestive System, Respiratory System, Circulatory System, Excretory System), each with four difficulty levels (BASIC, CORE, ADVANCED, ELITE), providing 75 total quests distributed as: 20 BASIC, 25 CORE, 20 ADVANCED, and 10 ELITE. All content is available in three languages (EN/CN/DE) with Basel-specific scenarios connecting physiology to real-world contexts.

## Architecture

### Component Hierarchy

```
SB204HumanPhysiology (Page Component)
├── ChamberLayout (Layout Container)
│   ├── Header (Title, Language Selector)
│   ├── DifficultySelector (BASIC/CORE/ADVANCED/ELITE)
│   ├── StageSelector (DIGESTIVE/RESPIRATORY/CIRCULATORY/EXCRETORY)
│   ├── Left Panel (Quest Content)
│   │   ├── ScenarioDescription
│   │   ├── QuestDisplay
│   │   │   ├── PromptText
│   │   │   ├── DiagramReference (optional)
│   │   │   └── InputField(s) or MultipleChoice
│   │   └── FeedbackDisplay
│   ├── Right Panel (Visualization)
│   │   └── PhysiologyVisualization
│   │       ├── DigestiveSystemView
│   │       ├── RespiratorySystemView
│   │       ├── CirculatorySystemView
│   │       └── ExcretorySystemView
│   └── Footer (Verify/Next Buttons)
└── useQuestManager (State Management Hook)
```

### Data Flow

1. **Initialization**: useQuestManager loads quest pool based on initial difficulty (BASIC) and stage (DIGESTIVE_SYSTEM)
2. **Quest Selection**: System selects first quest from pool and displays it
3. **User Input**: User enters answer or selects multiple choice option
4. **Verification**: User clicks "Verify" → System compares answer to expected value → Displays feedback
5. **Navigation**: User clicks "Next" → System loads next quest → Updates visualization
6. **Stage/Difficulty Change**: User changes stage or difficulty → System rebuilds quest pool → Resets to first quest

### State Management

The module uses the `useQuestManager` hook which manages:
- Current difficulty level
- Current stage
- Quest pool (variable size based on difficulty)
- Current quest index
- User inputs (key-value pairs)
- Last verification result
- Quest completion status

## Components and Interfaces

### 1. SB204HumanPhysiology (Main Page Component)

**Purpose**: Root component that orchestrates the entire module

**Props**: None (uses URL routing)

**State**:
- `currentOrgan: string` - Current organ being highlighted in visualization
- `currentProcess: string` - Current physiological process being illustrated

**Key Methods**:
- `buildStagePool(t, difficulty, stage)` - Generates quest pool for given difficulty and stage
- `handleDifficultyChange(newDifficulty)` - Switches difficulty level
- `handleStageChange(newStage)` - Switches stage

**Responsibilities**:
- Initialize useQuestManager hook
- Build quest pools based on difficulty and stage
- Pass data to ChamberLayout and PhysiologyVisualization
- Handle language switching via i18n

### 2. PhysiologyVisualization Component

**Purpose**: Displays visual representations of human body systems with interactive anatomy

**Props**:
```typescript
interface PhysiologyVisualizationProps {
    quest: SB204Quest;
    stage: "DIGESTIVE_SYSTEM" | "RESPIRATORY_SYSTEM" | "CIRCULATORY_SYSTEM" | "EXCRETORY_SYSTEM";
    translations: {
        digestive_system: string;
        respiratory_system: string;
        circulatory_system: string;
        excretory_system: string;
    };
}
```

**Rendering Logic**:

**Digestive System View**:
- Displays anatomical diagram of digestive tract from mouth to anus
- Shows organs: mouth, esophagus, stomach, small intestine, large intestine, liver, pancreas, gallbladder
- Highlights active organ based on current quest
- Animates digestion process flow (food movement, enzyme action)
- Uses warm colors: brown for digestive tract, red-brown for liver, yellow for pancreas
- Interactive labels for each organ

**Respiratory System View**:
- Displays anatomical diagram of respiratory system
- Shows organs: nose, trachea, bronchi, lungs, diaphragm, alveoli
- Animates breathing cycle (inhalation/exhalation)
- Shows gas exchange in alveoli with O₂ and CO₂ molecules
- Uses blue for oxygen-rich, red for oxygen-poor
- Diaphragm movement animation

**Circulatory System View**:
- Displays heart anatomy with four chambers
- Shows blood vessels: arteries (red), veins (blue), capillaries
- Animates blood flow through heart chambers and body
- Shows systemic and pulmonary circulation paths
- Heart valve animations (opening/closing)
- Blood composition indicators

**Excretory System View**:
- Displays kidneys, ureters, bladder, urethra
- Shows nephron structure (detailed view)
- Animates filtration process in nephron
- Shows urine formation stages: filtration, reabsorption, secretion
- Uses yellow for urine, blue for filtered blood
- Water balance indicators

### 3. Quest Data Structure

```typescript
interface SB204Quest extends Quest {
    id: string;                    // Unique identifier (e.g., "DIGESTIVE_BASIC_1")
    difficulty: Difficulty;        // BASIC | CORE | ADVANCED | ELITE
    stage: Stage;                  // DIGESTIVE_SYSTEM | RESPIRATORY_SYSTEM | CIRCULATORY_SYSTEM | EXCRETORY_SYSTEM
    questionType: "identification" | "process" | "coordination" | "comprehensive";
    organ?: string;                // Specific organ being tested
    process?: string;              // Physiological process being tested
    promptText: string;            // Question text
    options?: string[];            // Multiple choice options (for identification)
    correctAnswer: string;         // Expected answer
    explanation?: string;          // Explanation of correct answer
    baselScenario?: string;        // Basel-specific context (if applicable)
}
```

### 4. Quest Pool Generation

**buildStagePool Function**:

```typescript
function buildStagePool(
    t: TranslationType,
    difficulty: Difficulty,
    stage: Stage
): SB204Quest[]
```

**Logic**:
1. Select quest count based on difficulty (BASIC: 20, CORE: 25, ADVANCED: 20, ELITE: 10)
2. Distribute quests across 4 stages
3. Select quests based on stage and difficulty
4. Map each data item to a Quest object
5. Return array of quests for current stage

**Data Organization**:
- BASIC: 5 quests per stage × 4 stages = 20 quests (structure identification)
- CORE: 6-7 quests per stage × 4 stages = 25 quests (process analysis)
- ADVANCED: 5 quests per stage × 4 stages = 20 quests (system coordination)
- ELITE: 2-3 quests per stage × 4 stages = 10 quests (comprehensive problems)
- Total: 75 quests

## Data Models

### Digestive System Data

**BASIC (5 quests)**: Organ identification
```typescript
{ organ: "stomach", question: "Which organ stores and breaks down food?", options: ["stomach", "liver", "pancreas"], answer: "stomach" }
{ organ: "small_intestine", question: "Where does most nutrient absorption occur?", options: ["stomach", "small intestine", "large intestine"], answer: "small intestine" }
{ organ: "liver", question: "Which organ produces bile?", options: ["liver", "pancreas", "gallbladder"], answer: "liver" }
{ organ: "pancreas", question: "Which organ produces digestive enzymes and insulin?", options: ["liver", "pancreas", "stomach"], answer: "pancreas" }
{ organ: "esophagus", question: "Which tube connects the mouth to the stomach?", options: ["trachea", "esophagus", "intestine"], answer: "esophagus" }
```

**CORE (6-7 quests)**: Digestion process
```typescript
{ process: "mechanical_digestion", question: "What type of digestion occurs in the mouth through chewing?", answer: "mechanical" }
{ process: "enzyme_action", question: "What breaks down proteins in the stomach?", answer: "pepsin" }
{ process: "bile_function", question: "What does bile do to fats?", answer: "emulsifies" }
{ process: "absorption", question: "What structures in the small intestine increase surface area for absorption?", answer: "villi" }
{ process: "water_absorption", question: "Where is most water absorbed from digested food?", answer: "large intestine" }
{ process: "peristalsis", question: "What is the wave-like muscle contraction that moves food through the digestive tract?", answer: "peristalsis" }
```

**ADVANCED (5 quests)**: System coordination and disease
```typescript
{ coordination: "enzyme_pH", question: "Why do different digestive enzymes work in different parts of the digestive system?", answer: "different pH levels" }
{ disease: "ulcer", question: "What happens when stomach acid damages the stomach lining?", answer: "ulcer forms" }
{ coordination: "hormone_regulation", question: "How does the body signal when to release digestive enzymes?", answer: "hormones" }
{ disease: "lactose_intolerance", question: "What enzyme deficiency causes lactose intolerance?", answer: "lactase" }
{ coordination: "nutrient_transport", question: "How do absorbed nutrients reach body cells?", answer: "bloodstream" }
```

**ELITE (2-3 quests)**: Comprehensive problems
```typescript
{ scenario: "basel_marathon", question: "A Basel Marathon runner experiences digestive issues. Explain how blood flow redistribution affects digestion during exercise.", answer: "blood diverted to muscles, reduced digestive function" }
{ scenario: "nutrition_program", question: "Design a meal plan that optimizes enzyme function throughout the digestive system.", answer: "balanced macronutrients, proper timing" }
```

### Respiratory System Data

**BASIC (5 quests)**: Organ identification
```typescript
{ organ: "trachea", question: "Which tube carries air from the throat to the lungs?", options: ["esophagus", "trachea", "bronchi"], answer: "trachea" }
{ organ: "alveoli", question: "Where does gas exchange occur in the lungs?", options: ["bronchi", "trachea", "alveoli"], answer: "alveoli" }
{ organ: "diaphragm", question: "Which muscle controls breathing?", options: ["diaphragm", "heart", "intercostals"], answer: "diaphragm" }
{ organ: "bronchi", question: "What are the two branches of the trachea called?", options: ["alveoli", "bronchi", "bronchioles"], answer: "bronchi" }
{ organ: "nose", question: "Which organ filters, warms, and moistens incoming air?", options: ["mouth", "nose", "trachea"], answer: "nose" }
```

**CORE (6-7 quests)**: Breathing and gas exchange
```typescript
{ process: "inhalation", question: "What happens to the diaphragm during inhalation?", answer: "contracts and moves down" }
{ process: "gas_exchange", question: "Which gas moves from alveoli into blood capillaries?", answer: "oxygen" }
{ process: "exhalation", question: "What happens to lung volume during exhalation?", answer: "decreases" }
{ process: "oxygen_transport", question: "What protein in red blood cells carries oxygen?", answer: "hemoglobin" }
{ process: "co2_removal", question: "How is carbon dioxide removed from the body?", answer: "exhaled through lungs" }
{ process: "breathing_rate", question: "What triggers an increase in breathing rate?", answer: "high CO2 levels" }
```

**ADVANCED (5 quests)**: System coordination and disease
```typescript
{ coordination: "oxygen_demand", question: "How does the respiratory system respond to increased oxygen demand during exercise?", answer: "increased breathing rate and depth" }
{ disease: "asthma", question: "What happens to airways during an asthma attack?", answer: "constriction and inflammation" }
{ coordination: "altitude_adaptation", question: "How does the body adapt to low oxygen at high altitude?", answer: "increased red blood cell production" }
{ disease: "pneumonia", question: "How does fluid in alveoli affect gas exchange?", answer: "reduces oxygen absorption" }
{ coordination: "ph_regulation", question: "How does breathing rate affect blood pH?", answer: "controls CO2 levels" }
```

**ELITE (2-3 quests)**: Comprehensive problems
```typescript
{ scenario: "rhine_swimming", question: "Analyze how cold water swimming in the Rhine affects respiratory function and oxygen delivery.", answer: "increased breathing rate, vasoconstriction, oxygen conservation" }
{ scenario: "hospital_case", question: "A patient at University Hospital Basel has low blood oxygen. Diagnose possible respiratory system failures.", answer: "alveolar damage, poor ventilation, or circulation issues" }
```

### Circulatory System Data

**BASIC (5 quests)**: Heart and vessel identification
```typescript
{ organ: "left_ventricle", question: "Which heart chamber pumps blood to the body?", options: ["left atrium", "left ventricle", "right ventricle"], answer: "left ventricle" }
{ organ: "arteries", question: "Which blood vessels carry blood away from the heart?", options: ["arteries", "veins", "capillaries"], answer: "arteries" }
{ organ: "right_atrium", question: "Which chamber receives deoxygenated blood from the body?", options: ["right atrium", "left atrium", "right ventricle"], answer: "right atrium" }
{ organ: "capillaries", question: "Where does exchange of nutrients and waste occur?", options: ["arteries", "veins", "capillaries"], answer: "capillaries" }
{ organ: "valves", question: "What prevents blood from flowing backward in the heart?", options: ["valves", "chambers", "vessels"], answer: "valves" }
```

**CORE (6-7 quests)**: Blood circulation
```typescript
{ process: "systemic_circulation", question: "What is the circulation pathway from heart to body and back called?", answer: "systemic circulation" }
{ process: "pulmonary_circulation", question: "What is the circulation pathway from heart to lungs and back called?", answer: "pulmonary circulation" }
{ process: "blood_composition", question: "Which blood cells carry oxygen?", answer: "red blood cells" }
{ process: "heart_contraction", question: "What is the contraction phase of the heartbeat called?", answer: "systole" }
{ process: "blood_pressure", question: "What creates blood pressure in arteries?", answer: "heart contraction" }
{ process: "white_blood_cells", question: "Which blood cells fight infection?", answer: "white blood cells" }
```

**ADVANCED (5 quests)**: System coordination and disease
```typescript
{ coordination: "exercise_response", question: "How does heart rate change during exercise and why?", answer: "increases to deliver more oxygen" }
{ disease: "atherosclerosis", question: "What happens when arteries become clogged with plaque?", answer: "reduced blood flow, high blood pressure" }
{ coordination: "blood_clotting", question: "How does the body prevent blood loss from a cut?", answer: "platelets form clot" }
{ disease: "anemia", question: "What causes fatigue in anemia?", answer: "insufficient oxygen delivery" }
{ coordination: "temperature_regulation", question: "How does blood flow help regulate body temperature?", answer: "vasodilation and vasoconstriction" }
```

**ELITE (2-3 quests)**: Comprehensive problems
```typescript
{ scenario: "basel_marathon", question: "Explain how the circulatory system adapts during a Basel Marathon to meet increased oxygen demands.", answer: "increased heart rate, stroke volume, blood redistribution" }
{ scenario: "hospital_case", question: "A patient has high blood pressure. Analyze the cardiovascular factors and propose interventions.", answer: "vessel resistance, cardiac output, lifestyle changes" }
```

### Excretory System Data

**BASIC (5 quests)**: Organ identification
```typescript
{ organ: "kidneys", question: "Which organs filter blood to remove waste?", options: ["kidneys", "liver", "lungs"], answer: "kidneys" }
{ organ: "bladder", question: "Which organ stores urine?", options: ["kidneys", "bladder", "ureters"], answer: "bladder" }
{ organ: "ureters", question: "Which tubes carry urine from kidneys to bladder?", options: ["ureters", "urethra", "nephrons"], answer: "ureters" }
{ organ: "urethra", question: "Which tube carries urine out of the body?", options: ["ureter", "urethra", "bladder"], answer: "urethra" }
{ organ: "nephron", question: "What is the functional unit of the kidney?", options: ["nephron", "glomerulus", "tubule"], answer: "nephron" }
```

**CORE (6-7 quests)**: Filtration and urine formation
```typescript
{ process: "filtration", question: "What is the first step of urine formation in the nephron?", answer: "filtration" }
{ process: "reabsorption", question: "What happens to useful substances like glucose in the nephron?", answer: "reabsorbed into blood" }
{ process: "secretion", question: "How are additional wastes added to urine?", answer: "secretion from blood" }
{ process: "water_balance", question: "Which hormone regulates water reabsorption in kidneys?", answer: "ADH (antidiuretic hormone)" }
{ process: "urea", question: "What is the main nitrogen waste in urine?", answer: "urea" }
{ process: "concentration", question: "Where is urine concentrated in the nephron?", answer: "collecting duct" }
```

**ADVANCED (5 quests)**: System coordination and disease
```typescript
{ coordination: "blood_pressure_regulation", question: "How do kidneys help regulate blood pressure?", answer: "control blood volume through water retention" }
{ disease: "kidney_stones", question: "What causes kidney stones to form?", answer: "mineral crystallization" }
{ coordination: "acid_base_balance", question: "How do kidneys maintain blood pH?", answer: "excrete H+ ions, reabsorb bicarbonate" }
{ disease: "diabetes_effect", question: "Why does untreated diabetes cause glucose in urine?", answer: "exceeds reabsorption capacity" }
{ coordination: "dehydration_response", question: "How do kidneys respond to dehydration?", answer: "increase water reabsorption, concentrated urine" }
```

**ELITE (2-3 quests)**: Comprehensive problems
```typescript
{ scenario: "hospital_case", question: "A patient at University Hospital Basel has kidney failure. Explain how this affects overall body homeostasis.", answer: "waste accumulation, fluid imbalance, electrolyte disruption, blood pressure issues" }
{ scenario: "public_health", question: "Design a public health program for Basel to prevent kidney disease through nutrition and hydration.", answer: "water intake, low sodium, diabetes prevention" }
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Module Metadata Correctness

*For any* module instance, it should have code "SB2.04", name "HUMAN PHYSIOLOGY // 人体生理学", target audience "Sekundarschule Sek 2 (ages 14-16)", and curriculum alignment "Lehrplan 21 NT.7.10".

**Validates: Requirements 1.1, 1.2, 1.3, 1.4**

### Property 2: Language Support Completeness

*For any* content element (quest text, scenario text, UI label, anatomical term), translations should exist for all three languages (EN, CN, DE) and terminology should be consistent within each language.

**Validates: Requirements 1.5, 12.1, 12.2, 12.3, 12.4, 12.5**

### Property 3: Stage Structure Completeness

*For any* module instance, it should contain exactly 4 stages named "DIGESTIVE_SYSTEM", "RESPIRATORY_SYSTEM", "CIRCULATORY_SYSTEM", and "EXCRETORY_SYSTEM".

**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5**

### Property 4: Quest Distribution Correctness

*For any* module instance, the total quest count should be 75, distributed as: 20 BASIC quests, 25 CORE quests, 20 ADVANCED quests, and 10 ELITE quests.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5**

### Property 5: Digestive System Content Coverage

*For any* DIGESTIVE_SYSTEM stage, quests should reference all major organs (mouth, esophagus, stomach, small intestine, large intestine, liver, pancreas, gallbladder), cover the complete digestion process, describe organ functions, and explain enzyme functions.

**Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5**

### Property 6: Respiratory System Content Coverage

*For any* RESPIRATORY_SYSTEM stage, quests should reference all major organs (nose, trachea, bronchi, lungs, diaphragm), explain breathing mechanisms, describe gas exchange in alveoli, and explain O₂ and CO₂ transport.

**Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5**

### Property 7: Circulatory System Content Coverage

*For any* CIRCULATORY_SYSTEM stage, quests should reference heart anatomy (chambers, valves), explain blood vessel types (arteries, veins, capillaries), describe complete circulation pathways, and explain blood composition.

**Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5**

### Property 8: Excretory System Content Coverage

*For any* EXCRETORY_SYSTEM stage, quests should reference all major organs (kidneys, ureters, bladder, urethra), explain nephron filtration, describe urine formation stages, and explain water balance and waste removal.

**Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5**

### Property 9: Basel Scenario Requirements

*For any* Basel scenario in the module, it should be between 150 and 250 words, and the module should contain 3-4 scenarios covering Basel Marathon runner physiology, University Hospital Basel medical cases, Basel public health nutrition programs, and optionally Rhine swimming and respiratory health.

**Validates: Requirements 8.1, 8.2, 8.3, 8.4, 8.5, 8.6**

### Property 10: Interactive Visualization Completeness

*For any* module instance, it should include exactly 4 interactive visualizations (one for each body system: digestive, respiratory, circulatory, excretory), and when a student interacts with any visualization, the system should respond with relevant anatomical information.

**Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5, 9.6**

### Property 11: Technical Implementation Requirements

*For any* module instance, it should use the ChamberLayout component for content display, use LaTeX for scientific notation where applicable, and support three-language content switching where switching to any language updates all content to that language.

**Validates: Requirements 10.1, 10.2, 10.4, 10.5**

### Property 12: Quest Difficulty Categorization

*For any* BASIC quest, it should focus on identification and recognition; for any CORE quest, it should focus on process understanding and analysis; for any ADVANCED quest, it should focus on system integration and problem-solving; for any ELITE quest, it should focus on complex scenarios requiring comprehensive understanding.

**Validates: Requirements 11.4, 11.5, 11.6, 11.7**

### Property 13: Answer Verification Correctness

*For any* quest with a correct answer, when a user submits an answer that matches the expected answer (case-insensitive for text, exact match for multiple choice), the verification should return success.

**Validates: Requirements 11.4, 11.5, 11.6, 11.7** (implicit in quest functionality)

## Error Handling

### Input Validation

**Empty Input**:
- User clicks "Verify" with empty input field
- System: Treat as incorrect answer, display error feedback
- Prompt user to enter a value

**Invalid Multiple Choice Selection**:
- User attempts to submit without selecting an option
- System: Display error message "Please select an answer"
- No crash or exception

**Text Input Validation**:
- User enters text answer with extra whitespace
- System: Trim whitespace before comparison
- Accept answers with minor spelling variations where appropriate

### Quest Loading Errors

**Missing Quest Data**:
- Quest pool generation fails or returns empty array
- System: Display loading state with message "Loading quests..."
- Log error to console for debugging

**Invalid Quest Structure**:
- Quest object missing required fields (id, difficulty, stage, promptText)
- System: Skip invalid quest, load next valid quest
- Log warning to console

**Missing Translation**:
- Quest text missing for selected language
- System: Fall back to English translation
- Log warning to console

### Visualization Errors

**Missing Organ Data**:
- Visualization lacks data for specific organ
- System: Display organ outline without detailed information
- Log warning to console

**Animation Failures**:
- Framer Motion animation fails to render
- System: Display static visualization without animation
- Functionality remains intact

**Interaction Failures**:
- Click on organ doesn't trigger information display
- System: Retry interaction handler
- Display error message if persistent

### Translation Errors

**Missing Translation Key**:
- Requested translation key doesn't exist in i18n
- System: Display English fallback text
- Log warning to console

**Language Switch Failure**:
- Language change doesn't update UI
- System: Force re-render of components
- Persist language preference in localStorage

**Inconsistent Terminology**:
- Same anatomical term translated differently in different contexts
- System: Use terminology dictionary for consistency
- Log warning if inconsistency detected

### Scenario Loading Errors

**Missing Basel Scenario**:
- Required scenario not found in data
- System: Display generic scenario as fallback
- Log error to console

**Scenario Word Count Violation**:
- Scenario text outside 150-250 word range
- System: Display scenario anyway (content takes priority)
- Log warning to console

## Testing Strategy

### Unit Testing

**Module Structure Tests**:
- Test module metadata (code, name, target audience, curriculum alignment)
- Test stage count and names
- Test quest count distribution across difficulties
- Test visualization count and types
- Test Basel scenario count and topics

**Quest Content Tests**:
- Test each stage contains required organ references
- Test BASIC quests focus on identification
- Test CORE quests focus on processes
- Test ADVANCED quests focus on coordination
- Test ELITE quests focus on comprehensive scenarios
- Test answer verification logic

**Translation Tests**:
- Test all translation keys exist for EN, CN, DE
- Test language switching updates UI text
- Test terminology consistency within each language
- Test anatomical terms have all three translations

**Visualization Tests**:
- Test each visualization renders without errors
- Test organ highlighting on quest change
- Test interaction handlers respond correctly
- Test animation cycles complete

**Scenario Tests**:
- Test Basel scenarios exist for required topics
- Test scenario word counts fall within 150-250 range
- Test scenarios have all three language translations

### Property-Based Testing

**Configuration**: Use fast-check library for TypeScript, minimum 100 iterations per test

**Property Test 1: Translation Completeness**
```typescript
// Feature: sb2-04-human-physiology, Property 2: Language support completeness
fc.assert(
  fc.property(
    fc.constantFrom("EN", "CN", "DE"),
    fc.constantFrom("quest", "scenario", "ui_label", "anatomical_term"),
    (language, contentType) => {
      const content = getContent(contentType);
      const translation = getTranslation(content, language);
      return translation !== undefined && translation.length > 0;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 2: Quest Distribution**
```typescript
// Feature: sb2-04-human-physiology, Property 4: Quest distribution correctness
fc.assert(
  fc.property(
    fc.constant(null),
    () => {
      const allQuests = getAllQuests();
      const basicCount = allQuests.filter(q => q.difficulty === "BASIC").length;
      const coreCount = allQuests.filter(q => q.difficulty === "CORE").length;
      const advancedCount = allQuests.filter(q => q.difficulty === "ADVANCED").length;
      const eliteCount = allQuests.filter(q => q.difficulty === "ELITE").length;
      
      return (
        allQuests.length === 75 &&
        basicCount === 20 &&
        coreCount === 25 &&
        advancedCount === 20 &&
        eliteCount === 10
      );
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 3: Organ Coverage**
```typescript
// Feature: sb2-04-human-physiology, Property 5: Digestive system content coverage
fc.assert(
  fc.property(
    fc.constant(null),
    () => {
      const digestiveQuests = getQuestsByStage("DIGESTIVE_SYSTEM");
      const requiredOrgans = ["mouth", "esophagus", "stomach", "small intestine", 
                              "large intestine", "liver", "pancreas", "gallbladder"];
      
      return requiredOrgans.every(organ => 
        digestiveQuests.some(quest => 
          quest.promptText.toLowerCase().includes(organ.toLowerCase()) ||
          quest.organ === organ
        )
      );
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 4: Scenario Word Count**
```typescript
// Feature: sb2-04-human-physiology, Property 9: Basel scenario requirements
fc.assert(
  fc.property(
    fc.constantFrom("EN", "CN", "DE"),
    (language) => {
      const scenarios = getBaselScenarios(language);
      return scenarios.every(scenario => {
        const wordCount = scenario.text.split(/\s+/).length;
        return wordCount >= 150 && wordCount <= 250;
      });
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 5: Visualization Interaction**
```typescript
// Feature: sb2-04-human-physiology, Property 10: Interactive visualization completeness
fc.assert(
  fc.property(
    fc.constantFrom("DIGESTIVE_SYSTEM", "RESPIRATORY_SYSTEM", "CIRCULATORY_SYSTEM", "EXCRETORY_SYSTEM"),
    fc.string({ minLength: 1, maxLength: 20 }),  // organ name
    (stage, organName) => {
      const visualization = getVisualization(stage);
      const response = visualization.handleOrganClick(organName);
      // Should return information or null if organ not found
      return response === null || (typeof response === "string" && response.length > 0);
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 6: Language Switching Completeness**
```typescript
// Feature: sb2-04-human-physiology, Property 11: Technical implementation requirements
fc.assert(
  fc.property(
    fc.constantFrom("EN", "CN", "DE"),
    fc.constantFrom("EN", "CN", "DE"),
    (fromLang, toLang) => {
      setLanguage(fromLang);
      const beforeContent = getAllDisplayedContent();
      
      setLanguage(toLang);
      const afterContent = getAllDisplayedContent();
      
      // All content should change when switching languages (unless same language)
      if (fromLang === toLang) {
        return beforeContent === afterContent;
      } else {
        return beforeContent !== afterContent;
      }
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 7: Quest Difficulty Categorization**
```typescript
// Feature: sb2-04-human-physiology, Property 12: Quest difficulty categorization
fc.assert(
  fc.property(
    fc.constantFrom("BASIC", "CORE", "ADVANCED", "ELITE"),
    (difficulty) => {
      const quests = getQuestsByDifficulty(difficulty);
      
      if (difficulty === "BASIC") {
        return quests.every(q => q.questionType === "identification");
      } else if (difficulty === "CORE") {
        return quests.every(q => q.questionType === "process");
      } else if (difficulty === "ADVANCED") {
        return quests.every(q => q.questionType === "coordination");
      } else { // ELITE
        return quests.every(q => q.questionType === "comprehensive");
      }
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 8: Answer Verification**
```typescript
// Feature: sb2-04-human-physiology, Property 13: Answer verification correctness
fc.assert(
  fc.property(
    fc.string({ minLength: 1, maxLength: 50 }),
    (correctAnswer) => {
      const quest = createMockQuest(correctAnswer);
      
      // Test exact match
      const result1 = verifyAnswer(quest, correctAnswer);
      
      // Test case-insensitive match
      const result2 = verifyAnswer(quest, correctAnswer.toUpperCase());
      
      // Test with extra whitespace
      const result3 = verifyAnswer(quest, `  ${correctAnswer}  `);
      
      return result1.ok && result2.ok && result3.ok;
    }
  ),
  { numRuns: 100 }
);
```

### Integration Testing

**End-to-End Quest Flow**:
1. Load module → Verify initial quest displays (DIGESTIVE_SYSTEM, BASIC)
2. Select correct answer → Click "Verify" → Verify success feedback
3. Click "Next" → Verify next quest loads
4. Complete all quests in stage → Verify stage completion
5. Change difficulty → Verify new quest pool loads
6. Change stage → Verify appropriate visualization displays

**Visualization Synchronization**:
1. Load Digestive System quest → Verify visualization shows digestive organs
2. Click on stomach in visualization → Verify information popup appears
3. Load Respiratory System quest → Verify visualization switches to lungs
4. Observe breathing animation → Verify diaphragm moves correctly
5. Load Circulatory System quest → Verify heart animation plays
6. Load Excretory System quest → Verify kidney filtration animation plays

**Language Switching**:
1. Load module in English → Verify all text is English
2. Switch to Chinese → Verify all text updates to Chinese (including 消化系统, 呼吸系统, 循环系统, 排泄系统)
3. Switch to German → Verify all text updates to German (including Verdauungssystem, Atmungssystem, Kreislaufsystem, Ausscheidungssystem)
4. Verify anatomical terms are translated consistently

**Basel Scenario Integration**:
1. Load ELITE quest with Basel Marathon scenario
2. Verify scenario text displays (150-250 words)
3. Verify scenario is relevant to current stage
4. Switch language → Verify scenario translates correctly

### Browser Testing

**Supported Browsers**:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

**Test Checklist**:
- [ ] Module loads without errors
- [ ] All quests display correctly
- [ ] Input fields accept text input
- [ ] Multiple choice options are selectable
- [ ] Verify button triggers validation
- [ ] Next button advances to next quest
- [ ] Visualizations render and animate (organ highlighting, process animations)
- [ ] Language switching works (EN/CN/DE)
- [ ] Anatomical diagrams are clear and labeled
- [ ] Responsive layout works on mobile/tablet
- [ ] No console errors or warnings
- [ ] Basel scenarios display correctly
- [ ] All 75 quests are accessible
- [ ] All 4 stages are accessible
- [ ] All 4 difficulty levels work correctly
