# 可执行设计稿：MG05 / MG06（Basel-Stadt + Basel-Landschaft，Sek I 二年级导向）

目标：把 MG05（勾股与平方根）与 MG06（代数与一元二次相关技能链）设计成“符合瑞士 Sek I 二年级（约 8 年级）课堂节奏”的可执行关卡方案。此文档用于内部评审通过后再改动代码。

参考资料入口统一维护在：[Basel_Curriculum_References.md](file:///Users/zengtao/science-theme-park/Resources/Basel_Curriculum_References.md)

## 0) 设计约束（必须满足）

- **公式必须用 KaTeX 渲染**：所有根号、分数、指数、等式推导、提示步骤均使用 `react-katex` 渲染。
- **避免输入陷阱**：
  - 不要求学生在文本框里输入 `sqrt`/`^` 等“类编程”表达式。
  - 根式统一用双槽组件：`[ k ] √ [ m ]`。
  - 分式结果优先用 `p/q` 两槽。
- **过程优先于结果**：
  - 关键能力点要通过“分步槽位 + 可视化反馈”体现，不做纯答案机。
- **难度按钮可见**：
  - BASIC / CORE / ADVANCED / ELITE 固定显示在页面顶部（按钮切换），不使用下拉框。
- **不把竞赛题当主干**：
  - Kangaroo/Kadett 风格题适合作为 Elite/扩展（Erweiterung），不作为基础链条主干。

## 1) 用户与教学目标（我们要练什么）

### 1.1 目标人群
- Basel-Stadt 与 Basel-Landschaft 的 Sek I 二年级学生（8 年级附近），能力分层差异较大（班级/水平分化显著）。

### 1.2 共同能力目标（跨 MG05/MG06）
- 能把情境/图形转成数学表达（Skizze → Term/Gleichung）。
- 能按规则操作并验证（展开、合并同类项、提公因式、零乘积定理、平方根与估算）。
- 能用可视化/结构解释“为什么”（而不仅是算出结果）。

## 2) MG06：代数技能链（采用 Aufgabe 5→6→7→8 的课堂顺序）

MG06 从“先会操作”到“再会结构”再到“解方程”，采用四个 Stage：

### 2.1 Stage A — TERMS（合并同类项 / 去括号）
**目标能力**
- 识别同类项并合并；处理括号、负号、分配律。

**交互**
- 槽位输入（系数槽），例：`3x+2y-4x+7y` → 输入 `a=-1, b=9` 得到 `-x+9y`。
- 显示“目标形式”作为导向（如 `ax+by`）。

**难度分层**
- BASIC：只含 2 个变量与简单括号。
- CORE：加入分配律与 `x^2/xy` 的合并（但仍保持槽位输入而不是整式输入）。
- ADVANCED：引入更复杂的乘法展开（仍通过少量系数槽完成）。
- ELITE：在不增加打字负担的前提下，提高结构复杂度（更多项/更多括号）。

### 2.2 Stage B — FACTORIZE（因式分解：结构识别与构造）
**目标能力**
- 把“展开—结构匹配—反向构造”的过程讲清楚。

**核心教学提示（必须显示）**
- 关键恒等式必须分层提示：
  1) \((x+A)(x+B)\)
  2) \(=x^2+(A+B)x+AB\)
  3) 因此匹配目标：\(A+B=\text{x 的系数}, AB=\text{常数项}\)

**题型覆盖（与课堂一致）**
- 三项式 Klammeransatz：\(x^2+px+q\to(x+A)(x+B)\)
- 平方差：\(u^2-v^2=(u-v)(u+v)\)
- 完全平方：\((px+q)^2\)
- 提公因式：\(ka(\cdots)\)

**交互**
- 优先“构造”而不是“直接求根”：
  - 三项式：输入 A、B（两个槽）后显示预览 \((x+A)(x+B)\)，并给出匹配关系提示。
  - 平方差/完全平方：输入 p、q 或 u、v 的关键参数槽。
  - 提公因式：输入公共因子与括号内关键参数槽。

**验收标准**
- 学生能在不写长式子的情况下完成因式分解，并能看到“展开后为什么等价”的提示。

### 2.3 Stage C — FRACTIONS（分式化简：用因式分解完成约分）
**目标能力**
- 认识“约分来自因式分解”，并理解定义域限制（可作为 Advanced/Elite 的提示扩展）。

**交互**
- 难度分层（避免“过度简化导致覆盖不全”，也避免一开始就过难）：
  - BASIC / CORE：只考“单步约分”（例如数值因子约分或单侧可直接提公因式），保持槽位数量少、反馈快。
  - ADVANCED / ELITE：允许出现“分子分母都需要分解”的约分（例如分子平方差 + 分母提公因式），并在 UI 上分成 **分子区 / 分母区** 两个独立输入区，强调双侧结构来源。
