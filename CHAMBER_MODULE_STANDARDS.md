# 🎯 Chamber Module Design Standards
## GM1.01 和 GM2.01 的设计要求总结

**创建时间**: 2026-02-13  
**最后更新**: 2026-02-13 (添加 GM3.01 和 GM4.01 经验教训，增加标签定位要求)  
**版本**: v3.1  
**适用范围**: 所有 Gymnasium (高中) 数学/物理/化学模块

---

## 📋 一、核心设计原则

### 1.1 混合模式 (Mixed Mode)

**定义**: 左侧习题 + 右侧可视化的双栏布局

**要求**:
- ✅ 左侧：基于 quest 系统的练习题，使用 `useQuestManager` hook
- ✅ 右侧：3D/2D 可视化组件，实时反映当前题目数据
- ✅ 可视化必须帮助理解概念，不能只是装饰
- ❌ 禁止：纯可视化工具（没有习题）
- ❌ 禁止：纯习题（没有可视化）

**参考实现**:
- `src/app/chamber/gm1-01/page.tsx` - 导数可视化
- `src/app/chamber/gm1-01-advanced/page.tsx` - 高级导数
- `src/app/chamber/gm2-01/page.tsx` - 3D 向量可视化

---

## 📐 二、架构要求

### 2.1 统一布局组件

**必须使用**: `ChamberLayout` 组件

```typescript
import ChamberLayout from "@/components/layout/ChamberLayout";

<ChamberLayout
  title={t.title}
  moduleCode="GM1.01"
  difficulty={difficulty}
  onDifficultyChange={handleDifficultyChange}
  stages={[...]}
  currentStage={stage}
  onStageChange={handleStageChange}
  onVerify={verify}
  onNext={next}
  checkStatus={lastCheck}
  footerLeft={t.footer_left}
  translations={{...}}
  monitorContent={<YourVisualizationComponent />}
>
  {/* 左侧习题内容 */}
</ChamberLayout>
```

### 2.2 Quest 管理系统

**必须使用**: `useQuestManager` hook

```typescript
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";

const {
  difficulty,
  stage,
  inputs,
  lastCheck,
  currentQuest,
  setInputs,
  verify,
  next,
  handleDifficultyChange,
  handleStageChange,
} = useQuestManager<YourQuestType, YourStageType>({
  buildPool: (d, s) => buildStagePool(t, d, s),
  initialStage: "STAGE_1",
});
```

**禁止**: 在页面内手写 nonce/validate 逻辑

---

## 🎓 三、难度系统

### 3.1 四级难度

**必须实现**: BASIC / CORE / ADVANCED / ELITE

**要求**:
- ✅ 每个难度级别必须有 **4-5 个独立问题**
- ✅ 难度必须是**独立的**，不是累加的
  - ❌ 错误：选择 CORE 时显示 BASIC + CORE 的题目
  - ✅ 正确：选择 CORE 时只显示 CORE 的题目
- ✅ 难度递进必须明显
  - BASIC: 简单整数，单一概念
  - CORE: 多步骤，组合概念
### 3.2 难度递进的具体要求

**⚠️ 关键原则：难度 = 概念深度，不是数量！**

**这是GM3.01最重要的教训**：
- ❌ 错误：通过增加数量来增加难度（6→52→100→500个方块）
- ✅ 正确：通过增加概念深度来增加难度

**难度递进必须体现在**：
1. **思维方式的转变**（不是计算量的增加）
2. **概念理解的深度**（不是数字的大小）
3. **解题策略的复杂度**（不是步骤的数量）

**BASIC 难度**:
- **思维方式**：直接观察
- **概念要求**：理解基本定义
- **数据特点**：
  - 整数坐标/系数
  - 单一概念
  - 简单计算（心算可完成）
  - 数值简单（如 1, 2, 3, 5, 10）
  - 样本空间小且直观（6-10个元素）
- **示例**（概率）：
  - 掷一个骰子，求掷出1的概率
  - 样本空间直接可见：{1,2,3,4,5,6}
  - 一步计算：P(E) = 1/6

**CORE 难度**:
- **思维方式**：构造和计数
- **概念要求**：理解组合概念
- **数据特点**：
  - 整数，但需要多步计算
  - 组合概念
  - 需要纸笔计算
  - 数值稍复杂（如 15, 26, 52）
  - 样本空间需要构造（36-52个元素）
- **示例**（概率）：
  - 掷两个骰子，求和为7的概率
  - 需要理解：(1,6)和(6,1)是不同结果
  - 需要构造：36种可能的组合
  - 多步计算：找出6种有利结果，P(E) = 6/36

**ADVANCED 难度**:
- **思维方式**：条件和限制
- **概念要求**：理解条件如何改变问题
- **数据特点**：
  - 可能包含小数
  - 多重概念
  - 需要完整计算过程
  - 数值更复杂（如 0.37, 0.63）
  - 条件改变了样本空间
- **示例**（概率）：
  - 掷骰子，已知结果>3，求是偶数的概率
  - 需要理解：条件">3"改变了样本空间
  - 原样本空间：{1,2,3,4,5,6}
  - 新样本空间：{4,5,6}
  - 条件概率：P(偶数|>3) = 2/3 ≠ P(偶数) = 1/2

**ELITE 难度**:
- **思维方式**：分解和策略
- **概念要求**：综合应用多种策略
- **数据特点**：
  - 小数/分数
  - 综合应用
  - 需要深入理解
  - 数值最复杂（如 0.365, 0.625）
  - 需要分解成多个子问题
- **示例**（概率）：
  - 掷两个骰子，至少有一个6的概率
  - 需要策略：使用补集思维
  - P(至少一个6) = 1 - P(没有6)
  - P(没有6) = (5/6) × (5/6) = 25/36
  - P(至少一个6) = 1 - 25/36 = 11/36

