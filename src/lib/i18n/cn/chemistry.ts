/**
 * CN - CHEMISTRY translations
 * Auto-generated from i18n.ts refactoring
 * Last updated: 2026-02-15
 */

export const cnChemistry = {
    gc3_01: {
        back: "返回枢纽",
        title: "GC3.01 // 平衡大师",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "化学平衡",
        next: "执行下一步",
        check: "验证",
        correct: "正确",
        incorrect: "错误",
        ready: "准备就绪",
        monitor_title: "GC3.01_平衡监视器",
        footer_left: "GC3.01_平衡大师 // 节点: 巴塞尔",
        labels: {
            reaction: "可逆反应",
            particle_count: "粒子计数",
            conditions: "条件",
            temperature: "温度",
            pressure: "压强",
            concentration: "[A]",
            principle: "勒夏特列原理",
            principle_1: "• 增加反应物 → 平衡右移（更多产物）",
            principle_2: "• 增加压强 → 平衡向分子数少的方向移动",
            principle_3: "• 升高温度 → 平衡向吸热方向移动",
            add_reactant: "添加反应物 A",
            system_temperature: "系统温度",
            system_pressure: "系统压强"
        },
        mission: {
            title: "任务: 化学平衡",
            description: "掌握勒夏特列原理。观察系统如何响应外界条件变化。"
        },
        stages: {
            concentration: "浓度",
            temperature: "温度",
            pressure: "压力",
            concentration_desc: "添加反应物A并观察平衡移动",
            temperature_desc: "提高温度并观察粒子速度",
            pressure_desc: "改变压力并查看体积效应",
            concentration_hint: "较高的[A]使平衡向右移动 → 产生更多C和D",
            temperature_hint: "高温增加粒子的动能",
            pressure_hint: "高压减小容器体积"
        },
        prompts: {
            shift_dir: "反应 A + B ⇌ C + D 处于平衡状态。如果我们增加 A 的浓度，系统向哪个方向移动？（右=1，左=2）。",
            temp_exothermic: "放热反应释放热量。如果我们增加此类系统的温度，平衡向哪个方向移动？（右=1，左=2）。",
            pressure_moles: "A(g) + B(g) ⇌ C(g)。系统左侧有 2 个气体分子，右侧有 1 个。压力增加时的移动方向？（右=1，左=2）。",
            catalyst_yield: "催化剂会增加产物的平衡产率，还是仅加速达到平衡状态？（产率=1，速度=2）。",
            kc_calculation: "如果平衡时 [A]=0.5M, [B]=0.5M, [C]=1M, [D]=1M，计算 A + B ⇌ C + D 的 Kc。（Kc = [C][D]/[A][B]）。",
            inert_gas: "在恒定体积的系统中加入惰性气体。这会影响平衡位置吗？（会=1，不会=2）。",
            haber_temp: "在哈伯法（放热）中，即使较低温度能获得更高的平衡产率，为什么仍使用 450°C？（速率=1，热力学=2）。",
            endothermic_kc: "对于吸热反应：增加温度会增加 Kc 的值吗？（会=1，不会=2）。"
        },
        scenarios: {
            basel_synthesis: "巴塞尔莱茵河港口化学合成：你是一名在巴塞尔莱茵河港口龙沙 (Lonza) 生产设施工作的工艺工程师。今天，你正在监督乙酸乙酯的大规模合成，这是一种对诺华 (Novartis) 和罗氏 (Roche) 当地药品生产至关重要的溶剂。该反应是一个平衡过程，乙酸和乙醇反应生成产物。目前，该反应器的产量仅为其理论容量的 60%，不足以满足该市实验室的高需求。通过应用勒夏特列原理，你决定增加反应物的浓度。你必须计算在 5000 升反应器中添加 500 升浓乙醇如何使平衡位置向右移动。增加反应物浓度会迫使系统消耗多余的反应物，从而产生更多的乙酸乙酯。这种优化对于维持瑞士的药品供应链至关重要。就像你在游戏中加入更多玩家以加速得分一样，在化学反应中加入更多“玩家”（反应物）会加速目标的产出。",
            haber_process: "工业氮中心 - 巴塞尔：你是巴塞尔大学无机化学研究所的高级研究员。你正在致力于优化哈伯-博施 (Haber-Bosch) 工艺，该工艺利用氮气和氢气合成氨——这是生产全球化肥和药物必不可少的工艺。在你的实验室里，你管理着一个在 200 个大气压下运行的反应器。由于生成氨的前向反应导致气体分子数量减少（4 个反应物分子变成 2 个产物分子），增加压力会使平衡向氨的一侧移动。然而，如果压力降至 150 个大气压以下，产率就会骤降，使该工艺在经济上不可行。你必须精确监控压力表以确保最高效率。这个概念类似于狂欢节期间巴塞尔拥挤的有轨电车：随着更多的人（压力）被强行挤进有轨电车，他们必须挤在一起（向分子较少的一侧移动）以找到稳定状态。",
            buffer_systems: "巴塞尔生物中心：你是巴塞尔大学生物中心 (Biozentrum) 的一名研究生，在一家专注于细胞生物学的世界级实验室工作。你正在生物反应器中培养敏感的人类肝细胞，用于药物毒性测试。这些细胞只能在 7.4 左右的狭窄 pH 范围内存活。为了维持这一点，你使用了一个涉及二氧化碳和碳酸氢根离子的动态平衡生物缓冲系统。如果细胞的新陈代谢产生了过多的酸性废物（质子），平衡必须立即移动以中和它们。你的任务是调整孵化器中的 CO2 分压，以抵消传感器记录到的意外酸度上升。这里的精确平衡控制对你的细胞培养来说确实是生死关头。这就像你身体自身的血液缓冲系统一样，即使在莱茵河畔长跑后也能让你保持稳定。",
            catalysis_innovation: "巴塞尔大学催化小组：你是巴塞尔一家名为“RhineCatalyst”的化学初创公司的创新经理。你的团队开发了一种革命性的非均相催化剂，旨在实现精细化学品的持续生产。虽然催化剂不会改变最终的平衡位置 K，但它会极大地提高达到平衡的速度。在你当前的项目中，在 50°C 下 1 小时达到平衡，而不是在 90°C 下 10 小时，每年可为公司节省超过 10 万瑞士法郎的能源成本。你必须分析反应动力学，以确保系统在冷却水系统达到极限之前稳定下来。这种工业效率正是让巴塞尔始终处于全球化学前沿的原因。把它想象成你在巴塞尔老城地图上的捷径——你最终还是会到达同一个喷泉，但你会以更快的速度和更少的努力到达那里。"
        }
    },
    gc3_02: {
        back: "返回枢纽",
        title: "GC3.02 // 晶体宫殿",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "晶体结构",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "GC3.02_晶体监视器",
        footer_left: "GC3.02_晶体宫殿 // 节点：巴塞尔",
        labels: {
            lattice_type: "晶格类型",
            properties: "性质",
            atoms_per_cell: "原子/晶胞",
            coordination: "配位数",
            packing: "堆积率",
            tet_voids: "四面体空隙",
            voids: "间隙空隙",
            tetrahedral: "四面体",
            octahedral: "八面体",
            formulas: "公式",
            show_voids: "显示间隙空隙",
            slice_plane: "切片平面 (Y轴)",
            reset_slice: "重置"
        },
        mission: {
            title: "任务：固体物理",
            description: "探索晶体结构和布拉维晶格。理解原子堆积和配位。"
        },
        stages: {
            sc: "简单立方",
            bcc: "体心立方",
            fcc: "面心立方",
            sc_desc: "学习简单立方晶格（6配位）",
            bcc_desc: "分析体心立方（8配位）",
            fcc_desc: "掌握面心立方（12配位）",
            sc_hint: "最低的堆积效率 (52%)",
            bcc_hint: "中等堆积 (68%)，如铁、铬等金属",
            fcc_hint: "最高的堆积 (74%)，如铜、铝、金等金属",
        },
        prompts: {
            atoms_per_cell: "计算该晶格每个晶胞的总原子数。",
            coord_num: "该结构中原子的配位数（最近邻数）是多少？",
            pack_eff: "确定该晶系的原子堆积因子 (%)。",
            void_id: "识别该晶胞中可用的四面体空隙数量。"
        },
        scenarios: {
            crystallography_center: "巴塞尔晶体学中心：利用X射线衍射绘制该市实验室发现的新型药物晶体的原子结构。",
            solid_state_research: "巴塞尔物理研究所：研究人员探索体心和面心立方金属的特性，用于下一代航空航天组件。",
            drug_polymorphism: "诺华 (Novartis) 质量控制：不同的晶体堆积（多晶型）会极大地改变药物在体内的溶解方式，使晶格分析成为至关重要的一步。",
            nano_materials: "瑞士纳米科学研究所 (SNI)：在巴塞尔的SNI，科学家在原子水平上工程化晶体结构，以制造用于电子产品的智能材料。"
        }
    },
    gc1_01: {
        back: "返回枢纽",
        title: "GC1.01 // 氧化还原巨人",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "原电池",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "GC1.01_氧化还原监视器",
        footer_left: "GC1.01_氧化还原巨人 // 节点：巴塞尔",
        labels: {
            cell_potential: "电池电势",
            zn_concentration: "Zn²⁺ 浓度",
            cu_concentration: "Cu²⁺ 浓度",
            temperature: "温度",
            show_electrons: "显示电子流动",
            show_ions: "显示离子迁移",
            reaction_quotient: "反应商 (Q)",
            half_reactions: "半反应",
            anode: "阳极",
            cathode: "阴极",
            nernst_equation: "能斯特方程"
        },
        mission: {
            title: "任务：电化学",
            description: "构建原电池并掌握能斯特方程。实时观察电子流动和离子迁移。"
        },
        stages: {
            build: "构建电池",
            measure: "测量电势",
            analyze: "分析反应",
            build_desc: "构建锌铜原电池",
            measure_desc: "使用能斯特方程计算电池电势",
            analyze_desc: "观察氧化还原反应和电子流动",
            build_hint: "锌在阳极被氧化，铜离子在阴极被还原",
            measure_hint: "E = E° - (RT/nF)ln(Q)",
            analyze_hint: "盐桥维持电中性"
        },
        prompts: {
            cell_potential_calc: "已知 E° = 1.10V, [Zn2+] = 1.0M, [Cu2+] = 0.1M。在 298K 时使用 E = E° - (RT/nF)lnQ 计算 E。（ln10 ≈ 2.303）。",
            nernst_q: "对于 Zn + Cu2+ → Zn2+ + Cu，如果 [Zn2+] 增加，电池电位 (E) 会增加还是减少？（增加=1，减少=2）。",
            standard_v: "如果 E°(Cu2+/Cu)=+0.34V 且 E°(Zn2+/Zn)=-0.76V，Zn-Cu 原电池的标准电位 (E°) 是多少？（E° = Ec - Ea）。",
            electron_flow: "在原电池中，电子是从阳极流向阴极，还是反之？（阳极到阴极=1，阴极到阳极=2）。",
            salt_bridge: "原电池中哪个组件通过允许离子迁移来维持电中性？（电压表=1，盐桥=2）。",
            cathode_process: "还原反应（获得电子）发生在哪个电极上？（阳极=1，阴极=2）。",
            zn_reduction: "在标准条件下，锌的还原 (Zn2+ + 2e- → Zn) 是自发过程吗？（是=1，不是=2）。",
            temperature_effect: "根据能斯特方程，增加温度是否总是会增加电池电位？（是=1，不是=2）。"
        },
        scenarios: {
            battery_storage: "巴塞尔能源网：你是一名在巴塞尔市政公用事业公司 (IWB) 工作的能源系统架构师。随着巴塞尔迈向无碳未来的进程，我们正在将大规模钒氧化还原液流电池整合到当地电网中，以储存来自莱茵河风力发电场的剩余能量。与传统电池不同，这些电池将能量储存在液体电解质罐中。你的任务是计算在我们的 B-85 原型反应器中发现的非标准浓度下的理论电池电位 E。如果 V(V) 的浓度为 1.5M，V(IV) 的浓度为 0.5M，这与标准 1.1V 相比如何影响电压？这些储存的能量提供了旋转储备，确保该市的有轨电车在停电期间继续运行。这就像水塔通过将水保持在一定高度来储存能量一样，随时准备在城市口渴时流动。",
            corrosion_protection: "莱茵河桥梁维护：你是巴塞尔土木工程局的一名结构保护专家。你正在检查横跨莱茵河的历史悠久的 Mittlere Brücke 桥。水下钢制支撑容易发生电化学腐蚀，铁原子失去电子形成铁锈。为了防止这种情况，我们使用锌制成的“牺牲阳极”，创建一个原电池，让锌代替桥梁的钢材发生腐蚀。你需要验证河水（电解质）与支撑件之间的电位差是否足够高以维持保护。如果由于季节性径流导致河流离子浓度发生变化，你的保护系统可能会失效，危及这座拥有 800 年历史的地标性建筑的结构完整性。这就像在目标前面放一个护盾；护盾承受攻击（腐蚀），从而保护目标安全。",
            analytical_electrochem: "巴塞尔龙沙：你是巴塞尔城市州实验室的一名法医分析师。我们收到了来自边界附近一个工业地点的样本，怀疑其向莱茵河排放重金属污染物。使用一种称为阳极溶出伏安的技术，你创建了一个微型电化学电池来检测痕量的铜和铅。氧化还原反应过程中产生的电流与污染物浓度成正比。你必须通过测量 1.0M 标准溶液与我们未知样本的电位响应来校准传感器。这里的精确测量对于执行环境法律和保护莱茵河浴场游泳者的莱茵河生态系统至关重要。这种精度就像一台可以检测游泳池里单粒盐的数字天平。",
            fuel_cell_innovation: "瑞士氢枢纽：你是巴塞尔瑞士氢枢纽 (Swiss Hydrogen Hub) 的一名化学工程师。我们正在开发高效质子交换膜 (PEM) 燃料电池，为下一代瑞士国家列车 (SBB) 提供动力。在这些电池中，氢气在阳极被氧化，氧气在阴极被还原，仅产生水和电。你的项目涉及测试一种在 80°C 下运行的新型铂合金催化剂。你必须计算由于跨膜浓度梯度造成的效率损失。如果氢气压力下降，电池电位 E 会根据能斯特方程降低，从而可能导致列车在汝拉 (Jura) 附近的陡峭轨道上抛锚。这项技术代表了欧洲清洁运输的未来，类似于你的笔记本电脑电池为你的工作提供动力，但使用氢气作为终极清洁燃料。"
        }
    },
    gc2_01: {
        back: "返回枢纽",
        title: "GC2.01 // 碳世界",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "分子结构",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "GC2.01_有机监测器",
        footer_left: "GC2.01_碳世界 // 节点：巴塞尔",
        labels: {
            input: "输入",
            hints: "提示",
            formula: "分子式",
            iupac_name: "IUPAC 命名",
            composition: "组成",
            molecular_mass: "分子质量",
            molecule_info: "分子信息",
            select_molecule: "选择分子",
            rotation_speed: "旋转速度",
            rotation_speed_value: "{value}x",
            show_bonds: "显示化学键",
            show_hydrogens: "显示氢原子",
            atom_colors: "原子颜色",
            atom_carbon: "碳 (C)",
            atom_hydrogen: "氢 (H)",
            atom_oxygen: "氧 (O)",
            atom_nitrogen: "氮 (N)",
            bond_types: "键类型",
            bond_single: "单键：C-C",
            bond_double: "双键：C=C",
            bond_triple: "三键：C≡C"
        },
        molecules: {
            methane: "甲烷",
            ethane: "乙烷",
            benzene: "苯",
            glucose: "葡萄糖",
            alanine: "丙氨酸"
        },
        types: {
            alkane: "烷烃",
            aromatic: "芳香族",
            carbohydrate: "碳水化合物",
            amino_acid: "氨基酸"
        },
        mission: {
            title: "任务：有机化学",
            description: "在三维空间中探索有机分子。研究球棍模型、化学键和分子几何结构。"
        },
        stages: {
            alkanes: "烷烃",
            alcohols: "醇类",
            custom: "自定义",
            alkanes_desc: "构建烷烃链 (C-C-C)",
            alcohols_desc: "添加羟基 (C-OH)",
            custom_desc: "自由合成模式"
        },
        hints: {
            select_atom: "点击原子进行选择",
            add_atom: "点击原子工具添加新原子",
            bonds: "原子根据化合价规则连接",
            delete: "使用 DELETE 键删除选中的原子"
        },
        prompts: {
            atom_count: "确定该分子结构中的原子总数。",
            bond_type: "识别当前存在的主要碳-碳键类型。",
            mol_type: "将该分子归类到其有机类别中。",
            functional_id: "在这个 3D 模型中，哪个官能团最突出？"
        },
        scenarios: {
            lonza_methane_cracking: "龙沙巴塞尔 - 原料优化：你是位于巴塞尔龙沙全球总部的化学工程师。我们正在优化我们的甲烷裂解反应器，为绿色能源计划生产高纯度氢气。你的任务是可视化我们甲烷原料的键合结构。在巴塞尔工厂的高压环境中，理解 C-H 键长和四面体几何结构对于防止产量下降至关重要。今天的准确建模确保了龙沙在莱茵河谷可持续化学生产领域的领导地位。这就像检查巨大链条中的每一个环节，以确保整个系统能够承受工业规模合成的张力。",
            roche_aromatic_pipeline: "罗氏巴塞尔 - 环系统合成：你是巴塞尔罗氏大厦的一名高级化学家，这里是瑞士最高的建筑，也是药物研发的中心。你的团队正在开发一类基于取代芳香环的新型抗生素。苯环核心的共振稳定性是药物疗效的基础。使用我们的 3D 可视化工具，你必须验证当前先导化合物中的键离域情况。在巴塞尔竞争激烈的制药领域，预测环张力时的错误可能会使耗资十亿美元的临床试验推迟数年。你的工作弥合了理论有机化学与救命药物之间的鸿沟。可以把它想象成确保复杂摩天大楼的结构完整性——如果基础不稳固，整座建筑都处于危险之中。",
            biozentrum_protein_research: "巴塞尔生物中心 - 分子基础：你是巴塞尔大学生物中心的研究员，是一个研究神经退行性疾病分子基础的世界级团队的成员。你正在分析生命的基石：氨基酸和糖类。理解丙氨酸中氨基和羧基的确切 3D 取向，对于建模蛋白质在人脑中如何折叠至关重要。在巴塞尔这个生物与化学最高水平碰撞的地方，你的空间分析有助于在原子尺度上解码“生命的语言”。你验证的每一个键角都有助于我们对阿尔茨海默病等疾病的理解。这就像组装一个复杂的 3D 拼图，每个碎片的形状决定了最终整个图像如何呈现。"
        }
    },
    sc1_01: {
        back: "返回枢纽",
        title: "C1.01 // 神秘实验室",
        difficulty: {
            basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "物质分析",
        next: "执行下一序列",
        check: "验证",
        correct: "验证通过",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "C1.01_实验室监控器",
        footer_left: "C1.01_神秘实验室 // 节点：巴塞尔",
        labels: {
            input: "输入",
            hints: "提示",
            substance: "物质",
            tool: "测试工具",
            observation: "观察结果"
        },
        mission: {
            title: "粉末鉴定任务",
            description: "利用经典化学测试鉴定神秘白色粉末。掌握定性分析方法。"
        },
        stages: {
            identify: "鉴定",
            properties: "性质",
            reactions: "反应"
        }
    },
    sc1_02: {
        back: "返回枢纽",
        title: "C1.02 // 摩尔大师",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "化学计量控制台",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "不匹配",
        ready: "就绪",
        monitor_title: "C1.02_称重监控",
        footer_left: "C1.02_摩尔大师 // 节点：巴塞尔",
        input_tip_1dp: "提示：输入分数 (如 4/3) 或保留 1 位小数。",
        stages: {
            molar_mass: "摩尔质量",
            stoichiometry: "反应比例",
            yield: "理论产量",
            molar_mass_prompt_latex: "\\text{计算该化合物的摩尔质量。}",
            stoichiometry_prompt_latex: "\\text{利用化学计量关系求产物物质的量。}",
            yield_prompt_latex: "\\text{根据给定质量计算理论产量。}"
        },
        labels: {
            input: "输入",
            scale: "称重读数"
        },
        mission: {
            title: "任务：诺华合成舱",
            description: "校准制药级反应流程。平衡摩尔比例并核对理论产量。"
        }
    },
    sc1_03: {
        back: "返回枢纽",
        title: "SC1.03 // 原子熔炉",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "原子结构",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "SC1.03_原子监视器",
        footer_left: "SC1.03_原子熔炉 // 节点：巴塞尔",
        labels: {
            input: "输入",
            hints: "提示",
            properties: "属性",
            element: "元素",
            atomic_number: "原子序数 (Z)",
            mass_number: "质量数 (A)",
            charge: "电荷",
            periodic_table: "元素周期表",
            protons: "质子 (p⁺)",
            neutrons: "中子 (n⁰)",
            electrons: "电子 (e⁻)"
        },
        mission: {
            title: "任务：赛博熔炉",
            description: "从亚原子粒子构建原子。掌握波尔模型和元素周期表。"
        },
        stages: {
            build: "构建",
            elements: "元素",
            isotopes: "同位素",
            build_desc: "自由模式：构建任意原子配置",
            elements_desc: "探索元素周期表前 20 号元素",
            isotopes_desc: "研究同位素：相同质子数，不同中子数"
        }
    },
    sc1_03_orbitals: {
        back: "返回枢纽",
        title: "SC1.03 // 原子熔炉",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "原子轨道",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "SC1.03_轨道监视器",
        footer_left: "SC1.03_原子熔炉 // 节点：巴塞尔",
        labels: {
            selected_element: "选定元素",
            orbital_type: "轨道类型",
            show_transition: "显示电子跃迁",
            periodic_table: "元素周期表 (Z=1-20)",
            orbital_shapes: "轨道形状",
            quantum_numbers: "量子数"
        },
        mission: {
            title: "任务：量子力学",
            description: "探索电子轨道和概率云。在 3D 空间中可视化 s、p 和 d 轨道。"
        },
        stages: {
            s_orbital: "S 轨道",
            p_orbital: "P 轨道",
            d_orbital: "D 轨道",
            s_desc: "球形概率分布",
            p_desc: "哑铃形轨道 (px, py, pz)",
            d_desc: "四叶草形轨道",
            s_hint: "s 轨道：l=0，球对称",
            p_hint: "p 轨道：l=1，三个方向",
            d_hint: "d 轨道：l=2，五个方向"
        }
    },
    sc1_04: {
        back: "返回枢纽",
        title: "SC1.04 // 元素周期拼图",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "原子结构",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "SC1.04_原子监视器",
        footer_left: "SC1.04_元素周期拼图 // 节点：巴塞尔",
        labels: {
            element_info: "元素信息",
            formulas: "公式",
            protons: "质子",
            neutrons: "中子",
            electrons: "电子",
            select_element: "选择元素"
        },
        mission: {
            title: "任务：元素周期表",
            description: "构建原子并发现元素周期表。掌握电子排布。"
        },
        stages: {
            build: "构建原子",
            periodic: "元素周期表",
            groups: "元素族",
            build_desc: "通过添加质子、中子和电子来构建原子",
            periodic_desc: "探索前 20 个元素",
            groups_desc: "理解元素族和周期",
            build_hint: "质子数决定元素种类",
            periodic_hint: "元素按原子序数排列",
            groups_hint: "同族元素 = 相同价电子数"
        }
    },
    sc1_05: {
        back: "返回中心实验室",
        title: "SC1.05 // 化学键桥",
        check: "验证",
        next: "下一步",
        correct: "键合验证",
        incorrect: "键合失败",
        ready: "就绪",
        monitor_title: "SC1.05_键合实验室",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        stages: {
            ionic: "离子键",
            covalent: "共价键",
            lewis: "路易斯结构"
        },
        labels: {
            na_cl: "Na + Cl -> NaCl",
            h2: "H + H -> H2",
            co2: "C + 2O -> CO2"
        },
        scenarios: {
            ionic_salts: "巴塞尔化学仓库：了解金属与非金属之间的离子键是工业盐和催化剂生产的基础。",
            molecular_oxygen: "莱茵河空气质量站：研究氧气和氮气分子中的共价键，以了解城市大气中的气体交换过程。",
            pharmaceutical_chains: "罗氏 (Roche) 分子设计：在巴塞尔开发新药涉及工程化特定的共价键，以创建精确的分子结构。",
            electrostatic_attraction: "巴塞尔大学物理系：利用先进显微镜研究在原子水平上将离子晶体结合在一起的静电引力。"
        }
    },
    sc2_01: {
        back: "返回枢纽",
        title: "C2.01 // 化学动力学",
        difficulty: {
            basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "动力学数据",
        scenario_title: "巴塞尔场景",
        answer_title: "你的答案",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "C2.01_动力学监视器",
        footer_left: "C2.01_化学动力学 // 节点：巴塞尔",
        stages: {
            arrhenius: "阿伦尼乌斯",
            concentration: "速率定律",
            collision: "半衰期",
            arrhenius_prompt_latex: "\\text{使用阿伦尼乌斯方程计算速率常数 }k\\text{。}",
            concentration_prompt_latex: "\\text{根据浓度变化计算反应速率。}",
            collision_prompt_latex: "\\text{确定有效碰撞的比例。}"
        },
        labels: {
            input: "输入",
            hints: "提示",
            ph: "pH",
            volume: "体积"
        },
        mission: {
            title: "任务：化学动力学实验室",
            description: "在巴塞尔实验室研究反应速率。掌握阿伦尼乌斯方程和碰撞理论。"
        },
        formulas: {
            arrhenius: "k = Ae^{-E_a/RT}",
            concentration: "\\text{速率} = -\\frac{\\Delta[A]}{\\Delta t}",
            collision: "f = e^{-E_a/RT}"
        },
        scenarios: {
            arrhenius: "诺华动力学实验室：研究温度和活化能如何影响反应速率。阿伦尼乌斯方程 k = A·exp(-Ea/RT) 描述了速率常数的温度依赖性。更高的温度增加分子动能，导致更多成功碰撞。",
            rate_law: "罗氏制药研究：从实验数据确定反应级数和速率定律。速率定律表达反应速率如何依赖于反应物浓度。理解速率定律对于优化药物合成和预测反应行为至关重要。",
            half_life: "巴塞尔大学医院：计算药物消除半衰期用于药代动力学。半衰期是数量减少到初始值一半所需的时间。一级动力学在药物代谢中很常见，其中 t₁/₂ = ln(2)/k。"
        },
        problems: {
            arr_temp_300_ea_50: "诺华反应器温度 T=300K，活化能 Ea=50 kJ/mol。计算相对速率常数 k。",
            arr_temp_350_ea_40: "温度升至 350K，Ea=40 kJ/mol。求 k（相对单位）。",
            arr_temp_400_ea_60: "高温反应：T=400K，Ea=60 kJ/mol。计算 k。",
            arr_temp_320_ea_45: "中等条件：T=320K，Ea=45 kJ/mol。确定 k。",
            arr_temp_280_ea_55: "低温合成：T=280K，Ea=55 kJ/mol。求 k。",
            arr_double_temp: "温度从 300K 翻倍到 600K。k 增加多少倍？(Ea=50 kJ/mol)",
            arr_ea_effect: "催化剂将 Ea 从 80 降至 40 kJ/mol（300K）。求 k 比值。",
            arr_ln_form: "使用对数形式：ln(k) = ln(A) - Ea/RT。计算 Ea=50 kJ/mol，T=300K 时的 ln(k)。",
            arr_activation: "两个速率常数在 50K 温度范围内相差 10 倍。求 Ea。",
            arr_catalyst: "催化剂降低 Ea 20 kJ/mol（从 80 到 60）。计算 300K 时的 k 比值。",
            arr_two_temps: "在 300K 和 350K 测量 k。使用 ln(k₂/k₁) = -Ea/R(1/T₂ - 1/T₁) 求 Ea=52 kJ/mol。",
            arr_plot: "阿伦尼乌斯图的斜率为 -7800 K。计算 Ea（斜率 = -Ea/R）。",
            arr_frequency: "已知 k=1.5×10⁻⁹，Ea=50 kJ/mol，T=300K。求指前因子 A。",
            arr_temp_for_k: "目标速率常数 k=10⁶ s⁻¹，Ea=60 kJ/mol。需要什么温度？",
            arr_enzyme: "酶催化反应：Ea=40 kJ/mol，体温 T=310K。计算 k。",
            arr_complex: "两步机理：Ea1=50，Ea2=30 kJ/mol。总 Ea=40 kJ/mol。求 300K 时的 k。",
            arr_pressure: "压力效应：活化体积 ΔV‡=-10 cm³/mol。计算 k 比值。",
            arr_quantum: "量子隧穿校正因子 κ=2.5。求有效 k。",
            arr_isotope: "动力学同位素效应：H vs D 取代。计算 Ea=50 kJ/mol 时的 kH/kD。",
            arr_transition: "过渡态理论：300K 时 k=10⁶ s⁻¹。计算 ΔG‡。",
            rl_first_order: "一级反应：速率 = k[A]。已知 [A]=2.0 M，k=0.5 s⁻¹，求速率。",
            rl_second_order: "二级：速率 = k[A]²。[A]=1.5 M，k=0.4 M⁻¹s⁻¹。计算速率。",
            rl_zero_order: "零级反应：速率 = k（与 [A] 无关）。k=0.8 M/s。求速率。",
            rl_concentration: "一级反应：[A] 翻倍。速率增加多少倍？",
            rl_initial: "初速率法：[A]₀=1.0 M，k=0.6 s⁻¹。计算初速率。",
            rl_mixed: "混合级数：速率 = k[A][B]。[A]=2 M，[B]=3 M，k=0.5 M⁻²s⁻¹。求速率。",
            rl_order: "[A] 翻倍使速率增加 4 倍。反应级数 n 是多少？",
            rl_integrated: "一级积分式：[A]t = [A]₀·e⁻ᵏᵗ。[A]₀=1 M，k=0.1 s⁻¹，t=10 s。求 [A]。",
            rl_time: "一级半衰期：t₁/₂ = ln(2)/k。已知 k=0.05 s⁻¹，求 t₁/₂。",
            rl_constant: "从速率=2 M/s 和 [A]=4 M（一级），确定 k。",
            rl_complex_order: "分数级数：速率 = k[A]^1.5[B]^0.5。[A]=4，[B]=9，k=0.2。求速率。",
            rl_mechanism: "多步：总速率 = k₁k₂/(k₁+k₂)。k₁=0.5，k₂=0.3。计算速率。",
            rl_steady_state: "稳态近似：[I]ss = k₁[A]/k₂。k₁=0.5，k₂=0.2。求 [I]。",
            rl_pre_equilibrium: "预平衡：Keq = kf/kr。kf=0.8，kr=0.2。计算 Keq。",
            rl_inhibition: "竞争性抑制：速率降低因子 (1+[I]/KI)。[I]=2，KI=1。求速率因子。",
            rl_oscillating: "Belousov-Zhabotinsky 振荡反应。循环中最大 [A]。",
            rl_autocatalytic: "自催化：A+B→2B。[A]₀=0.1 M 时拐点在 t=15s。",
            rl_chain: "链式反应：链长 ν = kp/kt。kp/kt=100。求 ν。",
            rl_photochemical: "光化学量子产率 Φ = 反应分子数 / 吸收光子数 = 0.8。",
            rl_enzyme_complex: "Michaelis-Menten：V = Vmax[S]/(KM+[S])。KM=1，[S]=5。求 V/Vmax。",
            hl_first_order: "一级半衰期：t₁/₂ = ln(2)/k = 0.693/k。k=0.1 s⁻¹。求 t₁/₂。",
            hl_second_order: "二级：t₁/₂ = 1/(k[A]₀)。k=0.5 M⁻¹s⁻¹，[A]₀=2 M。计算 t₁/₂。",
            hl_zero_order: "零级：t₁/₂ = [A]₀/(2k)。k=0.4 M/s，[A]₀=4 M。求 t₁/₂。",
            hl_remaining: "2 个半衰期后，剩余多少？[A]₀=8 M → [A]=?",
            hl_time: "75% 衰变意味着 2 个半衰期。若 t₁/₂=10s，总时间 = 20s。",
            hl_find_k: "从 t₁/₂=5s（一级），计算 k = ln(2)/t₁/₂。",
            hl_fraction: "3 个半衰期后：分数 = (1/2)³ = 1/8 = 0.125。",
            hl_radioactive: "放射性衰变：N = N₀(1/2)^(t/t₁/₂)。N₀=1000，t=20s，t₁/₂=10s。求 N。",
            hl_drug: "药物消除：[D]₀=100 mg/L，t₁/₂=4h，t=12h（3 个半衰期）。[D]=12.5 mg/L。",
            hl_compare: "比较两个反应：kA=0.2，kB=0.4。半衰期比 = kB/kA = 2。",
            hl_consecutive: "连续 A→B→C：[B] 最大在 tmax = ln(k₁/k₂)/(k₁-k₂)。k₁=0.5，k₂=0.2。",
            hl_parallel: "平行路径：koverall = k₁+k₂。k₁=0.3，k₂=0.2，t₁/₂ = ln(2)/0.5。",
            hl_reversible: "可逆：[A]eq = [A]₀·kr/(kf+kr)。kf=0.5，kr=0.1。",
            hl_temperature: "t₁/₂ 随温度降低。350K vs 300K，Ea=50 kJ/mol。",
            hl_enzyme: "酶周转：kcat=100 s⁻¹。t₁/₂ = ln(2)/kcat = 0.007s。",
            hl_isotope_dating: "碳-14 定年：N/N₀=0.25 = (1/2)²。年龄 = 2×5730 = 11460 年。",
            hl_branching: "分支衰变：α 和 β 路径。kα/kβ=2，所以 fα = 2/3 = 0.67。",
            hl_secular: "长期平衡：母体 t₁/₂ >> 子体 t₁/₂。活度比 → 1。",
            hl_transient: "瞬态平衡：子体活度峰值时的 tmax。t₁/₂,1=10，t₁/₂,2=2。",
            hl_cosmogenic: "¹⁰Be 宇宙成因定年：t₁/₂=1.39×10⁶ 年。N/N₀=0.5 → 年龄 = t₁/₂。"
        }
    },
    sc2_02: {
        back: "返回枢纽",
        title: "SC2.02 // pH 哨兵",
        difficulty: {
            basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "滴定分析",
        next: "下一次分析",
        check: "验证",
        correct: "滴定准确",
        incorrect: "pH 读取错误",
        ready: "就绪",
        monitor_title: "SC2.02_滴定监控",
        footer_left: "SC2.02_PH_哨兵 // 节点: 巴塞尔",
        stages: {
            curves: "PH 曲线",
            equivalence: "等当点",
            indicators: "指示剂"
        },
        labels: {
            initial_ph: "初始 pH",
            added_vol: "加入体积 (mL)",
            eq_point: "等当点",
            indicator: "指示剂",
            strong_acid: "强酸",
            weak_acid: "弱酸",
            formula: "滴定公式"
        },
        prompts: {
            curve_type: "初始 pH 为 {ph}。识别酸类型（强酸=1，弱酸=2）。",
            find_eq: "若 Va=50mL, Ca=0.1M, Cb=0.2M。求等当点时的 Vb。",
            select_indicator: "弱酸 + 强碱。选择指示剂：酚酞(1)，甲基橙(2)。",
            weak_ph_calc: "在半等当点 (pH = pKa)。若 pKa 为 4.75，pH 是多少？",
            eq_ph_guess: "强酸/强碱滴定的等当点 pH？（<7=1, 7=2, >7=3）。",
            conc_calc: "20mL 未知酸被 10mL 0.2M NaOH 中和。求 Ca。"
        },
        scenarios: {
            water_quality: "巴塞尔 IWB 水过滤厂：你是位于莱茵河畔的巴塞尔市政公用事业公司 (IWB) 水过滤厂的一名水质技术员。你的职责是确保处理后的饮用水 pH 值保持在严格的范围内（通常为 7.2 到 8.5），以防止城市管网发生腐蚀。今天，你正在对来自“Langen Erlen”地下水富集区的样本进行精确滴定。由于近期强降雨影响了河流的矿物质平衡，样本显示酸度略有增加。通过使用标准 NaOH 溶液，你必须确定总酸度（碱度）以校准石灰投加系统。精确的 pH 控制至关重要，因为过酸的水可能会从旧管道中将重金属淋滤到巴塞尔市民的家中。这就像你使用试纸检查游泳池的 pH 值，以保持水质安全清澈一样。",
            biotech_titration: "巴塞尔 CSL Behring - 蛋白质稳定性：你是巴塞尔 CSL Behring 先进设施的一名实验室科学家，致力于纯化用于治疗罕见疾病的血浆衍生蛋白质。这些蛋白质对环境高度敏感；即使是与最佳 pH 值的细微偏差也会导致它们变性或失去治疗效果。在最后的缓冲液交换过程中，你必须进行滴定以验证溶液的缓冲能力。你正在测试当前的弱酸/共轭碱系统是否能在添加少量药物成分时抵抗 pH 值的变化。你的精确性确保了这些救命药物在整个瑞士的运输和储存过程中保持稳定。这种平衡类似于高性能汽车发动机需要合适的机油粘度才能顺畅运行而不会过热。",
            environmental_monitoring: "莱茵河生态研究 - 生物中心：你是巴塞尔大学生物中心 (Biozentrum) 的一名环境研究员，负责监测城市径流对莱茵河脆弱生态系统的影响。由于上游的一个重大工业项目，你需要评估河流的 pH 剖面是否发生了改变，从而可能威胁到莱茵河鲑鱼的产卵地。你在德法瑞三国交界的 Dreiländereck 附近采集样本，并进行详细滴定以识别弱有机酸的存在。你今天生成的滴定曲线形状将揭示这些污染物的浓度。了解这些化学变化对于州立实验室执行环境保护法至关重要。这类似于园丁监测土壤 pH 值，以确保他们的植物能够吸收生长所需的养分。",
            gastro_science: "巴塞尔精致餐饮 - 烹饪化学：你是一名与巴塞尔大巴塞尔区 (Grossbasel) 一家米其林星级餐厅合作的专业食品科学家。现代烹饪高度依赖于对酸度的精确控制，以平衡口味并控制精致酱汁或水果凝胶的质地。你正在分析一种当地特色腌制品中的柠檬酸含量，以确保其保持 3.2 的 pH 值，这对于保持清爽口感和产品的安全保存都至关重要。通过使用食品级碱进行滴定，你可以确定酸的确切浓度。这种科学的方法让厨师在每一份菜品中都能实现完美的粘稠度。这就像你在油腻的菜肴中挤一点柠檬汁——你正在利用化学来平衡味蕾上的味道。"
        }
    },
    sc2_03: {
        back: "返回枢纽",
        title: "SC2.03 // 气体实验室",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "气体性质",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "SC2.03_气体监视器",
        footer_left: "SC2.03_气体实验室 // 节点：巴塞尔",
        labels: {
            pressure: "压力",
            state_variables: "状态变量",
            volume: "体积 (V)",
            temperature: "温度 (T)",
            moles: "摩尔数 (n)",
            formulas: "公式"
        },
        mission: {
            title: "任务：理想气体定律",
            description: "探索理想气体中压力、体积和温度之间的关系。"
        },
        stages: {
            boyle: "波义耳定律",
            charles: "查理定律",
            combined: "联合气体定律",
            boyle_desc: "观察反比关系：P ∝ 1/V",
            charles_desc: "观察正比关系：V ∝ T",
            combined_desc: "掌握联合气体定律",
            boyle_hint: "波义耳定律：减小体积 → 增大压强",
            charles_hint: "查理定律：升高温度 → 增大体积",
            combined_hint: "联合：所有三个变量相互作用"
        },
        scenarios: {
            gas_compression: "巴塞尔工业气体服务：优化瑞士北部工业和医疗用压缩气体的储存。",
            weather_balloons: "巴塞尔大学气象学：利用查理定律预测从该市发射的高空研究气球的膨胀情况。",
            chemical_reactors: "龙沙 (Lonza) 化学工程：在反应器中精确控制压强-体积关系对于安全的高压合成至关重要。"
        }
    },
    sc2_04: {
        back: "返回枢纽",
        title: "SC2.04 // 溶解度实验室",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "溶液状态",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "SC2.04_溶解度监视器",
        footer_left: "SC2.04_溶解度实验室 // 节点：巴塞尔",
        labels: {
            solubility: "溶解度",
            saturated: "饱和 - 正在形成沉淀",
            unsaturated: "未饱和 - 可继续溶解",
            solution_data: "溶液数据",
            temperature: "温度 (°C)",
            solute_amount: "溶质量 (g)",
            formulas: "公式"
        },
        mission: {
            title: "任务：溶解度",
            description: "探索溶解度与温度的关系。观察结晶过程。"
        },
        stages: {
            dissolve: "溶解",
            saturate: "饱和",
            crystallize: "结晶",
            dissolve_desc: "将溶质溶解在水中",
            saturate_desc: "达到饱和点",
            crystallize_desc: "冷却溶液以结晶",
            dissolve_hint: "大多数盐在较高温度下溶解度更高",
            saturate_hint: "饱和：溶解了最大量的溶质",
            crystallize_hint: "冷却导致多余的溶质析出结晶"
        },
        scenarios: {
            pharma_solubility: "诺华 (Novartis) 制剂研究：了解药物溶解度随温度的变化对于开发液体药物和糖浆至关重要。",
            rhine_pollution_monitoring: "巴塞尔环境分析实验室：监测莱茵河水中微量环境污染物在不同季节温度下的溶解度。",
            crystallization_purification: "罗氏 (Roche) 化学生产：大规模结晶是纯化复杂活性药物成分 (API) 的主要方法。"
        }
    },
    sc3_01: {
        back: "返回枢纽",
        title: "C3.01 // 分子建筑师",
        difficulty: {
            basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "分子结构",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "C3.01_分子监视器",
        footer_left: "C3.01_分子建筑师 // 节点：巴塞尔",
        labels: {
            input: "输入",
            hints: "提示",
            atom: "原子",
            bond: "化学键",
            snap: "吸附",
            grid: "网格"
        },
        mission: {
            title: "分子组装实验室",
            description: "使用球棍模型组装药物分子。旋转并观察 3D 结构。"
        },
        stages: {
            aspirin: "阿司匹林",
            caffeine: "咖啡因",
            adrenaline: "肾上腺素"
        },
        scenarios: {
            roche_aspirin: "罗氏巴塞尔 - 合成遗产：你是罗氏大厦的历史档案管理员，正在研究该市合成药物的起源。19 世纪末，F. Hoffmann-La Roche 成为先行者，是首批工业化生产纯合成阿司匹林的公司之一。这一突破革命化了疼痛管理，并为巴塞尔成为全球制药中心奠定了基础。今天，当你组装乙酰水杨酸分子时，你正在重温那些将莱茵河谷转变为分子创新中心的高级化学家的足迹。了解阿司匹林的 3D 几何结构至关重要，因为其官能团的空间排列决定了它如何阻断人体内的酶。这就像发现了一座连接医学与患者康复的桥梁的正确蓝图。",
            novartis_molecular_engineering: "诺华巴塞尔园区 - 靶向治疗：你是一名在诺华园区工作的药物化学家，这里是世界上最先进的研究中心之一。你的项目涉及设计“小分子”抑制剂，能够特异性地针对癌细胞而又不影响健康组织。这种“锁与钥匙”机制完全取决于你所构建的分子的 3D 形状和电子特性。通过旋转和检查球棍模型，你可以确保立体化学结构正确，从而与靶点受体结合。巴塞尔的研究环境提供了必要的协作工具，弥补了抽象化学公式与救命疗法之间的鸿沟。这一过程就像为一个高度复杂的锁定制一把钥匙，只有完美的契合才能解锁治愈方法。",
            basel_nano_hub: "瑞士纳米科学研究所 (SNI) - 原子组装：你是巴塞尔大学瑞士纳米科学研究所的一名研究员，这里的生物学和物理学边界已然模糊。你的工作重点是分子自组装，即通过设计分子使其自发形成复杂的纳米结构。今天，你正在建模一系列功能化碳环，它们将作为一个新型生物传感器的框架。在纳米世界中，管理键角和距离至关重要，因为即使是一皮米的偏差也会改变材料的整体性能。这项工作处于巴塞尔“纳米技术”革命的最前沿，能够创造出更智能、更高效的材料。把它想象成玩乐高积木，但积木是原子，而指令是量子力学定律。",
            lonza_ag_scaling: "龙沙巴塞尔 - 工业放大：你是一名在龙沙巴塞尔全球总部工作的工艺工程师，专门负责从实验室规模合成向大规模生产的过渡。你的任务是确保复杂的有机分子，如特种活性药物成分 (API)，能够在不丧失纯度的情况下实现吨级生产。在巴塞尔巨大的工业反应器中进行高压反应期间，必须保持分子的结构完整性。通过今天准确建立 3D 结构模型，你正在识别制造过程中的潜在“瓶颈”，在这些位置，键张力可能会导致不必要的副反应。你的专业知识使巴塞尔始终处于化学制造卓越水平的最前沿。这就像将一艘船的小型原型扩展为一艘巨大的远洋轮船，同时确保每一个螺栓和板材都完美对齐。",
            basel_biozentrum_neuro: "巴塞尔大学生物中心 (Biozentrum) - 应激反应研究：作为生物中心的一名研究员，你正在调查“战斗或逃跑”反应的分子机制。肾上腺素（Epinephrine）是驱动这一通路的主要激素和神经递质。你的任务包括识别儿茶酚环上氧原子的精确位置，这对于其与肾上腺素能受体的结合亲和力至关重要。通过准确建立这一 3D 结构模型，你将帮助巴塞尔的科学家了解慢性应激如何影响大脑中的细胞信号传导。这种分子图谱是在瑞士顶尖生命科学机构之一开发治疗焦虑相关疾病新方法的基础。"
        }
    },
    sc3_02: {
        back: "返回枢纽",
        title: "SC3.02 // 有机化学基础",
        check: "验证",
        next: "下一个",
        correct: "已验证",
        incorrect: "不匹配",
        ready: "就绪",
        monitor_title: "SC3.02_有机监控",
        footer_left: "SC3.02_有机基础 // 节点：巴塞尔",
        objective_title: "当前任务目标",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        stages: {
            hydrocarbons: "烃类",
            functional_groups: "官能团",
            isomers: "同分异构体"
        },
        labels: {
            molecule_display: "分子显示",
            input_terminal: "输入终端",
            view_3d: "3D视图",
            organic_mastery: "有机化学掌握度"
        },
        prompts: {
            name_formula: "{name}的分子式是什么？",
            functional_group: "{name}中的官能团是什么？",
            isomer_count: "{formula}有多少个同分异构体？",
            hint_carbons: "这个分子有{count}个碳原子",
            hint_group: "在{example}中寻找特征基团",
            hint_isomer: "考虑{type}同分异构体"
        },
        feedback: {
            correct: "理解有机结构！",
            incorrect: "请检查分子结构。"
        },
        scenarios: {
            lonza_feedstock: "龙沙巴塞尔 - 全球供应链：你是龙沙巴塞尔总部的一名物流协调员，负责管理高纯度化学原料的配送。这些中间体分子是数千种产品的基石，从农业化学品到先进电子设备。今天，你正在审查一批新的烃类分子的规格。在巴塞尔化学工业中，即使是对官能团或同分异构体的细微误解，也可能导致生产线上的“不匹配”，从而可能推迟全球药品的运输。通过掌握这些有机基础的命名和结构，你可以确保巴塞尔始终是全球化学合成的可靠支柱。这种协调就像管理一个高速铁路网，每一个开关和信号都必须精确计时，以防止碰撞。",
            basel_polymer_research: "巴塞尔大学 - 先进材料：你是巴塞尔大学的一名材料科学家，专门开发用于医疗植入物的生物相容性聚合物。这些有机材料被当地诊所用于制造定制的支架和关节置换。这些聚合物的性能——它们的强度、柔韧性和降解率——完全由其分子链的排列决定。今天，你正在分析一系列结构异构体，以寻找最能模仿人类骨组织的配置。巴塞尔在聚合物科学领域的丰厚历史，可以追溯到早期的染料工业，为这项前沿研究奠定了基础。这就像设计一种新型织物，线的编织方式决定了它是像凯夫拉纤维一样坚韧，还是像丝绸一样柔软。",
            green_chemistry_initiative: "莱茵河可持续发展项目 - 绿色化学：你是巴塞尔化学财团的一名可持续发展官员，领导一项专注于“绿色化学”的计划。目标是重新设计有机合成工艺，以尽量减少浪费并减少有害溶剂的使用，从而保护莱茵河的水质。今天的任务是识别一种新型生物降解清洁剂中的特定官能团。通过了解这些基团如何与环境相互作用，你可以预测分子在使用后如何分解。巴塞尔对卓越环境的承诺意味着每一次有机反应都必须既干净又高效。这类似于厨师从一次性塑料切换到可堆肥包装——让过程对地球更好，同时不牺牲最终产品的质量。",
            givaudan_fragrance_design: "奇华顿巴塞尔 - 分子的艺术：你是巴塞尔奇华顿公司的一名初级调香师，与世界一级的香氛大师并肩工作。创造一种新香水是艺术直觉与有机化学之间的一场复杂舞蹈。香味中的每一个“音符”实际上都是一个特定的有机分子，通常具有赋予其特征香气的独特官能团，例如醛类的柑橘味或酯类的花香味。今天，你正在对一系列芳香分子进行分类，以便为一款新的奢侈香氛找到完美的添加成分。你的工作确保了奇华顿始终是全球气味创新的领导者，其总部就在巴塞尔。这就像成为一名画家，但你不是在画布上使用色彩，而是使用分子结构来创造嗅觉杰作，唤起人们的记忆和情感。"
        }
    },
    sc3_03: {
        back: "返回枢纽",
        title: "SC3.03 // 有机化学反应",
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
        monitor_title: "SC3.03_反应监控",
        footer_left: "SC3.03_有机化学反应 // 节点: 巴塞尔",
        objective_title: "当前任务目标",
        stages: {
            combustion: "燃烧反应",
            substitution: "取代反应",
            addition: "加成反应"
        },
        labels: {
            reaction_display: "反应显示",
            input_terminal: "输入终端",
            animation_speed: "动画速度",
            show_mechanism: "显示机理",
            chemistry_score: "化学分数"
        },
        prompts: {
            combustion: "{reactant} 的完全燃烧产生 CO₂ 和 H₂O。产生多少个 CO₂ 分子？",
            substitution: "当 {alkane} 在紫外光下与 {halogen} 反应时，主要产物是什么？",
            addition: "当 {alkene} 与 {reagent} 反应时，产物是什么？",
            hint_combustion: "计算反应物中的碳原子数",
            hint_substitution: "一个 H 原子被卤素原子取代",
            hint_addition: "双键打开并加成试剂"
        },
        scenarios: {
            novartis_combustion: "诺华能源实验室 - 热力学优化：你是巴塞尔诺华总部的一名能源效率分析师，负责优化用于大规模药物合成产热的燃烧工艺。通过确保甲烷和其他烃类燃料的完全燃烧，你可以最大化能量输出，同时尽量减少一氧化碳等有害副产物的形成。巴塞尔致力于可持续运营，每一千焦耳的能量都必须得到妥善利用。计算产生的 CO2 理论量是审核设施碳足迹的第一步。这就像是微调一台巨型发动机，燃料是高纯度烃类，目标是绝对效率。",
            basel_chemical_plant: "先正达巴塞尔 - 选择性卤化：你是先正达巴塞尔研究设施的一名工艺化学家，致力于开发新型作物保护剂。你的项目需要在特定烷烃链上进行氢原子与氯或溴原子的选择性取代。这种自由基取代反应在莱茵河畔受控的紫外线照射下引发，是巴塞尔化学集群中有机合成的基石。精度就是一切；多余的一个取代基就可能完全改变分子的生物活性。这项任务类似于大师级钟表匠更换复杂机芯中的单个齿轮——一个精确的改变就能转换系统的整个功能。",
            polymer_production: "龙沙巴塞尔 - 先进加成聚合物：你是龙沙巴塞尔公司的一名聚合物科学家，专门为医疗设备开发高性能材料。你的工作重点是加成反应，即通过双键打开将烯烃聚合为长而稳定的分子链。通过打开乙烯或丙烯等单体的双键，你可以创造出具有手术植入物所需的特定机械性能的材料。巴塞尔悠久的工业化学历史为这种创新提供了完美的生态系统。这一过程就像通过卡扣成千上万个独立的高强度链环来建造一座坚固的长桥。",
            free_radical_mechanism: "巴塞尔大学 - 自由基动力学：作为巴塞尔大学化学系的一名博士生，你正在研究自由基卤化反应的过渡态。在巴塞尔的实验室环境中，你使用先进的激光光谱仪观察卤素自由基攻击烷烃链的瞬时时刻。了解这些快速反应对于设计更安全、更高效的工业工艺至关重要。这就像一名体育摄影师捕捉球击中球棒的精确毫秒瞬间——只不过球是卤素原子，而球棒是碳氢键。",
            reaction_control: "罗氏巴塞尔 - 工艺安全与分析：你是罗氏巴塞尔生产基地的一名安全工程师，负责监测加成反应的放热特性。许多有机反应会释放大量热量，必须在巴塞尔巨大的工业反应器中得到精心管理，以防止“失控”情况。通过准确预测产率和化学计量比，你可以确保冷却系统针对反应规模进行完美校准。你的警惕确保了莱茵河畔设施的安全和高效运行。这就像是一名飞行管制员，每一个参数都必须保持在严格的“包线”内，以确保从反应物到产物的顺利航程。"
        },
        feedback: {
            correct: "反应机理已掌握！",
            incorrect: "请检查反应机理。"
        }
    },
    sc3_05: {
        back: "返回枢纽",
        title: "SC3.05 // 分子熔炉",
        difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
        objective_title: "当前任务目标",
        monitor_title: "轨道稳定性监视器",
        footer_left: "SC3.05_化学键 // 节点：巴塞尔",
        check: "验证",
        next: "下一合成",
        correct: "几何结构已优化",
        incorrect: "化学键不匹配",
        ready: "就绪",
        stages: {
            vsepr: "VSEPR 几何构型",
            hybridization: "轨道杂化理论",
            mo_theory: "分子轨道理论 (MO)"
        },
        labels: {
            electron_density: "电子密度",
            bond_angle: "键角",
            hybrid_type: "杂化类型",
            bond_order: "键级",
            paramagnetism: "磁性属性",
            lone_pairs: "孤电子对",
            bonded_atoms: "成键原子"
        },
        prompts: {
            vsepr_geometry: "确定 {molecule} 的几何构型，该分子具有 {lone} 对孤电子对和 {bonded} 个成键原子。",
            hybridization_type: "在 {molecule} 中，中心原子的杂化轨道类型是什么？",
            bond_order_calc: "使用分子轨道理论计算 {ion} 的键级。",
            paramagnetic: "根据分子轨道理论，{molecule} 是顺磁性还是反磁性？",
            hint_vsepr: "计算中心原子周围的总电子畴数。",
            hint_hybrid: "sp 对应 2 个畴，sp2 对应 3 个，sp3 对应 4 个。",
            hint_mo: "键级 = (成键电子数 - 反键电子数) / 2。",
            hint_paramagnetism: "存在未成对电子会导致顺磁性。"
        },
        scenarios: {
            basel_catalysis: "巴塞尔大学 - 催化中心：研究人员研究催化剂的分子几何结构如何影响反应速率和选择性。",
            syngenta_agrochemicals: "巴塞尔先正达 (Syngenta)：科学家通过优化农药分子的三维几何结构，以实现与受体的最大程度结合。",
            quantum_chem_lab: "瑞士量子化学实验室：利用超级计算机计算新材料设计的分子轨道能量。",
            pharmaceutical_design: "巴塞尔高级药物设计：理解杂化状态对于预测药物先导化合物的反应性至关重要。"
        },
        feedback: {
            correct: "分子几何构型与成键验证通过！",
            incorrect: "结构不稳定。请重新计算轨道相互作用。"
        }
    },
    sc3_04: {
        back: "返回枢纽",
        title: "SC3.04 // 官能团地平线",
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
        monitor_title: "SC3.04_官能团监控",
        footer_left: "SC3.04_官能团地平线 // 节点: 巴塞尔",
        objective_title: "当前任务目标",
        stages: {
            alcohols: "醇与醛",
            acids: "羧酸",
            esters: "酯与性质"
        },
        labels: {
            group_display: "官能团视图",
            property_stats: "分子性质",
            boiling_point: "沸点",
            solubility: "水溶性",
            acidity: "相对酸性"
        },
        prompts: {
            identify_group: "识别 {molecule} 中的官能团。",
            predict_bp: "哪种分子的沸点最高？",
            solubility_check: "{molecule} 是否易溶于水？",
            acid_strength: "比较 {a} 和 {b} 的酸性强弱。"
        },
        scenarios: {
            novartis_fragrance: "诺华香精部门：巴塞尔公园里许多令人愉悦的香气都来自醇和醛。小分子醛通常带有果香或花香，而长链醇则被用作瑞士香水的定香剂。",
            roche_bioactive: "罗氏生物活性实验室：羧酸是巴塞尔发现的许多药物中必不可少的官能团。它们通常作为“酸性头部”与人体内的蛋白质受体结合。",
            basel_flavor: "巴塞尔风味实验室：瑞士糖果的浓郁风味归功于酯类。这些化合物由醇和酸反应生成，创造了特征性的草莓或梨的香气。",
            solubility_science: "诺华溶解度科学：官能团决定了药物是否能溶解在血液中。羟基 (-OH) 通过氢键增加水溶性，这是口服药物的关键因素。",
            molecular_interplay: "巴塞尔分子相互作用：物质的沸点取决于分子间作用力。羧酸形成强氢键二聚体，导致其沸点远高于质量相近的醛类。"
        },
        feedback: {
            correct: "官能团掌握达成！",
            incorrect: "仔细观察分子结构。"
        }
    },
    gc1_02: {
        back: "返回枢纽",
        title: "GC1.02 // 电解实验室",
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
        monitor_title: "GC1.02_电解监控",
        footer_left: "GC1.02_电解实验室 // 节点: 巴塞尔",
        objective_title: "当前任务目标",
        stages: {
            principles: "电解原理",
            plating: "电镀工艺",
            corrosion: "腐蚀控制"
        },
        labels: {
            voltage: "外加电压",
            current: "电流强度 (I)",
            mass_deposited: "析出质量",
            time: "持续时间 (s)",
            power_status: "电源状态"
        },
        prompts: {
            calc_mass: "计算 {current}A 电流在 {time}s 内析出 {metal} 的质量。",
            identify_anode: "在电解 {solution} 时，哪种物质在阳极被氧化？",
            plating_setup: "电镀时，待镀物体应放在哪个电极上？",
            corrosion_protection: "选择保护 {metal} 的最佳牺牲阳极。"
        },
        scenarios: {
            basel_metal_refinery: "巴塞尔金属精炼厂：位于莱茵河港口的工业电解装置从矿石中回收纯金属。通过精确控制槽电压和电流密度，实现了极高的能源效率。",
            swiss_watchmaking: "瑞士钟表制造：巴塞尔工匠制造的手表上的金银电镀采用精密电镀工艺。涂层的厚度根据法拉第第一电解定律确定。",
            rhine_infrastructure: "莱茵河基础设施：保护巴塞尔莱茵河桥梁免受腐蚀需要阴极保护。牺牲性镁块被安装在钢制支柱上，通过优先氧化防止生锈。",
            faraday_law: "法拉第的遗产：迈克尔·法拉第定律量化了电解中电与质量的关系。一法拉第代表一摩尔电子的电荷量，约等于 96,485 库仑。",
            industrial_plating: "工业电镀：巴塞尔工业区的规模化电镀为汽车和航空部件提供耐腐蚀保护。为了环境安全，现在标准工艺采用无氰电镀液。"
        },
        feedback: {
            correct: "掌握电解过程！",
            incorrect: "复习法拉第定律和电极电势。"
        }
    },
    sc2_05: {
        back: "返回主界面",
        title: "SC2.05 // 酸碱化学",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        stages: {
            ph_basics: "pH 基础",
            neutralization: "中和反应",
            titration: "滴定分析"
        },
        scenarios: {
            ph_basics: "诺华制药 pH 控制：您是诺华巴塞尔的配方科学家，正在开发一种新的口服药物。药物的稳定性和生物利用度严重依赖于 pH 值。在胃中（pH 1.5），活性成分必须保持稳定，而在血液中（pH 7.4），它必须快速溶解。您正在测试缓冲系统，以在制造和储存期间维持最佳 pH 范围。使用精密 pH 计和 Henderson-Hasselbalch 计算，您调整弱酸与共轭碱的比例。仅 0.2 个 pH 单位的偏差就可能使整批产品失效，影响瑞士各地数千名患者。这种药物 pH 控制类似于您身体的血液如何维持狭窄的 pH 范围以保持健康。",
            neutralization: "巴塞尔大学医院胃部治疗：您是巴塞尔大学医院的临床药剂师，为严重胃酸反流患者准备抗酸剂配方。胃产生盐酸（HCl），pH 值为 1-2，引起疼痛症状。您的任务是计算中和过量酸所需的碳酸氢钠（NaHCO₃）的确切量，而不会过度到碱性 pH，这可能会引起不同的并发症。您必须考虑患者的胃容量（空腹时约 50mL）和酸浓度。中和反应产生 CO₂ 气体，患者会感觉到打嗝。精确的化学计量计算确保有效缓解，同时最大限度地减少副作用。这就像在厨房里向醋中添加小苏打，但具有医学精度。",
            titration: "罗氏质量控制实验室：您是罗氏巴塞尔总部的质量控制分析师，进行滴定分析以验证新药化合物的纯度。使用校准的滴定管，您逐滴向溶解在水中的药物样品中添加标准化的 NaOH 溶液。pH 电极持续监测溶液，在计算机屏幕上生成滴定曲线。等当点处的急剧 pH 跳跃表明完全中和，使用的滴定剂体积揭示了药物的确切浓度。任何偏离规定纯度（最低 99.5%）的情况都会触发全批次调查。这种分析精度确保每种罗氏药物都符合瑞士药品标准。这就像使用精确的量杯来确保您的食谱每次都完美。"
        },
        prompts: {
            calculate_ph: "计算溶液的 pH 值。",
            find_concentration: "确定酸或碱的浓度。",
            equivalence_point: "找到等当点的体积。",
            buffer_ph: "计算缓冲系统的 pH 值。",
            neutralization_moles: "计算生成产物的摩尔数。"
        },
        labels: {
            acid: "酸",
            base: "碱",
            salt: "盐",
            water: "水",
            ph: "pH",
            concentration: "浓度",
            volume: "体积",
            indicator: "指示剂"
        },
        check: "验证",
        next: "下一题",
        correct: "反应已验证",
        incorrect: "检查平衡",
        ready: "就绪",
        monitor_title: "SC2.05_酸碱监控",
        footer_left: "SC2.05_酸碱化学 // 节点: 巴塞尔",
        scenario_title: "巴塞尔场景",
        objective_title: "问题",
        answer_title: "您的答案"
    },
    sc2_06: {
        back: "返回主界面",
        title: "SC2.06 // 氧化还原反应",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        stages: {
            oxidation_state: "氧化态",
            electron_transfer: "电子转移",
            electrochemistry: "电化学"
        },
        scenarios: {
            oxidation_state: "诺华药物合成氧化控制：您是诺华巴塞尔的合成化学家，从事复杂的药物合成工作。活性成分需要对过渡金属催化剂进行精确的氧化态控制。在您当前的反应中，锰在 +4 和 +7 氧化态之间循环，以促进 C-H 键活化。您必须跟踪每个步骤的氧化态变化，以防止不需要的副反应。使用光谱分析，您监测高锰酸盐（Mn⁷⁺）的紫色转化为棕色二氧化锰（Mn⁴⁺）。单个电子计算错误可能导致有毒副产物，使整批产品无法使用。这种氧化态跟踪对于为瑞士各地的患者生产安全有效的药物至关重要。理解氧化态就像跟踪银行账户余额——您需要确切知道每个原子获得或失去了多少电子。",
            electron_transfer: "罗氏电池技术开发：您是罗氏巴塞尔能源研究部门的材料科学家，为医疗设备开发下一代锂离子电池。电池的正极材料（LiCoO₂）在充放电循环期间经历可逆电子转移。随着锂离子进出，钴在 +3 和 +4 氧化态之间交替。您必须平衡氧化还原方程以优化能量密度和循环寿命。每个电池单元必须在 500 多个充电周期中精确提供 3.7V，以可靠地为便携式胰岛素泵和心脏监护仪供电。电子转移效率直接影响患者安全——关键医疗设备中的电池故障可能危及生命。这类似于可充电手机电池，但具有医疗级精度和可靠性要求。",
            electrochemistry: "巴塞尔工业电镀传统：您是巴塞尔金属精加工公司的工艺工程师，延续该市 500 年的精密金属加工传统。今天，您正在为手术器械电镀一层薄金层，以提高耐腐蚀性和生物相容性。使用能斯特方程，您计算在不锈钢镊子上沉积恰好 2.5 微米金所需的电池电位。电化学电池在 1.5V 下运行，电流密度受到仔细控制。电流过大会导致粗糙、多孔的沉积物；电流过小会延长处理时间，经济上不划算。您应用法拉第定律确定 3.2 安培持续 45 分钟将沉积所需质量。这种电化学精度确保巴塞尔制造的手术工具符合国际医疗标准，并保持该市的质量工艺声誉。"
        },
        prompts: {
            oxidation_state: "{formula} 中 {element} 的氧化态是多少？",
            oxidation_state_complex: "确定配合物 {formula} 中 {element} 的氧化态。",
            oxidation_state_organic: "有机化合物 {formula} 中 {element} 的氧化态是多少？",
            oxidizing_agent: "在反应 {reaction} 中，识别氧化剂。",
            reducing_agent: "在反应 {reaction} 中，识别还原剂。",
            electrons_transferred: "半反应 {reaction} 中转移了多少电子？",
            half_reaction: "在指定介质中平衡半反应：{half}。涉及多少电子？",
            disproportionation: "在歧化反应 {reaction} 中，总共转移了多少电子？",
            anode_process: "原电池的阳极发生什么过程？",
            cathode_process: "原电池的阴极发生什么过程？",
            electron_flow: "在外电路中，电子从哪个电极流出？",
            salt_bridge: "什么物质通过盐桥移动？",
            positive_electrode: "原电池中哪个电极是正极？",
            cell_potential: "计算电池的标准电池电位 E°：{cell}",
            nernst_equation: "使用能斯特方程，计算电池电位：{cell}",
            faraday_law: "当 {current}A 电流流过 {time}s 时，沉积多少克 {substance}？"
        },
        labels: {
            input_answer: "输入您的答案",
            reaction: "反应方程",
            oxidation_state: "氧化态",
            electrons: "转移电子数",
            cell_potential: "电池电位",
            regional_case: "区域案例研究 // 巴塞尔节点"
        },
        mission: {
            title: "氧化还原任务"
        },
        check: "验证",
        next: "下一题",
        correct: "氧化还原已验证",
        incorrect: "检查电子平衡",
        ready: "就绪",
        monitor_title: "SC2.06_氧化还原监控",
        footer_left: "SC2.06_氧化还原 // 节点: 巴塞尔"
    }
};
