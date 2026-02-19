# SC1.06 Chemical Reactions Basics - EquationBalancer Component

## Overview

The `EquationBalancer` component is an interactive tool for balancing chemical equations. It provides:

- Input fields for coefficients
- Real-time atom count updates
- Visual feedback (green/red for balanced/unbalanced elements)
- Hint generation
- Reset functionality
- Submit verification

## Requirements

This component implements the following requirements:
- 4.1: Interactive equation balancer with input fields
- 4.2: Real-time atom count updates
- 4.3: Green highlighting for balanced elements
- 4.4: Red highlighting for unbalanced elements
- 4.5: Atom count table display
- 4.6: Reset functionality
- 4.7: Hint generation
- 4.8: Coefficient validation
- 11.2: Real-time updates on coefficient change
- 11.6: Complete coefficient reset

## Usage

```tsx
import { EquationBalancer } from '@/components/sc1-06/EquationBalancer';
import { useLanguage } from '@/lib/i18n';
import { SC106Quest } from '@/lib/sc1-06-types';

function MyComponent() {
  const { t } = useLanguage();
  
  const quest: SC106Quest = {
    // ... quest data
  };

  const handleComplete = (correct: boolean) => {
    if (correct) {
      console.log('Equation balanced correctly!');
    } else {
      console.log('Equation not balanced. Try again.');
    }
  };

  return (
    <EquationBalancer 
      quest={quest} 
      onComplete={handleComplete} 
      t={t} 
    />
  );
}
```

## Props

### `quest: SC106Quest`

The quest object containing the chemical equation to balance. Must include:
- `equation.reactants`: Array of reactant compounds
- `equation.products`: Array of product compounds
- `coefficients`: Correct coefficients for verification

### `onComplete: (correct: boolean) => void`

Callback function called when the user submits their answer. Receives:
- `true` if the equation is balanced correctly
- `false` if the equation is not balanced

### `t: (key: string, params?: Record<string, string>) => string`

Translation function for internationalization. Should support the following keys:
- `sc1-06.equation_balancer.title`
- `sc1-06.equation_balancer.element`
- `sc1-06.equation_balancer.reactants`
- `sc1-06.equation_balancer.products`
- `sc1-06.equation_balancer.status`
- `sc1-06.equation_balancer.balanced`
- `sc1-06.equation_balancer.unbalanced`
- `sc1-06.equation_balancer.correct`
- `sc1-06.equation_balancer.incorrect`
- `sc1-06.equation_balancer.hint`
- `sc1-06.equation_balancer.show_hint`
- `sc1-06.equation_balancer.hide_hint`
- `sc1-06.equation_balancer.reset`
- `sc1-06.equation_balancer.submit`
- `sc1-06.equation_balancer.already_balanced`
- `sc1-06.equation_balancer.no_hint`
- `sc1-06.equation_balancer.hint_increase_products`
- `sc1-06.equation_balancer.hint_increase_reactants`

## Features

### Real-time Atom Count Updates

The component automatically recalculates atom counts whenever a coefficient is changed. The atom count table updates immediately to show the current state.

### Visual Feedback

- **Green rows**: Elements that are balanced (equal counts on both sides)
- **Red rows**: Elements that are unbalanced (different counts on both sides)
- **Green checkmark (✓)**: Balanced element
- **Red cross (✗)**: Unbalanced element

### Hint System

The hint system analyzes unbalanced elements and provides suggestions:
- Identifies which elements are unbalanced
- Suggests whether to increase reactant or product coefficients
- Shows specific element names in hints

### Coefficient Validation

Input validation ensures:
- Only positive integers are accepted (≥ 1)
- Empty inputs default to 1
- Non-numeric input is handled gracefully
- Decimal numbers are rejected

### Reset Functionality

The reset button:
- Sets all coefficients back to 1
- Clears all input fields
- Hides any displayed hints
- Clears feedback messages
- Resets submission state

## Example Quest Data

```typescript
import { createCompound } from '@/lib/sc1-06-utils';

const H2 = createCompound('H2', 'hydrogen');
const O2 = createCompound('O2', 'oxygen');
const H2O = createCompound('H2O', 'water');

const quest: SC106Quest = {
  id: 'EB_BASIC_1',
  difficulty: 'BASIC',
  stage: 'EQUATION_BALANCING',
  equation: {
    reactants: [H2, O2],
    products: [H2O],
    coefficients: [2, 1, 2], // Correct answer
    type: 'synthesis'
  },
  reactants: ['H2', 'O2'],
  products: ['H2O'],
  coefficients: [2, 1, 2],
  promptLatex: 'Balance the equation for water formation',
  equationLatex: '2\\\\text{H}_2 + \\\\text{O}_2 \\\\rightarrow 2\\\\text{H}_2\\\\text{O}',
  baselContext: 'Water formation at Basel water treatment plant'
};
```

## Accessibility

The component follows accessibility best practices:
- All interactive elements (buttons, inputs) have a minimum height of 44px
- Text is readable with a minimum font size of 14px
- Color is not the only indicator of state (uses symbols ✓ and ✗)
- Keyboard navigation is supported for all inputs and buttons

## Styling

The component uses Tailwind CSS classes and supports dark mode:
- Light mode: White backgrounds with gray borders
- Dark mode: Dark gray backgrounds with lighter borders
- Color-coded feedback: Green for success, red for errors, blue for hints

## Testing

The component includes comprehensive tests covering:
- Initial rendering
- Atom count table display
- Coefficient input handling
- Hint display toggle
- Reset functionality
- Correct answer submission
- Incorrect answer submission

Run tests with:
```bash
npm test -- src/__tests__/sc1-06-equation-balancer.test.tsx
```

## Dependencies

- React 18+
- react-katex (for LaTeX rendering)
- @/lib/sc1-06-utils (utility functions)
- @/lib/sc1-06-types (TypeScript types)
- @/lib/sc1-06-latex (LaTeX components)

## Browser Support

The component works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Android Chrome)
