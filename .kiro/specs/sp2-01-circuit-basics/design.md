# Design Document: SP2.01 - Circuit Basics // 电路基础

## Overview

The SP2.01 Circuit Basics module is an interactive educational web application that teaches students fundamental concepts of electricity through hands-on circuit building, real-time current flow visualization, and circuit diagram drawing. The module follows the Chamber Module Standards with a two-column layout: interactive circuit workspace on the left and instructions/feedback on the right.

The module consists of three stages (Circuit Components, Simple Circuits, Circuit Diagrams), each with four difficulty levels (BASIC, CORE, ADVANCED, ELITE), providing 60 total quests (20 BASIC + 20 CORE + 15 ADVANCED + 5 ELITE). All content is available in three languages (EN/CN/DE) with Basel-specific scenarios that connect abstract electrical concepts to students' daily lives.

The module features:
- **Interactive Circuit Builder**: Drag-and-drop interface for placing and connecting components
- **Real-time Current Flow Visualization**: Animated display showing electron movement through circuits
- **Circuit Diagram Drawing**: Grid-based interface using standard IEC electrical symbols
- **Circuit Simulation**: Live feedback on circuit behavior (bulb brightness, switch states, current flow)
- **Troubleshooting Challenges**: Identify and fix common circuit faults
- **Basel-specific Scenarios**: Home electrical safety, Christmas lights, school labs, SBB train stations

## Architecture

### Component Hierarchy

```
SP201CircuitBasics (Page Component)
├── ChamberLayout (Layout Container)
│   ├── Header (Title, Language Selector)
│   ├── DifficultySelector (BASIC/CORE/ADVANCED/ELITE)
│   ├── StageSelector (COMPONENTS/CIRCUITS/DIAGRAMS)
│   ├── Left Panel (Interactive Workspace)
│   │   ├── CircuitBuilder (for COMPONENTS and CIRCUITS stages)
│   │   │   ├── ComponentPalette
│   │   │   │   ├── BatteryComponent
│   │   │   │   ├── BulbComponent
│   │   │   │   ├── SwitchComponent
│   │   │   │   ├── WireComponent
│   │   │   │   └── ResistorComponent
│   │   │   ├── CircuitWorkspace (Canvas)
│   │   │   └── ConnectionManager
│   │   ├── DiagramDrawer (for DIAGRAMS stage)
│   │   │   ├── SymbolPalette
│   │   │   ├── GridCanvas
│   │   │   └── ConnectionDrawer
│   │   └── CircuitSimulator (Overlay)
│   │       ├── CurrentFlowAnimation
│   │       ├── BulbBrightnessRenderer
│   │       └── SwitchStateRenderer
│   ├── Right Panel (Quest Content)
│   │   ├── ScenarioDescription
│   │   ├── QuestDisplay
│   │   │   ├── PromptText
│   │   │   ├── ComponentInfo (for COMPONENTS stage)
│   │   │   └── CircuitRequirements (for CIRCUITS/DIAGRAMS stages)
│   │   └── FeedbackDisplay
│   └── Footer (Verify/Next/Hint Buttons)
└── useCircuitManager (State Management Hook)
```

### Data Flow

1. **Initialization**: useCircuitManager loads quest pool based on initial difficulty (BASIC) and stage (COMPONENTS)
2. **Quest Selection**: System selects first quest from pool and displays it
3. **User Interaction**: 
   - COMPONENTS stage: User selects components to view information
   - CIRCUITS stage: User drags components, creates connections, toggles switches
   - DIAGRAMS stage: User places symbols and draws connections on grid
4. **Real-time Simulation**: CircuitSimulator continuously evaluates circuit state and updates visualization
5. **Verification**: User clicks "Verify" → System compares circuit/diagram to expected solution → Displays feedback
6. **Navigation**: User clicks "Next" → System loads next quest → Resets workspace
7. **Stage/Difficulty Change**: User changes stage or difficulty → System rebuilds quest pool → Resets to first quest

### State Management

The module uses the `useCircuitManager` hook which manages:
- Current difficulty level
- Current stage
- Quest pool (array of quests)
- Current quest index
- Circuit state (components, connections, switch states)
- Diagram state (symbols, connections)
- Simulation state (current flow, bulb brightness)
- Last verification result
- Quest completion status

## Components and Interfaces

### 1. SP201CircuitBasics (Main Page Component)

**Purpose**: Root component that orchestrates the entire module

**Props**: None (uses URL routing)

**State**:
- `circuitState: CircuitState` - Current circuit configuration
- `simulationState: SimulationState` - Current simulation results

**Key Methods**:
- `buildStagePool(t, difficulty, stage)` - Generates quest pool for given difficulty and stage
- `handleDifficultyChange(newDifficulty)` - Switches difficulty level
- `handleStageChange(newStage)` - Switches stage
- `handleComponentPlace(component, position)` - Places component on workspace
- `handleConnection(from, to)` - Creates connection between components
- `handleSwitchToggle(switchId)` - Toggles switch state
- `simulateCircuit(circuit)` - Runs circuit simulation and updates visualization

**Responsibilities**:
- Initialize useCircuitManager hook
- Build quest pools based on difficulty and stage
- Pass data to ChamberLayout and CircuitBuilder/DiagramDrawer
- Handle language switching via i18n
- Coordinate circuit simulation

### 2. CircuitBuilder Component

**Purpose**: Interactive drag-and-drop interface for building circuits

**Props**:
```typescript
interface CircuitBuilderProps {
    quest: SP201Quest;
    circuitState: CircuitState;
    onComponentPlace: (component: Component, position: Position) => void;
    onConnection: (from: string, to: string) => void;
    onSwitchToggle: (switchId: string) => void;
    onComponentRemove: (componentId: string) => void;
    simulationState: SimulationState;
}
```

**Features**:
- Drag components from palette to workspace
- Click to create connections between component terminals
- Toggle switches by clicking
- Remove components by dragging to trash or pressing Delete
- Visual feedback for valid/invalid connections
- Snap-to-grid positioning for clean layouts

**Rendering Logic**:
- Render component palette on left side
- Render workspace canvas in center
- Render placed components with connection points
- Overlay current flow animation from simulationState
- Highlight components based on simulation (lit bulbs, active wires)

### 3. DiagramDrawer Component

**Purpose**: Grid-based interface for drawing circuit diagrams using standard symbols

**Props**:
```typescript
interface DiagramDrawerProps {
    quest: SP201Quest;
    diagramState: DiagramState;
    onSymbolPlace: (symbol: Symbol, gridPosition: GridPosition) => void;
    onConnectionDraw: (from: GridPosition, to: GridPosition) => void;
    onSymbolRemove: (symbolId: string) => void;
}
```

**Features**:
- Symbol palette with IEC standard electrical symbols
- Grid-based canvas (20x20 grid)
- Click to place symbols on grid intersections
- Click-and-drag to draw straight wire connections
- Enforce correct symbol orientation
- Compare drawn diagram with target solution

**Symbol Library**:
- Battery: Two parallel lines (long positive, short negative)
- Bulb: Circle with X inside
- Switch: Break in line with angled connector
- Wire: Straight lines with right-angle turns
- Resistor: Rectangular box

### 4. CircuitSimulator Component

**Purpose**: Simulates circuit behavior and visualizes current flow

**Props**:
```typescript
interface CircuitSimulatorProps {
    circuit: CircuitState;
    onSimulationUpdate: (state: SimulationState) => void;
}
```

**Simulation Algorithm**:

1. **Circuit Analysis**:
   - Check if circuit is complete (closed loop from battery + to -)
   - Identify series vs parallel configurations
   - Check switch states (open breaks circuit)
   - Calculate total resistance

2. **Current Flow Calculation**:
   - If circuit incomplete or switch open: current = 0
   - If circuit complete: current = voltage / total_resistance
   - For series: same current through all components
   - For parallel: current splits at junctions

3. **Component State Calculation**:
   - Bulb brightness: proportional to power (P = I²R)
   - Wire state: active (blue) if current flows, inactive (gray) if not
   - Switch state: closed (connected) or open (disconnected)

4. **Visualization Update**:
   - Animate current flow with moving dots along wires
   - Update bulb brightness (dim/normal/bright)
   - Update wire colors
   - Animation speed: configurable (default 1x)

