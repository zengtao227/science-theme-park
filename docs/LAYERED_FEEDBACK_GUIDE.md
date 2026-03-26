# 分层反馈系统 — 架构指南

> **状态**: Phase 1 baseline implemented — 基础设施已落地，待分模块推广
> **日期**: 2026-03-26
> **版本**: v3.1 (经多轮三方审查修正)

---

## 一、平台契约

### feedbackContent — 派生反馈数据（绝不存储在 Quest 上）

```typescript
export interface FeedbackContent {
    hint: string | null;               // ⚠️ 平台自动派生，不由 provider 提供
    steps: PlatformSolutionStep[];
    fullSolutionLatex: string | null;
    hasFullSolution: boolean;          // true = 真正的解法, false = correctLatex 降级
}

export interface PlatformSolutionStep {
    stepNumber: number;
    expressionLatex: string;
    justification: string;
    emphasis?: "warning" | "key" | "transform";
}
```

> [!IMPORTANT]
> `hint` 由 `useQuestManager` 内部通过 `getHint()` 基于 `quest.hintLatex[]` 和错误次数自动派生。
> **模块的 `feedbackContentProvider` 不返回也不应该返回 `hint`。**

#### emphasis 使用准则

| emphasis 值 | 含义 | 样式 | 使用场景 |
|------------|------|------|---------|
| `"warning"` | 关键变形/翻转 | 红色边框 + 粗体 | 仅用于容易出错的危险步骤 |
| `"key"` | 核心步骤 | 青色边框 | 仅用于解题的决定性一步 |
| `"transform"` | 代数变换 | 默认 | 普通变换步骤 |
| `undefined` | 普通步骤 | 默认 | 大多数步骤 |

> [!CAUTION]
> **不要过度使用 emphasis。** 一道题的步骤中，应有不超过 1-2 个带 emphasis 的步骤。如果满屏高亮，层次感会完全丧失。

---

### feedbackContentProvider — 模块级反馈数据提供者

```typescript
// 正式签名（定义于 useQuestManager.ts）
type FeedbackContentProvider<T extends Quest> =
    (quest: T) => Omit<FeedbackContent, 'hint'>;
```

**约束：**
- **必须是纯函数**：只根据 `quest` 派生输出，不得修改 `quest`，不得产生副作用，不得依赖组件局部临时状态
- **必须返回对象**：当前签名不允许返回 `null`。如果模块某些 stage 没有 steps，应返回 `{ steps: [], fullSolutionLatex: null, hasFullSolution: false }`
- **不传 provider 也是合法的**：`useQuestManager` 会自动降级（见 Step 4）

---

### feedbackPolicy — 策略配置

```typescript
export interface FeedbackPolicy {
    hintThreshold: number;         // 解锁 hint 需要的错误次数 (默认: 1)
    stepsThreshold: number;        // 解锁 steps 需要的错误次数 (默认: 2)
    fullThreshold: number;         // 解锁 full 需要的错误次数 (默认: 3)
    confirmFullSolution: boolean;  // 查看完整解法前是否需要确认 (默认: true)
    showAfterCorrect: boolean;     // 答对后是否允许回看 (默认: true)
}
```

> [!NOTE]
> 默认值由 `useQuestManager.ts` 内部的 `DEFAULT_FEEDBACK_POLICY` 提供。
> 模块只需通过 `feedbackPolicy: { stepsThreshold: 3 }` 覆盖差异项，无需重复完整配置。

---

### feedbackState — 运行时状态

```typescript
type FeedbackLevel = "NONE" | "HINT" | "STEPS" | "FULL";

interface FeedbackAvailability {
    canShowHint: boolean;
    canShowSteps: boolean;
    canShowFull: boolean;
}
```

- `feedbackLevel` 在 `next()` / `clearInputs()` 时自动重置为 `"NONE"`
- `feedbackAvailability` 由 `feedbackContent` 的数据能力 + `feedbackPolicy` 的策略门槛共同决定

---

## 二、运行时优先级

反馈内容来源按以下优先级解析（每层互斥向下降级）：

| 优先级 | 来源 | 说明 |
|--------|------|------|
| 1 | `feedbackContentProvider` 动态生成 | solver 实时计算 steps / fullSolution |
| 2 | Quest 静态 `hintLatex[]` | hint 由平台从此字段自动派生 |
| 3 | Quest `correctLatex` 降级 | 无 `fullSolutionLatex` 时，UI 显示"标准答案"而非"完整解法" |
| 4 | 不可用 | 无任何反馈数据，按钮不显示 |

> [!WARNING]
> `correctLatex` 是"正确答案"，`fullSolutionLatex` 是"完整解法"。两者语义不同。
> 降级到 `correctLatex` 时，UI 标题必须显示"标准答案"（`correct_answer_title`），绝不能显示"完整解法"（`full_solution_title`）。

### 合并规则（provider + 平台 fallback）

当 `feedbackContentProvider` 存在时，各字段按以下固定规则合并：

| 字段 | 来源 | fallback |
|------|------|----------|
| `hint` | **平台自动派生**（不受 provider 影响） | `quest.hintLatex[]` → `getHint()` |
| `steps` | **provider 返回值** | 无 fallback，provider 返回空数组则不显示按钮 |
| `fullSolutionLatex` | **provider 返回值** | 若 provider 返回 `null`，平台自动 fallback 到 `quest.correctLatex` |
| `hasFullSolution` | 由 provider 的 `fullSolutionLatex` 是否非空决定 | `false` 当 fallback 到 `correctLatex` |

