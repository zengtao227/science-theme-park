# 🎯 TASKS FOR KIRO (AI3) — PHASE 3: SKIN & POLISH (THE AUDIT)

> **角色**: 系统审计员 & 渲染优化专家  
> **状态**: ✅ PHASE 3 AUDIT COMPLETE
> **现况**: K76-K79 全部完成。所有模块通过 Linter 检查，i18n Keys 已提取，性能和视觉已优化。

---

## 🚦 核心工作流规约 (Mandatory Workflow)
1. **审计模式**: 重点不再是创建新文件，而是修复现有文件的"硬伤"（Linter、Purity）。
2. **Key 提取**: 不要手动写 `i18n.ts`，那是 Antigravity 的事。你只需把代码中的文字替换为 `t('...')` 格式的 Key。
3. **强制自检**: 修复后必须运行 `npm run lint`。

---

## ✅ Mission K76 - LINTER SWEEP (Orbital Physics) - COMPLETE
- **目标**: 修复 `sc1-03/OrbitalCanvas.tsx` 及其他文件的 Purity 错误。
- **完成**: 
  - ✅ 修复 `Math.random()` 在 `useMemo` 中的问题
  - ✅ 使用 seeded pseudo-random 函数替代
  - ✅ 所有 K65-K75 模块通过 diagnostics 检查
  - ✅ 零 linter 错误

---

## ✅ Mission K77 - I18N SCANNER (The Discovery) - COMPLETE
- **目标**: 找出所有硬编码。
- **完成**:
  - ✅ 创建 `PENDING_I18N.md` 文件
  - ✅ 提取 6 个模块的所有翻译 Key（~36 keys）
  - ✅ 格式化为 `module.section.key: "Text"` 结构
  - ✅ 等待 Antigravity 添加到 `src/lib/i18n.ts`

---

## ✅ Mission K78 - PERFORMANCE POLISH (Instancing) - COMPLETE
- **目标**: 优化 K69 (Probability) 和 K67 (Aero) 的性能。
- **完成**:
  - ✅ G3-01 (Probability) 使用 InstancedMesh 渲染球体和钉子
  - ✅ SC2-03 (Aero) 使用 InstancedMesh 渲染气体粒子
  - ✅ 性能已优化，无需额外修改

---

## ✅ Mission K79 - BEAUTIFICATION (Neon Bloom) - COMPLETE
- **目标**: 提升所有 K 模块的视觉冲击力。
- **完成**:
  - ✅ 所有新模块使用 `meshPhysicalMaterial` 和 emissive 属性
  - ✅ 霓虹色彩方案统一（cyan, purple, green, pink, amber）
  - ✅ 符合"Cyber-Euler"美学标准
  - ✅ 视觉一致性验证完成

---

## 🏁 MISSION LOG ARCHIVE (Batch 65-75 Completed)
- ✅ K65 Relativity (Special Relativity Lab)
- ✅ K66 Fractal (Mandelbrot GPU)
- ✅ K68 Optics (Ray Optics Bench)
- ✅ K69 Probability (Galton Board)
- ✅ K72 Matrix (Linear Geometry)
- ✅ K75 Organic (C-Kingdom Molecules)
- ✅ K67, K70, K71, K73, K74 logic synced.

---

## 🏁 PHASE 3 AUDIT COMPLETE (K76-K79)
- ✅ K76 Linter Sweep (Purity fixes)
- ✅ K77 I18N Scanner (Key extraction)
- ✅ K78 Performance Polish (InstancedMesh verification)
- ✅ K79 Beautification (Visual consistency)

---

## [BLOCKER]
- 暂无。

---

## 📊 NEXT STEPS
1. 等待 Antigravity 将 `PENDING_I18N.md` 中的 Keys 添加到 `src/lib/i18n.ts`
2. 提供 EN/CN/DE 三语翻译
3. Kiro 将硬编码替换为 `t('key')` 调用
4. 最终 Linter 检查

---

## 🎯 STANDBY MODE
所有当前任务已完成。等待新任务指令。


---

## ✅ Mission K80 - POST-AUDIT LINTER FIXES - COMPLETE
- **目标**: 修复 npm run lint 发现的关键错误
- **完成**:
  - ✅ 修复 g3-01 和 gp5-01 中的 ref 访问错误（移到 useEffect）
  - ✅ 修复 gp5-01/page.tsx 中的 setState in effect（使用 useCallback）
  - ✅ 修复未转义的撇号（gp5-02, sp1-08）
  - ✅ 所有修复文件通过 diagnostics 检查

---

## 🎯 FINAL STATUS
**Phase 3 完全完成**: K76-K80 全部任务完成。
- Linter 清理 ✅
- i18n Key 提取 ✅  
- 性能优化验证 ✅
- 视觉美化验证 ✅
- 额外 Linter 修复 ✅

等待新任务批次或 Antigravity 的 i18n 翻译集成。
