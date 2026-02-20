/**
 * SC1.06 Chemical Reactions Basics - Quest Data
 * 
 * This file contains all quest data for the three stages:
 * - Reaction Types (20 quests)
 * - Equation Balancing (20 quests)
 * - Reaction Simulation (20 quests)
 * 
 * Total: 60 quests with Basel-specific contexts
 * 
 * Requirements: 1.5, 2.5, 3.4, 7.1-7.4, 8.1-8.7, 11.1-11.7
 */

import { createCompound } from './sc1-06-utils';
import { ReactionType, EnergyChange } from './sc1-06-types';

/**
 * Raw quest data structure for easier data entry
 */
interface RawQuestData {
  id: string;
  reactants: string[];
  products: string[];
  coefficients: number[];
  type: ReactionType;
  energyChange?: EnergyChange;
  baselContext: string;
  baselContextKey?: string; // Added for i18n support
}

// ============================================================================
// REACTION TYPES STAGE - 20 QUESTS
// ============================================================================

/**
 * Reaction Types - BASIC Difficulty (5 quests)
 * Simple synthesis and decomposition reactions
 * Requirements: 1.5, 3.4, 3.6, 7.1, 8.1, 8.2, 8.4
 */
export const reactionTypesBasic: RawQuestData[] = [
  {
    id: "RT_BASIC_1",
    reactants: ["H2", "O2"],
    products: ["H2O"],
    coefficients: [2, 1, 2],
    type: "synthesis",
    baselContext: `At the Basel Water Treatment Plant along the Rhine River, chemistry student Emma observes the formation of water molecules during an electrolysis demonstration. The facility processes 180,000 cubic meters of water daily for Basel's 175,000 residents. Dr. Weber, the plant's chief chemist, explains that while they typically separate water into hydrogen and oxygen for purification testing, the reverse reaction—combining hydrogen and oxygen to form water—releases significant energy. This synthesis reaction is fundamental to understanding fuel cell technology, which Novartis is researching for sustainable energy solutions in their pharmaceutical manufacturing processes. Emma learns that this simple reaction powers the hydrogen fuel cells being tested at Basel University's Chemistry Department for future clean energy applications.`
  },
  {
    id: "RT_BASIC_2",
    reactants: ["H2O"],
    products: ["H2", "O2"],
    coefficients: [2, 2, 1],
    type: "decomposition",
    baselContext: `In the Basel Chemistry Lab at the University of Basel, Professor Müller demonstrates electrolysis to her Sekundarschule class. Using a Hoffman apparatus, she passes electric current through water, decomposing it into hydrogen and oxygen gases. The students watch as bubbles form at the electrodes—twice as much hydrogen as oxygen, matching the 2:1 ratio in water's formula. This decomposition reaction is crucial for producing pure hydrogen gas, which Roche uses in their pharmaceutical synthesis processes. The lab, located in the historic St. Johann district near the Novartis campus, has been teaching chemistry fundamentals for over 150 years. Students learn that this reaction requires energy input (endothermic), unlike the synthesis reaction that releases energy.`
  },
  {
    id: "RT_BASIC_3",
    reactants: ["N2", "O2"],
    products: ["NO"],
    coefficients: [1, 1, 2],
    type: "synthesis",
    baselContext: `At Basel's Environmental Monitoring Station near the Rhine River, technician Marco analyzes air quality data. He explains to visiting students that nitrogen monoxide (NO) forms naturally during thunderstorms when lightning provides enough energy to combine nitrogen and oxygen from the air. This same synthesis reaction occurs in car engines at high temperatures, contributing to Basel's air pollution. The city monitors NO levels carefully, especially near the busy Autobahn A2 that runs through Basel. Novartis and Roche both have strict emission controls to minimize NO production in their facilities. Understanding this synthesis reaction helps students appreciate why Basel invested 45 million Swiss francs in public transportation to reduce vehicle emissions and improve air quality for the city's residents.`
  },
  {
    id: "RT_BASIC_4",
    reactants: ["CaCO3"],
    products: ["CaO", "CO2"],
    coefficients: [1, 1, 1],
    type: "decomposition",
    baselContext: `At the Basel Construction Materials Lab, engineer Sarah demonstrates the decomposition of limestone (calcium carbonate) to produce quicklime (calcium oxide). When heated to 900°C in a kiln, limestone breaks down, releasing carbon dioxide gas. This decomposition reaction is essential for producing cement, which Basel uses extensively in construction projects like the new Roche Tower—Switzerland's tallest building at 178 meters. The lab, located in the Kleinhüningen industrial district, tests materials for Basel's building projects. Sarah explains that this reaction requires significant heat energy, making it endothermic. Students learn that the CO2 released contributes to greenhouse gas emissions, which is why Basel's construction industry is researching more sustainable alternatives for the city's growing infrastructure needs.`
  },
  {
    id: "RT_BASIC_5",
    reactants: ["Mg", "O2"],
    products: ["MgO"],
    coefficients: [2, 1, 2],
    type: "synthesis",
    baselContext: `In the Novartis Research Laboratory in Basel's St. Johann district, chemist Dr. Chen demonstrates the brilliant white light produced when magnesium burns in oxygen. This synthesis reaction forms magnesium oxide and releases intense energy, making it exothermic. The demonstration captivates visiting Sekundarschule students who are learning about reaction types. Dr. Chen explains that magnesium's reactivity makes it useful in pharmaceutical synthesis, where controlled oxidation reactions are crucial. The lab uses this reaction to teach safety protocols—magnesium fires cannot be extinguished with water and require special Class D fire extinguishers. Students learn that understanding synthesis reactions is fundamental to pharmaceutical chemistry, where Novartis synthesizes over 200 different drug compounds annually in their Basel facilities, serving patients worldwide.`
  }
];

/**
 * Reaction Types - CORE Difficulty (5 quests)
 * Single and double replacement reactions
 * Requirements: 3.4, 3.7, 7.2, 8.1, 8.2, 8.4
 */
export const reactionTypesCore: RawQuestData[] = [
  {
    id: "RT_CORE_1",
    reactants: ["Zn", "HCl"],
    products: ["ZnCl2", "H2"],
    coefficients: [1, 2, 1, 1],
    type: "single_replacement",
    baselContext: `At the Novartis Metal Reactivity Laboratory, researcher Dr. Hoffmann demonstrates single replacement reactions to chemistry students. When zinc metal is added to hydrochloric acid, vigorous bubbling occurs as hydrogen gas is released and zinc chloride forms in solution. This reaction is crucial for understanding metal reactivity series, which guides pharmaceutical chemists in selecting appropriate reaction vessels and equipment. The lab, equipped with state-of-the-art fume hoods, processes over 500 different metal-based reactions monthly for drug development. Dr. Hoffmann explains that zinc's position in the reactivity series makes it more reactive than hydrogen, allowing it to displace hydrogen from acids. This principle is applied in Novartis's synthesis of zinc-containing pharmaceutical compounds used in nutritional supplements distributed throughout Switzerland and Europe.`
  },
  {
    id: "RT_CORE_2",
    reactants: ["NaCl", "AgNO3"],
    products: ["NaNO3", "AgCl"],
    coefficients: [1, 1, 1, 1],
    type: "double_replacement",
    baselContext: `In the Roche Quality Control Laboratory in Basel's Grenzacherstrasse facility, analyst Maria performs a precipitation test using silver nitrate and sodium chloride. When the two clear solutions mix, a white precipitate of silver chloride immediately forms—a classic double replacement reaction. This test is essential for detecting chloride contamination in pharmaceutical products. The lab conducts over 10,000 quality control tests monthly, ensuring that Roche's medications meet strict purity standards. Maria explains that in double replacement reactions, the positive and negative ions swap partners, forming new compounds. The silver chloride precipitate is so insoluble that even tiny amounts of chloride can be detected, making this reaction invaluable for pharmaceutical quality assurance. Students learn that such analytical techniques help maintain Basel's reputation for pharmaceutical excellence.`
  },
  {
    id: "RT_CORE_3",
    reactants: ["Cu", "AgNO3"],
    products: ["Cu(NO3)2", "Ag"],
    coefficients: [1, 2, 1, 2],
    type: "single_replacement",
    baselContext: `At Basel University's Chemistry Institute, Professor Schmidt demonstrates a visually striking single replacement reaction. When a copper wire is placed in silver nitrate solution, beautiful silver crystals begin growing on the copper surface while the solution turns blue from copper(II) nitrate. This reaction illustrates the reactivity series—copper is more reactive than silver and displaces it from solution. The demonstration is part of the university's outreach program, which hosts 2,000 Sekundarschule students annually. Professor Schmidt explains that this same principle is used in electroplating processes at Basel's industrial facilities. Understanding single replacement reactions is crucial for pharmaceutical synthesis, where selective metal displacement reactions are used to purify compounds. The university's chemistry program, which has produced three Nobel laureates, emphasizes hands-on learning of fundamental reaction types.`
  },
  {
    id: "RT_CORE_4",
    reactants: ["BaCl2", "Na2SO4"],
    products: ["BaSO4", "NaCl"],
    coefficients: [1, 1, 1, 2],
    type: "double_replacement",
    baselContext: `In the Basel Water Quality Testing Center near the Rhine River, technician Thomas uses a double replacement reaction to test for sulfate contamination. When barium chloride solution is added to a water sample containing sodium sulfate, a white precipitate of barium sulfate forms instantly. This test is critical for monitoring Rhine River water quality, as sulfate levels affect aquatic ecosystems. The center analyzes 500 water samples weekly from various points along Basel's 21 kilometers of Rhine riverfront. Thomas explains that barium sulfate is extremely insoluble, making this double replacement reaction highly sensitive for detecting sulfates. The data helps Basel's environmental authorities ensure that industrial discharge from pharmaceutical companies meets strict environmental standards, protecting the river that provides recreation and ecosystem services for Basel's residents.`
  },
  {
    id: "RT_CORE_5",
    reactants: ["Fe", "CuSO4"],
    products: ["FeSO4", "Cu"],
    coefficients: [1, 1, 1, 1],
    type: "single_replacement",
    baselContext: `At the Novartis Industrial Chemistry Workshop in Basel's Klybeck district, apprentice chemist Lisa demonstrates metal displacement reactions. When an iron nail is immersed in blue copper sulfate solution, the nail becomes coated with reddish copper metal while the solution gradually turns pale green from iron(II) sulfate. This single replacement reaction occurs because iron is more reactive than copper in the metal reactivity series. The workshop trains 50 apprentices annually in fundamental chemistry principles essential for pharmaceutical manufacturing. Lisa explains that understanding metal reactivity is crucial for selecting appropriate equipment materials—using the wrong metal can lead to unwanted reactions that contaminate pharmaceutical products. This principle guides Novartis's choice of stainless steel reactors for drug synthesis, preventing metal contamination in medications distributed worldwide.`
  }
];

