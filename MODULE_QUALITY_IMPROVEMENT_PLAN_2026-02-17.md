# 📊 模块质量审查报告与分析

> **文档类型**: 分析报告和参考文档（非执行计划）  
> **生成日期**: 2026-02-17  
> **审查范围**: 76个chamber模块  
> **审查标准**: CHAMBER_MODULE_STANDARDS.md  
> **审查方法**: 综合审查脚本 + 手动验证

---

## ⚠️ 重要说明

**本文档是分析报告，不是执行计划！**

- **执行计划请参考**: `.kiro/specs/critical-modules-phase1/tasks.md`
- **本文档用途**: 提供审查数据、模块分类、i18n迁移列表、LaTeX分析等参考信息
- **为什么不作为执行计划**: 
  1. 时间线过长（7-8周），tasks.md 更紧凑（10-14天）
  2. 将 i18n 迁移和 LaTeX 改进分离为独立 Phase，tasks.md 采用更高效的"3合1"模式（补题目+迁移i18n+改进LaTeX同时进行）
  3. 验证步骤不够具体，tasks.md 提供了详细的 grep 命令和验证流程
  4. 部分数据可能不准确（基于有缺陷的审查脚本），tasks.md 强调先验证再修复

**如何使用本文档**:
- 查看模块分类和统计数据
- 参考 i18n 迁移模块列表
- 了解 LaTeX 使用情况
- 查阅 CHAMBER_MODULE_STANDARDS 总结

---

## 📊 审查结果摘要

### 关键发现

**总体状况**:
- 总模块数: **76个**
- ✅ 完整模块 (60题): **11个** (14%)
- ⚠️ 部分完整 (有题目但不足60题): **20个** (26%)
- 🔴 题目严重不足 (<10题): **36个** (47%)
- 📋 非Quest模块 (Sandbox/Layout): **9个** (12%)

**详细分类** (基于 `.kiro/specs/critical-modules-phase1/tasks.md` 审查):

**✅ 题目完整的模块 (11个)**:
- GM1.01, GM1.01-adv, GM1.02*, GM2.01, GM3.01
- SC2.01, SC2.05*
- SM1.03, SM1.04, SM2.08
- SB2.02-body-systems

*注: GM1.02, SC2.05 为新创建模块，需浏览器验证

**⚠️ 部分完整模块 (20个)**:
- SM系列: SM1.01, SM1.02, SM1.05, SM2.01-SM2.07, SM2.10, SM3.01-SM3.05
- GM系列: GM4.01 (严重不足，只有21/60题)
- GP系列: GP2.01, GP2.02, GP3.01*
- SC系列: SC2.06*

*注: GP3.01, SC2.06 为新创建模块，需浏览器验证

**🔴 题目严重不足模块 (36个)**:
- 生物模块 (14个): SB1.01, SB1.01-M, SB1.02, SB1.03, SB2.01-tissues, SB2.02, SB2.03, SB3.01, GB1.01, GB2.01, GB3.01, GB3.02
- 化学模块 (11个): SC1.01, SC1.02, SC2.02, SC3.01-SC3.05, GC1.01, GC1.02, GC2.01, GC3.01, GC3.02
- 物理模块 (8个): SP3.01-SP3.08
- 工程模块 (2个): EM1.01, EM2.01

**主要问题**:
1. **题目数量严重不足**: 36个模块 (47%) 只有2-4个场景，使用 `isAdvanced` 二值开关而非真正的4级难度池
2. **i18n模式过时**: 43个模块 (57%) 仍使用旧的 `translations[currentLanguage]` 模式
3. **LaTeX使用不足**: 57个模块 (75%) LaTeX组件使用不充分
4. **首页展示遗漏**: GP2.02, SC1.05, SC3.05, SP3.07 不在首页
5. **模块重复**: SB2.02 与 SB2.02-body-systems 重复

### ⚠️ 审查方法和发现

