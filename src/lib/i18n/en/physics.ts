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
        title: "GP2.01 // GAS LAWS",
        stages: { ideal_gas: "IDEAL GAS", boyles: "BOYLE'S LAW", charles: "CHARLES'S LAW" }
    },
    gp2_02: {
        title: "GP2.02 // THERMODYNAMICS I",
        stages: { first_law: "FIRST LAW", internal_energy: "INTERNAL ENERGY", work_heat: "WORK & HEAT" }
    },
    gp2_03: {
        title: "GP2.03 // HEAT ENGINES",
        stages: { efficiency: "EFFICIENCY", carnot: "CARNOT CYCLE", heat_flow: "HEAT FLOW" }
    },
    gp2_04: {
        title: "GP2.04 // ENTROPY",
        stages: { entropy_concept: "ENTROPY", second_law: "SECOND LAW", arrow_of_time: "TIME ARROW" }
    }
};
