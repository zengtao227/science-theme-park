// SP2.01 Circuit Basics - Quest Data Generation

import { Difficulty } from "@/hooks/useQuestManager";
import { SP201Quest, Stage, ComponentType, FaultType } from "@/types/sp2-01-types";

// Component information database
const componentInfo = {
  BATTERY: {
    name: { en: "Battery", cn: "电池", de: "Batterie" },
    symbol: "⏚",
    function: {
      en: "Provides electrical energy to the circuit. Has positive (+) and negative (-) terminals.",
      cn: "为电路提供电能。有正极（+）和负极（-）端子。",
      de: "Liefert elektrische Energie für den Stromkreis. Hat Plus- (+) und Minus- (-) Pole."
    }
  },
  BULB: {
    name: { en: "Light Bulb", cn: "灯泡", de: "Glühbirne" },
    symbol: "💡",
    function: {
      en: "Converts electrical energy into light and heat. Brightness depends on current flow.",
      cn: "将电能转换为光和热。亮度取决于电流大小。",
      de: "Wandelt elektrische Energie in Licht und Wärme um. Helligkeit hängt vom Stromfluss ab."
    }
  },
  SWITCH: {
    name: { en: "Switch", cn: "开关", de: "Schalter" },
    symbol: "⏻",
    function: {
      en: "Controls current flow. Open state stops current, closed state allows current to flow.",
      cn: "控制电流流动。断开状态停止电流，闭合状态允许电流流动。",
      de: "Steuert den Stromfluss. Offener Zustand stoppt Strom, geschlossener Zustand lässt Strom fließen."
    }
  },
  WIRE: {
    name: { en: "Wire", cn: "电线", de: "Draht" },
    symbol: "—",
    function: {
      en: "Conducts electricity with minimal resistance. Connects components in the circuit.",
      cn: "以最小电阻传导电流。连接电路中的元件。",
      de: "Leitet Elektrizität mit minimalem Widerstand. Verbindet Komponenten im Stromkreis."
    }
  },
  RESISTOR: {
    name: { en: "Resistor", cn: "电阻", de: "Widerstand" },
    symbol: "⧉",
    function: {
      en: "Limits current flow. Resistance value shown by color bands.",
      cn: "限制电流流动。电阻值由色环表示。",
      de: "Begrenzt den Stromfluss. Widerstandswert durch Farbbänder angezeigt."
    }
  }
};

