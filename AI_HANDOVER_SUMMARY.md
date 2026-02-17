# AI工作交接总结文档

**日期**: 2026-02-17  
**项目**: Science Theme Park - 巴塞尔教育平台  
**目的**: 为下一个AI提供完整的工作背景，避免重复错误

---

## 项目概况

### 基本信息
- **平台**: Next.js 16.1.5 + React 19.2.3 + TypeScript (strict mode)
- **语言支持**: EN/CN/DE 三语
- **模块总数**: 76个chamber模块
- **课程体系**: 
  - Lehrplan 21 (Zyklus 3, Sekundarstufe I) - 初中
  - Basel-Stadt Gymnasium - 高中

### 模块命名规则
- **SM**: Sekundarstufe Mathematik (初中数学)
- **GM**: Gymnasium Mathematik (高中数学)
- **SB**: Sekundarstufe Biologie (初中生物)
- **GB**: Gymnasium Biologie (高中生物)
- **SC**: Sekundarstufe Chemie (初中化学)
- **GC**: Gymnasium Chemie (高中化学)
- **SP**: Sekundarstufe Physik (初中物理)
- **GP**: Gymnasium Physik (高中物理)
- **EM**: Engineering/Mathematics (工程/数学)

---

## 已完成的工作

### 1. SB2.02 Body Systems 模块修复 ✅

**问题描述**:
- 只有3个stage×difficulty组合有题目（共12个组合）
- 使用旧的i18n模式
- 主页标题显示为"title"而不是实际名称

**已完成的修复**:
1. ✅ 添加了所有60个问题的翻译键（EN/CN/DE）
   - 文件: `src/lib/i18n/{en,cn,de}/biology.ts`
   - 包含: prompts, organs, functions, hints
   
2. ✅ 迁移到新的useLanguage() hook
   - 文件: `src/app/chamber/sb2-02-body-systems/page.tsx`
   - 从 `translations[currentLanguage]` 改为 `const { t } = useLanguage()`
   
3. ✅ 补全所有题目池
   - 3 stages (DIGESTIVE, CIRCULATORY, RESPIRATORY)
   - 4 difficulties (BASIC, CORE, ADVANCED, ELITE)
   - 每个组合5道题 = 60题总计
   
4. ✅ 修复主页标题显示
   - 添加 `sb2_02_title` 到 EN/CN/DE common.ts
   - 添加 `sb1_02_title` 到 EN/CN/DE common.ts

**提交记录**:
- `feat(sb2-02): add complete translation keys for all questions`
- `refactor(sb2-02): migrate to useLanguage() hook`
- `feat(sb2-02): complete all question pools for 12 stage×difficulty combinations`
- `fix(i18n): add missing title translations for SB1.02 and SB2.02 modules`

### 2. 模块质量审计 ⚠️ 部分完成，有重大发现

**创建的工具**:
- `scripts/audit-modules.js` - 自动审计脚本
- `module-audit-report.json` - 审计报告
- `MODULE_QUALITY_AUDIT_SUMMARY.md` - 审计总结

**重要发现 - 审计脚本的缺陷**:

我创建的审计脚本有严重的检测问题，导致误报。以下是关键教训：

#### 问题1: 无法检测`else if`模式
```javascript
// ❌ 审计脚本无法检测这种模式:
if (stage === "VARIABLES") {
    if (isBasic) {
        quests.push({ ... });  // 5题
    } else if (isCore) {
        quests.push({ ... });  // 5题
    } else if (isAdv) {
        quests.push({ ... });  // 5题
    } else {
        quests.push({ ... });  // 5题 (Elite)
    }
}
```

**受影响的模块** (有题目但被误报为空):
- SM1-02: 12个quests.push
- SM1-05: 12个quests.push
- SM2-02: 16个quests.push
- SM2-03: 3个quests.push
- SM2-05: 15个quests.push
- SM3-03: 12个quests.push

#### 问题2: 只能检测部分模式
审计脚本能检测的模式:
1. ✅ 独立的`if`块 + `quests.push()` (SB2.02模式)
2. ✅ 数组声明 + `return all.slice()` (SM1.01模式)
3. ❌ `if...else if...else`链 + `quests.push()` (SM1-02模式)

#### 实际模块状态（手动验证）