/**
 * Reaction Types - ADVANCED Difficulty (5 quests)
 * Organic combustion and complex synthesis
 * Requirements: 3.4, 3.8, 7.3, 8.1, 8.2, 8.4
 */
export const reactionTypesAdvanced: RawQuestData[] = [
  {
    id: "RT_ADVANCED_1",
    reactants: ["CH4", "O2"],
    products: ["CO2", "H2O"],
    coefficients: [1, 2, 1, 2],
    type: "combustion",
    baselContext: `At Basel's District Heating Facility in Voltastrasse, engineer Andreas monitors the combustion of natural gas (methane) that heats 15,000 Basel households during winter. The facility burns 45 million cubic meters of natural gas annually, producing carbon dioxide and water vapor. This combustion reaction is highly exothermic, releasing 890 kJ per mole of methane—enough energy to heat water for Basel's heating network. Andreas explains that complete combustion requires sufficient oxygen; incomplete combustion produces toxic carbon monoxide. The facility uses advanced sensors to maintain optimal oxygen levels, ensuring clean combustion. Basel's commitment to sustainability has led to plans for replacing natural gas with renewable biogas by 2030, reducing the city's carbon footprint while maintaining reliable heating for residents through cold Swiss winters.`
  },
  {
    id: "RT_ADVANCED_2",
    reactants: ["C3H8", "O2"],
    products: ["CO2", "H2O"],
    coefficients: [1, 5, 3, 4],
    type: "combustion",
    baselContext: `In the Basel Chemistry Institute's Combustion Analysis Laboratory, Dr. Weber teaches students about propane combustion. Propane, commonly used in laboratory Bunsen burners and portable heaters, undergoes complete combustion when sufficient oxygen is available. The lab uses propane for heating experiments and analytical procedures, consuming approximately 200 kg monthly. Dr. Weber demonstrates how to balance combustion equations—a critical skill for pharmaceutical chemists who must calculate oxygen requirements for oxidation reactions in drug synthesis. The institute, located near Basel's Botanical Garden, emphasizes that understanding combustion stoichiometry is essential for safety. Insufficient oxygen leads to incomplete combustion, producing dangerous carbon monoxide. This knowledge is vital for Novartis and Roche chemists who work with flammable organic solvents in enclosed laboratory spaces.`
  },
  {
    id: "RT_ADVANCED_3",
    reactants: ["C2H5OH", "O2"],
    products: ["CO2", "H2O"],
    coefficients: [1, 3, 2, 3],
    type: "combustion",
    baselContext: `At the Roche Pharmaceutical Safety Laboratory, safety officer Dr. Zimmermann explains ethanol combustion to new employees. Ethanol, widely used as a solvent in pharmaceutical synthesis, is highly flammable and must be handled carefully. When ethanol burns in sufficient oxygen, it produces carbon dioxide and water, releasing 1,367 kJ per mole. The lab uses 5,000 liters of ethanol monthly in drug purification processes. Dr. Zimmermann emphasizes that ethanol vapors can form explosive mixtures with air at concentrations between 3% and 19%. Understanding this combustion reaction is crucial for laboratory safety—Roche's Basel facilities have maintained zero fire incidents for 15 consecutive years through rigorous safety training. The lab's ventilation systems ensure ethanol vapors never reach dangerous concentrations, protecting the 500 chemists working in the facility.`
  },
  {
    id: "RT_ADVANCED_4",
    reactants: ["C6H12O6", "O2"],
    products: ["CO2", "H2O"],
    coefficients: [1, 6, 6, 6],
    type: "combustion",
    baselContext: `In the Basel Biochemistry Research Center, Professor Keller explains glucose combustion—the fundamental energy-producing reaction in living cells. While glucose doesn't literally burn in our bodies, cellular respiration is essentially a controlled combustion reaction that releases energy gradually through multiple enzymatic steps. The center studies how cells extract energy from glucose to power biological processes. Professor Keller notes that complete glucose combustion releases 2,808 kJ per mole, which cells capture in ATP molecules. This research is crucial for understanding metabolic disorders like diabetes, a major focus for Novartis's pharmaceutical research. The center collaborates with Roche Diagnostics to develop blood glucose monitors used by 50,000 diabetes patients in Switzerland. Understanding this combustion reaction helps students appreciate the chemistry underlying human metabolism and pharmaceutical interventions.`
  },
  {
    id: "RT_ADVANCED_5",
    reactants: ["C8H18", "O2"],
    products: ["CO2", "H2O"],
    coefficients: [2, 25, 16, 18],
    type: "combustion",
    baselContext: `At Basel's Environmental Chemistry Laboratory near the Autobahn A2, researcher Dr. Müller analyzes octane combustion—the primary reaction in gasoline engines. Octane, a major component of gasoline, undergoes combustion in car engines, producing carbon dioxide and water while releasing energy that powers vehicles. The lab monitors air quality along Basel's major roads, where 80,000 vehicles pass daily. Dr. Müller explains that incomplete combustion produces carbon monoxide and particulate matter, contributing to air pollution. Basel's investment in electric trams and buses aims to reduce combustion-related emissions. Understanding octane combustion is also relevant to pharmaceutical chemistry—Novartis uses similar hydrocarbon combustion principles in their waste incineration facility, which safely destroys 2,000 tons of pharmaceutical waste annually at temperatures exceeding 1,200°C, ensuring complete combustion and minimal environmental impact.`
  }
];

/**
 * Reaction Types - ELITE Difficulty (5 quests)
 * Pharmaceutical synthesis reactions
 * Requirements: 3.4, 3.9, 7.4, 8.1, 8.2, 8.4, 8.7
 */
