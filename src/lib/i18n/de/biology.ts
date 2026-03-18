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
        placeholders: {
            yes: "yes",
            positive: "positive",
                    question: "?",
            v_0_dot_0125: "0.0125",
            v_0_dot_995: "0.995",
            v_0_dot_286: "0.286",
            v_0_dot_01: "0.01",
            v_0_dot_1: "0.1",
            v_1: "1",
            v_0_dot_002: "0.002",
            v_100: "100",
            v_0_dot_005: "0.005",
            v_0_dot_001: "0.001",
            v_0_dot_95: "0.95",
            v_200: "200",
            v_0_dot_25: "0.25",
            v_0_dot_2: "0.2",
            v_2: "2",
            v_4_dot_5: "4.5",
            v_3_dot_75: "3.75",
            v_5730: "5730",
            v_4: "4",
            v_0_dot_0001: "0.0001",
            v_0_dot_368: "0.368",
            v_173: "173",
            v_0_dot_693: "0.693",
            v_1100: "1100",
            v_0_dot_3: "0.3",
            v_95: "95"
},
        prompts: {
            natural_selection: "In einer Population von {initial} Finken überleben {survival} die Dürre. Berechne die Fitness.",
            speciation: "Nach {generations} Generationen mit Mutationsrate {rate}, berechne die genetische Divergenz.",
            evidence: "Ein Fossil ist {age} Jahre alt. Mit C-14 Halbwertszeit {halflife} Jahre, finde den verbleibenden Anteil.",
            hint_fitness: "Fitness = Überlebende / Anfangspopulation",
            hint_divergence: "Divergenz = Generationen × Mutationsrate",
            hint_halflife: "Verbleibend = (0.5)^(Alter/Halbwertszeit)",
            fitness_calc: "Population: {init} Individuen, {surv} überlebt. Relative Fitness w?",
            hardy_p: "Hardy-Weinberg: Allelfrequenz p = {p}. Heterozygotie 2pq berechnen.",
            hardy_q: "Hardy-Weinberg: q² = {q2}. Allelfrequenz q berechnen.",
            drift_time: "Genetische Drift: effektive Populationsgröße N = {N}. Fixationszeit t (in Generationen)?",
            mutation_div: "Mutationsrate u = {u} pro Generation. Genetische Divergenz D berechnen.",
            decay_age: "Radiometrische Datierung: verbleibender Anteil f = {f}, Halbwertszeit h = {h} Jahre. Alter A?",
            common_ancestor: "Divergenz D = {n}, Substitutionsrate r = {r}. Zeit bis zum gemeinsamen Vorfahren T?",
            ns_c3: "Anfang 100, Überleben 100. Selektionskoeffizient s?",
            ns_c4: "Anfang 100, Überleben 80. Selektionskoeffizient s berechnen.",
            ns_c5: "Anfang 20, Überleben 10. Selektionskoeffizient s berechnen.",
            ns_e1: "Selektion s=0,1 gegen Rezessive. p=0,5, q=0,5. Δp ≈ spq²?",
            ns_e3: "Fitness wAA=1, wAa=1, waa=0,5. q=0,1. Mittlere Fitness W = 1 − sq²?",
            ns_e4: "Heterozygotenvorteil: wAA=0,8, wAa=1, waa=0,5. Gleichgewichts-q?",
            ns_e5: "Mutations-Selektions-Gleichgewicht: u=1e-5, s=0,1. q = √(u/s)?",
            sp_b1: "100 Generationen, Mutationsrate 0,001. Genetische Divergenz D?",
            sp_b2: "500 Generationen, Mutationsrate 0,002. Divergenz D?",
            sp_b3: "1000 Generationen, Mutationsrate 1×10⁻⁴. Divergenz D?",
            sp_b4: "Divergenz D=0,2, 100 Generationen vergangen. Mutationsrate u?",
            sp_b5: "Mutationsrate 0,01 pro Generation. Generationen bis D=1?",
            sp_c4: "Genetische Drift: Fixationswahrscheinlichkeit einer neuen Mutation. N=100, P = 1/2N. P?",
            sp_c5: "N=500. Fixationswahrscheinlichkeit einer neuen Mutation?",
            sp_a4: "Flaschenhalseffekt: N sinkt auf 10. Heterozygotie-Erhaltungsfaktor (1 − 1/2N)?",
            sp_a5: "Effektive Populationsgröße: Nm=100, Nf=100. Ne = 4NmNf/(Nm+Nf)?",
            sp_e1: "Drift vs. Selektion: s=0,01, N=10. Ns=0,1 < 1. Dominiert Drift?",
            sp_e2: "Gründereffekt: k=1 Individuum, p=0,5. Allelverlustwahr­scheinlichkeit (1−p)^{2k}?",
            sp_e3: "Fst-Index: Ht=0,5, Hs=0,4. Fst = (Ht−Hs)/Ht?",
            sp_e4: "Koaleszenzzeit: k=2 Linien. Erwartete Zeit = 4N / k(k−1). Koeffizient?",
            sp_e5: "Neutralitätstheorie: Substitutionsrate gleich Mutationsrate u?",
            ev_c1: "Uran-238 / Blei-206-Datierung. Halbwertszeit 4,5 Ga. Mutter:Tochter = 1:1. Alter (Ga)?",
            ev_c2: "Mutter:Tochter = 1:3 (25 % Mutter verbleibend). Alter in Halbwertszeiten?",
            ev_c3: "K-Ar-Datierung. Halbwertszeit 1,25 Ga. 12,5 % K verbleibend. Alter (Ga)?",
            ev_c4: "Kohlenstoff-14. 50 % verbleibend. Halbwertszeit 5730 Jahre. Alter = 1 Halbwertszeit?",
            ev_c5: "Kohlenstoff-14. 6,25 % verbleibend. Wie viele Halbwertszeiten?",
            ev_a1: "Zerfallskonstante λ = 0,693 / T½. T½ = 6930. λ berechnen.",
            ev_a2: "N(t) = N₀ e^{−λt}. t = 1/λ. Verbleibender Anteil?",
            ev_a3: "30 % verbleibend. Halbwertszeit 100 Jahre. Alter = −100 × log₂(0,3)?",
            ev_a4: "Isochron-Datierung: Steigung m = e^{λt} − 1, m=1. λt berechnen.",
            ev_a5: "Kohlenstoffreservoir-Schwankung: Korrekturfaktor 10 %. Scheinbares Alter 1000 Jahre → korrigiertes Alter?",
            ev_e1: "Molekulare Phylogenie: Jukes-Cantor-Distanz K = −0,75 ln(1 − 4p/3). p=0,25. K?",
            ev_e2: "Kimura-Zwei-Parameter-Modell: Transition/Transversion-Verhältnis R=2. Bias-Wert?",
            ev_e3: "Synonyme (dS) vs. nicht-synonyme (dN) Substitutionsraten. dN/dS > 1. Selektionstyp?",
            ev_e4: "Maximale Parsimonie: Baum A 10 Minimaländerungen, Baum B 12. Baum A bevorzugen?",
            ev_e5: "Bootstrap-Unterstützung: 95 von 100 Replikaten. Konfidenzwert?"
        },
        feedback: {
            correct: "Natürliche Selektion bestätigt!",
            incorrect: "Evolution braucht mehr Zeit..."
        },
        check: "Überprüfen",
        next: "Nächste Generation",
        correct: "Korrekt",
        incorrect: "Falsch",
        scenarios: {
            galapagos_study: "Naturhistorisches Museum Basel - Das Darwin-Erbe: Sie sind Kurator am Naturhistorischen Museum Basel, das eine der bedeutendsten Sammlungen biologischer Präparate in der Schweiz beherbergt. Ihre Aufgabe ist es, historische Daten von mehreren Inseln zu analysieren, die die Beobachtungen von Charles Darwin auf den Galapagos-Inseln widerspiegeln. Durch die Berechnung der Fitness verschiedener Vogelpopulationen basierend auf Überlebensraten während extremer Umweltveränderungen helfen Sie, die Kraft der natürlichen Selektion zu demonstrieren. In Basel nutzen Wissenschaftler diese Museumsunterlagen, um zu verstehen, wie sich regionale Arten, wie lokale Käfer und Vögel, als Reaktion auf die Urbanisierung in den letzten zwei Jahrhunderten entwickelt haben. Diese Arbeit ist wie das Aufdecken der verborgenen Zahnräder der Natur, um zu sehen, wie kleine strukturelle Veränderungen zu massiven Überlebensvorteilen führen.",
            genetic_drift: "Biozentrum Basel - Populationsdynamik: Als Forscher am Biozentrum der Universität Basel untersuchen Sie die genetische Ausstattung isolierter Populationen im nahe gelegenen Jura. Genetische Drift – die zufällige Änderung der Allelfrequenzen – kann über viele Generationen hinweg zu einer signifikanten Divergenz in kleinen Gruppen führen. Durch die Modellierung dieser Prozesse helfen Sie vorherzusagen, wie sich gefährdete Arten im Schweizer Grenzgebiet an die Habitatfragmentierung anpassen könnten. Die lange Geschichte Basels in der Genetikforschung, die bis zur Entdeckung der Nukleinsäuren im 19. Jahrhundert zurückreicht, bietet ein erstklassiges Umfeld für Ihre Studie. Es ist, als würde man die Entwicklung einer Sprache in einem abgelegenen Tal beobachten; mit der Zeit ändert sich der 'Akzent' des Genoms, bis ein neuer Spezies-'Dialekt' entsteht.",
            fossil_record: "Oberrheintal - Subtropische Vergangenheit: Sie sind Paläontologe und graben am Rheinufer bei Basel, wo Sie die Überreste von Nashörnern und anderen Tieren entdeckt haben, die Europa nicht mehr bewohnen. Diese Fossilien sind Beweise für ein ganz anderes Klima, das vor Millionen von Jahren in Basel herrschte. Durch den Einsatz isotopischer Techniken zur Bestimmung der Ära dieser Proben helfen Sie dem Naturhistorischen Museum zu zeigen, dass Basels aktuelle Biodiversität nur eine Momentaufnahme in einer riesigen, sich bewegenden Zeitlinie der Evolution ist. Es ist, als würde man ein altes Foto seiner Stadt finden und erkennen, dass das, was heute ein gemäßigtes Flusstal ist, einst eine üppige, subtropische Savanne war.",
            molecular_clock: "Friedrich Miescher Institut (FMI) - Das Timing des Lebens: Am FMI in Basel nutzen Sie Techniken der molekularen Uhr, um zu schätzen, wann verschiedene Arten einen gemeinsamen Vorfahren hatten. Durch die Analyse der Mutationsraten in DNA-Sequenzen können Sie die Evolutionsgeschichte der lokalen Fauna Basels über Millionen von Jahren zurückverfolgen. Diese Arbeit ehrt das Erbe von Friedrich Miescher, der die DNA in Basel entdeckte, und hält die Stadt an der Spitze der evolutionären Genomik. Es ist wie die Verwendung einer Zeitlupen-Uhr, bei der jeder 'Tick' eine Mutation und jede 'Stunde' eine Million Jahre Naturgeschichte ist."
        }
    },
    gb2_01: {
        placeholders: {
            ellipsis: "...",
            v_0: "0"
        },
        back: "Zurück zum Nexus",
        title: "GB2.01 // NEUROBIOLOGIE",
        difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
        objective_title: "Aktuelles Missionsziel",
        monitor_title: "Monitor für neuronale Aktivität",
        check: "Überprüfen",
        next: "Nächster Impuls",
        correct: "Signal übertragen",
        incorrect: "Synaptisches Versagen",
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
            hint_sodium: "Natrium (Na^+) strömt während der Depolarisation ein.",
            hint_calcium: "Calciumeinstrom (Ca^{2}^+) löst die Vesikelfusion aus.",
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
            roche_neuroscience: "Roche Pharma Research - Abteilung für Neurodegeneration & Seltene Krankheiten: Sie sind leitender Neurowissenschaftler am Basler Hauptsitz von Roche und arbeiten an Behandlungen der nächsten Generation für Alzheimer und Parkinson. Ihr Team verwendet Patch-Clamp-Elektrophysiologie, um zu messen, wie experimentelle Verbindungen spannungsgesteuerte Natrium- und Kaliumkanäle in kultivierten Hippocampus-Neuronen beeinflussen. Durch Analyse der Kinetik der Aktionspotential-Generierung – Depolarisation (Na^+-Einstrom), Repolarisation (K^+-Ausstrom) und Hyperpolarisation – identifizieren Sie Medikamente, die normale neuronale Feuermuster in erkrankten Gehirnen wiederherstellen können. Basels Pharma-Cluster, einschließlich Roche und Novartis, investiert jährlich über CHF 10 Milliarden in F&E, wobei Neurowissenschaften eine strategische Priorität darstellen. Ihre Arbeit baut auf Jahrzehnten Basler Forschung auf, von der Entdeckung der Benzodiazepine bis zu modernen Biologika, die Amyloid-Beta-Plaques angreifen. Diese Präzisions-Neuropharmakologie könnte den 50 Millionen Menschen weltweit mit Demenz helfen.",
            neural_plasticity: "Universität Basel - Interfakultäre Forschungsplattform Molekulare & Kognitive Neurowissenschaften: An der Schnittstelle zwischen Biozentrum und Psychologischem Institut untersuchen Sie synaptische Plastizitätsmechanismen, die Lernen und Gedächtnis zugrunde liegen. Ihre Forschung konzentriert sich auf Langzeitpotenzierung (LTP) in hippocampalen CA1-Neuronen, wo hochfrequente Stimulation (100 Hz) synaptische Verbindungen durch NMDA-Rezeptor-Aktivierung und kalziumabhängige Signalkaskaden verstärkt. Mit Ganzzell-Patch-Clamp-Aufzeichnungen messen Sie exzitatorische postsynaptische Potentiale (EPSPs) und verfolgen, wie wiederholte Stimulation die AMPA-Rezeptordichte an der postsynaptischen Membran erhöht. Diese Arbeit hat direkte Anwendungen für das Verständnis altersbedingten kognitiven Abbaus und die Entwicklung kognitiver Verbesserungsstrategien. Basels einzigartige interdisziplinäre Umgebung, die Molekularbiologie mit kognitiven Neurowissenschaften verbindet, macht es zu einem europäischen Zentrum für translationale Hirnforschung. Die Memory Clinic des Universitätsspitals arbeitet eng mit Ihrem Labor zusammen, um Erkenntnisse in klinische Interventionen zu übersetzen.",
            friedrich_miescher: "Friedrich Miescher Institut für Biomedizinische Forschung (FMI) - Neuronale Entwicklung & Epigenetik: Am FMI, einem von Novartis finanzierten Forschungsinstitut, arbeiten Sie daran zu verstehen, wie sich neuronale Schaltkreise während der Entwicklung selbst zusammensetzen. Ihr Projekt untersucht die Rolle der Kalziumsignalisierung bei der Neurotransmitter-Freisetzung an der neuromuskulären Endplatte. Mit fluoreszierenden Kalziumindikatoren und Hochgeschwindigkeits-Bildgebung visualisieren Sie, wie Ca^{2}^+-Einstrom durch spannungsgesteuerte Kalziumkanäle die Fusion synaptischer Vesikel auslöst und Acetylcholin in den synaptischen Spalt (20-40 nm breit) freisetzt. Sie messen quantale Freisetzungsereignisse und berechnen die Freisetzungswahrscheinlichkeit unter verschiedenen Stimulationsprotokollen. Diese Grundlagenforschung ehrt Friedrich Mieschers Vermächtnis – er entdeckte 1869 in Basel die DNA, während er weiße Blutzellkerne aus chirurgischen Verbänden am Universitätsspital untersuchte. Heute setzt das FMI diese Tradition bahnbrechender Molekularbiologie fort, mit Erkenntnissen, die die Medikamentenentwicklung bei Roche und Novartis informieren. Das Verständnis synaptischer Übertragung auf molekularer Ebene ist entscheidend für die Behandlung von Myasthenia gravis, Lambert-Eaton-Syndrom und anderen neuromuskulären Erkrankungen."
        },
        feedback: {
            correct: "Aktionspotential-Fortleitung erfolgreich verifiziert!",
            incorrect: "Das Signal ging verloren. Überprüfen Sie den neuronalen Mechanismus."
        }
    },
    gb3_01: {
        placeholders: {
            ellipsis: "...",
            v_2_minus_3: "2-3"
        },
        back: "Zurück zum Nexus",
        title: "GB3.01 // DNA-SCHMIEDE",
        difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
        objective_title: "Aktuelles Missionsziel",
        target_title: "DNA-Struktur",
        next: "Nächste Sequenz",
        check: "Überprüfen",
        correct: "Verifiziert",
        incorrect: "Fehlersignal",
        monitor_title: "GB3.01_DNA_MONITOR",
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
        placeholders: {
            ellipsis: "..."
        },
        back: "Zurück zum Nexus",
        title: "GB3.02 // IMMUNOLOGIE-LABOR",
        difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
        objective_title: "Aktuelles Missionsziel",
        monitor_title: "Monitor für Immunantwort",
        check: "Überprüfen",
        next: "Nächste Herausforderung",
        correct: "Antigen neutralisiert",
        incorrect: "Erreger entkommen",
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
    gb2_02: {
        placeholders: {
            ellipsis: "...",
            select: "Auswählen...",
            answer: "Antwort eingeben...",
            hormone_type: "Hormontyp wählen...",
            gland: "Drüse wählen..."
        },
        back: "Zurück zum Nexus",
        title: "GB2.02 // ENDOKRINES SYSTEM",
        difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
        check: "Überprüfen",
        next: "Nächste Aufgabe",
        correct: "Richtig",
        incorrect: "Falsch",
        stages: {
            hormone_identification: "HORMONIDENTIFIKATION",
            feedback_mechanisms: "RÜCKKOPPLUNGSMECHANISMEN",
            clinical_applications: "KLINISCHE ANWENDUNGEN"
        },
        labels: {
            objective: "ZIEL:",
            slot_hormone_type: "Hormontyp:",
            slot_producing_gland: "Produzierende Drüse:",
            slot_primary_function: "Hauptfunktion:",
            slot_hypothalamic_hormone: "Hypothalamisches Hormon:",
            slot_hormone_therapy: "Hormontherapie:",
            slot_feedback_type: "Rückkopplungstyp:",
            slot_mechanism: "Mechanismus:",
            slot_diagnosis: "Diagnose:"
        },
        options: {
            peptide: "Peptid",
            steroid: "Steroid",
            amino_acid_derived: "Aminosäure-abgeleitet",
            pancreas: "Pankreas",
            pituitary: "Hypophyse",
            thyroid: "Schilddrüse",
            adrenal_cortex: "Nebennierenrinde",
            negative: "Negativ",
            positive: "Positiv",
            diabetes_mellitus: "Diabetes mellitus",
            hypothyroidism: "Hypothyreose",
            hyperthyroidism: "Hyperthyreose",
            addisons_disease: "Morbus Addison"
        },
        prompts: {
            classify_hormone_structure: "Im Universitätsspital Basel steht auf einer Labor-Karte das Hormon {hormone}. Klassifizieren Sie seine chemische Struktur, damit das Team den richtigen Rezeptorweg und den nächsten Test wählen kann.",
            identify_insulin_gland: "Bei einer Basler Diabetes-Abklärung muss die Insulinquelle bestätigt werden. Bestimmen Sie die produzierende Drüse, damit die Therapieplanung korrekt bleibt.",
            primary_function_of: "In der Patientenakte ist {hormone} hervorgehoben. Nennen Sie die primäre Funktion, um das Symptommuster zu erklären und die Intervention zu steuern.",
            regulates_secretion_of: "In der neuroendokrinen Einheit ist die Sekretion von {hormone} auffällig. Bestimmen Sie den hypothalamischen Regulator, damit der Kontrollfehler lokalisiert werden kann.",
            therapy_for_disorder: "Für einen Basler endokrinen Fall mit Diagnose {disorder} wählen Sie die passende pharmazeutische Hormontherapie, damit das Team das korrekte Protokoll starten kann.",
            identify_feedback_type: "Prüfen Sie diesen Regelkreis im Basler Laborbericht: {description}. Bestimmen Sie den Rückkopplungstyp, um die Hormonentwicklung vorherzusagen.",
            analyze_feedback_mechanism: "Analysieren Sie den beschriebenen endokrinen Rückkopplungsmechanismus und bestimmen Sie die Steuerlogik, damit das Team die Stabilität der Regulation bewerten kann.",
            clinical_diagnosis_from_case: "Ein Basler Patientenfall enthält Symptome und Laborwerte. Bestimmen Sie die wahrscheinlichste Diagnose, damit die Behandlung ohne Verzögerung beginnen kann.",
            identify_endocrine_disorder: "Identifizieren Sie anhand der endokrinen Fallzusammenfassung die Störung, damit der Arzt Bestätigungstests und zielgerichtete Therapie einleiten kann.",
            analyze_clinical_case: "Analysieren Sie den vollständigen klinischen Fall und liefern Sie die zentrale endokrine Schlussfolgerung für das unmittelbare Management."
        },
        builder: {
            default_scenario_title: "Basler Endokrinologie-Forschung",
            default_scenario_description: "Erkunden Sie das endokrine System im Kontext von Basels pharmazeutischer und medizinischer Forschung.",
            quest_meta: {
                titles: {
                    hormone_classification: "Hormonklassifikation",
                    gland_identification: "Drüsenidentifikation",
                    hormone_function: "Hormonfunktion",
                    hypothalamic_pituitary_axis: "Hypothalamus-Hypophysen-Achse",
                    hormone_therapy: "Hormontherapie",
                    feedback_mechanisms: "Rückkopplungsmechanismen",
                    feedback_analysis: "Rückkopplungsanalyse",
                    clinical_diagnosis: "Klinische Diagnose",
                    clinical_analysis: "Klinische Analyse"
                },
                descriptions: {
                    identify_hormone_types: "Hormontypen identifizieren",
                    identify_hormone_producing_glands: "Hormonproduzierende Drüsen identifizieren",
                    identify_hormone_functions: "Hormonfunktionen identifizieren",
                    understand_hormone_regulation: "Hormonregulation verstehen",
                    pharmaceutical_applications: "Pharmazeutische Anwendungen",
                    identify_feedback_types: "Rückkopplungstypen identifizieren",
                    analyze_feedback_loops: "Rückkopplungsschleifen analysieren",
                    diagnose_endocrine_disorders: "Endokrine Störungen diagnostizieren",
                    complex_case_analysis: "Analyse komplexer Fälle"
                },
                concepts: {
                    endocrine_system: "Endokrines System"
                }
            },
            contexts: {
                roche_diagnostics_basel: "Bei Roche Diagnostics Basel entwickeln Forschende fortschrittliche Blutzucker-Monitoringsysteme für die endokrine Versorgung.",
                novartis_endocrinology_lab_basel: "Im endokrinologischen Forschungslabor von Novartis in Basel steuert die Hormonklassifikation die Entwicklung von Rezeptorweg-Therapien.",
                basel_thyroid_clinic: "In der Schilddrüsenklinik des Universitätsspitals Basel bestimmt die Hormonidentität die diagnostische Einordnung und Therapie.",
                basel_diabetes_center: "Im Diabeteszentrum des Universitätsspitals Basel unterstützt die Identifikation der produzierenden Drüse ein präzises Insulinmanagement.",
                basel_emergency_medicine_research: "Im Basler Zentrum für Notfallmedizin-Forschung hilft die schnelle Hormonerkennung, akute Stressreaktionen zu erklären.",
                basel_endocrinology_clinic: "In der endokrinologischen Klinik des Universitätsspitals Basel werden Hormonfunktionen genutzt, um Symptome mit der Physiologie zu verknüpfen.",
                basel_neuroendocrinology_unit: "In der neuroendokrinologischen Einheit des Universitätsspitals Basel werden hypothalamische Steuerwege kartiert, um Regulationsfehler zu lokalisieren.",
                roche_basel_pharmaceutical_production: "In der pharmazeutischen Produktionsanlage von Roche Basel werden endokrine Therapien den passenden Erkrankungen zugeordnet.",
                novartis_basel_pharmaceutical_production: "In der pharmazeutischen Produktionsanlage von Novartis Basel werden endokrine Therapien gezielt nach klinischer Indikation ausgewählt.",
                basel_endocrinology_research_institute: "Am Basler Institut für Endokrinologie-Forschung werden Rückkopplungsschleifen modelliert, um hormonelle Stabilität vorherzusagen.",
                basel_university_hospital: "Am Universitätsspital Basel verbinden endokrine Fälle Symptome, Laborwerte und Regulationslogik zur Diagnose.",
                basel_advanced_endocrinology_unit: "In der erweiterten Endokrinologie-Einheit des Universitätsspitals Basel erfordern komplexe Fälle eine integrierte Analyse."
            },
            formulas: {
                type_target: "Typ: ?",
                gland_target: "Drüse: ?",
                function_target: "Funktion: ?",
                hypothalamic_hormone_target: "Hypothalamisches Hormon: ?",
                therapy_target: "Therapie: ?",
                feedback_type_target: "Rückkopplungstyp: ?",
                analysis_target: "Analyse: ?",
                diagnosis_target: "Diagnose: ?",
                clinical_case: "Klinischer Fall",
                feedback_loop: "Rückkopplungsschleife",
                disorder: "Störung"
            },
            answers: {
                peptide: "Peptid",
                steroid: "Steroid",
                amino_acid_derived: "aminosäure-abgeleitet",
                pancreas: "Pankreas",
                negative: "negativ",
                feedback_analysis: "Rückkopplungsanalyse",
                disorder_name: "Name der Störung",
                diagnosis: "Diagnose"
            },
            feedback_descriptions: {
                blood_glucose_regulation_insulin: "Blutzuckerregulation über Insulin",
                blood_glucose_regulation_glucagon: "Blutzuckerregulation über Glukagon",
                thyroid_hormone_regulation_hpt_axis: "Schilddrüsenhormon-Regulation über die Hypothalamus-Hypophysen-Schilddrüsen-Achse",
                stress_response_hpa_axis: "Stressreaktion über die Hypothalamus-Hypophysen-Nebennieren-Achse",
                calcium_regulation_parathyroid_hormone: "Kalziumregulation über Parathormon",
                water_balance_regulation_adh: "Wasserhaushaltsregulation über ADH",
                oxytocin_positive_feedback_childbirth: "Oxytocin-Positive-Rückkopplung während der Geburt",
                lh_surge_positive_feedback_ovulation: "Positive Rückkopplung des LH-Anstiegs während des Eisprungs"
            }
        }
    },
    sb1_01: {
        placeholders: {
            ellipsis: "..."
        },
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
        monitor_title: "SB1.01_ZELL_MONITOR",
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
        expressions: {
            size_label: "Größe:",
            function_label: "Funktion:"
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
        monitor_title: "SB1.01_METABOLIC_MONITOR",
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
        placeholders: {
            enter_leave_stable: "enter/leave/stable",
                    ellipsis: "..."
},
        prompts: {
            osmosis_prompt: "Die Zelle befindet sich in einer {status} Umgebung ({desc}). Was passiert mit dem Wasser?",
            respiration_prompt: "Vervollständigen Sie den Reaktanten: C_6H_1_2O_6 + 6{reactant} → ...",
            product_prompt: "Was ist das primäre Energieprodukt der Zellatmung?",
            homeostasis_target: "Gleichen Sie die Umgebung aus, um den isotonischen Zustand zu erreichen.",
            hint_hyper: "Hoher Salzgehalt außen! Wasser verlässt die Zelle.",
            hint_hypo: "Niedriger Salzgehalt außen! Wasser strömt ein.",
            hint_oxy: "Wir atmen dies ein, um Glukose zu verbrennen.",
            hint_iso: "Keine Nettobewegung.",
            hint_atp: "Primäre Energiewährung der Zelle.",
            hint_homeostasis: "Setzen Sie den Wert auf Null für Stabilität.",
            resp_atp_product: "ATP — Adenosintriphosphat",
            resp_glucose_input: "C₆H₁₂O₆ — Glukose (1 Molekül pro Reaktionszyklus)",
            resp_oxygen_input: "O₂ — 6 Moleküle pro Glukosemolekül",
            resp_co2_product: "CO₂ — Kohlenstoffdioxid, entsteht im Zitratzyklus",
            resp_water_product: "H₂O — Wasser, entsteht in der Atmungskette wenn H⁺ auf O₂ trifft",
            resp_atp_count: "~30–32 ATP — Gesamtausbeute aerober Zellatmung pro Glukose",
            resp_glycolysis_atp: "2 ATP (netto) — Glykolyse",
            resp_krebs_atp: "2 ATP (als GTP) — Zitratzyklus, pro Glukosemolekül",
            resp_etc_atp: "~25 ATP — produziert durch die Elektronentransportkette",
            resp_nadh_count: "10 NADH — gesamt pro Glukose (2 Glykolyse + 8 Zitratzyklus)",
            resp_nadh_atp: "NADH → ~2,5 ATP (über ETC)",
            resp_fadh2_atp: "FADH₂ → ~1,5 ATP (über ETC)",
            resp_glycolysis_location: "Zytoplasma (Zytosol)",
            resp_krebs_location: "Mitochondrienmatrix",
            resp_etc_location: "Innere Mitochondrienmembran",
            resp_proton_gradient: "H⁺-Gradient — über die innere Mitochondrienmembran, treibt ATP-Synthase",
            resp_atp_synthase: "ATP-Synthase — Komplex V; nutzt H⁺-Gradient zur ATP-Synthese",
            resp_final_acceptor: "O₂ — molekularer Sauerstoff, finaler Elektronenakzeptor",
            resp_anaerobic_atp: "2 ATP (netto) — anaerobe Glykolyse, ohne O₂",
            resp_fermentation_product: "Laktat (Milchsäuregärung) oder Ethanol + CO₂ (alkoholische Gärung)",
            home_body_temp: "Körpertemperaturregulation — Sollwert: 37 °C",
            home_blood_ph: "Blut-pH-Homöostase — Normalbereich: 7,35–7,45",
            home_blood_glucose: "Blutzuckerregulation — Normalwert: 4–6 mmol/L",
            home_heart_rate: "Herzfrequenzregulation — durch Sympathikus und Parasympathikus",
            home_blood_pressure: "Blutdruckregulation — Normalwert: 120/80 mmHg",
            home_insulin_effect: "Insulin — senkt Blutzucker durch Förderung der zellulären Glukoseaufnahme (aus Beta-Zellen)",
            home_glucagon_effect: "Glukagon — erhöht Blutzucker durch Glykogenolyse (aus Alpha-Zellen des Pankreas)",
            home_sweat_response: "Schwitzen — evaporative Wärmeabgabe zur Körperkühlung",
            home_shiver_response: "Kältezittern — thermogene Muskelaktivität zur Körpererwärmung",
            home_kidney_function: "Nierenfunktion — Filtration, Rückresorption, Sekretion; reguliert Wasser und pH",
            home_negative_feedback: "Negative Rückkopplung — Regelkreismechanismus zur Aufrechterhaltung der Homöostase",
            home_set_point: "Sollwert — physiologischer Normalzielwert des Regelkreises",
            home_receptor_type: "Rezeptor / Sensor — misst den Istwert und meldet Abweichungen vom Sollwert",
            home_effector_organ: "Effektororgan — führt korrigierende Reaktion aus (z. B. Muskel, Schweissdrüse)",
            home_control_center: "Kontrollzentrum — verarbeitet Signale und koordiniert Reaktionen (z. B. Hypothalamus)",
            home_adh_function: "ADH (Antidiuretisches Hormon) – erhöht Wasserrückresorption in der Niere",
            home_aldosterone_function: "Aldosteron – fördert Na⁺-Rückresorption und K⁺-Ausscheidung",
            home_parathyroid_function: "Parathormon (PTH) — erhöht Blutkalzium durch Knochen, Niere und Darm",
            home_thyroid_function: "Schilddrüsenhormone (T3/T4) — regulieren Grundumsatz und Wachstum",
            home_cortisol_function: "Cortisol — Stresshormon der Nebennierenrinde, erhöht Blutzucker",
            hint_atp_product: "ATP (Adenosintriphosphat) ist das direkte Energieprodukt der Zellatmung",
            hint_glucose_input: "Ein Glukosemolekül (C₆H₁₂O₆) ist das Ausgangssubstrat der Zellatmung",
            hint_oxygen_input: "O₂ wird als finaler Elektronenakzeptor in der Atmungskette benötigt (6 Moleküle pro Glukose)",
            hint_co2_product: "CO₂ entsteht im Zitratzyklus als Abbauprodukt und wird über die Lunge ausgeatmet",
            hint_water_product: "Bei der Zellatmung entsteht H₂O in der Atmungskette, wenn Elektronen auf O₂ übertragen werden",
            hint_atp_count: "Aerobe Zellatmung liefert insgesamt ca. 30–32 ATP pro Glukosemolekül",
            hint_glycolysis_atp: "Die Glykolyse produziert netto 2 ATP und 2 NADH pro Glukosemolekül",
            hint_krebs_atp: "Der Zitratzyklus liefert 2 ATP (GTP), 6 NADH und 2 FADH₂ pro Glukosemolekül",
            hint_etc_atp: "Die Elektronentransportkette (ETC) erzeugt ca. 25 ATP durch oxidative Phosphorylierung",
            hint_nadh_count: "Glykolyse und Zitratzyklus erzeugen zusammen 10 NADH pro Glukosemolekül",
            hint_nadh_atp: "Jedes NADH liefert durch die ETC ca. 2,5 ATP",
            hint_fadh2_atp: "Jedes FADH₂ liefert durch die ETC ca. 1,5 ATP",
            hint_glycolysis_location: "Die Glykolyse findet im Zytoplasma (Zytosol) statt – ausserhalb der Mitochondrien",
            hint_krebs_location: "Der Zitratzyklus (Krebszyklus) findet in der Mitochondrienmatrix statt",
            hint_etc_location: "Die Elektronentransportkette befindet sich in der inneren Mitochondrienmembran",
            hint_proton_gradient: "Der H⁺-Gradient über die innere Mitochondrienmembran treibt die ATP-Synthase an",
            hint_atp_synthase: "ATP-Synthase nutzt den Protonengradienten an der inneren Membran zur ATP-Produktion",
            hint_final_acceptor: "O₂ (molekularer Sauerstoff) ist der finale Elektronenakzeptor der Atmungskette",
            hint_anaerobic_atp: "Anaerobe Glykolyse produziert netto 2 ATP pro Glukose – ohne O₂",
            hint_fermentation_product: "Milchsäuregärung → Laktat; alkoholische Gärung → Ethanol + CO₂",
            hint_body_temp: "Die menschliche Körperkerntemperatur beträgt ca. 37 °C und wird vom Hypothalamus geregelt",
            hint_blood_ph: "Der normale Blut-pH liegt bei 7,35–7,45; Abweichungen heissen Azidose bzw. Alkalose",
            hint_blood_glucose: "Blutglukose wird durch Insulin (senkend) und Glukagon (erhöhend) reguliert",
            hint_heart_rate: "Die Herzfrequenz wird durch Sympathikus (erhöhend) und Parasympathikus (senkend) reguliert",
            hint_blood_pressure: "Blutdruck wird durch Herzzeitvolumen, Gefässwiderstand und Nierenfunktion reguliert",
            hint_insulin_effect: "Insulin (aus Beta-Zellen) fördert die Glukoseaufnahme in Zellen und senkt den Blutzucker",
            hint_glucagon_effect: "Glukagon (aus Alpha-Zellen) fördert den Glykogenabbau und erhöht so den Blutzucker",
            hint_sweat_response: "Schwitzen kühlt den Körper durch Verdunstungskälte und senkt die Körpertemperatur",
            hint_shiver_response: "Kältezittern erzeugt durch rasche Muskelkontraktionen Wärme und erhöht die Körpertemperatur",
            hint_kidney_function: "Die Niere reguliert Wasserhaushalt, Elektrolyte, pH-Wert und osmotischen Druck",
            hint_negative_feedback: "Negative Rückkopplung reduziert die Abweichung vom Sollwert und stabilisiert das System",
            hint_set_point: "Der Sollwert ist der physiologische Zielwert, den das Homöostasesystem anstrebt",
            hint_receptor_type: "Rezeptoren (Sensoren) messen den Istwert und leiten Signale an das Kontrollzentrum weiter",
            hint_effector_organ: "Das Effektororgan (z. B. Muskel, Drüse) führt die korrigierende Reaktion aus",
            hint_control_center: "Das Kontrollzentrum (z. B. Hypothalamus) verarbeitet Signale und koordiniert Gegenreaktionen",
            hint_adh_function: "ADH erhöht die Wasserrückresorption in den Nierentubuli",
            hint_aldosterone_function: "Aldosteron fördert die Na⁺-Rückresorption und K⁺-Ausscheidung in der Niere",
            hint_parathyroid_function: "Parathormon (PTH) erhöht den Kalziumspiegel im Blut durch Knochenabbau und Nierenrückresorption",
            hint_thyroid_function: "Schilddrüsenhormone (T3/T4) regulieren Stoffwechselrate, Wachstum und Entwicklung",
            hint_cortisol_function: "Cortisol erhöht den Blutzucker, wirkt entzündungshemmend und ist ein Stresshormon"
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
        placeholders: {
            ellipsis: "..."
        },
        back: "Zurück zum Nexus",
        title: "SB1.02 // PHOTOSYNTHESE-LABOR",
        difficulty: { basic: "GRUNDLAGEN", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
        check: "Prüfen",
        next: "Nächste Sequenz ausführen",
        correct: "Verifiziert",
        incorrect: "Fehlanpassung",
        monitor_title: "SB1.02_PHOTOSYNTHESE_MONITOR",
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
            co2_label: "CO_2",
            temp_label: "Temp"
        },
        prompts: {
            reactant: "Vervollständigen Sie die Gleichung: 6CO_2 + 6H_2O + Licht → C_6H_1_2O_6 + 6{O_2}. Wie viele fehlende Reaktanten?",
            hint_oxygen: "Zählen Sie die Sauerstoffatome auf beiden Seiten der Gleichung",
            glucose: "Wie viele Glucosemoleküle werden aus {co2} CO_2-Molekülen produziert?",
            hint_glucose: "Das Verhältnis von CO_2 zu Glucose beträgt 6:1",
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
        placeholders: {
            ellipsis: "..."
        },
        back: "Zurück zum Nexus",
        title: "SB1.03 // ZELLTEILUNG",
        check: "Prüfen",
        next: "Nächste Phase",
        correct: "Phase Abgeschlossen",
        incorrect: "Fehlausrichtung",
        monitor_title: "SB1.03_REPLIKATIONSZENTRUM",
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
        placeholders: {
            type_answer: "type answer"
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
        monitor_title: "SB1.04_PFLANZEN_MONITOR",
        expressions: {
            structure_label: "Struktur:",
            water_transport_title: "Wassertransportmechanismus",
            nutrient_transport_title: "Nährstofftransport"
        },
        formulas: {
            structure_label: "\\text{Struktur: }",
            water_transport: "\\text{Wassertransportmechanismus}",
            nutrient_transport: "\\text{Nährstofftransport}"
        }
    },

    // SB1.05: Tierklassifikation & Anpassung
    sb1_05: {
        back: "Zurück zum Nexus",
        title: "SB1.05 // TIERKLASSIFIKATION & ANPASSUNG",
        difficulty: {
            basic: "BASIS",
            core: "KERN",
            advanced: "FORTGESCHRITTEN",
            elite: "ELITE"
        },
        stages: {
            animal_classification: "TIERKLASSIFIKATION",
            adaptations: "ANPASSUNGEN",
            behavior_evolution: "VERHALTEN & EVOLUTION"
        },
        placeholders: {
            type_answer: "type answer"
        },
        scenarios: {
            basel_zoo: "Zoo Basel Biodiversitätstour: Sie sind Studentenführer im Zoo Basel (Zolli) und bereiten eine Bildungstour über Tierklassifikation vor. Der Zoo beherbergt über 600 Arten aus allen wichtigen Tiergruppen. Ihre Aufgabe ist es, einen Klassifikationsleitfaden für Besucher zu erstellen. Heute konzentrieren Sie sich auf die Afrikanische Savanne, die Löwen (Panthera leo), Zebras (Equus quagga) und Strauße (Struthio camelus) umfasst. Sie müssen erklären, wie diese Tiere trotz des gleichen Lebensraums in verschiedene Gruppen klassifiziert werden. Das Bildungsprogramm des Zoos betont das Verständnis, dass Klassifikation auf evolutionären Beziehungen und gemeinsamen Merkmalen basiert, nicht nur darauf, wo Tiere leben. Dies hilft Besuchern, die Biodiversität und die Bedeutung von Naturschutzbemühungen zu schätzen. Ihre Aufgabe: Klassifizieren Sie jedes Tier in seine richtige Klasse (Mammalia, Aves oder Reptilia) und erklären Sie die Schlüsselmerkmale, die jede Gruppe definieren. Dieses Wissen hilft Zoobesuchern zu verstehen, warum Naturschutzstrategien die einzigartigen biologischen Bedürfnisse jeder Art basierend auf ihrer Klassifikation berücksichtigen müssen.",
            rhine_river: "Rhein-Ökosystem-Forschung: Sie sind Teil eines Forschungsteams der Universität Basel, das das Rhein-Ökosystem untersucht. Der Rhein fließt durch Basel und unterstützt trotz seiner Rolle als eine der verkehrsreichsten Wasserstraßen Europas vielfältiges aquatisches und Uferlebewesen. Ihr Team dokumentiert, wie verschiedene Tiere sich an das Leben im und am Fluss angepasst haben. Sie vergleichen drei Arten: den Europäischen Aal (Anguilla anguilla), der Tausende von Kilometern wandert, den Graureiher (Ardea cinerea), der in flachem Wasser jagt, und den Europäischen Biber (Castor fiber), der kürzlich wieder eingeführt wurde. Jede Art hat einzigartige Anpassungen an die aquatische Umgebung. Der Aal kann sowohl in Süß- als auch in Salzwasser überleben, der Reiher hat spezialisierte Jagdanpassungen, und der Biber modifiziert seinen Lebensraum durch Dammbau. Ihre Aufgabe: Identifizieren und erklären Sie die spezifischen Anpassungen, die jedes Tier verwendet, um im Rhein-Ökosystem zu überleben, und erklären Sie, wie diese Anpassungen Überlebensvorteile bieten. Das Verständnis dieser Anpassungen hilft, Naturschutzbemühungen zur Erhaltung der Biodiversität im Rhein zu informieren, was für Basels Umweltgesundheit entscheidend ist.",
            alpine_animals: "Schweizer Alpen Biodiversitätsstudie: Sie nehmen an einer Feldstudie über alpine Tiere in den Schweizer Bergen bei Basel teil. Die alpine Umgebung stellt extreme Herausforderungen dar: niedriger Sauerstoff, kalte Temperaturen, steiles Gelände und saisonale Nahrungsknappheit. Ihre Studie konzentriert sich auf drei ikonische Schweizer Alpenarten: den Alpensteinbock (Capra ibex) mit seiner bemerkenswerten Kletterfähigkeit, das Alpenmurmeltier (Marmota marmota), das 6-7 Monate Winterschlaf hält, und den Steinadler (Aquila chrysaetos), der über weite Territorien jagt. Jede Art hat spezifische Anpassungen für das alpine Überleben entwickelt. Der Steinbock hat gespaltene Hufe für Halt auf Felsen, das Murmeltier hat physiologische Anpassungen für den Winterschlaf, und der Adler hat außergewöhnliches Sehvermögen und Fluganpassungen für die Jagd in bergigem Gelände. Ihre Aufgabe: Analysieren Sie, wie die Anpassungen jedes Tieres speziell die Herausforderungen der alpinen Umgebung (niedriger Sauerstoff, Kälte, steiles Gelände, begrenzte Nahrung) bewältigen. Diese Forschung trägt zum Verständnis bei, wie der Klimawandel alpine Arten beeinflusst, und informiert Naturschutzstrategien für die Schweizer Bergökosysteme.",
            wildlife_conservation: "Basel Region Wildtierschutzprojekt: Sie arbeiten mit dem Basler Kantonalen Naturschutzamt an einem Projekt zum Schutz und zur Wiederherstellung lokaler Wildtierpopulationen. Die Region Basel hat im letzten Jahrhundert aufgrund von Urbanisierung und Lebensraumverlust erhebliche Veränderungen in der Tierwelt erlebt. Ihr Projekt konzentriert sich auf drei Naturschutzerfolgsgeschichten: den Europäischen Biber (Castor fiber), der in den 1970er Jahren wieder eingeführt wurde und jetzt gedeiht, den Wanderfalken (Falco peregrinus), der sich an das Nisten auf Basels hohen Gebäuden angepasst hat, und den Europäischen Luchs (Lynx lynx), der langsam in Schweizer Wälder zurückkehrt. Jede Art demonstriert verschiedene Aspekte der Naturschutzbiologie. Der Biber zeigt erfolgreiche Wiedereinführung, der Falke zeigt urbane Anpassung, und der Luchs zeigt natürliche Wiederbesiedlung. Das Verständnis ihrer Verhaltensweisen und evolutionären Anpassungen ist entscheidend für die Naturschutzplanung. Ihre Aufgabe: Analysieren Sie, wie das Verhalten und die Evolutionsgeschichte jeder Art Naturschutzstrategien beeinflussen, und erklären Sie, warum das Verständnis der Evolution für effektives Wildtiermanagement unerlässlich ist. Diese Arbeit trägt direkt zu Basels Biodiversitätszielen bei und zeigt, wie wissenschaftliches Verständnis von Tierverhalten und Evolution reale Naturschutzentscheidungen informiert, die sowohl Wildtieren als auch menschlichen Gemeinschaften zugutekommen."
        },
        objective_title: "Tieranalyse",
        complete: "Modul abgeschlossen!",
        check: "Prüfen",
        next: "Nächste Herausforderung",
        correct: "Klassifikation verifiziert",
        incorrect: "Antwort prüfen",
        loading: "Lädt...",
        monitor_title: "SB1.05_TIER_MONITOR"
    },

    sb2_01_tissues: {
        back: "Zurück zum Nexus",
        title: "SB2.01 // GEWEBE & ORGANE",
        difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
        objective_title: "Aktuelles Missionsziel",
        monitor_title: "Gewebeorganisations-Monitor",
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
        monitor_title: "SB2.01_GENETIK_MONITOR",
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
        monitor_title: "SB2.02_KÖRPERSYSTEME_MONITOR",
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
            enzyme: "Enzym",
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
            trachea: "LUFTRÖHRE",
            reason: "Grund",
            absorption: "Absorption",
            surface_area: "Oberflächenbereich",
            organ: "Organ",
            function: "Funktion",
            result: "Ergebnis",
            process: "Prozess",
            dehydration: "Dehydrierung",
            peristalsis: "Peristaltik",
            body: "Körper",
            support: "Unterstützung",
            diffusion: "Diffusion",
            tree: "Baum",
            pressure: "Druck",
            structure: "Struktur",
            mechanism: "Mechanismus",
            effect: "Wirkung",
            risk: "Risiko",
            organs: "Organe",
            type: "Typ",
            gas: "Gas",
            bp: "BD",
            term: "Begriff",
            co_l_min: "HZV (L/min)",
            property: "Eigenschaft",
            condition: "Zustand",
            node: "Knoten",
            factor: "Faktor",
            response: "Reaktion",
            mv_l_min: "MV (L/min)",
            area_m2: "\\text{Fläche (m}^{2}\\text{)}"
        },
        corrects: {
            carbon_dioxide: "\\text{Kohlendioxid (CO}_2\\text{)}",
            baroreceptors_raas_anp: "\\text{Barorezeptoren, RAAS, ANP}",
            oxygen: "\\text{Sauerstoff (O}_2\\text{)}"
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
        expressions: {
            organs_7: "Organe: 7",
            crohns: "Morbus Crohn",
            lactose_intolerance: "Laktoseintoleranz",
            enteric_nervous: "Enterisches Nervensystem",
            celiac: "Zöliakie",
            blood_vessels: "Blutgefäße",
            gas_exchange: "Gasaustausch",
            atria_ventricles: "2 Vorhöfe + 2 Kammern",
            blood_pressure: "Blutdruck",
            hemoglobin: "Hämoglobin",
            atherosclerosis: "Atherosklerose",
            frank_starling: "Frank-Starling",
            bp_regulation: "BD-Regulation",
            heart_failure: "Herzversagen",
            rest_exercise_co: "Ruhe: 5 L/min, Sport: 25 L/min",
            respiratory_pathway: "Atemweg",
            breathing: "Atmung",
            surfactant: "Surfactant",
            asthma: "Asthma",
            copd: "COPD",
            ph_regulation: "pH-Regulation",
            high_altitude: "Hochaltitude",
            pneumonia: "Pneumonie",
            organ_label: "Organ",
            component_label: "Bestandteil"
        },
        answers: {
            ph_increase: "pH-Anstieg",
            efficiency: "Effizienz",
            more_time_absorption: "Mehr Zeit für Absorption",
            infection_risk: "Infektionsrisiko",
            bacterial_infection: "Bakterielle Infektion",
            metabolism: "Stoffwechsel",
            lactase: "Laktase",
            malabsorption: "Malabsorption",
            comparison: "Vergleich",
            mechanical_chemical: "Mechanisch + Chemisch",
            pulmonary: "Pulmonal",
            pulmonary_circulation: "Lungenkreislauf",
            heart_rate: "Herzfrequenz",
            elasticity: "Elastizität",
            elastic_walls: "Elastische Wände dämpfen Druck",
            varicose_veins: "Krampfadern",
            sa_node: "SA-Knoten",
            sa_node_full: "SA-Knoten (Sinusknoten)",
            heart_attack: "Herzinfarkt",
            heart_attack_stroke: "Herzinfarkt, Schlaganfall",
            stretch: "Dehnung",
            increased_stretch: "Mehr Dehnung -> stärkere Kontraktion",
            mechanisms: "Mechanismen",
            compensation: "Kompensation",
            cardiac_hypertrophy: "Kardiomyopathie",
            increase: "Zunahme",
            respiratory_rate: "Atemfrequenz",
            area: "Fläche",
            gradient: "Gradient",
            concentration_gradient: "Konzentrationsgradient",
            vibration: "Vibration",
            vocal_cord_vibration: "Stimmbandvibration",
            collapse: "Kollaps",
            alveolar_collapse: "Alveolärer Kollaps",
            reduced_airflow: "Reduzierter Luftstrom",
            reduced_airflow_hypoxia: "Reduzierter Luftstrom, Hypoxie",
            increased_breathing_rate: "Erhöhte Atemfrequenz",
            adaptation: "Anpassung",
            increased_rbc: "Erhöhte Erythrozytenproduktion",
            reduction: "Reduktion"
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
            respiratory_c5: "Atemfrequenz",
            digestive_a1: "Neutralisiert Säure",
            digestive_a2: "Oberfläche ist wichtig",
            digestive_a3: "Länger = mehr Kontaktzeit",
            digestive_a4: "Säure tötet Bakterien",
            digestive_a5: "Nährstoffe verarbeiten",
            digestive_e1: "Entzündliche Darmerkrankung",
            digestive_e2: "Baut Laktose ab",
            digestive_e3: "Zweites Gehirn",
            digestive_e4: "Beschädigte Zotten",
            digestive_e5: "Physikalisch vs enzymatisch",
            circulatory_a1: "CO = HR x SV",
            circulatory_a2: "Dehnen und Zurückfedern",
            circulatory_a3: "Blut staut sich in Venen",
            circulatory_a4: "4 Bindungsstellen",
            circulatory_a5: "Natürlicher Schrittmacher",
            circulatory_e1: "Verstopfte Arterien",
            circulatory_e2: "Mehr rein = mehr raus",
            circulatory_e3: "Neural, hormonell, renal",
            circulatory_e4: "Herz vergrößert sich",
            circulatory_e5: "25/5 = 5",
            respiratory_a1: "Tennisplatzgröße",
            respiratory_a2: "MV = TV x RR",
            respiratory_a3: "Von hoch zu niedrig",
            respiratory_a4: "Luft vibriert Stimmbänder",
            respiratory_a5: "Oberflächenspannung zu hoch",
            respiratory_e1: "Verengter Atemweg",
            respiratory_e2: "Schneller/tiefer atmen",
            respiratory_e3: "CO2 bildet Kohlensäure",
            respiratory_e4: "Mehr rote Blutkörperchen",
            respiratory_e5: "Flüssigkeit blockiert Gasaustausch"
        },
        placeholders: {
            gradient: "Gradient",
            pressure: "Druck",
            rate: "Rate",
        
            stomach: "stomach",
            digestion: "digestion",
            absorption: "absorption",
            bile: "bile",
            pancreas: "pancreas",
            acid: "acid",
            dehydration: "dehydration",
            peristalsis: "peristalsis",
            surface_area: "surface area",
            more_time: "more time",
            infection: "infection",
            metabolism: "metabolism",
            intestines: "intestines",
            lactase: "lactase",
            malabsorption: "malabsorption",
            mechanical: "mechanical",
            pump: "pump",
            return: "return",
            pulmonary: "pulmonary",
            body: "body",
            exchange: "exchange",
            heart_rate: "heart rate",
            elastic: "elastic",
            varicose: "varicose",
            sa: "SA",
            heart_attack: "heart attack",
            stretch: "stretch",
            hypertrophy: "hypertrophy",
            alveoli: "alveoli",
            breathing: "breathing",
            larynx: "larynx",
            support: "support",
            tree: "tree",
            diffusion: "diffusion",
            vibration: "vibration",
            collapse: "collapse",
            airflow: "airflow",
            rbc: "RBC",            v_7: "7",
            v_500000000: "500000000",
            v_3: "3",
            co2: "CO2",
            v_4: "4",
            v_120_slash_80: "120/80",
            v_5: "5",
            o2: "O2",
            v_70: "70",
            v_7_dot_5: "7.5",
            v_50: "50"
}
    },
    sb3_02: {
        back: "Zurück",
        check: "Prüfen",
        next: "Weiter",
        correct: "Richtig!",
        incorrect: "Falsch",
        title: "SB3.02 Biodiversität",
        difficulty: {
            basic: "Grundlagen",
            core: "Kern",
            advanced: "Fortgeschritten",
            elite: "Elite"
        },
        tabs: {
            quests: "Quests",
            scenarios: "Basler Szenarien",
            visualizations: "Visualisierungen"
        },
        language_buttons: {
            english: "Sprache auf Englisch wechseln",
            chinese: "Sprache auf Chinesisch wechseln",
            german: "Sprache auf Deutsch wechseln"
        },
        stats: {
            total_quests: "Gesamtquests",
            completed: "Abgeschlossen",
            progress: "Fortschritt"
        },
        stage_view: {
            stage: "Stufe {order}",
            progress: "Fortschritt",
            quests: "Quests"
        },
        quest_card: {
            completed: "Abgeschlossen",
            submit_answers: "Antworten senden",
            correct: "Richtig!",
            incorrect: "Noch nicht ganz richtig",
            try_again: "Erneut versuchen",
            explanation: "Erklärung"
        },
        diversity_calculator: {
            title: "Artenvielfalt-Rechner",
            add_species: "Art hinzufügen",
            species_placeholder: "Art {index}",
            total_individuals: "Gesamtindividuen",
            species_richness: "Artenreichtum",
            shannon_index: "Shannon-Index (H')",
            simpson_index: "Simpson-Index (D)",
            evenness: "Gleichmäßigkeit (J')",
            evenness_description: "Die Gleichmäßigkeit reicht von 0 bis 1, wobei 1 perfekte Gleichmäßigkeit bedeutet",
            formulas: "Formeln:",
            formula_labels: {
                shannon: "Shannon-Index:",
                simpson: "Simpson-Index:",
                evenness: "Gleichmäßigkeit:"
            }
        },
        basel_scenarios: {
            related_concepts: "Verwandte Konzepte:",
            grid_title: "Basler Regionalszenarien",
            grid_description: "Erkunden Sie Biodiversität anhand lokaler Basler Beispiele",
            image_alt: "{title} - Bild {index}"
        },
        ecosystem_map: {
            title: "Basler Region Ökosystemkarte",
            select_region: "Wählen Sie eine Region aus, um Details anzuzeigen",
            biodiversity_score: "Biodiversitätsbewertung",
            key_species: "Schlüsselarten",
            threats: "Bedrohungen",
            ecosystem_type: "Ökosystemtyp",
            ecosystems: "Ökosysteme",
            avg_score: "Durchschn. Bewertung",
            total_threats: "Gesamtbedrohungen"
        },
        conservation_planner: {
            title: "Naturschutzplaner",
            budget: "Budget",
            remaining: "Verbleibend",
            total_cost: "Gesamtkosten",
            expected_impact: "Erwartete Auswirkung",
            threats_addressed: "Behandelte Bedrohungen",
            available_strategies: "Verfügbare Strategien",
            effectiveness: "Wirksamkeit",
            over_budget: "Über Budget!",
            your_plan: "Ihr Naturschutzplan"
        },
        error_boundary: {
            title: "Etwas ist schief gelaufen",
            description: "Beim Laden dieses Inhalts ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
            retry: "Erneut versuchen",
            details: "Fehlerdetails"
        }
    },
    sb3_01: {
        placeholders: {
            ellipsis: "...",
            v_0: "0",
            v_10: "10",
            v_1_dot_28: "1.28",
            v_0_dot_036: "0.036",
            v_100: "100",
            v_6_dot_8: "6.8",
            v_2414: "2414",
            v_0_dot_62: "0.62"
        },
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
        monitor_title: "SB3.01_ÖKOSYSTEM_MONITOR",
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
            energy_kj: "Energie (kJ)",
            efficiency: "Effizienz (%)",
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
                co2_air: "CO_2 in der Luft",
                plants: "Pflanzen",
                animals: "Tiere",
                river: "Rhein",
                clouds: "Wolken",
                rain: "Regen",
                evap: "Verdunstung",
                fix: "Fixierung",
                nitrate: "Nitrat",
                denit: "Denitrifizierung",
                algae: "Algen",
                zooplankton: "Zooplankton",
                fish: "Fische",
                bird: "Vogel",
                primary: "Primär",
                secondary: "Sekundär",
                tertiary: "Tertiär",
                carbon_cycle_title: "Kohlenstoffkreislauf",
                energy_unit: "kJ",
                energy_transfer: "10%"
            }
        },
        monitor: {
            tracker_title: "RHEIN-LACHS-TRACKER",
            active: "AKTUELL"
        },
        prompts: {
            food_chain: "Im Rhein-Ökosystem wird {producer} von {consumer} gefressen. Was kommt als Nächstes?",
            energy_transfer: "Wenn {level}-Konsumenten {energy} kJ Energie haben, wie viel erreicht die nächste Ebene?",
            cycle_process: "Im {cycle}-Kreislauf, was wird durch {process} produziert?",
            hint_trophic: "Nur 10% der Energie werden auf die nächste trophische Ebene übertragen",
            hint_10percent: "Verwenden Sie die 10%-Regel: mit 0,1 multiplizieren",
            hint_cycle: "Denken Sie an die Ein- und Ausgänge dieses Prozesses",
            elite_b1: "\\\\text{Kannenfeldpark: Primärproduktivität = 8.500 kcal/m^{2}/year. Herbivoren konsumieren im Mittel = 850 kcal/m^{2}/year. Berechnen Sie die Energieübertragungseffizienz (\\\\%).}",
            elite_b2: "\\\\text{Rhein-Makroinvertebraten (n=200): Eintagsfliege 80 (p=0.40), Köcherfliege 60 (p=0.30), Steinfliege 40 (p=0.20), Libelle 20 (p=0.10). Berechnen Sie den Shannon-Index } H' = -\\\\sum p_i \\\\ln(p_i).",
            elite_c1: "\\\\text{Basler Amselpopulation: 2020 = 450, 2024 = 520 (4 Jahre). Mit } N_t = N_0 \\\\times e^{rt}, \\\\text{ berechnen Sie die jährliche Wachstumsrate } r.",
            elite_c2: "\\\\text{Rhein-Biomasse (kg/ha): Produzenten Mittelwert = 12.000, Primärkonsumenten = 1.200, Sekundärkonsumenten = 120. Berechnen Sie das Biomasseverhältnis (Produzenten:Sekundärkonsumenten).}",
            elite_a1: "\\\\text{Basler Stadtrehbestand: logistisches Wachstum } \\\\frac{dN}{dt} = rN(1 - \\\\frac{N}{K}), \\\\text{ mit } r = 0.18/\\\\text{year}, K = 200, N = 150. \\\\text{ Berechnen Sie } \\\\frac{dN}{dt}.",
            elite_a2: "\\\\text{Rhein-Lachsrückkehr (Projekt Salmon 2020): 1990 wurden 0 Lachse gefunden. 2022 kehrten 1.200 Lachse nach Basel zurück. Wenn das Wachstum } N(t) = 1.15^t \\\\text{ folgt, berechnen Sie die Population nach weiteren 5 Jahren.}",
            elite_e1: "\\\\text{Simpson-Index } D = \\\\sum (n/N)^{2} \\\\text{ für Rheinfische: } \\\\text{Aal 50, Lachs 30, Karpfen 20. Gesamt } N=100. \\\\text{ Berechnen Sie } 1 - D \\\\text{ (Diversität).}"
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
        placeholders: {
            x_to_y_upper: "X:Y",
            x_percent: "X%",
            v_0_dot_xx: "0.XX"
        },
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
        monitor_title: "SB2.03_VARIATIONS_MONITOR",
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
        },
        expressions: {
            ratio_label: "Verhältnis",
            percentage_label: "Prozentsatz"
        }
    },
    sb2_04: {
        back: "Zurück zum Nexus",
        title: "SB2.04 // HUMANPHYSIOLOGIE",
        difficulty: { basic: "GRUNDLAGEN", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
        objective_title: "Aktives Missionsziel",
        monitor_title: "Physiologie-Monitor",
        check: "Überprüfen",
        next: "Nächstes System",
        correct: "System Funktionsfähig",
        incorrect: "Systemfehler",
        stages: {
            digestive_system: "VERDAUUNGSSYSTEM",
            respiratory_system: "ATMUNGSSYSTEM",
            circulatory_system: "KREISLAUFSYSTEM",
            excretory_system: "AUSSCHEIDUNGSSYSTEM"
        },
        labels: {
            anatomy_display: "Anatomie-Anzeige",
            input_terminal: "Eingabeterminal",
            hint: "HINWEIS",
            analysis: "Systemanalyse",
            mouth: "MUND",
            esophagus: "SPEISERÖHRE",
            stomach: "MAGEN",
            liver: "LEBER",
            pancreas: "BAUCHSPEICHELDRÜSE",
            intestines: "DARM",
            nose: "NASE",
            trachea: "LUFTRÖHRE",
            lungs: "LUNGEN",
            diaphragm: "ZWERCHFELL",
            heart: "HERZ",
            arteries: "ARTERIEN",
            veins: "VENEN",
            capillaries: "KAPILLAREN",
            kidneys: "NIEREN",
            ureters: "HARNLEITER",
            bladder: "BLASE",
            urethra: "HARNRÖHRE"
        },
        results: {
            valid: "System Validiert",
            invalid: "Systemfehler",
            valid_desc: "Physiologische Funktion bestätigt.",
            invalid_desc: "Systemantwort neu berechnen.",
            next: "Nächste Aufgabe"
        },
        quests: {
            digestive: {
                basic_1: "Welches Organ speichert und zersetzt Nahrung?",
                basic_2: "Wo findet die meiste Nährstoffaufnahme statt?",
                basic_3: "Welches Organ produziert Galle?",
                basic_4: "Welches Organ produziert Verdauungsenzyme und Insulin?",
                basic_5: "Welche Röhre verbindet den Mund mit dem Magen?",
                core_1: "Welche Art der Verdauung findet im Mund durch Kauen statt?",
                core_2: "Was baut Proteine im Magen ab?",
                core_3: "Was macht Galle mit Fetten?",
                core_4: "Welche Strukturen im Dünndarm vergrößern die Oberfläche für die Absorption?",
                core_5: "Wo wird das meiste Wasser aus verdauter Nahrung absorbiert?",
                core_6: "Wie heißt die wellenförmige Muskelkontraktion, die Nahrung durch den Verdauungstrakt bewegt?",
                advanced_1: "Warum arbeiten verschiedene Verdauungsenzyme in verschiedenen Teilen des Verdauungssystems?",
                advanced_2: "Was passiert, wenn Magensäure die Magenschleimhaut schädigt?",
                advanced_3: "Wie signalisiert der Körper, wann Verdauungsenzyme freigesetzt werden sollen?",
                advanced_4: "Welcher Enzymmangel verursacht Laktoseintoleranz?",
                advanced_5: "Wie erreichen absorbierte Nährstoffe die Körperzellen?",
                elite_1: "Ein Basel-Marathon-Läufer hat Verdauungsprobleme. Erklären Sie, wie die Umverteilung des Blutflusses die Verdauung während des Trainings beeinflusst.",
                elite_2: "Entwerfen Sie einen Ernährungsplan, der die Enzymfunktion im gesamten Verdauungssystem optimiert.",
                elite_3: "Intestinale Absorption: Identifizieren Sie den primären aktiven Transportmechanismus (SGLT1) für die Glukoseaufnahme im Dünndarm.",
                elite_4: "Systemeffizienz: Erklären Sie, wie der 'enterohepatische Kreislauf' den Nutzen von Gallensalzen bei der Verdauung maximiert.",
                elite_5: "Mikrobiom-Gleichgewicht: Identifizieren Sie die Stoffwechselnebenprodukte (kurzkettige Fettsäuren) der Ballaststofffermentation im Dickdarm."
            },
            respiratory: {
                basic_1: "Welche Röhre transportiert Luft vom Rachen zu den Lungen?",
                basic_2: "Wo findet der Gasaustausch in den Lungen statt?",
                basic_3: "Welcher Muskel kontrolliert die Atmung?",
                basic_4: "Wie heißen die beiden Äste der Luftröhre?",
                basic_5: "Welches Organ filtert, erwärmt und befeuchtet einströmende Luft?",
                core_1: "Was passiert mit dem Zwerchfell beim Einatmen?",
                core_2: "Welches Gas bewegt sich von den Alveolen in die Blutkapillaren?",
                core_3: "Was passiert mit dem Lungenvolumen beim Ausatmen?",
                core_4: "Welches Protein in roten Blutkörperchen transportiert Sauerstoff?",
                core_5: "Wie wird Kohlendioxid aus dem Körper entfernt?",
                core_6: "Was löst eine Erhöhung der Atemfrequenz aus?",
                advanced_1: "Wie reagiert das Atmungssystem auf erhöhten Sauerstoffbedarf während des Trainings?",
                advanced_2: "Was passiert mit den Atemwegen während eines Asthmaanfalls?",
                advanced_3: "Wie passt sich der Körper an niedrigen Sauerstoff in großer Höhe an?",
                advanced_4: "Wie beeinflusst Flüssigkeit in den Alveolen den Gasaustausch?",
                advanced_5: "Wie beeinflusst die Atemfrequenz den Blut-pH-Wert?",
                elite_1: "Analysieren Sie, wie Kaltwasserschwimmen im Rhein die Atemfunktion und Sauerstoffversorgung beeinflusst.",
                elite_2: "Ein Patient am Universitätsspital Basel hat niedrigen Blutsauerstoff. Diagnostizieren Sie mögliche Atemwegsversagen.",
                elite_3: "Entwerfen Sie ein öffentliches Gesundheitsprogramm für Basel zur Verbesserung der Atemgesundheit durch Atemübungen und Luftqualitätsüberwachung.",
                elite_4: "Gleichgewichtslogik: Wenn ein Basler Rheinschwimmer hyperventiliert, wie verändert sich die $[H^+]$-Konzentration im Verhältnis zum $CO_2$-Verlust?",
                elite_5: "Respiratorische Azidose: Wenn $CO_2$ zurückgehalten wird, identifizieren Sie die sofortige chemische Pufferreaktion zur Aufrechterhaltung der Homöostase."
            },
            circulatory: {
                basic_1: "Welche Herzkammer pumpt Blut in den Körper?",
                basic_2: "Welche Blutgefäße transportieren Blut vom Herzen weg?",
                basic_3: "Welche Kammer empfängt sauerstoffarmes Blut aus dem Körper?",
                basic_4: "Wo findet der Austausch von Nährstoffen und Abfallstoffen statt?",
                basic_5: "Was verhindert, dass Blut im Herzen rückwärts fließt?",
                core_1: "Wie heißt der Kreislaufweg vom Herzen zum Körper und zurück?",
                core_2: "Wie heißt der Kreislaufweg vom Herzen zur Lunge und zurück?",
                core_3: "Welche Blutzellen transportieren Sauerstoff?",
                core_4: "Wie heißt die Kontraktionsphase des Herzschlags?",
                core_5: "Was erzeugt den Blutdruck in den Arterien?",
                core_6: "Welche Blutzellen bekämpfen Infektionen?",
                core_7: "Welche Blutkomponente hilft bei der Gerinnselbildung?",
                advanced_1: "Wie ändert sich die Herzfrequenz während des Trainings und warum?",
                advanced_2: "Was passiert, wenn Arterien mit Plaque verstopft werden?",
                advanced_3: "Wie verhindert der Körper Blutverlust aus einer Wunde?",
                advanced_4: "Was verursacht Müdigkeit bei Anämie?",
                advanced_5: "Wie hilft der Blutfluss bei der Regulierung der Körpertemperatur?",
                elite_1: "Erklären Sie, wie sich das Kreislaufsystem während eines Basel-Marathons anpasst, um den erhöhten Sauerstoffbedarf zu decken.",
                elite_2: "Ein Patient hat Bluthochdruck. Analysieren Sie die kardiovaskulären Faktoren und schlagen Sie Interventionen vor.",
                elite_3: "Systemkoordination: Ordnen Sie die physiologischen Reaktionen auf einen plötzlichen pH-Abfall von der schnellsten zur langsamsten.",
                elite_4: "Herzmechanik: Beschreiben Sie das 'Frank-Starling-Gesetz' und seine Rolle bei der Anpassung des Herzzeitvolumens an den venösen Rückfluss.",
                elite_5: "Gefäßphysik: Erklären Sie, wie eine kleine Änderung des Gefäßradius den Widerstand drastisch beeinflusst (Radius zur vierten Potenz)."
            },
            excretory: {
                basic_1: "Welche Organe filtern Blut, um Abfallstoffe zu entfernen?",
                basic_2: "Welches Organ speichert Urin?",
                basic_3: "Welche Röhren transportieren Urin von den Nieren zur Blase?",
                basic_4: "Welche Röhre transportiert Urin aus dem Körper?",
                basic_5: "Was ist die funktionelle Einheit der Niere?",
                core_1: "Was ist der erste Schritt der Urinbildung im Nephron?",
                core_2: "Was passiert mit nützlichen Substanzen wie Glukose im Nephron?",
                core_3: "Wie werden zusätzliche Abfallstoffe dem Urin hinzugefügt?",
                core_4: "Welches Hormon reguliert die Wasserrückresorption in den Nieren?",
                core_5: "Was ist der Hauptstickstoffabfall im Urin?",
                core_6: "Wo wird Urin im Nephron konzentriert?",
                advanced_1: "Wie helfen die Nieren bei der Regulierung des Blutdrucks?",
                advanced_2: "Was verursacht die Bildung von Nierensteinen?",
                advanced_3: "Wie halten die Nieren den Blut-pH-Wert aufrecht?",
                advanced_4: "Warum verursacht unbehandelter Diabetes Glukose im Urin?",
                advanced_5: "Wie reagieren die Nieren auf Dehydration?",
                elite_1: "Ein Patient am Universitätsspital Basel hat Nierenversagen. Erklären Sie, wie dies die gesamte Körperhomöostase beeinflusst.",
                elite_2: "Entwerfen Sie ein öffentliches Gesundheitsprogramm für Basel zur Vorbeugung von Nierenerkrankungen durch Ernährung und Hydratation.",
                elite_3: "Schlagen Sie Behandlungsoptionen für einen Patienten mit chronischer Nierenerkrankung am Universitätsspital Basel vor.",
                elite_4: "Renale Homöostase: Welcher Zelltyp im Sammelrohr erhöht bei metabolischer Azidose (niedriger pH) die $H^+$-Sekretion?",
                elite_5: "Interdisziplinär: Nutzen Sie die Henderson-Hasselbalch-Gleichung, um zu erklären, warum die Nieren $HCO_3^-$ anstelle von $CO_3^{2-}$ zur präzisen pH-Kontrolle reabsorbieren."
            }
        },
        scenarios: {
            digestive_system: "Sie analysieren die Rolle des Verdauungssystems beim Abbau von Nahrung und der Aufnahme von Nährstoffen. Das Verständnis, wie Organe zusammenarbeiten, hilft, Ernährung und Gesundheit zu erklären.",
            respiratory_system: "Sie untersuchen, wie das Atmungssystem Gase zwischen Luft und Blut austauscht. Dieser Prozess ist für die Zellatmung und Energieproduktion unerlässlich.",
            circulatory_system: "Sie untersuchen, wie Herz und Blutgefäße Sauerstoff, Nährstoffe und Abfallstoffe im ganzen Körper transportieren. Dieses System erhält die Homöostase aufrecht.",
            excretory_system: "Sie untersuchen, wie die Nieren Blut filtern und die Flüssigkeitsbalance aufrechterhalten. Das Ausscheidungssystem entfernt metabolische Abfallstoffe und reguliert die Körperchemie."
        }
    }
};
