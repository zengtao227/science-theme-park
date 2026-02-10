# TASKS FOR KIRO — 数学模块场景化改造

**Assigned by**: Commander (Antigravity / Claude)  
**Date**: 2026-02-10  
**Priority**: P0 (Critical)  
**Deadline**: ASAP  

---

## ⚠️ 重要规则

1. **严格按照本文档的指令修改代码，不要自由发挥。**
2. **不要修改任何本文档未提到的文件。**
3. **不要修改任何组件的布局结构、样式或交互逻辑。** 本次任务只涉及 **文案替换** 和 **i18n 内容更新**。
4. **每完成一个 Task，运行 `npm run build` 确保无编译错误。**
5. **所有 Task 完成后，执行 `git add -A && git commit -m "feat: scenario-based redesign for SM1-01, SM2-01, SM2-02, SM2-03" && git push origin main`。**
6. **三语同步**：EN、CN、DE 三个语言的翻译需要同步更新。DE（德语）翻译如果不确定，可以用英语占位，但 **CN 和 EN 必须完整**。

---

## TASK 1: SM1-01 面积与体积 — 题目场景化

### 1.1 修改文件: `src/app/chamber/sm1-01/page.tsx`

**目标**: 将每道题的 `promptLatex` 和 `expressionLatex` 从纯数学表达改为带场景描述的文案。

#### 修改位置: `buildStagePool` 函数中的 AREAS 段 (约 line 26-66)

**原始代码 → 替换为：**

##### 题目 A1 (Rectangle)
```
原始:
  promptLatex: t.stages.areas_prompt_latex,
  expressionLatex: `\\text{Rectangle: }a=5,\\; b=8`,

替换为:
  promptLatex: `\\text{🎿 阿尔卑斯滑雪场需要铺设新雪道。雪道是长方形，}`,
  expressionLatex: `\\text{长 }a=5\\text{m, 宽 }b=8\\text{m，计算雪道面积}`,
```

##### 题目 A2 (Triangle)
```
原始:
  promptLatex: t.stages.areas_prompt_latex,
  expressionLatex: `\\text{Triangle: }b=6,\\; h=4`,

替换为:
  promptLatex: `\\text{⛵ 苏黎世帆船俱乐部需要订制新帆布。帆是三角形，}`,
  expressionLatex: `\\text{底边 }b=6\\text{m, 高 }h=4\\text{m，计算帆的面积}`,
```

##### 题目 A3 (Trapezoid)
```
原始:
  promptLatex: t.stages.areas_prompt_latex,
  expressionLatex: `\\text{Trapezoid: }a=4,\\; b=6,\\; h=5`,

替换为:
  promptLatex: `\\text{🌊 巴塞尔莱茵河防洪闸门截面是梯形，}`,
  expressionLatex: `\\text{上底 }a=4\\text{m, 下底 }b=6\\text{m, 高 }h=5\\text{m, 求截面积}`,
```

##### 题目 A4 (Circle)
```
原始:
  promptLatex: t.stages.areas_prompt_latex,
  expressionLatex: `\\text{Circle: }r=3`,

替换为:
  promptLatex: `\\text{🧀 格律耶尔奶酪工厂的圆形模具，}`,
  expressionLatex: `\\text{半径 }r=3\\text{cm，计算模具底面积}`,
```

#### 修改位置: VOLUMES 段 (约 line 73-108)

##### 题目 V1 (Cube)
```
原始:
  promptLatex: t.stages.volumes_prompt_latex,
  expressionLatex: `\\text{Cube: }a=4`,

替换为:
  promptLatex: `\\text{🏠 瑞士木屋阁楼是正方体空间，需要选购空气净化器，}`,
  expressionLatex: `\\text{边长 }a=4\\text{m，计算空间体积}`,
```

##### 题目 V2 (Rectangular Prism)
```
原始:
  promptLatex: t.stages.volumes_prompt_latex,
  expressionLatex: `\\text{Rectangular Prism: }a=3,\\; b=4,\\; c=5`,

替换为:
  promptLatex: `\\text{📦 CERN 实验室需要一个精密仪器的储存箱，}`,
  expressionLatex: `\\text{长 }a=3\\text{m, 宽 }b=4\\text{m, 高 }c=5\\text{m, 计算储存箱容积}`,
```

