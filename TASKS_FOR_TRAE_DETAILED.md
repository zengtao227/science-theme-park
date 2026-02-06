# 🎯 TRAE 详细任务指南 - Mission T-Rename
## 命名规范统一协作任务

**任务代号**: Mission T-Rename  
**优先级**: P0 (最高优先级)  
**预计时间**: 3.5 小时  
**协作模式**: 与 Kiro 并行执行  
**开始时间**: 等待 Kiro 完成任务 K1 后开始

---

## 📊 任务概览

你需要完成 6 个主要任务，重命名和更新 49 个模块及其相关文件。

**核心目标**: 将所有模块命名统一为规范格式
- 数学: `s1-01` → `sm1-01`, `g1-01` → `gm1-01`
- 物理: `p1-02` → `sp1-02`, `p5-01` → `gp5-01`
- 化学: `c1-01` → `sc1-01`

---

## 🤖 NVIDIA 模型使用建议

### 何时使用 NVIDIA 模型

**推荐使用场景**:
1. **批量文本替换** (任务 T4, T5) - 使用 NVIDIA 模型生成正则表达式
2. **文档更新** (任务 T6) - 使用 NVIDIA 模型批量更新模块列表
3. **验证检查** - 使用 NVIDIA 模型检查是否有遗漏

**如何调用**:
```
使用 .agent/workflows/nvidia-chat.md 中的工作流
向 NVIDIA 模型提问，获取批量处理方案
```

**不推荐使用场景**:
- 文件重命名 (使用 smartRelocate 更可靠)
- 代码编译测试 (使用本地工具)

---

## 📋 任务 T1: 物理模块重命名 (45 分钟)

### ⏰ 开始条件
**等待 Kiro 完成任务 K1** - Kiro 会告诉你哪些模块需要重命名

### 🎯 目标
重命名 12 个物理模块文件夹

### 📝 详细步骤

#### Step 1.1: 等待 Kiro 的确认消息
Kiro 会发送类似这样的消息：
```
"Trae，K1 完成！以下模块需要重命名：
- p1-02 → sp1-02 ✅
- p1-03 → sp1-03 ✅
- p1-04 → sp1-04 ✅
- p1-05 → 删除（与 sp1-05 重复）❌
- p2-01 → sp2-01 ✅
... 
开始执行 T1！"
```

#### Step 1.2: 使用 smartRelocate 重命名模块
对于每个需要重命名的模块，执行：

```typescript
// 示例 1: p1-02 → sp1-02
smartRelocate("src/app/chamber/p1-02", "src/app/chamber/sp1-02")

// 示例 2: p1-03 → sp1-03
smartRelocate("src/app/chamber/p1-03", "src/app/chamber/sp1-03")

// 示例 3: p5-01 → gp5-01
smartRelocate("src/app/chamber/p5-01", "src/app/chamber/gp5-01")
```

**完整列表** (根据 Kiro 的确认调整):
```typescript
smartRelocate("src/app/chamber/p1-02", "src/app/chamber/sp1-02")
smartRelocate("src/app/chamber/p1-03", "src/app/chamber/sp1-03")
smartRelocate("src/app/chamber/p1-04", "src/app/chamber/sp1-04")
// p1-05 可能需要删除，等待 Kiro 确认
smartRelocate("src/app/chamber/p2-01", "src/app/chamber/sp2-01")
// p2-02 可能需要删除，等待 Kiro 确认
smartRelocate("src/app/chamber/p3-01", "src/app/chamber/sp3-01")
smartRelocate("src/app/chamber/p3-02", "src/app/chamber/sp3-02")
// p5-01 可能需要删除，等待 Kiro 确认
// p5-02 可能需要删除，等待 Kiro 确认
smartRelocate("src/app/chamber/p5-03", "src/app/chamber/gp5-03")
smartRelocate("src/app/chamber/p5-04", "src/app/chamber/gp5-04")
```