**反例** (错误的难度设计 - GM3.01初版的问题):
```
BASIC: 6个方块，计算概率
CORE: 52个方块，计算概率
ADVANCED: 100个方块，计算概率
ELITE: 500个方块，计算概率

问题：
1. 只是数量不同，概念完全一样！
2. 500个方块导致显示溢出
3. 学生只是在数更多的方块，没有学到新概念
4. 难度没有真正递进
```

**正例** (正确的难度设计 - GM3.01改进版):
```
BASIC: 单个骰子 (6个结果)
  - 概念：直接观察样本空间
  - 思维：看到什么就是什么
  
CORE: 两个骰子 (36个结果)
  - 概念：理解组合和"等可能性"
  - 思维：需要构造样本空间，理解(1,6)≠(6,1)
  
ADVANCED: 条件概率 (样本空间变小)
  - 概念：条件改变样本空间
  - 思维：理解"已知某条件"如何影响概率
  
ELITE: 复合事件 (需要分解)
  - 概念：使用补集、加法原理、乘法原理
  - 思维：分解复杂问题，选择合适策略

难度递进：概念深度递进，思维方式转变
```

### 3.3 概念深度递进的设计方法

**步骤1：确定核心概念**
- 这个模块要教什么？（如：概率、导数、向量）

**步骤2：分解概念层次**
- BASIC：最基础的定义和直接应用
- CORE：需要构造或组合的情况
- ADVANCED：有条件或限制的情况
- ELITE：需要综合策略的复杂情况

**步骤3：设计问题**
- 每个层次设计4-5个问题
- 确保每个问题都体现该层次的思维方式
- 避免只改变数字而概念相同

**步骤4：验证难度递进**
- 问自己：从BASIC到CORE，学生需要学会什么新概念？
- 问自己：从CORE到ADVANCED，思维方式有什么变化？
- 问自己：ELITE是否需要综合运用前面的所有概念？

### 3.4 题目数量标准

**每个阶段 (Stage) 的每个难度**:
- 最少: 4 个问题
- 推荐: 4-5 个问题
- 最多: 5 个问题

**示例** (GM1.01-Advanced):
- COMPOSITE 挑战:
  - BASIC: 5 个问题
  - CORE: 4 个问题
  - ADVANCED: 4 个问题
  - ELITE: 4 个问题
- 总计: 17 个问题

**示例** (GM2.01):
- NAVIGATION 阶段:
  - BASIC: 4 个问题
  - CORE: 5 个问题
  - ADVANCED: 5 个问题
  - ELITE: 5 个问题
- 总计: 19 个问题

---

## 🌍 四、国际化要求

### 4.1 三语支持

**必须支持**: 德语 (DE) / 英语 (EN) / 中文 (CN)

**所有文本必须在 `src/lib/i18n.ts` 中定义**:
```typescript
gm1_01: {
  title: "G1.01 // DERIVATIVE CHAMBER",
  difficulty: {
    basic: "BASIC",
    core: "CORE",
    advanced: "ADVANCED",
    elite: "ELITE"
  },
  stages: {
    power_rule: "POWER RULE",
    // ...
  },
  scenarios: {
    power_rule: "详细场景描述...",
    // ...
  },
  // ...
}
```

### 4.2 翻译完整性检查清单 ⚠️

**⚠️ GM4.01 教训：必须确保所有语言的翻译都完整！**

**每个模块必须检查**:
1. ✅ **title**: 模块标题必须翻译
2. ✅ **difficulty**: basic/core/advanced/elite 必须翻译
3. ✅ **stages**: 所有阶段名称必须翻译
4. ✅ **scenarios**: 所有场景描述必须翻译（最重要！）
5. ✅ **所有提示文本**: check/next/correct/incorrect 等必须翻译

**常见错误**:
- ❌ 中文版本显示 "BASIC/CORE/ADVANCED/ELITE"（应该是"基础/核心/进阶/精英"）
- ❌ 场景描述只有英文，没有中文和德文
- ❌ 阶段名称没有翻译
- ❌ i18n.ts 中的键位置错误（如 gm4_01 内容放在 gc3_02 下）

**验证方法**:
```bash
# 1. 在浏览器中切换到中文
# 2. 检查以下内容是否都是中文：
#    - 模块标题
#    - 难度级别（基础/核心/进阶/精英）
#    - 阶段名称
#    - 场景描述
#    - 所有按钮和提示文本
# 3. 重复检查德文版本
```

**i18n.ts 结构检查**:
```typescript
// 英文版本 (EN)
export const translations = {
  EN: {
    // ...
    gm4_01: {
      title: "GM4.01 // COMPLEX HORIZON",
      difficulty: { basic: "BASIC", core: "CORE", ... },
      scenarios: { basics: "...", operations: "...", polar: "..." },
      stages: { basics: "BASICS", operations: "OPERATIONS", ... }
    }
  },
  CN: {
    // ...
    gm4_01: {  // ⚠️ 必须在正确的位置！
      title: "GM4.01 // 复数地平线",
      difficulty: { basic: "基础", core: "核心", ... },
      scenarios: { basics: "罗氏制药...", operations: "诺华...", polar: "巴塞尔..." },
      stages: { basics: "基础", operations: "运算", ... }
    }
  },
  DE: {
    // ...
    gm4_01: {
      title: "GM4.01 // KOMPLEXER HORIZONT",
      difficulty: { basic: "BASIS", core: "KERN", ... },
      scenarios: { basics: "Roche Pharma...", operations: "Novartis...", polar: "Universität Basel..." },
      stages: { basics: "GRUNDLAGEN", operations: "OPERATIONEN", ... }
    }
  }
}
```

### 4.3 场景描述要求

**必须包含详细的场景描述** (scenarios)

