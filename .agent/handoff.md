# Handoff — science-theme-park 全面代码审查改进计划

## Completed

- ✅ SSRF 修复：Codex 用白名单方案重写 `isAllowedBaseUrl()`（`normalizeBaseUrl` + `ALLOWED_BASE_URLS` Set + `redirect:'manual'` + 30s timeout），commit `640025b3`
- ✅ AI 路由限速：在 `src/app/api/ai/feedback/route.ts` 加入内存限速器（20 req/min per IP），commit `08747709`
- ✅ Step 1 — ChamberLayout 4处 AI 硬编码字符串改为 i18n（en/de/cn），commit `44d83eb5`
- ✅ Step 3 — completeStage 提取进 useQuestManager.verify()，67个文件移除 useEffect，commit `fc04a523`
- ✅ Step 6 — useNamespace helper 添加到 i18n/index.ts，26个文件的 useMemo 翻译块替换，commit `8d247620`

---

## Current State

两个高优先级安全问题已修复并推送 GitHub（main 分支）。
接下来是结构修复 + 代码简化，按以下顺序执行。

---

## Next Steps

### Step 1 — i18n Bug：ChamberLayout 硬编码英文字符串（小，1文件）

**文件**：`src/components/layout/ChamberLayout.tsx`  
**问题**：4处 AI 按钮标签硬编码英文（`"✨ AI Diagnosing..."` 等），从未经过 `t()`，德语用户看到英文  
**做法**：
1. 在 `src/lib/i18n.ts` 找到合适位置，添加对应 key（如 `chamber.ai_diagnosing`）的 de/en/zh 翻译
2. 在 ChamberLayout 中用 `t("chamber.ai_diagnosing")` 替换硬编码字符串  
**验证**：`npm run lint && npx tsc --noEmit`

---

### Step 2 — AGENTS.md 违规：gp2-03 迁移到 useQuestManager ⛔ BLOCKED

**结论**：无法安全迁移，记录为接受的架构例外。

**分析**：
- `useQuestManager.verify()` 使用**绝对容差**：`|student - expected| <= tolerance`
- `gp2-03/QuestValidator` 使用**相对容差**：`|student - expected| / expected <= 0.02`
- 对于 100 kPa 的答案，绝对容差 0.02 → 允许范围 ±0.02（极端严格）；相对容差 2% → 允许范围 ±2（物理正确）
- 若强制迁移，Gas Law 模块所有大数值题目的答案验证将全部失败
- 修复此问题需要给 `useQuestManager` 增加 per-quest 相对容差支持（影响所有 97 个模块，风险过高）

**已接受例外**：gp2-03 保留自定义 QuestValidator（相对容差），属于物理模块的合理差异。  
**待处理**：在 ModuleContainer.tsx 中加注释说明此例外原因（low priority）。

---

### Step 3 — completeStage useEffect 提取（大，~80个文件）

**问题**：每个页面文件都重复写了同一个 `useEffect(() => { if(stageComplete) completeStage() }, [stageComplete])`  
**做法**：
1. 在 `useQuestManager` 中内化这个 effect（读 useQuestManager.ts 确认接缝）
2. 批量移除所有页面文件的重复 useEffect（先做10个验证，再全量）  
**验证**：`npm run test && scripts/audit-rendering.sh`，人工抽查3个模块

---

### Step 4 — layoutProps 对象提取（大，~97个文件）

**问题**：每个页面把 ~12 个 props 逐一从 hook 透传给 `<ChamberLayout>`  
**做法**：
1. 让 `useQuestManager` 返回一个 `chamberLayoutProps` 对象
2. 每个页面改为 `<ChamberLayout {...chamberLayoutProps} />`（97文件机械替换）  
**验证**：`npm run build`（能 build 通过即可）

---

### Step 5 — SlotInputs 组件提取（大，~87个文件）

**问题**：每个页面内联写了相同的 slot 输入 JSX 模板  
**做法**：提取 `<SlotInputs>` 共享组件，批量替换  
**验证**：`npm run build && scripts/audit-rendering.sh`

---

### ~~Step 6~~ ✅ DONE — useNamespace 已完成

已完成。26个文件替换。5个文件例外：sm1-04（useMemo内有 `.replace()`），gp1-0[1-4]（用 `gp1_0x_prompts` 子命名空间模式）。

---

### Step 7 — ChamberLayout 拆分（架构）

**问题**：ChamberLayout.tsx 有 1039 行，至少包含 5 个独立关注点  
**拆分方案**：
- `<ChamberHistoryPanel>` — 历史记录面板（~120行）
- `<ChamberPrintSection>` — 打印系统（~150行）  
- `<AiFeedbackPanel>` — AI 反馈渲染（重复出现两次）
- History-write effect → 移入 useQuestManager  
**验证**：`npm run build && 打开至少3个模块页面确认渲染`

---

### Step 8 — useQuestManager 拆分（架构）

**问题**：useQuestManager.ts 有 488 行，返回 34 个值，是 God Hook  
**拆分方案**：
- `useQuestNavigation` — 题目切换逻辑
- `useAnswerValidation` — 答案校验
- `useAdaptiveDifficulty` — 自适应难度
- `useAiFeedback` — AI 反馈触发  
**验证**：`npm run test && npm run build`

---

## Key Decisions

- **SSRF 用白名单而非黑名单**：Codex 的方案（allowlist）比 DNS 解析的黑名单更强，不会有 DNS 重绑定漏洞
- **Steps 3-8 的批量修改**：每步先做10个文件验证，再全量；务必在每个 Step 之间运行 `scripts/audit-rendering.sh`
- **不做 Step 7/8 除非 Steps 1-6 全部通过**：架构拆分风险最高，放在最后

---

## Validation Commands

```bash
npm run lint
npx tsc --noEmit
npm run test
npm run build
npm run validate:translations
scripts/audit-rendering.sh
```
