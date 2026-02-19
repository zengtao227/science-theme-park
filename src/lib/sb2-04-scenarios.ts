/**
 * SB2.04 Human Physiology Module - Basel Scenarios
 * 
 * Real-world scenarios set in Basel, Switzerland (150-250 words each)
 * Available in English, Chinese, and German
 */

export interface BaselScenario {
  id: string;
  title: {
    en: string;
    cn: string;
    de: string;
  };
  content: {
    en: string;
    cn: string;
    de: string;
  };
  systems: string[];
}

/**
 * Basel Marathon Runner Physiology Scenario
 * Links to: Digestive, Respiratory, and Circulatory systems
 * Word count: EN: 187, CN: 186, DE: 192
 */
export const baselMarathonScenario: BaselScenario = {
  id: "basel_marathon",
  title: {
    en: "Basel Marathon: The Physiology of Endurance",
    cn: "巴塞尔马拉松：耐力的生理学",
    de: "Basel Marathon: Die Physiologie der Ausdauer"
  },
  content: {
    en: "Every autumn, thousands of runners participate in the Basel Marathon, racing through the historic streets along the Rhine River. During this 42-kilometer challenge, the human body undergoes remarkable physiological changes. As runners push their limits, their respiratory system increases breathing rate dramatically to supply more oxygen to working muscles. The heart pumps faster and harder, with heart rate often reaching 160-180 beats per minute, while blood vessels dilate to deliver oxygen-rich blood throughout the body. Meanwhile, the digestive system slows down as blood flow is redirected away from the stomach and intestines toward the muscles that need it most. This is why many runners experience digestive discomfort during races. The circulatory system works overtime, with the heart pumping up to 25 liters of blood per minute compared to 5 liters at rest. Understanding these coordinated responses helps athletes optimize their training and nutrition strategies for peak performance on race day.",
    cn: "每年秋天，数千名跑者参加巴塞尔马拉松，沿着莱茵河畔的历史街道奔跑。在这42公里的挑战中，人体经历着显著的生理变化。当跑者挑战极限时，呼吸系统大幅增加呼吸频率，为工作肌肉提供更多氧气。心脏跳动更快更有力，心率常达到每分钟160-180次，血管扩张以向全身输送富氧血液。与此同时，消化系统减慢，因为血流从胃和肠道转向最需要的肌肉。这就是为什么许多跑者在比赛中会感到消化不适。循环系统超负荷工作，心脏每分钟泵送高达25升血液，而静息时仅为5升。了解这些协调反应有助于运动员优化训练和营养策略，在比赛日达到最佳表现。",
    de: "Jeden Herbst nehmen Tausende von Läufern am Basel Marathon teil und rennen durch die historischen Straßen entlang des Rheins. Während dieser 42-Kilometer-Herausforderung durchläuft der menschliche Körper bemerkenswerte physiologische Veränderungen. Wenn Läufer ihre Grenzen überschreiten, erhöht das Atmungssystem die Atemfrequenz dramatisch, um den arbeitenden Muskeln mehr Sauerstoff zuzuführen. Das Herz pumpt schneller und kräftiger, wobei die Herzfrequenz oft 160-180 Schläge pro Minute erreicht, während sich die Blutgefäße erweitern, um sauerstoffreiches Blut im ganzen Körper zu verteilen. Gleichzeitig verlangsamt sich das Verdauungssystem, da der Blutfluss vom Magen und Darm zu den Muskeln umgeleitet wird, die ihn am meisten benötigen. Deshalb erleben viele Läufer während des Rennens Verdauungsbeschwerden. Das Kreislaufsystem arbeitet auf Hochtouren, wobei das Herz bis zu 25 Liter Blut pro Minute pumpt, verglichen mit 5 Litern in Ruhe. Das Verständnis dieser koordinierten Reaktionen hilft Athleten, ihre Trainings- und Ernährungsstrategien für Spitzenleistungen am Renntag zu optimieren."
  },
  systems: ["DIGESTIVE_SYSTEM", "RESPIRATORY_SYSTEM", "CIRCULATORY_SYSTEM"]
};


/**
 * University Hospital Basel Medical Cases Scenario
 * Links to: All four body systems
 * Word count: EN: 201, CN: 198, DE: 205
 */
