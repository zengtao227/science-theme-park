/**
 * DE - BIOLOGY translations
 * Auto-generated from i18n.ts refactoring
 * Last updated: 2026-02-15
 */

export const deBiology = {
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
    gb2_01: {
        back: "Zurück zum Nexus",
        title: "GB2.01 // NEUROBIOLOGIE",
        difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
        objective_title: "Aktuelles Missionsziel",
        monitor_title: "Monitor für neuronale Aktivität",
        footer_left: "GB2.01_NEUROBIOLOGIE // KNOTEN: BASEL",
        check: "Überprüfen",
        next: "Nächster Impuls",
        correct: "Signal übertragen",
        incorrect: "Synaptisches Versagen",
        ready: "Bereit",
        stages: {
            anatomy: "NEURONANATOMIE",
            potential: "AKTIONSPOTENTIAL",
            synapse: "SYNAPTISCHE ÜBERTRAGUNG"
        },
        labels: {
            voltage: "Membranspannung (mV)",
            threshold: "Schwellenpotential",
            neurotransmitter: "Neurotransmitter",
            receptor_affinity: "Rezeptoraffinität",
            node_of_ranvier: "Ranvier-Schnürring",
            myelin_sheath: "Myelinscheide",
            cell_body: "Soma (Zellkörper)",
            axon: "Axon",
            dendrites: "Dendriten"
        },
        prompts: {
            identify_part: "Identifizieren Sie die Struktur, die für {function} verantwortlich ist.",
            calc_potential: "Gegessen sind [K⁺] außen = {k_out} und innen = {k_in}. Berechnen Sie das Gleichgewichtspotential.",
            action_potential: "Welches Ion ist primär für die Depolarisation während der Anstiegsphase verantwortlich?",
            synapse_mechanism: "Welcher Ioneneinstrom löst die Freisetzung von Neurotransmittern in den synaptischen Spalt aus?",
            hint_anatomy: "Suchen Sie nach der langen Faser, die Impulse vom Zellkörper weg leitet.",
            hint_sodium: "Natrium (Na⁺) strömt während der Depolarisation ein.",
            hint_calcium: "Calciumeinstrom (Ca²⁺) löst die Vesikelfusion aus.",
            hint_nernst: "Verwenden Sie die Nernst-Gleichung: E = 61 log10(C_out/C_in) bei 37°C."
        },
        scenarios: {
            basel_biomedicine: "Universität Basel - Biozentrum: Die Forschung am Biozentrum konzentriert sich darauf, wie synaptische Verbindungen gebildet und erhalten werden. Das Verständnis dieser Prozesse ist entscheidend für die Behandlung neurodegenerativer Erkrankungen.",
            roche_neuroscience: "Roche Neuroscience Research: Wissenschaftler bei Roche Basel entwickeln Medikamente für Alzheimer und Parkinson, indem sie gezielt auf spezifische Neurotransmitterrezeptoren und Ionenkanäle einwirken.",
            neural_plasticity: "Neural Plasticity Lab: Die Untersuchung, wie Lernen Synapsen stärkt (Langzeitpotenzierung, LTP), hilft bei der Entwicklung besserer Bildungswerkzeuge und Rehabilitationsstrategien.",
            friedrich_miescher: "Friedrich Miescher Institute (FMI): FMI-Forscher in Basel untersuchen die molekularen Mechanismen, die das Nervenzellwachstum und den Aufbau neuronaler Schaltkreise steuern."
        },
        feedback: {
            correct: "Aktionspotential-Fortleitung erfolgreich verifiziert!",
            incorrect: "Das Signal ging verloren. Überprüfen Sie den neuronalen Mechanismus."
        }
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
    gb3_02: {
        back: "Zurück zum Nexus",
        title: "GB3.02 // IMMUNOLOGIE-LABOR",
        difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
        objective_title: "Aktuelles Missionsziel",
        monitor_title: "Monitor für Immunantwort",
        footer_left: "GB3.02_IMMUNOLOGIE // KNOTEN: BASEL",
        check: "Überprüfen",
        next: "Nächste Herausforderung",
        correct: "Antigen neutralisiert",
        incorrect: "Erreger entkommen",
        ready: "Bereit",
        stages: {
            innate: "ANGEBORENE IMMUNITÄT",
            adaptive: "ADAPTIVE IMMUNITÄT",
            vaccines: "IMPFSTOFFE & GEDÄCHTNIS"
        },
        labels: {
            antigen_count: "Antigenlast",
            antibody_titer: "Antikörpertiter",
            b_cell_activity: "B-Zell-Aktivität",
            t_cell_count: "T-Zell-Aktivierung",
            pathogen_type: "Erregertyp",
            inflammation_level: "Entzündung",
            macrophage_status: "Makrophagen-Status"
        },
        prompts: {
            innate_defense: "Ein {pathogen} durchbricht die Hautbarriere. Welche Zellen liefern die erste schnelle Antwort?",
            antibody_matching: "Gegeben ist ein Antigen mit der Struktur {antigen}. Welche Antikörperregion gewährleistet die Spezifität?",
            memory_response: "Bei der Sekundärantwort beträgt die Latenzzeit {lag} Tage im Vergleich zu {primary_lag} Tagen bei der Primärantwort. Berechnen Sie die Beschleunigung.",
            vaccine_logic: "Wie regen mRNA-Impfstoffe das Immunsystem an, ein Virus zu erkennen, ohne einen lebenden Erreger zu verwenden?",
            hint_innate: "Denken Sie an Phagozyten wie Makrophagen und Neutrophile.",
            hint_adaptive: "B-Zellen produzieren Antikörper; T-Zellen töten infizierte Zellen.",
            hint_constant: "Die variable Region des Antikörpers ist der Schlüssel.",
            hint_memory: "Gedächtniszellen ermöglichen eine nahezu sofortige Zweitantwort."
        },
        scenarios: {
            roche_immunology: "Roche Immunologie-Abteilung: Wissenschaftler bei Roche Basel entwickeln monoklonale Antikörper, um Krebszellen gezielt zu bekämpfen.",
            basel_hospital_infectious: "Universitätsspital Basel - Infektiologie: Ärzte analysieren, wie das Immunsystem von Patienten auf Influenza und neue Erreger reagiert.",
            vaccine_research: "Schweizer Impfinstitut: Die Erforschung neuer Verabreichungsmechanismen für Impfstoffe hilft, die Immunität weltweit zu stärken.",
            autoimmune_center: "Basler Forschungszentrum für Autoimmunität: Das Verständnis, wann das Immunsystem fälschlicherweise körpereigenes Gewebe angreift, ist der Schlüssel zur Behandlung von Krankheiten wie Multipler Sklerose."
        },
        feedback: {
            correct: "Immunabwehr erfolgreich! Gedächtniszellen archiviert.",
            incorrect: "Immunantwort unzureichend. Erreger verbreitet sich."
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
            hint_oxy: "Wir atmen dies ein, um Glukose zu verbrennen.",
            hint_iso: "Keine Nettobewegung.",
            hint_atp: "Primäre Energiewährung der Zelle.",
            hint_homeostasis: "Setzen Sie den Wert auf Null für Stabilität."
        },
        latex_labels: {
            water_movement: "Wasserbewegung",
            product: "Produkt",
            reactant: "Reaktant",
            target_osmolarity: "Ziel-Osmolarität",
            current_error: "Aktueller Fehler: "
        }
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
        canvas_labels: {
            light: "LICHT",
            rate: "Rate",
            thylakoid: "THYLAKOID",
            stroma: "STROMA",
            co2_label: "CO₂",
            temp_label: "Temp"
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
    sb2_01_tissues: {
        back: "Zurück zum Nexus",
        title: "SB2.01 // GEWEBE & ORGANE",
        difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
        objective_title: "Aktuelles Missionsziel",
        monitor_title: "Gewebeorganisations-Monitor",
        footer_left: "SB2.01_GEWEBE_ORGANE // KNOTEN: BASEL",
        check: "Prüfen",
        next: "Nächste Ebene",
        correct: "Richtig",
        incorrect: "Falsch",
        stages: {
            tissues: "GEWEBETYPEN",
            organs: "ORGANZUSAMMENSETZUNG",
            systems: "ORGANSYSTEME"
        },
        scenarios: {
            tissues: "Pathologielabor des Universitätsspitals Basel: Sie sind Medizinstudent am Universitätsspital Basel und lernen unter der Anleitung von Dr. Müller die Gewebeidentifikation. Mit hochmodernen Mikroskopen untersuchen Sie Gewebeproben aus verschiedenen Körperregionen. Jeder der vier Hauptgewebetypen hat eine spezifische Funktion: Epithelgewebe bedeckt und schützt Körperoberflächen (wie Haut und Darmschleimhaut), Bindegewebe bietet strukturelle Unterstützung (wie Knochen und Knorpel), Muskelgewebe ermöglicht Bewegung durch Kontraktion (wie Herzmuskel und Skelettmuskeln), und Nervengewebe überträgt elektrische Signale zur Kommunikation (wie Gehirnzellen und Nervenfasern). Ihre Aufgabe ist es, die Hauptfunktion jedes Gewebetyps anhand seiner mikroskopischen Struktur und seiner Lage im Körper zu identifizieren. Diese grundlegende Fähigkeit ist für die medizinische Diagnose unerlässlich, da abnorme Gewebestrukturen oft auf Krankheiten hinweisen. Genau wie ein Gebäude verschiedene Materialien für verschiedene Zwecke benötigt (Beton für das Fundament, Glas für Fenster, Drähte für Elektrizität), benötigt Ihr Körper verschiedene Gewebetypen für verschiedene Aufgaben.",
            organs: "Novartis Pharmaforschung - Organmodellierungsabteilung: Sie arbeiten in der biomedizinischen Forschungsabteilung von Novartis Basel, wo Wissenschaftler detaillierte 3D-Modelle menschlicher Organe für Arzneimitteltests und -entwicklung erstellen. Jedes Organ im menschlichen Körper besteht aus mehreren Gewebetypen, die harmonisch zusammenarbeiten. Zum Beispiel enthält das Herz vier Gewebetypen: Muskelgewebe (Herzmuskel zum Pumpen von Blut), Epithelgewebe (Endothel, das Blutgefäße auskleidet), Bindegewebe (strukturelles Gerüst) und Nervengewebe (Steuerung von Herzfrequenz und Rhythmus). Ebenso hat der Magen Epithelgewebe (Sekretion von Verdauungsenzymen), Muskelgewebe (Durchmischung der Nahrung), Bindegewebe (strukturelle Unterstützung) und Nervengewebe (Koordination der Verdauung). Ihre Aufgabe ist es, zu zählen, wie viele verschiedene Gewebetypen jedes Organ zusammensetzen. Diese Information ist entscheidend für das Verständnis, wie pharmazeutische Medikamente verschiedene Teile eines Organs beeinflussen. Genaue Organmodelle helfen Novartis, sicherere Medikamente zu entwickeln, indem potenzielle Nebenwirkungen vor klinischen Studien am Menschen vorhergesagt werden.",
            systems: "Medizinische Fakultät Basel - Organisation des menschlichen Körpers: Sie studieren Anatomie an der Medizinischen Fakultät Basel und lernen, wie der menschliche Körper in einer klaren hierarchischen Struktur organisiert ist. Diese biologische Hierarchie folgt einer logischen Progression von einfach zu komplex: Zellen (die kleinsten lebenden Einheiten, wie eine einzelne Muskelzelle) → Gewebe (Gruppen ähnlicher Zellen, die zusammenarbeiten, wie Muskelgewebe) → Organe (Strukturen aus mehreren Gewebetypen, wie das Herz) → Organsysteme (Gruppen von Organen, die zusammenarbeiten, wie das Kreislaufsystem) → Organismus (der vollständige menschliche Körper). Zum Beispiel verbindet sich eine einzelne Herzmuskelzelle mit Millionen anderer Muskelzellen, um Herzmuskelgewebe zu bilden. Dieses Muskelgewebe kombiniert sich mit Epithelgewebe (Auskleidung), Bindegewebe (Gerüst) und Nervengewebe (Steuerung), um das Herzorgan zu bilden. Das Herz arbeitet dann zusammen mit Blutgefäßen (Arterien, Venen, Kapillaren), um das Kreislaufsystem zu bilden, das Sauerstoff und Nährstoffe durch den gesamten Organismus transportiert. Das Verständnis dieser Hierarchie ist grundlegend für medizinische Diagnose und Behandlung. Ihre Aufgabe ist es, die richtige Ebene in dieser biologischen Organisation zu identifizieren."
        }
    },
    sb2_02_body_systems: {
        back: "Zurück zum Nexus",
        title: "SB2.02 // MENSCHLICHE KÖRPERSYSTEME",
        difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
        objective_title: "Aktuelles Missionsziel",
        monitor_title: "Körpersysteme-Monitor",
        footer_left: "SB2.02_KÖRPERSYSTEME // KNOTEN: BASEL",
        check: "Prüfen",
        next: "Nächstes System",
        correct: "Richtig",
        incorrect: "Falsch",
        stages: {
            digestive: "VERDAUUNGSSYSTEM",
            circulatory: "KREISLAUFSYSTEM",
            respiratory: "ATMUNGSSYSTEM"
        },
        scenarios: {
            digestive: "Gastroenterologie-Abteilung des Universitätsspitals Basel: Sie begleiten Dr. Weber, eine Gastroenterologin am Universitätsspital Basel, während sie Medizinstudenten das Verdauungssystem erklärt. Das Verdauungssystem ist eine komplexe Anordnung von Organen, die zusammenarbeiten, um Nahrung in Nährstoffe zu zerlegen, die Ihr Körper für Energie, Wachstum und Zellreparatur aufnehmen und verwenden kann. Die Reise beginnt im Mund, wo mechanische Verdauung (Kauen) und chemische Verdauung (Speichelenzyme) beginnen, Nahrung abzubauen. Die Nahrung wandert dann durch peristaltische Wellen (Muskelkontraktionen) durch die Speiseröhre in den Magen, wo starke Magensäure (pH 1,5-3,5) und Pepsin-Enzyme Proteine weiter abbauen. Die teilweise verdaute Nahrung (Chymus) gelangt in den Dünndarm (6-7 Meter lang), wo die meiste Nährstoffaufnahme durch Millionen winziger fingerartiger Ausstülpungen namens Zotten erfolgt. Die Leber produziert Galle zur Emulgierung von Fetten, während die Bauchspeicheldrüse Verdauungsenzyme und Bikarbonat absondert, um Magensäure zu neutralisieren. Schließlich absorbiert der Dickdarm Wasser und bildet feste Abfälle. Das Verständnis dieses Systems ist entscheidend für die Diagnose von Erkrankungen wie Morbus Crohn, Geschwüren und Malabsorptionsstörungen, die Tausende von Basler Einwohnern betreffen. Ihre Aufgabe ist es, das richtige Organ im Verdauungsweg zu identifizieren und die spezifische Funktion jedes Organs in diesem bemerkenswerten biologischen Fließband zu verstehen.",
            circulatory: "Basel Kardiologie-Zentrum - Herzfunktionsanalyse: Sie arbeiten im Basel Kardiologie-Zentrum mit Dr. Schneider und analysieren, wie das Kreislaufsystem Sauerstoff und Nährstoffe zu jeder Zelle im menschlichen Körper liefert und gleichzeitig Kohlendioxid und Stoffwechselabfälle entfernt. Das Herz ist eine kraftvolle Muskelpumpe mit vier Kammern: zwei Vorhöfe (obere Kammern, die Blut empfangen) und zwei Ventrikel (untere Kammern, die Blut auspumpen). Die rechte Seite pumpt sauerstoffarmes Blut zur Sauerstoffanreicherung in die Lungen, während die linke Seite sauerstoffreiches Blut durch ein Netzwerk von Blutgefäßen in den gesamten Körper pumpt. Arterien transportieren Blut unter hohem Druck vom Herzen weg (systolischer Druck ~120 mmHg), mit dicken elastischen Wänden, um diesem Druck standzuhalten. Venen führen Blut unter niedrigem Druck zum Herzen zurück und verwenden Einwegventile, um Rückfluss zu verhindern. Kapillaren sind mikroskopische Gefäße, in denen der Gasaustausch zwischen Blut und Gewebe stattfindet. Das durchschnittliche erwachsene Herz schlägt 60-100 Mal pro Minute und pumpt in Ruhe etwa 5 Liter Blut pro Minute (Herzminutenvolumen). Dies erhöht sich während intensiver Bewegung auf 20-25 Liter pro Minute. Das Verständnis des Kreislaufsystems ist für die Behandlung von Herz-Kreislauf-Erkrankungen unerlässlich, die die häufigste Todesursache in der Schweiz sind. Ihre Aufgabe ist es, die Hauptkomponenten des Kreislaufsystems zu identifizieren und zu verstehen, wie Blut durch dieses lebenswichtige Transportnetzwerk fließt.",
            respiratory: "Basel Pneumologie-Institut - Atemfunktionslabor: Sie assistieren Dr. Keller am Basel Pneumologie-Institut, wo Forscher untersuchen, wie das Atmungssystem den Gasaustausch ermöglicht - Sauerstoff in den Körper bringen und Kohlendioxid entfernen. Luft tritt durch Nase oder Mund ein, wo sie gefiltert, erwärmt und befeuchtet wird. Sie passiert den Rachen (Pharynx) und Kehlkopf (Larynx, enthält Stimmbänder) in die Luftröhre (Trachea), ein starres Rohr, das mit C-förmigen Knorpelringen verstärkt ist, um ein Kollabieren zu verhindern. Die Luftröhre verzweigt sich in zwei Bronchien (einen für jede Lunge), die sich weiter in kleinere Bronchiolen teilen und eine baumartige Struktur namens Bronchialbaum bilden. Am Ende der kleinsten Bronchiolen befinden sich Cluster winziger Luftsäcke namens Alveolen (etwa 300 Millionen in erwachsenen Lungen), wo der Gasaustausch stattfindet. Die Alveolarwände sind extrem dünn (0,5 Mikrometer) und von Kapillaren umgeben, wodurch Sauerstoff ins Blut diffundieren kann, während Kohlendioxid herausdiffundiert. Das Zwerchfell, ein kuppelförmiger Muskel unter den Lungen, zieht sich zusammen, um den Brustraum beim Einatmen zu erweitern und einen Unterdruck zu erzeugen, der Luft hineinzieht. Beim Ausatmen entspannt sich das Zwerchfell und die elastischen Lungen ziehen sich zusammen und drücken Luft heraus. Ein gesunder Erwachsener atmet in Ruhe 12-20 Mal pro Minute und tauscht etwa 500 ml Luft pro Atemzug aus (Atemzugvolumen). Das Verständnis der Atemfunktion ist entscheidend für die Behandlung von Erkrankungen wie Asthma, COPD und Lungenentzündung. Ihre Aufgabe ist es, die Organe im Atemweg zu identifizieren und den Mechanismus der Atmung und des Gasaustauschs zu verstehen."
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
};
