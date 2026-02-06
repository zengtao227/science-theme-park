# 🎯 执行计划 V2.0
## Science Theme Park - 命名规范统一与内容完善

**制定时间**: 2026-02-06  
**执行人**: Kiro AI  
**协作**: Trae AI (i18n 集成)

---

## 📋 重要发现

### ✅ 好消息：所有"缺失"模块实际上都存在！

之前报告的 7 个"缺失"模块实际上都已实现，只是命名不规范：

| 计划编号 | 实际文件夹 | 状态 |
|---------|-----------|------|
| SP1.02 | p1-02 | ✅ 存在，需重命名 |
| SP1.03 | p1-03 | ✅ 存在，需重命名 |
| SP3.01 | p3-01 | ✅ 存在，需重命名 |
| SC1.01 | c1-01 | ✅ 存在，需重命名 |
| SC1.02 | c1-02 | ✅ 存在，需重命名 |
| GP5.03 | p5-03 | ✅ 存在，需重命名 |
| GP5.04 | p5-04 | ✅ 存在，需重命名 |

**结论**: 不需要创建新模块，只需要统一命名规范！

---

## 🎯 核心任务

### 任务 1: 命名规范统一 (P0 - 最高优先级)

根据你的建议，采用以下命名规范：

**规则**:
- **SM** = Sek Math (初中数学)
- **GM** = Gym Math (高中数学)
- **SP** = Sek Physics (初中物理)
- **GP** = Gym Physics (高中物理)
- **SC** = Sek Chemistry (初中化学)
- **GC** = Gym Chemistry (高中化学)
- **SB** = Sek Biology (初中生物)
- **GB** = Gym Biology (高中生物)

**需要重命名的模块总数**: **49 个**

---

## 📊 详细重命名清单

### 1. 数学模块 (20 个)

#### Sekundarschule Math (13 个)
```bash
s1-01 → sm1-01  # Areas & Volumes
s1-02 → sm1-02  # Thales Theorem
s2-01 → sm2-01  # Binomial Formulas
s2-02 → sm2-02  # Pythagoras Theorem
s2-03 → sm2-03  # Linear Functions
s2-04 → sm2-04  # Similarity & Scaling
s2-05 → sm2-05  # Powers & Roots
s2-06 → sm2-06  # Linear Systems
s2-07 → sm2-07  # Coordinate Geometry
s3-01 → sm3-01  # Quadratics
s3-02 → sm3-02  # Trigonometry
s3-03 → sm3-03  # Exponential Growth
s3-04 → sm3-04  # Logarithmic Scales
```

#### Gymnasium Math (7 个)
```bash
g1-01 → gm1-01  # Calculus
g1-01-advanced → gm1-01-advanced  # Advanced Calculus
g2-01 → gm2-01  # Vector Geometry 3D
g3-01 → gm3-01  # Probability Vault
g4-01 → gm4-01  # Complex Numbers
g5-01 → gm5-01  # Matrix Geometry
gs1-01 → gms1-01  # Complex Fractal (特殊命名)
```

### 2. 物理模块 (12 个)

#### Sekundarschule Physics (6 个)
```bash
p1-02 → sp1-02  # Newton's Laws
p1-03 → sp1-03  # Energy & Power
p1-04 → sp1-04  # Time Dilation
p1-05 → sp1-05  # The Rhine Ferry (可能与 sp1-05 重复，需检查)
p2-01 → sp2-01  # Thermodynamics
p2-02 → sp2-02  # Circuit Sandbox (可能与 sp2-02 重复，需检查)
p3-01 → sp3-01  # Geometrical Optics
p3-02 → sp3-02  # Wave Optics
```

#### Gymnasium Physics (4 个)
```bash
p5-01 → gp5-01  # The Atomic Core (可能与 gp5-01 重复，需检查)
p5-02 → gp5-02  # Relativity Lab (可能与 gp5-02 重复，需检查)
p5-03 → gp5-03  # Particle Collider
p5-04 → gp5-04  # Quantum Tunnel
```

