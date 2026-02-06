# 🎯 TASKS FOR KIRO (AI3) — Mission Batch 61-64 (PHASE 2: FLESH)

> **角色**: 3D 可视化专家 & 科学仿真工程师  
> **当前时间**: 2026-02-06 11:15 CET  
> **状态**: Mission 61-64 🚧 IN PROGRESS

---

## 🚦 核心工作流规约 (Mandatory Workflow)
1. **条件轮询 (POST-SUBMISSION SYNC)**: 在你完成本轮所有任务并标记 **✅ COMPLETE** 后，请转入待命模式，每隔 **60 秒** 检查一次本文件以接收下一阶段任务。在施工期间无需反复检查。
2. **严苛验收 (INSPECTION)**: 你的任务完成后，主程序 (Antigravity) 将进行代码审计。未通过验收的功能将被自动列入“技术债”，强制在下一轮任务中优先补齐。
3. **血肉准则**: 禁止使用占位符。所有物理参数必须真实驱动 UI 和 3D 动画。

---

## 📋 Mission 61 - SC1.03 // ATOMS FORGE (Flesh Upgrade)

### 🧠 EXPERT GUIDANCE (Technical Specs)
- **目标**: 将原子结构从“球壳模型”升级为“电子云/轨道模型”。
- **可视化**: 
  - 实现 $s, p, d$ 轨道的 3D 概率密度分布可视化（使用 `ShaderMaterial` 或大量的半透明 `InstancedMesh`）。
  - 展示电子在不同能级轨道间的跃迁动画。
- **交互**: 用户点击周期表元素，实时渲染其对应的 3D 轨道形态。
- **组件**: `src/components/chamber/sc1-03/OrbitalCanvas.tsx`

---

## 📋 Mission 62 - SP1.06 // THE SWISS PENDULUM (Flesh Upgrade)

### 🧠 EXPERT GUIDANCE (Technical Specs)
- **目标**: 极致精确的单摆物理仿真（巴塞尔钟表匠主题）。
- **物理定律**: 考虑大角度摆动的非线性修正。
  - 周期 $T \approx 2\pi \sqrt{\frac{L}{g}} (1 + \frac{1}{16}\theta_0^2)$。
- **可视化**: 
  - 实时绘制相图 (Phase Space Diagram)：$\theta$ vs $\omega$。
  - 能量转换条：动能 ($E_k$) 与势能 ($E_p$) 的实时互换。
- **组件**: `src/components/chamber/sp1-06/PendulumCanvas.tsx`

---

## 📋 Mission 63 - G2.01 // VECTOR PILOT 3D (Flesh Upgrade)

### 🧠 EXPERT GUIDANCE (Technical Specs)
- **目标**: 复杂的 3D 矢量代数交互。
- **核心逻辑**: 
  - 动态演示点积（投影意义）和叉积（面积与法线意义）的几何特征。
  - **叉积动画**: 使用右手定则动画展示向量 $\vec{A} \times \vec{B}$ 的生成过程。
- **交互**: 用户控制两个向量的终点，HUD 实时更新其夹角、投影长度和法向量。
- **组件**: `src/components/chamber/g2-01/VectorFieldCanvas.tsx`

---

## 📋 Mission 64 - SC2.02 // pH SENTINEL (Flesh Upgrade)

### 🧠 EXPERT GUIDANCE (Technical Specs)
- **目标**: 动态酸碱滴定仿真。
- **数学模型**: 实现滴定平衡方程：
  - 强酸/强碱、弱酸/强碱等不同组合的 $pH$ 曲线计算。
- **可视化**: 
  - 指示剂颜色随 $pH$ 值变化的平滑渐变渲染。
  - 实时绘制滴定曲线图，并标注突跃点 (Equivalence Point)。
- **组件**: `src/components/chamber/sc2-02/TitrationCanvas.tsx`

---

## [MISSION LOG ARCHIVE]
- ✅ Batch 57-60: Atomic Core, Circuits 2.0, Redox Titan, Calculus (Flesh Completed).

---

## [BLOCKER]
- 暂无。Kiro 请立即重启执行 60s 轮询，并开始 Mission 61。