##### 题目 V3 (Cylinder)
```
原始:
  promptLatex: t.stages.volumes_prompt_latex,
  expressionLatex: `\\text{Cylinder: }r=2,\\; h=5`,

替换为:
  promptLatex: `\\text{🧀 格律耶尔奶酪工厂的圆柱形模具，}`,
  expressionLatex: `\\text{半径 }r=2\\text{cm, 高 }h=5\\text{cm, 计算模具容积}`,
```

### 1.2 修改文件: `src/lib/i18n.ts` (SM1-01 部分)

**目标**: 将 `areas_prompt_latex` 和 `volumes_prompt_latex` 改为更通用的场景引导语（因为每题的 prompt 现在在 page.tsx 中是独立的，这里只作为 fallback）。

#### EN 段 (约 line 1307-1308)
```
原始:
  areas_prompt_latex: "\\text{Calculate the area of the given figure.}",
  volumes_prompt_latex: "\\text{Calculate the volume or surface area.}",

替换为:
  areas_prompt_latex: "\\text{Read the scenario and calculate the required area.}",
  volumes_prompt_latex: "\\text{Read the scenario and calculate the required volume.}",
```

#### CN 段 (约 line 3473-3474)
```
原始:
  areas_prompt_latex: "\\text{计算给定图形的面积。}",
  volumes_prompt_latex: "\\text{计算几何体的体积或表面积。}",

替换为:
  areas_prompt_latex: "\\text{阅读场景，计算所需面积。}",
  volumes_prompt_latex: "\\text{阅读场景，计算所需体积。}",
```

#### DE 段 (搜索 `sm1_01` 在 DE section 中)
```
替换为对应的德语:
  areas_prompt_latex: "\\text{Lies das Szenario und berechne die Fläche.}",
  volumes_prompt_latex: "\\text{Lies das Szenario und berechne das Volumen.}",
```

### 1.3 验收标准
- [ ] 打开 SM1-01，AREAS 阶段的 4 道题都显示带场景的描述（滑雪场、帆船、防洪闸门、奶酪）。
- [ ] VOLUMES 阶段的 3 道题都显示场景描述（木屋、CERN 储存箱、奶酪模具）。
- [ ] `npm run build` 通过，无 TypeScript 错误。
- [ ] 数学公式和输入逻辑不受影响（expected 值不变）。

---

## TASK 2: SM2-01 二项式定理 — 场景文案替换

### 2.1 修改文件: `src/lib/i18n.ts` (SM2-01 部分)

**目标**: 替换所有不合理的场景描述。将"建筑师/收银员"场景改为合理的几何面积拼接场景。

#### EN 段 (约 line 983-998)