export const reactionTypesElite: RawQuestData[] = [
  {
    id: "RT_ELITE_1",
    reactants: ["C6H5COOH", "CH3OH"],
    products: ["C6H5COOCH3", "H2O"],
    coefficients: [1, 1, 1, 1],
    type: "synthesis",
    baselContext: `In the Roche Pharmaceutical Synthesis Laboratory in Basel's Grenzacherstrasse campus, senior chemist Dr. Hartmann oversees the esterification of benzoic acid with methanol to produce methyl benzoate. This synthesis reaction is a crucial step in manufacturing topical anesthetic formulations. The reaction requires an acid catalyst and careful temperature control at 65°C. Dr. Hartmann's team produces 500 kg of methyl benzoate monthly for pharmaceutical applications. The esterification process is fundamental to pharmaceutical chemistry—Roche synthesizes over 50 different ester compounds in Basel for various medications. This reaction demonstrates how simple organic synthesis principles scale to industrial pharmaceutical production. The laboratory's quality control ensures 99.8% purity, meeting strict pharmaceutical standards. Understanding esterification reactions is essential for pharmaceutical chemists developing new drug formulations for Roche's global market.`
  },
  {
    id: "RT_ELITE_2",
    reactants: ["C6H5NH2", "CH3COCl"],
    products: ["C6H5NHCOCH3", "HCl"],
    coefficients: [1, 1, 1, 1],
    type: "synthesis",
    baselContext: `At the Novartis Advanced Synthesis Facility in Basel's Klybeck district, Dr. Chen leads the acetylation of aniline to produce acetanilide, an important pharmaceutical intermediate. This synthesis reaction involves treating aniline with acetyl chloride, producing acetanilide and hydrogen chloride gas. The reaction is highly exothermic and requires cooling to maintain temperature at 5°C. Novartis produces 2 tons of acetanilide monthly for analgesic drug synthesis. Dr. Chen explains that acetylation reactions are fundamental to pharmaceutical chemistry—aspirin itself is produced through acetylation of salicylic acid. The facility's advanced reactor systems precisely control reaction conditions, ensuring consistent product quality. This synthesis pathway has been used in Basel's pharmaceutical industry for over 80 years, contributing to Switzerland's reputation for pharmaceutical excellence. The process demonstrates how classical organic synthesis reactions remain essential in modern drug manufacturing.`
  },
  {
    id: "RT_ELITE_3",
    reactants: ["C7H6O3", "C4H6O3"],
    products: ["C9H8O4", "CH3COOH", "CO2"],
    coefficients: [1, 1, 1, 1, 1],
    type: "synthesis",
    baselContext: `In the Novartis Historical Pharmaceutical Laboratory, curator Dr. Schneider demonstrates the classic synthesis of aspirin (acetylsalicylic acid) from salicylic acid and acetic anhydride. This synthesis reaction, discovered in 1897, revolutionized pain management and established Basel as a pharmaceutical center. The reaction produces aspirin, acetic acid, and carbon dioxide. While modern Novartis facilities use more efficient processes, this classical synthesis is still taught to chemistry students to illustrate pharmaceutical history. The laboratory, located in Novartis's original building from 1886, preserves historical equipment and documents. Dr. Schneider explains that understanding this synthesis reaction connects students to Basel's pharmaceutical heritage—aspirin was one of the first synthetic drugs mass-produced in Basel, with global sales exceeding 40,000 tons annually. This reaction exemplifies how organic synthesis transformed medicine and established Basel's pharmaceutical industry.`
  },
  {
    id: "RT_ELITE_4",
    reactants: ["C6H5CH2Cl", "NaCN"],
    products: ["C6H5CH2CN", "NaCl"],
    coefficients: [1, 1, 1, 1],
    type: "single_replacement",
    baselContext: `At the Roche Advanced Organic Chemistry Laboratory, Dr. Hoffmann supervises the synthesis of phenylacetonitrile from benzyl chloride and sodium cyanide. This single replacement reaction, where cyanide displaces chloride, is crucial for producing pharmaceutical intermediates. The reaction requires strict safety protocols due to cyanide toxicity—the lab operates under negative pressure with advanced scrubbing systems. Roche produces 800 kg of phenylacetonitrile monthly for synthesizing cardiovascular medications. Dr. Hoffmann emphasizes that while this appears to be a simple displacement reaction, it's actually an SN2 nucleophilic substitution—a sophisticated mechanism taught in advanced organic chemistry. The laboratory's safety record is impeccable, with zero cyanide exposure incidents in 20 years. This reaction demonstrates how pharmaceutical chemists adapt classical reaction types for complex drug synthesis, maintaining Basel's position as a global pharmaceutical innovation center.`
  },
  {
    id: "RT_ELITE_5",
    reactants: ["C6H5OH", "NaOH"],
    products: ["C6H5ONa", "H2O"],
    coefficients: [1, 1, 1, 1],
    type: "double_replacement",
    baselContext: `In the Novartis Pharmaceutical Process Development Laboratory, chemist Dr. Weber demonstrates the synthesis of sodium phenoxide from phenol and sodium hydroxide. This double replacement reaction (actually an acid-base neutralization) is essential for activating phenol for subsequent coupling reactions in drug synthesis. The reaction is exothermic, releasing heat as the phenoxide salt forms. Novartis uses this reaction in synthesizing antimicrobial agents and preservatives for pharmaceutical formulations. Dr. Weber's team processes 1,500 kg of phenol monthly in various pharmaceutical syntheses. The laboratory, equipped with automated reactors and real-time monitoring systems, ensures precise control of reaction conditions. Understanding this reaction type is crucial for pharmaceutical chemists—many drug molecules contain phenolic groups that must be activated through similar reactions. This process exemplifies how fundamental reaction types scale to industrial pharmaceutical production in Basel's world-leading pharmaceutical facilities.`
  }
];

// ============================================================================
// EQUATION BALANCING STAGE - 20 QUESTS
// ============================================================================

/**
 * Equation Balancing - BASIC Difficulty (5 quests)
 * Coefficients 1-3, simple compounds
 * Requirements: 1.5, 2.5, 2.7, 7.1, 8.1, 8.2, 8.4
 */
export const equationBalancingBasic: RawQuestData[] = [
  {
    id: "EB_BASIC_1",
    reactants: ["H2", "O2"],
    products: ["H2O"],
    coefficients: [2, 1, 2],
    type: "synthesis",
    baselContext: `At Basel University's Hydrogen Fuel Cell Research Laboratory, doctoral student Thomas balances the equation for water formation. This fundamental reaction is crucial for understanding fuel cell technology, which the university is developing in partnership with Novartis for sustainable energy applications. The lab's prototype fuel cells generate electricity by combining hydrogen and oxygen, producing only water as a byproduct. Thomas explains that balancing this equation requires 2 molecules of hydrogen for every 1 molecule of oxygen to satisfy the law of conservation of mass. The research aims to power Novartis's pharmaceutical manufacturing with clean energy, reducing Basel's carbon footprint. The university's fuel cell program has attracted 5 million Swiss francs in research funding and collaborates with 15 international institutions to advance hydrogen technology for pharmaceutical and industrial applications.`
  },
  {
    id: "EB_BASIC_2",
    reactants: ["N2", "H2"],
    products: ["NH3"],
    coefficients: [1, 3, 2],
    type: "synthesis",
    baselContext: `In the Novartis Ammonia Synthesis Laboratory, process engineer Dr. Müller teaches students about the Haber-Bosch process for producing ammonia. This reaction combines nitrogen from air with hydrogen to form ammonia, which Novartis uses in pharmaceutical production. Balancing this equation reveals that 3 molecules of hydrogen react with 1 molecule of nitrogen to produce 2 molecules of ammonia. The laboratory produces 50 tons of ammonia annually for synthesizing pharmaceutical intermediates and cleaning agents. Dr. Müller explains that this reaction requires high pressure (200 atmospheres) and temperature (450°C) with an iron catalyst. Understanding equation balancing is essential for calculating reactant quantities—using the wrong ratio wastes expensive materials and reduces efficiency. This reaction's industrial importance earned Fritz Haber the 1918 Nobel Prize in Chemistry, demonstrating how fundamental chemistry principles enable large-scale pharmaceutical manufacturing.`
  },
  {
    id: "EB_BASIC_3",
    reactants: ["Fe", "O2"],
    products: ["Fe2O3"],
    coefficients: [4, 3, 2],
    type: "synthesis",
    baselContext: `At the Basel Materials Science Laboratory, researcher Dr. Schmidt studies iron oxidation—the rusting process that affects pharmaceutical equipment. When iron reacts with oxygen, it forms iron(III) oxide (rust). Balancing this equation shows that 4 iron atoms react with 3 oxygen molecules to produce 2 formula units of iron oxide. This reaction costs Basel's pharmaceutical industry millions annually in equipment maintenance and replacement. Dr. Schmidt's research focuses on protective coatings to prevent rust in Roche's and Novartis's manufacturing facilities. The laboratory tests over 200 different coating materials monthly, seeking solutions that withstand harsh chemical environments in pharmaceutical production. Understanding this oxidation reaction helps students appreciate why pharmaceutical companies invest heavily in stainless steel equipment—the chromium in stainless steel forms a protective oxide layer that prevents iron oxidation, ensuring equipment longevity and product purity.`
  },
  {
    id: "EB_BASIC_4",
    reactants: ["Al", "O2"],
    products: ["Al2O3"],
    coefficients: [4, 3, 2],
    type: "synthesis",
    baselContext: `In the Roche Equipment Manufacturing Workshop, engineer Lisa explains aluminum oxidation to apprentice chemists. When aluminum reacts with oxygen, it forms a protective aluminum oxide layer that prevents further corrosion. Balancing this equation requires 4 aluminum atoms and 3 oxygen molecules to produce 2 formula units of aluminum oxide. This self-protecting property makes aluminum ideal for pharmaceutical equipment—Roche uses aluminum reactors for synthesizing acid-sensitive compounds. The workshop manufactures custom aluminum equipment for Roche's Basel facilities, producing 50 specialized reactors annually. Lisa demonstrates that despite aluminum being more reactive than iron, its oxide layer makes it more corrosion-resistant. This principle guides equipment selection in pharmaceutical manufacturing, where material compatibility with reactive chemicals is crucial. Understanding equation balancing helps chemists calculate the aluminum thickness needed to ensure adequate protection after oxide layer formation.`
  },
  {
    id: "EB_BASIC_5",
    reactants: ["CH4", "O2"],
    products: ["CO2", "H2O"],
    coefficients: [1, 2, 1, 2],
    type: "combustion",
    baselContext: `At Basel's Natural Gas Distribution Center in Kleinhüningen, safety inspector Andreas teaches students about methane combustion. Natural gas, which is primarily methane, heats 40% of Basel's buildings. Balancing the combustion equation shows that 1 methane molecule requires 2 oxygen molecules to produce 1 carbon dioxide and 2 water molecules. The center distributes 120 million cubic meters of natural gas annually to Basel residents and industries, including pharmaceutical facilities. Andreas emphasizes that proper equation balancing is crucial for safety—insufficient oxygen leads to incomplete combustion, producing toxic carbon monoxide. The center's monitoring systems ensure optimal combustion in Basel's heating systems. Understanding this balanced equation helps students appreciate why proper ventilation is essential when using gas appliances, preventing carbon monoxide poisoning that affects dozens of Swiss residents annually due to inadequate ventilation.`
  }
];

