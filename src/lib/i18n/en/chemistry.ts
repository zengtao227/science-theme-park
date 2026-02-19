/**
 * EN - CHEMISTRY translations
 * Auto-generated from i18n.ts refactoring
 * Last updated: 2026-02-15
 */

export const enChemistry = {
    gc3_01: {
        back: "Back to Nexus",
        title: "GC3.01 // EQUILIBRIUM MASTER",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Chemical Equilibrium",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "GC3.01_EQUILIBRIUM_MONITOR",
        footer_left: "GC3.01_EQUILIBRIUM_MASTER // NODE: BASEL",
        labels: {
            reaction: "REVERSIBLE REACTION",
            particle_count: "PARTICLE COUNT",
            conditions: "CONDITIONS",
            temperature: "Temperature",
            pressure: "Pressure",
            concentration: "[A]",
            principle: "LE CHATELIER'S PRINCIPLE",
            principle_1: "• Add reactant → shifts right (more products)",
            principle_2: "• Increase pressure → shifts to fewer molecules",
            principle_3: "• Increase temperature → shifts endothermic direction",
            add_reactant: "ADD REACTANT A",
            system_temperature: "SYSTEM TEMPERATURE",
            system_pressure: "SYSTEM PRESSURE"
        },
        mission: {
            title: "MISSION: CHEMICAL EQUILIBRIUM",
            description: "Master Le Chatelier's Principle. Observe how systems respond to stress."
        },
        stages: {
            concentration: "CONCENTRATION",
            temperature: "TEMPERATURE",
            pressure: "PRESSURE",
            concentration_desc: "Add reactant A and watch equilibrium shift",
            temperature_desc: "Increase temperature and observe particle speed",
            pressure_desc: "Change pressure and see volume effects",
            concentration_hint: "Higher [A] shifts equilibrium right → more C and D",
            temperature_hint: "Higher temperature increases particle kinetic energy",
            pressure_hint: "Higher pressure decreases container volume"
        },
        lab_ui: {
            "mystery_lab": "Mystery Lab",
            "select_tool": "Select Tool",
            "lab_notes": "Lab Notes",
            "no_tests": "No tests performed yet...",
            "tests_count": "tests",
            "protocol": "Detective Protocol:",
            "instruction": "Select a tool, then click on a powder to test. Use the reactions to identify which is Baking Soda, Salt, or Starch!",
            "tools": {
                "water": "Water",
                "vinegar": "Vinegar",
                "fire": "Fire",
                "iodine": "Iodine"
            },
            "substances": {
                "soda": "Baking Soda (NaHCO₃)",
                "salt": "Salt (NaCl)",
                "starch": "Starch (C₆H₁₀O₅)ₙ",
                "powder_a": "Powder A",
                "powder_b": "Powder B",
                "powder_c": "Powder C"
            },
            "results": {
                "soda_water": "Dissolves slightly",
                "soda_vinegar": "Fizzes! CO₂ bubbles!",
                "soda_fire": "No visible change",
                "soda_iodine": "No color change",
                "salt_water": "Dissolves completely",
                "salt_vinegar": "Dissolves, no fizz",
                "salt_fire": "Melts at high temp",
                "salt_iodine": "No color change",
                "starch_water": "Forms cloudy mixture",
                "starch_vinegar": "No reaction",
                "starch_fire": "Burns/chars",
                "starch_iodine": "Turns BLUE-BLACK!",
                "no_reaction": "No reaction"
            }
        },
        prompts: {
            shift_dir: "The reaction A + B ⇌ C + D is at equilibrium. If we increase the concentration of A, in which direction does the system shift? (Right=1, Left=2).",
            temp_exothermic: "An exothermic reaction releases heat. If we increase the temperature in such a system, which way does the equilibrium shift? (Right=1, Left=2).",
            pressure_moles: "A(g) + B(g) ⇌ C(g). The system has 2 gas molecules on the left and 1 on the right. Shifting direction upon pressure increase? (Right=1, Left=2).",
            catalyst_yield: "Does a catalyst increase the equilibrium yield of a product, or only speed up reaching the state? (Yield=1, Speed=2).",
            kc_calculation: "Calculate Kc for A + B ⇌ C + D if [A]=0.5M, [B]=0.5M, [C]=1M, [D]=1M at equilibrium. (Kc = [C][D]/[A][B]).",
            inert_gas: "In a constant volume system, an inert gas is added. Does this affect the equilibrium position? (Yes=1, No=2).",
            haber_temp: "In the Haber process (exothermic), why is 450°C used even though lower temps give higher equilibrium yield? (Rate=1, Thermo=2).",
            endothermic_kc: "For an endothermic reaction: Does increasing temperature increase the value of Kc? (Yes=1, No=2)."
        },
        scenarios: {
            basel_synthesis: "Basel Rhine Port Chemical Synthesis: You are a process engineer at Lonza's production facility in the Basel Rhine Port. Today, you are overseeing the large-scale synthesis of ethyl acetate, a vital solvent for local pharmaceutical production at Novartis and Roche. The reaction is an equilibrium process where acetic acid and ethanol react to form the product. Currently, the reactor is yielding only 60% of its theoretical capacity, which is insufficient for the high demand from the city's labs. By applying Le Chatelier's Principle, you decide to increase the concentration of the reactants. You must calculate how adding 500 liters of concentrated ethanol to the 5000-liter reactor shifts the equilibrium position to the right. Increasing the reactant concentration forces the system to consume the excess, thereby producing more ethyl acetate. This optimization is crucial for maintaining the medicine supply chain for Switzerland. Just like when you add more players to a game to speed up the scoring, adding more 'players' (reactants) to a chemical reaction speeds up the production of your goal.",
            haber_process: "Industrial Nitrogen Hub - Basel: You are a senior research scientist at the University of Basel’s Institute for Inorganic Chemistry. You are working on optimizing the Haber-Bosch process, which synthesizes ammonia from nitrogen and hydrogen—a process essential for producing fertilizers and medications worldwide. In your lab, you manage a reactor operating at 200 atmospheres of pressure. Since the forward reaction producing ammonia results in a decrease in the number of gas molecules (4 molecules of reactant become 2 molecules of product), increasing the pressure shifts the equilibrium toward the ammonia side. However, if the pressure drops below 150 atmospheres, the yield plummets, making the process economically unviable. You must precisely monitor the pressure gauges to ensure maximum efficiency. This concept is similar to a crowded tram in Basel during Carnival season: as more people (pressure) are forced into the tram, they must squeeze together (shift to fewer molecules) to find a stable state.",
            buffer_systems: "Biozentrum Basel: You are a graduate student at the Biozentrum of the University of Basel, working in a world-class laboratory focused on cell biology. You are cultivating sensitive human liver cells in a bioreactor for drug toxicity testing. These cells can only survive in a narrow pH range around 7.4. To maintain this, you use a biological buffer system involving carbon dioxide and bicarbonate ions in a dynamic equilibrium. If the cells' metabolism produces an excess of acidic waste (protons), the equilibrium must shift immediately to neutralize them. You are tasked with adjusting the CO2 partial pressure in the incubator to counteract an unexpected rise in acidity recorded by the sensors. Precise equilibrium control here is literally a matter of life and death for your cell culture. It’s exactly like your body’s own blood-buffering system that keeps you stable even after a long run along the Rhine.",
            catalysis_innovation: "University of Basel Catalysis Group: You are an innovation manager at a Basel-based chemical startup 'RhineCatalyst.' Your team has developed a revolutionary heterogeneous catalyst designed for the sustainable production of fine chemicals. While a catalyst does not change the final equilibrium position K, it dramatically increases the rate at which equilibrium is reached. In your current project, reaching equilibrium in 1 hour at 50°C instead of 10 hours at 90°C saves the company over 100,000 Swiss Francs per year in energy costs. You must analyze the reaction kinetics to ensure the system stabilizes before the cooling water system hits its limit. This industrial efficiency is what keeps Basel at the forefront of global chemistry. Think of it like a shortcut on your map through the Basel old town—you still end up at the same fountain, but you get there much faster and with less effort."
        }
    },
    gc3_02: {
        back: "Back to Nexus",
        title: "GC3.02 // CRYSTAL PALACE",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Crystal Structure",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "GC3.02_CRYSTAL_MONITOR",
        footer_left: "GC3.02_CRYSTAL_PALACE // NODE: BASEL",
        labels: {
            lattice_type: "LATTICE TYPE",
            properties: "PROPERTIES",
            atoms_per_cell: "Atoms/Cell",
            coordination: "Coordination",
            packing: "Packing",
            tet_voids: "Tet. Voids",
            voids: "INTERSTITIAL VOIDS",
            tetrahedral: "Tetrahedral",
            octahedral: "Octahedral",
            formulas: "FORMULAS",
            show_voids: "Show Interstitial Voids",
            slice_plane: "SLICE PLANE (Y-AXIS)",
            reset_slice: "Reset"
        },
        mission: {
            title: "MISSION: SOLID STATE PHYSICS",
            description: "Explore crystal structures and Bravais lattices. Understand atomic packing and coordination."
        },
        stages: {
            sc: "SIMPLE CUBIC",
            bcc: "BODY-CENTERED",
            fcc: "FACE-CENTERED",
            sc_desc: "Study simple cubic lattice (6 coordination)",
            bcc_desc: "Analyze body-centered cubic (8 coordination)",
            fcc_desc: "Master face-centered cubic (12 coordination)",
            sc_hint: "Lowest packing efficiency (52%)",
            bcc_hint: "Moderate packing (68%), used in metals like Iron",
            fcc_hint: "Highest packing (74%), used in metals like Gold"
        },
        prompts: {
            atoms_per_cell: "Calculate the total number of atoms per unit cell for this lattice.",
            coord_num: "What is the coordination number (number of nearest neighbors) for an atom in this structure?",
            pack_eff: "Determine the atomic packing factor (%) for this crystal system.",
            void_id: "Identify the number of tetrahedral voids available in this unit cell."
        },
        scenarios: {
            crystallography_center: "Basel Crystallography Center: Using X-ray diffraction to map the atomic structures of new pharmaceutical crystals discovered in the city's labs.",
            solid_state_research: "Institute of Physics - Basel: Researchers explore the properties of body-centered and face-centered cubic metals for use in next-generation aerospace components.",
            drug_polymorphism: "Novartis Quality Control: Different crystal packing (polymorphism) can drastically change how a drug dissolves in the body, making lattice analysis a vital step.",
            nano_materials: "Swiss Nanoscience Institute (SNI): At the SNI in Basel, scientists engineer crystal structures at the atomic level to create smart materials for electronics."
        }
    },
    gc1_01: {
        back: "Back to Nexus",
        title: "GC1.01 // REDOX TITAN",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Galvanic Cell",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "GC1.01_REDOX_MONITOR",
        footer_left: "GC1.01_REDOX_TITAN // NODE: BASEL",
        labels: {
            cell_potential: "CELL POTENTIAL",
            zn_concentration: "Zn²⁺ CONCENTRATION",
            cu_concentration: "Cu²⁺ CONCENTRATION",
            temperature: "TEMPERATURE",
            show_electrons: "Show Electron Flow",
            show_ions: "Show Ion Migration",
            reaction_quotient: "REACTION QUOTIENT (Q)",
            half_reactions: "HALF-REACTIONS",
            anode: "ANODE",
            cathode: "CATHODE",
            nernst_equation: "NERNST EQUATION"
        },
        mission: {
            title: "MISSION: ELECTROCHEMISTRY",
            description: "Build a galvanic cell and master the Nernst equation. Observe electron flow and ion migration in real-time."
        },
        stages: {
            build: "BUILD CELL",
            measure: "MEASURE POTENTIAL",
            analyze: "ANALYZE REACTIONS",
            build_desc: "Construct Zn-Cu galvanic cell",
            measure_desc: "Calculate cell potential with Nernst equation",
            analyze_desc: "Observe redox reactions and electron flow",
            build_hint: "Zn is oxidized at anode, Cu²⁺ reduced at cathode",
            measure_hint: "E = E° - (RT/nF)ln(Q)",
            analyze_hint: "Salt bridge maintains electrical neutrality"
        },
        prompts: {
            cell_potential_calc: "Given E° = 1.10V, [Zn2+] = 1.0M, [Cu2+] = 0.1M. Using E = E° - (RT/nF)lnQ at 298K, calculate E. (ln10 ≈ 2.303).",
            nernst_q: "For Zn + Cu2+ → Zn2+ + Cu, if [Zn2+] increases, does the cell potential (E) increase or decrease? (Increase=1, Decrease=2).",
            standard_v: "What is the standard cell potential (E°) for the Zn-Cu galvanic cell if E°(Cu2+/Cu)=+0.34V and E°(Zn2+/Zn)=-0.76V? (E° = Ec - Ea).",
            electron_flow: "In a galvanic cell, do electrons flow from the anode to the cathode, or vice versa? (Anode to Cathode=1, Cathode to Anode=2).",
            salt_bridge: "Which component in a galvanic cell maintains electrical neutrality by allowing ions to migrate? (Voltmeter=1, Salt Bridge=2).",
            cathode_process: "At which electrode does reduction (gain of electrons) occur? (Anode=1, Cathode=2).",
            zn_reduction: "Is the reduction of Zinc (Zn2+ + 2e- → Zn) a spontaneous process under standard conditions? (Yes=1, No=2).",
            temperature_effect: "According to the Nernst equation, does increasing the temperature always increase the cell potential? (Yes=1, No=2)."
        },
        scenarios: {
            battery_storage: "Basel Energy Grid: You are an energy systems architect at the Basel Municipal Utility (IWB). As Basel moves towards a carbon-neutral future, we are integrating large-scale vanadium redox flow batteries into the local power grid to store surplus energy from Rhine wind farms. Unlike traditional batteries, these store energy in liquid electrolyte tanks. Your task is to calculate the theoretical cell potential E under non-standard concentrations found in our Prototype B-85 reactor. If the concentration of V(V) is 1.5M and V(IV) is 0.5M, how does this affect the voltage compared to the standard 1.1V? This stored energy provides the spinning reserve needed to keep the city's trams running during a blackout. It’s a lot like how a water tower stores energy by holding water at a height, ready to flow when the city gets thirsty.",
            corrosion_protection: "Rhine Bridge Maintenance: You are a structural preservation specialist for the Basel Civil Engineering Department. You are inspecting the historic Mittlere Brücke spanning the Rhine. The underwater steel supports are prone to electrochemical corrosion, where iron atoms lose electrons to form rust. To prevent this, we use 'sacrificial anodes' made of zinc, creating a galvanic cell where the zinc corrodes instead of the bridge's steel. You need to verify if the potential difference between the river water (electrolyte) and the supports is high enough to maintain protection. If the river's ion concentration changes due to seasonal runoff, your protection system might fail, risking the structural integrity of this 800-year-old landmark. It’s exactly like putting a shield in front of a target; the shield takes the hits (corrosion) so the target stays safe.",
            analytical_electrochem: "Lonza Basel: You are a forensic analyst at the Basel-Stadt Cantonal Laboratory. We have received a sample from an industrial site near the border, suspected of discharging heavy metal pollutants into the Rhine. Using a technique called anodic stripping voltammetry, you create a tiny electrochemical cell to detect trace levels of copper and lead. The current produced during the redox reaction is proportional to the pollutant concentration. You must calibrate the sensor by measuring the potential response of a 1.0M standard solution versus our unknown sample. Accurate measurement here is vital for enforcing environmental laws and protecting the Rhine's ecosystem for the swimmers at Rheinbad. This precision is like a digital scale that can detect a single grain of salt in a swimming pool.",
            fuel_cell_innovation: "Swiss Hydrogen Hub: You are a chemical engineer at the Swiss Hydrogen Hub in Basel. We are developing high-efficiency proton-exchange membrane (PEM) fuel cells to power the next generation of Swiss national trains (SBB). In these cells, hydrogen is oxidized at the anode and oxygen is reduced at the cathode, producing only water and electricity. Your project involves testing a new platinum-alloy catalyst that operates at 80°C. You must calculate the efficiency loss due to the concentration gradient across the membrane. If the hydrogen pressure drops, the cell potential E decreases according to the Nernst equation, potentially stalling the train on the steep tracks near Jura. This technology represents the future of clean transport in Europe, similar to how your laptop battery powers your work, but using hydrogen as the ultimate clean fuel."
        }
    },
    gc2_01: {
        back: "Back to Nexus",
        title: "GC2.01 // CARBON KINGDOM",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Molecular Structure",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "GC2.01_ORGANIC_MONITOR",
        footer_left: "GC2.01_CARBON_KINGDOM // NODE: BASEL",
        labels: {
            input: "INPUT",
            hints: "HINTS",
            formula: "MOLECULAR FORMULA",
            iupac_name: "IUPAC NAME",
            composition: "COMPOSITION",
            molecular_mass: "Molecular Mass",
            molecule_info: "MOLECULE INFO",
            select_molecule: "SELECT MOLECULE",
            rotation_speed: "ROTATION SPEED",
            rotation_speed_value: "{value}x",
            show_bonds: "Show Bonds",
            show_hydrogens: "Show Hydrogens",
            atom_colors: "ATOM COLORS",
            atom_carbon: "Carbon (C)",
            atom_hydrogen: "Hydrogen (H)",
            atom_oxygen: "Oxygen (O)",
            atom_nitrogen: "Nitrogen (N)",
            bond_types: "BOND TYPES",
            bond_single: "Single Bond: C-C",
            bond_double: "Double Bond: C=C",
            bond_triple: "Triple Bond: C≡C"
        },
        molecules: {
            methane: "Methane",
            ethane: "Ethane",
            benzene: "Benzene",
            glucose: "Glucose",
            alanine: "Alanine"
        },
        types: {
            alkane: "Alkane",
            aromatic: "Aromatic",
            carbohydrate: "Carbohydrate",
            amino_acid: "Amino Acid"
        },
        mission: {
            title: "MISSION: ORGANIC CHEMISTRY",
            description: "Explore organic molecules in 3D. Study ball-and-stick models, chemical bonds, and molecular geometry."
        },
        stages: {
            alkanes: "ALKANES",
            alcohols: "ALCOHOLS",
            custom: "CUSTOM",
            alkanes_desc: "Build alkane chains (C-C-C)",
            alcohols_desc: "Add hydroxyl groups (C-OH)",
            custom_desc: "Free synthesis mode"
        },
        hints: {
            select_atom: "Click an atom to select it",
            add_atom: "Click on the atom tool to add a new atom",
            bonds: "Atoms are connected according to valence rules",
            delete: "Use DELETE to remove selected atoms"
        },
        prompts: {
            atom_count: "Determine the total number of atoms in this molecule structure.",
            bond_type: "Identify the primary type of carbon-carbon bonding present.",
            mol_type: "Classify this molecule into its organic category.",
            functional_id: "Which functional group is most prominent in this 3D model?"
        },
        scenarios: {
            lonza_methane_cracking: "Lonza Basel - Feedstock Optimization: You are a chemical engineer at Lonza's global headquarters in Basel. We are optimizing our methane cracking reactors to produce high-purity hydrogen for green energy initiatives. Your task is to visualize the bond structure of our methane feedstock. In the high-pressure environment of our Basel facility, understanding the C-H bond length and tetrahedral geometry is critical to prevent sub-optimal yields. Accurate modeling today ensures that Lonza remains a leader in sustainable chemical production right here in the Rhine valley. It's like checking the individual links in a massive chain to ensure the whole system can handle the tension of industrial-scale synthesis.",
            roche_aromatic_pipeline: "Roche Basel - Ring System Synthesis: You are a senior chemist at the Roche Tower in Basel, the highest building in Switzerland and a hub for drug discovery. Your team is developing a new class of antibiotics based on substituted aromatic rings. The resonance stability of the benzene core is the foundation of your drug's efficacy. Using our 3D visualization tools, you must verify the bond delocalization in your current lead compound. In Basel's competitive pharma landscape, an error in predicting ring strain could set back a billion-dollar clinical trial by years. Your work here bridges the gap between theoretical organic chemistry and life-saving medicine. Think of it as ensuring the structural integrity of a complex skyscraper - if the foundation isn't perfectly stable, the whole building is at risk.",
            biozentrum_protein_research: "Biozentrum Basel - Molecular Foundations: You are a researcher at the University of Basel's Biozentrum, part of a world-class team investigating the molecular basis of neurodegenerative diseases. You are analyzing the building blocks of life: amino acids and sugars. Understanding the exact 3D orientation of the amino group and carboxyl group in alanine is essential for modeling how proteins fold in the human brain. Here in Basel, where biology and chemistry meet at the highest level, your spatial analysis helps decode the 'language of life' at the atomic scale. Every bond angle you verify contributes to our understanding of diseases like Alzheimer's. This is like assembling a complex 3D puzzle where every piece's shape determines how the entire image eventually comes together."
        }
    },
    sc1_01: {
        back: "Back to Nexus",
        title: "SC1.01 // MYSTERY LAB",
        difficulty: {
            basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Substance Analysis",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "SC1.01_LAB_MONITOR",
        footer_left: "SC1.01_MYSTERY_LAB // NODE: BASEL",
        lab_ui: {
            mystery_lab: "Mystery Lab",
            select_tool: "Select Tool",
            lab_notes: "Lab Notes",
            no_tests: "No tests performed yet...",
            tests_count: "tests",
            protocol: "Detective Protocol:",
            instruction: "Select a tool, then click on a powder to test. Use the reactions to identify which is Baking Soda, Salt, or Starch!",
            tools: { water: "Water", vinegar: "Vinegar", fire: "Fire", iodine: "Iodine" },
            substances: {
                soda: "Baking Soda (NaHCO₃)", salt: "Salt (NaCl)", starch: "Starch (C₆H₁₀O₅)ₙ",
                powder_a: "Powder A", powder_b: "Powder B", powder_c: "Powder C"
            },
            results: {
                soda_water: "Dissolves slightly", soda_vinegar: "Fizzes! CO₂ bubbles!", soda_fire: "No visible change", soda_iodine: "No color change",
                salt_water: "Dissolves completely", salt_vinegar: "Dissolves, no fizz", salt_fire: "Melts at high temp", salt_iodine: "No color change",
                starch_water: "Forms cloudy mixture", starch_vinegar: "No reaction", starch_fire: "Burns/chars", starch_iodine: "Turns BLUE-BLACK!",
                no_reaction: "No reaction"
            }
        },
        labels: {
            input: "INPUT",
            hints: "HINTS",
            substance: "Substance",
            tool: "Test Tool",
            observation: "Observation",
            method: "Method",
            hint: "Hint"
        },
        hints: {
            soda: "Baking Soda: Fizzes with vinegar (CO₂)",
            starch: "Starch: Turns blue-black with iodine",
            salt: "Salt: Dissolves completely in water"
        },
        mission: {
            title: "POWDER IDENTIFICATION",
            description: "Identify mysterious white powders using classical chemical tests. Master qualitative analysis."
        },
        stages: {
            identify: "IDENTIFY",
            properties: "PROPERTIES",
            reactions: "REACTIONS",
            experiment: "EXPERIMENT"
        },
        prompts: {
            identify_powders: "Identify the three white powders",
            use_tools: "Use: Water, Vinegar, Fire, Iodine",
            test_observe: "Test and observe",
            answer: "Answer",
            powder_a: "Powder A is",
            powder_b: "Powder B is",
            powder_c: "Powder C is",
            product: "Main product",
            review_design: "Review the experimental design.",
            understood: "Understood?",
            confirm_1: "Type 1 to confirm"
        },
        properties_q: {
            basic_0: "Which powder fizzes with vinegar?",
            basic_1: "Which powder turns blue-black with iodine?",
            basic_2: "Which powder dissolves completely in water?",
            basic_3: "Which powder is white and crystalline?",
            basic_4: "Which powder produces bubbles with acid?",
            core_0: "Which powder produces CO₂ gas?",
            core_1: "Which powder forms a colloidal suspension?",
            core_2: "Which powder has the highest solubility?",
            core_3: "Which powder reacts with acetic acid?",
            core_4: "Which powder is a polysaccharide?",
            advanced_0: "Which powder is sodium bicarbonate?",
            advanced_1: "Which powder is sodium chloride?",
            advanced_2: "Which powder is a carbohydrate polymer?",
            advanced_3: "Which powder releases carbonic acid?",
            advanced_4: "Which powder forms an ionic solution?",
            elite_0: "Which powder has formula NaHCO₃?",
            elite_1: "Which powder has formula NaCl?",
            elite_2: "Which powder has formula (C₆H₁₀O₅)ₙ?",
            elite_3: "Which powder undergoes acid-base neutralization?",
            elite_4: "Which powder forms a triiodide complex?"
        },
        reactions_q: {
            basic_0: "Baking soda + Vinegar reaction",
            basic_1: "Starch + Iodine test",
            basic_2: "Salt dissolving in water",
            basic_3: "Baking soda heating",
            basic_4: "Starch hydrolysis",
            core_0: "Complete neutralization of baking soda",
            core_1: "Starch-iodine complex formation",
            core_2: "Salt crystallization",
            core_3: "Baking soda decomposition temperature",
            core_4: "Enzymatic breakdown of starch",
            advanced_0: "Baking soda with strong acid",
            advanced_1: "Starch complete hydrolysis",
            advanced_2: "Salt electrolysis",
            advanced_3: "Baking soda buffer system",
            advanced_4: "Starch gelatinization",
            elite_0: "Baking soda in blood pH regulation",
            elite_1: "Starch-iodine complex structure",
            elite_2: "Salt in Solvay process",
            elite_3: "Baking soda thermal decomposition kinetics",
            elite_4: "Starch retrogradation"
        },
        experiments: {
            ph_analysis: {
                title: "Rhine Water Buffer Analysis",
                context: "Basel Environmental Agency: Analyzing the buffering capacity of the Rhine...",
                purpose: "Determine if local water samples can resist pH changes.",
                materials: ["Rhine water sample", "Universal indicator", "0.1M HCl", "0.1M NaOH", "Beakers"],
                procedure: ["1. Pour 50mL of sample into beaker.", "2. Add 2 drops of indicator.", "3. Titrate with HCl dropwise.", "4. Record drops until color changes."],
                expectedResults: "The local limestone should provide mild buffering capacity.",
                safetyWarning: "Wear safety goggles. Acids and bases are corrosive.",
                action: "Analyze the Rhine water sample.",
                target: "Buffer Capacity"
            },
            salt_purification: {
                title: "Schweizerhalle Salt Purification",
                context: "Schweizerhalle Salt Works: Purifying rock salt extracted from the deep boreholes...",
                purpose: "Extract pure NaCl from rock salt mixture.",
                materials: ["Rock salt", "Water", "Filter paper", "Funnel", "Evaporating dish", "Bunsen burner"],
                procedure: ["1. Crush rock salt.", "2. Dissolve in warm water.", "3. Filter insoluble impurities.", "4. Evaporate filtrate until crystallization."],
                expectedResults: "White, cubic NaCl crystals remain after evaporation.",
                safetyWarning: "Burn hazard from hot evaporating dish.",
                action: "Purify rock salt.",
                target: "Crystallization"
            }
        }
    },
    sc1_02: {
        back: "Back to Nexus",
        title: "C1.02 // MOLE MASTER",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Stoichiometry Console",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "C1.02_SCALE",
        footer_left: "C1.02_MOLE_MASTER // NODE: BASEL",
        input_tip_1dp: "Tip: Enter result as a fraction (e.g. 4/3) or rounded to 1 decimal place.",
        stages: {
            molar_mass: "MOLAR MASS",
            stoichiometry: "REACTION RATIO",
            yield: "YIELD",
            molar_mass_prompt_latex: "\\text{Calculate the molar mass of the compound.}",
            stoichiometry_prompt_latex: "\\text{Use stoichiometric ratios to compute product moles.}",
            yield_prompt_latex: "\\text{Compute the theoretical yield from the given masses.}"
        },
        labels: {
            input: "INPUT",
            scale: "SCALE READOUT"
        },
        mission: {
            title: "MISSION: NOVARTIS SYNTHESIS BAY",
            description: "Calibrate a pharma-grade reaction. Balance the mole ratios and confirm yields."
        }
    },
    sc1_03: {
        back: "Back to Nexus",
        title: "SC1.03 // ATOMS FORGE",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Atomic Structure",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "SC1.03_ATOM_MONITOR",
        footer_left: "SC1.03_ATOMS_FORGE // NODE: BASEL",
        labels: {
            input: "INPUT",
            hints: "HINTS",
            properties: "PROPERTIES",
            element: "Element",
            atomic_number: "Atomic Number (Z)",
            mass_number: "Mass Number (A)",
            charge: "Charge",
            periodic_table: "PERIODIC TABLE",
            protons: "PROTONS (p⁺)",
            neutrons: "NEUTRONEN (n⁰)",
            electrons: "ELEKTRONEN (e⁻)"
        },
        mission: {
            title: "MISSION: CYBER FORGE",
            description: "Build atoms from subatomic particles. Master the Bohr model and periodic table."
        },
        stages: {
            build: "BUILD",
            elements: "ELEMENTS",
            isotopes: "ISOTOPES",
            build_desc: "Free mode: Build any atom configuration",
            elements_desc: "Explore the first 20 elements of the periodic table",
            isotopes_desc: "Study isotopes: same protons, different neutrons"
        }
    },
    sc1_03_orbitals: {
        back: "Back to Nexus",
        title: "SC1.03 // ATOMS FORGE",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Atomic Orbitals",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "SC1.03_ORBITAL_MONITOR",
        footer_left: "SC1.03_ATOMS_FORGE // NODE: BASEL",
        labels: {
            selected_element: "SELECTED ELEMENT",
            orbital_type: "ORBITAL TYPE",
            show_transition: "Show Electron Transition",
            periodic_table: "PERIODIC TABLE (Z=1-20)",
            orbital_shapes: "ORBITAL SHAPES",
            quantum_numbers: "QUANTUM NUMBERS"
        },
        mission: {
            title: "MISSION: QUANTUM MECHANICS",
            description: "Explore electron orbitals and probability clouds. Visualize s, p, and d orbitals in 3D space."
        },
        stages: {
            s_orbital: "S ORBITALS",
            p_orbital: "P ORBITALS",
            d_orbital: "D ORBITALS",
            s_desc: "Spherical probability distribution",
            p_desc: "Dumbbell-shaped orbitals (px, py, pz)",
            d_desc: "Cloverleaf-shaped orbitals",
            s_hint: "s orbitals: l=0, spherically symmetric",
            p_hint: "p orbitals: l=1, three orientations",
            d_hint: "d orbitals: l=2, five orientations"
        }
    },
    sc1_04: {
        back: "Back to Nexus",
        title: "SC1.04 // PERIODIC PUZZLE",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Atom Structure",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "SC1.04_ATOM_MONITOR",
        footer_left: "SC1.04_PERIODIC_PUZZLE // NODE: BASEL",
        labels: {
            element_info: "ELEMENT INFO",
            formulas: "FORMULAS",
            protons: "PROTONS",
            neutrons: "NEUTRONS",
            electrons: "ELECTRONS",
            select_element: "SELECT ELEMENT"
        },
        mission: {
            title: "MISSION: PERIODIC TABLE",
            description: "Build atoms and discover the periodic table. Master electron configuration."
        },
        stages: {
            build: "BUILD ATOM",
            periodic: "PERIODIC TABLE",
            groups: "ELEMENT GROUPS",
            build_desc: "Build atoms by adding protons, neutrons, and electrons",
            periodic_desc: "Explore the first 20 elements",
            groups_desc: "Understand element groups and periods",
            build_hint: "Proton number determines the element",
            periodic_hint: "Elements are arranged by atomic number",
            groups_hint: "Same group = same valence electrons"
        }
    },
    sc1_05: {
        back: "Back to Nexus",
        title: "SC1.05 // BONDING BRIDGE",
        check: "Verify",
        next: "Next",
        correct: "Bond Verified",
        incorrect: "Bond Failed",
        ready: "Ready",
        monitor_title: "SC1.05_BOND_LAB",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        stages: {
            ionic: "IONIC",
            covalent: "COVALENT",
            lewis: "LEWIS"
        },
        labels: {
            na_cl: "Na + Cl -> NaCl",
            h2: "H + H -> H2",
            co2: "C + 2O -> CO2"
        },
        scenarios: {
            ionic_salts: "Basel Chemical Stores: Understanding ionic bonding between metals and non-metals is fundamental for the production of industrial salts and catalysts.",
            molecular_oxygen: "Rhine Air Quality Station: Covalent bonding in oxygen and nitrogen molecules is studied to understand gas exchange processes in the city's atmosphere.",
            pharmaceutical_chains: "Roche Molecular Design: Developing new drugs in Basel involves engineering specific covalent bonds to create precise molecular architectures.",
            electrostatic_attraction: "University of Basel Physics: Studying the electrostatic forces that hold ionic crystals together at the atomic level using advanced microscopy."
        }
    },
    sc2_01: {
        back: "Back to Nexus",
        title: "C2.01 // CHEMICAL KINETICS",
        difficulty: {
            basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Kinetics Data",
        scenario_title: "BASEL SCENARIO",
        answer_title: "YOUR ANSWER",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "C2.01_KINETICS_MONITOR",
        footer_left: "C2.01_CHEM_KINETICS // NODE: BASEL",
        stages: {
            arrhenius: "ARRHENIUS",
            concentration: "RATE LAW",
            collision: "HALF-LIFE",
            arrhenius_prompt_latex: "\\text{Calculate the rate constant }k\\text{ using the Arrhenius equation.}",
            concentration_prompt_latex: "\\text{Calculate the reaction rate based on concentration changes.}",
            collision_prompt_latex: "\\text{Determine the fraction of effective collisions.}"
        },
        labels: {
            input: "INPUT",
            hints: "HINTS",
            volume: "Titrant Volume",
            ph: "pH"
        },
        mission: {
            title: "MISSION: CHEMICAL KINETICS LAB",
            description: "Study reaction rates in the Basel lab. Master the Arrhenius equation and collision theory."
        },
        formulas: {
            arrhenius: "k = Ae^{-E_a/RT}",
            concentration: "\\text{rate} = -\\frac{\\Delta[A]}{\\Delta t}",
            collision: "f = e^{-E_a/RT}"
        },
        scenarios: {
            arrhenius: "Novartis Kinetics Lab: Study how temperature and activation energy affect reaction rates. The Arrhenius equation k = A·exp(-Ea/RT) describes the temperature dependence of rate constants. Higher temperatures increase molecular kinetic energy, leading to more successful collisions.",
            rate_law: "Roche Pharmaceutical Research: Determine reaction orders and rate laws from experimental data. The rate law expresses how reaction rate depends on reactant concentrations. Understanding rate laws is crucial for optimizing drug synthesis and predicting reaction behavior.",
            half_life: "Basel University Hospital: Calculate drug elimination half-lives for pharmacokinetics. Half-life is the time required for a quantity to reduce to half its initial value. First-order kinetics are common in drug metabolism, where t₁/₂ = ln(2)/k."
        },
        problems: {
            arr_temp_300_ea_50: "Novartis reactor at T=300K, activation energy Ea=50 kJ/mol. Calculate relative rate constant k.",
            arr_temp_350_ea_40: "Temperature increased to 350K, Ea=40 kJ/mol. Find k (relative units).",
            arr_temp_400_ea_60: "High-temperature reaction: T=400K, Ea=60 kJ/mol. Calculate k.",
            arr_temp_320_ea_45: "Moderate conditions: T=320K, Ea=45 kJ/mol. Determine k.",
            arr_temp_280_ea_55: "Low-temperature synthesis: T=280K, Ea=55 kJ/mol. Find k.",
            arr_double_temp: "Temperature doubles from 300K to 600K. By what factor does k increase? (Ea=50 kJ/mol)",
            arr_ea_effect: "Catalyst lowers Ea from 80 to 40 kJ/mol at 300K. Find k ratio.",
            arr_ln_form: "Use logarithmic form: ln(k) = ln(A) - Ea/RT. Calculate ln(k) for Ea=50 kJ/mol, T=300K.",
            arr_activation: "Two rate constants differ by factor of 10 over 50K temperature range. Find Ea.",
            arr_catalyst: "Catalyst reduces Ea by 20 kJ/mol (from 80 to 60). Calculate k ratio at 300K.",
            arr_two_temps: "Measure k at 300K and 350K. Use ln(k₂/k₁) = -Ea/R(1/T₂ - 1/T₁) to find Ea=52 kJ/mol.",
            arr_plot: "Arrhenius plot has slope -7800 K. Calculate Ea (slope = -Ea/R).",
            arr_frequency: "Given k=1.5×10⁻⁹, Ea=50 kJ/mol, T=300K. Find pre-exponential factor A.",
            arr_temp_for_k: "Target rate constant k=10⁶ s⁻¹, Ea=60 kJ/mol. What temperature is needed?",
            arr_enzyme: "Enzyme-catalyzed reaction: Ea=40 kJ/mol, body temperature T=310K. Calculate k.",
            arr_complex: "Two-step mechanism: Ea1=50, Ea2=30 kJ/mol. Overall Ea=40 kJ/mol. Find k at 300K.",
            arr_pressure: "Pressure effect: activation volume ΔV‡=-10 cm³/mol. Calculate k ratio.",
            arr_quantum: "Quantum tunneling correction factor κ=2.5. Find effective k.",
            arr_isotope: "Kinetic isotope effect: H vs D substitution. Calculate kH/kD for Ea=50 kJ/mol.",
            arr_transition: "Transition state theory: k=10⁶ s⁻¹ at 300K. Calculate ΔG‡.",
            rl_first_order: "First-order reaction: rate = k[A]. Given [A]=2.0 M, k=0.5 s⁻¹, find rate.",
            rl_second_order: "Second-order: rate = k[A]². [A]=1.5 M, k=0.4 M⁻¹s⁻¹. Calculate rate.",
            rl_zero_order: "Zero-order reaction: rate = k (independent of [A]). k=0.8 M/s. Find rate.",
            rl_concentration: "First-order reaction: [A] doubles. By what factor does rate increase?",
            rl_initial: "Initial rate method: [A]₀=1.0 M, k=0.6 s⁻¹. Calculate initial rate.",
            rl_mixed: "Mixed order: rate = k[A][B]. [A]=2 M, [B]=3 M, k=0.5 M⁻²s⁻¹. Find rate.",
            rl_order: "Doubling [A] quadruples rate. What is the reaction order n?",
            rl_integrated: "Integrated first-order: [A]t = [A]₀·e⁻ᵏᵗ. [A]₀=1 M, k=0.1 s⁻¹, t=10 s. Find [A].",
            rl_time: "First-order half-life: t₁/₂ = ln(2)/k. Given k=0.05 s⁻¹, find t₁/₂.",
            rl_constant: "From rate=2 M/s and [A]=4 M (first-order), determine k.",
            rl_complex_order: "Fractional order: rate = k[A]^1.5[B]^0.5. [A]=4, [B]=9, k=0.2. Find rate.",
            rl_mechanism: "Multi-step: overall rate = k₁k₂/(k₁+k₂). k₁=0.5, k₂=0.3. Calculate rate.",
            rl_steady_state: "Steady-state approximation: [I]ss = k₁[A]/k₂. k₁=0.5, k₂=0.2. Find [I].",
            rl_pre_equilibrium: "Pre-equilibrium: Keq = kf/kr. kf=0.8, kr=0.2. Calculate Keq.",
            rl_inhibition: "Competitive inhibition: rate reduced by factor (1+[I]/KI). [I]=2, KI=1. Find rate factor.",
            rl_oscillating: "Belousov-Zhabotinsky oscillating reaction. Maximum [A] in cycle.",
            rl_autocatalytic: "Autocatalytic: A+B→2B. Inflection point at t=15s for [A]₀=0.1 M.",
            rl_chain: "Chain reaction: chain length ν = kp/kt. kp/kt=100. Find ν.",
            rl_photochemical: "Photochemical quantum yield Φ = molecules reacted / photons absorbed = 0.8.",
            rl_enzyme_complex: "Michaelis-Menten: V = Vmax[S]/(KM+[S]). KM=1, [S]=5. Find V/Vmax.",
            hl_first_order: "First-order half-life: t₁/₂ = ln(2)/k = 0.693/k. k=0.1 s⁻¹. Find t₁/₂.",
            hl_second_order: "Second-order: t₁/₂ = 1/(k[A]₀). k=0.5 M⁻¹s⁻¹, [A]₀=2 M. Calculate t₁/₂.",
            hl_zero_order: "Zero-order: t₁/₂ = [A]₀/(2k). k=0.4 M/s, [A]₀=4 M. Find t₁/₂.",
            hl_remaining: "After 2 half-lives, what fraction remains? [A]₀=8 M → [A]=?",
            hl_time: "75% decay means 2 half-lives. If t₁/₂=10s, total time = 20s.",
            hl_find_k: "From t₁/₂=5s (first-order), calculate k = ln(2)/t₁/₂.",
            hl_fraction: "After 3 half-lives: fraction = (1/2)³ = 1/8 = 0.125.",
            hl_radioactive: "Radioactive decay: N = N₀(1/2)^(t/t₁/₂). N₀=1000, t=20s, t₁/₂=10s. Find N.",
            hl_drug: "Drug elimination: [D]₀=100 mg/L, t₁/₂=4h, t=12h (3 half-lives). [D]=12.5 mg/L.",
            hl_compare: "Compare two reactions: kA=0.2, kB=0.4. Ratio of half-lives = kB/kA = 2.",
            hl_consecutive: "Consecutive A→B→C: maximum [B] at tmax = ln(k₁/k₂)/(k₁-k₂). k₁=0.5, k₂=0.2.",
            hl_parallel: "Parallel paths: koverall = k₁+k₂. k₁=0.3, k₂=0.2, t₁/₂ = ln(2)/0.5.",
            hl_reversible: "Reversible: [A]eq = [A]₀·kr/(kf+kr). kf=0.5, kr=0.1.",
            hl_temperature: "t₁/₂ decreases with temperature. At 350K vs 300K with Ea=50 kJ/mol.",
            hl_enzyme: "Enzyme turnover: kcat=100 s⁻¹. t₁/₂ = ln(2)/kcat = 0.007s.",
            hl_isotope_dating: "Carbon-14 dating: N/N₀=0.25 = (1/2)². Age = 2×5730 = 11460 years.",
            hl_branching: "Branching decay: α and β paths. kα/kβ=2, so fα = 2/3 = 0.67.",
            hl_secular: "Secular equilibrium: parent t₁/₂ >> daughter t₁/₂. Activity ratio → 1.",
            hl_transient: "Transient equilibrium: tmax when daughter activity peaks. t₁/₂,1=10, t₁/₂,2=2.",
            hl_cosmogenic: "¹⁰Be cosmogenic dating: t₁/₂=1.39×10⁶ years. N/N₀=0.5 → age = t₁/₂."
        }
    },
    sc2_02: {
        back: "Back to Nexus",
        title: "SC2.02 // pH SENTINEL",
        difficulty: {
            basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Titration Analysis",
        next: "Next Analysis",
        check: "Verify",
        correct: "Titration Accurate",
        incorrect: "Invalid pH reading",
        ready: "Ready",
        monitor_title: "SC2.02_TITRATION_MONITOR",
        footer_left: "SC2.02_PH_SENTINEL // NODE: BASEL",
        stages: {
            curves: "PH CURVES",
            equivalence: "EQUIVALENCE",
            indicators: "INDICATORS"
        },
        labels: {
            initial_ph: "Initial pH",
            added_vol: "Added Volume (mL)",
            eq_point: "Equivalence Point",
            indicator: "Indicator",
            strong_acid: "Strong Acid",
            weak_acid: "Weak Acid",
            formula: "Titration Formula"
        },
        prompts: {
            curve_type: "Initial pH is {ph}. Identify the acid type (Strong=1, Weak=2).",
            find_eq: "If Va=50mL, Ca=0.1M, Cb=0.2M. Find Vb for equivalence.",
            select_indicator: "Weak acid + Strong base. Choose indicator: Phenol(1), MethylO(2).",
            weak_ph_calc: "At half-equivalence (pH = pKa). If pKa is 4.75, what is the pH?",
            eq_ph_guess: "Equivalence pH of Strong/Strong? (<7=1, 7=2, >7=3).",
            conc_calc: "20mL of unknown acid is neutralized by 10mL of 0.2M NaOH. Find Ca."
        },
        scenarios: {
            water_quality: "IWB Basel Water Filtration: You are a water quality technician at the Industrielle Werke Basel (IWB) filtration plant located along the Rhine. Your responsibility is to ensure the pH of the processed drinking water remains within a strict range (usually 7.2 to 8.5) to prevent corrosion in the city's pipe network. Today, you are performing a precision titration on a sample from the Langen Erlen groundwater enrichment site. The sample shows a slight increase in acidity due to recent heavy rainfall affecting the river's mineral balance. By using a standard solution of NaOH, you must determine the total acidity (alkalinity) to calibrate the lime-dosing system. Accurate pH control is vital because water that is too acidic can leach heavy metals from older plumbing into the homes of Basel's citizens. It's just like when you use a strip to check the pH of your swimming pool to keep the water safe and clear.",
            biotech_titration: "CSL Behring Basel - Protein Stability: You are a laboratory scientist at CSL Behring’s state-of-the-art facility in Basel, working on the purification of plasma-derived proteins used to treat rare diseases. These proteins are highly sensitive to their environment; even a minor deviation from the optimal pH can cause them to denature or lose their therapeutic effectiveness. During the final buffer exchange process, you must perform a titration to verify the buffering capacity of the solution. You are testing if the current weak acid/conjugate base system can resist pH changes when a small amount of pharmaceutical ingredient is added. Your precision ensures that these life-saving medicines remain stable during transport and storage across Switzerland. This balance is similar to how a high-performance car engine needs the right oil viscosity to run smoothly without overheating.",
            environmental_monitoring: "Rhine Ecology Research - Biozentrum: You are an environmental researcher at the University of Basel's Biozentrum, monitoring the impact of urban runoff on the Rhine's delicate ecosystem. Following a major industrial project upstream, you need to assess whether the river's pH profile has shifted, potentially threatening the spawning grounds of the Rhine salmon. You take samples near the Dreiländereck, where France, Germany, and Switzerland meet, and conduct a detailed titration to identify the presence of weak organic acids. The shape of the titration curve you generate today will reveal the concentration of these pollutants. Understanding these chemical shifts is essential for the Cantonal Laboratory to enforce environmental protection laws. It's similar to how a gardener monitors soil pH to ensure their plants can absorb the nutrients they need to grow.",
            gastro_science: "Basel Fine Dining - Culinary Chemistry: You are a specialized food scientist collaborating with a Michelin-starred restaurant in Basel’s Grosse Basel district. Modern gastronomy relies heavily on the precise control of acidity to balance flavors and manage the texture of delicate sauces or fruit gels. You are analyzing the citric acid content in a signature local preserve to ensure it maintains a pH of 3.2, which is critical for both the 'bright' taste and the safe preservation of the product. By performing a titration with a food-grade base, you determine the exact concentration of acid. This scientific approach allows the chef to achieve perfect consistency in every serving. It's just like when you add a squeeze of lemon to a heavy dish—you are using chemistry to balance the flavors on your palate."
        }
    },
    sc2_03: {
        back: "Back to Nexus",
        title: "SC2.03 // AERO LAB",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Gas Properties",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "SC2.03_GAS_MONITOR",
        footer_left: "SC2.03_AERO_LAB // NODE: BASEL",
        labels: {
            pressure: "PRESSURE",
            state_variables: "STATE VARIABLES",
            volume: "VOLUME (V)",
            temperature: "TEMPERATURE (T)",
            moles: "MOLES (n)",
            formulas: "FORMULAS"
        },
        mission: {
            title: "MISSION: IDEAL GAS LAWS",
            description: "Explore the relationship between pressure, volume, and temperature in ideal gases."
        },
        stages: {
            boyle: "BOYLE'S LAW",
            charles: "CHARLES' LAW",
            combined: "COMBINED GAS LAW",
            boyle_desc: "Observe inverse relationship: P ∝ 1/V",
            charles_desc: "Observe direct relationship: V ∝ T",
            combined_desc: "Master the combined gas law",
            boyle_hint: "Boyle's Law: Decrease volume → Increase pressure",
            charles_hint: "Charles' Law: Increase temperature → Increase volume",
            combined_hint: "Combined: All three variables interact"
        },
        scenarios: {
            gas_compression: "Basel Industrial Gas Services: Optimizing the storage of compressed gases for industrial and medical use across Northern Switzerland.",
            weather_balloons: "University of Basel Meteorology: Using Charles' Law to predict the expansion of high-altitude research balloons launched from the city.",
            chemical_reactors: "Lonza Chemical Engineering: Precise control of pressure-volume relationships in reactors is crucial for safe high-pressure synthesis."
        },
        prompts: {
            bvb_brake: "BVB Tram Brake: Air V={V} L at P={P} bar. Compressed to V2={V2} L. Calculate new Pressure P2.",
            euroairport: "EuroAirport Cabin: Air sample at T1={t1} K, P1={p1} kPa. At altitude T2={t2} K, P2={p2} kPa. Find Volume Ratio V2/V1.",
            wickelfisch: "Rhine Wickelfisch: Air V={v1} L at T1={t1} K (Sun). Submerged in water at T2={t2} K. New Volume V2?",
            fire_dept: "Basel Fire Dept: O2 Tank V={V} L, P={P} bar. Usage rate {r} L/min (at 1 bar). Duration in minutes?",
            geothermal: "Geopower Basel: Methane bubble rises from depth (P1={p1} bar, T1={t1} K) to surface (P2=1 bar, T2={t2} K). Expansion Factor?"
        }
    },
    sc2_04: {
        back: "Back to Nexus",
        title: "SC2.04 // SOLUBILITY LAB",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Solution Status",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "SC2.04_SOLUBILITY_MONITOR",
        footer_left: "SC2.04_SOLUBILITY_LAB // NODE: BASEL",
        labels: {
            solubility: "SOLUBILITY",
            saturated: "SATURATED - Precipitate forming",
            unsaturated: "UNSATURATED - Can dissolve more",
            solution_data: "SOLUTION DATA",
            temperature: "TEMPERATURE (°C)",
            solute_amount: "SOLUTE AMOUNT (g)",
            formulas: "FORMULAS"
        },
        mission: {
            title: "MISSION: SOLUBILITY",
            description: "Explore solubility and temperature relationships. Observe crystallization."
        },
        stages: {
            dissolve: "DISSOLVE",
            saturate: "SATURATE",
            crystallize: "CRYSTALLIZE",
            dissolve_desc: "Dissolve solute in water",
            saturate_desc: "Reach saturation point",
            crystallize_desc: "Cool solution to crystallize",
            dissolve_hint: "Most salts dissolve better at higher temperatures",
            saturate_hint: "Saturation: maximum amount dissolved",
            crystallize_hint: "Cooling causes excess solute to crystallize"
        },
        scenarios: {
            pharma_solubility: "Novartis Formulation: Understanding how drug solubility changes with temperature is essential for developing liquid medications and syrups.",
            rhine_pollution_monitoring: "Basel Lab for Environmental Analysis: Monitoring the solubility of trace environmental contaminants in the Rhine water under varying seasonal temperatures.",
            crystallization_purification: "Roche Chemical Production: Large-scale crystallization is a primary method for purifying complex active pharmaceutical ingredients (APIs)."
        }
    },
    sc3_01: {
        back: "Back to Nexus",
        title: "C3.01 // MOLECULAR ARCHITECT",
        difficulty: {
            basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Molecular Structure",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "C3.01_MOLECULE_MONITOR",
        footer_left: "C3.01_MOLECULAR_ARCHITECT // NODE: BASEL",
        labels: {
            input: "INPUT",
            hints: "HINTS",
            atom: "Atom",
            bond: "Bond",
            snap: "Snap",
            grid: "Grid"
        },
        mission: {
            title: "MOLECULAR ASSEMBLY LAB",
            description: "Assemble pharmaceutical molecules using ball-and-stick models. Rotate and observe the 3D structure."
        },
        stages: {
            aspirin: "ASPIRIN",
            caffeine: "CAFFEINE",
            adrenaline: "ADRENALINE"
        },
        scenarios: {
            roche_aspirin: "Hoffmann-La Roche Basel - The Legacy of Synthesis: You are a historical archivist at the Roche Tower, researching the origins of synthetic pharmaceuticals in the city. F. Hoffmann-La Roche was a pioneer in the late 19th century, being one of the first companies to industrially produce pure synthetic aspirin. This breakthrough revolutionized pain management and laid the foundation for Basel becoming a global pharmaceutical hub. As you assemble the acetylsalicylic acid molecule today, you are replicating the work of chemists who transformed the Rhine valley into a center for molecular innovation. Understanding the 3D geometry of aspirin is essential because the spatial arrangement of its functional groups determines how it blocks enzymes in the human body. It’s like discovering the correct blueprint for a bridge that connects medicine to patient relief.",
            novartis_molecular_engineering: "Novartis Campus Basel - Targeted Therapy: You are a medicinal chemist working at the Novartis Campus, one of the most advanced research centers in the world. Your project involves the design of 'small molecule' inhibitors that can specifically target cancer cells without affecting healthy tissue. This 'lock and key' mechanism depends entirely on the 3D shape and electronic properties of the molecules you are building. By rotating and inspecting the ball-and-stick models, you ensure that the stereochemistry is correct for binding to the target receptor. Basel’s research environment provides the collaborative tools needed to bridge the gap between abstract chemical formulas and life-saving treatments. This process is like crafting a custom key for a highly sophisticated lock where only the perfect fit will unlock a cure.",
            basel_nano_hub: "Swiss Nanoscience Institute (SNI) - Atomic Assembly: You are a researcher at the Swiss Nanoscience Institute at the University of Basel, where the boundaries between biology and physics dissolve. Your work focuses on molecular self-assembly, where molecules are designed to spontaneously form complex nanostructures. Today you are modeling a sequence of functionalized carbon rings that will serve as the framework for a new type of biosensor. Managing the bond angles and distances is critical in the nanoscale world, as even a picometer of deviation can change the entire properties of the material. This work is at the forefront of the Basel 'Nano-Tech' revolution, enabling the creation of smarter, more efficient materials. Think of it as playing with LEGO bricks, but where the bricks are atoms and the instructions are the laws of quantum mechanics.",
            lonza_ag_scaling: "Lonza Basel - Industrial Scaling: You are a process engineer at Lonza’s global headquarters in Basel, specializing in the transition from lab-scale synthesis to mass production. Your task is to ensure that complex organic molecules, such as specialized APIs (Active Pharmaceutical Ingredients), can be produced in metric-ton quantities without losing purity. The structural integrity of the molecule must be maintained during high-pressure reactions in Basel’s massive industrial reactors. By accurately modeling the 3D structure today, you are identifying potential 'bottlenecks' in the manufacturing process where bond strain might lead to unwanted side reactions. Your expertise keeps Basel at the cutting edge of chemical manufacturing excellence. This is like scaling up a small-scale prototype of a ship into a massive ocean liner while ensuring every bolt and plate is perfectly aligned.",
            basel_biozentrum_neuro: "Biozentrum University of Basel - Stress Response Research: As a research fellow at the Biozentrum, you are investigating the molecular mechanisms of the 'fight or flight' response. Adrenaline (Epinephrine) is the primary hormone and neurotransmitter driving this pathway. Your task involves identifying the precise placement of Oxygen atoms on the catechol ring, which is critical for its binding affinity to adrenergic receptors. By accurately modeling this 3D structure, you help Basel scientists understand how chronic stress affects cellular signaling in the brain. This molecular mapping is the foundation for developing new treatments for anxiety-related disorders in one of Switzerland's premier life science institutions."
        }
    },
    sc3_02: {
        back: "Return to Nexus",
        title: "SC3.02 // ORGANIC CHEMISTRY BASICS",
        check: "Verify",
        next: "Next",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "SC3.02_ORGANIC_MONITOR",
        footer_left: "SC3.02_ORGANIC_BASICS // NODE: BASEL",
        objective_title: "Active Mission Objective",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        stages: {
            hydrocarbons: "HYDROCARBONS",
            functional_groups: "FUNCTIONAL GROUPS",
            isomers: "ISOMERS"
        },
        labels: {
            molecule_display: "Molecule Display",
            input_terminal: "Input Terminal",
            view_3d: "3D View",
            organic_mastery: "Organic Mastery"
        },
        prompts: {
            name_formula: "What is the molecular formula for {name}?",
            functional_group: "What is the functional group in {name}?",
            isomer_count: "How many isomers does {formula} have?",
            hint_carbons: "This molecule has {count} carbon atoms",
            hint_group: "Look for the characteristic group in {example}",
            hint_isomer: "Consider {type} isomers"
        },
        feedback: {
            correct: "Organic structure understood!",
            incorrect: "Review the molecular structure."
        },
        scenarios: {
            lonza_feedstock: "Lonza Basel - The Global Supply Chain: You are a logistics coordinator at Lonza’s headquarters in Basel, managing the distribution of high-purity chemical feedstocks. These intermediate molecules are the building blocks for thousands of products, from agricultural chemicals to advanced electronics. Today, you are reviewing the molecular specifications of a new batch of hydrocarbons. In the Basel chemical industry, even a minor misunderstanding of a functional group or an isomer can lead to a 'mismatch' in the production line, potentially delaying global pharmaceutical shipments. By mastering the naming and structure of these organic basics, you ensure that Basel remains the reliable backbone of global chemical synthesis. This coordination is like managing a high-speed train network where every switch and signal must be perfectly timed to prevent a collision.",
            basel_polymer_research: "University of Basel - Advanced Materials: You are a materials scientist at the University of Basel, specializing in the development of biocompatible polymers for medical implants. These organic materials are used by local clinics to create custom stents and joint replacements. The properties of these polymers—their strength, flexibility, and degradation rate—are determined entirely by the arrangement of their molecular chains. Today, you are analyzing a series of structural isomers to find the configuration that best mimics human bone tissue. Basel’s rich history in polymer science, dating back to the early dye industry, provides the foundation for this cutting-edge research. It’s like designing a new type of fabric where the way the threads are woven determines whether it's as tough as Kevlar or as soft as silk.",
            green_chemistry_initiative: "Rhine Sustainability Project - Green Chemistry: You are a sustainability officer at a Basel-based chemical consortium, leading an initiative focused on 'Green Chemistry.' The goal is to redesign organic synthesis processes to minimize waste and reduce the use of hazardous solvents, protecting the Rhine’s water quality. Today's task involves identifying the specific functional groups in a new biodegradable cleaning agent. By understanding how these groups interact with the environment, you can predict how the molecule will break down after use. Basel’s commitment to environmental excellence means that every organic reaction must be as clean as it is efficient. This is similar to a chef switching from single-use plastics to compostable packaging—making the process better for the planet without sacrificing the quality of the final product.",
            givaudan_fragrance_design: "Givaudan Basel - The Art of the Molecule: You are a junior perfumer at Givaudan in Basel, working alongside world-class masters of fragrance. The creation of a new perfume is a complex dance between artistic intuition and organic chemistry. Each 'note' in a scent is actually a specific organic molecule, often with a unique functional group that gives it its characteristic aroma, such as the citrus scent of an aldehyde or the floral smell of an ester. Today, you are classifying a series of aromatic molecules to find the perfect addition to a new luxury fragrance. Your work ensures that Givaudan remains the world leader in scent innovation, headquartered right here in Basel. This is like being a painter, but instead of using colors on a canvas, you are using molecular structures to create an olfactory masterpiece that evokes memories and emotions."
        }
    },
    sc3_03: {
        back: "Return to Nexus",
        title: "SC3.03 // ORGANIC REACTIONS",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "SC3.03_REACTION_MONITOR",
        footer_left: "SC3.03_ORGANIC_REACTIONS // NODE: BASEL",
        objective_title: "Active Mission Objective",
        stages: {
            combustion: "COMBUSTION",
            substitution: "SUBSTITUTION",
            addition: "ADDITION"
        },
        labels: {
            reaction_display: "Reaction Display",
            input_terminal: "Input Terminal",
            animation_speed: "Animation Speed",
            show_mechanism: "Show Mechanism",
            chemistry_score: "Chemistry Score"
        },
        prompts: {
            combustion: "Complete combustion of {reactant} produces CO₂ and H₂O. How many CO₂ molecules?",
            substitution: "When {alkane} reacts with {halogen} under UV light, what is the main product?",
            addition: "When {alkene} reacts with {reagent}, what is the product?",
            hint_combustion: "Count carbon atoms in the reactant",
            hint_substitution: "One H atom is replaced by a halogen atom",
            hint_addition: "The double bond opens and adds the reagent"
        },
        scenarios: {
            novartis_combustion: "Novartis Energy Lab - Thermodynamic Optimization: You are an energy efficiency analyst at the Novartis headquarters in Basel, optimizing the combustion processes used to generate heat for large-scale pharmaceutical synthesis. By ensuring complete combustion of methane and other hydrocarbon fuels, you maximize energy output while minimizing the formation of harmful by-products like carbon monoxide. In Basel’s commitment to sustainable operations, every kilojoule of energy must be accounted for. Calculating the stoichiometric amount of CO2 produced is the first step in auditing the facility's carbon footprint. It’s like fine-tuning a massive engine where the fuel is high-purity hydrocarbon and the goal is absolute efficiency.",
            basel_chemical_plant: "Syngenta Basel - Selective Halogenation: You are a process chemist at Syngenta’s research facility in Basel, working on the synthesis of new crop protection agents. Your project requires the selective substitution of a hydrogen atom with a chlorine or bromine atom on a specific alkane chain. This free-radical substitution reaction, initiated by controlled UV light exposure on the banks of the Rhine, is a cornerstone of organic synthesis in the Basel chemical cluster. Precision is everything; an extra substitution could change the molecule's bioactivity entirely. This task is similar to a master watchmaker replacing a single gear in a complex movement—one precise change transforms the entire function of the system.",
            polymer_production: "Lonza Basel - Advanced Addition Polymers: You are a polymer scientist at Lonza in Basel, specializing in the creation of high-performance materials for medical devices. Your work focuses on addition reactions where alkenes are polymerized into long, stable chains. By opening the double bonds of monomers like ethene or propene, you create materials with specific mechanical properties required for surgical implants. Basel’s long history in industrial chemistry provides the perfect ecosystem for this type of innovation. This process is like building a long, unbreakable bridge by snapping together thousands of individual, high-strength links.",
            free_radical_mechanism: "University of Basel - Radical Dynamics: As a doctoral student at the University of Basel’s Department of Chemistry, you are studying the transition states of free radical halogenation. In the Basel laboratory environment, you use advanced laser spectroscopy to observe the fleeting moments when a halogen radical attacks an alkane chain. Understanding these fast-paced reactions is critical for designing safer and more efficient industrial processes. It’s like being a sports photographer capturing the exact millisecond a ball hits a bat—except the ball is a halogen atom and the bat is a carbon-hydrogen bond.",
            reaction_control: "Roche Basel - Process Safety & Analytics: You are a safety engineer at the Roche production site in Basel, monitoring the exothermic nature of addition reactions. Many organic reactions release significant heat, which must be carefully managed to prevent 'runaway' conditions in Basel’s massive industrial reactors. By accurately predicting the product yield and stoichiometry, you ensure that the cooling systems are perfectly calibrated for the reaction scale. Your vigilance keeps the Rhine-side facilities safe and productive. This is like being a flight controller, where every parameter must stay within a strict 'envelope' to ensure a successful journey from reactants to products."
        },
        feedback: {
            correct: "Reaction mechanism understood!",
            incorrect: "Review the reaction mechanism."
        }
    },
    sc3_05: {
        back: "Back to Nexus",
        title: "SC3.05 // MOLECULAR FORGE",
        difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
        objective_title: "Active Mission Objective",
        monitor_title: "Orbital Stability Monitor",
        footer_left: "SC3.05_BONDING // NODE: BASEL",
        check: "Verify",
        next: "Next Synthesis",
        correct: "Geometry Optimized",
        incorrect: "Bond Mismatch",
        ready: "Ready",
        stages: {
            vsepr: "VSEPR GEOMETRY",
            hybridization: "ORBITAL HYBRIDIZATION",
            mo_theory: "MOLECULAR ORBITALS"
        },
        labels: {
            electron_density: "Electron Density",
            bond_angle: "Bond Angle",
            hybrid_type: "Hybridization Type",
            bond_order: "Bond Order",
            paramagnetism: "Magnetic Property",
            lone_pairs: "Lone Pairs",
            bonded_atoms: "Bonded Atoms"
        },
        prompts: {
            vsepr_geometry: "Determine the geometry for {molecule} with {lone} lone pairs and {bonded} atoms.",
            hybridization_type: "What is the hybridization of the central atom in {molecule}?",
            bond_order_calc: "Calculate the bond order for {ion} using MO theory.",
            paramagnetic: "Is {molecule} paramagnetic or diamagnetic according to MO theory?",
            hint_vsepr: "Count the total number of electron domains around the central atom.",
            hint_hybrid: "sp matches 2 domains, sp2 matches 3, sp3 matches 4.",
            hint_mo: "Bond Order = (Bonding - Antibonding) / 2.",
            hint_paramagnetism: "Unpaired electrons result in paramagnetism."
        },
        scenarios: {
            basel_catalysis: "University of Basel - Catalysis Center: Researchers study how catalyst molecular geometry influences reaction rates and selectivity.",
            syngenta_agrochemicals: "Syngenta Basel: Scientists engineer pesticide molecules by optimizing their 3D geometry for maximum receptor binding.",
            quantum_chem_lab: "Swiss Quantum Chemistry Lab: Using supercomputers to calculate molecular orbital energies for new material design.",
            pharmaceutical_design: "Advanced Drug Design Basel: Understanding hybridization state is crucial for predicting the reactivity of drug lead compounds."
        },
        feedback: {
            correct: "Molecular geometry and bonding verified!",
            incorrect: "Geometry unstable. Recalculate orbital interactions."
        }
    },
    sc3_04: {
        back: "Return to Nexus",
        title: "SC3.04 // FUNCTIONAL HORIZON",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "SC3.04_FUNCTIONAL_MONITOR",
        footer_left: "SC3.04_FUNCTIONAL_HORIZON // NODE: BASEL",
        objective_title: "Active Mission Objective",
        stages: {
            alcohols: "ALCOHOLS & ALDEHYDES",
            acids: "CARBOXYLIC ACIDS",
            esters: "ESTERS & PROPERTIES"
        },
        labels: {
            group_display: "Functional Group View",
            property_stats: "Molecular Properties",
            boiling_point: "Boiling Point",
            solubility: "Water Solubility",
            acidity: "Relative Acidity"
        },
        prompts: {
            identify_group: "Identify the functional group in {molecule}.",
            predict_bp: "Which molecule has the highest boiling point?",
            solubility_check: "Is {molecule} soluble in water?",
            acid_strength: "Compare the acidity of {a} and {b}."
        },
        scenarios: {
            novartis_fragrance: "Novartis Fragrance Division: Many pleasant scents in Basel's parks come from alcohols and aldehydes. Small aldehydes often have fruity or floral notes, while long-chain alcohols are used as fixatives in Swiss perfumes.",
            roche_bioactive: "Roche Bioactive Lab: Carboxylic acids are essential functional groups in many drugs discovered in Basel. They often serve as the 'acidic head' that binds to protein receptors in the human body.",
            basel_flavor: "Basel Flavor Laboratory: Swiss confectionery owes its rich flavors to esters. These compounds are formed by the reaction of an alcohol and an acid, creating the characteristic strawberry or pear aromas.",
            solubility_science: "Solubility Science at Novartis: Functional groups determine if a drug will dissolve in the bloodstream. Hydroxyl (-OH) groups increase water solubility through hydrogen bonding, a critical factor for oral medications.",
            molecular_interplay: "Molecular Interplay in Basel: The boiling point of a substance depends on intermolecular forces. Carboxylic acids form strong hydrogen-bonded dimers, leading to much higher boiling points than aldehydes of similar mass."
        },
        feedback: {
            correct: "Functional group mastery achieved!",
            incorrect: "Examine the molecular structure carefully."
        }
    },
    gc1_02: {
        back: "Return to Nexus",
        title: "GC1.02 // ELECTROLYSIS LAB",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "GC1.02_ELECTROLYSIS_MONITOR",
        footer_left: "GC1.02_ELECTROLYSIS_LAB // NODE: BASEL",
        objective_title: "Active Mission Objective",
        stages: {
            principles: "PRINCIPLES",
            plating: "ELECTROPLATING",
            corrosion: "CORROSION CONTROL"
        },
        labels: {
            voltage: "Applied Voltage",
            current: "Current Intensity (I)",
            mass_deposited: "Mass Deposited",
            time: "Duration (s)",
            power_status: "Power Supply Status"
        },
        prompts: {
            calc_mass: "Calculate mass of {metal} deposited by {current}A in {time}s.",
            identify_anode: "In the electrolysis of {solution}, which species is oxidized at the anode?",
            plating_setup: "Which electrode should the object be placed on for plating?",
            corrosion_protection: "Select the best sacrificial anode for protecting {metal}."
        },
        scenarios: {
            basel_metal_refinery: "Basel Metal Refinery: Industrial electrolysis at the Rhine harbor recovers pure metals from ores. High energy efficiency is achieved by precisely controlling the cell voltage and current density.",
            swiss_watchmaking: "Swiss Watchmaking: Gold and silver plating on Basel-crafted watches uses precision electroplating. The thickness of the coating is determined by Faraday's first law of electrolysis.",
            rhine_infrastructure: "Rhine Infrastructure: Protecting Basel's Rhine bridges from corrosion requires cathodic protection. Sacrificial magnesium blocks are attached to the steel pillars to prevent rust through preferential oxidation.",
            faraday_law: "Faraday's Legacy: Michael Faraday's laws quantify the relationship between electricity and mass in electrolysis. One faraday represents the charge of one mole of electrons, approximately 96,485 coulombs.",
            industrial_plating: "Industrial Plating: Large-scale electroplating in Basel's industrial zones provides corrosion resistance for automotive and aerospace components. Cyanide-free baths are now standard for environmental safety."
        },
        feedback: {
            correct: "Electrolytic process understood!",
            incorrect: "Review Faraday's laws and electrode potentials."
        }
    },
    sc2_05: {
        back: "Back to Nexus",
        title: "SC2.05 // ACID-BASE CHEMISTRY",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        stages: {
            ph_basics: "PH FUNDAMENTALS",
            neutralization: "NEUTRALIZATION",
            titration: "TITRATION ANALYSIS"
        },
        scenarios: {
            ph_basics: "Novartis Pharmaceutical pH Control: You are a formulation scientist at Novartis Basel, developing a new oral medication. The drug's stability and bioavailability critically depend on pH. In the stomach (pH 1.5), the active ingredient must remain stable, while in the bloodstream (pH 7.4), it must dissolve rapidly. You are testing buffer systems to maintain the optimal pH range during manufacturing and storage. Using precision pH meters and Henderson-Hasselbalch calculations, you adjust the ratio of weak acid to conjugate base. A deviation of just 0.2 pH units could render the entire batch ineffective, affecting thousands of patients across Switzerland. This pharmaceutical pH control is similar to how your body's blood maintains a narrow pH range to keep you healthy.",
            neutralization: "University Hospital Basel Gastric Treatment: You are a clinical pharmacist at the Universitätsspital Basel, preparing antacid formulations for patients with severe acid reflux. The stomach produces hydrochloric acid (HCl) at pH 1-2, causing painful symptoms. Your task is to calculate the exact amount of sodium bicarbonate (NaHCO₃) needed to neutralize the excess acid without overshooting to alkaline pH, which could cause different complications. You must consider the patient's stomach volume (approximately 50mL when empty) and the acid concentration. The neutralization reaction produces CO₂ gas, which patients experience as burping. Precise stoichiometric calculations ensure effective relief while minimizing side effects. This is exactly like adding baking soda to vinegar in your kitchen, but with medical precision.",
            titration: "Roche Quality Control Laboratory: You are a quality control analyst at Roche's Basel headquarters, performing titration analysis to verify the purity of a new drug compound. Using a calibrated burette, you add standardized NaOH solution dropwise to a sample of the drug dissolved in water. A pH electrode continuously monitors the solution, generating a titration curve on your computer screen. The sharp pH jump at the equivalence point indicates complete neutralization, and the volume of titrant used reveals the drug's exact concentration. Any deviation from the specified purity (99.5% minimum) triggers a full batch investigation. This analytical precision ensures that every Roche medication meets Swiss pharmaceutical standards. It's like using a precise measuring cup to ensure your recipe turns out perfect every time."
        },
        prompts: {
            calculate_ph: "Calculate the pH of the solution.",
            find_concentration: "Determine the concentration of the acid or base.",
            equivalence_point: "Find the volume at the equivalence point.",
            buffer_ph: "Calculate the pH of the buffer system.",
            neutralization_moles: "Calculate moles of product formed."
        },
        labels: {
            acid: "Acid",
            base: "Base",
            salt: "Salt",
            water: "Water",
            ph: "pH",
            concentration: "Concentration",
            volume: "Volume",
            indicator: "Indicator"
        },
        check: "Verify",
        next: "Next Challenge",
        correct: "Reaction Verified",
        incorrect: "Check equilibrium",
        ready: "Ready",
        monitor_title: "SC2.05_ACIDBASE_MONITOR",
        footer_left: "SC2.05_ACIDBASE // NODE: BASEL",
        scenario_title: "BASEL SCENARIO",
        objective_title: "PROBLEM",
        answer_title: "YOUR ANSWER"
    },
    sc2_06: {
        back: "Back to Nexus",
        title: "SC2.06 // REDOX REACTIONS",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        stages: {
            oxidation_state: "OXIDATION STATES",
            electron_transfer: "ELECTRON TRANSFER",
            electrochemistry: "ELECTROCHEMISTRY"
        },
        scenarios: {
            oxidation_state: "Novartis Drug Synthesis Oxidation Control: You are a synthetic chemist at Novartis Basel, working on a complex pharmaceutical synthesis. The active ingredient requires precise oxidation state control of a transition metal catalyst. In your current reaction, manganese cycles between +4 and +7 oxidation states to facilitate C-H bond activation. You must track oxidation state changes through each step to prevent unwanted side reactions. Using spectroscopic analysis, you monitor the purple color of permanganate (Mn⁷⁺) converting to brown manganese dioxide (Mn⁴⁺). A single electron miscalculation could lead to toxic byproducts, making the entire batch unusable. This oxidation state tracking is crucial for producing safe, effective medications for patients across Switzerland. Understanding oxidation states is like tracking bank account balances—you need to know exactly how many electrons each atom has gained or lost.",
            electron_transfer: "Roche Battery Technology Development: You are a materials scientist at Roche's energy research division in Basel, developing next-generation lithium-ion batteries for medical devices. The battery's cathode material (LiCoO₂) undergoes reversible electron transfer during charging and discharging cycles. Cobalt alternates between +3 and +4 oxidation states as lithium ions shuttle in and out. You must balance the redox equations to optimize energy density and cycle life. Each battery cell must deliver exactly 3.7V for 500+ charge cycles to power portable insulin pumps and cardiac monitors reliably. Electron transfer efficiency directly impacts patient safety—a failing battery in a critical medical device could be life-threatening. This is similar to a rechargeable phone battery, but with medical-grade precision and reliability requirements.",
            electrochemistry: "Basel Industrial Electroplating Heritage: You are a process engineer at a Basel metal finishing company, continuing the city's 500-year tradition of precision metalworking. Today, you're electroplating surgical instruments with a thin gold layer for corrosion resistance and biocompatibility. Using the Nernst equation, you calculate the cell potential needed to deposit exactly 2.5 micrometers of gold onto stainless steel forceps. The electrochemical cell operates at 1.5V with carefully controlled current density. Too much current causes rough, porous deposits; too little extends processing time uneconomically. You apply Faraday's laws to determine that 3.2 amperes for 45 minutes will deposit the required mass. This electrochemical precision ensures Basel-made surgical tools meet international medical standards and maintain the city's reputation for quality craftsmanship."
        },
        prompts: {
            oxidation_state: "What is the oxidation state of {element} in {formula}?",
            oxidation_state_complex: "Determine the oxidation state of {element} in the complex {formula}.",
            oxidation_state_organic: "What is the oxidation state of {element} in the organic compound {formula}?",
            oxidizing_agent: "In the reaction {reaction}, identify the oxidizing agent.",
            reducing_agent: "In the reaction {reaction}, identify the reducing agent.",
            electrons_transferred: "How many electrons are transferred in the half-reaction: {reaction}?",
            half_reaction: "Balance the half-reaction in the specified medium: {half}. How many electrons are involved?",
            disproportionation: "In the disproportionation reaction {reaction}, how many total electrons are transferred?",
            anode_process: "What process occurs at the anode in a galvanic cell?",
            cathode_process: "What process occurs at the cathode in a galvanic cell?",
            electron_flow: "From which electrode do electrons flow in the external circuit?",
            salt_bridge: "What species move through the salt bridge?",
            positive_electrode: "Which electrode is positive in a galvanic cell?",
            cell_potential: "Calculate the standard cell potential E° for the cell: {cell}",
            nernst_equation: "Using the Nernst equation, calculate the cell potential for: {cell}",
            faraday_law: "How many grams of {substance} are deposited when a current of {current}A flows for {time}s?"
        },
        labels: {
            input_answer: "Enter Your Answer",
            reaction: "REACTION EQUATION",
            oxidation_state: "Oxidation State",
            electrons: "Electrons Transferred",
            cell_potential: "Cell Potential",
            regional_case: "Regional Case Study // Basel Node"
        },
        mission: {
            title: "REDOX MISSION"
        },
        check: "Verify",
        next: "Next Challenge",
        correct: "Redox Verified",
        incorrect: "Check electron balance",
        ready: "Ready",
        monitor_title: "SC2.06_REDOX_MONITOR",
        footer_left: "SC2.06_REDOX // NODE: BASEL"
    },
    sc1_06: {
        scenarios: {
            RT_BASIC_1: "At the Basel Water Treatment Plant along the Rhine River, chemistry student Emma observes the formation of water molecules during an electrolysis demonstration. The facility processes 180,000 cubic meters of water daily for Basel's 175,000 residents. Dr. Weber, the plant's chief chemist, explains that while they typically separate water into hydrogen and oxygen for purification testing, the reverse reaction—combining hydrogen and oxygen to form water—releases significant energy. This synthesis reaction is fundamental to understanding fuel cell technology, which Novartis is researching for sustainable energy solutions in their pharmaceutical manufacturing processes. Emma learns that this simple reaction powers the hydrogen fuel cells being tested at Basel University's Chemistry Department for future clean energy applications.",
            RT_BASIC_2: "In the Basel Chemistry Lab at the University of Basel, Professor Müller demonstrates electrolysis to her Sekundarschule class. Using a Hoffman apparatus, she passes electric current through water, decomposing it into hydrogen and oxygen gases. The students watch as bubbles form at the electrodes—twice as much hydrogen as oxygen, matching the 2:1 ratio in water's formula. This decomposition reaction is crucial for producing pure hydrogen gas, which Roche uses in their pharmaceutical synthesis processes. The lab, located in the historic St. Johann district near the Novartis campus, has been teaching chemistry fundamentals for over 150 years. Students learn that this reaction requires energy input (endothermic), unlike the synthesis reaction that releases energy.",
            RT_BASIC_3: "At Basel's Environmental Monitoring Station near the Rhine River, technician Marco analyzes air quality data. He explains to visiting students that nitrogen monoxide (NO) forms naturally during thunderstorms when lightning provides enough energy to combine nitrogen and oxygen from the air. This same synthesis reaction occurs in car engines at high temperatures, contributing to Basel's air pollution. The city monitors NO levels carefully, especially near the busy Autobahn A2 that runs through Basel. Novartis and Roche both have strict emission controls to minimize NO production in their facilities. Understanding this synthesis reaction helps students appreciate why Basel invested 45 million Swiss francs in public transportation to reduce vehicle emissions and improve air quality for the city's residents.",
            RT_BASIC_4: "At the Basel Construction Materials Lab, engineer Sarah demonstrates the decomposition of limestone (calcium carbonate) to produce quicklime (calcium oxide). When heated to 900°C in a kiln, limestone breaks down, releasing carbon dioxide gas. This decomposition reaction is essential for producing cement, which Basel uses extensively in construction projects like the new Roche Tower—Switzerland's tallest building at 178 meters. The lab, located in the Kleinhüningen industrial district, tests materials for Basel's building projects. Sarah explains that this reaction requires significant heat energy, making it endothermic. Students learn that the CO2 released contributes to greenhouse gas emissions, which is why Basel's construction industry is researching more sustainable alternatives for the city's growing infrastructure needs.",
            RT_BASIC_5: "In the Novartis Research Laboratory in Basel's St. Johann district, chemist Dr. Chen demonstrates the brilliant white light produced when magnesium burns in oxygen. This synthesis reaction forms magnesium oxide and releases intense energy, making it exothermic. The demonstration captivates visiting Sekundarschule students who are learning about reaction types. Dr. Chen explains that magnesium's reactivity makes it useful in pharmaceutical synthesis, where controlled oxidation reactions are crucial. The lab uses this reaction to teach safety protocols—magnesium fires cannot be extinguished with water and require special Class D fire extinguishers. Students learn that understanding synthesis reactions is fundamental to pharmaceutical chemistry, where Novartis synthesizes over 200 different drug compounds annually in their Basel facilities, serving patients worldwide.",
            RT_CORE_1: "At the Novartis Metal Reactivity Laboratory, researcher Dr. Hoffmann demonstrates single replacement reactions to chemistry students. When zinc metal is added to hydrochloric acid, vigorous bubbling occurs as hydrogen gas is released and zinc chloride forms in solution. This reaction is crucial for understanding metal reactivity series, which guides pharmaceutical chemists in selecting appropriate reaction vessels and equipment. The lab, equipped with state-of-the-art fume hoods, processes over 500 different metal-based reactions monthly for drug development. Dr. Hoffmann explains that zinc's position in the reactivity series makes it more reactive than hydrogen, allowing it to displace hydrogen from acids. This principle is applied in Novartis's synthesis of zinc-containing pharmaceutical compounds used in nutritional supplements distributed throughout Switzerland and Europe.",
            RT_CORE_2: "In the Roche Quality Control Laboratory in Basel's Grenzacherstrasse facility, analyst Maria performs a precipitation test using silver nitrate and sodium chloride. When the two clear solutions mix, a white precipitate of silver chloride immediately forms—a classic double replacement reaction. This test is essential for detecting chloride contamination in pharmaceutical products. The lab conducts over 10,000 quality control tests monthly, ensuring that Roche's medications meet strict purity standards. Maria explains that in double replacement reactions, the positive and negative ions swap partners, forming new compounds. The silver chloride precipitate is so insoluble that even tiny amounts of chloride can be detected, making this reaction invaluable for pharmaceutical quality assurance. Students learn that such analytical techniques help maintain Basel's reputation for pharmaceutical excellence.",
            RT_CORE_3: "At Basel University's Chemistry Institute, Professor Schmidt demonstrates a visually striking single replacement reaction. When a copper wire is placed in silver nitrate solution, beautiful silver crystals begin growing on the copper surface while the solution turns blue from copper(II) nitrate. This reaction illustrates the reactivity series—copper is more reactive than silver and displaces it from solution. The demonstration is part of the university's outreach program, which hosts 2,000 Sekundarschule students annually. Professor Schmidt explains that this same principle is used in electroplating processes at Basel's industrial facilities. Understanding single replacement reactions is crucial for pharmaceutical synthesis, where selective metal displacement reactions are used to purify compounds. The university's chemistry program, which has produced three Nobel laureates, emphasizes hands-on learning of fundamental reaction types.",
            RT_CORE_4: "In the Basel Water Quality Testing Center near the Rhine River, technician Thomas uses a double replacement reaction to test for sulfate contamination. When barium chloride solution is added to a water sample containing sodium sulfate, a white precipitate of barium sulfate forms instantly. This test is critical for monitoring Rhine River water quality, as sulfate levels affect aquatic ecosystems. The center analyzes 500 water samples weekly from various points along Basel's 21 kilometers of Rhine riverfront. Thomas explains that barium sulfate is extremely insoluble, making this double replacement reaction highly sensitive for detecting sulfates. The data helps Basel's environmental authorities ensure that industrial discharge from pharmaceutical companies meets strict environmental standards, protecting the river that provides recreation and ecosystem services for Basel's residents.",
            RT_CORE_5: "At the Novartis Industrial Chemistry Workshop in Basel's Klybeck district, apprentice chemist Lisa demonstrates metal displacement reactions. When an iron nail is immersed in blue copper sulfate solution, the nail becomes coated with reddish copper metal while the solution gradually turns pale green from iron(II) sulfate. This single replacement reaction occurs because iron is more reactive than copper in the metal reactivity series. The workshop trains 50 apprentices annually in fundamental chemistry principles essential for pharmaceutical manufacturing. Lisa explains that understanding metal reactivity is crucial for selecting appropriate equipment materials—using the wrong metal can lead to unwanted reactions that contaminate pharmaceutical products. This principle guides Novartis's choice of stainless steel reactors for drug synthesis, preventing metal contamination in medications distributed worldwide.",
            RT_ADVANCED_1: "At Basel's District Heating Facility in Voltastrasse, engineer Andreas monitors the combustion of natural gas (methane) that heats 15,000 Basel households during winter. The facility burns 45 million cubic meters of natural gas annually, producing carbon dioxide and water vapor. This combustion reaction is highly exothermic, releasing 890 kJ per mole of methane—enough energy to heat water for Basel's heating network. Andreas explains that complete combustion requires sufficient oxygen; incomplete combustion produces toxic carbon monoxide. The facility uses advanced sensors to maintain optimal oxygen levels, ensuring clean combustion. Basel's commitment to sustainability has led to plans for replacing natural gas with renewable biogas by 2030, reducing the city's carbon footprint while maintaining reliable heating for residents through cold Swiss winters.",
            RT_ADVANCED_2: "In the Basel Chemistry Institute's Combustion Analysis Laboratory, Dr. Weber teaches students about propane combustion. Propane, commonly used in laboratory Bunsen burners and portable heaters, undergoes complete combustion when sufficient oxygen is available. The lab uses propane for heating experiments and analytical procedures, consuming approximately 200 kg monthly. Dr. Weber demonstrates how to balance combustion equations—a critical skill for pharmaceutical chemists who must calculate oxygen requirements for oxidation reactions in drug synthesis. The institute, located near Basel's Botanical Garden, emphasizes that understanding combustion stoichiometry is essential for safety. Insufficient oxygen leads to incomplete combustion, producing dangerous carbon monoxide. This knowledge is vital for Novartis and Roche chemists who work with flammable organic solvents in enclosed laboratory spaces.",
            RT_ADVANCED_3: "At the Roche Pharmaceutical Safety Laboratory, safety officer Dr. Zimmermann explains ethanol combustion to new employees. Ethanol, widely used as a solvent in pharmaceutical synthesis, is highly flammable and must be handled carefully. When ethanol burns in sufficient oxygen, it produces carbon dioxide and water, releasing 1,367 kJ per mole. The lab uses 5,000 liters of ethanol monthly in drug purification processes. Dr. Zimmermann emphasizes that ethanol vapors can form explosive mixtures with air at concentrations between 3% and 19%. Understanding this combustion reaction is crucial for laboratory safety—Roche's Basel facilities have maintained zero fire incidents for 15 consecutive years through rigorous safety training. The lab's ventilation systems ensure ethanol vapors never reach dangerous concentrations, protecting the 500 chemists working in the facility.",
            RT_ADVANCED_4: "In the Basel Biochemistry Research Center, Professor Keller explains glucose combustion—the fundamental energy-producing reaction in living cells. While glucose doesn't literally burn in our bodies, cellular respiration is essentially a controlled combustion reaction that releases energy gradually through multiple enzymatic steps. The center studies how cells extract energy from glucose to power biological processes. Professor Keller notes that complete glucose combustion releases 2,808 kJ per mole, which cells capture in ATP molecules. This research is crucial for understanding metabolic disorders like diabetes, a major focus for Novartis's pharmaceutical research. The center collaborates with Roche Diagnostics to develop blood glucose monitors used by 50,000 diabetes patients in Switzerland. Understanding this combustion reaction helps students appreciate the chemistry underlying human metabolism and pharmaceutical interventions.",
            RT_ADVANCED_5: "At Basel's Environmental Chemistry Laboratory near the Autobahn A2, researcher Dr. Müller analyzes octane combustion—the primary reaction in gasoline engines. Octane, a major component of gasoline, undergoes combustion in car engines, producing carbon dioxide and water while releasing energy that powers vehicles. The lab monitors air quality along Basel's major roads, where 80,000 vehicles pass daily. Dr. Müller explains that incomplete combustion produces carbon monoxide and particulate matter, contributing to air pollution. Basel's investment in electric trams and buses aims to reduce combustion-related emissions. Understanding octane combustion is also relevant to pharmaceutical chemistry—Novartis uses similar hydrocarbon combustion principles in their waste incineration facility, which safely destroys 2,000 tons of pharmaceutical waste annually at temperatures exceeding 1,200°C, ensuring complete combustion and minimal environmental impact.",
            RT_ELITE_1: "In the Roche Pharmaceutical Synthesis Laboratory in Basel's Grenzacherstrasse campus, senior chemist Dr. Hartmann oversees the esterification of benzoic acid with methanol to produce methyl benzoate. This synthesis reaction is a crucial step in manufacturing topical anesthetic formulations. The reaction requires an acid catalyst and careful temperature control at 65°C. Dr. Hartmann's team produces 500 kg of methyl benzoate monthly for pharmaceutical applications. The esterification process is fundamental to pharmaceutical chemistry—Roche synthesizes over 50 different ester compounds in Basel for various medications. This reaction demonstrates how simple organic synthesis principles scale to industrial pharmaceutical production. The laboratory's quality control ensures 99.8% purity, meeting strict pharmaceutical standards. Understanding esterification reactions is essential for pharmaceutical chemists developing new drug formulations for Roche's global market.",
            RT_ELITE_2: "At the Novartis Advanced Synthesis Facility in Basel's Klybeck district, Dr. Chen leads the acetylation of aniline to produce acetanilide, an important pharmaceutical intermediate. This synthesis reaction involves treating aniline with acetyl chloride, producing acetanilide and hydrogen chloride gas. The reaction is highly exothermic and requires cooling to maintain temperature at 5°C. Novartis produces 2 tons of acetanilide monthly for analgesic drug synthesis. Dr. Chen explains that acetylation reactions are fundamental to pharmaceutical chemistry—aspirin itself is produced through acetylation of salicylic acid. The facility's advanced reactor systems precisely control reaction conditions, ensuring consistent product quality. This synthesis pathway has been used in Basel's pharmaceutical industry for over 80 years, contributing to Switzerland's reputation for pharmaceutical excellence. The process demonstrates how classical organic synthesis reactions remain essential in modern drug manufacturing.",
            RT_ELITE_3: "In the Novartis Historical Pharmaceutical Laboratory, curator Dr. Schneider demonstrates the classic synthesis of aspirin (acetylsalicylic acid) from salicylic acid and acetic anhydride. This synthesis reaction, discovered in 1897, revolutionized pain management and established Basel as a pharmaceutical center. The reaction produces aspirin, acetic acid, and carbon dioxide. While modern Novartis facilities use more efficient processes, this classical synthesis is still taught to chemistry students to illustrate pharmaceutical history. The laboratory, located in Novartis's original building from 1886, preserves historical equipment and documents. Dr. Schneider explains that understanding this synthesis reaction connects students to Basel's pharmaceutical heritage—aspirin was one of the first synthetic drugs mass-produced in Basel, with global sales exceeding 40,000 tons annually. This reaction exemplifies how organic synthesis transformed medicine and established Basel's pharmaceutical industry.",
            RT_ELITE_4: "At the Roche Advanced Organic Chemistry Laboratory, Dr. Hoffmann supervises the synthesis of phenylacetonitrile from benzyl chloride and sodium cyanide. This single replacement reaction, where cyanide displaces chloride, is crucial for producing pharmaceutical intermediates. The reaction requires strict safety protocols due to cyanide toxicity—the lab operates under negative pressure with advanced scrubbing systems. Roche produces 800 kg of phenylacetonitrile monthly for synthesizing cardiovascular medications. Dr. Hoffmann emphasizes that while this appears to be a simple displacement reaction, it's actually an SN2 nucleophilic substitution—a sophisticated mechanism taught in advanced organic chemistry. The laboratory's safety record is impeccable, with zero cyanide exposure incidents in 20 years. This reaction demonstrates how pharmaceutical chemists adapt classical reaction types for complex drug synthesis, maintaining Basel's position as a global pharmaceutical innovation center.",
            RT_ELITE_5: "In the Novartis Pharmaceutical Process Development Laboratory, chemist Dr. Weber demonstrates the synthesis of sodium phenoxide from phenol and sodium hydroxide. This double replacement reaction (actually an acid-base neutralization) is essential for activating phenol for subsequent coupling reactions in drug synthesis. The reaction is exothermic, releasing heat as the phenoxide salt forms. Novartis uses this reaction in synthesizing antimicrobial agents and preservatives for pharmaceutical formulations. Dr. Weber's team processes 1,500 kg of phenol monthly in various pharmaceutical syntheses. The laboratory, equipped with automated reactors and real-time monitoring systems, ensures precise control of reaction conditions. Understanding this reaction type is crucial for pharmaceutical chemists—many drug molecules contain phenolic groups that must be activated through similar reactions. This process exemplifies how fundamental reaction types scale to industrial pharmaceutical production in Basel's world-leading pharmaceutical facilities.",
            EB_BASIC_1: "At Basel University's Hydrogen Fuel Cell Research Laboratory, doctoral student Thomas balances the equation for water formation. This fundamental reaction is crucial for understanding fuel cell technology, which the university is developing in partnership with Novartis for sustainable energy applications. The lab's prototype fuel cells generate electricity by combining hydrogen and oxygen, producing only water as a byproduct. Thomas explains that balancing this equation requires 2 molecules of hydrogen for every 1 molecule of oxygen to satisfy the law of conservation of mass. The research aims to power Novartis's pharmaceutical manufacturing with clean energy, reducing Basel's carbon footprint. The university's fuel cell program has attracted 5 million Swiss francs in research funding and collaborates with 15 international institutions to advance hydrogen technology for pharmaceutical and industrial applications.",
            EB_BASIC_2: "In the Novartis Ammonia Synthesis Laboratory, process engineer Dr. Müller teaches students about the Haber-Bosch process for producing ammonia. This reaction combines nitrogen from air with hydrogen to form ammonia, which Novartis uses in pharmaceutical production. Balancing this equation reveals that 3 molecules of hydrogen react with 1 molecule of nitrogen to produce 2 molecules of ammonia. The laboratory produces 50 tons of ammonia annually for synthesizing pharmaceutical intermediates and cleaning agents. Dr. Müller explains that this reaction requires high pressure (200 atmospheres) and temperature (450°C) with an iron catalyst. Understanding equation balancing is essential for calculating reactant quantities—using the wrong ratio wastes expensive materials and reduces efficiency. This reaction's industrial importance earned Fritz Haber the 1918 Nobel Prize in Chemistry, demonstrating how fundamental chemistry principles enable large-scale pharmaceutical manufacturing.",
            EB_BASIC_3: "At the Basel Materials Science Laboratory, researcher Dr. Schmidt studies iron oxidation—the rusting process that affects pharmaceutical equipment. When iron reacts with oxygen, it forms iron(III) oxide (rust). Balancing this equation shows that 4 iron atoms react with 3 oxygen molecules to produce 2 formula units of iron oxide. This reaction costs Basel's pharmaceutical industry millions annually in equipment maintenance and replacement. Dr. Schmidt's research focuses on protective coatings to prevent rust in Roche's and Novartis's manufacturing facilities. The laboratory tests over 200 different coating materials monthly, seeking solutions that withstand harsh chemical environments in pharmaceutical production. Understanding this oxidation reaction helps students appreciate why pharmaceutical companies invest heavily in stainless steel equipment—the chromium in stainless steel forms a protective oxide layer that prevents iron oxidation, ensuring equipment longevity and product purity.",
            EB_BASIC_4: "In the Roche Equipment Manufacturing Workshop, engineer Lisa explains aluminum oxidation to apprentice chemists. When aluminum reacts with oxygen, it forms a protective aluminum oxide layer that prevents further corrosion. Balancing this equation requires 4 aluminum atoms and 3 oxygen molecules to produce 2 formula units of aluminum oxide. This self-protecting property makes aluminum ideal for pharmaceutical equipment—Roche uses aluminum reactors for synthesizing acid-sensitive compounds. The workshop manufactures custom aluminum equipment for Roche's Basel facilities, producing 50 specialized reactors annually. Lisa demonstrates that despite aluminum being more reactive than iron, its oxide layer makes it more corrosion-resistant. This principle guides equipment selection in pharmaceutical manufacturing, where material compatibility with reactive chemicals is crucial. Understanding equation balancing helps chemists calculate the aluminum thickness needed to ensure adequate protection after oxide layer formation.",
            EB_BASIC_5: "At Basel's Natural Gas Distribution Center in Kleinhüningen, safety inspector Andreas teaches students about methane combustion. Natural gas, which is primarily methane, heats 40% of Basel's buildings. Balancing the combustion equation shows that 1 methane molecule requires 2 oxygen molecules to produce 1 carbon dioxide and 2 water molecules. The center distributes 120 million cubic meters of natural gas annually to Basel residents and industries, including pharmaceutical facilities. Andreas emphasizes that proper equation balancing is crucial for safety—insufficient oxygen leads to incomplete combustion, producing toxic carbon monoxide. The center's monitoring systems ensure optimal combustion in Basel's heating systems. Understanding this balanced equation helps students appreciate why proper ventilation is essential when using gas appliances, preventing carbon monoxide poisoning that affects dozens of Swiss residents annually due to inadequate ventilation.",
            EB_CORE_1: "At the Basel Water Treatment Plant's Phosphate Removal Facility, chemist Dr. Weber demonstrates how calcium hydroxide removes phosphates from wastewater. This double replacement reaction forms insoluble calcium phosphate, which precipitates out of solution. Balancing this equation with polyatomic ions requires 3 calcium hydroxide molecules and 2 phosphoric acid molecules to produce 1 calcium phosphate and 6 water molecules. The facility treats 180,000 cubic meters of water daily, removing phosphates that would otherwise cause algae blooms in the Rhine River. Dr. Weber explains that balancing equations with polyatomic ions is easier when treating groups like phosphate (PO₄³⁻) as single units. This process protects Basel's Rhine riverfront, where 50,000 residents enjoy recreational activities annually. Understanding polyatomic ion balancing is essential for pharmaceutical wastewater treatment at Novartis and Roche facilities.",
            EB_CORE_2: "In the Basel Industrial Chemistry Museum, curator Dr. Hoffmann explains iron ore reduction—the process that enabled the Industrial Revolution. When carbon monoxide reduces iron(III) oxide, it produces pure iron and carbon dioxide. Balancing this equation requires 1 iron oxide molecule, 3 carbon monoxide molecules, producing 2 iron atoms and 3 carbon dioxide molecules. While Basel no longer has steel mills, this reaction's principles apply to pharmaceutical chemistry. Novartis uses similar reduction reactions to synthesize pharmaceutical compounds, replacing oxygen with other functional groups. The museum, located in Basel's former industrial district, attracts 5,000 visitors annually. Dr. Hoffmann emphasizes that understanding reduction reactions is fundamental to pharmaceutical synthesis—many drug molecules require selective reduction of specific functional groups, using the same chemical principles that once produced steel for Basel's industrial economy.",
            EB_CORE_3: "At the Novartis Nitric Acid Production Facility, process engineer Dr. Chen oversees the Ostwald process for producing nitric acid, which begins with ammonia oxidation. This reaction requires precise balancing: 4 ammonia molecules react with 5 oxygen molecules to produce 4 nitrogen monoxide molecules and 6 water molecules. The facility produces 200 tons of nitric acid monthly for pharmaceutical synthesis. Dr. Chen explains that this reaction occurs at 900°C over a platinum-rhodium catalyst, with 95% conversion efficiency. Nitric acid is essential for synthesizing many pharmaceutical compounds, including antibiotics and cardiovascular medications. Understanding this complex equation balancing is crucial for process engineers who must calculate reactant flows to maintain optimal production rates. The facility's sophisticated control systems monitor reaction stoichiometry in real-time, ensuring consistent product quality for Novartis's pharmaceutical manufacturing operations.",
            EB_CORE_4: "In the Roche Analytical Chemistry Laboratory, analyst Maria demonstrates aluminum's reaction with sulfuric acid. This single replacement reaction produces aluminum sulfate and hydrogen gas. Balancing this equation with polyatomic sulfate ions requires 2 aluminum atoms and 3 sulfuric acid molecules to produce 1 aluminum sulfate molecule and 3 hydrogen molecules. The laboratory uses this reaction to prepare aluminum sulfate for water purification tests. Maria explains that treating sulfate (SO₄²⁻) as a single unit simplifies balancing—count 3 sulfate groups on each side. This principle is essential for pharmaceutical chemists working with polyatomic ions in drug synthesis. The laboratory conducts 500 analytical tests weekly, ensuring pharmaceutical products meet purity standards. Understanding polyatomic ion balancing helps students appreciate the complexity of pharmaceutical quality control, where precise stoichiometry ensures medication safety for patients worldwide.",
            EB_CORE_5: "At Basel University's Combustion Research Laboratory, Professor Müller teaches students to balance ethane combustion equations. Ethane, a component of natural gas, requires careful balancing: 2 ethane molecules react with 7 oxygen molecules to produce 4 carbon dioxide and 6 water molecules. The laboratory studies combustion efficiency for Basel's heating systems, which consume 120 million cubic meters of natural gas annually. Professor Müller emphasizes that balancing combustion equations is challenging because multiple elements must be balanced simultaneously. Students learn to balance carbon first, then hydrogen, and finally oxygen. This systematic approach is essential for pharmaceutical chemists who balance complex organic reactions. The university's combustion research contributes to Basel's sustainability goals—improving combustion efficiency reduces natural gas consumption and carbon emissions, supporting the city's target of carbon neutrality by 2050.",
            EB_ADVANCED_1: "In the Basel Chemistry Institute's Advanced Combustion Laboratory, Dr. Weber challenges students with propane combustion balancing. This equation requires 1 propane molecule and 5 oxygen molecules to produce 3 carbon dioxide and 4 water molecules. The laboratory uses propane in Bunsen burners for heating experiments, consuming 200 kg monthly. Dr. Weber teaches a systematic approach: balance carbon atoms first (3 on each side), then hydrogen (8 on each side), and finally oxygen (10 on each side). This method is crucial for pharmaceutical chemists who balance complex organic synthesis reactions. The institute, founded in 1460, has trained generations of chemists who contributed to Basel's pharmaceutical industry. Understanding combustion stoichiometry helps students calculate oxygen requirements for laboratory safety—insufficient oxygen produces toxic carbon monoxide, a hazard in enclosed laboratory spaces.",
            EB_ADVANCED_2: "At the Roche Laboratory Safety Training Center, instructor Dr. Zimmermann uses butane combustion to teach equation balancing and safety. Butane, used in laboratory burners and portable heaters, requires complex balancing: 2 butane molecules need 13 oxygen molecules to produce 8 carbon dioxide and 10 water molecules. The center trains 500 chemists annually in laboratory safety protocols. Dr. Zimmermann emphasizes that balancing combustion equations helps chemists calculate ventilation requirements—each mole of butane consumes 6.5 moles of oxygen from the air. Inadequate ventilation leads to incomplete combustion and carbon monoxide production. Roche's Basel facilities have maintained zero fire incidents for 15 years through rigorous safety training. Understanding combustion stoichiometry is essential for pharmaceutical chemists who work with flammable organic solvents daily, ensuring safe laboratory operations and protecting the 500 chemists working in Roche's Basel research facilities.",
            EB_ADVANCED_3: "In the Novartis Solvent Recovery Facility, engineer Dr. Chen manages ethanol combustion for waste disposal. Ethanol, widely used as a pharmaceutical solvent, is combusted when contaminated beyond recovery. Balancing this equation requires 1 ethanol molecule and 3 oxygen molecules to produce 2 carbon dioxide and 3 water molecules. The facility processes 5,000 liters of waste ethanol monthly, recovering heat energy for building heating. Dr. Chen explains that precise equation balancing is crucial for calculating oxygen requirements—the facility's incinerator operates at 1,200°C with 20% excess oxygen to ensure complete combustion. This prevents toxic byproduct formation and meets strict Swiss environmental regulations. Understanding ethanol combustion stoichiometry helps pharmaceutical chemists calculate solvent quantities for synthesis reactions and waste disposal costs, contributing to Novartis's sustainability goals of reducing waste and recovering energy from unavoidable waste streams.",
            EB_ADVANCED_4: "At the Basel Biochemistry Research Institute, Professor Keller uses glucose combustion to teach cellular respiration. While glucose doesn't literally burn in cells, the overall equation for cellular respiration matches combustion: 1 glucose molecule reacts with 6 oxygen molecules to produce 6 carbon dioxide and 6 water molecules. This balanced equation represents the complete oxidation of glucose, releasing 2,808 kJ per mole—energy that cells capture in 38 ATP molecules. The institute studies metabolic disorders affecting glucose metabolism, collaborating with Roche Diagnostics to develop blood glucose monitors. Professor Keller emphasizes that understanding this equation's stoichiometry helps students appreciate why we breathe—we inhale oxygen to oxidize glucose and exhale carbon dioxide as waste. This fundamental biochemical equation connects chemistry to human physiology, illustrating why Basel's pharmaceutical companies invest heavily in metabolic disease research.",
            EB_ADVANCED_5: "In the Novartis Materials Chemistry Laboratory, researcher Dr. Hoffmann demonstrates magnetite reduction with hydrogen. This reaction reduces iron(II,III) oxide (magnetite) to pure iron using hydrogen gas. Balancing this equation requires 1 magnetite molecule and 4 hydrogen molecules to produce 3 iron atoms and 4 water molecules. While this reaction isn't used in pharmaceutical synthesis, its principles apply to reducing functional groups in drug molecules. The laboratory studies reduction reactions for synthesizing pharmaceutical intermediates, processing 200 different reduction reactions monthly. Dr. Hoffmann explains that hydrogen reduction is cleaner than carbon monoxide reduction, producing only water as a byproduct. This principle guides Novartis's green chemistry initiatives—selecting reactions that minimize hazardous waste. Understanding complex equation balancing with mixed oxidation states prepares students for advanced pharmaceutical chemistry, where precise stoichiometry ensures efficient drug synthesis and minimal waste production.",
            EB_ELITE_1: "In the Novartis Historical Pharmaceutical Laboratory, Dr. Schneider demonstrates aspirin synthesis—the reaction that established Basel's pharmaceutical industry. Salicylic acid reacts with acetic anhydride to produce aspirin (acetylsalicylic acid) and acetic acid. This equation is already balanced with coefficients of 1, but students must verify that all atoms balance correctly. The laboratory preserves the original equipment from 1897 when Felix Hoffmann first synthesized aspirin. Dr. Schneider explains that this synthesis revolutionized medicine—aspirin became the world's most widely used medication, with global consumption exceeding 40,000 tons annually. Modern Novartis facilities produce aspirin more efficiently, but this classical synthesis remains important for teaching pharmaceutical chemistry principles. Understanding this balanced equation connects students to Basel's pharmaceutical heritage and illustrates how organic synthesis transformed medicine, establishing Basel as a global pharmaceutical center.",
            EB_ELITE_2: "At the Roche Advanced Organic Synthesis Laboratory, Dr. Weber oversees aniline nitration—a key step in synthesizing pharmaceutical dyes and intermediates. Aniline reacts with nitric acid in the presence of sulfuric acid catalyst to produce nitrobenzene and water. Balancing this equation requires careful attention to all atoms, including the sulfuric acid catalyst that doesn't appear in products. The laboratory produces 1,000 kg of nitrated aromatic compounds monthly for pharmaceutical synthesis. Dr. Weber explains that this nitration reaction requires precise temperature control below 10°C to prevent dangerous side reactions. The facility's advanced cooling systems and safety protocols have maintained zero incidents for 25 years. Understanding this balanced equation is crucial for pharmaceutical chemists—nitration is a fundamental reaction for introducing functional groups into aromatic compounds, enabling synthesis of complex drug molecules that treat cardiovascular disease, cancer, and infectious diseases.",
            EB_ELITE_3: "In the Novartis Pharmaceutical Research Laboratory, Dr. Chen studies caffeine derivatives for developing new medications. Caffeine reacts with formaldehyde in acidic conditions to produce methylated caffeine derivatives used in pharmaceutical research. This balanced equation shows 1:1:1 stoichiometry, but students must verify all atoms balance correctly, including the complex caffeine molecule with its multiple nitrogen atoms. The laboratory synthesizes 50 different caffeine derivatives annually, investigating their potential as bronchodilators and cognitive enhancers. Dr. Chen explains that caffeine's structure makes it an excellent scaffold for drug development—small modifications create compounds with different pharmacological properties. Understanding how to balance equations with complex organic molecules is essential for pharmaceutical chemists who design and synthesize new drug candidates. This research contributes to Novartis's pipeline of innovative medications serving patients worldwide.",
            EB_ELITE_4: "At the Roche Pharmaceutical Synthesis Facility, senior chemist Dr. Hartmann demonstrates converting benzoic acid to benzoyl chloride using thionyl chloride. This reaction produces benzoyl chloride, sulfur dioxide, and hydrogen chloride gases. The equation is balanced with all coefficients equal to 1, but students must verify that all atoms—including sulfur and chlorine—balance correctly. The facility produces 500 kg of benzoyl chloride monthly for synthesizing pharmaceutical intermediates. Dr. Hartmann emphasizes that this reaction requires careful handling—both products are corrosive gases that must be scrubbed before release. The laboratory's advanced fume hood systems protect chemists and the environment. Understanding this balanced equation is crucial for pharmaceutical synthesis—acid chlorides like benzoyl chloride are highly reactive intermediates used in countless drug synthesis pathways. This reaction exemplifies how pharmaceutical chemists manipulate functional groups to build complex drug molecules.",
            EB_ELITE_5: "In the Novartis Pharmaceutical Salt Formation Laboratory, Dr. Müller oversees the synthesis of pharmaceutical salts from organic bases. Ephedrine, a decongestant and bronchodilator, reacts with hydrochloric acid to form ephedrine hydrochloride—a more stable, water-soluble salt suitable for pharmaceutical formulations. This balanced equation shows simple 1:1:1 stoichiometry, but students must recognize that the product is an ionic salt, not a covalent compound. The laboratory produces 2 tons of pharmaceutical salts monthly, converting poorly soluble drug molecules into forms suitable for tablets and injections. Dr. Müller explains that salt formation is crucial in pharmaceutical development—over 50% of marketed drugs are administered as salts to improve solubility, stability, and bioavailability. Understanding this balanced equation helps students appreciate how pharmaceutical chemists optimize drug properties through chemical modification, ensuring medications effectively reach their targets in the human body.",
            RS_BASIC_1: "At the Basel Chemistry Demonstration Laboratory, Professor Schmidt shows students the explosive reaction between hydrogen and chlorine gases. When exposed to light, these gases combine violently to form hydrogen chloride, releasing significant energy. This exothermic synthesis reaction demonstrates bond breaking and forming—H-H and Cl-Cl bonds break, while new H-Cl bonds form. The laboratory uses this dramatic demonstration to teach reaction energetics to 500 students annually. Professor Schmidt emphasizes safety—the reaction is performed behind protective shields due to its explosive nature. Understanding this reaction helps students visualize molecular-level changes during chemical reactions. The demonstration connects to pharmaceutical chemistry—Roche and Novartis use hydrogen chloride in numerous synthesis reactions, though under carefully controlled conditions. This simple reaction illustrates fundamental principles that apply to complex pharmaceutical synthesis processes.",
            RS_BASIC_2: "In the Basel Environmental Chemistry Laboratory, Dr. Weber demonstrates nitrogen monoxide formation using an electric arc to simulate lightning. This endothermic reaction requires energy input to break the strong triple bond in nitrogen molecules. Students observe how the electric arc provides energy to overcome the activation barrier, allowing nitrogen and oxygen to combine. The laboratory studies this reaction because it occurs in car engines and contributes to air pollution. Basel monitors NO levels at 15 stations throughout the city, especially near the Autobahn A2 where 80,000 vehicles pass daily. Dr. Weber explains that understanding this reaction's energy requirements helps engineers design catalytic converters that reduce NO emissions. The visualization shows nitrogen and oxygen molecules colliding with sufficient energy to break bonds and form new N-O bonds, illustrating how endothermic reactions require continuous energy input.",
            RS_BASIC_3: "At the Novartis Fuel Cell Research Laboratory, engineer Thomas demonstrates water formation in a hydrogen fuel cell. This highly exothermic reaction releases 286 kJ per mole of water formed, which the fuel cell converts to electricity. Students observe the molecular animation showing hydrogen and oxygen molecules approaching, bonds breaking, and new H-O bonds forming in water molecules. The laboratory's prototype fuel cells generate 10 kilowatts of electricity, enough to power laboratory equipment. Thomas explains that this reaction's energy release makes hydrogen an excellent fuel—it produces three times more energy per kilogram than gasoline. Novartis is investing in fuel cell technology to power pharmaceutical manufacturing sustainably. The visualization helps students understand why this reaction is exothermic—the bonds formed in water are stronger than the bonds broken in hydrogen and oxygen, releasing excess energy.",
            RS_BASIC_4: "In the Basel Combustion Science Laboratory, Dr. Hoffmann demonstrates carbon combustion—the fundamental reaction in coal burning. When carbon reacts with oxygen, it forms carbon dioxide and releases 394 kJ per mole. The molecular animation shows oxygen molecules approaching carbon atoms, bonds forming between carbon and oxygen atoms, and energy being released as heat and light. This exothermic reaction powered the Industrial Revolution and still generates 40% of global electricity. The laboratory studies combustion efficiency for Basel's waste incineration facility, which burns 100,000 tons of waste annually. Dr. Hoffmann explains that complete combustion requires sufficient oxygen—inadequate oxygen produces toxic carbon monoxide. Understanding this reaction's energetics helps students appreciate why carbon-based fuels release so much energy and why transitioning to renewable energy is crucial for reducing carbon dioxide emissions and combating climate change.",
            RS_BASIC_5: "At the Roche Chemical Safety Training Center, instructor Dr. Chen demonstrates magnesium combustion's brilliant white light. This highly exothermic reaction releases 602 kJ per mole of magnesium oxide formed. The molecular simulation shows magnesium atoms approaching oxygen molecules, electrons transferring from magnesium to oxygen, and ionic bonds forming in magnesium oxide. Students observe that this reaction is so exothermic it produces light bright enough to damage eyes without protection. The center trains 500 chemists annually in handling reactive metals safely. Dr. Chen emphasizes that magnesium fires cannot be extinguished with water—water reacts with hot magnesium, producing hydrogen gas that can explode. Understanding this reaction's energetics and mechanism helps pharmaceutical chemists work safely with reactive metals used in drug synthesis. The visualization illustrates how ionic bond formation releases tremendous energy.",
            RS_CORE_1: "At Basel's Natural Gas Research Laboratory, Dr. Müller uses molecular animation to teach methane combustion. This complex reaction involves breaking four C-H bonds and two O=O bonds, then forming two C=O bonds and four O-H bonds. The simulation shows methane and oxygen molecules colliding, bonds breaking in a specific sequence, and new bonds forming in carbon dioxide and water. This exothermic reaction releases 890 kJ per mole of methane, heating 40% of Basel's buildings. The laboratory studies combustion efficiency to reduce natural gas consumption and emissions. Dr. Müller explains that the reaction occurs in multiple steps, though the overall equation shows only reactants and products. Understanding these bond changes helps students appreciate combustion complexity and why complete combustion requires precise oxygen-to-fuel ratios. The visualization illustrates how multiple bonds break and form simultaneously during combustion.",
            RS_CORE_2: "In the Novartis Combustion Analysis Laboratory, researcher Dr. Weber demonstrates ethane combustion using molecular visualization. This reaction involves breaking six C-H bonds, one C-C bond, and seven O=O bonds, then forming eight C=O bonds and twelve O-H bonds. The complex animation shows multiple ethane and oxygen molecules colliding, bonds breaking in stages, and new molecules forming. This exothermic reaction releases 1,560 kJ per mole of ethane. The laboratory analyzes combustion products from Novartis's waste incineration facility, which burns pharmaceutical waste at 1,200°C. Dr. Weber explains that complete combustion requires 3.5 oxygen molecules per ethane molecule—insufficient oxygen produces carbon monoxide and soot. Understanding these multiple bond changes helps pharmaceutical chemists design oxidation reactions for drug synthesis. The visualization illustrates reaction complexity, showing why combustion requires careful oxygen control for complete, clean burning.",
            RS_CORE_3: "At the Roche Catalytic Process Laboratory, engineer Dr. Chen demonstrates ammonia oxidation over a platinum catalyst. This reaction breaks twelve N-H bonds and five O=O bonds, forming four N=O bonds and twelve O-H bonds. The molecular simulation shows ammonia and oxygen molecules adsorbing onto the platinum catalyst surface, bonds breaking and reforming, and products desorbing. This exothermic reaction releases 226 kJ per mole of ammonia and is the first step in nitric acid production. The laboratory produces 200 tons of nitric acid monthly for pharmaceutical synthesis. Dr. Chen explains that the platinum catalyst lowers activation energy, allowing the reaction to occur at 900°C instead of requiring much higher temperatures. Understanding catalytic mechanisms is crucial for pharmaceutical chemistry—Roche uses over 100 different catalysts in drug synthesis. The visualization shows how catalysts facilitate bond breaking and forming without being consumed.",
            RS_CORE_4: "In the Basel University Combustion Dynamics Laboratory, Professor Schmidt uses advanced visualization to teach propane combustion. This reaction breaks eight C-H bonds, two C-C bonds, and five O=O bonds, then forms six C=O bonds and eight O-H bonds. The simulation shows propane molecules colliding with oxygen, bonds breaking in a cascade, and carbon dioxide and water molecules forming. This highly exothermic reaction releases 2,220 kJ per mole of propane. The laboratory studies combustion kinetics for improving heating efficiency in Basel's buildings. Professor Schmidt explains that combustion occurs through free radical chain reactions—the animation shows radical intermediates forming and reacting rapidly. Understanding these complex bond changes prepares students for pharmaceutical chemistry, where multi-step reactions with intermediates are common. The visualization illustrates why combustion is so exothermic—many strong bonds form, releasing substantial energy.",
            RS_CORE_5: "At the Novartis Halogenation Research Laboratory, Dr. Hoffmann demonstrates hydrogen bromide formation using molecular animation. This reaction breaks one H-H bond and one Br-Br bond, forming two H-Br bonds. The simulation shows hydrogen and bromine molecules approaching, bonds breaking, and new hydrogen bromide molecules forming. This exothermic reaction releases 72 kJ per mole of hydrogen bromide. The laboratory studies halogenation reactions for pharmaceutical synthesis—many drugs contain bromine atoms introduced through reactions with hydrogen bromide. Dr. Hoffmann explains that this reaction proceeds through a free radical mechanism when exposed to light, with the animation showing radical intermediates. Understanding halogenation is crucial for pharmaceutical chemistry—Novartis synthesizes 30 different brominated pharmaceutical compounds in Basel. The visualization helps students understand how bond energies determine whether reactions are exothermic or endothermic.",
            RS_ADVANCED_1: "At the Roche Hydrogenation Laboratory, Dr. Weber demonstrates ethylene hydrogenation over a palladium catalyst. This reaction breaks the C=C double bond and H-H bond, forming two new C-H bonds. The molecular animation shows ethylene and hydrogen molecules adsorbing onto the palladium catalyst surface, the pi bond breaking, hydrogen atoms adding to carbon atoms, and ethane desorbing. This exothermic reaction releases 137 kJ per mole of ethylene. The laboratory performs 200 hydrogenation reactions monthly for pharmaceutical synthesis. Dr. Weber explains that hydrogenation is crucial for pharmaceutical chemistry—many drugs require selective reduction of double bonds. The catalyst ensures the reaction occurs at room temperature rather than requiring high temperatures. Understanding hydrogenation mechanisms helps pharmaceutical chemists design selective reactions that reduce specific bonds without affecting other functional groups in complex drug molecules.",
            RS_ADVANCED_2: "In the Novartis Halogenation Synthesis Laboratory, Dr. Chen demonstrates ethylene bromination—a classic addition reaction. The molecular animation shows bromine approaching the ethylene double bond, the pi bond breaking, and bromine atoms adding to form 1,2-dibromoethane. This exothermic reaction proceeds through a cyclic bromonium ion intermediate, which the animation illustrates. The laboratory uses bromination reactions to synthesize pharmaceutical intermediates, processing 500 kg of brominated compounds monthly. Dr. Chen explains that the bromonium ion intermediate ensures anti-addition—the two bromine atoms add from opposite sides of the double bond. Understanding this mechanism is crucial for pharmaceutical synthesis, where stereochemistry determines drug activity. The visualization shows how the bromine molecule polarizes as it approaches the electron-rich double bond, initiating the addition reaction. This reaction exemplifies how pharmaceutical chemists control stereochemistry through mechanistic understanding.",
            RS_ADVANCED_3: "At the Basel Industrial Chemistry Laboratory, Professor Müller demonstrates ethanol synthesis from ethylene and water. This acid-catalyzed hydration reaction breaks the C=C double bond, with water adding across it to form ethanol. The molecular animation shows ethylene protonation, carbocation formation, water attack, and deprotonation to yield ethanol. This exothermic reaction produces 44 kJ per mole of ethanol. The laboratory studies this reaction because it's used industrially to produce ethanol for pharmaceutical solvents—Basel's pharmaceutical companies use 10,000 liters of ethanol monthly. Professor Müller explains that the reaction proceeds through a carbocation intermediate, which the animation clearly shows. Understanding carbocation mechanisms is fundamental to pharmaceutical chemistry—many drug synthesis reactions proceed through carbocation intermediates. The visualization illustrates how acid catalysts facilitate reactions by protonating substrates, creating reactive intermediates.",
            RS_ADVANCED_4: "In the Roche Organic Synthesis Laboratory, Dr. Hartmann demonstrates propylene hydrobromination—a reaction that follows Markovnikov's rule. The molecular animation shows HBr approaching the propylene double bond, the H-Br bond breaking, hydrogen adding to the less substituted carbon, and bromide adding to the more substituted carbon, forming 2-bromopropane. This exothermic reaction proceeds through a secondary carbocation intermediate, which is more stable than the primary carbocation alternative. The laboratory uses this reaction type to synthesize pharmaceutical intermediates with specific regiochemistry. Dr. Hartmann explains that Markovnikov's rule predicts regioselectivity—the hydrogen adds to the carbon with more hydrogens, while the bromide adds to the carbon with fewer hydrogens. Understanding this mechanism is crucial for pharmaceutical synthesis, where regioselectivity determines which isomer forms. The visualization shows why the secondary carbocation forms preferentially, explaining Markovnikov's rule at the molecular level.",
            RS_ADVANCED_5: "At the Novartis Catalytic Hydrogenation Facility, engineer Dr. Weber oversees butene hydrogenation over a nickel catalyst. The molecular animation shows butene and hydrogen adsorbing onto the catalyst surface, the C=C double bond breaking, hydrogen atoms adding from the same side (syn-addition), and butane desorbing. This exothermic reaction releases 126 kJ per mole of butene. The facility produces 5 tons of saturated hydrocarbons monthly for pharmaceutical synthesis. Dr. Weber explains that heterogeneous catalysis ensures syn-addition—both hydrogen atoms add from the catalyst surface side. Understanding stereochemistry in hydrogenation is crucial for pharmaceutical chemistry—many drugs contain saturated carbon chains with specific stereochemistry. The visualization shows how the catalyst surface controls stereochemistry by forcing both hydrogen atoms to add from the same side, demonstrating how catalysts control not just reaction rate but also product stereochemistry.",
            RS_ELITE_1: "In the Novartis Advanced Pharmaceutical Synthesis Laboratory, Dr. Chen demonstrates acetanilide synthesis—a key step in analgesic drug production. The detailed mechanism animation shows aniline's lone pair attacking the carbonyl carbon of acetyl chloride, forming a tetrahedral intermediate. The intermediate collapses, expelling chloride and forming the amide bond. This exothermic reaction releases 50 kJ per mole. The laboratory produces 2 tons of acetanilide monthly for pharmaceutical synthesis. Dr. Chen explains that this acylation reaction is fundamental to pharmaceutical chemistry—many drugs contain amide bonds formed through similar mechanisms. The animation shows curved arrows indicating electron movement, the tetrahedral intermediate's formation and collapse, and HCl elimination. Understanding this mechanism helps pharmaceutical chemists design selective acylation reactions that modify specific amino groups in complex molecules without affecting other functional groups, crucial for synthesizing modern pharmaceuticals.",
            RS_ELITE_2: "At the Roche Esterification Laboratory, Dr. Hartmann demonstrates Fischer esterification—a crucial reaction for pharmaceutical formulations. The mechanism animation shows methanol attacking the protonated carbonyl carbon of benzoic acid, forming a tetrahedral intermediate. The intermediate undergoes proton transfers and eliminates water, forming methyl benzoate. This acid-catalyzed reaction is exothermic, releasing 15 kJ per mole. The laboratory produces 500 kg of methyl benzoate monthly for topical anesthetic formulations. Dr. Hartmann explains that esterification is reversible—excess methanol drives the reaction forward. The detailed animation shows protonation of the carbonyl oxygen, nucleophilic attack, tetrahedral intermediate formation, proton transfers, and water elimination. Understanding this mechanism is essential for pharmaceutical chemists who synthesize ester prodrugs—inactive esters that enzymes convert to active drugs in the body, improving drug delivery and bioavailability.",
            RS_ELITE_3: "In the Roche Advanced Organic Chemistry Laboratory, Dr. Hoffmann demonstrates SN2 nucleophilic substitution—a fundamental mechanism in pharmaceutical synthesis. The animation shows cyanide ion approaching benzyl chloride from the backside, attacking the carbon while the C-Cl bond breaks, with both processes occurring simultaneously. This concerted mechanism inverts the stereochemistry at the carbon center. The laboratory uses this reaction to synthesize phenylacetonitrile, a pharmaceutical intermediate, producing 800 kg monthly. Dr. Hoffmann emphasizes safety—cyanide is extremely toxic, requiring specialized handling. The detailed animation shows the transition state where the carbon is partially bonded to both cyanide and chloride, illustrating the SN2 mechanism's concerted nature. Understanding SN2 mechanisms is crucial for pharmaceutical chemistry—many drug synthesis steps involve nucleophilic substitutions where stereochemistry control is essential for producing active drug enantiomers.",
            RS_ELITE_4: "At the Novartis Pharmaceutical Methylation Laboratory, Dr. Weber demonstrates Williamson ether synthesis—a key reaction for introducing methoxy groups into drug molecules. The mechanism animation shows phenoxide ion (formed by deprotonating phenol with base) attacking methyl iodide's carbon, displacing iodide through an SN2 mechanism. This exothermic reaction produces anisole (methoxybenzene) and hydrogen iodide. The laboratory performs 300 methylation reactions monthly for pharmaceutical synthesis. Dr. Weber explains that this reaction requires strong base to deprotonate phenol, generating the nucleophilic phenoxide ion. The animation shows base deprotonation, phenoxide formation, backside attack on methyl iodide, and iodide displacement. Understanding this mechanism is essential for pharmaceutical chemists—many drugs contain ether linkages introduced through Williamson synthesis. The reaction demonstrates how pharmaceutical chemists use mechanistic knowledge to design selective reactions that modify specific functional groups in complex molecules.",
            RS_ELITE_5: "In the Novartis Historical Pharmaceutical Laboratory, Dr. Schneider demonstrates aspirin synthesis mechanism—the reaction that established Basel's pharmaceutical industry. The detailed animation shows salicylic acid's hydroxyl group attacking acetic anhydride's carbonyl carbon, forming a tetrahedral intermediate. The intermediate collapses, expelling acetate and forming aspirin's ester bond. This exothermic reaction releases 20 kJ per mole. Dr. Schneider explains that this acetylation reaction, discovered in 1897, revolutionized medicine. The mechanism animation shows nucleophilic attack, tetrahedral intermediate formation, and acetate elimination. Modern Novartis facilities produce aspirin more efficiently, but this classical synthesis remains important for teaching pharmaceutical chemistry. Understanding this mechanism connects students to Basel's pharmaceutical heritage—aspirin was among the first synthetic drugs, with global sales exceeding 40,000 tons annually. The reaction exemplifies how mechanistic understanding enables pharmaceutical innovation, establishing Basel as a global pharmaceutical center."
        },
        back: "Back to Nexus",
        title: "SC1.06 // CHEMICAL REACTIONS BASICS",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Chemical Reactions",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "SC1.06_REACTIONS_MONITOR",
        footer_left: "SC1.06_CHEMICAL_REACTIONS // NODE: BASEL",
        stages: {
            reaction_types: "REACTION TYPES",
            equation_balancing: "EQUATION BALANCING",
            reaction_simulation: "REACTION SIMULATION",
            reaction_types_desc: "Classify chemical reactions by type",
            equation_balancing_desc: "Balance chemical equations using coefficients",
            reaction_simulation_desc: "Observe molecular-level reaction animations"
        },
        reactionTypes: {
            synthesis: "Synthesis",
            decomposition: "Decomposition",
            single_replacement: "Single Replacement",
            double_replacement: "Double Replacement",
            combustion: "Combustion"
        },
        reactionTypePatterns: {
            synthesis: "A + B → AB",
            decomposition: "AB → A + B",
            single_replacement: "A + BC → AC + B",
            double_replacement: "AB + CD → AD + CB",
            combustion: "CₓHᵧ + O₂ → CO₂ + H₂O"
        },
        reactionTypeDescriptions: {
            synthesis: "Two or more substances combine to form a single product",
            decomposition: "A single compound breaks down into two or more simpler substances",
            single_replacement: "One element replaces another in a compound",
            double_replacement: "Two compounds exchange ions to form two new compounds",
            combustion: "A hydrocarbon reacts with oxygen to produce carbon dioxide and water"
        },
        ui: {
            submit: "Submit",
            reset: "Reset",
            next: "Next",
            verify: "Verify",
            play: "Play",
            pause: "Pause",
            restart: "Restart",
            speed: "Speed",
            hint: "Hint",
            show_atom_counts: "Show Atom Counts",
            hide_atom_counts: "Hide Atom Counts",
            coefficient: "Coefficient",
            select_reaction_type: "Select Reaction Type"
        },
        feedback: {
            correct: "Correct! Well done.",
            incorrect: "Incorrect. Try again.",
            try_again: "Try again",
            hint_available: "Hint available",
            balanced: "Equation is balanced!",
            unbalanced: "Equation is not balanced",
            check_elements: "Check the following elements:"
        },
        energy: {
            energy_released: "Energy Released",
            energy_absorbed: "Energy Absorbed",
            exothermic: "Exothermic",
            endothermic: "Endothermic",
            energy_diagram: "Energy Diagram"
        },
        atomCount: {
            reactants: "Reactants",
            products: "Products",
            element: "Element",
            count: "Count",
            balanced: "Balanced",
            unbalanced: "Unbalanced",
            atom_count_table: "Atom Count Table"
        },
        prompts: {
            classify_reaction: "Examine the chemical equation and identify the type of reaction. Consider the pattern of reactants and products.",
            balance_equation: "Enter coefficients to balance the chemical equation. Ensure the number of atoms of each element is equal on both sides.",
            observe_simulation: "Watch the molecular animation to observe how bonds break and form during the reaction. Use the controls to play, pause, or restart.",
            analyze_reaction: "Analyze the chemical reaction parameters and verify the stoichiometric relationships."
        },
        visualization: {
            title: "Molecular Visualization",
            description: "Observe the molecular structure and reaction dynamics",
            current_equation: "Current Chemical Equation"
        },
        loading: "Initializing chemical reaction simulation...",
        hints: {
            synthesis_hint: "Look for multiple reactants combining into a single product",
            decomposition_hint: "Look for a single reactant breaking into multiple products",
            single_replacement_hint: "Look for one element replacing another in a compound",
            double_replacement_hint: "Look for two compounds exchanging ions",
            combustion_hint: "Look for a hydrocarbon reacting with oxygen to produce CO₂ and H₂O",
            balancing_hint: "Start by balancing elements that appear in only one reactant and one product",
            coefficient_hint: "Try adjusting the coefficient for {compound}",
            unbalanced_element_hint: "The element {element} is unbalanced: {reactantCount} on the left, {productCount} on the right"
        },
        mission: {
            title: "MISSION: CHEMICAL REACTIONS",
            description: "Master chemical reaction types, equation balancing, and molecular-level understanding of reactions."
        },
        labels: {
            equation: "CHEMICAL EQUATION",
            reaction_type: "REACTION TYPE",
            coefficients: "COEFFICIENTS",
            atom_counts: "ATOM COUNTS",
            energy_change: "ENERGY CHANGE",
            molecular_view: "MOLECULAR VIEW",
            pattern: "PATTERN",
            example: "EXAMPLE"
        },
        equation_balancer: {
            title: "Balance the Chemical Equation",
            element: "Element",
            reactants: "Reactants",
            products: "Products",
            status: "Status",
            balanced: "✓ Equation is balanced!",
            unbalanced: "✗ Equation is not balanced",
            correct: "Correct! The equation is balanced.",
            incorrect: "Incorrect. The equation is not balanced. Check the atom counts.",
            hint: "Hint",
            show_hint: "Show Hint",
            hide_hint: "Hide Hint",
            reset: "Reset",
            submit: "Submit",
            already_balanced: "The equation is already balanced!",
            no_hint: "No hint available.",
            hint_increase_products: "Try increasing the coefficient for a product containing {element}",
            hint_increase_reactants: "Try increasing the coefficient for a reactant containing {element}"
        }
    },
    sc2_07: {
        scenarios: {
            EC_BASIC_1: "At the Basel University Chemistry Department's Hydrogen Energy Research Laboratory, doctoral student Emma investigates water formation for fuel cell applications. When hydrogen gas combines with oxygen to form liquid water, the reaction releases 286 kJ of energy per mole—a highly exothermic process. This fundamental reaction powers the prototype fuel cells being developed in partnership with Novartis for sustainable pharmaceutical manufacturing. Emma's research team has built a 10-kilowatt fuel cell system that generates electricity while producing only pure water as a byproduct. The laboratory, located in the historic Kollegienhaus building near Petersplatz, collaborates with Roche and Novartis to develop clean energy solutions for Basel's pharmaceutical industry. Professor Weber explains that understanding this exothermic reaction is crucial for fuel cell design—the released energy must be managed carefully to prevent overheating. The project has attracted 5 million Swiss francs in research funding and aims to power Novartis's St. Johann campus with hydrogen fuel cells by 2028, reducing Basel's pharmaceutical industry carbon footprint by 15,000 tons of CO2 annually.",
            EC_BASIC_2: "In the Basel Environmental Monitoring Station near the Rhine River, technician Marco analyzes nitrogen oxide formation in urban air. This endothermic reaction requires 180 kJ of energy per mole to break the strong triple bond in nitrogen molecules and form nitrogen monoxide. The reaction occurs naturally during thunderstorms when lightning provides the necessary energy, and also in vehicle engines at high temperatures. Basel's air quality network monitors NO levels at 15 stations throughout the city, with particular attention to the busy Autobahn A2 corridor where 80,000 vehicles pass daily. Marco explains to visiting Gymnasium students that this endothermic process contributes to photochemical smog formation, which is why Basel invested 45 million Swiss francs in expanding its tram network to reduce vehicle emissions. The monitoring station, operated jointly by Basel's Environmental Department and the Swiss Federal Office for the Environment, provides real-time data that helps Novartis and Roche maintain strict emission controls at their facilities. Understanding this endothermic reaction helps students appreciate why high-temperature combustion processes require careful environmental management to protect Basel's air quality for its 175,000 residents.",
            EC_BASIC_3: "At Basel's District Heating Facility in Voltastrasse, engineer Dr. Andreas monitors methane combustion that provides heating for 15,000 Basel households during winter months. This highly exothermic reaction releases 890 kJ per mole of methane burned, generating the thermal energy distributed through Basel's 120-kilometer heating network. The facility processes 45 million cubic meters of natural gas annually, with sophisticated combustion control systems ensuring complete oxidation and minimal emissions. Dr. Andreas explains to visiting Sekundarschule students that the negative ΔH value indicates energy release—the bonds formed in CO2 and H2O are stronger than those broken in CH4 and O2, with the excess energy released as heat. The facility's heat recovery systems capture 95% of the combustion energy, making it one of Switzerland's most efficient district heating operations. Basel's commitment to sustainability includes plans to transition from natural gas to renewable biogas by 2030, maintaining the same exothermic combustion chemistry while reducing fossil fuel dependence. Understanding this reaction's energetics helps students appreciate how chemical energy transforms into the warmth that heats their homes during Basel's cold winters, when temperatures regularly drop below freezing.",
            EC_BASIC_4: "At the Basel Construction Materials Laboratory in Kleinhüningen, engineer Sarah demonstrates limestone decomposition for cement production. When calcium carbonate is heated to 900°C in a kiln, it absorbs 178 kJ per mole to break apart into calcium oxide (quicklime) and carbon dioxide gas—a classic endothermic process. This reaction is fundamental to producing cement, which Basel uses extensively in major construction projects including the Roche Tower, Switzerland's tallest building at 178 meters, and the new Novartis campus designed by renowned architects. The laboratory tests materials for Basel's growing infrastructure needs, analyzing 500 cement samples monthly to ensure quality standards. Sarah explains that the positive ΔH value indicates energy absorption—continuous heat input is required to maintain the reaction, which is why cement kilns operate at such high temperatures. The CO2 released during limestone decomposition contributes significantly to greenhouse gas emissions, accounting for 8% of global CO2 production. This environmental concern has motivated Basel's construction industry to research alternative binders and carbon capture technologies. Understanding this endothermic reaction helps students appreciate the energy costs of construction materials and why Basel is investing in sustainable building practices for its urban development projects.",
            EC_BASIC_5: "In the Roche Pharmaceutical Sterilization Facility at Grenzacherstrasse, quality control specialist Dr. Müller monitors hydrogen peroxide decomposition used for sterilizing medical equipment and pharmaceutical packaging. This exothermic reaction releases 196 kJ per two moles of hydrogen peroxide, breaking down into harmless water and oxygen gas. The facility uses 10,000 liters of hydrogen peroxide monthly for sterilization processes, ensuring that Roche's medications remain contamination-free from production to patient delivery. Dr. Müller explains that while this decomposition occurs slowly at room temperature, it accelerates dramatically with catalysts like manganese dioxide or the enzyme catalase found in living cells. The negative ΔH indicates energy release, which is why concentrated hydrogen peroxide must be stored carefully—rapid decomposition in confined spaces can cause dangerous pressure buildup. The facility's automated systems precisely control hydrogen peroxide concentration and decomposition rates, maintaining sterile conditions while ensuring worker safety. Understanding this exothermic reaction is crucial for pharmaceutical manufacturing, where sterilization must be effective yet gentle enough not to damage sensitive drug compounds. Roche's Basel facilities process 50 million pharmaceutical units annually, all requiring careful sterilization using reactions like hydrogen peroxide decomposition.",
            EC_CORE_1: "At the Roche Solvent Recovery Facility in Basel's Kaiseraugst industrial complex, process engineer Dr. Chen manages ethanol combustion for pharmaceutical solvent waste disposal. Ethanol, the most widely used solvent in pharmaceutical synthesis, releases 1,367 kJ per mole when completely combusted—a highly exothermic process that the facility harnesses for energy recovery. The facility processes 5,000 liters of contaminated ethanol monthly, burning it at 1,200°C in a specialized incinerator that captures heat energy for building heating and hot water production. Dr. Chen explains that the large negative ΔH value reflects the formation of very stable CO2 and H2O molecules from less stable ethanol and oxygen. The energy diagram for this reaction shows reactants at a higher energy level than products, with the difference representing released heat. Understanding this exothermic combustion is crucial for pharmaceutical operations—Roche uses ethanol in synthesizing 200 different drug compounds annually, and safe disposal of contaminated solvent is essential for environmental protection. The facility's heat recovery systems convert 85% of the combustion energy into useful heat, reducing Roche's natural gas consumption by 2 million cubic meters annually and demonstrating how pharmaceutical companies can turn waste management into energy efficiency.",
            EC_CORE_2: "In the Novartis Chemical Safety Laboratory at St. Johann, safety officer Dr. Hoffmann demonstrates ammonium nitrate decomposition to illustrate the importance of proper chemical storage. While this reaction releases only 36 kJ per mole—making it mildly exothermic—it can become explosive under certain conditions due to rapid gas production. The laboratory trains 500 pharmaceutical chemists annually in recognizing and managing potentially hazardous reactions. Dr. Hoffmann explains that ammonium nitrate is used in some pharmaceutical synthesis processes, but its decomposition properties require strict storage protocols including temperature control below 30°C and separation from combustible materials. The small negative ΔH might seem insignificant, but when large quantities decompose rapidly, the heat accumulation can trigger runaway reactions. Basel's pharmaceutical industry learned this lesson from historical industrial accidents, leading to comprehensive safety regulations. The energy diagram shows a small energy decrease from reactants to products, but the activation energy barrier is relatively low, meaning the reaction can initiate easily with heat or contamination. Understanding this exothermic decomposition helps pharmaceutical chemists design safe storage and handling procedures, ensuring that Novartis's Basel facilities maintain their exemplary safety record of zero major incidents in 15 years.",
            EC_CORE_3: "At the Basel Chemistry Institute's Combustion Analysis Laboratory, Professor Weber teaches students about propane combustion energetics using advanced calorimetry equipment. Propane, commonly used in laboratory Bunsen burners and portable heaters, releases an impressive 2,220 kJ per mole when burned—one of the highest energy densities among common fuels. The laboratory consumes approximately 200 kg of propane monthly for heating experiments, analytical procedures, and student demonstrations. Professor Weber uses energy diagrams to illustrate why this reaction is so exothermic: the strong C=O bonds in CO2 and O-H bonds in water contain much less potential energy than the C-H and C-C bonds in propane plus O=O bonds in oxygen. The institute, located in Basel's historic university quarter near the Botanical Garden, emphasizes that understanding combustion stoichiometry and energetics is essential for laboratory safety. Insufficient oxygen leads to incomplete combustion, producing toxic carbon monoxide and reducing energy output. This knowledge is vital for pharmaceutical chemists at Novartis and Roche who work with flammable organic solvents in enclosed laboratory spaces. The large negative ΔH explains why propane is such an effective fuel, but also why propane leaks are extremely dangerous—the enormous energy release during combustion can cause devastating explosions if propane accumulates in confined spaces.",
            EC_CORE_4: "In the Basel Industrial Chemistry Museum's historical exhibits, curator Dr. Schneider explains the water-gas reaction that powered 19th-century Basel's industrial development. When steam passes over hot carbon (coke), it produces carbon monoxide and hydrogen gas—a mixture called \"water gas\" that was used for heating and lighting before natural gas became available. This endothermic reaction requires 131 kJ per mole, which was provided by maintaining the carbon bed at 1,000°C. The museum, located in Basel's former industrial district of Kleinhüningen, preserves equipment from Basel's manufacturing heritage when the city produced textiles, chemicals, and machinery. Dr. Schneider explains that while this reaction is no longer used for fuel production, its principles remain relevant to modern pharmaceutical chemistry. Novartis uses similar endothermic gasification reactions to convert pharmaceutical waste into synthesis gas for energy recovery. The positive ΔH indicates continuous energy input is required—the reaction stops if heating ceases. Understanding endothermic industrial processes helps students appreciate how Basel's pharmaceutical industry evolved from 19th-century chemical manufacturing. The museum attracts 5,000 visitors annually, connecting Basel's industrial past to its present role as a global pharmaceutical center where companies like Novartis and Roche continue Basel's tradition of chemical innovation.",
            EC_CORE_5: "At the Novartis Sulfuric Acid Production Facility in Basel's Schweizerhalle industrial area, chemical engineer Dr. Zimmermann oversees the catalytic oxidation of sulfur dioxide to sulfur trioxide—a key step in producing sulfuric acid for pharmaceutical synthesis. This exothermic reaction releases 198 kJ per two moles of SO2, with the heat carefully managed using heat exchangers to maintain optimal reaction temperature of 450°C. The facility produces 500 tons of sulfuric acid monthly, which Novartis uses in synthesizing over 100 different pharmaceutical compounds. Dr. Zimmermann explains that this reaction occurs over a vanadium pentoxide catalyst, and the exothermic nature means excess heat must be removed to prevent catalyst deactivation and maintain high conversion efficiency. The energy diagram shows products at lower energy than reactants, with the released energy captured for preheating incoming gases—an example of process integration that improves energy efficiency by 30%. Understanding this exothermic equilibrium reaction is crucial for pharmaceutical chemists, as temperature control affects both reaction rate and equilibrium position. The facility's sophisticated control systems monitor temperature, pressure, and conversion rates in real-time, ensuring consistent sulfuric acid quality for pharmaceutical applications while minimizing environmental impact through 99.9% sulfur dioxide capture efficiency.",
            EC_ADVANCED_1: "In the Roche Pharmaceutical Catalysis Research Laboratory, Dr. Maria Hartmann investigates how catalysts affect hydrogen peroxide decomposition kinetics for pharmaceutical applications. While this exothermic reaction releases 196 kJ per two moles, it proceeds extremely slowly at room temperature due to a high activation energy barrier of approximately 75 kJ/mol. However, adding manganese dioxide catalyst or the enzyme catalase reduces the activation energy to just 8 kJ/mol, causing rapid decomposition with vigorous oxygen bubbling. Dr. Hartmann's team studies this reaction because understanding activation energy is crucial for pharmaceutical synthesis—many drug-producing reactions have favorable thermodynamics (negative ΔH) but require catalysts to proceed at practical rates. The laboratory tests 50 different catalysts monthly for various pharmaceutical reactions. The reaction coordinate diagram shows that while the overall energy change remains -196 kJ regardless of catalyst, the activation energy barrier determines reaction rate. This principle guides pharmaceutical process development at Roche, where selecting appropriate catalysts can reduce reaction times from days to hours, dramatically improving production efficiency. The research has led to 15 patents for novel pharmaceutical catalysts. Understanding the distinction between thermodynamics (ΔH) and kinetics (activation energy) is essential for pharmaceutical chemists developing efficient synthesis routes for the 200+ drug compounds Roche manufactures in Basel.",
            EC_ADVANCED_2: "At the Novartis Advanced Process Chemistry Laboratory in St. Johann, Dr. Thomas Weber leads research on ammonia synthesis optimization for pharmaceutical applications. The Haber-Bosch process, which combines nitrogen and hydrogen to form ammonia, releases 92 kJ per two moles of ammonia produced—a moderately exothermic reaction. However, the activation energy for breaking nitrogen's triple bond is extremely high at 420 kJ/mol, requiring temperatures of 450°C and pressures of 200 atmospheres even with iron catalysts. The laboratory produces 50 tons of ammonia annually for synthesizing pharmaceutical intermediates, amino acids, and cleaning agents. Dr. Weber explains that this reaction demonstrates a crucial principle: exothermic reactions aren't necessarily fast or spontaneous. The energy diagram shows a large activation energy barrier that must be overcome before the reaction proceeds, even though products are more stable than reactants. Novartis's research focuses on developing better catalysts to reduce the activation energy, potentially allowing ammonia synthesis at lower temperatures and pressures, which would save energy and reduce costs. This research has implications beyond ammonia production—understanding how to lower activation barriers while maintaining selectivity is fundamental to pharmaceutical synthesis, where many reactions require harsh conditions that can damage sensitive drug molecules. The laboratory's work on catalyst design has contributed to three recent publications in leading chemistry journals.",
            EC_ADVANCED_3: "In the Basel Biochemistry Research Institute's Metabolic Studies Laboratory, Professor Anna Keller uses glucose combustion to teach students about cellular respiration energetics. While glucose doesn't literally burn in our bodies, cellular respiration is essentially controlled combustion that releases 2,808 kJ per mole through multiple enzymatic steps. This enormous exothermic energy release powers all biological processes, with cells capturing approximately 38% of the energy in ATP molecules while the rest dissipates as heat. Professor Keller's research team studies metabolic disorders where glucose oxidation is impaired, collaborating with Roche Diagnostics to develop blood glucose monitors used by 50,000 diabetes patients in Switzerland. The reaction coordinate diagram for cellular respiration shows multiple intermediate steps, each with its own activation energy barrier lowered by specific enzymes. This multi-step pathway allows cells to capture energy gradually rather than releasing it all at once, which would generate destructive heat. Understanding this exothermic process is crucial for pharmaceutical development—Novartis and Roche invest heavily in diabetes medications that help regulate glucose metabolism. The institute's research has contributed to understanding how metformin, one of the world's most prescribed diabetes drugs, affects cellular energy metabolism. The laboratory's work demonstrates how fundamental thermochemistry principles apply to biological systems, connecting chemistry education to pharmaceutical applications that improve lives for millions of patients worldwide.",
            EC_ADVANCED_4: "At the Roche Pharmaceutical pH Control Laboratory in Grenzacherstrasse, analytical chemist Dr. Lisa Müller demonstrates calcium oxide hydration for teaching pharmaceutical students about exothermic reactions and their applications. When quicklime (CaO) reacts with water, it releases 65 kJ per mole and produces calcium hydroxide—a reaction so exothermic that the solid becomes hot enough to boil water. This reaction is used in pharmaceutical manufacturing for pH adjustment and as a desiccant to remove moisture from sensitive compounds. The laboratory uses 200 kg of calcium oxide monthly in various pharmaceutical processes. Dr. Müller explains that while the ΔH of -65 kJ/mol seems modest, the reaction's low activation energy means it proceeds rapidly and spontaneously upon water contact, releasing heat quickly enough to cause burns. The energy diagram shows a small activation barrier, explaining why this reaction begins immediately when water touches quicklime. Understanding this exothermic hydration is important for pharmaceutical safety—calcium oxide must be stored in moisture-free conditions to prevent spontaneous reaction and heat generation. Roche uses this reaction's heat-generating property in self-heating pharmaceutical packaging for temperature-sensitive medications during transport. The laboratory's research on controlled exothermic reactions has led to innovations in pharmaceutical formulation, where heat generation can be harnessed for drug activation or controlled release applications.",
            EC_ADVANCED_5: "In the Novartis Hydrogen Production Facility at Schweizerhalle, process engineer Dr. Stefan Zimmermann oversees steam methane reforming—the primary industrial method for producing hydrogen gas used in pharmaceutical synthesis. This endothermic reaction requires 206 kJ per mole of methane, with energy supplied by burning additional methane to maintain reactor temperature at 850°C. The facility produces 5,000 cubic meters of hydrogen daily for hydrogenation reactions in drug synthesis, where hydrogen atoms are added to organic molecules to create specific pharmaceutical compounds. Dr. Zimmermann explains that the high positive ΔH means continuous energy input is essential—if heating stops, the reaction ceases immediately. The reaction coordinate diagram shows a high activation energy barrier of approximately 240 kJ/mol, which is lowered to 180 kJ/mol using nickel catalysts. Understanding this endothermic process is crucial for pharmaceutical manufacturing economics—the energy cost of hydrogen production significantly impacts drug manufacturing expenses. Novartis's research focuses on improving catalyst efficiency to reduce the activation energy further, potentially lowering hydrogen production costs by 15%. This research has broader implications for Basel's transition to hydrogen economy, as the city plans to use hydrogen for public transportation and heating. The facility's work demonstrates how pharmaceutical chemistry research contributes to sustainable energy solutions beyond drug manufacturing.",
            EC_ELITE_1: "In the Novartis Historical Pharmaceutical Synthesis Laboratory at St. Johann, senior research chemist Dr. Heinrich Schneider demonstrates the classic aspirin synthesis that established Basel as a pharmaceutical center in 1897. When salicylic acid reacts with acetic anhydride, it produces acetylsalicylic acid (aspirin) and acetic acid, releasing 180 kJ per mole—a moderately exothermic reaction that requires careful temperature control to prevent decomposition. This synthesis, discovered by Novartis chemist Felix Hoffmann, revolutionized pain management and launched the modern pharmaceutical industry. While contemporary Novartis facilities use more efficient continuous-flow processes, this classical batch synthesis remains important for teaching pharmaceutical chemistry principles. The laboratory produces 50 kg of aspirin monthly using traditional methods for educational purposes and quality comparison studies. Dr. Schneider explains that the exothermic nature requires cooling to maintain reaction temperature at 85°C—too hot and aspirin decomposes, too cold and the reaction proceeds too slowly for industrial production. The energy released during acetylation reflects the formation of the stable ester bond in aspirin. Modern Novartis facilities in Basel produce 5,000 tons of aspirin annually for global distribution, with process optimization reducing energy consumption by 40% compared to historical methods. Understanding this exothermic pharmaceutical synthesis helps students appreciate how thermochemical principles guide industrial drug manufacturing, where energy management affects both product quality and production costs. This reaction exemplifies how fundamental chemistry transformed medicine and established Basel's pharmaceutical excellence.",
            EC_ELITE_2: "At the Novartis Advanced Pharmaceutical Synthesis Facility in Klybeck, Dr. Wei Chen leads the acetylation of aniline to produce acetanilide—a crucial pharmaceutical intermediate used in synthesizing analgesic and antipyretic medications. This highly exothermic reaction releases 285 kJ per mole, requiring sophisticated cooling systems to maintain reaction temperature at 5°C and prevent runaway reactions. The facility produces 2 tons of acetanilide monthly using jacketed reactors with automated temperature control that can remove heat at rates up to 50 kW. Dr. Chen explains that acetylation reactions are fundamental to pharmaceutical chemistry—the same reaction type produces aspirin from salicylic acid, and many modern drugs contain acetyl groups introduced through similar exothermic processes. The large negative ΔH reflects the strong amide bond formation in acetanilide, but this energy release presents engineering challenges for scale-up. The facility's reaction calorimetry systems continuously monitor heat generation rates, allowing operators to adjust cooling and reagent addition rates to maintain safe conditions. Understanding exothermic pharmaceutical synthesis is essential for process safety—inadequate cooling can lead to temperature runaway, causing product decomposition or even explosions. Novartis's investment in advanced process control has maintained zero thermal runaway incidents in 20 years of operation. The facility demonstrates how pharmaceutical companies manage exothermic reactions at industrial scale, balancing reaction kinetics, heat removal, and product quality to manufacture medications safely and efficiently for patients worldwide.",
            EC_ELITE_3: "In the Roche Pharmaceutical Hydrolysis Laboratory at Grenzacherstrasse, Dr. Maria Hoffmann oversees the controlled hydrolysis of aspartame—an artificial sweetener—to study peptide bond cleavage mechanisms relevant to drug metabolism. This endothermic reaction requires 45 kJ per mole to break the peptide bond, producing aspartic acid and phenylalanine methyl ester. While aspartame itself isn't a Roche product, understanding its hydrolysis helps pharmaceutical chemists predict how peptide-based drugs break down in the body. The laboratory processes 100 kg of various peptide compounds monthly, studying hydrolysis kinetics under different pH and temperature conditions. Dr. Hoffmann explains that the positive ΔH indicates energy input is required to break the stable peptide bond—this is why peptide drugs often have good stability and long shelf lives. However, in the body, enzymes lower the activation energy for hydrolysis, allowing peptide bonds to break at body temperature. This research is crucial for Roche's development of peptide-based therapeutics, including insulin analogs and growth hormone formulations used by thousands of Swiss patients. The laboratory's calorimetry studies measure the exact energy requirements for peptide bond hydrolysis, data that guides formulation scientists in predicting drug stability and designing appropriate storage conditions. Understanding endothermic hydrolysis reactions helps pharmaceutical companies ensure their medications remain effective throughout their shelf life, maintaining the therapeutic benefits that patients depend on for managing chronic conditions like diabetes and growth disorders.",
            EC_ELITE_4: "At the Roche High-Containment Synthesis Laboratory in Basel's Kaiseraugst facility, Dr. Andreas Weber supervises the synthesis of phenylacetonitrile from benzyl chloride and sodium cyanide—a key intermediate for producing cardiovascular medications. This exothermic nucleophilic substitution releases 125 kJ per mole as the cyanide ion displaces chloride, forming a carbon-nitrogen bond. The facility produces 800 kg of phenylacetonitrile monthly under strict safety protocols due to cyanide toxicity, operating in negative-pressure containment with advanced scrubbing systems that neutralize any cyanide vapors. Dr. Weber explains that while the moderate negative ΔH makes this reaction manageable thermally, the extreme toxicity of cyanide requires extraordinary safety measures—the laboratory has maintained zero cyanide exposure incidents in 20 years through rigorous training and engineering controls. The exothermic nature actually aids safety by allowing the reaction to proceed at room temperature, avoiding the need for heating that could volatilize cyanide. This synthesis demonstrates how pharmaceutical chemists balance thermodynamic favorability with safety considerations. The phenylacetonitrile produced undergoes further reactions to create medications treating hypertension and heart failure, benefiting 100,000 Swiss patients annually. Roche's investment in safe handling of hazardous exothermic reactions exemplifies pharmaceutical industry commitment to worker safety and environmental protection. Understanding the energetics of this reaction helps chemists design safer processes, potentially replacing cyanide with less toxic reagents while maintaining the favorable thermodynamics that make this synthesis economically viable for large-scale pharmaceutical production.",
            EC_ELITE_5: "In the Novartis Catalytic Hydrogenation Facility at Schweizerhalle, principal scientist Dr. Thomas Keller oversees the final step in morphine synthesis—the catalytic hydrogenation of codeinone to codeine, a critical pain management medication. This exothermic reaction releases 220 kJ per mole as hydrogen molecules add across a carbon-carbon double bond, catalyzed by palladium on carbon at 50°C and 10 atmospheres pressure. The facility produces 500 kg of codeine monthly for pharmaceutical formulations, using sophisticated pressure reactors with precise temperature control to manage the exothermic heat release. Dr. Keller explains that hydrogenation reactions are among the most important in pharmaceutical synthesis—adding hydrogen atoms allows chemists to reduce specific functional groups while leaving others intact, creating the precise molecular structures needed for drug activity. The negative ΔH reflects the formation of strong C-H bonds from weaker C=C and H-H bonds, but the reaction requires a catalyst to lower the activation energy barrier. Without palladium catalyst, the activation energy exceeds 200 kJ/mol and the reaction doesn't proceed at practical rates despite favorable thermodynamics. This synthesis exemplifies pharmaceutical chemistry sophistication—controlling stereochemistry, managing exothermic heat, handling high-pressure hydrogen safely, and achieving 99.8% purity required for pharmaceutical use. Novartis's Basel facilities have perfected this process over decades, producing codeine that helps manage pain for millions of patients worldwide while maintaining exemplary safety standards in handling flammable hydrogen and exothermic reactions at industrial scale.",
            HL_BASIC_1: "At the Basel Chemistry Institute's Thermochemistry Laboratory, Professor Weber demonstrates Hess's Law using carbon combustion pathways to teach Sekundarstufe II students about energy conservation in chemical reactions. Carbon can burn directly to carbon dioxide, or it can burn in two steps: first to carbon monoxide, then to carbon dioxide. Hess's Law states that the total enthalpy change is the same regardless of pathway—a fundamental principle discovered by Swiss-Russian chemist Germain Hess in 1840. Professor Weber explains that this principle is crucial for pharmaceutical chemistry at Novartis and Roche, where chemists often need to calculate enthalpy changes for reactions that can't be measured directly. The laboratory, located in Basel's historic university quarter near Petersplatz, uses precision calorimetry to verify Hess's Law experimentally. Students measure the heat released when carbon burns directly to CO2 (-394 kJ/mol) and compare it to the sum of the two-step pathway: C to CO (-111 kJ/mol) plus CO to CO2 (-283 kJ/mol), which equals -394 kJ/mol. This demonstration shows that energy is a state function—it depends only on initial and final states, not on the path taken. Understanding Hess's Law allows pharmaceutical chemists to calculate reaction energetics for complex synthesis pathways, helping optimize drug manufacturing processes at Basel's pharmaceutical facilities where energy efficiency directly impacts production costs and environmental sustainability.",
            HL_BASIC_2: "In the Novartis Sulfur Chemistry Laboratory at Schweizerhalle, Dr. Anna Keller teaches pharmaceutical chemistry students about Hess's Law using sulfur oxidation reactions relevant to sulfuric acid production. Sulfur can oxidize directly to sulfur dioxide, or through an indirect pathway via sulfur trioxide. By applying Hess's Law, students calculate that the direct oxidation releases -297 kJ/mol by reversing the second equation and adding it to the first: S + 3/2 O2 → SO3 (-395 kJ) plus SO3 → SO2 + 1/2 O2 (+98 kJ) equals -297 kJ/mol. This calculation demonstrates how Hess's Law allows chemists to determine enthalpy changes for reactions that are difficult to measure directly. The laboratory produces 500 tons of sulfuric acid monthly for pharmaceutical synthesis, and understanding these energy relationships helps optimize the production process. Dr. Keller explains that Novartis uses sulfuric acid in synthesizing over 100 different drug compounds, making sulfur chemistry fundamental to pharmaceutical manufacturing. The facility's energy management systems use Hess's Law calculations to predict heat generation in multi-step reactions, ensuring safe operation and efficient heat recovery. Students learn that this 19th-century thermochemical principle remains essential for modern pharmaceutical engineering, where complex synthesis pathways require careful energy accounting to maintain safety and profitability in Basel's competitive pharmaceutical industry.",
            HL_BASIC_3: "At the Roche Organic Synthesis Training Laboratory in Grenzacherstrasse, instructor Dr. Thomas Müller uses acetylene formation to teach pharmaceutical chemistry students how to apply Hess's Law to endothermic reactions. Acetylene (ethyne) cannot be formed directly from carbon and hydrogen under normal conditions, but its formation enthalpy can be calculated using combustion data. Students construct an enthalpy cycle: reverse the acetylene combustion equation (+1300 kJ), add two times the carbon combustion equation (2 × -394 kJ), and add the hydrogen combustion equation (-286 kJ), yielding +227 kJ/mol for acetylene formation. This positive value explains why acetylene doesn't form spontaneously and requires high-energy methods like electric arc furnaces. Dr. Müller explains that understanding endothermic formation reactions is crucial for pharmaceutical synthesis, where many drug intermediates have positive formation enthalpies and require energy input. The laboratory trains 200 pharmaceutical chemists annually in thermochemical calculations that guide process development at Roche's Basel facilities. This Hess's Law exercise demonstrates how combustion data—which is easy to measure—can determine formation enthalpies that are impossible to measure directly, a technique pharmaceutical chemists use daily when designing new synthesis routes for the 150+ drug compounds Roche manufactures in Basel.",
            HL_BASIC_4: "In the Basel Environmental Chemistry Laboratory near the Rhine River, researcher Dr. Lisa Hoffmann demonstrates Hess's Law using nitrogen dioxide formation to teach students about atmospheric chemistry and pollution control. Nitrogen dioxide, a brown toxic gas contributing to photochemical smog, forms through a two-step pathway: nitrogen and oxygen first form nitrogen monoxide (endothermic, +180 kJ), then nitrogen monoxide oxidizes to nitrogen dioxide (exothermic, -112 kJ). Adding these steps gives the overall enthalpy change of +68 kJ/mol for direct NO2 formation. Dr. Hoffmann explains that this endothermic overall reaction requires energy input, which occurs in vehicle engines and industrial combustion at high temperatures. Basel's air quality monitoring network tracks NO2 levels at 15 stations, with particular attention to emissions from Novartis and Roche facilities, which have invested 20 million Swiss francs in emission control systems. Understanding these nitrogen oxide formation energetics helps pharmaceutical companies design combustion processes that minimize NOx emissions. The laboratory collaborates with Basel's pharmaceutical industry to develop catalytic systems that prevent NO2 formation, protecting Basel's air quality for its 175,000 residents. This Hess's Law calculation demonstrates how thermochemical principles guide environmental protection strategies, connecting classroom chemistry to real-world applications in Basel's commitment to sustainable pharmaceutical manufacturing and urban air quality management.",
            HL_BASIC_5: "At the Basel University Hydrogen Energy Laboratory in the Kollegienhaus building, doctoral student Emma Chen teaches Gymnasium students about Hess's Law using water formation—the fundamental reaction powering fuel cells. When two moles of hydrogen react with one mole of oxygen to form two moles of water, the enthalpy change is simply twice the single-mole reaction: 2 × (-286 kJ) = -572 kJ. This straightforward example demonstrates Hess's Law's principle that enthalpy changes scale with stoichiometric coefficients. Emma explains that this calculation is crucial for fuel cell engineering at Novartis, where a 10-kilowatt hydrogen fuel cell system is being developed to power pharmaceutical manufacturing facilities. The laboratory's research focuses on optimizing fuel cell efficiency by managing the exothermic heat release—572 kJ per two moles of hydrogen is substantial energy that must be captured for useful work rather than wasted as heat. Understanding how enthalpy scales with reaction quantities helps engineers design fuel cells that maximize electrical output while maintaining safe operating temperatures. The project, funded with 5 million Swiss francs, aims to reduce Basel's pharmaceutical industry carbon emissions by 15,000 tons annually. This simple Hess's Law calculation underpins complex engineering decisions about fuel cell stack design, cooling systems, and energy recovery, demonstrating how fundamental thermochemical principles enable Basel's transition to sustainable pharmaceutical manufacturing powered by clean hydrogen energy.",
            HL_CORE_1: "At the Basel District Heating Facility in Voltastrasse, engineer Dr. Andreas Weber uses Hess's Law to calculate methane combustion enthalpy for optimizing the facility's natural gas burners. The facility provides heating for 15,000 Basel households, processing 45 million cubic meters of methane annually. Dr. Weber demonstrates to visiting engineering students how to construct an enthalpy cycle using formation data: reverse the methane formation equation to get CH4 → C + 2H2 (+75 kJ), add carbon combustion C + O2 → CO2 (-394 kJ), and add twice the hydrogen combustion 2H2 + O2 → 2H2O (2 × -286 kJ), yielding -890 kJ/mol for methane combustion. This calculation matches experimental measurements, validating Hess's Law. Understanding this energy relationship helps the facility optimize combustion efficiency—incomplete combustion wastes energy and produces carbon monoxide. The facility's heat recovery systems capture 95% of the combustion energy, making it one of Switzerland's most efficient district heating operations. Dr. Weber explains that Hess's Law calculations guide decisions about fuel switching—Basel plans to transition from natural gas to renewable biogas by 2030, and thermochemical calculations ensure the new fuel will provide equivalent heating capacity. This practical application demonstrates how 19th-century thermochemical principles remain essential for 21st-century energy management in Basel's sustainable urban infrastructure.",
            HL_CORE_2: "In the Roche Solvent Recovery Facility at Kaiseraugst, process engineer Dr. Chen calculates ethanol combustion enthalpy using Hess's Law to optimize the facility's waste solvent incinerator. Roche uses ethanol in synthesizing 200 different drug compounds, generating 5,000 liters of contaminated ethanol monthly that must be safely disposed through combustion. Dr. Chen constructs an enthalpy cycle by reversing ethanol formation (+278 kJ), adding twice the carbon combustion (2 × -394 kJ), and adding three times the hydrogen combustion (3 × -286 kJ), yielding -1367 kJ/mol. This large negative value explains why ethanol is an excellent fuel—the facility captures 85% of this combustion energy for building heating, reducing natural gas consumption by 2 million cubic meters annually. Understanding ethanol combustion energetics through Hess's Law helps pharmaceutical engineers design efficient waste management systems that turn environmental liabilities into energy assets. The facility's heat recovery systems demonstrate how thermochemical calculations guide sustainable pharmaceutical manufacturing. Dr. Chen explains that Hess's Law is essential for pharmaceutical process development—chemists routinely calculate reaction enthalpies for proposed synthesis routes before conducting expensive experiments, using formation data and Hess's Law to predict whether reactions will be thermodynamically favorable and how much heat management will be required for safe industrial-scale operation.",
            HL_CORE_3: "At the Basel Chemistry Institute's Combustion Analysis Laboratory, Professor Weber teaches advanced thermochemistry using propane combustion as a Hess's Law exercise. The laboratory consumes 200 kg of propane monthly for Bunsen burners and heating experiments. Professor Weber guides students through constructing an enthalpy cycle: reverse propane formation (+104 kJ), add three times carbon combustion (3 × -394 kJ), and add four times hydrogen combustion (4 × -286 kJ), yielding -2220 kJ/mol—one of the highest energy densities among common fuels. This calculation explains why propane is so effective for laboratory heating and why propane leaks are extremely dangerous. The institute, located near Basel's Botanical Garden, emphasizes that Hess's Law calculations are essential for laboratory safety planning. Understanding combustion energetics helps pharmaceutical chemists at Novartis and Roche who work with flammable organic solvents—knowing the energy release from potential fires guides ventilation design and emergency response planning. Professor Weber explains that while modern calorimeters can measure combustion enthalpies directly, Hess's Law remains crucial for calculating enthalpies of reactions that can't be measured experimentally, such as formation reactions of unstable intermediates in pharmaceutical synthesis. The laboratory's teaching demonstrates how fundamental thermochemical principles connect to practical safety considerations in Basel's pharmaceutical industry, where managing chemical energy safely is essential for protecting the 5,000 chemists working in the city's pharmaceutical facilities.",
            HL_CORE_4: "In the Novartis Process Safety Laboratory at St. Johann, safety engineer Dr. Hoffmann uses ethane combustion calculations to teach pharmaceutical engineers about scaling effects in thermochemistry. When calculating enthalpy for two moles of ethane combustion, students must carefully track stoichiometric coefficients: reverse twice the ethane formation (2 × +85 kJ), add four times carbon combustion (4 × -394 kJ), and add six times hydrogen combustion (6 × -286 kJ), yielding -3120 kJ for two moles, or -1560 kJ per mole of ethane. This exercise demonstrates that Hess's Law calculations require meticulous attention to coefficients—errors in scaling lead to incorrect energy predictions that could cause safety hazards in industrial processes. The laboratory trains 500 pharmaceutical engineers annually in thermochemical calculations that guide reactor design and safety systems. Dr. Hoffmann explains that understanding how enthalpy scales with reaction quantities is crucial for pharmaceutical manufacturing, where reactions are scaled from milligram laboratory experiments to ton-scale industrial production. A reaction that releases manageable heat at laboratory scale can become dangerously exothermic at industrial scale if cooling systems are inadequate. Novartis's Basel facilities have maintained zero major thermal incidents in 15 years through rigorous thermochemical analysis using Hess's Law and other principles. This calculation exercise connects fundamental chemistry to industrial safety, demonstrating why pharmaceutical companies invest heavily in thermochemical training for their engineering staff.",
            HL_CORE_5: "At the Roche Chemical Safety Training Center in Grenzacherstrasse, instructor Dr. Maria Hartmann uses benzene combustion to teach pharmaceutical chemists about aromatic compound energetics and Hess's Law applications. Benzene, a common solvent in pharmaceutical synthesis, has an endothermic formation enthalpy (+49 kJ/mol) due to its aromatic stability, but combusts highly exothermically. Students calculate combustion enthalpy by reversing benzene formation (-49 kJ), adding six times carbon combustion (6 × -394 kJ), and adding three times hydrogen combustion (3 × -286 kJ), yielding -3268 kJ/mol. This enormous energy release explains why benzene fires are so dangerous and why Roche maintains strict benzene handling protocols. The training center processes 200 pharmaceutical chemists annually through safety courses emphasizing thermochemical hazard assessment. Dr. Hartmann explains that benzene's positive formation enthalpy indicates it's thermodynamically unstable relative to its elements, yet kinetically stable due to aromatic resonance—a crucial distinction for pharmaceutical chemists. Understanding this through Hess's Law helps chemists predict which aromatic compounds might pose thermal hazards. Roche uses 50 tons of benzene annually in pharmaceutical synthesis, all handled in specialized facilities with explosion-proof equipment and automated fire suppression. This Hess's Law calculation demonstrates how thermochemical principles guide industrial safety practices, protecting the 10,000 employees working at Roche's Basel facilities while enabling the synthesis of life-saving medications.",
            HL_ADVANCED_1: "In the Novartis Bioethanol Research Laboratory at Schweizerhalle, Dr. Stefan Zimmermann investigates ethanol synthesis from ethylene for pharmaceutical solvent production. While industrial ethanol is typically produced by fermentation, direct hydration of ethylene offers an alternative route. Using Hess's Law with formation enthalpies, students calculate the reaction enthalpy: reverse ethylene formation (-52 kJ), reverse water formation (+286 kJ), and add ethanol formation (-278 kJ), yielding -44 kJ/mol for ethylene hydration. This moderately exothermic reaction is thermodynamically favorable but requires acidic catalysts to proceed at practical rates. The laboratory produces 1,000 liters of ethanol monthly for pharmaceutical applications, studying both fermentation and synthetic routes. Dr. Zimmermann explains that using standard formation enthalpies simplifies Hess's Law calculations—instead of constructing complex combustion cycles, chemists can directly combine formation data from reference tables. This approach is essential for pharmaceutical process development, where chemists evaluate hundreds of potential synthesis routes and need quick thermochemical assessments. Novartis maintains an extensive database of formation enthalpies for pharmaceutical intermediates, enabling rapid Hess's Law calculations during drug development. Understanding how to use formation data efficiently accelerates pharmaceutical innovation, helping Basel's pharmaceutical industry maintain its competitive advantage in developing new medications for global markets.",
            HL_ADVANCED_2: "At the Roche Pharmaceutical Waste Management Facility in Kaiseraugst, environmental engineer Dr. Lisa Müller calculates acetic acid combustion enthalpy for optimizing solvent waste incineration. Acetic acid, used extensively in pharmaceutical synthesis and produced as a byproduct in aspirin manufacturing, must be safely disposed through controlled combustion. Using formation enthalpies and Hess's Law, students calculate: reverse acetic acid formation (+484 kJ), add twice carbon combustion (2 × -394 kJ), and add twice hydrogen combustion (2 × -286 kJ), yielding -874 kJ/mol. This substantial energy release is captured by the facility's heat recovery systems, generating steam for pharmaceutical processes. The facility processes 3,000 liters of acetic acid waste monthly, converting a disposal problem into an energy resource. Dr. Müller explains that Hess's Law calculations using formation data are essential for waste management planning—knowing combustion enthalpies helps engineers design incinerators with appropriate cooling capacity and heat recovery systems. Roche's commitment to sustainable pharmaceutical manufacturing includes recovering 90% of waste combustion energy, reducing natural gas consumption by 3 million cubic meters annually. This practical application demonstrates how thermochemical calculations guide environmental engineering decisions, turning pharmaceutical waste streams into valuable energy sources while protecting Basel's environment and contributing to Switzerland's carbon reduction goals.",
            HL_ADVANCED_3: "In the Basel Chemistry Institute's Inorganic Synthesis Laboratory, Professor Weber demonstrates ammonium chloride formation to teach students about acid-base reactions and Hess's Law with ionic compounds. When ammonia gas meets hydrogen chloride gas, they react vigorously to form white ammonium chloride smoke—a classic demonstration of acid-base chemistry. Using formation enthalpies, students calculate the reaction enthalpy: reverse ammonia formation (+46 kJ), reverse HCl formation (+92 kJ), and add ammonium chloride formation (-314 kJ), yielding -176 kJ/mol. This exothermic reaction explains why the white smoke forms so readily—the energy released drives the reaction forward spontaneously. The laboratory uses this demonstration to teach 300 chemistry students annually about thermochemical calculations with ionic compounds. Professor Weber explains that formation enthalpies for ionic solids are typically very negative due to strong electrostatic attractions, making their formation highly exothermic. This principle is crucial for pharmaceutical salt formation—many drugs are converted to salt forms to improve solubility and stability, and understanding the thermochemistry helps predict which salt forms will be most stable. Novartis and Roche synthesize hundreds of pharmaceutical salts annually, using Hess's Law calculations to predict formation energetics before conducting expensive experimental screening. This educational demonstration connects fundamental thermochemistry to pharmaceutical applications, showing how acid-base reactions and enthalpy calculations guide drug formulation decisions in Basel's pharmaceutical industry.",
            HL_ADVANCED_4: "At the Novartis Catalytic Hydrogenation Research Laboratory in Klybeck, Dr. Wei Chen studies acetylene hydrogenation to ethane as a model system for understanding pharmaceutical hydrogenation reactions. While this specific reaction isn't used pharmaceutically, it demonstrates principles crucial for drug synthesis where unsaturated compounds are hydrogenated to create specific molecular structures. Using formation enthalpies and Hess's Law, students calculate: reverse acetylene formation (-227 kJ) and add ethane formation (-85 kJ), yielding -312 kJ/mol for acetylene hydrogenation. This highly exothermic reaction explains why acetylene hydrogenation requires careful temperature control—uncontrolled heat release can cause runaway reactions. The laboratory studies 50 different hydrogenation reactions monthly, developing catalysts and conditions for pharmaceutical applications. Dr. Chen explains that Hess's Law calculations using formation data provide quick thermochemical assessments before experimental work—if a proposed hydrogenation is too exothermic, chemists can predict cooling requirements or consider alternative routes. Novartis performs thousands of hydrogenation reactions annually in drug synthesis, adding hydrogen atoms to create specific stereochemistry and functional groups. Understanding hydrogenation thermochemistry through Hess's Law helps pharmaceutical chemists design safe, efficient processes. The laboratory's research has led to 10 patents for novel hydrogenation catalysts, demonstrating how fundamental thermochemical principles drive pharmaceutical innovation in Basel's competitive drug development environment.",
            HL_ADVANCED_5: "In the Basel Biochemistry Research Institute's Fermentation Laboratory, Professor Anna Keller uses glucose fermentation to teach students about biological thermochemistry and Hess's Law applications to biochemical processes. Alcoholic fermentation, where yeast converts glucose to ethanol and carbon dioxide, is the basis for brewing and pharmaceutical ethanol production. Using formation enthalpies, students calculate: reverse glucose formation (+1274 kJ), add twice ethanol formation (2 × -278 kJ), and add twice CO2 formation (2 × -394 kJ), yielding -72 kJ/mol for fermentation. This modest exothermic reaction provides energy for yeast metabolism while producing ethanol, which Roche and Novartis use as a pharmaceutical solvent. The laboratory produces 500 liters of pharmaceutical-grade ethanol monthly through fermentation, studying how to optimize yield and purity. Professor Keller explains that while fermentation's energy release is small compared to combustion, it's sufficient to sustain yeast growth and reproduction. Understanding fermentation thermochemistry is crucial for pharmaceutical biotechnology—many drugs are now produced by fermentation processes, and thermochemical calculations help optimize bioreactor conditions. The institute collaborates with Roche's biologics division, which produces therapeutic proteins through fermentation in 10,000-liter bioreactors. Hess's Law calculations guide bioreactor design, ensuring adequate cooling for fermentation heat while maintaining optimal temperatures for cell growth. This application demonstrates how 19th-century thermochemical principles remain essential for 21st-century pharmaceutical biotechnology.",
            HL_ELITE_1: "In the Novartis Historical Pharmaceutical Synthesis Laboratory at St. Johann, senior research chemist Dr. Heinrich Schneider uses Hess's Law to analyze the classic aspirin synthesis that established Basel as a pharmaceutical center in 1897. When salicylic acid reacts with acetic anhydride to produce aspirin and acetic acid, the reaction enthalpy can be calculated using formation data: reverse salicylic acid formation (+595 kJ), reverse acetic anhydride formation (+623 kJ), add aspirin formation (-1026 kJ), and add acetic acid formation (-484 kJ), yielding -180 kJ/mol. This moderately exothermic reaction requires careful temperature control at 85°C to prevent aspirin decomposition while maintaining practical reaction rates. The laboratory produces 50 kg of aspirin monthly using traditional methods for educational purposes, demonstrating how thermochemical calculations guided early pharmaceutical manufacturing. Dr. Schneider explains that Felix Hoffmann, who discovered this synthesis, didn't have access to modern calorimetry but understood that controlling reaction temperature was crucial—Hess's Law calculations now explain why. Modern Novartis facilities produce 5,000 tons of aspirin annually with process optimization that reduces energy consumption by 40% compared to historical methods. Understanding aspirin synthesis thermochemistry through Hess's Law helps pharmaceutical engineers design efficient reactors with appropriate cooling systems. This iconic pharmaceutical reaction demonstrates how fundamental thermochemical principles transformed medicine and established Basel's pharmaceutical excellence, connecting 19th-century chemical innovation to 21st-century industrial pharmaceutical manufacturing.",
            HL_ELITE_2: "At the Roche Advanced Pharmaceutical Synthesis Facility in Kaiseraugst, principal scientist Dr. Thomas Keller oversees ibuprofen production using a three-step synthesis pathway developed by Roche chemists. Ibuprofen, one of the world's most widely used pain relievers, is synthesized through Friedel-Crafts acylation (-65 kJ/mol), carbonylation (-55 kJ/mol), and hydrolysis (-25 kJ/mol). Using Hess's Law, the overall enthalpy change is the sum of all steps: -65 + (-55) + (-25) = -145 kJ/mol. Each step is exothermic, requiring precise temperature control to prevent side reactions and maintain product purity above 99.5% required for pharmaceutical use. The facility produces 800 tons of ibuprofen annually for global distribution, with sophisticated reactor systems managing heat removal at each step. Dr. Keller explains that Hess's Law is fundamental to pharmaceutical process development—when designing multi-step syntheses, chemists calculate overall thermochemistry by summing individual step enthalpies, predicting total heat generation and cooling requirements before building industrial reactors. This approach saved Roche millions of Swiss francs by identifying potential thermal hazards during laboratory-scale development rather than discovering them during expensive pilot plant construction. The facility's three-reactor cascade system removes heat continuously, maintaining optimal temperatures for each step while recovering 85% of the exothermic energy for building heating. Understanding multi-step synthesis thermochemistry through Hess's Law exemplifies how fundamental chemical principles enable safe, efficient pharmaceutical manufacturing at the industrial scale that supplies medications to millions of patients worldwide.",
            HL_ELITE_3: "In the Novartis Antibiotic Synthesis Complex at Schweizerhalle, Dr. Maria Hoffmann leads the production of semi-synthetic penicillin derivatives through a sophisticated five-step synthesis pathway. The process begins with β-lactam ring formation (-85 kJ/mol), followed by side chain attachment (-45 kJ/mol), thiazolidine ring closure (-60 kJ/mol), oxidation (-30 kJ/mol), and final purification (-15 kJ/mol). Applying Hess's Law, the overall synthesis releases -235 kJ/mol: -85 + (-45) + (-60) + (-30) + (-15) = -235 kJ/mol. This multi-step exothermic pathway requires five separate reactors, each with precise temperature control and heat removal systems. The facility produces 200 tons of penicillin derivatives annually, supplying antibiotics that treat bacterial infections for millions of patients worldwide. Dr. Hoffmann explains that complex pharmaceutical syntheses like penicillin production demonstrate Hess's Law's practical importance—the overall enthalpy change equals the sum of individual steps regardless of pathway complexity. This principle allows pharmaceutical engineers to design integrated heat management systems that remove heat from exothermic steps and supply heat to any endothermic steps, optimizing energy efficiency. Novartis's penicillin facility recovers 90% of synthesis heat for building heating and solvent distillation, demonstrating sustainable pharmaceutical manufacturing. Understanding multi-step synthesis thermochemistry through Hess's Law is essential for pharmaceutical process development, where complex molecules require intricate synthesis pathways with careful energy management to ensure safety, efficiency, and product quality.",
            HL_ELITE_4: "At the Roche Oncology Drug Manufacturing Facility in Grenzacherstrasse, Dr. Andreas Weber oversees the synthesis of a proprietary anticancer medication through a complex seven-step pathway. The synthesis involves aromatic substitution (-75 kJ/mol), heterocycle formation (-50 kJ/mol), functional group protection (-35 kJ/mol), coupling reaction (-60 kJ/mol), deprotection (-40 kJ/mol), oxidation (-35 kJ/mol), and salt formation (-25 kJ/mol). Using Hess's Law, the overall enthalpy change is -320 kJ/mol: -75 + (-50) + (-35) + (-60) + (-40) + (-35) + (-25) = -320 kJ/mol. This highly exothermic multi-step synthesis requires seven specialized reactors with advanced temperature control systems, each maintaining optimal conditions for its specific reaction while managing heat removal. The facility produces 50 kg of this anticancer drug annually, enough to treat 5,000 cancer patients. Dr. Weber explains that complex pharmaceutical syntheses demonstrate why Hess's Law is indispensable for pharmaceutical engineering—calculating overall thermochemistry by summing individual steps allows engineers to design integrated manufacturing systems before investing in expensive equipment. The facility's heat integration network captures exothermic heat from early steps to drive later endothermic purification processes, achieving 92% energy efficiency. Roche's investment in thermochemical analysis and process optimization ensures that life-saving cancer medications can be manufactured safely and economically, making advanced treatments accessible to patients worldwide while maintaining Basel's leadership in pharmaceutical innovation.",
            HL_ELITE_5: "In the Novartis Biologics Manufacturing Facility at St. Johann, Dr. Stefan Zimmermann oversees the production of insulin analogs for diabetes treatment through a four-step biotechnological synthesis. The process involves peptide chain assembly (-95 kJ/mol), disulfide bond formation (-45 kJ/mol), protein folding and purification (-30 kJ/mol), and final formulation (-15 kJ/mol). Applying Hess's Law, the overall process releases -185 kJ/mol: -95 + (-45) + (-30) + (-15) = -185 kJ/mol. While insulin is primarily produced through fermentation, understanding the thermochemistry of each processing step is crucial for optimizing production efficiency and maintaining protein stability. The facility produces 500 kg of insulin analogs annually, providing diabetes medication for 50,000 Swiss patients. Dr. Zimmermann explains that Hess's Law applies to biochemical processes just as it does to traditional chemical synthesis—the overall enthalpy change for protein processing equals the sum of individual step enthalpies. This principle guides bioreactor design and downstream processing, where maintaining appropriate temperatures is critical for protein stability. The facility's sophisticated temperature control systems manage the modest exothermic heat release while preventing protein denaturation, which would destroy therapeutic activity. Novartis's expertise in pharmaceutical thermochemistry, including Hess's Law applications, enables production of complex biological medications that have transformed diabetes management. This example demonstrates how fundamental thermochemical principles extend from small-molecule drugs to large biological therapeutics, maintaining Basel's pharmaceutical industry leadership in both traditional and biotechnology-based drug manufacturing.",
            CAL_BASIC_1: "At the Basel Gymnasium Chemistry Laboratory near Petersplatz, teacher Dr. Müller demonstrates basic calorimetry to Sekundarstufe II students using a simple coffee-cup calorimeter. When 100 grams of water is heated from 20°C to 25°C, students calculate the heat absorbed using q = mcΔT: q = (100 g)(4.18 J/g°C)(5°C) = 2,090 J or 2.09 kJ. This fundamental calculation introduces students to quantitative thermochemistry, showing how temperature changes relate to energy transfer. The laboratory serves 200 chemistry students annually, teaching practical calorimetry skills essential for pharmaceutical careers at Novartis and Roche. Dr. Müller explains that water's high specific heat capacity (4.18 J/g°C) makes it ideal for calorimetry—it absorbs substantial heat with modest temperature changes, providing measurable results in simple experiments. Understanding q = mcΔT is the foundation for all calorimetry work, from classroom demonstrations to industrial pharmaceutical process monitoring. Students learn that this equation applies universally—whether measuring heat from dissolving salts, neutralizing acids, or combusting fuels. The Basel Gymnasium's chemistry program emphasizes quantitative skills, preparing students for university chemistry programs and pharmaceutical industry careers. This simple calorimetry exercise connects classroom learning to Basel's pharmaceutical industry, where precise heat measurements guide drug synthesis, formulation stability testing, and quality control procedures that ensure medications meet strict safety and efficacy standards.",
            CAL_BASIC_2: "In the Basel University Chemistry Department's Thermochemistry Laboratory, doctoral student Emma demonstrates endothermic dissolution using ammonium nitrate dissolving in water. When 50 grams of water cools from 25°C to 20°C due to endothermic dissolution, students calculate the heat absorbed by the dissolving salt: q = mcΔT = (50 g)(4.18 J/g°C)(-5°C) = -1,045 J. The negative value indicates heat flows from water to the dissolving process, causing temperature decrease. This experiment teaches students that calorimetry measures both exothermic and endothermic processes—temperature increases indicate exothermic reactions (heat released), while temperature decreases indicate endothermic processes (heat absorbed). The laboratory, located in the historic Kollegienhaus building, trains 300 chemistry students annually in calorimetry techniques used throughout pharmaceutical research. Emma explains that understanding endothermic dissolution is crucial for pharmaceutical formulation—many drugs dissolve endothermically, affecting how quickly they dissolve in the body and begin providing therapeutic effects. Roche and Novartis employ 50 formulation scientists in Basel who use calorimetry to study drug dissolution kinetics, optimizing tablet formulations for rapid, reliable drug release. This simple calorimetry measurement demonstrates a principle essential for pharmaceutical development: heat flow direction determines whether processes are spontaneous or require energy input, guiding decisions about drug formulation, storage conditions, and manufacturing processes.",
            CAL_BASIC_3: "At the Roche Pharmaceutical Quality Control Laboratory in Grenzacherstrasse, analytical chemist Dr. Lisa Hoffmann uses calorimetry to verify exothermic neutralization reactions in pharmaceutical pH adjustment processes. When 200 grams of aqueous solution heats from 22°C to 28°C during acid-base neutralization, the heat released is calculated: q = mcΔT = (200 g)(4.18 J/g°C)(6°C) = 5,016 J or 5.02 kJ. This measurement confirms the neutralization proceeded as expected, an important quality control check for pharmaceutical manufacturing. The laboratory performs 500 calorimetry measurements monthly, ensuring pharmaceutical processes operate within specified parameters. Dr. Hoffmann explains that calorimetry provides real-time process monitoring—unexpected temperature changes indicate problems like contamination, incorrect reagent concentrations, or equipment malfunctions. Roche's quality control systems use calorimetry data to maintain pharmaceutical manufacturing consistency, ensuring every batch meets strict quality standards. Understanding basic calorimetry calculations allows pharmaceutical technicians to quickly assess whether reactions are proceeding normally or require intervention. The laboratory's work demonstrates how simple q = mcΔT calculations underpin sophisticated pharmaceutical quality assurance, protecting patient safety by detecting process deviations before they affect product quality. Roche's Basel facilities process 50 million pharmaceutical units annually, all monitored using calorimetry and other analytical techniques that ensure medications are safe, effective, and consistent from batch to batch.",
            CAL_BASIC_4: "In the Novartis Chemical Safety Training Laboratory at St. Johann, instructor Dr. Thomas Weber demonstrates calorimetry using metal dissolution reactions to teach pharmaceutical chemists about heat measurement and safety. When 150 grams of water heats from 18°C to 24°C during zinc dissolution in acid, students calculate: q = mcΔT = (150 g)(4.18 J/g°C)(6°C) = 3,762 J or 3.76 kJ. This exothermic reaction demonstrates why pharmaceutical chemists must consider heat generation when scaling reactions from laboratory to industrial scale. The training center processes 500 pharmaceutical chemists annually through safety courses emphasizing thermochemical hazard assessment. Dr. Weber explains that reactions releasing modest heat at laboratory scale (grams) can generate dangerous heat at industrial scale (kilograms or tons), potentially causing thermal runaway if cooling systems are inadequate. Novartis uses calorimetry data from laboratory experiments to design industrial reactors with appropriate cooling capacity, preventing thermal incidents. Understanding q = mcΔT allows chemists to predict heat generation rates and design safe manufacturing processes. The laboratory's training has contributed to Novartis's exemplary safety record—zero major thermal incidents in 15 years of Basel pharmaceutical manufacturing. This calorimetry exercise demonstrates how fundamental thermochemical measurements guide industrial safety decisions, protecting the 10,000 employees working at Novartis's Basel facilities while enabling efficient pharmaceutical production that supplies medications to millions of patients worldwide.",
            CAL_BASIC_5: "At the Basel Chemistry Institute's Physical Chemistry Laboratory, Professor Weber uses calorimetry to demonstrate endothermic phase transitions with ice melting experiments. When 75 grams of water cools from 23°C to 19°C as ice melts in it, students calculate the heat absorbed by the melting ice: q = mcΔT = (75 g)(4.18 J/g°C)(-4°C) = -1,254 J. The negative value indicates heat flows from the water to melt the ice, an endothermic process. This experiment teaches students that calorimetry measures energy changes in physical processes (like melting) as well as chemical reactions. The laboratory, located near Basel's Botanical Garden, serves 300 chemistry students annually, teaching calorimetry principles essential for pharmaceutical research. Professor Weber explains that understanding phase transition thermochemistry is crucial for pharmaceutical freeze-drying (lyophilization), a process Roche and Novartis use to stabilize heat-sensitive medications. Freeze-drying removes water by sublimation, requiring precise heat input to drive the endothermic phase transition without raising temperature enough to damage drugs. Basel's pharmaceutical companies operate 20 industrial freeze-dryers producing stable formulations of antibiotics, vaccines, and biological therapeutics. Calorimetry measurements guide freeze-drying process development, ensuring adequate heat input for efficient drying while maintaining product stability. This simple ice-melting calorimetry demonstrates principles that enable pharmaceutical technologies protecting millions of patients who depend on freeze-dried medications for treating infections, preventing diseases, and managing chronic conditions.",
            CAL_CORE_1: "In the Basel University Thermochemistry Laboratory, doctoral student Emma measures the enthalpy of neutralization for pharmaceutical pH control applications. When 0.1 moles of hydrochloric acid neutralizes sodium hydroxide in 200 grams of solution, the temperature rises from 20°C to 35°C. Students first calculate heat released: q = mcΔT = (200 g)(4.18 J/g°C)(15°C) = 12,540 J. Then they calculate enthalpy per mole: ΔH = -q/n = -12,540 J / 0.1 mol = -125,400 J/mol = -125.4 kJ/mol. The negative sign indicates an exothermic reaction. This calculation demonstrates how calorimetry data converts to molar enthalpy values used in thermochemical tables. The laboratory collaborates with Roche and Novartis, where neutralization reactions are fundamental to pharmaceutical manufacturing—adjusting pH during synthesis, purification, and formulation. Understanding molar enthalpy allows pharmaceutical chemists to predict heat generation when scaling reactions from laboratory (0.1 moles) to industrial scale (hundreds of moles). Emma's research focuses on measuring enthalpies for pharmaceutical reactions, building a database that guides process development. The laboratory has measured enthalpies for over 500 pharmaceutical reactions, data that Novartis and Roche use to design safe, efficient manufacturing processes. This calorimetry exercise demonstrates how laboratory measurements provide fundamental thermochemical data that enables pharmaceutical industry operations, connecting academic research to industrial applications that produce medications improving lives for millions of patients worldwide.",
            CAL_CORE_2: "At the Roche Pharmaceutical Formulation Laboratory in Grenzacherstrasse, formulation scientist Dr. Maria Hartmann measures dissolution enthalpies for drug compounds to predict dissolution behavior in the body. When 0.05 moles of a pharmaceutical salt dissolves in 150 grams of water, the temperature drops from 22°C to 18°C. The heat absorbed is: q = mcΔT = (150 g)(4.18 J/g°C)(-4°C) = -2,508 J. The molar enthalpy is: ΔH = -q/n = -(-2,508 J) / 0.05 mol = +50,160 J/mol = +50.2 kJ/mol. The positive value indicates endothermic dissolution, meaning the drug absorbs heat when dissolving. This information guides formulation development—endothermic dissolution can slow drug release, affecting how quickly medications begin working. The laboratory measures dissolution enthalpies for 100 drug compounds annually, data that guides tablet formulation decisions. Dr. Hartmann explains that understanding dissolution thermochemistry helps pharmaceutical scientists optimize drug delivery—some drugs benefit from rapid dissolution (pain relievers), while others require controlled release (blood pressure medications). Roche uses calorimetry data to design formulations that provide optimal therapeutic effects. The laboratory's work has contributed to developing 20 new drug formulations in the past five years, improving treatment outcomes for patients with cardiovascular disease, cancer, and infectious diseases. This calorimetry measurement demonstrates how thermochemical data guides pharmaceutical innovation, connecting laboratory science to clinical medicine that improves patient care worldwide.",
            CAL_CORE_3: "In the Novartis Process Chemistry Laboratory at St. Johann, research chemist Dr. Wei Chen measures reaction enthalpies for pharmaceutical synthesis optimization. When 0.15 moles of reactants undergo coupling reaction in 250 grams of solvent, the temperature rises from 25°C to 32°C. The heat released is: q = mcΔT = (250 g)(4.18 J/g°C)(7°C) = 7,315 J. The molar enthalpy is: ΔH = -q/n = -7,315 J / 0.15 mol = -48,767 J/mol = -48.8 kJ/mol. This moderately exothermic reaction requires cooling to maintain optimal reaction temperature for high product yield. The laboratory measures enthalpies for 200 pharmaceutical reactions annually, building a thermochemical database that guides industrial process design. Dr. Chen explains that knowing molar enthalpies allows pharmaceutical engineers to calculate cooling requirements when scaling reactions from laboratory (0.15 moles) to industrial scale (1,000 moles)—a 1,000-fold scale-up requires proportionally larger cooling systems. Novartis uses calorimetry data to design reactors with appropriate heat removal capacity, preventing thermal runaway that could cause dangerous pressure buildup or product decomposition. The laboratory's thermochemical measurements have enabled safe scale-up of 50 pharmaceutical processes, supporting production of medications treating cardiovascular disease, cancer, and neurological disorders. This calorimetry calculation demonstrates how laboratory measurements provide essential data for industrial pharmaceutical manufacturing, ensuring safe, efficient production of medications that improve health outcomes for millions of patients worldwide.",
            CAL_CORE_4: "At the Basel Chemistry Institute's Analytical Chemistry Laboratory, Professor Weber teaches students to measure combustion enthalpies using bomb calorimetry principles. When 0.08 moles of organic compound combusts in a calorimeter containing 100 grams of water, the temperature rises from 20°C to 26°C. The heat released is: q = mcΔT = (100 g)(4.18 J/g°C)(6°C) = 2,508 J. The molar combustion enthalpy is: ΔH = -q/n = -2,508 J / 0.08 mol = -31,350 J/mol = -31.4 kJ/mol. This calculation demonstrates how calorimetry determines combustion enthalpies, fundamental data for understanding fuel values and reaction energetics. The laboratory trains 300 chemistry students annually in calorimetry techniques used throughout pharmaceutical research and development. Professor Weber explains that combustion calorimetry provides accurate enthalpy measurements because combustion reactions go to completion, unlike some pharmaceutical reactions that reach equilibrium. Pharmaceutical companies use combustion data to calculate formation enthalpies via Hess's Law, building thermochemical databases for drug development. The institute collaborates with Novartis and Roche, providing calorimetry training for pharmaceutical chemists and conducting research on pharmaceutical compound energetics. Understanding how to convert calorimetry measurements to molar enthalpies is essential for pharmaceutical scientists who use thermochemical data daily to predict reaction feasibility, design synthesis routes, and optimize manufacturing processes. This educational exercise connects fundamental calorimetry principles to pharmaceutical applications that enable Basel's pharmaceutical industry to develop innovative medications for global healthcare.",
            CAL_CORE_5: "In the Roche Pharmaceutical Crystallization Laboratory at Kaiseraugst, process engineer Dr. Andreas Weber measures crystallization enthalpies to optimize drug purification processes. When 0.12 moles of pharmaceutical compound crystallizes from 180 grams of solution, the temperature rises from 23°C to 29°C due to exothermic crystallization. The heat released is: q = mcΔT = (180 g)(4.18 J/g°C)(6°C) = 4,514 J. The molar crystallization enthalpy is: ΔH = -q/n = -4,514 J / 0.12 mol = -37,617 J/mol = -37.6 kJ/mol. This moderately exothermic process indicates favorable crystallization, important for pharmaceutical purification where crystallization separates pure drug from impurities. The laboratory processes 50 different pharmaceutical compounds monthly, measuring crystallization enthalpies that guide purification process development. Dr. Weber explains that crystallization thermochemistry affects purification efficiency—highly exothermic crystallization indicates strong crystal lattice formation, typically producing high-purity crystals suitable for pharmaceutical use. Roche uses calorimetry data to optimize crystallization conditions (temperature, solvent, cooling rate) for maximum yield and purity. The facility's crystallization processes achieve 99.9% purity required for pharmaceutical products, ensuring medications meet strict quality standards. Understanding crystallization enthalpies through calorimetry enables pharmaceutical scientists to design efficient purification processes, reducing manufacturing costs while maintaining product quality. This measurement demonstrates how thermochemical data guides pharmaceutical manufacturing decisions, ensuring that medications are pure, safe, and effective for treating patients worldwide.",
            CAL_ADVANCED_1: "At the Roche Precision Calorimetry Laboratory in Grenzacherstrasse, analytical chemist Dr. Lisa Müller performs high-accuracy enthalpy measurements accounting for calorimeter heat capacity. When a reaction heats 150 grams of solution from 22°C to 28°C in a calorimeter with heat capacity 50 J/°C, the total heat includes both solution and calorimeter: q_solution = mcΔT = (150 g)(4.18 J/g°C)(6°C) = 3,762 J; q_calorimeter = C_cal × ΔT = (50 J/°C)(6°C) = 300 J; q_total = 3,762 + 300 = 4,062 J. Ignoring calorimeter heat capacity would underestimate heat by 7%, unacceptable for pharmaceutical quality control. The laboratory performs 1,000 precision calorimetry measurements annually, ensuring pharmaceutical processes meet strict specifications. Dr. Müller explains that pharmaceutical calorimetry requires accounting for all heat sinks—solution, calorimeter, stirrer, thermometer—to achieve ±1% accuracy needed for regulatory compliance. Roche's quality control systems use precision calorimetry to validate that pharmaceutical reactions proceed as specified, detecting process deviations before they affect product quality. Understanding calorimeter heat capacity corrections is essential for pharmaceutical analytical chemists who must provide accurate thermochemical data for regulatory submissions. The laboratory's precision measurements support Roche's production of 200+ pharmaceutical compounds, ensuring consistent quality that protects patient safety and maintains regulatory approval for medications treating millions of patients worldwide.",
            CAL_ADVANCED_2: "In the Novartis Pharmaceutical Process Development Laboratory at Schweizerhalle, Dr. Stefan Zimmermann uses precision calorimetry to measure reaction enthalpies for scale-up calculations. When a pharmaceutical coupling reaction heats 200 grams of solvent from 20°C to 27°C in a calorimeter with 75 J/°C heat capacity, the total heat released includes both solvent and calorimeter contributions: q_solvent = (200 g)(4.18 J/g°C)(7°C) = 5,852 J; q_calorimeter = (75 J/°C)(7°C) = 525 J; q_total = 5,852 + 525 = 6,377 J. The calorimeter absorbs 8% of the total heat, a significant correction for accurate enthalpy determination. The laboratory measures enthalpies for 150 pharmaceutical reactions annually, providing data that guides industrial reactor design. Dr. Zimmermann explains that accurate calorimetry is crucial for pharmaceutical scale-up—underestimating reaction enthalpy leads to inadequate cooling systems, potentially causing thermal runaway at industrial scale. Novartis uses precision calorimetry data to design reactors with appropriate heat removal capacity, ensuring safe operation when scaling from laboratory (grams) to industrial production (tons). The laboratory's measurements have enabled successful scale-up of 40 pharmaceutical processes, supporting production of medications treating cardiovascular disease, cancer, and infectious diseases. Understanding calorimeter heat capacity corrections ensures pharmaceutical engineers have accurate thermochemical data for designing safe, efficient manufacturing processes that produce high-quality medications for millions of patients worldwide while protecting worker safety and environmental quality.",
            CAL_ADVANCED_3: "At the Basel University Advanced Thermochemistry Laboratory, Professor Weber teaches doctoral students precision calorimetry techniques used in pharmaceutical research. When measuring a neutralization reaction that heats 175 grams of solution from 25°C to 31°C in a calorimeter with 60 J/°C heat capacity, students must account for both heat sinks: q_solution = (175 g)(4.18 J/g°C)(6°C) = 4,389 J; q_calorimeter = (60 J/°C)(6°C) = 360 J; q_total = 4,389 + 360 = 4,749 J. The calorimeter correction adds 8% to the measured heat, demonstrating why precision calorimetry requires careful calibration. The laboratory trains 50 doctoral students annually in advanced calorimetry techniques, preparing them for pharmaceutical industry careers. Professor Weber explains that calorimeter heat capacity is determined by calibration using reactions with known enthalpies, typically electrical heating or standard chemical reactions. This calibration must be performed regularly to maintain measurement accuracy. The laboratory collaborates with Novartis and Roche, conducting research on pharmaceutical reaction thermochemistry and training pharmaceutical scientists in precision measurement techniques. Understanding calorimeter heat capacity corrections is essential for pharmaceutical researchers who must provide accurate thermochemical data for process development, safety assessments, and regulatory submissions. The laboratory's research has contributed to 30 publications on pharmaceutical thermochemistry, advancing scientific understanding while training the next generation of pharmaceutical scientists who will develop innovative medications for global healthcare needs.",
            CAL_ADVANCED_4: "In the Roche Pharmaceutical Reaction Calorimetry Laboratory at Kaiseraugst, Dr. Maria Hoffmann uses advanced calorimetry to study pharmaceutical reaction kinetics and thermodynamics. When an esterification reaction heats 125 grams of solvent from 23°C to 30°C in a calorimeter with 45 J/°C heat capacity, the total heat released is: q_solvent = (125 g)(4.18 J/g°C)(7°C) = 3,658 J; q_calorimeter = (45 J/°C)(7°C) = 315 J; q_total = 3,658 + 315 = 3,973 J. The 8% calorimeter correction is essential for accurate kinetic modeling—reaction rate calculations require precise heat flow measurements. The laboratory operates three reaction calorimeters continuously, monitoring pharmaceutical reactions in real-time to study reaction mechanisms and optimize conditions. Dr. Hoffmann explains that reaction calorimetry provides insights beyond simple enthalpy measurements—by monitoring heat flow throughout the reaction, chemists can determine reaction rates, identify intermediates, and detect side reactions. Roche uses reaction calorimetry data to optimize pharmaceutical synthesis conditions, maximizing yield while minimizing impurities and waste. The laboratory's work has improved 25 pharmaceutical processes, increasing production efficiency by 15% while reducing waste by 20%. Understanding advanced calorimetry techniques enables pharmaceutical scientists to develop more efficient, sustainable manufacturing processes. This measurement demonstrates how precision thermochemical analysis guides pharmaceutical innovation, supporting development of high-quality medications while reducing environmental impact and manufacturing costs.",
            CAL_ADVANCED_5: "At the Novartis Pharmaceutical Safety Assessment Laboratory in St. Johann, safety engineer Dr. Thomas Weber uses precision calorimetry to evaluate thermal hazards in pharmaceutical processes. When testing a potentially hazardous reaction that heats 160 grams of solution from 21°C to 28°C in a calorimeter with 55 J/°C heat capacity, the total heat release is: q_solution = (160 g)(4.18 J/g°C)(7°C) = 4,681 J; q_calorimeter = (55 J/°C)(7°C) = 385 J; q_total = 4,681 + 385 = 5,066 J. Accurate heat measurement is crucial for safety assessment—underestimating heat generation could lead to inadequate safety systems at industrial scale. The laboratory evaluates 100 pharmaceutical processes annually for thermal hazards, ensuring safe scale-up from laboratory to industrial production. Dr. Weber explains that calorimetry provides essential data for safety engineering—knowing exact heat generation rates allows engineers to design cooling systems, pressure relief systems, and emergency shutdown procedures that prevent thermal runaway. Novartis's comprehensive safety assessment program, based on precision calorimetry, has maintained zero major thermal incidents in 15 years of Basel pharmaceutical manufacturing. Understanding calorimeter heat capacity corrections ensures safety engineers have accurate data for protecting the 10,000 employees working at Novartis's Basel facilities. This measurement demonstrates how precision thermochemical analysis enables safe pharmaceutical manufacturing, protecting workers and communities while producing medications that improve health outcomes for millions of patients worldwide.",
            CAL_ELITE_1: "At the Novartis Industrial Pharmaceutical Reactor Facility in Schweizerhalle, process engineer Dr. Stefan Zimmermann monitors a 5,000-liter reactor producing anticancer medication through exothermic coupling reaction. The reactor contains 5,000 kg (5,000,000 g) of reaction mixture with specific heat 3.5 J/g°C, heating from 25°C to 45°C during reaction of 10 kmol (10,000 mol) of reactants. The reactor vessel has heat capacity 2,000 kJ/°C (2,000,000 J/°C). Total heat released: q_solution = (5,000,000 g)(3.5 J/g°C)(20°C) = 350,000,000 J = 350,000 kJ; q_reactor = (2,000,000 J/°C)(20°C) = 40,000,000 J = 40,000 kJ; q_total = 350,000 + 40,000 = 390,000 kJ. Molar enthalpy: ΔH = -390,000 kJ / 10,000 mol = -39 kJ/mol. This moderately exothermic reaction requires sophisticated cooling systems removing 390 megajoules of heat over 4 hours—equivalent to 27 kilowatts continuous cooling. The facility operates 12 industrial reactors producing 50 different pharmaceutical compounds, all monitored by advanced calorimetry systems. Dr. Zimmermann explains that industrial calorimetry is essential for pharmaceutical manufacturing safety—real-time heat flow monitoring detects process deviations before they cause thermal runaway. The facility's heat recovery systems capture 85% of reaction heat for building heating and solvent distillation, demonstrating sustainable pharmaceutical manufacturing. Understanding industrial-scale calorimetry enables pharmaceutical engineers to design safe, efficient processes producing medications that treat cancer, cardiovascular disease, and infectious diseases for millions of patients worldwide.",
            CAL_ELITE_2: "In the Roche Large-Scale Pharmaceutical Manufacturing Facility at Kaiseraugst, principal engineer Dr. Andreas Weber oversees an 8,000-liter reactor producing antibiotic medication through fermentation followed by chemical modification. The reactor contains 8,000 kg of aqueous reaction mixture (specific heat 4.0 J/g°C) that heats from 20°C to 35°C during exothermic acylation of 15 kmol of antibiotic intermediate. The stainless steel reactor has heat capacity 3,000 kJ/°C. Total heat: q_solution = (8,000,000 g)(4.0 J/g°C)(15°C) = 480,000,000 J = 480,000 kJ; q_reactor = (3,000,000 J/°C)(15°C) = 45,000,000 J = 45,000 kJ; q_total = 480,000 + 45,000 = 525,000 kJ. Molar enthalpy: ΔH = -525,000 kJ / 15,000 mol = -35 kJ/mol. This reaction releases 525 megajoules over 6 hours, requiring 24 kilowatts continuous cooling. The facility produces 300 tons of antibiotics annually, treating bacterial infections for 5 million patients worldwide. Dr. Weber explains that industrial pharmaceutical calorimetry combines chemistry, engineering, and process control—sophisticated sensors monitor temperature at 20 locations in the reactor, with automated cooling systems maintaining optimal reaction temperature ±0.5°C. The facility's advanced process control has achieved 99.8% batch success rate, minimizing waste while ensuring consistent product quality. Understanding industrial calorimetry enables pharmaceutical engineers to operate complex manufacturing processes safely and efficiently, producing life-saving antibiotics that have reduced mortality from bacterial infections by 90% since their introduction, demonstrating pharmaceutical chemistry's profound impact on global health.",
            CAL_ELITE_3: "At the Novartis Cardiovascular Drug Manufacturing Complex in St. Johann, Dr. Maria Hoffmann manages a 10,000-liter reactor producing blood pressure medication through multi-step synthesis. The reactor contains 10,000 kg of organic solvent mixture (specific heat 3.8 J/g°C) that heats from 30°C to 50°C during exothermic condensation reaction of 20 kmol of pharmaceutical intermediates. The jacketed glass-lined reactor has heat capacity 4,000 kJ/°C. Total heat: q_solution = (10,000,000 g)(3.8 J/g°C)(20°C) = 760,000,000 J = 760,000 kJ; q_reactor = (4,000,000 J/°C)(20°C) = 80,000,000 J = 80,000 kJ; q_total = 760,000 + 80,000 = 840,000 kJ. Molar enthalpy: ΔH = -840,000 kJ / 20,000 mol = -42 kJ/mol. This highly exothermic reaction releases 840 megajoules over 8 hours, requiring 29 kilowatts continuous cooling through the reactor jacket circulating chilled water at 15°C. The facility produces 500 tons of cardiovascular medications annually, treating hypertension and heart failure for 100,000 Swiss patients. Dr. Hoffmann explains that industrial pharmaceutical calorimetry requires understanding heat transfer engineering—the reactor's cooling jacket must remove heat faster than the reaction generates it to prevent temperature runaway. Novartis's advanced reactor design achieves 95% heat removal efficiency, maintaining precise temperature control essential for product quality. The facility's calorimetry systems have prevented 15 potential thermal incidents over 10 years, demonstrating how thermochemical monitoring protects worker safety while enabling production of medications that prevent heart attacks and strokes, saving thousands of lives annually.",
            CAL_ELITE_4: "In the Roche Biopharmaceutical Production Facility at Grenzacherstrasse, bioprocess engineer Dr. Wei Chen monitors a 6,000-liter bioreactor producing therapeutic protein through fermentation. The bioreactor contains 6,000 kg of aqueous cell culture medium (specific heat 4.2 J/g°C) that heats from 22°C to 38°C during exothermic cellular metabolism producing 12 kmol of therapeutic protein. The bioreactor vessel has heat capacity 2,500 kJ/°C. Total heat: q_medium = (6,000,000 g)(4.2 J/g°C)(16°C) = 403,200,000 J = 403,200 kJ; q_bioreactor = (2,500,000 J/°C)(16°C) = 40,000,000 J = 40,000 kJ; q_total = 403,200 + 40,000 = 443,200 kJ. Molar enthalpy: ΔH = -443,200 kJ / 12,000 mol = -36.9 kJ/mol. This fermentation releases 443 megajoules over 72 hours, requiring 1.7 kilowatts continuous cooling to maintain optimal cell growth temperature of 37°C. The facility operates 8 bioreactors producing therapeutic proteins treating autoimmune diseases, cancer, and genetic disorders for 20,000 patients worldwide. Dr. Chen explains that bioreactor calorimetry differs from chemical reactor calorimetry—living cells continuously generate metabolic heat, requiring constant cooling even during steady-state operation. Roche's sophisticated bioreactor control systems maintain temperature within ±0.2°C, essential for cell viability and protein quality. The facility's calorimetry-based process control has achieved 98% batch success rate, maximizing production of expensive biological therapeutics. Understanding bioreactor calorimetry enables pharmaceutical engineers to produce complex biological medications that have revolutionized treatment of previously untreatable diseases, demonstrating how thermochemical principles apply across all pharmaceutical manufacturing technologies.",
            CAL_ELITE_5: "At the Novartis Flagship Pharmaceutical Manufacturing Complex in Schweizerhalle, chief process engineer Dr. Thomas Keller oversees a 12,000-liter reactor producing blockbuster immunosuppressant medication through complex multi-step synthesis. The reactor contains 12,000 kg of mixed organic solvents (specific heat 3.6 J/g°C) that heats from 28°C to 42°C during highly exothermic cyclization reaction of 25 kmol of advanced pharmaceutical intermediate. The specialized titanium reactor has heat capacity 5,000 kJ/°C. Total heat: q_solution = (12,000,000 g)(3.6 J/g°C)(14°C) = 604,800,000 J = 604,800 kJ; q_reactor = (5,000,000 J/°C)(14°C) = 70,000,000 J = 70,000 kJ; q_total = 604,800 + 70,000 = 674,800 kJ. Molar enthalpy: ΔH = -674,800 kJ / 25,000 mol = -27 kJ/mol. This reaction releases 675 megajoules over 10 hours, requiring 19 kilowatts continuous cooling through a sophisticated heat exchange system. The facility produces 1,000 tons of this immunosuppressant annually, preventing organ rejection for 50,000 transplant patients worldwide. Dr. Keller explains that this pharmaceutical synthesis represents the pinnacle of industrial thermochemical engineering—the reactor's advanced calorimetry system monitors heat generation at millisecond intervals, with predictive algorithms adjusting cooling 30 seconds before temperature deviations occur. Novartis's investment in advanced calorimetry and process control has achieved 99.9% batch success rate while maintaining exemplary safety record. Understanding industrial-scale pharmaceutical calorimetry enables production of complex medications that have made organ transplantation routine, transforming previously fatal conditions into manageable chronic diseases and demonstrating pharmaceutical chemistry's extraordinary impact on extending and improving human life worldwide."
        },
        back: "Back to Nexus",
        title: "SC2.07 // ENTHALPY & ENERGETICS",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Thermochemistry",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "SC2.07_ENTHALPY_MONITOR",
        footer_left: "SC2.07_ENTHALPY_ENERGETICS // NODE: BASEL",
        stages: {
            energy_changes: "ENERGY CHANGES",
            hess_law: "HESS'S LAW",
            calorimetry: "CALORIMETRY"
        },
        prompts: {
            calculate_enthalpy: "Calculate the enthalpy change (ΔH) for this reaction",
            apply_hess_law: "Apply Hess's Law to determine ΔH",
            calculate_heat: "Calculate the heat change using q = mcΔT",
            solve_problem: "Solve the thermochemistry problem"
        },
        feedback: {
            correct: "Correct! Your calculation is accurate.",
            incorrect: "Incorrect. Expected: {expected} kJ",
            invalid_number: "Please enter a valid number"
        },
        mission: {
            title: "MISSION: THERMOCHEMISTRY",
            description: "Master enthalpy calculations, Hess's Law, and calorimetry in pharmaceutical contexts."
        },
        visualization: {
            title: "Energy Diagram",
            description: "Visual representation of enthalpy changes",
            current_equation: "Current Reaction"
        }
    }
};
