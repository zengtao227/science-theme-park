# 语言切换 Bug 诊断报告

**报告时间**: 2026-02-18  
**最后更新**: 2026-02-18  
**问题严重性**: 🚨 严重 - 影响用户体验

---

## 📋 执行摘要

### 问题描述
用户切换语言时，模块内的问题描述（context）和场景（scenario）不会更新，只有标题和按钮等 UI 元素会切换语言。

### 根本原因
使用了 `useCallback` 且依赖数组为空 `[]`，导致内部的 `t()` 函数调用被"冻结"在首次渲染时的语言。

### 影响范围
- **总模块数**: 78 个
- **受影响模块**: 12 个 (15.4%)
- **正常模块**: 66 个 (84.6%)

---

## 🔍 诊断结果

### 严重问题模块（12 个）

| 模块 | 主题 | 状态 | 优先级 |
|------|------|------|--------|
| **SM1-03** | 数学-整数 | ✅ 已修复 | 🔴 高（已完成 i18n） |
| **SM1-04** | 数学-代数 | ⏳ 进行中 | 🔴 高（已完成 i18n） |
| **SM2-08** | 数学-几何 | ⏳ 待修复 | 🔴 高（已完成 i18n） |
| **GC1-02** | 生物 | ⏳ 待修复 | 🟡 中 |
| **SB2-01-TISSUES** | 生物-组织 | ⏳ 待修复 | 🟡 中 |
| **SB2-02-BODY-SYSTEMS** | 生物-系统 | ⏳ 待修复 | 🟡 中 |
| **SC2-01** | 化学 | ⏳ 待修复 | 🟡 中 |
| **SM1-05** | 数学 | ⏳ 待修复 | 🟡 中 |
| **SM2-10** | 数学 | ⏳ 待修复 | 🟡 中 |
| **SM3-05** | 数学 | ⏳ 待修复 | 🟡 中 |
| **SP3-05** | 物理 | ⏳ 待修复 | 🟡 中 |
| **SP3-06** | 物理 | ⏳ 待修复 | 🟡 中 |

---

## 🛠️ 修复进度

### Phase 1: 高优先级模块（3 个）
- [x] SM1-03 - 数学整数（60 个翻译）✅ 已完成
- [ ] SM1-04 - 数学代数（19 个翻译）⏳ 进行中
- [ ] SM2-08 - 数学几何（15 个翻译）⏳ 待修复

### Phase 2: 其他模块（9 个）
- [ ] GC1-02
- [ ] SB2-01-TISSUES
- [ ] SB2-02-BODY-SYSTEMS
- [ ] SC2-01
- [ ] SM1-05
- [ ] SM2-10
- [ ] SM3-05
- [ ] SP3-05
- [ ] SP3-06

**总进度**: 1/12 (8.3%)

---

## ✅ 已完成修复

### SM1-03 (数学-整数)
- **修复时间**: 2026-02-18
- **翻译数量**: 60 个
- **提交**: `fix: SM1-03 language switch bug - use translation object pattern`
- **验证**: 构建成功 ✅

---

## 🔧 修复方法

### 正确模式（已在 SM1-03 中实现）

```typescript
// 1. 预提取所有翻译
const sm1_03_t = {
  scenarios: {
    number_line: t("sm1_03.scenarios.number_line"),
    // ...
  },
  problems: {
    nl_identify_neg3: t("sm1_03.problems.nl_identify_neg3"),
    // ...
  }
};

// 2. buildStagePool 接受翻译对象
const buildStagePool = useCallback(
  (tObj: typeof sm1_03_t, difficulty: Difficulty, stage: Stage) => {
    return [{
      scenario: tObj.scenarios.number_line,  // ✅ 使用翻译对象
      context: tObj.problems.nl_identify_neg3,
    }];
  },
  []
);

// 3. buildPool 依赖翻译对象
const buildPool = useCallback(
  (difficulty: Difficulty, stage: Stage) => 
    buildStagePool(sm1_03_t, difficulty, stage),
  [sm1_03_t]  // ✅ 依赖翻译对象
);
```

---

## 📝 下一步

1. 完成 SM1-04 和 SM2-08 的修复
2. 验证所有高优先级模块的语言切换功能
3. 继续修复其他 9 个模块
4. 运行完整的构建和测试
5. 更新 I18N_BATCH_FIX_TASKS.md

---

**最后更新**: 2026-02-18  
**状态**: 🟡 进行中 (1/12 完成)
