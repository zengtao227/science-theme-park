# Implementation Plan: Critical Modules Phase 1 — 综合审查 + 工作计划

> **更新日期**: 2026-02-17 v4
> **审查来源**: Claude 系统性审查 + Kiro AI 手动验证 + AI_HANDOVER_SUMMARY.md + MODULE_QUALITY_IMPROVEMENT_PLAN
> **审查工具**: `bash scripts/deep-audit.sh` (v2, 可运行获取最新状态)

---

## 🚀 快速开始指南

**如果你是第一次执行这个计划，请按以下顺序操作：**

1. **运行审查脚本获取最新状态**
   ```bash
   bash scripts/deep-audit.sh > MODULE_AUDIT_LATEST.txt 2>&1
   cat MODULE_AUDIT_LATEST.txt
   ```

2. **执行 Sprint 0**: 修复首页链接和重复模块（1小时）

3. **执行 Sprint 0.5**: 系统性验证所有模块，生成验证报告（2-3小时）
   - 这是最关键的步骤，会消除审查脚本的误判
   - 输出 `MODULE_VERIFICATION_REPORT.md`
   - 根据验证结果更新后续 Sprint 的模块列表

4. **执行 Sprint 1**: 验证4个新创建的模块（2小时）

5. **执行 Sprint 1.5**: 快速胜利 - 只缺ELITE的模块（1天）

6. **执行 Sprint 2**: 修复初中模块（按 2A→2B→2C→2D 顺序，或并行）

7. **执行 Sprint 3**: 修复高中模块

8. **执行 Sprint 4**: 最终验证和文档更新

**重要原则：**
- 每修复1个模块立即验证（build + 浏览器测试）
- 每完成3-5个模块就 commit + push
- 同时完成3项工作：补题目 + 迁移i18n + 改进LaTeX

---

## 📋 模块完成标准

所有模块必须满足以下标准才算完成。标准分为3个优先级：

### P0 优先级（核心功能 - 必须完成）

| 标准 | 说明 | 验证方法 |
|------|------|---------|
| ✅ 题目数量 | 每个 Stage × 每个 Difficulty = 恰好 5 道题 | 浏览器测试每个难度 |
| ✅ 难度递进 | 概念深度递进，不是数量递进 | 检查题目设计逻辑 |
| ✅ 编译通过 | `npm run build` 0 errors | 运行构建命令 |
| ✅ 浏览器可用 | 所有难度可选且有题 | 手动点击测试 |

### P1 优先级（国际化 - 强烈建议）

| 标准 | 说明 | 验证方法 |
|------|------|---------|
| ✅ 三语翻译 | EN/CN/DE 完整翻译 | 切换语言测试 |
| ✅ CN difficulty | 显示"基础/核心/进阶/精英" | 切换到中文检查 |
| ✅ DE difficulty | 显示"BASIS/KERN/ERWEITERT/ELITE" | 切换到德文检查 |
| ✅ 使用新i18n | 使用 `useLanguage()` hook | 检查代码 |

### P2 优先级（视觉质量 - 可选改进）

| 标准 | 说明 | 验证方法 |
|------|------|---------|
| ✅ LaTeX 渲染 | 所有数学公式使用 `<InlineMath>`/`<BlockMath>` | 检查公式显示 |
| ✅ 可视化缩放 | 自动缩放，所有内容可见 | 浏览器测试 |
| ✅ 标签清晰 | 不与线和轴重叠 | 视觉检查 |
| ✅ 场景描述 | 150-250词，Basel语境 | 检查翻译文件 |

**执行策略：**
- 修复模块时，P0 + P1 + P2 同时完成（3合1模式）
- 如果时间紧张，可以先完成 P0，后续再补 P1/P2
- Sprint 0.5 验证时，只检查 P0 标准

---

## � 关键警告：审查脚本的局限性

**在执行任何修复前，务必阅读此节！**

我们和另一个 AI 都发现，**自动化审查有严重误判**：

1. **Record 模式检测失败**: 很多模块使用 `Record<Stage, Record<Difficulty, Quest[]>>` 定义题目池，
   比如 SM1-03, SM1-04, SM2-08 等。这种模式的模块实际上题目完整，但简单的 grep 检测不到。

2. **else-if 链脚本无法可靠统计**: SM1-02, SM1-05, SM2-02, SM2-05, SM3-03 等使用 `if(isBasic)...else if(isCore)...` 模式，
   `quests.push` 计数不能反映真实题目数。

3. **动态 forEach 生成**: 如 SB1-03，用 `scenarios.forEach` 生成题目，场景数组大小决定题目数。

**⚠️ 因此，下面 Part B 中标记为 🔴 的模块，必须先手动验证（Sprint 0.5），确认是否真的缺题，
再决定是否修复。不要盲目补充题目！**

---

## �📊 第一部分：审查发现

### A. 课程覆盖度审查 (Lehrplan 21 + Basel Gymnasium)

基于 Lehrplan 21 (Zyklus 3, Sekundarstufe I) 和 Basel-Stadt Gymnasium 要求，
对照我们 **76 个 chamber 模块** 进行系统性审查。

#### 数学 (Mathematik) — 覆盖良好，1个关键缺口

| Basel 课标要求 | 我们的模块 | 状态 |
|---|---|---|
| 算术/代数基础 | SM1.02-SM1.05, SM2.01, SM2.06 | ✅ |
| 方程与方程组 | SM2.01, SM2.06, SM3.01 | ✅ |
| 几何基础 (面积、体积) | SM1.01 | ✅ |
| 勾股定理 | SM2.02 | ✅ |
| 相似形与比例 | SM2.04 | ✅ |
| 坐标几何 | SM2.07 | ✅ |
| 函数 (线性、二次) | SM2.03, SM3.02 | ✅ |
| 指数与对数 | SM3.03, SM3.04 | ✅ |
| 三角学 | SM3.04, SM3.02 | ✅ |
| 幂运算与根式 | SM2.05 | ✅ |
| 数据分析/统计 | SM2.10 | ✅ |
| 概率 | GM3.01, SM2.08 | ✅ |
| 3D 几何 | SM3.05 | ✅ |
| 微积分-导数 | GM1.01, GM1.01-adv | ✅ |
| 向量 | GM2.01 | ✅ |
| 复数 | GM4.01 | ✅ |
| **微积分-积分** | **GM1.02** | **✅ 已创建，需验证题目** |
| ⚠️ 数列与级数 | — | 🟡 可选 |
| ⚠️ 组合数学 | — | 🟡 可选 |

