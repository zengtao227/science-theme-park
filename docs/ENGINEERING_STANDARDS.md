# 🎯 Engineering Standards & Guidelines

This document consolidates our architectural, design, and data standards to ensure consistency across the Science Theme Park platform.

---

## 🏗️ 1. Architecture Standards

### 1.1 Unified Layout
All laboratory/chamber modules **must** use the `ChamberLayout` component for a consistent UI/UX.
- **Left Panel**: Interactive quest system.
- **Right Panel (Monitor)**: Real-time 2D/3D visualization.

### 1.2 State Management
All modules **must** use the `useQuestManager` hook to manage:
- Difficulty levels (BASIC, CORE, ADVANCED, ELITE).
- Stage management.
- Input validation & tolerance.
- Progress tracking and persistence.
- Hint & error tracking systems.

---

## 🧪 2. Quest & Pedagogy Standards

### 2.1 The 4-Level Difficulty System
Difficulty is defined by **conceptual depth**, not just "bigger numbers".
- **BASIC**: Fundamental definitions, direct observation, simple mental calculation.
- **CORE**: Multi-step reasoning, combination of concepts, pencil-and-paper complexity.
- **ADVANCED**: Conditional logic, constraints, changing sample spaces or parameters.
- **ELITE**: Interdisciplinary synthesis, decomposition of complex problems, competition-level strategies.

### 2.2 Quest Quantity
Each stage in a module should ideally have **4-5 unique quests per difficulty level** to ensure adequate practice without feeling repetitive.

---

## 🌍 3. Internationalization (i18n) & Scenarios

### 3.1 Trilingualism
Complete support for **English (EN)**, **Chinese (CN)**, and **German (DE)** is mandatory.
- No hardcoded strings in components.
- Accurate mapping of technical terms (e.g., "Momentum" vs "Impuls" vs "动量").

### 3.2 Detailed Scenarios (The Basel Narrative)
Every quest must be grounded in a concrete real-world context, preferably using **Basel-specific locations and companies**.
- **Role**: Define the user's role (e.g., Engineer at Roche).
- **Location**: Roche Tower, Rhine River, University of Basel, etc.
- **Mission**: Clear "why" behind the calculation.
- **Length**: 3-5 sentences (80-250 characters).

---

## 🔢 4. LaTeX & Mathematical Standards (CRITICAL)

> **原则**：本项目面向中学生和高中生。所有数学表达式必须以学生在教科书和考试中看到的标准形式呈现。**任何看起来像"源代码"的数学表达都是不合格的。**

### 4.1 The Quadruple-Backslash Rule (\\\\\\\\)
In TypeScript strings (i18n files, pool builders), use **quadruple backslashes** for LaTeX commands.
- `\\\\\\\\text{kg}` instead of `\\\\text{kg}`.
- For environment line breaks (`\\\\`), use **eight backslashes** (`\\\\\\\\\\\\\\\\`).

### 4.2 Rendering Rules (必须遵守)

| 数学概念 | ❌ 错误显示 (Plain Text) | ✅ 正确 LaTeX | KaTeX 源码 |
|---------|------------------------|--------------|-----------|
| 平方/次方 | `4x^2`, `b^2` | $4x^{2}$, $b^{2}$ | `4x^{2}`, `b^{2}` |
| 根号 | `sqrt(4x^2)=2x` | $\sqrt{4x^{2}}=2x$ | `\\sqrt{4x^{2}}=2x` |
| 分数 | `1/2`, `a/b` | $\frac{1}{2}$, $\frac{a}{b}$ | `\\frac{1}{2}` |
| 单位 | `m^3`, `m/s^2` | $\text{m}^3$, $\text{m/s}^{2}$ | `\\text{m}^3` |
| 乘号 | `*`, `x` (字母) | $\cdot$, $\times$ | `\\cdot`, `\\times` |
| 希腊字母 | `pi`, `theta` | $\pi$, $\theta$ | `\\pi`, `\\theta` |
| 下标 | `N_0` | $N_{0}$ | `N_{0}` |
| 形状名称 | `Cylinder:`, `Cube:` | 使用 i18n 翻译 | `\\text{${t.labels.cylinder}}` |
| 判别式 | `b^2-4ac` | $\Delta = b^{2}-4ac$ | `\\Delta = b^{2}-4ac` |
| 求根公式 | `x=(-b±√Δ)/2a` | $x=\frac{-b\pm\sqrt{\Delta}}{2a}$ | `x=\\frac{-b\\pm\\sqrt{\\Delta}}{2a}` |