**审查来源**:
- Claude 系统性审查 (代码行数分析、静态ID计数)
- Kiro AI 手动验证 (浏览器测试、实际题目计数)
- `bash scripts/deep-audit.sh` 脚本输出
- AI_HANDOVER_SUMMARY.md 历史记录

**三种题目生成模式**:

1. **独立数据数组模式** (最清晰):
```typescript
const stage1DataBasic = [q1, q2, q3, q4, q5];  // 5题
const stage1DataCore = [q1, q2, q3, q4, q5];   // 5题
// ...
switch (difficulty) {
  case "BASIC": return stage1DataBasic;
  case "CORE": return stage1DataCore;
  // ...
}
```

2. **Record 模式** (脚本难检测):
```typescript
const pools: Record<Stage, Record<Difficulty, Quest[]>> = {
  STAGE_1: {
    BASIC: [{ id: "B1", ... }, ...],  // 5题
    CORE: [{ id: "C1", ... }, ...],   // 5题
    // ...
  }
};
```

3. **动态生成模式** (题目数量不明确):
```typescript
const scenarios = isAdvanced ? [s1, s2, s3, s4] : [s1, s2];
// 或
if (isBasic) { quests.push(...) }
else if (isCore) { quests.push(...) }
// ...
```

**关键发现**:
- 模式1和2通常有完整题目池
- 模式3通常题目严重不足（只有2-4个场景）
- 很多模块使用 `isAdvanced` 二值开关而非4级难度

---

## 🎯 改进计划

### Phase 0: 首页修复 + 新模块验证 (P0 - 立即执行)

#### 0.1 首页展示修复

**目标**: 修复首页遗漏的模块链接和重复问题

**需要修复的问题**:
1. GP2.02 不在首页 → 添加到物理区
2. SC1.05 不在首页 → 添加到化学区
3. SC3.05 不在首页 → 添加到化学区
4. SP3.07 不在首页 → 检查内容后决定是否添加
5. SB2.02 与 SB2.02-body-systems 重复 → 确保首页只链接到 body-systems 版本

**操作步骤**:
- [ ] 打开 `src/app/page.tsx`
- [ ] 在物理模块列表中，GP2.01 之后添加 GP2.02
- [ ] 在化学模块列表中，SC1.04 之后添加 SC1.05
- [ ] 在化学模块列表中，SC3.04 之后添加 SC3.05
- [ ] 检查 SP3.07 内容，决定是否添加
- [ ] 确认首页只链接到 `sb2-02-body-systems`，不链接 `sb2-02`
- [ ] 在 `src/lib/i18n/{en,cn,de}/common.ts` 中添加对应的 title/subtitle 翻译
- [ ] 验证: `npm run build` 通过，浏览器检查所有链接

#### 0.2 验证新创建的4个模块

**目标**: 验证 GM1.02, SC2.05, GP3.01, SC2.06 的题目完整性和功能

这些模块在之前由AI创建，但可能还未经过浏览器测试。

**GM1.02 积分模块**:
- [ ] 浏览器访问 `/chamber/gm1-02`
- [ ] 测试 3 个 Stage (ANTIDERIVATIVE, DEFINITE_INTEGRAL, APPLICATION)
- [ ] 测试 4 个 Difficulty，确认各有 5 题
- [ ] 切换 EN/CN/DE 三语，CN difficulty 显示"基础/核心/进阶/精英"
- [ ] LaTeX 公式渲染正常
- [ ] 可视化（函数曲线 + 着色区域）正常

**SC2.05 酸碱化学模块**:
- [ ] 浏览器访问 `/chamber/sc2-05`
- [ ] 测试 PH_BASICS, NEUTRALIZATION, TITRATION 各 Stage
- [ ] 测试 4 难度各 5 题
- [ ] 三语测试
- [ ] pH 颜色编码正确 (pH < 7 红, pH = 7 绿, pH > 7 蓝)

