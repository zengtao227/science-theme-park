# 🎡 Science Theme Park: Curriculum Expansion Plan 2026

> **基于Basel课程对照审查的扩展开发计划**
> **审查日期**: 2026-02-15
> **目标**: 补全Basel-Stadt和Basel-Landschaft课程要求的缺失知识点

---

## 📋 审查发现总结 (Review Summary)

### ✅ 已良好覆盖的领域
- 代数与方程系统 (SM1.02-SM1.05, SM2.01, SM3.01)
- 函数与微积分 (SM2.03, SM3.02-SM3.03, GM1.01)
- 几何基础 (SM1.01, SM2.02)
- 电学基础 (SP2.02, SP2.03)
- 化学计量与反应 (SC1.01-SC1.04, SC2.01-SC2.04)
- 细胞生物学基础 (SB1.01, SB1.01-M, SB1.02)
- 遗传学基础 (SB2.01)

### 🔴 严重缺失 (Critical Gaps)
1. **热力学模块** - 有设计文档但完全未实现
2. **人体系统** - Basel Sek 2核心内容
3. **生态学** - Basel Sek 3核心内容
4. **细胞分裂** - 代码存在(sb1-03)但未部署

### 🟡 需要补充 (Needs Addition)
- 相似形与比例几何
- 统计图表分析
- 简单机械(杠杆、滑轮)
- 声学应用
- 化学键系统对比
- 神经生物学
- 免疫学

---

## 🗺️ 扩展开发路线图 (Expansion Roadmap)

### Phase 1: 紧急补全 (Critical Completion) - 优先级 P0

#### 1.1 生物模块重组与补全

**问题**: 当前生物模块跳跃过大，缺少"细胞→组织→器官→系统"的层级过渡

**解决方案**: 重新编号并插入缺失模块

| 原编号 | 新编号 | 模块名称 | 状态 | 说明 |
|:---:|:---:|:---|:---:|:---|
| SB1.01 | **SB1.01** | Cell Factory | ✅ 已完成 | 保持不变 |
| SB1.01-M | **SB1.01-M** | Metabolic Engine | ✅ 已完成 | 保持不变 |
| SB1.02 | **SB1.02** | Photosynthesis Lab | ✅ 已完成 | 保持不变 |
| sb1-03 | **SB1.03** | Cell Division Lab | 🔧 需部署 | 代码已存在，需移至chamber目录 |
| - | **SB2.01** | Tissues & Organs | 🆕 新建 | 组织与器官结构 |
| - | **SB2.02** | Human Body Systems | 🆕 新建 | 消化、循环、呼吸系统 |
| SB2.01 | **SB2.03** | Mendel's Garden | ✅ 已完成 | 从SB2.01重新编号 |
| SB2.02 | **SB2.04** | (预留) | 📋 计划中 | 预留位置 |
| - | **SB3.01** | Ecosystem Dynamics | 🆕 新建 | 食物链与能量流动 |
| SB3.01 | **SB3.02** | (原SB3.01内容) | ✅ 已完成 | 需确认内容 |

**开发任务**:
1. ✅ 部署sb1-03到chamber/sb1-03
2. 🆕 创建SB2.01 - Tissues & Organs (组织与器官)
3. 🆕 创建SB2.02 - Human Body Systems (人体系统)
4. 🆕 创建SB3.01 - Ecosystem Dynamics (生态系统)
5. 🔄 更新所有引用SB2.01的代码为SB2.03

#### 1.2 物理模块年级对齐

**问题**: SP1.01等模块可能不符合Basel物理课程开始年级(通常Sek 3开始)

**需要确认的模块**:
| 模块代号 | 当前状态 | 需要行动 |
|:---:|:---|:---|
| SP1.01 | 代码存在，文档标记TBD | 确认内容是否适合Sek 1，或移至SP3.xx |
| SP1.04 | 代码存在，文档标记TBD | 确认内容与年级对齐 |
| SP1.08 | 代码存在，文档标记TBD | 确认内容与年级对齐 |
| SP2.01 | 代码存在，文档标记TBD | 确认内容与年级对齐 |
| SP3.02 | 代码存在，文档标记TBD | 确认内容与年级对齐 |

**开发任务**:
1. 📋 审查SP1.01, SP1.04, SP1.08的实际教学内容
2. 📋 根据Basel Sek 3物理课程要求，调整模块编号
3. 📋 确认SP2.02 (RLC电路)是否过难，考虑简化或移至GP2.xx

#### 1.3 热力学模块实现

**问题**: 设计文档完整(01_Thermodynamics_Zone.md)但完全未实现

