# Implementation Plan: Critical Modules Phase 1

## ⚠️ 关键规范（必读，不可绕过）

**在开始任何任务之前，必须阅读并遵守以下规范：**

### 技术栈（以实际版本为准）
- **Next.js 16.1.5** (非 14)、**React 19.2.3** (非 18)、**Tailwind CSS 4.1.18** (非 v3)
- **TypeScript strict mode**、**Zustand** (状态管理)、**Framer Motion** (动画)
- **react-katex** (数学公式)、**SVG** (2D 可视化，优先于 Canvas)

### i18n 模式（两种共存，使用正确的一种）
项目中存在两种 i18n 访问模式。**新模块统一使用 `useLanguage()` 模式**：

```typescript
// ✅ 正确 — 新模块使用这种模式（参考 sb1-03/page.tsx, sb2-01-tissues/page.tsx, gb2-01/page.tsx）
import { useLanguage } from "@/lib/i18n";
const { t } = useLanguage();
// 使用: t("gm1_02.title"), t("gm1_02.scenarios.stage_1"), t("gm1_02.prompts.hint", { param: "value" })

// ❌ 错误 — 不要使用旧模式（尽管 gm1-01 等旧模块使用了这种）
import { translations } from "@/lib/i18n";
const t = translations[currentLanguage].gm1_02;
```

### 翻译文件位置
- 数学: `src/lib/i18n/{en,cn,de}/math.ts` (当前 EN 约 1746 行)
- 化学: `src/lib/i18n/{en,cn,de}/chemistry.ts` (当前 EN 约 1033 行)
- 物理: `src/lib/i18n/{en,cn,de}/physics.ts` (当前 EN 约 423 行)

### useQuestManager 默认 tolerance = 0.1（非 0.01）
```typescript
// src/hooks/useQuestManager.ts 第 45 行: tolerance = 0.1
// 如需更高精度，在 useQuestManager 调用时传入 tolerance: 0.01
```

### 难度概念深度递进（非数量递进）
- **BASIC**: 直接观察、单步计算、整数
- **CORE**: 组合概念、多步计算、需要纸笔
- **ADVANCED**: 条件问题、小数/分数、完整过程
- **ELITE**: 综合策略、深入理解、多种方法

### 每 Stage × 每 Difficulty = 5 道题
所有新模块必须每个 Stage 的每个 Difficulty 有恰好 **5 道题**。

---

## Tasks

### Sprint 0: 首页修复（最先做，最简单）

- [x] 0.1 添加遗漏模块到首页
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
  - 在 `src/lib/i18n/{en,cn,de}/` 的对应翻译文件中，添加首页所需的 `home.gp2_02_title`, `home.gp2_02_subtitle`, `home.sc1_05_title`, `home.sc1_05_subtitle`, `home.sc3_05_title`, `home.sc3_05_subtitle` 翻译键
  - 确认方法: 运行 `npm run build`，浏览器中检查首页新链接

- [x] 0.2 解决 SB2.02 重复问题
  - 检查 `src/app/chamber/sb2-02/page.tsx` 与 `src/app/chamber/sb2-02-body-systems/page.tsx` 内容差异
  - 在首页 `src/app/page.tsx` 中确认 `sb2_02` 条目只出现一次
  - 如果 `sb2-02-body-systems` 是正式版本，确保首页 href 指向 `/chamber/sb2-02-body-systems`
  - 如果 `sb2-02` 是正式版本，删除或重定向 `sb2-02-body-systems`
  - 确认方法: `grep -c "sb2.02\|sb2-02" src/app/page.tsx` 只返回 1

- [x] 0.3 检查 SP3.07 内容
  - 查看 `src/app/chamber/sp3-07/page.tsx` 确认这个模块是什么内容
  - 检查翻译是否存在: `grep "sp3_07" src/lib/i18n/en/physics.ts`
  - 如果是有效模块，添加到首页
  - 如果是空壳或废弃模块，记录在 CURRICULUM_PLAN_UPDATE_2026_v2.md 中
  - 确认方法: 浏览器访问 `/chamber/sp3-07`，功能正常

- [-] 0.4 Checkpoint Sprint 0
  - 运行 `npm run build` 通过
  - 浏览器检查首页：GP2.02, SC1.05, SC3.05 链接可见且可点击
  - SB2.02 只有一个条目
  - `git add -A && git commit -m "fix: add missing modules to homepage, resolve SB2.02 duplication" && git push`