/**
 * Equation Balancing - CORE Difficulty (5 quests)
 * Coefficients up to 5, polyatomic ions
 * Requirements: 2.5, 2.8, 7.2, 8.1, 8.2, 8.4
 */
export const equationBalancingCore: RawQuestData[] = [
  {
    id: "EB_CORE_1",
    reactants: ["Ca(OH)2", "H3PO4"],
    products: ["Ca3(PO4)2", "H2O"],
    coefficients: [3, 2, 1, 6],
    type: "double_replacement",
    baselContext: `At the Basel Water Treatment Plant's Phosphate Removal Facility, chemist Dr. Weber demonstrates how calcium hydroxide removes phosphates from wastewater. This double replacement reaction forms insoluble calcium phosphate, which precipitates out of solution. Balancing this equation with polyatomic ions requires 3 calcium hydroxide molecules and 2 phosphoric acid molecules to produce 1 calcium phosphate and 6 water molecules. The facility treats 180,000 cubic meters of water daily, removing phosphates that would otherwise cause algae blooms in the Rhine River. Dr. Weber explains that balancing equations with polyatomic ions is easier when treating groups like phosphate (PO_4^3^-) as single units. This process protects Basel's Rhine riverfront, where 50,000 residents enjoy recreational activities annually. Understanding polyatomic ion balancing is essential for pharmaceutical wastewater treatment at Novartis and Roche facilities.`
  },
  {
    id: "EB_CORE_2",
    reactants: ["Fe2O3", "CO"],
    products: ["Fe", "CO2"],
    coefficients: [1, 3, 2, 3],
    type: "single_replacement",
    baselContext: `In the Basel Industrial Chemistry Museum, curator Dr. Hoffmann explains iron ore reduction—the process that enabled the Industrial Revolution. When carbon monoxide reduces iron(III) oxide, it produces pure iron and carbon dioxide. Balancing this equation requires 1 iron oxide molecule, 3 carbon monoxide molecules, producing 2 iron atoms and 3 carbon dioxide molecules. While Basel no longer has steel mills, this reaction's principles apply to pharmaceutical chemistry. Novartis uses similar reduction reactions to synthesize pharmaceutical compounds, replacing oxygen with other functional groups. The museum, located in Basel's former industrial district, attracts 5,000 visitors annually. Dr. Hoffmann emphasizes that understanding reduction reactions is fundamental to pharmaceutical synthesis—many drug molecules require selective reduction of specific functional groups, using the same chemical principles that once produced steel for Basel's industrial economy.`
  },
  {
    id: "EB_CORE_3",
    reactants: ["NH3", "O2"],
    products: ["NO", "H2O"],
    coefficients: [4, 5, 4, 6],
    type: "combustion",
    baselContext: `At the Novartis Nitric Acid Production Facility, process engineer Dr. Chen oversees the Ostwald process for producing nitric acid, which begins with ammonia oxidation. This reaction requires precise balancing: 4 ammonia molecules react with 5 oxygen molecules to produce 4 nitrogen monoxide molecules and 6 water molecules. The facility produces 200 tons of nitric acid monthly for pharmaceutical synthesis. Dr. Chen explains that this reaction occurs at 900°C over a platinum-rhodium catalyst, with 95% conversion efficiency. Nitric acid is essential for synthesizing many pharmaceutical compounds, including antibiotics and cardiovascular medications. Understanding this complex equation balancing is crucial for process engineers who must calculate reactant flows to maintain optimal production rates. The facility's sophisticated control systems monitor reaction stoichiometry in real-time, ensuring consistent product quality for Novartis's pharmaceutical manufacturing operations.`
  },
  {
    id: "EB_CORE_4",
    reactants: ["Al", "H2SO4"],
    products: ["Al2(SO4)3", "H2"],
    coefficients: [2, 3, 1, 3],
    type: "single_replacement",
    baselContext: `In the Roche Analytical Chemistry Laboratory, analyst Maria demonstrates aluminum's reaction with sulfuric acid. This single replacement reaction produces aluminum sulfate and hydrogen gas. Balancing this equation with polyatomic sulfate ions requires 2 aluminum atoms and 3 sulfuric acid molecules to produce 1 aluminum sulfate molecule and 3 hydrogen molecules. The laboratory uses this reaction to prepare aluminum sulfate for water purification tests. Maria explains that treating sulfate (SO_4^2^-) as a single unit simplifies balancing—count 3 sulfate groups on each side. This principle is essential for pharmaceutical chemists working with polyatomic ions in drug synthesis. The laboratory conducts 500 analytical tests weekly, ensuring pharmaceutical products meet purity standards. Understanding polyatomic ion balancing helps students appreciate the complexity of pharmaceutical quality control, where precise stoichiometry ensures medication safety for patients worldwide.`
  },
  {
    id: "EB_CORE_5",
    reactants: ["C2H6", "O2"],
    products: ["CO2", "H2O"],
    coefficients: [2, 7, 4, 6],
    type: "combustion",
    baselContext: `At Basel University's Combustion Research Laboratory, Professor Müller teaches students to balance ethane combustion equations. Ethane, a component of natural gas, requires careful balancing: 2 ethane molecules react with 7 oxygen molecules to produce 4 carbon dioxide and 6 water molecules. The laboratory studies combustion efficiency for Basel's heating systems, which consume 120 million cubic meters of natural gas annually. Professor Müller emphasizes that balancing combustion equations is challenging because multiple elements must be balanced simultaneously. Students learn to balance carbon first, then hydrogen, and finally oxygen. This systematic approach is essential for pharmaceutical chemists who balance complex organic reactions. The university's combustion research contributes to Basel's sustainability goals—improving combustion efficiency reduces natural gas consumption and carbon emissions, supporting the city's target of carbon neutrality by 2050.`
  }
];

/**
 * Equation Balancing - ADVANCED Difficulty (5 quests)
 * Coefficients up to 10, organic compounds
 * Requirements: 2.5, 2.9, 7.3, 8.1, 8.2, 8.4
 */
