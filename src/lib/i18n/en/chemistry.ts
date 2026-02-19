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
            reactions: "REACTIONS"
        },
        prompts: {
            identify_powders: "Identify the three white powders"
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
        instructions: {
            reaction_types: "Examine the chemical equation and identify the type of reaction. Consider the pattern of reactants and products.",
            equation_balancing: "Enter coefficients to balance the chemical equation. Ensure the number of atoms of each element is equal on both sides.",
            reaction_simulation: "Watch the molecular animation to observe how bonds break and form during the reaction. Use the controls to play, pause, or restart."
        },
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