**GP3.01 波动物理模块**:
- [ ] 浏览器访问 `/chamber/gp3-01`
- [ ] 测试 WAVE_PROPERTIES, SUPERPOSITION, OPTICS
- [ ] 波动画流畅 (60fps)、无闪烁
- [ ] 三语测试

**SC2.06 氧化还原模块**:
- [ ] 浏览器访问 `/chamber/sc2-06`
- [ ] 测试 OXIDATION_STATE, ELECTRON_TRANSFER, ELECTROCHEMISTRY
- [ ] 三语测试
- [ ] 氧化态标注正确

**Checkpoint Phase 0**:
- [ ] 所有新模块功能正常
- [ ] 首页链接完整无重复
- [ ] `npm run build` 通过
- [ ] `git add -A && git commit -m "fix: homepage links and verify new modules" && git push`

---

### Phase 1: 紧急修复题目严重不足的模块 (P0 - 1-2周)

**目标**: 修复36个题目严重不足的模块（只有2-4个场景）

**标准**: 每个 Stage × 每个 Difficulty = **恰好 5 道题**

**工作模式**: 对于每个模块：
1. 阅读现有 `page.tsx` 理解当前结构
2. 将 scenarios 数组从 2-4 项扩展到每难度 5 项
3. 将 `isAdvanced` 二值分支改为 4 级 `switch(difficulty)` 分支
4. 在三语翻译文件中添加对应的 prompts/hints
5. `npm run build` 验证
6. 浏览器测试三语

#### 1.1 初中数学 (SM) — 需补充的模块 (11个)

**优先级最高** - Lehrplan 21 必修内容

- [ ] SM1.01 几何基础 (438行) — 当前~9题，扩展到60题
- [ ] SM1.02 代数基础 (632行) — 使用else-if链，先验证实际题量
- [ ] SM1.05 比例与百分比 (636行) — 同SM1.02，先验证
- [ ] SM2.01 方程 (942行) — 复杂结构，需验证覆盖
- [ ] SM2.02 勾股定理 (965行) — 有else-if链，需验证
- [ ] SM2.03 函数 (330行) — 小数据池，补充到60题
- [ ] SM2.04 相似形 (313行) — ~7题，缺ELITE，补充到60题
- [ ] SM2.05 幂运算 (319行) — 有else-if链，需验证
- [ ] SM2.06 方程组 (254行) — 小数据池，缺ELITE，补充到60题
- [ ] SM2.07 坐标几何 (406行) — ~7题，补充到60题
- [ ] SM2.10 数据分析 (302行) — ~3题，缺ELITE，补充到60题
- [ ] SM3.01 指数 (392行) — 部分覆盖~51/80，补充
- [ ] SM3.02 三角学 (538行) — 需验证题量
- [ ] SM3.03 对数 (429行) — 有else-if链，需验证
- [ ] SM3.04 对数应用 (361行) — 小数据池，补充
- [ ] SM3.05 3D几何 (402行) — ~5题，补充到60题

**Checkpoint SM**:
- [ ] 所有 SM 模块每 Stage × Difficulty 有 5 题
- [ ] `npm run build` 通过
- [ ] 浏览器测试三语
- [ ] `git add -A && git commit -m "feat(math): complete question pools for SM modules" && git push`

#### 1.2 初中物理 (SP) — 需补充的模块 (8个)

- [ ] SP3.01 测量与单位 (335行) — 补充到60题
- [ ] SP3.02 牛顿定律 (163行) — 骨架模块，需大量补充
- [ ] SP3.03 能量 (157行) — 骨架模块，需大量补充
- [ ] SP3.04 压强 (164行) — 骨架模块，需大量补充
- [ ] SP3.05 简单机械 (343行) — 补充到60题
- [ ] SP3.06 声学 (689行) — 验证，可能已足够（动态生成）
- [ ] SP3.07 (303行) — 检查内容，确定是否需要补充
- [ ] SP3.08 几何光学 (309行) — 补充到60题