**要求**:
- ✅ 必须是完整的故事背景
- ✅ 必须包含具体的人物/地点/情境
- ✅ 必须包含具体的数字和单位
- ✅ 必须解释现实世界的意义
- ❌ 禁止：抽象的一句话描述

**示例** (GM2.01 NAVIGATION):
```
Basel Drone Delivery Network: You are programming the navigation 
system for Basel's autonomous medical supply drones. The drones 
must calculate precise 3D vectors between hospital rooftops and 
delivery points across the city. Given coordinates A (departure 
helipad at Basel University Hospital) and B (arrival point at 
Claraspital), compute the displacement vector v and its magnitude. 
The magnitude represents the direct flight distance in meters. 
Accurate vector calculation is critical for battery management 
and flight time estimation.
```

**反例** (不够详细):
```
❌ "Calculate the vector between two points."
❌ "Use vectors for navigation."
```

### 4.3 城市和公司名称

**地点**: 使用 **Basel (巴塞尔)**，不用 Zurich
- Basel University Hospital (巴塞尔大学医院)
- Claraspital
- Rhine River (莱茵河)
- Roche Tower (罗氏大厦)

**公司**: 交替使用
- Novartis (诺华)
- Roche (罗氏)

---

## 🎨 五、可视化要求

### 5.1 可视化的核心目的

**⚠️ 关键原则：可视化是为了帮助学生理解，不是为了酷炫！**

**必须满足**:
- ✅ 可视化必须直接帮助理解当前题目
- ✅ 可视化必须显示题目中的所有关键数据
- ✅ 学生必须能从可视化中获取解题信息
- ❌ 禁止：纯装饰性的可视化
- ❌ 禁止：与题目无关的可视化
- ❌ 禁止：不显示题目数据的可视化

**反例** (GM3.01 初版的错误):
- ❌ 所有阶段显示相同的图（硬币或分布图）
- ❌ 图中只显示 n=5, p=0.5，但题目需要其他数据
- ❌ 基础概率题目显示二项分布图（概念不匹配）
- ❌ 学生无法从图中获取解题所需的信息

**正例** (应该怎么做):
- ✅ 基础概率：显示样本空间和有利结果（如骰子、卡牌）
- ✅ 二项分布：显示 n 次试验的结果分布
- ✅ 条件概率：显示文氏图或概率树
- ✅ 每个阶段的可视化必须不同，匹配概念

### 5.1.1 可视化必须匹配阶段概念

**每个阶段的可视化必须不同**：
- BASIC 阶段：显示直接观察的内容（样本空间网格、骰子面）
- CORE 阶段：显示需要构造的内容（组合树、排列图）
- ADVANCED 阶段：显示条件和限制（文氏图、概率树、条件筛选）
- ELITE 阶段：显示策略和分解（补集对比、多步骤流程）

**禁止**：所有阶段使用相同的可视化！

### 5.1.2 显示数量限制

**网格显示限制**：
- 最多显示 52 个元素（如卡牌）
- 超过 52 个时，使用统计图表而非网格
- 500 个元素会导致溢出和性能问题

**动态字体大小**：
- 1位数：font-size = min(0.5 × itemSize, 18px)
- 2位数：font-size = min(0.4 × itemSize, 14px)
- 3位数：font-size = min(0.3 × itemSize, 11px)
- 添加 `overflow-hidden` 和 `leading-none` CSS 类

### 5.2 LaTeX 公式渲染 ⚠️

**⚠️ GM4.01 教训：所有数学公式必须使用 LaTeX 渲染！**

**必须使用 react-katex**:
```typescript
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

// 行内公式
<InlineMath math="z = a + bi" />

// 块级公式
<BlockMath math="|z|^2 = a^2 + b^2" />
```

**常见错误**:
- ❌ 直接显示原始 LaTeX 代码：`z^{4}Find z^n`
- ❌ 使用普通文本：`模长变为 r^n，角度变为 n·θ`
- ❌ 混合使用：`z₁ + z₂`（应该用 LaTeX）

**正确做法**:
```typescript
// ❌ 错误
<div>z^{4}</div>
<div>模长变为 r^n，角度变为 n·θ</div>

// ✅ 正确
<InlineMath math="z^{4}" />
<InlineMath math="\text{模长变为 } r^n\text{，角度变为 } n\cdot\theta" />
```

**中文文本处理**:
```typescript
// 在 LaTeX 中包含中文文本
<InlineMath math="\text{平行四边形法则：从原点到 } z_1\text{，再从 } z_1 \text{ 平移 } z_2" />
```

### 5.3 自动缩放和视图适配 ⚠️

**⚠️ GM4.01 教训：可视化必须自动适配所有数据范围！**

**问题**:
- 固定的 scale 和 origin 导致大数值超出可视范围
- 用户无法看到完整的图形
- 无法缩放或平移

**解决方案**:

#### 5.3.1 动态计算边界
```typescript
const bounds = useMemo(() => {
  const points: Array<{ re: number; im: number }> = [];
  
  // 收集所有需要显示的点
  if (quest.z1) points.push(quest.z1);
  if (quest.z2) points.push(quest.z2);
  if (result) points.push(result);
  
  // 计算最小/最大值
  const reValues = points.map(p => p.re);
  const imValues = points.map(p => p.im);
  
  const minRe = Math.min(...reValues, 0);
  const maxRe = Math.max(...reValues, 0);
  const minIm = Math.min(...imValues, 0);
  const maxIm = Math.max(...imValues, 0);
  
  // 添加 30% 边距
  const reRange = maxRe - minRe;
  const imRange = maxIm - minIm;
  const padding = 0.3;
  
  return {
    minRe: minRe - reRange * padding,
    maxRe: maxRe + reRange * padding,
    minIm: minIm - imRange * padding,
    maxIm: maxIm + imRange * padding,
  };
}, [quest, result]);
```

