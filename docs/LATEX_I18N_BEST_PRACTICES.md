# I18N & LaTeX Rendering Best Practices for Math Modules

## 1. Problem Statement
In earlier iterations (e.g., SM1 series), mathematical expressions and internationalized prompts suffered from:
- **`frac2004` errors**: `\frac` rendering as raw text without backslashes because escaping layers stripped the backslashes before KaTeX received them.
- **`text` or `ext` errors**: Using JS string templates correctly but losing the `\t` escape sequences during React component renders due to insufficient backslashes.
- **Hardcoded Prompts**: Complex Elite-level problems were hardcoded in English inside the React component instead of being loaded dynamically from the `i18n` dictionary.

## 2. Best Practice

### Translation Object Structure
Place all prompts, labels, and scenarios in `i18n/[lang]/math.ts`. 

### `page.tsx` Prompt Formatting
When injecting a translated string into the UI, always enforce the **"Double-escaped Text Container" (4 Backslashes in Source)**:

```tsx
// DO NOT do this (renders purely as Math without font sizing/language wrapping):
promptLatex: `\\text{${t.prompts.my_prompt}}`

// DO THIS:
promptLatex: `\\\\text{${t.prompts.my_prompt}}`
```
Since it's a JS template string, the 4 backslashes interpret to 2 backslashes (`\\text{...}`) in memory. 

### LaTeX Expression Formatting
For logic and mathematical formula evaluation (e.g. `expressionLatex`, `targetLatex`, `hintLatex`), enforce the **"Single-escaped Instruction Container" (2 Backslashes in Source)**:

```tsx
// DO NOT do this (interpreted as tab/newline/etc., or strips characters for KaTeX):
expressionLatex: "\\\\frac{200}{4} \\\\times 6" // Becomes "\frac" which strips the backslash

// DO THIS:
expressionLatex: "\\frac{200}{4} \\times 6" // Becomes "\frac{200}{4} \times 6" for KaTeX
```

### Component Rendering (UI Layer)
In the React view block, use a robust Regex pattern to safely strip the `\\text{...}` wrapping from the `promptLatex` string. This allows for rich line break replacements and CSS styling specifically tailored to natural language strings (preventing forced italicization of i18n characters).

```tsx
<div className="text-2xl text-white font-medium ...">
  {(() => {
      const latex = currentQuest?.promptLatex || "";
      // Robust stripping of \text{...} wrappers for UI display
      if (latex && /^\s*\\+text\{/.test(latex) && latex.endsWith("}")) {
          const clean = latex.replace(/^\\+text\{/, "").replace(/\}$/, "").replace(/\\\\/g, "\n").replace(/\\;/g, " ");
          return <span className="font-sans font-black whitespace-pre-wrap">{clean}</span>;
      }
      return <InlineMath math={latex || ""} />;
  })()}
</div>
```

---
Applying these patterns uniformly ensures rendering stability and complete internationalization across all SM modules!
