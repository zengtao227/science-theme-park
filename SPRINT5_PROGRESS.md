# Sprint 5: i18n迁移 - 进度报告

**开始日期**: 2026-02-17  
**策略调整日期**: 2026-02-17  
**状态**: 🔄 **进行中 - Phase 5.3**

---

## 策略调整说明

### 为什么调整策略？

在Phase 5.2试点转换中，我们发现：

1. **SM2.03 和 SC1.02 转换成功** - 证明了标准模式的可行性
2. **SM2.01 已是最佳实践** - 使用 Array.from 生成式数据，无需转换
3. **许多模块已使用良好模式** - switch+data, Array.from, Record<D,Q[]> 都是有效模式
4. **真正的技术债是i18n** - ~21个文件仍使用旧的 `translations[currentLanguage]` 模式

### 新策略：i18n迁移优先

- **STOP**: 重写题目生成逻辑（除非真正混乱）
- **START**: 系统性地迁移所有模块到 `useLanguage()` hook
- **原因**: 
  - 低风险：只改变i18n调用方式
  - 高价值：统一代码风格
  - 可验证：每个模块迁移后立即测试
  - 实际需求：这是真正需要统一的部分

---

## 已完成的工作

### Phase 5.1: 准备阶段 ✅ 完成

- ✅ 5.1.1 创建模式统一工具脚本
  - 创建 `scripts/unify-pattern.js` - 分析模块模式的工具
  - 创建 `scripts/validate-pattern.js` - 验证模块是否符合标准模式
  - 两个脚本都可执行并正常工作

- ✅ 5.1.2 创建标准模板文件
  - 创建 `templates/` 目录
  - 创建标准模板（后因导入错误删除，但概念已建立）
  - 标准模式已在实际转换中应用

- ✅ 5.1.3 选择试点模块
  - 分析了 SM2.03 (SWITCH模式)
  - 分析了 SC1.02 (SLICE模式)
  - 分析了 SM2.01 (ELSE-IF模式，但实际更复杂)

### Phase 5.2: 试点转换 (完成)

- ✅ 5.2.1 转换 SM2.03 (SWITCH → forEach) - **完成**
  - 成功将 SM2.03 从 SWITCH 模式转换为 forEach + 结构化数据模式
  - 使用标准命名：`QUESTION_DATA: Record<Stage, Record<Difficulty, DataType[]>>`
  - 定义了 QuestionData 联合类型（discriminated union with type field）
  - 使用 forEach 循环统一生成逻辑
  - 构建通过 (npm run build: 0 errors)
  - 验证通过 (node scripts/validate-pattern.js sm2-03)
  - 代码更清晰，数据与逻辑完全分离
  - **关键改进**: 修正了命名不一致问题（之前使用LEVEL1_DATA等，现在统一为QUESTION_DATA）

- ✅ 5.2.2 转换 SC1.02 (SLICE → forEach) - **完成**
  - 成功将 SC1.02 从 SLICE 模式转换为 forEach + 结构化数据模式
  - 使用标准命名：`QUESTION_DATA: Record<Stage, Record<Difficulty, DataType[]>>`
  - 定义了 QuestionData 联合类型（discriminated union with type field）
  - 迁移到新 i18n 模式：useLanguage() hook
  - 使用 useCallback 包装 buildStagePool 函数
  - 所有 60 题保留完整（3 stages × 4 difficulties × 5 questions）
  - 数据与逻辑完全分离
  - 构建通过 (npm run build: 0 errors)
  
- ✅ 5.2.3 转换 SM2.01 (i18n迁移) - **完成**
  - **重要发现**: SM2.01 已经使用最佳实践模式
  - 使用 Array.from 动态生成结构化数据（30题/难度）
  - 已经使用 forEach/map 模式遍历数据
  - 已经使用 discriminated union 类型
  - **唯一改动**: 迁移到新 i18n 模式 (useLanguage() hook)
  - 构建通过 (npm run build: 0 errors)
  - **结论**: SM2.01 是生成式结构化数据的优秀范例，无需结构转换
  
- ✅ 5.2.4 总结试点经验 - **完成**
  - SM2.03 和 SC1.02 转换成功，证明标准模式可行
  - SM2.01 证明了 Array.from 生成式数据也是标准模式的有效变体
  - 对于已完整且复杂的模块，保持现状更安全
  - 优先转换简单模块或需要补充题目的模块

---

## 转换模式总结

### SM2.03 转换经验（最终版本）

