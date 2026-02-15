/**
 * CN - MATH translations
 * Auto-generated from i18n.ts refactoring
 * Last updated: 2026-02-15
 */

export const cnMath = {
  em1_01: {
          back: "返回枢纽",
          title: "EM1.01 // THALES TOWER",
          difficulty: {
              basic: "基础",
              core: "核心",
              advanced: "进阶",
              elite: "精英"
          },
          objective_title: "当前任务目标",
          target_title: "Tower Height",
          next: "执行下一序列",
          check: "验证",
          correct: "已验证",
          incorrect: "不匹配",
          ready: "就绪",
          monitor_title: "EM1.01_THALES_MONITOR",
          footer_left: "EM1.01_THALES_TOWER // NODE: BASEL",
          stages: {
              measure: "测量"
          },
          measure_prompt_latex: "\\text{Use }\\frac{h}{H}=\\frac{l}{L}\\text{ to solve tower height.}",
          labels: {
              input: "输入",
              hints: "提示",
              readings: "READINGS",
              pole_height: "Pole Height (h)",
              pole_shadow: "Pole Shadow (l)",
              tower_shadow: "Tower Shadow (L)",
              sun_angle: "Sun Angle",
              solve_height: "Solve Tower Height (H)",
              height_placeholder: "height in meters",
              hint_ratio: "Hint: h/H = l/L"
          },
          mission: {
              title: "MISSION: BASEL CATHEDRAL SURVEY",
              description: "Measure the tower height using Thales' theorem and shadow ratios."
          }
      },
  em2_01: {
          back: "返回枢纽",
          title: "EM2.01 // 矩阵几何",
          difficulty: {
              basic: "基础",
              core: "核心",
              advanced: "进阶",
              elite: "精英"
          },
          objective_title: "当前任务目标",
          target_title: "变换矩阵",
          next: "执行下一序列",
          check: "验证",
          correct: "已验证",
          incorrect: "匹配失败",
          ready: "就绪",
          monitor_title: "EM2.01_矩阵监视器",
          footer_left: "EM2.01_矩阵几何 // 节点：巴塞尔",
          labels: {
              matrix: "矩阵 A",
              properties: "属性",
              determinant: "行列式",
              volume_scale: "体积缩放",
              formulas: "公式",
              angle: "旋转角度 (θ)",
              scale_x: "X轴缩放",
              scale_y: "Y轴缩放",
              scale_z: "Z轴缩放",
              shear_xy: "Y对X的切变",
              shear_xz: "Z对X的切变",
              matrix_title: "矩阵 A",
              det_value: "det(A) = {value}",
              show_eigenvectors: "显示特征向量",
              show_grid: "显示网格",
              animate: "动画"
          },
          presets: {
              title: "预设",
              scale: "缩放",
              rotate: "旋转 90°",
              shear: "切变",
              reflect: "镜像"
          },
          linear: {
              title: "线性代数",
              line_1: "Ax = λx（特征值方程）",
              line_2: "det(A - λI) = 0",
              line_3: "T(v) = Av"
          },
          mission: {
              title: "任务：线性变换",
              description: "在三维空间中可视化线性代数。探索矩阵变换、特征向量和几何直觉。"
          },
          stages: {
              basic_transforms: "基础变换",
              determinant: "行列式",
              composition: "复合变换"
          },
          scenario_title: "巴塞尔工程任务",
          scenarios: {
              basic_transforms: "罗氏制药分子分析：您在罗氏巴塞尔的计算化学部门工作，使用线性变换分析蛋白质分子的对称性。每个矩阵代表一个对称操作（旋转、反射、缩放）。识别变换类型对于预测分子的光学性质至关重要。",
              determinant: "诺华晶体结构：您在诺华巴塞尔分析药物晶体的单元格结构。行列式表示晶格的体积变化。det(A)=0 表示晶体结构坍缩，det(A)<0 表示手性反转。准确计算行列式对于预测药物的生物活性至关重要。",
              composition: "巴塞尔大学机器人学：您在巴塞尔大学机器人实验室编程机械臂。每个关节的运动由一个变换矩阵表示。复合变换 AB 表示先执行关节A的运动，再执行关节B的运动。矩阵乘法的顺序决定了机械臂的最终位置。"
          },
          explanation_label: "解释"
      },
  gm1_01: {
              back: "返回枢纽",
              title: "GM1.01 // 微积分初步",
              tabs: {
                  explore: "探索",
                  slope: "斜率",
                  tangent: "切线",
                  rate: "变化率",
                  elite: "精英"
              },
              explore_title: "00 // 交互式探索",
              explore_instruction: "在抛物线 y = x² 上拖动点 P，观察切线如何变化。斜率 m 表示瞬时变化率。",
              explore_hint: "在右侧视觉监视器中拖动点 P →",
              current_point: "当前点",
              slope_label: "切线斜率",
              mission: {
                  title: "导数道路模拟器",
                  description: "通过在数学曲线上驾驶汽车来掌握微积分。导数告诉你道路在每个点的斜率。让汽车的角度与道路完美匹配！"
              },
              spotlight: {
                  title: "科学家聚光灯",
                  euler_name: "莱昂哈德·欧拉",
                  euler_bio: "巴塞尔出身的分析大师。欧拉用符号重塑了微积分，让曲线、运动与级数遵循清晰而优雅的法则。",
                  bernoulli_name: "约翰·伯努利",
                  bernoulli_bio: "伯努利家族以挑战与竞争锻造微积分。约翰完善微分方法，将加速度与曲线形态连接。"
              },
              objective_title: "当前任务目标",
              target_title: "目标",
              next: "执行下一序列",
              check: "验证",
              correct: "已验证",
              incorrect: "不匹配",
              ready: "就绪",
              difficulty: {
                  basic: "基础",
                  core: "核心",
                  advanced: "高级",
                  elite: "精英"
              },
              hints_title: "公式参考",
              monitor_title: "GM1.01_视觉监控",
              status: "状态: 运行中",
              footer_left: "GM1.01_微积分 // 节点: 巴塞尔",
              footer_right: "导数模拟器",
              stages: {
                  intro: "微积分基础",
                  differentiation: "微分规则",
                  application: "应用题",
                  power_rule: "幂规则",
                  factor_rule: "因子规则",
                  sum_rule: "和规则",
                  product_rule: "乘积规则",
                  quotient_rule: "商规则",
                  chain_rule: "链式法则",
                  intro_prompt_latex: "\\text{计算 }x^n\\text{ 的导数。}",
                  differentiation_prompt_latex: "\\text{应用微分规则计算。}",
                  application_prompt_latex: "\\text{应用微积分解决问题。}",
                  power_rule_prompt_latex: "\\text{在给定点计算 }f'(x)\\text{。}",
                  factor_rule_prompt_latex: "\\text{使用因子规则计算 }f'(x)\\text{。}",
                  sum_rule_prompt_latex: "\\text{使用和规则计算 }f'(x)\\text{。}",
                  product_rule_prompt_latex: "\\text{使用乘积规则计算 }f'(x)\\text{。}",
                  quotient_rule_prompt_latex: "\\text{使用商规则计算 }f'(x)\\text{。}",
                  chain_rule_prompt_latex: "\\text{使用链式法则计算 }f'(x)\\text{。}"
              },
              labels: {
                  secant_slope: "割线斜率 m",
                  tangent_slope: "切线斜率 m",
                  velocity: "速度 v",
                  x_coordinate: "x 坐标",
                  hints: "提示"
              },
              formulas: {
                  power_rule: "f'(x) = n\\cdot x^{n-1}",
                  factor_rule: "(a\\cdot f)' = a\\cdot f'",
                  sum_rule: "(f+g)' = f' + g'",
                  product_rule: "(uv)' = u'v + uv'",
                  quotient_rule: "\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}",
                  chain_rule: "\\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx}"
              },
              scenarios: {
                  power_rule: "🚗 场景：汽车在山坡上加速 — 你驾驶一辆特斯拉爬上一座弯曲的山坡。道路高度遵循 h(x) = x²。导数 h'(x) 告诉你道路在每个点的陡峭程度。如果你以错误的角度倾斜汽车，它会刮到地面或翻倒！计算正确的斜率（导数），使汽车底盘与路面完美对齐。这正是自动驾驶汽车实时计算地形角度的方式。",
                  factor_rule: "🏗️ 场景：建筑缩放 — 一位建筑师设计了一座高度为 h(x) = x² 的建筑。当城市要求所有尺寸按因子 3 缩放时，新高度变为 H(x) = 3x²。导数告诉你缩放后建筑的斜率如何变化。使用因子规则：如果 f(x) = a·g(x)，则 f'(x) = a·g'(x)。常数因子 3 保持在导数外面，使计算更简单！",
                  sum_rule: "🌊 场景：海洋波浪叠加 — 两个海浪叠加：波浪 A 的高度为 h₁(x) = x²，波浪 B 的高度为 h₂(x) = 3x。总波浪高度为 H(x) = x² + 3x。要预测组合波浪上升的速度，使用和规则：(f + g)' = f' + g'。分别计算每个波浪的斜率，然后相加。这就是海洋学家预测海啸波浪行为的方式！",
                  product_rule: "🌊 场景：冲浪板在波浪上 — 一名冲浪者在由 h(x) = x·sin(x) 描述的波浪上冲浪。波浪高度取决于位置 (x) 和正弦波模式。为了保持平衡，冲浪者需要知道波浪在每个点的斜率。使用乘积规则：如果 f(x) = u(x)·v(x)，则 f'(x) = u'·v + u·v'。这告诉你波浪上升或下降的速度，帮助冲浪者调整姿势。",
                  quotient_rule: "📊 场景：股票市场效率比 — 一位金融分析师追踪公司的效率比：利润(x) / 成本(x)。随着市场条件变化（x = 月份时间），利润和成本都在变化。要预测效率是提高还是下降，你需要这个比率的导数。使用商规则：如果 f(x) = u(x)/v(x)，则 f'(x) = [u'·v - u·v'] / v²。这告诉投资者公司效率随时间是提高还是降低。",
                  chain_rule: "⚙️ 场景：自行车齿轮系统 — 你正在骑自行车爬山。踏板旋转产生链条运动：踏板角度 → 链条速度 → 车轮旋转。如果链条绕齿轮的速度快两倍（因子为 2），则 f(x) = sin(2x)。链式法则告诉你：如果外部函数改变，乘以内部函数的速率。这就是自行车码表如何从踏板旋转计算你的实际速度！"
              },
              canvas: {
                  title: "导数道路",
                  subtitle_power: "f(x) = x²",
                  subtitle_factor: "f(x) = ax²",
                  subtitle_sum: "f(x) = x² + x",
                  subtitle_product: "f(x) = x·sin(x)",
                  subtitle_quotient: "f(x) = x/sin(x)",
                  subtitle_chain: "f(x) = sin(2x)",
                  x_label: "x",
                  y_label: "f(x)",
                  slope_label: "道路斜率",
                  your_slope: "你的斜率",
                  correct_slope: "正确斜率",
                  status_chamber: "实验室",
                  status_sim: "导数模拟: 激活",
                  status_mode: "模式"
              },
              integral_preview_title: "即将解锁：积分学",
              integral_preview_desc: "掌握微分的逆运算。计算曲线下的面积。",
              integral_preview_hint: "掌握导数后解锁 →"
          },
  gm1_01_advanced: {
              back: "返回枢纽",
              title: "GM1.01-进阶 // 高级微积分",
              monitor_title: "GM1.01_进阶监控",
              footer_left: "GM1.01_进阶 // 节点: 巴塞尔",
              input_tip_2dp: "提示：保留 2 位小数。",
              check: "验证",
              next: "下一挑战",
              correct: "已验证",
              incorrect: "不匹配",
              ready: "就绪",
              difficulty: {
                  basic: "基础",
                  core: "核心",
                  advanced: "进阶",
                  elite: "精英"
              },
              mission: {
                  title: "高级导数挑战",
                  description: "通过组合多个规则掌握复杂导数。将微积分应用于实际问题。"
              },
              challenges: {
                  composite: "综合函数",
                  modeling: "问题建模",
                  optimization: "优化问题",
                  analysis: "函数分析"
              },
              scenarios: {
                  composite_1: "🎢 场景：过山车设计 — 一位工程师设计过山车路段，高度遵循 h(t) = (2t² + 3t)·sin(t)。速度是导数 h'(t)。在 t=2 秒时，计算速度以确保乘客安全。这需要同时使用乘积规则和幂规则！",
                  composite_2: "📡 场景：信号处理 — 无线电信号的振幅为 A(t) = (t² + 1)/sin(t)。振幅变化率是 A'(t)。在 t=1 秒时，计算此速率以调整接收器。这需要商规则结合幂规则！",
                  composite_3: "🌊 场景：波浪干涉 — 两个海浪叠加：h(x) = (x³ - 2x)·cos(x)。在 x=1 处，求高度变化率 h'(1) 以预测波浪行为。使用乘积规则结合三角函数！",
                  modeling_1: "🚗 场景：汽车加速 — 一辆特斯拉从静止加速。其位置为 s(t) = 2t³ - 3t² + 5t 米。求 t=3 秒时的速度 v(t) = s'(t)，检查是否在限速范围内。",
                  modeling_2: "🎈 场景：气球升空 — 气象气球上升，高度为 h(t) = -5t² + 20t + 2 米。在 t=2 秒时，计算速度 v(t) = h'(t) 以确保安全上升速率。",
                  optimization_1: "📦 场景：盒子设计 — 一家公司用矩形纸板制作盒子。面积为 A(x) = x(10-x)。找到使面积最大的 x 值，以优化材料使用。",
                  optimization_2: "💰 场景：利润最大化 — 巴塞尔一家面包店的日利润为 P(x) = -2x² + 12x - 10（单位：百瑞士法郎），其中 x 是生产小时数。找到使利润最大的 x。",
                  analysis_1: "📊 场景：市场分析 — 股票价格遵循 f(x) = x³ - 3x² + 2。找到所有临界点（f'(x) = 0），以识别潜在的买入/卖出时机。",
                  analysis_2: "🚀 场景：火箭轨迹 — 火箭高度为 f(x) = 2x³ - 6x + 1。在 x=1 处，求二阶导数 f''(1) 以确定火箭是加速还是减速。"
              },
              questions: {
                  find_derivative: "计算给定点的导数",
                  find_velocity: "计算速度 v(t) = s'(t)",
                  find_acceleration: "计算加速度 a(t) = v'(t)",
                  find_maximum: "找到使函数最大的值",
                  find_critical_point: "找到临界点（导数 = 0）",
                  find_critical_points: "找到所有临界点（f'(x) = 0）"
              },
              hints: {
                  use_product_rule: "使用乘积规则：(uv)' = u'v + uv'。先分别求 u' 和 v'。",
                  use_quotient_rule: "使用商规则：(u/v)' = (u'v - uv')/v²。记住分母要平方！",
                  use_chain_rule: "使用链式法则：(f(g(x)))' = f'(g(x))·g'(x)。从外到内计算。",
                  take_first_derivative: "求一阶导数：如果 s(t) 是位置，则 v(t) = s'(t) 是速度。",
                  take_second_derivative: "先求 f'(x)，然后再次求导得到 f''(x)。",
                  set_derivative_zero: "令 f'(x) = 0 并求解 x。这给出函数可能有最大/最小值的临界点。"
              },
              function_label: "函数",
              question_label: "挑战",
              hint_label: "策略",
              visualization_title: "函数图形",
              visualization: {
                  title: "函数可视化",
                  x_label: "x",
                  y_label: "f(x)",
                  function_label: "函数",
                  point_label: "点"
              },
              progress: "进度"
          },
  gm2_01: {
              back: "返回枢纽",
              title: "GM2.01 // 矢量飞行员 3D",
              difficulty: {
                  basic: "基础",
                  core: "核心",
                  advanced: "进阶",
                  elite: "精英"
              },
              objective_title: "当前任务目标",
              target_title: "向量 HUD",
              next: "执行下一序列",
              check: "验证",
              correct: "已验证",
              incorrect: "不匹配",
              ready: "就绪",
              monitor_title: "GM2.01_向量监控",
              footer_left: "GM2.01_矢量飞行 // 节点：巴塞尔",
              stages: {
                  navigation: "导航",
                  dot: "点积",
                  mission: "任务",
                  navigation_prompt_latex: "\\text{计算 A 到 B 的位移向量 }\\vec v\\text{ 及其模长。}",
                  dot_prompt_latex: "\\text{计算 }\\vec v\\text{ 并求 }\\vec v\\cdot\\vec w.",
                  mission_prompt_latex: "\\text{任务：计算 }\\vec v\\text{、}\\vec v\\cdot\\vec s\\text{ 和 }|\\vec v|."
              },
              labels: {
                  input: "输入"
              },
              mission: {
                  title: "任务：莱茵河空域",
                  description: "在莱茵河上空校准无人机航线。输入 3D 向量并用点积验证安全走廊。"
              },
              scenarios: {
                  navigation: "巴塞尔无人机配送网络：你正在为巴塞尔的自主医疗物资无人机编程导航系统。无人机必须计算医院屋顶和城市各处配送点之间的精确3D向量。给定坐标A（巴塞尔大学医院的起飞停机坪）和B（Claraspital的到达点），计算位移向量v及其模长。模长表示直线飞行距离（米）。准确的向量计算对电池管理和飞行时间估算至关重要。",
                  dot: "罗氏大厦太阳能板优化：巴塞尔的罗氏大厦正在其外墙安装可调节太阳能板。每块板的朝向用法向量v表示，正午时太阳方向为向量w。点积v·w决定板接收多少阳光——平行时最大（点积=|v||w|），垂直时为零。计算点积以确定最佳板角度。工程师用此来最大化全天能量捕获。",
                  mission: "莱茵河导航系统：巴塞尔港务局正在开发莱茵河自动驳船导航系统。货运驳船必须从点A（当前位置）行驶到点B（目的地码头）。河流水流用向量s表示。计算：(1) A到B的位移向量v，(2) 点积v·s以确定水流是助力还是阻力（正值=助力，负值=阻力，零=垂直），(3) 模长|v|表示直线距离。这些数据优化燃料消耗和到达时间预测。"
              }
          },
  gm3_01: {
              back: "返回枢纽",
              title: "GM3.01 // 概率金库",
              difficulty: {
                  basic: "基础",
                  core: "核心",
                  advanced: "进阶",
                  elite: "精英"
              },
              objective_title: "当前任务目标",
              target_title: "概率矩阵",
              next: "执行下一序列",
              check: "验证",
              correct: "验证通过",
              incorrect: "匹配失败",
              ready: "就绪",
              monitor_title: "GM3.01_概率监测器",
              footer_left: "GM3.01_概率仓库 // 节点: 巴塞尔",
              stages: {
                  basic_prob: "基础概率",
                  binomial: "二项分布",
                  conditional: "条件概率",
                  mission: "任务",
                  basic_prob_prompt_latex: "\\text{计算概率 }P(E)\\text{。}",
                  binomial_prompt_latex: "\\text{计算二项分布的 }P(X=k)\\text{。}",
                  conditional_prompt_latex: "\\text{计算条件概率 }P(A|B)\\text{。}",
                  mission_prompt_latex: "\\text{任务：计算概率 }P\\text{。}"
              },
              labels: {
                  input: "输入",
                  hints: "提示"
              },
              mission: {
                  title: "任务：巴塞尔概率实验室",
                  description: "将概率论应用于巴塞尔的真实场景。计算质量控制、保险和彩票系统的概率。"
              },
              scenarios: {
                  basic_prob: "诺华巴塞尔质量控制：你在巴塞尔诺华制药的质量控制部门工作。每批药品都要进行随机抽样检验。给定样本中有一定数量的合格结果（通过质量测试）占总样本数，计算随机选择的物品通过检验的概率P(E)。这个概率决定了整批产品是否被批准分发到瑞士医院。",
                  binomial: "瑞士彩票系统分析：瑞士乐透从巴塞尔总部运营。在每次抽奖中，玩家选择的号码有固定概率p匹配。对于n次独立试验（彩票抽奖），使用二项分布公式计算恰好k次成功的概率P(X=k)：P(X=k) = C(n,k) × p^k × (1-p)^(n-k)。这帮助彩票官员预测支付频率并为瑞士玩家设置奖金结构。",
                  conditional: "巴塞尔保险风险评估：巴塞尔保险公司需要计算条件概率进行风险评估。给定P(A) = 事件发生的概率，P(B) = 条件满足的概率，P(A∩B) = 两者都发生的概率，计算P(A|B) = P(A∩B)/P(B)。这个条件概率帮助根据特定风险因素确定巴塞尔居民的保险费。",
                  mission: "巴塞尔综合概率任务：你正在为多家巴塞尔公司提供咨询——诺华（制药）、瑞士乐透（彩票）和巴塞尔保险公司（保险）。每家公司都提出不同的概率问题：质量控制的基础概率、彩票分析的二项分布或保险风险的条件概率。应用适当的概率公式解决每家公司的具体挑战，并提供准确的概率计算。"
              },
              problems: {
                  // BASIC_PROB - BASIC: 直接样本空间
                  single_die_one: "掷一次标准六面骰子，掷出1的概率是多少？\n\n已知：1个有利结果，6个总结果\n求：P(E) = 有利结果 / 总结果\n概念：直接观察样本空间",
                  single_die_odd: "掷一次标准六面骰子，掷出奇数（1、3或5）的概率是多少？\n\n已知：3个有利结果（1,3,5），6个总结果\n求：P(E) = 有利结果 / 总结果\n概念：直接观察",
                  coin_heads: "抛一次公平硬币，得到正面的概率是多少？\n\n已知：1个有利结果（正面），2个总结果\n求：P(E) = 有利结果 / 总结果\n概念：最简单的样本空间",
                  spinner_8_sections: "你转动一个被分成8个相等部分（编号1-8）的转盘。落在第3部分的概率是多少？\n\n已知：1个有利结果，8个总结果\n求：P(E) = 有利结果 / 总结果\n概念：直接观察",
  
                  // BASIC_PROB - CORE: 理解组合
                  two_dice_sum_7: "掷两个标准骰子，和为7的概率是多少？\n\n已知：6个有利结果（1+6, 2+5, 3+4, 4+3, 5+2, 6+1），36个总结果\n求：P(E) = 有利结果 / 总结果\n概念：理解(1,6)和(6,1)是不同的结果",
                  two_dice_sum_10: "掷两个标准骰子，和为10的概率是多少？\n\n已知：3个有利结果（4+6, 5+5, 6+4），36个总结果\n求：P(E) = 有利结果 / 总结果\n概念：正确计数组合",
                  two_dice_sum_gt_7: "掷两个标准骰子，和大于7的概率是多少？\n\n已知：15个有利结果（和为8,9,10,11,12），36个总结果\n求：P(E) = 有利结果 / 总结果\n概念：计数多个有利结果",
                  deck_one_suit: "从标准52张牌中抽一张，抽到红心的概率是多少？\n\n已知：13张红心，52张总牌\n求：P(E) = 有利结果 / 总结果\n概念：理解花色结构",
                  deck_honors: "从标准52张牌中抽一张，抽到荣誉牌（A、K、Q或J）的概率是多少？\n\n已知：16张荣誉牌（每个等级4张），52张总牌\n求：P(E) = 有利结果 / 总结果\n概念：跨所有花色计数",
  
                  // BASIC_PROB - ADVANCED: 条件概率（隐含）
                  die_even_given_gt3: "你掷骰子并观察到结果大于3。它是偶数的概率是多少？\n\n已知：在结果{4,5,6}中，两个是偶数{4,6}\n求：P(偶数 | >3) = 2/3\n概念：条件'>3'将样本空间从6个结果改变为3个结果",
                  die_multiple_of_3: "你掷一个标准骰子。掷出3的倍数的概率是多少？\n\n已知：2个有利结果（3, 6），6个总结果\n求：P(E) = 2/6\n概念：识别带条件的有利结果",
                  card_face_given_spade: "你抽一张牌，它是黑桃。它是人头牌（J、Q、K）的概率是多少？\n\n已知：在13张黑桃中，3张是人头牌\n求：P(人头牌 | 黑桃) = 3/13\n概念：花色内的条件概率",
                  card_not_face_not_ace: "你从标准牌组中抽一张牌。它既不是人头牌也不是A的概率是多少？\n\n已知：52张总牌 - 12张人头牌 - 4张A = 36个有利结果，52张总牌\n求：P(E) = 36/52\n概念：使用补集计数",
                  card_king_given_face: "你抽一张牌，它是人头牌。它是K的概率是多少？\n\n已知：在12张人头牌（4种花色的J,Q,K）中，4张是K\n求：P(K | 人头牌) = 4/12\n概念：人头牌内的条件概率",
  
                  // BASIC_PROB - ELITE: 复合事件
                  at_least_one_six_two_dice: "你掷两个骰子。至少有一个显示6的概率是多少？\n\n已知：使用补集 - P(至少一个6) = 1 - P(没有6)\nP(没有6) = (5/6) × (5/6) = 25/36\n求：P(E) = 1 - 25/36 = 11/36\n概念：对'至少一个'使用补集",
                  sum_not_2_or_12: "你掷两个骰子。和既不是2也不是12的概率是多少？\n\n已知：P(和=2) = 1/36，P(和=12) = 1/36\n有利结果 = 36 - 1 - 1 = 34\n求：P(E) = 34/36\n概念：对'既不...也不'使用补集",
                  at_least_one_even: "你掷两个骰子。至少有一个显示偶数的概率是多少？\n\n已知：P(都是奇数) = (3/6) × (3/6) = 9/36\n求：P(至少一个偶数) = 1 - 9/36 = 27/36\n概念：补集策略",
                  card_ace_or_king: "你抽一张牌。它是A或K的概率是多少？\n\n已知：4张A + 4张K = 8个有利结果，52张总牌\n求：P(A或K) = 8/52\n概念：互斥事件的加法原理",
                  card_red_or_face: "你抽一张牌。它是红色或人头牌的概率是多少？\n\n已知：26张红色 + 12张人头牌 - 6张（红色人头牌）= 32个有利结果\n求：P(红色或人头牌) = 32/52\n概念：有重叠的加法原理（容斥原理）",
  
                  mission_basic_1: "诺华任务：掷骰子，掷出1的概率？\n\n已知：1个有利，6个总数\n求：P(E)",
                  mission_basic_2: "瑞士乐透任务：抛3次硬币，恰好2次正面的概率？\n\n已知：n=3，k=2，p=0.5\n求：P(X=2)",
                  mission_basic_3: "保险任务：已知P(A)=0.5，P(B)=0.6，P(A∩B)=0.3，求P(A|B)。\n\n已知：P(A)=0.5，P(B)=0.6，P(A∩B)=0.3\n求：P(A|B)",
                  mission_basic_4: "诺华任务：掷骰子，掷出偶数的概率？\n\n已知：3个有利，6个总数\n求：P(E)",
                  mission_core_1: "诺华任务：从52张牌中抽一张，抽到红心的概率？\n\n已知：13个有利，52个总数\n求：P(E)",
                  mission_core_2: "瑞士乐透任务：玩6次抽奖，中奖概率50%，P(X=4)是多少？\n\n已知：n=6，k=4，p=0.5\n求：P(X=4)",
                  mission_core_3: "保险任务：已知P(A)=0.45，P(B)=0.55，P(A∩B)=0.25，求P(A|B)。\n\n已知：P(A)=0.45，P(B)=0.55，P(A∩B)=0.25\n求：P(A|B)",
                  // BINOMIAL - BASIC: 理解基本概念
                  coin_4_2: "抛4次公平硬币，恰好2次正面的概率是多少？\n\n已知：n=4次试验，k=2次成功，p=0.5\n求：P(X=2) = C(4,2) × 0.5² × 0.5²\n概念：基本二项分布计算",
                  coin_3_all: "抛3次公平硬币，全部正面的概率是多少？\n\n已知：n=3次试验，k=3次成功，p=0.5\n求：P(X=3) = C(3,3) × 0.5³ × 0.5⁰\n概念：理解C(n,n) = 1",
                  coin_4_none: "抛4次公平硬币，没有正面（全部反面）的概率是多少？\n\n已知：n=4次试验，k=0次成功，p=0.5\n求：P(X=0) = C(4,0) × 0.5⁰ × 0.5⁴\n概念：理解C(n,0) = 1",
  
                  // BINOMIAL - CORE: 理解C(n,k)的意义
                  lottery_5_3: "瑞士乐透：你玩5次抽奖，每次中奖概率50%。恰好中3次的概率是多少？\n\n已知：n=5，k=3，p=0.5\n求：P(X=3) = C(5,3) × 0.5³ × 0.5²\n概念：C(5,3) = 10 表示选择哪3次抽奖中奖的10种不同方式",
                  lottery_6_3: "瑞士乐透：你玩6次抽奖，中奖概率50%。恰好中3次的概率是多少？\n\n已知：n=6，k=3，p=0.5\n求：P(X=3)，其中C(6,3) = 20\n概念：理解为什么要乘以C(n,k)",
                  lottery_5_2: "瑞士乐透：你玩5次抽奖，中奖概率50%。恰好中2次的概率是多少？\n\n已知：n=5，k=2，p=0.5\n求：P(X=2)，其中C(5,2) = 10\n概念：二项系数表示排列",
                  lottery_7_3: "瑞士乐透：你玩7次抽奖，中奖概率50%。恰好中3次的概率是多少？\n\n已知：n=7，k=3，p=0.5\n求：P(X=3)，其中C(7,3) = 35\n概念：更大的n意味着更多排列",
  
                  // BINOMIAL - ADVANCED: 非对称概率（p ≠ 0.5）
                  lottery_6_2_low: "瑞士乐透：你玩6次抽奖，每次中奖概率仅30%。恰好中2次的概率是多少？\n\n已知：n=6，k=2，p=0.3（低概率）\n求：P(X=2) = C(6,2) × 0.3² × 0.7⁴\n概念：低p意味着分布左偏",
                  lottery_8_6_high: "瑞士乐透：你玩8次抽奖，每次中奖概率70%。恰好中6次的概率是多少？\n\n已知：n=8，k=6，p=0.7（高概率）\n求：P(X=6) = C(8,6) × 0.7⁶ × 0.3²\n概念：高p意味着分布右偏",
                  lottery_7_4_biased: "瑞士乐透：你玩7次抽奖，中奖概率60%。恰好中4次的概率是多少？\n\n已知：n=7，k=4，p=0.6\n求：P(X=4)\n概念：理解非对称分布",
                  lottery_10_7_biased: "瑞士乐透：你玩10次抽奖，中奖概率65%。恰好中7次的概率是多少？\n\n已知：n=10，k=7，p=0.65\n求：P(X=7)\n概念：使用非标准概率计算",
  
                  // BINOMIAL - ELITE: 累积概率
                  at_least_3_of_5: "瑞士乐透：你玩5次抽奖，中奖概率60%。至少中3次的概率是多少？\n\n已知：n=5，k≥3，p=0.6\n求：P(X≥3) = P(X=3) + P(X=4) + P(X=5)\n概念：累积概率 - 多个结果相加",
                  at_most_4_of_6: "瑞士乐透：你玩6次抽奖，中奖概率50%。至多中4次的概率是多少？\n\n已知：n=6，k≤4，p=0.5\n求：P(X≤4) = P(X=0) + P(X=1) + P(X=2) + P(X=3) + P(X=4)\n概念：或使用 1 - P(X>4) = 1 - P(X=5) - P(X=6)",
                  more_than_half: "瑞士乐透：你玩8次抽奖，中奖概率60%。超过一半时间中奖的概率是多少？\n\n已知：n=8，k>4，p=0.6\n求：P(X>4) = P(X=5) + P(X=6) + P(X=7) + P(X=8)\n概念：理解'超过一半'意味着k≥5",
                  at_least_7_of_10: "瑞士乐透：你玩10次抽奖，中奖概率70%。至少中7次的概率是多少？\n\n已知：n=10，k≥7，p=0.7\n求：P(X≥7) = P(X=7) + P(X=8) + P(X=9) + P(X=10)\n概念：高p的累积概率",
                  at_least_8_of_12: "瑞士乐透：你玩12次抽奖，中奖概率60%。至少中8次的概率是多少？\n\n已知：n=12，k≥8，p=0.6\n求：P(X≥8) = 从k=8到12的总和\n概念：累积概率中的多项",
  
                  // CONDITIONAL - CORE: 从描述中提取条件
                  card_heart_given_red: "你抽一张牌并观察到它是红色的。它是红心的概率是多少？\n\n已知：P(红心) = 13/52，P(红色) = 26/52，P(红心且红色) = 13/52\n求：P(红心|红色) = (13/52) / (26/52) = 13/26 = 0.5\n概念：从描述中识别条件",
                  die_six_given_even: "你掷骰子并观察到它是偶数。它是6的概率是多少？\n\n已知：P(6) = 1/6，P(偶数) = 3/6，P(6且偶数) = 1/6\n求：P(6|偶数) = (1/6) / (3/6) = 1/3\n概念：条件改变样本空间",
                  card_face_given_red: "你抽一张牌，它是红色的。它是人头牌的概率是多少？\n\n已知：P(人头牌) = 12/52，P(红色) = 26/52，P(人头牌且红色) = 6/52\n求：P(人头牌|红色) = 6/26\n概念：从牌的结构中提取概率",
                  die_one_given_odd: "你掷骰子，它是奇数。它是1的概率是多少？\n\n已知：P(1) = 1/6，P(奇数) = 3/6，P(1且奇数) = 1/6\n求：P(1|奇数) = (1/6) / (3/6) = 1/3\n概念：理解条件样本空间",
                  card_spade_given_black: "你抽一张牌，它是黑色的。它是黑桃的概率是多少？\n\n已知：P(黑桃) = 13/52，P(黑色) = 26/52，P(黑桃且黑色) = 13/52\n求：P(黑桃|黑色) = 13/26 = 0.5\n概念：条件概率中的对称性",
  
                  // CONDITIONAL - ADVANCED: 贝叶斯思维
                  disease_test_positive: "一种疾病影响1%的人口。测试准确率为90%（在疾病存在时检测到）。如果你测试阳性，你实际患病的概率是多少？\n\n已知：P(疾病) = 0.01，P(阳性|疾病) = 0.9，P(阳性|无疾病) = 0.1\nP(阳性) = 0.01×0.9 + 0.99×0.1 = 0.108\n求：P(疾病|阳性) = (0.01×0.9) / 0.108 = 0.083\n概念：P(A|B) ≠ P(B|A) - 贝叶斯反转",
                  disease_test_positive_2: "一种罕见疾病影响2%的人口。测试准确率为80%。如果阳性，P(疾病)是多少？\n\n已知：P(疾病) = 0.02，P(+|疾病) = 0.8\n求：使用贝叶斯定理求P(疾病|+)\n概念：理解假阳性",
                  quality_defect_given_batch: "15%的产品有缺陷。批次测试检测到80%的缺陷。如果批次失败，P(缺陷)是多少？\n\n已知：P(缺陷) = 0.15，P(失败|缺陷) = 0.8\n求：P(缺陷|失败)\n概念：质量控制中的贝叶斯推断",
                  fraud_given_alert: "5%的交易是欺诈性的。警报系统捕获80%的欺诈。如果警报触发，P(欺诈)是多少？\n\n已知：P(欺诈) = 0.05，P(警报|欺诈) = 0.8\n求：P(欺诈|警报)\n概念：理解警报可靠性",
                  accident_given_weather: "10%的日子发生事故。80%的事故日有恶劣天气。如果恶劣天气，P(事故)是多少？\n\n已知：P(事故) = 0.1，P(恶劣天气|事故) = 0.8\n求：P(事故|恶劣天气)\n概念：反转条件概率",
  
                  // CONDITIONAL - ELITE: 独立性测试
                  independence_test_1: "事件A和B有P(A)=0.4，P(B)=0.5，P(A∩B)=0.2。A和B独立吗？\n\n已知：P(A)=0.4，P(B)=0.5，P(A∩B)=0.2\n测试：如果独立，P(A∩B)应等于P(A)×P(B) = 0.4×0.5 = 0.2 ✓\n求：P(A|B) = 0.2/0.5 = 0.4 = P(A) ✓\n概念：A和B是独立的",
                  independence_test_2: "事件A和B有P(A)=0.3，P(B)=0.6，P(A∩B)=0.18。它们独立吗？\n\n已知：P(A)=0.3，P(B)=0.6，P(A∩B)=0.18\n测试：P(A)×P(B) = 0.3×0.6 = 0.18 ✓\n求：P(A|B) = 0.18/0.6 = 0.3 = P(A) ✓\n概念：测试独立性",
                  multiple_condition_1: "P(A)=0.25，P(B)=0.4，P(A∩B)=0.15。求P(A|B)并判断是否独立。\n\n已知：P(A)=0.25，P(B)=0.4，P(A∩B)=0.15\n求：P(A|B) = 0.15/0.4 = 0.375\n测试：P(A|B) = 0.375 ≠ P(A) = 0.25\n概念：不独立 - 条件改变概率",
                  independence_test_3: "P(A)=0.35，P(B)=0.7，P(A∩B)=0.245。A和B独立吗？\n\n已知：P(A)=0.35，P(B)=0.7，P(A∩B)=0.245\n测试：P(A)×P(B) = 0.35×0.7 = 0.245 ✓\n求：P(A|B) = 0.245/0.7 = 0.35 = P(A) ✓\n概念：独立性验证",
                  multiple_condition_2: "P(A)=0.2，P(B)=0.5，P(A∩B)=0.12。求P(A|B)并测试独立性。\n\n已知：P(A)=0.2，P(B)=0.5，P(A∩B)=0.12\n求：P(A|B) = 0.12/0.5 = 0.24\n测试：P(A|B) = 0.24 ≠ P(A) = 0.2\n概念：不独立",
  
                  mission_core_4: "诺华任务：抽一张牌，抽到红色牌的概率？\n\n已知：26个有利，52个总数\n求：P(E)",
                  mission_core_5: "瑞士乐透任务：玩5次抽奖，中奖概率60%，P(X=3)是多少？\n\n已知：n=5，k=3，p=0.6\n求：P(X=3)",
                  mission_adv_1: "诺华任务：100个样本中85个通过，计算P(E)。\n\n已知：85个有利，100个总数\n求：P(E)",
                  mission_adv_2: "瑞士乐透任务：10次抽奖，中奖概率50%，计算P(X=6)。\n\n已知：n=10，k=6，p=0.5\n求：P(X=6)",
                  mission_adv_3: "保险任务：已知P(A)=0.37，P(B)=0.63，P(A∩B)=0.21，求P(A|B)。\n\n已知：P(A)=0.37，P(B)=0.63，P(A∩B)=0.21\n求：P(A|B)",
                  mission_adv_4: "诺华任务：120个样本中92个通过，计算P(E)。\n\n已知：92个有利，120个总数\n求：P(E)",
                  mission_adv_5: "瑞士乐透任务：8次抽奖，中奖概率60%，计算P(X=5)。\n\n已知：n=8，k=5，p=0.6\n求：P(X=5)",
                  mission_elite_1: "诺华任务：500个样本中427个通过，计算P(E)。\n\n已知：427个有利，500个总数\n求：P(E)",
                  mission_elite_2: "瑞士乐透任务：15次抽奖，中奖概率55%，计算P(X=9)。\n\n已知：n=15，k=9，p=0.55\n求：P(X=9)",
                  mission_elite_3: "保险任务：已知P(A)=0.365，P(B)=0.625，P(A∩B)=0.215，求P(A|B)。\n\n已知：P(A)=0.365，P(B)=0.625，P(A∩B)=0.215\n求：P(A|B)",
                  mission_elite_4: "诺华任务：800个样本中683个通过，计算P(E)。\n\n已知：683个有利，800个总数\n求：P(E)",
                  mission_elite_5: "瑞士乐透任务：18次抽奖，中奖概率60%，计算P(X=11)。\n\n已知：n=18，k=11，p=0.6\n求：P(X=11)"
              }
          },
  gm4_01: {
          back: "返回枢纽",
          title: "GM4.01 // 复数地平线",
          difficulty: {
              basic: "基础",
              core: "核心",
              advanced: "进阶",
              elite: "精英"
          },
          next: "执行下一序列",
          check: "验证",
          correct: "已验证",
          incorrect: "匹配失败",
          ready: "就绪",
          monitor_title: "GM4.01_复数监视器",
          footer_left: "GM4.01_复数地平线 // 节点：巴塞尔",
          scenario_title: "巴塞尔工程任务",
          scenarios: {
              basics: "罗氏制药信号处理：您正在罗氏巴塞尔校准用于 MRI 信号处理的医学成像设备，该设备使用复数分析。每个复数 z = a + bi 表示一个具有实部（振幅）和虚部（相位）的信号。计算模长 |z| 以确定信号强度。准确的模长计算对于检测患者扫描中的组织异常至关重要。",
              operations: "诺华量子化学模拟：您正在诺华巴塞尔使用复数算术运行分子轨道计算。波函数表示为复数，它们的相互作用需要在复平面中进行加法和乘法运算。计算复数运算的结果以预测分子行为。这些计算决定了药物结合效率。",
              polar: "巴塞尔大学电气工程：您正在分析巴塞尔智能电网电力系统中的交流电路行为。在计算谐振频率时，复阻抗被提升到幂次。使用极坐标形式 (r·e^(iθ)) 高效计算 z^n。结果决定了巴塞尔可再生能源网络的最佳功率分配。"
          },
          stages: {
              basics: "基础",
              operations: "运算",
              polar: "极坐标形式",
              basics_prompt: "计算模长",
              basics_target: "求 |z|",
              operations_add: "复数加法",
              operations_multiply: "复数乘法",
              operations_target: "求实部和虚部",
              polar_prompt: "使用极坐标形式计算幂",
              polar_target: "求 z^n 的直角坐标形式"
          },
          visualization: {
              pythagorean: "勾股定理",
              vector_addition: "向量加法",
              complex_multiplication: "复数乘法",
              polar_power: "极坐标幂运算",
              complex_data: "复数数据",
              magnitude: "模长 |z|",
              argument: "辐角 arg(z)",
              power: "幂次",
              verified: "验证成功",
              mismatch: "答案错误",
              geometric_meaning: "几何意义：模长相乘，角度相加",
              polar_meaning: "模长变为 r^n，角度变为 n·θ",
              parallelogram_rule: "平行四边形法则：从原点到 z₁，再从 z₁ 平移 z₂"
          }
      },
  sm1_01: {
              back: "返回枢纽",
              title: "SM1.01 // 面积与体积",
              difficulty: {
                  basic: "基础",
                  core: "核心",
                  advanced: "进阶",
                  elite: "精英"
              },
              objective_title: "当前任务目标",
              target_title: "几何任务",
              next: "执行下一序列",
              check: "验证",
              correct: "已验证",
              incorrect: "不匹配",
              ready: "就绪",
              monitor_title: "SM1.01_监控",
              footer_left: "SM1.01_几何任务 // 节点：巴塞尔",
              input_tip_2dp: "提示：输入分数 (如 4/3) 或保留 2 位小数。",
              base_twice_height: "底边是高的2倍",
              stages: {
                  areas: "面积",
                  volumes: "体积",
                  complex: "综合",
                  areas_prompt_latex: "\\text{阅读场景，计算所需面积。}",
                  volumes_prompt_latex: "\\text{阅读场景，计算所需体积。}"
              },
              mission: {
                  title: "任务：莱茵河防洪闸门",
                  protocol: "Nexus 协议 // 日内瓦节点",
                  description: "在巴塞尔，工程师将莱茵河防洪闸门的横截面建模为梯形。",
                  cube_title: "CERN 立方体保险库",
                  cube_desc: "在 CERN，识别立方体保险库的空间对角线并计算其长度。"
              },
              labels: {
                  input: "输入",
                  hints: "提示",
                  length: "长",
                  width: "宽",
                  height: "高",
                  base: "底边",
                  radius: "半径",
                  side: "边长",
                  area: "面积",
                  volume: "体积",
                  calculate_area: "计算面积",
                  calculate_volume: "计算体积",
              },
              quests: {
                  ski: "阿尔卑斯滑雪场需要铺设新雪道。雪道是长方形的。",
                  sail: "苏黎世帆船俱乐部需要订制新帆布。帆是三角形的。",
                  gate: "莱茵河防洪闸门的一个截面是梯形的。",
                  cheese: "格律耶尔奶酪工厂的圆形模具。",
                  attic: "瑞士木屋阁楼是一个正方体空间，需要空气净化器。",
                  crate: "CERN 实验室需要精密仪器的储存箱。",
                  pylon: "圣莫里茨的滑雪缆车支架是圆柱形的。",
  
                  // 结构化模版
                  rect_core: "宽度为 ${w}，长度比宽度多 ${diff}。",
                  rect_advanced: "长度为 ${l}，宽度正好是长度的一半。",
                  rect_elite: "总周长为 ${p}，长度是宽度的 ${ratio} 倍。",
                  tri_elite: "等腰直角三角形帆，斜边长度为 ${c}。",
                  circle_elite: "模具的总周长为 ${c}。",
                  cube_elite: "正方体空间的表面积为 ${sa}。",
                  prism_elite: "底面是周长为 ${p} 的正方形，高度为 ${h}。",
                  cyl_elite: "侧面积为 ${la}，半径为 ${r}。"
              }
          },
  sm1_02: {
          back: "返回枢纽",
          title: "SM1.02 // 代数探险",
          difficulty: {
              basic: "基础",
              core: "核心",
              advanced: "进阶",
              elite: "精英"
          },
          modes: {
              containers: "容器",
              sorting: "分类",
              machine: "机器"
          },
          labels: {
              variable: "变量",
              value: "数值",
              expression: "表达式",
              simplify: "化简",
              evaluate: "求值",
              input: "输入",
              output: "输出"
          },
          stages: {
              variables: "变量概念",
              terms: "同类项",
              substitution: "代入法",
              vars_prompt: "识别容器内的数值。",
              terms_prompt: "合并同类项以化简表达式。",
              sub_prompt: "将给定的值代入表达式并计算结果。"
          },
          scenarios: {
              variables: "巴塞尔莱茵河更衣室：你正在管理著名的莱茵河游泳之家的储物柜。每个储物柜（变量 'x'）包含一个特定的物品。要理解 'x' 只是一个占位符。",
              terms: "集市广场水果摊：你在巴塞尔集市整理货物。苹果和梨不能直接混合。将相同的物品归类：3个苹果 + 2个苹果 = 5个苹果。",
              substitution: "BVB电车售票机：你正在测试售票机的逻辑。将区域值（x）代入价格公式，计算正确的法郎（CHF）票价。"
          }
      },
  sm1_03_new: {
          back: "返回枢纽",
          title: "SM1.03 // 零度以下",
          difficulty: {
              basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
          },
          next: "执行下一序列",
          check: "验证",
          correct: "已验证",
          incorrect: "不匹配",
          ready: "就绪",
          monitor_title: "SM1.03_整数监视器",
          footer_left: "SM1.03_零度以下 // 节点：巴塞尔",
          basel_scenario: "巴塞尔冬季场景",
          scenario_title: "问题背景",
          calculate_title: "计算",
          answer_title: "你的答案",
          solution_title: "解答",
          stages: {
              number_line: "数轴",
              rationals: "有理数",
              quadrants: "象限"
          },
          scenarios: {
              number_line: "巴塞尔冬季温度：你正在监测巴塞尔欧洲机场的冬季温度。温度经常降到零度以下。理解负数对于读取温度计和比较温度至关重要。数轴帮助可视化整数及其关系。",
              rationals: "莱茵河水位：巴塞尔莱茵河的水位计显示水深。正常水位是+5米。干旱时会下降。潜水员将水面以下的深度测量为负值。有理数（分数和小数）提供精确测量。",
              quadrants: "巴塞尔城市网格导航：在坐标网格上标记巴塞尔地标。大巴塞尔（Q1：+,+）、小巴塞尔（Q2：-,+）、克莱贝克（Q3：-,-）、圣阿尔班（Q4：+,-）。理解象限有助于导航城市和精确定位。"
          },
          problems: {
              nl_identify_neg3: "在数轴上定位-3。",
              nl_identify_5: "在数轴上定位5。",
              nl_temp_neg2: "温度是-2°C。在温度计上标记。",
              nl_depth_neg4: "潜水员在水面下4米。标记-4m。",
              nl_identify_0: "在数轴上定位零（原点）。",
              nl_compare_neg5_neg2: "哪个更冷：-5°C还是-2°C？",
              nl_compare_neg3_1: "哪个更小：-3还是1？",
              nl_order_three: "排序这些数字：-4, 0, 3。中间值是什么？",
              nl_rhine_level: "莱茵河水位从+5m降到-3m。新水位是多少？",
              nl_temp_drop: "温度从2°C下降7度。最终温度是多少？",
              nl_distance_abs: "数轴上-5和2之间的距离是多少？",
              nl_abs_value: "-8的绝对值是多少？",
              nl_distance_neg_neg: "-7和-3之间的距离是多少？",
              nl_midpoint: "-6和4之间的中点是什么？",
              nl_temp_range: "温度范围从-8°C到5°C。范围是多少？",
              nl_operation_add: "计算：-5 + 3",
              nl_operation_sub: "计算：-3 - 4",
              nl_operation_mult: "计算：-4 × 2",
              nl_multi_step: "计算：-6 + 8 - 5",
              nl_complex_op: "计算：(-2 + 5) - (3 - 7)",
              r_place_half: "在数轴上定位0.5。",
              r_place_neg_half: "在数轴上定位-0.5。",
              r_place_1_5: "在数轴上定位1.5。",
              r_place_neg2_5: "在数轴上定位-2.5。",
              r_fraction_third: "将1/3转换为小数（保留2位）。",
              r_compare_fractions: "哪个更大：-1/2还是-1/3？",
              r_compare_decimals: "哪个更小：-0.75还是-0.5？",
              r_order_mixed: "排序：-1.5, -0.5, 0.5。最小的是什么？",
              r_add_decimals: "计算：0.5 + 0.25",
              r_sub_decimals: "计算：1.5 - 2.25",
              r_compare_neg_decimals: "哪个更冷：-0.75°C还是-0.8°C？",
              r_fraction_to_decimal: "将-3/4转换为小数。",
              r_mult_decimals: "计算：0.5 × 1.5",
              r_div_decimals: "计算：1.5 ÷ 0.5",
              r_mixed_operations: "计算：0.5 + 1.25 - 0.75",
              r_order_complex: "从小到大排序：-1.5, -3/2, 0, 1.2。第一个是什么？",
              r_fraction_operations: "计算：1/2 + 1/4（小数形式）",
              r_neg_fraction_ops: "计算：-1/2 - 1/4（小数形式）",
              r_complex_decimal: "计算：(0.5 - 1.25) × 2",
              r_repeating_decimal: "将2/3转换为小数（保留2位）。",
              q_identify_point: "点(2, 3)的x坐标是什么？",
              q_identify_y: "点(3, 4)的y坐标是什么？",
              q_plot_positive: "绘制点(1, 2)。x是什么？",
              q_origin: "原点的x坐标是什么？",
              q_axis_point: "点(3, 0)在哪个轴上？y是什么？",
              q_quadrant_2: "点(-2, 5)在哪个象限？",
              q_quadrant_3: "点(-3, -4)在哪个象限？",
              q_quadrant_4: "点(4, -2)在哪个象限？",
              q_basel_landmarks: "小巴塞尔在(-3, 2)。x是什么？",
              q_distance_horizontal: "(2, 0)和(5, 0)之间的距离？",
              q_reflect_x_axis: "将(3, 4)关于x轴反射。y'是什么？",
              q_reflect_y_axis: "将(5, 2)关于y轴反射。x'是什么？",
              q_reflect_origin: "将(3, 4)关于原点反射。x'是什么？",
              q_translate: "将(2, 3)平移(4, 0)。x'是什么？",
              q_midpoint_2d: "(2, 3)和(6, 3)之间的中点。x是什么？",
              q_distance_vertical: "(0, 5)和(0, -3)之间的距离？",
              q_perimeter_rectangle: "顶点在(0,0)和(4,3)的矩形。周长？",
              q_area_rectangle: "顶点在(0,0)和(4,3)的矩形。面积？",
              q_diagonal_distance: "从(2, 3)到(6, 5)的水平距离？",
              q_complex_translation: "从(2, 3)开始，向右移动3，向左移动1。最终x？"
          }
      },
  sm1_04_new: {
          back: "返回枢纽",
          title: "SM1.04 // 等式平衡",
          difficulty: {
              basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
          },
          next: "执行下一序列",
          check: "验证",
          correct: "已验证",
          incorrect: "不匹配",
          ready: "就绪",
          monitor_title: "SM1.04_等式监视器",
          footer_left: "SM1.04_等式平衡 // 节点：巴塞尔",
          basel_scenario: "巴塞尔等式场景",
          scenario_title: "问题背景",
          solve_title: "求解等式",
          answer_title: "你的答案",
          solution_title: "解答",
          stages: {
              balance: "平衡",
              solve: "求解",
              transform: "转换",
              applications: "应用"
          },
          scenarios: {
              balance: "理解等式平衡：就像天平一样，等式必须保持平衡。无论对一边做什么，都必须对另一边做同样的操作。这个基本原则是解所有等式的关键。",
              solve: "解一元一次方程：使用逆运算来孤立变量。加/减以移动常数，乘/除以移除系数。每一步都让你离找到x更近一步。",
              transform: "等式变换：掌握将项移过等号的艺术。合并同类项，展开括号，并简化分数。将复杂的等式转换为简单的等式。",
              applications: "巴塞尔现实问题：应用等式解决巴塞尔的实际问题。计算公交车票价、莱茵河渡轮时间、诺华实验室测量数据和罗氏药物浓度。"
          },
          problems: {
              bal_add_both: "在 x + 3 = 7 的两边同时加 2",
              bal_subtract_both: "在 x + 5 = 8 的两边同时减 5",
              bal_multiply_both: "两边同时乘以 2",
              bal_divide_both: "两边同时除以 2",
              bal_simple_check: "通过移动常数求解",
              bal_two_steps: "先减去 3，再除以 2",
              bal_negative_result: "结果将是负数",
              bal_fraction_coeff: "先减去 2，再乘以 3",
              bal_both_sides_x: "将 x 项移到一边",
              bal_distribute: "先展开括号",
              bal_complex_both: "两边都有变量",
              bal_fractions: "找到公分母",
              bal_parentheses_both: "先展开两边的括号",
              bal_decimal_coeff: "使用小数运算",
              bal_negative_coeff: "负系数",
              bal_nested_parens: "先简化最内层的括号",
              bal_three_fractions: "三个不同分母的分数",
              bal_complex_distribute: "多步分配",
              bal_reciprocal: "倒数分数",
              bal_proportion: "比例等式",
              sol_one_step_add: "一步：减去 3",
              sol_one_step_sub: "一步：加上 5",
              sol_one_step_mult: "一步：除以 3",
              sol_one_step_div: "一步：乘以 4",
              sol_negative_simple: "结果是负数",
              sol_two_step_1: "两步：先减后除",
              sol_two_step_2: "两步：先加后乘",
              sol_negative_coeff: "负系数",
              sol_fraction_result: "答案是分数",
              sol_decimal_coeff: "小数系数",
              sol_combine_like: "先合并同类项",
              sol_distribute_simple: "先分配再求解",
              sol_x_both_sides: "两边都有变量",
              sol_fraction_both: "加分数",
              sol_negative_both: "两边都有负项",
              sol_complex_distribute: "复杂分配",
              sol_nested_parens: "嵌套括号",
              sol_three_terms: "三个分数项",
              sol_decimal_complex: "带括号的小数",
              sol_proportion_eq: "比例等式",
              tra_move_constant: "将常数移到右边",
              tra_move_variable: "移动变量项",
              tra_isolate_x: "通过除法孤立 x",
              tra_two_moves: "两步变换",
              tra_negative_move: "移动负项",
              tra_collect_terms: "收集同类项",
              tra_move_both: "从两边移动项",
              tra_expand_first: "先展开再移动",
              tra_fraction_clear: "先清除分数",
              tra_negative_coeff: "处理负系数",
              tra_multi_step: "多步变换",
              tra_both_expand: "展开两边",
              tra_fractions_lcd: "找分数的最小公分母",
              tra_decimal_expand: "展开小数表达式",
              tra_complex_collect: "复杂项收集",
              tra_nested_complex: "嵌套括号变换",
              tra_three_fractions: "合并三个分数",
              tra_double_expand: "双重展开",
              tra_proportion_cross: "交叉相乘",
              tra_mixed_complex: "混合分数和小数",
              app_bus_ticket: "巴塞尔 BVB 公交：成人票价 x 瑞郎。儿童票便宜 2 瑞郎。如果成人票是 5 瑞郎，求 x。",
              app_rhine_time: "莱茵河渡轮：单程需要 2x 分钟。往返需要 10 分钟。求 x。",
              app_age_simple: "年龄问题：5 年后，你将 12 岁。你现在多大？",
              app_distance_simple: "巴塞尔到苏黎世：一半距离是 6 公里。求总距离。",
              app_price_discount: "罗氏食堂：打折 10 瑞郎后，餐费 40 瑞郎。原价是多少？",
              app_tram_tickets: "巴塞尔有轨电车：3 张成人票每张 x 瑞郎，加 2 张儿童票每张 2 瑞郎，总共 13 瑞郎。求 x。",
              app_novartis_samples: "诺华实验室：5 个盒子每个有 x 个样本，加 10 个额外样本，总共 60 个。求 x。",
              app_age_sum: "父子：儿子 x 岁，父亲大 30 岁。他们年龄总和是 50。求儿子年龄。",
              app_rectangle_perimeter: "巴塞尔公园：矩形花园，长 8 米，宽 x 米，周长 28 米。求宽度。",
              app_speed_distance: "巴塞尔到利斯塔尔：以 x 公里/小时行驶 2 小时，距离 80 公里。求速度。",
              app_roche_concentration: "罗氏实验室：将 50 毫升 x% 溶液与 100 毫升 30% 溶液混合，得到 150 毫升 40% 溶液。求 x。",
              app_consecutive_numbers: "三个连续数字之和为 48。求第一个数字。",
              app_work_rate: "巴塞尔建筑：工人 A 需要 x 小时完成，工人 B 需要 6 小时。一起工作 2 小时完成。求 x。",
              app_mixture_problem: "诺华：将 x 升 20% 溶液与 10 升 50% 溶液混合，得到 30% 溶液。求 x。",
              app_investment_interest: "巴塞尔银行：投资 x 瑞郎，年利率 5%。一年后总额 2100 瑞郎。求 x。",
              app_train_meeting: "巴塞尔-苏黎世列车：列车 A 时速 80 公里，列车 B 时速 100 公里，相距 360 公里。何时相遇？",
              app_age_ratio: "年龄比：5 年后，你和弟弟的年龄比是 2:3。你现在 x 岁。求 x。",
              app_compound_mixture: "罗氏：向 20 升 30% 酸溶液中加入 x 升纯酸，得到 50% 溶液。求 x。",
              app_boat_current: "莱茵河船：顺流 30 公里再逆流返回需要 5 小时。水流速度 2 公里/小时。求静水中船速。",
              app_profit_loss: "巴塞尔商店：以 20% 利润或 10% 亏损出售，差价 60 瑞郎。求成本价。"
          }
      },
  sm1_05: {
          back: "返回枢纽",
          title: "SM1.05 // 比例实验室",
          difficulty: {
              basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
          },
          next: "执行下一序列",
          check: "验证",
          correct: "已验证",
          incorrect: "不匹配",
          ready: "就绪",
          monitor_title: "SM1.05_比例监视器",
          footer_left: "SM1.05_比例实验室 // 节点：巴塞尔",
          stages: {
              recipes: "配方",
              percent: "百分比",
              mixtures: "混合物"
          },
          labels: {
              ratio: "比例",
              proportion: "比例关系",
              percentage: "百分比",
              concentration: "浓度",
              solute: "溶质",
              solvent: "溶剂"
          }
      },
  sm2_01: {
              back: "← 返回枢纽",
              back_short: "返回枢纽",
              title: "SM2.01 // 二项式工厂",
              difficulty: {
                  basic: "初级",
                  core: "核心",
                  advanced: "进阶",
                  elite: "精英"
              },
              mode_1: "第一公式: (a+b)²",
              mode_2: "第二公式: (a-b)²",
              param_a: "参数 a",
              param_b: "参数 b",
              lock: "锁定参数",
              unlock: "解锁参数",
              instruction_setup: "通过滑块调整线段 a 和 b 的长度。",
              instruction_solve: "拖拽并吸附这些面积块，填满目标区域 $(a+b)²$。",
              solve_success: "恒等式已证明",
              solve_fail: "面积不匹配",
              terms: {
                  a2: "a²",
                  b2: "b²",
                  ab: "ab",
                  target_plus: "(a+b)²",
                  target_minus: "(a-b)²",
              },
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
              speedster_hint: "使用二项式展开 (a±b)² 简化计算",
              elite_tips_title: "提示：二项式分离策略",
              elite_tips_target: "目标格式：",
              scrapper_step01: "步骤 01：提取根 (a)",
              active_objective: "当前任务目标",
              target_expression: "目标恒等式表达式",
              params_config: "00 // 参数配置",
              units: "单位",
              tabs: {
                  explore: "探索",
                  architect: "花园扩建",
                  scrapper: "瓷砖实验室",
                  speedster: "速算冲刺",
                  voyager: "航行者",
                  elite: "精英"
              },
              ui: {
                  part_1_a2: "第 1 项 (a²)",
                  part_2_2ab: "第 2 项 (2ab)",
                  part_3_b2: "第 3 项 (b²)",
                  identify_root_a: "识别根 a",
                  identify_root_b: "识别根 b",
                  elite_step_1: "步骤 1：提取二项式平方",
                  elite_step_2: "步骤 2：平衡等式",
                  execute_next_sequence: "下一道题",
                  continue_operation: "继续练习",
                  logic_lattice_title: "逻辑晶格 // 分解",
                  logic_architect_step_1: "步骤_01：分配外项",
                  logic_architect_step_2: "步骤_02：展开分段",
                  logic_scrapper_step_1: "步骤_01：提取根 (a)",
                  logic_scrapper_step_2: "步骤_02：校验一次项 (2ab)",
                  logic_voyager_axiom_title: "公理：共轭对偶",
                  logic_voyager_axiom_body: "(A+B)(A-B) 的乘积会抵消一次交叉项 (±AB)。",
                  logic_voyager_derivation_title: "推导：",
                  link_established: "链接已建立",
                  axiomatic_constraints_title: "公理约束",
                  constraints_architect: "角上的 b² 是补全主二次平方所需的偏移量，它对蓝图精度至关重要。",
                  constraints_scrapper: "因式分解将全局熵拆回有序的符号结构；提取根是首要目标。",
                  constraints_speedster: "心算近似依赖于基数分解：把问题转化为 (Base+N)² 的框架。",
                  constraints_elite: "高级重构处理多维系数：其中 C 代表复合缩放因子。",
                  constraints_voyager: "恒等式对称性要求严格的符号一致性；平方差体现为一维投影下的面积净损失。",
                  visual_reference_position: "视觉参考位置 [FIX_REF.01]",
                  status_operational: "状态：运行中",
                  fps: "帧率",
                  latency: "延迟",
                  footer_left: "SM2.01_代数同步 // 节点：苏黎世工业区",
                  verified: "已验证",
                  simulating: "模拟中",
              }
          },
  sm2_02: {
              back: "返回枢纽",
              title: "SM2.02 // 勾股定律与开平方",
              tabs: {
                  pythagoras: "勾股定律",
                  sqrt: "开平方",
                  explorer: "探索实验室",
                  quest_mode: "挑战模式"
              },
              difficulty: {
                  basic: "基础",
                  core: "核心",
                  advanced: "进阶",
                  elite: "精英"
              },
              objective_title: "当前任务目标",
              target_title: "目标",
              next: "执行下一序列",
              check: "验证",
              correct: "已验证",
              incorrect: "不匹配",
              ready: "就绪",
              yes: "是",
              no: "否",
              monitor_title: "SM2.02_视觉监控",
              footer_left: "SM2.02_勾股与开方 // 节点：苏黎世",
              input_radical: "用 k√m 形式作答",
              input_k: "k",
              input_m: "m",
              input_number: "答案",
              pythagoras: {
                  solve_hyp: "消防救援：计算消防梯最短长度",
                  solve_hyp_params: "水平距离 a={a}m, 垂直高度 b={b}m",
                  solve_leg: "阿尔卑斯登山：计算垂直攀升高度",
                  solve_leg_params: "绳索全长 c={c}m, {known_label} {known_var}={known}m",
                  known_horizontal: "水平移动",
                  known_given: "已知",
                  check_right: "📐 工程验收：这是直角三角形吗？",
                  distance: "🚁 无人机快递：计算直线飞行距离",
                  elite_space: " CERN 实验室：求解状态空间对角线",
                  explorer_mission: "勾股探索：调整缩放比例，见证几何相似性的不变性。",
                  fluid_title: "流体面积守恒实验",
                  fluid_desc: "倾斜容器观察 A² + B² 的液体如何精准填满 C²。这直观证明了面积之和的守恒性。"
              },
              sqrt: {
                  perfect: "完全平方数",
                  simplify: "根式化简",
                  estimate: "估算"
              },
              mission: {
                  title: "任务",
                  protocol: "NEXUS PROTOCOL // 瑞士节点在线",
                  cern_title: "CERN 校准阵列",
                  cern_desc: "校准 16:9 观测阵列。高=9s，宽=16s。求对角线。",
                  roof_title: "格林德瓦防雪屋顶",
                  roof_desc: "半跨度 6m，高 6m。计算屋顶支撑梁长度。",
                  ladder_title: "卢塞恩登梯码头",
                  ladder_desc: "梯子距墙 5m，可达高度 12m。求梯子长度。",
                  grid_title: "巴塞尔网格距离",
                  grid_desc: "计算巴塞尔城市网格中两个导航节点的距离。",
                  chain_title: "CERN 转运通道",
                  chain_desc: "转运通道跨越矩形平台并上升至高位。求完整对角线。"
              },
              mental: {
                  title: "心算",
                  triples: "勾股数",
                  chain: "链式路径"
              }
          },
  sm2_03: {
              back: "执行下一序列",
              title: "SM2.03 // 直线导航器",
              difficulty: {
                  basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
              },
              objective_title: "当前任务目标",
              target_title: "目标拦截",
              next: "执行下一序列",
              check: "验证",
              correct: "已验证",
              incorrect: "匹配失败",
              ready: "就绪",
              monitor_title: "SM2.03_激光监视器",
              footer_left: "SM2.03_直线导航器 // 节点：巴塞尔",
              labels: {
                  input: "输入",
                  hints: "提示",
                  emitter: "出发站",
                  target: "目的地",
                  slope: "每公里费用 (m)",
                  intercept: "基础票价 (c)"
              },
              prompts: {
                  level1: "计算到达目的地的票价",
                  level2: "找到两种票价方案费用相同的距离",
                  level3: "找到方案 A 变得更便宜的临界距离"
              },
              hints: {
                  level1: "斜率 m = 每公里费用。截距 c = 基础票价（起步价）。总票价 y = m × 距离 + c。",
                  level2: "两种票价方案的斜率 m 和截距 c 不同。让两个方程相等：m₁x + c₁ = m₂x + c₂，解出 x。",
                  level3: "找到方案 A 变得比方案 B 便宜的临界距离。",
                  drag: "在下方输入框中输入你的答案。"
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
              mission: {
                  title: "瑞士铁路票价计算器",
                  description: "将铁路票价建模为线性函数。斜率 = 每公里费用，截距 = 基础票价。找到两种票价方案的临界点！"
              },
              stages: {
                  level1: "等级 1",
                  level2: "等级 2",
                  level3: "等级 3"
              }
          },
  sm2_04: {
              back: "返回枢纽",
              title: "SM2.04 // 相似与比例",
              difficulty: {
                  basic: "基础",
                  core: "核心",
                  advanced: "进阶",
                  elite: "精英"
              },
              objective_title: "当前任务目标",
              target_title: "目标",
              next: "执行下一序列",
              check: "验证",
              correct: "已验证",
              incorrect: "不匹配",
              ready: "就绪",
              monitor_title: "SM2.04_监控",
              footer_left: "SM2.04_相似形 // 节点：巴塞尔",
              stages: {
                  scale_factor: "缩放",
                  similar_triangles: "相似",
                  application: "应用",
                  stages_prompt_latex: "使用比例关系求出未知量。"
              },
              labels: {
                  input: "输入",
                  hints: "提示"
              },
              hints: {
                  rules: {
                      proportional_latex: "\\frac{a}{b}=\\frac{c}{d}",
                      scale_factor_latex: "\\text{缩放因子 }k=\\frac{\\text{新}}{\\text{旧}}",
                      cross_multiply_latex: "\\text{交叉相乘求解未知数。}"
                  }
              },
              mission: {
                  title: "任务: 阴影测量法",
                  protocol: "NEXUS PROTOCOL // 瑞士节点在线",
                  tower_title: "苏黎世钟楼",
                  description: "在苏黎世，一位建筑师需要利用阴影测量一座历史钟楼的高度。相似三角形是解题的关键。",
                  ring_title: "卢塞恩观测环",
                  ring_desc: "在卢塞恩，同心传感环被一条与内圆相切的弦切割，求圆环宽度。",
                  labels: {
                      tower: "钟楼",
                      tower_shadow: "钟楼阴影",
                      stick: "木棍 (1.5m)",
                      stick_shadow: "木棍阴影",
                      calculate_height: "计算钟楼高度"
                  }
              }
          },
  sm2_05: {
              back: "返回枢纽",
              title: "SM2.05 // 幂运算与根号",
              difficulty: {
                  basic: "基础",
                  core: "核心",
                  advanced: "进阶",
                  elite: "精英"
              },
              objective_title: "当前任务目标",
              target_title: "运算任务",
              next: "执行下一序列",
              check: "验证",
              correct: "已验证",
              incorrect: "不匹配",
              ready: "就绪",
              monitor_title: "SM2.05_监控",
              footer_left: "SM2.05_幂与根号 // 节点：巴塞尔",
              stages: {
                  rules: "法则",
                  negative: "负指数",
                  scientific: "科学计数",
                  rules_prompt_latex: "\\text{应用幂运算法则化简。}",
                  negative_prompt_latex: "\\text{将负指数项化简（求分母中的指数 n）。}",
                  scientific_prompt_latex: "\\text{转换或应用科学计数法计算。}"
              },
              labels: {
                  input: "输入",
                  hints: "提示"
              }
          },
  sm2_06: {
              back: "返回枢纽",
              title: "SM2.06 // 二元一次方程组",
              difficulty: {
                  basic: "基础",
                  core: "核心",
                  advanced: "进阶",
                  elite: "精英"
              },
              objective_title: "当前任务目标",
              target_title: "方程组",
              next: "执行下一序列",
              check: "验证",
              correct: "已验证",
              incorrect: "不匹配",
              ready: "就绪",
              monitor_title: "SM2.06_监控",
              footer_left: "SM2.06_二元一次方程组 // 节点：巴塞尔",
              stages: {
                  substitution: "代入法",
                  elimination: "加减法",
                  mission: "任务",
                  substitution_prompt_latex: "\\text{用代入消元法求解。}",
                  elimination_prompt_latex: "\\text{用加减消元法求解。}",
                  mission_prompt_latex: "\\text{阅读题目并建立方程组求解。}"
              },
              labels: {
                  input: "输入",
                  hints: "提示"
              },
              hints: {
                  rules: {
                      substitution_latex: "\\text{将一个方程代入另一个方程。}",
                      elimination_add_latex: "\\text{两方程相加消去一个变量。}",
                      elimination_sub_latex: "\\text{两方程相减消去一个变量。}",
                      elimination_multiply_latex: "\\text{先乘以系数使其相等，再消元。}"
                  }
              },
              mission: {
                  apples: "苹果",
                  oranges: "橙子",
                  adult: "成人",
                  child: "儿童"
              },
              canvas_translations: {
                  legend: "图例",
                  eq1: "方程 1",
                  eq2: "方程 2",
                  cursor: "目标光标",
                  locked: "已锁定",
                  view: "视图: 2D正交坐标系"
              }
          },
  sm2_07: {
          back: "返回枢纽",
          title: "SM2.07 // 坐标几何",
          difficulty: {
              basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
          },
          objective_title: "当前任务目标",
          target_title: "精密测绘",
          next: "执行下一序列",
          check: "验证",
          correct: "已验证",
          incorrect: "不匹配",
          ready: "就绪",
          monitor_title: "SM2.07_坐标监视器",
          footer_left: "SM2.07_坐标几何 // 节点：苏黎世",
          labels: {
              input: "输入",
              hints: "提示",
              distance: "距离 (d)",
              midpoint: "中点 (M)",
              slope: "斜率 (m)"
          },
          mission: {
              title: "苏黎世节点测绘",
              description: "苏黎世坐标测绘需要精密几何计算。计算城市节点间的距离、中点和斜率。"
          },
          stages: {
              distance: "距离",
              midpoint: "中点",
              slope: "斜率",
              distance_prompt_latex: "\\text{计算点 A 和 B 之间的距离 }d\\text{。}",
              midpoint_prompt_latex: "\\text{计算中点坐标 }M(x,y)\\text{。}",
              slope_prompt_latex: "\\text{计算通过 A 和 B 的直线的斜率 }m\\text{。}"
          },
          formulas: {
              distance: "d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}",
              midpoint: "M = (\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2})",
              slope: "m = \\frac{y_2-y_1}{x_2-x_1}"
          },
          canvas_translations: {
              distance_formula: "距离公式",
              midpoint_formula: "中点公式",
              slope_formula: "斜率公式",
              line_eq: "直线方程",
              hide_formula: "隐藏公式",
              show_formula: "显示公式"
          },
          dynamic_prompts: {
              dist_rev_y: "距离 d=${d}。已知 A(0,0), B(3,y) 且 y>0，求 y。",
              dist_rev_x: "距离 d=${d}。已知 A(1,1), B(x,5) 且 x>1，求 x。",
              mid_rev: "M 是中点。已知 A 和 M，求 B(x,y)。",
              collinear: "A, B, C 三点共线。求 ${target}。"
          }
      },
  sm2_08: {
          back: "返回枢纽",
          title: "SM2.08 // 概率基础",
          difficulty: {
              basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
          },
          next: "执行下一序列",
          check: "验证",
          correct: "已验证",
          incorrect: "不匹配",
          ready: "就绪",
          monitor_title: "SM2.08_概率监视器",
          footer_left: "SM2.08_概率统计 // 节点：巴塞尔",
          formula_title: "概率公式",
          scenario_title: "问题",
          basel_scenario: "巴塞尔生活场景",
          calculate_title: "计算",
          answer_title: "你的答案",
          solution_title: "解答",
          stages: {
              basic_prob: "基础概率",
              lottery: "彩票与游戏",
              combined: "组合事件",
              data_stats: "数据统计"
          },
          scenarios: {
              bus_punctuality: "巴塞尔公共交通：你每天乘坐8路公交车上学。",
              weather_basel: "巴塞尔气象站：用于决策的气象数据。",
              school_cafeteria: "学校食堂：每周菜单规划。",
              exam_results: "班级表现：考试成绩分析。",
              dice_game: "概率游戏：理解公平骰子。",
              card_game: "纸牌游戏：标准52张扑克牌。",
              dice_advanced: "高级骰子：质数和特殊结果。",
              school_raffle: "学校慈善抽奖：支持本地社区。",
              fasnacht_game: "巴塞尔狂欢节：节日游戏摊位。",
              swiss_lotto_simple: "瑞士乐透简化版：理解彩票赔率（6选3）。",
              dice_win_condition: "狂欢节骰子游戏：和为7或11获胜。",
              two_buses: "日常通勤：早晚公交可靠性。",
              fc_basel: "巴塞尔足球俱乐部：主客场比赛预测。",
              novartis_qc: "诺华质量控制：药品样本检测。",
              three_events: "多次抛硬币：理解组合。",
              temperature: "巴塞尔天气：每周温度追踪。",
              test_scores: "班级成绩：考试结果统计分析。",
              pocket_money: "个人理财：每月支出明细。",
              data_comparison: "数据分析：比较平均值和中位数。",
              tram_punctuality: "巴塞尔有轨电车系统：3路电车可靠性。",
              coin_flip: "抛硬币：基础概率实验。",
              dice_two: "两个骰子：理解组合结果。",
              two_coins: "两枚硬币：独立事件。",
              three_buses: "三条公交线路：多个独立事件。",
              four_buses: "四条公交线路：扩展概率链。",
              complex_event: "复杂概率：高级场景。",
          },
          problems: {
              bus_ontime_16_20: "过去20天中，公交车准时到达16次。明天准时到达的概率是多少？",
              bus_ontime_18_20: "过去20天中，公交车准时到达18次。明天准时到达的概率是多少？",
              weather_rain_12_30: "巴塞尔气象站记录30天中有12天下雨。本周末下雨的概率是多少？",
              weather_sunny_21_30: "巴塞尔气象站记录30天中有21天晴天。明天晴天的概率是多少？",
              dice_roll_3: "掷一个标准骰子。掷出3的概率是多少？",
              coin_heads: "抛一次公平硬币。得到正面的概率是多少？",
              cafeteria_pizza: "学校食堂每周5天中有3天供应披萨。如果你随机去食堂，吃到披萨的概率是多少？",
              exam_pass: "一个100人的班级中，85人通过了考试。随机选一个学生，他通过的概率是多少？",
              tram_ontime_17_20: "3路电车20天中有17天准时到达。今天准时到达的概率是多少？",
              dice_greater_4: "掷骰子。掷出大于4的数字的概率是多少？",
              dice_even: "掷一个标准骰子。掷出偶数（2、4或6）的概率是多少？",
              card_heart: "从标准52张扑克牌中抽一张。抽到红心的概率是多少？",
              card_red: "从标准牌组中抽一张牌。抽到红色牌的概率是多少？",
              two_dice_sum_8: "掷两个骰子。和为8的概率是多少？",
              card_face: "抽一张牌。抽到人头牌（J、Q或K）的概率是多少？",
              dice_prime: "掷骰子。掷出质数（2、3或5）的概率是多少？",
              two_dice_sum_10: "掷两个骰子。和为10的概率是多少？",
              card_ace_or_king: "抽一张牌。抽到A或K的概率是多少？",
              two_dice_doubles: "掷两个骰子。掷出相同数字的概率是多少？",
              card_spade_face: "抽一张牌。抽到黑桃人头牌的概率是多少？",
              school_raffle_win: "学校为慈善活动售出100张彩票。你买了3张。你中奖的概率是多少？",
              school_raffle_5_tickets: "学校售出100张彩票。你买了5张。你中奖的概率是多少？",
              coin_two_heads: "抛两枚硬币。两个都是正面的概率是多少？",
              dice_not_six: "掷骰子。不掷出6的概率是多少？",
              school_raffle_2_tickets: "学校售出50张彩票。你买了2张。你中奖的概率是多少？",
              dice_sum_7: "在巴塞尔狂欢节游戏摊位掷两个骰子。和为7的概率是多少？",
              dice_sum_9: "掷两个骰子。和为9的概率是多少？",
              coin_three_all_heads: "抛三枚硬币。三个都是正面的概率是多少？",
              dice_sum_6: "掷两个骰子。和为6的概率是多少？",
              card_two_red: "不放回地抽两张牌。两张都是红色的概率是多少？",
              lotto_simple: "简化版瑞士乐透：从6个数字中选3个。共有20种可能组合。你的中奖概率是多少？",
              lotto_4_from_8: "简化彩票：从8个数字中选4个。共有70种组合。你的中奖概率是多少？",
              dice_sum_less_5: "掷两个骰子。和小于5的概率是多少？",
              coin_four_at_least_3_heads: "抛四枚硬币。至少3个正面的概率是多少？",
              card_three_hearts: "不放回地抽三张牌。三张都是红心的概率是多少？",
              dice_sum_7_or_11: "狂欢节游戏：掷两个骰子。和为7或11获胜。获胜概率是多少？",
              dice_sum_2_3_12: "狂欢节游戏：掷两个骰子。和为2、3或12输。输的概率是多少？",
              lotto_5_from_10: "彩票：从10个数字中选5个。共有252种组合。你的中奖概率是多少？",
              coin_five_exactly_2_heads: "抛五枚硬币。恰好2个正面的概率是多少？",
              card_poker_pair: "抽5张牌。至少有一对的概率是多少？（简化：约42.3%）",
              two_buses_ontime: "早上8路公交准点率80%。晚上15路公交准点率70%。两趟都准点的概率是多少？",
              two_coins_both_heads: "抛两枚硬币。两个都是正面的概率是多少？",
              two_dice_both_even: "掷两个骰子。两个都是偶数的概率是多少？",
              two_days_both_sunny: "巴塞尔晴天概率70%。今天和明天都晴天的概率是多少？",
              two_students_both_pass: "两个学生参加考试，通过率85%。两人都通过的概率是多少？",
              fc_basel_wins: "巴塞尔足球俱乐部主场胜率60%，客场胜率30%。本周两场都赢的概率是多少？",
              three_buses_all_ontime: "三条公交线路准点率分别为80%、75%和90%。三条都准点的概率是多少？",
              three_days_all_sunny: "巴塞尔晴天概率70%。未来3天都晴天的概率是多少？",
              three_dice_all_six: "掷三个骰子。三个都是6的概率是多少？",
              fc_basel_at_least_one_win: "巴塞尔足球俱乐部主场胜率60%，客场胜率30%。至少赢一场的概率是多少？",
              quality_all_pass: "诺华质量控制：每个样本合格率95%。如果检测5个样本，全部合格的概率是多少？",
              quality_at_least_4_pass: "诺华：5个样本，每个合格率95%。至少4个合格的概率是多少？",
              four_buses_all_ontime: "四条公交线路每条准点率80%。四条都准点的概率是多少？",
              week_no_rain: "巴塞尔每天下雨概率40%。连续7天不下雨的概率是多少？",
              five_students_all_pass: "五个学生参加考试，通过率85%。五人都通过的概率是多少？",
              three_coins_two_heads: "抛三枚硬币。恰好2个正面的概率是多少？",
              four_coins_exactly_3_heads: "抛四枚硬币。恰好3个正面的概率是多少？",
              quality_exactly_4_pass: "诺华：5个样本，每个合格率95%。恰好4个合格的概率是多少？",
              five_coins_at_least_4_heads: "抛五枚硬币。至少4个正面的概率是多少？",
              birthday_paradox_simple: "两个人：他们生日相同的概率是多少？（忽略闰年）",
              avg_temperature: "巴塞尔本周气温：18°C、22°C、20°C、19°C、21°C、23°C、20°C。计算平均温度。",
              simple_average_5: "考试成绩：80、85、90、75、95。计算平均分。",
              simple_sum: "每月支出：食物40瑞郎、交通25瑞郎、娱乐20瑞郎、储蓄15瑞郎。总共多少？",
              avg_temperature_5_days: "气温：15°C、18°C、20°C、17°C、20°C。计算平均温度。",
              median_5_values: "数据集：10、12、15、18、20。找出中位数。",
              class_average: "班级考试成绩：85、72、90、68、78、82、75、88、70、92。计算班级平均分。",
              spending_analysis: "每月支出：食物40瑞郎、交通25瑞郎、娱乐20瑞郎、储蓄15瑞郎。食物支出占百分之几？",
              median_even_count: "考试成绩：70、75、80、85。找出中位数。",
              range_calculation: "每周气温：15°C、18°C、20°C、17°C、23°C。计算极差（最大值-最小值）。",
              percentage_transport: "每月预算100瑞郎：食物40、交通25、娱乐20、储蓄15。交通占百分之几？",
              weighted_average: "两次考试：考试1（权重2）：80分，考试2（权重3）：90分。计算加权平均分。",
              median_vs_mean: "数据集：10、12、15、18、20。找出中位数。",
              mode_calculation: "考试成绩：80、85、85、90、85、75。找出众数（最常见的值）。",
              budget_remaining: "每月预算100瑞郎。已花费：食物40、交通25、娱乐20。还剩多少？",
              quartile_calculation: "气温：15°C、17°C、18°C、20°C、23°C。找出Q1（第25百分位数）。",
              standard_deviation_simple: "数据：10、15、20。平均值=15。计算方差：平方偏差的平均值。",
              outlier_effect: "数据：10、12、15、18、100。计算平均值。注意异常值（100）如何影响它。",
              interquartile_range: "数据：10、15、20、25、30。Q1=15，Q3=25。计算IQR = Q3 - Q1。",
              percentage_change: "上个月：100瑞郎。这个月：120瑞郎。计算百分比变化。",
              correlation_direction: "随着学习时间增加，考试成绩提高。相关性是正（1）还是负（-1）？",
          }
      },
  sm3_01: {
              back: "返回枢纽",
              title: "SM3.01 // 一元二次方程",
              difficulty: {
                  basic: "基础",
                  core: "核心",
                  advanced: "进阶",
                  elite: "精英"
              },
              objective_title: "当前任务目标",
              target_title: "目标方程",
              next: "执行下一序列",
              check: "验证",
              correct: "已验证",
              incorrect: "不匹配",
              ready: "就绪",
              monitor_title: "SM3.01_监控",
              footer_left: "SM3.01_一元二次方程 // 节点：苏黎世",
              stages: {
                  terms: "合并同类项",
                  factorize: "因式分解",
                  fractions: "分式化简",
                  equations: "解方程",
                  terms_prompt_latex: "\\text{化简表达式（合并同类项）。}",
                  factor_prompt_latex: "\\text{把式子因式分解成乘积形式。}",
                  fractions_prompt_latex: "\\text{约分 / 化简分式。}",
                  equations_prompt_latex: "\\text{分步骤解方程。}"
              },
              modes: {
                  factor: "因式分解",
                  formula: "求根公式",
                  complete_square: "配方法",
                  factor_prompt: "先把式子因式分解：找 A、B 使得 (x+A)(x+B)=0。",
                  formula_prompt: "使用一元二次方程求根公式求解。",
                  complete_square_prompt: "化为顶点式并写出 (h,k)。"
              },
              labels: {
                  input: "输入",
                  numerator: "分子",
                  denominator: "分母",
                  hints: "提示",
                  roots: "解 x₁, x₂",
                  vertex: "顶点 (h,k)",
                  factor: "因式分解",
                  factor_slots: "构造乘积形式 (A,B)",
                  formula: "求根公式",
                  complete_square: "配方法",
                  elite_hint_latex: "提示：\\; x=\\frac{-b\\pm\\sqrt{\\Delta}}{2a}",
                  fraction_hint: "提示：输入整数或分数 (如 4/3)。"
              },
              hints: {
                  identities: {
                      trinomial_expand_latex: "(x+A)(x+B)=x^2+(A+B)x+AB",
                      diff_squares_latex: "u^2-v^2=(u-v)(u+v)"
                  },
                  rules: {
                      factor_common_latex: "\\text{先提取公因式。}",
                      cancel_common_latex: "\\text{先分解分子分母，再约去公因式。}",
                      simplify_both_sides_latex: "\\text{两边逐步化简。}",
                      square_root_pm_latex: "\\text{开方时要考虑 }\\pm\\text{。}",
                      zero_product_latex: "\\text{若 }pq=0\\text{ 则 }p=0\\text{ 或 }q=0."
                  }
              }
          },
  sm3_02: {
              back: "返回枢纽",
              title: "SM3.02 // 三角函数圆",
              difficulty: {
                  basic: "基础",
                  core: "核心",
                  advanced: "进阶",
                  elite: "精英"
              },
              objective_title: "当前任务目标",
              target_title: "三角函数值",
              next: "执行下一序列",
              check: "验证",
              correct: "已验证",
              incorrect: "不匹配",
              ready: "就绪",
              monitor_title: "SM3.02_三角函数监控",
              footer_left: "SM3.02_三角函数圆 // 节点：巴塞尔",
              labels: {
                  angle: "角度 (θ)",
                  values: "三角函数值",
                  display: "显示选项",
                  show_waves: "显示波函数",
                  formulas: "公式",
                  special_angles: "特殊角",
                  exact_value: "精确值",
                  decimal_value: "数值",
                  quadrant: "象限"
              },
              mission: {
                  title: "任务：单位圆",
                  description: "掌握单位圆与三角函数。理解 sin、cos 和 tan 的关系。"
              },
              stages: {
                  unit_circle: "单位圆",
                  projections: "投影",
                  waves: "波函数",
                  unit_circle_desc: "探索单位圆和角度旋转",
                  projections_desc: "理解正弦和余弦作为投影",
                  waves_desc: "将正弦和余弦可视化为波函数",
                  unit_circle_hint: "圆上的点：(cos θ, sin θ)",
                  projections_hint: "sin = y 轴投影，cos = x 轴投影",
                  waves_hint: "sin 和 cos 形成周期波",
                  unit_circle_prompt_latex: "\\text{判断象限或正负号。}",
                  projections_prompt_latex: "\\text{计算三角函数的精确值。}",
                  waves_prompt_latex: "\\text{求振幅或周期。}"
              }
          },
  sm3_03: {
              back: "返回枢纽",
              title: "SM3.03 // 增长与对数",
              difficulty: {
                  basic: "基础",
                  core: "核心",
                  advanced: "进阶",
                  elite: "精英"
              },
              objective_title: "当前任务目标",
              target_title: "指数增长",
              next: "执行下一序列",
              check: "验证",
              correct: "已验证",
              incorrect: "不匹配",
              ready: "就绪",
              monitor_title: "SM3.03_增长监控",
              footer_left: "SM3.03_指数函数 // 节点：巴塞尔",
              labels: {
                  input: "输入",
                  hints: "提示",
                  population: "种群数量 (N)",
                  time: "时间 (t)",
                  doubling_time: "倍增时间 (d)",
                  initial: "初始数量 (N₀)",
                  formula_ref: "公式参考",
                  parameters: "当前参数",
                  growth_rate: "增长率 (k)",
                  half_life: "半衰期",
                  principal: "本金 (P)",
                  rate: "利率 (r)"
              },
              hints: {
                  exp_rule1: "每次倍增，种群数量乘以 2",
                  exp_rule2: "n 次倍增后：N = N₀ × 2ⁿ",
                  log_rule1: "log₂(2ⁿ) = n",
                  log_rule2: "换底公式：logₐ(x) = ln(x)/ln(a)",
                  app_rule1: "半衰期：N(t) = N₀ × (½)^(t/h)",
                  app_rule2: "复利：A = P(1+r)^t"
              },
              input_tip: "提示：输入整数或保留 1 位小数。",
              mission: {
                  title: "细菌增长实验室",
                  description: "诺华生物实验室需要指数增长建模。计算细菌种群和对数尺度。"
              },
              stages: {
                  exponential: "指数增长",
                  logarithm: "对数",
                  applications: "应用",
                  exponential_prompt_latex: "\\text{使用 }N(t)=N_0\\cdot 2^{t/d}\\text{ 计算种群数量。}",
                  logarithm_prompt_latex: "\\text{使用对数求解时间。}",
                  applications_prompt_latex: "\\text{将指数模型应用于实际场景。}",
                  exp_basic_prompt: "\\text{计算时间 } t \\text{ 时的种群数量。}",
                  exp_advanced_prompt: "\\text{求倍增次数。}",
                  exp_elite_prompt: "\\text{求连续增长率 } k\\text{。}",
                  log_basic_prompt: "\\text{用 } t = d \\cdot \\log_2(N/N_0) \\text{ 求时间。}",
                  log_core_prompt: "\\text{计算对数值。}",
                  log_advanced_prompt: "\\text{使用换底公式。}",
                  log_elite_prompt: "\\text{求解对数方程。}",
                  app_half_prompt: "\\text{计算半衰期后剩余量。}",
                  app_compound_prompt: "\\text{计算复利：} A=P(1+r)^t\\text{。}",
                  app_rate_prompt: "\\text{从数据中求增长率。}",
                  app_ph_prompt: "\\text{由氢离子浓度计算 pH 值。}"
              },
              formulas: {
                  exponential: "N(t) = N_0 \\cdot 2^{t/d}",
                  logarithm: "t = d \\cdot \\log_2(N/N_0)",
                  applications: "N(t) = N_0 \\cdot e^{kt}"
              },
              scenarios: {
                  exp_bac: "🦠 场景：诺华实验室细菌培养 — 巴塞尔诺华制药的研究团队正在研究细菌生长。他们在早上 8:00 将 100 个细菌放入培养皿。在最佳条件下，细菌数量每 20 分钟翻一倍。实验室需要预测何时细菌数量会达到 10,000 个，以便在正确的时刻采集样本。你的任务：使用指数增长公式计算任意时刻的细菌数量。",
                  exp_social: "📱 场景：抖音挑战视频爆火 — 你的朋友在中午发布了一个舞蹈挑战视频。最初有 50 人观看。每小时，每个观看者都会分享给 2 个还没看过的朋友（翻倍效应）。到了晚上，观看次数呈指数级爆炸增长。校长想知道：什么时候会有 10,000 名学生看过这个视频？这就是社交媒体上真实的病毒式传播模型。",
                  exp_virus: "🦠 场景：学校流感疫情建模 — 周一早上，你们学校 1,200 名学生中有 3 人得了流感。卫生部门知道，如果不采取干预措施，每个感染者每 2 天会传染给 2 个人（倍增时间 = 2 天）。校医需要预测：到周五会有多少人生病？什么时候会有 100 名学生被感染？这有助于决定是否需要停课。",
                  exp_moore: "💻 场景：智能手机性能预测 — 2000 年，你爸爸的诺基亚手机只有 4 MB 内存。根据摩尔定律，计算能力大约每 2 年翻一倍。你现在的 iPhone 有 8 GB（8,000 MB）内存。问题：从 2000 年到 2024 年发生了多少次'翻倍'？你能验证摩尔定律是否成立吗？这种指数增长推动了所有现代科技的发展。",
                  log_invest: "💰 场景：你的零花钱投资计划 — 你从生日礼物中攒了 1,000 瑞士法郎。你的父母提出一个协议：他们充当你的'银行'，每年支付 8% 的复利（意味着每年你都会从之前的利息中再赚取利息）。你想买一台游戏电脑，价格是 2,000 瑞士法郎。问题：多少年后你的钱会翻倍？使用对数求解：t = log₂(2000/1000) / log₂(1.08)。这就是真实的投资规划方式！",
                  log_sound: "🔊 场景：学校音乐会音响调试 — 音乐老师正在为学校音乐会调试音响。耳语的声音是 30 分贝，正常对话是 60 分贝，摇滚音乐会是 120 分贝。但这里有个诀窍：分贝刻度是对数的！60 分贝不是 30 分贝的'两倍响'——它实际上强度是 1,000 倍（因为 10^(60/10) / 10^(30/10) = 1,000）。你的任务：如果当前声音是 80 分贝，安全上限是 85 分贝，声音强度还能增加多少倍才会不安全？",
                  log_ph: "🧪 场景：化学实验室 pH 值测试 — 在化学课上，你正在测试不同液体的 pH 值。柠檬汁的 pH 值是 2，水是 7，肥皂是 12。老师解释说：pH 值是测量氢离子浓度 [H⁺] 的对数刻度。pH = -log₁₀[H⁺]。这意味着 pH 2 比 pH 7 酸性强 100,000 倍（不仅仅是'5 个单位'的差别）！问题：如果一个溶液的 [H⁺] = 0.001 mol/L，它的 pH 值是多少？它是酸性还是碱性？",
                  log_security: "🔐 场景：密码破解时间 — 你的信息技术老师在讲解密码安全。一个 4 位数的 PIN 码（0000-9999）有 10,000 种组合。黑客的计算机每秒可以尝试 1,000 个密码，所以破解只需 10 秒。但如果你使用 8 位字母数字密码（每位有 62 种选择），就有 62^8 = 218 万亿种组合！即使以每秒 10 亿次的速度尝试，也需要 218,000 秒（2.5 天）。问题：需要多少位字符才能保护 1 年？使用对数求解：n = log₆₂(秒数 × 每秒尝试次数)。",
                  app_med: "💊 场景：药物剂量时间安排 — 医生给你开了止痛药。你在早上 8:00 服用了 400 毫克。这种药物的半衰期是 6 小时，意味着每 6 小时，体内的药物会减少一半。下午 2:00（6 小时后），还剩 200 毫克。晚上 8:00，还剩 100 毫克。医生说药物浓度低于 50 毫克就不起作用了。问题：什么时候可以安全地服用下一剂？使用公式：N(t) = N₀ × (1/2)^(t/6)。",
                  app_bank: "🏦 场景：比较储蓄账户 — 你有 5,000 瑞士法郎要为上大学存起来。银行 A 提供 3% 单利（每年固定赚 150 瑞士法郎）。银行 B 提供 3% 复利（每年你都会从之前的利息中再赚取利息）。10 年后：银行 A 给你 5,000 + 10×150 = 6,500 瑞士法郎。银行 B 给你 5,000 × (1.03)^10 = 6,720 瑞士法郎。问题：多少年后银行 B 会比银行 A 多给你 1,000 瑞士法郎？使用指数方程求解！",
                  app_pop: "🏙️ 场景：苏黎世人口增长 — 2000 年，苏黎世有 34 万居民。这座城市以每年 1.2% 的速度增长（指数增长）。到 2020 年，人口达到 42 万。城市规划者需要预测：苏黎世何时会达到 50 万人口？这决定了何时需要建造新的学校、电车和住房。使用公式：P(t) = P₀ × (1.012)^t。当 P(t) = 500,000 时求解 t。",
                  app_carbon: "🦴 场景：考古年代测定 — 考古学家在瑞士的一个洞穴中发现了一件木制工具。所有生物都含有碳-14（¹⁴C），其半衰期为 5,730 年。当树木死亡时，它停止吸收新的 ¹⁴C。通过测量剩余的 ¹⁴C 含量，科学家可以计算年代。如果这件工具还有原始 ¹⁴C 的 25%，它有多少年历史？使用：0.25 = (1/2)^(t/5730)。用对数求解 t。这就是我们如何知道古代文物年代的方法！"
              }
          },
  sm3_04: {
          back: "返回枢纽",
          title: "SM3.04 // 对数刻度",
          difficulty: {
              basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
          },
          objective_title: "当前任务目标",
          target_title: "对数测量",
          next: "执行下一序列",
          check: "验证",
          correct: "已验证",
          incorrect: "匹配失败",
          ready: "就绪",
          monitor_title: "SM3.04_对数监视器",
          footer_left: "SM3.04_对数 // 节点：巴塞尔",
          input_tip_2dp: "提示：保留 2 位小数。",
          labels: {
              input: "输入",
              hints: "提示",
              ph: "pH 值",
              decibel: "分贝 (dB)",
              richter: "里氏震级"
          },
          mission: {
              title: "对数测量实验室",
              description: "掌握三种真实世界的对数刻度：pH值（化学）、分贝（声音）、里氏震级（地震）。每种刻度都将巨大的范围压缩成可管理的数字。"
          },
          stages: {
              ph: "pH 刻度",
              decibel: "分贝",
              richter: "里氏震级",
              ph_prompt_latex: "\\text{使用 }pH=-\\log_{10}[H^+]\\text{ 计算 pH 值。}",
              decibel_prompt_latex: "\\text{使用 }L=10\\log_{10}(I/I_0)\\text{ 计算分贝。}",
              richter_prompt_latex: "\\text{使用 }M=\\log_{10}(A)\\text{ 计算震级。}",
              decibel_reduction: "计算分贝降低值：L_1 - L_2",
              magnitude_difference: "计算震级差异：M_1 - M_2"
          },
          formulas: {
              ph: "pH = -\\log_{10}[H^+]",
              decibel: "L = 10\\log_{10}(I/I_0)",
              richter: "M = \\log_{10}(A)"
          },
          scenarios: {
              ph_basic: "🧪 场景：学校化学实验室 — 化学老师给你一瓶透明液体让你测试。你用 pH 计测得氢离子浓度 [H⁺] = 0.001 mol/L（科学记数法是 10⁻³）。要正确报告酸度，你需要计算 pH 值。记住：pH = -log₁₀[H⁺]。pH 低于 7 是酸性，pH 7 是中性（纯水），高于 7 是碱性。这瓶液体原来是柠檬汁！",
              ph_core: "🧪 场景：游泳池水质检测 — 你在巴塞尔公共游泳池兼职。卫生检查员要求每天测试 pH 值。今天的水样显示 [H⁺] = 10⁻⁸ mol/L。你需要计算 pH 值来验证是否在安全范围内（7.2-7.8）。如果 pH 太低（酸性），会刺激游泳者的眼睛。如果太高（碱性），氯气消毒就不起作用。你的计算决定了游泳池今天能否开放！",
              ph_advanced: "🧪 场景：制药质量控制 — 你是巴塞尔诺华制药的实习生。一种新药配方必须精确控制 pH 值以保持稳定性。实验室测得 [H⁺] = 3.16 × 10⁻⁵ mol/L。计算 pH 值并保留 2 位小数。如果 pH 值偏离目标范围（4.3-4.7），整批产品（价值数百万）都必须报废。对数精度在制药业至关重要！",
              ph_elite: "🧪 场景：环境酸雨研究 — 巴塞尔大学的研究人员正在研究酸雨对瑞士森林的影响。雨水样本显示 [H⁺] = 10⁻⁴·⁵ mol/L（注意这个分数指数！）。计算 pH 值。正常雨水是 pH 5.6，但酸雨可以低至 pH 4.0 或更低。每个 pH 单位代表酸度的 10 倍变化，所以 pH 4 的雨比 pH 6 的雨酸性强 100 倍。你的计算有助于评估环境破坏程度。",
              decibel_basic: "🔊 场景：学校图书馆噪音检查 — 图书管理员让你测量自习区是否足够安静。你用声音计测得：强度 I = 10⁻¹⁰ W/m²。参考强度（听觉阈值）是 I₀ = 10⁻¹² W/m²。使用 L = 10·log₁₀(I/I₀) 计算声音级别（分贝）。参考：耳语 = 30 分贝，正常对话 = 60 分贝，图书馆应低于 40 分贝。",
              decibel_core: "🔊 场景：音乐会音响工程师 — 你正在为学校礼堂的摇滚音乐会调试音响。音响系统在前排产生的强度 I = 10⁻⁴ W/m²。计算分贝级别。安全法规要求 85 分贝以上需要听力保护，长时间暴露在 100 分贝以上会造成听力损伤。你的计算决定是否需要降低音量或向观众提供耳塞。",
              decibel_advanced: "🔊 场景：机场噪音污染研究 — 巴塞尔-米卢斯机场正在扩建，居民抱怨噪音。你测量一架起飞的喷气式飞机：在 100 米距离处 I = 1 W/m²。计算分贝级别。市政法规限制机场白天噪音不超过 65 分贝。在 120 分贝（喷气发动机）时，声音是痛苦的。对数刻度意味着 120 分贝不是 60 分贝的'两倍响'——它的强度是 1,000,000 倍！",
              decibel_elite: "🔊 场景：声学工程挑战 — 正在设计一座巴塞尔音乐厅。建筑师需要计算吸音效果。如果原始强度是 I₁ = 10⁻³ W/m²，安装吸音板后降至 I₂ = 10⁻⁶ W/m²，分贝降低了多少？计算 L₁ - L₂。这涉及理解分贝差异代表强度比：降低 10 分贝意味着强度减少 10 倍，降低 20 分贝意味着强度减少 100 倍。",
              richter_basic: "🌍 场景：地震监测站 — 你在巴塞尔大学的地震学实验室做志愿者。巴塞尔附近发生了一次小地震。地震仪记录的地面运动振幅 A = 100 微米。使用 M = log₁₀(A) 计算里氏震级。参考：M < 2 感觉不到，M 3-4 是轻微，M 5-6 是中等，M 7+ 是重大。你的计算有助于对地震严重程度进行分类。",
              richter_core: "🌍 场景：历史地震分析 — 1356 年，巴塞尔经历了瑞士有记录以来最强的地震。现代分析估计地面振幅为 A = 100,000 微米。计算里氏震级。将其与 2011 年日本地震（M 9.0）进行比较，后者的振幅为 1,000,000,000 微米。对数刻度将这个十亿倍的范围压缩成可管理的数字（1 到 9）。",
              richter_advanced: "🌍 场景：地震预警系统 — 瑞士正在开发地震警报应用。发生两次地震：地震 A 的振幅为 31,600 微米，地震 B 的振幅为 1,000 微米。计算两个震级并保留 2 位小数。应用需要区分'轻微震动'（M < 4.0）和'显著地震'（M ≥ 4.0），以决定是否向数百万手机发送紧急警报。",
              richter_elite: "🌍 场景：地震能量比较 — 高级地震学：地震释放的能量每增加一个震级单位就增加 31.6 倍。如果地震 A 是 M 5.0，地震 B 是 M 7.0，B 释放的能量是 A 的多少倍？首先理解 M 7.0 意味着振幅是 M 5.0 的 100 倍（因为 10² = 100）。但能量按振幅的 1.5 次方缩放，所以能量比是 100^1.5 = 1,000 倍。这就是为什么 M 7 地震是灾难性的，而 M 5 只是'中等'。"
          },
          canvas: {
              ph_title: "pH 刻度",
              ph_formula: "pH = -log₁₀[H⁺]",
              decibel_title: "分贝刻度",
              decibel_formula: "L = 10·log₁₀(I/I₀)",
              richter_title: "里氏震级",
              richter_formula: "M = log₁₀(A)",
              ph_subtitle: "酸碱度",
              decibel_subtitle: "声音",
              richter_subtitle: "地震",
              status_chamber: "实验室",
              status_sim: "对数刻度模拟：运行中",
              status_mode: "模式"
          }
      },
};
