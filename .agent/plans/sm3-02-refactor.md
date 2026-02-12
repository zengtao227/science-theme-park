# S3.02 三角函数与单位圆 — 实施方案

## 背景

当前 S3.02 是一个纯演示模块：只有一个 3D 单位圆画布 + 右侧的角度滑块控制面板。**没有练习题，没有 ChamberLayout，没有语言切换器**。需要将它改造为一个与其他模块（如 S3.01）风格一致的"可练习"模块。

---

## 任务清单（按顺序执行）

### 任务 1：重构 `page.tsx` — 迁移到 ChamberLayout 架构

**文件**: `src/app/chamber/sm3-02/page.tsx`

**目标**: 将当前自定义布局替换为 `ChamberLayout`，引入 `useQuestManager` 练习系统。

#### 1.1 导入和基础结构

替换顶部导入为：
```tsx
"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { clsx } from "clsx";
import { useEffect, useCallback, useState } from "react";

import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import dynamic from "next/dynamic";

const TrigCanvas = dynamic(() => import("@/components/chamber/sm3-02/TrigCanvas"), {
    ssr: false,
});
```

#### 1.2 类型和 Stage 定义

```tsx
type S302T = typeof translations.EN.sm3_02;
type Stage = "UNIT_CIRCLE" | "PROJECTIONS" | "WAVES";

interface S302Quest extends Quest {
  stage: Stage;
  angle?: number;       // 题目关联的角度，用于画布同步
  trigFunc?: "sin" | "cos" | "tan";
}
```

#### 1.3 题目池 `buildStagePool`

使用与 S3.01 相同的 helper 函数模式。每个难度每个阶段 **8 题**。

**Stage: UNIT_CIRCLE** — 认识角度和坐标
- **BASIC**: 给角度，求所在象限。例如 "θ=120°, 在第几象限?" → 答: 2
- **CORE**: 给角度，求 sin/cos 的符号(+/-/0)。例如 "sin(210°) 是正还是负?" → 答: -1 (负)
- **ADVANCED**: 角度转弧度。例如 "90° = ? rad" → 答: π/2 (输入 "pi/2")
- **ELITE**: 弧度转角度。例如 "5π/6 = ?°" → 答: 150

**Stage: PROJECTIONS** — 特殊角的 sin/cos/tan 精确值
- **BASIC**: sin/cos of 0°, 30°, 45°, 60°, 90°。例如 "sin(30°) = ?" → 答: "1/2"
- **CORE**: 扩展到 120°, 135°, 150°, 180°。例如 "cos(120°) = ?" → 答: "-1/2"
- **ADVANCED**: 扩展到 210°-360°。例如 "sin(300°) = ?" → 答: "-√3/2" (输入 "-sqrt3/2")
- **ELITE**: tan 值 + 反函数。例如 "tan(45°) = ?" → 答: 1

**Stage: WAVES** — 周期和振幅
- **BASIC**: 给函数读周期/振幅。例如 "y=2sin(x) 的振幅" → 答: 2
- **CORE**: y=sin(2x) 的周期。例如 "周期 = ?" → 答: π (输入 "pi")
- **ADVANCED**: y=3cos(x/2)+1 的振幅。例如 → 答: 3
- **ELITE**: 综合分析。例如 "y=sin(x)+cos(x) 在 x=45° 时的值" → 答: √2 (输入 "sqrt2")

**注意事项**:
- 所有分数答案使用字符串形式: `"1/2"`, `"-sqrt3/2"`, `"pi/2"`
- `parseNumberLike` 函数已支持分数输入
- 每个 quest 需要设置 `angle` 字段，这样画布可以自动同步到对应角度
- slot 的 `expected` 字段用字符串表示精确值

#### 1.4 主组件

