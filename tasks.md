# Science Theme Park — AI Handover Task File

> **生成日期**: 2026-02-18  
> **来源**: Claude 系统性审查（代码阅读 + 课程对照 + 历史 tasks.md 汇总）  
> **详细计划**: `.kiro/specs/critical-modules-phase1/tasks.md`（2161行，含完整 Sprint 0-6 记录）  
> **项目路径**: `/Users/zengtao/Doc/My code/science-theme-park`

---

## 🗺️ 项目概览

Science Theme Park 是一个面向 Basel-Stadt 中学生（Lehrplan 21 Zyklus 3 + Gymnasium）的 STEM 互动练习平台。

**技术栈**: Next.js 16.1.5 · React 19.2.3 · TypeScript · Tailwind CSS 4 · Zustand · Framer Motion · react-katex  
**模块总数**: 76 个 chamber 模块（数学/物理/化学/生物/工程）  
**题目标准**: 每模块 3 stages × 4 difficulties × 5 题 = **60 题**

---

## ✅ 已完成工作（Sprint 0–6）

### Sprint 0–4: 题目补充（已完成）
- ✅ SP3.02 牛顿定律：60题完整，i18n EN/CN/DE 完整
- ✅ SP3.03 能量：60题完整，i18n 完整
- ✅ SP3.04 压强：60题完整（PUSH模式验证）
- ✅ SP3.08 几何光学：60题完整，添加 hintLatex
- ✅ GP2.01 热力学-理想气体：60题完整，i18n 迁移完毕
- ✅ GP2.02 热力学-第一定律：60题完整，i18n 迁移完毕
- ✅ GM4.01 复数：60题完整，i18n 已迁移
- ✅ EM1.01：60题完整，i18n 迁移完毕
- ✅ EM2.01 矩阵：60题完整，i18n 迁移完毕
- ✅ GB1.01 进化：60题完整，i18n 迁移完毕
- ✅ GM1.02 积分：已创建，题目完整（需浏览器验证）
- ✅ SC2.05 酸碱化学：已创建，题目完整（需浏览器验证）
- ✅ GP3.01 波动物理：已创建，题目完整（需浏览器验证）
- ✅ SC2.06 氧化还原：已创建（需浏览器验证）
- ✅ SB3.01 生态系统：从 isAdvanced 二值模式扩展为 4 难度

### Sprint 5: i18n 迁移（已完成）
- ✅ 22 个文件完成从 `translations[currentLanguage]` → `useLanguage()` hook 迁移
- ✅ 数学: GM1.01, GM1.01-adv, GM2.01, GM3.01, SM1.02, SM1.05, SM2.02, SM3.03
- ✅ 物理: GP1.03, GP1.04, SP3.01, SP3.05
- ✅ 化学: SC1.04, SC1.05, SC2.02, SC2.03, SC2.04, SC3.05
- ✅ 组件: EntryProtocol, UserSetup, ProfilePage, PythagorasFluidCanvas
- ✅ `npm run build` 通过（0 errors），无任何文件使用旧 i18n 模式

### Sprint 6: 模式转换（已完成）
- ✅ SC1.01, SC2.02, SC3.02, SC3.03, SC3.04 → 结构化数据模式
- ✅ GC1.01, GC2.01, GC3.01, GC3.02, SC3.05, GB3.02 → 小数据池扩充
- ✅ SP3.02, SP3.03, SP3.08, GP2.02 → 物理模块扩充
- ✅ SB1.01, SB1.03, SB2.03 → 生物模块扩充

---

## 🔴 当前已知问题（需要修复）

### 高优先级 — 题目严重不足

以下模块经代码审查确认题目不足，需要补充到标准 60 题：

| 模块 | 文件路径 | 当前状态 | 问题描述 |
|------|---------|---------|---------|
| **SB2.01-tissues** | `chamber/sb2-01-tissues/page.tsx` | 🔴 SPARSE | 只有 5 道题（不区分难度），需扩展为 60 题 |
| **SB2.03** | `chamber/sb2-03/page.tsx` | 🔴 SPARSE | MONOHYBRID 只有 2 题，PROBABILITY 只有 1 题，DIHYBRID 为空 |
| **GB2.01** | `chamber/gb2-01/page.tsx` | ⚠️ PARTIAL | 每难度 3-6 题，需补充到 15 题/难度 |
| **GB3.01** | `chamber/gb3-01/page.tsx` | ⚠️ PARTIAL | 每难度 2-5 题，需补充到 15 题/难度 |
| **GB3.02** | `chamber/gb3-02/page.tsx` | ⚠️ PARTIAL | 每难度 3-6 题，需补充到 15 题/难度 |
| **GC1.02** | `chamber/gc1-02/page.tsx` | ⚠️ PARTIAL | 每难度只有 6 题，需补充到 15 题/难度 |
| **SB1.01-M** | `chamber/sb1-01-metabolic/page.tsx` | ⚠️ PARTIAL | 每难度只有 6 题，需补充到 15 题/难度 |
| **SB1.02** | `chamber/sb1-02/page.tsx` | ⚠️ PARTIAL | 每难度只有 6 题，需补充到 15 题/难度 |
| **SB1.03** | `chamber/sb1-03/page.tsx` | ⚠️ PARTIAL | 每难度只有 6 题，需补充到 15 题/难度 |

