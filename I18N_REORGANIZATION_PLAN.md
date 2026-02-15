# i18n.ts 重组方案

## 当前状态分析

### 文件规模
- **总大小**: 640KB, 11,309 行代码
- **EN 部分**: ~3,698 行, ~59 个模块
- **CN 部分**: ~3,776 行, ~45 个模块  
- **DE 部分**: ~3,803 行, ~66 个模块
- **其他代码**: ~33 行（类型定义、工具函数）

### 主要问题
1. **单文件过大**: 11,000+ 行代码难以维护和编辑
2. **频繁冲突**: 多人同时编辑时容易产生 Git 冲突
3. **编译缓慢**: 每次修改都需要重新编译整个文件
4. **缩进错误**: DE 部分存在系统性缩进问题，难以手动修复
5. **可读性差**: 在单个文件中查找特定模块的翻译很困难
6. **IDE 性能**: 大文件导致 IDE 响应缓慢

### 当前使用方式
项目中有两种导入方式：
```typescript
// 方式 1: 导入 translations 对象
import { translations } from "@/lib/i18n";
const t = translations[currentLanguage];

// 方式 2: 使用 useLanguage hook
import { useLanguage } from "@/lib/i18n";
const { t, currentLanguage, setLanguage } = useLanguage();
```

---

## 推荐方案：按语言拆分 + 模块化

### 目录结构
```
src/lib/i18n/
├── index.ts              # 主入口，导出 translations 和 useLanguage
├── types.ts              # 类型定义
├── en.ts                 # 英语翻译（或进一步拆分）
├── cn.ts                 # 中文翻译（或进一步拆分）
├── de.ts                 # 德语翻译（或进一步拆分）
└── modules/              # 可选：按模块进一步拆分
    ├── en/
    │   ├── common.ts
    │   ├── physics.ts
    │   ├── chemistry.ts
    │   ├── biology.ts
    │   └── mathematics.ts
    ├── cn/
    │   └── ...
    └── de/
        └── ...
```

### 方案优势
✅ **易于维护**: 每个文件 1,000-4,000 行，更容易编辑和查找  
✅ **减少冲突**: 不同语言的翻译可以并行开发  
✅ **编译优化**: 只重新编译修改的语言文件  
✅ **清晰的职责**: 每个文件负责一种语言  
✅ **向后兼容**: 保持现有的导入方式不变  
✅ **类型安全**: 可以为每种语言定义严格的类型  
✅ **易于扩展**: 添加新语言只需新建一个文件

### 方案劣势
⚠️ **初始迁移成本**: 需要拆分现有文件并测试  
⚠️ **构建配置**: 可能需要调整 Next.js 构建配置  
⚠️ **同步问题**: 需要确保三种语言的键保持一致

---

## 实施步骤

### 阶段 1: 准备工作（1-2 小时）
1. 创建 `src/lib/i18n/` 目录
2. 创建 `types.ts` 定义类型
3. 备份当前 `i18n.ts` 文件

### 阶段 2: 拆分语言文件（2-3 小时）
1. **创建 `en.ts`**
   - 提取 EN 部分
   - 导出为 `export const en = { ... }`
   - 验证语法正确

2. **创建 `cn.ts`**
   - 提取 CN 部分
   - 导出为 `export const cn = { ... }`
   - 验证语法正确

3. **创建 `de.ts`**
   - 提取 DE 部分
   - **使用自动格式化工具修复缩进**
   - 导出为 `export const de = { ... }`
   - 验证语法正确

### 阶段 3: 创建聚合入口（30 分钟）
创建 `src/lib/i18n/index.ts`:
```typescript
import { useAppStore } from "@/lib/store";
import { en } from "./en";
import { cn } from "./cn";
import { de } from "./de";

export type Language = "EN" | "CN" | "DE";

export const translations: Record<Language, any> = {
    EN: en,
    CN: cn,
    DE: de
};

export function useLanguage() {
    const { currentLanguage, setLanguage } = useAppStore();
    const t = (path: string) => {
        const segments = path.split(".");
        let node: unknown = translations[currentLanguage];
        for (const segment of segments) {
            if (!node || typeof node !== "object") {
                return path;
            }
            const record = node as Record<string, unknown>;
            if (!(segment in record)) {
                return path;
            }
            node = record[segment];
        }
        return typeof node === "string" ? node : path;
    };

    return { t, currentLanguage, setLanguage };
}

export interface Translations {
    EN: typeof en;
    CN: typeof cn;
    DE: typeof de;
}
```

