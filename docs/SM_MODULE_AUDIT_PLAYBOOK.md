# SM2.07+ 模块审查与批量修复手册

本手册是从 SM2.01~SM2.06 的治理经验沉淀出的统一流程，用于后续所有模块（从 SM2.07 开始）的渲染、i18n、排版审查与修复。

## 0. 目标与边界

- 目标：一次审计，分类收敛，按问题类型批量修复，避免“逐模块打补丁”。
- 边界：仅处理渲染链、LaTeX 转义、i18n、组件硬编码、明显排版/文案一致性问题。
- 不在本手册范围：教学逻辑改写、题库内容重编、视觉重设计。

## 1. 三条硬规则（必须遵守）

1. `promptLatex` 必须用 `renderMixedText()` 渲染；禁止 `\text{${t(...)}}` 包裹 prompt。
2. `expressionLatex/targetLatex/correctLatex/slot.labelLatex` 必须用 `<InlineMath math={...} />`；源码使用双反斜杠。
3. 合并前必须跑 `scripts/audit-rendering.sh`；除已登记豁免项外，命中必须清零。

## 2. 标准执行流程

1. 跑全量审计并保存输出基线。  
2. 按“问题类型”分组，不按模块分组。  
3. 每类问题做一次批量修复（一个 commit 一类问题）。  
4. 每次修复后执行验收。  
5. 所有类型完成后再做最终全量审计。  

## 3. 审计入口

优先使用统一脚本：

```bash
bash scripts/audit-rendering.sh
```

必要时补充定向检查（示例）：

```bash
# 检查模块内 i18n key 直出
rg -n "sm2_0[0-9]\\.[a-z_0-9]+" src/app/chamber/sm2-07/page.tsx

# 检查组件直接硬编码英文（排除 fallback）
rg -n '>\s*"[A-Z][^"]*"\s*<|\{"\s*[A-Z][^"]*"\s*\}' src/components/chamber --glob '*.tsx' \
  | rg -v '\?\?|\|\||^\s*//|translations\?|labels\?|props\.'
```

## 4. 问题分类与修复模板

### A. `promptLatex` 渲染链违规

- 现象：文本混合公式显示异常、红色反斜杠、`\text{...}` 字面量外露。
- 修法：
  - 数据层：`promptLatex: t("...")` 或 `promptLatex: "文字 $公式$"`。
  - 渲染层：`{renderMixedText(currentQuest?.promptLatex || "")}`。

### B. 纯公式字段误用 `renderMixedText`

- 现象：`(z^{4})^{2}` 等纯公式未渲染。
- 修法：改为 `<InlineMath math={field || ""} />`。

### C. 反斜杠层级错误（`\\\\text` / `\\\\frac`）

- 现象：KaTeX 输出字面量 `\text`、`\frac`。
- 修法：源码中确保是双反斜杠（`\\text`、`\\frac`），不要四反斜杠。
- 注意：仅改目标字段，避免全文件盲替换。

### D. i18n key 泄漏

- 现象：界面显示 `sm2_06.stages.mission_prompt_6` 等 key 字符串。
- 修法：
  - 补齐 `cn/en/de` 三语 key。
  - 页面通过 `t("...")` 消费，不直接展示 key。

### E. 组件硬编码英文

- 现象：右侧图、提示区出现固定英文。
- 修法：
  - 组件改为 `props.labels/translations` 注入。
  - 调用方用 `t("...")` 传值。
  - fallback 仅作保护，不作为运行时主路径。

### F. 误报豁免

- `sc2-01` 的 `promptLatex + BlockMath` 为已确认豁免。
- `expressionLatex/targetLatex/correctLatex` 使用 `\\text{${t(...)}}` 且走 InlineMath，为合法 KaTeX 文本模式（按需保留）。

## 5. 安全改法（避免再次踩坑）

- 不对含 `${...}` 与反斜杠的 LaTeX 模板做大范围 sed/perl 盲替换。
- 优先“定点替换 + 小范围验证 + 再扩展”。
- 每次替换后立刻跑定向 grep，确认没有生成 `\text`（单斜杠）或 `\\\\text`（四斜杠）异常形态。

## 6. 提交策略

- 一个 commit 只处理一类问题（便于回滚和复查）。
- commit message 建议：
  - `fix: normalize latex backslashes in sm2-xx`
  - `fix: localize hardcoded labels in sm2-xx canvas`
  - `chore: update audit rendering gates`

## 7. 验收门禁

每个批次后执行：

```bash
npm run build
npm run validate:translations
bash scripts/audit-rendering.sh
```

通过标准：

- `build` 成功。
- `validate:translations` 对称通过（当前基线 616/616）。
- 审计结果仅保留已登记豁免项。

## 8. 给 Cloud/复审助手的标准输出模板

按固定结构汇报，减少来回沟通成本：

1. 发现：按问题类型列出命中模块/文件。  
2. 根因：每类问题一句话说明机制原因。  
3. 方案：按类型给出批量修法。  
4. 结果：列出 commit、build、translations、audit 结果。  
5. 残留：仅列“确认豁免”与“下一轮处理项”。  

---

维护原则：本手册优先于零散历史说明；新增模式请先补到这里，再开始批量修复。
