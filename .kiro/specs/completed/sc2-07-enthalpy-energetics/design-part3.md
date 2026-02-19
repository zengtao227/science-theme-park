## Error Handling

### Input Validation

**Invalid Numerical Input**:
- User enters non-numeric text (e.g., "abc") in ΔH or q field
- System: Treat as invalid, display error message "Please enter a numerical value"
- Prevent verification until valid input provided

**Out of Range Values**:
- User enters extremely large or small numbers (> 10000 or < -10000 kJ)
- System: Display warning "This value seems unusually large/small. Please check your calculation."
- Allow user to proceed or revise

**Missing Units**:
- User enters value without considering units (e.g., enters 286000 instead of 286 for kJ)
- System: Check if answer is off by factor of 1000
- Display hint: "Check your units. The answer should be in kJ, not J."

**Decimal Precision**:
- User enters answer with excessive decimal places
- System: Round to 1 decimal place for comparison
- Accept answers within ±1 kJ tolerance

**Empty Input Fields**:
- User clicks "Verify" with empty input fields
- System: Display error message "Please enter your answer before verifying"
- Highlight empty fields in red
- Prevent verification

### Quest Loading Errors

**Missing Quest Data**:
- Quest pool generation fails or returns empty array
- System: Display loading state with message "Loading thermochemistry quests..."
- Log error to console for debugging
- Retry quest loading after 2 seconds
- If retry fails, display error message with refresh button

**Invalid Quest Structure**:
- Quest object missing required fields (id, reaction, deltaH, etc.)
- System: Skip invalid quest, load next valid quest
- Log warning to console with missing field details
- Ensure at least 3 valid quests available per stage/difficulty

**Malformed Thermochemical Equations**:
- Equation string cannot be parsed or missing state symbols
- System: Display error message "Unable to load this quest"
- Skip to next quest
- Log parsing error details

**Missing Enthalpy Data**:
- Quest missing deltaH, bondEnergies, formationEnthalpies, or calorimetryData
- System: Display error "Quest data incomplete"
- Skip to next quest
- Log missing data fields

### LaTeX Rendering Errors

**Invalid LaTeX Syntax**:
- LaTeX string contains syntax errors (unmatched braces, invalid commands)
- System: Display fallback text notation (e.g., "H2O(l)" instead of formatted version)
- Log LaTeX error to console
- Continue with functionality intact

**React-Katex Library Failure**:
- react-katex fails to load or render
- System: Fall back to plain text chemical notation
- Display warning banner "Chemical formulas may not display correctly"
- Ensure all functionality remains operational

**Missing LaTeX Strings**:
- Quest missing equationLatex or formulaLatex fields
- System: Generate LaTeX from plain formula string
- Use conversion function: `formulaToLatex(formula)`
- Add state symbols: (s), (l), (g), (aq)
- Log warning about missing LaTeX data

**State Symbol Errors**:
- Equation missing state symbols
- System: Display warning "State symbols missing"
- Allow quest to proceed but mark as incomplete data
- Log missing state symbols

### Visualization Errors

**Missing Energy Level Data**:
- Quest lacks enthalpy values for energy diagram
- System: Display simplified text-based energy comparison
- Show ΔH value without diagram
- Functionality remains intact

**Animation Failures**:
- Framer Motion or animation library fails
- System: Display static energy diagrams
- Show before/after states without animation
- Core learning objectives still achievable

**Canvas Rendering Issues**:
- Browser doesn't support required graphics features
- System: Fall back to SVG-based visualization
- Display warning about limited visualization
- Ensure calculations and verification still work

**Calorimeter Visualization Errors**:
- Cannot render calorimeter apparatus
- System: Display data in table format
- Show mass, c, ΔT, and q values
- Provide text description of process

### Calculation Errors

**Division by Zero**:
- Calculating ΔH per mole when moles = 0
- System: Display error "Cannot calculate ΔH per mole: number of moles is zero"
- Prevent calculation
- Log error details

**Negative Mass or Temperature**:
- Calorimetry data contains negative mass or absolute temperature below 0 K
- System: Display error "Invalid physical values detected"
- Skip to next quest
- Log invalid data

**Bond Energy Lookup Failures**:
- Bond type not found in reference table
- System: Display error "Bond energy data unavailable for [bond type]"
- Provide hint to check bond type notation
- Allow manual entry of bond energy

