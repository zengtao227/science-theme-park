# i18n.ts 当前问题总结

**更新时间**: 2026-02-15 (最新修复)

## 📊 当前状态

### ✅ 最近完成的修复 (Commit: 223366d)

#### 1. 修复了括号平衡问题
- **EN section (line 3739)**: 删除了 sc3_03 模块 feedback 后面多余的 `},`
  - 原来: `} \n },` (两个闭括号)
  - 修改为: `}`
  
- **CN section (line 7515)**: 删除了 sc3_03 模块 feedback 后面多余的 `},`
  - 原来: `} \n },` (两个闭括号)
  - 修改为: `}`

- **DE section (line 11323)**: 添加了缺失的闭括号
  - 原来: `} \n };` (缺少一个闭括号)
  - 修改为: `} \n } \n };`

#### 2. 验证结果
- ✅ 括号完全平衡 (Python 脚本验证 depth = 0)
- ✅ TypeScript 语法错误已解决
- ✅ 文件可以成功编译

### ❌ 当前运行时错误

**构建错误**:
```
Error occurred prerendering page "/chamber/em1-01"
TypeError: Cannot read properties of undefined (reading 'stages')
```

**错误位置**: `/chamber/em1-01` 页面在 SSR (服务器端渲染) 时

**错误详情**:
- 页面代码: `src/app/chamber/em1-01/page.tsx`
- 第 17 行: `const t = locale.em1_01;`
- 第 38 行: `promptLatex: t.stages.measure_prompt_latex,`
- 错误提示: `t` 是 undefined，所以无法读取 `t.stages`

## 🔍 问题分析

### em1_01 在 i18n.ts 中的定义情况

#### 验证结果:
1. **存在性**: ✅ em1_01 在三个语言版本中都存在
   - EN: line 1654
   - CN: line 5079
   - DE: line 8938

2. **缩进检查**: ✅ 所有三个 em1_01 定义的缩进都是 4 个空格（正确）
   - 使用 `od -c` 验证，确认是 4 个空格，不是 tab

3. **结构检查**: ✅ EN 版本的 em1_01 包含所有必需字段
   ```typescript
   em1_01: {
       back: "Back to Nexus",
       title: "EM1.01 // THALES TOWER",
       difficulty: { ... },
       stages: {
           measure: "MEASURE"
       },
       measure_prompt_latex: "...",
       labels: { ... },
       mission: { ... }
   }
   ```

4. **getTranslations 函数**: ✅ 函数逻辑正确
   ```typescript
   export function getTranslations(lang?: string) {
       if (!lang || !(lang in translations)) {
           return translations.EN;
       }
       const validLang = lang as keyof typeof translations;
       return translations[validLang];
   }
   ```

### 可能的原因

#### 原因 1: SSR 时 currentLanguage 未初始化
- 在服务器端渲染时，`useAppStore` 的 `currentLanguage` 可能是 undefined
- `getTranslations(undefined)` 应该返回 `translations.EN`，但可能有其他问题

#### 原因 2: 页面代码与 i18n 结构不匹配
- 页面第 38 行访问: `t.stages.measure_prompt_latex`
- 但 i18n.ts 中:
  - `stages.measure` = "MEASURE" (只是标签)
  - `measure_prompt_latex` 在 em1_01 根级别，不在 stages 里
- 这是一个代码错误！

#### 原因 3: 缓存问题
- Next.js 的 .next 目录可能缓存了旧的错误版本
- 需要清除缓存重新构建

### 代码不匹配详情

**i18n.ts 结构**:
```typescript
em1_01: {
    stages: {
        measure: "MEASURE"  // 只是一个标签字符串
    },
    measure_prompt_latex: "\\text{Use }\\frac{h}{H}=\\frac{l}{L}\\text{ to solve tower height.}"  // 在根级别
}
```

**page.tsx 代码 (line 38)**:
```typescript
promptLatex: t.stages.measure_prompt_latex,  // ❌ 错误！stages 里没有 measure_prompt_latex
```

**应该改为**:
```typescript
promptLatex: t.measure_prompt_latex,  // ✅ 正确
```