#### Step 1.3: 验证重命名结果
```bash
# 检查新文件夹是否存在
ls -la src/app/chamber/ | grep "sp1-02"
ls -la src/app/chamber/ | grep "gp5-03"

# 检查旧文件夹是否已删除
ls -la src/app/chamber/ | grep "p1-02"  # 应该没有结果
```

#### Step 1.4: 运行编译测试
```bash
npm run build
```

如果有错误，检查是否有遗漏的引用。

### ✅ 完成标准
- [ ] 所有物理模块文件夹重命名完成
- [ ] 旧文件夹已删除
- [ ] 编译无错误
- [ ] 向 Kiro 报告完成

---

## 📋 任务 T2: 化学模块重命名 (15 分钟)

### 🎯 目标
重命名 4 个化学模块文件夹

### 📝 详细步骤

#### Step 2.1: 使用 smartRelocate 重命名

```typescript
smartRelocate("src/app/chamber/c1-01", "src/app/chamber/sc1-01")
smartRelocate("src/app/chamber/c1-02", "src/app/chamber/sc1-02")
smartRelocate("src/app/chamber/c2-01", "src/app/chamber/sc2-01")
smartRelocate("src/app/chamber/c3-01", "src/app/chamber/sc3-01")
```

#### Step 2.2: 验证
```bash
ls -la src/app/chamber/ | grep "sc1-01"
ls -la src/app/chamber/ | grep "sc1-02"
ls -la src/app/chamber/ | grep "sc2-01"
ls -la src/app/chamber/ | grep "sc3-01"
```

#### Step 2.3: 编译测试
```bash
npm run build
```

### ✅ 完成标准
- [ ] 4 个化学模块重命名完成
- [ ] 编译无错误

---

## 📋 任务 T3: 组件文件夹同步重命名 (45 分钟)

### 🎯 目标
同步重命名 `src/components/chamber/` 下的所有组件文件夹

### 📝 详细步骤

#### Step 3.1: 检查哪些模块有组件文件夹
```bash
ls -la src/components/chamber/
```

#### Step 3.2: 批量重命名组件文件夹

**数学模块组件** (约 15 个):
```typescript
smartRelocate("src/components/chamber/s1-01", "src/components/chamber/sm1-01")
smartRelocate("src/components/chamber/s1-02", "src/components/chamber/sm1-02")
smartRelocate("src/components/chamber/s2-01", "src/components/chamber/sm2-01")
smartRelocate("src/components/chamber/s2-02", "src/components/chamber/sm2-02")
smartRelocate("src/components/chamber/s2-03", "src/components/chamber/sm2-03")
smartRelocate("src/components/chamber/s2-04", "src/components/chamber/sm2-04")
smartRelocate("src/components/chamber/s2-05", "src/components/chamber/sm2-05")
smartRelocate("src/components/chamber/s2-06", "src/components/chamber/sm2-06")
smartRelocate("src/components/chamber/s2-07", "src/components/chamber/sm2-07")
smartRelocate("src/components/chamber/s3-01", "src/components/chamber/sm3-01")
smartRelocate("src/components/chamber/s3-02", "src/components/chamber/sm3-02")
smartRelocate("src/components/chamber/s3-03", "src/components/chamber/sm3-03")
smartRelocate("src/components/chamber/s3-04", "src/components/chamber/sm3-04")

smartRelocate("src/components/chamber/g1-01", "src/components/chamber/gm1-01")
smartRelocate("src/components/chamber/g2-01", "src/components/chamber/gm2-01")
smartRelocate("src/components/chamber/g3-01", "src/components/chamber/gm3-01")
smartRelocate("src/components/chamber/g4-01", "src/components/chamber/gm4-01")
smartRelocate("src/components/chamber/g5-01", "src/components/chamber/gm5-01")
smartRelocate("src/components/chamber/gs1-01", "src/components/chamber/gms1-01")
```