#### 5.3.2 自动计算缩放比例
```typescript
const scale = useMemo(() => {
  const reRange = bounds.maxRe - bounds.minRe;
  const imRange = bounds.maxIm - bounds.minIm;
  const maxRange = Math.max(reRange, imRange, 10); // 最小范围 10
  return (canvasSize * 0.8) / maxRange;
}, [bounds, canvasSize]);
```

#### 5.3.3 动态网格步长
```typescript
const gridStep = useMemo(() => {
  const range = Math.max(bounds.maxRe - bounds.minRe, bounds.maxIm - bounds.minIm);
  if (range > 50) return 10;
  if (range > 20) return 5;
  if (range > 10) return 2;
  return 1;
}, [bounds]);
```

#### 5.3.4 SVG viewBox
```typescript
<svg 
  width={canvasSize} 
  height={canvasSize} 
  viewBox={`0 0 ${canvasSize} ${canvasSize}`}
  className="bg-black/50 rounded-xl border border-white/10"
>
```

**效果**:
- ✅ 小数值（z = 3 + 4i）：网格步长 = 1，放大显示
- ✅ 大数值（z^5 = 100 + 200i）：网格步长 = 10，缩小显示
- ✅ 所有内容始终可见，自动适配

#### 5.3.5 增加边距以防止标签溢出

**⚠️ GM4.01 教训：30% 边距不够，标签仍会超出视图！**

```typescript
// ❌ 错误：30% 边距不够
const padding = 0.3;

// ✅ 正确：50% 边距确保标签不会超出
const padding = 0.5;
```

**原因**:
- 标签需要额外的空间（通常 20-30 像素）
- 标签位置在点的外侧（使用 getLabelOffset）
- 30% 边距只考虑了点本身，没有考虑标签

### 5.4 标签定位和重叠避免 ⚠️

**⚠️ GM4.01 教训：标签绝对不能与向量线或坐标轴重叠！**

**问题**:
- 标签直接放在点的固定位置（如 +10, -10）
- 导致标签与向量线重叠
- 导致标签与坐标轴重叠
- 用户体验极差，无法阅读

**解决方案：智能标签定位**

#### 5.4.1 实现 getLabelOffset 函数

```typescript
// 智能标签定位，避免与线和轴重叠
const getLabelOffset = (re: number, im: number, labelType: 'point' | 'side' = 'point') => {
  if (labelType === 'side') {
    // 对于边标签（a, b），垂直于线偏移
    if (Math.abs(im) < 0.5) {
      // 水平线，垂直偏移
      return { dx: 0, dy: re > 0 ? 20 : -20 };
    } else {
      // 垂直线，水平偏移
      return { dx: im > 0 ? 25 : -25, dy: 0 };
    }
  }
  
  // 对于点标签，沿着远离原点的方向偏移
  const angle = Math.atan2(im, re);
  const distance = 25; // 像素
  
  // 调整角度以避免坐标轴
  let adjustedAngle = angle;
  const threshold = Math.PI / 12; // 15 度
  
  // 避免水平轴
  if (Math.abs(angle) < threshold) {
    adjustedAngle = threshold;
  } else if (Math.abs(angle - Math.PI) < threshold) {
    adjustedAngle = Math.PI - threshold;
  } else if (Math.abs(angle + Math.PI) < threshold) {
    adjustedAngle = -Math.PI + threshold;
  }
  
  // 避免垂直轴
  if (Math.abs(angle - Math.PI / 2) < threshold) {
    adjustedAngle = Math.PI / 2 + threshold;
  } else if (Math.abs(angle + Math.PI / 2) < threshold) {
    adjustedAngle = -Math.PI / 2 - threshold;
  }
  
  return {
    dx: Math.cos(adjustedAngle) * distance,
    dy: -Math.sin(adjustedAngle) * distance,
  };
};
```

#### 5.4.2 使用智能定位

```typescript
// ❌ 错误：固定偏移
<text
  x={toCanvas(quest.z1.re, quest.z1.im).x + 10}
  y={toCanvas(quest.z1.re, quest.z1.im).y - 10}
  fill="#00e5ff"
>
  z₁
</text>

// ✅ 正确：智能偏移
{(() => {
  const offset = getLabelOffset(quest.z1.re, quest.z1.im);
  return (
    <text
      x={toCanvas(quest.z1.re, quest.z1.im).x + offset.dx}
      y={toCanvas(quest.z1.re, quest.z1.im).y + offset.dy}
      fill="#00e5ff"
      fontSize="14"
      fontWeight="bold"
      textAnchor="middle"
    >
      z₁
    </text>
  );
})()}
```

#### 5.4.3 标签定位原则

**必须遵守**:
1. ✅ 标签必须沿着远离原点的方向偏移
2. ✅ 标签必须避开坐标轴（±15° 范围内）
3. ✅ 边标签必须垂直于边偏移
4. ✅ 使用 `textAnchor="middle"` 居中对齐
5. ✅ 所有标签使用相同的偏移距离（25px）

**禁止**:
- ❌ 固定偏移（+10, -10）
- ❌ 标签与向量线重叠
- ❌ 标签与坐标轴重叠
- ❌ 标签超出 SVG 边界

#### 5.4.4 验证方法

**测试场景**:
1. 小数值（z = 2 + 3i）
2. 大数值（z = 50 + 100i）
3. 负数值（z = -5 - 8i）
4. 接近坐标轴（z = 10 + 0.5i）
5. 乘法运算（向量密集）

**检查清单**:
- [ ] 所有标签可见且不超出边界
- [ ] 标签不与向量线重叠
- [ ] 标签不与坐标轴重叠
- [ ] 标签位置合理（在点的外侧）
- [ ] 不同难度级别都正常显示

