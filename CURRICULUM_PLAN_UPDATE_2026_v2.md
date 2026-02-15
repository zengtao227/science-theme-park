# 🎡 Science Theme Park: Curriculum Expansion Plan 2026 (v2)

> **基于Basel课程对照审查的扩展开发计划 - 修订版**
> **审查日期**: 2026-02-15
> **修订**: 根据用户反馈修正
> **目标**: 补全Basel-Stadt和Basel-Landschaft课程要求的缺失知识点

---

## 📋 审查发现总结 (Review Summary - Revised)

### ✅ 已良好覆盖的领域
- **代数与方程系统**: SM1.02-SM1.05, SM2.01, SM2.06, SM3.01
- **函数与微积分**: SM2.03, SM3.02-SM3.04, GM1.01
- **几何基础**: SM1.01, SM2.02, SM2.04 (相似形), SM2.07 (坐标几何)
- **幂运算与根式**: SM2.05
- **电学基础**: SP2.02, SP2.03
- **化学计量与反应**: SC1.01-SC1.05, SC2.01-SC2.04
- **细胞生物学基础**: SB1.01, SB1.01-M, SB1.02, SB1.03
- **遗传学基础**: SB2.01

### 🔴 严重缺失 (Critical Gaps)
1. **热力学模块** - 有详细设计文档但完全未实现 (最严重)
2. **人体系统** - Basel Sek 2核心内容，必须补充
3. **生态学** - Basel Sek 3核心内容，必须补充
4. **生物模块顺序** - 缺少"组织与器官"过渡层

### 🟡 需要补充 (Needs Addition)
- 统计图表分析进阶 (箱线图、散点图)
- 立体几何进阶 (圆锥、球体)
- 简单机械 (杠杆、滑轮)
- 声学应用
- 神经生物学
- 免疫学

### ✅ 已确认完整的模块
- SM2.04 (Similarity & Scaling) - 相似形与比例 ✓
- SM2.05 (Powers & Roots) - 幂运算与根号 ✓
- SM2.06 (Linear Systems) - 二元一次方程组 ✓
- SM2.07 (Coordinate Geometry) - 坐标几何 ✓
- SC1.05 (Bonding Lab) - 化学键 ✓
- SB1.03 (Cell Division Lab) - 细胞分裂 ✓

---

## 🗺️ 扩展开发路线图 (Expansion Roadmap - Revised)

### Phase 1: 紧急补全 (Critical Completion) - 优先级 P0

#### 1.1 生物模块重组与补全

**问题**: 当前生物模块跳跃过大，缺少"细胞→组织→器官→系统"的层级过渡

**解决方案**: 插入缺失模块，重新编号部分现有模块

| 原编号 | 新编号 | 模块名称 | 状态 | 说明 |
|:---:|:---:|:---|:---:|:---|
| SB1.01 | **SB1.01** | Cell Factory | ✅ 已完成 | 保持不变 |
| SB1.01-M | **SB1.01-M** | Metabolic Engine | ✅ 已完成 | 保持不变 |
| SB1.02 | **SB1.02** | Photosynthesis Lab | ✅ 已完成 | 保持不变 |
| SB1.03 | **SB1.03** | Cell Division Lab | ✅ 已完成 | 已存在，状态确认 |
| - | **SB2.01** | Tissues & Organs | 🆕 新建 | 组织与器官结构 |
| - | **SB2.02** | Human Body Systems | 🆕 新建 | 消化、循环、呼吸系统 |
| SB2.01 | **SB2.03** | Mendel's Garden | ✅ 已完成 | 从SB2.01重新编号 |
| - | **SB3.01** | Ecosystem Dynamics | 🆕 新建 | 食物链与能量流动 |
| SB3.01 | **SB3.02** | (原SB3.01内容) | ✅ 已完成 | 需确认内容 |

**开发任务**:
1. 🆕 创建SB2.01 - Tissues & Organs (组织与器官)
2. 🆕 创建SB2.02 - Human Body Systems (人体系统)
3. 🆕 创建SB3.01 - Ecosystem Dynamics (生态系统)
4. 🔄 更新所有引用SB2.01的代码为SB2.03
5. 🔄 更新所有引用SB3.01的代码为SB3.02

#### 1.2 物理模块年级对齐与确认

**重要发现**: 根据用户反馈，Basel地区物理课程通常从Sek 3开始

**需要审查的模块**:
| 模块代号 | 当前状态 | 需要行动 |
|:---:|:---|:---|
| SP1.01 | 代码存在，文档标记TBD | 确认内容，可能需移至SP3.xx |
| SP1.04 | 代码存在，文档标记TBD | 确认内容与年级对齐 |
| SP1.08 | 代码存在，文档标记TBD | 确认内容与年级对齐 |
| SP2.01 | 代码存在，文档标记TBD | 确认内容与年级对齐 |
| SP2.02 | RLC电路瞬态分析 | 考虑简化为基础电路或移至GP2.xx |
| SP3.02 | 代码存在，文档标记TBD | 确认内容与年级对齐 |