```tsx
export default function S302Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const t = translations[currentLanguage].sm3_02;
  
  // 画布控制状态
  const [angle, setAngle] = useState(45);
  const [showSin, setShowSin] = useState(true);
  const [showCos, setShowCos] = useState(true);
  const [showTan, setShowTan] = useState(false);
  const [showWaves, setShowWaves] = useState(false);

  const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(t, d, s), [t]);

  const { difficulty, stage, inputs, lastCheck, currentQuest, successRate,
    setInputs, verify, next, handleDifficultyChange, handleStageChange, parseNumberLike
  } = useQuestManager<S302Quest, Stage>({ buildPool, initialStage: "UNIT_CIRCLE" });

  // 当题目切换时，同步画布角度
  useEffect(() => {
    if (currentQuest?.angle != null) {
      setAngle(currentQuest.angle);
    }
  }, [currentQuest]);

  useEffect(() => {
    if (lastCheck?.ok) completeStage("sm3-02", stage);
  }, [lastCheck, completeStage, stage]);

  const stages = [
    { id: "UNIT_CIRCLE", label: t.stages.unit_circle },
    { id: "PROJECTIONS", label: t.stages.projections },
    { id: "WAVES", label: t.stages.waves },
  ];

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="SM3.02"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={stage}
      onStageChange={handleStageChange as (s: string) => void}
      // ... (其余 props 与 S3.01 相同)
      monitorContent={<TrigMonitorPanel angle={angle} setAngle={setAngle} ... />}
    >
      {/* 主内容区：题目 + 输入框 */}
    </ChamberLayout>
  );
}
```

**关键**: `ChamberLayout` 自带语言切换器。使用 `ChamberLayout` 后，语言切换自动可用。

---

### 任务 2：升级监控面板 — 特殊角快捷按钮

**位置**: 在 `page.tsx` 中作为 `monitorContent` 传入 ChamberLayout。

在现有的滑块控制旁边，添加一组**特殊角快捷按钮**：

```tsx
function TrigMonitorPanel({ angle, setAngle, showSin, setShowSin, ... }) {
  const specialAngles = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360];
  const keyAngles = [0, 30, 45, 60, 90, 180, 270]; // 最重要的用高亮

  return (
    <div className="space-y-4">
      {/* 1. 特殊角快捷按钮 */}
      <div>
        <div className="text-[9px] uppercase tracking-[0.3em] font-black text-cyan-400/70 mb-2">
          Special Angles {/* 需要国际化 */}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {specialAngles.map(a => (
            <button key={a}
              onClick={() => setAngle(a)}
              className={clsx(
                "px-2 py-1 rounded text-xs font-mono border transition-all",
                angle === a
                  ? "bg-cyan-500 text-black border-cyan-400 font-bold"
                  : keyAngles.includes(a)
                    ? "border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20"
                    : "border-white/10 text-white/40 hover:border-white/30"
              )}
            >
              {a}°
            </button>
          ))}
        </div>
      </div>

      {/* 2. 自由角度滑块（保留） */}
      <div>
        <input type="range" min="0" max="360" value={angle} onChange={e => setAngle(Number(e.target.value))} />
        <div className="text-center text-xl text-cyan-300">{angle}°</div>
        <div className="text-center text-sm text-cyan-300/70">{(angle * Math.PI / 180).toFixed(3)} rad</div>
      </div>

      {/* 3. 精确值显示面板（对特殊角显示根号值） */}
      <SpecialValueDisplay angle={angle} />

      {/* 4. Toggle（sin/cos/tan/waves 开关，保留） */}
      ...
    </div>
  );
}
```

**精确值显示**: 当角度是特殊角时，显示精确的数学表达式而非小数。例如：
- sin(30°) 显示为 `1/2` 而不是 `0.5000`
- cos(45°) 显示为 `√2/2` 而不是 `0.7071`

创建一个映射表：
```tsx
const EXACT_VALUES: Record<number, { sin: string; cos: string; tan: string }> = {
  0:   { sin: "0",      cos: "1",      tan: "0" },
  30:  { sin: "1/2",    cos: "√3/2",   tan: "√3/3" },
  45:  { sin: "√2/2",   cos: "√2/2",   tan: "1" },
  60:  { sin: "√3/2",   cos: "1/2",    tan: "√3" },
  90:  { sin: "1",      cos: "0",      tan: "∞" },
  120: { sin: "√3/2",   cos: "-1/2",   tan: "-√3" },
  135: { sin: "√2/2",   cos: "-√2/2",  tan: "-1" },
  150: { sin: "1/2",    cos: "-√3/2",  tan: "-√3/3" },
  180: { sin: "0",      cos: "-1",     tan: "0" },
  210: { sin: "-1/2",   cos: "-√3/2",  tan: "√3/3" },
  225: { sin: "-√2/2",  cos: "-√2/2",  tan: "1" },
  240: { sin: "-√3/2",  cos: "-1/2",   tan: "√3" },
  270: { sin: "-1",     cos: "0",      tan: "∞" },
  300: { sin: "-√3/2",  cos: "1/2",    tan: "-√3" },
  315: { sin: "-√2/2",  cos: "√2/2",   tan: "-1" },
  330: { sin: "-1/2",   cos: "√3/2",   tan: "-√3/3" },
  360: { sin: "0",      cos: "1",      tan: "0" },
};
```

