# Design Document: GB2.02 - Endocrine System

## Overview

The GB2.02 module is an interactive educational web application that teaches Gymnasium Biology students (Sekundarstufe II, advanced level) about the endocrine system, including hormone classification, gland identification, feedback mechanisms, and clinical applications. The module follows the Chamber Module Standards with a two-column layout: quest exercises on the left and dynamic visualizations on the right.

The module consists of three stages (Hormone Identification, Feedback Mechanisms, Clinical Applications), each with four difficulty levels (BASIC, CORE, ADVANCED, ELITE), providing 60 total quests. All content is available in three languages (EN/CN/DE) with Basel-specific scenarios featuring pharmaceutical research at Novartis/Roche and clinical cases from Basel University Hospital.

Key features:
- Interactive hormone pathway visualization with gland-to-target organ flow
- Feedback loop diagrams showing negative and positive feedback mechanisms
- Anatomical gland visualization with clickable components
- Clinical case presentations with lab results and diagnostic reasoning
- LaTeX rendering for scientific notation using react-katex
- Basel pharmaceutical industry and medical research scenarios

## Architecture

### Component Hierarchy

```
GB202EndocrineSystem (Page Component)
├── ChamberLayout (Layout Container)
│   ├── Header (Title, Language Selector)
│   ├── DifficultySelector (BASIC/CORE/ADVANCED/ELITE)
│   ├── StageSelector (HORMONE_IDENTIFICATION/FEEDBACK_MECHANISMS/CLINICAL_APPLICATIONS)
│   ├── Left Panel (Quest Content)
│   │   ├── ScenarioDescription
│   │   ├── QuestDisplay
│   │   │   ├── PromptText
│   │   │   ├── HormoneDisplay (with react-katex)
│   │   │   ├── ClinicalCaseDisplay (for clinical stage)
│   │   │   │   ├── PatientInfo
│   │   │   │   ├── LabResults
│   │   │   │   └── ReferenceRanges
│   │   │   ├── PathwayBuilder (for feedback stage)
│   │   │   │   ├── ComponentSelector
│   │   │   │   └── PathwayDisplay
│   │   │   └── InputField(s) / MultipleChoice
│   │   └── FeedbackDisplay
│   ├── Right Panel (Visualization)
│   │   └── EndocrineVisualization
│   │       ├── HormonePathwayView
│   │       │   ├── GlandDisplay
│   │       │   ├── BloodstreamFlow
│   │       │   ├── TargetOrganDisplay
│   │       │   └── PhysiologicalEffect
│   │       ├── FeedbackLoopView
│   │       │   ├── NegativeFeedbackDiagram
│   │       │   ├── PositiveFeedbackDiagram
│   │       │   ├── StimulatorArrows (green)
│   │       │   └── InhibitoryArrows (red)
│   │       ├── GlandAnatomyView
│   │       │   ├── BodyOutline
│   │       │   ├── GlandLocations
│   │       │   ├── GlandDetails (on click)
│   │       │   └── ZoomControls
│   │       └── ClinicalDataView
│   │           ├── LabResultChart
│   │           ├── ReferenceRangeIndicators
│   │           └── TrendGraphs
│   └── Footer (Verify/Next/Reset Buttons)
└── useQuestManager (State Management Hook)
```

### Data Flow

1. **Initialization**: useQuestManager loads quest pool based on initial difficulty (BASIC) and stage (HORMONE_IDENTIFICATION)
2. **Quest Selection**: System selects first quest from pool and displays it
3. **User Interaction**:
   - For hormone identification: User selects hormone type, gland, function, or target organ
   - For feedback mechanisms: User traces feedback pathway and identifies components
   - For clinical applications: User diagnoses disorder from symptoms and lab results
4. **Verification**: User clicks "Verify" → System validates answer → Displays feedback
5. **Navigation**: User clicks "Next" → System loads next quest → Updates visualization
6. **Stage/Difficulty Change**: User changes stage or difficulty → System rebuilds quest pool → Resets to first quest

### State Management

The module uses the `useQuestManager` hook which manages:
- Current difficulty level
- Current stage
- Quest pool (array of 5 quests per stage/difficulty)
- Current quest index
- User inputs (selections, pathway components)
- Last verification result
- Quest completion status
- Stage completion tracking
- Selected gland for anatomy view
- Active feedback loop components

## Components and Interfaces

### 1. GB202EndocrineSystem (Main Page Component)

**Purpose**: Root component that orchestrates the entire module

**Props**: None (uses URL routing)

**State**:
- `currentHormone: Hormone` - Current hormone for visualization
- `currentPathway: HormonePathway` - Current pathway for visualization
- `selectedGland: EndocrineGland | null` - Selected gland for anatomy view
- `feedbackLoop: FeedbackLoop | null` - Current feedback loop data

**Key Methods**:
- `buildStagePool(t, difficulty, stage)` - Generates quest pool for given difficulty and stage
- `handleDifficultyChange(newDifficulty)` - Switches difficulty level
- `handleStageChange(newStage)` - Switches stage
- `verifyHormoneClassification(hormone, type)` - Validates hormone type classification
- `verifyGlandIdentification(hormone, gland)` - Validates gland identification
- `verifyFeedbackPathway(pathway, expected)` - Validates feedback loop pathway
- `verifyDisorderDiagnosis(symptoms, diagnosis)` - Validates clinical diagnosis

**Responsibilities**:
- Initialize useQuestManager hook
- Build quest pools based on difficulty and stage
- Pass data to ChamberLayout and EndocrineVisualization
- Handle language switching via i18n
- Manage hormone classification logic
- Manage feedback loop verification
- Manage clinical diagnosis logic

### 2. EndocrineVisualization Component

**Purpose**: Displays visual representations of hormone pathways, feedback loops, gland anatomy, and clinical data

**Props**:
```typescript
interface EndocrineVisualizationProps {
    quest: GB202Quest;
    stage: "HORMONE_IDENTIFICATION" | "FEEDBACK_MECHANISMS" | "CLINICAL_APPLICATIONS";
    hormone?: Hormone;
    pathway?: HormonePathway;
    feedbackLoop?: FeedbackLoop;
    selectedGland?: EndocrineGland;
    clinicalData?: ClinicalData;
    translations: TranslationType;
}
```