**确认有题目的模块** (9个):
1. SM1-01: 9题 (BASIC:2, CORE:3, ADVANCED:2, ELITE:2)
2. SM1-02: 有题目 (使用else if模式，审计脚本检测失败)
3. SM1-05: 有题目 (使用else if模式)
4. SM2-02: 有题目 (使用else if模式)
5. SM2-03: 有题目
6. SM2-04: 7题
7. SM2-05: 有题目 (使用else if模式)
8. SM2-10: 3题 (ELITE缺失)
9. SM3-03: 有题目 (使用else if模式)
10. SM3-05: 5题
11. SB2-02-body-systems: 12题 (刚修复)
12. SP3-06: 12题
13. GP2-01: 3题 (ELITE缺失)
14. GP2-02: 3题 (ELITE缺失)
15. GP3-01: 12题

**确认没有题目的模块** (手动检查):
- SM1-03: 0个quests.push
- SM1-04: 0个quests.push

### 3. 代码模式识别

项目中存在**三种**不同的题目生成模式：

#### 模式A: 独立if块 + quests.push (SB2.02)
```typescript
if (stage === "DIGESTIVE") {
    if (difficulty === "BASIC") {
        quests.push({ id: "D-B1", ... });
        quests.push({ id: "D-B2", ... });
    }
    if (difficulty === "CORE") {
        quests.push({ id: "D-C1", ... });
    }
}
```

#### 模式B: 数组 + slice返回 (SM1.01)
```typescript
const all: Quest[] = [
    { id: "A1", ... },
    { id: "A2", ... },
    { id: "A3", ... },
    { id: "A4", ... },
];
if (difficulty === "BASIC") return all.slice(0, 2);
if (difficulty === "CORE") return all.slice(0, 3);
return all;
```

#### 模式C: else if链 + quests.push (SM1-02)
```typescript
if (stage === "VARIABLES") {
    if (isBasic) {
        quests.push({ ... });
    } else if (isCore) {
        quests.push({ ... });
    } else if (isAdv) {
        quests.push({ ... });
    } else {
        quests.push({ ... });
    }
}
```

---

## 关键教训和避免的错误

### ❌ 错误1: 过度依赖自动化审计
**教训**: 不要完全信任自动化脚本的结果。我的审计脚本误报了大量"空模块"，实际上它们都有题目。

**正确做法**:
1. 先手动检查几个"问题"模块
2. 用简单的grep命令验证: `grep -c "quests.push" src/app/chamber/*/page.tsx`
3. 如果自动化结果与手动检查不符，优先相信手动检查

### ❌ 错误2: 假设代码模式统一
**教训**: 项目中有多种代码模式，不能假设所有模块都用同一种方式生成题目。

**正确做法**:
1. 先调查项目中有哪些模式
2. 为每种模式设计检测逻辑
3. 测试检测逻辑是否准确

### ❌ 错误3: 正则表达式的陷阱
**教训**: JavaScript正则表达式的标志位写法容易出错。

```javascript
// ❌ 错误写法
/pattern/s.test(str)  // 's'标志位位置错误

// ✅ 正确写法
/pattern/.test(str)   // 或使用 [\s\S]* 代替 .* 来匹配换行
```

### ✅ 正确的审计方法

```bash
# 1. 快速统计每个模块的quests.push数量
for file in src/app/chamber/*/page.tsx; do 
    echo "$file: $(grep -c 'quests.push' $file)"; 
done

# 2. 检查特定模块的代码结构
grep -A 5 "buildStagePool\|buildPool" src/app/chamber/sm1-02/page.tsx

# 3. 查找return语句
grep "return.*all\|return quests" src/app/chamber/sm1-01/page.tsx
```

---

## i18n系统说明

### 新旧模式对比

#### ❌ 旧模式 (已弃用)
```typescript
import { translations } from "@/lib/i18n";
const { currentLanguage } = useAppStore();
const t = translations[currentLanguage]?.module_key || translations.EN.module_key;
// 使用: t.title, t.stages.stage1
```

#### ✅ 新模式 (推荐)
```typescript
import { useLanguage } from "@/lib/i18n";
const { t } = useLanguage();
// 使用: t("module_key.title"), t("module_key.stages.stage1")
```

### 翻译文件结构
```
src/lib/i18n/
├── en/
│   ├── common.ts    # 主页、通用文本
│   ├── math.ts      # 数学模块
│   ├── biology.ts   # 生物模块
│   ├── chemistry.ts # 化学模块
│   └── physics.ts   # 物理模块
├── cn/ (同上)
└── de/ (同上)
```

### 翻译键命名规则
```typescript
// 主页模块标题
home.sm1_01_title: "SM1.01 // MODULE NAME"
home.sm1_01_subtitle: "Description"

// 模块内部翻译
sm1_01.title: "SM1.01 // MODULE NAME"
sm1_01.stages.stage_name: "STAGE NAME"
sm1_01.difficulty.basic: "BASIC" (EN) / "基础" (CN) / "BASIS" (DE)
sm1_01.prompts.question_id: "Question text"
sm1_01.hints.question_id: "Hint text"
```

