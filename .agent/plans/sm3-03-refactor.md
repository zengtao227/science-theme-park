# S3.03 增长与对数 — 改造方案

## 背景与问题诊断

当前 S3.03 存在三个核心问题：

### 问题 1：题目单一，无类型区分
- 所有难度都是同一种题型：代入 `N(t) = N₀ · 2^(t/d)` 求 N
- BASIC 和 ELITE 的唯一区别是数据量（4 题 vs 7 题），思维难度完全一样
- LOGARITHM 阶段同样单一：只有"求时间 t"一种题型
- APPLICATIONS 阶段仅有 4 题，与 EXPONENTIAL 题型重复，只是换了单位

### 问题 2：3D 可视化适得其反
- 培养皿（Petri dish）是纯装饰性的，与数学概念无关
- 半对数坐标图放在 3D 场景中几乎无法阅读
- 学生看到的是旋转的细菌球+难以理解的 3D 曲线，不利于理解指数增长
- 600px 高度的固定尺寸不适合 Monitor 面板

### 问题 3：语言和数学符号硬编码
- GrowthCanvas.tsx 中有 **15+ 处英文硬编码**：
  - `"EXPONENTIAL GROWTH LAB"`, `"Time (hours)"`, `"Growth Parameters"`
  - `"Exponential Model"`, `"Semi-log plot"`, `"Count:"`
- 数学公式使用 Unicode 而非 LaTeX：`N₀ · 2^(t/d)` 应为 `N(t) = N_0 \cdot 2^{t/d}`
- Y 轴标签 `10^{logY}` 显示为纯文本而非数学格式

---

## 改造方案

### 核心决策：放弃 3D Canvas，改用 2D SVG 曲线图 + Hint Panel

**理由**：
1. S3.01 已验证此方向成功（放弃 3D 抛物线画布 → SVG + hint panel 效果更好）
2. 指数增长的核心概念是**曲线形状**（缓慢→爆炸），2D 图比 3D 更清晰
3. SVG 文本天然支持 i18n
4. 可根据题目参数动态更新曲线，实现**视觉-题目联动**

---

## 任务清单（按顺序执行）

### 任务 1：重写题目池 — 按类型和难度扩充至 96 题

**文件**: `src/app/chamber/sm3-03/page.tsx`

**目标**: 每个 Stage × 每个 Difficulty = 8 题，共 3 × 4 × 8 = 96 题。

删除 `exponentialData`, `logarithmData`, `applicationsData` 常量数组。改用 S3.02 一样的 `q(...)` helper 函数逐题定义，每题有明确的思维类型。

#### Stage 1: EXPONENTIAL（指数增长）

使用公式：`N(t) = N_0 \cdot 2^{t/d}`

| 难度 | 题型 | 示例 |
|------|------|------|
| **BASIC** | 给 N₀, d, t → 求 N(t)，数据简单（整倍增） | N₀=100, d=2h, t=4h → N=400 |
| **CORE** | 给 N₀, d, t → 求 N(t)，需要分数次幂 | N₀=50, d=3h, t=6h → N=200 |
| **ADVANCED** | 求倍增次数：N(t)/N₀ = 2^n，求 n | N₀=100, t=6h, d=2h → n=3 |
| **ELITE** | 给 N₀ 和 N(t)，求增长率 k（连续模型 N=N₀·e^{kt}） | N₀=100, N=400, t=2 → k≈0.69 |

```tsx
// BASIC 示例
q("E-B1", "BASIC", "EXPONENTIAL", pExp,
  "N_0=100,\\; d=2\\;h,\\; t=4\\;h",
  "N(t)",
  [{ id: "N", l: "N(t)", e: 400 }],
  "N(4)=400",
  { initialCount: 100, doublingTime: 2, time: 4 }),

// ADVANCED 示例 — 求倍增次数
q("E-A1", "ADVANCED", "EXPONENTIAL", pExp2,
  "N_0=100,\\; d=2\\;h,\\; t=6\\;h",
  "n",
  [{ id: "n", l: "n", e: 3 }],
  "n=3",
  { initialCount: 100, doublingTime: 2, time: 6 }),

// ELITE 示例 — 连续增长率
q("E-E1", "ELITE", "EXPONENTIAL", pExpK,
  "N_0=100,\\; N(2)=400",
  "k",
  [{ id: "k", l: "k", e: 0.69 }],
  "k \\approx 0.69",
  { initialCount: 100, doublingTime: 2, time: 2 }),
```