**Rendering Logic**:

**Hormone Pathway View**:
- Displays endocrine gland with anatomical location
- Shows hormone release into bloodstream (animated blue flow)
- Displays target organ(s) with arrows indicating hormone action
- Shows physiological effect text
- Color codes: glands (purple), bloodstream (blue), target organs (orange), effects (green)
- Includes hover tooltips for detailed information

**Feedback Loop View**:
- Displays complete feedback loop diagram with all components
- Shows stimulus → sensor → control center → effector → response → feedback
- Uses green arrows for stimulatory pathways
- Uses red arrows with minus signs for inhibitory pathways
- Displays set point and deviation indicators for homeostasis
- Animates feedback signal flow
- Highlights negative vs positive feedback mechanisms

**Gland Anatomy View**:
- Displays human body outline with gland locations
- Shows all major endocrine glands: hypothalamus, pituitary, pineal, thyroid, parathyroid, thymus, adrenal, pancreas, gonads
- Allows clicking on glands to see detailed information
- Displays gland size and position accurately
- Shows zoom controls for detailed view
- Labels all structures in selected language
- Uses anatomically accurate colors

**Clinical Data View**:
- Displays lab result charts with hormone levels
- Shows reference ranges with color-coded indicators (green=normal, red=abnormal)
- Displays trend graphs for hormone levels over time
- Shows patient information and symptoms
- Includes diagnostic reasoning support

### 3. HormonePathwayBuilder Component

**Purpose**: Interactive tool for tracing hormone pathways and feedback loops

**Props**:
```typescript
interface HormonePathwayBuilderProps {
    availableComponents: PathwayComponent[];
    onPathwayChange: (pathway: HormonePathway) => void;
    selectedComponents: PathwayComponent[];
    translations: TranslationType;
}
```

**Features**:
- List of available pathway components (glands, hormones, target organs, effects)
- Drag-and-drop or click to select components
- Visual pathway diagram updates as components are selected
- Verification that pathway is complete and correct
- Hint generation for incorrect pathways
- Reset button to clear selections

**State**:
- `selectedComponents: PathwayComponent[]` - Currently selected components
- `isComplete: boolean` - Whether pathway includes all required components
- `isValid: boolean` - Whether pathway is correct

### 4. ClinicalCaseDisplay Component

**Purpose**: Displays clinical case information for diagnostic reasoning

**Props**:
```typescript
interface ClinicalCaseDisplayProps {
    patientInfo: PatientInfo;
    symptoms: string[];
    labResults: LabResult[];
    referenceRanges: ReferenceRange[];
    onDiagnosisSelect: (diagnosis: string) => void;
    translations: TranslationType;
}
```

**Features**:
- Structured case presentation: chief complaint, history, examination, investigations
- Lab results table with hormone levels and reference ranges
- Color-coded abnormal values (red for high, blue for low)
- Symptom checklist
- Diagnosis selection interface
- Basel University Hospital case context

### 5. GlandAnatomyVisualization Component

**Purpose**: Interactive anatomical visualization of endocrine glands

**Props**:
```typescript
interface GlandAnatomyVisualizationProps {
    selectedGland?: EndocrineGland;
    onGlandClick: (gland: EndocrineGland) => void;
    showLabels: boolean;
    translations: TranslationType;
}
```

**Features**:
- Human body outline with gland locations
- Clickable gland markers
- Detailed gland information on click (hormones produced, functions)
- Zoom and pan controls
- Toggle labels on/off
- Anatomically accurate positioning and sizing

### 6. Quest Data Structure

```typescript
interface GB202Quest extends Quest {
    id: string;                           // e.g., "HORMONE_ID_BASIC_1"
    difficulty: Difficulty;               // BASIC | CORE | ADVANCED | ELITE
    stage: Stage;                         // HORMONE_IDENTIFICATION | FEEDBACK_MECHANISMS | CLINICAL_APPLICATIONS
    hormone?: Hormone;                    // Hormone object
    gland?: EndocrineGland;              // Gland object
    targetOrgans?: string[];             // Target organ names
    feedbackLoop?: FeedbackLoop;         // Feedback loop data
    clinicalCase?: ClinicalCase;         // Clinical case data
    promptLatex: string;                 // Question text
    slots?: Array<{                      // Input fields or selections
        id: string;
        labelLatex: string;
        type: "select" | "input" | "multiselect";
        options?: string[];
        expected: string | string[];
    }>;
    baselContext?: string;               // Basel-specific scenario text
}

interface Hormone {
    name: string;                        // e.g., "insulin"
    nameLatex: string;                   // e.g., "\\text{Insulin}"
    abbreviation?: string;               // e.g., "TSH", "T_3", "T_4"
    type: HormoneType;                   // peptide | steroid | amino_acid_derived
    gland: string;                       // Producing gland
    targetOrgans: string[];              // Target organs
    primaryFunction: string;             // Main physiological function
    structure?: string;                  // Chemical structure description
    regulationMechanism?: string;        // How it's regulated
}

type HormoneType = "peptide" | "steroid" | "amino_acid_derived";

interface EndocrineGland {
    name: string;                        // e.g., "pituitary"
    displayName: string;                 // e.g., "Pituitary Gland"
    location: {                          // Anatomical location
        x: number;                       // Percentage from left
        y: number;                       // Percentage from top
    };
    hormones: string[];                  // Hormones produced
    functions: string[];                 // Main functions
    subdivisions?: string[];             // e.g., ["anterior", "posterior"] for pituitary
}

interface HormonePathway {
    gland: string;                       // Starting gland
    hormone: string;                     // Hormone released
    transport: "bloodstream";            // Transport mechanism
    targetOrgans: string[];              // Target organs
    effects: string[];                   // Physiological effects
    regulatedBy?: string[];              // Regulatory factors
}

interface FeedbackLoop {
    type: "negative" | "positive";       // Feedback type
    components: FeedbackComponent[];     // Loop components in order
    stimulus: string;                    // Initial stimulus
    response: string;                    // Final response
    setPoint?: number;                   // For homeostatic mechanisms
    description: string;                 // Loop description
}

interface FeedbackComponent {
    id: string;
    type: "stimulus" | "sensor" | "control_center" | "effector" | "response" | "feedback";
    name: string;                        // Component name
    description: string;                 // What it does
    connectionType: "stimulatory" | "inhibitory";
}

interface ClinicalCase {
    patientInfo: PatientInfo;
    chiefComplaint: string;
    history: string;
    examination: string[];
    symptoms: string[];
    labResults: LabResult[];
    expectedDiagnosis: string;
    differentialDiagnoses?: string[];    // Other possible diagnoses
    baselContext: string;                // Basel University Hospital context
}

interface PatientInfo {
    age: number;
    sex: "male" | "female";
    occupation?: string;
    relevantHistory?: string[];
}

interface LabResult {
    hormone: string;                     // Hormone name
    value: number;                       // Measured value
    unit: string;                        // e.g., "mIU/L", "ng/dL"
    referenceRange: {
        min: number;
        max: number;
    };
    status: "normal" | "high" | "low";  // Calculated status
}

interface ReferenceRange {
    hormone: string;
    unit: string;
    normalRange: {
        min: number;
        max: number;
    };
    criticalLow?: number;
    criticalHigh?: number;
}
```