**Checkpoint SP**:
- [ ] `npm run build` 通过
- [ ] `git add -A && git commit -m "feat(physics): complete question pools for SP modules" && git push`

#### 1.3 初中化学 (SC) — 需补充的模块 (7个)

- [ ] SC1.01 元素周期表 (263行) — 补充到60题
- [ ] SC1.02 化学计量 (448行) — 验证题量
- [ ] SC2.02 滴定 (243行) — 补充到60题
- [ ] SC3.01 药物化学 (276行) — 补充到60题
- [ ] SC3.02 烃类 (349行) — 补充到60题
- [ ] SC3.03 有机反应 (357行) — 补充到60题
- [ ] SC3.04 官能团 (334行) — 补充到60题

**Checkpoint SC**:
- [ ] `npm run build` 通过
- [ ] `git add -A && git commit -m "feat(chemistry): complete question pools for SC modules" && git push`

#### 1.4 初中生物 (SB) — 需补充的模块 (7个)

- [ ] SB1.01 细胞结构 (284行) — 补充到60题
- [ ] SB1.01-M 细胞代谢 (288行) — 补充到60题
- [ ] SB1.02 光合作用 (366行) — 补充到60题
- [ ] SB1.03 细胞分裂 (323行) — 将 `isAdvanced` 改为 4 级难度，各5题
- [ ] SB2.01-tissues 组织器官 (495行) — 补充到60题
- [ ] SB2.03 遗传学 (280行) — 补充到60题
- [ ] SB3.01 生态系统 (316行) — 补充到60题

**Checkpoint SB**:
- [ ] `npm run build` 通过
- [ ] `git add -A && git commit -m "feat(biology): complete question pools for SB modules" && git push`

#### 1.5 高中模块 (Gymnasium) — 需补充的模块 (14个)

- [ ] GM4.01 复数 (385行) — **严重不足**，当前~21/60题，需大量补充
- [ ] GP2.01 热力学-理想气体 (303行) — ~3题，缺ELITE
- [ ] GP2.02 热力学-第一定律 (302行) — ~3题，缺ELITE
- [ ] EM1.01 (217行) — 只1个Stage，数据极少
- [ ] EM2.01 矩阵 (355行) — 稀疏
- [ ] GB1.01 进化 (383行) — 稀疏
- [ ] GB2.01 神经生物学 (376行) — 稀疏
- [ ] GB3.01 遗传学进阶 (291行) — 稀疏
- [ ] GB3.02 免疫学 (303行) — 稀疏
- [ ] GC1.01 电化学基础 (237行) — 稀疏
- [ ] GC1.02 电镀与腐蚀 (336行) — 稀疏
- [ ] GC2.01 热化学 (221行) — 稀疏
- [ ] GC3.01 化学平衡 (210行) — 稀疏
- [ ] GC3.02 晶体 (226行) — 稀疏

**Checkpoint Gymnasium**:
- [ ] `npm run build` 通过
- [ ] `git add -A && git commit -m "feat: complete question pools for Gymnasium modules" && git push`

---

### Phase 1 补充题目操作模板

#### 对于使用 `isAdvanced` 二值分支的模块（如 SB1.03）

**❌ 错误模式**:
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

**✅ 正确模式** (每难度恰好5题):
```typescript
let scenarios;
switch (difficulty) {
    case "BASIC":
        scenarios = [
            { phase: "Prophase", answer: "46", hint: "..." },
            { phase: "Metaphase", answer: "46", hint: "..." },
            { phase: "Anaphase", answer: "92", hint: "..." },
            { phase: "Telophase", answer: "46", hint: "..." },
            { phase: "Cytokinesis", answer: "46", hint: "..." }
        ];  // 5题，直接观察型
        break;
    case "CORE":
        scenarios = [/* 5题，需要计算 */];
        break;
    case "ADVANCED":
        scenarios = [/* 5题，含条件判断 */];
        break;
    case "ELITE":
        scenarios = [/* 5题，综合策略 */];
        break;
}
```