**Output**:
```typescript
interface SimulationState {
    isComplete: boolean;
    current: number;  // in Amperes
    componentStates: Map<string, ComponentState>;
    currentPath: string[];  // ordered list of component IDs in current path
}

interface ComponentState {
    hasCurrentFlow: boolean;
    brightness?: number;  // 0-100 for bulbs
    isActive: boolean;
}
```

### 5. Quest Data Structure

```typescript
interface SP201Quest {
    id: string;                    // Unique identifier (e.g., "COMPONENTS_BASIC_1")
    difficulty: Difficulty;        // BASIC | CORE | ADVANCED | ELITE
    stage: Stage;                  // COMPONENTS | CIRCUITS | DIAGRAMS
    type: QuestType;               // IDENTIFY | BUILD | DRAW | TROUBLESHOOT | DESIGN
    
    // For IDENTIFY quests (COMPONENTS stage)
    targetComponent?: ComponentType;
    componentInfo?: {
        name: { en: string; cn: string; de: string };
        symbol: string;
        function: { en: string; cn: string; de: string };
    };
    
    // For BUILD quests (CIRCUITS stage)
    requiredComponents?: ComponentType[];
    targetCircuit?: CircuitConfiguration;
    circuitType?: "SERIES" | "PARALLEL" | "MIXED";
    
    // For DRAW quests (DIAGRAMS stage)
    targetDiagram?: DiagramConfiguration;
    
    // For TROUBLESHOOT quests
    faultyCircuit?: CircuitConfiguration;
    fault?: FaultType;  // BROKEN_WIRE | DEAD_BATTERY | BURNED_BULB | OPEN_SWITCH
    
    // For DESIGN quests
    designRequirements?: string[];
    acceptableSolutions?: CircuitConfiguration[];
    
    promptLatex: string;           // Question text
    baselContext?: string;         // Basel-specific scenario
    hints?: string[];              // Progressive hints
}

type ComponentType = "BATTERY" | "BULB" | "SWITCH" | "WIRE" | "RESISTOR";
type QuestType = "IDENTIFY" | "BUILD" | "DRAW" | "TROUBLESHOOT" | "DESIGN";
type FaultType = "BROKEN_WIRE" | "DEAD_BATTERY" | "BURNED_BULB" | "OPEN_SWITCH";

interface CircuitConfiguration {
    components: Component[];
    connections: Connection[];
}

interface Component {
    id: string;
    type: ComponentType;
    position: Position;
    properties?: {
        voltage?: number;      // for batteries
        resistance?: number;   // for bulbs, resistors
        state?: "OPEN" | "CLOSED";  // for switches
    };
}

interface Connection {
    from: string;  // component ID
    to: string;    // component ID
    fromTerminal: "POSITIVE" | "NEGATIVE" | "TERMINAL_A" | "TERMINAL_B";
    toTerminal: "POSITIVE" | "NEGATIVE" | "TERMINAL_A" | "TERMINAL_B";
}

interface DiagramConfiguration {
    symbols: DiagramSymbol[];
    connections: DiagramConnection[];
}

interface DiagramSymbol {
    id: string;
    type: ComponentType;
    gridPosition: GridPosition;
    orientation: "HORIZONTAL" | "VERTICAL";
}

interface DiagramConnection {
    from: GridPosition;
    to: GridPosition;
    path: GridPosition[];  // for multi-segment wires
}

interface Position {
    x: number;
    y: number;
}

interface GridPosition {
    row: number;
    col: number;
}
```

### 6. Quest Pool Generation

**buildStagePool Function**:

```typescript
function buildStagePool(
    t: TranslationType,
    difficulty: Difficulty,
    stage: Stage
): SP201Quest[]
```

**Quest Distribution**:

**BASIC Difficulty (20 quests)**:
- COMPONENTS stage: 20 quests
  - Component identification (5 quests: battery, bulb, switch, wire, resistor)
  - Component function explanation (5 quests)
  - Symbol recognition (5 quests)
  - Terminal identification (5 quests)

**CORE Difficulty (20 quests)**:
- CIRCUITS stage: 20 quests
  - Single bulb circuits (5 quests)
  - Multiple bulb series circuits (5 quests)
  - Multiple bulb parallel circuits (5 quests)
  - Switch control circuits (5 quests)

**ADVANCED Difficulty (15 quests)**:
- Mixed stage: 15 quests
  - Circuit diagrams (5 quests)
  - Series vs parallel comparison (5 quests)
  - Circuit troubleshooting (5 quests)

**ELITE Difficulty (5 quests)**:
- CIRCUITS stage: 5 quests
  - Complex circuit design (2 switches controlling 1 bulb, 3 bulbs with independent control, etc.)
  - Optimization challenges
  - Real-world applications

**Total: 60 quests**

## Data Models

### Component Library

**Battery**:
```typescript
{
    type: "BATTERY",
    voltage: 9,  // Volts (BASIC: 9V, CORE: 12V, ADVANCED: 24V)
    terminals: ["POSITIVE", "NEGATIVE"],
    symbol: "⏚",
    visualRepresentation: "rectangular with + and - terminals"
}
```

**Bulb**:
```typescript
{
    type: "BULB",
    resistance: 10,  // Ohms (typical: 10Ω)
    terminals: ["TERMINAL_A", "TERMINAL_B"],
    symbol: "💡",
    visualRepresentation: "circle with filament inside",
    brightnessLevels: {
        off: 0,
        dim: 30,      // < 50% rated power
        normal: 70,   // 50-100% rated power
        bright: 100   // 100% rated power
    }
}
```

**Switch**:
```typescript
{
    type: "SWITCH",
    state: "OPEN" | "CLOSED",
    terminals: ["TERMINAL_A", "TERMINAL_B"],
    symbol: "⏻",
    visualRepresentation: "break in line with toggle"
}
```

**Wire**:
```typescript
{
    type: "WIRE",
    resistance: 0.01,  // Negligible resistance
    terminals: ["TERMINAL_A", "TERMINAL_B"],
    symbol: "—",
    visualRepresentation: "straight line"
}
```

**Resistor**:
```typescript
{
    type: "RESISTOR",
    resistance: 100,  // Ohms (variable)
    terminals: ["TERMINAL_A", "TERMINAL_B"],
    symbol: "⧉",
    visualRepresentation: "rectangular box with color bands",
    colorBands: ["brown", "black", "brown"]  // 100Ω
}
```

### Basel Scenarios

**Scenario 1: Home Electrical Safety** (BASIC/CORE)
- Location: Typical Basel apartment
- Context: Understanding household circuits, Swiss Type J plugs, 230V standard
- Quests: Identify components in home appliances, build simple lamp circuits
- Safety focus: Proper grounding, circuit breakers, avoiding short circuits

**Scenario 2: Christmas Light Design** (CORE/ADVANCED)
- Location: Basel Weihnachtsmarkt on Barfüsserplatz
- Context: Series vs parallel Christmas light strings
- Quests: Build series/parallel bulb circuits, troubleshoot failed bulbs
- Real-world connection: Why one bulb failure affects whole string (series) vs individual bulbs (parallel)

**Scenario 3: School Laboratory Circuits** (ADVANCED)
- Location: University of Basel Physics Lab
- Context: Educational circuit experiments
- Quests: Draw circuit diagrams, measure voltage/current, troubleshoot circuits
- Scientific focus: Proper documentation, standard symbols, measurement techniques

**Scenario 4: SBB Train Station Lighting** (ELITE)
- Location: Basel SBB train station
- Context: Complex lighting control systems
- Quests: Design multi-switch circuits, optimize power usage, emergency lighting
- Engineering focus: Redundancy, efficiency, safety standards


## Acceptance Criteria Testing Prework

### Requirement 1: Circuit Component Identification

1.1. THE System SHALL provide interactive representations of five basic components
  Thoughts: This is about the system having certain UI elements present. We can test that all five component types are available in the palette.
  Testable: yes - example

1.2. WHEN a user selects a component, THE System SHALL display its name, symbol, and function
  Thoughts: This is a rule that applies to all components. For any component selection, the system should display specific information. We can generate random component selections and verify the display contains name, symbol, and function.
  Testable: yes - property

