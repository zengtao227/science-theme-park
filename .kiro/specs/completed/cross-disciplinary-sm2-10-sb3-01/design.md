# Design Document: Cross-Disciplinary ELITE Questions (SM2.10 & SB3.01)

## Overview

This design implements 10 ELITE-difficulty cross-disciplinary questions that bridge statistical data analysis (SM2.10) and ecosystem science (SB3.01). The questions integrate Basel-specific ecological scenarios with advanced statistical methods, creating competition-level challenges requiring both mathematical and biological reasoning.

The implementation extends the existing Quest System by adding 5 ELITE questions to each module (SM2.10 and SB3.01), maintaining the established three-language support (EN/CN/DE) and using Basel's real ecological data including Rhine River monitoring, urban green spaces, and climate patterns.

### Key Design Principles

1. **Cross-Disciplinary Integration**: Each question requires knowledge from both statistical analysis and ecological science
2. **Basel Context**: All questions use real ecological data from Basel, Switzerland
3. **Competition-Level Difficulty**: Questions require multi-step reasoning and advanced concepts
4. **Seamless Integration**: New questions follow existing Quest_Data_Structure format
5. **Educational Value**: Questions teach authentic interdisciplinary thinking skills

## Architecture

### System Components

The design integrates with the existing Quest System architecture:

```
Quest System
├── SM2.10 Module (Data Analysis)
│   ├── Existing Stages (BOX_PLOTS, SCATTER_PLOTS, CORRELATION)
│   └── New ELITE Stage (5 questions)
│       └── Cross-disciplinary ecological data analysis
│
└── SB3.01 Module (Ecosystems)
    ├── Existing Stages (FOOD_CHAINS, ENERGY_FLOW, BIODIVERSITY)
    └── New ELITE Stage (5 questions)
        └── Quantitative ecosystem analysis

Language System
├── English (EN)
├── Chinese Simplified (CN)
└── German (DE)

Rendering System
├── LaTeX Renderer (mathematical notation)
└── ChamberLayout Component (UI display)
```

### Integration Points

1. **Data Storage**: Questions embedded in `page.tsx` files for SM2.10 and SB3.01
2. **Type System**: Extends existing `Quest` interface with ELITE difficulty
3. **Rendering**: Uses existing LaTeX renderer with four-backslash notation
4. **Language Support**: Leverages existing i18n system for three-language content
5. **UI Components**: Compatible with ChamberLayout and visualization components

## Components and Interfaces

### Quest Data Structure

The existing Quest interface will be extended to support ELITE questions:

```typescript
interface Quest {
    id: string;                    // Unique identifier (e.g., "SM2-ELITE-1")
    difficulty: Difficulty;        // "ELITE" for new questions
    stage: Stage;                  // "ELITE" stage for both modules
    dataType?: string;             // Question category
    promptLatex: string;           // Question text with LaTeX
    expressionLatex: string;       // Formula or concept display
    targetLatex: string;           // What student should find
    slots: Slot[];                 // Input fields for answers
    correctLatex: string;          // Correct answer display
    hintLatex: string[];           // Progressive hints
}

interface Slot {
    id: string;                    // Slot identifier
    labelLatex: string;            // Display label
    placeholder: string;           // Placeholder text
    expected: number | string;     // Expected answer value
}
```

### Language Content Structure

Each question requires content in three languages:

```typescript
interface QuestionContent {
    en: {
        prompt: string;            // English question text
        context: string;           // Basel scenario description
        explanation: string;       // Solution explanation
        hints: string[];           // Progressive hints
    };
    cn: {
        prompt: string;            // Chinese question text
        context: string;           // Basel scenario (translated)
        explanation: string;       // Solution explanation
        hints: string[];           // Progressive hints
    };
    de: {
        prompt: string;            // German question text
        context: string;           // Basel scenario (translated)
        explanation: string;       // Solution explanation
        hints: string[];           // Progressive hints
    };
}
```

### Basel Ecological Data Categories

Questions will incorporate the following Basel-specific data:

1. **Rhine River Monitoring**
   - Water quality parameters (pH, dissolved oxygen, temperature)
   - Fish species populations (salmon, trout, grayling)
   - Macroinvertebrate diversity indices
   - Seasonal flow rates and temperature patterns

2. **Urban Green Spaces**
   - Park biodiversity surveys (species richness, evenness)
   - Tree canopy coverage percentages
   - Pollinator abundance data
   - Vegetation succession patterns