当 **不传 provider** 时，所有字段走平台 fallback：`hint` 从 `hintLatex` 派生，`steps` 为空，`fullSolutionLatex` 降级为 `correctLatex`。

---

## 三、UI 交互规则

### 答对后行为

- **不自动展开**反馈面板
- **只有该 quest 实际可用的层级按钮才显示**（不是强制显示三个按钮）
- 可用按钮使用暗色/半透明样式（`opacity-60`），学生可主动点击回看
- 此行为由 `feedbackPolicy.showAfterCorrect` 控制（默认 `true`）

### 防剧透策略

- 💡 Hint：答错达到门槛后直接可点击
- 📝 Steps：答错达到门槛后直接可点击
- 📖 Full Solution：点击后弹出**内嵌确认对话框**（非 browser confirm），确认后才展示

### 颜色编码

| 层级 | 颜色 | 图标 |
|------|------|------|
| Hint | 琥珀色 amber | 💡 |
| Steps | 青色 cyan | 📝 |
| Full Solution | 玫红色 rose | 📖 |

---

## 四、禁止事项

| 编号 | 禁止行为 | 原因 |
|------|---------|------|
| ❌-1 | `currentQuest.steps = steps` | 直接 mutation 会导致 React 状态脏、切题残留、缓存失效 |
| ❌-2 | 在模块 page.tsx 中自行实现反馈面板 | 所有反馈 UI 必须通过 `ChamberLayout → LayeredFeedbackPanel` |
| ❌-3 | 将 `correctLatex` 宣称为"完整解法" | UI 必须区分：有 `fullSolutionLatex` → "完整解法"；仅 `correctLatex` → "标准答案" |
| ❌-4 | 硬编码错误次数门槛 | 使用 `FeedbackPolicy` 配置，不要在模块中写 `errors >= 3` |
| ❌-5 | 在 `Quest` 接口上添加反馈数据字段 | 反馈数据通过 `feedbackContentProvider` 派生 |
| ❌-6 | provider 内修改 quest 对象 | provider 必须是纯函数 |
| ❌-7 | provider 返回 hint 字段 | hint 由平台自动派生 |

---

## 五、模块接入标准流程

### Step 1: 定义 feedbackContentProvider

```typescript
// Provider 只负责 steps + fullSolution（hint 由平台自动处理）
// 即使没有 steps，也必须返回空数组（不允许返回 null / undefined）
const myFeedbackProvider = useCallback((quest: MyQuestType) => ({
    steps: generateSteps(quest).map(toPlatformStep),  // 无 steps 时返回 []
    fullSolutionLatex: quest.fullSolution || null,     // null → 平台 fallback 到 correctLatex
    hasFullSolution: !!quest.fullSolution,
}), []);
```

### Step 2: 传入 useQuestManager

```typescript
const { feedbackContent, feedbackLevel, feedbackAvailability, policy, ... } =
    useQuestManager<MyQuestType, MyStage>({
        moduleCode: "my-module",
        buildPool: ...,
        initialStage: ...,
        feedbackContentProvider: myFeedbackProvider,
        // 可选：partial override，由 DEFAULT_FEEDBACK_POLICY 合并，只写差异项
        feedbackPolicy: { stepsThreshold: 3 },
    });
```

### Step 3: 传递给 ChamberLayout

```tsx
<ChamberLayout
    feedbackContent={feedbackContent}
    feedbackLevel={feedbackLevel}
    feedbackAvailability={feedbackAvailability}
    feedbackPolicy={policy}
    onShowHint={showHintLevel}
    onShowSteps={showStepsLevel}
    onShowFull={showFullSolution}
>
```

### Step 4（可选）: 无 provider 的降级模式

不提供 `feedbackContentProvider` 时，`useQuestManager` 自动降级为：
- **hint**: 从 `quest.hintLatex[]` 提取（与有 provider 时一致）
- **steps**: 空数组（不显示步骤按钮）
- **fullSolutionLatex**: 降级为 `quest.correctLatex`（UI 显示"标准答案"标题）

这意味着**任何模块都可以在不写 provider 的情况下获得基本的 hint + 标准答案反馈**。

---

## 六、核心文件清单

| 文件 | 职责 |
|------|------|
| `src/hooks/useQuestManager.ts` | FeedbackContent/FeedbackPolicy/PlatformSolutionStep 接口 + feedbackContentProvider 派生 + DEFAULT_FEEDBACK_POLICY |
| `src/components/feedback/LayeredFeedbackPanel.tsx` | 统一反馈 UI（防剧透确认、答对回看、emphasis 高亮） |
| `src/components/layout/ChamberLayout.tsx` | 将反馈面板注入 actionPanel |
| `src/lib/i18n/{en,de,cn}/common.ts` | 三语反馈文案（含确认对话框） |

---

## 七、验证清单

每接入一个模块后，必须验证：

- [ ] `npm run build` 无编译错误
- [ ] 答错 1 次 → 💡 Hint 按钮出现
- [ ] 答错 2 次 → 📝 Steps 按钮出现（默认 `stepsThreshold: 2`）
- [ ] 答错 3 次 → 📖 Full Solution 按钮出现，三个按钮全部可见
- [ ] 点击 📖 → 弹出确认对话框（防剧透）
- [ ] 答对后 → 可用按钮仍可见（暗色半透明），可点击回看
- [ ] 点击 Next → feedbackLevel 重置为 NONE
- [ ] 切换 EN/DE/CN → 文案正确
- [ ] `scripts/audit-rendering.sh` 通过