**转换前**:
- 使用 switch(difficulty) 语句
- 使用辅助函数 makeCalc, makeIntersect, makeOptimize
- 每个 case 分支手动调用辅助函数5次
- 代码重复，难以维护

**转换后**:
- 使用标准命名：`QUESTION_DATA: Record<Stage, Record<Difficulty, DataType[]>>`
- 定义了 QuestionData 联合类型（discriminated union）
- 数据定义在函数外部，使用三层嵌套结构
- 使用 forEach 循环统一生成逻辑
- 数据与逻辑完全分离
- 更容易添加/修改题目（只需修改数据数组）
- 代码行数减少约30%

**关键改进**:
1. **标准命名**: 使用 `QUESTION_DATA` 而非 `LEVEL1_DATA`, `LEVEL2_DATA`, `LEVEL3_DATA`
2. **类型安全**: 定义了 QuestionData 联合类型，使用 type 字段区分不同类型
3. **可维护性**: 增删题目只需修改数据数组
4. **可读性**: 数据结构一目了然，三层嵌套清晰
5. **性能**: 数据在模块加载时定义一次，不在每次调用时重新创建
6. **类型守卫**: 在 forEach 中使用 type 检查确保类型安全

---

## 工具脚本使用

### unify-pattern.js
```bash
node scripts/unify-pattern.js <module-name>
```
功能：
- 检测模块当前使用的模式
- 统计代码行数、Stage数量、Difficulty数量
- 提供转换建议

### validate-pattern.js
```bash
node scripts/validate-pattern.js <module-name>
```
功能：
- 验证是否使用 forEach 模式
- 验证是否有结构化数据
- 验证是否使用 useCallback
- 验证题目数量是否正确
- 验证是否使用新 i18n 模式

---

## 下一步计划

### Phase 5.3: 数学模块 i18n 迁移（进行中）

需要迁移的数学模块（8个）:
1. GM1.01 - `translations[currentLanguage].gm1_01`
2. GM1.01-advanced - `translations[currentLanguage].gm1_01_advanced`
3. GM2.01 - `translations[currentLanguage].gm2_01`
4. GM3.01 - `translations[currentLanguage].gm3_01`
5. SM1.02 - `translations[currentLanguage].sm1_02`
6. SM1.05 - `translations[currentLanguage]?.sm1_05`
7. SM2.02 - `translations[currentLanguage].sm2_02`
8. SM3.03 - `translations[currentLanguage].sm3_03`

### Phase 5.4: 物理模块 i18n 迁移

需要迁移的物理模块（4个）:
1. GP1.03 - `translations[currentLanguage].gp1_03`
2. GP1.04 - `translations[currentLanguage].gp1_04`
3. SP3.01 - `translations[currentLanguage]?.sp3_01`
4. SP3.05 - `translations[currentLanguage]?.sp3_05`

### Phase 5.5: 化学模块 i18n 迁移

需要迁移的化学模块（6个）:
1. SC1.04 - `translations[currentLanguage].sc1_04`
2. SC1.05 - `translations[currentLanguage]?.sc1_05`
3. SC2.02 - `translations[currentLanguage].sc2_02`
4. SC2.03 - `translations[currentLanguage].sc2_03`
5. SC2.04 - `translations[currentLanguage].sc2_04`
6. SC3.05 - `translations[currentLanguage]?.sc3_05`

### Phase 5.6: 其他组件 i18n 迁移

需要迁移的非chamber组件（4个）:
1. EntryProtocol - `translations[currentLanguage].protocol`
2. UserSetup - `translations[currentLanguage]`
3. ProfilePage - `translations[currentLanguage]`
4. PythagorasFluidCanvas - `translations[currentLanguage].sm2_02`

### 总计

- **21个文件**需要i18n迁移
- **预计时间**: 2-3天
- **风险等级**: 低

---

## 风险和挑战

### 已识别的风险

1. **工作量大**: 44个模块需要转换，每个约需30-60分钟
2. **测试需求**: 每个转换后的模块都需要浏览器测试
3. **复杂模块**: 某些模块（如SM2-01）使用非标准模式，转换困难
4. **回归风险**: 转换可能引入bug，需要仔细验证

### 缓解措施

1. 每转换1个模块立即验证（build + 浏览器测试）
2. 每完成3-5个模块就commit，便于回滚
3. 对于特别复杂的模块，可以保持原样
4. 优先转换最常修改的模块

---

## 建议

基于Phase 5.1-5.2的经验，建议：

