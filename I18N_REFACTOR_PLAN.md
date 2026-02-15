# i18n.ts 重构计划

## 📋 当前问题

### 文件状态
- **文件大小**: 11,330 行，~653KB
- **结构**: 单一文件包含 EN, CN, DE 三个语言的所有翻译
- **问题**: 
  - 文件过大，难以维护
  - 括号平衡问题频繁出现
  - 编辑器性能下降
  - 合并冲突频繁

### 当前错误
- 语法错误：`'const' declarations must be initialized`
- 错误位置：line 3740 (EN section), line 7517 (CN section)
- 根本原因：括号结构不平衡

## 🎯 重构目标

### 主要目标
1. **提高可维护性**: 将大文件拆分为小文件
2. **减少错误**: 避免括号平衡问题
3. **提升性能**: 改善编辑器和构建性能
4. **简化协作**: 减少合并冲突

### 次要目标
1. 支持按需加载翻译
2. 支持翻译文件热更新
3. 便于添加新语言

## 📐 重构方案

### 方案 A: 按语言拆分（推荐）

**结构**:
```
src/lib/i18n/
├── index.ts           # 主入口，导出 translations 和 hooks
├── types.ts           # TypeScript 类型定义
├── en/
│   ├── index.ts       # EN 语言入口
│   ├── common.ts      # 通用翻译（protocol, common, home, profile）
│   ├── math.ts        # 数学模块 (SM*, GM*, EM*)
│   ├── physics.ts     # 物理模块 (SP*, GP*)
│   ├── chemistry.ts   # 化学模块 (SC*, GC*)
│   └── biology.ts     # 生物模块 (SB*, GB*)
├── cn/
│   ├── index.ts
│   ├── common.ts
│   ├── math.ts
│   ├── physics.ts
│   ├── chemistry.ts
│   └── biology.ts
└── de/
    ├── index.ts
    ├── common.ts
    ├── math.ts
    ├── physics.ts
    ├── chemistry.ts
    └── biology.ts
```

**优点**:
- 每个文件 < 2000 行
- 按学科组织，便于查找
- 语言独立，减少合并冲突
- 类型安全

**缺点**:
- 需要重构所有导入
- 初期工作量大

### 方案 B: 按模块拆分

**结构**:
```
src/lib/i18n/
├── index.ts
├── types.ts
├── common.ts          # protocol, common, home, profile (三语)
├── modules/
│   ├── sm1-01.ts      # SM1.01 的 EN/CN/DE
│   ├── sm1-02.ts
│   ├── ...
│   ├── sp1-01.ts
│   └── ...
```

**优点**:
- 模块独立，便于维护
- 添加新模块时只需创建新文件

**缺点**:
- 文件数量多（~70 个模块文件）
- 跨语言对比不便

### 方案 C: JSON 格式（备选）

**结构**:
```
src/lib/i18n/
├── index.ts           # 加载和导出逻辑
├── en.json
├── cn.json
└── de.json
```

**优点**:
- 纯数据，无语法错误风险
- 可以使用翻译工具
- 文件大小更小

**缺点**:
- 失去 TypeScript 类型检查
- 无法使用模板字符串
- 需要额外的类型定义

## 🚀 实施计划

### 阶段 1: 准备工作（1-2 小时）

1. **创建新目录结构**
   ```bash
   mkdir -p src/lib/i18n/{en,cn,de}
   ```

2. **创建类型定义** (`src/lib/i18n/types.ts`)
   ```typescript
   export type Language = "EN" | "CN" | "DE";
   
   export interface CommonTranslations {
     protocol: { ... };
     common: { ... };
     home: { ... };
     profile: { ... };
   }
   
   export interface ModuleTranslations {
     sm1_01: { ... };
     sm1_02: { ... };
     // ...
   }
   
   export interface Translations extends CommonTranslations, ModuleTranslations {}
   ```

3. **创建提取脚本** (`scripts/extract-i18n.js`)
   - 从当前 i18n.ts 提取 EN section
   - 按学科分类
   - 生成新文件

### 阶段 2: 提取和拆分（2-3 小时）

1. **提取 EN 翻译**
   ```bash
   node scripts/extract-i18n.js --lang=EN --output=src/lib/i18n/en/
   ```

2. **提取 CN 翻译**
   ```bash
   node scripts/extract-i18n.js --lang=CN --output=src/lib/i18n/cn/
   ```

3. **提取 DE 翻译**
   ```bash
   node scripts/extract-i18n.js --lang=DE --output=src/lib/i18n/de/
   ```

