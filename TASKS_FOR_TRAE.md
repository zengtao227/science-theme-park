# Mission T-CleanupC - Visual Integrity Audit

## 任务背景
用户反馈 `sm2-04` (相似三角形) 等模块的右侧图表显示不完整。这表明项目中存在普遍的 Canvas/SVG 布局适配问题，特别是在不同屏幕尺寸下内容被意外裁剪。

## 目标
全面审计并修复 `src/components/chamber` 下所有可视化组件的响应式布局问题，确保内容在任何容器尺寸下都完整可见。

---

## 重点修复对象

### 1. `src/components/chamber/sm2-04/SimilarityCanvas.tsx`
- **问题**: 物体（如 Tower, Stick, Ring）在特定视角或缩放比例下可能超出视锥体。
- **修复方案**:
  - 使用 `@react-three/drei` 的 `<Bounds fit clip observe>` 包裹场景内容，确保内容自动缩放以适应屏幕。
  - 或者调整 `PerspectiveCamera` 的 `position` 和 `fov`，甚至根据屏幕比例动态调整。
  - 检查 `k` 值很大时，放大的物体是否会溢出。

### 2. 硬编码 Canvas/SVG 尺寸审计
以下文件被检测到包含硬编码像素尺寸（如 `width={800}` 或 `viewBox="0 0 800 320"`），需要改为响应式：
- `src/components/chamber/sc2-02/TitrationCanvas.tsx`
- `src/components/chamber/sm1-02/ThalesTowerCanvas.tsx`
- `src/components/chamber/sp1-06/PendulumCanvas.tsx`
- `src/components/chamber/sm1-02/StatisticsCanvas.tsx`
- `src/components/chamber/sm2-07/CoordinateCanvas2D.tsx`
- `src/components/chamber/sm2-02/PythagorasSimple2D.tsx` (虽然 Kiro 会重构，但暂时先修好 SVG)

**修复策略**:
- **SVG**: 
  - 移除 `<svg width="..." height="...">`。
  - 保留 `viewBox`，但确保 CSS 设置为 `w-full h-full` (或 `h-auto`)。
  - 检查内部元素的坐标是否在 `viewBox` 范围内，防止溢出。
- **HTML Canvas (2D)**:
  - 不要写死 `width={800}`。使用 `Ref` 监听父容器大小 (ResizeObserver)，动态设置 Canvas 的 `width/height` 属性以匹配像素密度 (DPI)。
  - 或者使用 CSS `width: 100%; height: 100%`，但要注意 Canvas 的内部绘图分辨率 (`width/height` attr) 需要同步更新，否则画面会拉伸模糊。

### 3. sm1-01 / sm2-01 等其他模块检查
- 检查 `BinomialCanvas.tsx` 等组件，确保没有内容被 `overflow: hidden` 切断。
- 确保 Grid/坐标轴在小屏幕下不会太密集。

---

## 执行步骤
1. **优先修复 `sm2-04`**: 引入 `<Bounds>` 或调整相机，验证 Similarity 场景是否完整。
2. **批量修复硬编码 Canvas**: 逐个打开上述文件，将硬编码尺寸改为响应式逻辑。
3. **验证**: 在不同窗口大小下测试这些页面，确保图表自适应缩放且不模糊。
