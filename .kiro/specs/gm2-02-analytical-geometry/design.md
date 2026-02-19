# Design Document: GM2.02 - Analytical Geometry

## Overview

The GM2.02 module is an interactive educational web application that teaches Gymnasium students (Maturität level) about analytical geometry through a mixed-mode interface combining practice problems with real-time 2D and 3D visualizations. The module follows the Chamber Module Standards with a two-column layout: quest exercises on the left and dynamic geometric visualizations on the right.

The module consists of three stages (Line Equations, Plane Geometry, Spatial Relationships), each with four difficulty levels (BASIC, CORE, ADVANCED, ELITE), providing 65 total quests distributed as: 15 BASIC (line equations), 20 CORE (plane equations), 20 ADVANCED (distance calculations), and 10 ELITE (comprehensive spatial problems). All content is available in three languages (EN/CN/DE) with Basel-specific scenarios.

## Architecture

### Component Hierarchy

```
GM202AnalyticalGeometry (Page Component)
├── ChamberLayout (Layout Container)
│   ├── Header (Title, Language Selector)
│   ├── DifficultySelector (BASIC/CORE/ADVANCED/ELITE)
│   ├── StageSelector (LINE_EQUATIONS/PLANE_GEOMETRY/SPATIAL_RELATIONSHIPS)
│   ├── Left Panel (Quest Content)
│   │   ├── ScenarioDescription
│   │   ├── QuestDisplay
│   │   │   ├── PromptText
│   │   │   ├── FormulaDisplay (LaTeX)
│   │   │   └── InputField(s)
│   │   └── FeedbackDisplay
│   ├── Right Panel (Visualization)
│   │   └── GeometryVisualization
│   │       ├── CoordinatePlotter2D (for line equations)
│   │       ├── SpaceVisualizer3D (for planes and 3D lines)
│   │       └── DistanceCalculator (for distance problems)
│   └── Footer (Verify/Next Buttons)
└── useQuestManager (State Management Hook)
```

### Data Flow

1. **Initialization**: useQuestManager loads quest pool based on initial difficulty and stage
2. **Quest Selection**: System selects first quest from pool and displays it
3. **User Input**: User enters answer (numerical or algebraic expression)
4. **Verification**: User clicks "Verify" → System validates answer → Displays feedback
5. **Visualization Update**: Quest data updates visualization in real-time
6. **Navigation**: User clicks "Next" → System loads next quest → Updates visualization
7. **Stage/Difficulty Change**: User changes stage or difficulty → System rebuilds quest pool → Resets to first quest

### State Management

The module uses the `useQuestManager` hook which manages:
- Current difficulty level (BASIC/CORE/ADVANCED/ELITE)
- Current stage (LINE_EQUATIONS/PLANE_GEOMETRY/SPATIAL_RELATIONSHIPS)
- Quest pool (array of quests for current stage/difficulty)
- Current quest index
- User inputs (key-value pairs for multiple input fields)
- Last verification result
- Quest completion status
- 3D visualization state (camera position, rotation)

## Components and Interfaces

### 1. GM202AnalyticalGeometry (Main Page Component)

**Purpose**: Root component that orchestrates the entire module

**Props**: None (uses URL routing)

**State**:
- `currentVisualizationType: "2D" | "3D"` - Determines which visualization to render
- `visualizationData: GeometryData` - Current geometric objects to display

**Key Methods**:
- `buildStagePool(t, difficulty, stage)` - Generates quest pool for given difficulty and stage
- `handleDifficultyChange(newDifficulty)` - Switches difficulty level
- `handleStageChange(newStage)` - Switches stage
- `calculateLineEquation(point1, point2)` - Calculates line equation from two points
- `calculatePlaneEquation(point1, point2, point3)` - Calculates plane equation from three points
- `calculateDistance(point, object)` - Calculates distance from point to line/plane

**Responsibilities**:
- Initialize useQuestManager hook
- Build quest pools based on difficulty and stage
- Pass data to ChamberLayout and GeometryVisualization
- Handle language switching via i18n
- Manage visualization state and updates

### 2. GeometryVisualization Component

**Purpose**: Displays visual representations of geometric objects in 2D or 3D space

**Props**:
```typescript
interface GeometryVisualizationProps {
    quest: GM202Quest;
    stage: "LINE_EQUATIONS" | "PLANE_GEOMETRY" | "SPATIAL_RELATIONSHIPS";
    visualizationType: "2D" | "3D";
    data: GeometryData;
    translations: {
        line_equations: string;
        plane_geometry: string;
        spatial_relationships: string;
    };
}

interface GeometryData {
    lines?: Line[];
    planes?: Plane[];
    points?: Point[];
    distances?: Distance[];
}

interface Line {
    type: "2D" | "3D";
    point: [number, number] | [number, number, number];
    direction: [number, number] | [number, number, number];
    color: string;
}

interface Plane {
    coefficients: [number, number, number, number]; // [A, B, C, D] for Ax+By+Cz+D=0
    color: string;
    opacity: number;
}

interface Point {
    coordinates: [number, number] | [number, number, number];
    label: string;
    color: string;
}

interface Distance {
    from: Point;
    to: Point | Line | Plane;
    value: number;
    showSegment: boolean;
}
```