1.3. WHEN a user views a battery, THE System SHALL show positive (+) and negative (-) terminals clearly
  Thoughts: This is specific to the battery component. This is an example test.
  Testable: yes - example

1.4. WHEN a user views a bulb, THE System SHALL indicate that it converts electrical energy to light
  Thoughts: This is specific to the bulb component. This is an example test.
  Testable: yes - example

1.5. WHEN a user views a switch, THE System SHALL show both open and closed states
  Thoughts: This is specific to the switch component. We can test that the switch can be toggled and displays both states.
  Testable: yes - example

1.6. WHEN a user views a wire, THE System SHALL indicate that it conducts electricity with minimal resistance
  Thoughts: This is specific to the wire component. This is an example test.
  Testable: yes - example

1.7. WHEN a user views a resistor, THE System SHALL show color bands and explain resistance function
  Thoughts: This is specific to the resistor component. This is an example test.
  Testable: yes - example

1.8. THE System SHALL provide 20 BASIC difficulty quests focusing on component recognition
  Thoughts: This is about the quest pool size. We can test that the BASIC difficulty COMPONENTS stage has exactly 20 quests.
  Testable: yes - example

1.9. WHEN displaying components, THE Circuit_Simulator SHALL use realistic visual representations
  Thoughts: "Realistic" is subjective and not computationally testable.
  Testable: no

1.10. THE System SHALL ensure all component descriptions are scientifically accurate and age-appropriate
  Thoughts: "Scientifically accurate" and "age-appropriate" are subjective judgments that require human review.
  Testable: no

### Requirement 2: Simple Circuit Construction

2.1. THE Circuit_Builder SHALL provide a drag-and-drop interface for placing components
  Thoughts: This is about the UI having certain functionality. We can test that components can be placed on the workspace.
  Testable: yes - example

2.2. WHEN a user drags a component, THE System SHALL allow placement anywhere on the circuit workspace
  Thoughts: This is a rule about all components and all positions. For any component and any valid position, placement should succeed.
  Testable: yes - property

2.3. WHEN a user connects two components, THE System SHALL create a wire connection between them
  Thoughts: This is a rule about all component pairs. For any two components, creating a connection should result in a wire between them.
  Testable: yes - property

2.4. WHEN a user creates a complete circuit, THE Circuit_Simulator SHALL show current flow animation
  Thoughts: This is a rule about all complete circuits. For any complete circuit, the simulation should show current flow.
  Testable: yes - property

2.5. WHEN a user creates an incomplete circuit, THE System SHALL indicate why current cannot flow
  Thoughts: This is a rule about all incomplete circuits. For any incomplete circuit, the system should provide feedback.
  Testable: yes - property

2.6. WHEN a user adds a switch, THE System SHALL allow toggling between open and closed states
  Thoughts: This is a rule about all switches. For any switch, toggling should change its state.
  Testable: yes - property

2.7. WHEN a switch is open, THE Circuit_Simulator SHALL stop current flow animation
  Thoughts: This is a rule about all circuits with open switches. For any circuit with an open switch, current flow should stop.
  Testable: yes - property

2.8. WHEN a switch is closed, THE Circuit_Simulator SHALL resume current flow animation
  Thoughts: This is a rule about all circuits with closed switches. For any complete circuit with a closed switch, current flow should resume.
  Testable: yes - property

2.9. THE System SHALL provide 20 CORE difficulty quests requiring circuit construction
  Thoughts: This is about the quest pool size. We can test that the CORE difficulty has exactly 20 quests.
  Testable: yes - example

2.10. WHEN a user builds a circuit, THE System SHALL verify correctness by checking component connections and circuit completeness
  Thoughts: This is a rule about all circuits. For any circuit, verification should check connections and completeness.
  Testable: yes - property

### Requirement 3: Current Flow Visualization

3.1. WHEN a complete circuit is created, THE Circuit_Simulator SHALL display animated current flow
  Thoughts: This is the same as 2.4, redundant.
  Testable: yes - property (redundant with 2.4)

3.2. THE Circuit_Simulator SHALL show current flowing from battery positive terminal through the circuit to negative terminal
  Thoughts: This is a rule about all circuits with batteries. For any complete circuit, current should flow from + to -.
  Testable: yes - property

3.3. WHEN current flows through a bulb, THE Circuit_Simulator SHALL show the bulb lighting up
  Thoughts: This is a rule about all bulbs with current. For any bulb with current flow, it should light up.
  Testable: yes - property

3.4. WHEN current flows through a wire, THE Circuit_Simulator SHALL show moving dots or arrows indicating electron flow
  Thoughts: This is a rule about all wires with current. For any wire with current flow, it should show animation.
  Testable: yes - property

3.5. WHEN a switch opens, THE Circuit_Simulator SHALL immediately stop current flow animation
  Thoughts: This is the same as 2.7, redundant.
  Testable: yes - property (redundant with 2.7)

3.6. THE Circuit_Simulator SHALL use consistent animation speed to represent current flow
  Thoughts: This is about animation consistency. We can test that animation speed is configurable and consistent.
  Testable: yes - example

3.7. WHEN multiple bulbs are in series, THE Circuit_Simulator SHALL show equal current through all bulbs
  Thoughts: This is a rule about all series circuits. For any series circuit with multiple bulbs, current should be equal through all.
  Testable: yes - property

3.8. WHEN multiple bulbs are in parallel, THE Circuit_Simulator SHALL show current splitting at junctions
  Thoughts: This is a rule about all parallel circuits. For any parallel circuit, current should split at junctions.
  Testable: yes - property

3.9. THE Circuit_Simulator SHALL use color coding: blue for wires with current, gray for wires without current
  Thoughts: This is a rule about all wires. For any wire, color should match current state.
  Testable: yes - property

3.10. THE System SHALL provide a speed control to adjust animation speed
  Thoughts: This is about the UI having a speed control. This is an example test.
  Testable: yes - example

### Requirement 4: Circuit Diagram Drawing

4.1. THE System SHALL provide standard electrical symbols for battery, bulb, switch, wire, and resistor
  Thoughts: This is about the system having certain symbols available. This is an example test.
  Testable: yes - example

4.2. WHEN a user draws a circuit diagram, THE System SHALL provide a symbol palette with all components
  Thoughts: This is about the UI having a symbol palette. This is an example test.
  Testable: yes - example

4.3. WHEN a user selects a symbol, THE System SHALL allow placement on a grid-based drawing area
  Thoughts: This is a rule about all symbols. For any symbol, placement on the grid should be allowed.
  Testable: yes - property

4.4. WHEN a user connects symbols, THE System SHALL draw straight lines representing wires
  Thoughts: This is a rule about all connections. For any two symbols, connecting them should draw straight lines.
  Testable: yes - property

4.5. THE System SHALL enforce correct symbol orientation
  Thoughts: This is a rule about all symbols. For any symbol with orientation requirements, the system should enforce correct orientation.
  Testable: yes - property

4.6. WHEN a user completes a diagram, THE System SHALL verify it matches the target circuit
  Thoughts: This is a rule about all diagrams. For any completed diagram, verification should compare to target.
  Testable: yes - property

4.7. THE System SHALL provide 15 ADVANCED difficulty quests requiring diagram drawing
  Thoughts: This is about the quest pool size. This is an example test.
  Testable: yes - example

4.8. WHEN displaying symbols, THE System SHALL use internationally recognized IEC standards
  Thoughts: This is about symbol correctness, which requires human verification of standards compliance.
  Testable: no

4.9. THE System SHALL allow users to compare their diagram with the correct solution
  Thoughts: This is about the UI having comparison functionality. This is an example test.
  Testable: yes - example

4.10. THE System SHALL provide feedback on incorrect symbol usage or connection errors
  Thoughts: This is a rule about all incorrect diagrams. For any diagram with errors, feedback should be provided.
  Testable: yes - property

### Requirement 5: Series and Parallel Circuits

5.1. WHEN a user builds a series circuit, THE System SHALL show all components connected in a single path
  Thoughts: This is a rule about all series circuits. For any series circuit, components should be in a single path.
  Testable: yes - property

5.2. WHEN a user builds a parallel circuit, THE System SHALL show components connected across multiple paths
  Thoughts: This is a rule about all parallel circuits. For any parallel circuit, components should be across multiple paths.
  Testable: yes - property

