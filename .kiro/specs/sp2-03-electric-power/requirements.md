# Requirements Document: SP2.03 - Electric Power & Energy

## Introduction

This module teaches students about electric power (P=UI), energy consumption (W=Pt), and efficiency in the context of real-world applications in Basel, Switzerland. Students will learn to calculate power, energy costs, and analyze energy efficiency through interactive exercises and visualizations. The module aligns with Lehrplan 21 NT.6.3 (Elektrische Energie) and targets Sekundarschule students (13-15 years old).

## Glossary

- **System**: The SP2.03 Electric Power & Energy module web application
- **User**: A student (13-15 years old) using the module to learn about electric power and energy
- **Quest**: An individual practice problem with specific parameters and expected answers
- **Stage**: A thematic section of the module (Power Basics, Energy Consumption, or Efficiency)
- **Difficulty**: One of four levels (BASIC, CORE, ADVANCED, ELITE) that determines problem complexity
- **Visualization**: The interactive graphical display showing power, energy, or efficiency concepts
- **Input_Field**: A text field where users enter numerical answers
- **Verification**: The process of checking if a user's answer matches the expected value
- **Translation**: Text content in one of three supported languages (EN/CN/DE)

## Requirements

### Requirement 1: Power Calculation (P=UI)

**User Story:** As a student, I want to calculate electric power using voltage and current, so that I can understand the relationship P=UI and apply it to real-world electrical devices.

#### Acceptance Criteria

1. WHEN a user is presented with a power calculation quest, THE System SHALL display voltage (U) and current (I) values
2. WHEN a user calculates power using P=UI, THE System SHALL accept the answer in Watts (W)
3. WHEN a user is given power and voltage, THE System SHALL allow calculation of current using I=P/U
4. WHEN a user is given power and current, THE System SHALL allow calculation of voltage using U=P/I
5. THE System SHALL provide 5 quests for each difficulty level (BASIC, CORE, ADVANCED, ELITE) in the Power Basics stage
6. WHEN displaying power values, THE Visualization SHALL show voltage, current, and resulting power with appropriate units
7. WHEN a user enters an answer, THE System SHALL verify it against the expected value with a tolerance of ±0.01

### Requirement 2: Energy Consumption Calculation (W=Pt)

**User Story:** As a student, I want to calculate energy consumption and costs, so that I can understand how electricity usage translates to energy bills in Swiss households.

#### Acceptance Criteria

1. WHEN a user is presented with an energy quest, THE System SHALL display power (P) and time (t) values
2. WHEN a user calculates energy using W=Pt, THE System SHALL accept answers in Watt-hours (Wh) for BASIC difficulty
3. WHEN a user calculates energy for CORE difficulty, THE System SHALL accept answers in kilowatt-hours (kWh)
4. WHEN a user calculates costs for ADVANCED and ELITE difficulties, THE System SHALL use Swiss Franc (CHF) as currency
5. THE System SHALL provide 5 quests for each difficulty level in the Energy Consumption stage
6. WHEN displaying energy consumption, THE Visualization SHALL show power, time, energy, and cost (if applicable)
7. WHEN calculating costs, THE System SHALL use realistic Swiss electricity rates (0.20-0.30 CHF/kWh)

### Requirement 3: Efficiency Analysis

**User Story:** As a student, I want to analyze energy efficiency of electrical devices, so that I can understand energy conservation and make informed decisions about appliance usage.

#### Acceptance Criteria

1. WHEN a user is presented with an efficiency quest, THE System SHALL display input power and output power values
2. WHEN a user calculates efficiency, THE System SHALL accept answers as percentages using η = (P_out / P_in) × 100%
3. WHEN a user is given efficiency and input power, THE System SHALL allow calculation of output power
4. WHEN a user is given efficiency and output power, THE System SHALL allow calculation of input power
5. WHEN a user calculates power loss, THE System SHALL accept answers using Loss = P_in - P_out
6. THE System SHALL provide 5 quests for each difficulty level in the Efficiency stage
7. WHEN displaying efficiency, THE Visualization SHALL show input power, output power, efficiency percentage, and power loss
8. FOR ELITE difficulty, THE System SHALL include real-world devices (LED, incandescent bulb, motor, transformer, solar panel)