**物理模块组件** (约 10 个):
```typescript
smartRelocate("src/components/chamber/p1-02", "src/components/chamber/sp1-02")
smartRelocate("src/components/chamber/p1-03", "src/components/chamber/sp1-03")
smartRelocate("src/components/chamber/p1-04", "src/components/chamber/sp1-04")
smartRelocate("src/components/chamber/p2-01", "src/components/chamber/sp2-01")
smartRelocate("src/components/chamber/p3-01", "src/components/chamber/sp3-01")
smartRelocate("src/components/chamber/p3-02", "src/components/chamber/sp3-02")
smartRelocate("src/components/chamber/p5-03", "src/components/chamber/gp5-03")
smartRelocate("src/components/chamber/p5-04", "src/components/chamber/gp5-04")
```

**化学模块组件** (约 4 个):
```typescript
smartRelocate("src/components/chamber/c1-01", "src/components/chamber/sc1-01")
smartRelocate("src/components/chamber/c1-02", "src/components/chamber/sc1-02")
smartRelocate("src/components/chamber/c2-01", "src/components/chamber/sc2-01")
smartRelocate("src/components/chamber/c3-01", "src/components/chamber/sc3-01")
```

#### Step 3.3: 验证
```bash
# 检查新组件文件夹
ls -la src/components/chamber/ | grep "sm"
ls -la src/components/chamber/ | grep "gm"
ls -la src/components/chamber/ | grep "sp"
ls -la src/components/chamber/ | grep "sc"

# 确认旧文件夹已删除
ls -la src/components/chamber/ | grep "^d.*\sp1-"  # 应该没有结果
```

#### Step 3.4: 编译测试
```bash
npm run build
```

### ✅ 完成标准
- [ ] 所有组件文件夹重命名完成
- [ ] 编译无错误

---

## 📋 任务 T4: 首页链接批量更新 (30 分钟)

### 🎯 目标
更新 `src/app/page.tsx` 中的 49 个模块链接

### 🤖 推荐使用 NVIDIA 模型
这个任务非常适合使用 NVIDIA 模型生成批量替换脚本！

#### Step 4.1: 向 NVIDIA 模型提问
```
请帮我生成一个 strReplace 批量替换脚本，用于更新 src/app/page.tsx 中的模块链接：

需要替换的模式：
- /chamber/s1-01 → /chamber/sm1-01
- /chamber/s2-01 → /chamber/sm2-01
- /chamber/g1-01 → /chamber/gm1-01
- /chamber/p1-02 → /chamber/sp1-02
- /chamber/p5-01 → /chamber/gp5-01
- /chamber/c1-01 → /chamber/sc1-01

请生成完整的 49 个 strReplace 调用。
```

### 📝 详细步骤

#### Step 4.2: 手动方法（如果不使用 NVIDIA）

打开 `src/app/page.tsx`，使用编辑器的查找替换功能：

**数学模块链接** (20 个):
```
查找: /chamber/s1-01
替换: /chamber/sm1-01

查找: /chamber/s1-02
替换: /chamber/sm1-02

查找: /chamber/s2-01
替换: /chamber/sm2-01
... (重复 20 次)
```

**或者使用 strReplace**:
```typescript
strReplace({
  path: "src/app/page.tsx",
  oldStr: '/chamber/s1-01',
  newStr: '/chamber/sm1-01'
})

strReplace({
  path: "src/app/page.tsx",
  oldStr: '/chamber/s2-01',
  newStr: '/chamber/sm2-01'
})

// ... 重复 49 次
```

#### Step 4.3: 验证链接更新
```bash
# 检查是否还有旧链接
grep -n "/chamber/s1-" src/app/page.tsx  # 应该没有结果
grep -n "/chamber/p1-" src/app/page.tsx  # 应该没有结果
grep -n "/chamber/c1-" src/app/page.tsx  # 应该没有结果

# 检查新链接是否存在
grep -n "/chamber/sm" src/app/page.tsx
grep -n "/chamber/sp" src/app/page.tsx
grep -n "/chamber/sc" src/app/page.tsx
```

#### Step 4.4: 测试首页
```bash
npm run dev
```
访问 http://localhost:3000，点击几个模块链接，确认跳转正常。

