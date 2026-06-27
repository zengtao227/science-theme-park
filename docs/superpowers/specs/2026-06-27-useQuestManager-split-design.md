# useQuestManager 拆分设计

> 状态：设计稿（spec only，未改动任何运行代码）
> 范围：`src/hooks/useQuestManager.ts`（502 行，返回 34 个值，被 105 个模块页面消费）
> 约束总览：公共返回值 100% 向后兼容；`chamberLayoutProps` 对象保持原样；无浏览器渲染测试，只能靠 `npm run test`；强偏向「最小有效改动」，规避无声回退。

---

## 当前问题

`useQuestManager` 是全站核心 God Hook，单文件聚合了 7 个责任群（难度/阶段导航、题目池/导航、输入/验证、进度追踪、反馈系统、AI 反馈、ChamberLayout props 桥）。它之所以难拆，不是因为代码量，而是因为**几条写入路径横切多个责任群**：

- **`clearInputs`（180-186）** 一次性重置 4 层状态：`inputs`、`lastCheck`、`feedbackLevel`、`aiFeedback`、`isRequestingAi`。导航（`next`/`previous`）、`handleStageChange`、`handleDifficultyChange` 都依赖它。
- **`verify`（244-315）** 一次写入跨 3 层：`stageStats`（进度）、`errorCounts`（进度）、`lastCheck`（输入），并调用全局 `completeStage`。其中 `anyEmpty` 分支也算一次 attempt 且会自增 errorCount——这是容易在重构中被改掉的隐性契约。
- **`feedbackAvailability`（393-414）** 跨读 4 个来源：`getCurrentErrorCount()`（→errorCounts）、`feedbackContent`、`lastCheck`、`policy`。它是「读多个层」的聚合节点，不是独立层。
- **nonce 两个 effect（142-153）** 是 read-on-change / write-on-change 配对，靠 effect 顺序与依赖数组协同；stage 切换时 write effect 会先用**旧 nonce 对新 key** 触发，再由 read 的 `setNonce` 落地。

**真正的工程瓶颈不是「层划不清」，而是测试覆盖不足。** 现有 5 个测试只覆盖：初始化、setInputs、verify 正确/错误、next 清空 inputs。上述每一条横切写入路径——`clearInputs` 对 feedbackLevel/aiFeedback 的重置、`verify` 的 stageStats+errorCounts 双写与 anyEmpty 计数、getHint 错误次数递进、feedbackAvailability 门控、nonce 的 localStorage 往返、stage/difficulty 切换对 errorCounts 的清零——**当前一个都没测**。在没有渲染测试的前提下，这些就是无声回退的高发区。

> 结论先行：本设计的「载重件」是**先补特征化测试（characterization tests）锁住接缝，再分阶段提取**，而不是某个具体的目录结构。测试顺序就是 Q5 的答案，也是工具链能给的唯一回退防线。

---

## 方案对比

三个方案不是「等价的三选一」，而是一条**风险梯度**。区别在于「用多少回退风险换多少组织收益」。

### 方案 A — 最小安全（推荐作为 Phase 1，但不止步于此）

只提取**纯函数**，不动任何 React 状态/effect：

- `parseNumberLike(s, locale)`（222-242）
- `normalize(s, locale)`（267-277，verify 内部的 LaTeX/自由文本规范化）

落到 `src/lib/quest/answerMatching.ts`，导出纯函数 + 直接单测。

- **收益**：把 verify 里最易出错、最该被测的字符串匹配逻辑变成可独立测试的纯函数；`useQuestManager` 减约 40 行；零状态迁移。
- **风险**：≈0。纯函数无 effect、无闭包依赖（locale 作为参数显式传入）。是**唯一在现有工具链下可被证明等价**的提取。
- **trade-off**：God Hook 的状态部分基本原样保留，「34 个返回值」的体感复杂度不变。

### 方案 B — 中等（推荐作为目标架构）

在 A 的基础上，按「自包含程度」由高到低，逐个提取 3 个子 hook。Orchestrator（主 hook）保留所有协调逻辑。

| 子 hook | 提取内容 | 自包含度 | 阶段 |
|---|---|---|---|
| `useAiFeedback` | aiFeedback / isRequestingAi / requestAiFeedback / reset | 高（唯一外联：clearInputs 调 reset） | Phase 2 |
| `useStageProgress` | stageStats + errorCounts + 持久化 + recordAttempt + currentStageStats + successRate + getCurrentErrorCount | 中（verify 通过 recordAttempt 写入） | Phase 3 |
| `useQuestNonce` | nonce + 3 个 localStorage effect + setNonce | **低（effect 顺序敏感）** | Phase 4（最后） |

