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
    },

    // GP3.01: Wave Physics
    gp3_01: {
        back: "Zurück zum Nexus",
        title: "GP3.01 // WELLENPHYSIK",
        difficulty: {
            basic: "BASIS",
            core: "KERN",
            advanced: "ERWEITERT",
            elite: "ELITE"
        },
        stages: {
            wave_properties: "WELLENEIGENSCHAFTEN",
            superposition: "ÜBERLAGERUNG",
            optics: "OPTIK"
        },
        scenarios: {
            wave_properties: "Sie analysieren Wellenbewegungen auf dem Rhein in der Nähe der Basler Mittleren Brücke. Der Fluss erzeugt Oberflächenwellen mit unterschiedlichen Frequenzen und Wellenlängen. Das Verständnis der Welleneigenschaften ist entscheidend für die Sicherheit der Basler Rheinschifffahrt und die Planung der neuen Rheinhafenanlagen. Die fundamentale Wellengleichung v = fλ verknüpft Geschwindigkeit, Frequenz und Wellenlänge. Schallwellen breiten sich in Luft mit 340 m/s aus, in Wasser mit 1500 m/s. Dieser Unterschied beeinflusst die Unterwasserkommunikationssysteme der Basler Flussüberwachungsstationen. Die Wellenperiode T = 1/f beschreibt die Schwingungsdauer. Diese Prinzipien gelten für alle Wellenphänomene von Wasserwellen bis zur elektromagnetischen Strahlung.",
            superposition: "Im Basler Stadtcasino untersuchen Akustikingenieure Welleninterferenzmuster zur Optimierung der Klangqualität. Wenn sich zwei Wellen treffen, überlagern sie sich – ihre Amplituden addieren sich algebraisch. Konstruktive Interferenz tritt auf, wenn Wellen in Phase sind und erzeugt lauteren Klang. Destruktive Interferenz entsteht, wenn Wellen gegenphasig sind und führt zur Auslöschung. Stehende Wellen bilden sich im Konzertsaal, wenn reflektierte Wellen mit einfallenden Wellen interferieren und Knoten (Nullamplitude) sowie Bäuche (maximale Amplitude) erzeugen. Das Doppelspaltexperiment demonstriert Welleninterferenz mit Licht und erzeugt helle und dunkle Streifen. Dünnschichtinterferenz erzeugt farbige Muster in Seifenblasen und Ölfilmen, Phänomene, die am Physik-Department der Universität Basel erforscht werden.",
            optics: "Die CERN-Basel-Kollaboration nutzt fortschrittliche optische Systeme zur Teilchendetektion. Licht gehorcht dem Reflexionsgesetz (θᵢ = θᵣ) und dem Snelliusschen Brechungsgesetz (n₁sinθ₁ = n₂sinθ₂). Totalreflexion tritt auf, wenn Licht vom dichteren ins dünnere Medium bei Winkeln über dem kritischen Winkel übergeht und ermöglicht die Glasfaserkommunikation in Basels Telekommunikationsinfrastruktur. Einzelspaltbeugung erzeugt charakteristische Muster mit Minima bei asinθ = mλ. Beugungsgitter mit der Gleichung d·sinθ = mλ werden in Spektrometern bei Roche und Novartis für chemische Analysen eingesetzt. Das Rayleigh-Kriterium bestimmt die optischen Auflösungsgrenzen für die Teleskope der Basler Sternwarte."
        },
        objective_title: "Wellenanalyse",
        complete: "Modul abgeschlossen!",
        check: "Verifizieren",
        next: "Nächste Herausforderung",
        correct: "Welle verifiziert",
        incorrect: "Berechnung prüfen",
        ready: "Bereit",
        monitor_title: "GP3.01_WELLEN_MONITOR",
        footer_left: "GP3.01_WELLENPHYSIK // KNOTEN: BASEL",
        prompts: {
            find_velocity: "Eine Welle hat Frequenz {f} Hz und Wellenlänge {lambda} m. Finde Geschwindigkeit v.",
            find_wavelength: "Eine Welle hat Frequenz {f} Hz und Geschwindigkeit {v} m/s. Finde Wellenlänge λ.",
            find_frequency: "Eine Welle hat Geschwindigkeit {v} m/s und Wellenlänge {lambda} m. Finde Frequenz f.",
            verify_wave_eq: "Verifiziere: Welle mit f = {f} Hz, λ = {lambda} m hat Geschwindigkeit v = {v} m/s.",
            water_wave: "Wasserwelle auf dem Rhein: f = {f} Hz, λ = {lambda} m. Finde Geschwindigkeit.",
            find_period: "Eine Welle hat Frequenz {f} Hz. Finde Periode T.",
            period_to_freq: "Eine Welle hat Periode T = {T} s. Finde Frequenz f.",
            sound_in_air: "Schallwelle in Luft (v = 340 m/s) hat Frequenz {f} Hz. Finde Wellenlänge.",
            sound_in_water: "Schallwelle in Wasser (v = 1500 m/s) hat Frequenz {f} Hz. Finde Wellenlänge.",
            speed_ratio: "Schall breitet sich mit 1500 m/s in Wasser, 340 m/s in Luft aus. Finde Verhältnis vWasser/vLuft.",
            doppler_approach: "Krankenwagensirene nähert sich. Ist die beobachtete Frequenz höher oder niedriger?",
            doppler_recede: "Krankenwagensirene entfernt sich. Ist die beobachtete Frequenz höher oder niedriger?",
            constructive_interference: "Zwei Wellen (je A = 2 m) interferieren konstruktiv. Gesamtamplitude?",
            destructive_interference: "Zwei Wellen (je A = 3 m) interferieren destruktiv. Gesamtamplitude?",
            beat_frequency: "Zwei Stimmgabeln: 440 Hz und 444 Hz. Schwebungsfrequenz?",
            de_broglie: "Elektron (m = 9,1×10⁻³¹ kg, v = 1 m/s). De-Broglie-Wellenlänge? (h = 6,63×10⁻³⁴)",
            wave_particle_duality: "Licht zeigt sowohl Wellen- als auch Teilcheneigenschaften. Wahr oder falsch?",
            photon_energy: "Photon mit f = 5×10¹⁴ Hz. Energie E = hf? (h = 6,63×10⁻³⁴)",
            matter_wave: "Elektronenwellenlänge λ = h/mv. Für typisches Elektron, λ ≈ ?",
            uncertainty: "Heisenbergsche Unschärfe: ΔxΔp ≥ h/4π. Können wir beide genau kennen?",
            same_phase_add: "Zwei Wellen (A = 2 m) in Phase. Gesamtamplitude?",
            opposite_phase_cancel: "Zwei Wellen (A = 3 m) gegenphasig. Gesamtamplitude?",
            constructive_max: "Zwei Wellen (A = 1 m) konstruktive Interferenz. Maximale Amplitude?",
            partial_destructive: "Wellen A₁ = 5 m, A₂ = 3 m interferieren destruktiv. Gesamtamplitude?",
            interference_type: "Zwei Wellen in Phase kombinieren. Interferenztyp?",
            standing_wave_node: "Stehende Welle λ = 2 m. Erste Knotenposition x₁?",
            standing_wave_antinode: "Stehende Welle λ = 4 m. Erste Bauchposition x₁?",
            node_count: "Saitenlänge 5 m, λ = 2 m. Anzahl der Knoten?",
            string_fundamental: "Saiten-Grundmode: L = λ/2. Wenn λ = 1 m, finde L.",
            harmonic_wavelength: "Grundton λ₁ = 2 m. Zweite Oberschwingung Wellenlänge λ₂?",
            double_slit_spacing: "Doppelspalt: λ = 500 nm, L = 2 m, d = 1 mm. Streifenabstand Δy?",
            fringe_order: "Doppelspalt: λ = 600 nm, L = 2 m, d = 1,2 mm. Dritter heller Streifen y₃?",
            slit_separation: "Doppelspalt: λ = 500 nm, L = 1 m, Δy = 1 mm. Spaltabstand d?",
            wavelength_from_fringes: "Doppelspalt: Δy = 0,8 mm, d = 0,5 mm, L = 1 m. Wellenlänge λ?",
            central_maximum: "Doppelspalt: Position des zentralen Maximums y₀?",
            thin_film_constructive: "Dünnschicht (n = 2): konstruktive Interferenz für λ = 500 nm, m = 1. Dicke t?",
            thin_film_destructive: "Dünnschicht (n = 2): destruktive Interferenz für λ = 600 nm, m = 0. Dicke t?",
            newton_rings: "Newtonsche Ringe: λ = 500 nm, R = 1 m. Erster heller Ring Radius r₁?",
            soap_bubble: "Seifenblase (n = 1,33, t = 300 nm) reflektiert welche Farbe stark?",
            anti_reflection: "Entspiegelungsschicht (n = 2): λ = 400 nm. Minimale Dicke t?",
            reflection_angle: "Licht fällt unter 30° ein. Reflexionswinkel θᵣ?",
            refraction_basic: "Licht von Luft (n = 1) zu Glas (n = 1,5) bei 30°. Brechungswinkel θ₂?",
            light_speed_medium: "Licht in Glas (n = 1,5). Geschwindigkeit v = c/n?",
            refractive_index: "Lichtgeschwindigkeit im Medium: v = 2×10⁸ m/s. Brechungsindex n?",
            normal_incidence: "Licht senkrecht zur Oberfläche. Brechungswinkel θᵣ?",
            critical_angle: "Glas (n = 1,5) zu Luft (n = 1). Kritischer Winkel θc?",
            total_internal_reflection: "Licht bei 50° von Glas zu Luft (θc = 42°). Totalreflexion?",
            fiber_optics: "Glasfasern nutzen welches Prinzip, um Licht einzufangen?",
            prism_dispersion: "Prisma trennt weißes Licht in Farben. Dieser Effekt heißt?",
            brewster_angle: "Brewster-Winkel für Glas (n = 1,5) zu Luft. tan θB = n₂/n₁. Finde θB.",
            single_slit_minima: "Einzelspalt (a = 1 mm): erstes Minimum für λ = 500 nm. Winkel θ₁?",
            diffraction_width: "Einzelspalt (a = 0,6 mm): λ = 600 nm, L = 1 m. Breite des zentralen Maximums w?",
            rayleigh_criterion: "Teleskop (D = 0,5 m): λ = 500 nm. Minimal auflösbarer Winkel θmin?",
            circular_aperture: "Kreisblende (D = 10 mm, f = 100 mm): λ = 500 nm. Airy-Scheibe Radius r?",
            resolving_power: "Teleskop Durchmesser D = 0,5 m, λ = 500 nm. Auflösungsvermögen R?",
            grating_equation: "Beugungsgitter (d = 1 μm): λ = 500 nm, m = 1. Winkel θ₁?",
            grating_order: "Gitter (d = 2 μm): λ = 600 nm. Maximale Ordnung mmax?",
            grating_spacing: "Gitter: λ = 500 nm, θ₁ = 30°, m = 1. Linienabstand d?",
            spectral_resolution: "Gitter: m = 2, N = 5000 Linien. Spektrale Auflösung R?",
            blazed_grating: "Blazegitter optimiert Effizienz für spezifische Wellenlänge. Zweck?"
        },
        hints: {
            wave_equation: "Verwende v = fλ",
            wavelength_calc: "λ = v/f",
            frequency_calc: "f = v/λ",
            period_calc: "T = 1/f",
            frequency_from_period: "f = 1/T",
            sound_speed_air: "Schall in Luft: 340 m/s",
            sound_speed_water: "Schall in Wasser: 1500 m/s",
            speed_comparison: "Geschwindigkeiten dividieren",
            doppler_effect: "Annähernde Quelle: höhere Frequenz",
            doppler_recede: "Entfernende Quelle: niedrigere Frequenz",
            constructive: "In Phase: Amplituden addieren",
            destructive: "Gegenphasig: Amplituden subtrahieren",
            beats: "Schwebungsfrequenz = |f₁ - f₂|",
            de_broglie: "λ = h/mv",
            duality: "Licht ist sowohl Welle als auch Teilchen",
            photon_energy: "E = hf",
            matter_wave: "Alle Materie hat Welleneigenschaften",
            uncertainty: "Beide können nicht genau bekannt sein",
            in_phase: "Gleiche Phase: Amplituden addieren",
            out_of_phase: "Gegenphase: Amplituden subtrahieren",
            max_amplitude: "Konstruktiv: A₁ + A₂",
            partial_cancel: "Teilweise destruktiv: |A₁ - A₂|",
            interference_types: "In Phase = konstruktiv",
            node_position: "Knoten: x = nλ/2",
            antinode_position: "Bauch: x = (n + 1/2)λ/2",
            node_count: "Zähle λ/2 Intervalle",
            fundamental_mode: "Grundton: L = λ/2",
            second_harmonic: "Zweite Oberschwingung: λ₂ = λ₁/2",
            double_slit: "Δy = λL/d",
            fringe_position: "ym = mλL/d",
            slit_distance: "d = λL/Δy",
            wavelength_measurement: "λ = Δy·d/L",
            central_bright: "Zentrales Maximum bei y = 0",
            thin_film: "Konstruktiv: 2nt = mλ",
            destructive_film: "Destruktiv: 2nt = (m + 1/2)λ",
            newton_rings: "rm = √(mλR)",
            soap_colors: "Interferenz erzeugt Farben",
            anti_reflection: "Viertelwellenschicht: t = λ/4n",
            law_of_reflection: "θᵢ = θᵣ",
            snells_law: "n₁sinθ₁ = n₂sinθ₂",
            light_speed: "v = c/n",
            index_calc: "n = c/v",
            normal_ray: "Senkrecht: keine Brechung",
            critical_angle: "sinθc = n₂/n₁",
            tir_condition: "θ > θc verursacht Totalreflexion",
            fiber_principle: "Totalreflexion",
            dispersion: "Verschiedene λ brechen unterschiedlich",
            brewster: "tanθB = n₂/n₁",
            single_slit: "Minima: asinθ = mλ",
            central_width: "w = 2λL/a",
            rayleigh: "θmin = 1,22λ/D",
            airy_disk: "r = 1,22λf/D",
            resolution: "R = D/(1,22λ)",
            grating: "d·sinθ = mλ",
            max_order: "mmax = d/λ",
            line_spacing: "d = mλ/sinθ",
            grating_resolution: "R = mN",
            blaze_angle: "Optimiert Effizienz"
        }
    }
};
