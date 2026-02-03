# 瑞士 Lehrmittel 体系下的 Roblox 理科仿真教育游戏化研究总报告

> **报告版本**：v2.0 (全年龄段综合版)
> **涵盖范围**：Primary (10-12y) | Secondary I (13-15y) | Gymnasium/Maturité (16-19y)
> **核心资源**：Kangourou sans Frontières (Math) & Swiss Physics Olympiad (Physics)

---

## 一、摘要 (Executive Summary)

本报告旨在构建一个覆盖 10 至 19 岁全学段的理科游戏创意数据库。基于瑞士 *Lehrplan 21* 与 *Maturité* 教学大纲，我们将“袋鼠数学竞赛”的几何直觉与“瑞士物理奥林匹克”的理论深度，通过 Roblox 平台的 Luau 脚本引擎转化为可交互的实时仿真体验。

**核心变革**：
从“静态公式记忆”转向“动态系统调试”。学生不再被动计算答案，而是通过调整仿真参数（如阻力系数、洛伦兹因子、四维旋转矩阵）来直观验证科学规律。

---

## 二、全年龄段游戏创意数据库 (The Game Database)

### 2.1 启蒙阶段 (10-12岁 / Grade 4-6) - 直觉培养
*目标：建立空间感与基本逻辑，无需复杂计算。*

| 竞赛来源 | 核心知识点 | Roblox 玩法转化创意 | 预期体验目标 |
| :--- | :--- | :--- | :--- |
| **Kangourou Benjamin**<br>(镜像问题) | **空间折叠 / 镜像对称** | **玩法：镜像折纸迷宫 (Origami Path)**<br>玩家在透明板上行走，必须通过“折叠”地图（旋转镜像平面）来接通断裂的道路。利用 Reflector 机制计算光路对称。 | 培养三维空间转换直觉。 |
| **Kangourou Benjamin**<br>(逻辑推理) | **逻辑排序 / 集合论** | **玩法：生态平衡实验室 (Logic Lab)**<br>3x3x2 的空间摆放谜题。规则：“狐狸不能挨着兔子”，“每个平台必须有支撑”。利用 ProximityPrompt 实时检测约束冲突。 | 训练严密的非矛盾逻辑。 |
| **基础物理启蒙**<br>(生活物理) | **重心与平衡** | **玩法：X射线建筑师 (X-Ray Architect)**<br>利用透视眼观察结构内部，剔除多余方块。剔错会导致重心偏移、结构倒塌（基于 AssemblyCenterOfMass 检测）。 | 理解质量分布与稳性。 |

### 2.2 基础阶段 (13-15岁 / Grade 7-9) - 逻辑构建
*目标：理解变量关系，开始接触抽象模型。*

| 竞赛来源 | 核心知识点 | Roblox 玩法转化创意 | 预期体验目标 |
| :--- | :--- | :--- | :--- |
| **Kangourou Kadett**<br>(几何题) | **几何剖分 / 面积守恒** | **玩法：等积切割 (Area Slicer)**<br>利用激光切割枪，将不规则多边形“一刀切”成面积相等的两半。算法基于 Raycast 顶点捕捉与多边形分解。 | 强化几何估算能力。 |
| **Kangourou Kadett**<br>(流体题) | **帕斯卡定律 / 连通器** | **玩法：连通器解密 (Fluid Link)**<br>操作不同粗细的液压管，利用 $F_1/S_1 = F_2/S_2$ 原理，用小力气顶起巨大重物。 | 理解液体压强传递。 |
| **SwissPhO First Round**<br>(经典力学) | **抛体运动 / 能量守恒** | **玩法：巨型投石机 (The Siege)**<br>不计算公式，而是调整拉力与角度。直观感受 $45^\circ$ 角射程最远，但牺牲了高度。 | 建立运动学直觉。 |

### 2.3 进阶阶段 (16-19岁 / Gymnasium) - 极限挑战
*目标：掌握复杂系统、微积分与现代物理。*

| 竞赛来源 | 核心知识点 | Roblox 玩法转化创意 | 技术实现核心 (Tech Stack) |
| :--- | :--- | :--- | :--- |
| **SwissPhO / Maturité**<br>(动力学) | **微积分 / 变率轨道** | **玩法：变率过山车 (Calculus Coaster)**<br>设计轨道曲率 $R(s)$。若二阶导数（加速度变化率）不连续，产生的 G 力会把玩家甩飞。 | `RunService.Heartbeat` 实时计算导数与向心力。 |
| **Kangourou Student**<br>(高维几何) | **四维超正方体截面** | **玩法：四维切片机 (The Tesseract)**<br>通过 4D 旋转矩阵控制超正方体穿过 3D 空间。观察截面从四面体变成八面体的过程。 | 自定义 `Vector4` 运算库与 5x5 齐次变换矩阵。 |
| **SwissPhO / Modern Physics** | **狭义相对论** | **玩法：亚光速跑酷 (Relativity Run)**<br>速度 $v \to c$ 时，洛伦兹因子 $\gamma$使得视野（FOV）扭曲，时间流速变慢（Bullet Time）。 | 动态更新 `TimeScale` 与基于速度的 Shader 渲染。 |

---

## 三、技术转化指导：从公式到脚本 (Technical Guidelines)

### 3.1 微积分模拟：数值积分法 (Numerical Integration)
在 Roblox 中，我们不求解析解，而是利用 `dt` (每一帧的时间差) 进行累积。

```lua
-- 示例：受变阻力影响的抛体运动 (Symplectic Euler)
RunService.Heartbeat:Connect(function(dt)
    -- F = mg - kv^2 (变力)
    local drag = -k * velocity.Magnitude * velocity
    local totalForce = gravity + drag
    
    -- dv = a * dt (速度是加速度的积分)
    velocity = velocity + (totalForce / mass) * dt
    
    -- dx = v * dt (位置是速度的积分)
    position = position + velocity * dt
end)
```
*教育价值*：让学生理解微积分的本质——无数微小变化的累积。

### 3.2 四维几何渲染 (4D Rendering)
处理 SwissPhO 顶级题目时，需要构建自定义几何管线。
1.  **数据结构**：定义 `Vector4(x, y, z, w)`。
2.  **旋转算子**：四维旋转是绕“平面”转（如 XW 面），而非绕轴转。
3.  **截面算法**：当超平面 $w=0$ 切割时，计算所有棱的交点，由 `Parallel Luau` 并行计算生成 3D Mesh。

---

## 四、结论与愿景

本数据库不仅是一个游戏开发指南，更是瑞士理科教育数字化的蓝图。
1.  **对于 10 岁学生**：通过“看得到的逻辑”消除对数学的恐惧。
2.  **对于 15 岁学生**：在“调试物理系统”中掌握中学核心概念。
3.  **对于 19 岁学生**：在“挑战物理极限”中触摸微积分与相对论的灵魂。

通过 Roblox，我们将瑞士严谨的科学精神与新一代的数字化直觉完美融合。