**开发任务**:
1. 📋 审查SP1.01, SP1.04, SP1.08的实际教学内容
2. 📋 根据Basel Sek 3物理课程要求，调整模块编号
3. 📋 简化SP2.02或移至Gymnasium级别
4. 📋 更新物理模块文档说明

#### 1.3 热力学模块实现 ✅ 已完成 (最高优先级)

**状态**: ✅ 全部完成 (2026-02-15)

**已实现模块**:
| 模块代号 | 模块名称 | 学习目标 | 年级 | 状态 |
|:---:|:---|:---|:---:|:---:|
| **SP3.04** | Temperature & Heat | 温度、热量、比热容、热平衡 | Sek 3 | ✅ |
| **GP2.01** | Gas Laws | 理想气体方程 PV=nRT | Gym 2 | ✅ |
| **GP2.02** | Thermodynamics I | 热力学第一定律、内能 | Gym 2 | ✅ |
| **GP2.03** | Heat Engines | 热机效率、卡诺循环 | Gym 2 | ✅ |
| **GP2.04** | Entropy & Disorder | 熵、热力学第二定律 | Gym 2 | ✅ |

**完成任务**:
1. ✅ 创建SP3.04 - Temperature & Heat (3 stages, TemperatureVisualization)
2. ✅ 创建GP2.01 - Gas Laws (3 stages, GasLawsVisualization)
3. ✅ 创建GP2.02 - Thermodynamics I (3 stages, ThermodynamicsVisualization)
4. ✅ 创建GP2.03 - Heat Engines (3 stages, HeatEngineVisualization)
5. ✅ 创建GP2.04 - Entropy & Disorder (3 stages, EntropyVisualization)
6. ✅ 实现"熵之荒原"设计文档中的核心机制
7. ✅ 完整三语言翻译 (EN/DE/CN)，每个场景150-250词
8. ✅ 德语翻译保持完整详细（非简化版）
9. ✅ 构建测试通过 (76页)

---

### Phase 2: 重要补充 (Important Additions) - 优先级 P1

#### 2.1 数学模块补充

| 模块代号 | 模块名称 | 学习目标 | 年级 | 优先级 |
|:---:|:---|:---|:---:|:---:|
| **SM2.10** | Data Analysis | 箱线图、散点图、相关性分析 | Sek 2 | P1 |
| **SM3.05** | 3D Geometry Advanced | 圆柱、圆锥、球体表面积与体积 | Sek 3 | P1 |

**注意**: 
- ✅ SM2.04已完美覆盖相似形与比例，无需新增
- ❌ 不添加圆锥曲线(Kegelschnitte) - 这是Gymnasium高年级选修内容
- ✅ SM1.01已涵盖基础体积(棱柱、圆柱)，SM3.05补充曲面立体

#### 2.2 物理模块补充

| 模块代号 | 模块名称 | 学习目标 | 年级 | 优先级 |
|:---:|:---|:---:|:---:|:---:|
| **SP3.05** | Simple Machines | 杠杆、滑轮、斜面、机械效率 | Sek 3 | P1 |
| **SP3.06** | Acoustics | 声音产生、传播、频率、响度 | Sek 3 | P1 |
| **GP2.05** | Magnetic Fields | 磁场、磁感应强度、安培力 | Gym 2 | P1 |

#### 2.3 化学模块补充

| 模块代号 | 模块名称 | 学习目标 | 年级 | 优先级 |
|:---:|:---|:---:|:---:|:---:|
| **SC3.04** | Functional Groups | 醇、醛、酮、羧酸、酯 | Sek 3 | P1 |
| **GC1.02** | Electrochemistry | 电解、电镀、腐蚀防护 | Gym 1 | P1 |

**注意**: 
- ✅ SC1.05 (Bonding Lab)已存在并覆盖化学键
- SC3.01-03代码存在但内容TBD，需确认后再决定是否新增SC3.04

#### 2.4 生物模块补充

| 模块代号 | 模块名称 | 学习目标 | 年级 | 优先级 |
|:---:|:---|:---:|:---:|:---:|
| **GB1.01** | Evolution Lab | 自然选择、物种形成、进化证据 | Gym 1 | P1 |
| **GB2.01** | Neurobiology | 神经元、动作电位、突触传递 | Gym 2 | P1 |
| **GB3.02** | Immunology | 免疫系统、抗体、疫苗原理 | Gym 3 | P1 |

**注意**: GB1.01代码已存在，需确认内容是否完整

---

### Phase 3: 内容确认与优化 (Verification & Optimization) - 优先级 P2

