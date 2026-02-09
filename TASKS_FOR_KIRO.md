# Mission K84 - Math Visualization Overhaul (Phase 1)

## 任务概述
根据总监批准的《数学可视化改进提案》，彻底重构 SM2 系列的三个核心模块。目标是引入直观的物理模型和真实场景，替换掉枯燥的数字计算和静态图表。

## 涉及模块
1. **SM2-01**: 二项式定理 (The Binomial Factory) -> 改为 **Mendel's Garden (孟德尔花园)**
2. **SM2-02**: 勾股定理 (The Pythagorean Studio) -> 改为 **The Fluid Chamber (流体室)**
3. **SM2-03**: 直线与函数 (Linear Navigator) -> 改为 **Slope Rider (极速滑雪)**

---

## 详细任务清单

### 1. SM2-01: Mendel's Garden (二项式定理)
- [ ] **创建新组件**: `src/components/chamber/sm2-01/MendelGeneticsCanvas.tsx`
- [ ] **交互逻辑**:
  - 输入：父代基因型 (如 Aa x Aa, 或 Aa x aa)。
  - 可视化：不再是单纯的边长 a, b，而是基因组合的正方形网格 (Punnett Square)。
  - **核心点**: 突出 `(A+a)² = AA + 2Aa + aa` 的结构。
  - **反馈**: 能够看到子代特征分布（如显性红花 vs 隐性白花），直观感受 `2Aa` 中系数 2 的来源。
- [ ] **替换旧组件**: 在 `src/app/chamber/sm2-01/page.tsx` 中替换 `BinomialSquareCanvas`。

### 2. SM2-02: The Fluid Chamber (勾股定理)
- [ ] **技术准备**: 安装 `matter-js` (`npm install matter-js @types/matter-js`)。
- [ ] **创建新组件**: `src/components/chamber/sm2-02/PythagorasFluidCanvas.tsx`
- [ ] **交互逻辑**:
  - 创建三个围绕直角三角形旋转的正方形容器 (a², b², c²)。
  - 初始状态：a² 和 b² 容器装满“流体粒子”（用 matter-js 模拟）。
  - **操作**: 用户旋转整个装置。
  - **反馈**: 流体受重力流向 c² 容器，最终填满，直观证明面积守恒。
- [ ] **替换旧组件**: 在 `src/app/chamber/sm2-02/page.tsx` 中替换 `PythagorasSimple2D`。

### 3. SM2-03: Slope Rider (直线与函数)
- [ ] **创建新组件**: `src/components/chamber/sm2-03/SlopeRiderCanvas.tsx`
- [ ] **交互逻辑**:
  - 场景：滑雪场或飞行跑道。
  - **参数 m (Slope)**: 控制坡度的陡峭程度。正值上坡，负值下坡。|m| 越大越陡。
  - **参数 c (Intercept)**: 控制起跳台/跑道的高度。
  - **反馈**: 实时绘制 `y = mx + c` 的直线路径。角色（滑雪者/飞机）沿线运动。
  - **目标**: 调整 m, c 避开障碍并在终点着陆。
- [ ] **替换旧组件**: 在 `src/app/chamber/sm2-03/page.tsx` 中替换 `LaserCanvas`。

---

## 验收标准
1. **直观性**: 学生能在 **5秒内** 理解 m, c 的几何意义，或 `a² + b² = c²` 的面积关系，无需阅读长篇说明。
2. **互动性**: 所有参数调整必须有即时的视觉反馈（如流体流动、路径改变）。
3. **趣味性**: 摆脱纯数学计算，引入物理/生物场景。

## 资源
- 参考 `PROPOSAL_MATH_VIS_IMPROVEMENTS.md` 获取详细设计思路。
- 使用 `matter-js` 文档实现流体效果。

## 开始前注意
- 这是一个重大的 UX 更新，请确保先备份现有代码或在独立分支工作。
- 优先实现 MVP (最小可行性产品)，复杂的物理效果可以逐步优化。
