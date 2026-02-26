'use client';

import React from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

/**
 * Renders a string that may contain LaTeX segments wrapped in $ ... $.
 * Also handles robust stripping of \\text{...} wrappers for backward compatibility with some legacy patterns.
 * 
 * @param text - The text to render
 * @param className - Optional CSS class for the wrapper spans
 */
export const renderMixedText = (text: string | undefined | null, className: string = "font-sans font-black whitespace-pre-wrap") => {
    if (!text) return null;

    // Handle robust stripping of legacy \\text{...} wrappers if the whole string is wrapped
    if (/^\s*\\+text\{/.test(text) && text.endsWith("}")) {
        const stripped = text
            .replace(/^\\+text\{/, "")
            .replace(/\}$/, "")
            .replace(/\\\\/g, "\n")
            .replace(/\\;/g, " ");
        return <span className={className}>{stripped}</span>;
    }

    // Split by $...$ to handle mixed content
    const parts = text.split(/(\$[^$]+\$)/g);
    return (
        <>
            {parts.map((p, i) => {
                if (p.startsWith("$") && p.endsWith("$")) {
                    return <InlineMath key={i} math={p.slice(1, -1)} />;
                }
                return <span key={i} className={className}>{p}</span>;
            })}
        </>
    );
};
