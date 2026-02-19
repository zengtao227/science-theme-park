# Requirements Document: SP2.01 - Circuit Basics // 电路基础

## Introduction

This module teaches students fundamental concepts of electricity including current, voltage, resistance, circuit components, and circuit diagrams. Students will learn to identify circuit components (batteries, bulbs, switches, wires), connect simple circuits, analyze circuit behavior, and draw circuit diagrams using standard symbols. The module aligns with Lehrplan 21 NT.6.1 (Elektrizität) and targets Sekundarschule Sek 2 students (14-16 years old). The module features interactive drag-and-drop circuit building, real-time current flow visualization, circuit simulation, and Basel-specific scenarios.

## Glossary

- **System**: The SP2.01 Circuit Basics module web application
- **User**: A student (14-16 years old) using the module to learn about basic electricity and circuits
- **Quest**: An individual practice problem involving circuit building, analysis, or diagram drawing
- **Stage**: A thematic section of the module (Circuit Components, Simple Circuits, or Circuit Diagrams)
- **Difficulty**: One of four levels (BASIC, CORE, ADVANCED, ELITE) that determines problem complexity
- **Circuit_Builder**: The interactive drag-and-drop interface for constructing circuits
- **Circuit_Simulator**: The visualization component that shows current flow and circuit behavior
- **Component**: An electrical element (battery, bulb, switch, wire, resistor) used in circuits
- **Circuit_Diagram**: A schematic representation of a circuit using standard electrical symbols
- **Current_Flow**: The animated visualization showing electron movement through a circuit
- **Verification**: The process of checking if a user's circuit or answer is correct
- **Translation**: Text content in one of three supported languages (EN/CN/DE)

## Requirements

### Requirement 1: Circuit Component Identification

**User Story:** As a student, I want to identify and understand basic circuit components, so that I can recognize them in real circuits and understand their functions.

#### Acceptance Criteria

1. THE System SHALL provide interactive representations of five basic components: battery, bulb, switch, wire, and resistor
2. WHEN a user selects a component, THE System SHALL display its name, symbol, and function in the current language
3. WHEN a user views a battery, THE System SHALL show positive (+) and negative (-) terminals clearly
4. WHEN a user views a bulb, THE System SHALL indicate that it converts electrical energy to light
5. WHEN a user views a switch, THE System SHALL show both open and closed states
6. WHEN a user views a wire, THE System SHALL indicate that it conducts electricity with minimal resistance
7. WHEN a user views a resistor, THE System SHALL show color bands and explain resistance function
8. THE System SHALL provide 20 BASIC difficulty quests focusing on component recognition and function
9. WHEN displaying components, THE Circuit_Simulator SHALL use realistic visual representations
10. THE System SHALL ensure all component descriptions are scientifically accurate and age-appropriate

### Requirement 2: Simple Circuit Construction

**User Story:** As a student, I want to build simple circuits by connecting components, so that I can understand how electricity flows and makes devices work.

#### Acceptance Criteria

1. THE Circuit_Builder SHALL provide a drag-and-drop interface for placing components on a workspace
2. WHEN a user drags a component, THE System SHALL allow placement anywhere on the circuit workspace
3. WHEN a user connects two components, THE System SHALL create a wire connection between them
4. WHEN a user creates a complete circuit, THE Circuit_Simulator SHALL show current flow animation
5. WHEN a user creates an incomplete circuit, THE System SHALL indicate why current cannot flow
6. WHEN a user adds a switch, THE System SHALL allow toggling between open and closed states
7. WHEN a switch is open, THE Circuit_Simulator SHALL stop current flow animation
8. WHEN a switch is closed, THE Circuit_Simulator SHALL resume current flow animation
9. THE System SHALL provide 20 CORE difficulty quests requiring circuit construction
10. WHEN a user builds a circuit, THE System SHALL verify correctness by checking component connections and circuit completeness

### Requirement 3: Current Flow Visualization