3. **Climate Data**
   - Temperature trends (1990-2024)
   - Precipitation patterns and variability
   - Growing season length changes
   - Heat wave frequency and duration

4. **Biodiversity Data**
   - Species distribution patterns
   - Population dynamics (growth rates, carrying capacity)
   - Community composition indices (Shannon diversity, Simpson index)
   - Trophic level energy transfer efficiency

## Data Models

### SM2.10 ELITE Questions Structure

Each SM2.10 ELITE question follows this model:

```typescript
{
    id: "SM2-ELITE-[1-5]",
    difficulty: "ELITE",
    stage: "ELITE",
    dataType: "ecological_statistics",
    
    // Statistical content
    promptLatex: "\\\\text{[Question with ecological context]}",
    expressionLatex: "\\\\text{[Statistical formula]}",
    targetLatex: "\\\\text{[Target calculation]}",
    
    // Answer structure
    slots: [
        {
            id: "answer",
            labelLatex: "\\\\text{[Answer label]}",
            placeholder: "[hint]",
            expected: [numerical_value]
        }
    ],
    
    // Solution
    correctLatex: "[Correct answer with units]",
    hintLatex: [
        "\\\\text{[Hint 1: Identify relevant data]}",
        "\\\\text{[Hint 2: Apply statistical method]}",
        "\\\\text{[Hint 3: Interpret in ecological context]}"
    ],
    
    // Basel context
    baselContext: {
        dataSource: "Rhine River / Urban Parks / Climate Records",
        realValues: true,
        ecologicalConcept: "[SB3.01 concept]",
        statisticalMethod: "[SM2.10 method]"
    }
}
```

### SB3.01 ELITE Questions Structure

Each SB3.01 ELITE question follows this model:

```typescript
{
    id: "SB3-ELITE-[1-5]",
    difficulty: "ELITE",
    stage: "ELITE",
    dataType: "quantitative_ecology",
    
    // Ecological content with statistics
    promptLatex: "\\\\text{[Question with statistical data]}",
    expressionLatex: "\\\\text{[Ecological concept with math]}",
    targetLatex: "\\\\text{[Target analysis]}",
    
    // Answer structure
    slots: [
        {
            id: "answer",
            labelLatex: "\\\\text{[Answer label]}",
            placeholder: "[hint]",
            expected: [numerical_value]
        }
    ],
    
    // Solution
    correctLatex: "[Correct answer with ecological interpretation]",
    hintLatex: [
        "\\\\text{[Hint 1: Understand ecological system]}",
        "\\\\text{[Hint 2: Apply quantitative method]}",
        "\\\\text{[Hint 3: Calculate and interpret]}"
    ],
    
    // Basel context
    baselContext: {
        dataSource: "Rhine River / Urban Parks / Climate Records",
        realValues: true,
        ecologicalConcept: "[SB3.01 concept]",
        statisticalMethod: "[SM2.10 method]"
    }
}
```

### Question Content Examples

#### SM2.10 ELITE Question Example (Rhine River Statistical Analysis)

**Scenario**: Rhine River temperature monitoring data shows mean summer temperature of 21.5°C with standard deviation of 2.3°C. Fish species diversity (Shannon index) correlates with temperature.

**Statistical Task**: Calculate the probability that temperature exceeds 24°C (assuming normal distribution), and interpret impact on fish diversity.

**Cross-Disciplinary Elements**:
- Statistical method: Normal distribution, z-scores, probability
- Ecological concept: Temperature tolerance, species diversity, thermal stress

#### SB3.01 ELITE Question Example (Urban Park Energy Flow)

**Scenario**: Basel's Kannenfeldpark shows primary productivity of 8,500 kcal/m²/year. Herbivore consumption data provided with statistical variation.

**Ecological Task**: Calculate energy transfer efficiency to secondary consumers using statistical data, compare to theoretical 10% rule.

**Cross-Disciplinary Elements**:
- Ecological concept: Energy flow, trophic levels, efficiency
- Statistical method: Mean, standard deviation, confidence intervals

### LaTeX Formatting Requirements

All mathematical notation must use four backslashes for proper rendering:

```typescript
// Correct format
promptLatex: "\\\\text{Calculate } \\\\mu = \\\\frac{\\\\sum x_i}{n}"

// Statistical formulas
"\\\\sigma = \\\\sqrt{\\\\frac{\\\\sum (x_i - \\\\mu)^2}{n}}"  // Standard deviation
"z = \\\\frac{x - \\\\mu}{\\\\sigma}"                          // Z-score
"r = \\\\frac{\\\\sum (x_i - \\\\bar{x})(y_i - \\\\bar{y})}{\\\\sqrt{\\\\sum (x_i - \\\\bar{x})^2 \\\\sum (y_i - \\\\bar{y})^2}}"  // Correlation

// Ecological formulas
"H' = -\\\\sum p_i \\\\ln(p_i)"                                // Shannon diversity
"E = \\\\frac{\\\\text{Energy}_{n+1}}{\\\\text{Energy}_n} \\\\times 100\\\\%"  // Transfer efficiency
```

### Data Validation Rules

1. **Ecological Plausibility**
   - Rhine River temperature: 4-25°C (seasonal range)
   - Fish species richness: 15-30 species (realistic for Rhine)
   - Primary productivity: 2,000-12,000 kcal/m²/year (temperate ecosystems)
   - Shannon diversity index: 1.5-3.5 (typical urban park range)

2. **Statistical Validity**
   - Sample sizes: n ≥ 20 (adequate for statistical inference)
   - Correlation coefficients: -1 ≤ r ≤ 1
   - Standard deviations: σ > 0
   - Probabilities: 0 ≤ P ≤ 1

3. **Cross-Disciplinary Coherence**
   - Statistical methods appropriate for ecological data type
   - Ecological interpretations supported by statistical results
   - Basel context authentic and educationally relevant


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Exact ELITE Question Count per Module

*For any* module (SM2.10 or SB3.01), the count of questions with difficulty="ELITE" must equal exactly 5.

**Validates: Requirements 1.1, 2.1**

### Property 2: Total Quest Count Preservation

*For any* module (SM2.10 or SB3.01), the total quest count must equal 65 (60 existing + 5 new ELITE).

**Validates: Requirements 1.5, 2.5**

### Property 3: ELITE Questions Render Without Errors

*For any* ELITE question in either module, rendering the question in the ChamberLayout component must complete without runtime errors.

**Validates: Requirements 1.2, 2.2, 7.3, 7.4, 9.4**

### Property 4: Ecological Content in SM2.10 ELITE Questions

*For any* ELITE question in SM2.10 module, the question content must include ecological data analysis scenarios (verified by presence of ecological keywords: species, ecosystem, biodiversity, population, Rhine, habitat, climate).

**Validates: Requirements 1.3**

### Property 5: Statistical Methods in SB3.01 ELITE Questions

*For any* ELITE question in SB3.01 module, the question content must include statistical method applications (verified by presence of statistical keywords: mean, median, correlation, standard deviation, probability, distribution, variance).

**Validates: Requirements 2.3**

### Property 6: Basel Context in All ELITE Questions

*For any* ELITE question in either module, the question must contain Basel-specific references (Rhine River, Basel parks, Basel climate, Kannenfeldpark, Novartis, Roche, or other Basel locations).

**Validates: Requirements 1.4, 2.4, 3.1**

### Property 7: Minimum Basel Data Category Coverage

*For the complete set* of 10 ELITE questions, at least 2 questions must reference each Basel data category: Rhine River ecological monitoring, urban green spaces, climate data, and biodiversity data.

**Validates: Requirements 3.2, 3.3, 3.4, 3.5**

### Property 8: Realistic Basel Environmental Data

*For any* ELITE question containing Basel environmental data, all numerical values must fall within realistic ranges:
- Rhine River temperature: 4-25°C
- Fish species richness: 15-30 species
- Primary productivity: 2,000-12,000 kcal/m²/year
- Shannon diversity index: 1.5-3.5
- Basel annual temperature: 8-12°C mean
- Basel annual precipitation: 700-900mm

**Validates: Requirements 3.6, 10.1, 10.4, 10.5**

### Property 9: Complete Three-Language Support

*For any* ELITE question, complete content must exist in all three languages (English, Chinese, German), including: prompt text, answer labels, explanations, and hints (all non-empty strings).

**Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5**

### Property 10: Language Switching Preserves State

*For any* ELITE question, switching between languages (EN → CN → DE → EN) must preserve the question state and display the correct translation without data loss.

**Validates: Requirements 4.6**

### Property 11: Four-Backslash LaTeX Notation