export const equationBalancingAdvanced: RawQuestData[] = [
  {
    id: "EB_ADVANCED_1",
    reactants: ["C3H8", "O2"],
    products: ["CO2", "H2O"],
    coefficients: [1, 5, 3, 4],
    type: "combustion",
    baselContext: `In the Basel Chemistry Institute's Advanced Combustion Laboratory, Dr. Weber challenges students with propane combustion balancing. This equation requires 1 propane molecule and 5 oxygen molecules to produce 3 carbon dioxide and 4 water molecules. The laboratory uses propane in Bunsen burners for heating experiments, consuming 200 kg monthly. Dr. Weber teaches a systematic approach: balance carbon atoms first (3 on each side), then hydrogen (8 on each side), and finally oxygen (10 on each side). This method is crucial for pharmaceutical chemists who balance complex organic synthesis reactions. The institute, founded in 1460, has trained generations of chemists who contributed to Basel's pharmaceutical industry. Understanding combustion stoichiometry helps students calculate oxygen requirements for laboratory safety—insufficient oxygen produces toxic carbon monoxide, a hazard in enclosed laboratory spaces.`
  },
  {
    id: "EB_ADVANCED_2",
    reactants: ["C4H10", "O2"],
    products: ["CO2", "H2O"],
    coefficients: [2, 13, 8, 10],
    type: "combustion",
    baselContext: `At the Roche Laboratory Safety Training Center, instructor Dr. Zimmermann uses butane combustion to teach equation balancing and safety. Butane, used in laboratory burners and portable heaters, requires complex balancing: 2 butane molecules need 13 oxygen molecules to produce 8 carbon dioxide and 10 water molecules. The center trains 500 chemists annually in laboratory safety protocols. Dr. Zimmermann emphasizes that balancing combustion equations helps chemists calculate ventilation requirements—each mole of butane consumes 6.5 moles of oxygen from the air. Inadequate ventilation leads to incomplete combustion and carbon monoxide production. Roche's Basel facilities have maintained zero fire incidents for 15 years through rigorous safety training. Understanding combustion stoichiometry is essential for pharmaceutical chemists who work with flammable organic solvents daily, ensuring safe laboratory operations and protecting the 500 chemists working in Roche's Basel research facilities.`
  },
  {
    id: "EB_ADVANCED_3",
    reactants: ["C2H5OH", "O2"],
    products: ["CO2", "H2O"],
    coefficients: [1, 3, 2, 3],
    type: "combustion",
    baselContext: `In the Novartis Solvent Recovery Facility, engineer Dr. Chen manages ethanol combustion for waste disposal. Ethanol, widely used as a pharmaceutical solvent, is combusted when contaminated beyond recovery. Balancing this equation requires 1 ethanol molecule and 3 oxygen molecules to produce 2 carbon dioxide and 3 water molecules. The facility processes 5,000 liters of waste ethanol monthly, recovering heat energy for building heating. Dr. Chen explains that precise equation balancing is crucial for calculating oxygen requirements—the facility's incinerator operates at 1,200°C with 20% excess oxygen to ensure complete combustion. This prevents toxic byproduct formation and meets strict Swiss environmental regulations. Understanding ethanol combustion stoichiometry helps pharmaceutical chemists calculate solvent quantities for synthesis reactions and waste disposal costs, contributing to Novartis's sustainability goals of reducing waste and recovering energy from unavoidable waste streams.`
  },
  {
    id: "EB_ADVANCED_4",
    reactants: ["C6H12O6", "O2"],
    products: ["CO2", "H2O"],
    coefficients: [1, 6, 6, 6],
    type: "combustion",
    baselContext: `At the Basel Biochemistry Research Institute, Professor Keller uses glucose combustion to teach cellular respiration. While glucose doesn't literally burn in cells, the overall equation for cellular respiration matches combustion: 1 glucose molecule reacts with 6 oxygen molecules to produce 6 carbon dioxide and 6 water molecules. This balanced equation represents the complete oxidation of glucose, releasing 2,808 kJ per mole—energy that cells capture in 38 ATP molecules. The institute studies metabolic disorders affecting glucose metabolism, collaborating with Roche Diagnostics to develop blood glucose monitors. Professor Keller emphasizes that understanding this equation's stoichiometry helps students appreciate why we breathe—we inhale oxygen to oxidize glucose and exhale carbon dioxide as waste. This fundamental biochemical equation connects chemistry to human physiology, illustrating why Basel's pharmaceutical companies invest heavily in metabolic disease research.`
  },
  {
    id: "EB_ADVANCED_5",
    reactants: ["Fe3O4", "H2"],
    products: ["Fe", "H2O"],
    coefficients: [1, 4, 3, 4],
    type: "single_replacement",
    baselContext: `In the Novartis Materials Chemistry Laboratory, researcher Dr. Hoffmann demonstrates magnetite reduction with hydrogen. This reaction reduces iron(II,III) oxide (magnetite) to pure iron using hydrogen gas. Balancing this equation requires 1 magnetite molecule and 4 hydrogen molecules to produce 3 iron atoms and 4 water molecules. While this reaction isn't used in pharmaceutical synthesis, its principles apply to reducing functional groups in drug molecules. The laboratory studies reduction reactions for synthesizing pharmaceutical intermediates, processing 200 different reduction reactions monthly. Dr. Hoffmann explains that hydrogen reduction is cleaner than carbon monoxide reduction, producing only water as a byproduct. This principle guides Novartis's green chemistry initiatives—selecting reactions that minimize hazardous waste. Understanding complex equation balancing with mixed oxidation states prepares students for advanced pharmaceutical chemistry, where precise stoichiometry ensures efficient drug synthesis and minimal waste production.`
  }
];

/**
 * Equation Balancing - ELITE Difficulty (5 quests)
 * Complex pharmaceutical synthesis
 * Requirements: 2.5, 2.10, 7.4, 8.1, 8.2, 8.4, 8.7
 */
export const equationBalancingElite: RawQuestData[] = [
  {
    id: "EB_ELITE_1",
    reactants: ["C7H6O3", "C4H6O3"],
    products: ["C9H8O4", "CH3COOH"],
    coefficients: [1, 1, 1, 1],
    type: "synthesis",
    baselContext: `In the Novartis Historical Pharmaceutical Laboratory, Dr. Schneider demonstrates aspirin synthesis—the reaction that established Basel's pharmaceutical industry. Salicylic acid reacts with acetic anhydride to produce aspirin (acetylsalicylic acid) and acetic acid. This equation is already balanced with coefficients of 1, but students must verify that all atoms balance correctly. The laboratory preserves the original equipment from 1897 when Felix Hoffmann first synthesized aspirin. Dr. Schneider explains that this synthesis revolutionized medicine—aspirin became the world's most widely used medication, with global consumption exceeding 40,000 tons annually. Modern Novartis facilities produce aspirin more efficiently, but this classical synthesis remains important for teaching pharmaceutical chemistry principles. Understanding this balanced equation connects students to Basel's pharmaceutical heritage and illustrates how organic synthesis transformed medicine, establishing Basel as a global pharmaceutical center.`
  },
  {
    id: "EB_ELITE_2",
    reactants: ["C6H5NH2", "HNO3", "H2SO4"],
    products: ["C6H5NO2", "H2O"],
    coefficients: [1, 1, 1, 1, 1],
    type: "single_replacement",
    baselContext: `At the Roche Advanced Organic Synthesis Laboratory, Dr. Weber oversees aniline nitration—a key step in synthesizing pharmaceutical dyes and intermediates. Aniline reacts with nitric acid in the presence of sulfuric acid catalyst to produce nitrobenzene and water. Balancing this equation requires careful attention to all atoms, including the sulfuric acid catalyst that doesn't appear in products. The laboratory produces 1,000 kg of nitrated aromatic compounds monthly for pharmaceutical synthesis. Dr. Weber explains that this nitration reaction requires precise temperature control below 10°C to prevent dangerous side reactions. The facility's advanced cooling systems and safety protocols have maintained zero incidents for 25 years. Understanding this balanced equation is crucial for pharmaceutical chemists—nitration is a fundamental reaction for introducing functional groups into aromatic compounds, enabling synthesis of complex drug molecules that treat cardiovascular disease, cancer, and infectious diseases.`
  },
  {
    id: "EB_ELITE_3",
    reactants: ["C8H10N4O2", "CH2O", "HCl"],
    products: ["C9H12N4O2", "H2O"],
    coefficients: [1, 1, 1, 1, 1],
    type: "synthesis",
    baselContext: `In the Novartis Pharmaceutical Research Laboratory, Dr. Chen studies caffeine derivatives for developing new medications. Caffeine reacts with formaldehyde in acidic conditions to produce methylated caffeine derivatives used in pharmaceutical research. This balanced equation shows 1:1:1 stoichiometry, but students must verify all atoms balance correctly, including the complex caffeine molecule with its multiple nitrogen atoms. The laboratory synthesizes 50 different caffeine derivatives annually, investigating their potential as bronchodilators and cognitive enhancers. Dr. Chen explains that caffeine's structure makes it an excellent scaffold for drug development—small modifications create compounds with different pharmacological properties. Understanding how to balance equations with complex organic molecules is essential for pharmaceutical chemists who design and synthesize new drug candidates. This research contributes to Novartis's pipeline of innovative medications serving patients worldwide.`
  },
  {
    id: "EB_ELITE_4",
    reactants: ["C6H5COOH", "SOCl2"],
    products: ["C6H5COCl", "SO2", "HCl"],
    coefficients: [1, 1, 1, 1, 1],
    type: "single_replacement",
    baselContext: `At the Roche Pharmaceutical Synthesis Facility, senior chemist Dr. Hartmann demonstrates converting benzoic acid to benzoyl chloride using thionyl chloride. This reaction produces benzoyl chloride, sulfur dioxide, and hydrogen chloride gases. The equation is balanced with all coefficients equal to 1, but students must verify that all atoms—including sulfur and chlorine—balance correctly. The facility produces 500 kg of benzoyl chloride monthly for synthesizing pharmaceutical intermediates. Dr. Hartmann emphasizes that this reaction requires careful handling—both products are corrosive gases that must be scrubbed before release. The laboratory's advanced fume hood systems protect chemists and the environment. Understanding this balanced equation is crucial for pharmaceutical synthesis—acid chlorides like benzoyl chloride are highly reactive intermediates used in countless drug synthesis pathways. This reaction exemplifies how pharmaceutical chemists manipulate functional groups to build complex drug molecules.`
  },
  {
    id: "EB_ELITE_5",
    reactants: ["C10H15N", "HCl"],
    products: ["C10H15NHCl"],
    coefficients: [1, 1, 1],
    type: "synthesis",
    baselContext: `In the Novartis Pharmaceutical Salt Formation Laboratory, Dr. Müller oversees the synthesis of pharmaceutical salts from organic bases. Ephedrine, a decongestant and bronchodilator, reacts with hydrochloric acid to form ephedrine hydrochloride—a more stable, water-soluble salt suitable for pharmaceutical formulations. This balanced equation shows simple 1:1:1 stoichiometry, but students must recognize that the product is an ionic salt, not a covalent compound. The laboratory produces 2 tons of pharmaceutical salts monthly, converting poorly soluble drug molecules into forms suitable for tablets and injections. Dr. Müller explains that salt formation is crucial in pharmaceutical development—over 50% of marketed drugs are administered as salts to improve solubility, stability, and bioavailability. Understanding this balanced equation helps students appreciate how pharmaceutical chemists optimize drug properties through chemical modification, ensuring medications effectively reach their targets in the human body.`
  }
];