### ✅ 完成标准
- [ ] 所有 49 个链接更新完成
- [ ] 无旧链接残留
- [ ] 首页可正常访问
- [ ] 模块链接跳转正常

---

## 📋 任务 T5: 模块内 i18n Key 更新 (45 分钟)

### 🎯 目标
更新所有重命名模块中的 `t()` 调用

### 🤖 强烈推荐使用 NVIDIA 模型
这是最适合使用 NVIDIA 模型的任务！

#### Step 5.1: 向 NVIDIA 模型提问
```
我需要批量更新所有模块中的 i18n key 调用。

例如：
- 在 src/app/chamber/sm2-01/page.tsx 中
- 将 t("s2_01.xxx") 替换为 t("sm2_01.xxx")

请帮我生成一个脚本，对以下模块进行批量替换：
1. sm1-01 到 sm3-04 (数学模块)
2. gm1-01 到 gm5-01 (高级数学)
3. sp1-02 到 sp4-01 (物理模块)
4. gp5-01 到 gp5-04 (高级物理)
5. sc1-01 到 sc3-01 (化学模块)

请使用 grepSearch 找到所有需要替换的文件，然后使用 strReplace 批量替换。
```

### 📝 详细步骤

#### Step 5.2: 手动方法（如果不使用 NVIDIA）

对于每个重命名的模块：

**示例 1: sm2-01**
```typescript
// 1. 搜索文件中的旧 key
grepSearch({
  query: 't\\("s2_01',
  includePattern: 'src/app/chamber/sm2-01/**/*.tsx'
})

// 2. 替换
strReplace({
  path: "src/app/chamber/sm2-01/page.tsx",
  oldStr: 't("s2_01.',
  newStr: 't("sm2_01.'
})
```

**示例 2: gm3-01**
```typescript
grepSearch({
  query: 't\\("g3_01',
  includePattern: 'src/app/chamber/gm3-01/**/*.tsx'
})

strReplace({
  path: "src/app/chamber/gm3-01/page.tsx",
  oldStr: 't("g3_01.',
  newStr: 't("gm3_01.'
})
```

**示例 3: sp1-02**
```typescript
grepSearch({
  query: 't\\("p1_02',
  includePattern: 'src/app/chamber/sp1-02/**/*.tsx'
})

strReplace({
  path: "src/app/chamber/sp1-02/page.tsx",
  oldStr: 't("p1_02.',
  newStr: 't("sp1_02.'
})
```

#### Step 5.3: 批量处理所有模块

**数学模块** (20 个):
```
s2_01 → sm2_01
s2_02 → sm2_02
... (重复 20 次)
```

**物理模块** (12 个):
```
p1_02 → sp1_02
p1_03 → sp1_03
... (重复 12 次)
```

**化学模块** (4 个):
```
c1_01 → sc1_01
c1_02 → sc1_02
c2_01 → sc2_01
c3_01 → sc3_01
```

#### Step 5.4: 验证
```bash
# 检查是否还有旧 key
grep -r 't("s2_01' src/app/chamber/  # 应该没有结果
grep -r 't("p1_02' src/app/chamber/  # 应该没有结果
grep -r 't("c1_01' src/app/chamber/  # 应该没有结果

# 检查新 key 是否存在
grep -r 't("sm2_01' src/app/chamber/
grep -r 't("sp1_02' src/app/chamber/
grep -r 't("sc1_01' src/app/chamber/
```

#### Step 5.5: 编译测试
```bash
npm run build
```

### ✅ 完成标准
- [ ] 所有模块的 i18n key 更新完成
- [ ] 无旧 key 残留
- [ ] 编译无错误
- [ ] 三语切换正常

---

## 📋 任务 T6: 文档辅助更新 (30 分钟)

### 🎯 目标
更新 3 个报告文档中的模块引用

### 🤖 推荐使用 NVIDIA 模型
使用 NVIDIA 模型批量生成文档更新内容。

### 📝 详细步骤

