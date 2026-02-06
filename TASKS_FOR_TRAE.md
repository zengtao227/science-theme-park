# 🎯 TASKS FOR TRAE (AI2) — PHASE 2: THE GREAT FLESH EXPANSION

> **角色**: UI/UX 专家 & 系统架构师  
> **状态**: 🚧 MASSIVE BATCH IN PROGRESS
>## 🚦 核心工作流规约 (Mandatory Workflow)
1. **连续作战模式**: 请按照编号顺序 (K65 -> K80) 逐一执行。每完成一个任务并在磁盘写入代码后，请立即自行标记 ✅ 并开始下一个，**无需等待我的确认**。
2. **深度验收**: 每一个模块必须包含核心物理驱动、高性能渲染、全 i18n 翻译及零占位符内容。
3. **血肉准则**: 禁止使用占位符。所有物理参数必须真实驱动 UI 和 3D 动画。
4. **强制自检 (Self-Audit)**: 在标记完成并进入下一个任务前，请务必执行本地编译检查。如果代码报错，必须先修复错误。
确保所有实验都符合 `ChamberLayout` 的规范，且具备阶段式 (Stages) 教学进度。

---

## 📋 Mission T57 - SC2.01 // KINETICS CRASH (Flesh Upgrade)
- **目标**: 阿伦尼乌斯公式实验。
- **深度逻辑**: 允许调节 $T$ (温度) 和 $E_a$ (活化能)，实时改变反应速率常数 $k$。
- **UI**: 绘制平滑的动力学曲线 + 碰撞理论的分子动画。
- **组件**: `src/app/chamber/sc2-01/page.tsx`

---

## 📋 Mission T58 - S2.01 // BINOMIAL BEAUTY (Flesh Upgrade)
- **目标**: 完全平方公式 3D 拼图。
- **深度逻辑**: 实现 $(a+b)^2$ 的几何分解逻辑。
- **UI**: 支持拖动 4 块拼图组成大正方形并验证恒等式。
- **组件**: `src/app/chamber/s2-01/page.tsx`

---

## 📋 Mission T59 - SP1.05 // THE RHINE FERRY (Flesh Upgrade)
- **目标**: 巴塞尔莱茵河轮渡导航仿真。
- **深度逻辑**: 向量合成导航。考虑河流速 $v_{river}$ 和缆绳牵引。
- **UI**: 实现仪表盘 + 船头对冲角度控制算法。
- **组件**: `src/app/chamber/p1-05/page.tsx`

---

## 📋 Mission T60 - S2.02 // PYTHAGORAS 3D (Flesh Upgrade)
- **目标**: 勾股定理 3D 水箱验证。
- **深度逻辑**: 直角边水箱体积 $V_a + V_b$ 注入斜边 $V_c$ 的守恒计算。
- **UI**: 实现旋转水箱的重力流体动画。
- **组件**: `src/app/chamber/s2-02/page.tsx`

---

## 📋 Mission T61 - S3.02 // TRIG CIRCLE (3D Projections)
- **目标**: 三角函数与单位圆。
- **深度逻辑**: $\sin, \cos, \tan$ 的几何定义。
- **UI**: 拖动弧度 $\theta$，同步在 3D 空间、单位圆和正弦波形上更新数值。
- **组件**: `src/app/chamber/s3-02/page.tsx`

---

## 📋 Mission T62 - SC2.04 // SOLUBILITY LAB (Crystallization)
- **目标**: 溶解度与结晶实验。
- **深度逻辑**: 过饱和溶液的结晶动力学。
- **UI**: 随降温过程，在 3D 视图中自动“生长”晶体模型。
- **组件**: `src/app/chamber/sc2-04/page.tsx`

---

## 📋 Mission T63 - GC3.01 // EQUILIBRIUM MASTER (Le Chatelier)
- **目标**: 勒夏特列原理实时反馈。
- **深度逻辑**: 根据反应平衡常数 $K_c$ 和 $Q_c$ 判断平衡移动方向。
- **UI**: 压力釜/活塞 UI，改变体积或温度后观察反应物颜色深浅变化。
- **组件**: `src/app/chamber/gc3-01/page.tsx`

---

## 📋 Mission T64 - G4.01 // COMPLEX HORIZON (Euler's Flesh)
- **目标**: 复数及其几何意义。
- **深度逻辑**: 复数的乘法（旋转）与欧拉公式 $e^{i\theta} = \cos\theta + i\sin\theta$。
- **UI**: 实现复平面上的指数路径可视化。
- **组件**: `src/app/chamber/g4-01/page.tsx`

---

## 📋 Mission T65 - S3.03 // EXPONENTIAL REALM (Growth)
- **目标**: 指数增长与衰减。
- **深度逻辑**: 核裂变链式反应或细菌生长模型。
- **UI**: 指数级分裂的粒子系统 + 半衰期计算器。
- **组件**: `src/app/chamber/s3-03/page.tsx`

---

## 📋 Mission T66 - HUB // THE ARCHIEVEMENT SYSTEM (Global)
- **目标**: 建立全局进度与勋章系统。
- **深度逻辑**: 整合 `useAppStore` 的 `completeStage` 逻辑。
- **UI**: 在入口大厅显示每一个展厅的血肉完成度进度条。
- **组件**: `src/app/page.tsx` (Nexus UI)

---

## 🏁 MISSION LOG ARCHIVE (Verifications)
- ✅ Mission T47: Thales Tower (Skeleton Verified)
- ✅ Mission T48: Motor Lab (Skeleton Verified)

---

## [BLOCKER]
- 暂无。请 Trae 开启“自动狂暴模式”，完成一轮检查一轮，不必回复我。