### 7. Quest Pool Generation

**buildStagePool Function**:

```typescript
function buildStagePool(
    t: TranslationType,
    difficulty: Difficulty,
    stage: Stage
): GB202Quest[]
```

**Logic**:
1. Select data array based on stage (HORMONE_IDENTIFICATION/FEEDBACK_MECHANISMS/CLINICAL_APPLICATIONS)
2. Filter by difficulty level
3. Map each data item to a Quest object
4. Generate LaTeX strings for hormone names and notation
5. Set expected answers based on quest type
6. Add Basel-specific context
7. Return array of 5 quests

**Data Organization**:
- Each stage has 4 difficulty levels
- Each difficulty level has 5 quests
- Total: 3 stages × 4 difficulties × 5 quests = 60 quests

## Data Models

### Hormone Identification Stage Data

**BASIC**: Simple hormone type classification and gland identification
```typescript
{
  hormone: "insulin",
  type: "peptide",
  gland: "pancreas",
  targetOrgans: ["liver", "muscle", "adipose tissue"],
  primaryFunction: "lowers blood glucose levels",
  baselContext: "At Roche Diagnostics Basel, researchers develop blood glucose monitors..."
}
{
  hormone: "cortisol",
  type: "steroid",
  gland: "adrenal cortex",
  targetOrgans: ["liver", "muscle", "adipose tissue", "immune cells"],
  primaryFunction: "regulates stress response and metabolism",
  baselContext: "In the Novartis Endocrinology Research Lab..."
}
```

**CORE**: Hormone function matching and target organ identification
```typescript
{
  hormone: "thyroxine",
  abbreviation: "T_4",
  type: "amino_acid_derived",
  gland: "thyroid",
  targetOrgans: ["all body cells"],
  primaryFunction: "regulates metabolic rate",
  baselContext: "At Basel University Hospital Endocrinology Clinic..."
}
{
  hormone: "ADH",
  fullName: "antidiuretic hormone",
  type: "peptide",
  gland: "posterior pituitary",
  targetOrgans: ["kidney collecting ducts"],
  primaryFunction: "increases water reabsorption",
  baselContext: "In the Basel Nephrology Research Center..."
}
```

**ADVANCED**: Complex hormone interactions and hypothalamic-pituitary axis
```typescript
{
  hormone: "TSH",
  fullName: "thyroid-stimulating hormone",
  type: "peptide",
  gland: "anterior pituitary",
  targetOrgans: ["thyroid gland"],
  hypothalamicHormone: "TRH",
  feedbackMechanism: "negative",
  baselContext: "At Basel University Hospital's Thyroid Clinic..."
}
{
  hormone: "growth hormone",
  type: "peptide",
  gland: "anterior pituitary",
  targetOrgans: ["liver", "bone", "muscle"],
  hypothalamicHormone: "GHRH",
  baselContext: "In the Basel Pediatric Endocrinology Department..."
}
```

**ELITE**: Pharmaceutical applications and complex endocrine systems
```typescript
{
  hormone: "recombinant growth hormone",
  type: "peptide",
  gland: "pharmaceutical synthesis",
  therapeuticUse: "growth hormone deficiency",
  manufacturer: "Novartis Basel",
  baselContext: "At Novartis's Biopharmaceutical Production Facility in Basel..."
}
{
  hormone: "levothyroxine",
  syntheticForm: "T_4",
  type: "amino_acid_derived",
  therapeuticUse: "hypothyroidism",
  manufacturer: "Roche Basel",
  baselContext: "In Roche's Pharmaceutical Synthesis Laboratory..."
}
```

### Feedback Mechanisms Stage Data

**BASIC**: Simple negative feedback loops
```typescript
{
  feedbackLoop: {
    type: "negative",
    system: "blood glucose regulation",
    stimulus: "high blood glucose",
    sensor: "pancreatic beta cells",
    hormone: "insulin",
    effector: "liver, muscle, adipose tissue",
    response: "glucose uptake and storage",
    feedback: "reduced blood glucose inhibits insulin secretion"
  },
  baselContext: "At Basel Diabetes Research Center..."
}
```

**CORE**: Homeostatic mechanisms
```typescript
{
  feedbackLoop: {
    type: "negative",
    system: "thyroid hormone regulation",
    pathway: "hypothalamus (TRH) → pituitary (TSH) → thyroid (T3/T4) → inhibits TRH and TSH",
    setPoint: "normal T3/T4 levels"
  },
  baselContext: "In the Basel Endocrinology Research Institute..."
}
```

**ADVANCED**: Positive feedback and complex regulation
```typescript
{
  feedbackLoop: {
    type: "positive",
    system: "oxytocin during childbirth",
    pathway: "uterine contractions → oxytocin release → stronger contractions → more oxytocin",
    amplification: "continues until delivery"
  },
  baselContext: "At Basel University Hospital Obstetrics Department..."
}
{
  feedbackLoop: {
    type: "negative",
    system: "HPA axis stress response",
    pathway: "stress → hypothalamus (CRH) → pituitary (ACTH) → adrenal cortex (cortisol) → inhibits CRH and ACTH"
  },
  baselContext: "In the Basel Stress Physiology Laboratory..."
}
```