**Formation Enthalpy Lookup Failures**:
- Compound not found in reference table
- System: Display error "Formation enthalpy unavailable for [compound]"
- Provide hint to check compound formula
- Allow manual entry of ΔH°f value

### Hess's Law Pathway Errors

**Invalid Equation Combination**:
- Selected equations don't combine to form target equation
- System: Display error "Selected equations do not combine to form the target equation"
- Highlight mismatched species
- Provide hint about which species are unbalanced

**Circular Pathway**:
- User selects equations that form a circular pathway (no net reaction)
- System: Display error "Pathway is circular and produces no net reaction"
- Suggest removing redundant equations

**Missing Intermediate**:
- Pathway missing necessary intermediate species
- System: Display hint "You may need an equation involving [species]"
- Highlight available equations containing that species

**Incorrect ΔH Summation**:
- User calculates total ΔH incorrectly
- System: Display error "Total ΔH calculation is incorrect"
- Show correct summation: ΔH_total = ΔH₁ + ΔH₂ + ...
- Highlight which ΔH values should be added

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

**Technical Term Translation**:
- Thermochemistry terms may not translate well
- System: Provide both translated term and English term in parentheses
- Example: "焓 (Enthalpy)", "赫斯定律 (Hess's Law)"
- Ensure clarity for technical concepts

### Stage and Navigation Errors

**Invalid Stage Selection**:
- User attempts to access non-existent stage
- System: Redirect to first valid stage (Energy Changes)
- Log warning about invalid stage
- Display available stages clearly

**Quest Index Out of Bounds**:
- System attempts to load quest beyond array length
- System: Reset to first quest of current stage
- Log error with quest index details
- Ensure quest pool is properly initialized

**Progress Persistence Failure**:
- localStorage unavailable or quota exceeded
- System: Continue with in-memory state only
- Display warning "Progress will not be saved across sessions"
- Functionality continues normally

**Stage Completion Tracking Error**:
- Cannot update completion status
- System: Continue allowing navigation
- Log error details
- Attempt to save completion status on next successful verification

### Reference Table Errors

**Bond Energy Table Loading Failure**:
- Cannot load bond energy reference data
- System: Display error "Bond energy table unavailable"
- Provide common bond energies in quest description
- Allow quest to proceed with provided data

**Formation Enthalpy Table Loading Failure**:
- Cannot load formation enthalpy reference data
- System: Display error "Formation enthalpy table unavailable"
- Provide necessary ΔH°f values in quest description
- Allow quest to proceed with provided data

**Table Search Failure**:
- Search function in reference table not working
- System: Display full table without search
- Allow manual scrolling to find values
- Log search error details

### Data Validation Errors

**Inconsistent Stoichiometry**:
- Equation coefficients don't balance
- System: Display warning "Equation may not be balanced"
- Proceed with quest but flag for review
- Log inconsistency details

**Thermodynamic Impossibility**:
- Calculated values violate thermodynamic principles (e.g., Ea < |ΔH|)
- System: Display warning "Values may be physically unrealistic"
- Allow quest to proceed
- Log suspicious values for review

**Unit Mismatch**:
- Quest data contains mixed units (J and kJ)
- System: Convert all to consistent units (kJ)
- Log unit conversion
- Display values in consistent units

## Testing Strategy

### Dual Testing Approach

The module requires both unit testing and property-based testing for comprehensive coverage:

**Unit Tests**: Verify specific examples, edge cases, and error conditions
- Specific enthalpy calculations with known values
- Edge cases: zero enthalpy, very large/small values
- Error conditions: invalid input, missing data
- Integration points between components

**Property Tests**: Verify universal properties across all inputs
- Enthalpy calculation formulas hold for all input values
- Hess's Law operations (reversal, multiplication) work correctly
- Quest pool generation produces correct counts
- Translation completeness across all languages

Both testing approaches are complementary and necessary for ensuring correctness.

### Property-Based Testing Configuration

**Library**: fast-check (TypeScript/JavaScript)

**Minimum Iterations**: 100 per property test (due to randomization)

**Tag Format**: Each property test must include a comment referencing the design document property:
```typescript
// Feature: sc2-07-enthalpy-energetics, Property 1: Reaction Type Classification by ΔH Sign
```

