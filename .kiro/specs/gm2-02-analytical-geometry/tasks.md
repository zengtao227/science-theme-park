# Implementation Plan: GM2.02 - Analytical Geometry

## Overview

This implementation plan breaks down the GM2.02 Analytical Geometry module into discrete coding tasks. The module will be built using TypeScript/React with Three.js for 3D visualizations, react-katex for LaTeX rendering, and fast-check for property-based testing. The implementation follows a progressive approach: core geometric calculations → quest data generation → UI components → visualizations → testing.

## Tasks

- [x] 1. Set up project structure and core types
  - Create directory structure: `src/modules/gm2-02-analytical-geometry/`
  - Define TypeScript interfaces for Quest, GeometryData, Line, Plane, Point, Distance
  - Define Stage and Difficulty enums
  - Set up i18n translation files for EN/CN/DE
  - _Requirements: 10.1, 10.3, 10.4, 10.5, 8.1_

- [x] 2. Implement core geometric calculation functions
  - [x] 2.1 Implement 2D line equation calculations
    - Write `calculateLineFrom2Points(p1, p2)` - returns slope and y-intercept
    - Write `extractLineParameters(equation)` - extracts slope and y-intercept from equation
    - Write `pointSatisfiesLine(point, line)` - verifies point lies on line
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.8_
  
  - [ ]* 2.2 Write property test for 2D line calculations
    - **Property 1: Line Equation from Two Points**
    - **Validates: Requirements 1.1, 1.8**
  
  - [x] 2.3 Implement 3D line equation calculations
    - Write `calculate3DLineParametric(point, direction)` - returns parametric form
    - Write `calculate3DLineSymmetric(point, direction)` - returns symmetric form
    - Write `pointSatisfies3DLine(point, line)` - verifies point lies on 3D line
    - _Requirements: 1.5, 1.6_
  
  - [ ]* 2.4 Write property tests for 3D line calculations
    - **Property 3: 3D Line Parametric Form Validation**
    - **Property 4: 3D Line Symmetric Form Equivalence**
    - **Validates: Requirements 1.5, 1.6**

- [x] 3. Implement plane equation calculations
  - [x] 3.1 Implement plane equation from three points
    - Write `calculatePlaneFrom3Points(p1, p2, p3)` - returns coefficients [A, B, C, D]
    - Write `areCollinear(p1, p2, p3)` - checks if three points are collinear
    - Write `pointSatisfiesPlane(point, plane)` - verifies point lies on plane
    - _Requirements: 2.1, 2.6, 10.6_
  
  - [ ]* 3.2 Write property test for plane from three points
    - **Property 5: Plane Equation from Three Points**
    - **Validates: Requirements 2.1, 2.6**
  
  - [x] 3.3 Implement plane equation from point and normal
    - Write `calculatePlaneFromPointNormal(point, normal)` - returns plane equation
    - Write `extractNormalVector(plane)` - extracts normal vector from plane equation
    - Write `calculatePlaneIntercepts(plane)` - calculates x, y, z intercepts
    - _Requirements: 2.2, 2.3, 2.4_
  
  - [ ]* 3.4 Write property tests for plane calculations
    - **Property 6: Plane Equation from Point and Normal**
    - **Property 7: Normal Vector Extraction**
    - **Property 8: Plane Intercept Calculation**
    - **Validates: Requirements 2.2, 2.3, 2.4**

- [x] 4. Implement distance calculation functions
  - [x] 4.1 Implement point-to-line distance in 2D
    - Write `pointToLine2DDistance(point, line)` - uses formula d = |Ax₀ + By₀ + C| / √(A² + B²)
    - _Requirements: 3.1_
  
  - [x] 4.2 Implement point-to-line distance in 3D
    - Write `pointToLine3DDistance(point, linePoint, lineDirection)` - uses cross product formula
    - Write `crossProduct(v1, v2)` - calculates vector cross product
    - Write `vectorMagnitude(v)` - calculates vector magnitude
    - _Requirements: 3.2_
  
  - [x] 4.3 Implement point-to-plane distance
    - Write `pointToPlaneDistance(point, plane)` - uses formula d = |Ax₀ + By₀ + Cz₀ + D| / √(A² + B² + C²)
    - _Requirements: 3.3_
  
  - [ ]* 4.4 Write property tests for distance calculations
    - **Property 9: Point-to-Line Distance in 2D**
    - **Property 10: Point-to-Line Distance in 3D**
    - **Property 11: Point-to-Plane Distance**
    - **Validates: Requirements 3.1, 3.2, 3.3, 3.7**
  
  - [x] 4.5 Implement distance between parallel objects
    - Write `parallelLinesDistance(line1, line2)` - calculates distance between parallel lines
    - Write `parallelPlanesDistance(plane1, plane2)` - calculates distance between parallel planes
    - _Requirements: 3.4, 3.5_
  
  - [ ]* 4.6 Write property tests for parallel object distances
    - **Property 12: Distance Between Parallel Lines**
    - **Property 13: Distance Between Parallel Planes**
    - **Validates: Requirements 3.4, 3.5**