- 例：\(\frac{x^2-9}{x^2+3x}\to \frac{x-3}{x}\)（提示：分子平方差、分母提公因式）。
- 若引入定义域：提示“分母不为 0”，但不强制输入（避免过度理论化）。

### 2.4 Stage D — EQUATIONS（解方程：从零乘积定理到更一般形式）
**目标能力**
- 从“乘积为零”过渡到“整理后再求解”，形成完整解题流程。

**题型顺序（强约束）**
1) 已给乘积形式：\((x+4)(x-6)=0\)（先练零乘积）
2) 二次三项式：先因式分解再零乘积（此处可要求先填 A,B，再填解）
3) 含等式两边展开/抵消：先化简再解（体现 Stage A 的作用）
4) 平方方程：\((2x-1)^2=9\)（\(\pm\) 分支）
5) 线性方程：\(-3(x-2)=2x+4\)（巩固变形）

**交互**
- 多槽分步：
  - “先结构（A,B）→再解（x1,x2）”的链式输入。
  - 分数结果用 p/q 双槽。

## 3) MG05：勾股与平方根（先研究对齐，再改动实现）

MG05 暂不进入代码改造；此处先给出“审核可执行的目标设计”，后续会基于 Basel-Stadt/Baselland 的年级进度细化题目数量与数值范围。

### 3.1 MG05 主线定位
- 不做“勾股+根式”两份题库并排，而做“构建 → 计算 → 化简 → 应用”的学习链。
- 强制数形结合：每个核心模式必须有动态可视化，能解释公式来源。

### 3.2 推荐 Stage 结构（与 MG06 一致：阶段化，而非纯模式列表）
**Stage A — CONSTRUCT（构建直角三角形 / 识别直角）**
- 目标：识别直角、理解“平方关系对应面积/边长”。
- 交互：动态三角形；可通过调节 a,b（或拖拽点）让图形变化。

**Stage B — PYTHAGORAS（勾股计算：先平方再开方）**
- 目标：形成固定流程：
  - 先填 \(c^2=a^2+b^2\)
  - 再填 \(c=\sqrt{c^2}\)
- 难度：BASIC 以勾股数为主；CORE 引入少量非勾股数（但仍可化简）。

**Stage C — ROOTS（平方根与根式化简）**
- 目标：从“完全平方数开方”过渡到“可化简根式”。
- 交互：
  - 完全平方数：单槽输入整数结果。
  - 根式化简：双槽输入 \([k]\sqrt{[m]}\)。
  - 可选增强：提供“因数拆解提示”而不是让学生打字。

**Stage D — DISTANCE（坐标距离：把勾股定理迁移到网格）**
- 目标：把 \(\Delta x,\Delta y\) 的直角三角形构造画出来，理解距离公式来源。
- 交互：坐标系 + 两点 + 虚线构成直角三角形 + 连线距离；再用两步槽位：
  - 第一步：只显示 \(d^2\) 的输入槽位，验证通过后自动进入第二步
  - 第二步：显示 \(d\) 的输入（整数或根式双槽），并保持图形不变以强化“同一距离的两种表征”

**Stage E — EXTEND（扩展：3D 体对角线 / 多次勾股）**
- 目标：迁移与综合（Elite）。
- 交互：3D 可视化可以后续迭代；第一版可先保持“结构提示 + 分步槽位”，但不应取代 2D 动态图形主线。

### 3.3 MG05 / MG06 的难度对齐原则（统一口径）
- BASIC：以“流程正确”为主，数值尽量可口算/易笔算，错误反馈给出“下一步应该做什么”。
- CORE：加入结构识别与轻度变形（仍避免复杂分数/大根号）。
- ADVANCED：加入迁移（坐标距离/更复杂括号结构），允许出现可化简根式。
- ELITE：允许综合/扩展内容（3D、多步组合、估算区间），但输入成本必须低（槽位/选择/拖拽优先）。

## 4) 统一交互组件规范（MG05/MG06 复用）

### 4.1 槽位输入（SlotInput）
- 类型：整数/有理数/分数（p/q）/根式（k 与 m 双槽）/布尔（Yes/No）。
- 行为：每槽只接收“短输入”，禁止要求输入完整表达式字符串。

### 4.2 提示层级（Hint Layers）
每题最多 3 层提示（避免信息过载）：
- Layer 1：目标格式（例如 \((x+A)(x+B)\) 或 \(c^2=a^2+b^2\)）
- Layer 2：关键恒等式/结构来源（展开、平方差、距离构造）
- Layer 3：匹配关系（例如 \(A+B\)、\(AB\)、\(\Delta x,\Delta y\)）