#### Stage 2: LOGARITHM（对数）

使用公式：`t = d \cdot \log_2(N/N_0)` 和基本对数运算

| 难度 | 题型 | 示例 |
|------|------|------|
| **BASIC** | 给 N₀, N, d → 求 t（答案为整数倍） | N₀=100, N=800, d=2h → t=6h |
| **CORE** | 求 log₂(x) 的值（x 为 2 的幂） | log₂(64) = ? → 6 |
| **ADVANCED** | 用换底公式计算 log | log₃(81) = ? → 4 |
| **ELITE** | 对数方程求解 | log₂(x) + log₂(4) = 5 → x=8 |

```tsx
// BASIC 示例
q("L-B1", "BASIC", "LOGARITHM", pLog,
  "N_0=100,\\; N=800,\\; d=2\\;h",
  "t",
  [{ id: "t", l: "t\\;(h)", e: 6 }],
  "t=6\\;h",
  { initialCount: 100, doublingTime: 2, finalCount: 800 }),

// CORE 示例 — 直接求对数值
q("L-C1", "CORE", "LOGARITHM", pLogVal,
  "\\log_2(64)",
  "v",
  [{ id: "v", l: "v", e: 6 }],
  "\\log_2(64)=6"),

// ADVANCED 示例 — 换底公式
q("L-A1", "ADVANCED", "LOGARITHM", pLogChange,
  "\\log_3(81)",
  "v",
  [{ id: "v", l: "v", e: 4 }],
  "\\log_3(81)=4"),

// ELITE 示例 — 对数方程
q("L-E1", "ELITE", "LOGARITHM", pLogEq,
  "\\log_2(x) + \\log_2(4) = 5",
  "x",
  [{ id: "x", l: "x", e: 8 }],
  "x=8"),
```

#### Stage 3: APPLICATIONS（应用）

使用多种模型：半衰期、复利、人口增长

| 难度 | 题型 | 示例 |
|------|------|------|
| **BASIC** | 半衰期：N(t) = N₀ · (1/2)^(t/h) | N₀=1000, h=5年, t=10年 → N=250 |
| **CORE** | 复利：A = P(1+r)^t | P=1000, r=0.05, t=10 → A=1629 |
| **ADVANCED** | 人口增长率：求 r，已知 P₀, P, t | P₀=1000, P=2000, t=10 → r≈0.07 |
| **ELITE** | pH值 = -log₁₀[H⁺]，碳14测年等 | [H⁺]=10⁻³ → pH=3 |

```tsx
// BASIC 示例 — 半衰期
q("A-B1", "BASIC", "APPLICATIONS", pHalf,
  "N_0=1000,\\; t_{1/2}=5\\;yr,\\; t=10\\;yr",
  "N(t)",
  [{ id: "N", l: "N(t)", e: 250 }],
  "N(10)=250",
  { initialCount: 1000, doublingTime: 5, time: 10 }),

// CORE 示例 — 复利
q("A-C1", "CORE", "APPLICATIONS", pCompound,
  "P=1000,\\; r=5\\%,\\; t=10\\;yr",
  "A",
  [{ id: "A", l: "A", e: 1629 }],
  "A=1629"),

// ELITE 示例 — pH 值
q("A-E1", "ELITE", "APPLICATIONS", pPH,
  "[H^+]=10^{-3}",
  "\\text{pH}",
  [{ id: "pH", l: "pH", e: 3 }],
  "pH=3"),
```

#### prompt 翻译键（需要在 i18n.ts 中添加）

在 `stages` 对象中添加每种题型的 prompt：

**EN**:
```typescript
stages: {
  // ... 保留现有
  exp_basic_prompt: "\\text{Calculate the population at time } t.",
  exp_advanced_prompt: "\\text{Find the number of doublings.}",
  exp_elite_prompt: "\\text{Find the continuous growth rate } k.",
  log_basic_prompt: "\\text{Solve for time using } t = d \\cdot \\log_2(N/N_0).",
  log_core_prompt: "\\text{Evaluate the logarithm.}",
  log_advanced_prompt: "\\text{Use the change of base formula.}",
  log_elite_prompt: "\\text{Solve the logarithmic equation.}",
  app_half_prompt: "\\text{Calculate remaining quantity after half-life decay.}",
  app_compound_prompt: "\\text{Calculate compound interest: } A=P(1+r)^t.",
  app_rate_prompt: "\\text{Find the growth rate from data.}",
  app_ph_prompt: "\\text{Calculate pH from hydrogen ion concentration.}",
}
```