**新建模块**:
| 模块代号 | 模块名称 | 学习目标 | 年级 |
|:---:|:---|:---|:---:|
| **SP3.04** | Temperature & Heat | 温度、热量、比热容 | Sek 3 |
| **GP2.01** | Gas Laws | 理想气体方程 PV=nRT | Gym 2 |
| **GP2.02** | Thermodynamics I | 热力学第一定律 | Gym 2 |
| **GP2.03** | Heat Engines | 热机效率、卡诺循环 | Gym 2 |
| **GP2.04** | Entropy & Disorder | 熵与热力学第二定律 | Gym 2 |

**开发任务**:
1. 🆕 创建SP3.04 - Temperature & Heat (温度与热量)
2. 🆕 创建GP2.01 - Gas Laws (气体定律)
3. 🆕 创建GP2.02 - Thermodynamics I (热力学第一定律)
4. 🆕 创建GP2.03 - Heat Engines (热机)
5. 🆕 创建GP2.04 - Entropy & Disorder (熵)

---

### Phase 2: 重要补充 (Important Additions) - 优先级 P1

#### 2.1 数学模块补充

| 模块代号 | 模块名称 | 学习目标 | 年级 | 优先级 |
|:---:|:---|:---|:---:|:---:|
| **SM2.09** | Similar Shapes | 相似三角形、缩放比例 | Sek 2 | P1 |
| **SM2.10** | Data Analysis | 箱线图、散点图、相关性 | Sek 2 | P1 |
| **SM3.05** | 3D Geometry | 圆柱、圆锥、球体 | Sek 3 | P1 |

**注意**: 
- ❌ 不添加圆锥曲线(Kegelschnitte) - 这是Gymnasium高年级内容
- ✅ SM1.01已涵盖基础体积，SM3.05补充圆柱/圆锥/球体

#### 2.2 物理模块补充

| 模块代号 | 模块名称 | 学习目标 | 年级 | 优先级 |
|:---:|:---|:---|:---:|:---:|
| **SP3.05** | Simple Machines | 杠杆、滑轮、斜面 | Sek 3 | P1 |
| **SP3.06** | Acoustics | 声音产生、传播、频率 | Sek 3 | P1 |
| **GP2.05** | Magnetic Fields | 磁场、磁感应强度、安培力 | Gym 2 | P1 |

#### 2.3 化学模块补充

| 模块代号 | 模块名称 | 学习目标 | 年级 | 优先级 |
|:---:|:---|:---|:---:|:---:|
| **SC1.05** | Chemical Bonding | 离子键、共价键、金属键、氢键 | Sek 1 | P1 |
| **SC3.04** | Functional Groups | 醇、醛、酮、羧酸、酯 | Sek 3 | P1 |
| **GC1.02** | Electrochemistry | 电解、电镀、腐蚀防护 | Gym 1 | P1 |

**注意**: 
- SC1.05代码已存在(sc1-05/BondingLab.tsx)但未在chamber目录
- 需要确认并部署

#### 2.4 生物模块补充

| 模块代号 | 模块名称 | 学习目标 | 年级 | 优先级 |
|:---:|:---|:---|:---:|:---:|
| **GB1.01** | Evolution Lab | 自然选择、物种形成 | Gym 1 | P1 |
| **GB2.01** | Neurobiology | 神经元、动作电位 | Gym 2 | P1 |
| **GB3.02** | Immunology | 免疫系统、抗体 | Gym 3 | P1 |

**注意**: GB1.01代码已存在，需确认内容是否完整

---

### Phase 3: 优化与完善 (Optimization) - 优先级 P2

#### 3.1 模块内容确认

**需要确认实际内容的模块**:
- SM2.04, SM2.05, SM2.06, SM2.07 (代码存在但文档未列出)
- SC3.01, SC3.02, SC3.03 (代码存在但文档标记Planned)
- GB1.01 (代码存在但需确认内容完整性)

#### 3.2 教学顺序优化

**建议调整**:
1. SM2.02 (勾股定理) - 保持在Sek 2，符合Basel课程
2. SP2.02 (RLC电路) - 考虑简化为基础电路或移至Gymnasium
3. 生物模块 - 已在Phase 1重新编号

---

## 📊 新增模块统计 (New Modules Summary)

### 按学科分类:
- **数学**: 3个新模块 (SM2.09, SM2.10, SM3.05)
- **物理**: 8个新模块 (SP3.04-06, GP2.01-05)
- **化学**: 3个新模块 (SC1.05, SC3.04, GC1.02)
- **生物**: 6个新模块 (SB1.03部署, SB2.01-02, SB3.01, GB2.01, GB3.02)

### 按优先级分类:
- **P0 (紧急)**: 14个模块
- **P1 (重要)**: 11个模块
- **P2 (优化)**: 内容确认与调整

**总计新增**: 25个模块

---

## 🛠️ 开发实施计划 (Implementation Plan)