#### 对于 all 数组 + slice 模式的模块（如 SM1.01）

**❌ 错误模式**:
```typescript
const all: Quest[] = [q1, q2, q3, q4, q5, q6, q7, q8, q9];
if (difficulty === "BASIC") return all.slice(0, 2);
if (difficulty === "CORE") return all.slice(0, 5);
return all;
```

**✅ 正确模式**:
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

---

### Phase 2: i18n模式迁移 (P1 - 2-3周)

**目标**: 将43个模块从旧的 `translations[currentLanguage]` 模式迁移到新的 `useLanguage()` hook

#### 2.1 需要迁移的43个模块

**数学模块** (18个):
- sm1-01, sm1-02, sm1-05
- sm2-01, sm2-02, sm2-03, sm2-04, sm2-05, sm2-06, sm2-07, sm2-10
- sm3-01, sm3-02, sm3-03, sm3-04, sm3-05
- em2-01
- gm1-01, gm1-01-advanced

**物理模块** (7个):
- sp3-01, sp3-02, sp3-03, sp3-04, sp3-05, sp3-06
- gp2-01, gp2-02

**化学模块** (10个):
- sc1-02, sc2-02
- sc3-01, sc3-02, sc3-03, sc3-04, sc3-05
- gc1-01, gc1-02, gc2-01, gc3-01, gc3-02

**生物模块** (3个):
- gb1-01, gb3-02

**工程模块** (1个):
- gm2-01, gm3-01

**迁移步骤** (参考 SB2.02 的成功经验):
1. 将 `import { translations } from "@/lib/i18n"` 改为 `import { useLanguage } from "@/lib/i18n"`
2. 将 `const t = translations[currentLanguage].module_key` 改为 `const { t } = useLanguage()`
3. 更新所有翻译键引用：`t.title` → `t("module_key.title")`
4. 测试三种语言 (EN/CN/DE)
5. 确认 `npm run build` 通过

**优先级**:
- P0: 数学模块 (学生使用最多)
- P1: 物理和化学模块
- P2: 生物和工程模块

---

### Phase 3: LaTeX改进 (P1 - 并行进行)

#### 3.1 LaTeX使用不足的模块 (57个)

**当前状况**:
- ✅ LaTeX充分 (>5次使用): 9个模块
- ⚠️ LaTeX部分 (1-5次使用): 57个模块
- 🔴 LaTeX缺失 (0次使用): 10个模块

**改进标准**:
- 所有数学公式必须使用 `<InlineMath>` 或 `<BlockMath>`
- 不能显示原始 LaTeX 代码
- 中文/德文文本必须用 `\text{}` 包裹

**示例**:
```typescript
// ❌ 错误
<div>z^{4}</div>
<div>模长变为 r^n，角度变为 n·θ</div>

// ✅ 正确
<InlineMath math="z^{4}" />
<InlineMath math="\text{模长变为 } r^n\text{，角度变为 } n\cdot\theta" />
```

**优先修复**:
- 数学模块 (公式最多)
- 物理模块 (公式较多)
- 化学模块 (化学方程式)

---

### Phase 4: 质量标准全面检查 (P2 - 3-4周)

#### 4.1 CHAMBER_MODULE_STANDARDS 完整检查

**对每个模块检查**:

1. **混合模式**
   - [ ] 使用 `ChamberLayout`
   - [ ] 使用 `useQuestManager`
   - [ ] 有可视化组件

2. **难度系统**
   - [ ] 有 BASIC/CORE/ADVANCED/ELITE 四个难度
   - [ ] 每个难度有 **5道题**
   - [ ] 难度递进是概念深度（不是数量）

3. **国际化**
   - [ ] 支持 EN/CN/DE 三语
   - [ ] 中文 difficulty 显示"基础/核心/进阶/精英"
   - [ ] 德文 difficulty 显示"BASIS/KERN/ERWEITERT/ELITE"
   - [ ] 场景描述有完整翻译 (150-250词)