### 5.5 3D 可视化标准

**必须满足**:
- ✅ 可视化必须直接展示当前题目的数据
- ✅ 必须有清晰的坐标/数值标签
- ✅ 标签不能与轴线/几何体重合
- ✅ 必须支持多语言文本
- ✅ 必须显示题目中的具体数值

**GM2.01 的改进示例**:
- ✅ 点 A 和 B 显示坐标标签
- ✅ 左上角显示坐标信息面板
- ✅ 箭头使用闭合的 cone geometry
- ✅ 标签偏移，避免与轴线重合
- ✅ 从点到标签有连接线

### 5.6 2D 函数可视化标准

**必须满足**:
- ✅ 函数图像必须实时更新
- ✅ 必须显示关键点（切点、交点等）
- ✅ 必须有网格和坐标轴
- ✅ 必须有图例说明

**GM1.01 的示例**:
- ✅ 显示函数曲线
- ✅ 显示切线
- ✅ 显示用户输入的导数值
- ✅ 显示正确的导数值（验证后）

### 5.7 信息显示

**必须在可视化中显示**:
- ✅ 题目的关键数据（坐标、向量、函数等）
- ✅ 计算提示（公式、单位等）
- ✅ 状态信息（READY / VERIFIED / MISMATCH）
- ✅ 题目中提到的所有数值

**可选显示**:
- 中间计算结果
- 辅助几何体
- 动画效果

---

## 📝 六、题目设计要求

### 6.1 题目完整性要求

**⚠️ 关键原则：题目必须包含所有解题所需的信息！**

**每个题目必须明确给出**:
- ✅ 所有已知条件（数值、参数）
- ✅ 求解目标（要计算什么）
- ✅ 必要的背景信息
- ❌ 禁止：让学生猜测缺失的数据
- ❌ 禁止：题目描述模糊不清
- ❌ 禁止：只说"计算概率"而不给具体条件

**反例** (错误的题目设计):
```
场景：诺华质量控制
题目：计算概率 P(E)
问题：学生看不到任何数值，无法计算！
```

**正例** (正确的题目设计):
```
场景：诺华质量控制
题目：在 100 个样本中，有 85 个通过质量测试。
      计算随机选择一个样本通过测试的概率 P(E)。
已知：favorable = 85, total = 100
求：P(E) = ?
```

### 6.2 场景描述要求

**场景描述必须包含**:
- ✅ 具体的情境（谁在哪里做什么）
- ✅ 具体的数值（多少个样本、多少次试验）
- ✅ 明确的问题（要计算什么）
- ✅ 现实意义（为什么要计算这个）

**示例** (完整的场景描述):
```
Basel Pharmaceutical Quality Control at Novartis:
You are inspecting a batch of 100 medication samples at Novartis Basel.
Quality tests show that 85 samples passed all safety checks.
Calculate the probability P(E) that a randomly selected sample from 
this batch passes inspection. This probability determines whether the 
entire batch of 10,000 units can be approved for Swiss hospitals.

Given: 85 favorable outcomes out of 100 total samples
Find: P(E) = ?
```

### 6.3 题目结构

**每个题目必须包含**:
```typescript
interface Quest {
  id: string;                    // 唯一标识
  difficulty: Difficulty;        // 难度级别
  stage: Stage;                  // 所属阶段
  promptLatex: string;           // 题目提示（LaTeX）
  expressionLatex: string;       // 表达式（LaTeX）
  targetLatex: string;           // 目标（LaTeX）
  slots: Array<{                 // 输入槽
    id: string;
    labelLatex: string;
    placeholder: string;
    expected: number;
    unit?: string;
  }>;
  correctLatex: string;          // 正确答案（LaTeX）
}
```

### 6.2 数据设计原则

**BASIC 难度**:
- 整数坐标/系数
- 单一概念
- 简单计算（心算可完成）

**CORE 难度**:
- 整数，但需要多步计算
- 组合概念
- 需要纸笔计算

**ADVANCED 难度**:
- 可能包含小数
- 多重概念
- 需要完整计算过程

**ELITE 难度**:
- 小数/分数
- 综合应用
- 需要深入理解

### 6.3 答案验证

**要求**:
- ✅ 保留 2 位小数
- ✅ 使用 `round2()` 函数统一处理
- ✅ 容差范围: ±0.01

```typescript
const round2 = (v: number) => Math.round(v * 100) / 100;
```

---

## 🏗️ 七、代码组织

### 7.1 文件结构

```
src/app/chamber/gm1-01/
└── page.tsx                    // 主页面

src/components/chamber/gm1-01/
├── DerivativeVisualization.tsx // 可视化组件
└── DerivativeCanvas.tsx        // Canvas 组件（如需要）

src/lib/i18n.ts
└── gm1_01: { ... }             // 翻译条目
```

### 7.2 数据组织

**在页面文件中定义数据集**:
```typescript
// BASIC 难度数据
const stageDataBasic = [
  { id: "B1", /* ... */ },
  { id: "B2", /* ... */ },
  { id: "B3", /* ... */ },
  { id: "B4", /* ... */ },
];

// CORE 难度数据
const stageDataCore = [
  { id: "C1", /* ... */ },
  // ...
];

// ADVANCED 难度数据
const stageDataAdvanced = [
  { id: "A1", /* ... */ },
  // ...
];

// ELITE 难度数据
const stageDataElite = [
  { id: "E1", /* ... */ },
  // ...
];
```

### 7.3 构建函数