## 🎯 建议的解决方案

### 方案 A: 修复页面代码（推荐）
修改 `src/app/chamber/em1-01/page.tsx` 第 38 行:
```typescript
// 从
promptLatex: t.stages.measure_prompt_latex,
// 改为
promptLatex: t.measure_prompt_latex,
```

### 方案 B: 清除缓存后重试
```bash
rm -rf .next
npm run build
```

### 方案 C: 检查是否有其他类似问题
搜索所有访问 `t.stages.xxx_prompt_latex` 的代码，确保结构匹配。

## 📋 需要另一个 AI 检查的问题

### 问题 1: em1_01 为什么返回 undefined？
- i18n.ts 中 em1_01 定义存在且结构正确
- getTranslations 函数逻辑正确
- 但 SSR 时 `locale.em1_01` 返回 undefined
- 是否是因为 em1_01 被嵌套在错误的位置？

### 问题 2: 验证 em1_01 的父级结构
请检查：
1. em1_01 是否真的是 EN/CN/DE 的直接子属性？
2. em1_01 前面的模块（sm1_01）是否正确关闭？
3. 是否有其他模块的闭括号导致 em1_01 被嵌套在错误的位置？

### 问题 3: 验证所有语言版本的一致性
请检查 CN (line 5079) 和 DE (line 8938) 的 em1_01 定义：
1. 是否也有 4 个空格缩进？
2. 是否也包含 stages 和 measure_prompt_latex？
3. 结构是否与 EN 版本一致？

## 🔗 相关文件

- `src/lib/i18n.ts` - 翻译文件（已修复括号平衡）
- `src/app/chamber/em1-01/page.tsx` - 出错的页面
- `I18N_REFACTOR_PLAN.md` - 长期重构计划

## 📝 Git 提交记录

- Commit 223366d: "Fix i18n.ts bracket balance issues"
  - 修复了 EN, CN, DE 三个 section 的括号平衡问题
  - 所有语法错误已解决
  - 文件可以成功编译

---

**状态**: 🟡 语法正确，运行时错误
**优先级**: 🔥 高
**下一步**: 需要另一个 AI 检查 em1_01 的嵌套结构和页面代码

## 🔍 问题分析

### 文件规模
- **总行数**: 11,330 行
- **文件大小**: ~653KB
- **语言数**: 3 (EN, CN, DE)
- **模块数**: ~70 个

### 问题根源
1. **文件过大**: 单一文件包含所有翻译，难以维护
2. **手动编辑风险**: 括号平衡问题频繁出现
3. **编辑器性能**: 大文件导致编辑器响应缓慢
4. **合并冲突**: 多人协作时容易产生冲突

## 🎯 解决方案

### 短期方案（紧急修复）
1. **使用 AI 助手**: 将当前文件发给 AI 助手，让其检查和修复括号问题
2. **或者回滚**: 恢复到上一个可用版本（commit ad470bf）

### 长期方案（推荐）
**执行 i18n 重构计划** - 详见 `I18N_REFACTOR_PLAN.md`

主要步骤：
1. 将 i18n.ts 拆分为多个小文件
2. 按语言和学科组织
3. 使用 TypeScript 类型确保安全
4. 提升可维护性和性能

## 📋 下一步行动

### 选项 A: 紧急修复（1 小时）
1. 将当前 i18n.ts 发给 AI 助手
2. 修复 line 3740 和 7517 的括号问题
3. 测试构建
4. 提交修复

### 选项 B: 执行重构（6-9 小时）
1. 按照 I18N_REFACTOR_PLAN.md 执行
2. 彻底解决文件过大问题
3. 提升长期可维护性

## 🔗 相关文档

- `I18N_REFACTOR_PLAN.md` - i18n 重构详细计划
- `CURRICULUM_PLAN.md` - 模块课程规划
- `PROJECT_ARCHITECTURE.md` - 项目架构文档

## 📝 备注

- 当前 i18n.ts 已经过多次修复尝试
- 建议不要继续手动编辑大文件
- 优先考虑长期重构方案

---

**状态**: 🔴 构建失败
**优先级**: 🔥 高
**负责人**: 待定
