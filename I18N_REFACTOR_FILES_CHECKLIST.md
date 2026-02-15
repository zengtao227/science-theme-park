# i18n 重构所需文件清单

**目标**: 将单一的 `src/lib/i18n.ts` (11,538 行) 拆分为按语言和学科组织的多个小文件

**推荐方案**: 方案 A - 按语言拆分（详见 I18N_REFACTOR_PLAN.md）

---

## 📋 必需提供给 AI 的文件

### 1. 核心文件

#### `src/lib/i18n.ts` ⭐ 最重要
- **作用**: 当前的单一翻译文件，需要拆分
- **大小**: 11,538 行，~652KB
- **结构**: EN (line 6-3766) / CN (line 3767-7570) / DE (line 7571-11450)
- **内容**: 所有模块的三语言翻译

#### `I18N_REFACTOR_PLAN.md` ⭐ 重构方案
- **作用**: 详细的重构计划和目标结构
- **内容**: 
  - 当前问题分析
  - 三个重构方案对比
  - 推荐的目录结构
  - 实施步骤

### 2. 参考文件（了解项目结构）

#### `CURRICULUM_PLAN.md`
- **作用**: 了解所有模块的分类和命名规则
- **内容**: 
  - 数学模块 (SM*, GM*, EM*)
  - 物理模块 (SP*, GP*)
  - 化学模块 (SC*, GC*)
  - 生物模块 (SB*, GB*)

#### `CHAMBER_MODULE_STANDARDS.md`
- **作用**: 了解模块的标准字段结构
- **内容**: 每个模块应该包含哪些字段

#### `PROJECT_ARCHITECTURE.md`
- **作用**: 了解项目整体架构
- **内容**: 文件组织方式、导入规则

### 3. 示例页面文件（可选，用于验证）

选择 2-3 个代表性的页面，确保重构后的结构能正常工作：

#### `src/app/page.tsx`
- **作用**: 首页，使用 home 对象
- **验证**: home.filter_tags, home.search_label 等

#### `src/app/chamber/sb1-02/page.tsx`
- **作用**: 生物模块示例
- **验证**: sb1_02 的完整字段结构

#### `src/app/chamber/sm1-01/page.tsx`
- **作用**: 数学模块示例
- **验证**: sm1_01 的字段结构

---

## 🎯 AI 需要完成的任务

### 阶段 1: 分析和规划
1. 分析当前 i18n.ts 的结构
2. 确认所有模块的分类（数学/物理/化学/生物）
3. 设计新的目录结构

### 阶段 2: 创建新文件结构
按照以下结构创建文件：

```
src/lib/i18n/
├── index.ts              # 主入口，导出 translations 和 hooks
├── types.ts              # TypeScript 类型定义
├── en/
│   ├── index.ts          # EN 语言入口
│   ├── common.ts         # protocol, common, home, profile
│   ├── math.ts           # SM*, GM*, EM* 模块
│   ├── physics.ts        # SP*, GP* 模块
│   ├── chemistry.ts      # SC*, GC* 模块
│   └── biology.ts        # SB*, GB* 模块
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

### 阶段 3: 提取和分配内容
1. 从 i18n.ts 提取 EN 版本的内容
2. 按学科分类到对应文件
3. 对 CN 和 DE 版本重复此过程

### 阶段 4: 创建入口文件
1. 创建 `src/lib/i18n/index.ts`
2. 导入所有语言版本
3. 导出 translations 对象和 useLanguage hook
4. 确保 API 与原来完全一致

### 阶段 5: 验证和测试
1. 确保 TypeScript 编译通过
2. 运行 `npm run build` 验证构建
3. 检查示例页面是否正常工作

---

## 📝 给 AI 的具体指令

```
任务：将 src/lib/i18n.ts 重构为按语言和学科组织的多文件结构

要求：
1. 按照 I18N_REFACTOR_PLAN.md 中的方案 A 执行
2. 保持 API 完全兼容（其他文件不需要修改导入）
3. 每个文件不超过 2000 行
4. 保持所有字段和内容完整，不要遗漏
5. 确保 TypeScript 类型正确
6. 验证构建成功

步骤：
1. 阅读 I18N_REFACTOR_PLAN.md 了解目标结构
2. 阅读 CURRICULUM_PLAN.md 了解模块分类
3. 创建新的目录结构 src/lib/i18n/
4. 提取并分配内容到新文件
5. 创建主入口文件 index.ts
6. 删除旧的 src/lib/i18n.ts
7. 验证构建

注意事项：
- 保持原有的缩进和格式
- 不要修改任何翻译内容
- 确保所有模块都被正确分类
- common.ts 应包含：protocol, common, home, profile
- 每个学科文件只包含该学科的模块
```

---

## 🔍 验证清单

重构完成后，AI 应该验证：

- [ ] TypeScript 编译无错误
- [ ] `npm run build` 构建成功
- [ ] 所有 72 个页面都能生成
- [ ] 首页正常显示（验证 home 对象）
- [ ] 至少测试 3 个不同学科的页面
- [ ] 文件大小合理（每个文件 < 2000 行）
- [ ] 导入路径正确（从 @/lib/i18n 导入）
- [ ] 类型定义完整

---

## 📦 输出文件

AI 完成后应该提供：

1. **新的 i18n 目录** - 包含所有拆分后的文件
2. **迁移报告** - 说明每个模块被分配到哪个文件
3. **验证结果** - 构建日志和测试结果
4. **使用说明** - 如何使用新的结构（如果有变化）

---

## 💡 额外建议

如果 AI 在重构过程中发现问题，可以：
1. 报告不一致的模块命名
2. 建议优化的分类方式
3. 指出缺失或重复的字段
4. 提供性能优化建议

---

**准备好后，将以上所有文件提供给 AI，并附上具体指令部分的内容。**
