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

    // SP3.07: 导航与矢量 (映射自原 sp1_05)
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
            angle: "角度"
        },
        mission: {
            title: "莱茵河横渡任务",
            description: "驾驶巴塞尔莱茵河渡轮。利用矢量合成调整缆索角度和渡轮速度，以补偿河流流速。"
        },
        prompts: {
            c_b1: "\\text{渡轮向北行驶速度为 } 2m/s \\text{。河水向北流速为 } 1m/s \\text{。合速度是多少？}",
            c_b2: "\\text{渡轮向南行驶速度为 } 1.5m/s \\text{，逆流速度为 } 1.5m/s \\text{。合速度是多少？}",
            c_c1: "\\text{计算纵向速度分量 } v_{net,z} \\text{。}",
            d_c1: "\\text{如果 } v_r=1.5, v_f=3.0 \\text{，求达到零纵向偏移所需的角度 } \\theta \\text{。}",
            n_a1: "\\text{如果以 } v_{net,x} \\text{ 横渡 20m 宽的河流，到达对岸需要多长时间？}",
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
        labels: {
            show_prism: "开启棱镜色散",
            medium_1: "介质 1 (n₁)",
            medium_2: "介质 2 (n₂)",
            incident_angle: "入射角 (θ₁)",
            refraction_title: "折射分析",
            refracted_angle: "折射角 (θ₂)：",
            critical_angle: "全反射临界角：",
            total_internal_reflection: "当前状态：全内反射",
            angle_value: "{value}°"
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
    }
};
