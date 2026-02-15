import { useAppStore } from "@/lib/store";

export type Language = "EN" | "CN" | "DE";

export const translations: Record<string, any> = {
    EN: {
        protocol: {
            system_name: "SYSTEM PROTOCOL v2.1",
            warning_text: "WARNING: The world does not revolve around you... unless you understand the rules.",
            hold_instruction: "Enter Authorization Gate",
            hold_button: "[ ACCESS NEXUS ]",
            secure_connection: "SECURE CONNECTION ESTABLISHED",
        },
        common: {
            history_title: "Experiment History",
            history_toggle: "History",
            history_empty: "No verified runs yet.",
            history_accuracy: "Accuracy",
            history_stage: "Stage",
            history_difficulty: "Difficulty",
            history_time: "Timestamp",
            history_speed: "Speed",
            history_rigor: "Rigor",
            history_best: "Best",
            mastery_title: "STEM Mastery",
            mastery_conceptual: "Conceptual",
            mastery_speed: "Speed",
            mastery_rigor: "Rigor",
            mastery_decay: "Decay",
            achievements_title: "Achievements",
            achievement_unlocked: "Achievement Unlocked",
            achievements: {
                first_light: {
                    title: "First Light",
                    description: "Complete your first optics experiment."
                },
                first_launch: {
                    title: "First Launch",
                    description: "Complete any experiment."
                },
                mole_master: {
                    title: "Mole Master",
                    description: "Reach 100% accuracy in C1.02."
                },
                molecular_architect: {
                    title: "Molecular Architect",
                    description: "Complete C3.01."
                },
                time_traveler: {
                    title: "Time Traveler",
                    description: "Complete the P1.04 time dilation mission."
                },
                calculus_god: {
                    title: "Calculus God",
                    description: "Reach 100% accuracy in GM1.01."
                }
            }
        },
        home: {
            title: "SCIENCE THEME PARK",
            subtitle: "Hardcore Science & Logic Simulations",
            sek1_title: "SEKUNDARSCHULE // YEAR 1 (7th GRADE)",
            sek2_title: "SEKUNDARSCHULE // YEAR 2 (8th GRADE)",
            sek3_title: "SEKUNDARSCHULE // YEAR 3 (9th GRADE)",
            gym_title: "GYMNASIUM // UPPER SECONDARY",
            nexus: "The Nexus",
            archive: "Archives",
            sm1_01_title: "SM1.01 // AREAS & VOLUMES",
            sm1_01_subtitle: "Calculate areas of trapezoids and volumes of prisms and cylinders.",
            sm1_02_title: "EM1.01 // 4D HYPER-GEOMETRY",
            sm1_02_subtitle: "Explore the tesseract: 4D projection, rotation matrices, and hypercube unfolding.",
            sm1_03_title: "EM1.01 // ALGEBRA QUEST",
            sm1_03_subtitle: "Master variables, simplifying terms, and substitution with visual algebra tiles.",
            sm1_04_title: "SM1.03 // BELOW ZERO",
            sm1_04_subtitle: "Master integers, number lines, rational numbers, and 2D coordinates with Basel winter scenarios.",
            sm1_05_title: "SM1.04 // EQUATION BALANCE",
            sm1_05_subtitle: "Solve linear equations using balance models, transformations, and Basel real-world applications.",
            sm1_06_title: "SM1.05 // RATIO LAB",
            sm1_06_subtitle: "Master proportions, percentages, and mixtures with interactive Basel lab scenarios.",


            sm2_01_title: "SM2.01 // BINOMIAL FACTORY",
            sm2_01_subtitle: "Master the 1st and 2nd Binomial Formulas. Use geometric dissection to prove algebraic identities.",
            sm2_02_title: "SM2.02 // PYTHAGORAS & ROOTS",
            sm2_02_subtitle: "Train the Pythagorean theorem and square roots with realistic difficulty gradients.",
            sm2_03_title: "SM2.03 // LINES & FUNCTIONS",
            sm2_03_subtitle: "Master slope, intercept, graph matching, and intersections with low-input steps.",
            sm2_04_title: "SM2.04 // SIMILARITY & SCALING",
            sm2_04_subtitle: "Train similarity ratios, scale factors, and applied proportional reasoning.",
            sm2_05_title: "SM2.05 // POWERS & ROOTS",
            sm2_05_subtitle: "Systematically train power laws, negative exponents, and scientific notation.",
            sm2_06_title: "SM2.06 // LINEAR SYSTEMS",
            sm2_06_subtitle: "Master substitution and elimination methods for solving systems of two linear equations.",
            sm2_07_title: "SM2.07 // COORDINATE RECON",
            sm2_07_subtitle: "Coordinate planes, translations, and plotting precision in the Basel grid.",
            sm2_08_title: "SM2.08 // PROBABILITY BASICS",
            sm2_08_subtitle: "Master probability fundamentals through Basel life scenarios and simple gambling education.",
            sm3_01_title: "SM3.01 // QUADRATIC EQUATIONS",
            sm3_01_subtitle: "Solve quadratic equations by factoring, formula, and completing the square.",
            sm3_02_title: "SM3.02 // TRIGONOMETRY ARRAY",
            sm3_02_subtitle: "Train sine, cosine, and phase shifts with wave feedback.",
            sm3_03_title: "SM3.03 // EXPONENTIAL GROWTH",
            sm3_03_subtitle: "Model exponential and logarithmic growth with cell division simulations.",
            sm3_04_title: "SM3.04 // LOGARITHMIC LAB",
            sm3_04_subtitle: "Decode log scales and inverse growth with precision drills.",
            gm1_01_title: "GM1.01 // CALCULUS INTRO",
            gm1_01_subtitle: "Explore derivatives and tangent slopes. Calculate secant and tangent slopes on parabolas.",
            gm2_01_title: "GM2.01 // VECTOR PILOT 3D",
            gm2_01_subtitle: "Navigate drones with 3D vectors, dot products, and magnitude control above the Rhine.",
            gm3_01_title: "GM3.01 // PROBABILITY VAULT",
            gm3_01_subtitle: "Master probability with dice, cards, and combinatorics in Basel's casino vault.",
            coming_soon: "Simulation sequence not yet initialized.",
            engine_line: "Physical Law Simulation Engine // v2.1",
            initiate_simulation: "Initiate Simulation",
            locked_level_required: "LOCKED // LEVEL {level} REQUIRED",
            engine_status_label: "Engine Status",
            engine_status_value: "R3F PHYSICS ENGINE ACTIVE",
            nodes_label: "Nodes",
            nodes_value: "GENEVA // ZURICH // SHANGHAI",
            search_label: "Filter Modules",
            search_placeholder: "Search by code or name",
            filter_tags_label: "Discipline Tags",
            filter_clear: "Reset Filters",
            filter_empty: "No modules match the current filters.",
            filter_tags: {
                physics: "Physics",
                math: "Math",
                chemistry: "Chemistry",
                biology: "Biology",
                socratic: "Socratic"
            },
            completed_badge: "COMPLETED"
        },
        gm4_01: {
            back: "Back to Nexus",
            title: "GM4.01 // COMPLEX HORIZON",
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
            monitor_title: "GM4.01_COMPLEX_MONITOR",
            footer_left: "GM4.01_COMPLEX_HORIZON // NODE: BASEL",
            scenario_title: "BASEL ENGINEERING MISSION",
            scenarios: {
                basics: "Roche Pharmaceutical Signal Processing: You are calibrating medical imaging equipment at Roche Basel that uses complex number analysis for MRI signal processing. Each complex number z = a + bi represents a signal with real component (amplitude) and imaginary component (phase). Calculate the magnitude |z| to determine signal strength. Accurate magnitude calculation is critical for detecting tissue abnormalities in patient scans.",
                operations: "Novartis Quantum Chemistry Simulation: You are running molecular orbital calculations at Novartis Basel using complex number arithmetic. Wave functions are represented as complex numbers, and their interactions require addition and multiplication in the complex plane. Calculate the result of complex operations to predict molecular behavior. These calculations determine drug binding efficiency.",
                polar: "Basel University Electrical Engineering: You are analyzing AC circuit behavior in power systems for Basel's smart grid. Complex impedances are raised to powers when calculating resonance frequencies. Use polar form (r·e^(iθ)) to compute z^n efficiently. The result determines optimal power distribution across Basel's renewable energy network."
            },
            stages: {
                basics: "BASICS",
                operations: "OPERATIONS",
                polar: "POLAR FORM",
                basics_prompt: "Calculate magnitude",
                basics_target: "Find |z|",
                operations_add: "Add complex numbers",
                operations_multiply: "Multiply complex numbers",
                operations_target: "Find real and imaginary parts",
                polar_prompt: "Calculate power using polar form",
                polar_target: "Find z^n in rectangular form"
            },
            visualization: {
                pythagorean: "PYTHAGOREAN THEOREM",
                vector_addition: "VECTOR ADDITION",
                complex_multiplication: "COMPLEX MULTIPLICATION",
                polar_power: "POLAR FORM POWER",
                complex_data: "COMPLEX NUMBER DATA",
                magnitude: "Magnitude |z|",
                argument: "Argument arg(z)",
                power: "Power",
                verified: "VERIFIED",
                mismatch: "MISMATCH",
                geometric_meaning: "Geometric meaning: magnitudes multiply, angles add",
                polar_meaning: "Magnitude becomes r^n, angle becomes n·θ",
                parallelogram_rule: "Parallelogram rule: from origin to z₁, then translate z₂ from z₁"
            }
        },
        em2_01: {
            back: "Back to Nexus",
            title: "EM2.01 // MATRIX GEOMETRY",
            difficulty: {
                basic: "BASIC",
                core: "CORE",
                advanced: "ADVANCED",
                elite: "ELITE"
            },
            objective_title: "Active Mission Objective",
            target_title: "Transformation Matrix",
            next: "Execute Next Sequence",
            check: "Verify",
            correct: "Verified",
            incorrect: "Mismatch",
            ready: "Ready",
            monitor_title: "EM2.01_MATRIX_MONITOR",
            footer_left: "EM2.01_MATRIX_GEOMETRY // NODE: BASEL",
            labels: {
                matrix: "MATRIX A",
                properties: "PROPERTIES",
                determinant: "Determinant",
                volume_scale: "Volume Scale",
                formulas: "FORMULAS",
                angle: "ROTATION ANGLE (θ)",
                scale_x: "SCALE X-AXIS",
                scale_y: "SCALE Y-AXIS",
                scale_z: "SCALE Z-AXIS",
                shear_xy: "SHEAR X BY Y",
                shear_xz: "SHEAR X BY Z",
                matrix_title: "MATRIX A",
                det_value: "det(A) = {value}",
                show_eigenvectors: "Show Eigenvectors",
                show_grid: "Show Grid",
                animate: "Animate"
            },
            presets: {
                title: "PRESETS",
                scale: "Scale",
                rotate: "Rotate 90°",
                shear: "Shear",
                reflect: "Reflect"
            },
            linear: {
                title: "LINEAR ALGEBRA",
                line_1: "Ax = λx (eigenvalue equation)",
                line_2: "det(A - λI) = 0",
                line_3: "T(v) = Av"
            },
            mission: {
                title: "MISSION: LINEAR TRANSFORMATIONS",
                description: "Visualize linear algebra in 3D space. Explore matrix transformations, eigenvectors, and geometric intuition."
            },
            stages: {
                basic_transforms: "TRANSFORMS",
                determinant: "DETERMINANT",
                composition: "COMPOSITION"
            },
            scenario_title: "BASEL ENGINEERING MISSION",
            scenarios: {
                basic_transforms: "Roche Pharmaceutical Molecular Analysis: You are working in Roche Basel's computational chemistry department, using linear transformations to analyze protein molecule symmetry. Each matrix represents a symmetry operation (rotation, reflection, scaling). Identifying transformation types is critical for predicting molecular optical properties.",
                determinant: "Novartis Crystal Structure: You are analyzing drug crystal unit cell structures at Novartis Basel. The determinant represents lattice volume change. det(A)=0 indicates crystal structure collapse, det(A)<0 indicates chirality inversion. Accurate determinant calculation is crucial for predicting drug bioactivity.",
                composition: "University of Basel Robotics: You are programming a robotic arm at Basel University robotics lab. Each joint's motion is represented by a transformation matrix. Composite transformation AB means executing joint A's motion first, then joint B's motion. Matrix multiplication order determines the robot arm's final position."
            },
            explanation_label: "EXPLANATION"
        },
        gm3_01_subtitle: "Visualize binomial distribution with Galton Board. Watch probability converge to normal distribution.",
        sp1_01_title: "SP1.01 // MEASUREMENT & UNITS",
        sp1_01_subtitle: "Master SI units, unit conversions, and measurement precision with Basel lab instruments.",
        sp1_02_title: "SP1.02 // NEWTON'S LAWS",
        sp1_02_subtitle: "The mechanics of Basel: Explore friction, acceleration, and collision dynamics.",
        sp2_01_title: "SP2.01 // THERMODYNAMICS",
        sp2_01_subtitle: "Track heat transfer with Q=mcΔT and Q=mL across phase transitions.",
        sp2_02_title: "SP2.02 // CIRCUIT SANDBOX",
        sp2_02_subtitle: "Engineer Basel's power grid. Solve Ohm's Law and series/parallel circuits.",
        sp2_03_title: "SP2.03 // MOTOR LAB",
        sp2_03_subtitle: "Electromagnetism and motor principles.",
        sp3_01_title: "SP3.01 // GEOMETRICAL OPTICS",
        sp3_01_subtitle: "Visualize light through Rhine water. Ray tracing, reflection, and lenses.",
        sp1_03_title: "SP1.03 // ENERGY & POWER",
        sp1_03_subtitle: "Model Rhine hydropower with potential energy, kinetic energy, and power output.",
        sp1_04_title: "SP1.04 // SIMPLE MACHINES",
        sp1_04_subtitle: "Master levers, pulleys, and inclined planes with Basel construction site scenarios.",
        sp3_02_title: "SP3.02 // WAVE OPTICS",
        sp3_02_subtitle: "Explore interference, diffraction, and polarization phenomena.",
        sp1_05_title: "SP1.05 // THE RHINE FERRY",
        sp1_05_subtitle: "Master the Basel Gierseilfähri. Navigating the Rhine using only current and cables.",
        sp1_06_title: "SP1.06 // THE SWISS PENDULUM",
        sp1_06_subtitle: "The mechanics of time: Explore period, frequency and gravity with the Basel clockmaker.",
        sp1_07_title: "SP1.07 // ARCIMEDES' DOCK",
        sp1_07_subtitle: "Explore pressure, buoyancy, and hydraulics in the Basel Rhine harbor.",
        sp1_08_title: "SP1.08 // OPTICS LAB",
        sp1_08_subtitle: "Explore light, lenses, and optical phenomena.",
        sp4_01_title: "SP3.03 // WAVE BASICS",
        sp4_01_subtitle: "Wave properties and sound phenomena.",
        gp5_01_title: "GP1.01 // THE ATOMIC CORE",
        gp5_01_subtitle: "Stabilize the Basel reactor by balancing nuclear equations: Alpha, Beta, and Gamma decay.",
        gp5_02: {
            back: "Back to Nexus",
            title: "GP1.02 // RELATIVITY LAB",
            difficulty: {
                basic: "BASIC",
                core: "CORE",
                advanced: "ADVANCED",
                elite: "ELITE"
            },
            objective_title: "Active Mission Objective",
            target_title: "Lorentz Transformation",
            next: "Execute Next Sequence",
            check: "Verify",
            correct: "Verified",
            incorrect: "Mismatch",
            ready: "Ready",
            monitor_title: "GP1.02_RELATIVITY_MONITOR",
            footer_left: "GP1.02_RELATIVITY_LAB // NODE: CERN",
            labels: {
                velocity: "VELOCITY",
                lorentz_factor: "Lorentz Factor (γ)",
                time_dilation: "TIME DILATION",
                proper_time: "Proper Time (Δt₀)",
                dilated_time: "Dilated Time (Δt)",
                length_contraction: "LENGTH CONTRACTION",
                rest_length: "Rest Length (L₀)",
                contracted_length: "Contracted Length (L)",
                doppler_effect: "RELATIVISTIC DOPPLER",
                doppler_factor: "Doppler Factor",
                shift_type: "Shift Type",
                red_shift: "Red Shift",
                blue_shift: "Blue Shift",
                particle_velocity: "PARTICLE VELOCITY (v/c)",
                formulas: "FORMULAS"
            },
            mission: {
                title: "MISSION: SPECIAL RELATIVITY",
                description: "Explore Einstein's special relativity at CERN. Observe time dilation and length contraction."
            },
            stages: {
                time_dilation: "TIME DILATION",
                length_contraction: "LENGTH CONTRACTION",
                doppler: "DOPPLER EFFECT",
                time_dilation_desc: "Observe photon clocks at relativistic speeds",
                length_contraction_desc: "Measure particle length contraction",
                doppler_desc: "Analyze relativistic Doppler shift",
                time_dilation_hint: "Moving clocks run slower: Δt = γΔt₀",
                length_contraction_hint: "Moving objects contract: L = L₀/γ",
                doppler_hint: "Light shifts red (receding) or blue (approaching)"
            }
        },
        gp1_04: {
            back: "Back to Nexus",
            title: "GP1.04 // QUANTUM TUNNEL",
            difficulty: {
                basic: "BASIC",
                core: "CORE",
                advanced: "ADVANCED",
                elite: "ELITE"
            },
            objective_title: "Active Mission Objective",
            target_title: "Wave Function",
            next: "Execute Next Sequence",
            check: "Verify",
            correct: "Verified",
            incorrect: "Mismatch",
            ready: "Ready",
            monitor_title: "GP1.04_QUANTUM_MONITOR",
            footer_left: "GP1.04_QUANTUM_TUNNEL // NODE: CERN",
            labels: {
                particle_energy: "PARTICLE ENERGY (E)",
                barrier_height: "BARRIER HEIGHT (V₀)",
                barrier_width: "BARRIER WIDTH (a)",
                transmission: "TRANSMISSION COEFFICIENT",
                wave_function: "WAVE FUNCTION",
                probability_density: "PROBABILITY DENSITY |ψ|²",
                incident: "Incident",
                reflected: "Reflected",
                transmitted: "Transmitted",
                formulas: "FORMULAS",
                energy_ev: "Energy (eV)",
                barrier_ev: "Barrier (eV)",
                width_nm: "Width (nm)"
            },
            mission: {
                title: "MISSION: QUANTUM TUNNELING",
                description: "Explore quantum tunneling through potential barriers. Observe wave function behavior."
            },
            stages: {
                classical: "CLASSICAL LIMIT",
                tunneling: "QUANTUM TUNNELING",
                resonance: "RESONANCE",
                classical_desc: "Particle energy below barrier (E < V₀)",
                tunneling_desc: "Observe tunneling probability",
                resonance_desc: "Find resonance conditions (T ≈ 1)",
                classical_hint: "Classical physics: T = 0 when E < V₀",
                tunneling_hint: "Quantum mechanics: T > 0 even when E < V₀",
                resonance_hint: "Resonance occurs at specific E/V₀ ratios"
            }
        },
        s3_02_title: "SM3.02 // TRIGONOMETRY TOWER",
        s3_02_subtitle: "Master sine, cosine, and tangent through unit circle visualization, wave functions, and triangle solving.",
        s2_07_title: "SM2.07 // COORDINATE GEOMETRY",
        s2_07_subtitle: "Master distance, midpoint, and slope calculations.",
        s3_04_title: "SM3.04 // LOGARITHMIC SCALES",
        s3_04_subtitle: "Master pH scale, decibels, and Richter scale with logarithmic calculations.",
        sc1_01_title: "SC1.01 // MYSTERY LAB",
        sc1_01_subtitle: "Identify mysterious white powders through chemical tests.",
        sc1_02_title: "SC1.02 // MOLE MASTER",
        sc1_02_subtitle: "Run Novartis-grade stoichiometry: molar mass, ratios, and yields.",
        sc1_03_title: "SC1.03 // ATOMS FORGE",
        sc1_04_title: "SC1.04 // PERIODIC PUZZLE",
        sc1_04_subtitle: "Build atoms and discover the periodic table. Master electron configuration.",
        gsc2_01: {
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
                add_atom: "Click atom tool to add new atom",
                bonds: "Atoms connect based on valence rules",
                delete: "Use DELETE to remove selected atom"
            }
        },
        gsc1_01: {
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
            }
        },
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
                bcc_hint: "Moderate packing (68%), metals like Fe, Cr",
                fcc_hint: "Highest packing (74%), metals like Cu, Al, Au"
            }
        },
        sc1_03_subtitle: "Build isotopes and understand atomic orbitals in 3D.",
        sc2_01_title: "SC2.01 // REACTION KINETICS",
        sc2_01_subtitle: "Master Arrhenius equation, collision theory, and reaction rates.",
        sc2_02_title: "SC2.02 // pH SENTINEL",
        sc2_02_subtitle: "Master pH curves and titration with real-time feedback.",
        sc2_03_title: "SC2.03 // AERO LAB",
        sc2_03_subtitle: "Explore ideal gas laws with particle simulations. Master PV=nRT.",
        sc2_04_title: "SC2.04 // SOLUBILITY LAB",
        sc2_04_subtitle: "Explore solubility curves and crystallization. Master saturation equilibrium.",
        sc3_01_title: "SC3.01 // MOLECULE CANVAS",
        sc3_01_subtitle: "Build and visualize molecular structures in 3D space.",
        sc3_02_title: "SC3.02 // ORGANIC CHEMISTRY BASICS",
        sc3_02_subtitle: "Master hydrocarbons, functional groups, and isomers with 2D/3D molecular visualization.",
        sc3_03_title: "SC3.03 // ORGANIC REACTIONS",
        sc3_03_subtitle: "Explore combustion, substitution, and addition reactions with mechanism animations.",
        gc1_01_title: "GC1.01 // REDOX TITAN",
        gc1_01_subtitle: "Master electrochemical cells and redox potentials.",
        gc2_01_title: "GC2.01 // CARBON KINGDOM",
        gc2_01_subtitle: "Assemble pharmaceutical molecules with 3D models.",
        gc3_01_title: "GC3.01 // MOLECULAR ARCHITECT",
        gc3_01_subtitle: "Assemble pharmaceutical molecules with 3D ball-and-stick models.",
        gc3_02_title: "GC3.02 // CRYSTAL PALACE",
        gc3_02_subtitle: "Explore crystal structures: SC, BCC, FCC lattices with interstitial voids.",
        sb1_01_title: "SB1.01 // CELL FACTORY",
        sb1_01_subtitle: "Explore cell structure and organelles.",
        sb1_01_met_title: "SB1.01 // METABOLIC PATHWAYS",
        sb1_01_met_subtitle: "Cellular metabolism and energy production.",
        sb1_02_title: "SB1.02 // PHOTOSYNTHESIS LAB",
        sb1_02_subtitle: "Master photosynthesis equation, limiting factors, and chloroplast structure.",
        sb1_03_title: "SB1.03 // REPLICATION HUB",
        sb1_03_subtitle: "Master mitosis and meiosis mechanics. The bridge to genetics.",
        sb2_01_title: "SB2.01 // MENDEL'S GARDEN",
        sb2_01_subtitle: "Genetics and Punnett squares.",
        sb2_02_title: "SB2.02 // HUMAN BODY SYSTEMS",
        sb2_02_subtitle: "Explore digestive, circulatory, and respiratory systems with interactive anatomy.",
        sb3_01_title: "SB3.01 // ECOSYSTEM DYNAMICS",
        sb3_01_subtitle: "Master food chains, energy flow, and biogeochemical cycles in the Rhine ecosystem.",
        gb3_01_title: "GB3.01 // DNA FORGE",
        gb3_01_subtitle: "Molecular biology and DNA replication.",
        gm4_01_title: "GM4.01 // COMPLEX HORIZON",
        gm4_01_subtitle: "Visualize the complex plane and Euler's formula in 3D space.",
        gm5_01_title: "EM2.01 // MATRIX TRANSFORM",
        gm5_01_subtitle: "Linear transformations and eigenvectors in 3D.",
        gp5_02_title: "GP1.02 // RELATIVITY LAB",
        gp5_02_subtitle: "Calculate Lorentz factor, length contraction, and time dilation at CERN.",
        gp1_03_title: "GP5.03 // PARTICLE COLLIDER",
        gp1_03_subtitle: "Simulate CERN's LHC. Collide protons at 13 TeV and discover the Higgs boson.",
        gp1_04_title: "GP1.04 // QUANTUM TUNNEL",
        gp1_04_subtitle: "Visualize quantum tunneling through potential barriers with wave functions.",
    profile: {
        title: "Scientist Profile",
        subtitle: "Operator dossier // performance matrix",
        radar_title: "Cognitive Spectrum",
        stats_title: "Mission Stats",
        timeline_title: "Learning Timeline",
        timeline_empty: "No mission history recorded.",
        timeline_accuracy: "Accuracy",
        stats: {
            completed_modules: "Modules Completed",
            avg_accuracy: "Average Accuracy",
            total_runs: "Total Runs",
            experiment_index: "Experiment Index"
        },
        metrics: {
            logic: "Logic",
            intuition: "Intuition",
            rigor: "Rigor",
            experiment: "Experiment"
        }
    },
    sm2_02: {
        back: "Back to Nexus",
        title: "SM2.02 // PYTHAGORAS & ROOTS",
        tabs: {
            pythagoras: "PYTHAGORAS",
            sqrt: "SQUARE ROOT",
            explorer: "EXPLORER LAB",
            quest_mode: "QUEST MODES"
        },
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Target",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        yes: "YES",
        no: "NO",
        monitor_title: "SM2.02_VISUAL_MONITOR",
        footer_left: "SM2.02_SQRT_PYTHAGORAS // NODE: ZURICH",
        input_radical: "Answer as k√m",
        input_k: "k",
        input_m: "m",
        input_number: "Answer",
        pythagoras: {
            solve_hyp: " Fire rescue: Find the ladder length",
            solve_leg: " Mountain climb: Find the vertical height",
            check_right: "📐 Engineering check: Is this a right triangle?",
            distance: "🚁 Drone delivery: Calculate flight distance",
            elite_space: " CERN lab: Find the space diagonal",
            explorer_mission: "PYTHAGOREAN EXPLORER: Adjust scale and witness similarity constants.",
            fluid_title: "Fluid Volume Conservation",
            fluid_desc: "Tilt to see A² + B² flow into C². This visualizes area conservation: the geometry sum remains constant."
        },
        sqrt: {
            perfect: "Perfect squares",
            simplify: "Simplify radicals",
            estimate: "Estimate"
        },
        mission: {
            title: "MISSION",
            protocol: "NEXUS PROTOCOL // SWISS NODE LIVE",
            cern_title: "CERN CALIBRATION ARRAY",
            cern_desc: "Calibrate a 16:9 observation array. Height=9s, Width=16s. Find the diagonal.",
            roof_title: "GRINDELWALD SNOW ROOF",
            roof_desc: "Design the snow roof brace with half-span 6m and height 6m.",
            ladder_title: "LUCERNE LADDER DOCK",
            ladder_desc: "A ladder is 5m from the wall and reaches 12m high. Find the ladder length.",
            grid_title: "BASEL GRID DISTANCE",
            grid_desc: "Compute the distance between two navigation nodes on the Basel grid.",
            chain_title: "CERN TRANSFER TUNNEL",
            chain_desc: "A transfer tunnel spans a rectangular bay and rises to a higher platform. Find the full diagonal."
        },
        mental: {
            title: "MENTAL",
            triples: "Pythagorean Triples",
            chain: "Segment Chain"
        }
    },
    sm3_01: {
        back: "Back to Nexus",
        title: "SM3.01 // QUADRATIC EQUATIONS",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Target Equation",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "SM3.01_MONITOR",
        footer_left: "SM3.01_QUADRATICS // NODE: ZURICH",
        stages: {
            terms: "TERMS",
            factorize: "FACTORIZE",
            fractions: "FRACTIONS",
            equations: "EQUATIONS",
            terms_prompt_latex: "\\text{Simplify the expression (combine like terms).}",
            factor_prompt_latex: "\\text{Factorize the expression (show a product form).}",
            fractions_prompt_latex: "\\text{Simplify the fraction.}",
            equations_prompt_latex: "\\text{Solve the equation step by step.}"
        },
        modes: {
            factor: "FACTOR",
            formula: "FORMULA",
            complete_square: "COMPLETE SQUARE",
            factor_prompt: "Factorize first: find A,B so that (x+A)(x+B)=0.",
            formula_prompt: "Solve with the quadratic formula.",
            complete_square_prompt: "Convert to vertex form and identify (h,k)."
        },
        labels: {
            input: "INPUT",
            numerator: "NUMERATOR",
            denominator: "DENOMINATOR",
            hints: "HINTS",
            roots: "Solutions x₁, x₂",
            vertex: "Vertex (h,k)",
            factor: "Factoring",
            factor_slots: "Build factors (A,B)",
            formula: "Quadratic Formula",
            complete_square: "Completing the Square",
            elite_hint_latex: "Hint: \\; x=\\frac{-b\\pm\\sqrt{\\Delta}}{2a}",
            fraction_hint: "Tip: Enter result as an integer or fraction (e.g. 4/3)."
        },
        hints: {
            identities: {
                trinomial_expand_latex: "(x+A)(x+B)=x^2+(A+B)x+AB",
                diff_squares_latex: "u^2-v^2=(u-v)(u+v)"
            },
            rules: {
                factor_common_latex: "\\text{Factor out the common factor.}",
                cancel_common_latex: "\\text{Factor numerator/denominator, then cancel the common factor.}",
                simplify_both_sides_latex: "\\text{Simplify both sides step by step.}",
                square_root_pm_latex: "\\text{Take square roots with }\\pm\\text{.}",
                zero_product_latex: "\\text{If }pq=0\\text{ then }p=0\\text{ or }q=0."
            }
        }
    },
    sm3_02: {
        back: "Back to Nexus",
        title: "SM3.02 // TRIG CIRCLE",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Trigonometric Values",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "SM3.02_TRIG_MONITOR",
        footer_left: "SM3.02_TRIG_CIRCLE // NODE: BASEL",
        labels: {
            angle: "ANGLE (θ)",
            values: "TRIGONOMETRIC VALUES",
            display: "DISPLAY OPTIONS",
            show_waves: "Show Wave Functions",
            formulas: "FORMULAS",
            special_angles: "SPECIAL ANGLES",
            exact_value: "EXACT VALUE",
            decimal_value: "DECIMAL",
            quadrant: "QUADRANT"
        },
        mission: {
            title: "MISSION: UNIT CIRCLE",
            description: "Master the unit circle and trigonometric functions. Understand sin, cos, and tan relationships."
        },
        stages: {
            unit_circle: "UNIT CIRCLE",
            projections: "PROJECTIONS",
            waves: "WAVE FUNCTIONS",
            unit_circle_desc: "Explore the unit circle and angle rotation",
            projections_desc: "Understand sine and cosine as projections",
            waves_desc: "Visualize sine and cosine as wave functions",
            unit_circle_hint: "Point on circle: (cos θ, sin θ)",
            projections_hint: "sin = y-projection, cos = x-projection",
            waves_hint: "Sine and cosine create periodic waves",
            unit_circle_prompt_latex: "\\text{Determine the quadrant or sign.}",
            projections_prompt_latex: "\\text{Calculate the exact trigonometric value.}",
            waves_prompt_latex: "\\text{Find the amplitude or period.}"
        }
    },
    sm3_03: {
        back: "Back to Nexus",
        title: "SM3.03 // GROWTH & LOGS",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Exponential Growth",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "SM3.03_GROWTH_MONITOR",
        footer_left: "SM3.03_EXPONENTIAL // NODE: BASEL",
        labels: {
            input: "INPUT",
            hints: "HINTS",
            population: "Population (N)",
            time: "Time (t)",
            doubling_time: "Doubling Time (d)",
            initial: "Initial Count (N₀)",
            formula_ref: "FORMULA REFERENCE",
            parameters: "CURRENT PARAMETERS",
            growth_rate: "Growth Rate (k)",
            half_life: "Half-life",
            principal: "Principal (P)",
            rate: "Interest Rate (r)"
        },
        hints: {
            exp_rule1: "Each doubling multiplies the population by 2",
            exp_rule2: "After n doublings: N = N₀ × 2ⁿ",
            log_rule1: "log₂(2ⁿ) = n",
            log_rule2: "Change of base: logₐ(x) = ln(x)/ln(a)",
            app_rule1: "Half-life: N(t) = N₀ × (½)^(t/h)",
            app_rule2: "Compound interest: A = P(1+r)^t"
        },
        input_tip: "Tip: Enter result as integer or rounded to 1 decimal place.",
        mission: {
            title: "BACTERIAL GROWTH LAB",
            description: "Novartis biolab requires exponential growth modeling. Calculate bacterial populations and logarithmic scales."
        },
        stages: {
            exponential: "EXPONENTIAL",
            logarithm: "LOGARITHM",
            applications: "APPLICATIONS",
            exponential_prompt_latex: "\\text{Calculate population using }N(t)=N_0\\cdot 2^{t/d}.",
            logarithm_prompt_latex: "\\text{Solve for time using logarithms.}",
            applications_prompt_latex: "\\text{Apply exponential models to real scenarios.}",
            exp_basic_prompt: "\\text{Calculate the population at time } t.",
            exp_advanced_prompt: "\\text{Find the number of doublings.}",
            exp_elite_prompt: "\\text{Find the continuous growth rate } k.",
            log_basic_prompt: "\\text{Solve for time using } t = d \\cdot \\log_2(N/N_0).",
            log_core_prompt: "\\text{Evaluate the logarithm.}",
            log_advanced_prompt: "\\text{Use the change of base formula.}",
            log_elite_prompt: "\\text{Solve the logarithmic equation.}",
            app_half_prompt: "\\text{Calculate remaining quantity after half-life decay.}",
            app_compound_prompt: "\\text{Calculate compound interest: } A=P(1+r)^t.",
            app_rate_prompt: "\\text{Find the growth rate from data.}",
            app_ph_prompt: "\\text{Calculate pH from hydrogen ion concentration.}"
        },
        formulas: {
            exponential: "N(t) = N_0 \\cdot 2^{t/d}",
            logarithm: "t = d \\cdot \\log_2(N/N_0)",
            applications: "N(t) = N_0 \\cdot e^{kt}"
        },
        scenarios: {
            exp_bac: "🦠 SCENARIO: Novartis Lab Bacterial Culture — A research team at Novartis in Basel is studying bacterial growth. They place 100 bacteria in a petri dish at 8:00 AM. Under optimal conditions, the bacteria population doubles every 20 minutes. The lab needs to predict when the population will reach 10,000 to harvest samples at the right moment. Your task: calculate the population at any given time using exponential growth.",
            exp_social: "📱 SCENARIO: TikTok Challenge Goes Viral — Your friend posts a dance challenge video at noon. Initially, 50 people watch it. Every hour, each viewer shares it with 2 friends who haven't seen it yet (doubling effect). By evening, the view count explodes exponentially. The school principal wants to know: at what time will 10,000 students have seen it? This models real viral spread on social media.",
            exp_virus: "🦠 SCENARIO: School Flu Outbreak Modeling — It's Monday morning. 3 students in your school of 1,200 have the flu. Health authorities know that without intervention, each infected person spreads the flu to 2 others every 2 days (doubling time = 2 days). The school nurse needs to predict: how many will be sick by Friday? When will 100 students be infected? This helps decide whether to close the school.",
            exp_moore: "💻 SCENARIO: Smartphone Performance Prediction — In 2000, your dad's Nokia phone had 4 MB of RAM. According to Moore's Law, computing power doubles roughly every 2 years. Your current iPhone has 8 GB (8,000 MB) of RAM. Question: how many 'doublings' occurred between 2000 and 2024? Can you verify Moore's Law held true? This exponential growth drives all modern technology.",
            log_invest: "💰 SCENARIO: Your Pocket Money Investment Plan — You saved 1,000 CHF from birthday gifts. Your parents offer a deal: they'll act as your 'bank' and pay 8% annual interest, compounded yearly (meaning each year, you earn interest on your previous interest too). You want to buy a gaming PC that costs 2,000 CHF. Question: how many years until your money doubles? Use logarithms to solve: t = log₂(2000/1000) / log₂(1.08). This is how real investment planning works!",
            log_sound: "🔊 SCENARIO: School Concert Sound Check — The music teacher is setting up for the school concert. A whisper measures 30 dB, normal conversation is 60 dB, and a rock concert is 120 dB. But here's the trick: the decibel scale is logarithmic! 60 dB isn't 'twice as loud' as 30 dB — it's actually 1,000 times more intense (because 10^(60/10) / 10^(30/10) = 1,000). Your task: if the current sound level is 80 dB and the safe limit is 85 dB, how many times more intense can the sound get before it's unsafe?",
            log_ph: "🧪 SCENARIO: Chemistry Lab pH Testing — In chemistry class, you're testing the pH of different liquids. Lemon juice has pH 2, water has pH 7, and soap has pH 12. Your teacher explains: pH is a logarithmic scale measuring hydrogen ion concentration [H⁺]. pH = -log₁₀[H⁺]. This means pH 2 is 100,000 times more acidic than pH 7 (not just '5 units more')! Question: if a solution has [H⁺] = 0.001 mol/L, what's its pH? Is it acidic or basic?",
            log_security: "🔐 SCENARIO: Password Cracking Time — Your IT teacher explains password security. A 4-digit PIN (0000-9999) has 10,000 combinations. A hacker's computer can try 1,000 passwords per second, so it takes 10 seconds to crack. But if you use an 8-character password with letters and numbers (62 options per character), there are 62^8 = 218 trillion combinations! At 1 billion tries per second, it takes 218,000 seconds (2.5 days). Question: how many characters needed for 1 year of protection? Use logarithms to solve: n = log₆₂(seconds × tries_per_second).",
            app_med: "💊 SCENARIO: Medicine Dosage Timing — Your doctor prescribes a painkiller. You take 400 mg at 8:00 AM. The drug has a half-life of 6 hours, meaning every 6 hours, half of it is eliminated from your body. At 2:00 PM (6 hours later), 200 mg remains. At 8:00 PM, 100 mg remains. The doctor says the drug stops working below 50 mg. Question: at what time can you safely take the next dose? Use the formula: N(t) = N₀ × (1/2)^(t/6).",
            app_bank: "🏦 SCENARIO: Comparing Savings Accounts — You have 5,000 CHF to save for university. Bank A offers 3% simple interest (you earn 150 CHF per year, always). Bank B offers 3% compound interest (each year, you earn interest on your interest too). After 10 years: Bank A gives you 5,000 + 10×150 = 6,500 CHF. Bank B gives you 5,000 × (1.03)^10 = 6,720 CHF. Question: after how many years does Bank B give you 1,000 CHF more than Bank A? Use exponential equations to solve!",
            app_pop: "🏙️ SCENARIO: Zurich Population Growth — In 2000, Zurich had 340,000 residents. The city grows at 1.2% per year (exponential growth). By 2020, the population reached 420,000. Urban planners need to predict: when will Zurich reach 500,000? This determines when to build new schools, trams, and housing. Use the formula: P(t) = P₀ × (1.012)^t. Solve for t when P(t) = 500,000.",
            app_carbon: "🦴 SCENARIO: Archaeological Dating — Archaeologists find a wooden tool in a Swiss cave. All living things contain Carbon-14 (¹⁴C), which decays with a half-life of 5,730 years. When the tree died, it stopped absorbing new ¹⁴C. By measuring how much ¹⁴C remains, scientists can calculate the age. If the tool has 25% of the original ¹⁴C, how old is it? Use: 0.25 = (1/2)^(t/5730). Solve for t using logarithms. This is how we know the age of ancient artifacts!"
        }
    },
    sm2_03: {
        back: "Back to Nexus",
        title: "SM2.03 // LINE NAVIGATOR",
        difficulty: {
            basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Target Intercept",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "SM2.03_LASER_MONITOR",
        footer_left: "SM2.03_LINE_NAVIGATOR // NODE: BASEL",
        labels: {
            input: "INPUT",
            hints: "HINTS",
            emitter: "Emitter",
            target: "Target",
            slope: "Cost per km (m)",
            intercept: "Base fare (c)"
        },
        prompts: {
            level1: "Calculate the ticket price for the given destination",
            level2: "Find the distance where two fare plans cost the same",
            level3: "Find the threshold distance where Plan A becomes cheaper"
        },
        hints: {
            level1: "Slope m = cost per km. Intercept c = base fare (standing charge). Total fare y = m × distance + c.",
            level2: "Two fare plans have different m and c. Find the intersection point — that's where they cost the same!",
            level3: "Design the slope and intercept so your plan is cheapest beyond a certain distance.",
            drag: "Adjust the slider to change the slope (cost/km) and intercept (base fare)."
        },
        ui: {
            current_function: "Fare Formula",
            reflections: "Fare Plans",
            target_position: "Destination (km)",
            hit_badge: "FARE MATCHED",
            chamber: "STATION",
            laser_sim: "FARE_CALC",
            level: "LEVEL",
            hits: "Matches"
        },
        mission: {
            title: "SWISS RAILWAY FARE CALCULATOR",
            description: "Model railway ticket prices as linear functions. Slope = cost per km, intercept = base fare. Find the break-even point between fare plans!"
        },
        stages: {
            level1: "LEVEL 1",
            level2: "LEVEL 2",
            level3: "LEVEL 3"
        }
    },
    sm2_04: {
        back: "Back to Nexus",
        title: "SM2.04 // SIMILARITY & SCALING",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Target",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "SM2.04_MONITOR",
        footer_left: "SM2.04_SIMILARITY // NODE: BASEL",
        stages: {
            scale_factor: "SCALE",
            similar_triangles: "SIMILAR",
            application: "APPLY",
            stages_prompt_latex: "Use proportionality to find the missing value."
        },
        labels: {
            input: "INPUT",
            hints: "HINTS"
        },
        hints: {
            rules: {
                proportional_latex: "\\frac{a}{b}=\\frac{c}{d}",
                scale_factor_latex: "\\text{Scale factor }k=\\frac{\\text{new}}{\\text{old}}",
                cross_multiply_latex: "\\text{Cross-multiply to solve for the unknown.}"
            }
        },
        mission: {
            title: "MISSION: SHADOW MEASURE",
            protocol: "NEXUS PROTOCOL // SWISS NODE LIVE",
            tower_title: "ZURICH CLOCK TOWER",
            description: "In Zurich, an architect needs to measure a historic clock tower using its shadow. Similar triangles are the key.",
            ring_title: "LUCERNE OBSERVATION RING",
            ring_desc: "In Lucerne, a concentric sensor ring is cut by a chord touching the inner circle. Find the ring width.",
            labels: {
                tower: "Clock Tower",
                tower_shadow: "Tower Shadow",
                stick: "Stick (1.5m)",
                stick_shadow: "Stick Shadow",
                calculate_height: "Calculate Tower Height"
            }
        }
    },
    sm2_01: {
        back: "← Back to Nexus",
        back_short: "Back to Nexus",
        title: "SM2.01 // BINOMIAL FACTORY",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        mode_1: "1st Formula: (a+b)²",
        mode_2: "2nd Formula: (a-b)²",
        param_a: "Parameter a",
        param_b: "Parameter b",
        lock: "LOCK PARAMETERS",
        unlock: "UNLOCK PARAMETERS",
        instruction_setup: "Adjust sliders to define lengths a and b.",
        instruction_solve: "Drag and snap areas to fill the target $(a+b)²$.",
        solve_success: "IDENTITY PROVED",
        solve_fail: "AREA MISMATCH",
        terms: {
            a2: "a²",
            b2: "b²",
            ab: "ab",
            target_plus: "(a+b)²",
            target_minus: "(a-b)²",
        },
        scenarios: {
            architect_title: "Scenario A: Garden Extension",
            architect_desc: "Your lakeside garden (a×a) is being extended by b meters on each side. Calculate the new total area.",
            architect_context: "You own a square garden plot by Lake Zurich with side length 'a' meters. The city allows you to extend it by 'b' meters on two sides. To buy the right amount of soil and seeds, you need to know the new total area. Notice: the total area is NOT simply a² + b² — the two rectangular strips and the corner square matter!",
            scrapper_title: "Scenario B: Tile Factory",
            scrapper_desc: "A factory produced tiles in three shapes. Reassemble them into a perfect square.",
            scrapper_context: "A Swiss tile factory produces three types of tiles: one large square (a²), two rectangular strips (a×b each), and one small square (b²). Your job is to verify that these four pieces can be perfectly assembled into a single large square of side (a+b). This proves the binomial identity geometrically.",
            speedster_title: "Scenario C: Mental Math Sprint",
            speedster_desc: "Compute large squares instantly by splitting them into (round + offset)².",
            speedster_context: "In a Swiss math olympiad, you need to square numbers like 103 or 47 in your head. The trick: split 103 into (100+3), then use (a+b)² = a² + 2ab + b² = 10000 + 600 + 9 = 10609. Much faster than multiplying 103×103 directly!",
            voyager_context: "Two square fields share a common boundary. One has side 'a', the other side 'b'. A surveyor measures the combined area vs the individual areas to verify the difference formula (a+b)(a-b) = a² - b².",
            architect_mission: "Task: Calculate the expanded garden area using (a+b)² = a² + 2ab + b².",
            scrapper_mission: "Task: Identify a and b from the expanded form and reconstruct the perfect square.",
            speedster_mission: "Task: Break the number into (round ± offset) and use binomial expansion to compute instantly.",
            voyager_mission: "Task: Use the difference of squares formula to find the area difference.",
            elite_mission: "Task: Factor the complex polynomial into binomial product form."
        },
        speedster_hint: "Use binomial expansion (a±b)² to simplify calculation",
        elite_tips_title: "TIPS: Binomial Isolation Strategy",
        elite_tips_target: "Target format:",
        scrapper_step01: "STEP 01: Isolate root (a)",
        active_objective: "Active Mission Objective",
        target_expression: "Target Identity Expression",
        params_config: "00 // Parameters Configuration",
        units: "UNITS",
        tabs: {
            explore: "EXPLORE",
            architect: "GARDEN",
            scrapper: "TILE LAB",
            speedster: "SPRINT",
            voyager: "VOYAGER",
            elite: "ELITE"
        },
        ui: {
            part_1_a2: "Part 1 (a²)",
            part_2_2ab: "Part 2 (2ab)",
            part_3_b2: "Part 3 (b²)",
            identify_root_a: "Identify Root a",
            identify_root_b: "Identify Root b",
            elite_step_1: "Step 1: Isolate Binomial Square",
            elite_step_2: "Step 2: Balance Equation",
            execute_next_sequence: "Next Question",
            continue_operation: "Continue Practice",
            logic_lattice_title: "Logic Lattice // Decomposition",
            logic_architect_step_1: "STEP_01: Distribute outer terms",
            logic_architect_step_2: "STEP_02: Expand partial segments",
            logic_scrapper_step_1: "STEP_01: Isolate root (a)",
            logic_scrapper_step_2: "STEP_02: Verify linear (2ab)",
            logic_voyager_axiom_title: "AXIOM: Conjugate Dualism",
            logic_voyager_axiom_body: "Product of (A+B)(A-B) eliminates linear cross-terms (±AB).",
            logic_voyager_derivation_title: "DERIVATION:",
            link_established: "LINK_ESTABLISHED",
            axiomatic_constraints_title: "Axiomatic Constraints",
            constraints_architect: "The corner 'b²' is the offset required to complete the major quadratic square. Its value is critical for blueprint precision.",
            constraints_scrapper: "Factoring decomposes global entropy back into ordered symbolic structures. Root isolation is the primary objective.",
            constraints_speedster: "Mental approximation relies on binary base decomposition. Shift the problem into a (Base+N)² framework.",
            constraints_elite: "Advanced Refactoring handles multi-dimensional coefficients where C is a composite scaling factor.",
            constraints_voyager: "Identity symmetry requires strict sign adherence. The difference represents the net loss of area in 1D projection.",
            visual_reference_position: "Visual_Reference_Position [FIX_REF.01]",
            status_operational: "STATUS: OPERATIONAL",
            fps: "FPS",
            latency: "LATENCY",
            footer_left: "SM2.01_ALGEBRA_SYNC // NODE: ZURICH",
            verified: "Verified",
            simulating: "Simulating",
        }
    },
    gm1_01: {
        back: "Back to Nexus",
        title: "GM1.01 // CALCULUS INTRO",
        tabs: {
            explore: "EXPLORE",
            slope: "SLOPE",
            tangent: "TANGENT",
            rate: "RATE",
            elite: "ELITE"
        },
        explore_title: "00 // Interactive Exploration",
        explore_instruction: "Drag the point P along the parabola y = x² and observe how the tangent line changes. The slope m represents the instantaneous rate of change.",
        explore_hint: "Drag point P in the visual monitor →",
        current_point: "Current Point",
        slope_label: "Tangent Slope",
        mission: {
            title: "DERIVATIVE ROAD SIMULATOR",
            description: "Master calculus by driving a car on mathematical curves. The derivative tells you the road's slope at each point. Match the car's angle to the road perfectly!"
        },
        spotlight: {
            title: "Scientist Spotlight",
            euler_name: "Leonhard Euler",
            euler_bio: "Basel-born master of analysis. Euler gave calculus its modern symbols and showed how motion, curves, and series can be governed by elegant laws.",
            bernoulli_name: "Johann Bernoulli",
            bernoulli_bio: "The Bernoulli dynasty forged calculus through challenge and rivalry. Johann advanced differential methods that map acceleration to form."
        },
        objective_title: "Active Mission Objective",
        target_title: "Target",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        hints_title: "Formula Reference",
        monitor_title: "GM1.01_VISUAL_MONITOR",
        status: "STATUS: OPERATIONAL",
        footer_left: "GM1.01_CALCULUS // NODE: BASEL",
        footer_right: "DERIVATIVE_SIMULATOR",
        stages: {
            intro: "INTRO",
            differentiation: "DERIVATIVES",
            application: "APPLICATIONS",
            power_rule: "POWER RULE",
            factor_rule: "FACTOR RULE",
            sum_rule: "SUM RULE",
            product_rule: "PRODUCT RULE",
            quotient_rule: "QUOTIENT RULE",
            chain_rule: "CHAIN RULE",
            intro_prompt_latex: "\\text{Calculate the derivative of }x^n.",
            differentiation_prompt_latex: "\\text{Apply the differentiation rules.}",
            application_prompt_latex: "\\text{Apply calculus to solve problems.}",
            power_rule_prompt_latex: "\\text{Calculate }f'(x)\\text{ at the given point.}",
            factor_rule_prompt_latex: "\\text{Calculate }f'(x)\\text{ using factor rule.}",
            sum_rule_prompt_latex: "\\text{Calculate }f'(x)\\text{ using sum rule.}",
            product_rule_prompt_latex: "\\text{Calculate }f'(x)\\text{ using product rule.}",
            quotient_rule_prompt_latex: "\\text{Calculate }f'(x)\\text{ using quotient rule.}",
            chain_rule_prompt_latex: "\\text{Calculate }f'(x)\\text{ using chain rule.}"
        },
        labels: {
            secant_slope: "Secant Slope m",
            tangent_slope: "Tangent Slope m",
            velocity: "Velocity v",
            x_coordinate: "x-coordinate",
            hints: "HINTS"
        },
        formulas: {
            power_rule: "f'(x) = n\\cdot x^{n-1}",
            factor_rule: "(a\\cdot f)' = a\\cdot f'",
            sum_rule: "(f+g)' = f' + g'",
            product_rule: "(uv)' = u'v + uv'",
            quotient_rule: "\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}",
            chain_rule: "\\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx}"
        },
        scenarios: {
            power_rule: "🚗 SCENARIO: Car Acceleration on a Hill — You're driving a Tesla up a curved hill. The road height follows h(x) = x². The derivative h'(x) tells you the road's steepness at each point. If you tilt the car at the wrong angle, it will scrape the ground or tip over! Calculate the correct slope (derivative) so the car's chassis aligns perfectly with the road surface. This is exactly how self-driving cars calculate terrain angles in real-time.",
            factor_rule: "🏗️ SCENARIO: Construction Scaling — An architect designs a building with height h(x) = x². When the city requires all dimensions to be scaled by factor 3, the new height becomes H(x) = 3x². The derivative tells you how the scaled building's slope changes. Use the factor rule: if f(x) = a·g(x), then f'(x) = a·g'(x). The constant factor 3 stays outside the derivative, making calculations easier!",
            sum_rule: "🌊 SCENARIO: Ocean Wave Superposition — Two ocean waves combine: wave A has height h₁(x) = x² and wave B has height h₂(x) = 3x. The total wave height is H(x) = x² + 3x. To predict how fast the combined wave rises, use the sum rule: (f + g)' = f' + g'. Calculate each wave's slope separately, then add them. This is how oceanographers predict tsunami wave behavior!",
            product_rule: "🌊 SCENARIO: Surfboard on a Wave — A surfer rides a wave described by h(x) = x·sin(x). The wave height depends on both position (x) and the sine wave pattern. To stay balanced, the surfer needs to know the wave's slope at each point. Use the product rule: if f(x) = u(x)·v(x), then f'(x) = u'·v + u·v'. This tells you how fast the wave is rising or falling, helping the surfer adjust their stance.",
            quotient_rule: "📊 SCENARIO: Stock Market Efficiency Ratio — A financial analyst tracks a company's efficiency ratio: profit(x) / cost(x). As market conditions change (x = time in months), both profit and cost change. To predict if efficiency is improving or declining, you need the derivative of this ratio. Use the quotient rule: if f(x) = u(x)/v(x), then f'(x) = [u'·v - u·v'] / v². This tells investors whether the company is becoming more or less efficient over time.",
            chain_rule: "⚙️ SCENARIO: Bicycle Gear System — You're cycling up a mountain. The pedal rotation creates a chain motion: pedal angle → chain speed → wheel rotation. If the chain wraps around the gear twice as fast (factor of 2), then f(x) = sin(2x). The chain rule tells you: if the outer function changes, multiply by the inner function's rate. This is how bicycle computers calculate your actual speed from pedal rotations!"
        },
        canvas: {
            title: "DERIVATIVE ROAD",
            subtitle_power: "f(x) = x²",
            subtitle_factor: "f(x) = ax²",
            subtitle_sum: "f(x) = x² + x",
            subtitle_product: "f(x) = x·sin(x)",
            subtitle_quotient: "f(x) = x/sin(x)",
            subtitle_chain: "f(x) = sin(2x)",
            x_label: "x",
            y_label: "f(x)",
            slope_label: "ROAD SLOPE",
            your_slope: "Your slope",
            correct_slope: "Correct slope",
            status_chamber: "CHAMBER",
            status_sim: "DERIVATIVE_SIM: ACTIVE",
            status_mode: "MODE"
        },
        integral_preview_title: "COMING SOON: INTEGRATION",
        integral_preview_desc: "Master the inverse operation of differentiation. Calculate areas under curves.",
        integral_preview_hint: "Unlock after mastering derivatives →"
    },
    gm1_01_advanced: {
        back: "Back to Nexus",
        title: "GM1.01-ADV // ADVANCED CALCULUS",
        monitor_title: "GM1.01_ADVANCED_MONITOR",
        footer_left: "GM1.01_ADVANCED // NODE: BASEL",
        check: "Verify",
        next: "Next Challenge",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        mission: {
            title: "ADVANCED DERIVATIVE CHALLENGES",
            description: "Master complex derivatives by combining multiple rules. Apply calculus to real-world problems."
        },
        challenges: {
            composite: "COMPOSITE",
            modeling: "MODELING",
            optimization: "OPTIMIZATION",
            analysis: "ANALYSIS"
        },
        scenarios: {
            composite_1: "🎢 SCENARIO: Roller Coaster Design — An engineer designs a roller coaster section where the height follows h(t) = (2t² + 3t)·sin(t). The velocity is the derivative h'(t). At t=2 seconds, calculate the velocity to ensure passenger safety. This requires both the product rule AND the power rule!",
            composite_2: "📡 SCENARIO: Signal Processing — A radio signal's amplitude is A(t) = (t² + 1)/sin(t). The rate of amplitude change is A'(t). At t=1 second, calculate this rate to adjust the receiver. This requires the quotient rule combined with power rule!",
            composite_3: "🌊 SCENARIO: Wave Interference — Two ocean waves combine: h(x) = (x³ - 2x)·cos(x). At x=1, find the rate of height change h'(1) to predict wave behavior. Use product rule with trigonometric functions!",
            modeling_1: "🚗 SCENARIO: Car Acceleration — A Tesla accelerates from rest. Its position is s(t) = 2t³ - 3t² + 5t meters. Find the velocity v(t) = s'(t) at t=3 seconds to check if it's within speed limits.",
            modeling_2: "🎈 SCENARIO: Balloon Launch — A weather balloon rises with height h(t) = -5t² + 20t + 2 meters. At t=2 seconds, calculate the velocity v(t) = h'(t) to ensure safe ascent rate.",
            optimization_1: "📦 SCENARIO: Box Design — A company makes boxes from rectangular cardboard. The area is A(x) = x(10-x). Find the value of x that maximizes the area for optimal material usage.",
            optimization_2: "💰 SCENARIO: Profit Maximization — A Basel bakery's daily profit is P(x) = -2x² + 12x - 10 (in hundreds of CHF), where x is production hours. Find x that maximizes profit.",
            analysis_1: "📊 SCENARIO: Market Analysis — A stock price follows f(x) = x³ - 3x² + 2. Find all critical points (where f'(x) = 0) to identify potential buy/sell moments.",
            analysis_2: "🚀 SCENARIO: Rocket Trajectory — A rocket's height is f(x) = 2x³ - 6x + 1. At x=1, find the second derivative f''(1) to determine if the rocket is accelerating or decelerating."
        },
        questions: {
            find_derivative: "Calculate the derivative at the given point",
            find_velocity: "Calculate velocity v(t) = s'(t)",
            find_acceleration: "Calculate acceleration a(t) = v'(t)",
            find_maximum: "Find the value that maximizes the function",
            find_critical_point: "Find the critical point (where derivative = 0)",
            find_critical_points: "Find all critical points (where f'(x) = 0)"
        },
        hints: {
            use_product_rule: "Use product rule: (uv)' = u'v + uv'. First find u' and v' separately.",
            use_quotient_rule: "Use quotient rule: (u/v)' = (u'v - uv')/v². Remember to square the denominator!",
            use_chain_rule: "Use chain rule: (f(g(x)))' = f'(g(x))·g'(x). Work from outside to inside.",
            take_first_derivative: "Take the first derivative: if s(t) is position, then v(t) = s'(t) is velocity.",
            take_second_derivative: "First find f'(x), then differentiate again to get f''(x).",
            set_derivative_zero: "Set f'(x) = 0 and solve for x. This gives critical points where function may have max/min."
        },
        function_label: "FUNCTION",
        question_label: "CHALLENGE",
        hint_label: "STRATEGY",
        visualization_title: "FUNCTION GRAPH",
        visualization: {
            title: "FUNCTION VISUALIZATION",
            x_label: "x",
            y_label: "f(x)",
            function_label: "FUNCTION",
            point_label: "POINT"
        },
        progress: "Progress"
    },
    gm2_01: {
        back: "Back to Nexus",
        title: "GM2.01 // VECTOR PILOT 3D",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Vector HUD",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "GM2.01_VECTOR_HUD",
        footer_left: "GM2.01_VECTOR_PILOT // NODE: BASEL",
        stages: {
            navigation: "NAVIGATION",
            dot: "DOT PRODUCT",
            mission: "MISSION",
            navigation_prompt_latex: "\\text{Compute }\\vec v\\text{ from A to B and its magnitude.}",
            dot_prompt_latex: "\\text{Compute }\\vec v\\text{ and }\\vec v\\cdot\\vec w.",
            mission_prompt_latex: "\\text{Mission: compute }\\vec v,\\;\\vec v\\cdot\\vec s,\\;|\\vec v|."
        },
        labels: {
            input: "INPUT"
        },
        mission: {
            title: "MISSION: RHINE AIRSPACE",
            description: "Navigate a drone corridor above the Rhine. Enter the 3D vector and validate alignment with dot products."
        },
        scenarios: {
            navigation: "Basel Drone Delivery Network: You are programming the navigation system for Basel's autonomous medical supply drones. The drones must calculate precise 3D vectors between hospital rooftops and delivery points across the city. Given coordinates A (departure helipad at Basel University Hospital) and B (arrival point at Claraspital), compute the displacement vector v and its magnitude. The magnitude represents the direct flight distance in meters. Accurate vector calculation is critical for battery management and flight time estimation.",
            dot: "Solar Panel Optimization at Roche Tower: The Roche Tower in Basel is installing adjustable solar panels on its facade. Each panel's orientation is represented by a normal vector v, and the sun's direction at noon is vector w. The dot product v·w determines how much sunlight the panel receives - maximum when parallel (dot product = |v||w|), zero when perpendicular. Calculate the dot product to determine the optimal panel angle. Engineers use this to maximize energy capture throughout the day.",
            mission: "Rhine Navigation System: Basel Port Authority is developing an automated barge navigation system for the Rhine River. A cargo barge must travel from point A (current position) to point B (destination dock). The river current is represented by vector s. Calculate: (1) displacement vector v from A to B, (2) dot product v·s to determine if the current helps or hinders (positive = helps, negative = hinders, zero = perpendicular), and (3) magnitude |v| for the direct distance. This data optimizes fuel consumption and arrival time predictions."
        }
    },
    gm3_01: {
        back: "Back to Nexus",
        title: "GM3.01 // PROBABILITY VAULT",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Probability Matrix",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "GM3.01_PROBABILITY_MONITOR",
        footer_left: "GM3.01_PROBABILITY_VAULT // NODE: BASEL",
        stages: {
            basic_prob: "BASIC PROBABILITY",
            binomial: "BINOMIAL",
            conditional: "CONDITIONAL",
            mission: "MISSION",
            basic_prob_prompt_latex: "\\text{Calculate the probability }P(E).",
            binomial_prompt_latex: "\\text{Calculate }P(X=k)\\text{ for binomial distribution.}",
            conditional_prompt_latex: "\\text{Calculate the conditional probability }P(A|B).",
            mission_prompt_latex: "\\text{Mission: Calculate the probability }P."
        },
        labels: {
            input: "INPUT",
            hints: "HINTS"
        },
        mission: {
            title: "MISSION: BASEL PROBABILITY LAB",
            description: "Apply probability theory to real-world scenarios in Basel. Calculate probabilities for quality control, insurance, and lottery systems."
        },
        scenarios: {
            basic_prob: "Basel Quality Control at Novartis: You are working in the quality control department at Novartis pharmaceutical manufacturing in Basel. Each batch of medication undergoes random sampling inspection. Given that a sample contains a certain number of favorable outcomes (passing quality tests) out of total samples, calculate the probability P(E) that a randomly selected item passes inspection. This probability determines whether the entire batch is approved for distribution to Swiss hospitals.",
            binomial: "Swiss Lottery System Analysis: The Swiss Lotto operates from Basel headquarters. In each draw, players select numbers with a fixed probability p of matching. For n independent trials (lottery draws), calculate the probability P(X=k) of exactly k successes using the binomial distribution formula: P(X=k) = C(n,k) × p^k × (1-p)^(n-k). This helps lottery officials predict payout frequencies and set prize structures for Swiss players.",
            conditional: "Basel Insurance Risk Assessment: Basler Versicherungen (Basel Insurance) needs to calculate conditional probabilities for risk assessment. Given P(A) = probability of an event occurring, P(B) = probability of a condition being met, and P(A∩B) = probability of both occurring, calculate P(A|B) = P(A∩B)/P(B). This conditional probability helps determine insurance premiums for Basel residents based on specific risk factors.",
            mission: "Basel Integrated Probability Mission: You are consulting for multiple Basel companies - Novartis (pharmaceuticals), Swiss Lotto (lottery), and Basler Versicherungen (insurance). Each company presents a different probability problem: basic probability for quality control, binomial distribution for lottery analysis, or conditional probability for insurance risk. Apply the appropriate probability formula to solve each company's specific challenge and provide accurate probability calculations."
        },
        problems: {
            // BASIC PROBABILITY - BASIC
            // BASIC_PROB - BASIC: Direct sample space
            single_die_one: "You roll a standard six-sided die once. What is the probability of rolling exactly a 1?\n\nGiven: 1 favorable outcome, 6 total outcomes\nFind: P(E) = favorable / total\nConcept: Direct observation of sample space",
            single_die_odd: "You roll a standard six-sided die once. What is the probability of rolling an odd number (1, 3, or 5)?\n\nGiven: 3 favorable outcomes (1, 3, 5), 6 total outcomes\nFind: P(E) = favorable / total\nConcept: Direct observation",
            coin_heads: "You flip a fair coin once. What is the probability of getting heads?\n\nGiven: 1 favorable outcome (heads), 2 total outcomes\nFind: P(E) = favorable / total\nConcept: Simplest sample space",
            spinner_8_sections: "You spin a wheel divided into 8 equal sections numbered 1-8. What is the probability of landing on section 3?\n\nGiven: 1 favorable outcome, 8 total outcomes\nFind: P(E) = favorable / total\nConcept: Direct observation",

            // BASIC_PROB - CORE: Understanding combinations
            two_dice_sum_7: "You roll two standard dice. What is the probability that their sum equals 7?\n\nGiven: 6 favorable outcomes (1+6, 2+5, 3+4, 4+3, 5+2, 6+1), 36 total outcomes\nFind: P(E) = favorable / total\nConcept: Understanding that (1,6) and (6,1) are different outcomes",
            two_dice_sum_10: "You roll two standard dice. What is the probability that their sum equals 10?\n\nGiven: 3 favorable outcomes (4+6, 5+5, 6+4), 36 total outcomes\nFind: P(E) = favorable / total\nConcept: Counting combinations correctly",
            two_dice_sum_gt_7: "You roll two standard dice. What is the probability that their sum is greater than 7?\n\nGiven: 15 favorable outcomes (sum of 8,9,10,11,12), 36 total outcomes\nFind: P(E) = favorable / total\nConcept: Counting multiple favorable outcomes",
            deck_one_suit: "You draw one card from a standard 52-card deck. What is the probability of drawing a heart?\n\nGiven: 13 hearts, 52 total cards\nFind: P(E) = favorable / total\nConcept: Understanding suit structure",
            deck_honors: "You draw one card from a standard 52-card deck. What is the probability of drawing an honor card (A, K, Q, or J)?\n\nGiven: 16 honor cards (4 of each rank), 52 total cards\nFind: P(E) = favorable / total\nConcept: Counting across all suits",

            // BASIC_PROB - ADVANCED: Conditional probability (implicit)
            die_even_given_gt3: "You roll a die and observe that the result is greater than 3. What is the probability that it's an even number?\n\nGiven: Among outcomes {4,5,6}, two are even {4,6}\nFind: P(even | >3) = 2/3\nConcept: The condition '>3' changes the sample space from 6 to 3 outcomes",
            die_multiple_of_3: "You roll a standard die. What is the probability of rolling a multiple of 3?\n\nGiven: 2 favorable outcomes (3, 6), 6 total outcomes\nFind: P(E) = 2/6\nConcept: Identifying favorable outcomes with a condition",
            card_face_given_spade: "You draw a card and it's a spade. What is the probability it's a face card (J, Q, K)?\n\nGiven: Among 13 spades, 3 are face cards\nFind: P(face | spade) = 3/13\nConcept: Conditional probability within a suit",
            card_not_face_not_ace: "You draw a card from a standard deck. What is the probability it's neither a face card nor an ace?\n\nGiven: 52 total - 12 face cards - 4 aces = 36 favorable, 52 total\nFind: P(E) = 36/52\nConcept: Using complement to count",
            card_king_given_face: "You draw a card and it's a face card. What is the probability it's a King?\n\nGiven: Among 12 face cards (J,Q,K of 4 suits), 4 are Kings\nFind: P(King | face) = 4/12\nConcept: Conditional probability within face cards",
            // BASIC_PROB - ELITE: Compound events
            at_least_one_six_two_dice: "You roll two dice. What is the probability that at least one shows a 6?\n\nGiven: Use complement - P(at least one 6) = 1 - P(no 6)\nP(no 6) = (5/6) × (5/6) = 25/36\nFind: P(E) = 1 - 25/36 = 11/36\nConcept: Using complement for 'at least one'",
            sum_not_2_or_12: "You roll two dice. What is the probability that the sum is neither 2 nor 12?\n\nGiven: P(sum=2) = 1/36, P(sum=12) = 1/36\nFavorable = 36 - 1 - 1 = 34\nFind: P(E) = 34/36\nConcept: Using complement for 'neither...nor'",
            at_least_one_even: "You roll two dice. What is the probability that at least one shows an even number?\n\nGiven: P(both odd) = (3/6) × (3/6) = 9/36\nFind: P(at least one even) = 1 - 9/36 = 27/36\nConcept: Complement strategy",
            card_ace_or_king: "You draw one card. What is the probability it's an Ace OR a King?\n\nGiven: 4 Aces + 4 Kings = 8 favorable, 52 total\nFind: P(A or K) = 8/52\nConcept: Addition principle for mutually exclusive events",
            card_red_or_face: "You draw one card. What is the probability it's red OR a face card?\n\nGiven: 26 red + 12 face - 6 (red face) = 32 favorable\nFind: P(red or face) = 32/52\nConcept: Addition principle with overlap (inclusion-exclusion)",

            // BASIC PROBABILITY - ELITE
            quality_control_427: "Novartis Basel large-scale quality control: In a production run of 500 medication samples, 427 passed all comprehensive safety and efficacy tests. Calculate the probability that a randomly selected sample from this production run passes all tests.\n\nGiven: 427 samples passed, 500 total samples\nFind: P(E) = favorable / total\nSignificance: This probability determines whether 50,000 units can be released to European markets.",
            quality_control_683: "Novartis Basel large-scale quality control: In a production run of 800 medication samples, 683 passed all tests. Calculate P(E).\n\nGiven: 683 samples passed, 800 total samples\nFind: P(E) = favorable / total",
            quality_control_891: "Novartis Basel large-scale quality control: In a production run of 1000 medication samples, 891 passed all tests. Calculate P(E).\n\nGiven: 891 samples passed, 1000 total samples\nFind: P(E) = favorable / total",
            quality_control_1456: "Novartis Basel large-scale quality control: In a production run of 1600 medication samples, 1456 passed all tests. Calculate P(E).\n\nGiven: 1456 samples passed, 1600 total samples\nFind: P(E) = favorable / total",
            quality_control_1789: "Novartis Basel large-scale quality control: In a production run of 2000 medication samples, 1789 passed all tests. Calculate P(E).\n\nGiven: 1789 samples passed, 2000 total samples\nFind: P(E) = favorable / total",

            // BINOMIAL - BASIC: Understanding basic concept
            coin_3_2: "You flip a fair coin 3 times. What is the probability of getting exactly 2 heads?\n\nGiven: n=3 trials, k=2 successes, p=0.5\nFind: P(X=2) = C(3,2) × 0.5² × 0.5¹\nConcept: Understanding 'exactly k successes'",
            coin_4_2: "You flip a fair coin 4 times. What is the probability of getting exactly 2 heads?\n\nGiven: n=4 trials, k=2 successes, p=0.5\nFind: P(X=2) = C(4,2) × 0.5² × 0.5²\nConcept: Basic binomial calculation",
            coin_3_all: "You flip a fair coin 3 times. What is the probability of getting all heads?\n\nGiven: n=3 trials, k=3 successes, p=0.5\nFind: P(X=3) = C(3,3) × 0.5³ × 0.5⁰\nConcept: Understanding C(n,n) = 1",
            coin_4_none: "You flip a fair coin 4 times. What is the probability of getting no heads (all tails)?\n\nGiven: n=4 trials, k=0 successes, p=0.5\nFind: P(X=0) = C(4,0) × 0.5⁰ × 0.5⁴\nConcept: Understanding C(n,0) = 1",

            // BINOMIAL - CORE: Understanding C(n,k) meaning
            lottery_5_3: "Swiss Lotto: You play 5 lottery draws with 50% win probability each. What is the probability of winning exactly 3 times?\n\nGiven: n=5, k=3, p=0.5\nFind: P(X=3) = C(5,3) × 0.5³ × 0.5²\nConcept: C(5,3) = 10 represents the 10 different ways to choose which 3 draws you win",
            lottery_6_3: "Swiss Lotto: You play 6 draws with 50% win probability. What is the probability of winning exactly 3 times?\n\nGiven: n=6, k=3, p=0.5\nFind: P(X=3), where C(6,3) = 20\nConcept: Understanding why we multiply by C(n,k)",
            lottery_5_2: "Swiss Lotto: You play 5 draws with 50% win probability. What is the probability of winning exactly 2 times?\n\nGiven: n=5, k=2, p=0.5\nFind: P(X=2), where C(5,2) = 10\nConcept: Binomial coefficient represents arrangements",
            lottery_6_4: "Swiss Lotto: You play 6 draws with 50% win probability. What is the probability of winning exactly 4 times?\n\nGiven: n=6, k=4, p=0.5\nFind: P(X=4), where C(6,4) = 15\nConcept: Counting favorable arrangements",
            lottery_7_3: "Swiss Lotto: You play 7 draws with 50% win probability. What is the probability of winning exactly 3 times?\n\nGiven: n=7, k=3, p=0.5\nFind: P(X=3), where C(7,3) = 35\nConcept: Larger n means more arrangements",

            // BINOMIAL - ADVANCED: Asymmetric probability (p ≠ 0.5)
            lottery_5_3_biased: "Swiss Lotto: You play 5 draws with 60% win probability per draw. What is the probability of winning exactly 3 times?\n\nGiven: n=5, k=3, p=0.6 (biased probability)\nFind: P(X=3) = C(5,3) × 0.6³ × 0.4²\nConcept: Distribution is skewed when p ≠ 0.5",
            lottery_6_2_low: "Swiss Lotto: You play 6 draws with only 30% win probability per draw. What is the probability of winning exactly 2 times?\n\nGiven: n=6, k=2, p=0.3 (low probability)\nFind: P(X=2) = C(6,2) × 0.3² × 0.7⁴\nConcept: Low p means distribution skewed left",
            lottery_8_6_high: "Swiss Lotto: You play 8 draws with 70% win probability per draw. What is the probability of winning exactly 6 times?\n\nGiven: n=8, k=6, p=0.7 (high probability)\nFind: P(X=6) = C(8,6) × 0.7⁶ × 0.3²\nConcept: High p means distribution skewed right",
            lottery_7_4_biased: "Swiss Lotto: You play 7 draws with 60% win probability. What is the probability of winning exactly 4 times?\n\nGiven: n=7, k=4, p=0.6\nFind: P(X=4)\nConcept: Understanding asymmetric distributions",
            lottery_10_7_biased: "Swiss Lotto: You play 10 draws with 65% win probability. What is the probability of winning exactly 7 times?\n\nGiven: n=10, k=7, p=0.65\nFind: P(X=7)\nConcept: Calculating with non-standard probabilities",

            // BINOMIAL - ELITE: Cumulative probability
            at_least_3_of_5: "Swiss Lotto: You play 5 draws with 60% win probability. What is the probability of winning AT LEAST 3 times?\n\nGiven: n=5, k≥3, p=0.6\nFind: P(X≥3) = P(X=3) + P(X=4) + P(X=5)\nConcept: Cumulative probability - sum multiple outcomes",
            at_most_4_of_6: "Swiss Lotto: You play 6 draws with 50% win probability. What is the probability of winning AT MOST 4 times?\n\nGiven: n=6, k≤4, p=0.5\nFind: P(X≤4) = P(X=0) + P(X=1) + P(X=2) + P(X=3) + P(X=4)\nConcept: Or use 1 - P(X>4) = 1 - P(X=5) - P(X=6)",
            more_than_half: "Swiss Lotto: You play 8 draws with 60% win probability. What is the probability of winning MORE THAN HALF the time?\n\nGiven: n=8, k>4, p=0.6\nFind: P(X>4) = P(X=5) + P(X=6) + P(X=7) + P(X=8)\nConcept: Understanding 'more than half' means k≥5",
            at_least_7_of_10: "Swiss Lotto: You play 10 draws with 70% win probability. What is the probability of winning AT LEAST 7 times?\n\nGiven: n=10, k≥7, p=0.7\nFind: P(X≥7) = P(X=7) + P(X=8) + P(X=9) + P(X=10)\nConcept: Cumulative probability with high p",
            at_least_8_of_12: "Swiss Lotto: You play 12 draws with 60% win probability. What is the probability of winning AT LEAST 8 times?\n\nGiven: n=12, k≥8, p=0.6\nFind: P(X≥8) = sum from k=8 to 12\nConcept: Multiple terms in cumulative probability",

            // CONDITIONAL - BASIC
            insurance_basic_1: "Basler Versicherungen (Basel Insurance): For a simple insurance case, we know P(A) = 0.5 (probability of claim), P(B) = 0.6 (probability of risk factor present), and P(A∩B) = 0.3 (probability of both). Calculate P(A|B), the probability of a claim given the risk factor is present.\n\nGiven: P(A) = 0.5, P(B) = 0.6, P(A∩B) = 0.3\nFind: P(A|B) = P(A∩B) / P(B)\nSignificance: Determines insurance premiums for Basel residents.",
            insurance_basic_2: "Basler Versicherungen: Given P(A) = 0.4, P(B) = 0.5, P(A∩B) = 0.2, calculate P(A|B).\n\nGiven: P(A) = 0.4, P(B) = 0.5, P(A∩B) = 0.2\nFind: P(A|B) = P(A∩B) / P(B)",
            insurance_basic_3: "Basler Versicherungen: Given P(A) = 0.6, P(B) = 0.7, P(A∩B) = 0.4, calculate P(A|B).\n\nGiven: P(A) = 0.6, P(B) = 0.7, P(A∩B) = 0.4\nFind: P(A|B) = P(A∩B) / P(B)",
            insurance_basic_4: "Basler Versicherungen: Given P(A) = 0.3, P(B) = 0.4, P(A∩B) = 0.15, calculate P(A|B).\n\nGiven: P(A) = 0.3, P(B) = 0.4, P(A∩B) = 0.15\nFind: P(A|B) = P(A∩B) / P(B)",

            // CONDITIONAL - CORE: Extracting condition from description
            card_heart_given_red: "You draw a card and observe it's red. What is the probability it's a heart?\n\nGiven: P(heart) = 13/52, P(red) = 26/52, P(heart AND red) = 13/52\nFind: P(heart|red) = (13/52) / (26/52) = 13/26 = 0.5\nConcept: Identifying condition from description",
            die_six_given_even: "You roll a die and observe it's even. What is the probability it's a 6?\n\nGiven: P(6) = 1/6, P(even) = 3/6, P(6 AND even) = 1/6\nFind: P(6|even) = (1/6) / (3/6) = 1/3\nConcept: Condition changes sample space",
            card_face_given_red: "You draw a card and it's red. What is the probability it's a face card?\n\nGiven: P(face) = 12/52, P(red) = 26/52, P(face AND red) = 6/52\nFind: P(face|red) = 6/26\nConcept: Extracting probabilities from card structure",
            die_one_given_odd: "You roll a die and it's odd. What is the probability it's a 1?\n\nGiven: P(1) = 1/6, P(odd) = 3/6, P(1 AND odd) = 1/6\nFind: P(1|odd) = (1/6) / (3/6) = 1/3\nConcept: Understanding conditional sample space",
            card_spade_given_black: "You draw a card and it's black. What is the probability it's a spade?\n\nGiven: P(spade) = 13/52, P(black) = 26/52, P(spade AND black) = 13/52\nFind: P(spade|black) = 13/26 = 0.5\nConcept: Symmetry in conditional probability",

            // CONDITIONAL - ADVANCED: Bayesian thinking
            disease_test_positive: "A disease affects 1% of the population. A test is 90% accurate (detects disease when present). If you test positive, what's the probability you actually have the disease?\n\nGiven: P(disease) = 0.01, P(positive|disease) = 0.9, P(positive|no disease) = 0.1\nP(positive) = 0.01×0.9 + 0.99×0.1 = 0.108\nFind: P(disease|positive) = (0.01×0.9) / 0.108 = 0.083\nConcept: P(A|B) ≠ P(B|A) - Bayesian reversal",
            disease_test_positive_2: "A rare disease affects 2% of population. Test is 80% accurate. If positive, what's P(disease)?\n\nGiven: P(disease) = 0.02, P(+|disease) = 0.8\nFind: P(disease|+) using Bayes' theorem\nConcept: Understanding false positives",
            quality_defect_given_batch: "15% of products are defective. A batch test detects 80% of defects. If batch fails, what's P(defective)?\n\nGiven: P(defect) = 0.15, P(fail|defect) = 0.8\nFind: P(defect|fail)\nConcept: Bayesian inference in quality control",
            fraud_given_alert: "5% of transactions are fraudulent. Alert system catches 80% of fraud. If alert triggers, what's P(fraud)?\n\nGiven: P(fraud) = 0.05, P(alert|fraud) = 0.8\nFind: P(fraud|alert)\nConcept: Understanding alarm reliability",
            accident_given_weather: "10% of days have accidents. 80% of accident days have bad weather. If bad weather, what's P(accident)?\n\nGiven: P(accident) = 0.1, P(bad weather|accident) = 0.8\nFind: P(accident|bad weather)\nConcept: Reversing conditional probability",

            // CONDITIONAL - ELITE: Independence testing
            independence_test_1: "Events A and B have P(A)=0.4, P(B)=0.5, P(A∩B)=0.2. Are A and B independent?\n\nGiven: P(A)=0.4, P(B)=0.5, P(A∩B)=0.2\nTest: If independent, P(A∩B) should equal P(A)×P(B) = 0.4×0.5 = 0.2 ✓\nFind: P(A|B) = 0.2/0.5 = 0.4 = P(A) ✓\nConcept: A and B are INDEPENDENT",
            independence_test_2: "Events A and B have P(A)=0.3, P(B)=0.6, P(A∩B)=0.18. Are they independent?\n\nGiven: P(A)=0.3, P(B)=0.6, P(A∩B)=0.18\nTest: P(A)×P(B) = 0.3×0.6 = 0.18 ✓\nFind: P(A|B) = 0.18/0.6 = 0.3 = P(A) ✓\nConcept: Testing independence",
            multiple_condition_1: "P(A)=0.25, P(B)=0.4, P(A∩B)=0.15. Find P(A|B) and determine if independent.\n\nGiven: P(A)=0.25, P(B)=0.4, P(A∩B)=0.15\nFind: P(A|B) = 0.15/0.4 = 0.375\nTest: P(A|B) = 0.375 ≠ P(A) = 0.25\nConcept: NOT independent - condition changes probability",
            independence_test_3: "P(A)=0.35, P(B)=0.7, P(A∩B)=0.245. Are A and B independent?\n\nGiven: P(A)=0.35, P(B)=0.7, P(A∩B)=0.245\nTest: P(A)×P(B) = 0.35×0.7 = 0.245 ✓\nFind: P(A|B) = 0.245/0.7 = 0.35 = P(A) ✓\nConcept: Independence verification",
            multiple_condition_2: "P(A)=0.2, P(B)=0.5, P(A∩B)=0.12. Find P(A|B) and test independence.\n\nGiven: P(A)=0.2, P(B)=0.5, P(A∩B)=0.12\nFind: P(A|B) = 0.12/0.5 = 0.24\nTest: P(A|B) = 0.24 ≠ P(A) = 0.2\nConcept: NOT independent",

            // MISSION - Mixed problems (reuse context keys from above stages)
            mission_basic_1: "Novartis Mission: Roll a die once. What is the probability of rolling a 1?\n\nGiven: 1 favorable, 6 total\nFind: P(E)",
            mission_basic_2: "Swiss Lotto Mission: Flip a coin 3 times. What is the probability of exactly 2 heads?\n\nGiven: n=3, k=2, p=0.5\nFind: P(X=2)",
            mission_basic_3: "Insurance Mission: Given P(A)=0.5, P(B)=0.6, P(A∩B)=0.3, find P(A|B).\n\nGiven: P(A)=0.5, P(B)=0.6, P(A∩B)=0.3\nFind: P(A|B)",
            mission_basic_4: "Novartis Mission: Roll a die. What is the probability of rolling an even number?\n\nGiven: 2 favorable (2,4,6), 6 total\nFind: P(E)",

            mission_core_1: "Novartis Mission: Draw a card from a 52-card deck. What is the probability of drawing a heart?\n\nGiven: 13 favorable, 52 total\nFind: P(E)",
            mission_core_2: "Swiss Lotto Mission: Play 6 lottery draws with 50% win probability. What is P(X=4)?\n\nGiven: n=6, k=4, p=0.5\nFind: P(X=4)",
            mission_core_3: "Insurance Mission: Given P(A)=0.45, P(B)=0.55, P(A∩B)=0.25, find P(A|B).\n\nGiven: P(A)=0.45, P(B)=0.55, P(A∩B)=0.25\nFind: P(A|B)",
            mission_core_4: "Novartis Mission: Draw a card. What is the probability of drawing a red card?\n\nGiven: 26 favorable, 52 total\nFind: P(E)",
            mission_core_5: "Swiss Lotto Mission: Play 5 draws with 60% win probability. What is P(X=3)?\n\nGiven: n=5, k=3, p=0.6\nFind: P(X=3)",

            mission_adv_1: "Novartis Mission: In 100 samples, 85 passed. Calculate P(E).\n\nGiven: 85 favorable, 100 total\nFind: P(E)",
            mission_adv_2: "Swiss Lotto Mission: In 10 draws with 50% win probability, calculate P(X=6).\n\nGiven: n=10, k=6, p=0.5\nFind: P(X=6)",
            mission_adv_3: "Insurance Mission: Given P(A)=0.37, P(B)=0.63, P(A∩B)=0.21, find P(A|B).\n\nGiven: P(A)=0.37, P(B)=0.63, P(A∩B)=0.21\nFind: P(A|B)",
            mission_adv_4: "Novartis Mission: In 120 samples, 92 passed. Calculate P(E).\n\nGiven: 92 favorable, 120 total\nFind: P(E)",
            mission_adv_5: "Swiss Lotto Mission: In 8 draws with 60% win probability, calculate P(X=5).\n\nGiven: n=8, k=5, p=0.6\nFind: P(X=5)",

            mission_elite_1: "Novartis Mission: In 500 samples, 427 passed. Calculate P(E).\n\nGiven: 427 favorable, 500 total\nFind: P(E)",
            mission_elite_2: "Swiss Lotto Mission: In 15 draws with 55% win probability, calculate P(X=9).\n\nGiven: n=15, k=9, p=0.55\nFind: P(X=9)",
            mission_elite_3: "Insurance Mission: Given P(A)=0.365, P(B)=0.625, P(A∩B)=0.215, find P(A|B).\n\nGiven: P(A)=0.365, P(B)=0.625, P(A∩B)=0.215\nFind: P(A|B)",
            mission_elite_4: "Novartis Mission: In 800 samples, 683 passed. Calculate P(E).\n\nGiven: 683 favorable, 800 total\nFind: P(E)",
            mission_elite_5: "Swiss Lotto Mission: In 18 draws with 60% win probability, calculate P(X=11).\n\nGiven: n=18, k=11, p=0.6\nFind: P(X=11)"
        }
    },
    sm2_06: {
        back: "Back to Nexus",
        title: "SM2.06 // LINEAR SYSTEMS",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "System of Equations",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "SM2.06_MONITOR",
        footer_left: "SM2.06_LINEAR_SYSTEMS // NODE: BASEL",
        stages: {
            substitution: "SUBSTITUTION",
            elimination: "ELIMINATION",
            mission: "MISSION",
            substitution_prompt_latex: "\\text{Solve by substitution method.}",
            elimination_prompt_latex: "\\text{Solve by elimination (addition/subtraction).}",
            mission_prompt_latex: "\\text{Translate and solve the word problem.}"
        },
        labels: {
            input: "INPUT",
            hints: "HINTS"
        },
        hints: {
            rules: {
                substitution_latex: "\\text{Substitute one equation into the other.}",
                elimination_add_latex: "\\text{Add equations to eliminate a variable.}",
                elimination_sub_latex: "\\text{Subtract equations to eliminate a variable.}",
                elimination_multiply_latex: "\\text{Multiply one equation to match coefficients, then eliminate.}"
            }
        },
        mission: {
            apples: "Apples",
            oranges: "Oranges",
            adult: "Adults",
            child: "Children"
        }
    },
    sm2_05: {
        back: "Back to Nexus",
        title: "SM2.05 // POWERS & ROOTS",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Operation",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "SM2.05_MONITOR",
        footer_left: "SM2.05_POWERS_ROOTS // NODE: BASEL",
        stages: {
            rules: "LAWS",
            negative: "NEGATIVE",
            scientific: "SCI-NOTATION",
            rules_prompt_latex: "\\text{Apply power laws to simplify.}",
            negative_prompt_latex: "\\text{Simplify terms with negative exponents (find n in the denominator).}",
            scientific_prompt_latex: "\\text{Convert to or calculate in scientific notation.}"
        },
        labels: {
            input: "INPUT",
            hints: "HINTS"
        }
    },
    sm1_01: {
        back: "Back to Nexus",
        title: "SM1.01 // AREAS & VOLUMES",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Geometry Task",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "SM1.01_MONITOR",
        footer_left: "SM1.01_GEOMETRY // NODE: BASEL",
        stages: {
            areas: "AREAS",
            volumes: "VOLUMES",
            complex: "COMPLEX",
            areas_prompt_latex: "\\text{Read the scenario and calculate the required area.}",
            volumes_prompt_latex: "\\text{Read the scenario and calculate the required volume.}"
        },

        mission: {
            title: "MISSION: RHINE FLOOD GATE",
            protocol: "Nexus Protocol // Node Geneva",
            description: "In Basel, engineers model a Rhine flood gate cross-section as a trapezoid.",
            cube_title: "CERN CUBE VAULT",
            cube_desc: "In CERN, identify the space diagonal of a cubic vault and compute its length."
        },
        labels: {
            input: "INPUT",
            hints: "HINTS",
            length: "Length",
            width: "Width",
            height: "Height",
            base: "Base",
            radius: "Radius",
            side: "Side",
            area: "Area",
            volume: "Volume",
            calculate_area: "Calculate the area.",
            calculate_volume: "Calculate the volume.",
        },
        quests: {
            ski: "An Alpine ski slope needs new snow. The slope is rectangular.",
            sail: "The Zurich Sailing Club needs custom canvas. The sail is triangular.",
            gate: "A Rhine flood gate cross-section is trapezoidal.",
            cheese: "A circular mold for Gruyère cheese factory.",
            attic: "A Swiss chalet attic is a cubic space, needing an air purifier.",
            crate: "CERN lab needs a storage box for precision instruments.",
            pylon: "St. Moritz ski cable pylons are cylindrical.",

            // Structural Templates
            rect_core: "The width is ${w}, and the length is ${diff} more than the width.",
            rect_advanced: "The length is ${l}, and the width is exactly half of the length.",
            rect_elite: "The total perimeter is ${p}, and the length is ${ratio} times the width.",
            tri_elite: "An isosceles right-angled sail with a hypotenuse of ${c}.",
            circle_elite: "The total circumference of the mold is ${c}.",
            cube_elite: "The total surface area of the cubic space is ${sa}.",
            prism_elite: "The base is a square with perimeter ${p}, and the height is ${h}.",
            cyl_elite: "The lateral surface area is ${la}, and the radius is ${r}."
        },
    },
    em1_01: {
        back: "Back to Nexus",
        title: "EM1.01 // THALES TOWER",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        objective_title: "Active Mission Objective",
        target_title: "Tower Height",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "EM1.01_THALES_MONITOR",
        footer_left: "EM1.01_THALES_TOWER // NODE: BASEL",
        stages: {
            measure: "MEASURE"
        },
        measure_prompt_latex: "\\text{Use }\\frac{h}{H}=\\frac{l}{L}\\text{ to solve tower height.}",
        labels: {
            input: "INPUT",
            hints: "HINTS",
            readings: "READINGS",
            pole_height: "Pole Height (h)",
            pole_shadow: "Pole Shadow (l)",
            tower_shadow: "Tower Shadow (L)",
            sun_angle: "Sun Angle",
            solve_height: "Solve Tower Height (H)",
            height_placeholder: "height in meters",
            hint_ratio: "Hint: h/H = l/L"
        },
        mission: {
            title: "MISSION: BASEL CATHEDRAL SURVEY",
            description: "Measure the tower height using Thales' theorem and shadow ratios."
        }
    },
    sp2_03: {
    back: "Back to Nexus",
    title: "SP2.03 // MOTOR LAB",
    difficulty: {
        basic: "BASIC",
        core: "CORE",
        advanced: "ADVANCED",
        elite: "ELITE"
    },
    objective_title: "Active Mission Objective",
    target_title: "Motor Assembly",
    next: "Execute Next Sequence",
    check: "Verify",
    correct: "Verified",
    incorrect: "Mismatch",
    ready: "Ready",
    monitor_title: "SP2.03_MOTOR_MONITOR",
    footer_left: "SP2.03_MOTOR_LAB // NODE: BASEL",
    labels: {
        input: "INPUT",
        hints: "HINTS",
        current: "CURRENT SWITCH",
        current_on: "SWITCH ON",
        current_off: "SWITCH OFF",
        polarity: "MAGNET POLARITY",
        direction: "ROTATION DIRECTION",
        direction_cw: "CLOCKWISE",
        direction_ccw: "COUNTER-CLOCKWISE",
        direction_stop: "STOPPED",
        speed: "ROTATION SPEED",
        readout: "READOUT"
    },
    mission: {
        title: "MISSION: BASEL MOTOR WORKSHOP",
        description: "Assemble a DC motor. Control magnetic polarity and current to drive rotation."
    },
    stages: {
        assemble: "ASSEMBLE",
        power: "POWER",
        reverse: "REVERSE",
        assemble_desc: "Place magnets and coil",
        power_desc: "Close the circuit and observe rotation",
        reverse_desc: "Swap poles to reverse direction",
        assemble_hint: "Start with the switch open and align the magnets",
        power_hint: "Close the circuit to energize the coil",
        reverse_hint: "Swap N/S to reverse rotation"
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
    sp1_01: {
        back: "Back to Nexus",
        title: "SP1.01 // MEASUREMENT & UNITS",
        check: "Verify",
        next: "Next",
        correct: "Measurement Verified",
        incorrect: "Measurement Error",
        ready: "Ready",
        monitor_title: "SP1.01_MEASUREMENT_LAB",
        footer_left: "SP1.01_MEASUREMENT // NODE: BASEL",
        objective_title: "Measurement Objective",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        stages: {
            si_units: "SI UNITS",
            conversion: "CONVERSION",
            precision: "PRECISION"
        },
        tools: {
            ruler: "Ruler",
            scale: "Scale",
            timer: "Timer"
        },
        labels: {
            precision: "Measurement Precision",
            measurement_display: "Measurement Display",
            input_terminal: "Terminal Input [Measurement Node]"
        },
        prompts: {
            si_unit: "What is the SI unit for {measurement}?",
            convert: "Convert {value} {from} to {to}",
            sigfigs: "How many significant figures in {value}?",
            hint_si: "The SI unit is {name}",
            hint_factor: "Multiply by {factor}",
            hint_sigfigs: "Count all non-zero digits and zeros between them"
        },
        feedback: {
            correct: "Measurement precision confirmed.",
            incorrect: "Calibration error detected."
        }
    },
    sp1_03: {
    back: "Back to Nexus",
    title: "P1.03 // ENERGY & POWER",
    difficulty: {
        basic: "BASIC",
        core: "CORE",
        advanced: "ADVANCED",
        elite: "ELITE"
    },
    objective_title: "Active Mission Objective",
    target_title: "Turbine Output",
    next: "Execute Next Sequence",
    check: "Verify",
    correct: "Verified",
    incorrect: "Mismatch",
    ready: "Ready",
    monitor_title: "P1.03_TURBINE_MONITOR",
    footer_left: "P1.03_RHINE_TURBINE // NODE: BASEL",
    stages: {
        potential: "POTENTIAL",
        kinetic: "KINETIC",
        power: "POWER",
        potential_prompt_latex: "\\text{Compute gravitational potential energy }E_p=mgh.",
        kinetic_prompt_latex: "\\text{Compute kinetic energy }E_k=\\frac{1}{2}mv^2.",
        power_prompt_latex: "\\text{Compute power }P=\\frac{W}{t}\\text{ (apply efficiency if given).}"
    },
    labels: {
        input: "INPUT",
        formula: "FORMULA"
    },
    formulas: {
        potential: "E_p=mgh",
        kinetic: "E_k=\\frac{1}{2}mv^2",
        power: "P=\\frac{W}{t}"
    },
    mission: {
        title: "MISSION: RHINE HYDRO PLANT",
        description: "Convert Rhine water flow into clean electricity. Track energy transfer and turbine power."
    }
    },
    sp1_07: {
    back: "Return to Nexus",
    title: "SP1.07 // PRESSURE & BUOYANCY",
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
    monitor_title: "SP1.07_FLUID_MONITOR",
    footer_left: "SP1.07_FLUID_MECHANICS // NODE: RHINE",
    objective_title: "Active Mission Objective",
    stages: {
        pressure: "PRESSURE",
        buoyancy: "BUOYANCY",
        hydraulics: "HYDRAULICS"
    },
    labels: {
        physics_display: "Physics Display",
        input_terminal: "Input Terminal",
        depth: "Depth",
        density: "Object Density",
        force: "Piston Force",
        fluid_mastery: "Fluid Mastery"
    },
    prompts: {
        pressure_depth: "A swimmer dives to {depth} m depth in the Rhine. Calculate total pressure (P₀=100000 Pa, ρ=1000 kg/m³, g=10 m/s²).",
        buoyant_force: "An object with volume {volume} m³ is submerged in water. Calculate the buoyant force (ρ_water=1000 kg/m³, g=10 m/s²).",
        hydraulic_force: "A hydraulic lift has input force {f1} N on area {a1} m². Output area is {a2} m². Calculate output force.",
        hint_pressure: "Use P = P₀ + ρgh",
        hint_archimedes: "Use F_b = ρ_water × V × g",
        hint_pascal: "Use Pascal's principle: F₁/A₁ = F₂/A₂"
    },
    scenarios: {
        rhine_swimming: "Rhine River Swimming: Divers explore the Rhine riverbed near Basel's Mittlere Brücke. Water pressure increases with depth, affecting equipment and safety protocols.",
        rhine_boat: "Rhine Cargo Transport: Barges navigate the Rhine carrying goods between Basel and Rotterdam. Understanding buoyancy is critical for load calculations and vessel stability.",
        hydraulic_lift: "Basel Construction Site: Hydraulic lifts at Basel's construction sites use Pascal's principle to lift heavy building materials with minimal input force."
    },
    feedback: {
        correct: "Fluid mechanics mastered!",
        incorrect: "Review the fluid mechanics principles."
    }
    },
    sp1_05: {
    back: "Back to Nexus",
    title: "SP1.05 // THE RHINE FERRY",
    difficulty: {
        basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE"
    },
    next: "Execute Next Sequence",
    check: "Verify",
    correct: "Verified",
    incorrect: "Mismatch",
    ready: "Ready",
    monitor_title: "SP1.05_FERRY_MONITOR",
    footer_left: "SP1.05_RHINE_FERRY // NODE: BASEL",
    stages: {
        composition: "VECTOR COMPOSITION",
        drift: "DRIFT ANALYSIS",
        navigation: "PRECISION NAVIGATION"
    },
    labels: {
        river_speed: "River Speed (v_r)",
        ferry_speed: "Ferry Speed (v_f)",
        cable_angle: "Cable Angle (θ)",
        resultant_speed: "Resultant Speed (v_net)",
        drift_speed: "Drift Speed",
        angle: "Angle"
    },
    mission: {
        title: "RHINE CROSSING MISSION",
        description: "Navigate the Basel Rhine ferry. Adjust cable angle and ferry speed to compensate for river current."
    }
    },
    sp2_01: {
    back: "Back to Nexus",
    title: "SP2.01 // HEAT & TEMPERATURE",
    difficulty: {
        basic: "BASIC",
        core: "CORE",
        advanced: "ADVANCED",
        elite: "ELITE"
    },
    objective_title: "Active Mission Objective",
    next: "Execute Next Sequence",
    check: "Verify",
    correct: "Verified",
    incorrect: "Mismatch",
    ready: "Ready",
    monitor_title: "SP2.01_THERMAL_MONITOR",
    footer_left: "SP2.01_THERMODYNAMICS // NODE: BASEL",
    stages: {
        heat_transfer: "HEAT TRANSFER",
        specific_heat: "SPECIFIC HEAT",
        phase_changes: "PHASE CHANGES"
    },
    labels: {
        thermal_display: "Thermal Display",
        input_terminal: "Input Terminal",
        temperature: "Temperature",
        show_particles: "Show Particles",
        thermal_score: "Thermal Score"
    },
    prompts: {
        heat_transfer: "Calculate heat transfer rate using {method} method.",
        specific_heat: "A {mass} kg sample is heated by {deltaT}°C. Calculate energy required (c=4186 J/kg·K for water).",
        phase_change: "Calculate energy for {phase} of {mass} kg of water.",
        hint_heat: "Use appropriate heat transfer equation for the method",
        hint_specific: "Use Q = mcΔT where c is specific heat capacity",
        hint_phase: "Use Q = mL where L is latent heat"
    },
    scenarios: {
        conduction: "Novartis Thermal Reactor: Heat conducts through metal reactor walls at Basel's pharmaceutical facilities. Thermal conductivity determines heat transfer rate.",
        convection: "Rhine River Cooling: Convection currents in the Rhine transfer heat from Basel's industrial facilities. Water circulation provides efficient cooling.",
        radiation: "Solar Heating in Basel: Thermal radiation from the sun heats Basel's buildings. Stefan-Boltzmann law describes radiative heat transfer.",
        water_heating: "Basel District Heating: Basel's district heating system uses specific heat capacity of water to transport thermal energy efficiently throughout the city.",
        melting: "Ice Melting on Rhine: Phase change from ice to water requires latent heat of fusion. Temperature remains constant during melting at 0°C.",
        boiling: "Steam Generation at Basel: Boiling water to steam at 100°C requires latent heat of vaporization. Steam carries more energy than hot water."
    },
    feedback: {
        correct: "Thermodynamics mastered!",
        incorrect: "Review the heat transfer principles."
    }
    },
    sp3_02: {
    back: "Back to Nexus",
    title: "P3.02 // WAVE OPTICS",
    difficulty: {
        basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE"
    },
    objective_title: "Active Mission Objective",
    target_title: "Wave Properties",
    next: "Execute Next Sequence",
    check: "Verify",
    correct: "Verified",
    incorrect: "Mismatch",
    ready: "Ready",
    monitor_title: "P3.02_OPTICAL_MONITOR",
    footer_left: "P3.02_WAVE_OPTICS // NODE: BASEL",
    labels: {
        input: "INPUT",
        hints: "HINTS",
        wavelength: "Wavelength (λ)",
        slit_separation: "Slit Separation (d)",
        slit_width: "Slit Width (a)",
        angle: "Angle (θ)",
        intensity: "Intensity (I)",
        order: "Order (m)"
    },
    mission: {
        title: "OPTICAL RESONANCE LAB",
        description: "Novartis optical lab involves wave properties. Master interference, diffraction and polarization."
    },
    stages: {
        interference: "INTERFERENCE",
        diffraction: "DIFFRACTION",
        polarization: "POLARIZATION",
        interference_prompt_latex: "\\text{Calculate the angle }\\theta\\text{ using the double-slit equation.}",
        diffraction_prompt_latex: "\\text{Calculate the angle }\\theta\\text{ using the single-slit equation.}",
        polarization_prompt_latex: "\\text{Calculate the intensity }I\\text{ using Malus' law.}"
    },
    formulas: {
        interference: "d \\sin \\theta = m \\lambda",
        diffraction: "a \\sin \\theta = m \\lambda",
        polarization: "I = I_0 \\cos^2 \\theta"
    }
    },
    sm1_02: {
    back: "Back to Nexus",
    title: "EM1.01 // ALGEBRA QUEST",
    difficulty: {
        basic: "BASIC",
        core: "CORE",
        advanced: "ADVANCED",
        elite: "ELITE"
    },
    modes: {
        containers: "CONTAINERS",
        sorting: "SORTING",
        machine: "MACHINE"
    },
    labels: {
        variable: "Variable",
        value: "Value",
        expression: "Expression",
        simplify: "Simplify",
        evaluate: "Evaluate",
        input: "Input",
        output: "Output"
    },
    stages: {
        variables: "VARIABLES",
        terms: "TERMS",
        substitution: "SUBSTITUTION",
        vars_prompt: "Identify the value inside the container.",
        terms_prompt: "Combine like terms to simplify the expression.",
        sub_prompt: "Evaluate the expression for the given value."
    },
    scenarios: {
        variables: "Basel Rhybadhüsli Locker: You are managing lockers at the famous Rhine swim house. Each locker (variable 'x') contains a specific value (towel, bag). Understand that 'x' is just a placeholder.",
        terms: "Marktplatz Fruit Stand: You are sorting deliveries at the Basel Market. You cannot mix apples and pears directly. Group same items together: 3 apples + 2 apples = 5 apples.",
        substitution: "BVB Tram Ticket Machine: You are testing the ticket machine logic. Insert a zone value (x) into the price formula to calculate the correct fare in CHF."
    }
    },
    sm2_07: {
    back: "Back to Nexus",
    title: "SM2.07 // COORDINATE GEOMETRY",
    difficulty: {
        basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE"
    },
    objective_title: "Active Mission Objective",
    target_title: "Precision Mapping",
    next: "Execute Next Sequence",
    check: "Verify",
    correct: "Verified",
    incorrect: "Mismatch",
    ready: "Ready",
    monitor_title: "SM2.07_COORDINATE_MONITOR",
    footer_left: "SM2.07_COORD_GEOM // NODE: ZURICH",
    labels: {
        input: "INPUT",
        hints: "HINTS",
        distance: "Distance (d)",
        midpoint: "Midpoint (M)",
        slope: "Slope (m)"
    },
    mission: {
        title: "ZURICH NODE MAPPING",
        description: "Zurich coordinate mapping requires precision geometry. Calculate distance, midpoint and slope between city nodes."
    },
    stages: {
        distance: "DISTANCE",
        midpoint: "MIDPOINT",
        slope: "SLOPE",
        distance_prompt_latex: "\\text{Calculate the distance }d\\text{ between points A and B.}",
        midpoint_prompt_latex: "\\text{Calculate the midpoint coordinates }M(x,y).",
        slope_prompt_latex: "\\text{Calculate the slope }m\\text{ of the line passing through A and B.}"
    },
    formulas: {
        distance: "d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}",
        midpoint: "M = (\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2})",
        slope: "m = \\frac{y_2-y_1}{x_2-x_1}"
    }
    },
    sm1_03: {
    back: "Back to Nexus",
    title: "SM1.03 // BELOW ZERO",
    difficulty: {
        basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE"
    },
    next: "Execute Next Sequence",
    check: "Verify",
    correct: "Verified",
    incorrect: "Mismatch",
    ready: "Ready",
    monitor_title: "SM1.03_INTEGER_MONITOR",
    footer_left: "SM1.03_BELOW_ZERO // NODE: BASEL",
    basel_scenario: "BASEL WINTER SCENARIO",
    scenario_title: "PROBLEM CONTEXT",
    calculate_title: "CALCULATE",
    answer_title: "YOUR ANSWER",
    solution_title: "SOLUTION",
    stages: {
        number_line: "NUMBER LINE",
        rationals: "RATIONALS",
        quadrants: "QUADRANTS"
    },
    scenarios: {
        number_line: "Basel Winter Temperatures: You are monitoring temperatures at EuroAirport Basel during winter. Temperatures often drop below zero. Understanding negative numbers is essential for reading thermometers and comparing temperatures. The number line helps visualize integers and their relationships.",
        rationals: "Rhine River Water Levels: The Rhine River 'Pegel' (water level gauge) at Basel shows water depth. Normal level is +5m. During drought, it drops. Divers measure depth below surface as negative values. Rational numbers (fractions and decimals) give precise measurements.",
        quadrants: "Basel City Grid Navigation: Map Basel landmarks on a coordinate grid. Grossbasel (Q1: +,+), Kleinbasel (Q2: -,+), Klybeck (Q3: -,-), St. Alban (Q4: +,-). Understanding quadrants helps navigate the city and locate positions precisely."
    },
    problems: {
        nl_identify_neg3: "Locate -3 on the number line.",
        nl_identify_5: "Locate 5 on the number line.",
        nl_temp_neg2: "Temperature is -2°C. Mark this on the thermometer.",
        nl_depth_neg4: "A diver is 4 meters below the surface. Mark -4m.",
        nl_identify_0: "Locate zero (the origin) on the number line.",
        nl_compare_neg5_neg2: "Which is colder: -5°C or -2°C?",
        nl_compare_neg3_1: "Which is smaller: -3 or 1?",
        nl_order_three: "Order these numbers: -4, 0, 3. What is the middle value?",
        nl_rhine_level: "Rhine level drops from +5m to -3m. What is the new level?",
        nl_temp_drop: "Temperature drops from 2°C by 7 degrees. What is the final temperature?",
        nl_distance_abs: "What is the distance between -5 and 2 on the number line?",
        nl_abs_value: "What is the absolute value of -8?",
        nl_distance_neg_neg: "What is the distance between -7 and -3?",
        nl_midpoint: "What is the midpoint between -6 and 4?",
        nl_temp_range: "Temperature ranges from -8°C to 5°C. What is the range?",
        nl_operation_add: "Calculate: -5 + 3",
        nl_operation_sub: "Calculate: -3 - 4",
        nl_operation_mult: "Calculate: -4 × 2",
        nl_multi_step: "Calculate: -6 + 8 - 5",
        nl_complex_op: "Calculate: (-2 + 5) - (3 - 7)",
        r_place_half: "Locate 0.5 on the number line.",
        r_place_neg_half: "Locate -0.5 on the number line.",
        r_place_1_5: "Locate 1.5 on the number line.",
        r_place_neg2_5: "Locate -2.5 on the number line.",
        r_fraction_third: "Convert 1/3 to decimal (round to 2 places).",
        r_compare_fractions: "Which is larger: -1/2 or -1/3?",
        r_compare_decimals: "Which is smaller: -0.75 or -0.5?",
        r_order_mixed: "Order: -1.5, -0.5, 0.5. What is the smallest?",
        r_add_decimals: "Calculate: 0.5 + 0.25",
        r_sub_decimals: "Calculate: 1.5 - 2.25",
        r_compare_neg_decimals: "Which is colder: -0.75°C or -0.8°C?",
        r_fraction_to_decimal: "Convert -3/4 to decimal.",
        r_mult_decimals: "Calculate: 0.5 × 1.5",
        r_div_decimals: "Calculate: 1.5 ÷ 0.5",
        r_mixed_operations: "Calculate: 0.5 + 1.25 - 0.75",
        r_order_complex: "Order from smallest: -1.5, -3/2, 0, 1.2. What is the first?",
        r_fraction_operations: "Calculate: 1/2 + 1/4 (as decimal)",
        r_neg_fraction_ops: "Calculate: -1/2 - 1/4 (as decimal)",
        r_complex_decimal: "Calculate: (0.5 - 1.25) × 2",
        r_repeating_decimal: "Convert 2/3 to decimal (round to 2 places).",
        q_identify_point: "What is the x-coordinate of point (2, 3)?",
        q_identify_y: "What is the y-coordinate of point (3, 4)?",
        q_plot_positive: "Plot point (1, 2). What is x?",
        q_origin: "What is the x-coordinate at the origin?",
        q_axis_point: "Point (3, 0) is on which axis? What is y?",
        q_quadrant_2: "Point (-2, 5) is in which quadrant?",
        q_quadrant_3: "Point (-3, -4) is in which quadrant?",
        q_quadrant_4: "Point (4, -2) is in which quadrant?",
        q_basel_landmarks: "Kleinbasel is at (-3, 2). What is x?",
        q_distance_horizontal: "Distance between (2, 0) and (5, 0)?",
        q_reflect_x_axis: "Reflect (3, 4) across x-axis. What is y'?",
        q_reflect_y_axis: "Reflect (5, 2) across y-axis. What is x'?",
        q_reflect_origin: "Reflect (3, 4) across origin. What is x'?",
        q_translate: "Translate (2, 3) by (4, 0). What is x'?",
        q_midpoint_2d: "Midpoint between (2, 3) and (6, 3). What is x?",
        q_distance_vertical: "Distance between (0, 5) and (0, -3)?",
        q_perimeter_rectangle: "Rectangle with corners at (0,0) and (4,3). Perimeter?",
        q_area_rectangle: "Rectangle with corners at (0,0) and (4,3). Area?",
        q_diagonal_distance: "Horizontal distance from (2, 3) to (6, 5)?",
        q_complex_translation: "Start at (2, 3), move right 3, left 1. Final x?"
    }
    },
    sm1_04: {
    back: "Back to Nexus",
    title: "SM1.04 // EQUATION BALANCE",
    difficulty: {
        basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE"
    },
    next: "Execute Next Sequence",
    check: "Verify",
    correct: "Verified",
    incorrect: "Mismatch",
    ready: "Ready",
    monitor_title: "SM1.04_EQUATION_MONITOR",
    footer_left: "SM1.04_EQUATION_BALANCE // NODE: BASEL",
    basel_scenario: "BASEL EQUATION SCENARIO",
    scenario_title: "PROBLEM CONTEXT",
    solve_title: "SOLVE THE EQUATION",
    answer_title: "YOUR ANSWER",
    solution_title: "SOLUTION",
    stages: {
        balance: "BALANCE",
        solve: "SOLVE",
        transform: "TRANSFORM",
        applications: "APPLICATIONS"
    },
    scenarios: {
        balance: "Understanding Equation Balance: Like a scale, equations must stay balanced. Whatever you do to one side, you must do to the other. This fundamental principle is the key to solving all equations.",
        solve: "Solving Linear Equations: Use inverse operations to isolate the variable. Add/subtract to move constants, multiply/divide to remove coefficients. Each step brings you closer to finding x.",
        transform: "Transforming Equations: Master the art of moving terms across the equals sign. Combine like terms, expand parentheses, and simplify fractions. Transform complex equations into simple ones.",
        applications: "Basel Real-World Problems: Apply equations to solve real problems in Basel. Calculate bus ticket prices, Rhine ferry times, Novartis lab measurements, and Roche pharmaceutical concentrations."
    },
    problems: {
        bal_add_both: "Add 2 to both sides of x + 3 = 7",
        bal_subtract_both: "Subtract 5 from both sides of x + 5 = 8",
        bal_multiply_both: "Multiply both sides by 2",
        bal_divide_both: "Divide both sides by 2",
        bal_simple_check: "Solve by moving the constant",
        bal_two_steps: "First subtract 3, then divide by 2",
        bal_negative_result: "Result will be negative",
        bal_fraction_coeff: "First subtract 2, then multiply by 3",
        bal_both_sides_x: "Move x terms to one side",
        bal_distribute: "First expand the parentheses",
        bal_complex_both: "Variables on both sides",
        bal_fractions: "Find common denominator",
        bal_parentheses_both: "Expand both sides first",
        bal_decimal_coeff: "Work with decimals",
        bal_negative_coeff: "Negative coefficient",
        bal_nested_parens: "Simplify inner parentheses first",
        bal_three_fractions: "Three fractions with different denominators",
        bal_complex_distribute: "Multiple distribution steps",
        bal_reciprocal: "Reciprocal fractions",
        bal_proportion: "Proportion equation",
        sol_one_step_add: "One-step: subtract 3",
        sol_one_step_sub: "One-step: add 5",
        sol_one_step_mult: "One-step: divide by 3",
        sol_one_step_div: "One-step: multiply by 4",
        sol_negative_simple: "Result is negative",
        sol_two_step_1: "Two steps: subtract then divide",
        sol_two_step_2: "Two steps: add then multiply",
        sol_negative_coeff: "Negative coefficient",
        sol_fraction_result: "Answer is a fraction",
        sol_decimal_coeff: "Decimal coefficient",
        sol_combine_like: "Combine like terms first",
        sol_distribute_simple: "Distribute then solve",
        sol_x_both_sides: "Variables on both sides",
        sol_fraction_both: "Add fractions",
        sol_negative_both: "Negative terms on both sides",
        sol_complex_distribute: "Complex distribution",
        sol_nested_parens: "Nested parentheses",
        sol_three_terms: "Three fraction terms",
        sol_decimal_complex: "Decimal with parentheses",
        sol_proportion_eq: "Proportion equation",
        tra_move_constant: "Move constant to right side",
        tra_move_variable: "Move variable term",
        tra_isolate_x: "Isolate x by dividing",
        tra_two_moves: "Two transformation steps",
        tra_negative_move: "Moving negative term",
        tra_collect_terms: "Collect like terms",
        tra_move_both: "Move terms from both sides",
        tra_expand_first: "Expand before moving",
        tra_fraction_clear: "Clear fraction first",
        tra_negative_coeff: "Handle negative coefficient",
        tra_multi_step: "Multiple transformation steps",
        tra_both_expand: "Expand both sides",
        tra_fractions_lcd: "Find LCD for fractions",
        tra_decimal_expand: "Expand decimal expression",
        tra_complex_collect: "Complex term collection",
        tra_nested_complex: "Nested parentheses transformation",
        tra_three_fractions: "Three fractions to combine",
        tra_double_expand: "Double expansion",
        tra_proportion_cross: "Cross multiplication",
        tra_mixed_complex: "Mixed fractions and decimals",
        app_bus_ticket: "Basel BVB bus: Adult ticket costs x CHF. Child ticket is 2 CHF less. If adult ticket is 5 CHF, find x.",
        app_rhine_time: "Rhine Ferry: Crossing takes 2x minutes. Round trip is 10 minutes. Find x.",
        app_age_simple: "Age problem: In 5 years, you'll be 12. How old are you now?",
        app_distance_simple: "Basel to Zurich: Half the distance is 6 km. Find total distance.",
        app_price_discount: "Roche cafeteria: After 10 CHF discount, meal costs 40 CHF. Original price?",
        app_tram_tickets: "Basel tram: 3 adult tickets at x CHF each, plus 2 child tickets at 2 CHF each, total 13 CHF. Find x.",
        app_novartis_samples: "Novartis lab: 5 boxes with x samples each, plus 10 extra samples, total 60. Find x.",
        app_age_sum: "Father and son: Son is x years old, father is 30 years older. Together they are 50. Find son's age.",
        app_rectangle_perimeter: "Basel park: Rectangular garden, length 8m, width x m, perimeter 28m. Find width.",
        app_speed_distance: "Basel to Liestal: Travel 2 hours at x km/h, distance 80 km. Find speed.",
        app_roche_concentration: "Roche lab: Mix 50ml of x% solution with 100ml of 30% solution to get 150ml of 40% solution. Find x.",
        app_consecutive_numbers: "Three consecutive numbers sum to 48. Find the first number.",
        app_work_rate: "Basel construction: Worker A finishes in x hours, Worker B in 6 hours. Together they finish in 2 hours. Find x.",
        app_mixture_problem: "Novartis: Mix x liters of 20% solution with 10 liters of 50% solution to get 30% solution. Find x.",
        app_investment_interest: "Basel bank: Invest x CHF at 5% interest. After 1 year, total is 2100 CHF. Find x.",
        app_train_meeting: "Basel-Zurich trains: Train A at 80 km/h, Train B at 100 km/h, 360 km apart. When do they meet?",
        app_age_ratio: "Age ratio: In 5 years, your age to your brother's age will be 2:3. You're x years old now. Find x.",
        app_compound_mixture: "Roche: Add x liters of pure acid to 20 liters of 30% acid to get 50% solution. Find x.",
        app_boat_current: "Rhine boat: 30 km downstream and back takes 5 hours. Current is 2 km/h. Find boat speed in still water.",
        app_profit_loss: "Basel shop: Sell at 20% profit or 10% loss, difference is 60 CHF. Find cost price."
    }
    },
    sm1_05: {
    back: "Back to Nexus",
    title: "SM1.05 // RATIO LAB",
    difficulty: {
        basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE"
    },
    next: "Execute Next Sequence",
    check: "Verify",
    correct: "Verified",
    incorrect: "Mismatch",
    ready: "Ready",
    monitor_title: "SM1.05_RATIO_MONITOR",
    footer_left: "SM1.05_RATIO_LAB // NODE: BASEL",
    stages: {
        recipes: "RECIPES",
        percent: "PERCENT",
        mixtures: "MIXTURES"
    },
    labels: {
        ratio: "Ratio",
        proportion: "Proportion",
        percentage: "Percentage",
        concentration: "Concentration",
        solute: "Solute",
        solvent: "Solvent"
    }
    },
    sm2_08: {
    back: "Back to Nexus",
    title: "SM2.08 // PROBABILITY BASICS",
    difficulty: {
        basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE"
    },
    next: "Execute Next Sequence",
    check: "Verify",
    correct: "Verified",
    incorrect: "Mismatch",
    ready: "Ready",
    monitor_title: "SM2.08_PROBABILITY_MONITOR",
    footer_left: "SM2.08_PROBABILITY // NODE: BASEL",
    formula_title: "PROBABILITY FORMULA",
    scenario_title: "PROBLEM",
    basel_scenario: "BASEL LIFE SCENARIO",
    calculate_title: "CALCULATE",
    answer_title: "YOUR ANSWER",
    solution_title: "SOLUTION",
    stages: {
        basic_prob: "BASIC PROBABILITY",
        lottery: "LOTTERY & GAMES",
        combined: "COMBINED EVENTS",
        data_stats: "DATA STATISTICS"
    },
    scenarios: {
        bus_punctuality: "Basel Public Transport: You take the #8 bus to school every day.",
        weather_basel: "Basel Weather Station: Meteorological data for decision making.",
        school_cafeteria: "School Cafeteria: Weekly menu planning.",
        exam_results: "Class Performance: Exam results analysis.",
        dice_game: "Probability Game: Understanding fair dice.",
        card_game: "Card Game: Standard 52-card deck.",
        dice_advanced: "Advanced Dice: Prime numbers and special outcomes.",
        school_raffle: "School Charity Raffle: Supporting local community.",
        fasnacht_game: "Basel Fasnacht Carnival: Game booth at the festival.",
        swiss_lotto_simple: "Swiss Lotto Simplified: Understanding lottery odds (6 choose 3).",
        dice_win_condition: "Carnival Dice Game: Win on sum of 7 or 11.",
        two_buses: "Daily Commute: Morning and evening bus reliability.",
        fc_basel: "FC Basel Matches: Home and away game predictions.",
        novartis_qc: "Novartis Quality Control: Pharmaceutical sample testing.",
        three_events: "Multiple Coin Flips: Understanding combinations.",
        temperature: "Basel Weather: Weekly temperature tracking.",
        test_scores: "Class Grades: Statistical analysis of exam results.",
        pocket_money: "Personal Finance: Monthly spending breakdown.",
        data_comparison: "Data Analysis: Comparing mean and median.",
        tram_punctuality: "Basel Tram System: Tram #3 reliability.",
        coin_flip: "Coin Flip: Basic probability experiment.",
        dice_two: "Two Dice: Understanding combined outcomes.",
        two_coins: "Two Coins: Independent events.",
        three_buses: "Three Bus Lines: Multiple independent events.",
        four_buses: "Four Bus Lines: Extended probability chains.",
        complex_event: "Complex Probability: Advanced scenarios.",
    },
    problems: {
        bus_ontime_16_20: "In the past 20 days, the bus arrived on time 16 times. What is the probability it arrives on time tomorrow?",
        bus_ontime_18_20: "In the past 20 days, the bus arrived on time 18 times. What is the probability it arrives on time tomorrow?",
        weather_rain_12_30: "Basel weather station recorded rain on 12 out of 30 days. What is the probability of rain this weekend?",
        weather_sunny_21_30: "Basel weather station recorded sunny weather on 21 out of 30 days. What is the probability of sunny weather tomorrow?",
        dice_roll_3: "Roll a standard die. What is the probability of rolling exactly a 3?",
        coin_heads: "Flip a fair coin once. What is the probability of getting heads?",
        cafeteria_pizza: "The school cafeteria serves pizza 3 days out of 5 each week. If you randomly go to the cafeteria, what is the probability of getting pizza?",
        exam_pass: "In a class of 100 students, 85 passed the exam. What is the probability a randomly selected student passed?",
        tram_ontime_17_20: "Tram #3 arrived on time 17 out of 20 days. What is the probability it arrives on time today?",
        dice_greater_4: "Roll a die. What is the probability of rolling a number greater than 4?",
        dice_even: "Roll a standard die. What is the probability of rolling an even number (2, 4, or 6)?",
        card_heart: "Draw one card from a standard 52-card deck. What is the probability of drawing a heart?",
        card_red: "Draw one card from a standard deck. What is the probability of drawing a red card?",
        two_dice_sum_8: "Roll two dice. What is the probability the sum equals 8?",
        card_face: "Draw one card. What is the probability of drawing a face card (J, Q, or K)?",
        dice_prime: "Roll a die. What is the probability of rolling a prime number (2, 3, or 5)?",
        two_dice_sum_10: "Roll two dice. What is the probability the sum equals 10?",
        card_ace_or_king: "Draw one card. What is the probability of drawing an Ace or King?",
        two_dice_doubles: "Roll two dice. What is the probability of rolling doubles (same number on both)?",
        card_spade_face: "Draw one card. What is the probability of drawing a spade face card?",
        school_raffle_win: "The school sold 100 raffle tickets for charity. You bought 3 tickets. What is the probability you win?",
        school_raffle_5_tickets: "The school sold 100 raffle tickets. You bought 5 tickets. What is the probability you win?",
        coin_two_heads: "Flip two coins. What is the probability both are heads?",
        dice_not_six: "Roll a die. What is the probability of NOT rolling a 6?",
        school_raffle_2_tickets: "The school sold 50 raffle tickets. You bought 2 tickets. What is the probability you win?",
        dice_sum_7: "Roll two dice at the Basel Fasnacht game booth. What is the probability the sum equals 7?",
        dice_sum_9: "Roll two dice. What is the probability the sum equals 9?",
        coin_three_all_heads: "Flip three coins. What is the probability all three are heads?",
        dice_sum_6: "Roll two dice. What is the probability the sum equals 6?",
        card_two_red: "Draw two cards without replacement. What is the probability both are red?",
        lotto_simple: "Simplified Swiss Lotto: Choose 3 numbers from 6. There are 20 possible combinations. What is your winning probability?",
        lotto_4_from_8: "Simplified lottery: Choose 4 numbers from 8. There are 70 combinations. What is your winning probability?",
        dice_sum_less_5: "Roll two dice. What is the probability the sum is less than 5?",
        coin_four_at_least_3_heads: "Flip four coins. What is the probability of getting at least 3 heads?",
        card_three_hearts: "Draw three cards without replacement. What is the probability all three are hearts?",
        dice_sum_7_or_11: "Carnival game: Roll two dice. You win if the sum is 7 OR 11. What is the probability of winning?",
        dice_sum_2_3_12: "Carnival game: Roll two dice. You lose if the sum is 2, 3, or 12. What is the probability of losing?",
        lotto_5_from_10: "Lottery: Choose 5 numbers from 10. There are 252 combinations. What is your winning probability?",
        coin_five_exactly_2_heads: "Flip five coins. What is the probability of getting exactly 2 heads?",
        card_poker_pair: "Draw 5 cards. What is the probability of getting at least one pair? (Simplified: approximately 42.3%)",
        two_buses_ontime: "Morning bus #8 has 80% on-time rate. Evening bus #15 has 70% on-time rate. What is the probability both are on time?",
        two_coins_both_heads: "Flip two coins. What is the probability both are heads?",
        two_dice_both_even: "Roll two dice. What is the probability both show even numbers?",
        two_days_both_sunny: "Basel has 70% sunny days. What is the probability both today and tomorrow are sunny?",
        two_students_both_pass: "Two students take an exam with 85% pass rate. What is the probability both pass?",
        fc_basel_wins: "FC Basel has 60% home win rate and 30% away win rate. What is the probability they win both matches this week?",
        three_buses_all_ontime: "Three buses have on-time rates of 80%, 75%, and 90%. What is the probability all three are on time?",
        three_days_all_sunny: "Basel has 70% sunny days. What is the probability the next 3 days are all sunny?",
        three_dice_all_six: "Roll three dice. What is the probability all three show 6?",
        fc_basel_at_least_one_win: "FC Basel has 60% home win rate and 30% away win rate. What is the probability they win at least one match?",
        quality_all_pass: "Novartis quality control: Each sample has 95% pass rate. If you test 5 samples, what is the probability all 5 pass?",
        quality_at_least_4_pass: "Novartis: 5 samples, 95% pass rate each. What is the probability at least 4 pass?",
        four_buses_all_ontime: "Four buses each have 80% on-time rate. What is the probability all four are on time?",
        week_no_rain: "Basel has 40% rain probability daily. What is the probability of no rain for 7 consecutive days?",
        five_students_all_pass: "Five students take an exam with 85% pass rate. What is the probability all five pass?",
        three_coins_two_heads: "Flip three coins. What is the probability of getting exactly 2 heads?",
        four_coins_exactly_3_heads: "Flip four coins. What is the probability of getting exactly 3 heads?",
        quality_exactly_4_pass: "Novartis: 5 samples, 95% pass rate each. What is the probability exactly 4 pass?",
        five_coins_at_least_4_heads: "Flip five coins. What is the probability of getting at least 4 heads?",
        birthday_paradox_simple: "Two people: What is the probability they share the same birthday? (Ignore leap years)",
        avg_temperature: "Basel temperatures this week: 18°C, 22°C, 20°C, 19°C, 21°C, 23°C, 20°C. Calculate the average temperature.",
        simple_average_5: "Test scores: 80, 85, 90, 75, 95. Calculate the average.",
        simple_sum: "Monthly spending: Food CHF 40, Transport CHF 25, Entertainment CHF 20, Savings CHF 15. What is the total?",
        avg_temperature_5_days: "Temperatures: 15°C, 18°C, 20°C, 17°C, 20°C. Calculate the average.",
        median_5_values: "Data set: 10, 12, 15, 18, 20. Find the median value.",
        class_average: "Class test scores: 85, 72, 90, 68, 78, 82, 75, 88, 70, 92. Calculate the class average.",
        spending_analysis: "Monthly spending: Food CHF 40, Transport CHF 25, Entertainment CHF 20, Savings CHF 15. What percentage is spent on food?",
        median_even_count: "Test scores: 70, 75, 80, 85. Find the median.",
        range_calculation: "Weekly temperatures: 15°C, 18°C, 20°C, 17°C, 23°C. Calculate the range (max - min).",
        percentage_transport: "Monthly budget CHF 100: Food CHF 40, Transport CHF 25, Entertainment CHF 20, Savings CHF 15. What percentage is transport?",
        weighted_average: "Two tests: Test 1 (weight 2): 80 points, Test 2 (weight 3): 90 points. Calculate weighted average.",
        median_vs_mean: "Data set: 10, 12, 15, 18, 20. Find the median value.",
        mode_calculation: "Test scores: 80, 85, 85, 90, 85, 75. Find the mode (most frequent value).",
        budget_remaining: "Monthly budget CHF 100. Spent: Food CHF 40, Transport CHF 25, Entertainment CHF 20. How much remains?",
        quartile_calculation: "Temperatures: 15°C, 17°C, 18°C, 20°C, 23°C. Find Q1 (25th percentile).",
        standard_deviation_simple: "Data: 10, 15, 20. Mean = 15. Calculate variance: average of squared deviations.",
        outlier_effect: "Data: 10, 12, 15, 18, 100. Calculate the mean. Notice how the outlier (100) affects it.",
        interquartile_range: "Data: 10, 15, 20, 25, 30. Q1=15, Q3=25. Calculate IQR = Q3 - Q1.",
        percentage_change: "Last month: CHF 100. This month: CHF 120. Calculate percentage change.",
        correlation_direction: "As study time increases, test scores increase. Is the correlation positive (1) or negative (-1)?",
    }
    },
    gp5_01: {
    back: "Back to Nexus",
    title: "P5.01 // THE ATOMIC CORE",
    difficulty: {
        basic: "BASIC",
        core: "CORE",
        advanced: "ADVANCED",
        elite: "ELITE"
    },
    objective_title: "Active Mission Objective",
    target_title: "Isotope / Decay",
    next: "Execute Next Sequence",
    check: "Verify",
    correct: "Verified",
    incorrect: "Mismatch",
    ready: "Ready",
    monitor_title: "P5.01_NUCLEAR_MONITOR",
    footer_left: "P5.01_MODERN_PHYSICS // NODE: BASEL",
    labels: {
        input: "INPUT PARAMETERS",
        hints: "HINTS",
        balancing: "NUCLEAR EQUATION",
        mass: "Mass Number (A)",
        atomic: "Atomic Number (Z)"
    },
    mission: {
        title: "STABILIZE THE CORE",
        description: "Novartis Innovation District needs a stable isotope. Balance the nuclear equation by identifying the correct decay particles."
    },
    stages: {
        alpha: "ALPHA DECAY",
        beta: "BETA DECAY",
        gamma: "GAMMA EMISSION",
        fission: "NUCLEAR FISSION",
        alpha_decay: "ALPHA DECAY",
        beta_decay: "BETA DECAY",
        gamma_decay: "GAMMA EMISSION",
        alpha_decay_prompt_latex: "\\text{Balance the Alpha decay (\\alpha) equation.}",
        beta_decay_prompt_latex: "\\text{Balance the Beta decay (\\beta^-) equation.}",
        gamma_decay_prompt_latex: "\\text{Identify the Gamma emission (\\gamma) state.}",
        fission_prompt_latex: "\\text{Predict the missing product in this fission reaction.}"
    }
    },
    sm3_04: {
    back: "Back to Nexus",
    title: "SM3.04 // LOGARITHMIC SCALES",
    difficulty: {
        basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE"
    },
    objective_title: "Active Mission Objective",
    target_title: "Logarithmic Measurement",
    next: "Execute Next Sequence",
    check: "Verify",
    correct: "Verified",
    incorrect: "Mismatch",
    ready: "Ready",
    monitor_title: "SM3.04_LOG_MONITOR",
    footer_left: "SM3.04_LOGARITHMS // NODE: BASEL",
    labels: {
        input: "INPUT",
        hints: "HINTS",
        ph: "pH Value",
        decibel: "Decibels (dB)",
        richter: "Richter Scale"
    },
    mission: {
        title: "LOGARITHMIC MEASUREMENT LAB",
        description: "Master three real-world logarithmic scales: pH (chemistry), decibels (sound), and Richter (earthquakes). Each scale compresses huge ranges into manageable numbers."
    },
    stages: {
        ph: "pH SCALE",
        decibel: "DECIBELS",
        richter: "RICHTER",
        ph_prompt_latex: "\\text{Calculate pH using }pH=-\\log_{10}[H^+].",
        decibel_prompt_latex: "\\text{Calculate decibels using }L=10\\log_{10}(I/I_0).",
        richter_prompt_latex: "\\text{Calculate magnitude using }M=\\log_{10}(A)."
    },
    formulas: {
        ph: "pH = -\\log_{10}[H^+]",
        decibel: "L = 10\\log_{10}(I/I_0)",
        richter: "M = \\log_{10}(A)"
    },
    scenarios: {
        ph_basic: "🧪 SCENARIO: School Chemistry Lab — Your chemistry teacher gives you a clear liquid to test. You use a pH meter and find the hydrogen ion concentration [H⁺] = 0.001 mol/L (which is 10⁻³ in scientific notation). To report the acidity properly, you need to calculate the pH value. Remember: pH = -log₁₀[H⁺]. A pH below 7 is acidic, pH 7 is neutral (pure water), and above 7 is basic. This liquid turns out to be lemon juice!",
        ph_core: "🧪 SCENARIO: Swimming Pool Water Quality — You work part-time at the Basel public pool. The health inspector requires daily pH testing. Today's water sample shows [H⁺] = 10⁻⁸ mol/L. You need to calculate the pH to verify it's in the safe range (7.2-7.8). If pH is too low (acidic), it irritates swimmers' eyes. If too high (basic), chlorine doesn't work properly. Your calculation determines whether the pool can open today!",
        ph_advanced: "🧪 SCENARIO: Pharmaceutical Quality Control — You're an intern at Roche in Basel. A new drug formulation must have precise pH control for stability. The lab measures [H⁺] = 3.16 × 10⁻⁵ mol/L. Calculate the pH to 2 decimal places. If pH drifts outside the target range (4.3-4.7), the entire batch (worth millions) must be discarded. Logarithmic precision matters in pharma!",
        ph_elite: "🧪 SCENARIO: Environmental Acid Rain Study — University of Basel researchers are studying acid rain effects on Swiss forests. Rainwater samples show [H⁺] = 10⁻⁴·⁵ mol/L (note the fractional exponent!). Calculate the pH. Normal rain is pH 5.6, but acid rain can be pH 4.0 or lower. Each pH unit represents a 10× change in acidity, so pH 4 rain is 100× more acidic than pH 6 rain. Your calculation helps assess environmental damage.",
        decibel_basic: "🔊 SCENARIO: School Library Noise Check — The librarian asks you to measure if the study area is quiet enough. You use a sound meter: the intensity is I = 10⁻¹⁰ W/m². The reference intensity (threshold of hearing) is I₀ = 10⁻¹² W/m². Calculate the sound level in decibels using L = 10·log₁₀(I/I₀). For reference: whisper = 30 dB, normal conversation = 60 dB, library should be under 40 dB.",
        decibel_core: "🔊 SCENARIO: Concert Sound Engineer — You're setting up for a school rock concert in the auditorium. The sound system produces intensity I = 10⁻⁴ W/m² at the front row. Calculate the decibel level. Safety regulations require ear protection above 85 dB, and prolonged exposure above 100 dB causes hearing damage. Your calculation determines whether you need to reduce the volume or provide earplugs to the audience.",
        decibel_advanced: "🔊 SCENARIO: Airport Noise Pollution Study — Basel-Mulhouse Airport is expanding, and residents complain about noise. You measure a jet taking off: I = 1 W/m² at 100 meters distance. Calculate the decibel level. City regulations limit airport noise to 65 dB during daytime. At 120 dB (jet engine), sound is painful. The logarithmic scale means 120 dB is not 'twice as loud' as 60 dB — it's 1,000,000 times more intense!",
        decibel_elite: "🔊 SCENARIO: Acoustic Engineering Challenge — A Basel concert hall is being designed. The architect needs to calculate sound absorption. If the original intensity is I₁ = 10⁻³ W/m² and after acoustic panels it drops to I₂ = 10⁻⁶ W/m², what's the decibel reduction? Calculate L₁ - L₂. This involves understanding that decibel differences represent intensity ratios: a 10 dB drop means 10× less intense, 20 dB drop means 100× less intense.",
        richter_basic: "🌍 SCENARIO: Earthquake Monitoring Station — You volunteer at University of Basel's seismology lab. A small earthquake hits near Basel. The seismograph records ground motion amplitude A = 100 micrometers. Calculate the Richter magnitude using M = log₁₀(A). For reference: M < 2 is not felt, M 3-4 is minor, M 5-6 is moderate, M 7+ is major. Your calculation helps classify the earthquake severity.",
        richter_core: "🌍 SCENARIO: Historical Earthquake Analysis — In 1356, Basel experienced Switzerland's strongest recorded earthquake. Modern analysis estimates the ground amplitude was A = 100,000 micrometers. Calculate the Richter magnitude. Compare this to the 2011 Japan earthquake (M 9.0) which had amplitude 1,000,000,000 micrometers. The logarithmic scale compresses this billion-fold range into manageable numbers (1 to 9).",
        richter_advanced: "🌍 SCENARIO: Earthquake Early Warning System — Switzerland is developing an earthquake alert app. Two earthquakes occur: Earthquake A has amplitude 31,600 μm, Earthquake B has amplitude 1,000 μm. Calculate both magnitudes to 2 decimal places. The app needs to distinguish between 'minor tremor' (M < 4.0) and 'significant quake' (M ≥ 4.0) to decide whether to send emergency alerts to millions of phones.",
        richter_elite: "🌍 SCENARIO: Seismic Energy Comparison — Advanced seismology: The energy released by an earthquake increases by 31.6× for each magnitude unit. If Earthquake A is M 5.0 and Earthquake B is M 7.0, how many times more energy does B release? First, understand that M 7.0 means amplitude is 100× larger than M 5.0 (because 10² = 100). But energy scales as amplitude^1.5, so energy ratio is 100^1.5 = 1,000×. This is why M 7 quakes are catastrophic while M 5 are just 'moderate'."
    },
    canvas: {
        ph_title: "pH SCALE",
        ph_formula: "pH = -log₁₀[H⁺]",
        decibel_title: "DECIBEL SCALE",
        decibel_formula: "L = 10·log₁₀(I/I₀)",
        richter_title: "RICHTER SCALE",
        richter_formula: "M = log₁₀(A)",
        ph_subtitle: "Acidity",
        decibel_subtitle: "Sound",
        richter_subtitle: "Earthquake",
        status_chamber: "CHAMBER",
        status_sim: "LOG_SCALE_SIM: ACTIVE",
        status_mode: "MODE"
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
        caffeine: "CAFFEINE"
    }
    },
    sp1_06: {
    back: "Back to Nexus",
    title: "SP1.06 // THE SWISS PENDULUM",
    difficulty: {
        basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE"
    },
    objective_title: "Active Mission Objective",
    target_title: "Oscillation Data",
    next: "Execute Next Sequence",
    check: "Verify",
    correct: "Verified",
    incorrect: "Mismatch",
    ready: "Ready",
    monitor_title: "SP1.06_PENDULUM_MONITOR",
    footer_left: "SP1.06_PENDULUM // NODE: BASEL",
    labels: {
        input: "INPUT",
        hints: "HINTS",
        period: "Period (T)",
        length: "Length (L)",
        gravity: "Gravity (g)",
        frequency: "Frequency (f)"
    },
    mission: {
        title: "THE CLOCKMAKER'S SECRET",
        description: "Calibrate the mechanical master clock of Basel. Master the physics of simple harmonic motion and energy conservation."
    },
    stages: {
        period: "PERIOD",
        gravity: "GRAVITY",
        energy: "ENERGY"
    }
    },
    sp2_02: {
    back: "Back to Nexus",
    title: "SP2.02 // CIRCUIT SANDBOX 2.0",
    difficulty: {
        basic: "BASIC",
        core: "CORE",
        advanced: "ADVANCED",
        elite: "ELITE"
    },
    objective_title: "Active Mission Objective",
    target_title: "Circuit Analysis",
    next: "Execute Next Sequence",
    check: "Verify",
    correct: "Verified",
    incorrect: "Mismatch",
    ready: "Ready",
    monitor_title: "SP2.02_CIRCUIT_MONITOR",
    footer_left: "SP2.02_CIRCUIT_SANDBOX // NODE: BASEL",
    labels: {
        multimeter: "MULTIMETER",
        oscilloscope: "OSCILLOSCOPE",
        resistance: "RESISTANCE",
        capacitance: "CAPACITANCE",
        inductance: "INDUCTANCE",
        voltage: "VOLTAGE",
        analysis: "CIRCUIT ANALYSIS",
        damping: "DAMPING TYPE",
        formulas: "RLC FORMULAS",
        reset: "RESET"
    },
    mission: {
        title: "MISSION: RLC TRANSIENT ANALYSIS",
        description: "Build and analyze RLC circuits. Use the multimeter to measure voltage and current. Observe transient responses on the oscilloscope."
    },
    stages: {
        build: "BUILD CIRCUIT",
        measure: "MEASURE VALUES",
        analyze: "ANALYZE RESPONSE",
        build_desc: "Connect resistors, capacitors, and inductors",
        measure_desc: "Use multimeter to measure voltage and current",
        analyze_desc: "Observe oscilloscope waveforms",
        build_hint: "Click components to select them",
        measure_hint: "Select 2 points to measure voltage drop",
        analyze_hint: "Watch for overdamped, underdamped, or critically damped responses"
    }
    },
    sp4_01: {
    back: "Back to Nexus",
    title: "SP3.03 // WAVE BASICS",
    difficulty: {
        basic: "BASIC",
        core: "CORE",
        advanced: "ADVANCED",
        elite: "ELITE"
    },
    objective_title: "Active Mission Objective",
    target_title: "Wave Parameters",
    next: "Execute Next Sequence",
    check: "Verify",
    correct: "Verified",
    incorrect: "Mismatch",
    ready: "Ready",
    monitor_title: "SP3.03_WAVE_MONITOR",
    footer_left: "SP3.03_WAVE_BASICS // NODE: RHINE",
    labels: {
        wave_type: "WAVE TYPE",
        transverse: "TRANSVERSE",
        longitudinal: "LONGITUDINAL",
        amplitude: "AMPLITUDE",
        frequency: "FREQUENCY",
        wave_speed: "WAVE SPEED",
        wavelength: "WAVELENGTH",
        period: "PERIOD",
        angular_freq: "ANGULAR FREQUENCY",
        calculated: "CALCULATED VALUES",
        show_particles: "Show Particle Motion",
        formulas: "FORMULAS"
    },
    mission: {
        title: "MISSION: RHINE WAVE ANALYSIS",
        description: "Study mechanical waves on the Rhine River. Master wave parameters: amplitude, frequency, wavelength, and period."
    },
    stages: {
        transverse: "TRANSVERSE WAVES",
        longitudinal: "LONGITUDINAL WAVES",
        parameters: "WAVE PARAMETERS",
        transverse_desc: "Observe perpendicular particle motion",
        longitudinal_desc: "Study compression and rarefaction",
        parameters_desc: "Calculate wavelength, period, and speed",
        transverse_hint: "Particles oscillate perpendicular to wave direction",
        longitudinal_hint: "Particles oscillate parallel to wave direction",
        parameters_hint: "v = λf, T = 1/f, ω = 2πf"
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
    sc1_01: {
    back: "Back to Nexus",
    title: "C1.01 // MYSTERY LAB",
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
    monitor_title: "C1.01_LAB_MONITOR",
    footer_left: "C1.01_MYSTERY_LAB // NODE: BASEL",
    labels: {
        input: "INPUT",
        hints: "HINTS",
        substance: "Substance",
        tool: "Test Tool",
        observation: "Observation"
    },
    mission: {
        title: "POWDER IDENTIFICATION",
        description: "Identify mysterious white powders using classical chemical tests. Master qualitative analysis."
    },
    stages: {
        identify: "IDENTIFY",
        properties: "PROPERTIES",
        reactions: "REACTIONS"
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
    }
    },
    gp1_03: {
    back: "Back to Nexus",
    title: "GP5.03 // PARTICLE COLLIDER",
    difficulty: {
        basic: "BASIC",
        core: "CORE",
        advanced: "ADVANCED",
        elite: "ELITE"
    },
    objective_title: "Active Mission Objective",
    target_title: "LHC ATLAS DETECTOR",
    next: "Execute Next Sequence",
    check: "Verify",
    correct: "Verified",
    incorrect: "Mismatch",
    ready: "Ready",
    monitor_title: "GP5.03_LHC_MONITOR",
    footer_left: "GP5.03_PARTICLE_COLLIDER // NODE: CERN",
    labels: {
        beam_energy: "BEAM ENERGY",
        relativistic_effects: "RELATIVISTIC EFFECTS",
        formulas: "FORMULAS",
        magnetic_field: "Enable Magnetic Field (Bending Magnets)",
        colliding: "COLLIDING...",
        initiate_collision: "INITIATE COLLISION"
    },
    mission: {
        title: "MISSION: PARTICLE PHYSICS",
        description: "Explore particle collisions at CERN's Large Hadron Collider. Discover the Higgs boson."
    },
    stages: {
        acceleration: "ACCELERATION",
        collision: "COLLISION",
        detection: "DETECTION",
        acceleration_desc: "Accelerate protons to near light speed",
        collision_desc: "Collide proton beams at 13 TeV",
        detection_desc: "Detect particle jets and tracks",
        acceleration_hint: "Protons reach 99.9999991% speed of light",
        collision_hint: "Collision energy: 13 TeV = 13,000 GeV",
        detection_hint: "Magnetic field bends charged particle tracks"
    }
    },
    sp1_08: {
    title: "SP1.08 // OPTICS BENCH",
    back: "Back to Nexus",
    footer_left: "SP1.08_OPTICS_BENCH // NODE: BASEL",
    monitor_title: "SP1.08_OPTICS_MONITOR",
    labels: {
        show_prism: "Show Prism Dispersion",
        medium_1: "MEDIUM 1 (n₁)",
        medium_2: "MEDIUM 2 (n₂)",
        incident_angle: "INCIDENT ANGLE (θ₁)",
        refraction_title: "REFRACTION",
        refracted_angle: "Refracted Angle (θ₂):",
        critical_angle: "Critical Angle:",
        total_internal_reflection: "TOTAL INTERNAL REFLECTION",
        na: "N/A",
        angle_value: "{value}°"
    },
    snell: {
        title: "SNELL'S LAW",
        line_1: "n₁ sin(θ₁) = n₂ sin(θ₂)",
        line_2: "θ_c = arcsin(n₂/n₁)",
        line_3: "v = c/n"
    },
    mission: {
        title: "MISSION: RAY OPTICS",
        description: "Master Snell's law and ray optics. Observe refraction, total internal reflection, and prism dispersion."
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
    sp1_04: {
    back: "Return to Nexus",
    title: "SP1.04 // SIMPLE MACHINES",
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
    monitor_title: "SP1.04_MECHANICS_MONITOR",
    footer_left: "SP1.04_SIMPLE_MACHINES // NODE: BASEL",
    objective_title: "Active Mission Objective",
    stages: {
        levers: "LEVERS",
        pulleys: "PULLEYS",
        inclined_planes: "INCLINED PLANES"
    },
    labels: {
        machine_display: "Machine Display",
        input_terminal: "Input Terminal",
        force_ratio: "Force Ratio (MA)",
        show_forces: "Show Forces",
        mechanics_score: "Mechanics Score"
    },
    prompts: {
        lever: "A lever lifts a {load} N load. If effort arm is {effortArm} m and load arm is {loadArm} m, what effort force is needed?",
        pulley: "A pulley system lifts a {load} N load with {strands} supporting strands. What effort force is needed?",
        inclined_plane: "An inclined plane lifts a {load} N load to height {height} m over length {length} m. What effort force is needed?",
        hint_lever: "Use MA = effort arm / load arm, then F_effort = F_load / MA",
        hint_pulley: "Use MA = number of strands, then F_effort = F_load / MA",
        hint_inclined: "Use MA = length / height, then F_effort = F_load / MA"
    },
    scenarios: {
        basel_construction: "Basel Construction Site: Workers at Basel's Roche Tower construction site use levers, pulleys, and ramps to move heavy materials efficiently. Simple machines reduce the force needed.",
        lever_crowbar: "Crowbar at Basel Renovation: Renovating Basel's historic buildings requires careful use of levers. A crowbar with long effort arm provides mechanical advantage to lift heavy stones.",
        pulley_crane: "Construction Crane Pulley: Basel's construction cranes use multiple pulley strands to lift steel beams. Each additional strand reduces the required input force.",
        ramp_loading: "Loading Ramp at Basel Port: Rhine port workers use inclined planes to load cargo onto barges. Longer ramps require less force but more distance.",
        compound_machine: "Compound Machines in Basel: Real construction equipment combines levers, pulleys, and inclined planes to achieve high mechanical advantage for heavy lifting tasks."
    },
    feedback: {
        correct: "Mechanical advantage calculated correctly!",
        incorrect: "Check your mechanical advantage calculation."
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
        novartis_combustion: "Novartis Energy Lab: Combustion reactions power Basel's pharmaceutical facilities. Complete combustion of organic fuels produces CO₂ and H₂O with maximum energy release.",
        basel_chemical_plant: "Basel Chemical Synthesis: Substitution reactions at Basel's chemical plants use UV light to replace hydrogen atoms with halogens, creating valuable pharmaceutical intermediates.",
        polymer_production: "Polymer Production in Basel: Addition reactions convert alkenes into polymers at Basel's chemical facilities. Double bonds open to form long polymer chains.",
        free_radical_mechanism: "Free Radical Chemistry: UV light initiates free radical mechanisms in substitution reactions. Radicals propagate through chain reactions until termination.",
        reaction_control: "Reaction Control at Novartis: Controlling reaction conditions (light, temperature, catalysts) determines product selectivity and yield in organic synthesis."
    },
    feedback: {
        correct: "Reaction mechanism understood!",
        incorrect: "Review the reaction mechanism."
    }
},
    },
CN: {
        protocol: {
            system_name: "系统协议 v2.1",
            warning_text: "警告：世界不按你的意图转动……除非你真正理解规则。",
            hold_instruction: "进入授权通道",
            hold_button: "[ 访问核心枢纽 ]",
            secure_connection: "安全连接已建立",
        },
        common: {
            history_title: "实验历史",
            history_toggle: "历史记录",
            history_empty: "暂无验证记录。",
            history_accuracy: "正确率",
            history_stage: "阶段",
            history_difficulty: "难度",
            history_time: "时间",
            history_speed: "速度",
            history_rigor: "严谨",
            history_best: "最佳",
            mastery_title: "STEM 精通度",
            mastery_conceptual: "理论",
            mastery_speed: "速度",
            mastery_rigor: "严谨",
            mastery_decay: "衰减",
            achievements_title: "成就",
            achievement_unlocked: "成就解锁",
            achievements: {
                first_light: {
                    title: "初见之光",
                    description: "完成第一个光学实验。"
                },
                first_launch: {
                    title: "首次启动",
                    description: "完成任意一个实验。"
                },
                mole_master: {
                    title: "摩尔大师",
                    description: "在 C1.02 达到 100% 正确率。"
                },
                molecular_architect: {
                    title: "分子架构师",
                    description: "完成 C3.01。"
                },
                time_traveler: {
                    title: "时间旅者",
                    description: "完成 P1.04 时间膨胀任务。"
                },
                calculus_god: {
                    title: "微积分之神",
                    description: "在 GM1.01 达到 100% 正确率。"
                }
            }
        },
        home: {
            title: "理科主题乐园",
            subtitle: "硬核理科仿真与逻辑实验",
            sek1_title: "初级中学 // 一年级 (7年级)",
            sek2_title: "初级中学 // 二年级 (8年级)",
            sek3_title: "初级中学 // 三年级 (9年级)",
            gym_title: "高级中学 // 预科阶段",
            nexus: "核心枢纽",
            archive: "实验档案",
            sm2_01_title: "SM2.01 // 二项式工厂",
            sm2_01_subtitle: "攻克第一和第二二项式公式。利用几何切割证明代数恒等式。",
            sm2_02_title: "SM2.02 // 勾股定律与开平方",
            sm2_02_subtitle: "围绕瑞士初中阶段难度梯度训练勾股定律与平方根。",
            sm3_01_title: "SM3.01 // 一元二次方程",
            sm3_01_subtitle: "用因式分解、求根公式、配方法解一元二次方程，并设置难度梯度。",
            sm3_03_title: "SM3.03 // 指数与对数",
            sm3_03_subtitle: "通过细胞分裂模拟理解指数增长与对数刻度。",
            sm3_02_title: "SM3.02 // 三角函数阵列",
            sm3_02_subtitle: "通过波形反馈训练正弦、余弦和相位偏移。",
            sm3_04_title: "SM3.04 // 对数实验室",
            sm3_04_subtitle: "通过精密训练解码对数刻度和逆向增长。",
            sm2_07_title: "SM2.07 // 坐标侦察",
            sm2_07_subtitle: "在巴塞尔网格中掌握坐标系、平移和绘图精度。",
            sm2_08_title: "SM2.08 // 概率基础",
            sm2_08_subtitle: "通过巴塞尔生活场景和简单博彩教育掌握概率基础。",
            sm2_03_title: "SM2.03 // 直线与函数",
            sm2_03_subtitle: "训练斜率、截距、图像匹配与交点，并保持低输入负担。",
            sm2_04_title: "SM2.04 // 相似与比例",
            sm2_04_subtitle: "训练相似比、缩放因子及比例推理应用。",
            gm1_01_title: "GM1.01 // 微积分初步",
            gm1_01_subtitle: "探索导数与切线斜率。在抛物线上计算割线和切线的斜率。",
            gm2_01_title: "GM2.01 // 矢量飞行员 3D",
            gm2_01_subtitle: "用三维向量、点积与模长训练无人机导航。",
            gm3_01_title: "GM3.01 // 概率金库",
            gm3_01_subtitle: "通过高尔顿钉板可视化二项分布。观察概率收敛到正态分布。",
            sm2_06_title: "SM2.06 // 二元一次方程组",
            sm2_06_subtitle: "掌握代入消元法和加减消元法求解二元一次方程组。",
            sm2_05_title: "SM2.05 // 幂运算与根号",
            sm2_05_subtitle: "系统训练幂运算法则、负指数以及科学计数法。",
            sm1_01_title: "SM1.01 // 面积与体积",
            sm1_01_subtitle: "计算梯形面积以及棱柱和圆柱的体积。",
            sm1_02_title: "EM1.01 // 四维超几何",
            sm1_02_subtitle: "探索超立方体：四维投影、旋转矩阵和超立方体展开。",
            sm1_03_title: "EM1.01 // 代数探险",
            sm1_03_subtitle: "通过可视化代数积木掌握变量、同类项化简和代入求值。",
            sm1_04_title: "SM1.03 // 零度以下",
            sm1_04_subtitle: "通过巴塞尔冬季场景掌握整数、数轴、有理数和二维坐标。",
            sm1_05_title: "SM1.04 // 方程平衡",
            sm1_05_subtitle: "使用天平模型、变换和巴塞尔实际应用解一元一次方程。",
            sm1_06_title: "SM1.05 // 比例实验室",
            sm1_06_subtitle: "通过互动的巴塞尔实验室场景掌握比例、百分比和混合物。",

            sp1_01_title: "SP1.01 // 测量与单位",
            sp1_01_subtitle: "通过巴塞尔实验室仪器掌握国际单位制、单位换算和测量精度。",
            sp1_02_title: "SP1.02 // 牛顿定律",
            sp1_02_subtitle: "探索摩擦力、加速度与碰撞动力学，理解机械运动的核心法则。",
            sp2_01_title: "SP2.01 // 热力学",
            sp2_01_subtitle: "通过 Q=mcΔT 与 Q=mL 追踪热量与相变过程。",
            sp2_02_title: "SP2.02 // 电路沙盒",
            sp2_02_subtitle: "构建电力网络。掌握欧姆定律以及串并联电路的逻辑。",
            sp3_01_title: "SP3.01 // 几何光学",
            sp3_01_subtitle: "追踪光线路径：反射、折射与透镜成像原理。",
            sp1_03_title: "SP1.03 // 能量与功率",
            sp1_03_subtitle: "模拟莱茵河水力发电：势能、动能与功率输出。",
            sp1_04_title: "SP1.04 // 简单机械",
            sp1_04_subtitle: "通过巴塞尔建筑工地场景掌握杠杆、滑轮和斜面。",
            sp3_02_title: "SP3.02 // 波动光学",
            sp3_02_subtitle: "探索干涉、衍射和偏振现象。",
            sp1_05_title: "SP1.05 // 莱茵河渡轮",
            sp1_05_subtitle: "掌握巴塞尔 Gierseilfähri 渡轮机制。仅利用水流和缆索横渡莱茵河。",
            sp1_06_title: "SP1.06 // 瑞士钟摆",
            sp1_06_subtitle: "时间的力学：与巴塞尔钟表匠一起探索周期、频率和引力。",
            sp1_07_title: "SP1.07 // 阿基米德船坞",
            sp1_07_subtitle: "在巴塞尔莱茵河港口探索压强、浮力和液压系统。",
            sp1_08_title: "SP1.08 // 光学实验室",
            sp1_08_subtitle: "探索光、透镜和光学现象。",
            sp2_03_title: "SP2.03 // 电机实验室",
            sp2_03_subtitle: "电磁学与电机原理。",
            sp4_01_title: "SP3.03 // 波动基础",
            sp4_01_subtitle: "波的性质与声音现象。",
            gp5_01_title: "GP1.01 // 原子核核心",
            gp5_01_subtitle: "通过平衡核反应方程式（α、β、γ 衰变）来稳定巴塞尔反应堆。",
            gp5_02: {
                back: "返回枢纽",
                title: "GP1.02 // 相对论实验室",
                difficulty: {
                    basic: "基础",
                    core: "核心",
                    advanced: "进阶",
                    elite: "精英"
                },
                objective_title: "当前任务目标",
                target_title: "洛伦兹变换",
                next: "执行下一序列",
                check: "验证",
                correct: "已验证",
                incorrect: "匹配失败",
                ready: "就绪",
                monitor_title: "GP1.02_相对论监视器",
                footer_left: "GP1.02_相对论实验室 // 节点：CERN",
                labels: {
                    velocity: "速度",
                    lorentz_factor: "洛伦兹因子 (γ)",
                    time_dilation: "时间膨胀",
                    proper_time: "固有时间 (Δt₀)",
                    dilated_time: "膨胀时间 (Δt)",
                    length_contraction: "长度收缩",
                    rest_length: "静止长度 (L₀)",
                    contracted_length: "收缩长度 (L)",
                    doppler_effect: "相对论多普勒效应",
                    doppler_factor: "多普勒因子",
                    shift_type: "频移类型",
                    red_shift: "红移",
                    blue_shift: "蓝移",
                    particle_velocity: "粒子速度 (v/c)",
                    formulas: "公式"
                },
                mission: {
                    title: "任务：狭义相对论",
                    description: "在 CERN 探索爱因斯坦的狭义相对论。观察时间膨胀和长度收缩。"
                },
                stages: {
                    time_dilation: "时间膨胀",
                    length_contraction: "长度收缩",
                    doppler: "多普勒效应",
                    time_dilation_desc: "观察相对论速度下的光子钟",
                    length_contraction_desc: "测量粒子长度收缩",
                    doppler_desc: "分析相对论多普勒频移",
                    time_dilation_hint: "运动的钟变慢：Δt = γΔt₀",
                    length_contraction_hint: "运动的物体收缩：L = L₀/γ",
                    doppler_hint: "光向红移（远离）或蓝移（接近）"
                }
            },
            gp1_04: {
                back: "返回枢纽",
                title: "GP1.04 // 量子隧穿",
                difficulty: {
                    basic: "基础",
                    core: "核心",
                    advanced: "进阶",
                    elite: "精英"
                },
                objective_title: "当前任务目标",
                target_title: "波函数",
                next: "执行下一序列",
                check: "验证",
                correct: "已验证",
                incorrect: "匹配失败",
                ready: "就绪",
                monitor_title: "GP1.04_量子监视器",
                footer_left: "GP1.04_量子隧穿 // 节点：CERN",
                labels: {
                    particle_energy: "粒子能量 (E)",
                    barrier_height: "势垒高度 (V₀)",
                    barrier_width: "势垒宽度 (a)",
                    transmission: "透射系数",
                    wave_function: "波函数",
                    probability_density: "概率密度 |ψ|²",
                    incident: "入射",
                    reflected: "反射",
                    transmitted: "透射",
                    formulas: "公式",
                    energy_ev: "能量 (eV)",
                    barrier_ev: "势垒 (eV)",
                    width_nm: "宽度 (nm)"
                },
                mission: {
                    title: "任务：量子隧穿",
                    description: "探索量子隧穿通过势垒。观察波函数行为。"
                },
                stages: {
                    classical: "经典极限",
                    tunneling: "量子隧穿",
                    resonance: "共振",
                    classical_desc: "粒子能量低于势垒 (E < V₀)",
                    tunneling_desc: "观察隧穿概率",
                    resonance_desc: "寻找共振条件 (T ≈ 1)",
                    classical_hint: "经典物理：E < V₀ 时 T = 0",
                    tunneling_hint: "量子力学：即使 E < V₀，T > 0",
                    resonance_hint: "共振发生在特定 E/V₀ 比值"
                }
            },
            s3_02_title: "SM3.02 // 三角函数之塔",
            s3_02_subtitle: "通过单位圆可视化、波函数和三角形求解掌握正弦、余弦和正切。",
            s2_07_title: "SM2.07 // 坐标几何",
            s2_07_subtitle: "掌握距离、中点和斜率计算。",
            s3_04_title: "SM3.04 // 对数刻度",
            s3_04_subtitle: "掌握 pH 值、分贝和里氏震级的对数计算。",
            sc1_01_title: "SC1.01 // 神秘挑战",
            sc1_01_subtitle: "通过化学测试鉴定神秘白色粉末。",
            sc1_02_title: "SC1.02 // 摩尔大师",
            sc1_02_subtitle: "执行诺华级化学计量计算：摩尔质量、比例与产率。",
            sc1_03_title: "SC1.03 // 原子熔炉",
            sc1_03_subtitle: "在 3D 空间中构建同位素并理解原子轨道。",
            sc1_04_title: "SC1.04 // 元素周期拼图",
            sc1_04_subtitle: "构建原子并发现元素周期表。掌握电子排布。",
            sc2_01_title: "SC2.01 // 反应动力学",
            sc2_01_subtitle: "掌握阿伦尼乌斯方程、碰撞理论和反应速率。",
            sc2_02_title: "SC2.02 // pH 哨兵",
            sc2_02_subtitle: "通过实时反馈掌握 pH 曲线与滴定实验。",
            sc2_03_title: "SC2.03 // 气体实验室",
            sc2_03_subtitle: "通过粒子模拟探索理想气体定律。掌握 PV=nRT。",
            sc2_04_title: "SC2.04 // 溶解度实验室",
            sc2_04_subtitle: "探索溶解度曲线与结晶过程。掌握饱和平衡。",
            sc3_01_title: "SC3.01 // 分子画布",
            sc3_01_subtitle: "在 3D 空间中构建和可视化分子结构。",
            sc3_02_title: "SC3.02 // 有机化学基础",
            sc3_02_subtitle: "通过2D/3D分子可视化掌握烃类、官能团和同分异构体。",
            sc3_03_title: "SC3.03 // 有机化学反应",
            sc3_03_subtitle: "通过机理动画探索燃烧、取代和加成反应。",
            gc1_01_title: "GC1.01 // 氧化还原巨神",
            gc1_01_subtitle: "掌握电化学电池与氧化还原电位。",
            gsc1_01: {
                back: "返回枢纽",
                title: "GC1.01 // 氧化还原巨神",
                difficulty: {
                    basic: "基础",
                    core: "核心",
                    advanced: "进阶",
                    elite: "精英"
                },
                objective_title: "当前任务目标",
                target_title: "原电池",
                next: "执行下一序列",
                check: "验证",
                correct: "已验证",
                incorrect: "匹配失败",
                ready: "就绪",
                monitor_title: "GC1.01_氧化还原监视器",
                footer_left: "GC1.01_氧化还原巨神 // 节点：巴塞尔",
                labels: {
                    cell_reaction: "电池反应",
                    half_reactions: "半反应",
                    anode: "阳极 (−)",
                    cathode: "阴极 (+)",
                    cell_potential: "电池电势",
                    standard_potential: "E⁰ (标准)",
                    actual_potential: "E (实际)",
                    standard_potentials: "标准还原电势",
                    anode_metal: "阳极金属 (−)",
                    cathode_metal: "阴极金属 (+)",
                    anode_concentration: "阳极浓度 [M²⁺]",
                    cathode_concentration: "阴极浓度 [M²⁺]",
                    formulas: "公式"
                },
                mission: {
                    title: "任务：电化学",
                    description: "掌握原电池和氧化还原反应。观察电子流动并计算电池电势。"
                },
                stages: {
                    daniell: "丹尼尔电池",
                    custom: "自定义电池",
                    nernst: "能斯特方程",
                    daniell_desc: "研究经典丹尼尔电池 (Zn-Cu)",
                    custom_desc: "用不同金属构建自定义电池",
                    nernst_desc: "应用能斯特方程计算 E",
                    daniell_hint: "Zn 失去电子（氧化），Cu²⁺ 获得电子（还原）",
                    custom_hint: "电势较低的金属成为阳极 (−)",
                    nernst_hint: "更高的 [产物] 降低电池电势"
                }
            },
            gc2_01_title: "GC2.01 // 碳世界",
            gc2_01_subtitle: "使用 3D 模型组装药物分子。",
            gc3_01_title: "GC3.01 // 分子建筑师",
            gc3_01_subtitle: "使用 3D 球棍模型组装药物分子。",
            gc3_02_title: "GC3.02 // 晶体宫殿",
            gc3_02_subtitle: "探索晶体结构：SC、BCC、FCC 晶格与间隙空位。",
            sb1_01_title: "SB1.01 // 细胞工厂",
            sb1_01_subtitle: "探索细胞结构与细胞器。",
            sb1_01_met_title: "SB1.01 // 代谢途径",
            sb1_01_met_subtitle: "细胞代谢与能量产生。",
            sb1_02_title: "SB1.02 // 光合作用实验室",
            sb1_02_subtitle: "掌握光合作用方程式、限制因子和叶绿体结构。",
            sb1_03_title: "SB1.03 // 复制中心",
            sb1_03_subtitle: "掌握有丝分裂和减数分裂机制。通往遗传学的桥梁。",
            sb2_01_title: "SB2.01 // 孟德尔花园",
            sb2_01_subtitle: "遗传学与庞尼特方格。",
            sb2_02_title: "SB2.02 // 人体系统",
            sb2_02_subtitle: "通过交互式解剖学探索消化、循环和呼吸系统。",
            sb3_01_title: "SB3.01 // 生态系统动力学",
            sb3_01_subtitle: "掌握莱茵河生态系统中的食物链、能量流动和生物地球化学循环。",
            gb3_01_title: "GB3.01 // DNA 锻造厂",
            gb3_01_subtitle: "分子生物学与 DNA 复制。",
            gm4_01_title: "GM4.01 // 复数地平线",
            gm4_01_subtitle: "在 3D 空间可视化复平面与欧拉公式。",
            gm5_01_title: "EM2.01 // 矩阵变形器",
            gm5_01_subtitle: "在 3D 空间中体验线性变换与特征向量。",
            gp5_02_title: "GP1.02 // 相对论实验室",
            gp5_02_subtitle: "在 CERN 计算洛伦兹因子、长度收缩和时间膨胀。",
            gp1_03_title: "GP5.03 // 粒子对撞机",
            gp1_03_subtitle: "模拟 CERN 的 LHC。在 13 TeV 下对撞质子并发现希格斯玻色子。",
            gp1_04_title: "GP1.04 // 量子隧穿",
            gp1_04_subtitle: "用波函数可视化量子隧穿通过势垒。",
            coming_soon: "模拟序列尚未初始化。",
            engine_line: "物理规律仿真引擎 // v2.1",
            initiate_simulation: "启动模拟",
            locked_level_required: "已锁定 // 需要等级 {level}",
            engine_status_label: "引擎状态",
            engine_status_value: "R3F 物理引擎运行中",
            nodes_label: "节点",
            nodes_value: "日内瓦 // 苏黎世 // 上海",
            search_label: "筛选模块",
            search_placeholder: "按编号或名称搜索",
            filter_tags_label: "学科标签",
            filter_clear: "清除筛选",
            filter_empty: "没有模块符合当前筛选条件。",
            filter_tags: {
                physics: "物理",
                math: "数学",
                chemistry: "化学",
                biology: "生物",
                socratic: "苏格拉底式"
            },
            completed_badge: "已完成",
        },
        profile: {
            title: "科学家档案",
            subtitle: "操作者档案 // 能力矩阵",
            radar_title: "认知雷达",
            stats_title: "任务统计",
            timeline_title: "学习时间线",
            timeline_empty: "暂无学习记录。",
            timeline_accuracy: "正确率",
            stats: {
                completed_modules: "完成模块",
                avg_accuracy: "平均正确率",
                total_runs: "总实验次数",
                experiment_index: "实验指数"
            },
            metrics: {
                logic: "逻辑",
                intuition: "直觉",
                rigor: "严谨",
                experiment: "实验"
            }
        },
        sm2_02: {
            back: "返回枢纽",
            title: "SM2.02 // 勾股定律与开平方",
            tabs: {
                pythagoras: "勾股定律",
                sqrt: "开平方",
                explorer: "探索实验室",
                quest_mode: "挑战模式"
            },
            difficulty: {
                basic: "基础",
                core: "核心",
                advanced: "进阶",
                elite: "精英"
            },
            objective_title: "当前任务目标",
            target_title: "目标",
            next: "执行下一序列",
            check: "验证",
            correct: "已验证",
            incorrect: "不匹配",
            ready: "就绪",
            yes: "是",
            no: "否",
            monitor_title: "SM2.02_视觉监控",
            footer_left: "SM2.02_勾股与开方 // 节点：苏黎世",
            input_radical: "用 k√m 形式作答",
            input_k: "k",
            input_m: "m",
            input_number: "答案",
            pythagoras: {
                solve_hyp: " 消防救援：计算消防梯最短长度",
                solve_leg: " 阿尔卑斯登山：计算垂直攀升高度",
                check_right: "📐 工程验收：这是直角三角形吗？",
                distance: "🚁 无人机快递：计算直线飞行距离",
                elite_space: " CERN 实验室：求解状态空间对角线",
                explorer_mission: "勾股探索：调整缩放比例，见证几何相似性的不变性。",
                fluid_title: "流体面积守恒实验",
                fluid_desc: "倾斜容器观察 A² + B² 的液体如何精准填满 C²。这直观证明了面积之和的守恒性。"
            },
            sqrt: {
                perfect: "完全平方数",
                simplify: "根式化简",
                estimate: "估算"
            },
            mission: {
                title: "任务",
                protocol: "NEXUS PROTOCOL // 瑞士节点在线",
                cern_title: "CERN 校准阵列",
                cern_desc: "校准 16:9 观测阵列。高=9s，宽=16s。求对角线。",
                roof_title: "格林德瓦防雪屋顶",
                roof_desc: "半跨度 6m，高 6m。计算屋顶支撑梁长度。",
                ladder_title: "卢塞恩登梯码头",
                ladder_desc: "梯子距墙 5m，可达高度 12m。求梯子长度。",
                grid_title: "巴塞尔网格距离",
                grid_desc: "计算巴塞尔城市网格中两个导航节点的距离。",
                chain_title: "CERN 转运通道",
                chain_desc: "转运通道跨越矩形平台并上升至高位。求完整对角线。"
            },
            mental: {
                title: "心算",
                triples: "勾股数",
                chain: "链式路径"
            }
        },
        sm3_01: {
            back: "返回枢纽",
            title: "SM3.01 // 一元二次方程",
            difficulty: {
                basic: "基础",
                core: "核心",
                advanced: "进阶",
                elite: "精英"
            },
            objective_title: "当前任务目标",
            target_title: "目标方程",
            next: "执行下一序列",
            check: "验证",
            correct: "已验证",
            incorrect: "不匹配",
            ready: "就绪",
            monitor_title: "SM3.01_监控",
            footer_left: "SM3.01_一元二次方程 // 节点：苏黎世",
            stages: {
                terms: "合并同类项",
                factorize: "因式分解",
                fractions: "分式化简",
                equations: "解方程",
                terms_prompt_latex: "\\text{化简表达式（合并同类项）。}",
                factor_prompt_latex: "\\text{把式子因式分解成乘积形式。}",
                fractions_prompt_latex: "\\text{约分 / 化简分式。}",
                equations_prompt_latex: "\\text{分步骤解方程。}"
            },
            modes: {
                factor: "因式分解",
                formula: "求根公式",
                complete_square: "配方法",
                factor_prompt: "先把式子因式分解：找 A、B 使得 (x+A)(x+B)=0。",
                formula_prompt: "使用一元二次方程求根公式求解。",
                complete_square_prompt: "化为顶点式并写出 (h,k)。"
            },
            labels: {
                input: "输入",
                numerator: "分子",
                denominator: "分母",
                hints: "提示",
                roots: "解 x₁, x₂",
                vertex: "顶点 (h,k)",
                factor: "因式分解",
                factor_slots: "构造乘积形式 (A,B)",
                formula: "求根公式",
                complete_square: "配方法",
                elite_hint_latex: "提示：\\; x=\\frac{-b\\pm\\sqrt{\\Delta}}{2a}",
                fraction_hint: "提示：输入整数或分数 (如 4/3)。"
            },
            hints: {
                identities: {
                    trinomial_expand_latex: "(x+A)(x+B)=x^2+(A+B)x+AB",
                    diff_squares_latex: "u^2-v^2=(u-v)(u+v)"
                },
                rules: {
                    factor_common_latex: "\\text{先提取公因式。}",
                    cancel_common_latex: "\\text{先分解分子分母，再约去公因式。}",
                    simplify_both_sides_latex: "\\text{两边逐步化简。}",
                    square_root_pm_latex: "\\text{开方时要考虑 }\\pm\\text{。}",
                    zero_product_latex: "\\text{若 }pq=0\\text{ 则 }p=0\\text{ 或 }q=0."
                }
            }
        },
        sm3_02: {
            back: "返回枢纽",
            title: "SM3.02 // 三角函数圆",
            difficulty: {
                basic: "基础",
                core: "核心",
                advanced: "进阶",
                elite: "精英"
            },
            objective_title: "当前任务目标",
            target_title: "三角函数值",
            next: "执行下一序列",
            check: "验证",
            correct: "已验证",
            incorrect: "不匹配",
            ready: "就绪",
            monitor_title: "SM3.02_三角函数监控",
            footer_left: "SM3.02_三角函数圆 // 节点：巴塞尔",
            labels: {
                angle: "角度 (θ)",
                values: "三角函数值",
                display: "显示选项",
                show_waves: "显示波函数",
                formulas: "公式",
                special_angles: "特殊角",
                exact_value: "精确值",
                decimal_value: "数值",
                quadrant: "象限"
            },
            mission: {
                title: "任务：单位圆",
                description: "掌握单位圆与三角函数。理解 sin、cos 和 tan 的关系。"
            },
            stages: {
                unit_circle: "单位圆",
                projections: "投影",
                waves: "波函数",
                unit_circle_desc: "探索单位圆和角度旋转",
                projections_desc: "理解正弦和余弦作为投影",
                waves_desc: "将正弦和余弦可视化为波函数",
                unit_circle_hint: "圆上的点：(cos θ, sin θ)",
                projections_hint: "sin = y 轴投影，cos = x 轴投影",
                waves_hint: "sin 和 cos 形成周期波",
                unit_circle_prompt_latex: "\\text{判断象限或正负号。}",
                projections_prompt_latex: "\\text{计算三角函数的精确值。}",
                waves_prompt_latex: "\\text{求振幅或周期。}"
            }
        },
        sm3_03: {
            back: "返回枢纽",
            title: "SM3.03 // 增长与对数",
            difficulty: {
                basic: "基础",
                core: "核心",
                advanced: "进阶",
                elite: "精英"
            },
            objective_title: "当前任务目标",
            target_title: "指数增长",
            next: "执行下一序列",
            check: "验证",
            correct: "已验证",
            incorrect: "不匹配",
            ready: "就绪",
            monitor_title: "SM3.03_增长监控",
            footer_left: "SM3.03_指数函数 // 节点：巴塞尔",
            labels: {
                input: "输入",
                hints: "提示",
                population: "种群数量 (N)",
                time: "时间 (t)",
                doubling_time: "倍增时间 (d)",
                initial: "初始数量 (N₀)",
                formula_ref: "公式参考",
                parameters: "当前参数",
                growth_rate: "增长率 (k)",
                half_life: "半衰期",
                principal: "本金 (P)",
                rate: "利率 (r)"
            },
            hints: {
                exp_rule1: "每次倍增，种群数量乘以 2",
                exp_rule2: "n 次倍增后：N = N₀ × 2ⁿ",
                log_rule1: "log₂(2ⁿ) = n",
                log_rule2: "换底公式：logₐ(x) = ln(x)/ln(a)",
                app_rule1: "半衰期：N(t) = N₀ × (½)^(t/h)",
                app_rule2: "复利：A = P(1+r)^t"
            },
            input_tip: "提示：输入整数或保留 1 位小数。",
            mission: {
                title: "细菌增长实验室",
                description: "诺华生物实验室需要指数增长建模。计算细菌种群和对数尺度。"
            },
            stages: {
                exponential: "指数增长",
                logarithm: "对数",
                applications: "应用",
                exponential_prompt_latex: "\\text{使用 }N(t)=N_0\\cdot 2^{t/d}\\text{ 计算种群数量。}",
                logarithm_prompt_latex: "\\text{使用对数求解时间。}",
                applications_prompt_latex: "\\text{将指数模型应用于实际场景。}",
                exp_basic_prompt: "\\text{计算时间 } t \\text{ 时的种群数量。}",
                exp_advanced_prompt: "\\text{求倍增次数。}",
                exp_elite_prompt: "\\text{求连续增长率 } k\\text{。}",
                log_basic_prompt: "\\text{用 } t = d \\cdot \\log_2(N/N_0) \\text{ 求时间。}",
                log_core_prompt: "\\text{计算对数值。}",
                log_advanced_prompt: "\\text{使用换底公式。}",
                log_elite_prompt: "\\text{求解对数方程。}",
                app_half_prompt: "\\text{计算半衰期后剩余量。}",
                app_compound_prompt: "\\text{计算复利：} A=P(1+r)^t\\text{。}",
                app_rate_prompt: "\\text{从数据中求增长率。}",
                app_ph_prompt: "\\text{由氢离子浓度计算 pH 值。}"
            },
            formulas: {
                exponential: "N(t) = N_0 \\cdot 2^{t/d}",
                logarithm: "t = d \\cdot \\log_2(N/N_0)",
                applications: "N(t) = N_0 \\cdot e^{kt}"
            },
            scenarios: {
                exp_bac: "🦠 场景：诺华实验室细菌培养 — 巴塞尔诺华制药的研究团队正在研究细菌生长。他们在早上 8:00 将 100 个细菌放入培养皿。在最佳条件下，细菌数量每 20 分钟翻一倍。实验室需要预测何时细菌数量会达到 10,000 个，以便在正确的时刻采集样本。你的任务：使用指数增长公式计算任意时刻的细菌数量。",
                exp_social: "📱 场景：抖音挑战视频爆火 — 你的朋友在中午发布了一个舞蹈挑战视频。最初有 50 人观看。每小时，每个观看者都会分享给 2 个还没看过的朋友（翻倍效应）。到了晚上，观看次数呈指数级爆炸增长。校长想知道：什么时候会有 10,000 名学生看过这个视频？这就是社交媒体上真实的病毒式传播模型。",
                exp_virus: "🦠 场景：学校流感疫情建模 — 周一早上，你们学校 1,200 名学生中有 3 人得了流感。卫生部门知道，如果不采取干预措施，每个感染者每 2 天会传染给 2 个人（倍增时间 = 2 天）。校医需要预测：到周五会有多少人生病？什么时候会有 100 名学生被感染？这有助于决定是否需要停课。",
                exp_moore: "💻 场景：智能手机性能预测 — 2000 年，你爸爸的诺基亚手机只有 4 MB 内存。根据摩尔定律，计算能力大约每 2 年翻一倍。你现在的 iPhone 有 8 GB（8,000 MB）内存。问题：从 2000 年到 2024 年发生了多少次'翻倍'？你能验证摩尔定律是否成立吗？这种指数增长推动了所有现代科技的发展。",
                log_invest: "💰 场景：你的零花钱投资计划 — 你从生日礼物中攒了 1,000 瑞士法郎。你的父母提出一个协议：他们充当你的'银行'，每年支付 8% 的复利（意味着每年你都会从之前的利息中再赚取利息）。你想买一台游戏电脑，价格是 2,000 瑞士法郎。问题：多少年后你的钱会翻倍？使用对数求解：t = log₂(2000/1000) / log₂(1.08)。这就是真实的投资规划方式！",
                log_sound: "🔊 场景：学校音乐会音响调试 — 音乐老师正在为学校音乐会调试音响。耳语的声音是 30 分贝，正常对话是 60 分贝，摇滚音乐会是 120 分贝。但这里有个诀窍：分贝刻度是对数的！60 分贝不是 30 分贝的'两倍响'——它实际上强度是 1,000 倍（因为 10^(60/10) / 10^(30/10) = 1,000）。你的任务：如果当前声音是 80 分贝，安全上限是 85 分贝，声音强度还能增加多少倍才会不安全？",
                log_ph: "🧪 场景：化学实验室 pH 值测试 — 在化学课上，你正在测试不同液体的 pH 值。柠檬汁的 pH 值是 2，水是 7，肥皂是 12。老师解释说：pH 值是测量氢离子浓度 [H⁺] 的对数刻度。pH = -log₁₀[H⁺]。这意味着 pH 2 比 pH 7 酸性强 100,000 倍（不仅仅是'5 个单位'的差别）！问题：如果一个溶液的 [H⁺] = 0.001 mol/L，它的 pH 值是多少？它是酸性还是碱性？",
                log_security: "🔐 场景：密码破解时间 — 你的信息技术老师在讲解密码安全。一个 4 位数的 PIN 码（0000-9999）有 10,000 种组合。黑客的计算机每秒可以尝试 1,000 个密码，所以破解只需 10 秒。但如果你使用 8 位字母数字密码（每位有 62 种选择），就有 62^8 = 218 万亿种组合！即使以每秒 10 亿次的速度尝试，也需要 218,000 秒（2.5 天）。问题：需要多少位字符才能保护 1 年？使用对数求解：n = log₆₂(秒数 × 每秒尝试次数)。",
                app_med: "💊 场景：药物剂量时间安排 — 医生给你开了止痛药。你在早上 8:00 服用了 400 毫克。这种药物的半衰期是 6 小时，意味着每 6 小时，体内的药物会减少一半。下午 2:00（6 小时后），还剩 200 毫克。晚上 8:00，还剩 100 毫克。医生说药物浓度低于 50 毫克就不起作用了。问题：什么时候可以安全地服用下一剂？使用公式：N(t) = N₀ × (1/2)^(t/6)。",
                app_bank: "🏦 场景：比较储蓄账户 — 你有 5,000 瑞士法郎要为上大学存起来。银行 A 提供 3% 单利（每年固定赚 150 瑞士法郎）。银行 B 提供 3% 复利（每年你都会从之前的利息中再赚取利息）。10 年后：银行 A 给你 5,000 + 10×150 = 6,500 瑞士法郎。银行 B 给你 5,000 × (1.03)^10 = 6,720 瑞士法郎。问题：多少年后银行 B 会比银行 A 多给你 1,000 瑞士法郎？使用指数方程求解！",
                app_pop: "🏙️ 场景：苏黎世人口增长 — 2000 年，苏黎世有 34 万居民。这座城市以每年 1.2% 的速度增长（指数增长）。到 2020 年，人口达到 42 万。城市规划者需要预测：苏黎世何时会达到 50 万人口？这决定了何时需要建造新的学校、电车和住房。使用公式：P(t) = P₀ × (1.012)^t。当 P(t) = 500,000 时求解 t。",
                app_carbon: "🦴 场景：考古年代测定 — 考古学家在瑞士的一个洞穴中发现了一件木制工具。所有生物都含有碳-14（¹⁴C），其半衰期为 5,730 年。当树木死亡时，它停止吸收新的 ¹⁴C。通过测量剩余的 ¹⁴C 含量，科学家可以计算年代。如果这件工具还有原始 ¹⁴C 的 25%，它有多少年历史？使用：0.25 = (1/2)^(t/5730)。用对数求解 t。这就是我们如何知道古代文物年代的方法！"
            }
        },
        sm2_03: {
            back: "执行下一序列",
            title: "SM2.03 // 直线导航器",
            difficulty: {
                basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
            },
            objective_title: "当前任务目标",
            target_title: "目标拦截",
            next: "执行下一序列",
            check: "验证",
            correct: "已验证",
            incorrect: "匹配失败",
            ready: "就绪",
            monitor_title: "SM2.03_激光监视器",
            footer_left: "SM2.03_直线导航器 // 节点：巴塞尔",
            labels: {
                input: "输入",
                hints: "提示",
                emitter: "出发站",
                target: "目的地",
                slope: "每公里费用 (m)",
                intercept: "基础票价 (c)"
            },
            prompts: {
                level1: "计算到达目的地的票价",
                level2: "找到两种票价方案费用相同的距离",
                level3: "找到方案 A 变得更便宜的临界距离"
            },
            hints: {
                level1: "斜率 m = 每公里费用。截距 c = 基础票价（起步价）。总票价 y = m × 距离 + c。",
                level2: "两种票价方案的斜率 m 和截距 c 不同。让两个方程相等：m₁x + c₁ = m₂x + c₂，解出 x。",
                level3: "找到方案 A 变得比方案 B 便宜的临界距离。",
                drag: "在下方输入框中输入你的答案。"
            },
            ui: {
                current_function: "票价公式",
                reflections: "票价方案",
                target_position: "目的地 (km)",
                hit_badge: "票价已匹配",
                chamber: "站台",
                laser_sim: "票价计算",
                level: "等级",
                hits: "匹配"
            },
            mission: {
                title: "瑞士铁路票价计算器",
                description: "将铁路票价建模为线性函数。斜率 = 每公里费用，截距 = 基础票价。找到两种票价方案的临界点！"
            },
            stages: {
                level1: "等级 1",
                level2: "等级 2",
                level3: "等级 3"
            }
        },
        sm2_04: {
            back: "返回枢纽",
            title: "SM2.04 // 相似与比例",
            difficulty: {
                basic: "基础",
                core: "核心",
                advanced: "进阶",
                elite: "精英"
            },
            objective_title: "当前任务目标",
            target_title: "目标",
            next: "执行下一序列",
            check: "验证",
            correct: "已验证",
            incorrect: "不匹配",
            ready: "就绪",
            monitor_title: "SM2.04_监控",
            footer_left: "SM2.04_相似形 // 节点：巴塞尔",
            stages: {
                scale_factor: "缩放",
                similar_triangles: "相似",
                application: "应用",
                stages_prompt_latex: "使用比例关系求出未知量。"
            },
            labels: {
                input: "输入",
                hints: "提示"
            },
            hints: {
                rules: {
                    proportional_latex: "\\frac{a}{b}=\\frac{c}{d}",
                    scale_factor_latex: "\\text{缩放因子 }k=\\frac{\\text{新}}{\\text{旧}}",
                    cross_multiply_latex: "\\text{交叉相乘求解未知数。}"
                }
            },
            mission: {
                title: "任务: 阴影测量法",
                protocol: "NEXUS PROTOCOL // 瑞士节点在线",
                tower_title: "苏黎世钟楼",
                description: "在苏黎世，一位建筑师需要利用阴影测量一座历史钟楼的高度。相似三角形是解题的关键。",
                ring_title: "卢塞恩观测环",
                ring_desc: "在卢塞恩，同心传感环被一条与内圆相切的弦切割，求圆环宽度。",
                labels: {
                    tower: "钟楼",
                    tower_shadow: "钟楼阴影",
                    stick: "木棍 (1.5m)",
                    stick_shadow: "木棍阴影",
                    calculate_height: "计算钟楼高度"
                }
            }
        },
        sm2_01: {
            back: "← 返回枢纽",
            back_short: "返回枢纽",
            title: "SM2.01 // 二项式工厂",
            difficulty: {
                basic: "初级",
                core: "核心",
                advanced: "进阶",
                elite: "精英"
            },
            mode_1: "第一公式: (a+b)²",
            mode_2: "第二公式: (a-b)²",
            param_a: "参数 a",
            param_b: "参数 b",
            lock: "锁定参数",
            unlock: "解锁参数",
            instruction_setup: "通过滑块调整线段 a 和 b 的长度。",
            instruction_solve: "拖拽并吸附这些面积块，填满目标区域 $(a+b)²$。",
            solve_success: "恒等式已证明",
            solve_fail: "面积不匹配",
            terms: {
                a2: "a²",
                b2: "b²",
                ab: "ab",
                target_plus: "(a+b)²",
                target_minus: "(a-b)²",
            },
            scenarios: {
                architect_title: "场景 A: 花园扩建",
                architect_desc: "你的湖畔花园（a×a）要向外扩展 b 米。计算新的总面积。",
                architect_context: "你在苏黎世湖边有一块边长为 a 米的正方形花坛。市政府批准你可以向两侧各扩展 b 米。为了购买正确数量的泥土和种子，你需要计算新的总面积。注意：总面积并不只是 a² + b²，还有两条矩形带和一个角落小方块！",
                scrapper_title: "场景 B: 瓷砖工厂",
                scrapper_desc: "工厂生产了三种形状的瓷砖，把它们拼成一个完美正方形。",
                scrapper_context: "一家瑞士瓷砖工厂生产了三种瓷砖：一块大正方形 (a²)、两块长方形 (各 a×b)、一块小正方形 (b²)。你的任务是验证这四块砖能完美拼成一个边长为 (a+b) 的大正方形。这就是二项式恒等式的几何证明。",
                speedster_title: "场景 C: 速算冲刺",
                speedster_desc: "把大数分拆成 (整数 + 零头)²，瞬间计算。",
                speedster_context: "在瑞士数学奥林匹克中，你需要在脑中计算 103² 或 47² 这样的数字。技巧：把 103 分拆成 (100+3)，然后用 (a+b)² = a² + 2ab + b² = 10000 + 600 + 9 = 10609。比直接算 103×103 快得多！",
                voyager_context: "两块正方形田地共享一条边界。一块边长 a，另一块边长 b。测量员通过比较合并面积和各自面积来验证差的公式 (a+b)(a-b) = a² - b²。",
                architect_mission: "任务：用 (a+b)² = a² + 2ab + b² 计算扩建后的花园面积。",
                scrapper_mission: "任务：从展开式中识别 a 和 b，重新拼回完美正方形。",
                speedster_mission: "任务：把数字拆成 (整数 ± 零头)，用二项式展开瞬间计算。",
                voyager_mission: "任务：用平方差公式计算面积差。",
                elite_mission: "任务：将复杂多项式分解为二项式乘积形式。"
            },
            speedster_hint: "使用二项式展开 (a±b)² 简化计算",
            elite_tips_title: "提示：二项式分离策略",
            elite_tips_target: "目标格式：",
            scrapper_step01: "步骤 01：提取根 (a)",
            active_objective: "当前任务目标",
            target_expression: "目标恒等式表达式",
            params_config: "00 // 参数配置",
            units: "单位",
            tabs: {
                explore: "探索",
                architect: "花园扩建",
                scrapper: "瓷砖实验室",
                speedster: "速算冲刺",
                voyager: "航行者",
                elite: "精英"
            },
            ui: {
                part_1_a2: "第 1 项 (a²)",
                part_2_2ab: "第 2 项 (2ab)",
                part_3_b2: "第 3 项 (b²)",
                identify_root_a: "识别根 a",
                identify_root_b: "识别根 b",
                elite_step_1: "步骤 1：提取二项式平方",
                elite_step_2: "步骤 2：平衡等式",
                execute_next_sequence: "下一道题",
                continue_operation: "继续练习",
                logic_lattice_title: "逻辑晶格 // 分解",
                logic_architect_step_1: "步骤_01：分配外项",
                logic_architect_step_2: "步骤_02：展开分段",
                logic_scrapper_step_1: "步骤_01：提取根 (a)",
                logic_scrapper_step_2: "步骤_02：校验一次项 (2ab)",
                logic_voyager_axiom_title: "公理：共轭对偶",
                logic_voyager_axiom_body: "(A+B)(A-B) 的乘积会抵消一次交叉项 (±AB)。",
                logic_voyager_derivation_title: "推导：",
                link_established: "链接已建立",
                axiomatic_constraints_title: "公理约束",
                constraints_architect: "角上的 b² 是补全主二次平方所需的偏移量，它对蓝图精度至关重要。",
                constraints_scrapper: "因式分解将全局熵拆回有序的符号结构；提取根是首要目标。",
                constraints_speedster: "心算近似依赖于基数分解：把问题转化为 (Base+N)² 的框架。",
                constraints_elite: "高级重构处理多维系数：其中 C 代表复合缩放因子。",
                constraints_voyager: "恒等式对称性要求严格的符号一致性；平方差体现为一维投影下的面积净损失。",
                visual_reference_position: "视觉参考位置 [FIX_REF.01]",
                status_operational: "状态：运行中",
                fps: "帧率",
                latency: "延迟",
                footer_left: "SM2.01_代数同步 // 节点：苏黎世工业区",
                verified: "已验证",
                simulating: "模拟中",
            }
        },
        gm1_01: {
            back: "返回枢纽",
            title: "GM1.01 // 微积分初步",
            tabs: {
                explore: "探索",
                slope: "斜率",
                tangent: "切线",
                rate: "变化率",
                elite: "精英"
            },
            explore_title: "00 // 交互式探索",
            explore_instruction: "在抛物线 y = x² 上拖动点 P，观察切线如何变化。斜率 m 表示瞬时变化率。",
            explore_hint: "在右侧视觉监视器中拖动点 P →",
            current_point: "当前点",
            slope_label: "切线斜率",
            mission: {
                title: "导数道路模拟器",
                description: "通过在数学曲线上驾驶汽车来掌握微积分。导数告诉你道路在每个点的斜率。让汽车的角度与道路完美匹配！"
            },
            spotlight: {
                title: "科学家聚光灯",
                euler_name: "莱昂哈德·欧拉",
                euler_bio: "巴塞尔出身的分析大师。欧拉用符号重塑了微积分，让曲线、运动与级数遵循清晰而优雅的法则。",
                bernoulli_name: "约翰·伯努利",
                bernoulli_bio: "伯努利家族以挑战与竞争锻造微积分。约翰完善微分方法，将加速度与曲线形态连接。"
            },
            objective_title: "当前任务目标",
            target_title: "目标",
            next: "执行下一序列",
            check: "验证",
            correct: "已验证",
            incorrect: "不匹配",
            ready: "就绪",
            difficulty: {
                basic: "基础",
                core: "核心",
                advanced: "高级",
                elite: "精英"
            },
            hints_title: "公式参考",
            monitor_title: "GM1.01_视觉监控",
            status: "状态: 运行中",
            footer_left: "GM1.01_微积分 // 节点: 巴塞尔",
            footer_right: "导数模拟器",
            stages: {
                intro: "微积分基础",
                differentiation: "微分规则",
                application: "应用题",
                power_rule: "幂规则",
                factor_rule: "因子规则",
                sum_rule: "和规则",
                product_rule: "乘积规则",
                quotient_rule: "商规则",
                chain_rule: "链式法则",
                intro_prompt_latex: "\\text{计算 }x^n\\text{ 的导数。}",
                differentiation_prompt_latex: "\\text{应用微分规则计算。}",
                application_prompt_latex: "\\text{应用微积分解决问题。}",
                power_rule_prompt_latex: "\\text{在给定点计算 }f'(x)\\text{。}",
                factor_rule_prompt_latex: "\\text{使用因子规则计算 }f'(x)\\text{。}",
                sum_rule_prompt_latex: "\\text{使用和规则计算 }f'(x)\\text{。}",
                product_rule_prompt_latex: "\\text{使用乘积规则计算 }f'(x)\\text{。}",
                quotient_rule_prompt_latex: "\\text{使用商规则计算 }f'(x)\\text{。}",
                chain_rule_prompt_latex: "\\text{使用链式法则计算 }f'(x)\\text{。}"
            },
            labels: {
                secant_slope: "割线斜率 m",
                tangent_slope: "切线斜率 m",
                velocity: "速度 v",
                x_coordinate: "x 坐标",
                hints: "提示"
            },
            formulas: {
                power_rule: "f'(x) = n\\cdot x^{n-1}",
                factor_rule: "(a\\cdot f)' = a\\cdot f'",
                sum_rule: "(f+g)' = f' + g'",
                product_rule: "(uv)' = u'v + uv'",
                quotient_rule: "\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}",
                chain_rule: "\\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx}"
            },
            scenarios: {
                power_rule: "🚗 场景：汽车在山坡上加速 — 你驾驶一辆特斯拉爬上一座弯曲的山坡。道路高度遵循 h(x) = x²。导数 h'(x) 告诉你道路在每个点的陡峭程度。如果你以错误的角度倾斜汽车，它会刮到地面或翻倒！计算正确的斜率（导数），使汽车底盘与路面完美对齐。这正是自动驾驶汽车实时计算地形角度的方式。",
                factor_rule: "🏗️ 场景：建筑缩放 — 一位建筑师设计了一座高度为 h(x) = x² 的建筑。当城市要求所有尺寸按因子 3 缩放时，新高度变为 H(x) = 3x²。导数告诉你缩放后建筑的斜率如何变化。使用因子规则：如果 f(x) = a·g(x)，则 f'(x) = a·g'(x)。常数因子 3 保持在导数外面，使计算更简单！",
                sum_rule: "🌊 场景：海洋波浪叠加 — 两个海浪叠加：波浪 A 的高度为 h₁(x) = x²，波浪 B 的高度为 h₂(x) = 3x。总波浪高度为 H(x) = x² + 3x。要预测组合波浪上升的速度，使用和规则：(f + g)' = f' + g'。分别计算每个波浪的斜率，然后相加。这就是海洋学家预测海啸波浪行为的方式！",
                product_rule: "🌊 场景：冲浪板在波浪上 — 一名冲浪者在由 h(x) = x·sin(x) 描述的波浪上冲浪。波浪高度取决于位置 (x) 和正弦波模式。为了保持平衡，冲浪者需要知道波浪在每个点的斜率。使用乘积规则：如果 f(x) = u(x)·v(x)，则 f'(x) = u'·v + u·v'。这告诉你波浪上升或下降的速度，帮助冲浪者调整姿势。",
                quotient_rule: "📊 场景：股票市场效率比 — 一位金融分析师追踪公司的效率比：利润(x) / 成本(x)。随着市场条件变化（x = 月份时间），利润和成本都在变化。要预测效率是提高还是下降，你需要这个比率的导数。使用商规则：如果 f(x) = u(x)/v(x)，则 f'(x) = [u'·v - u·v'] / v²。这告诉投资者公司效率随时间是提高还是降低。",
                chain_rule: "⚙️ 场景：自行车齿轮系统 — 你正在骑自行车爬山。踏板旋转产生链条运动：踏板角度 → 链条速度 → 车轮旋转。如果链条绕齿轮的速度快两倍（因子为 2），则 f(x) = sin(2x)。链式法则告诉你：如果外部函数改变，乘以内部函数的速率。这就是自行车码表如何从踏板旋转计算你的实际速度！"
            },
            canvas: {
                title: "导数道路",
                subtitle_power: "f(x) = x²",
                subtitle_factor: "f(x) = ax²",
                subtitle_sum: "f(x) = x² + x",
                subtitle_product: "f(x) = x·sin(x)",
                subtitle_quotient: "f(x) = x/sin(x)",
                subtitle_chain: "f(x) = sin(2x)",
                x_label: "x",
                y_label: "f(x)",
                slope_label: "道路斜率",
                your_slope: "你的斜率",
                correct_slope: "正确斜率",
                status_chamber: "实验室",
                status_sim: "导数模拟: 激活",
                status_mode: "模式"
            },
            integral_preview_title: "即将解锁：积分学",
            integral_preview_desc: "掌握微分的逆运算。计算曲线下的面积。",
            integral_preview_hint: "掌握导数后解锁 →"
        },
        gm1_01_advanced: {
            back: "返回枢纽",
            title: "GM1.01-进阶 // 高级微积分",
            monitor_title: "GM1.01_进阶监控",
            footer_left: "GM1.01_进阶 // 节点: 巴塞尔",
            check: "验证",
            next: "下一挑战",
            correct: "已验证",
            incorrect: "不匹配",
            ready: "就绪",
            difficulty: {
                basic: "基础",
                core: "核心",
                advanced: "进阶",
                elite: "精英"
            },
            mission: {
                title: "高级导数挑战",
                description: "通过组合多个规则掌握复杂导数。将微积分应用于实际问题。"
            },
            challenges: {
                composite: "综合函数",
                modeling: "问题建模",
                optimization: "优化问题",
                analysis: "函数分析"
            },
            scenarios: {
                composite_1: "🎢 场景：过山车设计 — 一位工程师设计过山车路段，高度遵循 h(t) = (2t² + 3t)·sin(t)。速度是导数 h'(t)。在 t=2 秒时，计算速度以确保乘客安全。这需要同时使用乘积规则和幂规则！",
                composite_2: "📡 场景：信号处理 — 无线电信号的振幅为 A(t) = (t² + 1)/sin(t)。振幅变化率是 A'(t)。在 t=1 秒时，计算此速率以调整接收器。这需要商规则结合幂规则！",
                composite_3: "🌊 场景：波浪干涉 — 两个海浪叠加：h(x) = (x³ - 2x)·cos(x)。在 x=1 处，求高度变化率 h'(1) 以预测波浪行为。使用乘积规则结合三角函数！",
                modeling_1: "🚗 场景：汽车加速 — 一辆特斯拉从静止加速。其位置为 s(t) = 2t³ - 3t² + 5t 米。求 t=3 秒时的速度 v(t) = s'(t)，检查是否在限速范围内。",
                modeling_2: "🎈 场景：气球升空 — 气象气球上升，高度为 h(t) = -5t² + 20t + 2 米。在 t=2 秒时，计算速度 v(t) = h'(t) 以确保安全上升速率。",
                optimization_1: "📦 场景：盒子设计 — 一家公司用矩形纸板制作盒子。面积为 A(x) = x(10-x)。找到使面积最大的 x 值，以优化材料使用。",
                optimization_2: "💰 场景：利润最大化 — 巴塞尔一家面包店的日利润为 P(x) = -2x² + 12x - 10（单位：百瑞士法郎），其中 x 是生产小时数。找到使利润最大的 x。",
                analysis_1: "📊 场景：市场分析 — 股票价格遵循 f(x) = x³ - 3x² + 2。找到所有临界点（f'(x) = 0），以识别潜在的买入/卖出时机。",
                analysis_2: "🚀 场景：火箭轨迹 — 火箭高度为 f(x) = 2x³ - 6x + 1。在 x=1 处，求二阶导数 f''(1) 以确定火箭是加速还是减速。"
            },
            questions: {
                find_derivative: "计算给定点的导数",
                find_velocity: "计算速度 v(t) = s'(t)",
                find_acceleration: "计算加速度 a(t) = v'(t)",
                find_maximum: "找到使函数最大的值",
                find_critical_point: "找到临界点（导数 = 0）",
                find_critical_points: "找到所有临界点（f'(x) = 0）"
            },
            hints: {
                use_product_rule: "使用乘积规则：(uv)' = u'v + uv'。先分别求 u' 和 v'。",
                use_quotient_rule: "使用商规则：(u/v)' = (u'v - uv')/v²。记住分母要平方！",
                use_chain_rule: "使用链式法则：(f(g(x)))' = f'(g(x))·g'(x)。从外到内计算。",
                take_first_derivative: "求一阶导数：如果 s(t) 是位置，则 v(t) = s'(t) 是速度。",
                take_second_derivative: "先求 f'(x)，然后再次求导得到 f''(x)。",
                set_derivative_zero: "令 f'(x) = 0 并求解 x。这给出函数可能有最大/最小值的临界点。"
            },
            function_label: "函数",
            question_label: "挑战",
            hint_label: "策略",
            visualization_title: "函数图形",
            visualization: {
                title: "函数可视化",
                x_label: "x",
                y_label: "f(x)",
                function_label: "函数",
                point_label: "点"
            },
            progress: "进度"
        },
        gm2_01: {
            back: "返回枢纽",
            title: "GM2.01 // 矢量飞行员 3D",
            difficulty: {
                basic: "基础",
                core: "核心",
                advanced: "进阶",
                elite: "精英"
            },
            objective_title: "当前任务目标",
            target_title: "向量 HUD",
            next: "执行下一序列",
            check: "验证",
            correct: "已验证",
            incorrect: "不匹配",
            ready: "就绪",
            monitor_title: "GM2.01_向量监控",
            footer_left: "GM2.01_矢量飞行 // 节点：巴塞尔",
            stages: {
                navigation: "导航",
                dot: "点积",
                mission: "任务",
                navigation_prompt_latex: "\\text{计算 A 到 B 的位移向量 }\\vec v\\text{ 及其模长。}",
                dot_prompt_latex: "\\text{计算 }\\vec v\\text{ 并求 }\\vec v\\cdot\\vec w.",
                mission_prompt_latex: "\\text{任务：计算 }\\vec v\\text{、}\\vec v\\cdot\\vec s\\text{ 和 }|\\vec v|."
            },
            labels: {
                input: "输入"
            },
            mission: {
                title: "任务：莱茵河空域",
                description: "在莱茵河上空校准无人机航线。输入 3D 向量并用点积验证安全走廊。"
            },
            scenarios: {
                navigation: "巴塞尔无人机配送网络：你正在为巴塞尔的自主医疗物资无人机编程导航系统。无人机必须计算医院屋顶和城市各处配送点之间的精确3D向量。给定坐标A（巴塞尔大学医院的起飞停机坪）和B（Claraspital的到达点），计算位移向量v及其模长。模长表示直线飞行距离（米）。准确的向量计算对电池管理和飞行时间估算至关重要。",
                dot: "罗氏大厦太阳能板优化：巴塞尔的罗氏大厦正在其外墙安装可调节太阳能板。每块板的朝向用法向量v表示，正午时太阳方向为向量w。点积v·w决定板接收多少阳光——平行时最大（点积=|v||w|），垂直时为零。计算点积以确定最佳板角度。工程师用此来最大化全天能量捕获。",
                mission: "莱茵河导航系统：巴塞尔港务局正在开发莱茵河自动驳船导航系统。货运驳船必须从点A（当前位置）行驶到点B（目的地码头）。河流水流用向量s表示。计算：(1) A到B的位移向量v，(2) 点积v·s以确定水流是助力还是阻力（正值=助力，负值=阻力，零=垂直），(3) 模长|v|表示直线距离。这些数据优化燃料消耗和到达时间预测。"
            }
        },
        gm3_01: {
            back: "返回枢纽",
            title: "GM3.01 // 概率金库",
            difficulty: {
                basic: "基础",
                core: "核心",
                advanced: "进阶",
                elite: "精英"
            },
            objective_title: "当前任务目标",
            target_title: "概率矩阵",
            next: "执行下一序列",
            check: "验证",
            correct: "验证通过",
            incorrect: "匹配失败",
            ready: "就绪",
            monitor_title: "GM3.01_概率监测器",
            footer_left: "GM3.01_概率仓库 // 节点: 巴塞尔",
            stages: {
                basic_prob: "基础概率",
                binomial: "二项分布",
                conditional: "条件概率",
                mission: "任务",
                basic_prob_prompt_latex: "\\text{计算概率 }P(E)\\text{。}",
                binomial_prompt_latex: "\\text{计算二项分布的 }P(X=k)\\text{。}",
                conditional_prompt_latex: "\\text{计算条件概率 }P(A|B)\\text{。}",
                mission_prompt_latex: "\\text{任务：计算概率 }P\\text{。}"
            },
            labels: {
                input: "输入",
                hints: "提示"
            },
            mission: {
                title: "任务：巴塞尔概率实验室",
                description: "将概率论应用于巴塞尔的真实场景。计算质量控制、保险和彩票系统的概率。"
            },
            scenarios: {
                basic_prob: "诺华巴塞尔质量控制：你在巴塞尔诺华制药的质量控制部门工作。每批药品都要进行随机抽样检验。给定样本中有一定数量的合格结果（通过质量测试）占总样本数，计算随机选择的物品通过检验的概率P(E)。这个概率决定了整批产品是否被批准分发到瑞士医院。",
                binomial: "瑞士彩票系统分析：瑞士乐透从巴塞尔总部运营。在每次抽奖中，玩家选择的号码有固定概率p匹配。对于n次独立试验（彩票抽奖），使用二项分布公式计算恰好k次成功的概率P(X=k)：P(X=k) = C(n,k) × p^k × (1-p)^(n-k)。这帮助彩票官员预测支付频率并为瑞士玩家设置奖金结构。",
                conditional: "巴塞尔保险风险评估：巴塞尔保险公司需要计算条件概率进行风险评估。给定P(A) = 事件发生的概率，P(B) = 条件满足的概率，P(A∩B) = 两者都发生的概率，计算P(A|B) = P(A∩B)/P(B)。这个条件概率帮助根据特定风险因素确定巴塞尔居民的保险费。",
                mission: "巴塞尔综合概率任务：你正在为多家巴塞尔公司提供咨询——诺华（制药）、瑞士乐透（彩票）和巴塞尔保险公司（保险）。每家公司都提出不同的概率问题：质量控制的基础概率、彩票分析的二项分布或保险风险的条件概率。应用适当的概率公式解决每家公司的具体挑战，并提供准确的概率计算。"
            },
            problems: {
                // BASIC_PROB - BASIC: 直接样本空间
                single_die_one: "掷一次标准六面骰子，掷出1的概率是多少？\n\n已知：1个有利结果，6个总结果\n求：P(E) = 有利结果 / 总结果\n概念：直接观察样本空间",
                single_die_odd: "掷一次标准六面骰子，掷出奇数（1、3或5）的概率是多少？\n\n已知：3个有利结果（1,3,5），6个总结果\n求：P(E) = 有利结果 / 总结果\n概念：直接观察",
                coin_heads: "抛一次公平硬币，得到正面的概率是多少？\n\n已知：1个有利结果（正面），2个总结果\n求：P(E) = 有利结果 / 总结果\n概念：最简单的样本空间",
                spinner_8_sections: "你转动一个被分成8个相等部分（编号1-8）的转盘。落在第3部分的概率是多少？\n\n已知：1个有利结果，8个总结果\n求：P(E) = 有利结果 / 总结果\n概念：直接观察",

                // BASIC_PROB - CORE: 理解组合
                two_dice_sum_7: "掷两个标准骰子，和为7的概率是多少？\n\n已知：6个有利结果（1+6, 2+5, 3+4, 4+3, 5+2, 6+1），36个总结果\n求：P(E) = 有利结果 / 总结果\n概念：理解(1,6)和(6,1)是不同的结果",
                two_dice_sum_10: "掷两个标准骰子，和为10的概率是多少？\n\n已知：3个有利结果（4+6, 5+5, 6+4），36个总结果\n求：P(E) = 有利结果 / 总结果\n概念：正确计数组合",
                two_dice_sum_gt_7: "掷两个标准骰子，和大于7的概率是多少？\n\n已知：15个有利结果（和为8,9,10,11,12），36个总结果\n求：P(E) = 有利结果 / 总结果\n概念：计数多个有利结果",
                deck_one_suit: "从标准52张牌中抽一张，抽到红心的概率是多少？\n\n已知：13张红心，52张总牌\n求：P(E) = 有利结果 / 总结果\n概念：理解花色结构",
                deck_honors: "从标准52张牌中抽一张，抽到荣誉牌（A、K、Q或J）的概率是多少？\n\n已知：16张荣誉牌（每个等级4张），52张总牌\n求：P(E) = 有利结果 / 总结果\n概念：跨所有花色计数",

                // BASIC_PROB - ADVANCED: 条件概率（隐含）
                die_even_given_gt3: "你掷骰子并观察到结果大于3。它是偶数的概率是多少？\n\n已知：在结果{4,5,6}中，两个是偶数{4,6}\n求：P(偶数 | >3) = 2/3\n概念：条件'>3'将样本空间从6个结果改变为3个结果",
                die_multiple_of_3: "你掷一个标准骰子。掷出3的倍数的概率是多少？\n\n已知：2个有利结果（3, 6），6个总结果\n求：P(E) = 2/6\n概念：识别带条件的有利结果",
                card_face_given_spade: "你抽一张牌，它是黑桃。它是人头牌（J、Q、K）的概率是多少？\n\n已知：在13张黑桃中，3张是人头牌\n求：P(人头牌 | 黑桃) = 3/13\n概念：花色内的条件概率",
                card_not_face_not_ace: "你从标准牌组中抽一张牌。它既不是人头牌也不是A的概率是多少？\n\n已知：52张总牌 - 12张人头牌 - 4张A = 36个有利结果，52张总牌\n求：P(E) = 36/52\n概念：使用补集计数",
                card_king_given_face: "你抽一张牌，它是人头牌。它是K的概率是多少？\n\n已知：在12张人头牌（4种花色的J,Q,K）中，4张是K\n求：P(K | 人头牌) = 4/12\n概念：人头牌内的条件概率",

                // BASIC_PROB - ELITE: 复合事件
                at_least_one_six_two_dice: "你掷两个骰子。至少有一个显示6的概率是多少？\n\n已知：使用补集 - P(至少一个6) = 1 - P(没有6)\nP(没有6) = (5/6) × (5/6) = 25/36\n求：P(E) = 1 - 25/36 = 11/36\n概念：对'至少一个'使用补集",
                sum_not_2_or_12: "你掷两个骰子。和既不是2也不是12的概率是多少？\n\n已知：P(和=2) = 1/36，P(和=12) = 1/36\n有利结果 = 36 - 1 - 1 = 34\n求：P(E) = 34/36\n概念：对'既不...也不'使用补集",
                at_least_one_even: "你掷两个骰子。至少有一个显示偶数的概率是多少？\n\n已知：P(都是奇数) = (3/6) × (3/6) = 9/36\n求：P(至少一个偶数) = 1 - 9/36 = 27/36\n概念：补集策略",
                card_ace_or_king: "你抽一张牌。它是A或K的概率是多少？\n\n已知：4张A + 4张K = 8个有利结果，52张总牌\n求：P(A或K) = 8/52\n概念：互斥事件的加法原理",
                card_red_or_face: "你抽一张牌。它是红色或人头牌的概率是多少？\n\n已知：26张红色 + 12张人头牌 - 6张（红色人头牌）= 32个有利结果\n求：P(红色或人头牌) = 32/52\n概念：有重叠的加法原理（容斥原理）",

                mission_basic_1: "诺华任务：掷骰子，掷出1的概率？\n\n已知：1个有利，6个总数\n求：P(E)",
                mission_basic_2: "瑞士乐透任务：抛3次硬币，恰好2次正面的概率？\n\n已知：n=3，k=2，p=0.5\n求：P(X=2)",
                mission_basic_3: "保险任务：已知P(A)=0.5，P(B)=0.6，P(A∩B)=0.3，求P(A|B)。\n\n已知：P(A)=0.5，P(B)=0.6，P(A∩B)=0.3\n求：P(A|B)",
                mission_basic_4: "诺华任务：掷骰子，掷出偶数的概率？\n\n已知：3个有利，6个总数\n求：P(E)",
                mission_core_1: "诺华任务：从52张牌中抽一张，抽到红心的概率？\n\n已知：13个有利，52个总数\n求：P(E)",
                mission_core_2: "瑞士乐透任务：玩6次抽奖，中奖概率50%，P(X=4)是多少？\n\n已知：n=6，k=4，p=0.5\n求：P(X=4)",
                mission_core_3: "保险任务：已知P(A)=0.45，P(B)=0.55，P(A∩B)=0.25，求P(A|B)。\n\n已知：P(A)=0.45，P(B)=0.55，P(A∩B)=0.25\n求：P(A|B)",
                // BINOMIAL - BASIC: 理解基本概念
                coin_4_2: "抛4次公平硬币，恰好2次正面的概率是多少？\n\n已知：n=4次试验，k=2次成功，p=0.5\n求：P(X=2) = C(4,2) × 0.5² × 0.5²\n概念：基本二项分布计算",
                coin_3_all: "抛3次公平硬币，全部正面的概率是多少？\n\n已知：n=3次试验，k=3次成功，p=0.5\n求：P(X=3) = C(3,3) × 0.5³ × 0.5⁰\n概念：理解C(n,n) = 1",
                coin_4_none: "抛4次公平硬币，没有正面（全部反面）的概率是多少？\n\n已知：n=4次试验，k=0次成功，p=0.5\n求：P(X=0) = C(4,0) × 0.5⁰ × 0.5⁴\n概念：理解C(n,0) = 1",

                // BINOMIAL - CORE: 理解C(n,k)的意义
                lottery_5_3: "瑞士乐透：你玩5次抽奖，每次中奖概率50%。恰好中3次的概率是多少？\n\n已知：n=5，k=3，p=0.5\n求：P(X=3) = C(5,3) × 0.5³ × 0.5²\n概念：C(5,3) = 10 表示选择哪3次抽奖中奖的10种不同方式",
                lottery_6_3: "瑞士乐透：你玩6次抽奖，中奖概率50%。恰好中3次的概率是多少？\n\n已知：n=6，k=3，p=0.5\n求：P(X=3)，其中C(6,3) = 20\n概念：理解为什么要乘以C(n,k)",
                lottery_5_2: "瑞士乐透：你玩5次抽奖，中奖概率50%。恰好中2次的概率是多少？\n\n已知：n=5，k=2，p=0.5\n求：P(X=2)，其中C(5,2) = 10\n概念：二项系数表示排列",
                lottery_7_3: "瑞士乐透：你玩7次抽奖，中奖概率50%。恰好中3次的概率是多少？\n\n已知：n=7，k=3，p=0.5\n求：P(X=3)，其中C(7,3) = 35\n概念：更大的n意味着更多排列",

                // BINOMIAL - ADVANCED: 非对称概率（p ≠ 0.5）
                lottery_6_2_low: "瑞士乐透：你玩6次抽奖，每次中奖概率仅30%。恰好中2次的概率是多少？\n\n已知：n=6，k=2，p=0.3（低概率）\n求：P(X=2) = C(6,2) × 0.3² × 0.7⁴\n概念：低p意味着分布左偏",
                lottery_8_6_high: "瑞士乐透：你玩8次抽奖，每次中奖概率70%。恰好中6次的概率是多少？\n\n已知：n=8，k=6，p=0.7（高概率）\n求：P(X=6) = C(8,6) × 0.7⁶ × 0.3²\n概念：高p意味着分布右偏",
                lottery_7_4_biased: "瑞士乐透：你玩7次抽奖，中奖概率60%。恰好中4次的概率是多少？\n\n已知：n=7，k=4，p=0.6\n求：P(X=4)\n概念：理解非对称分布",
                lottery_10_7_biased: "瑞士乐透：你玩10次抽奖，中奖概率65%。恰好中7次的概率是多少？\n\n已知：n=10，k=7，p=0.65\n求：P(X=7)\n概念：使用非标准概率计算",

                // BINOMIAL - ELITE: 累积概率
                at_least_3_of_5: "瑞士乐透：你玩5次抽奖，中奖概率60%。至少中3次的概率是多少？\n\n已知：n=5，k≥3，p=0.6\n求：P(X≥3) = P(X=3) + P(X=4) + P(X=5)\n概念：累积概率 - 多个结果相加",
                at_most_4_of_6: "瑞士乐透：你玩6次抽奖，中奖概率50%。至多中4次的概率是多少？\n\n已知：n=6，k≤4，p=0.5\n求：P(X≤4) = P(X=0) + P(X=1) + P(X=2) + P(X=3) + P(X=4)\n概念：或使用 1 - P(X>4) = 1 - P(X=5) - P(X=6)",
                more_than_half: "瑞士乐透：你玩8次抽奖，中奖概率60%。超过一半时间中奖的概率是多少？\n\n已知：n=8，k>4，p=0.6\n求：P(X>4) = P(X=5) + P(X=6) + P(X=7) + P(X=8)\n概念：理解'超过一半'意味着k≥5",
                at_least_7_of_10: "瑞士乐透：你玩10次抽奖，中奖概率70%。至少中7次的概率是多少？\n\n已知：n=10，k≥7，p=0.7\n求：P(X≥7) = P(X=7) + P(X=8) + P(X=9) + P(X=10)\n概念：高p的累积概率",
                at_least_8_of_12: "瑞士乐透：你玩12次抽奖，中奖概率60%。至少中8次的概率是多少？\n\n已知：n=12，k≥8，p=0.6\n求：P(X≥8) = 从k=8到12的总和\n概念：累积概率中的多项",

                // CONDITIONAL - CORE: 从描述中提取条件
                card_heart_given_red: "你抽一张牌并观察到它是红色的。它是红心的概率是多少？\n\n已知：P(红心) = 13/52，P(红色) = 26/52，P(红心且红色) = 13/52\n求：P(红心|红色) = (13/52) / (26/52) = 13/26 = 0.5\n概念：从描述中识别条件",
                die_six_given_even: "你掷骰子并观察到它是偶数。它是6的概率是多少？\n\n已知：P(6) = 1/6，P(偶数) = 3/6，P(6且偶数) = 1/6\n求：P(6|偶数) = (1/6) / (3/6) = 1/3\n概念：条件改变样本空间",
                card_face_given_red: "你抽一张牌，它是红色的。它是人头牌的概率是多少？\n\n已知：P(人头牌) = 12/52，P(红色) = 26/52，P(人头牌且红色) = 6/52\n求：P(人头牌|红色) = 6/26\n概念：从牌的结构中提取概率",
                die_one_given_odd: "你掷骰子，它是奇数。它是1的概率是多少？\n\n已知：P(1) = 1/6，P(奇数) = 3/6，P(1且奇数) = 1/6\n求：P(1|奇数) = (1/6) / (3/6) = 1/3\n概念：理解条件样本空间",
                card_spade_given_black: "你抽一张牌，它是黑色的。它是黑桃的概率是多少？\n\n已知：P(黑桃) = 13/52，P(黑色) = 26/52，P(黑桃且黑色) = 13/52\n求：P(黑桃|黑色) = 13/26 = 0.5\n概念：条件概率中的对称性",

                // CONDITIONAL - ADVANCED: 贝叶斯思维
                disease_test_positive: "一种疾病影响1%的人口。测试准确率为90%（在疾病存在时检测到）。如果你测试阳性，你实际患病的概率是多少？\n\n已知：P(疾病) = 0.01，P(阳性|疾病) = 0.9，P(阳性|无疾病) = 0.1\nP(阳性) = 0.01×0.9 + 0.99×0.1 = 0.108\n求：P(疾病|阳性) = (0.01×0.9) / 0.108 = 0.083\n概念：P(A|B) ≠ P(B|A) - 贝叶斯反转",
                disease_test_positive_2: "一种罕见疾病影响2%的人口。测试准确率为80%。如果阳性，P(疾病)是多少？\n\n已知：P(疾病) = 0.02，P(+|疾病) = 0.8\n求：使用贝叶斯定理求P(疾病|+)\n概念：理解假阳性",
                quality_defect_given_batch: "15%的产品有缺陷。批次测试检测到80%的缺陷。如果批次失败，P(缺陷)是多少？\n\n已知：P(缺陷) = 0.15，P(失败|缺陷) = 0.8\n求：P(缺陷|失败)\n概念：质量控制中的贝叶斯推断",
                fraud_given_alert: "5%的交易是欺诈性的。警报系统捕获80%的欺诈。如果警报触发，P(欺诈)是多少？\n\n已知：P(欺诈) = 0.05，P(警报|欺诈) = 0.8\n求：P(欺诈|警报)\n概念：理解警报可靠性",
                accident_given_weather: "10%的日子发生事故。80%的事故日有恶劣天气。如果恶劣天气，P(事故)是多少？\n\n已知：P(事故) = 0.1，P(恶劣天气|事故) = 0.8\n求：P(事故|恶劣天气)\n概念：反转条件概率",

                // CONDITIONAL - ELITE: 独立性测试
                independence_test_1: "事件A和B有P(A)=0.4，P(B)=0.5，P(A∩B)=0.2。A和B独立吗？\n\n已知：P(A)=0.4，P(B)=0.5，P(A∩B)=0.2\n测试：如果独立，P(A∩B)应等于P(A)×P(B) = 0.4×0.5 = 0.2 ✓\n求：P(A|B) = 0.2/0.5 = 0.4 = P(A) ✓\n概念：A和B是独立的",
                independence_test_2: "事件A和B有P(A)=0.3，P(B)=0.6，P(A∩B)=0.18。它们独立吗？\n\n已知：P(A)=0.3，P(B)=0.6，P(A∩B)=0.18\n测试：P(A)×P(B) = 0.3×0.6 = 0.18 ✓\n求：P(A|B) = 0.18/0.6 = 0.3 = P(A) ✓\n概念：测试独立性",
                multiple_condition_1: "P(A)=0.25，P(B)=0.4，P(A∩B)=0.15。求P(A|B)并判断是否独立。\n\n已知：P(A)=0.25，P(B)=0.4，P(A∩B)=0.15\n求：P(A|B) = 0.15/0.4 = 0.375\n测试：P(A|B) = 0.375 ≠ P(A) = 0.25\n概念：不独立 - 条件改变概率",
                independence_test_3: "P(A)=0.35，P(B)=0.7，P(A∩B)=0.245。A和B独立吗？\n\n已知：P(A)=0.35，P(B)=0.7，P(A∩B)=0.245\n测试：P(A)×P(B) = 0.35×0.7 = 0.245 ✓\n求：P(A|B) = 0.245/0.7 = 0.35 = P(A) ✓\n概念：独立性验证",
                multiple_condition_2: "P(A)=0.2，P(B)=0.5，P(A∩B)=0.12。求P(A|B)并测试独立性。\n\n已知：P(A)=0.2，P(B)=0.5，P(A∩B)=0.12\n求：P(A|B) = 0.12/0.5 = 0.24\n测试：P(A|B) = 0.24 ≠ P(A) = 0.2\n概念：不独立",

                mission_core_4: "诺华任务：抽一张牌，抽到红色牌的概率？\n\n已知：26个有利，52个总数\n求：P(E)",
                mission_core_5: "瑞士乐透任务：玩5次抽奖，中奖概率60%，P(X=3)是多少？\n\n已知：n=5，k=3，p=0.6\n求：P(X=3)",
                mission_adv_1: "诺华任务：100个样本中85个通过，计算P(E)。\n\n已知：85个有利，100个总数\n求：P(E)",
                mission_adv_2: "瑞士乐透任务：10次抽奖，中奖概率50%，计算P(X=6)。\n\n已知：n=10，k=6，p=0.5\n求：P(X=6)",
                mission_adv_3: "保险任务：已知P(A)=0.37，P(B)=0.63，P(A∩B)=0.21，求P(A|B)。\n\n已知：P(A)=0.37，P(B)=0.63，P(A∩B)=0.21\n求：P(A|B)",
                mission_adv_4: "诺华任务：120个样本中92个通过，计算P(E)。\n\n已知：92个有利，120个总数\n求：P(E)",
                mission_adv_5: "瑞士乐透任务：8次抽奖，中奖概率60%，计算P(X=5)。\n\n已知：n=8，k=5，p=0.6\n求：P(X=5)",
                mission_elite_1: "诺华任务：500个样本中427个通过，计算P(E)。\n\n已知：427个有利，500个总数\n求：P(E)",
                mission_elite_2: "瑞士乐透任务：15次抽奖，中奖概率55%，计算P(X=9)。\n\n已知：n=15，k=9，p=0.55\n求：P(X=9)",
                mission_elite_3: "保险任务：已知P(A)=0.365，P(B)=0.625，P(A∩B)=0.215，求P(A|B)。\n\n已知：P(A)=0.365，P(B)=0.625，P(A∩B)=0.215\n求：P(A|B)",
                mission_elite_4: "诺华任务：800个样本中683个通过，计算P(E)。\n\n已知：683个有利，800个总数\n求：P(E)",
                mission_elite_5: "瑞士乐透任务：18次抽奖，中奖概率60%，计算P(X=11)。\n\n已知：n=18，k=11，p=0.6\n求：P(X=11)"
            }
        },
        sm2_06: {
            back: "返回枢纽",
            title: "SM2.06 // 二元一次方程组",
            difficulty: {
                basic: "基础",
                core: "核心",
                advanced: "进阶",
                elite: "精英"
            },
            objective_title: "当前任务目标",
            target_title: "方程组",
            next: "执行下一序列",
            check: "验证",
            correct: "已验证",
            incorrect: "不匹配",
            ready: "就绪",
            monitor_title: "SM2.06_监控",
            footer_left: "SM2.06_二元一次方程组 // 节点：巴塞尔",
            stages: {
                substitution: "代入法",
                elimination: "加减法",
                mission: "任务",
                substitution_prompt_latex: "\\text{用代入消元法求解。}",
                elimination_prompt_latex: "\\text{用加减消元法求解。}",
                mission_prompt_latex: "\\text{阅读题目并建立方程组求解。}"
            },
            labels: {
                input: "输入",
                hints: "提示"
            },
            hints: {
                rules: {
                    substitution_latex: "\\text{将一个方程代入另一个方程。}",
                    elimination_add_latex: "\\text{两方程相加消去一个变量。}",
                    elimination_sub_latex: "\\text{两方程相减消去一个变量。}",
                    elimination_multiply_latex: "\\text{先乘以系数使其相等，再消元。}"
                }
            },
            mission: {
                apples: "苹果",
                oranges: "橙子",
                adult: "成人",
                child: "儿童"
            }
        },
        sm2_05: {
            back: "返回枢纽",
            title: "SM2.05 // 幂运算与根号",
            difficulty: {
                basic: "基础",
                core: "核心",
                advanced: "进阶",
                elite: "精英"
            },
            objective_title: "当前任务目标",
            target_title: "运算任务",
            next: "执行下一序列",
            check: "验证",
            correct: "已验证",
            incorrect: "不匹配",
            ready: "就绪",
            monitor_title: "SM2.05_监控",
            footer_left: "SM2.05_幂与根号 // 节点：巴塞尔",
            stages: {
                rules: "法则",
                negative: "负指数",
                scientific: "科学计数",
                rules_prompt_latex: "\\text{应用幂运算法则化简。}",
                negative_prompt_latex: "\\text{将负指数项化简（求分母中的指数 n）。}",
                scientific_prompt_latex: "\\text{转换或应用科学计数法计算。}"
            },
            labels: {
                input: "输入",
                hints: "提示"
            }
        },
        sm1_01: {
            back: "返回枢纽",
            title: "SM1.01 // 面积与体积",
            difficulty: {
                basic: "基础",
                core: "核心",
                advanced: "进阶",
                elite: "精英"
            },
            objective_title: "当前任务目标",
            target_title: "几何任务",
            next: "执行下一序列",
            check: "验证",
            correct: "已验证",
            incorrect: "不匹配",
            ready: "就绪",
            monitor_title: "SM1.01_监控",
            footer_left: "SM1.01_几何任务 // 节点：巴塞尔",
            stages: {
                areas: "面积",
                volumes: "体积",
                complex: "综合",
                areas_prompt_latex: "\\text{阅读场景，计算所需面积。}",
                volumes_prompt_latex: "\\text{阅读场景，计算所需体积。}"
            },
            mission: {
                title: "任务：莱茵河防洪闸门",
                protocol: "Nexus 协议 // 日内瓦节点",
                description: "在巴塞尔，工程师将莱茵河防洪闸门的横截面建模为梯形。",
                cube_title: "CERN 立方体保险库",
                cube_desc: "在 CERN，识别立方体保险库的空间对角线并计算其长度。"
            },
            labels: {
                input: "输入",
                hints: "提示",
                length: "长",
                width: "宽",
                height: "高",
                base: "底边",
                radius: "半径",
                side: "边长",
                area: "面积",
                volume: "体积",
                calculate_area: "计算面积",
                calculate_volume: "计算体积",
            },
            quests: {
                ski: "阿尔卑斯滑雪场需要铺设新雪道。雪道是长方形的。",
                sail: "苏黎世帆船俱乐部需要订制新帆布。帆是三角形的。",
                gate: "莱茵河防洪闸门的一个截面是梯形的。",
                cheese: "格律耶尔奶酪工厂的圆形模具。",
                attic: "瑞士木屋阁楼是一个正方体空间，需要空气净化器。",
                crate: "CERN 实验室需要精密仪器的储存箱。",
                pylon: "圣莫里茨的滑雪缆车支架是圆柱形的。",

                // 结构化模版
                rect_core: "宽度为 ${w}，长度比宽度多 ${diff}。",
                rect_advanced: "长度为 ${l}，宽度正好是长度的一半。",
                rect_elite: "总周长为 ${p}，长度是宽度的 ${ratio} 倍。",
                tri_elite: "等腰直角三角形帆，斜边长度为 ${c}。",
                circle_elite: "模具的总周长为 ${c}。",
                cube_elite: "正方体空间的表面积为 ${sa}。",
                prism_elite: "底面是周长为 ${p} 的正方形，高度为 ${h}。",
                cyl_elite: "侧面积为 ${la}，半径为 ${r}。"
            }
        },
    em1_01: {
        back: "返回枢纽",
        title: "EM1.01 // THALES TOWER",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "Tower Height",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "不匹配",
        ready: "就绪",
        monitor_title: "EM1.01_THALES_MONITOR",
        footer_left: "EM1.01_THALES_TOWER // NODE: BASEL",
        stages: {
            measure: "测量"
        },
        measure_prompt_latex: "\\text{Use }\\frac{h}{H}=\\frac{l}{L}\\text{ to solve tower height.}",
        labels: {
            input: "输入",
            hints: "提示",
            readings: "READINGS",
            pole_height: "Pole Height (h)",
            pole_shadow: "Pole Shadow (l)",
            tower_shadow: "Tower Shadow (L)",
            sun_angle: "Sun Angle",
            solve_height: "Solve Tower Height (H)",
            height_placeholder: "height in meters",
            hint_ratio: "Hint: h/H = l/L"
        },
        mission: {
            title: "MISSION: BASEL CATHEDRAL SURVEY",
            description: "Measure the tower height using Thales' theorem and shadow ratios."
        }
    },
        sp2_03: {
            back: "返回枢纽",
            title: "SP2.03 // MOTOR LAB",
            difficulty: {
                basic: "基础",
                core: "核心",
                advanced: "进阶",
                elite: "精英"
            },
            objective_title: "当前任务目标",
            target_title: "Motor Assembly",
            next: "执行下一序列",
            check: "验证",
            correct: "已验证",
            incorrect: "不匹配",
            ready: "就绪",
            monitor_title: "SP2.03_MOTOR_MONITOR",
            footer_left: "SP2.03_MOTOR_LAB // NODE: BASEL",
            labels: {
                input: "输入",
                hints: "提示",
                current: "CURRENT SWITCH",
                current_on: "SWITCH ON",
                current_off: "SWITCH OFF",
                polarity: "MAGNET POLARITY",
                direction: "ROTATION DIRECTION",
                direction_cw: "CLOCKWISE",
                direction_ccw: "COUNTER-CLOCKWISE",
                direction_stop: "STOPPED",
                speed: "ROTATION SPEED",
                readout: "READOUT"
            },
            mission: {
                title: "MISSION: BASEL MOTOR WORKSHOP",
                description: "Assemble a DC motor. Control magnetic polarity and current to drive rotation."
            },
            stages: {
                assemble: "ASSEMBLE",
                power: "POWER",
                reverse: "REVERSE",
                assemble_desc: "Place magnets and coil",
                power_desc: "Close the circuit and observe rotation",
                reverse_desc: "Swap poles to reverse direction",
                assemble_hint: "Start with the switch open and align the magnets",
                power_hint: "Close the circuit to energize the coil",
                reverse_hint: "Swap N/S to reverse rotation"
            }
        },
        sc1_02: {
            back: "返回枢纽",
            title: "C1.02 // 摩尔大师",
            difficulty: {
                basic: "基础",
                core: "核心",
                advanced: "进阶",
                elite: "精英"
            },
            objective_title: "当前任务目标",
            target_title: "化学计量控制台",
            next: "执行下一序列",
            check: "验证",
            correct: "已验证",
            incorrect: "不匹配",
            ready: "就绪",
            monitor_title: "C1.02_称重监控",
            footer_left: "C1.02_摩尔大师 // 节点：巴塞尔",
            stages: {
                molar_mass: "摩尔质量",
                stoichiometry: "反应比例",
                yield: "理论产量",
                molar_mass_prompt_latex: "\\text{计算该化合物的摩尔质量。}",
                stoichiometry_prompt_latex: "\\text{利用化学计量关系求产物物质的量。}",
                yield_prompt_latex: "\\text{根据给定质量计算理论产量。}"
            },
            labels: {
                input: "输入",
                scale: "称重读数"
            },
            mission: {
                title: "任务：诺华合成舱",
                description: "校准制药级反应流程。平衡摩尔比例并核对理论产量。"
            }
        },
        sc2_01: {
            back: "返回枢纽",
            title: "C2.01 // 化学动力学",
            difficulty: {
                basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
            },
            objective_title: "当前任务目标",
            target_title: "动力学数据",
            scenario_title: "巴塞尔场景",
            answer_title: "你的答案",
            next: "执行下一序列",
            check: "验证",
            correct: "已验证",
            incorrect: "匹配失败",
            ready: "就绪",
            monitor_title: "C2.01_动力学监视器",
            footer_left: "C2.01_化学动力学 // 节点：巴塞尔",
            stages: {
                arrhenius: "阿伦尼乌斯",
                concentration: "速率定律",
                collision: "半衰期",
                arrhenius_prompt_latex: "\\text{使用阿伦尼乌斯方程计算速率常数 }k\\text{。}",
                concentration_prompt_latex: "\\text{根据浓度变化计算反应速率。}",
                collision_prompt_latex: "\\text{确定有效碰撞的比例。}"
            },
            labels: {
                input: "输入",
                hints: "提示",
                ph: "pH",
                volume: "体积"
            },
            mission: {
                title: "任务：化学动力学实验室",
                description: "在巴塞尔实验室研究反应速率。掌握阿伦尼乌斯方程和碰撞理论。"
            },
            formulas: {
                arrhenius: "k = Ae^{-E_a/RT}",
                concentration: "\\text{速率} = -\\frac{\\Delta[A]}{\\Delta t}",
                collision: "f = e^{-E_a/RT}"
            },
            scenarios: {
                arrhenius: "诺华动力学实验室：研究温度和活化能如何影响反应速率。阿伦尼乌斯方程 k = A·exp(-Ea/RT) 描述了速率常数的温度依赖性。更高的温度增加分子动能，导致更多成功碰撞。",
                rate_law: "罗氏制药研究：从实验数据确定反应级数和速率定律。速率定律表达反应速率如何依赖于反应物浓度。理解速率定律对于优化药物合成和预测反应行为至关重要。",
                half_life: "巴塞尔大学医院：计算药物消除半衰期用于药代动力学。半衰期是数量减少到初始值一半所需的时间。一级动力学在药物代谢中很常见，其中 t₁/₂ = ln(2)/k。"
            },
            problems: {
                arr_temp_300_ea_50: "诺华反应器温度 T=300K，活化能 Ea=50 kJ/mol。计算相对速率常数 k。",
                arr_temp_350_ea_40: "温度升至 350K，Ea=40 kJ/mol。求 k（相对单位）。",
                arr_temp_400_ea_60: "高温反应：T=400K，Ea=60 kJ/mol。计算 k。",
                arr_temp_320_ea_45: "中等条件：T=320K，Ea=45 kJ/mol。确定 k。",
                arr_temp_280_ea_55: "低温合成：T=280K，Ea=55 kJ/mol。求 k。",
                arr_double_temp: "温度从 300K 翻倍到 600K。k 增加多少倍？(Ea=50 kJ/mol)",
                arr_ea_effect: "催化剂将 Ea 从 80 降至 40 kJ/mol（300K）。求 k 比值。",
                arr_ln_form: "使用对数形式：ln(k) = ln(A) - Ea/RT。计算 Ea=50 kJ/mol，T=300K 时的 ln(k)。",
                arr_activation: "两个速率常数在 50K 温度范围内相差 10 倍。求 Ea。",
                arr_catalyst: "催化剂降低 Ea 20 kJ/mol（从 80 到 60）。计算 300K 时的 k 比值。",
                arr_two_temps: "在 300K 和 350K 测量 k。使用 ln(k₂/k₁) = -Ea/R(1/T₂ - 1/T₁) 求 Ea=52 kJ/mol。",
                arr_plot: "阿伦尼乌斯图的斜率为 -7800 K。计算 Ea（斜率 = -Ea/R）。",
                arr_frequency: "已知 k=1.5×10⁻⁹，Ea=50 kJ/mol，T=300K。求指前因子 A。",
                arr_temp_for_k: "目标速率常数 k=10⁶ s⁻¹，Ea=60 kJ/mol。需要什么温度？",
                arr_enzyme: "酶催化反应：Ea=40 kJ/mol，体温 T=310K。计算 k。",
                arr_complex: "两步机理：Ea1=50，Ea2=30 kJ/mol。总 Ea=40 kJ/mol。求 300K 时的 k。",
                arr_pressure: "压力效应：活化体积 ΔV‡=-10 cm³/mol。计算 k 比值。",
                arr_quantum: "量子隧穿校正因子 κ=2.5。求有效 k。",
                arr_isotope: "动力学同位素效应：H vs D 取代。计算 Ea=50 kJ/mol 时的 kH/kD。",
                arr_transition: "过渡态理论：300K 时 k=10⁶ s⁻¹。计算 ΔG‡。",
                rl_first_order: "一级反应：速率 = k[A]。已知 [A]=2.0 M，k=0.5 s⁻¹，求速率。",
                rl_second_order: "二级：速率 = k[A]²。[A]=1.5 M，k=0.4 M⁻¹s⁻¹。计算速率。",
                rl_zero_order: "零级反应：速率 = k（与 [A] 无关）。k=0.8 M/s。求速率。",
                rl_concentration: "一级反应：[A] 翻倍。速率增加多少倍？",
                rl_initial: "初速率法：[A]₀=1.0 M，k=0.6 s⁻¹。计算初速率。",
                rl_mixed: "混合级数：速率 = k[A][B]。[A]=2 M，[B]=3 M，k=0.5 M⁻²s⁻¹。求速率。",
                rl_order: "[A] 翻倍使速率增加 4 倍。反应级数 n 是多少？",
                rl_integrated: "一级积分式：[A]t = [A]₀·e⁻ᵏᵗ。[A]₀=1 M，k=0.1 s⁻¹，t=10 s。求 [A]。",
                rl_time: "一级半衰期：t₁/₂ = ln(2)/k。已知 k=0.05 s⁻¹，求 t₁/₂。",
                rl_constant: "从速率=2 M/s 和 [A]=4 M（一级），确定 k。",
                rl_complex_order: "分数级数：速率 = k[A]^1.5[B]^0.5。[A]=4，[B]=9，k=0.2。求速率。",
                rl_mechanism: "多步：总速率 = k₁k₂/(k₁+k₂)。k₁=0.5，k₂=0.3。计算速率。",
                rl_steady_state: "稳态近似：[I]ss = k₁[A]/k₂。k₁=0.5，k₂=0.2。求 [I]。",
                rl_pre_equilibrium: "预平衡：Keq = kf/kr。kf=0.8，kr=0.2。计算 Keq。",
                rl_inhibition: "竞争性抑制：速率降低因子 (1+[I]/KI)。[I]=2，KI=1。求速率因子。",
                rl_oscillating: "Belousov-Zhabotinsky 振荡反应。循环中最大 [A]。",
                rl_autocatalytic: "自催化：A+B→2B。[A]₀=0.1 M 时拐点在 t=15s。",
                rl_chain: "链式反应：链长 ν = kp/kt。kp/kt=100。求 ν。",
                rl_photochemical: "光化学量子产率 Φ = 反应分子数 / 吸收光子数 = 0.8。",
                rl_enzyme_complex: "Michaelis-Menten：V = Vmax[S]/(KM+[S])。KM=1，[S]=5。求 V/Vmax。",
                hl_first_order: "一级半衰期：t₁/₂ = ln(2)/k = 0.693/k。k=0.1 s⁻¹。求 t₁/₂。",
                hl_second_order: "二级：t₁/₂ = 1/(k[A]₀)。k=0.5 M⁻¹s⁻¹，[A]₀=2 M。计算 t₁/₂。",
                hl_zero_order: "零级：t₁/₂ = [A]₀/(2k)。k=0.4 M/s，[A]₀=4 M。求 t₁/₂。",
                hl_remaining: "2 个半衰期后，剩余多少？[A]₀=8 M → [A]=?",
                hl_time: "75% 衰变意味着 2 个半衰期。若 t₁/₂=10s，总时间 = 20s。",
                hl_find_k: "从 t₁/₂=5s（一级），计算 k = ln(2)/t₁/₂。",
                hl_fraction: "3 个半衰期后：分数 = (1/2)³ = 1/8 = 0.125。",
                hl_radioactive: "放射性衰变：N = N₀(1/2)^(t/t₁/₂)。N₀=1000，t=20s，t₁/₂=10s。求 N。",
                hl_drug: "药物消除：[D]₀=100 mg/L，t₁/₂=4h，t=12h（3 个半衰期）。[D]=12.5 mg/L。",
                hl_compare: "比较两个反应：kA=0.2，kB=0.4。半衰期比 = kB/kA = 2。",
                hl_consecutive: "连续 A→B→C：[B] 最大在 tmax = ln(k₁/k₂)/(k₁-k₂)。k₁=0.5，k₂=0.2。",
                hl_parallel: "平行路径：koverall = k₁+k₂。k₁=0.3，k₂=0.2，t₁/₂ = ln(2)/0.5。",
                hl_reversible: "可逆：[A]eq = [A]₀·kr/(kf+kr)。kf=0.5，kr=0.1。",
                hl_temperature: "t₁/₂ 随温度降低。350K vs 300K，Ea=50 kJ/mol。",
                hl_enzyme: "酶周转：kcat=100 s⁻¹。t₁/₂ = ln(2)/kcat = 0.007s。",
                hl_isotope_dating: "碳-14 定年：N/N₀=0.25 = (1/2)²。年龄 = 2×5730 = 11460 年。",
                hl_branching: "分支衰变：α 和 β 路径。kα/kβ=2，所以 fα = 2/3 = 0.67。",
                hl_secular: "长期平衡：母体 t₁/₂ >> 子体 t₁/₂。活度比 → 1。",
                hl_transient: "瞬态平衡：子体活度峰值时的 tmax。t₁/₂,1=10，t₁/₂,2=2。",
                hl_cosmogenic: "¹⁰Be 宇宙成因定年：t₁/₂=1.39×10⁶ 年。N/N₀=0.5 → 年龄 = t₁/₂。"
            }
        },
        sp1_03: {
            back: "返回枢纽",
            title: "P1.03 // 能量与功率",
            difficulty: {
                basic: "基础",
                core: "核心",
                advanced: "进阶",
                elite: "精英"
            },
            objective_title: "当前任务目标",
            target_title: "涡轮输出",
            next: "执行下一序列",
            check: "验证",
            correct: "已验证",
            incorrect: "不匹配",
            ready: "就绪",
            monitor_title: "P1.03_涡轮监控",
            footer_left: "P1.03_莱茵水电 // 节点：巴塞尔",
            stages: {
                potential: "势能",
                kinetic: "动能",
                power: "功率",
                potential_prompt_latex: "\\text{计算重力势能 }E_p=mgh。",
                kinetic_prompt_latex: "\\text{计算动能 }E_k=\\frac{1}{2}mv^2。",
                power_prompt_latex: "\\text{计算功率 }P=\\frac{W}{t}\\text{（若给出效率需考虑）。}"
            },
            labels: {
                input: "输入",
                formula: "公式"
            },
            formulas: {
                potential: "E_p=mgh",
                kinetic: "E_k=\\frac{1}{2}mv^2",
                power: "P=\\frac{W}{t}"
            },
            mission: {
                title: "任务：莱茵河水电站",
                description: "将莱茵河水能转化为清洁电力。追踪能量转化与涡轮功率。"
            }
        },
        sp1_07: {
            back: "返回枢纽",
            title: "SP1.07 // 压力与浮力",
            difficulty: {
                basic: "基础",
                core: "核心",
                advanced: "进阶",
                elite: "精英"
            },
            next: "执行下一序列",
            check: "验证",
            correct: "已验证",
            incorrect: "不匹配",
            ready: "就绪",
            monitor_title: "SP1.07_流体监控",
            footer_left: "SP1.07_流体力学 // 节点：莱茵河",
            objective_title: "当前任务目标",
            stages: {
                pressure: "压力",
                buoyancy: "浮力",
                hydraulics: "液压"
            },
            labels: {
                physics_display: "物理显示",
                input_terminal: "输入终端",
                depth: "深度",
                density: "物体密度",
                force: "活塞力",
                fluid_mastery: "流体掌握度"
            },
            prompts: {
                pressure_depth: "潜水员在莱茵河中潜至 {depth} 米深度。计算总压力（P₀=100000 Pa，ρ=1000 kg/m³，g=10 m/s²）。",
                buoyant_force: "体积为 {volume} m³ 的物体浸没在水中。计算浮力（ρ_water=1000 kg/m³，g=10 m/s²）。",
                hydraulic_force: "液压升降机输入力 {f1} N，作用面积 {a1} m²。输出面积为 {a2} m²。计算输出力。",
                hint_pressure: "使用 P = P₀ + ρgh",
                hint_archimedes: "使用 F_b = ρ_water × V × g",
                hint_pascal: "使用帕斯卡原理：F₁/A₁ = F₂/A₂"
            },
            scenarios: {
                rhine_swimming: "莱茵河游泳：潜水员在巴塞尔中桥附近探索莱茵河床。水压随深度增加，影响设备和安全协议。",
                rhine_boat: "莱茵河货运：驳船在莱茵河上运输货物，往返于巴塞尔和鹿特丹之间。理解浮力对于载重计算和船只稳定性至关重要。",
                hydraulic_lift: "巴塞尔建筑工地：巴塞尔建筑工地的液压升降机利用帕斯卡原理，用最小的输入力举起重型建筑材料。"
            },
            feedback: {
                correct: "流体力学已掌握！",
                incorrect: "请复习流体力学原理。"
            }
        },
    sp1_05: {
        back: "返回枢纽",
        title: "SP1.05 // 莱茵河渡轮",
        difficulty: {
            basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
        },
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "不匹配",
        ready: "就绪",
        monitor_title: "SP1.05_渡轮监视器",
        footer_left: "SP1.05_莱茵河渡轮 // 节点：巴塞尔",
        stages: {
            composition: "矢量合成",
            drift: "偏航分析",
            navigation: "精准航行"
        },
        labels: {
            river_speed: "河流速度 (v_r)",
            ferry_speed: "渡轮速度 (v_f)",
            cable_angle: "缆索角度 (θ)",
            resultant_speed: "合速度 (v_net)",
            drift_speed: "偏航速度",
            angle: "角度"
        },
        mission: {
            title: "莱茵河横渡任务",
            description: "驾驶巴塞尔莱茵河渡轮。调整缆索角度和渡轮速度以补偿河水流速。"
        }
    },
    sp2_01: {
        back: "返回枢纽",
        title: "P2.01 // 热力学",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "热量传递",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "P2.01_热力学监视器",
        footer_left: "P2.01_热力学 // 节点：巴塞尔",
        labels: {
            input: "输入",
            hints: "提示",
            heat: "热能 (Q)",
            temperature: "温度变化 (ΔT)",
            mass: "质量 (m)",
            specific_heat: "比热容 (c)"
        },
        mission: {
            title: "热反应堆控制",
            description: "诺华热反应堆需要精确的热量计算。掌握热容量和相变。"
        },
        stages: {
            heat_capacity: "热容量",
            phase_change: "相变",
            mixed: "混合问题",
            heat_capacity_prompt_latex: "\\text{使用 }Q=mc\\Delta T\\text{ 计算热量传递。}",
            phase_change_prompt_latex: "\\text{使用 }Q=mL\\text{ 计算潜热。}",
            mixed_prompt_latex: "\\text{结合热容量和相变计算。}"
        },
        formulas: {
            heat_capacity: "Q = mc\\Delta T",
            phase_change: "Q = mL",
            mixed: "Q_{\\text{总}} = Q_1 + Q_2"
        }
    },
    sp3_02: {
        back: "返回枢纽",
        title: "P3.02 // 波动光学",
        difficulty: {
            basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "波动特性",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "不匹配",
        ready: "就绪",
        monitor_title: "P3.02_光学监视器",
        footer_left: "P3.02_波动光学 // 节点：巴塞尔",
        labels: {
            input: "输入",
            hints: "提示",
            wavelength: "波长 (λ)",
            slit_separation: "缝间距 (d)",
            slit_width: "缝宽 (a)",
            angle: "角度 (θ)",
            intensity: "光强 (I)",
            order: "阶数 (m)"
        },
        mission: {
            title: "光学共振实验室",
            description: "诺华光学实验室涉及波动特性。掌握干涉、衍射和偏振。"
        },
        stages: {
            interference: "干涉",
            diffraction: "衍射",
            polarization: "偏振",
            interference_prompt_latex: "\\text{使用双缝公式计算角度 }\\theta\\text{。}",
            diffraction_prompt_latex: "\\text{使用单缝公式计算角度 }\\theta\\text{。}",
            polarization_prompt_latex: "\\text{使用马吕斯定律计算光强 }I\\text{。}"
        },
        formulas: {
            interference: "d \\sin \\theta = m \\lambda",
            diffraction: "a \\sin \\theta = m \\lambda",
            polarization: "I = I_0 \\cos^2 \\theta"
        }
    },
    sm1_02_new: {
        back: "返回 Nexus",
        title: "EM1.01 // 代数探险",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        modes: {
            containers: "容器",
            sorting: "分类",
            machine: "机器"
        },
        labels: {
            variable: "变量",
            value: "数值",
            expression: "表达式",
            simplify: "化简",
            evaluate: "求值",
            input: "输入",
            output: "输出"
        },
        stages: {
            variables: "变量概念",
            terms: "同类项",
            substitution: "代入法",
            vars_prompt: "识别容器内的数值。",
            terms_prompt: "合并同类项以化简表达式。",
            sub_prompt: "将给定的值代入表达式并计算结果。"
        },
        scenarios: {
            variables: "巴塞尔莱茵河更衣室：你正在管理著名的莱茵河游泳之家的储物柜。每个储物柜（变量 'x'）包含一个特定的物品。要理解 'x' 只是一个占位符。",
            terms: "集市广场水果摊：你在巴塞尔集市整理货物。苹果和梨不能直接混合。将相同的物品归类：3个苹果 + 2个苹果 = 5个苹果。",
            substitution: "BVB电车售票机：你正在测试售票机的逻辑。将区域值（x）代入价格公式，计算正确的法郎（CHF）票价。"
        }
    },
    sm2_07: {
        back: "返回枢纽",
        title: "SM2.07 // 坐标几何",
        difficulty: {
            basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "精密测绘",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "不匹配",
        ready: "就绪",
        monitor_title: "SM2.07_坐标监视器",
        footer_left: "SM2.07_坐标几何 // 节点：苏黎世",
        labels: {
            input: "输入",
            hints: "提示",
            distance: "距离 (d)",
            midpoint: "中点 (M)",
            slope: "斜率 (m)"
        },
        mission: {
            title: "苏黎世节点测绘",
            description: "苏黎世坐标测绘需要精密几何计算。计算城市节点间的距离、中点和斜率。"
        },
        stages: {
            distance: "距离",
            midpoint: "中点",
            slope: "斜率",
            distance_prompt_latex: "\\text{计算点 A 和 B 之间的距离 }d\\text{。}",
            midpoint_prompt_latex: "\\text{计算中点坐标 }M(x,y)\\text{。}",
            slope_prompt_latex: "\\text{计算通过 A 和 B 的直线的斜率 }m\\text{。}"
        },
        formulas: {
            distance: "d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}",
            midpoint: "M = (\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2})",
            slope: "m = \\frac{y_2-y_1}{x_2-x_1}"
        }
    },
    sm1_03_new: {
        back: "返回枢纽",
        title: "SM1.03 // 零度以下",
        difficulty: {
            basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
        },
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "不匹配",
        ready: "就绪",
        monitor_title: "SM1.03_整数监视器",
        footer_left: "SM1.03_零度以下 // 节点：巴塞尔",
        basel_scenario: "巴塞尔冬季场景",
        scenario_title: "问题背景",
        calculate_title: "计算",
        answer_title: "你的答案",
        solution_title: "解答",
        stages: {
            number_line: "数轴",
            rationals: "有理数",
            quadrants: "象限"
        },
        scenarios: {
            number_line: "巴塞尔冬季温度：你正在监测巴塞尔欧洲机场的冬季温度。温度经常降到零度以下。理解负数对于读取温度计和比较温度至关重要。数轴帮助可视化整数及其关系。",
            rationals: "莱茵河水位：巴塞尔莱茵河的水位计显示水深。正常水位是+5米。干旱时会下降。潜水员将水面以下的深度测量为负值。有理数（分数和小数）提供精确测量。",
            quadrants: "巴塞尔城市网格导航：在坐标网格上标记巴塞尔地标。大巴塞尔（Q1：+,+）、小巴塞尔（Q2：-,+）、克莱贝克（Q3：-,-）、圣阿尔班（Q4：+,-）。理解象限有助于导航城市和精确定位。"
        },
        problems: {
            nl_identify_neg3: "在数轴上定位-3。",
            nl_identify_5: "在数轴上定位5。",
            nl_temp_neg2: "温度是-2°C。在温度计上标记。",
            nl_depth_neg4: "潜水员在水面下4米。标记-4m。",
            nl_identify_0: "在数轴上定位零（原点）。",
            nl_compare_neg5_neg2: "哪个更冷：-5°C还是-2°C？",
            nl_compare_neg3_1: "哪个更小：-3还是1？",
            nl_order_three: "排序这些数字：-4, 0, 3。中间值是什么？",
            nl_rhine_level: "莱茵河水位从+5m降到-3m。新水位是多少？",
            nl_temp_drop: "温度从2°C下降7度。最终温度是多少？",
            nl_distance_abs: "数轴上-5和2之间的距离是多少？",
            nl_abs_value: "-8的绝对值是多少？",
            nl_distance_neg_neg: "-7和-3之间的距离是多少？",
            nl_midpoint: "-6和4之间的中点是什么？",
            nl_temp_range: "温度范围从-8°C到5°C。范围是多少？",
            nl_operation_add: "计算：-5 + 3",
            nl_operation_sub: "计算：-3 - 4",
            nl_operation_mult: "计算：-4 × 2",
            nl_multi_step: "计算：-6 + 8 - 5",
            nl_complex_op: "计算：(-2 + 5) - (3 - 7)",
            r_place_half: "在数轴上定位0.5。",
            r_place_neg_half: "在数轴上定位-0.5。",
            r_place_1_5: "在数轴上定位1.5。",
            r_place_neg2_5: "在数轴上定位-2.5。",
            r_fraction_third: "将1/3转换为小数（保留2位）。",
            r_compare_fractions: "哪个更大：-1/2还是-1/3？",
            r_compare_decimals: "哪个更小：-0.75还是-0.5？",
            r_order_mixed: "排序：-1.5, -0.5, 0.5。最小的是什么？",
            r_add_decimals: "计算：0.5 + 0.25",
            r_sub_decimals: "计算：1.5 - 2.25",
            r_compare_neg_decimals: "哪个更冷：-0.75°C还是-0.8°C？",
            r_fraction_to_decimal: "将-3/4转换为小数。",
            r_mult_decimals: "计算：0.5 × 1.5",
            r_div_decimals: "计算：1.5 ÷ 0.5",
            r_mixed_operations: "计算：0.5 + 1.25 - 0.75",
            r_order_complex: "从小到大排序：-1.5, -3/2, 0, 1.2。第一个是什么？",
            r_fraction_operations: "计算：1/2 + 1/4（小数形式）",
            r_neg_fraction_ops: "计算：-1/2 - 1/4（小数形式）",
            r_complex_decimal: "计算：(0.5 - 1.25) × 2",
            r_repeating_decimal: "将2/3转换为小数（保留2位）。",
            q_identify_point: "点(2, 3)的x坐标是什么？",
            q_identify_y: "点(3, 4)的y坐标是什么？",
            q_plot_positive: "绘制点(1, 2)。x是什么？",
            q_origin: "原点的x坐标是什么？",
            q_axis_point: "点(3, 0)在哪个轴上？y是什么？",
            q_quadrant_2: "点(-2, 5)在哪个象限？",
            q_quadrant_3: "点(-3, -4)在哪个象限？",
            q_quadrant_4: "点(4, -2)在哪个象限？",
            q_basel_landmarks: "小巴塞尔在(-3, 2)。x是什么？",
            q_distance_horizontal: "(2, 0)和(5, 0)之间的距离？",
            q_reflect_x_axis: "将(3, 4)关于x轴反射。y'是什么？",
            q_reflect_y_axis: "将(5, 2)关于y轴反射。x'是什么？",
            q_reflect_origin: "将(3, 4)关于原点反射。x'是什么？",
            q_translate: "将(2, 3)平移(4, 0)。x'是什么？",
            q_midpoint_2d: "(2, 3)和(6, 3)之间的中点。x是什么？",
            q_distance_vertical: "(0, 5)和(0, -3)之间的距离？",
            q_perimeter_rectangle: "顶点在(0,0)和(4,3)的矩形。周长？",
            q_area_rectangle: "顶点在(0,0)和(4,3)的矩形。面积？",
            q_diagonal_distance: "从(2, 3)到(6, 5)的水平距离？",
            q_complex_translation: "从(2, 3)开始，向右移动3，向左移动1。最终x？"
        }
    },
    sm1_04_new: {
        back: "返回枢纽",
        title: "SM1.04 // 等式平衡",
        difficulty: {
            basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
        },
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "不匹配",
        ready: "就绪",
        monitor_title: "SM1.04_等式监视器",
        footer_left: "SM1.04_等式平衡 // 节点：巴塞尔",
        basel_scenario: "巴塞尔等式场景",
        scenario_title: "问题背景",
        solve_title: "求解等式",
        answer_title: "你的答案",
        solution_title: "解答",
        stages: {
            balance: "平衡",
            solve: "求解",
            transform: "转换",
            applications: "应用"
        },
        scenarios: {
            balance: "理解等式平衡：就像天平一样，等式必须保持平衡。无论对一边做什么，都必须对另一边做同样的操作。这个基本原则是解所有等式的关键。",
            solve: "解一元一次方程：使用逆运算来孤立变量。加/减以移动常数，乘/除以移除系数。每一步都让你离找到x更近一步。",
            transform: "等式变换：掌握将项移过等号的艺术。合并同类项，展开括号，并简化分数。将复杂的等式转换为简单的等式。",
            applications: "巴塞尔现实问题：应用等式解决巴塞尔的实际问题。计算公交车票价、莱茵河渡轮时间、诺华实验室测量数据和罗氏药物浓度。"
        },
        problems: {
            bal_add_both: "在 x + 3 = 7 的两边同时加 2",
            bal_subtract_both: "在 x + 5 = 8 的两边同时减 5",
            bal_multiply_both: "两边同时乘以 2",
            bal_divide_both: "两边同时除以 2",
            bal_simple_check: "通过移动常数求解",
            bal_two_steps: "先减去 3，再除以 2",
            bal_negative_result: "结果将是负数",
            bal_fraction_coeff: "先减去 2，再乘以 3",
            bal_both_sides_x: "将 x 项移到一边",
            bal_distribute: "先展开括号",
            bal_complex_both: "两边都有变量",
            bal_fractions: "找到公分母",
            bal_parentheses_both: "先展开两边的括号",
            bal_decimal_coeff: "使用小数运算",
            bal_negative_coeff: "负系数",
            bal_nested_parens: "先简化最内层的括号",
            bal_three_fractions: "三个不同分母的分数",
            bal_complex_distribute: "多步分配",
            bal_reciprocal: "倒数分数",
            bal_proportion: "比例等式",
            sol_one_step_add: "一步：减去 3",
            sol_one_step_sub: "一步：加上 5",
            sol_one_step_mult: "一步：除以 3",
            sol_one_step_div: "一步：乘以 4",
            sol_negative_simple: "结果是负数",
            sol_two_step_1: "两步：先减后除",
            sol_two_step_2: "两步：先加后乘",
            sol_negative_coeff: "负系数",
            sol_fraction_result: "答案是分数",
            sol_decimal_coeff: "小数系数",
            sol_combine_like: "先合并同类项",
            sol_distribute_simple: "先分配再求解",
            sol_x_both_sides: "两边都有变量",
            sol_fraction_both: "加分数",
            sol_negative_both: "两边都有负项",
            sol_complex_distribute: "复杂分配",
            sol_nested_parens: "嵌套括号",
            sol_three_terms: "三个分数项",
            sol_decimal_complex: "带括号的小数",
            sol_proportion_eq: "比例等式",
            tra_move_constant: "将常数移到右边",
            tra_move_variable: "移动变量项",
            tra_isolate_x: "通过除法孤立 x",
            tra_two_moves: "两步变换",
            tra_negative_move: "移动负项",
            tra_collect_terms: "收集同类项",
            tra_move_both: "从两边移动项",
            tra_expand_first: "先展开再移动",
            tra_fraction_clear: "先清除分数",
            tra_negative_coeff: "处理负系数",
            tra_multi_step: "多步变换",
            tra_both_expand: "展开两边",
            tra_fractions_lcd: "找分数的最小公分母",
            tra_decimal_expand: "展开小数表达式",
            tra_complex_collect: "复杂项收集",
            tra_nested_complex: "嵌套括号变换",
            tra_three_fractions: "合并三个分数",
            tra_double_expand: "双重展开",
            tra_proportion_cross: "交叉相乘",
            tra_mixed_complex: "混合分数和小数",
            app_bus_ticket: "巴塞尔 BVB 公交：成人票价 x 瑞郎。儿童票便宜 2 瑞郎。如果成人票是 5 瑞郎，求 x。",
            app_rhine_time: "莱茵河渡轮：单程需要 2x 分钟。往返需要 10 分钟。求 x。",
            app_age_simple: "年龄问题：5 年后，你将 12 岁。你现在多大？",
            app_distance_simple: "巴塞尔到苏黎世：一半距离是 6 公里。求总距离。",
            app_price_discount: "罗氏食堂：打折 10 瑞郎后，餐费 40 瑞郎。原价是多少？",
            app_tram_tickets: "巴塞尔有轨电车：3 张成人票每张 x 瑞郎，加 2 张儿童票每张 2 瑞郎，总共 13 瑞郎。求 x。",
            app_novartis_samples: "诺华实验室：5 个盒子每个有 x 个样本，加 10 个额外样本，总共 60 个。求 x。",
            app_age_sum: "父子：儿子 x 岁，父亲大 30 岁。他们年龄总和是 50。求儿子年龄。",
            app_rectangle_perimeter: "巴塞尔公园：矩形花园，长 8 米，宽 x 米，周长 28 米。求宽度。",
            app_speed_distance: "巴塞尔到利斯塔尔：以 x 公里/小时行驶 2 小时，距离 80 公里。求速度。",
            app_roche_concentration: "罗氏实验室：将 50 毫升 x% 溶液与 100 毫升 30% 溶液混合，得到 150 毫升 40% 溶液。求 x。",
            app_consecutive_numbers: "三个连续数字之和为 48。求第一个数字。",
            app_work_rate: "巴塞尔建筑：工人 A 需要 x 小时完成，工人 B 需要 6 小时。一起工作 2 小时完成。求 x。",
            app_mixture_problem: "诺华：将 x 升 20% 溶液与 10 升 50% 溶液混合，得到 30% 溶液。求 x。",
            app_investment_interest: "巴塞尔银行：投资 x 瑞郎，年利率 5%。一年后总额 2100 瑞郎。求 x。",
            app_train_meeting: "巴塞尔-苏黎世列车：列车 A 时速 80 公里，列车 B 时速 100 公里，相距 360 公里。何时相遇？",
            app_age_ratio: "年龄比：5 年后，你和弟弟的年龄比是 2:3。你现在 x 岁。求 x。",
            app_compound_mixture: "罗氏：向 20 升 30% 酸溶液中加入 x 升纯酸，得到 50% 溶液。求 x。",
            app_boat_current: "莱茵河船：顺流 30 公里再逆流返回需要 5 小时。水流速度 2 公里/小时。求静水中船速。",
            app_profit_loss: "巴塞尔商店：以 20% 利润或 10% 亏损出售，差价 60 瑞郎。求成本价。"
        }
    },
    sm1_05_new: {
        back: "返回枢纽",
        title: "SM1.05 // 比例实验室",
        difficulty: {
            basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
        },
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "不匹配",
        ready: "就绪",
        monitor_title: "SM1.05_比例监视器",
        footer_left: "SM1.05_比例实验室 // 节点：巴塞尔",
        stages: {
            recipes: "配方",
            percent: "百分比",
            mixtures: "混合物"
        },
        labels: {
            ratio: "比例",
            proportion: "比例关系",
            percentage: "百分比",
            concentration: "浓度",
            solute: "溶质",
            solvent: "溶剂"
        }
    },
    sm2_08: {
        back: "返回枢纽",
        title: "SM2.08 // 概率基础",
        difficulty: {
            basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
        },
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "不匹配",
        ready: "就绪",
        monitor_title: "SM2.08_概率监视器",
        footer_left: "SM2.08_概率统计 // 节点：巴塞尔",
        formula_title: "概率公式",
        scenario_title: "问题",
        basel_scenario: "巴塞尔生活场景",
        calculate_title: "计算",
        answer_title: "你的答案",
        solution_title: "解答",
        stages: {
            basic_prob: "基础概率",
            lottery: "彩票与游戏",
            combined: "组合事件",
            data_stats: "数据统计"
        },
        scenarios: {
            bus_punctuality: "巴塞尔公共交通：你每天乘坐8路公交车上学。",
            weather_basel: "巴塞尔气象站：用于决策的气象数据。",
            school_cafeteria: "学校食堂：每周菜单规划。",
            exam_results: "班级表现：考试成绩分析。",
            dice_game: "概率游戏：理解公平骰子。",
            card_game: "纸牌游戏：标准52张扑克牌。",
            dice_advanced: "高级骰子：质数和特殊结果。",
            school_raffle: "学校慈善抽奖：支持本地社区。",
            fasnacht_game: "巴塞尔狂欢节：节日游戏摊位。",
            swiss_lotto_simple: "瑞士乐透简化版：理解彩票赔率（6选3）。",
            dice_win_condition: "狂欢节骰子游戏：和为7或11获胜。",
            two_buses: "日常通勤：早晚公交可靠性。",
            fc_basel: "巴塞尔足球俱乐部：主客场比赛预测。",
            novartis_qc: "诺华质量控制：药品样本检测。",
            three_events: "多次抛硬币：理解组合。",
            temperature: "巴塞尔天气：每周温度追踪。",
            test_scores: "班级成绩：考试结果统计分析。",
            pocket_money: "个人理财：每月支出明细。",
            data_comparison: "数据分析：比较平均值和中位数。",
            tram_punctuality: "巴塞尔有轨电车系统：3路电车可靠性。",
            coin_flip: "抛硬币：基础概率实验。",
            dice_two: "两个骰子：理解组合结果。",
            two_coins: "两枚硬币：独立事件。",
            three_buses: "三条公交线路：多个独立事件。",
            four_buses: "四条公交线路：扩展概率链。",
            complex_event: "复杂概率：高级场景。",
        },
        problems: {
            bus_ontime_16_20: "过去20天中，公交车准时到达16次。明天准时到达的概率是多少？",
            bus_ontime_18_20: "过去20天中，公交车准时到达18次。明天准时到达的概率是多少？",
            weather_rain_12_30: "巴塞尔气象站记录30天中有12天下雨。本周末下雨的概率是多少？",
            weather_sunny_21_30: "巴塞尔气象站记录30天中有21天晴天。明天晴天的概率是多少？",
            dice_roll_3: "掷一个标准骰子。掷出3的概率是多少？",
            coin_heads: "抛一次公平硬币。得到正面的概率是多少？",
            cafeteria_pizza: "学校食堂每周5天中有3天供应披萨。如果你随机去食堂，吃到披萨的概率是多少？",
            exam_pass: "一个100人的班级中，85人通过了考试。随机选一个学生，他通过的概率是多少？",
            tram_ontime_17_20: "3路电车20天中有17天准时到达。今天准时到达的概率是多少？",
            dice_greater_4: "掷骰子。掷出大于4的数字的概率是多少？",
            dice_even: "掷一个标准骰子。掷出偶数（2、4或6）的概率是多少？",
            card_heart: "从标准52张扑克牌中抽一张。抽到红心的概率是多少？",
            card_red: "从标准牌组中抽一张牌。抽到红色牌的概率是多少？",
            two_dice_sum_8: "掷两个骰子。和为8的概率是多少？",
            card_face: "抽一张牌。抽到人头牌（J、Q或K）的概率是多少？",
            dice_prime: "掷骰子。掷出质数（2、3或5）的概率是多少？",
            two_dice_sum_10: "掷两个骰子。和为10的概率是多少？",
            card_ace_or_king: "抽一张牌。抽到A或K的概率是多少？",
            two_dice_doubles: "掷两个骰子。掷出相同数字的概率是多少？",
            card_spade_face: "抽一张牌。抽到黑桃人头牌的概率是多少？",
            school_raffle_win: "学校为慈善活动售出100张彩票。你买了3张。你中奖的概率是多少？",
            school_raffle_5_tickets: "学校售出100张彩票。你买了5张。你中奖的概率是多少？",
            coin_two_heads: "抛两枚硬币。两个都是正面的概率是多少？",
            dice_not_six: "掷骰子。不掷出6的概率是多少？",
            school_raffle_2_tickets: "学校售出50张彩票。你买了2张。你中奖的概率是多少？",
            dice_sum_7: "在巴塞尔狂欢节游戏摊位掷两个骰子。和为7的概率是多少？",
            dice_sum_9: "掷两个骰子。和为9的概率是多少？",
            coin_three_all_heads: "抛三枚硬币。三个都是正面的概率是多少？",
            dice_sum_6: "掷两个骰子。和为6的概率是多少？",
            card_two_red: "不放回地抽两张牌。两张都是红色的概率是多少？",
            lotto_simple: "简化版瑞士乐透：从6个数字中选3个。共有20种可能组合。你的中奖概率是多少？",
            lotto_4_from_8: "简化彩票：从8个数字中选4个。共有70种组合。你的中奖概率是多少？",
            dice_sum_less_5: "掷两个骰子。和小于5的概率是多少？",
            coin_four_at_least_3_heads: "抛四枚硬币。至少3个正面的概率是多少？",
            card_three_hearts: "不放回地抽三张牌。三张都是红心的概率是多少？",
            dice_sum_7_or_11: "狂欢节游戏：掷两个骰子。和为7或11获胜。获胜概率是多少？",
            dice_sum_2_3_12: "狂欢节游戏：掷两个骰子。和为2、3或12输。输的概率是多少？",
            lotto_5_from_10: "彩票：从10个数字中选5个。共有252种组合。你的中奖概率是多少？",
            coin_five_exactly_2_heads: "抛五枚硬币。恰好2个正面的概率是多少？",
            card_poker_pair: "抽5张牌。至少有一对的概率是多少？（简化：约42.3%）",
            two_buses_ontime: "早上8路公交准点率80%。晚上15路公交准点率70%。两趟都准点的概率是多少？",
            two_coins_both_heads: "抛两枚硬币。两个都是正面的概率是多少？",
            two_dice_both_even: "掷两个骰子。两个都是偶数的概率是多少？",
            two_days_both_sunny: "巴塞尔晴天概率70%。今天和明天都晴天的概率是多少？",
            two_students_both_pass: "两个学生参加考试，通过率85%。两人都通过的概率是多少？",
            fc_basel_wins: "巴塞尔足球俱乐部主场胜率60%，客场胜率30%。本周两场都赢的概率是多少？",
            three_buses_all_ontime: "三条公交线路准点率分别为80%、75%和90%。三条都准点的概率是多少？",
            three_days_all_sunny: "巴塞尔晴天概率70%。未来3天都晴天的概率是多少？",
            three_dice_all_six: "掷三个骰子。三个都是6的概率是多少？",
            fc_basel_at_least_one_win: "巴塞尔足球俱乐部主场胜率60%，客场胜率30%。至少赢一场的概率是多少？",
            quality_all_pass: "诺华质量控制：每个样本合格率95%。如果检测5个样本，全部合格的概率是多少？",
            quality_at_least_4_pass: "诺华：5个样本，每个合格率95%。至少4个合格的概率是多少？",
            four_buses_all_ontime: "四条公交线路每条准点率80%。四条都准点的概率是多少？",
            week_no_rain: "巴塞尔每天下雨概率40%。连续7天不下雨的概率是多少？",
            five_students_all_pass: "五个学生参加考试，通过率85%。五人都通过的概率是多少？",
            three_coins_two_heads: "抛三枚硬币。恰好2个正面的概率是多少？",
            four_coins_exactly_3_heads: "抛四枚硬币。恰好3个正面的概率是多少？",
            quality_exactly_4_pass: "诺华：5个样本，每个合格率95%。恰好4个合格的概率是多少？",
            five_coins_at_least_4_heads: "抛五枚硬币。至少4个正面的概率是多少？",
            birthday_paradox_simple: "两个人：他们生日相同的概率是多少？（忽略闰年）",
            avg_temperature: "巴塞尔本周气温：18°C、22°C、20°C、19°C、21°C、23°C、20°C。计算平均温度。",
            simple_average_5: "考试成绩：80、85、90、75、95。计算平均分。",
            simple_sum: "每月支出：食物40瑞郎、交通25瑞郎、娱乐20瑞郎、储蓄15瑞郎。总共多少？",
            avg_temperature_5_days: "气温：15°C、18°C、20°C、17°C、20°C。计算平均温度。",
            median_5_values: "数据集：10、12、15、18、20。找出中位数。",
            class_average: "班级考试成绩：85、72、90、68、78、82、75、88、70、92。计算班级平均分。",
            spending_analysis: "每月支出：食物40瑞郎、交通25瑞郎、娱乐20瑞郎、储蓄15瑞郎。食物支出占百分之几？",
            median_even_count: "考试成绩：70、75、80、85。找出中位数。",
            range_calculation: "每周气温：15°C、18°C、20°C、17°C、23°C。计算极差（最大值-最小值）。",
            percentage_transport: "每月预算100瑞郎：食物40、交通25、娱乐20、储蓄15。交通占百分之几？",
            weighted_average: "两次考试：考试1（权重2）：80分，考试2（权重3）：90分。计算加权平均分。",
            median_vs_mean: "数据集：10、12、15、18、20。找出中位数。",
            mode_calculation: "考试成绩：80、85、85、90、85、75。找出众数（最常见的值）。",
            budget_remaining: "每月预算100瑞郎。已花费：食物40、交通25、娱乐20。还剩多少？",
            quartile_calculation: "气温：15°C、17°C、18°C、20°C、23°C。找出Q1（第25百分位数）。",
            standard_deviation_simple: "数据：10、15、20。平均值=15。计算方差：平方偏差的平均值。",
            outlier_effect: "数据：10、12、15、18、100。计算平均值。注意异常值（100）如何影响它。",
            interquartile_range: "数据：10、15、20、25、30。Q1=15，Q3=25。计算IQR = Q3 - Q1。",
            percentage_change: "上个月：100瑞郎。这个月：120瑞郎。计算百分比变化。",
            correlation_direction: "随着学习时间增加，考试成绩提高。相关性是正（1）还是负（-1）？",
        }
    },
    gp5_01: {
        back: "返回枢纽",
        title: "P5.01 // 原子核核心",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "同位素 / 衰变",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "P5.01_核物理监视器",
        footer_left: "P5.01_现代物理 // 节点：巴塞尔",
        labels: {
            input: "输入参数",
            hints: "提示",
            balancing: "核反应方程式",
            mass: "质量数 (A)",
            atomic: "原子序数 (Z)"
        },
        mission: {
            title: "稳定核心",
            description: "诺华创新区需要一种稳定的同位素。通过识别正确的衰变粒子来平衡核反应方程式。"
        },
        stages: {
            alpha: "α 衰变",
            beta: "β 衰变",
            gamma: "γ 放射",
            fission: "核裂变",
            alpha_decay: "α 衰变",
            beta_decay: "β 衰变",
            gamma_decay: "γ 放射",
            alpha_decay_prompt_latex: "\\text{平衡 α 衰变方程式。}",
            beta_decay_prompt_latex: "\\text{平衡 β 衰变方程式。}",
            gamma_decay_prompt_latex: "\\text{识别 γ 放射状态。}",
            fission_prompt_latex: "\\text{预测核裂变反应中缺失产物。}"
        }
    },
    gp5_02: {
        back: "返回枢纽",
        title: "P5.02 // 相对论实验室",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "相对论效应",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "P5.02_相对论监视器",
        footer_left: "P5.02_狭义相对论 // 节点：CERN",
        labels: {
            input: "输入",
            hints: "提示",
            velocity: "速度 (v/c)",
            gamma: "洛伦兹因子 (γ)",
            length: "收缩长度",
            time: "膨胀时间"
        },
        mission: {
            title: "爱因斯坦实验室",
            description: "在 CERN，通过计算接近光速时的相对论效应来校准粒子加速器。"
        },
        stages: {
            lorentz: "洛伦兹因子",
            contraction: "长度收缩",
            dilation: "时间膨胀",
            lorentz_prompt_latex: "\\text{计算速度 }v\\text{ 下的洛伦兹因子 }\\gamma\\text{。}",
            contraction_prompt_latex: "\\text{计算收缩长度 }L=L_0/\\gamma\\text{。}",
            dilation_prompt_latex: "\\text{计算膨胀时间 }T=T_0\\times\\gamma\\text{。}"
        }
    },
    sm3_04: {
        back: "返回枢纽",
        title: "SM3.04 // 对数刻度",
        difficulty: {
            basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "对数测量",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "SM3.04_对数监视器",
        footer_left: "SM3.04_对数 // 节点：巴塞尔",
        labels: {
            input: "输入",
            hints: "提示",
            ph: "pH 值",
            decibel: "分贝 (dB)",
            richter: "里氏震级"
        },
        mission: {
            title: "对数测量实验室",
            description: "掌握三种真实世界的对数刻度：pH值（化学）、分贝（声音）、里氏震级（地震）。每种刻度都将巨大的范围压缩成可管理的数字。"
        },
        stages: {
            ph: "pH 刻度",
            decibel: "分贝",
            richter: "里氏震级",
            ph_prompt_latex: "\\text{使用 }pH=-\\log_{10}[H^+]\\text{ 计算 pH 值。}",
            decibel_prompt_latex: "\\text{使用 }L=10\\log_{10}(I/I_0)\\text{ 计算分贝。}",
            richter_prompt_latex: "\\text{使用 }M=\\log_{10}(A)\\text{ 计算震级。}"
        },
        formulas: {
            ph: "pH = -\\log_{10}[H^+]",
            decibel: "L = 10\\log_{10}(I/I_0)",
            richter: "M = \\log_{10}(A)"
        },
        scenarios: {
            ph_basic: "🧪 场景：学校化学实验室 — 化学老师给你一瓶透明液体让你测试。你用 pH 计测得氢离子浓度 [H⁺] = 0.001 mol/L（科学记数法是 10⁻³）。要正确报告酸度，你需要计算 pH 值。记住：pH = -log₁₀[H⁺]。pH 低于 7 是酸性，pH 7 是中性（纯水），高于 7 是碱性。这瓶液体原来是柠檬汁！",
            ph_core: "🧪 场景：游泳池水质检测 — 你在巴塞尔公共游泳池兼职。卫生检查员要求每天测试 pH 值。今天的水样显示 [H⁺] = 10⁻⁸ mol/L。你需要计算 pH 值来验证是否在安全范围内（7.2-7.8）。如果 pH 太低（酸性），会刺激游泳者的眼睛。如果太高（碱性），氯气消毒就不起作用。你的计算决定了游泳池今天能否开放！",
            ph_advanced: "🧪 场景：制药质量控制 — 你是巴塞尔诺华制药的实习生。一种新药配方必须精确控制 pH 值以保持稳定性。实验室测得 [H⁺] = 3.16 × 10⁻⁵ mol/L。计算 pH 值并保留 2 位小数。如果 pH 值偏离目标范围（4.3-4.7），整批产品（价值数百万）都必须报废。对数精度在制药业至关重要！",
            ph_elite: "🧪 场景：环境酸雨研究 — 巴塞尔大学的研究人员正在研究酸雨对瑞士森林的影响。雨水样本显示 [H⁺] = 10⁻⁴·⁵ mol/L（注意这个分数指数！）。计算 pH 值。正常雨水是 pH 5.6，但酸雨可以低至 pH 4.0 或更低。每个 pH 单位代表酸度的 10 倍变化，所以 pH 4 的雨比 pH 6 的雨酸性强 100 倍。你的计算有助于评估环境破坏程度。",
            decibel_basic: "🔊 场景：学校图书馆噪音检查 — 图书管理员让你测量自习区是否足够安静。你用声音计测得：强度 I = 10⁻¹⁰ W/m²。参考强度（听觉阈值）是 I₀ = 10⁻¹² W/m²。使用 L = 10·log₁₀(I/I₀) 计算声音级别（分贝）。参考：耳语 = 30 分贝，正常对话 = 60 分贝，图书馆应低于 40 分贝。",
            decibel_core: "🔊 场景：音乐会音响工程师 — 你正在为学校礼堂的摇滚音乐会调试音响。音响系统在前排产生的强度 I = 10⁻⁴ W/m²。计算分贝级别。安全法规要求 85 分贝以上需要听力保护，长时间暴露在 100 分贝以上会造成听力损伤。你的计算决定是否需要降低音量或向观众提供耳塞。",
            decibel_advanced: "🔊 场景：机场噪音污染研究 — 巴塞尔-米卢斯机场正在扩建，居民抱怨噪音。你测量一架起飞的喷气式飞机：在 100 米距离处 I = 1 W/m²。计算分贝级别。市政法规限制机场白天噪音不超过 65 分贝。在 120 分贝（喷气发动机）时，声音是痛苦的。对数刻度意味着 120 分贝不是 60 分贝的'两倍响'——它的强度是 1,000,000 倍！",
            decibel_elite: "🔊 场景：声学工程挑战 — 正在设计一座巴塞尔音乐厅。建筑师需要计算吸音效果。如果原始强度是 I₁ = 10⁻³ W/m²，安装吸音板后降至 I₂ = 10⁻⁶ W/m²，分贝降低了多少？计算 L₁ - L₂。这涉及理解分贝差异代表强度比：降低 10 分贝意味着强度减少 10 倍，降低 20 分贝意味着强度减少 100 倍。",
            richter_basic: "🌍 场景：地震监测站 — 你在巴塞尔大学的地震学实验室做志愿者。巴塞尔附近发生了一次小地震。地震仪记录的地面运动振幅 A = 100 微米。使用 M = log₁₀(A) 计算里氏震级。参考：M < 2 感觉不到，M 3-4 是轻微，M 5-6 是中等，M 7+ 是重大。你的计算有助于对地震严重程度进行分类。",
            richter_core: "🌍 场景：历史地震分析 — 1356 年，巴塞尔经历了瑞士有记录以来最强的地震。现代分析估计地面振幅为 A = 100,000 微米。计算里氏震级。将其与 2011 年日本地震（M 9.0）进行比较，后者的振幅为 1,000,000,000 微米。对数刻度将这个十亿倍的范围压缩成可管理的数字（1 到 9）。",
            richter_advanced: "🌍 场景：地震预警系统 — 瑞士正在开发地震警报应用。发生两次地震：地震 A 的振幅为 31,600 微米，地震 B 的振幅为 1,000 微米。计算两个震级并保留 2 位小数。应用需要区分'轻微震动'（M < 4.0）和'显著地震'（M ≥ 4.0），以决定是否向数百万手机发送紧急警报。",
            richter_elite: "🌍 场景：地震能量比较 — 高级地震学：地震释放的能量每增加一个震级单位就增加 31.6 倍。如果地震 A 是 M 5.0，地震 B 是 M 7.0，B 释放的能量是 A 的多少倍？首先理解 M 7.0 意味着振幅是 M 5.0 的 100 倍（因为 10² = 100）。但能量按振幅的 1.5 次方缩放，所以能量比是 100^1.5 = 1,000 倍。这就是为什么 M 7 地震是灾难性的，而 M 5 只是'中等'。"
        },
        canvas: {
            ph_title: "pH 刻度",
            ph_formula: "pH = -log₁₀[H⁺]",
            decibel_title: "分贝刻度",
            decibel_formula: "L = 10·log₁₀(I/I₀)",
            richter_title: "里氏震级",
            richter_formula: "M = log₁₀(A)",
            ph_subtitle: "酸碱度",
            decibel_subtitle: "声音",
            richter_subtitle: "地震",
            status_chamber: "实验室",
            status_sim: "对数刻度模拟：运行中",
            status_mode: "模式"
        }
    },
    sc3_01: {
        back: "返回枢纽",
        title: "C3.01 // 分子建筑师",
        difficulty: {
            basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "分子结构",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "C3.01_分子监视器",
        footer_left: "C3.01_分子建筑师 // 节点：巴塞尔",
        labels: {
            input: "输入",
            hints: "提示",
            atom: "原子",
            bond: "化学键",
            snap: "吸附",
            grid: "网格"
        },
        mission: {
            title: "分子组装实验室",
            description: "使用球棍模型组装药物分子。旋转并观察 3D 结构。"
        },
        stages: {
            aspirin: "阿司匹林",
            caffeine: "咖啡因"
        }
    },
    sp1_06: {
        back: "返回枢纽",
        title: "SP1.06 // 瑞士钟摆",
        difficulty: {
            basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "振荡数据",
        next: "执行下一序列",
        check: "验证",
        correct: "验证通过",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "SP1.06_钟摆监控器",
        footer_left: "SP1.06_钟摆力学 // 节点：巴塞尔",
        labels: {
            input: "输入",
            hints: "提示",
            period: "周期 (T)",
            length: "长度 (L)",
            gravity: "重力加速度 (g)",
            frequency: "频率 (f)"
        },
        mission: {
            title: "钟表匠的秘密",
            description: "校准巴塞尔的机械主钟。掌握简谐运动和能量守恒的物理学。"
        },
        stages: {
            period: "周期",
            gravity: "重力",
            energy: "能量"
        }
    },
    sp2_02: {
        back: "返回枢纽",
        title: "SP2.02 // 电路沙盒 2.0",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "电路分析",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "SP2.02_电路监视器",
        footer_left: "SP2.02_电路沙盒 // 节点：巴塞尔",
        labels: {
            multimeter: "万用表",
            oscilloscope: "示波器",
            resistance: "电阻",
            capacitance: "电容",
            inductance: "电感",
            voltage: "电压",
            analysis: "电路分析",
            damping: "阻尼类型",
            formulas: "RLC 公式",
            reset: "重置"
        },
        mission: {
            title: "任务：RLC 瞬态分析",
            description: "构建和分析 RLC 电路。使用万用表测量电压和电流。在示波器上观察瞬态响应。"
        },
        stages: {
            build: "构建电路",
            measure: "测量数值",
            analyze: "分析响应",
            build_desc: "连接电阻、电容和电感",
            measure_desc: "使用万用表测量电压和电流",
            analyze_desc: "观察示波器波形",
            build_hint: "点击组件以选择它们",
            measure_hint: "选择 2 个点以测量电压降",
            analyze_hint: "观察过阻尼、欠阻尼或临界阻尼响应"
        }
    },
    sp4_01: {
        back: "返回枢纽",
        title: "SP3.03 // 波动基础",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "波动参数",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "SP3.03_波动监视器",
        footer_left: "SP3.03_波动基础 // 节点：莱茵河",
        labels: {
            wave_type: "波动类型",
            transverse: "横波",
            longitudinal: "纵波",
            amplitude: "振幅",
            frequency: "频率",
            wave_speed: "波速",
            wavelength: "波长",
            period: "周期",
            angular_freq: "角频率",
            calculated: "计算值",
            show_particles: "显示粒子运动",
            formulas: "公式"
        },
        mission: {
            title: "任务：莱茵河波动分析",
            description: "研究莱茵河上的机械波。掌握波动参数：振幅、频率、波长和周期。"
        },
        stages: {
            transverse: "横波",
            longitudinal: "纵波",
            parameters: "波动参数",
            transverse_desc: "观察垂直粒子运动",
            longitudinal_desc: "研究压缩和稀疏",
            parameters_desc: "计算波长、周期和速度",
            transverse_hint: "粒子垂直于波传播方向振动",
            longitudinal_hint: "粒子平行于波传播方向振动",
            parameters_hint: "v = λf, T = 1/f, ω = 2πf"
        }
    },
    sb1_01: {
        back: "返回枢纽",
        title: "SB1.01 // 细胞工厂",
        difficulty: {
            basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "细胞分析",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "SB1.01_细胞监视器",
        footer_left: "SB1.01_细胞工厂 // 节点：巴塞尔",
        stages: {
            identification: "结构识别",
            function: "功能匹配",
            organelles: "细胞器详解"
        },
        labels: {
            cutaway_view: "切面视图",
            selected: "选定细胞器",
            instructions: "操作说明",
            nucleus: "细胞核",
            mitochondria: "线粒体",
            chloroplast: "叶绿体",
            ribosome: "核糖体",
            golgi: "高尔基体",
            er: "内质网",
            membrane: "细胞膜",
            vacuole: "液泡"
        },
        mission: {
            title: "任务：细胞探索",
            description: "探索真核细胞结构。识别细胞器并理解它们在细胞生命活动中的作用。"
        },
        prompts: {
            id_prompt: "识别3D视图中高亮显示的细胞器。",
            id_target: "高亮部分: ?",
            fn_prompt: "哪个细胞器负责: {func}?",
            fn_target: "功能: {func}",
            hint_name: "它是 {name}",
            hint_start: "答案以 {char} 开头"
        },
        organelles: {
            nucleus: {
                name: "细胞核",
                func: "控制中心 / DNA 存储",
                details: "包含 DNA 并控制所有细胞活动。细胞的“大脑”。"
            },
            mitochondria: {
                name: "线粒体",
                func: "ATP 能量产生 (动力源)",
                details: "通过细胞呼吸产生 ATP。将葡萄糖转化为能量。"
            },
            ribosome: {
                name: "核糖体",
                func: "蛋白质合成",
                details: "通过读取 mRNA 序列合成蛋白质。"
            },
            golgi: {
                name: "高尔基体",
                func: "包装与运输",
                details: "修改、包装并将蛋白质运输到目的地。"
            },
            er: {
                name: "内质网",
                func: "合成网络 (ER)",
                details: "粗面内质网：蛋白质合成。光面内质网：脂质合成和解毒。"
            }
        }
    },
    sb1_01_metabolic: {
        back: "返回枢纽",
        title: "SB1.01 // 代谢引擎",
        difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
        objective_title: "当前任务目标",
        target_title: "代谢状态",
        next: "执行下一序列",
        check: "验证",
        correct: "稳态正常",
        incorrect: "代谢危机",
        ready: "就绪",
        monitor_title: "SB1.01_代谢监视器",
        footer_left: "SB1.01_细胞生物学 // 节点：巴赛尔",
        stages: {
            osmosis: "渗透作用",
            respiration: "细胞呼吸",
            homeostasis: "内稳态"
        },
        labels: {
            osmolarity: "外部渗透压",
            atp_flow: "显示 ATP 流",
            hypertonic: "高渗",
            isotonic: "等渗",
            hypotonic: "低渗",
            status: "渗透状态",
            respiration_formula: "呼吸作用公式",
            glucose: "葡萄糖",
            oxygen: "氧气",
            atp: "ATP 能量"
        },
        prompts: {
            osmosis_prompt: "细胞处于{status}环境中。水分会如何移动？",
            respiration_prompt: "完成呼吸作用反应物：C₆H₁₂O₆ + 6{reactant} → ...",
            product_prompt: "呼吸作用的主要能量产物是什么？",
            homeostasis_target: "调节环境以达到等渗状态。",
            hint_hyper: "外部盐分高！水分离开细胞。",
            hint_hypo: "外部盐分低！水分涌入细胞。",
            hint_oxy: "我们吸入它来氧化葡萄糖。"
        }
    },
    sb2_01: {
        back: "返回枢纽",
        title: "SB2.01 // 孟德尔花园",
        difficulty: {
            basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "遗传杂交",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "SB2.01_遗传学监视器",
        footer_left: "SB2.01_孟德尔花园 // 节点：巴塞尔",
        stages: {
            monohybrid: "单性状杂交",
            probability: "概率计算",
            dihybrid: "双性状杂交"
        },
        labels: {
            parent: "亲本",
            offspring: "子代",
            punnett_square: "普瑞特方格",
            stats: "子代统计",
            genotype_ratio: "基因型比例",
            phenotype_ratio: "表现型比例",
            purple_flowers: "紫色花",
            white_flowers: "白色花",
            genetics_basics: "遗传学基础",
            genotype_phenotype: "基因型与表现型",
            dominance: "显性规则",
            mendels_laws: "孟德尔定律",
            instructions: "操作说明"
        },
        concepts: {
            allele: "等位基因：基因的一种版本",
            dominant: "R (显性)：紫色花",
            recessive: "r (隐性)：白色花",
            genotype: "基因型：遗传组成 (RR, Rr, rr)",
            phenotype: "表现型：可观察性状 (紫色/白色)",
            homozygous_dom: "RR → 紫色 (纯合显性)",
            heterozygous: "Rr → 紫色 (杂合)",
            homozygous_rec: "rr → 白色 (纯合隐性)",
            law_segregation: "分离定律：每个亲本贡献一个等位基因",
            law_assortment: "自由组合定律：在配子形成过程中，等位基因独立分离"
        },
        mission: {
            title: "任务：孟德尔遗传学",
            description: "掌握孟德尔遗传定律。使用普瑞特方格预测子代比例。"
        },
        prompts: {
            monohybrid_ratio: "杂交 {p1} \\times {p2}。紫色对白色的表现型比例是多少？",
            monohybrid_percent: "杂交 {p1} \\times {p2}。紫色子代的百分比是多少？",
            prob_genotype: "杂交 {p1} \\times {p2}。出现 {genotype} 子代的概率是多少？",
            ratio_target: "\\text{比例 } P:W = ?",
            percent_target: "\\text{紫色百分比}",
            prob_target: "P({genotype}) = ?",
            hint_square: "检查普瑞特方格。",
            hint_all_rr: "所有子代均为 Rr。",
            hint_count: "4个方格中的 {count} 个。"
        }
    },
    gb1_01: {
        back: "返回枢纽",
        title: "GB1.01 // 进化实验室",
        difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
        objective_title: "当前任务目标",
        monitor_title: "进化监视器",
        stages: {
            natural_selection: "自然选择",
            speciation: "物种形成",
            evidence: "进化证据"
        },
        labels: {
            generation: "世代",
            selection_pressure: "选择压力",
            evolution_score: "进化分数",
            evolution_display: "进化显示",
            input_terminal: "输入终端"
        },
        prompts: {
            natural_selection: "在{initial}只雀鸟的种群中，{survival}只在干旱中存活。计算适应度。",
            speciation: "经过{generations}代，突变率为{rate}，计算遗传分化度。",
            evidence: "一块化石有{age}年历史。C-14半衰期为{halflife}年，求剩余分数。",
            hint_fitness: "适应度 = 存活数 / 初始种群数",
            hint_divergence: "分化度 = 世代数 × 突变率",
            hint_halflife: "剩余量 = (0.5)^(年龄/半衰期)"
        },
        feedback: {
            correct: "自然选择已确认！",
            incorrect: "进化需要更多时间..."
        },
        check: "验证",
        next: "下一代",
        correct: "正确",
        incorrect: "错误",
        ready: "就绪",
        footer_left: "GB1.01 // 进化实验室"
    },
    gb3_01: {
        back: "返回枢纽",
        title: "GB3.01 // DNA 熔炉",
        difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
        objective_title: "当前任务目标",
        target_title: "DNA 结构",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "GB3.01_DNA_监视器",
        footer_left: "GB3.01_DNA_熔炉 // 节点：巴赛尔",
        stages: {
            pairing: "碱基配对",
            bonds: "氢键计算",
            sequence: "序列合成"
        },
        labels: {
            rotation: "旋转控制",
            auto_rotate: "自动旋转",
            show_bonds: "显示氢键",
            highlight_pair: "高亮碱基对",
            pairing_rules: "碱基配对规则",
            bases: "核苷酸碱基",
            structure: "DNA 结构详解",
            adenine: "腺嘌呤",
            thymine: "胸腺嘧啶",
            cytosine: "胞嘧啶",
            guanine: "鸟嘌呤"
        },
        concepts: {
            helix: "双螺旋：两条反向平行的脱氧核糖核酸链",
            backbone: "骨架：由糖和磷酸基团交替连接而成",
            at_pair: "A ↔ T: 通过两个氢键连接",
            gc_pair: "C ↔ G: 通过三个氢键连接",
            polarity: "极性：5' 到 3' 的定向性",
            complementary: "法则：查加夫碱基互补配对原则"
        },
        mission: {
            title: "任务：DNA 架构分析",
            description: "掌握 DNA 双螺旋的结构原理。验证碱基配对规则与氢键的稳定性。"
        },
        prompts: {
            pairing_prompt: "识别 {base} 的互补碱基。",
            bonds_prompt: "{b1} 与 {b2} 之间由多少个氢键连接？",
            seq_prompt: "推导该序列的互补序列: {seq}",
            pairing_target: "{base} 的互补碱基",
            bonds_target: "氢键数量: ?",
            seq_target: "互补序列流",
            hint_at: "A 与 T 配对，产生 2 个氢键。",
            hint_gc: "G 与 C 配对，产生 3 个氢键。"
        }
    },
    sc1_01: {
        back: "返回枢纽",
        title: "C1.01 // 神秘实验室",
        difficulty: {
            basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "物质分析",
        next: "执行下一序列",
        check: "验证",
        correct: "验证通过",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "C1.01_实验室监控器",
        footer_left: "C1.01_神秘实验室 // 节点：巴塞尔",
        labels: {
            input: "输入",
            hints: "提示",
            substance: "物质",
            tool: "测试工具",
            observation: "观察结果"
        },
        mission: {
            title: "粉末鉴定任务",
            description: "利用经典化学测试鉴定神秘白色粉末。掌握定性分析方法。"
        },
        stages: {
            identify: "鉴定",
            properties: "性质",
            reactions: "反应"
        }
    },
    sc1_03: {
        back: "返回枢纽",
        title: "SC1.03 // 原子熔炉",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "原子结构",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "SC1.03_原子监视器",
        footer_left: "SC1.03_原子熔炉 // 节点：巴塞尔",
        labels: {
            input: "输入",
            hints: "提示",
            properties: "属性",
            element: "元素",
            atomic_number: "原子序数 (Z)",
            mass_number: "质量数 (A)",
            charge: "电荷",
            periodic_table: "元素周期表",
            protons: "质子 (p⁺)",
            neutrons: "中子 (n⁰)",
            electrons: "电子 (e⁻)"
        },
        mission: {
            title: "任务：赛博熔炉",
            description: "从亚原子粒子构建原子。掌握波尔模型和元素周期表。"
        },
        stages: {
            build: "构建",
            elements: "元素",
            isotopes: "同位素",
            build_desc: "自由模式：构建任意原子配置",
            elements_desc: "探索元素周期表前 20 号元素",
            isotopes_desc: "研究同位素：相同质子数，不同中子数"
        }
    },
    gsc2_01: {
        back: "返回枢纽",
        title: "GC2.01 // 碳世界",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "分子结构",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "GC2.01_有机监测器",
        footer_left: "GC2.01_碳世界 // 节点：巴塞尔",
        labels: {
            input: "输入",
            hints: "提示",
            formula: "分子式",
            iupac_name: "IUPAC 命名",
            composition: "组成",
            molecular_mass: "分子质量",
            molecule_info: "分子信息",
            select_molecule: "选择分子",
            rotation_speed: "旋转速度",
            rotation_speed_value: "{value}x",
            show_bonds: "显示化学键",
            show_hydrogens: "显示氢原子",
            atom_colors: "原子颜色",
            atom_carbon: "碳 (C)",
            atom_hydrogen: "氢 (H)",
            atom_oxygen: "氧 (O)",
            atom_nitrogen: "氮 (N)",
            bond_types: "键类型",
            bond_single: "单键：C-C",
            bond_double: "双键：C=C",
            bond_triple: "三键：C≡C"
        },
        molecules: {
            methane: "甲烷",
            ethane: "乙烷",
            benzene: "苯",
            glucose: "葡萄糖",
            alanine: "丙氨酸"
        },
        types: {
            alkane: "烷烃",
            aromatic: "芳香族",
            carbohydrate: "碳水化合物",
            amino_acid: "氨基酸"
        },
        mission: {
            title: "任务：有机化学",
            description: "在三维空间中探索有机分子。研究球棍模型、化学键和分子几何结构。"
        },
        stages: {
            alkanes: "烷烃",
            alcohols: "醇类",
            custom: "自定义",
            alkanes_desc: "构建烷烃链 (C-C-C)",
            alcohols_desc: "添加羟基 (C-OH)",
            custom_desc: "自由合成模式"
        },
        hints: {
            select_atom: "点击原子以选择它",
            add_atom: "点击原子工具添加新原子",
            bonds: "原子根据化合价规则连接",
            delete: "使用 DELETE 删除选中的原子"
        }
    },
    gsc1_01: {
        back: "返回枢纽",
        title: "GC1.01 // 氧化还原巨人",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "原电池",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "GC1.01_氧化还原监视器",
        footer_left: "GC1.01_氧化还原巨人 // 节点：巴塞尔",
        labels: {
            cell_potential: "电池电势",
            zn_concentration: "Zn²⁺ 浓度",
            cu_concentration: "Cu²⁺ 浓度",
            temperature: "温度",
            show_electrons: "显示电子流动",
            show_ions: "显示离子迁移",
            reaction_quotient: "反应商 (Q)",
            half_reactions: "半反应",
            anode: "阳极",
            cathode: "阴极",
            nernst_equation: "能斯特方程"
        },
        mission: {
            title: "任务：电化学",
            description: "构建原电池并掌握能斯特方程。实时观察电子流动和离子迁移。"
        },
        stages: {
            build: "构建电池",
            measure: "测量电势",
            analyze: "分析反应",
            build_desc: "构建 Zn-Cu 原电池",
            measure_desc: "使用能斯特方程计算电池电势",
            analyze_desc: "观察氧化还原反应和电子流动",
            build_hint: "Zn 在阳极被氧化，Cu²⁺ 在阴极被还原",
            measure_hint: "E = E° - (RT/nF)ln(Q)",
            analyze_hint: "盐桥维持电中性"
        }
    },
    gc3_01: {
        back: "返回枢纽",
        title: "GC3.01 // 平衡大师",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "化学平衡",
        next: "执行下一步",
        check: "验证",
        correct: "正确",
        incorrect: "错误",
        ready: "准备就绪",
        monitor_title: "GC3.01_平衡监视器",
        footer_left: "GC3.01_平衡大师 // 节点: 巴塞尔",
        labels: {
            reaction: "可逆反应",
            particle_count: "粒子计数",
            conditions: "条件",
            temperature: "温度",
            pressure: "压强",
            concentration: "[A]",
            principle: "勒夏特列原理",
            principle_1: "• 增加反应物 → 平衡右移（更多产物）",
            principle_2: "• 增加压强 → 平衡向分子数少的方向移动",
            principle_3: "• 升高温度 → 平衡向吸热方向移动",
            add_reactant: "添加反应物 A",
            system_temperature: "系统温度",
            system_pressure: "系统压强"
        },
        mission: {
            title: "任务: 化学平衡",
            description: "掌握勒夏特列原理。观察系统如何响应外界条件变化。"
        },
        stages: {
            concentration: "浓度",
            temperature: "温度",
            pressure: "压强",
            concentration_desc: "添加反应物 A 并观察平衡移动",
            temperature_desc: "升高温度并观察粒子速度",
            pressure_desc: "改变压强并观察体积效应",
            concentration_hint: "增加 [A] 使平衡右移 → 更多 C 和 D",
            temperature_hint: "温度升高增加粒子动能",
            pressure_hint: "压强增大使容器体积减小"
        }
    },
    gc3_02: {
        back: "返回枢纽",
        title: "GC3.02 // 晶体宫殿",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "晶体结构",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "GC3.02_晶体监视器",
        footer_left: "GC3.02_晶体宫殿 // 节点：巴塞尔",
        labels: {
            lattice_type: "晶格类型",
            properties: "性质",
            atoms_per_cell: "原子/晶胞",
            coordination: "配位数",
            packing: "堆积率",
            tet_voids: "四面体空隙",
            voids: "间隙空隙",
            tetrahedral: "四面体",
            octahedral: "八面体",
            formulas: "公式",
            show_voids: "显示间隙空隙",
            slice_plane: "切片平面 (Y轴)",
            reset_slice: "重置"
        },
        mission: {
            title: "任务：固体物理",
            description: "探索晶体结构和布拉维晶格。理解原子堆积和配位。"
        },
        stages: {
            sc: "简单立方",
            bcc: "体心立方",
            fcc: "面心立方",
            sc_desc: "研究简单立方晶格（配位数6）",
            bcc_desc: "分析体心立方（配位数8）",
            fcc_desc: "掌握面心立方（配位数12）",
            sc_hint: "最低堆积效率（52%）",
            bcc_hint: "中等堆积（68%），如Fe、Cr等金属",
            fcc_hint: "最高堆积（74%），如Cu、Al、Au等金属"
        }
    },
    gm4_01: {
        back: "返回枢纽",
        title: "GM4.01 // 复数地平线",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "GM4.01_复数监视器",
        footer_left: "GM4.01_复数地平线 // 节点：巴塞尔",
        scenario_title: "巴塞尔工程任务",
        scenarios: {
            basics: "罗氏制药信号处理：您正在罗氏巴塞尔校准用于 MRI 信号处理的医学成像设备，该设备使用复数分析。每个复数 z = a + bi 表示一个具有实部（振幅）和虚部（相位）的信号。计算模长 |z| 以确定信号强度。准确的模长计算对于检测患者扫描中的组织异常至关重要。",
            operations: "诺华量子化学模拟：您正在诺华巴塞尔使用复数算术运行分子轨道计算。波函数表示为复数，它们的相互作用需要在复平面中进行加法和乘法运算。计算复数运算的结果以预测分子行为。这些计算决定了药物结合效率。",
            polar: "巴塞尔大学电气工程：您正在分析巴塞尔智能电网电力系统中的交流电路行为。在计算谐振频率时，复阻抗被提升到幂次。使用极坐标形式 (r·e^(iθ)) 高效计算 z^n。结果决定了巴塞尔可再生能源网络的最佳功率分配。"
        },
        stages: {
            basics: "基础",
            operations: "运算",
            polar: "极坐标形式",
            basics_prompt: "计算模长",
            basics_target: "求 |z|",
            operations_add: "复数加法",
            operations_multiply: "复数乘法",
            operations_target: "求实部和虚部",
            polar_prompt: "使用极坐标形式计算幂",
            polar_target: "求 z^n 的直角坐标形式"
        },
        visualization: {
            pythagorean: "勾股定理",
            vector_addition: "向量加法",
            complex_multiplication: "复数乘法",
            polar_power: "极坐标幂运算",
            complex_data: "复数数据",
            magnitude: "模长 |z|",
            argument: "辐角 arg(z)",
            power: "幂次",
            verified: "验证成功",
            mismatch: "答案错误",
            geometric_meaning: "几何意义：模长相乘，角度相加",
            polar_meaning: "模长变为 r^n，角度变为 n·θ",
            parallelogram_rule: "平行四边形法则：从原点到 z₁，再从 z₁ 平移 z₂"
        }
    },
    em2_01: {
        back: "返回枢纽",
        title: "EM2.01 // 矩阵几何",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "变换矩阵",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "EM2.01_矩阵监视器",
        footer_left: "EM2.01_矩阵几何 // 节点：巴塞尔",
        labels: {
            matrix: "矩阵 A",
            properties: "属性",
            determinant: "行列式",
            volume_scale: "体积缩放",
            formulas: "公式",
            angle: "旋转角度 (θ)",
            scale_x: "X轴缩放",
            scale_y: "Y轴缩放",
            scale_z: "Z轴缩放",
            shear_xy: "Y对X的切变",
            shear_xz: "Z对X的切变",
            matrix_title: "矩阵 A",
            det_value: "det(A) = {value}",
            show_eigenvectors: "显示特征向量",
            show_grid: "显示网格",
            animate: "动画"
        },
        presets: {
            title: "预设",
            scale: "缩放",
            rotate: "旋转 90°",
            shear: "切变",
            reflect: "镜像"
        },
        linear: {
            title: "线性代数",
            line_1: "Ax = λx（特征值方程）",
            line_2: "det(A - λI) = 0",
            line_3: "T(v) = Av"
        },
        mission: {
            title: "任务：线性变换",
            description: "在三维空间中可视化线性代数。探索矩阵变换、特征向量和几何直觉。"
        },
        stages: {
            basic_transforms: "基础变换",
            determinant: "行列式",
            composition: "复合变换"
        },
        scenario_title: "巴塞尔工程任务",
        scenarios: {
            basic_transforms: "罗氏制药分子分析：您在罗氏巴塞尔的计算化学部门工作，使用线性变换分析蛋白质分子的对称性。每个矩阵代表一个对称操作（旋转、反射、缩放）。识别变换类型对于预测分子的光学性质至关重要。",
            determinant: "诺华晶体结构：您在诺华巴塞尔分析药物晶体的单元格结构。行列式表示晶格的体积变化。det(A)=0 表示晶体结构坍缩，det(A)<0 表示手性反转。准确计算行列式对于预测药物的生物活性至关重要。",
            composition: "巴塞尔大学机器人学：您在巴塞尔大学机器人实验室编程机械臂。每个关节的运动由一个变换矩阵表示。复合变换 AB 表示先执行关节A的运动，再执行关节B的运动。矩阵乘法的顺序决定了机械臂的最终位置。"
        },
        explanation_label: "解释"
    },
    sc2_02: {
        back: "返回枢纽",
        title: "SC2.02 // pH 哨兵",
        difficulty: {
            basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "滴定分析",
        next: "下一次分析",
        check: "验证",
        correct: "滴定准确",
        incorrect: "pH 读取错误",
        ready: "就绪",
        monitor_title: "SC2.02_滴定监控",
        footer_left: "SC2.02_PH_哨兵 // 节点: 巴塞尔",
        stages: {
            curves: "PH 曲线",
            equivalence: "等当点",
            indicators: "指示剂"
        },
        labels: {
            initial_ph: "初始 pH",
            added_vol: "加入体积 (mL)",
            eq_point: "等当点",
            indicator: "指示剂",
            strong_acid: "强酸",
            weak_acid: "弱酸",
            formula: "滴定公式"
        },
        prompts: {
            curve_type: "初始 pH 为 {ph}。识别酸类型 (强酸=1, 弱酸=2)。",
            find_eq: "Va=50mL, Ca=0.1M, Cb=0.2M。求等当点体积 Vb。",
            select_indicator: "弱酸 + 强碱。选择指示剂：酚酞(1), 甲基橙(2)。",
            weak_ph_calc: "在半等当点 (pH = pKa)。如果 pKa 为 4.75，pH 是多少？",
            eq_ph_guess: "强酸/强碱等当点 pH？ (<7=1, 7=2, >7=3)。",
            conc_calc: "20mL 未知酸被 10mL 0.2M NaOH 中和。求 Ca。"
        }
    },
    sc2_03: {
        back: "返回枢纽",
        title: "SC2.03 // 气体实验室",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "气体性质",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "SC2.03_气体监视器",
        footer_left: "SC2.03_气体实验室 // 节点：巴塞尔",
        labels: {
            pressure: "压力",
            state_variables: "状态变量",
            volume: "体积 (V)",
            temperature: "温度 (T)",
            moles: "摩尔数 (n)",
            formulas: "公式"
        },
        mission: {
            title: "任务：理想气体定律",
            description: "探索理想气体中压力、体积和温度之间的关系。"
        },
        stages: {
            boyle: "波义耳定律",
            charles: "查理定律",
            combined: "组合气体定律",
            boyle_desc: "观察反比关系：P ∝ 1/V",
            charles_desc: "观察正比关系：V ∝ T",
            combined_desc: "掌握组合气体定律",
            boyle_hint: "波义耳定律：减小体积 → 增大压力",
            charles_hint: "查理定律：升高温度 → 增大体积",
            combined_hint: "组合定律：三个变量相互作用"
        }
    },
    sc1_03_orbitals: {
        back: "返回枢纽",
        title: "SC1.03 // 原子熔炉",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "原子轨道",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "SC1.03_轨道监视器",
        footer_left: "SC1.03_原子熔炉 // 节点：巴塞尔",
        labels: {
            selected_element: "选定元素",
            orbital_type: "轨道类型",
            show_transition: "显示电子跃迁",
            periodic_table: "元素周期表 (Z=1-20)",
            orbital_shapes: "轨道形状",
            quantum_numbers: "量子数"
        },
        mission: {
            title: "任务：量子力学",
            description: "探索电子轨道和概率云。在 3D 空间中可视化 s、p 和 d 轨道。"
        },
        stages: {
            s_orbital: "S 轨道",
            p_orbital: "P 轨道",
            d_orbital: "D 轨道",
            s_desc: "球形概率分布",
            p_desc: "哑铃形轨道 (px, py, pz)",
            d_desc: "四叶草形轨道",
            s_hint: "s 轨道：l=0，球对称",
            p_hint: "p 轨道：l=1，三个方向",
            d_hint: "d 轨道：l=2，五个方向"
        }
    },
    sc1_04: {
        back: "返回枢纽",
        title: "SC1.04 // 元素周期拼图",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "原子结构",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "SC1.04_原子监视器",
        footer_left: "SC1.04_元素周期拼图 // 节点：巴塞尔",
        labels: {
            element_info: "元素信息",
            formulas: "公式",
            protons: "质子",
            neutrons: "中子",
            electrons: "电子",
            select_element: "选择元素"
        },
        mission: {
            title: "任务：元素周期表",
            description: "构建原子并发现元素周期表。掌握电子排布。"
        },
        stages: {
            build: "构建原子",
            periodic: "元素周期表",
            groups: "元素族",
            build_desc: "通过添加质子、中子和电子来构建原子",
            periodic_desc: "探索前 20 个元素",
            groups_desc: "理解元素族和周期",
            build_hint: "质子数决定元素种类",
            periodic_hint: "元素按原子序数排列",
            groups_hint: "同族元素 = 相同价电子数"
        }
    },
    sc2_04: {
        back: "返回枢纽",
        title: "SC2.04 // 溶解度实验室",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "溶液状态",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "SC2.04_溶解度监视器",
        footer_left: "SC2.04_溶解度实验室 // 节点：巴塞尔",
        labels: {
            solubility: "溶解度",
            saturated: "饱和 - 正在形成沉淀",
            unsaturated: "未饱和 - 可继续溶解",
            solution_data: "溶液数据",
            temperature: "温度 (°C)",
            solute_amount: "溶质量 (g)",
            formulas: "公式"
        },
        mission: {
            title: "任务：溶解度",
            description: "探索溶解度与温度的关系。观察结晶过程。"
        },
        stages: {
            dissolve: "溶解",
            saturate: "饱和",
            crystallize: "结晶",
            dissolve_desc: "将溶质溶解在水中",
            saturate_desc: "达到饱和点",
            crystallize_desc: "冷却溶液使其结晶",
            dissolve_hint: "大多数盐在高温下溶解度更高",
            saturate_hint: "饱和：溶解的最大量",
            crystallize_hint: "冷却导致过量溶质结晶"
        }
    },
    gp1_03: {
        back: "返回枢纽",
        title: "GP5.03 // 粒子对撞机",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        objective_title: "当前任务目标",
        target_title: "LHC ATLAS 探测器",
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "匹配失败",
        ready: "就绪",
        monitor_title: "GP5.03_LHC_监视器",
        footer_left: "GP5.03_粒子对撞机 // 节点：CERN",
        labels: {
            beam_energy: "束流能量",
            relativistic_effects: "相对论效应",
            formulas: "公式",
            magnetic_field: "启用磁场（弯曲磁铁）",
            colliding: "对撞中...",
            initiate_collision: "启动对撞"
        },
        mission: {
            title: "任务：粒子物理",
            description: "探索 CERN 大型强子对撞机的粒子碰撞。发现希格斯玻色子。"
        },
        stages: {
            acceleration: "加速",
            collision: "对撞",
            detection: "探测",
            acceleration_desc: "将质子加速到接近光速",
            collision_desc: "在 13 TeV 下对撞质子束",
            detection_desc: "探测粒子喷注和径迹",
            acceleration_hint: "质子达到光速的 99.9999991%",
            collision_hint: "对撞能量：13 TeV = 13,000 GeV",
            detection_hint: "磁场使带电粒子径迹弯曲"
        }
    },
    ggp5_02: {
        title: "GP1.02 // 相对论实验室",
        back: "返回 Nexus",
        footer_left: "GP1.02_相对论实验室 // 节点: RHINE",
        monitor_title: "GP1.02_相对论监测器",
        labels: {
            lorentz_factor_title: "洛伦兹因子",
            velocity_label: "速度 (v/c)",
            velocity_value: "{value}% c",
            gamma_value: "γ = {value}",
            toggle_doppler: "显示多普勒效应",
            toggle_contraction: "显示长度收缩"
        },
        effects: {
            title: "相对论效应",
            time_dilation_label: "时间膨胀：",
            time_dilation_value: "Δt' = {value}Δt",
            length_contraction_label: "长度收缩：",
            length_contraction_value: "L' = {value}L"
        },
        formulas: {
            title: "公式",
            gamma: "γ = 1/√(1 - v²/c²)",
            time: "Δt' = γΔt",
            length: "L' = L/γ",
            energy: "E = γmc²"
        },
        mission: {
            title: "任务：狭义相对论",
            description: "探索狭义相对论效应。观察相对论速度下的时间膨胀、长度收缩和多普勒效应。"
        }
    },
    sp1_08: {
        title: "SP1.08 // 光学工作台",
        back: "返回 Nexus",
        footer_left: "SP1.08_光学工作台 // 节点: BASEL",
        monitor_title: "SP1.08_光学监测器",
        labels: {
            show_prism: "显示棱镜色散",
            medium_1: "介质 1 (n₁)",
            medium_2: "介质 2 (n₂)",
            incident_angle: "入射角 (θ₁)",
            refraction_title: "折射",
            refracted_angle: "折射角 (θ₂)：",
            critical_angle: "临界角：",
            total_internal_reflection: "全内反射",
            na: "无",
            angle_value: "{value}°"
        },
        snell: {
            title: "斯涅尔定律",
            line_1: "n₁ sin(θ₁) = n₂ sin(θ₂)",
            line_2: "θ_c = arcsin(n₂/n₁)",
            line_3: "v = c/n"
        },
        mission: {
            title: "任务：几何光学",
            description: "掌握斯涅尔定律和几何光学。观察折射、全内反射和棱镜色散。"
        }
    },
    sp1_01: {
        back: "返回枢纽",
        title: "SP1.01 // 测量与单位",
        check: "验证",
        next: "下一步",
        correct: "测量验证",
        incorrect: "测量错误",
        ready: "就绪",
        monitor_title: "SP1.01_测量实验室",
        footer_left: "SP1.01_测量 // 节点: 巴塞尔",
        objective_title: "测量目标",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        stages: {
            si_units: "SI单位",
            conversion: "换算",
            precision: "精度"
        },
        tools: {
            ruler: "尺子",
            scale: "天平",
            timer: "计时器"
        },
        labels: {
            precision: "测量精度",
            measurement_display: "测量显示",
            input_terminal: "终端输入 [测量节点]"
        },
        prompts: {
            si_unit: "{measurement} 的 SI 单位是什么？",
            convert: "将 {value} {from} 转换为 {to}",
            sigfigs: "{value} 有几位有效数字？",
            hint_si: "SI 单位是 {name}",
            hint_factor: "乘以 {factor}",
            hint_sigfigs: "计算所有非零数字和它们中间的零"
        },
        feedback: {
            correct: "测量精度确认。",
            incorrect: "检测到校准错误。"
        }
    },
    sp1_04: {
        back: "返回枢纽",
        title: "SP1.04 // 简单机械",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "不匹配",
        ready: "就绪",
        monitor_title: "SP1.04_力学监控",
        footer_left: "SP1.04_简单机械 // 节点: 巴塞尔",
        objective_title: "当前任务目标",
        stages: {
            levers: "杠杆",
            pulleys: "滑轮",
            inclined_planes: "斜面"
        },
        labels: {
            machine_display: "机械显示",
            input_terminal: "输入终端",
            force_ratio: "力比 (MA)",
            show_forces: "显示力",
            mechanics_score: "力学分数"
        },
        prompts: {
            lever: "一个杠杆举起 {load} N 的负载。如果力臂是 {effortArm} m，阻力臂是 {loadArm} m，需要多少努力力？",
            pulley: "一个滑轮系统用 {strands} 根支撑绳举起 {load} N 的负载。需要多少努力力？",
            inclined_plane: "一个斜面将 {load} N 的负载举到 {height} m 高度，斜面长度为 {length} m。需要多少努力力？",
            hint_lever: "使用 MA = 力臂 / 阻力臂，然后 F_effort = F_load / MA",
            hint_pulley: "使用 MA = 绳子数量，然后 F_effort = F_load / MA",
            hint_inclined: "使用 MA = 长度 / 高度，然后 F_effort = F_load / MA"
        },
        scenarios: {
            basel_construction: "巴塞尔建筑工地：巴塞尔罗氏塔建筑工地的工人使用杠杆、滑轮和斜坡高效移动重型材料。简单机械减少所需力量。",
            lever_crowbar: "巴塞尔翻新撬棍：翻新巴塞尔历史建筑需要小心使用杠杆。长力臂的撬棍提供机械优势来举起重石。",
            pulley_crane: "建筑起重机滑轮：巴塞尔建筑起重机使用多根滑轮绳来举起钢梁。每增加一根绳子就减少所需输入力。",
            ramp_loading: "巴塞尔港口装载坡道：莱茵河港口工人使用斜面将货物装载到驳船上。更长的坡道需要更少的力但更多的距离。",
            compound_machine: "巴塞尔复合机械：真实的建筑设备结合杠杆、滑轮和斜面，实现高机械优势以完成重型起重任务。"
        },
        feedback: {
            correct: "机械优势计算正确！",
            incorrect: "检查你的机械优势计算。"
        }
    },
    sb1_02: {
        back: "返回枢纽",
        title: "SB1.02 // 光合作用实验室",
        difficulty: { basic: "基础", core: "核心", advanced: "高级", elite: "精英" },
        check: "验证",
        next: "执行下一序列",
        correct: "已验证",
        incorrect: "不匹配",
        ready: "准备就绪",
        monitor_title: "SB1.02_光合作用_监测器",
        footer_left: "SB1.02_光合作用实验室 // 节点：巴塞尔",
        objective_title: "当前任务目标",
        stages: {
            equation: "反应方程式",
            factors: "限制因子",
            chloroplast: "叶绿体"
        },
        labels: {
            light: "光照强度",
            co2: "CO2水平",
            temp: "温度",
            efficiency: "效率",
            reaction_display: "反应显示",
            input_terminal: "输入终端"
        },
        prompts: {
            reactant: "完成方程式：6CO₂ + 6H₂O + 光能 → C₆H₁₂O₆ + 6{O₂}。缺少的反应物数量是多少？",
            hint_oxygen: "计算方程式两边的氧原子数",
            glucose: "{co2}个CO₂分子能产生多少个葡萄糖分子？",
            hint_glucose: "CO₂与葡萄糖的比例为6:1",
            water_count: "生产{glucose}个葡萄糖分子需要多少个水分子？",
            hint_balance: "平衡方程式：每个葡萄糖分子需要6个水分子",
            factor_effect: "如果{factor}减少一半，光合速率会怎样变化？",
            hint_factor: "每个因素都独立限制最大速率",
            structure_function: "叶绿体中哪个结构负责{process}？",
            hint_structure: "光反应在类囊体膜中进行；卡尔文循环在基质中进行"
        },
        feedback: {
            correct: "光合作用方程式平衡！",
            incorrect: "请复习光合作用反应。"
        }
    },
    sb2_02: {
        back: "返回枢纽",
        title: "SB2.02 // 人体系统",
        difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
        check: "验证",
        next: "执行下一序列",
        correct: "已验证",
        incorrect: "不匹配",
        ready: "就绪",
        monitor_title: "SB2.02_人体系统_监控",
        footer_left: "SB2.02_人体系统 // 节点：巴塞尔",
        objective_title: "当前任务目标",
        stages: {
            digestive: "消化系统",
            circulatory: "循环系统",
            respiratory: "呼吸系统"
        },
        systems: {
            digestive: "消化系统",
            circulatory: "循环系统",
            respiratory: "呼吸系统"
        },
        labels: {
            heart_rate: "心率",
            o2_sat: "血氧饱和度",
            enzyme: "酶活性",
            anatomy_score: "解剖学分数",
            anatomy_display: "解剖学显示",
            input_terminal: "输入终端"
        },
        prompts: {
            organ_function: "哪个器官负责{function}？",
            hint_organ: "{name}执行此功能",
            component_function: "哪个组成部分负责{function}？",
            hint_component: "{name}执行此功能",
            structure_function: "哪个结构负责{function}？",
            hint_structure: "{name}执行此功能"
        },
        feedback: {
            correct: "解剖学知识已验证！",
            incorrect: "请复习身体系统结构。"
        }
    },
    sb3_01: {
        back: "返回枢纽",
        title: "SB3.01 // 生态系统动力学",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "不匹配",
        ready: "就绪",
        monitor_title: "SB3.01_生态系统监控",
        footer_left: "SB3.01_生态系统动力学 // 节点: 莱茵河",
        objective_title: "当前任务目标",
        stages: {
            food_chains: "食物链",
            energy_flow: "能量流动",
            cycles: "生物地球化学循环"
        },
        labels: {
            ecosystem_display: "生态系统显示",
            input_terminal: "输入终端",
            trophic_level: "营养级",
            show_energy: "显示能量流动",
            ecology_score: "生态学分数"
        },
        prompts: {
            food_chain: "在莱茵河生态系统中，{producer} 被 {consumer} 吃掉。下一级是什么？",
            energy_transfer: "如果 {level} 消费者有 {energy} kJ 的能量，有多少能量传递到下一级？",
            cycle_process: "在 {cycle} 循环中，{process} 产生什么？",
            hint_trophic: "只有10%的能量传递到下一个营养级",
            hint_10percent: "使用10%规则：乘以0.1",
            hint_cycle: "思考这个过程的输入和输出"
        },
        scenarios: {
            rhine_river: "莱茵河生态系统：莱茵河支持从藻类到捕食鸟类的多样化水生生物。食物链从浮游植物开始，经过浮游动物、鱼类到顶级捕食者。",
            energy_pyramid: "巴塞尔湿地能量流动：巴塞尔湿地保护区展示能量金字塔。营养级之间只有10%的能量传递，限制了食物链长度。",
            carbon_cycle: "莱茵河三角洲碳循环：光合作用和呼吸作用驱动莱茵河生态系统的碳循环。植物吸收CO₂，动物通过呼吸释放CO₂。",
            nitrogen_cycle: "巴塞尔土壤固氮：巴塞尔农业土壤中的细菌通过固氮作用将大气中的N₂转化为植物可用的NH₃。",
            water_cycle: "莱茵河水循环：莱茵河的蒸发、云中的凝结和降水完成了维持巴塞尔生态系统的水循环。"
        },
        feedback: {
            correct: "生态系统平衡维持！",
            incorrect: "生态系统被破坏。请复习关系。"
        }
    },
    sc1_05: {
        back: "返回中心实验室",
        title: "SC1.05 // 化学键桥",
        check: "验证",
        next: "下一步",
        correct: "键合验证",
        incorrect: "键合失败",
        ready: "就绪",
        monitor_title: "SC1.05_键合实验室",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        stages: {
            ionic: "离子键",
            covalent: "共价键",
            lewis: "路易斯结构"
        },
        labels: {
            na_cl: "Na + Cl -> NaCl",
            h2: "H + H -> H2",
            co2: "C + 2O -> CO2"
        }
    },
    sc3_02: {
        back: "返回枢纽",
        title: "SC3.02 // 有机化学基础",
        stages: {
            alkanes: "烷烃",
            functional_groups: "官能团",
            isomers: "同分异构体"
        },
        labels: {
            carbon_chain: "碳链",
            hydroxyl: "羟基",
            double_bond: "双键"
        }
    },
    sc3_03: {
        back: "返回枢纽",
        title: "SC3.03 // 有机化学反应",
        difficulty: {
            basic: "基础",
            core: "核心",
            advanced: "进阶",
            elite: "精英"
        },
        next: "执行下一序列",
        check: "验证",
        correct: "已验证",
        incorrect: "不匹配",
        ready: "就绪",
        monitor_title: "SC3.03_反应监控",
        footer_left: "SC3.03_有机化学反应 // 节点: 巴塞尔",
        objective_title: "当前任务目标",
        stages: {
            combustion: "燃烧反应",
            substitution: "取代反应",
            addition: "加成反应"
        },
        labels: {
            reaction_display: "反应显示",
            input_terminal: "输入终端",
            animation_speed: "动画速度",
            show_mechanism: "显示机理",
            chemistry_score: "化学分数"
        },
        prompts: {
            combustion: "{reactant} 的完全燃烧产生 CO₂ 和 H₂O。产生多少个 CO₂ 分子？",
            substitution: "当 {alkane} 在紫外光下与 {halogen} 反应时，主要产物是什么？",
            addition: "当 {alkene} 与 {reagent} 反应时，产物是什么？",
            hint_combustion: "计算反应物中的碳原子数",
            hint_substitution: "一个 H 原子被卤素原子取代",
            hint_addition: "双键打开并加成试剂"
        },
        scenarios: {
            novartis_combustion: "诺华能源实验室：燃烧反应为巴塞尔制药设施提供动力。有机燃料的完全燃烧产生CO₂和H₂O，释放最大能量。",
            basel_chemical_plant: "巴塞尔化学合成：巴塞尔化工厂的取代反应使用紫外光将氢原子替换为卤素，创造有价值的药物中间体。",
            polymer_production: "巴塞尔聚合物生产：巴塞尔化工设施的加成反应将烯烃转化为聚合物。双键打开形成长聚合物链。",
            free_radical_mechanism: "自由基化学：紫外光在取代反应中引发自由基机理。自由基通过链式反应传播直到终止。",
            reaction_control: "诺华反应控制：控制反应条件（光、温度、催化剂）决定有机合成中的产物选择性和产率。"
        },
        feedback: {
            correct: "反应机理理解正确！",
            incorrect: "复习反应机理。"
        }
    },
    },
DE: {
        protocol: {
            system_name: "SYSTEMPROTOKOLL v2.1",
            warning_text: "WARNUNG: Die Welt dreht sich nicht um dich... außer du verstehst die Regeln.",
            hold_instruction: "Autorisierung erforderlich",
            hold_button: "[ NEXUS BETRETEN ]",
            secure_connection: "SICHERE VERBINDUNG HERGESTELLT",
        },
        common: {
            history_title: "Experimentverlauf",
            history_toggle: "Verlauf",
            history_empty: "Noch keine verifizierten Läufe.",
            history_accuracy: "Genauigkeit",
            history_stage: "Stufe",
            history_difficulty: "Schwierigkeit",
            history_time: "Zeitpunkt",
            history_speed: "Tempo",
            history_rigor: "Strenge",
            history_best: "Bestwert",
            mastery_title: "STEM-Meisterschaft",
            mastery_conceptual: "Theorie",
                mastery_speed: "Tempo",
                mastery_rigor: "Strenge",
                mastery_decay: "Abbau",
                achievements_title: "Errungenschaften",
                achievement_unlocked: "Errungenschaft freigeschaltet",
                achievements: {
                    first_light: {
                        title: "Erstes Licht",
                        description: "Schließe dein erstes Optik-Experiment ab."
                    },
                    first_launch: {
                        title: "Erster Start",
                        description: "Schließe ein beliebiges Experiment ab."
                    },
                    mole_master: {
                        title: "Mole-Meister",
                        description: "Erreiche 100% Genauigkeit in C1.02."
                    },
                    molecular_architect: {
                        title: "Molekular-Architekt",
                        description: "Schließe C3.01 ab."
                    },
                    time_traveler: {
                        title: "Zeitreisender",
                        description: "Schließe die P1.04-Zeitdilatation ab."
                    },
                    calculus_god: {
                        title: "Analysis-Gott",
                        description: "Erreiche 100% Genauigkeit in GM1.01."
                    }
                }
            },
        home: {
                title: "WISSENSCHAFTSPARK",
                subtitle: "Hardcore Science & Logik-Simulationen",
                sek1_title: "SEKUNDARSCHULE // 1. KLASSE (7. SCHULJAHR)",
                sek2_title: "SEKUNDARSCHULE // 2. KLASSE (8. SCHULJAHR)",
                sek3_title: "SEKUNDARSCHULE // 3. KLASSE (9. SCHULJAHR)",
                gym_title: "GYMNASIUM // MATURITÄTSSTUFE",
                nexus: "Nexus",
                archive: "Archiv",
                sm2_01_title: "SM2.01 // BINOMISCHE FORMELN",
                sm2_01_subtitle: "Meistere die 1. und 2. Binomische Formel durch geometrische Zerlegung.",
                sm2_02_title: "SM2.02 // PYTHAGORAS & WURZELN",
                sm2_02_subtitle: "Übe Satz des Pythagoras und Quadratwurzeln mit sinnvollen Schwierigkeitsstufen.",
                sm3_01_title: "SM3.01 // QUADRATISCHE GLEICHUNGEN",
                sm3_01_subtitle: "Löse quadratische Gleichungen durch Faktorisieren, Formel und quadratische Ergänzung.",
                sm3_02_title: "SM3.02 // TRIGONOMETRIE-ARRAY",
                sm3_02_subtitle: "Trainiere Sinus, Kosinus und Phasenverschiebungen mit Wellen-Feedback.",
                sm3_03_title: "SM3.03 // EXPONENTIELLES WACHSTUM",
                sm3_03_subtitle: "Modelliere exponentielles und logarithmisches Wachstum mit Zellteilungssimulationen.",
                sm3_04_title: "SM3.04 // LOGARITHMUS-LABOR",
                sm3_04_subtitle: "Dekodiere Logarithmenskalen und inverses Wachstum mit Präzisionsübungen.",
                sm2_07_title: "SM2.07 // KOORDINATEN-RECON",
                sm2_07_subtitle: "Meistere Koordinatensysteme, Translationen und Zeichenpräzision im Basler Raster.",
                sm2_08_title: "SM2.08 // WAHRSCHEINLICHKEIT GRUNDLAGEN",
                sm2_08_subtitle: "Meistere Wahrscheinlichkeitsgrundlagen durch Basler Lebensszenarien und einfache Glücksspielbildung.",
                sm2_03_title: "SM2.03 // GERADEN & FUNKTIONEN",
                sm2_03_subtitle: "Übe Steigung, Achsenabschnitt, Graph-Zuordnung und Schnittpunkte mit wenig Eingabe.",
                sm2_04_title: "SM2.04 // ÄHNLICHKEIT & SKALIERUNG",
                sm2_04_subtitle: "Trainiere Ähnlichkeitsverhältnisse, Skalierungsfaktoren und angewandtes proportionales Denken.",
                gm1_01_title: "GM1.01 // INFINITESIMALRECHNUNG",
                gm1_01_subtitle: "Erkunde Ableitungen und Tangentensteigungen. Berechne Sekanten- und Tangentensteigungen auf Parabeln.",
                gm2_01_title: "GM2.01 // VEKTOR-PILOT 3D",
                gm2_01_subtitle: "Steuere Drohnen mit 3D-Vektoren, Skalarprodukt und Betrag über dem Rhein.",
                gm3_01_title: "GM3.01 // WAHRSCHEINLICHKEITS-TRESOR",
                gm3_01_subtitle: "Visualisiere Binomialverteilung mit Galton-Brett. Beobachte Konvergenz zur Normalverteilung.",
                sm2_06_title: "SM2.06 // GLEICHUNGSSYSTEME",
                sm2_06_subtitle: "Meistere das Einsetzungs- und Additionsverfahren zur Lösung linearer Gleichungssysteme.",
                sm2_05_title: "SM2.05 // POTENZEN & WURZELN",
                sm2_05_subtitle: "Systematisches Training der Potenzgesetze, negativen Exponenten und wissenschaftlichen Schreibweise.",
                sm1_01_title: "SM1.01 // FLÄCHEN & VOLUMEN",
                sm1_01_subtitle: "Berechne Flächen von Trapezen und Volumen von Prismen und Zylindern.",
                sm1_02_title: "EM1.01 // 4D HYPER-GEOMETRIE",
                sm1_02_subtitle: "Erkunde den Tesserakt: 4D-Projektion, Rotationsmatrizen und Hyperwürfel-Entfaltung.",
                sm1_03_title: "EM1.01 // ALGEBRA QUEST",
                sm1_03_subtitle: "Meistere Variablen, Termvereinfachung und Einsetzen mit visuellen algebraischen Kacheln.",
                sm1_04_title: "SM1.03 // UNTER NULL",
                sm1_04_subtitle: "Meistere ganze Zahlen, Zahlengeraden, rationale Zahlen und 2D-Koordinaten mit Basler Winterszenarien.",
                sm1_05_title: "SM1.04 // GLEICHUNGSWAAGE",
                sm1_05_subtitle: "Löse lineare Gleichungen mit Waagemodellen, Transformationen und Basler Anwendungen.",
                sm1_06_title: "SM1.05 // PROPORTIONS-LABOR",
                sm1_06_subtitle: "Meistere Proportionen, Prozentsätze und Mischungen mit interaktiven Basler Laborszenarien.",

                sp1_01_title: "SP1.01 // MESSUNG & EINHEITEN",
                sp1_01_subtitle: "Meistere SI-Einheiten, Einheitenumrechnung und Messpräzision mit Basler Laborinstrumenten.",
                sp1_02_title: "SP1.02 // NEWTONS GESETZE",
                sp1_02_subtitle: "Mechanik in Basel: Erforsche Reibung, Beschleunigung und Kollisionsdynamik.",
                sp2_01_title: "SP2.01 // THERMODYNAMIK",
                sp2_01_subtitle: "Meistere Wärmekapazität und Phasenübergänge mit Partikelsimulationen.",
                sp2_02_title: "SP2.02 // STROMKREIS-SANDBOX",
                sp2_02_subtitle: "Ingenieurwesen des Basler Stromnetzes. Ohm'sches Gesetz und Schaltungen.",
                sp3_01_title: "SP3.01 // GEOMETRISCHE OPTIK",
                sp3_01_subtitle: "Visualisiere Licht durch Rheinwasser. Strahlengang, Reflexion und Linsen.",
                sp1_03_title: "SP1.03 // ENERGIE & LEISTUNG",
                sp1_03_subtitle: "Modelliere die Rheinhydropower mit potenzieller, kinetischer Energie und Leistung.",
                sp1_04_title: "SP1.04 // EINFACHE MASCHINEN",
                sp1_04_subtitle: "Meistere Hebel, Flaschenzüge und schiefe Ebenen mit Basler Baustellen-Szenarien.",
                sp3_02_title: "SP3.02 // WELLENOPTIK",
                sp3_02_subtitle: "Untersuchen Sie Interferenz-, Beugungs- und Polarisationsphänomene.",
                sp1_05_title: "SP1.05 // DIE RHEINFÄHRE",
                sp1_05_subtitle: "Meistere die Gierseilfähri. Navigiere über den Rhein nur mit der Strömung.",
                sp1_06_title: "SP1.06 // DAS SCHWEIZER PENDEL",
                sp1_06_subtitle: "Die Mechanik der Zeit: Erforsche Periode, Frequenz und Gravitation beim Basler Uhrmacher.",
                sp1_08_title: "SP1.08 // OPTIKLABOR",
                sp1_08_subtitle: "Erkunde Licht, Linsen und optische Phänomene.",
                sp2_03_title: "SP2.03 // MOTORLABOR",
                sp2_03_subtitle: "Elektromagnetismus und Motorprinzipien.",
                sp4_01_title: "SP3.03 // WELLENGRUNDLAGEN",
                sp4_01_subtitle: "Welleneigenschaften und Schallphänomene.",
                gp5_01_title: "GP1.01 // DER ATOMKERN",
                gp5_01_subtitle: "Stabilisiere den Basler Reaktor durch Ausgleichen von Kernreaktionen: Alpha-, Beta- und Gammazerfall.",
                gp5_02: {
                    back: "Zurück zum Nexus",
                    title: "GP1.02 // RELATIVITÄTSLABOR",
                    difficulty: {
                        basic: "BASIS",
                        core: "KERN",
                        advanced: "FORTGESCHRITTEN",
                        elite: "ELITE"
                    },
                    objective_title: "Aktuelles Missionsziel",
                    target_title: "Lorentz-Transformation",
                    next: "Nächste Sequenz ausführen",
                    check: "Prüfen",
                    correct: "Verifiziert",
                    incorrect: "Fehlanpassung",
                    ready: "Bereit",
                    monitor_title: "GP1.02_RELATIVITAETS_MONITOR",
                    footer_left: "GP1.02_RELATIVITAETSLABOR // KNOTEN: CERN",
                    labels: {
                        velocity: "GESCHWINDIGKEIT",
                        lorentz_factor: "Lorentz-Faktor (γ)",
                        time_dilation: "ZEITDILATATION",
                        proper_time: "Eigenzeit (Δt₀)",
                        dilated_time: "Dilatierte Zeit (Δt)",
                        length_contraction: "LÄNGENKONTRAKTION",
                        rest_length: "Ruhelänge (L₀)",
                        contracted_length: "Kontrahierte Länge (L)",
                        doppler_effect: "RELATIVISTISCHER DOPPLER",
                        doppler_factor: "Doppler-Faktor",
                        shift_type: "Verschiebungstyp",
                        red_shift: "Rotverschiebung",
                        blue_shift: "Blauverschiebung",
                        particle_velocity: "TEILCHENGESCHWINDIGKEIT (v/c)",
                        formulas: "FORMELN"
                    },
                    mission: {
                        title: "MISSION: SPEZIELLE RELATIVITÄT",
                        description: "Erkunden Sie Einsteins spezielle Relativitätstheorie bei CERN. Beobachten Sie Zeitdilatation und Längenkontraktion."
                    },
                    stages: {
                        time_dilation: "ZEITDILATATION",
                        length_contraction: "LÄNGENKONTRAKTION",
                        doppler: "DOPPLER-EFFEKT",
                        time_dilation_desc: "Beobachten Sie Photonenuhren bei relativistischen Geschwindigkeiten",
                        length_contraction_desc: "Messen Sie die Längenkontraktion von Teilchen",
                        doppler_desc: "Analysieren Sie die relativistische Dopplerverschiebung",
                        time_dilation_hint: "Bewegte Uhren gehen langsamer: Δt = γΔt₀",
                        length_contraction_hint: "Bewegte Objekte kontrahieren: L = L₀/γ",
                        doppler_hint: "Licht verschiebt sich rot (entfernend) oder blau (nähernd)"
                    }
                },
                sp1_01: {
                    back: "Zurück zum Nexus",
                    title: "SP1.01 // MESSUNG & EINHEITEN",
                    check: "Prüfen",
                    next: "Weiter",
                    correct: "Messung Verifiziert",
                    incorrect: "Messfehler",
                    ready: "Bereit",
                    monitor_title: "SP1.01_MESSLABOR",
                    footer_left: "SP1.01_MESSUNG // KNOTEN: BASEL",
                    objective_title: "Messziel",
                    difficulty: {
                        basic: "BASIS",
                        core: "KERN",
                        advanced: "FORTGESCHRITTEN",
                        elite: "ELITE"
                    },
                    stages: {
                        si_units: "SI-EINHEITEN",
                        conversion: "UMRECHNUNG",
                        precision: "PRÄZISION"
                    },
                    tools: {
                        ruler: "LINEAL",
                        scale: "WAAGE",
                        timer: "TIMER"
                    },
                    labels: {
                        precision: "Messpräzision",
                        measurement_display: "Messanzeige",
                        input_terminal: "Terminaleingabe [Messknoten]"
                    },
                    prompts: {
                        si_unit: "Was ist die SI-Einheit für {measurement}?",
                        convert: "Wandle {value} {from} in {to} um",
                        sigfigs: "Wie viele signifikante Stellen in {value}?",
                        hint_si: "Die SI-Einheit ist {name}",
                        hint_factor: "Multiplizieren mit {factor}",
                        hint_sigfigs: "Alle Ziffern außer führenden Nullen zählen"
                    },
                    feedback: {
                        correct: "Messpräzision bestätigt.",
                        incorrect: "Kalibrierungsfehler erkannt."
                    }
                },
                gp1_04: {
                    back: "Zurück zum Nexus",
                    title: "GP1.04 // QUANTENTUNNEL",
                    difficulty: {
                        basic: "BASIS",
                        core: "KERN",
                        advanced: "FORTGESCHRITTEN",
                        elite: "ELITE"
                    },
                    objective_title: "Aktuelles Missionsziel",
                    target_title: "Wellenfunktion",
                    next: "Nächste Sequenz ausführen",
                    check: "Prüfen",
                    correct: "Verifiziert",
                    incorrect: "Fehlanpassung",
                    ready: "Bereit",
                    monitor_title: "GP1.04_QUANTEN_MONITOR",
                    footer_left: "GP1.04_QUANTENTUNNEL // KNOTEN: CERN",
                    labels: {
                        particle_energy: "TEILCHENENERGIE (E)",
                        barrier_height: "BARRIERENHÖHE (V₀)",
                        barrier_width: "BARRIERENBREITE (a)",
                        transmission: "TRANSMISSIONSKOEFFIZIENT",
                        wave_function: "WELLENFUNKTION",
                        probability_density: "WAHRSCHEINLICHKEITSDICHTE |ψ|²",
                        incident: "Einfallend",
                        reflected: "Reflektiert",
                        transmitted: "Transmittiert",
                        formulas: "FORMELN",
                        energy_ev: "Energie (eV)",
                        barrier_ev: "Barriere (eV)",
                        width_nm: "Breite (nm)"
                    },
                    mission: {
                        title: "MISSION: QUANTENTUNNELN",
                        description: "Erkunden Sie Quantentunneln durch Potentialbarrieren. Beobachten Sie Wellenfunktionsverhalten."
                    },
                    stages: {
                        classical: "KLASSISCHER GRENZFALL",
                        tunneling: "QUANTENTUNNELN",
                        resonance: "RESONANZ",
                        classical_desc: "Teilchenenergie unter Barriere (E < V₀)",
                        tunneling_desc: "Beobachten Sie Tunnelwahrscheinlichkeit",
                        resonance_desc: "Finden Sie Resonanzbedingungen (T ≈ 1)",
                        classical_hint: "Klassische Physik: T = 0 wenn E < V₀",
                        tunneling_hint: "Quantenmechanik: T > 0 auch wenn E < V₀",
                        resonance_hint: "Resonanz tritt bei bestimmten E/V₀-Verhältnissen auf"
                    }
                },
                s3_02_title: "SM3.02 // TRIGONOMETRIE-TURM",
                s3_02_subtitle: "Meistere Sinus, Kosinus und Tangens durch Einheitskreis-Visualisierung, Wellenfunktionen und Dreieckslösung.",
                s2_07_title: "SM2.07 // KOORDINATENGEOMETRIE",
                s2_07_subtitle: "Meistern Sie Entfernungs-, Mittelpunkt- und Steigungsberechnungen.",
                s3_03_title: "SM3.03 // WACHSTUM & LOGARITHMEN",
                s3_03_subtitle: "Modelliere exponentielles Wachstum und logarithmische Skalen mit Bakteriensimulationen.",
                s3_04_title: "SM3.04 // LOGARITHMISCHE SKALEN",
                s3_04_subtitle: "Meistern Sie pH-Wert, Dezibel und Richterskala mit logarithmischen Berechnungen.",
                sc1_01_title: "SC1.01 // MYSTERY LAB",
                sc1_01_subtitle: "Identifizieren Sie mysteriöse weiße Pulver durch chemische Tests.",
                sc1_02_title: "SC1.02 // MOL-MEISTER",
                sc1_02_subtitle: "Führe Stöchiometrie auf Novartis-Niveau durch: Molmassen, Verhältnisse und Ausbeuten.",
                sc1_03_title: "SC1.03 // ATOMSCHMIEDE",
                sc1_03_subtitle: "Baue Isotope und verstehe Atomorbitale in 3D.",
                sc1_04_title: "SC1.04 // PERIODISCHES PUZZLE",
                sc1_04_subtitle: "Baue Atome und entdecke das Periodensystem. Meistere die Elektronenkonfiguration.",
                sc2_01_title: "SC2.01 // REAKTIONSKINETIK",
                sc2_01_subtitle: "Meistern Sie Arrhenius-Gleichung, Kollisionstheorie und Reaktionsgeschwindigkeiten.",
                sc2_02_title: "SC2.02 // pH-WÄCHTER",
                sc2_02_subtitle: "Meistern Sie pH-Kurven und Titration mit Echtzeit-Feedback.",
                sc2_03_title: "SC2.03 // AERO LABOR",
                sc2_03_subtitle: "Erkunden Sie ideale Gasgesetze mit Partikelsimulationen. Meistern Sie PV=nRT.",
                sc2_04_title: "SC2.04 // LÖSLICHKEITSLABOR",
                sc2_04_subtitle: "Erkunden Sie Löslichkeitskurven und Kristallisation. Meistern Sie Sättigungsgleichgewicht.",
                sc3_01_title: "SC3.01 // MOLEKÜL-LEINWAND",
                sc3_01_subtitle: "Bauen und visualisieren Sie Molekülstrukturen im 3D-Raum.",
                sc3_02_title: "SC3.02 // GRUNDLAGEN DER ORGANISCHEN CHEMIE",
                sc3_02_subtitle: "Meistern Sie Kohlenwasserstoffe, funktionelle Gruppen und Isomere mit 2D/3D-Molekülvisualisierung.",
                sc3_03_title: "SC3.03 // ORGANISCHE REAKTIONEN",
                sc3_03_subtitle: "Erkunden Sie Verbrennungs-, Substitutions- und Additionsreaktionen mit Mechanismus-Animationen.",
                gc1_01_title: "GC1.01 // REDOX-TITAN",
                gc1_01_subtitle: "Meistern Sie elektrochemische Zellen und Redoxpotentiale.",
                gsc1_01: {
                    back: "Zurück zum Nexus",
                    title: "GC1.01 // REDOX-TITAN",
                    difficulty: {
                        basic: "BASIS",
                        core: "KERN",
                        advanced: "FORTGESCHRITTEN",
                        elite: "ELITE"
                    },
                    objective_title: "Aktuelles Missionsziel",
                    target_title: "Galvanische Zelle",
                    next: "Nächste Sequenz ausführen",
                    check: "Prüfen",
                    correct: "Verifiziert",
                    incorrect: "Fehlanpassung",
                    ready: "Bereit",
                    monitor_title: "GC1.01_REDOX_MONITOR",
                    footer_left: "GC1.01_REDOX_TITAN // KNOTEN: BASEL",
                    labels: {
                        cell_reaction: "ZELLREAKTION",
                        half_reactions: "HALBREAKTIONEN",
                        anode: "Anode (−)",
                        cathode: "Kathode (+)",
                        cell_potential: "ZELLPOTENTIAL",
                        standard_potential: "E⁰ (Standard)",
                        actual_potential: "E (tatsächlich)",
                        standard_potentials: "STANDARD-REDUKTIONSPOTENTIALE",
                        anode_metal: "ANODENMETALL (−)",
                        cathode_metal: "KATHODENMETALL (+)",
                        anode_concentration: "ANODENKONZENTRATION [M²⁺]",
                        cathode_concentration: "KATHODENKONZENTRATION [M²⁺]",
                        formulas: "FORMELN"
                    },
                    mission: {
                        title: "MISSION: ELEKTROCHEMIE",
                        description: "Meistern Sie galvanische Zellen und Redoxreaktionen. Beobachten Sie Elektronenfluss und berechnen Sie Zellpotentiale."
                    },
                    stages: {
                        daniell: "DANIELL-ZELLE",
                        custom: "BENUTZERDEFINIERTE ZELLE",
                        nernst: "NERNST-GLEICHUNG",
                        daniell_desc: "Studieren Sie die klassische Daniell-Zelle (Zn-Cu)",
                        custom_desc: "Bauen Sie benutzerdefinierte Zellen mit verschiedenen Metallen",
                        nernst_desc: "Wenden Sie die Nernst-Gleichung an, um E zu berechnen",
                        daniell_hint: "Zn verliert Elektronen (Oxidation), Cu²⁺ gewinnt Elektronen (Reduktion)",
                        custom_hint: "Metall mit niedrigerem Potential wird zur Anode (−)",
                        nernst_hint: "Höhere [Produkte] verringern das Zellpotential"
                    }
                },
                gc2_01_title: "GC2.01 // KOHLENSTOFF-KÖNIGREICH",
                gc2_01_subtitle: "Montieren Sie pharmazeutische Moleküle mit 3D-Modellen.",
                gc3_01_title: "GC3.01 // MOLEKULARER ARCHITEKT",
                gc3_01_subtitle: "Montieren Sie pharmazeutische Moleküle mit 3D-Kugel-Stab-Modellen.",
                gc3_02_title: "GC3.02 // KRISTALLPALAST",
                gc3_02_subtitle: "Erkunden Sie Kristallstrukturen: SC-, BCC-, FCC-Gitter mit Zwischengitterlücken.",
                sb1_01_title: "SB1.01 // ZELLFABRIK",
                sb1_01_subtitle: "Erkunden Sie Zellstruktur und Organellen.",
                sb1_01_met_title: "SB1.01 // STOFFWECHSELWEGE",
                sb1_01_met_subtitle: "Zellstoffwechsel und Energieproduktion.",
                sb1_02_title: "SB1.02 // PHOTOSYNTHESE-LABOR",
                sb1_02_subtitle: "Meistere Photosynthese-Gleichung, limitierende Faktoren und Chloroplastenstruktur.",
                sb2_01_title: "SB2.01 // MENDELS GARTEN",
                sb2_01_subtitle: "Genetik und Punnett-Quadrate.",
                sb2_02_title: "SB2.02 // MENSCHLICHE KÖRPERSYSTEME",
                sb2_02_subtitle: "Erkunde Verdauungs-, Kreislauf- und Atmungssysteme mit interaktiver Anatomie.",
                sb3_01_title: "SB3.01 // ÖKOSYSTEM-DYNAMIK",
                sb3_01_subtitle: "Meistere Nahrungsketten, Energiefluss und biogeochemische Kreisläufe im Rhein-Ökosystem.",
                gb1_01_title: "GB1.01 // EVOLUTIONSLABOR",
                gb1_01_subtitle: "Erkunde natürliche Selektion, Artbildung und evolutionäre Beweise.",
                gb3_01_title: "GB3.01 // DNA-SCHMIEDE",
                gb3_01_subtitle: "Molekularbiologie und DNA-Replikation.",
                gm4_01_title: "GM4.01 // KOMPLEXER HORIZONT",
                gm4_01_subtitle: "Visualisieren Sie die komplexe Ebene und die Eulersche Formel im 3D-Raum.",
                gm5_01_title: "EM2.01 // MATRIX-TRANSFORMATION",
                gm5_01_subtitle: "Lineare Transformationen und Eigenvektoren abgebildet auf das Basler Gitter.",
                gp5_02_title: "GP1.02 // RELATIVITÄTSLABOR",
                gp5_02_subtitle: "Berechnen Sie Lorentz-Faktor, Längenkontraktion und Zeitdilatation bei CERN.",
                gp1_03_title: "GP5.03 // TEILCHENBESCHLEUNIGER",
                gp1_03_subtitle: "Simulieren Sie CERNs LHC. Kollidieren Sie Protonen bei 13 TeV und entdecken Sie das Higgs-Boson.",
                gp1_04_title: "GP1.04 // QUANTENTUNNEL",
                gp1_04_subtitle: "Visualisieren Sie Quantentunneln durch Potentialbarrieren mit Wellenfunktionen.",
                coming_soon: "Simulationssequenz noch nicht initialisiert.",
                engine_line: "Physikalisches Gesetzes-Simulationssystem // v2.1",
                initiate_simulation: "Simulation starten",
                locked_level_required: "GESPERRT // STUFE {level}",
                engine_status_label: "Systemstatus",
                engine_status_value: "R3F-PHYSIK-ENGINE AKTIV",
                nodes_label: "Knoten",
                nodes_value: "GENF // ZÜRICH // SHANGHAI",
                search_label: "Module filtern",
                search_placeholder: "Nach Code oder Name suchen",
                filter_tags_label: "Fach-Tags",
                filter_clear: "Filter zurücksetzen",
                filter_empty: "Keine Module entsprechen den Filtern.",
                filter_tags: {
                    physics: "Physik",
                    math: "Mathe",
                    chemistry: "Chemie",
                    biology: "Biologie",
                    socratic: "Sokratisch"
                },
                completed_badge: "ABGESCHLOSSEN",
            },
        profile: {
                title: "Wissenschaftlerprofil",
                subtitle: "Operator-Dossier // Leistungs-Matrix",
                radar_title: "Kognitives Radar",
                stats_title: "Missionsstatistik",
                timeline_title: "Lernzeitlinie",
                timeline_empty: "Noch keine Missionshistorie.",
                timeline_accuracy: "Genauigkeit",
                stats: {
                    completed_modules: "Abgeschlossene Module",
                    avg_accuracy: "Durchschnittliche Genauigkeit",
                    total_runs: "Gesamtläufe",
                    experiment_index: "Experimentindex"
                },
                metrics: {
                    logic: "Logik",
                    intuition: "Intuition",
                    rigor: "Präzision",
                    experiment: "Experiment"
                }
            },
        sm2_02: {
                back: "Zurück zum Nexus",
                title: "SM2.02 // PYTHAGORAS & WURZELN",
                tabs: {
                    pythagoras: "PYTHAGORAS",
                    sqrt: "QUADRATWURZEL",
                    explorer: "ENTDECKER-LABOR",
                    quest_mode: "QUEST-MODI"
                },
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Ziel",
                next: "Nächste Sequenz ausführen",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Abweichung",
                ready: "Bereit",
                yes: "JA",
                no: "NEIN",
                monitor_title: "SM2.02_VISUELLE_UEBERWACHUNG",
                footer_left: "SM2.02_PYTHAGORAS // KNOTEN: ZÜRICH",
                input_radical: "Antwort als k√m",
                input_k: "k",
                input_m: "m",
                input_number: "Antwort",
                pythagoras: {
                    solve_hyp: " Feuerwehr: Leiterlänge berechnen",
                    solve_leg: " Bergrettung: Vertikale Höhe finden",
                    check_right: " Ingenieurscheck: Rechtwinkliges Dreieck?",
                    distance: " Drohnenlieferung: Flugdistanz berechnen",
                    elite_space: " CERN-Labor: Raumdiagonale berechnen",
                    explorer_mission: "PYTHAGORAS-ENTDECKER: Skalierung anpassen und Ähnlichkeitskonstanten beobachten.",
                    fluid_title: "Fluid-Volumenerhaltung",
                    fluid_desc: "Kippen Sie die Behälter, um zu sehen, wie A² + B² exakt C² füllen. Dies visualisiert die Flächenerhaltung."
                },
                sqrt: {
                    perfect: "Quadratzahlen",
                    simplify: "Wurzeln vereinfachen",
                    estimate: "Schätzen"
                },
                mission: {
                    title: "MISSION",
                    protocol: "NEXUS PROTOCOL // SCHWEIZ-KNOTEN LIVE",
                    cern_title: "CERN KALIBRIERARRAY",
                    cern_desc: "Kalibriere ein 16:9-Array. Höhe=9s, Breite=16s. Bestimme die Diagonale.",
                    roof_title: "GRINDELWALD SCHNEEDACH",
                    roof_desc: "Halbe Spannweite 6m, Höhe 6m. Berechne die Dachstrebe.",
                    ladder_title: "LUCERNE LEITER-DOCK",
                    ladder_desc: "Eine Leiter ist 5m von der Wand entfernt und erreicht 12m Höhe. Bestimme die Leiterlänge.",
                    grid_title: "BASEL GITTERDISTANZ",
                    grid_desc: "Berechne die Distanz zwischen zwei Navigationsknoten im Basler Raster.",
                    chain_title: "CERN TRANSFERTUNNEL",
                    chain_desc: "Ein Tunnel überspannt eine rechteckige Plattform und steigt zu einer höheren Ebene auf. Bestimme die Gesamtdiagonale."
                },
                mental: {
                    title: "KOPFRECHNEN",
                    triples: "Pythagoreische Tripel",
                    chain: "Streckenkette"
                }
            },
        sm3_01: {
                back: "Zurück zum Nexus",
                title: "SM3.01 // QUADRATISCHE GLEICHUNGEN",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Zielgleichung",
                next: "Nächste Sequenz ausführen",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Abweichung",
                ready: "Bereit",
                monitor_title: "SM3.01_MONITOR",
                footer_left: "SM3.01_QUADRATISCH // KNOTEN: ZÜRICH",
                stages: {
                    terms: "TERME",
                    factorize: "FAKTORISIEREN",
                    fractions: "BRUCHTERME",
                    equations: "GLEICHUNGEN",
                    terms_prompt_latex: "\\text{Vereinfache den Term (gleichartige Terme zusammenfassen).}",
                    factor_prompt_latex: "\\text{Faktorisiere den Term (als Produkt schreiben).}",
                    fractions_prompt_latex: "\\text{Kürzen / Bruchterm vereinfachen.}",
                    equations_prompt_latex: "\\text{Löse die Gleichung Schritt für Schritt.}"
                },
                modes: {
                    factor: "FAKTORISIEREN",
                    formula: "FORMEL",
                    complete_square: "QUADRATISCHE ERGÄNZUNG",
                    factor_prompt: "Faktorisieren: Finde A,B so dass (x+A)(x+B)=0.",
                    formula_prompt: "Löse mit der Mitternachtsformel.",
                    complete_square_prompt: "In Scheitelpunktform umformen und (h,k) bestimmen."
                },
                labels: {
                    input: "EINGABE",
                    numerator: "ZÄHLER",
                    denominator: "NENNER",
                    hints: "HINWEISE",
                    roots: "Lösungen x₁, x₂",
                    vertex: "Scheitelpunkt (h,k)",
                    factor: "Faktorisieren",
                    factor_slots: "Faktoren konstruieren (A,B)",
                    formula: "Mitternachtsformel",
                    complete_square: "Quadratische Ergänzung",
                    elite_hint_latex: "Hinweis: \\; x=\\frac{-b\\pm\\sqrt{\\Delta}}{2a}",
                    fraction_hint: "Tipp: Gib das Resultat als Ganzzahl oder Bruch (z.B. 4/3) an."
                },
                hints: {
                    identities: {
                        trinomial_expand_latex: "(x+A)(x+B)=x^2+(A+B)x+AB",
                        diff_squares_latex: "u^2-v^2=(u-v)(u+v)"
                    },
                    rules: {
                        factor_common_latex: "\\text{Gemeinsamen Faktor ausklammern.}",
                        cancel_common_latex: "\\text{Zähler/Nenner faktorisieren und gemeinsame Faktoren kürzen.}",
                        simplify_both_sides_latex: "\\text{Beide Seiten schrittweise vereinfachen.}",
                        square_root_pm_latex: "\\text{Wurzel ziehen mit }\\pm\\text{.}",
                        zero_product_latex: "\\text{Wenn }pq=0\\text{ dann }p=0\\text{ oder }q=0."
                    }
                }
            },
        sm3_02: {
                back: "Zurück zum Nexus",
                title: "SM3.02 // TRIGONOMETRISCHER KREIS",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Trigonometrische Werte",
                next: "Nächste Sequenz ausführen",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Abweichung",
                ready: "Bereit",
                monitor_title: "SM3.02_TRIG_MONITOR",
                footer_left: "SM3.02_TRIG_KREIS // KNOTEN: BASEL",
                labels: {
                    angle: "WINKEL (θ)",
                    values: "TRIGONOMETRISCHE WERTE",
                    display: "ANZEIGEOPTIONEN",
                    show_waves: "Wellenfunktionen anzeigen",
                    formulas: "FORMELN",
                    special_angles: "SPEZIALWINKEL",
                    exact_value: "EXAKTER WERT",
                    decimal_value: "DEZIMALWERT",
                    quadrant: "QUADRANT",
                    input: "EINGABE",
                    hints: "HINWEISE",
                    sin: "sin(θ)",
                    cos: "cos(θ)",
                    tan: "tan(θ)",
                    opposite: "Gegenkathete",
                    adjacent: "Ankathete",
                    hypotenuse: "Hypotenuse"
                },
                mission: {
                    title: "MISSION: EINHEITSKREIS",
                    description: "Meistern Sie den Einheitskreis und trigonometrische Funktionen. Verstehen Sie sin-, cos- und tan-Beziehungen."
                },
                stages: {
                    unit_circle: "EINHEITSKREIS",
                    projections: "PROJEKTIONEN",
                    waves: "WELLENFUNKTIONEN",
                    unit_circle_desc: "Erkunden Sie den Einheitskreis und Winkelrotation",
                    projections_desc: "Verstehen Sie Sinus und Kosinus als Projektionen",
                    waves_desc: "Visualisieren Sie Sinus und Kosinus als Wellenfunktionen",
                    unit_circle_hint: "Punkt auf Kreis: (cos θ, sin θ)",
                    projections_hint: "sin = y-Projektion, cos = x-Projektion",
                    waves_hint: "Sinus und Kosinus erzeugen periodische Wellen",
                    unit_circle_prompt_latex: "\\text{Bestimme den Quadranten oder das Vorzeichen.}",
                    projections_prompt_latex: "\\text{Berechne den exakten trigonometrischen Wert.}",
                    waves_prompt_latex: "\\text{Finde Amplitude oder Periode.}"
                }
            },
        sm3_03: {
                back: "Zurück zum Nexus",
                title: "SM3.03 // WACHSTUM & LOGARITHMEN",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Exponentielles Wachstum",
                next: "Nächste Sequenz ausführen",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Abweichung",
                ready: "Bereit",
                monitor_title: "SM3.03_WACHSTUM_MONITOR",
                footer_left: "SM3.03_EXPONENTIAL // KNOTEN: BASEL",
                labels: {
                    input: "EINGABE",
                    hints: "HINWEISE",
                    population: "Population (N)",
                    time: "Zeit (t)",
                    doubling_time: "Verdopplungszeit (d)",
                    initial: "Anfangszahl (N₀)",
                    formula_ref: "FORMELREFERENZ",
                    parameters: "AKTUELLE PARAMETER",
                    growth_rate: "Wachstumsrate (k)",
                    half_life: "Halbwertszeit",
                    principal: "Kapital (P)",
                    rate: "Zinssatz (r)"
                },
                hints: {
                    exp_rule1: "Jede Verdopplung multipliziert die Population mit 2",
                    exp_rule2: "Nach n Verdopplungen: N = N₀ × 2ⁿ",
                    log_rule1: "log₂(2ⁿ) = n",
                    log_rule2: "Basiswechsel: logₐ(x) = ln(x)/ln(a)",
                    app_rule1: "Halbwertszeit: N(t) = N₀ × (½)^(t/h)",
                    app_rule2: "Zinseszins: A = P(1+r)^t"
                },
                input_tip: "Tipp: Gib das Resultat als Ganzzahl oder auf 1 Dezimalstelle gerundet an.",
                mission: {
                    title: "BAKTERIENWACHSTUM-LABOR",
                    description: "Das Novartis-Biolabor benötigt exponentielle Wachstumsmodellierung. Berechne Bakterienpopulationen und logarithmische Skalen."
                },
                stages: {
                    exponential: "EXPONENTIELL",
                    logarithm: "LOGARITHMUS",
                    applications: "ANWENDUNGEN",
                    exponential_prompt_latex: "\\text{Berechne Population mit }N(t)=N_0\\cdot 2^{t/d}.",
                    logarithm_prompt_latex: "\\text{Löse nach Zeit mit Logarithmen.}",
                    applications_prompt_latex: "\\text{Wende exponentielle Modelle auf reale Szenarien an.}",
                    exp_basic_prompt: "\\text{Berechne die Population zur Zeit } t.",
                    exp_advanced_prompt: "\\text{Bestimme die Anzahl der Verdopplungen.}",
                    exp_elite_prompt: "\\text{Finde die kontinuierliche Wachstumsrate } k.",
                    log_basic_prompt: "\\text{Löse nach Zeit: } t = d \\cdot \\log_2(N/N_0).",
                    log_core_prompt: "\\text{Berechne den Logarithmus.}",
                    log_advanced_prompt: "\\text{Verwende die Basiswechselformel.}",
                    log_elite_prompt: "\\text{Löse die logarithmische Gleichung.}",
                    app_half_prompt: "\\text{Berechne die Restmenge nach Halbwertszeit.}",
                    app_compound_prompt: "\\text{Berechne Zinseszins: } A=P(1+r)^t.",
                    app_rate_prompt: "\\text{Bestimme die Wachstumsrate aus Daten.}",
                    app_ph_prompt: "\\text{Berechne den pH-Wert aus der H⁺-Konzentration.}"
                },
                formulas: {
                    exponential: "N(t) = N_0 \\cdot 2^{t/d}",
                    logarithm: "t = d \\cdot \\log_2(N/N_0)",
                    applications: "N(t) = N_0 \\cdot e^{kt}"
                },
                scenarios: {
                    exp_bac: "🦠 SZENARIO: Novartis Labor Bakterienkultur — Ein Forschungsteam bei Novartis in Basel untersucht Bakterienwachstum. Sie platzieren 100 Bakterien um 8:00 Uhr in eine Petrischale. Unter optimalen Bedingungen verdoppelt sich die Bakterienpopulation alle 20 Minuten. Das Labor muss vorhersagen, wann die Population 10.000 erreicht, um Proben zum richtigen Zeitpunkt zu entnehmen. Deine Aufgabe: Berechne die Population zu jedem beliebigen Zeitpunkt mit exponentiellem Wachstum.",
                    exp_social: "📱 SZENARIO: TikTok-Challenge geht viral — Dein Freund postet um 12 Uhr mittags ein Tanz-Challenge-Video. Anfangs schauen es 50 Leute. Jede Stunde teilt jeder Zuschauer es mit 2 Freunden, die es noch nicht gesehen haben (Verdopplungseffekt). Bis zum Abend explodiert die Zuschauerzahl exponentiell. Der Schuldirektor will wissen: Um welche Uhrzeit werden 10.000 Schüler es gesehen haben? Dies modelliert echte virale Verbreitung in sozialen Medien.",
                    exp_virus: "🦠 SZENARIO: Grippe-Ausbruch in der Schule — Es ist Montagmorgen. 3 Schüler in deiner Schule mit 1.200 Schülern haben die Grippe. Die Gesundheitsbehörden wissen, dass ohne Intervention jede infizierte Person die Grippe alle 2 Tage an 2 weitere Personen weitergibt (Verdopplungszeit = 2 Tage). Die Schulkrankenschwester muss vorhersagen: Wie viele werden bis Freitag krank sein? Wann werden 100 Schüler infiziert sein? Dies hilft zu entscheiden, ob die Schule geschlossen werden muss.",
                    exp_moore: "💻 SZENARIO: Smartphone-Leistungsvorhersage — Im Jahr 2000 hatte das Nokia-Handy deines Vaters 4 MB RAM. Laut Moores Gesetz verdoppelt sich die Rechenleistung etwa alle 2 Jahre. Dein aktuelles iPhone hat 8 GB (8.000 MB) RAM. Frage: Wie viele 'Verdopplungen' gab es zwischen 2000 und 2024? Kannst du überprüfen, ob Moores Gesetz zutraf? Dieses exponentielle Wachstum treibt die gesamte moderne Technologie an.",
                    log_invest: "💰 SZENARIO: Dein Taschengeld-Investitionsplan — Du hast 1.000 CHF aus Geburtstagsgeschenken gespart. Deine Eltern bieten einen Deal an: Sie fungieren als deine 'Bank' und zahlen 8% Jahreszins mit Zinseszins (das bedeutet, jedes Jahr verdienst du Zinsen auf deine vorherigen Zinsen). Du möchtest einen Gaming-PC kaufen, der 2.000 CHF kostet. Frage: Wie viele Jahre dauert es, bis sich dein Geld verdoppelt? Löse mit Logarithmen: t = log₂(2000/1000) / log₂(1.08). So funktioniert echte Investitionsplanung!",
                    log_sound: "🔊 SZENARIO: Schulkonzert Soundcheck — Der Musiklehrer richtet das Schulkonzert ein. Ein Flüstern misst 30 dB, normale Konversation 60 dB und ein Rockkonzert 120 dB. Aber hier ist der Trick: Die Dezibel-Skala ist logarithmisch! 60 dB ist nicht 'doppelt so laut' wie 30 dB — es ist tatsächlich 1.000-mal intensiver (weil 10^(60/10) / 10^(30/10) = 1.000). Deine Aufgabe: Wenn der aktuelle Schallpegel 80 dB beträgt und die Sicherheitsgrenze 85 dB ist, um wie viel kann die Intensität noch steigen, bevor es unsicher wird?",
                    log_ph: "🧪 SZENARIO: Chemielabor pH-Test — Im Chemieunterricht testest du den pH-Wert verschiedener Flüssigkeiten. Zitronensaft hat pH 2, Wasser pH 7 und Seife pH 12. Dein Lehrer erklärt: pH ist eine logarithmische Skala zur Messung der Wasserstoffionenkonzentration [H⁺]. pH = -log₁₀[H⁺]. Das bedeutet, pH 2 ist 100.000-mal saurer als pH 7 (nicht nur '5 Einheiten mehr')! Frage: Wenn eine Lösung [H⁺] = 0,001 mol/L hat, was ist ihr pH-Wert? Ist sie sauer oder basisch?",
                    log_security: "🔐 SZENARIO: Passwort-Knackzeit — Dein IT-Lehrer erklärt Passwortsicherheit. Eine 4-stellige PIN (0000-9999) hat 10.000 Kombinationen. Der Computer eines Hackers kann 1.000 Passwörter pro Sekunde testen, also dauert das Knacken 10 Sekunden. Aber wenn du ein 8-Zeichen-Passwort mit Buchstaben und Zahlen verwendest (62 Optionen pro Zeichen), gibt es 62^8 = 218 Billionen Kombinationen! Bei 1 Milliarde Versuchen pro Sekunde dauert es 218.000 Sekunden (2,5 Tage). Frage: Wie viele Zeichen werden für 1 Jahr Schutz benötigt? Löse mit Logarithmen: n = log₆₂(Sekunden × Versuche_pro_Sekunde).",
                    app_med: "💊 SZENARIO: Medikamenten-Dosierungszeit — Dein Arzt verschreibt ein Schmerzmittel. Du nimmst um 8:00 Uhr 400 mg ein. Das Medikament hat eine Halbwertszeit von 6 Stunden, was bedeutet, dass alle 6 Stunden die Hälfte davon aus deinem Körper eliminiert wird. Um 14:00 Uhr (6 Stunden später) bleiben 200 mg. Um 20:00 Uhr bleiben 100 mg. Der Arzt sagt, das Medikament wirkt unter 50 mg nicht mehr. Frage: Zu welcher Uhrzeit kannst du sicher die nächste Dosis nehmen? Verwende die Formel: N(t) = N₀ × (1/2)^(t/6).",
                    app_bank: "🏦 SZENARIO: Sparkonten vergleichen — Du hast 5.000 CHF für die Universität zu sparen. Bank A bietet 3% einfache Zinsen (du verdienst immer 150 CHF pro Jahr). Bank B bietet 3% Zinseszins (jedes Jahr verdienst du Zinsen auf deine Zinsen). Nach 10 Jahren: Bank A gibt dir 5.000 + 10×150 = 6.500 CHF. Bank B gibt dir 5.000 × (1,03)^10 = 6.720 CHF. Frage: Nach wie vielen Jahren gibt dir Bank B 1.000 CHF mehr als Bank A? Löse mit exponentiellen Gleichungen!",
                    app_pop: "🏙️ SZENARIO: Zürich Bevölkerungswachstum — Im Jahr 2000 hatte Zürich 340.000 Einwohner. Die Stadt wächst mit 1,2% pro Jahr (exponentielles Wachstum). Bis 2020 erreichte die Bevölkerung 420.000. Stadtplaner müssen vorhersagen: Wann wird Zürich 500.000 erreichen? Dies bestimmt, wann neue Schulen, Trams und Wohnungen gebaut werden müssen. Verwende die Formel: P(t) = P₀ × (1,012)^t. Löse nach t, wenn P(t) = 500.000.",
                    app_carbon: "🦴 SZENARIO: Archäologische Datierung — Archäologen finden ein Holzwerkzeug in einer Schweizer Höhle. Alle Lebewesen enthalten Kohlenstoff-14 (¹⁴C), das mit einer Halbwertszeit von 5.730 Jahren zerfällt. Als der Baum starb, hörte er auf, neues ¹⁴C aufzunehmen. Durch Messung, wie viel ¹⁴C übrig ist, können Wissenschaftler das Alter berechnen. Wenn das Werkzeug 25% des ursprünglichen ¹⁴C hat, wie alt ist es? Verwende: 0,25 = (1/2)^(t/5730). Löse nach t mit Logarithmen. So wissen wir das Alter antiker Artefakte!"
                }
            },
        sm2_03: {
                back: "Zurück zum Nexus",
                title: "SM2.03 // LINIEN-NAVIGATOR",
                difficulty: {
                    basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Zielabfang",
                next: "Nächste Sequenz ausführen",
                check: "Verifizieren",
                correct: "Verifiziert",
                incorrect: "Abweichung",
                ready: "Bereit",
                monitor_title: "SM2.03_LASER_MONITOR",
                footer_left: "SM2.03_LINIEN_NAVIGATOR // KNOTEN: BASEL",
                labels: {
                    input: "EINGABE",
                    hints: "HINWEISE",
                    emitter: "Abfahrtsbahnhof",
                    target: "Ziel",
                    slope: "Kosten pro km (m)",
                    intercept: "Grundgebühr (c)"
                },
                prompts: {
                    level1: "Berechne den Ticketpreis für das Ziel",
                    level2: "Finde die Distanz, wo zwei Tarife gleich kosten",
                    level3: "Finde die Schwelle, ab der Plan A günstiger wird"
                },
                hints: {
                    level1: "Steigung m = Kosten pro km. Achsenabschnitt c = Grundgebühr. Gesamtpreis y = m × Distanz + c.",
                    level2: "Zwei Tarife haben unterschiedliche m und c. Setze m₁x + c₁ = m₂x + c₂ und löse nach x.",
                    level3: "Finde die Distanz, ab der Plan A günstiger als Plan B ist.",
                    drag: "Gib deine Antwort im Eingabefeld unten ein."
                },
                ui: {
                    current_function: "Tarifformel",
                    reflections: "Tarifpläne",
                    target_position: "Ziel (km)",
                    hit_badge: "TARIF PASST",
                    chamber: "BAHNHOF",
                    laser_sim: "TARIF_RECHNER",
                    level: "LEVEL",
                    hits: "Treffer"
                },
                mission: {
                    title: "SBB FAHRPREIS-RECHNER",
                    description: "Modelliere Bahnticketpreise als lineare Funktionen. Steigung = Kosten/km, Achsenabschnitt = Grundgebühr."
                },
                stages: {
                    level1: "LEVEL 1",
                    level2: "LEVEL 2",
                    level3: "LEVEL 3"
                }
            },
        sm2_04: {
                back: "Zurück zum Nexus",
                title: "SM2.04 // ÄHNLICHKEIT & SKALIERUNG",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Ziel",
                next: "Nächste Sequenz ausführen",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Abweichung",
                ready: "Bereit",
                monitor_title: "SM2.04_MONITOR",
                footer_left: "SM2.04_AEHNLICHKEIT // KNOTEN: BASEL",
                stages: {
                    scale_factor: "STRECKUNG",
                    similar_triangles: "ÄHNLICH",
                    application: "ANWENDUNG",
                    stages_prompt_latex: "Nutze Proportionen, um den fehlenden Wert zu bestimmen."
                },
                labels: {
                    input: "EINGABE",
                    hints: "HINWEISE"
                },
                hints: {
                    rules: {
                        proportional_latex: "\\frac{a}{b}=\\frac{c}{d}",
                        scale_factor_latex: "\\text{Streckfaktor }k=\\frac{\\text{neu}}{\\text{alt}}",
                        cross_multiply_latex: "\\text{Über Kreuz multiplizieren, um die Unbekannte zu lösen.}"
                    }
                },
                mission: {
                    title: "MISSION: SCHATTENMESSUNG",
                    protocol: "NEXUS PROTOCOL // SCHWEIZ-KNOTEN LIVE",
                    tower_title: "ZÜRICHER KIRCHTURM",
                    description: "In Zürich muss ein Architekt die Höhe eines historischen Kirchenturms mithilfe seines Schattens bestimmen. Ähnliche Dreiecke sind der Schlüssel.",
                    ring_title: "LUCERNE BEOBACHTUNGSRING",
                    ring_desc: "In Luzern schneidet eine Sehne den Außenkreis und berührt den Innenkreis. Bestimme die Ringbreite.",
                    labels: {
                        tower: "Kirchturm",
                        tower_shadow: "Turmschatten",
                        stick: "Stab (1.5m)",
                        stick_shadow: "Stabschatten",
                        calculate_height: "Turmhöhe berechnen"
                    }
                }
            },
        sm2_01: {
                back: "← Zurück zum Nexus",
                back_short: "Zurück zum Nexus",
                title: "SM2.01 // BINOMISCHE FORMELN",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                mode_1: "1. Formel: (a+b)²",
                mode_2: "2. Formel: (a-b)²",
                param_a: "Parameter a",
                param_b: "Parameter b",
                lock: "PARAMETER FIXIEREN",
                unlock: "PARAMETER ÄNDERN",
                instruction_setup: "Passe die Schieberegler für a und b an.",
                instruction_solve: "Ziehe die Flächenanteile in das Zielfeld $(a+b)²$.",
                solve_success: "IDENTITÄT BEWIESEN",
                solve_fail: "FLÄCHENFEHLER",
                terms: {
                    a2: "a²",
                    b2: "b²",
                    ab: "ab",
                    target_plus: "(a+b)²",
                    target_minus: "(a-b)²",
                },
                scenarios: {
                    architect_title: "Szenario A: Gartenerweiterung",
                    architect_desc: "Dein Garten am See (a×a) wird um b Meter erweitert. Berechne die neue Gesamtfläche.",
                    architect_context: "Du besitzt ein quadratisches Gartenbeet am Zürichsee mit Seitenlänge 'a' Meter. Die Stadt erlaubt dir, es um 'b' Meter auf zwei Seiten zu erweitern. Um die richtige Menge Erde und Samen zu kaufen, musst du die neue Gesamtfläche kennen.",
                    scrapper_title: "Szenario B: Fliesenfabrik",
                    scrapper_desc: "Eine Fabrik hat drei Fliesenformen produziert. Setze sie zu einem perfekten Quadrat zusammen.",
                    scrapper_context: "Eine Schweizer Fliesenfabrik produziert drei Arten von Fliesen: ein grosses Quadrat (a²), zwei rechteckige Streifen (je a×b) und ein kleines Quadrat (b²). Deine Aufgabe ist es zu überprüfen, dass diese vier Teile perfekt zu einem grossen Quadrat der Seitenlänge (a+b) zusammengesetzt werden können.",
                    speedster_title: "Szenario C: Kopfrechen-Sprint",
                    speedster_desc: "Berechne grosse Quadratzahlen sofort durch Aufteilen in (Runde+Rest)².",
                    speedster_context: "Im Schweizer Mathe-Olympiad musst du Zahlen wie 103 oder 47 im Kopf quadrieren. Der Trick: 103 = (100+3), dann (a+b)² = 10000 + 600 + 9 = 10609.",
                    voyager_context: "Zwei quadratische Felder teilen eine gemeinsame Grenze. Eines hat die Seitenlänge a, das andere b.",
                    architect_mission: "Aufgabe: Berechne die erweiterte Gartenfläche mit (a+b)² = a² + 2ab + b².",
                    scrapper_mission: "Aufgabe: Identifiziere a und b aus der expandierten Form und rekonstruiere das Quadrat.",
                    speedster_mission: "Aufgabe: Zerlege die Zahl in (Runde ± Rest) und nutze die binomische Formel.",
                    voyager_mission: "Aufgabe: Nutze die dritte binomische Formel zur Flächendifferenz.",
                    elite_mission: "Aufgabe: Faktorisiere das komplexe Polynom in binomischer Produktform."
                },
                speedster_hint: "Verwenden Sie die binomische Formel (a±b)² zur Vereinfachung",
                elite_tips_title: "TIPPS: Binomiale Isolationsstrategie",
                elite_tips_target: "Zielformat:",
                scrapper_step01: "SCHRITT 01: Wurzel isolieren (a)",
                active_objective: "Aktuelles Missionsziel",
                target_expression: "Ziel-Identitätsausdruck",
                params_config: "00 // Parameterkonfiguration",
                units: "EINHEITEN",
                tabs: {
                    explore: "ERKUNDEN",
                    architect: "GARTEN",
                    scrapper: "FLIESEN LAB",
                    speedster: "SPRINT",
                    voyager: "VOYAGER",
                    elite: "ELITE"
                },
                ui: {
                    part_1_a2: "Teil 1 (a²)",
                    part_2_2ab: "Teil 2 (2ab)",
                    part_3_b2: "Teil 3 (b²)",
                    identify_root_a: "Wurzel a bestimmen",
                    identify_root_b: "Wurzel b bestimmen",
                    elite_step_1: "Schritt 1: Binomisches Quadrat isolieren",
                    elite_step_2: "Schritt 2: Gleichung ausgleichen",
                    execute_next_sequence: "Nächste Frage",
                    continue_operation: "Weiter üben",
                    logic_lattice_title: "Logikgitter // Zerlegung",
                    logic_architect_step_1: "SCHRITT_01: Außenterme verteilen",
                    logic_architect_step_2: "SCHRITT_02: Teilsegmente ausmultiplizieren",
                    logic_scrapper_step_1: "SCHRITT_01: Wurzel isolieren (a)",
                    logic_scrapper_step_2: "SCHRITT_02: Linearterm prüfen (2ab)",
                    logic_voyager_axiom_title: "AXIOM: Konjugierte Dualität",
                    logic_voyager_axiom_body: "Das Produkt (A+B)(A-B) hebt lineare Kreuzterme (±AB) auf.",
                    logic_voyager_derivation_title: "HERLEITUNG:",
                    link_established: "VERBINDUNG_HERGESTELLT",
                    axiomatic_constraints_title: "Axiomatische Randbedingungen",
                    constraints_architect: "Die Ecke b² ist der Offset zum Vervollständigen des großen Quadrats; ihr Wert ist entscheidend für die Präzision.",
                    constraints_scrapper: "Faktorisieren zerlegt die Struktur zurück in geordnete Terme; die Wurzelisolation ist das Hauptziel.",
                    constraints_speedster: "Kopfrechnen nutzt Basiszerlegung: Verschiebe die Aufgabe in ein (Basis+N)²‑Schema.",
                    constraints_elite: "Erweiterte Umformung für mehrdimensionale Koeffizienten, wobei C ein zusammengesetzter Skalierungsfaktor ist.",
                    constraints_voyager: "Symmetrie erfordert strikte Vorzeichen. Die Differenz beschreibt den Nettoverlust in der Projektion.",
                    visual_reference_position: "Visuelle_Referenz_Position [FIX_REF.01]",
                    status_operational: "STATUS: BETRIEBSBEREIT",
                    fps: "FPS",
                    latency: "LATENZ",
                    footer_left: "SM2.01_ALGEBRA_SYNC // KNOTEN: ZÜRICH",
                    verified: "Verifiziert",
                    simulating: "Simuliert",
                }
            },
        gm1_01: {
                back: "Zurück zum Nexus",
                title: "GM1.01 // INFINITESIMALRECHNUNG",
                tabs: {
                    explore: "ENTDECKEN",
                    slope: "STEIGUNG",
                    tangent: "TANGENTE",
                    rate: "ÄNDERUNGSRATE",
                    elite: "ELITE"
                },
                explore_title: "00 // Interaktive Erkundung",
                explore_instruction: "Ziehe den Punkt P entlang der Parabel y = x² und beobachte, wie sich die Tangente verändert. Die Steigung m repräsentiert die momentane Änderungsrate.",
                explore_hint: "Ziehe Punkt P im visuellen Monitor →",
                current_point: "Aktueller Punkt",
                slope_label: "Tangentensteigung",
                mission: {
                    title: "ABLEITUNGS-STRASSEN-SIMULATOR",
                    description: "Meistere die Infinitesimalrechnung, indem du ein Auto auf mathematischen Kurven fährst. Die Ableitung sagt dir die Steigung der Straße an jedem Punkt. Passe den Winkel des Autos perfekt an die Straße an!"
                },
                spotlight: {
                    title: "Scientist Spotlight",
                    euler_name: "Leonhard Euler",
                    euler_bio: "In Basel geboren, prägte Euler die moderne Analysis. Seine Notation und Methoden verbinden Kurven, Bewegung und Reihen zu präzisen Gesetzen.",
                    bernoulli_name: "Johann Bernoulli",
                    bernoulli_bio: "Der Bernoulli‑Clan schärfte die Analysis durch Wettbewerb. Johann entwickelte Differentialmethoden weiter und machte Änderungsraten rechnerisch beherrschbar."
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Ziel",
                next: "Nächste Sequenz ausführen",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Abweichung",
                ready: "Bereit",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                hints_title: "Formelreferenz",
                monitor_title: "GM1.01_MONITOR",
                status: "STATUS: BETRIEBSBEREIT",
                footer_left: "GM1.01_INFINITESIMAL // KNOTEN: BASEL",
                footer_right: "ABLEITUNGS_SIMULATOR",
                stages: {
                    intro: "INTRO",
                    differentiation: "ABLEITUNGEN",
                    application: "ANWENDUNGEN",
                    power_rule: "POTENZREGEL",
                    factor_rule: "FAKTORREGEL",
                    sum_rule: "SUMMENREGEL",
                    product_rule: "PRODUKTREGEL",
                    quotient_rule: "QUOTIENTENREGEL",
                    chain_rule: "KETTENREGEL",
                    intro_prompt_latex: "\\text{Berechne die Ableitung von }x^n.",
                    differentiation_prompt_latex: "\\text{Wende die Ableitungsregeln an.}",
                    application_prompt_latex: "\\text{Wende Differentialrechnung an, um Probleme zu lösen.}",
                    power_rule_prompt_latex: "\\text{Berechne }f'(x)\\text{ am gegebenen Punkt.}",
                    factor_rule_prompt_latex: "\\text{Berechne }f'(x)\\text{ mit der Faktorregel.}",
                    sum_rule_prompt_latex: "\\text{Berechne }f'(x)\\text{ mit der Summenregel.}",
                    product_rule_prompt_latex: "\\text{Berechne }f'(x)\\text{ mit der Produktregel.}",
                    quotient_rule_prompt_latex: "\\text{Berechne }f'(x)\\text{ mit der Quotientenregel.}",
                    chain_rule_prompt_latex: "\\text{Berechne }f'(x)\\text{ mit der Kettenregel.}"
                },
                labels: {
                    secant_slope: "Sekantensteigung m",
                    tangent_slope: "Tangentensteigung m",
                    velocity: "Geschwindigkeit v",
                    x_coordinate: "x-Koordinate",
                    hints: "HINWEISE"
                },
                formulas: {
                    power_rule: "f'(x) = n\\cdot x^{n-1}",
                    factor_rule: "(a\\cdot f)' = a\\cdot f'",
                    sum_rule: "(f+g)' = f' + g'",
                    product_rule: "(uv)' = u'v + uv'",
                    quotient_rule: "\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}",
                    chain_rule: "\\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx}"
                },
                scenarios: {
                    power_rule: "🚗 SZENARIO: Auto-Beschleunigung auf einem Hügel — Du fährst einen Tesla einen kurvigen Hügel hinauf. Die Straßenhöhe folgt h(x) = x². Die Ableitung h'(x) sagt dir die Steilheit der Straße an jedem Punkt. Wenn du das Auto im falschen Winkel neigst, schleift es auf dem Boden oder kippt um! Berechne die korrekte Steigung (Ableitung), damit das Fahrgestell des Autos perfekt zur Straßenoberfläche passt. Genau so berechnen selbstfahrende Autos Geländewinkel in Echtzeit.",
                    factor_rule: "🏗️ SZENARIO: Bauskalierung — Ein Architekt entwirft ein Gebäude mit Höhe h(x) = x². Wenn die Stadt verlangt, dass alle Dimensionen mit Faktor 3 skaliert werden, wird die neue Höhe H(x) = 3x². Die Ableitung sagt dir, wie sich die Steigung des skalierten Gebäudes ändert. Verwende die Faktorregel: Wenn f(x) = a·g(x), dann f'(x) = a·g'(x). Der konstante Faktor 3 bleibt außerhalb der Ableitung, was die Berechnungen vereinfacht!",
                    sum_rule: "🌊 SZENARIO: Ozeanwellen-Überlagerung — Zwei Ozeanwellen überlagern sich: Welle A hat Höhe h₁(x) = x² und Welle B hat Höhe h₂(x) = 3x. Die Gesamtwellenhöhe ist H(x) = x² + 3x. Um vorherzusagen, wie schnell die kombinierte Welle steigt, verwende die Summenregel: (f + g)' = f' + g'. Berechne die Steigung jeder Welle separat und addiere sie dann. So sagen Ozeanographen das Verhalten von Tsunami-Wellen voraus!",
                    product_rule: "🌊 SZENARIO: Surfbrett auf einer Welle — Ein Surfer reitet auf einer Welle, die durch h(x) = x·sin(x) beschrieben wird. Die Wellenhöhe hängt sowohl von der Position (x) als auch vom Sinuswellenmuster ab. Um das Gleichgewicht zu halten, muss der Surfer die Steigung der Welle an jedem Punkt kennen. Verwende die Produktregel: Wenn f(x) = u(x)·v(x), dann f'(x) = u'·v + u·v'. Dies sagt dir, wie schnell die Welle steigt oder fällt und hilft dem Surfer, seine Haltung anzupassen.",
                    quotient_rule: "📊 SZENARIO: Börsen-Effizienzquote — Ein Finanzanalyst verfolgt die Effizienzquote eines Unternehmens: Gewinn(x) / Kosten(x). Wenn sich die Marktbedingungen ändern (x = Zeit in Monaten), ändern sich sowohl Gewinn als auch Kosten. Um vorherzusagen, ob die Effizienz steigt oder sinkt, benötigst du die Ableitung dieses Verhältnisses. Verwende die Quotientenregel: Wenn f(x) = u(x)/v(x), dann f'(x) = [u'·v - u·v'] / v². Dies zeigt Investoren, ob das Unternehmen im Laufe der Zeit effizienter oder weniger effizient wird.",
                    chain_rule: "⚙️ SZENARIO: Fahrrad-Getriebesystem — Du fährst mit dem Fahrrad einen Berg hinauf. Die Pedaldrehung erzeugt eine Kettenbewegung: Pedalwinkel → Kettengeschwindigkeit → Radumdrehung. Wenn sich die Kette doppelt so schnell um das Zahnrad wickelt (Faktor 2), dann f(x) = sin(2x). Die Kettenregel sagt dir: Wenn sich die äußere Funktion ändert, multipliziere mit der Rate der inneren Funktion. So berechnen Fahrradcomputer deine tatsächliche Geschwindigkeit aus den Pedalumdrehungen!"
                },
                canvas: {
                    title: "ABLEITUNGS-STRASSE",
                    subtitle_power: "f(x) = x²",
                    subtitle_factor: "f(x) = ax²",
                    subtitle_sum: "f(x) = x² + x",
                    subtitle_product: "f(x) = x·sin(x)",
                    subtitle_quotient: "f(x) = x/sin(x)",
                    subtitle_chain: "f(x) = sin(2x)",
                    x_label: "x",
                    y_label: "f(x)",
                    slope_label: "STRASSENSTEIGUNG",
                    your_slope: "Deine Steigung",
                    correct_slope: "Korrekte Steigung",
                    status_chamber: "KAMMER",
                    status_sim: "ABLEITUNGS_SIM: AKTIV",
                    status_mode: "MODUS"
                },
                integral_preview_title: "KOMMT BALD: INTEGRALRECHNUNG",
                integral_preview_desc: "Meistere die Umkehrung der Ableitung. Berechne Flächen unter Kurven.",
                integral_preview_hint: "Freischalten nach Ableitungs-Meisterschaft →"
            },
        gm1_01_advanced: {
                back: "Zurück zum Nexus",
                title: "GM1.01-ADV // FORTGESCHRITTENE ANALYSIS",
                monitor_title: "GM1.01_FORTGESCHRITTEN_MONITOR",
                footer_left: "GM1.01_FORTGESCHRITTEN // KNOTEN: BASEL",
                check: "Prüfen",
                next: "Nächste Herausforderung",
                correct: "Verifiziert",
                incorrect: "Abweichung",
                ready: "Bereit",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                mission: {
                    title: "FORTGESCHRITTENE ABLEITUNGS-HERAUSFORDERUNGEN",
                    description: "Meistere komplexe Ableitungen durch Kombination mehrerer Regeln. Wende Analysis auf reale Probleme an."
                },
                challenges: {
                    composite: "ZUSAMMENGESETZT",
                    modeling: "MODELLIERUNG",
                    optimization: "OPTIMIERUNG",
                    analysis: "ANALYSE"
                },
                scenarios: {
                    composite_1: "🎢 SZENARIO: Achterbahn-Design — Ein Ingenieur entwirft einen Achterbahn-Abschnitt, bei dem die Höhe h(t) = (2t² + 3t)·sin(t) folgt. Die Geschwindigkeit ist die Ableitung h'(t). Berechne bei t=2 Sekunden die Geschwindigkeit, um die Sicherheit der Passagiere zu gewährleisten. Dies erfordert sowohl die Produktregel ALS AUCH die Potenzregel!",
                    composite_2: "📡 SZENARIO: Signalverarbeitung — Die Amplitude eines Funksignals ist A(t) = (t² + 1)/sin(t). Die Änderungsrate der Amplitude ist A'(t). Berechne bei t=1 Sekunde diese Rate, um den Empfänger anzupassen. Dies erfordert die Quotientenregel kombiniert mit der Potenzregel!",
                    composite_3: "🌊 SZENARIO: Welleninterferenz — Zwei Meereswellen überlagern sich: h(x) = (x³ - 2x)·cos(x). Bei x=1 finde die Änderungsrate der Höhe h'(1), um das Wellenverhalten vorherzusagen. Verwende die Produktregel mit trigonometrischen Funktionen!",
                    modeling_1: "🚗 SZENARIO: Auto-Beschleunigung — Ein Tesla beschleunigt aus dem Stand. Seine Position ist s(t) = 2t³ - 3t² + 5t Meter. Finde die Geschwindigkeit v(t) = s'(t) bei t=3 Sekunden, um zu prüfen, ob sie innerhalb der Geschwindigkeitsbegrenzung liegt.",
                    modeling_2: "🎈 SZENARIO: Ballon-Start — Ein Wetterballon steigt mit der Höhe h(t) = -5t² + 20t + 2 Meter. Bei t=2 Sekunden berechne die Geschwindigkeit v(t) = h'(t), um eine sichere Aufstiegsrate zu gewährleisten.",
                    optimization_1: "📦 SZENARIO: Karton-Design — Ein Unternehmen stellt Kartons aus rechteckiger Pappe her. Die Fläche ist A(x) = x(10-x). Finde den Wert von x, der die Fläche maximiert, um die Materialnutzung zu optimieren.",
                    optimization_2: "💰 SZENARIO: Gewinnmaximierung — Der Tagesgewinn einer Basler Bäckerei ist P(x) = -2x² + 12x - 10 (in Hundert CHF), wobei x die Produktionsstunden sind. Finde x, das den Gewinn maximiert.",
                    analysis_1: "📊 SZENARIO: Marktanalyse — Ein Aktienkurs folgt f(x) = x³ - 3x² + 2. Finde alle kritischen Punkte (wo f'(x) = 0), um potenzielle Kauf-/Verkaufsmomente zu identifizieren.",
                    analysis_2: "🚀 SZENARIO: Raketen-Flugbahn — Die Höhe einer Rakete ist f(x) = 2x³ - 6x + 1. Bei x=1 finde die zweite Ableitung f''(1), um zu bestimmen, ob die Rakete beschleunigt oder abbremst."
                },
                questions: {
                    find_derivative: "Berechne die Ableitung am gegebenen Punkt",
                    find_velocity: "Berechne Geschwindigkeit v(t) = s'(t)",
                    find_acceleration: "Berechne Beschleunigung a(t) = v'(t)",
                    find_maximum: "Finde den Wert, der die Funktion maximiert",
                    find_critical_point: "Finde den kritischen Punkt (wo Ableitung = 0)",
                    find_critical_points: "Finde alle kritischen Punkte (wo f'(x) = 0)"
                },
                hints: {
                    use_product_rule: "Verwende Produktregel: (uv)' = u'v + uv'. Finde zuerst u' und v' separat.",
                    use_quotient_rule: "Verwende Quotientenregel: (u/v)' = (u'v - uv')/v². Denke daran, den Nenner zu quadrieren!",
                    use_chain_rule: "Verwende Kettenregel: (f(g(x)))' = f'(g(x))·g'(x). Arbeite von außen nach innen.",
                    take_first_derivative: "Bilde die erste Ableitung: Wenn s(t) die Position ist, dann ist v(t) = s'(t) die Geschwindigkeit.",
                    take_second_derivative: "Finde zuerst f'(x), dann leite erneut ab, um f''(x) zu erhalten.",
                    set_derivative_zero: "Setze f'(x) = 0 und löse nach x auf. Dies ergibt kritische Punkte, wo die Funktion Max/Min haben kann."
                },
                function_label: "FUNKTION",
                question_label: "HERAUSFORDERUNG",
                hint_label: "STRATEGIE",
                visualization_title: "FUNKTIONSGRAPH",
                visualization: {
                    title: "FUNKTIONSVISUALISIERUNG",
                    x_label: "x",
                    y_label: "f(x)",
                    function_label: "FUNKTION",
                    point_label: "PUNKT"
                },
                progress: "Fortschritt"
            },
        gm2_01: {
                back: "Zurück zum Nexus",
                title: "GM2.01 // VEKTOR-PILOT 3D",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Vektor-HUD",
                next: "Nächste Sequenz ausführen",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Abweichung",
                ready: "Bereit",
                monitor_title: "GM2.01_VEKTOR_MONITOR",
                footer_left: "GM2.01_VEKTOR_PILOT // KNOTEN: BASEL",
                stages: {
                    navigation: "NAVIGATION",
                    dot: "SKALARPRODUKT",
                    mission: "MISSION",
                    navigation_prompt_latex: "\\text{Bestimme }\\vec v\\text{ von A nach B und seinen Betrag.}",
                    dot_prompt_latex: "\\text{Bestimme }\\vec v\\text{ und }\\vec v\\cdot\\vec w.",
                    mission_prompt_latex: "\\text{Mission: berechne }\\vec v,\\;\\vec v\\cdot\\vec s,\\;|\\vec v|."
                },
                labels: {
                    input: "EINGABE"
                },
                mission: {
                    title: "MISSION: RHEIN-LUFTKORRIDOR",
                    description: "Navigiere den Drohnenkorridor über dem Rhein. Gib den 3D-Vektor ein und prüfe die Ausrichtung mit dem Skalarprodukt."
                },
                scenarios: {
                    navigation: "Basler Drohnen-Liefernetzwerk: Sie programmieren das Navigationssystem für Basels autonome Medikamenten-Lieferdrohnen. Die Drohnen müssen präzise 3D-Vektoren zwischen Krankenhausdächern und Lieferpunkten in der Stadt berechnen. Gegeben sind Koordinaten A (Abflug-Helipad am Universitätsspital Basel) und B (Ankunftspunkt am Claraspital), berechnen Sie den Verschiebungsvektor v und seinen Betrag. Der Betrag stellt die direkte Flugdistanz in Metern dar. Genaue Vektorberechnung ist kritisch für Batteriemanagement und Flugzeitschätzung.",
                    dot: "Solarplatten-Optimierung am Roche-Turm: Der Roche-Turm in Basel installiert verstellbare Solarpaneele an seiner Fassade. Die Ausrichtung jedes Paneels wird durch einen Normalenvektor v dargestellt, und die Sonnenrichtung mittags ist Vektor w. Das Skalarprodukt v·w bestimmt, wie viel Sonnenlicht das Paneel empfängt - maximal bei Parallelität (Skalarprodukt = |v||w|), null bei Orthogonalität. Berechnen Sie das Skalarprodukt, um den optimalen Paneel-Winkel zu bestimmen. Ingenieure nutzen dies zur Maximierung der Energieausbeute über den Tag.",
                    mission: "Rhein-Navigationssystem: Die Basler Hafenbehörde entwickelt ein automatisiertes Lastkahn-Navigationssystem für den Rhein. Ein Frachtlastkahn muss von Punkt A (aktuelle Position) zu Punkt B (Zieldock) fahren. Die Flussströmung wird durch Vektor s dargestellt. Berechnen Sie: (1) Verschiebungsvektor v von A nach B, (2) Skalarprodukt v·s um zu bestimmen, ob die Strömung hilft oder hindert (positiv = hilft, negativ = hindert, null = orthogonal), und (3) Betrag |v| für die direkte Distanz. Diese Daten optimieren Kraftstoffverbrauch und Ankunftszeitprognosen."
                }
            },
        gm3_01: {
                back: "Zurück zum Nexus",
                title: "GM3.01 // WAHRSCHEINLICHKEITS-TRESOR",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Wahrscheinlichkeitsmatrix",
                next: "Nächste Sequenz",
                check: "Überprüfen",
                correct: "Verifiziert",
                incorrect: "Fehlermeldung",
                ready: "Bereit",
                monitor_title: "GM3.01_WAHRSCHEINLICHKEITSMONITOR",
                footer_left: "GM3.01_WAHRSCHEINLICHKEITS-TRESOR // KNOTEN: BASEL",
                stages: {
                    basic_prob: "GRUNDWAHRSCHEINLICHKEIT",
                    binomial: "BINOMIAL",
                    conditional: "BEDINGT",
                    mission: "MISSION",
                    basic_prob_prompt_latex: "\\text{Berechne die Wahrscheinlichkeit }P(E)\\text{.}",
                    binomial_prompt_latex: "\\text{Berechne }P(X=k)\\text{ für Binomialverteilung.}",
                    conditional_prompt_latex: "\\text{Berechne die bedingte Wahrscheinlichkeit }P(A|B)\\text{.}",
                    mission_prompt_latex: "\\text{Mission: Berechne die Wahrscheinlichkeit }P\\text{.}"
                },
                labels: {
                    input: "EINGABE",
                    hints: "HINWEISE"
                },
                mission: {
                    title: "MISSION: BASLER WAHRSCHEINLICHKEITSLABOR",
                    description: "Wende Wahrscheinlichkeitstheorie auf reale Szenarien in Basel an. Berechne Wahrscheinlichkeiten für Qualitätskontrolle, Versicherung und Lotteriesysteme."
                },
                scenarios: {
                    basic_prob: "Qualitätskontrolle bei Novartis Basel: Sie arbeiten in der Qualitätskontrollabteilung der Novartis-Pharmaproduktion in Basel. Jede Charge von Medikamenten wird einer Stichprobenprüfung unterzogen. Gegeben ist, dass eine Stichprobe eine bestimmte Anzahl günstiger Ergebnisse (bestandene Qualitätstests) von der Gesamtzahl der Proben enthält, berechnen Sie die Wahrscheinlichkeit P(E), dass ein zufällig ausgewähltes Element die Inspektion besteht. Diese Wahrscheinlichkeit bestimmt, ob die gesamte Charge für die Verteilung an Schweizer Krankenhäuser freigegeben wird.",
                    binomial: "Schweizer Lotteriesystem-Analyse: Das Swiss Lotto wird von der Basler Zentrale aus betrieben. Bei jeder Ziehung wählen Spieler Zahlen mit einer festen Wahrscheinlichkeit p für eine Übereinstimmung. Für n unabhängige Versuche (Lottoziehungen) berechnen Sie die Wahrscheinlichkeit P(X=k) für genau k Erfolge mit der Binomialverteilungsformel: P(X=k) = C(n,k) × p^k × (1-p)^(n-k). Dies hilft Lotteriebeamten, Auszahlungshäufigkeiten vorherzusagen und Preisstrukturen für Schweizer Spieler festzulegen.",
                    conditional: "Basler Versicherungs-Risikobewertung: Basler Versicherungen müssen bedingte Wahrscheinlichkeiten für die Risikobewertung berechnen. Gegeben P(A) = Wahrscheinlichkeit eines Ereignisses, P(B) = Wahrscheinlichkeit einer erfüllten Bedingung und P(A∩B) = Wahrscheinlichkeit beider Ereignisse, berechnen Sie P(A|B) = P(A∩B)/P(B). Diese bedingte Wahrscheinlichkeit hilft, Versicherungsprämien für Basler Einwohner basierend auf spezifischen Risikofaktoren zu bestimmen.",
                    mission: "Basler Integrierte Wahrscheinlichkeitsmission: Sie beraten mehrere Basler Unternehmen - Novartis (Pharma), Swiss Lotto (Lotterie) und Basler Versicherungen (Versicherung). Jedes Unternehmen präsentiert ein anderes Wahrscheinlichkeitsproblem: Grundwahrscheinlichkeit für Qualitätskontrolle, Binomialverteilung für Lotterieanalyse oder bedingte Wahrscheinlichkeit für Versicherungsrisiko. Wenden Sie die entsprechende Wahrscheinlichkeitsformel an, um die spezifische Herausforderung jedes Unternehmens zu lösen und genaue Wahrscheinlichkeitsberechnungen bereitzustellen."
                },
                problems: {
                    single_die_one: "Sie würfeln einen Standard-Sechsseiter einmal. Wie hoch ist die Wahrscheinlichkeit, eine 1 zu würfeln?\n\nGegeben: 1 günstiges Ergebnis, 6 Gesamtergebnisse\nFinden: P(E)",
                    single_die_even: "Sie würfeln einmal. Wie hoch ist die Wahrscheinlichkeit, eine gerade Zahl zu würfeln?\n\nGegeben: 3 günstige Ergebnisse (2,4,6), 6 Gesamtergebnisse\nFinden: P(E)",
                    single_die_half: "Sie würfeln einmal. Wie hoch ist die Wahrscheinlichkeit, eine Zahl größer als 3 zu würfeln?\n\nGegeben: 3 günstige Ergebnisse, 6 Gesamtergebnisse\nFinden: P(E)",
                    coin_heads: "Sie werfen eine Münze einmal. Wie hoch ist die Wahrscheinlichkeit für Kopf?\n\nGegeben: 1 günstiges Ergebnis, 2 Gesamtergebnisse\nFinden: P(E)",
                    deck_one_suit: "Sie ziehen eine Karte aus 52 Karten. Wie hoch ist die Wahrscheinlichkeit, ein Herz zu ziehen?\n\nGegeben: 13 Herz-Karten, 52 Gesamtkarten\nFinden: P(E)",
                    deck_red_cards: "Sie ziehen eine Karte aus 52 Karten. Wie hoch ist die Wahrscheinlichkeit, eine rote Karte zu ziehen?\n\nGegeben: 26 rote Karten, 52 Gesamtkarten\nFinden: P(E)",
                    deck_aces: "Sie ziehen eine Karte aus 52 Karten. Wie hoch ist die Wahrscheinlichkeit, ein Ass zu ziehen?\n\nGegeben: 4 Asse, 52 Gesamtkarten\nFinden: P(E)",
                    deck_face_cards: "Sie ziehen eine Karte aus 52 Karten. Wie hoch ist die Wahrscheinlichkeit, eine Bildkarte zu ziehen?\n\nGegeben: 12 Bildkarten, 52 Gesamtkarten\nFinden: P(E)",
                    two_dice_sum_7: "Sie würfeln zwei Würfel. Wie hoch ist die Wahrscheinlichkeit, dass die Summe 7 ist?\n\nGegeben: 6 günstige Ergebnisse, 36 Gesamtergebnisse\nFinden: P(E)",
                    quality_control_85: "Novartis Qualitätskontrolle: 85 von 100 Proben bestanden den Test. Wie hoch ist die Wahrscheinlichkeit?\n\nGegeben: 85 bestanden, 100 Gesamtproben\nFinden: P(E)",
                    quality_control_92: "Novartis Qualitätskontrolle: 92 von 120 Proben bestanden.\n\nGegeben: 92 bestanden, 120 Gesamtproben\nFinden: P(E)",
                    quality_control_78: "Novartis Qualitätskontrolle: 78 von 90 Proben bestanden.\n\nGegeben: 78 bestanden, 90 Gesamtproben\nFinden: P(E)",
                    quality_control_156: "Novartis Qualitätskontrolle: 156 von 200 Proben bestanden.\n\nGegeben: 156 bestanden, 200 Gesamtproben\nFinden: P(E)",
                    quality_control_234: "Novartis Qualitätskontrolle: 234 von 300 Proben bestanden.\n\nGegeben: 234 bestanden, 300 Gesamtproben\nFinden: P(E)",
                    quality_control_427: "Novartis Großkontrolle: 427 von 500 Proben bestanden alle Tests.\n\nGegeben: 427 bestanden, 500 Gesamtproben\nFinden: P(E)",
                    quality_control_683: "Novartis Großkontrolle: 683 von 800 Proben bestanden.\n\nGegeben: 683 bestanden, 800 Gesamtproben\nFinden: P(E)",
                    quality_control_891: "Novartis Großkontrolle: 891 von 1000 Proben bestanden.\n\nGegeben: 891 bestanden, 1000 Gesamtproben\nFinden: P(E)",
                    quality_control_1456: "Novartis Großkontrolle: 1456 von 1600 Proben bestanden.\n\nGegeben: 1456 bestanden, 1600 Gesamtproben\nFinden: P(E)",
                    quality_control_1789: "Novartis Großkontrolle: 1789 von 2000 Proben bestanden.\n\nGegeben: 1789 bestanden, 2000 Gesamtproben\nFinden: P(E)",
                    coin_3_2: "Sie werfen 3 Münzen. Wie hoch ist die Wahrscheinlichkeit für genau 2 Köpfe?\n\nGegeben: n=3, k=2, p=0.5\nFinden: P(X=2)",
                    coin_4_3: "Sie werfen 4 Münzen. Wie hoch ist die Wahrscheinlichkeit für genau 3 Köpfe?\n\nGegeben: n=4, k=3, p=0.5\nFinden: P(X=3)",
                    coin_5_2: "Sie werfen 5 Münzen. Wie hoch ist die Wahrscheinlichkeit für genau 2 Köpfe?\n\nGegeben: n=5, k=2, p=0.5\nFinden: P(X=2)",
                    coin_3_1: "Sie werfen 3 Münzen. Wie hoch ist die Wahrscheinlichkeit für genau 1 Kopf?\n\nGegeben: n=3, k=1, p=0.5\nFinden: P(X=1)",
                    lottery_6_4: "Swiss Lotto: 6 Ziehungen, 50% Gewinnchance, genau 4 Gewinne?\n\nGegeben: n=6, k=4, p=0.5\nFinden: P(X=4)",
                    lottery_8_5: "Swiss Lotto: 8 Ziehungen, genau 5 Gewinne?\n\nGegeben: n=8, k=5, p=0.5\nFinden: P(X=5)",
                    lottery_5_3_biased: "Swiss Lotto: 5 Ziehungen, 60% Gewinnchance, genau 3 Gewinne?\n\nGegeben: n=5, k=3, p=0.6\nFinden: P(X=3)",
                    lottery_7_4: "Swiss Lotto: 7 Ziehungen, genau 4 Gewinne?\n\nGegeben: n=7, k=4, p=0.5\nFinden: P(X=4)",
                    lottery_6_2_biased: "Swiss Lotto: 6 Ziehungen, 40% Gewinnchance, genau 2 Gewinne?\n\nGegeben: n=6, k=2, p=0.4\nFinden: P(X=2)",
                    lottery_10_6: "Swiss Lotto: 10 Ziehungen, genau 6 Gewinne?\n\nGegeben: n=10, k=6, p=0.5\nFinden: P(X=6)",
                    lottery_12_7: "Swiss Lotto: 12 Ziehungen, genau 7 Gewinne?\n\nGegeben: n=12, k=7, p=0.5\nFinden: P(X=7)",
                    lottery_8_5_biased: "Swiss Lotto: 8 Ziehungen, 60% Gewinnchance, genau 5 Gewinne?\n\nGegeben: n=8, k=5, p=0.6\nFinden: P(X=5)",
                    lottery_9_4_biased: "Swiss Lotto: 9 Ziehungen, 40% Gewinnchance, genau 4 Gewinne?\n\nGegeben: n=9, k=4, p=0.4\nFinden: P(X=4)",
                    lottery_11_7_biased: "Swiss Lotto: 11 Ziehungen, 55% Gewinnchance, genau 7 Gewinne?\n\nGegeben: n=11, k=7, p=0.55\nFinden: P(X=7)",
                    lottery_15_9: "Swiss Lotto Fortgeschritten: 15 Ziehungen, 55% Gewinnchance, genau 9 Gewinne?\n\nGegeben: n=15, k=9, p=0.55\nFinden: P(X=9)",
                    lottery_18_11: "Swiss Lotto: 18 Ziehungen, 60% Gewinnchance, genau 11 Gewinne?\n\nGegeben: n=18, k=11, p=0.6\nFinden: P(X=11)",
                    lottery_20_12: "Swiss Lotto: 20 Ziehungen, 58% Gewinnchance, genau 12 Gewinne?\n\nGegeben: n=20, k=12, p=0.58\nFinden: P(X=12)",
                    lottery_16_8: "Swiss Lotto: 16 Ziehungen, 45% Gewinnchance, genau 8 Gewinne?\n\nGegeben: n=16, k=8, p=0.45\nFinden: P(X=8)",
                    lottery_14_9: "Swiss Lotto: 14 Ziehungen, 65% Gewinnchance, genau 9 Gewinne?\n\nGegeben: n=14, k=9, p=0.65\nFinden: P(X=9)",
                    insurance_basic_1: "Basler Versicherung: Gegeben P(A)=0.5, P(B)=0.6, P(A∩B)=0.3, finden Sie P(A|B).\n\nGegeben: P(A)=0.5, P(B)=0.6, P(A∩B)=0.3\nFinden: P(A|B)",
                    insurance_basic_2: "Basler Versicherung: Gegeben P(A)=0.4, P(B)=0.5, P(A∩B)=0.2, finden Sie P(A|B).\n\nGegeben: P(A)=0.4, P(B)=0.5, P(A∩B)=0.2\nFinden: P(A|B)",
                    insurance_basic_3: "Basler Versicherung: Gegeben P(A)=0.6, P(B)=0.7, P(A∩B)=0.4, finden Sie P(A|B).\n\nGegeben: P(A)=0.6, P(B)=0.7, P(A∩B)=0.4\nFinden: P(A|B)",
                    insurance_basic_4: "Basler Versicherung: Gegeben P(A)=0.3, P(B)=0.4, P(A∩B)=0.15, finden Sie P(A|B).\n\nGegeben: P(A)=0.3, P(B)=0.4, P(A∩B)=0.15\nFinden: P(A|B)",
                    insurance_core_1: "Basler Versicherung Risikobewertung: Gegeben P(A)=0.45, P(B)=0.55, P(A∩B)=0.25, finden Sie P(A|B).\n\nGegeben: P(A)=0.45, P(B)=0.55, P(A∩B)=0.25\nFinden: P(A|B)",
                    insurance_core_2: "Basler Versicherung: Gegeben P(A)=0.35, P(B)=0.65, P(A∩B)=0.22, finden Sie P(A|B).\n\nGegeben: P(A)=0.35, P(B)=0.65, P(A∩B)=0.22\nFinden: P(A|B)",
                    insurance_core_3: "Basler Versicherung: Gegeben P(A)=0.52, P(B)=0.48, P(A∩B)=0.28, finden Sie P(A|B).\n\nGegeben: P(A)=0.52, P(B)=0.48, P(A∩B)=0.28\nFinden: P(A|B)",
                    insurance_core_4: "Basler Versicherung: Gegeben P(A)=0.38, P(B)=0.62, P(A∩B)=0.24, finden Sie P(A|B).\n\nGegeben: P(A)=0.38, P(B)=0.62, P(A∩B)=0.24\nFinden: P(A|B)",
                    insurance_core_5: "Basler Versicherung: Gegeben P(A)=0.42, P(B)=0.58, P(A∩B)=0.26, finden Sie P(A|B).\n\nGegeben: P(A)=0.42, P(B)=0.58, P(A∩B)=0.26\nFinden: P(A|B)",
                    insurance_adv_1: "Basler Versicherung Fortgeschritten: Gegeben P(A)=0.37, P(B)=0.63, P(A∩B)=0.21, finden Sie P(A|B).\n\nGegeben: P(A)=0.37, P(B)=0.63, P(A∩B)=0.21\nFinden: P(A|B)",
                    insurance_adv_2: "Basler Versicherung: Gegeben P(A)=0.48, P(B)=0.54, P(A∩B)=0.29, finden Sie P(A|B).\n\nGegeben: P(A)=0.48, P(B)=0.54, P(A∩B)=0.29\nFinden: P(A|B)",
                    insurance_adv_3: "Basler Versicherung: Gegeben P(A)=0.41, P(B)=0.67, P(A∩B)=0.27, finden Sie P(A|B).\n\nGegeben: P(A)=0.41, P(B)=0.67, P(A∩B)=0.27\nFinden: P(A|B)",
                    insurance_adv_4: "Basler Versicherung: Gegeben P(A)=0.33, P(B)=0.59, P(A∩B)=0.19, finden Sie P(A|B).\n\nGegeben: P(A)=0.33, P(B)=0.59, P(A∩B)=0.19\nFinden: P(A|B)",
                    insurance_adv_5: "Basler Versicherung: Gegeben P(A)=0.46, P(B)=0.51, P(A∩B)=0.23, finden Sie P(A|B).\n\nGegeben: P(A)=0.46, P(B)=0.51, P(A∩B)=0.23\nFinden: P(A|B)",
                    insurance_elite_1: "Basler Versicherung Elite: Gegeben P(A)=0.365, P(B)=0.625, P(A∩B)=0.215, finden Sie P(A|B).\n\nGegeben: P(A)=0.365, P(B)=0.625, P(A∩B)=0.215\nFinden: P(A|B)",
                    insurance_elite_2: "Basler Versicherung Elite: Gegeben P(A)=0.475, P(B)=0.535, P(A∩B)=0.285, finden Sie P(A|B).\n\nGegeben: P(A)=0.475, P(B)=0.535, P(A∩B)=0.285\nFinden: P(A|B)",
                    insurance_elite_3: "Basler Versicherung Elite: Gegeben P(A)=0.415, P(B)=0.675, P(A∩B)=0.265, finden Sie P(A|B).\n\nGegeben: P(A)=0.415, P(B)=0.675, P(A∩B)=0.265\nFinden: P(A|B)",
                    insurance_elite_4: "Basler Versicherung Elite: Gegeben P(A)=0.335, P(B)=0.595, P(A∩B)=0.195, finden Sie P(A|B).\n\nGegeben: P(A)=0.335, P(B)=0.595, P(A∩B)=0.195\nFinden: P(A|B)",
                    insurance_elite_5: "Basler Versicherung Elite: Gegeben P(A)=0.455, P(B)=0.515, P(A∩B)=0.235, finden Sie P(A|B).\n\nGegeben: P(A)=0.455, P(B)=0.515, P(A∩B)=0.235\nFinden: P(A|B)",
                    mission_basic_1: "Novartis Mission: Würfeln Sie, Wahrscheinlichkeit für 1?\n\nGegeben: 1 günstig, 6 gesamt\nFinden: P(E)",
                    mission_basic_2: "Swiss Lotto Mission: 3 Münzwürfe, genau 2 Köpfe?\n\nGegeben: n=3, k=2, p=0.5\nFinden: P(X=2)",
                    mission_basic_3: "Versicherung Mission: Gegeben P(A)=0.5, P(B)=0.6, P(A∩B)=0.3, finden Sie P(A|B).\n\nGegeben: P(A)=0.5, P(B)=0.6, P(A∩B)=0.3\nFinden: P(A|B)",
                    mission_basic_4: "Novartis Mission: Würfeln Sie, Wahrscheinlichkeit für gerade Zahl?\n\nGegeben: 3 günstig, 6 gesamt\nFinden: P(E)",
                    mission_core_1: "Novartis Mission: Ziehen Sie aus 52 Karten, Wahrscheinlichkeit für Herz?\n\nGegeben: 13 günstig, 52 gesamt\nFinden: P(E)",
                    mission_core_2: "Swiss Lotto Mission: 6 Ziehungen, 50% Gewinnchance, P(X=4)?\n\nGegeben: n=6, k=4, p=0.5\nFinden: P(X=4)",
                    mission_core_3: "Versicherung Mission: Gegeben P(A)=0.45, P(B)=0.55, P(A∩B)=0.25, finden Sie P(A|B).\n\nGegeben: P(A)=0.45, P(B)=0.55, P(A∩B)=0.25\nFinden: P(A|B)",
                    mission_core_4: "Novartis Mission: Ziehen Sie eine Karte, Wahrscheinlichkeit für rot?\n\nGegeben: 26 günstig, 52 gesamt\nFinden: P(E)",
                    mission_core_5: "Swiss Lotto Mission: 5 Ziehungen, 60% Gewinnchance, P(X=3)?\n\nGegeben: n=5, k=3, p=0.6\nFinden: P(X=3)",

                    // BINOMIAL - BASIC: Grundkonzept verstehen
                    coin_4_2: "Sie werfen eine faire Münze 4 Mal. Wie hoch ist die Wahrscheinlichkeit, genau 2 Mal Kopf zu erhalten?\n\nGegeben: n=4 Versuche, k=2 Erfolge, p=0.5\nGesucht: P(X=2) = C(4,2) × 0.5² × 0.5²\nKonzept: Grundlegende Binomialverteilung",
                    coin_3_all: "Sie werfen eine faire Münze 3 Mal. Wie hoch ist die Wahrscheinlichkeit, nur Kopf zu erhalten?\n\nGegeben: n=3 Versuche, k=3 Erfolge, p=0.5\nGesucht: P(X=3) = C(3,3) × 0.5³ × 0.5⁰\nKonzept: Verstehen dass C(n,n) = 1",
                    coin_4_none: "Sie werfen eine faire Münze 4 Mal. Wie hoch ist die Wahrscheinlichkeit, keinen Kopf zu erhalten (nur Zahl)?\n\nGegeben: n=4 Versuche, k=0 Erfolge, p=0.5\nGesucht: P(X=0) = C(4,0) × 0.5⁰ × 0.5⁴\nKonzept: Verstehen dass C(n,0) = 1",

                    // BINOMIAL - CORE: C(n,k) Bedeutung verstehen
                    lottery_5_3: "Schweizer Lotto: Sie spielen 5 Ziehungen mit 50% Gewinnwahrscheinlichkeit pro Ziehung. Wie hoch ist die Wahrscheinlichkeit, genau 3 Mal zu gewinnen?\n\nGegeben: n=5, k=3, p=0.5\nGesucht: P(X=3) = C(5,3) × 0.5³ × 0.5²\nKonzept: C(5,3) = 10 repräsentiert die 10 verschiedenen Möglichkeiten, welche 3 Ziehungen Sie gewinnen",
                    lottery_6_3: "Schweizer Lotto: Sie spielen 6 Ziehungen mit 50% Gewinnwahrscheinlichkeit. Wie hoch ist die Wahrscheinlichkeit, genau 3 Mal zu gewinnen?\n\nGegeben: n=6, k=3, p=0.5\nGesucht: P(X=3), wobei C(6,3) = 20\nKonzept: Verstehen warum wir mit C(n,k) multiplizieren",
                    lottery_5_2: "Schweizer Lotto: Sie spielen 5 Ziehungen mit 50% Gewinnwahrscheinlichkeit. Wie hoch ist die Wahrscheinlichkeit, genau 2 Mal zu gewinnen?\n\nGegeben: n=5, k=2, p=0.5\nGesucht: P(X=2), wobei C(5,2) = 10\nKonzept: Binomialkoeffizient repräsentiert Anordnungen",
                    lottery_7_3: "Schweizer Lotto: Sie spielen 7 Ziehungen mit 50% Gewinnwahrscheinlichkeit. Wie hoch ist die Wahrscheinlichkeit, genau 3 Mal zu gewinnen?\n\nGegeben: n=7, k=3, p=0.5\nGesucht: P(X=3), wobei C(7,3) = 35\nKonzept: Größeres n bedeutet mehr Anordnungen",

                    // BINOMIAL - ADVANCED: Asymmetrische Wahrscheinlichkeit (p ≠ 0.5)
                    lottery_6_2_low: "Schweizer Lotto: Sie spielen 6 Ziehungen mit nur 30% Gewinnwahrscheinlichkeit pro Ziehung. Wie hoch ist die Wahrscheinlichkeit, genau 2 Mal zu gewinnen?\n\nGegeben: n=6, k=2, p=0.3 (niedrige Wahrscheinlichkeit)\nGesucht: P(X=2) = C(6,2) × 0.3² × 0.7⁴\nKonzept: Niedriges p bedeutet linksschief verteilte Verteilung",
                    lottery_8_6_high: "Schweizer Lotto: Sie spielen 8 Ziehungen mit 70% Gewinnwahrscheinlichkeit pro Ziehung. Wie hoch ist die Wahrscheinlichkeit, genau 6 Mal zu gewinnen?\n\nGegeben: n=8, k=6, p=0.7 (hohe Wahrscheinlichkeit)\nGesucht: P(X=6) = C(8,6) × 0.7⁶ × 0.3²\nKonzept: Hohes p bedeutet rechtsschief verteilte Verteilung",
                    lottery_7_4_biased: "Schweizer Lotto: Sie spielen 7 Ziehungen mit 60% Gewinnwahrscheinlichkeit. Wie hoch ist die Wahrscheinlichkeit, genau 4 Mal zu gewinnen?\n\nGegeben: n=7, k=4, p=0.6\nGesucht: P(X=4)\nKonzept: Asymmetrische Verteilungen verstehen",
                    lottery_10_7_biased: "Schweizer Lotto: Sie spielen 10 Ziehungen mit 65% Gewinnwahrscheinlichkeit. Wie hoch ist die Wahrscheinlichkeit, genau 7 Mal zu gewinnen?\n\nGegeben: n=10, k=7, p=0.65\nGesucht: P(X=7)\nKonzept: Berechnung mit nicht-standardisierten Wahrscheinlichkeiten",

                    // BINOMIAL - ELITE: Kumulative Wahrscheinlichkeit
                    at_least_3_of_5: "Schweizer Lotto: Sie spielen 5 Ziehungen mit 60% Gewinnwahrscheinlichkeit. Wie hoch ist die Wahrscheinlichkeit, mindestens 3 Mal zu gewinnen?\n\nGegeben: n=5, k≥3, p=0.6\nGesucht: P(X≥3) = P(X=3) + P(X=4) + P(X=5)\nKonzept: Kumulative Wahrscheinlichkeit - mehrere Ergebnisse addieren",
                    at_most_4_of_6: "Schweizer Lotto: Sie spielen 6 Ziehungen mit 50% Gewinnwahrscheinlichkeit. Wie hoch ist die Wahrscheinlichkeit, höchstens 4 Mal zu gewinnen?\n\nGegeben: n=6, k≤4, p=0.5\nGesucht: P(X≤4) = P(X=0) + P(X=1) + P(X=2) + P(X=3) + P(X=4)\nKonzept: Oder verwenden Sie 1 - P(X>4) = 1 - P(X=5) - P(X=6)",
                    more_than_half: "Schweizer Lotto: Sie spielen 8 Ziehungen mit 60% Gewinnwahrscheinlichkeit. Wie hoch ist die Wahrscheinlichkeit, mehr als die Hälfte der Zeit zu gewinnen?\n\nGegeben: n=8, k>4, p=0.6\nGesucht: P(X>4) = P(X=5) + P(X=6) + P(X=7) + P(X=8)\nKonzept: Verstehen dass 'mehr als die Hälfte' k≥5 bedeutet",
                    at_least_7_of_10: "Schweizer Lotto: Sie spielen 10 Ziehungen mit 70% Gewinnwahrscheinlichkeit. Wie hoch ist die Wahrscheinlichkeit, mindestens 7 Mal zu gewinnen?\n\nGegeben: n=10, k≥7, p=0.7\nGesucht: P(X≥7) = P(X=7) + P(X=8) + P(X=9) + P(X=10)\nKonzept: Kumulative Wahrscheinlichkeit mit hohem p",
                    at_least_8_of_12: "Schweizer Lotto: Sie spielen 12 Ziehungen mit 60% Gewinnwahrscheinlichkeit. Wie hoch ist die Wahrscheinlichkeit, mindestens 8 Mal zu gewinnen?\n\nGegeben: n=12, k≥8, p=0.6\nGesucht: P(X≥8) = Summe von k=8 bis 12\nKonzept: Mehrere Terme in kumulativer Wahrscheinlichkeit",

                    // CONDITIONAL - CORE: Bedingung aus Beschreibung extrahieren
                    card_heart_given_red: "Sie ziehen eine Karte und beobachten, dass sie rot ist. Wie hoch ist die Wahrscheinlichkeit, dass es Herz ist?\n\nGegeben: P(Herz) = 13/52, P(rot) = 26/52, P(Herz UND rot) = 13/52\nGesucht: P(Herz|rot) = (13/52) / (26/52) = 13/26 = 0.5\nKonzept: Bedingung aus Beschreibung identifizieren",
                    die_six_given_even: "Sie würfeln und beobachten, dass die Zahl gerade ist. Wie hoch ist die Wahrscheinlichkeit, dass es eine 6 ist?\n\nGegeben: P(6) = 1/6, P(gerade) = 3/6, P(6 UND gerade) = 1/6\nGesucht: P(6|gerade) = (1/6) / (3/6) = 1/3\nKonzept: Bedingung ändert Stichprobenraum",
                    card_face_given_red: "Sie ziehen eine Karte und sie ist rot. Wie hoch ist die Wahrscheinlichkeit, dass es eine Bildkarte ist?\n\nGegeben: P(Bild) = 12/52, P(rot) = 26/52, P(Bild UND rot) = 6/52\nGesucht: P(Bild|rot) = 6/26\nKonzept: Wahrscheinlichkeiten aus Kartenstruktur extrahieren",
                    die_one_given_odd: "Sie würfeln und die Zahl ist ungerade. Wie hoch ist die Wahrscheinlichkeit, dass es eine 1 ist?\n\nGegeben: P(1) = 1/6, P(ungerade) = 3/6, P(1 UND ungerade) = 1/6\nGesucht: P(1|ungerade) = (1/6) / (3/6) = 1/3\nKonzept: Bedingten Stichprobenraum verstehen",
                    card_spade_given_black: "Sie ziehen eine Karte und sie ist schwarz. Wie hoch ist die Wahrscheinlichkeit, dass es Pik ist?\n\nGegeben: P(Pik) = 13/52, P(schwarz) = 26/52, P(Pik UND schwarz) = 13/52\nGesucht: P(Pik|schwarz) = 13/26 = 0.5\nKonzept: Symmetrie in bedingter Wahrscheinlichkeit",

                    // CONDITIONAL - ADVANCED: Bayesianisches Denken
                    disease_test_positive: "Eine Krankheit betrifft 1% der Bevölkerung. Ein Test ist zu 90% genau (erkennt Krankheit wenn vorhanden). Wenn Sie positiv testen, wie hoch ist die Wahrscheinlichkeit, dass Sie tatsächlich krank sind?\n\nGegeben: P(Krankheit) = 0.01, P(positiv|Krankheit) = 0.9, P(positiv|keine Krankheit) = 0.1\nP(positiv) = 0.01×0.9 + 0.99×0.1 = 0.108\nGesucht: P(Krankheit|positiv) = (0.01×0.9) / 0.108 = 0.083\nKonzept: P(A|B) ≠ P(B|A) - Bayesianische Umkehrung",
                    disease_test_positive_2: "Eine seltene Krankheit betrifft 2% der Bevölkerung. Test ist zu 80% genau. Wenn positiv, was ist P(Krankheit)?\n\nGegeben: P(Krankheit) = 0.02, P(+|Krankheit) = 0.8\nGesucht: P(Krankheit|+) mit Bayes-Theorem\nKonzept: Falsch-positive verstehen",
                    quality_defect_given_batch: "15% der Produkte sind defekt. Chargentest erkennt 80% der Defekte. Wenn Charge fehlschlägt, was ist P(defekt)?\n\nGegeben: P(defekt) = 0.15, P(Fehler|defekt) = 0.8\nGesucht: P(defekt|Fehler)\nKonzept: Bayesianische Inferenz in Qualitätskontrolle",
                    fraud_given_alert: "5% der Transaktionen sind betrügerisch. Alarmsystem erfasst 80% des Betrugs. Wenn Alarm ausgelöst wird, was ist P(Betrug)?\n\nGegeben: P(Betrug) = 0.05, P(Alarm|Betrug) = 0.8\nGesucht: P(Betrug|Alarm)\nKonzept: Alarmzuverlässigkeit verstehen",
                    accident_given_weather: "An 10% der Tage gibt es Unfälle. 80% der Unfalltage haben schlechtes Wetter. Bei schlechtem Wetter, was ist P(Unfall)?\n\nGegeben: P(Unfall) = 0.1, P(schlechtes Wetter|Unfall) = 0.8\nGesucht: P(Unfall|schlechtes Wetter)\nKonzept: Bedingte Wahrscheinlichkeit umkehren",

                    // CONDITIONAL - ELITE: Unabhängigkeitstest
                    independence_test_1: "Ereignisse A und B haben P(A)=0.4, P(B)=0.5, P(A∩B)=0.2. Sind A und B unabhängig?\n\nGegeben: P(A)=0.4, P(B)=0.5, P(A∩B)=0.2\nTest: Wenn unabhängig, sollte P(A∩B) gleich P(A)×P(B) = 0.4×0.5 = 0.2 ✓\nGesucht: P(A|B) = 0.2/0.5 = 0.4 = P(A) ✓\nKonzept: A und B sind UNABHÄNGIG",
                    independence_test_2: "Ereignisse A und B haben P(A)=0.3, P(B)=0.6, P(A∩B)=0.18. Sind sie unabhängig?\n\nGegeben: P(A)=0.3, P(B)=0.6, P(A∩B)=0.18\nTest: P(A)×P(B) = 0.3×0.6 = 0.18 ✓\nGesucht: P(A|B) = 0.18/0.6 = 0.3 = P(A) ✓\nKonzept: Unabhängigkeit testen",
                    multiple_condition_1: "P(A)=0.25, P(B)=0.4, P(A∩B)=0.15. Finden Sie P(A|B) und bestimmen Sie ob unabhängig.\n\nGegeben: P(A)=0.25, P(B)=0.4, P(A∩B)=0.15\nGesucht: P(A|B) = 0.15/0.4 = 0.375\nTest: P(A|B) = 0.375 ≠ P(A) = 0.25\nKonzept: NICHT unabhängig - Bedingung ändert Wahrscheinlichkeit",
                    independence_test_3: "P(A)=0.35, P(B)=0.7, P(A∩B)=0.245. Sind A und B unabhängig?\n\nGegeben: P(A)=0.35, P(B)=0.7, P(A∩B)=0.245\nTest: P(A)×P(B) = 0.35×0.7 = 0.245 ✓\nGesucht: P(A|B) = 0.245/0.7 = 0.35 = P(A) ✓\nKonzept: Unabhängigkeitsverifikation",
                    multiple_condition_2: "P(A)=0.2, P(B)=0.5, P(A∩B)=0.12. Finden Sie P(A|B) und testen Sie Unabhängigkeit.\n\nGegeben: P(A)=0.2, P(B)=0.5, P(A∩B)=0.12\nGesucht: P(A|B) = 0.12/0.5 = 0.24\nTest: P(A|B) = 0.24 ≠ P(A) = 0.2\nKonzept: NICHT unabhängig",
                    mission_adv_1: "Novartis Mission: 100 Proben, 85 bestanden, berechnen Sie P(E).\n\nGegeben: 85 günstig, 100 gesamt\nFinden: P(E)",
                    mission_adv_2: "Swiss Lotto Mission: 10 Ziehungen, 50% Gewinnchance, berechnen Sie P(X=6).\n\nGegeben: n=10, k=6, p=0.5\nFinden: P(X=6)",
                    mission_adv_3: "Versicherung Mission: Gegeben P(A)=0.37, P(B)=0.63, P(A∩B)=0.21, finden Sie P(A|B).\n\nGegeben: P(A)=0.37, P(B)=0.63, P(A∩B)=0.21\nFinden: P(A|B)",
                    mission_adv_4: "Novartis Mission: 120 Proben, 92 bestanden, berechnen Sie P(E).\n\nGegeben: 92 günstig, 120 gesamt\nFinden: P(E)",
                    mission_adv_5: "Swiss Lotto Mission: 8 Ziehungen, 60% Gewinnchance, berechnen Sie P(X=5).\n\nGegeben: n=8, k=5, p=0.6\nFinden: P(X=5)",
                    mission_elite_1: "Novartis Mission: 500 Proben, 427 bestanden, berechnen Sie P(E).\n\nGegeben: 427 günstig, 500 gesamt\nFinden: P(E)",
                    mission_elite_2: "Swiss Lotto Mission: 15 Ziehungen, 55% Gewinnchance, berechnen Sie P(X=9).\n\nGegeben: n=15, k=9, p=0.55\nFinden: P(X=9)",
                    mission_elite_3: "Versicherung Mission: Gegeben P(A)=0.365, P(B)=0.625, P(A∩B)=0.215, finden Sie P(A|B).\n\nGegeben: P(A)=0.365, P(B)=0.625, P(A∩B)=0.215\nFinden: P(A|B)",
                    mission_elite_4: "Novartis Mission: 800 Proben, 683 bestanden, berechnen Sie P(E).\n\nGegeben: 683 günstig, 800 gesamt\nFinden: P(E)",
                    mission_elite_5: "Swiss Lotto Mission: 18 Ziehungen, 60% Gewinnchance, berechnen Sie P(X=11).\n\nGegeben: n=18, k=11, p=0.6\nFinden: P(X=11)"
                }
            },
        sm2_06: {
                back: "Zurück zum Nexus",
                title: "SM2.06 // GLEICHUNGSSYSTEME",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Gleichungssystem",
                next: "Nächste Sequenz ausführen",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Abweichung",
                ready: "Bereit",
                monitor_title: "SM2.06_MONITOR",
                footer_left: "SM2.06_GLEICHUNGSSYSTEME // KNOTEN: BASEL",
                stages: {
                    substitution: "EINSETZUNGSVERFAHREN",
                    elimination: "ADDITIONSVERFAHREN",
                    mission: "MISSION",
                    substitution_prompt_latex: "\\text{Löse mit dem Einsetzungsverfahren.}",
                    elimination_prompt_latex: "\\text{Löse mit dem Additionsverfahren.}",
                    mission_prompt_latex: "\\text{Übersetze das Problem in ein Gleichungssystem und löse.}"
                },
                labels: {
                    input: "EINGABE",
                    hints: "HINWEISE"
                },
                hints: {
                    rules: {
                        substitution_latex: "\\text{Setze eine Gleichung in die andere ein.}",
                        elimination_add_latex: "\\text{Addiere Gleichungen, um eine Variable zu eliminieren.}",
                        elimination_sub_latex: "\\text{Subtrahiere Gleichungen, um eine Variable zu eliminieren.}",
                        elimination_multiply_latex: "\\text{Multipliziere, um passende Koeffizienten zu erhalten, dann eliminiere.}"
                    }
                },
                mission: {
                    apples: "Äpfel",
                    oranges: "Orangen",
                    adult: "Erwachsene",
                    child: "Kinder"
                }
            },
        sm2_05: {
                back: "Zurück zum Nexus",
                title: "SM2.05 // POTENZEN & WURZELN",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Operation",
                next: "Nächste Sequenz ausführen",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Abweichung",
                ready: "Bereit",
                monitor_title: "SM2.05_MONITOR",
                footer_left: "SM2.05_POTENZEN // KNOTEN: BASEL",
                stages: {
                    rules: "GESETZE",
                    negative: "NEGATIV",
                    scientific: "NOTATION",
                    rules_prompt_latex: "\\text{Potenzgesetze zur Vereinfachung anwenden.}",
                    negative_prompt_latex: "\\text{Terme mit negativen Exponenten vereinfachen (finde n im Nenner).}",
                    scientific_prompt_latex: "\\text{In wissenschaftliche Schreibweise umwandeln oder damit rechnen.}"
                },
                labels: {
                    input: "EINGABE",
                    hints: "HINWEISE"
                }
            },
        sm1_01: {
                back: "Zurück zum Nexus",
                title: "SM1.01 // FLÄCHEN & VOLUMEN",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Geometrie-Aufgabe",
                next: "Nächste Sequenz ausführen",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Abweichung",
                ready: "Bereit",
                monitor_title: "SM1.01_MONITOR",
                footer_left: "SM1.01_GEOMETRIE // KNOTEN: BASEL",
                stages: {
                    areas: "FLÄCHEN",
                    volumes: "VOLUMEN",
                    complex: "KOMPLEX",
                    areas_prompt_latex: "\\text{Lies das Szenario und berechne die Fläche.}",
                    volumes_prompt_latex: "\\text{Lies das Szenario und berechne das Volumen.}"
                },
                mission: {
                    title: "MISSION: RHEIN-HOCHWASSERSCHUTZ",
                    protocol: "Nexus-Protokoll // Knoten Genf",
                    description: "In Basel modellieren Ingenieure den Querschnitt eines Rheinhochwassertors als Trapez.",
                    cube_title: "CERN WÜRFELTRESOR",
                    cube_desc: "Identifizieren Sie im CERN die Raumdiagonale eines würfelförmigen Tresors."
                },
                labels: {
                    input: "EINGABE",
                    hints: "HINWEISE",
                    length: "Länge",
                    width: "Breite",
                    height: "Höhe",
                    base: "Basis",
                    radius: "Radius",
                    side: "Seite",
                    area: "Fläche",
                    volume: "Volumen",
                    calculate_area: "Berechnen Sie die Fläche.",
                    calculate_volume: "Berechnen Sie das Volumen.",
                },
                quests: {
                    ski: "Eine alpine Skipiste benötigt Neuschnee. Die Piste ist rechteckig.",
                    sail: "Der Segelclub Zürich benötigt Segeltuch. Das Arbeitsegel ist dreieckig.",
                    gate: "Ein Querschnitt des Rheinhochwassertors ist trapezförmig.",
                    cheese: "Eine kreisförmige Form für die Greyerzer Käsefabrik.",
                    attic: "Dachboden in einem Schweizer Chalet ist ein würfelförmiger Raum.",
                    crate: "Das CERN-Labor benötigt Kisten für Präzisionsinstrumente.",
                    pylon: "Skipfosten in St. Moritz sind zylindrisch.",

                    // Struktur-Vorlagen
                    rect_core: "Die Breite ist ${w}, und die Länge ist ${diff} mehr als die Breite.",
                    rect_advanced: "Die Länge ist ${l}, und die Breite ist genau die Hälfte der Länge.",
                    rect_elite: "Der Gesamtumfang ist ${p}, und die Länge ist ${ratio}-mal so groß wie die Breite.",
                    tri_elite: "Ein gleichschenklig-rechtwinkliges Segel mit einer Hypotenuse von ${c}.",
                    circle_elite: "Der Gesamtumfang der Form beträgt ${c}.",
                    cube_elite: "Die Gesamtoberfläche des Würfels beträgt ${sa}.",
                    prism_elite: "Die Grundfläche ist ein Quadrat mit Umfang ${p}, die Höhe ist ${h}.",
                    cyl_elite: "Die Mantelfläche beträgt ${la}, der Radius ist ${r}."
                }
            },
    em1_01: {
        back: "Zurück zum Nexus",
        title: "EM1.01 // THALES TOWER",
        difficulty: {
            basic: "BASIS",
            core: "KERN",
            advanced: "FORTGESCHRITTEN",
            elite: "ELITE"
        },
        objective_title: "Aktuelles Missionsziel",
        target_title: "Tower Height",
        next: "Nächste Sequenz ausführen",
        check: "Prüfen",
        correct: "Verifiziert",
        incorrect: "Abweichung",
        ready: "Bereit",
        monitor_title: "EM1.01_THALES_MONITOR",
        footer_left: "EM1.01_THALES_TOWER // NODE: BASEL",
        stages: {
            measure: "MESSEN"
        },
        measure_prompt_latex: "\\text{Use }\\frac{h}{H}=\\frac{l}{L}\\text{ to solve tower height.}",
        labels: {
            input: "EINGABE",
            hints: "HINWEISE",
            readings: "READINGS",
            pole_height: "Pole Height (h)",
            pole_shadow: "Pole Shadow (l)",
            tower_shadow: "Tower Shadow (L)",
            sun_angle: "Sun Angle",
            solve_height: "Solve Tower Height (H)",
            height_placeholder: "height in meters",
            hint_ratio: "Hint: h/H = l/L"
        },
        mission: {
            title: "MISSION: BASEL CATHEDRAL SURVEY",
            description: "Measure the tower height using Thales' theorem and shadow ratios."
        }
    },
        sp2_03: {
                back: "Zurück zum Nexus",
                title: "SP2.03 // MOTOR LAB",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Motor Assembly",
                next: "Nächste Sequenz ausführen",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Abweichung",
                ready: "Bereit",
                monitor_title: "SP2.03_MOTOR_MONITOR",
                footer_left: "SP2.03_MOTOR_LAB // NODE: BASEL",
                labels: {
                    input: "EINGABE",
                    hints: "HINWEISE",
                    current: "CURRENT SWITCH",
                    current_on: "SWITCH ON",
                    current_off: "SWITCH OFF",
                    polarity: "MAGNET POLARITY",
                    direction: "ROTATION DIRECTION",
                    direction_cw: "CLOCKWISE",
                    direction_ccw: "COUNTER-CLOCKWISE",
                    direction_stop: "STOPPED",
                    speed: "ROTATION SPEED",
                    readout: "READOUT"
                },
                mission: {
                    title: "MISSION: BASEL MOTOR WORKSHOP",
                    description: "Assemble a DC motor. Control magnetic polarity and current to drive rotation."
                },
                stages: {
                    assemble: "ASSEMBLE",
                    power: "POWER",
                    reverse: "REVERSE",
                    assemble_desc: "Place magnets and coil",
                    power_desc: "Close the circuit and observe rotation",
                    reverse_desc: "Swap poles to reverse direction",
                    assemble_hint: "Start with the switch open and align the magnets",
                    power_hint: "Close the circuit to energize the coil",
                    reverse_hint: "Swap N/S to reverse rotation"
                }
            },
        sc1_02: {
                back: "Zurück zum Nexus",
                title: "C1.02 // MOL-MEISTER",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Stöchiometrie-Konsole",
                next: "Nächste Sequenz ausführen",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Abweichung",
                ready: "Bereit",
                monitor_title: "C1.02_WAAGE",
                footer_left: "C1.02_MOL_MEISTER // KNOTEN: BASEL",
                stages: {
                    molar_mass: "MOLMASSE",
                    stoichiometry: "REAKTIONSVERHÄLTNIS",
                    yield: "AUSBEUTE",
                    molar_mass_prompt_latex: "\\text{Berechne die Molmasse der Verbindung.}",
                    stoichiometry_prompt_latex: "\\text{Nutze stöchiometrische Verhältnisse für die Produktmenge.}",
                    yield_prompt_latex: "\\text{Berechne die theoretische Ausbeute aus den gegebenen Massen.}"
                },
                labels: {
                    input: "EINGABE",
                    scale: "WAAGENANZEIGE"
                },
                mission: {
                    title: "MISSION: NOVARTIS-SYNTHESEBAY",
                    description: "Kalibriere eine pharmazeutische Reaktion. Balanciere Mol-Verhältnisse und prüfe Ausbeuten."
                }
            },
        sc2_01: {
                back: "Zurück zum Nexus",
                title: "C2.01 // CHEMISCHE KINETIK",
                difficulty: {
                    basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Kinetik-Daten",
                scenario_title: "BASLER SZENARIO",
                answer_title: "IHRE ANTWORT",
                next: "Nächste Sequenz ausführen",
                check: "Verifizieren",
                correct: "Verifiziert",
                incorrect: "Fehlreaktion",
                ready: "Bereit",
                monitor_title: "C2.01_KINETIK_MONITOR",
                footer_left: "C2.01_CHEMISCHE_KINETIK // KNOTEN: BASEL",
                stages: {
                    arrhenius: "ARRHENIUS",
                    concentration: "GESCHWINDIGKEITSGESETZ",
                    collision: "HALBWERTSZEIT",
                    arrhenius_prompt_latex: "\\text{Berechnen Sie die Geschwindigkeitskonstante }k\\text{ mit der Arrhenius-Gleichung.}",
                    concentration_prompt_latex: "\\text{Berechnen Sie die Reaktionsgeschwindigkeit basierend auf Konzentrationsänderungen.}",
                    collision_prompt_latex: "\\text{Bestimmen Sie den Anteil effektiver Kollisionen.}"
                },
                labels: {
                    input: "EINGABE",
                    hints: "HINWEISE",
                    ph: "pH",
                    volume: "Volumen"
                },
                mission: {
                    title: "MISSION: CHEMISCHES KINETIK-LABOR",
                    description: "Untersuchen Sie Reaktionsgeschwindigkeiten im Basler Labor. Meistern Sie die Arrhenius-Gleichung und die Kollisionstheorie."
                },
                formulas: {
                    arrhenius: "k = Ae^{-E_a/RT}",
                    concentration: "\\text{Rate} = -\\frac{\\Delta[A]}{\\Delta t}",
                    collision: "f = e^{-E_a/RT}"
                },
                scenarios: {
                    arrhenius: "Novartis Kinetik-Labor: Untersuchen Sie, wie Temperatur und Aktivierungsenergie die Reaktionsgeschwindigkeiten beeinflussen. Die Arrhenius-Gleichung k = A·exp(-Ea/RT) beschreibt die Temperaturabhängigkeit von Geschwindigkeitskonstanten. Höhere Temperaturen erhöhen die kinetische Energie der Moleküle und führen zu mehr erfolgreichen Kollisionen.",
                    rate_law: "Roche Pharmaforschung: Bestimmen Sie Reaktionsordnungen und Geschwindigkeitsgesetze aus experimentellen Daten. Das Geschwindigkeitsgesetz drückt aus, wie die Reaktionsgeschwindigkeit von den Konzentrationen der Reaktanten abhängt. Das Verständnis von Geschwindigkeitsgesetzen ist entscheidend für die Optimierung der Arzneimittelsynthese und die Vorhersage des Reaktionsverhaltens.",
                    half_life: "Universitätsspital Basel: Berechnen Sie Arzneimittel-Eliminationshalbwertszeiten für die Pharmakokinetik. Die Halbwertszeit ist die Zeit, die benötigt wird, damit eine Menge auf die Hälfte ihres Anfangswerts reduziert wird. Kinetik erster Ordnung ist bei der Arzneimittelmetabolisierung üblich, wobei t₁/₂ = ln(2)/k."
                },
                problems: {
                    arr_temp_300_ea_50: "Novartis-Reaktor bei T=300K, Aktivierungsenergie Ea=50 kJ/mol. Berechnen Sie relative Geschwindigkeitskonstante k.",
                    arr_temp_350_ea_40: "Temperatur erhöht auf 350K, Ea=40 kJ/mol. Finden Sie k (relative Einheiten).",
                    arr_temp_400_ea_60: "Hochtemperaturreaktion: T=400K, Ea=60 kJ/mol. Berechnen Sie k.",
                    arr_temp_320_ea_45: "Moderate Bedingungen: T=320K, Ea=45 kJ/mol. Bestimmen Sie k.",
                    arr_temp_280_ea_55: "Niedertemperatursynthese: T=280K, Ea=55 kJ/mol. Finden Sie k.",
                    arr_double_temp: "Temperatur verdoppelt sich von 300K auf 600K. Um welchen Faktor steigt k? (Ea=50 kJ/mol)",
                    arr_ea_effect: "Katalysator senkt Ea von 80 auf 40 kJ/mol bei 300K. Finden Sie k-Verhältnis.",
                    arr_ln_form: "Verwenden Sie logarithmische Form: ln(k) = ln(A) - Ea/RT. Berechnen Sie ln(k) für Ea=50 kJ/mol, T=300K.",
                    arr_activation: "Zwei Geschwindigkeitskonstanten unterscheiden sich um Faktor 10 über 50K Temperaturbereich. Finden Sie Ea.",
                    arr_catalyst: "Katalysator reduziert Ea um 20 kJ/mol (von 80 auf 60). Berechnen Sie k-Verhältnis bei 300K.",
                    arr_two_temps: "Messen Sie k bei 300K und 350K. Verwenden Sie ln(k₂/k₁) = -Ea/R(1/T₂ - 1/T₁) um Ea=52 kJ/mol zu finden.",
                    arr_plot: "Arrhenius-Diagramm hat Steigung -7800 K. Berechnen Sie Ea (Steigung = -Ea/R).",
                    arr_frequency: "Gegeben k=1.5×10⁻⁹, Ea=50 kJ/mol, T=300K. Finden Sie präexponentiellen Faktor A.",
                    arr_temp_for_k: "Ziel-Geschwindigkeitskonstante k=10⁶ s⁻¹, Ea=60 kJ/mol. Welche Temperatur wird benötigt?",
                    arr_enzyme: "Enzymkatalysierte Reaktion: Ea=40 kJ/mol, Körpertemperatur T=310K. Berechnen Sie k.",
                    arr_complex: "Zweistufiger Mechanismus: Ea1=50, Ea2=30 kJ/mol. Gesamt-Ea=40 kJ/mol. Finden Sie k bei 300K.",
                    arr_pressure: "Druckeffekt: Aktivierungsvolumen ΔV‡=-10 cm³/mol. Berechnen Sie k-Verhältnis.",
                    arr_quantum: "Quantentunnelkorrektur κ=2.5. Finden Sie effektives k.",
                    arr_isotope: "Kinetischer Isotopeneffekt: H vs D Substitution. Berechnen Sie kH/kD für Ea=50 kJ/mol.",
                    arr_transition: "Übergangszustandstheorie: k=10⁶ s⁻¹ bei 300K. Berechnen Sie ΔG‡.",
                    rl_first_order: "Reaktion erster Ordnung: Rate = k[A]. Gegeben [A]=2.0 M, k=0.5 s⁻¹, finden Sie Rate.",
                    rl_second_order: "Zweiter Ordnung: Rate = k[A]². [A]=1.5 M, k=0.4 M⁻¹s⁻¹. Berechnen Sie Rate.",
                    rl_zero_order: "Nullter Ordnung: Rate = k (unabhängig von [A]). k=0.8 M/s. Finden Sie Rate.",
                    rl_concentration: "Reaktion erster Ordnung: [A] verdoppelt sich. Um welchen Faktor steigt die Rate?",
                    rl_initial: "Anfangsgeschwindigkeitsmethode: [A]₀=1.0 M, k=0.6 s⁻¹. Berechnen Sie Anfangsrate.",
                    rl_mixed: "Gemischte Ordnung: Rate = k[A][B]. [A]=2 M, [B]=3 M, k=0.5 M⁻²s⁻¹. Finden Sie Rate.",
                    rl_order: "Verdopplung von [A] vervierfacht Rate. Was ist die Reaktionsordnung n?",
                    rl_integrated: "Integrierte erste Ordnung: [A]t = [A]₀·e⁻ᵏᵗ. [A]₀=1 M, k=0.1 s⁻¹, t=10 s. Finden Sie [A].",
                    rl_time: "Halbwertszeit erster Ordnung: t₁/₂ = ln(2)/k. Gegeben k=0.05 s⁻¹, finden Sie t₁/₂.",
                    rl_constant: "Aus Rate=2 M/s und [A]=4 M (erste Ordnung), bestimmen Sie k.",
                    rl_complex_order: "Gebrochene Ordnung: Rate = k[A]^1.5[B]^0.5. [A]=4, [B]=9, k=0.2. Finden Sie Rate.",
                    rl_mechanism: "Mehrstufig: Gesamtrate = k₁k₂/(k₁+k₂). k₁=0.5, k₂=0.3. Berechnen Sie Rate.",
                    rl_steady_state: "Stationäre Näherung: [I]ss = k₁[A]/k₂. k₁=0.5, k₂=0.2. Finden Sie [I].",
                    rl_pre_equilibrium: "Vorgleichgewicht: Keq = kf/kr. kf=0.8, kr=0.2. Berechnen Sie Keq.",
                    rl_inhibition: "Kompetitive Hemmung: Rate reduziert um Faktor (1+[I]/KI). [I]=2, KI=1. Finden Sie Ratefaktor.",
                    rl_oscillating: "Belousov-Zhabotinsky oszillierende Reaktion. Maximum [A] im Zyklus.",
                    rl_autocatalytic: "Autokatalytisch: A+B→2B. Wendepunkt bei t=15s für [A]₀=0.1 M.",
                    rl_chain: "Kettenreaktion: Kettenlänge ν = kp/kt. kp/kt=100. Finden Sie ν.",
                    rl_photochemical: "Photochemische Quantenausbeute Φ = reagierte Moleküle / absorbierte Photonen = 0.8.",
                    rl_enzyme_complex: "Michaelis-Menten: V = Vmax[S]/(KM+[S]). KM=1, [S]=5. Finden Sie V/Vmax.",
                    hl_first_order: "Halbwertszeit erster Ordnung: t₁/₂ = ln(2)/k = 0.693/k. k=0.1 s⁻¹. Finden Sie t₁/₂.",
                    hl_second_order: "Zweiter Ordnung: t₁/₂ = 1/(k[A]₀). k=0.5 M⁻¹s⁻¹, [A]₀=2 M. Berechnen Sie t₁/₂.",
                    hl_zero_order: "Nullter Ordnung: t₁/₂ = [A]₀/(2k). k=0.4 M/s, [A]₀=4 M. Finden Sie t₁/₂.",
                    hl_remaining: "Nach 2 Halbwertszeiten, welcher Bruchteil bleibt? [A]₀=8 M → [A]=?",
                    hl_time: "75% Zerfall bedeutet 2 Halbwertszeiten. Wenn t₁/₂=10s, Gesamtzeit = 20s.",
                    hl_find_k: "Aus t₁/₂=5s (erste Ordnung), berechnen Sie k = ln(2)/t₁/₂.",
                    hl_fraction: "Nach 3 Halbwertszeiten: Bruchteil = (1/2)³ = 1/8 = 0.125.",
                    hl_radioactive: "Radioaktiver Zerfall: N = N₀(1/2)^(t/t₁/₂). N₀=1000, t=20s, t₁/₂=10s. Finden Sie N.",
                    hl_drug: "Arzneimittelausscheidung: [D]₀=100 mg/L, t₁/₂=4h, t=12h (3 Halbwertszeiten). [D]=12.5 mg/L.",
                    hl_compare: "Vergleichen Sie zwei Reaktionen: kA=0.2, kB=0.4. Verhältnis der Halbwertszeiten = kB/kA = 2.",
                    hl_consecutive: "Aufeinanderfolgende A→B→C: Maximum [B] bei tmax = ln(k₁/k₂)/(k₁-k₂). k₁=0.5, k₂=0.2.",
                    hl_parallel: "Parallele Pfade: kgesamt = k₁+k₂. k₁=0.3, k₂=0.2, t₁/₂ = ln(2)/0.5.",
                    hl_reversible: "Reversibel: [A]eq = [A]₀·kr/(kf+kr). kf=0.5, kr=0.1.",
                    hl_temperature: "t₁/₂ nimmt mit Temperatur ab. Bei 350K vs 300K mit Ea=50 kJ/mol.",
                    hl_enzyme: "Enzym-Turnover: kcat=100 s⁻¹. t₁/₂ = ln(2)/kcat = 0.007s.",
                    hl_isotope_dating: "Kohlenstoff-14-Datierung: N/N₀=0.25 = (1/2)². Alter = 2×5730 = 11460 Jahre.",
                    hl_branching: "Verzweigter Zerfall: α und β Pfade. kα/kβ=2, also fα = 2/3 = 0.67.",
                    hl_secular: "Säkulares Gleichgewicht: Mutter t₁/₂ >> Tochter t₁/₂. Aktivitätsverhältnis → 1.",
                    hl_transient: "Transientes Gleichgewicht: tmax wenn Tochteraktivität Spitze erreicht. t₁/₂,1=10, t₁/₂,2=2.",
                    hl_cosmogenic: "¹⁰Be kosmogene Datierung: t₁/₂=1.39×10⁶ Jahre. N/N₀=0.5 → Alter = t₁/₂."
                }
            },
        sp1_03: {
                back: "Zurück zum Nexus",
                title: "P1.03 // ENERGIE & LEISTUNG",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Turbinenleistung",
                next: "Nächste Sequenz ausführen",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Abweichung",
                ready: "Bereit",
                monitor_title: "P1.03_TURBINENMONITOR",
                footer_left: "P1.03_RHEIN_WASSERKRAFT // KNOTEN: BASEL",
                stages: {
                    potential: "LAGEENERGIE",
                    kinetic: "BEWEGUNGSENERGIE",
                    power: "LEISTUNG",
                    potential_prompt_latex: "\\text{Berechne die Lageenergie }E_p=mgh.",
                    kinetic_prompt_latex: "\\text{Berechne die Bewegungsenergie }E_k=\\frac{1}{2}mv^2.",
                    power_prompt_latex: "\\text{Berechne die Leistung }P=\\frac{W}{t}\\text{ (Wirkungsgrad berücksichtigen).}"
                },
                labels: {
                    input: "EINGABE",
                    formula: "FORMEL"
                },
                formulas: {
                    potential: "E_p=mgh",
                    kinetic: "E_k=\\frac{1}{2}mv^2",
                    power: "P=\\frac{W}{t}"
                },
                mission: {
                    title: "MISSION: RHEIN-WASSERKRAFTWERK",
                    description: "Wandeln Sie die Energie des Rheins in sauberen Strom um. Verfolgen Sie die Energieübertragung und Turbinenleistung."
                }
            },
        sp1_07: {
                back: "Zurück zum Nexus",
                title: "SP1.07 // DRUCK & AUFTRIEB",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                next: "Nächste Sequenz ausführen",
                check: "Verifizieren",
                correct: "Verifiziert",
                incorrect: "Fehlanpassung",
                ready: "Bereit",
                monitor_title: "SP1.07_FLUID_MONITOR",
                footer_left: "SP1.07_FLUIDMECHANIK // KNOTEN: RHEIN",
                objective_title: "Aktuelles Missionsziel",
                stages: {
                    pressure: "DRUCK",
                    buoyancy: "AUFTRIEB",
                    hydraulics: "HYDRAULIK"
                },
                labels: {
                    physics_display: "Physik-Anzeige",
                    input_terminal: "Eingabeterminal",
                    depth: "Tiefe",
                    density: "Objektdichte",
                    force: "Kolbenkraft",
                    fluid_mastery: "Fluidbeherrschung"
                },
                prompts: {
                    pressure_depth: "Ein Taucher taucht auf {depth} m Tiefe im Rhein. Berechnen Sie den Gesamtdruck (P₀=100000 Pa, ρ=1000 kg/m³, g=10 m/s²).",
                    buoyant_force: "Ein Objekt mit Volumen {volume} m³ ist in Wasser eingetaucht. Berechnen Sie die Auftriebskraft (ρ_Wasser=1000 kg/m³, g=10 m/s²).",
                    hydraulic_force: "Ein Hydraulikheber hat Eingangskraft {f1} N auf Fläche {a1} m². Ausgangsfläche ist {a2} m². Berechnen Sie die Ausgangskraft.",
                    hint_pressure: "Verwenden Sie P = P₀ + ρgh",
                    hint_archimedes: "Verwenden Sie F_b = ρ_Wasser × V × g",
                    hint_pascal: "Verwenden Sie das Pascal'sche Prinzip: F₁/A₁ = F₂/A₂"
                },
                scenarios: {
                    rhine_swimming: "Rheinschwimmen: Taucher erkunden das Rheinbett nahe der Basler Mittleren Brücke. Der Wasserdruck steigt mit der Tiefe und beeinflusst Ausrüstung und Sicherheitsprotokolle.",
                    rhine_boat: "Rheinfrachttransport: Lastkähne navigieren den Rhein und transportieren Waren zwischen Basel und Rotterdam. Das Verständnis des Auftriebs ist entscheidend für Lastberechnungen und Schiffsstabilität.",
                    hydraulic_lift: "Basler Baustelle: Hydraulikheber auf Basler Baustellen nutzen das Pascal'sche Prinzip, um schwere Baumaterialien mit minimaler Eingangskraft zu heben."
                },
                feedback: {
                    correct: "Fluidmechanik gemeistert!",
                    incorrect: "Überprüfen Sie die Prinzipien der Fluidmechanik."
                }
            },
        sp1_05: {
                title: "SP1.05 // DIE RHEINFÄHRE",
                difficulty: {
                    basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE"
                },
                next: "Nächste Sequenz",
                check: "Überprüfen",
                correct: "Verifiziert",
                incorrect: "Fehlersignal",
                ready: "Bereit",
                monitor_title: "SP1.05_FÄHRE_MONITOR",
                footer_left: "SP1.05_RHEINFÄHRE // KNOTEN: BASEL",
                stages: {
                    composition: "VEKTORADDITION",
                    drift: "DRIFTANALYSE",
                    navigation: "PRÄZISIONSNAVIGATION"
                },
                labels: {
                    river_speed: "Strömung (v_r)",
                    ferry_speed: "Fähre (v_f)",
                    cable_angle: "Seilwinkel (θ)",
                    resultant_speed: "Gesamt (v_net)",
                    drift_speed: "Drift",
                    angle: "Winkel"
                },
                mission: {
                    title: "RHEIN-ÜBERFAHRT MISSION",
                    description: "Navigiere die Basler Rheinfähre. Passe Seilwinkel und Geschwindigkeit an, um die Strömung auszugleichen."
                }
            },
        sp2_01: {
                back: "Zurück zum Nexus",
                title: "P2.01 // THERMODYNAMIK",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "ERWEITERT",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Wärmeübertragung",
                next: "Nächste Sequenz ausführen",
                check: "Verifizieren",
                correct: "Verifiziert",
                incorrect: "Fehlreaktion",
                ready: "Bereit",
                monitor_title: "P2.01_THERMIK_MONITOR",
                footer_left: "P2.01_THERMODYNAMIK // KNOTEN: BASEL",
                labels: {
                    input: "EINGABE",
                    hints: "HINWEISE",
                    heat: "Wärmeenergie (Q)",
                    temperature: "Temperaturänderung (ΔT)",
                    mass: "Masse (m)",
                    specific_heat: "Spezifische Wärme (c)"
                },
                mission: {
                    title: "THERMISCHER REAKTORKONTROLLE",
                    description: "Der Novartis-Thermoreaktor erfordert präzise Wärmeberechnungen. Meistern Sie Wärmekapazität und Phasenübergänge."
                },
                stages: {
                    heat_capacity: "WÄRMEKAPAZITÄT",
                    phase_change: "PHASENÜBERGANG",
                    mixed: "GEMISCHTE PROBLEME",
                    heat_capacity_prompt_latex: "\\text{Berechne Wärmeübertragung mit }Q=mc\\Delta T.",
                    phase_change_prompt_latex: "\\text{Berechne latente Wärme mit }Q=mL.",
                    mixed_prompt_latex: "\\text{Kombiniere Wärmekapazität und Phasenübergang.}"
                },
                formulas: {
                    heat_capacity: "Q = mc\\Delta T",
                    phase_change: "Q = mL",
                    mixed: "Q_{\\text{gesamt}} = Q_1 + Q_2"
                }
            },
        sp3_02: {
                back: "Zurück zum Nexus",
                title: "P3.02 // WELLENOPTIK",
                difficulty: {
                    basic: "BASIS", core: "KERN", advanced: "ERWEITERT", elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Welleneigenschaften",
                next: "Nächste Sequenz ausführen",
                check: "Verifizieren",
                correct: "Verifiziert",
                incorrect: "Fehlreaktion",
                ready: "Bereit",
                monitor_title: "P3.02_OPTIK_MONITOR",
                footer_left: "P3.02_WELLENOPTIK // KNOTEN: BASEL",
                labels: {
                    input: "EINGABE",
                    hints: "HINWEISE",
                    wavelength: "Wellenlänge (λ)",
                    slit_separation: "Spaltabstand (d)",
                    slit_width: "Spaltbreite (a)",
                    angle: "Winkel (θ)",
                    intensity: "Intensität (I)",
                    order: "Ordnung (m)"
                },
                mission: {
                    title: "OPTISCHES RESONANZLABOR",
                    description: "Das Novartis-Optiklabor befasst sich mit Welleneigenschaften. Meistern Sie Interferenz, Beugung und Polarisation."
                },
                stages: {
                    interference: "INTERFERENZ",
                    diffraction: "BEUGUNG",
                    polarization: "POLARISATION",
                    interference_prompt_latex: "\\text{Berechnen Sie den Winkel }\\theta\\text{ mit der Doppelspaltgleichung.}",
                    diffraction_prompt_latex: "\\text{Berechnen Sie den Winkel }\\theta\\text{ mit der Einzelspaltgleichung.}",
                    polarization_prompt_latex: "\\text{Berechnen Sie die Intensität }I\\text{ mit dem Gesetz von Malus.}"
                },
                formulas: {
                    interference: "d \\sin \\theta = m \\lambda",
                    diffraction: "a \\sin \\theta = m \\lambda",
                    polarization: "I = I_0 \\cos^2 \\theta"
                }
            },
        sm1_02_new: {
                back: "Zurück zum Nexus",
                title: "EM1.01 // ALGEBRA QUEST",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                modes: {
                    containers: "CONTAINER",
                    sorting: "SORTIEREN",
                    machine: "MASCHINE"
                },
                labels: {
                    variable: "Variable",
                    value: "Wert",
                    expression: "Ausdruck",
                    simplify: "Vereinfachen",
                    evaluate: "Auswerten",
                    input: "Eingabe",
                    output: "Ausgabe"
                },
                stages: {
                    variables: "VARIABLEN",
                    terms: "TERME",
                    substitution: "EINSETZEN",
                    vars_prompt: "Identifiziere den Wert im Container.",
                    terms_prompt: "Fasse gleichartige Terme zusammen, um den Ausdruck zu vereinfachen.",
                    sub_prompt: "Werte den Ausdruck für den gegebenen Wert aus."
                },
                scenarios: {
                    variables: "Basler Rhybadhüsli Schliessfach: Du verwaltest Schliessfächer im berühmten Rheinbad. Jedes Fach (Variable 'x') enthält einen bestimmten Wert. Verstehe, dass 'x' nur ein Platzhalter ist.",
                    terms: "Marktplatz Obststand: Du sortierst Lieferungen auf dem Basler Markt. Äpfel und Birnen kann man nicht mischen. Gruppiere gleiche Artikel: 3 Äpfel + 2 Äpfel = 5 Äpfel.",
                    substitution: "BVB Ticketautomat: Du testest die Logik des Ticketautomaten. Setze einen Zonenwert (x) in die Preisformel ein, um den korrekten Fahrpreis in CHF zu berechnen."
                }
            },
        sm2_07: {
                back: "Zurück zum Nexus",
                title: "SM2.07 // KOORDINATENGEOMETRIE",
                difficulty: {
                    basic: "BASIS", core: "KERN", advanced: "ERWEITERT", elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Präzisionskartierung",
                next: "Nächste Sequenz ausführen",
                check: "Verifizieren",
                correct: "Verifiziert",
                incorrect: "Fehlreaktion",
                ready: "Bereit",
                monitor_title: "SM2.07_KOORDINATEN_MONITOR",
                footer_left: "SM2.07_KOORD_GEOM // KNOTEN: ZÜRICH",
                labels: {
                    input: "EINGABE",
                    hints: "HINWEISE",
                    distance: "Abstand (d)",
                    midpoint: "Mittelpunkt (M)",
                    slope: "Steigung (m)"
                },
                mission: {
                    title: "ZÜRCHER KNOTEN-KARTIERUNG",
                    description: "Die Zürcher Koordinatenkartierung erfordert Präzisionsgeometrie. Berechnen Sie Abstand, Mittelpunkt und Steigung zwischen Stadtknoten."
                },
                stages: {
                    distance: "ABSTAND",
                    midpoint: "MITTELPUNKT",
                    slope: "STEIGUNG",
                    distance_prompt_latex: "\\text{Berechnen Sie den Abstand }d\\text{ zwischen den Punkten A und B.}",
                    midpoint_prompt_latex: "\\text{Berechnen Sie die Mittelpunktkoordinaten }M(x,y).",
                    slope_prompt_latex: "\\text{Berechnen Sie die Steigung }m\\text{ der Geraden durch A und B.}"
                },
                formulas: {
                    distance: "d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}",
                    midpoint: "M = (\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2})",
                    slope: "m = \\frac{y_2-y_1}{x_2-x_1}"
                }
            },
        sm1_03_new: {
                back: "Zurück zum Nexus",
                title: "SM1.03 // UNTER NULL",
                difficulty: {
                    basic: "BASIS", core: "KERN", advanced: "ERWEITERT", elite: "ELITE"
                },
                next: "Nächste Sequenz ausführen",
                check: "Verifizieren",
                correct: "Verifiziert",
                incorrect: "Fehlreaktion",
                ready: "Bereit",
                monitor_title: "SM1.03_GANZZAHL_MONITOR",
                footer_left: "SM1.03_UNTER_NULL // KNOTEN: BASEL",
                basel_scenario: "BASLER WINTERSZENARIO",
                scenario_title: "PROBLEMKONTEXT",
                calculate_title: "BERECHNEN",
                answer_title: "IHRE ANTWORT",
                solution_title: "LÖSUNG",
                stages: {
                    number_line: "ZAHLENGERADE",
                    rationals: "RATIONALE ZAHLEN",
                    quadrants: "QUADRANTEN"
                },
                scenarios: {
                    number_line: "Basler Wintertemperaturen: Sie überwachen die Temperaturen am EuroAirport Basel im Winter. Die Temperaturen fallen oft unter Null. Das Verständnis negativer Zahlen ist wichtig zum Ablesen von Thermometern und zum Vergleichen von Temperaturen. Die Zahlengerade hilft, ganze Zahlen und ihre Beziehungen zu visualisieren.",
                    rationals: "Rhein-Wasserstände: Der Rhein-'Pegel' (Wasserstandsanzeiger) in Basel zeigt die Wassertiefe. Normaler Stand ist +5m. Bei Dürre sinkt er. Taucher messen die Tiefe unter der Oberfläche als negative Werte. Rationale Zahlen (Brüche und Dezimalzahlen) ermöglichen präzise Messungen.",
                    quadrants: "Basler Stadtgitter-Navigation: Markieren Sie Basler Sehenswürdigkeiten auf einem Koordinatengitter. Grossbasel (Q1: +,+), Kleinbasel (Q2: -,+), Klybeck (Q3: -,-), St. Alban (Q4: +,-). Das Verständnis von Quadranten hilft bei der Navigation in der Stadt und der präzisen Positionsbestimmung."
                },
                problems: {
                    nl_identify_neg3: "Lokalisieren Sie -3 auf der Zahlengeraden.",
                    nl_identify_5: "Lokalisieren Sie 5 auf der Zahlengeraden.",
                    nl_temp_neg2: "Die Temperatur beträgt -2°C. Markieren Sie dies auf dem Thermometer.",
                    nl_depth_neg4: "Ein Taucher ist 4 Meter unter der Oberfläche. Markieren Sie -4m.",
                    nl_identify_0: "Lokalisieren Sie Null (den Ursprung) auf der Zahlengeraden.",
                    nl_compare_neg5_neg2: "Was ist kälter: -5°C oder -2°C?",
                    nl_compare_neg3_1: "Was ist kleiner: -3 oder 1?",
                    nl_order_three: "Ordnen Sie diese Zahlen: -4, 0, 3. Was ist der mittlere Wert?",
                    nl_rhine_level: "Der Rheinpegel sinkt von +5m auf -3m. Was ist der neue Pegel?",
                    nl_temp_drop: "Die Temperatur sinkt von 2°C um 7 Grad. Was ist die Endtemperatur?",
                    nl_distance_abs: "Was ist die Entfernung zwischen -5 und 2 auf der Zahlengeraden?",
                    nl_abs_value: "Was ist der Absolutwert von -8?",
                    nl_distance_neg_neg: "Was ist die Entfernung zwischen -7 und -3?",
                    nl_midpoint: "Was ist der Mittelpunkt zwischen -6 und 4?",
                    nl_temp_range: "Die Temperatur reicht von -8°C bis 5°C. Was ist der Bereich?",
                    nl_operation_add: "Berechnen Sie: -5 + 3",
                    nl_operation_sub: "Berechnen Sie: -3 - 4",
                    nl_operation_mult: "Berechnen Sie: -4 × 2",
                    nl_multi_step: "Berechnen Sie: -6 + 8 - 5",
                    nl_complex_op: "Berechnen Sie: (-2 + 5) - (3 - 7)",
                    r_place_half: "Lokalisieren Sie 0,5 auf der Zahlengeraden.",
                    r_place_neg_half: "Lokalisieren Sie -0,5 auf der Zahlengeraden.",
                    r_place_1_5: "Lokalisieren Sie 1,5 auf der Zahlengeraden.",
                    r_place_neg2_5: "Lokalisieren Sie -2,5 auf der Zahlengeraden.",
                    r_fraction_third: "Konvertieren Sie 1/3 in Dezimalzahl (auf 2 Stellen runden).",
                    r_compare_fractions: "Was ist größer: -1/2 oder -1/3?",
                    r_compare_decimals: "Was ist kleiner: -0,75 oder -0,5?",
                    r_order_mixed: "Ordnen Sie: -1,5, -0,5, 0,5. Was ist das Kleinste?",
                    r_add_decimals: "Berechnen Sie: 0,5 + 0,25",
                    r_sub_decimals: "Berechnen Sie: 1,5 - 2,25",
                    r_compare_neg_decimals: "Was ist kälter: -0,75°C oder -0,8°C?",
                    r_fraction_to_decimal: "Konvertieren Sie -3/4 in Dezimalzahl.",
                    r_mult_decimals: "Berechnen Sie: 0,5 × 1,5",
                    r_div_decimals: "Berechnen Sie: 1,5 ÷ 0,5",
                    r_mixed_operations: "Berechnen Sie: 0,5 + 1,25 - 0,75",
                    r_order_complex: "Ordnen Sie von klein nach groß: -1,5, -3/2, 0, 1,2. Was ist das Erste?",
                    r_fraction_operations: "Berechnen Sie: 1/2 + 1/4 (als Dezimalzahl)",
                    r_neg_fraction_ops: "Berechnen Sie: -1/2 - 1/4 (als Dezimalzahl)",
                    r_complex_decimal: "Berechnen Sie: (0,5 - 1,25) × 2",
                    r_repeating_decimal: "Konvertieren Sie 2/3 in Dezimalzahl (auf 2 Stellen runden).",
                    q_identify_point: "Was ist die x-Koordinate des Punktes (2, 3)?",
                    q_identify_y: "Was ist die y-Koordinate des Punktes (3, 4)?",
                    q_plot_positive: "Zeichnen Sie Punkt (1, 2). Was ist x?",
                    q_origin: "Was ist die x-Koordinate am Ursprung?",
                    q_axis_point: "Punkt (3, 0) liegt auf welcher Achse? Was ist y?",
                    q_quadrant_2: "Punkt (-2, 5) liegt in welchem Quadranten?",
                    q_quadrant_3: "Punkt (-3, -4) liegt in welchem Quadranten?",
                    q_quadrant_4: "Punkt (4, -2) liegt in welchem Quadranten?",
                    q_basel_landmarks: "Kleinbasel liegt bei (-3, 2). Was ist x?",
                    q_distance_horizontal: "Entfernung zwischen (2, 0) und (5, 0)?",
                    q_reflect_x_axis: "Spiegeln Sie (3, 4) an der x-Achse. Was ist y'?",
                    q_reflect_y_axis: "Spiegeln Sie (5, 2) an der y-Achse. Was ist x'?",
                    q_reflect_origin: "Spiegeln Sie (3, 4) am Ursprung. Was ist x'?",
                    q_translate: "Verschieben Sie (2, 3) um (4, 0). Was ist x'?",
                    q_midpoint_2d: "Mittelpunkt zwischen (2, 3) und (6, 3). Was ist x?",
                    q_distance_vertical: "Entfernung zwischen (0, 5) und (0, -3)?",
                    q_perimeter_rectangle: "Rechteck mit Ecken bei (0,0) und (4,3). Umfang?",
                    q_area_rectangle: "Rechteck mit Ecken bei (0,0) und (4,3). Fläche?",
                    q_diagonal_distance: "Horizontale Entfernung von (2, 3) bis (6, 5)?",
                    q_complex_translation: "Start bei (2, 3), bewege rechts 3, links 1. Finales x?"
                }
            },
        sm1_04_new: {
                back: "Zurück zum Nexus",
                title: "SM1.04 // GLEICHUNGSWAAGE",
                difficulty: {
                    basic: "BASIS", core: "KERN", advanced: "ERWEITERT", elite: "ELITE"
                },
                next: "Nächste Sequenz ausführen",
                check: "Verifizieren",
                correct: "Verifiziert",
                incorrect: "Fehlreaktion",
                ready: "Bereit",
                monitor_title: "SM1.04_GLEICHUNGS_MONITOR",
                footer_left: "SM1.04_GLEICHUNGSWAAGE // KNOTEN: BASEL",
                basel_scenario: "BASLER GLEICHUNGSSZENARIO",
                scenario_title: "PROBLEMKONTEXT",
                solve_title: "GLEICHUNG LÖSEN",
                answer_title: "IHRE ANTWORT",
                solution_title: "LÖSUNG",
                stages: {
                    balance: "WAAGE",
                    solve: "LÖSEN",
                    transform: "TRANSFORMIEREN",
                    applications: "ANWENDUNGEN"
                },
                scenarios: {
                    balance: "Gleichungswaage verstehen: Wie eine Waage müssen Gleichungen im Gleichgewicht bleiben. Was Sie auf der einen Seite tun, müssen Sie auch auf der anderen tun. Dieses Grundprinzip ist der Schlüssel zum Lösen aller Gleichungen.",
                    solve: "Lineare Gleichungen lösen: Verwenden Sie Umkehroperationen, um die Variable zu isolieren. Addieren/Subtrahieren, um Konstanten zu verschieben, Multiplizieren/Dividieren, um Koeffizienten zu entfernen. Jeder Schritt bringt Sie der Lösung von x näher.",
                    transform: "Gleichungen transformieren: Meistern Sie die Kunst, Therme über das Gleichheitszeichen zu verschieben. Fassen Sie gleiche Terme zusammen, lösen Sie Klammern auf und vereinfachen Sie Brüche. Transformieren Sie komplexe Gleichungen in einfache.",
                    applications: "Basler Praxisprobleme: Wenden Sie Gleichungen an, um reale Probleme in Basel zu lösen. Berechnen Sie Busticketpreise, Rheinpegel-Zeiten, Novartis-Labormessungen und Roche-Pharma-Konzentrationen."
                },
                problems: {
                    bal_add_both: "Addiere 2 auf beiden Seiten von x + 3 = 7",
                    bal_subtract_both: "Subtrahiere 5 von beiden Seiten von x + 5 = 8",
                    bal_multiply_both: "Multipliziere beide Seiten mit 2",
                    bal_divide_both: "Dividiere beide Seiten durch 2",
                    bal_simple_check: "Lösen durch Verschieben der Konstante",
                    bal_two_steps: "Zuerst 3 subtrahieren, dann durch 2 dividieren",
                    bal_negative_result: "Das Ergebnis wird negativ sein",
                    bal_fraction_coeff: "Zuerst 2 subtrahieren, dann mit 3 multiplizieren",
                    bal_both_sides_x: "x-Terme auf eine Seite verschieben",
                    bal_distribute: "Zuerst Klammern auflösen",
                    bal_complex_both: "Variablen auf beiden Seiten",
                    bal_fractions: "Gemeinsamen Nenner finden",
                    bal_parentheses_both: "Klammern auf beiden Seiten zuerst auflösen",
                    bal_decimal_coeff: "Mit Dezimalzahlen arbeiten",
                    bal_negative_coeff: "Negativer Koeffizient",
                    bal_nested_parens: "Innere Klammern zuerst vereinfachen",
                    bal_three_fractions: "Drei Brüche mit unterschiedlichen Nennern",
                    bal_complex_distribute: "Mehrfache Verteilungsschritte",
                    bal_reciprocal: "Reziproke Brüche",
                    bal_proportion: "Proportionsgleichung",
                    sol_one_step_add: "Ein Schritt: 3 subtrahieren",
                    sol_one_step_sub: "Ein Schritt: 5 addieren",
                    sol_one_step_mult: "Ein Schritt: durch 3 dividieren",
                    sol_one_step_div: "Ein Schritt: mit 4 multiplizieren",
                    sol_negative_simple: "Ergebnis ist negativ",
                    sol_two_step_1: "Zwei Schritte: subtrahieren dann dividieren",
                    sol_two_step_2: "Zwei Schritte: addieren dann multiplizieren",
                    sol_negative_coeff: "Negativer Koeffizient",
                    sol_fraction_result: "Antwort ist ein Bruch",
                    sol_decimal_coeff: "Dezimalkoeffizient",
                    sol_combine_like: "Zuerst gleiche Terme zusammenfassen",
                    sol_distribute_simple: "Verteilen dann lösen",
                    sol_x_both_sides: "Variablen auf beiden Seiten",
                    sol_fraction_both: "Brüche addieren",
                    sol_negative_both: "Negative Terme auf beiden Seiten",
                    sol_complex_distribute: "Komplexe Verteilung",
                    sol_nested_parens: "Verschachtelte Klammern",
                    sol_three_terms: "Drei Bruchterme",
                    sol_decimal_complex: "Dezimalzahl mit Klammern",
                    sol_proportion_eq: "Proportionsgleichung",
                    tra_move_constant: "Konstante auf die rechte Seite verschieben",
                    tra_move_variable: "Variablenterm verschieben",
                    tra_isolate_x: "x durch Division isolieren",
                    tra_two_moves: "Zwei Transformationsschritte",
                    tra_negative_move: "Negativen Term verschieben",
                    tra_collect_terms: "Gleiche Terme sammeln",
                    tra_move_both: "Terme von beiden Seiten verschieben",
                    tra_expand_first: "Vor dem Verschieben auflösen",
                    tra_fraction_clear: "Zuerst Bruch beseitigen",
                    tra_negative_coeff: "Negativen Koeffizienten behandeln",
                    tra_multi_step: "Mehrere Transformationsschritte",
                    tra_both_expand: "Beide Seiten auflösen",
                    tra_fractions_lcd: "KGV für Brüche finden",
                    tra_decimal_expand: "Dezimalausdruck auflösen",
                    tra_complex_collect: "Komplexe Termsammlung",
                    tra_nested_complex: "Verschachtelte Klammern-Transformation",
                    tra_three_fractions: "Drei Brüche kombinieren",
                    tra_double_expand: "Doppelte Auflösung",
                    tra_proportion_cross: "Kreuzmultiplikation",
                    tra_mixed_complex: "Gemischte Brüche und Dezimalzahlen",
                    app_bus_ticket: "Basel BVB Bus: Erwachsenenticket kostet x CHF. Kinderticket ist 2 CHF günstiger. Wenn Erwachsenenticket 5 CHF ist, finde x.",
                    app_rhine_time: "Rheinfähre: Überfahrt dauert 2x Minuten. Hin- und Rückfahrt dauert 10 Minuten. Finde x.",
                    app_age_simple: "Altersproblem: In 5 Jahren wirst du 12 sein. Wie alt bist du jetzt?",
                    app_distance_simple: "Basel nach Zürich: Die halbe Strecke ist 6 km. Finde die Gesamtstrecke.",
                    app_price_discount: "Roche Cafeteria: Nach 10 CHF Rabatt kostet das Essen 40 CHF. Originalpreis?",
                    app_tram_tickets: "Basel Tram: 3 Erwachsenentickets zu je x CHF, plus 2 Kindertickets zu je 2 CHF, insgesamt 13 CHF. Finde x.",
                    app_novartis_samples: "Novartis Labor: 5 Boxen mit je x Proben, plus 10 zusätzliche Proben, insgesamt 60. Finde x.",
                    app_age_sum: "Vater und Sohn: Sohn ist x Jahre alt, Vater ist 30 Jahre älter. Zusammen sind sie 50. Finde das Alter des Sohnes.",
                    app_rectangle_perimeter: "Basel Park: Rechteckiger Garten, Länge 8m, Breite x m, Umfang 28m. Finde die Breite.",
                    app_speed_distance: "Basel nach Liestal: Fahre 2 Stunden mit x km/h, Strecke 80 km. Finde die Geschwindigkeit.",
                    app_roche_concentration: "Roche Labor: Mische 50ml x% Lösung mit 100ml 30% Lösung zu 150ml 40% Lösung. Finde x.",
                    app_consecutive_numbers: "Drei aufeinanderfolgende Zahlen summieren sich zu 48. Finde die erste Zahl.",
                    app_work_rate: "Basel Baustelle: Arbeiter A braucht x Stunden, Arbeiter B braucht 6 Stunden. Zusammen schaffen sie es in 2 Stunden. Finde x.",
                    app_mixture_problem: "Novartis: Mische x Liter 20% Lösung mit 10 Litern 50% Lösung zu 30% Lösung. Finde x.",
                    app_investment_interest: "Basel Bank: Investiere x CHF zu 5% Zinsen. Nach 1 Jahr sind es 2100 CHF. Finde x.",
                    app_train_meeting: "Basel-Zürich Züge: Zug A mit 80 km/h, Zug B mit 100 km/h, 360 km entfernt. Wann treffen sie sich?",
                    app_age_ratio: "Altersverhältnis: In 5 Jahren wird dein Alter zu dem deines Bruders 2:3 sein. Du bist jetzt x Jahre alt. Finde x.",
                    app_compound_mixture: "Roche: Füge x Liter reine Säure zu 20 Litern 30% Säure hinzu, um 50% Lösung zu erhalten. Finde x.",
                    app_boat_current: "Rheinboot: 30 km flussabwärts und zurück dauert 5 Stunden. Strömung ist 2 km/h. Finde Bootgeschwindigkeit im stillen Wasser.",
                    app_profit_loss: "Basel Geschäft: Verkauf mit 20% Gewinn oder 10% Verlust, Differenz ist 60 CHF. Finde Einkaufspreis."
                }
            },
        sm1_05_new: {
                back: "Zurück zum Nexus",
                title: "SM1.05 // PROPORTIONS-LABOR",
                difficulty: {
                    basic: "BASIS", core: "KERN", advanced: "ERWEITERT", elite: "ELITE"
                },
                next: "Nächste Sequenz ausführen",
                check: "Verifizieren",
                correct: "Verifiziert",
                incorrect: "Fehlreaktion",
                ready: "Bereit",
                monitor_title: "SM1.05_PROPORTION_MONITOR",
                footer_left: "SM1.05_PROPORTIONS_LABOR // KNOTEN: BASEL",
                stages: {
                    recipes: "REZEPTE",
                    percent: "PROZENT",
                    mixtures: "MISCHUNGEN"
                },
                labels: {
                    ratio: "Verhältnis",
                    proportion: "Proportion",
                    percentage: "Prozentsatz",
                    concentration: "Konzentration",
                    solute: "Gelöster Stoff",
                    solvent: "Lösungsmittel"
                }
            },
        sm2_08: {
                back: "Zurück zum Nexus",
                title: "SM2.08 // WAHRSCHEINLICHKEIT GRUNDLAGEN",
                difficulty: {
                    basic: "BASIS", core: "KERN", advanced: "ERWEITERT", elite: "ELITE"
                },
                next: "Nächste Sequenz ausführen",
                check: "Verifizieren",
                correct: "Verifiziert",
                incorrect: "Fehlreaktion",
                ready: "Bereit",
                monitor_title: "SM2.08_WAHRSCHEINLICHKEIT_MONITOR",
                footer_left: "SM2.08_WAHRSCHEINLICHKEIT // KNOTEN: BASEL",
                formula_title: "WAHRSCHEINLICHKEITSFORMEL",
                scenario_title: "PROBLEM",
                basel_scenario: "BASLER LEBENSSZENARIO",
                calculate_title: "BERECHNEN",
                answer_title: "IHRE ANTWORT",
                solution_title: "LÖSUNG",
                stages: {
                    basic_prob: "GRUNDWAHRSCHEINLICHKEIT",
                    lottery: "LOTTERIE & SPIELE",
                    combined: "KOMBINIERTE EREIGNISSE",
                    data_stats: "DATENSTATISTIK"
                },
                scenarios: {
                    bus_punctuality: "Basler Öffentlicher Verkehr: Sie nehmen jeden Tag den Bus #8 zur Schule.",
                    weather_basel: "Basler Wetterstation: Meteorologische Daten für Entscheidungen.",
                    school_cafeteria: "Schulmensa: Wöchentliche Menüplanung.",
                    exam_results: "Klassenleistung: Prüfungsergebnisanalyse.",
                    dice_game: "Wahrscheinlichkeitsspiel: Faire Würfel verstehen.",
                    card_game: "Kartenspiel: Standard 52-Karten-Deck.",
                    dice_advanced: "Fortgeschrittene Würfel: Primzahlen und spezielle Ergebnisse.",
                    school_raffle: "Schulwohltätigkeitsverlosung: Unterstützung der lokalen Gemeinschaft.",
                    fasnacht_game: "Basler Fasnacht: Spielstand auf dem Festival.",
                    swiss_lotto_simple: "Swiss Lotto vereinfacht: Lotteriequoten verstehen (6 aus 3).",
                    dice_win_condition: "Fasnacht-Würfelspiel: Gewinnen bei Summe 7 oder 11.",
                    two_buses: "Tägliches Pendeln: Zuverlässigkeit von Morgen- und Abendbussen.",
                    fc_basel: "FC Basel Spiele: Heim- und Auswärtsspielvorhersagen.",
                    novartis_qc: "Novartis Qualitätskontrolle: Pharmazeutische Probenprüfung.",
                    three_events: "Mehrfaches Münzwerfen: Kombinationen verstehen.",
                    temperature: "Basler Wetter: Wöchentliche Temperaturverfolgung.",
                    test_scores: "Klassennoten: Statistische Analyse der Prüfungsergebnisse.",
                    pocket_money: "Persönliche Finanzen: Monatliche Ausgabenaufschlüsselung.",
                    data_comparison: "Datenanalyse: Mittelwert und Median vergleichen.",
                    tram_punctuality: "Basler Tramsystem: Tram #3 Zuverlässigkeit.",
                    coin_flip: "Münzwurf: Grundlegendes Wahrscheinlichkeitsexperiment.",
                    dice_two: "Zwei Würfel: Kombinierte Ergebnisse verstehen.",
                    two_coins: "Zwei Münzen: Unabhängige Ereignisse.",
                    three_buses: "Drei Buslinien: Mehrere unabhängige Ereignisse.",
                    four_buses: "Vier Buslinien: Erweiterte Wahrscheinlichkeitsketten.",
                    complex_event: "Komplexe Wahrscheinlichkeit: Fortgeschrittene Szenarien.",
                },
                problems: {
                    bus_ontime_16_20: "In den letzten 20 Tagen kam der Bus 16 Mal pünktlich. Wahrscheinlichkeit für morgen?",
                    bus_ontime_18_20: "In den letzten 20 Tagen kam der Bus 18 Mal pünktlich. Wahrscheinlichkeit für morgen?",
                    weather_rain_12_30: "Wetterstation: 12 von 30 Tagen Regen. Regenwahrscheinlichkeit am Wochenende?",
                    weather_sunny_21_30: "Wetterstation: 21 von 30 Tagen sonnig. Wahrscheinlichkeit für morgen?",
                    dice_roll_3: "Würfeln Sie. Wahrscheinlichkeit für eine 3?",
                    coin_heads: "Münzwurf. Wahrscheinlichkeit für Kopf?",
                    cafeteria_pizza: "Mensa serviert 3 von 5 Tagen Pizza. Wahrscheinlichkeit?",
                    exam_pass: "100 Schüler, 85 bestanden. Wahrscheinlichkeit für zufälligen Schüler?",
                    tram_ontime_17_20: "Tram #3: 17 von 20 Tagen pünktlich. Wahrscheinlichkeit heute?",
                    dice_greater_4: "Würfeln. Wahrscheinlichkeit für Zahl > 4?",
                    dice_even: "Würfeln. Wahrscheinlichkeit für gerade Zahl (2,4,6)?",
                    card_heart: "Karte ziehen. Wahrscheinlichkeit für Herz?",
                    card_red: "Karte ziehen. Wahrscheinlichkeit für rote Karte?",
                    two_dice_sum_8: "Zwei Würfel. Wahrscheinlichkeit für Summe 8?",
                    card_face: "Karte ziehen. Wahrscheinlichkeit für Bildkarte (J,Q,K)?",
                    dice_prime: "Würfeln. Wahrscheinlichkeit für Primzahl (2,3,5)?",
                    two_dice_sum_10: "Zwei Würfel. Wahrscheinlichkeit für Summe 10?",
                    card_ace_or_king: "Karte ziehen. Wahrscheinlichkeit für Ass oder König?",
                    two_dice_doubles: "Zwei Würfel. Wahrscheinlichkeit für Pasch?",
                    card_spade_face: "Karte ziehen. Wahrscheinlichkeit für Pik-Bildkarte?",
                    school_raffle_win: "100 Lose verkauft, Sie kauften 3. Gewinnwahrscheinlichkeit?",
                    school_raffle_5_tickets: "100 Lose verkauft, Sie kauften 5. Gewinnwahrscheinlichkeit?",
                    coin_two_heads: "Zwei Münzen werfen. Wahrscheinlichkeit für beide Kopf?",
                    dice_not_six: "Würfeln. Wahrscheinlichkeit für NICHT 6?",
                    school_raffle_2_tickets: "50 Lose verkauft, Sie kauften 2. Gewinnwahrscheinlichkeit?",
                    dice_sum_7: "Zwei Würfel bei Fasnacht. Wahrscheinlichkeit für Summe 7?",
                    dice_sum_9: "Zwei Würfel. Wahrscheinlichkeit für Summe 9?",
                    coin_three_all_heads: "Drei Münzen. Wahrscheinlichkeit für alle Kopf?",
                    dice_sum_6: "Zwei Würfel. Wahrscheinlichkeit für Summe 6?",
                    card_two_red: "Zwei Karten ohne Zurücklegen. Beide rot?",
                    lotto_simple: "Lotto: 3 aus 6 wählen. 20 Kombinationen. Gewinnwahrscheinlichkeit?",
                    lotto_4_from_8: "Lotto: 4 aus 8 wählen. 70 Kombinationen. Gewinnwahrscheinlichkeit?",
                    dice_sum_less_5: "Zwei Würfel. Wahrscheinlichkeit für Summe < 5?",
                    coin_four_at_least_3_heads: "Vier Münzen. Wahrscheinlichkeit für mindestens 3 Kopf?",
                    card_three_hearts: "Drei Karten ohne Zurücklegen. Alle Herz?",
                    dice_sum_7_or_11: "Fasnacht: Zwei Würfel. Summe 7 oder 11 gewinnt. Wahrscheinlichkeit?",
                    dice_sum_2_3_12: "Fasnacht: Zwei Würfel. Summe 2, 3 oder 12 verliert. Wahrscheinlichkeit?",
                    lotto_5_from_10: "Lotto: 5 aus 10. 252 Kombinationen. Gewinnwahrscheinlichkeit?",
                    coin_five_exactly_2_heads: "Fünf Münzen. Wahrscheinlichkeit für genau 2 Kopf?",
                    card_poker_pair: "5 Karten. Wahrscheinlichkeit für mindestens ein Paar? (ca. 42.3%)",
                    two_buses_ontime: "Bus #8: 80% pünktlich, Bus #15: 70% pünktlich. Beide pünktlich?",
                    two_coins_both_heads: "Zwei Münzen. Beide Kopf?",
                    two_dice_both_even: "Zwei Würfel. Beide gerade?",
                    two_days_both_sunny: "Basel: 70% sonnig. Heute und morgen beide sonnig?",
                    two_students_both_pass: "Zwei Schüler, 85% Bestehensrate. Beide bestehen?",
                    fc_basel_wins: "FC Basel: 60% Heimsieg, 30% Auswärtssieg. Beide Spiele gewinnen?",
                    three_buses_all_ontime: "Drei Busse: 80%, 75%, 90% pünktlich. Alle pünktlich?",
                    three_days_all_sunny: "Basel: 70% sonnig. Nächste 3 Tage alle sonnig?",
                    three_dice_all_six: "Drei Würfel. Alle zeigen 6?",
                    fc_basel_at_least_one_win: "FC Basel: 60% Heim, 30% Auswärts. Mindestens ein Sieg?",
                    quality_all_pass: "Novartis: 5 Proben, je 95% Bestehensrate. Alle bestehen?",
                    quality_at_least_4_pass: "Novartis: 5 Proben, 95% Rate. Mindestens 4 bestehen?",
                    four_buses_all_ontime: "Vier Busse, je 80% pünktlich. Alle pünktlich?",
                    week_no_rain: "Basel: 40% Regenwahrscheinlichkeit täglich. 7 Tage kein Regen?",
                    five_students_all_pass: "Fünf Schüler, 85% Bestehensrate. Alle bestehen?",
                    three_coins_two_heads: "Drei Münzen. Genau 2 Kopf?",
                    four_coins_exactly_3_heads: "Vier Münzen. Genau 3 Kopf?",
                    quality_exactly_4_pass: "Novartis: 5 Proben, 95% Rate. Genau 4 bestehen?",
                    five_coins_at_least_4_heads: "Fünf Münzen. Mindestens 4 Kopf?",
                    birthday_paradox_simple: "Zwei Personen: Gleicher Geburtstag? (ohne Schaltjahre)",
                    avg_temperature: "Basel Temperaturen: 18°C, 22°C, 20°C, 19°C, 21°C, 23°C, 20°C. Durchschnitt?",
                    simple_average_5: "Noten: 80, 85, 90, 75, 95. Durchschnitt?",
                    simple_sum: "Ausgaben: Essen CHF 40, Transport CHF 25, Unterhaltung CHF 20, Sparen CHF 15. Summe?",
                    avg_temperature_5_days: "Temperaturen: 15°C, 18°C, 20°C, 17°C, 20°C. Durchschnitt?",
                    median_5_values: "Daten: 10, 12, 15, 18, 20. Median?",
                    class_average: "Klassennoten: 85, 72, 90, 68, 78, 82, 75, 88, 70, 92. Durchschnitt?",
                    spending_analysis: "Ausgaben: Essen CHF 40, Transport CHF 25, Unterhaltung CHF 20, Sparen CHF 15. Prozent für Essen?",
                    median_even_count: "Noten: 70, 75, 80, 85. Median?",
                    range_calculation: "Temperaturen: 15°C, 18°C, 20°C, 17°C, 23°C. Spannweite (Max-Min)?",
                    percentage_transport: "Budget CHF 100: Essen 40, Transport 25, Unterhaltung 20, Sparen 15. Prozent Transport?",
                    weighted_average: "Zwei Tests: Test 1 (Gewicht 2): 80, Test 2 (Gewicht 3): 90. Gewichteter Durchschnitt?",
                    median_vs_mean: "Daten: 10, 12, 15, 18, 20. Median?",
                    mode_calculation: "Noten: 80, 85, 85, 90, 85, 75. Modus (häufigster Wert)?",
                    budget_remaining: "Budget CHF 100. Ausgegeben: Essen 40, Transport 25, Unterhaltung 20. Rest?",
                    quartile_calculation: "Temperaturen: 15°C, 17°C, 18°C, 20°C, 23°C. Q1 (25. Perzentil)?",
                    standard_deviation_simple: "Daten: 10, 15, 20. Mittelwert=15. Varianz berechnen.",
                    outlier_effect: "Daten: 10, 12, 15, 18, 100. Mittelwert? Beachten Sie den Ausreißer (100).",
                    interquartile_range: "Daten: 10, 15, 20, 25, 30. Q1=15, Q3=25. IQR = Q3 - Q1?",
                    percentage_change: "Letzter Monat: CHF 100. Dieser Monat: CHF 120. Prozentuale Änderung?",
                    correlation_direction: "Mehr Lernzeit → höhere Noten. Korrelation positiv (1) oder negativ (-1)?",
                }
            },
        gp5_01: {
                back: "Zurück zum Nexus",
                title: "P5.01 // DER ATOMKERN",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "ERWEITERT",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Isotop / Zerfall",
                next: "Nächste Sequenz ausführen",
                check: "Verifizieren",
                correct: "Verifiziert",
                incorrect: "Fehlreaktion",
                ready: "Bereit",
                monitor_title: "P5.01_KERNPHYSIK_MONITOR",
                footer_left: "P5.01_MODERNE_PHYSIK // KNOTEN: BASEL",
                labels: {
                    input: "EINGABEPARAMETER",
                    hints: "HINWEISE",
                    balancing: "KERNREAKTIONSGLEICHUNG",
                    mass: "Massenzahl (A)",
                    atomic: "Ordnungszahl (Z)"
                },
                mission: {
                    title: "KERN STABILISIEREN",
                    description: "Der Novartis Innovation District benötigt ein stabiles Isotop. Gleichen Sie die Kernreaktionsgleichung aus, indem Sie die richtigen Zerfallsteilchen identifizieren."
                },
                stages: {
                    alpha: "ALPHA-ZERFALL",
                    beta: "BETA-ZERFALL",
                    gamma: "GAMMA-STRAHLUNG",
                    fission: "KERNSPALTUNG",
                    alpha_decay: "ALPHA-ZERFALL",
                    beta_decay: "BETA-ZERFALL",
                    gamma_decay: "GAMMA-ZERFALL",
                    alpha_decay_prompt_latex: "\\text{Gleichen Sie die Gleichung für den Alpha-Zerfall (\\alpha) aus.}",
                    beta_decay_prompt_latex: "\\text{Gleichen Sie die Gleichung für den Beta-Zerfall (\\beta^-) aus.}",
                    gamma_decay_prompt_latex: "\\text{Identifizieren Sie den Zustand der Gamma-Strahlung (\\gamma).}",
                    fission_prompt_latex: "\\text{Bestimmen Sie das fehlende Produkt in dieser Spaltungsreaktion.}"
                }
            },
        gp5_02: {
                back: "Zurück zum Nexus",
                title: "P5.02 // RELATIVITÄTSLABOR",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "ERWEITERT",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Relativistische Effekte",
                next: "Nächste Sequenz ausführen",
                check: "Verifizieren",
                correct: "Verifiziert",
                incorrect: "Fehlreaktion",
                ready: "Bereit",
                monitor_title: "P5.02_RELATIVITÄTS_MONITOR",
                footer_left: "P5.02_SPEZIELLE_RELATIVITÄT // KNOTEN: CERN",
                labels: {
                    input: "EINGABE",
                    hints: "HINWEISE",
                    velocity: "Geschwindigkeit (v/c)",
                    gamma: "Lorentz-Faktor (γ)",
                    length: "Kontrahierte Länge",
                    time: "Dilatierte Zeit"
                },
                mission: {
                    title: "EINSTEINS LABOR",
                    description: "Bei CERN kalibriere den Teilchenbeschleuniger durch Berechnung relativistischer Effekte bei nahezu Lichtgeschwindigkeit."
                },
                stages: {
                    lorentz: "LORENTZ-FAKTOR",
                    contraction: "LÄNGENKONTRAKTION",
                    dilation: "ZEITDILATATION",
                    lorentz_prompt_latex: "\\text{Berechne den Lorentz-Faktor }\\gamma\\text{ bei Geschwindigkeit }v.",
                    contraction_prompt_latex: "\\text{Berechne die kontrahierte Länge }L=L_0/\\gamma.",
                    dilation_prompt_latex: "\\text{Berechne die dilatierte Zeit }T=T_0\\times\\gamma."
                }
            },
        sp2_02: {
                back: "Zurück zum Nexus",
                title: "SP2.02 // SCHALTKREIS-SANDBOX 2.0",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "ERWEITERT",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Schaltkreisanalyse",
                next: "Nächste Sequenz ausführen",
                check: "Verifizieren",
                correct: "Verifiziert",
                incorrect: "Fehlreaktion",
                ready: "Bereit",
                monitor_title: "SP2.02_SCHALTKREIS_MONITOR",
                footer_left: "SP2.02_SCHALTKREIS_SANDBOX // KNOTEN: BASEL",
                labels: {
                    multimeter: "MULTIMETER",
                    oscilloscope: "OSZILLOSKOP",
                    resistance: "WIDERSTAND",
                    capacitance: "KAPAZITÄT",
                    inductance: "INDUKTIVITÄT",
                    voltage: "SPANNUNG",
                    analysis: "SCHALTKREISANALYSE",
                    damping: "DÄMPFUNGSTYP",
                    formulas: "RLC-FORMELN",
                    reset: "ZURÜCKSETZEN"
                },
                mission: {
                    title: "MISSION: RLC-TRANSIENTEN-ANALYSE",
                    description: "Bauen und analysieren Sie RLC-Schaltkreise. Verwenden Sie das Multimeter zur Messung von Spannung und Strom. Beobachten Sie transiente Antworten auf dem Oszilloskop."
                },
                stages: {
                    build: "SCHALTKREIS BAUEN",
                    measure: "WERTE MESSEN",
                    analyze: "ANTWORT ANALYSIEREN",
                    build_desc: "Widerstände, Kondensatoren und Spulen verbinden",
                    measure_desc: "Multimeter zur Messung von Spannung und Strom verwenden",
                    analyze_desc: "Oszilloskop-Wellenformen beobachten",
                    build_hint: "Klicken Sie auf Komponenten, um sie auszuwählen",
                    measure_hint: "Wählen Sie 2 Punkte, um Spannungsabfall zu messen",
                    analyze_hint: "Achten Sie auf überdämpfte, unterdämpfte oder kritisch gedämpfte Antworten"
                }
            },
        sp4_01: {
                back: "Zurück zum Nexus",
                title: "SP3.03 // WELLENGRUNDLAGEN",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Wellenparameter",
                next: "Nächste Sequenz ausführen",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Abweichung",
                ready: "Bereit",
                monitor_title: "SP3.03_WELLEN_MONITOR",
                footer_left: "SP3.03_WELLENGRUNDLAGEN // KNOTEN: RHEIN",
                labels: {
                    wave_type: "WELLENTYP",
                    transverse: "TRANSVERSAL",
                    longitudinal: "LONGITUDINAL",
                    amplitude: "AMPLITUDE",
                    frequency: "FREQUENZ",
                    wave_speed: "WELLENGESCHWINDIGKEIT",
                    wavelength: "WELLENLÄNGE",
                    period: "PERIODE",
                    angular_freq: "KREISFREQUENZ",
                    calculated: "BERECHNETE WERTE",
                    show_particles: "Teilchenbewegung anzeigen",
                    formulas: "FORMELN"
                },
                mission: {
                    title: "MISSION: RHEIN-WELLENANALYSE",
                    description: "Studieren Sie mechanische Wellen auf dem Rhein. Meistern Sie Wellenparameter: Amplitude, Frequenz, Wellenlänge und Periode."
                },
                stages: {
                    transverse: "TRANSVERSALWELLEN",
                    longitudinal: "LONGITUDINALWELLEN",
                    parameters: "WELLENPARAMETER",
                    transverse_desc: "Beobachten Sie senkrechte Teilchenbewegung",
                    longitudinal_desc: "Studieren Sie Kompression und Verdünnung",
                    parameters_desc: "Berechnen Sie Wellenlänge, Periode und Geschwindigkeit",
                    transverse_hint: "Teilchen schwingen senkrecht zur Wellenrichtung",
                    longitudinal_hint: "Teilchen schwingen parallel zur Wellenrichtung",
                    parameters_hint: "v = λf, T = 1/f, ω = 2πf"
                }
            },
        sb1_01: {
                back: "Zurück zum Nexus",
                title: "SB1.01 // ZELLFABRIK",
                difficulty: {
                    basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Zellanalyse",
                next: "Nächste Sequenz ausführen",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Abweichung",
                ready: "Bereit",
                monitor_title: "SB1.01_ZELL_MONITOR",
                footer_left: "SB1.01_ZELLFABRIK // KNOTEN: BASEL",
                stages: {
                    identification: "IDENTIFIZIERUNG",
                    function: "FUNKTION",
                    organelles: "ORGANELLEN"
                },
                labels: {
                    cutaway_view: "Schnittansicht",
                    selected: "AUSGEWÄHLTES ORGANELL",
                    instructions: "ANWEISUNGEN",
                    nucleus: "Zellkern",
                    mitochondria: "Mitochondrien",
                    chloroplast: "Chloroplast",
                    ribosome: "Ribosom",
                    golgi: "Golgi-Apparat",
                    er: "Endoplasmatisches Retikulum",
                    membrane: "Zellmembrane",
                    vacuole: "Vakuole"
                },
                mission: {
                    title: "MISSION: ZELLERKUNDUNG",
                    description: "Erkunden Sie die tierische Zellstruktur. Identifizieren Sie Organellen und verstehen Sie ihre Funktionen in der Zellökonomie."
                },
                prompts: {
                    id_prompt: "Identifizieren Sie das in der 3D-Ansicht markierte Organell.",
                    id_target: "Markiert: ?",
                    fn_prompt: "Welches Organell ist verantwortlich für: {func}?",
                    fn_target: "Funktion: {func}",
                    hint_name: "Es ist der/die {name}",
                    hint_start: "Die Antwort beginnt mit {char}"
                },
                organelles: {
                    nucleus: {
                        name: "Zellkern",
                        func: "Kontrollzentrum / DNA-Speicher",
                        details: "Enthält DNA und steuert alle Zellaktivitäten. Das 'Gehirn' der Zelle."
                    },
                    mitochondria: {
                        name: "Mitochondrien",
                        func: "ATP-Energieproduktion (Kraftwerk)",
                        details: "Produziert ATP durch Zellatmung. Wandelt Glukose in Energie um."
                    },
                    ribosome: {
                        name: "Ribosom",
                        func: "Proteinsynthese",
                        details: "Synthetisiert Proteine durch Lesen von mRNA-Sequenzen."
                    },
                    golgi: {
                        name: "Golgi-Apparat",
                        func: "Verpackung & Transport",
                        details: "Modifiziert, verpackt und transportiert Proteine zu ihren Zielen."
                    },
                    er: {
                        name: "Endoplasmatisches Retikulum",
                        func: "Synthesenetzwerk (ER)",
                        details: "Raues ER: Proteinsynthese. Glattes ER: Lipidsynthese und Entgiftung."
                    }
                }
            },
        sb1_01_metabolic: {
                back: "Zurück zum Nexus",
                title: "SB1.01 // STOFFWECHSEL-ENGINE",
                difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Stoffwechselstatus",
                next: "Nächste Sequenz",
                check: "Überprüfen",
                correct: "Homöostase stabil",
                incorrect: "Stoffwechselkrise",
                ready: "Bereit",
                monitor_title: "SB1.01_METABOLIC_MONITOR",
                footer_left: "SB1.01_ZELLBIOLOGIE // KNOTEN: BASEL",
                stages: {
                    osmosis: "OSMOSE",
                    respiration: "ZELLATMUNG",
                    homeostasis: "HOMÖOSTASE"
                },
                labels: {
                    osmolarity: "Externe Osmolarität",
                    atp_flow: "ATP-Fluss anzeigen",
                    hypertonic: "Hypertonisch",
                    isotonic: "Isotonisch",
                    hypotonic: "Hypotonisch",
                    status: "Osmotischer Status",
                    respiration_formula: "Atmungsformel",
                    glucose: "Glukose",
                    oxygen: "Sauerstoff",
                    atp: "ATP-Energie"
                },
                prompts: {
                    osmosis_prompt: "Die Zelle befindet sich in einer {status} Umgebung. Was passiert mit dem Wasser?",
                    respiration_prompt: "Vervollständigen Sie den Reaktanten: C₆H₁₂O₆ + 6{reactant} → ...",
                    product_prompt: "Was ist das primäre Energieprodukt der Zellatmung?",
                    homeostasis_target: "Gleichen Sie die Umgebung aus, um den isotonischen Zustand zu erreichen.",
                    hint_hyper: "Hoher Salzgehalt außen! Wasser verlässt die Zelle.",
                    hint_hypo: "Niedriger Salzgehalt außen! Wasser strömt ein.",
                    hint_oxy: "Wir atmen dies ein, um Glukose zu verbrennen."
                }
            },
        sb2_01: {
                back: "Zurück zum Nexus",
                title: "SB2.01 // MENDELS GARTEN",
                difficulty: {
                    basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Genetische Kreuzung",
                next: "Nächste Sequenz ausführen",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Abweichung",
                ready: "Bereit",
                monitor_title: "SB2.01_GENETIK_MONITOR",
                footer_left: "SB2.01_MENDELS_GARTEN // KNOTEN: BASEL",
                stages: {
                    monohybrid: "MONOHYBRIDE KREUZUNG",
                    probability: "WAHRSCHEINLICHKEIT",
                    dihybrid: "DIHYBRIDE KREUZUNG"
                },
                labels: {
                    parent: "Elternteil",
                    offspring: "Nachkomme",
                    punnett_square: "PUNNETT-QUADRAT",
                    stats: "NACHKOMMEN-STATISTIK",
                    genotype_ratio: "Genotyp-Verhältnis",
                    phenotype_ratio: "Phänotyp-Verhältnis",
                    purple_flowers: "Purpurne Blüten",
                    white_flowers: "Weiße Blüten",
                    genetics_basics: "GENETIK-GRUNDLAGEN",
                    genotype_phenotype: "GENOTYP VS PHÄNOTYP",
                    dominance: "DOMINANZREGELN",
                    mendels_laws: "MENDELS GESETZE",
                    instructions: "ANWEISUNGEN"
                },
                concepts: {
                    allele: "Allel: Eine Version eines Gens",
                    dominant: "R (Dominant): Purpurne Blüte",
                    recessive: "r (Rezessiv): Weiße Blüte",
                    genotype: "Genotyp: Genetische Ausstattung (RR, Rr, rr)",
                    phenotype: "Phänotyp: Beobachtbares Merkmal (Purpur/Weiß)",
                    homozygous_dom: "RR → Purpur (Homozygot dominant)",
                    heterozygous: "Rr → Purpur (Heterozygot)",
                    homozygous_rec: "rr → Weiß (Homozygot rezessiv)",
                    law_segregation: "Segregationsgesetz: Jedes Elternteil trägt ein Allel bei",
                    law_assortment: "Unabhängigkeitsgesetz: Allele trennen sich unabhängig voneinander"
                },
                mission: {
                    title: "MISSION: MENDELSCHE GENETIK",
                    description: "Meistern Sie Mendels Vererbungsgesetze. Sagen Sie Nachkommenverhältnisse mit Punnett-Quadraten voraus."
                },
                prompts: {
                    monohybrid_ratio: "Kreuzen Sie {p1} \\times {p2}. Wie ist das phänotypische Verhältnis von Purpur zu Weiß?",
                    monohybrid_percent: "Kreuzen Sie {p1} \\times {p2}. Wie viel Prozent der Nachkommen werden purpurrot sein?",
                    prob_genotype: "Kreuzen Sie {p1} \\times {p2}. Wie hoch ist die Wahrscheinlichkeit eines {genotype} Nachkommen?",
                    ratio_target: "\\text{Verhältnis } P:W = ?",
                    percent_target: "\\text{Purpur-Prozentsatz}",
                    prob_target: "P({genotype}) = ?",
                    hint_square: "Überprüfen Sie das Punnett-Quadrat.",
                    hint_all_rr: "Alle Nachkommen sind Rr.",
                    hint_count: "{count} von 4 Quadraten."
                }
            },
        gb1_01: {
                back: "Zurück zum Nexus",
                title: "GB1.01 // EVOLUTIONSLABOR",
                difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
                objective_title: "Aktuelles Missionsziel",
                monitor_title: "Evolutions-Monitor",
                stages: {
                    natural_selection: "NATÜRLICHE SELEKTION",
                    speciation: "ARTBILDUNG",
                    evidence: "EVOLUTIONSBEWEISE"
                },
                labels: {
                    generation: "Generation",
                    selection_pressure: "Selektionsdruck",
                    evolution_score: "Evolutions-Punktzahl",
                    evolution_display: "Evolutions-Anzeige",
                    input_terminal: "Eingabe-Terminal"
                },
                prompts: {
                    natural_selection: "In einer Population von {initial} Finken überleben {survival} die Dürre. Berechne die Fitness.",
                    speciation: "Nach {generations} Generationen mit Mutationsrate {rate}, berechne die genetische Divergenz.",
                    evidence: "Ein Fossil ist {age} Jahre alt. Mit C-14 Halbwertszeit {halflife} Jahre, finde den verbleibenden Anteil.",
                    hint_fitness: "Fitness = Überlebende / Anfangspopulation",
                    hint_divergence: "Divergenz = Generationen × Mutationsrate",
                    hint_halflife: "Verbleibend = (0.5)^(Alter/Halbwertszeit)"
                },
                feedback: {
                    correct: "Natürliche Selektion bestätigt!",
                    incorrect: "Evolution braucht mehr Zeit..."
                },
                check: "Überprüfen",
                next: "Nächste Generation",
                correct: "Korrekt",
                incorrect: "Falsch",
                ready: "Bereit",
                footer_left: "GB1.01 // EVOLUTIONSLABOR"
            },
        gb3_01: {
                back: "Zurück zum Nexus",
                title: "GB3.01 // DNA-SCHMIEDE",
                difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
                objective_title: "Aktuelles Missionsziel",
                target_title: "DNA-Struktur",
                next: "Nächste Sequenz",
                check: "Überprüfen",
                correct: "Verifiziert",
                incorrect: "Fehlersignal",
                ready: "Bereit",
                monitor_title: "GB3.01_DNA_MONITOR",
                footer_left: "GB3.01_DNA_SCHMIEDE // KNOTEN: BASEL",
                stages: {
                    pairing: "BASENPAARUNG",
                    bonds: "WASSERSTOFFBRÜCKEN",
                    sequence: "SEQUENZIERUNG"
                },
                labels: {
                    rotation: "ROTATION",
                    auto_rotate: "Auto-Rotation",
                    show_bonds: "H-Brücken anzeigen",
                    highlight_pair: "BASENPAAR HERVORHEBEN",
                    pairing_rules: "PAARUNGSREGELN",
                    bases: "NUKLEOTIDBASEN",
                    structure: "DNA-STRUKTUR",
                    adenine: "Adenin",
                    thymine: "Thymin",
                    cytosine: "Cytosin",
                    guanine: "Guanin"
                },
                concepts: {
                    helix: "Doppelhelix: Zwei antiparallele Stränge",
                    backbone: "Rückgrat: Zucker-Phosphat-Einheiten",
                    at_pair: "A ↔ T: Zwei Wasserstoffbrücken",
                    gc_pair: "C ↔ G: Drei Wasserstoffbrücken",
                    polarity: "Polarität: 5' nach 3' Orientierung",
                    complementary: "Prinzip: Chargaff-Regel der Basenpaarung"
                },
                mission: {
                    title: "MISSION: DNA-ARCHITEKTUR",
                    description: "Meistere die Strukturprinzipien der DNA-Doppelhelix. Verifiziere Basenpaarungsregeln und H-Brücken-Stabilität."
                },
                prompts: {
                    pairing_prompt: "Bestimmen Sie die komplementäre Base für {base}.",
                    bonds_prompt: "Wie viele Wasserstoffbrücken verbinden {b1} und {b2}?",
                    seq_prompt: "Erstellen Sie die komplementäre Sequenz für: {seq}",
                    pairing_target: "Komplement von {base}",
                    bonds_target: "H-Brücken: ?",
                    seq_target: "Komplementär-Stream",
                    hint_at: "A paart mit T über 2 Brücken.",
                    hint_gc: "G paart mit C über 3 Brücken."
                }
            },
        sm3_04: {
                back: "Zurück zum Nexus",
                title: "SM3.04 // LOGARITHMISCHE SKALEN",
                difficulty: {
                    basic: "BASIS", core: "KERN", advanced: "ERWEITERT", elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Logarithmische Messung",
                next: "Nächste Sequenz ausführen",
                check: "Verifizieren",
                correct: "Verifiziert",
                incorrect: "Fehlreaktion",
                ready: "Bereit",
                monitor_title: "SM3.04_LOG_MONITOR",
                footer_left: "SM3.04_LOGARITHMEN // KNOTEN: BASEL",
                labels: {
                    input: "EINGABE",
                    hints: "HINWEISE",
                    ph: "pH-Wert",
                    decibel: "Dezibel (dB)",
                    richter: "Richterskala"
                },
                mission: {
                    title: "LOGARITHMISCHES MESSLABOR",
                    description: "Meistere drei reale logarithmische Skalen: pH-Wert (Chemie), Dezibel (Schall) und Richter (Erdbeben). Jede Skala komprimiert riesige Bereiche in handhabbare Zahlen."
                },
                stages: {
                    ph: "pH-SKALA",
                    decibel: "DEZIBEL",
                    richter: "RICHTER-SKALA",
                    ph_prompt_latex: "\\text{Berechnen Sie den pH-Wert mit }pH=-\\log_{10}[H^+].",
                    decibel_prompt_latex: "\\text{Berechnen Sie Dezibel mit }L=10\\log_{10}(I/I_0).",
                    richter_prompt_latex: "\\text{Berechnen Sie die Magnitude mit }M=\\log_{10}(A)."
                },
                formulas: {
                    ph: "pH = -\\log_{10}[H^+]",
                    decibel: "L = 10\\log_{10}(I/I_0)",
                    richter: "M = \\log_{10}(A)"
                },
                scenarios: {
                    ph_basic: "🧪 SZENARIO: Schulchemielabor — Dein Chemielehrer gibt dir eine klare Flüssigkeit zum Testen. Du verwendest ein pH-Meter und findest die Wasserstoffionenkonzentration [H⁺] = 0,001 mol/L (das ist 10⁻³ in wissenschaftlicher Notation). Um die Säure richtig zu melden, musst du den pH-Wert berechnen. Denk daran: pH = -log₁₀[H⁺]. Ein pH unter 7 ist sauer, pH 7 ist neutral (reines Wasser), und über 7 ist basisch. Diese Flüssigkeit ist Zitronensaft!",
                    ph_core: "🧪 SZENARIO: Schwimmbad-Wasserqualität — Du arbeitest Teilzeit im Basler Hallenbad. Der Gesundheitsinspektor verlangt tägliche pH-Tests. Die heutige Wasserprobe zeigt [H⁺] = 10⁻⁸ mol/L. Du musst den pH-Wert berechnen, um zu überprüfen, ob er im sicheren Bereich liegt (7,2-7,8). Wenn der pH zu niedrig ist (sauer), reizt es die Augen der Schwimmer. Wenn zu hoch (basisch), funktioniert Chlor nicht richtig. Deine Berechnung bestimmt, ob das Bad heute öffnen kann!",
                    ph_advanced: "🧪 SZENARIO: Pharmazeutische Qualitätskontrolle — Du bist Praktikant bei Roche in Basel. Eine neue Arzneimittelformulierung muss eine präzise pH-Kontrolle für Stabilität haben. Das Labor misst [H⁺] = 3,16 × 10⁻⁵ mol/L. Berechne den pH-Wert auf 2 Dezimalstellen. Wenn der pH außerhalb des Zielbereichs (4,3-4,7) driftet, muss die gesamte Charge (Millionen wert) entsorgt werden. Logarithmische Präzision ist in der Pharmazie entscheidend!",
                    ph_elite: "🧪 SZENARIO: Umwelt-Saurer-Regen-Studie — Universität Basel Forscher untersuchen die Auswirkungen von saurem Regen auf Schweizer Wälder. Regenwasserproben zeigen [H⁺] = 10⁻⁴·⁵ mol/L (beachte den Bruchexponenten!). Berechne den pH-Wert. Normaler Regen ist pH 5,6, aber saurer Regen kann pH 4,0 oder niedriger sein. Jede pH-Einheit repräsentiert eine 10-fache Änderung der Säure, also ist pH 4 Regen 100× saurer als pH 6 Regen. Deine Berechnung hilft, Umweltschäden zu bewerten.",
                    decibel_basic: "🔊 SZENARIO: Schulbibliothek Lärmcheck — Der Bibliothekar bittet dich zu messen, ob der Lernbereich ruhig genug ist. Du verwendest ein Schallmessgerät: die Intensität ist I = 10⁻¹⁰ W/m². Die Referenzintensität (Hörschwelle) ist I₀ = 10⁻¹² W/m². Berechne den Schallpegel in Dezibel mit L = 10·log₁₀(I/I₀). Zur Referenz: Flüstern = 30 dB, normale Konversation = 60 dB, Bibliothek sollte unter 40 dB sein.",
                    decibel_core: "🔊 SZENARIO: Konzert-Tontechniker — Du richtest ein Schulrockkonzert in der Aula ein. Das Soundsystem erzeugt eine Intensität I = 10⁻⁴ W/m² in der ersten Reihe. Berechne den Dezibelpegel. Sicherheitsvorschriften erfordern Gehörschutz über 85 dB, und längere Exposition über 100 dB verursacht Hörschäden. Deine Berechnung bestimmt, ob du die Lautstärke reduzieren oder dem Publikum Ohrstöpsel geben musst.",
                    decibel_advanced: "🔊 SZENARIO: Flughafen-Lärmverschmutzungsstudie — Der Basel-Mulhouse Flughafen expandiert, und Anwohner beschweren sich über Lärm. Du misst ein startendes Flugzeug: I = 1 W/m² in 100 Metern Entfernung. Berechne den Dezibelpegel. Stadtvorschriften begrenzen Flughafenlärm auf 65 dB tagsüber. Bei 120 dB (Düsentriebwerk) ist Schall schmerzhaft. Die logarithmische Skala bedeutet, dass 120 dB nicht 'doppelt so laut' wie 60 dB ist — es ist 1.000.000-mal intensiver!",
                    decibel_elite: "🔊 SZENARIO: Akustik-Engineering-Herausforderung — Ein Basler Konzertsaal wird entworfen. Der Architekt muss die Schallabsorption berechnen. Wenn die ursprüngliche Intensität I₁ = 10⁻³ W/m² ist und nach Akustikpaneelen auf I₂ = 10⁻⁶ W/m² sinkt, wie groß ist die Dezibelreduktion? Berechne L₁ - L₂. Dies beinhaltet das Verständnis, dass Dezibeldifferenzen Intensitätsverhältnisse darstellen: ein 10 dB Abfall bedeutet 10× weniger intensiv, 20 dB Abfall bedeutet 100× weniger intensiv.",
                    richter_basic: "🌍 SZENARIO: Erdbebenüberwachungsstation — Du bist Freiwilliger im Seismologielabor der Universität Basel. Ein kleines Erdbeben trifft in der Nähe von Basel. Das Seismograph zeichnet eine Bodenbewegungsamplitude A = 100 Mikrometer auf. Berechne die Richtermagnitude mit M = log₁₀(A). Zur Referenz: M < 2 wird nicht gefühlt, M 3-4 ist gering, M 5-6 ist moderat, M 7+ ist schwer. Deine Berechnung hilft, die Erdbebenschwere zu klassifizieren.",
                    richter_core: "🌍 SZENARIO: Historische Erdbebenanalyse — 1356 erlebte Basel das stärkste aufgezeichnete Erdbeben der Schweiz. Moderne Analysen schätzen die Bodenamplitude auf A = 100.000 Mikrometer. Berechne die Richtermagnitude. Vergleiche dies mit dem Erdbeben in Japan 2011 (M 9,0), das eine Amplitude von 1.000.000.000 Mikrometern hatte. Die logarithmische Skala komprimiert diesen milliardenfachen Bereich in handhabbare Zahlen (1 bis 9).",
                    richter_advanced: "🌍 SZENARIO: Erdbeben-Frühwarnsystem — Die Schweiz entwickelt eine Erdbeben-Warn-App. Zwei Erdbeben treten auf: Erdbeben A hat Amplitude 31.600 μm, Erdbeben B hat Amplitude 1.000 μm. Berechne beide Magnituden auf 2 Dezimalstellen. Die App muss zwischen 'leichtem Beben' (M < 4,0) und 'signifikantem Beben' (M ≥ 4,0) unterscheiden, um zu entscheiden, ob Notfallwarnungen an Millionen von Telefonen gesendet werden.",
                    richter_elite: "🌍 SZENARIO: Seismischer Energievergleich — Fortgeschrittene Seismologie: Die von einem Erdbeben freigesetzte Energie steigt um das 31,6-fache für jede Magnitudeneinheit. Wenn Erdbeben A M 5,0 ist und Erdbeben B M 7,0 ist, wie viel mehr Energie setzt B frei? Verstehe zuerst, dass M 7,0 bedeutet, dass die Amplitude 100× größer ist als M 5,0 (weil 10² = 100). Aber Energie skaliert als Amplitude^1,5, also ist das Energieverhältnis 100^1,5 = 1.000×. Deshalb sind M 7 Beben katastrophal, während M 5 nur 'moderat' sind."
                },
                canvas: {
                    ph_title: "pH-SKALA",
                    ph_formula: "pH = -log₁₀[H⁺]",
                    decibel_title: "DEZIBEL-SKALA",
                    decibel_formula: "L = 10·log₁₀(I/I₀)",
                    richter_title: "RICHTER-SKALA",
                    richter_formula: "M = log₁₀(A)",
                    ph_subtitle: "Säuregrad",
                    decibel_subtitle: "Schall",
                    richter_subtitle: "Erdbeben",
                    status_chamber: "LABOR",
                    status_sim: "LOG_SKALA_SIM: AKTIV",
                    status_mode: "MODUS"
                }
            },
        sc3_01: {
                back: "Zurück zum Nexus",
                title: "C3.01 // MOLEKULARER ARCHITEKT",
                difficulty: {
                    basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Molekülstruktur",
                next: "Nächste Sequenz ausführen",
                check: "Verifizieren",
                correct: "Verifiziert",
                incorrect: "Fehlreaktion",
                ready: "Bereit",
                monitor_title: "C3.01_MOLEKÜL_MONITOR",
                footer_left: "C3.01_MOLEKULARER_ARCHITEKT // KNOTEN: BASEL",
                labels: {
                    input: "EINGABE",
                    hints: "HINWEISE",
                    atom: "Atom",
                    bond: "Bindung",
                    snap: "Einrasten",
                    grid: "Gitter"
                },
                mission: {
                    title: "MOLEKÜL-MONTAGE-LABOR",
                    description: "Bauen Sie pharmazeutische Moleküle mit Kugel-Stab-Modellen zusammen. Drehen und beobachten Sie die 3D-Struktur."
                },
                stages: {
                    aspirin: "ASPIRIN",
                    caffeine: "KOFFEIN"
                }
            },
        sc1_01: {
                back: "Zurück zum Nexus",
                title: "C1.01 // GEHEIM LABOR",
                difficulty: {
                    basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Substanzanalyse",
                next: "Nächste Sequenz",
                check: "Überprüfen",
                correct: "Verifiziert",
                incorrect: "Abweichung",
                ready: "Bereit",
                monitor_title: "C1.01_LABOR_MONITOR",
                footer_left: "C1.01_GEHEIM_LABOR // KNOTEN: BASEL",
                labels: {
                    input: "EINGABE",
                    hints: "HINWEISE",
                    substance: "Substanz",
                    tool: "Testwerkzeug",
                    observation: "Beobachtung"
                },
                mission: {
                    title: "PULVER-IDENTIFIKATION",
                    description: "Identifizieren Sie mysteriöse weiße Pulver mit klassischen chemischen Tests. Meistern Sie die qualitative Analyse."
                },
                stages: {
                    identify: "IDENTIFIZIEREN",
                    properties: "EIGENSCHAFTEN",
                    reactions: "REAKTIONEN"
                }
            },
        sp1_06: {
                back: "Zurück zum Nexus",
                title: "SP1.06 // DAS SCHWEIZER PENDEL",
                difficulty: {
                    basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Oszillationsdaten",
                next: "Nächste Sequenz",
                check: "Überprüfen",
                correct: "Verifiziert",
                incorrect: "Abweichung",
                ready: "Bereit",
                monitor_title: "SP1.06_PENDEL_MONITOR",
                footer_left: "SP1.06_PENDEL // KNOTEN: BASEL",
                labels: {
                    input: "EINGABE",
                    hints: "HINWEISE",
                    period: "Periode (T)",
                    length: "Länge (L)",
                    gravity: "Gravitation (g)",
                    frequency: "Frequenz (f)"
                },
                mission: {
                    title: "DAS GEHEIMNIS DES UHRMACHERS",
                    description: "Kalibrieren Sie die mechanische Hauptuhr von Basel. Meistern Sie die Physik der harmonischen Schwingung und der Energieerhaltung."
                },
                stages: {
                    period: "PERIODE",
                    gravity: "GRAVITATION",
                    energy: "ENERGIE"
                }
            },
        sc1_03: {
                back: "Zurück zum Nexus",
                title: "SC1.03 // ATOMSCHMIEDE",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "ERWEITERT",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Atomstruktur",
                next: "Nächste Sequenz ausführen",
                check: "Verifizieren",
                correct: "Verifiziert",
                incorrect: "Fehlreaktion",
                ready: "Bereit",
                monitor_title: "SC1.03_ATOM_MONITOR",
                footer_left: "SC1.03_ATOMSCHMIEDE // KNOTEN: BASEL",
                labels: {
                    input: "EINGABE",
                    hints: "HINWEISE",
                    properties: "EIGENSCHAFTEN",
                    element: "Element",
                    atomic_number: "Ordnungszahl (Z)",
                    mass_number: "Massenzahl (A)",
                    charge: "Ladung",
                    periodic_table: "PERIODENSYSTEM",
                    protons: "PROTONEN (p⁺)",
                    neutrons: "NEUTRONEN (n⁰)",
                    electrons: "ELEKTRONEN (e⁻)"
                },
                mission: {
                    title: "MISSION: CYBER-SCHMIEDE",
                    description: "Bauen Sie Atome aus subatomaren Teilchen. Meistern Sie das Bohr-Modell und das Periodensystem."
                },
                stages: {
                    build: "BAUEN",
                    elements: "ELEMENTE",
                    isotopes: "ISOTOPE",
                    build_desc: "Freier Modus: Beliebige Atomkonfiguration erstellen",
                    elements_desc: "Erkunden Sie die ersten 20 Elemente des Periodensystems",
                    isotopes_desc: "Studieren Sie Isotope: gleiche Protonenzahl, unterschiedliche Neutronenzahl"
                }
            },
        gm4_01: {
                back: "Zurück zum Nexus",
                title: "GM4.01 // KOMPLEXER HORIZONT",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "ERWEITERT",
                    elite: "ELITE"
                },
                next: "Nächste Sequenz ausführen",
                check: "Verifizieren",
                correct: "Verifiziert",
                incorrect: "Fehlanpassung",
                ready: "Bereit",
                monitor_title: "GM4.01_KOMPLEX_MONITOR",
                footer_left: "GM4.01_KOMPLEXER_HORIZONT // KNOTEN: BASEL",
                scenario_title: "BASEL INGENIEURSMISSION",
                scenarios: {
                    basics: "Roche Pharma-Signalverarbeitung: Sie kalibrieren medizinische Bildgebungsgeräte bei Roche Basel, die komplexe Zahlenanalyse für die MRT-Signalverarbeitung verwenden. Jede komplexe Zahl z = a + bi repräsentiert ein Signal mit Realteil (Amplitude) und Imaginärteil (Phase). Berechnen Sie den Betrag |z|, um die Signalstärke zu bestimmen. Eine genaue Betragsberechnung ist entscheidend für die Erkennung von Gewebeanomalien in Patientenscans.",
                    operations: "Novartis Quantenchemie-Simulation: Sie führen Molekülorbitalberechnungen bei Novartis Basel mit komplexer Zahlenarithmetik durch. Wellenfunktionen werden als komplexe Zahlen dargestellt, und ihre Wechselwirkungen erfordern Addition und Multiplikation in der komplexen Ebene. Berechnen Sie das Ergebnis komplexer Operationen, um molekulares Verhalten vorherzusagen. Diese Berechnungen bestimmen die Arzneimittelbindungseffizienz.",
                    polar: "Universität Basel Elektrotechnik: Sie analysieren das Verhalten von Wechselstromkreisen in Energiesystemen für Basels Smart Grid. Komplexe Impedanzen werden potenziert, wenn Resonanzfrequenzen berechnet werden. Verwenden Sie die Polarform (r·e^(iθ)), um z^n effizient zu berechnen. Das Ergebnis bestimmt die optimale Stromverteilung im erneuerbaren Energienetz von Basel."
                },
                stages: {
                    basics: "GRUNDLAGEN",
                    operations: "OPERATIONEN",
                    polar: "POLARFORM",
                    basics_prompt: "Betrag berechnen",
                    basics_target: "|z| finden",
                    operations_add: "Komplexe Zahlen addieren",
                    operations_multiply: "Komplexe Zahlen multiplizieren",
                    operations_target: "Real- und Imaginärteil finden",
                    polar_prompt: "Potenz mit Polarform berechnen",
                    polar_target: "z^n in kartesischer Form finden"
                },
                visualization: {
                    pythagorean: "SATZ DES PYTHAGORAS",
                    vector_addition: "VEKTORADDITION",
                    complex_multiplication: "KOMPLEXE MULTIPLIKATION",
                    polar_power: "POLARFORM POTENZ",
                    complex_data: "KOMPLEXE ZAHLENDATEN",
                    magnitude: "Betrag |z|",
                    argument: "Argument arg(z)",
                    power: "Potenz",
                    verified: "VERIFIZIERT",
                    mismatch: "FEHLANPASSUNG",
                    geometric_meaning: "Geometrische Bedeutung: Beträge multiplizieren, Winkel addieren",
                    polar_meaning: "Betrag wird r^n, Winkel wird n·θ",
                    parallelogram_rule: "Parallelogrammregel: vom Ursprung zu z₁, dann z₂ von z₁ verschieben"
                }
            },
        em2_01: {
                back: "Zurück zum Nexus",
                title: "EM2.01 // MATRIXGEOMETRIE",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Transformationsmatrix",
                next: "Nächste Sequenz ausführen",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Fehlanpassung",
                ready: "Bereit",
                monitor_title: "EM2.01_MATRIX_MONITOR",
                footer_left: "EM2.01_MATRIXGEOMETRIE // KNOTEN: BASEL",
                labels: {
                    matrix: "MATRIX A",
                    properties: "EIGENSCHAFTEN",
                    determinant: "Determinante",
                    volume_scale: "Volumenskalierung",
                    formulas: "FORMELN",
                    angle: "ROTATIONSWINKEL (θ)",
                    scale_x: "X-ACHSE SKALIEREN",
                    scale_y: "Y-ACHSE SKALIEREN",
                    scale_z: "Z-ACHSE SKALIEREN",
                    shear_xy: "SCHERUNG X DURCH Y",
                    shear_xz: "SCHERUNG X DURCH Z",
                    matrix_title: "MATRIX A",
                    det_value: "det(A) = {value}",
                    show_eigenvectors: "Eigenvektoren anzeigen",
                    show_grid: "Gitter anzeigen",
                    animate: "Animation"
                },
                presets: {
                    title: "VOREINSTELLUNGEN",
                    scale: "Skalieren",
                    rotate: "Rotation 90°",
                    shear: "Scherung",
                    reflect: "Spiegeln"
                },
                linear: {
                    title: "LINEARE ALGEBRA",
                    line_1: "Ax = λx (Eigenwertgleichung)",
                    line_2: "det(A - λI) = 0",
                    line_3: "T(v) = Av"
                },
                mission: {
                    title: "MISSION: LINEARE TRANSFORMATIONEN",
                    description: "Visualisieren Sie lineare Algebra im 3D-Raum. Erkunden Sie Matrixtransformationen, Eigenvektoren und geometrische Intuition."
                },
                stages: {
                    basic_transforms: "TRANSFORMATIONEN",
                    determinant: "DETERMINANTE",
                    composition: "KOMPOSITION"
                },
                scenario_title: "BASLER INGENIEURSMISSION",
                scenarios: {
                    basic_transforms: "Roche Pharma-Molekülanalyse: Sie arbeiten in der Abteilung für Computerchemie von Roche Basel und verwenden lineare Transformationen zur Analyse der Symmetrie von Proteinmolekülen. Jede Matrix repräsentiert eine Symmetrieoperation (Rotation, Reflexion, Skalierung). Die Identifizierung von Transformationstypen ist entscheidend für die Vorhersage molekularer optischer Eigenschaften.",
                    determinant: "Novartis Kristallstruktur: Sie analysieren Arzneimittelkristall-Einheitszellstrukturen bei Novartis Basel. Die Determinante repräsentiert die Gittervolumenänderung. det(A)=0 zeigt einen Kristallstrukturkollaps an, det(A)<0 zeigt eine Chiralitätsinversion an. Eine genaue Determinantenberechnung ist entscheidend für die Vorhersage der Bioaktivität von Arzneimitteln.",
                    composition: "Universität Basel Robotik: Sie programmieren einen Roboterarm im Robotiklabor der Universität Basel. Die Bewegung jedes Gelenks wird durch eine Transformationsmatrix dargestellt. Die zusammengesetzte Transformation AB bedeutet, zuerst die Bewegung von Gelenk A auszuführen, dann die Bewegung von Gelenk B. Die Reihenfolge der Matrixmultiplikation bestimmt die endgültige Position des Roboterarms."
                },
                explanation_label: "ERKLÄRUNG"
            },
        sc2_02: {
                back: "Zurück zum Nexus",
                title: "SC2.02 // pH SENTINEL",
                difficulty: {
                    basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE"
                },
                objective_title: "Aktives Missionsziel",
                target_title: "Titrationsanalyse",
                next: "Nächste Analyse",
                check: "Prüfen",
                correct: "Titration akkurat",
                incorrect: "pH-Wert fehlerhaft",
                ready: "Bereit",
                monitor_title: "SC2.02_TITRATIONS_MONITOR",
                footer_left: "SC2.02_PH_SENTINEL // KNOTEN: BASEL",
                stages: {
                    curves: "PH-KURVEN",
                    equivalence: "ÄQUIVALENZ",
                    indicators: "INDIKATOREN"
                },
                labels: {
                    initial_ph: "Initialer pH",
                    added_vol: "Volumen (mL)",
                    eq_point: "Äquivalenzpunkt",
                    indicator: "Indikator",
                    strong_acid: "Starke Säure",
                    weak_acid: "Schwache Säure",
                    formula: "Titrationsformel"
                },
                prompts: {
                    curve_type: "Der pH-Wert ist {ph}. Säuretyp? (Stark=1, Schwach=2).",
                    find_eq: "Va=50mL, Ca=0.1M, Cb=0.2M. Finde Vb am Äquivalenzpunkt.",
                    select_indicator: "Schwache Säure + Starke Base. Indikator? Phenol(1), MethylO(2).",
                    weak_ph_calc: "Am Halbäquivalenzpunkt (pH = pKa). Wenn pKa = 4.75, pH?",
                    eq_ph_guess: "Äquivalenz-pH bei Stark/Stark? (<7=1, 7=2, >7=3).",
                    conc_calc: "20mL Säure werden durch 10mL 0.2M NaOH neutralisiert. Finde Ca."
                }
            },
        sc2_03: {
                back: "Zurück zum Nexus",
                title: "SC2.03 // AERO LABOR",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Gaseigenschaften",
                next: "Nächste Sequenz ausführen",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Abweichung",
                ready: "Bereit",
                monitor_title: "SC2.03_GAS_MONITOR",
                footer_left: "SC2.03_AERO_LABOR // KNOTEN: BASEL",
                labels: {
                    pressure: "DRUCK",
                    state_variables: "ZUSTANDSVARIABLEN",
                    volume: "VOLUMEN (V)",
                    temperature: "TEMPERATUR (T)",
                    moles: "STOFFMENGE (n)",
                    formulas: "FORMELN"
                },
                mission: {
                    title: "MISSION: IDEALE GASGESETZE",
                    description: "Erkunden Sie die Beziehung zwischen Druck, Volumen und Temperatur in idealen Gasen."
                },
                stages: {
                    boyle: "BOYLE-GESETZ",
                    charles: "CHARLES-GESETZ",
                    combined: "KOMBINIERTES GASGESETZ",
                    boyle_desc: "Beobachten Sie umgekehrte Beziehung: P ∝ 1/V",
                    charles_desc: "Beobachten Sie direkte Beziehung: V ∝ T",
                    combined_desc: "Meistern Sie das kombinierte Gasgesetz",
                    boyle_hint: "Boyle-Gesetz: Volumen verringern → Druck erhöhen",
                    charles_hint: "Charles-Gesetz: Temperatur erhöhen → Volumen erhöhen",
                    combined_hint: "Kombiniert: Alle drei Variablen interagieren"
                }
            },
        sc1_03_orbitals: {
                back: "Zurück zum Nexus",
                title: "SC1.03 // ATOMSCHMIEDE",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Atomorbitale",
                next: "Nächste Sequenz ausführen",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Fehlanpassung",
                ready: "Bereit",
                monitor_title: "SC1.03_ORBITAL_MONITOR",
                footer_left: "SC1.03_ATOMSCHMIEDE // KNOTEN: BASEL",
                labels: {
                    selected_element: "AUSGEWÄHLTES ELEMENT",
                    orbital_type: "ORBITALTYP",
                    show_transition: "Elektronenübergang anzeigen",
                    periodic_table: "PERIODENSYSTEM (Z=1-20)",
                    orbital_shapes: "ORBITALFORMEN",
                    quantum_numbers: "QUANTENZAHLEN"
                },
                mission: {
                    title: "MISSION: QUANTENMECHANIK",
                    description: "Erkunden Sie Elektronenorbitale und Wahrscheinlichkeitswolken. Visualisieren Sie s-, p- und d-Orbitale im 3D-Raum."
                },
                stages: {
                    s_orbital: "S-ORBITALE",
                    p_orbital: "P-ORBITALE",
                    d_orbital: "D-ORBITALE",
                    s_desc: "Kugelförmige Wahrscheinlichkeitsverteilung",
                    p_desc: "Hantelförmige Orbitale (px, py, pz)",
                    d_desc: "Kleeblattförmige Orbitale",
                    s_hint: "s-Orbitale: l=0, kugelsymmetrisch",
                    p_hint: "p-Orbitale: l=1, drei Orientierungen",
                    d_hint: "d-Orbitale: l=2, fünf Orientierungen"
                }
            },
        sc1_04: {
                back: "Zurück zum Nexus",
                title: "SC1.04 // PERIODISCHES PUZZLE",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Atomstruktur",
                next: "Nächste Sequenz ausführen",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Abweichung",
                ready: "Bereit",
                monitor_title: "SC1.04_ATOM_MONITOR",
                footer_left: "SC1.04_PERIODISCHES_PUZZLE // KNOTEN: BASEL",
                labels: {
                    element_info: "ELEMENTINFORMATIONEN",
                    formulas: "FORMELN",
                    protons: "PROTONEN",
                    neutrons: "NEUTRONEN",
                    electrons: "ELEKTRONEN",
                    select_element: "ELEMENT AUSWÄHLEN"
                },
                mission: {
                    title: "MISSION: PERIODENSYSTEM",
                    description: "Baue Atome und entdecke das Periodensystem. Meistere die Elektronenkonfiguration."
                },
                stages: {
                    build: "ATOM BAUEN",
                    periodic: "PERIODENSYSTEM",
                    groups: "ELEMENTGRUPPEN",
                    build_desc: "Baue Atome durch Hinzufügen von Protonen, Neutronen und Elektronen",
                    periodic_desc: "Erkunde die ersten 20 Elemente",
                    groups_desc: "Verstehe Elementgruppen und Perioden",
                    build_hint: "Protonenzahl bestimmt das Element",
                    periodic_hint: "Elemente sind nach Ordnungszahl angeordnet",
                    groups_hint: "Gleiche Gruppe = gleiche Valenzelektronen"
                }
            },
        sc2_04: {
                back: "Zurück zum Nexus",
                title: "SC2.04 // LÖSLICHKEITSLABOR",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Lösungsstatus",
                next: "Nächste Sequenz ausführen",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Abweichung",
                ready: "Bereit",
                monitor_title: "SC2.04_LÖSLICHKEITS_MONITOR",
                footer_left: "SC2.04_LÖSLICHKEITSLABOR // KNOTEN: BASEL",
                labels: {
                    solubility: "LÖSLICHKEIT",
                    saturated: "GESÄTTIGT - Niederschlag bildet sich",
                    unsaturated: "UNGESÄTTIGT - Kann mehr lösen",
                    solution_data: "LÖSUNGSDATEN",
                    temperature: "TEMPERATUR (°C)",
                    solute_amount: "GELÖSTE STOFFMENGE (g)",
                    formulas: "FORMELN"
                },
                mission: {
                    title: "MISSION: LÖSLICHKEIT",
                    description: "Erkunden Sie Löslichkeit und Temperaturbeziehungen. Beobachten Sie Kristallisation."
                },
                stages: {
                    dissolve: "AUFLÖSEN",
                    saturate: "SÄTTIGEN",
                    crystallize: "KRISTALLISIEREN",
                    dissolve_desc: "Löse Stoff in Wasser auf",
                    saturate_desc: "Erreiche den Sättigungspunkt",
                    crystallize_desc: "Kühle Lösung zur Kristallisation",
                    dissolve_hint: "Die meisten Salze lösen sich bei höheren Temperaturen besser",
                    saturate_hint: "Sättigung: maximal gelöste Menge",
                    crystallize_hint: "Abkühlung führt zur Kristallisation überschüssigen Stoffes"
                }
            },
        gp1_03: {
                back: "Zurück zum Nexus",
                title: "GP5.03 // TEILCHENBESCHLEUNIGER",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "LHC ATLAS DETEKTOR",
                next: "Nächste Sequenz ausführen",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Abweichung",
                ready: "Bereit",
                monitor_title: "GP5.03_LHC_MONITOR",
                footer_left: "GP5.03_TEILCHENBESCHLEUNIGER // KNOTEN: CERN",
                labels: {
                    beam_energy: "STRAHLENERGIE",
                    relativistic_effects: "RELATIVISTISCHE EFFEKTE",
                    formulas: "FORMELN",
                    magnetic_field: "Magnetfeld aktivieren (Biegemagnete)",
                    colliding: "KOLLISION...",
                    initiate_collision: "KOLLISION STARTEN"
                },
                mission: {
                    title: "MISSION: TEILCHENPHYSIK",
                    description: "Erkunden Sie Teilchenkollisionen am CERN Large Hadron Collider. Entdecken Sie das Higgs-Boson."
                },
                stages: {
                    acceleration: "BESCHLEUNIGUNG",
                    collision: "KOLLISION",
                    detection: "DETEKTION",
                    acceleration_desc: "Beschleunigen Sie Protonen auf nahezu Lichtgeschwindigkeit",
                    collision_desc: "Kollidieren Sie Protonenstrahlen bei 13 TeV",
                    detection_desc: "Detektieren Sie Teilchenjets und Spuren",
                    acceleration_hint: "Protonen erreichen 99,9999991% der Lichtgeschwindigkeit",
                    collision_hint: "Kollisionsenergie: 13 TeV = 13.000 GeV",
                    detection_hint: "Magnetfeld biegt geladene Teilchenspuren"
                }
            },
        ggp5_02: {
                title: "GP1.02 // Relativitätslabor",
                back: "Zurück zum Nexus",
                footer_left: "GP1.02_RELATIVITÄTSLABOR // KNOTEN: RHINE",
                monitor_title: "GP1.02_RELATIVITÄTSMONITOR",
                labels: {
                    lorentz_factor_title: "LORENTZ-FAKTOR",
                    velocity_label: "GESCHWINDIGKEIT (v/c)",
                    velocity_value: "{value}% c",
                    gamma_value: "γ = {value}",
                    toggle_doppler: "Doppler-Effekt anzeigen",
                    toggle_contraction: "Längenkontraktion anzeigen"
                },
                effects: {
                    title: "RELATIVISTISCHE EFFEKTE",
                    time_dilation_label: "Zeitdilatation:",
                    time_dilation_value: "Δt' = {value}Δt",
                    length_contraction_label: "Längenkontraktion:",
                    length_contraction_value: "L' = {value}L"
                },
                formulas: {
                    title: "FORMELN",
                    gamma: "γ = 1/√(1 - v²/c²)",
                    time: "Δt' = γΔt",
                    length: "L' = L/γ",
                    energy: "E = γmc²"
                },
                mission: {
                    title: "MISSION: Spezielle Relativität",
                    description: "Untersuchen Sie Effekte der speziellen Relativität. Beobachten Sie Zeitdilatation, Längenkontraktion und Dopplereffekt bei relativistischen Geschwindigkeiten."
                }
            },
        sp1_08: {
                title: "SP1.08 // Optisches Labor",
                back: "Zurück zum Nexus",
                footer_left: "SP1.08_OPTIKLABOR // KNOTEN: BASEL",
                monitor_title: "SP1.08_OPTIKMONITOR",
                labels: {
                    show_prism: "Prismen-Dispersion anzeigen",
                    medium_1: "MEDIUM 1 (n₁)",
                    medium_2: "MEDIUM 2 (n₂)",
                    incident_angle: "EINFALLSWINKEL (θ₁)",
                    refraction_title: "BRECHUNG",
                    refracted_angle: "Brechungswinkel (θ₂):",
                    critical_angle: "Grenzwinkel:",
                    total_internal_reflection: "TOTALREFLEXION",
                    na: "k. A.",
                    angle_value: "{value}°"
                },
                snell: {
                    title: "SNELLIUS-GESETZ",
                    line_1: "n₁ sin(θ₁) = n₂ sin(θ₂)",
                    line_2: "θ_c = arcsin(n₂/n₁)",
                    line_3: "v = c/n"
                },
                mission: {
                    title: "MISSION: Strahlenoptik",
                    description: "Meistern Sie Snellsches Gesetz und Strahlenoptik. Beobachten Sie Brechung, totale innere Reflexion und Prismadispersion."
                }
            },
        gsc2_01: {
                back: "Zurück zum Nexus",
                title: "GC2.01 // KOHLENSTOFF-KÖNIGREICH",
                difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Molekülstruktur",
                next: "Weiter",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Abweichung",
                ready: "Bereit",
                monitor_title: "GC2.01_ORGANIK_MONITOR",
                footer_left: "GC2.01_KOHLENSTOFF_KOENIGREICH // KNOTEN: BASEL",
                labels: {
                    formula: "MOLEKÜLFORMEL",
                    iupac_name: "IUPAC-NAME",
                    composition: "ZUSAMMENSETZUNG",
                    molecular_mass: "Molekülmasse",
                    hints: "HINWEISE",
                    molecule_info: "MOLEKÜLINFORMATIONEN",
                    select_molecule: "MOLEKÜL AUSWÄHLEN",
                    rotation_speed: "ROTATIONSGESCHWINDIGKEIT",
                    rotation_speed_value: "{value}x",
                    show_bonds: "Bindungen anzeigen",
                    show_hydrogens: "Wasserstoff anzeigen",
                    atom_colors: "ATOMFARBEN",
                    atom_carbon: "Kohlenstoff (C)",
                    atom_hydrogen: "Wasserstoff (H)",
                    atom_oxygen: "Sauerstoff (O)",
                    atom_nitrogen: "Stickstoff (N)",
                    bond_types: "BINDUNGSTYPEN",
                    bond_single: "Einfachbindung: C-C",
                    bond_double: "Doppelbindung: C=C",
                    bond_triple: "Dreifachbindung: C≡C"
                },
                molecules: {
                    methane: "Methan",
                    ethane: "Ethan",
                    benzene: "Benzol",
                    glucose: "Glukose",
                    alanine: "Alanin"
                },
                types: {
                    alkane: "Alkan",
                    aromatic: "Aromatisch",
                    carbohydrate: "Kohlenhydrat",
                    amino_acid: "Aminosäure"
                },
                mission: {
                    title: "MISSION: ORGANISCHE CHEMIE",
                    description: "Erkunden Sie organische Moleküle in 3D. Studieren Sie Kugel-Stab-Modelle, chemische Bindungen und Molekülgeometrie."
                },
                stages: {
                    alkanes: "ALKANE",
                    alcohols: "ALKOHOLE",
                    custom: "CUSTOM",
                    alkanes_desc: "Baue Alkanketten (C-C-C)",
                    alcohols_desc: "Füge Hydroxylgruppen hinzu (C-OH)",
                    custom_desc: "Freier Synthesemodus"
                },
                hints: {
                    select_atom: "Klicken Sie auf ein Atom, um es auszuwählen",
                    add_atom: "Klicken Sie auf das Atom-Werkzeug, um ein neues Atom hinzuzufügen",
                    bonds: "Atome verbinden sich basierend auf Valenzregeln",
                    delete: "Verwenden Sie DELETE, um das ausgewählte Atom zu entfernen"
                }
            },
        gsc1_01: {
                back: "Zurück zum Nexus",
                title: "GC1.01 // REDOX-TITAN",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Galvanische Zelle",
                next: "Nächste Sequenz ausführen",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Fehlanpassung",
                ready: "Bereit",
                monitor_title: "GC1.01_REDOX_MONITOR",
                footer_left: "GC1.01_REDOX_TITAN // KNOTEN: BASEL",
                labels: {
                    cell_potential: "ZELLPOTENTIAL",
                    zn_concentration: "Zn²⁺-KONZENTRATION",
                    cu_concentration: "Cu²⁺-KONZENTRATION",
                    temperature: "TEMPERATUR",
                    show_electrons: "Elektronenfluss anzeigen",
                    show_ions: "Ionenmigration anzeigen",
                    reaction_quotient: "REAKTIONSQUOTIENT (Q)",
                    half_reactions: "HALBREAKTIONEN",
                    anode: "ANODE",
                    cathode: "KATHODE",
                    nernst_equation: "NERNST-GLEICHUNG"
                },
                mission: {
                    title: "MISSION: ELEKTROCHEMIE",
                    description: "Bauen Sie eine galvanische Zelle und meistern Sie die Nernst-Gleichung. Beobachten Sie Elektronenfluss und Ionenmigration in Echtzeit."
                },
                stages: {
                    build: "ZELLE BAUEN",
                    measure: "POTENTIAL MESSEN",
                    analyze: "REAKTIONEN ANALYSIEREN",
                    build_desc: "Zn-Cu-Galvanische Zelle konstruieren",
                    measure_desc: "Zellpotential mit Nernst-Gleichung berechnen",
                    analyze_desc: "Redoxreaktionen und Elektronenfluss beobachten",
                    build_hint: "Zn wird an der Anode oxidiert, Cu²⁺ an der Kathode reduziert",
                    measure_hint: "E = E° - (RT/nF)ln(Q)",
                    analyze_hint: "Salzbrücke erhält elektrische Neutralität"
                }
            },
        gc3_01: {
                back: "Zurück zum Nexus",
                title: "GC3.01 // GLEICHGEWICHTSMEISTER",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Chemisches Gleichgewicht",
                next: "Nächste Sequenz ausführen",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Fehlanpassung",
                ready: "Bereit",
                monitor_title: "GC3.01_GLEICHGEWICHT_MONITOR",
                footer_left: "GC3.01_GLEICHGEWICHTSMEISTER // KNOTEN: BASEL",
                labels: {
                    reaction: "REVERSIBLE REAKTION",
                    particle_count: "PARTIKELANZAHL",
                    conditions: "BEDINGUNGEN",
                    temperature: "Temperatur",
                    pressure: "Druck",
                    concentration: "[A]",
                    principle: "LE CHATELIERS PRINZIP",
                    principle_1: "• Reaktant hinzufügen → verschiebt nach rechts (mehr Produkte)",
                    principle_2: "• Druck erhöhen → verschiebt zu weniger Molekülen",
                    principle_3: "• Temperatur erhöhen → verschiebt in endotherme Richtung",
                    add_reactant: "REAKTANT A HINZUFÜGEN",
                    system_temperature: "SYSTEMTEMPERATUR",
                    system_pressure: "SYSTEMDRUCK"
                },
                mission: {
                    title: "MISSION: CHEMISCHES GLEICHGEWICHT",
                    description: "Meistern Sie Le Chateliers Prinzip. Beobachten Sie, wie Systeme auf Stress reagieren."
                },
                stages: {
                    concentration: "KONZENTRATION",
                    temperature: "TEMPERATUR",
                    pressure: "DRUCK",
                    concentration_desc: "Reaktant A hinzufügen und Gleichgewichtsverschiebung beobachten",
                    temperature_desc: "Temperatur erhöhen und Teilchengeschwindigkeit beobachten",
                    pressure_desc: "Druck ändern und Volumeneffekte sehen",
                    concentration_hint: "Höhere [A] verschiebt Gleichgewicht nach rechts → mehr C und D",
                    temperature_hint: "Höhere Temperatur erhöht kinetische Energie der Teilchen",
                    pressure_hint: "Höherer Druck verringert Behältervolumen"
                }
            },
        gc3_02: {
                back: "Zurück zum Nexus",
                title: "GC3.02 // KRISTALLPALAST",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                objective_title: "Aktuelles Missionsziel",
                target_title: "Kristallstruktur",
                next: "Nächste Sequenz ausführen",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Fehlanpassung",
                ready: "Bereit",
                monitor_title: "GC3.02_KRISTALL_MONITOR",
                footer_left: "GC3.02_KRISTALLPALAST // KNOTEN: BASEL",
                labels: {
                    lattice_type: "GITTERTYP",
                    coordination: "KOORDINATIONSZAHL",
                    packing: "PACKUNGSEFFIZIENZ",
                    unit_cell: "EINHEITSZELLE",
                    atoms_per_cell: "Atome pro Zelle",
                    slice_plane: "SCHNITTEBENE (Y-ACHSE)",
                    reset_slice: "Zurücksetzen"
                },
                mission: {
                    title: "MISSION: FESTKÖRPERPHYSIK",
                    description: "Erkunden Sie Kristallstrukturen und Bravais-Gitter. Verstehen Sie atomare Packung und Koordination."
                },
                stages: {
                    sc: "EINFACH KUBISCH",
                    bcc: "RAUMZENTRIERT",
                    fcc: "FLÄCHENZENTRIERT",
                    sc_desc: "Studieren Sie einfach kubisches Gitter (Koordination 6)",
                    bcc_desc: "Analysieren Sie raumzentriert kubisch (Koordination 8)",
                    fcc_desc: "Meistern Sie flächenzentriert kubisch (Koordination 12)",
                    sc_hint: "Niedrigste Packungseffizienz (52%)",
                    bcc_hint: "Mittlere Packung (68%), Metalle wie Fe, Cr",
                    fcc_hint: "Höchste Packung (74%), Metalle wie Cu, Al, Au"
                },
            },
        sb1_02: {
                back: "Zurück zum Nexus",
                title: "SB1.02 // PHOTOSYNTHESE-LABOR",
                difficulty: { basic: "GRUNDLAGEN", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
                check: "Prüfen",
                next: "Nächste Sequenz ausführen",
                correct: "Verifiziert",
                incorrect: "Fehlanpassung",
                ready: "Bereit",
                monitor_title: "SB1.02_PHOTOSYNTHESE_MONITOR",
                footer_left: "SB1.02_PHOTOSYNTHESE_LABOR // KNOTEN: BASEL",
                objective_title: "Aktives Missionsziel",
                stages: {
                    equation: "REAKTIONSGLEICHUNG",
                    factors: "BEGRENZENDE FAKTOREN",
                    chloroplast: "CHLOROPLAST"
                },
                labels: {
                    light: "Lichtintensität",
                    co2: "CO2-Gehalt",
                    temp: "Temperatur",
                    efficiency: "Effizienz",
                    reaction_display: "Reaktionsanzeige",
                    input_terminal: "Eingabeterminal"
                },
                prompts: {
                    reactant: "Vervollständigen Sie die Gleichung: 6CO₂ + 6H₂O + Licht → C₆H₁₂O₆ + 6{O₂}. Wie viele fehlende Reaktanten?",
                    hint_oxygen: "Zählen Sie die Sauerstoffatome auf beiden Seiten der Gleichung",
                    glucose: "Wie viele Glucosemoleküle werden aus {co2} CO₂-Molekülen produziert?",
                    hint_glucose: "Das Verhältnis von CO₂ zu Glucose beträgt 6:1",
                    water_count: "Wie viele Wassermoleküle werden benötigt, um {glucose} Glucosemoleküle zu produzieren?",
                    hint_balance: "Gleichung ausbalancieren: 6 Wassermoleküle pro Glucosemolekül",
                    factor_effect: "Wenn {factor} um die Hälfte sinkt, was passiert mit der Photosyntheserate?",
                    hint_factor: "Jeder Faktor begrenzt unabhängig die maximale Rate",
                    structure_function: "Welche Struktur im Chloroplasten ist für {process} verantwortlich?",
                    hint_structure: "Lichtreaktionen finden in den Thylakoidmembranen statt; der Calvin-Zyklus im Stroma"
                },
                feedback: {
                    correct: "Photosynthese-Gleichung ausbalanciert!",
                    incorrect: "Überprüfen Sie die Photosynthese-Reaktion."
                }
            },
        sb2_02: {
                back: "Zurück zum Nexus",
                title: "SB2.02 // MENSCHLICHE KÖRPERSYSTEME",
                difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
                check: "Prüfen",
                next: "Nächste Sequenz ausführen",
                correct: "Verifiziert",
                incorrect: "Fehlanpassung",
                ready: "Bereit",
                monitor_title: "SB2.02_KÖRPERSYSTEME_MONITOR",
                footer_left: "SB2.02_MENSCHLICHE_KÖRPERSYSTEME // KNOTEN: BASEL",
                objective_title: "Aktuelles Missionsziel",
                stages: {
                    digestive: "VERDAUUNG",
                    circulatory: "KREISLAUF",
                    respiratory: "ATMUNG"
                },
                systems: {
                    digestive: "Verdauungssystem",
                    circulatory: "Kreislaufsystem",
                    respiratory: "Atmungssystem"
                },
                labels: {
                    heart_rate: "Herzfrequenz",
                    o2_sat: "O2-Sättigung",
                    enzyme: "Enzymaktivität",
                    anatomy_score: "Anatomie-Punktzahl",
                    anatomy_display: "Anatomie-Anzeige",
                    input_terminal: "Eingabeterminal"
                },
                prompts: {
                    organ_function: "Welches Organ ist für {function} verantwortlich?",
                    hint_organ: "Das {name} erfüllt diese Funktion",
                    component_function: "Welche Komponente ist für {function} verantwortlich?",
                    hint_component: "Das {name} erfüllt diese Funktion",
                    structure_function: "Welche Struktur ist für {function} verantwortlich?",
                    hint_structure: "Das {name} erfüllt diese Funktion"
                },
                feedback: {
                    correct: "Anatomie-Wissen verifiziert!",
                    incorrect: "Überprüfen Sie die Struktur des Körpersystems."
                }
            },
        sb3_01: {
                back: "Zurück zum Nexus",
                title: "SB3.01 // ÖKOSYSTEM-DYNAMIK",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                next: "Nächste Sequenz ausführen",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Fehlanpassung",
                ready: "Bereit",
                monitor_title: "SB3.01_ÖKOSYSTEM_MONITOR",
                footer_left: "SB3.01_ÖKOSYSTEM_DYNAMIK // KNOTEN: RHEIN",
                objective_title: "Aktuelles Missionsziel",
                stages: {
                    food_chains: "NAHRUNGSKETTEN",
                    energy_flow: "ENERGIEFLUSS",
                    cycles: "BIOGEOCHEMISCHE KREISLÄUFE"
                },
                labels: {
                    ecosystem_display: "Ökosystem-Anzeige",
                    input_terminal: "Eingabeterminal",
                    trophic_level: "Trophische Ebene",
                    show_energy: "Energiefluss anzeigen",
                    ecology_score: "Ökologie-Punktzahl"
                },
                prompts: {
                    food_chain: "Im Rhein-Ökosystem wird {producer} von {consumer} gefressen. Was kommt als Nächstes?",
                    energy_transfer: "Wenn {level}-Konsumenten {energy} kJ Energie haben, wie viel erreicht die nächste Ebene?",
                    cycle_process: "Im {cycle}-Kreislauf, was wird durch {process} produziert?",
                    hint_trophic: "Nur 10% der Energie werden auf die nächste trophische Ebene übertragen",
                    hint_10percent: "Verwenden Sie die 10%-Regel: mit 0,1 multiplizieren",
                    hint_cycle: "Denken Sie an die Ein- und Ausgänge dieses Prozesses"
                },
                scenarios: {
                    rhine_river: "Rhein-Ökosystem: Der Rhein unterstützt vielfältiges aquatisches Leben von Algen bis zu Raubvögeln. Nahrungsketten beginnen mit Phytoplankton und verlaufen über Zooplankton, Fische bis zu Spitzenprädatoren.",
                    energy_pyramid: "Energiefluss in Basler Feuchtgebieten: Basels Feuchtgebietsreservate zeigen Energiepyramiden. Nur 10% der Energie werden zwischen trophischen Ebenen übertragen, was die Länge der Nahrungskette begrenzt.",
                    carbon_cycle: "Kohlenstoffkreislauf im Rheindelta: Photosynthese und Atmung treiben den Kohlenstoffkreislauf in Rhein-Ökosystemen an. Pflanzen absorbieren CO₂, Tiere geben es durch Atmung ab.",
                    nitrogen_cycle: "Stickstofffixierung im Basler Boden: Bakterien in Basels landwirtschaftlichen Böden wandeln atmosphärisches N₂ durch Stickstofffixierung in nutzbares NH₃ für Pflanzen um.",
                    water_cycle: "Rhein-Wasserkreislauf: Verdunstung vom Rhein, Kondensation in Wolken und Niederschlag vervollständigen den Wasserkreislauf, der Basels Ökosysteme erhält."
                },
                feedback: {
                    correct: "Ökosystem-Gleichgewicht aufrechterhalten!",
                    incorrect: "Ökosystem gestört. Überprüfen Sie die Beziehungen."
                }
            },
        sp1_04: {
                back: "Zurück zum Nexus",
                title: "SP1.04 // EINFACHE MASCHINEN",
                difficulty: {
                    basic: "BASIS",
                    core: "KERN",
                    advanced: "FORTGESCHRITTEN",
                    elite: "ELITE"
                },
                next: "Nächste Sequenz ausführen",
                check: "Prüfen",
                correct: "Verifiziert",
                incorrect: "Fehlanpassung",
                ready: "Bereit",
                monitor_title: "SP1.04_MECHANIK_MONITOR",
                footer_left: "SP1.04_EINFACHE_MASCHINEN // KNOTEN: BASEL",
                objective_title: "Aktuelles Missionsziel",
                stages: {
                    levers: "HEBEL",
                    pulleys: "FLASCHENZÜGE",
                    inclined_planes: "SCHIEFE EBENEN"
                },
                labels: {
                    machine_display: "Maschinenanzeige",
                    input_terminal: "Eingabeterminal",
                    force_ratio: "Kraftverhältnis (MA)",
                    show_forces: "Kräfte anzeigen",
                    mechanics_score: "Mechanik-Punktzahl"
                },
                prompts: {
                    lever: "Ein Hebel hebt eine Last von {load} N. Wenn der Kraftarm {effortArm} m und der Lastarm {loadArm} m beträgt, welche Kraftaufwand wird benötigt?",
                    pulley: "Ein Flaschenzugsystem hebt eine Last von {load} N mit {strands} tragenden Seilen. Welche Kraftaufwand wird benötigt?",
                    inclined_plane: "Eine schiefe Ebene hebt eine Last von {load} N auf eine Höhe von {height} m über eine Länge von {length} m. Welche Kraftaufwand wird benötigt?",
                    hint_lever: "Verwenden Sie MA = Kraftarm / Lastarm, dann F_Aufwand = F_Last / MA",
                    hint_pulley: "Verwenden Sie MA = Anzahl der Seile, dann F_Aufwand = F_Last / MA",
                    hint_inclined: "Verwenden Sie MA = Länge / Höhe, dann F_Aufwand = F_Last / MA"
                },
                feedback: {
                    correct: "Mechanischer Vorteil korrekt berechnet!",
                    incorrect: "Überprüfen Sie Ihre Berechnung des mechanischen Vorteils."
                }
            },
        sb1_03: {
                    back: "Zurück zum Nexus",
                    title: "SB1.03 // ZELLTEILUNG",
                    check: "Prüfen",
                    next: "Nächste Phase",
                    correct: "Phase Abgeschlossen",
                    incorrect: "Fehlausrichtung",
                    ready: "Bereit",
                    monitor_title: "SB1.03_REPLIKATIONSZENTRUM",
                    difficulty: {
                        basic: "BASIS",
                        core: "KERN",
                        advanced: "FORTGESCHRITTEN",
                        elite: "ELITE"
                    },
                    stages: {
                        mitosis: "MITOSE",
                        meiosis_i: "MEIOSE I",
                        meiosis_ii: "MEIOSE II"
                    }
                },
                sc1_05: {
                    back: "Zurück zum Nexus",
                    title: "SC1.05 // CHEMISCHE BINDUNGEN",
                    check: "Prüfen",
                    next: "Weiter",
                    correct: "Bindung Verifiziert",
                    incorrect: "Bindungsfehler",
                    ready: "Bereit",
                    monitor_title: "SC1.05_BINDUNGSLABOR",
                    difficulty: {
                        basic: "BASIS",
                        core: "KERN",
                        advanced: "FORTGESCHRITTEN",
                        elite: "ELITE"
                    },
                    stages: {
                        ionic: "IONISCH",
                        covalent: "KOVALENT",
                        lewis: "LEWIS"
                    },
                    labels: {
                        na_cl: "Na + Cl -> NaCl",
                        h2: "H + H -> H2",
                        co2: "C + 2O -> CO2"
                    }
                },
                sc3_02: {
                    back: "Zurück zum Nexus",
                    title: "SC3.02 // GRUNDLAGEN DER ORGANISCHEN CHEMIE",
                    stages: {
                        alkanes: "ALKANE",
                        functional_groups: "FUNKTIONELLE GRUPPEN",
                        isomers: "ISOMERE"
                    },
                    labels: {
                        carbon_chain: "Kohlenstoffkette",
                        hydroxyl: "Hydroxylgruppe",
                        double_bond: "Doppelbindung"
                    }
                },
                sc3_03: {
                    back: "Zurück zum Nexus",
                    title: "SC3.03 // ORGANISCHE REAKTIONEN",
                    difficulty: {
                        basic: "BASIS",
                        core: "KERN",
                        advanced: "FORTGESCHRITTEN",
                        elite: "ELITE"
                    },
                    next: "Nächste Sequenz ausführen",
                    check: "Prüfen",
                    correct: "Verifiziert",
                    incorrect: "Fehlanpassung",
                    ready: "Bereit",
                    monitor_title: "SC3.03_REAKTIONS_MONITOR",
                    footer_left: "SC3.03_ORGANISCHE_REAKTIONEN // KNOTEN: BASEL",
                    objective_title: "Aktuelles Missionsziel",
                    stages: {
                        combustion: "VERBRENNUNG",
                        substitution: "SUBSTITUTION",
                        addition: "ADDITION"
                    },
                    labels: {
                        reaction_display: "Reaktionsanzeige",
                        input_terminal: "Eingabeterminal",
                        animation_speed: "Animationsgeschwindigkeit",
                        show_mechanism: "Mechanismus anzeigen",
                        chemistry_score: "Chemie-Punktzahl"
                    },
                    prompts: {
                        combustion: "Vollständige Verbrennung von {reactant} erzeugt CO₂ und H₂O. Wie viele CO₂-Moleküle?",
                        substitution: "Wenn {alkane} unter UV-Licht mit {halogen} reagiert, was ist das Hauptprodukt?",
                        addition: "Wenn {alkene} mit {reagent} reagiert, was ist das Produkt?",
                        hint_combustion: "Zählen Sie die Kohlenstoffatome im Reaktanten",
                        hint_substitution: "Ein H-Atom wird durch ein Halogenatom ersetzt",
                        hint_addition: "Die Doppelbindung öffnet sich und addiert das Reagenz"
                    },
                    feedback: {
                        correct: "Reaktionsmechanismus verstanden!",
                        incorrect: "Überprüfen Sie den Reaktionsmechanismus."
                    }
                }
        }
};

export function useLanguage() {
    const { currentLanguage, setLanguage } = useAppStore();
    const t = (path: string) => {
        const segments = path.split(".");
        
        // SSR 安全: 确保 currentLanguage 有效，默认使用 EN
        const safeLang = (currentLanguage && currentLanguage in translations) 
            ? currentLanguage 
            : "EN";
        
        let node: unknown = translations[safeLang];
        
        for (const segment of segments) {
            if (!node || typeof node !== "object") {
                return path;
            }
            const record = node as Record<string, unknown>;
            if (!(segment in record)) {
                return path;
            }
            node = record[segment];
        }
        return typeof node === "string" ? node : path;
    };

    return { t, currentLanguage, setLanguage };
}

export interface Translations {
    EN: typeof translations.EN;
    DE: typeof translations.DE;
    CN: typeof translations.CN;
}

export function getTranslations(lang?: string) {
    if (!lang || !(lang in translations)) {
        return translations.EN;
    }
    const validLang = lang as keyof typeof translations;
    return translations[validLang];
}