#### 物理 (Physik) — 覆盖良好，1个关键缺口

| Basel 课标要求 | 我们的模块 | 状态 |
|---|---|---|
| 测量与单位 | SP3.01 | ✅ |
| 力与运动 | SP3.02 | ✅ |
| 能量与功 | SP3.03 | ✅ |
| 压强与流体 | SP3.04 | ✅ |
| 简单机械 | SP3.05 | ✅ |
| 声学 | SP3.06 | ✅ |
| 几何光学 | SP3.08 | ✅ |
| 热力学 | GP2.01, GP2.02 | ✅ |
| 电学与磁学 | GP1.01-04 | ✅ |
| **波动与波光学** | **GP3.01** | **✅ 已创建，需验证题目** |
| ⚠️ 核物理基础 | — | 🟡 可选 |

#### 化学 (Chemie) — 1个关键缺口

| Basel 课标要求 | 我们的模块 | 状态 |
|---|---|---|
| 元素周期表 | SC1.01, SC1.02 | ✅ |
| 原子结构 | SC1.03 | ✅ (sandbox) |
| 化学键 | SC1.04, SC1.05 | ✅ |
| 化学反应/方程式 | SC2.01-SC2.04 | ✅ |
| 有机化学 | SC3.01-SC3.05 | ✅ |
| 电化学 | GC1.01, GC1.02 | ✅ |
| 热化学 | GC2.01 | ✅ |
| 化学平衡/动力学 | GC3.01, GC3.02 | ✅ |
| **酸碱化学** | **SC2.05** | **✅ 已创建，需验证题目** |
| **氧化还原** | **SC2.06** | **✅ 已创建，需验证题目** |

#### 生物 (Biologie) — 覆盖完善

| Basel 课标要求 | 我们的模块 | 状态 |
|---|---|---|
| 细胞结构 | SB1.01 | ✅ |
| 光合作用 | SB1.02 | ✅ |
| 细胞分裂 | SB1.03 | ✅ |
| 代谢 | SB1.01-M | ✅ |
| 组织与器官 | SB2.01 | ✅ |
| 人体系统 | SB2.02, SB2.02-body | ✅ |
| 遗传学 | SB2.03 | ✅ |
| 生态系统 | SB3.01 | ✅ |
| 进化 | GB1.01 | ✅ |
| 神经生物学 | GB2.01 | ✅ |
| 遗传学进阶 | GB3.01 | ✅ |
| 免疫学 | GB3.02 | ✅ |

**课程覆盖结论**: 4 个关键缺口模块 (GM1.02, SC2.05, GP3.01, SC2.06) **已创建文件但题目完整性待验证**。

---

### B. 题目完整性审查 — 重大发现 🔴

**标准**: 每个 quest-based 模块应有 3 stages × 4 difficulties × 5 题 = 60 题。

根据代码行数分析、静态 ID 计数、和 `quests.push` 模式检测，模块分为以下类别：

#### ✅ 题目完整的模块 (FULL — 有完整的 4 难度 × 多 Stage 题目池)

| 模块 | 行数 | 题目数 | 模式 | 备注 |
|------|------|--------|------|------|
| GM1.01 | 584 | ~120 | 独立数据数组 | 6个Stage，完善 |
| GM1.01-adv | 1274 | ~70 | 独立数据数组 | 进阶版 |
| GM1.02 | 530 | ~63 | 独立数据数组 | 新创建，需浏览器验证 |
| GM2.01 | 356 | ~60 | 独立数据数组 | ✅ |
| GM3.01 | 473 | ~80 | 独立数据数组 | 4个Stage |
| SC2.01 | 306 | ~63 | Record<Difficulty> | ✅ |
| SC2.05 | 932 | ~63 | Record<Difficulty> | 新创建，需浏览器验证 |
| SM1.03 | 986 | ~73 | Record<S,Record<D>> | ✅ Kiro已确认完整 |
| SM1.04 | 1189 | ~84 | Record<S,Record<D>> | ✅ Kiro已确认完整 |
| SM2.08 | 1159 | ~154 | 独立数据数组 | 4个Stage |
| SB2.02-body | 760 | ~60 | quests.push | 另一AI已修复 |

> **注意**: SM1-03, SM1-04 使用 `Record<Stage, Record<Difficulty, Quest[]>>` 模式，
> 之前被错误标记为"空"。Kiro AI 验证后确认这些模块实际有完整题目。
> **同类模块可能也被误判**，务必在 Sprint 0.5 手动验证。

#### ⚠️ 有题目但不完整的模块 (PARTIAL — 需要补充)

这些模块使用 `useQuestManager` 和 `ChamberLayout`，有动态题目生成，
但数据池太小或难度区分不充分。

