/**
 * SC2.07 Enthalpy & Energetics - Quest Data
 * 
 * This file contains all quest data for the Energy Changes stage:
 * - Energy Changes (20 quests: 5 BASIC, 5 CORE, 5 ADVANCED, 5 ELITE)
 * 
 * Each quest includes:
 * - Detailed Basel-specific context (150-250 words)
 * - Thermochemical equations with state symbols
 * - Accurate enthalpy values
 * - Pharmaceutical industry connections
 * 
 * Requirements: 1.1, 1.5, 2.4, 10.1, 11.1
 */

/**
 * Raw quest data structure for Energy Changes stage
 */
interface RawEnergyChangesData {
  id: string;
  reaction: string;
  reactionLatex: string;
  deltaH: number; // kJ or kJ/mol
  reactionType: "exothermic" | "endothermic";
  baselContext: string;
}

// ============================================================================
// ENERGY CHANGES STAGE - 20 QUESTS
// ============================================================================

/**
 * Energy Changes - BASIC Difficulty (5 quests)
 * Simple ΔH calculations and exo/endo identification
 * Requirements: 1.1, 1.5, 2.4, 10.1, 11.1
 */
export const energyChangesBasic: RawEnergyChangesData[] = [
  {
    id: "EC_BASIC_1",
    reaction: "H2(g) + 1/2 O2(g) → H2O(l)",
    reactionLatex: "\\text{H}_2(g) + \\frac{1}{2}\\text{O}_2(g) \\rightarrow \\text{H}_2\\text{O}(l)",
    deltaH: -286,
    reactionType: "exothermic",
    baselContext: `At the Basel University Chemistry Department's Hydrogen Energy Research Laboratory, doctoral student Emma investigates water formation for fuel cell applications. When hydrogen gas combines with oxygen to form liquid water, the reaction releases 286 kJ of energy per mole—a highly exothermic process. This fundamental reaction powers the prototype fuel cells being developed in partnership with Novartis for sustainable pharmaceutical manufacturing. Emma's research team has built a 10-kilowatt fuel cell system that generates electricity while producing only pure water as a byproduct. The laboratory, located in the historic Kollegienhaus building near Petersplatz, collaborates with Roche and Novartis to develop clean energy solutions for Basel's pharmaceutical industry. Professor Weber explains that understanding this exothermic reaction is crucial for fuel cell design—the released energy must be managed carefully to prevent overheating. The project has attracted 5 million Swiss francs in research funding and aims to power Novartis's St. Johann campus with hydrogen fuel cells by 2028, reducing Basel's pharmaceutical industry carbon footprint by 15,000 tons of CO2 annually.`
  },
  {
    id: "EC_BASIC_2",
    reaction: "N2(g) + O2(g) → 2NO(g)",
    reactionLatex: "\\text{N}_2(g) + \\text{O}_2(g) \\rightarrow 2\\text{NO}(g)",
    deltaH: 180,
    reactionType: "endothermic",
    baselContext: `In the Basel Environmental Monitoring Station near the Rhine River, technician Marco analyzes nitrogen oxide formation in urban air. This endothermic reaction requires 180 kJ of energy per mole to break the strong triple bond in nitrogen molecules and form nitrogen monoxide. The reaction occurs naturally during thunderstorms when lightning provides the necessary energy, and also in vehicle engines at high temperatures. Basel's air quality network monitors NO levels at 15 stations throughout the city, with particular attention to the busy Autobahn A2 corridor where 80,000 vehicles pass daily. Marco explains to visiting Gymnasium students that this endothermic process contributes to photochemical smog formation, which is why Basel invested 45 million Swiss francs in expanding its tram network to reduce vehicle emissions. The monitoring station, operated jointly by Basel's Environmental Department and the Swiss Federal Office for the Environment, provides real-time data that helps Novartis and Roche maintain strict emission controls at their facilities. Understanding this endothermic reaction helps students appreciate why high-temperature combustion processes require careful environmental management to protect Basel's air quality for its 175,000 residents.`
  },
  {
    id: "EC_BASIC_3",
    reaction: "CH4(g) + 2O2(g) → CO2(g) + 2H2O(l)",
    reactionLatex: "\\text{CH}_4(g) + 2\\text{O}_2(g) \\rightarrow \\text{CO}_2(g) + 2\\text{H}_2\\text{O}(l)",
    deltaH: -890,
    reactionType: "exothermic",
    baselContext: `At Basel's District Heating Facility in Voltastrasse, engineer Dr. Andreas monitors methane combustion that provides heating for 15,000 Basel households during winter months. This highly exothermic reaction releases 890 kJ per mole of methane burned, generating the thermal energy distributed through Basel's 120-kilometer heating network. The facility processes 45 million cubic meters of natural gas annually, with sophisticated combustion control systems ensuring complete oxidation and minimal emissions. Dr. Andreas explains to visiting Sekundarschule students that the negative ΔH value indicates energy release—the bonds formed in CO2 and H2O are stronger than those broken in CH4 and O2, with the excess energy released as heat. The facility's heat recovery systems capture 95% of the combustion energy, making it one of Switzerland's most efficient district heating operations. Basel's commitment to sustainability includes plans to transition from natural gas to renewable biogas by 2030, maintaining the same exothermic combustion chemistry while reducing fossil fuel dependence. Understanding this reaction's energetics helps students appreciate how chemical energy transforms into the warmth that heats their homes during Basel's cold winters, when temperatures regularly drop below freezing.`
  },
  {
    id: "EC_BASIC_4",
    reaction: "CaCO3(s) → CaO(s) + CO2(g)",
    reactionLatex: "\\text{CaCO}_3(s) \\rightarrow \\text{CaO}(s) + \\text{CO}_2(g)",
    deltaH: 178,
    reactionType: "endothermic",
    baselContext: `At the Basel Construction Materials Laboratory in Kleinhüningen, engineer Sarah demonstrates limestone decomposition for cement production. When calcium carbonate is heated to 900°C in a kiln, it absorbs 178 kJ per mole to break apart into calcium oxide (quicklime) and carbon dioxide gas—a classic endothermic process. This reaction is fundamental to producing cement, which Basel uses extensively in major construction projects including the Roche Tower, Switzerland's tallest building at 178 meters, and the new Novartis campus designed by renowned architects. The laboratory tests materials for Basel's growing infrastructure needs, analyzing 500 cement samples monthly to ensure quality standards. Sarah explains that the positive ΔH value indicates energy absorption—continuous heat input is required to maintain the reaction, which is why cement kilns operate at such high temperatures. The CO2 released during limestone decomposition contributes significantly to greenhouse gas emissions, accounting for 8% of global CO2 production. This environmental concern has motivated Basel's construction industry to research alternative binders and carbon capture technologies. Understanding this endothermic reaction helps students appreciate the energy costs of construction materials and why Basel is investing in sustainable building practices for its urban development projects.`
  },
  {
    id: "EC_BASIC_5",
    reaction: "2H2O2(l) → 2H2O(l) + O2(g)",
    reactionLatex: "2\\text{H}_2\\text{O}_2(l) \\rightarrow 2\\text{H}_2\\text{O}(l) + \\text{O}_2(g)",
    deltaH: -196,
    reactionType: "exothermic",
    baselContext: `In the Roche Pharmaceutical Sterilization Facility at Grenzacherstrasse, quality control specialist Dr. Müller monitors hydrogen peroxide decomposition used for sterilizing medical equipment and pharmaceutical packaging. This exothermic reaction releases 196 kJ per two moles of hydrogen peroxide, breaking down into harmless water and oxygen gas. The facility uses 10,000 liters of hydrogen peroxide monthly for sterilization processes, ensuring that Roche's medications remain contamination-free from production to patient delivery. Dr. Müller explains that while this decomposition occurs slowly at room temperature, it accelerates dramatically with catalysts like manganese dioxide or the enzyme catalase found in living cells. The negative ΔH indicates energy release, which is why concentrated hydrogen peroxide must be stored carefully—rapid decomposition in confined spaces can cause dangerous pressure buildup. The facility's automated systems precisely control hydrogen peroxide concentration and decomposition rates, maintaining sterile conditions while ensuring worker safety. Understanding this exothermic reaction is crucial for pharmaceutical manufacturing, where sterilization must be effective yet gentle enough not to damage sensitive drug compounds. Roche's Basel facilities process 50 million pharmaceutical units annually, all requiring careful sterilization using reactions like hydrogen peroxide decomposition.`
  }
];

/**
 * Energy Changes - CORE Difficulty (5 quests)
 * Energy diagrams and activation energy concepts
 * Requirements: 1.1, 1.5, 2.4, 10.2, 11.1
 */
export const energyChangesCore: RawEnergyChangesData[] = [
  {
    id: "EC_CORE_1",
    reaction: "C2H5OH(l) + 3O2(g) → 2CO2(g) + 3H2O(l)",
    reactionLatex: "\\text{C}_2\\text{H}_5\\text{OH}(l) + 3\\text{O}_2(g) \\rightarrow 2\\text{CO}_2(g) + 3\\text{H}_2\\text{O}(l)",
    deltaH: -1367,
    reactionType: "exothermic",
    baselContext: `At the Roche Solvent Recovery Facility in Basel's Kaiseraugst industrial complex, process engineer Dr. Chen manages ethanol combustion for pharmaceutical solvent waste disposal. Ethanol, the most widely used solvent in pharmaceutical synthesis, releases 1,367 kJ per mole when completely combusted—a highly exothermic process that the facility harnesses for energy recovery. The facility processes 5,000 liters of contaminated ethanol monthly, burning it at 1,200°C in a specialized incinerator that captures heat energy for building heating and hot water production. Dr. Chen explains that the large negative ΔH value reflects the formation of very stable CO2 and H2O molecules from less stable ethanol and oxygen. The energy diagram for this reaction shows reactants at a higher energy level than products, with the difference representing released heat. Understanding this exothermic combustion is crucial for pharmaceutical operations—Roche uses ethanol in synthesizing 200 different drug compounds annually, and safe disposal of contaminated solvent is essential for environmental protection. The facility's heat recovery systems convert 85% of the combustion energy into useful heat, reducing Roche's natural gas consumption by 2 million cubic meters annually and demonstrating how pharmaceutical companies can turn waste management into energy efficiency.`
  },
  {
    id: "EC_CORE_2",
    reaction: "NH4NO3(s) → N2O(g) + 2H2O(g)",
    reactionLatex: "\\text{NH}_4\\text{NO}_3(s) \\rightarrow \\text{N}_2\\text{O}(g) + 2\\text{H}_2\\text{O}(g)",
    deltaH: -36,
    reactionType: "exothermic",
    baselContext: `In the Novartis Chemical Safety Laboratory at St. Johann, safety officer Dr. Hoffmann demonstrates ammonium nitrate decomposition to illustrate the importance of proper chemical storage. While this reaction releases only 36 kJ per mole—making it mildly exothermic—it can become explosive under certain conditions due to rapid gas production. The laboratory trains 500 pharmaceutical chemists annually in recognizing and managing potentially hazardous reactions. Dr. Hoffmann explains that ammonium nitrate is used in some pharmaceutical synthesis processes, but its decomposition properties require strict storage protocols including temperature control below 30°C and separation from combustible materials. The small negative ΔH might seem insignificant, but when large quantities decompose rapidly, the heat accumulation can trigger runaway reactions. Basel's pharmaceutical industry learned this lesson from historical industrial accidents, leading to comprehensive safety regulations. The energy diagram shows a small energy decrease from reactants to products, but the activation energy barrier is relatively low, meaning the reaction can initiate easily with heat or contamination. Understanding this exothermic decomposition helps pharmaceutical chemists design safe storage and handling procedures, ensuring that Novartis's Basel facilities maintain their exemplary safety record of zero major incidents in 15 years.`
  },
  {
    id: "EC_CORE_3",
    reaction: "C3H8(g) + 5O2(g) → 3CO2(g) + 4H2O(l)",
    reactionLatex: "\\text{C}_3\\text{H}_8(g) + 5\\text{O}_2(g) \\rightarrow 3\\text{CO}_2(g) + 4\\text{H}_2\\text{O}(l)",
    deltaH: -2220,
    reactionType: "exothermic",
    baselContext: `At the Basel Chemistry Institute's Combustion Analysis Laboratory, Professor Weber teaches students about propane combustion energetics using advanced calorimetry equipment. Propane, commonly used in laboratory Bunsen burners and portable heaters, releases an impressive 2,220 kJ per mole when burned—one of the highest energy densities among common fuels. The laboratory consumes approximately 200 kg of propane monthly for heating experiments, analytical procedures, and student demonstrations. Professor Weber uses energy diagrams to illustrate why this reaction is so exothermic: the strong C=O bonds in CO2 and O-H bonds in water contain much less potential energy than the C-H and C-C bonds in propane plus O=O bonds in oxygen. The institute, located in Basel's historic university quarter near the Botanical Garden, emphasizes that understanding combustion stoichiometry and energetics is essential for laboratory safety. Insufficient oxygen leads to incomplete combustion, producing toxic carbon monoxide and reducing energy output. This knowledge is vital for pharmaceutical chemists at Novartis and Roche who work with flammable organic solvents in enclosed laboratory spaces. The large negative ΔH explains why propane is such an effective fuel, but also why propane leaks are extremely dangerous—the enormous energy release during combustion can cause devastating explosions if propane accumulates in confined spaces.`
  },
  {
    id: "EC_CORE_4",
    reaction: "C(s) + H2O(g) → CO(g) + H2(g)",
    reactionLatex: "\\text{C}(s) + \\text{H}_2\\text{O}(g) \\rightarrow \\text{CO}(g) + \\text{H}_2(g)",
    deltaH: 131,
    reactionType: "endothermic",
    baselContext: `In the Basel Industrial Chemistry Museum's historical exhibits, curator Dr. Schneider explains the water-gas reaction that powered 19th-century Basel's industrial development. When steam passes over hot carbon (coke), it produces carbon monoxide and hydrogen gas—a mixture called "water gas" that was used for heating and lighting before natural gas became available. This endothermic reaction requires 131 kJ per mole, which was provided by maintaining the carbon bed at 1,000°C. The museum, located in Basel's former industrial district of Kleinhüningen, preserves equipment from Basel's manufacturing heritage when the city produced textiles, chemicals, and machinery. Dr. Schneider explains that while this reaction is no longer used for fuel production, its principles remain relevant to modern pharmaceutical chemistry. Novartis uses similar endothermic gasification reactions to convert pharmaceutical waste into synthesis gas for energy recovery. The positive ΔH indicates continuous energy input is required—the reaction stops if heating ceases. Understanding endothermic industrial processes helps students appreciate how Basel's pharmaceutical industry evolved from 19th-century chemical manufacturing. The museum attracts 5,000 visitors annually, connecting Basel's industrial past to its present role as a global pharmaceutical center where companies like Novartis and Roche continue Basel's tradition of chemical innovation.`
  },
  {
    id: "EC_CORE_5",
    reaction: "2SO2(g) + O2(g) → 2SO3(g)",
    reactionLatex: "2\\text{SO}_2(g) + \\text{O}_2(g) \\rightarrow 2\\text{SO}_3(g)",
    deltaH: -198,
    reactionType: "exothermic",
    baselContext: `At the Novartis Sulfuric Acid Production Facility in Basel's Schweizerhalle industrial area, chemical engineer Dr. Zimmermann oversees the catalytic oxidation of sulfur dioxide to sulfur trioxide—a key step in producing sulfuric acid for pharmaceutical synthesis. This exothermic reaction releases 198 kJ per two moles of SO2, with the heat carefully managed using heat exchangers to maintain optimal reaction temperature of 450°C. The facility produces 500 tons of sulfuric acid monthly, which Novartis uses in synthesizing over 100 different pharmaceutical compounds. Dr. Zimmermann explains that this reaction occurs over a vanadium pentoxide catalyst, and the exothermic nature means excess heat must be removed to prevent catalyst deactivation and maintain high conversion efficiency. The energy diagram shows products at lower energy than reactants, with the released energy captured for preheating incoming gases—an example of process integration that improves energy efficiency by 30%. Understanding this exothermic equilibrium reaction is crucial for pharmaceutical chemists, as temperature control affects both reaction rate and equilibrium position. The facility's sophisticated control systems monitor temperature, pressure, and conversion rates in real-time, ensuring consistent sulfuric acid quality for pharmaceutical applications while minimizing environmental impact through 99.9% sulfur dioxide capture efficiency.`
  }
];

