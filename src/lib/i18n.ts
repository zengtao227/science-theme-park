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
            monitor_title: "G1.01_VISUAL_MONITOR",
            status: "STATUS: OPERATIONAL",
            footer_left: "G1.01_CALCULUS // NODE: BASEL",
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
            },
            scenarios: {
                navigation: "Basel Drone Delivery Network: You are programming the navigation system for Basel's autonomous medical supply drones. The drones must calculate precise 3D vectors between hospital rooftops and delivery points across the city. Given coordinates A (departure helipad at Basel University Hospital) and B (arrival point at Claraspital), compute the displacement vector v and its magnitude. The magnitude represents the direct flight distance in meters. Accurate vector calculation is critical for battery management and flight time estimation.",
                dot: "Solar Panel Optimization at Roche Tower: The Roche Tower in Basel is installing adjustable solar panels on its facade. Each panel's orientation is represented by a normal vector v, and the sun's direction at noon is vector w. The dot product v·w determines how much sunlight the panel receives - maximum when parallel (dot product = |v||w|), zero when perpendicular. Calculate the dot product to determine the optimal panel angle. Engineers use this to maximize energy capture throughout the day.",
                mission: "Rhine Navigation System: Basel Port Authority is developing an automated barge navigation system for the Rhine River. A cargo barge must travel from point A (current position) to point B (destination dock). The river current is represented by vector s. Calculate: (1) displacement vector v from A to B, (2) dot product v·s to determine if the current helps or hinders (positive = helps, negative = hinders, zero = perpendicular), and (3) magnitude |v| for the direct distance. This data optimizes fuel consumption and arrival time predictions."
            }
        },
        gm3_01: {
            back: "Back to Nexus",
            title: "G3.01 // PROBABILITY VAULT",
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
            monitor_title: "G3.01_PROBABILITY_MONITOR",
            footer_left: "G3.01_PROBABILITY_VAULT // NODE: BASEL",
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
            monitor_title: "G1.01_视觉监控",
            status: "状态: 运行中",
            footer_left: "G1.01_微积分 // 节点: 巴塞尔",
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
            },
            scenarios: {
                navigation: "巴塞尔无人机配送网络：你正在为巴塞尔的自主医疗物资无人机编程导航系统。无人机必须计算医院屋顶和城市各处配送点之间的精确3D向量。给定坐标A（巴塞尔大学医院的起飞停机坪）和B（Claraspital的到达点），计算位移向量v及其模长。模长表示直线飞行距离（米）。准确的向量计算对电池管理和飞行时间估算至关重要。",
                dot: "罗氏大厦太阳能板优化：巴塞尔的罗氏大厦正在其外墙安装可调节太阳能板。每块板的朝向用法向量v表示，正午时太阳方向为向量w。点积v·w决定板接收多少阳光——平行时最大（点积=|v||w|），垂直时为零。计算点积以确定最佳板角度。工程师用此来最大化全天能量捕获。",
                mission: "莱茵河导航系统：巴塞尔港务局正在开发莱茵河自动驳船导航系统。货运驳船必须从点A（当前位置）行驶到点B（目的地码头）。河流水流用向量s表示。计算：(1) A到B的位移向量v，(2) 点积v·s以确定水流是助力还是阻力（正值=助力，负值=阻力，零=垂直），(3) 模长|v|表示直线距离。这些数据优化燃料消耗和到达时间预测。"
            }
        },
        gm3_01: {
            back: "返回枢纽",
            title: "G3.01 // 概率金库",
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
            monitor_title: "G3.01_概率监测器",
            footer_left: "G3.01_概率仓库 // 节点: 巴塞尔",
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
            monitor_title: "G1.01_MONITOR",
            status: "STATUS: BETRIEBSBEREIT",
            footer_left: "G1.01_INFINITESIMAL // KNOTEN: BASEL",
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
            },
            scenarios: {
                navigation: "Basler Drohnen-Liefernetzwerk: Sie programmieren das Navigationssystem für Basels autonome Medikamenten-Lieferdrohnen. Die Drohnen müssen präzise 3D-Vektoren zwischen Krankenhausdächern und Lieferpunkten in der Stadt berechnen. Gegeben sind Koordinaten A (Abflug-Helipad am Universitätsspital Basel) und B (Ankunftspunkt am Claraspital), berechnen Sie den Verschiebungsvektor v und seinen Betrag. Der Betrag stellt die direkte Flugdistanz in Metern dar. Genaue Vektorberechnung ist kritisch für Batteriemanagement und Flugzeitschätzung.",
                dot: "Solarplatten-Optimierung am Roche-Turm: Der Roche-Turm in Basel installiert verstellbare Solarpaneele an seiner Fassade. Die Ausrichtung jedes Paneels wird durch einen Normalenvektor v dargestellt, und die Sonnenrichtung mittags ist Vektor w. Das Skalarprodukt v·w bestimmt, wie viel Sonnenlicht das Paneel empfängt - maximal bei Parallelität (Skalarprodukt = |v||w|), null bei Orthogonalität. Berechnen Sie das Skalarprodukt, um den optimalen Paneel-Winkel zu bestimmen. Ingenieure nutzen dies zur Maximierung der Energieausbeute über den Tag.",
                mission: "Rhein-Navigationssystem: Die Basler Hafenbehörde entwickelt ein automatisiertes Lastkahn-Navigationssystem für den Rhein. Ein Frachtlastkahn muss von Punkt A (aktuelle Position) zu Punkt B (Zieldock) fahren. Die Flussströmung wird durch Vektor s dargestellt. Berechnen Sie: (1) Verschiebungsvektor v von A nach B, (2) Skalarprodukt v·s um zu bestimmen, ob die Strömung hilft oder hindert (positiv = hilft, negativ = hindert, null = orthogonal), und (3) Betrag |v| für die direkte Distanz. Diese Daten optimieren Kraftstoffverbrauch und Ankunftszeitprognosen."
            }
        },
        gm3_01: {
            back: "Zurück zum Nexus",
            title: "G3.01 // WAHRSCHEINLICHKEITS-TRESOR",
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
            monitor_title: "G3.01_WAHRSCHEINLICHKEITSMONITOR",
            footer_left: "G3.01_WAHRSCHEINLICHKEITS-TRESOR // KNOTEN: BASEL",
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