**ELITE**: Multi-hormone interactions and pharmaceutical interventions
```typescript
{
  feedbackLoop: {
    type: "negative",
    system: "reproductive hormone cycle",
    pathway: "GnRH → FSH/LH → estrogen/progesterone → feedback to hypothalamus and pituitary",
    pharmaceuticalIntervention: "oral contraceptives suppress GnRH"
  },
  baselContext: "At Novartis Reproductive Endocrinology Research..."
}
```

### Clinical Applications Stage Data

**BASIC**: Simple disorder identification from symptoms
```typescript
{
  clinicalCase: {
    patientInfo: { age: 45, sex: "female" },
    symptoms: ["excessive thirst", "frequent urination", "high blood glucose"],
    labResults: [
      { hormone: "glucose", value: 250, unit: "mg/dL", referenceRange: { min: 70, max: 100 }, status: "high" }
    ],
    expectedDiagnosis: "diabetes mellitus"
  },
  baselContext: "At Basel University Hospital Endocrinology Clinic..."
}
```

**CORE**: Diabetes type differentiation and thyroid disorders
```typescript
{
  clinicalCase: {
    patientInfo: { age: 12, sex: "male" },
    symptoms: ["rapid weight loss", "excessive thirst", "ketoacidosis"],
    labResults: [
      { hormone: "glucose", value: 400, unit: "mg/dL", status: "high" },
      { hormone: "insulin", value: 2, unit: "μU/mL", status: "low" }
    ],
    expectedDiagnosis: "Type 1 diabetes",
    mechanism: "autoimmune destruction of pancreatic beta cells"
  },
  baselContext: "At Basel Children's Hospital Pediatric Endocrinology..."
}
```

**ADVANCED**: Hormone level interpretation and complex diagnoses
```typescript
{
  clinicalCase: {
    patientInfo: { age: 38, sex: "female" },
    symptoms: ["weight gain", "fatigue", "cold intolerance", "constipation"],
    labResults: [
      { hormone: "TSH", value: 12, unit: "mIU/L", referenceRange: { min: 0.4, max: 4.0 }, status: "high" },
      { hormone: "T4", value: 3, unit: "μg/dL", referenceRange: { min: 5, max: 12 }, status: "low" }
    ],
    expectedDiagnosis: "primary hypothyroidism",
    mechanism: "thyroid gland failure, elevated TSH due to lack of negative feedback"
  },
  baselContext: "At Basel University Hospital Thyroid Clinic..."
}
```