```typescript
function buildStagePool(
  t: TranslationType, 
  difficulty: Difficulty, 
  stage: Stage
): Quest[] {
  let dataSet;
  switch (difficulty) {
    case "BASIC": dataSet = stageDataBasic; break;
    case "CORE": dataSet = stageDataCore; break;
    case "ADVANCED": dataSet = stageDataAdvanced; break;
    case "ELITE": dataSet = stageDataElite; break;
    default: dataSet = stageDataBasic;
  }
  
  return dataSet.map((item) => {
    // 计算答案
    const answer = calculateAnswer(item);
    
    return {
      id: item.id,
      difficulty,
      stage,
      promptLatex: t.stages.prompt_latex,
      expressionLatex: buildExpression(item),
      targetLatex: "target",
      slots: [
        { 
          id: "answer", 
          labelLatex: "Answer", 
          placeholder: "value", 
          expected: round2(answer) 
        }
      ],
      correctLatex: `Answer = ${round2(answer)}`,
    };
  });
}
```

---

## ✅ 八、质量检查清单

### 8.1 功能检查

- [ ] 所有难度级别都有 **5 个问题**（不是 4 个！）
- [ ] 难度选择是独立的（不累加）
- [ ] 所有阶段都能正常切换
- [ ] 输入验证正确
- [ ] 答案计算准确（保留 2 位小数）
- [ ] "Verify" 按钮正常工作
- [ ] "Next" 按钮正常工作

### 8.2 可视化检查

- [ ] 可视化组件正常渲染
- [ ] 数据实时更新
- [ ] 标签清晰可见
- [ ] 标签不与几何体重合
- [ ] 坐标/数值正确显示
- [ ] 支持 3D 旋转（如适用）
- [ ] **所有数学公式使用 LaTeX 渲染**（不是原始文本！）
- [ ] **图形自动缩放，所有内容可见**（不超出边界！）

### 8.3 国际化检查 ⚠️

**⚠️ 必须在浏览器中实际测试每种语言！**

#### 8.3.1 中文检查
- [ ] 切换到中文（🇨🇳 CN）
- [ ] 模块标题是中文
- [ ] 难度显示"基础/核心/进阶/精英"（不是 BASIC/CORE/ADVANCED/ELITE）
- [ ] 阶段名称是中文
- [ ] 场景描述是中文（最重要！）
- [ ] 所有按钮和提示是中文
- [ ] LaTeX 公式中的中文文本正确显示

#### 8.3.2 德文检查
- [ ] 切换到德文（🇩🇪 DE）
- [ ] 模块标题是德文
- [ ] 难度显示"BASIS/KERN/ERWEITERT/ELITE"
- [ ] 阶段名称是德文
- [ ] 场景描述是德文（最重要！）
- [ ] 所有按钮和提示是德文

#### 8.3.3 英文检查
- [ ] 切换到英文（🇬🇧 EN）
- [ ] 所有文本是英文
- [ ] 场景描述详细完整

#### 8.3.4 i18n.ts 结构检查
- [ ] 每种语言的 gm*_01 section 在正确位置
- [ ] 没有被其他模块覆盖
- [ ] 所有必需的键都存在：title, difficulty, stages, scenarios

### 8.4 代码质量检查

- [ ] `npm run build` 通过
- [ ] 无 TypeScript 错误
- [ ] 无 ESLint 警告
- [ ] 使用 `ChamberLayout` 组件
- [ ] 使用 `useQuestManager` hook
- [ ] 所有文本来自 i18n
- [ ] 所有数学公式使用 `InlineMath` 或 `BlockMath`

### 8.5 浏览器测试检查 ⚠️

**⚠️ 必须在实际浏览器中测试！**

1. **清除缓存**
   - 按 Ctrl+Shift+R (Windows) 或 Cmd+Shift+R (Mac)
   - 或在开发者工具中选择"清除缓存并硬刷新"

2. **测试每种语言**
   - 切换到中文，检查所有文本
   - 切换到德文，检查所有文本
   - 切换到英文，检查所有文本

3. **测试所有难度和阶段**
   - 每个难度都有 5 题
   - 每个阶段的可视化不同
   - 所有公式正确渲染

4. **测试可视化**
   - 所有数据点都在可视范围内
   - 可以看到完整的图形
   - 标签清晰可读

5. **测试不同数值范围**
   - 小数值（如 z = 3 + 4i）
   - 大数值（如 z^5 = 100 + 200i）
   - 确保都能正确显示

---

## 🚀 九、开发流程

### 9.1 创建新模块

1. **创建页面文件**
   ```bash
   src/app/chamber/gm3-01/page.tsx
   ```

2. **创建可视化组件**
   ```bash
   src/components/chamber/gm3-01/YourVisualization.tsx
   ```

3. **添加 i18n 翻译**
   ```typescript
   // src/lib/i18n.ts
   gm3_01: {
     title: "...",
     // ...
   }
   ```

4. **设计数据集**
   - 每个阶段 × 每个难度 = 4-5 个问题
   - 确保难度递进明显

5. **实现 buildStagePool 函数**
   - 根据难度和阶段返回问题列表

6. **实现可视化组件**
   - 接收 currentQuest 数据
   - 实时更新显示

7. **测试**
   - 所有难度级别
   - 所有阶段
   - 所有语言

8. **编译和推送**
   ```bash
   npm run build
   git add -A
   git commit -m "feat: add GM3.01 module"
   git push
   ```

### 9.2 修改现有模块

1. **读取现有代码**
   - 理解当前结构
   - 识别需要改进的地方

2. **按标准修改**
   - 补充题目数量（4-5 个/难度）
   - 添加详细场景描述
   - 改进可视化

3. **测试和验证**
   - 功能测试
   - 可视化测试
   - 国际化测试

4. **编译和推送**

---

## 📊 十、参考示例

### 10.1 完整示例：GM2.01

**特点**:
- ✅ 3 个阶段 (NAVIGATION / DOT / MISSION)
- ✅ 每个阶段 4-5 个问题/难度
- ✅ 总计 52 个问题
- ✅ 3D 可视化实时更新
- ✅ 坐标信息清晰显示
- ✅ 详细场景描述（Basel 无人机、Roche 太阳能板、Rhine 驳船）
- ✅ 三语完整翻译

