/**
 * GB2.02 Endocrine System - LaTeX Rendering Utilities
 * 
 * This module provides utilities for rendering scientific notation and hormone formulas
 * using react-katex. It handles subscripts, superscripts, and Greek letters.
 */

import React from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

/**
 * Renders hormone notation with proper LaTeX formatting
 * @param latex - LaTeX string to render
 * @returns React component with rendered LaTeX
 */
export function renderHormoneLatex(latex: string): React.ReactElement {
  try {
    return <InlineMath math={latex} />;
  } catch (error) {
    console.error('LaTeX rendering error:', error);
    // Fallback to plain text if LaTeX fails
    return <span>{latex}</span>;
  }
}

/**
 * Converts hormone abbreviations to LaTeX format
 * @param abbreviation - Hormone abbreviation (e.g., "T3", "T4", "TSH")
 * @returns LaTeX string with proper formatting
 */
export function hormoneToLatex(abbreviation: string): string {
  const conversions: Record<string, string> = {
    'T3': 'T_3',
    'T4': 'T_4',
    'TSH': '\\text{TSH}',
    'ACTH': '\\text{ACTH}',
    'FSH': '\\text{FSH}',
    'LH': '\\text{LH}',
    'ADH': '\\text{ADH}',
    'PTH': '\\text{PTH}',
    'GH': '\\text{GH}',
    'CRH': '\\text{CRH}',
    'TRH': '\\text{TRH}',
    'GHRH': '\\text{GHRH}',
    'GnRH': '\\text{GnRH}',
    'hCG': '\\text{hCG}',
  };

  return conversions[abbreviation] || `\\text{${abbreviation}}`;
}

/**
 * Converts plain text hormone name to LaTeX format
 * @param name - Hormone name (e.g., "insulin", "cortisol")
 * @returns LaTeX string
 */
export function hormoneNameToLatex(name: string): string {
  // Capitalize first letter and wrap in \text{}
  const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
  return `\\text{${capitalized}}`;
}

/**
 * Renders a hormone name with LaTeX formatting
 * @param name - Hormone name or abbreviation
 * @returns React component with rendered hormone name
 */
export function HormoneDisplay({ name }: { name: string }): React.ReactElement {
  const latex = hormoneToLatex(name);
  return renderHormoneLatex(latex);
}

/**
 * Renders Greek letters in LaTeX
 * @param letter - Greek letter name (e.g., "alpha", "beta", "delta")
 * @returns LaTeX string
 */
export function greekLetterToLatex(letter: string): string {
  const greekLetters: Record<string, string> = {
    'alpha': '\\alpha',
    'beta': '\\beta',
    'gamma': '\\gamma',
    'delta': '\\Delta',
    'epsilon': '\\epsilon',
    'theta': '\\theta',
    'lambda': '\\lambda',
    'mu': '\\mu',
    'pi': '\\pi',
    'sigma': '\\sigma',
    'omega': '\\omega',
  };

  return greekLetters[letter.toLowerCase()] || letter;
}

/**
 * Formats a chemical concentration with units
 * @param value - Numeric value
 * @param unit - Unit string (e.g., "mIU/L", "ng/dL")
 * @returns LaTeX string with formatted concentration
 */
export function concentrationToLatex(value: number, unit: string): string {
  return `${value}\\,\\text{${unit}}`;
}

/**
 * Renders a lab result value with units
 * @param value - Numeric value
 * @param unit - Unit string
 * @returns React component with rendered value and unit
 */
export function LabValueDisplay({ value, unit }: { value: number; unit: string }): React.ReactElement {
  const latex = concentrationToLatex(value, unit);
  return renderHormoneLatex(latex);
}

/**
 * Formats a reference range
 * @param min - Minimum value
 * @param max - Maximum value
 * @param unit - Unit string
 * @returns LaTeX string with formatted range
 */
export function referenceRangeToLatex(min: number, max: number, unit: string): string {
  return `${min}\\text{-}${max}\\,\\text{${unit}}`;
}

/**
 * Renders a reference range
 * @param min - Minimum value
 * @param max - Maximum value
 * @param unit - Unit string
 * @returns React component with rendered range
 */
export function ReferenceRangeDisplay({ 
  min, 
  max, 
  unit 
}: { 
  min: number; 
  max: number; 
  unit: string;
}): React.ReactElement {
  const latex = referenceRangeToLatex(min, max, unit);
  return renderHormoneLatex(latex);
}
