# Mission K84 - Math Visualization Overhaul (Phased Approach)

## Reference
See `DESIGN.md` for detailed technical specifications.

## Phase 1: Infrastructure & POC (High Risk)
### The Fluid Chamber (SM2-02)
- [ ] **Goal**: Validate Matter.js for fluid simulation on mobile.
- [ ] **Task**: Implement `PythagorasFluidCanvas.tsx` prototype.
  - Three square containers (a², b², c²) connected at vertices.
  - ~100-200 particle "fluid" bodies.
  - Interactive rotation (drag/tilt).
- [ ] **Success Criteria**: Smooth fluid flow proving area conservation (c² fills completely).
- [ ] **Fallback**: If performance <30fps, pivot to `PythagorasDissectionCanvas` (SVG animation).

## Phase 2: Core Logic Implementation (Low Risk)
### Mendel's Garden (SM2-01)
- [ ] **Task**: Implement `MendelGeneticsCanvas.tsx`.
  - Dynamic Punnett Square SVG grid.
  - Color-coded genotypes (AA, Aa, aa).
  - Interactive sliders for parent traits.

### Slope Rider (SM2-03)
- [ ] **Task**: Implement `SlopeRiderCanvas.tsx`.
  - Real-time `y = mx + c` line preview.
  - Simple 2D physics loop (gravity + slope force).
  - Success/Fail states (hit target / crash).

## Phase 3: Integration & Polish
- [ ] **Task**: Replace old components in `page.tsx`.
- [ ] **Task**: Add responsive layout support (using `useResizeObserver`).
- [ ] **Task**: Add explanatory overlays (math formulas).

---

## 验收标准
1. **直观性**: 学生能在 **5秒内** 理解 m, c 的几何意义，或 `a² + b² = c²` 的面积关系，无需阅读长篇说明。
2. **互动性**: 所有参数调整必须有即时的视觉反馈（如流体流动、路径改变）。
3. **趣味性**: 摆脱纯数学计算，引入物理/生物场景。

## 资源
- 参考 `PROPOSAL_MATH_VIS_IMPROVEMENTS.md` 获取详细设计思路。
- 使用 `matter-js` 文档实现流体效果。

## 开始前注意
- 这是一个重大的 UX 更新，请确保先备份现有代码或在独立分支工作。
- 优先实现 MVP (最小可行性产品)，复杂的物理效果可以逐步优化。