/**
 * Energy Changes - ADVANCED Difficulty (5 quests)
 * Activation energy and reaction coordinate diagrams
 * Requirements: 1.1, 1.5, 2.4, 10.3, 11.1
 */
export const energyChangesAdvanced: RawEnergyChangesData[] = [
  {
    id: "EC_ADVANCED_1",
    reaction: "2H2O2(l) → 2H2O(l) + O2(g)",
    reactionLatex: "2\\text{H}_2\\text{O}_2(l) \\rightarrow 2\\text{H}_2\\text{O}(l) + \\text{O}_2(g)",
    deltaH: -196,
    reactionType: "exothermic",
    baselContext: `In the Roche Pharmaceutical Catalysis Research Laboratory, Dr. Maria Hartmann investigates how catalysts affect hydrogen peroxide decomposition kinetics for pharmaceutical applications. While this exothermic reaction releases 196 kJ per two moles, it proceeds extremely slowly at room temperature due to a high activation energy barrier of approximately 75 kJ/mol. However, adding manganese dioxide catalyst or the enzyme catalase reduces the activation energy to just 8 kJ/mol, causing rapid decomposition with vigorous oxygen bubbling. Dr. Hartmann's team studies this reaction because understanding activation energy is crucial for pharmaceutical synthesis—many drug-producing reactions have favorable thermodynamics (negative ΔH) but require catalysts to proceed at practical rates. The laboratory tests 50 different catalysts monthly for various pharmaceutical reactions. The reaction coordinate diagram shows that while the overall energy change remains -196 kJ regardless of catalyst, the activation energy barrier determines reaction rate. This principle guides pharmaceutical process development at Roche, where selecting appropriate catalysts can reduce reaction times from days to hours, dramatically improving production efficiency. The research has led to 15 patents for novel pharmaceutical catalysts. Understanding the distinction between thermodynamics (ΔH) and kinetics (activation energy) is essential for pharmaceutical chemists developing efficient synthesis routes for the 200+ drug compounds Roche manufactures in Basel.`
  },
  {
    id: "EC_ADVANCED_2",
    reaction: "N2(g) + 3H2(g) → 2NH3(g)",
    reactionLatex: "\\text{N}_2(g) + 3\\text{H}_2(g) \\rightarrow 2\\text{NH}_3(g)",
    deltaH: -92,
    reactionType: "exothermic",
    baselContext: `At the Novartis Advanced Process Chemistry Laboratory in St. Johann, Dr. Thomas Weber leads research on ammonia synthesis optimization for pharmaceutical applications. The Haber-Bosch process, which combines nitrogen and hydrogen to form ammonia, releases 92 kJ per two moles of ammonia produced—a moderately exothermic reaction. However, the activation energy for breaking nitrogen's triple bond is extremely high at 420 kJ/mol, requiring temperatures of 450°C and pressures of 200 atmospheres even with iron catalysts. The laboratory produces 50 tons of ammonia annually for synthesizing pharmaceutical intermediates, amino acids, and cleaning agents. Dr. Weber explains that this reaction demonstrates a crucial principle: exothermic reactions aren't necessarily fast or spontaneous. The energy diagram shows a large activation energy barrier that must be overcome before the reaction proceeds, even though products are more stable than reactants. Novartis's research focuses on developing better catalysts to reduce the activation energy, potentially allowing ammonia synthesis at lower temperatures and pressures, which would save energy and reduce costs. This research has implications beyond ammonia production—understanding how to lower activation barriers while maintaining selectivity is fundamental to pharmaceutical synthesis, where many reactions require harsh conditions that can damage sensitive drug molecules. The laboratory's work on catalyst design has contributed to three recent publications in leading chemistry journals.`
  },
  {
    id: "EC_ADVANCED_3",
    reaction: "C6H12O6(s) + 6O2(g) → 6CO2(g) + 6H2O(l)",
    reactionLatex: "\\text{C}_6\\text{H}_{12}\\text{O}_6(s) + 6\\text{O}_2(g) \\rightarrow 6\\text{CO}_2(g) + 6\\text{H}_2\\text{O}(l)",
    deltaH: -2808,
    reactionType: "exothermic",
    baselContext: `In the Basel Biochemistry Research Institute's Metabolic Studies Laboratory, Professor Anna Keller uses glucose combustion to teach students about cellular respiration energetics. While glucose doesn't literally burn in our bodies, cellular respiration is essentially controlled combustion that releases 2,808 kJ per mole through multiple enzymatic steps. This enormous exothermic energy release powers all biological processes, with cells capturing approximately 38% of the energy in ATP molecules while the rest dissipates as heat. Professor Keller's research team studies metabolic disorders where glucose oxidation is impaired, collaborating with Roche Diagnostics to develop blood glucose monitors used by 50,000 diabetes patients in Switzerland. The reaction coordinate diagram for cellular respiration shows multiple intermediate steps, each with its own activation energy barrier lowered by specific enzymes. This multi-step pathway allows cells to capture energy gradually rather than releasing it all at once, which would generate destructive heat. Understanding this exothermic process is crucial for pharmaceutical development—Novartis and Roche invest heavily in diabetes medications that help regulate glucose metabolism. The institute's research has contributed to understanding how metformin, one of the world's most prescribed diabetes drugs, affects cellular energy metabolism. The laboratory's work demonstrates how fundamental thermochemistry principles apply to biological systems, connecting chemistry education to pharmaceutical applications that improve lives for millions of patients worldwide.`
  },
  {
    id: "EC_ADVANCED_4",
    reaction: "CaO(s) + H2O(l) → Ca(OH)2(s)",
    reactionLatex: "\\text{CaO}(s) + \\text{H}_2\\text{O}(l) \\rightarrow \\text{Ca(OH)}_2(s)",
    deltaH: -65,
    reactionType: "exothermic",
    baselContext: `At the Roche Pharmaceutical pH Control Laboratory in Grenzacherstrasse, analytical chemist Dr. Lisa Müller demonstrates calcium oxide hydration for teaching pharmaceutical students about exothermic reactions and their applications. When quicklime (CaO) reacts with water, it releases 65 kJ per mole and produces calcium hydroxide—a reaction so exothermic that the solid becomes hot enough to boil water. This reaction is used in pharmaceutical manufacturing for pH adjustment and as a desiccant to remove moisture from sensitive compounds. The laboratory uses 200 kg of calcium oxide monthly in various pharmaceutical processes. Dr. Müller explains that while the ΔH of -65 kJ/mol seems modest, the reaction's low activation energy means it proceeds rapidly and spontaneously upon water contact, releasing heat quickly enough to cause burns. The energy diagram shows a small activation barrier, explaining why this reaction begins immediately when water touches quicklime. Understanding this exothermic hydration is important for pharmaceutical safety—calcium oxide must be stored in moisture-free conditions to prevent spontaneous reaction and heat generation. Roche uses this reaction's heat-generating property in self-heating pharmaceutical packaging for temperature-sensitive medications during transport. The laboratory's research on controlled exothermic reactions has led to innovations in pharmaceutical formulation, where heat generation can be harnessed for drug activation or controlled release applications.`
  },
  {
    id: "EC_ADVANCED_5",
    reaction: "CH4(g) + H2O(g) → CO(g) + 3H2(g)",
    reactionLatex: "\\text{CH}_4(g) + \\text{H}_2\\text{O}(g) \\rightarrow \\text{CO}(g) + 3\\text{H}_2(g)",
    deltaH: 206,
    reactionType: "endothermic",
    baselContext: `In the Novartis Hydrogen Production Facility at Schweizerhalle, process engineer Dr. Stefan Zimmermann oversees steam methane reforming—the primary industrial method for producing hydrogen gas used in pharmaceutical synthesis. This endothermic reaction requires 206 kJ per mole of methane, with energy supplied by burning additional methane to maintain reactor temperature at 850°C. The facility produces 5,000 cubic meters of hydrogen daily for hydrogenation reactions in drug synthesis, where hydrogen atoms are added to organic molecules to create specific pharmaceutical compounds. Dr. Zimmermann explains that the high positive ΔH means continuous energy input is essential—if heating stops, the reaction ceases immediately. The reaction coordinate diagram shows a high activation energy barrier of approximately 240 kJ/mol, which is lowered to 180 kJ/mol using nickel catalysts. Understanding this endothermic process is crucial for pharmaceutical manufacturing economics—the energy cost of hydrogen production significantly impacts drug manufacturing expenses. Novartis's research focuses on improving catalyst efficiency to reduce the activation energy further, potentially lowering hydrogen production costs by 15%. This research has broader implications for Basel's transition to hydrogen economy, as the city plans to use hydrogen for public transportation and heating. The facility's work demonstrates how pharmaceutical chemistry research contributes to sustainable energy solutions beyond drug manufacturing.`
  }
];

/**
 * Energy Changes - ELITE Difficulty (5 quests)
 * Pharmaceutical synthesis energetics with real drug reactions
 * Requirements: 1.1, 1.5, 2.4, 10.4, 11.1, 11.7, 22.1
 */
export const energyChangesElite: RawEnergyChangesData[] = [
  {
    id: "EC_ELITE_1",
    reaction: "C7H6O3(s) + C4H6O3(l) → C9H8O4(s) + CH3COOH(l)",
    reactionLatex: "\\text{C}_7\\text{H}_6\\text{O}_3(s) + \\text{C}_4\\text{H}_6\\text{O}_3(l) \\rightarrow \\text{C}_9\\text{H}_8\\text{O}_4(s) + \\text{CH}_3\\text{COOH}(l)",
    deltaH: -180,
    reactionType: "exothermic",
    baselContext: `In the Novartis Historical Pharmaceutical Synthesis Laboratory at St. Johann, senior research chemist Dr. Heinrich Schneider demonstrates the classic aspirin synthesis that established Basel as a pharmaceutical center in 1897. When salicylic acid reacts with acetic anhydride, it produces acetylsalicylic acid (aspirin) and acetic acid, releasing 180 kJ per mole—a moderately exothermic reaction that requires careful temperature control to prevent decomposition. This synthesis, discovered by Novartis chemist Felix Hoffmann, revolutionized pain management and launched the modern pharmaceutical industry. While contemporary Novartis facilities use more efficient continuous-flow processes, this classical batch synthesis remains important for teaching pharmaceutical chemistry principles. The laboratory produces 50 kg of aspirin monthly using traditional methods for educational purposes and quality comparison studies. Dr. Schneider explains that the exothermic nature requires cooling to maintain reaction temperature at 85°C—too hot and aspirin decomposes, too cold and the reaction proceeds too slowly for industrial production. The energy released during acetylation reflects the formation of the stable ester bond in aspirin. Modern Novartis facilities in Basel produce 5,000 tons of aspirin annually for global distribution, with process optimization reducing energy consumption by 40% compared to historical methods. Understanding this exothermic pharmaceutical synthesis helps students appreciate how thermochemical principles guide industrial drug manufacturing, where energy management affects both product quality and production costs. This reaction exemplifies how fundamental chemistry transformed medicine and established Basel's pharmaceutical excellence.`
  },
  {
    id: "EC_ELITE_2",
    reaction: "C6H5NH2(l) + CH3COCl(l) → C6H5NHCOCH3(s) + HCl(g)",
    reactionLatex: "\\text{C}_6\\text{H}_5\\text{NH}_2(l) + \\text{CH}_3\\text{COCl}(l) \\rightarrow \\text{C}_6\\text{H}_5\\text{NHCOCH}_3(s) + \\text{HCl}(g)",
    deltaH: -285,
    reactionType: "exothermic",
    baselContext: `At the Novartis Advanced Pharmaceutical Synthesis Facility in Klybeck, Dr. Wei Chen leads the acetylation of aniline to produce acetanilide—a crucial pharmaceutical intermediate used in synthesizing analgesic and antipyretic medications. This highly exothermic reaction releases 285 kJ per mole, requiring sophisticated cooling systems to maintain reaction temperature at 5°C and prevent runaway reactions. The facility produces 2 tons of acetanilide monthly using jacketed reactors with automated temperature control that can remove heat at rates up to 50 kW. Dr. Chen explains that acetylation reactions are fundamental to pharmaceutical chemistry—the same reaction type produces aspirin from salicylic acid, and many modern drugs contain acetyl groups introduced through similar exothermic processes. The large negative ΔH reflects the strong amide bond formation in acetanilide, but this energy release presents engineering challenges for scale-up. The facility's reaction calorimetry systems continuously monitor heat generation rates, allowing operators to adjust cooling and reagent addition rates to maintain safe conditions. Understanding exothermic pharmaceutical synthesis is essential for process safety—inadequate cooling can lead to temperature runaway, causing product decomposition or even explosions. Novartis's investment in advanced process control has maintained zero thermal runaway incidents in 20 years of operation. The facility demonstrates how pharmaceutical companies manage exothermic reactions at industrial scale, balancing reaction kinetics, heat removal, and product quality to manufacture medications safely and efficiently for patients worldwide.`
  },
  {
    id: "EC_ELITE_3",
    reaction: "C14H18N2O5(aq) + H2O(l) → C7H6O3(aq) + C7H14N2O3(aq)",
    reactionLatex: "\\text{C}_{14}\\text{H}_{18}\\text{N}_2\\text{O}_5(aq) + \\text{H}_2\\text{O}(l) \\rightarrow \\text{C}_7\\text{H}_6\\text{O}_3(aq) + \\text{C}_7\\text{H}_{14}\\text{N}_2\\text{O}_3(aq)",
    deltaH: 45,
    reactionType: "endothermic",
    baselContext: `In the Roche Pharmaceutical Hydrolysis Laboratory at Grenzacherstrasse, Dr. Maria Hoffmann oversees the controlled hydrolysis of aspartame—an artificial sweetener—to study peptide bond cleavage mechanisms relevant to drug metabolism. This endothermic reaction requires 45 kJ per mole to break the peptide bond, producing aspartic acid and phenylalanine methyl ester. While aspartame itself isn't a Roche product, understanding its hydrolysis helps pharmaceutical chemists predict how peptide-based drugs break down in the body. The laboratory processes 100 kg of various peptide compounds monthly, studying hydrolysis kinetics under different pH and temperature conditions. Dr. Hoffmann explains that the positive ΔH indicates energy input is required to break the stable peptide bond—this is why peptide drugs often have good stability and long shelf lives. However, in the body, enzymes lower the activation energy for hydrolysis, allowing peptide bonds to break at body temperature. This research is crucial for Roche's development of peptide-based therapeutics, including insulin analogs and growth hormone formulations used by thousands of Swiss patients. The laboratory's calorimetry studies measure the exact energy requirements for peptide bond hydrolysis, data that guides formulation scientists in predicting drug stability and designing appropriate storage conditions. Understanding endothermic hydrolysis reactions helps pharmaceutical companies ensure their medications remain effective throughout their shelf life, maintaining the therapeutic benefits that patients depend on for managing chronic conditions like diabetes and growth disorders.`
  },
  {
    id: "EC_ELITE_4",
    reaction: "C6H5CH2Cl(l) + NaCN(aq) → C6H5CH2CN(l) + NaCl(aq)",
    reactionLatex: "\\text{C}_6\\text{H}_5\\text{CH}_2\\text{Cl}(l) + \\text{NaCN}(aq) \\rightarrow \\text{C}_6\\text{H}_5\\text{CH}_2\\text{CN}(l) + \\text{NaCl}(aq)",
    deltaH: -125,
    reactionType: "exothermic",
    baselContext: `At the Roche High-Containment Synthesis Laboratory in Basel's Kaiseraugst facility, Dr. Andreas Weber supervises the synthesis of phenylacetonitrile from benzyl chloride and sodium cyanide—a key intermediate for producing cardiovascular medications. This exothermic nucleophilic substitution releases 125 kJ per mole as the cyanide ion displaces chloride, forming a carbon-nitrogen bond. The facility produces 800 kg of phenylacetonitrile monthly under strict safety protocols due to cyanide toxicity, operating in negative-pressure containment with advanced scrubbing systems that neutralize any cyanide vapors. Dr. Weber explains that while the moderate negative ΔH makes this reaction manageable thermally, the extreme toxicity of cyanide requires extraordinary safety measures—the laboratory has maintained zero cyanide exposure incidents in 20 years through rigorous training and engineering controls. The exothermic nature actually aids safety by allowing the reaction to proceed at room temperature, avoiding the need for heating that could volatilize cyanide. This synthesis demonstrates how pharmaceutical chemists balance thermodynamic favorability with safety considerations. The phenylacetonitrile produced undergoes further reactions to create medications treating hypertension and heart failure, benefiting 100,000 Swiss patients annually. Roche's investment in safe handling of hazardous exothermic reactions exemplifies pharmaceutical industry commitment to worker safety and environmental protection. Understanding the energetics of this reaction helps chemists design safer processes, potentially replacing cyanide with less toxic reagents while maintaining the favorable thermodynamics that make this synthesis economically viable for large-scale pharmaceutical production.`
  },
  {
    id: "EC_ELITE_5",
    reaction: "C17H19NO3(s) + H2(g) → C17H21NO3(s)",
    reactionLatex: "\\text{C}_{17}\\text{H}_{19}\\text{NO}_3(s) + \\text{H}_2(g) \\rightarrow \\text{C}_{17}\\text{H}_{21}\\text{NO}_3(s)",
    deltaH: -220,
    reactionType: "exothermic",
    baselContext: `In the Novartis Catalytic Hydrogenation Facility at Schweizerhalle, principal scientist Dr. Thomas Keller oversees the final step in morphine synthesis—the catalytic hydrogenation of codeinone to codeine, a critical pain management medication. This exothermic reaction releases 220 kJ per mole as hydrogen molecules add across a carbon-carbon double bond, catalyzed by palladium on carbon at 50°C and 10 atmospheres pressure. The facility produces 500 kg of codeine monthly for pharmaceutical formulations, using sophisticated pressure reactors with precise temperature control to manage the exothermic heat release. Dr. Keller explains that hydrogenation reactions are among the most important in pharmaceutical synthesis—adding hydrogen atoms allows chemists to reduce specific functional groups while leaving others intact, creating the precise molecular structures needed for drug activity. The negative ΔH reflects the formation of strong C-H bonds from weaker C=C and H-H bonds, but the reaction requires a catalyst to lower the activation energy barrier. Without palladium catalyst, the activation energy exceeds 200 kJ/mol and the reaction doesn't proceed at practical rates despite favorable thermodynamics. This synthesis exemplifies pharmaceutical chemistry sophistication—controlling stereochemistry, managing exothermic heat, handling high-pressure hydrogen safely, and achieving 99.8% purity required for pharmaceutical use. Novartis's Basel facilities have perfected this process over decades, producing codeine that helps manage pain for millions of patients worldwide while maintaining exemplary safety standards in handling flammable hydrogen and exothermic reactions at industrial scale.`
  }
];