5.3. WHEN bulbs are in series, THE Circuit_Simulator SHALL show them dimmer than a single bulb
  Thoughts: This is a rule about all series bulb circuits. For any series circuit with multiple bulbs, brightness should be less than a single bulb circuit.
  Testable: yes - property

5.4. WHEN bulbs are in parallel, THE Circuit_Simulator SHALL show them at full brightness
  Thoughts: This is a rule about all parallel bulb circuits. For any parallel circuit with bulbs, each should be at full brightness.
  Testable: yes - property

5.5. WHEN one bulb fails in a series circuit, THE Circuit_Simulator SHALL show all bulbs going out
  Thoughts: This is a rule about all series circuits with failures. For any series circuit, one bulb failure should stop all current.
  Testable: yes - property

5.6. WHEN one bulb fails in a parallel circuit, THE Circuit_Simulator SHALL show other bulbs remaining lit
  Thoughts: This is a rule about all parallel circuits with failures. For any parallel circuit, one bulb failure should not affect others.
  Testable: yes - property

5.7. THE System SHALL provide 15 ADVANCED difficulty quests comparing series and parallel circuits
  Thoughts: This is about the quest pool size. This is an example test.
  Testable: yes - example

5.8. WHEN displaying circuit behavior, THE System SHALL explain why brightness differs between configurations
  Thoughts: This is about providing explanations, which is a UI feature. This is an example test.
  Testable: yes - example

5.9. THE System SHALL allow users to experiment by adding or removing components
  Thoughts: This is about the UI allowing modifications. This is an example test.
  Testable: yes - example

5.10. THE System SHALL provide real-world examples to illustrate concepts
  Thoughts: This is about content presence, which is an example test.
  Testable: yes - example

### Requirement 6: Circuit Troubleshooting

6.1. WHEN a user is presented with a faulty circuit, THE System SHALL display symptoms
  Thoughts: This is a rule about all faulty circuits. For any faulty circuit, symptoms should be displayed.
  Testable: yes - property

6.2. WHEN a user investigates, THE System SHALL allow testing different components
  Thoughts: This is about the UI allowing component testing. This is an example test.
  Testable: yes - example

6.3. WHEN a user identifies the fault, THE System SHALL verify the diagnosis
  Thoughts: This is a rule about all fault identifications. For any fault identification, verification should occur.
  Testable: yes - property

6.4. THE System SHALL include common faults: broken wire, dead battery, burned-out bulb, open switch
  Thoughts: This is about the system having certain fault types. This is an example test.
  Testable: yes - example

6.5. WHEN a user fixes the fault, THE Circuit_Simulator SHALL show the circuit working correctly
  Thoughts: This is a rule about all fault fixes. For any correct fault fix, the circuit should work.
  Testable: yes - property

6.6. THE System SHALL provide 15 ADVANCED difficulty quests involving circuit troubleshooting
  Thoughts: This is about the quest pool size. This is an example test.
  Testable: yes - example

6.7. WHEN displaying faults, THE System SHALL use realistic visual indicators
  Thoughts: "Realistic" is subjective and not computationally testable.
  Testable: no

6.8. THE System SHALL provide hints if users struggle to identify faults
  Thoughts: This is about the hint system functionality. This is an example test.
  Testable: yes - example

6.9. THE System SHALL explain why each fault prevents current flow
  Thoughts: This is about providing explanations, which is a UI feature. This is an example test.
  Testable: yes - example

6.10. THE System SHALL connect troubleshooting to real-world scenarios
  Thoughts: This is about content presence, which is an example test.
  Testable: yes - example

### Requirement 7: Complex Circuit Design

7.1. WHEN a user attempts ELITE difficulty, THE System SHALL present design challenges requiring multiple components
  Thoughts: This is a rule about all ELITE quests. For any ELITE quest, it should require multiple components.
  Testable: yes - property

7.2. THE System SHALL provide 5 ELITE difficulty quests involving complex circuit design
  Thoughts: This is about the quest pool size. This is an example test.
  Testable: yes - example

7.3. WHEN a user designs a circuit, THE System SHALL specify requirements
  Thoughts: This is a rule about all design quests. For any design quest, requirements should be specified.
  Testable: yes - property

7.4. WHEN a user submits a design, THE System SHALL verify it meets all functional requirements
  Thoughts: This is a rule about all design submissions. For any design, verification should check all requirements.
  Testable: yes - property

7.5. THE System SHALL allow multiple correct solutions for design challenges
  Thoughts: This is about the verification logic accepting multiple solutions. We can test that different valid circuits are accepted.
  Testable: yes - property

7.6. WHEN evaluating designs, THE System SHALL check for circuit completeness, correct connections, and functional requirements
  Thoughts: This is a rule about all design evaluations. For any design, these checks should occur.
  Testable: yes - property

7.7. THE System SHALL provide real-world design scenarios
  Thoughts: This is about content presence, which is an example test.
  Testable: yes - example

7.8. WHEN a design is correct, THE System SHALL allow users to test all functions interactively
  Thoughts: This is a rule about all correct designs. For any correct design, interactive testing should be available.
  Testable: yes - property

7.9. THE System SHALL provide optimization challenges
  Thoughts: This is about content presence, which is an example test.
  Testable: yes - example

7.10. THE System SHALL connect design challenges to Basel-specific applications
  Thoughts: This is about content presence, which is an example test.
  Testable: yes - example

### Requirement 8: Basel-Specific Scenarios

8.1-8.10: All criteria are about content presence and quality, which require human review.
  Testable: no

### Requirement 9: Three-Language Support

9.1. THE System SHALL support three languages: English (EN), Chinese (CN), and German (DE)
  Thoughts: This is about the system having three language options. This is an example test.
  Testable: yes - example

9.2. WHEN a user switches languages, THE System SHALL translate all UI text
  Thoughts: This is a rule about all UI text elements. For any UI text, translation should exist in all three languages.
  Testable: yes - property

9.3-9.5: Similar to 9.2, testing translation completeness.
  Testable: yes - property

9.6. THE System SHALL use international electrical symbols that don't require translation
  Thoughts: This is about symbol design, which is an example test.
  Testable: yes - example

9.7. WHEN displaying units, THE System SHALL use international symbols consistently
  Thoughts: This is a rule about all unit displays. For any unit, the symbol should be consistent.
  Testable: yes - property

9.8. THE System SHALL ensure all translations are complete and accurate
  Thoughts: This is a rule about all translation keys. For any key, translations should exist in all languages.
  Testable: yes - property

9.9. WHEN displaying technical terms, THE System SHALL provide consistent terminology across all languages
  Thoughts: This is about translation consistency, which can be tested by checking term mappings.
  Testable: yes - property

9.10. THE System SHALL render mathematical notation using LaTeX with four backslashes
  Thoughts: This is a rule about all LaTeX rendering. For any LaTeX string, it should use proper escaping.
  Testable: yes - property

### Requirement 10: Interactive Circuit Simulation

10.1. THE Circuit_Simulator SHALL update in real-time as users modify circuits
  Thoughts: This is a rule about all circuit modifications. For any modification, the simulation should update.
  Testable: yes - property

10.2. WHEN a user adds a component, THE Circuit_Simulator SHALL immediately incorporate it
  Thoughts: This is a rule about all component additions. For any component added, simulation should update.
  Testable: yes - property

10.3. WHEN a user removes a component, THE Circuit_Simulator SHALL immediately show the effect
  Thoughts: This is a rule about all component removals. For any component removed, simulation should update.
  Testable: yes - property

10.4. WHEN a user toggles a switch, THE Circuit_Simulator SHALL respond within 100 milliseconds
  Thoughts: This is a performance requirement. We can test response time.
  Testable: yes - property

10.5. THE Circuit_Simulator SHALL allow users to measure voltage across components
  Thoughts: This is about the UI having measurement functionality. This is an example test.
  Testable: yes - example

10.6. THE Circuit_Simulator SHALL allow users to measure current through components
  Thoughts: This is about the UI having measurement functionality. This is an example test.
  Testable: yes - example

