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
            hint_halflife: "Verbleibend = (0.5)^(Alter/Halbwertszeit)",
            fitness_calc: "Anfangs {init}, Überlebende {surv}. Fitness w?",
            hardy_p: "Allelfrequenz p={p}. Heterozygotenfrequenz 2pq?",
            hardy_q: "Rezessive Phänotypfrequenz q^2={q2}. Finde Allelfrequenz q.",
            drift_time: "Populationsgröße N={N}. Fixierungszeit (Gen.) ~ 4N?",
            mutation_div: "Divergenz D={D}, Rate u={u}. Generationen t = D/2u?",
            decay_age: "Verbleibender Anteil {f}. Halbwertszeit {h}. Alter?",
            common_ancestor: "Arten A und B unterscheiden sich durch {n} Mutationen. Rate {r}/J. Zeit zum Vorfahren?"
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
        footer_left: "GB1.01 // EVOLUTIONSLABOR",
        scenarios: {
            galapagos_study: "Naturhistorisches Museum Basel - Das Darwin-Erbe: Sie sind Kurator am Naturhistorischen Museum Basel, das eine der bedeutendsten Sammlungen biologischer Präparate in der Schweiz beherbergt. Ihre Aufgabe ist es, historische Daten von mehreren Inseln zu analysieren, die die Beobachtungen von Charles Darwin auf den Galapagos-Inseln widerspiegeln. Durch die Berechnung der Fitness verschiedener Vogelpopulationen basierend auf Überlebensraten während extremer Umweltveränderungen helfen Sie, die Kraft der natürlichen Selektion zu demonstrieren. In Basel nutzen Wissenschaftler diese Museumsunterlagen, um zu verstehen, wie sich regionale Arten, wie lokale Käfer und Vögel, als Reaktion auf die Urbanisierung in den letzten zwei Jahrhunderten entwickelt haben. Diese Arbeit ist wie das Aufdecken der verborgenen Zahnräder der Natur, um zu sehen, wie kleine strukturelle Veränderungen zu massiven Überlebensvorteilen führen.",
            genetic_drift: "Biozentrum Basel - Populationsdynamik: Als Forscher am Biozentrum der Universität Basel untersuchen Sie die genetische Ausstattung isolierter Populationen im nahe gelegenen Jura. Genetische Drift – die zufällige Änderung der Allelfrequenzen – kann über viele Generationen hinweg zu einer signifikanten Divergenz in kleinen Gruppen führen. Durch die Modellierung dieser Prozesse helfen Sie vorherzusagen, wie sich gefährdete Arten im Schweizer Grenzgebiet an die Habitatfragmentierung anpassen könnten. Die lange Geschichte Basels in der Genetikforschung, die bis zur Entdeckung der Nukleinsäuren im 19. Jahrhundert zurückreicht, bietet ein erstklassiges Umfeld für Ihre Studie. Es ist, als würde man die Entwicklung einer Sprache in einem abgelegenen Tal beobachten; mit der Zeit ändert sich der 'Akzent' des Genoms, bis ein neuer Spezies-'Dialekt' entsteht.",
            fossil_record: "Oberrheintal - Subtropische Vergangenheit: Sie sind Paläontologe und graben am Rheinufer bei Basel, wo Sie die Überreste von Nashörnern und anderen Tieren entdeckt haben, die Europa nicht mehr bewohnen. Diese Fossilien sind Beweise für ein ganz anderes Klima, das vor Millionen von Jahren in Basel herrschte. Durch den Einsatz isotopischer Techniken zur Bestimmung der Ära dieser Proben helfen Sie dem Naturhistorischen Museum zu zeigen, dass Basels aktuelle Biodiversität nur eine Momentaufnahme in einer riesigen, sich bewegenden Zeitlinie der Evolution ist. Es ist, als würde man ein altes Foto seiner Stadt finden und erkennen, dass das, was heute ein gemäßigtes Flusstal ist, einst eine üppige, subtropische Savanne war.",
            molecular_clock: "Friedrich Miescher Institut (FMI) - Das Timing des Lebens: Am FMI in Basel nutzen Sie Techniken der molekularen Uhr, um zu schätzen, wann verschiedene Arten einen gemeinsamen Vorfahren hatten. Durch die Analyse der Mutationsraten in DNA-Sequenzen können Sie die Evolutionsgeschichte der lokalen Fauna Basels über Millionen von Jahren zurückverfolgen. Diese Arbeit ehrt das Erbe von Friedrich Miescher, der die DNA in Basel entdeckte, und hält die Stadt an der Spitze der evolutionären Genomik. Es ist wie die Verwendung einer Zeitlupen-Uhr, bei der jeder 'Tick' eine Mutation und jede 'Stunde' eine Million Jahre Naturgeschichte ist."
        }
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
            calc_potential: "Gegeben sind {ion} außen = {cout} und innen = {cin}. Berechnen Sie das Gleichgewichtspotential.",
            action_potential: "Welches Ion ist primär für die Depolarisation während der Anstiegsphase verantwortlich?",
            synapse_mechanism: "Welcher Ioneneinstrom löst die Freisetzung von Neurotransmittern in den synaptischen Spalt aus?",
            hint_anatomy: "Suchen Sie nach der langen Faser, die Impulse vom Zellkörper weg leitet.",
            hint_sodium: "Natrium (Na⁺) strömt während der Depolarisation ein.",
            hint_calcium: "Calciumeinstrom (Ca²⁺) löst die Vesikelfusion aus.",
            hint_nernst: "Verwenden Sie die Nernst-Gleichung: E = 61 log10(C_out/C_in) bei 37°C.",
            func_struct: "Struktur: {s}. Funktion?",
            nernst_k: "K+ außen={o}, innen={i}. E_K?",
            nernst_na: "Na+ außen={o}, innen={i}. E_Na?",
            goldman: "Pk={pk}, Pna={pna}. Vm?",
            phase_ion: "Phase: {p}. Welche Permeabilität dominiert?",
            synapse_step: "Schritt {n}: {desc}. Nächster Schritt?",
            drug_block: "Medikament blockiert {c}. Effekt auf AP?",
            nt_role_type: "Rolle: {effect}. Typ von {name}?"
        },
        scenarios: {
            basel_biomedicine: "Universität Basel - Biozentrum Abteilung für Neurobiologie: Am Biozentrum, einem der führenden europäischen Zentren für Molekular- und Zellbiologie, arbeiten Sie in der Forschungsgruppe von Professorin Silvia Arber an der neuronalen Schaltkreis-Assemblierung. Das Labor konzentriert sich darauf zu verstehen, wie Motoneuronen im Rückenmark durch präzise axonale Wegfindung mit spezifischen Muskelgruppen verbunden werden. Mit fortschrittlichen Bildgebungsverfahren und Elektrophysiologie kartieren Sie die dendritischen Verzweigungen von Pyramidenneuronen und verfolgen, wie Aktionspotentiale mit Geschwindigkeiten bis zu 120 m/s durch myelinisierte Axone propagieren. Diese Forschung trägt direkt zur Entwicklung von Therapien für ALS (Amyotrophe Lateralsklerose) und Rückenmarksverletzungen bei. Die kollaborative Umgebung des Biozentrums, wo Friedrich Miescher 1869 erstmals Nuclein (DNA) isolierte, setzt Basels 150-jährige Tradition in den molekularen Lebenswissenschaften fort. Das Verständnis der Neuronenanatomie – von der Proteinsynthese-Maschinerie des Somas bis zu den synaptischen Vesikeln des Axonterminals – ist essentiell für Basels Pharmaindustrie und die neurologische Abteilung des Universitätsspitals.",
            roche_neuroscience: "Roche Pharma Research - Abteilung für Neurodegeneration & Seltene Krankheiten: Sie sind leitender Neurowissenschaftler am Basler Hauptsitz von Roche und arbeiten an Behandlungen der nächsten Generation für Alzheimer und Parkinson. Ihr Team verwendet Patch-Clamp-Elektrophysiologie, um zu messen, wie experimentelle Verbindungen spannungsgesteuerte Natrium- und Kaliumkanäle in kultivierten Hippocampus-Neuronen beeinflussen. Durch Analyse der Kinetik der Aktionspotential-Generierung – Depolarisation (Na⁺-Einstrom), Repolarisation (K⁺-Ausstrom) und Hyperpolarisation – identifizieren Sie Medikamente, die normale neuronale Feuermuster in erkrankten Gehirnen wiederherstellen können. Basels Pharma-Cluster, einschließlich Roche und Novartis, investiert jährlich über CHF 10 Milliarden in F&E, wobei Neurowissenschaften eine strategische Priorität darstellen. Ihre Arbeit baut auf Jahrzehnten Basler Forschung auf, von der Entdeckung der Benzodiazepine bis zu modernen Biologika, die Amyloid-Beta-Plaques angreifen. Diese Präzisions-Neuropharmakologie könnte den 50 Millionen Menschen weltweit mit Demenz helfen.",
            neural_plasticity: "Universität Basel - Interfakultäre Forschungsplattform Molekulare & Kognitive Neurowissenschaften: An der Schnittstelle zwischen Biozentrum und Psychologischem Institut untersuchen Sie synaptische Plastizitätsmechanismen, die Lernen und Gedächtnis zugrunde liegen. Ihre Forschung konzentriert sich auf Langzeitpotenzierung (LTP) in hippocampalen CA1-Neuronen, wo hochfrequente Stimulation (100 Hz) synaptische Verbindungen durch NMDA-Rezeptor-Aktivierung und kalziumabhängige Signalkaskaden verstärkt. Mit Ganzzell-Patch-Clamp-Aufzeichnungen messen Sie exzitatorische postsynaptische Potentiale (EPSPs) und verfolgen, wie wiederholte Stimulation die AMPA-Rezeptordichte an der postsynaptischen Membran erhöht. Diese Arbeit hat direkte Anwendungen für das Verständnis altersbedingten kognitiven Abbaus und die Entwicklung kognitiver Verbesserungsstrategien. Basels einzigartige interdisziplinäre Umgebung, die Molekularbiologie mit kognitiven Neurowissenschaften verbindet, macht es zu einem europäischen Zentrum für translationale Hirnforschung. Die Memory Clinic des Universitätsspitals arbeitet eng mit Ihrem Labor zusammen, um Erkenntnisse in klinische Interventionen zu übersetzen.",
            friedrich_miescher: "Friedrich Miescher Institut für Biomedizinische Forschung (FMI) - Neuronale Entwicklung & Epigenetik: Am FMI, einem von Novartis finanzierten Forschungsinstitut, arbeiten Sie daran zu verstehen, wie sich neuronale Schaltkreise während der Entwicklung selbst zusammensetzen. Ihr Projekt untersucht die Rolle der Kalziumsignalisierung bei der Neurotransmitter-Freisetzung an der neuromuskulären Endplatte. Mit fluoreszierenden Kalziumindikatoren und Hochgeschwindigkeits-Bildgebung visualisieren Sie, wie Ca²⁺-Einstrom durch spannungsgesteuerte Kalziumkanäle die Fusion synaptischer Vesikel auslöst und Acetylcholin in den synaptischen Spalt (20-40 nm breit) freisetzt. Sie messen quantale Freisetzungsereignisse und berechnen die Freisetzungswahrscheinlichkeit unter verschiedenen Stimulationsprotokollen. Diese Grundlagenforschung ehrt Friedrich Mieschers Vermächtnis – er entdeckte 1869 in Basel die DNA, während er weiße Blutzellkerne aus chirurgischen Verbänden am Universitätsspital untersuchte. Heute setzt das FMI diese Tradition bahnbrechender Molekularbiologie fort, mit Erkenntnissen, die die Medikamentenentwicklung bei Roche und Novartis informieren. Das Verständnis synaptischer Übertragung auf molekularer Ebene ist entscheidend für die Behandlung von Myasthenia gravis, Lambert-Eaton-Syndrom und anderen neuromuskulären Erkrankungen."
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
            guanine: "Guanin",
            analysis: "Basenpaaranalyse"
        },
        results: {
            valid: "Bindung Stabil",
            invalid: "Helix-Instabilität",
            valid_desc: "Nukleotidpaare verifiziert.",
            invalid_desc: "Sequenzabweichung erkannt.",
            next: "Nächstes Paar schmieden"
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
            roche_immunology: "Roche Immunologie - Präzisionsantikörper: In den immunologischen Labors von Roche Basel entwerfen Sie eine neue Generation monoklonaler Antikörper. Diese 'intelligenten Raketen' der Medizin sind darauf ausgelegt, spezifische Strukturen auf der Oberfläche von Krebszellen mit absoluter Präzision zu erkennen. Indem Sie verstehen, wie das adaptive Immunsystem variable Regionen nutzt, um Spezifität zu gewährleisten, können Sie Therapien entwickeln, die Tumore zerstören, während gesundes Gewebe unberührt bleibt. Diese Arbeit repräsentiert die Speerspitze des 'Basel Biotech'-Ökosystems. Es ist, als wäre man ein Schlüsseldienst, der einen einzigartigen Schlüssel für ein Schloss entwerfen muss, das nur in feindlichem Gebiet zu finden ist.",
            basel_hospital_infectious: "Universitätsspital Basel - Erregerabwehr: Am Universitätsspital Basel sind Sie Teil eines Teams für Infektionskrankheiten, das überwacht, wie das angeborene Immunsystem auf neue Erreger reagiert. Von Hautverletzungen bis zur Makrophagenaktivierung hilft Ihre Analyse den Ärzten, schnellere Behandlungsprotokolle für die Einwohner der Stadt zu entwickeln. In einer globalisierten Welt ist Basels medizinischer 'Schutzschild' durch diese detaillierte zelluläre Überwachung stärker. Es ist, als wäre man ein Wächter auf einer Stadtmauer, der Bedrohungen identifiziert, lange bevor sie die internen Verteidigungsanlagen durchbrechen können.",
            vaccine_research: "Schweizer Impfinstitut - Gedächtnis-Engineering: Im Basler Forschungscluster konzentriert sich Ihre Arbeit am Impfinstitut darauf, das Immunsystem zu 'erziehen'. Durch die Schaffung von Gedächtniszellen, die sich die Blaupausen von Viren 'merken', helfen Sie sicherzustellen, dass die sekundäre Immunantwort schnell und kraftvoll ist. Diese Forschung ist lebenswichtig für die öffentliche Gesundheit in der Schweiz und darüber hinaus. Es ist wie das Training einer spezialisierten Polizeieinheit, die einen Kriminellen sofort anhand eines einzigen alten Fotos erkennen kann und das Verbrechen verhindert, bevor es überhaupt passiert.",
            autoimmune_center: "Basler Forschungszentrum für Autoimmunität - Identitätsverlust: Die Forschung an diesem Basler Zentrum konzentriert sich darauf, wann das Immunsystem seine interne 'Karte' verliert und beginnt, das eigene Gewebe des Körpers anzugreifen. Ihre Aufgabe ist es, die Schwellenpotentiale und Aktivierungssignale zu verstehen, die bei Erkrankungen wie Multipler Sklerose schiefgehen. Die Lösung dieses Rätsels hat Priorität für die Basler Life-Science-Gemeinschaft. Es ist wie ein Sicherheitssystem, das falsch programmiert wurde und beginnt, den Hausbesitzer auszusperren – die Wiederherstellung der korrekten Identitätserkennung ist der Schlüssel zur Genesung."
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
        results: {
            valid: "Struktur Verifiziert",
            invalid: "Analysefehler",
            valid_desc: "Organell stimmt mit Datenbank überein. Fortfahren.",
            invalid_desc: "Abweichung in der morphologischen Analyse erkannt.",
            next: "Nächstes Präparat",
            analysis: "Mikroskopische Analyse"
        },
        prompts: {
            id_prompt: "Identifizieren Sie das Organell: {organelle}",
            id_target: "Markiert: ?",
            fn_prompt: "Welches Organell ist verantwortlich für: {func}?",
            fn_target: "Funktion: {func}",
            hint_name: "Es ist der/die {name}",
            hint_start: "Die Antwort beginnt mit {char}",
            hint_func: "Dieses Organell führt aus: {func}",
            hint_range: "Der Wert liegt zwischen {min} und {max}",
            org_count_mitochondria: "Wie viele Mitochondrien gibt es typischerweise in einer menschlichen Leberzelle?",
            org_count_ribosomes: "Ungefähr wie viele Ribosomen gibt es in einer typischen eukaryotischen Zelle?",
            org_nucleus_diameter: "Was ist der typische Durchmesser eines Zellkerns in Mikrometern?",
            org_cell_diameter: "Was ist der typische Durchmesser einer tierischen Zelle in Mikrometern?",
            org_mitochondria_length: "Was ist die typische Länge eines Mitochondriums in Mikrometern?",
            org_golgi_cisternae: "Wie viele Zisternen (abgeflachte Säcke) gibt es typischerweise in einem Golgi-Apparat?",
            org_lysosome_count: "Ungefähr wie viele Lysosomen gibt es in einer typischen tierischen Zelle?",
            org_er_percentage: "Welchen Prozentsatz des Zellvolumens nimmt das endoplasmatische Retikulum ein?",
            org_nuclear_pores: "Wie viele Kernporen gibt es typischerweise in einer Kernhülle?",
            org_peroxisome_count: "Ungefähr wie viele Peroxisomen gibt es in einer typischen Leberzelle?",
            org_atp_per_glucose: "Wie viele ATP-Moleküle werden aus einem Glukosemolekül bei aerober Atmung produziert?",
            org_protein_synthesis_rate: "Was ist die typische Rate der Proteinsynthese in Aminosäuren pro Sekunde?",
            org_membrane_thickness: "Was ist die Dicke einer Zellmembran in Nanometern?",
            org_microtubule_diameter: "Was ist der Durchmesser eines Mikrotubulus in Nanometern?",
            org_ribosome_diameter: "Was ist der Durchmesser eines Ribosoms in Nanometern?",
            org_cristae_surface_area: "Was ist die ungefähre Oberfläche der mitochondrialen Cristae in Quadratmikrometern?",
            org_nuclear_dna_length: "Wenn alle DNA in einem menschlichen Zellkern gestreckt würde, wie lang wäre sie in Metern?",
            org_golgi_transit_time: "Wie lange dauert es, bis ein Protein durch den Golgi-Apparat transportiert wird in Minuten?",
            org_lysosome_ph: "Was ist der typische pH-Wert innerhalb eines Lysosoms?",
            org_mitochondrial_dna: "Wie viele Gene sind in der mitochondrialen DNA kodiert?"
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
            },
            lysosome: { name: "Lysosom", func: "Zelluläre Verdauung", details: "Enthält Verdauungsenzyme, die Abfallmaterialien und Zelltrümmer abbauen." },
            peroxisome: { name: "Peroxisom", func: "Lipidstoffwechsel", details: "Baut Fettsäuren ab und entgiftet schädliche Substanzen." },
            centrosome: { name: "Zentrosom", func: "Mikrotubuli-Organisation", details: "Organisiert Mikrotubuli und reguliert die Zellteilung." },
            vacuole: { name: "Vakuole", func: "Speicherung und Turgor", details: "Speichert Wasser, Nährstoffe und Abfallprodukte. Erhält den Zellturgordruck." },
            cytoskeleton: { name: "Zytoskelett", func: "Strukturelle Unterstützung", details: "Netzwerk aus Proteinfilamenten, das Zellform bietet und Bewegung ermöglicht." },
            nucleolus: { name: "Nukleolus", func: "Ribosomen-Assemblierung", details: "Ort der ribosomalen RNA-Synthese und Ribosomen-Assemblierung im Kern." },
            nuclear_pore: { name: "Kernpore", func: "Nuklearer Transport", details: "Kanäle in der Kernhülle, die selektiven Transport von Molekülen ermöglichen." },
            smooth_er: { name: "Glattes ER", func: "Lipidsynthese", details: "Synthetisiert Lipide und Steroide, entgiftet Medikamente und Gifte." },
            rough_er: { name: "Raues ER", func: "Proteinsynthese", details: "Mit Ribosomen besetzt, synthetisiert Proteine zur Sekretion." },
            centriole: { name: "Zentriol", func: "Spindelbildung", details: "Paar zylindrischer Strukturen, die während der Zellteilung die mitotische Spindel bilden." },
            microtubule: { name: "Mikrotubulus", func: "Intrazellulärer Transport", details: "Hohle Röhren, die als Schienen für Motorproteine dienen, die Fracht transportieren." },
            microfilament: { name: "Mikrofilament", func: "Zellmotilität", details: "Dünne Aktinfilamente, die an Zellbewegung und Formänderungen beteiligt sind." },
            intermediate_filament: { name: "Intermediärfilament", func: "Mechanische Festigkeit", details: "Seilartige Fasern, die mechanische Stabilität für Zellen bieten." },
            nuclear_envelope: { name: "Kernhülle", func: "Nukleare Kompartimentierung", details: "Doppelmembran, die den Kern vom Zytoplasma trennt." },
            cristae: { name: "Cristae", func: "ATP-Synthese-Oberfläche", details: "Gefaltete innere Membran der Mitochondrien, wo ATP-Synthese stattfindet." }
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
            atp: "ATP-Energie",
            analysis: "Biologisches Ziel"
        },
        results: {
            valid: "Homöostase Stabil",
            invalid: "Stoffwechselkrise",
            valid_desc: "Zelluläres Gleichgewicht erreicht.",
            invalid_desc: "Zellulärer Stress erkannt. Stoffwechselfluss korrigieren.",
            next: "Nächstes Gleichgewicht"
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
        results: {
            valid: "Gleichung Ausgeglichen",
            invalid: "Reaktionsfehler",
            valid_desc: "Photosynthese-Gleichung verifiziert.",
            invalid_desc: "Stöchiometrie-Fehler. Atombalance prüfen.",
            next: "Nächste Herausforderung"
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
        footer_left: "SB1.03_ZELLTEILUNG // KNOTEN: BASEL",
        objective_title: "Aktuelles Missionsziel",
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
        },
        labels: {
            analysis: "Zellteilungsanalyse",
            phase_analysis: "Phasenanalyse",
            chromosome_count: "Chromosomenzahl",
            hint: "Teilungshinweis",
            visualization: "Zellteilungsvisualisierung",
            loading: "Lade Zelldaten..."
        },
        scenarios: {
            mitosis: "Universitätsspital Basel - Krebsforschungsabteilung: Sie arbeiten im onkologischen Forschungslabor des Universitätsspitals Basel, wo das Verständnis der Mitose für die Krebsbehandlung entscheidend ist. Mitose ist der Prozess, bei dem sich eine einzelne Zelle teilt, um zwei identische Tochterzellen zu produzieren, jede mit der gleichen Anzahl von Chromosomen wie die Mutterzelle (46 beim Menschen). Dieser Prozess gewährleistet genetische Kontinuität und ist essentiell für Wachstum, Gewebereparatur und asexuelle Fortpflanzung. Der Prozess besteht aus mehreren Phasen: Prophase (Chromatin kondensiert zu sichtbaren Chromosomen, jedes bestehend aus zwei Schwesterchromatiden, die am Zentromer verbunden sind), Metaphase (Chromosomen ordnen sich am Äquator der Zelle an), Anaphase (Schwesterchromatiden trennen sich und bewegen sich zu entgegengesetzten Polen), und Telophase (Kernhüllen bilden sich um jeden Chromosomensatz neu). Ihre Aufgabe ist es, die Anzahl der Chromatiden oder Chromosomen in jeder Phase zu verfolgen. Das Verständnis der Mitose ist grundlegend für Basels hochmoderne Krebsforschung, da Krebszellen oft abnormale mitotische Prozesse aufweisen. Dieses Wissen hilft Forschern bei Roche und dem Universitätsspital, gezielte Therapien zu entwickeln, die die Zellteilung von Krebszellen stören und gleichzeitig normale Zellen schonen.",
            meiosis_i: "Friedrich Miescher Institut - Labor für Reproduktionsbiologie: Am FMI in Basel untersuchen Sie die Meiose, die spezialisierte Zellteilung, die Gameten (Geschlechtszellen) mit der halben Anzahl von Chromosomen produziert. Meiose I ist die erste Teilung, bei der sich homologe Chromosomenpaare trennen und die Chromosomenzahl von diploid (2n = 46) auf haploid (n = 23) reduziert wird. Dieser Prozess ist einzigartig wegen des Crossing-over während der Prophase I, bei dem homologe Chromosomen genetisches Material austauschen und so genetische Vielfalt schaffen. Die Phasen umfassen: Prophase I (homologe Chromosomen paaren sich und tauschen Segmente aus), Metaphase I (gepaarte Chromosomen ordnen sich am Zelläquator an), Anaphase I (homologe Chromosomen trennen sich und bewegen sich zu entgegengesetzten Polen), und Telophase I (zwei haploide Zellen bilden sich, jede mit 23 Chromosomen, aber jedes Chromosom besteht noch aus zwei Schwesterchromatiden). Ihre Aufgabe ist es, Chromosomen oder Chromosomenpaare in jeder Phase zu zählen. Das Verständnis der Meiose ist essentiell für Basels Reproduktionsmedizin und genetische Beratungsdienste und hilft Familien, Vererbungsmuster und genetische Störungen zu verstehen.",
            meiosis_ii: "Basler Genetikberatungszentrum - Vererbungsanalyse: Sie arbeiten im Basler Genetikberatungszentrum, wo das Verständnis der Meiose II entscheidend ist, um Familien die Vererbung zu erklären. Meiose II ähnelt der Mitose, beginnt aber mit haploiden Zellen. Sie trennt Schwesterchromatiden, um vier haploide Gameten zu produzieren, jede mit 23 einzelnen Chromosomen. Die Phasen umfassen: Prophase II (Chromosomen kondensieren erneut), Metaphase II (Chromosomen ordnen sich am Äquator an), Anaphase II (Schwesterchromatiden trennen sich schließlich), und Telophase II (vier haploide Zellen bilden sich, jede mit 23 einzelnen Chromosomen). Dieser Prozess erklärt, warum Geschwister trotz gleicher Eltern unterschiedlich aussehen können - jede Gamete trägt aufgrund des Crossing-over in Meiose I und der unabhängigen Verteilung eine einzigartige Kombination von genetischem Material. Ihre Aufgabe ist es, die Chromosomenzahl durch jede Phase zu verfolgen. Dieses Wissen ist vital für Basels genetische Beratungsdienste und hilft Familien, Zustände wie das Down-Syndrom (Trisomie 21) zu verstehen, die aus Fehlern in der Meiose resultieren."
        },
        prompts: {
            mitosis_count: "Während der {phase} der Mitose, wie viele Chromatiden sind vorhanden?",
            meiosis_i_count: "Während der {phase} der Meiose I, wie viele Chromosomen oder Paare sind vorhanden?",
            meiosis_ii_count: "Während der {phase} der Meiose II, wie viele Chromosomen sind vorhanden?",
            hint_mitosis: "In der Mitose trennen sich Schwesterchromatiden während der Anaphase, wodurch sich die Anzahl vorübergehend verdoppelt",
            hint_meiosis_i: "Meiose I trennt homologe Paare und reduziert von 46 auf 23 Chromosomen pro Zelle",
            hint_meiosis_ii: "Meiose II trennt Schwesterchromatiden, ähnlich der Mitose, aber beginnend mit 23"
        },
        results: {
            valid: "Teilung Verifiziert",
            invalid: "Chromosomenzählfehler",
            valid_desc: "Zellteilungsphase korrekt analysiert.",
            invalid_desc: "Zählen Sie die Chromosomen in dieser Phase erneut.",
            next: "Nächste Phase"
        }
    },

    // SB1.04: Pflanzenstruktur & Funktion
    sb1_04: {
        back: "Zurück zum Nexus",
        title: "SB1.04 // PFLANZENSTRUKTUR & FUNKTION",
        difficulty: {
            basic: "BASIS",
            core: "KERN",
            advanced: "FORTGESCHRITTEN",
            elite: "ELITE"
        },
        stages: {
            plant_structure: "PFLANZENSTRUKTUR",
            water_transport: "WASSERTRANSPORT",
            nutrient_transport: "NÄHRSTOFFTRANSPORT"
        },
        scenarios: {
            plant_structure: "Botanischer Garten Basel - Pflanzenanatomieforschung: Sie sind Botaniker am Botanischen Garten der Universität Basel, einem der ältesten botanischen Gärten der Schweiz (gegründet 1589), und studieren Pflanzenstruktur und -funktion. Pflanzen haben drei Hauptorgansysteme: Wurzeln (verankern die Pflanze, absorbieren Wasser und Mineralien aus dem Boden, speichern Nährstoffe), Stängel (bieten strukturelle Unterstützung, transportieren Wasser und Nährstoffe zwischen Wurzeln und Blättern, können Nährstoffe speichern) und Blätter (Hauptort der Photosynthese, Gasaustausch durch Stomata, Transpiration). Jedes Organ hat spezialisierte Gewebe: Hautgewebe (Epidermis mit Kutikula zum Schutz, Wurzelhaare zur Absorption), Leitgewebe (Xylem transportiert Wasser aufwärts, Phloem transportiert Zucker bidirektional) und Grundgewebe (Parenchym für Speicherung und Photosynthese, Kollenchym für flexible Unterstützung, Sklerenchym für starre Unterstützung). Das Verständnis der Pflanzenstruktur ist essentiell für Basels Agrarforschung, städtische Forstwirtschaft entlang des Rheins und pharmazeutische Botanik bei Roche und Novartis, wo viele Medikamente aus Pflanzenverbindungen gewonnen werden. Der Botanische Garten Basel pflegt über 7.500 Pflanzenarten für Forschung und Bildung.",
            water_transport: "Eidgenössische Forschungsanstalt für Wald, Schnee und Landschaft - Baumphysiologielabor: Sie studieren Wassertransport in Pflanzen an der WSL-Forschungsstation bei Basel und analysieren, wie Bäume entlang des Rheins Wasseraufnahme und Transpiration managen. Wasser bewegt sich von Wurzeln zu Blättern durch Xylemgefäße über drei Mechanismen: Wurzeldruck (aktiver Transport von Mineralien in Wurzeln erzeugt osmotischen Druck, der Wasser nach oben drückt), Kapillarwirkung (Wassermoleküle haften an Xylemwänden und kohärieren miteinander, wodurch kontinuierliche Wassersäulen entstehen) und Transpirationssog (Verdunstung von Wasser aus Blattstomata erzeugt Unterdruck, der Wasser von Wurzeln nach oben zieht). Diese Kohäsions-Spannungs-Theorie erklärt, wie hohe Bäume wie Basler Platanen Wasser über 30 Meter hoch transportieren können. Die Transpirationsrate wird von Temperatur, Luftfeuchtigkeit, Wind und Lichtintensität beeinflusst. Das Verständnis des Wassertransports ist entscheidend für die Verwaltung von Basels Stadtwäldern, die Vorhersage von Trockenstress in der Schweizer Landwirtschaft und die Entwicklung dürreresistenter Pflanzen für die Klimaanpassung.",
            nutrient_transport: "Syngenta Pflanzenwissenschaftsforschung - Pflanzenernährungsabteilung: Sie arbeiten in Syngentas Forschungseinrichtung bei Basel und studieren Nährstofftransport in Nutzpflanzen zur Verbesserung der landwirtschaftlichen Produktivität. Während der Photosynthese in Blättern produzierte Zucker werden durch Phloemgewebe zu Wachstumsbereichen (Meristeme), Speicherorganen (Wurzeln, Knollen, Früchte) und metabolisch aktiven Geweben transportiert. Dieser Prozess, Translokation genannt, folgt der Druckstrom-Hypothese: Hohe Zuckerkonzentration in Quellgeweben (reife Blätter) erzeugt hohen osmotischen Druck, während niedrige Zuckerkonzentration in Senkengeweben (Wurzeln, Früchte, Wachstumsspitzen) niedrigen osmotischen Druck erzeugt, was den Massenstrom von Phloemsaft von Quelle zu Senke antreibt. Phloembeladung kann symplastisch (durch Plasmodesmen) oder apoplastisch (durch Membrantransporter) erfolgen. Das Verständnis des Nährstofftransports hilft Basels Agrarunternehmen, Düngemittel zu entwickeln, Ernteerträge zu optimieren und Pflanzen mit verbesserter Nährstoffverteilung zu züchten. Diese Forschung unterstützt die nachhaltige Landwirtschaft und Ernährungssicherheit der Schweiz."
        },
        objective_title: "Pflanzenanalyse",
        complete: "Modul abgeschlossen!",
        check: "Prüfen",
        next: "Nächste Herausforderung",
        correct: "Struktur verifiziert",
        incorrect: "Antwort prüfen",
        ready: "Bereit",
        monitor_title: "SB1.04_PFLANZEN_MONITOR",
        footer_left: "SB1.04_PFLANZENSTRUKTUR // KNOTEN: BASEL"
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
        ready: "Bereit",
        stages: {
            tissues: "GEWEBETYPEN",
            organs: "ORGANZUSAMMENSETZUNG",
            systems: "ORGANSYSTEME"
        },
        scenarios: {
            tissues: "Universitätsspital Basel - Institut für Pathologie: Sie sind Medizinstudent am Universitätsspital Basel, einem der führenden medizinischen Zentren der Schweiz, und lernen unter der Leitung von Dr. Müller vom Institut für Pathologie die Gewebeidentifikation. Mit hochmodernen Zeiss-Mikroskopen im Departement für Biomedizin untersuchen Sie histologische Proben aus verschiedenen anatomischen Regionen. Jeder der vier primären Gewebetypen hat unterschiedliche strukturelle und funktionelle Eigenschaften: Epithelgewebe (Epithel) bildet Schutzbarrieren und sekretorische Oberflächen - einschichtiges Plattenepithel kleidet Blutgefäße aus, mehrschichtiges Plattenepithel schützt die Haut, und Zylinderepithel mit Mikrovilli absorbiert Nährstoffe im Darmtrakt. Bindegewebe bietet mechanische Unterstützung und metabolische Funktionen - straffes reguläres Bindegewebe bildet Sehnen, hyaliner Knorpel polstert Gelenke, kompakter Knochen bietet Skelettstruktur, und Fettgewebe speichert Energie. Muskelgewebe erzeugt Kontraktionskraft - Herzmuskel (Myokard) pumpt Blut mit unwillkürlichen rhythmischen Kontraktionen, Skelettmuskel ermöglicht willkürliche Bewegung über neuromuskuläre Verbindungen, und glatte Muskulatur reguliert Organfunktionen in Verdauungs- und Gefäßsystemen. Nervengewebe verarbeitet und überträgt elektrochemische Signale - Neuronen leiten Aktionspotentiale, während Gliazellen (Astrozyten, Oligodendrozyten, Mikroglia) Unterstützung und Isolierung bieten. Ihre Aufgabe ist es, die Hauptfunktion jedes Gewebetyps anhand seiner mikroskopischen Architektur, zellulären Zusammensetzung und anatomischen Lage zu identifizieren. Diese grundlegende Fähigkeit ist für die klinische Pathologie an Basels renommierten medizinischen Institutionen unerlässlich, da abnorme Gewebehistologie oft auf Krankheitsprozesse hinweist. Das Verständnis der Gewebefunktion ist die Grundlage für das Verständnis der Organphysiologie.",
            organs: "Roche Pharmaforschung - Abteilung für Organsystembiologie: Sie arbeiten im globalen Hauptsitz von Roche in Basel, speziell in der Abteilung für Organsystembiologie, wo Wissenschaftler detaillierte computergestützte und physische Modelle menschlicher Organe für die Arzneimittelentdeckung und präklinische Tests erstellen. Basel als weltweit führendes Pharmazentrum beherbergt Spitzenforschung bei Roche, Novartis und dem Biozentrum. Jedes Organ im menschlichen Körper stellt eine komplexe Integration mehrerer Gewebetypen dar, die in koordinierter Harmonie arbeiten. Das Herz (Cor) enthält vier Gewebetypen: Herzmuskelgewebe (Myokard mit Glanzstreifen für synchronisierte Kontraktion), Epithelgewebe (Endokard, das Kammern auskleidet, und Endothel, das Gefäße auskleidet), Bindegewebe (fibröses Herzskelett, das strukturelles Gerüst und Klappenunterstützung bietet), und Nervengewebe (autonome Innervation vom Herzplexus, der Herzfrequenz und Kontraktilität steuert). Der Magen (Gaster) integriert ähnlich: Epithelgewebe (Magenschleimhaut mit Belegzellen, die HCl sezernieren, und Hauptzellen, die Pepsinogen sezernieren), glattes Muskelgewebe (Muscularis externa mit zirkulären und longitudinalen Schichten für Peristaltik), Bindegewebe (Submukosa, die vaskuläre und neurale Unterstützung bietet), und Nervengewebe (Plexus myentericus, der Verdauungsmotilität koordiniert). Die Leber (Hepar) enthält: Epithelgewebe (Hepatozyten, die in Läppchen angeordnet sind und metabolische Funktionen ausführen), Bindegewebe (Glisson-Kapsel und Portalfelder), und spezialisiertes Endothelgewebe (sinusoidale Kapillaren zur Blutfiltration). Ihre Aufgabe ist es, die Gewebetyp-Zusammensetzung jedes Organs zu quantifizieren. Diese Information ist entscheidend für das Verständnis, wie pharmazeutische Verbindungen verschiedene Zellpopulationen innerhalb eines Organs beeinflussen - ein Medikament, das auf glatte Muskulatur abzielt, kann auch mit epithelialen oder neuralen Komponenten im selben Organ interagieren. Genaue Multi-Gewebe-Organmodelle helfen Roche und anderen Basler Pharmaunternehmen, sicherere und wirksamere Medikamente zu entwickeln, indem potenzielle Nebenwirkungen und Off-Target-Interaktionen vor klinischen Studien am Menschen vorhergesagt werden. Diese Arbeit trägt direkt zur Entwicklung lebensrettender Therapeutika bei, die im Universitätsspital Basel und in medizinischen Zentren weltweit eingesetzt werden.",
            systems: "Medizinische Fakultät der Universität Basel - Abteilung für Anatomie: Sie studieren Humananatomie an der Medizinischen Fakultät der Universität Basel, einer der ältesten und renommiertesten medizinischen Schulen Europas (gegründet 1460), und lernen, wie der menschliche Körper in einem hierarchischen Strukturrahmen organisiert ist. Diese biologische Organisationshierarchie folgt einer logischen Progression von molekularer zu organismischer Komplexität: Zellen (die fundamentalen Lebenseinheiten, wie eine einzelne Kardiomyozyte mit Sarkomeren zur Kontraktion) → Gewebe (Populationen ähnlicher Zellen mit gemeinsamer Funktion und extrazellulärer Matrix, wie Herzmuskelgewebe) → Organe (integrierte Strukturen aus mehreren Gewebetypen mit spezifischen physiologischen Rollen, wie das Herz mit seinen vier Kammern) → Organsysteme (koordinierte Gruppen von Organen, die verwandte Funktionen ausführen, wie das Herz-Kreislauf-System mit Herz, Arterien, Venen und Kapillaren) → Organismus (der vollständige menschliche Körper als integriertes Ganzes). Zum Beispiel verbindet sich eine einzelne Herzmuskelzelle (Kardiomyozyte) mit ihren kontraktilen Proteinen über Glanzstreifen mit Millionen anderer Kardiomyozyten, um Herzmuskelgewebe zu bilden. Dieses Muskelgewebe kombiniert sich mit endokardialem Epithel (Auskleidung der Kammern), fibrösem Bindegewebe (Herzskelett und Klappen) und autonomem Nervengewebe (Herzplexus zur Frequenzkontrolle), um das Herzorgan zu bilden. Das Herz arbeitet dann in Koordination mit Blutgefäßen (elastische Arterien wie die Aorta, muskuläre Arterien zur Verteilung, Kapillaren zum Austausch und Venen zur Rückführung), um das Herz-Kreislauf-System zu bilden, das Sauerstoff, Nährstoffe, Hormone und Immunzellen durch den gesamten Organismus transportiert und gleichzeitig metabolische Abfallprodukte entfernt. Das Verständnis dieser hierarchischen Organisation ist grundlegend für die klinische Medizin und Forschung an Basels medizinischen Institutionen - ein molekularer Defekt (wie eine Mutation im Gen, das kardiales Troponin kodiert) kann durch zelluläre Dysfunktion, Gewebepathologie, Organversagen und systemische Erkrankung kaskadieren und den gesamten Organismus beeinflussen. Ihre Aufgabe ist es, die richtige Ebene in dieser biologischen Hierarchie zu identifizieren und die Zusammensetzung der wichtigsten Organsysteme zu verstehen. Dieses Wissen ist essentiell für die medizinische Praxis am Universitätsspital Basel und für die biomedizinische Forschung am Biozentrum und Friedrich Miescher Institut."
        },
        labels: {
            analysis: "Gewebe-Analyse",
            terminal: "Eingabeterminal",
            hint: "Pathologie-Hinweis",
            tissue_type: "Gewebetyp",
            organ_structure: "Organstruktur",
            system_hierarchy: "Systemhierarchie"
        },
        anatomy: {
            tissues: {
                epithelial: {
                    name: "Epithelgewebe",
                    function: "Schutz, Sekretion, Absorption",
                    subtypes: "Platten-, Kubisch-, Zylinderepithel; einschichtig oder mehrschichtig",
                    location: "Hautepidermis, Darmauskleidung, Drüsengewebe"
                },
                connective: {
                    name: "Bindegewebe",
                    function: "Strukturelle Unterstützung, Energiespeicherung, Immunabwehr",
                    subtypes: "Locker, straff, Knorpel, Knochen, Blut, Fettgewebe",
                    location: "Sehnen, Bänder, Knochenmatrix, Blutgefäße"
                },
                muscle: {
                    name: "Muskelgewebe",
                    function: "Kontraktion und Krafterzeugung",
                    subtypes: "Skelettmuskel (willkürlich), Herzmuskel (unwillkürlich), glatte Muskulatur (unwillkürlich)",
                    location: "Skelettmuskeln, Herzmyokard, Organwände"
                },
                nervous: {
                    name: "Nervengewebe",
                    function: "Signalübertragung und Informationsverarbeitung",
                    subtypes: "Neuronen (leitend), Gliazellen (unterstützend)",
                    location: "Gehirn, Rückenmark, periphere Nerven"
                }
            },
            organs: {
                heart: "Herz (Cor): 4 Gewebetypen - Herzmuskel, Endothel, Bindegewebe, Nerven",
                stomach: "Magen (Gaster): 4 Gewebetypen - Epithelschleimhaut, glatte Muskulatur, Bindegewebe, Nerven",
                liver: "Leber (Hepar): 3 Gewebetypen - Hepatozyten, Bindegewebe, Endothel",
                kidney: "Niere (Ren): 4 Gewebetypen - Epitheltubuli, Bindegewebe, vaskulär, Nerven"
            },
            hierarchy: {
                cell: "Zelle - fundamentale Lebenseinheit",
                tissue: "Gewebe - Gruppe ähnlicher Zellen",
                organ: "Organ - mehrere integrierte Gewebe",
                system: "Organsystem - koordinierte Organe",
                organism: "Organismus - vollständiges Individuum"
            }
        },
        results: {
            valid: "Biologische Verifizierung abgeschlossen",
            invalid: "Diagnosefehler",
            valid_desc: "Die identifizierte biologische Struktur stimmt mit unserer Datenbank überein.",
            invalid_desc: "Falsche Identifizierung. Bitte überprüfen Sie die Gewebemorphologie und -funktionen.",
            next: "Nächste Stufe analysieren"
        },
        prompts: {
            epithelial_func: "Epithelgewebe bedeckt Körperoberflächen. Was ist seine Hauptfunktion?",
            connective_func: "Bindegewebe bietet strukturelle Unterstützung. Nennen Sie seine Funktion:",
            muscle_func: "Muskelgewebe ermöglicht Körperbewegung. Was ist seine Funktion?",
            nervous_func: "Nervengewebe überträgt elektrische Signale. Was ist seine Funktion?",
            absorb_func: "Epithelgewebe im Darm absorbiert Nährstoffe. Funktion?",
            organ_count: "Das {organ} enthält Muskel-, Epithel-, Binde- und Nervengewebe. Anzahl:",
            organ_count_simple: "Das {organ} enthält {list}. Anzahl:",
            hierarchy: "Vervollständigen: Zelle \\\\to Gewebe \\\\to Organ \\\\to ?",
            system_count: "Das {system} hat {n} Hauptorgane. Anzahl:",
            nervous_divisions: "Das Nervensystem hat 2 Hauptabteilungen. Anzahl:",
            hint_epithelial: "Bedeckt und schützt Oberflächen",
            hint_connective: "Bietet Gerüst",
            hint_muscle: "Kontrahiert zur Bewegung",
            hint_nervous: "Sendet elektrische Signale",
            hint_organs: "Alle Organe haben mehrere Gewebe",
            hint_systems: "Gruppen von Organen",
            location: "Lage: {loc}",
            function_label: "Funktion",
            next_level: "Nächste Ebene"
        },
        feedback: {
            correct: "Gewebeidentifikation verifiziert! Fahren Sie mit dem nächsten Präparat fort.",
            incorrect: "Gewebefehlidentifikation. Überprüfen Sie histologische Merkmale."
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
        scenarios: {
            digestive: "Universitätsspital Basel - Abteilung für Gastroenterologie: Sie begleiten Frau Dr. Weber, eine Gastroenterologin am Universitätsspital Basel, während sie Medizinstudenten das Verdauungssystem erklärt. Das Verdauungssystem ist ein komplexes Gefüge von Organen, die zusammenarbeiten, um Nahrung in Nährstoffe zu zerlegen, die Ihr Körper für Energie, Wachstum und Zellreparatur aufnehmen und verwenden kann. Die Reise beginnt im Mund, wo die mechanische Verdauung (Kauen) und die chemische Verdauung (Speichelenzyme) mit dem Abbau der Nahrung beginnen. Die Nahrung gelangt dann durch peristaltische Wellen (Muskelkontraktionen) durch die Speiseröhre in den Magen, wo starke Magensäure (pH 1.5-3.5) und Pepsin-Enzyme Proteine weiter abbauen. Der teilweise verdaute Speisebrei (Chymus) gelangt in den Dünndarm (6-7 Meter lang), wo die meiste Nährstoffaufnahme durch Millionen winziger fingerartiger Ausstülpungen, die Zotten, stattfindet. Die Leber produziert Galle zur Emulgierung von Fetten, während die Bauchspeicheldrüse Verdauungsenzyme und Bikarbonat zur Neutralisierung der Magensäure ausscheidet. Schließlich nimmt der Dickdarm Wasser auf und bildet festen Abfall. Das Verständnis dieses Systems ist entscheidend für die Diagnose von Erkrankungen wie Morbus Crohn, Geschwüren und Malabsorptionsstörungen, von denen Tausende von Basler Einwohnern betroffen sind. Ihre Aufgabe ist es, das richtige Organ im Verdauungsweg zu identifizieren und die spezifische Funktion jedes Organs in dieser bemerkenswerten biologischen Montagelinie zu verstehen.",
            circulatory: "Kardiologiezentrum Basel - Analyse der Herzfunktion: Sie arbeiten im Kardiologiezentrum Basel mit Dr. Schneider zusammen und analysieren, wie das Kreislaufsystem jede Zelle des menschlichen Körpers mit Sauerstoff und Nährstoffen versorgt und gleichzeitig Kohlendioxid und Stoffwechselabfälle entfernt. Das Herz ist eine starke Muskelpumpe mit vier Kammern: zwei Vorhöfen (obere Kammern, die Blut empfangen) und zwei Ventrikeln (untere Kammern, die Blut ausstoßen). Die rechte Seite pumpt sauerstoffarmes Blut zur Oxygenierung in die Lunge, während die linke Seite pumpt sauerstoffreiches Blut durch ein Netzwerk von Blutgefäßen in den gesamten Körper pumpt. Arterien transportieren Blut unter hohem Druck (systolischer Druck ~120 mmHg) vom Herzen weg und haben dicke elastische Wände, um diesem Druck standzuhalten. Venen führen Blut unter niedrigem Druck zum Herzen zurück und verwenden Einwegventile, um einen Rückfluss zu verhindern. Kapillaren sind mikroskopisch kleine Gefäße, in denen der Gasaustausch zwischen Blut und Gewebe stattfindet. Das Herz eines durchschnittlichen Erwachsenen schlägt 60-100 Mal pro Minute und pumpt in Ruhe etwa 5 Liter Blut pro Minute (Herzzeitvolumen). Bei intensiver körperlicher Betätigung steigt dieser Wert auf 20-25 Liter pro Minute an. Das Verständnis des Kreislaufsystems ist unerlässlich für die Behandlung von Herz-Kreislauf-Erkrankungen, der häufigsten Todesursache in der Schweiz. Ihre Aufgabe ist es, die Hauptkomponenten des Kreislaufsystems zu identifizieren und zu verstehen, wie das Blut durch dieses lebenswichtige Transportnetzwerk fließt.",
            respiratory: "Pneumologisches Institut Basel - Labor für Atemfunktion: Sie unterstützen Dr. Keller am Pneumologischen Institut Basel, wo Forscher untersuchen, wie das Atmungssystem den Gasaustausch ermöglicht – Sauerstoff in den Körper aufnimmt und Kohlendioxid entfernt. Die Luft gelangt durch die Nase oder den Mund in den Körper, wo sie gefiltert, erwärmt und befeuchtet wird. Sie gelangt durch den Pharynx (Rachen) und den Larynx (Kehlkopf mit den Stimmbändern) in die Trachea (Luftröhre), eine starre Röhre, die mit C-förmigen Knorpelringen verstärkt ist, um ein Kollabieren zu verhindern. Die Luftröhre verzweigt sich in zwei Bronchien (eine für jeden Lungenflügel), die sich weiter in kleinere Bronchiolen verzweigen und eine baumartige Struktur bilden, die Bronchialbaum genannt wird. Am Ende der kleinsten Bronchiolen befinden sich Cluster winziger Lungenbläschen, die Alveolen genannt werden (ca. 300 Millionen in der Lunge eines Erwachsenen), in denen der Gasaustausch stattfindet. Die Alveolarwände sind extrem dünn (0.5 Mikrometer) und von Kapillaren umgeben, sodass Sauerstoff in das Blut diffundieren kann, während Kohlendioxid herausdiffundiert. Das Zwerchfell, ein kuppelförmiger Muskel unter der Lunge, zieht sich beim Einatmen zusammen, um den Brustraum zu erweitern, wodurch ein Unterdruck entsteht, der Luft ansaugt. Beim Ausatmen entspannt sich das Zwerchfell und die elastische Lunge zieht sich zusammen, wobei die Luft herausgedrückt wird. Ein gesunder Erwachsener atmet in Ruhe 12-20 Mal pro Minute und tauscht etwa 500 ml Luft pro Atemzug aus (Atemzugvolumen). Das Verständnis der Atemfunktion ist entscheidend für die Behandlung von Erkrankungen wie Asthma, COPD und Lungenentzündung. Ihre Aufgabe ist es, die Organe im Atemweg zu identifizieren und den Mechanismus der Atmung und des Gasaustauschs zu verstehen."
        },
        results: {
            valid: "Biologischer Pfad verifiziert",
            invalid: "Physiologischer Fehler",
            valid_desc: "Organfunktion und Sequenz stimmen mit dem menschlichen Anatomiemodell überein.",
            invalid_desc: "Fehlanpassung erkannt. Überprüfen Sie Organfunktion und Lage.",
            next: "Nächstes Systemmodul"
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
            input_terminal: "Eingabeterminal",
            analysis: "Systemanalyse",
            hint: "Anatome-Hinweis",
            stomach: "MAGEN",
            liver: "LEBER",
            intestines: "DÄRME",
            heart: "HERZ",
            arteries: "ARTERIEN",
            veins: "VENEN",
            lungs: "LUNGEN",
            trachea: "LUFTRÖHRE"
        },
        prompts: {
            // VERDAUUNGSSYSTEM - BASIS (5 Fragen)
            digestive_b1: "Nahrungsweg: Mund → Speiseröhre → ? → Darm",
            digestive_b2: "Das Verdauungssystem zerlegt Nahrung. Was ist seine Hauptfunktion?",
            digestive_b3: "Der Dünndarm nimmt Nährstoffe auf. Was ist seine Funktion?",
            digestive_b4: "Die Leber produziert Galle zur Fettverdauung. Was ist ihre Funktion?",
            digestive_b5: "Das Verdauungssystem hat 7 Hauptorgane. Zählen Sie:",

            // VERDAUUNGSSYSTEM - KERN (5 Fragen)
            digestive_c1: "Welches Organ produziert Verdauungsenzyme und Insulin?",
            digestive_c2: "Der Magen verwendet Salzsäure (pH 1.5-3.5). Was ist seine Funktion?",
            digestive_c3: "Zotten im Dünndarm vergrößern die Oberfläche. Warum ist das wichtig?",
            digestive_c4: "Der Dickdarm nimmt Wasser auf. Was passiert, wenn dies fehlschlägt?",
            digestive_c5: "Peristaltik bewegt Nahrung durch den Verdauungstrakt. Was ist dieser Prozess?",

            // VERDAUUNGSSYSTEM - FORTGESCHRITTEN (5 Fragen)
            digestive_a1: "Die Bauchspeicheldrüse sezerniert Bikarbonat zur Neutralisierung der Magensäure. Wie ändert sich der pH-Wert?",
            digestive_a2: "Galle emulgiert Fette zu kleineren Tröpfchen. Warum ist dies für die Verdauung notwendig?",
            digestive_a3: "Der Dünndarm ist 6-7 Meter lang. Wie beeinflusst die Länge die Absorptionseffizienz?",
            digestive_a4: "Magensäure tötet Bakterien in der Nahrung. Was passiert, wenn die Säureproduktion zu niedrig ist?",
            digestive_a5: "Die Leber verarbeitet Nährstoffe aus dem Dünndarm. Wie heißt dieser Prozess?",

            // VERDAUUNGSSYSTEM - ELITE (5 Fragen)
            digestive_e1: "Morbus Crohn verursacht Entzündungen im Verdauungstrakt. Welche Organe sind am stärksten betroffen?",
            digestive_e2: "Laktoseintoleranz tritt auf, wenn dem Dünndarm ein Enzym fehlt. Welches Enzym?",
            digestive_e3: "Das enterische Nervensystem steuert die Verdauung unabhängig. Wie viele Neuronen enthält es?",
            digestive_e4: "Zöliakie schädigt die Zotten im Dünndarm. Was ist die Folge?",
            digestive_e5: "Das Verdauungssystem nutzt mechanische und chemische Verdauung. Vergleichen Sie ihre Rollen.",

            // KREISLAUFSYSTEM - BASIS (5 Fragen)
            circulatory_b1: "Das Herz pumpt Blut durch den ganzen Körper. Was ist seine Funktion?",
            circulatory_b2: "Arterien transportieren Blut vom Herzen weg. Was machen Venen?",
            circulatory_b3: "Das Kreislaufsystem hat 3 Hauptkomponenten. Zählen Sie:",
            circulatory_b4: "Blut transportiert Sauerstoff zu den Zellen. Was transportiert es weg?",
            circulatory_b5: "Das Herz hat 4 Kammern. Zählen Sie:",

            // KREISLAUFSYSTEM - KERN (5 Fragen)
            circulatory_c1: "Die rechte Herzseite pumpt Blut in die Lunge. Wie heißt dieser Kreislauf?",
            circulatory_c2: "Der linke Ventrikel hat dickere Wände als der rechte. Warum?",
            circulatory_c3: "Kapillaren sind mikroskopisch kleine Blutgefäße. Was ist ihre Funktion?",
            circulatory_c4: "Der Blutdruck wird als systolisch/diastolisch gemessen. Was ist normaler Blutdruck?",
            circulatory_c5: "Das Herz schlägt in Ruhe 60-100 Mal pro Minute. Wie nennt man das?",

            // KREISLAUFSYSTEM - FORTGESCHRITTEN (5 Fragen)
            circulatory_a1: "Herzzeitvolumen = Herzfrequenz × Schlagvolumen. Berechnen Sie das Herzzeitvolumen in Ruhe:",
            circulatory_a2: "Arterien haben dicke elastische Wände. Wie hilft dies, dem Druck standzuhalten?",
            circulatory_a3: "Venen haben Einwegventile. Was passiert, wenn diese Ventile versagen?",
            circulatory_a4: "Rote Blutkörperchen transportieren Sauerstoff mit Hämoglobin. Wie viele Sauerstoffmoleküle pro Hämoglobin?",
            circulatory_a5: "Das elektrische System des Herzens steuert den Rhythmus. Wie heißt der Schrittmacher?",

            // KREISLAUFSYSTEM - ELITE (5 Fragen)
            circulatory_e1: "Atherosklerose verengt Arterien mit Plaque. Was sind die Folgen?",
            circulatory_e2: "Der Frank-Starling-Mechanismus passt das Herzzeitvolumen an. Wie funktioniert er?",
            circulatory_e3: "Die Blutdruckregulation umfasst mehrere Systeme. Nennen Sie drei Mechanismen:",
            circulatory_e4: "Herzinsuffizienz reduziert das Herzzeitvolumen. Welche Kompensationsmechanismen treten auf?",
            circulatory_e5: "Das Kreislaufsystem liefert 5 L/min in Ruhe, 25 L/min bei Belastung. Berechnen Sie die Zunahme:",

            // ATMUNGSSYSTEM - BASIS (5 Fragen)
            respiratory_b1: "Der Gasaustausch findet in winzigen Luftsäcken statt. Wie heißen sie?",
            respiratory_b2: "Das Atmungssystem tauscht Gase aus. Welches Gas gelangt ins Blut?",
            respiratory_b3: "Das Atmungssystem hat 5 Hauptorgane. Zählen Sie:",
            respiratory_b4: "Das Zwerchfell zieht sich zusammen, um die Lunge zu erweitern. Was ist seine Funktion?",
            respiratory_b5: "Luftweg: Nase → Rachen → ? → Luftröhre",

            // ATMUNGSSYSTEM - KERN (5 Fragen)
            respiratory_c1: "Die Luftröhre hat C-förmige Knorpelringe. Warum ist diese Struktur wichtig?",
            respiratory_c2: "Bronchien verzweigen sich in kleinere Bronchiolen. Wie heißt diese Struktur?",
            respiratory_c3: "Alveolen haben extrem dünne Wände (0.5 Mikrometer). Warum ist das notwendig?",
            respiratory_c4: "Das Zwerchfell erzeugt beim Einatmen Unterdruck. Wie saugt dies Luft an?",
            respiratory_c5: "Ein gesunder Erwachsener atmet in Ruhe 12-20 Mal pro Minute. Wie nennt man diese Rate?",

            // ATMUNGSSYSTEM - FORTGESCHRITTEN (5 Fragen)
            respiratory_a1: "Erwachsene Lungen enthalten etwa 300 Millionen Alveolen. Was ist die Gesamtoberfläche?",
            respiratory_a2: "Das Atemzugvolumen ist die pro Atemzug ausgetauschte Luft (~500 ml). Berechnen Sie das Minutenvolumen:",
            respiratory_a3: "Sauerstoff diffundiert von den Alveolen in die Kapillaren. Was treibt diese Diffusion an?",
            respiratory_a4: "Der Kehlkopf enthält Stimmbänder. Wie erzeugen sie Klang?",
            respiratory_a5: "Surfactant reduziert die Oberflächenspannung in den Alveolen. Was passiert bei Surfactant-Mangel?",

            // ATMUNGSSYSTEM - ELITE (5 Fragen)
            respiratory_e1: "Asthma verursacht Bronchiolenverengung. Was sind die physiologischen Folgen?",
            respiratory_e2: "COPD reduziert die Gasaustauscheffizienz. Welche Kompensationsmechanismen treten auf?",
            respiratory_e3: "Das Atmungssystem reguliert den Blut-pH durch Kontrolle des CO2-Spiegels. Erklären Sie den Mechanismus:",
            respiratory_e4: "Große Höhe reduziert die Sauerstoffverfügbarkeit. Wie passt sich der Körper an?",
            respiratory_e5: "Lungenentzündung füllt Alveolen mit Flüssigkeit. Berechnen Sie die Reduktion der Gasaustauschkapazität:"
        },
        organs: {
            stomach: "Magen",
            heart: "Herz",
            lungs: "Lunge",
            esophagus: "Speiseröhre",
            intestines: "Darm",
            small_intestine: "Dünndarm",
            large_intestine: "Dickdarm",
            liver: "Leber",
            pancreas: "Bauchspeicheldrüse",
            arteries: "Arterien",
            veins: "Venen",
            capillaries: "Kapillaren",
            alveoli: "Alveolen",
            diaphragm: "Zwerchfell",
            trachea: "Luftröhre",
            larynx: "Kehlkopf",
            pharynx: "Rachen",
            bronchi: "Bronchien",
            bronchioles: "Bronchiolen",
            mouth: "Mund",
            nose: "Nase"
        },
        functions: {
            digestion: "Verdauung",
            absorption: "Absorption",
            bile_production: "Gallenproduktion",
            enzyme_production: "Enzymproduktion",
            acid_production: "Säureproduktion",
            pump_blood: "Blut pumpen",
            carry_blood: "Blut transportieren",
            return_blood: "Blut zum Herzen zurückführen",
            gas_exchange: "Gasaustausch",
            breathing: "Atmung",
            filter_air: "Luft filtern",
            produce_sound: "Klang erzeugen"
        },
        hints: {
            digestive_b1: "Wo Nahrung zerkleinert und verdaut wird",
            digestive_b2: "Zerlegt Nahrung in Nährstoffe",
            digestive_b3: "Nimmt Nährstoffe ins Blut auf",
            digestive_b4: "Hilft bei der Fettverdauung",
            digestive_b5: "Zählen Sie alle Organe im Weg",
            digestive_c1: "Befindet sich hinter dem Magen",
            digestive_c2: "Zerlegt Proteine und tötet Bakterien",
            digestive_c3: "Mehr Oberfläche = mehr Absorption",
            digestive_c4: "Führt zu Dehydration",
            digestive_c5: "Muskelkontraktionen",
            circulatory_b1: "Zirkuliert Blut",
            circulatory_b2: "Gegenteil von Arterien",
            circulatory_b3: "Herz und zwei Arten von Gefäßen",
            circulatory_b4: "Abfallgas aus Zellen",
            circulatory_b5: "Obere und untere Kammern",
            circulatory_c1: "Lungenkreislauf",
            circulatory_c2: "Pumpt zum ganzen Körper",
            circulatory_c3: "Wo Gasaustausch stattfindet",
            circulatory_c4: "120/80 mmHg",
            circulatory_c5: "Herzfrequenz",
            respiratory_b1: "Winzige Luftsäcke in der Lunge",
            respiratory_b2: "Gas für Zellatmung benötigt",
            respiratory_b3: "Von Nase zur Lunge",
            respiratory_b4: "Atemmuskel",
            respiratory_b5: "Kehlkopf",
            respiratory_c1: "Verhindert Kollaps",
            respiratory_c2: "Bronchialbaum",
            respiratory_c3: "Ermöglicht Gasdiffusion",
            respiratory_c4: "Druckunterschied",
            respiratory_c5: "Atemfrequenz"
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
            ecology_score: "Ökologie-Punktzahl",
            analysis: "Ökosystem-Analyse",
            hint: "Ökologie-Hinweis",
            viz: {
                sun: "SONNE",
                producers: "PRODUZENTEN",
                primary_consumer: "PRIMÄRKONSUMENT",
                secondary_consumer: "SEKUNDÄRKONSUMENT",
                decomposers: "DESTRUENTEN",
                carbon_cycle: "KOHLENSTOFFKREISLAUF",
                nitrogen_cycle: "N-KREISLAUF",
                water_cycle: "WASSERKREISLAUF",
                co2_air: "CO₂ in der Luft",
                plants: "Pflanzen",
                animals: "Tiere",
                river: "Rhein",
                clouds: "Wolken",
                rain: "Regen",
                evap: "Verdunstung",
                fix: "Fixierung",
                nitrate: "Nitrat",
                denit: "Denitrifizierung"
            }
        },
        prompts: {
            food_chain: "Im Rhein-Ökosystem wird {producer} von {consumer} gefressen. Was kommt als Nächstes?",
            energy_transfer: "Wenn {level}-Konsumenten {energy} kJ Energie haben, wie viel erreicht die nächste Ebene?",
            cycle_process: "Im {cycle}-Kreislauf, was wird durch {process} produziert?",
            hint_trophic: "Nur 10% der Energie werden auf die nächste trophische Ebene übertragen",
            hint_10percent: "Verwenden Sie die 10%-Regel: mit 0,1 multiplizieren",
            hint_cycle: "Denken Sie an die Ein- und Ausgänge dieses Prozesses"
        },
        results: {
            valid: "Ökologisches Gleichgewicht",
            invalid: "Trophischer Kollaps",
            valid_desc: "Energiefluss und Nährstoffkreisläufe sind optimal.",
            invalid_desc: "Falsche Berechnung. Das Ökosystem ist destabilisiert.",
            next: "Nächsten Sektor überwachen"
        },
        scenarios: {
            rhine_river: "Der Rhein in Basel ist ein komplexes aquatisches Ökosystem, das das empfindliche Gleichgewicht von Nahrungsketten verdeutlicht. An der Basis dieses Systems stehen Primärproduzenten wie Phytoplankton und Algen, die Sonnenenergie nutzen. Diese werden von Primärkonsumenten wie Zooplankton und kleinen wirbellosen Wassertieren verzehrt. In höheren trophischen Ebenen finden wir verschiedene Fischarten wie den Silberkarpfen und den Europäischen Aal. Das Projekt 'Lachs Comeback' in Basel unterstreicht die Bedeutung der Erhaltung dieser Verbindungen, da Lachse als wichtige Indikatoren für die Gesundheit des Ökosystems fungieren. An der Spitze der Nahrungskette regulieren Prädatoren wie der Kormoran und der Graureiher die darunter liegenden Populationen. Das Verständnis dieser Beziehungen ist entscheidend für die Naturschutzbemühungen der Universität Basel und lokaler Umweltbehörden, um sicherzustellen, dass das gesamte Nahrungsnetz stabil bleibt, selbst wenn einzelne Glieder – wie benthische Invertebraten – durch Umweltbelastungen oder invasive Arten wie die Quagga-Muschel gestört werden.",
            energy_pyramid: "In den Feuchtgebieten der Petite Camargue Alsacienne, direkt hinter der Basler Grenze, veranschaulicht die Energiepyramide das fundamentale thermodynamische Gesetz der Ökologie. Gemäß der 10%-Regel werden nur etwa zehn Prozent der als Biomasse gespeicherten Energie von einer trophischen Ebene an die nächste weitergegeben. Dieser dramatische Energieverlust bei jedem Schritt erklärt, warum die Landschaft von üppiger Vegetation (Produzenten) sowie einer hohen Anzahl von Insekten und kleinen Fischen dominiert wird, während Spitzenprädatoren wie der Luchs oder große Greifvögel relativ selten bleiben. Diese energetische Einschränkung begrenzt die Anzahl der möglichen trophischen Ebenen auf typischerweise vier oder fünf. Basler Forscher nutzen diese Modelle, um die 'Tragfähigkeit' lokaler Naturschutzgebiete zu berechnen. Durch die Überwachung der Biomasse der Primärproduzenten können Wissenschaftler am Biozentrum vorhersagen, wie viele Konsumenten höherer Ebenen das Ökosystem nachhaltig unterstützen kann.",
            carbon_cycle: "Der globale Kohlenstoffkreislauf findet in den städtischen Wäldern und Parks von Basel, wie dem Hardwald und den Langen Erlen, einen lokalen Rhythmus. Durch Photosynthese absorbieren die ausgedehnten Buchen- und Eichenbestände Basels atmosphärisches Kohlendioxid und speichern es als organischen Kohlenstoff in Holz und Boden. Dieser Prozess der Kohlenstoff-Sequestrierung spielt eine entscheidende Rolle in der Klimastrophie der Stadt Basel, um Netto-Null-Emissionen zu erreichen. Im Gegenzug setzen die Zellatmung von Tieren, Menschen und Destruenten im Boden CO2 wieder in die Atmosphäre frei. Der Kreislauf wird zudem durch den Rhein beeinflusst, der gelösten organischen Kohlenstoff aus den Schweizer Alpen transportiert. Die Verwaltung dieser 'Kohlenstoffsenken' hat für das Basler Umweltdepartement Priorität. Durch den Schutz alter Baumbestände und die Förderung einer nachhaltigen städtischen Forstwirtschaft erhält die Stadt ein natürliches Gleichgewicht, das den urbanen Hitzeinseleffekt mildert und ein stabiles Klima fördert.",
            nitrogen_cycle: "Der Stickstoffkreislauf in den landwirtschaftlichen Regionen um Basel, insbesondere im Kanton Basel-Landschaft, ist essentiell für die Nahrungsmittelproduktion und die Bodenqualität. Obwohl Stickstoffgas 78% der Atmosphäre ausmacht, ist er für Pflanzen weitgehend unzugänglich, bis er 'fixiert' wird. In der Natur geschieht dies durch Blitze oder, weitaus bedeutender, durch stickstofffixierende Bakterien in den Wurzelknöllchen von Leguminosen wie Klee und Bohnen. Diese Mikroorganismen wandeln N2 in Ammonium und dann in Nitrate um, welche die Pflanzen für den Aufbau von Proteinen und DNA nutzen können. In der modernen Landwirtschaft der Region Basel wird dieser Kreislauf durch nachhaltige Düngungspraktiken ergänzt, um Nitratauswaschungen in den Rhein zu verhindern, die zu Eutrophierung führen können. Lokale Landwirtschaftsschulen lehren die Bedeutung der Fruchtfolge, um den Boden auf natürliche Weise zu regenerieren und einen robusten landwirtschaftlichen Kreislauf zu unterstützen.",
            water_cycle: "Der Rhein bei Basel dient als massives, sichtbares Segment des globalen Wasserkreislaufs. Wasser gelangt primär als Niederschlag oder Schmelzwasser aus den Schweizer Alpen in dieses lokale System und fließt durch das ikonische Rheinknie der Stadt. Die Sonnenenergie treibt die Verdunstung von der Wasseroberfläche und die Transpiration aus den dichten Wäldern des Juras an, wodurch Feuchtigkeit in die Atmosphäre zurückkehrt. Die IWB (Industrielle Werke Basel) nutzt diesen Kreislauf für die Trinkwasserversorgung der Stadt, indem sie Wasser aus dem Grundwasser der Langen Erlen gewinnt, das natürlich durch den Rhein gespeist wird. Dieser Prozess der Filtration und Infiltration zeigt, wie das Ökosystem Wasser reinigt, während es sich durch die verschiedenen Stadien des Kreislaufs bewegt. Menschliche Aktivitäten, von der Industriekühlung bis zur Schifffahrt, werden sorgfältig verwaltet, um die Integrität des Wasserkreislaufs zu respektieren. Den Rhein sauberzuhalten, ist dabei eine grenzüberschreitende Verantwortung im Rahmen der Internationalen Kommission zum Schutz des Rheins."
        }
    },
    sb2_03: {
        back: "Zurück zum Nexus",
        title: "SB2.03 // GENETISCHE VARIATION",
        difficulty: {
            basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE"
        },
        objective_title: "Aktuelles Missionsziel",
        target_title: "Analyse der genetischen Variation",
        next: "Nächste Sequenz ausführen",
        check: "Prüfen",
        correct: "Verifiziert",
        incorrect: "Abweichung",
        ready: "Bereit",
        monitor_title: "SB2.03_VARIATIONS_MONITOR",
        footer_left: "SB2.03_GENETISCHE_VARIATION // KNOTEN: BASEL",
        stages: {
            monohybrid: "MONOHYBRIDE KREUZUNG",
            probability: "WAHRSCHEINLICHKEIT",
            dihybrid: "DIHYBRIDE KREUZUNG"
        },
        scenarios: {
            monohybrid: "Botanischer Garten Basel - Mendelsche Studie: Sie arbeiten im Botanischen Garten Basel, wo Forscher Gregor Mendels berühmte Experimente mit Erbsenpflanzen replizieren. Durch die Kreuzung von Pflanzen mit unterschiedlichen Merkmalen (wie lila vs. weißen Blüten) untersuchen Sie das Gesetz der Segregation. Jede Pflanze trägt zwei Allele für ein Merkmal, die sich während der Gametenbildung trennen. Ihre Aufgabe ist es, ein Punnett-Quadrat zu verwenden, um die phänotypischen und genotypischen Verhältnisse der Nachkommen einer bestimmten Kreuzung vorherzusagen. Das Verständnis dieser grundlegenden Vererbungsmuster ist die Basis für die gesamte moderne Genetik und Landwirtschaft in der Schweiz.",
            probability: "Universität Basel - Genetisches Forschungslabor: Im High-Tech-Genetiklabor der Universität Basel berechnen Sie die statistische Wahrscheinlichkeit bestimmter genetischer Ergebnisse. Die Genetik ist von Natur aus probabilistisch; wenn zwei heterozygote Eltern (Rr) gekreuzt werden, besteht eine 25%ige Wahrscheinlichkeit für homozygot dominante (RR), eine 50%ige Wahrscheinlichkeit für heterozygote (Rr) und eine 25%ige Wahrscheinlichkeit für homozygot rezessive (rr) Nachkommen. Ihre Aufgabe ist es, die exakte mathematische Wahrscheinlichkeit (Prozentsatz oder Bruch) zu bestimmen, mit der ein zufälliger Nachkomme einen bestimmten Genotyp oder Phänotyp aufweist. Diese Präzision ist entscheidend für die klinische Genetik und das Verständnis von Erbkrankheiten.",
            dihybrid: "Syngenta Gewächshaus - Analyse komplexer Merkmale: Im Forschungsgewächshaus von Syngenta in Basel analysieren Sie die Vererbung von zwei unabhängigen Merkmalen gleichzeitig, wie z. B. Samenform (rund/runzelig) und Samenfarbe (gelb/grün). Dies folgt Mendels Gesetz der unabhängigen Sortierung, das besagt, dass Allele für verschiedene Merkmale unabhängig voneinander auf die Gameten verteilt werden. Eine dihybride Kreuzung zwischen zwei Doppel-Heterozygoten (RrYy x RrYy) führt typischerweise zu einem phänotypischen Verhältnis von 9:3:3:1. Ihre Aufgabe ist es, das komplexe Ergebnis dieser genetischen Kreuzungen zu berechnen, eine Fähigkeit, die für die Entwicklung neuer resistenter Nutzpflanzensorten unerlässlich ist."
        },
        labels: {
            parent: "Elternteil",
            offspring: "Nachkomme",
            punnett_square: "PUNNETT-QUADRAT",
            stats: "STATISTIK DER NACHKOMMEN",
            genotype_ratio: "Genotyp-Verhältnis",
            phenotype_ratio: "Phänotyp-Verhältnis",
            purple_flowers: "Lila Blüten",
            white_flowers: "Weiße Blüten",
            genetics_basics: "GRUNDLAGEN DER GENETIK",
            instructions: "ANWEISUNGEN",
            prediction: "Phänotyp-Vorhersage",
            analysis: "Genetische Analyse",
            hint: "Genetik-Hinweis"
        },
        results: {
            valid: "Sequenz Validiert",
            invalid: "Genetische Drift",
            valid_desc: "Mendelsche Verhältnisse bestätigt.",
            invalid_desc: "Wahrscheinlichkeitsmatrix neu berechnen.",
            next: "Nächstes Präparat",
            analysis: "Phänotyp-Vorhersage"
        },
        prompts: {
            monohybrid_ratio: "Kreuzung {p1} \\times {p2}. Wie ist das phänotypische Verhältnis?",
            monohybrid_percent: "Kreuzung {p1} \\times {p2}. Wie viel Prozent der Nachkommen werden dominant sein?",
            prob_genotype: "Kreuzung {p1} \\times {p2}. Wie hoch ist die Wahrscheinlichkeit für einen {genotype} Nachkommen?",
            ratio_target: "\\text{Verhältnis} = ?",
            percent_target: "\\text{Prozentanteil}",
            prob_target: "P({genotype}) = ?",
            hint_square: "Überprüfe das Punnett-Quadrat.",
            hint_all_rr: "Alle Nachkommen sind Rr.",
            hint_count: "{count} von 4 Quadraten."
        }
    },
};