**CN**:
```typescript
stages: {
  exp_basic_prompt: "\\text{计算时间 } t \\text{ 时的种群数量。}",
  exp_advanced_prompt: "\\text{求倍增次数。}",
  exp_elite_prompt: "\\text{求连续增长率 } k\\text{。}",
  log_basic_prompt: "\\text{用 } t = d \\cdot \\log_2(N/N_0) \\text{ 求时间。}",
  log_core_prompt: "\\text{计算对数值。}",
  log_advanced_prompt: "\\text{使用换底公式。}",
  log_elite_prompt: "\\text{求解对数方程。}",
  app_half_prompt: "\\text{计算半衰期后剩余量。}",
  app_compound_prompt: "\\text{计算复利：} A=P(1+r)^t\\text{。}",
  app_rate_prompt: "\\text{从数据中求增长率。}",
  app_ph_prompt: "\\text{由氢离子浓度计算 pH 值。}",
}
```

**DE**:
```typescript
stages: {
  exp_basic_prompt: "\\text{Berechne die Population zur Zeit } t.",
  exp_advanced_prompt: "\\text{Bestimme die Anzahl der Verdopplungen.}",
  exp_elite_prompt: "\\text{Finde die kontinuierliche Wachstumsrate } k.",
  log_basic_prompt: "\\text{Löse nach Zeit: } t = d \\cdot \\log_2(N/N_0).",
  log_core_prompt: "\\text{Berechne den Logarithmus.}",
  log_advanced_prompt: "\\text{Verwende die Basiswechselformel.}",
  log_elite_prompt: "\\text{Löse die logarithmische Gleichung.}",
  app_half_prompt: "\\text{Berechne die Restmenge nach Halbwertszeit.}",
  app_compound_prompt: "\\text{Berechne Zinseszins: } A=P(1+r)^t.",
  app_rate_prompt: "\\text{Bestimme die Wachstumsrate aus Daten.}",
  app_ph_prompt: "\\text{Berechne den pH-Wert aus der H⁺-Konzentration.}",
}
```

---

### 任务 2：替换 GrowthCanvas —— 新建 ExponentialChart (SVG)

**删除文件**: `src/components/chamber/sm3-03/GrowthCanvas.tsx`（整个文件）

**新建文件**: `src/components/chamber/sm3-03/ExponentialChart.tsx`

**设计理念**：一个响应式 SVG 图表，能够：
1. 根据 props 动态绘制指数/对数/半衰期曲线
2. 所有文字通过 props 传入（支持 i18n）
3. 用颜色和动画突出"倍增点"

#### Props 接口

```tsx
interface ExponentialChartProps {
  mode: "exponential" | "logarithm" | "halflife" | "compound";
  initialCount: number;
  doublingTime: number;
  time?: number;          // 当前题目的时间 t
  finalCount?: number;    // 用于对数模式
  labels: {               // 国际化文字
    xAxis: string;        // "Time (t)" / "时间 (t)" / "Zeit (t)"
    yAxis: string;        // "Population N" / "种群数量 N" / "Population N"
    formula: string;      // 当前公式的 LaTeX
  };
}
```

#### 视觉设计

```
┌─────────────────────────────────┐
│  N ▲                            │
│    │                     ·····  │  ← 指数曲线（绿色渐变）
│    │                  ···       │
│    │               ···          │
│    │            ···             │
│    │         ··                 │
│    │      ··                    │
│    │   ···                      │
│ N₀ ├──·─────────────────── ▶ t  │
│    │  ↑                         │
│    │  起始点（发光标记）           │
│    │                            │
│    ├─ · · · · 倍增虚线 · · · ·  │  ← N₀ × 2 的水平虚线
│    │       ↕ d                  │  ← 倍增时间标注
└─────────────────────────────────┘
```

