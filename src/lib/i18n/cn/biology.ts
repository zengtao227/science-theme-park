/**
 * CN - BIOLOGY translations
 * Auto-generated from i18n.ts refactoring
 * Last updated: 2026-02-15
 */

export const cnBiology = {
    gb1_01: {
        back: "返回枢纽",
        title: "GB1.01 // 进化实验室",
        difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
        objective_title: "当前任务目标",
        monitor_title: "进化监视器",
        stages: {
            natural_selection: "自然选择",
            speciation: "物种形成",
            evidence: "进化证据"
        },
        labels: {
            generation: "世代",
            selection_pressure: "选择压力",
            evolution_score: "进化分数",
            evolution_display: "进化显示",
            input_terminal: "输入终端"
        },
        prompts: {
            natural_selection: "在{initial}只雀鸟的种群中，{survival}只在干旱中存活。计算适应度。",
            speciation: "经过{generations}代，突变率为{rate}，计算遗传分化度。",
            evidence: "一块化石有{age}年历史。C-14半衰期为{halflife}年，求剩余分数。",
            hint_fitness: "适应度 = 存活数 / 初始种群数",
            hint_divergence: "分化度 = 世代数 × 突变率",
            hint_halflife: "剩余量 = (0.5)^(年龄/半衰期)"
        },
        feedback: {
            correct: "自然选择已确认！",
            incorrect: "进化需要更多时间..."
        },
        check: "验证",
        next: "下一代",
        correct: "正确",
        incorrect: "错误",
        ready: "就绪",
        footer_left: "GB1.01 // 进化实验室",
        scenarios: {
            galapagos_study: "巴塞尔自然历史博物馆 - 达尔文的遗产：你是巴塞尔自然历史博物馆的馆长，这里拥有瑞士最重要的生物标本收藏。你的任务是分析来自多个岛屿的历史数据，呼应查尔斯·达尔文在加拉帕戈斯群岛上进行的观察。通过根据极端环境变化期间的存活率计算不同鸟类种群的适应度，你帮助证明了自然选择的力量。在巴塞尔，科学家利用这些博物馆记录来了解当地物种——如甲虫和鸟类——在过去两个世纪中是如何应对城市化而进化的。这项工作就像揭开大自然的隐藏齿轮，观察微小的结构变化如何转化为巨大的生存优势。",
            genetic_drift: "巴塞尔大学生物中心 - 种群动态：作为巴塞尔大学生物中心 (Biozentrum) 的一名研究员，你正在调查附近汝拉山脉隔离种群的遗传组成。遗传漂变——等位基因频率的随机变化——可能在多个世代中导致小群体发生显著分化。通过模拟这些过程，你可以帮助预测瑞士边境地区的濒危物种如何应对栖息地破碎化。巴塞尔在遗传学研究方面的悠久历史，可以追溯到 19 世纪核酸的发现，为你的研究提供了世界级的一流环境。这就像观察一种语言在偏远山谷中的演变；随着时间的推移，基因组的“口音”发生了改变，直到出现了一种新的物种“方言”。",
            fossil_record: "上莱茵河谷 - 亚热带的过去：你是一名在巴塞尔附近莱茵河畔进行挖掘的古生物学家，你发现了犀牛和其他已不再栖息在欧洲的动物遗骸。这些化石是数百万年前巴塞尔存在截然不同气候的证据。通过使用同位素技术来确定这些标本的年代，你帮助自然历史博物馆向公众展示，巴塞尔当前的生物多样性只是漫长而不断变化的进化时间轴上的一个瞬间。这就像发现了一张你城市的古老照片，并意识到现在的温带河流山谷曾经是一片茂盛的亚热带稀树草原。",
            molecular_clock: "弗雷德里希·米舍尔研究所 (FMI) - 生命的时间轴：在巴塞尔的 FMI，你使用分子钟技术来估计不同物种何时拥有共同祖先。通过分析 DNA 序列中的突变率，你可以追溯巴塞尔当地动物群数百万年的进化历史。这项工作致敬了在巴塞尔发现 DNA 的弗雷德里希·米舍尔的遗产，并使这座城市始终处于进化基因组学的最前沿。这就像使用一个慢动作时钟，每一次“滴答”都是一次突变，每一个“小时”都是一百万年的自然历史。"
        }
    },
    gb2_01: {
        back: "返回枢纽",
        title: "GB2.01 // 神经生物学",
        difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
        objective_title: "当前任务目标",
        monitor_title: "神经活动监视器",
        footer_left: "GB2.01_神经生物学 // 节点：巴塞尔",
        check: "验证",
        next: "下一冲动",
        correct: "信号已传递",
        incorrect: "突触故障",
        ready: "就绪",
        stages: {
            anatomy: "神经元解剖",
            potential: "动作电位",
            synapse: "突触传递"
        },
        labels: {
            voltage: "膜电压 (mV)",
            threshold: "阈电位",
            neurotransmitter: "神经递质",
            receptor_affinity: "受体亲和力",
            node_of_ranvier: "郎飞氏结",
            myelin_sheath: "髓鞘",
            cell_body: "胞体",
            axon: "轴突",
            dendrites: "树突"
        },
        prompts: {
            identify_part: "识别负责{function}的结构。",
            calc_potential: "已知{ion}细胞外浓度为{cout}，细胞内浓度为{cin}，计算平衡电位。",
            action_potential: "在上升相期间，哪种离子的流入是导致去极化的主要原因？",
            synapse_mechanism: "哪种离子的内流触发了神经递质向突触间隙的释放？",
            hint_anatomy: "寻找将冲动从胞体传导出去的长纤维。",
            hint_sodium: "钠离子 (Na⁺) 在去极化期间涌入。",
            hint_calcium: "钙离子 (Ca²⁺) 的进入触发囊泡融合。",
            hint_nernst: "使用能斯特方程：E = 61 log10(C_out/C_in)，在37°C时。"
        },
        scenarios: {
            basel_biomedicine: "巴塞尔大学 - 生物中心神经生物学系：在生物中心（Biozentrum）——欧洲领先的分子与细胞生物学中心之一，你正在与Silvia Arber教授的研究小组合作研究神经回路组装。该实验室专注于理解脊髓中的运动神经元如何通过精确的轴突导向连接到特定的肌肉群。使用先进的成像技术和电生理学方法，你绘制锥体神经元的树突分支，并追踪动作电位如何以高达120米/秒的速度通过有髓轴突传播。这项研究直接有助于开发治疗肌萎缩侧索硬化症（ALS）和脊髓损伤的疗法。生物中心的协作环境延续了巴塞尔150年的分子生命科学传统——弗雷德里希·米舍尔于1869年在此首次分离出核素（DNA）。理解神经元解剖结构——从胞体的蛋白质合成机制到轴突末梢的突触囊泡——对巴塞尔的制药工业和大学医院神经科至关重要。",
            roche_neuroscience: "罗氏制药研究 - 神经退行性疾病与罕见病部门：你是罗氏巴塞尔总部的高级神经科学家，致力于开发阿尔茨海默病和帕金森病的下一代治疗方法。你的团队使用膜片钳电生理学技术测量实验化合物如何影响培养的海马神经元中的电压门控钠通道和钾通道。通过分析动作电位产生的动力学——去极化（Na⁺内流）、复极化（K⁺外流）和超极化——你识别出能够在患病大脑中恢复正常神经元放电模式的药物。巴塞尔的制药集群，包括罗氏和诺华，每年在研发上投资超过100亿瑞士法郎，神经科学是战略重点。你的工作建立在巴塞尔数十年研究的基础上，从苯二氮卓类药物的发现到针对淀粉样β斑块的现代生物制剂。这种精准神经药理学可以帮助全球5000万痴呆症患者。",
            neural_plasticity: "巴塞尔大学 - 跨学科研究平台分子与认知神经科学：在生物中心和心理学系的交叉领域工作，你研究学习和记忆背后的突触可塑性机制。你的研究聚焦于海马CA1神经元的长时程增强（LTP），高频刺激（100 Hz）通过NMDA受体激活和钙依赖性信号级联增强突触连接。使用全细胞膜片钳记录，你测量兴奋性突触后电位（EPSPs），并追踪重复刺激如何增加突触后膜上AMPA受体的密度。这项工作对理解年龄相关认知衰退和开发认知增强策略具有直接应用价值。巴塞尔独特的跨学科环境将分子生物学与认知神经科学相结合，使其成为欧洲转化脑研究的中心。大学医院的记忆门诊与你的实验室密切合作，将研究发现转化为临床干预措施。",
            friedrich_miescher: "弗雷德里希·米舍尔生物医学研究所（FMI）- 神经发育与表观遗传学：在由诺华资助的FMI研究所，你致力于理解神经回路在发育过程中如何自我组装。你的项目研究钙信号在神经肌肉接头处神经递质释放中的作用。使用荧光钙指示剂和高速成像技术，你可视化Ca²⁺通过电压门控钙通道的内流如何触发突触囊泡融合，将乙酰胆碱释放到突触间隙（宽度20-40纳米）。你测量量子释放事件，并计算不同刺激方案下的释放概率。这项基础研究致敬了弗雷德里希·米舍尔的遗产——他于1869年在巴塞尔大学医院研究手术绷带中的白细胞核时发现了DNA。今天，FMI延续了这一开创性分子生物学传统，其研究成果为罗氏和诺华的药物开发提供信息。在分子水平上理解突触传递对于治疗重症肌无力、兰伯特-伊顿综合征和其他神经肌肉疾病至关重要。"
        },
        feedback: {
            correct: "动作电位成功传导验证通过！",
            incorrect: "信号丢失。请复习神经机制。"
        }
    },
    gb3_01: {
        back: "返回枢纽",
        title: "GB3.01 // DNA 熔炉",
        difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
        objective_title: "当前任务目标",
        target_title: "DNA 结构",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "GB3.01_DNA_监视器",
        footer_left: "GB3.01_DNA_熔炉 // 节点：巴赛尔",
        stages: {
            pairing: "碱基配对",
            bonds: "氢键计算",
            sequence: "序列合成"
        },
        labels: {
            rotation: "旋转控制",
            auto_rotate: "自动旋转",
            show_bonds: "显示氢键",
            highlight_pair: "高亮碱基对",
            pairing_rules: "碱基配对规则",
            bases: "核苷酸碱基",
            structure: "DNA 结构详解",
            adenine: "腺嘌呤",
            thymine: "胸腺嘧啶",
            cytosine: "胞嘧啶",
            guanine: "鸟嘌呤",
            analysis: "碱基对分析"
        },
        results: {
            valid: "配对稳定",
            invalid: "螺旋不稳定",
            valid_desc: "核苷酸配对已验证。",
            invalid_desc: "检测到序列不匹配。",
            next: "锻造下一对"
        },
        concepts: {
            helix: "双螺旋：两条反向平行的脱氧核糖核酸链",
            backbone: "骨架：由糖和磷酸基团交替连接而成",
            at_pair: "A ↔ T: 通过两个氢键连接",
            gc_pair: "C ↔ G: 通过三个氢键连接",
            polarity: "极性：5' 到 3' 的定向性",
            complementary: "法则：查加夫碱基互补配对原则"
        },
        mission: {
            title: "任务：DNA 架构分析",
            description: "掌握 DNA 双螺旋的结构原理。验证碱基配对规则与氢键的稳定性。"
        },
        prompts: {
            pairing_prompt: "识别 {base} 的互补碱基。",
            bonds_prompt: "{b1} 与 {b2} 之间由多少个氢键连接？",
            seq_prompt: "推导该序列的互补序列: {seq}",
            pairing_target: "{base} 的互补碱基",
            bonds_target: "氢键数量: ?",
            seq_target: "互补序列流",
            hint_at: "A 与 T 配对，产生 2 个氢键。",
            hint_gc: "G 与 C 配对，产生 3 个氢键。"
        }
    },
    gb3_02: {
        back: "返回枢纽",
        title: "GB3.02 // 免疫学实验室",
        difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
        objective_title: "当前任务目标",
        monitor_title: "免疫反应监视器",
        footer_left: "GB3.02_免疫学 // 节点：巴塞尔",
        check: "验证",
        next: "下一挑战",
        correct: "抗原已被中和",
        incorrect: "病原体逃逸",
        ready: "就绪",
        stages: {
            innate: "先天性免疫",
            adaptive: "特异性免疫",
            vaccines: "疫苗与免疫记忆"
        },
        labels: {
            antigen_count: "抗原负荷",
            antibody_titer: "抗体滴度",
            b_cell_activity: "B 细胞活性",
            t_cell_count: "T 细胞激活度",
            pathogen_type: "病原体类型",
            inflammation_level: "炎症水平",
            macrophage_status: "巨噬细胞状态"
        },
        prompts: {
            innate_defense: "{pathogen} 突破了皮肤屏障。哪些细胞提供了第一道快速反应点？",
            antibody_matching: "已知抗原结构为 {antigen}，抗体的哪个区域确保了结合的特异性？",
            memory_response: "在二次免疫反应中，延迟期为 {lag} 天，而初次反应为 {primary_lag} 天。计算反应加速倍数。",
            vaccine_logic: "mRNA 疫苗如何在不使用活病原体的情况下，促使免疫系统识别病毒？",
            hint_innate: "思考巨噬细胞和中性粒细胞等吞噬细胞。",
            hint_adaptive: "B 细胞产生抗体；T 细胞杀死受感染细胞。",
            hint_constant: "抗体的高变区（可变区）是关键。",
            hint_memory: "记忆细胞允许几乎瞬时的二次免疫反应。"
        },
        scenarios: {
            roche_immunology: "罗氏免疫学 - 精准抗体：在巴塞尔罗氏的免疫学实验室中，你正在设计新一代单克隆抗体。这些医学界的“智能导弹”被设计成能够以绝对精度识别癌细胞表面的特定结构。通过了解特异性免疫系统如何利用可变区（高变区）来确保特异性，你可以开发出在摧毁肿瘤的同时不伤害健康组织的疗法。这项工作代表了“巴塞尔生物技术”生态系统的最前沿。这就像是一名锁匠，必须为一把仅在敌方领土上发现的锁设计一把唯一的钥匙。",
            basel_hospital_infectious: "巴塞尔大学医院 - 病原体防御：在巴塞尔大学医院（Universitätsspital Basel），你是一个传染病团队的一员，负责监测先天免疫系统对新病原体的反应。从皮肤破损到巨噬细胞激活，你的分析有助于医生为该市居民制定更快的治疗方案。在全球化的世界中，巴塞尔的医疗“盾牌”因为这种详细的细胞监测而变得更加强大。这就像是一个城墙上的哨兵，在威胁突破内部防线之前很久就识别出它们。",
            vaccine_research: "瑞士疫苗研究所 - 记忆工程：基于巴塞尔研究集群，你在疫苗研究所的工作专注于“教育”免疫系统。通过创建能够“记住”病毒蓝图的记忆细胞，你可以帮助确保二次免疫反应迅速且强大。这项研究对瑞士及其他地区的公共卫生至关重要。这就像训练一支专门的警察部队，他们可以根据一张旧照片立即认出罪犯，从而在案件发生前阻止它。",
            autoimmune_center: "巴塞尔自身免疫研究中心 - 身份迷失：该中心的研究聚焦于免疫系统何时失去其内部“地图”并开始攻击人体自身的组织。你的任务是了解在多发性硬化症等疾病中出错的阈电位和激活信号。解开这个谜题是巴塞尔生命科学界的当务之急。这就像是一个被错误编程的安保系统，开始把房主锁在门外——恢复正确的身份识别是康复的关键。"
        },
        feedback: {
            correct: "免疫防御成功！记忆细胞已存档。",
            incorrect: "免疫反应不足。病原体正在扩散。"
        }
    },
    sb1_01: {
        back: "返回枢纽",
        title: "SB1.01 // 细胞工厂",
        difficulty: {
            basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "细胞分析",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "SB1.01_细胞监视器",
        footer_left: "SB1.01_细胞工厂 // 节点：巴塞尔",
        stages: {
            identification: "结构识别",
            function: "功能匹配",
            organelles: "细胞器详解"
        },
        labels: {
            cutaway_view: "切面视图",
            selected: "选定细胞器",
            instructions: "操作说明",
            nucleus: "细胞核",
            mitochondria: "线粒体",
            chloroplast: "叶绿体",
            ribosome: "核糖体",
            golgi: "高尔基体",
            er: "内质网",
            membrane: "细胞膜",
            vacuole: "液泡"
        },
        mission: {
            title: "任务：细胞探索",
            description: "探索真核细胞结构。识别细胞器并理解它们在细胞生命活动中的作用。"
        },
        results: {
            valid: "结构已验证",
            invalid: "分析错误",
            valid_desc: "细胞器匹配数据库。正在继续。",
            invalid_desc: "形态分析中检测到不匹配。",
            next: "下一标本",
            analysis: "显微分析"
        },
        prompts: {
            id_prompt: "识别细胞器: {organelle}",
            id_target: "高亮部分: ?",
            fn_prompt: "哪个细胞器负责: {func}?",
            fn_target: "功能: {func}",
            hint_name: "它是 {name}",
            hint_start: "答案以 {char} 开头",
            hint_func: "该细胞器执行: {func}",
            hint_range: "数值在 {min} 到 {max} 之间",
            org_count_mitochondria: "人类肝细胞中通常有多少个线粒体？",
            org_count_ribosomes: "典型真核细胞中大约有多少个核糖体？",
            org_nucleus_diameter: "细胞核的典型直径是多少微米？",
            org_cell_diameter: "动物细胞的典型直径是多少微米？",
            org_mitochondria_length: "线粒体的典型长度是多少微米？",
            org_golgi_cisternae: "高尔基体中通常有多少个扁平囊（囊泡）？",
            org_lysosome_count: "典型动物细胞中大约有多少个溶酶体？",
            org_er_percentage: "内质网占细胞体积的百分比是多少？",
            org_nuclear_pores: "核膜上通常有多少个核孔？",
            org_peroxisome_count: "典型肝细胞中大约有多少个过氧化物酶体？",
            org_atp_per_glucose: "有氧呼吸中一个葡萄糖分子产生多少个ATP分子？",
            org_protein_synthesis_rate: "蛋白质合成的典型速率是每秒多少个氨基酸？",
            org_membrane_thickness: "细胞膜的厚度是多少纳米？",
            org_microtubule_diameter: "微管的直径是多少纳米？",
            org_ribosome_diameter: "核糖体的直径是多少纳米？",
            org_cristae_surface_area: "线粒体嵴的近似表面积是多少平方微米？",
            org_nuclear_dna_length: "如果将人类细胞核中的所有DNA拉直，长度是多少米？",
            org_golgi_transit_time: "蛋白质通过高尔基体需要多少分钟？",
            org_lysosome_ph: "溶酶体内部的典型pH值是多少？",
            org_mitochondrial_dna: "线粒体DNA中编码多少个基因？"
        },
        organelles: {
            nucleus: {
                name: "细胞核",
                func: "控制中心 / DNA 存储",
                details: "包含 DNA 并控制所有细胞活动。细胞的“大脑”。"
            },
            mitochondria: {
                name: "线粒体",
                func: "ATP 能量产生 (动力源)",
                details: "通过细胞呼吸产生 ATP。将葡萄糖转化为能量。"
            },
            ribosome: {
                name: "核糖体",
                func: "蛋白质合成",
                details: "通过读取 mRNA 序列合成蛋白质。"
            },
            golgi: {
                name: "高尔基体",
                func: "包装与运输",
                details: "修改、包装并将蛋白质运输到目的地。"
            },
            er: {
                name: "内质网",
                func: "合成网络 (ER)",
                details: "粗面内质网：蛋白质合成。光面内质网：脂质合成和解毒。"
            },
            lysosome: { name: "溶酶体", func: "细胞消化", details: "含有消化酶，分解废物和细胞碎片。" },
            peroxisome: { name: "过氧化物酶体", func: "脂质代谢", details: "分解脂肪酸并解毒有害物质。" },
            centrosome: { name: "中心体", func: "微管组织", details: "组织微管并调节细胞分裂。" },
            vacuole: { name: "液泡", func: "储存和膨压", details: "储存水、营养物质和废物。维持细胞膨压。" },
            cytoskeleton: { name: "细胞骨架", func: "结构支撑", details: "蛋白质纤维网络，提供细胞形状并实现运动。" },
            nucleolus: { name: "核仁", func: "核糖体组装", details: "核内核糖体RNA合成和核糖体组装的场所。" },
            nuclear_pore: { name: "核孔", func: "核运输", details: "核膜上的通道，允许分子选择性运输。" },
            smooth_er: { name: "光面内质网", func: "脂质合成", details: "合成脂质和类固醇，解毒药物和毒物。" },
            rough_er: { name: "粗面内质网", func: "蛋白质合成", details: "表面附着核糖体，合成分泌蛋白。" },
            centriole: { name: "中心粒", func: "纺锤体形成", details: "一对圆柱形结构，在细胞分裂时形成有丝分裂纺锤体。" },
            microtubule: { name: "微管", func: "细胞内运输", details: "空心管状结构，作为运动蛋白运输货物的轨道。" },
            microfilament: { name: "微丝", func: "细胞运动", details: "细肌动蛋白丝，参与细胞运动和形状变化。" },
            intermediate_filament: { name: "中间纤维", func: "机械强度", details: "绳状纤维，为细胞提供机械稳定性。" },
            nuclear_envelope: { name: "核膜", func: "核区隔化", details: "双层膜，将细胞核与细胞质分隔开。" },
            cristae: { name: "嵴", func: "ATP合成表面", details: "线粒体内膜折叠，ATP合成发生的场所。" }
        }
    },
    sb1_01_metabolic: {
        back: "返回枢纽",
        title: "SB1.01 // 代谢引擎",
        difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
        objective_title: "当前任务目标",
        target_title: "代谢状态",
        next: "执行下一序列",
        check: "验证",
        correct: "稳态正常",
        incorrect: "代谢危机",
        ready: "就绪",
        monitor_title: "SB1.01_代谢监视器",
        footer_left: "SB1.01_细胞生物学 // 节点：巴赛尔",
        stages: {
            osmosis: "渗透作用",
            respiration: "细胞呼吸",
            homeostasis: "内稳态"
        },
        labels: {
            osmolarity: "外部渗透压",
            atp_flow: "显示 ATP 流",
            hypertonic: "高渗",
            isotonic: "等渗",
            hypotonic: "低渗",
            status: "渗透状态",
            respiration_formula: "呼吸作用公式",
            glucose: "葡萄糖",
            oxygen: "氧气",
            atp: "ATP 能量",
            analysis: "生物目标"
        },
        results: {
            valid: "稳态平衡",
            invalid: "代谢危机",
            valid_desc: "已达到细胞平衡。",
            invalid_desc: "检测到细胞压力。请纠正代谢流。",
            next: "下一平衡"
        },
        prompts: {
            osmosis_prompt: "细胞处于{status}环境中。水分会如何移动？",
            respiration_prompt: "完成呼吸作用反应物：C₆H₁₂O₆ + 6{reactant} → ...",
            product_prompt: "呼吸作用的主要能量产物是什么？",
            homeostasis_target: "调节环境以达到等渗状态。",
            hint_hyper: "外部盐分高！水分离开细胞。",
            hint_hypo: "外部盐分低！水分涌入细胞。",
            hint_oxy: "我们吸入它来氧化葡萄糖。",
            hint_iso: "无净移动。",
            hint_atp: "细胞的主要能量货币。",
            hint_homeostasis: "将值设为零以保持稳定。"
        },
        latex_labels: {
            water_movement: "水分移动",
            product: "产物",
            reactant: "反应物",
            target_osmolarity: "目标渗透压",
            current_error: "当前误差："
        }
    },
    sb1_02: {
        back: "返回枢纽",
        title: "SB1.02 // 光合作用实验室",
        difficulty: { basic: "基础", core: "核心", advanced: "高级", elite: "精英" },
        check: "验证",
        next: "执行下一序列",
        correct: "已验证",
        incorrect: "不匹配",
        ready: "准备就绪",
        monitor_title: "SB1.02_光合作用_监测器",
        footer_left: "SB1.02_光合作用实验室 // 节点：巴塞尔",
        objective_title: "当前任务目标",
        stages: {
            equation: "反应方程式",
            factors: "限制因子",
            chloroplast: "叶绿体"
        },
        labels: {
            light: "光照强度",
            co2: "CO2水平",
            temp: "温度",
            efficiency: "效率",
            reaction_display: "反应显示",
            input_terminal: "输入终端"
        },
        results: {
            valid: "反应已平衡",
            invalid: "反应错误",
            valid_desc: "光合作用方程式验证成功。",
            invalid_desc: "化学计量错误。请检查原子平衡。",
            next: "下一挑战"
        },
        canvas_labels: {
            light: "光能",
            rate: "速率",
            thylakoid: "类囊体",
            stroma: "基质",
            co2_label: "CO₂",
            temp_label: "温度"
        },
        prompts: {
            reactant: "完成方程式：6CO₂ + 6H₂O + 光能 → C₆H₁₂O₆ + 6{O₂}。缺少的反应物数量是多少？",
            hint_oxygen: "计算方程式两边的氧原子数",
            glucose: "{co2}个CO₂分子能产生多少个葡萄糖分子？",
            hint_glucose: "CO₂与葡萄糖的比例为6:1",
            water_count: "生产{glucose}个葡萄糖分子需要多少个水分子？",
            hint_balance: "平衡方程式：每个葡萄糖分子需要6个水分子",
            factor_effect: "如果{factor}减少一半，光合速率会怎样变化？",
            hint_factor: "每个因素都独立限制最大速率",
            structure_function: "叶绿体中哪个结构负责{process}？",
            hint_structure: "光反应在类囊体膜中进行；卡尔文循环在基质中进行"
        },
        feedback: {
            correct: "光合作用方程式平衡！",
            incorrect: "请复习光合作用反应。"
        }
    },
    sb1_03: {
        back: "返回枢纽",
        title: "SB1.03 // 细胞分裂",
        check: "验证",
        next: "下一阶段",
        correct: "阶段完成",
        incorrect: "错位",
        ready: "就绪",
        monitor_title: "SB1.03_复制中心",
        footer_left: "SB1.03_细胞分裂 // 节点：巴塞尔",
        objective_title: "当前任务目标",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        stages: {
            mitosis: "有丝分裂",
            meiosis_i: "减数分裂 I",
            meiosis_ii: "减数分裂 II"
        },
        labels: {
            analysis: "细胞分裂分析",
            phase_analysis: "阶段分析",
            chromosome_count: "染色体计数",
            hint: "分裂提示",
            visualization: "细胞分裂可视化",
            loading: "加载细胞数据..."
        },
        scenarios: {
            mitosis: "巴塞尔大学医院 - 癌症研究部门：你正在巴塞尔大学医院的肿瘤研究实验室工作，理解有丝分裂对癌症治疗至关重要。有丝分裂是单个细胞分裂产生两个相同子细胞的过程，每个子细胞的染色体数量与母细胞相同（人类为46条）。这个过程确保遗传连续性，对生长、组织修复和无性繁殖至关重要。该过程包括几个阶段：前期（染色质凝聚成可见的染色体，每条染色体由两条姐妹染色单体在着丝粒处连接组成），中期（染色体排列在细胞赤道处），后期（姐妹染色单体分离并移向相反的两极），末期（核膜在每组染色体周围重新形成）。你的任务是追踪每个阶段的染色单体或染色体数量。理解有丝分裂是巴塞尔尖端癌症研究的基础，因为癌细胞通常具有异常的有丝分裂过程。这些知识帮助罗氏和大学医院的研究人员开发靶向疗法，在保护正常细胞的同时破坏癌细胞分裂。",
            meiosis_i: "弗雷德里希·米舍尔研究所 - 生殖生物学实验室：在巴塞尔的FMI，你正在研究减数分裂，这是一种产生配子（性细胞）的特殊细胞分裂，染色体数量减半。减数分裂I是第一次分裂，同源染色体对分离，染色体数量从二倍体（2n = 46）减少到单倍体（n = 23）。这个过程的独特之处在于前期I期间的交叉互换，同源染色体交换遗传物质，产生遗传多样性。各阶段包括：前期I（同源染色体配对并交换片段），中期I（配对的染色体排列在细胞赤道处），后期I（同源染色体分离并移向相反的两极），末期I（形成两个单倍体细胞，每个细胞有23条染色体，但每条染色体仍由两条姐妹染色单体组成）。你的任务是计算每个阶段的染色体或染色体对数量。理解减数分裂对巴塞尔的生殖医学和遗传咨询服务至关重要，帮助家庭理解遗传模式和遗传疾病。",
            meiosis_ii: "巴塞尔遗传咨询中心 - 遗传分析：你正在巴塞尔遗传咨询中心工作，理解减数分裂II对向家庭解释遗传至关重要。减数分裂II类似于有丝分裂，但从单倍体细胞开始。它分离姐妹染色单体以产生四个单倍体配子，每个配子有23条单染色体。各阶段包括：前期II（染色体再次凝聚），中期II（染色体排列在赤道处），后期II（姐妹染色单体最终分离），末期II（形成四个单倍体细胞，每个细胞有23条单染色体）。这个过程解释了为什么兄弟姐妹尽管有相同的父母却可能看起来不同 - 由于减数分裂I中的交叉互换和独立分配，每个配子携带独特的遗传物质组合。你的任务是追踪每个阶段的染色体计数。这些知识对巴塞尔的遗传咨询服务至关重要，帮助家庭理解唐氏综合症（21三体）等由减数分裂错误导致的疾病。"
        },
        prompts: {
            mitosis_count: "在有丝分裂的{phase}期，有多少条染色单体？",
            meiosis_i_count: "在减数分裂I的{phase}期，有多少条染色体或染色体对？",
            meiosis_ii_count: "在减数分裂II的{phase}期，有多少条染色体？",
            hint_mitosis: "在有丝分裂中，姐妹染色单体在后期分离，暂时使计数加倍",
            hint_meiosis_i: "减数分裂I分离同源染色体对，从每个细胞46条减少到23条染色体",
            hint_meiosis_ii: "减数分裂II分离姐妹染色单体，类似于有丝分裂但从23条开始"
        },
        results: {
            valid: "分裂已验证",
            invalid: "染色体计数错误",
            valid_desc: "细胞分裂阶段分析正确。",
            invalid_desc: "重新计算此阶段的染色体数量。",
            next: "下一阶段"
        }
    },
    sb2_01_tissues: {
        back: "返回枢纽",
        title: "SB2.01 // 组织与器官",
        difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
        objective_title: "当前任务目标",
        monitor_title: "组织结构监视器",
        footer_left: "SB2.01_组织器官 // 节点：巴塞尔",
        check: "验证",
        next: "下一层级",
        correct: "正确",
        incorrect: "错误",
        ready: "就绪",
        stages: {
            tissues: "组织类型",
            organs: "器官组成",
            systems: "器官系统"
        },
        scenarios: {
            tissues: "巴塞尔大学医院 - 病理学研究所：你是巴塞尔大学医院（Universitätsspital Basel）的医学生，这是瑞士领先的医疗中心之一，在病理学研究所Müller博士的指导下学习组织识别。在生物医学系使用最先进的蔡司显微镜，你检查来自不同解剖区域的组织学样本。四种主要组织类型各有独特的结构和功能特征：上皮组织（epithelium）形成保护屏障和分泌表面 - 单层鳞状上皮衬里血管，复层鳞状上皮保护皮肤，带微绒毛的柱状上皮在肠道吸收营养。结缔组织提供机械支撑和代谢功能 - 致密规则结缔组织形成肌腱，透明软骨缓冲关节，密质骨提供骨骼结构，脂肪组织储存能量。肌肉组织产生收缩力 - 心肌（myocardium）通过不随意的节律性收缩泵血，骨骼肌通过神经肌肉接头实现随意运动，平滑肌调节消化和血管系统的器官功能。神经组织处理和传递电化学信号 - 神经元传导动作电位，而神经胶质细胞（星形胶质细胞、少突胶质细胞、小胶质细胞）提供支持和绝缘。你的任务是根据组织的显微结构、细胞组成和解剖位置识别每种组织类型的主要功能。这项基本技能对巴塞尔著名医疗机构的临床病理学至关重要，因为异常的组织学往往表明疾病过程。理解组织功能是理解器官生理学的基础。",
            organs: "罗氏制药研究 - 器官系统生物学部门：你在罗氏位于巴塞尔的全球总部工作，特别是在器官系统生物学部门，科学家们在这里为药物发现和临床前测试创建详细的人体器官计算和物理模型。巴塞尔作为世界领先的制药中心，拥有罗氏、诺华和生物中心的尖端研究。人体中的每个器官都代表多种组织类型协调和谐工作的复杂整合。心脏（cor）包含四种组织类型：心肌组织（带闰盘的心肌用于同步收缩），上皮组织（心内膜衬里心腔和内皮衬里血管），结缔组织（纤维性心脏骨架提供结构框架和瓣膜支撑），和神经组织（来自心脏丛的自主神经支配控制心率和收缩力）。胃（gaster）同样整合：上皮组织（胃粘膜，壁细胞分泌HCl，主细胞分泌胃蛋白酶原），平滑肌组织（肌层外层的环形和纵向层用于蠕动），结缔组织（粘膜下层提供血管和神经支持），和神经组织（肌间神经丛协调消化蠕动）。肝脏（hepar）包含：上皮组织（排列在小叶中执行代谢功能的肝细胞），结缔组织（格利森囊和门静脉三联），和特化的内皮组织（用于血液过滤的窦状毛细血管）。你的任务是量化每个器官的组织类型组成。这些信息对于理解药物化合物如何影响器官内不同细胞群至关重要 - 针对平滑肌的药物也可能与同一器官中的上皮或神经成分相互作用。准确的多组织器官模型帮助罗氏和其他巴塞尔制药公司通过在人体临床试验前预测潜在副作用和脱靶相互作用来开发更安全、更有效的药物。这项工作直接促进了巴塞尔大学医院和全球医疗中心使用的救命疗法的开发。",
            systems: "巴塞尔大学医学院 - 解剖学系：你在巴塞尔大学医学院学习人体解剖学，这是欧洲最古老和最负盛名的医学院之一（成立于1460年），学习人体如何以层级结构框架组织。这种生物组织层级遵循从分子到生物体复杂性的逻辑进程：细胞（生命的基本单位，如单个带肌节收缩的心肌细胞）→ 组织（具有共同功能和细胞外基质的相似细胞群，如心肌组织）→ 器官（由多种组织类型组成具有特定生理作用的整合结构，如具有四个心腔的心脏）→ 器官系统（执行相关功能的协调器官群，如具有心脏、动脉、静脉和毛细血管的心血管系统）→ 生物体（作为整合整体的完整人体）。例如，单个心肌细胞（心肌细胞）及其收缩蛋白通过闰盘与数百万其他心肌细胞连接形成心肌组织。这种肌肉组织与心内膜上皮（衬里心腔）、纤维性结缔组织（心脏骨架和瓣膜）和自主神经组织（用于速率控制的心脏丛）结合形成心脏器官。然后心脏与血管（弹性动脉如主动脉、分布用的肌性动脉、交换用的毛细血管和回流用的静脉）协调工作形成心血管系统，在整个生物体中运输氧气、营养物质、激素和免疫细胞，同时清除代谢废物。理解这种层级组织对巴塞尔医疗机构的临床医学和研究至关重要 - 分子缺陷（如编码心肌肌钙蛋白的基因突变）可以通过细胞功能障碍、组织病理学、器官衰竭和系统性疾病级联影响整个生物体。你的任务是识别这个生物层级中的正确层次并理解主要器官系统的组成。这些知识对于巴塞尔大学医院的医疗实践以及生物中心和弗雷德里希·米舍尔研究所的生物医学研究至关重要。"
        },
        labels: {
            analysis: "组织分析",
            terminal: "输入终端",
            hint: "病理学提示",
            tissue_type: "组织类型",
            organ_structure: "器官结构",
            system_hierarchy: "系统层级"
        },
        anatomy: {
            tissues: {
                epithelial: {
                    name: "上皮组织",
                    function: "保护、分泌、吸收",
                    subtypes: "鳞状、立方、柱状；单层或复层",
                    location: "皮肤表皮、肠道内衬、腺体组织"
                },
                connective: {
                    name: "结缔组织",
                    function: "结构支撑、能量储存、免疫防御",
                    subtypes: "疏松、致密、软骨、骨、血液、脂肪",
                    location: "肌腱、韧带、骨基质、血管"
                },
                muscle: {
                    name: "肌肉组织",
                    function: "收缩和力量产生",
                    subtypes: "骨骼肌（随意）、心肌（不随意）、平滑肌（不随意）",
                    location: "骨骼肌、心肌层、器官壁"
                },
                nervous: {
                    name: "神经组织",
                    function: "信号传递和信息处理",
                    subtypes: "神经元（传导）、神经胶质细胞（支持）",
                    location: "大脑、脊髓、周围神经"
                }
            },
            organs: {
                heart: "心脏（Cor）：4种组织类型 - 心肌、内皮、结缔、神经",
                stomach: "胃（Gaster）：4种组织类型 - 上皮粘膜、平滑肌、结缔、神经",
                liver: "肝脏（Hepar）：3种组织类型 - 肝细胞、结缔、内皮",
                kidney: "肾脏（Ren）：4种组织类型 - 上皮小管、结缔、血管、神经"
            },
            hierarchy: {
                cell: "细胞 - 生命的基本单位",
                tissue: "组织 - 相似细胞群",
                organ: "器官 - 多种组织整合",
                system: "器官系统 - 协调的器官",
                organism: "生物体 - 完整个体"
            }
        },
        results: {
            valid: "生物验证通过",
            invalid: "诊断错误",
            valid_desc: "所识别的生物结构与数据库相符。",
            invalid_desc: "识别错误。请重新检查组织形态及其功能。",
            next: "分析下一阶段"
        },
        prompts: {
            epithelial_func: "上皮组织覆盖身体表面。其主要功能是什么？",
            connective_func: "结缔组织提供结构支持。其功能是：",
            muscle_func: "肌肉组织使身体能够运动。其功能是什么？",
            nervous_func: "神经组织传递电信号。其功能是什么？",
            absorb_func: "肠道中的上皮组织吸收营养。功能是？",
            organ_count: "{organ}包含肌肉、上皮、结缔和神经组织。数量：",
            organ_count_simple: "{organ}包含{list}。数量：",
            hierarchy: "完成：细胞 \\\\to 组织 \\\\to 器官 \\\\to ?",
            system_count: "{system}拥有{n}个主要器官。数量：",
            nervous_divisions: "神经系统有两个主要分支。数量：",
            hint_epithelial: "覆盖并保护表面",
            hint_connective: "提供框架",
            hint_muscle: "通过收缩进行运动",
            hint_nervous: "发送电信号",
            hint_organs: "所有器官都包含多种组织",
            hint_systems: "器官的集合",
            location: "位置: {loc}",
            function_label: "功能",
            next_level: "下一层级"
        },
        feedback: {
            correct: "组织识别已验证！继续下一标本。",
            incorrect: "组织识别错误。请复习组织学特征。"
        }
    },
    sb2_01: {
        back: "返回枢纽",
        title: "SB2.01 // 孟德尔花园",
        difficulty: {
            basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "遗传杂交",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "SB2.01_遗传学监视器",
        footer_left: "SB2.01_孟德尔花园 // 节点：巴塞尔",
        stages: {
            monohybrid: "单性状杂交",
            probability: "概率计算",
            dihybrid: "双性状杂交"
        },
        labels: {
            parent: "亲本",
            offspring: "子代",
            punnett_square: "普瑞特方格",
            stats: "子代统计",
            genotype_ratio: "基因型比例",
            phenotype_ratio: "表现型比例",
            purple_flowers: "紫色花",
            white_flowers: "白色花",
            genetics_basics: "遗传学基础",
            genotype_phenotype: "基因型与表现型",
            dominance: "显性规则",
            mendels_laws: "孟德尔定律",
            instructions: "操作说明"
        },
        concepts: {
            allele: "等位基因：基因的一种版本",
            dominant: "R (显性)：紫色花",
            recessive: "r (隐性)：白色花",
            genotype: "基因型：遗传组成 (RR, Rr, rr)",
            phenotype: "表现型：可观察性状 (紫色/白色)",
            homozygous_dom: "RR → 紫色 (纯合显性)",
            heterozygous: "Rr → 紫色 (杂合)",
            homozygous_rec: "rr → 白色 (纯合隐性)",
            law_segregation: "分离定律：每个亲本贡献一个等位基因",
            law_assortment: "自由组合定律：在配子形成过程中，等位基因独立分离"
        },
        mission: {
            title: "任务：孟德尔遗传学",
            description: "掌握孟德尔遗传定律。使用普瑞特方格预测子代比例。"
        },
        prompts: {
            monohybrid_ratio: "杂交 {p1} \\times {p2}。紫色对白色的表现型比例是多少？",
            monohybrid_percent: "杂交 {p1} \\times {p2}。紫色子代的百分比是多少？",
            prob_genotype: "杂交 {p1} \\times {p2}。出现 {genotype} 子代的概率是多少？",
            ratio_target: "\\text{比例 } P:W = ?",
            percent_target: "\\text{紫色百分比}",
            prob_target: "P({genotype}) = ?",
            hint_square: "检查普瑞特方格。",
            hint_all_rr: "所有子代均为 Rr。",
            hint_count: "4个方格中的 {count} 个。"
        }
    },
    sb2_02: {
        back: "返回枢纽",
        title: "SB2.02 // 人体系统",
        difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
        check: "验证",
        next: "执行下一序列",
        correct: "已验证",
        incorrect: "不匹配",
        ready: "就绪",
        monitor_title: "SB2.02_人体系统_监控",
        footer_left: "SB2.02_人体系统 // 节点：巴塞尔",
        objective_title: "当前任务目标",
        stages: {
            digestive: "消化系统",
            circulatory: "循环系统",
            respiratory: "呼吸系统"
        },
        scenarios: {
            digestive: "巴塞尔大学医院胃肠病科：你正在跟随巴塞尔大学医院的胃肠病学家 Weber 博士，她正在向医学生讲解消化系统。消化系统是一个复杂的器官集合，它们协同工作，将食物分解为身体可以吸收并用于能量、生长和细胞修复的营养物质。旅程从口腔开始，机械消化（咀嚼）和化学消化（唾液酶）开始分解食物。然后食物通过蠕动波（肌肉收缩）经食道进入胃，在那里强大的胃酸（pH 1.5-3.5）和胃蛋白酶进一步分解蛋白质。部分消化的食物（食糜）进入小 intestine（6-7 米长），那里通过数百万个被称为绒毛的微小指状突起进行大部分营养吸收。肝脏产生胆汁以乳化脂肪，而胰腺分泌消化酶和碳酸氢盐来中和胃酸。最后，大 intestine 吸收水分并形成固体废物。理解这个系统对于诊断克罗恩病、溃疡和影响成千上万巴塞尔居民的吸收不良障碍至关重要。你的任务是在消化路径中识别正确的器官，并理解每个器官在这个非凡的生物流水线中的特定功能。",
            circulatory: "巴塞尔心脏中心 - 心脏功能分析：你正在巴塞尔心脏中心与 Schneider 博士一起工作，分析循环系统如何向人体的每个细胞输送氧气和营养物质，同时移除二氧化碳和代谢废物。心脏是一个强大的肌肉泵，有四个腔室：两个心房（接收血液的上腔室）和两个心室（泵出血液的下腔室）。右侧将脱氧血泵入肺部进行氧合，而左侧通过血管网络将富氧血泵入全身。动脉在高压下（收缩压 ~120 mmHg）将血液从心脏带走，具有厚实的弹性壁以承受这种压力。静脉在低压下将血液送回心脏，使用单向瓣膜防止回流。毛细血管是微小的血管，血液和组织在这里进行气体交换。成年人心脏平均每分钟跳动 60-100 次，静息时每分钟约泵出 5 升血液（心输出量）。在剧烈运动期间，这一数字会增加到每分钟 20-25 升。理解循环系统对于治疗心血管疾病至关重要，这是瑞士的主要死因。你的任务是识别循环系统的主要组成部分，并理解血液如何流经这个重要的运输网络。",
            respiratory: "巴塞尔肺科研究所 - 呼吸功能实验室：你正在巴塞尔肺科研究所协助 Keller 博士，在那里的研究人员研究呼吸系统如何实现气体交换——将氧气带入体内并移除二氧化碳。空气通过鼻子或口腔进入，在那里被过滤、加热和加湿。它经过咽（喉咙）和喉（喉头，含有声带）进入气管，气管是一个由 C 形软骨环强化的刚性管道，以防止塌陷。气管分支成两个支气管（每个肺一个），支气管进一步细分为更小的细支气管，形成一个被称为支气管树的树状结构。在最小的细支气管末端是被称为肺泡的微小气囊簇（成年肺中约有 3 亿个），气体交换在这里发生。肺泡壁极薄（0.5 微米）并被毛细血管包围，允许氧气扩散进入血液，而二氧化碳扩散出来。横膈膜是肺部下方的一个圆顶状肌肉，在吸气期间收缩以扩大胸腔，产生负压将空气吸入。在呼气期间，横膈膜放松，弹性肺部回缩，将空气排出。健康的成年人在静息时每分钟呼吸 12-20 次，每次呼吸交换约 500 毫升空气（潮气量）。理解呼吸功能对于治疗哮喘、COPD 和肺炎等疾病至关重要。你的任务是识别呼吸路径中的器官，并理解呼吸和气体交换的机制。"
        },
        results: {
            valid: "生物路径已验证",
            invalid: "生理学错误",
            valid_desc: "器官功能和序列与人体解剖模型相符。",
            invalid_desc: "检测到不匹配。请验证器官功能和位置。",
            next: "下一系统模块"
        },
        systems: {
            digestive: "消化系统",
            circulatory: "循环系统",
            respiratory: "呼吸系统"
        },
        labels: {
            heart_rate: "心率",
            o2_sat: "血氧饱和度",
            enzyme: "酶活性",
            anatomy_score: "解剖学分数",
            anatomy_display: "解剖学显示",
            input_terminal: "输入终端",
            analysis: "系统分析",
            hint: "解剖提示",
            stomach: "胃",
            liver: "肝脏",
            intestines: "肠道",
            heart: "心脏",
            arteries: "动脉",
            veins: "静脉",
            lungs: "肺",
            trachea: "气管"
        },
        prompts: {
            // 消化系统 - 基础 (5题)
            digestive_b1: "食物路径：口腔 → 食道 → ? → 肠道",
            digestive_b2: "消化系统分解食物。它的主要功能是什么？",
            digestive_b3: "小肠吸收营养。它的功能是什么？",
            digestive_b4: "肝脏产生胆汁以消化脂肪。它的功能是什么？",
            digestive_b5: "消化系统有7个主要器官。数一数：",
            
            // 消化系统 - 核心 (5题)
            digestive_c1: "哪个器官产生消化酶和胰岛素？",
            digestive_c2: "胃使用盐酸（pH 1.5-3.5）。它的功能是什么？",
            digestive_c3: "小肠中的绒毛增加表面积。为什么这很重要？",
            digestive_c4: "大肠吸收水分。如果这个功能失败会怎样？",
            digestive_c5: "蠕动将食物推过消化道。这是什么过程？",
            
            // 消化系统 - 进阶 (5题)
            digestive_a1: "胰腺分泌碳酸氢盐以中和胃酸。pH值如何变化？",
            digestive_a2: "胆汁将脂肪乳化成更小的液滴。为什么这对消化是必要的？",
            digestive_a3: "小肠长6-7米。长度如何影响吸收效率？",
            digestive_a4: "胃酸杀死食物中的细菌。如果酸产生过低会怎样？",
            digestive_a5: "肝脏处理来自小肠的营养物质。这个过程叫什么？",
            
            // 消化系统 - 精英 (5题)
            digestive_e1: "克罗恩病导致消化道炎症。哪些器官最受影响？",
            digestive_e2: "乳糖不耐症发生在小肠缺乏一种酶时。是哪种酶？",
            digestive_e3: "肠神经系统独立控制消化。它包含多少神经元？",
            digestive_e4: "乳糜泻损害小肠中的绒毛。后果是什么？",
            digestive_e5: "消化系统使用机械和化学消化。比较它们的作用。",
            
            // 循环系统 - 基础 (5题)
            circulatory_b1: "心脏将血液泵送到全身。它的功能是什么？",
            circulatory_b2: "动脉将血液从心脏带走。静脉做什么？",
            circulatory_b3: "循环系统有3个主要组成部分。数一数：",
            circulatory_b4: "血液将氧气输送到细胞。它带走什么？",
            circulatory_b5: "心脏有4个腔室。数一数：",
            
            // 循环系统 - 核心 (5题)
            circulatory_c1: "心脏右侧将血液泵入肺部。这种循环叫什么？",
            circulatory_c2: "左心室的壁比右心室厚。为什么？",
            circulatory_c3: "毛细血管是微小的血管。它们的功能是什么？",
            circulatory_c4: "血压测量为收缩压/舒张压。正常血压是多少？",
            circulatory_c5: "心脏在静息时每分钟跳动60-100次。这叫什么？",
            
            // 循环系统 - 进阶 (5题)
            circulatory_a1: "心输出量 = 心率 × 每搏输出量。计算静息时的心输出量：",
            circulatory_a2: "动脉有厚实的弹性壁。这如何帮助承受压力？",
            circulatory_a3: "静脉有单向瓣膜。如果这些瓣膜失效会怎样？",
            circulatory_a4: "红细胞使用血红蛋白携带氧气。每个血红蛋白携带多少氧分子？",
            circulatory_a5: "心脏的电系统控制节律。起搏器叫什么？",
            
            // 循环系统 - 精英 (5题)
            circulatory_e1: "动脉粥样硬化用斑块使动脉变窄。后果是什么？",
            circulatory_e2: "Frank-Starling机制调节心输出量。它如何工作？",
            circulatory_e3: "血压调节涉及多个系统。说出三种机制：",
            circulatory_e4: "心力衰竭降低心输出量。发生什么补偿机制？",
            circulatory_e5: "循环系统在静息时输送5升/分钟，运动时25升/分钟。计算增加量：",
            
            // 呼吸系统 - 基础 (5题)
            respiratory_b1: "气体交换发生在微小的气囊中。它们叫什么？",
            respiratory_b2: "呼吸系统交换气体。什么气体进入血液？",
            respiratory_b3: "呼吸系统有5个主要器官。数一数：",
            respiratory_b4: "横膈膜收缩以扩张肺部。它的功能是什么？",
            respiratory_b5: "空气路径：鼻 → 咽 → ? → 气管",
            
            // 呼吸系统 - 核心 (5题)
            respiratory_c1: "气管有C形软骨环。为什么这种结构很重要？",
            respiratory_c2: "支气管分支成更小的细支气管。这种结构叫什么？",
            respiratory_c3: "肺泡有极薄的壁（0.5微米）。为什么这是必要的？",
            respiratory_c4: "横膈膜在吸气时产生负压。这如何吸入空气？",
            respiratory_c5: "健康成年人每分钟呼吸12-20次。这个速率叫什么？",
            
            // 呼吸系统 - 进阶 (5题)
            respiratory_a1: "成年肺部包含约3亿个肺泡。总表面积是多少？",
            respiratory_a2: "潮气量是每次呼吸交换的空气（~500毫升）。计算分钟通气量：",
            respiratory_a3: "氧气从肺泡扩散到毛细血管。什么驱动这种扩散？",
            respiratory_a4: "喉包含声带。它们如何产生声音？",
            respiratory_a5: "表面活性剂降低肺泡中的表面张力。如果缺乏表面活性剂会怎样？",
            
            // 呼吸系统 - 精英 (5题)
            respiratory_e1: "哮喘导致细支气管收缩。生理后果是什么？",
            respiratory_e2: "COPD降低气体交换效率。发生什么补偿机制？",
            respiratory_e3: "呼吸系统通过控制CO2水平调节血液pH。解释机制：",
            respiratory_e4: "高海拔降低氧气可用性。身体如何适应？",
            respiratory_e5: "肺炎使肺泡充满液体。计算气体交换能力的降低："
        },
        organs: {
            stomach: "胃",
            heart: "心脏",
            lungs: "肺",
            esophagus: "食道",
            intestines: "肠道",
            small_intestine: "小肠",
            large_intestine: "大肠",
            liver: "肝脏",
            pancreas: "胰腺",
            arteries: "动脉",
            veins: "静脉",
            capillaries: "毛细血管",
            alveoli: "肺泡",
            diaphragm: "横膈膜",
            trachea: "气管",
            larynx: "喉",
            pharynx: "咽",
            bronchi: "支气管",
            bronchioles: "细支气管",
            mouth: "口腔",
            nose: "鼻"
        },
        functions: {
            digestion: "消化",
            absorption: "吸收",
            bile_production: "胆汁分泌",
            enzyme_production: "酶分泌",
            acid_production: "酸分泌",
            pump_blood: "泵血",
            carry_blood: "输送血液",
            return_blood: "将血液送回心脏",
            gas_exchange: "气体交换",
            breathing: "呼吸",
            filter_air: "过滤空气",
            produce_sound: "产生声音"
        },
        hints: {
            digestive_b1: "食物在这里被搅拌和消化",
            digestive_b2: "将食物分解为营养物质",
            digestive_b3: "将营养物质吸收到血液中",
            digestive_b4: "帮助消化脂肪",
            digestive_b5: "数一数路径中的所有器官",
            digestive_c1: "位于胃后面",
            digestive_c2: "分解蛋白质并杀死细菌",
            digestive_c3: "更大的表面积 = 更多的吸收",
            digestive_c4: "导致脱水",
            digestive_c5: "肌肉收缩",
            circulatory_b1: "循环血液",
            circulatory_b2: "与动脉相反",
            circulatory_b3: "心脏和两种血管",
            circulatory_b4: "细胞产生的废气",
            circulatory_b5: "上下腔室",
            circulatory_c1: "肺循环",
            circulatory_c2: "泵送到全身",
            circulatory_c3: "气体交换发生的地方",
            circulatory_c4: "120/80 mmHg",
            circulatory_c5: "心率",
            respiratory_b1: "肺中的微小气囊",
            respiratory_b2: "细胞呼吸所需的气体",
            respiratory_b3: "从鼻到肺",
            respiratory_b4: "呼吸肌肉",
            respiratory_b5: "喉头",
            respiratory_c1: "防止塌陷",
            respiratory_c2: "支气管树",
            respiratory_c3: "允许气体扩散",
            respiratory_c4: "压力差",
            respiratory_c5: "呼吸频率"
        }
    },
    sb3_01: {
        back: "返回枢纽",
        title: "SB3.01 // 生态系统动力学",
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
        monitor_title: "SB3.01_生态系统监控",
        footer_left: "SB3.01_生态系统动力学 // 节点: 莱茵河",
        objective_title: "当前任务目标",
        stages: {
            food_chains: "食物链",
            energy_flow: "能量流动",
            cycles: "生物地球化学循环"
        },
        labels: {
            ecosystem_display: "生态系统显示",
            input_terminal: "输入终端",
            trophic_level: "营养级",
            show_energy: "显示能量流动",
            ecology_score: "生态学分数",
            analysis: "生态系统分析",
            hint: "生态提示",
            viz: {
                sun: "太阳",
                producers: "生产者",
                primary_consumer: "初级消费者",
                secondary_consumer: "次级消费者",
                decomposers: "分解者",
                carbon_cycle: "碳循环",
                nitrogen_cycle: "氮循环",
                water_cycle: "水循环",
                co2_air: "大气中的CO₂",
                plants: "植物",
                animals: "动物",
                river: "莱茵河",
                clouds: "云",
                rain: "雨",
                evap: "蒸发",
                fix: "固氮",
                nitrate: "硝酸盐",
                denit: "反硝化"
            }
        },
        prompts: {
            food_chain: "在莱茵河生态系统中，{producer} 被 {consumer} 吃掉。下一级是什么？",
            energy_transfer: "如果 {level} 消费者有 {energy} kJ 的能量，有多少能量传递到下一级？",
            cycle_process: "在 {cycle} 循环中，{process} 产生什么？",
            hint_trophic: "只有10%的能量传递到下一个营养级",
            hint_10percent: "使用10%规则：乘以0.1",
            hint_cycle: "思考这个过程的输入和输出"
        },
        results: {
            valid: "生态平衡",
            invalid: "营养级崩溃",
            valid_desc: "能量流和营养循环处于最佳状态。",
            invalid_desc: "计算错误。生态系统失去稳定性。",
            next: "监控下一区域"
        },
        scenarios: {
            rhine_river: "巴塞尔境内的莱茵河是一条充满生命力的复杂水生生态系统，完美展示了食物链的微妙平衡。该系统的基础是浮游植物和藻类等初级生产者，它们捕获太阳能进行光合作用。这些生产者随后被浮游动物和小型水生无脊椎动物等初级消费者摄食。随着营养级的上升，我们可以看到银鲃和欧洲鳗鱼等各种鱼类。巴塞尔的‘鲑鱼回归’计划突显了保护这些生物链路的重要性，因为大西洋鲑是生态系统健康的关键指标。在食物网的最顶端，普通鸬鹚和苍鹭等捕食者调节着下方种群的数量。理解这些错综复杂的关系对于巴塞尔大学和当地环境部门的保护工作至关重要，它确保了即使某个环节（如底栖无脊椎动物）受到环境污染或夸加贻贝等入侵物种的干扰，整个食物网仍能凭借生物多样性保持韧性。",
            energy_pyramid: "在紧邻巴塞尔边境的卡马格自然保护区（Petite Camargue Alsacienne），能量金字塔直观地解释了生态学中的热力学基本定律。根据10%法则，在一个营养级中以生物量形式储存的能量，只有大约10%能传递到下一级。这种逐级递减的能量损耗解释了为什么景观中总是充满郁郁葱葱的植被（生产者）以及大量的昆虫和小鱼，而顶级捕食者如欧亚猞猁或大型猛禽则相对稀少。这种能量约束将食物链的层数限制在通常4到5层以内。巴塞尔的研究人员利用这些模型来计算当地自然保护区的‘环境承载力’。通过监测初级生产者的生物量，生物中心（Biozentrum）的科学家可以预测生态系统能够持续支持多少高层消费者，这对于管理巴塞尔的绿化带和保护濒危物种免受栖息地破碎化导致的饥饿至关重要。",
            carbon_cycle: "全球碳循环在巴塞尔的城市森林（如 Hardwald）和公园（如 Lange Erlen）中跳动着地方性的节奏。通过光合作用，巴塞尔广阔的榉木和橡木林吸收大气中的二氧化碳，并将其转化为储存在木材和土壤中的有机碳。这一碳汇过程在巴塞尔市实现‘净零排放’的气候战略中发挥着关键作用。与此同时，动物、人类以及土壤中分解者的细胞呼吸作用又将二氧化碳释放回大气中。莱茵河也参与其中，它将来自瑞士阿尔卑斯山的溶解有机碳运输至今。管理这些‘碳库’是巴塞尔城市州环境局的优先任务。通过保护古树名木和推广可持续的城市林业，城市维持着一种自然平衡，在缓解热岛效应的同时，也为人类居民和当地野生动物创造了稳定的气候环境。",
            nitrogen_cycle: "巴塞尔周边农业区（特别是巴塞尔乡村州）的氮循环对于高产粮食生产和土壤健康至关重要。虽然氮气占据了大气组成的78%，但在被‘固定’之前，植物无法直接利用。在自然界中，固氮作用主要通过雷电或更重要的固氮细菌（如豆科植物根瘤中的根瘤菌）完成。这些微生物将氮气转化为铵盐，进而转化为植物能吸收的硝酸盐，用于构建蛋白质和DNA。在巴塞尔地区的现代农业中，这一循环通过可持续施肥方案得到增强，旨在防止硝酸盐流失进入莱茵河导致水体富营养化。当地农业学校教授轮作的重要性——在谷物收获间隙种植苜蓿等固氮作物，以自然补充土壤肥力。这种生物回收系统确保了基本营养物质在巴塞尔生态系统的空气、土壤和各类生物之间持续流动。",
            water_cycle: "流经巴塞尔的莱茵河是全球水循环中一个宏大且肉眼可见的部分。水分主要以瑞士阿尔卑斯山的降水或融雪形式进入该本地系统，穿过标志性的莱茵河弯道。太阳能驱动河面的蒸发以及汝拉山脉繁茂植被的蒸腾作用，将水分送回大气冷凝成云。巴塞尔工业公司（IWB）利用这一循环为城市提供饮用水，从 Lange Erlen 的地下水中汲取，而这里的地下水由莱茵河水通过自然渗透并不断充盈。这种过滤和入渗过程展示了生态系统如何在水分移动过程中对其进行净化。巴塞尔的工业冷却、航运等人类活动都受到严格监管，以确保不破坏水循环的完整性。确保莱茵河在离开巴塞尔流向北海时保持清洁，是保护莱茵河国际委员会框架下的一项跨境责任。"
        }
    },
    sb2_03: {
        back: "返回枢纽",
        title: "SB2.03 // 遗传变异",
        difficulty: {
            basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "遗传变异分析",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "SB2.03_变异监视器",
        footer_left: "SB2.03_遗传变异 // 节点：巴塞尔",
        stages: {
            monohybrid: "单性状杂交",
            probability: "概率计算",
            dihybrid: "双性状杂交"
        },
        scenarios: {
            monohybrid: "巴塞尔植物园 - 孟德尔研究：你正在巴塞尔植物园工作，研究人员正在那里重复格雷戈尔·孟德尔著名的豌豆实验。通过杂交具有不同性状（如紫色对比白色花朵）的植物，你正在研究分离定律。每株植物携带两个性状等位基因，它们在配子形成过程中分离。你的任务是使用普内特方格预测特定杂交后代的表现型和基因型比例。理解这些基础的遗传模式是瑞士所有现代遗传学和农业的基础。",
            probability: "巴塞尔大学 - 遗传学研究中心：在巴塞尔大学的高科技遗传学实验室里，你正在计算特定遗传结果的统计概率。遗传学本质上是概率性的；当两个杂合亲本（Rr）杂交时，有25%的概率产生纯合显性（RR），50%的概率产生杂合（Rr），以及25%的概率产生纯合隐性（rr）后代。你的任务是确定随机后代表现出特定基因型或表现型的确切数学概率（百分比或分数）。这种精确性对于临床遗传学和理解遗传性疾病至关重要。",
            dihybrid: "先正达温室 - 复杂性状分析：在巴塞尔的先正达研究温室中，你正在同时分析两个独立性状的遗传，例如种子形状（圆粒/皱粒）和种子颜色（黄色/绿色）。这遵循孟德尔的自由组合定律，该定律指出不同性状的等位基因在分配到配子时是相互独立的。两个双杂合子（RrYy x RrYy）之间的双性状杂交通常产生9:3:3:1的表现型比例。你的任务是计算这些遗传杂交的复杂结果，这是开发新性的抗温室农作物品种的基本技能。"
        },
        labels: {
            parent: "亲本",
            offspring: "子代",
            punnett_square: "普内特方格",
            stats: "子代统计",
            genotype_ratio: "基因型比例",
            phenotype_ratio: "表现型比例",
            purple_flowers: "紫色花朵",
            white_flowers: "白色花朵",
            genetics_basics: "遗传学基础",
            instructions: "操作说明",
            prediction: "表现型预测",
            analysis: "遗传分析",
            hint: "遗传提示"
        },
        results: {
            valid: "序列已验证",
            invalid: "遗传漂变",
            valid_desc: "孟德尔比例已确认。",
            invalid_desc: "请重新计算概率矩阵。",
            next: "下一标本",
            analysis: "表现型预测"
        },
        prompts: {
            monohybrid_ratio: "进行 {p1} \\times {p2} 杂交。表现型比例是多少？",
            monohybrid_percent: "进行 {p1} \\times {p2} 杂交。显性性状子代的百分比是多少？",
            prob_genotype: "进行 {p1} \\times {p2} 杂交。{genotype} 基因型子代的概率是多少？",
            ratio_target: "\\text{比例} = ?",
            percent_target: "\\text{百分比}",
            prob_target: "P({genotype}) = ?",
            hint_square: "检查普内特方格。",
            hint_all_rr: "所有子代均为 Rr。",
            hint_count: "4个方格中的 {count} 个。"
        }
    },
};