// Basel scenarios
const baselScenarios = {
  home_safety: {
    en: "You're helping your family understand electrical safety in your Basel apartment. Swiss homes use 230V AC power with Type J plugs (three round pins). The circuit breaker panel protects against overloads. Your task is to identify the components in household circuits and understand how they work together safely. This knowledge helps you use appliances correctly and recognize potential hazards.",
    cn: "你正在帮助家人了解巴塞尔公寓的电气安全。瑞士家庭使用230V交流电和J型插头（三个圆形插脚）。断路器面板防止过载。你的任务是识别家用电路中的元件并了解它们如何安全地协同工作。这些知识帮助你正确使用电器并识别潜在危险。",
    de: "Du hilfst deiner Familie, die elektrische Sicherheit in eurer Basler Wohnung zu verstehen. Schweizer Haushalte verwenden 230V Wechselstrom mit Typ-J-Steckern (drei runde Stifte). Die Sicherungstafel schützt vor Überlastung. Deine Aufgabe ist es, die Komponenten in Haushaltsschaltungen zu identifizieren und zu verstehen, wie sie sicher zusammenarbeiten."
  },
  christmas_lights: {
    en: "The Basel Christmas Market (Weihnachtsmarkt) on Barfüsserplatz is famous for its beautiful lights. You're designing a light string for your school's Christmas display. Understanding series and parallel circuits helps you create reliable lighting that won't fail if one bulb burns out. You'll learn why professional displays use parallel circuits and how to troubleshoot common problems.",
    cn: "巴塞尔圣诞市场（Weihnachtsmarkt）在Barfüsserplatz广场以其美丽的灯光而闻名。你正在为学校的圣诞展示设计灯串。理解串联和并联电路帮助你创建可靠的照明，即使一个灯泡烧坏也不会失效。你将学习为什么专业展示使用并联电路以及如何排除常见问题。",
    de: "Der Basler Weihnachtsmarkt auf dem Barfüsserplatz ist berühmt für seine schönen Lichter. Du entwirfst eine Lichterkette für die Weihnachtsausstellung deiner Schule. Das Verständnis von Serien- und Parallelschaltungen hilft dir, zuverlässige Beleuchtung zu schaffen, die nicht ausfällt, wenn eine Glühbirne durchbrennt."
  },
  school_lab: {
    en: "In the University of Basel Physics Lab, you're conducting circuit experiments. Proper circuit diagrams using IEC standard symbols help scientists communicate clearly. You'll learn to draw professional diagrams, measure voltage and current, and troubleshoot circuits systematically. These skills are essential for scientific work and technical documentation.",
    cn: "在巴塞尔大学物理实验室，你正在进行电路实验。使用IEC标准符号的正确电路图帮助科学家清晰地交流。你将学习绘制专业图表、测量电压和电流，并系统地排除电路故障。这些技能对科学工作和技术文档至关重要。",
    de: "Im Physiklabor der Universität Basel führst du Schaltungsexperimente durch. Ordnungsgemäße Schaltpläne mit IEC-Standardsymbolen helfen Wissenschaftlern, klar zu kommunizieren. Du lernst, professionelle Diagramme zu zeichnen, Spannung und Strom zu messen und Schaltungen systematisch zu beheben."
  },
  sbb_station: {
    en: "Basel SBB train station uses complex electrical systems for lighting, signals, and information displays. You're designing a control system where multiple switches can control the same lights (like staircase lighting). This requires understanding parallel circuits and switch configurations. Your design must be reliable, efficient, and meet Swiss electrical safety standards.",
    cn: "巴塞尔SBB火车站使用复杂的电气系统进行照明、信号和信息显示。你正在设计一个控制系统，其中多个开关可以控制相同的灯（如楼梯照明）。这需要理解并联电路和开关配置。你的设计必须可靠、高效，并符合瑞士电气安全标准。",
    de: "Der Bahnhof Basel SBB verwendet komplexe elektrische Systeme für Beleuchtung, Signale und Informationsanzeigen. Du entwirfst ein Steuerungssystem, bei dem mehrere Schalter dieselben Lichter steuern können (wie Treppenhausbeleuchtung). Dies erfordert das Verständnis von Parallelschaltungen und Schalterkonfigurationen."
  }
};

function promptText(
  t: ((path: string, params?: Record<string, string | number>) => string) | undefined,
  key: string,
  params?: Record<string, string | number>
): string {
  const path = `sp2_01.prompts.${key}`;
  if (t) {
    const translated = t(path, params);
    return typeof translated === "string" ? translated : path;
  }
  return path;
}

