# 分层反馈系统 — 架构指南

> **状态**: Phase 1 baseline implemented — 基础设施已落地，待分模块推广
> **日期**: 2026-03-26
> **版本**: v2 (经 Codex 架构审查修正)

---

## 一、平台契约

### feedbackContent — 派生反馈数据（绝不存储在 Quest 上）

```typescript
export interface FeedbackContent {
    hint: string | null;
    steps: PlatformSolutionStep[];
    fullSolutionLatex: string | null;
    hasFullSolution: boolean; // true = 真正的解法, false = correctLatex 降级
}

export interface PlatformSolutionStep {
    stepNumber: number;
    expressionLatex: string;
    justification: string;
    emphasis?: "warning" | "key" | "transform";
}
```

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

### feedbackState — 运行时状态

```typescript
feedbackLevel: "NONE" | "HINT" | "STEPS" | "FULL"
feedbackAvailability: { canShowHint, canShowSteps, canShowFull }
```

- `feedbackLevel` 在 `next()` / `clearInputs()` 时自动重置为 `"NONE"`
- `feedbackAvailability` 由 `feedbackContent` 的数据能力 + `feedbackPolicy` 的策略门槛共同决定

---

## 二、运行时优先级

反馈内容来源按以下优先级解析：

1. **`feedbackContentProvider` 动态生成**（如 solver 实时计算步骤）
2. **Quest 静态数据**（如 `hintLatex[]`、`correctLatex`）
3. **`correctLatex` 降级**（无 `fullSolutionLatex` 时，显示"标准答案"而非"完整解法"）
4. **不可用**（无任何反馈数据时，按钮不显示）

---

## 三、禁止事项

| 编号 | 禁止行为 | 原因 |
|------|---------|------|
| ❌-1 | `currentQuest.steps = steps` | 直接 mutation 会导致 React 状态脏、切题残留、缓存失效 |
| ❌-2 | 在模块 page.tsx 中自行实现反馈面板 | 所有反馈 UI 必须通过 `ChamberLayout → LayeredFeedbackPanel` |
| ❌-3 | 将 `correctLatex` 宣称为"完整解法" | UI 必须区分：有 `fullSolutionLatex` → "完整解法"；仅 `correctLatex` → "标准答案" |
| ❌-4 | 硬编码错误次数门槛 | 使用 `FeedbackPolicy` 配置，不要在模块中写 `errors >= 3` |
| ❌-5 | 在 `Quest` 接口上添加反馈数据字段 | 反馈数据通过 `feedbackContentProvider` 派生 |

---

## 四、模块接入标准流程

### Step 1: 定义 feedbackContentProvider

```typescript
const myFeedbackProvider = useCallback((quest: MyQuestType) => ({
    steps: generateSteps(quest).map(toPlatformStep),
    fullSolutionLatex: quest.fullSolution || null,
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
        // 可选：覆盖默认策略
        feedbackPolicy: { hintThreshold: 1, stepsThreshold: 3 },
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
- **hint**: 从 `quest.hintLatex[]` 提取
- **steps**: 空数组（不显示步骤按钮）
- **fullSolutionLatex**: 降级为 `quest.correctLatex`（UI 显示"标准答案"标题）

---

## 五、核心文件清单

| 文件 | 职责 |
|------|------|
| `src/hooks/useQuestManager.ts` | FeedbackContent/FeedbackPolicy/PlatformSolutionStep 接口 + feedbackContentProvider 派生 |
| `src/components/feedback/LayeredFeedbackPanel.tsx` | 统一反馈 UI（防剧透确认、答对回看、emphasis 高亮） |
| `src/components/layout/ChamberLayout.tsx` | 将反馈面板注入 actionPanel |
| `src/lib/i18n/{en,de,cn}/common.ts` | 三语反馈文案（含确认对话框） |

---

## 六、颜色编码 & UI 规范

| 层级 | 颜色 | 图标 |
|------|------|------|
| Hint | 琥珀色 amber | 💡 |
| Steps | 青色 cyan | 📝 |
| Full Solution | 玫红色 rose | 📖 |

| emphasis 值 | 含义 | 样式 |
|------------|------|------|
| `"warning"` | 关键变形/翻转 | 红色边框 + 粗体 |
| `"key"` | 核心步骤 | 青色边框 |
| `"transform"` | 代数变换 | 默认 |
| `undefined` | 普通步骤 | 默认 |

---

## 七、验证清单

每接入一个模块后，必须验证：

- [ ] `npm run build` 无编译错误
- [ ] 答错 1 次 → 💡 按钮出现
- [ ] 答错 3 次 → 三个按钮全部出现
- [ ] 点击 📖 → 弹出确认对话框（防剧透）
- [ ] 答对后 → 按钮仍可见（暗色），可点击回看
- [ ] 点击 Next → feedbackLevel 重置
- [ ] 切换 EN/DE/CN → 文案正确
- [ ] `scripts/audit-rendering.sh` 通过