10.7. WHEN users make measurements, THE System SHALL display values with appropriate units and precision
  Thoughts: This is a rule about all measurements. For any measurement, units and precision should be appropriate.
  Testable: yes - property

10.8. THE Circuit_Simulator SHALL prevent physically impossible configurations
  Thoughts: This is a rule about all circuit configurations. For any invalid configuration, it should be prevented.
  Testable: yes - property

10.9. WHEN users attempt invalid configurations, THE System SHALL provide educational feedback
  Thoughts: This is a rule about all invalid attempts. For any invalid configuration, feedback should be provided.
  Testable: yes - property

10.10. THE Circuit_Simulator SHALL save circuit state so users can return to their work
  Thoughts: This is about persistence functionality. This is an example test.
  Testable: yes - example

### Requirement 11: Difficulty Progression

11.1-11.10: These are about quest pool structure and content organization.
  Testable: yes - example (for quest counts and structure)

### Requirement 12: Answer Verification and Feedback

12.1. WHEN a user clicks "Verify", THE System SHALL check the circuit against the expected solution
  Thoughts: This is a rule about all verifications. For any circuit, verification should compare to expected solution.
  Testable: yes - property

12.2. WHEN circuits match, THE System SHALL display a success message
  Thoughts: This is a rule about all correct circuits. For any matching circuit, success message should display.
  Testable: yes - property

12.3. WHEN circuits don't match, THE System SHALL display specific feedback
  Thoughts: This is a rule about all incorrect circuits. For any non-matching circuit, feedback should display.
  Testable: yes - property

12.4-12.10: These are about UI behavior and state management.
  Testable: yes - property

### Requirement 13: Quest Data Structure

13.1-13.10: These are about data structure and validation.
  Testable: yes - property (for data structure validation)

### Requirement 14: Responsive Layout

14.1-14.10: These are about UI layout and responsiveness.
  Testable: yes - example (for specific breakpoints and measurements)

### Requirement 15: Stage Navigation

15.1-15.10: These are about navigation functionality and state management.
  Testable: yes - property

### Requirement 16: Error Handling and Safety

16.1. WHEN a user attempts to create a short circuit, THE System SHALL prevent it and explain why
  Thoughts: This is a rule about all short circuit attempts. For any short circuit configuration, it should be prevented.
  Testable: yes - property

16.2-16.10: These are about error handling and safety features.
  Testable: yes - property (for error prevention and handling)

### Requirement 17: Accessibility and Inclusivity

17.1-17.10: These are about accessibility features, which require manual testing with assistive technologies.
  Testable: no (requires manual accessibility testing)

### Requirement 18: Performance and Optimization

18.1-18.10: These are performance requirements with specific metrics.
  Testable: yes - property (for performance thresholds)

### Requirement 19: Progress Tracking and Persistence

19.1-19.10: These are about data persistence and progress tracking.
  Testable: yes - property

### Requirement 20: Educational Scaffolding

20.1-20.10: These are about educational features and content.
  Testable: yes - example (for feature presence)

## Property Reflection

After reviewing all the prework analysis, I've identified the following redundancies and consolidation opportunities:

**Redundant Properties:**
- 3.1 is redundant with 2.4 (both test complete circuit showing current flow)
- 3.5 is redundant with 2.7 (both test open switch stopping current)

**Properties that can be combined:**
- 2.4 and 3.2 can be combined into one property: "Complete circuit current flow direction"
- 3.3, 3.4, and 3.9 can be combined into one property: "Component visualization during current flow"
- 5.3 and 5.4 can be combined into one property: "Bulb brightness in series vs parallel"
- 5.5 and 5.6 can be combined into one property: "Fault isolation in series vs parallel"
- 10.2 and 10.3 can be combined into one property: "Real-time simulation update on circuit modification"

**Properties to keep separate:**
- Circuit verification properties (different stages require different verification logic)
- Translation properties (different aspects of translation need separate testing)
- Performance properties (different operations have different performance requirements)


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Component Information Display

*For any* component type (battery, bulb, switch, wire, resistor), when a user selects that component, the system should display its name, symbol, and function in the current language.

**Validates: Requirements 1.2**

### Property 2: Component Placement

*For any* component and any valid position on the circuit workspace, placing the component at that position should result in the component being present at that position in the circuit state.

**Validates: Requirements 2.2**

### Property 3: Connection Creation

*For any* two components with available terminals, creating a connection between them should result in a wire connection existing in the circuit state between those specific terminals.

**Validates: Requirements 2.3**

### Property 4: Complete Circuit Current Flow

*For any* complete circuit (closed loop from battery positive to negative with all switches closed), the circuit simulator should show current flowing from the positive terminal through the circuit to the negative terminal.

**Validates: Requirements 2.4, 3.1, 3.2**

### Property 5: Incomplete Circuit Feedback

*For any* incomplete circuit (open loop or open switch), the circuit simulator should indicate that current cannot flow and provide feedback explaining why.

**Validates: Requirements 2.5**

### Property 6: Switch State Toggle

*For any* switch in a circuit, toggling the switch should change its state from open to closed or from closed to open.

**Validates: Requirements 2.6**

### Property 7: Switch Control of Current Flow

*For any* circuit with a switch, when the switch is open, current flow should stop; when the switch is closed (and circuit is otherwise complete), current flow should resume.

**Validates: Requirements 2.7, 2.8, 3.5**

### Property 8: Component Visualization During Current Flow

*For any* component in a circuit with current flow, the component should be visualized appropriately: bulbs should light up, wires should show moving dots/arrows and be colored blue, and components without current should be colored gray.

**Validates: Requirements 3.3, 3.4, 3.9**

### Property 9: Series Circuit Current Equality

*For any* series circuit with multiple bulbs, the current through each bulb should be equal.

**Validates: Requirements 3.7**

### Property 10: Parallel Circuit Current Splitting

*For any* parallel circuit with multiple branches, the current should split at junctions, with the sum of branch currents equal to the total current.

**Validates: Requirements 3.8**

### Property 11: Symbol Placement on Grid

*For any* electrical symbol and any valid grid position, placing the symbol at that grid position should result in the symbol being present at that position in the diagram state.

**Validates: Requirements 4.3**

### Property 12: Diagram Connection Drawing

*For any* two symbols on the grid, connecting them should result in straight lines (horizontal and/or vertical) being drawn between them representing wires.

**Validates: Requirements 4.4**

### Property 13: Symbol Orientation Enforcement

*For any* symbol with orientation requirements (battery, switch), the system should enforce correct orientation when the symbol is placed or rotated.

**Validates: Requirements 4.5**

### Property 14: Diagram Verification

*For any* completed circuit diagram, verification should compare the diagram's topology (components and connections) to the target circuit and return success if they match.

**Validates: Requirements 4.6**

### Property 15: Diagram Error Feedback

*For any* incorrect circuit diagram, the system should provide specific feedback identifying incorrect symbol usage or connection errors.

**Validates: Requirements 4.10**

### Property 16: Series Circuit Topology

*For any* series circuit, all components should be connected in a single path with no branches.

**Validates: Requirements 5.1**

### Property 17: Parallel Circuit Topology

*For any* parallel circuit, components should be connected across multiple paths with at least one junction where current splits.

**Validates: Requirements 5.2**

### Property 18: Bulb Brightness in Series vs Parallel

*For any* circuit with N bulbs, if the bulbs are in series, each bulb's brightness should be less than a single bulb circuit; if the bulbs are in parallel, each bulb's brightness should equal a single bulb circuit.

**Validates: Requirements 5.3, 5.4**

### Property 19: Fault Isolation in Series vs Parallel

*For any* circuit with multiple bulbs, if one bulb fails in a series circuit, all bulbs should go out; if one bulb fails in a parallel circuit, the other bulbs should remain lit.

**Validates: Requirements 5.5, 5.6**

### Property 20: Faulty Circuit Symptom Display

*For any* faulty circuit presented to the user, the system should display observable symptoms (bulb not lighting, dim bulb, no current flow).

**Validates: Requirements 6.1**

### Property 21: Fault Diagnosis Verification

*For any* fault identification attempt, the system should verify whether the identified fault matches the actual fault in the circuit.

**Validates: Requirements 6.3**

### Property 22: Fault Correction

*For any* faulty circuit, when the user correctly fixes the fault, the circuit simulator should show the circuit working correctly with proper current flow.

