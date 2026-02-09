# Math Visual Improvements V2: User Feedback Response

**Status**: PROPOSAL (Waiting for Approval)  
**Date**: 2026-02-09  
**Author**: Acting Director  

## 1. Executive Summary
响应最新的用户反馈，针对 SM2-04 的可用性问题、全局 3D 旋转的干扰问题以及 SM2-06 的设计缺陷，制定具体的改进方案。本方案旨在解决图表“看不清、乱旋转、看不懂”的核心痛点。

## 2. Issues & Requirements

### 2.1 SM2-04: The Clock Tower (Similarity)
**Feedback**:
- "图形显示不完整，看起来怪异。" (虽然已修复Bounds，但可能导致视角过远)
- "图形太小，无法拉近 (zoom)。"
- "不知道如何应用 shadow 距离进行测量。"

**Proposed Fixes**:
1.  **Zoom Enable**: 确保 `OrbitControls` 允许缩放 (`enableZoom={true}`)，并调整 `minDistance` 允许贴近观察。
2.  **Focus Interaction**: 添加“点击聚焦”功能。点击塔尖、影子末端时，相机自动平滑推进到特写视角。
3.  **Measurement Tool**: 添加“测量模式”开关。开启后，鼠标悬停在物体上显示具体的长度数值（如 "Shadow Length: 12m"），并用显眼的虚线标注。

### 2.2 Global 3D Rotation (Auto-Rotate)
**Feedback**:
- "愚蠢的设计，一打开就不停旋转。"
- "拖动停止后还在旋转。"
- 指名批评 `SM2-05`。

**Proposed Fixes**:
1.  **Global Disable**: 移除所有组件中的 `autoRotate` 属性。
2.  **Kill Idle Spin**: 移除 `useFrame` 中根据 `clock` 驱动的自动旋转逻辑。
3.  **Standard**: 3D 模型仅在用户主动交互（拖动）时旋转，松手即停（保留少量惯性 damping）。

### 2.3 SM2-06: Linear Systems (Design Flaw)
**Feedback**:
- "设计非常差，完全搞不清楚在干什么。"
- 需求：生动直观的二元一次方程组可视化。

**Proposed Redesign: The Alchemist's Lab (魔法炼金室)**
*   **Core Concept**: 资源配比平衡。将标准式方程 `ax + by = c` 可视化为“配方约束”。
*   **Scenario**: 你是炼金术士，需要同时调制两种药水（Potion A 和 Potion B），它们共享同一个原料池（Element X 和 Element Y）。
    *   **Constraint 1 (Potion A)**: 稳定状态需要 `2x + 3y = 12` (能量平衡)。
    *   **Constraint 2 (Potion B)**: 稳定状态需要 `x + 4y = 10` (酸碱平衡)。
*   **Interaction**:
    *   玩家调整 X 和 Y 的投入量（两个滑块）。
    *   **Visual**:
        *   右侧显示两条发光的约束线（一条红，一条蓝）。
        *   玩家的当前配比是一个光点。
        *   **Goal**: 移动光点，使其同时落在红线和蓝线上（即交点）。
*   **Feedback**:
    *   偏离红线：Potion A 冒黑烟（不稳定）。
    *   偏离蓝线：Potion B 结冰（不稳定）。
    *   到达交点：双药水同时发光，不仅直观展示了解的**几何意义**（交点），也展示了**代数意义**（同时满足）。

---

## 3. Implementation Plan
1.  **Task T-FixRotation**: (High Priority)
    - Scan all `src/components/chamber` for `autoRotate` and `useFrame` rotation logic.
    - Remove/Disable them immediatey.
2.  **Task T-ImproveSM204**:
    - Update `SimilarityCanvas.tsx`: Unlock zoom, add click-to-focus, add measurement labels.
3.  **Task K-RefactorSM206**:
    - Create `AlchemistCanvas.tsx`.
    - Implement interactive plotting logic for linear systems.

请批准此方案，以便开始执行。