// ============================================================================
// REACTION SIMULATION STAGE - 20 QUESTS
// ============================================================================

/**
 * Reaction Simulation - BASIC Difficulty (5 quests)
 * Simple molecular animations
 * Requirements: 3.4, 6.1, 6.8, 7.1, 8.1, 8.2, 8.4
 */
export const reactionSimulationBasic: RawQuestData[] = [
  {
    id: "RS_BASIC_1",
    reactants: ["H2", "Cl2"],
    products: ["HCl"],
    coefficients: [1, 1, 2],
    type: "synthesis",
    energyChange: "exothermic",
    baselContext: `At the Basel Chemistry Demonstration Laboratory, Professor Schmidt shows students the explosive reaction between hydrogen and chlorine gases. When exposed to light, these gases combine violently to form hydrogen chloride, releasing significant energy. This exothermic synthesis reaction demonstrates bond breaking and forming—H-H and Cl-Cl bonds break, while new H-Cl bonds form. The laboratory uses this dramatic demonstration to teach reaction energetics to 500 students annually. Professor Schmidt emphasizes safety—the reaction is performed behind protective shields due to its explosive nature. Understanding this reaction helps students visualize molecular-level changes during chemical reactions. The demonstration connects to pharmaceutical chemistry—Roche and Novartis use hydrogen chloride in numerous synthesis reactions, though under carefully controlled conditions. This simple reaction illustrates fundamental principles that apply to complex pharmaceutical synthesis processes.`
  },
  {
    id: "RS_BASIC_2",
    reactants: ["N2", "O2"],
    products: ["NO"],
    coefficients: [1, 1, 2],
    type: "synthesis",
    energyChange: "endothermic",
    baselContext: `In the Basel Environmental Chemistry Laboratory, Dr. Weber demonstrates nitrogen monoxide formation using an electric arc to simulate lightning. This endothermic reaction requires energy input to break the strong triple bond in nitrogen molecules. Students observe how the electric arc provides energy to overcome the activation barrier, allowing nitrogen and oxygen to combine. The laboratory studies this reaction because it occurs in car engines and contributes to air pollution. Basel monitors NO levels at 15 stations throughout the city, especially near the Autobahn A2 where 80,000 vehicles pass daily. Dr. Weber explains that understanding this reaction's energy requirements helps engineers design catalytic converters that reduce NO emissions. The visualization shows nitrogen and oxygen molecules colliding with sufficient energy to break bonds and form new N-O bonds, illustrating how endothermic reactions require continuous energy input.`
  },
  {
    id: "RS_BASIC_3",
    reactants: ["H2", "O2"],
    products: ["H2O"],
    coefficients: [2, 1, 2],
    type: "synthesis",
    energyChange: "exothermic",
    baselContext: `At the Novartis Fuel Cell Research Laboratory, engineer Thomas demonstrates water formation in a hydrogen fuel cell. This highly exothermic reaction releases 286 kJ per mole of water formed, which the fuel cell converts to electricity. Students observe the molecular animation showing hydrogen and oxygen molecules approaching, bonds breaking, and new H-O bonds forming in water molecules. The laboratory's prototype fuel cells generate 10 kilowatts of electricity, enough to power laboratory equipment. Thomas explains that this reaction's energy release makes hydrogen an excellent fuel—it produces three times more energy per kilogram than gasoline. Novartis is investing in fuel cell technology to power pharmaceutical manufacturing sustainably. The visualization helps students understand why this reaction is exothermic—the bonds formed in water are stronger than the bonds broken in hydrogen and oxygen, releasing excess energy.`
  },
  {
    id: "RS_BASIC_4",
    reactants: ["C", "O2"],
    products: ["CO2"],
    coefficients: [1, 1, 1],
    type: "synthesis",
    energyChange: "exothermic",
    baselContext: `In the Basel Combustion Science Laboratory, Dr. Hoffmann demonstrates carbon combustion—the fundamental reaction in coal burning. When carbon reacts with oxygen, it forms carbon dioxide and releases 394 kJ per mole. The molecular animation shows oxygen molecules approaching carbon atoms, bonds forming between carbon and oxygen atoms, and energy being released as heat and light. This exothermic reaction powered the Industrial Revolution and still generates 40% of global electricity. The laboratory studies combustion efficiency for Basel's waste incineration facility, which burns 100,000 tons of waste annually. Dr. Hoffmann explains that complete combustion requires sufficient oxygen—inadequate oxygen produces toxic carbon monoxide. Understanding this reaction's energetics helps students appreciate why carbon-based fuels release so much energy and why transitioning to renewable energy is crucial for reducing carbon dioxide emissions and combating climate change.`
  },
  {
    id: "RS_BASIC_5",
    reactants: ["Mg", "O2"],
    products: ["MgO"],
    coefficients: [2, 1, 2],
    type: "synthesis",
    energyChange: "exothermic",
    baselContext: `At the Roche Chemical Safety Training Center, instructor Dr. Chen demonstrates magnesium combustion's brilliant white light. This highly exothermic reaction releases 602 kJ per mole of magnesium oxide formed. The molecular simulation shows magnesium atoms approaching oxygen molecules, electrons transferring from magnesium to oxygen, and ionic bonds forming in magnesium oxide. Students observe that this reaction is so exothermic it produces light bright enough to damage eyes without protection. The center trains 500 chemists annually in handling reactive metals safely. Dr. Chen emphasizes that magnesium fires cannot be extinguished with water—water reacts with hot magnesium, producing hydrogen gas that can explode. Understanding this reaction's energetics and mechanism helps pharmaceutical chemists work safely with reactive metals used in drug synthesis. The visualization illustrates how ionic bond formation releases tremendous energy.`
  }
];

/**
 * Reaction Simulation - CORE Difficulty (5 quests)
 * Multiple bond changes
 * Requirements: 3.4, 6.1, 6.8, 7.2, 8.1, 8.2, 8.4
 */