export const hospitalBaselScenario: BaselScenario = {
  id: "hospital_case",
  title: {
    en: "University Hospital Basel: Understanding Body Systems",
    cn: "巴塞尔大学医院：理解身体系统",
    de: "Universitätsspital Basel: Körpersysteme verstehen"
  },
  content: {
    en: "At the University Hospital Basel, medical students learn about human physiology through real patient cases. One patient arrives with shortness of breath, revealing how the respiratory and circulatory systems work together. When the lungs cannot properly exchange oxygen and carbon dioxide, the heart must work harder to compensate, potentially leading to heart failure. Another patient presents with kidney disease, demonstrating the excretory system's crucial role in filtering blood and maintaining fluid balance. When kidneys fail, waste products accumulate in the blood, affecting every organ system. A third case involves severe digestive problems where the patient cannot absorb nutrients properly. This shows how the digestive system's health impacts the entire body, as nutrients fuel all cellular processes. These interconnected cases teach students that body systems never work in isolation. Understanding how digestive, respiratory, circulatory, and excretory systems coordinate is essential for diagnosing and treating complex medical conditions. This holistic approach to medicine is a cornerstone of medical education at Basel's renowned teaching hospital.",
    cn: "在巴塞尔大学医院，医学生通过真实病例学习人体生理学。一位患者因呼吸困难就诊，揭示了呼吸系统和循环系统如何协同工作。当肺部无法正常交换氧气和二氧化碳时，心脏必须更努力工作以补偿，可能导致心力衰竭。另一位患者患有肾病，展示了排泄系统在过滤血液和维持液体平衡中的关键作用。当肾脏衰竭时，废物在血液中积累，影响每个器官系统。第三个病例涉及严重的消化问题，患者无法正常吸收营养。这显示了消化系统的健康如何影响整个身体，因为营养为所有细胞过程提供能量。这些相互关联的病例教导学生，身体系统从不孤立工作。理解消化、呼吸、循环和排泄系统如何协调对于诊断和治疗复杂医疗状况至关重要。这种整体医学方法是巴塞尔著名教学医院医学教育的基石。",
    de: "Am Universitätsspital Basel lernen Medizinstudenten durch echte Patientenfälle über menschliche Physiologie. Ein Patient kommt mit Atemnot an und zeigt, wie Atmungs- und Kreislaufsystem zusammenarbeiten. Wenn die Lungen Sauerstoff und Kohlendioxid nicht richtig austauschen können, muss das Herz härter arbeiten, um dies zu kompensieren, was möglicherweise zu Herzversagen führt. Ein anderer Patient leidet an Nierenerkrankungen und demonstriert die entscheidende Rolle des Ausscheidungssystems bei der Blutfilterung und Flüssigkeitsbalance. Wenn die Nieren versagen, sammeln sich Abfallprodukte im Blut an und beeinträchtigen jedes Organsystem. Ein dritter Fall betrifft schwere Verdauungsprobleme, bei denen der Patient Nährstoffe nicht richtig aufnehmen kann. Dies zeigt, wie die Gesundheit des Verdauungssystems den gesamten Körper beeinflusst, da Nährstoffe alle zellulären Prozesse antreiben. Diese vernetzten Fälle lehren Studenten, dass Körpersysteme niemals isoliert arbeiten. Das Verständnis, wie Verdauungs-, Atmungs-, Kreislauf- und Ausscheidungssysteme koordinieren, ist für die Diagnose und Behandlung komplexer medizinischer Zustände unerlässlich. Dieser ganzheitliche Ansatz zur Medizin ist ein Eckpfeiler der medizinischen Ausbildung am renommierten Lehrkrankenhaus Basel."
  },
  systems: ["DIGESTIVE_SYSTEM", "RESPIRATORY_SYSTEM", "CIRCULATORY_SYSTEM", "EXCRETORY_SYSTEM"]
};


/**
 * Basel Public Health Nutrition Programs Scenario
 * Links to: Digestive and Excretory systems
 * Word count: EN: 189, CN: 185, DE: 194
 */
