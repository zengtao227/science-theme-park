/**
 * SP1.02 Newton's Laws Module - Basel Scenario Data
 * 4 scenarios: Tram, Rhine Boat, Fasnacht, SBB Station
 */

import { BaselScenario } from "./sp1-02-types";

export const baselScenarios: BaselScenario[] = [
  {
    id: "tram_acceleration",
    stage: "SECOND_LAW",
    title: {
      en: "Basel Tram Acceleration and Braking",
      cn: "巴塞尔有轨电车加速与制动",
      de: "Basel Tram Beschleunigung und Bremsen",
    },
    description: {
      en: "Basel's iconic green trams navigate the city's streets, demonstrating Newton's Second Law in action. At Barfüsserplatz, a tram with mass 10,000 kg accelerates from rest to reach cruising speed. The electric motors apply a forward force of 15,000 N while friction and air resistance provide 3,000 N of opposing force. Using F=ma, we calculate the net force (12,000 N) produces an acceleration of 1.2 m/s². When approaching the next stop, the driver applies brakes generating -10,000 N, combined with -3,000 N friction, creating -13,000 N net force and -1.3 m/s² deceleration. This daily dance of forces and motion keeps Basel's public transport running smoothly, illustrating how mass and force determine acceleration in real-world transportation systems throughout the city.",
      cn: "巴塞尔标志性的绿色有轨电车穿梭于城市街道，展示了牛顿第二定律的实际应用。在Barfüsserplatz，一辆质量为10,000公斤的电车从静止开始加速至巡航速度。电动机施加15,000牛顿的向前力，而摩擦力和空气阻力提供3,000牛顿的反向力。使用F=ma，我们计算净力（12,000牛顿）产生1.2米/秒²的加速度。当接近下一站时，司机施加制动产生-10,000牛顿，加上-3,000牛顿摩擦力，产生-13,000牛顿净力和-1.3米/秒²的减速度。这种力与运动的日常舞蹈使巴塞尔的公共交通顺畅运行，说明了质量和力如何决定整个城市交通系统中的加速度。",
      de: "Basels ikonische grüne Trams navigieren durch die Straßen der Stadt und demonstrieren Newtons Zweites Gesetz in Aktion. Am Barfüsserplatz beschleunigt eine Tram mit einer Masse von 10.000 kg aus dem Stillstand, um Reisegeschwindigkeit zu erreichen. Die Elektromotoren erzeugen eine Vorwärtskraft von 15.000 N, während Reibung und Luftwiderstand 3.000 N Gegenkraft liefern. Mit F=ma berechnen wir, dass die Nettokraft (12.000 N) eine Beschleunigung von 1,2 m/s² erzeugt. Beim Annähern an die nächste Haltestelle betätigt der Fahrer die Bremsen mit -10.000 N, kombiniert mit -3.000 N Reibung, was -13.000 N Nettokraft und -1,3 m/s² Verzögerung erzeugt. Dieser tägliche Tanz von Kräften und Bewegung hält Basels öffentlichen Verkehr am Laufen und veranschaulicht, wie Masse und Kraft die Beschleunigung in realen Transportsystemen in der ganzen Stadt bestimmen.",
    },
    location: "Barfüsserplatz tram stop",
    relatedQuests: ["SECOND_LAW_CORE_1", "SECOND_LAW_ADVANCED_1"],
  },
  {
    id: "rhine_boat",
    stage: "THIRD_LAW",
    title: {
      en: "Rhine River Boat Propulsion",
      cn: "莱茵河船只推进",
      de: "Rhein Schiffspropulsion",
    },
    description: {
      en: "Along Basel's Rhine River near Mittlere Brücke, passenger boats demonstrate Newton's Third Law through their propulsion systems. When a boat's propeller rotates, it pushes water backward with tremendous force—perhaps 3,000 N for a typical Rhine ferry. According to Newton's Third Law, the water simultaneously pushes the boat forward with an equal 3,000 N force in the opposite direction. This action-reaction pair acts on different objects: the propeller acts on the water, while the water acts on the boat. The boat's 1,500 kg mass accelerates forward at 2 m/s² as a result. River currents add complexity, but the fundamental principle remains: every force has an equal and opposite reaction force. This same principle powers everything from swimming to rocket propulsion, making Rhine boat rides an elegant demonstration of Newton's insights into force interactions.",
      cn: "在巴塞尔莱茵河沿岸的Mittlere Brücke附近，客船通过其推进系统展示了牛顿第三定律。当船的螺旋桨旋转时，它以巨大的力向后推水——典型的莱茵河渡轮可能为3,000牛顿。根据牛顿第三定律，水同时以相等的3,000牛顿力向相反方向推动船只。这对作用-反作用力作用于不同的物体：螺旋桨作用于水，而水作用于船。船的1,500公斤质量因此以2米/秒²向前加速。河流流动增加了复杂性，但基本原理保持不变：每个力都有一个大小相等、方向相反的反作用力。这一原理为从游泳到火箭推进的一切提供动力，使莱茵河船只之旅成为牛顿对力相互作用洞察的优雅展示。",
      de: "Entlang des Basler Rheins in der Nähe der Mittleren Brücke demonstrieren Passagierschiffe Newtons Drittes Gesetz durch ihre Antriebssysteme. Wenn sich der Propeller eines Bootes dreht, drückt er das Wasser mit enormer Kraft nach hinten – vielleicht 3.000 N für eine typische Rheinfähre. Gemäß Newtons Drittem Gesetz drückt das Wasser gleichzeitig das Boot mit einer gleichen Kraft von 3.000 N in die entgegengesetzte Richtung nach vorne. Dieses Aktions-Reaktions-Paar wirkt auf verschiedene Objekte: Der Propeller wirkt auf das Wasser, während das Wasser auf das Boot wirkt. Die 1.500 kg Masse des Bootes beschleunigt dadurch mit 2 m/s² nach vorne. Flussströmungen fügen Komplexität hinzu, aber das grundlegende Prinzip bleibt: Jede Kraft hat eine gleiche und entgegengesetzte Reaktionskraft. Dieses Prinzip treibt alles vom Schwimmen bis zum Raketenantrieb an und macht Rheinbootfahrten zu einer eleganten Demonstration von Newtons Einsichten in Kraftwechselwirkungen.",
    },
    location: "Rhine River near Mittlere Brücke",
    relatedQuests: ["THIRD_LAW_CORE_2", "THIRD_LAW_ADVANCED_2"],
  },
  {
    id: "fasnacht_parade",
    stage: "FIRST_LAW",
    title: {
      en: "Basel Fasnacht Parade Float Motion",
      cn: "巴塞尔狂欢节游行花车运动",
      de: "Basel Fasnacht Umzugswagen Bewegung",
    },
    description: {
      en: "During Basel's famous Fasnacht carnival at Marktplatz, elaborately decorated parade floats demonstrate Newton's First Law of inertia. A massive float with 3,000 kg mass sits at rest before the parade begins. Despite its colorful appearance, it stubbornly resists motion—it will remain at rest unless acted upon by an external force. When parade participants push with 2,000 N while friction opposes with 500 N, the net 1,500 N force overcomes inertia and accelerates the float at 0.5 m/s². Once moving at constant velocity through the parade route, if pushers maintain force equal to friction, the float continues at steady speed—demonstrating that objects in motion stay in motion with constant velocity when net force is zero. This centuries-old tradition provides a festive illustration of fundamental physics principles governing motion and inertia.",
      cn: "在巴塞尔著名的Fasnacht狂欢节期间，在Marktplatz，精心装饰的游行花车展示了牛顿第一惯性定律。一个质量为3,000公斤的巨大花车在游行开始前静止不动。尽管外观色彩缤纷，它顽固地抵抗运动——除非受到外力作用，否则它将保持静止。当游行参与者以2,000牛顿推动而摩擦力以500牛顿反对时，净1,500牛顿力克服惯性并以0.5米/秒²加速花车。一旦以恒定速度沿游行路线移动，如果推动者保持与摩擦力相等的力，花车将以稳定速度继续前进——证明当净力为零时，运动中的物体以恒定速度保持运动。这一延续数百年的传统为支配运动和惯性的基本物理原理提供了节日般的说明。",
      de: "Während Basels berühmter Fasnacht am Marktplatz demonstrieren aufwendig dekorierte Umzugswagen Newtons Erstes Gesetz der Trägheit. Ein massiver Wagen mit 3.000 kg Masse ruht vor Beginn des Umzugs. Trotz seines farbenfrohen Aussehens widersteht er hartnäckig der Bewegung – er bleibt in Ruhe, es sei denn, eine äußere Kraft wirkt auf ihn ein. Wenn Umzugsteilnehmer mit 2.000 N schieben, während Reibung mit 500 N entgegenwirkt, überwindet die Nettokraft von 1.500 N die Trägheit und beschleunigt den Wagen mit 0,5 m/s². Sobald er sich mit konstanter Geschwindigkeit durch die Umzugsroute bewegt, fährt der Wagen mit gleichmäßiger Geschwindigkeit weiter, wenn die Schieber eine Kraft gleich der Reibung aufrechterhalten – was zeigt, dass Objekte in Bewegung mit konstanter Geschwindigkeit in Bewegung bleiben, wenn die Nettokraft null ist. Diese jahrhundertealte Tradition bietet eine festliche Illustration grundlegender physikalischer Prinzipien, die Bewegung und Trägheit regeln.",
    },
    location: "Marktplatz during Fasnacht",
    relatedQuests: ["FIRST_LAW_CORE_2", "FIRST_LAW_ADVANCED_2"],
  },
  {
    id: "sbb_station",
    stage: "THIRD_LAW",
    title: {
      en: "Basel SBB Train Station Platform Safety",
      cn: "巴塞尔SBB火车站站台安全",
      de: "Basel SBB Bahnhof Bahnsteigsicherheit",
    },
    description: {
      en: "At Basel SBB, Switzerland's busiest international train station, platform safety relies on understanding Newton's laws of motion. When a 50,000 kg train approaches the platform at 25 m/s, the braking system must apply sufficient force to stop safely. The brake pads press against wheels, generating -10,000 N of braking force, while friction adds another -3,000 N. This -13,000 N net force produces -0.26 m/s² deceleration, bringing the train to rest over 240 meters. Newton's Third Law explains the mechanism: brake pads push on wheels with force F, and wheels push back on brake pads with equal force -F, generating heat and slowing the train. Platform yellow lines mark safe distances, accounting for stopping distances at various speeds. Understanding these force interactions ensures passenger safety as trains arrive and depart, connecting Basel to destinations across Europe through precise application of physics principles.",
      cn: "在巴塞尔SBB，瑞士最繁忙的国际火车站，站台安全依赖于对牛顿运动定律的理解。当一列50,000公斤的火车以25米/秒接近站台时，制动系统必须施加足够的力以安全停止。制动片压在车轮上，产生-10,000牛顿的制动力，而摩擦力增加另外-3,000牛顿。这-13,000牛顿的净力产生-0.26米/秒²的减速度，使火车在240米内停止。牛顿第三定律解释了机制：制动片以力F推动车轮，车轮以相等的力-F推回制动片，产生热量并减慢火车。站台黄线标记安全距离，考虑各种速度下的停止距离。理解这些力相互作用确保乘客安全，因为火车到达和离开，通过精确应用物理原理将巴塞尔连接到整个欧洲的目的地。",
      de: "Am Basel SBB, dem verkehrsreichsten internationalen Bahnhof der Schweiz, hängt die Bahnsteigsicherheit vom Verständnis der Newtonschen Bewegungsgesetze ab. Wenn sich ein 50.000 kg schwerer Zug mit 25 m/s dem Bahnsteig nähert, muss das Bremssystem ausreichend Kraft aufbringen, um sicher anzuhalten. Die Bremsbeläge drücken auf die Räder und erzeugen -10.000 N Bremskraft, während Reibung weitere -3.000 N hinzufügt. Diese Nettokraft von -13.000 N erzeugt eine Verzögerung von -0,26 m/s² und bringt den Zug über 240 Meter zum Stillstand. Newtons Drittes Gesetz erklärt den Mechanismus: Bremsbeläge drücken mit Kraft F auf Räder, und Räder drücken mit gleicher Kraft -F auf Bremsbeläge zurück, erzeugen Wärme und verlangsamen den Zug. Gelbe Linien auf dem Bahnsteig markieren sichere Abstände unter Berücksichtigung der Bremswege bei verschiedenen Geschwindigkeiten. Das Verständnis dieser Kraftwechselwirkungen gewährleistet die Sicherheit der Passagiere, wenn Züge ankommen und abfahren, und verbindet Basel durch präzise Anwendung physikalischer Prinzipien mit Zielen in ganz Europa.",
    },
    location: "Basel SBB main station",
    relatedQuests: ["THIRD_LAW_CORE_4", "THIRD_LAW_ADVANCED_4"],
  },
];