**Validates: Requirements 6.5**

### Property 23: Design Quest Requirements

*For any* ELITE difficulty design quest, the quest should specify multiple functional requirements that the circuit must satisfy.

**Validates: Requirements 7.1, 7.3**

### Property 24: Design Verification

*For any* circuit design submission, the system should verify that the circuit meets all specified functional requirements (component types, switch control, bulb behavior).

**Validates: Requirements 7.4, 7.6**

### Property 25: Multiple Solution Acceptance

*For any* design quest with multiple valid solutions, the verification system should accept any circuit that meets all functional requirements, regardless of the specific topology.

**Validates: Requirements 7.5**

### Property 26: Design Interactive Testing

*For any* correct circuit design, the system should allow the user to interactively test all functions (toggle switches, observe bulb states) to verify the design works as intended.

**Validates: Requirements 7.8**

### Property 27: Translation Completeness

*For any* UI text element (title, button, instruction, component name, scenario description), translations should exist for all three languages (EN, CN, DE).

**Validates: Requirements 9.2, 9.3, 9.4, 9.5, 9.8**

### Property 28: Unit Symbol Consistency

*For any* unit displayed in the system (Volts, Amperes, Ohms), the international symbol (V, A, Ω) should be used consistently across all languages.

**Validates: Requirements 9.7**

### Property 29: Technical Term Consistency

*For any* technical term used in the system, the translation should be consistent across all occurrences in each language.

**Validates: Requirements 9.9**

### Property 30: LaTeX Rendering

*For any* mathematical notation or formula displayed in the system, it should be rendered using LaTeX with proper escaping (four backslashes for special characters).

**Validates: Requirements 9.10**

### Property 31: Real-time Simulation Update

*For any* circuit modification (adding component, removing component, toggling switch), the circuit simulator should update the simulation state immediately to reflect the change.

**Validates: Requirements 10.1, 10.2, 10.3**

### Property 32: Switch Response Time

*For any* switch toggle action, the circuit simulator should respond and update the visualization within 100 milliseconds.

**Validates: Requirements 10.4**

### Property 33: Measurement Display

*For any* voltage or current measurement, the system should display the value with appropriate units (V or A) and precision (2 decimal places).

**Validates: Requirements 10.7**

### Property 34: Invalid Configuration Prevention

*For any* physically impossible configuration (short circuit, reversed battery causing damage), the system should prevent the configuration and provide educational feedback explaining why it's invalid.

**Validates: Requirements 10.8, 10.9, 16.1**

### Property 35: Circuit Verification

*For any* circuit built by the user, when verification is triggered, the system should compare the circuit's topology and component configuration to the expected solution and return success if they match within acceptable tolerances.

**Validates: Requirements 2.10, 12.1**

### Property 36: Verification Feedback

*For any* verification result, the system should display appropriate feedback: success message in green for correct circuits, specific error feedback for incorrect circuits.

**Validates: Requirements 12.2, 12.3**

### Property 37: Quest Navigation

*For any* successful verification, the "Next" button should be enabled; clicking "Next" should load the next quest in the current difficulty and stage.

**Validates: Requirements 12.4, 12.5**

### Property 38: Quest Pool Size

*For any* combination of difficulty and stage, the generated quest pool should contain the correct number of quests: BASIC (20), CORE (20), ADVANCED (15), ELITE (5).

**Validates: Requirements 1.8, 2.9, 4.7, 5.7, 6.6, 7.2, 11.1, 11.2, 11.3, 11.4, 11.10**

### Property 39: Quest Data Completeness

*For any* quest in the system, the quest data should include all required fields: id, difficulty, stage, type, promptLatex, and stage-specific data (targetComponent, targetCircuit, or targetDiagram).

**Validates: Requirements 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7, 13.8, 13.9**

### Property 40: Stage Quest Loading

*For any* stage selection, the system should load the appropriate quest pool for that stage and reset to the first quest.

**Validates: Requirements 15.2, 15.3**

### Property 41: Stage Progress Tracking

*For any* stage, the system should track and display progress (number of completed quests out of total quests).

**Validates: Requirements 15.8**

### Property 42: Short Circuit Prevention

*For any* attempt to connect battery terminals directly without any resistance, the system should prevent the connection and display a safety warning explaining the danger.

**Validates: Requirements 16.1, 16.2**

### Property 43: Error Message Display

*For any* application error or invalid user action, the system should display a user-friendly error message without exposing technical details.

**Validates: Requirements 16.8, 16.9**

### Property 44: Performance - Quest Transition

*For any* quest transition (clicking "Next"), the system should load and display the next quest within 500 milliseconds.

**Validates: Requirements 18.2**

### Property 45: Performance - Circuit Simulation

*For any* circuit simulation, the animation should maintain at least 30 frames per second for smooth visualization.

**Validates: Requirements 18.3**

### Property 46: Performance - User Input Response

*For any* user interaction (drag, click, toggle), the system should respond within 100 milliseconds.

**Validates: Requirements 18.7**

### Property 47: Progress Persistence

*For any* quest completion, the system should immediately save the completion status to browser local storage.

**Validates: Requirements 19.1, 19.2, 19.3, 19.4**

### Property 48: Circuit State Persistence

*For any* partially completed circuit, the system should save the circuit state so users can return to their work in a later session.

**Validates: Requirements 19.5, 10.10**


## Error Handling

### Input Validation

**Invalid Component Placement**:
- User attempts to place component outside workspace bounds
- System: Prevent placement, snap to nearest valid position
- Visual feedback: Component returns to palette if dropped outside

**Invalid Connection**:
- User attempts to connect incompatible terminals (e.g., two positive terminals)
- System: Prevent connection, display error message
- Visual feedback: Connection line turns red and disappears

**Overlapping Components**:
- User attempts to place component on top of existing component
- System: Prevent placement or auto-adjust position to nearest free space
- Visual feedback: Highlight collision area in red

**Empty Circuit Verification**:
- User clicks "Verify" with no components placed
- System: Display message "Please build a circuit first"
- No crash or exception

### Circuit Simulation Errors

**Short Circuit Detection**:
- User creates direct battery terminal connection
- System: Prevent connection, display safety warning
- Message: "Short circuit detected! This would damage the battery and is dangerous."

**Open Circuit**:
- User builds circuit with gaps or open switches
- System: Simulation shows no current flow
- Feedback: "Circuit is incomplete. Current cannot flow."

**Invalid Component Configuration**:
- User places battery backwards or multiple batteries in conflict
- System: Display warning about configuration
- Simulation: Show expected vs actual behavior

**Missing Battery**:
- User builds circuit without power source
- System: Display message "Circuit needs a battery to provide power"
- Simulation: No current flow

### Diagram Drawing Errors

**Invalid Symbol Placement**:
- User attempts to place symbol off-grid
- System: Snap to nearest grid intersection
- Visual feedback: Symbol highlights valid grid positions

**Incomplete Diagram**:
- User submits diagram with unconnected symbols
- System: Highlight unconnected terminals in red
- Feedback: "All components must be connected"

**Wrong Symbol Orientation**:
- User places battery with reversed polarity
- System: Display warning or auto-correct orientation
- Feedback: "Battery polarity should match the target circuit"

**Connection Overlap**:
- User draws wire that overlaps with symbol
- System: Auto-route wire around symbol or prevent overlap
- Visual feedback: Show valid connection paths

### Quest Loading Errors

**Missing Quest Data**:
- Quest pool generation fails or returns empty array
- System: Display loading state with message "Loading quests..."
- Fallback: Load default quest set
- Log error to console for debugging

**Invalid Quest Structure**:
- Quest object missing required fields
- System: Skip invalid quest, load next valid quest
- Display warning: "Some quests could not be loaded"
- Log warning to console

**Quest Pool Exhausted**:
- User completes all quests in current difficulty/stage
- System: Display completion message
- Offer: "Try another difficulty level or stage"

### Simulation Errors

**Animation Failure**:
- Current flow animation fails to render
- System: Display static visualization without animation
- Functionality remains intact (verification still works)

**Performance Degradation**:
- Complex circuit causes slow simulation
- System: Reduce animation quality or frame rate
- Display warning: "Complex circuit may affect performance"