---

### Task 1: GM1.02 积分模块 (P0 Priority)

**参考模块**: `src/app/chamber/gm1-01/page.tsx` (584行, 导数模块 — 直接姐妹模块)
**可视化参考**: `src/components/chamber/gm1-01/DerivativeCanvas.tsx`
**翻译参考**: `src/lib/i18n/en/math.ts` 中 `gm1_01` section (第 113 行起)

- [ ] 1.1 创建 GM1.02 页面结构
  - 创建 `src/app/chamber/gm1-02/page.tsx`
  - **直接复制 `gm1-01/page.tsx` 的结构**，然后修改：
    - Stage 改为: `"ANTIDERIVATIVE" | "DEFINITE_INTEGRAL" | "APPLICATION"`
    - Quest 接口: 添加 `functionCoeffs`, `lowerBound`, `upperBound`, `integrationConstant` 字段
    - `round2` 工具函数保留
  - **使用 `useLanguage()` 模式**（不是旧的 `translations[currentLanguage]`）
  - import 列表参考 `sb1-03/page.tsx`:
    ```typescript
    import { useLanguage } from "@/lib/i18n";
    import ChamberLayout from "@/components/layout/ChamberLayout";
    import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
    import { AnimatePresence, motion } from "framer-motion";
    import { BlockMath, InlineMath } from "react-katex";
    import "katex/dist/katex.min.css";
    ```
  - 使用 `useCallback` 包裹 `buildStagePool` 以避免 quest 重新生成
  - 数据池（每个 Stage × 每个 Difficulty = 5 题）:

  **ANTIDERIVATIVE (不定积分) 阶段**:
  - BASIC: 基本幂函数 ∫x^n dx (n=1,2,3,4,5)
  - CORE: 系数幂函数 ∫ax^n dx, 多项式 ∫(x²+3x+1)dx
  - ADVANCED: 三角函数 ∫sin(x)dx, ∫cos(x)dx, 指数函数 ∫e^x dx
  - ELITE: 复合函数, 部分分式

  **DEFINITE_INTEGRAL (定积分) 阶段**:
  - BASIC: 简单区间 ∫₀¹ x dx, ∫₀² x² dx
  - CORE: 负区间, 对称区间 ∫₋₁¹ x² dx
  - ADVANCED: 三角/指数定积分, ∫₀^π sin(x)dx
  - ELITE: 复杂区间, 分段函数

  **APPLICATION (应用) 阶段**:
  - BASIC: 直线下面积
  - CORE: 抛物线下面积, 两曲线间面积
  - ADVANCED: 旋转体体积 (圆盘法)
  - ELITE: 综合应用 (功, 位移)

- [ ] 1.2 创建 GM1.02 可视化组件
  - 创建 `src/components/chamber/gm1-02/IntegralVisualization.tsx`
  - **参考 `DerivativeCanvas.tsx` 的 SVG 结构**
  - 必须实现:
    - 函数曲线绘制 (使用 polyline 或 path)
    - 定积分时显示着色区域 (使用 SVG `<polygon>` 或 `<path>` 填充半透明色)
    - 坐标轴 + 网格线
    - 积分上下界标注 (竖直虚线)
    - 面积数值显示
  - **动态缩放**: 使用 `useMemo` 计算 bounds，padding = 50%
  - **不使用 Math.random()**: render 中禁止不纯函数
  - props 接口:
    ```typescript
    interface IntegralVisualizationProps {
      quest: IntegralQuest | null;
      inputs: Record<string, string>;
      checkStatus: { ok: boolean; correct: string } | null;
    }
    ```

