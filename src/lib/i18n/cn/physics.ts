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
        },
        labels: {
            input: "力学参数",
            mass: "质量 (m)",
            acc: "加速度 (a)",
            force: "力 (F)",
            friction: "摩擦力 (f)",
            coeff: "摩擦系数 (μ)",
            net_force: "合力 (ΣF)",
            normal_force: "支持力 (N)"
        },
        prompts: {
            // 牛顿第一定律 - 惯性与平衡
            rest: "物体 (m={m}kg) 处于静止状态。合力 ΣF？",
            const_v: "物体 (m={m}kg) 以恒定速度 {v}m/s 运动。合力 ΣF？",
            equilibrium: "力 F₁={f1}N (向右) 和 F₂={f2}N (向左) 作用于物体。为达到平衡，F₃？",
            space: "在深空中（无摩擦），物体 (m={m}kg) 被力 F={f}N 推动 {t}秒后释放。释放后的力？",
            inertia: "物体 (m={m}kg) 静止。什么性质阻止运动状态改变？",
            "2d_balance": "两个垂直的力作用于物体 (m={m}kg)。合力大小？",
            vector_add: "力 F₁={f}N (向东) 和 F₂={f}N (向北) 作用于物体。合力大小？",
            slope: "物体 (m={m}kg) 在斜面上 (θ={theta}°)，摩擦系数 μ={mu}。支持力分量？",
            space_friction: "在太空中，物体 (m={m}kg) 受摩擦力 μ={mu}。这现实吗？",
            complex: "物体 (m={m}kg) 被力 F={f}N 拉动，对抗摩擦 μ={mu}。合力？",

            // 牛顿第二定律 - F=ma
            find_f: "质量 m={m}kg 以加速度 a={a}m/s² 运动。求合力 F。",
            find_a: "合力 F={f}N 作用于质量 m={m}kg。求加速度 a。",
            gravity: "物体 m={m}kg 在行星上 (g={g}m/s²)。重力 W=mg？",
            net_force: "力 F={f}N 作用于 m={m}kg。摩擦力 f={fr}N 阻碍。合加速度？",
            friction: "力 F={f}N 拉动 m={m}kg，摩擦系数 μ={mu}。加速度？",
            pulley: "滑轮系统：质量 m={m}kg，施加力 F={f}N，摩擦 μ={mu}。加速度？",
            variable_mass: "力 F={f}N 作用于变质量系统 m={m}kg。有效加速度？",
            coupled: "两个质量耦合：m₁={m}kg，施加 F={f}N。系统加速度？",

            // 摩擦力
            static: "箱子 m={m}kg 在地板上 (μs={mu})。最大静摩擦力？",
            kinetic: "箱子 m={m}kg 滑动 (μk={mu})。动摩擦力？",
            max_static: "箱子 m={m}kg 在表面上 (μs={mu})。滑动前的最大静摩擦？",
            kinetic_vs_static: "箱子 m={m}kg：μs={mu}，μk={mu}。哪个摩擦力更大？",
            slope_friction: "箱子 m={m}kg 在斜面上 (θ={theta}°)，μ={mu}。摩擦力？",
            critical: "箱子 m={m}kg 被力 F={f}N 拉动，μ={mu}。临界点的合力？",

            // 兼容旧键
            n1_const_vel: "物体 (m={m}kg) 以恒定速度 {v}m/s 运动。合力 ΣF？",
            n1_equilibrium: "力 F₁={f1}N (向右) 和 F₂={f2}N (向左) 作用于物体。为达到平衡，F₃？",
            n1_rest: "物体 (m={m}kg) 静止。力 F={f}N 向右推。摩擦力 f={fr}N 向左。加速度？",
            n1_space: "在深空中（无摩擦），物体 (m={m}kg) 被力 F={f}N 推动 {t}秒后释放。释放后的力？",
            n1_inertia: "什么性质阻止 {m}kg 物体的运动状态改变？",
            n2_find_f: "质量 m={m}kg 以加速度 a={a}m/s² 运动。求合力 F。",
            n2_find_a: "合力 F={f}N 作用于质量 m={m}kg。求加速度 a。",
            n2_find_m: "合力 F={f}N 产生加速度 a={a}m/s²。求质量 m。",
            n2_complex: "力 F={f}N 拉动质量 m={m}kg 对抗摩擦力 f={fr}N。求加速度。",
            n2_gravity: "物体 m={m}kg 在行星上坠落 (g={g}m/s²)。重力 Fg？",
            fr_static: "箱子 m={m}kg 在地板上 (μs={mu})。最大静摩擦力？",
            fr_kinetic: "箱子 m={m}kg 滑动 (μk={mu})。动摩擦力？",
            fr_norm: "箱子 m={m}kg 被力 F={f}N 压在墙上。支持力？",
            fr_slide: "箱子 m={m}kg 在水平地板上滑动。摩擦力 f={f}N。系数 μk？",
            fr_bank: "汽车在倾斜路面转弯 (θ={theta}°)。需要的摩擦力？"
        },
        hints: {
            // 牛顿第一定律
            rest: "静止意味着 v=0，所以 ΣF=0（牛顿第一定律）",
            const_v: "恒定速度意味着 a=0，所以 ΣF=0",
            equilibrium: "平衡时，所有力必须平衡：F₁ + F₃ = F₂",
            space: "释放后，无力作用（太空中 F=0）",
            inertia: "惯性是阻止运动状态改变的性质",
            "2d_balance": "对垂直的力使用勾股定理",
            vector_add: "使用矢量加法：|F_net| = √(F₁² + F₂²)",
            slope: "支持力 N = mg cos(θ)",
            space_friction: "太空中无摩擦（无大气）",
            complex: "F_net = F_applied - f_friction",

            // 牛顿第二定律
            find_f: "使用 F = ma",
            find_a: "使用 a = F/m",
            gravity: "重力 W = mg",
            net_force: "F_net = F_applied - f，然后 a = F_net/m",
            friction: "f = μN = μmg，然后 a = (F - f)/m",
            pulley: "考虑张力和摩擦力",
            variable_mass: "使用 F = ma，有效质量",
            coupled: "总质量一起运动：a = F/m_total",

            // 摩擦力
            static: "f_s,max = μs × N = μs × mg",
            kinetic: "f_k = μk × N = μk × mg",
            max_static: "运动开始前的最大静摩擦",
            kinetic_vs_static: "静摩擦通常大于动摩擦",
            slope_friction: "f = μN = μ(mg cos θ)",
            critical: "临界点时，F_applied = f_max"
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
        },
        prompts: {
            // 势能
            basic_ep: "物体 m={m}kg 在高度 h={h}m。计算势能 Ep (g={g}m/s²)。",
            rhine_hydro: "莱茵河水 m={m}kg 从高度 h={h}m 流下。势能 Ep？",
            total_energy: "物体 m={m}kg 在 h={h}m 高度，速度 v={v}m/s。总机械能？",
            conservation: "物体 m={m}kg 从 h={h}m 落下，达到 v={v}m/s。任意点的总能量？",

            // 动能
            basic_ek: "物体 m={m}kg 以 v={v}m/s 运动。计算动能 Ek。",
            tram_braking: "巴塞尔电车 m={m}kg 从 v={v}m/s 刹车。回收的动能？",
            velocity_at_bottom: "物体 m={m}kg 从 h={h}m 落下，初速度 v={v}m/s。底部的最终速度？",
            work_energy: "物体 m={m}kg 速度 v={v}m/s。力 F={f}N 作用距离 d={d}m。最终动能？",

            // 功与功率
            basic_work: "力 F={f}N 移动物体 d={d}m。计算功 W。",
            basic_power: "力 F={f}N 在 t={t}s 内移动物体 d={d}m。计算功率 P。",
            power_lifting: "起重机在 t={t}s 内将 m={m}kg 提升到 h={h}m。功率 P？",
            rhine_power_station: "莱茵河电站在 t={t}s 内将水 m={m}kg 提升 h={h}m。功率 P？"
        },
        hints: {
            // 势能
            basic_ep: "使用 Ep = mgh",
            rhine_hydro: "势能 Ep = mgh，其中 g=9.8m/s²",
            total_energy: "总能量 E = Ep + Ek = mgh + ½mv²",
            conservation: "能量守恒：E_总 = Ep + Ek = 常数",

            // 动能
            basic_ek: "使用 Ek = ½mv²",
            tram_braking: "动能 Ek = ½mv²",
            velocity_at_bottom: "使用能量守恒：mgh + ½mv₀² = ½mv²",
            work_energy: "功能定理：W = ΔEk，所以 Ek_末 = Ek_初 + W",

            // 功与功率
            basic_work: "功 W = Fs（力 × 距离）",
            basic_power: "功率 P = W/t = Fs/t",
            power_lifting: "P = W/t = mgh/t",
            rhine_power_station: "功率 P = mgh/t"
        }
    },

    // SP3.04: 流体与压力 (映射自原 sp1_07)
    sp3_04: {
        back: "返回枢纽",
        title: "SP3.04 // 压力与浮力",
        difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        footer_left: "SP3.04_流体力学 // 节点：巴塞尔",
        stages: {
            pressure: "压力",
            buoyancy: "浮力",
            hydraulics: "液压"
        },
        prompts: {
            // 压力 - 基础 (5)
            pressure_basic_1: "P = \\\\rho gh. \\\\text{ 若 } h = 10 \\\\text{ m, } \\\\rho = 1000 \\\\text{ kg/m}^3, \\\\text{ 求表压 } P.",
            pressure_basic_2: "\\\\text{水深 5 m。压力？ } (\\\\rho = 1000 \\\\text{ kg/m}^3, g = 10 \\\\text{ m/s}^2)",
            pressure_basic_3: "\\\\text{力 100 N 作用在面积 2 m}^2. \\\\text{ 压力？}",
            pressure_basic_4: "\\\\text{力 200 N 作用在面积 0.5 m}^2. \\\\text{ 压力？}",
            pressure_basic_5: "\\\\text{潜水员在 2 m 深度。表压？ } (\\\\rho = 1000, g = 10)",
            
            // 压力 - 核心 (5)
            pressure_core_1: "\\\\text{潜艇在 15 m 深度。总压力？ } (P_{atm} = 101000 \\\\text{ Pa})",
            pressure_core_2: "\\\\text{液压机：500 N 作用在 0.01 m}^2. \\\\text{ 压力？}",
            pressure_core_3: "\\\\text{油箱深度 20 m。底部压力？ } (\\\\rho_{oil} = 800 \\\\text{ kg/m}^3)",
            pressure_core_4: "\\\\text{活塞：1000 N 作用在 0.02 m}^2. \\\\text{ 传递的压力？}",
            pressure_core_5: "\\\\text{海洋深度 100 m。表压？ } (\\\\rho = 1030 \\\\text{ kg/m}^3)",
            
            // 压力 - 进阶 (5)
            pressure_advanced_1: "\\\\text{双层流体：30 m 水 + 20 m 油 } (\\\\rho_w = 1000, \\\\rho_o = 800). \\\\text{ 底部压力？}",
            pressure_advanced_2: "\\\\text{液压升降机：小活塞 0.001 m}^2, \\\\text{ 大活塞 0.1 m}^2. \\\\text{ 小活塞上 100 N 力。大活塞上的力？}",
            pressure_advanced_3: "\\\\text{U 型管：左侧水，右侧水银。水高 10 m。水银高度？ } (\\\\rho_w = 1000, \\\\rho_{Hg} = 13600)",
            pressure_advanced_4: "\\\\text{液压制动：主缸 0.01 m}^2, \\\\text{ 从缸 0.05 m}^2. \\\\text{ 主缸上 200 N 力。从缸上的力？}",
            pressure_advanced_5: "\\\\text{深海：200 m 深度。总压力？ } (P_{atm} = 101000, \\\\rho = 1030)",
            
            // 压力 - 精英 (5)
            pressure_elite_1: "\\\\text{马里亚纳海沟：11000 m 深度。压力？ } (\\\\rho = 1050, P_{atm} = 101000)",
            pressure_elite_2: "\\\\text{液压系统：A}_1 = 0.0001 \\\\text{ m}^2, A_2 = 0.01 \\\\text{ m}^2. \\\\text{ 机械优势？}",
            pressure_elite_3: "\\\\text{三层流体：2 m 水，2 m 油 } (\\\\rho = 800), \\\\text{ 1 m 水银 } (\\\\rho = 13600). \\\\text{ 总压力？}",
            pressure_elite_4: "\\\\text{液压千斤顶：效率 80\\\\%. 输入 500 N 在 0.002 m}^2, \\\\text{ 输出面积 0.2 m}^2. \\\\text{ 输出力？}",
            pressure_elite_5: "\\\\text{潜艇在 1000 m。1 m}^2 \\\\text{ 舱门上的压力差？ } (\\\\rho = 1030)",
            
            // 浮力 - 基础 (5)
            buoyancy_basic_1: "F_b = \\\\rho Vg. \\\\text{ 若 } V = 0.1 \\\\text{ m}^3, \\\\rho = 1000, \\\\text{ 求浮力 } F_b.",
            buoyancy_basic_2: "\\\\text{物体体积 0.05 m}^3 \\\\text{ 在水中。浮力？}",
            buoyancy_basic_3: "\\\\text{气球体积 0.2 m}^3 \\\\text{ 在空气中 } (\\\\rho = 1.2 \\\\text{ kg/m}^3). \\\\text{ 浮力？}",
            buoyancy_basic_4: "\\\\text{岩石体积 0.01 m}^3 \\\\text{ 浸没在水中。浮力？}",
            buoyancy_basic_5: "\\\\text{船排开 0.5 m}^3 \\\\text{ 的水。浮力？}",
            
            // 浮力 - 核心 (5)
            buoyancy_core_1: "\\\\text{木块：质量 10 kg，体积 0.02 m}^3. \\\\text{ 会在水中漂浮吗？}",
            buoyancy_core_2: "\\\\text{物体：重量 1500 N，体积 0.1 m}^3 \\\\text{ 在水中。净力？}",
            buoyancy_core_3: "\\\\text{冰块：密度 900 kg/m}^3, \\\\text{ 体积 0.05 m}^3. \\\\text{ 在水中浸没的分数？}",
            buoyancy_core_4: "\\\\text{铝块：质量 81 kg，体积 0.03 m}^3. \\\\text{ 在水中的表观重量？}",
            buoyancy_core_5: "\\\\text{热气球：体积 1000 m}^3, \\\\rho_{air} = 1.2, \\\\rho_{hot} = 0.9. \\\\text{ 升力？}",
            
            // 浮力 - 进阶 (5)
            buoyancy_advanced_1: "\\\\text{比重计：质量 50 g，体积 40 cm}^3. \\\\text{ 在水中浸没的深度？}",
            buoyancy_advanced_2: "\\\\text{船：质量 50000 kg。排开的水的体积？}",
            buoyancy_advanced_3: "\\\\text{软木：密度 250 kg/m}^3, \\\\text{ 体积 0.02 m}^3 \\\\text{ 在水中。下沉前的最大负载？}",
            buoyancy_advanced_4: "\\\\text{金块：质量 19.3 kg，体积 0.001 m}^3. \\\\text{ 浸没时绳子的张力？}",
            buoyancy_advanced_5: "\\\\text{潜艇：体积 500 m}^3, \\\\text{ 质量 400000 kg。下潜所需的压载水？}",
            
            // 浮力 - 精英 (5)
            buoyancy_elite_1: "\\\\text{双流体系统：物体一半在水中，一半在油中 } (\\\\rho_o = 800). \\\\text{ 若 } V = 0.1 \\\\text{ m}^3 \\\\text{ 总浮力？}",
            buoyancy_elite_2: "\\\\text{空心球：外半径 0.2 m，内半径 0.15 m，质量 10 kg。会漂浮吗？}",
            buoyancy_elite_3: "\\\\text{冰山：密度 900 kg/m}^3 \\\\text{ 在海水中 } (\\\\rho = 1030). \\\\text{ 水面以上的分数？}",
            buoyancy_elite_4: "\\\\text{氦气球：体积 1 m}^3, \\\\rho_{He} = 0.18, \\\\rho_{air} = 1.2, \\\\text{ 气球质量 0.5 kg。最大载荷？}",
            buoyancy_elite_5: "\\\\text{阿基米德的王冠：空气中重 10 N，水中重 8.5 N。密度？}",
            
            // 液压 - 基础 (5)
            hydraulics_basic_1: "P = F/A. \\\\text{ 若 } F = 100 \\\\text{ N 作用在 } A = 0.01 \\\\text{ m}^2, \\\\text{ 求压力 } P.",
            hydraulics_basic_2: "\\\\text{液压机：200 N 作用在 0.02 m}^2. \\\\text{ 压力？}",
            hydraulics_basic_3: "\\\\text{活塞：500 N 作用在 0.05 m}^2. \\\\text{ 压力？}",
            hydraulics_basic_4: "\\\\text{液压缸：1000 N 作用在 0.1 m}^2. \\\\text{ 压力？}",
            hydraulics_basic_5: "\\\\text{小活塞：50 N 作用在 0.005 m}^2. \\\\text{ 压力？}",
            
            // 液压 - 核心 (5)
            hydraulics_core_1: "\\\\text{液压升降机：} A_1 = 0.01 \\\\text{ m}^2, A_2 = 0.1 \\\\text{ m}^2, F_1 = 100 \\\\text{ N。求 } F_2.",
            hydraulics_core_2: "\\\\text{液压制动：} A_1 = 0.005 \\\\text{ m}^2, A_2 = 0.05 \\\\text{ m}^2, F_1 = 50 \\\\text{ N。求 } F_2.",
            hydraulics_core_3: "\\\\text{液压千斤顶：} A_1 = 0.02 \\\\text{ m}^2, A_2 = 0.2 \\\\text{ m}^2, F_1 = 200 \\\\text{ N。求 } F_2.",
            hydraulics_core_4: "\\\\text{液压机：} A_1 = 0.001 \\\\text{ m}^2, A_2 = 0.1 \\\\text{ m}^2, F_1 = 10 \\\\text{ N。求 } F_2.",
            hydraulics_core_5: "\\\\text{液压系统：} A_1 = 0.03 \\\\text{ m}^2, A_2 = 0.3 \\\\text{ m}^2, F_1 = 300 \\\\text{ N。求 } F_2.",
            
            // 液压 - 进阶 (5)
            hydraulics_advanced_1: "\\\\text{液压升降机：} A_1 = 0.01 \\\\text{ m}^2, F_1 = 100 \\\\text{ N, } F_2 = 5000 \\\\text{ N。求 } A_2.",
            hydraulics_advanced_2: "\\\\text{液压系统：} A_1 = 0.002 \\\\text{ m}^2, A_2 = 0.2 \\\\text{ m}^2, \\\\text{ 活塞 1 移动 10 cm。活塞 2 移动？}",
            hydraulics_advanced_3: "\\\\text{液压机：效率 90\\\\%. } A_1 = 0.01 \\\\text{ m}^2, A_2 = 0.1 \\\\text{ m}^2, F_1 = 200 \\\\text{ N。求 } F_2.",
            hydraulics_advanced_4: "\\\\text{液压千斤顶：} A_1 = 0.005 \\\\text{ m}^2, A_2 = 0.5 \\\\text{ m}^2, F_1 = 100 \\\\text{ N。机械优势？}",
            hydraulics_advanced_5: "\\\\text{液压制动：} A_1 = 0.01 \\\\text{ m}^2, A_2 = 0.04 \\\\text{ m}^2, F_1 = 150 \\\\text{ N, } d_1 = 5 \\\\text{ cm。做功？}",
            
            // 液压 - 精英 (5)
            hydraulics_elite_1: "\\\\text{多级液压：} A_1 = 0.001, A_2 = 0.01, A_3 = 0.1 \\\\text{ m}^2, F_1 = 50 \\\\text{ N。求 } F_3.",
            hydraulics_elite_2: "\\\\text{带摩擦的液压系统：} A_1 = 0.01, A_2 = 0.1 \\\\text{ m}^2, F_1 = 200 \\\\text{ N，摩擦力 } = 100 \\\\text{ N。净 } F_2?",
            hydraulics_elite_3: "\\\\text{液压蓄能器：} A_1 = 0.005, A_2 = 0.05 \\\\text{ m}^2, \\\\text{ 压力 } = 2 \\\\times 10^6 \\\\text{ Pa。} A_2 \\\\text{ 上的力？}",
            hydraulics_elite_4: "\\\\text{液压阻尼器：} A = 0.01 \\\\text{ m}^2, \\\\text{ 速度 } = 0.5 \\\\text{ m/s，粘度产生 } 200 \\\\text{ N 阻力。净力？}",
            hydraulics_elite_5: "\\\\text{串联液压回路：} A_1 = 0.002, A_2 = 0.02, A_3 = 0.2 \\\\text{ m}^2. F_1 = 100 \\\\text{ N。总机械优势？}"
        }
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
        prompts: {
            fl_calc_du: "热力学第一定律：Q = {q} J (吸收), W = {w} J (对外做功). 求 ΔU.",
            fl_calc_q: "系统变化：ΔU = {du} J, W = {w} J. 求热量 Q.",
            fl_calc_w: "系统吸收 Q = {q} J, 内能增加 ΔU = {du} J. 求 W.",
            fl_adiabatic: "绝热过程 (Q=0). 对系统做功 {w} J. 求 ΔU.",
            fl_cycle: "循环过程：净功 W = {w} J. 净吸热 Q 是多少？",
            fl_sign_conv: "系统放热时，Q 是正还是负？",
            ie_ideal_u: "单原子理想气体：n={n} mol, T={t} K. 求 U (U = 1.5 nRT).",
            ie_delta_u: "理想气体的等温过程。ΔU 是多少？",
            ie_diatomic: "双原子气体 (f=5): n={n}, T={t}. 计算内能 U.",
            ie_change_t: "理想气体 (n={n}, Cv={cv} J/molK) 从 {t1} K 加热到 {t2} K. 求 ΔU.",
            ie_state_func: "内能是状态函数。一个循环中的变化量是？",
            wh_isobaric: "等压膨胀：P = {p} Pa, ΔV = {dv} m³. 求功 W.",
            wh_isochoric: "等容加热 (体积恒定). 功 W 是多少？",
            wh_isothermal_w: "理想气体的等温膨胀. Q = {q} J. 求 W.",
            wh_area: "PV 图下的面积代表什么物理量？",
            wh_adiabatic_rel: "绝热膨胀：内能减少。温度如何变化？"
        },
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
    },
    
};