### 中优先级 — 需要浏览器验证

以下模块使用 ELSE-IF-CHAIN 或 PUSH(few) 模式，审查脚本无法准确检测题目数，**需要在浏览器中实际测试每个难度**：

| 模块 | 文件路径 | 模式 | 验证方法 |
|------|---------|------|---------|
| SM1.02 | `chamber/sm1-02/page.tsx` | ELSE-IF-CHAIN | 浏览器点击每个难度，确认各有 5 题 |
| SM1.05 | `chamber/sm1-05/page.tsx` | ELSE-IF-CHAIN | 同上 |
| SM2.01 | `chamber/sm2-01/page.tsx` | ELSE-IF-CHAIN | 同上 |
| SM2.02 | `chamber/sm2-02/page.tsx` | PUSH(few) | 同上 |
| SM2.07 | `chamber/sm2-07/page.tsx` | ELSE-IF-CHAIN | 同上 |
| SM2.10 | `chamber/sm2-10/page.tsx` | ELSE-IF-CHAIN | 同上 |
| SM3.03 | `chamber/sm3-03/page.tsx` | ELSE-IF-CHAIN | 同上 |
| SM3.05 | `chamber/sm3-05/page.tsx` | PUSH(few) | 同上 |
| SP3.01 | `chamber/sp3-01/page.tsx` | PUSH(few) | 同上 |
| SP3.04 | `chamber/sp3-04/page.tsx` | PUSH(few) | 同上（已知 60 题，但需确认） |
| SP3.05 | `chamber/sp3-05/page.tsx` | PUSH(few) | 同上 |
| SP3.06 | `chamber/sp3-06/page.tsx` | PUSH(few) | 同上 |
| SC2.06 | `chamber/sc2-06/page.tsx` | ELSE-IF-CHAIN | 同上（新创建） |
| SB2.02-body | `chamber/sb2-02-body-systems/page.tsx` | PUSH(few) | 同上 |
| EM1.01 | `chamber/em1-01/page.tsx` | ELSE-IF-CHAIN | 同上（已完成但需确认） |
| EM2.01 | `chamber/em2-01/page.tsx` | ELSE-IF-CHAIN | 同上 |
| GB1.01 | `chamber/gb1-01/page.tsx` | ELSE-IF-CHAIN | 同上 |
| GP2.01 | `chamber/gp2-01/page.tsx` | ELSE-IF-CHAIN | 同上（已完成但需确认） |
| GP2.02 | `chamber/gp2-02/page.tsx` | ELSE-IF-CHAIN | 同上 |
| GP3.01 | `chamber/gp3-01/page.tsx` | PUSH(few) | 同上（新创建） |

### 低优先级 — 首页展示问题

| 问题 | 状态 | 建议 |
|------|------|------|
| `SB2.02` 与 `sb2-02-body-systems` 重复 | 首页只应链接 body-systems 版本 | 确认 `grep "sb2-02" src/app/page.tsx` 返回 1 |
| `SM3.01` 有 4 个 Stage（TERMS/FACTORIZE/FRACTIONS/EQUATIONS），每 Stage 8 题 | 总题数 128 题，超过标准 | 可接受，无需修改 |

---

## 📋 课程覆盖度审查结论

基于 Lehrplan 21 (Zyklus 3) + Basel-Stadt Gymnasium 要求：

### ✅ 覆盖完整的学科
- **数学**: 算术/代数/几何/函数/三角/统计/概率/微积分/向量/复数 — 全覆盖
- **物理**: 测量/力学/能量/压强/声学/光学/热力学/电磁学/波动 — 全覆盖
- **化学**: 元素周期表/原子结构/化学键/反应/有机化学/电化学/热化学/平衡/酸碱/氧化还原 — 全覆盖
- **生物**: 细胞/光合/分裂/代谢/组织/遗传/生态/进化/神经/免疫 — 全覆盖

