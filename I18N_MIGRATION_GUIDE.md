# i18n 迁移指南 - 高效转换方法

**创建日期**: 2026-02-17  
**基于**: GM1.01 转换经验

---

## 🎯 转换步骤（标准流程）

### 步骤1: 更新导入语句

**旧代码**:
```typescript
import { translations } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";

type ModuleT = typeof translations.EN.module_name;

export default function ModulePage() {
  const { currentLanguage, completeStage } = useAppStore();
  const t = translations[currentLanguage].module_name;
```

**新代码**:
```typescript
import { useLanguage } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";

// 删除 type ModuleT 行

export default function ModulePage() {
  const { completeStage, currentLanguage } = useAppStore(); // 如果需要currentLanguage
  const { t } = useLanguage();
```

### 步骤2: 创建模块翻译对象

在组件内部，useLanguage() 调用之后，创建完整的翻译对象：

```typescript
const { t } = useLanguage();

const module_t = {
  title: t("module_name.title"),
  description: t("module_name.description"),
  back: t("module_name.back"),
  check: t("module_name.check"),
  next: t("module_name.next"),
  correct: t("module_name.correct"),
  incorrect: t("module_name.incorrect"),
  ready: t("module_name.ready"),
  // ... 添加所有需要的字段
};
```

**关键技巧**: 
1. 先运行一次构建，看缺少哪些字段
2. 查看原始翻译文件 `src/lib/i18n/en/[subject].ts` 获取完整结构
3. 一次性添加所有字段，避免多次构建

### 步骤3: 批量替换 t. 为 module_t.

使用sed命令批量替换：

```bash
# 方法1: 替换所有 t. 为 module_t.
sed 's/\([^a-zA-Z_]\)t\./\1module_t./g' src/app/chamber/module/page.tsx > /tmp/temp.tsx && mv /tmp/temp.tsx src/app/chamber/module/page.tsx

# 方法2: 如果有特定模式（如 promptLatex: t.）
sed 's/promptLatex: t\./promptLatex: module_t./g' src/app/chamber/module/page.tsx > /tmp/temp.tsx && mv /tmp/temp.tsx src/app/chamber/module/page.tsx
```

### 步骤4: 处理 buildStagePool 函数

如果模块有 buildStagePool 函数在组件外部：

**选项A**: 传递翻译对象作为参数
```typescript
function buildStagePool(module_t: any, difficulty: Difficulty, stage: Stage): Quest[] {
  // 使用 module_t.xxx
}

// 在组件内调用
buildPool: (d, s) => buildStagePool(module_t, d, s)
```

**选项B**: 将函数移到组件内部（如果函数较小）

### 步骤5: 验证构建

```bash
npm run build
```

检查错误信息，补充缺失的翻译字段。

---

## ⚡ 快速检查清单

转换前检查：
- [ ] 模块使用 `translations[currentLanguage]` ✓
- [ ] 找到翻译文件位置 (en/cn/de)
- [ ] 识别所有使用的翻译键

转换后检查：
- [ ] 导入改为 `useLanguage()`
- [ ] 删除 `type ModuleT` 定义
- [ ] 创建完整的 module_t 对象
- [ ] 所有 `t.` 改为 `module_t.`
- [ ] buildStagePool 正确传递翻译
- [ ] `npm run build` 通过
- [ ] 浏览器测试三语切换

---

## 🔧 常见问题

### 问题1: 缺少翻译字段

**错误**: `Property 'xxx' does not exist on type ...`

**解决**: 查看原始翻译文件，添加缺失字段到 module_t 对象

### 问题2: buildStagePool 无法访问 module_t

**原因**: module_t 在组件内部定义，函数在外部

**解决**: 将 module_t 作为参数传递给函数

### 问题3: currentLanguage 未定义

**原因**: 某些模块需要 currentLanguage 做条件判断

**解决**: 从 useAppStore 导入: `const { currentLanguage } = useAppStore();`

---

## 📊 预计时间

- 简单模块（无 buildStagePool）: 5-10分钟
- 中等模块（有 buildStagePool）: 10-15分钟
- 复杂模块（多个辅助函数）: 15-20分钟

---

## 🎯 自动化脚本（可选）

创建一个辅助脚本来加速转换：

```bash
#!/bin/bash
# i18n-migrate.sh <module-path> <module-name>

MODULE_PATH=$1
MODULE_NAME=$2

# 1. 更新导入
sed -i 's/import { translations } from "@\/lib\/i18n";/import { useLanguage } from "@\/lib\/i18n";/g' $MODULE_PATH

# 2. 删除类型定义
sed -i '/type.*typeof translations\.EN\./d' $MODULE_PATH

# 3. 替换 t 定义
sed -i "s/const t = translations\[currentLanguage\]\.$MODULE_NAME;/const { t } = useLanguage();\n  const ${MODULE_NAME}_t = { \/* TODO: 添加翻译字段 *\/ };/g" $MODULE_PATH

# 4. 批量替换 t.
sed -i "s/\([^a-zA-Z_]\)t\./\1${MODULE_NAME}_t./g" $MODULE_PATH

echo "✓ 基础转换完成，请手动添加翻译字段并验证构建"
```

---

**最后更新**: 2026-02-17