```
原始:
  scenarios: {
    architect_title: "Scenario A: The Architect",
    architect_desc: "Calculate material for room extensions. Don't forget the corners!",
    architect_context: "An architect is designing a new house for a client. The living room needs new carpet. The architect has measured the room dimensions and now needs to calculate the exact carpet area to order the right amount of material from the supplier.",
    scrapper_title: "Scenario B: The Scrapper",
    scrapper_desc: "Reconstruct debris into perfect squares for spaceport docking.",
    scrapper_context: "A recycling center needs to order new recycling bins. Each bin has a fixed volume capacity. The center manager needs to calculate how many bins are required to hold all the materials collected this week.",
    speedster_title: "Scenario C: The Speedster",
    speedster_desc: "Master the art of rapid mental estimation using expansions.",
    speedster_context: "A math competition student is training for rapid calculation skills. The coach presents a series of geometric shapes and requires calculating all areas in the shortest time possible.",
    voyager_context: "A sailboat is navigating at sea. The captain needs to calculate the shortest distance from the current position to the destination port. Using GPS coordinates, the captain can calculate the straight-line distance using the Pythagorean theorem.",
    architect_mission: "Task: Expand the blueprints to buy the correct amount of carpet.",
    scrapper_mission: "Task: Factor the debris cluster into a stable docking square.",
    speedster_mission: "Task: Calculate the target value instantly using (a+b)² shortcuts.",
    voyager_mission: "Task: Calculate the sailing distance.",
    elite_mission: "Task: Deconstruct complex clusters into secondary polynomial forms."
  },

替换为:
  scenarios: {
    architect_title: "Scenario A: Garden Extension",
    architect_desc: "Your lakeside garden (a×a) is being extended by b meters on each side. Calculate the new total area.",
    architect_context: "You own a square garden plot by Lake Zurich with side length 'a' meters. The city allows you to extend it by 'b' meters on two sides. To buy the right amount of soil and seeds, you need to know the new total area. Notice: the total area is NOT simply a² + b² — the two rectangular strips and the corner square matter!",
    scrapper_title: "Scenario B: Tile Factory",
    scrapper_desc: "A factory produced tiles in three shapes. Reassemble them into a perfect square.",
    scrapper_context: "A Swiss tile factory produces three types of tiles: one large square (a²), two rectangular strips (a×b each), and one small square (b²). Your job is to verify that these four pieces can be perfectly assembled into a single large square of side (a+b). This proves the binomial identity geometrically.",
    speedster_title: "Scenario C: Mental Math Sprint",
    speedster_desc: "Compute large squares instantly by splitting them into (round + offset)².",
    speedster_context: "In a Swiss math olympiad, you need to square numbers like 103 or 47 in your head. The trick: split 103 into (100+3), then use (a+b)² = a² + 2ab + b² = 10000 + 600 + 9 = 10609. Much faster than multiplying 103×103 directly!",
    voyager_context: "Two square fields share a common boundary. One has side 'a', the other side 'b'. A surveyor measures the combined area vs the individual areas to verify the difference formula (a+b)(a-b) = a² - b².",
    architect_mission: "Task: Calculate the expanded garden area using (a+b)² = a² + 2ab + b².",
    scrapper_mission: "Task: Identify a and b from the expanded form and reconstruct the perfect square.",
    speedster_mission: "Task: Break the number into (round ± offset) and use binomial expansion to compute instantly.",
    voyager_mission: "Task: Use the difference of squares formula to find the area difference.",
    elite_mission: "Task: Factor the complex polynomial into binomial product form."
  },
```

#### CN 段 (约 line 3149-3164)

```
替换为:
  scenarios: {
    architect_title: "场景 A: 花园扩建",
    architect_desc: "你的湖畔花园（a×a）要向外扩展 b 米。计算新的总面积。",
    architect_context: "你在苏黎世湖边有一块边长为 a 米的正方形花坛。市政府批准你可以向两侧各扩展 b 米。为了购买正确数量的泥土和种子，你需要计算新的总面积。注意：总面积并不只是 a² + b²，还有两条矩形带和一个角落小方块！",
    scrapper_title: "场景 B: 瓷砖工厂",
    scrapper_desc: "工厂生产了三种形状的瓷砖，把它们拼成一个完美正方形。",
    scrapper_context: "一家瑞士瓷砖工厂生产了三种瓷砖：一块大正方形 (a²)、两块长方形 (各 a×b)、一块小正方形 (b²)。你的任务是验证这四块砖能完美拼成一个边长为 (a+b) 的大正方形。这就是二项式恒等式的几何证明。",
    speedster_title: "场景 C: 速算冲刺",
    speedster_desc: "把大数分拆成 (整数 + 零头)²，瞬间计算。",
    speedster_context: "在瑞士数学奥林匹克中，你需要在脑中计算 103² 或 47² 这样的数字。技巧：把 103 分拆成 (100+3)，然后用 (a+b)² = a² + 2ab + b² = 10000 + 600 + 9 = 10609。比直接算 103×103 快得多！",
    voyager_context: "两块正方形田地共享一条边界。一块边长 a，另一块边长 b。测量员通过比较合并面积和各自面积来验证差的公式 (a+b)(a-b) = a² - b²。",
    architect_mission: "任务：用 (a+b)² = a² + 2ab + b² 计算扩建后的花园面积。",
    scrapper_mission: "任务：从展开式中识别 a 和 b，重新拼回完美正方形。",
    speedster_mission: "任务：把数字拆成 (整数 ± 零头)，用二项式展开瞬间计算。",
    voyager_mission: "任务：用平方差公式计算面积差。",
    elite_mission: "任务：将复杂多项式分解为二项式乘积形式。"
  },
```

