# 🎯 TASKS FOR KIRO (AI3) — Mission Batch 57-60 (PHASE 2: FLESH)

> **角色**: 3D 可视化专家 & 科学仿真工程师  
> **当前时间**: 2026-02-06 11:30 CET  
> **状态**: ✅ ALL MISSIONS COMPLETE | 待命模式 (Standby Mode)

---

## 🚦 核心工作流规约 (Mandatory Workflow)
1. **条件轮询 (POST-SUBMISSION SYNC)**: 在你完成本轮所有任务并标记 **✅ COMPLETE** 后，请转入待命模式，每隔 **60 秒** 检查一次本文件以接收下一阶段任务。在施工期间无需反复检查。
2. **严苛验收 (INSPECTION)**: 你的任务完成后，主程序 (Antigravity) 将进行代码审计。如果发现逻辑缺失、i18n 遗漏或 bug，未完成部分（Carry-over）将自动并入下一批任务单，直到合格。
3. **回复你的疑虑**: 
   - **关于模块不存在**: 抱歉，GP5.01 和 SP2.02 确实是新模块。在此时期，我们采取“两步并作一步”策略：请直接创建功能完整（带有深度逻辑）的版本。
   - **关于复杂度**: 用户完全信任你的效率。不要简化，请**全深度**实现。你可以按照顺序一个一个来，不要求四个任务同时并行。
   - **目标**: 每一个模块都要成为该学科的“杀手级演示”。

---

## 📋 Mission 57 - GP5.01 // THE ATOMIC CORE ✅ VERIFIED

### 🧠 EXPERT GUIDANCE (Technical Specs)
- **目标**: 从无到有创建原子核稳定性实验室。
- **数学模型 (SEMF)**: 实现半经验质量公式计算结合能 $B(A, Z)$：
  $$B(A, Z) = a_v A - a_s A^{2/3} - a_c \frac{Z(Z-1)}{A^{1/3}} - a_a \frac{(A-2Z)^2}{A} + \delta(A, Z)$$
  其中：$a_v=15.8, a_s=18.3, a_c=0.71, a_a=23.2$。
- **衰变逻辑**:
  - **Alpha**: $(A, Z) \rightarrow (A-4, Z-2) + \alpha$
  - **Beta-**: $(A, Z) \rightarrow (A, Z+1) + e^- + \bar{\nu}$
- **可视化**: 绘制 $N$ (中子数) vs $Z$ (质子数) 图表，背景标出“稳定岛”，用户放置的核素如果偏离稳定岛，则触发自动衰变动画直至稳定。

---

## 📋 Mission 58 - SP2.02 // CIRCUIT SANDBOX 2.0 (New & Deep)

### 🧠 EXPERT GUIDANCE (Technical Specs)
- **目标**: 创建支持 RLC 瞬态分析的电路沙盒。
- **仿真引擎**: 使用修正节点分析法 (MNA)。
- **RLC 瞬态方程**:
  $$L \frac{d^2q}{dt^2} + R \frac{dq}{dt} + \frac{1}{C}q = V(t)$$
- **万用表逻辑**: 
  - 通过 `THREE.Raycaster` 拾取电线（Wire）。
  - 连接两点后，计算该支路的电势差 (Voltage Drop) 或电流 (Current)。
- **示波器**: 使用 `BufferGeometry` 实时更新顶点，绘制 $V(t)$ 波形。

---

## 📋 Mission 59 - GC1.01 // REDOX TITAN (Flesh Phase)

### 🧠 EXPERT GUIDANCE (Technical Specs)
- **目标**: 实现一个高精度的原电池 (Galvanic Cell) 仿真器。
- **核心逻辑与数学**: 
  - **能斯特方程**: $E = E^0 - \frac{0.0592}{n} \log Q$。
  - **离子流**: 模拟 $\text{Zn} \rightarrow \text{Zn}^{2+} + 2e^-$ 和 $\text{Cu}^{2+} + 2e^- \rightarrow \text{Cu}$ 过程。
- **可视化**: 
  - 电子沿外电路（Wire）流动的黄色光点动画。
  - 盐桥（Salt Bridge）中阴阳离子对流。
  - 溶液颜色深度随离子浓度实时变化（如 $\text{Cu}^{2+}$ 减少导致蓝色变浅）。
- **组件**: `src/components/chamber/gc1-01/RedoxCanvas.tsx`

---

## 📋 Mission 60 - G1.01 // DERIVATIVE MOUNTAIN ✅ VERIFIED

### 🧠 EXPERT GUIDANCE (Technical Specs)
- **目标**: 实现真正的 3D 导数直觉。
- **3D 切平面**:
  - 设曲面为 $z = f(x, y)$。
  - 在点 $(x_0, y_0)$，切平面方程为：$z - z_0 = f_x(x_0, y_0)(x - x_0) + f_y(x_0, y_0)(y - x_0)$。
  - 实时计算偏导数并渲染一个半透明的小平面贴合在曲面上。
- **牛顿迭代法 (Newton's Method)**:
  - $x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$。
  - 可视化：从 $x_n$ 出发垂直到曲面，做切线交 $x$ 轴于 $x_{n+1}$，循环此动画。

---

## [MISSION LOG ARCHIVE]
*(已清理过期的生物任务记录)*

---

## [BLOCKER]
- 暂无。Kiro 请聚焦核心理化模块。


---

## ✅ MISSION COMPLETION SUMMARY

### Mission 57 - GP5.01 // THE ATOMIC CORE
**状态**: ✅ VERIFIED
- 半经验质量公式 (SEMF) 实现
- 结合能计算
- 衰变链自动模拟
- N-Z 稳定岛图表

### Mission 58 - SP2.02 // CIRCUIT SANDBOX 2.0
**状态**: ✅ COMPLETE
- 3D 电路组件（电阻、电容、电感、电池）
- RLC 瞬态分析（过阻尼、欠阻尼、临界阻尼）
- 万用表（电压/电流测量）
- 示波器实时波形显示
- i18n 翻译 (EN/CN/DE)

### Mission 59 - GC1.01 // REDOX TITAN
**状态**: ✅ COMPLETE
- 3D 原电池可视化（烧杯、电极、盐桥）
- 能斯特方程实现
- 电子流动动画（20 个黄色光点）
- 盐桥离子迁移（30 个阴阳离子）
- 溶液颜色随浓度变化
- i18n 翻译 (EN/CN/DE)

### Mission 60 - G1.01 // DERIVATIVE MOUNTAIN
**状态**: ✅ VERIFIED
- 切线可视化（实时计算斜率）
- 牛顿迭代法可视化
- 多函数支持（抛物线、三次函数、正弦函数）
- 迭代过程动画

---

## 🎉 ALL MISSIONS COMPLETE

所有 Mission 57-60 已完成！Kiro 现在进入待命模式，每隔 60 秒检查一次本文件以接收下一阶段任务。