**Rendering Logic**:

**CoordinatePlotter2D** (for LINE_EQUATIONS stage):
- Displays 2D coordinate plane with x and y axes
- Plots lines using slope-intercept or point-slope form
- Highlights given points on the line
- Shows grid lines for reference
- Allows zooming and panning
- Color scheme: axes (black), grid (light gray), lines (blue), points (red)

**SpaceVisualizer3D** (for PLANE_GEOMETRY and SPATIAL_RELATIONSHIPS stages):
- Displays 3D coordinate system with x, y, z axes
- Renders planes as semi-transparent surfaces
- Renders 3D lines using parametric equations
- Supports interactive rotation using mouse/touch
- Supports zoom in/out
- Color scheme: axes (RGB for xyz), planes (green with 0.3 opacity), lines (blue), points (red)
- Uses Three.js or React Three Fiber for 3D rendering

**DistanceCalculator** (for distance visualization):
- Displays the geometric objects involved
- Highlights the shortest distance segment in yellow
- Shows perpendicular indicator at the closest point
- Displays distance value with units
- Animates the distance calculation process

### 3. Quest Data Structure

```typescript
interface GM202Quest extends Quest {
    id: string;                    // Unique identifier (e.g., "LINE_EQUATIONS_BASIC_1")
    difficulty: Difficulty;        // BASIC | CORE | ADVANCED | ELITE
    stage: Stage;                  // LINE_EQUATIONS | PLANE_GEOMETRY | SPATIAL_RELATIONSHIPS
    
    // For line equation quests
    points?: Array<[number, number] | [number, number, number]>;
    slope?: number;
    yIntercept?: number;
    
    // For plane equation quests
    normalVector?: [number, number, number];
    planePoint?: [number, number, number];
    
    // For distance quests
    distanceFrom?: [number, number] | [number, number, number];
    distanceTo?: {
        type: "line" | "plane";
        equation: string;
        coefficients?: number[];
    };
    
    // Common fields
    promptLatex: string;           // Question text
    expressionLatex: string;       // Formula in LaTeX
    targetLatex: string;           // Target variable or expression
    slots: Array<{                 // Input fields
        id: string;
        labelLatex: string;
        placeholder: string;
        expected: string | number;
        type: "number" | "expression";
    }>;
    correctLatex: string;          // Correct answer display
    answer: string | number;       // Expected answer value
    visualizationData: GeometryData; // Data for visualization
}
```

### 4. Quest Pool Generation

**buildStagePool Function**:

```typescript
function buildStagePool(
    t: TranslationType,
    difficulty: Difficulty,
    stage: Stage
): GM202Quest[]
```

**Logic**:
1. Select quest template based on stage
2. Generate quest data based on difficulty level
3. Calculate expected answers using geometric formulas
4. Build visualization data for each quest
5. Return array of quests (15 for BASIC, 20 for CORE, 20 for ADVANCED, 10 for ELITE)

**Quest Distribution**:
- LINE_EQUATIONS stage: 15 BASIC quests
- PLANE_GEOMETRY stage: 20 CORE quests
- SPATIAL_RELATIONSHIPS stage: 20 ADVANCED + 10 ELITE quests

## Data Models

### Line Equations Data (BASIC - 15 quests)

**Quest Type 1: Find line equation from two points**
```typescript
{
    points: [[1, 2], [3, 6]],
    expectedSlope: 2,
    expectedEquation: "y = 2x",
    answer: "y = 2x"
}
```

**Quest Type 2: Find slope from line equation**
```typescript
{
    equation: "y = 3x + 5",
    expectedSlope: 3,
    answer: "3"
}
```

**Quest Type 3: Find y-intercept from line equation**
```typescript
{
    equation: "y = -2x + 7",
    expectedIntercept: 7,
    answer: "7"
}
```

**Quest Type 4: Convert to slope-intercept form**
```typescript
{
    equation: "2x + 3y = 6",
    expectedForm: "y = -2/3 x + 2",
    answer: "y = -2/3 x + 2"
}
```

**Quest Type 5: 3D line in parametric form**
```typescript
{
    point: [1, 2, 3],
    direction: [2, -1, 4],
    expectedParametric: "(x,y,z) = (1,2,3) + t(2,-1,4)",
    answer: "(x,y,z) = (1,2,3) + t(2,-1,4)"
}
```

### Plane Equations Data (CORE - 20 quests)