**Property Test Examples**:

```typescript
// Property 6: Enthalpy Calculation Correctness
test('enthalpy change calculation', () => {
  fc.assert(
    fc.property(
      fc.float({ min: -1000, max: 1000 }), // H_reactants
      fc.float({ min: -1000, max: 1000 }), // H_products
      (hReactants, hProducts) => {
        const deltaH = calculateEnthalpyChange(hReactants, hProducts);
        expect(deltaH).toBeCloseTo(hProducts - hReactants, 1);
      }
    ),
    { numRuns: 100 }
  );
});

// Property 9: Bond Energy Calculation Correctness
test('bond energy calculation', () => {
  fc.assert(
    fc.property(
      fc.array(fc.record({ type: fc.string(), energy: fc.float({ min: 0, max: 1000 }) })),
      fc.array(fc.record({ type: fc.string(), energy: fc.float({ min: 0, max: 1000 }) })),
      (bondsBroken, bondsFormed) => {
        const totalBroken = bondsBroken.reduce((sum, b) => sum + b.energy, 0);
        const totalFormed = bondsFormed.reduce((sum, b) => sum + b.energy, 0);
        const deltaH = calculateBondEnergyDeltaH(bondsBroken, bondsFormed);
        expect(deltaH).toBeCloseTo(totalBroken - totalFormed, 1);
      }
    ),
    { numRuns: 100 }
  );
});

// Property 13: Calorimetry Heat Calculation Correctness
test('calorimetry heat calculation', () => {
  fc.assert(
    fc.property(
      fc.float({ min: 1, max: 1000 }),    // mass (g)
      fc.float({ min: 0.1, max: 10 }),    // specific heat (J/g°C)
      fc.float({ min: -50, max: 50 }),    // temperature change (°C)
      (mass, specificHeat, tempChange) => {
        const heat = calculateHeat(mass, specificHeat, tempChange);
        expect(heat).toBeCloseTo(mass * specificHeat * tempChange, 1);
      }
    ),
    { numRuns: 100 }
  );
});
```

### Unit Testing Strategy

**Framework**: Jest with React Testing Library

**Coverage Target**: 80% for core calculation logic

**Focus Areas**:
1. Calculation functions (enthalpy, bond energy, calorimetry)
2. Quest pool generation
3. Answer verification with tolerance
4. Hess's Law pathway validation
5. LaTeX formula generation
6. Error handling for invalid inputs

**Unit Test Examples**:

```typescript
describe('Enthalpy Calculations', () => {
  test('calculates ΔH for simple reaction', () => {
    const hReactants = -100;
    const hProducts = -200;
    const deltaH = calculateEnthalpyChange(hReactants, hProducts);
    expect(deltaH).toBe(-100); // Exothermic
  });

  test('identifies exothermic reaction', () => {
    const deltaH = -286;
    const type = classifyReaction(deltaH);
    expect(type).toBe('exothermic');
  });

  test('identifies endothermic reaction', () => {
    const deltaH = 178;
    const type = classifyReaction(deltaH);
    expect(type).toBe('endothermic');
  });

  test('handles zero enthalpy change', () => {
    const deltaH = 0;
    const type = classifyReaction(deltaH);
    expect(type).toBe('neither'); // Edge case
  });
});

describe('Hess\'s Law Operations', () => {
  test('reverses equation and negates ΔH', () => {
    const equation = { equation: 'A → B', deltaH: -100 };
    const reversed = reverseEquation(equation);
    expect(reversed.equation).toBe('B → A');
    expect(reversed.deltaH).toBe(100);
  });

  test('multiplies equation and scales ΔH', () => {
    const equation = { equation: 'A → B', deltaH: -100 };
    const multiplied = multiplyEquation(equation, 2);
    expect(multiplied.equation).toBe('2A → 2B');
    expect(multiplied.deltaH).toBe(-200);
  });

  test('validates correct pathway', () => {
    const equations = [
      { equation: 'A → B', deltaH: -50 },
      { equation: 'B → C', deltaH: -30 }
    ];
    const target = { equation: 'A → C', deltaH: -80 };
    const isValid = validateHessPathway(equations, target);
    expect(isValid).toBe(true);
  });
});

describe('Calorimetry Calculations', () => {
  test('calculates heat for water', () => {
    const mass = 100; // g
    const specificHeat = 4.18; // J/g°C
    const tempChange = 10; // °C
    const heat = calculateHeat(mass, specificHeat, tempChange);
    expect(heat).toBe(4180); // J
  });

  test('calculates ΔH per mole', () => {
    const heat = 4180; // J
    const moles = 0.1;
    const deltaH = calculateDeltaHPerMole(heat, moles);
    expect(deltaH).toBeCloseTo(41.8, 1); // kJ/mol
  });

  test('includes calorimeter heat capacity', () => {
    const mass = 100;
    const specificHeat = 4.18;
    const tempChange = 10;
    const calorimeterCapacity = 50; // J/°C
    const totalHeat = calculateTotalHeat(mass, specificHeat, tempChange, calorimeterCapacity);
    expect(totalHeat).toBe(4680); // 4180 + 500
  });
});
```

