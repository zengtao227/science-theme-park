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
 * Replaces KaTeX's non-breaking spaces (U+00A0) with regular spaces
 * inside .mord.text elements of the given container, enabling CSS word-wrap.
 */
function replaceKatexNbsp(el: HTMLElement) {
    const textSpans = el.querySelectorAll('.katex .mord.text .mord');
    textSpans.forEach((span) => {
        const walker = document.createTreeWalker(span, NodeFilter.SHOW_TEXT);
        let node: Text | null;
        while ((node = walker.nextNode() as Text | null)) {
            if (node.nodeValue && node.nodeValue.includes('\u00a0')) {
                node.nodeValue = node.nodeValue.replace(/\u00a0/g, ' ');
            }
        }
    });
}

/**
 * Wrapper component that renders <InlineMath> with automatic text wrapping.
 * Replaces KaTeX's non-breaking spaces in \text{} blocks with regular spaces,
 * allowing CSS word-wrap to work.
 *
 * Pair with the .katex-text-wrap CSS class in globals.css.
 */
export function KatexTextWrap({ math, className = '' }: { math: string; className?: string }) {
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (ref.current) replaceKatexNbsp(ref.current);
    });

    return (
        <div ref={ref} className={`katex-text-wrap ${className}`}>
            <InlineMath math={math} />
        </div>
    );
}