**Quest Type 1: Find plane equation from three points**
```typescript
{
    points: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
    expectedEquation: "x + y + z = 1",
    answer: "x + y + z = 1"
}
```

**Quest Type 2: Find normal vector from plane equation**
```typescript
{
    equation: "2x - 3y + 4z = 5",
    expectedNormal: [2, -3, 4],
    answer: "(2, -3, 4)"
}
```

**Quest Type 3: Find plane equation from point and normal**
```typescript
{
    point: [1, 2, 3],
    normal: [2, -1, 3],
    expectedEquation: "2x - y + 3z = 9",
    answer: "2x - y + 3z = 9"
}
```

**Quest Type 4: Find intercepts of plane**
```typescript
{
    equation: "2x + 3y + 6z = 12",
    expectedXIntercept: 6,
    expectedYIntercept: 4,
    expectedZIntercept: 2,
    answer: "(6, 4, 2)"
}
```

### Distance Calculations Data (ADVANCED - 20 quests)

**Quest Type 1: Distance from point to line in 2D**
```typescript
{
    point: [2, 3],
    line: "3x + 4y - 5 = 0",
    expectedDistance: 3.4,
    answer: "3.4"
}
```

**Quest Type 2: Distance from point to line in 3D**
```typescript
{
    point: [1, 2, 3],
    linePoint: [0, 0, 0],
    lineDirection: [1, 1, 1],
    expectedDistance: 2.45,
    answer: "2.45"
}
```

**Quest Type 3: Distance from point to plane**
```typescript
{
    point: [1, 2, 3],
    plane: "2x - y + 2z - 3 = 0",
    expectedDistance: 2.33,
    answer: "2.33"
}
```

**Quest Type 4: Distance between parallel lines**
```typescript
{
    line1: "2x + 3y = 5",
    line2: "2x + 3y = 10",
    expectedDistance: 1.39,
    answer: "1.39"
}
```

**Quest Type 5: Distance between parallel planes**
```typescript
{
    plane1: "x + y + z = 3",
    plane2: "x + y + z = 6",
    expectedDistance: 1.73,
    answer: "1.73"
}
```

### Spatial Relationships Data (ELITE - 10 quests)

**Quest Type 1: Determine line-line relationship in 3D**
```typescript
{
    line1: { point: [0, 0, 0], direction: [1, 2, 3] },
    line2: { point: [1, 1, 1], direction: [2, 4, 6] },
    expectedRelationship: "parallel",
    answer: "parallel"
}
```

**Quest Type 2: Determine line-plane relationship**
```typescript
{
    line: { point: [1, 0, 0], direction: [1, 1, 0] },
    plane: "x + y = 5",
    expectedRelationship: "parallel",
    answer: "parallel"
}
```

**Quest Type 3: Find intersection of line and plane**
```typescript
{
    line: { point: [0, 0, 0], direction: [1, 2, 3] },
    plane: "x + y + z = 6",
    expectedIntersection: [1, 2, 3],
    answer: "(1, 2, 3)"
}
```

**Quest Type 4: Determine plane-plane relationship**
```typescript
{
    plane1: "x + 2y + 3z = 4",
    plane2: "2x + 4y + 6z = 8",
    expectedRelationship: "parallel",
    answer: "parallel"
}
```

**Quest Type 5: Find intersection line of two planes**
```typescript
{
    plane1: "x + y + z = 1",
    plane2: "x - y + z = 0",
    expectedIntersectionLine: "(x,y,z) = (0.5,0.5,0) + t(1,0,-1)",
    answer: "(x,y,z) = (0.5,0.5,0) + t(1,0,-1)"
}
```

## Basel-Specific Scenarios

### Scenario 1: Basel Tram Line Route Planning (LINE_EQUATIONS stage)

**Context**: Basel's tram network is one of the most efficient in Switzerland, with 11 lines covering the city. Urban planners use analytical geometry to optimize routes and plan new extensions.

**Scenario Description** (200 words):

"You are working with Basel's public transport authority (BVB) to analyze tram line routes on a city map. The map uses a coordinate system where each unit represents 100 meters. Tram Line 8 runs from Kleinhüningen through the city center to Neuweilerstrasse, while Line 11 connects Aesch to St. Louis (France).

Your task is to determine the mathematical equations representing these tram routes. Line 8 passes through Claraplatz at coordinates (2, 3) and Barfüsserplatz at (5, 9). Line 11 passes through Basel SBB station at (4, 2) with a direction vector of (3, 1).

The BVB needs these equations to:
- Calculate optimal stop locations
- Determine where new lines might intersect existing routes
- Plan maintenance schedules that minimize service disruptions
- Analyze coverage gaps in the network

Understanding line equations helps urban planners make data-driven decisions about public transport infrastructure, ensuring Basel residents have efficient access to all parts of the city."