### Integration Testing

**Framework**: Jest with React Testing Library

**Test Complete User Flows**:
1. Load module → Select difficulty → Solve quest → Verify → Next quest
2. Change stage → Load new quest pool → Solve quest
3. Change language → Verify translations → Solve quest
4. Complete all quests in stage → Mark stage complete
5. Use reference tables → Look up values → Solve quest

**Integration Test Example**:

```typescript
describe('Complete Quest Flow', () => {
  test('user can solve energy changes quest', async () => {
    render(<SC207EnthalpyEnergetics />);
    
    // Select BASIC difficulty
    const basicButton = screen.getByText(/BASIC/i);
    fireEvent.click(basicButton);
    
    // Quest should load
    expect(screen.getByText(/Calculate ΔH/i)).toBeInTheDocument();
    
    // Enter answer
    const input = screen.getByPlaceholderText(/Enter ΔH/i);
    fireEvent.change(input, { target: { value: '-286' } });
    
    // Verify answer
    const verifyButton = screen.getByText(/Verify/i);
    fireEvent.click(verifyButton);
    
    // Should show success
    await waitFor(() => {
      expect(screen.getByText(/Correct/i)).toBeInTheDocument();
    });
    
    // Next button should be enabled
    const nextButton = screen.getByText(/Next/i);
    expect(nextButton).not.toBeDisabled();
    
    // Click next
    fireEvent.click(nextButton);
    
    // Should load next quest
    expect(screen.getByText(/Quest 2/i)).toBeInTheDocument();
  });
});
```

### Browser Testing

**Manual Testing Required**:
- Chrome/Edge: Verify all features work
- Firefox: Verify LaTeX rendering and animations
- Safari: Verify iOS compatibility
- Mobile devices: Verify touch interactions and responsive layout

**Testing Checklist**:
- [ ] All quests display correctly
- [ ] Input fields accept numerical values
- [ ] Verification works with ±1 kJ tolerance
- [ ] Visualizations render and animate
- [ ] Energy diagrams show correct levels
- [ ] Hess cycle builder works
- [ ] Calorimeter simulator displays correctly
- [ ] Reference tables are accessible
- [ ] Language switching works
- [ ] Responsive layout adapts to screen size
- [ ] No console errors or warnings
- [ ] Stage navigation works
- [ ] Progress persists across sessions

### Test Coverage Goals

**Calculation Functions**: 95% coverage
- All enthalpy calculation formulas
- All bond energy calculations
- All calorimetry calculations
- All Hess's Law operations

**Quest Generation**: 90% coverage
- Quest pool building for all stages/difficulties
- LaTeX formula generation
- Basel context inclusion
- Data validation

**UI Components**: 75% coverage
- Quest display and input handling
- Verification and feedback
- Navigation and state management
- Visualization rendering (where testable)

**Error Handling**: 85% coverage
- Invalid input handling
- Missing data handling
- Calculation errors
- Rendering fallbacks

### Continuous Testing

**Pre-commit Hooks**:
- Run unit tests
- Run property tests (100 iterations each)
- Check test coverage meets targets
- Lint code for errors

**CI/CD Pipeline**:
- Run full test suite on every commit
- Run extended property tests (1000 iterations) nightly
- Generate coverage reports
- Flag failing tests immediately

**Performance Testing**:
- Quest loading time < 100ms
- Verification response time < 50ms
- Visualization rendering time < 200ms
- Language switching time < 100ms
