/**
 * GP2.03 Gas Laws Module - Basel-Specific Scenarios
 * 
 * Real-world applications of gas laws in Basel contexts.
 * Each scenario is 150-250 words.
 */

import type { Scenario, LocalizedString } from "./gp2-03-types";

const L = (en: string, cn: string = en, de: string = en): LocalizedString => ({
  en,
  cn,
  de,
});

export const BASEL_SCENARIOS: Scenario[] = [
  {
    id: "scenario-chemical-industry",
    title: L(
      "Chemical Industry Gas Storage",
      "化学工业气体储存",
      "Chemische Industrie Gasspeicherung"
    ),
    description: L(
      "Basel is home to major pharmaceutical companies like Roche and Novartis, where precise gas handling is critical for chemical synthesis. In their production facilities, compressed gases are stored in high-pressure cylinders at pressures up to 20 MPa (200 bar). Understanding Boyle's Law is essential for safely transferring gases between containers. When a gas is transferred from a high-pressure storage tank to a reaction vessel, the volume increases dramatically as pressure decreases. Engineers must calculate the exact volumes to ensure proper dosing of reactants. The ideal gas equation PV=nRT helps determine how many moles of gas are needed for a reaction at specific temperature and pressure conditions. Temperature control is crucial—Charles's Law shows that heating a sealed container increases pressure, which could lead to dangerous ruptures. Basel's chemical facilities use sophisticated monitoring systems to track pressure, temperature, and volume in real-time, ensuring both safety and precision in pharmaceutical manufacturing. These principles are fundamental to producing the medications that improve lives worldwide.",
      "巴塞尔是罗氏和诺华等大型制药公司的所在地，精确的气体处理对化学合成至关重要。在他们的生产设施中，压缩气体储存在高达20 MPa（200 bar）的高压钢瓶中。理解波义耳定律对于在容器之间安全转移气体至关重要。当气体从高压储罐转移到反应容器时，随着压力降低，体积会急剧增加。工程师必须计算精确的体积以确保反应物的正确剂量。理想气体方程PV=nRT有助于确定在特定温度和压力条件下反应所需的气体摩尔数。温度控制至关重要——查理定律表明加热密封容器会增加压力，这可能导致危险的破裂。巴塞尔的化学设施使用复杂的监控系统实时跟踪压力、温度和体积，确保制药生产的安全性和精确性。这些原理是生产改善全球生命的药物的基础。",
      "Basel ist die Heimat großer Pharmaunternehmen wie Roche und Novartis, wo präzise Gashandhabung für die chemische Synthese entscheidend ist. In ihren Produktionsanlagen werden komprimierte Gase in Hochdruckzylindern bei Drücken bis zu 20 MPa (200 bar) gelagert. Das Verständnis des Boyle-Gesetzes ist für den sicheren Transfer von Gasen zwischen Behältern unerlässlich. Wenn ein Gas von einem Hochdruckspeichertank in ein Reaktionsgefäß übertragen wird, nimmt das Volumen dramatisch zu, wenn der Druck abnimmt. Ingenieure müssen die genauen Volumina berechnen, um eine ordnungsgemäße Dosierung der Reaktanten sicherzustellen. Die ideale Gasgleichung PV=nRT hilft zu bestimmen, wie viele Mol Gas für eine Reaktion bei bestimmten Temperatur- und Druckbedingungen benötigt werden. Temperaturkontrolle ist entscheidend—das Charles-Gesetz zeigt, dass das Erhitzen eines versiegelten Behälters den Druck erhöht, was zu gefährlichen Brüchen führen könnte. Basels chemische Anlagen verwenden ausgeklügelte Überwachungssysteme, um Druck, Temperatur und Volumen in Echtzeit zu verfolgen und sowohl Sicherheit als auch Präzision in der pharmazeutischen Herstellung zu gewährleisten."
    ),
    location: {
      name: L("Roche & Novartis Facilities, Basel", "罗氏和诺华设施，巴塞尔", "Roche & Novartis Anlagen, Basel"),
      coordinates: { lat: 47.5596, lng: 7.5886 },
      description: L("Major pharmaceutical production facilities", "主要制药生产设施", "Große pharmazeutische Produktionsanlagen"),
    },
    relatedConcepts: ["boyle", "ideal-gas", "pressure-safety"],
  },
  {
    id: "scenario-hot-air-balloon",
    title: L(
      "Basel Hot Air Balloon Festival",
      "巴塞尔热气球节",
      "Basler Heißluftballonfestival"
    ),
    description: L(
      "Every summer, colorful hot air balloons grace the skies above Basel during the regional balloon festival. These magnificent aircraft demonstrate Charles's Law in action. A typical balloon envelope holds about 2,800 cubic meters of air. On the ground at 20°C (293 K), the air inside is heated to approximately 100°C (373 K) using propane burners. According to Charles's Law, V_1/T_1 = V_2/T_2, the volume would increase by about 27% if the envelope could expand—but since the envelope is fixed, the air density decreases instead, creating buoyancy. The heated air inside becomes less dense than the cooler surrounding air, generating lift. Pilots must carefully control the temperature to maintain altitude: heating the air causes ascent, while allowing it to cool results in descent. The ideal gas equation helps calculate the mass of air that must be displaced to lift the balloon's total weight, including basket, passengers, and equipment. Basel's balloon pilots must also account for atmospheric pressure changes with altitude and temperature variations throughout the day. Understanding these gas laws is essential for safe and controlled flight over Basel's beautiful Rhine valley.",
      "每年夏天，在地区气球节期间，五颜六色的热气球装点着巴塞尔上空。这些壮观的飞行器展示了查理定律的实际应用。典型的气球外壳容纳约2,800立方米的空气。在地面20°C（293 K）时，使用丙烷燃烧器将内部空气加热到约100°C（373 K）。根据查理定律V_1/T_1 = V_2/T_2，如果外壳可以膨胀，体积将增加约27%——但由于外壳是固定的，空气密度反而降低，产生浮力。内部加热的空气密度低于周围较冷的空气，产生升力。飞行员必须仔细控制温度以保持高度：加热空气导致上升，而让其冷却则导致下降。理想气体方程有助于计算必须排出的空气质量以提升气球的总重量，包括吊篮、乘客和设备。巴塞尔的气球飞行员还必须考虑随高度变化的大气压力和全天的温度变化。理解这些气体定律对于在巴塞尔美丽的莱茵河谷上空安全和受控飞行至关重要。",
      "Jeden Sommer schmücken bunte Heißluftballons den Himmel über Basel während des regionalen Ballonfestivals. Diese prächtigen Luftfahrzeuge demonstrieren das Charles-Gesetz in Aktion. Eine typische Ballonhülle fasst etwa 2.800 Kubikmeter Luft. Am Boden bei 20°C (293 K) wird die Luft im Inneren mit Propanbrennern auf etwa 100°C (373 K) erhitzt. Nach dem Charles-Gesetz V_1/T_1 = V_2/T_2 würde das Volumen um etwa 27% zunehmen, wenn sich die Hülle ausdehnen könnte—aber da die Hülle fest ist, nimmt stattdessen die Luftdichte ab und erzeugt Auftrieb. Die erhitzte Luft im Inneren wird weniger dicht als die kühlere Umgebungsluft und erzeugt Auftrieb. Piloten müssen die Temperatur sorgfältig kontrollieren, um die Höhe zu halten: Das Erhitzen der Luft verursacht Aufstieg, während das Abkühlen zu Abstieg führt. Die ideale Gasgleichung hilft, die Masse der Luft zu berechnen, die verdrängt werden muss, um das Gesamtgewicht des Ballons einschließlich Korb, Passagiere und Ausrüstung zu heben."
    ),
    location: {
      name: L("Basel Rhine Valley", "巴塞尔莱茵河谷", "Basler Rheintal"),
      coordinates: { lat: 47.5584, lng: 7.5733 },
      description: L("Popular hot air balloon launch site", "热门热气球发射场", "Beliebter Heißluftballon-Startplatz"),
    },
    relatedConcepts: ["charles", "density", "buoyancy"],
  },
  {
    id: "scenario-university-lab",
    title: L(
      "University of Basel Chemistry Laboratory",
      "巴塞尔大学化学实验室",
      "Universität Basel Chemielabor"
    ),
    description: L(
      "In the chemistry laboratories at the University of Basel, students conduct experiments that bring gas laws to life. A classic experiment involves collecting hydrogen gas over water through electrolysis. When hydrogen bubbles rise through water and collect in an inverted graduated cylinder, students must apply Dalton's Law of Partial Pressures to calculate the actual amount of hydrogen produced. The total pressure in the collection cylinder equals atmospheric pressure (typically 101.3 kPa in Basel), but this includes both hydrogen gas and water vapor. At 25°C, water vapor pressure is about 3.2 kPa, so the hydrogen partial pressure is 101.3 - 3.2 = 98.1 kPa. Students then use the ideal gas equation to calculate moles of hydrogen: n = PV/RT. Another popular experiment demonstrates Avogadro's Law by showing that equal volumes of different gases at the same temperature and pressure contain equal numbers of molecules. These hands-on experiments help students understand that gas laws aren't just abstract equations—they're practical tools for real chemical analysis. The university's modern facilities allow precise measurements of pressure, volume, and temperature, enabling students to verify theoretical predictions with actual experimental data.",
      "在巴塞尔大学的化学实验室中，学生进行实验，使气体定律变得生动。一个经典实验涉及通过电解在水上收集氢气。当氢气泡通过水上升并收集在倒置的量筒中时，学生必须应用道尔顿分压定律来计算实际产生的氢气量。收集筒中的总压力等于大气压（巴塞尔通常为101.3 kPa），但这包括氢气和水蒸气。在25°C时，水蒸气压约为3.2 kPa，因此氢气分压为101.3 - 3.2 = 98.1 kPa。然后学生使用理想气体方程计算氢气的摩尔数：n = PV/RT。另一个流行的实验通过显示在相同温度和压力下不同气体的相等体积包含相等数量的分子来演示阿伏伽德罗定律。这些实践实验帮助学生理解气体定律不仅仅是抽象方程——它们是真实化学分析的实用工具。",
      "In den Chemielaboren der Universität Basel führen Studenten Experimente durch, die Gasgesetze zum Leben erwecken. Ein klassisches Experiment beinhaltet das Sammeln von Wasserstoffgas über Wasser durch Elektrolyse. Wenn Wasserstoffblasen durch Wasser aufsteigen und sich in einem umgekehrten Messzylinder sammeln, müssen Studenten das Daltonsche Gesetz der Partialdrücke anwenden, um die tatsächliche Menge des produzierten Wasserstoffs zu berechnen. Der Gesamtdruck im Sammelzylinder entspricht dem atmosphärischen Druck (typischerweise 101,3 kPa in Basel), aber dies umfasst sowohl Wasserstoffgas als auch Wasserdampf. Bei 25°C beträgt der Wasserdampfdruck etwa 3,2 kPa, sodass der Wasserstoffpartialdruck 101,3 - 3,2 = 98,1 kPa beträgt. Die Studenten verwenden dann die ideale Gasgleichung, um Mol Wasserstoff zu berechnen: n = PV/RT."
    ),
    location: {
      name: L("University of Basel, Department of Chemistry", "巴塞尔大学化学系", "Universität Basel, Departement Chemie"),
      coordinates: { lat: 47.5584, lng: 7.5845 },
      description: L("Teaching and research laboratories", "教学和研究实验室", "Lehr- und Forschungslabore"),
    },
    relatedConcepts: ["dalton", "partial-pressure", "avogadro"],
  },
  {
    id: "scenario-rhine-atmosphere",
    title: L(
      "Rhine River Atmospheric Variations",
      "莱茵河大气变化",
      "Rhein Atmosphärische Variationen"
    ),
    description: L(
      "The Rhine River flowing through Basel creates unique microclimates that demonstrate gas behavior in Earth's atmosphere. On cool mornings, fog often forms over the river as water vapor condenses when air temperature drops below the dew point. This phenomenon involves gas mixtures and partial pressures: the air contains nitrogen, oxygen, argon, carbon dioxide, and water vapor, each contributing its partial pressure according to Dalton's Law. As temperature decreases overnight (Charles's Law), the air's capacity to hold water vapor decreases, causing condensation. The atmospheric pressure at Basel's elevation (260 meters above sea level) is approximately 98.5 kPa, slightly lower than sea-level pressure of 101.3 kPa. This pressure difference affects gas behavior—water boils at a slightly lower temperature, and the ideal gas equation shows that a given mass of gas occupies slightly more volume at this altitude. Weather balloons launched from Basel's meteorological station measure temperature, pressure, and humidity at various altitudes, providing data that helps meteorologists predict weather patterns. Understanding how gas mixtures behave under changing temperature and pressure conditions is essential for accurate weather forecasting in the Basel region.",
      "流经巴塞尔的莱茵河创造了独特的微气候，展示了地球大气中的气体行为。在凉爽的早晨，当气温降至露点以下时，水蒸气凝结，河面上经常形成雾。这种现象涉及气体混合物和分压：空气包含氮气、氧气、氩气、二氧化碳和水蒸气，每种气体根据道尔顿定律贡献其分压。随着夜间温度降低（查理定律），空气保持水蒸气的能力降低，导致凝结。巴塞尔海拔（海拔260米）的大气压约为98.5 kPa，略低于海平面压力101.3 kPa。这种压力差异影响气体行为——水在稍低的温度下沸腾，理想气体方程显示在这个高度，给定质量的气体占据稍大的体积。",
      "Der durch Basel fließende Rhein schafft einzigartige Mikroklimata, die das Gasverhalten in der Erdatmosphäre demonstrieren. An kühlen Morgen bildet sich oft Nebel über dem Fluss, wenn Wasserdampf kondensiert, wenn die Lufttemperatur unter den Taupunkt fällt. Dieses Phänomen beinhaltet Gasmischungen und Partialdrücke: Die Luft enthält Stickstoff, Sauerstoff, Argon, Kohlendioxid und Wasserdampf, die jeweils ihren Partialdruck gemäß dem Daltonschen Gesetz beitragen. Wenn die Temperatur über Nacht sinkt (Charles-Gesetz), nimmt die Fähigkeit der Luft, Wasserdampf zu halten, ab, was zu Kondensation führt. Der atmosphärische Druck in Basels Höhe (260 Meter über dem Meeresspiegel) beträgt etwa 98,5 kPa, etwas niedriger als der Meeresspiegel-Druck von 101,3 kPa."
    ),
    location: {
      name: L("Rhine River, Basel", "莱茵河，巴塞尔", "Rhein, Basel"),
      coordinates: { lat: 47.5606, lng: 7.5881 },
      description: L("River creating local microclimates", "创造局部微气候的河流", "Fluss, der lokale Mikroklimata schafft"),
    },
    relatedConcepts: ["partial-pressure", "temperature", "altitude"],
  },
];
