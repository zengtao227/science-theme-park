# 🎯 TASKS FOR KIRO (AI3) — Mission Batch 33

> **角色**: 3D 可视化专家 & 科学仿真工程师  
> **当前时间**: 2026-02-05 22:42 CET  
> **状态**: Mission 31-32 ✅ COMPLETED | **NEW MISSION ASSIGNED**

---

## 🚦 核心工作流规约 (Mandatory Workflow)
**[重要]** 领工必读：
1. **实时同步**: 由于 Antigravity 会持续根据复杂逻辑（通过 NVIDIA DeepSeek）更新本手册，你**必须**在开始每个 Mission 前以及遇到困难时重新读取此文件。
2. **算法优先**: 如果任务中包含 `🧠 EXPERT GUIDANCE` 章节，必须优先采用其中的公式和坐标，严禁自行推测物理常量。
3. **Blocker 报告**: 遇到任何 3D 渲染性能或算法障碍，请在底部 `## [BLOCKER]` 区留言。

---
## 📋 Mission 33 - SP1.06 // THE SWISS PENDULUM (Oscillations)

### 🧠 EXPERT GUIDANCE
> **物理公式与仿真**:
- **单摆周期**: $T = 2\pi\sqrt{\frac{L}{g}}$ (仅适用于小角度 $\theta < 15^\circ$)。
- **物理常量**: $g = 9.81 \, \text{m/s}^2$。
- **仿真逻辑**:
  - 角位移 $\theta(t) = \theta_{max} \cdot \cos(\omega t)$，其中复原力角频率 $\omega = \sqrt{\frac{g}{L}}$。
  - 导出量：频率 $f = 1/T$；角频率 $\omega = 2\pi f$。
- **可视化**: 
  - **巴塞尔钟表匠**: 3D 机械挂钟内部结构，齿轮随摆动同步转动。
  - **能量追踪**: 实时显示动能 (Kinetic) 与势能 (Potential) 的交替柱状图。

### 目标
通过控制单摆的长度 $L$ 和重力加速度 $g$（模拟月球/地球环境），理解震荡周期规律。

### 技术要求
- **页面**: `src/app/chamber/sp1-06/page.tsx`
- **画布**: `src/components/chamber/sp1-06/PendulumCanvas.tsx`

---


## ✅ Mission 31 - G3.01 // PROBABILITY VAULT (Quantum Board) — COMPLETED

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

### ✅ 完成状态
- ✅ `src/components/chamber/g3-01/GaltonCanvas.tsx` - 完成 (500+ balls with InstancedMesh)
- ✅ `src/app/chamber/g3-01/page.tsx` - 完成 (UNIFORM/BIASED/EXTREME stages)
- ✅ `src/lib/i18n.ts` - 添加 g3_01_title 和 g3_01_subtitle (EN/CN/DE)
- ✅ `src/app/page.tsx` - 添加 G3.01 模块卡片到数学区域
- ✅ TypeScript 验证通过

---

## ✅ Mission 32 - S3.03 // EXPONENTIAL LEGACY (Bank of Basel) — COMPLETED

### 🧠 EXPERT GUIDANCE
> **增长模型**:
- **公式**: $N(t) = N_0 \cdot e^{rt}$ (连续复利增长) 或 $N(t) = N_0 \cdot (1/2)^{t/T_{half}}$ (放射性衰变)。
- **对数转换**: 用户需要通过计算 $\ln(N/N_0)$ 来求解时间 $t$。
- **可视化**: 
  - **城市脉动**: 3D 城市建筑，高度随时间 $t$ 和增长率 $r$ 实时指数级缩放。
  - 使用半透明的指数曲线扫描整个场景。

### ✅ 完成状态
- ✅ `src/components/chamber/s3-03/GrowthCanvas.tsx` - 已验证完成
- ✅ `src/app/chamber/s3-03/page.tsx` - 已验证完成 (EXPONENTIAL/LOGARITHM/APPLICATIONS stages)
- ✅ i18n 翻译已存在
- ✅ 主页条目已存在
- ✅ TypeScript 验证通过

---

## [MISSION LOG ARCHIVE]

### ✅ Mission 31-32 (2026-02-05 22:30)
- **G3.01 Probability Vault**: 完成。高尔顿钉板使用 InstancedMesh 渲染 500+ 小球，实时显示二项分布收敛到正态分布。
- **S3.03 Exponential Growth**: 验证完成。细菌生长模拟，指数和对数计算，三个阶段全部实现。

### ✅ Mission 29-30 (2026-02-05)
- **P1.05 Ferry**: 完成。实现受力平衡 $F_{net} = F_J + F_T$，3D 缆绳效果出色。
- **P5.01 Nuclear**: 完成。验证了原子核衰变动画与守恒定律。

### ✅ Mission 27-28 (2026-02-04)
- **C3.01 Molecular**: 3D 分子搭建实验室。
- **S2.03 Line Navigator**: 二维直线反射（激光笔）。

---

## [BLOCKER]
- 暂无。

---

## 📊 总结报告

**Mission 31-32 完成情况**:
- ✅ G3.01 Galton Board 完全实现，包括 3D 可视化、概率控制、球数控制
- ✅ S3.03 指数增长模拟已验证完整
- ✅ 所有 i18n 翻译（EN/CN/DE）已添加
- ✅ 主页模块卡片已添加
- ✅ TypeScript 类型检查全部通过
- ✅ 性能优化：使用 InstancedMesh 处理 500+ 小球

**准备接收新任务**。
