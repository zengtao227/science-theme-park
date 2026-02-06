# 🎯 TASKS FOR KIRO (AI3) — PHASE 2: THE GREAT FLESH EXPANSION

> **角色**: 3D 可视化专家 & 科学仿真工程师  
> **状态**: 🚧 MASSIVE BATCH IN PROGRESS
> **规约**:
> 1. **连续作战模式**: 请按照编号顺序 (K65 -> K80) 逐一执行。每完成一个任务并在磁盘写入代码后，请立即自行标记 ✅ 并开始下一个，**无需等待我的确认**。
> 2. **深度验收**: 每一个模块必须包含：
>    - 核心物理/数学公式的实时驱动。
>    - 高性能 3D 渲染（InstancedMesh 或 Shader）。
>    - 完善的 i18n 翻译 (EN/DE/CN)。
>    - 零占位符，全功能闭环。

---

## 📋 Mission K65 - GP5.02 // RELATIVITY LAB (Special Relativity)
- **目标**: 演示狭义相对论。
- **核心逻辑**: 洛伦兹因子 $\gamma = 1/\sqrt{1-v^2/c^2}$ 驱动时间膨胀与长度收缩。
- **可视化**: 莱茵河背景 + 基于速度的建筑红移/蓝移。
- **组件**: `src/components/chamber/gp5-02/RelativityCanvas.tsx`

---

## 📋 Mission K66 - GS1.01 // COMPLEX FRACTAL (Mandelbrot)
- **目标**: GPU 驱动的分形艺术。
- **核心逻辑**: $z_{n+1} = z_n^2 + c$ 的分级逃逸渲染。
- **可视化**: 高性能 Shader 实现无限缩放。
- **组件**: `src/components/chamber/gs1-01/FractalCanvas.tsx`

---

## 📋 Mission K67 - SC2.03 // AERO LAB (Gas Dynamics)
- **目标**: 理想气体动力学实时仿真。
- **核心逻辑**: $PV=nRT$。模拟 1000+ 粒子的动量传递导致压强。
- **可视化**: 3D 碰撞箱 + 粒子速度分布直方图。
- **组件**: `src/components/chamber/sc2-03/AeroCanvas.tsx`

---

## 📋 Mission K68 - SP1.08 // OPTICS BENCH (Ray Optics)
- **目标**: 物理级光路追踪。
- **核心逻辑**: 折射定律 $n_1 \sin \theta_1 = n_2 \sin \theta_2$。
- **可视化**: 实时渲染折射、全反射、棱镜色散。
- **组件**: `src/components/chamber/sp1-08/OpticsCanvas.tsx`

---

## 📋 Mission K69 - G3.01 // PROBABILITY VAULT (Monte Carlo)
- **目标**: 概率论与大数定律的可视化。
- **核心逻辑**: 高尔顿板 (Galton Board) 模拟 + 正态分布曲线拟合。
- **可视化**: 3D 滚球 + 实时生成的 Bell Curve。
- **组件**: `src/components/chamber/g3-01/ProbabilityCanvas.tsx`

---

## 📋 Mission K70 - GP5.03 // PARTICLE COLLIDER (CERN Simulation)
- **目标**: 强子对撞机模拟。
- **核心逻辑**: 高能碰撞产生的新粒子轨迹追踪（磁场偏转）。
- **可视化**: 环形加速器 + 碰撞瞬间的能量流喷注 (Jets)。
- **组件**: `src/components/chamber/gp5-03/ColliderCanvas.tsx`

---

## 📋 Mission K71 - GP5.04 // QUANTUM TUNNEL (Wave Mechanics)
- **目标**: 量子隧道效应。
- **核心逻辑**: 薛定谔方程的一维数值解。
- **可视化**: 波包穿过势垒的概率密度演化。
- **组件**: `src/components/chamber/gp5-04/QuantumCanvas.tsx`

---

## 📋 Mission K72 - G5.01 // MATRIX GEOMETRY (Transformations)
- **目标**: 线性代数的几何本质。
- **核心逻辑**: 3D 空间变换 $A\vec{x} = \lambda\vec{x}$（特征向量）。
- **可视化**: 空间网格的线性扭曲 + 特征向量的实时指向。
- **组件**: `src/components/chamber/g5-01/MatrixCanvas.tsx`

---

## 📋 Mission K73 - GC3.02 // CRYSTAL PALACE (Lattice Theory)
- **目标**: 晶体结构与间隙。
- **核心逻辑**: SC, BCC, FCC 点阵的几何空间填充率。
- **可视化**: 原子球填充 + 四面体/八面体间隙的可视化标注 + 物理剖切面。
- **组件**: `src/components/chamber/gc3-02/LatticeCanvas.tsx`

---

## 📋 Mission K74 - SP4.01 // WAVE BASICS (Interference)
- **目标**: 波的干涉与叠加。
- **核心逻辑**: 双缝干涉实验模型。
- **可视化**: 波纹干涉条纹图 + 实时振幅叠加效果。
- **组件**: `src/components/chamber/sp4-01/WaveCanvas.tsx`

---

## 📋 Mission K75 - GC2.01 // CARBON KINGDOM (Organic Flesh)
- **目标**: 有机分子的 3D 动力学结构。
- **核心逻辑**: 本征振动模式 + 分子间相互作用。
- **可视化**: 球棒模型 + 手性异构体的 3D 对比。
- **组件**: `src/components/chamber/gc2-01/OrganicCanvas.tsx`

---

## 🏁 MISSION LOG ARCHIVE (Batch 57-64 Completed)
- ✅ GP5.01 Atomic Core
- ✅ SP2.02 Circuit Sandbox 2.0
- ✅ GC1.01 Redox Titan
- ✅ G1.01 Calculus
- ✅ SC1.03 Atoms Forge
- ✅ SP1.06 Swiss Pendulum
- ✅ G2.01 Vector Pilot 3D
- ✅ SC2.02 pH Sentinel

---

## [BLOCKER]
- 暂无。请 Kiro 开启“自动狂暴模式”，完成一轮检查一轮，不必回复我。
