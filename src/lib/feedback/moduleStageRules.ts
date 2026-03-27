export const MODULE_STAGE_RULES: Record<string, Record<string, string>> = {
  "gm1-01": {
    POWER_RULE: "\\frac{d}{dx}(x^n)=nx^{n-1}",
    FACTOR_RULE: "\\frac{d}{dx}(c\\cdot f(x))=c\\cdot f'(x)",
    SUM_RULE: "\\frac{d}{dx}(f(x)+g(x))=f'(x)+g'(x)",
    PRODUCT_RULE: "(fg)'=f'g+fg'",
    QUOTIENT_RULE: "\\left(\\frac{f}{g}\\right)'=\\frac{f'g-fg'}{g^2}",
    CHAIN_RULE: "\\frac{d}{dx}f(g(x))=f'(g(x))\\cdot g'(x)",
  },
  "gm1-01-advanced": {
    COMPOSITE: "\\text{Differentiate and combine multiple rules}",
    MODELING: "\\text{Model the quantity first, then differentiate}",
    OPTIMIZATION: "f'(x)=0",
    ANALYSIS: "f'(x),\\;f''(x)",
  },
  "gm1-02": {
    ANTIDERIVATIVE: "\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C",
    DEFINITE_INTEGRAL: "\\int_a^b f(x)\\,dx=F(b)-F(a)",
    APPLICATION: "\\text{Area or accumulation via integrals}",
  },
  "gm1-03": {
    LIMIT_BASICS: "\\lim_{x\\to a}f(x)",
    LIMIT_OPERATIONS: "\\lim(f\\pm g)=\\lim f \\pm \\lim g",
    CONTINUITY: "\\lim_{x\\to a}f(x)=f(a)",
  },
  "gm2-01": {
    NAVIGATION: "\\vec{v}=\\langle x,y\\rangle",
    DOT: "\\vec{a}\\cdot\\vec{b}=|a||b|\\cos\\theta",
    MISSION: "\\text{Use vector operations strategically}",
  },
  "gm2-02": {
    LINE_EQUATIONS: "y=mx+c",
    PLANE_GEOMETRY: "\\text{Plane equations and relationships}",
    SPATIAL_RELATIONSHIPS: "\\text{Distance, angle, and incidence in space}",
  },
  "gm3-01": {
    BASIC_PROB: "P(E)=\\frac{\\text{favorable}}{\\text{total}}",
    BINOMIAL: "P(X=k)=\\binom{n}{k}p^k(1-p)^{n-k}",
    CONDITIONAL: "P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}",
    MISSION: "\\text{Choose the right probability model}",
  },
  "gm4-01": {
    BASICS: "z=a+bi",
    OPERATIONS: "(a+bi)(c+di)",
    POLAR: "z=r(\\cos\\theta+i\\sin\\theta)",
  },
  "sp1-01": {
    FORCE_CONCEPTS: "\\sum \\vec{F}",
    FORCE_COMPOSITION: "\\vec{F}_{\\text{net}}=\\vec{F}_1+\\vec{F}_2",
    FORCE_EQUILIBRIUM: "\\sum \\vec{F}=0",
  },
  "sp1-02": {
    FIRST_LAW: "\\sum F=0 \\Rightarrow v=\\text{constant}",
    SECOND_LAW: "F=ma",
    THIRD_LAW: "\\vec{F}_{AB}=-\\vec{F}_{BA}",
  },
  "sp1-03": {
    ATMOSPHERE: "\\text{Atmospheric layers and composition}",
    WEATHER: "\\text{Weather variables and short-term changes}",
    CLIMATE: "\\text{Long-term climate patterns}",
  },
  "sp1-04": {
    SOLAR_SYSTEM: "\\text{Orbital motion and planetary order}",
    MOON_PHASES: "\\text{Relative Sun-Earth-Moon positions}",
    SEASONS: "\\text{Axial tilt causes seasons}",
  },
  "sp2-01": {
    COMPONENTS: "V=IR",
    CIRCUITS: "R_{\\text{series}},\\;R_{\\text{parallel}}",
    DIAGRAMS: "\\text{Interpret and analyze circuit diagrams}",
  },
  "sp2-02": {
    OHMS_LAW: "V=IR",
    SERIES_CIRCUITS: "R_{\\text{tot}}=R_1+R_2+\\cdots",
    PARALLEL_CIRCUITS: "\\frac{1}{R_{\\text{tot}}}=\\sum\\frac{1}{R_i}",
  },
  "sp2-03": {
    POWER_BASICS: "P=VI",
    ENERGY_CONSUMPTION: "E=Pt",
    EFFICIENCY: "\\eta=\\frac{P_{\\text{out}}}{P_{\\text{in}}}",
  },
  "sp3-01": {
    SI_UNITS: "\\text{Use SI base units}",
    CONVERSION: "\\text{Apply unit conversion factors}",
    PRECISION: "\\text{Significant figures and uncertainty}",
  },
  "sp3-02": {
    NEWTON_1: "\\sum F=0",
    NEWTON_2: "F=ma",
    FRICTION: "F_f=\\mu N",
  },
  "sp3-03": {
    POTENTIAL: "E_p=mgh",
    KINETIC: "E_k=\\frac{1}{2}mv^2",
    POWER: "P=\\frac{W}{t}",
  },
  "sp3-04": {
    PRESSURE: "p=\\frac{F}{A}",
    BUOYANCY: "F_b=\\rho gV",
    HYDRAULICS: "p_1=p_2",
  },
  "sp3-05": {
    LEVERS: "F_1d_1=F_2d_2",
    PULLEYS: "\\text{Mechanical advantage}",
    INCLINED_PLANES: "\\text{Resolve forces along the plane}",
  },
  "sp3-06": {
    SOUND_WAVES: "v=f\\lambda",
    FREQUENCY_PITCH: "\\text{Higher frequency means higher pitch}",
    LOUDNESS_INTENSITY: "I\\propto A^2",
  },
  "sp3-07": {
    COMPOSITION: "\\vec{r}=\\vec{a}+\\vec{b}",
    DRIFT: "\\vec{v}_{\\text{ground}}=\\vec{v}_{\\text{craft}}+\\vec{v}_{\\text{current}}",
    NAVIGATION: "\\text{Use vector diagrams for navigation}",
  },
  "sp3-08": {
    REFLECTION: "\\theta_i=\\theta_r",
    REFRACTION: "n_1\\sin\\theta_1=n_2\\sin\\theta_2",
    LENSES: "\\frac{1}{f}=\\frac{1}{d_o}+\\frac{1}{d_i}",
  },
  "em1-01": {
    BASICS: "\\text{Thales and similar triangles}",
    MEASURE: "\\frac{h_1}{s_1}=\\frac{h_2}{s_2}",
    SURVEY: "\\text{Use proportionality to estimate distance or height}",
  },
  "em2-01": {
    BASIC_TRANSFORMS: "\\text{Apply matrix transformations}",
    DETERMINANT: "\\det\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}=ad-bc",
    COMPOSITION: "AB",
  },
  "em3-01": {
    logic: "\\text{Use formal reasoning and elimination}",
  },
  "gb1-01": {
    NATURAL_SELECTION: "\\text{Variation, selection, adaptation}",
    SPECIATION: "\\text{Isolation and divergence}",
    EVIDENCE: "\\text{Use evidence for evolutionary relationships}",
  },
  "gb2-01": {
    ANATOMY: "\\text{Neuron anatomy and signal flow}",
    POTENTIAL: "\\text{Membrane potential and action potential}",
    SYNAPSE: "\\text{Synaptic transmission}",
  },
  "gb2-02": {
    HORMONE_IDENTIFICATION: "\\text{Match glands, hormones, and functions}",
    FEEDBACK_MECHANISMS: "\\text{Negative and positive feedback}",
    CLINICAL_APPLICATIONS: "\\text{Apply endocrine regulation to scenarios}",
  },
  "gb3-01": {
    PAIRING: "\\text{Base pairing rules}",
    BONDS: "\\text{Hydrogen bonds and backbone structure}",
    SEQUENCE: "\\text{Read and compare DNA sequences}",
  },
  "gb3-02": {
    INNATE: "\\text{Innate immune response}",
    ADAPTIVE: "\\text{Adaptive immunity and memory}",
    VACCINES: "\\text{Vaccines trigger immune memory}",
  },
  "gc1-01": {
    BUILD: "\\text{Build and balance redox half-equations}",
    MEASURE: "\\text{Use oxidation states and electron transfer}",
    ANALYZE: "\\text{Analyze redox processes}",
  },
  "gc1-02": {
    PRINCIPLES: "\\text{Electrochemistry principles}",
    PLATING: "\\text{Electroplating reactions}",
    CORROSION: "\\text{Corrosion as redox chemistry}",
  },
  "gc2-01": {
    ALKANES: "\\text{Hydrocarbon structure and naming}",
    AROMATICS: "\\text{Aromatic stability and substitution}",
    BIOMOLECULES: "\\text{Identify functional biomolecule structures}",
  },
  "gc3-01": {
    CONCENTRATION: "c=\\frac{n}{V}",
    TEMPERATURE: "\\text{Rate depends on temperature}",
    PRESSURE: "\\text{Pressure affects equilibrium and gas behavior}",
  },
  "gc3-02": {
    SC: "\\text{Simple cubic arrangement}",
    BCC: "\\text{Body-centered cubic arrangement}",
    FCC: "\\text{Face-centered cubic arrangement}",
  },
  "gp1-03": {
    acceleration: "\\gamma=\\frac{1}{\\sqrt{1-v^2/c^2}}",
    collision: "\\sqrt{s}",
    detection: "p=qBr",
  },
  "gp1-04": {
    classical: "\\text{Classical transmission and reflection}",
    tunneling: "T\\approx e^{-2\\kappa a}",
    resonance: "\\Delta E=hf",
  },
  "gp2-01": {
    IDEAL_GAS: "PV=nRT",
    BOYLES_LAW: "P_1V_1=P_2V_2",
    CHARLES_LAW: "\\frac{V_1}{T_1}=\\frac{V_2}{T_2}",
  },
  "gp2-02": {
    FIRST_LAW: "\\Delta U=Q-W",
    INTERNAL_ENERGY: "U\\propto nT",
    WORK_HEAT: "Q=mc\\Delta T",
  },
  "gp3-01": {
    WAVE_PROPERTIES: "v=f\\lambda",
    SUPERPOSITION: "\\text{Superposition combines displacements}",
    OPTICS: "\\text{Wave optics and interference}",
  },
  "gp3-02": {
    ELECTRIC_FIELD: "E=\\frac{kQ}{r^2}",
    MAGNETIC_FIELD: "F=qvB",
    PARTICLE_MOTION: "r=\\frac{mv}{qB}",
  },
  "gp3-03": {
    FARADAYS_LAW: "\\mathcal{E}=-N\\frac{\\Delta\\Phi}{\\Delta t}",
    LENZS_LAW: "\\text{Induced current opposes the change}",
    GENERATORS: "\\mathcal{E}=NAB\\omega\\sin(\\omega t)",
  },
  "sb1-01": {
    IDENTIFICATION: "\\text{Identify organelles by structure}",
    FUNCTION: "\\text{Link organelles to functions}",
    ORGANELLES: "\\text{Compare organelles in context}",
  },
  "sb1-01-metabolic": {
    OSMOSIS: "\\text{Water movement across membranes}",
    RESPIRATION: "\\text{Cellular respiration pathways}",
    HOMEOSTASIS: "\\text{Maintain stable internal conditions}",
  },
  "sb1-02": {
    EQUATION: "\\text{Photosynthesis equation}",
    FACTORS: "\\text{Limiting factors affect rate}",
    CHLOROPLAST: "\\text{Chloroplast structure and function}",
  },
  "sb1-03": {
    MITOSIS: "\\text{Mitosis stages and outcomes}",
    MEIOSIS_I: "\\text{Meiosis I separates homologous chromosomes}",
    MEIOSIS_II: "\\text{Meiosis II separates sister chromatids}",
  },
  "sb1-04": {
    PLANT_STRUCTURE: "\\text{Plant tissues and organs}",
    WATER_TRANSPORT: "\\text{Xylem transports water}",
    NUTRIENT_TRANSPORT: "\\text{Phloem transports sugars}",
  },
  "sb1-05": {
    ANIMAL_CLASSIFICATION: "\\text{Classify by key characteristics}",
    ADAPTATIONS: "\\text{Relate adaptations to environment}",
    BEHAVIOR_EVOLUTION: "\\text{Behavior and evolution}",
  },
  "sb2-01-tissues": {
    TISSUES: "\\text{Tissue types and features}",
    ORGANS: "\\text{Organs are made of tissues}",
    SYSTEMS: "\\text{Systems coordinate organ functions}",
  },
  "sb2-02": {
    DIGESTIVE: "\\text{Digestive system pathway and function}",
    CIRCULATORY: "\\text{Circulatory transport and exchange}",
    RESPIRATORY: "\\text{Gas exchange in the respiratory system}",
  },
  "sb2-02-body-systems": {
    DIGESTIVE: "\\text{Digestive system pathway and function}",
    CIRCULATORY: "\\text{Circulatory transport and exchange}",
    RESPIRATORY: "\\text{Gas exchange in the respiratory system}",
  },
  "sb2-03": {
    MONOHYBRID: "\\text{Monohybrid inheritance}",
    PROBABILITY: "\\text{Genetic probability and ratios}",
    DIHYBRID: "\\text{Dihybrid inheritance}",
  },
  "sb2-04": {
    DIGESTIVE_SYSTEM: "\\text{Digestive organs and processes}",
    RESPIRATORY_SYSTEM: "\\text{Respiratory organs and gas exchange}",
    CIRCULATORY_SYSTEM: "\\text{Blood flow and transport}",
    EXCRETORY_SYSTEM: "\\text{Excretion and waste removal}",
  },
  "sb3-01": {
    FOOD_CHAINS: "\\text{Trophic levels and feeding relationships}",
    ENERGY_FLOW: "\\text{Energy decreases up trophic levels}",
    CYCLES: "\\text{Matter cycles through ecosystems}",
    ELITE: "\\text{Analyze ecosystem interactions in depth}",
  },
  "sc1-01": {
    IDENTIFY: "\\text{Identify substances by properties}",
    PROPERTIES: "\\text{Physical and chemical properties}",
    REACTIONS: "\\text{Recognize reaction evidence and patterns}",
  },
  "sc1-02": {
    MOLAR_MASS: "M=\\sum n_iA_i",
    STOICHIOMETRY: "n=\\frac{m}{M}",
    YIELD: "\\text{Compare theoretical and actual yield}",
  },
  "sc1-03": {
    build: "\\text{Atomic structure and electron arrangement}",
  },
  "sc1-04": {
    build: "\\text{Periodic trends and atomic structure}",
  },
  "sc1-05": {
    IONIC: "\\text{Electron transfer forms ions}",
    COVALENT: "\\text{Electron sharing forms covalent bonds}",
    METALLIC: "\\text{Delocalized electrons in metallic bonding}",
  },
  "sc1-06": {
    DEFAULT: "\\text{Apply core chemistry reasoning}",
  },
  "sc1-07": {
    RECYCLING: "\\text{Material recovery and reuse}",
    GREEN_CHEMISTRY: "\\text{Principles of green chemistry}",
    CIRCULAR_ECONOMY: "\\text{Reduce waste through circular systems}",
  },
  "sc2-02": {
    CURVES: "\\text{Interpret titration curves}",
    EQUIVALENCE: "\\text{Find the equivalence point}",
    INDICATORS: "\\text{Select a suitable indicator}",
  },
  "sc2-03": {
    boyle: "p_1V_1=p_2V_2",
  },
  "sc2-04": {
    dissolve: "\\text{Solubility depends on conditions}",
  },
  "sc2-06": {
    OXIDATION_STATE: "\\text{Assign oxidation states}",
    ELECTRON_TRANSFER: "\\text{Track electron transfer}",
    ELECTROCHEMISTRY: "\\text{Relate redox to electrochemical cells}",
  },
  "sc2-07": {
    DEFAULT: "q=mc\\Delta T",
  },
  "sc3-01": {
    ASPIRIN: "\\text{Aspirin structure and properties}",
    CAFFEINE: "\\text{Caffeine structure and functional groups}",
    ADRENALINE: "\\text{Adrenaline structure and reactivity}",
  },
  "sc3-02": {
    HYDROCARBONS: "\\text{Hydrocarbon classification}",
    FUNCTIONAL_GROUPS: "\\text{Identify functional groups}",
    ISOMERS: "\\text{Compare structural isomers}",
  },
  "sc3-03": {
    COMBUSTION: "\\text{Combustion reactions}",
    SUBSTITUTION: "\\text{Substitution reactions}",
    ADDITION: "\\text{Addition reactions}",
  },
  "sc3-04": {
    ALCOHOLS: "\\text{Alcohol structure and reactions}",
    ACIDS: "\\text{Carboxylic acid structure and reactions}",
    ESTERS: "\\text{Ester formation and properties}",
  },
  "sc3-05": {
    VSEPR: "\\text{VSEPR predicts shape from electron domains}",
    HYBRIDIZATION: "\\text{Hybridization and bonding geometry}",
    MO_THEORY: "\\text{Molecular orbital interpretation}",
  },
};
