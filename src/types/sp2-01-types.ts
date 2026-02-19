// SP2.01 Circuit Basics - Core Type Definitions

import { Quest } from "@/hooks/useQuestManager";

// Component Types
export type ComponentType = "BATTERY" | "BULB" | "SWITCH" | "WIRE" | "RESISTOR";

// Stage Types
export type Stage = "COMPONENTS" | "CIRCUITS" | "DIAGRAMS";

// Quest Type
export type QuestType = "IDENTIFY" | "BUILD" | "DRAW" | "TROUBLESHOOT" | "DESIGN";

// Fault Types
export type FaultType = "BROKEN_WIRE" | "DEAD_BATTERY" | "BURNED_BULB" | "OPEN_SWITCH";

// Circuit Type
export type CircuitType = "SERIES" | "PARALLEL" | "MIXED";

// Terminal Types
export type TerminalType = "POSITIVE" | "NEGATIVE" | "TERMINAL_A" | "TERMINAL_B";

// Position
export interface Position {
  x: number;
  y: number;
}

// Grid Position
export interface GridPosition {
  row: number;
  col: number;
}

// Component
export interface Component {
  id: string;
  type: ComponentType;
  position: Position;
  properties?: {
    voltage?: number;      // for batteries
    resistance?: number;   // for bulbs, resistors
    state?: "OPEN" | "CLOSED";  // for switches
  };
}

// Connection
export interface Connection {
  from: string;  // component ID
  to: string;    // component ID
  fromTerminal: TerminalType;
  toTerminal: TerminalType;
}

// Circuit Configuration
export interface CircuitConfiguration {
  components: Component[];
  connections: Connection[];
}

// Diagram Symbol
export interface DiagramSymbol {
  id: string;
  type: ComponentType;
  gridPosition: GridPosition;
  orientation: "HORIZONTAL" | "VERTICAL";
}

// Diagram Connection
export interface DiagramConnection {
  from: GridPosition;
  to: GridPosition;
  path: GridPosition[];  // for multi-segment wires
}

// Diagram Configuration
export interface DiagramConfiguration {
  symbols: DiagramSymbol[];
  connections: DiagramConnection[];
}

// Component State
export interface ComponentState {
  hasCurrentFlow: boolean;
  brightness?: number;  // 0-100 for bulbs
  isActive: boolean;
}

// Simulation State
export interface SimulationState {
  isComplete: boolean;
  current: number;  // in Amperes
  componentStates: Map<string, ComponentState>;
  currentPath: string[];  // ordered list of component IDs in current path
}

// Circuit State
export interface CircuitState {
  components: Component[];
  connections: Connection[];
}

// Diagram State
export interface DiagramState {
  symbols: DiagramSymbol[];
  connections: DiagramConnection[];
}

// SP201 Quest
export interface SP201Quest extends Quest {
  stage: Stage;
  type: QuestType;
  
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
  circuitType?: CircuitType;
  
  // For DRAW quests (DIAGRAMS stage)
  targetDiagram?: DiagramConfiguration;
  
  // For TROUBLESHOOT quests
  faultyCircuit?: CircuitConfiguration;
  fault?: FaultType;
  
  // For DESIGN quests
  designRequirements?: string[];
  acceptableSolutions?: CircuitConfiguration[];
  
  promptLatex: string;
  baselContext?: string;
  hints?: string[];
}
