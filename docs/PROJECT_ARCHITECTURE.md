# 🏗️ Science Theme Park - 项目架构全景图
## 完整的代码结构与模块关系

**生成时间**: 2026-02-06  
**版本**: v2.2  
**总模块数**: 58 个

---

## 📐 一、整体架构层次

```
Science Theme Park (Next.js 14 App Router)
│
├── 🎯 Entry Layer (入口层)
│   ├── src/app/page.tsx ...................... 首页/Nexus 导航
│   └── src/app/layout.tsx .................... 全局布局
│
├── 🧪 Chamber Layer (实验室层)
│   ├── src/app/chamber/[module-id]/page.tsx .. 58 个模块页面
│   └── src/components/chamber/[module-id]/ ... 对应的 Canvas 组件
│
├── 🌐 i18n Layer (国际化层)
│   └── src/lib/i18n.ts ....................... 三语翻译 (DE/EN/CN)
│
├── 🎨 Component Layer (组件层)
│   ├── src/components/EntryProtocol.tsx ...... 入口协议动画
│   ├── src/components/ConceptIcon.tsx ........ 概念图标
│   └── src/components/PhysicsSimulator.tsx ... 物理模拟器
│
└── 📊 State Layer (状态层)
    └── src/lib/store.ts ...................... Zustand 全局状态
```

---

## 🗺️ 二、模块分布地图

### 2.1 数学模块 (Mathematics) - 20 个

#### Sekundarschule (初中) - 13 个
```
📐 S1 系列 - 几何基础
├── s1-01 ✅ Areas & Volumes (面积与体积)
└── s1-02 ✅ Thales Theorem (泰勒斯定理/相似)

📊 S2 系列 - 代数与函数
├── s2-01 ✅ Binomial Formulas (二项式公式)
├── s2-02 ✅ Pythagoras Theorem (勾股定理)
├── s2-03 ✅ Linear Functions (线性函数)
├── s2-04 ✅ Similarity & Scaling (相似与缩放)
├── s2-05 ✅ Powers & Roots (幂与根)
├── s2-06 ✅ Linear Systems (线性方程组)
└── s2-07 ✅ Coordinate Geometry (坐标几何)

📈 S3 系列 - 高级代数
├── s3-01 ✅ Quadratics (二次方程)
├── s3-02 ✅ Trigonometry (三角函数)
├── s3-03 ✅ Exponential Growth (指数增长)
└── s3-04 ✅ Logarithmic Scales (对数尺度)
```

#### Gymnasium (高中) - 7 个
```
🎓 G1-G5 系列 - 高等数学
├── g1-01 ✅ Calculus (微积分)
├── g1-01-advanced ✅ Advanced Calculus (高级微积分)
├── g2-01 ✅ Vector Geometry 3D (三维向量几何)
├── g3-01 ✅ Probability Vault (概率金库)
├── g4-01 ✅ Complex Numbers (复数)
├── g5-01 ✅ Matrix Geometry (矩阵几何)
└── gs1-01 ✅ Complex Fractal (复数分形) [新增]
```

---

### 2.2 物理模块 (Physics) - 20 个

#### Sekundarschule (初中) - 12 个
```
⚙️ P1 系列 - 力学基础
├── p1-02 ✅ Newton's Laws (牛顿定律) [需重命名→sp1-02]
├── p1-03 ✅ Energy & Power (能量与功率) [需重命名→sp1-03]
├── p1-04 ✅ Time Dilation (时间膨胀) [需重命名→sp1-04]
└── p1-05 ✅ The Rhine Ferry (莱茵河渡轮) [需重命名→sp1-05]

🔌 P2 系列 - 电学与热学
├── p2-01 ✅ Thermodynamics (热力学) [需重命名→sp2-01]
└── p2-02 ✅ Circuit Sandbox (电路沙盒) [需重命名→sp2-02]

🌊 P3 系列 - 光学与波动
├── p3-01 ✅ Geometrical Optics (几何光学) [需重命名→sp3-01]
└── p3-02 ✅ Wave Optics (波动光学) [需重命名→sp3-02]

📡 SP 系列 - 标准命名
├── sp1-05 ✅ The Rhine Ferry (莱茵河渡轮) [重复?]
├── sp1-06 ✅ Swiss Pendulum (瑞士钟摆)
├── sp1-08 ✅ Optics Bench (光学工作台)
├── sp2-02 ✅ Circuit Sandbox 2.0 (电路沙盒2.0) [重复?]
├── sp2-03 ✅ Motor Lab (电机实验室)
└── sp4-01 ✅ Wave Basics (波动基础)
```