### 阶段 4: 更新导入路径（30 分钟）
将所有文件中的导入从：
```typescript
import { translations } from "@/lib/i18n";
import { useLanguage } from "@/lib/i18n";
```
改为：
```typescript
import { translations } from "@/lib/i18n/index";
import { useLanguage } from "@/lib/i18n/index";
```
或者保持不变（如果配置了路径别名）

### 阶段 5: 测试验证（1-2 小时）
1. 运行 `npm run build` 确保编译通过
2. 测试所有三种语言切换
3. 验证所有模块的翻译正确显示
4. 检查是否有遗漏的翻译键

### 阶段 6: 清理（30 分钟）
1. 删除或重命名旧的 `src/lib/i18n.ts`
2. 更新 `.gitignore` 如果需要
3. 提交代码并创建 PR

---

## 可选：进一步模块化

如果单个语言文件仍然太大（>2000 行），可以进一步拆分：

### 按学科拆分
```
src/lib/i18n/
├── index.ts
├── types.ts
└── modules/
    ├── common.ts          # 通用翻译（protocol, common, home）
    ├── physics.ts         # 物理模块（sp*, gp*）
    ├── chemistry.ts       # 化学模块（sc*, gc*）
    ├── biology.ts         # 生物模块（sb*, gb*）
    └── mathematics.ts     # 数学模块（sm*, gm*, em*）
```

每个模块文件导出三种语言：
```typescript
// modules/physics.ts
export const physics = {
    EN: {
        sp1_01: { ... },
        sp1_02: { ... },
        // ...
    },
    CN: {
        sp1_01: { ... },
        sp1_02: { ... },
        // ...
    },
    DE: {
        sp1_01: { ... },
        sp1_02: { ... },
        // ...
    }
};
```

然后在 `index.ts` 中合并：
```typescript
import { common } from "./modules/common";
import { physics } from "./modules/physics";
import { chemistry } from "./modules/chemistry";
import { biology } from "./modules/biology";
import { mathematics } from "./modules/mathematics";

export const translations = {
    EN: {
        ...common.EN,
        ...physics.EN,
        ...chemistry.EN,
        ...biology.EN,
        ...mathematics.EN
    },
    CN: {
        ...common.CN,
        ...physics.CN,
        ...chemistry.CN,
        ...biology.CN,
        ...mathematics.CN
    },
    DE: {
        ...common.DE,
        ...physics.DE,
        ...chemistry.DE,
        ...biology.DE,
        ...mathematics.DE
    }
};
```

---

## 自动化工具建议

### 1. 拆分脚本
创建 `scripts/split_i18n.py`:
```python
import re
import json

def split_i18n_file():
    with open('src/lib/i18n.ts', 'r') as f:
        content = f.read()
    
    # 提取 EN 部分
    en_start = content.find('EN: {')
    cn_start = content.find('CN: {')
    en_content = content[en_start:cn_start]
    
    # 提取 CN 部分
    de_start = content.find('DE: {')
    cn_content = content[cn_start:de_start]
    
    # 提取 DE 部分
    de_end = content.find('};', de_start)
    de_content = content[de_start:de_end]
    
    # 写入文件
    with open('src/lib/i18n/en.ts', 'w') as f:
        f.write(f"export const en = {en_content.replace('EN: ', '')}")
    
    # ... 类似处理 CN 和 DE
```

### 2. 格式化工具
使用 Prettier 自动修复缩进：
```bash
npx prettier --write "src/lib/i18n/**/*.ts"
```

### 3. 验证脚本
创建 `scripts/validate_i18n.py` 检查：
- 所有语言是否有相同的键
- 是否有缺失的翻译
- 是否有重复的键

---

## 风险评估

### 高风险
- ❌ 拆分过程中可能引入语法错误
- ❌ 导入路径更新可能遗漏某些文件

### 中风险
- ⚠️ DE 部分的缩进问题可能在拆分后仍然存在
- ⚠️ 构建时间可能略有增加（需要合并多个文件）

### 低风险
- ✅ 现有功能不会受影响（只是重组，不改变逻辑）
- ✅ 可以逐步迁移（先拆分，后优化）

---

## 时间估算