#### 3.1 需要确认内容的模块

**化学模块**:
- SC3.01 (代码存在，文档标记TBD)
- SC3.02 (代码存在，文档标记TBD)
- SC3.03 (代码存在，文档标记TBD)

**生物模块**:
- GB1.01 (代码存在，需确认内容完整性)
- SB3.01 (原编号，需确认内容后重新编号为SB3.02)

**物理模块**:
- SP1.01, SP1.04, SP1.08, SP2.01, SP3.02 (见1.2节)

#### 3.2 教学顺序优化建议

**已确认正确**:
1. ✅ SM2.02 (勾股定理) 在Sek 2 - 符合Basel课程
2. ✅ SM1→SM2→SM3的递进符合Basel Sek 1→2→3的难度梯度
3. ✅ 化学SC1(基础)→SC2(反应)→SC3(有机)符合Basel课程逻辑

**需要调整**:
1. ⚠️ SP2.02 (RLC电路) - 考虑简化为基础电路或移至Gymnasium
2. ⚠️ 生物模块 - 已在Phase 1重新编号

---

## 📊 新增模块统计 (New Modules Summary - Revised)

### 按学科分类:
- **数学**: 2个新模块 (SM2.10数据分析, SM3.05立体几何进阶)
- **物理**: 8个新模块 (SP3.04-06, GP2.01-05)
- **化学**: 2个新模块 (SC3.04官能团, GC1.02电化学) *待SC3.01-03确认后决定*
- **生物**: 5个新模块 (SB2.01-02, SB3.01, GB2.01, GB3.02) *GB1.01待确认*

### 按优先级分类:
- **P0 (紧急)**: 10个模块 (生物3个 + 热力学5个 + 物理确认)
- **P1 (重要)**: 9个模块 (数学2个 + 物理3个 + 化学2个 + 生物2个)
- **P2 (优化)**: 内容确认与调整 (约8个模块需确认)

**总计新增**: 约17-19个模块 (取决于确认结果)

---

## 🛠️ 开发实施计划 (Implementation Plan - 12 Weeks)

### Week 1-2: Phase 1.1 - 生物模块重组 ✅ 已完成
- [x] 创建SB2.01 (Tissues & Organs) ✅
- [x] 创建SB2.02 (Human Body Systems) ✅
- [ ] 创建SB3.01 (Ecosystem Dynamics) - 待开发
- [x] 更新所有模块引用和翻译 ✅
- [x] 测试生物模块完整流程 ✅
- **完成日期**: 2026-02-15 (部分完成，SB3.01待开发)

### Week 3-5: Phase 1.3 - 热力学模块 (最高优先级) ✅ 已完成
- [x] 创建SP3.04 (Temperature & Heat) ✅
- [x] 创建GP2.01 (Gas Laws) ✅
- [x] 创建GP2.02 (Thermodynamics I) ✅
- [x] 创建GP2.03 (Heat Engines) ✅
- [x] 创建GP2.04 (Entropy & Disorder) ✅
- [x] 实现"熵之荒原"核心机制 ✅
- **完成日期**: 2026-02-15
- **构建状态**: 76页全部通过 (72个chamber模块 + 4个其他页面)

### Week 6: Phase 1.2 - 物理模块对齐
- [ ] 审查SP1.01, SP1.04, SP1.08内容
- [ ] 审查SP2.01, SP3.02内容
- [ ] 调整模块编号以符合Basel年级要求
- [ ] 简化或重构SP2.02 (RLC电路)
- [ ] 更新物理模块文档

### Week 7-8: Phase 2.1-2.2 - 数学与物理补充
- [ ] 创建SM2.10 (Data Analysis)
- [ ] 创建SM3.05 (3D Geometry Advanced)
- [ ] 创建SP3.05 (Simple Machines)
- [ ] 创建SP3.06 (Acoustics)
- [ ] 创建GP2.05 (Magnetic Fields)

### Week 9-10: Phase 2.3-2.4 - 化学与生物补充
- [ ] 确认SC3.01-03内容
- [ ] 创建SC3.04 (Functional Groups) *如需要*
- [ ] 创建GC1.02 (Electrochemistry)
- [ ] 确认并完善GB1.01 (Evolution Lab)
- [ ] 创建GB2.01 (Neurobiology)
- [ ] 创建GB3.02 (Immunology)

### Week 11-12: Phase 3 - 内容确认与全面测试
- [ ] 确认所有TBD模块内容
- [ ] 更新CURRICULUM_PLAN.md
- [ ] 更新所有设计文档
- [ ] 全面构建测试
- [ ] 三语言翻译完整性检查
- [ ] 质量保证与用户测试

---

## 📝 文档更新清单 (Documentation Updates)

