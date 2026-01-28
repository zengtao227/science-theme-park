# MG07 / MG08 开发计划（Basel-Stadt + Basel-Landschaft，Sek I 导向）

本计划以 “官方课程框架（Lehrplan 21）+ Basel 地区可复查教学材料入口 + MG05/MG06 的工程经验” 为第一性原理基础，目标是在不增加输入负担的前提下，逐步搭建可持续扩展的数学训练关卡体系。

参考资料入口统一维护在：[Basel_Curriculum_References.md](file:///Users/zengtao/science-theme-park/Resources/Basel_Curriculum_References.md)

## 1) 官方对齐依据（可复查入口）

- Basel-Stadt：Lehrplan 21（州级采用说明）
  - https://www.lehrplan21.ch/kanton-basel-stadt
- Lehrplan 21：Mathematik Zyklus 3 总览（能力框架）
  - https://v-fe.lehrplan.ch/index.php?code=e%7C5%7C3
- Basel-Landschaft：Lehrplan 总览与 Orientierungspunkt（Sek2 中点）
  - https://bl.lehrplan.ch/index.php?code=e%7C100%7C1
- 教材章节结构（Mathematik 1–3 Sek I，作为课堂推进顺序参考）
  - Mathematik 3（章节目录）：https://003.lmvz.ch/lehrmittelsites/mathe_sek/de/m3/index.html

## 2) 模块定位（为什么是 MG07 / MG08）

我们已完成：
- MG04：二项式恒等式（结构证明与展开/因式）
- MG05：勾股与平方根（数形结合、根式双槽、分步引导）
- MG06：代数技能链（TERMS→FACTORIZE→FRACTIONS→EQUATIONS）+ 三语 i18n 结构化

下一步（Sek I 进度顺序与可迁移能力）优先进入：
- **MG07：Geraden + lineare / nicht lineare Funktionen**（直线与函数）
  - 对齐教材：Mathematik 3 的 1a/1b（Geraden；Lineare und nicht lineare Funktionen）
- **MG08：Ähnliche Figuren + Streckung/Ähnlichkeit bei Körpern**（相似与伸缩）
  - 对齐教材：Mathematik 3 的 2a/2b（Ähnliche Figuren；Streckung/Ähnlichkeit bei Körpern）

## 3) 工程标准（继承 MG05/MG06 的经验）

- 输入成本控制
  - 不要求输入长表达式；优先用槽位（系数槽、比例槽、分数 p/q、根式 k√m）。
- 提示层级一致
  - 每题最多 3 条提示，且在右侧监视器统一显示 01/02/03。
- UI 适配长公式
  - 公式优先单行展示，卡片宽度随内容自适应；超出屏幕才允许外层水平滚动。
- i18n 强同步
  - EN/DE/CN 三语同时补齐；新增模块必须在 `home` 注册 `mg07_title/subtitle` 与 `mg08_title/subtitle`。
- 类型安全
  - 涉及首页/i18n 的修改必须本地 `npm run build` 通过后再推送。

## 4) MG07 关卡设计（直线与函数）

### Stage A — LINES（Geraden）
- 核心：斜率、截距、两点式到斜截式的转换、读图理解
- BASIC/CORE：给两点求斜率 m；给 m 与一点求 b
- ADVANCED：平行线同斜率；垂直线（可选）
- ELITE：两条直线交点（为后续方程组打基础）

### Stage B — LINEAR FUNCTION（y=mx+b）
- 核心：代入求值、解简单线性方程、含义解释（m 表示变化率）
- 输出：m、b、函数值 f(x) 或 x 的单槽/双槽

### Stage C — GRAPH MATCH（图像对齐）
- 核心：把方程与图像互相映射
- 实现：内置 SVG 坐标系 + 绘制直线；用户填 m、b 或选项匹配

## 5) MG08 关卡设计（相似与伸缩）

### Stage A — SCALE FACTOR（缩放因子 k）
- 核心：相似图形边长成比例，k 的意义
- BASIC/CORE：已知 k 求新边；或已知两边求 k

### Stage B — SIMILAR TRIANGLES（相似三角形）
- 核心：比例列式与未知量求解
- ADVANCED：含分数比例；保持输入为 p/q 或整数槽

### Stage C — SHADOW / MODEL（应用）
- 核心：影子/模型/地图比例尺（以“比例”求高度/距离）
- ELITE：加入单位与现实语境，但避免多余文本输入

## 6) 实施里程碑（自动执行）

1) 在首页增加 MG07 / MG08 卡片与路由入口。
2) 完成 MG07 页面（四难度 + 3 层提示 + SVG 图像能力）。
3) 完成 MG08 页面（四难度 + 3 层提示 + 比例应用）。
4) 补齐 i18n（EN/DE/CN）与默认德语 + 语言按钮国旗显示。
5) 本地 `npm run lint`、`npx tsc --noEmit`、`npm run build` 全通过后推送 GitHub。