export const reactionSimulationCore: RawQuestData[] = [
  {
    id: "RS_CORE_1",
    reactants: ["CH4", "O2"],
    products: ["CO2", "H2O"],
    coefficients: [1, 2, 1, 2],
    type: "combustion",
    energyChange: "exothermic",
    baselContext: `At Basel's Natural Gas Research Laboratory, Dr. Müller uses molecular animation to teach methane combustion. This complex reaction involves breaking four C-H bonds and two O=O bonds, then forming two C=O bonds and four O-H bonds. The simulation shows methane and oxygen molecules colliding, bonds breaking in a specific sequence, and new bonds forming in carbon dioxide and water. This exothermic reaction releases 890 kJ per mole of methane, heating 40% of Basel's buildings. The laboratory studies combustion efficiency to reduce natural gas consumption and emissions. Dr. Müller explains that the reaction occurs in multiple steps, though the overall equation shows only reactants and products. Understanding these bond changes helps students appreciate combustion complexity and why complete combustion requires precise oxygen-to-fuel ratios. The visualization illustrates how multiple bonds break and form simultaneously during combustion.`
  },
  {
    id: "RS_CORE_2",
    reactants: ["C2H6", "O2"],
    products: ["CO2", "H2O"],
    coefficients: [2, 7, 4, 6],
    type: "combustion",
    energyChange: "exothermic",
    baselContext: `In the Novartis Combustion Analysis Laboratory, researcher Dr. Weber demonstrates ethane combustion using molecular visualization. This reaction involves breaking six C-H bonds, one C-C bond, and seven O=O bonds, then forming eight C=O bonds and twelve O-H bonds. The complex animation shows multiple ethane and oxygen molecules colliding, bonds breaking in stages, and new molecules forming. This exothermic reaction releases 1,560 kJ per mole of ethane. The laboratory analyzes combustion products from Novartis's waste incineration facility, which burns pharmaceutical waste at 1,200°C. Dr. Weber explains that complete combustion requires 3.5 oxygen molecules per ethane molecule—insufficient oxygen produces carbon monoxide and soot. Understanding these multiple bond changes helps pharmaceutical chemists design oxidation reactions for drug synthesis. The visualization illustrates reaction complexity, showing why combustion requires careful oxygen control for complete, clean burning.`
  },
  {
    id: "RS_CORE_3",
    reactants: ["NH3", "O2"],
    products: ["NO", "H2O"],
    coefficients: [4, 5, 4, 6],
    type: "combustion",
    energyChange: "exothermic",
    baselContext: `At the Roche Catalytic Process Laboratory, engineer Dr. Chen demonstrates ammonia oxidation over a platinum catalyst. This reaction breaks twelve N-H bonds and five O=O bonds, forming four N=O bonds and twelve O-H bonds. The molecular simulation shows ammonia and oxygen molecules adsorbing onto the platinum catalyst surface, bonds breaking and reforming, and products desorbing. This exothermic reaction releases 226 kJ per mole of ammonia and is the first step in nitric acid production. The laboratory produces 200 tons of nitric acid monthly for pharmaceutical synthesis. Dr. Chen explains that the platinum catalyst lowers activation energy, allowing the reaction to occur at 900°C instead of requiring much higher temperatures. Understanding catalytic mechanisms is crucial for pharmaceutical chemistry—Roche uses over 100 different catalysts in drug synthesis. The visualization shows how catalysts facilitate bond breaking and forming without being consumed.`
  },
  {
    id: "RS_CORE_4",
    reactants: ["C3H8", "O2"],
    products: ["CO2", "H2O"],
    coefficients: [1, 5, 3, 4],
    type: "combustion",
    energyChange: "exothermic",
    baselContext: `In the Basel University Combustion Dynamics Laboratory, Professor Schmidt uses advanced visualization to teach propane combustion. This reaction breaks eight C-H bonds, two C-C bonds, and five O=O bonds, then forms six C=O bonds and eight O-H bonds. The simulation shows propane molecules colliding with oxygen, bonds breaking in a cascade, and carbon dioxide and water molecules forming. This highly exothermic reaction releases 2,220 kJ per mole of propane. The laboratory studies combustion kinetics for improving heating efficiency in Basel's buildings. Professor Schmidt explains that combustion occurs through free radical chain reactions—the animation shows radical intermediates forming and reacting rapidly. Understanding these complex bond changes prepares students for pharmaceutical chemistry, where multi-step reactions with intermediates are common. The visualization illustrates why combustion is so exothermic—many strong bonds form, releasing substantial energy.`
  },
  {
    id: "RS_CORE_5",
    reactants: ["H2", "Br2"],
    products: ["HBr"],
    coefficients: [1, 1, 2],
    type: "synthesis",
    energyChange: "exothermic",
    baselContext: `At the Novartis Halogenation Research Laboratory, Dr. Hoffmann demonstrates hydrogen bromide formation using molecular animation. This reaction breaks one H-H bond and one Br-Br bond, forming two H-Br bonds. The simulation shows hydrogen and bromine molecules approaching, bonds breaking, and new hydrogen bromide molecules forming. This exothermic reaction releases 72 kJ per mole of hydrogen bromide. The laboratory studies halogenation reactions for pharmaceutical synthesis—many drugs contain bromine atoms introduced through reactions with hydrogen bromide. Dr. Hoffmann explains that this reaction proceeds through a free radical mechanism when exposed to light, with the animation showing radical intermediates. Understanding halogenation is crucial for pharmaceutical chemistry—Novartis synthesizes 30 different brominated pharmaceutical compounds in Basel. The visualization helps students understand how bond energies determine whether reactions are exothermic or endothermic.`
  }
];

/**
 * Reaction Simulation - ADVANCED Difficulty (5 quests)
 * Organic reactions with mechanisms
 * Requirements: 3.4, 6.1, 6.8, 7.3, 8.1, 8.2, 8.4, 15.1
 */
export const reactionSimulationAdvanced: RawQuestData[] = [
  {
    id: "RS_ADVANCED_1",
    reactants: ["C2H4", "H2"],
    products: ["C2H6"],
    coefficients: [1, 1, 1],
    type: "synthesis",
    energyChange: "exothermic",
    baselContext: `At the Roche Hydrogenation Laboratory, Dr. Weber demonstrates ethylene hydrogenation over a palladium catalyst. This reaction breaks the C=C double bond and H-H bond, forming two new C-H bonds. The molecular animation shows ethylene and hydrogen molecules adsorbing onto the palladium catalyst surface, the pi bond breaking, hydrogen atoms adding to carbon atoms, and ethane desorbing. This exothermic reaction releases 137 kJ per mole of ethylene. The laboratory performs 200 hydrogenation reactions monthly for pharmaceutical synthesis. Dr. Weber explains that hydrogenation is crucial for pharmaceutical chemistry—many drugs require selective reduction of double bonds. The catalyst ensures the reaction occurs at room temperature rather than requiring high temperatures. Understanding hydrogenation mechanisms helps pharmaceutical chemists design selective reactions that reduce specific bonds without affecting other functional groups in complex drug molecules.`
  },
  {
    id: "RS_ADVANCED_2",
    reactants: ["C2H4", "Br2"],
    products: ["C2H4Br2"],
    coefficients: [1, 1, 1],
    type: "synthesis",
    energyChange: "exothermic",
    baselContext: `In the Novartis Halogenation Synthesis Laboratory, Dr. Chen demonstrates ethylene bromination—a classic addition reaction. The molecular animation shows bromine approaching the ethylene double bond, the pi bond breaking, and bromine atoms adding to form 1,2-dibromoethane. This exothermic reaction proceeds through a cyclic bromonium ion intermediate, which the animation illustrates. The laboratory uses bromination reactions to synthesize pharmaceutical intermediates, processing 500 kg of brominated compounds monthly. Dr. Chen explains that the bromonium ion intermediate ensures anti-addition—the two bromine atoms add from opposite sides of the double bond. Understanding this mechanism is crucial for pharmaceutical synthesis, where stereochemistry determines drug activity. The visualization shows how the bromine molecule polarizes as it approaches the electron-rich double bond, initiating the addition reaction. This reaction exemplifies how pharmaceutical chemists control stereochemistry through mechanistic understanding.`
  },
  {
    id: "RS_ADVANCED_3",
    reactants: ["C2H4", "H2O"],
    products: ["C2H5OH"],
    coefficients: [1, 1, 1],
    type: "synthesis",
    energyChange: "exothermic",
    baselContext: `At the Basel Industrial Chemistry Laboratory, Professor Müller demonstrates ethanol synthesis from ethylene and water. This acid-catalyzed hydration reaction breaks the C=C double bond, with water adding across it to form ethanol. The molecular animation shows ethylene protonation, carbocation formation, water attack, and deprotonation to yield ethanol. This exothermic reaction produces 44 kJ per mole of ethanol. The laboratory studies this reaction because it's used industrially to produce ethanol for pharmaceutical solvents—Basel's pharmaceutical companies use 10,000 liters of ethanol monthly. Professor Müller explains that the reaction proceeds through a carbocation intermediate, which the animation clearly shows. Understanding carbocation mechanisms is fundamental to pharmaceutical chemistry—many drug synthesis reactions proceed through carbocation intermediates. The visualization illustrates how acid catalysts facilitate reactions by protonating substrates, creating reactive intermediates.`
  },
  {
    id: "RS_ADVANCED_4",
    reactants: ["C3H6", "HBr"],
    products: ["C3H7Br"],
    coefficients: [1, 1, 1],
    type: "synthesis",
    energyChange: "exothermic",
    baselContext: `In the Roche Organic Synthesis Laboratory, Dr. Hartmann demonstrates propylene hydrobromination—a reaction that follows Markovnikov's rule. The molecular animation shows HBr approaching the propylene double bond, the H-Br bond breaking, hydrogen adding to the less substituted carbon, and bromide adding to the more substituted carbon, forming 2-bromopropane. This exothermic reaction proceeds through a secondary carbocation intermediate, which is more stable than the primary carbocation alternative. The laboratory uses this reaction type to synthesize pharmaceutical intermediates with specific regiochemistry. Dr. Hartmann explains that Markovnikov's rule predicts regioselectivity—the hydrogen adds to the carbon with more hydrogens, while the bromide adds to the carbon with fewer hydrogens. Understanding this mechanism is crucial for pharmaceutical synthesis, where regioselectivity determines which isomer forms. The visualization shows why the secondary carbocation forms preferentially, explaining Markovnikov's rule at the molecular level.`
  },
  {
    id: "RS_ADVANCED_5",
    reactants: ["C4H8", "H2"],
    products: ["C4H10"],
    coefficients: [1, 1, 1],
    type: "synthesis",
    energyChange: "exothermic",
    baselContext: `At the Novartis Catalytic Hydrogenation Facility, engineer Dr. Weber oversees butene hydrogenation over a nickel catalyst. The molecular animation shows butene and hydrogen adsorbing onto the catalyst surface, the C=C double bond breaking, hydrogen atoms adding from the same side (syn-addition), and butane desorbing. This exothermic reaction releases 126 kJ per mole of butene. The facility produces 5 tons of saturated hydrocarbons monthly for pharmaceutical synthesis. Dr. Weber explains that heterogeneous catalysis ensures syn-addition—both hydrogen atoms add from the catalyst surface side. Understanding stereochemistry in hydrogenation is crucial for pharmaceutical chemistry—many drugs contain saturated carbon chains with specific stereochemistry. The visualization shows how the catalyst surface controls stereochemistry by forcing both hydrogen atoms to add from the same side, demonstrating how catalysts control not just reaction rate but also product stereochemistry.`
  }
];

