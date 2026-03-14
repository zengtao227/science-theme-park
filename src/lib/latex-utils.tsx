'use client';

import React from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const SUPERSCRIPT_MAP: Record<string, string> = {
    '0': '⁰',
    '1': '¹',
    '2': '²',
    '3': '³',
    '4': '⁴',
    '5': '⁵',
    '6': '⁶',
    '7': '⁷',
    '8': '⁸',
    '9': '⁹',
    '+': '⁺',
    '-': '⁻',
    '=': '⁼',
    '(': '⁽',
    ')': '⁾',
    n: 'ⁿ',
    i: 'ⁱ',
};

const SUBSCRIPT_MAP: Record<string, string> = {
    '0': '₀',
    '1': '₁',
    '2': '₂',
    '3': '₃',
    '4': '₄',
    '5': '₅',
    '6': '₆',
    '7': '₇',
    '8': '₈',
    '9': '₉',
    '+': '₊',
    '-': '₋',
    '=': '₌',
    '(': '₍',
    ')': '₎',
};

function convertScriptGroup(content: string, map: Record<string, string>, originalPrefix: '^' | '_'): string {
    const converted = [...content].map((ch) => map[ch]);
    if (converted.every(Boolean)) {
        return converted.join('');
    }
    return `${originalPrefix}{${content}}`;
}

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
 * Converts plain-text LaTeX-like exponent/subscript markers into readable Unicode forms.
 * Example: x^{2} -> x², h_1 -> h₁
 */
export function normalizePlainMathNotation(text: string): string {
    return text
        .replace(/\^\{([^{}]+)\}/g, (_, content: string) => convertScriptGroup(content, SUPERSCRIPT_MAP, '^'))
        .replace(/_\{([^{}]+)\}/g, (_, content: string) => convertScriptGroup(content, SUBSCRIPT_MAP, '_'))
        .replace(/_([0-9+\-=()]+)/g, (_, content: string) => convertScriptGroup(content, SUBSCRIPT_MAP, '_'));
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
    const preprocessed = preprocessLegacyLatex(text);
    if (!preprocessed) return null;
    const normalized = preprocessed.includes('$') ? preprocessed : normalizePlainMathNotation(preprocessed);

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

/**
 * Parses a LaTeX expression string and splits it into text segments
 * (from \text{...}) and math segments (everything else).
 */
function parseLatexSegments(latex: string): Array<{ type: 'text' | 'math'; content: string }> {
    const segments: Array<{ type: 'text' | 'math'; content: string }> = [];
    let i = 0;
    let currentMath = '';

    while (i < latex.length) {
        // Check for \text{ (handles both \text{ and \\text{ from template literals)
        if (latex.startsWith('\\text{', i)) {
            if (currentMath.trim()) {
                segments.push({ type: 'math', content: currentMath.trim() });
            }
            currentMath = '';

            i += 6; // Skip past \text{

            // Find matching closing brace, handling nested braces
            let depth = 1;
            let textContent = '';
            while (i < latex.length && depth > 0) {
                if (latex[i] === '{') depth++;
                else if (latex[i] === '}') {
                    depth--;
                    if (depth === 0) break;
                }
                textContent += latex[i];
                i++;
            }
            i++; // Skip closing }

            if (textContent) {
                segments.push({ type: 'text', content: textContent });
            }
        } else {
            currentMath += latex[i];
            i++;
        }
    }

    if (currentMath.trim()) {
        segments.push({ type: 'math', content: currentMath.trim() });
    }

    return segments;
}

/**
 * Renders a LaTeX expression with automatic text wrapping.
 *
 * Parses the LaTeX string to split \text{...} blocks (rendered as plain
 * wrappable HTML) from math segments (rendered via <InlineMath>).
 * This avoids fighting KaTeX's internal CSS layout.
 */
export function KatexTextWrap({ math, className = '' }: { math: string; className?: string }) {
    const segments = parseLatexSegments(math);

    // If no \text{} blocks found, fall back to plain InlineMath
    if (segments.length === 1 && segments[0].type === 'math') {
        return (
            <span className={className}>
                <InlineMath math={math} />
            </span>
        );
    }

    return (
        <span className={className} style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
            {segments.map((seg, i) =>
                seg.type === 'text'
                    ? <span key={i}>{seg.content}</span>
                    : <InlineMath key={i} math={seg.content} />
            )}
        </span>
    );
}