### 4.3 Anti-Patterns（绝对禁止）

以下模式一旦出现，说明代码存在 LaTeX 渲染缺陷：

1. **裸 caret (`x^2` 直接显示在 UI 上)**：说明字符串没有被 `<InlineMath>` 包裹。
2. **裸 `sqrt` 文字**：说明 `\\sqrt{}` 没有正确转义或根本没有使用 LaTeX。
3. **形状枚举值直接显示** (`Cylinder`, `Prism`)：说明 i18n 键缺失或模板拼接错误。
4. **`\\text` 显示为文本**：说明反斜杠转义层数不对（需要 `\\\\\\\\text`）。
5. **Unicode 上标** (`²`, `³`)：在 KaTeX 环境中不需要，并且在纯文本中也不如 LaTeX 直觉。

### 4.4 生成式题库的 LaTeX 规范（关键约束）

当使用动态生成（`Array.from({ length: N }).map(...)` 或 `buildStagePool()`）时，**字符串拼接必须输出合法的 KaTeX**：

```typescript
// ✅ 正确: 使用工具函数生成标准 LaTeX
const expr = `${a}x^{2} + ${b}x + ${c}`;  // 注意 {2} 而不是 2
const unit = `\\\\text{m}^{3}`;             // 单位用 \\text 包裹
const root = `\\\\sqrt{${val}}`;            // 根号用 \\sqrt{}

// ❌ 错误: 直接拼接裸文本
const expr = `${a}x^2 + ${b}x + ${c}`;     // ^2 无花括号
const unit = `m^3`;                          // 无 \\text
const root = `sqrt(${val})`;                 // 无 \\sqrt
```

**规则总结**：
1. 所有幂次 `^` 后面的内容必须用 `{}` 包裹：`x^{2}` 而不是 `x^2`。
2. 所有单位必须用 `\\text{}` 包裹。
3. 所有根号必须用 `\\sqrt{}` 而不是 `sqrt()` 或 `√`。
4. 所有分数必须用 `\\frac{}{}` 而不是 `/`。
5. 所有希腊字母必须用 LaTeX 命令 (`\\pi`, `\\Delta`) 而不是 Unicode。
6. 所有形状名称、物理量名称必须通过 i18n `t()` 函数获取，不能硬编码英文。

### 4.5 组件端规范

- **所有数学内容** 必须被 `<InlineMath math={...} />` 或 `<BlockMath math={...} />` 组件包裹。
- **SVG 内的数学** 使用 `<foreignObject>` + `<InlineMath>` 渲染，而不是 `<text>` 标签。
- **提示面板（Hint Panel）** 中的公式项也必须使用 `<InlineMath>` 渲染。
- **Canvas/SVG 标签** 中如果需要显示数学（如 `y = x²`），必须用 `<foreignObject>` 嵌套 KaTeX。

---

## 🎨 5. Visualization Standards

### 5.1 Concept Match
Visualizations must match the current quest's concepts.
- **Math**: Dynamic graphs, unit circles, Venn diagrams.
- **Physics**: 3D force vectors, momentum collisions, circuit diagrams.
- **Chemistry**: 3D molecular structures, pH titration curves.

### 5.2 Automatic Scaling
Visual containers must automatically calculate bounds and scale to fit the quest data range, ensuring no elements are cut off or too small to read.

---

## 🛂 6. Migration & Integrity Standards

### 6.1 Zero Data Loss
When migrating legacy modules to the new system:
- **Audit**: Count existing quests and map every field.
- **Verify**: Use automated scripts to compare original IDs with i18n keys.
- **Conclusion**: Report 100% completion before deleting legacy code.

### 6.2 Code Cleanup
Upon successful migration and verification:
- Delete temporary migration scripts.
- Remove legacy hardcoded quest data files.
- Commit all changes with clear messages (`fix/feat/refactor`).

---

## ✅ 7. Module Quality Assurance Checklist (QA 审查清单)

> 每次修改或新建模块后，**必须逐项通过以下检查**。任何一项不通过都不能标记为完成。