// ============================================================================
// HESS'S LAW STAGE - 20 QUESTS
// ============================================================================

/**
 * Raw quest data structure for Hess's Law stage
 */
interface RawHessLawData {
  id: string;
  targetReaction: string;
  targetReactionLatex: string;
  targetDeltaH: number; // kJ or kJ/mol
  availableEquations: Array<{
    equation: string;
    equationLatex: string;
    deltaH: number;
  }>;
  baselContext: string;
}

/**
 * Hess's Law - BASIC Difficulty (5 quests)
 * Simple 2-step pathways
 * Requirements: 3.1, 3.5, 10.1, 11.1
 */
export const hessLawBasic: RawHessLawData[] = [
  {
    id: "HL_BASIC_1",
    targetReaction: "C(s) + O2(g) → CO2(g)",
    targetReactionLatex: "\\text{C}(s) + \\text{O}_2(g) \\rightarrow \\text{CO}_2(g)",
    targetDeltaH: -394,
    availableEquations: [
      {
        equation: "C(s) + 1/2 O2(g) → CO(g)",
        equationLatex: "\\text{C}(s) + \\frac{1}{2}\\text{O}_2(g) \\rightarrow \\text{CO}(g)",
        deltaH: -111
      },
      {
        equation: "CO(g) + 1/2 O2(g) → CO2(g)",
        equationLatex: "\\text{CO}(g) + \\frac{1}{2}\\text{O}_2(g) \\rightarrow \\text{CO}_2(g)",
        deltaH: -283
      }
    ],
    baselContext: `At the Basel Chemistry Institute's Thermochemistry Laboratory, Professor Weber demonstrates Hess's Law using carbon combustion pathways to teach Sekundarstufe II students about energy conservation in chemical reactions. Carbon can burn directly to carbon dioxide, or it can burn in two steps: first to carbon monoxide, then to carbon dioxide. Hess's Law states that the total enthalpy change is the same regardless of pathway—a fundamental principle discovered by Swiss-Russian chemist Germain Hess in 1840. Professor Weber explains that this principle is crucial for pharmaceutical chemistry at Novartis and Roche, where chemists often need to calculate enthalpy changes for reactions that can't be measured directly. The laboratory, located in Basel's historic university quarter near Petersplatz, uses precision calorimetry to verify Hess's Law experimentally. Students measure the heat released when carbon burns directly to CO2 (-394 kJ/mol) and compare it to the sum of the two-step pathway: C to CO (-111 kJ/mol) plus CO to CO2 (-283 kJ/mol), which equals -394 kJ/mol. This demonstration shows that energy is a state function—it depends only on initial and final states, not on the path taken. Understanding Hess's Law allows pharmaceutical chemists to calculate reaction energetics for complex synthesis pathways, helping optimize drug manufacturing processes at Basel's pharmaceutical facilities where energy efficiency directly impacts production costs and environmental sustainability.`
  },
  {
    id: "HL_BASIC_2",
    targetReaction: "S(s) + O2(g) → SO2(g)",
    targetReactionLatex: "\\text{S}(s) + \\text{O}_2(g) \\rightarrow \\text{SO}_2(g)",
    targetDeltaH: -297,
    availableEquations: [
      {
        equation: "S(s) + 3/2 O2(g) → SO3(g)",
        equationLatex: "\\text{S}(s) + \\frac{3}{2}\\text{O}_2(g) \\rightarrow \\text{SO}_3(g)",
        deltaH: -395
      },
      {
        equation: "SO2(g) + 1/2 O2(g) → SO3(g)",
        equationLatex: "\\text{SO}_2(g) + \\frac{1}{2}\\text{O}_2(g) \\rightarrow \\text{SO}_3(g)",
        deltaH: -98
      }
    ],
    baselContext: `In the Novartis Sulfur Chemistry Laboratory at Schweizerhalle, Dr. Anna Keller teaches pharmaceutical chemistry students about Hess's Law using sulfur oxidation reactions relevant to sulfuric acid production. Sulfur can oxidize directly to sulfur dioxide, or through an indirect pathway via sulfur trioxide. By applying Hess's Law, students calculate that the direct oxidation releases -297 kJ/mol by reversing the second equation and adding it to the first: S + 3/2 O2 → SO3 (-395 kJ) plus SO3 → SO2 + 1/2 O2 (+98 kJ) equals -297 kJ/mol. This calculation demonstrates how Hess's Law allows chemists to determine enthalpy changes for reactions that are difficult to measure directly. The laboratory produces 500 tons of sulfuric acid monthly for pharmaceutical synthesis, and understanding these energy relationships helps optimize the production process. Dr. Keller explains that Novartis uses sulfuric acid in synthesizing over 100 different drug compounds, making sulfur chemistry fundamental to pharmaceutical manufacturing. The facility's energy management systems use Hess's Law calculations to predict heat generation in multi-step reactions, ensuring safe operation and efficient heat recovery. Students learn that this 19th-century thermochemical principle remains essential for modern pharmaceutical engineering, where complex synthesis pathways require careful energy accounting to maintain safety and profitability in Basel's competitive pharmaceutical industry.`
  },
  {
    id: "HL_BASIC_3",
    targetReaction: "2C(s) + H2(g) → C2H2(g)",
    targetReactionLatex: "2\\text{C}(s) + \\text{H}_2(g) \\rightarrow \\text{C}_2\\text{H}_2(g)",
    targetDeltaH: 227,
    availableEquations: [
      {
        equation: "C2H2(g) + 5/2 O2(g) → 2CO2(g) + H2O(l)",
        equationLatex: "\\text{C}_2\\text{H}_2(g) + \\frac{5}{2}\\text{O}_2(g) \\rightarrow 2\\text{CO}_2(g) + \\text{H}_2\\text{O}(l)",
        deltaH: -1300
      },
      {
        equation: "C(s) + O2(g) → CO2(g)",
        equationLatex: "\\text{C}(s) + \\text{O}_2(g) \\rightarrow \\text{CO}_2(g)",
        deltaH: -394
      },
      {
        equation: "H2(g) + 1/2 O2(g) → H2O(l)",
        equationLatex: "\\text{H}_2(g) + \\frac{1}{2}\\text{O}_2(g) \\rightarrow \\text{H}_2\\text{O}(l)",
        deltaH: -286
      }
    ],
    baselContext: `At the Roche Organic Synthesis Training Laboratory in Grenzacherstrasse, instructor Dr. Thomas Müller uses acetylene formation to teach pharmaceutical chemistry students how to apply Hess's Law to endothermic reactions. Acetylene (ethyne) cannot be formed directly from carbon and hydrogen under normal conditions, but its formation enthalpy can be calculated using combustion data. Students construct an enthalpy cycle: reverse the acetylene combustion equation (+1300 kJ), add two times the carbon combustion equation (2 × -394 kJ), and add the hydrogen combustion equation (-286 kJ), yielding +227 kJ/mol for acetylene formation. This positive value explains why acetylene doesn't form spontaneously and requires high-energy methods like electric arc furnaces. Dr. Müller explains that understanding endothermic formation reactions is crucial for pharmaceutical synthesis, where many drug intermediates have positive formation enthalpies and require energy input. The laboratory trains 200 pharmaceutical chemists annually in thermochemical calculations that guide process development at Roche's Basel facilities. This Hess's Law exercise demonstrates how combustion data—which is easy to measure—can determine formation enthalpies that are impossible to measure directly, a technique pharmaceutical chemists use daily when designing new synthesis routes for the 150+ drug compounds Roche manufactures in Basel.`
  },
  {
    id: "HL_BASIC_4",
    targetReaction: "N2(g) + 2O2(g) → 2NO2(g)",
    targetReactionLatex: "\\text{N}_2(g) + 2\\text{O}_2(g) \\rightarrow 2\\text{NO}_2(g)",
    targetDeltaH: 68,
    availableEquations: [
      {
        equation: "N2(g) + O2(g) → 2NO(g)",
        equationLatex: "\\text{N}_2(g) + \\text{O}_2(g) \\rightarrow 2\\text{NO}(g)",
        deltaH: 180
      },
      {
        equation: "2NO(g) + O2(g) → 2NO2(g)",
        equationLatex: "2\\text{NO}(g) + \\text{O}_2(g) \\rightarrow 2\\text{NO}_2(g)",
        deltaH: -112
      }
    ],
    baselContext: `In the Basel Environmental Chemistry Laboratory near the Rhine River, researcher Dr. Lisa Hoffmann demonstrates Hess's Law using nitrogen dioxide formation to teach students about atmospheric chemistry and pollution control. Nitrogen dioxide, a brown toxic gas contributing to photochemical smog, forms through a two-step pathway: nitrogen and oxygen first form nitrogen monoxide (endothermic, +180 kJ), then nitrogen monoxide oxidizes to nitrogen dioxide (exothermic, -112 kJ). Adding these steps gives the overall enthalpy change of +68 kJ/mol for direct NO2 formation. Dr. Hoffmann explains that this endothermic overall reaction requires energy input, which occurs in vehicle engines and industrial combustion at high temperatures. Basel's air quality monitoring network tracks NO2 levels at 15 stations, with particular attention to emissions from Novartis and Roche facilities, which have invested 20 million Swiss francs in emission control systems. Understanding these nitrogen oxide formation energetics helps pharmaceutical companies design combustion processes that minimize NOx emissions. The laboratory collaborates with Basel's pharmaceutical industry to develop catalytic systems that prevent NO2 formation, protecting Basel's air quality for its 175,000 residents. This Hess's Law calculation demonstrates how thermochemical principles guide environmental protection strategies, connecting classroom chemistry to real-world applications in Basel's commitment to sustainable pharmaceutical manufacturing and urban air quality management.`
  },
  {
    id: "HL_BASIC_5",
    targetReaction: "2H2(g) + O2(g) → 2H2O(l)",
    targetReactionLatex: "2\\text{H}_2(g) + \\text{O}_2(g) \\rightarrow 2\\text{H}_2\\text{O}(l)",
    targetDeltaH: -572,
    availableEquations: [
      {
        equation: "H2(g) + 1/2 O2(g) → H2O(l)",
        equationLatex: "\\text{H}_2(g) + \\frac{1}{2}\\text{O}_2(g) \\rightarrow \\text{H}_2\\text{O}(l)",
        deltaH: -286
      }
    ],
    baselContext: `At the Basel University Hydrogen Energy Laboratory in the Kollegienhaus building, doctoral student Emma Chen teaches Gymnasium students about Hess's Law using water formation—the fundamental reaction powering fuel cells. When two moles of hydrogen react with one mole of oxygen to form two moles of water, the enthalpy change is simply twice the single-mole reaction: 2 × (-286 kJ) = -572 kJ. This straightforward example demonstrates Hess's Law's principle that enthalpy changes scale with stoichiometric coefficients. Emma explains that this calculation is crucial for fuel cell engineering at Novartis, where a 10-kilowatt hydrogen fuel cell system is being developed to power pharmaceutical manufacturing facilities. The laboratory's research focuses on optimizing fuel cell efficiency by managing the exothermic heat release—572 kJ per two moles of hydrogen is substantial energy that must be captured for useful work rather than wasted as heat. Understanding how enthalpy scales with reaction quantities helps engineers design fuel cells that maximize electrical output while maintaining safe operating temperatures. The project, funded with 5 million Swiss francs, aims to reduce Basel's pharmaceutical industry carbon emissions by 15,000 tons annually. This simple Hess's Law calculation underpins complex engineering decisions about fuel cell stack design, cooling systems, and energy recovery, demonstrating how fundamental thermochemical principles enable Basel's transition to sustainable pharmaceutical manufacturing powered by clean hydrogen energy.`
  }
];

