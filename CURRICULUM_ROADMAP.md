# 理科实验室：全学段脚本开发路线图 (Curriculum Script Roadmap)

> **战略核心**：优先产出“逻辑剧本”和“规则定义”，场景搭建延后。
> **目标**：建立一套跨平台的、基于教育痛点的游戏化逻辑库。

---

## 一、数学脚本规划 (Mathematics Scripting)

### Sek 1 (初中一年级 / Grade 7)
| 模块代号 | 章节 | 状态 | 开发优先级 | 核心逻辑剧本名 |
| :--- | :--- | :--- | :--- | :--- |
| **S1.01** | **面积与体积** | ⚪ 待开发 | P1 | `S1_01_Areas_Volumes` |
| **S1.02** | **数据与概率** | 🟢 已完成 | P0 (核心) | `S1_02_Data_Probability` |

### Sek 2 (初中二年级 / Grade 8)
| 模块代号 | 章节 | 状态 | 开发优先级 | 核心逻辑剧本名 |
| :--- | :--- | :--- | :--- | :--- |
| **S2.01** | **二项式工厂** | 🟢 已完成 | P0 (核心) | `S2_01_Binomial_Factory` |
| **S2.02** | **勾股与平方根** | 🟢 已完成 | P0 (核心) | `S2_02_Pythagoras_Roots` |
| **S2.03** | **线性函数** | ⚪ 待开发 | P1 | `S2_03_Linear_Functions` |
| **S2.04** | **相似与缩放** | 🟢 已完成 | P1 | `S2_04_Similarity_Scaling` |
| **S2.05** | **幂与根** | ⚪ 待开发 | P1 | `S2_05_Powers_Roots` |
| **S2.06** | **线性方程组** | ⚪ 待开发 | P1 | `S2_06_Linear_Systems` |

### Sek 3 (初中三年级 / Grade 9)
| 模块代号 | 章节 | 状态 | 开发优先级 | 核心逻辑剧本名 |
| :--- | :--- | :--- | :--- | :--- |
| **S3.01** | **二次方程** | ⚪ 待开发 | P0 (核心) | `S3_01_Quadratic_Equations` |

### Gymnasium (高中 / Grade 10-12)
| 模块代号 | 章节 | 状态 | 开发优先级 | 核心逻辑剧本名 |
| :--- | :--- | :--- | :--- | :--- |
| **G1.01** | **微积分导数** | 🟢 已完成 | P1 | `G1_01_Calculus_Derivatives` |
| **G1.02** | **向量空间** | ⚪ 待开发 | P2 | `G1_02_Vector_Space` |
| **G1.03** | **立体几何** | ⚪ 待开发 | P2 | `G1_03_Stereometry` |

---

## 二、物理脚本规划 (Physics Scripting)

### 阶段一：初中力学与电学 (Grade 7-9)
| 章节 | 状态 | 开发优先级 | 核心逻辑剧本名 |
| :--- | :--- | :--- | :--- |
| **摩擦力与阻力** | ⚪ 待开发 | P0 | `P01_Dynamics_Friction_Control` |
| **光的反射迷宫** | ⚪ 待开发 | P1 | `P02_Optics_Reflection_Path` |
| **电路欧姆定律** | ⚪ 待开发 | P1 | `P03_Electronics_Resistance_Flow` |

### 阶段二：高中动力学与现代物理 (Grade 10-12)
| 章节 | 状态 | 开发优先级 | 核心逻辑剧本名 |
| :--- | :--- | :--- | :--- |
| **热力学与熵** | 🟢 已完成 | P1 | `P04_Thermodynamics_Entropy_Wastes` |
| **圆周运动** | ⚪ 待开发 | P0 | `P05_Circular_Motion_Centripetal` |
| **狭义相对论** | ⚪ 待开发 | P2 | `P06_Relativity_Time_Dilation` |

---

## 三、脚本编写守则 (Scripting Ethics)
1. **Rule-Based**: 每个剧本必须定义 1-3 个不可逾越的物理/数学常数。
2. **Platform-Agnostic**: 描述逻辑时，尽量使用通用的数学伪代码，不仅仅是 Luau。
3. **AI-Ready**: 结尾必须附带一段“Scene Generation Prompt”，为未来的 AI 生成器留好接口。
