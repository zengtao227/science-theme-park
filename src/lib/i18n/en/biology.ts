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
        footer_left: "GB1.01 // EVOLUTION LAB",
        scenarios: {
            galapagos_study: "Natural History Museum Basel - The Darwin Legacy: You are a curator at the Naturhistorisches Museum Basel, which houses one of the most significant collections of biological specimens in Switzerland. Your task is to analyze historical data from several islands, mirroring the observations Charles Darwin made on the Galapagos. By calculating the fitness of different bird populations based on survival rates during extreme environmental shifts, you help demonstrate the power of natural selection. In Basel, scientists use these museum records to understand how regional species, such as local beetles and birds, have evolved in response to urbanization over the last two centuries. This work is like uncovering the hidden gears of nature, seeing how small structural changes lead to massive survival advantages.",
            genetic_drift: "Biozentrum Basel - Population Dynamics: As a researcher at the University of Basel's Biozentrum, you are investigating the genetic makeup of isolated populations in the nearby Jura mountains. Genetic drift—the random change in allele frequencies—can lead to significant divergence in small groups over many generations. By modeling these processes, you help predict how endangered species in the Swiss borderlands might adapt to habitat fragmentation. Basel’s long history in genetic research, dating back to the 19th-century discovery of nucleic acids, provides a world-class environment for your study. It’s like watching a language evolve in a remote valley; over time, the 'accent' of the genome changes until a new species 'dialect' emerges.",
            fossil_record: "Upper Rhine Valley - Subtropical Past: You are a paleontologist excavating the banks of the Rhine near Basel, where you’ve discovered the remains of rhinoceroses and other animals that no longer inhabit Europe. These fossils are evidence of a very different climate that existed in Basel millions of years ago. By using isotopic techniques to establish the era of these specimens, you help the Museum of Natural History show that Basel’s current biodiversity is just a single snapshot in a vast, moving timeline. It’s like finding an ancient photograph of your city and realizing that what is now a temperate river valley was once a lush, subtropical savanna.",
            molecular_clock: "Friedrich Miescher Institute (FMI) - The Timing of Life: At the FMI in Basel, you use molecular clock techniques to estimate when different species shared a common ancestor. By analyzing the mutation rates in DNA sequences, you can trace the evolutionary history of Basel's local fauna across millions of years. This work honors the legacy of Friedrich Miescher, who discovered DNA in Basel, and keeps the city at the forefront of evolutionary genomics. It’s like using a slow-motion clock where every 'tick' is a mutation and every 'hour' is a million years of natural history."
        }
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
            calc_potential: "Given {ion} outside is {cout} and inside is {cin}, calculate equilibrium potential.",
            action_potential: "What is the primary ion responsible for depolarization during the rising phase?",
            synapse_mechanism: "Which ion influx triggers the release of neurotransmitters into the synaptic cleft?",
            hint_anatomy: "Look for the long fiber that carries impulses away from the cell body.",
            hint_sodium: "Sodium (Na⁺) rushes in during depolarization.",
            hint_calcium: "Calcium (Ca²⁺) entry triggers vesicle fusion.",
            hint_nernst: "Use the Nernst Equation: E = 61 log10(C_out/C_in) at 37°C."
        },
        scenarios: {
            basel_biomedicine: "University of Basel - Biozentrum: Research at the Biozentrum focuses on how synaptic connections are formed and maintained. You are participating in a study that identifies the structural components of the neuron—the axon, dendrites, and soma—responsible for relaying critical information. Understanding these processes is vital for treating neurodegenerative diseases and maintaining Basel's reputation for innovative life sciences research. It's like being a telecommunications engineer for the body's most complex network.",
            roche_neuroscience: "Roche Neuroscience - Targeted Therapies: You are a lead pharmacologist at Roche’s global R&D hub in Basel, working on a breakthrough treatment for neurodegenerative diseases. Your mission is to identify which parts of the neuron are most affected by a new drug candidate. Basel is the world's 'Neuro-Node,' and your work here could change the lives of millions suffering from Alzheimer's. This precision mapping is like being a cartographer for the brain, where every fiber represents a vital road in the human nervous system.",
            neural_plasticity: "University of Basel - Plasticity Lab: Studying how learning strengthens synapses (Long-Term Potentiation) helps in developing better educational tools. As a researcher in Basel, you analyze action potentials and ion concentrations to understand how the brain rewires itself. This work at the intersection of biology and psychology is a cornerstone of Basel's academic excellence. It's like watching a city's infrastructure expand and strengthen as more people use certain routes and services.",
            friedrich_miescher: "Friedrich Miescher Institute (FMI) - Molecular Circuits: FMI researchers in Basel investigate the molecular mechanisms that control nerve cell growth and the assembly of neural circuits. You are analyzing the ion influxes that trigger neurotransmitter release, a process fundamental to all thought and movement. Your work in Basel contributes to a global understanding of the basic 'building blocks' of consciousness. It's like deciphering the master blueprints for the most sophisticated computer ever created."
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
            roche_immunology: "Roche Immunology - Precision Antibodies: In the immunology labs at Roche Basel, you are designing a new generation of monoclonal antibodies. These 'smart missiles' of medicine are engineered to recognize specific structures on the surface of cancer cells with absolute precision. By understanding how the adaptive immune system uses variable regions to ensure specificity, you can create therapies that destroy tumors while leaving healthy tissue untouched. This work represents the cutting edge of the 'Basel Biotech' ecosystem. It’s like being a locksmith who must design a unique key for a lock that is found only on enemy territory.",
            basel_hospital_infectious: "University Hospital Basel - Pathogen Defense: At the Universitätsspital Basel, you are part of an infectious disease team that monitors how the innate immune system reacts to new pathogens. From skin breaches to macrophage activation, your analysis helps doctors develop faster treatment protocols for the city's residents. In a globalized world, Basel’s medical 'shield' is stronger because of this detailed cellular monitoring. It’s like being a sentry on a city wall, identifying threats long before they can breach the internal defenses.",
            vaccine_research: "Swiss Vaccine Institute - Memory Engineering: Based in the Basel research cluster, your work at the Vaccine Institute focuses on 'educating' the immune system. By creating memory cells that 'remember' the blueprints of viruses, you help ensure that the secondary immune response is fast and powerful. This research is vital for public health in Switzerland and beyond. It’s like training a specialized police force that can recognize a criminal immediately based on a single old photograph, preventing the crime before it even happens.",
            autoimmune_center: "Basel Autoimmune Research Center - Identity Loss: Research at this Basel center focuses on when the immune system loses its internal 'map' and begins attacking the body's own tissues. Your task is to understand the threshold potentials and activation signals that go wrong in conditions like Multiple Sclerosis. Solving this puzzle is a priority for Basel's life science community. It’s like a security system that has been misprogrammed and starts locking out the house's owner—restoring the correct identity recognition is the key to recovery."
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
            rhine_river: "The Rhine River serving as Basel's lifeblood is a complex aquatic ecosystem that demonstrates the intricate balance of food chains. At the base of this system are primary producers like phytoplankton and algae, which harness solar energy. These are consumed by primary consumers such as zooplankton and small aquatic invertebrates. As we move up the trophic levels, we encounter various fish species like the silver carp and the European eel. The 'Salmon Comeback' project in Basel highlights the importance of maintaining these links, as salmon act as vital indicators of ecosystem health. At the apex, predators like the Great Cormorant and the Grey Heron regulate the populations below them. Understanding these relationships is crucial for the conservation efforts led by the University of Basel and local environmental agencies, ensuring that if one link—such as the benthic invertebrates—is disrupted by pollution or invasive species like the Quagga mussel, the entire food web remains resilient through biological diversity.",
            energy_pyramid: "In the wetlands of the Petite Camargue Alsacienne, just across the border from Basel, the energy pyramid illustrates the fundamental law of thermodynamics in ecology. Based on the 10% rule, only about ten percent of the energy stored as biomass in one trophic level is passed on to the next. This dramatic energy loss at each step explains why the landscape is dominated by lush vegetation (producers) and high numbers of insects and small fish, while top predators like the Eurasian Lynx or large birds of prey remain relatively rare. This energy constraint limits the number of possible trophic levels to typically four or five. Students and researchers in Basel use these models to calculate the 'carrying capacity' of local nature reserves. By monitoring the biomass of primary producers, scientists at the Biozentrum can predict how many higher-level consumers the ecosystem can sustainably support, a vital metric for managing Basel's green belts and protecting endangered species from starvation due to habitat fragmentation.",
            carbon_cycle: "The global carbon cycle finds a local rhythm in the urban forests and parks of Basel, such as the Hardwald and the Lange Erlen. Through photosynthesis, Basel's vast canopy of beech and oak trees absorbs atmospheric carbon dioxide, converting it into organic carbon stored in wood and soil. This process, known as carbon sequestration, plays a critical role in Basel's climate strategy to reach net-zero emissions. Conversely, cellular respiration by animals, humans, and decomposers in the soil releases CO2 back into the atmosphere. The cycle is further influenced by the Rhine, which transports dissolved organic carbon from the Swiss Alps. Managing these 'carbon sinks' is a priority for the Basel-Stadt department of environment. By protecting old-growth trees and promoting sustainable urban forestry, the city maintains a natural balance that mitigates the urban heat island effect and promotes a stable climate for both human residents and the diverse wildlife that calls these forests home.",
            nitrogen_cycle: "Nitrogen cycling in the agricultural regions surrounding Basel, particularly in the Basel-Landschaft cantonal areas, is essential for high-yield food production and soil health. While nitrogen gas makes up 78% of the atmosphere, it is largely inaccessible to plants until it is 'fixed.' In nature, this occurs through lightning or, more significantly, through nitrogen-fixing bacteria living in the root nodules of legumes like clover and beans. These microorganisms convert N2 into ammonium and then into nitrates, which plants can absorb to build proteins and DNA. In modern Basel-area farming, this cycle is augmented by sustainable fertilization practices aimed at preventing nitrate runoff into the Rhine, which can cause eutrophication. Local agricultural schools teach the importance of crop rotation—planting nitrogen-fixing crops between grain harvests to naturally replenish the soil. This biological recycling system ensures that essential nutrients are continuously moved from the air to the soil and through the various organisms within the Basel ecosystem, supporting a robust agricultural economy.",
            water_cycle: "The Rhine River at Basel serves as a massive, visible segment of the global water cycle. Water primarily enters this local system as precipitation or snowmelt from the Swiss Alps, flowing through the city's iconic river bend. The sun's energy drives evaporation from the river's surface and transpiration from the dense foliage of the Jura mountains, returning moisture to the atmosphere where it condenses into clouds. The IWB (Industrielle Werke Basel) utilizes this cycle for the city's drinking water, sourcing it from the groundwater of the Lange Erlen, which is naturally replenished by the Rhine's flow. This process of filtration and infiltration demonstrates how the ecosystem purifies water as it moves through different stages of the cycle. Human activities in Basel, from industrial cooling to shipping, are carefully managed to respect the water cycle's integrity. Ensuring that the Rhine remains clean as it leaves Basel to travel toward the North Sea is a cross-border responsibility, reflecting the city's commitment to the International Commission for the Protection of the Rhine."
        },
        feedback: {
            correct: "Ecosystem balance maintained!",
            incorrect: "Ecosystem disrupted. Review the relationships."
        }
    },
};
