# Requirements Document: GP3.02 - Electromagnetism Basics

## Introduction

This module teaches Gymnasium students (16-18 years old) about fundamental electromagnetic concepts including electric fields, magnetic fields, forces on charged particles, and particle motion in electromagnetic fields. The module aligns with Maturität Elektromagnetismus I curriculum and provides 60 interactive quests across three stages with four difficulty levels. All content is available in three languages (EN/CN/DE) with Basel-specific scenarios connecting abstract physics concepts to real-world applications.

## Glossary

- **System**: The GP3.02 Electromagnetism Basics module web application
- **User**: A Gymnasium student (16-18 years old) learning electromagnetic concepts
- **Quest**: An individual practice problem with specific electromagnetic parameters and expected calculations
- **Stage**: A thematic section of the module (Electric Fields, Magnetic Fields, or Particle Motion)
- **Difficulty**: One of four levels (BASIC, CORE, ADVANCED, ELITE) determining problem complexity
- **Visualization**: Interactive graphical display showing electric field lines, magnetic field lines, or particle trajectories
- **Electric_Field**: A region of space where electric forces act on charged particles, measured in N/C or V/m
- **Magnetic_Field**: A region of space where magnetic forces act on moving charged particles, measured in Tesla (T)
- **Electric_Field_Strength**: The magnitude of electric force per unit charge, symbol E, unit N/C
- **Magnetic_Flux_Density**: The magnitude of magnetic field, symbol B, unit Tesla (T)
- **Lorentz_Force**: The combined electric and magnetic force on a charged particle
- **Input_Field**: A text field where users enter numerical answers with units
- **Verification**: The process of checking if a user's answer matches the expected value within tolerance
- **Translation**: Text content in one of three supported languages (EN/CN/DE)

## Requirements

### Requirement 1: Electric Field Concepts and Calculations

**User Story:** As a student, I want to understand electric fields and calculate electric field strength, so that I can analyze how charged particles interact through electric forces.

#### Acceptance Criteria

1. WHEN a user is presented with an electric field quest, THE System SHALL display charge values (Q) and distances (r)
2. WHEN a user calculates electric field strength using E = kQ/r², THE System SHALL accept answers in N/C (Newtons per Coulomb)
3. WHEN a user is given electric field strength and charge, THE System SHALL allow calculation of force using F = qE
4. WHEN a user is given two point charges, THE System SHALL allow calculation of the electric field at a specific point
5. THE System SHALL provide 5 quests for each difficulty level (BASIC, CORE, ADVANCED, ELITE) in the Electric Fields stage
6. WHEN displaying electric field values, THE Visualization SHALL show field lines radiating from charges with direction and magnitude
7. WHEN a user enters an answer, THE System SHALL verify it against the expected value with a tolerance of ±0.01

### Requirement 2: Magnetic Field Concepts and Calculations

**User Story:** As a student, I want to understand magnetic fields and calculate magnetic flux density, so that I can analyze how moving charged particles interact with magnetic fields.

#### Acceptance Criteria

1. WHEN a user is presented with a magnetic field quest, THE System SHALL display current (I), distance (r), and wire configuration
2. WHEN a user calculates magnetic field from a straight wire using B = μ₀I/(2πr), THE System SHALL accept answers in Tesla (T)
3. WHEN a user calculates magnetic field at the center of a circular loop using B = μ₀I/(2R), THE System SHALL accept answers in Tesla (T)
4. WHEN a user is given magnetic field and current, THE System SHALL allow calculation of force per unit length using F/L = BIsinθ
5. THE System SHALL provide 5 quests for each difficulty level in the Magnetic Fields stage
6. WHEN displaying magnetic field values, THE Visualization SHALL show field lines with circular patterns around current-carrying wires
7. WHEN calculating forces, THE System SHALL use μ₀ = 4π × 10⁻⁷ T·m/A as the permeability of free space

### Requirement 3: Particle Motion in Electromagnetic Fields

**User Story:** As a student, I want to analyze charged particle motion in electromagnetic fields, so that I can understand applications like mass spectrometers and particle accelerators.

#### Acceptance Criteria