**State Synchronization Error**:
- Circuit state and simulation state become desynchronized
- System: Force re-simulation from current circuit state
- Log warning to console

### Translation Errors

**Missing Translation Key**:
- Requested translation key doesn't exist in i18n
- System: Display English fallback text
- Log warning to console with missing key

**Language Switch Failure**:
- Language change doesn't update UI
- System: Force re-render of components
- Persist language preference in localStorage

**LaTeX Rendering Error**:
- Invalid LaTeX syntax causes rendering failure
- System: Display plain text fallback
- Log error to console with problematic LaTeX string

### Storage Errors

**LocalStorage Full**:
- Cannot save progress due to storage quota exceeded
- System: Display warning "Unable to save progress"
- Offer: "Clear old data or use browser's private mode"

**LocalStorage Unavailable**:
- Browser blocks localStorage access (private mode, security settings)
- System: Use in-memory storage for session
- Display notice: "Progress will not be saved across sessions"

**Corrupted Save Data**:
- Saved circuit state is invalid or corrupted
- System: Discard corrupted data, start fresh
- Display message: "Previous session data was corrupted and has been reset"

### Safety Warnings

**High Voltage Warning**:
- User builds circuit with multiple batteries in series (ADVANCED/ELITE)
- System: Display educational warning about voltage
- Message: "Multiple batteries in series increase voltage. Handle with care!"

**Overload Warning**:
- User builds circuit that would overload components
- System: Display warning about component ratings
- Message: "This configuration exceeds component ratings and could cause damage"

**Polarity Warning**:
- User reverses battery polarity
- System: Display warning about consequences
- Message: "Reversed polarity can damage electronic components"

## Testing Strategy

### Unit Testing

**Component Tests**:
- Test each component type (Battery, Bulb, Switch, Wire, Resistor) renders correctly
- Test component properties (voltage, resistance, state) are set correctly
- Test component terminal identification
- Test component visual representation matches specifications

**Circuit Builder Tests**:
- Test component placement on workspace
- Test connection creation between components
- Test connection removal
- Test component removal
- Test drag-and-drop functionality
- Test snap-to-grid positioning

**Circuit Simulator Tests**:
- Test complete circuit detection
- Test current flow calculation
- Test series circuit current equality
- Test parallel circuit current splitting
- Test bulb brightness calculation
- Test switch state effect on current flow
- Test short circuit detection
- Test open circuit detection

**Diagram Drawer Tests**:
- Test symbol placement on grid
- Test connection drawing (straight lines)
- Test symbol orientation enforcement
- Test diagram verification against target
- Test diagram error detection

**Quest Generation Tests**:
- Test `buildStagePool` function for each stage and difficulty
- Verify quest pool contains correct number of quests
- Verify quest objects have all required fields
- Verify quest data is valid and complete

**Verification Tests**:
- Test circuit topology comparison
- Test component type matching
- Test connection matching
- Test tolerance for equivalent circuits (different layouts, same topology)
- Test feedback generation for incorrect circuits

**Translation Tests**:
- Test all translation keys exist for EN, CN, DE
- Test language switching updates UI text
- Test component names translate correctly
- Test LaTeX formulas render correctly in all languages
- Test technical term consistency

**Storage Tests**:
- Test progress saving to localStorage
- Test progress loading from localStorage
- Test circuit state persistence
- Test handling of corrupted data
- Test handling of storage quota exceeded

### Property-Based Testing

**Configuration**: Use fast-check library for TypeScript, minimum 100 iterations per test