---

## 文件路径参考

### 关键文件
```
项目根目录/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # 主页（模块列表）
│   │   └── chamber/
│   │       ├── sm1-01/page.tsx        # 各个模块
│   │       ├── sm1-02/page.tsx
│   │       └── ...
│   ├── lib/
│   │   └── i18n/
│   │       ├── en/common.ts           # 英文翻译
│   │       ├── cn/common.ts           # 中文翻译
│   │       └── de/common.ts           # 德文翻译
│   └── components/
│       └── chamber/                    # 模块特定组件
├── scripts/
│   └── audit-modules.js               # 审计脚本（有bug）
├── .kiro/specs/                       # 规格文档
│   ├── sb2-02-fixes/
│   └── module-quality-audit/
└── module-audit-report.json          # 审计报告（不准确）
```

---

## 下一步任务建议

### 任务1: 课程对照审查

**目标**: 对照 Lehrplan 21 和 Basel-Stadt Gymnasium 课程要求，检查模块覆盖度

**方法**:
1. 获取官方课程大纲
2. 列出所有必修知识点
3. 对照72个chamber模块
4. 识别缺失的主题

**注意事项**:
- 不要依赖我的审计脚本结果
- 手动检查每个模块的实际内容
- 使用grep命令快速验证

### 任务2: 题目质量审查

**需要检查的方面**:
1. **完整性**: 每个模块是否有4个difficulty级别的题目？
2. **数量**: 每个difficulty是否有足够的题目（建议5题以上）？
3. **难度梯度**: BASIC → CORE → ADVANCED → ELITE 是否有合理的难度递进？
4. **语言**: 所有题目是否都有EN/CN/DE三语翻译？
5. **准确性**: 题目内容是否符合课程标准？

**推荐的检查流程**:
```bash
# 1. 列出所有模块
ls src/app/chamber/

# 2. 对每个模块，检查quests.push数量
grep -c "quests.push" src/app/chamber/MODULE_NAME/page.tsx

# 3. 如果数量为0，检查是否使用数组模式
grep "const all.*Quest\[\]" src/app/chamber/MODULE_NAME/page.tsx

# 4. 查看实际题目内容
cat src/app/chamber/MODULE_NAME/page.tsx | less
```

### 任务3: 识别真正的空模块

**已知确认为空的模块**:
- SM1-03, SM1-04 (手动验证过)
- 其他需要逐个手动检查

**检查方法**:
```bash
# 快速检查所有模块
for dir in src/app/chamber/*/; do
    module=$(basename "$dir")
    count=$(grep -c "quests.push\|const all.*Quest\[\]" "$dir/page.tsx" 2>/dev/null || echo "0")
    if [ "$count" -eq 0 ]; then
        echo "⚠️  $module: 可能为空"
    fi
done
```

---

## 构建和测试

### 构建命令
```bash
npm run build    # 必须通过，0 errors
npm run lint     # 允许有warnings，但不能有新的errors
```

### 测试清单
- [ ] 构建成功
- [ ] 主页显示所有模块标题（不是"title"）
- [ ] 切换语言（EN/CN/DE）正常工作
- [ ] 每个模块的4个difficulty都有题目
- [ ] 没有"Module Complete!"错误提示

---

## Git提交规范

```bash
# 功能添加
git commit -m "feat(module-code): description"

# Bug修复
git commit -m "fix(module-code): description"

# 重构
git commit -m "refactor(module-code): description"

# 文档
git commit -m "docs: description"
```

---

## 联系信息和资源

### 课程标准文档
- Lehrplan 21: https://www.lehrplan21.ch/
- Basel-Stadt Gymnasium: 需要获取官方文档

### 项目状态文档
- `DEVELOPMENT_STATUS_2026-02-15.md`
- `CURRICULUM_PLAN_UPDATE_2026_v2.md`
- `CHAMBER_MODULE_STANDARDS.md` ⚠️ **必读！**

### ⚠️ 模块质量标准 (CHAMBER_MODULE_STANDARDS.md)

**这是最重要的文档！审查和创建模块时必须严格遵守！**

文件位置: `/Users/zengtao/science-theme-park/CHAMBER_MODULE_STANDARDS.md`

**核心标准总结**:

1. **混合模式 (Mixed Mode)**
   - 左侧习题 + 右侧可视化
   - 必须使用 `ChamberLayout` 和 `useQuestManager`
   - 可视化必须帮助理解概念，不能只是装饰

