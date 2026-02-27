# 渲染规范

> 主流程请优先参考 [SM2.07+ 模块审查与批量修复手册](./SM_MODULE_AUDIT_PLAYBOOK.md)。  
> 本文保留为字段级速查规范。

## 字段渲染规则

| 字段 | 渲染方式 | 禁止 |
|------|---------|------|
| promptLatex | renderMixedText() | 直接传入 InlineMath/BlockMath |
| expressionLatex / targetLatex / slot.labelLatex | InlineMath math={} | 子节点写法 |
| i18n terms.* 纯公式 key | 直接写 LaTeX，不带 $ | 带 $ 包裹 |

## 数据格式

- promptLatex 混合格式：文字直接写，公式用 $...$ 包裹，例如 `计算 $a^{2}+b^{2}$`
- promptLatex 纯公式：整体用 $...$ 包裹，例如 `$\frac{x}{3}+2=5$`
- expressionLatex：直接写 LaTeX，JS 源码用双反斜杠，例如 `\\frac{x}{3}`

## 翻译规范

- 每个 key 必须在 CN/EN/DE 三个文件中同时存在
- 运行 npm run validate:translations 确认无缺失
- 禁止在页面代码中硬编码任何语言的文字

## 禁止模式

| 禁止写法 | 原因 | 正确写法 |
|---------|------|---------|
| `promptLatex: \`\\text{${t(...)}}\`` | `\text{}` 包裹 `t()` 导致红色反斜杠泄漏 | `promptLatex: t(...)` |
| `<InlineMath math={promptLatex} />` | `promptLatex` 可能含混合文本 | `{renderMixedText(promptLatex)}` |
| `expressionLatex: \`\\\\frac\`` | 四反斜杠 KaTeX 不认 | `expressionLatex: \`\\frac\`` |
| i18n `terms.*` 值带 `$` | `$` 是 `renderMixedText` 分隔符 | 直接写 LaTeX，不带 `$` |