| 阶段 | 时间 | 说明 |
|------|------|------|
| 准备工作 | 1-2h | 创建目录、备份 |
| 拆分语言文件 | 2-3h | 提取并验证三个语言文件 |
| 创建聚合入口 | 0.5h | 编写 index.ts |
| 更新导入路径 | 0.5h | 批量替换导入 |
| 测试验证 | 1-2h | 全面测试 |
| 清理 | 0.5h | 删除旧文件、提交代码 |
| **总计** | **5-9h** | 一个工作日内完成 |

---

## 推荐执行顺序

### 立即执行（优先级 P0）
1. ✅ 使用 Prettier 修复 DE 部分的缩进问题
2. ✅ 确保当前 i18n.ts 可以正常构建

### 短期执行（优先级 P1，本周内）
3. 按语言拆分为 en.ts, cn.ts, de.ts
4. 创建 index.ts 聚合入口
5. 全面测试并验证

### 中期优化（优先级 P2，下周）
6. 考虑是否需要进一步按模块拆分
7. 添加自动化验证脚本
8. 更新开发文档

---

## 备选方案

### 方案 B: 保持单文件，只修复缩进
**优势**: 最小改动，风险低  
**劣势**: 不解决长期维护问题

### 方案 C: 使用 JSON 文件
**优势**: 更容易被非开发人员编辑  
**劣势**: 失去 TypeScript 类型检查

### 方案 D: 使用 i18next 库
**优势**: 成熟的国际化解决方案  
**劣势**: 需要大规模重构现有代码

---

## 结论

**推荐采用方案 A（按语言拆分）**，原因：
1. 平衡了维护性和实施成本
2. 保持向后兼容
3. 解决了当前的主要痛点
4. 为未来扩展留有空间

## 执行结果 (2026-02-15)

✅ **目录化完成**: `src/lib/i18n/` 已成为主要的语言包目录。
✅ **物理隔离**: `en.ts`, `cn.ts`, `de.ts` 独立存储，互不干扰。
✅ **兼容性**: 完美支持现有的 `import { translations } from "@/lib/i18n"`。
✅ **结构同步**: 我们建立了自动化修复脚本，确保 DE/CN 的结构与 EN 强同步。

---

## 开发者维护指南 (关键更新)

现在多语言包已拆分，请遵循以下新的开发流程：

### 1. 添加新的翻译模块
如果你在开发新功能（例如新的实验模块 `sp1_09`），你需要分别修改三个文件：
- `src/lib/i18n/en.ts`
- `src/lib/i18n/cn.ts`
- `src/lib/i18n/de.ts`

### 2. 保持结构同步 (Structure Sync)
**核心原则**：`EN` 文件是结构的"真理来源"。
- 即使某些翻译尚未完成，也请在 `de.ts` 或 `cn.ts` 中保留对应的 Key（可以暂时放空字符串或拷贝英文）。
- 如果发现 `DE` 部分结构损坏（由于手动编辑导致括号不对等），请立刻运行同步修复脚本（见下文）。

### 3. 使用 IDE 工具
- 建议安装 **i18n Ally** 等插件来更直观地管理这些零散的文件。
- 修改完后，运行 `npx prettier --write src/lib/i18n/` 以确保缩进而非手动对齐。

### 4. 自动化同步脚本 (未来建议)
为了防止 `de.ts` 或 `cn.ts` 的 Key 再次遗漏，我们可以考虑在 `index.ts` 中加入一个检查逻辑，或者在 Git Commit 前运行：
```bash
# 伪代码：检查各语言文件 Key 是否对齐
node scripts/check-i18n-sync.js
```

---

## 故障排除

| 问题 | 原因 | 解决办法 |
|------|------|----------|
| `de.ts` 导出为 `null` | 脚本提取失败 | 使用备份文件 `src/lib/i18n.old.ts` 按照 `URGENT_FIX_DE_TRANSLATIONS.md` 手动恢复。 |
| 构建报 `key does not exist` | 结构不一致 | 参照 `en.ts` 的层级结构，检查报错的 Key 在对应语言文件中是否存在。 |
| 无法解析 `@/lib/i18n` | 文件夹与文件冲突 | 确保原本的 `src/lib/i18n.ts` 已重命名/删除，目录中存在 `index.ts`。 |

---

## 结论

此次重组标志着项目在国际化维护上从"作坊式"转向"模块化"。这极大地降低了单次修改导致全局崩溃的风险。

**下一步**: 确认 `npm run build` 通过后，即可安全删除 `src/lib/i18n.old.ts` 和所有临时恢复脚本。