**关键视觉元素**：
1. **指数曲线**：绿色渐变线，从 N₀ 开始增长
2. **倍增标记**：每隔 d 时间画一条水平虚线（N₀, 2N₀, 4N₀, 8N₀...），用浅色标注
3. **当前时间指示器**：如果 `time` prop 存在，画一条垂直的青色虚线标注 t 位置
4. **结果高亮**：在曲线上标注 (t, N(t)) 这个点，用发光圆点
5. **坐标轴**：白色/半透明，带有刻度标签

**半衰期模式** (`mode="halflife"`)：曲线向右下方衰减，展示 N₀ → N₀/2 → N₀/4...

**对数模式** (`mode="logarithm"`)：曲线与指数相同，但高亮强调 "给定 N 求 t" 的路径（水平线 → 交点 → 垂直投影到 x 轴）

#### 实现框架

```tsx
"use client";

import { useMemo } from "react";

export default function ExponentialChart({
  mode = "exponential",
  initialCount,
  doublingTime,
  time,
  finalCount,
  labels,
}: ExponentialChartProps) {
  const W = 400, H = 280, PAD = { top: 20, right: 20, bottom: 40, left: 55 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  // 计算曲线参数
  const maxTime = doublingTime * 6;
  const maxN = initialCount * Math.pow(2, 6); // 6 次倍增

  // 生成曲线路径
  const curvePath = useMemo(() => {
    const points: string[] = [];
    const steps = 100;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * maxTime;
      let N: number;
      if (mode === "halflife") {
        N = initialCount * Math.pow(0.5, t / doublingTime);
      } else {
        N = initialCount * Math.pow(2, t / doublingTime);
      }
      const x = PAD.left + (t / maxTime) * plotW;
      const y = PAD.top + plotH - (N / maxN) * plotH;
      points.push(`${i === 0 ? "M" : "L"}${x},${Math.max(PAD.top, y)}`);
    }
    return points.join(" ");
  }, [mode, initialCount, doublingTime, maxTime, maxN, plotW, plotH]);

  // 倍增水平线
  const doublingLines = useMemo(() => {
    const lines = [];
    for (let n = 0; n <= 5; n++) {
      const N = initialCount * Math.pow(2, n);
      const y = PAD.top + plotH - (N / maxN) * plotH;
      if (y >= PAD.top) {
        lines.push({ y, label: N.toLocaleString() });
      }
    }
    return lines;
  }, [initialCount, maxN, plotH]);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* 背景 */}
      <rect width={W} height={H} fill="transparent" />

      {/* 倍增参考线 */}
      {doublingLines.map((line, i) => (
        <g key={i}>
          <line x1={PAD.left} y1={line.y} x2={W - PAD.right} y2={line.y}
            stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
          <text x={PAD.left - 5} y={line.y + 3} fill="rgba(0,229,255,0.5)"
            fontSize="8" textAnchor="end" fontFamily="monospace">{line.label}</text>
        </g>
      ))}

      {/* 坐标轴 */}
      <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={H - PAD.bottom} stroke="white" strokeOpacity="0.3" />
      <line x1={PAD.left} y1={H - PAD.bottom} x2={W - PAD.right} y2={H - PAD.bottom} stroke="white" strokeOpacity="0.3" />

      {/* 轴标签 */}
      <text x={W / 2} y={H - 5} fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle" fontFamily="monospace">{labels.xAxis}</text>
      <text x={12} y={H / 2} fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle" fontFamily="monospace"
        transform={`rotate(-90, 12, ${H / 2})`}>{labels.yAxis}</text>

      {/* 指数曲线 */}
      <path d={curvePath} fill="none" stroke="#39ff14" strokeWidth="2.5" strokeLinecap="round" />

      {/* 当前时间指示器 */}
      {time != null && (
        <line x1={PAD.left + (time / maxTime) * plotW}
          y1={PAD.top} x2={PAD.left + (time / maxTime) * plotW}
          y2={H - PAD.bottom} stroke="#00e5ff" strokeDasharray="3 3" strokeOpacity="0.6" />
      )}
    </svg>
  );
}
```

**注意**：以上为实现框架，实际实现时需要完善以下细节：
- 动画效果（曲线绘制动画，使用 CSS `stroke-dashoffset`）
- 倍增点的呼吸发光效果
- 对数模式下的 "查找路径" 高亮（水平线→交点→垂直投影）
- `compound` 模式的渲染

