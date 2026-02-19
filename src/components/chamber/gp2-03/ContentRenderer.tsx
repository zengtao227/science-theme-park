"use client";

import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import type { LocalizedString, Language } from "@/lib/gp2-03-types";

/**
 * ContentRenderer Component
 * 
 * Renders multilingual content with LaTeX support for mathematical notation.
 * Handles inline math ($...$) and display math ($$...$$).
 */

interface ContentRendererProps {
  content: LocalizedString;
  language: Language;
  renderMath?: boolean;
  className?: string;
}

export default function ContentRenderer({
  content,
  language,
  renderMath = true,
  className = "",
}: ContentRendererProps) {
  // Get text for current language
  const text = content[language] || content.en;

  if (!renderMath) {
    return <div className={className}>{text}</div>;
  }

  // Render with LaTeX support
  return (
    <div className={className}>
      {renderLatexContent(text)}
    </div>
  );
}

/**
 * Render content with LaTeX math support
 */
function renderLatexContent(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;
  let key = 0;

  // Pattern to match $$...$$ (display math) or $...$ (inline math)
  const mathPattern = /\$\$(.*?)\$\$|\$(.*?)\$/g;
  let match;

  while ((match = mathPattern.exec(text)) !== null) {
    // Add text before math
    if (match.index > currentIndex) {
      const textBefore = text.substring(currentIndex, match.index);
      parts.push(<span key={`text-${key++}`}>{textBefore}</span>);
    }

    // Add math content
    if (match[1] !== undefined) {
      // Display math ($$...$$)
      parts.push(
        <BlockMath key={`math-${key++}`} math={match[1]} />
      );
    } else if (match[2] !== undefined) {
      // Inline math ($...$)
      parts.push(
        <InlineMath key={`math-${key++}`} math={match[2]} />
      );
    }

    currentIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (currentIndex < text.length) {
    parts.push(<span key={`text-${key++}`}>{text.substring(currentIndex)}</span>);
  }

  return parts.length > 0 ? parts : [text];
}