#### DE 段 (搜索 `sm2_01` 在 DE section 中, 找到 scenarios)

```
替换为:
  scenarios: {
    architect_title: "Szenario A: Gartenerweiterung",
    architect_desc: "Dein Garten am See (a×a) wird um b Meter erweitert. Berechne die neue Gesamtfläche.",
    architect_context: "Du besitzt ein quadratisches Gartenbeet am Zürichsee mit Seitenlänge 'a' Meter. Die Stadt erlaubt dir, es um 'b' Meter auf zwei Seiten zu erweitern. Um die richtige Menge Erde und Samen zu kaufen, musst du die neue Gesamtfläche kennen.",
    scrapper_title: "Szenario B: Fliesenfabrik",
    scrapper_desc: "Eine Fabrik hat drei Fliesenformen produziert. Setze sie zu einem perfekten Quadrat zusammen.",
    scrapper_context: "Eine Schweizer Fliesenfabrik produziert drei Arten von Fliesen: ein grosses Quadrat (a²), zwei rechteckige Streifen (je a×b) und ein kleines Quadrat (b²). Deine Aufgabe ist es zu überprüfen, dass diese vier Teile perfekt zu einem grossen Quadrat der Seitenlänge (a+b) zusammengesetzt werden können.",
    speedster_title: "Szenario C: Kopfrechen-Sprint",
    speedster_desc: "Berechne grosse Quadratzahlen sofort durch Aufteilen in (Runde+Rest)².",
    speedster_context: "Im Schweizer Mathe-Olympiad musst du Zahlen wie 103 oder 47 im Kopf quadrieren. Der Trick: 103 = (100+3), dann (a+b)² = 10000 + 600 + 9 = 10609.",
    voyager_context: "Zwei quadratische Felder teilen eine gemeinsame Grenze. Eines hat die Seitenlänge a, das andere b.",
    architect_mission: "Aufgabe: Berechne die erweiterte Gartenfläche mit (a+b)² = a² + 2ab + b².",
    scrapper_mission: "Aufgabe: Identifiziere a und b aus der expandierten Form und rekonstruiere das Quadrat.",
    speedster_mission: "Aufgabe: Zerlege die Zahl in (Runde ± Rest) und nutze die binomische Formel.",
    voyager_mission: "Aufgabe: Nutze die dritte binomische Formel zur Flächendifferenz.",
    elite_mission: "Aufgabe: Faktorisiere das komplexe Polynom in binomischer Produktform."
  },
```

### 2.2 同时更新 Tab 名称 (可选但推荐)

#### EN 段 (约 line 1008-1014)
```
原始:
  tabs: {
    explore: "EXPLORE",
    architect: "ARCHITECT",
    scrapper: "SCRAPPER",
    speedster: "SPEEDSTER",
    voyager: "VOYAGER",
    elite: "ELITE"
  },

替换为:
  tabs: {
    explore: "EXPLORE",
    architect: "GARDEN",
    scrapper: "TILE LAB",
    speedster: "SPRINT",
    voyager: "VOYAGER",
    elite: "ELITE"
  },
```

#### CN 段 (约 line 3174-3180)
```
替换为:
  tabs: {
    explore: "探索",
    architect: "花园扩建",
    scrapper: "瓷砖实验室",
    speedster: "速算冲刺",
    voyager: "航行者",
    elite: "精英"
  },
```

### 2.3 验收标准
- [ ] 打开 SM2-01，每个 Tab（GARDEN/TILE LAB/SPRINT/VOYAGER/ELITE）的任务描述都与二项式有直接逻辑关系。
- [ ] "花园扩建" 场景让学生直观理解 (a+b)² 为什么不等于 a² + b²（因为少了 2ab）。
- [ ] "速算冲刺" 场景展示了二项式在心算中的实际用途。
- [ ] `npm run build` 通过。