### 7.1 数学公式渲染审查 (Math Rendering Audit)

对模块中**所有可见的数学表达式**逐一检查：

- [ ] **幂次显示**：`x²` 是否以上标形式正确显示？（不能显示为 `x^2` 纯文本）
- [ ] **根号显示**：`√` 是否以根号符号正确显示？（不能显示为 `sqrt(...)` 文字）
- [ ] **分数显示**：分数是否以竖式分数线显示？（不能显示为 `a/b` 纯文本）
- [ ] **单位显示**：物理单位 (m, kg, s, m³) 是否以正体显示？（不能显示为斜体变量）
- [ ] **希腊字母**：π, θ, Δ 等是否以标准符号显示？（不能显示为 `pi`, `theta`）
- [ ] **形状/物理量名称**：是否已翻译且不显示英文枚举值？（不能显示 `Cylinder:` 等）
- [ ] **所有 InlineMath 组件**：传入的字符串是否为合法 KaTeX？
- [ ] **SVG 内数学标签**：是否使用了 `<foreignObject>` + `<InlineMath>`？
- [ ] **提示面板公式**：Hint Panel 中的公式是否使用了 `<InlineMath>` 渲染？

### 7.2 生成式题库审查 (Generative Quest Audit)

对使用动态生成的模块：

- [ ] **模板字符串输出**：在浏览器中实际查看 5-10 道随机生成的题目，确认显示正常。
- [ ] **变量拼接**：所有 `${...}` 拼接后的字符串是否仍为合法 KaTeX？
- [ ] **边界值测试**：当系数为 0, 1, -1, 负数时，表达式是否仍然合理？
  - 例如：`0x^{2}` 应被省略, `1x` 应显示为 `x`, `-1x` 应显示为 `-x`。
- [ ] **单位拼接**：单位是否始终被 `\\text{}` 包裹？

### 7.3 国际化审查 (i18n Audit)

- [ ] **三语完整**：EN, CN, DE 翻译文件中，该模块的所有 key 都有对应值？
- [ ] **无硬编码英文**：`page.tsx` 中没有直接写死英文字符串？
- [ ] **场景文本**：scenario 描述是否已翻译？
- [ ] **按钮/标签**：所有 UI 文本（按钮、标签、阶段名）是否通过 `t()` 获取？

### 7.4 组件与布局审查 (Component Audit)

- [ ] **ChamberLayout**：是否使用了统一布局组件？
- [ ] **useQuestManager**：是否使用了统一的题目管理 Hook？
- [ ] **Props 匹配**：页面传给可视化组件的 props 名称是否与组件定义一致？
- [ ] **可视化组件**：Monitor 面板是否有对应的 Canvas/Chart 组件？

### 7.5 构建与运行审查 (Build Audit)

- [ ] **编译通过**：`npm run build` 无错误？
- [ ] **Lint 通过**：无 TypeScript 错误？
- [ ] **浏览器测试**：在浏览器中实际运行模块，确认功能正常？
- [ ] **控制台无报错**：运行时浏览器控制台无 React 错误或 KaTeX 解析错误？

---

## 📜 8. 审查脚本参考

项目中已有以下审查脚本可辅助使用：

| 脚本 | 用途 | 运行方式 |
|------|------|---------|
| `scripts/deep-audit.sh` | 模块结构、题目数量、i18n 模式、LaTeX 使用概况 | `bash scripts/deep-audit.sh` |
| `scripts/audit-modules.js` | 空题目池、硬编码文本、旧 i18n 模式检测 | `node scripts/audit-modules.js` |

**建议**：在每次 Sprint 结束后，运行这两个脚本并检查输出，确保没有回归问题。

---

## ⚠️ 已知问题记录

### 数学渲染（Phase 7: Universal LaTeX Stabilization）
- **问题根源**：在重构为生成式题库时，字符串拼接逻辑绕过了 LaTeX 格式化，导致动态生成的表达式丢失了 `{}` 包裹、`\\text{}` 单位包裹等。
- **影响范围**：所有使用模板字符串动态拼接数学表达式的模块。
- **修复方向**：从源头（`buildStagePool` / `quests.ts`）修正拼接逻辑，而不是逐个修补 UI。
- **验证标准**：必须在浏览器中实际查看每个模块的随机题目显示，通过第 7 节的 QA 清单审查。
