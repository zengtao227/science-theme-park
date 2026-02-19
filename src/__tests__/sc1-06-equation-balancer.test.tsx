/**
 * SC1.06 EquationBalancer Component Tests
 * 
 * Tests for the EquationBalancer component functionality
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EquationBalancer } from '../components/sc1-06/EquationBalancer';
import { SC106Quest } from '../lib/sc1-06-types';
import { createCompound } from '../lib/sc1-06-utils';

// Mock translation function
const mockT = (key: string, params?: Record<string, string>) => {
  const translations: Record<string, string> = {
    'sc1-06.equation_balancer.title': 'Balance the Chemical Equation',
    'sc1-06.equation_balancer.element': 'Element',
    'sc1-06.equation_balancer.reactants': 'Reactants',
    'sc1-06.equation_balancer.products': 'Products',
    'sc1-06.equation_balancer.status': 'Status',
    'sc1-06.equation_balancer.balanced': '✓ Equation is balanced!',
    'sc1-06.equation_balancer.unbalanced': '✗ Equation is not balanced',
    'sc1-06.equation_balancer.correct': 'Correct! The equation is balanced.',
    'sc1-06.equation_balancer.incorrect': 'Incorrect. The equation is not balanced. Check the atom counts.',
    'sc1-06.equation_balancer.show_hint': 'Show Hint',
    'sc1-06.equation_balancer.hide_hint': 'Hide Hint',
    'sc1-06.equation_balancer.reset': 'Reset',
    'sc1-06.equation_balancer.submit': 'Submit',
    'sc1-06.equation_balancer.already_balanced': 'The equation is already balanced!',
    'sc1-06.equation_balancer.no_hint': 'No hint available.',
    'sc1-06.equation_balancer.hint_increase_products': `Try increasing the coefficient for a product containing ${params?.element || '{element}'}`,
    'sc1-06.equation_balancer.hint_increase_reactants': `Try increasing the coefficient for a reactant containing ${params?.element || '{element}'}`
  };
  return translations[key] || key;
};

// Create a simple test quest: H2 + O2 → H2O (coefficients: 2, 1, 2)
const createTestQuest = (): SC106Quest => {
  const H2 = createCompound('H2', 'hydrogen');
  const O2 = createCompound('O2', 'oxygen');
  const H2O = createCompound('H2O', 'water');

  return {
    id: 'TEST_QUEST_1',
    difficulty: 'BASIC',
    stage: 'EQUATION_BALANCING',
    equation: {
      reactants: [H2, O2],
      products: [H2O],
      coefficients: [2, 1, 2],
      type: 'synthesis'
    },
    reactants: ['H2', 'O2'],
    products: ['H2O'],
    coefficients: [2, 1, 2],
    promptLatex: 'Balance the equation',
    equationLatex: '2\\\\text{H}_2 + \\\\text{O}_2 \\\\rightarrow 2\\\\text{H}_2\\\\text{O}',
    baselContext: 'Test context'
  };
};

describe('EquationBalancer Component', () => {
  let mockOnComplete: jest.Mock;

  beforeEach(() => {
    mockOnComplete = jest.fn();
  });

  test('renders the component with initial state', () => {
    const quest = createTestQuest();
    render(<EquationBalancer quest={quest} onComplete={mockOnComplete} t={mockT} />);

    // Check if title is rendered
    expect(screen.getByText('Balance the Chemical Equation')).toBeInTheDocument();

    // Check if buttons are rendered
    expect(screen.getByText('Show Hint')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('displays atom count table', () => {
    const quest = createTestQuest();
    render(<EquationBalancer quest={quest} onComplete={mockOnComplete} t={mockT} />);

    // Check if table headers are present
    expect(screen.getByText('Element')).toBeInTheDocument();
    expect(screen.getByText('Reactants')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  test('allows coefficient input', () => {
    const quest = createTestQuest();
    render(<EquationBalancer quest={quest} onComplete={mockOnComplete} t={mockT} />);

    // Get all input fields
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBe(3); // H2, O2, H2O

    // Change first coefficient
    fireEvent.change(inputs[0], { target: { value: '2' } });
    expect(inputs[0]).toHaveValue('2');
  });

  test('shows hint when hint button is clicked', () => {
    const quest = createTestQuest();
    render(<EquationBalancer quest={quest} onComplete={mockOnComplete} t={mockT} />);

    // Click show hint button
    const hintButton = screen.getByText('Show Hint');
    fireEvent.click(hintButton);

    // Check if hint button text changes
    expect(screen.getByText('Hide Hint')).toBeInTheDocument();
  });

  test('resets coefficients when reset button is clicked', () => {
    const quest = createTestQuest();
    render(<EquationBalancer quest={quest} onComplete={mockOnComplete} t={mockT} />);

    // Get input fields
    const inputs = screen.getAllByRole('textbox');

    // Change a coefficient
    fireEvent.change(inputs[0], { target: { value: '5' } });
    expect(inputs[0]).toHaveValue('5');

    // Click reset button
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);

    // Check if coefficient is reset to 1
    expect(inputs[0]).toHaveValue('1');
  });

  test('calls onComplete with correct value when equation is balanced', () => {
    const quest = createTestQuest();
    render(<EquationBalancer quest={quest} onComplete={mockOnComplete} t={mockT} />);

    // Get input fields
    const inputs = screen.getAllByRole('textbox');

    // Set correct coefficients: 2, 1, 2
    fireEvent.change(inputs[0], { target: { value: '2' } });
    fireEvent.change(inputs[1], { target: { value: '1' } });
    fireEvent.change(inputs[2], { target: { value: '2' } });

    // Click submit button
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    // Check if onComplete was called with true
    expect(mockOnComplete).toHaveBeenCalledWith(true);
  });

  test('calls onComplete with false when equation is not balanced', () => {
    const quest = createTestQuest();
    render(<EquationBalancer quest={quest} onComplete={mockOnComplete} t={mockT} />);

    // Get input fields
    const inputs = screen.getAllByRole('textbox');

    // Set incorrect coefficients: 1, 1, 1
    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.change(inputs[1], { target: { value: '1' } });
    fireEvent.change(inputs[2], { target: { value: '1' } });

    // Click submit button
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    // Check if onComplete was called with false
    expect(mockOnComplete).toHaveBeenCalledWith(false);
  });
});
