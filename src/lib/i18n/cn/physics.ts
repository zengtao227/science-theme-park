/**
 * CN - PHYSICS translations
 * Auto-generated from i18n.ts refactoring
 * Last updated: 2026-02-15
 */

export const cnPhysics = {
  ggp5_02: {
          title: "GP1.02 // 相对论实验室",
          back: "返回 Nexus",
          footer_left: "GP1.02_相对论实验室 // 节点: RHINE",
          monitor_title: "GP1.02_相对论监测器",
          labels: {
              lorentz_factor_title: "洛伦兹因子",
              velocity_label: "速度 (v/c)",
              velocity_value: "{value}% c",
              gamma_value: "γ = {value}",
              toggle_doppler: "显示多普勒效应",
              toggle_contraction: "显示长度收缩"
          },
          effects: {
              title: "相对论效应",
              time_dilation_label: "时间膨胀：",
              time_dilation_value: "Δt' = {value}Δt",
              length_contraction_label: "长度收缩：",
              length_contraction_value: "L' = {value}L"
          },
          formulas: {
              title: "公式",
              gamma: "γ = 1/√(1 - v²/c²)",
              time: "Δt' = γΔt",
              length: "L' = L/γ",
              energy: "E = γmc²"
          },
          mission: {
              title: "任务：狭义相对论",
              description: "探索狭义相对论效应。观察相对论速度下的时间膨胀、长度收缩和多普勒效应。"
          }
      },
  gp1_03: {
          back: "返回枢纽",
          title: "GP5.03 // 粒子对撞机",
          difficulty: {
              basic: "基础",
              core: "核心",
              advanced: "进阶",
              elite: "精英"
          },
          objective_title: "当前任务目标",
          target_title: "LHC ATLAS 探测器",
          next: "执行下一序列",
          check: "验证",
          correct: "已验证",
          incorrect: "匹配失败",
          ready: "就绪",
          monitor_title: "GP5.03_LHC_监视器",
          footer_left: "GP5.03_粒子对撞机 // 节点：CERN",
          labels: {
              beam_energy: "束流能量",
              relativistic_effects: "相对论效应",
              formulas: "公式",
              magnetic_field: "启用磁场（弯曲磁铁）",
              colliding: "对撞中...",
              initiate_collision: "启动对撞"
          },
          mission: {
              title: "任务：粒子物理",
              description: "探索 CERN 大型强子对撞机的粒子碰撞。发现希格斯玻色子。"
          },
          stages: {
              acceleration: "加速",
              collision: "对撞",
              detection: "探测",
              acceleration_desc: "将质子加速到接近光速",
              collision_desc: "在 13 TeV 下对撞质子束",
              detection_desc: "探测粒子喷注和径迹",
              acceleration_hint: "质子达到光速的 99.9999991%",
              collision_hint: "对撞能量：13 TeV = 13,000 GeV",
              detection_hint: "磁场使带电粒子径迹弯曲"
          }
      },
  gp5_01: {
          back: "返回枢纽",
          title: "P5.01 // 原子核核心",
          difficulty: {
              basic: "基础",
              core: "核心",
              advanced: "进阶",
              elite: "精英"
          },
          objective_title: "当前任务目标",
          target_title: "同位素 / 衰变",
          next: "执行下一序列",
          check: "验证",
          correct: "已验证",
          incorrect: "匹配失败",
          ready: "就绪",
          monitor_title: "P5.01_核物理监视器",
          footer_left: "P5.01_现代物理 // 节点：巴塞尔",
          labels: {
              input: "输入参数",
              hints: "提示",
              balancing: "核反应方程式",
              mass: "质量数 (A)",
              atomic: "原子序数 (Z)"
          },
          mission: {
              title: "稳定核心",
              description: "诺华创新区需要一种稳定的同位素。通过识别正确的衰变粒子来平衡核反应方程式。"
          },
          stages: {
              alpha: "α 衰变",
              beta: "β 衰变",
              gamma: "γ 放射",
              fission: "核裂变",
              alpha_decay: "α 衰变",
              beta_decay: "β 衰变",
              gamma_decay: "γ 放射",
              alpha_decay_prompt_latex: "\\text{平衡 α 衰变方程式。}",
              beta_decay_prompt_latex: "\\text{平衡 β 衰变方程式。}",
              gamma_decay_prompt_latex: "\\text{识别 γ 放射状态。}",
              fission_prompt_latex: "\\text{预测核裂变反应中缺失产物。}"
          }
      },
  gp5_02: {
          back: "返回枢纽",
          title: "P5.02 // 相对论实验室",
          difficulty: {
              basic: "基础",
              core: "核心",
              advanced: "进阶",
              elite: "精英"
          },
          objective_title: "当前任务目标",
          target_title: "相对论效应",
          next: "执行下一序列",
          check: "验证",
          correct: "已验证",
          incorrect: "匹配失败",
          ready: "就绪",
          monitor_title: "P5.02_相对论监视器",
          footer_left: "P5.02_狭义相对论 // 节点：CERN",
          labels: {
              input: "输入",
              hints: "提示",
              velocity: "速度 (v/c)",
              gamma: "洛伦兹因子 (γ)",
              length: "收缩长度",
              time: "膨胀时间"
          },
          mission: {
              title: "爱因斯坦实验室",
              description: "在 CERN，通过计算接近光速时的相对论效应来校准粒子加速器。"
          },
          stages: {
              lorentz: "洛伦兹因子",
              contraction: "长度收缩",
              dilation: "时间膨胀",
              lorentz_prompt_latex: "\\text{计算速度 }v\\text{ 下的洛伦兹因子 }\\gamma\\text{。}",
              contraction_prompt_latex: "\\text{计算收缩长度 }L=L_0/\\gamma\\text{。}",
              dilation_prompt_latex: "\\text{计算膨胀时间 }T=T_0\\times\\gamma\\text{。}"
          }
      },
  sp1_01: {
          back: "返回枢纽",
          title: "SP1.01 // 测量与单位",
          check: "验证",
          next: "下一步",
          correct: "测量验证",
          incorrect: "测量错误",
          ready: "就绪",
          monitor_title: "SP1.01_测量实验室",
          footer_left: "SP1.01_测量 // 节点: 巴塞尔",
          objective_title: "测量目标",
          difficulty: {
              basic: "基础",
              core: "核心",
              advanced: "进阶",
              elite: "精英"
          },
          stages: {
              si_units: "SI单位",
              conversion: "换算",
              precision: "精度"
          },
          tools: {
              ruler: "尺子",
              scale: "天平",
              timer: "计时器"
          },
          labels: {
              precision: "测量精度",
              measurement_display: "测量显示",
              input_terminal: "终端输入 [测量节点]"
          },
          prompts: {
              si_unit: "{measurement} 的 SI 单位是什么？",
              convert: "将 {value} {from} 转换为 {to}",
              sigfigs: "{value} 有几位有效数字？",
              hint_si: "SI 单位是 {name}",
              hint_factor: "乘以 {factor}",
              hint_sigfigs: "计算所有非零数字和它们中间的零"
          },
          feedback: {
              correct: "测量精度确认。",
              incorrect: "检测到校准错误。"
          }
      },
  sp1_03: {
              back: "返回枢纽",
              title: "P1.03 // 能量与功率",
              difficulty: {
                  basic: "基础",
                  core: "核心",
                  advanced: "进阶",
                  elite: "精英"
              },
              objective_title: "当前任务目标",
              target_title: "涡轮输出",
              next: "执行下一序列",
              check: "验证",
              correct: "已验证",
              incorrect: "不匹配",
              ready: "就绪",
              monitor_title: "P1.03_涡轮监控",
              footer_left: "P1.03_莱茵水电 // 节点：巴塞尔",
              input_tip_1dp: "提示：输入分数 (如 4/3) 或保留 1 位小数。",
              stages: {
                  potential: "势能",
                  kinetic: "动能",
                  power: "功率",
                  potential_prompt_latex: "\\text{计算重力势能 }E_p=mgh。",
                  kinetic_prompt_latex: "\\text{计算动能 }E_k=\\frac{1}{2}mv^2。",
                  power_prompt_latex: "\\text{计算功率 }P=\\frac{W}{t}\\text{（若给出效率需考虑）。}"
              },
              labels: {
                  input: "输入",
                  formula: "公式"
              },
              formulas: {
                  potential: "E_p=mgh",
                  kinetic: "E_k=\\frac{1}{2}mv^2",
                  power: "P=\\frac{W}{t}"
              },
              mission: {
                  title: "任务：莱茵河水电站",
                  description: "将莱茵河水能转化为清洁电力。追踪能量转化与涡轮功率。"
              }
          },
  sp1_04: {
          back: "返回枢纽",
          title: "SP1.04 // 简单机械",
          difficulty: {
              basic: "基础",
              core: "核心",
              advanced: "进阶",
              elite: "精英"
          },
          next: "执行下一序列",
          check: "验证",
          correct: "已验证",
          incorrect: "不匹配",
          ready: "就绪",
          monitor_title: "SP1.04_力学监控",
          footer_left: "SP1.04_简单机械 // 节点: 巴塞尔",
          objective_title: "当前任务目标",
          stages: {
              levers: "杠杆",
              pulleys: "滑轮",
              inclined_planes: "斜面"
          },
          labels: {
              machine_display: "机械显示",
              input_terminal: "输入终端",
              force_ratio: "力比 (MA)",
              show_forces: "显示力",
              mechanics_score: "力学分数"
          },
          prompts: {
              lever: "一个杠杆举起 {load} N 的负载。如果力臂是 {effortArm} m，阻力臂是 {loadArm} m，需要多少努力力？",
              pulley: "一个滑轮系统用 {strands} 根支撑绳举起 {load} N 的负载。需要多少努力力？",
              inclined_plane: "一个斜面将 {load} N 的负载举到 {height} m 高度，斜面长度为 {length} m。需要多少努力力？",
              hint_lever: "使用 MA = 力臂 / 阻力臂，然后 F_effort = F_load / MA",
              hint_pulley: "使用 MA = 绳子数量，然后 F_effort = F_load / MA",
              hint_inclined: "使用 MA = 长度 / 高度，然后 F_effort = F_load / MA"
          },
          scenarios: {
              basel_construction: "巴塞尔建筑工地：巴塞尔罗氏塔建筑工地的工人使用杠杆、滑轮和斜坡高效移动重型材料。简单机械减少所需力量。",
              lever_crowbar: "巴塞尔翻新撬棍：翻新巴塞尔历史建筑需要小心使用杠杆。长力臂的撬棍提供机械优势来举起重石。",
              pulley_crane: "建筑起重机滑轮：巴塞尔建筑起重机使用多根滑轮绳来举起钢梁。每增加一根绳子就减少所需输入力。",
              ramp_loading: "巴塞尔港口装载坡道：莱茵河港口工人使用斜面将货物装载到驳船上。更长的坡道需要更少的力但更多的距离。",
              compound_machine: "巴塞尔复合机械：真实的建筑设备结合杠杆、滑轮和斜面，实现高机械优势以完成重型起重任务。"
          },
          feedback: {
              correct: "机械优势计算正确！",
              incorrect: "检查你的机械优势计算。"
          }
      },
  sp1_05: {
          back: "返回枢纽",
          title: "SP1.05 // 莱茵河渡轮",
          difficulty: {
              basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
          },
          next: "执行下一序列",
          check: "验证",
          correct: "已验证",
          incorrect: "不匹配",
          ready: "就绪",
          monitor_title: "SP1.05_渡轮监视器",
          footer_left: "SP1.05_莱茵河渡轮 // 节点：巴塞尔",
          stages: {
              composition: "矢量合成",
              drift: "偏航分析",
              navigation: "精准航行"
          },
          labels: {
              river_speed: "河流速度 (v_r)",
              ferry_speed: "渡轮速度 (v_f)",
              cable_angle: "缆索角度 (θ)",
              resultant_speed: "合速度 (v_net)",
              drift_speed: "偏航速度",
              angle: "角度"
          },
          mission: {
              title: "莱茵河横渡任务",
              description: "驾驶巴塞尔莱茵河渡轮。调整缆索角度和渡轮速度以补偿河水流速。"
          }
      },
  sp1_06: {
          back: "返回枢纽",
          title: "SP1.06 // 瑞士钟摆",
          difficulty: {
              basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
          },
          objective_title: "当前任务目标",
          target_title: "振荡数据",
          next: "执行下一序列",
          check: "验证",
          correct: "验证通过",
          incorrect: "匹配失败",
          ready: "就绪",
          monitor_title: "SP1.06_钟摆监控器",
          footer_left: "SP1.06_钟摆力学 // 节点：巴塞尔",
          labels: {
              input: "输入",
              hints: "提示",
              period: "周期 (T)",
              length: "长度 (L)",
              gravity: "重力加速度 (g)",
              frequency: "频率 (f)"
          },
          mission: {
              title: "钟表匠的秘密",
              description: "校准巴塞尔的机械主钟。掌握简谐运动和能量守恒的物理学。"
          },
          stages: {
              period: "周期",
              gravity: "重力",
              energy: "能量"
          }
      },
  sp1_07: {
              back: "返回枢纽",
              title: "SP1.07 // 压力与浮力",
              difficulty: {
                  basic: "基础",
                  core: "核心",
                  advanced: "进阶",
                  elite: "精英"
              },
              next: "执行下一序列",
              check: "验证",
              correct: "已验证",
              incorrect: "不匹配",
              ready: "就绪",
              monitor_title: "SP1.07_流体监控",
              footer_left: "SP1.07_流体力学 // 节点：莱茵河",
              objective_title: "当前任务目标",
              stages: {
                  pressure: "压力",
                  buoyancy: "浮力",
                  hydraulics: "液压"
              },
              labels: {
                  physics_display: "物理显示",
                  input_terminal: "输入终端",
                  depth: "深度",
                  density: "物体密度",
                  force: "活塞力",
                  fluid_mastery: "流体掌握度"
              },
              prompts: {
                  pressure_depth: "潜水员在莱茵河中潜至 {depth} 米深度。计算总压力（P₀=100000 Pa，ρ=1000 kg/m³，g=10 m/s²）。",
                  buoyant_force: "体积为 {volume} m³ 的物体浸没在水中。计算浮力（ρ_water=1000 kg/m³，g=10 m/s²）。",
                  hydraulic_force: "液压升降机输入力 {f1} N，作用面积 {a1} m²。输出面积为 {a2} m²。计算输出力。",
                  hint_pressure: "使用 P = P₀ + ρgh",
                  hint_archimedes: "使用 F_b = ρ_water × V × g",
                  hint_pascal: "使用帕斯卡原理：F₁/A₁ = F₂/A₂"
              },
              scenarios: {
                  rhine_swimming: "莱茵河游泳：潜水员在巴塞尔中桥附近探索莱茵河床。水压随深度增加，影响设备和安全协议。",
                  rhine_boat: "莱茵河货运：驳船在莱茵河上运输货物，往返于巴塞尔和鹿特丹之间。理解浮力对于载重计算和船只稳定性至关重要。",
                  hydraulic_lift: "巴塞尔建筑工地：巴塞尔建筑工地的液压升降机利用帕斯卡原理，用最小的输入力举起重型建筑材料。"
              },
              feedback: {
                  correct: "流体力学已掌握！",
                  incorrect: "请复习流体力学原理。"
              }
          },
  sp1_08: {
          title: "SP1.08 // 光学工作台",
          back: "返回 Nexus",
          footer_left: "SP1.08_光学工作台 // 节点: BASEL",
          monitor_title: "SP1.08_光学监测器",
          labels: {
              show_prism: "显示棱镜色散",
              medium_1: "介质 1 (n₁)",
              medium_2: "介质 2 (n₂)",
              incident_angle: "入射角 (θ₁)",
              refraction_title: "折射",
              refracted_angle: "折射角 (θ₂)：",
              critical_angle: "临界角：",
              total_internal_reflection: "全内反射",
              na: "无",
              angle_value: "{value}°"
          },
          snell: {
              title: "斯涅尔定律",
              line_1: "n₁ sin(θ₁) = n₂ sin(θ₂)",
              line_2: "θ_c = arcsin(n₂/n₁)",
              line_3: "v = c/n"
          },
          mission: {
              title: "任务：几何光学",
              description: "掌握斯涅尔定律和几何光学。观察折射、全内反射和棱镜色散。"
          }
      },
  sp2_01: {
          back: "返回枢纽",
          title: "P2.01 // 热力学",
          difficulty: {
              basic: "基础",
              core: "核心",
              advanced: "进阶",
              elite: "精英"
          },
          objective_title: "当前任务目标",
          target_title: "热量传递",
          next: "执行下一序列",
          check: "验证",
          correct: "已验证",
          incorrect: "匹配失败",
          ready: "就绪",
          monitor_title: "P2.01_热力学监视器",
          footer_left: "P2.01_热力学 // 节点：巴塞尔",
          stages: {
              heat_transfer: "热传递",
              specific_heat: "比热容",
              phase_changes: "相变"
          },
          labels: {
              thermal_display: "热显示",
              input_terminal: "输入终端",
              temperature: "温度",
              show_particles: "显示粒子",
              thermal_score: "热力学分数"
          },
          prompts: {
              heat_transfer: "使用{method}方法计算热传递速率。",
              specific_heat: "{mass} kg样品被加热{deltaT}°C。计算所需能量（水的c=4186 J/kg·K）。",
              phase_change: "计算{mass} kg水的{phase}所需能量。",
              hint_heat: "使用适当的热传递方程",
              hint_specific: "使用 Q = mcΔT，其中c是比热容",
              hint_phase: "使用 Q = mL，其中L是潜热"
          },
          scenarios: {
              conduction: "诺华热反应器：热量通过巴塞尔制药设施的金属反应器壁传导。热导率决定热传递速率。",
              convection: "莱茵河冷却：莱茵河中的对流传递巴塞尔工业设施的热量。水循环提供高效冷却。",
              radiation: "巴塞尔太阳能加热：太阳的热辐射加热巴塞尔的建筑物。斯特藩-玻尔兹曼定律描述辐射热传递。",
              water_heating: "巴塞尔区域供暖：巴塞尔的区域供暖系统利用水的比热容在整个城市高效输送热能。",
              melting: "莱茵河融冰：从冰到水的相变需要潜热。在0°C融化时温度保持恒定。",
              boiling: "巴塞尔蒸汽生成：在100°C将水煮沸成蒸汽需要汽化潜热。蒸汽比热水携带更多能量。"
          },
          feedback: {
              correct: "热力学掌握了！",
              incorrect: "复习热传递原理。"
          }
      },
  sp2_02: {
          back: "返回枢纽",
          title: "SP2.02 // 电路沙盒 2.0",
          difficulty: {
              basic: "基础",
              core: "核心",
              advanced: "进阶",
              elite: "精英"
          },
          objective_title: "当前任务目标",
          target_title: "电路分析",
          next: "执行下一序列",
          check: "验证",
          correct: "已验证",
          incorrect: "匹配失败",
          ready: "就绪",
          monitor_title: "SP2.02_电路监视器",
          footer_left: "SP2.02_电路沙盒 // 节点：巴塞尔",
          labels: {
              multimeter: "万用表",
              oscilloscope: "示波器",
              resistance: "电阻",
              capacitance: "电容",
              inductance: "电感",
              voltage: "电压",
              analysis: "电路分析",
              damping: "阻尼类型",
              formulas: "RLC 公式",
              reset: "重置"
          },
          canvas_labels: {
              voltage_time: "V(t)",
              zero_volts: "0V"
          },
          multimeter_messages: {
              select_points: "选择 2 个点",
              invalid_selection: "无效选择"
          },
          damping_types: {
              overdamped: "过阻尼",
              underdamped: "欠阻尼",
              critically_damped: "临界阻尼"
          },
          mission: {
              title: "任务：RLC 瞬态分析",
              description: "构建和分析 RLC 电路。使用万用表测量电压和电流。在示波器上观察瞬态响应。"
          },
          stages: {
              build: "构建电路",
              measure: "测量数值",
              analyze: "分析响应",
              build_desc: "连接电阻、电容和电感",
              measure_desc: "使用万用表测量电压和电流",
              analyze_desc: "观察示波器波形",
              build_hint: "点击组件以选择它们",
              measure_hint: "选择 2 个点以测量电压降",
              analyze_hint: "观察过阻尼、欠阻尼或临界阻尼响应"
          }
      },
  sp2_03: {
              back: "返回枢纽",
              title: "SP2.03 // MOTOR LAB",
              difficulty: {
                  basic: "基础",
                  core: "核心",
                  advanced: "进阶",
                  elite: "精英"
              },
              objective_title: "当前任务目标",
              target_title: "Motor Assembly",
              next: "执行下一序列",
              check: "验证",
              correct: "已验证",
              incorrect: "不匹配",
              ready: "就绪",
              monitor_title: "SP2.03_MOTOR_MONITOR",
              footer_left: "SP2.03_MOTOR_LAB // NODE: BASEL",
              labels: {
                  input: "输入",
                  hints: "提示",
                  current: "CURRENT SWITCH",
                  current_on: "SWITCH ON",
                  current_off: "SWITCH OFF",
                  polarity: "MAGNET POLARITY",
                  direction: "ROTATION DIRECTION",
                  direction_cw: "CLOCKWISE",
                  direction_ccw: "COUNTER-CLOCKWISE",
                  direction_stop: "STOPPED",
                  speed: "ROTATION SPEED",
                  readout: "READOUT"
              },
              mission: {
                  title: "MISSION: BASEL MOTOR WORKSHOP",
                  description: "Assemble a DC motor. Control magnetic polarity and current to drive rotation."
              },
              stages: {
                  assemble: "ASSEMBLE",
                  power: "POWER",
                  reverse: "REVERSE",
                  assemble_desc: "Place magnets and coil",
                  power_desc: "Close the circuit and observe rotation",
                  reverse_desc: "Swap poles to reverse direction",
                  assemble_hint: "Start with the switch open and align the magnets",
                  power_hint: "Close the circuit to energize the coil",
                  reverse_hint: "Swap N/S to reverse rotation"
              }
          },
  sp3_02: {
          back: "返回枢纽",
          title: "P3.02 // 波动光学",
          difficulty: {
              basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
          },
          objective_title: "当前任务目标",
          target_title: "波动特性",
          next: "执行下一序列",
          check: "验证",
          correct: "已验证",
          incorrect: "不匹配",
          ready: "就绪",
          monitor_title: "P3.02_光学监视器",
          footer_left: "P3.02_波动光学 // 节点：巴塞尔",
          labels: {
              input: "输入",
              hints: "提示",
              wavelength: "波长 (λ)",
              slit_separation: "缝间距 (d)",
              slit_width: "缝宽 (a)",
              angle: "角度 (θ)",
              intensity: "光强 (I)",
              order: "阶数 (m)"
          },
          mission: {
              title: "光学共振实验室",
              description: "诺华光学实验室涉及波动特性。掌握干涉、衍射和偏振。"
          },
          stages: {
              interference: "干涉",
              diffraction: "衍射",
              polarization: "偏振",
              interference_prompt_latex: "\\text{使用双缝公式计算角度 }\\theta\\text{。}",
              diffraction_prompt_latex: "\\text{使用单缝公式计算角度 }\\theta\\text{。}",
              polarization_prompt_latex: "\\text{使用马吕斯定律计算光强 }I\\text{。}"
          },
          formulas: {
              interference: "d \\sin \\theta = m \\lambda",
              diffraction: "a \\sin \\theta = m \\lambda",
              polarization: "I = I_0 \\cos^2 \\theta"
          },
          input_tip_2dp: "提示：保留 2 位小数。"
      },
  sp4_01: {
          back: "返回枢纽",
          title: "SP3.03 // 波动基础",
          difficulty: {
              basic: "基础",
              core: "核心",
              advanced: "进阶",
              elite: "精英"
          },
          objective_title: "当前任务目标",
          target_title: "波动参数",
          next: "执行下一序列",
          check: "验证",
          correct: "已验证",
          incorrect: "匹配失败",
          ready: "就绪",
          monitor_title: "SP3.03_波动监视器",
          footer_left: "SP3.03_波动基础 // 节点：莱茵河",
          labels: {
              wave_type: "波动类型",
              transverse: "横波",
              longitudinal: "纵波",
              amplitude: "振幅",
              frequency: "频率",
              wave_speed: "波速",
              wavelength: "波长",
              period: "周期",
              angular_freq: "角频率",
              calculated: "计算值",
              show_particles: "显示粒子运动",
              formulas: "公式"
          },
          mission: {
              title: "任务：莱茵河波动分析",
              description: "研究莱茵河上的机械波。掌握波动参数：振幅、频率、波长和周期。"
          },
          stages: {
              transverse: "横波",
              longitudinal: "纵波",
              parameters: "波动参数",
              transverse_desc: "观察垂直粒子运动",
              longitudinal_desc: "研究压缩和稀疏",
              parameters_desc: "计算波长、周期和速度",
              transverse_hint: "粒子垂直于波传播方向振动",
              longitudinal_hint: "粒子平行于波传播方向振动",
              parameters_hint: "v = λf, T = 1/f, ω = 2πf"
          }
      },
  sp3_04: {
      back: "返回枢纽",
      title: "SP3.04 // 温度与热量",
      difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
      objective_title: "当前任务目标",
      monitor_title: "热力分析监视器",
      footer_left: "SP3.04_温度热量 // 节点：巴塞尔",
      check: "验证",
      next: "下一挑战",
      correct: "正确",
      incorrect: "错误",
      stages: {
          temperature: "温度标度",
          heat_transfer: "热量传递",
          thermal_equilibrium: "热平衡"
      },
      scenarios: {
          temperature: "巴塞尔气象站 - 温度测量：你在巴塞尔气象研究所工作，科学家们使用不同的温标监测温度。温度是分子平均动能的度量 - 分子运动越快，温度越高。开尔文温标是物理学中使用的绝对温标，其中0 K（绝对零度）代表理论上所有分子运动停止的点。摄氏温标在日常生活中更常用，水在标准大气压下0°C结冰，100°C沸腾。温标之间的转换很简单：T(K) = T(°C) + 273.15（为简化我们使用273）。例如，室温约为20°C或293 K。巴塞尔的冬季温度可降至-5°C（268 K），而夏季可达30°C（303 K）。理解温标是所有热物理计算的基础。你的任务是在摄氏度和开尔文之间转换，并理解绝对零度的概念 - 宇宙中可能的最低温度，在这个温度下甚至原子也几乎静止不动。",
          heat_transfer: "诺华制药实验室 - 热分析：你在诺华巴塞尔的热分析实验室工作，科学家们研究不同材料如何吸收和传递热量。热量（Q）是不同温度物体之间热能的传递，以焦耳（J）为单位测量。改变物体温度所需的热量取决于三个因素：质量（m）、比热容（c）和温度变化（ΔT），由方程Q = mcΔT关联。比热容是将1 kg物质升高1 K所需的能量。水具有非常高的比热容（4200 J/(kg·K)），这就是为什么它非常适合冷却系统，以及为什么沿海地区气候温和。铝的c = 900 J/(kg·K)，铁的c = 450 J/(kg·K)。不同材料传导热量的速率也不同 - 像铜这样的金属快速传导热量（适合做锅），而木材、塑料和空气等材料是不良导体（良好的绝缘体，用于保温或隔热）。这些知识对于设计能够为敏感药物保持精确温度的药品储存系统至关重要。你的任务是使用Q = mcΔT计算热传递，并理解不同材料的热导率。",
          thermal_equilibrium: "巴塞尔大学医院 - 热疗实验室：你在巴塞尔大学医院热疗部门协助Fischer博士，那里使用受控加热和冷却进行医疗治疗。热平衡是两个接触物体达到相同温度且它们之间没有净热流的状态。热量总是自发地从热物体流向冷物体，直到达到平衡 - 这是热力学第二定律。混合两种不同温度的物质时，最终平衡温度可以使用能量守恒计算：热物质失去的热量等于冷物质获得的热量（Q_失 = Q_得）。对于相同物质的等质量，最终温度就是平均值。例如，将1 kg 80°C的水与1 kg 20°C的水混合，最终温度为50°C。对于不等质量，最终温度偏向较大质量。在相变期间（如冰融化或水沸腾），即使正在加热，温度也保持恒定 - 这些能量用于打破分子键而不是增加动能。理解热平衡对于医疗应用至关重要，如低温治疗、发烧管理和肿瘤热消融。你的任务是计算平衡温度并理解热流方向。"
      }
  },
  gp2_01: {
      back: "返回枢纽",
      title: "GP2.01 // 气体定律",
      difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
      objective_title: "当前任务目标",
      monitor_title: "气体定律监视器",
      footer_left: "GP2.01_气体定律 // 节点：巴塞尔",
      check: "验证",
      next: "下一定律",
      correct: "正确",
      incorrect: "错误",
      stages: {
          ideal_gas: "理想气体定律",
          boyles_law: "波义耳定律",
          charles_law: "查理定律"
      },
      scenarios: {
          ideal_gas: "诺华化学工程 - 气体储存系统：你在诺华巴塞尔化学工程部门工作，为制药生产设计加压气体储存系统。理想气体定律（PV = nRT）是关联压强（P）、体积（V）、物质的量（n）、温度（T）和通用气体常数（R = 8.314 J/(mol·K)）的基本方程。该方程假设气体表现理想 - 分子体积可忽略且无分子间作用力。虽然真实气体在高压和低温下偏离理想行为，但理想气体定律为大多数工业条件提供了极好的近似。例如，在标准温度和压强（STP：273 K，101325 Pa）下，任何理想气体的一摩尔占据22.4升 - 这是摩尔体积。理解PV = nRT使工程师能够计算储罐中可以安全储存多少气体，预测加热或冷却期间的压强变化，并设计安全泄压阀。在诺华，精确的气体计算对于药物合成中涉及氢气、氮气、氧气和二氧化碳的反应至关重要。你的任务是使用PV = nRT求解未知变量并理解气体性质之间的关系。",
          boyles_law: "巴塞尔潜水中心 - 压强与体积：你在巴塞尔潜水中心训练，学习水下气体行为。波义耳定律指出，在恒定温度下，气体的压强和体积成反比：P₁V₁ = P₂V₂。这意味着如果你使压强加倍，体积减半；如果你使压强增加三倍，体积变为三分之一。这个定律对潜水安全至关重要。200巴压强的潜水气瓶在小型10升气瓶中包含压缩空气。当在1巴（大气压）下释放时，这会膨胀到2000升可呼吸空气。当潜水员下潜时，水压增加（大约每10米深度1巴），压缩他们肺部和设备中的空气。在30米深度（4巴压强），一肺空气仅占其表面体积的1/4。这就是为什么潜水员在上升时绝不能屏住呼吸 - 膨胀的空气可能会撕裂他们的肺部。波义耳定律还解释了为什么碳酸饮料中的气泡在你打开瓶子时膨胀（压强降低）。你的任务是计算压强-体积关系并理解等温（恒温）气体过程。",
          charles_law: "巴塞尔热气球节 - 温度与体积：你参加一年一度的巴塞尔热气球节，飞行员使用查理定律控制气球高度。查理定律指出，在恒定压强下，气体的体积与其绝对温度成正比：V₁/T₁ = V₂/T₂。这意味着如果你使绝对温度（开尔文）加倍，体积加倍。热气球通过用丙烷燃烧器加热气球内的空气来工作。当温度从20°C（293 K）升高到80°C（353 K）时，空气膨胀约20%，变得比周围的冷空气密度小。这种密度差产生浮力，提升气球。飞行员通过调节燃烧器强度来控制高度 - 更多热量意味着更多膨胀和更快上升。查理定律还解释了为什么汽车轮胎在炎热的夏天压强更高（内部空气膨胀）以及为什么气象气球在上升到更冷、更低压的大气层时膨胀。关键：在气体定律计算中始终使用绝对温度（开尔文） - 摄氏温度会给出错误结果，因为气体定律关系基于绝对零度（0 K = -273°C），在那里所有分子运动理论上停止。你的任务是计算温度-体积关系并理解等压（恒压）过程。"
      }
  },
  gp2_02: {
      back: "返回枢纽",
      title: "GP2.02 // 热力学第一定律",
      difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
      objective_title: "当前任务目标",
      monitor_title: "热力学监视器",
      footer_left: "GP2.02_热力学第一定律 // 节点：巴塞尔",
      check: "验证",
      next: "下一过程",
      correct: "正确",
      incorrect: "错误",
      stages: {
          first_law: "第一定律",
          internal_energy: "内能",
          work_heat: "功与热"
      },
      scenarios: {
          first_law: "CERN粒子加速器 - 能量守恒：你在日内瓦附近的CERN工作，分析粒子碰撞实验中的能量转换。热力学第一定律是能量守恒原理应用于热系统：ΔU = Q - W，其中ΔU是内能变化，Q是加入系统的热量，W是系统对外做的功。这个基本定律指出能量不能被创造或毁灭，只能从一种形式转换为另一种形式。当你向气体加热Q时，一部分能量增加内能（温度升高），而其余部分转换为机械功W（气体膨胀并推动活塞）。例如，如果你加入100 J热量，气体做30 J功，内能增加70 J。符号约定至关重要：当热量流入系统时Q为正，流出时为负。当系统做功（膨胀）时W为正，对系统做功（压缩）时为负。在绝热过程中（Q = 0，无热传递），所有功来自或进入内能：ΔU = -W。在等温过程中（恒温，ΔU = 0），所有热量转换为功：Q = W。理解第一定律对于分析发动机、冰箱和任何将热转换为功或反之的设备至关重要。在CERN，这个原理支配着粒子束如何从电磁场获得能量。你的任务是应用ΔU = Q - W计算各种热力学过程中的能量变化。",
          internal_energy: "巴塞尔大学物理实验室 - 分子动能：你在巴塞尔大学热物理实验室进行实验，测量不同温度下气体的内能。内能（U）是物质中所有分子的总动能和势能。对于理想气体，没有分子间势能（分子不相互作用），因此内能纯粹是分子运动的动能。对于单原子理想气体（如氦或氩），U = (3/2)nRT，其中n是摩尔数，R是气体常数（8.314 J/(mol·K)），T是绝对温度。因子3/2来自三个平动自由度（x、y、z方向的运动）。对于双原子气体（如O₂、N₂），分子还可以旋转，给出U = (5/2)nRT。关键见解是理想气体的内能仅取决于温度 - 它不依赖于压强或体积。这意味着如果你使绝对温度加倍，内能加倍。如果你等温压缩气体（恒温），即使压强和体积改变，内能也不变。这就是为什么等温过程ΔU = 0。在恒容加热（等容过程）期间，所有加入的热量都进入内能：Q = ΔU。在恒压加热（等压过程）期间，一些热量增加内能，而一些做膨胀功：Q = ΔU + W。理解内能对于计算热容、预测温度变化和分析热系统的能量效率至关重要。你的任务是使用U = (3/2)nRT计算内能并理解U如何随温度变化。",
          work_heat: "罗氏制药生产 - 过程优化：你在罗氏巴塞尔制药生产设施工作，优化药物合成反应器的热力学过程。功和热是能量可以跨越系统边界传递的两种方式。功（W）是通过机械手段的有组织能量传递 - 当气体对抗外部压强膨胀时，它做功W = PΔV（对于恒压过程）。热（Q）是由于温度差异的无组织能量传递 - 能量自发地从热到冷流动。不同的热力学过程具有特征性的功-热关系。在等压过程（恒压）中，功是W = PΔV，气体在膨胀期间做最大功。在等容过程（恒容）中，ΔV = 0所以W = 0 - 不做功，所有热量都进入内能。在等温过程（恒温）中，ΔU = 0，所以Q = W - 所有热量转换为功（或反之）。在绝热过程（无热传递，Q = 0）中，功完全来自内能：W = -ΔU。压缩加热气体（ΔU > 0），膨胀冷却气体（ΔU < 0）。对于循环过程（系统返回初始状态），整个循环ΔU = 0，因此净热等于净功：Q_净 = W_净。这是热机背后的原理。在罗氏，理解这些过程对于控制反应温度、优化能源效率和确保产品质量至关重要。放热反应释放热量（Q < 0），必须移除以防止过热。吸热反应吸收热量（Q > 0），需要外部加热。你的任务是计算不同过程的功和热，并通过第一定律理解它们之间的关系。"
      }
  },
  gp2_03: {
      back: "返回枢纽",
      title: "GP2.03 // 热机",
      difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
      objective_title: "当前任务目标",
      monitor_title: "热机监视器",
      footer_left: "GP2.03_热机 // 节点：巴塞尔",
      check: "验证",
      next: "下一循环",
      correct: "正确",
      incorrect: "错误",
      stages: {
          efficiency: "效率",
          carnot_cycle: "卡诺循环",
          heat_flow: "热流"
      },
      scenarios: {
          efficiency: "ABB发电 - 涡轮效率分析：你在巴登（巴塞尔附近）的ABB发电部门工作，分析用于发电的蒸汽涡轮机的效率。热机是通过循环过程将热能（热量）转换为机械功的任何装置。效率（η）是有用功输出与热量输入的比率：η = W/Q_h，其中W是做的功，Q_h是从热源吸收的热量。例如，如果涡轮机从燃烧燃料中吸收1000 J热量并产生300 J机械功，其效率为η = 300/1000 = 0.3 = 30%。这意味着70%的输入能量作为热量（Q_c = 700 J）浪费并排放到环境中。真实发动机总是η < 1（小于100%），因为必须排出一些能量作为废热以满足热力学第二定律 - 你不能将所有热量转换为功。现代燃煤电厂达到η ≈ 40%，汽油汽车发动机η ≈ 25%，柴油发动机η ≈ 35%。剩余能量加热冷却水、废气和周围环境。能量守恒要求Q_h = W + Q_c：所有输入热量要么变成功要么变成废热。在ABB，将涡轮效率提高哪怕1%就能节省数百万燃料成本并显著减少CO₂排放。工程师优化叶片设计、蒸汽压力和温度以最大化效率。你的任务是使用η = W/Q_h和能量守恒计算发动机效率、功输出和废热。",
          carnot_cycle: "苏黎世联邦理工学院热力学实验室 - 卡诺极限：你在苏黎世联邦理工学院热力学实验室进行研究，研究热机的理论最大效率。卡诺循环是一个理想化的热力学循环，由四个可逆过程组成：(1) 在高温T_h下等温膨胀（吸收热量Q_h），(2) 绝热膨胀（温度从T_h降至T_c），(3) 在低温T_c下等温压缩（排出热量Q_c），(4) 绝热压缩（温度回升至T_h）。卡诺效率为η_C = 1 - T_c/T_h，其中温度必须用开尔文表示。这代表在这两个温度之间运行的任何热机的最大可能效率 - 没有真实发动机能超过这个极限。例如，T_h = 600 K（热源）和T_c = 300 K（冷源），η_C = 1 - 300/600 = 0.5 = 50%。这意味着即使是完美的、无摩擦的发动机在这些温度之间运行时也只能将50%的热量转换为功。卡诺效率揭示了一个深刻的真理：效率仅取决于温度比，而不取决于工作物质（气体、蒸汽等）或发动机设计。要提高效率，你必须增加T_h（更热的燃烧）或降低T_c（更冷的冷却）。这就是为什么发电厂使用过热蒸汽（T_h ≈ 800 K）和冷却塔（T_c ≈ 300 K）。卡诺循环是可逆的 - 反向运行它会产生冰箱或热泵。真实发动机（奥托、柴油、朗肯循环）由于摩擦、热损失和有限时间过程等不可逆性而具有低于卡诺的效率。你的任务是计算卡诺效率并理解为什么它代表一个不可打破的上限。",
          heat_flow: "巴塞尔区域供热系统 - 能量流分析：你为IWB（巴塞尔工业工厂）工作，这是管理巴塞尔区域供热网络的公用事业公司，为数千家庭和企业提供热量。理解发动机和热泵中的热流对于优化能源分配至关重要。在热机中，热量从热源（T_h）通过发动机流向冷源（T_c），其中一些能量被提取为功：Q_h → W + Q_c。能量守恒要求Q_h = W + Q_c。对于卡诺发动机，热量比等于温度比：Q_c/Q_h = T_c/T_h。这意味着如果T_c = 300 K和T_h = 600 K，那么Q_c/Q_h = 0.5，所以一半的输入热量作为废物排出。功输出为W = Q_h - Q_c = Q_h(1 - T_c/T_h) = Q_h × η_C。在巴塞尔的热电联产厂中，发电产生的废热（Q_c）并非真正浪费 - 它被捕获并通过绝缘管道分配用于建筑供暖。这种热电联产（CHP）系统通过利用W和Q_c实现80-90%的总体效率。热泵反向工作：它们使用功W将热量Q_c从寒冷的室外空气转移到温暖的建筑物中（Q_h = Q_c + W）。供暖的性能系数（COP）为COP = Q_h/W，可以超过3（300%效率！），因为你在移动热量，而不是创造热量。例如，W = 100 J和Q_c = 400 J，热泵提供Q_h = 500 J的供暖。理解这些能量流帮助IWB优化区域供热网络，减少化石燃料消耗，并降低巴塞尔的碳足迹。你的任务是计算热流、功，并理解发动机和热泵中的能量守恒。"
      }
  },
};
