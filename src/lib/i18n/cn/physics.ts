/**
 * CN - PHYSICS translations
 * COMPLETE VERSION - Reorganized from Git history assets.
 * Aligning with Basel Sek 3 (SP3.01 - SP3.08) while preserving all legacy global modules.
 */

export const cnPhysics = {
    // --- 全球物理模块 (保留自原始 GP 系列) ---
    gp1_01: {
        back: "返回枢纽",
        title: "GP1.01 // 原子核核心",
        difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
        objective_title: "当前任务目标",
        target_title: "同位素 / 衰变",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "GP1.01_原子核监视器",
        footer_left: "GP1.01_现代物理 // 节点：巴塞尔",
        labels: {
            input: "输入参数",
            hints: "提示",
            balancing: "核反应方程式",
            mass: "质量数 (A)",
            atomic: "原子序数 (Z)"
        },
        mission: {
            title: "稳定原子核",
            description: "探索原子核的稳定性。了解结合能以及各种同位素的衰变模式。"
        },
        stages: {
            alpha: "α 衰变",
            beta: "β 衰变",
            gamma: "γ 放射",
            fission: "核裂变"
        }
    },
    gp1_02: {
        back: "返回 Nexus",
        title: "GP5.02 // 相对论实验室",
        difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
        objective_title: "当前任务目标",
        target_title: "相对论效应",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "GP5.02_相对论监视器",
        footer_left: "GP5.02_狭义相对论 // 节点：CERN",
        labels: {
            velocity: "速度 (v/c)",
            lorentz_factor: "洛伦兹因子 (γ)",
            time_dilation: "时间膨胀",
            length_contraction: "长度收缩",
            formulas: "公式"
        },
        mission: {
            title: "任务：狭义相对论",
            description: "在 CERN 探索爱因斯坦的狭义相对论。观察接近光速时的时间膨胀和长度收缩效应。"
        },
        stages: {
            lorentz: "洛伦兹因子",
            contraction: "长度收缩",
            dilation: "时间膨胀"
        }
    },
    gp1_03: {
        back: "返回枢纽",
        title: "GP5.03 // 粒子对撞机",
        difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
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
            description: "在 CERN 的大型强子对撞机探索粒子碰撞。寻找希格斯玻色子。"
        },
        stages: {
            acceleration: "加速",
            collision: "对撞",
            detection: "探测",
            acceleration_desc: "将质子加速到接近光速",
            collision_desc: "在 13 TeV 能级下进行质子束对撞",
            detection_desc: "探测粒子喷注和运动径迹",
            acceleration_hint: "质子速度可达光速的 99.9999991%",
            collision_hint: "对撞能量：13 TeV = 13,000 GeV",
            detection_hint: "强磁场会使带电粒子的径迹发生弯曲"
        }
    },
    gp1_04: {
        back: "返回 Nexus",
        title: "GP1.04 // 量子隧道",
        difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
        objective_title: "当前任务目标",
        target_title: "波函数",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "GP1.04_量子监控",
        footer_left: "GP1.04_量子隧道 // 节点：CERN",
        labels: {
            particle_energy: "粒子能量 (E)",
            barrier_height: "势垒高度 (V₀)",
            barrier_width: "势垒宽度 (a)",
            transmission: "透射系数",
            wave_function: "波函数",
            probability_density: "概率密度 |ψ|²",
            incident: "入射",
            reflected: "反射",
            transmitted: "透射",
            formulas: "公式"
        },
        mission: {
            title: "任务：量子隧道效应",
            description: "探索粒子如何穿透势垒。观察波函数在量子尺度下的奇特行为。"
        },
        stages: {
            classical: "经典极限",
            tunneling: "量子隧道",
            resonance: "共振态"
        }
    },

    // --- 巴塞尔 Sek 3 系列 (对应的 SP3 键位映射) ---

    // SP3.01: 测量与单位 (映射自原 sp1_01)
    sp3_01: {
        back: "返回枢纽",
        title: "SP3.01 // 测量与单位",
        check: "验证",
        next: "下一步",
        correct: "测量验证成功",
        incorrect: "测量误差超限",
        ready: "就绪",
        monitor_title: "SP3.01_测量实验室",
        footer_left: "SP3.01_测量 // 节点：巴塞尔",
        objective_title: "测量科学任务",
        difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
        stages: { si_units: "SI 单位", conversion: "单位换算", precision: "测量精度" },
        tools: { ruler: "直尺", scale: "天平", timer: "计时器" },
        labels: { precision: "测量精度", measurement_display: "数据数值显示", input_terminal: "终端输入 [测量节点]" },
        prompts: {
            si_unit: "{measurement} 的 SI 国际标准单位是什么？",
            convert: "将 {value} {from} 转换为 {to}",
            sigfigs: "数值 {value} 有几位有效数字？",
            hint_si: "对应的 SI 单位是 {name}",
            hint_factor: "转换系数为 {factor}",
            hint_sigfigs: "计算所有非零数字以及位于中间的零"
        },
        scenarios: {
            lab_pharma: "诺华制药实验室：在巴塞尔的制药研发中，质量测量的准确性至关重要。哪怕是毫克的误差也会导致整个化学反应失败。",
            basel_watch: "瑞士制造精度：巴塞尔的奢侈钟表制造业要求达到微米级的测量标准。精度是瑞士工业的灵魂。"
        },
        feedback: { correct: "测量精度已确认。", incorrect: "检测到校准偏误。" }
    },

    // SP3.02: 力与运动 (映射自原 sp3_02)
    sp3_02: {
        back: "返回枢纽",
        title: "SP3.02 // 力与运动",
        difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
        objective_title: "动力学实时数据",
        next: "进入下一阶段",
        check: "受力分析",
        correct: "达到力学平衡",
        incorrect: "受力不匹配",
        monitor_title: "SP3.02_动力学监视器",
        footer_left: "SP3.02_力学 // 节点：巴塞尔",
        stages: {
            newton_1: "惯性定律",
            newton_2: "牛顿第二定律 (F=ma)",
            friction: "摩擦力分析"
        }
    },

    // SP3.03: 机械与能量 (映射自原 sp1_03)
    sp3_03: {
        back: "退出 Nexus",
        title: "SP3.03 // 能量与功",
        difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
        objective_title: "能量守恒目标",
        next: "下一转化序列",
        check: "计算焦耳值",
        correct: "能量守恒验证成功",
        incorrect: "检测到能量损耗",
        monitor_title: "SP3.03_能量中枢",
        footer_left: "SP3.03_力学 // 节点：巴塞尔",
        stages: { potential: "重力势能", kinetic: "动能", work: "功率输出" },
        scenarios: {
            rhein_hydro: "莱茵河水电站：巴塞尔电站利用莱茵河的水流将势能转化为源源不断的清洁电力。",
            tram_braking: "巴塞尔电车能量回收：BVB 电车在刹车时利用再生制动将动能回馈至城市电网。"
        }
    },

    // SP3.04: 流体与压力 (映射自原 sp1_07)
    sp3_04: {
        back: "返回枢纽",
        title: "SP3.04 // 压力与流体",
        difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
        next: "执行下一步骤",
        check: "验证数据",
        correct: "计算正确",
        incorrect: "参数失配",
        ready: "就绪",
        monitor_title: "SP3.04_流体监控站",
        footer_left: "SP3.04_流体力学 // 节点：莱茵河",
        objective_title: "当前任务目标",
        stages: { pressure: "压强", buoyancy: "浮力", hydraulics: "液压传动" },
        prompts: {
            pressure_depth: "潜水员在莱茵河潜入 {depth} 米深处。计算总压强。",
            buoyant_force: "一个体积为 {volume} m³ 的物体没入莱茵河中。计算其受到的浮力。",
            hint_pressure: "使用公式：P = P₀ + ρgh",
            hint_archimedes: "利用阿基米德原理：F_b = ρ_water × V × g"
        },
        scenarios: {
            rhine_swimming: "莱茵河游泳：在巴塞尔中桥附近潜水。水的压强随深度线性增加，影响潜水设备的安全系数。",
            rhine_boat: "莱茵河货运：了解浮力对于在巴塞尔与鹿特丹之间航行的驳船载重计算至关重要。"
        },
        feedback: { correct: "流体力学原理应用正确！", incorrect: "请重新核查阿基米德原理。" }
    },

    // SP3.05: 简单机械 (映射自原 sp1_04 - 完整背景版)
    sp3_05: {
        back: "返回 Nexus",
        title: "SP3.05 // 简单机械",
        difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
        next: "开始下一挑战",
        check: "验证机械效率",
        correct: "机械优势计算正确",
        incorrect: "数值不匹配",
        ready: "就绪",
        monitor_title: "SP3.05_简单机械监控",
        footer_left: "SP3.05_简单机械 // 节点：巴塞尔",
        objective_title: "力学优化任务",
        stages: {
            levers: "杠杆原理",
            pulleys: "滑轮组",
            inclined_planes: "斜面机构"
        },
        labels: {
            machine_display: "机械结构显示",
            input_terminal: "输入终端",
            force_ratio: "机械优势 (MA)",
            show_forces: "显示受力矢量",
            mechanics_score: "力学评分"
        },
        prompts: {
            lever: "一个杠杆需举起 {load} N 的负载。如果动力臂为 {effortArm} m，阻力臂为 {loadArm} m，需要多大的动力？",
            pulley: "一个滑轮组用 {strands} 根绳子支撑 {load} N 的负载。需要多大的动力？",
            inclined_plane: "一个斜面将 {load} N 负载提升到 {height} m 高度，斜面长度为 {length} m。需要多少动力？",
            hint_lever: "MA = 动力臂 / 阻力臂，动力 = 负载 / MA",
            hint_pulley: "MA = 绳子段数，动力 = 负载 / MA",
            hint_inclined: "MA = 长度 / 高度，动力 = 负载 / MA"
        },
        scenarios: {
            basel_construction: "巴塞尔建筑工地：在巴塞尔罗氏塔 (Roche Tower) 的施工现场，工人们利用杠杆和滑轮组高效移动重物。",
            lever_crowbar: "古建修复中的撬棍：修复巴塞尔的历史建筑需要精准应用杠杆原理来移动沉重的石块。",
            pulley_crane: "港口起重机滑轮：巴塞尔港口的塔吊利用多重滑轮来举起运送往欧洲各地的钢材。",
            ramp_loading: "莱茵河货运装载：港口工人使用斜面将货物装入驳船。斜面越长，所需的推力就越小。",
            compound_machine: "复合机械：真实的巴塞尔大型机械结合了多种简单机械原理，以实现巨大的负荷提升能力。"
        },
        feedback: {
            correct: "机械优势计算无误！",
            incorrect: "请检查你的力矩平衡或绳子段数计算。"
        }
    },

    // SP3.07: 导航与矢量 - 莱茵河渡轮 (60题：3阶段 × 4难度 × 5题)
    sp3_07: {
        back: "返回枢纽",
        title: "SP3.07 // 导航与矢量",
        difficulty: {
            basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
        },
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "不匹配",
        ready: "就绪",
        monitor_title: "SP3.07_渡轮监视器",
        footer_left: "SP3.07_莱茵河渡轮 // 节点：巴塞尔",
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
            angle: "角度",
            mission_objective: "任务目标",
            terminal_input: "终端输入",
            hint: "提示",
            next_mission: "下一任务"
        },
        mission: {
            title: "莱茵河横渡任务",
            description: "驾驶巴塞尔莱茵河渡轮横渡莱茵河。掌握矢量合成，利用缆索角度和渡轮速度补偿河流流速。"
        },
        prompts: {
            c_b1: "\\text{渡轮：}2\\text{ m/s 向北，河流：}1\\text{ m/s 向北。合速度？}",
            c_b2: "\\text{渡轮：}1.5\\text{ m/s 向南，河流：}1.5\\text{ m/s 向北。合速度？}",
            c_b3: "\\text{渡轮：}3\\text{ m/s 向北，河流：}0.5\\text{ m/s 向北。合速度？}",
            c_b4: "\\text{渡轮：}3\\text{ m/s 向南，河流：}2\\text{ m/s 向北。合速度？}",
            c_b5: "\\text{渡轮：}4\\text{ m/s 向北，河流：}1\\text{ m/s 向北。合速度？}",
            c_c1: "\\text{渡轮：}4\\text{ m/s 向东，河流：}3\\text{ m/s 向北（垂直）。合速度？}",
            c_c2: "\\text{渡轮：}1\\text{ m/s 向东，河流：}1\\text{ m/s 向北。合速度？}",
            c_c3: "\\text{渡轮：}2\\text{ m/s 向东，河流：}2\\text{ m/s 向北。合速度？}",
            c_c4: "\\text{渡轮：}2\\text{ m/s 向东，河流：}1.5\\text{ m/s 向北。合速度？}",
            c_c5: "\\text{渡轮：}12\\text{ m/s 向东，河流：}5\\text{ m/s 向北。合速度？}",
            c_a1: "\\text{渡轮：}4\\text{ m/s，角度 }60^\\circ\\text{。求水平分量。}",
            c_a2: "\\text{渡轮：}2\\text{ m/s，角度 }30^\\circ\\text{，河流：}1\\text{ m/s 向北。合垂直分量？}",
            c_a3: "\\text{渡轮：}3\\text{ m/s，角度 }45^\\circ\\text{。求水平分量。}",
            c_a4: "\\text{渡轮：}6\\text{ m/s，角度 }30^\\circ\\text{，河流：}2\\text{ m/s 向北。合垂直分量？}",
            c_a5: "\\text{渡轮：}4\\text{ m/s，角度 }60^\\circ\\text{，河流：}1\\text{ m/s 向北。合垂直分量？}",
            c_e1: "\\text{渡轮：}5\\text{ m/s，角度 }53^\\circ\\text{，河流：}2\\text{ m/s 向北。合速度大小？}",
            c_e2: "\\text{渡轮：}4\\text{ m/s，角度 }37^\\circ\\text{，河流：}1.5\\text{ m/s 向北。合速度大小？}",
            c_e3: "\\text{渡轮：}8\\text{ m/s，角度 }45^\\circ\\text{，河流：}3\\text{ m/s 向北。合速度角度？}",
            c_e4: "\\text{渡轮：}6\\text{ m/s，角度 }60^\\circ\\text{，河流：}2.5\\text{ m/s 向北。合速度大小？}",
            c_e5: "\\text{渡轮：}5\\text{ m/s，角度 }30^\\circ\\text{，河流：}1\\text{ m/s 向北。合速度角度？}",
            d_b1: "\\text{河流：}1\\text{ m/s，渡轮：}2\\text{ m/s。零偏航角度？}",
            d_b2: "\\text{河流：}1.5\\text{ m/s，渡轮：}3\\text{ m/s。零偏航角度？}",
            d_b3: "\\text{河流：}2\\text{ m/s，渡轮：}4\\text{ m/s。零偏航角度？}",
            d_b4: "\\text{河流：}0.5\\text{ m/s，渡轮：}1\\text{ m/s。零偏航角度？}",
            d_b5: "\\text{河流：}3\\text{ m/s，渡轮：}6\\text{ m/s。零偏航角度？}",
            d_c1: "\\text{河流：}1\\text{ m/s，渡轮：}1.73\\text{ m/s。零偏航角度？}",
            d_c2: "\\text{河流：}2\\text{ m/s，渡轮：}2.83\\text{ m/s。零偏航角度？}",
            d_c3: "\\text{河流：}1.5\\text{ m/s，渡轮：}2.12\\text{ m/s。零偏航角度？}",
            d_c4: "\\text{河流：}3\\text{ m/s，渡轮：}5\\text{ m/s。零偏航角度？}",
            d_c5: "\\text{河流：}2.5\\text{ m/s，渡轮：}3.54\\text{ m/s。零偏航角度？}",
            d_a1: "\\text{河流：}1.2\\text{ m/s，渡轮：}2\\text{ m/s。零偏航角度？}",
            d_a2: "\\text{河流：}1.8\\text{ m/s，渡轮：}3.6\\text{ m/s。零偏航角度？}",
            d_a3: "\\text{河流：}2.4\\text{ m/s，渡轮：}4\\text{ m/s。零偏航角度？}",
            d_a4: "\\text{河流：}3.5\\text{ m/s，渡轮：}7\\text{ m/s。零偏航角度？}",
            d_a5: "\\text{河流：}1.6\\text{ m/s，渡轮：}3.2\\text{ m/s。零偏航角度？}",
            d_e1: "\\text{河流：}2.7\\text{ m/s，渡轮：}4.5\\text{ m/s。零偏航角度？}",
            d_e2: "\\text{河流：}3.2\\text{ m/s，渡轮：}6.4\\text{ m/s。零偏航角度？}",
            d_e3: "\\text{河流：}1.4\\text{ m/s，渡轮：}2.8\\text{ m/s。零偏航角度？}",
            d_e4: "\\text{河流：}2.1\\text{ m/s，渡轮：}4.2\\text{ m/s。零偏航角度？}",
            d_e5: "\\text{河流：}4\\text{ m/s，渡轮：}8\\text{ m/s。零偏航角度？}",
            n_b1: "\\text{横渡20m河流，速度}2\\text{ m/s垂直。时间？}",
            n_b2: "\\text{横渡30m河流，速度}3\\text{ m/s垂直。时间？}",
            n_b3: "\\text{横渡40m河流，速度}4\\text{ m/s垂直。时间？}",
            n_b4: "\\text{横渡25m河流，速度}5\\text{ m/s垂直。时间？}",
            n_b5: "\\text{横渡50m河流，速度}2.5\\text{ m/s垂直。时间？}",
            n_c1: "\\text{横渡20m河流，渡轮}2\\text{ m/s，角度}60^\\circ\\text{。时间？}",
            n_c2: "\\text{横渡30m河流，渡轮}3\\text{ m/s，角度}30^\\circ\\text{。时间？}",
            n_c3: "\\text{横渡40m河流，渡轮}4\\text{ m/s，角度}45^\\circ\\text{。时间？}",
            n_c4: "\\text{横渡25m河流，渡轮}2.5\\text{ m/s，角度}60^\\circ\\text{。时间？}",
            n_c5: "\\text{横渡50m河流，渡轮}5\\text{ m/s，角度}30^\\circ\\text{。时间？}",
            n_a1: "\\text{横渡20m河流，渡轮}2.4\\text{ m/s，角度}120^\\circ\\text{。时间？}",
            n_a2: "\\text{渡轮7.7s横渡，角度}120^\\circ\\text{，河流}1.5\\text{ m/s。偏航距离？}",
            n_a3: "\\text{横渡30m河流，渡轮}4\\text{ m/s，角度}120^\\circ\\text{。时间？}",
            n_a4: "\\text{横渡25m河流，渡轮}2\\text{ m/s，角度}135^\\circ\\text{。时间？}",
            n_a5: "\\text{横渡40m河流，渡轮}3.6\\text{ m/s，角度}120^\\circ\\text{，河流}1.8\\text{ m/s。偏航？}",
            n_e1: "\\text{渡轮}5\\text{ m/s，角度}120^\\circ\\text{，河流}2.5\\text{ m/s。合速度大小？}",
            n_e2: "\\text{横渡30m+返回，渡轮}4\\text{ m/s，角度}135^\\circ\\text{，河流}1.5\\text{ m/s。总时间？}",
            n_e3: "\\text{横渡40m，渡轮}6\\text{ m/s，角度}120^\\circ\\text{，河流}3\\text{ m/s。总路径长度？}",
            n_e4: "\\text{横渡30m，渡轮}5\\text{ m/s，角度}126.9^\\circ\\text{，河流}2\\text{ m/s。路径角度？}",
            n_e5: "\\text{渡轮质量1kg，}3\\text{ m/s，角度}110^\\circ\\text{，河流}1\\text{ m/s。动能？}",
        },
        hints: {
            c_b1: "\\text{相加速度：}2 + 1 = 3",
            c_b2: "\\text{反向抵消：}1.5 - 1.5 = 0",
            c_b3: "\\text{相加速度：}3 + 0.5 = 3.5",
            c_b4: "\\text{相减：}3 - 2 = 1",
            c_b5: "\\text{相加速度：}4 + 1 = 5",
            c_c1: "\\text{勾股定理：}\\sqrt{4^2 + 3^2} = 5",
            c_c2: "\\text{勾股定理：}\\sqrt{1^2 + 1^2} = \\sqrt{2} \\approx 1.41",
            c_c3: "\\text{勾股定理：}\\sqrt{2^2 + 2^2} = 2\\sqrt{2} \\approx 2.83",
            c_c4: "\\text{勾股定理：}\\sqrt{2^2 + 1.5^2} = 2.5",
            c_c5: "\\text{勾股定理：}\\sqrt{12^2 + 5^2} = 13",
            c_a1: "\\cos(60^\\circ) = 0.5, \\text{所以 }4 \\times 0.5 = 2",
            c_a2: "\\sin(30^\\circ) = 0.5, \\text{所以 }2 \\times 0.5 + 1 = 2",
            c_a3: "\\cos(45^\\circ) = 0.707, \\text{所以 }3 \\times 0.707 \\approx 2.12",
            c_a4: "\\sin(30^\\circ) = 0.5, \\text{所以 }6 \\times 0.5 + 2 = 5",
            c_a5: "\\sin(60^\\circ) = 0.866, \\text{所以 }4 \\times 0.866 + 1 \\approx 4.46",
            c_e1: "\\text{使用分量：}v_x = 5\\cos(53^\\circ), v_y = 5\\sin(53^\\circ) + 2",
            c_e2: "\\text{使用分量：}v_x = 4\\cos(37^\\circ), v_y = 4\\sin(37^\\circ) + 1.5",
            c_e3: "\\theta = \\arctan\\left(\\frac{8\\sin(45^\\circ) + 3}{8\\cos(45^\\circ)}\\right)",
            c_e4: "\\text{使用分量：}v_x = 6\\cos(60^\\circ), v_y = 6\\sin(60^\\circ) + 2.5",
            c_e5: "\\theta = \\arctan\\left(\\frac{5\\sin(30^\\circ) + 1}{5\\cos(30^\\circ)}\\right)",
            d_b1: "\\cos(\\theta) = -\\frac{1}{2} = -0.5 \\Rightarrow \\theta = 120^\\circ",
            d_b2: "\\cos(\\theta) = -\\frac{1.5}{3} = -0.5 \\Rightarrow \\theta = 120^\\circ",
            d_b3: "\\cos(\\theta) = -\\frac{2}{4} = -0.5 \\Rightarrow \\theta = 120^\\circ",
            d_b4: "\\cos(\\theta) = -\\frac{0.5}{1} = -0.5 \\Rightarrow \\theta = 120^\\circ",
            d_b5: "\\cos(\\theta) = -\\frac{3}{6} = -0.5 \\Rightarrow \\theta = 120^\\circ",
            d_c1: "\\cos(\\theta) = -\\frac{1}{1.73} \\approx -0.578 \\Rightarrow \\theta \\approx 125.3^\\circ",
            d_c2: "\\cos(\\theta) = -\\frac{2}{2.83} \\approx -0.707 \\Rightarrow \\theta = 135^\\circ",
            d_c3: "\\cos(\\theta) = -\\frac{1.5}{2.12} \\approx -0.707 \\Rightarrow \\theta = 135^\\circ",
            d_c4: "\\cos(\\theta) = -\\frac{3}{5} = -0.6 \\Rightarrow \\theta \\approx 126.9^\\circ",
            d_c5: "\\cos(\\theta) = -\\frac{2.5}{3.54} \\approx -0.707 \\Rightarrow \\theta = 135^\\circ",
            d_a1: "\\cos(\\theta) = -\\frac{1.2}{2} = -0.6 \\Rightarrow \\theta \\approx 126.9^\\circ",
            d_a2: "\\cos(\\theta) = -\\frac{1.8}{3.6} = -0.5 \\Rightarrow \\theta = 120^\\circ",
            d_a3: "\\cos(\\theta) = -\\frac{2.4}{4} = -0.6 \\Rightarrow \\theta \\approx 126.9^\\circ",
            d_a4: "\\cos(\\theta) = -\\frac{3.5}{7} = -0.5 \\Rightarrow \\theta = 120^\\circ",
            d_a5: "\\cos(\\theta) = -\\frac{1.6}{3.2} = -0.5 \\Rightarrow \\theta = 120^\\circ",
            d_e1: "\\cos(\\theta) = -\\frac{2.7}{4.5} = -0.6 \\Rightarrow \\theta \\approx 126.9^\\circ",
            d_e2: "\\cos(\\theta) = -\\frac{3.2}{6.4} = -0.5 \\Rightarrow \\theta = 120^\\circ",
            d_e3: "\\cos(\\theta) = -\\frac{1.4}{2.8} = -0.5 \\Rightarrow \\theta = 120^\\circ",
            d_e4: "\\cos(\\theta) = -\\frac{2.1}{4.2} = -0.5 \\Rightarrow \\theta = 120^\\circ",
            d_e5: "\\cos(\\theta) = -\\frac{4}{8} = -0.5 \\Rightarrow \\theta = 120^\\circ",
            n_b1: "t = \\frac{20}{2} = 10\\text{ s}",
            n_b2: "t = \\frac{30}{3} = 10\\text{ s}",
            n_b3: "t = \\frac{40}{4} = 10\\text{ s}",
            n_b4: "t = \\frac{25}{5} = 5\\text{ s}",
            n_b5: "t = \\frac{50}{2.5} = 20\\text{ s}",
            n_c1: "t = \\frac{20}{2 \\times \\sin(60^\\circ)} = \\frac{20}{1.732} \\approx 11.55\\text{ s}",
            n_c2: "t = \\frac{30}{3 \\times 0.5} = 20\\text{ s}",
            n_c3: "t = \\frac{40}{4 \\times \\sin(45^\\circ)} \\approx 14.14\\text{ s}",
            n_c4: "t = \\frac{25}{2.5 \\times \\sin(60^\\circ)} \\approx 11.55\\text{ s}",
            n_c5: "t = \\frac{50}{5 \\times 0.5} = 20\\text{ s}",
            n_a1: "t = \\frac{20}{2.4 \\times \\sin(120^\\circ)} \\approx 9.62\\text{ s}",
            n_a2: "d = 1.5 \\times 7.7 \\approx 11.55\\text{ m}",
            n_a3: "t = \\frac{30}{4 \\times \\sin(120^\\circ)} \\approx 8.66\\text{ s}",
            n_a4: "t = \\frac{25}{2 \\times \\sin(135^\\circ)} \\approx 17.68\\text{ s}",
            n_a5: "t = \\frac{40}{3.6 \\times \\sin(120^\\circ)}, d = 1.8 \\times t \\approx 23.09\\text{ m}",
            n_e1: "v_{net} = \\sqrt{(5\\sin(120^\\circ))^2 + (5\\cos(120^\\circ) + 2.5)^2} \\approx 4.33\\text{ m/s}",
            n_e2: "\\text{计算横渡时间，然后返回时间，求和}",
            n_e3: "d_{total} = \\sqrt{40^2 + (3 \\times t)^2} \\text{其中 }t = \\frac{40}{6\\sin(120^\\circ)}",
            n_e4: "\\theta = \\arctan\\left(\\frac{d_{drift}}{30}\\right) \\text{其中偏航来自河流流速}",
            n_e5: "E = \\frac{1}{2} \\times 1 \\times v_{net}^2, \\text{先求 }v_{net}",
        },
        results: {
            valid: "计算有效",
            invalid: "矢量不匹配",
            valid_desc: "物理计算确认。正在进入下一目标。",
            invalid_desc: "重新计算矢量分量。",
            stability: "矢量稳定性",
        }
    },

    // SP3.06: 声学 (映射自 sp3_06 - 巴塞尔赌场背景)
    sp3_06: {
        back: "返回 Nexus",
        title: "SP3.06 // 声学原理",
        difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
        objective_title: "声学特征分析",
        monitor_title: "声学实时监测",
        footer_left: "SP3.06_声学 // 节点：巴塞尔",
        check: "频率验证",
        next: "进入下一关",
        correct: "频率匹配正确",
        incorrect: "偏调或错误",
        stages: { sound_waves: "声波传播", frequency_pitch: "频率与音调", loudness_intensity: "响度与强度" },
        scenarios: {
            stadtcasino_basel: "巴塞尔交响乐团：你在巴塞尔赌场音乐厅工作，那里拥有全欧洲最顶级的声学设计，能够完美反射乐器的声音。",
            euroairport_noise: "巴塞尔机场噪音管控：在 EuroAirport 监测起降分贝，通过声学屏障保护周边居民社区。"
        }
    },

    // SP3.08: 几何光学 (映射自原 sp1_08)
    sp3_08: {
        title: "SP3.08 // 几何光学",
        back: "返回 Nexus",
        footer_left: "SP3.08_光学平台 // 节点：巴塞尔",
        monitor_title: "SP3.08_光学监控器",
        objective_title: "光路追踪标定",
        target_title: "目标",
        check: "验证",
        next: "下一挑战",
        correct: "已验证",
        incorrect: "不匹配",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        stages: {
            reflection: "反射",
            refraction: "折射",
            lenses: "透镜"
        },
        labels: {
            show_prism: "开启棱镜色散",
            medium_1: "介质 1 (n₁)",
            medium_2: "介质 2 (n₂)",
            incident_angle: "入射角",
            focal_length: "焦距",
            refraction_title: "折射分析",
            refracted_angle: "折射角 (θ₂)：",
            critical_angle: "全反射临界角：",
            total_internal_reflection: "当前状态：全内反射",
            angle_value: "{value}°",
            light_path_correct: "光路正确！",
            formula: "公式",
            hint: "提示"
        },
        hints: {
            refraction: "光从光疏介质进入光密介质时向法线方向偏折 (n₂ > n₁)"
        },
        snell: { title: "斯涅尔定律", line_1: "n₁ sin(θ₁) = n₂ sin(θ₂)", line_2: "θ_c = arcsin(n₂/n₁)", line_3: "v = c/n" },
        mission: { title: "任务：光路追踪", description: "掌握折射与反射定律。观察巴塞尔实验室精密光学元件中的色散现象。" }
    },

    // --- 热力学 (保留自 GP2 系列) ---
    gp2_01: {
        back: "返回核心枢纽",
        title: "GP2.01 // 气体定律",
        difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
        objective_title: "分子动理论分析",
        target_title: "理想气体状态",
        next: "执行下一序列",
        check: "验证状态",
        correct: "状态已平衡",
        incorrect: "方程不匹配",
        ready: "状态就绪",
        monitor_title: "GP2.01_热力学监视器",
        footer_left: "GP2.01_热力学 // 节点：巴塞尔",
        stages: { ideal_gas: "理想气体", boyles: "波义耳定律", charles: "查理定律" },
        prompts: {
            find_p: "理想气体: n = {n} mol, T = {T} K, V = {V} m³. 求 P.",
            find_v: "气体: n = {n} mol, P = {P} Pa, T = {T} K. 求 V.",
            find_n: "气体: P = {P} Pa, V = {V} m³, T = {T} K. 求 n.",
            find_t: "气体: P = {P} Pa, V = {V} m³, n = {n} mol. 求 T.",
            relation_pt: "体积恒定时温度加倍，压强变为原来的几倍？",
            relation_vn: "恒温恒压下摩尔数加倍，体积变为原来的几倍？",
            boyle_find_p2: "波义耳定律: P₁ = {p1} kPa, V₁ = {v1} L, V₂ = {v2} L. 求 P₂.",
            boyle_find_v2: "波义耳定律: P₁ = {p1} kPa, V₁ = {v1} L, P₂ = {p2} kPa. 求 V₂.",
            boyle_relation: "恒温下将气体从 {v1} L 压缩到 {v2} L，压强变为原来的几倍？",
            boyle_condition: "波义耳定律要求哪个量保持不变？",
            charles_find_v2: "查理定律: V₁ = {v1} L, T₁ = {t1} K, T₂ = {t2} K. 求 V₂.",
            charles_find_t2: "查理定律: V₁ = {v1} L, T₁ = {t1} K, V₂ = {v2} L. 求 T₂.",
            charles_relation: "恒压下绝对温度加倍，体积变为原来的几倍？",
            charles_condition: "查理定律要求哪个量保持不变？",
            combined_law: "联合气体定律：已知 P, V, T 变化，求 {target}。"
        },
        scenarios: {
            ideal_gas: "理想气体定律 (PV=nRT) 描述了许多气体在各种条件下的行为。",
            boyles_law: "波义耳定律：在温度恒定的情况下，体积与压强成反比。",
            charles_law: "查理定律：在压强恒定的情况下，体积与温度成正比。"
        }
    },
    gp2_02: {
        back: "返回核心枢纽",
        title: "GP2.02 // 热力学第一定律",
        difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
        objective_title: "内能转换分析",
        next: "下一阶段",
        check: "验证能量",
        correct: "已验证",
        incorrect: "不匹配",
        ready: "就绪",
        monitor_title: "GP2.02_热力学监视器",
        footer_left: "GP2.02_热力学 // 节点：巴塞尔",
        stages: { first_law: "能量守恒", internal_energy: "系统内能", work_heat: "功与热量" },
        scenarios: {
            first_law: "热力学第一定律即能量守恒定律。",
            internal_energy: "内能取决于系统的温度和状态。",
            work_heat: "热量和功是能量转移的两种方式。"
        }
    },
    gp2_03: {
        title: "GP2.03 // 热机效率",
        stages: { efficiency: "热机效率", carnot: "卡诺循环", heat_flow: "热流方向" }
    },
    gp2_04: {
        title: "GP2.04 // 熵与无序",
        labels: { entropy: "熵值 (S)", disorder: "无序度", arrow_of_time: "时间之箭" },
        stages: { entropy_concept: "熵的概念", second_law: "第二定律", arrow_of_time: "时间单向性" }
    },

    // GP3.01: Wave Physics
    gp3_01: {
        back: "返回枢纽",
        title: "GP3.01 // 波动物理",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        stages: {
            wave_properties: "波的性质",
            superposition: "叠加原理",
            optics: "光学"
        },
        scenarios: {
            wave_properties: "您正在分析巴塞尔中桥（Mittlere Brücke）附近莱茵河上的波动。河流产生不同频率和波长的表面波。理解波的性质对巴塞尔河流航行安全和新莱茵港设施的设计至关重要。基本波动方程 v = fλ 将速度、频率和波长联系起来。声波在空气中传播速度为 340 m/s，而在水中传播速度为 1500 m/s。这种差异影响巴塞尔河流监测站使用的水下通信系统。波的周期 T = 1/f 描述振荡时间。这些原理适用于从水波到电磁辐射的所有波动现象。",
            superposition: "在巴塞尔市政音乐厅（Stadtcasino），声学工程师研究波的干涉模式以优化音质。当两个波相遇时，它们会叠加——振幅代数相加。当波同相时发生相长干涉，产生更响的声音。当波反相时发生相消干涉，导致抵消。当反射波与入射波干涉时，音乐厅中形成驻波，产生波节（零振幅）和波腹（最大振幅）。双缝实验展示了光的波动干涉，产生明暗条纹。薄膜干涉在肥皂泡和油膜中产生彩色图案，这些现象在巴塞尔大学物理系进行研究。",
            optics: "CERN 的巴塞尔合作项目使用先进的光学系统进行粒子探测。光遵循反射定律（θᵢ = θᵣ）和斯涅尔折射定律（n₁sinθ₁ = n₂sinθ₂）。当光从密介质传播到疏介质且角度超过临界角时发生全内反射，这使得巴塞尔电信基础设施中的光纤通信成为可能。单缝衍射在 asinθ = mλ 处产生特征性的极小值图案。衍射光栅方程 d·sinθ = mλ 用于罗氏和诺华的化学分析光谱仪。瑞利判据确定巴塞尔天文台望远镜的光学分辨率极限。"
        },
        objective_title: "波动分析",
        complete: "模块完成！",
        check: "验证",
        next: "下一挑战",
        correct: "波动已验证",
        incorrect: "检查计算",
        ready: "就绪",
        monitor_title: "GP3.01_波动监视器",
        footer_left: "GP3.01_波动物理 // 节点：巴塞尔",
        prompts: {
            find_velocity: "波的频率为 {f} Hz，波长为 {lambda} m。求速度 v。",
            find_wavelength: "波的频率为 {f} Hz，速度为 {v} m/s。求波长 λ。",
            find_frequency: "波的速度为 {v} m/s，波长为 {lambda} m。求频率 f。",
            verify_wave_eq: "验证：频率 f = {f} Hz，波长 λ = {lambda} m 的波速度为 v = {v} m/s。",
            water_wave: "莱茵河上的水波：f = {f} Hz，λ = {lambda} m。求速度。",
            find_period: "波的频率为 {f} Hz。求周期 T。",
            period_to_freq: "波的周期为 T = {T} s。求频率 f。",
            sound_in_air: "空气中的声波（v = 340 m/s）频率为 {f} Hz。求波长。",
            sound_in_water: "水中的声波（v = 1500 m/s）频率为 {f} Hz。求波长。",
            speed_ratio: "声音在水中传播速度为 1500 m/s，在空气中为 340 m/s。求比值 v水/v气。",
            doppler_approach: "救护车警报器接近。观察到的频率是更高还是更低？",
            doppler_recede: "救护车警报器远离。观察到的频率是更高还是更低？",
            constructive_interference: "两个波（各 A = 2 m）相长干涉。总振幅？",
            destructive_interference: "两个波（各 A = 3 m）相消干涉。总振幅？",
            beat_frequency: "两个音叉：440 Hz 和 444 Hz。拍频？",
            de_broglie: "电子（m = 9.1×10⁻³¹ kg，v = 1 m/s）。德布罗意波长？（h = 6.63×10⁻³⁴）",
            wave_particle_duality: "光同时表现出波动性和粒子性。对还是错？",
            photon_energy: "频率 f = 5×10¹⁴ Hz 的光子。能量 E = hf？（h = 6.63×10⁻³⁴）",
            matter_wave: "电子波长 λ = h/mv。对于典型电子，λ ≈ ？",
            uncertainty: "海森堡不确定性：ΔxΔp ≥ h/4π。我们能同时精确知道两者吗？",
            same_phase_add: "两个波（A = 2 m）同相。总振幅？",
            opposite_phase_cancel: "两个波（A = 3 m）反相。总振幅？",
            constructive_max: "两个波（A = 1 m）相长干涉。最大振幅？",
            partial_destructive: "波 A₁ = 5 m，A₂ = 3 m 相消干涉。总振幅？",
            interference_type: "两个同相波叠加。干涉类型？",
            standing_wave_node: "驻波 λ = 2 m。第一个波节位置 x₁？",
            standing_wave_antinode: "驻波 λ = 4 m。第一个波腹位置 x₁？",
            node_count: "弦长 5 m，λ = 2 m。波节数量？",
            string_fundamental: "弦基频模式：L = λ/2。如果 λ = 1 m，求 L。",
            harmonic_wavelength: "基频 λ₁ = 2 m。二次谐波波长 λ₂？",
            double_slit_spacing: "双缝：λ = 500 nm，L = 2 m，d = 1 mm。条纹间距 Δy？",
            fringe_order: "双缝：λ = 600 nm，L = 2 m，d = 1.2 mm。第三亮条纹 y₃？",
            slit_separation: "双缝：λ = 500 nm，L = 1 m，Δy = 1 mm。缝间距 d？",
            wavelength_from_fringes: "双缝：Δy = 0.8 mm，d = 0.5 mm，L = 1 m。波长 λ？",
            central_maximum: "双缝：中央极大位置 y₀？",
            thin_film_constructive: "薄膜（n = 2）：λ = 500 nm，m = 1 的相长干涉。厚度 t？",
            thin_film_destructive: "薄膜（n = 2）：λ = 600 nm，m = 0 的相消干涉。厚度 t？",
            newton_rings: "牛顿环：λ = 500 nm，R = 1 m。第一亮环半径 r₁？",
            soap_bubble: "肥皂泡（n = 1.33，t = 300 nm）强烈反射哪种颜色？",
            anti_reflection: "增透膜（n = 2）：λ = 400 nm。最小厚度 t？",
            reflection_angle: "光以 30° 入射。反射角 θᵣ？",
            refraction_basic: "光从空气（n = 1）以 30° 入射到玻璃（n = 1.5）。折射角 θ₂？",
            light_speed_medium: "玻璃中的光（n = 1.5）。速度 v = c/n？",
            refractive_index: "介质中光速：v = 2×10⁸ m/s。折射率 n？",
            normal_incidence: "光垂直入射表面。折射角 θᵣ？",
            critical_angle: "玻璃（n = 1.5）到空气（n = 1）。临界角 θc？",
            total_internal_reflection: "光从玻璃以 50° 入射到空气（θc = 42°）。全内反射？",
            fiber_optics: "光纤使用哪个原理来捕获光？",
            prism_dispersion: "棱镜将白光分离成颜色。这种效应称为？",
            brewster_angle: "玻璃（n = 1.5）到空气的布儒斯特角。tan θB = n₂/n₁。求 θB。",
            single_slit_minima: "单缝（a = 1 mm）：λ = 500 nm 的第一极小。角度 θ₁？",
            diffraction_width: "单缝（a = 0.6 mm）：λ = 600 nm，L = 1 m。中央极大宽度 w？",
            rayleigh_criterion: "望远镜（D = 0.5 m）：λ = 500 nm。最小可分辨角 θmin？",
            circular_aperture: "圆孔（D = 10 mm，f = 100 mm）：λ = 500 nm。艾里斑半径 r？",
            resolving_power: "望远镜直径 D = 0.5 m，λ = 500 nm。分辨本领 R？",
            grating_equation: "衍射光栅（d = 1 μm）：λ = 500 nm，m = 1。角度 θ₁？",
            grating_order: "光栅（d = 2 μm）：λ = 600 nm。最大级次 mmax？",
            grating_spacing: "光栅：λ = 500 nm，θ₁ = 30°，m = 1。线间距 d？",
            spectral_resolution: "光栅：m = 2，N = 5000 条线。光谱分辨率 R？",
            blazed_grating: "闪耀光栅优化特定波长的效率。目的？"
        },
        hints: {
            wave_equation: "使用 v = fλ",
            wavelength_calc: "λ = v/f",
            frequency_calc: "f = v/λ",
            period_calc: "T = 1/f",
            frequency_from_period: "f = 1/T",
            sound_speed_air: "空气中声速：340 m/s",
            sound_speed_water: "水中声速：1500 m/s",
            speed_comparison: "除以速度",
            doppler_effect: "接近的声源：频率更高",
            doppler_recede: "远离的声源：频率更低",
            constructive: "同相：振幅相加",
            destructive: "反相：振幅相减",
            beats: "拍频 = |f₁ - f₂|",
            de_broglie: "λ = h/mv",
            duality: "光既是波又是粒子",
            photon_energy: "E = hf",
            matter_wave: "所有物质都有波动性",
            uncertainty: "不能同时精确知道两者",
            in_phase: "同相：振幅相加",
            out_of_phase: "反相：振幅相减",
            max_amplitude: "相长：A₁ + A₂",
            partial_cancel: "部分相消：|A₁ - A₂|",
            interference_types: "同相 = 相长",
            node_position: "波节：x = nλ/2",
            antinode_position: "波腹：x = (n + 1/2)λ/2",
            node_count: "计算 λ/2 间隔",
            fundamental_mode: "基频：L = λ/2",
            second_harmonic: "二次谐波：λ₂ = λ₁/2",
            double_slit: "Δy = λL/d",
            fringe_position: "ym = mλL/d",
            slit_distance: "d = λL/Δy",
            wavelength_measurement: "λ = Δy·d/L",
            central_bright: "中央极大在 y = 0",
            thin_film: "相长：2nt = mλ",
            destructive_film: "相消：2nt = (m + 1/2)λ",
            newton_rings: "rm = √(mλR)",
            soap_colors: "干涉产生颜色",
            anti_reflection: "四分之一波长膜：t = λ/4n",
            law_of_reflection: "θᵢ = θᵣ",
            snells_law: "n₁sinθ₁ = n₂sinθ₂",
            light_speed: "v = c/n",
            index_calc: "n = c/v",
            normal_ray: "垂直：无弯曲",
            critical_angle: "sinθc = n₂/n₁",
            tir_condition: "θ > θc 导致全内反射",
            fiber_principle: "全内反射",
            dispersion: "不同 λ 折射不同",
            brewster: "tanθB = n₂/n₁",
            single_slit: "极小：asinθ = mλ",
            central_width: "w = 2λL/a",
            rayleigh: "θmin = 1.22λ/D",
            airy_disk: "r = 1.22λf/D",
            resolution: "R = D/(1.22λ)",
            grating: "d·sinθ = mλ",
            max_order: "mmax = d/λ",
            line_spacing: "d = mλ/sinθ",
            grating_resolution: "R = mN",
            blaze_angle: "优化效率"
        }
    }
};
