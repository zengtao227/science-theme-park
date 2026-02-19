# Design Document

## Overview

This design document specifies the technical implementation for Phase 4.2.1.1: Cross-Disciplinary ELITE Questions Enhancement. The feature adds 10 competition-level ELITE difficulty questions that integrate vector mathematics with force mechanics, distributed across GM2.01 (Vectors in 3D space) and SP3.02 (Newton's Laws and Forces).

### Feature Scope

The implementation adds:
- 5 ELITE questions to GM2.01 (Vectors module) incorporating physics force concepts
- 5 ELITE questions to SP3.02 (Forces module) incorporating vector mathematics
- Three-language support (EN/CN/DE) for all new content
- Basel-specific scenarios for authentic local context
- LaTeX rendering for mathematical expressions

### Design Goals

1. **Cross-Disciplinary Integration**: Seamlessly combine vector mathematics and force mechanics concepts
2. **Competition-Level Difficulty**: Provide challenging problems suitable for mathematics and physics competitions
3. **Educational Value**: Maintain pedagogical quality while incorporating authentic Basel scenarios
4. **System Integration**: Follow existing quest data structures and patterns for seamless integration
5. **Multilingual Support**: Ensure consistent experience across English, Chinese, and German

## Architecture

### System Components

The implementation involves modifications to existing components rather than creating new ones:

```
src/app/chamber/
├── gm2-01/
│   └── page.tsx                    # GM2.01 Vector module (modify quest data)
└── sp3-02/
    └── page.tsx                    # SP3.02 Forces module (modify quest data)

src/lib/i18n/
├── en/
│   ├── math.ts                     # English translations for GM2.01
│   └── physics.ts                  # English translations for SP3.02
├── cn/
│   ├── math.ts                     # Chinese translations for GM2.01
│   └── physics.ts                  # Chinese translations for SP3.02
└── de/
    ├── math.ts                     # German translations for GM2.01
    └── physics.ts                  # German translations for SP3.02
```

### Integration Points

1. **Quest Data Arrays**: Append new questions to existing ELITE difficulty arrays
2. **Translation System**: Add scenario descriptions and prompts to i18n files
3. **LaTeX Renderer**: Utilize existing KaTeX infrastructure for mathematical notation
4. **Quest Manager**: Leverage existing useQuestManager hook for quest lifecycle

## Components and Interfaces

### GM2.01 Quest Data Structure

The GM2.01 module uses three stages with specific data structures:

**NAVIGATION Stage** (Calculate vector from points and magnitude):
```typescript
interface NavigationData {
  id: string;                           // Quest ID (e.g., "N_E6")
  A: [number, number, number];          // Starting point coordinates
  B: [number, number, number];          // Ending point coordinates
}
```

**DOT Stage** (Calculate dot product between vectors):
```typescript
interface DotData {
  id: string;                           // Quest ID (e.g., "D_E6")
  v: [number, number, number];          // First vector components
  w: [number, number, number];          // Second vector components
}
```

**MISSION Stage** (Combined vector operations):
```typescript
interface MissionData {
  id: string;                           // Quest ID (e.g., "M_E6")
  A: [number, number, number];          // Starting point coordinates
  B: [number, number, number];          // Ending point coordinates
  s: [number, number, number];          // Additional vector for dot product
}
```

### SP3.02 Quest Data Structure

The SP3.02 module uses a unified data structure across three stages:

```typescript
interface SP302QuestData {
  id: string;        // Quest ID (e.g., "Q6")
  m: number;         // Mass in kg
  f?: number;        // Force in N (optional)
  mu?: number;       // Friction coefficient (optional)
  a?: number;        // Acceleration in m/s² (optional)
  theta?: number;    // Angle in degrees (optional)
  v?: number;        // Velocity in m/s (optional)
  scen: string;      // Scenario description key for i18n
  expect: number;    // Expected answer (2 decimal precision)
}
```

### Cross-Disciplinary Question Design

#### GM2.01 Cross-Disciplinary Questions

For GM2.01, ELITE questions integrate physics concepts:

1. **Force Vector Decomposition**: Questions involving force vectors in 3D space
2. **Equilibrium Analysis**: Vector calculations for forces in equilibrium
3. **Momentum Calculations**: Vector operations with momentum and velocity

Example integration:
- NAVIGATION: Calculate displacement vector for a force application scenario
- DOT: Calculate work done (force · displacement) using dot product
- MISSION: Combined operations involving force vectors and projections

#### SP3.02 Cross-Disciplinary Questions

For SP3.02, ELITE questions integrate vector mathematics:

1. **3D Vector Analysis**: Forces acting in three-dimensional space
2. **Vector Decomposition**: Breaking down forces into components
3. **Dot Product Applications**: Work calculations and force projections

Example integration:
- NEWTON_1: Equilibrium with 3D force vectors
- NEWTON_2: F=ma with vector force components
- FRICTION: Friction forces with vector decomposition on inclined planes

## Data Models

### Quest ID Naming Convention

**GM2.01 Quest IDs**:
- NAVIGATION ELITE: N_E6, N_E7, N_E8, N_E9, N_E10
- DOT ELITE: D_E6, D_E7, D_E8, D_E9, D_E10
- MISSION ELITE: M_E6, M_E7, M_E8, M_E9, M_E10

**SP3.02 Quest IDs**:
- NEWTON_1 ELITE: Q6, Q7, Q8, Q9, Q10
- NEWTON_2 ELITE: Q6, Q7, Q8, Q9, Q10
- FRICTION ELITE: Q6, Q7, Q8, Q9, Q10

### Basel Scenario Contexts

Each question incorporates authentic Basel locations and infrastructure:

**Basel Locations for GM2.01**:
1. Rhine River bridge structural analysis
2. Basel tram force mechanics
3. Roche Tower engineering calculations
4. Basel Port cargo operations
5. University Hospital drone delivery

**Basel Locations for SP3.02**:
1. Rhine River bridge force analysis
2. Basel tram acceleration dynamics
3. Roche Tower structural forces
4. Basel Port crane mechanics
5. University Hospital equipment forces

### Translation Keys Structure

**GM2.01 Translation Keys**:
```typescript
gm2_01: {
  scenarios: {
    navigation_elite_1: "Rhine bridge scenario...",
    navigation_elite_2: "Basel tram scenario...",
    // ... additional scenarios
  }
}
```

**SP3.02 Translation Keys**:
```typescript
sp3_02: {
  prompts: {
    elite_scenario_1: "Rhine bridge force scenario...",
    elite_scenario_2: "Basel tram force scenario...",
    // ... additional scenarios
  },
  hints: {
    elite_scenario_1: "Consider 3D vector components...",
    elite_scenario_2: "Decompose forces in x, y, z...",
    // ... additional hints
  }
}
```

### Answer Precision

All expected answers are calculated and stored with 2 decimal precision:
- GM2.01: Magnitudes, dot products rounded to 2 decimal places
- SP3.02: Forces, accelerations rounded to 2 decimal places

Example calculation:
```typescript
const magnitude = Math.round(Math.sqrt(vx**2 + vy**2 + vz**2) * 100) / 100;
```


## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property Reflection

After analyzing all acceptance criteria, I identified several areas where properties can be consolidated:

**Redundancy Analysis**:
1. Properties 1.5 and 2.5 (decimal precision) can be combined into a single property about answer precision across both modules
2. Properties 3.1, 3.2, 3.3 can be combined into a single property about translation completeness across all languages
3. Properties 4.1, 4.2, 4.3, 4.4 can be combined into a single property about LaTeX syntax correctness
4. Properties 1.4 and 2.4 (Basel scenarios) can be combined into a single property about scenario authenticity
5. Properties 5.5 and quest ID uniqueness is already comprehensive

### Property 1: Quest Data Completeness

For any module (GM2.01 or SP3.02), after adding new ELITE questions, each stage should contain at least one new ELITE question, and the total count of new ELITE questions should equal 5 per module.

**Validates: Requirements 1.1, 1.3, 2.1, 2.3**

### Property 2: Answer Precision Consistency

For any expected answer in GM2.01 or SP3.02 ELITE questions, the value should be stored as a number with exactly 2 decimal places of precision.

**Validates: Requirements 1.5, 2.5, 9.1**

### Property 3: Basel Scenario Authenticity

For any ELITE question scenario text in GM2.01 or SP3.02, the scenario should reference at least one authentic Basel landmark (Rhine River, Roche Tower, Basel Tram, Basel Port, University Hospital, or other documented Basel locations).

**Validates: Requirements 1.4, 2.4, 7.1, 7.3**

### Property 4: Translation Completeness

For any new ELITE question, translation keys for prompts and hints should exist in all three language files (EN, CN, DE), and the mathematical notation (LaTeX) should be identical across all three translations.

**Validates: Requirements 3.1, 3.2, 3.3, 3.5**

### Property 5: LaTeX Syntax Correctness

For any LaTeX string in quest data, the string should use proper escape sequences (four backslashes for LaTeX commands), proper vector notation (\\\\vec{}), proper mathematical symbols (\\\\cdot, \\\\theta, \\\\mu), and proper subscript/superscript syntax.

**Validates: Requirements 4.1, 4.2, 4.3, 4.4**

### Property 6: LaTeX Rendering Success

For any LaTeX expression in ELITE questions, the KaTeX renderer should successfully render the expression without throwing errors.

**Validates: Requirements 4.5, 8.5**

### Property 7: Quest ID Uniqueness and Format

For any set of quest IDs within a module and stage, all IDs should be unique and follow the established naming convention (GM2.01: N_E[6-10], D_E[6-10], M_E[6-10]; SP3.02: Q[6-10]).

**Validates: Requirements 5.5**

### Property 8: Decimal Parameter Inclusion

For any ELITE question in GM2.01 or SP3.02, at least one numeric parameter (coordinates, forces, masses, coefficients) should contain a non-integer decimal value.

**Validates: Requirements 6.3**

### Property 9: Answer Validation Tolerance

For any student input that is within ±0.01 of the expected answer, the validation system should accept the answer as correct.

**Validates: Requirements 9.2, 9.3**

### Property 10: Expected Answer Presence

For any quest in the ELITE difficulty data structures, the quest data should include a non-null expected answer value.

**Validates: Requirements 9.5**

## Error Handling

### Input Validation

**Invalid Numeric Input**:
- Empty strings: Treated as incorrect answer
- Non-numeric strings: Treated as incorrect answer
- Out-of-range values: Accepted if within tolerance of expected answer

**LaTeX Rendering Errors**:
- Malformed LaTeX: Caught by KaTeX and displayed as error message
- Missing escape sequences: Prevented by code review and testing
- Invalid mathematical notation: Caught during development testing

### Translation Errors

**Missing Translation Keys**:
- Development: TypeScript will show type errors for missing keys
- Runtime: Fallback to English translation if key missing
- Testing: Property tests verify all keys exist

**Inconsistent Mathematical Notation**:
- Prevented by using identical LaTeX strings across languages
- Verified by property tests comparing LaTeX across translations

### Data Structure Errors

**Type Mismatches**:
- Caught by TypeScript compiler at build time
- Prevented by following existing interfaces exactly
- Verified by compilation success

**Missing Required Fields**:
- Caught by TypeScript compiler
- Verified by property tests checking data completeness

### Quest Generation Errors

**Calculation Errors**:
- Prevented by using tested calculation functions
- Verified by unit tests for specific examples
- Double-checked by manual calculation review

**ID Collisions**:
- Prevented by following sequential naming convention
- Verified by property tests checking uniqueness

## Testing Strategy

### Dual Testing Approach

This feature requires both unit tests and property-based tests for comprehensive coverage:

**Unit Tests** focus on:
- Specific example questions verify correct calculations
- Integration with existing quest manager
- Translation key existence for specific scenarios
- TypeScript compilation success
- Build process completion

**Property-Based Tests** focus on:
- Universal properties across all ELITE questions
- Data structure consistency
- Translation completeness across languages
- LaTeX syntax correctness
- Answer precision requirements

### Property-Based Testing Configuration

**Testing Library**: fast-check (JavaScript/TypeScript property-based testing library)

**Test Configuration**:
- Minimum 100 iterations per property test
- Each test references its design document property
- Tag format: `Feature: cross-disciplinary-elite-questions-phase1, Property {number}: {property_text}`

**Example Property Test Structure**:
```typescript
import fc from 'fast-check';

// Feature: cross-disciplinary-elite-questions-phase1, Property 2: Answer Precision Consistency
test('All ELITE expected answers have 2 decimal precision', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...allEliteQuestions),
      (quest) => {
        const answerStr = quest.expect.toString();
        const decimalPart = answerStr.split('.')[1];
        return decimalPart && decimalPart.length === 2;
      }
    ),
    { numRuns: 100 }
  );
});
```

### Unit Testing Focus

**GM2.01 Specific Tests**:
- Verify 5 new questions added to navigationDataElite, dotDataElite, missionDataElite
- Test vector magnitude calculations for specific examples
- Test dot product calculations for specific examples
- Verify quest IDs follow N_E[6-10], D_E[6-10], M_E[6-10] pattern

**SP3.02 Specific Tests**:
- Verify 5 new questions added to QUEST_DATA[stage].ELITE
- Test force calculations for specific examples
- Test friction calculations for specific examples
- Verify quest IDs follow Q[6-10] pattern

**Translation Tests**:
- Verify English translation keys exist for all new scenarios
- Verify Chinese translation keys exist for all new scenarios
- Verify German translation keys exist for all new scenarios
- Test language switching updates displayed text

**Integration Tests**:
- Verify quest manager correctly loads ELITE questions
- Verify answer validation accepts correct answers
- Verify LaTeX rendering displays without errors
- Verify stage completion tracking works

### Test Coverage Goals

- 100% coverage of new quest data arrays
- 100% coverage of new translation keys
- All 10 correctness properties tested with property-based tests
- All critical calculation paths tested with unit tests
- All three languages tested for completeness

### Manual Testing Checklist

Due to the subjective nature of some requirements, manual testing is required for:

1. **Cross-Disciplinary Content Quality**:
   - Verify questions genuinely integrate vector math and physics concepts
   - Confirm questions are competition-level difficulty
   - Validate multi-step problem-solving requirement

2. **Basel Scenario Authenticity**:
   - Verify realistic parameters for Basel infrastructure
   - Confirm scenarios enhance educational value
   - Validate local context appropriateness

3. **Hint Quality**:
   - Verify hints guide without revealing solutions
   - Confirm hints are helpful for students
   - Validate hint translations maintain intent

4. **Educational Value**:
   - Verify pedagogical soundness of cross-disciplinary combinations
   - Confirm questions align with curriculum goals
   - Validate difficulty progression

## Implementation Notes

### Development Workflow

1. **Phase 1: Quest Data Creation**
   - Design 10 cross-disciplinary questions (5 per module)
   - Calculate expected answers with 2 decimal precision
   - Assign quest IDs following naming conventions
   - Document cross-disciplinary concepts in comments

2. **Phase 2: Translation Creation**
   - Write English scenario descriptions
   - Translate to Chinese and German
   - Ensure LaTeX notation consistency
   - Add translation keys to i18n files

3. **Phase 3: Code Integration**
   - Add quest data to GM2.01 arrays
   - Add quest data to SP3.02 QUEST_DATA structure
   - Verify TypeScript compilation
   - Test LaTeX rendering

4. **Phase 4: Testing**
   - Write property-based tests for all 10 properties
   - Write unit tests for specific examples
   - Run full test suite
   - Perform manual testing checklist

5. **Phase 5: Validation**
   - Build application successfully
   - Test in development environment
   - Verify all three languages display correctly
   - Confirm Basel scenarios render properly

### Code Review Checklist

- [ ] All 10 questions added (5 per module)
- [ ] Quest IDs follow naming conventions
- [ ] Expected answers have 2 decimal precision
- [ ] At least 1 question per stage in each module
- [ ] All questions include Basel scenarios
- [ ] All questions include decimal parameters
- [ ] LaTeX syntax uses proper escape sequences
- [ ] Translation keys exist in all 3 languages
- [ ] Mathematical notation consistent across languages
- [ ] Comments document cross-disciplinary concepts
- [ ] TypeScript compiles without errors
- [ ] All tests pass
- [ ] Build completes successfully

### Performance Considerations

**No Performance Impact Expected**:
- Adding 10 questions to existing arrays is negligible
- Quest data is loaded synchronously at page load
- No additional API calls or async operations
- LaTeX rendering performance unchanged (same renderer)

**Memory Impact**:
- Approximately 2-3 KB additional data per module
- Translation strings add approximately 5-10 KB total
- Negligible impact on bundle size

### Accessibility Considerations

**Mathematical Content Accessibility**:
- LaTeX rendered by KaTeX provides semantic HTML
- Screen readers can interpret mathematical notation
- High contrast maintained for visual clarity
- Font sizes follow existing responsive design

**Multilingual Accessibility**:
- All content available in three languages
- Language switching maintains context
- Mathematical notation universal across languages

### Browser Compatibility

**No New Browser Requirements**:
- Uses existing KaTeX library (already tested)
- No new JavaScript features required
- Compatible with all browsers supporting existing features
- No additional polyfills needed

## Deployment Considerations

### Rollout Strategy

**Single Deployment**:
- All 10 questions deployed simultaneously
- No feature flags required
- No gradual rollout needed (low risk)

**Rollback Plan**:
- Revert commit if critical issues found
- Quest data changes are isolated and safe to revert
- No database migrations required

### Monitoring

**Success Metrics**:
- ELITE question completion rates
- Average time spent on ELITE questions
- Language distribution for ELITE questions
- Error rates for ELITE questions

**Error Monitoring**:
- LaTeX rendering errors
- Translation key missing errors
- Answer validation errors
- Quest loading errors

### Documentation Updates

**User-Facing Documentation**:
- No changes required (questions appear automatically)
- Existing help text covers ELITE difficulty

**Developer Documentation**:
- Update quest data structure documentation
- Document cross-disciplinary question design patterns
- Add examples of Basel scenario creation

## Future Enhancements

### Phase 2 Considerations

**Additional Cross-Disciplinary Questions**:
- More modules could benefit from cross-disciplinary integration
- Chemistry + Mathematics combinations
- Biology + Statistics combinations

**Enhanced Visualizations**:
- 3D force vector visualizations for SP3.02
- Interactive Basel map showing scenario locations

**Adaptive Difficulty**:
- Dynamic question selection based on student performance
- Personalized cross-disciplinary pathways

**Community Contributions**:
- Teacher-submitted cross-disciplinary questions
- Student-created Basel scenarios
- Peer review system for question quality