4. **场景描述**
   - [ ] 包含具体人物/角色
   - [ ] 包含具体地点 (Basel相关)
   - [ ] 包含具体数值和单位
   - [ ] 解释现实意义
   - [ ] 与学生生活连接
   - [ ] 长度 150-250词

5. **可视化**
   - [ ] 直接展示当前题目数据
   - [ ] 使用 LaTeX 渲染公式
   - [ ] 实现自动缩放
   - [ ] 标签不与线和轴重叠
   - [ ] 使用 50% 边距

6. **代码质量**
   - [ ] 使用 `useLanguage()` hook
   - [ ] 使用 `useCallback` 包裹 `buildStagePool`
   - [ ] 答案保留 2 位小数
   - [ ] `npm run build` 通过

#### 4.2 创建自动化检查工具

**改进审查脚本**:
1. 添加 Record 模式检测
2. 精确统计每个难度的题目数量
3. 检查场景描述长度
4. 检查可视化组件存在性
5. 生成详细的HTML报告

---

## 📋 具体执行任务

### Week 1-2: Phase 1 紧急修复

**任务1.1**: 验证45个"空模块"状态
- [ ] 手动检查每个模块的代码结构
- [ ] 识别使用 Record 模式的模块
- [ ] 生成准确的模块状态报告

**任务1.2**: 修复8个部分完整模块
- [ ] sm1-02: 补充 ELITE 难度 (2题 → 5题)
- [ ] sm1-05: 补充 ELITE 难度 (0题 → 5题)
- [ ] sm2-05: 补充 ELITE 难度 (0题 → 5题)
- [ ] sm2-10: 补充所有难度到5题
- [ ] gp2-01: 补充 ELITE 难度 (0题 → 5题)
- [ ] gp2-02: 补充 ELITE 难度 (0题 → 5题)
- [ ] gb2-01: 全面补充题目
- [ ] sp3-07: 全面补充题目

### Week 3-4: Phase 2 i18n迁移 (第一批)

**任务2.1**: 迁移数学模块 (18个)
- [ ] SM系列: sm1-01, sm1-02, sm1-05, sm2-01~sm2-07, sm2-10, sm3-01~sm3-05
- [ ] EM系列: em2-01
- [ ] GM系列: gm1-01, gm1-01-advanced, gm2-01, gm3-01

**验证标准**:
- 浏览器测试 EN/CN/DE 三种语言
- 中文显示"基础/核心/进阶/精英"
- `npm run build` 通过

### Week 5-6: Phase 2 i18n迁移 (第二批) + Phase 3 LaTeX改进

**任务2.2**: 迁移物理和化学模块 (17个)
- [ ] SP系列: sp3-01~sp3-06
- [ ] GP系列: gp2-01, gp2-02
- [ ] SC系列: sc1-02, sc2-02, sc3-01~sc3-05
- [ ] GC系列: gc1-01, gc1-02, gc2-01, gc3-01, gc3-02

**任务3.1**: LaTeX改进 (优先数学模块)
- [ ] 识别所有数学公式
- [ ] 替换为 `<InlineMath>` 或 `<BlockMath>`
- [ ] 测试渲染效果

### Week 7-8: Phase 4 质量标准检查

**任务4.1**: 全面质量检查
- [ ] 运行改进后的审查脚本
- [ ] 生成详细报告
- [ ] 识别不符合标准的模块

**任务4.2**: 修复不符合标准的模块
- [ ] 按优先级修复
- [ ] 每个模块完成后测试
- [ ] 更新文档

---

## 🎯 成功标准

### Phase 1 完成标准
- [ ] 所有模块状态准确分类
- [ ] 8个部分完整模块补充到每个难度5题
- [ ] 生成准确的模块状态报告

