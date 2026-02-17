/**
 * EN - PHYSICS translations
 * COMPLETE VERSION - Reorganized from Git history assets.
 * Aligning with Basel Sek 3 (SP3.01 - SP3.08) while preserving all legacy global modules.
 */

export const enPhysics = {
    // --- Global Physics Modules (Preserved from original GP series) ---
    gp1_01: {
        back: "Back to Nexus",
        title: "GP1.01 // THE ATOMIC CORE",
        difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
        objective_title: "Active Mission Objective",
        target_title: "Isotope / Decay",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "GP1.01_NUCLEAR_MONITOR",
        footer_left: "GP1.01_MODERN_PHYSICS // NODE: BASEL",
        labels: {
            input: "INPUT PARAMETERS",
            hints: "HINTS",
            balancing: "NUCLEAR EQUATION",
            mass: "Mass Number (A)",
            atomic: "Atomic Number (Z)"
        },
        mission: {
            title: "STABILIZE THE CORE",
            description: "Explore the stability of the atomic core. Understand binding energy and decay modes for various isotopes."
        },
        stages: {
            alpha: "ALPHA DECAY",
            beta: "BETA DECAY",
            gamma: "GAMMA EMISSION",
            fission: "NUCLEAR FISSION"
        }
    },
    gp1_02: {
        back: "Back to Nexus",
        title: "GP5.02 // RELATIVITY LAB",
        difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
        objective_title: "Active Mission Objective",
        target_title: "Relativistic Effects",
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "GP5.02_RELATIVITY_MONITOR",
        footer_left: "GP5.02_SPECIAL_RELATIVITY // NODE: CERN",
        labels: {
            velocity: "Velocity (v/c)",
            lorentz_factor: "Lorentz Factor (γ)",
            time_dilation: "Time Dilation",
            length_contraction: "Length Contraction",
            formulas: "Formulas"
        },
        mission: {
            title: "MISSION: SPECIAL RELATIVITY",
            description: "Explore Einstein's special relativity at CERN. Observe time dilation and length contraction at near-light speeds."
        },
        stages: {
            lorentz: "LORENTZ FACTOR",
            contraction: "LENGTH CONTRACTION",
            dilation: "TIME DILATION"
        }
    },
    gp1_03: {
        back: "Back to Nexus",
        title: "GP5.03 // PARTICLE COLLIDER",
        difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
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
    gp1_04: {
        back: "Back to Nexus",
        title: "GP1.04 // QUANTUM TUNNEL",
        difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
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
            formulas: "FORMULAS"
        },
        mission: {
            title: "MISSION: QUANTUM TUNNELING",
            description: "Explore quantum tunneling through potential barriers. Observe wave function behavior."
        },
        stages: {
            classical: "CLASSICAL LIMIT",
            tunneling: "QUANTUM TUNNELING",
            resonance: "RESONANCE"
        }
    },

    // --- Basel Sek 3 Series (Aligned SP3 Key Map) ---

    // SP3.01: Measurement (from sp1_01)
    sp3_01: {
        back: "Back to Nexus",
        title: "SP3.01 // MEASUREMENT & UNITS",
        check: "Verify",
        next: "Next",
        correct: "Measurement Verified",
        incorrect: "Measurement Error",
        ready: "Ready",
        monitor_title: "SP3.01_MEASUREMENT_LAB",
        footer_left: "SP3.01_MEASUREMENT // NODE: BASEL",
        objective_title: "Measurement Objective",
        difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
        stages: { si_units: "SI UNITS", conversion: "CONVERSION", precision: "PRECISION" },
        tools: { ruler: "Ruler", scale: "Scale", timer: "Timer" },
        labels: { precision: "Measurement Precision", measurement_display: "Measurement Display", input_terminal: "Terminal Input" },
        prompts: {
            si_unit: "What is the SI unit for {measurement}?",
            convert: "Convert {value} {from} to {to}",
            sigfigs: "How many significant figures in {value}?",
            hint_si: "The SI unit is {name}",
            hint_factor: "Multiply by {factor}",
            hint_sigfigs: "Count all non-zero digits and zeros between them"
        },
        scenarios: {
            lab_pharma: "Novartis Quality Control: In Basel's pharmaceutical labs, measuring mass correctly is critical. A tiny error can change the entire chemical reaction.",
            basel_watch: "Swiss Watchmaking Precision: Crafting luxury watches in Basel requires measurements in micrometers. Precision is the soul of Basel's industry."
        },
        feedback: { correct: "Measurement confirmed.", incorrect: "Calibration error detected." }
    },

    // SP3.02: Mechanics - Forces (Existing)
    sp3_02: {
        back: "Return to Hub",
        title: "SP3.02 // FORCES & MOTION",
        difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
        objective_title: "Active Dynamics Data",
        next: "Proceed to Stage",
        check: "Analyze Force",
        correct: "Equilibrium Reached",
        incorrect: "Force Mismatch",
        monitor_title: "SP3.02_DYNAMICS_MONITOR",
        footer_left: "SP3.02_MECHANICS // NODE: BASEL",
        stages: {
            newton_1: "INERTIA",
            newton_2: "F = ma",
            friction: "FRICTIONAL FORCES"
        }
    },

    // SP3.03: Mechanics - Energy (from sp1_03)
    sp3_03: {
        back: "Nexus Exit",
        title: "SP3.03 // ENERGY & WORK",
        difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
        objective_title: "Energy Conservation Goal",
        next: "Next Transformation",
        check: "Calculate Joules",
        correct: "Energy Conserved",
        incorrect: "Energy Leakage",
        monitor_title: "SP3.03_ENERGY_HUB",
        footer_left: "SP3.03_MECHANICS // NODE: BASEL",
        stages: { potential: "POTENTIAL ENERGY", kinetic: "KINETIC ENERGY", work: "POWER OUTPUT" },
        scenarios: {
            rhein_hydro: "Rhine Hydroelectric Power: The flow of the Rhine at the Basel power station converts potential energy into clean electricity for the city.",
            tram_braking: "Basel Tram Energy Recovery: BVB trams use regenerative braking to feed kinetic energy back into the power grid."
        }
    },

    // SP3.04: Fluids & Pressure (from sp1_07)
    sp3_04: {
        back: "Return to Nexus",
        title: "SP3.04 // PRESSURE & FLUIDS",
        difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "SP3.04_FLUID_MONITOR",
        footer_left: "SP3.04_FLUID_MECHANICS // NODE: RHINE",
        objective_title: "Active Mission Objective",
        stages: { pressure: "PRESSURE", buoyancy: "BUOYANCY", hydraulics: "HYDRAULICS" },
        prompts: {
            pressure_depth: "A swimmer dives to {depth} m in the Rhine. Calculate total pressure.",
            buoyant_force: "An object with {volume} m³ is submerged in the Rhine. Calculate buoyancy.",
            hint_pressure: "Use P = P₀ + ρgh",
            hint_archimedes: "Use F_b = ρ_water × V × g"
        },
        scenarios: {
            rhine_swimming: "Rhine River Swimming: Divers explore the Rhine bed near Mittlere Brücke. Water pressure increases with depth.",
            rhine_boat: "Rhine Cargo: Understanding buoyancy is critical for the barges navigating between Basel and Rotterdam."
        },
        feedback: { correct: "Fluid mechanics mastered!", incorrect: "Review Archimedes' principle." }
    },

    // SP3.05: Simple Machines (from sp1_04 - Full Version)
    sp3_05: {
        back: "Return to Nexus",
        title: "SP3.05 // SIMPLE MACHINES",
        difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "SP3.05_MECHANICS_MONITOR",
        footer_left: "SP3.05_SIMPLE_MACHINES // NODE: BASEL",
        objective_title: "Active Mission Objective",
        stages: {
            levers: "LEVERS",
            pulleys: "PULLEYS",
            inclined_planes: "INCLINED PLANES"
        },
        labels: {
            machine_display: "Machine Display",
            input_terminal: "Input Terminal",
            force_ratio: "Mechanical Advantage (MA)",
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
            basel_construction: "Basel Construction Site: Workers at Basel's Roche Tower construction site use levers, pulleys, and ramps to move heavy materials efficiently.",
            lever_crowbar: "Crowbar at Basel Renovation: Renovating historic buildings requires careful use of levers to lift heavy stones.",
            pulley_crane: "Construction Crane Pulley: Basel's cranes use multiple pulley strands to lift steel beams at the port.",
            ramp_loading: "Loading Ramp at Basel Port: Rhine port workers use inclined planes to load cargo onto barges.",
            compound_machine: "Compound Machines: Real construction equipment in Basel combines these principles for massive lifting tasks."
        },
        feedback: {
            correct: "Mechanical advantage calculated correctly!",
            incorrect: "Check your mechanical advantage calculation."
        }
    },

    // SP3.07: Navigation & Vectors (from sp1_05)
    sp3_07: {
        back: "Return to Hub",
        title: "SP3.07 // NAVIGATION & VECTORS",
        difficulty: {
            basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE"
        },
        next: "Execute Next Sequence",
        check: "Verify",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "SP3.07_FERRY_MONITOR",
        footer_left: "SP3.07_RHINE_FERRY // NODE: BASEL",
        stages: {
            composition: "VECTOR ADDITION",
            drift: "DRIFT ANALYSIS",
            navigation: "PRECISION NAV"
        },
        labels: {
            river_speed: "River Speed (v_r)",
            ferry_speed: "Ferry Speed (v_f)",
            cable_angle: "Cable Angle (θ)",
            resultant_speed: "Net Velocity (v_net)",
            drift_speed: "Drift Speed",
            angle: "Angle"
        },
        mission: {
            title: "RHINE CROSSING MISSION",
            description: "Navigate the Basel Rhine ferry. Adjust the cable angle and ferry speed to compensate for the river's current using vector addition."
        },
        prompts: {
            c_b1: "\\text{Ferry moves at } 2m/s \\text{ north. River flows } 1m/s \\text{ north. Net speed?}",
            c_b2: "\\text{Ferry moves at } 1.5m/s \\text{ south against } 1.5m/s \\text{ current. Net speed?}",
            c_c1: "\\text{Calculate the longitudinal velocity component } v_{net,z}.",
            d_c1: "\\text{Find the angle } \\theta \\text{ to achieve zero longitudinal drift if } v_r=1.5, v_f=3.0.",
            n_a1: "\\text{If crossing a 20m wide river with } v_{net,x} \\text{, how long to reach the bank?}",
        },
        results: {
            valid: "Calculation Valid",
            invalid: "Vector Mismatch",
            valid_desc: "Physics confirmed. Proceeding to next objective.",
            invalid_desc: "Recalculate vector components.",
            stability: "Vector Stability",
        }
    },

    // SP3.06: Acoustics (Existing full content)
    sp3_06: {
        back: "Back to Nexus",
        title: "SP3.06 // ACOUSTICS",
        difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
        objective_title: "Sonic Signature Analysis",
        monitor_title: "Acoustics Monitor",
        footer_left: "SP3.06_ACOUSTICS // NODE: BASEL",
        check: "Verify",
        next: "Next Challenge",
        correct: "Correct",
        incorrect: "Incorrect",
        stages: { sound_waves: "SOUND WAVES", frequency_pitch: "FREQUENCY & PITCH", loudness_intensity: "LOUDNESS & INTENSITY" },
        scenarios: {
            stadtcasino_basel: "Basel Symphony Orchestra - Sound Wave Physics: You are working at the Stadtcasino Basel, one of Europe's finest concert halls, known for its perfect sound reflection.",
            euroairport_noise: "Basel Airport - Sound Intensity: Monitoring decibel levels at EuroAirport Basel-Mulhouse to protect the surrounding neighborhoods."
        }
    },

    // SP3.08: Geometrical Optics (from sp1_08)
    sp3_08: {
        title: "SP3.08 // GEOMETRICAL OPTICS",
        back: "Back to Nexus",
        footer_left: "SP3.08_OPTICS_BENCH // NODE: BASEL",
        monitor_title: "SP3.08_OPTICS_MONITOR",
        objective_title: "Photon Path Calibration",
        labels: {
            show_prism: "Show Prism Dispersion",
            medium_1: "MEDIUM 1 (n₁)",
            medium_2: "MEDIUM 2 (n₂)",
            incident_angle: "INCIDENT ANGLE (θ₁)",
            refraction_title: "REFRACTION",
            refracted_angle: "Refracted Angle (θ₂):",
            critical_angle: "Critical Angle:",
            total_internal_reflection: "TOTAL INTERNAL REFLECTION",
            angle_value: "{value}°"
        },
        snell: { title: "SNELL'S LAW", line_1: "n₁ sin(θ₁) = n₂ sin(θ₂)", line_2: "θ_c = arcsin(n₂/n₁)", line_3: "v = c/n" },
        mission: { title: "MISSION: RAY OPTICS", description: "Master the physics of light refraction and reflection using Basel's laboratory models." }
    },

    // --- Thermodynamics (Legacy GP2 series) ---
    gp2_01: {
        back: "Return to Nexus",
        title: "GP2.01 // GAS LAWS",
        difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
        objective_title: "Kinetic Theory Analysis",
        target_title: "Ideal Gas State",
        next: "Next Transformation",
        check: "Analyze State",
        correct: "State Balanced",
        incorrect: "Equation Mismatch",
        ready: "Stable",
        monitor_title: "GP2.01_THERMO_MONITOR",
        footer_left: "GP2.01_THERMODYNAMICS // NODE: BASEL",
        stages: { ideal_gas: "IDEAL GAS", boyles: "BOYLE'S LAW", charles: "CHARLES'S LAW" },
        scenarios: {
            ideal_gas: "The Ideal Gas Law (PV=nRT) describes the behavior of many gases under various conditions.",
            boyles_law: "Boyle's Law: At constant temperature, volume is inversely proportional to pressure.",
            charles_law: "Charles's Law: At constant pressure, volume is directly proportional to temperature."
        }
    },
    gp2_02: {
        back: "Return to Nexus",
        title: "GP2.02 // THERMODYNAMICS I",
        difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
        objective_title: "Thermal Energy Analysis",
        next: "Next Phase",
        check: "Verify Energy",
        correct: "Verified",
        incorrect: "Mismatch",
        ready: "Ready",
        monitor_title: "GP2.02_THERMO_MONITOR",
        footer_left: "GP2.02_THERMODYNAMICS // NODE: BASEL",
        stages: { first_law: "FIRST LAW", internal_energy: "INTERNAL ENERGY", work_heat: "WORK & HEAT" },
        scenarios: {
            first_law: "The First Law of Thermodynamics is the law of conservation of energy.",
            internal_energy: "Internal energy depends on the temperature and state of the system.",
            work_heat: "Heat and work are the two ways energy is transferred."
        }
    },
    gp2_03: {
        title: "GP2.03 // HEAT ENGINES",
        stages: { efficiency: "EFFICIENCY", carnot: "CARNOT CYCLE", heat_flow: "HEAT FLOW" }
    },
    gp2_04: {
        title: "GP2.04 // ENTROPY",
        stages: { entropy_concept: "ENTROPY", second_law: "SECOND LAW", arrow_of_time: "TIME ARROW" }
    },
    
    // GP3.01: Wave Physics
    gp3_01: {
        back: "Back to Nexus",
        title: "GP3.01 // WAVE PHYSICS",
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE"
        },
        stages: {
            wave_properties: "WAVE PROPERTIES",
            superposition: "SUPERPOSITION",
            optics: "OPTICS"
        },
        scenarios: {
            wave_properties: "You are analyzing wave motion on the Rhine River near Basel's Mittlere Brücke. The river generates surface waves with varying frequencies and wavelengths. Understanding wave properties is crucial for Basel's river navigation safety and the design of the new Rhine harbor facilities. The fundamental wave equation v = fλ relates velocity, frequency, and wavelength. Sound waves in air travel at 340 m/s, while in water they travel at 1500 m/s. This difference affects underwater communication systems used by Basel's river monitoring stations. Wave period T = 1/f describes oscillation time. These principles apply to all wave phenomena from water waves to electromagnetic radiation.",
            superposition: "At Basel's Stadtcasino concert hall, acoustic engineers study wave interference patterns to optimize sound quality. When two waves meet, they superpose - their amplitudes add algebraically. Constructive interference occurs when waves are in phase, creating louder sound. Destructive interference happens when waves are out of phase, causing cancellation. Standing waves form in the concert hall when reflected waves interfere with incident waves, creating nodes (zero amplitude) and antinodes (maximum amplitude). The double-slit experiment demonstrates wave interference with light, producing bright and dark fringes. Thin film interference creates colorful patterns in soap bubbles and oil slicks, phenomena studied at Basel University's physics department.",
            optics: "CERN's Basel collaboration uses advanced optical systems for particle detection. Light obeys the law of reflection (θᵢ = θᵣ) and Snell's law of refraction (n₁sinθ₁ = n₂sinθ₂). Total internal reflection occurs when light travels from denser to less dense medium at angles exceeding the critical angle, enabling fiber optic communication in Basel's telecommunications infrastructure. Single-slit diffraction creates characteristic patterns with minima at asinθ = mλ. Diffraction gratings with equation d·sinθ = mλ are used in spectrometers at Roche and Novartis for chemical analysis. The Rayleigh criterion determines optical resolution limits for Basel's astronomical observatory telescopes."
        },
        objective_title: "Wave Analysis",
        complete: "Module Complete!",
        check: "Verify",
        next: "Next Challenge",
        correct: "Wave Verified",
        incorrect: "Check calculation",
        ready: "Ready",
        monitor_title: "GP3.01_WAVE_MONITOR",
        footer_left: "GP3.01_WAVE_PHYSICS // NODE: BASEL",
        prompts: {
            find_velocity: "A wave has frequency {f} Hz and wavelength {lambda} m. Find velocity v.",
            find_wavelength: "A wave has frequency {f} Hz and velocity {v} m/s. Find wavelength λ.",
            find_frequency: "A wave has velocity {v} m/s and wavelength {lambda} m. Find frequency f.",
            verify_wave_eq: "Verify: wave with f = {f} Hz, λ = {lambda} m has velocity v = {v} m/s.",
            water_wave: "Water wave on Rhine River: f = {f} Hz, λ = {lambda} m. Find velocity.",
            find_period: "A wave has frequency {f} Hz. Find period T.",
            period_to_freq: "A wave has period T = {T} s. Find frequency f.",
            sound_in_air: "Sound wave in air (v = 340 m/s) has frequency {f} Hz. Find wavelength.",
            sound_in_water: "Sound wave in water (v = 1500 m/s) has frequency {f} Hz. Find wavelength.",
            speed_ratio: "Sound travels 1500 m/s in water, 340 m/s in air. Find ratio vwater/vair.",
            doppler_approach: "Ambulance siren approaches. Is observed frequency higher or lower?",
            doppler_recede: "Ambulance siren recedes. Is observed frequency higher or lower?",
            constructive_interference: "Two waves (A = 2 m each) interfere constructively. Total amplitude?",
            destructive_interference: "Two waves (A = 3 m each) interfere destructively. Total amplitude?",
            beat_frequency: "Two tuning forks: 440 Hz and 444 Hz. Beat frequency?",
            de_broglie: "Electron (m = 9.1×10⁻³¹ kg, v = 1 m/s). De Broglie wavelength? (h = 6.63×10⁻³⁴)",
            wave_particle_duality: "Light exhibits both wave and particle properties. True or false?",
            photon_energy: "Photon with f = 5×10¹⁴ Hz. Energy E = hf? (h = 6.63×10⁻³⁴)",
            matter_wave: "Electron wavelength λ = h/mv. For typical electron, λ ≈ ?",
            uncertainty: "Heisenberg uncertainty: ΔxΔp ≥ h/4π. Can we know both exactly?",
            same_phase_add: "Two waves (A = 2 m) in phase. Total amplitude?",
            opposite_phase_cancel: "Two waves (A = 3 m) opposite phase. Total amplitude?",
            constructive_max: "Two waves (A = 1 m) constructive interference. Maximum amplitude?",
            partial_destructive: "Waves A₁ = 5 m, A₂ = 3 m interfere destructively. Total amplitude?",
            interference_type: "Two waves in phase combine. Interference type?",
            standing_wave_node: "Standing wave λ = 2 m. First node position x₁?",
            standing_wave_antinode: "Standing wave λ = 4 m. First antinode position x₁?",
            node_count: "String length 5 m, λ = 2 m. Number of nodes?",
            string_fundamental: "String fundamental mode: L = λ/2. If λ = 1 m, find L.",
            harmonic_wavelength: "Fundamental λ₁ = 2 m. Second harmonic wavelength λ₂?",
            double_slit_spacing: "Double slit: λ = 500 nm, L = 2 m, d = 1 mm. Fringe spacing Δy?",
            fringe_order: "Double slit: λ = 600 nm, L = 2 m, d = 1.2 mm. Third bright fringe y₃?",
            slit_separation: "Double slit: λ = 500 nm, L = 1 m, Δy = 1 mm. Slit separation d?",
            wavelength_from_fringes: "Double slit: Δy = 0.8 mm, d = 0.5 mm, L = 1 m. Wavelength λ?",
            central_maximum: "Double slit: central maximum position y₀?",
            thin_film_constructive: "Thin film (n = 2): constructive interference for λ = 500 nm, m = 1. Thickness t?",
            thin_film_destructive: "Thin film (n = 2): destructive interference for λ = 600 nm, m = 0. Thickness t?",
            newton_rings: "Newton rings: λ = 500 nm, R = 1 m. First bright ring radius r₁?",
            soap_bubble: "Soap bubble (n = 1.33, t = 300 nm) reflects which color strongly?",
            anti_reflection: "Anti-reflection coating (n = 2): λ = 400 nm. Minimum thickness t?",
            reflection_angle: "Light incident at 30°. Reflection angle θᵣ?",
            refraction_basic: "Light from air (n = 1) to glass (n = 1.5) at 30°. Refraction angle θ₂?",
            light_speed_medium: "Light in glass (n = 1.5). Speed v = c/n?",
            refractive_index: "Light speed in medium: v = 2×10⁸ m/s. Refractive index n?",
            normal_incidence: "Light perpendicular to surface. Refraction angle θᵣ?",
            critical_angle: "Glass (n = 1.5) to air (n = 1). Critical angle θc?",
            total_internal_reflection: "Light at 50° from glass to air (θc = 42°). Total internal reflection?",
            fiber_optics: "Fiber optics use which principle to trap light?",
            prism_dispersion: "Prism separates white light into colors. This effect is called?",
            brewster_angle: "Brewster angle for glass (n = 1.5) to air. tan θB = n₂/n₁. Find θB.",
            single_slit_minima: "Single slit (a = 1 mm): first minimum for λ = 500 nm. Angle θ₁?",
            diffraction_width: "Single slit (a = 0.6 mm): λ = 600 nm, L = 1 m. Central maximum width w?",
            rayleigh_criterion: "Telescope (D = 0.5 m): λ = 500 nm. Minimum resolvable angle θmin?",
            circular_aperture: "Circular aperture (D = 10 mm, f = 100 mm): λ = 500 nm. Airy disk radius r?",
            resolving_power: "Telescope diameter D = 0.5 m, λ = 500 nm. Resolving power R?",
            grating_equation: "Diffraction grating (d = 1 μm): λ = 500 nm, m = 1. Angle θ₁?",
            grating_order: "Grating (d = 2 μm): λ = 600 nm. Maximum order mmax?",
            grating_spacing: "Grating: λ = 500 nm, θ₁ = 30°, m = 1. Line spacing d?",
            spectral_resolution: "Grating: m = 2, N = 5000 lines. Spectral resolution R?",
            blazed_grating: "Blazed grating optimizes efficiency for specific wavelength. Purpose?"
        },
        hints: {
            wave_equation: "Use v = fλ",
            wavelength_calc: "λ = v/f",
            frequency_calc: "f = v/λ",
            period_calc: "T = 1/f",
            frequency_from_period: "f = 1/T",
            sound_speed_air: "Sound in air: 340 m/s",
            sound_speed_water: "Sound in water: 1500 m/s",
            speed_comparison: "Divide velocities",
            doppler_effect: "Approaching source: higher frequency",
            doppler_recede: "Receding source: lower frequency",
            constructive: "In phase: amplitudes add",
            destructive: "Out of phase: amplitudes subtract",
            beats: "Beat frequency = |f₁ - f₂|",
            de_broglie: "λ = h/mv",
            duality: "Light is both wave and particle",
            photon_energy: "E = hf",
            matter_wave: "All matter has wave properties",
            uncertainty: "Cannot know both exactly",
            in_phase: "Same phase: add amplitudes",
            out_of_phase: "Opposite phase: subtract",
            max_amplitude: "Constructive: A₁ + A₂",
            partial_cancel: "Partial destructive: |A₁ - A₂|",
            interference_types: "In phase = constructive",
            node_position: "Node: x = nλ/2",
            antinode_position: "Antinode: x = (n + 1/2)λ/2",
            node_count: "Count λ/2 intervals",
            fundamental_mode: "Fundamental: L = λ/2",
            second_harmonic: "Second harmonic: λ₂ = λ₁/2",
            double_slit: "Δy = λL/d",
            fringe_position: "ym = mλL/d",
            slit_distance: "d = λL/Δy",
            wavelength_measurement: "λ = Δy·d/L",
            central_bright: "Central maximum at y = 0",
            thin_film: "Constructive: 2nt = mλ",
            destructive_film: "Destructive: 2nt = (m + 1/2)λ",
            newton_rings: "rm = √(mλR)",
            soap_colors: "Interference creates colors",
            anti_reflection: "Quarter-wave coating: t = λ/4n",
            law_of_reflection: "θᵢ = θᵣ",
            snells_law: "n₁sinθ₁ = n₂sinθ₂",
            light_speed: "v = c/n",
            index_calc: "n = c/v",
            normal_ray: "Perpendicular: no bending",
            critical_angle: "sinθc = n₂/n₁",
            tir_condition: "θ > θc causes TIR",
            fiber_principle: "Total internal reflection",
            dispersion: "Different λ refract differently",
            brewster: "tanθB = n₂/n₁",
            single_slit: "Minima: asinθ = mλ",
            central_width: "w = 2λL/a",
            rayleigh: "θmin = 1.22λ/D",
            airy_disk: "r = 1.22λf/D",
            resolution: "R = D/(1.22λ)",
            grating: "d·sinθ = mλ",
            max_order: "mmax = d/λ",
            line_spacing: "d = mλ/sinθ",
            grating_resolution: "R = mN",
            blaze_angle: "Optimizes efficiency"
        }
    }
};
