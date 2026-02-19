# Requirements Document: SC2.07 - Enthalpy & Energetics

## Introduction

This module teaches Sekundarstufe II chemistry students about enthalpy, energy changes in chemical reactions, Hess's Law, bond energy calculations, standard enthalpy of formation, and calorimetry. Students will learn through interactive exercises set in Basel-specific contexts, including pharmaceutical synthesis at Novartis/Roche and thermal energy studies. The module aligns with Lehrplan 21 NT.2.6.b and targets advanced secondary students (16-19 years old).

## Glossary

- **System**: The SC2.07 Enthalpy & Energetics module web application
- **User**: A Sekundarstufe II student (16-19 years old) using the module to learn about thermochemistry
- **Quest**: An individual practice problem with specific parameters and expected answers
- **Stage**: A thematic section of the module (Energy Changes, Hess's Law, or Calorimetry)
- **Difficulty**: One of four levels (BASIC, CORE, ADVANCED, ELITE) that determines problem complexity
- **Visualization**: The interactive graphical display showing energy diagrams, enthalpy cycles, or calorimetry simulations
- **Enthalpy**: The heat content of a system at constant pressure, symbol H
- **Enthalpy_Change**: The difference in enthalpy between products and reactants, symbol ΔH
- **Exothermic_Reaction**: A reaction that releases heat to surroundings (ΔH < 0)
- **Endothermic_Reaction**: A reaction that absorbs heat from surroundings (ΔH > 0)
- **Hess_Law**: The principle that total enthalpy change is independent of the reaction pathway
- **Bond_Energy**: The energy required to break one mole of a specific bond in gaseous molecules
- **Standard_Enthalpy_Formation**: The enthalpy change when one mole of a compound forms from elements in standard states, symbol ΔH°f
- **Calorimeter**: A device for measuring heat changes in chemical reactions
- **Translation**: Text content in one of three supported languages (EN/CN/DE)

## Requirements

### Requirement 1: Enthalpy Change Calculation

**User Story:** As a student, I want to calculate enthalpy changes for chemical reactions, so that I can understand energy transformations in chemical processes.

#### Acceptance Criteria

1. WHEN a user is presented with an enthalpy calculation quest, THE System SHALL display reactant and product enthalpies or bond energies
2. WHEN a user calculates ΔH using ΔH = H(products) - H(reactants), THE System SHALL accept the answer in kilojoules (kJ)
3. WHEN ΔH is negative, THE System SHALL identify the reaction as exothermic
4. WHEN ΔH is positive, THE System SHALL identify the reaction as endothermic
5. THE System SHALL provide 5 quests for BASIC difficulty focusing on simple enthalpy calculations
6. WHEN displaying enthalpy values, THE Visualization SHALL show energy levels for reactants and products
7. THE System SHALL render all thermochemical equations using react-katex with proper notation

### Requirement 2: Exothermic and Endothermic Reaction Identification

**User Story:** As a student, I want to identify whether reactions are exothermic or endothermic, so that I can predict energy flow in chemical processes.

#### Acceptance Criteria

1. WHEN a user views a reaction with ΔH value, THE System SHALL ask whether it is exothermic or endothermic
2. WHEN ΔH < 0, THE System SHALL verify the answer as exothermic
3. WHEN ΔH > 0, THE System SHALL verify the answer as endothermic
4. THE System SHALL provide 5 quests for BASIC difficulty in the Energy Changes stage
5. WHEN displaying energy diagrams, THE Visualization SHALL show reactants higher than products for exothermic reactions
6. WHEN displaying energy diagrams, THE Visualization SHALL show products higher than reactants for endothermic reactions
7. THE Visualization SHALL use color coding: red for exothermic (heat released), blue for endothermic (heat absorbed)

### Requirement 3: Hess's Law Application

**User Story:** As a student, I want to apply Hess's Law to calculate enthalpy changes, so that I can determine ΔH for reactions that cannot be measured directly.

#### Acceptance Criteria

1. WHEN a user is presented with a Hess's Law quest, THE System SHALL display multiple reaction equations with known ΔH values
2. WHEN a user combines equations to reach a target equation, THE System SHALL verify the pathway is valid
3. WHEN equations are reversed, THE System SHALL verify that ΔH sign is reversed
4. WHEN equations are multiplied by a coefficient, THE System SHALL verify that ΔH is multiplied by the same coefficient
5. THE System SHALL provide 5 quests for each difficulty level (BASIC, CORE, ADVANCED, ELITE) in the Hess's Law stage
6. WHEN displaying Hess cycles, THE Visualization SHALL show all reaction pathways and their ΔH values
7. THE System SHALL accept answers within ±1 kJ tolerance for calculated ΔH values

### Requirement 4: Bond Energy Calculations

**User Story:** As a student, I want to calculate enthalpy changes using bond energies, so that I can understand the relationship between bond breaking/forming and energy changes.

#### Acceptance Criteria

1. WHEN a user is presented with a bond energy quest, THE System SHALL display bond energies for all bonds in reactants and products
2. WHEN a user calculates ΔH using ΔH = Σ(bonds broken) - Σ(bonds formed), THE System SHALL accept the answer in kJ/mol
3. WHEN calculating bonds broken, THE System SHALL verify the user counts all bonds in reactants correctly
4. WHEN calculating bonds formed, THE System SHALL verify the user counts all bonds in products correctly
5. THE System SHALL provide 5 quests for CORE difficulty focusing on bond energy calculations
6. WHEN displaying molecules, THE Visualization SHALL highlight bonds being broken (red) and formed (green)
7. THE System SHALL provide a bond energy table for reference with common bonds (C-H, C-C, C=C, C≡C, O-H, C-O, C=O, N-H, etc.)

### Requirement 5: Standard Enthalpy of Formation

**User Story:** As a student, I want to calculate enthalpy changes using standard enthalpies of formation, so that I can determine ΔH for reactions using tabulated data.

#### Acceptance Criteria

1. WHEN a user is presented with a formation enthalpy quest, THE System SHALL display ΔH°f values for all reactants and products
2. WHEN a user calculates ΔH° using ΔH° = Σ(ΔH°f products) - Σ(ΔH°f reactants), THE System SHALL accept the answer in kJ/mol
3. WHEN calculating with stoichiometric coefficients, THE System SHALL verify the user multiplies ΔH°f by the coefficient
4. THE System SHALL provide 5 quests for ADVANCED difficulty focusing on standard enthalpy calculations
5. WHEN displaying formation data, THE Visualization SHALL show the formation pathway from elements to compound
6. THE System SHALL provide a table of standard enthalpies of formation for common compounds
7. THE System SHALL use standard state notation (25°C, 1 atm) for all ΔH°f values

### Requirement 6: Calorimetry and Heat Measurement

**User Story:** As a student, I want to calculate heat changes using calorimetry data, so that I can determine enthalpy changes from experimental measurements.

#### Acceptance Criteria

1. WHEN a user is presented with a calorimetry quest, THE System SHALL display mass, specific heat capacity, and temperature change
2. WHEN a user calculates heat using q = mcΔT, THE System SHALL accept the answer in joules (J) or kilojoules (kJ)
3. WHEN calculating enthalpy per mole, THE System SHALL verify the user divides q by the number of moles
4. WHEN a reaction occurs in a calorimeter, THE System SHALL verify the user accounts for heat absorbed by the calorimeter
5. THE System SHALL provide 5 quests for each difficulty level in the Calorimetry stage
6. WHEN displaying calorimetry, THE Visualization SHALL show the calorimeter with temperature readings and heat flow
7. THE System SHALL use realistic values for specific heat capacity (water = 4.18 J/g°C, metals vary)

### Requirement 7: Enthalpy Cycle Visualization

**User Story:** As a student, I want to see visual representations of enthalpy cycles, so that I can understand Hess's Law and alternative reaction pathways.

#### Acceptance Criteria

1. WHEN a user views a Hess's Law quest, THE Visualization SHALL display an enthalpy cycle diagram
2. WHEN multiple pathways exist, THE Visualization SHALL show all pathways with arrows and ΔH labels
3. WHEN a direct pathway exists, THE Visualization SHALL show it alongside the indirect pathway
4. THE Visualization SHALL use consistent arrow notation: downward for exothermic, upward for endothermic
5. THE Visualization SHALL allow users to trace pathways by clicking on arrows
6. WHEN a pathway is selected, THE Visualization SHALL highlight it and show the calculation
7. THE System SHALL display the cycle using proper thermochemical notation with state symbols (s, l, g, aq)

### Requirement 8: Bond Breaking and Forming Animation

**User Story:** As a student, I want to see animations of bonds breaking and forming, so that I can visualize the energy changes during chemical reactions.

#### Acceptance Criteria

1. WHEN a user views a bond energy quest, THE Visualization SHALL display molecular structures with visible bonds
2. WHEN bonds break, THE Visualization SHALL animate them breaking with energy absorption (blue glow)
3. WHEN bonds form, THE Visualization SHALL animate them forming with energy release (red glow)
4. THE Visualization SHALL display the net energy change as the difference between breaking and forming
5. THE Visualization SHALL use standard bond representations: single (—), double (=), triple (≡)
6. THE Visualization SHALL allow users to pause, play, and restart the animation
7. THE Visualization SHALL show bond energy values next to each bond during animation

### Requirement 9: Calorimeter Simulator

**User Story:** As a student, I want to interact with a virtual calorimeter, so that I can understand how heat measurements are performed experimentally.

#### Acceptance Criteria

1. WHEN a user views a calorimetry quest, THE Visualization SHALL display an interactive calorimeter
2. WHEN a reaction occurs, THE Simulator SHALL show temperature change on a thermometer
3. WHEN heat is released, THE Simulator SHALL show temperature increasing (exothermic)
4. WHEN heat is absorbed, THE Simulator SHALL show temperature decreasing (endothermic)
5. THE Simulator SHALL display mass of solution, initial temperature, and final temperature
6. THE Simulator SHALL show heat flow with animated arrows (red for heat out, blue for heat in)
7. THE Simulator SHALL allow users to input different masses and observe temperature changes

### Requirement 10: Difficulty Progression

**User Story:** As a student, I want problems that increase in complexity, so that I can build my understanding progressively from simple to advanced concepts.

#### Acceptance Criteria

1. WHEN a user selects BASIC difficulty, THE System SHALL present simple enthalpy calculations with given values
2. WHEN a user selects CORE difficulty, THE System SHALL present bond energy calculations and simple Hess's Law problems
3. WHEN a user selects ADVANCED difficulty, THE System SHALL present standard enthalpy of formation calculations and complex Hess cycles
4. WHEN a user selects ELITE difficulty, THE System SHALL present pharmaceutical synthesis energetics and industrial calorimetry
5. WHEN a user changes difficulty, THE System SHALL load an independent set of 5 quests per stage
6. THE System SHALL ensure each difficulty level teaches progressively deeper concepts
7. THE System SHALL provide 60 total quests across all difficulties and stages

### Requirement 11: Basel-Specific Scenarios

**User Story:** As a Basel student, I want problems set in familiar local contexts, so that I can connect abstract thermochemistry concepts to real-world applications.

#### Acceptance Criteria

1. WHEN a user reads scenario descriptions, THE System SHALL reference Basel locations (Novartis, Roche, Basel Chemistry Institute, Rhine River)
2. WHEN a user sees pharmaceutical reactions, THE System SHALL reference drug synthesis energetics at Basel pharmaceutical companies
3. WHEN a user sees calorimetry examples, THE System SHALL include Basel University experiments and industrial applications
4. THE System SHALL provide scenario descriptions of 150-250 words for each stage
5. WHEN displaying scenarios, THE System SHALL include specific people, places, situations, numerical values, and real-world significance
6. THE System SHALL connect scenarios to pharmaceutical industry energy management and process optimization
7. FOR ELITE difficulty, THE System SHALL include actual pharmaceutical synthesis reactions with real enthalpy data

### Requirement 12: Three-Language Support

**User Story:** As a multilingual student in Basel, I want to use the module in my preferred language, so that I can learn effectively in English, Chinese, or German.

#### Acceptance Criteria

1. THE System SHALL support three languages: English (EN), Chinese (CN), and German (DE)
2. WHEN a user switches languages, THE System SHALL translate all UI text including titles, buttons, and instructions
3. WHEN a user switches languages, THE System SHALL translate difficulty levels (BASIC/基础/BASIS, CORE/核心/KERN, ADVANCED/进阶/ERWEITERT, ELITE/精英/ELITE)
4. WHEN a user switches languages, THE System SHALL translate stage names and scenario descriptions
5. WHEN a user switches languages, THE System SHALL translate thermochemistry terms (enthalpy/焓/Enthalpie, exothermic/放热/exotherm, endothermic/吸热/endotherm)
6. THE System SHALL keep chemical formulas and numerical values in international notation (not translated)
7. THE System SHALL ensure all translations are complete and accurate for each language

### Requirement 13: Answer Verification and Feedback

**User Story:** As a student, I want immediate feedback on my answers, so that I can learn from mistakes and reinforce correct understanding.

#### Acceptance Criteria

1. WHEN a user submits an answer, THE System SHALL compare it to the expected value
2. WHEN numerical answers match within ±1 kJ tolerance, THE System SHALL display a success message in green
3. WHEN answers don't match, THE System SHALL display an error message in red with hints
4. WHEN verification succeeds, THE System SHALL enable the "Next" button to proceed to the next quest
5. WHEN a user clicks "Next", THE System SHALL load the next quest in the current difficulty and stage
6. THE System SHALL maintain quest state so users can't skip ahead without solving problems
7. WHEN all 5 quests in a stage are completed, THE System SHALL allow users to change stages or difficulty

### Requirement 14: Quest Data Structure

**User Story:** As a developer, I want well-structured quest data, so that the system can generate diverse problems and verify answers correctly.

#### Acceptance Criteria

1. THE System SHALL store quest data with fields: id, difficulty, stage, reaction, deltaH, bondEnergies, formationEnthalpies, calorimetryData
2. WHEN building a quest pool, THE System SHALL generate 60 total quests (3 stages × 4 difficulties × 5 quests)
3. WHEN a quest requires calculation, THE System SHALL store the expected answer with appropriate precision
4. THE System SHALL use consistent units: kJ for enthalpy changes, kJ/mol for molar quantities, J for heat
5. WHEN displaying thermochemical equations, THE System SHALL use LaTeX format with state symbols
6. THE System SHALL validate that all quest data is complete before rendering
7. WHEN quest data is missing, THE System SHALL display a loading state or error message

### Requirement 15: Formula Rendering

**User Story:** As a student, I want to see properly formatted thermochemical equations and formulas, so that I can understand the reactions and calculations I'm working with.

#### Acceptance Criteria

1. THE System SHALL render all thermochemical equations using react-katex library
2. WHEN displaying inline formulas, THE System SHALL use InlineMath component
3. WHEN displaying block equations, THE System SHALL use BlockMath component
4. THE System SHALL use double backslashes for LaTeX commands (e.g., "\\text{}", "\\Delta")
5. THE System SHALL render state symbols in parentheses: (s), (l), (g), (aq)
6. THE System SHALL render ΔH with proper notation: ΔH, ΔH°, ΔH°f
7. THE System SHALL use \\rightarrow for reaction arrows in thermochemical equations
8. WHEN formulas fail to render, THE System SHALL display an error message

### Requirement 16: Responsive Layout

**User Story:** As a student using different devices, I want the module to work well on various screen sizes, so that I can learn on desktop, tablet, or mobile.

#### Acceptance Criteria

1. THE System SHALL use a two-column layout with quests on the left and visualization on the right
2. WHEN screen width is below 768px, THE System SHALL stack the layout vertically
3. THE System SHALL ensure all text is readable at minimum font size of 14px
4. THE System SHALL ensure all interactive elements (buttons, input fields) are at least 44px tall for touch targets
5. THE Visualization SHALL scale proportionally to maintain aspect ratio
6. THE System SHALL use the ChamberLayout component for consistent structure
7. THE System SHALL ensure all content is accessible without horizontal scrolling

### Requirement 17: Stage Navigation

**User Story:** As a student, I want to navigate between different stages, so that I can focus on specific topics (energy changes, Hess's Law, or calorimetry).

#### Acceptance Criteria

1. THE System SHALL provide three stages: Energy Changes, Hess's Law, and Calorimetry
2. WHEN a user selects a stage, THE System SHALL load the appropriate quest pool for that stage
3. WHEN a user changes stages, THE System SHALL reset to the first quest of the selected stage
4. THE System SHALL visually indicate the current stage in the navigation
5. THE System SHALL allow stage changes at any time without losing progress in other stages
6. WHEN a user completes all quests in a stage, THE System SHALL mark that stage as complete
7. THE System SHALL persist stage completion status across sessions

### Requirement 18: Energy Diagram Interactivity

**User Story:** As a student, I want to interact with energy diagrams, so that I can explore different reaction pathways and understand energy relationships.

#### Acceptance Criteria

1. WHEN a user views an energy diagram, THE Visualization SHALL display reactants, products, and activation energy
2. WHEN a user hovers over energy levels, THE Visualization SHALL display numerical enthalpy values
3. WHEN a user clicks on a reaction pathway, THE Visualization SHALL highlight it and show the calculation
4. THE Visualization SHALL display activation energy (Ea) for both forward and reverse reactions
5. THE Visualization SHALL show the relationship: ΔH = Ea(forward) - Ea(reverse)
6. THE Visualization SHALL allow users to compare multiple reactions side by side
7. THE Visualization SHALL use consistent color coding: reactants (blue), products (green), transition state (orange)

### Requirement 19: Hess's Law Cycle Builder

**User Story:** As a student, I want to build enthalpy cycles interactively, so that I can practice applying Hess's Law to complex problems.

#### Acceptance Criteria

1. WHEN a user views a Hess's Law quest, THE System SHALL provide an interactive cycle builder
2. WHEN a user selects equations to combine, THE Cycle_Builder SHALL display them in the cycle
3. WHEN a user reverses an equation, THE Cycle_Builder SHALL reverse the ΔH sign
4. WHEN a user multiplies an equation, THE Cycle_Builder SHALL multiply the ΔH value
5. THE Cycle_Builder SHALL verify that the final equation matches the target equation
6. THE Cycle_Builder SHALL calculate the total ΔH by summing all pathway ΔH values
7. THE Cycle_Builder SHALL provide hints when users select incorrect equations

### Requirement 20: Bond Energy Table Reference

**User Story:** As a student, I want access to a bond energy table, so that I can look up values needed for calculations.

#### Acceptance Criteria

1. THE System SHALL provide a bond energy reference table accessible from all bond energy quests
2. WHEN a user opens the table, THE System SHALL display common bond types and their energies
3. THE Table SHALL include single bonds: C-H (413), C-C (347), C-O (358), O-H (464), N-H (391), H-H (436), O=O (498), N≡N (945)
4. THE Table SHALL include multiple bonds: C=C (614), C≡C (839), C=O (799), C≡N (891)
5. THE Table SHALL display all values in kJ/mol
6. THE Table SHALL be searchable by bond type
7. THE Table SHALL remain visible while solving quests (sidebar or overlay)

### Requirement 21: Standard Enthalpy Formation Table

**User Story:** As a student, I want access to a standard enthalpy of formation table, so that I can look up ΔH°f values for calculations.

#### Acceptance Criteria

1. THE System SHALL provide a ΔH°f reference table accessible from all formation enthalpy quests
2. WHEN a user opens the table, THE System SHALL display common compounds and their ΔH°f values
3. THE Table SHALL include compounds: H2O(l) (-286), CO2(g) (-394), CH4(g) (-75), C2H5OH(l) (-278), NH3(g) (-46), HCl(g) (-92)
4. THE Table SHALL display all values in kJ/mol at standard conditions (25°C, 1 atm)
5. THE Table SHALL note that ΔH°f for elements in standard states is zero
6. THE Table SHALL be searchable by compound name or formula
7. THE Table SHALL remain visible while solving quests (sidebar or overlay)

### Requirement 22: Pharmaceutical Synthesis Energetics (ELITE)

**User Story:** As an advanced student, I want to analyze energetics of pharmaceutical synthesis, so that I can understand real-world applications in Basel's pharmaceutical industry.

#### Acceptance Criteria

1. FOR ELITE difficulty quests, THE System SHALL provide pharmaceutical synthesis reactions with real enthalpy data
2. WHEN a user views pharmaceutical reactions, THE System SHALL display multi-step synthesis pathways
3. WHEN calculating overall ΔH, THE System SHALL verify the user sums all step enthalpies correctly
4. THE System SHALL reference actual drugs synthesized at Novartis or Roche Basel
5. THE System SHALL explain why certain synthesis routes are preferred based on energy efficiency
6. THE System SHALL display industrial calorimetry data from pharmaceutical manufacturing
7. THE System SHALL connect energy calculations to process optimization and cost reduction
