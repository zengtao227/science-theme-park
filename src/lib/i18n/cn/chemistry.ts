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
            system_pressure: "系统压强",
            input_answer: "输入答案",
            placeholder: "输入 1 或 2",
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
        lab_ui: {
            "mystery_lab": "神秘实验室",
            "select_tool": "选择工具",
            "lab_notes": "实验记录",
            "no_tests": "暂无测试记录...",
            "tests_count": "次测试",
            "protocol": "侦探协议:",
            "instruction": "先选择工具，再点击粉末进行测试。根据反应现象判断哪一个是小苏打、食盐或淀粉！",
            "tools": {
                "water": "水",
                "vinegar": "醋",
                "fire": "火",
                "iodine": "碘液"
            },
            "substances": {
                "soda": "小苏打 (NaHCO_3)",
                "salt": "食盐 (NaCl)",
                "starch": "淀粉 (C_6H_1₀O_5)ₙ",
                "powder_a": "粉末 A",
                "powder_b": "粉末 B",
                "powder_c": "粉末 C"
            },
            "results": {
                "soda_water": "微溶于水",
                "soda_vinegar": "产生大量气泡 (CO_2)!",
                "soda_fire": "无明显变化",
                "soda_iodine": "无颜色变化",
                "salt_water": "完全溶解",
                "salt_vinegar": "溶解，无气泡",
                "salt_fire": "高温下熔化",
                "salt_iodine": "无颜色变化",
                "starch_water": "形成浑浊混合物",
                "starch_vinegar": "无反应",
                "starch_fire": "燃烧/碳化",
                "starch_iodine": "变成蓝黑色！",
                "no_reaction": "无反应"
            }
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
            zn_concentration: "Zn^{2}^+ 浓度",
            cu_concentration: "Cu^{2}^+ 浓度",
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
        title: "SC1.01 // 神秘实验室",
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
        monitor_title: "SC1.01_实验室监控器",
        footer_left: "SC1.01_神秘实验室 // 节点：巴塞尔",
        lab_ui: {
            mystery_lab: "神秘实验室",
            select_tool: "选择工具",
            lab_notes: "实验记录",
            no_tests: "暂无测试记录...",
            tests_count: "次测试",
            protocol: "侦探协议:",
            instruction: "先选择工具，再点击粉末进行测试。根据反应现象判断哪一个是小苏打、食盐或淀粉！",
            tools: { water: "水", vinegar: "醋", fire: "火", iodine: "碘液" },
            substances: {
                soda: "小苏打 (NaHCO_3)", salt: "食盐 (NaCl)", starch: "淀粉 (C_6H_1₀O_5)ₙ",
                powder_a: "粉末 A", powder_b: "粉末 B", powder_c: "粉末 C"
            },
            results: {
                soda_water: "微溶于水", soda_vinegar: "产生大量气泡 (CO_2)!", soda_fire: "无明显变化", soda_iodine: "无颜色变化",
                salt_water: "完全溶解", salt_vinegar: "溶解，无气泡", salt_fire: "高温下熔化", salt_iodine: "无颜色变化",
                starch_water: "形成浑浊混合物", starch_vinegar: "无反应", starch_fire: "燃烧/碳化", starch_iodine: "变成蓝黑色！",
                no_reaction: "无反应"
            }
        },
        labels: {
            input: "输入",
            hints: "提示",
            substance: "物质",
            tool: "测试工具",
            observation: "观察结果",
            method: "方法",
            hint: "提示"
        },
        hints: {
            soda: "小苏打：与醋反应产生气泡 (CO_2)",
            starch: "淀粉：与碘反应变蓝黑色",
            salt: "食盐：完全溶于水"
        },
        mission: {
            title: "粉末鉴定任务",
            description: "利用经典化学测试鉴定神秘白色粉末。掌握定性分析方法。"
        },
        stages: {
            identify: "鉴定",
            properties: "性质",
            reactions: "反应",
            experiment: "实验设计"
        },
        prompts: {
            identify_powders: "鉴定三种白色粉末",
            use_tools: "使用工具：水、醋、火、碘液",
            test_observe: "测试并观察结论",
            answer: "答案内容",
            powder_a: "粉末 A 属于",
            powder_b: "粉末 B 属于",
            powder_c: "粉末 C 属于",
            product: "主要反应产物",
            review_design: "查阅右侧实验设计方案。",
            understood: "明白了吗？",
            confirm_1: "输入 1 确认"
        },
        properties_q: {
            basic_0: "哪种粉末与醋反应产生气泡？",
            basic_1: "哪种粉末遇碘变蓝黑色？",
            basic_2: "哪种粉末在水中完全溶解？",
            basic_3: "哪种粉末是白色的结晶体？",
            basic_4: "哪种粉末遇酸会产生气泡？",
            core_0: "哪种粉末会产生二氧化碳(CO_2)气体？",
            core_1: "哪种粉末会形成胶体悬浮液？",
            core_2: "哪种粉末的溶解度最高？",
            core_3: "哪种粉末与乙酸(醋酸)反应？",
            core_4: "哪种粉末是多糖？",
            advanced_0: "哪种粉末是碳酸氢钠？",
            advanced_1: "哪种粉末是氯化钠？",
            advanced_2: "哪种粉末是碳水化合物聚合物？",
            advanced_3: "哪种粉末会释放碳酸？",
            advanced_4: "哪种粉末形成离子溶液？",
            elite_0: "哪种粉末的化学式为NaHCO_3？",
            elite_1: "哪种粉末的化学式为NaCl？",
            elite_2: "哪种粉末的化学式为(C_6H_1₀O_5)ₙ？",
            elite_3: "哪种粉末经历酸碱中和反应？",
            elite_4: "哪种粉末形成三碘络合物？"
        },
        reactions_q: {
            basic_0: "小苏打 + 醋的反应",
            basic_1: "淀粉 + 碘测试",
            basic_2: "食盐溶于水",
            basic_3: "小苏打加热",
            basic_4: "淀粉水解",
            core_0: "小苏打的完全中和",
            core_1: "淀粉-碘络合物的形成",
            core_2: "食盐结晶",
            core_3: "小苏打的分解温度",
            core_4: "淀粉的酶解过程",
            advanced_0: "小苏打与强酸反应",
            advanced_1: "淀粉的完全水解",
            advanced_2: "食盐溶液电解",
            advanced_3: "小苏打缓冲系统",
            advanced_4: "淀粉糊化",
            elite_0: "小苏打在血液pH调节中的作用",
            elite_1: "淀粉-碘络合物结构",
            elite_2: "食盐在索尔维制碱法中的应用",
            elite_3: "小苏打的热分解动力学",
            elite_4: "淀粉的老化过程"
        },
        experiments: {
            ph_analysis: {
                title: "莱茵河水体缓冲能力分析",
                context: "巴塞尔环境局：分析莱茵河水体的pH缓冲能力...",
                purpose: "测定本地水样是否能抵抗pH值的变化。",
                materials: ["莱茵河水样", "通用指示剂", "0.1M 盐酸", "0.1M 氢氧化钠", "烧杯"],
                procedure: ["1. 将50mL水样倒入烧杯。", "2. 加入2滴通用指示剂。", "3. 逐滴加入HCl进行滴定。", "4. 记录颜色变化所需的滴数。"],
                expectedResults: "含有碳酸钙的本地水应该提供中等程度的缓冲能力。",
                safetyWarning: "请佩戴护目镜。强酸强碱具有腐蚀性。",
                action: "分析莱茵河水样。",
                target: "缓冲能力"
            },
            salt_purification: {
                title: "Schweizerhalle 盐矿提纯",
                context: "Schweizerhalle 盐矿：提纯从深井中提取的岩盐混合物...",
                purpose: "从粗盐混合物中提取高纯度的氯化钠(NaCl)。",
                materials: ["粗盐", "水", "滤纸", "漏斗", "蒸发皿", "本生灯"],
                procedure: ["1. 研磨粗盐以增加表面积。", "2. 溶于温水中以充分溶解食盐。", "3. 过滤去除不溶性杂质（泥沙等）。", "4. 将滤液倒入蒸发皿中加热至结晶。"],
                expectedResults: "水分蒸发后，蒸发皿中将留下白色的立方体NaCl晶体。",
                safetyWarning: "热蒸发皿有烫伤危险，请使用实验钳操作。",
                action: "提纯岩盐。",
                target: "结晶"
            }
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
            scale: "天平读数",
            formula: "化学式",
            atoms: "原子量",
            reaction: "化学反应",
            given: "已知条件",
            amount: "物质的量",
            mass: "质量",
            molar: "摩尔质量"
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
            protons: "质子 (p^+)",
            neutrons: "中子 (n⁰)",
            electrons: "电子 (e^-)"
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
            half_life: "巴塞尔大学医院：计算药物消除半衰期用于药代动力学。半衰期是数量减少到初始值一半所需的时间。一级动力学在药物代谢中很常见，其中 t_1/_2 = ln(2)/k。"
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
            arr_two_temps: "在 300K 和 350K 测量 k。使用 ln(k_2/k_1) = -Ea/R(1/T_2 - 1/T_1) 求 Ea=52 kJ/mol。",
            arr_plot: "阿伦尼乌斯图的斜率为 -7800 K。计算 Ea（斜率 = -Ea/R）。",
            arr_frequency: "已知 k=1.5×10^-^9，Ea=50 kJ/mol，T=300K。求指前因子 A。",
            arr_temp_for_k: "目标速率常数 k=10^6 s^-¹，Ea=60 kJ/mol。需要什么温度？",
            arr_enzyme: "酶催化反应：Ea=40 kJ/mol，体温 T=310K。计算 k。",
            arr_complex: "两步机理：Ea1=50，Ea2=30 kJ/mol。总 Ea=40 kJ/mol。求 300K 时的 k。",
            arr_pressure: "压力效应：活化体积 ΔV‡=-10 cm^{3}/mol。计算 k 比值。",
            arr_quantum: "量子隧穿校正因子 κ=2.5。求有效 k。",
            arr_isotope: "动力学同位素效应：H vs D 取代。计算 Ea=50 kJ/mol 时的 kH/kD。",
            arr_transition: "过渡态理论：300K 时 k=10^6 s^-¹。计算 ΔG‡。",
            rl_first_order: "一级反应：速率 = k[A]。已知 [A]=2.0 M，k=0.5 s^-¹，求速率。",
            rl_second_order: "二级：速率 = k[A]^{2}。[A]=1.5 M，k=0.4 M^-¹s^-¹。计算速率。",
            rl_zero_order: "零级反应：速率 = k（与 [A] 无关）。k=0.8 M/s。求速率。",
            rl_concentration: "一级反应：[A] 翻倍。速率增加多少倍？",
            rl_initial: "初速率法：[A]₀=1.0 M，k=0.6 s^-¹。计算初速率。",
            rl_mixed: "混合级数：速率 = k[A][B]。[A]=2 M，[B]=3 M，k=0.5 M^-^{2}s^-¹。求速率。",
            rl_order: "[A] 翻倍使速率增加 4 倍。反应级数 n 是多少？",
            rl_integrated: "一级积分式：[A]t = [A]₀·e^-ᵏᵗ。[A]₀=1 M，k=0.1 s^-¹，t=10 s。求 [A]。",
            rl_time: "一级半衰期：t_1/_2 = ln(2)/k。已知 k=0.05 s^-¹，求 t_1/_2。",
            rl_constant: "从速率=2 M/s 和 [A]=4 M（一级），确定 k。",
            rl_complex_order: "分数级数：速率 = k[A]^1.5[B]^0.5。[A]=4，[B]=9，k=0.2。求速率。",
            rl_mechanism: "多步：总速率 = k_1k_2/(k_1+k_2)。k_1=0.5，k_2=0.3。计算速率。",
            rl_steady_state: "稳态近似：[I]ss = k_1[A]/k_2。k_1=0.5，k_2=0.2。求 [I]。",
            rl_pre_equilibrium: "预平衡：Keq = kf/kr。kf=0.8，kr=0.2。计算 Keq。",
            rl_inhibition: "竞争性抑制：速率降低因子 (1+[I]/KI)。[I]=2，KI=1。求速率因子。",
            rl_oscillating: "Belousov-Zhabotinsky 振荡反应。循环中最大 [A]。",
            rl_autocatalytic: "自催化：A+B→2B。[A]₀=0.1 M 时拐点在 t=15s。",
            rl_chain: "链式反应：链长 ν = kp/kt。kp/kt=100。求 ν。",
            rl_photochemical: "光化学量子产率 Φ = 反应分子数 / 吸收光子数 = 0.8。",
            rl_enzyme_complex: "Michaelis-Menten：V = Vmax[S]/(KM+[S])。KM=1，[S]=5。求 V/Vmax。",
            hl_first_order: "一级半衰期：t_1/_2 = ln(2)/k = 0.693/k。k=0.1 s^-¹。求 t_1/_2。",
            hl_second_order: "二级：t_1/_2 = 1/(k[A]₀)。k=0.5 M^-¹s^-¹，[A]₀=2 M。计算 t_1/_2。",
            hl_zero_order: "零级：t_1/_2 = [A]₀/(2k)。k=0.4 M/s，[A]₀=4 M。求 t_1/_2。",
            hl_remaining: "2 个半衰期后，剩余多少？[A]₀=8 M → [A]=?",
            hl_time: "75% 衰变意味着 2 个半衰期。若 t_1/_2=10s，总时间 = 20s。",
            hl_find_k: "从 t_1/_2=5s（一级），计算 k = ln(2)/t_1/_2。",
            hl_fraction: "3 个半衰期后：分数 = (1/2)^{3} = 1/8 = 0.125。",
            hl_radioactive: "放射性衰变：N = N₀(1/2)^(t/t_1/_2)。N₀=1000，t=20s，t_1/_2=10s。求 N。",
            hl_drug: "药物消除：[D]₀=100 mg/L，t_1/_2=4h，t=12h（3 个半衰期）。[D]=12.5 mg/L。",
            hl_compare: "比较两个反应：kA=0.2，kB=0.4。半衰期比 = kB/kA = 2。",
            hl_consecutive: "连续 A→B→C：[B] 最大在 tmax = ln(k_1/k_2)/(k_1-k_2)。k_1=0.5，k_2=0.2。",
            hl_parallel: "平行路径：koverall = k_1+k_2。k_1=0.3，k_2=0.2，t_1/_2 = ln(2)/0.5。",
            hl_reversible: "可逆：[A]eq = [A]₀·kr/(kf+kr)。kf=0.5，kr=0.1。",
            hl_temperature: "t_1/_2 随温度降低。350K vs 300K，Ea=50 kJ/mol。",
            hl_enzyme: "酶周转：kcat=100 s^-¹。t_1/_2 = ln(2)/kcat = 0.007s。",
            hl_isotope_dating: "碳-14 定年：N/N₀=0.25 = (1/2)^{2}。年龄 = 2×5730 = 11460 年。",
            hl_branching: "分支衰变：α 和 β 路径。kα/kβ=2，所以 fα = 2/3 = 0.67。",
            hl_secular: "长期平衡：母体 t_1/_2 >> 子体 t_1/_2。活度比 → 1。",
            hl_transient: "瞬态平衡：子体活度峰值时的 tmax。t_1/_2,1=10，t_1/_2,2=2。",
            hl_cosmogenic: "¹⁰Be 宇宙成因定年：t_1/_2=1.39×10^6 年。N/N₀=0.5 → 年龄 = t_1/_2。"
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
        },
        prompts: {
            bvb_brake: "BVB 电车制动：空气 V={V} L 在 P={P} bar。压缩至 V2={V2} L。计算新压力 P2。",
            euroairport: "EuroAirport 机舱：T1={t1} K, P1={p1} kPa 的空气样本。在高度 T2={t2} K, P2={p2} kPa 下。求体积比 V2/V1。",
            wickelfisch: "莱茵河游泳袋 (Wickelfisch)：空气 V={v1} L 在 T1={t1} K (阳光下)。浸入 T2={t2} K 水中。新体积 V2？",
            fire_dept: "巴塞尔消防队：氧气罐 V={V} L, P={P} bar。消耗率 {r} L/min (1 bar 下)。持续时间 (分钟)？",
            geothermal: "巴塞尔地热：甲烷气泡从深处 (P1={p1} bar, T1={t1} K) 升至表面 (P2=1 bar, T2={t2} K)。膨胀倍数？"
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
            combustion: "{reactant} 的完全燃烧产生 CO_2 和 H_2O。产生多少个 CO_2 分子？",
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
            neutralization: "巴塞尔大学医院胃部治疗：您是巴塞尔大学医院的临床药剂师，为严重胃酸反流患者准备抗酸剂配方。胃产生盐酸（HCl），pH 值为 1-2，引起疼痛症状。您的任务是计算中和过量酸所需的碳酸氢钠（NaHCO_3）的确切量，而不会过度到碱性 pH，这可能会引起不同的并发症。您必须考虑患者的胃容量（空腹时约 50mL）和酸浓度。中和反应产生 CO_2 气体，患者会感觉到打嗝。精确的化学计量计算确保有效缓解，同时最大限度地减少副作用。这就像在厨房里向醋中添加小苏打，但具有医学精度。",
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
            oxidation_state: "诺华药物合成氧化控制：您是诺华巴塞尔的合成化学家，从事复杂的药物合成工作。活性成分需要对过渡金属催化剂进行精确的氧化态控制。在您当前的反应中，锰在 +4 和 +7 氧化态之间循环，以促进 C-H 键活化。您必须跟踪每个步骤的氧化态变化，以防止不需要的副反应。使用光谱分析，您监测高锰酸盐（Mn^7^+）的紫色转化为棕色二氧化锰（Mn^{4}^+）。单个电子计算错误可能导致有毒副产物，使整批产品无法使用。这种氧化态跟踪对于为瑞士各地的患者生产安全有效的药物至关重要。理解氧化态就像跟踪银行账户余额——您需要确切知道每个原子获得或失去了多少电子。",
            electron_transfer: "罗氏电池技术开发：您是罗氏巴塞尔能源研究部门的材料科学家，为医疗设备开发下一代锂离子电池。电池的正极材料（LiCoO_2）在充放电循环期间经历可逆电子转移。随着锂离子进出，钴在 +3 和 +4 氧化态之间交替。您必须平衡氧化还原方程以优化能量密度和循环寿命。每个电池单元必须在 500 多个充电周期中精确提供 3.7V，以可靠地为便携式胰岛素泵和心脏监护仪供电。电子转移效率直接影响患者安全——关键医疗设备中的电池故障可能危及生命。这类似于可充电手机电池，但具有医疗级精度和可靠性要求。",
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
    },
    sc1_06: {
        scenarios: {
            RT_BASIC_1: "在莱茵河畔的巴塞尔水处理厂，化学系学生 Emma 在电解演示中观察水分子的形成。该设施每天为巴塞尔的 17.5 万居民处理 18 万立方米的水。该厂首席化学家 Weber 博士解释道，虽然他们通常会将水分解为氢气和氧气以进行净化测试，但其逆反应——即氢气和氧气结合形成水——会释放出巨大的能量。这种化合反应是理解燃料电池技术的基础，诺华（Novartis）正在研究该技术，将其作为其制药生产过程中的可持续能源解决方案。Emma 了解到，这个简单的反应正是巴塞尔大学化学系正在测试的氢燃料电池的动力来源，用于未来的清洁能源应用。",
            RT_BASIC_2: "在巴塞尔大学的化学实验室中，Müller 教授向她的中学生班级演示了电解实验。她使用霍夫曼电解器，将电流通过水，将其分解为氢气和氧气。学生们观察到电极上形成的泡泡——氢气的体积是氧气的两倍，这与水分子的 H_2O 比例完全吻合。这种分解反应对于生产纯氢气至关重要，罗氏（Roche）在其药物合成过程中广泛使用这些氢气。实验室位于诺华园区附近历史悠久的圣约翰区，在那里传授化学基础知识已有 150 多年的历史。学生们了解到，这种反应需要能量输入（吸热），这与释放能量的化合反应截然不同。",
            RT_BASIC_3: "在莱茵河畔的巴塞尔环境监测站，技术员 Marco 正在分析空气质量数据。他向参观的学生们解释说，当闪电提供足够的能量使空气中的氮气和氧气结合时，就会自然形成一氧化氮（NO）。同样的化合反应也发生在高温下的汽车发动机中，造成了巴塞尔的空气污染。该市密切监测 NO 浓度，尤其是靠近穿越巴塞尔的繁忙 A2 高速公路。诺华和罗氏都有严格的排放控制，以尽量减少其设施中的 NO 产生。了解这种化合反应有助于学生们理解为什么巴塞尔投资 4500 万瑞士法郎用于公共交通，以减少汽车排放，改善全市 17.5 万居民的空气质量。",
            RT_BASIC_4: "在巴塞尔建筑材料实验室，工程师 Sarah 演示了石灰石（碳酸钙）分解生产生石灰（氧化钙）的过程。当在窑中加热到 900°C 时，石灰石会分解并释放二氧化碳气体。这种分解反应对于生产水泥至关重要，巴塞尔在包括罗氏塔（Roche Tower，高178米，瑞士最高建筑）和著名的诺华园区在内的大型建筑项目中广泛使用这些水泥。该实验室位于 Kleinhüningen 工业区，为巴塞尔的建筑项目测试材料。Sarah 解释说，这种反应需要大量的热能，因此是吸热反应。学生们了解到释放的 CO_2 会导致温室气体排放，这也是巴塞尔建筑行业正在研究更多可持续替代方案的原因。",
            RT_BASIC_5: "在巴塞尔圣约翰区的诺华研究实验室，化学家 Chen 博士向参观的中学生演示了镁在氧气中燃烧时产生的耀眼白光。这种化合反应形成氧化镁并释放强烈的能量，因此是放热反应。这一演示吸引了正在学习反应类型的学生。Chen 博士解释说，镁的反应性使其在药物合成中非常有用，而受控的氧化反应在其中至关重要。实验室利用这种反应教授安全规程——镁火无法用水扑灭，需要专门的 D 类灭火器。学生们了解到，理解化合反应是药物化学的基础，诺华每年在其巴塞尔设施中合成 200 多种不同的药物化合物，服务于全球各地的患者。",
            RT_CORE_1: "在诺华金属反应性实验室，研究员 Hoffmann 博士向化学系学生演示置换反应。当将锌金属加入盐酸时，随着氢气的释放和溶液中氯化锌的形成，会产生剧烈的气泡。这种反应对于理解金属活动性顺序至关重要，它指导着制药化学家选择合适的反应容器和设备。该实验室配备了最先进的通风橱，每月处理 500 多种用于药物开发的金属相关反应。Hoffmann 博士解释说，锌在活动性顺序中的位置使其比氢更活泼，从而能够将氢从酸中置换出来。这一原理被应用于诺华合成含锌药物化合物，这些化合物被用于分销至整个瑞士和欧洲的营养补充剂中。",
            RT_CORE_2: "在罗氏位于巴塞尔 Grenzacherstrasse 的质量控制实验室中，分析师 Maria 使用硝酸银和氯化钠进行沉淀测试。当两种澄清溶液混合时，会立即形成氯化银白色沉淀——这是一种经典的复分解反应。该测试对于检测药品中的氯化物污染至关重要。该实验室每月进行 10,000 多次质量控制测试，确保罗氏的药物符合严格的纯度标准。Maria 解释说，在复分解反应中，正负离子交换伙伴形成新化合物。氯化银沉淀非常难溶，即使是极少量的氯化物也能被检测到，这使得这种反应在药物质量保证中具有极高的价值。学生们了解到，此类分析技术有助于维护巴塞尔制药卓越的声誉。",
            RT_CORE_3: "在巴塞尔大学化学研究所，Schmidt 教授演示了一个极具视觉冲击力的置换反应。当将铜线放入硝酸银溶液中时，美丽的银晶体开始在铜表面生长，而溶液由于生成硝酸铜(II)而变成蓝色。这种反应说明了金属活动性顺序——铜比银更活泼，并将其从溶液中置换出来。该演示是大学外展计划的一部分，每年接待 2,000 名中学生。Schmidt 教授解释说，同样的原理也应用于巴塞尔工业设施的电镀工艺中。了解置换反应对于药物合成至关重要，其中选择性金属置换反应被用于纯化化合物。该大学的化学系培养出了三位诺贝尔奖获得者，强调对基本反应类型的手动学习。",
            RT_CORE_4: "在莱茵河附近的巴塞尔水质检测中心，技术员 Thomas 使用复分解反应来检测硫酸盐污染。当向含有硫酸钠的水样中加入氯化钡溶液时，会立即形成硫酸钡白色沉淀。该测试对于监测莱茵河水质至关重要，因为硫酸盐含量会影响水生生态系统。中心每周对巴塞尔 21 公里莱茵河沿线的各个采样点进行 500 次水样分析。Thomas 解释说，硫酸钡极难溶解，这使得这种复分解反应对检测硫酸盐非常敏感。这些数据有助于巴塞尔环保部门确保制药公司的工业放水符合严格的环保标准，保护为巴塞尔居民提供娱乐和生态系统服务的河流。",
            RT_CORE_5: "在巴塞尔 Klybeck 区的诺华工业化学研讨会上，初级化学家 Lisa 演示了金属置换反应。当把一根铁钉浸入蓝色硫酸铜溶液时，铁钉表面会覆盖一层红色的铜金属，而溶液逐渐变成淡绿色的硫酸亚铁。这种置换反应的发生是因为在金属活动性顺序中铁比铜更活泼。研讨会每年培训 50 名学徒，传授药物生产必不可少的化学基础。Lisa 解释说，了解金属反应性对于选择合适的设备材料至关重要——使用错误的金属会导致不必要的反应，从而污染药品。这一原理指导诺华选择不锈钢反应器进行药物合成，防止在全球分销的药物中出现金属污染。",
            RT_ADVANCED_1: "在巴塞尔 Voltastrasse 的区域供热设施中，工程师 Andreas 监测着在冬季为 15,000 户巴塞尔家庭供暖的天然气（甲烷）燃烧情况。该设施每年燃烧 4,500 万立方米的天然气，产生二氧化碳和水蒸气。这种燃烧反应是高度放热的，每摩尔甲烷释放 890 kJ 的能量——这足以加热巴塞尔供暖网络所需的循环水。Andreas 解释说，完全燃烧需要充足的氧气；不完全燃烧会产生有毒的一氧化碳。该设施使用先进的传感器来维持最佳氧气水平，确保清洁燃烧。巴塞尔对可持续发展的承诺促成了计划到 2030 年用可再生生物气替代天然气，在寒冷的瑞士冬季为居民提供可靠供暖的同时减少城市的碳足迹。",
            RT_ADVANCED_2: "在巴塞尔大学化学研究所的燃烧分析实验室，Weber 博士向学生传授丙烷燃烧知识。丙烷常用于实验室的本生灯和便携式加热器，在氧气充足时会发生完全燃烧。该实验室每月消耗约 200 公斤丙烷用于加热实验和分析过程。Weber 博士演示了如何配平燃烧方程式——这是药物化学家在药物合成过程中计算氧化反应所需氧气量的一项关键技能。研究所位于巴塞尔植物园附近，强调了解燃烧化学计量对于安全至关重要。氧气不足会导致不完全燃烧，产生危险的一氧化碳。对于在密闭实验室操作易燃有机溶剂的诺华和罗氏化学家来说，掌握这些知识至关重要。",
            RT_ADVANCED_3: "在罗氏药物安全实验室，安全官员 Zimmermann 博士向新员工解释乙醇燃烧。乙醇广泛用作药物合成中的溶剂，具有高度易燃性，必须小心处理。当乙醇在充足的氧气中燃烧时，会生成二氧化碳和水，每摩尔释放 1,367 kJ 的热量。实验室每月在药物纯化过程中使用 5,000 升乙醇。Zimmermann 博士强调，乙醇蒸气在空气中浓度达到 3% 至 19% 时会形成爆炸性混合物。了解这种燃烧反应对于实验室安全至关重要——通过严格的安全培训，罗氏巴塞尔设施已连续 15 年保持火灾零事故。实验室的通风系统确保乙醇蒸气永远不会达到危险浓度，保护了在设施内工作的 500 名化学家。",
            RT_ADVANCED_4: "在巴塞尔生物化学研究中心，Keller 教授解释了葡萄糖燃烧——这是活细胞中能量产生的基本反应。虽然葡萄糖在我们的身体里并不会真的“燃烧”，但细胞呼吸本质上是一个受控的燃烧反应，通过多个酶促步骤逐渐释放能量。中心研究细胞如何从葡萄糖中提取能量以驱动生物过程。Keller 教授指出，完全的葡萄糖燃烧每摩尔释放 2,808 kJ 的热量，细胞将其捕获在 ATP 分子中。这项研究对于理解糖尿病等代谢紊乱至关重要，这也是诺华药物研究的一个重点。中心与罗氏诊断（Roche Diagnostics）合作开发血糖监测仪，服务于瑞士 50,000 名糖尿病患者。了解这种燃烧反应有助于学生理解人类代谢和药物干预背后的化学原理。",
            RT_ADVANCED_5: "在巴塞尔 A2 高速公路附近的巴塞尔环境化学实验室中，研究员 Müller 博士正在分析辛烷燃烧——这是汽油发动机中的主要反应。辛烷是汽油的主要成分，在汽车发动机中燃烧产生二氧化碳和水，同时释放驱动车辆的能量。实验室监测巴塞尔主要道路沿线的空气质量，每天有 80,000 辆车经过。Müller 博士解释说，不完全燃烧会产生一氧化碳和颗粒物，造成空气污染。巴塞尔对电动电车和巴士的投资旨在减少与燃烧相关的排放。了解辛烷燃烧也与药物化学相关——诺华在其废物焚烧设施中使用类似的碳氢化合物燃烧原理，在超过 1,200°C 的温度下安全销毁每年 2,000 吨的药用废物，确保完全燃烧并最大限度减少环境影响。",
            RT_ELITE_1: "在巴塞尔罗氏 Grenzacherstrasse 校区的罗氏药物合成实验室中，高级化学家 Hartmann 博士监督着苯甲酸与甲醇的酯化反应，以生产苯甲酸甲酯。这种合成反应是制造局部麻醉剂配方的关键步骤。反应需要酸催化剂和 65°C 的精确温度控制。Hartmann 博士的团队每月生产 500 公斤苯甲酸甲酯用于药物应用。酯化工艺是制药化学的基础——罗氏在巴塞尔为各种药物合成 50 多种不同的酯类化合物。这一反应展示了简单的有机合成原理如何扩展到工业制药生产。实验室的质量控制确保了 99.8% 的纯度，符合严格的制药标准。了解酯化反应对于为罗氏全球市场开发新药配方的药物化学家来说至关重要。",
            RT_ELITE_2: "在巴塞尔 Klybeck 区的诺华先进合成设施中，Chen 博士领导着苯胺乙酰化生产乙酰苯胺的过程，这是一种重要的药物中间体。这种合成反应涉及用乙酰氯处理苯胺，产生乙酰苯胺和氯化氢气体。该反应放热剧烈，需要冷却以在 5°C 下维持反应。诺华每月生产 2 吨乙酰苯胺用于镇痛药物的合成。Chen 博士解释说，乙酰化反应是制药化学的基础——阿司匹林本身就是通过水杨酸的乙酰化生产的。该设施先进的反应器系统精确控制反应条件，确保稳定的产品质量。这种合成路线在巴塞尔制药工业中已使用了 80 多年，为瑞士的制药声誉做出了贡献。该工艺展示了经典的有机合成反应在现代药物制造中仍然不可或缺。",
            RT_ELITE_3: "在诺华制药历史实验室，馆长 Schneider 博士演示了 1897 年发现的、使巴塞尔成为制药中心的经典阿司匹林（乙酰水杨酸）合成实验，该实验由水杨酸和乙酸酐反应而成。这一反应彻底改变了疼痛管理，并将巴塞尔确立为全球制药中心。反应产生阿司匹林、乙酸和二氧化碳。虽然现代诺华设施使用更高效的工艺，但这种经典的合成仍被教授给化学系学生，以展示制药历史。实验室位于诺华 1886 年建厂时的原址，保存着历史悠久的设备和文件。Schneider 博士解释说，了解这种合成反应将学生与巴塞尔的制药遗产联系在一起——阿司匹林是巴塞尔首批大规模生产的合成药物之一，全球年销量超过 40,000 吨。这一反应体现了有机合成如何改变医学并建立了巴塞尔的制药工业。",
            RT_ELITE_4: "在罗氏高级有机化学实验室，Hoffmann 博士监督着从苄氯和氰化钠合成苯乙腈的过程。这种氰基取代氯的置换反应对于生产药物中间体至关重要。由于氰化物的毒性，该反应需要严格的安全规程——实验室在负压下操作，并配有先进的洗涤系统。罗氏每月生产 800 公斤苯乙腈用于合成心血管药物。Hoffmann 博士强调，虽然这看起来是一个简单的置换反应，但它实际上是一种 SN2 亲核取代反应——这是在高级有机化学中传授的复杂机制。实验室的安全记录无可挑剔，20 年来氰化钠暴露事故为零。这种反应展示了制药化学家如何通过调整经典反应类型来进行复杂的药物合成，维护了巴塞尔作为全球药物创新中心的地位。",
            RT_ELITE_5: "在诺华制药工艺开发实验室，化学家 Weber 博士演示了苯酚和氢氧化钠合成苯酚钠的过程。这种复分解反应（实际上是酸碱中和）对于后续在药物合成中活化苯酚进行偶联反应至关重要。反应是放热的，在形成酚钠盐时释放热量。诺华将此反应应用于合成分类中的抗微生物剂和药物配方的防腐剂。Weber 博士的团队每月在各种药物合成中处理 1,500 公斤苯酚。实验室配备了自动反应器和实时监测系统，确保精确控制反应条件。了解这种反应类型对于药物化学家来说至关重要——许多药物分子含有酚基，必须通过类似的反应进行活化。该工艺体现了基本反应类型如何在巴塞尔世界领先的制药设施中扩展到工业制药生产规模。",
            EB_BASIC_1: "在巴塞尔大学的氢燃料电池研究实验室，博士生 Thomas 正在配平水分子的形成方程式。这一基本反应对于理解燃料电池技术至关重要，该大学正与诺华合作开发该技术，用于可持续能源应用。实验室的燃料电池原型通过结合氢气和氧气产生电力，仅产生水作为副产品。Thomas 解释说，配平这个方程式需要 2 个氢分子和 1 个氧分子，以满足质量守恒定律。该研究旨在利用清洁能源为诺华的药物生产提供动力，减少巴塞尔的碳足迹。该大学的燃料电池项目已吸引了 500 万瑞士法郎的研究资金，并与 15 个国际机构合作，推进氢技术在制药和工业中的应用。",
            EB_BASIC_2: "在诺华氨合成实验室，工艺工程师 Müller 博士向学生讲解用于生产氨的哈伯法（Haber-Bosch process）。该反应将空气中的氮气与氢气结合形成氨，诺华将其广泛用于药物生产。配平该方程式表明，3 个氢分子与 1 个氮分子反应生成 2 个氨分子。实验室每年生产 50 吨氨，用于合成药物中间体和清洁剂。Müller 博士解释说，该反应需要在铁催化剂的作用下使用高压（200个大气压）和高温（450°C）。理解方程式配平对于计算反应物用量至关重要——使用错误的比例会浪费昂贵的材料并降低效率。该反应的工业重要性使弗里茨·哈伯获得了 1918 年诺贝尔化学奖，展示了基础化学原理如何实现大规模的药物制造。",
            EB_BASIC_3: "在巴塞尔材料科学实验室，研究员 Schmidt 博士研究铁的氧化——即影响制药设备的生锈过程。当铁与氧气反应时，会形成氧化铁(III)（铁锈）。配平该方程式显示，4 个铁原子与 3 个氧分子反应生成 2 个单位的氧化铁。这种反应每年给巴塞尔制药行业造成数百万美元的设备维护和更换成本。Schmidt 博士的研究重点是防止罗氏和诺华生产设施生锈的保护涂层。实验室每月测试 200 多种不同的涂层材料，寻求能承受制药生产中恶劣化学环境的方案。了解这种氧化反应有助于学生理解为什么制药公司在不锈钢设备上投入巨资——不锈钢中的铬会形成保护性的氧化层，防止铁的氧化，确保设备的长寿命和产品的纯度。",
            EB_BASIC_4: "在罗氏设备制造车间，工程师 Lisa 向初级化学家解释铝的氧化。当铝与氧气反应时，会形成一层保护性的氧化铝层，防止进一步腐蚀。配平该方程式需要 4 个铝原子和 3 个氧分子生成 2 个单位的氧化铝。这种自我保护特性使铝成为制药设备的理想材料——罗氏使用铝制反应器合成酸敏感化合物。该车间为罗氏在巴塞尔的设施制造定制的铝制设备，每年生产 50 个专业反应器。Lisa 演示了尽管铝比铁更活泼，但其氧化层使其更耐腐蚀。这一原理指导了制药生产中的设备选择，其中材料与活性化学品的兼容性至关重要。了解方程式配平有助于化学家计算所需的铝厚度，以确保在氧化层形成后提供足够的保护。",
            EB_BASIC_5: "在巴塞尔 Kleinhüningen 的天然气配送中心，安全检查员 Andreas 教学生有关甲烷燃烧的知识。天然气（主要是甲烷）为巴塞尔 40% 的建筑供暖。配平燃烧方程式显示，1 个甲烷分子需要 2 个氧分子产生 1 个二氧化碳和 2 个水分子。该中心每年向巴塞尔居民和工业（包括制药设施）配送 1.2 亿立方米天然气。Andreas 强调，正确的方程式配平对安全至关重要——氧气不足会导致不完全燃烧，产生有毒的一氧化碳。中心的监测系统确保了巴塞尔供暖系统的最佳燃烧。了解这个平衡方程式有助于学生理解为什么在使用燃气具时适当的通风至关重要，从而防止因通风不足每年导致数十名瑞士居民受影响的一氧化碳中毒。",
            EB_CORE_1: "在巴塞尔水处理厂的除磷设施中，化学家 Weber 博士演示了氢氧化钙如何去除废水中的磷酸盐。这种复分解反应形成了不溶性的磷酸钙，从而从溶液中沉淀出来。配平这个含有多原子离子的方程式需要 3 个氢氧化钙分子和 2 个磷酸分子，产生 1 个磷酸钙和 6 个水分子。该设施每天处理 18 万立方米废水，去除可能会导致莱茵河藻类大量繁殖的磷酸盐。Weber 博士解释说，在处理磷酸根 (PO_4^{3}^-) 等基团时，将其作为整体来看待会使配平更容易。这一过程保护了巴塞尔的莱茵河河滨，那里每年有 5 万名居民进行娱乐活动。理解多原子离子的配平对于诺华和罗氏设施的药用废水处理至关重要。",
            EB_CORE_2: "在巴塞尔工业化学博物馆，馆长 Hoffmann 博士讲解了铁矿石还原过程——这是开启工业革命的过程。当一氧化碳还原氧化铁(III)时，会产生纯铁和二氧化碳。配平该方程式需要 1 个氧化铁分子和 3 个一氧化碳分子，产生 2 个铁原子和 3 个二氧化碳分子。虽然巴塞尔不再拥有钢厂，但这一反应的原理在制药化学中仍然适用。诺华使用类似的还原反应来合成药物化合物，将氧替换为其他官能团。博物馆位于巴塞尔的前工业区，每年吸引 5,000 名游客。Hoffmann 博士强调，了解还原反应是药物合成的基础——许多药物分子需要选择性还原特定的官能团，所使用的化学原理正是当年为巴塞尔工业经济生产钢铁的原理。",
            EB_CORE_3: "在诺华硝酸生产设施中，工艺工程师 Chen 博士负责监督生产硝酸的奥斯特瓦尔德法（Ostwald process），该过程始于氨的氧化。这一反应需要精确的配平：4 个氨分子与 5 个氧分子反应产生 4 个一氧化氮分子和 6 个水分子。该设施每月生产 200 吨硝酸用于药物合成。Chen 博士解释说，该反应在 900°C 下通过铂铑催化剂进行，转化效率达 95%。硝酸对于合成许多药物化合物（包括抗生素和心血管药物）至关重要。理解这种复杂的方程式配平对于必须计算反应物流量以维持最佳生产率的工艺工程师而言非常重要。设施中的精密控制系统实时监测反应化学计量，确保诺华制药生产运营的产品质量一致。",
            EB_CORE_4: "在罗氏分析化学实验室，分析员 Maria 演示了铝与硫酸的反应。这种置换反应产生硫酸铝和氢气。配平这个含有多原子硫酸根离子的方程式需要 2 个铝原子和 3 个硫酸分子反应生成 1 个硫酸铝分子和 3 个氢分子。实验室使用此反应制备用于水质净化测试的硫酸铝。Maria 解释说，将硫酸根 (SO_4^{2}^-) 视为一个整体可以简化配平——两边各数出 3 个硫酸根基团。这一原理对于在药物合成中处理多原子离子的制药化学家至关重要。实验室每周进行 500 次分析测试，确保制药产品符合纯度标准。理解多原子离子配平有助于学生体会药物质量控制的复杂性，精确的化学计量确保了全球患者的用药安全。",
            EB_CORE_5: "在巴塞尔大学燃烧研究实验室，Müller 教授教学生配平乙烷燃烧方程式。乙烷是天然气的成分之一，需要仔细配平：2 个乙烷分子与 7 个氧分子反应产生 4 个二氧化碳和 6 个水分子。实验室研究巴塞尔供暖系统的燃烧效率，该系统每年消耗 1.2 亿立方米天然气。Müller 教授强调说，配平燃烧方程式很有挑战性，因为必须同时平衡多种元素。学生学习先平衡碳，再平衡氢，最后平衡氧。这种系统化的方法对于需要配平复杂有机反应的制药化学家来说非常重要。大学的燃烧研究助力巴塞尔的可持续发展目标——提高燃烧效率能减少天然气消耗和碳排放，支持该市在 2050 年实现碳中和的目标。",
            EB_ADVANCED_1: "在巴塞尔大学化学研究所的高级燃烧实验室，Weber 博士向学生提出了丙烷燃烧配平的挑战。这个方程式需要 1 个丙烷分子和 5 个氧分子反应生成 3 个二氧化碳和 4 个水分子。实验室每月在全生灯中消耗约 200 公斤丙烷用于加热实验。Weber 博士教给学生一种系统的方法：先平衡碳原子（两边各3个），接着平衡氢原子（两边各8个），最后平衡氧原子（两边各10个）。这种方法对于配平复杂有机合成反应的制药化学家来说至关重要。研究所创建于 1460 年，培养了一代又一代为巴塞尔制药行业做出贡献的化学家。了解燃烧化学计量有助于学生计算实验室安全所需的氧气量——氧气不足会产生有毒的一氧化碳，这在密闭的实验室空间里是一种危害。",
            EB_ADVANCED_2: "在罗氏实验室安全培训中心，教员 Zimmermann 博士使用丁烷燃烧来教授方程式配平和安全知识。丁烷用于实验室燃烧器和便携式加热器，需要复杂的配平：2 个丁烷分子需要 13 个氧分子产生 8 个二氧化碳和 10 个水分子。该中心每年培训 500 名化学家实验室安全规程。Zimmermann 博士强调说，配平燃烧方程式能帮助化学家计算通风需求——每摩尔丁烷消耗空气中 6.5 摩尔氧气。通风不足会导致不完全燃烧并产生一氧化碳。罗氏巴塞尔设施通过严格的安全培训已保持 15 年火灾零事故。了解燃烧化学计量对于每天操作易燃有机溶剂的制药化学家至关重要，确保了实验室的安全运行并保护了在罗氏巴塞尔研发设施工作的 500 名化学家。",
            EB_ADVANCED_3: "在诺华溶剂回收设施中，工程师 Chen 博士负责管理用于废物处理的乙醇燃烧过程。乙醇作为药物溶剂被广泛使用，在被污染至无法回收时会进行燃烧处理。配平该方程式需要 1 个乙醇分子和 3 个氧分子产生 2 个二氧化碳和 3 个水分子。该设施每月处理 5,000 升废乙醇，回收热能用于建筑供暖。Chen 博士解释说，精确的方程式配平对于计算氧气需求至关重要——该设施的焚烧炉在 1,200°C 下运行，有过量的 20% 氧气以确保完全燃烧。这能防止有毒副产物的形成并符合瑞士严格的环保法规。了解乙醇燃烧化学计量有助于药物化学家计算合成反应所需的溶剂量和废弃处理成本，助力诺华实现减少废物和从不可避免的废物流中回收能量的可持续发展目标。",
            EB_ADVANCED_4: "在巴塞尔生物化学研究中心，Keller 教授讲解葡萄糖燃烧以教授细胞呼吸。虽然葡萄糖在细胞中并不会真的燃烧，但细胞呼吸的总反应方程式与燃烧一致：1 个葡萄糖分子与 6 个氧分子反应产生 6 个二氧化碳和 6 个水分子。这个平衡方程式代表了葡萄糖的完全氧化，每摩尔释放 2,808 kJ 的能量，细胞将其中的一部分捕获。中心研究影响葡萄糖代谢的代谢性疾病，并与罗氏诊断（Roche Diagnostics）合作开发血糖监测仪。Keller 教授强调，了解这一方程式的计量关系有助于学生理解由于我们需要氧气来氧化葡萄糖，所以我们需要呼吸，并呼出二氧化碳作为代谢废弃物。这个基础生化方程式将化学与人体生理联系起来，阐明了为什么巴塞尔的制药公司在代谢性疾病研究上投入巨大精力。",
            EB_ADVANCED_5: "在诺华材料化学实验室，研究员 Hoffmann 博士演示了用氢气还原磁铁矿的过程。这一反应利用氢气将四氧化三铁（磁铁矿）还原为纯铁。配平该方程式需要 1 个磁铁矿分子和 4 个氢分子反应产生 3 个铁原子和 4 个水分子。虽然这种反应不常用于药物合成，但其原理适用于还原药物分子中的官能团。实验室研究用于合成药物中间体的还原反应，每月处理 200 个不同的还原反应。Hoffmann 博士解释说，氢气还原比一氧化碳还原更清洁，仅产生水作为副产物。这一原理指导了诺华的绿色化学计划——选择能最大限度减少危险废物的反应。理解含有混合氧化态的复杂方程式配平，能让学生为先进的药物化学做好准备，在这一领域，精确的化学计量确保了高效的药物合成和最低限度的废物产生。",
            RS_BASIC_1: "在巴塞尔化学演示实验室，Schmidt 教授向学生演示氢气和氯气的爆炸性反应。当暴露在光照下时，这些气体会剧烈结合形成氯化氢，并释放出巨大的能量。这种放热化合反应展示了旧键的断裂和新键的形成——H-H 键和 Cl-Cl 键断裂，同时形成新的 H-Cl 键。实验室每年利用这一充满戏剧性的演示为 500 名学生讲解反应能量学。Schmidt 教授强调了安全问题——由于反应具有爆炸性，演示在保护屏后面进行。了解这一反应有助于学生直观理解化学反应过程中分子层面的变化。演示将学生与药物化学联系起来——罗氏和诺华在众多的合成反应中使用氯化氢，当然是在严格控制的条件下。这个简单的反应说明了适用于复杂药物合成工艺的基本原理。",
            RS_BASIC_2: "在巴塞尔环境化学实验室，Weber 博士演示了利用电弧模拟闪电过程产生一氧化氮。这种吸热反应需要能量输入来打破氮分子中坚固的叁键。学生们观察电弧如何提供能量来克服活化能垒，使氮气和氧气结合。实验室研究这一反应是因为它发生在汽车发动机中并导致空气污染。巴塞尔在全市设有 15 个监测站监测一氧化氮水平，尤其是繁忙的 A2 高速公路附近，每天有 8 万辆车经过。Weber 博士解释说，了解这种反应的能量需求能帮助工程师设计减少一氧化氮排放的催化转化器。可视化课件显示氮分子和氧分子以足够的能量相互碰撞以打破旧键并形成新的 N-O 键，展示了吸热反应如何需要持续的能量输入。",
            RS_BASIC_3: "在诺华燃料电池研究实验室，工程师 Thomas 演示了氢燃料电池中水分子的形成。这种高度放热的反应每形成一摩尔水就释放 286 kJ 的能量，燃料电池将其转化为电能。学生观察分子动画，看到氢分子和氧分子相互靠近、化学键断裂，并在水分子中形成新的 H-O 键。实验室的燃料电池原型产生 10 千瓦的电力，足以驱动实验室设备。Thomas 解释说，这种反应释放的能量使氢气成为一种极好的燃料——它每公斤产生的能量是汽油的三倍。诺华正在投资燃料电池技术，以实现药物生产的可持续供电。可视化课件帮助学生理解为什么这种反应是放热的——水分子中形成的键比氢气和氧气中打破的键更强，从而释放出多余的能量。",
            RS_BASIC_4: "在巴塞尔燃烧科学实验室，Hoffmann 博士演示了碳的燃烧——煤炭燃烧的基本反应。当碳与氧反应时，会形成二氧化碳并每摩尔释放 394 kJ 的能量。分子动画显示氧分子靠近碳原子，两者之间形成化学键，能量以热和光的形式释放出来。这种放热反应推动了工业革命，目前仍产生全球 40% 的电力。实验室研究巴塞尔废物焚烧厂的燃烧效率，该厂每年焚烧 10 万吨废物。Hoffmann 博士解释说，完全燃烧需要足够的氧气——氧气不足会产生有毒的一氧化碳。了解这种反应的能量学有助于学生理解为什么碳基燃料释放这么多能量，以及为什么向可再生能源转型对于减少二氧化碳排放和应对气候变化至关重要。",
            RS_BASIC_5: "在罗氏实验室安全培训中心，教员 Chen 博士演示了镁燃烧产生的耀眼白光。这种高度放热的反应每形成一摩尔氧化镁就释放 602 kJ 的能量。分子模拟显示镁原子靠近氧分子，电子从镁转移到氧，并在氧化镁中形成离子键。学生观察到这种反应非常剧烈，如果不佩戴防护用具，产生的光足以损伤眼睛。中心每年培训 500 名化学家安全处理活性金属。Chen 博士强调镁火不能用水扑灭——水与热的镁反应会产生可能爆炸的氢气。了解这种反应的能量学和机制有助于药物化学家在此类活性金属参与的药物合成中安全工作。可视化课件展示了离子键形成如何释放巨大的能量。",
            RS_CORE_1: "在巴塞尔天然气研究实验室，Müller 博士利用分子动画讲解甲烷燃烧。这个复杂的反应涉及打破四个 C-H 键和两个 O=O 键，然后形成两个 C=O 键和四个 O-H 键。模拟演示了甲烷和氧分子相互碰撞，按照特定序列断键，并在二氧化碳和水中形成新键。这种放热反应每摩尔甲烷释放 890 kJ 的能量，为巴塞尔 40% 的建筑供暖。实验室研究燃烧效率以减少天然气消耗和排放。Müller 博士解释说，反应是分多步进行的，虽然总反应方程式只显示了反应物和产物。理解这些化学键的变化有助于学生理解燃烧的复杂性，以及为什么完全燃烧需要精确的空燃比。可视化课件展示了在燃烧过程中多个化学键是如何同时断裂和形成的。",
            RS_CORE_2: "在诺华燃烧分析实验室，研究员 Weber 博士利用分子可视化技术演示乙烷燃烧。这个反应涉及打破六个 C-H 键、一个 C-C 键和七个 O=O 键，接着形成八个 C=O 键和十二个 O-H 键。复杂的动画展示了多个乙烷和氧分子相互碰撞，分级断键并形成新分子。这种放热反应每摩尔乙烷释放 1,560 kJ 的能量。实验室分析来自诺华废物焚烧厂的燃烧产物，该厂在 1,200°C 下焚烧药物废物。Weber 博士解释说，完全燃烧每个乙烷分子需要 3.5 个氧分子——氧气不足会产生一氧化碳和烟尘。了解这些多重化学键变化有助于制药化学家设计药物合成中的氧化反应。可视化课件展示了反应的复杂性，说明了为什么燃烧需要仔细的氧气控制以实现完全、清洁的燃烧。",
            RS_CORE_3: "在罗氏催化工艺实验室，工程师 Chen 博士演示了在铂催化剂上进行的氨氧化反应。这个反应打破了十二个 N-H 键和五个 O=O 键，形成了四个 N=O 键和十二个 O-H 键。分子模拟显示氨分子和氧分子吸附到铂催化剂表面，化学键断裂并重新组合，然后产物脱附。这种放热反应每摩尔氨释放 226 kJ 的能量，是硝酸生产的第一步。实验室每月生产 200 吨硝酸用于药物合成。Chen 博士解释说，铂催化剂显著降低了活化能，使反应能在 900°C 下进行，而不是需要更高的温度。了解催化机制对药物化学至关重要——罗氏在药物合成中使用了 100 多种不同的催化剂。可视化课件展示了催化剂如何在不被消耗的情况下促进化学键的断裂和形成。",
            RS_CORE_4: "在巴塞尔大学燃烧动力学实验室，Schmidt 教授利用高级可视化技术讲解丙烷燃烧。这个反应打破了八个 C-H 键、两个 C-C 键和五个 O=O 键，然后形成六个 C=O 键和八个 O-H 键。模拟显示丙烷分子与氧气碰撞，化学键发生级联断裂，并形成二氧化碳和水分子。这种高度放热的反应每摩尔丙烷释放 2,220 kJ 的能量。实验室研究燃烧动力学以提高巴塞尔建筑的供暖效率。Schmidt 教授解释说，燃烧通过自由基链反应进行——动画显示了自由基中间体的形成和快速反应。了解这些复杂的化学键变化能让学生为药物化学做好准备，因为在药物化学中，涉及中间体的多步反应非常普遍。可视化课件阐明了为什么燃烧如此剧烈且放热——形成了大量强键，释放了可观的能量。",
            RS_CORE_5: "在诺华卤化研究实验室，Hoffmann 博士利用分子动画演示溴化氢的形成。这个反应打破了一个 H-H 键和一个 Br-Br 键，形成了两个 H-Br 键。模拟演示了氢分子和溴分子相互靠近、化学键断裂及新的溴化氢分子形成的过程。这种放热反应每摩尔溴化氢释放 72 kJ 的能量。实验室研究用于药物合成的卤化反应——许多药物包含通过与溴化氢反应引入的溴原子。Hoffmann 博士解释说，这种反应在光照下通过自由基机制进行，动画展示了自由基中间体。了解卤化反应对制药化学至关重要——诺华在巴塞尔合成了 30 种不同的溴化药物化合物。可视化课件帮助学生通过键能的大小来理解反应为什么是放热或吸热的。",
            RS_ADVANCED_1: "在罗氏加氢实验室，Weber 博士演示了在钯催化剂上进行的乙烯加氢反应。这个反应打破了 C=C 双键和 H-H 键，形成了两个新的 C-H 键。分子动画显示乙烯和氢分子吸附在钯催化剂表面，π键断裂，氢原子添加到碳原子上，最后乙烷脱附。这种放热反应每摩尔乙烯释放 137 kJ 的能量。实验室每月进行 200 个用于药物合成的加氢反应。Weber 博士解释说，加氢对制药化学至关重要——许多药物需要对双键进行选择性还原。催化剂确保反应能在室温下进行，而不是需要高温。了解加氢机制有助于制药化学家设计选择性反应，在不影响复杂药物分子中其他官能团的情况下还原特定的化学键。",
            RS_ADVANCED_2: "在诺华卤化合成实验室，Chen 博士演示了乙烯溴化——一种经典的加成反应。分子动画显示溴靠近乙烯双键，π键断裂，溴原子添加进去形成 1,2-二溴乙烷。这种放热反应通过一个循环溴鎓离子中间体进行，动画对此进行了直观展示。实验室利用溴化反应来合成药物中间体，每月处理 500 公斤溴化化合物。Chen 博士解释说，溴鎓离子中间体确保了反式加成——两个溴原子从双键的相反两侧添加。了解这一机制对于制药合成至关重要，因为立体化学决定了药物活性。可视化课件展示了溴分子在靠近富含电子的双键时是如何极化的，从而引发加成反应。这个反应体现了制药化学家如何通过对机制的理解来控制产物的立体化学。",
            RS_ADVANCED_3: "在巴塞尔工业化学实验室，Müller 教授演示了由乙烯和水合成乙醇的过程。这种酸催化水合反应打破了 C=C 双键，水分子的组分加成到双键两端形成乙醇。分子动画显示了乙烯的质子化、碳正离子的形成、水分子的碰撞以及去质子化生成乙醇的过程。这种放热反应每摩尔乙醇产生 44 kJ 的能量。实验室研究这一反应是因为它在工业上被用于生产药物溶剂级乙醇——巴塞尔的制药公司每月使用 10,000 升乙醇。Müller 教授解释说，反应经过碳正离子中间体，动画对此有清晰的展示。理解碳正离子机制是药物化学的基础——许多药物合成反应都涉及碳正离子中间体。可视化课件展示了酸催化剂如何通过质子化底物并创造活性中间体来促进反应的进行。"
        },
        back: "返回枢纽",
        title: "SC1.06 // 化学反应基础",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "化学反应",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "SC1.06_反应监视器",
        footer_left: "SC1.06_化学反应 // 节点：巴塞尔",
        stages: {
            reaction_types: "反应类型",
            equation_balancing: "方程式配平",
            reaction_simulation: "反应模拟",
            reaction_types_desc: "按类型分类化学反应",
            equation_balancing_desc: "使用系数平衡化学方程式",
            reaction_simulation_desc: "观察分子级反应动画"
        },
        reactionTypes: {
            synthesis: "化合反应",
            decomposition: "分解反应",
            single_replacement: "置换反应",
            double_replacement: "复分解反应",
            combustion: "燃烧反应"
        },
        reactionTypePatterns: {
            synthesis: "A + B → AB",
            decomposition: "AB → A + B",
            single_replacement: "A + BC → AC + B",
            double_replacement: "AB + CD → AD + CB",
            combustion: "CₓHᵧ + O_2 → CO_2 + H_2O"
        },
        reactionTypeDescriptions: {
            synthesis: "两种或多种物质结合形成单一产物",
            decomposition: "单一化合物分解成两种或多种更简单的物质",
            single_replacement: "一种元素取代化合物中的另一种元素",
            double_replacement: "两种化合物交换离子形成两种新化合物",
            combustion: "碳氢化合物与氧气反应生成二氧化碳和水"
        },
        ui: {
            submit: "提交",
            reset: "重置",
            next: "下一个",
            verify: "验证",
            play: "播放",
            pause: "暂停",
            restart: "重新开始",
            speed: "速度",
            hint: "提示",
            show_atom_counts: "显示原子计数",
            hide_atom_counts: "隐藏原子计数",
            coefficient: "系数",
            select_reaction_type: "选择反应类型"
        },
        feedback: {
            correct: "正确！做得好。",
            incorrect: "不正确。再试一次。",
            try_again: "再试一次",
            hint_available: "提示可用",
            balanced: "方程式已平衡！",
            unbalanced: "方程式未平衡",
            check_elements: "检查以下元素："
        },
        energy: {
            energy_released: "能量释放",
            energy_absorbed: "能量吸收",
            exothermic: "放热",
            endothermic: "吸热",
            energy_diagram: "能量图"
        },
        atomCount: {
            reactants: "反应物",
            products: "生成物",
            element: "元素",
            count: "数量",
            balanced: "已平衡",
            unbalanced: "未平衡",
            atom_count_table: "原子计数表"
        },
        prompts: {
            classify_reaction: "检查化学方程式并识别反应类型。考虑反应物和生成物的模式。",
            balance_equation: "输入系数以平衡化学方程式。确保每种元素的原子数在两侧相等。",
            observe_simulation: "观看分子动画，了解反应过程中化学键如何断裂和形成。使用控件播放、暂停或重新开始。",
            analyze_reaction: "分析化学反应参数并验证化学计量关系。"
        },
        visualization: {
            title: "分子可视化",
            description: "观察分子结构和反应动力学",
            current_equation: "当前化学方程式"
        },
        loading: "正在初始化化学反应模拟...",
        hints: {
            synthesis_hint: "寻找多个反应物结合成单一产物",
            decomposition_hint: "寻找单一反应物分解成多个产物",
            single_replacement_hint: "寻找一种元素取代化合物中的另一种元素",
            double_replacement_hint: "寻找两种化合物交换离子",
            combustion_hint: "寻找碳氢化合物与氧气反应生成 CO_2 和 H_2O",
            balancing_hint: "首先平衡仅出现在一种反应物和一种生成物中的元素",
            coefficient_hint: "尝试调整 {compound} 的系数",
            unbalanced_element_hint: "元素 {element} 未平衡：左侧 {reactantCount}，右侧 {productCount}"
        },
        mission: {
            title: "任务：化学反应",
            description: "掌握化学反应类型、方程式配平和反应的分子级理解。"
        },
        labels: {
            equation: "化学方程式",
            reaction_type: "反应类型",
            coefficients: "系数",
            atom_counts: "原子计数",
            energy_change: "能量变化",
            molecular_view: "分子视图",
            pattern: "模式",
            example: "示例"
        },
        equation_balancer: {
            title: "配平化学方程式",
            element: "元素",
            reactants: "反应物",
            products: "生成物",
            status: "状态",
            balanced: "✓ 方程式已配平！",
            unbalanced: "✗ 方程式未配平",
            correct: "正确！方程式已配平。",
            incorrect: "不正确。方程式未配平。请检查原子计数。",
            hint: "提示",
            show_hint: "显示提示",
            hide_hint: "隐藏提示",
            reset: "重置",
            submit: "提交",
            already_balanced: "方程式已经配平！",
            no_hint: "没有可用的提示。",
            hint_increase_products: "尝试增加包含 {element} 的生成物的系数",
            hint_increase_reactants: "尝试增加包含 {element} 的反应物的系数"
        }
    },
    sc2_07: {
        scenarios: {
            CAL_BASIC_1: "在巴塞尔大学的化学实验室中，一年级学生正在进行分步量热实验。通过测量将比热容已知的金属加热并放入水中后的水温升高，学生们可以计算该金属的比热容。Weber 博士解释说，这种技术在制药工业中非常基础，特别是为了确保生产过程中使用的反应容器能够承受特定放热反应释放的热量。学生们观察到水温的变化，并使用公式 q = mcΔT 来确定热能传递。这一实验使学生能够直观理解热力学第一定律，并为将来在诺华或罗氏从事更复杂的流体动力学研究打下基础。",
            CAL_BASIC_2: "在罗氏公司的药物稳定性测试中心，技术员 Maria 正在测试一种新型溶剂的散热效率。实验涉及将已知能量输入溶剂并记录温度随时间的变化。Maria 解释说，药物合成过程中，很多反应会释放大量热量，如果溶剂的比热容不够高，局部过热可能导致药效降低甚至引发安全事故。该中心每年进行 500 次此类测试，以确保所有在新药生产中使用的溶剂方案都是安全的。掌握 q = mcΔT 的计算对于每一位分析化学家来说都是必不可少的，因为这直接关系到制药过程的能量管理和生产效率。",
            CAL_BASIC_3: "在莱茵河畔的一个环保监测点，技术员 Thomas 正在测量河水的自然热平衡。他计算了在处理厂排出的微热液体与河水混合后的整体温度变化。Thomas 指出，巴塞尔对工业排水的温度有极其严格的控制，以保护莱茵河中对温度敏感的鲑鱼种群。这一应用量热法的实际案例展示了化学工程如何与生态保护相结合。学生们了解到，即使是 1 或 2 摄氏度的微小差异，在大规模计算时也涉及到巨大的热能流动。这一任务强调了精确测量比热容和质量对于环境质量评价的重要性。",
            CAL_BASIC_4: "在诺华的材料表征实验室，研究员 Hoffmann 博士正带领学徒通过中和热实验来标定量热计的热容。他们将盐酸和氢氧化钠混合，并精确记录反应发生的几秒钟内温度的陡增。Hoffmann 强调，在进行更高精度的焓变测量前，了解量热计本身吸收了多少热量（即量热计常数）至关重要。这是一种常见的实验室准则，确保了诺华生产的高端生物制剂在能量计算上的零误差。学生们通过计算中和热，学习了如何应用 q = mcΔT 进行能量转换，并深刻体会到精确实验条件控制对制药研发的价值。",
            CAL_BASIC_5: "在巴塞尔工艺工程学校的教学实验室，学生们正在比较不同金属（如铝、铜和不锈钢）的传热效率。他们通过将热金属块投入绝热咖啡杯量热计中，观察平衡温度。教师 Sarah 解释道，在罗氏或诺华的大规模生产设施中，反应釜的材质选择往往取决于金属的热学性能。铝和不锈钢虽然耐腐蚀，但它们的比热容差异决定了反应釜冷却系统的设计。通过这一练习，学生掌握了热交换的基本公式，并理解了为什么这种基础量热法是药物工业设备设计和工艺安全评估的基石。",
            CAL_CORE_1: "在巴塞尔罗氏 Grenzacherstrasse 校区的罗氏药物合成实验室中，高级化学家 Hartmann 博士监督着苯甲酸与甲醇的酯化反应，以生产苯甲酸甲酯。这种合成反应是制造局部麻醉剂配方的关键步骤。反应需要酸催化剂和 65°C 的精确温度控制。Hartmann 博士的团队每月生产 500 公斤苯甲酸甲酯用于药物应用。酯化工艺是制药化学的基础——罗氏在巴塞尔为各种药物合成 50 多种不同的酯类化合物。这一反应展示了简单的有机合成原理如何扩展到工业制药生产。实验室的质量控制确保了 99.8% 的纯度，符合严格的制药标准。了解酯化反应对于为罗氏全球市场开发新药配方的药物化学家来说至关重要。",
            CAL_CORE_2: "在巴塞尔 Klybeck 区的诺华先进合成设施中，Chen 博士领导着苯胺乙酰化生产乙酰苯胺的过程，这是一种重要的药物中间体。这种合成反应涉及用乙酰氯处理苯胺，产生乙酰苯胺和氯化氢气体。该反应放热剧烈，需要冷却以在 5°C 下维持反应。诺华每月生产 2 吨乙酰苯胺用于镇痛药物的合成。Chen 博士解释说，乙酰化反应是制药化学的基础——阿司匹林本身就是通过水杨酸的乙酰化生产的。该设施先进的反应器系统精确控制反应条件，确保稳定的产品质量。这种合成路线在巴塞尔制药工业中已使用了 80 多年，为瑞士的制药声誉做出了贡献。该工艺展示了经典的有机合成反应在现代药物制造中仍然不可缺。",
            CAL_CORE_3: "在诺华制药历史实验室，馆长 Schneider 博士演示了 1897 年发现的、使巴塞尔成为制药中心的经典阿司匹林（乙酰水杨酸）合成实验，该实验由水杨酸和乙酸酐反应而成。这一反应彻底改变了疼痛管理，并将巴塞尔确立为全球制药中心。反应产生阿司匹林、乙酸和二氧化碳。虽然现代诺华设施使用更高效的工艺，但这种经典的合成仍被教授给化学系学生，以展示制药历史。实验室位于诺华 1886 年建厂时的原址，保存着历史悠久的设备和文件。Schneider 博士解释说，了解这种合成反应将学生与巴塞尔的制药遗产联系在一起——阿司匹林是巴塞尔首批大规模生产的合成药物之一，全球年销量超过 40,000 吨。这一反应体现了有机合成如何改变医学并建立了巴塞尔的制药工业。",
            CAL_CORE_4: "在罗氏高级有机化学实验室，Hoffmann 博士监督着从苄氯和氰化钠合成苯乙腈的过程。这种氰基取代氯的置换反应对于生产药物中间体至关重要。由于氰化物的毒性，该反应需要严格的安全规程——实验室在负压下操作，并配有先进的洗涤系统。罗氏每月生产 800 公斤苯乙腈用于合成心血管药物。Hoffmann 博士强调，虽然这看起来是一个简单的置换反应，但它实际上是一种 SN2 亲核取代反应——这是在高级有机化学中传授的复杂机制。实验室的安全记录无可挑剔，20 年来氰化钠暴露事故为零。这种反应展示了制药化学家如何通过调整经典反应类型来进行复杂的药物合成，维护了巴塞尔作为全球药物创新中心的地位。",
            CAL_CORE_5: "在诺华制药工艺开发实验室，化学家 Weber 博士演示了苯酚和氢氧化钠合成苯酚钠的过程。这种复分解反应（实际上是酸碱中和）对于后续在药物合成中活化苯酚进行偶联反应至关重要。反应是放热的，在形成酚钠盐时释放热量。诺华将此反应应用于合成分类中的抗微生物剂和药物配方的防腐剂。Weber 博士的团队每月在各种药物合成中处理 1,500 公斤苯酚。实验室配备了自动反应器和实时监测系统，确保精确控制反应条件。了解这种反应类型对于药物化学家来说至关重要——许多药物分子含有酚基，必须通过类似的反应进行活化。该工艺体现了基本反应类型如何在巴塞尔世界领先的制药设施中扩展到工业制药生产规模。",
            CAL_ADVANCED_1: "在巴塞尔大学的高级热力学中心，研究员 Müller 博士正在向研究生演示复杂的量热分析。该实验涉及使用精密弹式量热计测量特定制药中间体的燃烧焓。随着巴塞尔制药公司致力于开发更高效的生产流程，精确的能量足迹数据变得至关重要。Müller 博士解释说，这种先进的技术能捕捉到微妙的吸热和放热相变。该中心与诺华有着长期的科研合作，致力于优化大规模发酵罐的绝热设计。学生们不仅要计算 ΔH，还必须评估热量散失的多重来源，从而提高工业放大的准确性。这一过程是将理论热化学应用于解决全球顶级制药企业面临的复杂能源管理挑战的典范。",
            CAL_ADVANCED_2: "在罗氏公司的工艺优化部门，工程师 Andreas 正在为一个新型 5,000 升生物反应器设计冷却系统。他利用高级量热数据，模拟了高浓度细胞培养过程中不断变化的热量释放率。Andreas 指出，单纯的基础量热计算已经不足以应对复杂的生物合成压力。他们采用了差示扫描量热法 (DSC) 来监测反应过程中各组分的比热容动态演变。这项工作直接影响了罗氏在巴塞尔圣约翰区新建的生产设施的能源效率。通过精确的 ΔH 建模，该工厂预计每年可节省 15% 的冷却能源成本。学生们在此任务中通过模拟这些复杂的参数，学习了如何将高级量热法转化为实际的工业效益和环保成果。",
            CAL_ADVANCED_3: "在诺华的可持续能源试验工场，首席科学家 Chen 博士正在研究利用工业余热进行区域供气的技术。量热在其中扮演了核心角色，他们需要测量反应器热屏蔽层传导的总热流。Chen 解释说，诺华制药在巴塞尔的目标是建立一个碳中和的科创园区，任何反应释放的“废热”都应被量化并重新利用。这一任务涉及计算复杂流体在通过换热器时的热容变化和总焓流。学生们观察到，在高精度的工业环境下，每一个微小的比热容修正都会对整个园区的热负荷平衡产生重大影响。这种全局性的能源视野是现代制药化学家必备的专业素质，体现了巴塞尔在全球生命科学领域的环保领导力。",
            CAL_ADVANCED_4: "在巴塞尔生物工程研究所，Sarah 教授正在研究蛋白质折叠过程中极微小的能量交换。这种专门的等温滴定量热法 (ITC) 实验旨在确定药物分子与目标蛋白结合时的结合焓。由于这种能量变化极小，对量热计的灵敏度和环境稳定性要求极高。Sarah 博士解释说，罗氏开发的抗癌抗体疗法高度依赖这些基础热力学参数来优化药物的亲和力。实验室位于充满活力的莱茵河创新带，吸引了全球各地的顶尖学者。学生们在此任务中学习了如何应用高级热化学原理来解读生命分子间的复杂相互作用。这不仅是化学课，更是理解分子水平上生物过程与能量转换关系的探索之旅。",
            CAL_ADVANCED_5: "在罗氏位于巴塞尔的全球安全评估中心，Dr. Zimmermann 正在进行危险化学品的热稳定性评估。利用高级绝热量热仪，他的团队模拟了反应釜出现冷却故障时的极端情况，以确定可能发生失控反应的起始温度。Zimmermann 强调，精确预测反应的放热量和速率是防止工业灾难的唯一途径。诺华和罗氏在每一项新工艺上线前，都会进行至少 20 次此类高规格量热实验。学生们通过处理实验数据计算最高温升和潜在压力，理解了为什么高级热化学计算是巴塞尔制药安全神话的基准。这项任务传达了严谨科学态度在生命科学产业中的决定性作用，展示了巴塞尔制药行业对员工安全和社会责任的坚定承诺。",
            CAL_ELITE_1: "在诺华高级热分析实验室，主任 Hartmann 博士正在指导对新型制药冷链保护材料的性能评估。实验利用超灵敏量热技术，模拟全球运输链中各种极端的温度波动对生物制剂焓值的影响。Hartmann 指出，生物药的活性对微小的热量波动极其敏感，精确的 ΔH 测定能决定数百万美元药物的成败。该实验室通过跨学科协作，结合了材料物理与热化学，为诺华的全球供应链开发更高效的绝热包装。学生们在此精英任务中，需要将复杂的相变潜热计算与实际物流数据相结合，体验将基础科学转化为决定性商业价值的过程。这代表了巴塞尔制药工业在每一个细节上追求完美的匠心精神。",
            CAL_ELITE_2: "在巴塞尔罗氏数字孪生工艺中心，首席数据科学家 Chen 博士展示了如何利用高通量量热数据来驱动制药过程的实时 AI 模拟。每一秒钟，来自数千个传感器的热流数据都会被转化为数字信号，以优化正在生产的复杂干扰素的收率。Chen 解释说，虽然底层逻辑仍然是基于比热容和质量的基础公式，但在处理海量实时数据时，对瞬时焓变的精确预测成为了提效的关键。该中心是罗氏在工业 4.0 领域的标杆，不仅提高了生产速度，还将每批次药物的能量偏差降到了 0.01% 以下。学徒们通过这一任务，窥见并亲自参与了未来制药工业的能量管理前沿，理解了精准度在这个万亿级产业中的神圣地位。",
            CAL_ELITE_3: "在诺华巴塞尔总部的全球可持续发展智库，Dr. Schneider 正在审查一项关于将整个化学合成产业链从石油基溶剂转向水基溶剂的全生命周期分析。核心挑战在于水的高比热容导致的工业能耗重构。他们必须应用高级量热模型，重新计算整个诺华园区内数千个反应釜的加热和冷却周期。Schneider 强调，这种从分子结构出发的能量系统重构，是巴塞尔制药业向绿色、低碳转型过程中最艰巨的任务。学生们在此任务中被赋予了“首席能源官”的角色，需要综合考虑化学性质、工程经济和环境代价，通过复杂的量热计算得出一份足以影响整个城市制药工业未来方向的评估报告。这不仅是对知识的考察，更是对决策能力的终极挑战。",
            CAL_ELITE_4: "在莱茵河谷环境与能源协同研究中心，Dr. Hoffmann 正在研究一种革命性的地下热能存储技术，旨在利用冬季多余的能量来驱动夏季的制药冷却设备。量热学在其中起到了桥接地质储热与工业需求的关键作用。Hoffmann 指出，巴塞尔拥有得天独厚的岩石层结构，能够充当巨大的“天然热缓冲池”。这一任务要求学生计算大规模水体及岩石在千万立方米尺度下的总焓存量和热交换效率。作为诺华和罗氏支持的区域性能源项目，其成果将直接改变巴塞尔市的能源账单。学生们在这一精英级别任务中，处理的是不仅关乎试管和烧杯，更是关乎整座城市未来、人与自然和谐共生的宏大能量课题。",
            CAL_ELITE_5: "在巴塞尔最高水平的罗氏未来工厂设计组，Dr. Weber 正在设计一种全新的“无反应器”微流控合成系统。这种系统利用微米级通道进行化学反应，其精准的热管理完全颠覆了传统大型量热的范畴。Weber 强调，在微观尺度下，表面积与其体积之比的巨变使得瞬时热传递不再遵循宏观简化定律。为了确保巴塞尔下一代靶向药的极高纯度，他们必须在飞升（femtolitres）级别对微小焓变进行超快动态监测。此精英任务挑战学生突破传统思维束缚，将高级量热法推向其物理极限。通过解决这些微流控中的热传导难题，学生们正在与巴塞尔制药业的顶级工程思维对话，探索人类在分子精准制造领域的最前沿阵地。",
            HL_BASIC_1: "在巴塞尔大学的无机化学课堂上，Emma 正在学习如何使用盖斯定律来确定碳氧化为一氧化碳的反应焓。由于一氧化碳通常与二氧化碳混合产生，直接测量该特定步骤的 ΔH 极其困难。Weber 博士解释道，通过已知的一氧化碳燃烧和碳完全燃烧的焓变，我们可以利用能量守恒的逻辑算出中间步骤。这种间接测量方法在巴塞尔的工业界，尤其是诺华的催化研究中应用广泛。学生们通过绘制循环图，学习将化学反应视为可以像数学方程式一样加减的路径，体会到了热力学定律的严谨之美，这为未来从事更复杂的合成路径优化奠定了重要的理论基石。",
            HL_BASIC_2: "在罗氏位于 Grenzacherstrasse 的分析实验室里，分析员 Maria 正利用盖斯定律验证一种新型催化剂的能量概貌。Maria 解释说，催化剂虽然不改变总反应焓，但它们改变了中间步骤。了解不同中间体的稳定性对于选择正确的催化路线至关重要。盖斯定律告诉我们，无论生产路径如何，从原料到最终药品的总能量变化是恒定的。该实验室每天处理数百个此类逻辑验证，确保每一克贵金属催化剂都能发挥最大经济效益。学生们在这一任务中扮演实习分析师，练习通过加减已知反应方程式来推导目标药用分子的合成焓，这是巴塞尔每一位优秀化学家的必经之路。",
            HL_BASIC_3: "在巴塞尔环境监测中心的空气动力学小组中，技术员 Thomas 正在研究大气中二氧化硫转化为三氧化硫的反应能级。由于这是一个多步、可逆且伴随复杂副反应的过程，盖斯定律成为了计算其总环境热效应的唯一可靠工具。Thomas 指出，巴塞尔的制药公司对硫排放有极严的标准，理解这些大气反应的焓变有助于优化排放洗涤器的性能。这一应用案例展示了盖斯定律不仅存在于课本中，更是保障巴塞尔清澈空气的科学盾牌。学生们通过此项练习，计算了酸雨形成过程中的总能量变迁，理解了化学状态函数的本质——结果远比过程本身更具有守恒的意义。",
            HL_BASIC_4: "在诺华的有机合成初级工作室内，工程师 Hoffmann 博士正带领团队通过已知的燃烧焓来计算一种巴塞尔常用的手性中间体的生成焓。Hoffmann 博士告诉学生，在巴塞尔这种世界顶尖的制药中心，我们通常无法通过简单实验直接制备复杂的中间体，但我们可以通过“绕道”策略——利用已有的海量数据库中的已知反应来重构我们的目标。盖斯定律就是这一策略的灵魂。学生们在电脑前核对德语版化学手册中的焓变数据，通过简单的代数运算解开复杂的能量之谜。这一过程让学生明白，优秀的化学家需要善于利用已有信息，通过逻辑推导解决看似无法触及的技术难题。",
            HL_BASIC_5: "在巴塞尔圣约翰区的一个中学教师研讨会上，Sarah 教授正在展示盖斯定律在教学中的“视觉化法”。通过构建能量阶梯图，她清晰地向学生展示了从初始反应物到最终产物，无论跨越多少台阶，总的高度差是固定的。Sarah 指出，这种逻辑是化学研究中最强大的预测工具之一。在巴塞尔著名的化工区，工程师们利用这种阶梯图来设计能效最高的传热网络。学生们在这一关卡中，通过拖动虚拟磁贴来对齐化学反应箭头，确保原子守恒和能量平衡。这种直观的逻辑练习不仅训练了热化学技能，更培养了在解决复杂科学问题时所需的整体思维和战略眼光。",
            HL_CORE_1: "在罗氏制药的核心研究大楼，首席科学家 Hartmann 博士正面临一个挑战：如何精确预测一个新发现的多步抗病毒分子合成路径的整体热效应。该反应包含三个不稳定的中间体，直接测量它们的焓变既昂贵又危险。Hartmann 决定发动“盖斯定律防御”，利用该定律的路径无关性，将复杂的反应拆解为一系列在巴塞尔标准实验室中已知的简单步骤。这个任务要求学生精确操作化学方程式的符号和系数。如果一个步骤需要翻转，其 ΔH 也必须变号；如果系数翻倍，焓值也要跟着变。这不仅是数学，更是对化学物质在能量转换中“等价交换”原则的深刻理解。",
            HL_CORE_2: "在诺华 Klybeck 园区的自动化实验室里，人工智能系统正在生成数千种可能的合成路线，而工程师 Chen 博士的工作是利用盖斯定律挑选出能量上最稳健的方案。Chen 解释说，很多高效的合成法往往隐藏在复杂的化学循环中，直接测量 ΔH 會因为反应物不纯或时间过快而失败。但由于盖斯定律的逻辑严密性，只要我们有可靠的“已知块”，我们就能拼凑出任何未知的能量拼图。这一核心关卡衡量了学生处理多级联立方程式的能力。学生通过消去中间体（如气体态的自由基），层层递进，直至推导出目标药物分子的能量常数。这是进入巴塞尔制药精英圈层必须掌握的高级逻辑技巧。",
            HL_CORE_3: "在巴塞尔工业博物馆的还原化学馆，馆长 Schneider 博士向参观者讲解如何通过间接法计算铁还原的高温焓值。在高炉中直接测量每个原子的能量动向是物理上的不可能，但通过盖斯定律，我们可以将这一工业过程简化为实验室级别的碳氧反应和金属氧化反应之和。Schneider 强调，这种“以易求难”的智慧，使得巴塞尔的早期化工厂能在 19 世纪就精确控制大规模生产的热能负荷。学生们在这一关卡中处理更复杂的系数平衡，学习如何在叠加方程式时保持原子种类和数量的完全对等。这不仅是对热力学定律的运用，更是对巴塞尔深厚工业积淀中科学精神的致敬。",
            HL_CORE_4: "在罗氏全球质量保障中心，Hoffmann 博士正在审查一份关于一种抗癌药合成热风险的报告。其中一个关键步骤是间接计算一个高活泼有机过氧化物中间体的分解焓。利用盖斯定律将该不安全步骤关联到安全的燃烧反应上，由于测量路径的转换，极大地保护了实验人员的安全。Hoffmann 指出，在制药这种关乎人命的行业，数据逻辑的闭环就是最高级别的安全。学生们需要通过组合四个看似无关的反应，运用盖斯定律推导出目标 ΔH。这一过程不仅锻炼了代数运算的精准度，更传达了化学中“路径无关”思想如何成为一种解决高难度、高风险课题的智慧策略。",
            HL_CORE_5: "在巴塞尔大学的物理化学研究所中，Müller 教授正指导学生通过盖斯定律探索金属催化表面的吸附焓。由于吸附过程通常伴随复杂的表面扩散，直接量热往往混杂了干扰信号。通过将吸附过程分解为气相反应和固相沉积的组合，盖斯定律提供了最纯粹的热力学解析。研究所位于巴塞尔著名的“生命科学铁三角”地带，其精确度和严谨性广为人知。学生在此核心关卡中需要处理包含相态（固体、液体、气体）差异的盖斯循环。每一种物质状态的改变（如汽化热）都必须考虑在内，这极大地提升了任务的真实感和挑战性，完美模拟了真实工业环境中对细节的极致追求。",
            HL_ADVANCED_1: "在巴塞尔大学的高级热力学中心，研究员 Müller 博士正在向研究生演示复杂的量热分析。该实验涉及使用精密弹式量热计测量特定制药中间体的燃烧焓。随着巴塞尔制药公司致力于开发更高效的生产流程，精确的能量足迹数据变得至关重要。Müller 博士解释说，这种先进的技术能捕捉到微妙的吸热和放热相变。该中心与诺华有着长期的科研合作，致力于优化大规模发酵罐的绝热设计。学生们不仅要计算 ΔH，还必须评估热量散失的多重来源，从而提高工业放大的准确性。这一过程是将理论热化学应用于解决全球顶级制药企业面临的复杂能源管理挑战的典范。",
            HL_ADVANCED_2: "在罗氏公司的工艺优化部门，工程师 Andreas 正在为一个新型 5,000 升生物反应器设计冷却系统。他利用高级量热数据，模拟了高浓度细胞培养过程中不断变化的热量释放率。Andreas 指出，单纯的基础量热计算已经不足以应对复杂的生物合成压力。他们采用了差示扫描量热法 (DSC) 来监测反应过程中各组分的比热容动态演变。这项工作直接影响了罗氏在巴塞尔圣约翰区新建的生产设施的能源效率。通过精确的 ΔH 建模，该工厂预计每年可节省 15% 的冷却能源成本。学生们在此任务中通过模拟这些复杂的参数，学习了如何将高级量热法转化为实际的工业效益和环保成果。",
            HL_ADVANCED_3: "在诺华的可持续能源试验工场，首席科学家 Chen 博士正在研究利用工业余热进行区域供气的技术。量热在其中扮演了核心角色，他们需要测量反应器热屏蔽层传导的总热流。Chen 解释说，诺华制药在巴塞尔的目标是建立一个碳中和的科创园区，任何反应释放的“废热”都应被量化并重新利用。这一任务涉及计算复杂流体在通过换热器时的热容变化和总焓流。学生们观察到，在高精度的工业环境下，每一个微小的比热容修正都会对整个园区的热负荷平衡产生重大影响。这种全局性的能源视野是现代制药化学家必备的专业素质，体现了巴塞尔在全球生命科学领域的环保领导力。",
            HL_ADVANCED_4: "在巴塞尔生物工程研究所，Sarah 教授正在研究蛋白质折叠过程中极微小的能量交换。这种专门的等温滴定量热法 (ITC) 实验旨在确定药物分子与目标蛋白结合时的结合焓。由于这种能量变化极小，对量热计的灵敏度和环境稳定性要求极高。Sarah 博士解释说，罗氏开发的抗癌抗体疗法高度依赖这些基础热力学参数来优化药物的亲和力。实验室位于充满活力的莱茵河创新带，吸引了全球各地的顶尖学者。学生们在此任务中学习了如何应用高级热化学原理来解读生命分子间的复杂相互作用。这不仅是化学课，更是理解分子水平上生物过程与能量转换关系的探索之旅。",
            HL_ADVANCED_5: "在罗氏位于巴塞尔的全球安全评估中心，Dr. Zimmermann 正在进行危险化学品的热稳定性评估。利用高级绝热量热仪，他的团队模拟了反应釜出现冷却故障时的极端情况，以确定可能发生失控反应的起始温度。Zimmermann 强调，精确预测反应的放热量和速率是防止工业灾难的唯一途径。诺华和罗氏在每一项新工艺上线前，都会进行至少 20 次此类高规格量热实验。学生们通过处理实验数据计算最高温升和潜在压力，理解了为什么高级热化学计算是巴塞尔制药安全神话的基准。这项任务传达了严谨科学态度在生命科学产业中的决定性作用，展示了巴塞尔制药行业对员工安全和社会责任的坚定承诺。",
            HL_ELITE_1: "在诺华高级热分析实验室，主任 Hartmann 博士正在指导对新型制药冷链保护材料的性能评估。实验利用超灵敏量热技术，模拟全球运输链中各种极端的温度波动对生物制剂焓值的影响。Hartmann 指出，生物药的活性对微小的热量波动极其敏感，精确的 ΔH 测定能决定数百万美元药物的成败。该实验室通过跨学科协作，结合了材料物理与热化学，为诺华的全球供应链开发更高效的绝热包装。学生们在此精英任务中，需要将复杂的相变潜热计算与实际物流数据相结合，体验将基础科学转化为决定性商业价值的过程。这代表了巴塞尔制药工业在每一个细节上追求完美的匠心精神。",
            HL_ELITE_2: "在巴塞尔罗氏数字孪生工艺中心，首席数据科学家 Chen 博士展示了如何利用高通量量热数据来驱动制药过程的实时 AI 模拟。每一秒钟，来自数千个传感器的热流数据都会被转化为数字信号，以优化正在生产的复杂干扰素的收率。Chen 解释说，虽然底层逻辑仍然是基于比热容和质量的基础公式，但在处理海量实时数据时，对瞬时焓变的精确预测成为了提效的关键。该中心是罗氏在工业 4.0 领域的标杆，不仅提高了生产速度，还将每批次药物的能量偏差降到了 0.01% 以下。学徒们通过这一任务，窥见并亲自参与了未来制药工业的能量管理前沿，理解了精准度在这个万亿级产业中的神圣地位。",
            HL_ELITE_3: "在诺华巴塞尔总部的全球可持续发展智库，Dr. Schneider 正在审查一项关于将整个化学合成产业链从石油基溶剂转向水基溶剂的全生命周期分析。核心挑战在于水的高比热容导致的工业能耗重构。他们必须应用高级量热模型，重新计算整个诺华园区内数千个反应釜的加热和冷却周期。Schneider 强调，这种从分子结构出发的能量系统重构，是巴塞尔制药业向绿色、低碳转型过程中最艰巨的任务。学生们在此任务中被赋予了“首席能源官”的角色，需要综合考虑化学性质、工程经济和环境代价，通过复杂的量热计算得出一份足以影响整个城市制药工业未来方向的评估报告。这不仅是对知识的考察，更是对决策能力的终极挑战。",
            HL_ELITE_4: "在莱茵河谷环境与能源协同研究中心，Dr. Hoffmann 正在研究一种革命性的地下热能存储技术，旨在利用冬季多余的能量来驱动夏季的制药冷却设备。量热学在其中起到了桥接地质储热与工业需求的关键作用。Hoffmann 指出，巴塞尔拥有得天独厚的岩石层结构，能够充当巨大的“天然热缓冲池”。这一任务要求学生计算大规模水体及岩石在千万立方米尺度下的总焓存量和热交换效率。作为诺华和罗氏支持的区域性能源项目，其成果将直接改变巴塞尔市的能源账单。学生们在这一精英级别任务中，处理的是不仅关乎试管和烧杯，更是关乎整座城市未来、人与自然和谐共生的宏大能量课题。",
            HL_ELITE_5: "在巴塞尔最高水平的罗氏未来工厂设计组，Dr. Weber 正在设计一种全新的“无反应器”微流控合成系统。这种系统利用微米级通道进行化学反应，其精准的热管理完全颠覆了传统大型量热的范畴。Weber 强调，在微观尺度下，表面积与其体积之比的巨变使得瞬时热传递不再遵循宏观简化定律。为了确保巴塞尔下一代靶向药的极高纯度，他们必须在飞升（femtolitres）级别对微小焓变进行超快动态监测。此精英任务挑战学生突破传统思维束缚，将高级量热法推向其物理极限。通过解决这些微流控中的热传导难题，学生们正在与巴塞尔制药业的顶级工程思维对话，探索人类在分子精准制造领域的最前沿阵地。",
            EC_BASIC_1: "在巴塞尔大学的无机化学课堂上，Emma 正在学习如何使用盖斯定律来确定碳氧化为一氧化碳的反应焓。由于一氧化碳通常与二氧化碳混合产生，直接测量该特定步骤的 ΔH 极其困难。Weber 博士解释道，通过已知的一氧化碳燃烧和碳完全燃烧的焓变，我们可以利用能量守恒的逻辑算出中间步骤。这种间接测量方法在巴塞尔的工业界，尤其是诺华的催化研究中应用广泛。学生们通过绘制循环图，学习将化学反应视为可以像数学方程式一样加减的路径，体会到了热力学定律的严谨之美，这为未来从事更复杂的合成路径优化奠定了重要的理论基石。",
            EC_BASIC_2: "在罗氏位于 Grenzacherstrasse 的分析实验室里，分析员 Maria 正利用盖斯定律验证一种新型催化剂的能量概貌。Maria 解释说，催化剂虽然不改变总反应焓，但它们改变了中间步骤。了解不同中间体的稳定性对于选择正确的催化路线至关重要。盖斯定律告诉我们，无论生产路径如何，从原料到最终药品的总能量变化是恒定的。该实验室每天处理数百个此类逻辑验证，确保每一克贵金属催化剂都能发挥最大经济效益。学生们在这一任务中扮演实习分析师，练习通过加减已知反应方程式来推导目标药用分子的合成焓，这是巴塞尔每一位优秀化学家的必经之路。",
            EC_BASIC_3: "在巴塞尔环境监测中心的空气动力学小组中，技术员 Thomas 正在研究大气中二氧化硫转化为三氧化硫的反应能级。由于这是一个多步、可逆且伴随复杂副反应的过程，盖斯定律成为了计算其总环境热效应的唯一可靠工具。Thomas 指出，巴塞尔的制药公司对硫排放有极严的标准，理解这些大气反应的焓变有助于优化排放洗涤器的性能。这一应用案例展示了盖斯定律不仅存在于课本中，更是保障巴塞尔清澈空气的科学盾牌。学生们通过此项练习，计算了酸雨形成过程中的总能量变迁，理解了化学状态函数的本质——结果远比过程本身更具有守恒的意义。",
            EC_BASIC_4: "在诺华的有机合成初级工作室内，工程师 Hoffmann 博士正带领团队通过已知的燃烧焓来计算一种巴塞尔常用的手性中间体的生成焓。Hoffmann 博士告诉学生，在巴塞尔这种世界顶尖的制药中心，我们通常无法通过简单实验直接制备复杂的中间体，但我们可以通过“绕道”策略——利用已有的海量数据库中的已知反应来重构我们的目标。盖斯定律就是这一策略的灵魂。学生们在电脑前核对德语版化学手册中的焓变数据，通过简单的代数运算解开复杂的能量之谜。这一过程让学生明白，优秀的化学家需要善于利用已有信息，通过逻辑推导解决看似无法触及的技术难题。",
            EC_BASIC_5: "在巴塞尔圣约翰区的一个中学教师研讨会上，Sarah 教授正在展示盖斯定律在教学中的“视觉化法”。通过构建能量阶梯图，她清晰地向学生展示了从初始反应物到最终产物，无论跨越多少台阶，总的高度差是固定的。Sarah 指出，这种逻辑是化学研究中最强大的预测工具之一。在巴塞尔著名的化工区，工程师们利用这种阶梯图来设计能效最高的传热网络。学生们在这一关卡中，通过拖动虚拟磁贴来对齐化学反应箭头，确保原子守恒和能量平衡。这种直观的逻辑练习不仅训练了热化学技能，更培养了在解决复杂科学问题时所需的整体思维和战略眼光。",
            EC_CORE_1: "在罗氏制药的核心研究大楼，首席科学家 Hartmann 博士正面临一个挑战：如何精确预测一个新发现的多步抗病毒分子合成路径的整体热效应。该反应包含三个不稳定的中间体，直接测量它们的焓变既昂贵又危险。Hartmann 决定发动“盖斯定律防御”，利用该定律的路径无关性，将复杂的反应拆解为一系列在巴塞尔标准实验室中已知的简单步骤。这个任务要求学生精确操作化学方程式的符号和系数。如果一个步骤需要翻转，其 ΔH 也必须变号；如果系数翻倍，焓值也要跟着变。这不仅是数学，更是对化学物质在能量转换中“等价交换”原则的深刻理解。",
            EC_CORE_2: "在诺华 Klybeck 园区的自动化实验室里，人工智能系统正在生成数千种可能的合成路线，而工程师 Chen 博士的工作是利用盖斯定律挑选出能量上最稳健的方案。Chen 解释说，很多高效的合成法往往隐藏在复杂的化学循环中，直接测量 ΔH 會因为反应物不纯或时间过快而失败。但由于盖斯定律的逻辑严密性，只要我们有可靠的“已知块”，我们就能拼凑出任何未知的能量拼图。这一核心关卡衡量了学生处理多级联立方程式的能力。学生通过消去中间体（如气体态的自由基），层层递进，直至推导出目标药物分子的能量常数。这是进入巴塞尔制药精英圈层必须掌握的高级逻辑技巧。",
            EC_CORE_3: "在巴塞尔工业博物馆的还原化学馆，馆长 Schneider 博士向参观者讲解如何通过间接法计算铁还原的高温焓值。在高炉中直接测量每个原子的能量动向是物理上的不可能，但通过盖斯定律，我们可以将这一工业过程简化为实验室级别的碳氧反应和金属氧化反应之和。Schneider 强调，这种“以易求难”的智慧，使得巴塞尔的早期化工厂能在 19 世纪就精确控制大规模生产的热能负荷。学生们在这一关卡中处理更复杂的系数平衡，学习如何在叠加方程式时保持原子种类和数量的完全对等。这不仅是对热力学定律的运用，更是对巴塞尔深厚工业积淀中科学精神的致敬。",
            EC_CORE_4: "在罗氏全球质量保障中心，Hoffmann 博士正在审查一份关于一种抗癌药合成热风险的报告。其中一个关键步骤是间接计算一个高活泼有机过氧化物中间体的分解焓。利用盖斯定律将该不安全步骤关联到安全的燃烧反应上，由于测量路径的转换，极大地保护了实验人员的安全。Hoffmann 指出，在制药这种关乎人命的行业，数据逻辑的闭环就是最高级别的安全。学生们需要通过组合四个看似无关的反应，运用盖斯定律推导出目标 ΔH。这一过程不仅锻炼了代数运算的精准度，更传达了化学中“路径无关”思想如何成为一种解决高难度、高风险课题的智慧策略。",
            EC_CORE_5: "在巴塞尔大学的物理化学研究所中，Müller 教授正指导学生通过盖斯定律探索金属催化表面的吸附焓。由于吸附过程通常伴随复杂的表面扩散，直接量热往往混杂了干扰信号。通过将吸附过程分解为气相反应和固相沉积的组合，盖斯定律提供了最纯粹的热力学解析。研究所位于巴塞尔著名的“生命科学铁三角”地带，其精确度和严谨性广为人知。学生在此核心关卡中需要处理包含相态（固体、液体、气体）差异的盖斯循环。每一种物质状态的改变（如汽化热）都必须考虑在内，这极大地提升了任务的真实感和挑战性，完美模拟了真实工业环境中对细节的极致追求。",
            EC_ADVANCED_1: "在巴塞尔大学的高级热力学中心，研究员 Müller 博士正在向研究生演示复杂的量热分析。该实验涉及使用精密弹式量热计测量特定制药中间体的燃烧焓。随着巴塞尔制药公司致力于开发更高效的生产流程，精确的能量足迹数据变得至关重要。Müller 博士解释说，这种先进的技术能捕捉到微妙的吸热和放热相变。该中心与诺华有着长期的科研合作，致力于优化大规模发酵罐的绝热设计。学生们不仅要计算 ΔH，还必须评估热量散失的多重来源，从而提高工业放大的准确性。这一过程是将理论热化学应用于解决全球顶级制药企业面临的复杂能源管理挑战的典范。",
            EC_ADVANCED_2: "在罗氏公司的工艺优化部门，工程师 Andreas 正在为一个新型 5,000 升生物反应器设计冷却系统。他利用高级量热数据，模拟了高浓度细胞培养过程中不断变化的热量释放率。Andreas 指出，单纯的基础量热计算已经不足以应对复杂的生物合成压力。他们采用了差示扫描量热法 (DSC) 来监测反应过程中各组分的比热容动态演变。这项工作直接影响了罗氏在巴塞尔圣约翰区新建的生产设施的能源效率。通过精确的 ΔH 建模，该工厂预计每年可节省 15% 的冷却能源成本。学生们在此任务中通过模拟这些复杂的参数，学习了如何将高级量热法转化为实际的工业效益和环保成果。",
            EC_ADVANCED_3: "在诺华的可持续能源试验工场，首席科学家 Chen 博士正在研究利用工业余热进行区域供气的技术。量热在其中扮演了核心角色，他们需要测量反应器热屏蔽层传导的总热流。Chen 解释说，诺华制药在巴塞尔的目标是建立一个碳中和的科创园区，任何反应释放的“废热”都应被量化并重新利用。这一任务涉及计算复杂流体在通过换热器时的热容变化和总焓流。学生们观察到，在高精度的工业环境下，每一个微小的比热容修正都会对整个园区的热负荷平衡产生重大影响。这种全局性的能源视野是现代制药化学家必备的专业素质，体现了巴塞尔在全球生命科学领域的环保领导力。",
            EC_ADVANCED_4: "在巴塞尔生物工程研究所，Sarah 教授正在研究蛋白质折叠过程中极微小的能量交换。这种专门的等温滴定量热法 (ITC) 实验旨在确定药物分子与目标蛋白结合时的结合焓。由于这种能量变化极小，对量热计的灵敏度和环境稳定性要求极高。Sarah 博士解释说，罗氏开发的抗癌抗体疗法高度依赖这些基础热力学参数来优化药物的亲和力。实验室位于充满活力的莱茵河创新带，吸引了全球各地的顶尖学者。学生们在此任务中学习了如何应用高级热化学原理来解读生命分子间的复杂相互作用。这不仅是化学课，更是理解分子水平上生物过程与能量转换关系的探索之旅。",
            EC_ADVANCED_5: "在罗氏位于巴塞尔的全球安全评估中心，Dr. Zimmermann 正在进行危险化学品的热稳定性评估。利用高级绝热量热仪，他的团队模拟了反应釜出现冷却故障时的极端情况，以确定可能发生失控反应的起始温度。Zimmermann 强调，精确预测反应的放热量和速率是防止工业灾难的唯一途径。诺华和罗氏在每一项新工艺上线前，都会进行至少 20 次此类高规格量热实验。学生们通过处理实验数据计算最高温升和潜在压力，理解了为什么高级热化学计算是巴塞尔制药安全神话的基准。这项任务传达了严谨科学态度在生命科学产业中的决定性作用，展示了巴塞尔制药行业对员工安全和社会责任的坚定承诺。",
            EC_ELITE_1: "在诺华高级热分析实验室，主任 Hartmann 博士正在指导对新型制药冷链保护材料的性能评估。实验利用超灵敏量热技术，模拟全球运输链中各种极端的温度波动对生物制剂焓值的影响。Hartmann 指出，生物药的活性对微小的热量波动极其敏感，精确的 ΔH 测定能决定数百万美元药物的成败。该实验室通过跨学科协作，结合了材料物理与热化学，为诺华的全球供应链开发更高效的绝热包装。学生们在此精英任务中，需要将复杂的相变潜热计算与实际物流数据相结合，体验将基础科学转化为决定性商业价值的过程。这代表了巴塞尔制药工业在每一个细节上追求完美的匠心精神。",
            EC_ELITE_2: "在巴塞尔罗氏数字孪生工艺中心，首席数据科学家 Chen 博士展示了如何利用高通量量热数据来驱动制药过程的实时 AI 模拟。每一秒钟，来自数千个传感器的热流数据都会被转化为数字信号，以优化正在生产的复杂干扰素的收率。Chen 解释说，虽然底层逻辑仍然是基于比热容和质量的基础公式，但在处理海量实时数据时，对瞬时焓变的精确预测成为了提效的关键。该中心是罗氏在工业 4.0 领域的标杆，不仅提高了生产速度，还将每批次药物的能量偏差降到了 0.01% 以下。学徒们通过这一任务，窥见并亲自参与了未来制药工业的能量管理前沿，理解了精准度在这个万亿级产业中的神圣地位。",
            EC_ELITE_3: "在诺华巴塞尔总部的全球可持续发展智库，Dr. Schneider 正在审查一项关于将整个化学合成产业链从石油基溶剂转向水基溶剂的全生命周期分析。核心挑战在于水的高比热容导致的工业能耗重构。他们必须应用高级量热模型，重新计算整个诺华园区内数千个反应釜的加热和冷却周期。Schneider 强调，这种从分子结构出发的能量系统重构，是巴塞尔制药业向绿色、低碳转型过程中最艰巨的任务。学生们在此任务中被赋予了“首席能源官”的角色，需要综合考虑化学性质、工程经济和环境代价，通过复杂的量热计算得出一份足以影响整个城市制药工业未来方向的评估报告。这不仅是对知识的考察，更是对决策能力的终极挑战。",
            EC_ELITE_4: "在莱茵河谷环境与能源协同研究中心，Dr. Hoffmann 正在研究一种革命性的地下热能存储技术，旨在利用冬季多余的能量来驱动夏季的制药冷却设备。量热学在其中起到了桥接地质储热与工业需求的关键作用。Hoffmann 指出，巴塞尔拥有得天独厚的岩石层结构，能够充当巨大的“天然热缓冲池”。这一任务要求学生计算大规模水体及岩石在千万立方米尺度下的总焓存量和热交换效率。作为诺华和罗氏支持的区域性能源项目，其成果将直接改变巴塞尔市的能源账单。学生们在这一精英级别任务中，处理的是不仅关乎试管和烧杯，更是关乎整座城市未来、人与自然和谐共生的宏大能量课题。",
            EC_ELITE_5: "在巴塞尔最高水平的罗氏未来工厂设计组，Dr. Weber 正在设计一种全新的“无反应器”微流控合成系统。这种系统利用微米级通道进行化学反应，其精准的热管理完全颠覆了传统大型量热的范畴。Weber 强调，在微观尺度下，表面积与其体积之比的巨变使得瞬时热传递不再遵循宏观简化定律。为了确保巴塞尔下一代靶向药的极高纯度，他们必须在飞升（femtolitres）级别对微小焓变进行超快动态监测。此精英任务挑战学生突破传统思维束缚，将高级量热法推向其物理极限。通过解决这些微流控中的热传导难题，学生们正在与巴塞尔制药业的顶级工程思维对话，探索人类在分子精准制造领域的最前沿阵地。"
        },
        back: "返回枢纽",
        title: "SC2.07 // 焓与能量学",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "热化学",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "不匹配",
        ready: "就绪",
        monitor_title: "SC2.07_焓监视器",
        footer_left: "SC2.07_焓与能量学 // 节点：巴塞尔",
        stages: {
            energy_changes: "能量变化",
            hess_law: "赫斯定律",
            calorimetry: "量热法"
        },
        prompts: {
            calculate_enthalpy: "计算此反应的焓变 (ΔH)",
            apply_hess_law: "应用赫斯定律确定 ΔH",
            calculate_heat: "使用 q = mcΔT 计算热量变化",
            solve_problem: "解决热化学问题"
        },
        feedback: {
            correct: "正确！您的计算准确。",
            incorrect: "不正确。预期值：{expected} kJ",
            invalid_number: "请输入有效数字"
        },
        mission: {
            title: "任务：热化学",
            description: "掌握制药环境中的焓计算、赫斯定律和量热法。"
        },
        visualization: {
            title: "能量图",
            description: "焓变的可视化表示",
            current_equation: "当前反应"
        }
    },

    // SC1.07: Sustainability & Recycling (Requested per Basel Curriculum)
    sc1_07: {
        title: "SC1.07 // 可持续性与回收",
        back: "返回",
        difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
        stages: {
            recycling: "回收利用",
            green_chemistry: "绿色化学",
            circular_economy: "循环经济"
        },
        footer_left: "SC1.07_可持续性 // 节点：巴塞尔",
        check: "验证",
        next: "下一挑战",
        correct: "可持续方法已验证",
        incorrect: "检查生命周期数据",
        labels: { mission_objective: "生命周期分析", terminal_input: "生态输入", hint: "提示" },
        prompts: {
            sc1_07_q1: "识别此类可回收塑料（缩写）。",
            sc1_07_q2: "计算理想状态下的原子经济性 (%)。",
            sc1_07_q3: "识别产品生命周期的起始点名称。"
        }
    }
};