- [x] 5. Checkpoint - Ensure all geometric calculation tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implement position relationship classification
  - [x] 6.1 Implement line-line relationship classification
    - Write `classifyLineLine2D(line1, line2)` - returns "parallel", "perpendicular", or "intersecting"
    - Write `classifyLineLine3D(line1, line2)` - returns "parallel", "perpendicular", "intersecting", or "skew"
    - Write `dotProduct(v1, v2)` - calculates vector dot product
    - _Requirements: 4.1, 4.2, 4.7_
  
  - [ ]* 6.2 Write property tests for line-line classification
    - **Property 14: Line-Line Relationship Classification in 2D**
    - **Property 15: Line-Line Relationship Classification in 3D**
    - **Validates: Requirements 4.1, 4.2, 4.7**
  
  - [x] 6.3 Implement line-plane and plane-plane relationships
    - Write `classifyLinePlane(line, plane)` - returns "parallel", "perpendicular", or "intersecting"
    - Write `classifyPlanePlane(plane1, plane2)` - returns "parallel", "perpendicular", or "intersecting"
    - _Requirements: 4.3, 4.4, 4.7_
  
  - [ ]* 6.4 Write property tests for line-plane and plane-plane classification
    - **Property 16: Line-Plane Relationship Classification**
    - **Property 17: Plane-Plane Relationship Classification**
    - **Validates: Requirements 4.3, 4.4, 4.7**
  
  - [x] 6.5 Implement intersection calculations
    - Write `calculateLineLineIntersection(line1, line2)` - returns intersection point or null
    - Write `calculateLinePlaneIntersection(line, plane)` - returns intersection point or null
    - Write `calculatePlanePlaneIntersection(plane1, plane2)` - returns intersection line or null
    - _Requirements: 4.5_
  
  - [ ]* 6.6 Write property test for intersection calculations
    - **Property 18: Intersection Point Calculation**
    - **Validates: Requirements 4.5**

- [x] 7. Implement quest data generation
  - [x] 7.1 Create quest data for LINE_EQUATIONS stage (BASIC - 15 quests)
    - Generate 15 quests with integer coordinates and simple slopes
    - Include quest types: line from two points, find slope, find y-intercept, convert forms, 3D parametric
    - Store quest data with all required fields
    - _Requirements: 1.7, 5.1, 10.1, 10.2_
  
  - [x] 7.2 Create quest data for PLANE_GEOMETRY stage (CORE - 20 quests)
    - Generate 20 quests with rational coefficients
    - Include quest types: plane from three points, find normal, plane from point and normal, find intercepts
    - Ensure all three-point sets are non-collinear
    - _Requirements: 2.5, 5.2, 10.1, 10.6_
  
  - [x] 7.3 Create quest data for SPATIAL_RELATIONSHIPS stage (ADVANCED - 20 quests)
    - Generate 20 distance calculation quests
    - Include quest types: point-to-line 2D/3D, point-to-plane, parallel lines, parallel planes
    - _Requirements: 3.6, 5.3, 10.1_
  
  - [x] 7.4 Create quest data for SPATIAL_RELATIONSHIPS stage (ELITE - 10 quests)
    - Generate 10 comprehensive quests combining multiple concepts
    - Include quest types: line-line relationships, line-plane relationships, plane-plane relationships, intersections
    - _Requirements: 4.6, 5.4, 10.1_
  
  - [ ]* 7.5 Write property tests for quest data structure
    - **Property 19: Quest Pool Size Consistency**
    - **Property 20: BASIC Quest Integer Coordinates**
    - **Property 24: Quest Data Structure Completeness**
    - **Property 25: Coordinate and Vector Storage Format**
    - **Validates: Requirements 1.7, 2.5, 3.6, 4.6, 5.1, 5.7, 10.1, 10.2, 10.3, 10.4, 10.6**