*For any* ELITE question containing mathematical notation, all LaTeX strings must use four-backslash notation (\\\\) for proper rendering, and LaTeX formatting must be identical across all three language versions.

**Validates: Requirements 5.1, 5.2, 5.4**

### Property 12: LaTeX Renders in All Languages

*For any* ELITE question with LaTeX content, the LaTeX must render without errors in all three supported languages.

**Validates: Requirements 5.3**

### Property 13: Multi-Step Cross-Disciplinary Reasoning

*For any* ELITE question, the question must require multi-step reasoning combining both disciplines (verified by: having ≥ 2 hints, and containing keywords from both statistical and ecological domains).

**Validates: Requirements 6.1, 6.4**

### Property 14: Advanced Statistical Methods in SM2.10

*For any* ELITE question in SM2.10 module, the question must require advanced statistical methods beyond basic descriptive statistics (verified by presence of: correlation, probability, z-score, confidence interval, hypothesis test, or regression).

**Validates: Requirements 6.2**

### Property 15: Quantitative Ecological Analysis in SB3.01

*For any* ELITE question in SB3.01 module, the question must require quantitative ecological analysis (verified by: having numerical expected answers and containing ecological calculation keywords: energy transfer, efficiency, growth rate, carrying capacity, diversity index).

**Validates: Requirements 6.3, 8.4**

### Property 16: Quest Data Structure Compliance

*For any* ELITE question, the question data must conform to the Quest interface with all required fields present and correctly typed: id (string), difficulty (Difficulty), stage (Stage), promptLatex (string), expressionLatex (string), targetLatex (string), slots (Slot[]), correctLatex (string), hintLatex (string[]).

**Validates: Requirements 7.1, 7.5, 9.3, 9.5**

### Property 17: Correct File Location

*For the complete set* of ELITE questions, all SM2.10 ELITE questions must exist in src/app/chamber/sm2-10/page.tsx and all SB3.01 ELITE questions must exist in src/app/chamber/sb3-01/page.tsx.

**Validates: Requirements 7.2**

### Property 18: Ecological Context Affects Statistical Interpretation

*For any* ELITE question in SM2.10 module, the ecological context must be necessary for correct statistical interpretation (verified by: explanation text explicitly connecting statistical results to ecological implications).

**Validates: Requirements 8.1**

### Property 19: Statistical Methods Required for Ecological Solutions

*For any* ELITE question in SB3.01 module, statistical calculations must be required to solve the ecological problem (verified by: having numerical expected answers derived from statistical formulas).

**Validates: Requirements 8.2**

### Property 20: Explanations Connect Both Disciplines

*For any* ELITE question, the explanation must explicitly connect both disciplinary concepts (verified by: explanation containing both statistical terms and ecological terms).

**Validates: Requirements 8.5**

### Property 21: TypeScript Compilation Success

*For the complete set* of modified files (sm2-10/page.tsx and sb3-01/page.tsx), TypeScript compilation must complete without errors.

**Validates: Requirements 9.1**

### Property 22: Linting Rules Compliance

*For the complete set* of modified files, all existing linting rules must pass without errors.

**Validates: Requirements 9.2**

### Property 23: Correct Statistical Method Application

*For any* ELITE question using statistical formulas, the formula must be mathematically correct according to standard statistical practice (verified by: formula matching standard definitions for mean, standard deviation, correlation, z-score, etc.).

**Validates: Requirements 10.2**

## Error Handling

### Input Validation

1. **Answer Validation**
   - Numerical answers: Accept values within ±0.01 of expected value (accounting for rounding)
   - String answers: Case-insensitive comparison with trimmed whitespace
   - Unit handling: Accept answers with or without units if units are specified in prompt

2. **Data Range Validation**
   - Validate all Basel environmental data against realistic ranges before question creation
   - Reject questions with implausible values during development
   - Log warnings for edge-case values that are technically valid but unusual

3. **LaTeX Validation**
   - Validate LaTeX syntax before rendering
   - Provide fallback plain text if LaTeX rendering fails
   - Log LaTeX rendering errors for debugging

### Language Handling

1. **Missing Translation Detection**
   - Check for empty strings in any language field
   - Provide English fallback if translation missing
   - Log missing translations for correction

2. **Character Encoding**
   - Ensure UTF-8 encoding for Chinese characters
   - Validate German umlauts (ä, ö, ü, ß) render correctly
   - Handle special mathematical symbols in all languages

