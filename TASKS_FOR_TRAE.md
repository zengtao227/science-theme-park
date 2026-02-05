# 🎯 TASKS FOR TRAE (AI2) — Mission Batch 31-32

> **角色**: UI/UX 专家 & 系统架构师  
> **当前时间**: 2026-02-05 22:45 CET  
> **状态**: Mission T29-30 ✅ COMPLETED (Vault & Responsive)

---

## 🚦 核心工作流规约 (Mandatory Workflow)
**[重要]** 领工必读：
1. **实时对齐**: 本文件包含 **Antigravity** 提供的专家级 UI 设计模式。你**必须**在开始每个 Mission 前重新读取此文件，确保样式完全符合“赛博科学 (Cyber-Science)”审美。
2. **拒绝平庸**: 禁止使用标准的按钮和背景，必须严格执行 `🧠 EXPERT GUIDANCE` 中的动效与毛玻璃参数。
3. **Blocker 报告**: 遇到任何 Recharts 渲染、Zustand 持久化冲突，请在底部 `## [BLOCKER]` 区留言。

---

## 📋 Mission T31 - NEXUS ADVANCED SEARCH & FILTERING

### 🧠 EXPERT GUIDANCE
> **组件架构**:
- **搜索条**: 使用 `framer-motion` 实现展开动效。边框带有 `neon-purple` 扫光效果。
- **标签过滤**: 实现学科类别的胶囊标签（Physics, Math, Chemistry, Biology, Socratic）。
- **动效**: 过滤列表时，卡片必须有平滑的布局转换（使用 `AnimatePresence` 和 `layout` prop）。

### 目标
在首页 Nexus 增加高级模块筛选系统。

### 技术要求
- **位置**: `src/app/page.tsx`
- **组件**: `src/components/ui/ModuleFilter.tsx`

---

## 📋 Mission T32 - USER SCIENCE PROFILE (Stats Dashboard)

### 目标
创建一个沉浸式的“科学家档案”页面。展示用户在各个维度（逻辑、直觉、严谨、实验）的能力值。

### 核心详情
- **雷达图**: 深度集成之前开发的 `ScienceRadar`。
- **模块统计**: 展示已完成的模块数量、平均正确率。
- **时间轴**: 记录学习足迹的垂直时间轴。

### 技术要求
- **页面**: `src/app/profile/page.tsx`
- **组件**: `src/components/profile/StatsMatrix.tsx`

---

## ⚠️ 代码质量要求
- **原子化设计**: 继续拆分通用 UI 组件到 `src/components/ui/`。
- **i18n**: 确保所有状态描述文本都在 `i18n.ts` 中定义。

---

## [MISSION LOG ARCHIVE]

### ✅ Mission T29-30 (2026-02-05)
- **Achievement Vault**: 实现。
- **Responsive Layout**: 完成 `ChamberLayout` 的移动端堆叠优化。

---

## [BLOCKER]
- 暂无。