- [ ] 1.3 添加 GM1.02 三语翻译
  - 在 `src/lib/i18n/en/math.ts` 的 export 对象中添加 `gm1_02` section
  - 在 `src/lib/i18n/cn/math.ts` 的 export 对象中添加 `gm1_02` section
  - 在 `src/lib/i18n/de/math.ts` 的 export 对象中添加 `gm1_02` section
  - 在 `src/app/page.tsx` 首页模块列表中添加 GM1.02 条目
  - **翻译键结构** (精确参照 `gm1_01` 的 key 名称):
    ```typescript
    gm1_02: {
        back: "Back to Nexus",
        title: "GM1.02 // Integral Calculus",
        difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
        stages: {
            antiderivative: "ANTIDERIVATIVE",
            definite_integral: "DEFINITE INTEGRAL",
            application: "APPLICATION"
        },
        scenarios: {
            antiderivative: "...(150-250 words, Basel context)...",
            definite_integral: "...(150-250 words, Basel context)...",
            application: "...(150-250 words, Basel context)..."
        },
        prompts: {
            find_antiderivative: "Find the antiderivative F(x) of f(x) = {expr}.",
            evaluate_integral: "Evaluate the definite integral: {expr}.",
            find_area: "Find the area under f(x) = {expr} from x = {a} to x = {b}.",
            hint_power: "For x^n, the antiderivative is x^(n+1)/(n+1) + C.",
            hint_definite: "F(b) - F(a) where F is the antiderivative.",
            hint_area: "The area equals the definite integral when f(x) ≥ 0."
        },
        check: "Verify",
        next: "Next Challenge",
        correct: "Integration Verified",
        incorrect: "Check your calculation",
        ready: "Ready",
        monitor_title: "GM1.02_INTEGRAL_MONITOR",
        footer_left: "GM1.02_INTEGRAL // NODE: BASEL",
    }
    ```
  - **CN 翻译示例** (difficulty 必须翻译):
    ```typescript
    difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
    stages: { antiderivative: "不定积分", definite_integral: "定积分", application: "积分应用" },
    ```
  - **DE 翻译示例**:
    ```typescript
    difficulty: { basic: "BASIS", core: "KERN", advanced: "ERWEITERT", elite: "ELITE" },
    stages: { antiderivative: "STAMMFUNKTION", definite_integral: "BESTIMMTES INTEGRAL", application: "ANWENDUNG" },
    ```
  - **场景要求** (每个 150-250 词，Basel 语境):
    - antiderivative 场景: Roche 制药实验室中药物浓度随时间变化的积分
    - definite_integral 场景: 巴塞尔莱茵河水流量在特定时间段内的总流量累计
    - application 场景: Novartis 新园区建筑曲面屋顶的面积计算

- [ ] 1.4 Checkpoint GM1.02
  - `npm run build` 通过
  - 浏览器访问 `/chamber/gm1-02`
  - 切换 EN/CN/DE 三种语言，确认：
    - 标题显示正确语言
    - difficulty 标签翻译正确（CN 显示"基础/核心/进阶/精英"）
    - 场景描述为对应语言
    - LaTeX 公式渲染正常（不显示原始代码）
  - 测试 BASIC/CORE/ADVANCED/ELITE 各5题都能验证
  - 可视化：曲线 + 着色区域 + 坐标轴正常显示
  - `git add -A && git commit -m "feat: add GM1.02 Integral Calculus module" && git push`

---

### Task 2: SC2.05 酸碱化学模块 (P0 Priority)

**参考模块**: `src/app/chamber/sc2-01/page.tsx` (306行, 反应动力学 — 同系列化学模块)
**翻译参考**: `src/lib/i18n/en/chemistry.ts` 中 `sc2_01` section (第 509 行起)

- [ ] 2.1 创建 SC2.05 页面结构
  - 创建 `src/app/chamber/sc2-05/page.tsx`
  - **参考 `sc2-01/page.tsx` 的结构**
  - Stage: `"PH_BASICS" | "NEUTRALIZATION" | "TITRATION"`
  - Quest 接口: 添加 `substance`, `concentration`, `volume`, `pH`, `reactionType` 字段
  - **使用 `useLanguage()` 模式**
  - 数据池（每个 Stage × 每个 Difficulty = 5 题）:

  **PH_BASICS (pH 基础) 阶段**:
  - BASIC: 强酸/强碱直接 pH 计算 (pH = -log[H⁺])，整数浓度
  - CORE: 弱酸/弱碱 pH，缓冲溶液初步
  - ADVANCED: 多元酸 pH，Henderson-Hasselbalch 方程
  - ELITE: 复杂缓冲体系，稀释效应

  **NEUTRALIZATION (中和反应) 阶段**:
  - BASIC: 强酸 + 强碱 → 盐 + 水，直接摩尔计算
  - CORE: 过量酸/碱的 pH 计算
  - ADVANCED: 弱酸 + 强碱，等当点 pH ≠ 7
  - ELITE: 多步中和，混合酸碱

  **TITRATION (滴定) 阶段**:
  - BASIC: 已知浓度求体积 (C₁V₁ = C₂V₂)
  - CORE: 滴定曲线关键点识别
  - ADVANCED: 弱酸滴定曲线分析，半当量点
  - ELITE: 多元酸滴定，指示剂选择