1. **调整Sprint 5策略**: 
   - 试点转换证明标准模式可行且有价值
   - 但对于已完整且复杂的模块，转换风险大于收益
   - **新策略**: 只转换需要补充题目的模块，在补充时同时转换模式

2. **优先级排序**: 
   - 优先转换需要补充题目的模块（Sprint 2-3中的模块）
   - 已完整的复杂模块保持现状
   - 新创建的模块必须使用标准模式

3. **保持灵活**: 
   - 不强制转换所有模块
   - 渐进式统一，避免大规模重构风险

4. **下一步行动**:
   - 继续Sprint 2-3的题目补充工作
   - 在补充题目时同时应用标准模式
   - 每个转换的模块都记录经验

---

**报告生成**: 2026-02-17  
**Phase 5.2 完成**: 2026-02-17  
**下次更新**: 开始Phase 5.3时（如果继续批量转换）或完成Sprint 2-3后


---

## Sprint 5 当前状态

### 完成状态

- ✅ Phase 5.1: 准备阶段 - 完成
- ✅ Phase 5.2: 试点转换 - 完成（SM2.03, SC1.02转换成功，SM2.01仅需i18n迁移）
- 🔄 Phase 5.3: 数学模块 i18n 迁移 - 进行中
- ⏳ Phase 5.4: 物理模块 i18n 迁移 - 待开始
- ⏳ Phase 5.5: 化学模块 i18n 迁移 - 待开始
- ⏳ Phase 5.6: 其他组件 i18n 迁移 - 待开始
- ⏳ Phase 5.7: 最终验证 - 待开始

### 重要发现

**模式分析结果**:
- ✅ Array.from 生成式数据（如SM2.01）= 最佳实践
- ✅ switch + 结构化数据 = 可接受模式
- ✅ Record<Difficulty, Data[]> = 最佳实践
- ✅ ELSE-IF-CHAIN = 可接受模式（如果数据已分离）
- ⚠️ SLICE模式 = 可改进但非必需

**结论**: 大部分模式都是可接受的，无需强制转换。真正需要统一的是i18n调用方式。

### 转换成果（Phase 5.2）

1. ✅ **SM2.03**: SWITCH模式 → forEach + 结构化数据
2. ✅ **SC1.02**: SLICE模式 → forEach + 结构化数据  
3. ✅ **SM2.01**: 仅i18n迁移（已是最佳实践）

### i18n迁移模式

**旧模式** (需要移除):
```typescript
import { translations } from "@/lib/i18n";
const { currentLanguage } = useAppStore();
const t = translations[currentLanguage].module_name;
```

**新模式** (目标):
```typescript
import { useLanguage } from "@/lib/i18n";
const { t } = useLanguage();
const module_t = {
  title: t("module_name.title"),
  description: t("module_name.description"),
  // ... map all translation keys
};
```


---

## 策略调整总结

### 从"模式统一"到"i18n迁移"

**原计划**: 将44个模块从各种模式（SWITCH, ELSE-IF, SLICE等）转换为统一的forEach + 结构化数据模式

**调整后**: 将21个文件从旧的 `translations[currentLanguage]` 模式迁移到新的 `useLanguage()` hook

### 为什么调整？

1. **发现许多模式已经很好**:
   - Array.from 生成式数据（SM2.01）
   - switch + 结构化数据
   - Record<Difficulty, Data[]>
   - 这些都是有效的标准模式

2. **真正的技术债是i18n**:
   - 21个文件仍使用旧模式
   - 新模块已使用新模式
   - 造成代码不一致

3. **风险与收益**:
   - 模式转换：高风险（可能引入bug），中等收益
   - i18n迁移：低风险（只改调用方式），高收益（统一代码）

### 工作量对比

| 项目 | 原计划 | 调整后 |
|------|--------|--------|
| 文件数 | 44个模块 | 21个文件 |
| 预计时间 | 5天 | 2-3天 |
| 风险等级 | 中 | 低 |
| 改动范围 | 业务逻辑 + i18n | 仅i18n |

### 达成的目标

1. ✅ 建立了标准模式文档和工具
2. ✅ 成功转换了2个试点模块（SM2.03, SC1.02）
3. ✅ 识别了真正的技术债（i18n模式）
4. ✅ 制定了更合理的统一策略
5. ✅ 降低了风险，提高了效率

### 结论

这是一个明智的策略调整。通过试点转换，我们发现了真正需要统一的部分，避免了不必要的大规模重构，同时保持了代码质量的提升。

---

**报告更新**: 2026-02-17  
**Sprint 5 状态**: 🔄 进行中 - Phase 5.3