#### Gymnasium (高中) - 8 个
```
⚛️ P5/GP5 系列 - 现代物理
├── p5-01 ✅ The Atomic Core (原子核) [需重命名→gp5-01]
├── p5-02 ✅ Relativity Lab (相对论实验室) [需重命名→gp5-02]
├── p5-03 ✅ Particle Collider (粒子对撞机) [需重命名→gp5-03]
├── p5-04 ✅ Quantum Tunnel (量子隧道) [需重命名→gp5-04]
├── gp5-01 ✅ The Atomic Core (原子核) [重复?]
└── gp5-02 ✅ Relativity Lab (相对论实验室) [重复?]
```

**⚠️ 发现重复模块**:
- `p1-05` 和 `sp1-05` 可能重复
- `p2-02` 和 `sp2-02` 可能重复
- `p5-01` 和 `gp5-01` 可能重复
- `p5-02` 和 `gp5-02` 可能重复

---

### 2.3 化学模块 (Chemistry) - 14 个

#### Sekundarschule (初中) - 8 个
```
🧪 C1/SC1 系列 - 化学基础
├── c1-01 ✅ Mystery Lab (神秘实验室) [需重命名→sc1-01]
├── c1-02 ✅ Mole Master (摩尔大师) [需重命名→sc1-02]
├── sc1-03 ✅ Atoms Forge (原子锻造)
└── sc1-04 ✅ Periodic Puzzle (元素周期表)

⚗️ C2/SC2 系列 - 化学反应
├── c2-01 ✅ Reaction Kinetics (反应动力学) [需重命名→sc2-01]
├── sc2-02 ✅ pH Sentinel (pH 哨兵)
├── sc2-03 ✅ Aero Lab (气体实验室)
└── sc2-04 ✅ Solubility Lab (溶解度实验室)

🔬 C3 系列 - 分子结构
└── c3-01 ✅ Molecular Architect (分子建筑师) [需重命名→sc3-01?]
```

#### Gymnasium (高中) - 6 个
```
⚡ GC1 系列 - 电化学
└── gc1-01 ✅ Redox Titan (氧化还原巨人)

🧬 GC2 系列 - 有机化学
└── gc2-01 ✅ Carbon Kingdom (碳王国)

⚖️ GC3 系列 - 化学平衡
├── gc3-01 ✅ Equilibrium Master (平衡大师)
└── gc3-02 ✅ Crystal Palace (晶体宫殿)
```

---

### 2.4 生物模块 (Biology) - 4 个

#### Sekundarschule (初中) - 2 个
```
🧬 SB1 系列 - 细胞生物学
├── sb1-01 ✅ Cell Factory (细胞工厂)
└── sb1-01-metabolic ✅ Metabolic Pathways (代谢途径) [变体]

🌱 SB2 系列 - 遗传学
└── sb2-01 ✅ Mendel's Garden (孟德尔花园)
```

#### Gymnasium (高中) - 1 个
```
🧬 GB3 系列 - 分子生物学
└── gb3-01 ✅ DNA Forge (DNA 锻造)
```

---

## 🔗 三、模块间关系图

### 3.1 依赖关系树

```
数学基础 (S1-S2)
    ↓
┌───┴───┬───────┬───────┐
│       │       │       │
物理力学 化学基础 数学进阶 生物基础
(P1-P2) (C1-C2) (S3-G1) (SB1-SB2)
    ↓       ↓       ↓       ↓
高级物理 高级化学 高等数学 分子生物
(P5/GP5)(GC1-GC3)(G2-G5) (GB3)
```

### 3.2 知识图谱

