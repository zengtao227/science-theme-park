# Requirements Document: SC1.06 - Chemical Reactions Basics

## Introduction

This module teaches students about fundamental chemical reactions, including reaction types, chemical equation writing and balancing, and identifying reactants and products. Students will learn through interactive exercises set in Basel-specific contexts, including pharmaceutical reactions at Novartis/Roche and everyday chemical processes. The module aligns with Lehrplan 21 NT.2.6.a and targets Sekundarschule students (13-15 years old).

## Glossary

- **System**: The SC1.06 Chemical Reactions Basics module web application
- **User**: A student (13-15 years old) using the module to learn about chemical reactions
- **Quest**: An individual practice problem with specific parameters and expected answers
- **Stage**: A thematic section of the module (Reaction Types, Equation Balancing, or Reaction Simulation)
- **Difficulty**: One of four levels (BASIC, CORE, ADVANCED, ELITE) that determines problem complexity
- **Visualization**: The interactive graphical display showing chemical reactions, equations, or molecular structures
- **Chemical_Equation**: A symbolic representation of a chemical reaction showing reactants and products
- **Reactant**: A substance that undergoes change in a chemical reaction
- **Product**: A substance formed as a result of a chemical reaction
- **Balancing**: The process of ensuring equal numbers of each atom type on both sides of a chemical equation
- **Reaction_Type**: A classification of chemical reactions (synthesis, decomposition, single replacement, double replacement, combustion)
- **Translation**: Text content in one of three supported languages (EN/CN/DE)

## Requirements

### Requirement 1: Chemical Equation Recognition

**User Story:** As a student, I want to identify reactants and products in chemical equations, so that I can understand the basic structure of chemical reactions.

#### Acceptance Criteria

1. WHEN a user is presented with a chemical equation, THE System SHALL display it using proper chemical notation with react-katex
2. WHEN a user identifies reactants, THE System SHALL verify they are substances on the left side of the arrow
3. WHEN a user identifies products, THE System SHALL verify they are substances on the right side of the arrow
4. THE System SHALL use four backslashes for LaTeX commands in chemical formulas (e.g., "\\\\text{H}_2\\\\text{O}")
5. THE System SHALL provide 5 quests for BASIC difficulty focusing on simple equations with 2-3 substances
6. WHEN displaying chemical formulas, THE Visualization SHALL show molecular structures or ball-and-stick models
7. THE System SHALL accept chemical formulas in standard notation (H₂O, CO₂, NaCl)

### Requirement 2: Equation Balancing

**User Story:** As a student, I want to balance chemical equations, so that I can apply the law of conservation of mass to chemical reactions.

#### Acceptance Criteria

1. WHEN a user is presented with an unbalanced equation, THE System SHALL display it with coefficient placeholders
2. WHEN a user enters coefficients, THE System SHALL verify that atom counts are equal on both sides
3. WHEN an equation is balanced correctly, THE System SHALL display a success message and show atom count verification
4. WHEN an equation is incorrectly balanced, THE System SHALL highlight which atoms are unbalanced
5. THE System SHALL provide 5 quests for each difficulty level (BASIC, CORE, ADVANCED, ELITE) in the Equation Balancing stage
6. THE Balancing_Visualizer SHALL display atom counts for each element on both sides of the equation
7. FOR BASIC difficulty, THE System SHALL present equations requiring coefficients of 1-3
8. FOR CORE difficulty, THE System SHALL present equations requiring coefficients up to 5
9. FOR ADVANCED difficulty, THE System SHALL present equations with polyatomic ions and coefficients up to 10
10. FOR ELITE difficulty, THE System SHALL present complex organic reactions and combustion equations

### Requirement 3: Reaction Type Classification

**User Story:** As a student, I want to classify chemical reactions by type, so that I can recognize patterns and predict reaction outcomes.

#### Acceptance Criteria

1. WHEN a user is presented with a chemical equation, THE System SHALL ask them to identify the reaction type
2. THE System SHALL support five reaction types: synthesis (A+B→AB), decomposition (AB→A+B), single replacement (A+BC→AC+B), double replacement (AB+CD→AD+CB), and combustion
3. WHEN a user selects a reaction type, THE System SHALL verify it matches the expected classification
4. THE System SHALL provide 5 quests for each difficulty level in the Reaction Types stage
5. WHEN displaying reaction types, THE Visualization SHALL show general patterns and specific examples
6. FOR BASIC difficulty, THE System SHALL present clear examples of each type with simple compounds
7. FOR CORE difficulty, THE System SHALL present reactions requiring analysis of reactant and product patterns
8. FOR ADVANCED difficulty, THE System SHALL present ambiguous cases requiring deeper understanding
9. FOR ELITE difficulty, THE System SHALL present complex reactions including redox and acid-base reactions

### Requirement 4: Interactive Equation Balancer

**User Story:** As a student, I want an interactive tool to practice balancing equations, so that I can develop my balancing skills through hands-on practice.

#### Acceptance Criteria