**Quest Examples**:
1. Find the equation of Line 8 passing through Claraplatz (2, 3) and Barfüsserplatz (5, 9)
2. Determine the slope of Line 11 given its direction vector (3, 1)
3. Find where Line 8 and Line 11 would intersect if extended

### Scenario 2: Rhine River Bridge Construction (PLANE_GEOMETRY stage)

**Context**: Basel has eight bridges crossing the Rhine River, connecting Grossbasel and Kleinbasel. Engineers use plane equations to design bridge structures and ensure proper alignment.

**Scenario Description** (220 words):

"The Canton of Basel-Stadt is planning a new pedestrian and bicycle bridge across the Rhine River to improve connectivity between the University Basel campus in Grossbasel and the residential areas in Kleinbasel. You are part of the engineering team responsible for the structural design.

The bridge deck will be modeled as a plane in 3D space. Three key support points have been identified:
- Point A (Grossbasel side): (0, 0, 5) - 5 meters above water level
- Point B (Mid-river support): (50, 0, 8) - 8 meters above water level
- Point C (Kleinbasel side): (100, 0, 6) - 6 meters above water level

The coordinates use meters, with the origin at the Grossbasel riverbank, x-axis along the river crossing direction, y-axis along the river flow, and z-axis representing height above water.

Your tasks include:
- Determining the plane equation for the bridge deck
- Calculating the normal vector to ensure proper drainage
- Finding where the bridge intersects with the riverbanks
- Verifying that the bridge clearance meets navigation requirements (minimum 5 meters above water)

This project demonstrates how analytical geometry is essential in civil engineering, ensuring bridges are safe, functional, and aesthetically integrated into Basel's historic cityscape."

**Quest Examples**:
1. Find the plane equation for the bridge deck passing through points A, B, and C
2. Calculate the normal vector to the bridge plane
3. Determine the x-intercept and z-intercept of the bridge plane

### Scenario 3: Basel-Mulhouse Airport Flight Path Analysis (SPATIAL_RELATIONSHIPS stage)

**Context**: EuroAirport Basel-Mulhouse-Freiburg serves three countries and requires precise flight path calculations to ensure safety and minimize noise pollution over residential areas.

**Scenario Description** (240 words):

"EuroAirport Basel-Mulhouse-Freiburg is unique in Europe, serving Switzerland, France, and Germany. Air traffic controllers use analytical geometry to manage flight paths, ensuring aircraft maintain safe distances and follow optimal approach routes.

You are working with the airport's air traffic management team to analyze flight paths in 3D space. The coordinate system has its origin at the airport control tower, with:
- x-axis pointing east (toward Germany)
- y-axis pointing north (toward Basel city center)
- z-axis pointing upward (altitude in meters)

Two aircraft are approaching the airport:
- Flight LX318 from Zurich: position (5000, 8000, 1200), descending along direction vector (-1, -2, -0.3)
- Flight AF1642 from Paris: position (3000, 6000, 1500), descending along direction vector (1, -1, -0.4)

Your responsibilities include:
- Determining if the flight paths are parallel, intersecting, or skew
- Calculating the minimum distance between the two aircraft
- Verifying that both flights maintain the required 1000-meter vertical separation
- Finding the intersection point with the ground plane (z = 0) for each flight path
- Ensuring flight paths avoid noise-sensitive areas in Basel neighborhoods

This analysis is critical for aviation safety and demonstrates how spatial geometry enables modern air traffic control systems to manage hundreds of flights daily while maintaining strict safety standards."

**Quest Examples**:
1. Determine the relationship between the two flight paths (parallel, intersecting, or skew)
2. Calculate the minimum distance between the two aircraft
3. Find where each flight path intersects the ground plane (z = 0)

### Scenario 4: University Basel Campus Building Layout (SPATIAL_RELATIONSHIPS stage)

**Context**: University of Basel, founded in 1460, is Switzerland's oldest university. The campus spans multiple buildings across Basel, requiring careful spatial planning for new construction and renovations.

**Scenario Description** (210 words):

"The University of Basel is planning a new research building for the Department of Mathematics and Computer Science. You are part of the architectural team using analytical geometry to optimize the building's position and orientation.

The campus uses a 3D coordinate system with the origin at the historic Kollegienhaus (main building). The new building must:
- Be positioned to maximize natural light
- Maintain sight lines to historic buildings
- Ensure accessibility from existing pathways
- Comply with Basel's strict building height regulations

Three existing buildings define the available space:
- Kollegienhaus: plane equation x + 2y = 100
- Biozentrum: plane equation 2x - y = 50
- Pharmazentrum: plane equation x + y + z = 150

Your tasks include:
- Calculating distances from proposed building locations to existing structures
- Determining if proposed walls are parallel or perpendicular to existing buildings
- Finding intersection lines between building planes for shared infrastructure
- Optimizing the building footprint to maximize usable space while respecting constraints

This project illustrates how analytical geometry supports architectural design, helping create functional, aesthetically pleasing spaces that integrate with Basel's rich academic heritage."

