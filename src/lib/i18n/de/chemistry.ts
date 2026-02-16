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
            system_pressure: "SYSTEMDRUCK"
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
            zn_concentration: "Zn²⁺-KONZENTRATION",
            cu_concentration: "Cu²⁺-KONZENTRATION",
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
            build_hint: "Zn wird an der Anode oxidiert, Cu²⁺ an der Kathode reduziert",
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
        title: "C1.01 // GEHEIM LABOR",
        difficulty: {
            basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE"
        },
        objective_title: "Aktuelles Missionsziel",
        target_title: "Substanzanalyse",
        next: "Nächste Sequenz",
        check: "Überprüfen",
        correct: "Verifiziert",
        incorrect: "Abweichung",
        ready: "Bereit",
        monitor_title: "C1.01_LABOR_MONITOR",
        footer_left: "C1.01_GEHEIM_LABOR // KNOTEN: BASEL",
        labels: {
            input: "EINGABE",
            hints: "HINWEISE",
            substance: "Substanz",
            tool: "Testwerkzeug",
            observation: "Beobachtung"
        },
        mission: {
            title: "PULVER-IDENTIFIKATION",
            description: "Identifizieren Sie mysteriöse weiße Pulver mit klassischen chemischen Tests. Meistern Sie die qualitative Analyse."
        },
        stages: {
            identify: "IDENTIFIZIEREN",
            properties: "EIGENSCHAFTEN",
            reactions: "REAKTIONEN"
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
            input: "EINGABE",
            scale: "WAAGENANZEIGE"
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
            protons: "PROTONEN (p⁺)",
            neutrons: "NEUTRONEN (n⁰)",
            electrons: "ELEKTRONEN (e⁻)"
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
            half_life: "Universitätsspital Basel: Berechnen Sie Arzneimittel-Eliminationshalbwertszeiten für die Pharmakokinetik. Die Halbwertszeit ist die Zeit, die benötigt wird, damit eine Menge auf die Hälfte ihres Anfangswerts reduziert wird. Kinetik erster Ordnung ist bei der Arzneimittelmetabolisierung üblich, wobei t₁/₂ = ln(2)/k."
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
            arr_two_temps: "Messen Sie k bei 300K und 350K. Verwenden Sie ln(k₂/k₁) = -Ea/R(1/T₂ - 1/T₁) um Ea=52 kJ/mol zu finden.",
            arr_plot: "Arrhenius-Diagramm hat Steigung -7800 K. Berechnen Sie Ea (Steigung = -Ea/R).",
            arr_frequency: "Gegeben k=1.5×10⁻⁹, Ea=50 kJ/mol, T=300K. Finden Sie präexponentiellen Faktor A.",
            arr_temp_for_k: "Ziel-Geschwindigkeitskonstante k=10⁶ s⁻¹, Ea=60 kJ/mol. Welche Temperatur wird benötigt?",
            arr_enzyme: "Enzymkatalysierte Reaktion: Ea=40 kJ/mol, Körpertemperatur T=310K. Berechnen Sie k.",
            arr_complex: "Zweistufiger Mechanismus: Ea1=50, Ea2=30 kJ/mol. Gesamt-Ea=40 kJ/mol. Finden Sie k bei 300K.",
            arr_pressure: "Druckeffekt: Aktivierungsvolumen ΔV‡=-10 cm³/mol. Berechnen Sie k-Verhältnis.",
            arr_quantum: "Quantentunnelkorrektur κ=2.5. Finden Sie effektives k.",
            arr_isotope: "Kinetischer Isotopeneffekt: H vs D Substitution. Berechnen Sie kH/kD für Ea=50 kJ/mol.",
            arr_transition: "Übergangszustandstheorie: k=10⁶ s⁻¹ bei 300K. Berechnen Sie ΔG‡.",
            rl_first_order: "Reaktion erster Ordnung: Rate = k[A]. Gegeben [A]=2.0 M, k=0.5 s⁻¹, finden Sie Rate.",
            rl_second_order: "Zweiter Ordnung: Rate = k[A]². [A]=1.5 M, k=0.4 M⁻¹s⁻¹. Berechnen Sie Rate.",
            rl_zero_order: "Nullter Ordnung: Rate = k (unabhängig von [A]). k=0.8 M/s. Finden Sie Rate.",
            rl_concentration: "Reaktion erster Ordnung: [A] verdoppelt sich. Um welchen Faktor steigt die Rate?",
            rl_initial: "Anfangsgeschwindigkeitsmethode: [A]₀=1.0 M, k=0.6 s⁻¹. Berechnen Sie Anfangsrate.",
            rl_mixed: "Gemischte Ordnung: Rate = k[A][B]. [A]=2 M, [B]=3 M, k=0.5 M⁻²s⁻¹. Finden Sie Rate.",
            rl_order: "Verdopplung von [A] vervierfacht Rate. Was ist die Reaktionsordnung n?",
            rl_integrated: "Integrierte erste Ordnung: [A]t = [A]₀·e⁻ᵏᵗ. [A]₀=1 M, k=0.1 s⁻¹, t=10 s. Finden Sie [A].",
            rl_time: "Halbwertszeit erster Ordnung: t₁/₂ = ln(2)/k. Gegeben k=0.05 s⁻¹, finden Sie t₁/₂.",
            rl_constant: "Aus Rate=2 M/s und [A]=4 M (erste Ordnung), bestimmen Sie k.",
            rl_complex_order: "Gebrochene Ordnung: Rate = k[A]^1.5[B]^0.5. [A]=4, [B]=9, k=0.2. Finden Sie Rate.",
            rl_mechanism: "Mehrstufig: Gesamtrate = k₁k₂/(k₁+k₂). k₁=0.5, k₂=0.3. Berechnen Sie Rate.",
            rl_steady_state: "Stationäre Näherung: [I]ss = k₁[A]/k₂. k₁=0.5, k₂=0.2. Finden Sie [I].",
            rl_pre_equilibrium: "Vorgleichgewicht: Keq = kf/kr. kf=0.8, kr=0.2. Berechnen Sie Keq.",
            rl_inhibition: "Kompetitive Hemmung: Rate reduziert um Faktor (1+[I]/KI). [I]=2, KI=1. Finden Sie Ratefaktor.",
            rl_oscillating: "Belousov-Zhabotinsky oszillierende Reaktion. Maximum [A] im Zyklus.",
            rl_autocatalytic: "Autokatalytisch: A+B→2B. Wendepunkt bei t=15s für [A]₀=0.1 M.",
            rl_chain: "Kettenreaktion: Kettenlänge ν = kp/kt. kp/kt=100. Finden Sie ν.",
            rl_photochemical: "Photochemische Quantenausbeute Φ = reagierte Moleküle / absorbierte Photonen = 0.8.",
            rl_enzyme_complex: "Michaelis-Menten: V = Vmax[S]/(KM+[S]). KM=1, [S]=5. Finden Sie V/Vmax.",
            hl_first_order: "Halbwertszeit erster Ordnung: t₁/₂ = ln(2)/k = 0.693/k. k=0.1 s⁻¹. Finden Sie t₁/₂.",
            hl_second_order: "Zweiter Ordnung: t₁/₂ = 1/(k[A]₀). k=0.5 M⁻¹s⁻¹, [A]₀=2 M. Berechnen Sie t₁/₂.",
            hl_zero_order: "Nullter Ordnung: t₁/₂ = [A]₀/(2k). k=0.4 M/s, [A]₀=4 M. Finden Sie t₁/₂.",
            hl_remaining: "Nach 2 Halbwertszeiten, welcher Bruchteil bleibt? [A]₀=8 M → [A]=?",
            hl_time: "75% Zerfall bedeutet 2 Halbwertszeiten. Wenn t₁/₂=10s, Gesamtzeit = 20s.",
            hl_find_k: "Aus t₁/₂=5s (erste Ordnung), berechnen Sie k = ln(2)/t₁/₂.",
            hl_fraction: "Nach 3 Halbwertszeiten: Bruchteil = (1/2)³ = 1/8 = 0.125.",
            hl_radioactive: "Radioaktiver Zerfall: N = N₀(1/2)^(t/t₁/₂). N₀=1000, t=20s, t₁/₂=10s. Finden Sie N.",
            hl_drug: "Arzneimittelausscheidung: [D]₀=100 mg/L, t₁/₂=4h, t=12h (3 Halbwertszeiten). [D]=12.5 mg/L.",
            hl_compare: "Vergleichen Sie zwei Reaktionen: kA=0.2, kB=0.4. Verhältnis der Halbwertszeiten = kB/kA = 2.",
            hl_consecutive: "Aufeinanderfolgende A→B→C: Maximum [B] bei tmax = ln(k₁/k₂)/(k₁-k₂). k₁=0.5, k₂=0.2.",
            hl_parallel: "Parallele Pfade: kgesamt = k₁+k₂. k₁=0.3, k₂=0.2, t₁/₂ = ln(2)/0.5.",
            hl_reversible: "Reversibel: [A]eq = [A]₀·kr/(kf+kr). kf=0.5, kr=0.1.",
            hl_temperature: "t₁/₂ nimmt mit Temperatur ab. Bei 350K vs 300K mit Ea=50 kJ/mol.",
            hl_enzyme: "Enzym-Turnover: kcat=100 s⁻¹. t₁/₂ = ln(2)/kcat = 0.007s.",
            hl_isotope_dating: "Kohlenstoff-14-Datierung: N/N₀=0.25 = (1/2)². Alter = 2×5730 = 11460 Jahre.",
            hl_branching: "Verzweigter Zerfall: α und β Pfade. kα/kβ=2, also fα = 2/3 = 0.67.",
            hl_secular: "Säkulares Gleichgewicht: Mutter t₁/₂ >> Tochter t₁/₂. Aktivitätsverhältnis → 1.",
            hl_transient: "Transientes Gleichgewicht: tmax wenn Tochteraktivität Spitze erreicht. t₁/₂,1=10, t₁/₂,2=2.",
            hl_cosmogenic: "¹⁰Be kosmogene Datierung: t₁/₂=1.39×10⁶ Jahre. N/N₀=0.5 → Alter = t₁/₂."
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
            combustion: "Vollständige Verbrennung von {reactant} produziert CO₂ und H₂O. Wie viele CO₂-Moleküle?",
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
    }
};
