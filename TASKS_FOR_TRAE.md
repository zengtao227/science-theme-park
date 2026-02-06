# 🎯 TASKS FOR TRAE (AI2) — PHASE 2: THE GREAT FLESH EXPANSION

> **角色**: UI/UX 专家 & 系统架构师  
> **状态**: 🚧 MASSIVE BATCH IN PROGRESS
>## 🚦 核心工作流规约 (Mandatory Workflow)
1. **连续作战模式**: 请按照编号顺序 (K65 -> K80) 逐一执行。每完成一个任务并在磁盘写入代码后，请立即自行标记 ✅ 并开始下一个，**无需等待我的确认**。
2. **深度验收**: 每一个模块必须包含核心物理驱动、高性能渲染、全 i18n 翻译及零占位符内容。
3. **血肉准则**: 禁止使用占位符。所有物理参数必须真实驱动 UI 和 3D 动画。
4. **强制自检 (Self-Audit)**: 在标记完成并进入下一个任务前，请务必执行本地编译检查。如果代码报错，必须先修复错误。
5. **严禁修改 `i18n.ts`**: 请在代码中使用 `t('key')` 占位，并将所有的翻译对记录在 `PENDING_I18N_TRAE.md`（新建文件）中。由 Antigravity 统一调用 NVIDIA DeepSeek 进行后续集成。

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

## 📋 Mission T67 - S1.04 // BOHR'S FORGE (Advanced Atom)
- **目标**: 玻尔模型原子搭建增强。
- **深度逻辑**: 电子能级跃迁辐射光波方程 $E = hf$ 的可视化。
- **UI**: 能级阶梯图 + 吸收/发射光谱实时生成。
- **组件**: `src/app/chamber/sc1-04/page.tsx`

---

## 📋 Mission T68 - SP3.02 // FARADAY'S CAGE (Electrolysis)
- **目标**: 电解与法拉第定律。
- **深度逻辑**: $m = (Q/F) \cdot (M/z)$ 实时计算沉积质量。
- **UI**: 电解池 UI + 随着电解进行，电极模型实时“变厚”或“变薄”。
- **组件**: `src/app/chamber/sp3-02/page.tsx`

---

## 📋 Mission T69 - S3.04 // GEOMETRIC OPTICS (Lenses)
- **目标**: 透镜成像规律。
- **深度逻辑**: 运用透镜公式 $1/f = 1/u + 1/v$。
- **UI**: 拖动蜡烛（物距），实时渲染成实像或虚像的射线路径。
- **组件**: `src/app/chamber/s3-04/page.tsx`

---

## 📋 Mission T70 - GP5.05 // ASTRO LAB (Kepler's Laws)
- **目标**: 开普勒行星运动。
- **深度逻辑**: 面积定律（近日点快，远日点慢）与周期定律。
- **UI**: 实现可调节离心率的轨道仿真 + 扫过面积的实时着色。
- **组件**: `src/app/chamber/gp5-05/page.tsx`

---

## 📋 Mission T71 - SYSTEM // THE GLOBAL HUD (Nexus UI)
- **目标**: 实验室顶层状态栏。
- **深度逻辑**: 集成 `useLanguage`, `useAppStore` (Score/Level)。
- **UI**: 实现半透明玻璃态背景、响应式指南针、当前展厅坐标。
- **组件**: `src/components/layout/NexusHUD.tsx`

---

## 📋 Mission T72 - HUB // LAB NAVIGATION (3D Map)
- **目标**: 展厅 3D 导航图。
- **深度逻辑**: 建立展厅间的拓扑连接。
- **UI**: 实现极简 3D 连线图，支持点击跳转不同 `chamber` 路由。
- **组件**: `src/app/nexus/map/page.tsx`

---

## 📋 Mission T73 - SYSTEM // NOTIFICATION HUB
- **目标**: 实时成就与引导通知。
- **深度逻辑**: 监听任务状态，弹射全局 Toast。
- **UI**: 响应式悬浮卡片 + 粒子爆炸效果。
- **组件**: `src/components/system/NotificationProvider.tsx`

---

## 📋 Mission T74 - ARCH // SAVE SYSTEM (Zustand Persistence)
- **目标**: 进度持久化。
- **深度逻辑**: 配置 `zustand/middleware` 的 `persist`。
- **UI**: 增加“保存进度”视觉反馈。

---

## 📋 Mission T75 - FINAL // PHASE 2 INTEGRATION TEST
- **目标**: 全量模块自检。
- **行动**: 遍历所有已标记 ✅ 的模块。
- **输出**: 修复所有 Linter 错误及未使用的导入。

---

## 🏁 MISSION LOG ARCHIVE (Verifications)
- ✅ Mission T47: Thales Tower (Skeleton Verified)
- ✅ Mission T48: Motor Lab (Skeleton Verified)
- 🛠️ Mission T57-T60 (Currently in progress by Kiro/Trae - Pending Audit)

---

## [BLOCKER]
- 暂无。请 Trae 严格按照此 MD 文档顺序开工，完成一项勾选一项。