### 3. 化学模块 (4 个)

#### Sekundarschule Chemistry (4 个)
```bash
c1-01 → sc1-01  # Mystery Lab
c1-02 → sc1-02  # Mole Master
c2-01 → sc2-01  # Reaction Kinetics
c3-01 → sc3-01  # Molecular Architect
```

---

## ⚠️ 重复模块检查

### 需要检查的可能重复模块

在重命名前，需要先检查以下模块是否重复：

1. **p1-05** vs **sp1-05** (The Rhine Ferry)
2. **p2-02** vs **sp2-02** (Circuit Sandbox)
3. **p5-01** vs **gp5-01** (The Atomic Core)
4. **p5-02** vs **gp5-02** (Relativity Lab)

**检查方法**:
- 对比文件内容
- 检查 Canvas 组件
- 查看 i18n keys

**处理方案**:
- 如果内容相同 → 删除旧的 (p 开头的)，保留新的 (sp/gp 开头的)
- 如果内容不同 → 合并或保留更完善的版本

---

## 🔧 执行步骤

### Phase 1: 重复模块检查与清理 (30 分钟)

**步骤 1.1**: 检查 4 对可能重复的模块
```bash
# 对比文件内容
diff src/app/chamber/p1-05/page.tsx src/app/chamber/sp1-05/page.tsx
diff src/app/chamber/p2-02/page.tsx src/app/chamber/sp2-02/page.tsx
diff src/app/chamber/p5-01/page.tsx src/app/chamber/gp5-01/page.tsx
diff src/app/chamber/p5-02/page.tsx src/app/chamber/gp5-02/page.tsx
```

**步骤 1.2**: 决定保留哪个版本

**步骤 1.3**: 删除重复模块（如果确认重复）

---

### Phase 2: 批量重命名 (2 小时)

**使用工具**: `smartRelocate` (自动更新 import 引用)

**步骤 2.1**: 数学模块重命名 (20 个)
```typescript
// 示例
smartRelocate("src/app/chamber/s1-01", "src/app/chamber/sm1-01")
smartRelocate("src/app/chamber/g1-01", "src/app/chamber/gm1-01")
// ... 重复 20 次
```

**步骤 2.2**: 物理模块重命名 (12 个)
```typescript
smartRelocate("src/app/chamber/p1-02", "src/app/chamber/sp1-02")
smartRelocate("src/app/chamber/p5-01", "src/app/chamber/gp5-01")
// ... 重复 12 次
```

**步骤 2.3**: 化学模块重命名 (4 个)
```typescript
smartRelocate("src/app/chamber/c1-01", "src/app/chamber/sc1-01")
// ... 重复 4 次
```

**步骤 2.4**: 组件文件夹同步重命名
```typescript
// 同步重命名 components 文件夹
smartRelocate("src/components/chamber/s1-01", "src/components/chamber/sm1-01")
// ... 重复所有模块
```

---

### Phase 3: 首页链接更新 (30 分钟)

**步骤 3.1**: 更新 `src/app/page.tsx` 中的所有链接

**需要更新的链接**:
```typescript
// 旧链接
/chamber/s2-01 → /chamber/sm2-01
/chamber/g3-01 → /chamber/gm3-01
/chamber/p1-02 → /chamber/sp1-02
/chamber/c1-01 → /chamber/sc1-01
// ... 共 49 个链接
```

**步骤 3.2**: 更新模块卡片的显示文本（如果需要）

---

### Phase 4: i18n Keys 更新 (1 小时)

**步骤 4.1**: 检查 `src/lib/i18n.ts` 中的 keys

**需要更新的 keys**:
```typescript
// 旧 key
s2_01 → sm2_01
g3_01 → gm3_01
p1_02 → sp1_02
c1_01 → sc1_01
// ... 共 49 个 key
```

**步骤 4.2**: 使用查找替换批量更新