---

### 任务 3：重写 Monitor Panel

**位置**: `src/app/chamber/sm3-03/page.tsx` 内的 `monitorContent`

参考 S3.02 的 `TrigMonitorPanel` 模式。Monitor 面板应包含：

```tsx
monitorContent={
  <div className="space-y-6">
    {/* 1. SVG 曲线图 - 核心可视化 */}
    <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40">
      <ExponentialChart
        mode={chartMode}           // 根据题目类型自动切换
        initialCount={currentQuest?.initialCount || 100}
        doublingTime={currentQuest?.doublingTime || 2}
        time={currentQuest?.time}
        finalCount={currentQuest?.finalCount}
        labels={{
          xAxis: t.labels.time,    // 国际化
          yAxis: t.labels.population,
          formula: t.formulas[stage.toLowerCase()],
        }}
      />
    </div>

    {/* 2. 公式参考卡片 */}
    <div className="space-y-2">
      <div className="text-[9px] uppercase tracking-[0.3em] font-black text-green-400/70">
        {t.labels.formula_ref}
      </div>
      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
        <div className="text-lg text-center">
          <InlineMath math={t.formulas[stage.toLowerCase()]} />
        </div>
      </div>
    </div>

    {/* 3. 参数面板 (从当前题目动态显示) */}
    <div className="space-y-2">
      <div className="text-[9px] uppercase tracking-[0.3em] font-black text-cyan-400/70">
        {t.labels.parameters}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {currentQuest?.initialCount && (
          <div className="bg-white/5 rounded p-2 border border-white/10">
            <div className="text-[9px] text-white/40">N₀</div>
            <div className="text-sm font-mono text-green-300 font-bold">
              {currentQuest.initialCount}
            </div>
          </div>
        )}
        {/* ... d, t, N 等参数 */}
      </div>
    </div>

    {/* 4. 关键规则提示 */}
    <div className="space-y-2">
      <div className="text-[9px] uppercase tracking-[0.3em] font-black text-cyan-400/70">
        {t.labels.hints}
      </div>
      <div className="text-xs text-white/60 font-mono space-y-1">
        <div>• {t.hints.rule1}</div>
        <div>• {t.hints.rule2}</div>
      </div>
    </div>
  </div>
}
```

---

### 任务 4：国际化补充

**文件**: `src/lib/i18n.ts`

需要在 **EN**, **CN**, **DE** 的 `sm3_03` 对象中添加以下内容：

#### 新增翻译键

**EN**:
```typescript
labels: {
  // ... 保留现有
  formula_ref: "FORMULA REFERENCE",
  parameters: "CURRENT PARAMETERS",
  growth_rate: "Growth Rate (k)",
  half_life: "Half-life",
  principal: "Principal (P)",
  rate: "Interest Rate (r)",
},
hints: {
  exp_rule1: "Each doubling multiplies the population by 2",
  exp_rule2: "After n doublings: N = N₀ × 2ⁿ",
  log_rule1: "log₂(2ⁿ) = n",
  log_rule2: "Change of base: logₐ(x) = ln(x)/ln(a)",
  app_rule1: "Half-life: N(t) = N₀ × (½)^(t/h)",
  app_rule2: "Compound interest: A = P(1+r)^t",
},
```

**CN**:
```typescript
labels: {
  formula_ref: "公式参考",
  parameters: "当前参数",
  growth_rate: "增长率 (k)",
  half_life: "半衰期",
  principal: "本金 (P)",
  rate: "利率 (r)",
},
hints: {
  exp_rule1: "每次倍增，种群数量乘以 2",
  exp_rule2: "n 次倍增后：N = N₀ × 2ⁿ",
  log_rule1: "log₂(2ⁿ) = n",
  log_rule2: "换底公式：logₐ(x) = ln(x)/ln(a)",
  app_rule1: "半衰期：N(t) = N₀ × (½)^(t/h)",
  app_rule2: "复利：A = P(1+r)^t",
},
```