/**
 * Hess's Law - CORE Difficulty (5 quests)
 * 3-step pathways with equation reversal
 * Requirements: 3.1, 3.5, 10.2, 11.1
 */
export const hessLawCore: RawHessLawData[] = [
  {
    id: "HL_CORE_1",
    targetReaction: "CH4(g) + 2O2(g) → CO2(g) + 2H2O(l)",
    targetReactionLatex: "\\text{CH}_4(g) + 2\\text{O}_2(g) \\rightarrow \\text{CO}_2(g) + 2\\text{H}_2\\text{O}(l)",
    targetDeltaH: -890,
    availableEquations: [
      {
        equation: "C(s) + 2H2(g) → CH4(g)",
        equationLatex: "\\text{C}(s) + 2\\text{H}_2(g) \\rightarrow \\text{CH}_4(g)",
        deltaH: -75
      },
      {
        equation: "C(s) + O2(g) → CO2(g)",
        equationLatex: "\\text{C}(s) + \\text{O}_2(g) \\rightarrow \\text{CO}_2(g)",
        deltaH: -394
      },
      {
        equation: "H2(g) + 1/2 O2(g) → H2O(l)",
        equationLatex: "\\text{H}_2(g) + \\frac{1}{2}\\text{O}_2(g) \\rightarrow \\text{H}_2\\text{O}(l)",
        deltaH: -286
      }
    ],
    baselContext: `At the Basel District Heating Facility in Voltastrasse, engineer Dr. Andreas Weber uses Hess's Law to calculate methane combustion enthalpy for optimizing the facility's natural gas burners. The facility provides heating for 15,000 Basel households, processing 45 million cubic meters of methane annually. Dr. Weber demonstrates to visiting engineering students how to construct an enthalpy cycle using formation data: reverse the methane formation equation to get CH4 → C + 2H2 (+75 kJ), add carbon combustion C + O2 → CO2 (-394 kJ), and add twice the hydrogen combustion 2H2 + O2 → 2H2O (2 × -286 kJ), yielding -890 kJ/mol for methane combustion. This calculation matches experimental measurements, validating Hess's Law. Understanding this energy relationship helps the facility optimize combustion efficiency—incomplete combustion wastes energy and produces carbon monoxide. The facility's heat recovery systems capture 95% of the combustion energy, making it one of Switzerland's most efficient district heating operations. Dr. Weber explains that Hess's Law calculations guide decisions about fuel switching—Basel plans to transition from natural gas to renewable biogas by 2030, and thermochemical calculations ensure the new fuel will provide equivalent heating capacity. This practical application demonstrates how 19th-century thermochemical principles remain essential for 21st-century energy management in Basel's sustainable urban infrastructure.`
  },
  {
    id: "HL_CORE_2",
    targetReaction: "C2H5OH(l) + 3O2(g) → 2CO2(g) + 3H2O(l)",
    targetReactionLatex: "\\text{C}_2\\text{H}_5\\text{OH}(l) + 3\\text{O}_2(g) \\rightarrow 2\\text{CO}_2(g) + 3\\text{H}_2\\text{O}(l)",
    targetDeltaH: -1367,
    availableEquations: [
      {
        equation: "2C(s) + 3H2(g) + 1/2 O2(g) → C2H5OH(l)",
        equationLatex: "2\\text{C}(s) + 3\\text{H}_2(g) + \\frac{1}{2}\\text{O}_2(g) \\rightarrow \\text{C}_2\\text{H}_5\\text{OH}(l)",
        deltaH: -278
      },
      {
        equation: "C(s) + O2(g) → CO2(g)",
        equationLatex: "\\text{C}(s) + \\text{O}_2(g) \\rightarrow \\text{CO}_2(g)",
        deltaH: -394
      },
      {
        equation: "H2(g) + 1/2 O2(g) → H2O(l)",
        equationLatex: "\\text{H}_2(g) + \\frac{1}{2}\\text{O}_2(g) \\rightarrow \\text{H}_2\\text{O}(l)",
        deltaH: -286
      }
    ],
    baselContext: `In the Roche Solvent Recovery Facility at Kaiseraugst, process engineer Dr. Chen calculates ethanol combustion enthalpy using Hess's Law to optimize the facility's waste solvent incinerator. Roche uses ethanol in synthesizing 200 different drug compounds, generating 5,000 liters of contaminated ethanol monthly that must be safely disposed through combustion. Dr. Chen constructs an enthalpy cycle by reversing ethanol formation (+278 kJ), adding twice the carbon combustion (2 × -394 kJ), and adding three times the hydrogen combustion (3 × -286 kJ), yielding -1367 kJ/mol. This large negative value explains why ethanol is an excellent fuel—the facility captures 85% of this combustion energy for building heating, reducing natural gas consumption by 2 million cubic meters annually. Understanding ethanol combustion energetics through Hess's Law helps pharmaceutical engineers design efficient waste management systems that turn environmental liabilities into energy assets. The facility's heat recovery systems demonstrate how thermochemical calculations guide sustainable pharmaceutical manufacturing. Dr. Chen explains that Hess's Law is essential for pharmaceutical process development—chemists routinely calculate reaction enthalpies for proposed synthesis routes before conducting expensive experiments, using formation data and Hess's Law to predict whether reactions will be thermodynamically favorable and how much heat management will be required for safe industrial-scale operation.`
  },
  {
    id: "HL_CORE_3",
    targetReaction: "C3H8(g) + 5O2(g) → 3CO2(g) + 4H2O(l)",
    targetReactionLatex: "\\text{C}_3\\text{H}_8(g) + 5\\text{O}_2(g) \\rightarrow 3\\text{CO}_2(g) + 4\\text{H}_2\\text{O}(l)",
    targetDeltaH: -2220,
    availableEquations: [
      {
        equation: "3C(s) + 4H2(g) → C3H8(g)",
        equationLatex: "3\\text{C}(s) + 4\\text{H}_2(g) \\rightarrow \\text{C}_3\\text{H}_8(g)",
        deltaH: -104
      },
      {
        equation: "C(s) + O2(g) → CO2(g)",
        equationLatex: "\\text{C}(s) + \\text{O}_2(g) \\rightarrow \\text{CO}_2(g)",
        deltaH: -394
      },
      {
        equation: "H2(g) + 1/2 O2(g) → H2O(l)",
        equationLatex: "\\text{H}_2(g) + \\frac{1}{2}\\text{O}_2(g) \\rightarrow \\text{H}_2\\text{O}(l)",
        deltaH: -286
      }
    ],
    baselContext: `At the Basel Chemistry Institute's Combustion Analysis Laboratory, Professor Weber teaches advanced thermochemistry using propane combustion as a Hess's Law exercise. The laboratory consumes 200 kg of propane monthly for Bunsen burners and heating experiments. Professor Weber guides students through constructing an enthalpy cycle: reverse propane formation (+104 kJ), add three times carbon combustion (3 × -394 kJ), and add four times hydrogen combustion (4 × -286 kJ), yielding -2220 kJ/mol—one of the highest energy densities among common fuels. This calculation explains why propane is so effective for laboratory heating and why propane leaks are extremely dangerous. The institute, located near Basel's Botanical Garden, emphasizes that Hess's Law calculations are essential for laboratory safety planning. Understanding combustion energetics helps pharmaceutical chemists at Novartis and Roche who work with flammable organic solvents—knowing the energy release from potential fires guides ventilation design and emergency response planning. Professor Weber explains that while modern calorimeters can measure combustion enthalpies directly, Hess's Law remains crucial for calculating enthalpies of reactions that can't be measured experimentally, such as formation reactions of unstable intermediates in pharmaceutical synthesis. The laboratory's teaching demonstrates how fundamental thermochemical principles connect to practical safety considerations in Basel's pharmaceutical industry, where managing chemical energy safely is essential for protecting the 5,000 chemists working in the city's pharmaceutical facilities.`
  },
  {
    id: "HL_CORE_4",
    targetReaction: "2C2H6(g) + 7O2(g) → 4CO2(g) + 6H2O(l)",
    targetReactionLatex: "2\\text{C}_2\\text{H}_6(g) + 7\\text{O}_2(g) \\rightarrow 4\\text{CO}_2(g) + 6\\text{H}_2\\text{O}(l)",
    targetDeltaH: -3120,
    availableEquations: [
      {
        equation: "2C(s) + 3H2(g) → C2H6(g)",
        equationLatex: "2\\text{C}(s) + 3\\text{H}_2(g) \\rightarrow \\text{C}_2\\text{H}_6(g)",
        deltaH: -85
      },
      {
        equation: "C(s) + O2(g) → CO2(g)",
        equationLatex: "\\text{C}(s) + \\text{O}_2(g) \\rightarrow \\text{CO}_2(g)",
        deltaH: -394
      },
      {
        equation: "H2(g) + 1/2 O2(g) → H2O(l)",
        equationLatex: "\\text{H}_2(g) + \\frac{1}{2}\\text{O}_2(g) \\rightarrow \\text{H}_2\\text{O}(l)",
        deltaH: -286
      }
    ],
    baselContext: `In the Novartis Process Safety Laboratory at St. Johann, safety engineer Dr. Hoffmann uses ethane combustion calculations to teach pharmaceutical engineers about scaling effects in thermochemistry. When calculating enthalpy for two moles of ethane combustion, students must carefully track stoichiometric coefficients: reverse twice the ethane formation (2 × +85 kJ), add four times carbon combustion (4 × -394 kJ), and add six times hydrogen combustion (6 × -286 kJ), yielding -3120 kJ for two moles, or -1560 kJ per mole of ethane. This exercise demonstrates that Hess's Law calculations require meticulous attention to coefficients—errors in scaling lead to incorrect energy predictions that could cause safety hazards in industrial processes. The laboratory trains 500 pharmaceutical engineers annually in thermochemical calculations that guide reactor design and safety systems. Dr. Hoffmann explains that understanding how enthalpy scales with reaction quantities is crucial for pharmaceutical manufacturing, where reactions are scaled from milligram laboratory experiments to ton-scale industrial production. A reaction that releases manageable heat at laboratory scale can become dangerously exothermic at industrial scale if cooling systems are inadequate. Novartis's Basel facilities have maintained zero major thermal incidents in 15 years through rigorous thermochemical analysis using Hess's Law and other principles. This calculation exercise connects fundamental chemistry to industrial safety, demonstrating why pharmaceutical companies invest heavily in thermochemical training for their engineering staff.`
  },
  {
    id: "HL_CORE_5",
    targetReaction: "C6H6(l) + 15/2 O2(g) → 6CO2(g) + 3H2O(l)",
    targetReactionLatex: "\\text{C}_6\\text{H}_6(l) + \\frac{15}{2}\\text{O}_2(g) \\rightarrow 6\\text{CO}_2(g) + 3\\text{H}_2\\text{O}(l)",
    targetDeltaH: -3268,
    availableEquations: [
      {
        equation: "6C(s) + 3H2(g) → C6H6(l)",
        equationLatex: "6\\text{C}(s) + 3\\text{H}_2(g) \\rightarrow \\text{C}_6\\text{H}_6(l)",
        deltaH: 49
      },
      {
        equation: "C(s) + O2(g) → CO2(g)",
        equationLatex: "\\text{C}(s) + \\text{O}_2(g) \\rightarrow \\text{CO}_2(g)",
        deltaH: -394
      },
      {
        equation: "H2(g) + 1/2 O2(g) → H2O(l)",
        equationLatex: "\\text{H}_2(g) + \\frac{1}{2}\\text{O}_2(g) \\rightarrow \\text{H}_2\\text{O}(l)",
        deltaH: -286
      }
    ],
    baselContext: `At the Roche Chemical Safety Training Center in Grenzacherstrasse, instructor Dr. Maria Hartmann uses benzene combustion to teach pharmaceutical chemists about aromatic compound energetics and Hess's Law applications. Benzene, a common solvent in pharmaceutical synthesis, has an endothermic formation enthalpy (+49 kJ/mol) due to its aromatic stability, but combusts highly exothermically. Students calculate combustion enthalpy by reversing benzene formation (-49 kJ), adding six times carbon combustion (6 × -394 kJ), and adding three times hydrogen combustion (3 × -286 kJ), yielding -3268 kJ/mol. This enormous energy release explains why benzene fires are so dangerous and why Roche maintains strict benzene handling protocols. The training center processes 200 pharmaceutical chemists annually through safety courses emphasizing thermochemical hazard assessment. Dr. Hartmann explains that benzene's positive formation enthalpy indicates it's thermodynamically unstable relative to its elements, yet kinetically stable due to aromatic resonance—a crucial distinction for pharmaceutical chemists. Understanding this through Hess's Law helps chemists predict which aromatic compounds might pose thermal hazards. Roche uses 50 tons of benzene annually in pharmaceutical synthesis, all handled in specialized facilities with explosion-proof equipment and automated fire suppression. This Hess's Law calculation demonstrates how thermochemical principles guide industrial safety practices, protecting the 10,000 employees working at Roche's Basel facilities while enabling the synthesis of life-saving medications.`
  }
];

/**
 * Hess's Law - ADVANCED Difficulty (5 quests)
 * Formation enthalpy calculations using standard enthalpies
 * Requirements: 3.1, 3.5, 10.3, 11.1
 */