**User Story:** As a student, I want to see how current flows through circuits, so that I can understand the invisible movement of electricity.

#### Acceptance Criteria

1. WHEN a complete circuit is created, THE Circuit_Simulator SHALL display animated current flow
2. THE Circuit_Simulator SHALL show current flowing from battery positive terminal through the circuit to negative terminal
3. WHEN current flows through a bulb, THE Circuit_Simulator SHALL show the bulb lighting up
4. WHEN current flows through a wire, THE Circuit_Simulator SHALL show moving dots or arrows indicating electron flow
5. WHEN a switch opens, THE Circuit_Simulator SHALL immediately stop current flow animation
6. THE Circuit_Simulator SHALL use consistent animation speed to represent current flow (not actual electron speed)
7. WHEN multiple bulbs are in series, THE Circuit_Simulator SHALL show equal current through all bulbs
8. WHEN multiple bulbs are in parallel, THE Circuit_Simulator SHALL show current splitting at junctions
9. THE Circuit_Simulator SHALL use color coding: blue for wires with current, gray for wires without current
10. THE System SHALL provide a speed control to adjust animation speed for better observation

### Requirement 4: Circuit Diagram Drawing

**User Story:** As a student, I want to draw circuit diagrams using standard symbols, so that I can communicate circuit designs clearly and understand technical diagrams.

#### Acceptance Criteria

1. THE System SHALL provide standard electrical symbols for battery, bulb, switch, wire, and resistor
2. WHEN a user draws a circuit diagram, THE System SHALL provide a symbol palette with all components
3. WHEN a user selects a symbol, THE System SHALL allow placement on a grid-based drawing area
4. WHEN a user connects symbols, THE System SHALL draw straight lines representing wires
5. THE System SHALL enforce correct symbol orientation (battery terminals, switch position)
6. WHEN a user completes a diagram, THE System SHALL verify it matches the target circuit
7. THE System SHALL provide 15 ADVANCED difficulty quests requiring diagram drawing
8. WHEN displaying symbols, THE System SHALL use internationally recognized IEC standards
9. THE System SHALL allow users to compare their diagram with the correct solution
10. THE System SHALL provide feedback on incorrect symbol usage or connection errors

### Requirement 5: Series and Parallel Circuits

**User Story:** As a student, I want to understand the difference between series and parallel circuits, so that I can predict how circuits behave and troubleshoot problems.

#### Acceptance Criteria

1. WHEN a user builds a series circuit, THE System SHALL show all components connected in a single path
2. WHEN a user builds a parallel circuit, THE System SHALL show components connected across multiple paths
3. WHEN bulbs are in series, THE Circuit_Simulator SHALL show them dimmer than a single bulb
4. WHEN bulbs are in parallel, THE Circuit_Simulator SHALL show them at full brightness
5. WHEN one bulb fails in a series circuit, THE Circuit_Simulator SHALL show all bulbs going out
6. WHEN one bulb fails in a parallel circuit, THE Circuit_Simulator SHALL show other bulbs remaining lit
7. THE System SHALL provide 15 ADVANCED difficulty quests comparing series and parallel circuits
8. WHEN displaying circuit behavior, THE System SHALL explain why brightness differs between configurations
9. THE System SHALL allow users to experiment by adding or removing components
10. THE System SHALL provide real-world examples (Christmas lights, household wiring) to illustrate concepts

### Requirement 6: Circuit Troubleshooting

**User Story:** As a student, I want to identify and fix circuit problems, so that I can develop problem-solving skills and understand circuit failures.

#### Acceptance Criteria

