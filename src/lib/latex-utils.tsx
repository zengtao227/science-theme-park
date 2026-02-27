'use client';

import React from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

/**
 * Normalize accidental double-backslash LaTeX commands (e.g. \\sqrt -> \sqrt)
 * before passing into InlineMath.
 */
export function normalizeInlineMath(math: string): string {
    return math.replace(/\\\\([a-zA-Z])/g, '\\$1');
}

/**
 * Preprocesses legacy promptLatex format:
 * Converts mixed "\\text{...}" + bare math into plain text + "$...$".
 * Only processes strings that contain "\\text{" and do not already contain "$".
 */
function preprocessLegacyLatex(input: string): string {
    if (!input.includes('\\text{') || input.includes('$')) {
        return input;
    }

    const result: string[] = [];
    let remaining = input;

    while (remaining.length > 0) {
        const textMatch = remaining.match(/^\\text\{([^}]*)\}/);
        if (textMatch) {
            // Convert \text{...} to plain text.
            result.push(textMatch[1]);
            remaining = remaining.slice(textMatch[0].length);
        } else {
            // Treat the segment before next \text{ as bare math.
            const nextText = remaining.search(/\\text\{/);
            const mathPart = nextText === -1 ? remaining : remaining.slice(0, nextText);
            const clean = mathPart.replace(/\\;/g, ' ').replace(/\\,/g, ' ').trim();
            if (clean) result.push(`$${clean}$`);
            remaining = nextText === -1 ? '' : remaining.slice(nextText);
        }
    }

    return result.join(' ').replace(/\s{2,}/g, ' ').trim();
}

/**
 * Renders a string that may contain LaTeX segments wrapped in $ ... $.
 * Also handles legacy "\\text{...}" mixed-format prompt strings.
 * 
 * @param text - The text to render
 * @param className - Optional CSS class for the wrapper spans
 */
export const renderMixedText = (text: string | undefined | null, className: string = "font-sans font-black whitespace-pre-wrap") => {
    if (!text) return null;
    const normalized = preprocessLegacyLatex(text);
    if (!normalized) return null;

    // Split by $...$ to handle mixed content
    const parts = normalized.split(/(\$[^$]+\$)/g);
    return (
        <>
            {parts.map((p, i) => {
                if (p.startsWith("$") && p.endsWith("$")) {
                    return <InlineMath key={i} math={normalizeInlineMath(p.slice(1, -1))} />;
                }
                return <span key={i} className={className}>{p}</span>;
            })}
        </>
    );
};