export const hessLawAdvanced: RawHessLawData[] = [
  {
    id: "HL_ADVANCED_1",
    targetReaction: "C2H4(g) + H2O(l) → C2H5OH(l)",
    targetReactionLatex: "\\text{C}_2\\text{H}_4(g) + \\text{H}_2\\text{O}(l) \\rightarrow \\text{C}_2\\text{H}_5\\text{OH}(l)",
    targetDeltaH: -44,
    availableEquations: [
      {
        equation: "2C(s) + 2H2(g) → C2H4(g)",
        equationLatex: "2\\text{C}(s) + 2\\text{H}_2(g) \\rightarrow \\text{C}_2\\text{H}_4(g)",
        deltaH: 52
      },
      {
        equation: "H2(g) + 1/2 O2(g) → H2O(l)",
        equationLatex: "\\text{H}_2(g) + \\frac{1}{2}\\text{O}_2(g) \\rightarrow \\text{H}_2\\text{O}(l)",
        deltaH: -286
      },
      {
        equation: "2C(s) + 3H2(g) + 1/2 O2(g) → C2H5OH(l)",
        equationLatex: "2\\text{C}(s) + 3\\text{H}_2(g) + \\frac{1}{2}\\text{O}_2(g) \\rightarrow \\text{C}_2\\text{H}_5\\text{OH}(l)",
        deltaH: -278
      }
    ],
    baselContext: `In the Novartis Bioethanol Research Laboratory at Schweizerhalle, Dr. Stefan Zimmermann investigates ethanol synthesis from ethylene for pharmaceutical solvent production. While industrial ethanol is typically produced by fermentation, direct hydration of ethylene offers an alternative route. Using Hess's Law with formation enthalpies, students calculate the reaction enthalpy: reverse ethylene formation (-52 kJ), reverse water formation (+286 kJ), and add ethanol formation (-278 kJ), yielding -44 kJ/mol for ethylene hydration. This moderately exothermic reaction is thermodynamically favorable but requires acidic catalysts to proceed at practical rates. The laboratory produces 1,000 liters of ethanol monthly for pharmaceutical applications, studying both fermentation and synthetic routes. Dr. Zimmermann explains that using standard formation enthalpies simplifies Hess's Law calculations—instead of constructing complex combustion cycles, chemists can directly combine formation data from reference tables. This approach is essential for pharmaceutical process development, where chemists evaluate hundreds of potential synthesis routes and need quick thermochemical assessments. Novartis maintains an extensive database of formation enthalpies for pharmaceutical intermediates, enabling rapid Hess's Law calculations during drug development. Understanding how to use formation data efficiently accelerates pharmaceutical innovation, helping Basel's pharmaceutical industry maintain its competitive advantage in developing new medications for global markets.`
  },
  {
    id: "HL_ADVANCED_2",
    targetReaction: "CH3COOH(l) + 2O2(g) → 2CO2(g) + 2H2O(l)",
    targetReactionLatex: "\\text{CH}_3\\text{COOH}(l) + 2\\text{O}_2(g) \\rightarrow 2\\text{CO}_2(g) + 2\\text{H}_2\\text{O}(l)",
    targetDeltaH: -874,
    availableEquations: [
      {
        equation: "2C(s) + 2H2(g) + O2(g) → CH3COOH(l)",
        equationLatex: "2\\text{C}(s) + 2\\text{H}_2(g) + \\text{O}_2(g) \\rightarrow \\text{CH}_3\\text{COOH}(l)",
        deltaH: -484
      },
      {
        equation: "C(s) + O2(g) → CO2(g)",
        equationLatex: "\\text{C}(s) + \\text{O}_2(g) \\rightarrow \\text{CO}_2(g)",
        deltaH: -394
      },
      {
        equation: "H2(g) + 1/2 O2(g) → H2O(l)",
        equationLatex: "\\text{H}_2(g) + \\frac{1}{2}\\text{O}_2(g) \\rightarrow \\text{H}_2\\text{O}(l)",
        deltaH: -286
      }
    ],
    baselContext: `At the Roche Pharmaceutical Waste Management Facility in Kaiseraugst, environmental engineer Dr. Lisa Müller calculates acetic acid combustion enthalpy for optimizing solvent waste incineration. Acetic acid, used extensively in pharmaceutical synthesis and produced as a byproduct in aspirin manufacturing, must be safely disposed through controlled combustion. Using formation enthalpies and Hess's Law, students calculate: reverse acetic acid formation (+484 kJ), add twice carbon combustion (2 × -394 kJ), and add twice hydrogen combustion (2 × -286 kJ), yielding -874 kJ/mol. This substantial energy release is captured by the facility's heat recovery systems, generating steam for pharmaceutical processes. The facility processes 3,000 liters of acetic acid waste monthly, converting a disposal problem into an energy resource. Dr. Müller explains that Hess's Law calculations using formation data are essential for waste management planning—knowing combustion enthalpies helps engineers design incinerators with appropriate cooling capacity and heat recovery systems. Roche's commitment to sustainable pharmaceutical manufacturing includes recovering 90% of waste combustion energy, reducing natural gas consumption by 3 million cubic meters annually. This practical application demonstrates how thermochemical calculations guide environmental engineering decisions, turning pharmaceutical waste streams into valuable energy sources while protecting Basel's environment and contributing to Switzerland's carbon reduction goals.`
  },
  {
    id: "HL_ADVANCED_3",
    targetReaction: "NH3(g) + HCl(g) → NH4Cl(s)",
    targetReactionLatex: "\\text{NH}_3(g) + \\text{HCl}(g) \\rightarrow \\text{NH}_4\\text{Cl}(s)",
    targetDeltaH: -176,
    availableEquations: [
      {
        equation: "1/2 N2(g) + 3/2 H2(g) → NH3(g)",
        equationLatex: "\\frac{1}{2}\\text{N}_2(g) + \\frac{3}{2}\\text{H}_2(g) \\rightarrow \\text{NH}_3(g)",
        deltaH: -46
      },
      {
        equation: "1/2 H2(g) + 1/2 Cl2(g) → HCl(g)",
        equationLatex: "\\frac{1}{2}\\text{H}_2(g) + \\frac{1}{2}\\text{Cl}_2(g) \\rightarrow \\text{HCl}(g)",
        deltaH: -92
      },
      {
        equation: "1/2 N2(g) + 2H2(g) + 1/2 Cl2(g) → NH4Cl(s)",
        equationLatex: "\\frac{1}{2}\\text{N}_2(g) + 2\\text{H}_2(g) + \\frac{1}{2}\\text{Cl}_2(g) \\rightarrow \\text{NH}_4\\text{Cl}(s)",
        deltaH: -314
      }
    ],
    baselContext: `In the Basel Chemistry Institute's Inorganic Synthesis Laboratory, Professor Weber demonstrates ammonium chloride formation to teach students about acid-base reactions and Hess's Law with ionic compounds. When ammonia gas meets hydrogen chloride gas, they react vigorously to form white ammonium chloride smoke—a classic demonstration of acid-base chemistry. Using formation enthalpies, students calculate the reaction enthalpy: reverse ammonia formation (+46 kJ), reverse HCl formation (+92 kJ), and add ammonium chloride formation (-314 kJ), yielding -176 kJ/mol. This exothermic reaction explains why the white smoke forms so readily—the energy released drives the reaction forward spontaneously. The laboratory uses this demonstration to teach 300 chemistry students annually about thermochemical calculations with ionic compounds. Professor Weber explains that formation enthalpies for ionic solids are typically very negative due to strong electrostatic attractions, making their formation highly exothermic. This principle is crucial for pharmaceutical salt formation—many drugs are converted to salt forms to improve solubility and stability, and understanding the thermochemistry helps predict which salt forms will be most stable. Novartis and Roche synthesize hundreds of pharmaceutical salts annually, using Hess's Law calculations to predict formation energetics before conducting expensive experimental screening. This educational demonstration connects fundamental thermochemistry to pharmaceutical applications, showing how acid-base reactions and enthalpy calculations guide drug formulation decisions in Basel's pharmaceutical industry.`
  },
  {
    id: "HL_ADVANCED_4",
    targetReaction: "C2H2(g) + 2H2(g) → C2H6(g)",
    targetReactionLatex: "\\text{C}_2\\text{H}_2(g) + 2\\text{H}_2(g) \\rightarrow \\text{C}_2\\text{H}_6(g)",
    targetDeltaH: -312,
    availableEquations: [
      {
        equation: "2C(s) + H2(g) → C2H2(g)",
        equationLatex: "2\\text{C}(s) + \\text{H}_2(g) \\rightarrow \\text{C}_2\\text{H}_2(g)",
        deltaH: 227
      },
      {
        equation: "2C(s) + 3H2(g) → C2H6(g)",
        equationLatex: "2\\text{C}(s) + 3\\text{H}_2(g) \\rightarrow \\text{C}_2\\text{H}_6(g)",
        deltaH: -85
      }
    ],
    baselContext: `At the Novartis Catalytic Hydrogenation Research Laboratory in Klybeck, Dr. Wei Chen studies acetylene hydrogenation to ethane as a model system for understanding pharmaceutical hydrogenation reactions. While this specific reaction isn't used pharmaceutically, it demonstrates principles crucial for drug synthesis where unsaturated compounds are hydrogenated to create specific molecular structures. Using formation enthalpies and Hess's Law, students calculate: reverse acetylene formation (-227 kJ) and add ethane formation (-85 kJ), yielding -312 kJ/mol for acetylene hydrogenation. This highly exothermic reaction explains why acetylene hydrogenation requires careful temperature control—uncontrolled heat release can cause runaway reactions. The laboratory studies 50 different hydrogenation reactions monthly, developing catalysts and conditions for pharmaceutical applications. Dr. Chen explains that Hess's Law calculations using formation data provide quick thermochemical assessments before experimental work—if a proposed hydrogenation is too exothermic, chemists can predict cooling requirements or consider alternative routes. Novartis performs thousands of hydrogenation reactions annually in drug synthesis, adding hydrogen atoms to create specific stereochemistry and functional groups. Understanding hydrogenation thermochemistry through Hess's Law helps pharmaceutical chemists design safe, efficient processes. The laboratory's research has led to 10 patents for novel hydrogenation catalysts, demonstrating how fundamental thermochemical principles drive pharmaceutical innovation in Basel's competitive drug development environment.`
  },
  {
    id: "HL_ADVANCED_5",
    targetReaction: "C6H12O6(s) → 2C2H5OH(l) + 2CO2(g)",
    targetReactionLatex: "\\text{C}_6\\text{H}_{12}\\text{O}_6(s) \\rightarrow 2\\text{C}_2\\text{H}_5\\text{OH}(l) + 2\\text{CO}_2(g)",
    targetDeltaH: -72,
    availableEquations: [
      {
        equation: "6C(s) + 6H2(g) + 3O2(g) → C6H12O6(s)",
        equationLatex: "6\\text{C}(s) + 6\\text{H}_2(g) + 3\\text{O}_2(g) \\rightarrow \\text{C}_6\\text{H}_{12}\\text{O}_6(s)",
        deltaH: -1274
      },
      {
        equation: "2C(s) + 3H2(g) + 1/2 O2(g) → C2H5OH(l)",
        equationLatex: "2\\text{C}(s) + 3\\text{H}_2(g) + \\frac{1}{2}\\text{O}_2(g) \\rightarrow \\text{C}_2\\text{H}_5\\text{OH}(l)",
        deltaH: -278
      },
      {
        equation: "C(s) + O2(g) → CO2(g)",
        equationLatex: "\\text{C}(s) + \\text{O}_2(g) \\rightarrow \\text{CO}_2(g)",
        deltaH: -394
      }
    ],
    baselContext: `In the Basel Biochemistry Research Institute's Fermentation Laboratory, Professor Anna Keller uses glucose fermentation to teach students about biological thermochemistry and Hess's Law applications to biochemical processes. Alcoholic fermentation, where yeast converts glucose to ethanol and carbon dioxide, is the basis for brewing and pharmaceutical ethanol production. Using formation enthalpies, students calculate: reverse glucose formation (+1274 kJ), add twice ethanol formation (2 × -278 kJ), and add twice CO2 formation (2 × -394 kJ), yielding -72 kJ/mol for fermentation. This modest exothermic reaction provides energy for yeast metabolism while producing ethanol, which Roche and Novartis use as a pharmaceutical solvent. The laboratory produces 500 liters of pharmaceutical-grade ethanol monthly through fermentation, studying how to optimize yield and purity. Professor Keller explains that while fermentation's energy release is small compared to combustion, it's sufficient to sustain yeast growth and reproduction. Understanding fermentation thermochemistry is crucial for pharmaceutical biotechnology—many drugs are now produced by fermentation processes, and thermochemical calculations help optimize bioreactor conditions. The institute collaborates with Roche's biologics division, which produces therapeutic proteins through fermentation in 10,000-liter bioreactors. Hess's Law calculations guide bioreactor design, ensuring adequate cooling for fermentation heat while maintaining optimal temperatures for cell growth. This application demonstrates how 19th-century thermochemical principles remain essential for 21st-century pharmaceutical biotechnology.`
  }
];

/**
 * Hess's Law - ELITE Difficulty (5 quests)
 * Multi-step pharmaceutical synthesis pathways
 * Requirements: 3.1, 3.5, 10.4, 11.1, 11.7, 22.2
 */
