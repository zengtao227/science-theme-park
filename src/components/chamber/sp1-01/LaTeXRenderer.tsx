'use client';

/**
 * SP1.01 - Forces Basics Module
 * LaTeX Rendering Component
 */

import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface LaTeXRendererProps {
  content: string;
  inline?: boolean;
  className?: string;
}

/**
 * LaTeX Renderer Component
 * Renders mathematical notation using KaTeX
 */
export function LaTeXRenderer({
  content,
  inline = false,
  className = '',
}: LaTeXRendererProps) {
  try {
    // Check if content is empty or only whitespace
    if (!content || !content.trim()) return null;

    // Detect if the content is plain text and needs \text{} wrapper
    // Especially if it contains non-ASCII characters (like Chinese)
    const needsTextWrapper = /[^\x00-\x7F]/.test(content) && !content.includes('\\text{');
    const finalContent = needsTextWrapper ? `\\text{${content}}` : content;

    if (inline) {
      return <InlineMath math={finalContent} />;
    } else {
      return (
        <div className={className}>
          <BlockMath math={finalContent} />
        </div>
      );
    }
  } catch (error) {
    console.error('LaTeX rendering error:', error);
    return (
      <span className="text-red-500">
        Error rendering math: {content}
      </span>
    );
  }
}

/**
 * Parse text with inline LaTeX expressions
 * Supports $...$ for inline math and $$...$$ for block math
 */
export function parseLatexContent(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;
  let key = 0;

  // Match $$...$$ (block) or $...$ (inline)
  const regex = /\$\$(.*?)\$\$|\$(.*?)\$/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > currentIndex) {
      parts.push(
        <span key={`text-${key++}`}>
          {text.substring(currentIndex, match.index)}
        </span>
      );
    }

    // Add LaTeX content
    const isBlock = match[0].startsWith('$$');
    const latexContent = isBlock ? match[1] : match[2];

    parts.push(
      <LaTeXRenderer
        key={`latex-${key++}`}
        content={latexContent}
        inline={!isBlock}
      />
    );

    currentIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (currentIndex < text.length) {
    parts.push(<span key={`text-${key++}`}>{text.substring(currentIndex)}</span>);
  }

  return parts.length > 0 ? parts : [text];
}

/**
 * Component that automatically parses and renders LaTeX in text
 */
export function LaTeXText({
  children,
  className = '',
}: {
  children: string;
  className?: string;
}) {
  const content = parseLatexContent(children);

  return <div className={className}>{content}</div>;
}

/**
 * Format vector notation with arrow
 */
export function VectorNotation({ symbol }: { symbol: string }) {
  return <LaTeXRenderer content={`\\vec{${symbol}}`} inline />;
}

/**
 * Format force equation with units
 */
export function ForceEquation({
  left,
  right,
  units,
}: {
  left: string;
  right: string;
  units?: string;
}) {
  const equation = units ? `${left} = ${right}\\,\\text{${units}}` : `${left} = ${right}`;
  return <LaTeXRenderer content={equation} />;
}