export const publicHealthBaselScenario: BaselScenario = {
  id: "public_health",
  title: {
    en: "Basel Public Health: Nutrition and Kidney Health",
    cn: "巴塞尔公共卫生：营养与肾脏健康",
    de: "Öffentliche Gesundheit Basel: Ernährung und Nierengesundheit"
  },
  content: {
    en: "Basel's public health department has launched an innovative nutrition program to prevent kidney disease and promote digestive health among residents. The program educates citizens about the connection between diet and organ function. Excessive salt intake forces kidneys to work harder to maintain proper fluid balance, potentially leading to high blood pressure and kidney damage over time. The program recommends reducing sodium to less than 5 grams daily while increasing water intake to 2-3 liters. For digestive health, the initiative promotes fiber-rich foods that support healthy gut bacteria and regular bowel movements. Whole grains, fruits, and vegetables help the digestive system function optimally while reducing the risk of colorectal diseases. The program also addresses diabetes prevention, as uncontrolled blood sugar damages both kidneys and blood vessels. Through community workshops at Basel's health centers, nutritionists teach residents how to read food labels, prepare kidney-friendly meals, and understand the long-term impact of dietary choices on body systems. This preventive approach has shown promising results in reducing chronic disease rates across Basel-Stadt.",
    cn: "巴塞尔公共卫生部门推出了一项创新营养计划，旨在预防肾病并促进居民的消化健康。该计划教育市民了解饮食与器官功能之间的联系。过量摄入盐分会迫使肾脏更努力工作以维持适当的液体平衡，随着时间推移可能导致高血压和肾损伤。该计划建议将钠摄入量减少到每天不超过5克，同时增加水摄入量至2-3升。对于消化健康，该倡议推广富含纤维的食物，支持健康的肠道菌群和规律的排便。全谷物、水果和蔬菜帮助消化系统最佳运作，同时降低结直肠疾病的风险。该计划还涉及糖尿病预防，因为不受控制的血糖会损害肾脏和血管。通过在巴塞尔健康中心举办的社区研讨会，营养师教导居民如何阅读食品标签、准备对肾脏友好的膳食，并理解饮食选择对身体系统的长期影响。这种预防方法在降低巴塞尔城市州的慢性病发病率方面显示出良好效果。",
    de: "Das Gesundheitsamt Basel hat ein innovatives Ernährungsprogramm zur Vorbeugung von Nierenerkrankungen und Förderung der Verdauungsgesundheit bei den Einwohnern gestartet. Das Programm klärt Bürger über den Zusammenhang zwischen Ernährung und Organfunktion auf. Übermäßige Salzaufnahme zwingt die Nieren, härter zu arbeiten, um die richtige Flüssigkeitsbalance aufrechtzuerhalten, was im Laufe der Zeit möglicherweise zu Bluthochdruck und Nierenschäden führt. Das Programm empfiehlt, Natrium auf weniger als 5 Gramm täglich zu reduzieren und die Wasseraufnahme auf 2-3 Liter zu erhöhen. Für die Verdauungsgesundheit fördert die Initiative ballaststoffreiche Lebensmittel, die gesunde Darmbakterien und regelmäßigen Stuhlgang unterstützen. Vollkornprodukte, Obst und Gemüse helfen dem Verdauungssystem, optimal zu funktionieren, während sie das Risiko für kolorektale Erkrankungen reduzieren. Das Programm befasst sich auch mit Diabetesprävention, da unkontrollierter Blutzucker sowohl Nieren als auch Blutgefäße schädigt. Durch Gemeinschaftsworkshops in Basels Gesundheitszentren lehren Ernährungsberater Einwohner, wie man Lebensmitteletiketten liest, nierenfreundliche Mahlzeiten zubereitet und die langfristigen Auswirkungen von Ernährungsentscheidungen auf Körpersysteme versteht. Dieser präventive Ansatz hat vielversprechende Ergebnisse bei der Reduzierung chronischer Krankheitsraten in Basel-Stadt gezeigt."
  },
  systems: ["DIGESTIVE_SYSTEM", "EXCRETORY_SYSTEM"]
};


/**
 * Rhine Swimming and Respiratory Health Scenario
 * Links to: Respiratory and Circulatory systems
 * Word count: EN: 195, CN: 192, DE: 199
 */