**Property Test 1: Component Placement Idempotence**
```typescript
// Feature: sp2-01-circuit-basics, Property 2: Component placement
fc.assert(
  fc.property(
    fc.constantFrom("BATTERY", "BULB", "SWITCH", "WIRE", "RESISTOR"),
    fc.record({ x: fc.integer({ min: 0, max: 800 }), y: fc.integer({ min: 0, max: 600 }) }),
    (componentType, position) => {
      const circuit = new CircuitState();
      const componentId = circuit.placeComponent(componentType, position);
      const component = circuit.getComponent(componentId);
      return component !== null && 
             component.type === componentType &&
             Math.abs(component.position.x - position.x) < 50 &&  // Snap tolerance
             Math.abs(component.position.y - position.y) < 50;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 2: Connection Symmetry**
```typescript
// Feature: sp2-01-circuit-basics, Property 3: Connection creation
fc.assert(
  fc.property(
    fc.string(),  // component1 ID
    fc.string(),  // component2 ID
    (comp1Id, comp2Id) => {
      if (comp1Id === comp2Id) return true;  // Skip self-connection
      const circuit = new CircuitState();
      circuit.addComponent({ id: comp1Id, type: "BULB", position: { x: 100, y: 100 } });
      circuit.addComponent({ id: comp2Id, type: "BULB", position: { x: 200, y: 100 } });
      circuit.createConnection(comp1Id, comp2Id);
      const hasConnection = circuit.hasConnection(comp1Id, comp2Id);
      return hasConnection === true;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 3: Complete Circuit Current Flow**
```typescript
// Feature: sp2-01-circuit-basics, Property 4: Complete circuit current flow
fc.assert(
  fc.property(
    fc.integer({ min: 1, max: 5 }),  // number of bulbs
    fc.constantFrom("SERIES", "PARALLEL"),
    (numBulbs, circuitType) => {
      const circuit = buildTestCircuit(numBulbs, circuitType);
      const simulation = simulateCircuit(circuit);
      return simulation.isComplete && simulation.current > 0;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 4: Switch Control**
```typescript
// Feature: sp2-01-circuit-basics, Property 7: Switch control of current flow
fc.assert(
  fc.property(
    fc.boolean(),  // switch state (true = closed, false = open)
    (switchClosed) => {
      const circuit = buildCircuitWithSwitch(switchClosed);
      const simulation = simulateCircuit(circuit);
      if (switchClosed) {
        return simulation.current > 0;
      } else {
        return simulation.current === 0;
      }
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 5: Series Circuit Current Equality**
```typescript
// Feature: sp2-01-circuit-basics, Property 9: Series circuit current equality
fc.assert(
  fc.property(
    fc.integer({ min: 2, max: 5 }),  // number of bulbs in series
    (numBulbs) => {
      const circuit = buildSeriesCircuit(numBulbs);
      const simulation = simulateCircuit(circuit);
      const currents = simulation.componentStates.values()
        .filter(state => state.componentType === "BULB")
        .map(state => state.current);
      
      // All currents should be equal (within tolerance)
      const firstCurrent = currents[0];
      return currents.every(current => Math.abs(current - firstCurrent) < 0.01);
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 6: Parallel Circuit Current Splitting**
```typescript
// Feature: sp2-01-circuit-basics, Property 10: Parallel circuit current splitting
fc.assert(
  fc.property(
    fc.integer({ min: 2, max: 4 }),  // number of parallel branches
    (numBranches) => {
      const circuit = buildParallelCircuit(numBranches);
      const simulation = simulateCircuit(circuit);
      
      // Sum of branch currents should equal total current
      const branchCurrents = getBranchCurrents(simulation);
      const totalCurrent = simulation.current;
      const sumBranchCurrents = branchCurrents.reduce((a, b) => a + b, 0);
      
      return Math.abs(sumBranchCurrents - totalCurrent) < 0.01;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 7: Bulb Brightness Monotonicity**
```typescript
// Feature: sp2-01-circuit-basics, Property 18: Bulb brightness in series vs parallel
fc.assert(
  fc.property(
    fc.integer({ min: 2, max: 5 }),  // number of bulbs
    (numBulbs) => {
      const seriesCircuit = buildSeriesCircuit(numBulbs);
      const parallelCircuit = buildParallelCircuit(numBulbs);
      const singleBulbCircuit = buildSeriesCircuit(1);
      
      const seriesSim = simulateCircuit(seriesCircuit);
      const parallelSim = simulateCircuit(parallelCircuit);
      const singleSim = simulateCircuit(singleBulbCircuit);
      
      const seriesBrightness = getAverageBulbBrightness(seriesSim);
      const parallelBrightness = getAverageBulbBrightness(parallelSim);
      const singleBrightness = getAverageBulbBrightness(singleSim);
      
      // Series bulbs should be dimmer than single bulb
      // Parallel bulbs should be same brightness as single bulb
      return seriesBrightness < singleBrightness &&
             Math.abs(parallelBrightness - singleBrightness) < 5;  // 5% tolerance
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 8: Fault Isolation**
```typescript
// Feature: sp2-01-circuit-basics, Property 19: Fault isolation in series vs parallel
fc.assert(
  fc.property(
    fc.integer({ min: 3, max: 5 }),  // number of bulbs
    fc.integer({ min: 0, max: 4 }),  // which bulb fails (index)
    (numBulbs, failedBulbIndex) => {
      if (failedBulbIndex >= numBulbs) return true;  // Skip invalid index
      
      const seriesCircuit = buildSeriesCircuit(numBulbs);
      const parallelCircuit = buildParallelCircuit(numBulbs);
      
      // Fail one bulb
      failBulb(seriesCircuit, failedBulbIndex);
      failBulb(parallelCircuit, failedBulbIndex);
      
      const seriesSim = simulateCircuit(seriesCircuit);
      const parallelSim = simulateCircuit(parallelCircuit);
      
      // In series: all bulbs should be off
      const seriesAllOff = getAllBulbStates(seriesSim).every(state => state.brightness === 0);
      
      // In parallel: other bulbs should still be lit
      const parallelOthersLit = getAllBulbStates(parallelSim)
        .filter((state, index) => index !== failedBulbIndex)
        .every(state => state.brightness > 0);
      
      return seriesAllOff && parallelOthersLit;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 9: Diagram Topology Preservation**
```typescript
// Feature: sp2-01-circuit-basics, Property 14: Diagram verification
fc.assert(
  fc.property(
    fc.integer({ min: 2, max: 5 }),  // number of components
    (numComponents) => {
      const circuit = buildRandomCircuit(numComponents);
      const diagram = circuitToDiagram(circuit);
      const reconstructedCircuit = diagramToCircuit(diagram);
      
      // Topology should be preserved
      return circuitsAreTopologicallyEquivalent(circuit, reconstructedCircuit);
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 10: Translation Completeness**
```typescript
// Feature: sp2-01-circuit-basics, Property 27: Translation completeness
fc.assert(
  fc.property(
    fc.constantFrom("EN", "CN", "DE"),
    fc.constantFrom(
      "title", "check", "next", "correct", "incorrect",
      "battery", "bulb", "switch", "wire", "resistor",
      "components", "circuits", "diagrams"
    ),
    (language, key) => {
      const translations = getTranslations(language);
      return translations.sp2_01[key] !== undefined && translations.sp2_01[key].length > 0;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 11: Real-time Simulation Update**
```typescript
// Feature: sp2-01-circuit-basics, Property 31: Real-time simulation update
fc.assert(
  fc.property(
    fc.constantFrom("ADD_COMPONENT", "REMOVE_COMPONENT", "TOGGLE_SWITCH"),
    (modificationType) => {
      const circuit = buildTestCircuit(3, "SERIES");
      const initialSim = simulateCircuit(circuit);
      
      // Perform modification
      if (modificationType === "ADD_COMPONENT") {
        circuit.placeComponent("BULB", { x: 300, y: 300 });
      } else if (modificationType === "REMOVE_COMPONENT") {
        const components = circuit.getAllComponents();
        if (components.length > 0) circuit.removeComponent(components[0].id);
      } else if (modificationType === "TOGGLE_SWITCH") {
        const switches = circuit.getComponentsByType("SWITCH");
        if (switches.length > 0) circuit.toggleSwitch(switches[0].id);
      }
      
      const updatedSim = simulateCircuit(circuit);
      
      // Simulation should reflect the change
      return !simulationStatesEqual(initialSim, updatedSim);
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 12: Quest Pool Size Consistency**
```typescript
// Feature: sp2-01-circuit-basics, Property 38: Quest pool size
fc.assert(
  fc.property(
    fc.constantFrom("BASIC", "CORE", "ADVANCED", "ELITE"),
    fc.constantFrom("COMPONENTS", "CIRCUITS", "DIAGRAMS"),
    (difficulty, stage) => {
      const pool = buildStagePool(mockTranslations, difficulty, stage);
      const expectedSize = {
        "BASIC": 20,
        "CORE": 20,
        "ADVANCED": 15,
        "ELITE": 5
      }[difficulty];
      return pool.length === expectedSize;
    }
  ),
  { numRuns: 100 }
);
```

### Integration Testing

**End-to-End Quest Flow**:
1. Load module → Verify initial quest displays (BASIC, COMPONENTS stage)
2. Select battery component → Verify component info displays
3. Build simple circuit → Verify simulation shows current flow
4. Click "Verify" → Verify success feedback
5. Click "Next" → Verify next quest loads
6. Complete all 20 BASIC quests → Verify stage completion
7. Change to CORE difficulty → Verify new quest pool loads
8. Build series circuit → Verify bulbs are dimmer
9. Build parallel circuit → Verify bulbs are bright
10. Change to DIAGRAMS stage → Verify diagram drawer displays
11. Draw circuit diagram → Verify diagram verification works
12. Change language to Chinese → Verify all text updates
13. Change language to German → Verify all text updates

**Circuit Building Flow**:
1. Drag battery to workspace → Verify placement
2. Drag bulb to workspace → Verify placement
3. Connect battery positive to bulb → Verify connection created
4. Connect bulb to battery negative → Verify circuit complete
5. Verify simulation shows current flow and bulb lights up
6. Add switch to circuit → Verify switch added
7. Toggle switch open → Verify current stops
8. Toggle switch closed → Verify current resumes
9. Remove bulb → Verify circuit incomplete
10. Add bulb back → Verify circuit complete again

**Diagram Drawing Flow**:
1. Select battery symbol → Verify symbol selected
2. Place battery on grid → Verify placement at grid intersection
3. Select bulb symbol → Verify symbol selected
4. Place bulb on grid → Verify placement
5. Draw connection from battery to bulb → Verify straight line drawn
6. Complete diagram → Click "Verify" → Verify topology comparison
7. Incorrect diagram → Verify error feedback
8. Correct diagram → Verify success feedback

**Troubleshooting Flow**:
1. Load faulty circuit quest → Verify symptoms displayed
2. Inspect components → Verify testing functionality
3. Identify broken wire → Click on wire → Verify diagnosis
4. Replace wire → Verify circuit works
5. Load burned bulb quest → Identify bulb → Replace bulb → Verify success

**Language Switching Flow**:
1. Load module in English → Verify all text is English
2. Build circuit → Verify component names in English
3. Switch to Chinese → Verify all text updates to Chinese
4. Verify component names in Chinese
5. Switch to German → Verify all text updates to German
6. Verify LaTeX formulas remain consistent
7. Verify electrical symbols don't change

### Browser Testing

**Supported Browsers**:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

**Test Checklist**:
- [ ] Module loads without errors
- [ ] All quests display correctly
- [ ] Component drag-and-drop works
- [ ] Circuit simulation animates smoothly
- [ ] Switch toggling works
- [ ] Diagram drawing works
- [ ] Verify button triggers validation
- [ ] Next button advances to next quest
- [ ] Language switching works
- [ ] LaTeX formulas render correctly
- [ ] Responsive layout works on mobile/tablet
- [ ] Touch interactions work on tablets
- [ ] No console errors or warnings
- [ ] LocalStorage persistence works
- [ ] Performance meets requirements (30 FPS, <100ms response)

### Accessibility Testing

**Screen Reader Testing**:
- Test with NVDA (Windows) and VoiceOver (macOS)
- Verify all components have proper ARIA labels
- Verify circuit state is announced
- Verify verification feedback is announced

**Keyboard Navigation Testing**:
- Tab through all interactive elements
- Use arrow keys to navigate component palette
- Use Enter/Space to select and place components
- Use Delete to remove components
- Verify focus indicators are visible

**Color Contrast Testing**:
- Test all text meets WCAG AA standards (4.5:1 for normal text)
- Test component colors are distinguishable
- Test current flow animation is visible
- Test without relying solely on color (use labels and patterns)

**Motion Sensitivity Testing**:
- Test with reduced motion preference enabled
- Verify animations can be disabled
- Verify core functionality works without animations