1. WHEN a user is presented with a faulty circuit, THE System SHALL display symptoms (bulb not lighting, dim bulb)
2. WHEN a user investigates, THE System SHALL allow testing different components
3. WHEN a user identifies the fault, THE System SHALL verify the diagnosis
4. THE System SHALL include common faults: broken wire, dead battery, burned-out bulb, open switch
5. WHEN a user fixes the fault, THE Circuit_Simulator SHALL show the circuit working correctly
6. THE System SHALL provide 15 ADVANCED difficulty quests involving circuit troubleshooting
7. WHEN displaying faults, THE System SHALL use realistic visual indicators (broken wire, dark bulb)
8. THE System SHALL provide hints if users struggle to identify faults
9. THE System SHALL explain why each fault prevents current flow
10. THE System SHALL connect troubleshooting to real-world scenarios (fixing flashlights, household circuits)

### Requirement 7: Complex Circuit Design

**User Story:** As a student, I want to design circuits with multiple components and functions, so that I can apply my knowledge creatively and solve real-world problems.

#### Acceptance Criteria

1. WHEN a user attempts ELITE difficulty, THE System SHALL present design challenges requiring multiple components
2. THE System SHALL provide 5 ELITE difficulty quests involving complex circuit design
3. WHEN a user designs a circuit, THE System SHALL specify requirements (two switches controlling one bulb, three bulbs with independent control)
4. WHEN a user submits a design, THE System SHALL verify it meets all functional requirements
5. THE System SHALL allow multiple correct solutions for design challenges
6. WHEN evaluating designs, THE System SHALL check for circuit completeness, correct connections, and functional requirements
7. THE System SHALL provide real-world design scenarios (staircase lighting, car dashboard, alarm systems)
8. WHEN a design is correct, THE System SHALL allow users to test all functions interactively
9. THE System SHALL provide optimization challenges (minimize components, maximize efficiency)
10. THE System SHALL connect design challenges to Basel-specific applications (SBB train lighting, Roche building systems)

### Requirement 8: Basel-Specific Scenarios

**User Story:** As a Basel student, I want problems set in familiar local contexts, so that I can connect abstract electrical concepts to my daily life.

#### Acceptance Criteria

1. THE System SHALL provide four detailed Basel scenarios: home electrical safety, Christmas light design, school laboratory circuits, and SBB train station lighting
2. WHEN a user reads scenarios, THE System SHALL reference specific Basel locations (Basel SBB, University of Basel, Rhine River bridges)
3. WHEN scenarios describe electrical systems, THE System SHALL use Swiss electrical standards (230V, Type J plugs)
4. THE System SHALL provide scenario descriptions of 150-250 words for each stage
5. WHEN displaying scenarios, THE System SHALL include specific people, places, situations, numerical values, and real-world significance
6. THE System SHALL connect scenarios to students' daily experiences (home appliances, school equipment, public infrastructure)
7. WHEN describing safety, THE System SHALL reference Swiss electrical safety regulations
8. THE System SHALL include Basel-specific details (Roche Tower emergency lighting, tram electrical systems, Rhine River bridge illumination)
9. WHEN presenting Christmas lights scenario, THE System SHALL reference Basel's Christmas market (Weihnachtsmarkt) on Barfüsserplatz
10. THE System SHALL ensure all scenarios are culturally appropriate and educationally relevant

### Requirement 9: Three-Language Support

**User Story:** As a multilingual student in Basel, I want to use the module in my preferred language, so that I can learn effectively in English, Chinese, or German.

#### Acceptance Criteria

1. THE System SHALL support three languages: English (EN), Chinese (CN), and German (DE)
2. WHEN a user switches languages, THE System SHALL translate all UI text including titles, buttons, and instructions
3. WHEN a user switches languages, THE System SHALL translate difficulty levels (BASIC/基础/BASIS, CORE/核心/KERN, ADVANCED/进阶/ERWEITERT, ELITE/精英/ELITE)
4. WHEN a user switches languages, THE System SHALL translate stage names and scenario descriptions
5. WHEN a user switches languages, THE System SHALL translate component names (Battery/电池/Batterie, Bulb/灯泡/Glühbirne, Switch/开关/Schalter)
6. THE System SHALL use international electrical symbols that don't require translation
7. WHEN displaying units, THE System SHALL use international symbols (V for volts, A for amperes) consistently
8. THE System SHALL ensure all translations are complete and accurate for each language
9. WHEN displaying technical terms, THE System SHALL provide consistent terminology across all languages
10. THE System SHALL render any mathematical notation using LaTeX with four backslashes (\\\\) for proper escaping