- [ ] 2.2 创建 SC2.05 可视化组件
  - 创建 `src/components/chamber/sc2-05/AcidBaseVisualization.tsx`
  - 必须实现:
    - **pH 刻度条** (0-14 渐变色条: 红→黄→绿→蓝→紫)
    - 当前 pH 指示器（三角形或指针）
    - **滴定曲线** (PH_BASICS/NEUTRALIZATION 阶段用 pH 刻度条, TITRATION 阶段用曲线)
    - 分子结构示意 (H₃O⁺ / OH⁻ 示意图)
    - 颜色编码: pH < 7 红色系, pH = 7 绿色, pH > 7 蓝色系
  - **使用 SVG**，不用 Canvas
  - 动态缩放 + 50% padding

- [ ] 2.3 添加 SC2.05 三语翻译
  - 在 `src/lib/i18n/{en,cn,de}/chemistry.ts` 中添加 `sc2_05` section
  - 在 `src/app/page.tsx` 首页模块列表中添加 SC2.05 条目（化学部分，SC2.04 之后）
  - **翻译键结构** (参照 `sc2_01`):
    ```typescript
    sc2_05: {
        back: "Back to Nexus",
        title: "SC2.05 // Acid-Base Chemistry",
        difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
        stages: {
            ph_basics: "PH FUNDAMENTALS",
            neutralization: "NEUTRALIZATION",
            titration: "TITRATION ANALYSIS"
        },
        scenarios: {
            ph_basics: "...(150-250 words)...",
            neutralization: "...(150-250 words)...",
            titration: "...(150-250 words)..."
        },
        prompts: { ... },
        labels: { acid: "Acid", base: "Base", salt: "Salt", water: "Water", ph: "pH", concentration: "Concentration" },
        check: "Verify", next: "Next Challenge",
        correct: "Reaction Verified", incorrect: "Check equilibrium",
        ready: "Ready",
        monitor_title: "SC2.05_ACIDBASE_MONITOR",
        footer_left: "SC2.05_ACIDBASE // NODE: BASEL",
    }
    ```
  - **场景要求** (Basel 语境):
    - ph_basics: Novartis 药物制剂的 pH 控制（胃酸 pH 1.5, 血液 pH 7.4, 药物稳定性）
    - neutralization: Basel 大学医院 (Universitätsspital) 的胃酸中和治疗
    - titration: Roche 质控实验室的药物纯度滴定分析

- [ ] 2.4 Checkpoint SC2.05
  - 同 1.4 的检查方法
  - 额外检查: pH 颜色编码正确 (pH 3 → 红, pH 7 → 绿, pH 11 → 蓝)
  - `git add -A && git commit -m "feat: add SC2.05 Acid-Base Chemistry module" && git push`

---

### Task 3: GP3.01 波动物理模块 (P1 Priority)

**参考模块**: `src/app/chamber/sp3-06/page.tsx` (声学模块 — 波动概念最接近)
**翻译参考**: `src/lib/i18n/en/physics.ts` 中 `sp3_06` section

