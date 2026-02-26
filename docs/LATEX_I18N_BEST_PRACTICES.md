# I18N & LaTeX Rendering Best Practices for Math Modules

## 1. Problem Statement
In earlier iterations (e.g., SM1 and initial SM2 series), mathematical expressions and internationalized content suffered from:
- **`backslash` tragedy**: Excessive escaping (`\\\\\\\\\\\\sqrt`) or insufficient escaping leading to raw text like `\\sqrt` instead of symbols.
- **Key-as-Value Errors**: i18n keys appearing in the UI (e.g., `sm2_02.labels.hypotenuse`) because they were defined in dictionary files but not mapped to the localized `t` object in the page file.
- **Hardcoded Visual Labels**: Strings like "Leg a" or "Side b" hardcoded inside visualization components (SVGs/Canvas).
- **Aesthetic Fragmentation**: Using plain text `^2` or `sup` tags mixed with KaTeX, leading to inconsistent font weights and sizes.

## 2. Best Practices

### 2.1 Backslash Normalization
In `.tsx` or `.ts` files:
- **Memory vs Source**: To have `\sqrt` in the final string, use `\\sqrt` in the source file.
- **The "Template Literal" Trap**: Inside backticks `` `...` ``, double backslashes are often correctly interpreted. Avoid triple or quadruple backslashes unless specifically wrapping in a `\text{}` container that requires deeper layering.
- **Golden Rule**: If you see raw `\sqrt` in the browser, you have **too many** backslashes in the source. If you see `sqrt` without the symbol, you have **too few**.

### 2.2 Explicit i18n Mapping Flow
Never access i18n keys directly by string in the UI logic. Follow this flow:
1. **Define** in `src/lib/i18n/[lang]/math.ts`.
2. **Map** in the `page.tsx` local translation object (e.g., `sm2_02_t`).
3. **Inject** the mapped property into components.

```typescript
// page.tsx
const sm2_02_t = {
  labels: {
    side_a: t("sm2_02.labels.side_a"), // MUST EXPLICITLY MAP HERE
  }
};
```

### 2.3 Visualization Component Decoupling
Visual components should not have internal localization logic. Pass translated labels as props.

```tsx
// PythagorasSimple2D.tsx
interface Props {
  labels: { sideA: string; sideB: string; hyp: string; };
}

// page.tsx usage
<PythagorasSimple2D 
  labels={{
    sideA: t("sm2_02.labels.side_a"),
    sideB: t("sm2_02.labels.side_b"),
    hyp:   t("sm2_02.labels.hypotenuse"),
  }}
/>
```

### 2.4 Standardized Math Styling
- **No Unicode Hackery**: Avoid `²` or `b²`. Use `<InlineMath math="b^{2}" />`.
- **Consistency**: Use `<InlineMath>` even for single variables in stats overlays to ensure they match the font used in the main problem description.

### 2.5 LaTeX Newlines
When needing a manual line break inside a LaTeX block:
- use `\\\\` in the source string.
- In `renderMixedText`, ensure the regex handles the split correctly.

---
Applying these patterns uniformly ensures rendering stability and a premium, unified aesthetic across all Science Theme Park modules!