**步骤 4.3**: 更新所有模块页面中的 `t()` 调用

---

### Phase 5: 文档更新 (30 分钟)

**需要更新的文档**:
1. `CURRICULUM_PLAN.md` - 更新所有模块编号
2. `MODULE_COMPLETION_REPORT.md` - 更新模块列表
3. `CONTENT_QUALITY_REPORT.md` - 更新模块引用
4. `FINAL_SUMMARY_REPORT.md` - 更新统计数据
5. `PROJECT_ARCHITECTURE.md` - 更新架构图

---

### Phase 6: 测试验证 (30 分钟)

**步骤 6.1**: 编译检查
```bash
npm run build
```

**步骤 6.2**: 运行 ESLint
```bash
npm run lint
```

**步骤 6.3**: 手动测试
- 访问首页，检查所有链接
- 随机访问 10 个模块，确认正常工作
- 测试三语切换

**步骤 6.4**: 检查 404 错误
- 确保没有旧链接残留

---

## ⏱️ 时间估算

| 阶段 | 任务 | 预计时间 | 优先级 |
|-----|------|---------|--------|
| Phase 1 | 重复模块检查 | 30 分钟 | P0 |
| Phase 2 | 批量重命名 (49 个) | 2 小时 | P0 |
| Phase 3 | 首页链接更新 | 30 分钟 | P0 |
| Phase 4 | i18n Keys 更新 | 1 小时 | P0 |
| Phase 5 | 文档更新 | 30 分钟 | P1 |
| Phase 6 | 测试验证 | 30 分钟 | P0 |
| **总计** | | **5 小时** | |

---

## 🎯 执行顺序

### 今天立即执行 (P0)

**第一批** (1 小时):
1. ✅ 检查 4 对重复模块
2. ✅ 删除/合并重复模块
3. ✅ 开始数学模块重命名 (20 个)

**第二批** (1.5 小时):
4. ✅ 完成物理模块重命名 (12 个)
5. ✅ 完成化学模块重命名 (4 个)
6. ✅ 同步组件文件夹重命名

**第三批** (1.5 小时):
7. ✅ 更新首页链接
8. ✅ 更新 i18n keys
9. ✅ 测试验证

### 今天稍后执行 (P1)

**第四批** (1 小时):
10. ✅ 更新所有文档
11. ✅ 创建变更日志
12. ✅ 提交代码

---

## 📝 变更日志模板

```markdown
# Changelog - 2026-02-06

## 🔄 命名规范统一

### 重命名模块 (49 个)

#### 数学模块 (20 个)
- s1-01 → sm1-01
- s1-02 → sm1-02
- ... (共 20 个)

#### 物理模块 (12 个)
- p1-02 → sp1-02
- p1-03 → sp1-03
- ... (共 12 个)

#### 化学模块 (4 个)
- c1-01 → sc1-01
- c1-02 → sc1-02
- ... (共 4 个)

### 删除重复模块 (如果有)
- [列出删除的模块]

### 更新内容
- ✅ 首页链接 (49 处)
- ✅ i18n keys (49 个)
- ✅ 组件文件夹 (49 个)
- ✅ 文档 (5 个)

### 测试结果
- ✅ 编译通过
- ✅ ESLint 零警告
- ✅ 所有链接正常
- ✅ 三语切换正常
```

---

## 🚨 风险与注意事项

### 风险 1: Import 引用遗漏
**缓解措施**: 使用 `smartRelocate` 自动更新引用

### 风险 2: i18n key 不匹配
**缓解措施**: 批量查找替换，然后运行 TypeScript 检查

### 风险 3: 首页链接遗漏
**缓解措施**: 手动检查每个模块卡片

### 风险 4: 用户书签失效
**缓解措施**: 
- 添加重定向规则 (Next.js middleware)
- 或在旧路径显示"模块已迁移"提示

---

## 🎯 成功标准

