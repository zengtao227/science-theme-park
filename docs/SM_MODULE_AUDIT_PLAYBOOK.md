# SM2.07+ 模块审查与批量修复手册

本手册用于后续所有数学模块（从 SM2.07 开始）的统一审查与修复。目标是把“发现问题 -> 分类 -> 批量修复 -> 验收”的流程固化为标准作业。

## 0. 目标与边界

- 目标：一次审计，分类收敛，按问题类型批量修复，避免逐模块补丁。
- 覆盖：渲染链、LaTeX 转义、i18n、组件硬编码、关键排版一致性。
- 不覆盖：教学逻辑重写、题库改题、视觉重设计。

## 1. 三条硬规则（必须遵守）

1. `promptLatex` 只能通过 `renderMixedText()` 渲染；禁止 `\text{${t(...)}}` 包裹 prompt。
2. `expressionLatex/targetLatex/correctLatex/slot.labelLatex` 统一用 `<InlineMath math={...} />`；源码字符串使用双反斜杠。
3. 合并前必须执行 `scripts/audit-rendering.sh`，除豁免清单外不得有命中。

## 2. 标准执行流程

0. 模块发现与记录。  
1. 跑全量审计并保存输出基线。  
2. 按问题类型分组（不是按模块）。  
3. 每类问题做一次批量修复（一个 commit 一类）。  
4. 每个 commit 后执行验收。  
5. 全部修完后跑最终全量审计并记录收尾结果。  

### 2.1 步骤 0：模块发现

```bash
# 列出当前待审模块（示例）
ls src/app/chamber | grep '^sm2-'
```

建议同时维护一份审查记录（可写在 PR 描述或团队日志），至少包含：

- 模块编号
- 本轮审计日期
- 命中问题类型
- 对应 commit
- 是否存在豁免

## 3. 审计入口

优先使用统一脚本：

```bash
bash scripts/audit-rendering.sh
```

补充定向检查示例（已避免 shell 反引号陷阱）：

```bash
# 检查模块内 i18n key 直出
rg -n 'sm2_0[0-9]\.[a-z_0-9]+' src/app/chamber/sm2-07/page.tsx

# 检查组件直接渲染的硬编码英文（排除 fallback 与注释）
rg -n '>\s*"[A-Z][^"]*"\s*<|\{"\s*[A-Z][^"]*"\s*\}' src/components/chamber --glob '*.tsx' \
  | rg -v '^\s*//|\?\?|\|\||translations\?|labels\?|props\.'
```

## 4. 问题分类与修复模板

### A. `promptLatex` 渲染链违规

- 现象：混合文本公式渲染异常、`\text{...}` 字面量外露。
- 修法：
  - 数据层：`promptLatex: t("...")` 或 `promptLatex: "文字 $公式$"`。
  - 渲染层：`{renderMixedText(currentQuest?.promptLatex || "")}`。

### B. 纯公式字段误用 `renderMixedText`

- 现象：纯公式字符串原样显示（如 `(z^{4})^{2}`）。
- 修法：改为 `<InlineMath math={field || ""} />`。

### C. 反斜杠层级错误（`\\\\text` / `\\\\frac`）

- 现象：KaTeX 显示字面量 `\text`、`\frac`。
- 修法：源码应为 `\\text`、`\\frac`（双反斜杠），不要四反斜杠。

### D. i18n key 泄漏

- 现象：页面出现 `sm2_06.stages.mission_prompt_6` 这类 key。
- 修法：
  - 三语补 key（`cn/en/de` 同步）。
  - 页面统一走 `t("...")`，禁止直出 key。

### E. 组件硬编码英文

- 现象：图形侧栏/画布标签仍是英文固定字符串。
- 修法：
  - 组件改为 `props.labels/translations` 注入。
  - 调用方用 `t("...")` 传值。
  - fallback 只做兜底，不作为主路径。

## 5. i18n 补 key 标准流程（必须同步执行）

1. 在同一模块对象下同步补齐三语 key：
   - `src/lib/i18n/cn/math.ts`
   - `src/lib/i18n/en/math.ts`
   - `src/lib/i18n/de/math.ts`
2. 页面/组件引用统一改为 `t("module.path.key")`。
3. 执行：

```bash
npm run validate:translations
```

4. 记录验证结果。  
说明：`validate:translations` 的总 key 数可能随新增 key 变化，不要硬编码固定数字作为唯一标准，应以“对称通过”为准。

## 6. 安全改法（避免反斜杠事故）

### 6.1 负面清单