- [x] 8. Implement buildStagePool function
  - [x] 8.1 Create buildStagePool function
    - Write `buildStagePool(t, difficulty, stage)` - returns array of quests
    - Load appropriate quest data based on difficulty and stage
    - Calculate expected answers using geometric functions
    - Build visualization data for each quest
    - _Requirements: 10.2, 11.2_
  
  - [ ]* 8.2 Write unit tests for buildStagePool
    - Test quest pool sizes for each difficulty/stage combination
    - Test quest data completeness
    - Test mathematical consistency
    - _Requirements: 10.2, 11.2_

- [x] 9. Checkpoint - Ensure quest generation works correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Implement answer verification logic
  - [x] 10.1 Create answer verification functions
    - Write `verifyNumericalAnswer(userAnswer, expected, tolerance)` - verifies with ±0.01 tolerance
    - Write `verifyAlgebraicExpression(userExpr, expectedExpr)` - checks algebraic equivalence
    - Write `normalizeExpression(expr)` - normalizes algebraic expressions for comparison
    - _Requirements: 9.1, 9.2_
  
  - [ ]* 10.2 Write property tests for answer verification
    - **Property 21: Answer Verification Tolerance**
    - **Property 22: Algebraic Expression Equivalence**
    - **Validates: Requirements 3.7, 9.1, 9.2**

- [x] 11. Create translation files
  - [x] 11.1 Create English translations (EN)
    - Add translations for: title, stage names, difficulty levels, UI buttons, instructions
    - Add scenario descriptions for all four Basel scenarios
    - Ensure mathematical notation is language-independent
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_
  
  - [x] 11.2 Create Chinese translations (CN)
    - Translate all UI text to Chinese
    - Translate scenario descriptions with cultural appropriateness
    - Maintain mathematical notation consistency
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_
  
  - [x] 11.3 Create German translations (DE)
    - Translate all UI text to German
    - Translate scenario descriptions with cultural appropriateness
    - Maintain mathematical notation consistency
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_
  
  - [ ]* 11.4 Write property test for translation completeness
    - **Property 23: Translation Completeness**
    - **Validates: Requirements 8.1, 8.2**

- [x] 12. Implement main page component (GM202AnalyticalGeometry)
  - [x] 12.1 Create GM202AnalyticalGeometry component
    - Set up component structure with ChamberLayout
    - Initialize useQuestManager hook
    - Implement difficulty and stage selection handlers
    - Implement language switching
    - Pass data to child components
    - _Requirements: 11.1, 11.2_
  
  - [ ]* 12.2 Write unit tests for main component
    - Test component renders without errors
    - Test difficulty change updates quest pool
    - Test stage change updates quest pool and visualization type
    - Test language switching updates UI text
    - _Requirements: 11.1, 11.2_

- [x] 13. Implement 2D coordinate plotter visualization
  - [x] 13.1 Create CoordinatePlotter2D component
    - Render 2D coordinate plane with x and y axes
    - Plot lines using slope-intercept or point-slope form
    - Highlight given points on the line
    - Display grid lines for reference
    - Implement zoom and pan functionality
    - Use color scheme: axes (black), grid (light gray), lines (blue), points (red)
    - _Requirements: 6.1, 6.6, 6.7_
  
  - [ ]* 13.2 Write unit tests for 2D plotter
    - Test component renders coordinate plane
    - Test lines are plotted correctly
    - Test points are highlighted
    - _Requirements: 6.1_

- [x] 14. Implement 3D space visualizer
  - [x] 14.1 Create SpaceVisualizer3D component using React Three Fiber
    - Set up 3D scene with camera and lighting
    - Render x, y, z axes with RGB colors
    - Render planes as semi-transparent surfaces (green, 0.3 opacity)
    - Render 3D lines using parametric equations (blue)
    - Render points as spheres (red)
    - Implement interactive rotation using OrbitControls
    - Implement zoom functionality
    - _Requirements: 6.2, 6.5, 6.6, 6.7_
  
  - [ ]* 14.2 Write unit tests for 3D visualizer
    - Test component renders 3D scene
    - Test geometric objects are rendered
    - Test rotation controls work
    - _Requirements: 6.2_

- [x] 15. Implement distance calculator visualization
  - [x] 15.1 Create DistanceCalculator component
    - Display geometric objects involved (point, line, or plane)
    - Highlight shortest distance segment in yellow
    - Show perpendicular indicator at closest point
    - Display distance value with units
    - Animate distance calculation process
    - _Requirements: 6.3_
  
  - [ ]* 15.2 Write unit tests for distance calculator
    - Test component renders geometric objects
    - Test distance segment is highlighted
    - Test distance value is displayed
    - _Requirements: 6.3_

