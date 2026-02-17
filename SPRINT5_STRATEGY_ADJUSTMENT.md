# Sprint 5 策略调整说明

**日期**: 2026-02-17  
**状态**: ✅ 完成调整

---

## 📋 调整概要

Sprint 5的目标从"模式统一"调整为"i18n迁移"。

| 项目 | 原计划 | 调整后 |
|------|--------|--------|
| **目标** | 将44个模块统一为forEach + 结构化数据模式 | 将21个文件迁移到useLanguage() hook |
| **文件数** | 44个模块 | 21个文件 |
| **预计时间** | 5天 | 2-3天 |
| **风险等级** | 中 | 低 |
| **改动范围** | 业务逻辑 + i18n | 仅i18n调用方式 |

---

## 🔍 为什么调整？

### 1. Phase 5.2试点转换的发现

在完成SM2.03和SC1.02的转换后，我们分析了SM2.01，发现：

- **SM2.01已经是最佳实践**
- 使用 `Array.from({ length: 30 })` 动态生成结构化数据
- 已经使用 forEach/map 遍历数据
- 已经使用 discriminated union 类型
- **结论**: Array.from生成式数据 = 显式数组定义，都是标准模式

### 2. 许多模块已使用良好模式

通过代码审查，我们发现：

| 模式 | 评价 | 代表模块 |
|------|------|---------|
| Array.from生成式 | ✅ 最佳实践 | SM2.01 |
| switch + 结构化数据 | ✅ 可接受 | GM1.01, SM2.03 |
| Record<D,Q[]> | ✅ 最佳实践 | SM1.03, SM2.04 |
| ELSE-IF + 数据分离 | ✅ 可接受 | SM1.02, GP2.01 |
| PUSH(few) | ✅ 可接受 | SP3.01, SB1.01 |
| SLICE | ⚠️ 可改进但非必需 | SC2.02 |

**结论**: 大部分模式都是可接受的，无需强制转换。

### 3. 真正的技术债是i18n模式

通过代码搜索，我们发现：

- **21个文件**仍使用旧的 `translations[currentLanguage]` 模式
- 新模块已使用 `useLanguage()` hook
- 造成代码不一致，这才是真正需要统一的部分

---

## 🎯 新策略：i18n迁移

### 迁移模式

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

### 需要迁移的文件（21个）

#### Chamber模块（17个）

**数学模块** (8个):
- GM1.01, GM1.01-advanced, GM2.01, GM3.01
- SM1.02, SM1.05, SM2.02, SM3.03

**物理模块** (4个):
- GP1.03, GP1.04, SP3.01, SP3.05

**化学模块** (5个):
- SC1.04, SC1.05, SC2.02, SC2.03, SC2.04, SC3.05

#### 非Chamber组件（4个）
- EntryProtocol
- UserSetup
- ProfilePage
- PythagorasFluidCanvas

---

## 📊 工作计划

### Phase 5.3: 数学模块 i18n 迁移（0.5天）
- [ ] GM1.01
- [ ] GM1.01-advanced
- [ ] GM2.01
- [ ] GM3.01
- [ ] SM1.02
- [ ] SM1.05
- [ ] SM2.02
- [ ] SM3.03

### Phase 5.4: 物理模块 i18n 迁移（0.3天）
- [ ] GP1.03
- [ ] GP1.04
- [ ] SP3.01
- [ ] SP3.05

### Phase 5.5: 化学模块 i18n 迁移（0.4天）
- [ ] SC1.04
- [ ] SC1.05
- [ ] SC2.02
- [ ] SC2.03
- [ ] SC2.04
- [ ] SC3.05

### Phase 5.6: 其他组件 i18n 迁移（0.3天）
- [ ] EntryProtocol
- [ ] UserSetup
- [ ] ProfilePage
- [ ] PythagorasFluidCanvas

### Phase 5.7: 最终验证（0.5天）
- [ ] 全量构建测试
- [ ] 浏览器测试所有修改的模块
- [ ] 三语切换测试
- [ ] 最终提交

---

## ✅ 为什么这是正确的策略

### 1. 低风险
- 只改变i18n调用方式
- 不改变业务逻辑
- 不改变题目生成逻辑
- 每个模块迁移后立即测试

### 2. 高价值
- 统一代码风格
- 便于未来维护
- 消除技术债
- 提高代码一致性

### 3. 可验证
- 每个文件迁移约需10-15分钟
- 立即测试，问题容易发现
- 每完成3-5个文件就commit
- 可随时回滚

### 4. 系统性
- 一次性解决所有i18n技术债
- 不留遗留问题
- 为未来开发建立标准

### 5. 实际需求
- 这是真正需要统一的部分
- 不是为了统一而统一
- 解决实际的代码不一致问题

---

## 📈 达成的目标

### Phase 5.1-5.2 已完成
1. ✅ 创建了模式统一工具（unify-pattern.js, validate-pattern.js）
2. ✅ 建立了标准模式文档和模板
3. ✅ 成功转换了2个试点模块（SM2.03, SC1.02）
4. ✅ 验证了标准模式的可行性
5. ✅ 识别了真正的技术债（i18n模式）

### Phase 5.3-5.7 待完成
1. ⏳ 迁移21个文件到useLanguage() hook
2. ⏳ 统一所有i18n调用方式
3. ⏳ 消除代码不一致
4. ⏳ 建立i18n调用标准

---

## 🎓 经验总结

### 1. 试点的价值
- 通过试点发现了真正的问题
- 避免了不必要的大规模重构
- 节省了时间和精力

### 2. 灵活调整的重要性
- 不要固守原计划
- 根据实际情况调整策略
- 以解决实际问题为目标

### 3. 风险控制
- 优先选择低风险、高价值的工作
- 避免为了统一而统一
- 保持代码稳定性

### 4. 渐进式改进
- 不需要一次性完美
- 可以分阶段改进
- 重要的是持续进步

---

## 📝 文档更新

已更新以下文档：

1. ✅ `.kiro/specs/critical-modules-phase1/tasks.md`
   - 更新Sprint 5标题和目标
   - 调整Phase 5.3-5.6为i18n迁移任务
   - 更新工作量估算表

2. ✅ `SPRINT5_PROGRESS.md`
   - 更新状态为"进行中"
   - 添加策略调整说明
   - 列出所有需要迁移的文件
   - 添加下一步计划

3. ✅ `SPRINT5_STRATEGY_ADJUSTMENT.md` (本文档)
   - 详细说明策略调整原因
   - 提供完整的工作计划
   - 总结经验教训

---

**文档创建**: 2026-02-17  
**状态**: ✅ 策略调整完成，准备开始Phase 5.3