- [ ] 3.1 创建 GP3.01 页面结构
  - 创建 `src/app/chamber/gp3-01/page.tsx`
  - Stage: `"WAVE_PROPERTIES" | "SUPERPOSITION" | "OPTICS"`
  - Quest 接口: `amplitude`, `frequency`, `wavelength`, `velocity`, `medium`, `waveType`
  - **使用 `useLanguage()` 模式**
  - 数据池（每个 Stage × 每个 Difficulty = 5 题）:

  **WAVE_PROPERTIES (波的性质) 阶段**:
  - BASIC: v = fλ 直接计算，已知两个求第三个
  - CORE: 波的周期 T = 1/f，波在不同介质中的速度变化
  - ADVANCED: 多普勒效应，波的已知叠加
  - ELITE: 德布罗意波长，波-粒二象性

  **SUPERPOSITION (叠加与干涉) 阶段**:
  - BASIC: 相同频率波的叠加（相长干涉、相消干涉）
  - CORE: 驻波节点和腹节点位置
  - ADVANCED: 双缝干涉条纹间距 Δy = λL/d
  - ELITE: 薄膜干涉，牛顿环

  **OPTICS (波光学) 阶段**:
  - BASIC: 光的反射/折射定律 (n₁sinθ₁ = n₂sinθ₂)
  - CORE: 全内反射临界角
  - ADVANCED: 单缝衍射极小位置
  - ELITE: 光栅方程 d·sinθ = mλ

- [ ] 3.2 创建 GP3.01 可视化组件
  - 创建 `src/components/chamber/gp3-01/WaveVisualization.tsx`
  - 必须实现:
    - **动画波形** (使用 `framer-motion` 的 `useAnimationFrame` 或 `requestAnimationFrame`)
    - 振幅/波长/频率标注
    - 叠加阶段: 两个波 + 合成波
    - 光学阶段: 光路图 (入射/反射/折射)
  - **使用 SVG**
  - ⚠️ 动画中**不使用 Math.random()**: 使用确定性函数 `Math.sin(t * frequency * 2π)`
  - **不要使用 Canvas API**: 项目标准是 SVG

- [ ] 3.3 添加 GP3.01 三语翻译
  - 在 `src/lib/i18n/{en,cn,de}/physics.ts` 中添加 `gp3_01` section
  - 在 `src/app/page.tsx` 首页模块列表中添加 GP3.01 条目
  - **场景要求** (Basel 语境):
    - wave_properties: 莱茵河水面波浪分析（Rheinschifffahrt 航运安全）
    - superposition: Basel 音乐厅 (Stadtcasino) 音响设计中的声波干涉
    - optics: CERN-Basel 合作项目中的激光干涉仪校准

- [ ] 3.4 Checkpoint GP3.01
  - 同 1.4
  - 额外检查: 波动画流畅 (60fps)，无闪烁
  - `git add -A && git commit -m "feat: add GP3.01 Wave Physics module" && git push`

---

### Task 4: SC2.06 氧化还原模块 (P1 Priority)

**参考模块**: `src/app/chamber/gc1-01/page.tsx` (电化学基础 — 概念相关)
**翻译参考**: `src/lib/i18n/en/chemistry.ts`

- [ ] 4.1 创建 SC2.06 页面结构
  - 创建 `src/app/chamber/sc2-06/page.tsx`
  - Stage: `"OXIDATION_STATE" | "ELECTRON_TRANSFER" | "ELECTROCHEMISTRY"`
  - Quest 接口: `reactants[]`, `products[]`, `oxidationStates`, `electronsTransferred`, `cellPotential`
  - **使用 `useLanguage()` 模式**
  - 数据池（每个 Stage × 每个 Difficulty = 5 题）:

  **OXIDATION_STATE (氧化态) 阶段**:
  - BASIC: 单质和简单化合物的氧化态 (H₂O, NaCl, Fe₂O₃)
  - CORE: 含多种原子的化合物 (KMnO₄, H₂SO₄)
  - ADVANCED: 过渡金属复杂化合物，分数氧化态概念
  - ELITE: 有机氧化态，氧化态变化追踪

  **ELECTRON_TRANSFER (电子转移) 阶段**:
  - BASIC: 识别氧化剂和还原剂
  - CORE: 配平简单氧化还原方程式（电子得失法）
  - ADVANCED: 酸性/碱性溶液中的半反应
  - ELITE: 歧化反应，复杂配平

  **ELECTROCHEMISTRY (电化学) 阶段**:
  - BASIC: 原电池组成 (阳极/阴极/电解质/盐桥)
  - CORE: 标准电极电位 E°，电池电动势
  - ADVANCED: 能斯特方程 E = E° - (RT/nF)ln(Q)
  - ELITE: 电解定律 (法拉第定律)，工业电解