1. WHEN a user is presented with a particle motion quest, THE System SHALL display particle charge (q), mass (m), velocity (v), and field values (E or B)
2. WHEN a particle moves in a uniform electric field, THE System SHALL allow calculation of acceleration using a = qE/m
3. WHEN a particle moves in a uniform magnetic field, THE System SHALL allow calculation of circular motion radius using r = mv/(qB)
4. WHEN a particle enters crossed electric and magnetic fields, THE System SHALL allow calculation of velocity selector conditions using v = E/B
5. THE System SHALL provide 5 quests for each difficulty level in the Particle Motion stage
6. WHEN displaying particle motion, THE Visualization SHALL show trajectory paths with velocity vectors and force vectors
7. FOR ELITE difficulty, THE System SHALL include real-world applications (mass spectrometer, cyclotron, velocity selector)

### Requirement 4: Difficulty Progression

**User Story:** As a student, I want problems that increase in conceptual depth, so that I can build understanding from basic field concepts to complex particle dynamics.

#### Acceptance Criteria

1. WHEN a user selects BASIC difficulty, THE System SHALL present problems with single point charges, simple field calculations, and integer values
2. WHEN a user selects CORE difficulty, THE System SHALL present problems with multiple charges, field superposition, and realistic physical values
3. WHEN a user selects ADVANCED difficulty, THE System SHALL present problems with non-uniform fields, vector decomposition, and multi-step calculations
4. WHEN a user selects ELITE difficulty, THE System SHALL present problems with real-world devices (mass spectrometer, cyclotron), complex geometries, and comprehensive analysis
5. WHEN a user changes difficulty, THE System SHALL load an independent set of 5 quests (not cumulative)
6. THE System SHALL ensure difficulty progression reflects conceptual depth: direct observation → field superposition → vector analysis → device applications

### Requirement 5: Interactive Visualization

**User Story:** As a student, I want to see visual representations of electric fields, magnetic fields, and particle trajectories, so that I can better understand abstract electromagnetic concepts.

#### Acceptance Criteria

1. WHEN a user views an Electric Fields quest, THE Visualization SHALL display field lines radiating from charges with arrows indicating direction
2. WHEN a user views a Magnetic Fields quest, THE Visualization SHALL display circular field lines around current-carrying wires with right-hand rule indication
3. WHEN a user views a Particle Motion quest, THE Visualization SHALL display particle trajectory with velocity vectors, force vectors, and field representations
4. WHEN quest data changes, THE Visualization SHALL update in real-time to reflect new field configurations
5. THE Visualization SHALL use color coding (blue for positive charges/electric fields, red for negative charges, green for magnetic fields, yellow for particle paths)
6. THE Visualization SHALL display all numerical values with appropriate units (N/C, T, m/s, N)
7. THE Visualization SHALL use animations to show field line patterns and particle motion dynamics

### Requirement 6: Basel-Specific Scenarios

**User Story:** As a Basel student, I want problems set in familiar local contexts, so that I can connect abstract electromagnetic concepts to real-world applications.

#### Acceptance Criteria

1. WHEN a user reads scenario descriptions, THE System SHALL reference Basel locations (University Hospital, Roche Tower, CERN collaboration, Rhine River)
2. WHEN a user sees device examples, THE System SHALL include applications relevant to Basel's pharmaceutical and research industries
3. WHEN a user encounters mass spectrometer problems, THE System SHALL reference Novartis/Roche quality control laboratories
4. THE System SHALL provide scenario descriptions of 150-250 words for each stage
5. WHEN displaying scenarios, THE System SHALL include specific people, places, situations, numerical values, and real-world significance
6. THE System SHALL connect scenarios to students' understanding of technology (MRI machines, particle accelerators, electrostatic precipitators)

### Requirement 7: Three-Language Support

**User Story:** As a multilingual student in Basel, I want to use the module in my preferred language, so that I can learn effectively in English, Chinese, or German.

#### Acceptance Criteria

1. THE System SHALL support three languages: English (EN), Chinese (CN), and German (DE)
2. WHEN a user switches languages, THE System SHALL translate all UI text including titles, buttons, and instructions
3. WHEN a user switches languages, THE System SHALL translate difficulty levels (BASIC/基础/BASIS, CORE/核心/KERN, ADVANCED/进阶/ERWEITERT, ELITE/精英/ELITE)
4. WHEN a user switches languages, THE System SHALL translate stage names and scenario descriptions
5. THE System SHALL render all mathematical formulas using LaTeX notation (E = kQ/r², B = μ₀I/(2πr), F = qE, r = mv/(qB))
6. WHEN displaying units, THE System SHALL use international symbols (N/C, T, m/s, N, C, A) that don't require translation
7. THE System SHALL ensure all translations are complete and accurate for each language