| 模块 | 行数 | 问题 | 模式说明 |
|------|------|------|---------|
| SM1.01 | 438 | ~9题，缺少明确4难度池 | slice模式，all数组小 |
| SM1.02 | 632 | 有else-if链，需验证5题/难度 | else if模式 (C模式) |
| SM1.05 | 636 | 有else-if链，需验证5题/难度 | else if模式 (C模式) |
| SM2.01 | 942 | 复杂结构，需验证覆盖 | 混合模式 |
| SM2.02 | 965 | 有else-if链，需验证 | else if模式 |
| SM2.03 | 330 | 小数据池 | 需补充 |
| SM2.04 | 313 | ~7题，缺ELITE | 需补充 |
| SM2.05 | 319 | 有else-if链，需验证 | else if模式 |
| SM2.06 | 254 | 小数据池，缺ELITE | 需补充 |
| SM2.07 | 406 | ~7题 | 需补充 |
| SM2.10 | 302 | ~3题，缺ELITE | 需补充 |
| SM3.01 | 392 | 部分覆盖 ~51/80 | 4个Stage |
| SM3.02 | 538 | 需验证 | 需检查 |
| SM3.03 | 429 | 有else-if链，需验证 | else if模式 |
| SM3.04 | 361 | 小数据池 | 需补充 |
| SM3.05 | 402 | ~5题 | 需补充 |
| GM4.01 | 385 | ~21/60，严重不足 | 需大量补充 |
| GP2.01 | 303 | ~3题，缺ELITE | 需补充 |
| GP2.02 | 302 | ~3题，缺ELITE | 需补充 |
| GP3.01 | 813 | 新创建，需验证 | 需浏览器验证 |
| SC2.06 | 499 | 新创建，需验证 | 需浏览器验证 |

#### 🔴 题目严重不足的模块 (数据池极小或只有骨架)

这些模块使用 `useQuestManager` 但场景数据极少（通常 2-4 个场景），
难度通过 `isAdvanced` 二值开关区分而非真正的 4 级难度池。

| 模块 | 行数 | 实际题目 | 问题描述 |
|------|------|---------|---------|
| EM1.01 | 217 | ~3 | 只有1个Stage，数据极少 |
| EM2.01 | 355 | ~3 | 稀疏数据 |
| SB1.01 | 284 | ~3 | 动态生成，场景数组很小 |
| SB1.01-M | 288 | ~3 | 同上 |
| SB1.02 | 366 | ~3 | 同上 |
| SB1.03 | 323 | 2-4/stage | 场景数组只有2-4项，BASIC/CORE共用 |
| SB2.01-tissues | 495 | ~3 | 动态生成，场景小 |
| SB2.02 | 303 | ~3 | 与SB2.02-body重复 |
| SB2.03 | 280 | ~3 | 稀疏 |
| SB3.01 | 316 | ~3 | 稀疏 |
| GB1.01 | 383 | ~3 | 稀疏 |
| GB2.01 | 376 | ~3 | 稀疏 |
| GB3.01 | 291 | ~3 | 稀疏 |
| GB3.02 | 303 | ~3 | 稀疏 |
| GC1.01 | 237 | ~3 | 稀疏 |
| GC1.02 | 336 | ~3 | 稀疏 |
| GC2.01 | 221 | ~3 | 稀疏 |
| GC3.01 | 210 | ~3 | 稀疏 |
| GC3.02 | 226 | ~3 | 稀疏 |
| SC1.01 | 263 | ~6 | 部分 |
| SC1.02 | 448 | ~18 | 有数据但结构不明 |
| SC2.02 | 243 | ~3 | 稀疏 |
| SC3.01 | 276 | ~3 | 稀疏 |
| SC3.02 | 349 | ~3 | 稀疏 |
| SC3.03 | 357 | ~3 | 稀疏 |
| SC3.04 | 334 | ~3 | 稀疏 |
| SC3.05 | 248 | ~3 | 稀疏 |
| SP3.01 | 335 | ~3 | 稀疏 |
| SP3.02 | 163 | ~3 | 极短，骨架 |
| SP3.03 | 157 | ~3 | 极短，骨架 |
| SP3.04 | 164 | ~3 | 极短，骨架 |
| SP3.05 | 343 | ~3 | 稀疏 |
| SP3.06 | 689 | 动态生成 | 有内容但需验证题量 |
| SP3.07 | 303 | ~3 | 稀疏 |
| SP3.08 | 309 | ~3 | 稀疏 |

#### 📋 非 Quest 模块 (Sandbox/Layout — 不需要题目池)

| 模块 | 类型 | 说明 |
|------|------|------|
| GP1.01 | SANDBOX | 核物理交互模拟 |
| GP1.02 | SANDBOX | 相对论实验室 |
| SC1.03 | SANDBOX | 轨道可视化 |
| GP1.03 | LAYOUT | 粒子加速器模拟 |
| GP1.04 | LAYOUT | 量子隧穿 |
| SC1.04 | LAYOUT | 化学键构建 |
| SC1.05 | LAYOUT | 化学键类型 |
| SC2.03 | LAYOUT | 气体定律 |
| SC2.04 | LAYOUT | 溶解度 |

#### 🔍 首页展示遗漏

| 模块 | 状态 | 建议 |
|------|------|------|
| GP2.02 | 不在首页 | 添加到物理区 |
| SB2.02 | 与 sb2-02-body-systems 重复 | 确认保留哪个 |
| SC1.05 | 不在首页 | 添加到化学区 |
| SC3.05 | 不在首页 | 添加到化学区 |
| SP3.07 | 不在首页 | 检查内容后决定 |

### C. i18n 模式审查 — 43 个模块需迁移 🟡

Kiro AI 发现 **43个模块 (57%)** 仍使用旧的 `translations[currentLanguage]` 模式：

| 学科 | 需迁移的模块 | 数量 |
|------|------------|------|
| 数学 (SM/GM) | sm1-01, sm1-02, sm1-05, sm2-01~sm2-07, sm2-10, sm3-01~sm3-05, em2-01, gm1-01, gm1-01-adv, gm2-01, gm3-01 | ~20 |
| 物理 (SP/GP) | sp3-01~sp3-06, gp2-01, gp2-02 | ~8 |
| 化学 (SC/GC) | sc1-02, sc2-02, sc3-01~sc3-05, gc1-01, gc1-02, gc2-01, gc3-01, gc3-02 | ~12 |
| 生物 (GB) | gb1-01, gb3-02 | ~2 |
| 工程 (EM) | em2-01 | ~1 |

**迁移要求**: 当修改一个模块的题目池时，**同时迁移 i18n 模式**。
不需要专门做 i18n 迁移 Sprint，在补题目时顺便做。

### D. LaTeX 使用审查 — 57 个模块不充分 🟡