export const hessLawElite: RawHessLawData[] = [
  {
    id: "HL_ELITE_1",
    targetReaction: "C7H6O3(s) + C4H6O3(l) → C9H8O4(s) + CH3COOH(l)",
    targetReactionLatex: "\\text{C}_7\\text{H}_6\\text{O}_3(s) + \\text{C}_4\\text{H}_6\\text{O}_3(l) \\rightarrow \\text{C}_9\\text{H}_8\\text{O}_4(s) + \\text{CH}_3\\text{COOH}(l)",
    targetDeltaH: -180,
    availableEquations: [
      {
        equation: "7C(s) + 3H2(g) + 3/2 O2(g) → C7H6O3(s)",
        equationLatex: "7\\text{C}(s) + 3\\text{H}_2(g) + \\frac{3}{2}\\text{O}_2(g) \\rightarrow \\text{C}_7\\text{H}_6\\text{O}_3(s)",
        deltaH: -595
      },
      {
        equation: "4C(s) + 3H2(g) + 3/2 O2(g) → C4H6O3(l)",
        equationLatex: "4\\text{C}(s) + 3\\text{H}_2(g) + \\frac{3}{2}\\text{O}_2(g) \\rightarrow \\text{C}_4\\text{H}_6\\text{O}_3(l)",
        deltaH: -623
      },
      {
        equation: "9C(s) + 4H2(g) + 2O2(g) → C9H8O4(s)",
        equationLatex: "9\\text{C}(s) + 4\\text{H}_2(g) + 2\\text{O}_2(g) \\rightarrow \\text{C}_9\\text{H}_8\\text{O}_4(s)",
        deltaH: -1026
      },
      {
        equation: "2C(s) + 2H2(g) + O2(g) → CH3COOH(l)",
        equationLatex: "2\\text{C}(s) + 2\\text{H}_2(g) + \\text{O}_2(g) \\rightarrow \\text{CH}_3\\text{COOH}(l)",
        deltaH: -484
      }
    ],
    baselContext: `In the Novartis Historical Pharmaceutical Synthesis Laboratory at St. Johann, senior research chemist Dr. Heinrich Schneider uses Hess's Law to analyze the classic aspirin synthesis that established Basel as a pharmaceutical center in 1897. When salicylic acid reacts with acetic anhydride to produce aspirin and acetic acid, the reaction enthalpy can be calculated using formation data: reverse salicylic acid formation (+595 kJ), reverse acetic anhydride formation (+623 kJ), add aspirin formation (-1026 kJ), and add acetic acid formation (-484 kJ), yielding -180 kJ/mol. This moderately exothermic reaction requires careful temperature control at 85°C to prevent aspirin decomposition while maintaining practical reaction rates. The laboratory produces 50 kg of aspirin monthly using traditional methods for educational purposes, demonstrating how thermochemical calculations guided early pharmaceutical manufacturing. Dr. Schneider explains that Felix Hoffmann, who discovered this synthesis, didn't have access to modern calorimetry but understood that controlling reaction temperature was crucial—Hess's Law calculations now explain why. Modern Novartis facilities produce 5,000 tons of aspirin annually with process optimization that reduces energy consumption by 40% compared to historical methods. Understanding aspirin synthesis thermochemistry through Hess's Law helps pharmaceutical engineers design efficient reactors with appropriate cooling systems. This iconic pharmaceutical reaction demonstrates how fundamental thermochemical principles transformed medicine and established Basel's pharmaceutical excellence, connecting 19th-century chemical innovation to 21st-century industrial pharmaceutical manufacturing.`
  },
  {
    id: "HL_ELITE_2",
    targetReaction: "Multi-step ibuprofen synthesis: C10H14O → C13H18O2",
    targetReactionLatex: "\\text{Multi-step ibuprofen synthesis: } \\text{C}_{10}\\text{H}_{14}\\text{O} \\rightarrow \\text{C}_{13}\\text{H}_{18}\\text{O}_2",
    targetDeltaH: -145,
    availableEquations: [
      {
        equation: "Step 1: Friedel-Crafts acylation",
        equationLatex: "\\text{Step 1: Friedel-Crafts acylation}",
        deltaH: -65
      },
      {
        equation: "Step 2: Carbonylation",
        equationLatex: "\\text{Step 2: Carbonylation}",
        deltaH: -55
      },
      {
        equation: "Step 3: Hydrolysis",
        equationLatex: "\\text{Step 3: Hydrolysis}",
        deltaH: -25
      }
    ],
    baselContext: `At the Roche Advanced Pharmaceutical Synthesis Facility in Kaiseraugst, principal scientist Dr. Thomas Keller oversees ibuprofen production using a three-step synthesis pathway developed by Roche chemists. Ibuprofen, one of the world's most widely used pain relievers, is synthesized through Friedel-Crafts acylation (-65 kJ/mol), carbonylation (-55 kJ/mol), and hydrolysis (-25 kJ/mol). Using Hess's Law, the overall enthalpy change is the sum of all steps: -65 + (-55) + (-25) = -145 kJ/mol. Each step is exothermic, requiring precise temperature control to prevent side reactions and maintain product purity above 99.5% required for pharmaceutical use. The facility produces 800 tons of ibuprofen annually for global distribution, with sophisticated reactor systems managing heat removal at each step. Dr. Keller explains that Hess's Law is fundamental to pharmaceutical process development—when designing multi-step syntheses, chemists calculate overall thermochemistry by summing individual step enthalpies, predicting total heat generation and cooling requirements before building industrial reactors. This approach saved Roche millions of Swiss francs by identifying potential thermal hazards during laboratory-scale development rather than discovering them during expensive pilot plant construction. The facility's three-reactor cascade system removes heat continuously, maintaining optimal temperatures for each step while recovering 85% of the exothermic energy for building heating. Understanding multi-step synthesis thermochemistry through Hess's Law exemplifies how fundamental chemical principles enable safe, efficient pharmaceutical manufacturing at the industrial scale that supplies medications to millions of patients worldwide.`
  },
  {
    id: "HL_ELITE_3",
    targetReaction: "Multi-step penicillin synthesis: 5 steps",
    targetReactionLatex: "\\text{Multi-step penicillin synthesis: 5 steps}",
    targetDeltaH: -235,
    availableEquations: [
      {
        equation: "Step 1: β-lactam ring formation",
        equationLatex: "\\text{Step 1: } \\beta\\text{-lactam ring formation}",
        deltaH: -85
      },
      {
        equation: "Step 2: Side chain attachment",
        equationLatex: "\\text{Step 2: Side chain attachment}",
        deltaH: -45
      },
      {
        equation: "Step 3: Thiazolidine ring closure",
        equationLatex: "\\text{Step 3: Thiazolidine ring closure}",
        deltaH: -60
      },
      {
        equation: "Step 4: Oxidation",
        equationLatex: "\\text{Step 4: Oxidation}",
        deltaH: -30
      },
      {
        equation: "Step 5: Final purification",
        equationLatex: "\\text{Step 5: Final purification}",
        deltaH: -15
      }
    ],
    baselContext: `In the Novartis Antibiotic Synthesis Complex at Schweizerhalle, Dr. Maria Hoffmann leads the production of semi-synthetic penicillin derivatives through a sophisticated five-step synthesis pathway. The process begins with β-lactam ring formation (-85 kJ/mol), followed by side chain attachment (-45 kJ/mol), thiazolidine ring closure (-60 kJ/mol), oxidation (-30 kJ/mol), and final purification (-15 kJ/mol). Applying Hess's Law, the overall synthesis releases -235 kJ/mol: -85 + (-45) + (-60) + (-30) + (-15) = -235 kJ/mol. This multi-step exothermic pathway requires five separate reactors, each with precise temperature control and heat removal systems. The facility produces 200 tons of penicillin derivatives annually, supplying antibiotics that treat bacterial infections for millions of patients worldwide. Dr. Hoffmann explains that complex pharmaceutical syntheses like penicillin production demonstrate Hess's Law's practical importance—the overall enthalpy change equals the sum of individual steps regardless of pathway complexity. This principle allows pharmaceutical engineers to design integrated heat management systems that remove heat from exothermic steps and supply heat to any endothermic steps, optimizing energy efficiency. Novartis's penicillin facility recovers 90% of synthesis heat for building heating and solvent distillation, demonstrating sustainable pharmaceutical manufacturing. Understanding multi-step synthesis thermochemistry through Hess's Law is essential for pharmaceutical process development, where complex molecules require intricate synthesis pathways with careful energy management to ensure safety, efficiency, and product quality.`
  },
  {
    id: "HL_ELITE_4",
    targetReaction: "Multi-step anticancer drug synthesis: 7 steps",
    targetReactionLatex: "\\text{Multi-step anticancer drug synthesis: 7 steps}",
    targetDeltaH: -320,
    availableEquations: [
      {
        equation: "Step 1: Aromatic substitution",
        equationLatex: "\\text{Step 1: Aromatic substitution}",
        deltaH: -75
      },
      {
        equation: "Step 2: Heterocycle formation",
        equationLatex: "\\text{Step 2: Heterocycle formation}",
        deltaH: -50
      },
      {
        equation: "Step 3: Functional group protection",
        equationLatex: "\\text{Step 3: Functional group protection}",
        deltaH: -35
      },
      {
        equation: "Step 4: Coupling reaction",
        equationLatex: "\\text{Step 4: Coupling reaction}",
        deltaH: -60
      },
      {
        equation: "Step 5: Deprotection",
        equationLatex: "\\text{Step 5: Deprotection}",
        deltaH: -40
      },
      {
        equation: "Step 6: Oxidation",
        equationLatex: "\\text{Step 6: Oxidation}",
        deltaH: -35
      },
      {
        equation: "Step 7: Salt formation",
        equationLatex: "\\text{Step 7: Salt formation}",
        deltaH: -25
      }
    ],
    baselContext: `At the Roche Oncology Drug Manufacturing Facility in Grenzacherstrasse, Dr. Andreas Weber oversees the synthesis of a proprietary anticancer medication through a complex seven-step pathway. The synthesis involves aromatic substitution (-75 kJ/mol), heterocycle formation (-50 kJ/mol), functional group protection (-35 kJ/mol), coupling reaction (-60 kJ/mol), deprotection (-40 kJ/mol), oxidation (-35 kJ/mol), and salt formation (-25 kJ/mol). Using Hess's Law, the overall enthalpy change is -320 kJ/mol: -75 + (-50) + (-35) + (-60) + (-40) + (-35) + (-25) = -320 kJ/mol. This highly exothermic multi-step synthesis requires seven specialized reactors with advanced temperature control systems, each maintaining optimal conditions for its specific reaction while managing heat removal. The facility produces 50 kg of this anticancer drug annually, enough to treat 5,000 cancer patients. Dr. Weber explains that complex pharmaceutical syntheses demonstrate why Hess's Law is indispensable for pharmaceutical engineering—calculating overall thermochemistry by summing individual steps allows engineers to design integrated manufacturing systems before investing in expensive equipment. The facility's heat integration network captures exothermic heat from early steps to drive later endothermic purification processes, achieving 92% energy efficiency. Roche's investment in thermochemical analysis and process optimization ensures that life-saving cancer medications can be manufactured safely and economically, making advanced treatments accessible to patients worldwide while maintaining Basel's leadership in pharmaceutical innovation.`
  },
  {
    id: "HL_ELITE_5",
    targetReaction: "Multi-step insulin analog synthesis: 4 steps",
    targetReactionLatex: "\\text{Multi-step insulin analog synthesis: 4 steps}",
    targetDeltaH: -185,
    availableEquations: [
      {
        equation: "Step 1: Peptide chain assembly",
        equationLatex: "\\text{Step 1: Peptide chain assembly}",
        deltaH: -95
      },
      {
        equation: "Step 2: Disulfide bond formation",
        equationLatex: "\\text{Step 2: Disulfide bond formation}",
        deltaH: -45
      },
      {
        equation: "Step 3: Folding and purification",
        equationLatex: "\\text{Step 3: Folding and purification}",
        deltaH: -30
      },
      {
        equation: "Step 4: Formulation",
        equationLatex: "\\text{Step 4: Formulation}",
        deltaH: -15
      }
    ],
    baselContext: `In the Novartis Biologics Manufacturing Facility at St. Johann, Dr. Stefan Zimmermann oversees the production of insulin analogs for diabetes treatment through a four-step biotechnological synthesis. The process involves peptide chain assembly (-95 kJ/mol), disulfide bond formation (-45 kJ/mol), protein folding and purification (-30 kJ/mol), and final formulation (-15 kJ/mol). Applying Hess's Law, the overall process releases -185 kJ/mol: -95 + (-45) + (-30) + (-15) = -185 kJ/mol. While insulin is primarily produced through fermentation, understanding the thermochemistry of each processing step is crucial for optimizing production efficiency and maintaining protein stability. The facility produces 500 kg of insulin analogs annually, providing diabetes medication for 50,000 Swiss patients. Dr. Zimmermann explains that Hess's Law applies to biochemical processes just as it does to traditional chemical synthesis—the overall enthalpy change for protein processing equals the sum of individual step enthalpies. This principle guides bioreactor design and downstream processing, where maintaining appropriate temperatures is critical for protein stability. The facility's sophisticated temperature control systems manage the modest exothermic heat release while preventing protein denaturation, which would destroy therapeutic activity. Novartis's expertise in pharmaceutical thermochemistry, including Hess's Law applications, enables production of complex biological medications that have transformed diabetes management. This example demonstrates how fundamental thermochemical principles extend from small-molecule drugs to large biological therapeutics, maintaining Basel's pharmaceutical industry leadership in both traditional and biotechnology-based drug manufacturing.`
  }
];

// ============================================================================
// CALORIMETRY STAGE - 20 QUESTS
// ============================================================================

/**
 * Raw quest data structure for Calorimetry stage
 */
interface RawCalorimetryData {
  id: string;
  mass: number; // grams
  specificHeat: number; // J/g°C
  initialTemp: number; // °C
  finalTemp: number; // °C
  moles?: number; // for ΔH per mole calculations
  calorimeterCapacity?: number; // J/°C for advanced calculations
  baselContext: string;
}

/**
 * Calorimetry - BASIC Difficulty (5 quests)
 * Simple q = mcΔT calculations
 * Requirements: 6.1, 6.5, 10.1, 11.1
 */
export const calorimetryBasic: RawCalorimetryData[] = [
  {
    id: "CAL_BASIC_1",
    mass: 100,
    specificHeat: 4.18,
    initialTemp: 20,
    finalTemp: 25,
    baselContext: `At the Basel Gymnasium Chemistry Laboratory near Petersplatz, teacher Dr. Müller demonstrates basic calorimetry to Sekundarstufe II students using a simple coffee-cup calorimeter. When 100 grams of water is heated from 20°C to 25°C, students calculate the heat absorbed using q = mcΔT: q = (100 g)(4.18 J/g°C)(5°C) = 2,090 J or 2.09 kJ. This fundamental calculation introduces students to quantitative thermochemistry, showing how temperature changes relate to energy transfer. The laboratory serves 200 chemistry students annually, teaching practical calorimetry skills essential for pharmaceutical careers at Novartis and Roche. Dr. Müller explains that water's high specific heat capacity (4.18 J/g°C) makes it ideal for calorimetry—it absorbs substantial heat with modest temperature changes, providing measurable results in simple experiments. Understanding q = mcΔT is the foundation for all calorimetry work, from classroom demonstrations to industrial pharmaceutical process monitoring. Students learn that this equation applies universally—whether measuring heat from dissolving salts, neutralizing acids, or combusting fuels. The Basel Gymnasium's chemistry program emphasizes quantitative skills, preparing students for university chemistry programs and pharmaceutical industry careers. This simple calorimetry exercise connects classroom learning to Basel's pharmaceutical industry, where precise heat measurements guide drug synthesis, formulation stability testing, and quality control procedures that ensure medications meet strict safety and efficacy standards.`
  },
  {
    id: "CAL_BASIC_2",
    mass: 50,
    specificHeat: 4.18,
    initialTemp: 25,
    finalTemp: 20,
    baselContext: `In the Basel University Chemistry Department's Thermochemistry Laboratory, doctoral student Emma demonstrates endothermic dissolution using ammonium nitrate dissolving in water. When 50 grams of water cools from 25°C to 20°C due to endothermic dissolution, students calculate the heat absorbed by the dissolving salt: q = mcΔT = (50 g)(4.18 J/g°C)(-5°C) = -1,045 J. The negative value indicates heat flows from water to the dissolving process, causing temperature decrease. This experiment teaches students that calorimetry measures both exothermic and endothermic processes—temperature increases indicate exothermic reactions (heat released), while temperature decreases indicate endothermic processes (heat absorbed). The laboratory, located in the historic Kollegienhaus building, trains 300 chemistry students annually in calorimetry techniques used throughout pharmaceutical research. Emma explains that understanding endothermic dissolution is crucial for pharmaceutical formulation—many drugs dissolve endothermically, affecting how quickly they dissolve in the body and begin providing therapeutic effects. Roche and Novartis employ 50 formulation scientists in Basel who use calorimetry to study drug dissolution kinetics, optimizing tablet formulations for rapid, reliable drug release. This simple calorimetry measurement demonstrates a principle essential for pharmaceutical development: heat flow direction determines whether processes are spontaneous or require energy input, guiding decisions about drug formulation, storage conditions, and manufacturing processes.`
  },
  {
    id: "CAL_BASIC_3",
    mass: 200,
    specificHeat: 4.18,
    initialTemp: 22,
    finalTemp: 28,
    baselContext: `At the Roche Pharmaceutical Quality Control Laboratory in Grenzacherstrasse, analytical chemist Dr. Lisa Hoffmann uses calorimetry to verify exothermic neutralization reactions in pharmaceutical pH adjustment processes. When 200 grams of aqueous solution heats from 22°C to 28°C during acid-base neutralization, the heat released is calculated: q = mcΔT = (200 g)(4.18 J/g°C)(6°C) = 5,016 J or 5.02 kJ. This measurement confirms the neutralization proceeded as expected, an important quality control check for pharmaceutical manufacturing. The laboratory performs 500 calorimetry measurements monthly, ensuring pharmaceutical processes operate within specified parameters. Dr. Hoffmann explains that calorimetry provides real-time process monitoring—unexpected temperature changes indicate problems like contamination, incorrect reagent concentrations, or equipment malfunctions. Roche's quality control systems use calorimetry data to maintain pharmaceutical manufacturing consistency, ensuring every batch meets strict quality standards. Understanding basic calorimetry calculations allows pharmaceutical technicians to quickly assess whether reactions are proceeding normally or require intervention. The laboratory's work demonstrates how simple q = mcΔT calculations underpin sophisticated pharmaceutical quality assurance, protecting patient safety by detecting process deviations before they affect product quality. Roche's Basel facilities process 50 million pharmaceutical units annually, all monitored using calorimetry and other analytical techniques that ensure medications are safe, effective, and consistent from batch to batch.`
  },
  {
    id: "CAL_BASIC_4",
    mass: 150,
    specificHeat: 4.18,
    initialTemp: 18,
    finalTemp: 24,
    baselContext: `In the Novartis Chemical Safety Training Laboratory at St. Johann, instructor Dr. Thomas Weber demonstrates calorimetry using metal dissolution reactions to teach pharmaceutical chemists about heat measurement and safety. When 150 grams of water heats from 18°C to 24°C during zinc dissolution in acid, students calculate: q = mcΔT = (150 g)(4.18 J/g°C)(6°C) = 3,762 J or 3.76 kJ. This exothermic reaction demonstrates why pharmaceutical chemists must consider heat generation when scaling reactions from laboratory to industrial scale. The training center processes 500 pharmaceutical chemists annually through safety courses emphasizing thermochemical hazard assessment. Dr. Weber explains that reactions releasing modest heat at laboratory scale (grams) can generate dangerous heat at industrial scale (kilograms or tons), potentially causing thermal runaway if cooling systems are inadequate. Novartis uses calorimetry data from laboratory experiments to design industrial reactors with appropriate cooling capacity, preventing thermal incidents. Understanding q = mcΔT allows chemists to predict heat generation rates and design safe manufacturing processes. The laboratory's training has contributed to Novartis's exemplary safety record—zero major thermal incidents in 15 years of Basel pharmaceutical manufacturing. This calorimetry exercise demonstrates how fundamental thermochemical measurements guide industrial safety decisions, protecting the 10,000 employees working at Novartis's Basel facilities while enabling efficient pharmaceutical production that supplies medications to millions of patients worldwide.`
  },
  {
    id: "CAL_BASIC_5",
    mass: 75,
    specificHeat: 4.18,
    initialTemp: 23,
    finalTemp: 19,
    baselContext: `At the Basel Chemistry Institute's Physical Chemistry Laboratory, Professor Weber uses calorimetry to demonstrate endothermic phase transitions with ice melting experiments. When 75 grams of water cools from 23°C to 19°C as ice melts in it, students calculate the heat absorbed by the melting ice: q = mcΔT = (75 g)(4.18 J/g°C)(-4°C) = -1,254 J. The negative value indicates heat flows from the water to melt the ice, an endothermic process. This experiment teaches students that calorimetry measures energy changes in physical processes (like melting) as well as chemical reactions. The laboratory, located near Basel's Botanical Garden, serves 300 chemistry students annually, teaching calorimetry principles essential for pharmaceutical research. Professor Weber explains that understanding phase transition thermochemistry is crucial for pharmaceutical freeze-drying (lyophilization), a process Roche and Novartis use to stabilize heat-sensitive medications. Freeze-drying removes water by sublimation, requiring precise heat input to drive the endothermic phase transition without raising temperature enough to damage drugs. Basel's pharmaceutical companies operate 20 industrial freeze-dryers producing stable formulations of antibiotics, vaccines, and biological therapeutics. Calorimetry measurements guide freeze-drying process development, ensuring adequate heat input for efficient drying while maintaining product stability. This simple ice-melting calorimetry demonstrates principles that enable pharmaceutical technologies protecting millions of patients who depend on freeze-dried medications for treating infections, preventing diseases, and managing chronic conditions.`
  }
];

