/**
 * DE - PHYSIK Übersetzungen
 * VOLLSTÄNDIGE VERSION - Reorganisiert nach pädagogischer Reihenfolge (Sek 3 Basel).
 */

export const dePhysics = {
    // --- Global Physics Modules (Moderne Physik & Grundlagen) ---
    gp1_01: {
        back: "Zurück zum Nexus",
        title: "GP1.01 // ATOMKERN",
        difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
        objective_title: "Aktives Missionsziel",
        target_title: "Isotop / Zerfall",
        next: "Nächste Sequenz",
        check: "Verifizieren",
        correct: "Bestätigt",
        incorrect: "Abweichung",
        ready: "Bereit",
        monitor_title: "GP1.01_ATOM_MONITOR",
        footer_left: "GP1.01_MODERNE_PHYSIK // KNOTEN: BASEL",
        labels: {
            input: "EINGABEPARAMETER",
            hints: "HINWEISE",
            balancing: "KERNREAKTIONSGLEICHUNG",
            mass: "Massenzahl (A)",
            atomic: "Ordnungszahl (Z)"
        },
        mission: {
            title: "KERNHÜLLE STABILISIEREN",
            description: "Erforschen Sie die Stabilität des Atomkerns. Verstehen Sie Bindungsenergie und Zerfallsmodi für verschiedene Isotope."
        },
        stages: {
            alpha: "ALPHA-ZERFALL",
            beta: "BETA-ZERFALL",
            gamma: "GAMMA-STRAHLUNG",
            fission: "KERNSPALTUNG"
        }
    },
    gp1_02: {
        back: "Zurück zum Nexus",
        title: "GP5.02 // RELATIVITÄTS-LABOR",
        difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
        objective_title: "Aktives Missionsziel",
        target_title: "Relativistische Effekte",
        next: "Nächste Sequenz",
        check: "Verifizieren",
        correct: "Bestätigt",
        incorrect: "Abweichung",
        ready: "Bereit",
        monitor_title: "GP5.02_RELATIVITY_MONITOR",
        footer_left: "GP5.02_RELATIVITÄT // KNOTEN: CERN",
        labels: {
            velocity: "Geschwindigkeit (v/c)",
            lorentz_factor: "Lorentz-Faktor (γ)",
            time_dilation: "Zeitdilatation",
            length_contraction: "Längenkontraktion",
            formulas: "Formeln"
        },
        mission: {
            title: "MISSION: SPEZIELLE RELATIVITÄT",
            description: "Erforschen Sie Einsteins spezielle Relativitätstheorie am CERN. Beobachten Sie Zeitdilatation und Längenkontraktion bei Lichtgeschwindigkeit."
        },
        stages: {
            lorentz: "LORENTZ-FAKTOR",
            contraction: "LÄNGENKONTRAKTION",
            dilation: "ZEITDILATATION"
        }
    },
    gp1_03: {
        back: "Zurück zum Nexus",
        title: "GP5.03 // TEILCHENBESCHLEUNIGER",
        difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
        objective_title: "Aktives Missionsziel",
        target_title: "LHC ATLAS DETEKTOR",
        next: "Nächste Sequenz",
        check: "Verifizieren",
        correct: "Bestätigt",
        incorrect: "Abweichung",
        ready: "Bereit",
        monitor_title: "GP5.03_LHC_MONITOR",
        footer_left: "GP5.03_TEILCHENPHYSIK // KNOTEN: CERN",
        labels: {
            beam_energy: "STRAHLENERGIE",
            relativistic_effects: "RELATIVISTISCHE EFFEKTE",
            formulas: "FORMELN",
            magnetic_field: "Magnetfeld aktivieren (Ablenkmagnete)",
            colliding: "KOLLISION...",
            initiate_collision: "KOLLISION STARTEN"
        },
        mission: {
            title: "MISSION: TEILCHENPHYSIK",
            description: "Erforschen Sie Teilchenkollisionen am Large Hadron Collider des CERN. Entdecken Sie das Higgs-Boson."
        },
        stages: {
            acceleration: "BESCHLEUNIGUNG",
            collision: "KOLLISION",
            detection: "DETEKTION",
            acceleration_desc: "Protonen auf fast Lichtgeschwindigkeit beschleunigen",
            collision_desc: "Protonenstrahlen bei 13 TeV kollidieren lassen",
            detection_desc: "Teilchenjets und Spuren detektieren",
            acceleration_hint: "Protonen erreichen 99,9999991% der Lichtgeschwindigkeit",
            collision_hint: "Kollisionsenergie: 13 TeV = 13.000 GeV",
            detection_hint: "Das Magnetfeld krümmt die Spuren geladener Teilchen"
        }
    },
    gp1_04: {
        back: "Zurück zum Nexus",
        title: "GP1.04 // QUANTENTUNNEL",
        difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
        objective_title: "Aktives Missionsziel",
        target_title: "Wellenfunktion",
        next: "Nächste Sequenz",
        check: "Verifizieren",
        correct: "Bestätigt",
        incorrect: "Abweichung",
        ready: "Bereit",
        monitor_title: "GP1.04_QUANTEN_MONITOR",
        footer_left: "GP1.04_QUANTENTUNNEL // KNOTEN: CERN",
        labels: {
            particle_energy: "PARTIKELENERGIE (E)",
            barrier_height: "BARRIERENHÖHE (V₀)",
            barrier_width: "BARRIERENBREITE (a)",
            transmission: "TRANSMISSIONSKOEFFIZIENT",
            wave_function: "WELLENFUNKTION",
            probability_density: "WAHRSCHEINLICHKEITSDICHTE |ψ|²",
            incident: "Einfahrend",
            reflected: "Reflektiert",
            transmitted: "Transmittiert",
            formulas: "FORMELN"
        },
        mission: {
            title: "MISSION: QUANTENTUNNELN",
            description: "Erforschen Sie das Quantentunneln durch Potentialbarrieren. Beobachten Sie das Verhalten der Wellenfunktion."
        },
        stages: {
            classical: "KLASSISCHES LIMIT",
            tunneling: "QUANTENTUNNELN",
            resonance: "RESONANZ"
        }
    },

    // --- Basel Sek 3 Serie (Pädagogische Reihenfolge) ---

    // 1. MESSEN (Grundlage)
    sp3_01: {
        back: "Zurück zum Nexus",
        title: "SP3.01 // MESSEN & EINHEITEN",
        check: "Verifizieren",
        next: "Weiter",
        correct: "Messung Bestätigt",
        incorrect: "Messfehler",
        ready: "Bereit",
        monitor_title: "SP3.01_MESSLABOR",
        footer_left: "SP3.01_MESSEN // KNOTEN: BASEL",
        objective_title: "Messziel",
        difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
        stages: { si_units: "SI-EINHEITEN", conversion: "UMRECHNUNG", precision: "PRÄZISION" },
        tools: { ruler: "Lineal", scale: "Waage", timer: "Stoppuhr" },
        labels: { precision: "Messpräzision", measurement_display: "Messanzeige", input_terminal: "Terminal-Eingabe" },
        prompts: {
            si_unit: "Was ist die SI-Einheit für {measurement}?",
            convert: "Rechnen Sie {value} {from} in {to} um",
            sigfigs: "Wie viele signifikante Stellen hat {value}?",
            hint_si: "Die SI-Einheit ist {name}",
            hint_factor: "Multiplizieren Sie mit {factor}",
            hint_sigfigs: "Zählen Sie alle Ziffern außer führenden Nullen"
        },
        scenarios: {
            lab_pharma: "Novartis Qualitätssicherung: In den Basler Pharma-Labors ist die korrekte Massenbeurteilung entscheidend. Ein kleiner Fehler kann eine chemische Reaktion verändern.",
            basel_watch: "Schweizer Präzision: Die Herstellung von Luxusuhren in Basel erfordert Messungen im Mikrometerbereich. Präzision ist die Seele der Basler Industrie."
        },
        feedback: { correct: "Messung bestätigt.", incorrect: "Kalibrierungsfehler erkannt." }
    },

    // 2. KRÄFTE (Mechanik I)
    sp3_02: {
        back: "Zurück zum Hub",
        title: "SP3.02 // KRÄFTE & BEWEGUNG",
        difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
        objective_title: "Aktive Dynamikdaten",
        next: "Nächste Stufe",
        check: "Kraft analysieren",
        correct: "Gleichgewicht erreicht",
        incorrect: "Kraft-Abweichung",
        monitor_title: "SP3.02_DYNAMIK_MONITOR",
        footer_left: "SP3.02_MECHANIK // KNOTEN: BASEL",
        stages: {
            newton_1: "TRÄGHEIT",
            newton_2: "F = ma",
            friction: "REIBUNGSKRÄFTE"
        }
    },

    // 3. ENERGIE (Mechanik II)
    sp3_03: {
        back: "Nexus Verlassen",
        title: "SP3.03 // ENERGIE & ARBEIT",
        difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
        objective_title: "Energieerhaltungsziel",
        next: "Nächste Transformation",
        check: "Joule berechnen",
        correct: "Energieerhaltung bestätigt",
        incorrect: "Energieverlust",
        monitor_title: "SP3.03_ENERGIE_HUB",
        footer_left: "SP3.03_MECHANIK // KNOTEN: BASEL",
        stages: { potential: "POTENTIELLE ENERGIE", kinetic: "KINETISCHE ENERGIE", work: "LEISTUNG" },
        scenarios: {
            rhein_hydro: "Rhinstromkraftwerk: Das Wasser des Rheins im Basler Kraftwerk wandelt potentielle Energie in sauberen Strom für die Stadt um.",
            tram_braking: "BVB Tram Rekuperation: Die Basler Trams nutzen kinetische Energie beim Bremsen, um Strom ins Netz zurückzuspeisen."
        }
    },

    // 4. FLUIDE (Anwendung Mechanik)
    sp3_04: {
        back: "Zurück zum Nexus",
        title: "SP3.04 // DRUCK & FLUIDE",
        difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
        next: "Nächste Sequenz",
        check: "Verifizieren",
        correct: "Bestätigt",
        incorrect: "Abweichung",
        ready: "Bereit",
        monitor_title: "SP3.04_FLUID_MONITOR",
        footer_left: "SP3.04_FLUIDMECHANIK // KNOTEN: RHEIN",
        objective_title: "Aktives Missionsziel",
        stages: { pressure: "DRUCK", buoyancy: "AUFTRIEB", hydraulics: "HYDRAULIK" },
        prompts: {
            pressure_depth: "Ein Schwimmer taucht auf {depth} m im Rhein. Berechnen Sie den Gesamtdruck.",
            buoyant_force: "Ein Objekt mit {volume} m³ ist im Rhein untergetaucht. Berechnen Sie den Auftrieb.",
            hint_pressure: "P = P₀ + ρgh",
            hint_archimedes: "F_a = ρ_wasser × V × g"
        },
        scenarios: {
            rhine_swimming: "Schwimmen im Rhein: Taucher erkunden das Rheinbett bei der Mittleren Brücke. Der Wasserdruck steigt mit der Tiefe.",
            rhine_boat: "Rheinschifffahrt: Das Verständnis von Auftrieb ist entscheidend für die Schiffe zwischen Basel und Rotterdam."
        },
        feedback: { correct: "Fluidmechanik gemeistert!", incorrect: "Überprüfen Sie das archimedische Prinzip." }
    },

    // 5. EINFACHE MASCHINEN (Angewandte Mechanik)
    sp3_05: {
        back: "Zurück zum Nexus",
        title: "SP3.05 // EINFACHE MASCHINEN",
        difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
        next: "Nächste Sequenz",
        check: "Verifizieren",
        correct: "Bestätigt",
        incorrect: "Abweichung",
        ready: "Bereit",
        monitor_title: "SP3.05_MECHANIK_MONITOR",
        footer_left: "SP3.05_MASCHINEN // KNOTEN: BASEL",
        objective_title: "Missionsziel",
        stages: {
            levers: "HEBEL",
            pulleys: "ROLLEN",
            inclined_planes: "SCHIEFE EBENE"
        },
        labels: {
            machine_display: "Maschinen-Anzeige",
            input_terminal: "Eingabeterminal",
            force_ratio: "Kraftübersetzung (MA)",
            show_forces: "Kräfte anzeigen",
            mechanics_score: "Mechanik-Punktestand"
        },
        prompts: {
            lever: "Ein Hebel hebt eine Last von {load} N. Kraftarm: {effortArm} m, Lastarm: {loadArm} m. Welche Kraft ist nötig?",
            pulley: "Flaschenzug mit {strands} tragenden Seilen hebt {load} N. Welche Kraft ist nötig?",
            inclined_plane: "Schiefe Ebene hebt {load} N auf Höhe {height} m über Länge {length} m. Welche Kraft ist nötig?",
            hint_lever: "MA = Kraftarm / Lastarm; F_kraft = F_last / MA",
            hint_pulley: "MA = Anzahl der tragenden Seile; F_kraft = F_last / MA",
            hint_inclined: "MA = Länge / Höhe; F_kraft = F_last / MA"
        },
        scenarios: {
            basel_construction: "Baustelle Roche-Turm: Arbeiter nutzen Hebel, Rollen und Rampen, um schwere Materialien effizient zu bewegen.",
            lever_crowbar: "Brecheisen bei Basler Altbau-Sanierung: Hebelgesetze helfen beim Heben historischer Natursteine.",
            pulley_crane: "Baukräne im Rheinhafen: Kräne nutzen Flaschenzüge, um tonnenschwere Stahlträger zu verladen.",
            ramp_loading: "Laderampe am Basler Rheinhafen: Schiefe Ebenen erleichtern das Beladen der Rheinschiffe."
        },
        feedback: {
            correct: "Mechanischer Vorteil korrekt berechnet!",
            incorrect: "Überprüfen Sie das Hebelgesetz oder die Seilsegmente."
        }
    },

    // SP3.07: Navigation & Vektoren (von sp1_05)
    sp3_07: {
        back: "Zurück zum Hub",
        title: "SP3.07 // NAVIGATION & VEKTOREN",
        difficulty: {
            basic: "BASIS", core: "KERN", advanced: "FORTGESCHNITTEN", elite: "ELITE"
        },
        next: "Nächste Sequenz",
        check: "Verifizieren",
        correct: "Bestätigt",
        incorrect: "Abweichung",
        ready: "Bereit",
        monitor_title: "SP3.07_FERRY_MONITOR",
        footer_left: "SP3.07_RHIN_FERRY // KNOTEN: BASEL",
        stages: {
            composition: "VEKTORADDITION",
            drift: "ABDRIFT-ANALYSE",
            navigation: "PRÄZISIONSNAV"
        },
        labels: {
            river_speed: "Flussgeschwindigkeit (v_r)",
            ferry_speed: "Fährengeschwindigkeit (v_f)",
            cable_angle: "Seilwinkel (θ)",
            resultant_speed: "Netto-Geschwindigkeit (v_net)",
            drift_speed: "Abdrift-Geschwindigkeit",
            angle: "Winkel"
        },
        mission: {
            title: "RHEIN-ÜBERQUERUNG",
            description: "Steuern Sie die Basler Rheinfähre. Passen Sie den Seilwinkel und die Fährengeschwindigkeit an, um die Flussströmung mittels Vektoraddition zu kompensieren."
        },
        prompts: {
            c_b1: "\\text{Fähre bewegt sich mit } 2m/s \\text{ Nord. Fluss fließt } 1m/s \\text{ Nord. Netto-Geschwindigkeit?}",
            c_b2: "\\text{Fähre bewegt sich mit } 1.5m/s \\text{ Süd gegen } 1.5m/s \\text{ Strömung. Netto-Geschwindigkeit?}",
            c_c1: "\\text{Berechnen Sie die Längsgeschwindigkeitskomponente } v_{net,z}.",
            d_c1: "\\text{Finden Sie den Winkel } \\theta \\text{, um eine Null-Längsabdrift zu erreichen, wenn } v_r=1.5, v_f=3.0.",
            n_a1: "\\text{Wenn Sie einen 20m breiten Fluss mit } v_{net,x} \\text{ überqueren, wie lange dauert es bis zum Ufer?}",
        },
        results: {
            valid: "Berechnung gültig",
            invalid: "Vektor-Abweichung",
            valid_desc: "Physik bestätigt. Weiter zum nächsten Ziel.",
            invalid_desc: "Vektorkomponenten neu berechnen.",
            stability: "Vektor-Stabilität",
        }
    },

    // 6. AKUSTIK (Wellenlehre I)
    sp3_06: {
        back: "Zurück zum Nexus",
        title: "SP3.06 // AKUSTIK",
        difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
        objective_title: "Schallsignatur-Analyse",
        monitor_title: "Akustik-Monitor",
        footer_left: "SP3.06_AKUSTIK // KNOTEN: BASEL",
        check: "Verifizieren",
        next: "Nächste Stufe",
        correct: "Richtig",
        incorrect: "Falsch",
        stages: { sound_waves: "SCHALLWELLEN", frequency_pitch: "FREQUENZ & TONHÖHE", loudness_intensity: "LAUTSTÄRKE & INTENSITÄT" },
        scenarios: {
            stadtcasino_basel: "Stadtcasino Basel: Einer der besten Konzertsäle Europas, berühmt für seine perfekte Akustik und Schallreflexion.",
            euroairport_noise: "Flughafen Basel-Mulhouse: Überwachung der Dezibel-Werte zum Schutz der umliegenden Gemeinden."
        }
    },

    // 8. OPTIK (Wellenlehre II)
    sp3_08: {
        title: "SP3.08 // GEOMETRISCHE OPTIK",
        back: "Zurück zum Nexus",
        footer_left: "SP3.08_OPTIK // KNOTEN: BASEL",
        monitor_title: "SP3.08_OPTIK_MONITOR",
        objective_title: "Lichtpfad-Kalibrierung",
        labels: {
            show_prism: "Prismendispersion zeigen",
            medium_1: "MEDIUM 1 (n₁)",
            medium_2: "MEDIUM 2 (n₂)",
            incident_angle: "EINFALLSWINKEL (θ₁)",
            refraction_title: "BRECHUNG",
            refracted_angle: "Brechungswinkel (θ₂):",
            critical_angle: "Grenzwinkel:",
            total_internal_reflection: "TOTALREFLEXION",
            angle_value: "{value}°"
        },
        snell: { title: "SNELLIUS-GESETZ", line_1: "n₁ sin(θ₁) = n₂ sin(θ₂)", line_2: "θ_c = arcsin(n₂/n₁)", line_3: "v = c/n" },
        mission: { title: "MISSION: LICHTBRECHUNG", description: "Meistern Sie die Gesetze der Reflexion und Brechung in den optischen Labors von Basel." }
    },

    // --- Thermodynamik (Legacy GP2 Serie) ---
    gp2_01: {
        back: "Zurück zum Nexus",
        title: "GP2.01 // GASGESETZE",
        difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
        objective_title: "Analyse der kinetischen Gastheorie",
        target_title: "Idealer Gaszustand",
        next: "Nächste Transformation",
        check: "Zustand analysieren",
        correct: "Zustand stabil",
        incorrect: "Gleichungsfehler",
        ready: "Stabil",
        monitor_title: "GP2.01_THERMO_MONITOR",
        footer_left: "GP2.01_THERMODYNAMIK // KNOTEN: BASEL",
        stages: { ideal_gas: "IDEALES GAS", boyles: "BOYLE-MARIOTTE", charles: "GAY-LUSSAC" },
        scenarios: {
            ideal_gas: "Das ideale Gasgesetz (PV=nRT) beschreibt das Verhalten von Gasen unter verschiedenen Bedingungen.",
            boyles_law: "Boyle-Mariotte-Gesetz: Bei konstanter Temperatur ist das Volumen umgekehrt proportional zum Druck.",
            charles_law: "Gesetz von Gay-Lussac: Bei konstantem Druck ist das Volumen direkt proportional zur Temperatur."
        }
    },
    gp2_02: {
        back: "Zurück zum Nexus",
        title: "GP2.02 // THERMODYNAMIK I",
        difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
        objective_title: "Analyse der thermischen Energie",
        next: "Nächste Phase",
        check: "Energie verifizieren",
        correct: "Bestätigt",
        incorrect: "Abweichung",
        ready: "Bereit",
        monitor_title: "GP2.02_THERMO_MONITOR",
        footer_left: "GP2.02_THERMODYNAMIK // KNOTEN: BASEL",
        stages: { first_law: "ERSTER HAUPTSATZ", internal_energy: "INNERE ENERGIE", work_heat: "ARBEIT & WÄRME" },
        scenarios: {
            first_law: "Der erste Hauptsatz der Thermodynamik ist der Satz von der Erhaltung der Energie.",
            internal_energy: "Die innere Energie hängt von der Temperatur und dem Zustand des Systems ab.",
            work_heat: "Wärme und Arbeit sind die zwei Arten, wie Energie übertragen wird."
        }
    },
    gp2_03: {
        title: "GP2.03 // WÄRMEMASCHINEN",
        stages: { efficiency: "WIRKUNGSGRAD", carnot: "CARNOT-PROZESS", heat_flow: "WÄRMEFLUSS" }
    }
};