**文件**:
- `src/app/chamber/gm2-01/page.tsx`
- `src/components/chamber/gm2-01/VectorVisualization.tsx`
- `src/lib/i18n.ts` (gm2_01 section)

### 10.2 完整示例：GM1.01-Advanced

**特点**:
- ✅ 4 个挑战类型
- ✅ 每个类型 4-5 个问题/难度
- ✅ 总计 66 个问题
- ✅ 2D 函数可视化
- ✅ 实时导数计算
- ✅ 详细场景描述

**文件**:
- `src/app/chamber/gm1-01-advanced/page.tsx`
- `src/components/chamber/gm1-01/DerivativeVisualization.tsx`
- `src/lib/i18n.ts` (gm1_01_advanced section)

---

## 🎯 十一、GM3.01 改造计划

### 11.1 当前状态分析

**需要检查**:
- 当前有多少个阶段？
- 每个阶段有多少个问题？
- 是否有可视化组件？
- 场景描述是否详细？

### 11.2 改造目标

**必须达到**:
- ✅ 3-4 个阶段（根据概率主题）
- ✅ 每个阶段每个难度 4-5 个问题
- ✅ 总计 48-80 个问题
- ✅ 混合模式：左侧习题 + 右侧可视化
- ✅ 详细的 Basel 场景描述
- ✅ 三语完整翻译

### 11.3 可能的阶段设计

**建议阶段**:
1. **BASIC_PROBABILITY** - 基础概率计算
2. **CONDITIONAL** - 条件概率
3. **DISTRIBUTION** - 概率分布
4. **MISSION** - 综合应用（Basel 彩票、保险等）

---

## 🎓 十二、GM3.01 经验教训总结

### 12.1 核心教训

**1. 难度 = 概念深度，不是数量**
- ❌ 错误：6→52→100→500 个方块（只是数量增加）
- ✅ 正确：直接观察→构造组合→条件概率→补集策略（概念递进）

**2. 可视化必须教育，不是装饰**
- ❌ 错误：所有阶段显示相同的图
- ✅ 正确：每个阶段的图匹配该阶段的概念

**3. 题目必须完整**
- ❌ 错误："计算概率"（没有给数据）
- ✅ 正确："85/100 样本通过，计算 P(E)"（数据完整）

**4. 显示限制**
- ❌ 错误：500 个方块导致溢出
- ✅ 正确：最多 52 个元素，使用动态字体大小

**5. 每次修改必须测试**
- ❌ 错误：修改后不测试就说完成
- ✅ 正确：`npm run build` 通过后才算完成

---

## 🎓 十三、GM4.01 经验教训总结

### 13.1 核心教训

**1. 翻译必须完整且在正确位置**
- ❌ 错误：中文版本显示 "BASIC/CORE/ADVANCED/ELITE"
- ❌ 错误：gm4_01 的内容放在 gc3_02 的位置
- ❌ 错误：场景描述只有英文，没有中文
- ✅ 正确：每种语言都有完整的翻译，在正确的位置

**2. 所有数学公式必须使用 LaTeX 渲染**
- ❌ 错误：显示原始代码 `z^{4}Find z^n`
- ❌ 错误：使用普通文本 `模长变为 r^n，角度变为 n·θ`
- ✅ 正确：使用 `<InlineMath math="..." />` 渲染所有公式

**3. 可视化必须自动缩放适配**
- ❌ 错误：固定 scale，大数值超出可视范围
- ❌ 错误：用户看不到完整图形，无法缩放
- ✅ 正确：动态计算边界和 scale，自动适配所有数值范围
- ✅ 正确：使用 50% 边距（不是 30%）确保标签不超出

**4. 标签绝对不能与线和轴重叠**
- ❌ 错误：固定偏移（+10, -10）导致标签与向量线重叠
- ❌ 错误：标签与坐标轴重叠，无法阅读
- ❌ 错误：乘法运算时向量密集，标签全部重叠
- ✅ 正确：实现 `getLabelOffset()` 智能定位函数
- ✅ 正确：标签沿着远离原点方向偏移，避开坐标轴（±15°）

**5. 每个难度必须有 5 题**
- ❌ 错误：只有 4 题
- ✅ 正确：每个难度 5 题，总共 60 题（4 难度 × 3 阶段 × 5 题）

**6. 必须在浏览器中实际测试**
- ❌ 错误：只看代码就说完成，不在浏览器中测试
- ❌ 错误：不测试每种语言
- ✅ 正确：清除缓存，测试中文/德文/英文，确认所有文本正确

### 13.2 翻译检查流程

**步骤 1：检查 i18n.ts 结构**
```bash
# 确认每种语言的 gm*_01 section 在正确位置
# EN: Line ~100
# CN: Line ~5100  
# DE: Line ~7700
```

**步骤 2：检查翻译完整性**
- [ ] title 翻译
- [ ] difficulty 翻译（basic/core/advanced/elite）
- [ ] stages 翻译
- [ ] scenarios 翻译（最重要！）
- [ ] 所有按钮和提示翻译

**步骤 3：浏览器测试**
1. 清除缓存（Ctrl+Shift+R）
2. 切换到中文，检查所有文本
3. 切换到德文，检查所有文本
4. 切换到英文，检查所有文本

### 13.3 可视化自动缩放实现

**必须实现的功能**:
1. 动态计算所有点的边界
2. 根据边界自动计算 scale
3. 动态调整网格步长
4. 添加 50% 边距确保标签不超出（不是 30%！）