---

## TASK 3: SM2-02 勾股定理 — 题目场景化

### 3.1 修改文件: `src/lib/i18n.ts` (SM2-02 部分)

**目标**: 给 `pythagoras` 下的各子类型加上场景化描述。

#### EN 段 (约 line 676-682)

```
原始:
  pythagoras: {
    solve_hyp: "Find hypotenuse",
    solve_leg: "Find leg",
    check_right: "Check right triangle",
    distance: "Distance on grid",
    elite_space: "Space diagonal"
  },

替换为:
  pythagoras: {
    solve_hyp: "🚒 Fire rescue: Find the ladder length",
    solve_leg: "🏔️ Mountain climb: Find the vertical height",
    check_right: "📐 Engineering check: Is this a right triangle?",
    distance: "🚁 Drone delivery: Calculate flight distance",
    elite_space: "🔬 CERN lab: Find the space diagonal"
  },
```

#### CN 段 (约 line 2842-2847)

```
原始:
  pythagoras: {
    solve_hyp: "求斜边",
    solve_leg: "求直角边",
    check_right: "判定直角三角形",
    distance: "坐标距离",
    elite_space: "空间对角线"
  },

替换为:
  pythagoras: {
    solve_hyp: "🚒 消防救援：计算消防梯最短长度",
    solve_leg: "🏔️ 阿尔卑斯登山：计算垂直攀升高度",
    check_right: "📐 工程验收：这是直角三角形吗？",
    distance: "🚁 无人机快递：计算直线飞行距离",
    elite_space: "🔬 CERN 实验室：计算空间对角线"
  },
```

#### DE 段 (搜索 `sm2_02` 在 DE section)

```
替换为:
  pythagoras: {
    solve_hyp: "🚒 Feuerwehr: Leiterlänge berechnen",
    solve_leg: "🏔️ Bergrettung: Vertikale Höhe finden",
    check_right: "📐 Ingenieurscheck: Rechtwinkliges Dreieck?",
    distance: "🚁 Drohnenlieferung: Flugdistanz berechnen",
    elite_space: "🔬 CERN Labor: Raumdiagonale finden"
  },
```

### 3.2 修改文件: `src/app/chamber/sm2-02/page.tsx`

**目标**: 在 `buildStagePool` 的 SOLVE_HYP 段中，给 `promptLatex` 加上场景描述。

#### SOLVE_HYP 段 (约 line 126)

```
原始:
  promptLatex: `${t.pythagoras.solve_hyp}:\\; a=${a},\\; b=${b}`,

替换为:
  promptLatex: `${t.pythagoras.solve_hyp}:\\; \\text{水平距离 }a=${a}\\text{m, 垂直高度 }b=${b}\\text{m}`,
```

> **注意**: 上面的替换只影响 promptLatex 的文案。数学逻辑（a, b, c 的计算）完全不动！

#### SOLVE_LEG 段 (约 line 161)

```
原始:
  promptLatex: `${t.pythagoras.solve_leg}:\\; c=${c},\\; ${knownIsA ? "a" : "b"}=${known}`,

替换为:
  promptLatex: `${t.pythagoras.solve_leg}:\\; \\text{绳索全长 }c=${c}\\text{m, ${knownIsA ? "水平移动" : "已知"} }${knownIsA ? "a" : "b"}=${known}\\text{m}`,
```

#### DISTANCE 段 (约 line 241)

```
原始:
  promptLatex: `${t.pythagoras.distance}:\\; (${x1},${y1})\\to(${x2},${y2})`,

替换为:
  promptLatex: `${t.pythagoras.distance}:\\; \\text{从 }(${x1},${y1})\\text{ 飞往 }(${x2},${y2})`,
```

### 3.3 验收标准
- [ ] 打开 SM2-02，SOLVE_HYP 阶段显示"消防救援：计算消防梯最短长度 | 水平距离 a=3m, 垂直高度 b=4m"。
- [ ] SOLVE_LEG 阶段显示"登山：绳索全长 c=..., 水平移动 a=..."。
- [ ] DISTANCE 阶段显示"无人机快递：从 (x1,y1) 飞往 (x2,y2)"。
- [ ] 数学计算逻辑完全不变（expected 值、steps、visual 都不动）。
- [ ] `npm run build` 通过。