export function buildStagePool(
  t: ((path: string, params?: Record<string, string | number>) => string),
  difficulty: Difficulty,
  stage: Stage
): SP201Quest[] {
  // BASIC Difficulty - COMPONENTS Stage (20 quests)
  if (difficulty === "BASIC" && stage === "COMPONENTS") {
    const components: ComponentType[] = ["BATTERY", "BULB", "SWITCH", "WIRE", "RESISTOR"];
    const quests: SP201Quest[] = [];
    
    // 4 quests per component type (5 components × 4 = 20 quests)
    components.forEach((componentType, compIdx) => {
      const info = componentInfo[componentType];
      
      // Quest 1: Identify component name
      quests.push({
        id: `COMPONENTS_BASIC_${compIdx * 4 + 1}`,
        difficulty: "BASIC",
        stage: "COMPONENTS",
        type: "IDENTIFY",
        targetComponent: componentType,
        componentInfo: info,
        promptLatex: promptText(t, "component_name", { symbol: info.symbol }),
        expressionLatex: "",
        targetLatex: "answer",
        slots: [{
          id: "answer",
          labelLatex: "Component Name",
          placeholder: t("sp2_01.placeholders.type_name"),
          expected: info.name.en
        }],
        correctLatex: `\\\\text{${info.name.en}}`,
        answer: info.name.en,
        baselContext: baselScenarios.home_safety.en,
        hints: [
          `This component is used in ${componentType === "BATTERY" ? "powering" : componentType === "BULB" ? "lighting" : componentType === "SWITCH" ? "controlling" : componentType === "WIRE" ? "connecting" : "limiting current in"} circuits.`,
          `Look at the symbol: ${info.symbol}`,
          `The answer is: ${info.name.en}`
        ]
      });
      
      // Quest 2: Identify component function
      quests.push({
        id: `COMPONENTS_BASIC_${compIdx * 4 + 2}`,
        difficulty: "BASIC",
        stage: "COMPONENTS",
        type: "IDENTIFY",
        targetComponent: componentType,
        componentInfo: info,
        promptLatex: promptText(t, "component_function", {
          component: promptText(t, `component_${componentType.toLowerCase()}`)
        }),
        expressionLatex: "",
        targetLatex: "answer",
        slots: [{
          id: "answer",
          labelLatex: "Function",
          placeholder: t("sp2_01.placeholders.describe_function"),
          expected: info.function.en
        }],
        correctLatex: `\\\\text{${info.function.en}}`,
        answer: info.function.en,
        baselContext: baselScenarios.home_safety.en
      });
      
      // Quest 3: Identify symbol
      quests.push({
        id: `COMPONENTS_BASIC_${compIdx * 4 + 3}`,
        difficulty: "BASIC",
        stage: "COMPONENTS",
        type: "IDENTIFY",
        targetComponent: componentType,
        componentInfo: info,
        promptLatex: promptText(t, "component_symbol", {
          component: promptText(t, `component_${componentType.toLowerCase()}`)
        }),
        expressionLatex: "",
        targetLatex: "answer",
        slots: [{
          id: "answer",
          labelLatex: "Symbol",
          placeholder: t("sp2_01.placeholders.select_symbol"),
          expected: info.symbol
        }],
        correctLatex: `\\\\text{${info.symbol}}`,
        answer: info.symbol,
        baselContext: baselScenarios.home_safety.en
      });
      
      // Quest 4: Identify terminals/properties
      const terminalQuestionKeys: Record<ComponentType, string> = {
        BATTERY: "terminal_question_battery",
        BULB: "terminal_question_bulb",
        SWITCH: "terminal_question_switch",
        WIRE: "terminal_question_wire",
        RESISTOR: "terminal_question_resistor"
      };
      
      const terminalAnswers = {
        BATTERY: "2 (positive and negative)",
        BULB: "No, it works in either direction",
        SWITCH: "Open and Closed",
        WIRE: "Low resistance",
        RESISTOR: "Resistance value"
      };
      
      quests.push({
        id: `COMPONENTS_BASIC_${compIdx * 4 + 4}`,
        difficulty: "BASIC",
        stage: "COMPONENTS",
        type: "IDENTIFY",
        targetComponent: componentType,
        componentInfo: info,
        promptLatex: promptText(t, terminalQuestionKeys[componentType]),
        expressionLatex: "",
        targetLatex: "answer",
        slots: [{
          id: "answer",
          labelLatex: "Answer",
          placeholder: t("sp2_01.placeholders.type_answer"),
          expected: terminalAnswers[componentType]
        }],
        correctLatex: `\\\\text{${terminalAnswers[componentType]}}`,
        answer: terminalAnswers[componentType],
        baselContext: baselScenarios.home_safety.en
      });
    });
    
    return quests;
  }
  
  // CORE Difficulty - CIRCUITS Stage (20 quests)
  if (difficulty === "CORE" && stage === "CIRCUITS") {
    const quests: SP201Quest[] = [];
    
    // 5 single bulb circuits
    for (let i = 1; i <= 5; i++) {
      quests.push({
        id: `CIRCUITS_CORE_${i}`,
        difficulty: "CORE",
        stage: "CIRCUITS",
        type: "BUILD",
        requiredComponents: ["BATTERY", "BULB", "WIRE"],
        circuitType: "SERIES",
        targetCircuit: {
          components: [
            { id: "battery1", type: "BATTERY", position: { x: 100, y: 200 }, properties: { voltage: 9 } },
            { id: "bulb1", type: "BULB", position: { x: 300, y: 200 }, properties: { resistance: 10 } },
          ],
          connections: [
            { from: "battery1", to: "bulb1", fromTerminal: "POSITIVE", toTerminal: "TERMINAL_A" },
            { from: "bulb1", to: "battery1", fromTerminal: "TERMINAL_B", toTerminal: "NEGATIVE" }
          ]
        },
        promptLatex: promptText(t, "build_simple_circuit"),
        expressionLatex: "",
        targetLatex: "circuit",
        slots: [],
        correctLatex: "\\\\text{Circuit complete! The bulb should light up.}",
        answer: "circuit_built",
        baselContext: baselScenarios.home_safety.en
      });
    }
    
    // 5 series circuits with multiple bulbs
    for (let i = 6; i <= 10; i++) {
      const numBulbs = 2 + (i % 2); // 2 or 3 bulbs
      quests.push({
        id: `CIRCUITS_CORE_${i}`,
        difficulty: "CORE",
        stage: "CIRCUITS",
        type: "BUILD",
        requiredComponents: ["BATTERY", ...Array(numBulbs).fill("BULB"), "WIRE"],
        circuitType: "SERIES",
        promptLatex: promptText(t, "build_series_bulbs", { count: numBulbs }),
        expressionLatex: "I_{total} = I_1 = I_2 = I_3",
        targetLatex: "circuit",
        slots: [],
        correctLatex: `\\\\text{Series circuit complete! All ${numBulbs} bulbs should glow dimmer than a single bulb.}`,
        answer: "circuit_built",
        baselContext: baselScenarios.christmas_lights.en
      });
    }
    
    // 5 parallel circuits with multiple bulbs
    for (let i = 11; i <= 15; i++) {
      const numBulbs = 2 + (i % 2); // 2 or 3 bulbs
      quests.push({
        id: `CIRCUITS_CORE_${i}`,
        difficulty: "CORE",
        stage: "CIRCUITS",
        type: "BUILD",
        requiredComponents: ["BATTERY", ...Array(numBulbs).fill("BULB"), "WIRE"],
        circuitType: "PARALLEL",
        promptLatex: promptText(t, "build_parallel_bulbs", { count: numBulbs }),
        expressionLatex: "I_{total} = I_1 + I_2 + I_3",
        targetLatex: "circuit",
        slots: [],
        correctLatex: `\\\\text{Parallel circuit complete! All ${numBulbs} bulbs should glow at full brightness.}`,
        answer: "circuit_built",
        baselContext: baselScenarios.christmas_lights.en
      });
    }
    
    // 5 switch control circuits
    for (let i = 16; i <= 20; i++) {
      quests.push({
        id: `CIRCUITS_CORE_${i}`,
        difficulty: "CORE",
        stage: "CIRCUITS",
        type: "BUILD",
        requiredComponents: ["BATTERY", "BULB", "SWITCH", "WIRE"],
        circuitType: "SERIES",
        promptLatex: promptText(t, "build_switch_control"),
        expressionLatex: "",
        targetLatex: "circuit",
        slots: [],
        correctLatex: "\\\\text{Circuit complete! Toggle the switch to turn the bulb on and off.}",
        answer: "circuit_built",
        baselContext: baselScenarios.home_safety.en
      });
    }
    
    return quests;
  }
  
  // ADVANCED Difficulty - Mixed stages (15 quests)
  if (difficulty === "ADVANCED") {
    const quests: SP201Quest[] = [];
    
    // 5 diagram drawing quests
    for (let i = 1; i <= 5; i++) {
      quests.push({
        id: `DIAGRAMS_ADVANCED_${i}`,
        difficulty: "ADVANCED",
        stage: "DIAGRAMS",
        type: "DRAW",
        targetDiagram: {
          symbols: [
            { id: "battery1", type: "BATTERY", gridPosition: { row: 5, col: 2 }, orientation: "VERTICAL" },
            { id: "bulb1", type: "BULB", gridPosition: { row: 5, col: 10 }, orientation: "HORIZONTAL" },
          ],
          connections: [
            { from: { row: 5, col: 2 }, to: { row: 5, col: 10 }, path: [] }
          ]
        },
        promptLatex: promptText(t, "draw_iec_diagram"),
        expressionLatex: "",
        targetLatex: "diagram",
        slots: [],
        correctLatex: "\\\\text{Diagram correct! Battery symbol with + and - terminals, bulb symbol as circle with X.}",
        answer: "diagram_drawn",
        baselContext: baselScenarios.school_lab.en
      });
    }
    
    // 5 series vs parallel comparison quests
    for (let i = 6; i <= 10; i++) {
      quests.push({
        id: `COMPARISON_ADVANCED_${i}`,
        difficulty: "ADVANCED",
        stage: "CIRCUITS",
        type: "BUILD",
        requiredComponents: ["BATTERY", "BULB", "BULB", "BULB", "WIRE"],
        circuitType: i % 2 === 0 ? "SERIES" : "PARALLEL",
        promptLatex: i % 2 === 0
          ? promptText(t, "compare_series_three")
          : promptText(t, "compare_parallel_three"),
        expressionLatex: i % 2 === 0 
          ? "R_{total} = R_1 + R_2 + R_3"
          : "\\\\frac{1}{R_{total}} = \\\\frac{1}{R_1} + \\\\frac{1}{R_2} + \\\\frac{1}{R_3}",
        targetLatex: "circuit",
        slots: [],
        correctLatex: i % 2 === 0
          ? "\\\\text{Series: All bulbs dim because current is limited by total resistance.}"
          : "\\\\text{Parallel: All bulbs bright because each has full voltage.}",
        answer: "circuit_built",
        baselContext: baselScenarios.christmas_lights.en
      });
    }
    
    // 5 troubleshooting quests
    const faults: FaultType[] = ["BROKEN_WIRE", "DEAD_BATTERY", "BURNED_BULB", "OPEN_SWITCH", "BROKEN_WIRE"];
    for (let i = 11; i <= 15; i++) {
      const fault = faults[i - 11];
      quests.push({
        id: `TROUBLESHOOT_ADVANCED_${i}`,
        difficulty: "ADVANCED",
        stage: "CIRCUITS",
        type: "TROUBLESHOOT",
        fault: fault,
        faultyCircuit: {
          components: [
            { id: "battery1", type: "BATTERY", position: { x: 100, y: 200 }, properties: { voltage: fault === "DEAD_BATTERY" ? 0 : 9 } },
            { id: "bulb1", type: "BULB", position: { x: 300, y: 200 }, properties: { resistance: fault === "BURNED_BULB" ? Infinity : 10 } },
            { id: "switch1", type: "SWITCH", position: { x: 200, y: 100 }, properties: { state: fault === "OPEN_SWITCH" ? "OPEN" : "CLOSED" } },
          ],
          connections: fault === "BROKEN_WIRE" ? [] : [
            { from: "battery1", to: "switch1", fromTerminal: "POSITIVE", toTerminal: "TERMINAL_A" },
            { from: "switch1", to: "bulb1", fromTerminal: "TERMINAL_B", toTerminal: "TERMINAL_A" },
            { from: "bulb1", to: "battery1", fromTerminal: "TERMINAL_B", toTerminal: "NEGATIVE" }
          ]
        },
        promptLatex: promptText(t, "troubleshoot_not_working"),
        expressionLatex: "",
        targetLatex: "fault",
        slots: [{
          id: "fault",
          labelLatex: "Fault Type",
          placeholder: t("sp2_01.placeholders.identify_fault"),
          expected: fault
        }],
        correctLatex: `\\\\text{Fault: ${fault.replace(/_/g, " ")}}`,
        answer: fault,
        baselContext: baselScenarios.school_lab.en,
        hints: [
          "Check if all components are connected properly.",
          "Test each component individually.",
          `The problem is: ${fault.replace(/_/g, " ").toLowerCase()}`
        ]
      });
    }
    
    return quests;
  }
  
  // ELITE Difficulty - Complex design challenges (5 quests)
  if (difficulty === "ELITE") {
    const quests: SP201Quest[] = [];
    
    // Quest 1: Two switches controlling one bulb (staircase lighting)
    quests.push({
      id: "DESIGN_ELITE_1",
      difficulty: "ELITE",
      stage: "CIRCUITS",
      type: "DESIGN",
      designRequirements: [
        "Use 1 battery, 1 bulb, and 2 switches",
        "Either switch should be able to turn the bulb on or off",
        "This is called a two-way switch circuit (staircase lighting)"
      ],
      promptLatex: promptText(t, "design_two_switches_one_bulb"),
      expressionLatex: "",
      targetLatex: "circuit",
      slots: [],
      correctLatex: "\\\\text{Two-way switch circuit complete! Test both switches.}",
      answer: "circuit_designed",
      baselContext: baselScenarios.sbb_station.en,
      hints: [
        "Think about how staircase lights work - you can turn them on/off from either floor.",
        "You need to wire the switches in a special configuration.",
        "This is called a SPDT (Single Pole Double Throw) switch circuit."
      ]
    });
    
    // Quest 2: Three bulbs with independent control
    quests.push({
      id: "DESIGN_ELITE_2",
      difficulty: "ELITE",
      stage: "CIRCUITS",
      type: "DESIGN",
      designRequirements: [
        "Use 1 battery, 3 bulbs, and 3 switches",
        "Each switch should control only its own bulb",
        "Other bulbs should not be affected"
      ],
      promptLatex: promptText(t, "design_three_bulbs_independent"),
      expressionLatex: "",
      targetLatex: "circuit",
      slots: [],
      correctLatex: "\\\\text{Independent control circuit complete! Test each switch separately.}",
      answer: "circuit_designed",
      baselContext: baselScenarios.sbb_station.en
    });
    
    // Quest 3: Optimize component count
    quests.push({
      id: "DESIGN_ELITE_3",
      difficulty: "ELITE",
      stage: "CIRCUITS",
      type: "DESIGN",
      designRequirements: [
        "Light up 4 bulbs using minimum components",
        "All bulbs should be at full brightness",
        "Minimize wire length and component count"
      ],
      promptLatex: promptText(t, "design_efficient_four_bulbs"),
      expressionLatex: "",
      targetLatex: "circuit",
      slots: [],
      correctLatex: "\\\\text{Efficient parallel circuit! All bulbs at full brightness with minimal components.}",
      answer: "circuit_designed",
      baselContext: baselScenarios.sbb_station.en
    });
    
    // Quest 4: Emergency backup lighting
    quests.push({
      id: "DESIGN_ELITE_4",
      difficulty: "ELITE",
      stage: "CIRCUITS",
      type: "DESIGN",
      designRequirements: [
        "Use 2 batteries, 2 bulbs",
        "If one battery fails, at least one bulb should still work",
        "Design for redundancy and reliability"
      ],
      promptLatex: promptText(t, "design_emergency_backup"),
      expressionLatex: "",
      targetLatex: "circuit",
      slots: [],
      correctLatex: "\\\\text{Redundant circuit complete! Test by removing one battery.}",
      answer: "circuit_designed",
      baselContext: baselScenarios.sbb_station.en
    });
    
    // Quest 5: Complex mixed circuit
    quests.push({
      id: "DESIGN_ELITE_5",
      difficulty: "ELITE",
      stage: "CIRCUITS",
      type: "DESIGN",
      designRequirements: [
        "Use 1 battery, 4 bulbs, 2 switches",
        "Switch 1 controls bulbs 1 and 2 (in series)",
        "Switch 2 controls bulbs 3 and 4 (in parallel)",
        "Both switch groups should work independently"
      ],
      promptLatex: promptText(t, "design_mixed_series_parallel"),
      expressionLatex: "",
      targetLatex: "circuit",
      slots: [],
      correctLatex: "\\\\text{Complex mixed circuit complete! Test both switches and observe bulb brightness.}",
      answer: "circuit_designed",
      baselContext: baselScenarios.sbb_station.en
    });
    
    return quests;
  }
  
  return [];
}