/**
 * Reaction Simulation - ELITE Difficulty (5 quests)
 * Pharmaceutical synthesis with detailed mechanisms
 * Requirements: 3.4, 6.1, 6.8, 7.4, 8.1, 8.2, 8.4, 8.7, 15.1, 15.3, 15.4, 15.7
 */
export const reactionSimulationElite: RawQuestData[] = [
  {
    id: "RS_ELITE_1",
    reactants: ["C6H5NH2", "CH3COCl"],
    products: ["C6H5NHCOCH3", "HCl"],
    coefficients: [1, 1, 1, 1],
    type: "synthesis",
    energyChange: "exothermic",
    baselContext: `In the Novartis Advanced Pharmaceutical Synthesis Laboratory, Dr. Chen demonstrates acetanilide synthesis—a key step in analgesic drug production. The detailed mechanism animation shows aniline's lone pair attacking the carbonyl carbon of acetyl chloride, forming a tetrahedral intermediate. The intermediate collapses, expelling chloride and forming the amide bond. This exothermic reaction releases 50 kJ per mole. The laboratory produces 2 tons of acetanilide monthly for pharmaceutical synthesis. Dr. Chen explains that this acylation reaction is fundamental to pharmaceutical chemistry—many drugs contain amide bonds formed through similar mechanisms. The animation shows curved arrows indicating electron movement, the tetrahedral intermediate's formation and collapse, and HCl elimination. Understanding this mechanism helps pharmaceutical chemists design selective acylation reactions that modify specific amino groups in complex molecules without affecting other functional groups, crucial for synthesizing modern pharmaceuticals.`
  },
  {
    id: "RS_ELITE_2",
    reactants: ["C6H5COOH", "CH3OH"],
    products: ["C6H5COOCH3", "H2O"],
    coefficients: [1, 1, 1, 1],
    type: "synthesis",
    energyChange: "exothermic",
    baselContext: `At the Roche Esterification Laboratory, Dr. Hartmann demonstrates Fischer esterification—a crucial reaction for pharmaceutical formulations. The mechanism animation shows methanol attacking the protonated carbonyl carbon of benzoic acid, forming a tetrahedral intermediate. The intermediate undergoes proton transfers and eliminates water, forming methyl benzoate. This acid-catalyzed reaction is exothermic, releasing 15 kJ per mole. The laboratory produces 500 kg of methyl benzoate monthly for topical anesthetic formulations. Dr. Hartmann explains that esterification is reversible—excess methanol drives the reaction forward. The detailed animation shows protonation of the carbonyl oxygen, nucleophilic attack, tetrahedral intermediate formation, proton transfers, and water elimination. Understanding this mechanism is essential for pharmaceutical chemists who synthesize ester prodrugs—inactive esters that enzymes convert to active drugs in the body, improving drug delivery and bioavailability.`
  },
  {
    id: "RS_ELITE_3",
    reactants: ["C6H5CH2Cl", "NaCN"],
    products: ["C6H5CH2CN", "NaCl"],
    coefficients: [1, 1, 1, 1],
    type: "single_replacement",
    energyChange: "exothermic",
    baselContext: `In the Roche Advanced Organic Chemistry Laboratory, Dr. Hoffmann demonstrates SN2 nucleophilic substitution—a fundamental mechanism in pharmaceutical synthesis. The animation shows cyanide ion approaching benzyl chloride from the backside, attacking the carbon while the C-Cl bond breaks, with both processes occurring simultaneously. This concerted mechanism inverts the stereochemistry at the carbon center. The laboratory uses this reaction to synthesize phenylacetonitrile, a pharmaceutical intermediate, producing 800 kg monthly. Dr. Hoffmann emphasizes safety—cyanide is extremely toxic, requiring specialized handling. The detailed animation shows the transition state where the carbon is partially bonded to both cyanide and chloride, illustrating the SN2 mechanism's concerted nature. Understanding SN2 mechanisms is crucial for pharmaceutical chemistry—many drug synthesis steps involve nucleophilic substitutions where stereochemistry control is essential for producing active drug enantiomers.`
  },
  {
    id: "RS_ELITE_4",
    reactants: ["C6H5OH", "CH3I"],
    products: ["C6H5OCH3", "HI"],
    coefficients: [1, 1, 1, 1],
    type: "synthesis",
    energyChange: "exothermic",
    baselContext: `At the Novartis Pharmaceutical Methylation Laboratory, Dr. Weber demonstrates Williamson ether synthesis—a key reaction for introducing methoxy groups into drug molecules. The mechanism animation shows phenoxide ion (formed by deprotonating phenol with base) attacking methyl iodide's carbon, displacing iodide through an SN2 mechanism. This exothermic reaction produces anisole (methoxybenzene) and hydrogen iodide. The laboratory performs 300 methylation reactions monthly for pharmaceutical synthesis. Dr. Weber explains that this reaction requires strong base to deprotonate phenol, generating the nucleophilic phenoxide ion. The animation shows base deprotonation, phenoxide formation, backside attack on methyl iodide, and iodide displacement. Understanding this mechanism is essential for pharmaceutical chemists—many drugs contain ether linkages introduced through Williamson synthesis. The reaction demonstrates how pharmaceutical chemists use mechanistic knowledge to design selective reactions that modify specific functional groups in complex molecules.`
  },
  {
    id: "RS_ELITE_5",
    reactants: ["C7H6O3", "C4H6O3"],
    products: ["C9H8O4", "CH3COOH"],
    coefficients: [1, 1, 1, 1],
    type: "synthesis",
    energyChange: "exothermic",
    baselContext: `In the Novartis Historical Pharmaceutical Laboratory, Dr. Schneider demonstrates aspirin synthesis mechanism—the reaction that established Basel's pharmaceutical industry. The detailed animation shows salicylic acid's hydroxyl group attacking acetic anhydride's carbonyl carbon, forming a tetrahedral intermediate. The intermediate collapses, expelling acetate and forming aspirin's ester bond. This exothermic reaction releases 20 kJ per mole. Dr. Schneider explains that this acetylation reaction, discovered in 1897, revolutionized medicine. The mechanism animation shows nucleophilic attack, tetrahedral intermediate formation, and acetate elimination. Modern Novartis facilities produce aspirin more efficiently, but this classical synthesis remains important for teaching pharmaceutical chemistry. Understanding this mechanism connects students to Basel's pharmaceutical heritage—aspirin was among the first synthetic drugs, with global sales exceeding 40,000 tons annually. The reaction exemplifies how mechanistic understanding enables pharmaceutical innovation, establishing Basel as a global pharmaceutical center.`
  }
];

// ============================================================================
// EXPORT ALL QUEST DATA
// ============================================================================

/**
 * All quest data organized by stage and difficulty
 */
export const allQuestData = {
  REACTION_TYPES: {
    BASIC: reactionTypesBasic,
    CORE: reactionTypesCore,
    ADVANCED: reactionTypesAdvanced,
    ELITE: reactionTypesElite
  },
  EQUATION_BALANCING: {
    BASIC: equationBalancingBasic,
    CORE: equationBalancingCore,
    ADVANCED: equationBalancingAdvanced,
    ELITE: equationBalancingElite
  },
  REACTION_SIMULATION: {
    BASIC: reactionSimulationBasic,
    CORE: reactionSimulationCore,
    ADVANCED: reactionSimulationAdvanced,
    ELITE: reactionSimulationElite
  }
};

/**
 * Get quest data for a specific stage and difficulty
 */
export function getQuestData(stage: string, difficulty: string): RawQuestData[] {
  const stageData = allQuestData[stage as keyof typeof allQuestData];
  if (!stageData) return [];

  return stageData[difficulty as keyof typeof stageData] || [];
}

/**
 * Get total quest count
 */
export function getTotalQuestCount(): number {
  let total = 0;
  Object.values(allQuestData).forEach(stage => {
    Object.values(stage).forEach(difficulty => {
      total += difficulty.length;
    });
  });
  return total;
}