```
📐 几何 (SM1.01, SM1.02)
    ├─→ 三角函数 (SM3.02)
    ├─→ 向量几何 (GM2.01)
    └─→ 矩阵变换 (GM5.01)

📊 代数 (SM2.01, SM2.02, SM3.01)
    ├─→ 微积分 (G1.01)
    ├─→ 复数 (G4.01)
    └─→ 概率 (G3.01)

⚙️ 力学 (P1.02, P1.03)
    ├─→ 能量守恒 (P1.04)
    ├─→ 波动 (P3.01, P3.02, SP4.01)
    └─→ 相对论 (P5.02/GP5.02)

🔌 电学 (P2.02/SP2.02)
    ├─→ 电磁学 (SP2.03)
    └─→ 电化学 (GC1.01)

🧪 化学基础 (C1.01, C1.02, SC1.03, SC1.04)
    ├─→ 反应动力学 (C2.01/SC2.01)
    ├─→ 平衡 (GC3.01)
    └─→ 有机化学 (GC2.01)

⚛️ 现代物理 (P5.01-P5.04 / GP5.01-GP5.04)
    ├─→ 原子核 (P5.01/GP5.01)
    ├─→ 相对论 (P5.02/GP5.02)
    ├─→ 粒子物理 (P5.03/GP5.03)
    └─→ 量子力学 (P5.04/GP5.04)
```

---

## 📂 四、文件结构详图

### 4.1 典型模块结构

```
src/app/chamber/[module-id]/
└── page.tsx ........................ 模块主页面
    ├── 导入 Canvas 组件
    ├── 导入 i18n hook
    ├── 状态管理 (useState)
    ├── 难度控制 (BASIC/CORE/ADVANCED/ELITE)
    └── UI 布局 (Header + Canvas + Control Panel)

src/components/chamber/[module-id]/
├── [ModuleName]Canvas.tsx .......... 主 Canvas (Three.js/R3F)
├── [Feature]Canvas.tsx ............. 特性 Canvas (可选)
└── [Helper].tsx .................... 辅助组件 (可选)
```

### 4.2 完整文件树

```
science-theme-park/
│
├── 📁 src/
│   ├── 📁 app/
│   │   ├── page.tsx .................... 首页 (Nexus)
│   │   ├── layout.tsx .................. 全局布局
│   │   ├── globals.css ................. 全局样式
│   │   │
│   │   ├── 📁 chamber/ ................. 58 个模块
│   │   │   ├── 📁 s1-01/ ............... 数学 S1.01
│   │   │   ├── 📁 s2-02/ ............... 数学 S2.02
│   │   │   ├── 📁 g3-01/ ............... 数学 G3.01
│   │   │   ├── 📁 p1-02/ ............... 物理 P1.02 [需重命名]
│   │   │   ├── 📁 c1-01/ ............... 化学 C1.01 [需重命名]
│   │   │   └── ... (共 58 个)
│   │   │
│   │   └── 📁 profile/ ................. 用户档案页
│   │
│   ├── 📁 components/
│   │   ├── EntryProtocol.tsx ........... 入口协议
│   │   ├── ConceptIcon.tsx ............. 概念图标
│   │   ├── PhysicsSimulator.tsx ........ 物理模拟器
│   │   │
│   │   └── 📁 chamber/ ................. Canvas 组件
│   │       ├── 📁 s2-02/ ............... S2.02 Canvas
│   │       ├── 📁 g3-01/ ............... G3.01 Canvas
│   │       │   ├── ProbabilityCanvas.tsx
│   │       │   └── GaltonCanvas.tsx
│   │       ├── 📁 gc2-01/ .............. GC2.01 Canvas
│   │       │   └── OrganicCanvas.tsx
│   │       └── ... (共 58+ 个组件文件夹)
│   │
│   └── 📁 lib/
│       ├── i18n.ts ..................... 国际化 (7236 行)
│       └── store.ts .................... Zustand 状态管理
│
├── 📁 public/ .......................... 静态资源
│   ├── file.svg
│   ├── globe.svg
│   └── ...
│
├── 📁 Design Documents/ ................ 设计文档
│   ├── 📁 Mathematics/
│   │   ├── 01_Probability_Zone.md
│   │   ├── 02_Logic_Algebra_Zone.md
│   │   └── 03_S2.02_S3.01_Basel_Sek2_Executable_Design.md
│   └── 📁 Physics/
│       ├── 00_Physics_Module_Roadmap.md
│       └── 01_Thermodynamics_Zone.md
│
├── 📁 Resources/ ....................... 参考资料
│   ├── Basel_Curriculum_References.md
│   └── Research_Report_Merged_v2.md
│
├── CURRICULUM_PLAN.md .................. 课程计划
├── MODULE_COMPLETION_REPORT.md ......... 模块完成度报告
├── CONTENT_QUALITY_REPORT.md ........... 内容质量报告
├── FINAL_SUMMARY_REPORT.md ............. 总结报告
├── docs/PROJECT_ARCHITECTURE.md ........ 本文档
├── docs/WORK_PLAN_2026.md .............. 年度工作计划
│
├── package.json ........................ 依赖管理
├── next.config.ts ...................... Next.js 配置
├── tsconfig.json ....................... TypeScript 配置
└── tailwind.config.ts .................. Tailwind CSS 配置
```