- **收益**：主 hook 从 502 行降到约 220 行，三块持久化/异步逻辑各自内聚、可独立测试；返回值通过 orchestrator 转发，**对 105 个页面零改动**。
- **风险**：每个子 hook 都有真实回退风险，必须各自先有绿色特征化测试再提取。`useQuestNonce` 的 effect 配对是最高风险项（见下）。
- **trade-off**：组织性收益 vs. 必须先投入测试。提取顺序 = 风险递增顺序，任一阶段可叫停。

### 方案 C — 激进（不推荐）

完全分层：引入 `useReducer` 或 Context，把 verify/clearInputs 改写成 dispatch action，feedback 门控独立成层，errorCounts 与 stageStats 拆开。

- **收益**：理论上最干净的分层。
- **风险**：**高且不可接受**。需要重排 effect 执行顺序、重写跨层写入语义，而这正是无渲染测试覆盖不到的部分；任何 action 顺序或 effect 时序的偏差都会变成 105 个页面上的无声回退。投入产出比为负。
- **trade-off**：用大量回退风险换一个在当前测试条件下无法验证的「优雅」。明确否决。

---

## 推荐方案（附理由）

**推荐 = 方案 B 作为目标架构，但按风险梯度分 4 个 Phase 落地，且 Phase 1（=方案 A）是唯一「即刻可做、可证明安全」的部分。**

理由：

1. **诚实对待工具链边界**。只有纯函数提取能在「没有渲染测试」下被证明行为等价。其余 3 个 hook 提取都在用组织性换回退风险，这个风险只能靠特征化测试买下来——所以它们必须排在测试之后，且彼此独立、可逐个叫停。绝不能把它们当成和纯函数同等安全。
2. **匹配「最小有效改动」**。Phase 1 单独就能交付（最大的可读性/可测性收益、最低风险）。Phase 2-4 是可选增量，每个 Phase 独立 PR、独立验证、出问题独立回滚。
3. **不碰真正的耦合核心**。verify、clearInputs、feedback 门控全部留在 orchestrator 当协调器（见下两节），避免把横切写入变成跨 hook 的分布式状态同步问题。

---

## 拆分边界

### 0. `lib/quest/answerMatching.ts`（纯函数，非 hook）— Phase 1

- **职责**：答案匹配的纯计算。
- **输入**：`parseNumberLike(s: string, locale: Locale): number | null`；`normalizeAnswer(s: string, locale: Locale): string`。
- **输出**：纯值，无副作用。
- **接缝**：verify 内 `parseNumberLike(raw)` 与 `normalize(raw)` 改为带 locale 参数调用；现状 locale 已是闭包变量，提取后显式传参。**行为必须逐字符等价**（含 `²→^2`、`^1` 去除、前导 `1` 去除等正则链）。

### 1. `useAiFeedback(currentQuest, inputs, language)` — Phase 2

- **职责**：AI 个性化诊断的请求与状态。
- **输入**：`currentQuest`、`inputs`、`currentLanguage`。
- **输出**：`{ aiFeedback, isRequestingAi, requestAiFeedback, reset }`。
- **接缝**：`reset()` 把 aiFeedback→null、isRequestingAi→false。orchestrator 的 `clearInputs` 调用 `aiFeedback.reset()`（替代当前内联的两行）。requestAiFeedback 的 `isRequestingAi` 守卫语义保持不变。

### 2. `useStageProgress(moduleCode, storageKey)` — Phase 3

- **职责**：进度追踪与持久化。**errorCounts 与 stageStats 同住此 hook**（理由见 Q4）。
- **输入**：`moduleCode`、`storageKey`。
- **输出**：
  - state：`stageStats`、`errorCounts`
  - 命令：`recordAttempt({ stageKey, questKey, correct })`、`resetStageStats(stageKey)`、`clearErrorCounts()`
  - 派生（需 stage 参数）：`getCurrentStageStats(stage)`、`getSuccessRate(stage)`、`getErrorCount(stage, questId)`、`getHintIndex(...)` 的数据源
- **接缝**：`recordAttempt` 封装 verify 当前对 stageStats 的「attempts/correct/incorrect/lastUpdated」更新 + errorCounts 自增或清零的**原子双写**。`anyEmpty` 路径 = `recordAttempt({ correct: false })`，必须同样算一次 attempt 且自增 errorCount。localStorage 写 effect 内迁。

### 3. `useQuestNonce(moduleCode, stage, difficulty)` — Phase 4（最后，最高风险）