### Requirement 4: Difficulty Progression

**User Story:** As a student, I want problems that increase in complexity, so that I can build my understanding progressively from simple to advanced concepts.

#### Acceptance Criteria

1. WHEN a user selects BASIC difficulty, THE System SHALL present problems with simple integer values and single-step calculations
2. WHEN a user selects CORE difficulty, THE System SHALL present problems with realistic household values requiring multi-step calculations
3. WHEN a user selects ADVANCED difficulty, THE System SHALL present problems involving decimal values and cost calculations
4. WHEN a user selects ELITE difficulty, THE System SHALL present problems with industrial/commercial scale values and complex scenarios
5. WHEN a user changes difficulty, THE System SHALL load an independent set of 5 quests (not cumulative)
6. THE System SHALL ensure each difficulty level teaches progressively deeper concepts, not just larger numbers

### Requirement 5: Interactive Visualization

**User Story:** As a student, I want to see visual representations of power, energy, and efficiency, so that I can better understand abstract electrical concepts.

#### Acceptance Criteria

1. WHEN a user views a Power Basics quest, THE Visualization SHALL display voltage, current, and power with animated elements
2. WHEN a user views an Energy Consumption quest, THE Visualization SHALL display power, time, energy (kWh), and cost (CHF)
3. WHEN a user views an Efficiency quest, THE Visualization SHALL display input power, output power, efficiency bar, and power loss
4. WHEN quest data changes, THE Visualization SHALL update in real-time to reflect new values
5. THE Visualization SHALL use color coding (blue for input, green for output, yellow for efficiency, red for loss)
6. THE Visualization SHALL display all numerical values with appropriate units (W, V, A, kWh, CHF, %)
7. THE Visualization SHALL use animations to help students understand energy flow and transformations

### Requirement 6: Basel-Specific Scenarios

**User Story:** As a Basel student, I want problems set in familiar local contexts, so that I can connect abstract concepts to my daily life.

#### Acceptance Criteria

1. WHEN a user reads scenario descriptions, THE System SHALL reference Basel locations (Roche Tower, Basel University Hospital, Rhine River)
2. WHEN a user calculates costs, THE System SHALL use Swiss electricity rates and Swiss Franc currency
3. WHEN a user sees device examples, THE System SHALL include devices common in Swiss households
4. THE System SHALL provide scenario descriptions of 150-250 words for each stage
5. WHEN displaying scenarios, THE System SHALL include specific people, places, situations, numerical values, and real-world significance
6. THE System SHALL connect scenarios to students' daily experiences (home appliances, school equipment, local infrastructure)

### Requirement 7: Three-Language Support

**User Story:** As a multilingual student in Basel, I want to use the module in my preferred language, so that I can learn effectively in English, Chinese, or German.

#### Acceptance Criteria

1. THE System SHALL support three languages: English (EN), Chinese (CN), and German (DE)
2. WHEN a user switches languages, THE System SHALL translate all UI text including titles, buttons, and instructions
3. WHEN a user switches languages, THE System SHALL translate difficulty levels (BASIC/基础/BASIS, CORE/核心/KERN, ADVANCED/进阶/ERWEITERT, ELITE/精英/ELITE)
4. WHEN a user switches languages, THE System SHALL translate stage names and scenario descriptions
5. THE System SHALL render all mathematical formulas using LaTeX notation (P=UI, W=Pt, η=(P_out/P_in)×100%)
6. WHEN displaying units, THE System SHALL use international symbols (W, V, A, kWh) that don't require translation
7. THE System SHALL ensure all translations are complete and accurate for each language