---

## 🎨 五、技术栈架构

### 5.1 前端框架层

```
Next.js 14 (App Router)
    ├── React 18
    ├── TypeScript
    └── Tailwind CSS
```

### 5.2 3D 渲染层

```
Three.js / React Three Fiber (R3F)
    ├── @react-three/fiber .......... React 集成
    ├── @react-three/drei ........... 辅助组件
    └── three ........................ 核心 3D 引擎
```

### 5.3 数学渲染层

```
KaTeX
    └── react-katex .................. React 集成
```

### 5.4 状态管理层

```
Zustand
    ├── 全局语言状态 (DE/EN/CN)
    ├── 用户进度追踪
    └── 成就系统
```

### 5.5 国际化层

```
自定义 i18n 系统
    ├── useLanguage() hook
    ├── t() 翻译函数
    └── 7236 行翻译数据
```

---

## 🔄 六、数据流架构

### 6.1 用户交互流

```
用户操作
    ↓
React 组件状态 (useState)
    ↓
Canvas 组件更新 (useFrame)
    ↓
Three.js 场景渲染
    ↓
视觉反馈
```

### 6.2 国际化流

```
用户选择语言
    ↓
Zustand Store 更新
    ↓
useLanguage() hook 触发
    ↓
所有 t() 调用重新渲染
    ↓
界面语言切换
```

### 6.3 模块加载流

```
首页点击模块
    ↓
Next.js 路由跳转
    ↓
动态导入 Canvas 组件 (dynamic import)
    ↓
Three.js 初始化
    ↓
模块页面渲染
```

---

## 📊 七、模块统计分析

### 7.1 按学科分类

| 学科 | Sek (初中) | Gym (高中) | 总计 | 占比 |
|-----|-----------|-----------|------|------|
| 数学 | 13 | 7 | 20 | 34.5% |
| 物理 | 12 | 8 | 20 | 34.5% |
| 化学 | 9 | 5 | 14 | 24.1% |
| 生物 | 3 | 1 | 4 | 6.9% |
| **总计** | **37** | **21** | **58** | **100%** |

### 7.2 按开发阶段分类

| 阶段 | 模块数 | 占比 | 状态 |
|-----|--------|------|------|
| Phase 1 (Skeleton) | 58 | 100% | ✅ 完成 |
| Phase 2 (Flesh) | 41 | 70.7% | 🟡 进行中 |
| Phase 3 (Skin) | 0 | 0% | ❌ 未开始 |

### 7.3 按质量评分分类

| 评分 | 模块数 | 占比 | 代表模块 |
|-----|--------|------|---------|
| 5/5 ⭐⭐⭐⭐⭐ | 6 | 10.3% | G3.01, GC1.01, GC3.01, GC3.02 |
| 4-4.5/5 ⭐⭐⭐⭐ | 25 | 43.1% | G4.01, G5.01, S2.02, GC2.01 |
| 3-3.5/5 ⭐⭐⭐ | 22 | 37.9% | S2.03, SP1.08 |
| <3/5 ⭐⭐ | 5 | 8.6% | 部分早期模块 |

---

## ⚠️ 八、发现的问题汇总

### 8.1 命名不一致问题

**需要重命名的模块** (14 个):