**代码模板**:
```typescript
// 1. 计算边界
const bounds = useMemo(() => {
  const points = [/* 收集所有点 */];
  const reValues = points.map(p => p.re);
  const imValues = points.map(p => p.im);
  
  const minRe = Math.min(...reValues, 0);
  const maxRe = Math.max(...reValues, 0);
  const minIm = Math.min(...imValues, 0);
  const maxIm = Math.max(...imValues, 0);
  
  const padding = 0.5; // ⚠️ 50% 不是 30%！
  const reRange = Math.max(maxRe - minRe, 2);
  const imRange = Math.max(maxIm - minIm, 2);
  
  return {
    minRe: minRe - reRange * padding,
    maxRe: maxRe + reRange * padding,
    minIm: minIm - imRange * padding,
    maxIm: maxIm + imRange * padding,
  };
}, [points]);

// 2. 计算 scale
const scale = useMemo(() => {
  const reRange = bounds.maxRe - bounds.minRe;
  const imRange = bounds.maxIm - bounds.minIm;
  const maxRange = Math.max(reRange, imRange, 10);
  return (canvasSize * 0.8) / maxRange;
}, [bounds]);

// 3. 动态网格步长
const gridStep = useMemo(() => {
  const range = Math.max(bounds.maxRe - bounds.minRe, bounds.maxIm - bounds.minIm);
  if (range > 50) return 10;
  if (range > 20) return 5;
  if (range > 10) return 2;
  return 1;
}, [bounds]);
```

### 13.4 标签智能定位实现

**必须实现的功能**:
1. 标签沿着远离原点的方向偏移
2. 避开坐标轴（±15° 范围内）
3. 边标签垂直于边偏移
4. 所有标签使用统一的偏移距离

**代码模板**:
```typescript
const getLabelOffset = (re: number, im: number, labelType: 'point' | 'side' = 'point') => {
  if (labelType === 'side') {
    // 边标签：垂直于线偏移
    if (Math.abs(im) < 0.5) {
      return { dx: 0, dy: re > 0 ? 20 : -20 };
    } else {
      return { dx: im > 0 ? 25 : -25, dy: 0 };
    }
  }
  
  // 点标签：沿着远离原点方向偏移
  const angle = Math.atan2(im, re);
  const distance = 25;
  let adjustedAngle = angle;
  const threshold = Math.PI / 12; // 15°
  
  // 避开水平轴
  if (Math.abs(angle) < threshold) {
    adjustedAngle = threshold;
  } else if (Math.abs(angle - Math.PI) < threshold) {
    adjustedAngle = Math.PI - threshold;
  } else if (Math.abs(angle + Math.PI) < threshold) {
    adjustedAngle = -Math.PI + threshold;
  }
  
  // 避开垂直轴
  if (Math.abs(angle - Math.PI / 2) < threshold) {
    adjustedAngle = Math.PI / 2 + threshold;
  } else if (Math.abs(angle + Math.PI / 2) < threshold) {
    adjustedAngle = -Math.PI / 2 - threshold;
  }
  
  return {
    dx: Math.cos(adjustedAngle) * distance,
    dy: -Math.sin(adjustedAngle) * distance,
  };
};

// 使用智能定位
{(() => {
  const offset = getLabelOffset(quest.z1.re, quest.z1.im);
  return (
    <text
      x={toCanvas(quest.z1.re, quest.z1.im).x + offset.dx}
      y={toCanvas(quest.z1.re, quest.z1.im).y + offset.dy}
      fill="#00e5ff"
      fontSize="14"
      fontWeight="bold"
      textAnchor="middle"
    >
      z₁
    </text>
  );
})()}
```

**测试场景**:
- [ ] 小数值（z = 2 + 3i）
- [ ] 大数值（z = 50 + 100i）
- [ ] 负数值（z = -5 - 8i）
- [ ] 接近坐标轴（z = 10 + 0.5i）
- [ ] 乘法运算（向量密集）

### 13.4 应用到其他模块

**在修改任何模块时，必须检查**：
1. 翻译是否完整？（中文/德文/英文）
2. 翻译是否在正确位置？（不被其他模块覆盖）
3. 数学公式是否使用 LaTeX？（不是原始文本）
4. 可视化是否自动缩放？（不超出边界）
5. 每个难度是否有 5 题？（不是 4 题）
6. 是否在浏览器中测试过？（不是只看代码）

---

## 🎯 十四、模块修改完整流程

### 14.1 修改前检查

1. [ ] 阅读 CHAMBER_MODULE_STANDARDS.md
2. [ ] 理解 GM3.01 和 GM4.01 的教训
3. [ ] 确定要修改的内容

### 14.2 修改过程

1. [ ] 修改代码
2. [ ] 添加/更新翻译（EN/CN/DE）
3. [ ] 确保翻译在正确位置
4. [ ] 使用 LaTeX 渲染所有公式
5. [ ] 实现可视化自动缩放
6. [ ] 确保每个难度 5 题

### 14.3 测试验证

1. [ ] `npm run build` 通过
2. [ ] 清除浏览器缓存
3. [ ] 测试中文版本（所有文本、公式、可视化）
4. [ ] 测试德文版本（所有文本、公式、可视化）
5. [ ] 测试英文版本（所有文本、公式、可视化）
6. [ ] 测试不同数值范围（小数值、大数值）
7. [ ] 测试所有难度和阶段

### 14.4 提交前确认

1. [ ] 所有测试通过
2. [ ] 所有语言正确显示
3. [ ] 所有公式正确渲染
4. [ ] 所有图形完整可见
5. [ ] 创建测试报告文档

### 14.5 提交到 GitHub

```bash
git add -A
git commit -m "fix: [模块名] - [修改内容]"
git push
```

---

**文档维护**: 每次模块设计标准更新后更新本文档  
**最后更新**: 2026-02-13 (添加 GM4.01 经验教训)  
**下次更新**: 下一个模块改造完成后  
**负责人**: Kiro AI