#### Step 6.1: 更新 MODULE_COMPLETION_REPORT.md

打开文件，使用查找替换：
```
查找: s1-01
替换: sm1-01

查找: s2-01
替换: sm2-01

查找: g3-01
替换: gm3-01

查找: p1-02
替换: sp1-02

查找: c1-01
替换: sc1-01

... (重复所有模块)
```

#### Step 6.2: 更新 CONTENT_QUALITY_REPORT.md

同样的查找替换操作。

#### Step 6.3: 更新 FINAL_SUMMARY_REPORT.md

同样的查找替换操作。

#### Step 6.4: 验证文档
```bash
# 检查是否还有旧模块名
grep "s2-01" MODULE_COMPLETION_REPORT.md  # 应该没有结果
grep "p1-02" CONTENT_QUALITY_REPORT.md  # 应该没有结果
grep "c1-01" FINAL_SUMMARY_REPORT.md  # 应该没有结果
```

### ✅ 完成标准
- [ ] 3 个文档更新完成
- [ ] 无旧模块名残留

---

## 🎯 最终验收清单

### 必须完成 (P0)
- [ ] 任务 T1: 12 个物理模块重命名完成
- [ ] 任务 T2: 4 个化学模块重命名完成
- [ ] 任务 T3: 36 个组件文件夹重命名完成
- [ ] 任务 T4: 49 个首页链接更新完成
- [ ] 任务 T5: 所有模块 i18n key 更新完成
- [ ] 任务 T6: 3 个文档更新完成

### 质量检查
- [ ] 运行 `npm run build` - 编译成功
- [ ] 运行 `npm run lint` - 零警告
- [ ] 访问首页 - 所有链接正常
- [ ] 测试 3 个随机模块 - 功能正常
- [ ] 测试三语切换 - 正常工作

### 报告给 Kiro
完成后，向 Kiro 发送完成报告：
```
Kiro，Mission T-Rename 完成！

完成情况：
✅ T1: 12 个物理模块重命名
✅ T2: 4 个化学模块重命名
✅ T3: 36 个组件文件夹重命名
✅ T4: 49 个首页链接更新
✅ T5: 所有 i18n key 更新
✅ T6: 3 个文档更新

测试结果：
✅ 编译成功
✅ ESLint 零警告
✅ 首页链接正常
✅ 模块功能正常
✅ 三语切换正常

准备进行最终验收！
```

---

## 🚨 常见问题与解决方案

### 问题 1: smartRelocate 失败
**症状**: 提示文件不存在或权限错误

**解决方案**:
1. 检查源路径是否正确
2. 检查目标路径是否已存在
3. 尝试手动删除目标文件夹后重试

### 问题 2: 编译错误
**症状**: `npm run build` 失败

**解决方案**:
1. 检查错误信息，找到具体文件
2. 检查是否有遗漏的 import 引用
3. 运行 `npm run lint` 查看详细错误

### 问题 3: 首页链接 404
**症状**: 点击模块链接后显示 404

**解决方案**:
1. 检查链接路径是否正确
2. 检查模块文件夹是否存在
3. 清除浏览器缓存后重试

### 问题 4: i18n key 不工作
**症状**: 页面显示 key 而不是翻译文本

**解决方案**:
1. 检查 src/lib/i18n.ts 中是否有对应的 key
2. 检查 key 的拼写是否正确
3. 等待 Kiro 完成 K3 任务（更新 i18n.ts）

---

## 📞 需要帮助？

如果遇到任何问题：
1. 立即通知 Kiro
2. 描述具体的错误信息
3. 说明已经尝试的解决方案

**Kiro 会随时协助你！**

---

## 🎉 完成后

恭喜完成 Mission T-Rename！

你的工作对项目的命名规范统一至关重要。

**下一步**: 等待 Kiro 完成最终验收，然后我们一起庆祝！🎊

---

**制定人**: Kiro AI  
**执行人**: Trae AI  
**日期**: 2026-02-06  
**状态**: 📋 准备执行
