# 🎯 Chamber Module Design Standards
## GM1.01 和 GM2.01 的设计要求总结

**创建时间**: 2026-02-13  
**版本**: v1.0  
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
  - ADVANCED: 复杂数值，多重概念
  - ELITE: 小数/分数，综合应用

### 3.2 题目数量标准

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

### 4.2 场景描述要求

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

### 5.1 3D 可视化标准

**必须满足**:
- ✅ 可视化必须直接展示当前题目的数据
- ✅ 必须有清晰的坐标/数值标签
- ✅ 标签不能与轴线/几何体重合
- ✅ 必须支持多语言文本

**GM2.01 的改进示例**:
- ✅ 点 A 和 B 显示坐标标签
- ✅ 左上角显示坐标信息面板
- ✅ 箭头使用闭合的 cone geometry
- ✅ 标签偏移，避免与轴线重合
- ✅ 从点到标签有连接线

### 5.2 2D 可视化标准

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

### 5.3 信息显示

**必须在可视化中显示**:
- ✅ 题目的关键数据（坐标、向量、函数等）
- ✅ 计算提示（公式、单位等）
- ✅ 状态信息（READY / VERIFIED / MISMATCH）

**可选显示**:
- 中间计算结果
- 辅助几何体
- 动画效果

---

## 📝 六、题目设计要求

### 6.1 题目结构

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

- [ ] 所有难度级别都有 4-5 个问题
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

### 8.3 国际化检查

- [ ] 德语翻译完整
- [ ] 英语翻译完整
- [ ] 中文翻译完整
- [ ] 场景描述详细（每个阶段）
- [ ] 所有 LaTeX 公式正确
- [ ] 语言切换正常

### 8.4 代码质量检查

- [ ] `npm run build` 通过
- [ ] 无 TypeScript 错误
- [ ] 无 ESLint 警告
- [ ] 使用 `ChamberLayout` 组件
- [ ] 使用 `useQuestManager` hook
- [ ] 所有文本来自 i18n

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

**文档维护**: 每次模块设计标准更新后更新本文档  
**下次更新**: GM3.01 改造完成后  
**负责人**: Kiro AI