---

## TASK 4: SM2-03 直线与函数 — 场景文案替换

### 4.1 修改文件: `src/lib/i18n.ts` (SM2-03 部分)

**目标**: 将"激光实验室"概念替换为"瑞士铁路票价计算器"概念，让斜率和截距有物理意义。

#### EN 段 (约 line 857-909)

**修改 mission 段落：**

```
原始:
  mission: {
    title: "LASER REFLECTION LAB",
    description: "Use linear equations to reflect lasers off walls and hit targets. Master y = mx + c."
  },

替换为:
  mission: {
    title: "SWISS RAILWAY FARE CALCULATOR",
    description: "Model railway ticket prices as linear functions. Slope = cost per km, intercept = base fare. Find the break-even point between fare plans!"
  },
```

**修改 prompts 段落：**

```
原始:
  prompts: {
    level1: "\\text{Hit the target with one reflection}",
    level2: "\\text{Predict and hit the moving target}",
    level3: "\\text{Hit the target with two reflections}"
  },

替换为:
  prompts: {
    level1: "\\text{🚂 Calculate the ticket price for the given destination}",
    level2: "\\text{🚂 Find the distance where two fare plans cost the same}",
    level3: "\\text{🚂 Design a fare plan that is cheapest for long-distance travel}"
  },
```

**修改 hints 段落：**

```
原始:
  hints: {
    level1: "Use one reflection to hit the target. Adjust slope and intercept.",
    level2: "Target is moving. Predict its position and adjust your laser path.",
    level3: "Use two reflections to reach the target. Complex trajectory required.",
    drag: "Drag the control points on the line to edit slope and intercept."
  },

替换为:
  hints: {
    level1: "Slope m = cost per km. Intercept c = base fare (standing charge). Total fare y = m × distance + c.",
    level2: "Two fare plans have different m and c. Find the intersection point — that's where they cost the same!",
    level3: "Design the slope and intercept so your plan is cheapest beyond a certain distance.",
    drag: "Adjust the slider to change the slope (cost/km) and intercept (base fare)."
  },
```

**修改 labels 段落中的 slope 和 intercept：**

```
原始:
  labels: {
    ...
    slope: "Slope (m)",
    intercept: "Intercept (c)"
  },

替换为:
  labels: {
    ...
    slope: "Cost per km (m)",
    intercept: "Base fare (c)"
  },
```

**修改 ui 段落：**

```
原始:
  ui: {
    current_function: "Current Function",
    reflections: "Reflections",
    target_position: "Target Position",
    hit_badge: "TARGET HIT",
    chamber: "CHAMBER",
    laser_sim: "LASER_SIM",
    level: "LEVEL",
    hits: "Hits"
  },

替换为:
  ui: {
    current_function: "Fare Formula",
    reflections: "Fare Plans",
    target_position: "Destination (km)",
    hit_badge: "FARE MATCHED",
    chamber: "STATION",
    laser_sim: "FARE_CALC",
    level: "LEVEL",
    hits: "Matches"
  },
```

#### CN 段 (约 line 3023-3075)

```
替换整个 sm2_03 的场景相关文案:

  mission: {
    title: "瑞士铁路票价计算器",
    description: "将铁路票价建模为线性函数。斜率 = 每公里费用，截距 = 基础票价。找到两种票价方案的临界点！"
  },
  prompts: {
    level1: "\\text{🚂 计算到达目的地的票价}",
    level2: "\\text{🚂 找到两种票价方案费用相同的距离}",
    level3: "\\text{🚂 设计一个适合长途旅行的最优票价方案}"
  },
  hints: {
    level1: "斜率 m = 每公里费用。截距 c = 基础票价（起步价）。总票价 y = m × 距离 + c。",
    level2: "两种票价方案的 m 和 c 不同。找到交点——那就是费用相同的距离！",
    level3: "调整斜率和截距，让你的方案在某个距离之后变得最便宜。",
    drag: "调整滑块来改变斜率（每公里费用）和截距（基础票价）。"
  },
  labels: {
    input: "输入",
    hints: "提示",
    emitter: "出发站",
    target: "目的地",
    slope: "每公里费用 (m)",
    intercept: "基础票价 (c)"
  },
  ui: {
    current_function: "票价公式",
    reflections: "票价方案",
    target_position: "目的地 (km)",
    hit_badge: "票价已匹配",
    chamber: "站台",
    laser_sim: "票价计算",
    level: "等级",
    hits: "匹配"
  },
```

