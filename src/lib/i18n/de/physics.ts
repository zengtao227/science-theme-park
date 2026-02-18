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
        },
        labels: {
            input: "KRAFTPARAMETER",
            mass: "Masse (m)",
            acc: "Beschleunigung (a)",
            force: "Kraft (F)",
            friction: "Reibung (f)",
            coeff: "Koeffizient (μ)",
            net_force: "Nettokraft (ΣF)",
            normal_force: "Normalkraft (N)"
        },
        prompts: {
            // NEWTON 1 - Trägheit & Gleichgewicht
            rest: "Objekt (m={m}kg) ist in Ruhe. Nettokraft ΣF?",
            const_v: "Objekt (m={m}kg) bewegt sich mit konstanter Geschwindigkeit {v}m/s. Nettokraft ΣF?",
            equilibrium: "Kräfte F₁={f1}N (rechts) und F₂={f2}N (links) wirken auf Objekt. Für Gleichgewicht, F₃?",
            space: "Im Weltraum (keine Reibung), Objekt (m={m}kg) wird mit F={f}N für {t}s geschoben, dann losgelassen. Kraft nach Loslassen?",
            inertia: "Objekt (m={m}kg) in Ruhe. Welche Eigenschaft widersetzt sich Bewegungsänderung?",
            "2d_balance": "Zwei senkrechte Kräfte wirken auf Objekt (m={m}kg). Resultierende Kraft?",
            vector_add: "Kräfte F₁={f}N (Ost) und F₂={f}N (Nord) wirken auf Objekt. Nettokraft?",
            slope: "Objekt (m={m}kg) auf Hang (θ={theta}°) mit Reibung μ={mu}. Normalkomponente?",
            space_friction: "Im Weltraum, Objekt (m={m}kg) erfährt Reibung μ={mu}. Ist das realistisch?",
            complex: "Objekt (m={m}kg) gezogen mit F={f}N gegen Reibung μ={mu}. Nettokraft?",

            // NEWTON 2 - F=ma
            find_f: "Masse m={m}kg beschleunigt mit a={a}m/s². Finde Nettokraft F.",
            find_a: "Nettokraft F={f}N wirkt auf Masse m={m}kg. Finde Beschleunigung a.",
            gravity: "Objekt m={m}kg auf Planet (g={g}m/s²). Gewichtskraft W=mg?",
            net_force: "Kraft F={f}N wirkt auf m={m}kg. Reibung f={fr}N wirkt entgegen. Nettobeschleunigung?",
            friction: "Kraft F={f}N zieht m={m}kg mit Reibung μ={mu}. Beschleunigung?",
            pulley: "Flaschenzugsystem: Masse m={m}kg, angewandte Kraft F={f}N, Reibung μ={mu}. Beschleunigung?",
            variable_mass: "Kraft F={f}N wirkt auf variables Massensystem m={m}kg. Effektive Beschleunigung?",
            coupled: "Zwei gekoppelte Massen: m₁={m}kg, angewandt F={f}N. Systembeschleunigung?",

            // REIBUNG
            static: "Kiste m={m}kg auf Boden (μs={mu}). Maximale Haftreibung?",
            kinetic: "Kiste m={m}kg rutscht (μk={mu}). Gleitreibung?",
            max_static: "Kiste m={m}kg auf Oberfläche (μs={mu}). Maximale Haftreibung vor Rutschen?",
            kinetic_vs_static: "Kiste m={m}kg: μs={mu}, μk={mu}. Welche Reibung ist größer?",
            slope_friction: "Kiste m={m}kg auf Hang (θ={theta}°) mit μ={mu}. Reibungskraft?",
            critical: "Kiste m={m}kg gezogen mit F={f}N mit μ={mu}. Am kritischen Punkt, Nettokraft?",

            // Kompatibilitätsschlüssel
            n1_const_vel: "Objekt (m={m}kg) bewegt sich mit konstanter Geschwindigkeit {v}m/s. Nettokraft ΣF?",
            n1_equilibrium: "Kräfte F₁={f1}N (rechts) und F₂={f2}N (links) wirken auf Objekt. Für Gleichgewicht, F₃?",
            n1_rest: "Objekt (m={m}kg) ist in Ruhe. Kraft F={f}N schiebt rechts. Reibung f={fr}N wirkt links. Beschleunigung?",
            n1_space: "Im Weltraum (keine Reibung), Objekt (m={m}kg) wird mit F={f}N für {t}s geschoben, dann losgelassen. Kraft nach Loslassen?",
            n1_inertia: "Welche Eigenschaft widersetzt sich Bewegungsänderung für ein {m}kg Objekt?",
            n2_find_f: "Masse m={m}kg beschleunigt mit a={a}m/s². Finde Nettokraft F.",
            n2_find_a: "Nettokraft F={f}N wirkt auf Masse m={m}kg. Finde Beschleunigung a.",
            n2_find_m: "Nettokraft F={f}N verursacht Beschleunigung a={a}m/s². Finde Masse m.",
            n2_complex: "Kraft F={f}N zieht Masse m={m}kg gegen Reibung f={fr}N. Finde Beschleunigung.",
            n2_gravity: "Objekt m={m}kg fällt auf Planet (g={g}m/s²). Gewichtskraft Fg?",
            fr_static: "Kiste m={m}kg auf Boden (μs={mu}). Maximale Haftreibung?",
            fr_kinetic: "Kiste m={m}kg rutscht (μk={mu}). Gleitreibung?",
            fr_norm: "Kiste m={m}kg gegen Wand gedrückt mit F={f}N. Normalkraft?",
            fr_slide: "Kiste m={m}kg rutscht auf ebener Fläche. Reibung f={f}N. Koeffizient μk?",
            fr_bank: "Auto fährt auf geneigter Straße (θ={theta}°). Benötigte Reibung?"
        },
        hints: {
            // NEWTON 1
            rest: "In Ruhe bedeutet v=0, also ΣF=0 (Newtons Erstes Gesetz)",
            const_v: "Konstante Geschwindigkeit bedeutet a=0, also ΣF=0",
            equilibrium: "Für Gleichgewicht müssen alle Kräfte ausgeglichen sein: F₁ + F₃ = F₂",
            space: "Nach Loslassen wirkt keine Kraft (F=0 im Weltraum)",
            inertia: "Trägheit ist die Eigenschaft, die Bewegungsänderungen widersetzt",
            "2d_balance": "Verwenden Sie Pythagoras für senkrechte Kräfte",
            vector_add: "Verwenden Sie Vektoraddition: |F_net| = √(F₁² + F₂²)",
            slope: "Normalkraft N = mg cos(θ)",
            space_friction: "Keine Reibung im Weltraum (keine Atmosphäre)",
            complex: "F_net = F_angewandt - f_reibung",

            // NEWTON 2
            find_f: "Verwenden Sie F = ma",
            find_a: "Verwenden Sie a = F/m",
            gravity: "Gewicht W = mg",
            net_force: "F_net = F_angewandt - f, dann a = F_net/m",
            friction: "f = μN = μmg, dann a = (F - f)/m",
            pulley: "Berücksichtigen Sie Spannung und Reibungskräfte",
            variable_mass: "Verwenden Sie F = ma mit effektiver Masse",
            coupled: "Gesamtmasse bewegt sich zusammen: a = F/m_gesamt",

            // REIBUNG
            static: "f_s,max = μs × N = μs × mg",
            kinetic: "f_k = μk × N = μk × mg",
            max_static: "Maximale Haftreibung vor Bewegungsbeginn",
            kinetic_vs_static: "Haftreibung ist normalerweise größer als Gleitreibung",
            slope_friction: "f = μN = μ(mg cos θ)",
            critical: "Am kritischen Punkt, F_angewandt = f_max"
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
        },
        prompts: {
            // POTENTIELLE ENERGIE
            basic_ep: "Objekt m={m}kg in Höhe h={h}m. Berechne potentielle Energie Ep (g={g}m/s²).",
            rhine_hydro: "Rheinwasser m={m}kg fließt von Höhe h={h}m. Potentielle Energie Ep?",
            total_energy: "Objekt m={m}kg in h={h}m mit Geschwindigkeit v={v}m/s. Gesamtmechanische Energie?",
            conservation: "Objekt m={m}kg fällt von h={h}m, erreicht v={v}m/s. Gesamtenergie an jedem Punkt?",

            // KINETISCHE ENERGIE
            basic_ek: "Objekt m={m}kg bewegt sich mit v={v}m/s. Berechne kinetische Energie Ek.",
            tram_braking: "Basler Tram m={m}kg bremst von v={v}m/s. Zurückgewonnene kinetische Energie?",
            velocity_at_bottom: "Objekt m={m}kg fällt von h={h}m mit Anfangsgeschwindigkeit v={v}m/s. Endgeschwindigkeit unten?",
            work_energy: "Objekt m={m}kg mit v={v}m/s. Kraft F={f}N wirkt über d={d}m. Endkinetische Energie?",

            // ARBEIT & LEISTUNG
            basic_work: "Kraft F={f}N bewegt Objekt d={d}m. Berechne Arbeit W.",
            basic_power: "Kraft F={f}N bewegt Objekt d={d}m in t={t}s. Berechne Leistung P.",
            power_lifting: "Kran hebt m={m}kg auf Höhe h={h}m in t={t}s. Leistung P?",
            rhine_power_station: "Rheinkraftwerk hebt Wasser m={m}kg um h={h}m in t={t}s. Leistung P?"
        },
        hints: {
            // POTENTIELLE ENERGIE
            basic_ep: "Verwende Ep = mgh",
            rhine_hydro: "Potentielle Energie Ep = mgh, wobei g=9.8m/s²",
            total_energy: "Gesamtenergie E = Ep + Ek = mgh + ½mv²",
            conservation: "Energieerhaltung: E_gesamt = Ep + Ek = konstant",

            // KINETISCHE ENERGIE
            basic_ek: "Verwende Ek = ½mv²",
            tram_braking: "Kinetische Energie Ek = ½mv²",
            velocity_at_bottom: "Verwende Energieerhaltung: mgh + ½mv₀² = ½mv²",
            work_energy: "Arbeit-Energie-Satz: W = ΔEk, also Ek_end = Ek_anfang + W",

            // ARBEIT & LEISTUNG
            basic_work: "Arbeit W = Fs (Kraft × Weg)",
            basic_power: "Leistung P = W/t = Fs/t",
            power_lifting: "P = W/t = mgh/t",
            rhine_power_station: "Leistung P = mgh/t"
        }
    },

    // 4. FLUIDE (Anwendung Mechanik)
    sp3_04: {
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
    // SP3.07: Navigation & Vektoren - Rheinfähre (60 Fragen: 3 Stufen × 4 Schwierigkeiten × 5 Fragen)
    sp3_07: {
        back: "Zurück zum Hub",
        title: "SP3.07 // NAVIGATION & VEKTOREN",
        difficulty: { basic: "BASIS", core: "KERN", advanced: "ERWEITERT", elite: "ELITE" },
        next: "Nächste Sequenz", check: "Verifizieren", correct: "Bestätigt", incorrect: "Abweichung", ready: "Bereit",
        monitor_title: "SP3.07_FERRY_MONITOR", footer_left: "SP3.07_RHEIN_FÄHRE // KNOTEN: BASEL",
        stages: { composition: "VEKTORADDITION", drift: "ABDRIFT-ANALYSE", navigation: "PRÄZISIONSNAV" },
        labels: {
            river_speed: "Flussgeschwindigkeit (v_r)", ferry_speed: "Fährengeschwindigkeit (v_f)",
            cable_angle: "Seilwinkel (θ)", resultant_speed: "Netto-Geschwindigkeit (v_net)",
            drift_speed: "Abdrift-Geschwindigkeit", angle: "Winkel",
            mission_objective: "MISSIONSZIEL", terminal_input: "TERMINAL-EINGABE",
            hint: "HINWEIS", next_mission: "NÄCHSTE MISSION"
        },
        mission: {
            title: "RHEIN-ÜBERQUERUNG",
            description: "Steuern Sie die Basler Rheinfähre über den Rhein. Meistern Sie die Vektoraddition, um die Flussströmung mit Seilwinkeln und Fährengeschwindigkeit zu kompensieren."
        },
        prompts: {
            c_b1: "\\text{Fähre: }2\\text{ m/s Nord, Fluss: }1\\text{ m/s Nord. Netto-Geschwindigkeit?}",
            c_b2: "\\text{Fähre: }1.5\\text{ m/s Süd, Fluss: }1.5\\text{ m/s Nord. Netto-Geschwindigkeit?}",
            c_b3: "\\text{Fähre: }3\\text{ m/s Nord, Fluss: }0.5\\text{ m/s Nord. Netto-Geschwindigkeit?}",
            c_b4: "\\text{Fähre: }3\\text{ m/s Süd, Fluss: }2\\text{ m/s Nord. Netto-Geschwindigkeit?}",
            c_b5: "\\text{Fähre: }4\\text{ m/s Nord, Fluss: }1\\text{ m/s Nord. Netto-Geschwindigkeit?}",
            c_c1: "\\text{Fähre: }4\\text{ m/s Ost, Fluss: }3\\text{ m/s Nord (senkrecht). Netto-Geschwindigkeit?}",
            c_c2: "\\text{Fähre: }1\\text{ m/s Ost, Fluss: }1\\text{ m/s Nord. Netto-Geschwindigkeit?}",
            c_c3: "\\text{Fähre: }2\\text{ m/s Ost, Fluss: }2\\text{ m/s Nord. Netto-Geschwindigkeit?}",
            c_c4: "\\text{Fähre: }2\\text{ m/s Ost, Fluss: }1.5\\text{ m/s Nord. Netto-Geschwindigkeit?}",
            c_c5: "\\text{Fähre: }12\\text{ m/s Ost, Fluss: }5\\text{ m/s Nord. Netto-Geschwindigkeit?}",
            c_a1: "\\text{Fähre: }4\\text{ m/s bei }60^\\circ\\text{. Horizontale Komponente?}",
            c_a2: "\\text{Fähre: }2\\text{ m/s bei }30^\\circ\\text{, Fluss: }1\\text{ m/s Nord. Netto vertikal?}",
            c_a3: "\\text{Fähre: }3\\text{ m/s bei }45^\\circ\\text{. Horizontale Komponente?}",
            c_a4: "\\text{Fähre: }6\\text{ m/s bei }30^\\circ\\text{, Fluss: }2\\text{ m/s Nord. Netto vertikal?}",
            c_a5: "\\text{Fähre: }4\\text{ m/s bei }60^\\circ\\text{, Fluss: }1\\text{ m/s Nord. Netto vertikal?}",
            c_e1: "\\text{Fähre: }5\\text{ m/s bei }53^\\circ\\text{, Fluss: }2\\text{ m/s Nord. Netto-Betrag?}",
            c_e2: "\\text{Fähre: }4\\text{ m/s bei }37^\\circ\\text{, Fluss: }1.5\\text{ m/s Nord. Netto-Betrag?}",
            c_e3: "\\text{Fähre: }8\\text{ m/s bei }45^\\circ\\text{, Fluss: }3\\text{ m/s Nord. Netto-Winkel?}",
            c_e4: "\\text{Fähre: }6\\text{ m/s bei }60^\\circ\\text{, Fluss: }2.5\\text{ m/s Nord. Netto-Betrag?}",
            c_e5: "\\text{Fähre: }5\\text{ m/s bei }30^\\circ\\text{, Fluss: }1\\text{ m/s Nord. Netto-Winkel?}",
            d_b1: "\\text{Fluss: }1\\text{ m/s, Fähre: }2\\text{ m/s. Winkel für Null-Abdrift?}",
            d_b2: "\\text{Fluss: }1.5\\text{ m/s, Fähre: }3\\text{ m/s. Winkel für Null-Abdrift?}",
            d_b3: "\\text{Fluss: }2\\text{ m/s, Fähre: }4\\text{ m/s. Winkel für Null-Abdrift?}",
            d_b4: "\\text{Fluss: }0.5\\text{ m/s, Fähre: }1\\text{ m/s. Winkel für Null-Abdrift?}",
            d_b5: "\\text{Fluss: }3\\text{ m/s, Fähre: }6\\text{ m/s. Winkel für Null-Abdrift?}",
            d_c1: "\\text{Fluss: }1\\text{ m/s, Fähre: }1.73\\text{ m/s. Winkel für Null-Abdrift?}",
            d_c2: "\\text{Fluss: }2\\text{ m/s, Fähre: }2.83\\text{ m/s. Winkel für Null-Abdrift?}",
            d_c3: "\\text{Fluss: }1.5\\text{ m/s, Fähre: }2.12\\text{ m/s. Winkel für Null-Abdrift?}",
            d_c4: "\\text{Fluss: }3\\text{ m/s, Fähre: }5\\text{ m/s. Winkel für Null-Abdrift?}",
            d_c5: "\\text{Fluss: }2.5\\text{ m/s, Fähre: }3.54\\text{ m/s. Winkel für Null-Abdrift?}",
            d_a1: "\\text{Fluss: }1.2\\text{ m/s, Fähre: }2\\text{ m/s. Winkel für Null-Abdrift?}",
            d_a2: "\\text{Fluss: }1.8\\text{ m/s, Fähre: }3.6\\text{ m/s. Winkel für Null-Abdrift?}",
            d_a3: "\\text{Fluss: }2.4\\text{ m/s, Fähre: }4\\text{ m/s. Winkel für Null-Abdrift?}",
            d_a4: "\\text{Fluss: }3.5\\text{ m/s, Fähre: }7\\text{ m/s. Winkel für Null-Abdrift?}",
            d_a5: "\\text{Fluss: }1.6\\text{ m/s, Fähre: }3.2\\text{ m/s. Winkel für Null-Abdrift?}",
            d_e1: "\\text{Fluss: }2.7\\text{ m/s, Fähre: }4.5\\text{ m/s. Winkel für Null-Abdrift?}",
            d_e2: "\\text{Fluss: }3.2\\text{ m/s, Fähre: }6.4\\text{ m/s. Winkel für Null-Abdrift?}",
            d_e3: "\\text{Fluss: }1.4\\text{ m/s, Fähre: }2.8\\text{ m/s. Winkel für Null-Abdrift?}",
            d_e4: "\\text{Fluss: }2.1\\text{ m/s, Fähre: }4.2\\text{ m/s. Winkel für Null-Abdrift?}",
            d_e5: "\\text{Fluss: }4\\text{ m/s, Fähre: }8\\text{ m/s. Winkel für Null-Abdrift?}",
            n_b1: "\\text{Überquere 20m Fluss bei }2\\text{ m/s senkrecht. Zeit?}",
            n_b2: "\\text{Überquere 30m Fluss bei }3\\text{ m/s senkrecht. Zeit?}",
            n_b3: "\\text{Überquere 40m Fluss bei }4\\text{ m/s senkrecht. Zeit?}",
            n_b4: "\\text{Überquere 25m Fluss bei }5\\text{ m/s senkrecht. Zeit?}",
            n_b5: "\\text{Überquere 50m Fluss bei }2.5\\text{ m/s senkrecht. Zeit?}",
            n_c1: "\\text{Überquere 20m Fluss, Fähre }2\\text{ m/s bei }60^\\circ\\text{. Zeit?}",
            n_c2: "\\text{Überquere 30m Fluss, Fähre }3\\text{ m/s bei }30^\\circ\\text{. Zeit?}",
            n_c3: "\\text{Überquere 40m Fluss, Fähre }4\\text{ m/s bei }45^\\circ\\text{. Zeit?}",
            n_c4: "\\text{Überquere 25m Fluss, Fähre }2.5\\text{ m/s bei }60^\\circ\\text{. Zeit?}",
            n_c5: "\\text{Überquere 50m Fluss, Fähre }5\\text{ m/s bei }30^\\circ\\text{. Zeit?}",
            n_a1: "\\text{Überquere 20m Fluss, Fähre }2.4\\text{ m/s bei }120^\\circ\\text{. Zeit?}",
            n_a2: "\\text{Fähre überquert in 7.7s bei }120^\\circ\\text{, Fluss }1.5\\text{ m/s. Abdrift-Distanz?}",
            n_a3: "\\text{Überquere 30m Fluss, Fähre }4\\text{ m/s bei }120^\\circ\\text{. Zeit?}",
            n_a4: "\\text{Überquere 25m Fluss, Fähre }2\\text{ m/s bei }135^\\circ\\text{. Zeit?}",
            n_a5: "\\text{Überquere 40m Fluss, Fähre }3.6\\text{ m/s bei }120^\\circ\\text{, Fluss }1.8\\text{ m/s. Abdrift?}",
            n_e1: "\\text{Fähre }5\\text{ m/s bei }120^\\circ\\text{, Fluss }2.5\\text{ m/s. Netto-Betrag?}",
            n_e2: "\\text{Überquere 30m + zurück, Fähre }4\\text{ m/s bei }135^\\circ\\text{, Fluss }1.5\\text{ m/s. Gesamtzeit?}",
            n_e3: "\\text{Überquere 40m, Fähre }6\\text{ m/s bei }120^\\circ\\text{, Fluss }3\\text{ m/s. Gesamtpfadlänge?}",
            n_e4: "\\text{Überquere 30m, Fähre }5\\text{ m/s bei }126.9^\\circ\\text{, Fluss }2\\text{ m/s. Pfadwinkel?}",
            n_e5: "\\text{Fähre Masse 1kg, }3\\text{ m/s bei }110^\\circ\\text{, Fluss }1\\text{ m/s. Kinetische Energie?}",
        },
        hints: {
            c_b1: "\\text{Addiere Geschwindigkeiten: }2 + 1 = 3",
            c_b2: "\\text{Entgegengesetzte Richtungen heben sich auf: }1.5 - 1.5 = 0",
            c_b3: "\\text{Addiere Geschwindigkeiten: }3 + 0.5 = 3.5",
            c_b4: "\\text{Subtrahiere: }3 - 2 = 1",
            c_b5: "\\text{Addiere Geschwindigkeiten: }4 + 1 = 5",
            c_c1: "\\text{Pythagoras: }\\sqrt{4^2 + 3^2} = 5",
            c_c2: "\\text{Pythagoras: }\\sqrt{1^2 + 1^2} = \\sqrt{2} \\approx 1.41",
            c_c3: "\\text{Pythagoras: }\\sqrt{2^2 + 2^2} = 2\\sqrt{2} \\approx 2.83",
            c_c4: "\\text{Pythagoras: }\\sqrt{2^2 + 1.5^2} = 2.5",
            c_c5: "\\text{Pythagoras: }\\sqrt{12^2 + 5^2} = 13",
            c_a1: "\\cos(60^\\circ) = 0.5, \\text{also }4 \\times 0.5 = 2",
            c_a2: "\\sin(30^\\circ) = 0.5, \\text{also }2 \\times 0.5 + 1 = 2",
            c_a3: "\\cos(45^\\circ) = 0.707, \\text{also }3 \\times 0.707 \\approx 2.12",
            c_a4: "\\sin(30^\\circ) = 0.5, \\text{also }6 \\times 0.5 + 2 = 5",
            c_a5: "\\sin(60^\\circ) = 0.866, \\text{also }4 \\times 0.866 + 1 \\approx 4.46",
            c_e1: "\\text{Verwende Komponenten: }v_x = 5\\cos(53^\\circ), v_y = 5\\sin(53^\\circ) + 2",
            c_e2: "\\text{Verwende Komponenten: }v_x = 4\\cos(37^\\circ), v_y = 4\\sin(37^\\circ) + 1.5",
            c_e3: "\\theta = \\arctan\\left(\\frac{8\\sin(45^\\circ) + 3}{8\\cos(45^\\circ)}\\right)",
            c_e4: "\\text{Verwende Komponenten: }v_x = 6\\cos(60^\\circ), v_y = 6\\sin(60^\\circ) + 2.5",
            c_e5: "\\theta = \\arctan\\left(\\frac{5\\sin(30^\\circ) + 1}{5\\cos(30^\\circ)}\\right)",
            d_b1: "\\cos(\\theta) = -\\frac{1}{2} = -0.5 \\Rightarrow \\theta = 120^\\circ",
            d_b2: "\\cos(\\theta) = -\\frac{1.5}{3} = -0.5 \\Rightarrow \\theta = 120^\\circ",
            d_b3: "\\cos(\\theta) = -\\frac{2}{4} = -0.5 \\Rightarrow \\theta = 120^\\circ",
            d_b4: "\\cos(\\theta) = -\\frac{0.5}{1} = -0.5 \\Rightarrow \\theta = 120^\\circ",
            d_b5: "\\cos(\\theta) = -\\frac{3}{6} = -0.5 \\Rightarrow \\theta = 120^\\circ",
            d_c1: "\\cos(\\theta) = -\\frac{1}{1.73} \\approx -0.578 \\Rightarrow \\theta \\approx 125.3^\\circ",
            d_c2: "\\cos(\\theta) = -\\frac{2}{2.83} \\approx -0.707 \\Rightarrow \\theta = 135^\\circ",
            d_c3: "\\cos(\\theta) = -\\frac{1.5}{2.12} \\approx -0.707 \\Rightarrow \\theta = 135^\\circ",
            d_c4: "\\cos(\\theta) = -\\frac{3}{5} = -0.6 \\Rightarrow \\theta \\approx 126.9^\\circ",
            d_c5: "\\cos(\\theta) = -\\frac{2.5}{3.54} \\approx -0.707 \\Rightarrow \\theta = 135^\\circ",
            d_a1: "\\cos(\\theta) = -\\frac{1.2}{2} = -0.6 \\Rightarrow \\theta \\approx 126.9^\\circ",
            d_a2: "\\cos(\\theta) = -\\frac{1.8}{3.6} = -0.5 \\Rightarrow \\theta = 120^\\circ",
            d_a3: "\\cos(\\theta) = -\\frac{2.4}{4} = -0.6 \\Rightarrow \\theta \\approx 126.9^\\circ",
            d_a4: "\\cos(\\theta) = -\\frac{3.5}{7} = -0.5 \\Rightarrow \\theta = 120^\\circ",
            d_a5: "\\cos(\\theta) = -\\frac{1.6}{3.2} = -0.5 \\Rightarrow \\theta = 120^\\circ",
            d_e1: "\\cos(\\theta) = -\\frac{2.7}{4.5} = -0.6 \\Rightarrow \\theta \\approx 126.9^\\circ",
            d_e2: "\\cos(\\theta) = -\\frac{3.2}{6.4} = -0.5 \\Rightarrow \\theta = 120^\\circ",
            d_e3: "\\cos(\\theta) = -\\frac{1.4}{2.8} = -0.5 \\Rightarrow \\theta = 120^\\circ",
            d_e4: "\\cos(\\theta) = -\\frac{2.1}{4.2} = -0.5 \\Rightarrow \\theta = 120^\\circ",
            d_e5: "\\cos(\\theta) = -\\frac{4}{8} = -0.5 \\Rightarrow \\theta = 120^\\circ",
            n_b1: "t = \\frac{20}{2} = 10\\text{ s}",
            n_b2: "t = \\frac{30}{3} = 10\\text{ s}",
            n_b3: "t = \\frac{40}{4} = 10\\text{ s}",
            n_b4: "t = \\frac{25}{5} = 5\\text{ s}",
            n_b5: "t = \\frac{50}{2.5} = 20\\text{ s}",
            n_c1: "t = \\frac{20}{2 \\times \\sin(60^\\circ)} = \\frac{20}{1.732} \\approx 11.55\\text{ s}",
            n_c2: "t = \\frac{30}{3 \\times 0.5} = 20\\text{ s}",
            n_c3: "t = \\frac{40}{4 \\times \\sin(45^\\circ)} \\approx 14.14\\text{ s}",
            n_c4: "t = \\frac{25}{2.5 \\times \\sin(60^\\circ)} \\approx 11.55\\text{ s}",
            n_c5: "t = \\frac{50}{5 \\times 0.5} = 20\\text{ s}",
            n_a1: "t = \\frac{20}{2.4 \\times \\sin(120^\\circ)} \\approx 9.62\\text{ s}",
            n_a2: "d = 1.5 \\times 7.7 \\approx 11.55\\text{ m}",
            n_a3: "t = \\frac{30}{4 \\times \\sin(120^\\circ)} \\approx 8.66\\text{ s}",
            n_a4: "t = \\frac{25}{2 \\times \\sin(135^\\circ)} \\approx 17.68\\text{ s}",
            n_a5: "t = \\frac{40}{3.6 \\times \\sin(120^\\circ)}, d = 1.8 \\times t \\approx 23.09\\text{ m}",
            n_e1: "v_{net} = \\sqrt{(5\\sin(120^\\circ))^2 + (5\\cos(120^\\circ) + 2.5)^2} \\approx 4.33\\text{ m/s}",
            n_e2: "\\text{Berechne Überquerungszeit, dann Rückkehrzeit, summiere beide}",
            n_e3: "d_{total} = \\sqrt{40^2 + (3 \\times t)^2} \\text{wobei }t = \\frac{40}{6\\sin(120^\\circ)}",
            n_e4: "\\theta = \\arctan\\left(\\frac{d_{drift}}{30}\\right) \\text{wobei Abdrift von Flussströmung}",
            n_e5: "E = \\frac{1}{2} \\times 1 \\times v_{net}^2, \\text{finde zuerst }v_{net}",
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
        target_title: "Ziel",
        check: "Verifizieren",
        next: "Nächste Herausforderung",
        correct: "Verifiziert",
        incorrect: "Abweichung",
        difficulty: {
            basic: "BASIS",
            core: "KERN",
            advanced: "ERWEITERT",
            elite: "ELITE"
        },
        stages: {
            reflection: "REFLEXION",
            refraction: "BRECHUNG",
            lenses: "LINSEN"
        },
        labels: {
            show_prism: "Prismendispersion zeigen",
            medium_1: "MEDIUM 1 (n₁)",
            medium_2: "MEDIUM 2 (n₂)",
            incident_angle: "Einfallswinkel",
            focal_length: "Brennweite",
            refraction_title: "BRECHUNG",
            refracted_angle: "Brechungswinkel (θ₂):",
            critical_angle: "Grenzwinkel:",
            total_internal_reflection: "TOTALREFLEXION",
            angle_value: "{value}°",
            light_path_correct: "Lichtpfad korrekt!",
            formula: "Formel",
            hint: "Hinweis"
        },
        hints: {
            refraction: "Licht wird zum Lot hin gebrochen, wenn es in ein dichteres Medium eintritt (n₂ > n₁)"
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
        prompts: {
            find_p: "Ideales Gas: n = {n} mol, T = {T} K, V = {V} m³. Finde P.",
            find_v: "Gas: n = {n} mol, P = {P} Pa, T = {T} K. Finde V.",
            find_n: "Gas: P = {P} Pa, V = {V} m³, T = {T} K. Finde n.",
            find_t: "Gas: P = {P} Pa, V = {V} m³, n = {n} mol. Finde T.",
            relation_pt: "Temperatur bei konstantem Volumen verdoppeln. Um welchen Faktor ändert sich der Druck?",
            relation_vn: "Molzahl bei konstantem P und T verdoppeln. Um welchen Faktor ändert sich das Volumen?",
            boyle_find_p2: "Boyle-Mariotte: P₁ = {p1} kPa, V₁ = {v1} L, V₂ = {v2} L. Finde P₂.",
            boyle_find_v2: "Boyle-Mariotte: P₁ = {p1} kPa, V₁ = {v1} L, P₂ = {p2} kPa. Finde V₂.",
            boyle_relation: "Komprimiere Gas von {v1} L auf {v2} L bei konst. T. Druck vervielfacht sich um?",
            boyle_condition: "Welche Größe muss beim Gesetz von Boyle-Mariotte konstant bleiben?",
            charles_find_v2: "Gay-Lussac (Charles): V₁ = {v1} L, T₁ = {t1} K, T₂ = {t2} K. Finde V₂.",
            charles_find_t2: "Gay-Lussac (Charles): V₁ = {v1} L, T₁ = {t1} K, V₂ = {v2} L. Finde T₂.",
            charles_relation: "Absolute Temperatur bei konstantem P verdoppeln. Um welchen Faktor ändert sich das Volumen?",
            charles_condition: "Welche Größe muss beim Gesetz von Charles (Gay-Lussac) konstant bleiben?",
            combined_law: "Allgemeines Gasgesetz bei P, V, T Änderung. Suche nach {target}."
        },
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
        prompts: {
            fl_calc_du: "1. Hauptsatz: Q = {q} J (absorbiert), W = {w} J (vom System geleistet). Finde ΔU.",
            fl_calc_q: "Systemänderung: ΔU = {du} J, W = {w} J. Finde Wärme Q.",
            fl_calc_w: "System absorbiert Q = {q} J, innere Energie steigt um ΔU = {du} J. Finde W.",
            fl_adiabatic: "Adiabatischer Prozess (Q=0). Arbeit AM System ist {w} J. Finde ΔU.",
            fl_cycle: "Kreisprozess: Nettoarbeit W = {w} J. Was ist die Nettowärme Q?",
            fl_sign_conv: "System gibt Wärme ab: Ist Q positiv oder negativ?",
            ie_ideal_u: "Einatomiges ideales Gas: n={n} mol, T={t} K. Finde U (U = 1.5 nRT).",
            ie_delta_u: "Isothermer Prozess eines idealen Gases. Was ist ΔU?",
            ie_diatomic: "Zweiatomiges Gas (f=5): n={n}, T={t}. Berechne innere Energie U.",
            ie_change_t: "Ideales Gas (n={n}, Cv={cv} J/molK) von {t1} K bis {t2} K erhitzt. Finde ΔU.",
            ie_state_func: "Innere Energie ist eine Zustandsgröße. Änderung im Kreisprozess?",
            wh_isobaric: "Isobare Expansion: P = {p} Pa, ΔV = {dv} m³. Finde Arbeit W.",
            wh_isochoric: "Isochore Erwärmung (konstantes Volumen). Was ist die Arbeit W?",
            wh_isothermal_w: "Isotherme Expansion eines idealen Gases. Q = {q} J. Finde W.",
            wh_area: "Was repräsentiert die Fläche im PV-Diagramm?",
            wh_adiabatic_rel: "Adiabatische Expansion: Innere Energie sinkt. Wie ändert sich die Temperatur?"
        },
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
    },
};
