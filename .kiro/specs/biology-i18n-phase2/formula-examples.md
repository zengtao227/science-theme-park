# GB2.01 KaTeX Formula Examples

## Nernst Equation Display

### Main Formula (expressionLatex)
```latex
E = 61 \log_{10}\left(\frac{[C]_{out}}{[C]_{in}}\right)
```

This renders as a centered, display-style equation showing:
- E = equilibrium potential
- 61 = constant at 37°C
- log₁₀ = logarithm base 10 (subscript)
- [C]ₒᵤₜ / [C]ᵢₙ = concentration ratio with subscripts

### Example Calculations

#### Potassium (K⁺)
```latex
E_{K^+} = 61 \log_{10}\left(\frac{5}{140}\right) = -88 \text{ mV}
```

#### Sodium (Na⁺)
```latex
E_{Na^+} = 61 \log_{10}\left(\frac{145}{15}\right) = 60 \text{ mV}
```

#### Chloride (Cl⁻)
```latex
E_{Cl^-} = 61 \log_{10}\left(\frac{100}{10}\right) = -61 \text{ mV}
```

## Ion Notation

### Single Positive Charge
- Sodium: `Na^+` → Na⁺
- Potassium: `K^+` → K⁺

### Double Positive Charge
- Calcium: `Ca^{2+}` → Ca²⁺

### Single Negative Charge
- Chloride: `Cl^-` → Cl⁻

## Multilingual Integration

### English
```
Given Na^+ outside is 145 and inside is 15, calculate equilibrium potential.
```

### Chinese (中文)
```
已知Na^+细胞外浓度为145，细胞内浓度为15，计算平衡电位。
```

### German (Deutsch)
```
Gegeben sind Na^+ außen = 145 und innen = 15. Berechnen Sie das Gleichgewichtspotential.
```

## Hint Text (All Languages)

### English
```
Use the Nernst Equation: E = 61 log10(C_out/C_in) at 37°C.
```

### Chinese
```
使用能斯特方程：E = 61 log10(C_out/C_in)，在37°C时。
```

### German
```
Verwenden Sie die Nernst-Gleichung: E = 61 log10(C_out/C_in) bei 37°C.
```

**Note:** Hint text is displayed as plain text (wrapped in `\text{}`) for readability. The actual formula display uses proper LaTeX formatting.

## Verification Checklist

- [x] Nernst equation uses proper LaTeX syntax
- [x] Logarithm subscript (log₁₀) renders correctly
- [x] Fraction notation with proper parentheses
- [x] Concentration subscripts (out/in) display properly
- [x] Ion superscripts (⁺, ²⁺, ⁻) render correctly
- [x] Formula consistent across all three languages
- [x] Text integrates seamlessly with formulas
- [x] BlockMath used for display equations
- [x] InlineMath used for inline formulas
- [x] Scientific accuracy maintained (37°C, correct formula)