| 状态 | 模块数 | 说明 |
|------|--------|------|
| ✅ LaTeX 充分 (>5次) | ~9 | GM1.01, SM1.03 等数学模块 |
| ⚠️ LaTeX 部分 (1-5次) | ~57 | 大部分模块 |
| 🔴 LaTeX 缺失 (0次) | ~10 | 无公式渲染 |

**改进标准**: 所有数学公式必须使用 `<InlineMath>` 或 `<BlockMath>`，不能显示原始文本。
**优先级**: 在补题目时顺便改进 LaTeX 使用，不做专门 Sprint。

---

## ⚠️ 关键规范（必读，不可绕过）

### 技术栈（以实际版本为准）
- **Next.js 16.1.5** (非 14)、**React 19.2.3** (非 18)、**Tailwind CSS 4.1.18** (非 v3)
- **TypeScript strict mode**、**Zustand** (状态管理)、**Framer Motion** (动画)
- **react-katex** (数学公式)、**SVG** (2D 可视化，优先于 Canvas)

### i18n 模式（两种共存，新模块用新模式）

```typescript
// ✅ 新模式 — 新模块和修改的模块一律使用
import { useLanguage } from "@/lib/i18n";
const { t } = useLanguage();
// 使用: t("gm1_02.title"), t("gm1_02.prompts.hint", { param: "value" })

// ❌ 旧模式 — 不要在新代码中使用
import { translations } from "@/lib/i18n";
const t = translations[currentLanguage].gm1_02;
```

### useQuestManager 默认 tolerance = 0.1
```typescript
// src/hooks/useQuestManager.ts 第 45 行
// 如需更高精度，显式传入 tolerance: 0.01
```

### 题目标准
- 每个 Stage × 每个 Difficulty = **恰好 5 道题**
- 难度 = **概念深度递进**，不是数量递进
- **BASIC**: 直接观察、单步计算、整数
- **CORE**: 组合概念、多步计算、需要纸笔  
- **ADVANCED**: 条件问题、小数/分数、完整过程
- **ELITE**: 综合策略、深入理解、多种方法
- 必须用 `useCallback` 包裹 `buildStagePool`
- render 中禁止 `Math.random()`

### 翻译标准
- 每个模块: `src/lib/i18n/{en,cn,de}/{subject}.ts`
- CN difficulty: "基础/核心/进阶/精英"
- DE difficulty: "BASIS/KERN/ERWEITERT/ELITE"
- 场景描述 150-250 词，Basel 语境

---

## 📋 第二部分：工作计划

### 前置步骤：运行审查脚本确认当前状态

在开始任何修复前，先运行审查脚本获取最新状态：
```bash
bash scripts/deep-audit.sh > MODULE_AUDIT_LATEST.txt 2>&1
cat MODULE_AUDIT_LATEST.txt
```

⚠️ **上面 Part B 的数据基于静态分析，某些模块使用动态生成模式（else-if链/forEach/Record），
审查脚本可能低估了实际题目数。请先用脚本确认最新状态，再决定哪些模块需要修复。**

---

### Sprint 0: 首页修复 + 重复清理（最先做）

- [ ] 0.1 添加遗漏模块到首页
  - 打开 `src/app/page.tsx`
  - 在物理模块列表中，`GP2.01` 之后添加:
    ```typescript
    { code: "GP2.02", title: t("home.gp2_02_title"), desc: t("home.gp2_02_subtitle"), color: "neon-green", href: "/chamber/gp2-02", tags: ["physics"] },
    ```
  - 在化学模块列表中，`SC1.04` 之后添加:
    ```typescript
    { code: "SC1.05", title: t("home.sc1_05_title"), desc: t("home.sc1_05_subtitle"), color: "neon-purple", href: "/chamber/sc1-05", tags: ["chemistry"] },
    ```
  - 在化学模块列表中，`SC3.04` 之后添加:
    ```typescript
    { code: "SC3.05", title: t("home.sc3_05_title"), desc: t("home.sc3_05_subtitle"), color: "neon-green", href: "/chamber/sc3-05", tags: ["chemistry"] },
    ```
  - 在 `src/lib/i18n/{en,cn,de}/common.ts` 中添加:
    - `home.gp2_02_title` / `home.gp2_02_subtitle`
    - `home.sc1_05_title` / `home.sc1_05_subtitle`
    - `home.sc3_05_title` / `home.sc3_05_subtitle`
  - 确认: `npm run build` 通过，浏览器检查链接

- [ ] 0.2 解决 SB2.02 重复
  - 比较 `sb2-02/page.tsx` 和 `sb2-02-body-systems/page.tsx`
  - `sb2-02-body-systems` 是另一个AI已修复的正式版本（760行，60题）
  - `sb2-02` 是旧版（303行，3题）
  - 确保首页只链接到 `sb2-02-body-systems`
  - 确认: `grep -c "sb2-02" src/app/page.tsx` 返回 1（不是2）

- [ ] 0.3 检查 SP3.07
  - 查看 `src/app/chamber/sp3-07/page.tsx` 内容
  - `grep "sp3_07" src/lib/i18n/en/physics.ts` 检查翻译
  - 如果是有效模块，添加到首页
  - 如果是空壳，标记待补充

- [ ] 0.4 添加新模块到首页 (GM1.02, SC2.05, GP3.01, SC2.06)
  - 这些模块在上一轮已创建文件，需要确认首页有链接
  - 在 `src/app/page.tsx` 对应学科区域添加条目
  - 在 `src/lib/i18n/{en,cn,de}/common.ts` 添加首页翻译键

- [ ] 0.5 Checkpoint Sprint 0
  - `npm run build` 通过
  - 浏览器检查首页所有新链接
  - `git add -A && git commit -m "fix: homepage module links and SB2.02 cleanup" && git push`

---

### Sprint 0.5: 系统性验证 — 消除误判（必须在任何修复前完成）

**目的**: 之前的审查脚本有严重误判（无法检测 Record 模式和 else-if 模式），
必须逐模块验证，确认哪些真的缺题，哪些实际已完整。