### 🟡 可选扩展（非必需）
- 数列与级数（SM 系列暂无专门模块）
- 组合数学（暂无专门模块）
- 核物理基础（暂无专门模块）

**结论**: 课程覆盖度已满足 Lehrplan 21 要求，无关键缺口。

---

## 🔧 技术规范（必读）

### 题目标准
```
每个 Stage × 每个 Difficulty = 恰好 5 道题
总计: 3 stages × 4 difficulties × 5 = 60 题
```

**难度递进原则**（概念深度，不是数量）:
- **BASIC**: 直接观察、单步计算、整数
- **CORE**: 组合概念、多步计算、需要纸笔
- **ADVANCED**: 条件问题、小数/分数、完整过程
- **ELITE**: 综合策略、深入理解、多种方法

### 推荐代码模式（forEach + 结构化数据）

```typescript
// 1. 数据定义（组件外部）
const QUEST_DATA: Record<Stage, Record<Difficulty, DataType[]>> = {
  STAGE_1: {
    BASIC:    [/* 5 题数据 */],
    CORE:     [/* 5 题数据 */],
    ADVANCED: [/* 5 题数据 */],
    ELITE:    [/* 5 题数据 */],
  },
  // ... 其他 Stage
};

// 2. 生成逻辑（统一）
const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): Quest[] => {
  const quests: Quest[] = [];
  const dataList = QUEST_DATA[stage]?.[difficulty] || [];
  
  dataList.forEach((data, idx) => {
    quests.push({
      id: `${stage}_${difficulty[0]}${idx + 1}`,
      difficulty,
      stage,
      promptLatex: t("module.prompts.xxx", { param: data.value }),
      expressionLatex: `...`,
      targetLatex: data.answer,
      slots: [{ id: "ans", labelLatex: "\\text{Answer}", placeholder: "...", expected: data.answer }],
      correctLatex: data.answer,
      hintLatex: [t("module.hints.xxx")]
    });
  });
  
  return quests;
}, [t]);
```

### i18n 规范
```typescript
// ✅ 新模式（必须使用）
import { useLanguage } from "@/lib/i18n";
const { t } = useLanguage();
t("module_name.title")  // 点号分隔的键路径

// ❌ 旧模式（已全部迁移，不要再使用）
import { translations } from "@/lib/i18n";
const t = translations[currentLanguage].module_name;
```

**翻译文件位置**: `src/lib/i18n/{en,cn,de}/{subject}.ts`  
**CN difficulty**: "基础/核心/进阶/精英"  
**DE difficulty**: "BASIS/KERN/ERWEITERT/ELITE"

### useQuestManager 注意事项
- 默认 tolerance = 0.1（数值答案允许 ±0.1 误差）
- 如需更高精度，显式传入 `tolerance: 0.01`
- `buildPool` 必须用 `useCallback` 包裹
- render 中禁止 `Math.random()`

---

## 📝 下一步工作计划（按优先级）

### P0 — 立即执行（题目严重不足）

#### 1. 修复 SB2.03 遗传学（Mendel's Garden）
**文件**: `src/app/chamber/sb2-03/page.tsx`  
**当前问题**: MONOHYBRID 只有 2 题，PROBABILITY 只有 1 题，DIHYBRID 完全为空  
**目标**: 每 Stage × 每 Difficulty = 5 题（共 60 题）

**题目设计参考**:
- MONOHYBRID Stage: 单基因杂交（Rr × Rr, Aa × aa 等），计算基因型/表现型比例
- PROBABILITY Stage: 计算特定基因型出现概率（如 rr 的概率 = 1/4）
- DIHYBRID Stage: 双基因杂交（AaBb × AaBb），计算 9:3:3:1 比例

**i18n 翻译键位置**: `src/lib/i18n/en/biology.ts` → `sb2_03` 节点

#### 2. 修复 SB2.01-tissues 组织器官
**文件**: `src/app/chamber/sb2-01-tissues/page.tsx`  
**当前问题**: 只有 5 道题（不区分难度），TISSUES/ORGANS/SYSTEMS 三个 Stage 共用同一组题  
**目标**: 每 Stage × 每 Difficulty = 5 题（共 60 题）

**题目设计参考**:
- TISSUES Stage: 上皮/结缔/肌肉/神经组织的功能识别
- ORGANS Stage: 心脏/肺/肝脏/肾脏等器官功能
- SYSTEMS Stage: 循环/呼吸/消化/神经系统的组成与功能

### P1 — 近期执行（题目部分不足）