### 需要更新的文件:
1. ✅ `CURRICULUM_PLAN.md` - 添加所有新模块，更新现有模块状态
2. ✅ `Design Documents/Biology/` - 创建生物模块设计文档
3. ✅ `Design Documents/Physics/01_Thermodynamics_Zone.md` - 更新实施状态
4. ✅ `Design Documents/Physics/02_Simple_Machines_Zone.md` - 新建
5. ✅ `Design Documents/Mathematics/04_Statistics_Zone.md` - 新建
6. ✅ `Resources/Basel_Curriculum_References.md` - 补充物理课程年级信息
7. ✅ 所有翻译文件 (EN/DE/CN) - 添加新模块的翻译键

### 需要创建的新文档:
1. `Design Documents/Biology/01_Cell_to_System_Zone.md` - 细胞到系统的设计
2. `Design Documents/Biology/02_Human_Body_Zone.md` - 人体系统设计
3. `Design Documents/Biology/03_Ecology_Zone.md` - 生态系统设计
4. `Design Documents/Physics/02_Simple_Machines_Zone.md` - 简单机械设计
5. `Design Documents/Mathematics/04_Statistics_Zone.md` - 统计分析设计

---

## ⚠️ 重要注意事项 (Important Notes - Updated)

### 年级对齐原则:
1. **Sek 1 (7年级)**: 基础概念，观察与描述
2. **Sek 2 (8年级)**: 定量计算，规律发现
3. **Sek 3 (9年级)**: 综合应用，系统思维，**物理课程通常从此开始**
4. **Gymnasium**: 深度理论，抽象建模

### Basel特殊要求:
1. **物理课程**: 通常从Sek 3开始系统学习 (用户确认)
2. **生物课程**: 强调"细胞→组织→器官→系统"的层级结构
3. **化学课程**: 注重实验与应用(Novartis/Roche背景)
4. **数学课程**: 遵循Lehrplan 21的能力目标框架
5. **勾股定理**: 在Sek 2学习，SM2.02编号正确 (用户确认)

### 开发规范:
1. 遵循"Skeleton-Flesh-Skin"三阶段开发
2. 所有新模块必须包含三语言翻译(EN/DE/CN)
3. 使用KaTeX渲染所有数学公式
4. 槽位输入优先于文本框输入
5. 每个模块必须有BASIC/CORE/ADVANCED/ELITE四个难度

### 用户反馈整合:
1. ✅ 圆锥曲线不属于Sek 3，已从计划中移除
2. ✅ 物理课程年级对齐需要重新审查
3. ✅ SM2.02勾股定理在Sek 2是正确的
4. ✅ 生物模块需要增加中间过渡层
5. ✅ SP2.02可能过难，需要简化或降级

---

## 🎯 成功标准 (Success Criteria)

### Phase 1完成标准:
- [ ] 所有P0模块创建完成并可访问
- [ ] 生物模块重新编号完成，引用全部更新
- [ ] 热力学5个模块全部实现
- [ ] 物理模块年级对齐完成，文档更新
- [ ] 所有新模块通过构建测试

### Phase 2完成标准:
- [ ] 所有P1模块创建完成
- [ ] 数学、物理、化学、生物各学科补充完整
- [ ] 所有模块包含完整三语言翻译
- [ ] 设计文档更新完成

### Phase 3完成标准:
- [ ] 所有TBD模块内容确认并文档化
- [ ] CURRICULUM_PLAN.md完全同步实际状态
- [ ] 全部模块构建成功 (预计72+17=89个模块)
- [ ] Basel课程覆盖率达到95%以上
- [ ] 用户审批通过，准备进入开发

---

## 📈 当前模块统计 (Current Module Count)

### 已实现模块 (更新至2026-02-15):
- 数学: 21个 (SM: 17, GM: 4, EM: 2) - 包含SM2.04-07, SM3.04
- 物理: 24个 (SP: 14包含SP3.04, GP: 8包含GP2.01-04) ⬆️ +5
- 化学: 15个 (SC: 11包含SC1.05, GC: 3)
- 生物: 10个 (SB: 6包含SB1.03+SB2.01+SB2.02, GB: 3, SB3.01) ⬆️ +2

**当前总计**: 70个独立模块 (72个chamber页面，包含2个特殊页面sb1-03和sc1-05)

### 计划新增:
- P0优先级: 10个模块
- P1优先级: 9个模块
- 待确认后决定: 约8个模块

**预计总计**: 89-92个模块

---

**文档版本**: v2.0 (Revised)
**创建日期**: 2026-02-15
**修订日期**: 2026-02-15
**审批状态**: 待用户审批
**预计完成**: 2026-05 (12周开发周期)

---

*本文档已根据用户反馈进行修订，修正了关于圆锥曲线、物理年级对齐、SM2.04-07等方面的错误判断。*