**验证方法** — 运行升级后的审查脚本：
```bash
bash scripts/deep-audit.sh > MODULE_AUDIT_LATEST.txt 2>&1
```

然后对每个审查脚本报告为 ⚠️/🔴 的模块，用以下命令手动确认：

```bash
# 快速验证单个模块 — 将 MODULE 替换为模块名
MOD=sm1-03 && echo "=== $MOD ==="  \
  && echo "Record模式: $(grep -c 'Record<' src/app/chamber/$MOD/page.tsx)" \
  && echo "quests.push: $(grep -c 'quests.push' src/app/chamber/$MOD/page.tsx)" \
  && echo "难度分支: $(grep -c 'BASIC\|CORE\|ADVANCED\|ELITE\|isBasic\|isCore\|isAdv\|isElite' src/app/chamber/$MOD/page.tsx)" \
  && echo "ID数量: $(grep -oE '"[A-Z_]+_[BCAE][0-9]+"' src/app/chamber/$MOD/page.tsx | wc -l | tr -d ' ')" \
  && echo "行数: $(wc -l < src/app/chamber/$MOD/page.tsx)"
```

**判断标准表** — 根据验证结果分类模块：

| 指标 | ✅ 已完整 | ⚠️ 只缺ELITE | 🟡 题数不足 | 🔴 确实稀疏 |
|------|----------|-------------|-----------|-----------|
| Record模式 | >0 | >0 | >0 | 0 |
| 代码行数 | >800 | >500 | 300-500 | <300 |
| ID数量 | >50 | >30 | 10-30 | <10 |
| 难度分支 | 有4个难度 | 有3个难度 | 有2-3个难度 | 只有isAdvanced |
| quests.push | >40 | >20 | 5-20 | <5 |

**需要验证的模块列表** — 按优先级排列：

首先验证 Kiro AI 手动确认的「可能误报」模块：
- [ ] SM1-03 (986行, Kiro确认有Record模式 → 预计 ✅)
- [ ] SM1-04 (1189行, Kiro确认有Record模式 → 预计 ✅)
- [ ] SM2-01 (942行 → 需验证)
- [ ] SM2-02 (965行 → 需验证，有else-if链)
- [ ] SM2-04 (313行 → 需验证)
- [ ] SM2-08 (1159行 → 预计 ✅)
- [ ] SM3-01 (392行 → 需验证)
- [ ] SM3-02 (538行 → 需验证)
- [ ] SM3-04 (361行 → 需验证)
- [ ] SP3-01~SP3-08 (全部需验证)
- [ ] SC1-01, SC1-02 (需验证)
- [ ] SC2-02, SC3-01~SC3-05 (需验证)
- [ ] SB 全系列 (需验证)
- [ ] GB 全系列 (需验证)
- [ ] GC 全系列 (需验证)

**验证报告格式** — 输出到 `MODULE_VERIFICATION_REPORT.md`：

```markdown
# Module Verification Report
生成时间: YYYY-MM-DD HH:MM

## ✅ 已完整的模块 (不需要修改)
| 模块 | 行数 | Record | ID数 | 难度分支 | 备注 |
|------|------|--------|------|---------|------|
| SM1-03 | 986 | 是 | 73 | 4个 | 使用Record<S,Record<D>> |

## ⚠️ 只缺ELITE的模块 (快速胜利 - Sprint 1.5)
| 模块 | 行数 | 当前难度 | 缺少 | 预计工作量 |
|------|------|---------|------|-----------|
| SM1-02 | 632 | B/C/A | ELITE | 3stages×5=15题 |

## 🟡 题数不足的模块 (需要补充 - Sprint 2)
| 模块 | 行数 | 当前题数 | 目标 | 预计工作量 |
|------|------|---------|------|-----------|
| SM2-03 | 330 | ~15 | 60 | 补充45题 |

## 🔴 确实稀疏的模块 (需要大量补充 - Sprint 2/3)
| 模块 | 行数 | 问题 | 预计工作量 |
|------|------|------|-----------|
| SB1-03 | 323 | 只有isAdvanced开关 | 重构+补充57题 |

## 📊 统计汇总
- ✅ 已完整: X 个
- ⚠️ 只缺ELITE: Y 个
- 🟡 题数不足: Z 个
- 🔴 确实稀疏: W 个
- 总计需修复: Y+Z+W 个
```

**输出**: 生成验证报告 `MODULE_VERIFICATION_REPORT.md`，将每个模块分类为：
- ✅ **已完整**: 有4难度×5题 — 不需要修改
- ⚠️ **只缺ELITE**: 有BASIC/CORE/ADV但缺ELITE — **快速胜利(Sprint 1.5)**
- 🟡 **题数不足**: 有题但每难度<5题 — 需要补充
- 🔴 **确实稀疏**: 只有2-4题或用isAdvanced二值开关 — 需要大量补充

- [ ] 0.6 Checkpoint Sprint 0.5
  - 验证报告输出到 `MODULE_VERIFICATION_REPORT.md`
  - 更新下方 Sprint 1.5/2/3 的模块列表（移除误判的模块）
  - `git add -A && git commit -m "docs: module verification report" && git push`

---

### Sprint 1: 验证新创建的4个模块 (GM1.02, SC2.05, GP3.01, SC2.06)

这些模块在之前一轮由AI创建，但可能还未被浏览器测试。

- [x] 1.1 验证 GM1.02 积分模块
  - 浏览器访问 `/chamber/gm1-02`
  - 测试每个 Stage (ANTIDERIVATIVE, DEFINITE_INTEGRAL, APPLICATION)
  - 测试每个 Difficulty (BASIC, CORE, ADVANCED, ELITE) - 确认各有5题
  - 切换 EN/CN/DE 三语 — CN difficulty 显示"基础/核心/进阶/精英"
  - LaTeX 公式渲染正常
  - 可视化（函数曲线 + 着色区域）正常
  - 如果发现问题，记录后在 Sprint 2 修复