### Requirement 8: Answer Verification and Feedback

**User Story:** As a student, I want immediate feedback on my answers, so that I can learn from mistakes and reinforce correct understanding.

#### Acceptance Criteria

1. WHEN a user clicks "Verify", THE System SHALL compare the user's answer to the expected value
2. WHEN answers match within ±0.01 tolerance, THE System SHALL display a success message in green
3. WHEN answers don't match, THE System SHALL display an error message in red
4. WHEN verification succeeds, THE System SHALL enable the "Next" button to proceed to the next quest
5. WHEN a user clicks "Next", THE System SHALL load the next quest in the current difficulty and stage
6. THE System SHALL maintain quest state so users can't skip ahead without solving problems
7. WHEN all 5 quests in a stage are completed, THE System SHALL allow users to change stages or difficulty

### Requirement 9: Quest Data Structure

**User Story:** As a developer, I want well-structured quest data, so that the system can generate diverse problems and verify answers correctly.

#### Acceptance Criteria

1. THE System SHALL store quest data with fields: id, difficulty, stage, voltage, current, power, time, energy, cost, efficiency
2. WHEN building a quest pool, THE System SHALL generate 5 quests per difficulty per stage (60 total quests)
3. WHEN a quest requires calculation, THE System SHALL store the expected answer with appropriate precision
4. THE System SHALL use consistent units: Watts (W) for power, Volts (V) for voltage, Amperes (A) for current, hours (h) for time
5. WHEN displaying formulas, THE System SHALL use LaTeX format (e.g., "P = U \\times I")
6. THE System SHALL validate that all quest data is complete before rendering
7. WHEN quest data is missing, THE System SHALL display a loading state or error message

### Requirement 10: Responsive Layout

**User Story:** As a student using different devices, I want the module to work well on various screen sizes, so that I can learn on desktop, tablet, or mobile.

#### Acceptance Criteria

1. THE System SHALL use a two-column layout with quests on the left and visualization on the right
2. WHEN screen width is below 768px, THE System SHALL stack the layout vertically
3. THE System SHALL ensure all text is readable at minimum font size of 14px
4. THE System SHALL ensure all interactive elements (buttons, input fields) are at least 44px tall for touch targets
5. THE Visualization SHALL scale proportionally to maintain aspect ratio
6. THE System SHALL use the ChamberLayout component for consistent structure
7. THE System SHALL ensure all content is accessible without horizontal scrolling

### Requirement 11: Formula Rendering

**User Story:** As a student, I want to see properly formatted mathematical formulas, so that I can understand the equations I'm working with.

#### Acceptance Criteria

1. THE System SHALL render all formulas using react-katex library
2. WHEN displaying inline formulas, THE System SHALL use InlineMath component
3. WHEN displaying block formulas, THE System SHALL use BlockMath component
4. THE System SHALL use double backslashes for LaTeX commands (e.g., "\\text{}", "\\times")
5. THE System SHALL render units in roman font using \\text{} (e.g., "\\text{W}", "\\text{kWh}")
6. THE System SHALL never use Unicode superscripts (², ³) in LaTeX strings
7. WHEN formulas fail to render, THE System SHALL display an error message

### Requirement 12: Stage Navigation

**User Story:** As a student, I want to navigate between different stages, so that I can focus on specific topics (power, energy, or efficiency).

#### Acceptance Criteria

1. THE System SHALL provide three stages: Power Basics, Energy Consumption, and Efficiency
2. WHEN a user selects a stage, THE System SHALL load the appropriate quest pool for that stage
3. WHEN a user changes stages, THE System SHALL reset to the first quest of the selected stage
4. THE System SHALL visually indicate the current stage in the navigation
5. THE System SHALL allow stage changes at any time without losing progress in other stages
6. WHEN a user completes all quests in a stage, THE System SHALL mark that stage as complete
7. THE System SHALL persist stage completion status across sessions