4. **验证提取结果**
   - 检查每个文件的括号平衡
   - 确认所有模块都被提取
   - 运行 TypeScript 编译

### 阶段 3: 创建新入口（1 小时）

**`src/lib/i18n/index.ts`**:
```typescript
import { enCommon, enMath, enPhysics, enChemistry, enBiology } from './en';
import { cnCommon, cnMath, cnPhysics, cnChemistry, cnBiology } from './cn';
import { deCommon, deMath, dePhysics, deChemistry, deBiology } from './de';
import type { Language, Translations } from './types';

export const translations: Record<Language, Translations> = {
  EN: {
    ...enCommon,
    ...enMath,
    ...enPhysics,
    ...enChemistry,
    ...enBiology,
  },
  CN: {
    ...cnCommon,
    ...cnMath,
    ...cnPhysics,
    ...cnChemistry,
    ...cnBiology,
  },
  DE: {
    ...deCommon,
    ...deMath,
    ...dePhysics,
    ...deChemistry,
    ...deBiology,
  },
};

// 保持现有的 hooks 不变
export function useLanguage() { ... }
export function getTranslations(lang?: string) { ... }
```

### 阶段 4: 测试和验证（1-2 小时）

1. **运行构建**
   ```bash
   npm run build
   ```

2. **测试所有页面**
   - 检查首页模块列表
   - 随机测试 10 个模块页面
   - 切换语言测试

3. **性能测试**
   - 测量构建时间
   - 测量页面加载时间
   - 检查编辑器性能

### 阶段 5: 清理和文档（30 分钟）

1. **备份旧文件**
   ```bash
   mv src/lib/i18n.ts src/lib/i18n.ts.backup
   ```

2. **更新文档**
   - 更新 PROJECT_ARCHITECTURE.md
   - 更新 CHAMBER_MODULE_STANDARDS.md
   - 添加新模块翻译指南

3. **提交代码**
   ```bash
   git add src/lib/i18n/
   git commit -m "♻️ 重构: 将 i18n.ts 拆分为多个文件"
   ```

## 📝 迁移检查清单

### 准备阶段
- [ ] 备份当前 i18n.ts
- [ ] 创建新目录结构
- [ ] 编写提取脚本
- [ ] 定义 TypeScript 类型

### 提取阶段
- [ ] 提取 EN 翻译
- [ ] 提取 CN 翻译
- [ ] 提取 DE 翻译
- [ ] 验证括号平衡
- [ ] 验证所有模块完整

### 集成阶段
- [ ] 创建新入口文件
- [ ] 保持 API 兼容性
- [ ] 运行 TypeScript 编译
- [ ] 修复类型错误

### 测试阶段
- [ ] 构建成功
- [ ] 首页正常显示
- [ ] 所有模块页面正常
- [ ] 语言切换正常
- [ ] 性能测试通过

### 清理阶段
- [ ] 删除旧文件
- [ ] 更新文档
- [ ] 提交代码
- [ ] 通知团队

## ⚠️ 风险和缓解

### 风险 1: 提取脚本错误
**缓解**: 
- 先在小范围测试
- 保留完整备份
- 使用 git 版本控制

### 风险 2: 类型不匹配
**缓解**:
- 使用严格的 TypeScript 类型
- 运行完整的类型检查
- 逐步迁移和测试

### 风险 3: 性能下降
**缓解**:
- 使用动态导入（如需要）
- 测量和对比性能
- 优化导入策略

### 风险 4: 团队协作中断
**缓解**:
- 在独立分支进行
- 完成后一次性合并
- 提供迁移指南

## 📊 预期收益

### 短期收益
- ✅ 解决当前的括号平衡问题
- ✅ 提升编辑器性能
- ✅ 减少构建时间

### 长期收益
- ✅ 更容易添加新模块
- ✅ 减少合并冲突
- ✅ 便于团队协作
- ✅ 支持按需加载

## 🔄 回滚计划

如果重构失败，可以快速回滚：

```bash
# 恢复旧文件
git checkout HEAD~1 src/lib/i18n.ts

# 删除新文件
rm -rf src/lib/i18n/

# 重新构建
npm run build
```

## 📅 时间估算

- **总时间**: 6-9 小时
- **最佳时机**: 周末或开发空闲期
- **建议**: 分两天完成，第一天准备和提取，第二天集成和测试

---

**创建时间**: 2026-02-15
**状态**: 待执行
**优先级**: 高（解决当前构建问题）