- [ ] 1.2 验证 SC2.05 酸碱化学模块
  - 浏览器访问 `/chamber/sc2-05`
  - 测试 PH_BASICS, NEUTRALIZATION, TITRATION 各Stage
  - 测试 4 难度各 5 题
  - 三语测试
  - pH 颜色编码: pH < 7 红, pH = 7 绿, pH > 7 蓝

- [ ] 1.3 验证 GP3.01 波动物理模块
  - 浏览器访问 `/chamber/gp3-01`
  - 测试 WAVE_PROPERTIES, SUPERPOSITION, OPTICS
  - 波动画流畅(60fps)、无闪烁
  - 三语测试

- [ ] 1.4 验证 SC2.06 氧化还原模块
  - 浏览器访问 `/chamber/sc2-06`
  - 测试 OXIDATION_STATE, ELECTRON_TRANSFER, ELECTROCHEMISTRY
  - 三语测试
  - 氧化态标注正确

- [ ] 1.5 Checkpoint Sprint 1
  - 记录所有发现的问题到一个列表
  - 如果问题严重(build失败/页面崩溃)，直接修复
  - `git add -A && git commit -m "fix: verification fixes for new modules" && git push`

---

### Sprint 1.5: 快速胜利 — 只缺 ELITE 的模块（低垂的果实）

**目的**: 先处理最容易的模块 — 已有 BASIC/CORE/ADVANCED 但只缺 ELITE 难度。
每个模块只需补充 stage数 × 5 题，工作量小，能快速建立信心。

> ⚠️ **重要**: 以下列表是初步估计，实际执行时必须以 Sprint 0.5 验证报告中标记为 ⚠️ 只缺ELITE 的模块为准。
> 如果 Sprint 0.5 验证后发现某模块实际已完整，请从此列表中删除。

可能的候选（待 Sprint 0.5 确认）：
- [x] SM1.02 (Kiro报告: BASIC:3 CORE:3 ADV:3 ELITE:0) — 只需加 3stages×5=15题
- [ ] SM1.05 (BASIC:3 CORE:3 ADV:3 ELITE:0) — 同上
- [ ] SM2.05 (BASIC:3 CORE:3 ADV:3 ELITE:0) — 同上
- [ ] GP2.01 (BASIC:1 CORE:1 ADV:1 ELITE:0) — 可能需要更多补充
- [ ] GP2.02 (同 GP2.01)

**工作模式**: 
1. 只添加 `case "ELITE":` 分支和对应的 5 题数据
2. 添加 ELITE 难度的三语翻译
3. `npm run build` 验证
4. 浏览器快速确认 ELITE 难度可选且有题

- [ ] 1.6 Checkpoint Sprint 1.5
  - `git add -A && git commit -m "feat: add ELITE difficulty to partial modules" && git push`

---

### Sprint 2: 修复确认缺题的初中模块 (基于 Sprint 0.5 验证结果)

**重要**: 只修复 Sprint 0.5 确认为 🔴 或 🟡 的模块。如果某模块在验证中被确认 ✅，跳过它。

**工作模式**: 对于每个需要修复的模块，同时完成 3 项：
1. **补题目**: 每 Stage × 每 Difficulty = 5 题
2. **迁移 i18n**: 如果还在用旧模式，顺便改为 `useLanguage()`
3. **改进 LaTeX**: 确保所有公式用 `<InlineMath>`/`<BlockMath>` 渲染

然后在三语翻译文件中添加对应的 prompts/hints。

**⚠️ 渐进式验证**: 每修复完 **一个模块** 就立即执行：
1. `npm run build` — 确保编译通过
2. 浏览器快速点击该模块的 4 个难度 — 确认每个都有题
3. 切换 CN 语言 — 确认 difficulty 显示"基础/核心/进阶/精英"
4. 如果有问题，**立即修复**，不要等整个学科做完再回头

✅ 通过后再进入下一个模块。每完成 3-5 个模块做一次 git commit。

#### 2A. 初中数学 (SM) — 需补充的模块

> ⚠️ **重要**: 以下列表是初步估计，基于有缺陷的审查脚本。Sprint 0.5 验证后，请删除已确认完整的模块。
> 实际需要修复的模块数量可能比此列表少 30-40%。

- [-] 2A.1 SM1.01 几何基础 (438行)
  - 当前: ~9题，slice模式
  - 目标: 3 stages × 4 difficulties × 5 = 60题
  - 方法: 扩展 `all` 数组为独立的 stageXDifficultyY 数据池
  - 参考: GM1.01 的数据池结构
  - **同时**: 迁移 i18n 到 `useLanguage()`

- [ ] 2A.2 SM1.02 代数基础 (632行)
  - 当前: 使用 else-if 链，先验证实际题量
  - 方法: `grep -c "quests.push" src/app/chamber/sm1-02/page.tsx`
  - 如果每难度 < 5 题，补充到 5 题
  - **同时**: 迁移 i18n、改进 LaTeX

- [ ] 2A.3 SM1.05 比例与百分比 (636行)
  - 同 SM1.02，先验证再决定是否补充
  - **同时**: 迁移 i18n

- [ ] 2A.4 SM2.03 函数 (330行)
  - 当前: 小数据池
  - 目标: 60题
  - 补充方法同 2A.1
  - **同时**: 迁移 i18n

- [ ] 2A.5 SM2.04 相似形 (313行)
  - 当前: ~7题，缺ELITE
  - 补充到 60题

- [ ] 2A.6 SM2.06 方程组 (254行)
  - 当前: 小数据池，缺ELITE
  - 补充到 60题

- [ ] 2A.7 SM2.07 坐标几何 (406行)
  - 当前: ~7题
  - 补充到 60题

- [ ] 2A.8 SM2.10 数据分析 (302行)
  - 当前: ~3题，缺ELITE
  - 补充到 60题

- [ ] 2A.9 SM3.02 三角学 (538行)
  - 需验证题量

- [ ] 2A.10 SM3.04 对数应用 (361行)
  - 小数据池，补充

- [ ] 2A.11 SM3.05 3D几何 (402行)
  - ~5题，补充