### Requirement 10: Interactive Circuit Simulation

**User Story:** As a student, I want to interact with circuits and see immediate results, so that I can experiment and learn through hands-on exploration.

#### Acceptance Criteria

1. THE Circuit_Simulator SHALL update in real-time as users modify circuits
2. WHEN a user adds a component, THE Circuit_Simulator SHALL immediately incorporate it into the simulation
3. WHEN a user removes a component, THE Circuit_Simulator SHALL immediately show the effect on current flow
4. WHEN a user toggles a switch, THE Circuit_Simulator SHALL respond within 100 milliseconds
5. THE Circuit_Simulator SHALL allow users to measure voltage across components (for ADVANCED and ELITE levels)
6. THE Circuit_Simulator SHALL allow users to measure current through components (for ADVANCED and ELITE levels)
7. WHEN users make measurements, THE System SHALL display values with appropriate units and precision
8. THE Circuit_Simulator SHALL prevent physically impossible configurations (short circuits, reversed batteries)
9. WHEN users attempt invalid configurations, THE System SHALL provide educational feedback explaining why it's incorrect
10. THE Circuit_Simulator SHALL save circuit state so users can return to their work

### Requirement 11: Difficulty Progression

**User Story:** As a student, I want problems that increase in complexity, so that I can build my understanding progressively from simple to advanced concepts.

#### Acceptance Criteria

1. WHEN a user selects BASIC difficulty, THE System SHALL present 20 quests focusing on component identification and simple single-bulb circuits
2. WHEN a user selects CORE difficulty, THE System SHALL present 20 quests requiring circuit construction with multiple components
3. WHEN a user selects ADVANCED difficulty, THE System SHALL present 15 quests involving circuit diagrams, series/parallel circuits, and troubleshooting
4. WHEN a user selects ELITE difficulty, THE System SHALL present 5 quests requiring complex circuit design and innovation
5. WHEN a user changes difficulty, THE System SHALL load an independent set of quests (not cumulative)
6. THE System SHALL ensure each difficulty level teaches progressively deeper concepts, not just more components
7. WHEN users complete BASIC level, THE System SHALL encourage progression to CORE level
8. THE System SHALL track completion status for each difficulty level independently
9. WHEN displaying difficulty descriptions, THE System SHALL clearly explain what skills each level develops
10. THE System SHALL ensure total quest count is 60 (20 BASIC + 20 CORE + 15 ADVANCED + 5 ELITE)

### Requirement 12: Answer Verification and Feedback

**User Story:** As a student, I want immediate feedback on my circuits and answers, so that I can learn from mistakes and reinforce correct understanding.

#### Acceptance Criteria

1. WHEN a user clicks "Verify", THE System SHALL check the circuit against the expected solution
2. WHEN circuits match, THE System SHALL display a success message in green with encouraging text
3. WHEN circuits don't match, THE System SHALL display specific feedback about what's incorrect
4. WHEN verification succeeds, THE System SHALL enable the "Next" button to proceed to the next quest
5. WHEN a user clicks "Next", THE System SHALL load the next quest in the current difficulty and stage
6. THE System SHALL maintain quest state so users can't skip ahead without solving problems
7. WHEN all quests in a stage are completed, THE System SHALL display a completion message
8. THE System SHALL provide hints for struggling users without giving away the complete solution
9. WHEN users make common mistakes, THE System SHALL provide targeted educational feedback
10. THE System SHALL track attempts per quest to identify difficult problems for future improvement

### Requirement 13: Quest Data Structure