#### DE 段 (搜索 `sm2_03` 在 DE section)

```
类似地替换为德语:
  mission: {
    title: "SBB FAHRPREIS-RECHNER",
    description: "Modelliere Bahnticketpreise als lineare Funktionen. Steigung = Kosten/km, Achsenabschnitt = Grundgebühr."
  },
  ...（省略，按上述模式翻译）
```

### 4.2 修改文件: `src/app/chamber/sm2-03/page.tsx`

**目标**: 更新 `buildStagePool` 中的题目文案。

#### LEVEL1 段 (约 line 22-51)

```
原始:
  expressionLatex: "\\text{Target: }(8, 6)",

替换为:
  expressionLatex: "\\text{🚂 Distance: 8km, Budget: 6 CHF}",
```

```
原始:
  expressionLatex: "\\text{Target: }(7, 4)",

替换为:
  expressionLatex: "\\text{🚂 Distance: 7km, Budget: 4 CHF}",
```

#### LEVEL2 段 (约 line 54-70)

```
原始:
  expressionLatex: "\\text{Target: }(6, 8)",

替换为:
  expressionLatex: "\\text{🚂 Distance: 6km, Fare limit: 8 CHF}",
```

#### LEVEL3 段 (约 line 73-88)

```
原始:
  expressionLatex: "\\text{Target: }(9, 5)",

替换为:
  expressionLatex: "\\text{🚂 Route: 9km, Competing fare: 5 CHF}",
```

### 4.3 验收标准
- [ ] 打开 SM2-03，MISSION 标题显示"瑞士铁路票价计算器"而不是"激光反射实验室"。
- [ ] 每道题显示"🚂 Distance: ...km, Budget: ... CHF"而不是"Target: (8, 6)"。
- [ ] Slider labels 显示 "Cost per km (m)" 和 "Base fare (c)" 而非 "Slope (m)" 和 "Intercept (c)"。
- [ ] `npm run build` 通过。

---

## 最终验收 (Commander 执行)

Commander 将在所有 4 个 Task 完成且 push 到 GitHub 后，进行以下验收：

1. `npm run build` 编译无错误。
2. 打开每个模块的页面，截图确认场景描述正确显示。
3. 验证输入逻辑、expected 值、Canvas 组件不受影响。
4. 确认 CN 和 EN 翻译均已更新。
5. Vercel 部署成功。

---

## 附录: 文件修改总览

| 文件 | 修改类型 | 涉及 Task |
|------|---------|-----------|
| `src/app/chamber/sm1-01/page.tsx` | promptLatex/expressionLatex 文案 | TASK 1 |
| `src/lib/i18n.ts` (EN/CN/DE sm1_01 段) | prompt_latex 文案 | TASK 1 |
| `src/lib/i18n.ts` (EN/CN/DE sm2_01.scenarios 段) | 场景描述全面替换 | TASK 2 |
| `src/lib/i18n.ts` (EN/CN/DE sm2_01.tabs 段) | Tab 名称更新 | TASK 2 |
| `src/lib/i18n.ts` (EN/CN/DE sm2_02.pythagoras 段) | 子类型名称场景化 | TASK 3 |
| `src/app/chamber/sm2-02/page.tsx` | promptLatex 文案 | TASK 3 |
| `src/lib/i18n.ts` (EN/CN/DE sm2_03 段) | mission/prompts/hints/labels/ui | TASK 4 |
| `src/app/chamber/sm2-03/page.tsx` | expressionLatex 文案 | TASK 4 |