### Phase 2 完成标准
- [ ] 43个模块全部迁移到 `useLanguage()` 模式
- [ ] 所有模块通过三语言测试
- [ ] 中文/德文 difficulty 翻译正确

### Phase 3 完成标准
- [ ] 所有数学公式使用 LaTeX 渲染
- [ ] 不显示原始 LaTeX 代码
- [ ] 中文/德文文本正确包裹

### Phase 4 完成标准
- [ ] 所有模块符合 CHAMBER_MODULE_STANDARDS
- [ ] 自动化检查工具完成
- [ ] 生成最终质量报告

---

## 📊 优先级矩阵

| 模块类型 | 题目完整性 | i18n迁移 | LaTeX改进 | 总优先级 | 工作量 |
|:---|:---:|:---:|:---:|:---:|:---:|
| 数学 (SM/GM) | P0 | P0 | P0 | **P0** | ~550题 |
| 物理 (SP/GP) | P0 | P1 | P1 | **P0** | ~400题 |
| 化学 (SC/GC) | P0 | P1 | P1 | **P0** | ~350题 |
| 生物 (SB/GB) | P0 | P2 | P2 | **P1** | ~350题 |
| 工程 (EM) | P1 | P2 | P2 | **P1** | ~100题 |

**总工作量估算**: ~2350题需要补充

---

## � 具体执行任务

### Week 1: Phase 0 首页修复 + 新模块验证

**任务0.1**: 首页展示修复
- [ ] 添加 GP2.02, SC1.05, SC3.05 到首页
- [ ] 检查 SP3.07 内容
- [ ] 解决 SB2.02 重复问题
- [ ] 添加对应的首页翻译键

**任务0.2**: 验证4个新创建模块
- [ ] GM1.02: 验证积分计算和可视化
- [ ] SC2.05: 验证pH计算和颜色编码
- [ ] GP3.01: 验证波动动画和计算
- [ ] SC2.06: 验证氧化态计算

### Week 2-3: Phase 1 初中模块补充 (第一批)

**任务1.1**: 初中数学 (SM) - 16个模块
- [ ] SM1.01, SM1.02, SM1.05
- [ ] SM2.01~SM2.07, SM2.10
- [ ] SM3.01~SM3.05

**任务1.2**: 初中物理 (SP) - 8个模块
- [ ] SP3.01~SP3.08

**验证标准**:
- 每个 Stage × Difficulty 有 5 题
- 浏览器测试 EN/CN/DE 三种语言
- 中文显示"基础/核心/进阶/精英"
- `npm run build` 通过

### Week 4-5: Phase 1 初中模块补充 (第二批) + 高中模块

**任务1.3**: 初中化学 (SC) - 7个模块
- [ ] SC1.01, SC1.02, SC2.02
- [ ] SC3.01~SC3.04

**任务1.4**: 初中生物 (SB) - 7个模块
- [ ] SB1.01, SB1.01-M, SB1.02, SB1.03
- [ ] SB2.01-tissues, SB2.03, SB3.01

**任务1.5**: 高中模块 (G*) - 14个模块
- [ ] GM4.01 (优先，严重不足)
- [ ] GP2.01, GP2.02
- [ ] GB1.01, GB2.01, GB3.01, GB3.02
- [ ] GC1.01, GC1.02, GC2.01, GC3.01, GC3.02
- [ ] EM1.01, EM2.01

### Week 6-7: Phase 2 i18n迁移

**任务2.1**: 迁移数学模块 (18个)
- [ ] SM系列: sm1-01, sm1-02, sm1-05, sm2-01~sm2-07, sm2-10, sm3-01~sm3-05
- [ ] EM系列: em2-01
- [ ] GM系列: gm1-01, gm1-01-advanced, gm2-01, gm3-01

**任务2.2**: 迁移物理和化学模块 (17个)
- [ ] SP系列: sp3-01~sp3-06
- [ ] GP系列: gp2-01, gp2-02
- [ ] SC系列: sc1-02, sc2-02, sc3-01~sc3-05
- [ ] GC系列: gc1-01, gc1-02, gc2-01, gc3-01, gc3-02