**User Story:** As a developer, I want well-structured quest data, so that the system can generate diverse problems and verify answers correctly.

#### Acceptance Criteria

1. THE System SHALL store quest data with fields: id, difficulty, stage, components, connections, targetCircuit, baselContext
2. WHEN building a quest pool, THE System SHALL generate 60 total quests (20 BASIC, 20 CORE, 15 ADVANCED, 5 ELITE)
3. WHEN a quest requires circuit building, THE System SHALL store the expected component configuration
4. THE System SHALL use consistent component identifiers (battery, bulb, switch, wire, resistor)
5. WHEN storing connections, THE System SHALL use a clear format specifying which components connect to which
6. THE System SHALL validate that all quest data is complete before rendering
7. WHEN quest data is missing, THE System SHALL display a loading state or error message
8. THE System SHALL include Basel-specific context for each quest (150-250 words)
9. WHEN storing circuit diagrams, THE System SHALL use standard symbol notation
10. THE System SHALL ensure quest data supports all three languages with complete translations

### Requirement 14: Responsive Layout

**User Story:** As a student using different devices, I want the module to work well on various screen sizes, so that I can learn on desktop, tablet, or mobile.

#### Acceptance Criteria

1. THE System SHALL use ChamberLayout component for consistent two-column structure
2. THE System SHALL display circuit builder/simulator on the left and instructions/feedback on the right
3. WHEN screen width is below 768px, THE System SHALL stack the layout vertically
4. THE System SHALL ensure all text is readable at minimum font size of 14px
5. THE System SHALL ensure all interactive elements (buttons, components) are at least 44px for touch targets
6. THE Circuit_Builder SHALL scale proportionally to maintain usability on different screen sizes
7. THE System SHALL ensure drag-and-drop works on both mouse and touch interfaces
8. THE System SHALL provide adequate spacing between components for easy selection on touch devices
9. THE System SHALL ensure all content is accessible without horizontal scrolling
10. THE System SHALL test layout on common devices (desktop, tablet, mobile) to ensure usability

### Requirement 15: Stage Navigation

**User Story:** As a student, I want to navigate between different stages, so that I can focus on specific topics (components, circuits, or diagrams).

#### Acceptance Criteria

1. THE System SHALL provide three stages: Circuit Components, Simple Circuits, and Circuit Diagrams
2. WHEN a user selects a stage, THE System SHALL load the appropriate quest pool for that stage
3. WHEN a user changes stages, THE System SHALL reset to the first quest of the selected stage
4. THE System SHALL visually indicate the current stage in the navigation
5. THE System SHALL allow stage changes at any time without losing progress in other stages
6. WHEN a user completes all quests in a stage, THE System SHALL mark that stage as complete
7. THE System SHALL persist stage completion status across sessions
8. WHEN displaying stage selection, THE System SHALL show progress (e.g., "15/20 completed")
9. THE System SHALL provide stage descriptions explaining what concepts each stage covers
10. THE System SHALL ensure smooth transitions between stages without data loss

### Requirement 16: Error Handling and Safety

**User Story:** As a student, I want the system to prevent dangerous circuit configurations and teach me about electrical safety, so that I learn safe practices.

#### Acceptance Criteria

1. WHEN a user attempts to create a short circuit, THE System SHALL prevent it and explain why it's dangerous
2. WHEN a user connects battery terminals directly, THE System SHALL display a safety warning
3. THE System SHALL teach proper battery polarity and consequences of reverse connection
4. WHEN displaying safety information, THE System SHALL reference Swiss electrical safety standards
5. THE System SHALL include safety tips in Basel scenarios (household electrical safety, school lab protocols)
6. WHEN users work with multiple batteries, THE System SHALL teach proper series/parallel connection
7. THE System SHALL explain why certain configurations can damage components or cause hazards
8. WHEN errors occur in the application, THE System SHALL display user-friendly error messages
9. THE System SHALL log errors for debugging without exposing technical details to users
10. THE System SHALL ensure all safety information is age-appropriate and scientifically accurate