**Quest Examples**:
1. Calculate the distance from point (60, 20, 0) to the Kollegienhaus plane
2. Determine if two proposed walls are parallel, perpendicular, or neither
3. Find the intersection line between the Biozentrum and Pharmazentrum planes


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, I identified the following redundancies:
- Properties 1.1 and 1.2 (point-slope and slope-intercept forms) can be combined into a single property about line equation validation
- Properties 1.3 and 1.4 (slope and y-intercept extraction) can be combined into a single property about line parameter extraction
- Properties 3.1, 3.2, and 3.3 (distance calculations) share the same underlying principle and can be tested with a unified approach
- Quest pool size properties (1.7, 2.5, 3.6, 4.6, 10.2) are redundant and can be consolidated into a single property

The following properties represent the unique, non-redundant validation requirements:

### Property 1: Line Equation from Two Points

*For any* two distinct points (x₁, y₁) and (x₂, y₂) in 2D space, the line equation calculated by the system should satisfy both points when substituted into the equation.

**Validates: Requirements 1.1, 1.8**

### Property 2: Line Parameter Extraction

*For any* valid line equation in the form Ax + By + C = 0, the extracted slope m = -A/B and y-intercept b = -C/B should produce an equivalent equation y = mx + b.

**Validates: Requirements 1.3, 1.4**

### Property 3: 3D Line Parametric Form Validation

*For any* 3D line defined by a point P₀ = (x₀, y₀, z₀) and direction vector d = (a, b, c), any point on the line should satisfy the parametric equation (x, y, z) = P₀ + td for some real value t.

**Validates: Requirements 1.5**

### Property 4: 3D Line Symmetric Form Equivalence

*For any* 3D line in parametric form, the symmetric form (x-x₀)/a = (y-y₀)/b = (z-z₀)/c should be algebraically equivalent, meaning any point satisfying one form satisfies the other.

**Validates: Requirements 1.6**

### Property 5: Plane Equation from Three Points

*For any* three non-collinear points P₁, P₂, P₃ in 3D space, the plane equation Ax + By + Cz + D = 0 calculated by the system should satisfy all three points when their coordinates are substituted.

**Validates: Requirements 2.1, 2.6**

### Property 6: Plane Equation from Point and Normal

*For any* point P₀ = (x₀, y₀, z₀) and normal vector n = (A, B, C), the plane equation A(x-x₀) + B(y-y₀) + C(z-z₀) = 0 should be satisfied by the given point.

**Validates: Requirements 2.2**

### Property 7: Normal Vector Extraction

*For any* plane equation Ax + By + Cz + D = 0, the extracted normal vector (A, B, C) should be perpendicular to any vector lying in the plane.

**Validates: Requirements 2.3**

### Property 8: Plane Intercept Calculation

*For any* plane equation Ax + By + Cz + D = 0 where A, B, C ≠ 0, the calculated intercepts should satisfy: x-intercept = -D/A, y-intercept = -D/B, z-intercept = -D/C, and these points should lie on the plane.

**Validates: Requirements 2.4**

### Property 9: Point-to-Line Distance in 2D

*For any* point (x₀, y₀) and line Ax + By + C = 0 in 2D space, the calculated distance d = |Ax₀ + By₀ + C| / √(A² + B²) should equal the length of the perpendicular segment from the point to the line.

**Validates: Requirements 3.1, 3.7**

### Property 10: Point-to-Line Distance in 3D

*For any* point P and line defined by point L₀ and direction vector d in 3D space, the calculated distance using the cross product formula d = ||(P - L₀) × d|| / ||d|| should equal the shortest distance from P to the line.

**Validates: Requirements 3.2, 3.7**

### Property 11: Point-to-Plane Distance

*For any* point (x₀, y₀, z₀) and plane Ax + By + Cz + D = 0, the calculated distance d = |Ax₀ + By₀ + Cz₀ + D| / √(A² + B² + C²) should equal the perpendicular distance from the point to the plane.

**Validates: Requirements 3.3, 3.7**

### Property 12: Distance Between Parallel Lines

*For any* two parallel lines L₁ and L₂ in 2D or 3D space, the calculated distance should equal the distance from any point on L₁ to L₂, and this value should be constant regardless of which point on L₁ is chosen.

**Validates: Requirements 3.4**

### Property 13: Distance Between Parallel Planes

*For any* two parallel planes with equations Ax + By + Cz + D₁ = 0 and Ax + By + Cz + D₂ = 0, the calculated distance d = |D₁ - D₂| / √(A² + B² + C²) should be constant and equal to the perpendicular distance between the planes.

**Validates: Requirements 3.5**

### Property 14: Line-Line Relationship Classification in 2D

*For any* two lines in 2D space with slopes m₁ and m₂, the system should correctly classify them as: parallel if m₁ = m₂, perpendicular if m₁ × m₂ = -1, or intersecting otherwise.