### Requirement 8: Answer Verification and Feedback

**User Story:** As a student, I want immediate feedback on my answers, so that I can learn from mistakes and reinforce correct understanding of electromagnetic concepts.

#### Acceptance Criteria

1. WHEN a user clicks "Verify", THE System SHALL compare the user's answer to the expected value
2. WHEN answers match within ±0.01 tolerance (or ±1% for very small values), THE System SHALL display a success message in green
3. WHEN answers don't match, THE System SHALL display an error message in red
4. WHEN verification succeeds, THE System SHALL enable the "Next" button to proceed to the next quest
5. WHEN a user clicks "Next", THE System SHALL load the next quest in the current difficulty and stage
6. THE System SHALL maintain quest state so users can't skip ahead without solving problems
7. WHEN all 5 quests in a stage are completed, THE System SHALL allow users to change stages or difficulty

### Requirement 9: Quest Data Structure

**User Story:** As a developer, I want well-structured quest data, so that the system can generate diverse electromagnetic problems and verify answers correctly.

#### Acceptance Criteria

1. THE System SHALL store quest data with fields: id, difficulty, stage, charge, distance, current, field_strength, velocity, mass, radius
2. WHEN building a quest pool, THE System SHALL generate 5 quests per difficulty per stage (60 total quests: 3 stages × 4 difficulties × 5 quests)
3. WHEN a quest requires calculation, THE System SHALL store the expected answer with appropriate precision
4. THE System SHALL use consistent units: Coulombs (C) for charge, meters (m) for distance, Amperes (A) for current, Tesla (T) for magnetic field, N/C for electric field
5. WHEN displaying formulas, THE System SHALL use LaTeX format with double backslashes (e.g., "E = \\frac{kQ}{r^2}")
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

**User Story:** As a student, I want to see properly formatted mathematical formulas, so that I can understand the electromagnetic equations I'm working with.

#### Acceptance Criteria

1. THE System SHALL render all formulas using react-katex library
2. WHEN displaying inline formulas, THE System SHALL use InlineMath component
3. WHEN displaying block formulas, THE System SHALL use BlockMath component
4. THE System SHALL use double backslashes for LaTeX commands (e.g., "\\text{}", "\\frac{}", "\\times")
5. THE System SHALL render units in roman font using \\text{} (e.g., "\\text{N/C}", "\\text{T}")
6. THE System SHALL never use Unicode superscripts (², ³) in LaTeX strings
7. WHEN formulas fail to render, THE System SHALL display an error message

### Requirement 12: Stage Navigation

**User Story:** As a student, I want to navigate between different stages, so that I can focus on specific topics (electric fields, magnetic fields, or particle motion).

#### Acceptance Criteria

1. THE System SHALL provide three stages: Electric Fields, Magnetic Fields, and Particle Motion
2. WHEN a user selects a stage, THE System SHALL load the appropriate quest pool for that stage
3. WHEN a user changes stages, THE System SHALL reset to the first quest of the selected stage
4. THE System SHALL visually indicate the current stage in the navigation
5. THE System SHALL allow stage changes at any time without losing progress in other stages
6. WHEN a user completes all quests in a stage, THE System SHALL mark that stage as complete
7. THE System SHALL persist stage completion status across sessions

### Requirement 13: Physical Constants

**User Story:** As a student, I want the system to use correct physical constants, so that my calculations match standard physics references.

#### Acceptance Criteria

1. THE System SHALL use Coulomb's constant k = 8.99 × 10⁹ N·m²/C² for electric field calculations
2. THE System SHALL use permeability of free space μ₀ = 4π × 10⁻⁷ T·m/A for magnetic field calculations
3. THE System SHALL use elementary charge e = 1.60 × 10⁻¹⁹ C when appropriate
4. THE System SHALL use electron mass mₑ = 9.11 × 10⁻³¹ kg when appropriate
5. THE System SHALL use proton mass mₚ = 1.67 × 10⁻²⁷ kg when appropriate
6. WHEN displaying constants in formulas, THE System SHALL show them with appropriate precision
7. THE System SHALL provide a reference table of constants accessible to users