### Requirement 17: Accessibility and Inclusivity

**User Story:** As a student with different learning needs, I want the module to be accessible, so that everyone can learn about circuits effectively.

#### Acceptance Criteria

1. THE System SHALL provide text alternatives for all visual circuit representations
2. WHEN using screen readers, THE System SHALL announce component names and connections
3. THE System SHALL support keyboard navigation for all interactive elements
4. WHEN users navigate with keyboard, THE System SHALL provide visible focus indicators
5. THE System SHALL use sufficient color contrast (WCAG AA standard minimum) for all text and components
6. THE System SHALL not rely solely on color to convey information (use labels, patterns, or text)
7. WHEN displaying animations, THE System SHALL provide option to reduce motion for users sensitive to animation
8. THE System SHALL ensure all interactive elements are reachable via keyboard (Tab, Arrow keys, Enter)
9. THE System SHALL provide clear instructions and feedback in simple, age-appropriate language
10. THE System SHALL test accessibility with common assistive technologies to ensure compatibility

### Requirement 18: Performance and Optimization

**User Story:** As a student, I want the module to load quickly and run smoothly, so that I can focus on learning without technical frustrations.

#### Acceptance Criteria

1. THE System SHALL load the initial page within 3 seconds on standard broadband connections
2. WHEN a user switches between quests, THE System SHALL transition within 500 milliseconds
3. THE Circuit_Simulator SHALL maintain 30 frames per second for smooth animations
4. WHEN rendering complex circuits, THE System SHALL optimize performance to prevent lag
5. THE System SHALL lazy-load quest data to reduce initial load time
6. THE System SHALL cache frequently accessed resources (component images, symbols)
7. WHEN users interact with circuits, THE System SHALL respond to input within 100 milliseconds
8. THE System SHALL optimize bundle size to minimize download time
9. THE System SHALL work reliably on devices with limited processing power (older tablets, budget laptops)
10. THE System SHALL monitor performance metrics and log slow operations for optimization

### Requirement 19: Progress Tracking and Persistence

**User Story:** As a student, I want my progress to be saved, so that I can continue learning across multiple sessions without losing work.

#### Acceptance Criteria

1. THE System SHALL save quest completion status to browser local storage
2. WHEN a user returns to the module, THE System SHALL restore their progress
3. THE System SHALL track which quests have been completed in each difficulty and stage
4. WHEN a user completes a quest, THE System SHALL immediately persist the completion status
5. THE System SHALL save partially completed circuits so users can return to unfinished work
6. THE System SHALL display overall progress (e.g., "35/60 quests completed")
7. WHEN users clear browser data, THE System SHALL handle missing progress gracefully
8. THE System SHALL allow users to reset progress if they want to start over
9. THE System SHALL track time spent on each quest for learning analytics
10. THE System SHALL ensure progress data is stored securely and privately (client-side only)

### Requirement 20: Educational Scaffolding

**User Story:** As a student learning new concepts, I want appropriate support and guidance, so that I can succeed without frustration while still being challenged.

#### Acceptance Criteria

1. WHEN a user starts a new difficulty level, THE System SHALL provide an introductory explanation of concepts
2. THE System SHALL offer hints after users struggle with a quest for 2 minutes
3. WHEN providing hints, THE System SHALL give progressively more specific guidance
4. THE System SHALL explain concepts using multiple representations (visual, textual, interactive)
5. WHEN users make mistakes, THE System SHALL provide constructive feedback explaining why it's incorrect
6. THE System SHALL connect new concepts to previously learned material
7. WHEN introducing new components, THE System SHALL provide interactive demonstrations
8. THE System SHALL use scaffolding that fades as users demonstrate mastery
9. WHEN users complete difficult quests, THE System SHALL provide positive reinforcement
10. THE System SHALL adapt difficulty within levels based on user performance (optional feature for future enhancement)
