/**
 * EN - BIOLOGY translations
 * Auto-generated from i18n.ts refactoring
 * Last updated: 2026-02-15
 */

export const enBiology = {
    gb1_01: {
        back: "Back to Nexus",
        title: "GB1.01 // EVOLUTION LAB",
        difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
        objective_title: "Active Mission Objective",
        monitor_title: "Evolution Monitor",
        stages: {
            natural_selection: "NATURAL SELECTION",
            speciation: "SPECIATION",
            evidence: "EVIDENCE"
        },
        labels: {
            generation: "Generation",
            selection_pressure: "Selection Pressure",
            evolution_score: "Evolution Score",
            evolution_display: "Evolution Display",
            input_terminal: "Input Terminal"
        },
        prompts: {
            natural_selection: "In a population of {initial} finches, {survival} survive drought. Calculate fitness.",
            speciation: "After {generations} generations with mutation rate {rate}, calculate genetic divergence.",
            evidence: "A fossil is {age} years old. With C-14 half-life {halflife} years, find remaining fraction.",
            hint_fitness: "Fitness = Survivors / Initial Population",
            hint_divergence: "Divergence = Generations × Mutation Rate",
            hint_halflife: "Remaining = (0.5)^(age/half-life)"
        },
        feedback: {
            correct: "Natural selection confirmed!",
            incorrect: "Evolution needs more time..."
        },
        check: "Verify",
        next: "Next Generation",
        correct: "Correct",
        incorrect: "Incorrect",
        ready: "Ready",
        footer_left: "GB1.01 // EVOLUTION LAB"
    },
    gb2_01: {
        back: "Back to Nexus",
        title: "GB2.01 // NEUROBIOLOGY",
        difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
        objective_title: "Active Mission Objective",
        monitor_title: "Neural Activity Monitor",
        footer_left: "GB2.01_NEUROBIOLOGY // NODE: BASEL",
        check: "Verify",
        next: "Next Impulse",
        correct: "Signal Transmitted",
        incorrect: "Synaptic Failure",
        ready: "Ready",
        stages: {
            anatomy: "NEURON ANATOMY",
            potential: "ACTION POTENTIAL",
            synapse: "SYNAPTIC TRANSMISSION"
        },
        labels: {
            voltage: "Membrane Voltage (mV)",
            threshold: "Threshold Potential",
            neurotransmitter: "Neurotransmitter",
            receptor_affinity: "Receptor Affinity",
            node_of_ranvier: "Node of Ranvier",
            myelin_sheath: "Myelin Sheath",
            cell_body: "Soma (Cell Body)",
            axon: "Axon",
            dendrites: "Dendrites"
        },
        prompts: {
            identify_part: "Identify the structure responsible for {function}.",
            calc_potential: "Given [K⁺] outside is {k_out} and inside is {k_in}, calculate equilibrium potential.",
            action_potential: "What is the primary ion responsible for depolarization during the rising phase?",
            synapse_mechanism: "Which ion influx triggers the release of neurotransmitters into the synaptic cleft?",
            hint_anatomy: "Look for the long fiber that carries impulses away from the cell body.",
            hint_sodium: "Sodium (Na⁺) rushes in during depolarization.",
            hint_calcium: "Calcium (Ca²⁺) entry triggers vesicle fusion.",
            hint_nernst: "Use the Nernst Equation: E = 61 log10(C_out/C_in) at 37°C."
        },
        scenarios: {
            basel_biomedicine: "University of Basel - Biozentrum: Research at the Biozentrum focuses on how synaptic connections are formed and maintained. Understanding these processes is vital for treating neurodegenerative diseases.",
            roche_neuroscience: "Roche Neuroscience Research: Scientists at Roche Basel develop drugs for Alzheimer's and Parkinson's by targeting specific neurotransmitter receptors and ion channels.",
            neural_plasticity: "Neural Plasticity Lab: Studying how learning strengthens synapses (Long-Term Potentiation) helps in developing better educational tools and rehabilitation strategies.",
            friedrich_miescher: "Friedrich Miescher Institute (FMI): FMI researchers in Basel investigate the molecular mechanisms that control nerve cell growth and the assembly of neural circuits."
        },
        feedback: {
            correct: "Action potential successfully propagation verified!",
            incorrect: "The signal was lost. Review the neural mechanism."
        }
    },
    gb3_01: {
        back: "Back to Nexus",
        title: "GB3.01 // DNA FORGE",
        difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
        objective_title: "Active Mission Objective",
        target_title: "DNA Structure",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "GB3.01_DNA_MONITOR",
        footer_left: "GB3.01_DNA_FORGE // NODE: BASEL",
        stages: {
            pairing: "BASE PAIRING",
            bonds: "HYDROGEN BONDS",
            sequence: "SEQUENCING"
        },
        labels: {
            rotation: "ROTATION",
            auto_rotate: "Auto Rotate",
            show_bonds: "Show Hydrogen Bonds",
            highlight_pair: "HIGHLIGHT BASE PAIR",
            pairing_rules: "BASE PAIRING RULES",
            bases: "NUCLEOTIDE BASES",
            structure: "DNA STRUCTURE",
            adenine: "Adenine",
            thymine: "Thymine",
            cytosine: "Cytosine",
            guanine: "Guanine"
        },
        concepts: {
            helix: "Double helix: Two antiparallel strands",
            backbone: "Backbone: Sugar-phosphate groups",
            at_pair: "A ↔ T: Two hydrogen bonds",
            gc_pair: "C ↔ G: Three hydrogen bonds",
            polarity: "Polarity: 5' to 3' orientation",
            complementary: "Rule: Chargaff's base pairing"
        },
        mission: {
            title: "MISSION: DNA ARCHITECTURE",
            description: "Master the structural principles of the DNA double helix. Verify base pairing rules and hydrogen bond stability."
        },
        prompts: {
            pairing_prompt: "Identify the complementary base for {base}.",
            bonds_prompt: "How many hydrogen bonds connect {b1} and {b2}?",
            seq_prompt: "Provide the complementary sequence for: {seq}",
            pairing_target: "Complement of {base}",
            bonds_target: "H-Bonds: ?",
            seq_target: "Complementary Stream",
            hint_at: "A pairs with T via 2 bonds.",
            hint_gc: "G pairs with C via 3 bonds."
        }
    },
    gb3_02: {
        back: "Back to Nexus",
        title: "GB3.02 // IMMUNOLOGY LAB",
        difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
        objective_title: "Active Mission Objective",
        monitor_title: "Immune Response Monitor",
        footer_left: "GB3.02_IMMUNOLOGY // NODE: BASEL",
        check: "Verify",
        next: "Next Challenge",
        correct: "Antigen Neutralized",
        incorrect: "Pathogen Escape",
        ready: "Ready",
        stages: {
            innate: "INNATE IMMUNITY",
            adaptive: "ADAPTIVE IMMUNITY",
            vaccines: "VACCINES & MEMORY"
        },
        labels: {
            antigen_count: "Antigen Load",
            antibody_titer: "Antibody Titer",
            b_cell_activity: "B-Cell Activity",
            t_cell_count: "T-Cell Activation",
            pathogen_type: "Pathogen Type",
            inflammation_level: "Inflammation",
            macrophage_status: "Macrophage Status"
        },
        prompts: {
            innate_defense: "A {pathogen} breaches the skin. Which cells provide the first rapid response?",
            antibody_matching: "Given an antigen with structure {antigen}, which antibody region ensures specificity?",
            memory_response: "In the secondary response, the lag period is {lag} days compared to {primary_lag} days in primary. Calculate the response acceleration.",
            vaccine_logic: "How do mRNA vaccines prompt the immune system to recognize a virus without using a live pathogen?",
            hint_innate: "Think of phagocytes like macrophages and neutrophils.",
            hint_adaptive: "B-cells produce antibodies; T-cells kill infected cells.",
            hint_constant: "The variable region of the antibody is the key.",
            hint_memory: "Memory cells allow for a near-instantaneous response."
        },
        scenarios: {
            roche_immunology: "Roche Immunology Division: Scientists at Roche Basel develop monoclonal antibodies to target cancer cells, utilizing the precision of the adaptive immune system.",
            basel_hospital_infectious: "University Hospital Basel - Infectious Diseases: Doctors analyze how patients' immune systems respond to seasonal influenza and emerging pathogens.",
            vaccine_research: "Swiss Vaccine Institute: Researching new delivery mechanisms for vaccines helps broaden immunity across global populations.",
            autoimmune_center: "Basel Autoimmune Research Center: Understanding when the immune system mistakenly attacks host tissues is key to treating diseases like Multiple Sclerosis."
        },
        feedback: {
            correct: "Immune defense successful! Memory cells archived.",
            incorrect: "Immune response insufficient. Pathogen spreading."
        }
    },
    sb1_01: {
        back: "Back to Nexus",
        title: "SB1.01 // CELL FACTORY",
        difficulty: {
            basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Cell Analysis",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "SB1.01_CELL_MONITOR",
        footer_left: "SB1.01_CELL_FACTORY // NODE: BASEL",
        stages: {
            identification: "IDENTIFICATION",
            function: "FUNCTION",
            organelles: "ORGANELLES"
        },
        labels: {
            cutaway_view: "Cutaway View",
            selected: "SELECTED ORGANELLE",
            instructions: "INSTRUCTIONS",
            nucleus: "Nucleus",
            mitochondria: "Mitochondria",
            chloroplast: "Chloroplast",
            ribosome: "Ribosome",
            golgi: "Golgi Apparatus",
            er: "Endoplasmic Reticulum",
            membrane: "Cell Membrane",
            vacuole: "Vacuole"
        },
        mission: {
            title: "MISSION: CELL EXPLORATION",
            description: "Explore the animal cell structure. Identify organelles and understand their functions in the cellular economy."
        },
        prompts: {
            id_prompt: "Identify the organelle highlighted in the 3D view.",
            id_target: "Highlighted: ?",
            fn_prompt: "Which organelle is responsible for: {func}?",
            fn_target: "Function: {func}",
            hint_name: "It is the {name}",
            hint_start: "The answer starts with {char}"
        },
        organelles: {
            nucleus: {
                name: "Nucleus",
                func: "Control Center / DNA Storage",
                details: "Contains DNA and controls all cell activities. The 'brain' of the cell."
            },
            mitochondria: {
                name: "Mitochondria",
                func: "ATP Energy Production (Powerhouse)",
                details: "Produces ATP through cellular respiration. Converts glucose into energy."
            },
            ribosome: {
                name: "Ribosome",
                func: "Protein Synthesis",
                details: "Synthesizes proteins by reading mRNA sequences."
            },
            golgi: {
                name: "Golgi Apparatus",
                func: "Packaging & Transport",
                details: "Modifies, packages, and transports proteins to their destinations."
            },
            er: {
                name: "Endoplasmic Reticulum",
                func: "Synthesis Network (ER)",
                details: "Rough ER: protein synthesis. Smooth ER: lipid synthesis and detoxification."
            }
        }
    },
    sb1_01_metabolic: {
        back: "Back to Nexus",
        title: "SB1.01 // METABOLIC ENGINE",
        difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
        objective_title: "Active Mission Objective",
        target_title: "Metabolic Status",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Homeostasis Stable",
        incorrect: "Metabolic Crisis",
        ready: "Ready",
        monitor_title: "SB1.01_METABOLIC_MONITOR",
        footer_left: "SB1.01_CELL_BIOLOGY // NODE: BASEL",
        stages: {
            osmosis: "OSMOSIS",
            respiration: "RESPIRATION",
            homeostasis: "HOMEOSTASIS"
        },
        labels: {
            osmolarity: "External Osmolarity",
            atp_flow: "Show ATP Flow",
            hypertonic: "Hypertonic",
            isotonic: "Isotonic",
            hypotonic: "Hypotonic",
            status: "Osmotic Status",
            respiration_formula: "Respiration Formula",
            glucose: "Glucose",
            oxygen: "Oxygen",
            atp: "ATP Energy"
        },
        prompts: {
            osmosis_prompt: "The cell is in a {status} environment. What happens to the water?",
            respiration_prompt: "Complete the respiration reactant: C₆H₁₂O₆ + 6{reactant} → ...",
            product_prompt: "What is the primary energy product of respiration?",
            homeostasis_target: "Balance the environment to achieve Isotonic state.",
            hint_hyper: "High salt outside! Water leaves the cell.",
            hint_hypo: "Low salt outside! Water rushes in.",
            hint_oxy: "We breathe this in to burn glucose.",
            hint_iso: "No net movement.",
            hint_atp: "Primary energy currency of the cell.",
            hint_homeostasis: "Set value to zero for stability."
        },
        latex_labels: {
            water_movement: "Water Movement",
            product: "Product",
            reactant: "Reactant",
            target_osmolarity: "Target Osmolarity",
            current_error: "Current Error: "
        }
    },
    sb1_02: {
        back: "Return to Nexus",
        title: "SB1.02 // PHOTOSYNTHESIS LAB",
        difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
        check: "Verify",
        next: "Execute Next Sequence",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "SB1.02_PHOTOSYNTHESIS_MONITOR",
        footer_left: "SB1.02_PHOTOSYNTHESIS_LAB // NODE: BASEL",
        objective_title: "Active Mission Objective",
        stages: {
            equation: "REACTION EQUATION",
            factors: "LIMITING FACTORS",
            chloroplast: "CHLOROPLAST"
        },
        labels: {
            light: "Light Intensity",
            co2: "CO2 Level",
            temp: "Temperature",
            efficiency: "Efficiency",
            reaction_display: "Reaction Display",
            input_terminal: "Input Terminal"
        },
        canvas_labels: {
            light: "LIGHT",
            rate: "Rate",
            thylakoid: "THYLAKOID",
            stroma: "STROMA",
            co2_label: "CO₂",
            temp_label: "Temp"
        },
        prompts: {
            reactant: "Complete the equation: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6{O₂}. What is the missing reactant count?",
            hint_oxygen: "Count the oxygen atoms on both sides of the equation",
            glucose: "How many glucose molecules are produced from {co2} CO₂ molecules?",
            hint_glucose: "The ratio of CO₂ to glucose is 6:1",
            water_count: "How many water molecules are needed to produce {glucose} glucose molecules?",
            hint_balance: "Balance the equation: 6 water molecules per glucose molecule",
            factor_effect: "If {factor} decreases by half, what happens to the rate of photosynthesis?",
            hint_factor: "Each factor independently limits the maximum rate",
            structure_function: "Which structure in the chloroplast is responsible for {process}?",
            hint_structure: "Light reactions occur in the thylakoid membranes; the Calvin cycle occurs in the stroma"
        },
        feedback: {
            correct: "Photosynthesis equation balanced!",
            incorrect: "Review the photosynthesis reaction."
        }
    },
    sb1_03: {
        back: "Back to Nexus",
        title: "SB1.03 // CELL DIVISION",
        check: "Verify",
        next: "Next Phase",
        correct: "Phase Clear",
        incorrect: "Misaligned",
        ready: "Ready",
        monitor_title: "SB1.03_REPLICATION_HUB",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        stages: {
            mitosis: "MITOSIS",
            meiosis_i: "MEIOSIS I",
            meiosis_ii: "MEIOSIS II"
        }
    },
    sb2_01_tissues: {
        back: "Back to Nexus",
        title: "SB2.01 // TISSUES & ORGANS",
        difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
        objective_title: "Active Mission Objective",
        monitor_title: "Tissue Organization Monitor",
        footer_left: "SB2.01_TISSUES_ORGANS // NODE: BASEL",
        check: "Verify",
        next: "Next Level",
        correct: "Correct",
        incorrect: "Incorrect",
        stages: {
            tissues: "TISSUE TYPES",
            organs: "ORGAN COMPOSITION",
            systems: "ORGAN SYSTEMS"
        },
        scenarios: {
            tissues: "Basel University Hospital Pathology Lab: You are a medical student at Basel University Hospital learning tissue identification under Dr. Müller's guidance. Using advanced microscopes, you examine tissue samples from different body locations. Each of the four main tissue types has a specific function: epithelial tissue covers and protects body surfaces (like skin and intestinal lining), connective tissue provides structural support (like bone and cartilage), muscle tissue enables movement through contraction (like heart muscle and skeletal muscles), and nervous tissue transmits electrical signals for communication (like brain cells and nerve fibers). Your task is to identify the primary function of each tissue type based on its microscopic structure and location in the body. This fundamental skill is essential for medical diagnosis, as abnormal tissue structure often indicates disease. Just like a building needs different materials for different purposes (concrete for foundation, glass for windows, wires for electricity), your body needs different tissue types for different jobs. Understanding tissue function is the first step in understanding how organs work.",
            organs: "Novartis Pharmaceutical Research - Organ Modeling Division: You are working at Novartis Basel's biomedical research division, where scientists create detailed 3D models of human organs for drug testing and development. Each organ in the human body is composed of multiple tissue types working together in harmony. For example, the heart contains four tissue types: muscle tissue (cardiac muscle for pumping blood), epithelial tissue (endothelium lining blood vessels), connective tissue (providing structural framework), and nervous tissue (controlling heart rate and rhythm). Similarly, the stomach has epithelial tissue (secreting digestive enzymes), muscle tissue (churning food), connective tissue (structural support), and nervous tissue (coordinating digestion). Your task is to count how many different tissue types compose each organ. This information is crucial for understanding how pharmaceutical drugs affect different parts of an organ - a drug targeting muscle tissue might also affect epithelial or nervous tissue in the same organ. Accurate organ models help Novartis develop safer medications by predicting potential side effects before human clinical trials. This work directly contributes to the development of life-saving drugs used in Swiss hospitals.",
            systems: "Basel Medical School - Human Body Organization: You are studying anatomy at Basel Medical School, learning how the human body is organized in a clear hierarchical structure. This biological hierarchy follows a logical progression from simple to complex: cells (the smallest living units, like a single muscle cell) → tissues (groups of similar cells working together, like muscle tissue) → organs (structures made of multiple tissue types, like the heart) → organ systems (groups of organs working together, like the circulatory system) → organism (the complete human body). For example, a single cardiac muscle cell joins with millions of other muscle cells to form cardiac muscle tissue. This muscle tissue combines with epithelial tissue (lining), connective tissue (framework), and nervous tissue (control) to form the heart organ. The heart then works together with blood vessels (arteries, veins, capillaries) to form the circulatory system, which transports oxygen and nutrients throughout the entire organism. Understanding this hierarchy is fundamental for medical diagnosis and treatment - a problem at the cellular level (like a genetic mutation) can cascade up through tissues, organs, and systems to affect the entire body. Your task is to identify the correct level in this biological organization and understand how many organs compose each major body system."
        }
    },
    sb2_02_body_systems: {
        back: "Back to Nexus",
        title: "SB2.02 // HUMAN BODY SYSTEMS",
        difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
        objective_title: "Active Mission Objective",
        monitor_title: "Body Systems Monitor",
        footer_left: "SB2.02_BODY_SYSTEMS // NODE: BASEL",
        check: "Verify",
        next: "Next System",
        correct: "Correct",
        incorrect: "Incorrect",
        stages: {
            digestive: "DIGESTIVE SYSTEM",
            circulatory: "CIRCULATORY SYSTEM",
            respiratory: "RESPIRATORY SYSTEM"
        },
        scenarios: {
            digestive: "Basel University Hospital Gastroenterology Department: You are shadowing Dr. Weber, a gastroenterologist at Basel University Hospital, as she explains the digestive system to medical students. The digestive system is a complex assembly of organs working together to break down food into nutrients your body can absorb and use for energy, growth, and cell repair. The journey begins in the mouth, where mechanical digestion (chewing) and chemical digestion (saliva enzymes) start breaking down food. Food then travels down the esophagus through peristaltic waves (muscle contractions) into the stomach, where powerful gastric acid (pH 1.5-3.5) and pepsin enzymes further break down proteins. The partially digested food (chyme) moves into the small intestine (6-7 meters long), where most nutrient absorption occurs through millions of tiny finger-like projections called villi. The liver produces bile to emulsify fats, while the pancreas secretes digestive enzymes and bicarbonate to neutralize stomach acid. Finally, the large intestine absorbs water and forms solid waste. Understanding this system is crucial for diagnosing conditions like Crohn's disease, ulcers, and malabsorption disorders that affect thousands of Basel residents. Your task is to identify the correct organ in the digestive pathway and understand each organ's specific function in this remarkable biological assembly line.",
            circulatory: "Basel Cardiology Center - Heart Function Analysis: You are working at the Basel Cardiology Center with Dr. Schneider, analyzing how the circulatory system delivers oxygen and nutrients to every cell in the human body while removing carbon dioxide and metabolic waste. The heart is a powerful muscular pump with four chambers: two atria (upper chambers that receive blood) and two ventricles (lower chambers that pump blood out). The right side pumps deoxygenated blood to the lungs for oxygenation, while the left side pumps oxygen-rich blood to the entire body through a network of blood vessels. Arteries carry blood away from the heart under high pressure (systolic pressure ~120 mmHg), with thick elastic walls to withstand this pressure. Veins return blood to the heart under low pressure, using one-way valves to prevent backflow. Capillaries are microscopic vessels where gas exchange occurs between blood and tissues. The average adult heart beats 60-100 times per minute, pumping about 5 liters of blood per minute at rest (cardiac output). This increases to 20-25 liters per minute during intense exercise. Understanding the circulatory system is essential for treating cardiovascular diseases, which are the leading cause of death in Switzerland. Your task is to identify the main components of the circulatory system and understand how blood flows through this vital transportation network.",
            respiratory: "Basel Pulmonology Institute - Respiratory Function Lab: You are assisting Dr. Keller at the Basel Pulmonology Institute, where researchers study how the respiratory system enables gas exchange - bringing oxygen into the body and removing carbon dioxide. Air enters through the nose or mouth, where it is filtered, warmed, and humidified. It passes through the pharynx (throat) and larynx (voice box, containing vocal cords) into the trachea (windpipe), a rigid tube reinforced with C-shaped cartilage rings to prevent collapse. The trachea branches into two bronchi (one for each lung), which further divide into smaller bronchioles, creating a tree-like structure called the bronchial tree. At the end of the smallest bronchioles are clusters of tiny air sacs called alveoli (approximately 300 million in adult lungs), where gas exchange occurs. The alveolar walls are extremely thin (0.5 micrometers) and surrounded by capillaries, allowing oxygen to diffuse into the blood while carbon dioxide diffuses out. The diaphragm, a dome-shaped muscle below the lungs, contracts to expand the chest cavity during inhalation, creating negative pressure that draws air in. During exhalation, the diaphragm relaxes and the elastic lungs recoil, pushing air out. A healthy adult breathes 12-20 times per minute at rest, exchanging about 500 mL of air per breath (tidal volume). Understanding respiratory function is critical for treating conditions like asthma, COPD, and pneumonia. Your task is to identify the organs in the respiratory pathway and understand the mechanism of breathing and gas exchange."
        }
    },
    sb2_01: {
        back: "Back to Nexus",
        title: "SB2.01 // MENDEL'S GARDEN",
        difficulty: {
            basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Genetic Cross",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "SB2.01_GENETICS_MONITOR",
        footer_left: "SB2.01_MENDELS_GARDEN // NODE: BASEL",
        stages: {
            monohybrid: "MONOHYBRID CROSS",
            probability: "PROBABILITY",
            dihybrid: "DIHYBRID CROSS"
        },
        labels: {
            parent: "Parent",
            offspring: "Offspring",
            punnett_square: "PUNNETT SQUARE",
            stats: "OFFSPRING STATISTICS",
            genotype_ratio: "Genotype Ratio",
            phenotype_ratio: "Phenotype Ratio",
            purple_flowers: "Purple Flowers",
            white_flowers: "White Flowers",
            genetics_basics: "GENETICS BASICS",
            genotype_phenotype: "GENOTYPE VS PHENOTYPE",
            dominance: "DOMINANCE RULES",
            mendels_laws: "MENDEL'S LAWS",
            instructions: "INSTRUCTIONS"
        },
        concepts: {
            allele: "Allele: A version of a gene",
            dominant: "R (Dominant): Purple flower",
            recessive: "r (Recessive): White flower",
            genotype: "Genotype: Genetic makeup (RR, Rr, rr)",
            phenotype: "Phenotype: Observable trait (Purple/White)",
            homozygous_dom: "RR → Purple (Homozygous Dominant)",
            heterozygous: "Rr → Purple (Heterozygous)",
            homozygous_rec: "rr → White (Homozygous Recessive)",
            law_segregation: "Law of Segregation: Each parent contributes one allele",
            law_assortment: "Law of Independent Assortment: Alleles separate independently"
        },
        mission: {
            title: "MISSION: MENDELIAN GENETICS",
            description: "Master Mendel's laws of inheritance. Predict offspring ratios using Punnett Squares."
        },
        prompts: {
            monohybrid_ratio: "Cross {p1} \\times {p2}. What is the phenotypic ratio of Purple to White?",
            monohybrid_percent: "Cross {p1} \\times {p2}. What percentage of offspring will be Purple?",
            prob_genotype: "Cross {p1} \\times {p2}. What is the probability of a {genotype} offspring?",
            ratio_target: "\\text{Ratio } P:W = ?",
            percent_target: "\\text{Purple Percentage}",
            prob_target: "P({genotype}) = ?",
            hint_square: "Check the Punnett Square.",
            hint_all_rr: "All offspring are Rr.",
            hint_count: "{count} out of 4 squares."
        }
    },
    sb2_02: {
        back: "Return to Nexus",
        title: "SB2.02 // HUMAN BODY SYSTEMS",
        difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
        check: "Verify",
        next: "Execute Next Sequence",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "SB2.02_BODY_SYSTEMS_MONITOR",
        footer_left: "SB2.02_HUMAN_BODY_SYSTEMS // NODE: BASEL",
        objective_title: "Active Mission Objective",
        stages: {
            digestive: "DIGESTIVE",
            circulatory: "CIRCULATORY",
            respiratory: "RESPIRATORY"
        },
        systems: {
            digestive: "Digestive System",
            circulatory: "Circulatory System",
            respiratory: "Respiratory System"
        },
        labels: {
            heart_rate: "Heart Rate",
            o2_sat: "O2 Saturation",
            enzyme: "Enzyme Activity",
            anatomy_score: "Anatomy Score",
            anatomy_display: "Anatomy Display",
            input_terminal: "Input Terminal"
        },
        prompts: {
            organ_function: "Which organ is responsible for {function}?",
            hint_organ: "The {name} performs this function",
            component_function: "Which component is responsible for {function}?",
            hint_component: "The {name} performs this function",
            structure_function: "Which structure is responsible for {function}?",
            hint_structure: "The {name} performs this function"
        },
        feedback: {
            correct: "Anatomy knowledge verified!",
            incorrect: "Review the body system structure."
        }
    },
    sb3_01: {
        back: "Return to Nexus",
        title: "SB3.01 // ECOSYSTEM DYNAMICS",
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
        monitor_title: "SB3.01_ECOSYSTEM_MONITOR",
        footer_left: "SB3.01_ECOSYSTEM_DYNAMICS // NODE: RHINE",
        objective_title: "Active Mission Objective",
        stages: {
            food_chains: "FOOD CHAINS",
            energy_flow: "ENERGY FLOW",
            cycles: "BIOGEOCHEMICAL CYCLES"
        },
        labels: {
            ecosystem_display: "Ecosystem Display",
            input_terminal: "Input Terminal",
            trophic_level: "Trophic Level",
            show_energy: "Show Energy Flow",
            ecology_score: "Ecology Score"
        },
        prompts: {
            food_chain: "In the Rhine ecosystem, {producer} is eaten by {consumer}. What comes next?",
            energy_transfer: "If {level} consumers have {energy} kJ of energy, how much reaches the next level?",
            cycle_process: "In the {cycle} cycle, what is produced by {process}?",
            hint_trophic: "Only 10% of energy transfers to the next trophic level",
            hint_10percent: "Use the 10% rule: multiply by 0.1",
            hint_cycle: "Think about the inputs and outputs of this process"
        },
        scenarios: {
            rhine_river: "Rhine River Ecosystem: The Rhine supports diverse aquatic life from algae to predatory birds. Food chains begin with phytoplankton and progress through zooplankton, fish, and apex predators.",
            energy_pyramid: "Energy Flow in Basel Wetlands: Basel's wetland reserves demonstrate energy pyramids. Only 10% of energy transfers between trophic levels, limiting food chain length.",
            carbon_cycle: "Carbon Cycle at Rhine Delta: Photosynthesis and respiration drive carbon cycling in Rhine ecosystems. Plants absorb CO₂, animals release it through respiration.",
            nitrogen_cycle: "Nitrogen Fixation in Basel Soil: Bacteria in Basel's agricultural soils convert atmospheric N₂ into usable NH₃ for plants through nitrogen fixation.",
            water_cycle: "Rhine Water Cycle: Evaporation from the Rhine, condensation in clouds, and precipitation complete the water cycle that sustains Basel's ecosystems."
        },
        feedback: {
            correct: "Ecosystem balance maintained!",
            incorrect: "Ecosystem disrupted. Review the relationships."
        }
    },
};