**任务2.3**: 迁移生物和工程模块 (8个)
- [ ] SB/GB系列: gb1-01, gb3-02
- [ ] GM系列: gm2-01, gm3-01

### Week 8: Phase 3 LaTeX改进 + Phase 4 质量检查

**任务3.1**: LaTeX改进 (优先数学模块)
- [ ] 识别所有数学公式
- [ ] 替换为 `<InlineMath>` 或 `<BlockMath>`
- [ ] 测试渲染效果

**任务4.1**: 全面质量检查
- [ ] 运行 `bash scripts/deep-audit.sh`
- [ ] 生成详细报告
- [ ] 识别不符合标准的模块

**任务4.2**: 最终验证
- [ ] 全量构建: `npm run build` 通过, 0 errors
- [ ] 三语浏览器验证（抽查 10 个模块）
- [ ] 更新文档
- [ ] 最终提交

---

**报告生成**: 2026-02-17  
**下次更新**: 完成 Phase 1 后  
**负责人**: Kiro AI Assistant


---

## 📊 工作量估算

| Sprint | 模块数 | 新增题目(估) | 预计时间 |
|--------|--------|-------------|---------|
| Phase 0 | 4(验证) + 首页修复 | 0 | 1-2天 |
| Phase 1.1-1.2 | 24(SM+SP) | ~950题 | 3-4天 |
| Phase 1.3-1.4 | 14(SC+SB) | ~700题 | 2-3天 |
| Phase 1.5 | 14(G*+EM) | ~700题 | 2-3天 |
| Phase 2 | 43(i18n迁移) | 0 | 2-3天 |
| Phase 3 | 57(LaTeX) | 0 | 1-2天 |
| Phase 4 | 0(验证) | 0 | 1天 |
| **总计** | **~52模块补充** | **~2350题** | **12-18天** |

---

## 🔧 工具和参考

### 审查脚本
```bash
# 运行最新审查
bash scripts/deep-audit.sh > MODULE_AUDIT_LATEST.txt 2>&1
cat MODULE_AUDIT_LATEST.txt
```

### 快速检查命令
```bash
# 检查特定模块的题目数量
grep -c "quests.push" src/app/chamber/MODULE_NAME/page.tsx

# 检查是否使用 Record 模式
grep "Record<.*Stage.*Record<.*Difficulty" src/app/chamber/MODULE_NAME/page.tsx

# 检查是否使用旧 i18n 模式
grep "translations\[currentLanguage\]" src/app/chamber/MODULE_NAME/page.tsx

# 检查是否使用新 i18n 模式
grep "useLanguage()" src/app/chamber/MODULE_NAME/page.tsx
```

### 参考文档
- `CHAMBER_MODULE_STANDARDS.md` - 模块质量标准（必读）
- `AI_HANDOVER_SUMMARY.md` - 历史工作记录和教训
- `.kiro/specs/critical-modules-phase1/tasks.md` - 详细审查结果
- `.kiro/specs/critical-modules-phase1/design.md` - 技术规范

---

## 📝 更新记录

**2026-02-17 更新**:
- 基于 `.kiro/specs/critical-modules-phase1/tasks.md` 的详细审查结果更新
- 重新分类模块状态：11个完整，20个部分完整，36个严重不足
- 添加 Phase 0: 首页修复 + 新模块验证
- 识别出 4 个新创建模块需要验证 (GM1.02, SC2.05, GP3.01, SC2.06)
- 识别出首页展示遗漏问题 (GP2.02, SC1.05, SC3.05, SP3.07)
- 识别出 SB2.02 重复问题
- 更新工作量估算：~2350题，12-18天
- 添加三种题目生成模式的说明
- 添加补充题目的操作模板

**下次更新**: 完成 Phase 0 后
