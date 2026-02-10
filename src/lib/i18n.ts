import { useAppStore } from "@/lib/store";

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
                    description: "Reach 100% accuracy in G1.01."
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
            sm1_02_title: "SM1.02 // 4D HYPER-GEOMETRY",
            sm1_02_subtitle: "Explore the tesseract: 4D projection, rotation matrices, and hypercube unfolding.",
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
            gm4_01: {
                back: "Back to Nexus",
                title: "GM4.01 // COMPLEX HORIZON",
                difficulty: {
                    basic: "BASIC",
                    core: "CORE",
                    advanced: "ADVANCED",
                    elite: "ELITE"
                },
                objective_title: "Active Mission Objective",
                target_title: "Complex Number",
                next: "Execute Next Sequence",
                check: "Verify",
                correct: "Verified",
                incorrect: "Mismatch",
                ready: "Ready",
                monitor_title: "GM4.01_COMPLEX_MONITOR",
                footer_left: "GM4.01_COMPLEX_HORIZON // NODE: ZURICH",
                labels: {
                    input: "INPUT",
                    hints: "HINTS",
                    original: "ORIGINAL (z)",
                    result: "RESULT (z^n)",
                    magnitude: "Magnitude",
                    angle: "Angle",
                    formulas: "FORMULAS",
                    real_part: "REAL PART (a)",
                    imaginary_part: "IMAGINARY PART (b)",
                    power: "POWER (n)"
                },
                mission: {
                    title: "MISSION: COMPLEX SPACE",
                    description: "Explore the complex plane in 3D. Master Euler's formula and complex powers."
                },
                stages: {
                    basics: "BASICS",
                    powers: "POWERS",
                    euler: "EULER",
                    basics_desc: "Understand complex numbers as 2D vectors",
                    powers_desc: "Visualize z^n as rotation and scaling",
                    euler_desc: "Master Euler's formula: e^(iθ) = cos(θ) + i·sin(θ)",
                    basics_hint: "Complex numbers as 2D vectors in the plane",
                    powers_hint: "z^n rotates by n·θ and scales by r^n",
                    euler_hint: "e^(iθ) traces the unit circle"
                }
            },
            gm5_01: {
                back: "Back to Nexus",
                title: "GM5.01 // MATRIX GEOMETRY",
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
                monitor_title: "GM5.01_MATRIX_MONITOR",
                footer_left: "GM5.01_MATRIX_GEOMETRY // NODE: BASEL",
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
                    rotation: "ROTATION",
                    scale: "SCALE",
                    shear: "SHEAR",
                    rotation_desc: "Rotate the unit cube around the Z-axis",
                    scale_desc: "Scale the cube along each axis independently",
                    shear_desc: "Shear the cube to create parallelograms",
                    rotation_hint: "Rotation preserves distances and angles",
                    scale_hint: "Determinant = sx × sy × sz",
                    shear_hint: "Shear preserves volume (det = 1)"
                }
            },
            gm3_01_subtitle: "Visualize binomial distribution with Galton Board. Watch probability converge to normal distribution.",
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
            sp1_04_title: "SP1.04 // TIME DILATION",
            sp1_04_subtitle: "Observe relativistic effects: length contraction and time dilation at light speed.",
            sp3_02_title: "SP3.02 // WAVE OPTICS",
            sp3_02_subtitle: "Explore interference, diffraction, and polarization phenomena.",
            sp1_05_title: "SP1.05 // THE RHINE FERRY",
            sp1_05_subtitle: "Master the Basel Gierseilfähri. Navigating the Rhine using only current and cables.",
            sp1_06_title: "SP1.06 // THE SWISS PENDULUM",
            sp1_06_subtitle: "The mechanics of time: Explore period, frequency and gravity with the Basel clockmaker.",
            sp1_08_title: "SP1.08 // OPTICS LAB",
            sp1_08_subtitle: "Explore light, lenses, and optical phenomena.",
            sp4_01_title: "SP4.01 // WAVE BASICS",
            sp4_01_subtitle: "Wave properties and sound phenomena.",
            gp5_01_title: "GP5.01 // THE ATOMIC CORE",
            gp5_01_subtitle: "Stabilize the Basel reactor by balancing nuclear equations: Alpha, Beta, and Gamma decay.",
            gp5_02: {
                back: "Back to Nexus",
                title: "GP5.02 // RELATIVITY LAB",
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
                monitor_title: "GP5.02_RELATIVITY_MONITOR",
                footer_left: "GP5.02_RELATIVITY_LAB // NODE: CERN",
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
            gp5_04: {
                back: "Back to Nexus",
                title: "GP5.04 // QUANTUM TUNNEL",
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
                monitor_title: "GP5.04_QUANTUM_MONITOR",
                footer_left: "GP5.04_QUANTUM_TUNNEL // NODE: CERN",
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
            s3_02_title: "S3.02 // TRIGONOMETRY TOWER",
            s3_02_subtitle: "Master sine, cosine, and tangent through unit circle visualization, wave functions, and triangle solving.",
            s2_07_title: "S2.07 // COORDINATE GEOMETRY",
            s2_07_subtitle: "Master distance, midpoint, and slope calculations.",
            s3_04_title: "S3.04 // LOGARITHMIC SCALES",
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
            sb2_01_title: "SB2.01 // MENDEL'S GARDEN",
            sb2_01_subtitle: "Genetics and Punnett squares.",
            gb3_01_title: "GB3.01 // DNA FORGE",
            gb3_01_subtitle: "Molecular biology and DNA replication.",
            gm4_01_title: "GM4.01 // COMPLEX HORIZON",
            gm4_01_subtitle: "Visualize the complex plane and Euler's formula in 3D space.",
            gm5_01_title: "GM5.01 // MATRIX TRANSFORM",
            gm5_01_subtitle: "Linear transformations and eigenvectors in 3D.",
            gms1_01_title: "GMS1.01 // FRACTAL EXPLORER",
            gms1_01_subtitle: "Explore fractals and self-similarity patterns in mathematics.",
            gp5_02_title: "GP5.02 // RELATIVITY LAB",
            gp5_02_subtitle: "Calculate Lorentz factor, length contraction, and time dilation at CERN.",
            gp5_03_title: "GP5.03 // PARTICLE COLLIDER",
            gp5_03_subtitle: "Simulate CERN's LHC. Collide protons at 13 TeV and discover the Higgs boson.",
            gp5_04_title: "GP5.04 // QUANTUM TUNNEL",
            gp5_04_subtitle: "Visualize quantum tunneling through potential barriers with wave functions.",
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
            completed_badge: "COMPLETED",
        },
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
            title: "S2.02 // PYTHAGORAS & ROOTS",
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
            monitor_title: "S2.02_VISUAL_MONITOR",
            footer_left: "S2.02_SQRT_PYTHAGORAS // NODE: ZURICH",
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
            title: "S3.01 // QUADRATIC EQUATIONS",
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
            monitor_title: "S3.01_MONITOR",
            footer_left: "S3.01_QUADRATICS // NODE: ZURICH",
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
            title: "S3.02 // TRIG CIRCLE",
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
            monitor_title: "S3.02_TRIG_MONITOR",
            footer_left: "S3.02_TRIG_CIRCLE // NODE: BASEL",
            labels: {
                angle: "ANGLE (θ)",
                values: "TRIGONOMETRIC VALUES",
                display: "DISPLAY OPTIONS",
                show_waves: "Show Wave Functions",
                formulas: "FORMULAS"
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
                waves_hint: "Sine and cosine create periodic waves"
            }
        },
        sm3_03: {
            back: "Back to Nexus",
            title: "S3.03 // GROWTH & LOGS",
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
            monitor_title: "S3.03_GROWTH_MONITOR",
            footer_left: "S3.03_EXPONENTIAL // NODE: BASEL",
            labels: {
                input: "INPUT",
                hints: "HINTS",
                population: "Population (N)",
                time: "Time (t)",
                doubling_time: "Doubling Time (d)",
                initial: "Initial Count (N₀)"
            },
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
                applications_prompt_latex: "\\text{Apply exponential models to real scenarios.}"
            },
            formulas: {
                exponential: "N(t) = N_0 \\cdot 2^{t/d}",
                logarithm: "t = d \\cdot \\log_2(N/N_0)",
                applications: "N(t) = N_0 \\cdot e^{kt}"
            }
        },
        sm2_03: {
            back: "Back to Nexus",
            title: "S2.03 // LINE NAVIGATOR",
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
            monitor_title: "S2.03_LASER_MONITOR",
            footer_left: "S2.03_LINE_NAVIGATOR // NODE: BASEL",
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
            title: "S2.04 // SIMILARITY & SCALING",
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
            monitor_title: "S2.04_MONITOR",
            footer_left: "S2.04_SIMILARITY // NODE: BASEL",
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
            title: "S2.01 // BINOMIAL FACTORY",
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
                footer_left: "S2.01_ALGEBRA_SYNC // NODE: ZURICH",
                verified: "Verified",
                simulating: "Simulating",
            }
        },
        gm1_01: {
            back: "Back to Nexus",
            title: "G1.01 // CALCULUS INTRO",
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
                title: "Mission: The Flux Sentinel",
                description: "The city of Basel, birth-place of Calculus legends, is shifting. Calibrate the Flux Sentinel to match the curve's instantaneous velocity. Precision is the only law."
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
            monitor_title: "G1.01_VISUAL_MONITOR",
            status: "STATUS: OPERATIONAL",
            footer_left: "G1.01_CALCULUS // NODE: ZURICH",
            footer_right: "FLUX_CITY_SECTOR_7",
            stages: {
                intro: "INTRO",
                differentiation: "DERIVATIVES",
                application: "APPLICATIONS",
                power_rule: "POWER RULE",
                product_rule: "PRODUCT RULE",
                chain_rule: "CHAIN RULE",
                intro_prompt_latex: "\\text{Calculate the derivative of }x^n.",
                differentiation_prompt_latex: "\\text{Apply the differentiation rules.}",
                application_prompt_latex: "\\text{Apply calculus to solve problems.}",
                power_rule_prompt_latex: "\\text{Apply the power rule: }\\frac{d}{dx}x^n = nx^{n-1}.",
                product_rule_prompt_latex: "\\text{Apply the product rule: }(uv)' = u'v + uv'.",
                chain_rule_prompt_latex: "\\text{Apply the chain rule: }\\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx}."
            },
            labels: {
                secant_slope: "Secant Slope m",
                tangent_slope: "Tangent Slope m",
                velocity: "Velocity v",
                x_coordinate: "x-coordinate",
                hints: "HINTS"
            },
            formulas: {
                power_rule: "f'(x) = nx^{n-1}",
                product_rule: "(uv)' = u'v + uv'",
                chain_rule: "\\frac{dy}{dx} = \\frac{dy}{du}\\frac{du}{dx}"
            },
            integral_preview_title: "COMING SOON: INTEGRALRECHNUNG",
            integral_preview_desc: "Master the inverse operation of differentiation. Calculate areas under curves.",
            integral_preview_hint: "Unlock after mastering derivatives →"
        },
        gm2_01: {
            back: "Back to Nexus",
            title: "G2.01 // VECTOR PILOT 3D",
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
            monitor_title: "G2.01_VECTOR_HUD",
            footer_left: "G2.01_VECTOR_PILOT // NODE: BASEL",
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
            }
        },
        gm3_01: {
            back: "Back to Nexus",
            title: "G3.01 // PROBABILITY VAULT",
            difficulty: {
                basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE"
            },
            objective_title: "Active Mission Objective",
            target_title: "Probability Matrix",
            next: "Execute Next Sequence",
            check: "Verify",
            correct: "Verified",
            incorrect: "Mismatch",
            ready: "Ready",
            monitor_title: "G3.01_PROBABILITY_MONITOR",
            footer_left: "G3.01_PROBABILITY_VAULT // NODE: BASEL",
            stages: {
                bernoulli: "BERNOULLI",
                conditional: "CONDITIONAL",
                distribution: "DISTRIBUTION",
                uniform: "UNIFORM",
                biased: "BIASED",
                extreme: "EXTREME",
                bernoulli_prompt_latex: "\\text{Calculate the probability P(k; n, p) for Bernoulli trials.}",
                conditional_prompt_latex: "\\text{Determine the conditional probability P(A|B).}",
                distribution_prompt_latex: "\\text{Predict the mean \\mu and variance \\sigma^2.}"
            },
            labels: {
                input: "INPUT",
                hints: "HINTS",
                rows: "ROWS (n)",
                ball_count: "BALL COUNT",
                show_distribution: "Show Distribution"
            },
            normal: {
                title: "NORMAL DISTRIBUTION",
                mean: "Mean (μ):",
                std_dev: "Std Dev (σ):",
                variance: "Variance (σ²):"
            },
            binomial: {
                title: "BINOMIAL DISTRIBUTION",
                line_1: "P(X=k) = C(n,k) × p^k × (1-p)^(n-k)",
                line_2: "μ = np",
                line_3: "σ² = np(1-p)",
                line_4: "p = 0.5 (fair coin)"
            },
            mission: {
                title: "MISSION: GALTON BOARD",
                description: "Observe the central limit theorem in action. Watch balls fall through pegs and form a normal distribution."
            }
        },
        sm2_06: {
            back: "Back to Nexus",
            title: "S2.06 // LINEAR SYSTEMS",
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
            monitor_title: "S2.06_MONITOR",
            footer_left: "S2.06_LINEAR_SYSTEMS // NODE: BASEL",
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
            title: "S2.05 // POWERS & ROOTS",
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
            monitor_title: "S2.05_MONITOR",
            footer_left: "S2.05_POWERS_ROOTS // NODE: BASEL",
            stages: {
                rules: "LAWS",
                negative: "NEGATIVE",
                scientific: "SCI-NOTATION",
                rules_prompt_latex: "\\text{Apply power laws to simplify.}",
                negative_prompt_latex: "\\text{Simplify terms with negative exponents.}",
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
            }
        },
        sm1_02: {
            back: "Back to Nexus",
            title: "SM1.02 // THALES TOWER",
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
            monitor_title: "SM1.02_THALES_MONITOR",
            footer_left: "SM1.02_THALES_TOWER // NODE: BASEL",
            stages: {
                measure: "MEASURE",
                measure_prompt_latex: "\\text{Use }\\frac{h}{H}=\\frac{l}{L}\\text{ to solve tower height.}"
            },
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
            next: "Execute Next Sequence",
            check: "Verify",
            correct: "Verified",
            incorrect: "Mismatch",
            ready: "Ready",
            monitor_title: "C2.01_KINETICS_MONITOR",
            footer_left: "C2.01_CHEM_KINETICS // NODE: BASEL",
            stages: {
                arrhenius: "ARRHENIUS",
                concentration: "CONCENTRATION",
                collision: "COLLISION",
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
        sp1_04: {
            back: "Back to Nexus",
            title: "P1.04 // TIME DILATION SIMULATOR",
            difficulty: {
                basic: "BASIC",
                core: "CORE",
                advanced: "ADVANCED",
                elite: "ELITE"
            },
            objective_title: "Active Mission Objective",
            target_title: "Spacetime HUD",
            next: "Execute Next Sequence",
            check: "Engage Warp",
            correct: "Identity Confirmed",
            incorrect: "Drift Detected",
            ready: "Ready",
            monitor_title: "P1.04_RELATIVITY_CORE",
            footer_left: "P1.04_RELATIVITY // NODE: BASEL",
            labels: {
                velocity: "Velocity (v/c)",
                gamma: "Lorentz Factor (γ)",
                length: "Contraction (L)",
                time: "Dilation (t)"
            },
            mission: {
                title: "MISSION: EINSTEIN'S LABORATORY",
                description: "Observe the warping of spacetime. As velocity approaches the speed of light, length contracts and time dilates."
            },
            stages: {
                contraction: "LENGTH CONTRACTION",
                dilation: "TIME DILATION",
                spacetime: "SPACETIME GRID",
                contraction_prompt_latex: "\\text{Calculate the contracted length } L = L_0/\\gamma.",
                dilation_prompt_latex: "\\text{Calculate the dilated time } t = t_0 \\cdot \\gamma.",
                spacetime_prompt_latex: "\\text{Analyze the Lorentz factor } \\gamma \\text{ for given } v/c."
            }
        },
        sp1_05: {
            back: "Back to Nexus",
            title: "P1.05 // THE RHINE FERRY",
            stage_label: "RHINE CROSSING",
            crossing: "CROSSING...",
            start: "START ENGINES",
            reset: "RESET POSITION",
            arrived: "ARRIVED SAFELY",
            drifting: "DRIFTING...",
            ready: "STATIONARY",
            header: "Local Physics Protocol",
            description: "Master the Gierseilfähri. Use the Rhine’s current to cross from Grossbasel to Kleinbasel.",
            rudder_angle: "Rudder Angle",
            port: "PORT",
            center: "CENTER",
            starboard: "STARBOARD",
            environment: "Environmental Data",
            river_velocity: "River Velocity",
            cable_tension: "Cable Tension",
            optimal: "OPTIMAL",
            mechanism_title: "Mechanism Logic",
            mechanism_desc: "Unlike motorboats, the Basel ferries use a long upstream cable. The rudder angle redirects river pressure into lateral thrust.",
            active_ship: "Active Ship",
            ship_name: "Vogel Gryff // Fähri-Basel"
        },
        sp2_01: {
            back: "Back to Nexus",
            title: "P2.01 // THERMAL DYNAMICS",
            difficulty: {
                basic: "BASIC",
                core: "CORE",
                advanced: "ADVANCED",
                elite: "ELITE"
            },
            objective_title: "Active Mission Objective",
            target_title: "Heat Transfer",
            next: "Execute Next Sequence",
            check: "Verify",
            correct: "Verified",
            incorrect: "Mismatch",
            ready: "Ready",
            monitor_title: "P2.01_THERMAL_MONITOR",
            footer_left: "P2.01_THERMODYNAMICS // NODE: BASEL",
            labels: {
                input: "INPUT",
                hints: "HINTS",
                heat: "Heat Energy (Q)",
                temperature: "Temperature Change (ΔT)",
                mass: "Mass (m)",
                specific_heat: "Specific Heat (c)"
            },
            mission: {
                title: "THERMAL REACTOR CONTROL",
                description: "Novartis thermal reactor requires precise heat calculations. Master heat capacity and phase transitions."
            },
            stages: {
                heat_capacity: "HEAT CAPACITY",
                phase_change: "PHASE CHANGE",
                mixed: "MIXED PROBLEMS",
                heat_capacity_prompt_latex: "\\text{Calculate heat transfer using }Q=mc\\Delta T.",
                phase_change_prompt_latex: "\\text{Calculate latent heat using }Q=mL.",
                mixed_prompt_latex: "\\text{Combine heat capacity and phase change calculations.}"
            },
            formulas: {
                heat_capacity: "Q = mc\\Delta T",
                phase_change: "Q = mL",
                mixed: "Q_{\\text{total}} = Q_1 + Q_2"
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
        sm2_07: {
            back: "Back to Nexus",
            title: "S2.07 // COORDINATE GEOMETRY",
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
            monitor_title: "S2.07_COORDINATE_MONITOR",
            footer_left: "S2.07_COORD_GEOM // NODE: ZURICH",
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
            title: "S3.04 // LOGARITHMIC SCALES",
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
            monitor_title: "S3.04_LOG_MONITOR",
            footer_left: "S3.04_LOGARITHMS // NODE: BASEL",
            labels: {
                input: "INPUT",
                hints: "HINTS",
                ph: "pH Value",
                decibel: "Decibels (dB)",
                richter: "Richter Scale"
            },
            mission: {
                title: "LOGARITHMIC MEASUREMENT LAB",
                description: "Novartis lab requires logarithmic scaling. Master pH scale, decibels, and Richter scale."
            },
            stages: {
                ph: "pH SCALE",
                decibel: "DECIBELS",
                richter: "RICHTER",
                ph_prompt_latex: "\\text{Calculate pH using }pH=-\\log[H^+].",
                decibel_prompt_latex: "\\text{Calculate decibels using }dB=10\\log(I/I_0).",
                richter_prompt_latex: "\\text{Calculate Richter scale using }M=\\log(A/A_0)."
            },
            formulas: {
                ph_scale: "pH = -\\log[H^+]",
                decibel_scale: "dB = 10\\log(I/I_0)",
                richter_scale: "M = \\log(A/A_0)"
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
            title: "SP4.01 // WAVE BASICS",
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
            monitor_title: "SP4.01_WAVE_MONITOR",
            footer_left: "SP4.01_WAVE_BASICS // NODE: RHINE",
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
            difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
            objective_title: "Active Mission Objective",
            target_title: "Cell Structure",
            next: "Execute Next Sequence",
            check: "Verify",
            correct: "Verified",
            incorrect: "Mismatch",
            ready: "Ready",
            monitor_title: "SB1.01_CELL_MONITOR",
            footer_left: "SB1.01_CELL_FACTORY // NODE: BASEL",
            labels: {
                cutaway_view: "Cutaway View",
                selected: "SELECTED ORGANELLE",
                organelles: "ORGANELLES",
                instructions: "INSTRUCTIONS"
            },
            mission: {
                title: "MISSION: CELL EXPLORATION",
                description: "Explore the animal cell structure. Identify organelles and understand their functions."
            }
        },
        sb2_01: {
            back: "Back to Nexus",
            title: "SB2.01 // MENDEL'S GARDEN",
            difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
            objective_title: "Active Mission Objective",
            target_title: "Genetic Cross",
            next: "Execute Next Sequence",
            check: "Verify",
            correct: "Verified",
            incorrect: "Mismatch",
            ready: "Ready",
            monitor_title: "SB2.01_GENETICS_MONITOR",
            footer_left: "SB2.01_MENDELS_GARDEN // NODE: BASEL",
            labels: {
                genetics_basics: "GENETICS BASICS",
                genotype_phenotype: "GENOTYPE VS PHENOTYPE",
                dominance: "DOMINANCE RULES",
                mendels_laws: "MENDEL'S LAWS",
                instructions: "INSTRUCTIONS"
            },
            mission: {
                title: "MISSION: MENDELIAN GENETICS",
                description: "Master Mendel's laws of inheritance. Predict offspring ratios using Punnett Squares."
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
            labels: {
                rotation: "ROTATION",
                auto_rotate: "Auto Rotate",
                show_bonds: "Show Hydrogen Bonds",
                highlight_pair: "HIGHLIGHT BASE PAIR",
                pairing_rules: "BASE PAIRING RULES",
                bases: "NUCLEOTIDE BASES",
                structure: "DNA STRUCTURE"
            },
            mission: {
                title: "MISSION: DNA DOUBLE HELIX",
                description: "Explore DNA structure. Master complementary base pairing and hydrogen bonding."
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
                core: "CORE"
            },
            objective_title: "Active Mission Objective",
            target_title: "Titration Curve",
            next: "Reset",
            check: "Verify",
            correct: "Verified",
            incorrect: "Mismatch",
            ready: "Ready",
            monitor_title: "SC2.02_TITRATION_MONITOR",
            footer_left: "SC2.02_PH_SENTINEL // NODE: BASEL",
            start: "Start Titration",
            pause: "Pause Flow",
            reset: "Reset Run",
            labels: {
                current_ph: "CURRENT pH",
                equivalence: "Equivalence Point",
                indicators: "Indicators",
                solution_config: "Solution Configuration",
                acid_molarity: "Acid Molarity",
                base_molarity: "Base Molarity",
                acid_volume: "Acid Volume",
                added_volume: "Added Volume",
                flow_rate: "Flow Rate",
                flow_control: "Flow Control"
            },
            indicators: {
                phenolphthalein: "Phenolphthalein",
                phenolphthalein_low: "Colorless",
                phenolphthalein_mid: "Transition",
                phenolphthalein_high: "Pink",
                methyl_orange: "Methyl Orange",
                methyl_orange_low: "Red",
                methyl_orange_mid: "Orange",
                methyl_orange_high: "Yellow"
            },
            mission: {
                title: "MISSION: TITRATION SENTINEL",
                description: "Calibrate the pH curve in real time. Control flow rate and track the indicator shift."
            },
            stages: {
                titration: "TITRATION"
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
        gp5_03: {
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
        gp5_02: {
            title: "GP5.02 // RELATIVITY LAB",
            back: "Back to Nexus",
            footer_left: "GP5.02_RELATIVITY_LAB // NODE: RHINE",
            monitor_title: "GP5.02_RELATIVITY_MONITOR",
            labels: {
                lorentz_factor_title: "LORENTZ FACTOR",
                velocity_label: "VELOCITY (v/c)",
                velocity_value: "{value}% c",
                gamma_value: "γ = {value}",
                toggle_doppler: "Show Doppler Effect",
                toggle_contraction: "Show Length Contraction"
            },
            effects: {
                title: "RELATIVISTIC EFFECTS",
                time_dilation_label: "Time Dilation:",
                time_dilation_value: "Δt' = {value}Δt",
                length_contraction_label: "Length Contraction:",
                length_contraction_value: "L' = {value}L"
            },
            formulas: {
                title: "FORMULAS",
                gamma: "γ = 1/√(1 - v²/c²)",
                time: "Δt' = γΔt",
                length: "L' = L/γ",
                energy: "E = γmc²"
            },
            mission: {
                title: "MISSION: SPECIAL RELATIVITY",
                description: "Explore special relativity effects. Observe time dilation, length contraction, and Doppler shift at relativistic speeds."
            }
        },
        gms1_01: {
            title: "GMS1.01 // COMPLEX FRACTAL",
            back: "Back to Nexus",
            footer_left: "GMS1.01_FRACTAL_EXPLORER // NODE: BASEL",
            monitor_title: "GMS1.01_FRACTAL_MONITOR",
            labels: {
                max_iterations: "MAX ITERATIONS",
                zoom: "ZOOM",
                zoom_value: "{value}x",
                center_x: "CENTER X",
                center_y: "CENTER Y",
                color_scheme: "COLOR SCHEME",
                scheme: {
                    classic: "CLASSIC",
                    fire: "FIRE",
                    ice: "ICE",
                    rainbow: "RAINBOW"
                }
            },
            mandelbrot: {
                title: "MANDELBROT SET",
                line_1: "z₀ = 0",
                line_2: "z_{n+1} = z_n² + c",
                line_3: "|z_n| < 2 for all n"
            },
            mission: {
                title: "MISSION: MANDELBROT SET",
                description: "Explore the Mandelbrot set with GPU-accelerated rendering. Zoom into infinite complexity and discover self-similar patterns."
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
        }
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
                    description: "在 G1.01 达到 100% 正确率。"
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
            sm2_01_title: "S2.01 // 二项式工厂",
            sm2_01_subtitle: "攻克第一和第二二项式公式。利用几何切割证明代数恒等式。",
            sm2_02_title: "S2.02 // 勾股定律与开平方",
            sm2_02_subtitle: "围绕瑞士初中阶段难度梯度训练勾股定律与平方根。",
            sm3_01_title: "S3.01 // 一元二次方程",
            sm3_01_subtitle: "用因式分解、求根公式、配方法解一元二次方程，并设置难度梯度。",
            sm3_03_title: "S3.03 // 指数与对数",
            sm3_03_subtitle: "通过细胞分裂模拟理解指数增长与对数刻度。",
            sm3_02_title: "S3.02 // 三角函数阵列",
            sm3_02_subtitle: "通过波形反馈训练正弦、余弦和相位偏移。",
            sm3_04_title: "S3.04 // 对数实验室",
            sm3_04_subtitle: "通过精密训练解码对数刻度和逆向增长。",
            sm2_07_title: "S2.07 // 坐标侦察",
            sm2_07_subtitle: "在巴塞尔网格中掌握坐标系、平移和绘图精度。",
            sm2_03_title: "S2.03 // 直线与函数",
            sm2_03_subtitle: "训练斜率、截距、图像匹配与交点，并保持低输入负担。",
            sm2_04_title: "S2.04 // 相似与比例",
            sm2_04_subtitle: "训练相似比、缩放因子及比例推理应用。",
            gm1_01_title: "G1.01 // 微积分初步",
            gm1_01_subtitle: "探索导数与切线斜率。在抛物线上计算割线和切线的斜率。",
            gm2_01_title: "G2.01 // 矢量飞行员 3D",
            gm2_01_subtitle: "用三维向量、点积与模长训练无人机导航。",
            gm3_01_title: "G3.01 // 概率金库",
            gm3_01_subtitle: "通过高尔顿钉板可视化二项分布。观察概率收敛到正态分布。",
            sm2_06_title: "S2.06 // 二元一次方程组",
            sm2_06_subtitle: "掌握代入消元法和加减消元法求解二元一次方程组。",
            sm2_05_title: "S2.05 // 幂运算与根号",
            sm2_05_subtitle: "系统训练幂运算法则、负指数以及科学计数法。",
            sm1_01_title: "S1.01 // 面积与体积",
            sm1_01_subtitle: "计算梯形面积以及棱柱和圆柱的体积。",
            sm1_02_title: "S1.02 // 四维超几何",
            sm1_02_subtitle: "探索超立方体：四维投影、旋转矩阵和超立方体展开。",
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
            sp1_04_title: "SP1.04 // 时间膨胀模拟",
            sp1_04_subtitle: "观察相对论效应：光速下的长度收缩与时间膨胀。",
            sp3_02_title: "SP3.02 // 波动光学",
            sp3_02_subtitle: "探索干涉、衍射和偏振现象。",
            sp1_05_title: "SP1.05 // 莱茵河渡轮",
            sp1_05_subtitle: "掌握巴塞尔 Gierseilfähri 渡轮机制。仅利用水流和缆索横渡莱茵河。",
            sp1_06_title: "SP1.06 // 瑞士钟摆",
            sp1_06_subtitle: "时间的力学：与巴塞尔钟表匠一起探索周期、频率和引力。",
            sp1_08_title: "SP1.08 // 光学实验室",
            sp1_08_subtitle: "探索光、透镜和光学现象。",
            sp2_03_title: "SP2.03 // 电机实验室",
            sp2_03_subtitle: "电磁学与电机原理。",
            sp4_01_title: "SP4.01 // 波动基础",
            sp4_01_subtitle: "波的性质与声音现象。",
            gp5_01_title: "GP5.01 // 原子核核心",
            gp5_01_subtitle: "通过平衡核反应方程式（α、β、γ 衰变）来稳定巴塞尔反应堆。",
            gp5_02: {
                back: "返回枢纽",
                title: "GP5.02 // 相对论实验室",
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
                monitor_title: "GP5.02_相对论监视器",
                footer_left: "GP5.02_相对论实验室 // 节点：CERN",
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
            gp5_04: {
                back: "返回枢纽",
                title: "GP5.04 // 量子隧穿",
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
                monitor_title: "GP5.04_量子监视器",
                footer_left: "GP5.04_量子隧穿 // 节点：CERN",
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
            s3_02_title: "S3.02 // 三角函数之塔",
            s3_02_subtitle: "通过单位圆可视化、波函数和三角形求解掌握正弦、余弦和正切。",
            s2_07_title: "S2.07 // 坐标几何",
            s2_07_subtitle: "掌握距离、中点和斜率计算。",
            s3_04_title: "S3.04 // 对数刻度",
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
            sb2_01_title: "SB2.01 // 孟德尔花园",
            sb2_01_subtitle: "遗传学与庞尼特方格。",
            gb3_01_title: "GB3.01 // DNA 锻造厂",
            gb3_01_subtitle: "分子生物学与 DNA 复制。",
            gm4_01_title: "GM4.01 // 复数地平线",
            gm4_01_subtitle: "在 3D 空间可视化复平面与欧拉公式。",
            gm5_01_title: "GM5.01 // 矩阵变形器",
            gm5_01_subtitle: "在 3D 空间中体验线性变换与特征向量。",
            gms1_01_title: "GMS1.01 // 分形探索者",
            gms1_01_subtitle: "探索数学中的分形与自相似模式。",
            gp5_02_title: "GP5.02 // 相对论实验室",
            gp5_02_subtitle: "在 CERN 计算洛伦兹因子、长度收缩和时间膨胀。",
            gp5_03_title: "GP5.03 // 粒子对撞机",
            gp5_03_subtitle: "模拟 CERN 的 LHC。在 13 TeV 下对撞质子并发现希格斯玻色子。",
            gp5_04_title: "GP5.04 // 量子隧穿",
            gp5_04_subtitle: "用波函数可视化量子隧穿通过势垒。",
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
            title: "S2.02 // 勾股定律与开平方",
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
            monitor_title: "S2.02_视觉监控",
            footer_left: "S2.02_勾股与开方 // 节点：苏黎世",
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
            title: "S3.01 // 一元二次方程",
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
            monitor_title: "S3.01_监控",
            footer_left: "S3.01_一元二次方程 // 节点：苏黎世",
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
            title: "S3.02 // 三角函数圆",
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
            monitor_title: "S3.02_三角函数监控",
            footer_left: "S3.02_三角函数圆 // 节点：巴塞尔",
            labels: {
                angle: "角度 (θ)",
                values: "三角函数值",
                display: "显示选项",
                show_waves: "显示波函数",
                formulas: "公式"
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
                waves_hint: "正弦和余弦形成周期波"
            }
        },
        sm3_03: {
            back: "返回枢纽",
            title: "S3.03 // 增长与对数",
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
            monitor_title: "S3.03_增长监控",
            footer_left: "S3.03_指数函数 // 节点：巴塞尔",
            labels: {
                input: "输入",
                hints: "提示",
                population: "种群数量 (N)",
                time: "时间 (t)",
                doubling_time: "倍增时间 (d)",
                initial: "初始数量 (N₀)"
            },
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
                applications_prompt_latex: "\\text{将指数模型应用于实际场景。}"
            },
            formulas: {
                exponential: "N(t) = N_0 \\cdot 2^{t/d}",
                logarithm: "t = d \\cdot \\log_2(N/N_0)",
                applications: "N(t) = N_0 \\cdot e^{kt}"
            }
        },
        sm2_03: {
            back: "返回枢纽",
            title: "S2.03 // 直线导航器",
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
            monitor_title: "S2.03_激光监视器",
            footer_left: "S2.03_直线导航器 // 节点：巴塞尔",
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
            title: "S2.04 // 相似与比例",
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
            monitor_title: "S2.04_监控",
            footer_left: "S2.04_相似形 // 节点：巴塞尔",
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
            title: "S2.01 // 二项式工厂",
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
                footer_left: "S2.01_代数同步 // 节点：苏黎世工业区",
                verified: "已验证",
                simulating: "模拟中",
            }
        },
        gm1_01: {
            back: "返回枢纽",
            title: "G1.01 // 微积分初步",
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
                title: "任务：流变哨兵",
                description: "巴塞尔，微积分传奇的诞生之地，正在发生偏移。校准流变哨兵以匹配曲线的瞬时变化率。在这座城市，数学精确性就是唯一的法律。"
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
            monitor_title: "G1.01_视觉监控",
            status: "状态: 运行中",
            footer_left: "G1.01_微积分 // 节点: 苏黎世",
            footer_right: "流量之城_第七区",
            stages: {
                intro: "微积分基础",
                differentiation: "微分规则",
                application: "应用题",
                power_rule: "幂规则",
                product_rule: "乘积规则",
                chain_rule: "链式法则",
                intro_prompt_latex: "\\text{计算 }x^n\\text{ 的导数。}",
                differentiation_prompt_latex: "\\text{应用微分规则计算。}",
                application_prompt_latex: "\\text{应用微积分解决问题。}",
                power_rule_prompt_latex: "\\text{应用幂规则：}\\frac{d}{dx}x^n = nx^{n-1}。",
                product_rule_prompt_latex: "\\text{应用乘积规则：}(uv)' = u'v + uv'。",
                chain_rule_prompt_latex: "\\text{应用链式法则：}\\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx}。"
            },
            labels: {
                secant_slope: "割线斜率 m",
                tangent_slope: "切线斜率 m",
                velocity: "速度 v",
                x_coordinate: "x 坐标",
                hints: "提示"
            },
            formulas: {
                power_rule: "f'(x) = nx^{n-1}",
                product_rule: "(uv)' = u'v + uv'",
                chain_rule: "\\frac{dy}{dx} = \\frac{dy}{du}\\frac{du}{dx}"
            },
            integral_preview_title: "即将解锁：积分学",
            integral_preview_desc: "掌握微分的逆运算。计算曲线下的面积。",
            integral_preview_hint: "掌握导数后解锁 →"
        },
        gm2_01: {
            back: "返回枢纽",
            title: "G2.01 // 矢量飞行员 3D",
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
            monitor_title: "G2.01_向量监控",
            footer_left: "G2.01_矢量飞行 // 节点：巴塞尔",
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
            }
        },
        gm3_01: {
            back: "返回枢纽",
            title: "G3.01 // 概率金库",
            difficulty: {
                basic: "基础", core: "核心", advanced: "进阶", elite: "精英"
            },
            objective_title: "当前任务目标",
            target_title: "概率矩阵",
            next: "执行下一序列",
            check: "验证",
            correct: "验证通过",
            incorrect: "匹配失败",
            ready: "就绪",
            monitor_title: "G3.01_概率监测器",
            footer_left: "G3.01_概率仓库 // 节点: 巴塞尔",
            stages: {
                bernoulli: "伯努利试验",
                conditional: "条件概率",
                distribution: "概率分布",
                uniform: "均匀分布",
                biased: "偏移分布",
                extreme: "极端分布",
                bernoulli_prompt_latex: "\\text{计算伯努利试验的概率 P(k; n, p)。}",
                conditional_prompt_latex: "\\text{确定条件概率 P(A|B)。}",
                distribution_prompt_latex: "\\text{预测期望 \\mu 和方差 \\sigma^2。}"
            },
            labels: {
                input: "输入",
                hints: "提示",
                rows: "行数 (n)",
                ball_count: "小球数量",
                show_distribution: "显示分布"
            },
            normal: {
                title: "正态分布",
                mean: "均值 (μ)：",
                std_dev: "标准差 (σ)：",
                variance: "方差 (σ²)："
            },
            binomial: {
                title: "二项分布",
                line_1: "P(X=k) = C(n,k) × p^k × (1-p)^(n-k)",
                line_2: "μ = np",
                line_3: "σ² = np(1-p)",
                line_4: "p = 0.5（公平硬币）"
            },
            mission: {
                title: "任务：高尔顿板",
                description: "观察中心极限定理的实际运行。观察球体通过钉板形成正态分布。"
            }
        },
        sm2_06: {
            back: "返回枢纽",
            title: "S2.06 // 二元一次方程组",
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
            monitor_title: "S2.06_监控",
            footer_left: "S2.06_二元一次方程组 // 节点：巴塞尔",
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
            title: "S2.05 // 幂运算与根号",
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
            monitor_title: "S2.05_监控",
            footer_left: "S2.05_幂与根号 // 节点：巴塞尔",
            stages: {
                rules: "法则",
                negative: "负指数",
                scientific: "科学计数",
                rules_prompt_latex: "\\text{应用幂运算法则化简。}",
                negative_prompt_latex: "\\text{化简含负指数的项。}",
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
        sm1_02: {
            back: "返回枢纽",
            title: "SM1.02 // THALES TOWER",
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
            monitor_title: "SM1.02_THALES_MONITOR",
            footer_left: "SM1.02_THALES_TOWER // NODE: BASEL",
            stages: {
                measure: "MEASURE",
                measure_prompt_latex: "\\text{Use }\\frac{h}{H}=\\frac{l}{L}\\text{ to solve tower height.}"
            },
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
            next: "执行下一序列",
            check: "验证",
            correct: "已验证",
            incorrect: "匹配失败",
            ready: "就绪",
            monitor_title: "C2.01_动力学监视器",
            footer_left: "C2.01_化学动力学 // 节点：巴塞尔",
            stages: {
                arrhenius: "阿伦尼乌斯",
                concentration: "浓度",
                collision: "碰撞",
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
                description: "在巴塞尔实验室研究反应速率处理。掌握阿伦尼乌斯方程和有效碰撞理论。"
            },
            formulas: {
                arrhenius: "k = Ae^{-E_a/RT}",
                concentration: "\\text{速率} = -\\frac{\\Delta[A]}{\\Delta t}",
                collision: "f = e^{-E_a/RT}"
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
        sp1_04: {
            back: "返回枢纽",
            title: "P1.04 // 时间膨胀模拟器",
            difficulty: {
                basic: "基础",
                core: "核心",
                advanced: "进阶",
                elite: "精英"
            },
            objective_title: "当前任务目标",
            target_title: "时空控制台",
            next: "执行下一序列",
            check: "开启推进",
            correct: "物理解析一致",
            incorrect: "时空偏航",
            ready: "就绪",
            monitor_title: "P1.04_相对论核心",
            footer_left: "P1.04_相对论 // 节点：巴塞尔",
            labels: {
                velocity: "速度 (v/c)",
                gamma: "洛伦兹因子 (γ)",
                length: "长度收缩 (L)",
                time: "时间膨胀 (t)"
            },
            mission: {
                title: "任务：爱因斯坦实验室",
                description: "观察时空的扭曲。当物体接近光速时，长度会发生收缩，时间会发生膨胀。"
            },
            stages: {
                contraction: "长度收缩",
                dilation: "时间膨胀",
                spacetime: "时空网格",
                contraction_prompt_latex: "\\text{计算收缩后的长度 } L = L_0/\\gamma。",
                dilation_prompt_latex: "\\text{计算膨胀后的时间 } t = t_0 \\cdot \\gamma。",
                spacetime_prompt_latex: "\\text{分析给定速度下的洛伦兹因子 } \\gamma。"
            }
        },
        sp1_05: {
            back: "返回枢纽",
            title: "P1.05 // 莱茵河渡轮",
            stage_label: "莱茵河横渡",
            crossing: "正在横渡...",
            start: "启动引擎",
            reset: "重置位置",
            arrived: "安全抵达",
            drifting: "偏航中...",
            ready: "待命",
            header: "本地物理协议",
            description: "掌握 Gierseilfähri 渡轮机制。利用莱茵河水流从大巴塞尔横渡到小巴塞尔。",
            rudder_angle: "舵角",
            port: "左舷",
            center: "中线",
            starboard: "右舷",
            environment: "环境数据",
            river_velocity: "河流速度",
            cable_tension: "缆索张力",
            optimal: "最佳",
            mechanism_title: "机制逻辑",
            mechanism_desc: "巴塞尔渡轮使用上游缆索固定船体，舵角将水流压力转化为横向推力。",
            active_ship: "当前船只",
            ship_name: "Vogel Gryff // Fähri-Basel"
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
        sm2_07: {
            back: "返回枢纽",
            title: "S2.07 // 坐标几何",
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
            monitor_title: "S2.07_坐标监视器",
            footer_left: "S2.07_坐标几何 // 节点：苏黎世",
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
            title: "S3.04 // 对数刻度",
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
            monitor_title: "S3.04_对数监视器",
            footer_left: "S3.04_对数 // 节点：巴塞尔",
            labels: {
                input: "输入",
                hints: "提示",
                ph: "pH 值",
                decibel: "分贝 (dB)",
                richter: "里氏震级"
            },
            mission: {
                title: "对数测量实验室",
                description: "诺华实验室需要对数刻度。掌握 pH 值、分贝和里氏震级。"
            },
            stages: {
                ph: "pH 刻度",
                decibel: "分贝",
                richter: "里氏震级",
                ph_prompt_latex: "\\text{使用 }pH=-\\log[H^+]\\text{ 计算 pH 值。}",
                decibel_prompt_latex: "\\text{使用 }dB=10\\log(I/I_0)\\text{ 计算分贝。}",
                richter_prompt_latex: "\\text{使用 }M=\\log(A/A_0)\\text{ 计算里氏震级。}"
            },
            formulas: {
                ph_scale: "pH = -\\log[H^+]",
                decibel_scale: "dB = 10\\log(I/I_0)",
                richter_scale: "M = \\log(A/A_0)"
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
            title: "SP4.01 // 波动基础",
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
            monitor_title: "SP4.01_波动监视器",
            footer_left: "SP4.01_波动基础 // 节点：莱茵河",
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
            difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
            objective_title: "当前任务目标",
            target_title: "细胞结构",
            next: "执行下一序列",
            check: "验证",
            correct: "已验证",
            incorrect: "匹配失败",
            ready: "就绪",
            monitor_title: "SB1.01_细胞监视器",
            footer_left: "SB1.01_细胞工厂 // 节点：巴塞尔",
            labels: {
                cutaway_view: "切面视图",
                selected: "选中的细胞器",
                organelles: "细胞器",
                instructions: "操作说明"
            },
            mission: {
                title: "任务：细胞探索",
                description: "探索动物细胞结构。识别细胞器并理解其功能。"
            }
        },
        sb2_01: {
            back: "返回枢纽",
            title: "SB2.01 // 孟德尔花园",
            difficulty: { basic: "基础", core: "核心", advanced: "进阶", elite: "精英" },
            objective_title: "当前任务目标",
            target_title: "遗传杂交",
            next: "执行下一序列",
            check: "验证",
            correct: "已验证",
            incorrect: "匹配失败",
            ready: "就绪",
            monitor_title: "SB2.01_遗传学监视器",
            footer_left: "SB2.01_孟德尔花园 // 节点：巴塞尔",
            labels: {
                genetics_basics: "遗传学基础",
                genotype_phenotype: "基因型与表现型",
                dominance: "显性规则",
                mendels_laws: "孟德尔定律",
                instructions: "操作说明"
            },
            mission: {
                title: "任务：孟德尔遗传学",
                description: "掌握孟德尔遗传定律。使用普瑞特方格预测子代比例。"
            }
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
            footer_left: "GB3.01_DNA_熔炉 // 节点：巴塞尔",
            labels: {
                rotation: "旋转",
                auto_rotate: "自动旋转",
                show_bonds: "显示氢键",
                highlight_pair: "高亮碱基对",
                pairing_rules: "碱基配对规则",
                bases: "核苷酸碱基",
                structure: "DNA 结构"
            },
            mission: {
                title: "任务：DNA 双螺旋",
                description: "探索 DNA 结构。掌握互补碱基配对和氢键。"
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
            title: "G4.01 // 复数地平线",
            difficulty: {
                basic: "基础",
                core: "核心",
                advanced: "进阶",
                elite: "精英"
            },
            objective_title: "当前任务目标",
            target_title: "复数",
            next: "执行下一序列",
            check: "验证",
            correct: "已验证",
            incorrect: "匹配失败",
            ready: "就绪",
            monitor_title: "G4.01_复数监视器",
            footer_left: "G4.01_复数地平线 // 节点：苏黎世",
            labels: {
                input: "输入",
                hints: "提示",
                original: "原始 (z)",
                result: "结果 (z^n)",
                magnitude: "模长",
                angle: "角度",
                formulas: "公式",
                real_part: "实部 (a)",
                imaginary_part: "虚部 (b)",
                power: "幂次 (n)"
            },
            mission: {
                title: "任务：复数空间",
                description: "在 3D 空间中探索复平面。掌握欧拉公式和复数幂运算。"
            },
            stages: {
                basics: "基础",
                powers: "幂运算",
                euler: "欧拉公式",
                basics_desc: "理解复数作为二维向量",
                powers_desc: "可视化 z^n 的旋转与缩放",
                euler_desc: "掌握欧拉公式：e^(iθ) = cos(θ) + i·sin(θ)",
                basics_hint: "复数作为平面上的二维向量",
                powers_hint: "z^n 旋转 n·θ 并缩放 r^n",
                euler_hint: "e^(iθ) 描绘单位圆"
            }
        },
        gm5_01: {
            back: "返回枢纽",
            title: "G5.01 // 矩阵几何",
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
            monitor_title: "G5.01_矩阵监视器",
            footer_left: "G5.01_矩阵几何 // 节点：巴塞尔",
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
                rotation: "旋转",
                scale: "缩放",
                shear: "切变",
                rotation_desc: "绕Z轴旋转单位立方体",
                scale_desc: "沿各轴独立缩放立方体",
                shear_desc: "切变立方体形成平行四边形",
                rotation_hint: "旋转保持距离和角度",
                scale_hint: "行列式 = sx × sy × sz",
                shear_hint: "切变保持体积 (det = 1)"
            }
        },
        sc2_02: {
            back: "返回枢纽",
            title: "SC2.02 // pH 哨兵",
            difficulty: {
                core: "核心"
            },
            objective_title: "当前任务目标",
            target_title: "滴定曲线",
            next: "重置",
            check: "验证",
            correct: "已验证",
            incorrect: "匹配失败",
            ready: "就绪",
            monitor_title: "SC2.02_滴定监视器",
            footer_left: "SC2.02_pH哨兵 // 节点：巴塞尔",
            start: "开始滴定",
            pause: "暂停流速",
            reset: "重置实验",
            labels: {
                current_ph: "当前 pH",
                equivalence: "当量点",
                indicators: "指示剂",
                solution_config: "溶液配置",
                acid_molarity: "酸浓度",
                base_molarity: "碱浓度",
                acid_volume: "酸体积",
                added_volume: "已加入体积",
                flow_rate: "流速",
                flow_control: "流速控制"
            },
            indicators: {
                phenolphthalein: "酚酞",
                phenolphthalein_low: "无色",
                phenolphthalein_mid: "过渡",
                phenolphthalein_high: "粉红",
                methyl_orange: "甲基橙",
                methyl_orange_low: "红色",
                methyl_orange_mid: "橙色",
                methyl_orange_high: "黄色"
            },
            mission: {
                title: "任务：滴定哨兵",
                description: "实时校准 pH 曲线。控制流速并观察指示剂变化。"
            },
            stages: {
                titration: "滴定"
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
        gp5_03: {
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
            title: "GP5.02 // 相对论实验室",
            back: "返回 Nexus",
            footer_left: "GP5.02_相对论实验室 // 节点: RHINE",
            monitor_title: "GP5.02_相对论监测器",
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
        gms1_01: {
            title: "GS1.01 // 复杂分形",
            back: "返回 Nexus",
            footer_left: "GS1.01_分形探索器 // 节点: BASEL",
            monitor_title: "GS1.01_分形监测器",
            labels: {
                max_iterations: "最大迭代次数",
                zoom: "缩放",
                zoom_value: "{value}x",
                center_x: "中心 X",
                center_y: "中心 Y",
                color_scheme: "配色方案",
                scheme: {
                    classic: "经典",
                    fire: "火焰",
                    ice: "冰霜",
                    rainbow: "彩虹"
                }
            },
            mandelbrot: {
                title: "曼德勃罗集",
                line_1: "z₀ = 0",
                line_2: "z_{n+1} = z_n² + c",
                line_3: "|z_n| < 2 对所有 n"
            },
            mission: {
                title: "任务：曼德布罗特集",
                description: "使用GPU加速渲染探索曼德布罗特集。深入无限复杂的图案并发现自相似结构。"
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
        }
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
                    description: "Erreiche 100% Genauigkeit in G1.01."
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
            sm2_01_title: "S2.01 // BINOMISCHE FORMELN",
            sm2_01_subtitle: "Meistere die 1. und 2. Binomische Formel durch geometrische Zerlegung.",
            sm2_02_title: "S2.02 // PYTHAGORAS & WURZELN",
            sm2_02_subtitle: "Übe Satz des Pythagoras und Quadratwurzeln mit sinnvollen Schwierigkeitsstufen.",
            sm3_01_title: "S3.01 // QUADRATISCHE GLEICHUNGEN",
            sm3_01_subtitle: "Löse quadratische Gleichungen durch Faktorisieren, Formel und quadratische Ergänzung.",
            sm3_02_title: "S3.02 // TRIGONOMETRIE-ARRAY",
            sm3_02_subtitle: "Trainiere Sinus, Kosinus und Phasenverschiebungen mit Wellen-Feedback.",
            sm3_03_title: "S3.03 // EXPONENTIELLES WACHSTUM",
            sm3_03_subtitle: "Modelliere exponentielles und logarithmisches Wachstum mit Zellteilungssimulationen.",
            sm3_04_title: "S3.04 // LOGARITHMUS-LABOR",
            sm3_04_subtitle: "Dekodiere Logarithmenskalen und inverses Wachstum mit Präzisionsübungen.",
            sm2_07_title: "S2.07 // KOORDINATEN-RECON",
            sm2_07_subtitle: "Meistere Koordinatensysteme, Translationen und Zeichenpräzision im Basler Raster.",
            sm2_03_title: "S2.03 // GERADEN & FUNKTIONEN",
            sm2_03_subtitle: "Übe Steigung, Achsenabschnitt, Graph-Zuordnung und Schnittpunkte mit wenig Eingabe.",
            sm2_04_title: "S2.04 // ÄHNLICHKEIT & SKALIERUNG",
            sm2_04_subtitle: "Trainiere Ähnlichkeitsverhältnisse, Skalierungsfaktoren und angewandtes proportionales Denken.",
            gm1_01_title: "G1.01 // INFINITESIMALRECHNUNG",
            gm1_01_subtitle: "Erkunde Ableitungen und Tangentensteigungen. Berechne Sekanten- und Tangentensteigungen auf Parabeln.",
            gm2_01_title: "G2.01 // VEKTOR-PILOT 3D",
            gm2_01_subtitle: "Steuere Drohnen mit 3D-Vektoren, Skalarprodukt und Betrag über dem Rhein.",
            gm3_01_title: "G3.01 // WAHRSCHEINLICHKEITS-TRESOR",
            gm3_01_subtitle: "Visualisiere Binomialverteilung mit Galton-Brett. Beobachte Konvergenz zur Normalverteilung.",
            sm2_06_title: "S2.06 // GLEICHUNGSSYSTEME",
            sm2_06_subtitle: "Meistere das Einsetzungs- und Additionsverfahren zur Lösung linearer Gleichungssysteme.",
            sm2_05_title: "S2.05 // POTENZEN & WURZELN",
            sm2_05_subtitle: "Systematisches Training der Potenzgesetze, negativen Exponenten und wissenschaftlichen Schreibweise.",
            sm1_01_title: "S1.01 // FLÄCHEN & VOLUMEN",
            sm1_01_subtitle: "Berechne Flächen von Trapezen und Volumen von Prismen und Zylindern.",
            sm1_02_title: "S1.02 // 4D HYPER-GEOMETRIE",
            sm1_02_subtitle: "Erkunde den Tesserakt: 4D-Projektion, Rotationsmatrizen und Hyperwürfel-Entfaltung.",
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
            sp1_04_title: "SP1.04 // ZEITDILATATION",
            sp1_04_subtitle: "Beobachte relativistische Effekte: Längenkontraktion und Zeitdilatation bei Lichtgeschwindigkeit.",
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
            sp4_01_title: "SP4.01 // WELLENGRUNDLAGEN",
            sp4_01_subtitle: "Welleneigenschaften und Schallphänomene.",
            gp5_01_title: "GP5.01 // DER ATOMKERN",
            gp5_01_subtitle: "Stabilisiere den Basler Reaktor durch Ausgleichen von Kernreaktionen: Alpha-, Beta- und Gammazerfall.",
            gp5_02: {
                back: "Zurück zum Nexus",
                title: "GP5.02 // RELATIVITÄTSLABOR",
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
                monitor_title: "GP5.02_RELATIVITAETS_MONITOR",
                footer_left: "GP5.02_RELATIVITAETSLABOR // KNOTEN: CERN",
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
            gp5_04: {
                back: "Zurück zum Nexus",
                title: "GP5.04 // QUANTENTUNNEL",
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
                monitor_title: "GP5.04_QUANTEN_MONITOR",
                footer_left: "GP5.04_QUANTENTUNNEL // KNOTEN: CERN",
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
            s3_02_title: "S3.02 // TRIGONOMETRIE-TURM",
            s3_02_subtitle: "Meistere Sinus, Kosinus und Tangens durch Einheitskreis-Visualisierung, Wellenfunktionen und Dreieckslösung.",
            s2_07_title: "S2.07 // KOORDINATENGEOMETRIE",
            s2_07_subtitle: "Meistern Sie Entfernungs-, Mittelpunkt- und Steigungsberechnungen.",
            s3_03_title: "S3.03 // WACHSTUM & LOGARITHMEN",
            s3_03_subtitle: "Modelliere exponentielles Wachstum und logarithmische Skalen mit Bakteriensimulationen.",
            s3_04_title: "S3.04 // LOGARITHMISCHE SKALEN",
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
            sb2_01_title: "SB2.01 // MENDELS GARTEN",
            sb2_01_subtitle: "Genetik und Punnett-Quadrate.",
            gb3_01_title: "GB3.01 // DNA-SCHMIEDE",
            gb3_01_subtitle: "Molekularbiologie und DNA-Replikation.",
            gm4_01_title: "GM4.01 // KOMPLEXER HORIZONT",
            gm4_01_subtitle: "Visualisieren Sie die komplexe Ebene und die Eulersche Formel im 3D-Raum.",
            gm5_01_title: "GM5.01 // MATRIX-TRANSFORMATION",
            gm5_01_subtitle: "Lineare Transformationen und Eigenvektoren abgebildet auf das Basler Gitter.",
            gms1_01_title: "GMS1.01 // FRAKTAL-ERFORSCHER",
            gms1_01_subtitle: "Erkunden Sie Fraktale und Selbstähnlichkeitsmuster in der Mathematik.",
            gp5_02_title: "GP5.02 // RELATIVITÄTSLABOR",
            gp5_02_subtitle: "Berechnen Sie Lorentz-Faktor, Längenkontraktion und Zeitdilatation bei CERN.",
            gp5_03_title: "GP5.03 // TEILCHENBESCHLEUNIGER",
            gp5_03_subtitle: "Simulieren Sie CERNs LHC. Kollidieren Sie Protonen bei 13 TeV und entdecken Sie das Higgs-Boson.",
            gp5_04_title: "GP5.04 // QUANTENTUNNEL",
            gp5_04_subtitle: "Visualisieren Sie Quantentunneln durch Potentialbarrieren mit Wellenfunktionen.",
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
            title: "S2.02 // PYTHAGORAS & WURZELN",
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
            monitor_title: "S2.02_VISUELLE_UEBERWACHUNG",
            footer_left: "S2.02_PYTHAGORAS // KNOTEN: ZÜRICH",
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
            title: "S3.01 // QUADRATISCHE GLEICHUNGEN",
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
            monitor_title: "S3.01_MONITOR",
            footer_left: "S3.01_QUADRATISCH // KNOTEN: ZÜRICH",
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
            title: "S3.02 // TRIGONOMETRISCHER KREIS",
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
            monitor_title: "S3.02_TRIG_MONITOR",
            footer_left: "S3.02_TRIG_KREIS // KNOTEN: BASEL",
            labels: {
                angle: "WINKEL (θ)",
                values: "TRIGONOMETRISCHE WERTE",
                display: "ANZEIGEOPTIONEN",
                show_waves: "Wellenfunktionen anzeigen",
                formulas: "FORMELN"
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
                wave_functions_prompt_latex: "\\text{Analysiere die Sinus- und Kosinuswellenfunktionen.}",
                triangle_solver_prompt_latex: "\\text{Löse das rechtwinklige Dreieck mit trigonometrischen Verhältnissen.}",
                labels: {
                    input: "EINGABE",
                    hints: "HINWEISE",
                    angle: "Winkel (θ)",
                    sin: "sin(θ)",
                    cos: "cos(θ)",
                    tan: "tan(θ)",
                    opposite: "Gegenkathete",
                    adjacent: "Ankathete",
                    hypotenuse: "Hypotenuse"
                },
                mission: {
                    title: "MISSION: ZÜRICH TURM-KALIBRIERUNG",
                    description: "Kalibriere die Winkelsensoren des Zürcher Aussichtsturms mit trigonometrischen Berechnungen."
                }
            }
        },
        sm3_03: {
            back: "Zurück zum Nexus",
            title: "S3.03 // WACHSTUM & LOGARITHMEN",
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
            monitor_title: "S3.03_WACHSTUM_MONITOR",
            footer_left: "S3.03_EXPONENTIAL // KNOTEN: BASEL",
            labels: {
                input: "EINGABE",
                hints: "HINWEISE",
                population: "Population (N)",
                time: "Zeit (t)",
                doubling_time: "Verdopplungszeit (d)",
                initial: "Anfangszahl (N₀)"
            },
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
                applications_prompt_latex: "\\text{Wende exponentielle Modelle auf reale Szenarien an.}"
            },
            formulas: {
                exponential: "N(t) = N_0 \\cdot 2^{t/d}",
                logarithm: "t = d \\cdot \\log_2(N/N_0)",
                applications: "N(t) = N_0 \\cdot e^{kt}"
            }
        },
        sm2_03: {
            back: "Zurück zum Nexus",
            title: "S2.03 // LINIEN-NAVIGATOR",
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
            monitor_title: "S2.03_LASER_MONITOR",
            footer_left: "S2.03_LINIEN_NAVIGATOR // KNOTEN: BASEL",
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
            title: "S2.04 // ÄHNLICHKEIT & SKALIERUNG",
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
            monitor_title: "S2.04_MONITOR",
            footer_left: "S2.04_AEHNLICHKEIT // KNOTEN: BASEL",
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
            title: "S2.01 // BINOMISCHE FORMELN",
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
                footer_left: "S2.01_ALGEBRA_SYNC // KNOTEN: ZÜRICH",
                verified: "Verifiziert",
                simulating: "Simuliert",
            }
        },
        gm1_01: {
            back: "Zurück zum Nexus",
            title: "G1.01 // INFINITESIMALRECHNUNG",
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
                title: "Mission: Der Flux-Wächter",
                description: "Basel, die Geburtsstadt der Analysis-Legenden, gerät aus dem Gleichgewicht. Kalibrieren Sie den Flux-Wächter, um die Momentangeschwindigkeit der Kurve zu finden. Präzision ist das einzige Gesetz."
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
            monitor_title: "G1.01_MONITOR",
            status: "STATUS: BETRIEBSBEREIT",
            footer_left: "G1.01_INFINITESIMAL // KNOTEN: ZÜRICH",
            footer_right: "FLUX_CITY_SEKTOR_7",
            stages: {
                intro: "INTRO",
                differentiation: "ABLEITUNGEN",
                application: "ANWENDUNGEN",
                power_rule: "POTENZREGEL",
                product_rule: "PRODUKTREGEL",
                chain_rule: "KETTENREGEL",
                intro_prompt_latex: "\\text{Berechne die Ableitung von }x^n.",
                differentiation_prompt_latex: "\\text{Wende die Ableitungsregeln an.}",
                application_prompt_latex: "\\text{Wende Differentialrechnung an, um Probleme zu lösen.}",
                power_rule_prompt_latex: "\\text{Wende die Potenzregel an: }\\frac{d}{dx}x^n = nx^{n-1}.",
                product_rule_prompt_latex: "\\text{Wende die Produktregel an: }(uv)' = u'v + uv'.",
                chain_rule_prompt_latex: "\\text{Wende die Kettenregel an: }\\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx}."
            },
            labels: {
                secant_slope: "Sekantensteigung m",
                tangent_slope: "Tangentensteigung m",
                velocity: "Geschwindigkeit v",
                x_coordinate: "x-Koordinate",
                hints: "HINWEISE"
            },
            formulas: {
                power_rule: "f'(x) = nx^{n-1}",
                product_rule: "(uv)' = u'v + uv'",
                chain_rule: "\\frac{dy}{dx} = \\frac{dy}{du}\\frac{du}{dx}"
            },
            integral_preview_title: "KOMMT BALD: INTEGRALRECHNUNG",
            integral_preview_desc: "Meistere die Umkehrung der Ableitung. Berechne Flächen unter Kurven.",
            integral_preview_hint: "Freischalten nach Ableitungs-Meisterschaft →"
        },
        gm2_01: {
            back: "Zurück zum Nexus",
            title: "G2.01 // VEKTOR-PILOT 3D",
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
            monitor_title: "G2.01_VEKTOR_MONITOR",
            footer_left: "G2.01_VEKTOR_PILOT // KNOTEN: BASEL",
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
            }
        },
        gm3_01: {
            back: "Zurück zum Nexus",
            title: "G3.01 // WAHRSCHEINLICHKEITS-TRESOR",
            difficulty: {
                basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE"
            },
            objective_title: "Aktuelles Missionsziel",
            target_title: "Wahrscheinlichkeitsmatrix",
            next: "Nächste Sequenz",
            check: "Überprüfen",
            correct: "Verifiziert",
            incorrect: "Fehlermeldung",
            ready: "Bereit",
            monitor_title: "G3.01_WAHRSCHEINLICHKEITSMONITOR",
            footer_left: "G3.01_WAHRSCHEINLICHKEITS-TRESOR // KNOTEN: BASEL",
            stages: {
                bernoulli: "BERNOULLI",
                conditional: "BEDINGT",
                distribution: "VERTEILUNG",
                uniform: "GLEICHMÄSSIG",
                biased: "EINSEITIG",
                extreme: "EXTREM",
                bernoulli_prompt_latex: "\\text{Berechne die Wahrscheinlichkeit P(k; n, p) für Bernoulli-Versuche.}",
                conditional_prompt_latex: "\\text{Bestimme die bedingte Wahrscheinlichkeit P(A|B).}",
                distribution_prompt_latex: "\\text{Berechne den Mittelwert \\mu und die Varianz \\sigma^2.}"
            },
            labels: {
                input: "EINGABE",
                hints: "HINWEISE",
                rows: "REIHEN (n)",
                ball_count: "ANZAHL KUGELN",
                show_distribution: "Verteilung anzeigen"
            },
            normal: {
                title: "NORMALVERTEILUNG",
                mean: "Mittelwert (μ):",
                std_dev: "Standardabweichung (σ):",
                variance: "Varianz (σ²):"
            },
            binomial: {
                title: "BINOMIALVERTEILUNG",
                line_1: "P(X=k) = C(n,k) × p^k × (1-p)^(n-k)",
                line_2: "μ = np",
                line_3: "σ² = np(1-p)",
                line_4: "p = 0.5 (faire Münze)"
            },
            mission: {
                title: "MISSION: GALTON-BRETT",
                description: "Beobachten Sie den Zentralen Grenzwertsatz im Einsatz. Verfolgen Sie Kugeln, die durch Nägel fallen und eine Normalverteilung bilden."
            }
        },
        sm2_06: {
            back: "Zurück zum Nexus",
            title: "S2.06 // GLEICHUNGSSYSTEME",
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
            monitor_title: "S2.06_MONITOR",
            footer_left: "S2.06_GLEICHUNGSSYSTEME // KNOTEN: BASEL",
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
            title: "S2.05 // POTENZEN & WURZELN",
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
            monitor_title: "S2.05_MONITOR",
            footer_left: "S2.05_POTENZEN // KNOTEN: BASEL",
            stages: {
                rules: "GESETZE",
                negative: "NEGATIV",
                scientific: "NOTATION",
                rules_prompt_latex: "\\text{Potenzgesetze zur Vereinfachung anwenden.}",
                negative_prompt_latex: "\\text{Terme mit negativen Exponenten vereinfachen.}",
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
        sm1_02: {
            back: "Zurück zum Nexus",
            title: "SM1.02 // THALES TOWER",
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
            monitor_title: "SM1.02_THALES_MONITOR",
            footer_left: "SM1.02_THALES_TOWER // NODE: BASEL",
            stages: {
                measure: "MEASURE",
                measure_prompt_latex: "\\text{Use }\\frac{h}{H}=\\frac{l}{L}\\text{ to solve tower height.}"
            },
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
            next: "Nächste Sequenz ausführen",
            check: "Verifizieren",
            correct: "Verifiziert",
            incorrect: "Fehlreaktion",
            ready: "Bereit",
            monitor_title: "C2.01_KINETIK_MONITOR",
            footer_left: "C2.01_CHEMISCHE_KINETIK // KNOTEN: BASEL",
            stages: {
                arrhenius: "ARRHENIUS",
                concentration: "KONZENTRATION",
                collision: "KOLLISION",
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
        sp1_04: {
            back: "Zurück zum Nexus",
            title: "P1.04 // ZEITDILATATIONSSIMULATOR",
            difficulty: {
                basic: "BASIS",
                core: "KERN",
                advanced: "FORTGESCHRITTEN",
                elite: "ELITE"
            },
            objective_title: "Aktuelles Missionsziel",
            target_title: "Raumzeit-HUD",
            next: "Nächste Sequenz ausführen",
            check: "Warp aktivieren",
            correct: "Identität verifiziert",
            incorrect: "Drift erkannt",
            ready: "Bereit",
            monitor_title: "P1.04_RELATIVITAET_KERN",
            footer_left: "P1.04_RELATIVITAET // KNOTEN: BASEL",
            labels: {
                velocity: "Geschwindigkeit (v/c)",
                gamma: "Lorentz-Faktor (γ)",
                length: "Kontraktion (L)",
                time: "Dilatation (t)"
            },
            mission: {
                title: "MISSION: EINSTEINS LABORATORIUM",
                description: "Beobachte die Krümmung der Raumzeit. Wenn sich die Geschwindigkeit der Lichtgeschwindigkeit nähert, verkürzt sich die Länge und die Zeit dehnt sich aus."
            },
            stages: {
                contraction: "LÄNGENKONTRAKTION",
                dilation: "ZEITDILATATION",
                spacetime: "RAUMZEIT-GITTER",
                contraction_prompt_latex: "\\text{Berechne die kontrahierte Länge } L = L_0/\\gamma.",
                dilation_prompt_latex: "\\text{Berechne die dilatierte Zeit } t = t_0 \\cdot \\gamma.",
                spacetime_prompt_latex: "\\text{Analysiere den Lorentz-Faktor } \\gamma \\text{ für gegebenes } v/c."
            }
        },
        sp1_05: {
            back: "Zurück zum Nexus",
            title: "P1.05 // DIE RHEINFÄHRE",
            stage_label: "RHEIN-ÜBERFAHRT",
            crossing: "ÜBERFAHRT...",
            start: "ANTRIEB STARTEN",
            reset: "POSITION RESET",
            arrived: "SICHER ANGEKOMMEN",
            drifting: "ABTRIFTEN...",
            ready: "BEREIT",
            header: "Lokales Physikprotokoll",
            description: "Meistere die Gierseilfähri. Nutze die Strömung des Rheins, um von Grossbasel nach Kleinbasel zu gelangen.",
            rudder_angle: "Ruderwinkel",
            port: "BACKBORD",
            center: "MITTE",
            starboard: "STEUERBORD",
            environment: "Umweltdaten",
            river_velocity: "Strömungsgeschwindigkeit",
            cable_tension: "Seilspannung",
            optimal: "OPTIMAL",
            mechanism_title: "Mechanik-Logik",
            mechanism_desc: "Basler Fähren nutzen ein stromaufwärts befestigtes Seil. Der Ruderwinkel wandelt Strömungsdruck in Quertrieb um.",
            active_ship: "Aktives Schiff",
            ship_name: "Vogel Gryff // Fähri-Basel"
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
        sm2_07: {
            back: "Zurück zum Nexus",
            title: "S2.07 // KOORDINATENGEOMETRIE",
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
            monitor_title: "S2.07_KOORDINATEN_MONITOR",
            footer_left: "S2.07_KOORD_GEOM // KNOTEN: ZÜRICH",
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
            title: "SP4.01 // WELLENGRUNDLAGEN",
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
            monitor_title: "SP4.01_WELLEN_MONITOR",
            footer_left: "SP4.01_WELLENGRUNDLAGEN // KNOTEN: RHEIN",
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
            difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
            objective_title: "Aktuelles Missionsziel",
            target_title: "Zellstruktur",
            next: "Nächste Sequenz ausführen",
            check: "Prüfen",
            correct: "Verifiziert",
            incorrect: "Abweichung",
            ready: "Bereit",
            monitor_title: "SB1.01_ZELL_MONITOR",
            footer_left: "SB1.01_ZELLFABRIK // KNOTEN: BASEL",
            labels: {
                cutaway_view: "Schnittansicht",
                selected: "AUSGEWÄHLTE ORGANELLE",
                organelles: "ORGANELLEN",
                instructions: "ANWEISUNGEN"
            },
            mission: {
                title: "MISSION: ZELLERKUNDUNG",
                description: "Erkunden Sie die tierische Zellstruktur. Identifizieren Sie Organellen und verstehen Sie ihre Funktionen."
            }
        },
        sb2_01: {
            back: "Zurück zum Nexus",
            title: "SB2.01 // MENDELS GARTEN",
            difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
            objective_title: "Aktuelles Missionsziel",
            target_title: "Genetische Kreuzung",
            next: "Nächste Sequenz ausführen",
            check: "Prüfen",
            correct: "Verifiziert",
            incorrect: "Abweichung",
            ready: "Bereit",
            monitor_title: "SB2.01_GENETIK_MONITOR",
            footer_left: "SB2.01_MENDELS_GARTEN // KNOTEN: BASEL",
            labels: {
                genetics_basics: "GENETIK-GRUNDLAGEN",
                genotype_phenotype: "GENOTYP VS PHÄNOTYP",
                dominance: "DOMINANZREGELN",
                mendels_laws: "MENDELS GESETZE",
                instructions: "ANWEISUNGEN"
            },
            mission: {
                title: "MISSION: MENDELSCHE GENETIK",
                description: "Meistern Sie Mendels Vererbungsgesetze. Sagen Sie Nachkommenverhältnisse mit Punnett-Quadraten voraus."
            }
        },
        gb3_01: {
            back: "Zurück zum Nexus",
            title: "GB3.01 // DNA-SCHMIEDE",
            difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
            objective_title: "Aktuelles Missionsziel",
            target_title: "DNA-Struktur",
            next: "Nächste Sequenz ausführen",
            check: "Prüfen",
            correct: "Verifiziert",
            incorrect: "Abweichung",
            ready: "Bereit",
            monitor_title: "GB3.01_DNA_MONITOR",
            footer_left: "GB3.01_DNA_SCHMIEDE // KNOTEN: BASEL",
            labels: {
                rotation: "ROTATION",
                auto_rotate: "Automatische Rotation",
                show_bonds: "Wasserstoffbrücken anzeigen",
                highlight_pair: "BASENPAAR HERVORHEBEN",
                pairing_rules: "BASENPAARUNGSREGELN",
                bases: "NUKLEOTIDBASEN",
                structure: "DNA-STRUKTUR"
            },
            mission: {
                title: "MISSION: DNA-DOPPELHELIX",
                description: "Erkunden Sie die DNA-Struktur. Meistern Sie komplementäre Basenpaarung und Wasserstoffbrückenbindung."
            }
        },
        sm3_04: {
            back: "Zurück zum Nexus",
            title: "S3.04 // LOGARITHMISCHE SKALEN",
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
            monitor_title: "S3.04_LOG_MONITOR",
            footer_left: "S3.04_LOGARITHMEN // KNOTEN: BASEL",
            labels: {
                input: "EINGABE",
                hints: "HINWEISE",
                ph: "pH-Wert",
                decibel: "Dezibel (dB)",
                richter: "Richterskala"
            },
            mission: {
                title: "LOGARITHMISCHES MESSLABOR",
                description: "Novartis-Labor erfordert logarithmische Skalierung. Meistern Sie pH-Wert, Dezibel und Richterskala."
            },
            stages: {
                ph: "pH-SKALA",
                decibel: "DEZIBEL",
                richter: "RICHTER-SKALA",
                ph_prompt_latex: "\\text{Berechnen Sie den pH-Wert mit }pH=-\\log[H^+].",
                decibel_prompt_latex: "\\text{Berechnen Sie Dezibel mit }dB=10\\log(I/I_0).",
                richter_prompt_latex: "\\text{Berechnen Sie die Richter-Skala mit }M=\\log(A/A_0)."
            },
            formulas: {
                ph_scale: "pH = -\\log[H^+]",
                decibel_scale: "dB = 10\\log(I/I_0)",
                richter_scale: "M = \\log(A/A_0)"
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
            title: "G4.01 // KOMPLEXER HORIZONT",
            difficulty: {
                basic: "BASIS",
                core: "KERN",
                advanced: "ERWEITERT",
                elite: "ELITE"
            },
            objective_title: "Aktuelles Missionsziel",
            target_title: "Komplexe Zahl",
            next: "Nächste Sequenz ausführen",
            check: "Verifizieren",
            correct: "Verifiziert",
            incorrect: "Fehlreaktion",
            ready: "Bereit",
            monitor_title: "G4.01_KOMPLEX_MONITOR",
            footer_left: "G4.01_KOMPLEXER_HORIZONT // KNOTEN: ZÜRICH",
            labels: {
                input: "EINGABE",
                hints: "HINWEISE",
                original: "ORIGINAL (z)",
                result: "ERGEBNIS (z^n)",
                magnitude: "Betrag",
                angle: "Winkel",
                formulas: "FORMELN",
                real_part: "REALTEIL (a)",
                imaginary_part: "IMAGINÄRTEIL (b)",
                power: "POTENZ (n)"
            },
            mission: {
                title: "MISSION: KOMPLEXER RAUM",
                description: "Erkunden Sie die komplexe Ebene in 3D. Meistern Sie Eulers Formel und komplexe Potenzen."
            },
            stages: {
                basics: "GRUNDLAGEN",
                powers: "POTENZEN",
                euler: "EULER",
                basics_desc: "Verstehen Sie komplexe Zahlen als 2D-Vektoren",
                powers_desc: "Visualisieren Sie z^n als Rotation und Skalierung",
                euler_desc: "Meistern Sie Eulers Formel: e^(iθ) = cos(θ) + i·sin(θ)",
                basics_hint: "Komplexe Zahlen als 2D-Vektoren in der Ebene",
                powers_hint: "z^n rotiert um n·θ und skaliert mit r^n",
                euler_hint: "e^(iθ) zeichnet den Einheitskreis"
            }
        },
        gm5_01: {
            back: "Zurück zum Nexus",
            title: "G5.01 // MATRIXGEOMETRIE",
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
            monitor_title: "G5.01_MATRIX_MONITOR",
            footer_left: "G5.01_MATRIXGEOMETRIE // KNOTEN: BASEL",
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
                rotation: "ROTATION",
                scale: "SKALIERUNG",
                shear: "SCHERUNG",
                rotation_desc: "Drehen Sie den Einheitswürfel um die Z-Achse",
                scale_desc: "Skalieren Sie den Würfel entlang jeder Achse unabhängig",
                shear_desc: "Scheren Sie den Würfel, um Parallelogramme zu erstellen",
                rotation_hint: "Rotation erhält Abstände und Winkel",
                scale_hint: "Determinante = sx × sy × sz",
                shear_hint: "Scherung erhält Volumen (det = 1)"
            }
        },
        sc2_02: {
            back: "Zurück zum Nexus",
            title: "SC2.02 // pH-WÄCHTER",
            difficulty: {
                core: "KERN"
            },
            objective_title: "Aktuelles Missionsziel",
            target_title: "Titrationskurve",
            next: "Zurücksetzen",
            check: "Prüfen",
            correct: "Verifiziert",
            incorrect: "Abweichung",
            ready: "Bereit",
            monitor_title: "SC2.02_TITRATION_MONITOR",
            footer_left: "SC2.02_PH_WAECHTER // KNOTEN: BASEL",
            start: "Titration starten",
            pause: "Fluss pausieren",
            reset: "Lauf zurücksetzen",
            labels: {
                current_ph: "Aktueller pH",
                equivalence: "Äquivalenzpunkt",
                indicators: "Indikatoren",
                solution_config: "Lösungs-Konfiguration",
                acid_molarity: "Säure-Molarität",
                base_molarity: "Base-Molarität",
                acid_volume: "Säurevolumen",
                added_volume: "Zugegebenes Volumen",
                flow_rate: "Flussrate",
                flow_control: "Flusssteuerung"
            },
            indicators: {
                phenolphthalein: "Phenolphthalein",
                phenolphthalein_low: "Farblos",
                phenolphthalein_mid: "Übergang",
                phenolphthalein_high: "Pink",
                methyl_orange: "Methylorange",
                methyl_orange_low: "Rot",
                methyl_orange_mid: "Orange",
                methyl_orange_high: "Gelb"
            },
            mission: {
                title: "MISSION: TITRATIONSSENTINEL",
                description: "Kalibrieren Sie die pH-Kurve in Echtzeit. Steuern Sie die Flussrate und verfolgen Sie den Indikatorwechsel."
            },
            stages: {
                titration: "TITRATION"
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
        gp5_03: {
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
            title: "GP5.02 // Relativitätslabor",
            back: "Zurück zum Nexus",
            footer_left: "GP5.02_RELATIVITÄTSLABOR // KNOTEN: RHINE",
            monitor_title: "GP5.02_RELATIVITÄTSMONITOR",
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
        gms1_01: {
            title: "GS1.01 // Komplexes Fraktal",
            back: "Zurück zum Nexus",
            footer_left: "GS1.01_FRAKTAL-ERKUNDE // KNOTEN: BASEL",
            monitor_title: "GS1.01_FRAKTALMONITOR",
            labels: {
                max_iterations: "MAX. ITERATIONEN",
                zoom: "ZOOM",
                zoom_value: "{value}x",
                center_x: "ZENTRUM X",
                center_y: "ZENTRUM Y",
                color_scheme: "FARBSCHEMA",
                scheme: {
                    classic: "KLASSISCH",
                    fire: "FEUER",
                    ice: "EIS",
                    rainbow: "REGENBOGEN"
                }
            },
            mandelbrot: {
                title: "MANDELBROT-MENGE",
                line_1: "z₀ = 0",
                line_2: "z_{n+1} = z_n² + c",
                line_3: "|z_n| < 2 für alle n"
            },
            mission: {
                title: "MISSION: Mandelbrot-Menge",
                description: "Untersuchen Sie die Mandelbrot-Menge mit GPU-beschleunigter Darstellung. Vergrößern Sie in unendliche Komplexität und entdecken Sie selbstähnliche Muster."
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
            }
        },
    }
};

export function useLanguage() {
    const { currentLanguage, setLanguage } = useAppStore();
    const t = (path: string) => {
        const segments = path.split(".");
        let node: unknown = translations[currentLanguage];
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
