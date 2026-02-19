# SM2.09 Inequalities Module - Visualization Components

This directory contains the interactive visualization components for the SM2.09 Inequalities module.

## Components

### 1. NumberLineVisualizer

Displays inequality solutions on an interactive number line.

**Features:**
- Renders horizontal number line with appropriate scale
- Displays solution intervals with shaded regions
- Shows boundary points as filled circles (inclusive) or open circles (exclusive)
- Supports draggable boundary points for exploration
- Displays interval notation below the number line
- Handles single intervals and unions of intervals
- Supports infinite bounds with arrow indicators

**Props:**
```typescript
interface NumberLineVisualizerProps {
    intervals: Interval | Interval[];
    onBoundaryDrag?: (value: number, boundaryType: 'start' | 'end', intervalIndex: number) => void;
    minValue?: number;
    maxValue?: number;
    showIntervalNotation?: boolean;
    interactive?: boolean;
}
```

**Usage:**
```tsx
<NumberLineVisualizer
    intervals={{ start: -3, end: 5, startInclusive: false, endInclusive: true }}
    minValue={-10}
    maxValue={10}
    showIntervalNotation={true}
    interactive={false}
/>
```

### 2. GraphPlotter

Visualizes two-variable inequality systems on a coordinate plane.

**Features:**
- Renders coordinate system with x and y axes
- Displays boundary lines (solid for ≤/≥, dashed for </> )
- Shades solution regions using semi-transparent fill
- Supports multiple inequalities simultaneously
- Highlights intersection regions for systems
- Displays legend showing which color corresponds to which inequality
- Uses pixel-by-pixel checking to accurately shade solution regions

**Props:**
```typescript
interface GraphPlotterProps {
    inequalities: string[];
    xMin?: number;
    xMax?: number;
    yMin?: number;
    yMax?: number;
    showLegend?: boolean;
}
```

**Usage:**
```tsx
<GraphPlotter
    inequalities={['y > x + 1', 'y < -x + 5']}
    xMin={-10}
    xMax={10}
    yMin={-10}
    yMax={10}
    showLegend={true}
/>
```

### 3. SolutionSetVisualizer

Displays solution sets in multiple representations.

**Features:**
- Shows interval notation: (-∞, 5] ∪ [3, ∞)
- Shows set-builder notation: {x | x ≤ 5 or x ≥ 3}
- Shows graphical representation (number line)
- Handles empty set (∅) and all real numbers (ℝ)
- Supports compound inequalities and disjunctions
- Provides solution description in natural language

**Props:**
```typescript
interface SolutionSetVisualizerProps {
    intervals: Interval | Interval[];
    solutionType: SolutionType;
    showIntervalNotation?: boolean;
    showSetBuilder?: boolean;
    showGraphical?: boolean;
    variable?: string;
}
```

**Usage:**
```tsx
<SolutionSetVisualizer
    intervals={{ start: -Infinity, end: 5, startInclusive: false, endInclusive: true }}
    solutionType="INTERVAL"
    showIntervalNotation={true}
    showSetBuilder={true}
    showGraphical={true}
    variable="x"
/>
```

### 4. InequalityVisualization (Container)

Main container component that routes to appropriate visualizers based on quest type.

**Features:**
- Automatically selects appropriate visualization based on quest stage and type
- For INEQUALITY_BASICS: Shows number line and solution set
- For SYSTEMS (one-variable): Shows number line with system information
- For SYSTEMS (two-variable): Shows graph plotter
- For ABSOLUTE_VALUE: Shows number line with absolute value expression
- Displays quest information (ID, difficulty, stage, type)
- Provides consistent layout and styling

**Props:**
```typescript
interface InequalityVisualizationProps {
    quest: SM209Quest;
    stage: Stage;
    onBoundaryDrag?: (value: number) => void;
    translations: {
        number_line: string;
        graph: string;
        solution_set: string;
    };
}
```

**Usage:**
```tsx
<InequalityVisualization
    quest={quest}
    stage="INEQUALITY_BASICS"
    onBoundaryDrag={(value) => console.log('Boundary dragged to:', value)}
    translations={{
        number_line: 'Number Line',
        graph: 'Graph',
        solution_set: 'Solution Set'
    }}
/>
```

## Demo Component

The `VisualizationDemo.tsx` component provides a comprehensive demonstration of all visualization components. It includes:

- Interactive demo selector
- Examples of single intervals and unions
- System of inequalities visualization
- Empty set and all reals examples
- Full visualization container examples

To use the demo, import and render it in your application:

```tsx
import { VisualizationDemo } from '@/components/chamber/sm2-09/VisualizationDemo';

function App() {
    return <VisualizationDemo />;
}
```

## Design Decisions

### Color Scheme
- **Blue (#3B82F6)**: Primary color for solution regions and boundary points
- **Purple (#9333EA)**: Intersection regions in graph plotter
- **Multiple colors**: Different inequalities in systems (Blue, Red, Green, Purple, Orange)

### Boundary Rendering
- **Filled circles**: Inclusive boundaries (≤, ≥)
- **Open circles**: Exclusive boundaries (<, >)
- **Solid lines**: Inclusive boundary lines (≤, ≥)
- **Dashed lines**: Exclusive boundary lines (<, >)

### Interactive Features
- Draggable boundary points on number line (when `interactive={true}`)
- Hover effects on interactive elements
- Touch-friendly targets (44x44 pixels minimum)

### Responsive Design
- All components use responsive layouts
- SVG and Canvas elements scale appropriately
- Mobile-friendly touch targets
- Readable on both desktop and mobile devices

## Requirements Validation

These components satisfy the following requirements from the design document:

- **Requirement 3.1-3.7**: Interactive visualizations (number line, graph plotter, solution set)
- **Requirement 12.1-12.6**: Inequality graph shading with proper boundary line styling
- **Requirement 13.1-13.6**: Number line interaction with proper boundary point rendering
- **Requirement 14.5**: Absolute value inequality dual interval display
- **Requirement 15.1-15.5**: Inequality system visualization with intersection regions

## Testing

To test the components:

1. Run the demo component to visually verify all features
2. Test with various interval types (single, union, empty, all reals)
3. Test with different inequality types (linear, system, absolute value)
4. Test interactive features (boundary dragging)
5. Test responsive behavior on different screen sizes

## Future Enhancements

Potential improvements for future iterations:

- Animation when transitioning between solutions
- Zoom and pan controls for graph plotter
- Export visualization as image
- More sophisticated shading algorithms for complex regions
- 3D visualization for three-variable systems
- Interactive point testing (click to check if point is in solution)