/**
 * Calorimetry - CORE Difficulty (5 quests)
 * Calculating ΔH per mole from calorimetry data
 * Requirements: 6.1, 6.5, 10.2, 11.1
 */
export const calorimetryCore: RawCalorimetryData[] = [
  {
    id: "CAL_CORE_1",
    mass: 200,
    specificHeat: 4.18,
    initialTemp: 20,
    finalTemp: 35,
    moles: 0.1,
    baselContext: `In the Basel University Thermochemistry Laboratory, doctoral student Emma measures the enthalpy of neutralization for pharmaceutical pH control applications. When 0.1 moles of hydrochloric acid neutralizes sodium hydroxide in 200 grams of solution, the temperature rises from 20°C to 35°C. Students first calculate heat released: q = mcΔT = (200 g)(4.18 J/g°C)(15°C) = 12,540 J. Then they calculate enthalpy per mole: ΔH = -q/n = -12,540 J / 0.1 mol = -125,400 J/mol = -125.4 kJ/mol. The negative sign indicates an exothermic reaction. This calculation demonstrates how calorimetry data converts to molar enthalpy values used in thermochemical tables. The laboratory collaborates with Roche and Novartis, where neutralization reactions are fundamental to pharmaceutical manufacturing—adjusting pH during synthesis, purification, and formulation. Understanding molar enthalpy allows pharmaceutical chemists to predict heat generation when scaling reactions from laboratory (0.1 moles) to industrial scale (hundreds of moles). Emma's research focuses on measuring enthalpies for pharmaceutical reactions, building a database that guides process development. The laboratory has measured enthalpies for over 500 pharmaceutical reactions, data that Novartis and Roche use to design safe, efficient manufacturing processes. This calorimetry exercise demonstrates how laboratory measurements provide fundamental thermochemical data that enables pharmaceutical industry operations, connecting academic research to industrial applications that produce medications improving lives for millions of patients worldwide.`
  },
  {
    id: "CAL_CORE_2",
    mass: 150,
    specificHeat: 4.18,
    initialTemp: 22,
    finalTemp: 18,
    moles: 0.05,
    baselContext: `At the Roche Pharmaceutical Formulation Laboratory in Grenzacherstrasse, formulation scientist Dr. Maria Hartmann measures dissolution enthalpies for drug compounds to predict dissolution behavior in the body. When 0.05 moles of a pharmaceutical salt dissolves in 150 grams of water, the temperature drops from 22°C to 18°C. The heat absorbed is: q = mcΔT = (150 g)(4.18 J/g°C)(-4°C) = -2,508 J. The molar enthalpy is: ΔH = -q/n = -(-2,508 J) / 0.05 mol = +50,160 J/mol = +50.2 kJ/mol. The positive value indicates endothermic dissolution, meaning the drug absorbs heat when dissolving. This information guides formulation development—endothermic dissolution can slow drug release, affecting how quickly medications begin working. The laboratory measures dissolution enthalpies for 100 drug compounds annually, data that guides tablet formulation decisions. Dr. Hartmann explains that understanding dissolution thermochemistry helps pharmaceutical scientists optimize drug delivery—some drugs benefit from rapid dissolution (pain relievers), while others require controlled release (blood pressure medications). Roche uses calorimetry data to design formulations that provide optimal therapeutic effects. The laboratory's work has contributed to developing 20 new drug formulations in the past five years, improving treatment outcomes for patients with cardiovascular disease, cancer, and infectious diseases. This calorimetry measurement demonstrates how thermochemical data guides pharmaceutical innovation, connecting laboratory science to clinical medicine that improves patient care worldwide.`
  },
  {
    id: "CAL_CORE_3",
    mass: 250,
    specificHeat: 4.18,
    initialTemp: 25,
    finalTemp: 32,
    moles: 0.15,
    baselContext: `In the Novartis Process Chemistry Laboratory at St. Johann, research chemist Dr. Wei Chen measures reaction enthalpies for pharmaceutical synthesis optimization. When 0.15 moles of reactants undergo coupling reaction in 250 grams of solvent, the temperature rises from 25°C to 32°C. The heat released is: q = mcΔT = (250 g)(4.18 J/g°C)(7°C) = 7,315 J. The molar enthalpy is: ΔH = -q/n = -7,315 J / 0.15 mol = -48,767 J/mol = -48.8 kJ/mol. This moderately exothermic reaction requires cooling to maintain optimal reaction temperature for high product yield. The laboratory measures enthalpies for 200 pharmaceutical reactions annually, building a thermochemical database that guides industrial process design. Dr. Chen explains that knowing molar enthalpies allows pharmaceutical engineers to calculate cooling requirements when scaling reactions from laboratory (0.15 moles) to industrial scale (1,000 moles)—a 1,000-fold scale-up requires proportionally larger cooling systems. Novartis uses calorimetry data to design reactors with appropriate heat removal capacity, preventing thermal runaway that could cause dangerous pressure buildup or product decomposition. The laboratory's thermochemical measurements have enabled safe scale-up of 50 pharmaceutical processes, supporting production of medications treating cardiovascular disease, cancer, and neurological disorders. This calorimetry calculation demonstrates how laboratory measurements provide essential data for industrial pharmaceutical manufacturing, ensuring safe, efficient production of medications that improve health outcomes for millions of patients worldwide.`
  },
  {
    id: "CAL_CORE_4",
    mass: 100,
    specificHeat: 4.18,
    initialTemp: 20,
    finalTemp: 26,
    moles: 0.08,
    baselContext: `At the Basel Chemistry Institute's Analytical Chemistry Laboratory, Professor Weber teaches students to measure combustion enthalpies using bomb calorimetry principles. When 0.08 moles of organic compound combusts in a calorimeter containing 100 grams of water, the temperature rises from 20°C to 26°C. The heat released is: q = mcΔT = (100 g)(4.18 J/g°C)(6°C) = 2,508 J. The molar combustion enthalpy is: ΔH = -q/n = -2,508 J / 0.08 mol = -31,350 J/mol = -31.4 kJ/mol. This calculation demonstrates how calorimetry determines combustion enthalpies, fundamental data for understanding fuel values and reaction energetics. The laboratory trains 300 chemistry students annually in calorimetry techniques used throughout pharmaceutical research and development. Professor Weber explains that combustion calorimetry provides accurate enthalpy measurements because combustion reactions go to completion, unlike some pharmaceutical reactions that reach equilibrium. Pharmaceutical companies use combustion data to calculate formation enthalpies via Hess's Law, building thermochemical databases for drug development. The institute collaborates with Novartis and Roche, providing calorimetry training for pharmaceutical chemists and conducting research on pharmaceutical compound energetics. Understanding how to convert calorimetry measurements to molar enthalpies is essential for pharmaceutical scientists who use thermochemical data daily to predict reaction feasibility, design synthesis routes, and optimize manufacturing processes. This educational exercise connects fundamental calorimetry principles to pharmaceutical applications that enable Basel's pharmaceutical industry to develop innovative medications for global healthcare.`
  },
  {
    id: "CAL_CORE_5",
    mass: 180,
    specificHeat: 4.18,
    initialTemp: 23,
    finalTemp: 29,
    moles: 0.12,
    baselContext: `In the Roche Pharmaceutical Crystallization Laboratory at Kaiseraugst, process engineer Dr. Andreas Weber measures crystallization enthalpies to optimize drug purification processes. When 0.12 moles of pharmaceutical compound crystallizes from 180 grams of solution, the temperature rises from 23°C to 29°C due to exothermic crystallization. The heat released is: q = mcΔT = (180 g)(4.18 J/g°C)(6°C) = 4,514 J. The molar crystallization enthalpy is: ΔH = -q/n = -4,514 J / 0.12 mol = -37,617 J/mol = -37.6 kJ/mol. This moderately exothermic process indicates favorable crystallization, important for pharmaceutical purification where crystallization separates pure drug from impurities. The laboratory processes 50 different pharmaceutical compounds monthly, measuring crystallization enthalpies that guide purification process development. Dr. Weber explains that crystallization thermochemistry affects purification efficiency—highly exothermic crystallization indicates strong crystal lattice formation, typically producing high-purity crystals suitable for pharmaceutical use. Roche uses calorimetry data to optimize crystallization conditions (temperature, solvent, cooling rate) for maximum yield and purity. The facility's crystallization processes achieve 99.9% purity required for pharmaceutical products, ensuring medications meet strict quality standards. Understanding crystallization enthalpies through calorimetry enables pharmaceutical scientists to design efficient purification processes, reducing manufacturing costs while maintaining product quality. This measurement demonstrates how thermochemical data guides pharmaceutical manufacturing decisions, ensuring that medications are pure, safe, and effective for treating patients worldwide.`
  }
];

/**
 * Calorimetry - ADVANCED Difficulty (5 quests)
 * Calorimeter heat capacity corrections
 * Requirements: 6.1, 6.5, 10.3, 11.1
 */
