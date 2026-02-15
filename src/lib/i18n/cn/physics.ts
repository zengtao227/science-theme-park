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
          }
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
};
