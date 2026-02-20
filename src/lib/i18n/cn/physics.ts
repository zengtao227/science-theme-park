/**
 * CN - PHYSICS translations
 * COMPLETE VERSION - Reorganized from Git history assets.
 * Aligning with Basel Sek 3 (SP3.01 - SP3.08) while preserving all legacy global modules.
 */

export const cnPhysics = {


    /* SP1.01_DATA_START */
    sp1_01: {
        "back": "返回枢纽",
        "title": "SP1.01 // 力学历险记：基础",
        "difficulty": {
            "basic": "基础",
            "core": "核心",
            "advanced": "进阶",
            "elite": "精英"
        },
        "stages": {
            "concepts": "概念",
            "composition": "求和",
            "equilibrium": "平衡状态"
        },
        "labels": {
            "answer": "答案",
            "value": "数值",
            "select": "请选择选项",
            "progress": "实验进度",
            "previous": "上一项",
            "skip": "跳过"
        },
        "check": "验证检测",
        "next": "下一个任务",
        "correct": "验证通过 - 系统稳定",
        "incorrect": "验证失败 - 存在偏差",
        "ready": "系统准备就绪",
        "monitor_title": "静态力学监视器",
        "SP1.01.034": {
            "prompt": "三个力作用在物体上：100 N 在 0°，80 N 在 60°，60 N 在 150°。合力的大小是多少？",
            "feedback": {
                "correct": "正确！F_x = 100 + 80cos(60°) + 60cos(150°) = 88.04 N，F_y = 80sin(60°) + 60sin(150°) = 99.28 N。F = 118.32 N",
                "incorrect": "将所有力分解为 x 和 y 分量，求和，然后找到大小。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.035": {
            "prompt": "巴塞尔有轨电车以 5000 N 的力制动。如果轨道向下倾斜 5°，制动力平行于轨道的分量是多少？",
            "feedback": {
                "correct": "正确！F_平行 = 5000 × cos(5°) = 4981.13 N",
                "incorrect": "平行分量是 F × cos(θ)，其中 θ 是倾斜角。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.036": {
            "prompt": "五个力作用在一点上：40 N 在 0°，30 N 在 72°，30 N 在 144°，30 N 在 216°，30 N 在 288°。合力的大小是多少？",
            "feedback": {
                "correct": "正确！四个 30 N 的力对称排列并相互抵消，只剩下 40 N 的力。",
                "incorrect": "寻找力排列中的对称性。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.037": {
            "prompt": "一个 200 N 的力以水平方向上方 30° 作用，另一个 150 N 的力以水平方向下方 45° 作用。合力的大小是多少？",
            "feedback": {
                "correct": "正确！F_x = 200cos(30°) + 150cos(-45°) = 279.28 N，F_y = 200sin(30°) + 150sin(-45°) = -6.07 N。F = 199.25 N",
                "incorrect": "记住水平方向下方的角度是负的。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.038": {
            "prompt": "Mittlere Brücke 上的一根缆绳以与水平方向成 60° 的 50 kN 张力支撑负载。这个张力的垂直分量是多少？",
            "feedback": {
                "correct": "正确！F_y = 50 × sin(60°) = 43.30 kN",
                "incorrect": "垂直分量是 F × sin(θ)。"
            },
            "scenario_desc": "",
            "unit": "kN"
        },
        "SP1.01.039": {
            "prompt": "三个各为 100 N 的力分别作用在 0°、120° 和 240°。合力的大小是多少？",
            "feedback": {
                "correct": "正确！这三个相等的力以 120° 间隔对称排列，完全相互抵消。",
                "incorrect": "三个相等的力以 120° 间隔形成平衡系统。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.040": {
            "prompt": "一个 120 N 的力作用在 25°，另一个 80 N 的力作用在 155°。合力与水平方向成多少度角？",
            "feedback": {
                "correct": "正确！F_x = 120cos(25°) + 80cos(155°) = 36.29 N，F_y = 120sin(25°) + 80sin(155°) = 84.51 N。θ = arctan(84.51/36.29) = 52.13°",
                "incorrect": "找到 x 和 y 分量，然后使用 arctan(F_y/F_x)。"
            },
            "scenario_desc": "",
            "unit": "degrees"
        },
        "SP1.01.041": {
            "prompt": "六个各为 20 N 的力分别作用在 0°、60°、120°、180°、240° 和 300°。合力的大小是多少？",
            "feedback": {
                "correct": "正确！六个相等的力以 60° 间隔形成完全平衡的系统，合力为零。",
                "incorrect": "寻找对称性 - 围绕圆周以相等间隔排列的力相互抵消。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.024": {
            "prompt": "两个力作用在物体上：30 N 向右和 40 N 向上。合力的大小是多少？",
            "feedback": {
                "correct": "正确！F = √(30^{2} + 40^{2}) = 50 N",
                "incorrect": "对于垂直的力使用勾股定理。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.042": {
            "prompt": "两个各为 50 N 的力相互垂直作用。合力的大小是多少？",
            "feedback": {
                "correct": "正确！F = √(50^{2} + 50^{2}) = 70.71 N",
                "incorrect": "对于相等的垂直力，F = F_1√2"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.043": {
            "prompt": "一个 20 N 的力向东作用，另一个 15 N 的力向北作用。合力的大小是多少？",
            "feedback": {
                "correct": "正确！F = √(20^{2} + 15^{2}) = 25 N",
                "incorrect": "这是一个放大 5 倍的 3-4-5 三角形。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.044": {
            "prompt": "两个力作用在同一方向：80 N 和 120 N。合力的大小是多少？",
            "feedback": {
                "correct": "正确！同方向的力相加：80 + 120 = 200 N",
                "incorrect": "当力作用在同一方向时，只需将它们相加。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.045": {
            "prompt": "两个力作用在相反方向：150 N 向右和 90 N 向左。合力的大小是多少？",
            "feedback": {
                "correct": "正确！相反方向的力相减：150 - 90 = 60 N",
                "incorrect": "当力相互对抗时，从较大的力中减去较小的力。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.026": {
            "prompt": "两个 60 N 和 80 N 的力相互垂直作用。合力的大小是多少？",
            "feedback": {
                "correct": "正确！F = √(60^{2} + 80^{2}) = 100 N",
                "incorrect": "对于垂直的力使用勾股定理。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.027": {
            "prompt": "一个 100 N 的力作用在 0°，另一个 100 N 的力作用在 90°。合力与水平方向成多少度角？",
            "feedback": {
                "correct": "正确！θ = arctan(100/100) = 45°",
                "incorrect": "使用 θ = arctan(F_y/F_x) 来找到角度。"
            },
            "scenario_desc": "",
            "unit": "degrees"
        },
        "SP1.01.028": {
            "prompt": "三个力作用在物体上：20 N 向东，30 N 向北，10 N 向西。合力的大小是多少？",
            "feedback": {
                "correct": "正确！净水平力：20-10=10 N，垂直力：30 N。F = √(10^{2} + 30^{2}) = 31.62 N",
                "incorrect": "首先找到每个方向的净力，然后使用勾股定理。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.029": {
            "prompt": "两个大小相等的力相互成 60° 角作用。如果每个力是 50 N，合力的大小是多少？",
            "feedback": {
                "correct": "正确！对于成 60° 角的相等力：F = 2F_1cos(30°) = 2(50)(0.866) = 86.60 N",
                "incorrect": "使用平行四边形法则或分解为分量。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.030": {
            "prompt": "一个 40 N 的力以水平方向上方 30° 作用，另一个 60 N 的力水平作用。合力的水平分量是多少？",
            "feedback": {
                "correct": "正确！F_x = 40cos(30°) + 60 = 34.64 + 60 = 94.64 N",
                "incorrect": "将两个力的水平分量相加。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.031": {
            "prompt": "两个力作用在一点上：100 N 在 0° 和 100 N 在 120°。合力的大小是多少？",
            "feedback": {
                "correct": "正确！F_x = 100 + 100cos(120°) = 50 N，F_y = 100sin(120°) = 86.6 N。F = √(50^{2} + 86.6^{2}) = 100 N",
                "incorrect": "将每个力分解为分量，然后相加并找到大小。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.032": {
            "prompt": "四个力作用在物体上：50 N 向北，30 N 向南，40 N 向东，20 N 向西。合力的大小是多少？",
            "feedback": {
                "correct": "正确！净力：20 N 向北，20 N 向东。F = √(20^{2} + 20^{2}) = 28.28 N",
                "incorrect": "首先找到每个方向的净力。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.033": {
            "prompt": "一个 80 N 的力作用在 45°，另一个 60 N 的力作用在 135°。合力的垂直分量是多少？",
            "feedback": {
                "correct": "正确！F_y = 80sin(45°) + 60sin(135°) = 56.57 + 42.43 = 98.99 N",
                "incorrect": "将两个力的垂直分量相加。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.001": {
            "prompt": "什么是力？",
            "feedback": {
                "correct": "正确！力是可以改变运动的推或拉。",
                "incorrect": "不太对。想想当你推或拉某物时会发生什么。"
            },
            "options": [
                { "id": "A", "text": "力是可以改变运动的推或拉。" },
                { "id": "B", "text": "力是一种能量。" },
                { "id": "C", "text": "力是一种速度。" },
                { "id": "D", "text": "力是一种质量。" }
            ],
            "scenario_desc": "",
            "unit": ""
        },
        "SP1.01.002": {
            "prompt": "力的国际单位是什么？",
            "feedback": {
                "correct": "正确！牛顿（N）是力的国际单位。",
                "incorrect": "力的国际单位是牛顿（N）。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.003": {
            "prompt": "将 5000 N 转换为 kN。",
            "feedback": {
                "correct": "太好了！5000 N = 5 kN",
                "incorrect": "记住：1 kN = 1000 N"
            },
            "scenario_desc": "",
            "unit": "kN"
        },
        "SP1.01.004": {
            "prompt": "将 2.5 MN 转换为 N。",
            "feedback": {
                "correct": "完美！2.5 MN = 2,500,000 N",
                "incorrect": "记住：1 MN = 1,000,000 N"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.005": {
            "prompt": "定义力的三个要素是什么？",
            "feedback": {
                "correct": "正确！力有大小、方向和作用点。",
                "incorrect": "力由其大小、方向和作用点定义。"
            },
            "options": [
                { "id": "A", "text": "大小、方向和作用点" },
                { "id": "B", "text": "质量、加速度和速度" },
                { "id": "C", "text": "时间、距离和位移" },
                { "id": "D", "text": "能量、功和功率" }
            ],
            "scenario_desc": "",
            "unit": ""
        },
        "SP1.01.006": {
            "prompt": "一个 50 N 的力作用在物体上。这个力的大小是多少？",
            "feedback": {
                "correct": "正确！大小是 50 N。",
                "incorrect": "大小是数值：50 N。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.007": {
            "prompt": "将 750 kN 转换为 MN。",
            "feedback": {
                "correct": "太好了！750 kN = 0.75 MN",
                "incorrect": "记住：1000 kN = 1 MN"
            },
            "scenario_desc": "",
            "unit": "MN"
        },
        "SP1.01.008": {
            "prompt": "一本书放在桌子上。如果书重 20 N，桌子的支持力大小是多少？",
            "feedback": {
                "correct": "正确！支持力等于重量：20 N。",
                "incorrect": "桌子向上推的力与书的重量相同。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.009": {
            "prompt": "将 0.025 MN 转换为 kN。",
            "feedback": {
                "correct": "太好了！0.025 MN = 25 kN",
                "incorrect": "记住：1 MN = 1000 kN"
            },
            "scenario_desc": "",
            "unit": "kN"
        },
        "SP1.01.010": {
            "prompt": "你用 100 N 的力向右推一个箱子。力的方向是什么？",
            "feedback": {
                "correct": "正确！力指向右边。",
                "incorrect": "方向是向右（水平方向 0 度）。"
            },
            "scenario_desc": "",
            "unit": ""
        },
        "SP1.01.011": {
            "prompt": "将 3500 N 转换为 kN。",
            "feedback": {
                "correct": "完美！3500 N = 3.5 kN",
                "incorrect": "除以 1000 将 N 转换为 kN。"
            },
            "scenario_desc": "",
            "unit": "kN"
        },
        "SP1.01.012": {
            "prompt": "一个力垂直向上作用。它与水平方向成多少度角？",
            "feedback": {
                "correct": "正确！垂直向上与水平方向成 90 度。",
                "incorrect": "垂直向上与水平方向垂直：90 度。"
            },
            "scenario_desc": "",
            "unit": "degrees"
        },
        "SP1.01.013": {
            "prompt": "将 1.2 MN 转换为 N。",
            "feedback": {
                "correct": "太好了！1.2 MN = 1,200,000 N",
                "incorrect": "乘以 1,000,000 将 MN 转换为 N。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.014": {
            "prompt": "两个人推一辆车。A 施加 200 N，B 施加 150 N，方向相同。总力是多少？",
            "feedback": {
                "correct": "正确！200 N + 150 N = 350 N",
                "incorrect": "当力作用在同一方向时，将它们相加。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.015": {
            "prompt": "将 450 kN 转换为 MN。",
            "feedback": {
                "correct": "太好了！450 kN = 0.45 MN",
                "incorrect": "除以 1000 将 kN 转换为 MN。"
            },
            "scenario_desc": "",
            "unit": "MN"
        },
        "SP1.01.016": {
            "prompt": "一个 80 N 的力以水平方向上方 30° 的角度作用。这个力的水平分量是多少？",
            "feedback": {
                "correct": "正确！F_x = F × cos(30°) = 80 × 0.866 = 69.28 N",
                "incorrect": "使用 F_x = F × cos(θ) 来找到水平分量。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.017": {
            "prompt": "一个 80 N 的力以水平方向上方 30° 的角度作用。这个力的垂直分量是多少？",
            "feedback": {
                "correct": "正确！F_y = F × sin(30°) = 80 × 0.5 = 40 N",
                "incorrect": "使用 F_y = F × sin(θ) 来找到垂直分量。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.018": {
            "prompt": "一个力的分量为 F_x = 60 N 和 F_y = 80 N。力的大小是多少？",
            "feedback": {
                "correct": "正确！F = √(60^{2} + 80^{2}) = √10000 = 100 N",
                "incorrect": "使用勾股定理：F = √(F_x^{2} + F_y^{2})"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.019": {
            "prompt": "一个力的分量为 F_x = 60 N 和 F_y = 80 N。它与水平方向成多少度角？",
            "feedback": {
                "correct": "正确！θ = arctan(80/60) = arctan(1.333) = 53.13°",
                "incorrect": "使用 θ = arctan(F_y/F_x) 来找到角度。"
            },
            "scenario_desc": "",
            "unit": "degrees"
        },
        "SP1.01.020": {
            "prompt": "一个 50 N 的力以水平方向上方 45° 的角度作用。它的水平分量是多少？",
            "feedback": {
                "correct": "正确！F_x = 50 × cos(45°) = 50 × 0.707 = 35.36 N",
                "incorrect": "在 45° 时，cos(45°) = sin(45°) = 0.707"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.021": {
            "prompt": "一个 50 N 的力以水平方向上方 45° 的角度作用。它的垂直分量是多少？",
            "feedback": {
                "correct": "正确！F_y = 50 × sin(45°) = 50 × 0.707 = 35.36 N",
                "incorrect": "在 45° 时，水平和垂直分量相等。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.022": {
            "prompt": "一个 100 N 的力以水平方向上方 60° 的角度作用。它的垂直分量是多少？",
            "feedback": {
                "correct": "正确！F_y = 100 × sin(60°) = 100 × 0.866 = 86.60 N",
                "incorrect": "记住：sin(60°) = 0.866"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.023": {
            "prompt": "一个 100 N 的力以水平方向上方 60° 的角度作用。它的水平分量是多少？",
            "feedback": {
                "correct": "正确！F_x = 100 × cos(60°) = 100 × 0.5 = 50 N",
                "incorrect": "记住：cos(60°) = 0.5"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.049": {
            "prompt": "四个力作用在处于平衡的点上：60 N 在 0°，40 N 在 90°，50 N 在 180°，以及一个未知的力。未知力的大小是多少？",
            "feedback": {
                "correct": "正确！净 x：60-50=10 N，净 y：40 N。未知力：√(10^{2} + 40^{2}) = 41.23 N",
                "incorrect": "找到 x 和 y 方向的净力，然后计算平衡力。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.050": {
            "prompt": "一个交通灯由两根缆绳悬挂：一根在 45° 张力为 T_1，另一根在 60° 张力为 150 N。如果系统处于平衡，T_1 是多少？",
            "feedback": {
                "correct": "正确！对于水平平衡：T_1cos(45°) = 150cos(60°)，所以 T_1 = 150×0.5/0.707 = 183.71 N",
                "incorrect": "使用水平平衡：水平分量必须平衡。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.051": {
            "prompt": "巴塞尔大教堂塔楼受到风力作用。如果 2000 N 的风力水平作用，120° 的 1500 N 结构力和 240° 的 F 力维持平衡，F 是多少？",
            "feedback": {
                "correct": "正确！通过对称性和平衡分析，F = 1500 N",
                "incorrect": "分别分析 x 和 y 分量以达到平衡。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.052": {
            "prompt": "三个力维持平衡：100 N 在 30°，120 N 在 150°，F 在 270°。F 是多少？",
            "feedback": {
                "correct": "正确！y 分量之和：100sin(30°) + 120sin(150°) - F = 0，所以 F = 110 N",
                "incorrect": "270° 的力纯粹作用在负 y 方向。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.053": {
            "prompt": "一根梁由两根与垂直方向成 40° 和 50° 的缆绳支撑。如果梁重 500 N，40° 缆绳的张力是多少？",
            "feedback": {
                "correct": "正确！使用平衡方程：T_1 = 281.91 N",
                "incorrect": "为水平和垂直分量建立平衡方程。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.054": {
            "prompt": "四个力作用在一个环上：80 N 在 0°，60 N 在 90°，70 N 在 180°，F 在未知角度。如果系统处于平衡，F 是多少？",
            "feedback": {
                "correct": "正确！净 x：80-70=10 N，净 y：60 N。F = √(10^{2} + 60^{2}) = 60.83 N",
                "incorrect": "找到已知力的合力，然后 F 的大小必须与之相等。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.055": {
            "prompt": "一个重 300 N 的吊灯由三根以 120° 间隔的缆绳悬挂。每根缆绳的张力是多少？",
            "feedback": {
                "correct": "正确！根据对称性，每根缆绳承受 300/3 = 100 N",
                "incorrect": "对于对称排列，负载均匀分布。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.025": {
            "prompt": "三个力作用在处于平衡状态的物体上：50 N 向右，30 N 向上，以及一个未知的力。未知力的大小是多少？",
            "feedback": {
                "correct": "正确！未知力必须平衡其他两个力：√(50^{2} + 30^{2}) = 58.31 N",
                "incorrect": "对于平衡，所有力的总和必须为零。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.046": {
            "prompt": "两个各为 40 N 的力相互成 60° 角作用。达到平衡所需的第三个力的大小是多少？",
            "feedback": {
                "correct": "正确！两个力的合力是 69.28 N，所以平衡力必须大小相等方向相反。",
                "incorrect": "首先找到两个力的合力，然后平衡力的大小与之相等。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.047": {
            "prompt": "一个物体在三个力的作用下处于平衡：100 N 在 0°，80 N 在 90°，以及第三个力。第三个力的大小是多少？",
            "feedback": {
                "correct": "正确！F = √(100^{2} + 80^{2}) = 128.06 N",
                "incorrect": "第三个力必须平衡前两个力的合力。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.048": {
            "prompt": "一个标志牌由两根与水平方向成 30° 角的缆绳悬挂。如果每根缆绳的张力为 200 N，标志牌的重量是多少？",
            "feedback": {
                "correct": "正确！重量 = 2 × 200 × sin(30°) = 2 × 200 × 0.5 = 200 N",
                "incorrect": "两根缆绳的垂直分量之和必须等于重量。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.056": {
            "prompt": "巴塞尔马拉松跑者的脚以 2400 N 的力击地。地面反作用力与垂直方向成 15° 角。推动跑者前进的水平分量是多少？",
            "feedback": {
                "correct": "正确！F_水平 = 2400 × sin(15°) = 621.18 N",
                "incorrect": "水平分量是 F × sin(θ)，其中 θ 是从垂直方向测量的。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.057": {
            "prompt": "五个力作用在复杂结构上：200 N 在 36°，150 N 在 108°，180 N 在 180°，120 N 在 252°，F 在 324°。为了平衡，F 是多少？",
            "feedback": {
                "correct": "正确！通过分别分析 x 和 y 分量并求解平衡方程，F = 200 N",
                "incorrect": "分别求和所有 x 分量和 y 分量，然后求解 F。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.058": {
            "prompt": "一个悬挂平台由四根缆绳支撑。三根缆绳的张力为：400 N 在 30°，350 N 在 120°，380 N 在 210°。300° 的第四根缆绳的张力是多少？",
            "feedback": {
                "correct": "正确！求解平衡方程得到 T_4 = 350 N",
                "incorrect": "建立两个平衡方程（x 和 y）并求解未知张力。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.059": {
            "prompt": "一个桁架节点受力：500 N 压力在 0°，400 N 拉力在 60°，450 N 压力在 180°，以及两个未知力在 240° 和 300°。如果 240° 和 300° 的力相等，它们的大小是多少？",
            "feedback": {
                "correct": "正确！使用对称性和平衡方程，每个未知力是 200 N",
                "incorrect": "利用两个未知力相等的事实来简化平衡方程。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.060": {
            "prompt": "一个复杂的缆绳系统有六根缆绳在一点相交。五根缆绳的张力已知：300 N 在 0°，250 N 在 72°，280 N 在 144°，260 N 在 216°，270 N 在 288°。第六根缆绳在最佳平衡角度的张力是多少？",
            "feedback": {
                "correct": "正确！五个力的合力是 89.44 N，所以第六根缆绳必须提供这个力。",
                "incorrect": "找到所有已知力的合力，然后第六根缆绳必须平衡它。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.061": {
            "prompt": "一个桥梁支撑受到 3000 N 的水平风荷载，8000 N 的垂直恒载，以及三个支撑反力在 45°、135° 和 225°。如果 45° 和 225° 的反力相等，它们的大小是多少？",
            "feedback": {
                "correct": "正确！使用对称性的平衡方程，每个相等的反力是 4242.64 N",
                "incorrect": "为 x 和 y 建立平衡方程，利用两个相等反力的对称性。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.062": {
            "prompt": "巴塞尔的一个建筑雕塑有八根对称排列的支撑缆绳，间隔 45°。如果雕塑重 2400 N，每根缆绳的张力是多少？",
            "feedback": {
                "correct": "正确！根据对称性，每根缆绳承受 2400/8 = 300 N",
                "incorrect": "对于对称排列，负载在所有缆绳之间均匀分布。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.063": {
            "prompt": "一个起重机吊钩用四根链条支撑负载，角度分别为与水平方向成 20°、110°、200° 和 290°。如果三根链条的张力分别为 800 N、750 N 和 820 N，第四根链条的张力是多少？",
            "feedback": {
                "correct": "正确！求解平衡方程得到 T_4 = 750 N",
                "incorrect": "计算所有已知力的 x 和 y 分量，然后求解未知量。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.064": {
            "prompt": "一个空间框架节点有七个构件在 0°、51.43°、102.86°、154.29°、205.71°、257.14° 和 308.57° 角度相交。六个构件各有 500 N 的力。第七个构件必须承受多少力才能平衡？",
            "feedback": {
                "correct": "正确！根据对称性（7 个相等的角度），第七个构件也承受 500 N",
                "incorrect": "寻找对称性 - 七个相等的力以相等的角度间隔形成平衡系统。"
            },
            "scenario_desc": "",
            "unit": "N"
        },
        "SP1.01.065": {
            "prompt": "一个复杂的索具系统有力：600 N 在 15°，550 N 在 75°，580 N 在 135°，520 N 在 195°，590 N 在 255°，F 在 315°。平衡时 F 是多少？",
            "feedback": {
                "correct": "正确！综合平衡分析得到 F = 550 N",
                "incorrect": "求和所有已知力的 x 分量和 y 分量，然后求解 F。"
            },
            "scenario_desc": "",
            "unit": "N"
        }
    },
    /* SP1.01_DATA_END */

    // --- Global Physics Modules ---
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
            probability_density: "概率密度 |ψ|^{2}",
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

    // --- 巴塞尔 Sek 1 系列 (SP1 - 力学) ---

    // SP1.02: 牛顿定律
    sp1_02: {
        title: "SP1.02 // 牛顿定律",
        back: "返回枢纽",
        footer_left: "SP1.02_力学 // 节点: 巴塞尔",
        check: "验证",
        next: "下一步",
        correct: "定律验证通过",
        incorrect: "定律错误",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "高级",
            elite: "精英"
        },
        stages: {
            first_law: "第一定律（惯性）",
            second_law: "第二定律（F=ma）",
            third_law: "第三定律（作用-反作用）"
        },

        prompts: {
            "FIRST_LAW": {
                "BASIC": [
                    "Object at rest, no force applied. Will it move?",
                    "Object moving at 5 m/s, no net force. What happens?",
                    "Car at rest. Driver applies no force. Does it move?",
                    "Ball rolling at 3 m/s on frictionless surface. Net force?",
                    "Book on table. Is it in equilibrium?",
                    "Puck sliding on ice at constant speed. Net force?",
                    "Object at rest stays at rest unless acted upon by?"
                ],
                "CORE": [
                    "Basel tram at 15 m/s. Brakes apply -3000 N. Mass 10000 kg. Final velocity after 5s?",
                    "Fasnacht float at rest. Push with 500 N. Friction 500 N. Does it move?",
                    "Rhine boat moving at 2 m/s. Engine off. Friction 100 N. Mass 500 kg. Time to stop?",
                    "Object moving at 10 m/s. Net force 0 N. Velocity after 10s?",
                    "Car at 20 m/s. Friction 2000 N. Mass 1000 kg. Deceleration?",
                    "Tram at constant 12 m/s. Applied force equals friction. Net force?",
                    "Puck on ice at 5 m/s. No friction. Velocity after 20s?",
                    "Basel bus at rest. Engine force 3000 N. Friction 3000 N. Acceleration?"
                ],
                "ADVANCED": [
                    "Basel SBB train 50000 kg at 25 m/s. Brakes apply -10000 N. Distance to stop?",
                    "Fasnacht parade float 2000 kg. Push 1000 N, friction 800 N. Acceleration?",
                    "Rhine boat 1000 kg at 5 m/s. Water resistance 200 N. Time to reach 3 m/s?",
                    "Tram 15000 kg at 20 m/s. Emergency brake -12000 N. Stopping distance?",
                    "Object 500 kg moving at 8 m/s. Friction 100 N. Distance traveled before stopping?",
                    "Car 1200 kg at 30 m/s. Brake force -4000 N. Time to stop?"
                ],
                "ELITE": [
                    "Basel tram system: 3 trams, masses 10000, 12000, 15000 kg, all at 15 m/s. Total momentum?",
                    "Fasnacht float 3000 kg at rest. Multiple pushes: 500 N, 300 N, -200 N. Net force?",
                    "Rhine boat 2000 kg at 4 m/s. Engine thrust 1000 N, water resistance 800 N. Final velocity after 10s?"
                ]
            },
            "SECOND_LAW": {
                "BASIC": [
                    "F=10 N, m=2 kg. Find a (m/s^{2})",
                    "F=20 N, m=5 kg. Find a (m/s^{2})",
                    "F=15 N, m=3 kg. Find a (m/s^{2})",
                    "m=10 kg, a=2 m/s^{2}. Find F (N)",
                    "m=5 kg, a=4 m/s^{2}. Find F (N)",
                    "F=30 N, a=6 m/s^{2}. Find m (kg)",
                    "F=40 N, a=8 m/s^{2}. Find m (kg)"
                ],
                "CORE": [
                    "Basel tram 10000 kg accelerates at 1.5 m/s^{2}. Find F (N)",
                    "Fasnacht float 2000 kg pushed with 1000 N. Find a (m/s^{2})",
                    "Rhine boat 1500 kg, engine thrust 3000 N. Find a (m/s^{2})",
                    "SBB train 50000 kg, brake force -10000 N. Find a (m/s^{2})",
                    "Tram 12000 kg needs 2 m/s^{2} acceleration. Find F (N)",
                    "Car 1000 kg, net force 2000 N. Find a (m/s^{2})",
                    "Basel bus 8000 kg accelerates at 1 m/s^{2}. Find F (N)",
                    "Bicycle 80 kg, force 160 N. Find a (m/s^{2})",
                    "Truck 5000 kg, acceleration 0.5 m/s^{2}. Find F (N)"
                ],
                "ADVANCED": [
                    "Basel tram 10000 kg, applied force 18000 N, friction 3000 N. Find a (m/s^{2})",
                    "Fasnacht float 3000 kg, push 2000 N, friction 500 N. Find a (m/s^{2})",
                    "Rhine boat 2000 kg, thrust 4000 N, water resistance 1000 N. Find a (m/s^{2})",
                    "SBB train 60000 kg, brake -15000 N, friction -3000 N. Find a (m/s^{2})",
                    "Tram 15000 kg needs 1.8 m/s^{2} with friction 2000 N. Find applied force (N)",
                    "Car 1200 kg, engine 5000 N, air resistance 800 N. Find a (m/s^{2})",
                    "Basel bus 8000 kg, engine 10000 N, friction 2000 N. Find a (m/s^{2})"
                ],
                "ELITE": [
                    "Basel tram system: 3 trams (10000, 12000, 15000 kg) all accelerate at 1.5 m/s^{2}. Total force?",
                    "Fasnacht parade: 5 floats, each 2000 kg, each pushed with 1000 N. Total acceleration?",
                    "Rhine boat 2500 kg, thrust 5000 N, water resistance 20% of thrust. Find a (m/s^{2})"
                ]
            },
            "THIRD_LAW": {
                "BASIC": [
                    "You push wall with 50 N. Wall pushes back with how many N?",
                    "Rocket exerts 1000 N on gas. Gas exerts how many N on rocket?",
                    "Earth pulls you with 600 N. You pull Earth with how many N?",
                    "Hammer hits nail with 200 N. Nail hits hammer with how many N?",
                    "Action-reaction forces act on (same/different) objects?",
                    "Action force 100 N east. Reaction force direction?"
                ],
                "CORE": [
                    "Basel tram 10000 kg pushes track with 15000 N. Track pushes tram with how many N?",
                    "Rhine boat propeller pushes water backward with 3000 N. Water pushes boat with how many N?",
                    "Fasnacht float pushes ground with 20000 N. Ground pushes float with how many N?",
                    "SBB train wheels push track with 50000 N. Track pushes wheels with how many N?",
                    "Swimmer pushes water backward with 500 N. Water pushes swimmer forward with how many N?",
                    "Car tire pushes road with 4000 N. Road pushes tire with how many N?",
                    "Rocket pushes exhaust gas with 100000 N. Gas pushes rocket with how many N?",
                    "Person pushes wall with 200 N. Wall pushes person with how many N?"
                ],
                "ADVANCED": [
                    "Basel tram 10000 kg accelerates at 1.5 m/s^{2}. Force on track?",
                    "Rhine boat 2000 kg accelerates at 2 m/s^{2}. Force on water?",
                    "Fasnacht float 3000 kg, friction 500 N, accelerates at 0.5 m/s^{2}. Force on ground?",
                    "SBB train 50000 kg decelerates at -0.2 m/s^{2}. Force on track?",
                    "Rocket 5000 kg accelerates at 10 m/s^{2}. Force on exhaust gas?",
                    "Car 1200 kg accelerates at 3 m/s^{2}. Force on road?",
                    "Basel bus 8000 kg accelerates at 1 m/s^{2}. Force on road?"
                ],
                "ELITE": [
                    "Basel tram 10000 kg and car 1000 kg collide. Tram exerts 50000 N on car. Car exerts how many N on tram?",
                    "Rhine boat 2000 kg pushes water with 4000 N. Boat accelerates at 2 m/s^{2}. Water mass pushed?",
                    "Fasnacht float 3000 kg, ground pushes with 2000 N. Float accelerates at 0.5 m/s^{2}. Friction force?",
                    "SBB train 50000 kg, track pushes with 10000 N. Train decelerates at -0.2 m/s^{2}. Verify F=ma?"
                ]
            }
        },
        labels: {
            "ans": "答案",
            "placeholder": "在此输入"
        },
        scenarios: {
            first_law: "巴塞尔狂欢节游行花车运动：在巴塞尔著名的Fasnacht狂欢节期间，在Marktplatz，精心装饰的游行花车展示了牛顿第一惯性定律。一个质量为3,000公斤的巨大花车在游行开始前静止不动。尽管外观色彩缤纷，它顽固地抵抗运动——除非受到外力作用，否则它将保持静止。当游行参与者以2,000牛顿推动而摩擦力以500牛顿反对时，净1,500牛顿力克服惯性并以0.5米/秒^{2}加速花车。一旦以恒定速度沿游行路线移动，如果推动者保持与摩擦力相等的力，花车将以稳定速度继续前进——证明当净力为零时，运动中的物体以恒定速度保持运动。",
            second_law: "巴塞尔有轨电车加速与制动：巴塞尔标志性的绿色有轨电车穿梭于城市街道，展示了牛顿第二定律的实际应用。在Barfüsserplatz，一辆质量为10,000公斤的电车从静止开始加速至巡航速度。电动机施加15,000牛顿的向前力，而摩擦力和空气阻力提供3,000牛顿的反向力。使用F=ma，我们计算净力（12,000牛顿）产生1.2米/秒^{2}的加速度。当接近下一站时，司机施加制动产生-10,000牛顿，加上-3,000牛顿摩擦力，产生-13,000牛顿净力和-1.3米/秒^{2}的减速度。这种力与运动的日常舞蹈使巴塞尔的公共交通顺畅运行。",
            third_law: "莱茵河船只推进：在巴塞尔莱茵河沿岸的Mittlere Brücke附近，客船通过其推进系统展示了牛顿第三定律。当船的螺旋桨旋转时，它以巨大的力向后推水——典型的莱茵河渡轮可能为3,000牛顿。根据牛顿第三定律，水同时以相等的3,000牛顿力向相反方向推动船只。这对作用-反作用力作用于不同的物体：螺旋桨作用于水，而水作用于船。船的1,500公斤质量因此以2米/秒^{2}向前加速。这一原理为从游泳到火箭推进的一切提供动力。"
        }
    },

    // --- 巴塞尔 Sek 2 系列 (SP2 - 电学) ---

    // SP2.01: 电路基础
    sp2_01: {
        back: "返回枢纽",
        title: "SP2.01 // 电路基础",
        check: "验证",
        next: "下一步",
        correct: "电路验证通过",
        incorrect: "电路错误",
        ready: "就绪",
        monitor_title: "SP2.01_电路实验室",
        footer_left: "SP2.01_电学 // 节点: 巴塞尔",
        objective_title: "电路目标",
        difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
        stages: {
            components: "元件识别",
            simple_circuits: "简单电路",
            circuit_diagrams: "电路图"
        },
        scenarios: {
            components: "巴塞尔家庭电气安全：你是巴塞尔职业学校（Gewerbeschule Basel）的电工学徒。今天你要学习识别家庭电气安装中的电路元件。理解每个元件的功能对安全至关重要——错误识别元件可能导致火灾或触电。在巴塞尔的历史建筑中，电气系统必须符合严格的瑞士安全标准（NIV 2020）。你将学习电池（提供电压的电源）、灯泡（将电能转换为光能）、开关（控制电流）、导线（传导电流）和电阻器（限制电流）。每个元件在保护家庭和确保可靠供电方面都有特定作用。这些知识对巴塞尔17万居民每天依赖的安全电气系统至关重要。",
            simple_circuits: "巴塞尔圣诞灯光安装：你正在帮助沿巴塞尔自由街（Freie Strasse）购物区安装圣诞灯。市政府要求使用可独立控制的节能LED灯串。你需要理解串联电路（灯泡在单一路径中——一个失效，全部熄灭）与并联电路（灯泡在独立路径中——每个可独立控制）的区别。串联电路更简单但可靠性较低。并联电路使用更多导线但提供冗余。对于巴塞尔2公里的圣诞灯光，带独立开关的并联电路允许白天关闭部分灯光以节约能源。巴塞尔圣诞市场使用超过5万个LED灯泡，正确的电路设计确保它们在230V交流电下安全运行，同时消耗最少的电力。",
            circuit_diagrams: "巴塞尔电气工程学徒：在ABB瑞士巴塞尔培训中心，你正在学习阅读和绘制电路图——全球电工的通用语言。电路符号由IEC（国际电工委员会）标准化，因此巴塞尔的工程师可以与东京或纽约的同事合作。电池显示为两条平行线（长线为正极，短线为负极）。灯泡是一个内有X的圆圈。开关是线路中的间隙（断开）或连续线（闭合）。电阻器是矩形或锯齿形。电流表（测量安培电流）和电压表（测量伏特电压）是内有A或V的圆圈。这些符号出现在从简单家庭电路到巴塞尔罗氏和诺华制药厂复杂工业系统的每个电气原理图中。掌握电路图对获得瑞士联邦职业资格证书（Eidgenössisches Fähigkeitszeugnis EFZ）电气工程专业至关重要。"
        },
        feedback: { correct: "电路分析确认。", incorrect: "检测到电路配置错误。" }
    },

    // SP2.02: 欧姆定律与电路
    sp2_02: {
        title: "SP2.02 // 欧姆定律与电路",
        back: "返回枢纽",
        footer_left: "SP2.02_电路 // 节点: 巴塞尔",
        check: "验证",
        next: "下一步",
        correct: "电路验证通过",
        incorrect: "电路错误",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        stages: {
            ohms_law: "欧姆定律",
            series_circuits: "串联电路",
            parallel_circuits: "并联电路"
        },
        scenarios: {
            ohms_law: "巴塞尔大学电气工程实验室：你是一名一年级电气工程专业学生，正在学习电路基础知识。今天的实验重点是欧姆定律（U = I × R），这是所有电路分析的基础。你的任务是计算简单电路中的电压、电流或电阻。施密特教授强调：'理解欧姆定律就像学习字母表——它是后续所有内容的基础。'你将使用数字万用表测量真实电路并验证你的计算。这些知识对于设计从智能手机电路到巴塞尔有轨电车电气系统的一切都至关重要。",
            series_circuits: "诺华制药设备设计：你正在与诺华巴塞尔的电气工程团队合作，为新实验室设备设计配电系统。在串联电路中，元件共享相同的电流，但电压在它们之间分配。你的任务是计算总电阻（R_总 = R_1 + R_2 + ...）和电流。这对于确保敏感的分析仪器接收正确的电压水平至关重要。计算错误可能会损坏价值数百万瑞士法郎的设备或影响药物质量测试结果。",
            parallel_circuits: "罗氏大厦照明系统：你正在为巴塞尔罗氏大厦设计应急照明系统。在并联电路中，元件共享相同的电压，但电流在各分支之间分配。你的任务是计算总电流和等效电阻（1/R_总 = 1/R_1 + 1/R_2 + ...）。这种设计确保如果一盏灯失效，其他灯继续工作——这对于停电期间的安全至关重要。该系统必须处理大楼41层数千个LED灯的高效运行。"
        }
    },

    // SP2.03: 电功率与能耗
    sp2_03: {
        title: "SP2.03 // 电功率与能耗",
        back: "返回枢纽",
        footer_left: "SP2.03_电功率 // 节点: 巴塞尔",
        check: "验证",
        next: "下一步",
        correct: "功率验证通过",
        incorrect: "功率错误",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        stages: {
            power_basics: "功率基础",
            energy_consumption: "能量消耗",
            efficiency: "效率"
        },
        scenarios: {
            power_basics: "巴塞尔家庭用电：你正在帮助巴塞尔的能源咨询公司为居民客户计算用电功率。电功率（P = U × I）决定了设备每秒消耗多少能量，单位为瓦特。你的任务是计算各种家用电器的功率。理解这一点有助于家庭减少电费和碳足迹。例如，一个典型的巴塞尔家庭每年使用约4,500千瓦时，按0.25瑞士法郎/千瓦时计算，费用约为1,125瑞士法郎。准确的功率计算有助于识别浪费能源的设备。",
            energy_consumption: "IWB巴塞尔能源管理：你在IWB（巴塞尔工业公司）工作，这是巴塞尔的主要电力供应商。你的任务是为商业客户计算能量消耗（E = P × t）和费用。能量以千瓦时（kWh）为单位测量，巴塞尔的电价约为家庭0.25瑞士法郎/千瓦时，企业0.20瑞士法郎/千瓦时。你正在分析一个诺华实验室，该实验室全天候运行设备。准确的计算确保正确计费，并帮助客户优化能源使用以降低成本和环境影响。",
            efficiency: "巴塞尔太阳能电池板安装：你是Solarville Basel的工程师，在住宅屋顶上安装太阳能电池板。效率（η = P_out/P_in × 100%）决定了多少太阳光能量转化为电能。现代电池板的效率达到18-22%。你的任务是计算功率输出、能量损失和成本节省。一个典型的巴塞尔家庭拥有20平方米的电池板（4千瓦容量），每年产生约3,800千瓦时，每年节省约950瑞士法郎。理解效率有助于客户做出明智的投资决策。"
        },
        prompts: {
            e1: "IWB 热泵: P=3kW 运行 500h。费率: 0.28 CHF/kWh。总费用？",
            e2: "夏季空调: P=1.5kW 运行 100h。费率: 0.28 CHF/kWh。总费用？",
            e3: "巴塞尔 Läckerli 饼干烤箱: P=2kW 运行 5h。费率: 0.28 CHF/kWh。总费用？",
            e4: "电动车充电 (谷电): P=11kW 运行 50h。费率: 0.24 CHF/kWh。总费用？",
            e5: "巴塞尔狂欢节 (Fasnacht) 彩灯: P=0.5kW 运行 72h。费率: 0.28 CHF/kWh。总费用？"
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
            equilibrium: "力 F_1={f1}N (向右) 和 F_2={f2}N (向左) 作用于物体。为达到平衡，F_3？",
            space: "在深空中（无摩擦），物体 (m={m}kg) 被力 F={f}N 推动 {t}秒后释放。释放后的力？",
            inertia: "物体 (m={m}kg) 静止。什么性质阻止运动状态改变？",
            "2d_balance": "两个垂直的力作用于物体 (m={m}kg)。合力大小？",
            vector_add: "力 F_1={f}N (向东) 和 F_2={f}N (向北) 作用于物体。合力大小？",
            slope: "物体 (m={m}kg) 在斜面上 (θ={theta}°)，摩擦系数 μ={mu}。支持力分量？",
            space_friction: "在太空中，物体 (m={m}kg) 受摩擦力 μ={mu}。这现实吗？",
            complex: "物体 (m={m}kg) 被力 F={f}N 拉动，对抗摩擦 μ={mu}。合力？",

            // 牛顿第二定律 - F=ma
            find_f: "质量 m={m}kg 以加速度 a={a}m/s^{2} 运动。求合力 F。",
            find_a: "合力 F={f}N 作用于质量 m={m}kg。求加速度 a。",
            gravity: "物体 m={m}kg 在行星上 (g={g}m/s^{2})。重力 W=mg？",
            net_force: "力 F={f}N 作用于 m={m}kg。摩擦力 f={fr}N 阻碍。合加速度？",
            friction: "力 F={f}N 拉动 m={m}kg，摩擦系数 μ={mu}。加速度？",
            pulley: "滑轮系统：质量 m={m}kg，施加力 F={f}N，摩擦 μ={mu}。加速度？",
            variable_mass: "力 F={f}N 作用于变质量系统 m={m}kg。有效加速度？",
            coupled: "两个质量耦合：m_1={m}kg，施加 F={f}N。系统加速度？",

            // 摩擦力
            static: "箱子 m={m}kg 在地板上 (μs={mu})。最大静摩擦力？",
            kinetic: "箱子 m={m}kg 滑动 (μk={mu})。动摩擦力？",
            max_static: "箱子 m={m}kg 在表面上 (μs={mu})。滑动前的最大静摩擦？",
            kinetic_vs_static: "箱子 m={m}kg：μs={mu}，μk={mu}。哪个摩擦力更大？",
            slope_friction: "箱子 m={m}kg 在斜面上 (θ={theta}°)，μ={mu}。摩擦力？",
            critical: "箱子 m={m}kg 被力 F={f}N 拉动，μ={mu}。临界点的合力？",

            // 跨学科精英场景（结合向量数学）
            rhine_bridge_3d: "莱茵河大桥结构分析：缆索系统支撑质量 m={m}kg，张力 F={f}N，与水平面成角 θ={theta}°。锚点摩擦系数 μ={mu}。使用三维向量分解计算沿桥面的净力分量（\\\\vec{{F}} = F_x\\\\hat{{i}} + F_y\\\\hat{{j}} + F_z\\\\hat{{k}}）。",
            basel_tram_equilibrium: "巴塞尔有轨电车 BVB 8号线：电车 m={m}kg 在倾斜轨道上（θ={theta}°），电机力 F={f}N 沿轨道向上。轨道摩擦 μ={mu}。为在斜坡上达到平衡，计算净力。使用三维向量分析：\\\\vec{{F}}_{{net}} = \\\\vec{{F}}_{{motor}} + \\\\vec{{F}}_{{gravity}} + \\\\vec{{f}}_{{friction}}。",
            roche_tower_structural: "罗氏大厦结构载荷：建筑构件 m={m}kg 受风力 F={f}N，与垂直方向成角 θ={theta}°。连接处结构摩擦 μ={mu}。使用向量力分解计算加速度 F = ma，其中 \\\\vec{{F}} = (F\\\\cos\\\\theta, F\\\\sin\\\\theta, 0)。",
            basel_port_crane: "巴塞尔港口莱茵河起重机：货柜 m={m}kg 由起重机缆索提升，张力 F={f}N，与垂直方向成角 θ={theta}°。滑轮处缆索摩擦 μ={mu}。使用三维向量分析求加速度：\\\\vec{{a}} = \\\\vec{{F}}_{{net}}/m，其中 \\\\vec{{F}}_{{net}} = \\\\vec{{T}} + \\\\vec{{W}} + \\\\vec{{f}}。",
            hospital_equipment_3d: "巴塞尔大学医院设备：医疗设备 m={m}kg 在倾斜坡道上（θ={theta}°），摩擦系数 μ={mu}。施加力 F={f}N 平行于坡道表面。使用三维向量分解计算摩擦力：\\\\vec{{f}} = \\\\mu\\\\vec{{N}}，其中 \\\\vec{{N}} = mg\\\\cos\\\\theta\\\\hat{{n}}。",

            // 兼容旧键
            n1_const_vel: "物体 (m={m}kg) 以恒定速度 {v}m/s 运动。合力 ΣF？",
            n1_equilibrium: "力 F_1={f1}N (向右) 和 F_2={f2}N (向左) 作用于物体。为达到平衡，F_3？",
            n1_rest: "物体 (m={m}kg) 静止。力 F={f}N 向右推。摩擦力 f={fr}N 向左。加速度？",
            n1_space: "在深空中（无摩擦），物体 (m={m}kg) 被力 F={f}N 推动 {t}秒后释放。释放后的力？",
            n1_inertia: "什么性质阻止 {m}kg 物体的运动状态改变？",
            n2_find_f: "质量 m={m}kg 以加速度 a={a}m/s^{2} 运动。求合力 F。",
            n2_find_a: "合力 F={f}N 作用于质量 m={m}kg。求加速度 a。",
            n2_find_m: "合力 F={f}N 产生加速度 a={a}m/s^{2}。求质量 m。",
            n2_complex: "力 F={f}N 拉动质量 m={m}kg 对抗摩擦力 f={fr}N。求加速度。",
            n2_gravity: "物体 m={m}kg 在行星上坠落 (g={g}m/s^{2})。重力 Fg？",
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
            equilibrium: "平衡时，所有力必须平衡：F_1 + F_3 = F_2",
            space: "释放后，无力作用（太空中 F=0）",
            inertia: "惯性是阻止运动状态改变的性质",
            "2d_balance": "对垂直的力使用勾股定理",
            vector_add: "使用矢量加法：|F_net| = √(F_1^{2} + F_2^{2})",
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
            critical: "临界点时，F_applied = f_max",

            // 跨学科精英提示
            rhine_bridge_3d: "将张力分解为分量：F_x = F cos θ，F_y = F sin θ。考虑摩擦力 f = μN。净力：F_net = F_x - f - mg sin θ（沿桥面）。",
            basel_tram_equilibrium: "斜坡上的平衡：ΣF = 0。将力分解为平行和垂直分量。F_motor 必须平衡 mg sin θ + f，其中 f = μN = μ(mg cos θ)。",
            roche_tower_structural: "使用 F = ma 和向量分解。F_net = F - f，其中 f = μN。分解风力：F_x = F sin θ，F_y = F cos θ。然后 a = F_net/m。",
            basel_port_crane: "向量和：F_net = T - W - f。分解角度 θ 的张力：T_y = T cos θ（垂直），T_x = T sin θ（水平）。摩擦 f = μT。加速度 a = F_net/m。",
            hospital_equipment_3d: "在斜面上：N = mg cos θ（垂直于表面的支持力）。摩擦力 f = μN = μ(mg cos θ) 平行于表面，阻碍运动。",
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
            tram_braking: "巴塞尔电车能量回收：BVB 电车在刹车时利用再生制动将动能回馈至城市电网。",
            energy_audit: "巴塞尔 IWB 能源审计：作为 IWB 的咨询顾问，你需要分析巴塞尔居民楼的能源效率。通过计算热泵功率、太阳能板产出及年度总能耗，你帮助城市实现 2030 净零排放目标。"
        },
        prompts: {
            // 势能
            basic_ep: "物体 m={m}kg 在高度 h={h}m。计算势能 Ep (g={g}m/s^{2})。",
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
            rhine_power_station: "莱茵河电站在 t={t}s 内将水 m={m}kg 提升 h={h}m。功率 P？",
            energy_audit_solar: "巴塞尔屋顶 A={m}m^{2}。光强 I={f}W/m^{2}，效率 {v}%。输出功率 P？",
            energy_audit_heatpump: "热泵需提供 {m}kW 热量，COP={v}。所需电功率 P？",
            iwb_grid_load: "巴塞尔高峰负载 {m}MW。若由 {v} 台 {f}MW 风机供电，缺口百分比？"
        },
        hints: {
            // 势能
            basic_ep: "使用 Ep = mgh",
            rhine_hydro: "势能 Ep = mgh，其中 g=9.8m/s^{2}",
            total_energy: "总能量 E = Ep + Ek = mgh + ½mv^{2}",
            conservation: "能量守恒：E_总 = Ep + Ek = 常数",

            // 动能
            basic_ek: "使用 Ek = ½mv^{2}",
            tram_braking: "动能 Ek = ½mv^{2}",
            velocity_at_bottom: "使用能量守恒：mgh + ½mv₀^{2} = ½mv^{2}",
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
            pressure_basic_1: "P = \\\\rho gh. \\\\text{ 若 } h = 10 \\\\text{ m, } \\\\rho = 1000 \\\\text{ kg/m}^{3}, \\\\text{ 求表压 } P.",
            pressure_basic_2: "\\\\text{水深 5 m。压力？ } (\\\\rho = 1000 \\\\text{ kg/m}^{3}, g = 10 \\\\text{ m/s}^{2})",
            pressure_basic_3: "\\\\text{力 100 N 作用在面积 2 m}^{2}. \\\\text{ 压力？}",
            pressure_basic_4: "\\\\text{力 200 N 作用在面积 0.5 m}^{2}. \\\\text{ 压力？}",
            pressure_basic_5: "\\\\text{潜水员在 2 m 深度。表压？ } (\\\\rho = 1000, g = 10)",

            // 压力 - 核心 (5)
            pressure_core_1: "\\\\text{潜艇在 15 m 深度。总压力？ } (P_{atm} = 101000 \\\\text{ Pa})",
            pressure_core_2: "\\\\text{液压机：500 N 作用在 0.01 m}^{2}. \\\\text{ 压力？}",
            pressure_core_3: "\\\\text{油箱深度 20 m。底部压力？ } (\\\\rho_{oil} = 800 \\\\text{ kg/m}^{3})",
            pressure_core_4: "\\\\text{活塞：1000 N 作用在 0.02 m}^{2}. \\\\text{ 传递的压力？}",
            pressure_core_5: "\\\\text{海洋深度 100 m。表压？ } (\\\\rho = 1030 \\\\text{ kg/m}^{3})",

            // 压力 - 进阶 (5)
            pressure_advanced_1: "\\\\text{双层流体：30 m 水 + 20 m 油 } (\\\\rho_w = 1000, \\\\rho_o = 800). \\\\text{ 底部压力？}",
            pressure_advanced_2: "\\\\text{液压升降机：小活塞 0.001 m}^{2}, \\\\text{ 大活塞 0.1 m}^{2}. \\\\text{ 小活塞上 100 N 力。大活塞上的力？}",
            pressure_advanced_3: "\\\\text{U 型管：左侧水，右侧水银。水高 10 m。水银高度？ } (\\\\rho_w = 1000, \\\\rho_{Hg} = 13600)",
            pressure_advanced_4: "\\\\text{液压制动：主缸 0.01 m}^{2}, \\\\text{ 从缸 0.05 m}^{2}. \\\\text{ 主缸上 200 N 力。从缸上的力？}",
            pressure_advanced_5: "\\\\text{深海：200 m 深度。总压力？ } (P_{atm} = 101000, \\\\rho = 1030)",

            // 压力 - 精英 (5)
            pressure_elite_1: "\\\\text{马里亚纳海沟：11000 m 深度。压力？ } (\\\\rho = 1050, P_{atm} = 101000)",
            pressure_elite_2: "\\\\text{液压系统：A}_1 = 0.0001 \\\\text{ m}^{2}, A_2 = 0.01 \\\\text{ m}^{2}. \\\\text{ 机械优势？}",
            pressure_elite_3: "\\\\text{三层流体：2 m 水，2 m 油 } (\\\\rho = 800), \\\\text{ 1 m 水银 } (\\\\rho = 13600). \\\\text{ 总压力？}",
            pressure_elite_4: "\\\\text{液压千斤顶：效率 80\\\\%. 输入 500 N 在 0.002 m}^{2}, \\\\text{ 输出面积 0.2 m}^{2}. \\\\text{ 输出力？}",
            pressure_elite_5: "\\\\text{潜艇在 1000 m。1 m}^{2} \\\\text{ 舱门上的压力差？ } (\\\\rho = 1030)",

            // 浮力 - 基础 (5)
            buoyancy_basic_1: "F_b = \\\\rho Vg. \\\\text{ 若 } V = 0.1 \\\\text{ m}^{3}, \\\\rho = 1000, \\\\text{ 求浮力 } F_b.",
            buoyancy_basic_2: "\\\\text{物体体积 0.05 m}^{3} \\\\text{ 在水中。浮力？}",
            buoyancy_basic_3: "\\\\text{气球体积 0.2 m}^{3} \\\\text{ 在空气中 } (\\\\rho = 1.2 \\\\text{ kg/m}^{3}). \\\\text{ 浮力？}",
            buoyancy_basic_4: "\\\\text{岩石体积 0.01 m}^{3} \\\\text{ 浸没在水中。浮力？}",
            buoyancy_basic_5: "\\\\text{船排开 0.5 m}^{3} \\\\text{ 的水。浮力？}",

            // 浮力 - 核心 (5)
            buoyancy_core_1: "\\\\text{木块：质量 10 kg，体积 0.02 m}^{3}. \\\\text{ 会在水中漂浮吗？}",
            buoyancy_core_2: "\\\\text{物体：重量 1500 N，体积 0.1 m}^{3} \\\\text{ 在水中。净力？}",
            buoyancy_core_3: "\\\\text{冰块：密度 900 kg/m}^{3}, \\\\text{ 体积 0.05 m}^{3}. \\\\text{ 在水中浸没的分数？}",
            buoyancy_core_4: "\\\\text{铝块：质量 81 kg，体积 0.03 m}^{3}. \\\\text{ 在水中的表观重量？}",
            buoyancy_core_5: "\\\\text{热气球：体积 1000 m}^{3}, \\\\rho_{air} = 1.2, \\\\rho_{hot} = 0.9. \\\\text{ 升力？}",

            // 浮力 - 进阶 (5)
            buoyancy_advanced_1: "\\\\text{比重计：质量 50 g，体积 40 cm}^{3}. \\\\text{ 在水中浸没的深度？}",
            buoyancy_advanced_2: "\\\\text{船：质量 50000 kg。排开的水的体积？}",
            buoyancy_advanced_3: "\\\\text{软木：密度 250 kg/m}^{3}, \\\\text{ 体积 0.02 m}^{3} \\\\text{ 在水中。下沉前的最大负载？}",
            buoyancy_advanced_4: "\\\\text{金块：质量 19.3 kg，体积 0.001 m}^{3}. \\\\text{ 浸没时绳子的张力？}",
            buoyancy_advanced_5: "\\\\text{潜艇：体积 500 m}^{3}, \\\\text{ 质量 400000 kg。下潜所需的压载水？}",

            // 浮力 - 精英 (5)
            buoyancy_elite_1: "\\\\text{双流体系统：物体一半在水中，一半在油中 } (\\\\rho_o = 800). \\\\text{ 若 } V = 0.1 \\\\text{ m}^{3} \\\\text{ 总浮力？}",
            buoyancy_elite_2: "\\\\text{空心球：外半径 0.2 m，内半径 0.15 m，质量 10 kg。会漂浮吗？}",
            buoyancy_elite_3: "\\\\text{冰山：密度 900 kg/m}^{3} \\\\text{ 在海水中 } (\\\\rho = 1030). \\\\text{ 水面以上的分数？}",
            buoyancy_elite_4: "\\\\text{氦气球：体积 1 m}^{3}, \\\\rho_{He} = 0.18, \\\\rho_{air} = 1.2, \\\\text{ 气球质量 0.5 kg。最大载荷？}",
            buoyancy_elite_5: "\\\\text{阿基米德的王冠：空气中重 10 N，水中重 8.5 N。密度？}",

            // 液压 - 基础 (5)
            hydraulics_basic_1: "P = F/A. \\\\text{ 若 } F = 100 \\\\text{ N 作用在 } A = 0.01 \\\\text{ m}^{2}, \\\\text{ 求压力 } P.",
            hydraulics_basic_2: "\\\\text{液压机：200 N 作用在 0.02 m}^{2}. \\\\text{ 压力？}",
            hydraulics_basic_3: "\\\\text{活塞：500 N 作用在 0.05 m}^{2}. \\\\text{ 压力？}",
            hydraulics_basic_4: "\\\\text{液压缸：1000 N 作用在 0.1 m}^{2}. \\\\text{ 压力？}",
            hydraulics_basic_5: "\\\\text{小活塞：50 N 作用在 0.005 m}^{2}. \\\\text{ 压力？}",

            // 液压 - 核心 (5)
            hydraulics_core_1: "\\\\text{液压升降机：} A_1 = 0.01 \\\\text{ m}^{2}, A_2 = 0.1 \\\\text{ m}^{2}, F_1 = 100 \\\\text{ N。求 } F_2.",
            hydraulics_core_2: "\\\\text{液压制动：} A_1 = 0.005 \\\\text{ m}^{2}, A_2 = 0.05 \\\\text{ m}^{2}, F_1 = 50 \\\\text{ N。求 } F_2.",
            hydraulics_core_3: "\\\\text{液压千斤顶：} A_1 = 0.02 \\\\text{ m}^{2}, A_2 = 0.2 \\\\text{ m}^{2}, F_1 = 200 \\\\text{ N。求 } F_2.",
            hydraulics_core_4: "\\\\text{液压机：} A_1 = 0.001 \\\\text{ m}^{2}, A_2 = 0.1 \\\\text{ m}^{2}, F_1 = 10 \\\\text{ N。求 } F_2.",
            hydraulics_core_5: "\\\\text{液压系统：} A_1 = 0.03 \\\\text{ m}^{2}, A_2 = 0.3 \\\\text{ m}^{2}, F_1 = 300 \\\\text{ N。求 } F_2.",

            // 液压 - 进阶 (5)
            hydraulics_advanced_1: "\\\\text{液压升降机：} A_1 = 0.01 \\\\text{ m}^{2}, F_1 = 100 \\\\text{ N, } F_2 = 5000 \\\\text{ N。求 } A_2.",
            hydraulics_advanced_2: "\\\\text{液压系统：} A_1 = 0.002 \\\\text{ m}^{2}, A_2 = 0.2 \\\\text{ m}^{2}, \\\\text{ 活塞 1 移动 10 cm。活塞 2 移动？}",
            hydraulics_advanced_3: "\\\\text{液压机：效率 90\\\\%. } A_1 = 0.01 \\\\text{ m}^{2}, A_2 = 0.1 \\\\text{ m}^{2}, F_1 = 200 \\\\text{ N。求 } F_2.",
            hydraulics_advanced_4: "\\\\text{液压千斤顶：} A_1 = 0.005 \\\\text{ m}^{2}, A_2 = 0.5 \\\\text{ m}^{2}, F_1 = 100 \\\\text{ N。机械优势？}",
            hydraulics_advanced_5: "\\\\text{液压制动：} A_1 = 0.01 \\\\text{ m}^{2}, A_2 = 0.04 \\\\text{ m}^{2}, F_1 = 150 \\\\text{ N, } d_1 = 5 \\\\text{ cm。做功？}",

            // 液压 - 精英 (5)
            hydraulics_elite_1: "\\\\text{多级液压：} A_1 = 0.001, A_2 = 0.01, A_3 = 0.1 \\\\text{ m}^{2}, F_1 = 50 \\\\text{ N。求 } F_3.",
            hydraulics_elite_2: "\\\\text{带摩擦的液压系统：} A_1 = 0.01, A_2 = 0.1 \\\\text{ m}^{2}, F_1 = 200 \\\\text{ N，摩擦力 } = 100 \\\\text{ N。净 } F_2?",
            hydraulics_elite_3: "\\\\text{液压蓄能器：} A_1 = 0.005, A_2 = 0.05 \\\\text{ m}^{2}, \\\\text{ 压力 } = 2 \\\\times 10^6 \\\\text{ Pa。} A_2 \\\\text{ 上的力？}",
            hydraulics_elite_4: "\\\\text{液压阻尼器：} A = 0.01 \\\\text{ m}^{2}, \\\\text{ 速度 } = 0.5 \\\\text{ m/s，粘度产生 } 200 \\\\text{ N 阻力。净力？}",
            hydraulics_elite_5: "\\\\text{串联液压回路：} A_1 = 0.002, A_2 = 0.02, A_3 = 0.2 \\\\text{ m}^{2}. F_1 = 100 \\\\text{ N。总机械优势？}"
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
            c_c1: "\\text{勾股定理：}\\sqrt{4^{2} + 3^2} = 5",
            c_c2: "\\text{勾股定理：}\\sqrt{1^{2} + 1^2} = \\sqrt{2} \\approx 1.41",
            c_c3: "\\text{勾股定理：}\\sqrt{2^{2} + 2^2} = 2\\sqrt{2} \\approx 2.83",
            c_c4: "\\text{勾股定理：}\\sqrt{2^{2} + 1.5^2} = 2.5",
            c_c5: "\\text{勾股定理：}\\sqrt{12^{2} + 5^2} = 13",
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
            n_e1: "v_{net} = \\sqrt{(5\\sin(120^\\circ))^{2} + (5\\cos(120^\\circ) + 2.5)^2} \\approx 4.33\\text{ m/s}",
            n_e2: "\\text{计算横渡时间，然后返回时间，求和}",
            n_e3: "d_{total} = \\sqrt{40^{2} + (3 \\times t)^2} \\text{其中 }t = \\frac{40}{6\\sin(120^\\circ)}",
            n_e4: "\\theta = \\arctan\\left(\\frac{d_{drift}}{30}\\right) \\text{其中偏航来自河流流速}",
            n_e5: "E = \\frac{1}{2} \\times 1 \\times v_{net}^{2}, \\text{先求 }v_{net}",
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
            medium_1: "介质 1 (n_1)",
            medium_2: "介质 2 (n_2)",
            incident_angle: "入射角",
            focal_length: "焦距",
            refraction_title: "折射分析",
            refracted_angle: "折射角 (θ_2)：",
            critical_angle: "全反射临界角：",
            total_internal_reflection: "当前状态：全内反射",
            angle_value: "{value}°",
            light_path_correct: "光路正确！",
            formula: "公式",
            hint: "提示"
        },
        hints: {
            refraction: "光从光疏介质进入光密介质时向法线方向偏折 (n_2 > n_1)"
        },
        snell: { title: "斯涅尔定律", line_1: "n_1 sin(θ_1) = n_2 sin(θ_2)", line_2: "θ_c = arcsin(n_2/n_1)", line_3: "v = c/n" },
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
            find_p: "理想气体: n = {n} mol, T = {T} K, V = {V} m^{3}. 求 P.",
            find_v: "气体: n = {n} mol, P = {P} Pa, T = {T} K. 求 V.",
            find_n: "气体: P = {P} Pa, V = {V} m^{3}, T = {T} K. 求 n.",
            find_t: "气体: P = {P} Pa, V = {V} m^{3}, n = {n} mol. 求 T.",
            relation_pt: "体积恒定时温度加倍，压强变为原来的几倍？",
            relation_vn: "恒温恒压下摩尔数加倍，体积变为原来的几倍？",
            boyle_find_p2: "波义耳定律: P_1 = {p1} kPa, V_1 = {v1} L, V_2 = {v2} L. 求 P_2.",
            boyle_find_v2: "波义耳定律: P_1 = {p1} kPa, V_1 = {v1} L, P_2 = {p2} kPa. 求 V_2.",
            boyle_relation: "恒温下将气体从 {v1} L 压缩到 {v2} L，压强变为原来的几倍？",
            boyle_condition: "波义耳定律要求哪个量保持不变？",
            charles_find_v2: "查理定律: V_1 = {v1} L, T_1 = {t1} K, T_2 = {t2} K. 求 V_2.",
            charles_find_t2: "查理定律: V_1 = {v1} L, T_1 = {t1} K, V_2 = {v2} L. 求 T_2.",
            charles_relation: "恒压下绝对温度加倍，体积变为原来的几倍？",
            charles_condition: "查理定律要求哪个量保持不变？",
            combined_law: "联合气体定律：已知 P, V, T 变化，求 {target}。",
            iwb_steam: "IWB 区域供热：蒸汽 T={T} K, V={V} m^{3}, n={n} mol。计算压强 P (理想气体)。",
            roche_tower: "Roche 大厦 40 层：房间 V={V} m^{3}, T={T} K, P={P} Pa。计算空气摩尔数 n。",
            rhine_bubble: "莱茵河潜水员在深度 (P1={p1} kPa) 呼出气泡 V1={v1} mL。到达水面 (P2={p2} kPa) 时的体积？",
            weather_balloon: "巴塞尔气象气球：地面 V={v1} m^{3}, T1={t1} K。平流层 T2={t2} K (假设 P 恒定，查理定律)。新体积？",
            novartis_reactor: "Novartis 反应釜 V={V} m^{3}。用 N2 在 P={P} Pa, T={T} K 下吹扫。计算 N2 质量 (M=0.028 kg/mol)。"
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
            wh_isobaric: "等压膨胀：P = {p} Pa, ΔV = {dv} m^{3}. 求功 W.",
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
            optics: "CERN 的巴塞尔合作项目使用先进的光学系统进行粒子探测。光遵循反射定律（θᵢ = θᵣ）和斯涅尔折射定律（n_1sinθ_1 = n_2sinθ_2）。当光从密介质传播到疏介质且角度超过临界角时发生全内反射，这使得巴塞尔电信基础设施中的光纤通信成为可能。单缝衍射在 asinθ = mλ 处产生特征性的极小值图案。衍射光栅方程 d·sinθ = mλ 用于罗氏和诺华的化学分析光谱仪。瑞利判据确定巴塞尔天文台望远镜的光学分辨率极限。"
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
            de_broglie: "电子（m = 9.1×10^-^{3}¹ kg，v = 1 m/s）。德布罗意波长？（h = 6.63×10^-^{3}^{4}）",
            wave_particle_duality: "光同时表现出波动性和粒子性。对还是错？",
            photon_energy: "频率 f = 5×10¹^{4} Hz 的光子。能量 E = hf？（h = 6.63×10^-^{3}^{4}）",
            matter_wave: "电子波长 λ = h/mv。对于典型电子，λ ≈ ？",
            uncertainty: "海森堡不确定性：ΔxΔp ≥ h/4π。我们能同时精确知道两者吗？",
            same_phase_add: "两个波（A = 2 m）同相。总振幅？",
            opposite_phase_cancel: "两个波（A = 3 m）反相。总振幅？",
            constructive_max: "两个波（A = 1 m）相长干涉。最大振幅？",
            partial_destructive: "波 A_1 = 5 m，A_2 = 3 m 相消干涉。总振幅？",
            interference_type: "两个同相波叠加。干涉类型？",
            standing_wave_node: "驻波 λ = 2 m。第一个波节位置 x_1？",
            standing_wave_antinode: "驻波 λ = 4 m。第一个波腹位置 x_1？",
            node_count: "弦长 5 m，λ = 2 m。波节数量？",
            string_fundamental: "弦基频模式：L = λ/2。如果 λ = 1 m，求 L。",
            harmonic_wavelength: "基频 λ_1 = 2 m。二次谐波波长 λ_2？",
            double_slit_spacing: "双缝：λ = 500 nm，L = 2 m，d = 1 mm。条纹间距 Δy？",
            fringe_order: "双缝：λ = 600 nm，L = 2 m，d = 1.2 mm。第三亮条纹 y_3？",
            slit_separation: "双缝：λ = 500 nm，L = 1 m，Δy = 1 mm。缝间距 d？",
            wavelength_from_fringes: "双缝：Δy = 0.8 mm，d = 0.5 mm，L = 1 m。波长 λ？",
            central_maximum: "双缝：中央极大位置 y₀？",
            thin_film_constructive: "薄膜（n = 2）：λ = 500 nm，m = 1 的相长干涉。厚度 t？",
            thin_film_destructive: "薄膜（n = 2）：λ = 600 nm，m = 0 的相消干涉。厚度 t？",
            newton_rings: "牛顿环：λ = 500 nm，R = 1 m。第一亮环半径 r_1？",
            soap_bubble: "肥皂泡（n = 1.33，t = 300 nm）强烈反射哪种颜色？",
            anti_reflection: "增透膜（n = 2）：λ = 400 nm。最小厚度 t？",
            reflection_angle: "光以 30° 入射。反射角 θᵣ？",
            refraction_basic: "光从空气（n = 1）以 30° 入射到玻璃（n = 1.5）。折射角 θ_2？",
            light_speed_medium: "玻璃中的光（n = 1.5）。速度 v = c/n？",
            refractive_index: "介质中光速：v = 2×10^8 m/s。折射率 n？",
            normal_incidence: "光垂直入射表面。折射角 θᵣ？",
            critical_angle: "玻璃（n = 1.5）到空气（n = 1）。临界角 θc？",
            total_internal_reflection: "光从玻璃以 50° 入射到空气（θc = 42°）。全内反射？",
            fiber_optics: "光纤使用哪个原理来捕获光？",
            prism_dispersion: "棱镜将白光分离成颜色。这种效应称为？",
            brewster_angle: "玻璃（n = 1.5）到空气的布儒斯特角。tan θB = n_2/n_1。求 θB。",
            single_slit_minima: "单缝（a = 1 mm）：λ = 500 nm 的第一极小。角度 θ_1？",
            diffraction_width: "单缝（a = 0.6 mm）：λ = 600 nm，L = 1 m。中央极大宽度 w？",
            rayleigh_criterion: "望远镜（D = 0.5 m）：λ = 500 nm。最小可分辨角 θmin？",
            circular_aperture: "圆孔（D = 10 mm，f = 100 mm）：λ = 500 nm。艾里斑半径 r？",
            resolving_power: "望远镜直径 D = 0.5 m，λ = 500 nm。分辨本领 R？",
            grating_equation: "衍射光栅（d = 1 μm）：λ = 500 nm，m = 1。角度 θ_1？",
            grating_order: "光栅（d = 2 μm）：λ = 600 nm。最大级次 mmax？",
            grating_spacing: "光栅：λ = 500 nm，θ_1 = 30°，m = 1。线间距 d？",
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
            beats: "拍频 = |f_1 - f_2|",
            de_broglie: "λ = h/mv",
            duality: "光既是波又是粒子",
            photon_energy: "E = hf",
            matter_wave: "所有物质都有波动性",
            uncertainty: "不能同时精确知道两者",
            in_phase: "同相：振幅相加",
            out_of_phase: "反相：振幅相减",
            max_amplitude: "相长：A_1 + A_2",
            partial_cancel: "部分相消：|A_1 - A_2|",
            interference_types: "同相 = 相长",
            node_position: "波节：x = nλ/2",
            antinode_position: "波腹：x = (n + 1/2)λ/2",
            node_count: "计算 λ/2 间隔",
            fundamental_mode: "基频：L = λ/2",
            second_harmonic: "二次谐波：λ_2 = λ_1/2",
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
            snells_law: "n_1sinθ_1 = n_2sinθ_2",
            light_speed: "v = c/n",
            index_calc: "n = c/v",
            normal_ray: "垂直：无弯曲",
            critical_angle: "sinθc = n_2/n_1",
            tir_condition: "θ > θc 导致全内反射",
            fiber_principle: "全内反射",
            dispersion: "不同 λ 折射不同",
            brewster: "tanθB = n_2/n_1",
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

    // GP3.02: 电磁学基础
    gp3_02: {
        back: "返回枢纽",
        title: "GP3.02 // 电磁学基础",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        stages: {
            electric_field: "电场",
            magnetic_field: "磁场",
            particle_motion: "粒子运动"
        },
        scenarios: {
            electric_field: "你是巴塞尔罗氏大厦的研究工程师，正在设计用于制药洁净室空气净化的先进静电除尘器。该系统利用电场去除空气中的颗粒物，确保救命药物的无菌生产环境。电场强度 E = kQ/r^{2}（其中 k = 8.99×10^9 N·m^{2}/C^{2}）决定了带电粒子所受的力。点电荷 Q 产生向外辐射的电场，电场线显示方向和强度。测试电荷 q 在此电场中受到的力为 F = qE。理解电场对于设计医疗设备、CERN 巴塞尔合作项目的粒子加速器以及本地科技公司的半导体制造至关重要。这些原理还解释了巴塞尔历史建筑的防雷系统以及智能手机触摸屏的工作原理。",
            magnetic_field: "在巴塞尔大学医院的 MRI 部门，你正在校准用于医学成像的磁场系统。磁场由电流产生，以特斯拉（T）为单位测量。载流直导线产生圆形磁场，强度为 B = μ₀I/(2πr)，其中 μ₀ = 4π×10^-^7 T·m/A 是真空磁导率。右手定则确定磁场方向：拇指指向电流方向，手指弯曲指向磁场方向。螺线管（线圈）内部产生均匀磁场 B = μ₀nI，用于 MRI 机器中对齐患者体内的氢原子。磁场中载流导线受到的力为 F = BILsinθ，这使得巴塞尔的有轨电车和火车中的电动机得以运转。磁悬浮列车利用这些原理，巴塞尔与瑞士铁路网络的连接依赖于电磁系统。",
            particle_motion: "你是 CERN 巴塞尔研究设施的物理学家，正在分析大型强子对撞机实验中带电粒子在电磁场中的轨迹。当带电粒子（电荷 q，质量 m）进入电场 E 时，它受到力 F = qE 和加速度 a = qE/m，沿抛物线路径运动，类似于抛体运动。在磁场 B 中，运动的带电粒子受到垂直于速度和磁场的洛伦兹力 F = qvB，导致圆周运动，半径为 r = mv/(qB)。这一原理使诺华和罗氏质量控制实验室的质谱仪能够识别药物化合物的分子质量。速度选择器使用交叉的电场和磁场，只有当 v = E/B 时粒子才能直线运动，从而按速度分离离子。回旋加速器在螺旋路径中加速粒子，用于巴塞尔大学医院的癌症放射治疗。理解粒子运动对于设计粒子探测器、分析宇宙射线以及开发下一代医学成像技术至关重要。"
        },
        objective_title: "电磁分析",
        complete: "模块完成！",
        check: "验证",
        next: "下一挑战",
        correct: "场验证成功",
        incorrect: "检查计算",
        ready: "就绪",
        monitor_title: "GP3.02_电磁监视器",
        footer_left: "GP3.02_电磁学 // 节点：巴塞尔"
    },

    // GP3.03: 电磁感应
    gp3_03: {
        back: "返回枢纽",
        title: "GP3.03 // 电磁感应",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        stages: {
            faradays_law: "法拉第定律",
            lenzs_law: "楞次定律",
            generators: "发电机与电动机"
        },
        scenarios: {
            faradays_law: "你是巴塞尔附近莱茵河畔比尔斯费尔登水电站的电气工程师，正在分析该设施发电机中的电磁感应现象。法拉第电磁感应定律指出，通过线圈的磁通量变化会感应出电动势（EMF）：ε = -N(ΔΦ/Δt)，其中 N 是匝数，Φ 是磁通量（Φ = BA），B 是磁场强度，A 是线圈面积。当磁铁穿过线圈或线圈在磁场中旋转时，变化的磁通量会感应出电流。变化越快，感应电动势越大。这一原理为巴塞尔的电网供电，将莱茵河的动能转化为家庭、医院和工业用电。理解法拉第定律对于设计瑞士 ABB 公司的变压器、电动汽车的无线充电系统以及现代巴塞尔厨房的电磁炉至关重要。同样的物理原理使巴塞尔机场的金属探测器和公共交通中的磁卡读卡器得以运作。",
            lenzs_law: "在巴塞尔大学物理实验室，你正在演示楞次定律，该定律确定感应电流的方向。楞次定律指出，感应电流的流动方向会产生磁场来抵抗引起它的磁通量变化，从而保持能量守恒。当磁铁的北极接近线圈时，感应电流产生的磁场的北极面向磁铁，排斥它。当磁铁远离时，感应磁场的南极面向磁铁，吸引它。这种对抗需要做功，将机械能转化为电能。楞次定律解释了巴塞尔有轨电车的电磁制动：当制动器启动时，金属盘中的感应电流产生相反的磁力，在没有摩擦的情况下减速车辆。铝板中的涡流展示了这一原理，用于回收设施中分离金属。理解楞次定律对于设计电动汽车的再生制动系统、巴塞尔现代建筑中用于地震保护的磁阻尼器以及高速列车的非接触制动系统至关重要。",
            generators: "你是 Axpo 能源公司的电力系统工程师，负责设计和维护连接到巴塞尔的瑞士电网发电机。发电机利用电磁感应将机械能转化为电能。在交流发电机中，线圈在磁场中旋转，不断改变磁通量并感应出正弦电动势：ε = NABω sin(ωt)，其中 ω 是角速度。莱茵河的水电站使用涡轮机旋转发电机线圈，为巴塞尔的电网产生 50 Hz 的交流电。直流发电机使用换向器产生直流电，为巴塞尔的有轨电车系统供电。电动机的工作原理相反：电能产生磁力从而产生旋转，用于从巴塞尔的工业机械到家用电器的各种设备。变压器利用互感改变电压等级：升压变压器提高电压以便从比尔斯费尔登长距离输电到巴塞尔，而降压变压器降低电压以供家庭安全使用。理解发电机和电动机对于可再生能源系统、电动汽车设计以及维护巴塞尔的可持续能源基础设施至关重要。"
        },
        objective_title: "感应分析",
        complete: "模块完成！",
        check: "验证",
        next: "下一挑战",
        correct: "感应验证成功",
        incorrect: "检查计算",
        ready: "就绪",
        monitor_title: "GP3.03_感应监视器",
        footer_left: "GP3.03_电磁感应 // 节点：巴塞尔"
    },

};