export const calorimetryAdvanced: RawCalorimetryData[] = [
  {
    id: "CAL_ADVANCED_1",
    mass: 150,
    specificHeat: 4.18,
    initialTemp: 22,
    finalTemp: 28,
    calorimeterCapacity: 50,
    baselContext: `At the Roche Precision Calorimetry Laboratory in Grenzacherstrasse, analytical chemist Dr. Lisa Müller performs high-accuracy enthalpy measurements accounting for calorimeter heat capacity. When a reaction heats 150 grams of solution from 22°C to 28°C in a calorimeter with heat capacity 50 J/°C, the total heat includes both solution and calorimeter: q_solution = mcΔT = (150 g)(4.18 J/g°C)(6°C) = 3,762 J; q_calorimeter = C_cal × ΔT = (50 J/°C)(6°C) = 300 J; q_total = 3,762 + 300 = 4,062 J. Ignoring calorimeter heat capacity would underestimate heat by 7%, unacceptable for pharmaceutical quality control. The laboratory performs 1,000 precision calorimetry measurements annually, ensuring pharmaceutical processes meet strict specifications. Dr. Müller explains that pharmaceutical calorimetry requires accounting for all heat sinks—solution, calorimeter, stirrer, thermometer—to achieve ±1% accuracy needed for regulatory compliance. Roche's quality control systems use precision calorimetry to validate that pharmaceutical reactions proceed as specified, detecting process deviations before they affect product quality. Understanding calorimeter heat capacity corrections is essential for pharmaceutical analytical chemists who must provide accurate thermochemical data for regulatory submissions. The laboratory's precision measurements support Roche's production of 200+ pharmaceutical compounds, ensuring consistent quality that protects patient safety and maintains regulatory approval for medications treating millions of patients worldwide.`
  },
  {
    id: "CAL_ADVANCED_2",
    mass: 200,
    specificHeat: 4.18,
    initialTemp: 20,
    finalTemp: 27,
    calorimeterCapacity: 75,
    baselContext: `In the Novartis Pharmaceutical Process Development Laboratory at Schweizerhalle, Dr. Stefan Zimmermann uses precision calorimetry to measure reaction enthalpies for scale-up calculations. When a pharmaceutical coupling reaction heats 200 grams of solvent from 20°C to 27°C in a calorimeter with 75 J/°C heat capacity, the total heat released includes both solvent and calorimeter contributions: q_solvent = (200 g)(4.18 J/g°C)(7°C) = 5,852 J; q_calorimeter = (75 J/°C)(7°C) = 525 J; q_total = 5,852 + 525 = 6,377 J. The calorimeter absorbs 8% of the total heat, a significant correction for accurate enthalpy determination. The laboratory measures enthalpies for 150 pharmaceutical reactions annually, providing data that guides industrial reactor design. Dr. Zimmermann explains that accurate calorimetry is crucial for pharmaceutical scale-up—underestimating reaction enthalpy leads to inadequate cooling systems, potentially causing thermal runaway at industrial scale. Novartis uses precision calorimetry data to design reactors with appropriate heat removal capacity, ensuring safe operation when scaling from laboratory (grams) to industrial production (tons). The laboratory's measurements have enabled successful scale-up of 40 pharmaceutical processes, supporting production of medications treating cardiovascular disease, cancer, and infectious diseases. Understanding calorimeter heat capacity corrections ensures pharmaceutical engineers have accurate thermochemical data for designing safe, efficient manufacturing processes that produce high-quality medications for millions of patients worldwide while protecting worker safety and environmental quality.`
  },
  {
    id: "CAL_ADVANCED_3",
    mass: 175,
    specificHeat: 4.18,
    initialTemp: 25,
    finalTemp: 31,
    calorimeterCapacity: 60,
    baselContext: `At the Basel University Advanced Thermochemistry Laboratory, Professor Weber teaches doctoral students precision calorimetry techniques used in pharmaceutical research. When measuring a neutralization reaction that heats 175 grams of solution from 25°C to 31°C in a calorimeter with 60 J/°C heat capacity, students must account for both heat sinks: q_solution = (175 g)(4.18 J/g°C)(6°C) = 4,389 J; q_calorimeter = (60 J/°C)(6°C) = 360 J; q_total = 4,389 + 360 = 4,749 J. The calorimeter correction adds 8% to the measured heat, demonstrating why precision calorimetry requires careful calibration. The laboratory trains 50 doctoral students annually in advanced calorimetry techniques, preparing them for pharmaceutical industry careers. Professor Weber explains that calorimeter heat capacity is determined by calibration using reactions with known enthalpies, typically electrical heating or standard chemical reactions. This calibration must be performed regularly to maintain measurement accuracy. The laboratory collaborates with Novartis and Roche, conducting research on pharmaceutical reaction thermochemistry and training pharmaceutical scientists in precision measurement techniques. Understanding calorimeter heat capacity corrections is essential for pharmaceutical researchers who must provide accurate thermochemical data for process development, safety assessments, and regulatory submissions. The laboratory's research has contributed to 30 publications on pharmaceutical thermochemistry, advancing scientific understanding while training the next generation of pharmaceutical scientists who will develop innovative medications for global healthcare needs.`
  },
  {
    id: "CAL_ADVANCED_4",
    mass: 125,
    specificHeat: 4.18,
    initialTemp: 23,
    finalTemp: 30,
    calorimeterCapacity: 45,
    baselContext: `In the Roche Pharmaceutical Reaction Calorimetry Laboratory at Kaiseraugst, Dr. Maria Hoffmann uses advanced calorimetry to study pharmaceutical reaction kinetics and thermodynamics. When an esterification reaction heats 125 grams of solvent from 23°C to 30°C in a calorimeter with 45 J/°C heat capacity, the total heat released is: q_solvent = (125 g)(4.18 J/g°C)(7°C) = 3,658 J; q_calorimeter = (45 J/°C)(7°C) = 315 J; q_total = 3,658 + 315 = 3,973 J. The 8% calorimeter correction is essential for accurate kinetic modeling—reaction rate calculations require precise heat flow measurements. The laboratory operates three reaction calorimeters continuously, monitoring pharmaceutical reactions in real-time to study reaction mechanisms and optimize conditions. Dr. Hoffmann explains that reaction calorimetry provides insights beyond simple enthalpy measurements—by monitoring heat flow throughout the reaction, chemists can determine reaction rates, identify intermediates, and detect side reactions. Roche uses reaction calorimetry data to optimize pharmaceutical synthesis conditions, maximizing yield while minimizing impurities and waste. The laboratory's work has improved 25 pharmaceutical processes, increasing production efficiency by 15% while reducing waste by 20%. Understanding advanced calorimetry techniques enables pharmaceutical scientists to develop more efficient, sustainable manufacturing processes. This measurement demonstrates how precision thermochemical analysis guides pharmaceutical innovation, supporting development of high-quality medications while reducing environmental impact and manufacturing costs.`
  },
  {
    id: "CAL_ADVANCED_5",
    mass: 160,
    specificHeat: 4.18,
    initialTemp: 21,
    finalTemp: 28,
    calorimeterCapacity: 55,
    baselContext: `At the Novartis Pharmaceutical Safety Assessment Laboratory in St. Johann, safety engineer Dr. Thomas Weber uses precision calorimetry to evaluate thermal hazards in pharmaceutical processes. When testing a potentially hazardous reaction that heats 160 grams of solution from 21°C to 28°C in a calorimeter with 55 J/°C heat capacity, the total heat release is: q_solution = (160 g)(4.18 J/g°C)(7°C) = 4,681 J; q_calorimeter = (55 J/°C)(7°C) = 385 J; q_total = 4,681 + 385 = 5,066 J. Accurate heat measurement is crucial for safety assessment—underestimating heat generation could lead to inadequate safety systems at industrial scale. The laboratory evaluates 100 pharmaceutical processes annually for thermal hazards, ensuring safe scale-up from laboratory to industrial production. Dr. Weber explains that calorimetry provides essential data for safety engineering—knowing exact heat generation rates allows engineers to design cooling systems, pressure relief systems, and emergency shutdown procedures that prevent thermal runaway. Novartis's comprehensive safety assessment program, based on precision calorimetry, has maintained zero major thermal incidents in 15 years of Basel pharmaceutical manufacturing. Understanding calorimeter heat capacity corrections ensures safety engineers have accurate data for protecting the 10,000 employees working at Novartis's Basel facilities. This measurement demonstrates how precision thermochemical analysis enables safe pharmaceutical manufacturing, protecting workers and communities while producing medications that improve health outcomes for millions of patients worldwide.`
  }
];

/**
 * Calorimetry - ELITE Difficulty (5 quests)
 * Industrial-scale calorimetry with complex calculations
 * Requirements: 6.1, 6.5, 10.4, 11.1, 22.6
 */
export const calorimetryElite: RawCalorimetryData[] = [
  {
    id: "CAL_ELITE_1",
    mass: 5000,
    specificHeat: 3.5,
    initialTemp: 25,
    finalTemp: 45,
    moles: 10,
    calorimeterCapacity: 2000,
    baselContext: `At the Novartis Industrial Pharmaceutical Reactor Facility in Schweizerhalle, process engineer Dr. Stefan Zimmermann monitors a 5,000-liter reactor producing anticancer medication through exothermic coupling reaction. The reactor contains 5,000 kg (5,000,000 g) of reaction mixture with specific heat 3.5 J/g°C, heating from 25°C to 45°C during reaction of 10 kmol (10,000 mol) of reactants. The reactor vessel has heat capacity 2,000 kJ/°C (2,000,000 J/°C). Total heat released: q_solution = (5,000,000 g)(3.5 J/g°C)(20°C) = 350,000,000 J = 350,000 kJ; q_reactor = (2,000,000 J/°C)(20°C) = 40,000,000 J = 40,000 kJ; q_total = 350,000 + 40,000 = 390,000 kJ. Molar enthalpy: ΔH = -390,000 kJ / 10,000 mol = -39 kJ/mol. This moderately exothermic reaction requires sophisticated cooling systems removing 390 megajoules of heat over 4 hours—equivalent to 27 kilowatts continuous cooling. The facility operates 12 industrial reactors producing 50 different pharmaceutical compounds, all monitored by advanced calorimetry systems. Dr. Zimmermann explains that industrial calorimetry is essential for pharmaceutical manufacturing safety—real-time heat flow monitoring detects process deviations before they cause thermal runaway. The facility's heat recovery systems capture 85% of reaction heat for building heating and solvent distillation, demonstrating sustainable pharmaceutical manufacturing. Understanding industrial-scale calorimetry enables pharmaceutical engineers to design safe, efficient processes producing medications that treat cancer, cardiovascular disease, and infectious diseases for millions of patients worldwide.`
  },
  {
    id: "CAL_ELITE_2",
    mass: 8000,
    specificHeat: 4.0,
    initialTemp: 20,
    finalTemp: 35,
    moles: 15,
    calorimeterCapacity: 3000,
    baselContext: `In the Roche Large-Scale Pharmaceutical Manufacturing Facility at Kaiseraugst, principal engineer Dr. Andreas Weber oversees an 8,000-liter reactor producing antibiotic medication through fermentation followed by chemical modification. The reactor contains 8,000 kg of aqueous reaction mixture (specific heat 4.0 J/g°C) that heats from 20°C to 35°C during exothermic acylation of 15 kmol of antibiotic intermediate. The stainless steel reactor has heat capacity 3,000 kJ/°C. Total heat: q_solution = (8,000,000 g)(4.0 J/g°C)(15°C) = 480,000,000 J = 480,000 kJ; q_reactor = (3,000,000 J/°C)(15°C) = 45,000,000 J = 45,000 kJ; q_total = 480,000 + 45,000 = 525,000 kJ. Molar enthalpy: ΔH = -525,000 kJ / 15,000 mol = -35 kJ/mol. This reaction releases 525 megajoules over 6 hours, requiring 24 kilowatts continuous cooling. The facility produces 300 tons of antibiotics annually, treating bacterial infections for 5 million patients worldwide. Dr. Weber explains that industrial pharmaceutical calorimetry combines chemistry, engineering, and process control—sophisticated sensors monitor temperature at 20 locations in the reactor, with automated cooling systems maintaining optimal reaction temperature ±0.5°C. The facility's advanced process control has achieved 99.8% batch success rate, minimizing waste while ensuring consistent product quality. Understanding industrial calorimetry enables pharmaceutical engineers to operate complex manufacturing processes safely and efficiently, producing life-saving antibiotics that have reduced mortality from bacterial infections by 90% since their introduction, demonstrating pharmaceutical chemistry's profound impact on global health.`
  },
  {
    id: "CAL_ELITE_3",
    mass: 10000,
    specificHeat: 3.8,
    initialTemp: 30,
    finalTemp: 50,
    moles: 20,
    calorimeterCapacity: 4000,
    baselContext: `At the Novartis Cardiovascular Drug Manufacturing Complex in St. Johann, Dr. Maria Hoffmann manages a 10,000-liter reactor producing blood pressure medication through multi-step synthesis. The reactor contains 10,000 kg of organic solvent mixture (specific heat 3.8 J/g°C) that heats from 30°C to 50°C during exothermic condensation reaction of 20 kmol of pharmaceutical intermediates. The jacketed glass-lined reactor has heat capacity 4,000 kJ/°C. Total heat: q_solution = (10,000,000 g)(3.8 J/g°C)(20°C) = 760,000,000 J = 760,000 kJ; q_reactor = (4,000,000 J/°C)(20°C) = 80,000,000 J = 80,000 kJ; q_total = 760,000 + 80,000 = 840,000 kJ. Molar enthalpy: ΔH = -840,000 kJ / 20,000 mol = -42 kJ/mol. This highly exothermic reaction releases 840 megajoules over 8 hours, requiring 29 kilowatts continuous cooling through the reactor jacket circulating chilled water at 15°C. The facility produces 500 tons of cardiovascular medications annually, treating hypertension and heart failure for 100,000 Swiss patients. Dr. Hoffmann explains that industrial pharmaceutical calorimetry requires understanding heat transfer engineering—the reactor's cooling jacket must remove heat faster than the reaction generates it to prevent temperature runaway. Novartis's advanced reactor design achieves 95% heat removal efficiency, maintaining precise temperature control essential for product quality. The facility's calorimetry systems have prevented 15 potential thermal incidents over 10 years, demonstrating how thermochemical monitoring protects worker safety while enabling production of medications that prevent heart attacks and strokes, saving thousands of lives annually.`
  },
  {
    id: "CAL_ELITE_4",
    mass: 6000,
    specificHeat: 4.2,
    initialTemp: 22,
    finalTemp: 38,
    moles: 12,
    calorimeterCapacity: 2500,
    baselContext: `In the Roche Biopharmaceutical Production Facility at Grenzacherstrasse, bioprocess engineer Dr. Wei Chen monitors a 6,000-liter bioreactor producing therapeutic protein through fermentation. The bioreactor contains 6,000 kg of aqueous cell culture medium (specific heat 4.2 J/g°C) that heats from 22°C to 38°C during exothermic cellular metabolism producing 12 kmol of therapeutic protein. The bioreactor vessel has heat capacity 2,500 kJ/°C. Total heat: q_medium = (6,000,000 g)(4.2 J/g°C)(16°C) = 403,200,000 J = 403,200 kJ; q_bioreactor = (2,500,000 J/°C)(16°C) = 40,000,000 J = 40,000 kJ; q_total = 403,200 + 40,000 = 443,200 kJ. Molar enthalpy: ΔH = -443,200 kJ / 12,000 mol = -36.9 kJ/mol. This fermentation releases 443 megajoules over 72 hours, requiring 1.7 kilowatts continuous cooling to maintain optimal cell growth temperature of 37°C. The facility operates 8 bioreactors producing therapeutic proteins treating autoimmune diseases, cancer, and genetic disorders for 20,000 patients worldwide. Dr. Chen explains that bioreactor calorimetry differs from chemical reactor calorimetry—living cells continuously generate metabolic heat, requiring constant cooling even during steady-state operation. Roche's sophisticated bioreactor control systems maintain temperature within ±0.2°C, essential for cell viability and protein quality. The facility's calorimetry-based process control has achieved 98% batch success rate, maximizing production of expensive biological therapeutics. Understanding bioreactor calorimetry enables pharmaceutical engineers to produce complex biological medications that have revolutionized treatment of previously untreatable diseases, demonstrating how thermochemical principles apply across all pharmaceutical manufacturing technologies.`
  },
  {
    id: "CAL_ELITE_5",
    mass: 12000,
    specificHeat: 3.6,
    initialTemp: 28,
    finalTemp: 42,
    moles: 25,
    calorimeterCapacity: 5000,
    baselContext: `At the Novartis Flagship Pharmaceutical Manufacturing Complex in Schweizerhalle, chief process engineer Dr. Thomas Keller oversees a 12,000-liter reactor producing blockbuster immunosuppressant medication through complex multi-step synthesis. The reactor contains 12,000 kg of mixed organic solvents (specific heat 3.6 J/g°C) that heats from 28°C to 42°C during highly exothermic cyclization reaction of 25 kmol of advanced pharmaceutical intermediate. The specialized titanium reactor has heat capacity 5,000 kJ/°C. Total heat: q_solution = (12,000,000 g)(3.6 J/g°C)(14°C) = 604,800,000 J = 604,800 kJ; q_reactor = (5,000,000 J/°C)(14°C) = 70,000,000 J = 70,000 kJ; q_total = 604,800 + 70,000 = 674,800 kJ. Molar enthalpy: ΔH = -674,800 kJ / 25,000 mol = -27 kJ/mol. This reaction releases 675 megajoules over 10 hours, requiring 19 kilowatts continuous cooling through a sophisticated heat exchange system. The facility produces 1,000 tons of this immunosuppressant annually, preventing organ rejection for 50,000 transplant patients worldwide. Dr. Keller explains that this pharmaceutical synthesis represents the pinnacle of industrial thermochemical engineering—the reactor's advanced calorimetry system monitors heat generation at millisecond intervals, with predictive algorithms adjusting cooling 30 seconds before temperature deviations occur. Novartis's investment in advanced calorimetry and process control has achieved 99.9% batch success rate while maintaining exemplary safety record. Understanding industrial-scale pharmaceutical calorimetry enables production of complex medications that have made organ transplantation routine, transforming previously fatal conditions into manageable chronic diseases and demonstrating pharmaceutical chemistry's extraordinary impact on extending and improving human life worldwide.`
  }
];