- 不对包含 `${...}` 的 LaTeX 模板做全文件 sed/perl 盲替换。
- 不跨字段做无上下文正则替换（容易误伤 `promptLatex` 与 `expressionLatex`）。

### 6.2 正面推荐（Python 字面量替换）

```python
# 示例：只替换确切字面量，避免 shell/Node 双重转义误判
content = content.replace(
    '"\\\\\\\\text{token}"',
    '`\\\\text{${t("module.key")}}`'
)
```

推荐原因：

- Python 字符串层级直觉更清晰。
- 不会触发 shell 对 `$` 的变量展开。
- 更适合“先小范围替换 -> 立刻 grep 验证 -> 再扩展”的节奏。

## 7. 豁免项管理（独立维护）

> 说明：`sc2-01` 不是笔误。当前仓库已确认豁免模块是 `sc2-01`（化学模块），其 `promptLatex + BlockMath` 为已接受用法。

| 模块 | 字段/规则 | 豁免原因 | 首次登记 |
|---|---|---|---|
| `sc2-01` | 审计 1：`promptLatex` 未走 `renderMixedText` | 该模块使用 `BlockMath` 渲染纯公式 prompt，属有意设计 | 2026-02 |
| `sc2-01`/`sc2-05`/`gb3-02`/`sc3-05`/`gb2-01` | 审计 7：`InlineMath/BlockMath` 与 `promptLatex` | 历史结构下的已验收白名单 | 2026-02 |
| `sm2-10` | 审计 3：`expressionLatex` 英文硬编码检查 | `\\text{IQR} = Q_3 - Q_1` 为国际通用统计缩写与公式结构，保留英文 | 2026-02 |
| `sm2-10` | 审计 5：`hintLatex` 英文硬编码检查 | 行 `208`：`\\text{Min, Q1, Med, Q3, Max}` 为统计符号列表，非教学句子 | 2026-02 |
| `sm2-10` | 审计 5：`hintLatex` 英文硬编码检查 | 行 `543`：`\\text{Negative } r = \\text{negative correlation}` 含数学变量 `r` 的混合表达，改动风险高于收益 | 2026-02 |

新增豁免必须满足：

- 有明确技术理由（不是“先放过”）。
- 在本表登记模块、字段、日期。
- 在脚本注释同步更新。

## 8. 提交策略

- 一个 commit 只处理一类问题（便于回滚和复查）。
- commit message 建议：
  - `fix: normalize latex backslashes in sm2-xx`
  - `fix: localize hardcoded labels in sm2-xx canvas`
  - `chore: update audit rendering gates`

## 9. 验收门禁

每个批次后执行：

```bash
npm run build
npm run validate:translations
bash scripts/audit-rendering.sh
```

通过标准：

- `build` 成功。
- `validate:translations` 对称通过。
- 审计结果仅保留豁免清单中的命中。

## 10. 给 Cloud/复审助手的标准输出模板

1. 发现：按问题类型列出命中模块/文件。  
2. 根因：每类一句话说明机制原因。  
3. 方案：按类型给出批量修法。  
4. 结果：列出 commit、build、translations、audit。  
5. 残留：仅列“确认豁免”与“下一轮处理项”。  

## 附录 A：审计脚本核心规则（内联规范）

以下规则与 `scripts/audit-rendering.sh` 对齐，脚本丢失时可按本附录重建：

1. 审计 1：扫描 `promptLatex` 存在但未发现 `renderMixedText` 的 `page.tsx`。  
   - 违规判定：模块出现在输出列表。  
   - 豁免：`sc2-01`。
2. 审计 2：扫描 `promptLatex.*\\text{${t(` 模式。  
   - 违规判定：任何命中。  
   - 注意：仅检查 `promptLatex`。
3. 审计 3：扫描 `expressionLatex` 中 `\\\\` 四反斜杠模式。  
   - 违规判定：任何模块命中。
4. 审计 6：扫描本地 IIFE 剥皮逻辑残留（`replace.*\\\\+text` 或 `startsWith.*\\text`）。  
   - 违规判定：任何模块命中。
5. 审计 7：扫描 `InlineMath/BlockMath` 直接渲染 `promptLatex`。  
   - 违规判定：命中且不在白名单。
6. 审计 4：执行 `npm run validate:translations`。  
   - 违规判定：非 0 退出或校验失败。
7. 审计 5：扫描组件 JSX 直接渲染英文硬编码（排除 fallback/注释/props）。  
   - 违规判定：任何文件命中。

---

维护原则：本手册优先于零散历史说明；新增问题模式请先补本手册，再做批量修复。