**ELITE**: Complex pharmaceutical cases and multi-hormone disorders
```typescript
{
  clinicalCase: {
    patientInfo: { age: 52, sex: "male" },
    symptoms: ["hypertension", "muscle weakness", "low potassium"],
    labResults: [
      { hormone: "aldosterone", value: 35, unit: "ng/dL", referenceRange: { min: 4, max: 31 }, status: "high" },
      { hormone: "renin", value: 0.5, unit: "ng/mL/hr", referenceRange: { min: 0.5, max: 3.3 }, status: "low" },
      { hormone: "potassium", value: 2.8, unit: "mEq/L", referenceRange: { min: 3.5, max: 5.0 }, status: "low" }
    ],
    expectedDiagnosis: "primary hyperaldosteronism (Conn's syndrome)",
    mechanism: "adrenal adenoma producing excess aldosterone",
    treatment: "spironolactone (aldosterone antagonist) developed at Novartis Basel"
  },
  baselContext: "At Basel University Hospital Advanced Endocrinology Unit, in collaboration with Novartis pharmaceutical research..."
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, I identified several areas of redundancy:

1. **Quest Pool Size**: Requirements 1.5, 2.7, 3.7, 4.6, 5.5, 6.4, 7.7, 8.6, 9.7, 10.7, 11.6, 12.6, 13.6, 14.5, 15.6, 16.6, 17.6, 18.6, 22.2, 27.7 all specify quest counts - combined into Property 1
2. **Hormone Type Verification**: Requirements 1.2, 1.3, 1.4 all specify type-specific properties - combined into Property 2
3. **Gland-Hormone Mappings**: Requirements 2.2-2.6 all specify specific gland hormones - these are examples, not separate properties
4. **Translation Completeness**: Requirements 20.2-20.5 all specify translation coverage - combined into Property 3
5. **Visualization Content**: Requirements 1.6, 2.8, 4.7, 5.6, 8.7, 14.6, 16.7, 23.1-23.7, 24.1-24.7, 25.1-25.7 specify visualization elements - combined into Properties 4-8
6. **Basel Context**: Requirements 19.1-19.7 all specify Basel references - combined into Property 9
7. **Responsive Layout**: Requirements 28.1-28.7 specify layout behavior - combined into Property 10
8. **Stage Configuration**: Requirements 29.1-29.7 specify stage behavior - combined into Property 11

### Property 1: Quest Pool Size Consistency

*For any* combination of difficulty level and stage, the generated quest pool should contain exactly 5 quests, and the total number of quests across all stages (3) and difficulties (4) should equal 60.

**Validates: Requirements 1.5, 2.7, 3.7, 4.6, 5.5, 6.4, 7.7, 8.6, 9.7, 10.7, 11.6, 12.6, 13.6, 14.5, 15.6, 16.6, 17.6, 18.6, 22.2, 27.7**

### Property 2: Hormone Type Classification Correctness

*For any* hormone in the system, if it is classified as peptide then it should be composed of amino acid chains, if classified as steroid then it should be derived from cholesterol, and if classified as amino acid-derived then it should be synthesized from single amino acids.

**Validates: Requirements 1.1, 1.2, 1.3, 1.4**

### Property 3: Translation Completeness

*For any* UI text element (title, button, instruction, difficulty level, stage name, hormone name, endocrine term), translations should exist and be non-empty for all three languages (EN, CN, DE), while chemical formulas and abbreviations (TSH, ACTH, T3, T4) remain in international notation across all languages.

**Validates: Requirements 20.1, 20.2, 20.3, 20.4, 20.5, 20.6, 20.7**

### Property 4: Hormone Pathway Visualization Completeness

*For any* hormone pathway quest, the visualization should display all required components: endocrine gland, bloodstream transport, target organ(s), and physiological effect, with directional arrows indicating hormone flow.

**Validates: Requirements 23.1, 23.2, 23.4**

### Property 5: Feedback Loop Visualization Correctness

*For any* feedback mechanism quest, the visualization should display the complete feedback loop with all components (stimulus, sensor, control center, effector, response, feedback), and use green arrows for stimulatory pathways and red arrows for inhibitory pathways.

**Validates: Requirements 5.6, 5.7, 23.3, 23.5, 25.1, 25.2, 25.3, 25.4, 25.6**

### Property 6: Gland Anatomy Visualization Completeness

*For any* gland anatomy visualization, it should display all major endocrine glands (hypothalamus, pituitary, pineal, thyroid, parathyroid, thymus, adrenal, pancreas, ovaries, testes) with anatomically accurate positions and allow clicking on glands to display their hormones and functions.

**Validates: Requirements 24.1, 24.2, 24.3, 24.4, 24.5, 24.7**

### Property 7: Clinical Case Presentation Completeness

*For any* clinical case quest, the presentation should include patient information (age, sex), symptoms, lab results with hormone levels and reference ranges, and follow a structured format (chief complaint, history, examination, investigations).

**Validates: Requirements 26.1, 26.2, 26.3, 26.4**

### Property 8: Visualization Color Coding Consistency

*For any* visualization displaying hormone pathways or feedback loops, stimulatory signals should be colored green, inhibitory signals should be colored red, and hormone transport should be colored blue.

**Validates: Requirements 5.7, 23.5**

### Property 9: Basel Context Inclusion

*For any* quest scenario description, it should reference at least one Basel-specific location (Basel University Hospital, Novartis, Roche, Basel Endocrinology Clinic) or Basel pharmaceutical/medical research context, with descriptions between 150-250 words including specific people, places, situations, and real-world significance.

**Validates: Requirements 19.1, 19.2, 19.3, 19.4, 19.5, 19.6**

### Property 10: Responsive Layout Behavior

*For any* screen width at or above 768px, the layout should display two columns (quests left, visualization right); for screen widths below 768px, the layout should stack vertically; all text should be at least 14px; all interactive elements should be at least 44px tall; and no horizontal scrolling should be required.

**Validates: Requirements 28.1, 28.2, 28.3, 28.4, 28.7**

### Property 11: Stage Configuration and Navigation

*For any* module instance, exactly three stages should be available (Hormone Identification, Feedback Mechanisms, Clinical Applications); selecting a stage should load the appropriate quest pool for that stage; changing stages should reset to the first quest; and stage completion status should persist across sessions.

**Validates: Requirements 29.1, 29.2, 29.3, 29.5, 29.6, 29.7**


### Property 12: Hormone-Gland Mapping Correctness

*For any* hormone in the system, the identified producing gland should match the biological source: pituitary hormones (growth hormone, TSH, ACTH, FSH, LH, prolactin, ADH, oxytocin), thyroid hormones (T4, T3), adrenal hormones (cortisol, aldosterone, adrenaline), pancreatic hormones (insulin, glucagon), and gonadal hormones (testosterone, estrogen, progesterone).

**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6**

### Property 13: Hormone Function Mapping Correctness

*For any* hormone in the system, the identified primary function should match the established physiological role: insulin lowers blood glucose, glucagon raises blood glucose, thyroxine regulates metabolic rate, adrenaline prepares for fight-or-flight, and cortisol regulates stress response.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6**

### Property 14: Target Organ Mapping Correctness

*For any* hormone in the system, the identified target organs should match the biological targets: insulin targets liver/muscle/adipose tissue, ADH targets kidney collecting ducts, TSH targets thyroid gland, and FSH/LH target gonads.

**Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5**

### Property 15: Negative Feedback Loop Structure

*For any* negative feedback loop, the pathway should include a stimulus that triggers hormone release, the hormone should act on target organs to produce a response, and the response should inhibit further hormone release, maintaining homeostasis.

**Validates: Requirements 5.1, 5.2, 5.3, 5.4**

### Property 16: Positive Feedback Loop Amplification

*For any* positive feedback loop, the pathway should show that the response amplifies the initial stimulus, creating a reinforcing cycle that continues until an external event terminates the loop.

**Validates: Requirements 6.1, 6.2, 6.3**

### Property 17: Homeostatic Response Correctness

*For any* homeostatic challenge, the identified hormonal response should restore the parameter toward its set point: high glucose triggers insulin, low glucose triggers glucagon, high calcium triggers calcitonin, low calcium triggers PTH, and low blood pressure triggers aldosterone and ADH.

**Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5, 7.6**

### Property 18: Hypothalamic-Pituitary Axis Mapping

*For any* pituitary hormone, the identified hypothalamic releasing hormone should be correct: TSH is released by TRH, ACTH by CRH, growth hormone by GHRH, and prolactin is inhibited by dopamine.

**Validates: Requirements 8.1, 8.2, 8.3, 8.4, 8.5**

### Property 19: Clinical Disorder Diagnosis from Symptoms

*For any* set of clinical symptoms, the identified endocrine disorder should match the symptom pattern: excessive thirst/urination/high glucose indicates diabetes mellitus, weight gain/fatigue/cold intolerance indicates hypothyroidism, weight loss/heat intolerance/rapid heartbeat indicates hyperthyroidism, excessive growth indicates gigantism, and high blood pressure/low potassium indicates hyperaldosteronism.

**Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5, 9.6**

### Property 20: Hormone Level Interpretation Correctness

*For any* set of hormone lab results, the interpretation should correctly identify the disorder: high TSH with low T4 indicates primary hypothyroidism, low TSH with high T4 indicates primary hyperthyroidism, low TSH with low T4 indicates secondary hypothyroidism, high cortisol with low ACTH indicates adrenal tumor, and high cortisol with high ACTH indicates pituitary tumor.

**Validates: Requirements 10.1, 10.2, 10.3, 10.4, 10.5, 10.6**

### Property 21: Diabetes Type Differentiation

*For any* diabetes case, Type 1 should be identified by autoimmune beta cell destruction and insulin requirement from diagnosis, while Type 2 should be identified by insulin resistance and initial treatment with lifestyle modification and oral medications.

**Validates: Requirements 11.1, 11.2, 11.3, 11.4, 11.5**

### Property 22: Thyroid Disorder Mechanism Identification

*For any* thyroid disorder, the mechanism should be correctly identified: Graves' disease involves autoimmune TSH receptor stimulation, Hashimoto's thyroiditis involves autoimmune thyroid destruction, iodine deficiency causes reduced T3/T4 synthesis and goiter, and thyroid nodules cause autonomous hormone production.

**Validates: Requirements 12.1, 12.2, 12.3, 12.4, 12.5**

### Property 23: Hormone Therapy Matching

*For any* endocrine disorder, the appropriate hormone therapy should be identified: hypothyroidism requires levothyroxine, Type 1 diabetes requires insulin, Addison's disease requires hydrocortisone and fludrocortisone, and growth hormone deficiency requires recombinant growth hormone.

**Validates: Requirements 13.1, 13.2, 13.3, 13.4, 13.5**

### Property 24: Stress Response Pathway Identification

*For any* stress scenario, acute stress should trigger rapid adrenaline release from adrenal medulla, while chronic stress should trigger sustained cortisol release via the HPA axis (stress → hypothalamus CRH → pituitary ACTH → adrenal cortex cortisol).

**Validates: Requirements 14.1, 14.2, 14.3, 14.4**

### Property 25: Growth Hormone Identification

*For any* growth scenario, childhood growth should involve growth hormone and thyroid hormones, puberty should involve sex hormones (testosterone, estrogen) and GnRH/FSH/LH, and bone growth should involve growth hormone, thyroid hormones, and sex hormones.

**Validates: Requirements 15.1, 15.2, 15.3, 15.4**

### Property 26: Reproductive Hormone Cycle Phases

*For any* menstrual cycle phase, the follicular phase should show rising FSH and estrogen, ovulation should show LH surge, the luteal phase should show high progesterone from corpus luteum, and pregnancy should show hCG maintaining corpus luteum.

**Validates: Requirements 16.1, 16.2, 16.3, 16.4, 16.5**

### Property 27: Calcium Homeostasis Regulation

*For any* calcium level change, low blood calcium should trigger PTH secretion (increasing bone resorption, kidney calcium reabsorption, and vitamin D activation), while high blood calcium should trigger calcitonin secretion (decreasing bone resorption and increasing calcium excretion).

**Validates: Requirements 17.1, 17.2, 17.3, 17.4, 17.5**

### Property 28: Water Balance Regulation

*For any* water balance challenge, dehydration should trigger ADH release (increasing water reabsorption in kidney collecting ducts), low blood pressure should trigger aldosterone release (increasing sodium and water reabsorption), and diabetes insipidus should be identified as ADH deficiency or resistance.

**Validates: Requirements 18.1, 18.2, 18.3, 18.4, 18.5**

### Property 29: Answer Verification Correctness

*For any* user answer submission, verification should return success if and only if the answer matches the expected value (hormone type, gland, function, target organ, feedback pathway, or clinical diagnosis).

**Validates: Requirements 21.1, 21.2, 21.3**

### Property 30: Navigation State Management

*For any* quest verification that succeeds, the "Next" button should become enabled; clicking "Next" should advance to the next quest in the current stage and difficulty; users should not be able to skip ahead without solving problems; and when all 5 quests in a stage are completed, users should be allowed to change stages or difficulty.

**Validates: Requirements 21.4, 21.5, 21.6, 21.7**

### Property 31: Quest Data Structure Completeness

*For any* quest object, it should contain all required fields (id, difficulty, stage) and at least one of (hormone, gland, feedbackLoop, clinicalCase) depending on the quest type, with expected answers stored for verification.

**Validates: Requirements 22.1, 22.3, 22.4, 22.6**

### Property 32: Medical Terminology Consistency

*For any* hormone name, gland name, or medical term in the system, it should follow standard medical and biological terminology conventions accepted internationally.

**Validates: Requirements 22.5**

### Property 33: React-Katex Rendering for Scientific Notation

*For any* hormone abbreviation or scientific notation, it should be rendered using react-katex (InlineMath for inline display), with proper formatting for subscripts (T₃, T₄) and Greek letters (α, β, Δ).

**Validates: Requirements 30.1, 30.2, 30.3, 30.4, 30.5, 30.6**

### Property 34: Hormone Count Diversity

*For any* module instance, the system should include at least 12 different hormones across all difficulty levels.

**Validates: Requirements 3.8**

### Property 35: Reference Range Display

*For any* clinical case with lab results, the system should display reference ranges for normal hormone levels alongside the measured values.

**Validates: Requirements 10.8**

### Property 36: ELITE Difficulty Pharmaceutical Authenticity

*For any* ELITE difficulty quest, if it involves pharmaceutical applications, it should reference actual pharmaceutical hormone products or research conducted at Novartis or Roche Basel.

**Validates: Requirements 13.7, 19.7**

### Property 37: ELITE Difficulty Clinical Case Complexity

*For any* ELITE difficulty clinical case, it should present complex cases with multiple endocrine abnormalities or pharmaceutical interventions, set in Basel University Hospital context.

**Validates: Requirements 9.8, 26.5, 26.7**

### Property 38: Difficulty Progression in Quest Types

*For any* BASIC difficulty quest, it should present simple hormone identification and gland matching; for CORE difficulty, hormone function analysis and simple feedback loops; for ADVANCED difficulty, complex feedback mechanisms and clinical disorder diagnosis; for ELITE difficulty, pharmaceutical applications and complex clinical cases.

**Validates: Requirements 27.1, 27.2, 27.3, 27.4, 27.5**

### Property 39: Visualization Aspect Ratio Preservation

*For any* visualization resize event, the aspect ratio of anatomical diagrams and pathway visualizations should remain constant to prevent distortion.

**Validates: Requirements 28.5**

### Property 40: ChamberLayout Component Usage

*For any* module instance, it should use the ChamberLayout component for consistent structure with other chamber modules.

**Validates: Requirements 28.6**



## Error Handling

### Input Validation

**Invalid Selection**:
- User selects an option that doesn't exist in the available choices
- System: Treat as invalid, display error message "Please select a valid option"
- Prevent verification until valid selection made

**Empty Selection**:
- User clicks "Verify" without making a selection
- System: Display error message "Please make a selection before verifying"
- Highlight the input field that needs attention

**Multiple Selection Errors**:
- User selects wrong number of items in multi-select questions
- System: Display error message "Please select exactly [N] items"
- Show count of selected items vs required

### Quest Loading Errors

**Missing Quest Data**:
- Quest pool generation fails or returns empty array
- System: Display loading state with message "Loading endocrine system quests..."
- Log error to console for debugging
- Retry quest loading after 2 seconds

**Invalid Quest Structure**:
- Quest object missing required fields (id, difficulty, stage, hormone/feedbackLoop/clinicalCase)
- System: Skip invalid quest, load next valid quest
- Log warning to console with missing field details
- Ensure at least 3 valid quests available per stage/difficulty

**Missing Hormone Data**:
- Hormone object lacks required properties (name, type, gland)
- System: Display error message "Unable to load this quest"
- Skip to next quest
- Log missing data details

### Visualization Errors

**Missing Pathway Data**:
- Quest lacks hormone pathway data for visualization
- System: Display simplified text-based pathway description
- Show gland → hormone → target organ in text format
- Log warning about missing visualization data

**Animation Failures**:
- Framer Motion or animation library fails
- System: Display static visualization without animation
- Show all pathway components in static positions
- Functionality remains intact

**Gland Location Data Missing**:
- Anatomical position data unavailable for gland
- System: Use default position or hide gland from anatomy view
- Display gland information in text list instead
- Log warning about missing location data

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

### Clinical Data Errors

**Missing Lab Results**:
- Clinical case lacks required lab result data
- System: Display available data only
- Show message "Some lab results unavailable"
- Allow diagnosis based on symptoms and available data

**Invalid Reference Ranges**:
- Reference range data malformed or missing
- System: Use standard reference ranges from medical literature
- Display warning "Using standard reference ranges"
- Log data issue for correction

**Lab Value Out of Plausible Range**:
- Lab value exceeds biologically plausible limits
- System: Display warning "Unusual lab value detected"
- Allow user to proceed but flag for review
- Log suspicious value

### Feedback Loop Errors

**Incomplete Pathway Data**:
- Feedback loop missing components
- System: Display available components only
- Show message "Pathway data incomplete"
- Allow partial credit for correct components

**Circular Reference Detection**:
- Feedback loop data contains circular references
- System: Break circular reference at detection point
- Display linear pathway instead
- Log circular reference error

### Stage and Navigation Errors

**Invalid Stage Selection**:
- User attempts to access non-existent stage
- System: Redirect to first valid stage (Hormone Identification)
- Log warning about invalid stage
- Display available stages clearly

**Quest Index Out of Bounds**:
- System attempts to load quest beyond pool size
- System: Reset to first quest in pool
- Display message "Returning to first quest"
- Log index error

**Stage Completion Data Corruption**:
- localStorage data for stage completion is corrupted
- System: Reset stage completion status
- Display message "Progress data reset"
- Allow user to restart stage

### React-Katex Rendering Errors

**Invalid LaTeX Syntax**:
- LaTeX string contains syntax errors
- System: Display fallback plain text notation (e.g., "T3" instead of "T₃")
- Log LaTeX error to console
- Continue with functionality intact

**React-Katex Library Failure**:
- react-katex fails to load or render
- System: Fall back to plain text scientific notation
- Display warning banner "Scientific notation may not display correctly"
- Ensure all functionality remains operational

**Missing LaTeX Strings**:
- Quest missing LaTeX formatted strings
- System: Generate LaTeX from plain text
- Use conversion function: `textToLatex(text)`
- Log warning about missing LaTeX data



## Testing Strategy

### Unit Testing

**Quest Generation Tests**:
- Test `buildStagePool` function for each stage and difficulty
- Verify quest pool contains exactly 5 quests
- Verify quest objects have all required fields
- Verify expected answers are set correctly
- Test total quest count equals 60 (3 stages × 4 difficulties × 5 quests)

**Hormone Classification Tests**:
- Test hormone type classification (peptide, steroid, amino acid-derived)
- Test gland-hormone mappings for all major glands
- Test hormone-function mappings
- Test hormone-target organ mappings
- Verify at least 12 different hormones exist

**Feedback Loop Tests**:
- Test negative feedback loop structure
- Test positive feedback loop amplification
- Test homeostatic response identification
- Test hypothalamic-pituitary axis mappings
- Verify feedback loop component completeness

**Clinical Diagnosis Tests**:
- Test disorder diagnosis from symptom patterns
- Test hormone level interpretation
- Test diabetes type differentiation
- Test thyroid disorder mechanism identification
- Test hormone therapy matching

**Translation Tests**:
- Test all translation keys exist for EN, CN, DE
- Test language switching updates UI text
- Test hormone names and terms are translated
- Test chemical formulas remain in international notation
- Test LaTeX rendering works in all languages

**Visualization Tests**:
- Test hormone pathway visualization displays all components
- Test feedback loop visualization uses correct colors
- Test gland anatomy visualization shows all glands
- Test clinical data visualization displays lab results with reference ranges
- Test visualization animations work correctly

### Property-Based Testing

**Configuration**: Use fast-check library for TypeScript, minimum 100 iterations per test

**Property Test 1: Quest Pool Size Consistency**
```typescript
// Feature: gb2-02-endocrine-system, Property 1: Quest pool size consistency
fc.assert(
  fc.property(
    fc.constantFrom("BASIC", "CORE", "ADVANCED", "ELITE"),
    fc.constantFrom("HORMONE_IDENTIFICATION", "FEEDBACK_MECHANISMS", "CLINICAL_APPLICATIONS"),
    (difficulty, stage) => {
      const pool = buildStagePool(mockTranslations, difficulty, stage);
      return pool.length === 5;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 2: Hormone Type Classification**
```typescript
// Feature: gb2-02-endocrine-system, Property 2: Hormone type classification correctness
fc.assert(
  fc.property(
    fc.constantFrom(...allHormones),
    (hormone) => {
      if (hormone.type === "peptide") {
        return hormone.structure.includes("amino acid");
      } else if (hormone.type === "steroid") {
        return hormone.structure.includes("cholesterol");
      } else if (hormone.type === "amino_acid_derived") {
        return hormone.structure.includes("single amino acid");
      }
      return false;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 3: Translation Completeness**
```typescript
// Feature: gb2-02-endocrine-system, Property 3: Translation completeness
fc.assert(
  fc.property(
    fc.constantFrom("EN", "CN", "DE"),
    fc.constantFrom("title", "check", "next", "correct", "incorrect", "hormone_identification"),
    (language, key) => {
      const translations = getTranslations(language);
      return translations.gb2_02[key] !== undefined && translations.gb2_02[key] !== "";
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 4: Hormone-Gland Mapping**
```typescript
// Feature: gb2-02-endocrine-system, Property 12: Hormone-gland mapping correctness
fc.assert(
  fc.property(
    fc.constantFrom(...allHormones),
    (hormone) => {
      const expectedGlands = {
        "insulin": "pancreas",
        "glucagon": "pancreas",
        "cortisol": "adrenal cortex",
        "thyroxine": "thyroid",
        "TSH": "anterior pituitary",
        // ... more mappings
      };
      return hormone.gland === expectedGlands[hormone.name];
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 5: Feedback Loop Structure**
```typescript
// Feature: gb2-02-endocrine-system, Property 15: Negative feedback loop structure
fc.assert(
  fc.property(
    fc.constantFrom(...allNegativeFeedbackLoops),
    (feedbackLoop) => {
      const hasStimulus = feedbackLoop.components.some(c => c.type === "stimulus");
      const hasFeedback = feedbackLoop.components.some(c => c.type === "feedback");
      const hasInhibitory = feedbackLoop.components.some(c => c.connectionType === "inhibitory");
      return hasStimulus && hasFeedback && hasInhibitory;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 6: Clinical Diagnosis Mapping**
```typescript
// Feature: gb2-02-endocrine-system, Property 19: Clinical disorder diagnosis from symptoms
fc.assert(
  fc.property(
    fc.constantFrom(...allClinicalCases),
    (clinicalCase) => {
      const diagnosis = diagnosisFromSymptoms(clinicalCase.symptoms, clinicalCase.labResults);
      return diagnosis === clinicalCase.expectedDiagnosis;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 7: Basel Context Inclusion**
```typescript
// Feature: gb2-02-endocrine-system, Property 9: Basel context inclusion
fc.assert(
  fc.property(
    fc.constantFrom(...allQuests),
    (quest) => {
      const baselLocations = ["Basel University Hospital", "Novartis", "Roche", "Basel Endocrinology Clinic"];
      const hasBaselReference = baselLocations.some(loc => quest.baselContext?.includes(loc));
      const wordCount = quest.baselContext?.split(/\s+/).length || 0;
      return hasBaselReference && wordCount >= 150 && wordCount <= 250;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 8: Responsive Layout Breakpoint**
```typescript
// Feature: gb2-02-endocrine-system, Property 10: Responsive layout behavior
fc.assert(
  fc.property(
    fc.integer({ min: 320, max: 1920 }),
    (screenWidth) => {
      const layout = getLayoutForWidth(screenWidth);
      if (screenWidth < 768) {
        return layout.direction === "vertical";
      } else {
        return layout.direction === "horizontal" && layout.columns === 2;
      }
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 9: Visualization Color Coding**
```typescript
// Feature: gb2-02-endocrine-system, Property 8: Visualization color coding consistency
fc.assert(
  fc.property(
    fc.constantFrom(...allFeedbackLoops),
    (feedbackLoop) => {
      const stimulatoryComponents = feedbackLoop.components.filter(c => c.connectionType === "stimulatory");
      const inhibitoryComponents = feedbackLoop.components.filter(c => c.connectionType === "inhibitory");
      
      const stimulatoryColor = getComponentColor(stimulatoryComponents[0]);
      const inhibitoryColor = getComponentColor(inhibitoryComponents[0]);
      
      return stimulatoryColor === "green" && inhibitoryColor === "red";
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 10: Quest Data Structure Completeness**
```typescript
// Feature: gb2-02-endocrine-system, Property 31: Quest data structure completeness
fc.assert(
  fc.property(
    fc.constantFrom(...allQuests),
    (quest) => {
      const hasRequiredFields = quest.id && quest.difficulty && quest.stage;
      const hasContentData = quest.hormone || quest.feedbackLoop || quest.clinicalCase;
      const hasExpectedAnswer = quest.slots && quest.slots.every(slot => slot.expected !== undefined);
      return hasRequiredFields && hasContentData && hasExpectedAnswer;
    }
  ),
  { numRuns: 100 }
);
```

### Integration Testing

**End-to-End Quest Flow**:
1. Load module → Verify initial quest displays
2. Select correct answer → Click "Verify" → Verify success feedback
3. Click "Next" → Verify next quest loads
4. Complete all 5 quests → Verify stage completion
5. Change difficulty → Verify new quest pool loads
6. Change stage → Verify appropriate visualization displays

**Visualization Synchronization**:
1. Load Hormone Identification quest → Verify visualization shows hormone pathway
2. Load Feedback Mechanisms quest → Verify visualization shows feedback loop
3. Load Clinical Applications quest → Verify visualization shows lab results
4. Change quest → Verify visualization updates in real-time

**Language Switching**:
1. Load module in English → Verify all text is English
2. Switch to Chinese → Verify all text updates to Chinese
3. Switch to German → Verify all text updates to German
4. Verify hormone abbreviations remain in international notation

**Clinical Case Interaction**:
1. Load clinical case → Verify patient info, symptoms, and lab results display
2. Review lab results → Verify reference ranges shown
3. Select diagnosis → Verify feedback indicates correct/incorrect
4. View visualization → Verify hormone levels displayed graphically

### Browser Testing

**Supported Browsers**:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

**Test Checklist**:
- [ ] Module loads without errors
- [ ] All quests display correctly
- [ ] Selection inputs work properly
- [ ] Verify button triggers validation
- [ ] Next button advances to next quest
- [ ] Visualizations render and animate
- [ ] Language switching works
- [ ] LaTeX notation renders correctly
- [ ] Responsive layout works on mobile/tablet
- [ ] Clinical cases display properly
- [ ] Feedback loops show correct colors
- [ ] Gland anatomy is clickable
- [ ] No console errors or warnings

