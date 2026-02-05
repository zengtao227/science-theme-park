# 🎯 TASKS FOR KIRO (AI3) — Mission Batch 31-32

> **角色**: 3D 可视化专家 & 科学仿真工程师  
> **当前时间**: 2026-02-05 22:15 CET  
> **状态**: Mission 29-30 ✅ COMPLETED (P1.05 & P5.01)

---

## 🚦 核心工作流规约 (Mandatory Workflow)
**[重要]** 领工必读：
1. **实时同步**: 由于 Antigravity 会持续根据复杂逻辑（通过 NVIDIA DeepSeek）更新本手册，你**必须**在开始每个 Mission 前以及遇到困难时重新读取此文件。
2. **算法优先**: 如果任务中包含 `🧠 EXPERT GUIDANCE` 章节，必须优先采用其中的公式和坐标，严禁自行推测物理常量。
3. **Blocker 报告**: 遇到任何 3D 渲染性能或算法障碍，请在底部 `## [BLOCKER]` 区留言。

---

## 📋 Mission 31 - G3.01 // PROBABILITY VAULT (Quantum Board)

### 🧠 EXPERT GUIDANCE
> **物理仿真逻辑 (Galton Board)**:
- **背景**: 展示概率分布的演变。
- **仿真算法**:
  - 使用 `instancedMesh` 渲染大量小球（500+）。
  - 小球每一层有 $p$ 的概率向右偏移， $1-p$ 向左。
  - 最终落点遵循二项分布 $B(n, p)$，当 $n$ 足够大时趋近正态分布 $\mathcal{N}(np, np(1-p))$。
- **可视化**: 
  - 实现一个 3D 的高尔顿钉板。小球撞击钉子（Pins）时产生轻微的发光抖动。
  - 底部实时生成分布曲线。

### 目标
建立概率实验室。用户通过调整偏移概率 $p$ 模拟受控的随机过程。

### 技术要求
- **页面**: `src/app/chamber/g3-01/page.tsx`
- **画布**: `src/components/chamber/g3-01/GaltonCanvas.tsx`

---

## 📋 Mission 32 - S3.03 // EXPONENTIAL LEGACY (Bank of Basel)

### 🧠 EXPERT GUIDANCE
> **增长模型**:
- **公式**: $N(t) = N_0 \cdot e^{rt}$ (连续复利增长) 或 $N(t) = N_0 \cdot (1/2)^{t/T_{half}}$ (放射性衰变)。
- **对数转换**: 用户需要通过计算 $\ln(N/N_0)$ 来求解时间 $t$。
- **可视化**: 
  - **城市脉动**: 3D 城市建筑，高度随时间 $t$ 和增长率 $r$ 实时指数级缩放。
  - 使用半透明的指数曲线扫描整个场景。

### 目标
通过巴塞尔银行资产增长模型，掌握 $e$ 的定义与自然对数。

### 技术要求
- **页面**: `src/app/chamber/s3-03/page.tsx`
- **组件**: `src/components/chamber/s3-03/ExponentialCanvas.tsx`

---

## ⚠️ 代码质量要求
- **三语同步**: 确保 `i18n.ts` 中包含 `g3_01` 和 `s3_03` 的翻译（EN/CN/DE）。
- **性能**: 针对 500+ 小球的仿真，必须使用 `instancedMesh`。

---

## [MISSION LOG ARCHIVE]

### ✅ Mission 29-30 (2026-02-05)
- **P1.05 Ferry**: 完成。实现受力平衡 $F_{net} = F_J + F_T$，3D 缆绳效果出色。
- **P5.01 Nuclear**: 完成。验证了原子核衰变动画与守恒定律。

### ✅ Mission 27-28 (2026-02-04)
- **C3.01 Molecular**: 3D 分子搭建实验室。
- **S2.03 Line Navigator**: 二维直线反射（激光笔）。

---

## [BLOCKER]
- 暂无。