当角度是一个特殊角时，显示精确值；否则显示 `.toFixed(4)` 的小数。

---

### 任务 3：国际化补充

**文件**: `src/lib/i18n.ts`

需要在 **EN**, **CN**, **DE** 的 `sm3_02` 对象中添加以下新的翻译键。

#### 需要添加的键（在 `sm3_02` 下）：

```typescript
// 在 stages 对象中添加 prompt：
stages: {
  // ... 保留现有的
  unit_circle_prompt_latex: "\\text{Determine the quadrant or sign.}",      // EN
  projections_prompt_latex: "\\text{Calculate the exact trigonometric value.}", // EN
  waves_prompt_latex: "\\text{Find the amplitude or period.}",              // EN
},

// 新增 labels：
labels: {
  // ... 保留现有的
  special_angles: "SPECIAL ANGLES",
  exact_value: "EXACT VALUE",
  decimal_value: "DECIMAL",
  quadrant: "QUADRANT",
},
```

**CN 版本**:
```
unit_circle_prompt_latex: "\\text{判断象限或正负号。}"
projections_prompt_latex: "\\text{计算三角函数的精确值。}"
waves_prompt_latex: "\\text{求振幅或周期。}"
special_angles: "特殊角"
exact_value: "精确值"
```

**DE 版本**:
```
unit_circle_prompt_latex: "\\text{Bestimme den Quadranten oder das Vorzeichen.}"
projections_prompt_latex: "\\text{Berechne den exakten trigonometrischen Wert.}"
waves_prompt_latex: "\\text{Finde Amplitude oder Periode.}"
special_angles: "SPEZIALWINKEL"
exact_value: "EXAKTER WERT"
```

---

### 任务 4：保留 TrigCanvas 但调整集成方式

**文件**: `src/components/chamber/sm3-02/TrigCanvas.tsx`

**不需要大改**。`TrigCanvas` 继续作为 3D 可视化组件存在，但它的角色从"主内容"变为"Monitor 面板的辅助可视化"。

需要的调整：
1. 移除或缩小画布的固定高度 `h-[800px]`，因为它现在在 Monitor 面板里而不是占满屏幕。改为 `aspect-[4/3]` 或 `h-[300px]`。
2. 确保 `angle` prop 可以从外部同步设置（当前已支持）。

**集成方式**: 在 `monitorContent` 中组合 TrigCanvas + TrigMonitorPanel：
```tsx
monitorContent={
  <div className="space-y-4">
    <div className="rounded-xl overflow-hidden border border-white/10">
      <TrigCanvas angle={angle} showSin={showSin} showCos={showCos} showTan={showTan} showWaves={showWaves} />
    </div>
    <TrigMonitorPanel ... />
  </div>
}
```

---

## 文件修改清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/app/chamber/sm3-02/page.tsx` | **重写** | 迁移到 ChamberLayout + useQuestManager |
| `src/components/chamber/sm3-02/TrigCanvas.tsx` | **微调** | 缩小固定高度，适配 Monitor 面板 |
| `src/lib/i18n.ts` | **新增翻译键** | 在 EN/CN/DE 的 sm3_02 中添加 prompt 和 label |

## 质量检查清单

- [ ] `npx tsc --noEmit` 零错误
- [ ] 语言切换器可见且功能正常（CN/EN/DE）
- [ ] 每个阶段每个难度 8 题
- [ ] 特殊角按钮点击后画布同步更新
- [ ] 特殊角精确值（√3/2 等）正确显示
- [ ] 题目切换时画布角度自动同步
- [ ] 答案支持分数和根号输入（"1/2", "sqrt3/2", "pi/2"）
- [ ] ChamberLayout 左侧显示阶段切换 + 难度切换 + 语言切换
- [ ] 所有翻译在三种语言下正确显示
