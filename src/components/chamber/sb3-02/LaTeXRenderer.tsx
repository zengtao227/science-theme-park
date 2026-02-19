/**
 * SB3.02 Biodiversity Module - LaTeX Renderer Component
 * Renders mathematical formulas using KaTeX
 */

'use client';

import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface LaTeXRendererProps {
  formula: string;
  display?: boolean; // true for block display, false for inline
  className?: string;
}

export function LaTeXRenderer({ formula, display = false, className = '' }: LaTeXRendererProps) {
  try {
    if (display) {
      return (
        <div className={`my-4 overflow-x-auto ${className}`}>
          <BlockMath math={formula} />
        </div>
      );
    } else {
      return (
        <span className={`inline-block ${className}`}>
          <InlineMath math={formula} />
        </span>
      );
    }
  } catch (error) {
    console.error('LaTeX rendering error:', error);
    return (
      <span className={`text-red-500 font-mono text-sm ${className}`}>
        [Formula error: {formula}]
      </span>
    );
  }
}

interface LaTeXContentProps {
  formulas: string[];
  display?: boolean;
}

export function LaTeXContent({ formulas, display = true }: LaTeXContentProps) {
  return (
    <div className="space-y-2">
      {formulas.map((formula, index) => (
        <LaTeXRenderer key={index} formula={formula} display={display} />
      ))}
    </div>
  );
}

// Error boundary for LaTeX rendering
interface LaTeXErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface LaTeXErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class LaTeXErrorBoundary extends React.Component<
  LaTeXErrorBoundaryProps,
  LaTeXErrorBoundaryState
> {
  constructor(props: LaTeXErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): LaTeXErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('LaTeX rendering error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="text-amber-600 bg-amber-50 p-3 rounded border border-amber-200">
            <p className="font-semibold">Formula Rendering Error</p>
            <p className="text-sm mt-1">Unable to display mathematical formula</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
