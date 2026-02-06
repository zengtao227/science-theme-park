# 🎯 TASKS FOR TRAE (AI2) — Mission Batch 57-60 (PHASE 2: FLESH)

> **角色**: UI/UX 专家 & 系统架构师  
> **当前时间**: 2026-02-06 10:55 CET  
> **状态**: Mission 57-60 🚧 IN PROGRESS

---

## 🚦 核心工作流规约 (Mandatory Workflow)
1. **条件轮询 (POST-SUBMISSION SYNC)**: 在你标记 **✅ COMPLETE** 并提交工作后，请每隔 **60 秒** 检查一次本文件以获取新指令。施工阶段请专注于代码，无需扫描。
2. **严苛验收 (INSPECTION)**: 任务标记 ✅ 后，我将进行代码核查。未通过验收的功能将被自动列入“技术债”，强制在下一轮任务中优先补齐。
3. **血肉准则**: 禁止使用简单的占位符。所有物理参数（如速度、角度、活化能）必须真实驱动 UI。

---

## 📋 Mission 57 - SC2.01 // KINETICS CRASH (Flesh Upgrade)

### 🧠 EXPERT GUIDANCE (Technical Specs)
- **目标**: 将简单的化学反应页面升级为“动力学交互实验”。
- **物理驱动**: 
  - 实现 **Arrhenius Equation**: $k = A e^{-E_a/RT}$。
  - 用户调节温度 $T$ 和活化能 $E_a$。
- **动态 UI**: 
  - 实时绘制反应速率 $k$ 随时间变化的平滑曲线。
  - 模拟“有效碰撞”：展示在高能级下，分子碰撞频率增加的粒子动画。
- **组件**: `src/app/chamber/sc2-01/page.tsx`

---

## 📋 Mission 58 - S2.01 // BINOMIAL BEAUTY (Flesh Upgrade)

### 🧠 EXPERT GUIDANCE (Technical Specs)
- **目标**: 实现完全平方公式 $(a+b)^2 = a^2 + 2ab + b^2$ 的几何拆解。
- **交互逻辑**: 
  - 提供 4 块积木（一个 $a \times a$ 正方形，一个 $b \times b$ 正方形，两个 $a \times b$ 矩形）。
  - 支持拖拽/点击组合。当积木严丝合缝拼成大正方形时，弹出代数恒等式。
- **组件**: `src/app/chamber/s2-01/page.tsx`

---

## 📋 Mission 59 - SP1.04 // THE RHINE FERRY (Flesh Upgrade)

### 🧠 EXPERT GUIDANCE (Technical Specs)
- **目标**: 莱茵河横渡矢量合成模拟（基于 Basel Gierseilfähri）。
- **矢量计算**: 
  - 自动叠加水流速度向量 $\vec{v}_{river}$ 和缆绳牵引向量 $\vec{v}_{cable}$。
  - 用户需调整船头角度，抵消侧向漂移，实现“对冲导航”。
- **组件**: `src/app/chamber/p1-05/page.tsx` (升级逻辑)

---

## 📋 Mission 60 - S2.02 // PYTHAGORAS 3D (Flesh Upgrade)

### 🧠 EXPERT GUIDANCE (Technical Specs)
- **目标**: 勾股定理的 3D 实证（水箱证明法）。
- **仿真逻辑**: 
  - 在直角三角形三边上挂载 3D 透明水箱。
  - 点击“旋转”，直角边上的水缓慢注入斜边水箱。
  - 必须通过体积守恒证明 $V_a + V_b = V_c$。

---

## [MISSION LOG ARCHIVE]
- ✅ Mission T47: Thales Tower (Skeleton Verified)
- ✅ Mission T48: Motor Lab (Skeleton Verified)

---

## [BLOCKER]
- 暂无。Trae 请立即重启执行 60s 轮询，并开始 Mission 57。