### Runtime Error Recovery

1. **Question Loading Failures**
   - Catch and log errors during question data loading
   - Skip malformed questions and continue with valid questions
   - Display user-friendly error message if all questions fail

2. **Rendering Failures**
   - Catch component rendering errors
   - Display fallback UI with error message
   - Allow user to continue with other questions

3. **State Management Errors**
   - Validate state transitions
   - Reset to safe state if corruption detected
   - Preserve user progress where possible

## Testing Strategy

### Dual Testing Approach

This feature requires both unit testing and property-based testing for comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, and error conditions
- **Property tests**: Verify universal properties across all inputs
- Both approaches are complementary and necessary

### Unit Testing

Unit tests focus on specific examples and integration points:

1. **Example-Based Tests**
   - Test that exactly 5 ELITE questions exist in SM2.10 (Requirement 1.1)
   - Test that exactly 5 ELITE questions exist in SB3.01 (Requirement 2.1)
   - Test that total quest count equals 65 in each module (Requirements 1.5, 2.5)
   - Test that at least 2 questions use Rhine River data (Requirement 3.2)
   - Test that at least 2 questions use urban green space data (Requirement 3.3)
   - Test that at least 2 questions use climate data (Requirement 3.4)
   - Test that at least 2 questions use biodiversity data (Requirement 3.5)
   - Test that questions exist in correct page.tsx files (Requirement 7.2)
   - Test TypeScript compilation succeeds (Requirement 9.1)
   - Test linting passes (Requirement 9.2)

2. **Edge Cases**
   - Test questions with maximum realistic data values
   - Test questions with minimum realistic data values
   - Test questions with complex LaTeX formulas
   - Test language switching with partially completed answers

3. **Integration Tests**
   - Test ELITE questions render in ChamberLayout component
   - Test ELITE questions work with visualization components
   - Test language switching preserves question state
   - Test answer validation with various input formats

### Property-Based Testing

Property tests verify universal properties across all ELITE questions using randomization:

**Testing Library**: Use `fast-check` for TypeScript property-based testing

**Configuration**: Each property test must run minimum 100 iterations

**Test Tagging**: Each test must reference its design document property:
```typescript
// Feature: cross-disciplinary-sm2-10-sb3-01, Property 4: Ecological Content in SM2.10 ELITE Questions
```

**Property Test Suite**:

1. **Content Properties** (Properties 4, 5, 6, 8, 9, 11, 12)
   - Generate: Random selection of ELITE questions
   - Verify: Content requirements (ecological keywords, statistical keywords, Basel context, language completeness, LaTeX formatting, realistic data ranges)

2. **Structural Properties** (Properties 1, 2, 3, 16, 17)
   - Generate: Random module selection
   - Verify: Question counts, data structure compliance, file locations, rendering success

3. **Cross-Disciplinary Properties** (Properties 13, 14, 15, 18, 19, 20)
   - Generate: Random ELITE questions by module
   - Verify: Multi-step reasoning, advanced methods, quantitative analysis, disciplinary connections

4. **Language Properties** (Properties 9, 10, 12)
   - Generate: Random ELITE questions and random language sequences
   - Verify: Complete translations, state preservation, LaTeX rendering

5. **Validation Properties** (Properties 8, 23)
   - Generate: Random ELITE questions with numerical data
   - Verify: Data ranges, formula correctness

**Example Property Test**:

```typescript
import fc from 'fast-check';

// Feature: cross-disciplinary-sm2-10-sb3-01, Property 4: Ecological Content in SM2.10 ELITE Questions
test('SM2.10 ELITE questions contain ecological content', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...sm210EliteQuestions),
      (question) => {
        const ecologicalKeywords = [
          'species', 'ecosystem', 'biodiversity', 'population',
          'Rhine', 'habitat', 'climate', 'ecological'
        ];
        const content = question.promptLatex.toLowerCase();
        return ecologicalKeywords.some(keyword => content.includes(keyword));
      }
    ),
    { numRuns: 100 }
  );
});
```

### Test Coverage Goals

- Unit test coverage: ≥ 90% of question data validation logic
- Property test coverage: All 23 correctness properties
- Integration test coverage: All component interactions
- Manual testing: Scientific accuracy validation by domain experts

### Continuous Integration

- Run all tests on every commit
- Block merges if any test fails
- Generate coverage reports
- Validate TypeScript types
- Run linting checks