- **职责**：当前题目指针 + 跨 stage/difficulty 的 localStorage 持久化。
- **输入**：`moduleCode`、`stage`、`difficulty`。
- **输出**：`{ nonce, setNonce }`（导航的 +1/-1 仍由 orchestrator 的 next/previous 控制，以保持 clearInputs 协同）。
- **接缝（高风险，单列）**：lazy 初始化（100-109）、read-on-change effect（142-147）、write-on-change effect（149-153）三者的**依赖数组与执行顺序必须逐字保留**。stage 切换时「write 用旧 nonce 对新 key 先触发、再被 read 覆盖」这一时序是隐性契约，正是测试harness 抓不到的 bug 类。**因此排在最后 Phase，且要求专门的 localStorage 往返特征化测试先行。**

### 保留在 Orchestrator（不提取）

difficulty/stage state、inputs、lastCheck、feedbackLevel、adaptiveRecommendation + 自适应 effect、verify、clearInputs、feedbackContent、feedbackAvailability、getHint、chamberLayoutProps、以及 34 个值的最终 return。

---

## 跨层协调设计（clearInputs / verify 的接缝）

核心原则：**横切写入不拆成分布式同步，而是「子 hook 暴露原语，orchestrator 当协调器顺序调用」。**

### clearInputs —「orchestrator 持有重置，向子 hook 扇出」

```
clearInputs (orchestrator):
  setInputs({})          // 本层
  setLastCheck(null)     // 本层
  setFeedbackLevel("NONE")// 本层
  aiFeedback.reset()     // 子 hook 原语（替代内联 setAiFeedback/setIsRequestingAi）
```

- inputs/lastCheck/feedbackLevel 仍由 orchestrator 直接拥有（它们本就分属输入/反馈层但被同一重置点驱动，强行拆开只会多接线）。
- 唯一外迁的是 aiFeedback，通过 `reset()` 原语调用。next/previous/handleStageChange/handleDifficultyChange 继续调 `clearInputs`，调用点不变。

### verify —「子 hook 暴露 recorder，orchestrator 顺序写」

```
verify (orchestrator):
  匹配判定用 answerMatching.parseNumberLike / normalizeAnswer  // Phase 1 纯函数
  错误（含 anyEmpty）:
    progress.recordAttempt({ stageKey, questKey, correct: false })  // 子 hook：stageStats+errorCounts 原子双写
    setLastCheck({ ok:false, correct:"" })                         // 本层
  正确:
    progress.recordAttempt({ stageKey, questKey, correct: true })   // errorCount 归零 + correct+1
    setLastCheck({ ok:true, correct: currentQuest.correctLatex })   // 本层
    completeStage(moduleCode, stage)                                // 全局 store
```

- verify 留在 orchestrator，因为它天然是跨层序列编排者。子 hook 只提供「记录一次尝试」这一**意图级原语**，不暴露 setStageStats/setErrorCounts 裸 setter，避免双写被拆散。
- `recordAttempt` 的内部实现必须保留当前 `setStageStats(prev => ...)` 的函数式更新与 `EMPTY_STAGE_STATS` 兜底，确保并发安全语义不变。

---

## 向后兼容保证

1. **返回值契约冻结**：orchestrator 的 `return { ...34 values }` 字段名、类型、语义全部不变。子 hook 的输出在 orchestrator 内被解构/转发回原字段（如 `const { aiFeedback, isRequestingAi, requestAiFeedback } = useAiFeedback(...)` 直接进 return 与 chamberLayoutProps）。105 个页面的消费代码零改动。
2. **`chamberLayoutProps` 原样保留**：仍是 orchestrator 内的 useMemo，聚合的 21 个值与依赖数组不变。子 hook 的提取对它透明。
3. **导出符号不变**：`Difficulty`、`FeedbackLevel`、`FeedbackContent`、`FeedbackPolicy`、`Slot`、`Quest`、`UseQuestManagerOptions`、`DEFAULT_FEEDBACK_POLICY` 继续从 `useQuestManager.ts` 导出（或 re-export），避免下游 import 路径断裂。
4. **隐性行为契约清单**（重构中必须逐条守住）：
   - `anyEmpty` 算一次 attempt 且自增 errorCount
   - 正确答案 errorCount 归零、incorrect 不变
   - clearInputs 重置 feedbackLevel 与 aiFeedback/isRequestingAi
   - handleDifficultyChange 额外删除当前 stage 的 stageStats 条目
   - handleStageChange / handleDifficultyChange 清零 errorCounts
   - nonce 跨 stage/difficulty 的 localStorage 往返时序

