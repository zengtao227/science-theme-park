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
          footer_left: "GB1.01 // 进化实验室"
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
              guanine: "鸟嘌呤"
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
          prompts: {
              id_prompt: "识别3D视图中高亮显示的细胞器。",
              id_target: "高亮部分: ?",
              fn_prompt: "哪个细胞器负责: {func}?",
              fn_target: "功能: {func}",
              hint_name: "它是 {name}",
              hint_start: "答案以 {char} 开头"
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
              }
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
              atp: "ATP 能量"
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
              input_terminal: "输入终端"
          },
          prompts: {
              organ_function: "哪个器官负责{function}？",
              hint_organ: "{name}执行此功能",
              component_function: "哪个组成部分负责{function}？",
              hint_component: "{name}执行此功能",
              structure_function: "哪个结构负责{function}？",
              hint_structure: "{name}执行此功能"
          },
          feedback: {
              correct: "解剖学知识已验证！",
              incorrect: "请复习身体系统结构。"
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
              ecology_score: "生态学分数"
          },
          prompts: {
              food_chain: "在莱茵河生态系统中，{producer} 被 {consumer} 吃掉。下一级是什么？",
              energy_transfer: "如果 {level} 消费者有 {energy} kJ 的能量，有多少能量传递到下一级？",
              cycle_process: "在 {cycle} 循环中，{process} 产生什么？",
              hint_trophic: "只有10%的能量传递到下一个营养级",
              hint_10percent: "使用10%规则：乘以0.1",
              hint_cycle: "思考这个过程的输入和输出"
          },
          scenarios: {
              rhine_river: "莱茵河生态系统：莱茵河支持从藻类到捕食鸟类的多样化水生生物。食物链从浮游植物开始，经过浮游动物、鱼类到顶级捕食者。",
              energy_pyramid: "巴塞尔湿地能量流动：巴塞尔湿地保护区展示能量金字塔。营养级之间只有10%的能量传递，限制了食物链长度。",
              carbon_cycle: "莱茵河三角洲碳循环：光合作用和呼吸作用驱动莱茵河生态系统的碳循环。植物吸收CO₂，动物通过呼吸释放CO₂。",
              nitrogen_cycle: "巴塞尔土壤固氮：巴塞尔农业土壤中的细菌通过固氮作用将大气中的N₂转化为植物可用的NH₃。",
              water_cycle: "莱茵河水循环：莱茵河的蒸发、云中的凝结和降水完成了维持巴塞尔生态系统的水循环。"
          },
          feedback: {
              correct: "生态系统平衡维持！",
              incorrect: "生态系统被破坏。请复习关系。"
          }
      },
};