- [ ] 4.2 创建 SC2.06 可视化组件
  - 创建 `src/components/chamber/sc2-06/RedoxVisualization.tsx`
  - 必须实现:
    - **氧化态变化图**: 原子上方/下方标注氧化态数字 (+3, -2 等)
    - **电子转移箭头**: 弯曲箭头 + e⁻ 标注
    - **原电池示意图** (ELECTROCHEMISTRY 阶段): 阳极/阴极/离子流/电子流
    - 颜色: 氧化 → 红色, 还原 → 蓝色
  - **使用 SVG**

- [ ] 4.3 添加 SC2.06 三语翻译
  - 在 `src/lib/i18n/{en,cn,de}/chemistry.ts` 中添加 `sc2_06` section
  - 在 `src/app/page.tsx` 首页模块列表中添加 SC2.06 条目
  - **场景要求** (Basel 语境):
    - oxidation_state: Novartis 药物合成中活性成分的氧化态变化
    - electron_transfer: Roche 锂电池研发中的正极材料反应
    - electrochemistry: 巴塞尔黄铜制造历史 (Basel Goldschmied) + 现代电镀工艺

- [ ] 4.4 Checkpoint SC2.06
  - 同 1.4
  - `git add -A && git commit -m "feat: add SC2.06 Redox Reactions module" && git push`

---

### Task 5: 全面集成验证

- [ ] 5.1 构建验证
  - `npm run build` 通过, 0 errors
  - `npm run lint` 只有 scripts/ 目录的 warning（不得有新增 error）
  - `npm test -- --ci --passWithNoTests` 全部通过

- [ ] 5.2 浏览器三语言测试（不可跳过）
  - **英文 (EN)**:
    - 访问 GM1.02, SC2.05, GP3.01, SC2.06 四个模块
    - 所有文本英文, LaTeX 渲染正常
    - 所有 4 个难度 × 所有阶段都有 5 题
  - **中文 (CN)** (Cmd+Shift+R 清缓存后切换):
    - difficulty 必须显示 "基础/核心/进阶/精英" (不是 BASIC/CORE/ADVANCED/ELITE)
    - 场景描述必须是中文 (不是英文)
    - stage 名称必须是中文
  - **德文 (DE)** (同样清缓存):
    - difficulty 必须显示 "BASIS/KERN/ERWEITERT/ELITE"
    - 场景描述必须是德文
    - stage 名称必须是德文

- [ ] 5.3 首页最终检查
  - 所有新模块 (GM1.02, SC2.05, GP3.01, SC2.06) 出现在首页
  - 之前遗漏的 (GP2.02, SC1.05, SC3.05) 也出现在首页
  - SB2.02 无重复
  - 所有链接可点击并导航到正确模块

- [ ] 5.4 更新文档
  - 更新 `CURRICULUM_PLAN_UPDATE_2026_v2.md`:
    - 将 GM1.02, SC2.05, GP3.01, SC2.06 标记为 ✅ 已完成
    - 更新模块统计数字
  - `git add -A && git commit -m "feat: complete critical modules phase 1 (GM1.02, SC2.05, GP3.01, SC2.06)" && git push`

---

## ⚠️ 常见错误提醒

1. **不要用 `translations[currentLanguage]` 模式** — 新模块一律用 `useLanguage()` + `t()`
2. **不要忘记 `useCallback` 包裹 `buildStagePool`** — 否则每次输入都会重新生成题目
3. **不要在 render 中用 `Math.random()`** — 会导致 lint error
4. **不要忘记添加首页条目** — 每个新模块都必须在 `page.tsx` 首页列表中
5. **不要假设 tolerance 是 0.01** — 默认是 0.1，需要更高精度时显式传入
6. **不要忘记 CN/DE 的 difficulty 翻译** — 中文必须是"基础/核心/进阶/精英"
7. **每个 Stage × 每个 Difficulty = 恰好 5 道题** — 不是 4 个
8. **场景描述必须 150-250 词** — 包含 Basel 具体地点/机构/数据
9. **npm run build 必须通过才能 commit** — 不要在 build 失败时提交

## Notes

- 标有 `*` 的测试任务已从本次计划移除 — Phase 2 biology 的测试已验证所有框架工作正常
- Sprint 0 (首页修复) 最快最简单，先做
- P0 模块 (GM1.02, SC2.05) 必须在 P1 (GP3.01, SC2.06) 之前完成
- 每个模块完成后立即 commit + push，不要积累