### 必须达成 (P0)
- ✅ 所有 49 个模块重命名完成
- ✅ 首页所有链接正常工作
- ✅ 编译零错误
- ✅ ESLint 零警告
- ✅ 所有模块可访问

### 应该达成 (P1)
- ✅ i18n keys 全部更新
- ✅ 文档全部更新
- ✅ 无重复模块
- ✅ 命名规范一致

### 可以达成 (P2)
- ✅ 添加旧路径重定向
- ✅ 更新 README
- ✅ 创建迁移指南

---

## 📋 后续任务 (命名统一后)

### 任务 2: 内容填充完善 (Phase 2)

**目标**: 所有模块达到 Phase 2 标准

**Phase 2 标准**:
- ✅ 完整的教育内容
- ✅ 难度分级 (BASIC/CORE/ADVANCED/ELITE)
- ✅ Basel 本土化元素
- ✅ 三语 i18n 支持
- ✅ 交互式学习任务

**优先级模块** (需要增强):
1. SP1.08 - Optics Bench
2. SC2.01 - Kinetics Crash
3. SM2.02 - Pythagoras (补充 Stage D, E)
4. SM3.01 - Quadratics (完善 Stage 结构)

### 任务 3: i18n 集成 (交给 Trae)

**Mission T84**: 6 个模块的硬编码文本替换
1. GP5.02 - Relativity Lab
2. GMS1.01 - Complex Fractal
3. SP1.08 - Optics Bench
4. GM3.01 - Probability Vault
5. GM5.01 - Matrix Geometry
6. GC2.01 - Carbon Kingdom

---

## 🤝 协作分工

### Kiro 负责
- ✅ 命名规范统一 (Phase 1-6)
- ✅ 重复模块检查
- ✅ 文档更新
- ✅ 内容填充完善 (Phase 2)

### Trae 负责
- ✅ Mission T84 - i18n 集成
- ✅ 硬编码文本替换
- ✅ 三语测试

---

## 📊 进度追踪

### 今天目标
- [ ] Phase 1: 重复模块检查 (30 分钟)
- [ ] Phase 2: 批量重命名 (2 小时)
- [ ] Phase 3: 首页链接更新 (30 分钟)
- [ ] Phase 4: i18n Keys 更新 (1 小时)
- [ ] Phase 5: 文档更新 (30 分钟)
- [ ] Phase 6: 测试验证 (30 分钟)

### 本周目标
- [ ] 所有模块命名统一
- [ ] Trae 完成 Mission T84
- [ ] 4 个优先级模块内容增强

### 下周目标
- [ ] 选择 3-5 个模块进入 Phase 3
- [ ] 开始美化工作

---

## ❓ 待确认问题

### 问题 1: 重复模块处理
如果发现 p1-05 和 sp1-05 内容不同，应该：
- A. 保留两个，重命名为 sp1-05a 和 sp1-05b
- B. 合并内容到一个模块
- C. 保留更完善的版本

**你的选择**: ___________

### 问题 2: 旧路径重定向
是否需要添加重定向规则？
- A. 需要 (用户书签不会失效)
- B. 不需要 (直接迁移)

**你的选择**: ___________

### 问题 3: GS1.01 命名
`gs1-01` (Complex Fractal) 应该重命名为：
- A. `gms1-01` (Gym Math Special 1-01)
- B. `gm-s1-01` (Gym Math - Special 1-01)
- C. `gm6-01` (Gym Math Chapter 6)

**你的选择**: ___________

---

## ✅ 准备就绪

所有准备工作已完成，等待你的确认后立即开始执行！

**请确认**:
1. ✅ 命名规范：SM/GM/SP/GP/SC/GC/SB/GB
2. ✅ 执行顺序：Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6
3. ✅ 时间安排：今天完成 P0 任务 (约 5 小时)
4. ❓ 待确认：3 个问题的答案

**确认后我将立即开始执行！**

---

**制定人**: Kiro AI  
**审核人**: Antigravity  
**执行日期**: 2026-02-06  
**预计完成**: 2026-02-06 晚上