### 4.4 i18n 结构化规范（避免三语维护失控）
- 文案不使用扁平 key 堆叠；对提示按题型与层级组织为结构化对象，例如：
  - `mg06.hints.factorize.trinomial.layer1`
  - `mg06.hints.factorize.trinomial.layer2`
  - `mg06.hints.fractions.cancel.layer1`
- 动态内容（如系数、常数）由代码层插值拼接，i18n 只提供“通用恒等式/规则句”。

### 4.3 反馈规则
- 正确：只显示“Verified/Verifiziert/已验证”。
- 错误：显示“正确的结构/下一步”，而不是只给最终答案。

## 5) 验收清单（评审用）

### MG06（必须全部满足）
- Stage 链条完整：TERMS → FACTORIZE → FRACTIONS → EQUATIONS。
- FACTORIZE 提示包含：\((x+A)(x+B)=x^2+(A+B)x+AB\) 与匹配关系。
- 输入全部为槽位/短输入，且 KaTeX 渲染公式完整。
- 难度按钮在顶部，随时切换不丢 UI 结构。

### MG05（评审后进入开发的前置条件）
- 已完成 Basel-Stadt + Baselland 的“Sek 2 年级进度”对齐结论（从资料入口可复查）。
- Stage 结构确定，并明确每个 Stage 的动态可视化与输入方式。
- 根式输入采用双槽并验证规则明确（k,m 的合法性与化简一致性）。

## 6) 实施计划（代码改造顺序）

1) 先稳定 MG06：把 Stage 题库补齐、i18n 文案完善、提示层级一致化。
2) 完成 Basel-Stadt + Baselland 的 MG05 进度对齐总结（写入设计稿附录）。
3) 再改 MG05：按 Stage 逐个替换/实现（优先坐标距离可视化 + 根式输入）。

## 附录 A) Basel-Stadt / Baselland（Sek 2）进度对齐（工作版结论）

本附录用于把“我们要做的 MG05/MG06 内容”与 Basel 地区实际教学材料入口进行对齐，避免凭感觉定难度。由于 Basel-Stadt 官方站点在抓取时可能出现不可用情况，结论以 Lehrplan 21 + 教材章节结构 + Baselland 的 Stoffinhalte 文档入口为可复查依据。

### A.1 Basel-Stadt（Basel 市）
- 上位框架：Basel-Stadt 采用 Lehrplan 21 作为官方课程框架（用于能力目标对齐）。
  - 入口：Basel-Stadt Lehrplan 21 说明：https://www.lehrplan21.ch/kanton-basel-stadt
  - Lehrplan 21 Zyklus 3 数学总览：https://v-fe.lehrplan.ch/index.php?code=e%7C5%7C3

### A.2 Basel-Landschaft（Baselland）
- Baselland 提供 Sek I（1–3 年级）数学的 “Stoffinhalte und Themen（含 Treffpunkte）”文档入口，适合用于锁定 Sek 2 的主题范围与深度。
  - 文档入口与 PDF 见：[Basel_Curriculum_References.md](file:///Users/zengtao/science-theme-park/Resources/Basel_Curriculum_References.md)
- Baselland 的 Lehrplan 总览中明确：Zyklus 3 的一个 Orientierungspunkt设在 “Mitte der 2. Klasse der Sekundarschule”，用于教学进度规划与对齐（我们把这视为 Sek2 的“硬基线”）。
  - 入口：https://bl.lehrplan.ch/index.php?code=e%7C100%7C1

### A.3 教材章节对齐（Mathematik Sek — Mathematik 2）
- 章节结构为我们提供了“课堂推进顺序”的直接参考（可用于 MG05/MG06 的 Stage 顺序合理性校验）：
  - 1c：Gleichungen, Folgen und Wurzeln（方程/数列/平方根）
  - 2a–2d：Sätze von Thales und Pythagoras（泰勒斯与勾股）及其应用
  - 入口：https://003.lmvz.ch/lehrmittelsites/mathe_sek/de/m2/index.html

### A.4 对 MG05/MG06 的直接落地含义（第一性原理）
- MG06 主线（TERMS→FACTORIZE→FRACTIONS→EQUATIONS）与“代数技能链”一致，应以“可操作、可验证、可迁移”为核心，而非以求根公式为主线。
- MG05 主线应覆盖“Wurzeln（平方根/根式）”与“Pythagoras（勾股）”的结构化理解与应用迁移，且必须通过可视化与分步输入降低认知负荷。
