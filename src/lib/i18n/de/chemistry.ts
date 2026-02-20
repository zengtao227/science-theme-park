/**
 * DE - CHEMISTRY translations
 * Auto-generated from i18n.ts refactoring
 * Last updated: 2026-02-15
 */

export const deChemistry = {
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
            system_pressure: "SYSTEMDRUCK",
            input_answer: "Antwort eingeben",
            placeholder: "Tippen Sie 1 oder 2",
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
            pressure_hint: "Höherer Druck verringert das Behältervolumen"
        },
        lab_ui: {
            "mystery_lab": "Geheimlabor",
            "select_tool": "Werkzeug wählen",
            "lab_notes": "Labornotizen",
            "no_tests": "Noch keine Tests durchgeführt...",
            "tests_count": "Tests",
            "protocol": "Detektiv-Protokoll:",
            "instruction": "Wählen Sie ein Werkzeug und klicken Sie auf ein Pulver zum Testen. Identifizieren Sie Backpulver, Salz und Stärke!",
            "tools": {
                "water": "Wasser",
                "vinegar": "Essig",
                "fire": "Feuer",
                "iodine": "Jod"
            },
            "substances": {
                "soda": "Natron (NaHCO_3)",
                "salt": "Salz (NaCl)",
                "starch": "Stärke (C_6H_1₀O_5)ₙ",
                "powder_a": "Pulver A",
                "powder_b": "Pulver B",
                "powder_c": "Pulver C"
            },
            "results": {
                "soda_water": "Löst sich leicht",
                "soda_vinegar": "Sprudelt! CO_2-Blasen!",
                "soda_fire": "Keine Veränderung",
                "soda_iodine": "Keine Farbänderung",
                "salt_water": "Löst sich vollständig auf",
                "salt_vinegar": "Löst sich auf, kein Sprudeln",
                "salt_fire": "Schmilzt",
                "salt_iodine": "Keine Farbänderung",
                "starch_water": "Bildet trübe Mischung",
                "starch_vinegar": "Keine Reaktion",
                "starch_fire": "Verbrennt",
                "starch_iodine": "Wird BLAU-SCHWARZ!",
                "no_reaction": "Keine Reaktion"
            }
        },
        prompts: {
            shift_dir: "Die Reaktion A + B ⇌ C + D ist im Gleichgewicht. Wenn wir die Konzentration von A erhöhen, in welche Richtung verschiebt sich das System? (Rechts=1, Links=2).",
            temp_exothermic: "Eine exotherme Reaktion setzt Wärme frei. Wenn wir die Temperatur in einem solchen System erhöhen, in welche Richtung verschiebt sich das Gleichgewicht? (Rechts=1, Links=2).",
            pressure_moles: "A(g) + B(g) ⇌ C(g). Das System hat links 2 Gasmoleküle und rechts 1. Wohin verschiebt sich das Gleichgewicht bei Druckerhöhung? (Rechts=1, Links=2).",
            catalyst_yield: "Erhöht ein Katalysator die Gleichbehaltsausbeute eines Produkts oder beschleunigt er nur das Erreichen des Zustands? (Ausbeute=1, Geschwindigkeit=2).",
            kc_calculation: "Berechnen Sie Kc für A + B ⇌ C + D, wenn [A]=0.5M, [B]=0.5M, [C]=1M, [D]=1M bei Gleichgewicht. (Kc = [C][D]/[A][B]).",
            inert_gas: "In einem System mit konstantem Volumen wird ein Edelgas hinzugefügt. Beeinflusst dies die Gleichgewichtsposition? (Ja=1, Nein=2).",
            haber_temp: "Warum wird im Haber-Bosch-Verfahren (exotherm) 450°C verwendet, obwohl niedrigere Temperaturen mehr Ammoniak ergeben würden? (Reaktionsrate=1, Thermodynamik=2).",
            endothermic_kc: "Bei einer endothermen Reaktion: Erhöht eine Temperatursteigerung den Wert der Gleichgewichtskonstante Kc? (Ja=1, Nein=2)."
        },
        scenarios: {
            basel_synthesis: "Chemische Produktion am Rheinhafen Basel: Sie sind Prozessingenieur in der Lonza-Produktionsanlage im Basler Rheinhafen. Heute beaufsichtigen Sie die großtechnische Synthese von Ethylacetat, einem wichtigen Lösungsmittel für die lokale Pharmaproduktion bei Novartis und Roche. Die Reaktion ist ein Gleichgewichtsprozess, bei dem Essigsäure und Ethanol zum Produkt reagieren. Derzeit liefert der Reaktor nur 60 % seiner theoretischen Kapazität, was für die hohe Nachfrage der städtischen Labore unzureichend ist. Durch Anwendung des Le-Chatelier-Prinzips entscheiden Sie sich, die Konzentration der Reaktanten zu erhöhen. Sie müssen berechnen, wie die Zugabe von 500 Litern konzentriertem Ethanol zum 5000-Liter-Reaktor die Gleichgewichtslage nach rechts verschiebt. Eine Erhöhung der Reaktantenkonzentration zwingt das System, den Überschuss zu verbrauchen und dadurch mehr Ethylacetat zu produzieren. Diese Optimierung ist entscheidend für die Aufrechterhaltung der Medikamenten-Lieferkette für die Schweiz. Genau wie wenn man mehr Spieler zu einem Spiel hinzufügt, um das Punktesammeln zu beschleunigen, beschleunigt das Hinzufügen von mehr 'Spielern' (Reaktanten) zu einer chemischen Reaktion die Produktion Ihres Ziels.",
            haber_process: "Industrieller Stickstoff-Hub - Basel: Sie sind leitender Forschungswissenschaftler am Institut für Anorganische Chemie der Universität Basel. Sie arbeiten an der Optimierung des Haber-Bosch-Verfahrens, das Ammoniak aus Stickstoff und Wasserstoff synthetisiert – ein Prozess, der für die weltweite Herstellung von Düngemitteln und Medikamenten unerlässlich ist. In Ihrem Labor leiten Sie einen Reaktor, der bei einem Druck von 200 Atmosphären arbeitet. Da die Hinreaktion zur Ammoniakbildung zu einer Abnahme der Anzahl der Gasmoleküle führt (4 Moleküle Reaktant werden zu 2 Molekülen Produkt), verschlechtert eine Druckerhöhung das Gleichgewicht in Richtung Ammoniak. Wenn der Druck jedoch unter 150 Atmosphären fällt, sinkt die Ausbeute drastisch, was den Prozess wirtschaftlich unrentabel macht. Sie müssen die Manometer genau überwachen, um maximale Effizienz zu gewährleisten. Dieses Konzept ähnelt einem überfüllten Tram in Basel während der Fasnacht: Wenn mehr Menschen (Druck) in das Tram gezwungen werden, müssen sie zusammenrücken (Verschiebung zu weniger Molekülen), um einen stabilen Zustand zu finden.",
            buffer_systems: "Biozentrum Basel: Sie sind Doktorand am Biozentrum der Universität Basel und arbeiten in einem erstklassigen Labor für Zellbiologie. Sie kultivieren empfindliche menschliche Leberzellen in einem Bioreaktor für Toxizitätstests von Medikamenten. Diese Zellen können nur in einem engen pH-Bereich um 7,4 überleben. Um dies aufrechtzuerhalten, verwenden Sie ein biologisches Puffersystem, das Kohlendioxid und Bicarbonat-Ionen in einem dynamischen Gleichgewicht umfasst. Wenn der Stoffwechsel der Zellen einen Überschuss an sauren Abfällen (Protonen) produziert, muss sich das Gleichgewicht sofort verschieben, um diese zu neutralisieren. Sie haben die Aufgabe, den CO2-Partialdruck im Inkubator anzupassen, um einem unerwarteten Anstieg der Säure entgegenzuwirken, der von den Sensoren aufgezeichnet wurde. Eine präzise Gleichgewichtskontrolle ist hier buchstäblich eine Frage von Leben und Tod für Ihre Zellkultur. Es ist genau wie das körpereigene Blutpuffersystem, das Sie auch nach einem langen Lauf am Rhein stabil hält.",
            catalysis_innovation: "Katalyse-Gruppe der Universität Basel: Sie sind Innovationsmanager beim Basler Chemie-Startup 'RhineCatalyst'. Ihr Team hat einen revolutionären heterogenen Katalysator für die nachhaltige Produktion von Feinchemikalien entwickelt. Ein Katalysator ändert zwar nicht die endgültige Gleichgewichtslage K, erhöht aber drastisch die Geschwindigkeit, mit der das Gleichgewicht erreicht wird. In Ihrem aktuellen Projekt spart das Erreichen des Gleichgewichts in 1 Stunde bei 50 °C statt in 10 Stunden bei 90 °C dem Unternehmen jährlich über 100.000 Schweizer Franken an Energiekosten. Sie müssen die Reaktionskinetik analysieren, um sicherzustellen, dass sich das System stabilisiert, bevor das Kühlwassersystem an seine Grenzen stößt. Diese industrielle Effizienz hält Basel an der Spitze der globalen Chemie. Denken Sie an eine Abkürzung auf Ihrem Weg durch die Basler Altstadt – Sie landen immer noch am selben Brunnen, aber Sie kommen viel schneller und mit weniger Anstrengung dorthin."
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
            bcc_desc: "Analysieren Sie raumzentriert (Koordination 8)",
            fcc_desc: "Meistern Sie flächenzentriert (Koordination 12)",
            sc_hint: "Niedrigste Packungsdichte (52%)",
            bcc_hint: "Mittlere Packung (68%), Metalle wie Fe, Cr",
            fcc_hint: "Höchste Packung (74%), Metalle wie Cu, Al, Au"
        },
        prompts: {
            atoms_per_cell: "Berechnen Sie die Gesamtzahl der Atome pro Elementarzelle für dieses Gitter.",
            coord_num: "Was ist die Koordinationszahl (Anzahl der nächsten Nachbarn) für ein Atom in dieser Struktur?",
            pack_eff: "Bestimmen Sie den atomaren Packungsfaktor (%) für dieses Kristallsystem.",
            void_id: "Identifizieren Sie die Anzahl der verfügbaren Tetraederlücken in dieser Elementarzelle."
        },
        scenarios: {
            crystallography_center: "Basler Zentrum für Kristallographie: Röntgenbeugung wird genutzt, um die Atomstrukturen neuer pharmazeutischer Kristalle abzubilden.",
            solid_state_research: "Physikalisches Institut - Basel: Forscher untersuchen die Eigenschaften von raumzentrierten und flächenzentrierten kubischen Metallen für die Luft- und Raumfahrt.",
            drug_polymorphism: "Qualitätskontrolle bei Novartis: Unterschiedliche Kristallpackungen (Polymorphie) können drastisch verändern, wie sich ein Medikament im Körper löst.",
            nano_materials: "Swiss Nanoscience Institute (SNI): Am SNI in Basel konstruieren Wissenschaftler Kristallstrukturen auf atomarer Ebene für neue elektronische Bauteile."
        }
    },
    gc1_01: {
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
            zn_concentration: "Zn^{2}^+-KONZENTRATION",
            cu_concentration: "Cu^{2}^+-KONZENTRATION",
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
            build_hint: "Zn wird an der Anode oxidiert, Cu^{2}^+ an der Kathode reduziert",
            measure_hint: "E = E° - (RT/nF)ln(Q)",
            analyze_hint: "Salzbrücke erhält elektrische Neutralität"
        },
        prompts: {
            cell_potential_calc: "Gegeben E° = 1.10V, [Zn2+] = 1.0M, [Cu2+] = 0.1M. Berechnen Sie E mit E = E° - (RT/nF)lnQ bei 298K. (ln10 ≈ 2.303).",
            nernst_q: "Für Zn + Cu2+ → Zn2+ + Cu: Wenn [Zn2+] steigt, nimmt das Zellpotential (E) zu oder ab? (Zunahme=1, Abnahme=2).",
            standard_v: "Was ist das Standardzellpotential (E°) für eine Zn-Cu-Zelle, wenn E°(Cu2+/Cu)=+0.34V und E°(Zn2+/Zn)=-0.76V? (E° = Ek - Ea).",
            electron_flow: "Fließen Elektronen in einer galvanischen Zelle von der Anode zur Kathode oder umgekehrt? (Anode zu Kathode=1, Kathode zu Anode=2).",
            salt_bridge: "Welche Komponente erhält die elektrische Neutralität durch Ionenmigration? (Voltmeter=1, Salzbrücke=2).",
            cathode_process: "An welcher Elektrode findet die Reduktion (Elektronenaufnahme) statt? (Anode=1, Kathode=2).",
            zn_reduction: "Ist die Reduktion von Zink (Zn2+ + 2e- → Zn) unter Standardbedingungen ein spontaner Prozess? (Ja=1, Nein=2).",
            temperature_effect: "Erhöht eine Temperatursteigerung laut Nernst-Gleichung immer das Zellpotential? (Ja=1, Nein=2)."
        },
        scenarios: {
            battery_storage: "Basler Energienetz: Sie sind Energiesystem-Architekt bei den Industriellen Werken Basel (IWB). Während Basel sich in Richtung einer kohlenstoffneutralen Zukunft bewegt, integrieren wir großtechnische Vanadium-Redox-Flow-Batterien in das lokale Stromnetz, um überschüssige Energie aus Windparks am Rhein zu speichern. Im Gegensatz zu herkömmlichen Batterien speichern diese die Energie in flüssigen Elektrolyttanks. Ihre Aufgabe ist es, das theoretische Zellpotential E unter den nicht-standardmäßigen Konzentrationen zu berechnen, die in unserem Prototyp-Reaktor B-85 vorliegen. Wenn die Konzentration von V(V) 1,5 M und V(IV) 0,5 M beträgt, wie beeinflusst dies die Spannung im Vergleich zum Standardwert von 1,1 V? Diese gespeicherte Energie liefert die notwendige Reserve, um die Basler Trams bei einem Stromausfall in Betrieb zu halten. Es ist ähnlich wie ein Wasserturm, der Energie speichert, indem er Wasser in der Höhe hält, bereit zu fließen, wenn die Stadt durstig ist.",
            corrosion_protection: "Instandhaltung der Rheinbrücken: Sie sind Spezialist für Denkmalpflege beim Basler Tiefbauamt. Sie inspizieren die historische Mittlere Brücke über den Rhein. Die stählernen Pfeiler unter Wasser sind anfällig für elektrochemische Korrosion, bei der Eisenatome Elektronen verlieren und zu Rost werden. Um dies zu verhindern, verwenden wir 'Opferanoden' aus Zink und schaffen so eine galvanische Zelle, in der das Zink anstelle des Brückenstahls korrodiert. Sie müssen überprüfen, ob die Potenzialdifferenz zwischen dem Flusswasser und den Stützen hoch genug ist, um den Schutz aufrechtzuerhalten. Wenn sich die Ionenkonzentration des Rheins durch saisonale Abflüsse ändert, könnte Ihr Schutzsystem versagen und die strukturelle Integrität dieses 800 Jahre alten Wahrzeichens gefährden. Es ist genau so, als würde man einen Schild vor ein Ziel stellen; der Schild fängt die Treffer (Korrosion) ab, damit das Ziel sicher bleibt.",
            analytical_electrochem: "Lonza Basel: Sie sind Forensik-Analyst im Kantonslabor Basel-Stadt. Wir haben eine Probe von einem Industriestandort nahe der Grenze erhalten, der im Verdacht steht, Schwermetalle in den Rhein einzuleiten. Mit einer Technik namens Anodic Stripping Voltammetry erstellen Sie eine winzige elektrochemische Zelle, um Spuren von Kupfer und Blei nachzuweisen. Der während der Redoxreaktion erzeugte Strom ist proportional zur Schadstoffkonzentration. Sie müssen den Sensor kalibrieren, indem Sie die Potenzialantwort einer 1,0-M-Standardlösung im Vergleich zu unserer unbekannten Probe messen. Eine genaue Messung ist hierbei entscheidend für die Durchsetzung von Umweltgesetzen und den Schutz des Rhein-Ökosystems für die Schwimmer im Rheinbad. Diese Präzision ist wie eine digitale Waage, die ein einzelnes Salzkorn in einem Schwimmbecken erkennen kann.",
            fuel_cell_innovation: "Swiss Hydrogen Hub: Sie sind Chemieingenieur am Swiss Hydrogen Hub in Basel. Wir entwickeln hocheffiziente Protonenaustauschmembran-Brennstoffzellen (PEM), um die nächste Generation der Schweizer Züge (SBB) anzutreiben. In diesen Zellen wird Wasserstoff an der Anode oxidiert und Sauerstoff an der Kathode reduziert, wobei nur Wasser und Strom entstehen. Ihr Projekt umfasst das Testen eines neuen Platin-Legierungskatalysators, der bei 80 °C arbeitet. Sie müssen den Effizienzverlust aufgrund des Konzentrationsgradienten über die Membran berechnen. Wenn der Wasserstoffdruck abfällt, sinkt das Zellpotential E gemäß der Nernst-Gleichung, was den Zug auf den steilen Strecken in der Nähe des Jura zum Stillstand bringen könnte. Diese Technologie repräsentiert die Zukunft des sauberen Verkehrs in Europa, ähnlich wie der Akku Ihres Laptops Ihre Arbeit antreibt, aber mit Wasserstoff als ultimativem sauberem Brennstoff."
        }
    },
    gc2_01: {
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
            delete: "Verwenden Sie ENTF, um das ausgewählte Atom zu entfernen"
        },
        prompts: {
            atom_count: "Bestimmen Sie die Gesamtzahl der Atome in dieser Molekülstruktur.",
            bond_type: "Identifizieren Sie den primären Typ der vorhandenen Kohlenstoff-Kohlenstoff-Bindung.",
            mol_type: "Klassifizieren Sie dieses Molekül in seine organische Kategorie.",
            functional_id: "Welche funktionelle Gruppe ist in diesem 3D-Modell am prominentesten?"
        },
        scenarios: {
            lonza_methane_cracking: "Lonza Basel - Rohstoffoptimierung: Sie sind Chemieingenieur am globalen Hauptsitz von Lonza in Basel. Wir optimieren unsere Methan-Cracking-Reaktoren, um hochreinen Wasserstoff für grüne Energieinitiativen zu produzieren. Ihre Aufgabe ist es, die Bindungsstruktur unseres Methan-Rohstoffs zu visualisieren. In der Hochdruckumgebung unserer Basler Anlage ist das Verständnis der C-H-Bindungslänge und der Tetraedergeometrie entscheidend, um suboptimale Erträge zu verhindern. Eine genaue Modellierung stellt sicher, dass Lonza ein weltweit führendes Unternehmen in der nachhaltigen chemischen Produktion hier im Rheintal bleibt. Es ist wie das Überprüfen der einzelnen Glieder in einer massiven Kette, um sicherzustellen, dass das gesamte System der Spannung einer industriellen Synthese standhalten kann.",
            roche_aromatic_pipeline: "Roche Basel - Ringsystem-Synthese: Sie sind leitender Chemiker im Roche-Turm in Basel, dem höchsten Gebäude der Schweiz und einem Zentrum der Arzneimittelforschung. Ihr Team entwickelt eine neue Klasse von Antibiotika auf der Basis substituierter aromatischer Ringe. Die Resonanzstabilität des Benzolkerns ist das Fundament für die Wirksamkeit Ihres Medikaments. Mit unseren 3D-Visualisierungstools müssen Sie die Bindungsdelokalisierung in Ihrem aktuellen Leitwirkstoff verifizieren. In der wettbewerbsintensiven Basler Pharma-Landschaft könnte ein Fehler bei der Vorhersage der Ringspannung eine klinische Studie in Milliardenhöhe um Jahre zurückwerfen. Ihre Arbeit schlägt die Brücke zwischen theoretischer organischer Chemie und lebensrettender Medizin. Denken Sie daran wie an die Sicherstellung der strukturellen Integrität eines komplexen Wolkenkratzers - wenn das Fundament nicht perfekt stabil ist, ist das gesamte Gebäude in Gefahr.",
            biozentrum_protein_research: "Biozentrum Basel - Molekulare Grundlagen: Sie sind Forscher am Biozentrum der Universität Basel und Teil eines Weltklasse-Teams, das die molekularen Grundlagen neurodegenerativer Erkrankungen untersucht. Sie analysieren die Bausteine des Lebens: Aminosäuren und Zucker. Das Verständnis der exakten 3D-Orientierung der Amino- und Carboxylgruppe in Alanin ist unerlässlich, um zu modellieren, wie sich Proteine im menschlichen Gehirn falten. Hier in Basel, wo sich Biologie und Chemie auf höchstem Niveau treffen, hilft Ihre Raumanalyse dabei, die 'Sprache des Lebens' auf atomarer Ebene zu entschlüsseln. Jeder Bindungswinkel, den Sie verifizieren, trägt zu unserem Verständnis von Volkskrankheiten wie Alzheimer bei. Dies ist wie das Zusammensetzen eines komplexen 3D-Puzzles, bei dem die Form jedes Teils bestimmt, wie sich das Gesamtbild schließlich zusammenfügt."
        }
    },
    sc1_01: {
        back: "Zurück zum Nexus",
        title: "SC1.01 // GEHEIM LABOR",
        difficulty: {
            basic: "BASIS", core: "KERN", advanced: "ERWEITERT", elite: "ELITE"
        },
        objective_title: "Aktuelles Missionsziel",
        target_title: "Substanzanalyse",
        next: "Nächste Sequenz",
        check: "Überprüfen",
        correct: "Verifiziert",
        incorrect: "Abweichung",
        ready: "Bereit",
        monitor_title: "SC1.01_LABOR_MONITOR",
        footer_left: "SC1.01_GEHEIM_LABOR // KNOTEN: BASEL",
        lab_ui: {
            mystery_lab: "Geheimlabor",
            select_tool: "Werkzeug wählen",
            lab_notes: "Labornotizen",
            no_tests: "Noch keine Tests durchgeführt...",
            tests_count: "Tests",
            protocol: "Detektiv-Protokoll:",
            instruction: "Wählen Sie ein Werkzeug und klicken Sie auf ein Pulver zum Testen. Identifizieren Sie Backpulver, Salz und Stärke!",
            tools: { water: "Wasser", vinegar: "Essig", fire: "Feuer", iodine: "Jod" },
            substances: {
                soda: "Natron (NaHCO_3)", salt: "Salz (NaCl)", starch: "Stärke (C_6H_1₀O_5)ₙ",
                powder_a: "Pulver A", powder_b: "Pulver B", powder_c: "Pulver C"
            },
            results: {
                soda_water: "Löst sich leicht", soda_vinegar: "Sprudelt! CO_2-Blasen!", soda_fire: "Keine Veränderung", soda_iodine: "Keine Farbänderung",
                salt_water: "Löst sich vollständig auf", salt_vinegar: "Löst sich auf, kein Sprudeln", salt_fire: "Schmilzt", salt_iodine: "Keine Farbänderung",
                starch_water: "Bildet trübe Mischung", starch_vinegar: "Keine Reaktion", starch_fire: "Verbrennt", starch_iodine: "Wird BLAU-SCHWARZ!",
                no_reaction: "Keine Reaktion"
            }
        },
        labels: {
            input: "EINGABE",
            hints: "HINWEISE",
            substance: "Substanz",
            tool: "Testwerkzeug",
            observation: "Beobachtung",
            method: "Methode",
            hint: "Hinweis"
        },
        hints: {
            soda: "Natron: Sprudelt mit Essig (CO_2)",
            starch: "Stärke: Wird blau-schwarz mit Jod",
            salt: "Salz: Löst sich vollständig in Wasser"
        },
        mission: {
            title: "PULVER-IDENTIFIKATION",
            description: "Identifizieren Sie mysteriöse weiße Pulver mit klassischen chemischen Tests. Meistern Sie die qualitative Analyse."
        },
        stages: {
            identify: "IDENTIFIZIEREN",
            properties: "EIGENSCHAFTEN",
            reactions: "REAKTIONEN",
            experiment: "EXPERIMENT"
        },
        prompts: {
            identify_powders: "Identifizieren Sie die drei weißen Pulver",
            use_tools: "Mittel: Wasser, Essig, Feuer, Jod",
            test_observe: "Testen und beobachten",
            answer: "Antwort",
            powder_a: "Pulver A ist",
            powder_b: "Pulver B ist",
            powder_c: "Pulver C ist",
            product: "Hauptprodukt",
            review_design: "Überprüfen Sie das experimentelle Design.",
            understood: "Verstanden?",
            confirm_1: "Tipper 1 zur Bestätigung"
        },
        properties_q: {
            basic_0: "Welches Pulver sprudelt mit Essig?",
            basic_1: "Welches Pulver wird mit Jod blau-schwarz?",
            basic_2: "Welches Pulver löst sich vollständig in Wasser?",
            basic_3: "Welches Pulver ist weiß und kristallin?",
            basic_4: "Welches Pulver produziert Blasen mit Säure?",
            core_0: "Welches Pulver produziert CO_2-Gas?",
            core_1: "Welches Pulver bildet eine kolloidale Suspension?",
            core_2: "Welches Pulver hat die höchste Löslichkeit?",
            core_3: "Welches Pulver reagiert mit Essigsäure?",
            core_4: "Welches Pulver ist ein Polysaccharid?",
            advanced_0: "Welches Pulver ist Natriumbicarbonat?",
            advanced_1: "Welches Pulver ist Natriumchlorid?",
            advanced_2: "Welches Pulver ist ein Kohlenhydratpolymer?",
            advanced_3: "Welches Pulver setzt Kohlensäure frei?",
            advanced_4: "Welches Pulver bildet eine ionische Lösung?",
            elite_0: "Welches Pulver hat die Formel NaHCO_3?",
            elite_1: "Welches Pulver hat die Formel NaCl?",
            elite_2: "Welches Pulver hat die Formel (C_6H_1₀O_5)ₙ?",
            elite_3: "Welches Pulver durchläuft eine Säure-Base-Neutralisation?",
            elite_4: "Welches Pulver bildet einen Triiodid-Komplex?"
        },
        reactions_q: {
            basic_0: "Backpulver + Essig Reaktion",
            basic_1: "Stärke + Jod-Test",
            basic_2: "Salz löst sich in Wasser",
            basic_3: "Backpulver erhitzen",
            basic_4: "Stärke-Hydrolyse",
            core_0: "Vollständige Neutralisation von Backpulver",
            core_1: "Stärke-Jod-Komplex-Bildung",
            core_2: "Salzkristallisation",
            core_3: "Zersetzungstemperatur von Backpulver",
            core_4: "Enzymatischer Abbau von Stärke",
            advanced_0: "Backpulver mit starker Säure",
            advanced_1: "Vollständige Hydrolyse von Stärke",
            advanced_2: "Salzelektrolyse",
            advanced_3: "Backpulver-Puffersystem",
            advanced_4: "Stärkeverkleisterung",
            elite_0: "Backpulver in der Blut-pH-Regulation",
            elite_1: "Stärke-Jod-Komplexstruktur",
            elite_2: "Salz im Solvay-Verfahren",
            elite_3: "Kinetik der thermischen Zersetzung von Natron",
            elite_4: "Stärke-Retrogradation"
        },
        experiments: {
            ph_analysis: {
                title: "Rhein-Wasser Puffer-Analyse",
                context: "Basler Amt für Umwelt: Analyse der Pufferkapazität des Rheins...",
                purpose: "Bestimmen Sie, ob lokale Wasserproben pH-Wert-Änderungen widerstehen können.",
                materials: ["Rheinwasserprobe", "Universalindikator", "0.1M HCl", "0.1M NaOH", "Bechergläser"],
                procedure: ["1. 50 ml der Probe in ein Becherglas gießen.", "2. 2 Tropfen Indikator hinzufügen.", "3. Mit HCl tropfenweise titrieren.", "4. Tropfen bis zur Farbänderung aufzeichnen."],
                expectedResults: "Der lokale Kalkstein sollte eine milde Pufferkapazität bieten.",
                safetyWarning: "Schutzbrille tragen. Säuren und Basen sind ätzend.",
                action: "Analysieren Sie die Rheinwasserprobe.",
                target: "Pufferkapazität"
            },
            salt_purification: {
                title: "Schweizerhalle Salzreinigung",
                context: "Schweizerhalle Salinen: Reinigung des aus den tiefen Bohrlöchern extrahierten Steinsalzes...",
                purpose: "Reines NaCl aus der Steinsalzmischung extrahieren.",
                materials: ["Steinsalz", "Wasser", "Filterpapier", "Trichter", "Abdampfschale", "Bunsenbrenner"],
                procedure: ["1. Steinsalz zerkleinern.", "2. In warmem Wasser auflösen.", "3. Unlösliche Verunreinigungen filtern.", "4. Filtrat bis zur Kristallisation verdampfen."],
                expectedResults: "Nach der Verdampfung bleiben weiße, kubische NaCl-Kristalle zurück.",
                safetyWarning: "Verbrennungsgefahr durch heiße Abdampfschale.",
                action: "Steinsalz reinigen.",
                target: "Kristallisation"
            }
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
        input_tip_1dp: "Tipp: Gib das Resultat als Bruch (z.B. 4/3) oder auf 1 Dezimalstelle gerundet an.",
        stages: {
            molar_mass: "MOLMASSE",
            stoichiometry: "REAKTIONSVERHÄLTNIS",
            yield: "AUSBEUTE",
            molar_mass_prompt_latex: "\\text{Berechne die Molmasse der Verbindung.}",
            stoichiometry_prompt_latex: "\\text{Nutze stöchiometrische Verhältnisse für die Produktmenge.}",
            yield_prompt_latex: "\\text{Berechne die theoretische Ausbeute aus den gegebenen Massen.}"
        },

        labels: {
            scale: "天平读数",
            formula: "Formel",
            atoms: "Atomgewichte",
            reaction: "Reaktion",
            given: "Gegeben",
            amount: "Menge (n)",
            mass: "Masse (m)",
            molar: "Molare Masse (M)"
        },
        mission: {
            title: "MISSION: NOVARTIS-SYNTHESEBAY",
            description: "Kalibriere eine pharmazeutische Reaktion. Balanciere Mol-Verhältnisse und prüfe Ausbeuten."
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
            protons: "PROTONEN (p^+)",
            neutrons: "NEUTRONEN (n⁰)",
            electrons: "ELEKTRONEN (e^-)"
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
    sc1_05: {
        back: "Zurück zum Nexus",
        title: "SC1.05 // CHEMISCHE BINDUNGEN",
        check: "Prüfen",
        next: "Weiter",
        correct: "Bindung Verifiziert",
        incorrect: "Bindungsfehler",
        ready: "Bereit",
        monitor_title: "SC1.05_BINDUNGSLABOR",
        difficulty: {
            basic: "BASIS",
            core: "KERN",
            advanced: "FORTGESCHRITTEN",
            elite: "ELITE"
        },
        stages: {
            ionic: "IONISCH",
            covalent: "KOVALENT",
            lewis: "LEWIS"
        },
        labels: {
            na_cl: "Na + Cl -> NaCl",
            h2: "H + H -> H2",
            co2: "C + 2O -> CO2"
        },
        scenarios: {
            ionic_salts: "Basler Chemielager: Das Verständnis ionischer Bindungen ist grundlegend für die Produktion von Industriesalzen und Katalysatoren.",
            molecular_oxygen: "Luftgütestation am Rhein: Kovalente Bindungen in Sauerstoff- und Stickstoffmolekülen werden untersucht, um Gasaustauschprozesse zu verstehen.",
            pharmaceutical_chains: "Molekulardesign bei Roche: Die Entwicklung neuer Medikamente in Basel umfasst das Engineering spezifischer kovalenter Bindungen.",
            electrostatic_attraction: "Physik der Universität Basel: Untersuchung der elektrostatischen Kräfte, die Ionenoxide auf atomarer Ebene zusammenhalten."
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
        scenario_title: "BASLER SZENARIO",
        answer_title: "IHRE ANTWORT",
        next: "Nächste Sequenz ausführen",
        check: "Verifizieren",
        correct: "Verifiziert",
        incorrect: "Fehlreaktion",
        ready: "Bereit",
        monitor_title: "C2.01_KINETIK_MONITOR",
        footer_left: "C2.01_CHEMISCHE_KINETIK // KNOTEN: BASEL",
        stages: {
            arrhenius: "ARRHENIUS",
            concentration: "GESCHWINDIGKEITSGESETZ",
            collision: "HALBWERTSZEIT",
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
        },
        scenarios: {
            arrhenius: "Novartis Kinetik-Labor: Untersuchen Sie, wie Temperatur und Aktivierungsenergie die Reaktionsgeschwindigkeiten beeinflussen. Die Arrhenius-Gleichung k = A·exp(-Ea/RT) beschreibt die Temperaturabhängigkeit von Geschwindigkeitskonstanten. Höhere Temperaturen erhöhen die kinetische Energie der Moleküle und führen zu mehr erfolgreichen Kollisionen.",
            rate_law: "Roche Pharmaforschung: Bestimmen Sie Reaktionsordnungen und Geschwindigkeitsgesetze aus experimentellen Daten. Das Geschwindigkeitsgesetz drückt aus, wie die Reaktionsgeschwindigkeit von den Konzentrationen der Reaktanten abhängt. Das Verständnis von Geschwindigkeitsgesetzen ist entscheidend für die Optimierung der Arzneimittelsynthese und die Vorhersage des Reaktionsverhaltens.",
            half_life: "Universitätsspital Basel: Berechnen Sie Arzneimittel-Eliminationshalbwertszeiten für die Pharmakokinetik. Die Halbwertszeit ist die Zeit, die benötigt wird, damit eine Menge auf die Hälfte ihres Anfangswerts reduziert wird. Kinetik erster Ordnung ist bei der Arzneimittelmetabolisierung üblich, wobei t_1/_2 = ln(2)/k."
        },
        problems: {
            arr_temp_300_ea_50: "Novartis-Reaktor bei T=300K, Aktivierungsenergie Ea=50 kJ/mol. Berechnen Sie relative Geschwindigkeitskonstante k.",
            arr_temp_350_ea_40: "Temperatur erhöht auf 350K, Ea=40 kJ/mol. Finden Sie k (relative Einheiten).",
            arr_temp_400_ea_60: "Hochtemperaturreaktion: T=400K, Ea=60 kJ/mol. Berechnen Sie k.",
            arr_temp_320_ea_45: "Moderate Bedingungen: T=320K, Ea=45 kJ/mol. Bestimmen Sie k.",
            arr_temp_280_ea_55: "Niedertemperatursynthese: T=280K, Ea=55 kJ/mol. Finden Sie k.",
            arr_double_temp: "Temperatur verdoppelt sich von 300K auf 600K. Um welchen Faktor steigt k? (Ea=50 kJ/mol)",
            arr_ea_effect: "Katalysator senkt Ea von 80 auf 40 kJ/mol bei 300K. Finden Sie k-Verhältnis.",
            arr_ln_form: "Verwenden Sie logarithmische Form: ln(k) = ln(A) - Ea/RT. Berechnen Sie ln(k) für Ea=50 kJ/mol, T=300K.",
            arr_activation: "Zwei Geschwindigkeitskonstanten unterscheiden sich um Faktor 10 über 50K Temperaturbereich. Finden Sie Ea.",
            arr_catalyst: "Katalysator reduziert Ea um 20 kJ/mol (von 80 auf 60). Berechnen Sie k-Verhältnis bei 300K.",
            arr_two_temps: "Messen Sie k bei 300K und 350K. Verwenden Sie ln(k_2/k_1) = -Ea/R(1/T_2 - 1/T_1) um Ea=52 kJ/mol zu finden.",
            arr_plot: "Arrhenius-Diagramm hat Steigung -7800 K. Berechnen Sie Ea (Steigung = -Ea/R).",
            arr_frequency: "Gegeben k=1.5×10^-^9, Ea=50 kJ/mol, T=300K. Finden Sie präexponentiellen Faktor A.",
            arr_temp_for_k: "Ziel-Geschwindigkeitskonstante k=10^6 s^-¹, Ea=60 kJ/mol. Welche Temperatur wird benötigt?",
            arr_enzyme: "Enzymkatalysierte Reaktion: Ea=40 kJ/mol, Körpertemperatur T=310K. Berechnen Sie k.",
            arr_complex: "Zweistufiger Mechanismus: Ea1=50, Ea2=30 kJ/mol. Gesamt-Ea=40 kJ/mol. Finden Sie k bei 300K.",
            arr_pressure: "Druckeffekt: Aktivierungsvolumen ΔV‡=-10 cm^{3}/mol. Berechnen Sie k-Verhältnis.",
            arr_quantum: "Quantentunnelkorrektur κ=2.5. Finden Sie effektives k.",
            arr_isotope: "Kinetischer Isotopeneffekt: H vs D Substitution. Berechnen Sie kH/kD für Ea=50 kJ/mol.",
            arr_transition: "Übergangszustandstheorie: k=10^6 s^-¹ bei 300K. Berechnen Sie ΔG‡.",
            rl_first_order: "Reaktion erster Ordnung: Rate = k[A]. Gegeben [A]=2.0 M, k=0.5 s^-¹, finden Sie Rate.",
            rl_second_order: "Zweiter Ordnung: Rate = k[A]^{2}. [A]=1.5 M, k=0.4 M^-¹s^-¹. Berechnen Sie Rate.",
            rl_zero_order: "Nullter Ordnung: Rate = k (unabhängig von [A]). k=0.8 M/s. Finden Sie Rate.",
            rl_concentration: "Reaktion erster Ordnung: [A] verdoppelt sich. Um welchen Faktor steigt die Rate?",
            rl_initial: "Anfangsgeschwindigkeitsmethode: [A]₀=1.0 M, k=0.6 s^-¹. Berechnen Sie Anfangsrate.",
            rl_mixed: "Gemischte Ordnung: Rate = k[A][B]. [A]=2 M, [B]=3 M, k=0.5 M^-^{2}s^-¹. Finden Sie Rate.",
            rl_order: "Verdopplung von [A] vervierfacht Rate. Was ist die Reaktionsordnung n?",
            rl_integrated: "Integrierte erste Ordnung: [A]t = [A]₀·e^-ᵏᵗ. [A]₀=1 M, k=0.1 s^-¹, t=10 s. Finden Sie [A].",
            rl_time: "Halbwertszeit erster Ordnung: t_1/_2 = ln(2)/k. Gegeben k=0.05 s^-¹, finden Sie t_1/_2.",
            rl_constant: "Aus Rate=2 M/s und [A]=4 M (erste Ordnung), bestimmen Sie k.",
            rl_complex_order: "Gebrochene Ordnung: Rate = k[A]^1.5[B]^0.5. [A]=4, [B]=9, k=0.2. Finden Sie Rate.",
            rl_mechanism: "Mehrstufig: Gesamtrate = k_1k_2/(k_1+k_2). k_1=0.5, k_2=0.3. Berechnen Sie Rate.",
            rl_steady_state: "Stationäre Näherung: [I]ss = k_1[A]/k_2. k_1=0.5, k_2=0.2. Finden Sie [I].",
            rl_pre_equilibrium: "Vorgleichgewicht: Keq = kf/kr. kf=0.8, kr=0.2. Berechnen Sie Keq.",
            rl_inhibition: "Kompetitive Hemmung: Rate reduziert um Faktor (1+[I]/KI). [I]=2, KI=1. Finden Sie Ratefaktor.",
            rl_oscillating: "Belousov-Zhabotinsky oszillierende Reaktion. Maximum [A] im Zyklus.",
            rl_autocatalytic: "Autokatalytisch: A+B→2B. Wendepunkt bei t=15s für [A]₀=0.1 M.",
            rl_chain: "Kettenreaktion: Kettenlänge ν = kp/kt. kp/kt=100. Finden Sie ν.",
            rl_photochemical: "Photochemische Quantenausbeute Φ = reagierte Moleküle / absorbierte Photonen = 0.8.",
            rl_enzyme_complex: "Michaelis-Menten: V = Vmax[S]/(KM+[S]). KM=1, [S]=5. Finden Sie V/Vmax.",
            hl_first_order: "Halbwertszeit erster Ordnung: t_1/_2 = ln(2)/k = 0.693/k. k=0.1 s^-¹. Finden Sie t_1/_2.",
            hl_second_order: "Zweiter Ordnung: t_1/_2 = 1/(k[A]₀). k=0.5 M^-¹s^-¹, [A]₀=2 M. Berechnen Sie t_1/_2.",
            hl_zero_order: "Nullter Ordnung: t_1/_2 = [A]₀/(2k). k=0.4 M/s, [A]₀=4 M. Finden Sie t_1/_2.",
            hl_remaining: "Nach 2 Halbwertszeiten, welcher Bruchteil bleibt? [A]₀=8 M → [A]=?",
            hl_time: "75% Zerfall bedeutet 2 Halbwertszeiten. Wenn t_1/_2=10s, Gesamtzeit = 20s.",
            hl_find_k: "Aus t_1/_2=5s (erste Ordnung), berechnen Sie k = ln(2)/t_1/_2.",
            hl_fraction: "Nach 3 Halbwertszeiten: Bruchteil = (1/2)^{3} = 1/8 = 0.125.",
            hl_radioactive: "Radioaktiver Zerfall: N = N₀(1/2)^(t/t_1/_2). N₀=1000, t=20s, t_1/_2=10s. Finden Sie N.",
            hl_drug: "Arzneimittelausscheidung: [D]₀=100 mg/L, t_1/_2=4h, t=12h (3 Halbwertszeiten). [D]=12.5 mg/L.",
            hl_compare: "Vergleichen Sie zwei Reaktionen: kA=0.2, kB=0.4. Verhältnis der Halbwertszeiten = kB/kA = 2.",
            hl_consecutive: "Aufeinanderfolgende A→B→C: Maximum [B] bei tmax = ln(k_1/k_2)/(k_1-k_2). k_1=0.5, k_2=0.2.",
            hl_parallel: "Parallele Pfade: kgesamt = k_1+k_2. k_1=0.3, k_2=0.2, t_1/_2 = ln(2)/0.5.",
            hl_reversible: "Reversibel: [A]eq = [A]₀·kr/(kf+kr). kf=0.5, kr=0.1.",
            hl_temperature: "t_1/_2 nimmt mit Temperatur ab. Bei 350K vs 300K mit Ea=50 kJ/mol.",
            hl_enzyme: "Enzym-Turnover: kcat=100 s^-¹. t_1/_2 = ln(2)/kcat = 0.007s.",
            hl_isotope_dating: "Kohlenstoff-14-Datierung: N/N₀=0.25 = (1/2)^{2}. Alter = 2×5730 = 11460 Jahre.",
            hl_branching: "Verzweigter Zerfall: α und β Pfade. kα/kβ=2, also fα = 2/3 = 0.67.",
            hl_secular: "Säkulares Gleichgewicht: Mutter t_1/_2 >> Tochter t_1/_2. Aktivitätsverhältnis → 1.",
            hl_transient: "Transientes Gleichgewicht: tmax wenn Tochteraktivität Spitze erreicht. t_1/_2,1=10, t_1/_2,2=2.",
            hl_cosmogenic: "¹⁰Be kosmogene Datierung: t_1/_2=1.39×10^6 Jahre. N/N₀=0.5 → Alter = t_1/_2."
        }
    },
    sc2_02: {
        back: "Zurück zum Nexus",
        title: "SC2.02 // pH SENTINEL",
        difficulty: {
            basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE"
        },
        objective_title: "Aktives Missionsziel",
        target_title: "Titrationsanalyse",
        next: "Nächste Analyse",
        check: "Prüfen",
        correct: "Titration akkurat",
        incorrect: "pH-Wert fehlerhaft",
        ready: "Bereit",
        monitor_title: "SC2.02_TITRATIONS_MONITOR",
        footer_left: "SC2.02_PH_SENTINEL // KNOTEN: BASEL",
        stages: {
            curves: "PH-KURVEN",
            equivalence: "ÄQUIVALENZ",
            indicators: "INDIKATOREN"
        },
        labels: {
            initial_ph: "Initialer pH",
            added_vol: "Volumen (mL)",
            eq_point: "Äquivalenzpunkt",
            indicator: "Indikator",
            strong_acid: "Starke Säure",
            weak_acid: "Schwache Säure",
            formula: "Titrationsformel"
        },
        prompts: {
            curve_type: "Der pH-Wert ist {ph}. Säuretyp? (Stark=1, Schwach=2).",
            find_eq: "Va=50mL, Ca=0.1M, Cb=0.2M. Finde Vb am Äquivalenzpunkt.",
            select_indicator: "Schwache Säure + Starke Base. Indikator? Phenol(1), MethylO(2).",
            weak_ph_calc: "Am Halbäquivalenzpunkt (pH = pKa). Wenn pKa = 4.75, pH?",
            eq_ph_guess: "Äquivalenz-pH bei Stark/Stark? (<7=1, 7=2, >7=3).",
            conc_calc: "20mL Säure werden durch 10mL 0.2M NaOH neutralisiert. Finde Ca."
        },
        scenarios: {
            water_quality: "IWB Basler Wasserfiltration: Sie sind Techniker für Wasserqualität im Filtrationswerk der Industriellen Werke Basel (IWB) am Rhein. Ihre Aufgabe ist es, sicherzustellen, dass der pH-Wert des aufbereiteten Trinkwassers innerhalb eines strengen Bereichs (normalerweise 7,2 bis 8,5) bleibt, um Korrosion im städtischen Rohrnetz zu verhindern. Heute führen Sie eine Präzisionstitration an einer Probe aus der Grundwasseranreicherung Langen Erlen durch. Die Probe zeigt aufgrund starker Regenfälle, die das Mineralgleichgewicht des Flusses beeinflusst haben, einen leichten Anstieg des Säuregehalts. Mit einer Standard-NaOH-Lösung müssen Sie den Gesamtsäuregehalt (Alkalität) bestimmen, um das Kalkdosierungssystem zu kalibrieren. Eine genaue pH-Kontrolle ist lebenswichtig, da zu saures Wasser Schwermetalle aus alten Leitungen in die Häuser der Basler Bürger lösen kann. Es ist genau wie wenn Sie einen Teststreifen verwenden, um den pH-Wert Ihres Pools zu prüfen, damit das Wasser sicher und klar bleibt.",
            biotech_titration: "CSL Behring Basel - Proteinstabilität: Sie sind Laborspezialist in der hochmodernen Anlage von CSL Behring in Basel und arbeiten an der Reinigung von aus Plasma gewonnenen Proteinen zur Behandlung seltener Krankheiten. Diese Proteine reagieren extrem empfindlich auf ihre Umgebung; schon eine geringe Abweichung vom optimalen pH-Wert kann dazu führen, dass sie denaturieren oder ihre therapeutische Wirkung verlieren. Während des abschließenden Pufferaustauschprozesses müssen Sie eine Titration durchführen, um die Pufferkapazität der Lösung zu überprüfen. Sie testen, ob das aktuelle System aus schwacher Säure und konjugierter Base pH-Änderungen widerstehen kann, wenn eine kleine Menge pharmazeutischer Inhaltsstoff hinzugefügt wird. Ihre Präzision stellt sicher, dass diese lebensrettenden Medikamente während des Transports und der Lagerung in der ganzen Schweiz stabil bleiben. Dieses Gleichgewicht ähnelt der richtigen Ölviskosität in einem Hochleistungsmotor, damit dieser ohne Überhitzung reibungslos läuft.",
            environmental_monitoring: "Rhein-Ökologieforschung - Biozentrum: Sie sind Umweltforscher am Biozentrum der Universität Basel und überwachen die Auswirkungen von städtischem Abfluss auf das empfindliche Ökosystem des Rheins. Nach einem größeren Industrieprojekt flussaufwärts müssen Sie beurteilen, ob sich das pH-Profil des Flusses verschoben hat, was die Laichgründe der Rheinlachs gefährden könnte. Sie nehmen Proben in der Nähe des Dreiländerecks, wo Frankreich, Deutschland und die Schweiz aufeinandertreffen, und führen eine detaillierte Titration durch, um das Vorhandensein schwacher organischer Säuren festzustellen. Die Form der Titrationskurve, die Sie heute generieren, wird die Konzentration dieser Schadstoffe offenbaren. Das Verständnis dieser chemischen Verschiebungen ist für das Kantonslabor unerlässlich, um Umweltschutzgesetze durchzusetzen. Es ist genau wie ein Gärtner, der den pH-Wert des Bodens überwacht, um sicherzustellen, dass seine Pflanzen die Nährstoffe aufnehmen können, die sie zum Wachsen brauchen.",
            gastro_science: "Basler Gourmetküche - Kulinarische Chemie: Sie sind spezialisierter Lebensmittelwissenschaftler und arbeiten mit einem Michelin-Sterne-Restaurant im Grossbasel zusammen. Die moderne Gastronomie stützt sich stark auf die präzise Kontrolle des Säuregehalts, um Aromen auszubalancieren und die Textur von feinen Saucen oder Fruchtgelen zu steuern. Sie analysieren den Zitronensäuregehalt in einer lokalen Spezialität, um sicherzustellen, dass sie einen pH-Wert von 3,2 beibehält, was sowohl für den frischen Geschmack als auch für die sichere Konservierung des Produkts entscheidend ist. Durch eine Titration mit einer lebensmittelechten Base bestimmen Sie die exakte Säurekonzentration. Dieser wissenschaftliche Ansatz ermöglicht es dem Küchenchef, bei jeder Portion perfekte Konsistenz zu erreichen. Es ist genau wie wenn Sie einen Spritzer Zitrone zu einem schweren Gericht hinzufügen – Sie nutzen Chemie, um die Aromen an Ihrem Gaumen auszubalancieren."
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
        },
        scenarios: {
            gas_compression: "Basler Industriegas-Service: Optimierung der Lagerung von komprimierten Gasen für Industrie und Medizin in der Nordwestschweiz.",
            weather_balloons: "Meteorologie der Universität Basel: Anwendung des Charles-Gesetzes zur Vorhersage der Ausdehnung von Forschungsballons.",
            chemical_reactors: "Lonza Chemical Engineering: Die präzise Steuerung der Druck-Volumen-Beziehungen in Reaktoren ist entscheidend für die Sicherheit."
        },
        prompts: {
            bvb_brake: "BVB Trambremse: Luft V={V} L bei P={P} bar. Komprimiert auf V2={V2} L. Neuer Druck P2?",
            euroairport: "EuroAirport Kabine: Luftprobe bei T1={t1} K, P1={p1} kPa. Auf Höhe T2={t2} K, P2={p2} kPa. Volumenverhältnis V2/V1?",
            wickelfisch: "Rhein-Wickelfisch: Luft V={v1} L bei T1={t1} K (Sonne). Untergetaucht in T2={t2} K Wasser. Neues Volumen V2?",
            fire_dept: "Berufsfeuerwehr Basel: O2-Tank V={V} L, P={P} bar. Verbrauch {r} L/min (bei 1 bar). Dauer in Minuten?",
            geothermal: "Geopower Basel: Methanblase steigt aus Tiefe (P1={p1} bar, T1={t1} K) zur Oberfläche (P2=1 bar, T2={t2} K). Expansionsfaktor?"
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
        },
        scenarios: {
            pharma_solubility: "Novartis Formulierung: Das Verständnis der Temperaturabhängigkeit der Löslichkeit ist essenziell für die Entwicklung von Medikamenten.",
            rhine_pollution_monitoring: "Basler Labor für Umweltanalyse: Überwachung der Löslichkeit von Umweltkontaminanten im Rheinwasser bei saisonalen Temperaturschwankungen.",
            crystallization_purification: "Roche Chemische Produktion: Großtechnische Kristallisation ist die primäre Methode zur Reinigung komplexer pharmazeutischer Wirkstoffe (APIs)."
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
            caffeine: "KOFFEIN",
            adrenaline: "ADRENALIN"
        },
        scenarios: {
            roche_aspirin: "Hoffmann-La Roche Basel - Das Erbe der Synthese: Sie sind Historiker im Roche-Turm und erforschen die Ursprünge der synthetischen Pharmazeutika in der Stadt. F. Hoffmann-La Roche war Ende des 19. Jahrhunderts ein Pionier und eines der ersten Unternehmen, das reines synthetisches Aspirin industriell herstellte. Dieser Durchbruch revolutionierte das Schmerzmanagement und legte den Grundstein dafür, dass Basel zu einem globalen Pharma-Hub wurde. Wenn Sie heute das Acetylsalicylsäure-Molekül zusammenbauen, replizieren Sie die Arbeit von Chemikern, die das Rheintal in ein Zentrum für molekulare Innovation verwandelten. Das Verständnis der 3D-Geometrie von Aspirin ist essenziell, da die räumliche Anordnung seiner funktionellen Gruppen bestimmt, wie es Enzyme im menschlichen Körper blockiert. Es ist, als würde man den richtigen Bauplan für eine Brücke entdecken, die Medizin mit der Linderung des Patienten verbindet.",
            novartis_molecular_engineering: "Novartis Campus Basel - Gezielte Therapie: Sie sind Wirkstoffchemiker auf dem Novartis Campus, einem der fortschrittlichsten Forschungszentren der Welt. Ihr Projekt umfasst das Design von 'Small Molecule'-Inhibitoren, die gezielt Krebszellen angreifen können, ohne gesundes Gewebe zu beeinträchtigen. Dieser 'Schlüssel-Schloss'-Mechanismus hängt vollständig von der 3D-Form und den elektronischen Eigenschaften der Moleküle ab, die Sie bauen. Durch Drehen und Inspizieren der Kugel-Stab-Modelle stellen Sie sicher, dass die Stereochemie für die Bindung an den Zielrezeptor korrekt ist. Das Basler Forschungsumfeld bietet die kooperativen Werkzeuge, die erforderlich sind, um die Lücke zwischen abstrakten chemischen Formeln und lebensrettenden Behandlungen zu schließen. Dieser Prozess ist wie das Anfertigen eines maßgeschneiderten Schlüssels für ein hochentwickeltes Schloss, bei dem nur die perfekte Passform eine Heilung ermöglicht.",
            basel_nano_hub: "Swiss Nanoscience Institute (SNI) - Atomare Bestückung: Sie sind Forscher am Swiss Nanoscience Institute der Universität Basel, wo die Grenzen zwischen Biologie und Physik verschwimmen. Ihre Arbeit konzentriert sich auf die molekulare Selbstorganisation, bei der Moleküle so entworfen werden, dass sie spontan komplexe Nanostrukturen bilden. Heute modellieren Sie eine Sequenz funktioneller Kohlenstoffringe, die als Gerüst für einen neuartigen Biosensor dienen sollen. Die Kontrolle der Bindungswinkel und -abstände ist in der Nanowelt entscheidend, da bereits eine Abweichung von einem Pikometer die gesamten Eigenschaften des Materials verändern kann. Diese Arbeit steht an der Spitze der Basler 'Nano-Tech'-Revolution und ermöglicht die Entwicklung intelligenterer, effizienterer Materialien. Stellen Sie es sich wie das Spielen mit LEGO-Steinen vor, aber die Steine sind Atome und die Bauanleitung sind die Gesetze der Quantenmechanik.",
            lonza_ag_scaling: "Lonza Basel - Industrielle Skalierung: Sie sind Prozessingenieur am globalen Hauptsitz von Lonza in Basel und spezialisiert auf den Übergang von der Laborsynthese zur Massenproduktion. Ihre Aufgabe ist es, sicherzustellen, dass komplexe organische Moleküle, wie spezialisierte Wirkstoffe (APIs), in Mengen von mehreren Tonnen ohne Reinheitsverlust produziert werden können. Die strukturelle Integrität des Moleküls muss während der Hochdruckreaktionen in den massiven Industriereaktoren von Basel gewahrt bleiben. Durch die heutige genaue Modellierung der 3D-Struktur identifizieren Sie potenzielle 'Engpässe' im Herstellungsprozess, bei denen Bindungsspannungen zu unerwünschten Nebenreaktionen führen könnten. Ihre Expertise hält Basel an der Spitze der chemischen Fertigungsexzellenz. Dies ist vergleichbar mit der Skalierung eines kleinen Prototyps eines Schiffes zu einem massiven Ozeandampfer, wobei sichergestellt wird, dass jede Schraube und jede Platte perfekt ausgerichtet ist.",
            basel_biozentrum_neuro: "Biozentrum Universität Basel - Stressreaktionsforschung: Als Forschungsstipendiat am Biozentrum untersuchen Sie die molekularen Mechanismen der 'Kampf-oder-Flucht'-Reaktion. Adrenalin (Epinephrin) ist das primäre Hormon und der Neurotransmitter, der diesen Pfad steuert. Ihre Aufgabe besteht darin, die genaue Platzierung der Sauerstoffatome am Catecholring zu identifizieren, was für seine Bindungsaffinität an adrenerge Rezeptoren entscheidend ist. Durch die genaue Modellierung dieser 3D-Struktur helfen Sie den Basler Wissenschaftlern zu verstehen, wie chronischer Stress die zelluläre Signalübertragung im Gehirn beeinflusst. Diese molekulare Kartierung ist die Grundlage für die Entwicklung neuer Behandlungen für Angststörungen in einer der führenden Schweizer Forschungseinrichtungen für Biowissenschaften."
        }
    },
    sc3_02: {
        back: "Zurück zum Nexus",
        title: "SC3.02 // GRUNDLAGEN DER ORGANISCHEN CHEMIE",
        check: "Verifizieren",
        next: "Weiter",
        correct: "Verifiziert",
        incorrect: "Fehlreaktion",
        ready: "Bereit",
        monitor_title: "SC3.02_ORGANIK_MONITOR",
        footer_left: "SC3.02_ORGANISCHE_GRUNDLAGEN // KNOTEN: BASEL",
        objective_title: "Aktuelles Missionsziel",
        difficulty: {
            basic: "BASIS",
            core: "KERN",
            advanced: "ERWEITERT",
            elite: "ELITE"
        },
        stages: {
            hydrocarbons: "KOHLENWASSERSTOFFE",
            functional_groups: "FUNKTIONELLE GRUPPEN",
            isomers: "ISOMERE"
        },
        labels: {
            molecule_display: "Molekülanzeige",
            input_terminal: "Eingabeterminal",
            view_3d: "3D-Ansicht",
            organic_mastery: "Organische Meisterschaft"
        },
        prompts: {
            name_formula: "Was ist die Summenformel für {name}?",
            functional_group: "Was ist die funktionelle Gruppe in {name}?",
            isomer_count: "Wie viele Isomere hat {formula}?",
            hint_carbons: "Dieses Molekül hat {count} Kohlenstoffatome",
            hint_group: "Suche nach der charakteristischen Gruppe in {example}",
            hint_isomer: "Betrachte {type}-Isomere"
        },
        feedback: {
            correct: "Organische Struktur verstanden!",
            incorrect: "Überprüfe die Molekülstruktur."
        },
        scenarios: {
            lonza_feedstock: "Lonza Basel liefert kritische chemische Rohstoffe und Zwischenprodukte, die weltweit für komplexe organische Synthesen benötigt werden.",
            basel_polymer_research: "Polymerwissenschaftler in Basel entwickeln neue organische Materialien mit einzigartigen Eigenschaften für medizinische Implantate und Elektronik.",
            green_chemistry: "Die Green-Chemistry-Initiativen der Universität Basel zielen darauf ab, die Umweltauswirkungen der organischen Synthese durch katalytische Innovationen zu verringern.",
            fragrance_design: "Givaudan in Basel kombiniert organische Chemie mit künstlerischer Intuition, um die nächste Generation globaler Düfte zu entwerfen."
        }
    },
    sc3_03: {
        back: "Zurück zum Nexus",
        title: "SC3.03 // ORGANISCHE REAKTIONEN",
        difficulty: {
            basic: "BASIS",
            core: "KERN",
            advanced: "ERWEITERT",
            elite: "ELITE"
        },
        next: "Nächste Sequenz ausführen",
        check: "Verifizieren",
        correct: "Verifiziert",
        incorrect: "Fehlreaktion",
        ready: "Bereit",
        monitor_title: "SC3.03_REAKTIONS_MONITOR",
        footer_left: "SC3.03_ORGANISCHE_REAKTIONEN // KNOTEN: BASEL",
        objective_title: "Aktuelles Missionsziel",
        stages: {
            combustion: "VERBRENNUNG",
            substitution: "SUBSTITUTION",
            addition: "ADDITION"
        },
        labels: {
            reaction_display: "Reaktionsanzeige",
            input_terminal: "Eingabeterminal",
            animation_speed: "Animationsgeschwindigkeit",
            show_mechanism: "Mechanismus anzeigen",
            chemistry_score: "Chemie-Punktzahl"
        },
        prompts: {
            combustion: "Vollständige Verbrennung von {reactant} produziert CO_2 und H_2O. Wie viele CO_2-Moleküle?",
            substitution: "Wenn {alkane} mit {halogen} unter UV-Licht reagiert, was ist das Hauptprodukt?",
            addition: "Wenn {alkene} mit {reagent} reagiert, was ist das Produkt?",
            hint_combustion: "Zähle die Kohlenstoffatome im Reaktanten",
            hint_substitution: "Ein H-Atom wird durch ein Halogenatom ersetzt",
            hint_addition: "Die Doppelbindung öffnet sich und addiert das Reagenz"
        },
        scenarios: {
            novartis_combustion: "Novartis Energie-Labor - Thermodynamische Optimierung: Sie sind Energieeffizienz-Analyst am Novartis-Hauptsitz in Basel und optimieren die Verbrennungsprozesse zur Wärmeerzeugung für die großtechnische pharmazeutische Synthese. Durch die Sicherstellung einer vollständigen Verbrennung von Methan und anderen Kohlenwasserstoff-Brennstoffen maximieren Sie die Energieausbeute und minimieren gleichzeitig die Bildung schädlicher Nebenprodukte wie Kohlenmonoxid. Im Rahmen der Basler Verpflichtung zu nachhaltigen Betrieben muss jedes Kilojoule Energie berücksichtigt werden. Die Berechnung der stöchiometrischen CO2-Menge ist der erste Schritt zur Überprüfung des CO2-Fußabdrucks der Anlage. Es ist wie das Feinabstimmen eines massiven Motors, bei dem der Brennstoff hochreiner Kohlenwasserstoff ist und das Ziel absolute Effizienz ist.",
            basel_chemical_plant: "Syngenta Basel - Selektive Halogenierung: Sie sind Prozesschemiker im Syngenta-Forschungszentrum in Basel und arbeiten an der Synthese neuer Pflanzenschutzmittel. Ihr Projekt erfordert die selektive Substitution eines Wasserstoffatoms durch ein Chlor- oder Bromatom an einer spezifischen Alkankette. Diese radikalische Substitutionsreaktion, die durch kontrollierte UV-Licht-Bestrahlung am Rheinufer initiiert wird, ist ein Eckpfeiler der organischen Synthese im Basler Chemie-Cluster. Präzision ist alles; eine zusätzliche Substitution könnte die Bioaktivität des Moleküls vollständig verändern. Diese Aufgabe ähnelt der eines Uhrmachermeisters, der ein einzelnes Zahnrad in einem komplexen Uhrwerk austauscht – eine präzise Änderung transformiert die gesamte Funktion des Systems.",
            polymer_production: "Lonza Basel - Fortschrittliche Additionspolymere: Sie sind Polymerwissenschaftler bei Lonza in Basel und spezialisiert auf die Entwicklung von Hochleistungsmaterialien für medizinische Geräte. Ihre Arbeit konzentriert sich auf Additionsreaktionen, bei denen Alkene zu langen, stabilen Ketten polymerisiert werden. Durch das Öffnen der Doppelbindungen von Monomeren wie Ethen oder Propen schaffen Sie Materialien mit spezifischen mechanischen Eigenschaften, die für chirurgische Implantate erforderlich sind. Die lange Geschichte der industriellen Chemie in Basel bietet das perfekte Ökosystem für diese Art von Innovation. Dieser Prozess ist wie der Bau einer langen, unzerbrechlichen Brücke, indem man Tausende von individuellen, hochfesten Gliedern zusammensteckt.",
            free_radical_mechanism: "Universität Basel - Radikaldynamik: Als Doktorand am Departement Chemie der Universität Basel untersuchen Sie die Übergangszustände der radikalischen Halogenierung. In der Basler Laborumgebung nutzen Sie fortschrittliche Laserspektroskopie, um die flüchtigen Momente zu beobachten, in denen ein Halogenradikal eine Alkankette angreift. Das Verständnis dieser rasanten Reaktionen ist entscheidend für die Entwicklung sichererer und effizienterer industrieller Prozesse. Es ist wie eine Sportfotografie, die genau die Millisekunde einfängt, in der ein Ball einen Schläger trifft – nur dass der Ball ein Halogenatom und der Schläger eine Kohlenstoff-Wasserstoff-Bindung ist.",
            reaction_control: "Roche Basel - Prozesssicherheit & Analytik: Sie sind Sicherheitsingenieur am Roche-Produktionsstandort in Basel und überwachen die exotherme Natur von Additionsreaktionen. Viele organische Reaktionen setzen erhebliche Wärme frei, die in den massiven Basler Industriereaktoren sorgfältig gesteuert werden muss, um 'Runaway'-Bedingungen zu verhindern. Durch die genaue Vorhersage der Produktausbeute und Stöchiometrie stellen Sie sicher, dass die Kühlsysteme perfekt auf den Reaktionsmaßstab kalibriert sind. Ihre Wachsamkeit hält die Anlagen am Rhein sicher und produktiv. Das ist wie ein Fluglotse, bei dem jeder Parameter innerhalb eines strengen 'Envelopes' bleiben muss, um eine erfolgreiche Reise von den Reaktanten zu den Produkten zu gewährleisten."
        },
        feedback: {
            correct: "Reaktionsmechanismus verstanden!",
            incorrect: "Überprüfe den Reaktionsmechanismus."
        }
    },
    sc3_05: {
        back: "Zurück zum Nexus",
        title: "SC3.05 // MOLEKULARE SCHMIEDE",
        difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
        objective_title: "Aktuelles Missionsziel",
        monitor_title: "Orbital-Stabilitätsmonitor",
        footer_left: "SC3.05_BINDUNG // KNOTEN: BASEL",
        check: "Überprüfen",
        next: "Nächste Synthese",
        correct: "Geometrie optimiert",
        incorrect: "Bindungskonflikt",
        ready: "Bereit",
        stages: {
            vsepr: "VSEPR-GEOMETRIE",
            hybridization: "ORBITAL-HYBRIDISIERUNG",
            mo_theory: "MOLEKÜLORBITALTHEORIE (MO)"
        },
        labels: {
            electron_density: "Elektronendichte",
            bond_angle: "Bindungswinkel",
            hybrid_type: "Hybridisierungstyp",
            bond_order: "Bindungsordnung",
            paramagnetism: "Magnetische Eigenschaft",
            lone_pairs: "Freie Elektronenpaare",
            bonded_atoms: "Gebundene Atome"
        },
        prompts: {
            vsepr_geometry: "Bestimmen Sie die Geometrie für {molecule} mit {lone} freien Elektronenpaaren und {bonded} gebundenen Atomen.",
            hybridization_type: "Was ist die Hybridisierung des Zentralatoms in {molecule}?",
            bond_order_calc: "Berechnen Sie die Bindungsordnung für {ion} mittels MO-Theorie.",
            paramagnetic: "Ist {molecule} laut MO-Theorie paramagnetisch oder diamagnetisch?",
            hint_vsepr: "Zählen Sie die Gesamtzahl der Elektronendomänen um das Zentralatom.",
            hint_hybrid: "sp entspricht 2 Domänen, sp2 entspricht 3, sp3 entspricht 4.",
            hint_mo: "Bindungsordnung = (Bindend - Antibindend) / 2.",
            hint_paramagnetism: "Ungepaarte Elektronen führen zu Paramagnetismus."
        },
        scenarios: {
            basel_catalysis: "Universität Basel - Katalysezentrum: Forscher untersuchen, wie die Molekülgeometrie von Katalysatoren Reaktionsraten und Selektivität beeinflusst.",
            syngenta_agrochemicals: "Syngenta Basel: Wissenschaftler entwickeln Pestizidmoleküle, indem sie deren 3D-Geometrie für maximale Rezeptorbindung optimieren.",
            quantum_chem_lab: "Schweizer Labor für Quantenchemie: Einsatz von Supercomputern zur Berechnung von Molekülorbitalenergien für das Design neuer Materialien.",
            pharmaceutical_design: "Advanced Drug Design Basel: Das Verständnis des Hybridisierungszustands ist entscheidend für die Vorhersage der Reaktivität von Wirkstoffvorstufen."
        },
        feedback: {
            correct: "Molekülgeometrie und Bindung verifiziert!",
            incorrect: "Geometrie instabil. Berechnen Sie die Orbitalwechselwirkungen neu."
        }
    },
    sc3_04: {
        back: "Zurück zum Nexus",
        title: "SC3.04 // FUNKTIONALER HORIZONT",
        difficulty: {
            basic: "BASIS",
            core: "KERN",
            advanced: "FORTGESCHRITTEN",
            elite: "ELITE"
        },
        next: "Nächste Sequenz ausführen",
        check: "Verifizieren",
        correct: "Verifiziert",
        incorrect: "Fehlanpassung",
        ready: "Bereit",
        monitor_title: "SC3.04_FUNKTIONALE_MONITOR",
        footer_left: "SC3.04_FUNKTIONALER_HORIZONT // KNOTEN: BASEL",
        objective_title: "Aktuelles Missionsziel",
        stages: {
            alcohols: "ALKOHOLE & ALDEHYDE",
            acids: "CARBONSAÜREN",
            esters: "ESTER & EIGENSCHAFTEN"
        },
        labels: {
            group_display: "Funktionelle Gruppen Ansicht",
            property_stats: "Molekulare Eigenschaften",
            boiling_point: "Siedepunkt",
            solubility: "Wasserlöslichkeit",
            acidity: "Relative Azidität"
        },
        prompts: {
            identify_group: "Identifiziere die funktionelle Gruppe in {molecule}.",
            predict_bp: "Welches Molekül hat den höchsten Siedepunkt?",
            solubility_check: "Ist {molecule} in Wasser löslich?",
            acid_strength: "Vergleiche die Azidität von {a} und {b}."
        },
        scenarios: {
            novartis_fragrance: "Novartis Duftstoff-Division: Viele angenehme Düfte in Basels Parks stammen von Alkoholen und Aldehyden. Kleine Aldehyde haben oft fruchtige oder blumige Noten, während langkettige Alkohole als Fixateure in Schweizer Parfüms verwendet werden.",
            roche_bioactive: "Roche Bioactive Lab: Carbonsäuren sind wesentliche funktionelle Gruppen in vielen in Basel entdeckten Medikamenten. Sie dienen oft als 'saurer Kopf', der an Proteinrezeptoren im menschlichen Körper bindet.",
            basel_flavor: "Basel Flavor Laboratory: Schweizer Süßwaren verdanken ihren reichen Geschmack Estern. Diese Verbindungen entstehen durch die Reaktion eines Alkohols mit einer Säure und erzeugen die charakteristischen Erdbeer- oder Birnenaromen.",
            solubility_science: "Löslichkeitsforschung bei Novartis: Funktionelle Gruppen bestimmen, ob sich ein Medikament im Blutkreislauf auflöst. Hydroxylgruppen (-OH) erhöhen die Wasserlöslichkeit durch Wasserstoffbrückenbindungen, ein entscheidender Faktor für orale Medikamente.",
            molecular_interplay: "Molekulares Zusammenspiel in Basel: Der Siedepunkt einer Substanz hängt von den zwischenmolekularen Kräften ab. Carbonsäuren bilden starke Wasserstoffbrücken-Dimere, was zu viel höheren Siedepunkten führt als bei Aldehyden ähnlicher Masse."
        },
        feedback: {
            correct: "Meisterschaft der funktionellen Gruppen erreicht!",
            incorrect: "Untersuchen Sie die Molekülstruktur sorgfältig."
        }
    },
    gc1_02: {
        back: "Zurück zum Nexus",
        title: "GC1.02 // ELEKTROLYSE-LABOR",
        difficulty: {
            basic: "BASIS",
            core: "KERN",
            advanced: "ERWEITERT",
            elite: "ELITE"
        },
        next: "Nächste Sequenz ausführen",
        check: "Verifizieren",
        correct: "Verifiziert",
        incorrect: "Fehlanpassung",
        ready: "Bereit",
        monitor_title: "GC1.02_ELEKTROLYSE_MONITOR",
        footer_left: "GC1.02_ELEKTROLYSE-LABOR // KNOTEN: BASEL",
        objective_title: "Aktuelles Missionsziel",
        stages: {
            principles: "PRINZIPIEN",
            plating: "GALVANISIERUNG",
            corrosion: "KORROSIONSSCHUTZ"
        },
        labels: {
            voltage: "Angelegte Spannung",
            current: "Stromstärke (I)",
            mass_deposited: "Abschiedene Masse",
            time: "Dauer (s)",
            power_status: "Stromversorgungsstatus"
        },
        prompts: {
            calc_mass: "Berechnen Sie die Masse von {metal}, die bei {current}A in {time}s abgeschieden wird.",
            identify_anode: "Bei der Elektrolyse von {solution}, welche Spezies wird an der Anode oxidiert?",
            plating_setup: "An welche Elektrode sollte das Objekt zur Galvanisierung angeschlossen werden?",
            corrosion_protection: "Wählen Sie die beste Opferanode zum Schutz von {metal}."
        },
        scenarios: {
            basel_metal_refinery: "Basler Metallraffinerie: Die industrielle Elektrolyse am Rheinhafen gewinnt reine Metalle aus Erzen. Hohe Energieeffizienz wird durch präzise Steuerung von Zellspannung und Stromdichte erreicht.",
            swiss_watchmaking: "Schweizer Uhrenherstellung: Die Gold- und Silberbeschichtung von in Basel gefertigten Uhren nutzt Präzisionsgalvanik. Die Dicke der Beschichtung wird durch Faradays erstes Elektrolysegesetz bestimmt.",
            rhine_infrastructure: "Rhein-Infrastruktur: Der Schutz der Basler Rheinbrücken vor Korrosion erfordert kathodischen Schutz. Opferanoden aus Magnesium werden an den Stahlpfeilern angebracht, um Rost durch bevorzugte Oxidation zu verhindern.",
            faraday_law: "Faradays Erbe: Michael Faradays Gesetze quantifizieren die Beziehung zwischen Elektrizität und Masse bei der Elektrolyse. Ein Faraday entspricht der Ladung eines Mols Elektronen, etwa 96.485 Coulomb.",
            industrial_plating: "Industrielle Galvanik: Großflächige Galvanisierung in Basler Industriegebieten bietet Korrosionsbeständigkeit für Automobil- und Luftfahrtkomponenten. Cyanidfreie Bäder sind heute Standard für die Umweltsicherheit."
        },
        feedback: {
            correct: "Elektrolytischer Prozess verstanden!",
            incorrect: "Überprüfen Sie die Faradayschen Gesetze und Elektrodenpotentiale."
        }
    },
    sc2_05: {
        back: "Zurück zum Nexus",
        title: "SC2.05 // SÄURE-BASE-CHEMIE",
        difficulty: {
            basic: "BASIS",
            core: "KERN",
            advanced: "ERWEITERT",
            elite: "ELITE"
        },
        stages: {
            ph_basics: "PH-GRUNDLAGEN",
            neutralization: "NEUTRALISATION",
            titration: "TITRATIONSANALYSE"
        },
        scenarios: {
            ph_basics: "Novartis Pharmazeutische pH-Kontrolle: Sie sind Formulierungswissenschaftler bei Novartis Basel und entwickeln ein neues orales Medikament. Die Stabilität und Bioverfügbarkeit des Arzneimittels hängen entscheidend vom pH-Wert ab. Im Magen (pH 1,5) muss der Wirkstoff stabil bleiben, während er im Blutkreislauf (pH 7,4) schnell gelöst werden muss. Sie testen Puffersysteme, um den optimalen pH-Bereich während der Herstellung und Lagerung aufrechtzuerhalten. Mit Präzisions-pH-Metern und Henderson-Hasselbalch-Berechnungen passen Sie das Verhältnis von schwacher Säure zu konjugierter Base an. Eine Abweichung von nur 0,2 pH-Einheiten könnte die gesamte Charge unwirksam machen und Tausende von Patienten in der Schweiz betreffen. Diese pharmazeutische pH-Kontrolle ähnelt der Art und Weise, wie das Blut Ihres Körpers einen engen pH-Bereich aufrechterhält, um Sie gesund zu halten.",
            neutralization: "Universitätsspital Basel Magenbehandlung: Sie sind klinischer Apotheker am Universitätsspital Basel und bereiten Antazida-Formulierungen für Patienten mit schwerem Säurereflux vor. Der Magen produziert Salzsäure (HCl) bei pH 1-2, was schmerzhafte Symptome verursacht. Ihre Aufgabe ist es, die genaue Menge an Natriumbicarbonat (NaHCO_3) zu berechnen, die benötigt wird, um die überschüssige Säure zu neutralisieren, ohne auf alkalischen pH zu überschießen, was andere Komplikationen verursachen könnte. Sie müssen das Magenvolumen des Patienten (ca. 50 ml bei leerem Magen) und die Säurekonzentration berücksichtigen. Die Neutralisationsreaktion produziert CO_2-Gas, das Patienten als Aufstoßen erleben. Präzise stöchiometrische Berechnungen gewährleisten wirksame Linderung bei minimalen Nebenwirkungen. Dies ist genau wie das Hinzufügen von Backpulver zu Essig in Ihrer Küche, aber mit medizinischer Präzision.",
            titration: "Roche Qualitätskontrolllabor: Sie sind Qualitätskontrollanalyst im Basler Hauptsitz von Roche und führen Titrationsanalysen durch, um die Reinheit einer neuen Arzneimittelverbindung zu überprüfen. Mit einer kalibrierten Bürette fügen Sie tropfenweise standardisierte NaOH-Lösung zu einer in Wasser gelösten Probe des Arzneimittels hinzu. Eine pH-Elektrode überwacht kontinuierlich die Lösung und erzeugt eine Titrationskurve auf Ihrem Computerbildschirm. Der scharfe pH-Sprung am Äquivalenzpunkt zeigt vollständige Neutralisation an, und das verwendete Volumen des Titriermittels zeigt die genaue Konzentration des Arzneimittels. Jede Abweichung von der angegebenen Reinheit (mindestens 99,5%) löst eine vollständige Chargenuntersuchung aus. Diese analytische Präzision stellt sicher, dass jedes Roche-Medikament den Schweizer Pharmastandards entspricht. Es ist wie die Verwendung eines präzisen Messbechers, um sicherzustellen, dass Ihr Rezept jedes Mal perfekt wird."
        },
        prompts: {
            calculate_ph: "Berechnen Sie den pH-Wert der Lösung.",
            find_concentration: "Bestimmen Sie die Konzentration der Säure oder Base.",
            equivalence_point: "Finden Sie das Volumen am Äquivalenzpunkt.",
            buffer_ph: "Berechnen Sie den pH-Wert des Puffersystems.",
            neutralization_moles: "Berechnen Sie die Molzahl des gebildeten Produkts."
        },
        labels: {
            acid: "Säure",
            base: "Base",
            salt: "Salz",
            water: "Wasser",
            ph: "pH",
            concentration: "Konzentration",
            volume: "Volumen",
            indicator: "Indikator"
        },
        check: "Überprüfen",
        next: "Nächste Herausforderung",
        correct: "Reaktion verifiziert",
        incorrect: "Gleichgewicht prüfen",
        ready: "Bereit",
        monitor_title: "SC2.05_SÄUREBASE_MONITOR",
        footer_left: "SC2.05_SÄUREBASE // KNOTEN: BASEL",
        scenario_title: "BASEL-SZENARIO",
        objective_title: "PROBLEM",
        answer_title: "IHRE ANTWORT"
    },
    sc2_06: {
        back: "Zurück zum Nexus",
        title: "SC2.06 // REDOXREAKTIONEN",
        difficulty: {
            basic: "BASIS",
            core: "KERN",
            advanced: "ERWEITERT",
            elite: "ELITE"
        },
        stages: {
            oxidation_state: "OXIDATIONSSTUFEN",
            electron_transfer: "ELEKTRONENTRANSFER",
            electrochemistry: "ELEKTROCHEMIE"
        },
        scenarios: {
            oxidation_state: "Novartis Arzneimittelsynthese Oxidationskontrolle: Sie sind synthetischer Chemiker bei Novartis Basel und arbeiten an einer komplexen pharmazeutischen Synthese. Der Wirkstoff erfordert eine präzise Oxidationsstufenkontrolle eines Übergangsmetallkatalysators. In Ihrer aktuellen Reaktion wechselt Mangan zwischen +4 und +7 Oxidationsstufen, um die C-H-Bindungsaktivierung zu erleichtern. Sie müssen Oxidationsstufenänderungen durch jeden Schritt verfolgen, um unerwünschte Nebenreaktionen zu verhindern. Mit spektroskopischer Analyse überwachen Sie die violette Farbe von Permanganat (Mn^7^+), die sich in braunes Mangandioxid (Mn^{4}^+) umwandelt. Eine einzige Elektronenfehlberechnung könnte zu toxischen Nebenprodukten führen und die gesamte Charge unbrauchbar machen. Diese Oxidationsstufenverfolgung ist entscheidend für die Herstellung sicherer, wirksamer Medikamente für Patienten in der ganzen Schweiz. Das Verständnis von Oxidationsstufen ist wie das Verfolgen von Bankkontoguthaben – Sie müssen genau wissen, wie viele Elektronen jedes Atom gewonnen oder verloren hat.",
            electron_transfer: "Roche Batterietechnologieentwicklung: Sie sind Materialwissenschaftler in der Energieforschungsabteilung von Roche in Basel und entwickeln Lithium-Ionen-Batterien der nächsten Generation für medizinische Geräte. Das Kathodenmaterial der Batterie (LiCoO_2) durchläuft während der Lade- und Entladezyklen reversiblen Elektronentransfer. Kobalt wechselt zwischen +3 und +4 Oxidationsstufen, während Lithiumionen ein- und ausströmen. Sie müssen die Redoxgleichungen ausgleichen, um Energiedichte und Zykluslebensdauer zu optimieren. Jede Batteriezelle muss genau 3,7 V für über 500 Ladezyklen liefern, um tragbare Insulinpumpen und Herzmonitore zuverlässig mit Strom zu versorgen. Die Effizienz des Elektronentransfers wirkt sich direkt auf die Patientensicherheit aus – eine ausfallende Batterie in einem kritischen medizinischen Gerät könnte lebensbedrohlich sein. Dies ähnelt einer wiederaufladbaren Telefonbatterie, jedoch mit medizinischer Präzision und Zuverlässigkeitsanforderungen.",
            electrochemistry: "Basler Industriegalvanik-Erbe: Sie sind Verfahrensingenieur in einem Basler Metallveredelungsunternehmen und setzen die 500-jährige Tradition der Stadt in präziser Metallbearbeitung fort. Heute galvanisieren Sie chirurgische Instrumente mit einer dünnen Goldschicht für Korrosionsbeständigkeit und Biokompatibilität. Mit der Nernst-Gleichung berechnen Sie das Zellpotential, das erforderlich ist, um genau 2,5 Mikrometer Gold auf Edelstahlpinzetten abzuscheiden. Die elektrochemische Zelle arbeitet bei 1,5 V mit sorgfältig kontrollierter Stromdichte. Zu viel Strom verursacht raue, poröse Ablagerungen; zu wenig verlängert die Verarbeitungszeit unwirtschaftlich. Sie wenden die Faradayschen Gesetze an, um festzustellen, dass 3,2 Ampere für 45 Minuten die erforderliche Masse abscheiden. Diese elektrochemische Präzision stellt sicher, dass in Basel hergestellte chirurgische Werkzeuge internationalen medizinischen Standards entsprechen und den Ruf der Stadt für Qualitätshandwerk aufrechterhalten."
        },
        prompts: {
            oxidation_state: "Was ist die Oxidationsstufe von {element} in {formula}?",
            oxidation_state_complex: "Bestimmen Sie die Oxidationsstufe von {element} im Komplex {formula}.",
            oxidation_state_organic: "Was ist die Oxidationsstufe von {element} in der organischen Verbindung {formula}?",
            oxidizing_agent: "Identifizieren Sie in der Reaktion {reaction} das Oxidationsmittel.",
            reducing_agent: "Identifizieren Sie in der Reaktion {reaction} das Reduktionsmittel.",
            electrons_transferred: "Wie viele Elektronen werden in der Halbreaktio {reaction} übertragen?",
            half_reaction: "Gleichen Sie die Halbreaktion im angegebenen Medium aus: {half}. Wie viele Elektronen sind beteiligt?",
            disproportionation: "In der Disproportionierungsreaktion {reaction}, wie viele Elektronen werden insgesamt übertragen?",
            anode_process: "Welcher Prozess findet an der Anode in einer galvanischen Zelle statt?",
            cathode_process: "Welcher Prozess findet an der Kathode in einer galvanischen Zelle statt?",
            electron_flow: "Von welcher Elektrode fließen Elektronen im externen Stromkreis?",
            salt_bridge: "Welche Spezies bewegen sich durch die Salzbrücke?",
            positive_electrode: "Welche Elektrode ist in einer galvanischen Zelle positiv?",
            cell_potential: "Berechnen Sie das Standardzellpotential E° für die Zelle: {cell}",
            nernst_equation: "Berechnen Sie mit der Nernst-Gleichung das Zellpotential für: {cell}",
            faraday_law: "Wie viele Gramm {substance} werden abgeschieden, wenn ein Strom von {current}A für {time}s fließt?"
        },
        labels: {
            input_answer: "Geben Sie Ihre Antwort ein",
            reaction: "REAKTIONSGLEICHUNG",
            oxidation_state: "Oxidationsstufe",
            electrons: "Übertragene Elektronen",
            cell_potential: "Zellpotential",
            regional_case: "Regionale Fallstudie // Basel-Knoten"
        },
        mission: {
            title: "REDOX-MISSION"
        },
        check: "Überprüfen",
        next: "Nächste Herausforderung",
        correct: "Redox verifiziert",
        incorrect: "Elektronenbilanz prüfen",
        ready: "Bereit",
        monitor_title: "SC2.06_REDOX_MONITOR",
        footer_left: "SC2.06_REDOX // KNOTEN: BASEL"
    },
    sc1_06: {
        scenarios: {
            RT_BASIC_1: "In der Basler Wasseraufbereitungsanlage am Rhein beobachtet die Chemie-Studentin Emma die Bildung von Wassermolekülen während einer Elektrolyse-Demonstration. Die Anlage bereitet täglich 180.000 Kubikmeter Wasser für die 175.000 Einwohner Basels auf. Dr. Weber, der Chefchemiker der Anlage, erklärt, dass sie Wasser normalerweise in Wasserstoff und Sauerstoff zerlegen, um Reinigungstests durchzuführen, aber die Umkehrreaktion – die Kombination von Wasserstoff und Sauerstoff zu Wasser – erhebliche Energie freisetzt. Diese Synthesereaktion ist grundlegend für das Verständnis der Brennstoffzellentechnologie, an der Novartis für nachhaltige Energielösungen in seinen pharmazeutischen Herstellungsprozessen forscht. Emma lernt, dass diese einfache Reaktion die Wasserstoff-Brennstoffzellen antreibt, die an der Chemieabteilung der Universität Basel für zukünftige saubere Energieanwendungen getestet werden.",
            RT_BASIC_2: "Im Basler Chemielabor der Universität Basel führt Professorin Müller ihrer Sekundarschulklasse die Elektrolyse vor. Mithilfe eines Hofmann-Apparats leitet sie elektrischen Strom durch Wasser und zerlegt es in Wasserstoff- und Sauerstoffgas. Die Schüler beobachten, wie sich an den Elektroden Blasen bilden – doppelt so viel Wasserstoff wie Sauerstoff, was dem Verhältnis 2:1 in der Summenformel von Wasser entspricht. Diese Zersetzungsreaktion ist entscheidend für die Herstellung von reinem Wasserstoffgas, das Roche in seinen pharmazeutischen Syntheseprozessen verwendet. Das Labor im historischen St. Johann-Quartier in der Nähe des Novartis-Campus lehrt seit über 150 Jahren chemische Grundlagen. Die Schüler lernen, dass diese Reaktion Energiezufuhr benötigt (endotherm), im Gegensatz zur Synthesereaktion, die Energie freisetzt.",
            RT_BASIC_3: "An der Basler Luftmessstation in der Nähe des Rheins analysiert der Techniker Marco Luftqualitätsdaten. Er erklärt den besuchenden Schülern, dass Stickstoffmonoxid (NO) natürlich während Gewittern entsteht, wenn Blitze genügend Energie liefern, um Stickstoff und Sauerstoff aus der Luft zu verbinden. Dieselbe Synthesereaktion findet in Automotoren bei hohen Temperaturen statt und trägt zur Luftverschmutzung in Basel bei. Die Stadt überwacht die NO-Werte sorgfältig, insbesondere in der Nähe der vielbefahrenen Autobahn A2, die durch Basel führt. Novartis und Roche haben beide strenge Emissionskontrollen, um die NO-Produktion in ihren Anlagen zu minimieren. Das Verständnis dieser Synthesereaktion hilft den Schülern zu schätzen, warum Basel 45 Millionen Schweizer Franken in den öffentlichen Verkehr investiert hat, um die Fahrzeugemissionen zu reduzieren und die Luftqualität für die Einwohner der Stadt zu verbessern.",
            RT_BASIC_4: "Im Basler Baustofflabor demonstriert die Ingenieurin Sarah die Zersetzung von Kalkstein (Kalziumkarbonat) zur Herstellung von Branntkalk (Kalziumoxid). Beim Erhitzen auf 900 °C in einem Ofen zerfällt der Kalkstein und setzt Kohlendioxidgas frei. Diese Zersetzungsreaktion ist unerlässlich für die Herstellung von Zement, den Basel intensiv bei Bauprojekten wie dem neuen Roche-Turm verwendet – dem mit 178 Metern höchsten Gebäude der Schweiz. Das Labor im Industriegebiet Kleinhüningen testet Materialien für Basler Bauprojekte. Sarah erklärt, dass diese Reaktion erhebliche Wärmeenergie benötigt und somit endotherm ist. Die Schüler lernen, dass das freigesetzte CO2 zu den Treibhausgasemissionen beiträgt, weshalb die Basler Bauindustrie nach nachhaltigeren Alternativen für den wachsenden Infrastrukturbedarf der Stadt forscht.",
            RT_BASIC_5: "Im Novartis Forschungslabor im Basler St. Johann-Quartier demonstriert der Chemiker Dr. Chen das strahlend weiße Licht, das entsteht, wenn Magnesium in Sauerstoff verbrennt. Bei dieser Synthesereaktion entsteht Magnesiumoxid unter Freisetzung intensiver Energie, was sie exotherm macht. Die Demonstration fasziniert die besuchenden Sekundarschüler, die etwas über Reaktionstypen lernen. Dr. Chen erklärt, dass die Reaktivität von Magnesium in der pharmazeutischen Synthese nützlich ist, wo kontrollierte Oxidationsreaktionen entscheidend sind. Das Labor nutzt diese Reaktion, um Sicherheitsprotokolle zu lehren – Magnesiumbrände können nicht mit Wasser gelöscht werden und erfordern spezielle Feuerlöscher der Klasse D. Die Schüler lernen, dass das Verständnis von Synthesereaktionen grundlegend für die pharmazeutische Chemie ist, in der Novartis jährlich über 200 verschiedene Wirkstoffe in seinen Basler Anlagen synthetisiert und damit Patienten weltweit versorgt.",
            RT_CORE_1: "Im Novartis Labor für Metallreaktivität demonstriert der Forscher Dr. Hoffmann Chemiestudierenden einfache Substitutionsreaktionen. Wenn Zinkmetall in Salzsäure gegeben wird, entstehen heftige Blasen, da Wasserstoffgas freigesetzt wird und Zinkchlorid in Lösung geht. Diese Reaktion ist entscheidend für das Verständnis der Spannungsreihe der Metalle, die pharmazeutischen Chemikern bei der Auswahl geeigneter Reaktionsgefäße und Geräte hilft. Das Labor, das mit modernsten Abzügen ausgestattet ist, verarbeitet monatlich über 500 verschiedene Reaktionen auf Metallbasis für die Arzneimittelentwicklung. Dr. Hoffmann erklärt, dass Zink aufgrund seiner Position in der Spannungsreihe reaktiver als Wasserstoff ist und diesen aus Säuren verdrängen kann. Dieses Prinzip wird bei Novartis zur Synthese von zinkhaltigen pharmazeutischen Verbindungen angewendet, die in Nahrungsergänzungsmitteln in der Schweiz und in ganz Europa vertrieben werden.",
            RT_CORE_2: "Im Roche Qualitätskontrolllabor am Standort Grenzacherstrasse in Basel führt die Analytikerin Maria einen Fällungstest mit Silbernitrat und Natriumchlorid durch. Wenn die beiden klaren Lösungen gemischt werden, bildet sich sofort ein weißer Niederschlag von Silberchlorid – eine klassische doppelte Substitutionsreaktion. Dieser Test ist unerlässlich für den Nachweis von Chloridverunreinigungen in pharmazeutischen Produkten. Das Labor führt monatlich über 10.000 Qualitätskontrolltests durch, um sicherzustellen, dass die Medikamente von Roche den strengen Reinheitsstandards entsprechen. Maria erklärt, dass bei doppelten Substitutionsreaktionen die positiven und negativen Ionen ihre Partner tauschen und neue Verbindungen bilden. Der Silberchloridniederschlag ist so schwerlöslich, dass selbst kleinste Mengen Chlorid nachgewiesen werden können, was diese Reaktion für die pharmazeutische Qualitätssicherung unschätzbar macht. Die Studierenden lernen, dass solche analytischen Techniken dazu beitragen, den Basler Ruf für pharmazeutische Exzellenz zu wahren.",
            RT_CORE_3: "Am Chemischen Institut der Universität Basel demonstriert Professor Schmidt eine visuell beeindruckende einfache Substitutionsreaktion. Wenn ein Kupferdampf in eine Silbernitratlösung getaucht wird, beginnen wunderschöne Silberkristalle auf der Kupferoberfläche zu wachsen, während sich die Lösung durch Kupfer(II)-nitrat blau färbt. Diese Reaktion veranschaulicht die Spannungsreihe – Kupfer ist reaktiver als Silber und verdrängt dieses aus der Lösung. Die Demonstration ist Teil des Outreach-Programms der Universität, das jährlich 2.000 Sekundarschüler beherbergt. Professor Schmidt erklärt, dass dasselbe Prinzip bei Galvanisierungsprozessen in Basler Industrieanlagen angewendet wird. Das Verständnis einfacher Substitutionsreaktionen ist entscheidend für die pharmazeutische Synthese, bei der selektive Metallverdrängungsreaktionen zur Reinigung von Verbindungen eingesetzt werden. Das Chemieprogramm der Universität, das drei Nobelpreisträger hervorgebracht hat, legt Wert auf praktisches Lernen grundlegender Reaktionstypen.",
            RT_CORE_4: "Im Basler Testzentrum für Wasserqualität am Rhein nutzt der Techniker Thomas eine doppelte Substitutionsreaktion, um auf Sulfatverunreinigungen zu testen. Wenn Bariumchloridlösung zu einer Wasserprobe gegeben wird, die Natriumsulfat enthält, bildet sich sofort ein weißer Niederschlag von Bariumsulfat. Dieser Test ist entscheidend für die Überwachung der Wasserqualität des Rheins, da der Sulfatgehalt die aquatischen Ökosysteme beeinflusst. Das Zentrum analysiert wöchentlich 500 Wasserproben von verschiedenen Stellen entlang der 21 Kilometer langen Basler Rheinfront. Thomas erklärt, dass Bariumsulfat extrem schwerlöslich ist, was diese doppelte Substitutionsreaktion hochempfindlich für den Nachweis von Sulfaten macht. Die Daten helfen den Basler Umweltbehörden sicherzustellen, dass industrielle Abwässer von Pharmaunternehmen den strengen Umweltstandards entsprechen und den Fluss schützen, der den Basler Einwohnern Erholung und Ökosystemleistungen bietet.",
            RT_CORE_5: "In der Novartis-Werkstatt für industrielle Chemie im Basler Klybeck-Quartier demonstriert die angehende Chemikerin Lisa Metallverdrängungsreaktionen. Wenn ein Eisennagel in eine blaue Kupfersulfatlösung getaucht wird, überzieht sich der Nagel mit rötlichem Kupfermetall, während sich die Lösung durch Eisen(II)-sulfat allmählich blassgrün färbt. Diese einfache Substitutionsreaktion findet statt, weil Eisen in der Spannungsreihe der Metalle reaktiver als Kupfer ist. Die Werkstatt bildet jährlich 50 Lehrlinge in grundlegenden chemischen Prinzipien aus, die für die pharmazeutische Herstellung unerlässlich sind. Lisa erklärt, dass das Verständnis der Metallreaktivität entscheidend für die Auswahl geeigneter Gerätematerialien ist – die Verwendung des falschen Metalls kann zu unerwünschten Reaktionen führen, die pharmazeutische Produkte verunreinigen. Dieses Prinzip leitet Novartis bei der Auswahl von Edelstahlreaktoren für die Arzneimittelsynthese und verhindert Metallverunreinigungen in weltweit vertriebenen Medikamenten.",
            RT_ADVANCED_1: "In der Basler Fernwärmeanlage in der Voltastrasse überwacht der Ingenieur Andreas die Verbrennung von Erdgas (Methan), das im Winter 15.000 Basler Haushalte heizt. Die Anlage verbrennt jährlich 45 Millionen Kubikmeter Erdgas und produziert Kohlendioxid und Wasserdampf. Diese Verbrennungsreaktion ist hoch exotherm und setzt 890 kJ pro Mol Methan frei – genug Energie, um Wasser für das Basler Wärmenetz zu erhitzen. Andreas erklärt, dass eine vollständige Verbrennung ausreichend Sauerstoff erfordert; eine unvollständige Verbrennung erzeugt giftiges Kohlenmonoxid. Die Anlage verwendet fortschrittliche Sensoren, um den optimalen Sauerstoffgehalt aufrechtzuerhalten und eine saubere Verbrennung zu gewährleisten. Das Basler Engagement für Nachhaltigkeit hat zu Plänen geführt, Erdgas bis 2030 durch erneuerbares Biogas zu ersetzen, um den CO2-Fussabdruck der Stadt zu verringern und gleichzeitig eine zuverlässige Heizung für die Einwohner während der kalten Schweizer Winter aufrechtzuerhalten.",
            RT_ADVANCED_2: "Im Verbrennungsanalyselabor des Basler Chemie-Instituts vermittelt Dr. Weber Studierenden Wissen über die Propanverbrennung. Propan, das häufig in Labor-Bunsenbrennern und tragbaren Heizgeräten verwendet wird, erfährt eine vollständige Verbrennung, wenn genügend Sauerstoff verfügbar ist. Das Labor nutzt Propan für Heizexperimente und Analyseverfahren und verbraucht monatlich etwa 200 kg. Dr. Weber demonstriert, wie man Verbrennungsgleichungen ausgleicht – eine kritische Fähigkeit für pharmazeutische Chemiker, die den Sauerstoffbedarf für Oxidationsreaktionen in der Arzneimittelsynthese berechnen müssen. Das Institut in der Nähe des Botanischen Gartens in Basel betont, dass das Verständnis der Verbrennungsstöchiometrie für die Sicherheit unerlässlich ist. Ungenügender Sauerstoff führt zu unvollständiger Verbrennung und erzeugt gefährliches Kohlenmonoxid. Dieses Wissen ist für Chemiker bei Novartis und Roche, die in geschlossenen Laborräumen mit brennbaren organischen Lösungsmitteln arbeiten, lebenswichtig.",
            RT_ADVANCED_3: "Im Roche Labor für pharmazeutische Sicherheit erklärt der Sicherheitsbeauftragte Dr. Zimmermann neuen Mitarbeitenden die Ethanolverbrennung. Ethanol, das in der pharmazeutischen Synthese weit verbreitet als Lösungsmittel eingesetzt wird, ist leicht entzündlich und muss vorsichtig gehandhabt werden. Wenn Ethanol bei ausreichendem Sauerstoff verbrennt, entstehen Kohlendioxid und Wasser, wobei 1.367 kJ pro Mol freigesetzt werden. Das Labor verbraucht monatlich 5.000 Liter Ethanol in Arzneimittelreinigungsprozessen. Dr. Zimmermann betont, dass Ethanol dämpfe bei Konzentrationen zwischen 3 % und 19 % explosive Gemische mit Luft bilden können. Das Verständnis dieser Verbrennungsreaktion ist entscheidend für die Laborsicherheit – die Basler Standorte von Roche weisen seit 15 Jahren infolge strenger Sicherheitstrainings keine Brandereignisse auf. Die Belüftungssysteme des Labors stellen sicher, dass Ethanoldämpfe niemals gefährliche Konzentrationen erreichen, und schützen so die 500 im Betrieb arbeitenden Chemiker.",
            RT_ADVANCED_4: "Im Basler Forschungszentrum für Biochemie erklärt Professor Keller die Glukoseverbrennung – die grundlegende energieliefernde Reaktion in lebenden Zellen. Obwohl Glukose in unserem Körper nicht im wörtlichen Sinne verbrennt, ist die Zellatmung im Wesentlichen eine kontrollierte Verbrennungsreaktion, die Energie schrittweise über mehrere enzymatische Stufen freisetzt. Das Zentrum untersucht, wie Zellen Energie aus Glukose gewinnen, um biologische Prozesse anzutreiben. Professor Keller stellt fest, dass die vollständige Glukoseverbrennung 2.808 kJ pro Mol freisetzt, welche die Zellen in ATP-Molekülen speichern. Diese Forschung ist entscheidend für das Verständnis von Stoffwechselstörungen wie Diabetes, einem Hauptfokus der pharmazeutischen Forschung von Novartis. Das Zentrum arbeitet mit Roche Diagnostics zusammen, um Blutzuckermessgeräte zu entwickeln, die von 50.000 Diabetespatienten in der Schweiz genutzt werden. Das Verständnis dieser Verbrennungsreaktion hilft den Studierenden, die der menschlichen Metabilosmus und pharmazeutischen Interventionen zugrunde liegende Chemie zu schätzen.",
            RT_ADVANCED_5: "Im Basler Labor für Umweltchemie an der Autobahn A2 analysiert der Forscher Dr. Müller die Oktanverbrennung – die Hauptreaktion in Benzinmotoren. Oktan, ein Hauptbestandteil von Benzin, erfährt in Automotoren eine Verbrennung, wobei Kohlendioxid und Wasser entstehen und Energie freigesetzt wird, die Fahrzeuge antreibt. Das Labor überwacht die Luftqualität entlang der Basler Hauptverkehrsstraßen, auf denen täglich 80.000 Fahrzeuge verkehren. Dr. Müller erklärt, dass eine unvollständige Verbrennung Kohlenmonoxid und Feinstaub erzeugt, was zur Luftverschmutzung beiträgt. Die Basler Investition in elektrische Trams und Busse zielt darauf ab, verbrennungsbedingte Emissionen zu reduzieren. Das Verständnis der Oktanverbrennung ist auch für die pharmazeutische Chemie relevant – Novartis nutzt ähnliche Prinzipien der Kohlenwasserstoffverbrennung in seiner Müllverbrennungsanlage, die jährlich 2.000 Tonnen pharmazeutische Abfälle bei Temperaturen über 1.200 °C sicher vernichtet, um eine vollständige Verbrennung und minimale Umweltauswirkungen zu gewährleisten.",
            RT_ELITE_1: "Im Labor für pharmazeutische Synthese auf dem Roche-Campus an der Grenzacherstrasse in Basel überwacht der leitende Chemiker Dr. Hartmann die Veresterung von Benzoesäure mit Methanol zur Herstellung von Benzoesäuremethylester. Diese Synthesereaktion ist ein entscheidender Schritt bei der Herstellung von Formulierungen für Lokalänasthetika. Die Reaktion erfordert einen Säurekatalysator und eine sorgfältige Temperaturkontrolle bei 65 °C. Dr. Hartmanns Team produziert monatlich 500 kg Benzoesäuremethylester für pharmazeutische Anwendungen. Der Veresterungsprozess ist grundlegend für die pharmazeutische Chemie – Roche synthetisiert in Basel über 50 verschiedene Esterverbindungen für diverse Medikamente. Diese Reaktion zeigt, wie einfache Prinzipien der organischen Synthese auf die industrielle pharmazeutische Produktion übertragen werden. Die Qualitätskontrolle des Labors stellt eine Reinheit von 99,8 % sicher und erfüllt damit strenge pharmazeutische Standards. Das Verständnis von Veresterungsreaktionen ist für pharmazeutische Chemiker unerlässlich, die neue Arzneimittelformulierungen für den globalen Markt von Roche entwickeln.",
            RT_ELITE_2: "In der Novartis-Anlage für fortgeschrittene Synthese im Basler Klybeck-Quartier leitet Dr. Chen die Acetylierung von Anilin zur Herstellung von Acetanilid, einem wichtigen pharmazeutischen Zwischenprodukt. Bei dieser Synthesereaktion wird Anilin mit Acetylchlorid behandelt, wobei Acetanilid und Chlorwasserstoffgas entstehen. Die Reaktion ist stark exotherm und erfordert Kühlung, um die Temperatur bei 5 °C zu halten. Novartis produziert monatlich 2 Tonnen Acetanilid für die Analgetika-Synthese. Dr. Chen erklärt, dass Acetylierungsreaktionen grundlegend für die pharmazeutische Chemie sind – Aspirin selbst wird durch Acetylierung von Salicylsäure hergestellt. Die fortschrittlichen Reaktorsysteme der Anlage steuern die Reaktionsbedingungen präzise und gewährleisten eine gleichbleibende Produktqualität. Dieser Syntheseweg wird in der Basler Pharmaindustrie seit über 80 Jahren genutzt und trägt zum Ruf der Schweiz für pharmazeutische Exzellenz bei. Der Prozess zeigt, wie klassische organische Synthesereaktionen in der modernen Arzneimittelherstellung unverzichtbar bleiben.",
            RT_ELITE_3: "Im Historischen Pharmazeutischen Labor von Novartis demonstriert der Kurator Dr. Schneider die klassische Synthese von Aspirin (Acetylsalicylsäure) aus Salicylsäure und Essigsäureanhydrid. Diese 1897 entdeckte Synthesereaktion revolutionierte die Schmerztherapie und etablierte Basel als pharmazeutisches Zentrum. Bei der Reaktion entstehen Aspirin, Essigsäure und Kohlendioxid. Während moderne Novartis-Anlagen effizientere Prozesse nutzen, wird diese klassische Synthese Chemiestudierenden immer noch beigebracht, um die pharmazeutische Geschichte zu veranschaulichen. Das Labor im ursprünglichen Gebäude von Novartis aus dem Jahr 1886 bewahrt historische Geräte und Dokumente auf. Dr. Schneider erklärt, dass das Verständnis dieser Synthesereaktion die Studierenden mit dem pharmazeutischen Erbe Basels verbindet – Aspirin war eines der ersten synthetischen Medikamente, die in Basel in Massenproduktion hergestellt wurden, mit einem weltweiten Absatz von über 40.000 Tonnen jährlich. Diese Reaktion ist beispielhaft dafür, wie die organische Synthese die Medizin veränderte und die Basler Pharmaindustrie begründete.",
            RT_ELITE_4: "Im Roche Labor für fortgeschrittene organische Chemie überwacht Dr. Hoffmann die Synthese von Phenylacetonitril aus Benzylchlorid und Natriumcyanid. Diese einfache Substitutionsreaktion, bei der Cyanid Chlorid verdrängt, ist entscheidend für die Herstellung pharmazeutischer Zwischenprodukte. Die Reaktion erfordert aufgrund der Toxizität von Cyanid strenge Sicherheitsprotokolle – das Labor arbeitet unter Unterdruck mit fortschrittlichen Reinigungssystemen. Roche produziert monatlich 800 kg Phenylacetonitril zur Synthese von Herz-Kreislauf-Medikamenten. Dr. Hoffmann betont, dass dies zwar wie eine einfache Verdrängungsreaktion erscheint, in Wirklichkeit aber eine nukleophile Substitution vom Typ SN2 ist – ein anspruchsvoller Mechanismus, der in der fortgeschrittenen organischen Chemie gelehrt wird. Die Sicherheitsbilanz des Labors ist tadellos, seit 20 Jahren gab es keine Vorfälle im Zusammenhang mit Cyanid-Exposition. Diese Reaktion zeigt, wie pharmazeutische Chemiker klassische Reaktionstypen für die komplexe Arzneimittelsynthese anpassen und so Basels Position als globales pharmazeutisches Innovationszentrum behaupten.",
            RT_ELITE_5: "Im Novartis Labor für pharmazeutische Prozessentwicklung demonstriert der Chemiker Dr. Weber die Synthese von Natriumphenolat aus Phenol und Natriumhydroxid. Diese doppelter Substitutionsreaktion (eigentlich eine Säure-Base-Neutralisation) ist unerlässlich für die Aktivierung von Phenol für nachfolgende Kupplungsreaktionen in der Arzneimittelsynthese. Die Reaktion ist exotherm und setzt Wärme frei, während sich das Phenolatsalz bildet. Novartis nutzt diese Reaktion bei der Synthese von antimikrobiellen Wirkstoffen und Konservierungsmitteln für pharmazeutische Formulierungen. Dr. Webers Team verarbeitet monatlich 1.500 kg Phenol in verschiedenen pharmazeutischen Synthesen. Das Labor, das mit automatisierten Reaktoren und Echtzeit-Überwachungssystemen ausgestattet ist, gewährleistet eine präzise Steuerung der Reaktionsbedingungen. Das Verständnis dieses Reaktionstyps ist für pharmazeutische Chemiker von entscheidender Bedeutung – viele Arzneimittelmoleküle enthalten phenolische Gruppen, die durch ähnliche Reaktionen aktiviert werden müssen. Dieser Prozess verdeutlicht, wie grundlegende Reaktionstypen auf die industrielle pharmazeutische Produktion in Basels weltweit führenden Pharmaindustrie-Anlagen skaliert werden.",
            EB_BASIC_1: "Im Forschungslabor für Wasserstoff-Brennstoffzellen der Universität Basel gleicht der Doktorand Thomas die Gleichung für die Wasserbildung aus. Diese grundlegende Reaktion ist entscheidend für das Verständnis der Brennstoffzellentechnologie, die die Universität in Partnerschaft mit Novartis für nachhaltige Energieanwendungen entwickelt. Die Prototyp-Brennstoffzellen des Labors erzeugen Elektrizität durch die Kombination von Wasserstoff und Sauerstoff, wobei als einziges Nebenprodukt Wasser entsteht. Thomas erklärt, dass das Ausgleichen dieser Gleichung 2 Wasserstoffmoleküle für jedes Sauerstoffmolekül erfordert, um das Gesetz zur Erhaltung der Masse zu erfüllen. Die Forschung zielt darauf ab, die pharmazeutische Produktion von Novartis mit sauberer Energie zu betreiben und so den CO2-Fussabdruck Basels zu verringern. Das Brennstoffzellenprogramm der Universität hat 5 Millionen Schweizer Franken an Forschungsgeldern angezogen und arbeitet mit 15 internationalen Institutionen zusammen, um die Wasserstofftechnologie für pharmazeutische und industrielle Anwendungen voranzutreiben.",
            EB_BASIC_2: "Im Novartis Labor für Ammoniaksynthese lehrt der Prozessingenieur Dr. Müller Studierende über das Haber-Bosch-Verfahren zur Herstellung von Ammoniak. Diese Reaktion kombiniert Stickstoff aus der Luft mit Wasserstoff zu Ammoniak, das Novartis in der pharmazeutischen Produktion einsetzt. Das Ausgleichen dieser Gleichung zeigt, dass 3 Wasserstoffmoleküle mit 1 Stickstoffmolekül reagieren, um 2 Ammoniakmoleküle zu bilden. Das Labor produziert jährlich 50 Tonnen Ammoniak für die Synthese pharmazeutischer Zwischenprodukte und Reinigungsmittel. Dr. Müller erklärt, dass diese Reaktion hohen Druck (200 Atmosphären) und Temperaturen (450 °C) mit einem Eisenkatalysator erfordert. Das Verständnis des Ausgleichens von Gleichungen ist für die Berechnung von Reaktantenmengen unerlässlich – das falsche Verhältnis verschwendet teure Materialien und verringert die Effizienz. Die industrielle Bedeutung dieser Reaktion brachte Fritz Haber 1918 den Nobelpreis für Chemie ein und zeigt, wie chemische Grundprinzipien die großtechnische pharmazeutische Herstellung ermöglichen.",
            EB_BASIC_3: "Im Basler Materialforschungslabor untersucht der Forscher Dr. Schmidt die Eisenoxidation – den Rostprozess, der pharmazeutische Geräte beeinträchtigt. Wenn Eisen mit Sauerstoff reagiert, bildet es Eisen(III)-oxid (Rost). Das Ausgleichen dieser Gleichung zeigt, dass 4 Eisenatome mit 3 Sauerstoffmolekülen reagieren, um 2 Formeleinheiten Eisenoxid zu bilden. Diese Reaktion kostet die Basler Pharmaindustrie jährlich Millionen für die Wartung und den Ersatz von Geräten. Dr. Schmidts Forschung konzentriert sich auf Schutzbeschichtungen, um Rost in den Fertigungsanlagen von Roche und Novartis zu verhindern. Das Labor testem monatlich über 200 verschiedene Beschichtungsmaterialien und sucht nach Lösungen, die rauen chemischen Umgebungen in der pharmazeutischen Produktion standhalten. Das Verständnis dieser Oxidationsreaktion hilft den Studierenden zu schätzen, warum Pharmaunternehmen massiv in Edelstahlgeräte investieren – das Chrom im Edelstahl bildet eine schützende Oxidschicht, die die Eisenoxidation verhindert und so die Langlebigkeit der Geräte sowie die Reinheit der Produkte gewährleistet.",
            EB_BASIC_4: "In der Werkstatt für Gerätebau von Roche erklärt die Ingenieurin Lisa angehenden Chemikern die Aluminiumoxidation. Wenn Aluminium mit Sauerstoff reagiert, bildet es eine schützende Aluminiumoxidschicht, die weitere Korrosion verhindert. Das Ausgleichen dieser Gleichung erfordert 4 Aluminiumatome und 3 Sauerstoffmoleküle, um 2 Formeleinheiten Aluminiumoxid zu bilden. Diese selbstschützende Eigenschaft macht Aluminium ideal für pharmazeutische Geräte – Roche verwendet Aluminiumreaktoren für die Synthese säureempfindlicher Verbindungen. Die Werkstatt fertigt massgeschneiderte Aluminiumgeräte für die Basler Standorte von Roche und produziert jährlich 50 spezialisierte Reaktoren. Lisa demonstriert, dass Aluminium trotz seiner höheren Reaktivität gegenüber Eisen dank seiner Oxidschicht korrosionsbeständiger ist. Dieses Prinzip leitet die Geräteauswahl in der pharmazeutischen Herstellung, wo die Materialverträglichkeit mit reaktiven Chemikalien entscheidend ist. Das Verständnis des Ausgleichens von Gleichungen hilft Chemikern, die benötigte Aluminiumdicke zu berechnen, um nach der Bildung der Oxidschicht einen angemessenen Schutz zu gewährleisten.",
            EB_BASIC_5: "Im Erdgaskonstrollzentrum Basel in Kleinhüningen unterrichtet der Sicherheitsinspektor Andreas Schüler über die Methanverbrennung. Erdgas, das primär aus Methan besteht, heizt 40 % der Basler Gebäude. Das Ausgleichen der Verbrennungsgleichung zeigt, dass 1 Methanmolekül 2 Sauerstoffmoleküle benötigt, um 1 Kohlendioxid- und 2 Wassermoleküle zu produzieren. Das Zentrum verteilt jährlich 120 Millionen Kubikmeter Erdgas an Basler Einwohner und Industrien, einschliesslich pharmazeutischer Anlagen. Andreas betont, dass das korrekte Ausgleichen von Gleichungen für die Sicherheit entscheidend ist – ungenügender Sauerstoff führt zu unvollständiger Verbrennung und erzeugt giftiges Kohlenmonoxid. Die Überwachungssysteme des Zentrums gewährleisten eine optimale Verbrennung in den Basler Heizsystemen. Das Verständnis dieser ausgeglichenen Gleichung hilft den Schülern zu schätzen, warum eine angemessene Belüftung bei der Verwendung von Gasgeräten unerlässlich ist, um Kohlenmonoxidvergiftungen zu vermeiden, von denen jährlich Dutzende Schweizer Einwohner aufgrund unzureichender Belüftung betroffen sind.",
            EB_CORE_1: "In der Phosphat-Eliminationsanlage des Basler Wasserklärwerks demonstriert der Chemiker Dr. Weber, wie Kalziumhydroxid Phosphate aus dem Abwasser entfernt. Bei dieser doppelten Substitutionsreaktion entsteht unlösliches Kalziumphosphat, das aus der Lösung ausfällt. Das Ausgleichen dieser Gleichung mit mehratomigen Ionen erfordert 3 Kalziumhydroxidmoleküle und 2 Phosphorsäuremoleküle, um 1 Kalziumphosphat und 6 Wassermoleküle zu bilden. Die Anlage bereitet täglich 180.000 Kubikmeter Wasser auf und entfernt Phosphate, die ansonsten Algenblüten im Rhein verursachen würden. Dr. Weber erklärt, dass das Ausgleichen von Gleichungen mit mehratomigen Ionen einfacher ist, wenn man Gruppen wie Phosphat (PO_4^{3}^-) als einzelne Einheiten betrachtet. Dieser Prozess schützt das Basler Rheinufer, an dem jährlich 50.000 Einwohner Freizeitaktivitäten nachgehen. Das Verständnis des Ausgleichens mehratomiger Ionen ist essentiell für die pharmazeutische Abwasserreinigung in den Anlagen von Novartis und Roche.",
            EB_CORE_2: "Im Basler Museum für industrielle Chemie erklärt der Kurator Dr. Hoffmann die Eisenerzreduktion – den Prozess, der die Industrielle Revolution ermöglichte. Wenn Kohlenmonoxid Eisen(III)-oxid reduziert, entstehen reines Eisen und Kohlendioxid. Das Ausgleichen dieser Gleichung erfordert 1 Eisenoxidmolekül, 3 Kohlenmonoxidmoleküle und ergibt 2 Eisenatome sowie 3 Kohlendioxidmoleküle. Obwohl Basel keine Stahlwerke mehr besitzt, finden die Prinzipien dieser Reaktion in der pharmazeutischen Chemie Anwendung. Novartis nutzt ähnliche Reduktionsreaktionen zur Synthese pharmazeutischer Verbindungen, wobei Sauerstoff durch andere funktionelle Gruppen ersetzt wird. Das Museum im ehemaligen Basler Industriequartier zieht jährlich 5.000 Besucher an. Dr. Hoffmann betont, dass das Verständnis von Reduktionsreaktionen grundlegend für die pharmazeutische Synthese ist – viele Arzneimittelmoleküle erfordern die selektive Reduktion spezifischer funktioneller Gruppen unter Verwendung derselben chemischen Prinzipien, die einst Stahl für Basels Industriewirtschaft lieferten.",
            EB_CORE_3: "In der Nitriersäure-Anlage von Novartis überwacht der Prozessingenieur Dr. Chen das Ostwald-Verfahren zur Herstellung von Salpetersäure, das mit der Ammoniakoxidation beginnt. Diese Reaktion erfordert präzises Ausgleichen: 4 Ammoniakmoleküle reagieren mit 5 Sauerstoffmolekülen zu 4 Stickstoffmonoxidmolekülen und 6 Wassermolekülen. Die Anlage produziert monatlich 200 Tonnen Salpetersäure für die pharmazeutische Synthese. Dr. Chen erklärt, dass diese Reaktion bei 900 °C an einem Platin-Rhodium-Katalysator mit einer Umwandlungseffizienz von 95 % stattfindet. Salpetersäure ist essentiell für die Synthese vieler pharmazeutischer Verbindungen, einschliesslich Antibiotika und Herz-Kreislauf-Medikamenten. Das Verständnis dieser komplexen Gleichung ist entscheidend für Prozessingenieure, die Reaktantenströme berechnen müssen, um optimale Produktionsraten aufrechtzuerhalten. Die hochentwickelten Steuerungssysteme der Anlage überwachen die Reaktionsstöchiometrie in Echtzeit und gewährleisten eine gleichbleibende Produktqualität für die pharmazeutische Herstellung von Novartis.",
            EB_CORE_4: "Im analytischen Chemielabor von Roche demonstriert die Analytikerin Maria die Reaktion von Aluminium mit Schwefelsäure. Bei dieser einfachen Substitutionsreaktion entstehen Aluminiumsulfat und Wasserstoffgas. Das Ausgleichen dieser Gleichung mit mehratomigen Sulfationen erfordert 2 Aluminiumatome und 3 Schwefelsäuremoleküle, um 1 Aluminiumsulfatmolekül und 3 Wasserstoffmoleküle zu bilden. Das Labor nutzt diese Reaktion zur Herstellung von Aluminiumsulfat für Wasserreinigungstests. Maria erklärt, dass die Betrachtung von Sulfat (SO_4^{2}^-) als eine Einheit das Ausgleichen vereinfacht – zählen Sie 3 Sulfatgruppen auf jeder Seite. Dieses Prinzip ist für pharmazeutische Chemiker, die bei der Arzneimittelsynthese mit mehratomigen Ionen arbeiten, unerlässlich. Das Labor führt wöchentlich 500 Analysetests durch, um sicherzustellen, dass pharmazeutische Produkte die Reinheitsstandards erfüllen. Das Verständnis des Ausgleichens mehratomiger Ionen hilft Studierenden, die Komplexität der pharmazeutischen Qualitätskontrolle zu schätzen, bei der präzise Stöchiometrie die Arzneimittelsicherheit für Patienten weltweit gewährleistet.",
            EB_CORE_5: "Im Labor für Verbrennungsforschung der Universität Basel lehrt Professorin Müller Studierende das Ausgleichen der Ethunverbrennungsgleichung. Ethan, ein Bestandteil von Erdgas, erfordert sorgfältiges Ausgleichen: 2 Ethanmoleküle reagieren mit 7 Sauerstoffmolekülen zu 4 Kohlendioxid- und 6 Wassermolekülen. Das Labor untersucht die Verbrennungseffizienz für Basler Heizsysteme, die jährlich 120 Millionen Kubikmeter Erdgas verbrauchen. Professorin Müller betont, dass das Ausgleichen von Verbrennungsgleichungen herausfordernd ist, da mehrere Elemente gleichzeitig ausgeglichen werden müssen. Die Studierenden lernen, zuerst Kohlenstoff, dann Wasserstoff und schliesslich Sauerstoff auszugleichen. Dieser systematische Ansatz ist essentiell für pharmazeutische Chemiker, die komplexe organische Reaktionen ausgleichen. Die Verbrennungsforschung der Universität trägt zu Basels Nachhaltigkeitszielen bei – die Verbesserung der Verbrennungseffizienz reduziert den Erdgasverbrauch und die CO2-Emissionen und unterstützt das Ziel der Stadt, bis 2050 klimaneutral zu werden.",
            EB_ADVANCED_1: "Im fortgeschrittenen Verbrennungslabor des Basler Chemie-Instituts fordert Dr. Weber Studierende mit dem Ausgleichen der Propanverbrennung heraus. Diese Gleichung erfordert 1 Propanmolekül und 5 Sauerstoffmoleküle, um 3 Kohlendioxid- und 4 Wassermoleküle zu bilden. Das Labor nutzt Propan in Bunsenbrennern für Heizexperimente und verbraucht monatlich 200 kg. Dr. Weber lehrt einen systematischen Ansatz: Zuerst werden die Kohlenstoffatome ausgeglichen (3 auf jeder Seite), dann der Wasserstoff (8 auf jeder Seite) und schliesslich der Sauerstoff (10 auf jeder Seite). Diese Methode ist entscheidend für pharmazeutische Chemiker, die komplexe organische Synthesereaktionen ausgleichen. Das 1460 gegründete Institut hat Generationen von Chemikern ausgebildet, die zur Basler Pharmaindustrie beigetragen haben. Das Verständnis der Verbrennungsstöchiometrie hilft den Studierenden, den Sauerstoffbedarf für die Laborsicherheit zu berechnen – ungenügender Sauerstoff erzeugt giftiges Kohlenmonoxid, eine Gefahr in geschlossenen Laborräumen.",
            EB_ADVANCED_2: "Im Roche-Trainingszentrum für Laborsicherheit nutzt der Ausbilder Dr. Zimmermann die Butanverbrennung, um das Ausgleichen von Gleichungen und Sicherheit zu lehren. Butan, das in Laborbrennern und tragbaren Heizgeräten verwendet wird, erfordert ein komplexes Ausgleichen: 2 Butanmoleküle benötigen 13 Sauerstoffmoleküle, um 8 Kohlendioxid- und 10 Wassermoleküle zu produzieren. Das Zentrum bildet jährlich 500 Chemiker in Sicherheitsprotokollen für Labore aus. Dr. Zimmermann betont, dass das Ausgleichen von Verbrennungsgleichungen Chemikern hilft, den Belüftungsbedarf zu berechnen – jedes Mol Butan verbraucht 6,5 Mol Sauerstoff aus der Luft. Unzureichende Belüftung führt zu unvollständiger Verbrennung und Kohlenmonoxidproduktion. Die Basler Standorte von Roche weisen seit 15 Jahren infolge strenger Sicherheitstrainings keine Brandereignisse auf. Das Verständnis der Verbrennungsstöchiometrie ist für pharmazeutische Chemiker unerlässlich, die täglich mit brennbaren organischen Lösungsmitteln arbeiten, um einen sicheren Laborbetrieb zu gewährleisten und die 500 Chemiker zu schützen, die in den Basler Forschungsanlagen von Roche arbeiten.",
            EB_ADVANCED_3: "In der Novartis-Anlage zur Lösungsmittelrückgewinnung steuert der Ingenieur Dr. Chen die Ethanolverbrennung zur Abfallentsorgung. Ethanol, das in grossem Umfang als pharmazeutisches Lösungsmittel verwendet wird, wird verbrannt, wenn es über eine Rückgewinnung hinaus verunreinigt ist. Das Ausgleichen dieser Gleichung erfordert 1 Ethanolmolekül und 3 Sauerstoffmoleküle, um 2 Kohlendioxid- und 3 Wassermoleküle zu bilden. Die Anlage verarbeitet monatlich 5.000 Liter Ethanolabfall und gewinnt Wärmeenergie für die Gebäudeheizung zurück. Dr. Chen erklärt, dass das präzise Ausgleichen der Gleichung entscheidend für die Berechnung des Sauerstoffbedarfs ist – der Verbrennungsofen der Anlage arbeitet bei 1.200 °C mit einem Sauerstoffüberschuss von 20 %, um eine vollständige Verbrennung zu gewährleisten. Dies verhindert die Bildung giftiger Nebenprodukte und erfüllt die strengen Schweizer Umweltvorschriften. Das Verständnis der Ethanolverbrennungsstöchiometrie hilft pharmazeutischen Chemikern, Lösungsmittelmengen für Synthesereaktionen und Abfallentsorgungskosten zu berechnen, was zu den Nachhaltigkeitszielen von Novartis beiträgt, Abfälle zu reduzieren und Energie aus unvermeidbaren Abfallströmen zurückzugewinnen.",
            EB_ADVANCED_4: "Am Forschungsstitut für Biochemie der Universität Basel nutzt Professor Keller die Glukoseverbrennung, um die Zellatmung zu lehren. Obwohl Glukose in Zellen nicht wörtlich verbrennt, entspricht die Gesamtgleichung der Zellatmung der Verbrennung: 1 Glukosemolekül reagiert mit 6 Sauerstoffmolekülen zu 6 Kohlendioxid- und 6 Wassermolekülen. Diese ausgeglichene Gleichung repräsentiert die vollständige Oxidation von Glukose, wobei 2.808 kJ pro Mol freigesetzt werden – Energie, welche die Zellen in 38 ATP-Molekülen speichern. Das Institut untersucht Stoffwechselstörungen, die den Glukosestoffwechsel beeinflussen, und arbeitet mit Roche Diagnostics zusammen, um Blutzuckermessgeräte zu entwickeln. Professor Keller betont, dass das Verständnis der Stöchiometrie dieser Gleichung den Studierenden hilft zu verstehen, warum wir atmen – wir inhalieren Sauerstoff, um Glukose zu oxidieren, und exhalieren Kohlendioxid als Abfall. Diese fundamentale biochemische Gleichung verbindet die Chemie mit der menschlichen Physiologie und verdeutlicht, warum die Basler Pharmaunternehmen massiv in die Forschung zu Stoffwechselerkrankungen investieren.",
            EB_ADVANCED_5: "Im Novartis Labor für Materialchemie demonstriert der Forscher Dr. Hoffmann die Magnetitreduktion mit Wasserstoff. Bei dieser Reaktion wird Eisen(II,III)-oxid (Magnetit) mithilfe von Wasserstoffgas zu reinem Eisen reduziert. Das Ausgleichen dieser Gleichung erfordert 1 Magnetitmolekül und 4 Wasserstoffmoleküle, um 3 Eisenatome und 4 Wassermoleküle zu bilden. Auch wenn diese Reaktion nicht in der pharmazeutischen Synthese verwendet wird, finden ihre Prinzipien bei der Reduktion funktioneller Gruppen in Arzneimittelmolekülen Anwendung. Das Labor untersucht Reduktionsreaktionen zur Synthese pharmazeutischer Zwischenprodukte und verarbeitet monatlich 200 verschiedene Reduktionsreaktionen. Dr. Hoffmann erklärt, dass die Wasserstoffreduktion sauberer ist als die Kohlenmonoxidreduktion, da als einziges Nebenprodukt Wasser entsteht. Dieses Prinzip leitet die Green-Chemistry-Initiativen von Novartis – die Auswahl von Reaktionen, die gefährliche Abfälle minimieren. Das Verständnis komplexer Gleichungen mit gemischten Oxidationsstufen bereitet Studierende auf die fortgeschrittene pharmazeutische Chemie vor, bei der präzise Stöchiometrie eine effiziente Arzneimittelsynthese und minimale Abfallproduktion gewährleistet.",
            RS_BASIC_1: "Im Basler Chemie-Demonstrationslabor zeigt Professor Schmidt den Schülern die explosive Reaktion zwischen Wasserstoff- und Chlorgas. Wenn diese Gase Licht ausgesetzt werden, verbinden sie sich heftig zu Chlorwasserstoff und setzen dabei erhebliche Energie frei. Diese exotherme Synthesereaktion demonstriert das Brechen und Bilden von Bindungen – H-H- und Cl-Cl-Bindungen brechen, während neue H-Cl-Bindungen entstehen. Das Labor nutzt diese dramatische Demonstration, um jährlich 500 Schülern die Reaktionsenergetik zu vermitteln. Professor Schmidt betont die Sicherheit – die Reaktion wird aufgrund ihrer explosiven Natur hinter Schutzschilden durchgeführt. Das Verständnis dieser Reaktion hilft den Schülern, Veränderungen auf molekularer Ebene während chemischer Reaktionen zu visualisieren. Die Demonstration stellt eine Verbindung zur pharmazeutischen Chemie her – Roche und Novartis verwenden Chlorwasserstoff in zahlreichen Synthesereaktionen, wenn auch unter sorgfältig kontrollierten Bedingungen. Diese einfache Reaktion veranschaulicht grundlegende Prinzipien, die für komplexe pharmazeutische Syntheseprozesse gelten.",
            RS_BASIC_2: "Im Basler Labor für Umweltchemie demonstriert Dr. Weber die Stickstoffmonoxidbildung mithilfe eines Lichtbogens, um Blitze zu simulieren. Diese endotherme Reaktion erfordert Energiezufuhr, um die starke Dreifachbindung in Stickstoffmolekülen zu brechen. Die Schüler beobachten, wie der Lichtbogen Energie liefert, um die Aktivierungshürde zu überwinden, sodass sich Stickstoff und Sauerstoff verbinden können. Das Labor untersucht diese Reaktion, da sie in Automotoren stattfindet und zur Luftverschmutzung beiträgt. Basel überwacht die NO-Werte an 15 Stationen im Stadtgebiet, insbesondere in der Nähe der Autobahn A2, auf der täglich 80.000 Fahrzeuge verkehren. Dr. Weber erklärt, dass das Verständnis der Energieanforderungen dieser Reaktion Ingenieuren hilft, Katalysatoren zu entwerfen, die die NO-Emissionen reduzieren. Die Visualisierung zeigt Stickstoff- und Sauerstoffmoleküle, die mit ausreichender Energie kollidieren, um Bindungen zu brechen und neue N-O-Bindungen zu bilden, und veranschaulicht, wie endotherme Reaktionen eine kontinuierliche Energiezufuhr benötigen.",
            RS_BASIC_3: "Im Novartis-Forschungslabor für Brennstoffzellen demonstriert der Ingenieur Thomas die Wasserbildung in einer Wasserstoff-Brennstoffzelle. Diese stark exotherme Reaktion setzt 286 kJ pro Mol gebildetem Wasser frei, was die Brennstoffzelle in Elektrizität umwandelt. Die Schüler beobachten die molekulare Animation, die zeigt, wie sich Wasserstoff- und Sauerstoffmoleküle annähern, Bindungen brechen und neue H-O-Bindungen in Wassermolekülen entstehen. Die Prototyp-Brennstoffzellen des Labors erzeugen 10 Kilowatt Elektrizität, genug um Laborgeräte zu betreiben. Thomas erklärt, dass die Energiefreisetzung dieser Reaktion Wasserstoff zu einem hervorragenden Brennstoff macht – er liefert dreimal mehr Energie pro Kilogramm als Benzin. Novartis investiert in Brennstoffzellentechnologie, um die pharmazeutische Produktion nachhaltig zu betreiben. Die Visualisierung hilft den Schülern zu verstehen, warum diese Reaktion exotherm ist – die in Wasser gebildeten Bindungen sind stärker als die in Wasserstoff und Sauerstoff gebrochenen Bindungen, wodurch überschüssige Energie freigesetzt wird.",
            RS_BASIC_4: "Im Basler Labor für Verbrennungswissenschaft demonstriert Dr. Hoffmann die Kohlenstoffverbrennung – die grundlegende Reaktion bei der Kohleverbrennung. Wenn Kohlenstoff mit Sauerstoff reagiert, bildet er Kohlendioxid und setzt 394 kJ pro Mol frei. Die molekulare Animation zeigt Sauerstoffmoleküle, die sich Kohlenstoffatomen annähern, Bindungen, die sich zwischen Kohlenstoff- und Sauerstoffatomen bilden, und Energie, die als Wärme und Licht freigesetzt wird. Diese exotherme Reaktion trieb die Industrielle Revolution an und erzeugt immer noch 40 % des weltweiten Stroms. Das Labor untersucht die Verbrennungseffizienz für die Basler Müllverbrennungsanlage, die jährlich 100.000 Tonnen Abfall verbrennt. Dr. Hoffmann erklärt, dass eine vollständige Verbrennung ausreichend Sauerstoff erfordert – unzureichender Sauerstoff erzeugt giftiges Kohlenmonoxid. Das Verständnis der Energetik dieser Reaktion hilft den Schülern zu schätzen, warum kohlenstoffbasierte Brennstoffe so viel Energie freisetzen und warum der Übergang zu erneuerbaren Energien entscheidend für die Reduzierung der Kohlendioxidemissionen und die Bekämpfung des Klimawandels ist.",
            RS_BASIC_5: "Im Roche-Trainingszentrum für chemische Sicherheit demonstriert Dr. Chen das strahlend weiße Licht der Magnesiumverbrennung. Diese hoch exotherme Reaktion setzt 602 kJ pro Mol gebildetem Magnesiumoxid frei. Die Molekularsimulation zeigt, wie sich Magnesiumatome Sauerstoffmolekülen annähern, Elektronen von Magnesium auf Sauerstoff übertragen werden und Ionenbindungen in Magnesiumoxid entstehen. Die Schüler beobachten, dass diese Reaktion so exotherm ist, dass sie Licht erzeugt, das hell genug ist, um die Augen ohne Schutz zu schädigen. Das Zentrum bildet jährlich 500 Chemiker im sicheren Umgang mit reaktiven Metallen aus. Dr. Chen betont, dass Magnesiumbrände nicht mit Wasser gelöscht werden können – Wasser reagiert mit heissem Magnesium und erzeugt Wasserstoffgas, das explodieren kann. Das Verständnis der Energetik und des Mechanismus dieser Reaktion hilft pharmazeutischen Chemikern, sicher mit reaktiven Metallen zu arbeiten, die in der Arzneimittelsynthese verwendet werden. Die Visualisierung veranschaulicht, wie die Bildung von Ionenbindungen enorme Energie freisetzt.",
            RS_CORE_1: "Im Basler Forschungslabor für Erdgas nutzt Dr. Müller eine molekulare Animation, um die Methanverbrennung zu lehren. Diese komplexe Reaktion beinhaltet das Brechen von vier C-H-Bindungen und zwei O=O-Bindungen, um dann zwei C=O-Bindungen und vier O-H-Bindungen zu bilden. Die Simulation zeigt, wie Methan- und Sauerstoffmoleküle kollidieren, Bindungen in einer spezifischen Abfolge brechen und neue Bindungen in Kohlendioxid und Wasser entstehen. Diese exotherme Reaktion setzt 890 kJ pro Mol Methan frei und heizt 40 % der Basler Gebäude. Das Labor untersucht die Verbrennungseffizienz, um den Erdgasverbrauch und die Emissionen zu reduzieren. Dr. Müller erklärt, dass die Reaktion in mehreren Schritten abläuft, obwohl die Gesamtgleichung nur Reaktanten und Produkte zeigt. Das Verständnis dieser Bindungsveränderungen hilft den Schülern, die Komplexität der Verbrennung zu schätzen und zu verstehen, warum eine vollständige Verbrennung präzise Sauerstoff-Brennstoff-Verhältnisse erfordert. Die Visualisierung veranschaulicht, wie mehrere Bindungen während der Verbrennung gleichzeitig brechen und entstehen.",
            RS_CORE_2: "Im Novartis Verbrennungsanalyselabor demonstriert der Forscher Dr. Weber mithilfe molekularer Visualisierung die Ethanverbrennung. Diese Reaktion beinhaltet das Brechen von sechs C-H-Bindungen, einer C-C-Bindung und sieben O=O-Bindungen, um dann acht C=O-Bindungen und zwölf O-H-Bindungen zu bilden. Die komplexe Animation zeigt, wie mehrere Ethan- und Sauerstoffmoleküle kollidieren, Bindungen stufenweise brechen und neue Moleküle entstehen. Diese exotherme Reaktion setzt 1.560 kJ pro Mol Ethan frei. Das Labor analysiert Verbrennungsprodukte aus der Müllverbrennungsanlage von Novartis, die pharmazeutische Abfälle bei 1.200 °C verbrennt. Dr. Weber erklärt, dass eine vollständige Verbrennung 3,5 Sauerstoffmoleküle pro Ethanmolekül erfordert – unzureichender Sauerstoff erzeugt Kohlenmonoxid und Russ. Das Verständnis dieser multiplen Bindungsveränderungen hilft pharmazeutischen Chemikern, Oxidationsreaktionen für die Arzneimittelsynthese zu entwerfen. Die Visualisierung verdeutlicht die Reaktionskomplexität und zeigt, warum die Verbrennung eine sorgfältige Sauerstoffkontrolle für eine vollständige, saubere Verbrennung erfordert.",
            RS_CORE_3: "Im Roche Labor für katalytische Prozesse demonstriert der Ingenieur Dr. Chen die Ammoniakoxidation an einem Platinkatalysator. Diese Reaktion bricht zwölf N-H-Bindungen und fünf O=O-Bindungen und bildet vier N=O-Bindungen sowie zwölf O-H-Bindungen. Die Molekularsimulation zeigt, wie Ammoniak- und Sauerstoffmoleküle an der Oberfläche des Platinkatalysators adsorbieren, Bindungen brechen und sich neu bilden und die Produkte desorbieren. Diese exotherme Reaktion setzt 226 kJ pro Mol Ammoniak frei und ist der erste Schritt in der Salpetersäureproduktion. Das Labor produziert monatlich 200 Tonnen Salpetersäure für die pharmazeutische Synthese. Dr. Chen erklärt, dass der Platinkatalysator die Aktivierungsenergie senkt, sodass die Reaktion bei 900 °C stattfinden kann, anstatt viel höhere Temperaturen zu erfordern. Das Verständnis katalytischer Mechanismen ist entscheidend für die pharmazeutische Chemie – Roche verwendet über 100 verschiedene Katalysatoren in der Arzneimittelsynthese. Die Visualisierung zeigt, wie Katalysatoren das Brechen und Bilden von Bindungen erleichtern, ohne dabei selbst verbraucht zu werden.",
            RS_CORE_4: "Im Labor für Verbrennungsdynamik der Universität Basel nutzt Professor Schmidt fortschrittliche Visualisierungen, um die Propanverbrennung zu lehren. Diese Reaktion bricht acht C-H-Bindungen, zwei C-C-Bindungen und fünf O=O-Bindungen und bildet dann sechs C=O-Bindungen sowie acht O-H-Bindungen. Die Simulation zeigt Propanmoleküle, die mit Sauerstoff kollidieren, Bindungen, die in einer Kaskade brechen, und Kohlendioxid- sowie Wassermoleküle, die entstehen. Diese hoch exotherme Reaktion setzt 2.220 kJ pro Mol Propan frei. Das Labor untersucht Verbrennungskinetik zur Verbesserung der Heizeffizienz in Basler Gebäuden. Professor Schmidt erklärt, dass die Verbrennung über Radikalkettenreaktionen abläuft – die Animation zeigt, wie sich Radikalzwischenprodukte bilden und schnell reagieren. Das Verständnis dieser komplexen Bindungsveränderungen bereitet Studierende auf die pharmazeutische Chemie vor, in der mehrstufige Reaktionen mit Zwischenprodukten üblich sind. Die Visualisierung verdeutlicht, warum die Verbrennung so exotherm ist – viele starke Bindungen entstehen und setzen erhebliche Energie frei.",
            RS_CORE_5: "Im Novartis Labor für Halogenierungsforschung demonstriert Dr. Hoffmann die Bildung von Bromwasserstoff mithilfe molekularer Animation. Diese Reaktion bricht eine H-H-Bindung und eine Br-Br-Bindung und bildet zwei H-Br-Bindungen. Die Simulation zeigt, wie sich Wasserstoff- und Brommoleküle annähern, Bindungen brechen und neue Bromwasserstoffmoleküle entstehen. Diese exotherme Reaktion setzt 72 kJ pro Mol Bromwasserstoff frei. Das Labor untersucht Halogenierungsreaktionen für die pharmazeutische Synthese – viele Medikamente enthalten Bromatome, die durch Reaktionen mit Bromwasserstoff eingeführt werden. Dr. Hoffmann erklärt, dass diese Reaktion unter Lichteinfluss über einen Radikalmechanismus abläuft, wobei die Animation Radikalzwischenprodukte zeigt. Das Verständnis der Halogenierung ist entscheidend für die pharmazeutische Chemie – Novartis synthetisiert 30 verschiedene bromierte pharmazeutische Verbindungen in Basel. Die Visualisierung hilft den Studierenden zu verstehen, wie Bindungsenergien bestimmen, ob Reaktionen exotherm oder endotherm sind.",
            RS_ADVANCED_1: "Im Roche Hydrierungslabor demonstriert Dr. Weber die Hydrierung von Ethylen an einem Palladiumkatalysator. Diese Reaktion bricht die C=C-Doppelbindung und die H-H-Bindung und bildet zwei neue C-H-Bindungen. Die molekulare Animation zeigt Ethylen- und Wasserstoffmoleküle, die an der Oberfläche des Palladiumkatalysators adsorbieren, die Pi-Bindung bricht, Wasserstoffatome sich an Kohlenstoffatome anlagern und Ethan desorbiert. Diese exotherme Reaktion setzt 137 kJ pro Mol Ethylen frei. Das Labor führt monatlich 200 Hydrierungsreaktionen für die pharmazeutische Synthese durch. Dr. Weber erklärt, dass die Hydrierung entscheidend für die pharmazeutische Chemie ist – viele Medikamente erfordern eine selektive Reduktion von Doppelbindungen. Der Katalysator stellt sicher, dass die Reaktion bei Raumtemperatur stattfindet, anstatt hohe Temperaturen zu erfordern. Das Verständnis von Hydrierungsmechanismen hilft pharmazeutischen Chemikern, selektive Reaktionen zu entwerfen, die spezifische Bindungen reduzieren, ohne andere funktionelle Gruppen in komplexen Arzneimittelmolekülen zu beeinträchtigen.",
            RS_ADVANCED_2: "In der Novartis Halogenierungssynthese-Anlage demonstriert Dr. Chen die Ethylen-Bromierung – eine klassische Additionsreaktion. Die molekulare Animation zeigt, wie sich Brom der Ethylen-Doppelbindung nähert, die Pi-Bindung bricht und Bromatome addiert werden, um 1,2-Dibromethan zu bilden. Diese exotherme Reaktion verläuft über ein zyklisches Bromoniumion-Zwischenprodukt, das in der Animation veranschaulicht wird. Das Labor nutzt Bromierungsreaktionen zur Synthese pharmazeutischer Zwischenprodukte und verarbeitet monatlich 500 kg bromierte Verbindungen. Dr. Chen erklärt, dass das Bromoniumion-Zwischenprodukt eine Anti-Addition gewährleistet – die beiden Bromatome addieren sich von gegenüberliegenden Seiten der Doppelbindung. Das Verständnis dieses Mechanismus ist entscheidend für die pharmazeutische Synthese, bei der die Stereochemie die Arzneimittelaktivität bestimmt. Die Visualisierung zeigt, wie das Brommolekül polarisiert, während es sich der elektronenreichen Doppelbindung nähert, und so die Additionsreaktion einleitet. Diese Reaktion ist beispielhaft dafür, wie pharmazeutische Chemiker die Stereochemie durch mechanistisches Verständnis steuern.",
            RS_ADVANCED_3: "Im Basler industriellen Chemielabor demonstriert Professorin Müller die Ethanolsynthese aus Ethylen und Wasser. Bei dieser säurekatalysierten Hydratisierungsreaktion bricht die C=C-Doppelbindung, wobei sich Wasser über sie anlagert, um Ethanol zu bilden. Die molekulare Animation zeigt die Ethylen-Protonierung, die Bildung eines Karbokations, den Angriff von Wasser und die Deprotonierung zu Ethanol. Diese exotherme Reaktion erzeugt 44 kJ pro Mol Ethanol. Das Labor untersucht diese Reaktion, da sie industriell zur Herstellung von Ethanol als pharmazeutisches Lösungsmittel genutzt wird – Basler Pharmaunternehmen verbrauchen monatlich 10.000 Liter Ethanol. Professorin Müller erklärt, dass die Reaktion über ein Karbokation-Zwischenprodukt verläuft, was in der Animation deutlich dargestellt wird. Das Verständnis von Karbokationsmechanismen ist grundlegend für die pharmazeutische Chemie – viele Synthesereaktionen in der Arzneimittelherstellung verlaufen über Karbokation-Zwischenprodukte. Die Visualisierung veranschaulicht, wie Säurekatalysatoren Reaktionen durch Protonierung von Substraten erleichtern und so reaktive Zwischenprodukte schaffen."
        },
        back: "Zurück zum Nexus",
        title: "SC1.06 // CHEMISCHE REAKTIONEN GRUNDLAGEN",
        difficulty: {
            basic: "BASIS",
            core: "KERN",
            advanced: "FORTGESCHRITTEN",
            elite: "ELITE"
        },
        objective_title: "Aktuelles Missionsziel",
        target_title: "Chemische Reaktionen",
        next: "Nächste Sequenz ausführen",
        check: "Prüfen",
        correct: "Verifiziert",
        incorrect: "Fehlanpassung",
        ready: "Bereit",
        monitor_title: "SC1.06_REAKTIONEN_MONITOR",
        footer_left: "SC1.06_CHEMISCHE_REAKTIONEN // KNOTEN: BASEL",
        stages: {
            reaction_types: "REAKTIONSTYPEN",
            equation_balancing: "GLEICHUNGSAUSGLEICH",
            reaction_simulation: "REAKTIONSSIMULATION",
            reaction_types_desc: "Chemische Reaktionen nach Typ klassifizieren",
            equation_balancing_desc: "Chemische Gleichungen mit Koeffizienten ausgleichen",
            reaction_simulation_desc: "Molekulare Reaktionsanimationen beobachten"
        },
        reactionTypes: {
            synthesis: "Synthese",
            decomposition: "Zersetzung",
            single_replacement: "Einfachersatz",
            double_replacement: "Doppelaustausch",
            combustion: "Verbrennung"
        },
        reactionTypePatterns: {
            synthesis: "A + B → AB",
            decomposition: "AB → A + B",
            single_replacement: "A + BC → AC + B",
            double_replacement: "AB + CD → AD + CB",
            combustion: "CₓHᵧ + O_2 → CO_2 + H_2O"
        },
        reactionTypeDescriptions: {
            synthesis: "Zwei oder mehr Stoffe verbinden sich zu einem einzigen Produkt",
            decomposition: "Eine einzelne Verbindung zerfällt in zwei oder mehr einfachere Stoffe",
            single_replacement: "Ein Element ersetzt ein anderes in einer Verbindung",
            double_replacement: "Zwei Verbindungen tauschen Ionen aus, um zwei neue Verbindungen zu bilden",
            combustion: "Ein Kohlenwasserstoff reagiert mit Sauerstoff zu Kohlendioxid und Wasser"
        },
        ui: {
            submit: "Absenden",
            reset: "Zurücksetzen",
            next: "Weiter",
            verify: "Überprüfen",
            play: "Abspielen",
            pause: "Pause",
            restart: "Neu starten",
            speed: "Geschwindigkeit",
            hint: "Hinweis",
            show_atom_counts: "Atomzahlen anzeigen",
            hide_atom_counts: "Atomzahlen ausblenden",
            coefficient: "Koeffizient",
            select_reaction_type: "Reaktionstyp auswählen"
        },
        feedback: {
            correct: "Richtig! Gut gemacht.",
            incorrect: "Falsch. Versuchen Sie es erneut.",
            try_again: "Erneut versuchen",
            hint_available: "Hinweis verfügbar",
            balanced: "Gleichung ist ausgeglichen!",
            unbalanced: "Gleichung ist nicht ausgeglichen",
            check_elements: "Überprüfen Sie die folgenden Elemente:"
        },
        energy: {
            energy_released: "Energie freigesetzt",
            energy_absorbed: "Energie absorbiert",
            exothermic: "Exotherm",
            endothermic: "Endotherm",
            energy_diagram: "Energiediagramm"
        },
        atomCount: {
            reactants: "Reaktanten",
            products: "Produkte",
            element: "Element",
            count: "Anzahl",
            balanced: "Ausgeglichen",
            unbalanced: "Nicht ausgeglichen",
            atom_count_table: "Atomzahltabelle"
        },
        prompts: {
            classify_reaction: "Untersuchen Sie die chemische Gleichung und identifizieren Sie den Reaktionstyp. Berücksichtigen Sie das Muster von Reaktanten und Produkten.",
            balance_equation: "Geben Sie Koeffizienten ein, um die chemische Gleichung auszugleichen. Stellen Sie sicher, dass die Anzahl der Atome jedes Elements auf beiden Seiten gleich ist.",
            observe_simulation: "Beobachten Sie die molekulare Animation, um zu sehen, wie Bindungen während der Reaktion brechen und sich bilden. Verwenden Sie die Steuerelemente zum Abspielen, Pausieren oder Neustarten.",
            analyze_reaction: "Analysieren Sie die chemischen Reaktionsparameter und überprüfen Sie die stöchiometrischen Beziehungen."
        },
        visualization: {
            title: "Molekulare Visualisierung",
            description: "Beobachten Sie die Molekülstruktur und Reaktionsdynamik",
            current_equation: "Aktuelle chemische Gleichung"
        },
        loading: "Chemische Reaktionssimulation wird initialisiert...",
        hints: {
            synthesis_hint: "Suchen Sie nach mehreren Reaktanten, die sich zu einem einzigen Produkt verbinden",
            decomposition_hint: "Suchen Sie nach einem einzelnen Reaktanten, der in mehrere Produkte zerfällt",
            single_replacement_hint: "Suchen Sie nach einem Element, das ein anderes in einer Verbindung ersetzt",
            double_replacement_hint: "Suchen Sie nach zwei Verbindungen, die Ionen austauschen",
            combustion_hint: "Suchen Sie nach einem Kohlenwasserstoff, der mit Sauerstoff zu CO_2 und H_2O reagiert",
            balancing_hint: "Beginnen Sie mit dem Ausgleichen von Elementen, die nur in einem Reaktanten und einem Produkt vorkommen",
            coefficient_hint: "Versuchen Sie, den Koeffizienten für {compound} anzupassen",
            unbalanced_element_hint: "Das Element {element} ist nicht ausgeglichen: {reactantCount} auf der linken Seite, {productCount} auf der rechten Seite"
        },
        mission: {
            title: "MISSION: CHEMISCHE REAKTIONEN",
            description: "Meistern Sie chemische Reaktionstypen, Gleichungsausgleich und molekulares Verständnis von Reaktionen."
        },
        labels: {
            equation: "CHEMISCHE GLEICHUNG",
            reaction_type: "REAKTIONSTYP",
            coefficients: "KOEFFIZIENTEN",
            atom_counts: "ATOMZAHLEN",
            energy_change: "ENERGIEÄNDERUNG",
            molecular_view: "MOLEKULARE ANSICHT",
            pattern: "MUSTER",
            example: "BEISPIEL"
        },
        equation_balancer: {
            title: "Chemische Gleichung ausgleichen",
            element: "Element",
            reactants: "Reaktanten",
            products: "Produkte",
            status: "Status",
            balanced: "✓ Gleichung ist ausgeglichen!",
            unbalanced: "✗ Gleichung ist nicht ausgeglichen",
            correct: "Richtig! Die Gleichung ist ausgeglichen.",
            incorrect: "Falsch. Die Gleichung ist nicht ausgeglichen. Überprüfen Sie die Atomzahlen.",
            hint: "Hinweis",
            show_hint: "Hinweis anzeigen",
            hide_hint: "Hinweis ausblenden",
            reset: "Zurücksetzen",
            submit: "Absenden",
            already_balanced: "Die Gleichung ist bereits ausgeglichen!",
            no_hint: "Kein Hinweis verfügbar.",
            hint_increase_products: "Versuchen Sie, den Koeffizienten für ein Produkt mit {element} zu erhöhen",
            hint_increase_reactants: "Versuchen Sie, den Koeffizienten für einen Reaktanten mit {element} zu erhöhen"
        }
    },
    sc2_07: {
        scenarios: {
            CAL_BASIC_1: "Im Chemielabor der Universität Basel führen Erstsemester-Studierende ein Experiment zur schrittweisen Kalorimetrie durch. Durch Messen des Temperaturanstiegs von Wasser, nachdem ein erhitztes Metall mit bekannter spezifischer Wärmekapazität hineingegeben wurde, können die Studierenden die Wärmekapazität berechnen. Dr. Weber erklärt, dass diese Technik in der pharmazeutischen Industrie grundlegend ist, insbesondere um sicherzustellen, dass die in der Produktion verwendeten Reaktionsgefäße der Hitze spezifischer exothermer Reaktionen standhalten können. Die Studierenden beobachten die Temperaturänderung des Wassers und verwenden die Formel q = mcΔT, um den Wärmeübergang zu bestimmen. Dieses Experiment ermöglicht ein intuitives Verständnis des ersten Hauptsatzes der Thermodynamik und legt den Grundstein für komplexere fluiddynamische Studien bei Novartis oder Roche.",
            CAL_BASIC_2: "Im Stabilitätstestzentrum von Roche testet die Technikerin Maria die Wärmeableitungseffizienz eines neuen Lösungsmittels. Das Experiment beinhaltet die Zufuhr einer bekannten Energiemenge in das Lösungsmittel und die Aufzeichnung der Temperaturänderung über die Zeit. Maria erklärt, dass während der Arzneimittelsynthese viele Reaktionen große Mengen an Wärme freisetzen; wenn die Wärmekapazität des Lösungsmittels nicht hoch genug ist, kann eine lokale Überhitzung die Wirksamkeit des Medikaments verringern oder sogar Sicherheitsunfälle verursachen. Das Zentrum führt jährlich 500 solcher Tests durch, um sicherzustellen, dass alle bei der Herstellung neuer Medikamente verwendeten Lösungsmittelsysteme sicher sind. Die Beherrschung der q = mcΔT-Berechnung ist für jeden analytischen Chemiker unerlässlich, da sie direkt mit dem Energiemanagement und der Produktionseffizienz im pharmazeutischen Prozess zusammenhängt.",
            CAL_BASIC_3: "An einem Umweltüberwachungspunkt am Rhein misst der Techniker Thomas das natürliche Wärmegleichgewicht des Flusswassers. Er berechnet die Gesamttemperaturänderung nach der Vermischung der leicht erwärmten Flüssigkeit aus der Kläranlage mit dem Rheinwasser. Thomas weist darauf hin, dass Basel extrem strenge Kontrollen für die Temperatur industrieller Abwässer hat, um die wärmeempfindlichen Lachspopulationen im Rhein zu schützen. Diese praktische Anwendung der Kalorimetrie zeigt, wie chemische Verfahrenstechnik mit ökologischem Schutz kombiniert wird. Die Studierenden lernen, dass selbst kleine Unterschiede von 1 oder 2 Grad Celsius bei groß angelegten Berechnungen gigantische Energieströme beinhalten. Diese Aufgabe unterstreicht die Bedeutung präziser Messungen von Wärmekapazität und Masse für die Umweltqualitätsbewertung.",
            CAL_BASIC_4: "Im Labor für Materialcharakterisierung bei Novartis führt der Forscher Dr. Hoffmann Lehrlinge durch ein Neutralisationswärme-Experiment, um die Wärmekapazität des Kalorimeters zu kalibrieren. Sie mischen Salzsäure und Natriumhydroxid und zeichnen den steilen Temperaturanstieg innerhalb der wenigen Sekunden der Reaktion genau auf. Hoffmann betont, dass vor der Durchführung hochpräziser Enthalpiemessungen bekannt sein muss, wie viel Wärme das Kalorimeter selbst absorbiert (d. h. die Kalorimeterkonstante). Dies ist ein gängiger Laborstandard, der sicherstellt, dass die bei Novartis hergestellten High-End-Biopharmazeutika bei Energieberechnungen keine Fehler aufweisen. Durch die Berechnung der Neutralisationswärme lernen die Studierenden, wie q = mcΔT für die Energieumwandlung angewendet wird, und erfahren die Bedeutung präziser Versuchsbedingungen für die pharmazeutische Forschung.",
            CAL_BASIC_5: "Im Labor der Basler Schule für Prozesstechnik vergleichen Studierende die Wärmeübertragungseffizienz verschiedener Metalle wie Aluminium, Kupfer und Edelstahl. Sie beobachten die Gleichgewichtstemperatur, indem sie heiße Metallblöcke in ein adiabatisches Kalorimeter geben. Die Lehrerin Sarah erklärt, dass in großtechnischen Produktionsanlagen bei Roche oder Novartis die Materialwahl für Reaktionsgefäße oft von den thermischen Eigenschaften der Metalle abhängt. Aluminium und Edelstahl sind zwar korrosionsbeständig, aber ihre unterschiedlichen Wärmekapazitäten bestimmen das Design der Kühlsysteme der Reaktoren. Durch diese Übung beherrschen die Studierenden die Grundformel für den Wärmeaustausch und verstehen, warum diese Basiskalorimetrie ein Eckpfeiler für das Gerätedesign und die Prozesssicherheit in der Arzneimittelindustrie ist.",
            CAL_CORE_1: "Im Roche-Syntheselabor am Standort Grenzacherstrasse überwacht der leitende Chemiker Dr. Hartmann die Veresterung von Benzoesäure mit Methanol zur Herstellung von Benzoesäuremethylester. Diese Synthesereaktion ist ein entscheidender Schritt bei der Herstellung von Formulierungen für Lokalanästhetika. Die Reaktion erfordert einen Säurekatalysator und eine präzise Temperaturkontrolle bei 65 °C. Dr. Hartmanns Team produziert monatlich 500 kg Benzoesäuremethylester für pharmazeutische Anwendungen. Der Veresterungsprozess ist grundlegend für die pharmazeutische Chemie – Roche synthetisiert in Basel über 50 verschiedene Esterverbindungen für diverse Medikamente. Diese Reaktion zeigt, wie einfache Prinzipien der organischen Synthese auf die industrielle pharmazeutische Produktion skaliert werden. Die Qualitätskontrolle des Labors stellt eine Reinheit von 99,8 % sicher. Das Verständnis von Veresterungsreaktionen ist für pharmazeutische Chemiker unerlässlich, die neue Arzneimittelformulierungen für den globalen Markt von Roche entwickeln.",
            CAL_CORE_2: "In der Novartis-Anlage für fortgeschrittene Synthese im Basler Klybeck-Quartier leitet Dr. Chen die Acetylierung von Anilin zur Herstellung von Acetanilid, einem wichtigen pharmazeutischen Zwischenprodukt. Bei dieser Synthesereaktion wird Anilin mit Acetylchlorid behandelt, wobei Acetanilid und Chlorwasserstoffgas entstehen. Die Reaktion ist stark exotherm und erfordert Kühlung, um die Temperatur bei 5 °C zu halten. Novartis produziert monatlich 2 Tonnen Acetanilid für die Analgetika-Synthese. Dr. Chen erklärt, dass Acetylierungsreaktionen grundlegend für die pharmazeutische Chemie sind – Aspirin selbst wird durch Acetylierung von Salicylsäure hergestellt. Die fortschrittlichen Reaktorsysteme der Anlage steuern die Reaktionsbedingungen präzise und gewährleisten eine gleichbleibende Produktqualität. Dieser Syntheseweg wird in der Basler Pharmaindustrie seit über 80 Jahren genutzt. Der Prozess zeigt, wie klassische organische Synthesereaktionen in der modernen Arzneimittel herstellung unverzichtbar bleiben.",
            CAL_CORE_3: "Im Novartis Historischen Labor demonstriert Dr. Schneider die klassische Synthese von Aspirin (Acetylsalicylsäure), die 1897 entdeckt wurde und Basel zum pharmazeutischen Zentrum machte. Diese Reaktion erfolgt aus Salicylsäure und Essigsäureanhydrid und setzt Wärme frei. Während moderne Novartis-Anlagen effizientere Prozesse nutzen, wird diese klassische Synthese immer noch Chemiestudierenden beigebracht, um die pharmazeutische Geschichte zu veranschaulichen. Das Labor befindet sich am ursprünglichen Standort der Novartis-Gründung im Jahr 1886. Dr. Schneider erklärt, dass das Verständnis dieser Synthesereaktion die Studierenden mit dem pharmazeutischen Erbe Basels verbindet – Aspirin war eines der ersten synthetischen Medikamente, die in Basel in Massenproduktion hergestellt wurden. Diese Reaktion ist beispielhaft dafür, wie die organische Synthese die Medizin veränderte und die Basler Pharmaindustrie begründete.",
            CAL_CORE_4: "Im Roche Labor für fortgeschrittene organische Chemie überwacht Dr. Hoffmann die Synthese von Phenylacetonitril aus Benzylchlorid und Natriumcyanid. Diese einfache Substitutionsreaktion, bei der Cyanid Chlorid verdrängt, ist entscheidend für die Herstellung pharmazeutischer Zwischenprodukte. Die Reaktion erfordert aufgrund der Toxizität von Cyanid strenge Sicherheitsprotokolle – das Labor arbeitet unter Unterdruck mit fortschrittlichen Reinigungssystemen. Roche produziert monatlich 800 kg Phenylacetonitril zur Synthese von Herz-Kreislauf-Medikamenten. Dr. Hoffmann betont, dass dies zwar wie eine einfache Verdrängungsreaktion erscheint, in Wirklichkeit aber eine nukleophile Substitution vom Typ SN2 ist – ein anspruchsvoller Mechanismus, der in der fortgeschrittenen organischen Chemie gelehrt wird. Diese Reaktion zeigt, wie pharmazeutische Chemiker klassische Reaktionstypen anpassen, um komplexe Arzneimittelsynthesen durchzuführen und Basels Position als globales pharmazeutisches Innovationszentrum zu behaupten.",
            CAL_CORE_5: "Im Novartis Labor für pharmazeutische Prozessentwicklung demonstriert der Chemiker Dr. Weber die Synthese von Natriumphenolat aus Phenol und Natriumhydroxid. Diese doppelter Substitutionsreaktion (eigentlich eine Säure-Base-Neutralisation) ist unerlässlich für die Aktivierung von Phenol für nachfolgende Kupplungsreaktionen in der Arzneimittelsynthese. Die Reaktion ist exotherm und setzt Wärme frei, während sich das Phenolatsalz bildet. Novartis nutzt diese Reaktion bei der Synthese von antimikrobiellen Wirkstoffen und Konservierungsmitteln für pharmazeutische Formulierungen. Dr. Webers Team verarbeitet monatlich 1.500 kg Phenol in verschiedenen pharmazeutischen Synthesen. Das Labor ist mit automatisierten Reaktoren und Echtzeit-Überwachungssystemen ausgestattet. Das Verständnis dieses Reaktionstyps ist für pharmazeutische Chemiker von entscheidender Bedeutung – viele Arzneimittelmoleküle enthalten phenolische Gruppen, die durch ähnliche Reaktionen aktiviert werden müssen. Dieser Prozess verdeutlicht, wie grundlegende Reaktionstypen in Basels weltweit führenden Pharmaindustrie-Anlagen industriell skaliert werden.",
            CAL_ADVANCED_1: "Im Zentrum für fortgeschrittene Thermodynamik an der Universität Basel demonstriert der Forscher Dr. Müller Doktoranden komplexe kalorimetrische Analysen. Bei diesem Experiment wird mit einem Präzisionsbombenkalorimeter die Verbrennungsenthalpie eines spezifischen pharmazeutischen Zwischenprodukts gemessen. Da die Basler Pharmaunternehmen nach effizienteren Produktionsverfahren streben, sind präzise Daten zum energetischen Fußabdruck von entscheidender Bedeutung geworden. Dr. Müller erklärt, dass diese fortschrittliche Technik subtile endotherme und exotherme Phasenübergänge erfassen kann. Das Zentrum arbeitet seit langem mit Novartis zusammen, um das adiabate Design großer Fermenter zu optimieren. Die Studierenden müssen nicht nur ΔH berechnen, sondern auch mehrere Quellen von Wärmeverlusten bewerten, was die Genauigkeit bei industriellen Maßstäben erhöht. Dieser Prozess ist ein Beispiel dafür, wie theoretische Thermochemie angewendet wird, um komplexe Energiemanagement-Herausforderungen in den weltweit führenden Pharmaunternehmen zu lösen.",
            CAL_ADVANCED_2: "In der Abteilung für Prozessoptimierung bei Roche entwirft der Ingenieur Andreas ein Kühlsystem für einen neuen 5.000-Liter-Bioreaktor. Er nutzt fortschrittliche kalorimetrische Daten, um die variierenden Wärmefreisetzungsraten während der Kultivierung hochkonzentrierter Zellkulturen zu simulieren. Andreas stellt fest, dass einfache Kalorimetrie-Berechnungen nicht mehr ausreichen, um dem komplexen biosynthetischen Stress gerecht zu werden. Sie verwenden die Differential Scanning Calorimetry (DSC), um die dynamische Entwicklung der spezifischen Wärmekapazität jeder Komponente während der Reaktion zu überwachen. Diese Arbeit beeinflusst direkt die Energieeffizienz der neuen Produktionsanlage von Roche im Basler Stadtteil St. Johann. Durch präzise ΔH-Modellierung wird erwartet, dass die Fabrik jährlich 15 % an Kühlenergiekosten einspart. Die Studierenden lernen in dieser Aufgabe durch Simulation dieser komplexen Parameter, wie man fortgeschrittene Kalorimetrie in echten industriellen Nutzen und Umweltleistung umsetzt.",
            CAL_ADVANCED_3: "In der Novartis-Pilotanlage für nachhaltige Energie erforscht der leitende Wissenschaftler Dr. Chen Technologien zur Nutzung industrieller Abwärme für die Fernwärmeversorgung. Die Kalorimetrie spielt dabei eine zentrale Rolle; sie müssen den gesamten Wärmefluss messen, der durch die Hitzeschilde des Reaktors geleitet wird. Chen erklärt, dass das Ziel von Novartis in Basel ein kohlenstoffneutraler Innovationscampus ist, bei dem jede von einer Reaktion freigesetzte 'Abwärme' quantifiziert und wiederverwendet werden sollte. Diese Aufgabe beinhaltet die Berechnung von Wärmekapazitätsänderungen und des Gesamten thalpiestroms komplexer Fluide beim Durchgang durch Wärmetauscher. Die Studierenden beobachten, dass in hochpräzisen industriellen Umgebungen jede winzige Korrektur der spezifischen Wärme erhebliche Auswirkungen auf die Wärmelastbilanz des gesamten Campus hat. Diese globale Energieperspektive ist eine wesentliche Fähigkeit für moderne pharmazeutische Chemiker und spiegelt die ökologische Führungsposition Basels im globalen Life-Science-Sektor wider.",
            CAL_ADVANCED_4: "Am Basler Institut für Bioengineering erforscht Professorin Sarah die winzigen Energieaustausche bei der Proteinfaltung. Dieses spezialisierte Experiment zur Isothermen Titrationskalorimetrie (ITC) zielt darauf ab, die Bindungsenthalpie zwischen Wirkstoffmolekülen und Zielproteinen zu bestimmen. Da diese Energieänderungen extrem klein sind, ist die Empfindlichkeit und Umweltstabilität des Kalorimeters von entscheidender Bedeutung. Dr. Sarah erklärt, dass die von Roche entwickelten Antikörpertherapien stark von diesen grundlegenden thermodynamischen Parametern abhängen, um die Wirkstoffaffinität zu optimieren. Das Labor befindet sich im dynamischen Innovationsstreifen am Rhein und zieht Spitzenwissenschaftler aus der ganzen Welt an. In dieser Aufgabe lernen die Studierenden, wie fortgeschrittene thermochemische Prinzipien angewendet werden, um die komplexen Wechselwirkungen zwischen Lebensmolekülen zu entschlüsseln. Dies ist nicht nur Chemieunterricht, sondern eine Reise in das Verständnis der Beziehung zwischen biologischen Prozessen und Energieumwandlung auf molekularer Ebene.",
            CAL_ADVANCED_5: "Im globalen Sicherheitsbewertungszentrum von Roche in Basel führt Dr. Zimmermann thermische Stabilitätsprüfungen für gefährliche Chemikalien durch. Mit einem fortgeschrittenen adiabaten Kalorimeter simuliert sein Team Extremszenarien eines Kühlungsfehlers in einem Reaktionsgefäß, um die Starttemperatur einer möglichen unkontrollierten Reaktion zu bestimmen. Zimmermann betont, dass die genaue Vorhersage von Wärmemenge und -rate der einzige Weg ist, um industrielle Katastrophen zu verhindern. Novartis und Roche führen für jeden neuen Prozess, der in Betrieb geht, mindestens 20 solcher hochspezialisierten Kalorimetrie-Experimente durch. Durch die Verarbeitung von experimentellen Daten zur Berechnung des maximalen Temperaturanstiegs und des potenziellen Drucks verstehen die Studierenden, warum die fortgeschrittene thermochemische Berechnung der Maßstab für den Sicherheitsmythos der Basler Pharmaindustrie ist. Diese Aufgabe vermittelt die entscheidende Rolle strenger wissenschaftlicher Einstellungen in der Life-Science-Industrie und das Engagement für Prozesssicherheit.",
            CAL_ELITE_1: "Im Novartis-Labor für fortgeschrittene thermische Analyse leitet Dr. Hartmann die Leistungsbewertung neuer Materialien zum Schutz der pharmazeutischen Kühlkette. Mit hochempfindlicher kalorimetrischer Technik simulieren sie die Auswirkungen extremer Temperaturschwankungen in globalen Transportketten auf die Enthalpie von Biopharmazeutika. Hartmann weist darauf hin, dass die Aktivität biologischer Arzneimittel extrem empfindlich auf kleinste Wärmeschwankungen reagiert; eine präzise ΔH-Bestimmung kann über Erfolg oder Misserfolg von Medikamenten in Millionenhöhe entscheiden. Das Labor kombiniert Materialphysik mit Thermochemie. In dieser Elite-Aufgabe müssen die Studierenden komplexe Berechnungen der latenten Wärme von Phasenübergängen mit realen Logistikdaten integrieren und erleben, wie Grundlagenwissenschaft in entscheidenden geschäftlichen Nutzen umgewandelt wird. Dies repräsentiert den handwerklichen Geist der Basler Pharmaindustrie, in jedem Detail nach Perfektion zu streben.",
            CAL_ELITE_2: "Im Roche-Zentrum für digitale Zwillinge in Basel demonstriert der Chefwissenschaftler Dr. Chen, wie hochaufgelöste kalorimetrische Daten zur Echtzeit-KI-Simulation pharmazeutischer Prozesse genutzt werden. Jede Sekunde werden Wärmeflussdaten von Tausenden von Sensoren in digitale Signale umgewandelt, um die Ausbeute an komplexen Interferonen zu optimieren. Chen erklärt, dass die zugrunde liegende Logik zwar immer noch auf der Grundformel für Wärmekapazität und Masse basiert, die präzise Vorhersage transienter Enthalpieänderungen bei der Verarbeitung riesiger Datenmengen jedoch zum Schlüssel für die Effizienzsteigerung geworden ist. Das Zentrum ist ein Maßstab für Roche im Bereich Industrie 4.0; es erhöht nicht nur die Produktionsgeschwindigkeit, sondern reduziert auch die Energieabweichung jeder Charge auf unter 0,01 %. Durch diese Aufgabe erhalten die Lehrlinge Einblick in die vorderste Front des Energiemanagements in der zukünftigen Pharmaindustrie und verstehen die Bedeutung von Präzision.",
            CAL_ELITE_3: "Im Globalen Nachhaltigkeitsrat im Novartis-Hauptquartier in Basel prüft Dr. Schneider eine Lebenszyklusanalyse für die Umstellung der gesamten chemischen Synthesekette von erdölbasierten auf wasserbasierte Lösungsmittel. Die zentrale Herausforderung ist die Umstrukturierung des industriellen Energieverbrauchs aufgrund der hohen spezifischen Wärmekapazität von Wasser. Sie müssen fortgeschrittene kalorimetrische Modelle anwenden, um die Heiz- und Kühlzyklen für Tausende von Reaktoren auf dem gesamten Novartis-Campus neu zu berechnen. Schneider betont, dass diese radikale Umgestaltung des Energiesystems vom molekularen Level aus die schwierigste Aufgabe beim Übergang der Basler Pharmaindustrie zu einer grünen und kohlenstoffarmen Zukunft ist. Die Studierenden übernehmen in dieser Aufgabe die Rolle des 'Chief Energy Officer' und müssen chemische Eigenschaften, technische Ökonomie und Umweltkosten integrieren, um einen Bewertungsbericht zu erstellen, der die zukünftige Richtung der Pharmaindustrie der Stadt beeinflussen kann.",
            CAL_ELITE_4: "Im Forschungszentrum für Umwelt- und Energie-Synergie im Rheintal erforscht Dr. Hoffmann eine revolutionäre Technologie zur unterirdischen thermischen Energiespeicherung, mit dem Ziel, überschüssige Winterenergie zum Betrieb sommerlicher pharmazeutischer Kühlanlagen zu verwenden. Die Kalorimetrie spielt dabei eine Schlüsselrolle bei der Überbrückung von geothermischer Speicherung und industriellem Bedarf. Hoffmann weist darauf hin, dass Basel über eine einzigartige Gesteinsschichtstruktur verfügt, die als riesiger 'natürlicher Wärmepuffer' dienen kann. In dieser Aufgabe sollen die Studierenden den Gesamtenthalpievorrat und die Wärmeaustauscheffizienz von großflächigen Wasserkörpern und Gesteinen im Maßstab von Millionen Kubikmetern berechnen. Als regionales Energieprojekt, das von Novartis und Roche unterstützt wird, werden die Ergebnisse die Energierechnung der Stadt Basel direkt beeinflussen. Die Studierenden beschäftigen sich in dieser Elite-Aufgabe mit makroskopischen Energiethemen, die über Reagenzgläser und Bechergläser hinausgehen.",
            CAL_ELITE_5: "In der Roche Future Factory Design Group in Basel entwirft Dr. Weber ein völlig neues 'reaktorloses' mikrofluidisches Synthesesystem. Dieses System nutzt Mikrometerkanäle für chemische Reaktionen, und sein präzises Wärmemanagement stellt die traditionellen Grenzen der großskaligen Kalorimetrie völlig auf den Kopf. Weber betont, dass bei mikroskopischen Skalen die drastische Änderung des Oberflächen-zu-Volumen-Verhältnisses dazu führt, dass der sofortige Wärmetransport nicht mehr den makroskopischen Vereinfachungsgesetzen folgt. Um die extrem hohe Reinheit der nächsten Generation zielgerichteter Medikamente von Basel zu gewährleisten, müssen sie ultraschnelle dynamische Überwachungen kleinster Enthalpieänderungen im Femtoliter-Bereich durchführen. Diese Elite-Aufgabe fordert die Studierenden heraus, traditionelle Denkweisen zu durchbrechen und die Kalorimetrie an ihre physikalischen Grenzen zu bringen. Durch die Lösung dieser Wärmeübertragungsprobleme in der Mikrofluidik treten die Studierenden in einen Dialog mit den Spitzeningenieuren der Basler Pharmaindustrie und erforschen die vorderste Front der molekularen Präzisionsfertigung.",
            HL_BASIC_1: "In einer Vorlesung über anorganische Chemie an der Universität Basel lernt Emma, wie man das Hess'sche Gesetz verwendet, um die Reaktionsenthalpie für die Oxidation von Kohlenstoff zu Kohlenmonoxid zu bestimmen. Da Kohlenmonoxid meist gemischt mit Kohlendioxid entsteht, ist die direkte Messung der ΔH für diesen spezifischen Schritt extrem schwierig. Dr. Weber erklärt, dass wir durch die bekannten Enthalpieänderungen der Verbrennung von Kohlenmonoxid und der vollständigen Verbrennung von Kohlenstoff die Logik der Energieerhaltung nutzen können, um den Zwischenschritt zu berechnen. Diese indirekte Messmethode wird in der Basler Industrie, insbesondere in der Katalyseforschung bei Novartis, häufig angewendet. Durch das Zeichnen von Enthalpiezyklen lernen die Studierenden, chemische Reaktionen als Pfade zu betrachten, die wie mathematische Gleichungen addiert oder subtrahiert werden können, und erfahren die strenge Schönheit der Gesetze der Thermodynamik.",
            HL_BASIC_2: "Im Analytiklabor von Roche an der Grenzacherstrasse nutzt die Analytikerin Maria das Hess'sche Gesetz, um das Energieprofil eines neuen Katalysators zu validieren. Maria erklärt, dass Katalysatoren zwar die Gesamtreaktionsenthalpie nicht ändern, aber die Zwischenschritte beeinflussen. Die Kenntnis der Stabilität verschiedener Zwischenprodukte ist entscheidend für die Wahl des richtigen Synthesewegs. Das Hess'sche Gesetz besagt, dass die Gesamtenergieänderung vom Edukt zum Endprodukt konstant ist, unabhängig vom Produktionsweg. Das Labor führt täglich Hunderte solcher logischen Validierungen durch, um sicherzustellen, dass jedes Gramm Edelmetallkatalysator den maximalen wirtschaftlichen Nutzen bringt. Die Studierenden schlüpfen in dieser Aufgabe in die Rolle eines Praktikanten und üben, Syntheseenthalpien für Wirkstoffmoleküle durch Addition und Subtraktion bekannter Reaktionsgleichungen abzuleiten.",
            HL_BASIC_3: "In der Aerodynamik-Gruppe des Basler Umweltüberwachungszentrums erforscht der Techniker Thomas das Energieniveau der Umwandlung von Schwefeldioxid in Schwefeltrioxid in der Atmosphäre. Da dies ein mehrstufiger, reversibler Prozess mit komplexen Nebenreaktionen ist, wird das Hess'sche Gesetz zum einzigen verlässlichen Werkzeug zur Berechnung des gesamten thermischen Umwelt effekts. Thomas weist darauf hin, dass Basler Pharmaunternehmen extrem strenge Schwefelemissionsstandards haben; das Verständnis der Enthalpieänderungen dieser atmosphärischen Reaktionen hilft, die Leistung der Abgaswäscher zu optimieren. Diese Fallstudie zeigt, dass das Hess'sche Gesetz nicht nur in Lehrbüchern existiert, sondern ein wissenschaftlicher Schutzschild für die saubere Basler Luft ist. Durch diese Übung berechnen die Studierenden die Gesamtenergieänderung während der Entstehung von saurem Regen und verstehen die Natur chemischer Zustandsfunktionen.",
            HL_BASIC_4: "In einer Werkstatt für organische Synthese bei Novartis leitet der Ingenieur Dr. Hoffmann sein Team an, die Bildungsenthalpie eines in Basel häufig verwendeten chiralen Zwischenprodukts aus bekannten Verbrennungsenthalpien zu berechnen. Dr. Hoffmann sagt den Studierenden, dass wir in einem weltweit führenden pharmazeutischen Zentrum wie Basel oft nicht in der Lage sind, komplexe Zwischenprodukte direkt in einfachen Experimenten herzustellen, aber wir können eine 'Umweg-Strategie' anwenden – unter Nutzung riesiger Datenbanken bekannter Reaktionen, um unser Ziel zu rekonstruieren. Das Hess'sche Gesetz ist die Seele dieser Strategie. Die Studierenden prüfen Enthalpiedaten in Chemiehandbüchern und lösen komplexe Energierätsel durch einfache algebraische Operationen. Dieser Prozess macht den Studierenden klar, dass exzellente Chemiker vorhandene Informationen nutzen müssen, um scheinbar unerreichbare technische Probleme durch logische Ableitung zu lösen.",
            HL_BASIC_5: "Bei einem Workshop für Sekundarlehrkräfte im Basler Stadtteil St. Johann demonstriert Professorin Sarah die 'Visualisierungsmethode' des Hess'schen Gesetzes im Unterricht. Durch den Aufbau eines Energiediagramms zeigt sie den Schülern deutlich, dass vom Anfangsstoff bis zum Endprodukt der Gesamthöhenunterschied fix ist, egal wie viele Stufen übersprungen werden. Sarah weist darauf hin, dass diese Logik eines der mächtigsten Vorhersagewerkzeuge in der chemischen Forschung ist. Im berühmten Basler Chemieviertel nutzen Ingenieure solche Diagramme, um hocheffiziente Wärmeübertragungsnetzwerke zu entwerfen. In diesem Level platzieren die Studierenden virtuelle Kacheln, um chemische Reaktionspfeile auszurichten und so die Erhaltung von Atomen und Energie sicherzustellen. Diese intuitive logische Übung trainiert nicht nur thermochemische Fähigkeiten, sondern fördert auch das ganzheitliche Denken, das zur Lösung komplexer wissenschaftlicher Probleme erforderlich ist.",
            HL_CORE_1: "Im Kernforschungsgebäude von Roche steht der leitende Wissenschaftler Dr. Hartmann vor einer Herausforderung: die exakte Vorhersage des thermischen Gesamteffekts eines neu entdeckten mehrstufigen antiviralen Synthesewegs. Die Reaktion enthält drei instabile Zwischenprodukte, und die direkte Messung ihrer Enthalpieänderungen wäre sowohl teuer als auch gefährlich. Hartmann beschließt, eine 'Hess-Gesetz-Verteidigung' zu starten und nutzt die Pfadunabhängigkeit des Gesetzes, um die komplexe Reaktion in eine Reihe einfacher Schritte zu zerlegen, die in Basler Standardlaboren bekannt sind. Diese Aufgabe erfordert von den Studierenden eine präzise Handhabung von Vorzeichen und Koeffizienten chemischer Gleichungen. Wenn ein Schritt umgekehrt werden muss, muss auch das Vorzeichen von ΔH geändert werden. Dies ist nicht nur Mathematik, sondern ein tiefes Verständnis des Prinzips des 'äquivalenten Austauschs' von chemischen Substanzen bei der Energieumwandlung.",
            HL_CORE_2: "Im automatisierten Labor des Novartis Klybeck-Campus generieren KI-Systeme Tausende von möglichen Synthesewegen; die Aufgabe des Ingenieurs Dr. Chen ist es, mithilfe des Hess'schen Gesetzes die energetisch stabilsten Optionen auszuwählen. Chen erklärt, dass viele hocheffiziente Synthesemethoden oft in komplexen chemischen Zyklen verborgen sind und die direkte Messung von ΔH aufgrund von Unreinheiten oder zu hoher Geschwindigkeit fehlschlagen kann. Aber aufgrund der logischen Strenge des Hess'schen Gesetzes können wir jedes unbekannte Energiepuzzle zusammensetzen, solange wir verlässliche 'bekannte Blöcke' haben. Dieses Level bewertet die Fähigkeit der Studierenden, mehrstufige Gleichungssysteme zu lösen. Durch Eliminierung von Zwischenprodukten (wie Radikalen im Gaszustand) leiten die Studierende die Energiekonstante des Zielwirkstoffs ab. Dies ist eine fortgeschrittene logische Fähigkeit, die für den Eintritt in die Riege der Basler Pharma-Elite erforderlich ist.",
            HL_CORE_3: "In der Halle für Reduktionschemie im Basler Industriemuseum erklärt Dr. Schneider den Besuchern, wie man die Enthalpie der Eisenreduktion bei hohen Temperaturen mit indirekten Methoden berechnet. Da es physikalisch unmöglich ist, die energetische Bewegung jedes Atoms im Hochofen direkt zu messen, können wir diesen industriellen Prozess mithilfe des Hess'schen Gesetzes vereinfachen – als Summe aus Laborexperimenten wie der Kohlenstoff-Sauerstoff-Reaktion und der Metalloxid-Reaktion. Schneider betont, dass diese Weisheit, 'das Schwierige durch das Einfache zu lösen', es den frühen Basler Chemiefabriken ermöglichte, die thermische Last der Massenproduktion bereits im 19. Jahrhundert exakt zu kontrollieren. Die Studierenden bearbeiten in diesem Level komplexere Koeffizientenbilanzen und lernen, die Atomarten und -mengen beim Überlagern von Gleichungen völlig gleichwertig zu halten – eine Hommage an den wissenschaftlichen Geist der Basler Industriegeschichte.",
            HL_CORE_4: "Im globalen Qualitätssicherungszentrum von Roche prüft Dr. Hoffmann einen Bericht über die thermischen Risiken der Synthese eines Krebsmedikaments. Ein entscheidender Schritt ist die indirekte Berechnung der Zersetzungsenthalpie eines hochreaktiven organischen Peroxid-Zwischenprodukts. Durch Anwendung des Hess'schen Gesetzes wird dieser unsichere Schritt mit sicheren Verbrennungsreaktionen verknüpft; durch den Wechsel des Messpfads wird die Sicherheit des Laborpersonals massiv geschützt. Hoffmann weist darauf hin, dass in einer Branche wie der Pharmazie, wo es um Menschenleben geht, der geschlossene Datenkreislauf das höchste Sicherheitsniveau darstellt. Die Studierenden müssen vier scheinbar unzusammenhängende Reaktionen kombinieren und das Hess'sche Gesetz anwenden, um die Ziel-ΔH abzuleiten. Dieser Prozess schult nicht nur die Präzision algebraischer Berechnungen, sondern vermittelt auch die 'pfadunabhängige' Denkweise als kluge Strategie zur Lösung hochschwieriger und risikoreicher Aufgaben.",
            HL_CORE_5: "Am Institut für Physikalische Chemie der Universität Basel leitet Professor Müller Studierende an, die Adsorptionsenthalpie an Metallkatalysatoroberflächen mithilfe des Hess'schen Gesetzes zu erforschen. Da Adsorptionsprozesse oft von komplexer Oberflächendiffusion begleitet werden, mischen sich bei der direkten Kalorimetrie oft Störsignale unter das Ergebnis. Durch Zerlegung des Adsorptionsprozesses in eine Kombination aus Gasphasenreaktion und Festphasenabscheidung bietet das Hess'sche Gesetz die reinste thermodynamische Analyse. Das Institut befindet sich im berühmten Basler 'Life Science Triangle' und ist für seine Genauigkeit bekannt. Die Studierenden müssen in diesem Kernlevel Hess-Zyklen bearbeiten, die Unterschiede im Aggregatzustand (fest, flüssig, gasförmig) enthalten. Jede Zustandsänderung (wie die Verdampfungsenthalpie) muss berücksichtigt werden, was die Realitätsnähe und Herausforderung massiv erhöht und die industrielle Detailgenauigkeit perfekt simuliert.",
            EC_BASIC_1: "In einer Vorlesung über anorganische Chemie an der Universität Basel lernt Emma, wie man das Hess'sche Gesetz verwendet, um die Reaktionsenthalpie für die Oxidation von Kohlenstoff zu Kohlenmonoxid zu bestimmen. Da Kohlenmonoxid meist gemischt mit Kohlendioxid entsteht, ist die direkte Messung der ΔH für diesen spezifischen Schritt extrem schwierig. Dr. Weber erklärt, dass wir durch die bekannten Enthalpieänderungen der Verbrennung von Kohlenmonoxid und der vollständigen Verbrennung von Kohlenstoff die Logik der Energieerhaltung nutzen können, um den Zwischenschritt zu berechnen. Diese indirekte Messmethode wird in der Basler Industrie, insbesondere in der Katalyseforschung bei Novartis, häufig angewendet. Durch das Zeichnen von Enthalpiezyklen lernen die Studierenden, chemische Reaktionen als Pfade zu betrachten, die wie mathematische Gleichungen addiert oder subtrahiert werden können, und erfahren die strenge Schönheit der Gesetze der Thermodynamik.",
            EC_BASIC_2: "Im Analytiklabor von Roche an der Grenzacherstrasse nutzt die Analytikerin Maria das Hess'sche Gesetz, um das Energieprofil eines neuen Katalysators zu validieren. Maria erklärt, dass Katalysatoren zwar die Gesamtreaktionsenthalpie nicht ändern, aber die Zwischenschritte beeinflussen. Die Kenntnis der Stabilität verschiedener Zwischenprodukte ist entscheidend für die Wahl des richtigen Synthesewegs. Das Hess'sche Gesetz besagt, dass die Gesamtenergieänderung vom Edukt zum Endprodukt konstant ist, unabhängig vom Produktionsweg. Das Labor führt täglich Hunderte solcher logischen Validierungen durch, um sicherzustellen, dass jedes Gramm Edelmetallkatalysator den maximalen wirtschaftlichen Nutzen bringt. Die Studierenden schlüpfen in dieser Aufgabe in die Rolle eines Praktikanten und üben, Syntheseenthalpien für Wirkstoffmoleküle durch Addition und Subtraktion bekannter Reaktionsgleichungen abzuleiten.",
            EC_BASIC_3: "In der Aerodynamik-Gruppe des Basler Umweltüberwachungszentrums erforscht der Techniker Thomas das Energieniveau der Umwandlung von Schwefeldioxid in Schwefeltrioxid in der Atmosphäre. Da dies ein mehrstufiger, reversibler Prozess mit komplexen Nebenreaktionen ist, wird das Hess'sche Gesetz zum einzigen verlässlichen Werkzeug zur Berechnung des gesamten thermischen Umwelt effekts. Thomas weist darauf hin, dass Basler Pharmaunternehmen extrem strenge Schwefelemissionsstandards haben; das Verständnis der Enthalpieänderungen dieser atmosphrischen Reaktionen hilft, die Leistung der Abgaswäscher zu optimieren. Diese Fallstudie zeigt, dass das Hess'sche Gesetz nicht nur in Lehrbüchern existiert, sondern ein wissenschaftlicher Schutzschild für die saubere Basler Luft ist. Durch diese Übung berechnen die Studierenden die Gesamtenergieänderung während der Entstehung von saurem Regen und verstehen die Natur chemischer Zustandsfunktionen.",
            EC_BASIC_4: "In einer Werkstatt für organische Synthese bei Novartis leitet der Ingenieur Dr. Hoffmann sein Team an, die Bildungsenthalpie eines in Basel häufig verwendeten chiralen Zwischenprodukts aus bekannten Verbrennungsenthalpien zu berechnen. Dr. Hoffmann sagt den Studierenden, dass wir in einem weltweit führenden pharmazeutischen Zentrum wie Basel oft nicht in der Lage sind, komplexe Zwischenprodukte direkt in einfachen Experimenten herzustellen, aber wir können eine 'Umweg-Strategie' anwenden – unter Nutzung riesiger Datenbanken bekannter Reaktionen, um unser Ziel zu rekonstruieren. Das Hess'sche Gesetz ist die Seele dieser Strategie. Die Studierenden prüfen Enthalpiedaten in Chemiehandbüchern und lösen komplexe Energierätsel durch einfache algebraische Operationen. Dieser Prozess macht den Studierenden klar, dass exzellente Chemiker vorhandene Informationen nutzen müssen, um scheinbar unerreichbare technische Probleme durch logische Ableitung zu lösen.",
            EC_BASIC_5: "Bei einem Workshop für Sekundarlehrkräfte im Basler Stadtteil St. Johann demonstriert Professorin Sarah die 'Visualisierungsmethode' des Hess'schen Gesetzes im Unterricht. Durch den Aufbau eines Energiediagramms zeigt sie den Schülern deutlich, dass vom Anfangsstoff bis zum Endprodukt der Gesamthöhenunterschied fix ist, egal wie viele Stufen übersprungen werden. Sarah weist darauf hin, dass diese Logik eines der mächtigsten Vorhersagewerkzeuge in der chemischen Forschung ist. Im berühmten Basler Chemieviertel nutzen Ingenieure solche Diagramme, um hocheffiziente Wärmeübertragungsnetzwerke zu entwerfen. In diesem Level platzieren die Studierenden virtuelle Kacheln, um chemische Reaktionspfeile auszurichten und so die Erhaltung von Atomen und Energie sicherzustellen. Diese intuitive logische Übung trainiert nicht nur thermochemische Fähigkeiten, sondern fördert auch das ganzheitliche Denken, das zur Lösung komplexer wissenschaftlicher Probleme erforderlich ist.",
            EC_CORE_1: "Im Kernforschungsgebäude von Roche steht der leitende Wissenschaftler Dr. Hartmann vor einer Herausforderung: die exakte Vorhersage des thermischen Gesamteffekts eines neu entdeckten mehrstufigen antiviralen Synthesewegs. Die Reaktion enthält drei instabile Zwischenprodukte, und die direkte Messung ihrer Enthalpieänderungen wäre sowohl teuer als auch gefährlich. Hartmann beschließt, eine 'Hess-Gesetz-Verteidigung' zu starten und nutzt die Pfadunabhängigkeit des Gesetzes, um die komplexe Reaktion in eine Reihe einfacher Schritte zu zerlegen, die in Basler Standardlaboren bekannt sind. Diese Aufgabe erfordert von den Studierenden eine präzise Handhabung von Vorzeichen und Koeffizienten chemischer Gleichungen. Wenn ein Schritt umgekehrt werden muss, muss auch das Vorzeichen von ΔH geändert werden. Dies ist nicht nur Mathematik, sondern ein tiefes Verständnis des Prinzips des 'äquivalenten Austauschs' von chemischen Substanzen bei der Energieumwandlung.",
            EC_CORE_2: "Im automatisierten Labor des Novartis Klybeck-Campus generieren KI-Systeme Tausende von möglichen Synthesewegen; die Aufgabe des Ingenieurs Dr. Chen ist es, mithilfe des Hess'schen Gesetzes die energetisch stabilsten Optionen auszuwählen. Chen erklärt, dass viele hocheffiziente Synthesemethoden oft in komplexen chemischen Zyklen verborgen sind und die direkte Messung von ΔH aufgrund von Unreinheiten oder zu hoher Geschwindigkeit fehlschlagen kann. Aber aufgrund der logischen Strenge des Hess'schen Gesetzes können wir jedes unbekannte Energiepuzzle zusammensetzen, solange wir verlässliche 'bekannte Blöcke' haben. Dieses Level bewertet die Fähigkeit der Studierenden, mehrstufige Gleichungssysteme zu lösen. Durch Eliminierung von Zwischenprodukten (wie Radikalen im Gaszustand) leiten die Studierende die Energiekonstante des Zielwirkstoffs ab. Dies ist eine fortgeschrittene logische Fähigkeit, die für den Eintritt in die Riege der Basler Pharma-Elite erforderlich ist.",
            EC_CORE_3: "In der Halle für Reduktionschemie im Basler Industriemuseum erklärt Dr. Schneider den Besuchern, wie man die Enthalpie der Eisenreduktion bei hohen Temperaturen mit indirekten Methoden berechnet. Da es physikalisch unmöglich ist, die energetische Bewegung jedes Atoms im Hochofen direkt zu messen, können wir diesen industriellen Prozess mithilfe des Hess'schen Gesetzes vereinfachen – als Summe aus Laborexperimenten wie der Kohlenstoff-Sauerstoff-Reaktion und der Metalloxid-Reaktion. Schneider betont, dass diese Weisheit, 'das Schwierige durch das Einfache zu lösen', es den frühen Basler Chemiefabriken ermöglichte, die thermische Last der Massenproduktion bereits im 19. Jahrhundert exakt zu kontrollieren. Die Studierenden bearbeiten in diesem Level komplexere Koeffizientenbilanzen und lernen, die Atomarten und -mengen beim Überlagern von Gleichungen völlig gleichwertig zu halten – eine Hommage an den wissenschaftlichen Geist der Basler Industriegeschichte.",
            EC_CORE_4: "Im globalen Qualitätssicherungszentrum von Roche prüft Dr. Hoffmann einen Bericht über die thermischen Risiken der Synthese eines Krebsmedikaments. Ein entscheidender Schritt ist die indirekte Berechnung der Zersetzungsenthalpie eines hochreaktiven organischen Peroxid-Zwischenprodukts. Durch Anwendung des Hess'schen Gesetzes wird dieser unsichere Schritt mit sicheren Verbrennungsreaktionen verknüpft; durch den Wechsel des Messpfads wird die Sicherheit des Laborpersonals massiv geschützt. Hoffmann weist darauf hin, dass in einer Branche wie der Pharmazie, wo es um Menschenleben geht, der geschlossene Datenkreislauf das höchste Sicherheitsniveau darstellt. Die Studierenden müssen vier scheinbar unzusammenhängende Reaktionen kombinieren und das Hess'sche Gesetz anwenden, um die Ziel-ΔH abzuleiten. Dieser Prozess schult nicht nur die Präzision algebraischer Berechnungen, sondern vermittelt auch die 'pfadunabhängige' Denkweise als kluge Strategie zur Lösung hochschwieriger und risikoreicher Aufgaben.",
            EC_CORE_5: "Am Institut für Physikalische Chemie der Universität Basel leitet Professor Müller Studierende an, die Adsorptionsenthalpie an Metallkatalysatoroberflächen mithilfe des Hess'schen Gesetzes zu erforschen. Da Adsorptionsprozesse oft von komplexer Oberflächendiffusion begleitet werden, mischen sich bei der direkten Kalorimetrie oft Störsignale unter das Ergebnis. Durch Zerlegung des Adsorptionsprozesses in eine Kombination aus Gasphasenreaktion und Festphasenabscheidung bietet das Hess'sche Gesetz die reinste thermodynamische Analyse. Das Institut befindet sich im berühmten Basler 'Life Science Triangle' und ist für seine Genauigkeit bekannt. Die Studierenden müssen in diesem Kernlevel Hess-Zyklen bearbeiten, die Unterschiede im Aggregatzustand (fest, flüssig, gasförmig) enthalten. Jede Zustandsänderung (wie die Verdampfungsenthalpie) muss berücksichtigt werden, was die Realitätsnähe und Herausforderung massiv erhöht und die industrielle Detailgenauigkeit perfekt simuliert.",
            EC_ADVANCED_1: "Im Zentrum für fortgeschrittene Thermodynamik an der Universität Basel demonstriert der Forscher Dr. Müller Doktoranden komplexe kalorimetrische Analysen. Bei diesem Experiment wird mit einem Präzisionsbombenkalorimeter die Verbrennungsenthalpie eines spezifischen pharmazeutischen Zwischenprodukts gemessen. Da die Basler Pharmaunternehmen nach effizienteren Produktionsverfahren streben, sind präzise Daten zum energetischen Fußabdruck von entscheidender Bedeutung geworden. Dr. Müller erklärt, dass diese fortschrittliche Technik subtile endotherme und exotherme Phasenübergänge erfassen kann. Das Zentrum arbeitet seit langem mit Novartis zusammen, um das adiabate Design großer Fermenter zu optimieren. Die Studierenden müssen nicht nur ΔH berechnen, sondern auch mehrere Quellen von Wärmeverlusten bewerten, was die Genauigkeit bei industriellen Maßstäben erhöht. Dieser Prozess ist ein Beispiel dafür, wie theoretische Thermochemie angewendet wird, um komplexe Energiemanagement-Herausforderungen in den weltweit führenden Pharmaunternehmen zu lösen.",
            EC_ADVANCED_2: "In der Abteilung für Prozessoptimierung bei Roche entwirft der Ingenieur Andreas ein Kühlsystem für einen neuen 5.000-Liter-Bioreaktor. Er nutzt fortschrittliche kalorimetrische Daten, um die variierenden Wärmefreisetzungsraten während der Kultivierung hochkonzentrierter Zellkulturen zu simulieren. Andreas stellt fest, dass einfache Kalorimetrie-Berechnungen nicht mehr ausreichen, um dem komplexen biosynthetischen Stress gerecht zu werden. Sie verwenden die Differential Scanning Calorimetry (DSC), um die dynamische Entwicklung der spezifischen Wärmekapazität jeder Komponente während der Reaktion zu überwachen. Diese Arbeit beeinflusst direkt die Energieeffizienz der neuen Produktionsanlage von Roche im Basler Stadtteil St. Johann. Durch präzise ΔH-Modellierung wird erwartet, dass die Fabrik jährlich 15 % an Kühlenergiekosten einspart. Die Studierenden lernen in dieser Aufgabe durch Simulation dieser komplexen Parameter, wie man fortgeschrittene Kalorimetrie in echten industriellen Nutzen und Umweltleistung umsetzt.",
            EC_ADVANCED_3: "In der Novartis-Pilotanlage für nachhaltige Energie erforscht der leitende Wissenschaftler Dr. Chen Technologien zur Nutzung industrieller Abwärme für die Fernwärmeversorgung. Die Kalorimetrie spielt dabei eine zentrale Rolle; sie müssen den gesamten Wärmefluss messen, der durch die Hitzeschilde des Reaktors geleitet wird. Chen erklärt, dass das Ziel von Novartis in Basel ein kohlenstoffneutraler Innovationscampus ist, bei dem jede von einer Reaktion freigesetzte 'Abwärme' quantifiziert und wiederverwendet werden sollte. Diese Aufgabe beinhaltet die Berechnung von Wärmekapazitätsänderungen und des Gesamten thalpiestroms komplexer Fluide beim Durchgang durch Wärmetauscher. Die Studierenden beobachten, dass in hochpräzisen industriellen Umgebungen jede winzige Korrektur der spezifischen Wärme erhebliche Auswirkungen auf die Wärmelastbilanz des gesamten Campus hat. Diese globale Energieperspektive ist eine wesentliche Fähigkeit für moderne pharmazeutische Chemiker und spiegelt die ökologische Führungsposition Basels im globalen Life-Science-Sektor wider.",
            EC_ADVANCED_4: "Am Basler Institut für Bioengineering erforscht Professorin Sarah die winzigen Energieaustausche bei der Proteinfaltung. Dieses spezialisierte Experiment zur Isothermen Titrationskalorimetrie (ITC) zielt darauf ab, die Bindungsenthalpie zwischen Wirkstoffmolekülen und Zielproteinen zu bestimmen. Da diese Energieänderungen extrem klein sind, ist die Empfindlichkeit und Umweltstabilität des Kalorimeters von entscheidender Bedeutung. Dr. Sarah erklärt, dass die von Roche entwickelten Antikörpertherapien stark von diesen grundlegenden thermodynamischen Parametern abhängen, um die Wirkstoffaffinität zu optimieren. Das Labor befindet sich im dynamischen Innovationsstreifen am Rhein und zieht Spitzenwissenschaftler aus der ganzen Welt an. In dieser Aufgabe lernen die Studierenden, wie fortgeschrittene thermochemische Prinzipien angewendet werden, um die komplexen Wechselwirkungen zwischen Lebensmolekülen zu entschlüsseln. Dies ist nicht nur Chemieunterricht, sondern eine Reise in das Verständnis der Beziehung zwischen biologischen Prozessen und Energieumwandlung auf molekularer Ebene.",
            EC_ADVANCED_5: "Im globalen Sicherheitsbewertungszentrum von Roche in Basel führt Dr. Zimmermann thermische Stabilitätsprüfungen für gefährliche Chemikalien durch. Mit einem fortgeschrittenen adiabaten Kalorimeter simuliert sein Team Extremszenarien eines Kühlungsfehlers in einem Reaktionsgefäß, um die Starttemperatur einer möglichen unkontrollierten Reaktion zu bestimmen. Zimmermann betont, dass die genaue Vorhersage von Wärmemenge und -rate der einzige Weg ist, um industrielle Katastrophen zu verhindern. Novartis und Roche führen für jeden neuen Prozess, der in Betrieb geht, mindestens 20 solcher hochspezialisierten Kalorimetrie-Experimente durch. Durch die Verarbeitung von experimentellen Daten zur Berechnung des maximalen Temperaturanstiegs und des potenziellen Drucks verstehen die Studierenden, warum die fortgeschrittene thermochemische Berechnung der Maßstab für den Sicherheitsmythos der Basler Pharmaindustrie ist. Diese Aufgabe vermittelt die entscheidende Rolle strenger wissenschaftlicher Einstellungen in der Life-Science-Industrie und das Engagement für Prozesssicherheit.",
            EC_ELITE_1: "Im Novartis-Labor für fortgeschrittene thermische Analyse leitet Dr. Hartmann die Leistungsbewertung neuer Materialien zum Schutz der pharmazeutischen Kühlkette. Mit hochempfindlicher kalorimetrischer Technik simulieren sie die Auswirkungen extremer Temperaturschwankungen in globalen Transportketten auf die Enthalpie von Biopharmazeutika. Hartmann weist darauf hin, dass die Aktivität biologischer Arzneimittel extrem empfindlich auf kleinste Wärmeschwankungen reagiert; eine präzise ΔH-Bestimmung kann über Erfolg oder Misserfolg von Medikamenten in Millionenhöhe entscheiden. Das Labor kombiniert Materialphysik mit Thermochemie. In dieser Elite-Aufgabe müssen die Studierenden komplexe Berechnungen der latenten Wärme von Phasenübergängen mit realen Logistikdaten integrieren und erleben, wie Grundlagenwissenschaft in entscheidenden geschäftlichen Nutzen umgewandelt wird. Dies repräsentiert den handwerklichen Geist der Basler Pharmaindustrie, in jedem Detail nach Perfektion zu streben.",
            EC_ELITE_2: "Im Roche-Zentrum für digitale Zwillinge in Basel demonstriert der Chefwissenschaftler Dr. Chen, wie hochaufgelöste kalorimetrische Daten zur Echtzeit-KI-Simulation pharmazeutischer Prozesse genutzt werden. Jede Sekunde werden Wärmeflussdaten von Tausenden von Sensoren in digitale Signale umgewandelt, um die Ausbeute an komplexen Interferonen zu optimieren. Chen erklärt, dass die zugrunde liegende Logik zwar immer noch auf der Grundformel für Wärmekapazität und Masse basiert, die präzise Vorhersage transienter Enthalpieänderungen bei der Verarbeitung riesiger Datenmengen jedoch zum Schlüssel für die Effizienzsteigerung geworden ist. Das Zentrum ist ein Maßstab für Roche im Bereich Industrie 4.0; es erhöht nicht nur die Produktionsgeschwindigkeit, sondern reduziert auch die Energieabweichung jeder Charge auf unter 0,01 %. Durch diese Aufgabe erhalten die Lehrlinge Einblick in die vorderste Front des Energiemanagements in der zukünftigen Pharmaindustrie und verstehen die Bedeutung von Präzision.",
            EC_ELITE_3: "Im Globalen Nachhaltigkeitsrat im Novartis-Hauptquartier in Basel prüft Dr. Schneider eine Lebenszyklusanalyse für die Umstellung der gesamten chemischen Synthesekette von erdölbasierten auf wasserbasierte Lösungsmittel. Die zentrale Herausforderung ist die Umstrukturierung des industriellen Energieverbrauchs aufgrund der hohen spezifischen Wärmekapazität von Wasser. Sie müssen fortgeschrittene kalorimetrische Modelle anwenden, um die Heiz- und Kühlzyklen für Tausende von Reaktoren auf dem gesamten Novartis-Campus neu zu berechnen. Schneider betont, dass diese radikale Umgestaltung des Energiesystems vom molekularen Level aus die schwierigste Aufgabe beim Übergang der Basler Pharmaindustrie zu einer grünen und kohlenstoffarmen Zukunft ist. Die Studierenden übernehmen in dieser Aufgabe die Rolle des 'Chief Energy Officer' und müssen chemische Eigenschaften, technische Ökonomie und Umweltkosten integrieren, um einen Bewertungsbericht zu erstellen, der die zukünftige Richtung der Pharmaindustrie der Stadt beeinflussen kann.",
            EC_ELITE_4: "Im Forschungszentrum für Umwelt- und Energie-Synergie im Rheintal erforscht Dr. Hoffmann eine revolutionäre Technologie zur unterirdischen thermischen Energiespeicherung, mit dem Ziel, überschüssige Winterenergie zum Betrieb sommerlicher pharmazeutischer Kühlanlagen zu verwenden. Die Kalorimetrie spielt dabei eine Schlüsselrolle bei der Überbrückung von geothermischer Speicherung und industriellem Bedarf. Hoffmann weist darauf hin, dass Basel über eine einzigartige Gesteinsschichtstruktur verfügt, die als riesiger 'natürlicher Wärmepuffer' dienen kann. In dieser Aufgabe sollen die Studierenden den Gesamtenthalpievorrat und die Wärmeaustauscheffizienz von großflächigen Wasserkörpern und Gesteinen im Maßstab von Millionen Kubikmetern berechnen. Als regionales Energieprojekt, das von Novartis und Roche unterstützt wird, werden die Ergebnisse die Energierechnung der Stadt Basel direkt beeinflussen. Die Studierenden beschäftigen sich in dieser Elite-Aufgabe mit makroskopischen Energiethemen, die über Reagenzgläser und Bechergläser hinausgehen.",
            EC_ELITE_5: "In der Roche Future Factory Design Group in Basel entwirft Dr. Weber ein völlig neues 'reaktorloses' mikrofluidisches Synthesesystem. Dieses System nutzt Mikrometerkanäle für chemische Reaktionen, und sein präzises Wärmemanagement stellt die traditionellen Grenzen der großskaligen Kalorimetrie völlig auf den Kopf. Weber betont, dass bei mikroskopischen Skalen die drastische Änderung des Oberflächen-zu-Volumen-Verhältisses dazu führt, dass der sofortige Wärmetransport nicht mehr den makroskopischen Vereinfachungsgesetzen folgt. Um die extrem hohe Reinheit der nächsten Generation zielgerichteter Medikamente von Basel zu gewährleisten, müssen sie ultraschnelle dynamische Überwachungen kleinster Enthalpieänderungen im Femtoliter-Bereich durchführen. Diese Elite-Aufgabe fordert die Studierenden heraus, traditionelle Denkweisen zu durchbrechen und die Kalorimetrie an ihre physikalischen Grenzen zu bringen. Durch die Lösung dieser Wärmeübertragungsprobleme in der Mikrofluidik treten die Studierenden in einen Dialog mit den Spitzeningenieuren der Basler Pharmaindustrie und erforschen die vorderste Front der molekularen Präzisionsfertigung."
        },
        back: "Zurück zum Nexus",
        title: "SC2.07 // ENTHALPIE & ENERGETIK",
        difficulty: {
            basic: "BASIS",
            core: "KERN",
            advanced: "ERWEITERT",
            elite: "ELITE"
        },
        objective_title: "Aktives Missionsziel",
        target_title: "Thermochemie",
        next: "Nächste Sequenz ausführen",
        check: "Überprüfen",
        correct: "Verifiziert",
        incorrect: "Fehlanpassung",
        ready: "Bereit",
        monitor_title: "SC2.07_ENTHALPIE_MONITOR",
        footer_left: "SC2.07_ENTHALPIE_ENERGETIK // KNOTEN: BASEL",
        stages: {
            energy_changes: "ENERGIEÄNDERUNGEN",
            hess_law: "HESS'SCHES GESETZ",
            calorimetry: "KALORIMETRIE"
        },
        prompts: {
            calculate_enthalpy: "Berechnen Sie die Enthalpieänderung (ΔH) für diese Reaktion",
            apply_hess_law: "Wenden Sie das Hess'sche Gesetz an, um ΔH zu bestimmen",
            calculate_heat: "Berechnen Sie die Wärmeänderung mit q = mcΔT",
            solve_problem: "Lösen Sie das thermochemische Problem"
        },
        feedback: {
            correct: "Richtig! Ihre Berechnung ist korrekt.",
            incorrect: "Falsch. Erwartet: {expected} kJ",
            invalid_number: "Bitte geben Sie eine gültige Zahl ein"
        },
        mission: {
            title: "MISSION: THERMOCHEMIE",
            description: "Meistern Sie Enthalpieberechnungen, Hess'sches Gesetz und Kalorimetrie in pharmazeutischen Kontexten."
        },
        visualization: {
            title: "Energiediagramm",
            description: "Visuelle Darstellung von Enthalpieänderungen",
            current_equation: "Aktuelle Reaktion"
        },
        loading: "Thermodynamik-Kern wird initialisiert..."
    },

    // SC1.07: Sustainability & Recycling
    sc1_07: {
        title: "SC1.07 // NACHHALTIGKEIT & RECYCLING",
        back: "Zurück",
        difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
        stages: {
            recycling: "RECYCLING",
            green_chemistry: "GRÜNE CHEMIE",
            circular_economy: "KREISLAUFWIRTSCHAFT"
        },
        footer_left: "SC1.07_NACHHALTIGKEIT // KNOTEN: BASEL",
        check: "Verifizieren",
        next: "Nächste Herausforderung",
        correct: "Nachhaltigkeitsdaten verifiziert",
        incorrect: "Parameter prüfen",
        labels: { mission_objective: "ÖKOBILANZ", terminal_input: "ÖKO-EINGABE", hint: "HINWEIS" },
        prompts: {
            sc1_07_q1: "Identifizieren Sie diesen recycelbaren Kunststoff (Abkürzung).",
            sc1_07_q2: "Berechnen Sie die ideale Atomökonomie (%).",
            sc1_07_q3: "Identifizieren Sie den Startpunkt des Produktlebenszyklus."
        }
    }
};