1. THE System SHALL provide an interactive equation balancer with input fields for coefficients
2. WHEN a user enters a coefficient, THE Balancer SHALL update atom counts in real-time
3. WHEN atom counts are balanced, THE Balancer SHALL highlight the equation in green
4. WHEN atom counts are unbalanced, THE Balancer SHALL show which elements need adjustment
5. THE Balancer SHALL display a table showing element counts on reactant and product sides
6. THE Balancer SHALL allow users to reset coefficients and try again
7. THE Balancer SHALL provide hints when users are stuck (e.g., "Try increasing the coefficient for H₂O")
8. THE Balancer SHALL validate that coefficients are positive integers

### Requirement 5: Reaction Type Classifier

**User Story:** As a student, I want a tool to help me identify reaction types, so that I can learn to recognize patterns in chemical reactions.

#### Acceptance Criteria

1. THE System SHALL provide an interactive reaction type classifier
2. WHEN a user views a reaction, THE Classifier SHALL display the equation and ask for classification
3. WHEN a user selects a type, THE Classifier SHALL provide immediate feedback
4. THE Classifier SHALL show the general pattern for each reaction type
5. THE Classifier SHALL provide examples of each reaction type from daily life and industry
6. THE Classifier SHALL allow users to see multiple examples of the same reaction type
7. FOR correct classifications, THE Classifier SHALL explain why the classification is correct
8. FOR incorrect classifications, THE Classifier SHALL explain the correct type and why

### Requirement 6: Reaction Simulator

**User Story:** As a student, I want to see animated simulations of chemical reactions, so that I can visualize molecular-level changes during reactions.

#### Acceptance Criteria

1. THE System SHALL provide a reaction simulator showing molecular animations
2. WHEN a user starts a simulation, THE Simulator SHALL show reactant molecules approaching each other
3. WHEN molecules react, THE Simulator SHALL show bonds breaking and forming
4. WHEN the reaction completes, THE Simulator SHALL show product molecules separating
5. THE Simulator SHALL use color coding for different atoms (H=white, O=red, C=black, N=blue, etc.)
6. THE Simulator SHALL display the chemical equation alongside the animation
7. THE Simulator SHALL allow users to pause, play, and restart animations
8. THE Simulator SHALL show energy changes during the reaction (exothermic/endothermic)

### Requirement 7: Difficulty Progression

**User Story:** As a student, I want problems that increase in complexity, so that I can build my understanding progressively from simple to advanced concepts.

#### Acceptance Criteria

1. WHEN a user selects BASIC difficulty, THE System SHALL present simple reactions with common compounds (H₂O, CO₂, NaCl)
2. WHEN a user selects CORE difficulty, THE System SHALL present reactions with polyatomic ions and more complex balancing
3. WHEN a user selects ADVANCED difficulty, THE System SHALL present reactions with organic compounds and multiple steps
4. WHEN a user selects ELITE difficulty, THE System SHALL present industrial reactions, pharmaceutical synthesis, and complex mechanisms
5. WHEN a user changes difficulty, THE System SHALL load an independent set of 5 quests per stage
6. THE System SHALL ensure each difficulty level teaches progressively deeper concepts
7. THE System SHALL provide 60-65 total quests across all difficulties and stages

### Requirement 8: Basel-Specific Scenarios

**User Story:** As a Basel student, I want problems set in familiar local contexts, so that I can connect abstract chemistry concepts to real-world applications.

#### Acceptance Criteria

1. WHEN a user reads scenario descriptions, THE System SHALL reference Basel locations (Novartis, Roche, Basel Chemistry Lab, Rhine River)
2. WHEN a user sees pharmaceutical reactions, THE System SHALL reference drug synthesis at Basel pharmaceutical companies
3. WHEN a user sees everyday reactions, THE System SHALL include examples from Basel daily life (water treatment, food chemistry, cleaning products)
4. THE System SHALL provide scenario descriptions of 150-250 words for each stage
5. WHEN displaying scenarios, THE System SHALL include specific people, places, situations, numerical values, and real-world significance
6. THE System SHALL connect scenarios to students' daily experiences and Basel's pharmaceutical industry
7. FOR ELITE difficulty, THE System SHALL include actual pharmaceutical reactions used in Basel industry

### Requirement 9: Three-Language Support

**User Story:** As a multilingual student in Basel, I want to use the module in my preferred language, so that I can learn effectively in English, Chinese, or German.

#### Acceptance Criteria

1. THE System SHALL support three languages: English (EN), Chinese (CN), and German (DE)
2. WHEN a user switches languages, THE System SHALL translate all UI text including titles, buttons, and instructions
3. WHEN a user switches languages, THE System SHALL translate difficulty levels (BASIC/基础/BASIS, CORE/核心/KERN, ADVANCED/进阶/ERWEITERT, ELITE/精英/ELITE)
4. WHEN a user switches languages, THE System SHALL translate stage names and scenario descriptions
5. WHEN a user switches languages, THE System SHALL translate reaction type names
6. THE System SHALL keep chemical formulas and equations in international notation (not translated)
7. THE System SHALL ensure all translations are complete and accurate for each language