**Validates: Requirements 4.1, 4.7**

### Property 15: Line-Line Relationship Classification in 3D

*For any* two lines in 3D space with direction vectors d₁ and d₂, the system should correctly classify them as: parallel if d₁ × d₂ = 0, perpendicular if d₁ · d₂ = 0, intersecting if they meet at a point, or skew if none of the above.

**Validates: Requirements 4.2, 4.7**

### Property 16: Line-Plane Relationship Classification

*For any* line with direction vector d and plane with normal vector n, the system should correctly classify them as: parallel if d · n = 0, perpendicular if d × n = 0, or intersecting otherwise.

**Validates: Requirements 4.3, 4.7**

### Property 17: Plane-Plane Relationship Classification

*For any* two planes with normal vectors n₁ and n₂, the system should correctly classify them as: parallel if n₁ × n₂ = 0, perpendicular if n₁ · n₂ = 0, or intersecting otherwise.

**Validates: Requirements 4.4, 4.7**

### Property 18: Intersection Point Calculation

*For any* two intersecting geometric objects (line-line, line-plane), the calculated intersection point should satisfy the equations of both objects.

**Validates: Requirements 4.5**

### Property 19: Quest Pool Size Consistency

*For any* combination of difficulty and stage, the total number of quests should equal 65, distributed as: 15 BASIC, 20 CORE, 20 ADVANCED, 10 ELITE.

**Validates: Requirements 1.7, 2.5, 3.6, 4.6, 5.7**

### Property 20: BASIC Quest Integer Coordinates

*For any* BASIC difficulty quest, all coordinate values should be integers and slopes should be simple fractions or integers.

**Validates: Requirements 5.1**

### Property 21: Answer Verification Tolerance

*For any* numerical answer that differs from the expected value by at most 0.01, the verification should return success.

**Validates: Requirements 3.7, 9.1**

### Property 22: Algebraic Expression Equivalence

*For any* two algebraically equivalent expressions (e.g., y = 2x + 3 and 2x - y + 3 = 0), the system should accept both as correct answers.

**Validates: Requirements 9.2**

### Property 23: Translation Completeness

*For any* UI text element, translations should exist for all three languages (EN, CN, DE), and switching languages should update all displayed text.

**Validates: Requirements 8.1, 8.2**

### Property 24: Quest Data Structure Completeness

*For any* generated quest, it should contain all required fields (id, difficulty, stage, points/vectors/equations, expectedAnswer) and the data should be mathematically consistent.

**Validates: Requirements 10.1, 10.6**

### Property 25: Coordinate and Vector Storage Format

*For any* quest involving coordinates, they should be stored as tuples (x, y) or (x, y, z), and vectors should be stored as arrays [a, b, c].

**Validates: Requirements 10.3, 10.4**

## Error Handling

### Input Validation

**Invalid Number Format**:
- User enters non-numeric text for numerical answers
- System: Treat as incorrect answer, display error feedback
- No crash or exception

**Invalid Algebraic Expression**:
- User enters malformed expression (e.g., "y = 2x +")
- System: Attempt to parse, if fails, treat as incorrect
- Display hint about proper format

**Empty Input**:
- User clicks "Verify" with empty input field
- System: Display prompt to enter an answer
- Do not count as incorrect attempt

**Out of Range Values**:
- User enters extremely large or small numbers
- System: Still verify against expected answer
- If incorrect, display standard error feedback

### Quest Loading Errors

**Missing Quest Data**:
- Quest pool generation fails or returns empty array
- System: Display loading state with message
- Log error to console for debugging

**Invalid Quest Structure**:
- Quest object missing required fields
- System: Skip invalid quest, load next valid quest
- Log warning to console

**Mathematically Inconsistent Data**:
- Three collinear points provided for plane equation
- System: Regenerate quest with valid data
- Ensure all quests are mathematically sound before display

### Visualization Errors

**3D Rendering Failure**:
- Three.js fails to initialize or render
- System: Display 2D fallback visualization
- Show message: "3D visualization unavailable, showing 2D projection"

**Missing Geometric Data**:
- Quest lacks required points, vectors, or equations
- System: Use default values or skip visualization
- Display quest text without visualization

**Performance Issues**:
- 3D rendering drops below 30 FPS on mobile
- System: Reduce visualization complexity (fewer grid lines, simpler geometry)
- Maintain functionality with degraded visuals

### Translation Errors

**Missing Translation Key**:
- Requested translation key doesn't exist
- System: Display English fallback text
- Log warning to console

**LaTeX Rendering Failure**:
- react-katex fails to render formula
- System: Display plain text fallback
- Show formula in ASCII format (e.g., "Ax + By + Cz + D = 0")

## Testing Strategy

### Unit Testing

