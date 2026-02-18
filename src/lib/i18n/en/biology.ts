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
            hint_halflife: "Remaining = (0.5)^(age/half-life)",
            fitness_calc: "Initial {init}, Survivors {surv}. Fitness w?",
            hardy_p: "Allele freq p={p}. Heterozygote frequency 2pq?",
            hardy_q: "Recessive phenotype q^2={q2}. Find allele freq q.",
            drift_time: "Pop size N={N}. Expected fixation time in generations ~ 4N?",
            mutation_div: "Divergence D={D}, Rate u={u}. Generations t = D/2u?",
            decay_age: "Remaining fraction {f}. Half-life {h}. Age?",
            common_ancestor: "Species A and B differ by {n} mutations. Rate {r}/yr. Time to ancestor?"
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
            hint_nernst: "Use the Nernst Equation: E = 61 log10(C_out/C_in) at 37°C.",
            func_struct: "Structure: {s}. Function?",
            nernst_k: "K+ out={o}, in={i}. E_K?",
            nernst_na: "Na+ out={o}, in={i}. E_Na?",
            goldman: "Pk={pk}, Pna={pna}. Vm?",
            phase_ion: "Phase: {p}. Permeability dominates for?",
            synapse_step: "Step {n}: {desc}. Next step?",
            drug_block: "Drug blocks {c}. Effect on AP?",
            nt_role_type: "Role: {effect}. Type of {name}?"
        },
        scenarios: {
            basel_biomedicine: "University of Basel - Biozentrum Neurobiology Department: At the Biozentrum, one of Europe's leading centers for molecular and cell biology, you work in Professor Silvia Arber's research group studying neural circuit assembly. The lab focuses on understanding how motor neurons in the spinal cord connect to specific muscle groups through precise axonal pathfinding. Using advanced imaging techniques and electrophysiology, you map the dendritic branching of pyramidal neurons and trace how action potentials propagate through myelinated axons at speeds up to 120 m/s. This research directly contributes to developing therapies for ALS (Amyotrophic Lateral Sclerosis) and spinal cord injuries. The Biozentrum's collaborative environment continues Basel's 150-year tradition in molecular life sciences—Friedrich Miescher first isolated nuclein (DNA) here in 1869. Understanding neuronal anatomy—from the protein synthesis machinery of the soma to the synaptic vesicles of the axon terminal—is essential for Basel's pharmaceutical industry and the University Hospital's neurology department.",
            roche_neuroscience: "Roche Pharma Research - Neurodegeneration & Rare Diseases Division: You are a senior neuroscientist at Roche's Basel headquarters, working on next-generation treatments for Alzheimer's and Parkinson's disease. Your team uses patch-clamp electrophysiology to measure how experimental compounds affect voltage-gated sodium and potassium channels in cultured hippocampal neurons. By analyzing the kinetics of action potential generation—depolarization (Na⁺ influx), repolarization (K⁺ efflux), and hyperpolarization—you identify drugs that can restore normal neuronal firing patterns in diseased brains. Basel's pharma cluster, including Roche and Novartis, invests over CHF 10 billion annually in R&D, with neuroscience as a strategic priority. Your work builds on decades of Basel research, from the discovery of benzodiazepines to modern biologics targeting amyloid-beta plaques. This precision neuropharmacology could help the 50 million people worldwide living with dementia.",
            neural_plasticity: "University of Basel - Interfaculty Research Platform Molecular & Cognitive Neuroscience: Working at the intersection of the Biozentrum and the Psychology Department, you study synaptic plasticity mechanisms underlying learning and memory. Your research focuses on Long-Term Potentiation (LTP) in hippocampal CA1 neurons, where high-frequency stimulation (100 Hz) strengthens synaptic connections through NMDA receptor activation and calcium-dependent signaling cascades. Using whole-cell patch-clamp recordings, you measure excitatory postsynaptic potentials (EPSPs) and track how repeated stimulation increases AMPA receptor density at the postsynaptic membrane. This work has direct applications for understanding age-related cognitive decline and developing cognitive enhancement strategies. Basel's unique interdisciplinary environment, combining molecular biology with cognitive neuroscience, makes it a European hub for translational brain research. The University Hospital's Memory Clinic works closely with your lab to translate findings into clinical interventions.",
            friedrich_miescher: "Friedrich Miescher Institute for Biomedical Research (FMI) - Neural Development & Epigenetics: At the FMI, a Novartis-funded research institute, you work to understand how neural circuits self-assemble during development. Your project investigates the role of calcium signaling in neurotransmitter release at the neuromuscular junction. Using fluorescent calcium indicators and high-speed imaging, you visualize how Ca²⁺ influx through voltage-gated calcium channels triggers synaptic vesicle fusion, releasing acetylcholine into the synaptic cleft (20-40 nm wide). You measure quantal release events and calculate release probability under different stimulation protocols. This fundamental research honors Friedrich Miescher's legacy—he discovered DNA in Basel in 1869 while studying white blood cell nuclei from surgical bandages at the University Hospital. Today, the FMI continues this tradition of groundbreaking molecular biology, with insights that inform drug development at Roche and Novartis. Understanding synaptic transmission at the molecular level is crucial for treating myasthenia gravis, Lambert-Eaton syndrome, and other neuromuscular disorders."
        },
        feedback: {
            correct: "Action potential propagation successfully verified!",
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
            guanine: "Guanine",
            analysis: "Base Pair Analysis"
        },
        results: {
            valid: "Bonding Stable",
            invalid: "Helix Instability",
            valid_desc: "Nucleotide pairs verified.",
            invalid_desc: "Mismatched sequencing detected.",
            next: "Forge Next Pair"
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
        results: {
            valid: "Structure Verified",
            invalid: "Analysis Error",
            valid_desc: "Organelle matched database. Proceeding.",
            invalid_desc: "Mismatch detected in morphological analysis.",
            next: "Next Specimen",
            analysis: "Microscopic Analysis"
        },
        prompts: {
            id_prompt: "Identify the organelle: {organelle}",
            id_target: "Highlighted: ?",
            fn_prompt: "Which organelle is responsible for: {func}?",
            fn_target: "Function: {func}",
            hint_name: "It is the {name}",
            hint_start: "The answer starts with {char}",
            hint_func: "This organelle performs: {func}",
            hint_range: "The value is between {min} and {max}",
            org_count_mitochondria: "How many mitochondria are typically in a human liver cell?",
            org_count_ribosomes: "Approximately how many ribosomes are in a typical eukaryotic cell?",
            org_nucleus_diameter: "What is the typical diameter of a nucleus in micrometers?",
            org_cell_diameter: "What is the typical diameter of an animal cell in micrometers?",
            org_mitochondria_length: "What is the typical length of a mitochondrion in micrometers?",
            org_golgi_cisternae: "How many cisternae (flattened sacs) are typically in a Golgi apparatus?",
            org_lysosome_count: "Approximately how many lysosomes are in a typical animal cell?",
            org_er_percentage: "What percentage of the cell volume does the endoplasmic reticulum occupy?",
            org_nuclear_pores: "How many nuclear pores are typically in a nuclear envelope?",
            org_peroxisome_count: "Approximately how many peroxisomes are in a typical liver cell?",
            org_atp_per_glucose: "How many ATP molecules are produced from one glucose molecule in aerobic respiration?",
            org_protein_synthesis_rate: "What is the typical rate of protein synthesis in amino acids per second?",
            org_membrane_thickness: "What is the thickness of a cell membrane in nanometers?",
            org_microtubule_diameter: "What is the diameter of a microtubule in nanometers?",
            org_ribosome_diameter: "What is the diameter of a ribosome in nanometers?",
            org_cristae_surface_area: "What is the approximate surface area of mitochondrial cristae in square micrometers?",
            org_nuclear_dna_length: "If all DNA in a human cell nucleus were stretched out, how long would it be in meters?",
            org_golgi_transit_time: "How long does it take for a protein to transit through the Golgi apparatus in minutes?",
            org_lysosome_ph: "What is the typical pH inside a lysosome?",
            org_mitochondrial_dna: "How many genes are encoded in mitochondrial DNA?"
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
            },
            lysosome: {
                name: "Lysosome",
                func: "Cellular Digestion",
                details: "Contains digestive enzymes that break down waste materials and cellular debris."
            },
            peroxisome: {
                name: "Peroxisome",
                func: "Lipid Metabolism",
                details: "Breaks down fatty acids and detoxifies harmful substances."
            },
            centrosome: {
                name: "Centrosome",
                func: "Microtubule Organization",
                details: "Organizes microtubules and regulates cell division."
            },
            vacuole: {
                name: "Vacuole",
                func: "Storage and Turgor",
                details: "Stores water, nutrients, and waste products. Maintains cell turgor pressure."
            },
            cytoskeleton: {
                name: "Cytoskeleton",
                func: "Structural Support",
                details: "Network of protein filaments providing cell shape and enabling movement."
            },
            nucleolus: {
                name: "Nucleolus",
                func: "Ribosome Assembly",
                details: "Site of ribosomal RNA synthesis and ribosome assembly within the nucleus."
            },
            nuclear_pore: {
                name: "Nuclear Pore",
                func: "Nuclear Transport",
                details: "Channels in the nuclear envelope allowing selective transport of molecules."
            },
            smooth_er: {
                name: "Smooth ER",
                func: "Lipid Synthesis",
                details: "Synthesizes lipids and steroids, detoxifies drugs and poisons."
            },
            rough_er: {
                name: "Rough ER",
                func: "Protein Synthesis",
                details: "Studded with ribosomes, synthesizes proteins for secretion."
            },
            centriole: {
                name: "Centriole",
                func: "Spindle Formation",
                details: "Pair of cylindrical structures that form the mitotic spindle during cell division."
            },
            microtubule: {
                name: "Microtubule",
                func: "Intracellular Transport",
                details: "Hollow tubes that serve as tracks for motor proteins transporting cargo."
            },
            microfilament: {
                name: "Microfilament",
                func: "Cell Motility",
                details: "Thin actin filaments involved in cell movement and shape changes."
            },
            intermediate_filament: {
                name: "Intermediate Filament",
                func: "Mechanical Strength",
                details: "Rope-like fibers providing mechanical stability to cells."
            },
            nuclear_envelope: {
                name: "Nuclear Envelope",
                func: "Nuclear Compartmentalization",
                details: "Double membrane separating the nucleus from the cytoplasm."
            },
            cristae: {
                name: "Cristae",
                func: "ATP Synthesis Surface",
                details: "Folded inner membrane of mitochondria where ATP synthesis occurs."
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
            atp: "ATP Energy",
            analysis: "Biological Objective"
        },
        results: {
            valid: "Homeostasis Stable",
            invalid: "Metabolic Crisis",
            valid_desc: "Cellular equilibrium achieved.",
            invalid_desc: "Cellular stress detected. Correct metabolic flux.",
            next: "Next Equilibrium"
        },
        prompts: {
            osmosis_prompt: "The cell is in a {status} environment ({desc}). What happens to the water?",
            respiration_prompt: "Complete the respiration reactant: C₆H₁₂O₆ + 6{reactant} → ...",
            product_prompt: "What is the primary energy product of respiration?",
            homeostasis_target: "Balance the environment to achieve Isotonic state.",
            hint_hyper: "High salt outside! Water leaves the cell.",
            hint_hypo: "Low salt outside! Water rushes in.",
            hint_oxy: "We breathe this in to burn glucose.",
            hint_iso: "No net movement.",
            hint_atp: "Primary energy currency of the cell.",
            hint_homeostasis: "Set value to zero for stability.",
            resp_atp_product: "What is the primary energy product of cellular respiration?",
            resp_glucose_input: "What is the primary fuel molecule for cellular respiration?",
            resp_oxygen_input: "What gas is required for aerobic respiration?",
            resp_co2_product: "What gas is produced as a waste product?",
            resp_water_product: "What molecule is produced along with CO2?",
            resp_atp_count: "How many ATP molecules are produced from one glucose?",
            resp_glycolysis_atp: "How many net ATP are produced in glycolysis?",
            resp_krebs_atp: "How many ATP are produced in the Krebs cycle?",
            resp_etc_atp: "How many ATP are produced in the electron transport chain?",
            resp_nadh_count: "How many NADH molecules are produced total?",
            resp_nadh_atp: "How many ATP are produced per NADH?",
            resp_fadh2_atp: "How many ATP are produced per FADH2?",
            resp_glycolysis_location: "Where does glycolysis occur?",
            resp_krebs_location: "Where does the Krebs cycle occur?",
            resp_etc_location: "Where does the electron transport chain occur?",
            resp_proton_gradient: "What is the mechanism of ATP synthesis called?",
            resp_atp_synthase: "What enzyme produces ATP?",
            resp_final_acceptor: "What is the final electron acceptor?",
            resp_anaerobic_atp: "How many ATP are produced without oxygen?",
            resp_fermentation_product: "What is produced during muscle fermentation?",
            home_body_temp: "What is normal human body temperature in Celsius?",
            home_blood_ph: "What is normal blood pH?",
            home_blood_glucose: "What is normal fasting blood glucose in mg/dL?",
            home_heart_rate: "What is normal resting heart rate in bpm?",
            home_blood_pressure: "What is normal systolic blood pressure in mmHg?",
            home_insulin_effect: "Does insulin increase or decrease blood glucose?",
            home_glucagon_effect: "Does glucagon increase or decrease blood glucose?",
            home_sweat_response: "What is the function of sweating?",
            home_shiver_response: "What is the function of shivering?",
            home_kidney_function: "What is the primary function of kidneys?",
            home_negative_feedback: "What type of feedback maintains homeostasis?",
            home_set_point: "What is the body temperature set point?",
            home_receptor_type: "What receptors detect temperature changes?",
            home_effector_organ: "What organ responds to temperature changes?",
            home_control_center: "What brain region controls body temperature?",
            home_adh_function: "What does ADH regulate?",
            home_aldosterone_function: "What does aldosterone regulate?",
            home_parathyroid_function: "What does parathyroid hormone regulate?",
            home_thyroid_function: "What does thyroid hormone regulate?",
            home_cortisol_function: "What does cortisol regulate?",
            hint_atp_product: "The universal energy currency",
            hint_glucose_input: "C6H12O6",
            hint_oxygen_input: "O2 from breathing",
            hint_co2_product: "Exhaled gas",
            hint_water_product: "H2O",
            hint_atp_count: "About 36-38 ATP total",
            hint_glycolysis_atp: "Net gain of 2 ATP",
            hint_krebs_atp: "2 ATP per glucose",
            hint_etc_atp: "Most ATP produced here",
            hint_nadh_count: "10 NADH total",
            hint_nadh_atp: "About 3 ATP per NADH",
            hint_fadh2_atp: "About 2 ATP per FADH2",
            hint_glycolysis_location: "In the cytoplasm",
            hint_krebs_location: "In mitochondrial matrix",
            hint_etc_location: "Inner mitochondrial membrane",
            hint_proton_gradient: "Chemiosmosis",
            hint_atp_synthase: "ATP synthase enzyme",
            hint_final_acceptor: "Oxygen (O2)",
            hint_anaerobic_atp: "Only 2 ATP from glycolysis",
            hint_fermentation_product: "Lactic acid/lactate",
            hint_body_temp: "Around 37°C",
            hint_blood_ph: "Slightly alkaline, 7.35-7.45",
            hint_blood_glucose: "70-100 mg/dL",
            hint_heart_rate: "60-100 bpm",
            hint_blood_pressure: "120/80 mmHg",
            hint_insulin_effect: "Lowers glucose",
            hint_glucagon_effect: "Raises glucose",
            hint_sweat_response: "Evaporative cooling",
            hint_shiver_response: "Heat generation",
            hint_kidney_function: "Filtration and excretion",
            hint_negative_feedback: "Negative feedback loops",
            hint_set_point: "37°C",
            hint_receptor_type: "Thermoreceptors",
            hint_effector_organ: "Muscles and skin",
            hint_control_center: "Hypothalamus",
            hint_adh_function: "Water reabsorption",
            hint_aldosterone_function: "Sodium retention",
            hint_parathyroid_function: "Calcium regulation",
            hint_thyroid_function: "Metabolic rate",
            hint_cortisol_function: "Stress response"
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
        results: {
            valid: "Reaction Balanced",
            invalid: "Reaction Error",
            valid_desc: "Photosynthesis equation verified.",
            invalid_desc: "Stoichiometry error. Check atomic balance.",
            next: "Next Challenge"
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
        footer_left: "SB1.03_CELL_DIVISION // NODE: BASEL",
        objective_title: "Active Mission Objective",
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
        },
        labels: {
            analysis: "Cell Division Analysis",
            phase_analysis: "Phase Analysis",
            chromosome_count: "Chromosome Count",
            hint: "Division Hint",
            visualization: "Cell Division Visualization",
            loading: "Loading Cell Data..."
        },
        scenarios: {
            mitosis: "University Hospital Basel - Cancer Research Division: You are working at the Basel University Hospital's oncology research lab, where understanding mitosis is crucial for cancer treatment. Mitosis is the process by which a single cell divides to produce two identical daughter cells, each with the same number of chromosomes as the parent cell (46 in humans). This process ensures genetic continuity and is essential for growth, tissue repair, and asexual reproduction. The process consists of several phases: Prophase (chromatin condenses into visible chromosomes, each consisting of two sister chromatids joined at the centromere), Metaphase (chromosomes align at the cell's equator), Anaphase (sister chromatids separate and move to opposite poles), and Telophase (nuclear envelopes reform around each set of chromosomes). Your task is to track the number of chromatids or chromosomes at each phase. Understanding mitosis is fundamental to Basel's cutting-edge cancer research, as cancer cells often have abnormal mitotic processes. This knowledge helps researchers at Roche and the University Hospital develop targeted therapies that disrupt cancer cell division while preserving normal cells.",
            meiosis_i: "Friedrich Miescher Institute - Reproductive Biology Lab: At the FMI in Basel, you are studying meiosis, the specialized cell division that produces gametes (sex cells) with half the number of chromosomes. Meiosis I is the first division, where homologous chromosome pairs separate, reducing the chromosome number from diploid (2n = 46) to haploid (n = 23). This process is unique because of crossing over during Prophase I, where homologous chromosomes exchange genetic material, creating genetic diversity. The phases include: Prophase I (homologous chromosomes pair up and exchange segments), Metaphase I (paired chromosomes align at the cell equator), Anaphase I (homologous chromosomes separate and move to opposite poles), and Telophase I (two haploid cells form, each with 23 chromosomes, but each chromosome still consists of two sister chromatids). Your task is to count chromosomes or chromosome pairs at each phase. Understanding meiosis is essential for Basel's reproductive medicine and genetic counseling services, helping families understand inheritance patterns and genetic disorders.",
            meiosis_ii: "Basel Genetics Counseling Center - Heredity Analysis: You are working at Basel's Genetics Counseling Center, where understanding Meiosis II is crucial for explaining inheritance to families. Meiosis II is similar to mitosis but starts with haploid cells. It separates sister chromatids to produce four haploid gametes, each with 23 single chromosomes. The phases include: Prophase II (chromosomes condense again), Metaphase II (chromosomes align at the equator), Anaphase II (sister chromatids finally separate), and Telophase II (four haploid cells form, each with 23 single chromosomes). This process explains why siblings can look different despite having the same parents - each gamete carries a unique combination of genetic material due to crossing over in Meiosis I and independent assortment. Your task is to track the chromosome count through each phase. This knowledge is vital for Basel's genetic counseling services, helping families understand conditions like Down syndrome (trisomy 21) that result from errors in meiosis."
        },
        prompts: {
            mitosis_count: "During {phase} of mitosis, how many chromatids are present?",
            meiosis_i_count: "During {phase} of Meiosis I, how many chromosomes or pairs are present?",
            meiosis_ii_count: "During {phase} of Meiosis II, how many chromosomes are present?",
            hint_mitosis: "In mitosis, sister chromatids separate during Anaphase, doubling the count temporarily",
            hint_meiosis_i: "Meiosis I separates homologous pairs, reducing from 46 to 23 chromosomes per cell",
            hint_meiosis_ii: "Meiosis II separates sister chromatids, similar to mitosis but starting with 23"
        },
        results: {
            valid: "Division Verified",
            invalid: "Chromosome Miscount",
            valid_desc: "Cell division phase correctly analyzed.",
            invalid_desc: "Recount the chromosomes at this phase.",
            next: "Next Phase"
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
        ready: "Ready",
        stages: {
            tissues: "TISSUE TYPES",
            organs: "ORGAN COMPOSITION",
            systems: "ORGAN SYSTEMS"
        },
        scenarios: {
            tissues: "University Hospital Basel - Institute of Pathology: You are a medical student at the University Hospital Basel (Universitätsspital Basel), one of Switzerland's leading medical centers, learning tissue identification under the guidance of Dr. Müller from the Institute of Pathology. Using state-of-the-art Zeiss microscopes in the Department of Biomedicine, you examine histological samples from different anatomical regions. Each of the four primary tissue types has distinct structural and functional characteristics: Epithelial tissue (epithelium) forms protective barriers and secretory surfaces - simple squamous epithelium lines blood vessels, stratified squamous epithelium protects the skin, and columnar epithelium with microvilli absorbs nutrients in the intestinal tract. Connective tissue provides mechanical support and metabolic functions - dense regular connective tissue forms tendons, hyaline cartilage cushions joints, compact bone provides skeletal structure, and adipose tissue stores energy. Muscle tissue generates contractile force - cardiac muscle (myocardium) pumps blood with involuntary rhythmic contractions, skeletal muscle enables voluntary movement via neuromuscular junctions, and smooth muscle regulates organ function in the digestive and vascular systems. Nervous tissue processes and transmits electrochemical signals - neurons conduct action potentials, while glial cells (astrocytes, oligodendrocytes, microglia) provide support and insulation. Your task is to identify the primary function of each tissue type based on its microscopic architecture, cellular composition, and anatomical location. This fundamental skill is essential for clinical pathology at Basel's renowned medical institutions, as abnormal tissue histology often indicates disease processes. Understanding tissue function is the foundation for comprehending organ physiology.",
            organs: "Roche Pharmaceutical Research - Organ Systems Biology Division: You are working at Roche's global headquarters in Basel, specifically in the Organ Systems Biology Division where scientists create detailed computational and physical models of human organs for drug discovery and preclinical testing. Basel, as the world's leading pharmaceutical hub, hosts cutting-edge research at Roche, Novartis, and the Biozentrum. Each organ in the human body represents a complex integration of multiple tissue types working in coordinated harmony. The heart (cor) contains four tissue types: cardiac muscle tissue (myocardium with intercalated discs for synchronized contraction), epithelial tissue (endocardium lining chambers and endothelium lining vessels), connective tissue (fibrous cardiac skeleton providing structural framework and valve support), and nervous tissue (autonomic innervation from the cardiac plexus controlling heart rate and contractility). The stomach (gaster) similarly integrates: epithelial tissue (gastric mucosa with parietal cells secreting HCl and chief cells secreting pepsinogen), smooth muscle tissue (muscularis externa with circular and longitudinal layers for peristalsis), connective tissue (submucosa providing vascular and neural support), and nervous tissue (myenteric plexus coordinating digestive motility). The liver (hepar) contains: epithelial tissue (hepatocytes arranged in lobules performing metabolic functions), connective tissue (Glisson's capsule and portal triads), and specialized endothelial tissue (sinusoidal capillaries for blood filtration). Your task is to quantify the tissue type composition of each organ. This information is critical for understanding how pharmaceutical compounds affect different cellular populations within an organ - a drug targeting smooth muscle may also interact with epithelial or neural components in the same organ. Accurate multi-tissue organ models help Roche and other Basel pharmaceutical companies develop safer, more effective medications by predicting potential side effects and off-target interactions before human clinical trials. This work directly contributes to the development of life-saving therapeutics used in University Hospital Basel and medical centers worldwide.",
            systems: "University of Basel Medical Faculty - Department of Anatomy: You are studying human anatomy at the University of Basel's Medical Faculty, one of Europe's oldest and most prestigious medical schools (founded 1460), learning how the human body is organized in a hierarchical structural framework. This biological hierarchy of organization follows a logical progression from molecular to organismal complexity: Cells (the fundamental units of life, such as a single cardiomyocyte with sarcomeres for contraction) → Tissues (populations of similar cells with shared function and extracellular matrix, such as cardiac muscle tissue) → Organs (integrated structures composed of multiple tissue types with specific physiological roles, such as the heart with its four chambers) → Organ Systems (coordinated groups of organs performing related functions, such as the cardiovascular system with heart, arteries, veins, and capillaries) → Organism (the complete human body as an integrated whole). For example, a single cardiac muscle cell (cardiomyocyte) with its contractile proteins joins with millions of other cardiomyocytes through intercalated discs to form cardiac muscle tissue. This muscle tissue combines with endocardial epithelium (lining chambers), fibrous connective tissue (cardiac skeleton and valves), and autonomic nervous tissue (cardiac plexus for rate control) to form the heart organ. The heart then works in coordination with blood vessels (elastic arteries like the aorta, muscular arteries for distribution, capillaries for exchange, and veins for return) to form the cardiovascular system, which transports oxygen, nutrients, hormones, and immune cells throughout the entire organism while removing metabolic waste products. Understanding this hierarchical organization is fundamental for clinical medicine and research at Basel's medical institutions - a molecular defect (such as a mutation in the gene encoding cardiac troponin) can cascade through cellular dysfunction, tissue pathology, organ failure, and systemic disease to affect the entire organism. Your task is to identify the correct level in this biological hierarchy and understand the composition of major organ systems. This knowledge is essential for medical practice at University Hospital Basel and for biomedical research at the Biozentrum and Friedrich Miescher Institute."
        },
        labels: {
            analysis: "Tissue Analysis",
            terminal: "Input Terminal",
            hint: "Pathology Hint",
            tissue_type: "Tissue Type",
            organ_structure: "Organ Structure",
            system_hierarchy: "System Hierarchy"
        },
        anatomy: {
            tissues: {
                epithelial: {
                    name: "Epithelial Tissue",
                    function: "Protection, secretion, absorption",
                    subtypes: "Squamous, cuboidal, columnar; simple or stratified",
                    location: "Skin epidermis, intestinal lining, glandular tissue"
                },
                connective: {
                    name: "Connective Tissue",
                    function: "Structural support, energy storage, immune defense",
                    subtypes: "Loose, dense, cartilage, bone, blood, adipose",
                    location: "Tendons, ligaments, bone matrix, blood vessels"
                },
                muscle: {
                    name: "Muscle Tissue",
                    function: "Contraction and force generation",
                    subtypes: "Skeletal (voluntary), cardiac (involuntary), smooth (involuntary)",
                    location: "Skeletal muscles, heart myocardium, organ walls"
                },
                nervous: {
                    name: "Nervous Tissue",
                    function: "Signal transmission and information processing",
                    subtypes: "Neurons (conducting), glial cells (supporting)",
                    location: "Brain, spinal cord, peripheral nerves"
                }
            },
            organs: {
                heart: "Heart (Cor): 4 tissue types - cardiac muscle, endothelium, connective, nervous",
                stomach: "Stomach (Gaster): 4 tissue types - epithelial mucosa, smooth muscle, connective, nervous",
                liver: "Liver (Hepar): 3 tissue types - hepatocytes, connective, endothelial",
                kidney: "Kidney (Ren): 4 tissue types - epithelial tubules, connective, vascular, nervous"
            },
            hierarchy: {
                cell: "Cell - fundamental unit of life",
                tissue: "Tissue - group of similar cells",
                organ: "Organ - multiple tissues integrated",
                system: "Organ System - coordinated organs",
                organism: "Organism - complete individual"
            }
        },
        results: {
            valid: "Biological Verification Complete",
            invalid: "Diagnostic Error",
            valid_desc: "The identified biological structure aligns with our database.",
            invalid_desc: "Incorrect identification. Please review the tissue morphology and functions.",
            next: "Analyze Next Stage"
        },
        prompts: {
            epithelial_func: "Epithelial tissue covers body surfaces. What is its primary function?",
            connective_func: "Connective tissue provides structural support. Name its function:",
            muscle_func: "Muscle tissue enables body movement. What is its function?",
            nervous_func: "Nervous tissue transmits electrical signals. What is its function?",
            absorb_func: "Epithelial tissue in intestines absorbs nutrients. Function?",
            organ_count: "The {organ} contains muscle, epithelial, connective, and nervous tissue. Count:",
            organ_count_simple: "The {organ} contains {list}. Count:",
            hierarchy: "Complete: Cell \\\\to Tissue \\\\to Organ \\\\to ?",
            system_count: "The {system} has {n} major organs. Count:",
            nervous_divisions: "The nervous system has 2 major divisions. Count:",
            hint_epithelial: "Covers and protects surfaces",
            hint_connective: "Provides framework",
            hint_muscle: "Contracts to move",
            hint_nervous: "Sends electrical signals",
            hint_organs: "All organs have multiple tissues",
            hint_systems: "Groups of organs",
            location: "Location: {loc}",
            function_label: "Function",
            next_level: "Next level"
        },
        feedback: {
            correct: "Tissue identification verified! Proceeding to next specimen.",
            incorrect: "Tissue misidentification. Review histological features."
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
        scenarios: {
            digestive: "Basel University Hospital Gastroenterology Department: You are shadowing Dr. Weber, a gastroenterologist at Basel University Hospital, as she explains the digestive system to medical students. The digestive system is a complex assembly of organs working together to break down food into nutrients your body can absorb and use for energy, growth, and cell repair. The journey begins in the mouth, where mechanical digestion (chewing) and chemical digestion (saliva enzymes) start breaking down food. Food then travels down the esophagus through peristaltic waves (muscle contractions) into the stomach, where powerful gastric acid (pH 1.5-3.5) and pepsin enzymes further break down proteins. The partially digested food (chyme) moves into the small intestine (6-7 meters long), where most nutrient absorption occurs through millions of tiny finger-like projections called villi. The liver produces bile to emulsify fats, while the pancreas secretes digestive enzymes and bicarbonate to neutralize stomach acid. Finally, the large intestine absorbs water and forms solid waste. Understanding this system is crucial for diagnosing conditions like Crohn's disease, ulcers, and malabsorption disorders that affect thousands of Basel residents. Your task is to identify the correct organ in the digestive pathway and understand each organ's specific function in this remarkable biological assembly line.",
            circulatory: "Basel Cardiology Center - Heart Function Analysis: You are working at the Basel Cardiology Center with Dr. Schneider, analyzing how the circulatory system delivers oxygen and nutrients to every cell in the human body while removing carbon dioxide and metabolic waste. The heart is a powerful muscular pump with four chambers: two atria (upper chambers that receive blood) and two ventricles (lower chambers that pump blood out). The right side pumps deoxygenated blood to the lungs for oxygenation, while the left side pumps oxygen-rich blood to the entire body through a network of blood vessels. Arteries carry blood away from the heart under high pressure (systolic pressure ~120 mmHg), with thick elastic walls to withstand this pressure. Veins return blood to the heart under low pressure, using one-way valves to prevent backflow. Capillaries are microscopic vessels where gas exchange occurs between blood and tissues. The average adult heart beats 60-100 times per minute, pumping about 5 liters of blood per minute at rest (cardiac output). This increases to 20-25 liters per minute during intense exercise. Understanding the circulatory system is essential for treating cardiovascular diseases, which are the leading cause of death in Switzerland. Your task is to identify the main components of the circulatory system and understand how blood flows through this vital transportation network.",
            respiratory: "Basel Pulmonology Institute - Respiratory Function Lab: You are assisting Dr. Keller at the Basel Pulmonology Institute, where researchers study how the respiratory system enables gas exchange - bringing oxygen into the body and removing carbon dioxide. Air enters through the nose or mouth, where it is filtered, warmed, and humidified. It passes through the pharynx (throat) and larynx (voice box, containing vocal cords) into the trachea (windpipe), a rigid tube reinforced with C-shaped cartilage rings to prevent collapse. The trachea branches into two bronchi (one for each lung), which further divide into smaller bronchioles, creating a tree-like structure called the bronchial tree. At the end of the smallest bronchioles are clusters of tiny air sacs called alveoli (approximately 300 million in adult lungs), where gas exchange occurs. The alveolar walls are extremely thin (0.5 micrometers) and surrounded by capillaries, allowing oxygen to diffuse into the blood while carbon dioxide diffuses out. The diaphragm, a dome-shaped muscle below the lungs, contracts to expand the chest cavity during inhalation, creating negative pressure that draws air in. During exhalation, the diaphragm relaxes and the elastic lungs recoil, pushing air out. A healthy adult breathes 12-20 times per minute at rest, exchanging about 500 mL of air per breath (tidal volume). Understanding respiratory function is critical for treating conditions like asthma, COPD, and pneumonia. Your task is to identify the organs in the respiratory pathway and understand the mechanism of breathing and gas exchange."
        },
        results: {
            valid: "Biological Pathway Verified",
            invalid: "Physiological Error",
            valid_desc: "The organ function and sequence match the human anatomy model.",
            invalid_desc: "Mismatch detected. Verify organ function and location.",
            next: "Next System Module"
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
            input_terminal: "Input Terminal",
            analysis: "System Analysis",
            hint: "Anatomy Hint",
            stomach: "STOMACH",
            liver: "LIVER",
            intestines: "INTESTINES",
            heart: "HEART",
            arteries: "ARTERIES",
            veins: "VEINS",
            lungs: "LUNGS",
            trachea: "TRACHEA"
        },
        prompts: {
            // DIGESTIVE STAGE - BASIC (5 questions)
            digestive_b1: "Food travels: Mouth → Esophagus → ? → Intestines",
            digestive_b2: "The digestive system breaks down food. What is its main function?",
            digestive_b3: "The small intestine absorbs nutrients. What is its function?",
            digestive_b4: "The liver produces bile for fat digestion. What is its function?",
            digestive_b5: "The digestive system has 7 major organs. Count them:",

            // DIGESTIVE STAGE - CORE (5 questions)
            digestive_c1: "Which organ produces digestive enzymes and insulin?",
            digestive_c2: "The stomach uses hydrochloric acid (pH 1.5-3.5). What is its function?",
            digestive_c3: "Villi in the small intestine increase surface area. Why is this important?",
            digestive_c4: "The large intestine absorbs water. What happens if this fails?",
            digestive_c5: "Peristalsis moves food through the digestive tract. What is this process?",

            // DIGESTIVE STAGE - ADVANCED (5 questions)
            digestive_a1: "The pancreas secretes bicarbonate to neutralize stomach acid. What is the pH change?",
            digestive_a2: "Bile emulsifies fats into smaller droplets. Why is this necessary for digestion?",
            digestive_a3: "The small intestine is 6-7 meters long. How does length affect absorption efficiency?",
            digestive_a4: "Gastric acid kills bacteria in food. What happens if acid production is too low?",
            digestive_a5: "The liver processes nutrients from the small intestine. What is this process called?",

            // DIGESTIVE STAGE - ELITE (5 questions)
            digestive_e1: "Crohn's disease causes inflammation in the digestive tract. Which organs are most affected?",
            digestive_e2: "Lactose intolerance occurs when the small intestine lacks an enzyme. Which enzyme?",
            digestive_e3: "The enteric nervous system controls digestion independently. How many neurons does it contain?",
            digestive_e4: "Celiac disease damages villi in the small intestine. What is the consequence?",
            digestive_e5: "The digestive system uses mechanical and chemical digestion. Compare their roles.",

            // CIRCULATORY STAGE - BASIC (5 questions)
            circulatory_b1: "The heart pumps blood throughout the body. What is its function?",
            circulatory_b2: "Arteries carry blood away from the heart. What do veins do?",
            circulatory_b3: "The circulatory system has 3 main components. Count them:",
            circulatory_b4: "Blood carries oxygen to cells. What does it carry away?",
            circulatory_b5: "The heart has 4 chambers. Count them:",

            // CIRCULATORY STAGE - CORE (5 questions)
            circulatory_c1: "The right side of the heart pumps blood to the lungs. What is this circulation called?",
            circulatory_c2: "The left ventricle has thicker walls than the right. Why?",
            circulatory_c3: "Capillaries are microscopic blood vessels. What is their function?",
            circulatory_c4: "Blood pressure is measured as systolic/diastolic. What is normal blood pressure?",
            circulatory_c5: "The heart beats 60-100 times per minute at rest. What is this called?",

            // CIRCULATORY STAGE - ADVANCED (5 questions)
            circulatory_a1: "Cardiac output is heart rate × stroke volume. Calculate cardiac output at rest:",
            circulatory_a2: "Arteries have thick elastic walls. How does this help withstand pressure?",
            circulatory_a3: "Veins have one-way valves. What happens if these valves fail?",
            circulatory_a4: "Red blood cells carry oxygen using hemoglobin. How many oxygen molecules per hemoglobin?",
            circulatory_a5: "The heart's electrical system controls rhythm. What is the pacemaker called?",

            // CIRCULATORY STAGE - ELITE (5 questions)
            circulatory_e1: "Atherosclerosis narrows arteries with plaque. What are the consequences?",
            circulatory_e2: "The Frank-Starling mechanism adjusts cardiac output. How does it work?",
            circulatory_e3: "Blood pressure regulation involves multiple systems. Name three mechanisms:",
            circulatory_e4: "Heart failure reduces cardiac output. What compensatory mechanisms occur?",
            circulatory_e5: "The circulatory system delivers 5 L/min at rest, 25 L/min during exercise. Calculate the increase:",

            // RESPIRATORY STAGE - BASIC (5 questions)
            respiratory_b1: "Gas exchange occurs in tiny air sacs. What are they called?",
            respiratory_b2: "The respiratory system exchanges gases. What gas enters the blood?",
            respiratory_b3: "The respiratory system has 5 major organs. Count them:",
            respiratory_b4: "The diaphragm contracts to expand the lungs. What is its function?",
            respiratory_b5: "Air pathway: Nose → Pharynx → ? → Trachea",

            // RESPIRATORY STAGE - CORE (5 questions)
            respiratory_c1: "The trachea has C-shaped cartilage rings. Why is this structure important?",
            respiratory_c2: "Bronchi branch into smaller bronchioles. What is this structure called?",
            respiratory_c3: "Alveoli have extremely thin walls (0.5 micrometers). Why is this necessary?",
            respiratory_c4: "The diaphragm creates negative pressure during inhalation. How does this draw air in?",
            respiratory_c5: "A healthy adult breathes 12-20 times per minute. What is this rate called?",

            // RESPIRATORY STAGE - ADVANCED (5 questions)
            respiratory_a1: "Adult lungs contain approximately 300 million alveoli. What is the total surface area?",
            respiratory_a2: "Tidal volume is the air exchanged per breath (~500 mL). Calculate minute ventilation:",
            respiratory_a3: "Oxygen diffuses from alveoli into capillaries. What drives this diffusion?",
            respiratory_a4: "The larynx contains vocal cords. How do they produce sound?",
            respiratory_a5: "Surfactant reduces surface tension in alveoli. What happens if surfactant is lacking?",

            // RESPIRATORY STAGE - ELITE (5 questions)
            respiratory_e1: "Asthma causes bronchiole constriction. What are the physiological consequences?",
            respiratory_e2: "COPD reduces gas exchange efficiency. What compensatory mechanisms occur?",
            respiratory_e3: "The respiratory system regulates blood pH by controlling CO2 levels. Explain the mechanism:",
            respiratory_e4: "High altitude reduces oxygen availability. How does the body adapt?",
            respiratory_e5: "Pneumonia fills alveoli with fluid. Calculate the reduction in gas exchange capacity:"
        },
        organs: {
            stomach: "Stomach",
            heart: "Heart",
            lungs: "Lungs",
            esophagus: "Esophagus",
            intestines: "Intestines",
            small_intestine: "Small intestine",
            large_intestine: "Large intestine",
            liver: "Liver",
            pancreas: "Pancreas",
            arteries: "Arteries",
            veins: "Veins",
            capillaries: "Capillaries",
            alveoli: "Alveoli",
            diaphragm: "Diaphragm",
            trachea: "Trachea",
            larynx: "Larynx",
            pharynx: "Pharynx",
            bronchi: "Bronchi",
            bronchioles: "Bronchioles",
            mouth: "Mouth",
            nose: "Nose"
        },
        functions: {
            digestion: "Digestion",
            absorption: "Absorption",
            bile_production: "Bile production",
            enzyme_production: "Enzyme production",
            acid_production: "Acid production",
            pump_blood: "Pump blood",
            carry_blood: "Carry blood",
            return_blood: "Return blood to heart",
            gas_exchange: "Gas exchange",
            breathing: "Breathing",
            filter_air: "Filter air",
            produce_sound: "Produce sound"
        },
        hints: {
            digestive_b1: "Where food is churned and digested",
            digestive_b2: "Breaks down food into nutrients",
            digestive_b3: "Takes nutrients into bloodstream",
            digestive_b4: "Helps digest fats",
            digestive_b5: "Count all organs in the pathway",
            digestive_c1: "Located behind the stomach",
            digestive_c2: "Breaks down proteins and kills bacteria",
            digestive_c3: "More surface area = more absorption",
            digestive_c4: "Leads to dehydration",
            digestive_c5: "Muscle contractions",
            circulatory_b1: "Circulates blood",
            circulatory_b2: "Opposite of arteries",
            circulatory_b3: "Heart and two types of vessels",
            circulatory_b4: "Waste gas from cells",
            circulatory_b5: "Upper and lower chambers",
            circulatory_c1: "Pulmonary circulation",
            circulatory_c2: "Pumps to entire body",
            circulatory_c3: "Where gas exchange occurs",
            circulatory_c4: "120/80 mmHg",
            circulatory_c5: "Heart rate",
            respiratory_b1: "Tiny air sacs in lungs",
            respiratory_b2: "Gas needed for cellular respiration",
            respiratory_b3: "From nose to lungs",
            respiratory_b4: "Muscle for breathing",
            respiratory_b5: "Voice box",
            respiratory_c1: "Prevents collapse",
            respiratory_c2: "Bronchial tree",
            respiratory_c3: "Allows gas diffusion",
            respiratory_c4: "Pressure difference",
            respiratory_c5: "Respiratory rate"
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
            ecology_score: "Ecology Score",
            analysis: "Ecosystem Analysis",
            hint: "Ecology Hint",
            viz: {
                sun: "SUN",
                producers: "PRODUCERS",
                primary_consumer: "PRIMARY CONSUMER",
                secondary_consumer: "SECONDARY CONSUMER",
                decomposers: "DECOMPOSERS",
                carbon_cycle: "CARBON CYCLE",
                nitrogen_cycle: "N CYCLE",
                water_cycle: "WATER CYCLE",
                co2_air: "CO2 in Air",
                plants: "Plants",
                animals: "Animals",
                river: "Rhine River",
                clouds: "Clouds",
                rain: "Rain",
                evap: "Evap",
                fix: "Fix",
                nitrate: "Nitrate",
                denit: "Denit"
            }
        },
        prompts: {
            food_chain: "In the Rhine ecosystem, {producer} is eaten by {consumer}. What comes next?",
            energy_transfer: "If {level} consumers have {energy} kJ of energy, how much reaches the next level?",
            cycle_process: "In the {cycle} cycle, what is produced by {process}?",
            hint_trophic: "Only 10% of energy transfers to the next trophic level",
            hint_10percent: "Use the 10% rule: multiply by 0.1",
            hint_cycle: "Think about the inputs and outputs of this process"
        },
        results: {
            valid: "Ecological Balance",
            invalid: "Trophic Collapse",
            valid_desc: "Energy flow and nutrient cycles are optimal.",
            invalid_desc: "Incorrect calculation. The ecosystem is destabilized.",
            next: "Monitor Next Sector"
        },
        scenarios: {
            rhine_river: "The Rhine River serving as Basel's lifeblood is a complex aquatic ecosystem that demonstrates the intricate balance of food chains. At the base of this system are primary producers like phytoplankton and algae, which harness solar energy. These are consumed by primary consumers such as zooplankton and small aquatic invertebrates. As we move up the trophic levels, we encounter various fish species like the silver carp and the European eel. The 'Salmon Comeback' project in Basel highlights the importance of maintaining these links, as salmon act as vital indicators of ecosystem health. At the apex, predators like the Great Cormorant and the Grey Heron regulate the populations below them. Understanding these relationships is crucial for the conservation efforts led by the University of Basel and local environmental agencies, ensuring that if one link—such as the benthic invertebrates—is disrupted by pollution or invasive species like the Quagga mussel, the entire food web remains resilient through biological diversity.",
            energy_pyramid: "In the wetlands of the Petite Camargue Alsacienne, just across the border from Basel, the energy pyramid illustrates the fundamental law of thermodynamics in ecology. Based on the 10% rule, only about ten percent of the energy stored as biomass in one trophic level is passed on to the next. This dramatic energy loss at each step explains why the landscape is dominated by lush vegetation (producers) and high numbers of insects and small fish, while top predators like the Eurasian Lynx or large birds of prey remain relatively rare. This energy constraint limits the number of possible trophic levels to typically four or five. Students and researchers in Basel use these models to calculate the 'carrying capacity' of local nature reserves. By monitoring the biomass of primary producers, scientists at the Biozentrum can predict how many higher-level consumers the ecosystem can sustainably support, a vital metric for managing Basel's green belts and protecting endangered species from starvation due to habitat fragmentation.",
            carbon_cycle: "The global carbon cycle finds a local rhythm in the urban forests and parks of Basel, such as the Hardwald and the Lange Erlen. Through photosynthesis, Basel's vast canopy of beech and oak trees absorbs atmospheric carbon dioxide, converting it into organic carbon stored in wood and soil. This process, known as carbon sequestration, plays a critical role in Basel's climate strategy to reach net-zero emissions. Conversely, cellular respiration by animals, humans, and decomposers in the soil releases CO2 back into the atmosphere. The cycle is further influenced by the Rhine, which transports dissolved organic carbon from the Swiss Alps. Managing these 'carbon sinks' is a priority for the Basel-Stadt department of environment. By protecting old-growth trees and promoting sustainable urban forestry, the city maintains a natural balance that mitigates the urban heat island effect and promotes a stable climate for both human residents and the diverse wildlife that calls these forests home.",
            nitrogen_cycle: "Nitrogen cycling in the agricultural regions surrounding Basel, particularly in the Basel-Landschaft cantonal areas, is essential for high-yield food production and soil health. While nitrogen gas makes up 78% of the atmosphere, it is largely inaccessible to plants until it is 'fixed.' In nature, this occurs through lightning or, more significantly, through nitrogen-fixing bacteria living in the root nodules of legumes like clover and beans. These microorganisms convert N2 into ammonium and then into nitrates, which plants can absorb to build proteins and DNA. In modern Basel-area farming, this cycle is augmented by sustainable fertilization practices aimed at preventing nitrate runoff into the Rhine, which can cause eutrophication. Local agricultural schools teach the importance of crop rotation—planting nitrogen-fixing crops between grain harvests to naturally replenish the soil. This biological recycling system ensures that essential nutrients are continuously moved from the air to the soil and through the various organisms within the Basel ecosystem, supporting a robust agricultural economy.",
            water_cycle: "The Rhine River at Basel serves as a massive, visible segment of the global water cycle. Water primarily enters this local system as precipitation or snowmelt from the Swiss Alps, flowing through the city's iconic river bend. The sun's energy drives evaporation from the river's surface and transpiration from the dense foliage of the Jura mountains, returning moisture to the atmosphere where it condenses into clouds. The IWB (Industrielle Werke Basel) utilizes this cycle for the city's drinking water, sourcing it from the groundwater of the Lange Erlen, which is naturally replenished by the Rhine's flow. This process of filtration and infiltration demonstrates how the ecosystem purifies water as it moves through different stages of the cycle. Human activities in Basel, from industrial cooling to shipping, are carefully managed to respect the water cycle's integrity. Ensuring that the Rhine remains clean as it leaves Basel to travel toward the North Sea is a cross-border responsibility, reflecting the city's commitment to the International Commission for the Protection of the Rhine."
        }
    },
    sb2_03: {
        back: "Back to Nexus",
        title: "SB2.03 // GENETIC VARIATION",
        difficulty: {
            basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Genetic Variation Analysis",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "SB2.03_VARIATION_MONITOR",
        footer_left: "SB2.03_GENETIC_VARIATION // NODE: BASEL",
        stages: {
            monohybrid: "MONOHYBRID CROSS",
            probability: "PROBABILITY",
            dihybrid: "DIHYBRID CROSS"
        },
        scenarios: {
            monohybrid: "Basel Botanical Garden - Mendelian Study: You are working at the Basel Botanical Garden, where researchers are replicating Gregor Mendel's famous experiments with pea plants. By crossing plants with different traits (like purple vs. white flowers), you are investigating the Law of Segregation. Each plant carries two alleles for a trait, and they separate during gamete formation. Your task is to use a Punnett Square to predict the phenotypic and genotypic ratios of the offspring from a specific cross. Understanding these basic inheritance patterns is the foundation for all modern genetics and agriculture in Switzerland.",
            probability: "University of Basel - Genetics Research Lab: Within the high-tech genetics laboratory at the University of Basel, you are calculating the statistical probability of specific genetic outcomes. Genetics is inherently probabilistic; when two heterozygous parents (Rr) cross, there's a 25% chance of homozygous dominant (RR), 50% chance of heterozygous (Rr), and 25% chance of homozygous recessive (rr) offspring. Your task is to determine the exact mathematical probability (percentage or fraction) that a random offspring will exhibit a particular genotype or phenotype. This precision is vital for clinical genetics and understanding hereditary conditions.",
            dihybrid: "Syngenta Greenhouse - Complex Trait Analysis: At the Syngenta research greenhouse in Basel, you are analyzing the inheritance of two independent traits simultaneously, such as seed shape (Round/Wrinkled) and seed color (Yellow/Green). This follows Mendel's Law of Independent Assortment, which states that alleles for different traits are distributed to gametes independently of one another. A dihybrid cross between two double-heterozygotes (RrYy x RrYy) typically results in a 9:3:3:1 phenotypic ratio. Your task is to calculate the complex outcome of these genetic crosses, a skill essential for developing new resilient crop varieties."
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
            instructions: "INSTRUCTIONS",
            prediction: "Phenotype Prediction",
            analysis: "Genetic Analysis",
            hint: "Genetics Hint"
        },
        results: {
            valid: "Sequence Validated",
            invalid: "Genetic Drift",
            valid_desc: "Mendelian ratios confirmed.",
            invalid_desc: "Recalculate the probability matrix.",
            next: "Next Specimen",
            analysis: "Phenotype Prediction"
        },
        prompts: {
            monohybrid_ratio: "Cross {p1} \\times {p2}. What is the phenotypic ratio?",
            monohybrid_percent: "Cross {p1} \\times {p2}. What percentage of offspring will be Dominant?",
            prob_genotype: "Cross {p1} \\times {p2}. What is the probability of a {genotype} offspring?",
            ratio_target: "\\text{Ratio} = ?",
            percent_target: "\\text{Percentage}",
            prob_target: "P({genotype}) = ?",
            hint_square: "Check the Punnett Square.",
            hint_all_rr: "All offspring are Rr.",
            hint_count: "{count} out of 4 squares."
        }
    },
};