---

## 测试补充计划

**这是本设计的载重件。实施顺序固定为：先补特征化测试 → 提取纯函数 → 逐个提取 hook，每步都在绿灯下进行。**

### 第 0 步：特征化测试（在动任何代码之前补齐，锁住接缝）

现有 5 个测试不足。需新增（仍走 `renderHook` + mock store，无渲染依赖）：

| 测试 | 锁住的契约 |
|---|---|
| verify 错误时 stageStats.attempts/incorrect +1 且 errorCounts[questKey] +1 | 双写 |
| verify anyEmpty（空输入）也算一次 attempt 且自增 errorCount | anyEmpty 隐性契约 |
| verify 正确时 errorCounts[questKey] 归零、correct +1、incorrect 不变 | 归零语义 |
| 连续答错后 getHint 按 errorCount 递进（1→target,2→expression,3→prompt；有 hintLatex 时走索引） | getHint 递进 |
| feedbackAvailability：答错且 errors≥阈值才放开 hint/steps/full；答对且 showAfterCorrect 全放开 | 门控 |
| clearInputs（经 next）重置 feedbackLevel 与 aiFeedback、isRequestingAi | clearInputs 扇出 |
| handleStageChange / handleDifficultyChange 清零 errorCounts；difficulty 切换删除当前 stage stats | 切换重置 |
| nonce：next/previous 后写入 localStorage；切 stage/difficulty 后从对应 key 读回 | nonce 往返时序（最高风险） |

> 这批测试**先于提取**编写并跑绿，作为黄金基线。提取每个子 hook 后必须保持同一批测试全绿，方为「行为等价」的证据。

### 各 Phase 附加单测

- **Phase 1**：`answerMatching` 纯函数表驱动测试（数字/分数/DE 逗号、LaTeX 规范化各正则分支）。纯函数，覆盖成本极低、收益最高。
- **Phase 2-4**：每个子 hook 的独立 `renderHook` 测试 + 复跑第 0 步全套作为回归门。

### 验证命令

```bash
npm run test   # 期望 399 + 新增 全绿；任一 Phase 后复跑
```

---

## 风险与回退

| 风险 | 等级 | 缓解 |
|---|---|---|
| nonce effect 配对的顺序/依赖在提取中被改变，产生跨 stage 的指针错乱 | **高** | 排在 Phase 4 最后；先行专项 localStorage 往返测试；逐字保留依赖数组与 effect 顺序；可单独回滚此 Phase |
| verify 双写被拆成两次独立 set 导致竞态或 anyEmpty 计数丢失 | 中 | `recordAttempt` 封装为单一意图原语，内部保留函数式更新；特征化测试覆盖 anyEmpty 与归零 |
| clearInputs 漏掉某个子 hook 的 reset，留下脏 aiFeedback/feedbackLevel | 中 | reset 原语显式调用；特征化测试断言 next 后全部归位 |
| 下游 import 的类型/常量符号路径断裂 | 低 | 全部从原文件 re-export |
| 无渲染测试，UI 层回退抓不到 | 中（结构性） | 不依赖渲染验证；把可验证逻辑下沉为纯函数/可 renderHook 的 hook；UI 不变 props 契约冻结 |

**回退策略**：4 个 Phase 各自独立 commit / 独立 PR。任一 Phase 测试不绿或体感不对，`git revert` 该 Phase 即可，不影响已落地的前序 Phase。Phase 1（纯函数）即使只做这一步也是净收益，可随时停在此处。

---

## 不做什么（Q4 显式回答）

- **不拆 feedback 门控**（feedbackContent / feedbackAvailability / feedbackLevel）。它看似是独立「反馈层」，实则跨读 lastCheck（输入层）+ errorCounts（进度层）+ feedbackContent + policy。抽成独立 hook 只会把 4 条读线变成跨 hook 接线，复杂度上升而无收益。留在 orchestrator。
- **不拆 errorCounts 与 stageStats**。两者在 verify 中原子双写、在 getHint/feedbackAvailability 中被一起读。拆开会制造进度层内部的同步问题。同住 `useStageProgress`。
- **不拆自适应难度 effect**。它写 `setDifficulty` 与 `userHasSetDifficultyRef`，二者都属 orchestrator 顶层状态，提取需要把 setter 与 ref 反向传入，得不偿失。留在 orchestrator。
- **不把 verify / clearInputs 改成 reducer/dispatch**（方案 C）。在无渲染测试下，重排 effect/action 时序是无声回退的最大来源。