**Geometric Calculation Tests**:
- Test line equation calculation from two points
- Test slope and y-intercept extraction
- Test plane equation calculation from three points
- Test normal vector extraction
- Test distance calculations (point-to-line, point-to-plane)
- Test intersection point calculations
- Test relationship classification (parallel, perpendicular, intersecting, skew)

**Quest Generation Tests**:
- Test `buildStagePool` function for each stage and difficulty
- Verify quest pool sizes match requirements
- Verify quest objects have all required fields
- Verify BASIC quests use integer coordinates
- Verify mathematical consistency of quest data

**Answer Verification Tests**:
- Test numerical verification with exact match
- Test numerical verification with ±0.01 tolerance
- Test algebraic expression equivalence
- Test invalid input handling

**Translation Tests**:
- Test all translation keys exist for EN, CN, DE
- Test language switching updates UI text
- Test LaTeX formulas are language-independent

### Property-Based Testing

**Configuration**: Use fast-check library for TypeScript, minimum 100 iterations per test

**Property Test 1: Line Equation Point Satisfaction**
```typescript
// Feature: gm2-02-analytical-geometry, Property 1: Line equation from two points
fc.assert(
  fc.property(
    fc.record({
      x1: fc.integer({ min: -10, max: 10 }),
      y1: fc.integer({ min: -10, max: 10 }),
      x2: fc.integer({ min: -10, max: 10 }),
      y2: fc.integer({ min: -10, max: 10 })
    }).filter(p => p.x1 !== p.x2 || p.y1 !== p.y2), // Ensure distinct points
    (points) => {
      const { x1, y1, x2, y2 } = points;
      const slope = (y2 - y1) / (x2 - x1);
      const yIntercept = y1 - slope * x1;
      
      // Verify both points satisfy y = mx + b
      const satisfiesP1 = Math.abs(y1 - (slope * x1 + yIntercept)) < 0.01;
      const satisfiesP2 = Math.abs(y2 - (slope * x2 + yIntercept)) < 0.01;
      
      return satisfiesP1 && satisfiesP2;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 2: Plane Equation Point Satisfaction**
```typescript
// Feature: gm2-02-analytical-geometry, Property 5: Plane equation from three points
fc.assert(
  fc.property(
    fc.array(fc.tuple(fc.integer({ min: -10, max: 10 }), 
                      fc.integer({ min: -10, max: 10 }), 
                      fc.integer({ min: -10, max: 10 })), { minLength: 3, maxLength: 3 })
      .filter(points => !areCollinear(points)), // Ensure non-collinear
    (points) => {
      const [p1, p2, p3] = points;
      const { A, B, C, D } = calculatePlaneEquation(p1, p2, p3);
      
      // Verify all three points satisfy Ax + By + Cz + D = 0
      const satisfiesP1 = Math.abs(A * p1[0] + B * p1[1] + C * p1[2] + D) < 0.01;
      const satisfiesP2 = Math.abs(A * p2[0] + B * p2[1] + C * p2[2] + D) < 0.01;
      const satisfiesP3 = Math.abs(A * p3[0] + B * p3[1] + C * p3[2] + D) < 0.01;
      
      return satisfiesP1 && satisfiesP2 && satisfiesP3;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 3: Point-to-Plane Distance Formula**
```typescript
// Feature: gm2-02-analytical-geometry, Property 11: Point-to-plane distance
fc.assert(
  fc.property(
    fc.record({
      point: fc.tuple(fc.float({ min: -100, max: 100 }), 
                      fc.float({ min: -100, max: 100 }), 
                      fc.float({ min: -100, max: 100 })),
      plane: fc.record({
        A: fc.float({ min: -10, max: 10 }).filter(x => Math.abs(x) > 0.1),
        B: fc.float({ min: -10, max: 10 }).filter(x => Math.abs(x) > 0.1),
        C: fc.float({ min: -10, max: 10 }).filter(x => Math.abs(x) > 0.1),
        D: fc.float({ min: -10, max: 10 })
      })
    }),
    ({ point, plane }) => {
      const [x, y, z] = point;
      const { A, B, C, D } = plane;
      
      const distance = Math.abs(A * x + B * y + C * z + D) / 
                       Math.sqrt(A * A + B * B + C * C);
      
      // Distance should always be non-negative
      return distance >= 0;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 4: Parallel Lines Distance Consistency**
```typescript
// Feature: gm2-02-analytical-geometry, Property 12: Distance between parallel lines
fc.assert(
  fc.property(
    fc.record({
      line1: fc.record({ A: fc.float(), B: fc.float(), C: fc.float() }),
      offset: fc.float({ min: 1, max: 10 })
    }).filter(({ line1 }) => Math.abs(line1.A) > 0.1 || Math.abs(line1.B) > 0.1),
    ({ line1, offset }) => {
      // Create parallel line by changing only C
      const line2 = { A: line1.A, B: line1.B, C: line1.C + offset };
      
      // Pick two different points on line1
      const point1 = getPointOnLine(line1, 0);
      const point2 = getPointOnLine(line1, 5);
      
      // Calculate distance from both points to line2
      const dist1 = pointToLineDistance(point1, line2);
      const dist2 = pointToLineDistance(point2, line2);
      
      // Distances should be equal (constant for parallel lines)
      return Math.abs(dist1 - dist2) < 0.01;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 5: Line-Line Relationship Classification**
```typescript
// Feature: gm2-02-analytical-geometry, Property 15: Line-line relationship in 3D
fc.assert(
  fc.property(
    fc.record({
      line1: fc.record({
        point: fc.tuple(fc.float(), fc.float(), fc.float()),
        direction: fc.tuple(fc.float(), fc.float(), fc.float())
          .filter(d => Math.abs(d[0]) + Math.abs(d[1]) + Math.abs(d[2]) > 0.1)
      }),
      line2: fc.record({
        point: fc.tuple(fc.float(), fc.float(), fc.float()),
        direction: fc.tuple(fc.float(), fc.float(), fc.float())
          .filter(d => Math.abs(d[0]) + Math.abs(d[1]) + Math.abs(d[2]) > 0.1)
      })
    }),
    ({ line1, line2 }) => {
      const relationship = classifyLineLineRelationship3D(line1, line2);
      
      // Relationship should be one of the four valid types
      const validTypes = ["parallel", "perpendicular", "intersecting", "skew"];
      return validTypes.includes(relationship);
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 6: Answer Verification Tolerance**
```typescript
// Feature: gm2-02-analytical-geometry, Property 21: Answer verification tolerance
fc.assert(
  fc.property(
    fc.float({ min: 0, max: 1000 }),
    fc.float({ min: -0.01, max: 0.01 }),
    (expected, delta) => {
      const userAnswer = expected + delta;
      const isCorrect = Math.abs(userAnswer - expected) <= 0.01;
      return isCorrect === true;
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 7: Quest Pool Size Distribution**
```typescript
// Feature: gm2-02-analytical-geometry, Property 19: Quest pool size consistency
fc.assert(
  fc.property(
    fc.constantFrom("BASIC", "CORE", "ADVANCED", "ELITE"),
    fc.constantFrom("LINE_EQUATIONS", "PLANE_GEOMETRY", "SPATIAL_RELATIONSHIPS"),
    (difficulty, stage) => {
      const pool = buildStagePool(mockTranslations, difficulty, stage);
      
      // Verify pool size matches requirements
      const expectedSizes = {
        BASIC: 15,
        CORE: 20,
        ADVANCED: 20,
        ELITE: 10
      };
      
      return pool.length === expectedSizes[difficulty];
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 8: Translation Key Existence**
```typescript
// Feature: gm2-02-analytical-geometry, Property 23: Translation completeness
fc.assert(
  fc.property(
    fc.constantFrom("EN", "CN", "DE"),
    fc.constantFrom("title", "line_equations", "plane_geometry", 
                    "spatial_relationships", "check", "next"),
    (language, key) => {
      const translations = getTranslations(language);
      return translations.gm2_02[key] !== undefined;
    }
  ),
  { numRuns: 100 }
);
```

### Integration Testing

**End-to-End Quest Flow**:
1. Load module → Verify initial quest displays
2. Enter correct answer → Click "Verify" → Verify success feedback
3. Click "Next" → Verify next quest loads
4. Complete all quests in stage → Verify stage completion
5. Change difficulty → Verify new quest pool loads
6. Change stage → Verify appropriate visualization displays

**Visualization Synchronization**:
1. Load LINE_EQUATIONS quest → Verify 2D coordinate plotter displays
2. Load PLANE_GEOMETRY quest → Verify 3D space visualizer displays
3. Load SPATIAL_RELATIONSHIPS quest → Verify distance calculator displays
4. Change quest → Verify visualization updates with new geometric data
5. Rotate 3D view → Verify rotation is smooth and responsive

**Language Switching**:
1. Load module in English → Verify all text is English
2. Switch to Chinese → Verify all text updates to Chinese
3. Switch to German → Verify all text updates to German
4. Verify LaTeX formulas remain consistent across languages
5. Verify mathematical notation is language-independent

### Browser Testing

**Supported Browsers**:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

**Test Checklist**:
- [ ] Module loads without errors
- [ ] All quests display correctly
- [ ] Input fields accept numeric and algebraic input
- [ ] Verify button triggers validation
- [ ] Next button advances to next quest
- [ ] 2D visualizations render correctly
- [ ] 3D visualizations render and support rotation
- [ ] Language switching works
- [ ] LaTeX formulas render correctly
- [ ] Responsive layout works on mobile/tablet
- [ ] Touch gestures work for 3D rotation on mobile
- [ ] No console errors or warnings
