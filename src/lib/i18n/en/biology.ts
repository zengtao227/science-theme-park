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
          hint_oxy: "We breathe this in to burn glucose."
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