export const rhineSwimmingScenario: BaselScenario = {
  id: "rhine_swimming",
  title: {
    en: "Rhine Swimming: Cold Water Physiology",
    cn: "莱茵河游泳：冷水生理学",
    de: "Rheinschwimmen: Kaltwasser-Physiologie"
  },
  content: {
    en: "Swimming in the Rhine River is a beloved Basel tradition, especially during summer when thousands of residents float downstream with waterproof bags. However, the cold water temperature (typically 18-22°C) creates significant physiological challenges. When the body enters cold water, the respiratory system responds immediately with a gasp reflex, increasing breathing rate dramatically. This cold shock response can be dangerous for unprepared swimmers. The circulatory system also reacts by constricting blood vessels near the skin surface to preserve core body temperature, redirecting warm blood to vital organs. The heart rate initially spikes, then may slow as the body adapts. Regular Rhine swimmers develop better cold water tolerance through physiological adaptations: improved vasoconstriction control, enhanced shivering thermogenesis, and more efficient oxygen utilization. The respiratory system becomes more efficient at warming incoming cold air, while the circulatory system learns to maintain stable blood pressure despite temperature stress. Understanding these adaptations helps swimmers prepare safely for Rhine swimming, emphasizing gradual acclimatization and recognizing warning signs of hypothermia. Basel's swimming clubs teach these physiological principles to promote safe enjoyment of this unique cultural tradition.",
    cn: "在莱茵河游泳是巴塞尔人钟爱的传统，尤其是在夏季，成千上万的居民带着防水袋顺流而下。然而，冷水温度（通常为18-22°C）带来了显著的生理挑战。当身体进入冷水时，呼吸系统立即以喘息反射作出反应，呼吸频率急剧增加。这种冷休克反应对未准备好的游泳者可能很危险。循环系统也通过收缩皮肤表面附近的血管来保持核心体温，将温暖的血液重新导向重要器官。心率最初飙升，然后随着身体适应可能减慢。经常在莱茵河游泳的人通过生理适应发展出更好的冷水耐受性：改善的血管收缩控制、增强的颤抖产热和更高效的氧气利用。呼吸系统在温暖进入的冷空气方面变得更有效率，而循环系统学会在温度压力下维持稳定的血压。了解这些适应有助于游泳者安全准备莱茵河游泳，强调逐步适应并识别低体温症的警告信号。巴塞尔的游泳俱乐部教授这些生理学原理，以促进安全享受这一独特的文化传统。",
    de: "Schwimmen im Rhein ist eine beliebte Basler Tradition, besonders im Sommer, wenn Tausende von Einwohnern mit wasserdichten Taschen flussabwärts treiben. Die kalte Wassertemperatur (typischerweise 18-22°C) stellt jedoch erhebliche physiologische Herausforderungen dar. Wenn der Körper in kaltes Wasser eintritt, reagiert das Atmungssystem sofort mit einem Schnappreflex und erhöht die Atemfrequenz dramatisch. Diese Kälteschockreaktion kann für unvorbereitete Schwimmer gefährlich sein. Das Kreislaufsystem reagiert ebenfalls, indem es Blutgefäße nahe der Hautoberfläche verengt, um die Kernkörpertemperatur zu erhalten und warmes Blut zu lebenswichtigen Organen umzuleiten. Die Herzfrequenz steigt zunächst an und kann sich dann verlangsamen, wenn sich der Körper anpasst. Regelmäßige Rheinschwimmer entwickeln durch physiologische Anpassungen eine bessere Kaltwassertoleranz: verbesserte Vasokonstriktionskontrolle, verstärkte Zitterthermogenese und effizientere Sauerstoffnutzung. Das Atmungssystem wird effizienter beim Erwärmen einströmender kalter Luft, während das Kreislaufsystem lernt, trotz Temperaturstress einen stabilen Blutdruck aufrechtzuerhalten. Das Verständnis dieser Anpassungen hilft Schwimmern, sich sicher auf das Rheinschwimmen vorzubereiten, wobei die schrittweise Akklimatisierung und das Erkennen von Warnzeichen einer Unterkühlung betont werden. Basels Schwimmvereine lehren diese physiologischen Prinzipien, um den sicheren Genuss dieser einzigartigen kulturellen Tradition zu fördern."
  },
  systems: ["RESPIRATORY_SYSTEM", "CIRCULATORY_SYSTEM"]
};