### Requirement 10: Answer Verification and Feedback

**User Story:** As a student, I want immediate feedback on my answers, so that I can learn from mistakes and reinforce correct understanding.

#### Acceptance Criteria

1. WHEN a user submits an answer, THE System SHALL compare it to the expected value
2. WHEN balancing equations, THE System SHALL verify that all atom counts match on both sides
3. WHEN classifying reactions, THE System SHALL verify the selected type matches the expected classification
4. WHEN answers are correct, THE System SHALL display a success message in green
5. WHEN answers are incorrect, THE System SHALL display an error message in red with hints
6. WHEN verification succeeds, THE System SHALL enable the "Next" button to proceed to the next quest
7. WHEN a user clicks "Next", THE System SHALL load the next quest in the current difficulty and stage
8. THE System SHALL maintain quest state so users can't skip ahead without solving problems

### Requirement 11: Quest Data Structure

**User Story:** As a developer, I want well-structured quest data, so that the system can generate diverse problems and verify answers correctly.

#### Acceptance Criteria

1. THE System SHALL store quest data with fields: id, difficulty, stage, equation, reactants, products, coefficients, reactionType
2. WHEN building a quest pool, THE System SHALL generate 60-65 total quests across all difficulties and stages
3. WHEN a quest requires balancing, THE System SHALL store the correct coefficients
4. WHEN a quest requires classification, THE System SHALL store the correct reaction type
5. THE System SHALL use consistent chemical notation following IUPAC standards
6. WHEN displaying chemical formulas, THE System SHALL use LaTeX format with four backslashes (e.g., "\\\\text{H}_2\\\\text{O}")
7. THE System SHALL validate that all quest data is complete before rendering

### Requirement 12: Formula Rendering

**User Story:** As a student, I want to see properly formatted chemical equations, so that I can understand the reactions I'm working with.

#### Acceptance Criteria

1. THE System SHALL render all chemical equations using react-katex library
2. WHEN displaying chemical formulas, THE System SHALL use InlineMath component for inline display
3. WHEN displaying reaction equations, THE System SHALL use BlockMath component for centered display
4. THE System SHALL use four backslashes for LaTeX commands (e.g., "\\\\text{}", "\\\\rightarrow")
5. THE System SHALL render subscripts using underscore notation (e.g., "H_2O" for H₂O)
6. THE System SHALL render superscripts using caret notation (e.g., "Fe^{3+}" for Fe³⁺)
7. THE System SHALL use \\rightarrow for reaction arrows
8. THE System SHALL never use Unicode characters for chemical notation in LaTeX strings
9. WHEN formulas fail to render, THE System SHALL display an error message

### Requirement 13: Responsive Layout

**User Story:** As a student using different devices, I want the module to work well on various screen sizes, so that I can learn on desktop, tablet, or mobile.

#### Acceptance Criteria

1. THE System SHALL use a two-column layout with quests on the left and visualization on the right
2. WHEN screen width is below 768px, THE System SHALL stack the layout vertically
3. THE System SHALL ensure all text is readable at minimum font size of 14px
4. THE System SHALL ensure all interactive elements (buttons, input fields) are at least 44px tall for touch targets
5. THE Visualization SHALL scale proportionally to maintain aspect ratio
6. THE System SHALL use the ChamberLayout component for consistent structure
7. THE System SHALL ensure all content is accessible without horizontal scrolling

### Requirement 14: Stage Navigation

**User Story:** As a student, I want to navigate between different stages, so that I can focus on specific topics (reaction types, equation balancing, or reaction simulation).

#### Acceptance Criteria

1. THE System SHALL provide three stages: Reaction Types, Equation Balancing, and Reaction Simulation
2. WHEN a user selects a stage, THE System SHALL load the appropriate quest pool for that stage
3. WHEN a user changes stages, THE System SHALL reset to the first quest of the selected stage
4. THE System SHALL visually indicate the current stage in the navigation
5. THE System SHALL allow stage changes at any time without losing progress in other stages
6. WHEN a user completes all quests in a stage, THE System SHALL mark that stage as complete
7. THE System SHALL persist stage completion status across sessions

### Requirement 15: Reaction Mechanism Visualization (ELITE)

**User Story:** As an advanced student, I want to see detailed reaction mechanisms, so that I can understand how reactions occur at the molecular level.

#### Acceptance Criteria

1. FOR ELITE difficulty quests, THE System SHALL provide detailed reaction mechanism visualizations
2. WHEN a user views a mechanism, THE Visualization SHALL show electron movement with curved arrows
3. WHEN a user views a mechanism, THE Visualization SHALL show intermediate species
4. WHEN a user views a mechanism, THE Visualization SHALL show transition states
5. THE System SHALL use standard organic chemistry notation for mechanisms
6. THE System SHALL allow users to step through mechanisms one step at a time
7. FOR pharmaceutical reactions, THE System SHALL show actual mechanisms used in Basel drug synthesis
