/**
 * SC1.06 Chemical Reactions Basics - LaTeX Rendering Utilities
 * 
 * This file provides utilities for rendering chemical equations using react-katex
 * with the four-backslash standard (\\\\text{}, \\\\rightarrow).
 * 
 * Requirements: 1.4, 12.1, 12.2, 12.3, 12.4
 */

'use client';

import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

/**
 * Inline chemical formula component using react-katex
 * Uses InlineMath for inline display
 * 
 * @param latex - LaTeX string with four backslashes (e.g., "\\\\text{H}_2\\\\text{O}")
 */
export function ChemicalFormula({ latex }: { latex: string }) {
  try {
    return <InlineMath math={latex} />;
  } catch (error) {
    console.error('LaTeX rendering error:', error);
    // Fallback to plain text if LaTeX fails
    return <span className="text-red-500">{latex}</span>;
  }
}

/**
 * Block chemical equation component using react-katex
 * Uses BlockMath for centered display
 * 
 * @param latex - LaTeX string with four backslashes (e.g., "2\\\\text{H}_2 + \\\\text{O}_2 \\\\rightarrow 2\\\\text{H}_2\\\\text{O}")
 */
export function ChemicalEquation({ latex }: { latex: string }) {
  try {
    return <BlockMath math={latex} />;
  } catch (error) {
    console.error('LaTeX rendering error:', error);
    // Fallback to plain text if LaTeX fails
    return <div className="text-center text-red-500">{latex}</div>;
  }
}

/**
 * Inline math component (re-export from react-katex for convenience)
 */
export { InlineMath, BlockMath };
