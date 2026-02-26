## 渲染规范

1. promptLatex 字段统一走 renderMixedText()，禁止直接传入 InlineMath 或 BlockMath
2. expressionLatex / targetLatex / slot.labelLatex 等纯公式字段走 InlineMath math={}
3. i18n 的 terms.* 类 key 不带 $ 包裹，$ 只用于 renderMixedText 的分隔符

## 数据格式

- promptLatex 混合格式：文字直接写，公式用 $...$ 包裹
- promptLatex 纯公式：整体用 $...$ 包裹
- expressionLatex：直接写 LaTeX，JS 源码用 \\frac（两反斜杠）