```
数学模块 (13 个):
s1-01 → sm1-01
s1-02 → sm1-02
s2-01 → sm2-01
s2-02 → sm2-02
s2-03 → sm2-03
s2-04 → sm2-04
s2-05 → sm2-05
s2-06 → sm2-06
s2-07 → sm2-07
s3-01 → sm3-01
s3-02 → sm3-02
s3-03 → sm3-03
s3-04 → sm3-04

g1-01 → gm1-01
g1-01-advanced → gm1-01-advanced
g2-01 → gm2-01
g3-01 → gm3-01
g4-01 → gm4-01
g5-01 → gm5-01
gs1-01 → gm-s1-01 (或 gms1-01)

物理模块 (12 个):
p1-02 → sp1-02
p1-03 → sp1-03
p1-04 → sp1-04
p1-05 → sp1-05
p2-01 → sp2-01
p2-02 → sp2-02
p3-01 → sp3-01
p3-02 → sp3-02
p5-01 → gp5-01
p5-02 → gp5-02
p5-03 → gp5-03
p5-04 → gp5-04

化学模块 (4 个):
c1-01 → sc1-01
c1-02 → sc1-02
c2-01 → sc2-01
c3-01 → sc3-01 (或保留为独立模块)
```

**总计**: 需要重命名 **49 个模块**

### 8.2 可能的重复模块

需要检查是否重复:
- `p1-05` vs `sp1-05`
- `p2-02` vs `sp2-02`
- `p5-01` vs `gp5-01`
- `p5-02` vs `gp5-02`

### 8.3 缺失的计划模块

根据 CURRICULUM_PLAN.md，以下模块在计划中但可能缺失:
- ❓ **SP1.02** - Newton's Laws (存在 p1-02，需确认是否同一个)
- ❓ **SP1.03** - Energy & Power (存在 p1-03，需确认是否同一个)
- ❓ **SP3.01** - Geometrical Optics (存在 p3-01，需确认是否同一个)
- ❓ **SC1.01** - Mystery Lab (存在 c1-01，需确认是否同一个)
- ❓ **SC1.02** - Mole Master (存在 c1-02，需确认是否同一个)
- ❓ **GP5.03** - Particle Collider (存在 p5-03，需确认是否同一个)
- ❓ **GP5.04** - Quantum Tunnel (存在 p5-04，需确认是否同一个)

**结论**: 这 7 个"缺失"模块实际上都存在，只是命名不规范！

---

## 🎯 九、下一步行动计划

### 9.1 命名规范统一 (P0 - 最高优先级)

**方案**: 使用 `smartRelocate` 工具批量重命名

**优势**:
- 自动更新所有 import 引用
- 保持代码完整性
- 避免手动错误

**执行顺序**:
1. 数学模块 (s → sm, g → gm)
2. 物理模块 (p → sp/gp)
3. 化学模块 (c → sc)
4. 更新首页链接
5. 更新 i18n keys
6. 更新文档

### 9.2 重复模块检查 (P0)

检查并合并可能的重复模块

### 9.3 内容填充 (P1)

按照 Phase 2 标准填充所有模块

### 9.4 文档更新 (P1)

更新所有相关文档以反映新的命名规范

---

## 📝 十、维护建议

### 10.1 命名规范 (强制执行)

**格式**: `{level}{subject}{chapter}-{module}`

**示例**:
- `sm2-02` = Sek Math, Chapter 2, Module 02
- `gp5-01` = Gym Physics, Chapter 5, Module 01
- `sc1-03` = Sek Chemistry, Chapter 1, Module 03

### 10.2 文件组织规范

```
每个模块必须包含:
├── src/app/chamber/{module-id}/page.tsx
├── src/components/chamber/{module-id}/[Name]Canvas.tsx
└── i18n 翻译条目 (在 src/lib/i18n.ts 中)
```

### 10.3 代码质量标准

- ✅ TypeScript 严格模式
- ✅ ESLint 零警告
- ✅ 三语 i18n 支持
- ✅ 响应式设计
- ✅ 难度分级 (BASIC/CORE/ADVANCED/ELITE)

---

**文档维护**: 每次添加/修改模块后更新本文档  
**下次更新**: 命名规范统一后  
**负责人**: Kiro AI