- [ ] 2A.12 Checkpoint SM
  - 所有 SM 模块每 Stage × Difficulty 有 5 题
  - `npm run build` 通过
  - `git add -A && git commit -m "feat(math): complete question pools for SM modules" && git push`

#### 2B. 初中物理 (SP) — 需补充的模块

> ⚠️ **重要**: 以下列表是初步估计。Sprint 0.5 验证后，请删除已确认完整的模块。

- [ ] 2B.1 SP3.01 测量与单位 (335行) — 补充到60题
- [-] 2B.2 SP3.02 牛顿定律 (163行) — 骨架模块,需大量补充
- [ ] 2B.3 SP3.03 能量 (157行) — 骨架模块,需大量补充
- [ ] 2B.4 SP3.04 压强 (164行) — 骨架模块,需大量补充
- [ ] 2B.5 SP3.05 简单机械 (343行) — 补充到60题
- [ ] 2B.6 SP3.06 声学 (689行) — 验证, 可能已足够(动态生成)
- [ ] 2B.7 SP3.07 (303行) — 检查内容,确定是否需要补充
- [ ] 2B.8 SP3.08 几何光学 (309行) — 补充到60题

- [ ] 2B.9 Checkpoint SP
  - `npm run build` 通过
  - `git add -A && git commit -m "feat(physics): complete question pools for SP modules" && git push`

#### 2C. 初中化学 (SC) — 需补充的模块

> ⚠️ **重要**: 以下列表是初步估计。Sprint 0.5 验证后，请删除已确认完整的模块。

- [ ] 2C.1 SC1.01 元素周期表 (263行) — 补充到60题
- [ ] 2C.2 SC1.02 化学计量 (448行) — 验证题量
- [ ] 2C.3 SC2.02 滴定 (243行) — 补充到60题
- [ ] 2C.4 SC3.01 药物化学 (276行) — 补充到60题
- [ ] 2C.5 SC3.02 烃类 (349行) — 补充到60题
- [ ] 2C.6 SC3.03 有机反应 (357行) — 补充到60题
- [ ] 2C.7 SC3.04 官能团 (334行) — 补充到60题

- [ ] 2C.8 Checkpoint SC
  - `npm run build` 通过
  - `git add -A && git commit -m "feat(chemistry): complete question pools for SC modules" && git push`

#### 2D. 初中生物 (SB) — 需补充的模块

> ⚠️ **重要**: 以下列表是初步估计。Sprint 0.5 验证后，请删除已确认完整的模块。

- [ ] 2D.1 SB1.01 细胞结构 (284行) — 补充到60题
- [ ] 2D.2 SB1.01-M 细胞代谢 (288行) — 补充到60题
- [ ] 2D.3 SB1.02 光合作用 (366行) — 补充到60题
- [ ] 2D.4 SB1.03 细胞分裂 (323行)
  - 当前实际: MITOSIS 有 2 题(BASIC/CORE) 或 4 题(ADV/ELITE)
  - 目标: 每难度5题，需要独立的数据池而非 `isAdvanced` 开关
  - 需要: 将 `const scenarios = isAdvanced ? [...] : [...]` 改为 `switch(difficulty)` + 各5题
- [ ] 2D.5 SB2.01-tissues 组织器官 (495行) — 补充到60题
- [ ] 2D.6 SB2.03 遗传学 (280行) — 补充到60题
- [ ] 2D.7 SB3.01 生态系统 (316行) — 补充到60题

- [ ] 2D.8 Checkpoint SB
  - `npm run build` 通过
  - `git add -A && git commit -m "feat(biology): complete question pools for SB modules" && git push`

---

### Sprint 3: 修复高中模块 (Gymnasium) 题目 + i18n + LaTeX

> ⚠️ **重要**: 同 Sprint 2，只修复 Sprint 0.5 确认缺题的模块。每个模块同时补题目 + 迁移 i18n + 改进 LaTeX。
> 以下列表是初步估计，Sprint 0.5 验证后请删除已确认完整的模块。

- [ ] 3.1 GM4.01 复数 (385行) — 当前~21/60，严重不足 + 迁移 i18n
- [ ] 3.2 GP2.01 热力学-理想气体 (303行) — ~3题，缺ELITE + 迁移 i18n
- [ ] 3.3 GP2.02 热力学-第一定律 (302行) — ~3题，缺ELITE + 迁移 i18n
- [ ] 3.4 EM1.01 (217行) — 只1个Stage，数据极少
- [ ] 3.5 EM2.01 矩阵 (355行) — 稀疏 + 迁移 i18n
- [ ] 3.6 GB1.01 进化 (383行) — 稀疏 + 迁移 i18n
- [ ] 3.7 GB2.01 神经生物学 (376行) — 稀疏
- [ ] 3.8 GB3.01 遗传学进阶 (291行) — 稀疏
- [ ] 3.9 GB3.02 免疫学 (303行) — 稀疏 + 迁移 i18n
- [ ] 3.10 GC1.01 电化学基础 (237行) — 稀疏 + 迁移 i18n
- [ ] 3.11 GC1.02 电镀与腐蚀 (336行) — 稀疏 + 迁移 i18n
- [ ] 3.12 GC2.01 热化学 (221行) — 稀疏 + 迁移 i18n
- [ ] 3.13 GC3.01 化学平衡 (210行) — 稀疏 + 迁移 i18n
- [ ] 3.14 GC3.02 晶体 (226行) — 稀疏 + 迁移 i18n

- [ ] 3.15 Checkpoint Gymnasium
  - `npm run build` 通过
  - `git add -A && git commit -m "feat: complete question pools for Gymnasium modules" && git push`

---

### Sprint 4: 收尾验证

- [ ] 4.1 全量构建
  - `npm run build` 通过, 0 errors
  - `npm run lint` 无新增 error

- [ ] 4.2 运行最终审查
  - `bash scripts/deep-audit.sh` — 全部模块 status 为 ✅ ALL-4

- [ ] 4.3 三语浏览器验证（抽查 10 个模块）
  - EN: 所有文本英文
  - CN: difficulty 显示"基础/核心/进阶/精英"
  - DE: difficulty 显示"BASIS/KERN/ERWEITERT/ELITE"

