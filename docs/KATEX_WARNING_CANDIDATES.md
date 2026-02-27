# KaTeX Warning Candidates (with line numbers)

This list is generated from static scans because `next build` warning lines do not include file paths.

## 1) `unicodeTextInMathMode` candidates

### High-confidence (degree symbol inside math)
- `src/components/chamber/gm4-01/ComplexVisualization.tsx:783`
- `src/components/chamber/gm4-01/ComplexVisualization.tsx:784`

### High-confidence (German umlauts inside `\\text{...}` LaTeX strings)
- `src/lib/i18n/de/physics.ts:1371-1430`
- `src/lib/i18n/de/physics.ts:1489`
- `src/lib/i18n/de/physics.ts:1491`
- `src/lib/i18n/de/math.ts:196`
- `src/lib/i18n/de/math.ts:392`
- `src/lib/i18n/de/math.ts:394`
- `src/lib/i18n/de/math.ts:422`
- `src/lib/i18n/de/math.ts:639`
- `src/lib/i18n/de/math.ts:1552`
- `src/lib/i18n/de/math.ts:1624`
- `src/lib/i18n/de/math.ts:1625`
- `src/lib/i18n/de/math.ts:1626`
- `src/lib/i18n/de/math.ts:1874`
- `src/lib/i18n/de/math.ts:1875`
- `src/lib/i18n/de/math.ts:1906`
- `src/lib/i18n/de/math.ts:2019`
- `src/lib/i18n/de/math.ts:2024`
- `src/lib/i18n/de/math.ts:2027`
- `src/lib/i18n/de/math.ts:2250`
- `src/lib/i18n/de/math.ts:2379`
- `src/lib/i18n/de/math.ts:2380`
- `src/lib/i18n/de/math.ts:2384`
- `src/lib/i18n/de/biology.ts:731`
- `src/lib/i18n/de/biology.ts:1088`
- `src/lib/i18n/de/chemistry.ts:474`
- `src/lib/i18n/de/chemistry.ts:675`

## 2) `newLineInDisplayMode` candidates

These lines contain explicit matrix row breaks `\\` inside BlockMath (often valid in `bmatrix`, but included for review):
- `src/components/chamber/em2-01/MatrixVisualization2D.tsx:160`
- `src/app/chamber/em2-01/page.tsx:283`
- `src/app/chamber/em2-01/page.tsx:284`

## 3) Regeneration Commands

```bash
# unicode in LaTeX text blocks
rg -nP '\\\\text\\{[^}]*[äöüÄÖÜß]' src/lib/i18n/de --glob '*.ts'

# non-ascii in math-like fields (app/components)
rg -nP '(expressionLatex|targetLatex|correctLatex|labelLatex|math=)[^\\n]*[^[:ascii:]]' src/app src/components --glob '*.tsx'

# display math with row-break style escapes
rg -n 'BlockMath math=\\{.*\\\\\\\\' src/app src/components --glob '*.tsx'
```