### Week 1-2: Phase 1 - 生物模块重组
1. 部署SB1.03 (Cell Division Lab)
2. 创建SB2.01 (Tissues & Organs)
3. 创建SB2.02 (Human Body Systems)
4. 创建SB3.01 (Ecosystem Dynamics)
5. 更新所有模块引用和翻译

### Week 3-4: Phase 1 - 热力学模块
1. 创建SP3.04 (Temperature & Heat)
2. 创建GP2.01-04 (热力学系列)
3. 实现"熵之荒原"设计文档中的核心机制

### Week 5-6: Phase 1 - 物理模块对齐
1. 审查SP1.01, SP1.04, SP1.08内容
2. 调整模块编号以符合Basel年级要求
3. 简化或重构SP2.02 (RLC电路)

### Week 7-8: Phase 2 - 数学与物理补充
1. 创建SM2.09 (Similar Shapes)
2. 创建SM2.10 (Data Analysis)
3. 创建SM3.05 (3D Geometry)
4. 创建SP3.05-06 (Simple Machines, Acoustics)
5. 创建GP2.05 (Magnetic Fields)

### Week 9-10: Phase 2 - 化学与生物补充
1. 部署SC1.05 (Chemical Bonding)
2. 创建SC3.04 (Functional Groups)
3. 创建GC1.02 (Electrochemistry)
4. 确认并完善GB1.01 (Evolution Lab)
5. 创建GB2.01 (Neurobiology)
6. 创建GB3.02 (Immunology)

### Week 11-12: Phase 3 - 内容确认与优化
1. 审查SM2.04-07内容
2. 审查SC3.01-03内容
3. 更新CURRICULUM_PLAN.md
4. 更新所有设计文档
5. 全面测试与质量保证

---

## 📝 文档更新清单 (Documentation Updates)

### 需要更新的文件:
1. ✅ `CURRICULUM_PLAN.md` - 添加所有新模块
2. ✅ `Design Documents/Biology/` - 创建生物模块设计文档
3. ✅ `Design Documents/Physics/01_Thermodynamics_Zone.md` - 更新实施状态
4. ✅ `Resources/Basel_Curriculum_References.md` - 补充物理课程年级信息
5. ✅ 所有翻译文件 (EN/DE/CN) - 添加新模块的翻译键

### 需要创建的新文档:
1. `Design Documents/Biology/01_Cell_to_System_Zone.md` - 细胞到系统的设计
2. `Design Documents/Biology/02_Genetics_Evolution_Zone.md` - 遗传与进化设计
3. `Design Documents/Biology/03_Human_Body_Zone.md` - 人体系统设计
4. `Design Documents/Physics/02_Simple_Machines_Zone.md` - 简单机械设计
5. `Design Documents/Mathematics/04_Statistics_Zone.md` - 统计分析设计

---

## ⚠️ 重要注意事项 (Important Notes)

### 年级对齐原则:
1. **Sek 1 (7年级)**: 基础概念，观察与描述
2. **Sek 2 (8年级)**: 定量计算，规律发现
3. **Sek 3 (9年级)**: 综合应用，系统思维
4. **Gymnasium**: 深度理论，抽象建模

### Basel特殊要求:
1. **物理课程**: 通常从Sek 3开始系统学习
2. **生物课程**: 强调"细胞→组织→器官→系统"的层级结构
3. **化学课程**: 注重实验与应用(Novartis/Roche背景)
4. **数学课程**: 遵循Lehrplan 21的能力目标框架

### 开发规范:
1. 遵循"Skeleton-Flesh-Skin"三阶段开发
2. 所有新模块必须包含三语言翻译(EN/DE/CN)
3. 使用KaTeX渲染所有数学公式
4. 槽位输入优先于文本框输入
5. 每个模块必须有BASIC/CORE/ADVANCED/ELITE四个难度

---

## 🎯 成功标准 (Success Criteria)

### Phase 1完成标准:
- [ ] 所有P0模块创建完成并可访问
- [ ] 生物模块重新编号完成
- [ ] 热力学模块全部实现
- [ ] 物理模块年级对齐完成
- [ ] 所有新模块通过构建测试

### Phase 2完成标准:
- [ ] 所有P1模块创建完成
- [ ] 数学、物理、化学、生物各学科补充完整
- [ ] 所有模块包含完整翻译
- [ ] 设计文档更新完成

### Phase 3完成标准:
- [ ] 所有TBD模块内容确认
- [ ] CURRICULUM_PLAN.md完全同步
- [ ] 全部72+25=97个模块构建成功
- [ ] Basel课程覆盖率达到95%以上

---

**文档版本**: v1.0
**创建日期**: 2026-02-15
**审批状态**: 待审批
**预计完成**: 2026-05 (12周开发周期)