**DE**:
```typescript
labels: {
  formula_ref: "FORMELREFERENZ",
  parameters: "AKTUELLE PARAMETER",
  growth_rate: "Wachstumsrate (k)",
  half_life: "Halbwertszeit",
  principal: "Kapital (P)",
  rate: "Zinssatz (r)",
},
hints: {
  exp_rule1: "Jede Verdopplung multipliziert die Population mit 2",
  exp_rule2: "Nach n Verdopplungen: N = N₀ × 2ⁿ",
  log_rule1: "log₂(2ⁿ) = n",
  log_rule2: "Basiswechsel: logₐ(x) = ln(x)/ln(a)",
  app_rule1: "Halbwertszeit: N(t) = N₀ × (½)^(t/h)",
  app_rule2: "Zinseszins: A = P(1+r)^t",
},
```

同时给每种题型都添加对应的 `*_prompt_latex` 翻译键（参见任务 1 中列出的 prompt 列表）。

---

### 任务 5：page.tsx 其他修改

#### 5.1 useCallback 包裹 buildPool（防止重渲染）

```tsx
const buildPool = useCallback(
  (d: Difficulty, s: Stage) => buildStagePool(t, d, s),
  [t]
);
```

#### 5.2 S303Quest 接口扩展

```tsx
interface S303Quest extends Quest {
  stage: Stage;
  initialCount?: number;
  doublingTime?: number;
  time?: number;
  finalCount?: number;
  chartMode?: "exponential" | "logarithm" | "halflife" | "compound";
}
```

#### 5.3 动态 chart mode

在 `S302Page` 的返回 JSX 中，根据当前题目自动决定 chart mode：
```tsx
const chartMode = useMemo(() => {
  if (currentQuest?.chartMode) return currentQuest.chartMode;
  if (stage === "EXPONENTIAL") return "exponential";
  if (stage === "LOGARITHM") return "logarithm";
  return "exponential";
}, [currentQuest, stage]);
```

#### 5.4 删除硬编码提示文本

当前 page.tsx 第 232-237 行有硬编码的三语提示文本，应迁移到 i18n：
```tsx
// 删除这段：
{currentLanguage === 'DE'
  ? "Tipp: Gib das Resultat als Ganzzahl oder auf 1 Dezimalstelle gerundet an."
  : currentLanguage === 'CN'
    ? "提示：输入整数或保留 1 位小数。"
    : "Tip: Enter result as integer or rounded to 1 decimal place."
}

// 替换为：
{t.input_tip}
```

在 i18n 中添加 `input_tip` 键：
- EN: `"Tip: Enter result as integer or rounded to 1 decimal place."`
- CN: `"提示：输入整数或保留 1 位小数。"`
- DE: `"Tipp: Gib das Resultat als Ganzzahl oder auf 1 Dezimalstelle gerundet an."`

#### 5.5 translations 直接传递 t

参考 S3.02 的做法，直接传 `translations={t}` 而不是手动展开：
```tsx
// 替换手动展开的 translations prop：
translations={t}
```

---

## 文件修改清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/app/chamber/sm3-03/page.tsx` | **重写** | 96 题 + useCallback + 新 Monitor 面板 + 删除硬编码 |
| `src/components/chamber/sm3-03/GrowthCanvas.tsx` | **删除** | 移除 3D three.js 画布 |
| `src/components/chamber/sm3-03/ExponentialChart.tsx` | **新建** | 2D SVG 指数/对数曲线图 |
| `src/lib/i18n.ts` | **新增翻译键** | hints, labels, prompt_latex 等 |

## 质量检查清单

- [ ] `npx tsc --noEmit` 零错误
- [ ] 3 阶段 × 4 难度 × 8 题 = **96 题**（`grep -c 'q("' page.tsx` 验证）
- [ ] `GrowthCanvas.tsx` 已删除，无 three.js 引用残留
- [ ] `ExponentialChart.tsx` 中 **零硬编码文字**（所有文字通过 props/labels 传入）
- [ ] `page.tsx` 中 **零硬编码文字**（所有文字通过 `t.xxx` 获取）
- [ ] SVG 曲线根据题目参数动态变化
- [ ] 切换语言后，Monitor 面板中所有文字正确更新
- [ ] APPLICATIONS 阶段包含半衰期、复利等多种应用场景
- [ ] ELITE 难度包含反向求解（求 k、求 x 等）
- [ ] `useCallback` 包裹 `buildPool`
- [ ] `translations={t}` 直接传递