2. **难度系统**
   - 必须有 BASIC/CORE/ADVANCED/ELITE 四个难度
   - 每个难度必须有 **5 道题**（不是 4 道！）
   - 难度 = 概念深度，不是数量！
   - BASIC: 直接观察、单步计算、整数
   - CORE: 组合概念、多步计算、需要纸笔
   - ADVANCED: 条件问题、小数/分数、完整过程
   - ELITE: 综合策略、深入理解、多种方法

3. **国际化要求**
   - 必须支持 EN/CN/DE 三语
   - 中文 difficulty 必须显示"基础/核心/进阶/精英"
   - 德文 difficulty 必须显示"BASIS/KERN/ERWEITERT/ELITE"
   - 所有场景描述必须有完整翻译（150-250词）
   - 必须在浏览器中实际测试每种语言！

4. **场景描述要求**
   - 必须包含具体的人物/角色
   - 必须包含具体的地点（Basel相关）
   - 必须包含具体的情境和任务
   - 必须包含具体的数值和单位
   - 必须解释现实意义/为什么重要
   - 必须与学生生活连接
   - 最少长度: 3-5句话（80-150字）
   - 推荐长度: 5-8句话（150-250字）

5. **可视化要求**
   - 可视化必须直接展示当前题目的数据
   - 所有数学公式必须使用 LaTeX 渲染（`<InlineMath>` 或 `<BlockMath>`）
   - 必须实现自动缩放（动态计算边界和 scale）
   - 必须使用 50% 边距确保标签不超出
   - 标签绝对不能与向量线或坐标轴重叠
   - 必须实现 `getLabelOffset()` 智能定位函数

6. **题目设计要求**
   - 题目必须包含所有解题所需的信息
   - 禁止让学生猜测缺失的数据
   - 每个题目必须明确给出已知条件和求解目标

7. **代码质量要求**
   - 必须使用 `useLanguage()` hook（不是旧的 `translations[currentLanguage]`）
   - 必须使用 `useCallback` 包裹 `buildStagePool`
   - 答案保留 2 位小数，使用 `round2()` 函数
   - `npm run build` 必须通过才能提交

**关键教训（来自 GM3.01 和 GM4.01）**:

❌ **错误1**: 难度只改变数量（6→52→100→500个方块）
✅ **正确**: 难度改变概念深度（直接观察→构造组合→条件概率→补集策略）

❌ **错误2**: 所有阶段显示相同的可视化
✅ **正确**: 每个阶段的可视化匹配该阶段的概念

❌ **错误3**: 中文版本显示 "BASIC/CORE/ADVANCED/ELITE"
✅ **正确**: 中文必须显示"基础/核心/进阶/精英"

❌ **错误4**: 固定 scale 导致大数值超出可视范围
✅ **正确**: 动态计算边界和 scale，自动适配所有数值

❌ **错误5**: 标签与向量线或坐标轴重叠
✅ **正确**: 实现智能标签定位，避开轴线（±15°）

❌ **错误6**: 只有 4 题
✅ **正确**: 每个难度必须有 5 题

❌ **错误7**: 只看代码就说完成，不在浏览器中测试
✅ **正确**: 清除缓存，测试 EN/CN/DE 三种语言

**审查模块时的检查清单**:

- [ ] 每个难度有 5 道题？
- [ ] 难度递进是概念深度而非数量？
- [ ] 场景描述详细完整（150-250词）？
- [ ] 三语翻译完整（EN/CN/DE）？
- [ ] 中文 difficulty 显示"基础/核心/进阶/精英"？
- [ ] 所有数学公式使用 LaTeX 渲染？
- [ ] 可视化自动缩放，所有内容可见？
- [ ] 标签不与线和轴重叠？
- [ ] 在浏览器中测试过所有语言？
- [ ] `npm run build` 通过？

**详细内容请阅读**: `CHAMBER_MODULE_STANDARDS.md` (1667行，包含完整的设计标准、代码示例、反例分析)

---

## 最后的建议

1. **不要重复我的错误**: 不要过度依赖自动化脚本，先手动验证
2. **逐个检查**: 72个模块不算多，手动检查更可靠
3. **记录发现**: 创建详细的审查报告，包括每个模块的状态
4. **优先级**: 先检查初中模块（SM, SB, SC, SP），因为它们是基础
5. **测试**: 每次修改后都要运行`npm run build`确保没有破坏

祝你工作顺利！如果发现新的模式或问题，请更新这个文档。