- [x] 16. Implement GeometryVisualization wrapper component
  - [x] 16.1 Create GeometryVisualization component
    - Accept quest, stage, visualizationType, and data as props
    - Conditionally render CoordinatePlotter2D, SpaceVisualizer3D, or DistanceCalculator
    - Handle visualization data updates when quest changes
    - _Requirements: 6.1, 6.2, 6.3, 6.4_
  
  - [ ]* 16.2 Write integration tests for visualization switching
    - Test correct visualization renders for each stage
    - Test visualization updates when quest changes
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x] 17. Checkpoint - Ensure all visualizations render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 18. Implement quest display and input components
  - [x] 18.1 Create QuestDisplay component
    - Display scenario description
    - Display prompt text
    - Render formulas using react-katex (InlineMath and BlockMath)
    - Render input fields for user answers
    - Handle multiple input fields for complex quests
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_
  
  - [ ]* 18.2 Write unit tests for quest display
    - Test LaTeX formulas render correctly
    - Test input fields are displayed
    - Test multiple input fields work
    - _Requirements: 13.1, 13.2, 13.3_

- [x] 19. Implement feedback and navigation
  - [x] 19.1 Create FeedbackDisplay component
    - Display success feedback in green when answer is correct
    - Display error feedback in red when answer is incorrect
    - Show hints for BASIC and CORE difficulties
    - _Requirements: 9.3, 9.4, 9.6_
  
  - [x] 19.2 Implement Verify and Next buttons
    - "Verify" button triggers answer verification
    - "Next" button enabled only after successful verification
    - "Next" button loads next quest in current stage/difficulty
    - Handle quest completion and stage completion
    - _Requirements: 9.5, 11.3_
  
  - [ ]* 19.3 Write integration tests for quest flow
    - Test verify button validates answer
    - Test next button advances to next quest
    - Test quest completion flow
    - _Requirements: 9.5, 11.3_

- [x] 20. Implement responsive layout
  - [x] 20.1 Configure ChamberLayout for responsive design
    - Set up two-column layout (quests left, visualization right)
    - Implement vertical stacking for screens below 768px
    - Ensure minimum font size of 14px
    - Ensure touch targets are at least 44px tall
    - Ensure visualization scales proportionally
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_
  
  - [ ]* 20.2 Write responsive layout tests
    - Test layout switches to vertical on mobile
    - Test touch targets meet size requirements
    - Test visualization scales correctly
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

- [x] 21. Implement error handling
  - [x] 21.1 Add input validation error handling
    - Handle invalid number format
    - Handle invalid algebraic expressions
    - Handle empty input
    - Handle out of range values
    - _Requirements: 9.7_
  
  - [x] 21.2 Add quest loading error handling
    - Handle missing quest data
    - Handle invalid quest structure
    - Handle mathematically inconsistent data
    - Display loading states and error messages
    - _Requirements: 10.6_
  
  - [x] 21.3 Add visualization error handling
    - Handle 3D rendering failures with 2D fallback
    - Handle missing geometric data
    - Handle performance issues on mobile
    - _Requirements: 12.6_
  
  - [x] 21.4 Add translation error handling
    - Handle missing translation keys with English fallback
    - Handle LaTeX rendering failures with plain text fallback
    - _Requirements: 13.7_

- [x] 22. Final integration and testing
  - [x] 22.1 Wire all components together
    - Connect GM202AnalyticalGeometry → ChamberLayout → QuestDisplay + GeometryVisualization
    - Ensure data flows correctly through all components
    - Ensure state management works across component tree
    - _Requirements: All_
  
  - [ ]* 22.2 Write end-to-end integration tests
    - Test complete quest flow from start to finish
    - Test difficulty and stage switching
    - Test language switching
    - Test visualization synchronization
    - _Requirements: All_
  
  - [ ]* 22.3 Perform browser compatibility testing
    - Test on Chrome/Edge (latest)
    - Test on Firefox (latest)
    - Test on Safari (latest)
    - Test on mobile devices (iOS and Android)
    - Verify no console errors or warnings
    - _Requirements: 12.6_

- [x] 23. Final checkpoint - Ensure all tests pass and module is complete
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties with 100+ iterations
- Unit tests validate specific examples and edge cases
- Integration tests validate end-to-end flows and component interactions
- The implementation uses TypeScript for type safety and React for UI components
- Three.js (via React Three Fiber) is used for 3D visualizations
- react-katex is used for LaTeX formula rendering
- fast-check is used for property-based testing