- [ ] 4.4 单模块质量检查清单（每个修改过的模块必须通过）
  - [ ] 每个难度有 5 道题？
  - [ ] 难度递进是概念深度而非数量？
  - [ ] 场景描述详细完整（150-250词）？
  - [ ] 三语翻译完整（EN/CN/DE）？
  - [ ] 中文 difficulty 显示"基础/核心/进阶/精英"？
  - [ ] 所有数学公式使用 LaTeX 渲染？
  - [ ] 可视化自动缩放，所有内容可见？
  - [ ] 标签不与线和轴重叠？
  - [ ] 使用 `useLanguage()` hook？
  - [ ] 在浏览器中测试过所有语言？
  - [ ] `npm run build` 通过？

- [ ] 4.5 更新文档
  - 更新 `CURRICULUM_PLAN_UPDATE_2026_v2.md`
  - 更新 `DEVELOPMENT_STATUS_2026-02-15.md`

- [ ] 4.6 最终提交
  - `git add -A && git commit -m "feat: complete all module question pools - phase 1" && git push`

---

## ⚠️ 补充题目时的具体操作模板

### 模板 A: 对于使用 `isAdvanced` 二值分支的模块（如 SB1.03）

把这种：
```typescript
const scenarios = isAdvanced ? [
    { phase: "Prophase", answer: "46" },
    { phase: "Metaphase", answer: "46" },
    { phase: "Anaphase", answer: "92" },
    { phase: "Telophase", answer: "46" }
] : [
    { phase: "Prophase", answer: "46" },
    { phase: "Metaphase", answer: "46" }
];
```

改为这种（每难度恰好5题）：
```typescript
let scenarios;
switch (difficulty) {
    case "BASIC":
        scenarios = [
            { phase: "Prophase", answer: "46", hint: "..." },
            { phase: "Metaphase", answer: "46", hint: "..." },
            // ... 共5题，直接观察型
        ];
        break;
    case "CORE":
        scenarios = [
            // 5题，需要计算
        ];
        break;
    case "ADVANCED":
        scenarios = [
            // 5题，含条件判断
        ];
        break;
    case "ELITE":
        scenarios = [
            // 5题，综合策略
        ];
        break;
}
```

### 模板 B: 对于 all 数组 + slice 模式的模块（如 SM1.01）

把这种：
```typescript
const all: Quest[] = [q1, q2, q3, q4, q5, q6, q7, q8, q9];
if (difficulty === "BASIC") return all.slice(0, 2);
if (difficulty === "CORE") return all.slice(0, 5);
return all;
```

改为这种：
```typescript
const basic: Quest[] = [b1, b2, b3, b4, b5];  // 5题
const core: Quest[] = [c1, c2, c3, c4, c5];    // 5题
const adv: Quest[] = [a1, a2, a3, a4, a5];     // 5题
const elite: Quest[] = [e1, e2, e3, e4, e5];   // 5题

switch (difficulty) {
    case "BASIC": return basic;
    case "CORE": return core;
    case "ADVANCED": return adv;
    case "ELITE": return elite;
    default: return basic;
}
```

### 模板 C: i18n 迁移（当修改模块时同时执行）

把这种：
```typescript
import { translations } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
// ...
const { currentLanguage } = useAppStore();
const t = translations[currentLanguage]?.sm1_01 || translations.EN.sm1_01;
// 使用: t.title, t.stages.areas
```

改为这种：
```typescript
import { useLanguage } from "@/lib/i18n";
// ...
const { t } = useLanguage();
// 使用: t("sm1_01.title"), t("sm1_01.stages.areas")
```

---

## 📊 工作量估算

| Sprint | 模块数 | 新增题目(估) | 附加工作 | 预计时间 |
|--------|--------|-------------|---------|----------|
| Sprint 0 | 0(修复) | 0 | 首页链接 | 1小时 |
| Sprint 0.5 | 0(验证) | 0 | 审查脚本+手动确认 | 2-3小时 |
| Sprint 1 | 4(验证) | 0 | 浏览器测试 | 2小时 |
| Sprint 1.5 | ~5(快速) | ~75题 | 只加ELITE | 1天 |
| Sprint 2A | ~8(SM) | ~400题 | +i18n+LaTeX+翻译 | 3-4天 |
| Sprint 2B | ~6(SP) | ~300题 | +i18n+LaTeX+翻译 | 2-3天 |
| Sprint 2C | ~6(SC) | ~300题 | +i18n+LaTeX+翻译 | 2-3天 |
| Sprint 2D | ~5(SB) | ~250题 | +i18n迁移+翻译 | 2-3天 |
| Sprint 3 | ~12(G*) | ~600题 | +i18n+LaTeX+翻译 | 4-5天 |
| Sprint 4 | 0(验证) | 0 | 质量检查 | 半天 |
| **总计** | **~46模块** | **~1925题** | **43 i18n迁移** | **~15-20天** |
| **实际预计** | **~30模块** | **~1200题** | **~30 i18n迁移** | **~10-14天** |

## Notes

- **执行顺序**: Sprint 0 → 0.5 → 1 → 1.5 → 2A-2D → 3 → 4
- **Sprint 0.5 是关键**: 它决定了 Sprint 1.5/2/3 的实际工作量
- **Sprint 1.5 建立信心**: 先做最简单的模块，快速看到成果
- Sprint 2 的四个子项 (2A-2D) 可以并行
- Sprint 3 可以在 Sprint 2 之后或部分并行
- **渐进式验证**: 每修完 1 个模块就立即 build+浏览器测试，不要等整个学科做完
- 每完成 3-5 个模块 commit + push
- 如果另一个AI已经修复了某些模块（如 sb2-02-body-systems），跳过该模块
- **每个模块修复时同时做 3 件事**: 补题目 + 迁移 i18n + 改进 LaTeX
- 请参考 `CHAMBER_MODULE_STANDARDS.md` (1667行) 获取完整的设计标准和反例分析