#### 3. 补充 GB2.01 神经生物学
**文件**: `src/app/chamber/gb2-01/page.tsx`  
**目标**: 每难度从 3-6 题补充到 15 题（3 stages × 5 题）

#### 4. 补充 GB3.01 遗传学进阶
**文件**: `src/app/chamber/gb3-01/page.tsx`  
**目标**: 每难度从 2-5 题补充到 15 题

#### 5. 补充 GB3.02 免疫学
**文件**: `src/app/chamber/gb3-02/page.tsx`  
**目标**: 每难度从 3-6 题补充到 15 题

#### 6. 补充 GC1.02 电镀与腐蚀
**文件**: `src/app/chamber/gc1-02/page.tsx`  
**目标**: 每难度从 6 题补充到 15 题

#### 7. 补充 SB1.01-M 细胞代谢
**文件**: `src/app/chamber/sb1-01-metabolic/page.tsx`  
**目标**: 每难度从 6 题补充到 15 题

#### 8. 补充 SB1.02 光合作用
**文件**: `src/app/chamber/sb1-02/page.tsx`  
**目标**: 每难度从 6 题补充到 15 题

#### 9. 补充 SB1.03 细胞分裂
**文件**: `src/app/chamber/sb1-03/page.tsx`  
**目标**: 每难度从 6 题补充到 15 题

### P2 — 浏览器验证（ELSE-IF-CHAIN 模块）

对以下模块进行浏览器实际测试，确认每个难度是否有 5 题：
- SM1.02, SM1.05, SM2.01, SM2.02, SM2.07, SM2.10, SM3.03, SM3.05
- SP3.01, SP3.04, SP3.05, SP3.06
- SC2.06, SB2.02-body, EM1.01, EM2.01, GB1.01, GP2.01, GP2.02, GP3.01

**验证命令**（快速检查代码结构）:
```bash
MOD=sm1-02 && echo "=== $MOD ===" \
  && echo "Record模式: $(grep -c 'Record<' src/app/chamber/$MOD/page.tsx)" \
  && echo "quests.push: $(grep -c 'quests.push' src/app/chamber/$MOD/page.tsx)" \
  && echo "难度分支: $(grep -c 'BASIC\|CORE\|ADVANCED\|ELITE' src/app/chamber/$MOD/page.tsx)" \
  && echo "行数: $(wc -l < src/app/chamber/$MOD/page.tsx)"
```

### P3 — 可选改进（低优先级）

- 为缺少独立可视化组件的模块添加可视化（gm1-01-advanced, sb1-01-metabolic, sb2-03, sm1-04, sm2-08, sm3-03）
- 数列与级数模块（SM 系列新增）
- 组合数学模块（新增）

---

## 🔍 每次修改后必须执行

```bash
# 1. 编译检查
npm run build

# 2. 浏览器验证（手动）
# - 访问修改的模块页面
# - 点击每个 Stage 和 Difficulty
# - 确认每个难度有 5 题
# - 切换 EN/CN/DE 三语

# 3. 提交
git add -A
git commit -m "feat(biology): complete question pools for SB2.03"
git push
```

---

## 📊 模块完整性快照（2026-02-18）

### ✅ 已确认完整（FULL）
GM1.01, GM1.01-adv, GM1.02, GM2.01, GM3.01, GM4.01  
SM1.01, SM1.03, SM1.04, SM2.03, SM2.04, SM2.05, SM2.06, SM2.08, SM3.01, SM3.04  
SC2.01, SC2.05, SC3.01  
SB1.01, SB3.01  
SP3.07  

### ❓ 需要浏览器验证（VERIFY）
SM1.02, SM1.05, SM2.01, SM2.02, SM2.07, SM2.10, SM3.03, SM3.05  
SP3.01, SP3.04, SP3.05, SP3.06  
SC2.06, SB2.02-body, EM1.01, EM2.01, GB1.01, GP2.01, GP2.02, GP3.01  

### ⚠️ 部分完整（PARTIAL）
GB2.01, GB3.01, GB3.02, GC1.02, SB1.01-M, SB1.02, SB1.03  

### 🔴 严重不足（SPARSE）
SB2.01-tissues, SB2.03  

---

## 📚 参考文档

- **详细 Sprint 计划**: `.kiro/specs/critical-modules-phase1/tasks.md`
- **模块设计标准**: `CHAMBER_MODULE_STANDARDS.md`（1667行）
- **课程参考**: `Resources/Basel_Curriculum_References.md`
- **审查脚本**: `bash scripts/deep-audit.sh > MODULE_AUDIT_LATEST.txt 2>&1`
- **项目状态**: `PROJECT_STATUS.md`
