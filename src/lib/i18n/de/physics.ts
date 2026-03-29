/**
 * DE - PHYSIK Übersetzungen
 * VOLLSTÄNDIGE VERSION - Reorganisiert nach pädagogischer Reihenfolge (Sek 3 Basel).
 */

export const dePhysics = {


        /* SP1.01_DATA_START */
        sp1_01: {
                "title": "SP1.01 // Kräftemodell",
                "back": "Zurück",
                "check": "Kraft prüfen",
                "next": "Nächste Aufgabe",
                "correct": "Gleichgewicht",
                "incorrect": "Abweichung",
                "monitor_title": "VEKTORANALYSE",
                "difficulty": {
                        "basic": "Basis",
                        "core": "Kern",
                        "advanced": "Fortgeschritten",
                        "elite": "Elite"
                },
                "stages": {
                        "concepts": "Konzepte",
                        "composition": "Zusammensetzung",
                        "equilibrium": "Gleichgewicht"
                },
                "labels": {
                        "answer": "Antwort",
                        "select": "Wählen",
                        "value": "Wert",
                        "progress": "Fortschritt",
                        "previous": "Zurück",
                        "skip": "Überspringen"
                },
                "placeholders": {
                        "ellipsis": "...",
                        "decimal": "0.0"
                },
                "reasons": {
                        "identify_force_concept": "Bestimme zuerst, welches Kraftkonzept oder welche Definition abgefragt wird.",
                        "identify_force_quantity": "Bestimme zuerst die gesuchte physikalische Größe und ihre Einheit.",
                        "resolve_or_combine_forces": "Zerlege die Kräfte in Komponenten oder fasse gleichgerichtete Kräfte zusammen.",
                        "apply_equilibrium_condition": "Nutze die Gleichgewichtsbedingung, dass die Vektorsumme aller Kräfte null ist.",
                        "match_force_definition_or_unit": "Ordne die Aufgabe der passenden Definition, Einheit oder direkt angegebenen Größe zu.",
                        "compute_resultant_from_components": "Berechne die Resultierende aus den horizontalen und vertikalen Komponenten.",
                        "balance_resultant_with_equilibrant": "Gleiche die bekannte Resultierende mit einer gleich großen, entgegengesetzten Gleichgewichtskraft aus."
                },
                "solver": {
                        "known_force_label": "bekannt",
                        "resultant_label": "Resultierende"
                },
                "SP1.01.001": {
                        "prompt": "Was ist eine Kraft?",
                        "feedback": {
                                "correct": "Richtig! Eine Kraft ist ein Stoß oder Zug, der die Bewegung ändern kann.",
                                "incorrect": "Nicht ganz. Denken Sie darüber nach, was passiert, wenn Sie etwas schieben oder ziehen."
                        },
                        "options": [
                                { "id": "A", "text": "Ein Stoß oder Zug, der die Bewegung eines Objekts ändern kann" },
                                { "id": "B", "text": "Eine Form von Energie" },
                                { "id": "C", "text": "Eine Art von Geschwindigkeit" },
                                { "id": "D", "text": "Ein Maß für die Masse" }
                        ],
                        "scenario": "Novartis-Campus Basel — Grundlagen",
                        "scenario_desc": "Auf dem Novartis-Campus im Basler St.-Johann-Quartier arbeiten über 10 000 Menschen. Robotische Greifarme schieben Probenträger auf Schienen, Spritzenstempel ziehen Flüssigkeiten in Kammern — beides direkte Beispiele für Kräfte als Stoß oder Zug. Ohne eine klare Definition von Kraft können Ingenieure keine automatisierten Systeme kalibrieren. Ermittle die korrekte Definition, um die Grundlage aller mechanischen Berechnungen zu legen.",
                        "unit": ""
                },
                "SP1.01.002": {
                        "prompt": "Was ist die SI-Einheit der Kraft?",
                        "feedback": {
                                "correct": "Richtig! Das Newton (N) ist die SI-Einheit der Kraft.",
                                "incorrect": "Die SI-Einheit der Kraft ist das Newton (N)."
                        },
                        "scenario": "Basler Kalibrierlabor — SI-Einheit",
                        "scenario_desc": "Basler Pharma- und Chemiebetriebe lassen Kraftsensoren jährlich in akkreditierten Kalibrierlabors prüfen. Das Newton (N) ist definiert als die Kraft, die 1 kg mit 1 m/s² beschleunigt. Alle Messgeräte verwenden dieselbe Einheit, damit fehlerhafte Umrechnungen ausgeschlossen sind. Benenne die SI-Einheit korrekt, um Kommunikationsfehler bei der Gerätespezifikation zu vermeiden.",
                        "unit": "N"
                },
                "SP1.01.003": {
                        "prompt": "Wandeln Sie 5000 N in kN um.",
                        "feedback": {
                                "correct": "Ausgezeichnet! 5000 N = 5 kN",
                                "incorrect": "Denken Sie daran: 1 kN = 1000 N"
                        },
                        "scenario": "Basler Rheinhafen — Krankapazität",
                        "scenario_desc": "Der Rheinhafen Basel ist der einzige Schweizer Binnenhafen am Rhein. Krannennzeichenschilder geben Traglasten in kN an, nicht in N, damit die Zahlen leicht lesbar bleiben. Ein Container mit 5000 N Gewichtskraft entspricht 5 kN — der direkt auf dem Schild stehenden Nennlast. Wandle 5000 N in kN um, um die Kranauslastung korrekt zu beurteilen.",
                        "unit": "kN"
                },
                "SP1.01.004": {
                        "prompt": "Wandeln Sie 2.5 MN in N um.",
                        "feedback": {
                                "correct": "Perfekt! 2.5 MN = 2.500.000 N",
                                "incorrect": "Denken Sie daran: 1 MN = 1.000.000 N"
                        },
                        "scenario": "Roche Tower Basel — Pfahlgründung",
                        "scenario_desc": "Der Roche Tower (205 m) ist das höchste Gebäude der Schweiz. Strukturingenieure planen die Pfahllasten in MN, müssen sie aber in N umrechnen, wenn sie die Materialspannung mit σ = F/A (Einheit N/mm²) berechnen. Ein Pfahl trägt 2,5 MN = 2 500 000 N. Stelle die Umrechnung richtig an, damit die Materialbemessung keine gefährliche Abweichung enthält.",
                        "unit": "N"
                },
                "SP1.01.005": {
                        "prompt": "Was sind die drei Elemente, die eine Kraft definieren?",
                        "feedback": {
                                "correct": "Richtig! Eine Kraft hat Betrag, Richtung und Angriffspunkt.",
                                "incorrect": "Eine Kraft wird durch ihren Betrag, ihre Richtung und ihren Angriffspunkt definiert."
                        },
                        "options": [
                                { "id": "A", "text": "Betrag, Richtung und Angriffspunkt" },
                                { "id": "B", "text": "Masse, Beschleunigung und Geschwindigkeit" },
                                { "id": "C", "text": "Zeit, Entfernung und Verschiebung" },
                                { "id": "D", "text": "Energie, Arbeit und Leistung" }
                        ],
                        "scenario": "Spalentor Basel — Bogensanierung",
                        "scenario_desc": "Das Spalentor (ca. 1400) ist Basels besterhaltenes mittelalterliches Stadttor. Bei der Sanierung mussten Ingenieure für jeden Steinblock drei Kraftelemente bestimmen: Betrag (Gewicht), Richtung (Schubrichtung) und Angriffspunkt (Kontaktfläche). Fehlt eines der drei Elemente, kann der Kraftfluss im Bogen nicht korrekt berechnet werden. Benenne alle drei Elemente, um das Sanierungskonzept fundiert zu begründen.",
                        "unit": ""
                },
                "SP1.01.006": {
                        "prompt": "Eine Kraft von 50 N wirkt auf ein Objekt. Was ist der Betrag dieser Kraft?",
                        "feedback": {
                                "correct": "Richtig! Der Betrag ist 50 N.",
                                "incorrect": "Der Betrag ist der numerische Wert: 50 N."
                        },
                        "scenario": "Universität Basel — Physikpraktikum",
                        "scenario_desc": "Im Mechanikpraktikum der Universität Basel (gegründet 1460) ziehen Erstsemester-Studierende Federwaagen über Tischoberflächen. Zeigt die Waage 50 N an, ist der Betrag dieser Zahl der Kraftbetrag — unabhängig von Richtung und Angriffspunkt. Den Betrag isoliert ablesen zu können ist Voraussetzung für alle weiteren Vektoradditionsübungen. Lies den Betrag korrekt ab.",
                        "unit": "N"
                },
                "SP1.01.007": {
                        "prompt": "Wandeln Sie 750 kN in MN um.",
                        "feedback": {
                                "correct": "Großartig! 750 kN = 0.75 MN",
                                "incorrect": "Denken Sie daran: 1000 kN = 1 MN"
                        },
                        "scenario": "EuroAirport Basel — Belagsplanung",
                        "scenario_desc": "Der EuroAirport Basel-Mulhouse-Freiburg bedient über 8 Millionen Passagiere jährlich. Die Landelasten eines Großraumflugzeugs betragen bis zu 750 kN pro Hauptfahrwerk. Die Tragfähigkeitskategorien des Belags stehen in MN in Fachnormen. Wandle 750 kN in 0,75 MN um, damit der Vergleich mit dem Normwert direkt möglich ist und keine falsche Belagsdicke gewählt wird.",
                        "unit": "MN"
                },
                "SP1.01.008": {
                        "prompt": "Ein Buch liegt auf einem Tisch. Wenn das Buch 20 N wiegt, wie groß ist die Normalkraft vom Tisch?",
                        "feedback": {
                                "correct": "Richtig! Die Normalkraft entspricht dem Gewicht: 20 N.",
                                "incorrect": "Der Tisch drückt mit der gleichen Kraft nach oben wie das Gewicht des Buches."
                        },
                        "scenario": "Basler Papiermühle — Archivlagerung",
                        "scenario_desc": "Die Basler Papiermühle am St.-Alban-Kanal verwahrt historische Handschriften in klimatisierten Regalen. Die Normalkraft des Regals auf jedes Buch muss exakt dem Buchgewicht entsprechen: 20 N nach oben für ein 20-N-Buch. Kippt das Regal, verschiebt sich der Angriffspunkt der Normalkraft und gefährdet empfindliche Einbände. Berechne die Normalkraft korrekt, um die Regallagerung sicher zu planen.",
                        "unit": "N"
                },
                "SP1.01.009": {
                        "prompt": "Wandeln Sie 0.025 MN in kN um.",
                        "feedback": {
                                "correct": "Ausgezeichnet! 0.025 MN = 25 kN",
                                "incorrect": "Denken Sie daran: 1 MN = 1000 kN"
                        },
                        "scenario": "Fasnacht Basel — Zurrgurtauswahl",
                        "scenario_desc": "Basels Fasnacht-Umzugswagen werden mit Zurrgurten auf Tiefladerfahrzeugen gesichert. Industrielle Zurrgurte tragen Kennzeichnungen in kN; die seitliche Windlast großer Wagen beträgt rund 0,025 MN. Rechne 0,025 MN in 25 kN um, um die Gurtklasse direkt mit der Lastnorm zu vergleichen und eine falsche Gurtauswahl zu verhindern.",
                        "unit": "kN"
                },
                "SP1.01.010": {
                        "prompt": "Sie schieben eine Kiste mit einer Kraft von 100 N nach rechts. Was ist die Richtung der Kraft?",
                        "feedback": {
                                "correct": "Richtig! Die Kraft ist nach rechts gerichtet.",
                                "incorrect": "Die Richtung ist nach rechts (0 Grad von der Horizontalen)."
                        },
                        "scenario": "Rheinhafen Basel — Containersteuerung",
                        "scenario_desc": "Automatisierte Transportfahrzeuge (AGV) im Basler Containerhafen verschieben 20-Fuß-Container mit millimetergenauer Richtungsvorgabe. Der Steuerrechner wandelt „nach rechts“ in 0° um — die Basisrichtung im Vektorsystem. Jede Richtungsabweichung lässt den Container am Zielstellplatz vorbeischießen. Benenne die Richtung korrekt: der erste Schritt jeder Trajektorienberechnung.",
                        "unit": ""
                },
                "SP1.01.011": {
                        "prompt": "Wandeln Sie 3500 N in kN um.",
                        "feedback": {
                                "correct": "Perfekt! 3500 N = 3.5 kN",
                                "incorrect": "Teilen Sie durch 1000, um N in kN umzuwandeln."
                        },
                        "scenario": "Dreirosenbrücke Basel — Fußgängerlast",
                        "scenario_desc": "Die Dreirosenbrücke über den Rhein wird täglich von Tausenden Fußgängern und Radfahrern genutzt. Schweizer Norm SIA 261 verlangt Einzellasten in kN in der Statik-Software. Ein beladenes Lastenfahrrad erzeugt 3500 N — als 3,5 kN einzugeben. Ein Fehler (3500 statt 3,5) überschätzt die Schnittgröße um den Faktor 1000 und macht die Sicherheitsbeurteilung wertlos.",
                        "unit": "kN"
                },
                "SP1.01.012": {
                        "prompt": "Eine Kraft wirkt vertikal nach oben. Welchen Winkel bildet sie mit der Horizontalen?",
                        "feedback": {
                                "correct": "Richtig! Vertikal nach oben ist 90 Grad von der Horizontalen.",
                                "incorrect": "Vertikal nach oben ist senkrecht zur Horizontalen: 90 Grad."
                        },
                        "scenario": "Roche Tower — Aufzugsseil",
                        "scenario_desc": "Die Hochgeschwindigkeitsaufzüge im Roche Tower bewegen sich mit 4 m/s. Das Tragseil wirkt exakt vertikal nach oben (90° zur Horizontalen) und kompensiert die Gewichtskraft der Kabine. Jede Abweichung von 90° erzeugt eine horizontale Seitenkraft auf die Führungsschiene und erhöht den Verschleiß. Bestätige den Winkel von 90°, damit die Ausrichtung des Aufzugsschachts mit digitalem Lotmaß überprüft werden kann.",
                        "unit": "degrees"
                },
                "SP1.01.013": {
                        "prompt": "Wandeln Sie 1.2 MN in N um.",
                        "feedback": {
                                "correct": "Großartig! 1.2 MN = 1.200.000 N",
                                "incorrect": "Multiplizieren Sie mit 1.000.000, um MN in N umzuwandeln."
                        },
                        "scenario": "Messe Basel — Kabelnetzdach",
                        "scenario_desc": "Das Kabelnetzdach der Messe Basel Halle 1 trägt eine Hauptseilspannung von 1,2 MN. Für die Berechnung der Drahtseilspannung σ = F/A (A in mm²) muss F in N vorliegen: 1,2 MN = 1 200 000 N. Wird MN direkt eingesetzt, ergibt sich eine um den Faktor eine Million zu kleine Spannung — das Seil würde falsch dimensioniert.",
                        "unit": "N"
                },
                "SP1.01.014": {
                        "prompt": "Zwei Personen schieben ein Auto. Person A wendet 200 N und Person B 150 N in die gleiche Richtung an. Was ist die Gesamtkraft?",
                        "feedback": {
                                "correct": "Richtig! 200 N + 150 N = 350 N",
                                "incorrect": "Addieren Sie die Kräfte, wenn sie in die gleiche Richtung wirken."
                        },
                        "scenario": "Fasnacht Basel — Feststeckender Wagen",
                        "scenario_desc": "Steckt ein Fasnachtswagen auf dem Kopfsteinpflaster der Basler Innenstadt fest, schieben Helfer gemeinsam an. Person A drückt mit 200 N und Person B mit 150 N — gleiche Richtung, direkte Addition: 350 N gesamt. Der Umzugsleiter schätzt damit, wie viele Helfer nötig sind, um den Wagen bekannter Masse wieder in Bewegung zu setzen. Berechne die Gesamtkraft.",
                        "unit": "N"
                },
                "SP1.01.015": {
                        "prompt": "Wandeln Sie 450 kN in MN um.",
                        "feedback": {
                                "correct": "Ausgezeichnet! 450 kN = 0.45 MN",
                                "incorrect": "Teilen Sie durch 1000, um kN in MN umzuwandeln."
                        },
                        "scenario": "St.-Alban-Mühle Basel — Fundamentprüfung",
                        "scenario_desc": "Im St.-Alban-Quartier stehen historische Mühlengebäude aus dem Mittelalter. Bei einer Sanierung beträgt die Gesamtlast auf dem Fundamentsockel 450 kN; die Tragfähigkeitstabellen im Baugrundgutachten verwenden MN/m². Rechne 450 kN in 0,45 MN um und dividiere durch die Fundamentfläche, um den Bodendruck mit dem Normwert zu vergleichen.",
                        "unit": "MN"
                },
                "SP1.01.016": {
                        "prompt": "Eine Kraft von 80 N wirkt in einem Winkel von 30° über der Horizontalen. Was ist die horizontale Komponente dieser Kraft?",
                        "feedback": {
                                "correct": "Richtig! F_x = F × cos(30°) = 80 × 0.866 = 69.28 N",
                                "incorrect": "Verwenden Sie F_x = F × cos(θ), um die horizontale Komponente zu finden."
                        },
                        "scenario": "Basler Zoo — Seilbrücke Klammeraffen",
                        "scenario_desc": "Die Seilbrücke im Klammeraffengehege des Basler Zoos spannt 40 m. Ein Schrägkabel übt 80 N unter 30° über der Horizontalen auf den Ankermast aus. Die horizontale Komponente 80 × cos 30° = 69,28 N bestimmt die Seitenkraft auf den Fundamentbolzen. Wird die Komponente falsch berechnet, ist der Bolzen falsch dimensioniert und kann im Lauf der Zeit ermüden.",
                        "unit": "N"
                },
                "SP1.01.017": {
                        "prompt": "Eine Kraft von 80 N wirkt in einem Winkel von 30° über der Horizontalen. Was ist die vertikale Komponente dieser Kraft?",
                        "feedback": {
                                "correct": "Richtig! F_y = F × sin(30°) = 80 × 0.5 = 40 N",
                                "incorrect": "Verwenden Sie F_y = F × sin(θ), um die vertikale Komponente zu finden."
                        },
                        "scenario": "Basler Zoo — Seilbrücke Ankermast",
                        "scenario_desc": "Dasselbe Schrägkabel (80 N, 30°) hebt gleichzeitig den Ankermast mit 40 N nach oben. Diese vertikale Komponente vermindert das Eigengewicht, das auf das Fundament drückt. Übersteigt sie das Mastselbstgewicht, muss ein Gegengewicht ergänzt werden. Berechne die vertikale Komponente, um zu entscheiden, ob ein Gegengewicht erforderlich ist.",
                        "unit": "N"
                },
                "SP1.01.018": {
                        "prompt": "Eine Kraft hat die Komponenten F_x = 60 N und F_y = 80 N. Was ist der Betrag der Kraft?",
                        "feedback": {
                                "correct": "Richtig! F = √(60^{2} + 80^{2}) = √10000 = 100 N",
                                "incorrect": "Verwenden Sie den Satz des Pythagoras: F = √(F_x^{2} + F_y^{2})"
                        },
                        "scenario": "Basler Rheinfähre — Wasserkraft",
                        "scenario_desc": "Basels vier motorlose Fähren nutzen die Strömung: Der Rhein drückt quer zur Fahrt mit 60 N/m und längs mit 80 N/m auf den Rumpf. Daraus ergibt sich via Pythagoras eine Gesamtkraft von 100 N/m — die Spannung im Stahlanker. Das 3-4-5-Dreieck erlaubt eine schnelle Kopfrechnung, die teure Seilüberdimensionierung vermeidet.",
                        "unit": "N"
                },
                "SP1.01.019": {
                        "prompt": "Eine Kraft hat die Komponenten F_x = 60 N und F_y = 80 N. Welchen Winkel bildet sie mit der Horizontalen?",
                        "feedback": {
                                "correct": "Richtig! θ = arctan(80/60) = arctan(1.333) = 53.13°",
                                "incorrect": "Verwenden Sie θ = arctan(F_y/F_x), um den Winkel zu finden."
                        },
                        "scenario": "Basler Rheinfähre — Rumpfwinkel",
                        "scenario_desc": "Die Richtung der Gesamtwasserkraft (53,13° zur Ufergeraden) zeigt dem Fährmann, wie er den Rumpf gegen die Strömung stellen muss, um auf einer Geraden zu überqueren. Falsche Winkelberechnung führt zu Kursabweichungen von mehreren Metern — die Fähre landet am falschen Steg. Berechne den Winkel mit arctan(80/60).",
                        "unit": "degrees"
                },
                "SP1.01.020": {
                        "prompt": "Eine 50 N Kraft wirkt in einem Winkel von 45° über der Horizontalen. Was ist ihre horizontale Komponente?",
                        "feedback": {
                                "correct": "Richtig! F_x = 50 × cos(45°) = 50 × 0.707 = 35.36 N",
                                "incorrect": "Bei 45° ist cos(45°) = sin(45°) = 0.707"
                        },
                        "scenario": "Basler Velonetz — Laderampe 45°",
                        "scenario_desc": "An Lastenrad-Servicestationen im Basler Velonetz sind 45°-Rampen Standard. Schiebt man ein Fahrrad mit 50 N entlang der Rampe, treibt die horizontale Komponente 35,36 N das Rad vorwärts. Bei 45° sind horizontale und vertikale Komponente gleich groß — der Grund, warum 45°-Rampen Effizienz und Antirutsch-Reibung optimal ausbalancieren. Berechne F_x.",
                        "unit": "N"
                },
                "SP1.01.021": {
                        "prompt": "Eine 50 N Kraft wirkt in einem Winkel von 45° über der Horizontalen. Was ist ihre vertikale Komponente?",
                        "feedback": {
                                "correct": "Richtig! F_y = 50 × sin(45°) = 50 × 0.707 = 35.36 N",
                                "incorrect": "Bei 45° sind die horizontale und vertikale Komponente gleich."
                        },
                        "scenario": "Basler Velonetz — Normalkraft Rampe",
                        "scenario_desc": "Die vertikale Komponente derselben Schrägkraft (50 N, 45°) presst das Lastenrad mit 35,36 N auf die Rampe und erzeugt die Reibungskraft, die seitliches Verrutschen verhindert. Die Gleichheit beider Komponenten bei 45° ist kein Zufall — sie macht diesen Winkel zur praktischen Standardneigung. Berechne F_y und bestätige die Symmetrie.",
                        "unit": "N"
                },
                "SP1.01.022": {
                        "prompt": "Eine Kraft von 100 N wirkt in einem Winkel von 60° über der Horizontalen. Was ist ihre vertikale Komponente?",
                        "feedback": {
                                "correct": "Richtig! F_y = 100 × sin(60°) = 100 × 0.866 = 86.60 N",
                                "incorrect": "Denken Sie daran: sin(60°) = 0.866"
                        },
                        "scenario": "Bruderholz Basel — Seilhilfe Radweg",
                        "scenario_desc": "Am steilen Bruderholz-Anstieg ist ein kabelgestützter Radweg geplant. Das Seil zieht unter 60° mit 100 N/m; die vertikale Komponente 86,60 N/m überwiegt die horizontale (50 N/m), weil das Hauptproblem der Steigung die Schwerkraft ist. Die vertikale Komponente bestimmt die Antriebsleistung der Seilwinde. Berechne F_y = 100 × sin 60°.",
                        "unit": "N"
                },
                "SP1.01.023": {
                        "prompt": "Eine Kraft von 100 N wirkt in einem Winkel von 60° über der Horizontalen. Was ist ihre horizontale Komponente?",
                        "feedback": {
                                "correct": "Richtig! F_x = 100 × cos(60°) = 100 × 0.5 = 50 N",
                                "incorrect": "Denken Sie daran: cos(60°) = 0.5"
                        },
                        "scenario": "Bruderholz Basel — Seilanker Horizontallast",
                        "scenario_desc": "Obwohl die vertikale Komponente am Bruderholz dominiert, übt die horizontale Komponente 50 N/m einen Zug auf die hangparallelen Anker aus. cos(60°) = 0,5 bedeutet: die Horizontalkraft ist genau halb so groß wie die Seikraft — ein nützlicher Schnellcheck. Wird die Horizontalkraft ignoriert und nur senkrecht bemessen, können die Anker seitlich ausbrechen. Berechne F_x.",
                        "unit": "N"
                },
                "SP1.01.024": {
                        "prompt": "Zwei Kräfte wirken auf ein Objekt: 30 N nach rechts und 40 N nach oben. Was ist der Betrag der resultierenden Kraft?",
                        "feedback": {
                                "correct": "Richtig! F = √(30^{2} + 40^{2}) = 50 N",
                                "incorrect": "Verwenden Sie den Satz des Pythagoras für senkrechte Kräfte."
                        },
                        "scenario": "Wettsteinbrücke Basel — Wartungskorb",
                        "scenario_desc": "Ein Wartungskorb unter der Wettsteinbrücke wird von einem horizontalen Positionierseil (30 N) und einem vertikalen Tragseil (40 N) gehalten. Die resultierende Kraft beträgt nicht 70 N, sondern √(30² + 40²) = 50 N (3-4-5-Dreieck). Mit dem richtigen Resultatwert kann das Seil leichter ausgelegt werden — die Besatzung steigt sicherer auf.",
                        "unit": "N"
                },
                "SP1.01.042": {
                        "prompt": "Zwei Kräfte von jeweils 50 N wirken rechtwinklig zueinander. Was ist der Betrag der Resultierenden?",
                        "feedback": {
                                "correct": "Richtig! F = √(50^{2} + 50^{2}) = 70.71 N",
                                "incorrect": "Für gleiche senkrechte Kräfte gilt F = F_1√2"
                        },
                        "scenario": "Johanniterbrücke — Belastungsprobe",
                        "scenario_desc": "Beim Belastungstest der Johanniterbrücke drücken zwei Hydraulikzylinder je 50 N/m, horizontal und vertikal, gleichzeitig auf den Brückenquerschnitt. Resultierende = 50√2 ≈ 70,71 N/m. Dieser Wert dient als Alarmschwelle am Dehnmessstreifen. Wäre der Schwellenwert auf 100 N/m (Summe) gesetzt, könnten echte Schwachstellen unerkannt bleiben.",
                        "unit": "N"
                },
                "SP1.01.043": {
                        "prompt": "Eine Kraft von 20 N wirkt nach Osten und eine weitere 15 N wirkt nach Norden. Was ist der Betrag der Resultierenden?",
                        "feedback": {
                                "correct": "Richtig! F = √(20^{2} + 15^{2}) = 25 N",
                                "incorrect": "Dies ist ein 3-4-5-Dreieck, das um 5 skaliert ist."
                        },
                        "scenario": "Dreiländereck Basel — GPS-Verschiebung",
                        "scenario_desc": "Am Dreiländereck, wo Schweiz, Deutschland und Frankreich zusammentreffen, misst das GPS-Netz eine jährliche Ostverschiebung von 20 mm und Nordverschiebung von 15 mm. Resultierende: 25 mm/Jahr (3-4-5-Dreieck × 5). Dieser Wert aktualisiert jährlich die Koordinatendaten aller drei Länder. Ein falscher Wert (35 mm statt 25 mm) würde Grenztoleranzen systematisch überschätzen.",
                        "unit": "N"
                },
                "SP1.01.044": {
                        "prompt": "Zwei Kräfte wirken in die gleiche Richtung: 80 N und 120 N. Was ist der Betrag der Resultierenden?",
                        "feedback": {
                                "correct": "Richtig! Kräfte in die gleiche Richtung addieren sich: 80 + 120 = 200 N",
                                "incorrect": "Wenn Kräfte in die gleiche Richtung wirken, addieren Sie sie einfach."
                        },
                        "scenario": "Basel SBB — Doppeltraktion Güterzug",
                        "scenario_desc": "Im Güterrangierknoten Basel SBB ziehen zwei Loks tandem: Vorlok 80 kN, Nachlok 120 kN, gleiche Richtung — Gesamtzugkraft 200 kN. Damit prüfen Disponenten, ob der Zugverband die Streckensteigung im Signalabstand schafft oder eine dritte Lok nötig ist. Richtiger Additionswert = richtige Betriebsentscheidung.",
                        "unit": "N"
                },
                "SP1.01.045": {
                        "prompt": "Zwei Kräfte wirken in entgegengesetzte Richtungen: 150 N nach rechts und 90 N nach links. Was ist der Betrag der Resultierenden?",
                        "feedback": {
                                "correct": "Richtig! Kräfte in entgegengesetzte Richtungen subtrahieren sich: 150 - 90 = 60 N",
                                "incorrect": "Wenn Kräfte einander entgegenwirken, subtrahieren Sie die kleinere von der größeren."
                        },
                        "scenario": "Basler Rheinfähre — Gegenkraft Passagier",
                        "scenario_desc": "Die Fähre erhält 150 N Strömungsquerkraft (rechts). Ein Passagier lehnt am Backbordgeländer und drückt mit 90 N dagegen (links). Nettokraft = 60 N: Der Fährmann spürt den Kursversatz und muss den Ruderwinkel anpassen. Dieses einfache Subtraktionsprinzip erklärt, warum Passagierbewegungen die Navigation ohne Motorhilfe merklich beeinflussen.",
                        "unit": "N"
                },
                "SP1.01.026": {
                        "prompt": "Zwei Kräfte von 60 N und 80 N wirken rechtwinklig zueinander. Was ist der Betrag der resultierenden Kraft?",
                        "feedback": {
                                "correct": "Richtig! F = √(60^{2} + 80^{2}) = 100 N",
                                "incorrect": "Verwenden Sie den Satz des Pythagoras für senkrechte Kräfte."
                        },
                        "scenario": "Rheinhafen Basel — Schlepperanlegen",
                        "scenario_desc": "Beim Anlegen eines Kahns drückt ein Schlepper längs mit 60 kN und seitlich mit 80 kN gleichzeitig. Die Mooingleinen müssen die Resultierende 100 kN aushalten — nicht die Summe 140 kN. Das 3-4-5-Dreieck (×20) erlaubt Kopfrechnung und verhindert überdimensionierte, schwer handhabbare Trossen.",
                        "unit": "N"
                },
                "SP1.01.027": {
                        "prompt": "Eine Kraft von 100 N wirkt bei 0° und eine weitere Kraft von 100 N wirkt bei 90°. Welchen Winkel bildet die Resultierende mit der Horizontalen?",
                        "feedback": {
                                "correct": "Richtig! θ = arctan(100/100) = 45°",
                                "incorrect": "Verwenden Sie θ = arctan(F_y/F_x), um den Winkel zu finden."
                        },
                        "scenario": "Basler Münster — Wetterfahne Kalibrierung",
                        "scenario_desc": "Die Wetterfahne auf dem Basler Münsterturm zeigt bei gleich starkem Ost- und Nordwind auf Nordost — genau 45°. arctan(100/100) = 45° lässt sich im Kopf lösen: ein idealer Referenzfall, um das Vektorgefühl zu kalibrieren. Klimastudenten nutzen diesen Extremfall zur Überprüfung ihrer Berechnungen vor der nächsten Windmessstation.",
                        "unit": "degrees"
                },
                "SP1.01.028": {
                        "prompt": "Drei Kräfte wirken auf ein Objekt: 20 N nach Osten, 30 N nach Norden und 10 N nach Westen. Was ist der Betrag der resultierenden Kraft?",
                        "feedback": {
                                "correct": "Richtig! Netto horizontal: 20-10=10 N, vertikal: 30 N. F = √(10^{2} + 30^{2}) = 31.62 N",
                                "incorrect": "Finden Sie zuerst die Nettokraft in jede Richtung, dann verwenden Sie den Satz des Pythagoras."
                        },
                        "scenario": "Basler Velonetz — Poller Mehrfachlast",
                        "scenario_desc": "Ein Kreuzungspoller im Basler Velonetz wird gleichzeitig aus drei Richtungen belastet: 20 N ost, 30 N nord, 10 N west. Netto-Ost = 10 N, Nord = 30 N → Resultierende 31,62 N. Würde man alle Einzelkräfte addieren (60 N), wäre der Fundamentbolzen um fast das Doppelte überdimensioniert — teurer und platzsparender unnötig groß.",
                        "unit": "N"
                },
                "SP1.01.029": {
                        "prompt": "Zwei Kräfte gleicher Größe wirken in einem Winkel von 60° zueinander. Wenn jede Kraft 50 N beträgt, was ist der Betrag der Resultierenden?",
                        "feedback": {
                                "correct": "Richtig! Für gleiche Kräfte bei 60°: F = 2F_1cos(30°) = 2(50)(0.866) = 86.60 N",
                                "incorrect": "Verwenden Sie das Parallelogrammgesetz oder zerlegen Sie in Komponenten."
                        },
                        "scenario": "Fondation Beyeler — Skulpturenrigging",
                        "scenario_desc": "Bei der Fondation Beyeler in Riehen werden schwere Skulpturen mit zwei gleich langen Gurten im 60°-Winkel angehoben. Zwei Gurtkräfte à 50 N ergeben 86,60 N Hubkraft — deutlich weniger als 100 N. Dadurch können leichtere Anschlagmittel gewählt werden, die das Museumsgelände schonen. Berechne die Resultierende mit F = 2 × 50 × cos 30°.",
                        "unit": "N"
                },
                "SP1.01.030": {
                        "prompt": "Eine Kraft von 40 N wirkt in einem Winkel von 30° über der Horizontalen und eine weitere 60 N wirkt horizontal. Was ist die horizontale Komponente der Resultierenden?",
                        "feedback": {
                                "correct": "Richtig! F_x = 40cos(30°) + 60 = 34.64 + 60 = 94.64 N",
                                "incorrect": "Addieren Sie die horizontalen Komponenten beider Kräfte."
                        },
                        "scenario": "Basler Tram — Fahrdrahthalter Kurve",
                        "scenario_desc": "Am Aeschenplatz wirken auf eine Fahrdrahtklemme zwei Kräfte: Kettenwerk 40 N (30°) und horizontale Abspannleine 60 N. Die horizontale Gesamt-Klemmkraft beträgt 40 cos 30° + 60 = 94,64 N — maßgebend für den Seitenhalter. Nur die Katenary-Komponente (34,64 N) zu berücksichtigen würde den Halter um über 60 N unterdimensionieren und Ermüdungsbrüche verursachen.",
                        "unit": "N"
                },
                "SP1.01.031": {
                        "prompt": "Zwei Kräfte wirken auf einen Punkt: 100 N bei 0° und 100 N bei 120°. Was ist der Betrag der resultierenden Kraft?",
                        "feedback": {
                                "correct": "Richtig! F_x = 100 + 100cos(120°) = 50 N, F_y = 100sin(120°) = 86.6 N. F = √(50^{2} + 86.6^{2}) = 100 N",
                                "incorrect": "Zerlegen Sie jede Kraft in Komponenten, addieren Sie sie und finden Sie den Betrag."
                        },
                        "scenario": "Dreirosenbrücke — Pylonsattel 0° und 120°",
                        "scenario_desc": "Am Pylonsattel der Dreirosenbrücke treffen zwei Schrägseile mit je 100 kN unter 0° und 120° aufeinander. Die komponentenweise Addition liefert eine Resultierende von ebenfalls 100 kN — ein überraschender Wert. Wird stattdessen mit 200 kN (einfache Summe) bemessen, ist die Ankerplatte stark überdimensioniert. Der Rechenweg — nicht die Intuition — bestimmt die richtige Plattengröße.",
                        "unit": "N"
                },
                "SP1.01.032": {
                        "prompt": "Vier Kräfte wirken auf ein Objekt: 50 N nach Norden, 30 N nach Süden, 40 N nach Osten und 20 N nach Westen. Was ist der Betrag der Resultierenden?",
                        "feedback": {
                                "correct": "Richtig! Netto: 20 N nach Norden, 20 N nach Osten. F = √(20^{2} + 20^{2}) = 28.28 N",
                                "incorrect": "Finden Sie zuerst die Nettokraft in jede Richtung."
                        },
                        "scenario": "Rheinfähre — Umweltmessbojen",
                        "scenario_desc": "Umweltmessboje des BAFU im Rhein bei Basel: Hauptströmung 50 N süd, Rückströmung 30 N nord, Windtrift 40 N ost, Querstau 20 N west. Nettokraft = 28,28 N. Der Anker muss nur diese echte Resultierende halten, nicht 140 N. Überdimensionierter Anker würde die Boje optisch tiefer eintauchen lassen und die Messdaten verfälschen.",
                        "unit": "N"
                },
                "SP1.01.033": {
                        "prompt": "Eine Kraft von 80 N wirkt bei 45° und eine weitere 60 N wirkt bei 135°. Was ist die vertikale Komponente der Resultierenden?",
                        "feedback": {
                                "correct": "Richtig! F_y = 80sin(45°) + 60sin(135°) = 56.57 + 42.43 = 98.99 N",
                                "incorrect": "Addieren Sie die vertikalen Komponenten beider Kräfte."
                        },
                        "scenario": "Theater Basel — Bühnenzug 45° und 135°",
                        "scenario_desc": "Im Bühnenzugsystem des Theater Basel ziehen zwei Motorseile an einem Kulissenrahmen: 80 N (45°) und 60 N (135°). Die horizontalen Anteile löschen sich aus, die vertikalen addieren sich zu 98,99 N — der tatsächlichen Hubkraft. Würde nur eine Leine (60 N) für den Windenmotor berücksichtigt, fehlt fast 40 N Hubkraft und die Kulisse hängt beim Hochfahren.",
                        "unit": "N"
                },
                "SP1.01.034": {
                        "prompt": "Drei Kräfte wirken auf ein Objekt: 100 N bei 0°, 80 N bei 60° und 60 N bei 150°. Was ist der Betrag der resultierenden Kraft?",
                        "feedback": {
                                "correct": "Richtig! F_x = 100 + 80cos(60°) + 60cos(150°) = 88.04 N, F_y = 80sin(60°) + 60sin(150°) = 99.28 N. F = 118.32 N",
                                "incorrect": "Zerlegen Sie alle Kräfte in x- und y-Komponenten, summieren Sie sie und finden Sie den Betrag."
                        },
                        "scenario": "Rheinhafen Basel — Drei-Kran-SchwerlastHub",
                        "scenario_desc": "Im Rheinhafen heben drei Krane gemeinsam einen Industriebehälter: 100 N/m (0°), 80 N/m (60°), 60 N/m (150°). Die Resultierende beträgt 118,32 N/m in ca. 48° — maßgebend für die Hebeösen am Behälter. Nur komponentenweise Vektoraddition liefert dieses Ergebnis; intuitive Schätzung führt zur falschen Hebeösengröße und damit zum Sicherheitsversagen.",
                        "unit": "N"
                },
                "SP1.01.035": {
                        "prompt": "Eine Basler Straßenbahn bremst mit einer Kraft von 5000 N. Wenn die Strecke um 5° nach unten geneigt ist, was ist die Komponente der Bremskraft parallel zur Strecke?",
                        "feedback": {
                                "correct": "Richtig! F_parallel = 5000 × cos(5°) = 4981.13 N",
                                "incorrect": "Die parallele Komponente ist F × cos(θ), wobei θ der Neigungswinkel ist."
                        },
                        "scenario": "Basler Straßenbahn Bremsung",
                        "scenario_desc": "Basels ikonische grüne Straßenbahnen navigieren durch das hügelige Stadtgelände und erfordern sorgfältiges Kraftmanagement. Wenn eine Straßenbahn die Steigung in der Nähe des Barfüsserplatzes hinunterfährt, muss der Fahrer bremsen, um die Geschwindigkeit zu kontrollieren. Die Bremskraft wirkt horizontal gegen die Bewegung der Straßenbahn, aber die geneigte Strecke bedeutet, dass nur ein Teil dieser Kraft effektiv der Bewegung der Straßenbahn den Hang hinunter entgegenwirkt. Das Verständnis von Kraftkomponenten ist entscheidend für den sicheren Straßenbahnbetrieb in Basels Stadtlandschaft, wo Gleise durch historische Straßen mit unterschiedlichen Steigungen verlaufen. Das Straßenbahnsystem, das täglich über 100.000 Passagiere befördert, verlässt sich auf präzise Kraftberechnungen, um an jeder Station von Aeschenplatz bis Claraplatz sanfte, sichere Stopps zu gewährleisten.",
                        "unit": "N"
                },
                "SP1.01.036": {
                        "prompt": "Fünf Kräfte wirken auf einen Punkt: 40 N bei 0°, 30 N bei 72°, 30 N bei 144°, 30 N bei 216° und 30 N bei 288°. Was ist der Betrag der Resultierenden?",
                        "feedback": {
                                "correct": "Richtig! Die vier 30 N Kräfte sind symmetrisch angeordnet und heben sich auf, so dass nur die 40 N Kraft übrig bleibt.",
                                "incorrect": "Suchen Sie nach Symmetrie in der Kraftanordnung."
                        },
                        "scenario": "Basler Rathaus — Turmabspannung",
                        "scenario_desc": "Am achteckigen Turmkranz des Basler Rathauses halten fünf Abspannseile: eine 40-N-Vorlast-Leine und vier symmetrische 30-N-Leinen (72°, 144°, 216°, 288°). Die vier Symmetrieleinen heben sich vollständig auf — Resultierende = 40 N. Wer das erkennt, spart sich Hunderte Rechenschritte und dimensioniert den Turmkranz korrekt für die einzige wirksame Kraft.",
                        "unit": "N"
                },
                "SP1.01.037": {
                        "prompt": "Eine Kraft von 200 N wirkt in einem Winkel von 30° über der Horizontalen und eine weitere 150 N wirkt in einem Winkel von 45° unter der Horizontalen. Was ist der Betrag der Resultierenden?",
                        "feedback": {
                                "correct": "Richtig! F_x = 200cos(30°) + 150cos(-45°) = 279.28 N, F_y = 200sin(30°) + 150sin(-45°) = -6.07 N. F = 199.25 N",
                                "incorrect": "Denken Sie daran, dass Winkel unter der Horizontalen negativ sind."
                        },
                        "scenario": "Basel SBB Glasdach — Föhnwindanalyse",
                        "scenario_desc": "Das geschwungene Glasdach des Bahnhofs Basel SBB wird bei Föhn von zwei Winddrücken belastet: Überdruck 200 N/m² (30° aufwärts), Sog 150 N/m² (45° abwärts, negatives Vorzeichen). Die vertikale Nettokraft beträgt nur −6,07 N/m² — Auftrieb und Überdruck gleichen sich fast aus. Diese Richtungsinformation bestimmt die Orientierung der Glashalter; falsches Vorzeichen würde zu einem 40° falsch ausgerichteten Halter führen.",
                        "unit": "N"
                },
                "SP1.01.038": {
                        "prompt": "Ein Kabel auf der Mittleren Brücke trägt eine Last mit einer Spannung von 50 kN in einem Winkel von 60° zur Horizontalen. Was ist die vertikale Komponente dieser Spannung?",
                        "feedback": {
                                "correct": "Richtig! F_y = 50 × sin(60°) = 43.30 kN",
                                "incorrect": "Die vertikale Komponente ist F × sin(θ)."
                        },
                        "scenario": "Rheinbrücke Kabelspannung",
                        "scenario_desc": "Die Mittlere Brücke, Basels älteste Rheinquerung aus dem Jahr 1226, ist ein technisches Wunderwerk, das auf sorgfältiger Kraftverteilung beruht. Moderne Wartungsausrüstung, die an Kabeln aufgehängt ist, muss auf Sicherheit analysiert werden. Wenn Arbeiter temporäre Kabel in verschiedenen Winkeln installieren, um Inspektionsplattformen zu stützen, wird das Verständnis der vertikalen und horizontalen Komponenten der Kabelspannung entscheidend. Die Brücke überspannt 192 Meter über den Rhein und verbindet Grossbasel und Kleinbasel. Jedes Kabel muss nicht nur das Gewicht der Ausrüstung tragen, sondern auch Windkräften aus dem Flusstal standhalten. Ingenieure berechnen diese Kraftkomponenten, um die Integrität der historischen Struktur zu gewährleisten und gleichzeitig moderne Wartungsbedürfnisse zu erfüllen. Die Brücke trägt täglich Tausende von Fußgängern, Radfahrern und Straßenbahnen, was Sicherheitsberechnungen von größter Bedeutung macht.",
                        "unit": "kN"
                },
                "SP1.01.039": {
                        "prompt": "Drei Kräfte von jeweils 100 N wirken bei 0°, 120° und 240°. Was ist der Betrag der resultierenden Kraft?",
                        "feedback": {
                                "correct": "Richtig! Diese drei gleichen Kräfte sind symmetrisch in 120°-Intervallen angeordnet und heben sich vollständig auf.",
                                "incorrect": "Drei gleiche Kräfte in 120°-Intervallen bilden ein ausgewogenes System."
                        },
                        "scenario": "Basler Zoo — Karusselltragwerk",
                        "scenario_desc": "Das Kinderkarussell im Basler Zoo hat drei gleichmäßige Speichen (120°-Abstand), die jeweils 100 N Fliehkraft erzeugen. Resultierende = 0: Das Karussell dreht sich ohne seitlichen Versatz. Bei der Jahresinspektion überprüft der Prüfer die 120°-Symmetrie; eine Abweichung von 2° erzeugt eine Restresultierende, die das Mittellager auf Biegung beansprucht.",
                        "unit": "N"
                },
                "SP1.01.040": {
                        "prompt": "Eine Kraft von 120 N wirkt bei 25° und eine weitere 80 N wirkt bei 155°. Welchen Winkel bildet die Resultierende mit der Horizontalen?",
                        "feedback": {
                                "correct": "Richtig! F_x = 120cos(25°) + 80cos(155°) = 36.29 N, F_y = 120sin(25°) + 80sin(155°) = 84.51 N. θ = arctan(84.51/36.29) = 52.13°",
                                "incorrect": "Finden Sie die x- und y-Komponenten und verwenden Sie dann arctan(F_y/F_x)."
                        },
                        "scenario": "Novartis-Campus — Gehry-Brücke Windlast",
                        "scenario_desc": "Die Gehry-Fußgängerbrücke auf dem Novartis-Campus wird durch Strömungssimulationen geprüft. Zwei dominante Windkräfte: 120 N/m (25°) luvseitig und 80 N/m (155°) leeseitig. Resultierende: 52,13° — steil nach oben, d. h. die Brücke wird hauptsächlich abgehoben. Dieser Winkel bestimmt die Orientierung der Ausziehanker. Bei falscher Richtung (z. B. horizontal angenommen) versagt der Anker unter dem echten Windsog.",
                        "unit": "degrees"
                },
                "SP1.01.041": {
                        "prompt": "Sechs Kräfte von jeweils 20 N wirken bei 0°, 60°, 120°, 180°, 240° und 300°. Was ist der Betrag der Resultierenden?",
                        "feedback": {
                                "correct": "Richtig! Sechs gleiche Kräfte in 60°-Intervallen bilden ein perfekt ausgewogenes System mit null Resultierender.",
                                "incorrect": "Suchen Sie nach Symmetrie - Kräfte, die in gleichen Abständen um einen Kreis angeordnet sind, heben sich auf."
                        },
                        "scenario": "Fasnacht Basel — Laternenring Abspannung",
                        "scenario_desc": "Ein großer Laternenring bei Basels Fasnacht hängt an sechs gleichmäßig verteilten Seilen (je 20 N, 60°-Abstand). Resultierende = 0 — der Ring hängt ohne seitlichen Verzug. Lockert sich ein Seil, bricht die Sechsfachsymmetrie: Der Ring neigt sich. Ordner brauchen nur auf Horizontalität zu achten, um Seilschäden sofort zu erkennen.",
                        "unit": "N"
                },
                "SP1.01.025": {
                        "prompt": "Drei Kräfte wirken auf ein Objekt im Gleichgewicht: 50 N nach rechts, 30 N nach oben und eine unbekannte Kraft. Was ist der Betrag der unbekannten Kraft?",
                        "feedback": {
                                "correct": "Richtig! Die unbekannte Kraft muss die anderen beiden ausgleichen: √(50^{2} + 30^{2}) = 58.31 N",
                                "incorrect": "Für das Gleichgewicht muss die Summe aller Kräfte Null sein."
                        },
                        "scenario": "Basler Altstadt — Gleichgewicht Ladenschild",
                        "scenario_desc": "In der historischen Basler Altstadt hängen Zunftschilder an drei Befestigungspunkten. Ein waagrechtes Seil zieht mit 50 N, ein diagonaler Stab hebt mit 30 N — der dritte Anker muss 58,31 N entgegenwirken, damit das Schild ruht. Fehlt dieser Anker, beschleunigt das Schild in Richtung der Resultierenden und trifft Passanten auf dem Bürgersteig. Berechne die erforderliche Gleichgewichtskraft.",
                        "unit": "N"
                },
                "SP1.01.046": {
                        "prompt": "Zwei Kräfte von jeweils 40 N wirken in einem Winkel von 60° zueinander. Was ist der Betrag der dritten Kraft, die für das Gleichgewicht benötigt wird?",
                        "feedback": {
                                "correct": "Richtig! Die Resultierende der beiden Kräfte beträgt 69.28 N, daher muss die Gleichgewichtskraft gleich und entgegengesetzt sein.",
                                "incorrect": "Finden Sie zuerst die Resultierende der beiden Kräfte, dann entspricht die Gleichgewichtskraft ihr im Betrag."
                        },
                        "scenario": "Kunstmuseum Basel — Skulpturenaufhängung",
                        "scenario_desc": "Im Atrium des Kunstmuseums Basel hängt eine schwere Skulptur an zwei 60°-Gurten (je 40 N). Die Resultierende beträgt 69,28 N; der dritte Wandanker muss exakt diesen Betrag entgegenwirken. Würde man 80 N (Summe) als Grundlage nehmen, ist der Anker überdimensioniert und drückt zu stark gegen die historische Wand.",
                        "unit": "N"
                },
                "SP1.01.047": {
                        "prompt": "Ein Objekt befindet sich im Gleichgewicht unter drei Kräften: 100 N bei 0°, 80 N bei 90° und eine dritte Kraft. Was ist der Betrag der dritten Kraft?",
                        "feedback": {
                                "correct": "Richtig! F = √(100^{2} + 80^{2}) = 128.06 N",
                                "incorrect": "Die dritte Kraft muss die Resultierende der ersten beiden ausgleichen."
                        },
                        "scenario": "UB Basel — Lesesaalleuchte",
                        "scenario_desc": "Eine Hängelampe im Lesesaal der Universitätsbibliothek Basel wird von zwei Drähten abgelenkt: horizontal 100 N, vertikal 80 N. Der Stützarm muss 128,06 N entgegenwirken. Einmal wurde ein Arm nach nur vertikaler Last (80 N) dimensioniert — die Lampe rutschte und zerkratzte einen Tisch. Seitdem ist eine schriftliche Dreikraftberechnung Pflicht.",
                        "unit": "N"
                },
                "SP1.01.048": {
                        "prompt": "Ein Schild hängt an zwei Kabeln, die einen Winkel von 30° zur Horizontalen bilden. Wenn jedes Kabel eine Spannung von 200 N hat, wie schwer ist das Schild?",
                        "feedback": {
                                "correct": "Richtig! Gewicht = 2 × 200 × sin(30°) = 2 × 200 × 0.5 = 200 N",
                                "incorrect": "Die vertikalen Komponenten beider Kabel müssen dem Gewicht entsprechen."
                        },
                        "scenario": "Basler Marktplatz — Zunftschildmontage",
                        "scenario_desc": "Historische Zunftschilder am Basler Marktplatz werden nach Denkmalvorschriften mit zwei 30°-Schrägseilen aufgehängt. Zwei Seilkräfte à 200 N liefern 2 × 200 × sin 30° = 200 N Tragkraft. Die Horizontalkomponenten (je 173 N) heben sich auf und erzeugen nur Wandankerzug. Würde man mit 200 N statt der Vertikalkomponente 100 N pro Seil planen, wäre der Wandanker zu klein und könnte aus dem historischen Mauerwerk reißen.",
                        "unit": "N"
                },
                "SP1.01.049": {
                        "prompt": "Vier Kräfte wirken auf einen Punkt im Gleichgewicht: 60 N bei 0°, 40 N bei 90°, 50 N bei 180° und eine unbekannte Kraft. Was ist der Betrag der unbekannten Kraft?",
                        "feedback": {
                                "correct": "Richtig! Netto x: 60-50=10 N, Netto y: 40 N. Unbekannte Kraft: √(10^{2} + 40^{2}) = 41.23 N",
                                "incorrect": "Finden Sie die Nettokraft in x- und y-Richtung und berechnen Sie dann die Gleichgewichtskraft."
                        },
                        "scenario": "Herbstmesse Basel — Riesenradnabe",
                        "scenario_desc": "Am Riesenradnabenknoten der Basler Herbstmesse treffen vier Speichenkräfte ein: 60 kN ost, 40 kN auf, 50 kN west, unbekannte Diagonalspeiche. Netto-x = 10 kN, Netto-y = 40 kN → unbekannte Kraft = 41,23 kN. Der TÜV-Prüfer benutzt diese Rückrechnung, um den fehlenden Sensormesswert zu plausibilisieren, bevor er das Riesenrad freigibt.",
                        "unit": "N"
                },
                "SP1.01.050": {
                        "prompt": "Eine Ampel hängt an zwei Kabeln: eines bei 45° mit Spannung T_1 und ein anderes bei 60° mit Spannung 150 N. Wenn das System im Gleichgewicht ist, was ist T_1?",
                        "feedback": {
                                "correct": "Richtig! Für horizontales Gleichgewicht: T_1cos(45°) = 150cos(60°), also T_1 = 150×0.5/0.707 = 183.71 N",
                                "incorrect": "Verwenden Sie horizontales Gleichgewicht: Die horizontalen Komponenten müssen sich ausgleichen."
                        },
                        "scenario": "Basler Marktplatz — Ampelaufhängung",
                        "scenario_desc": "Eine Ampel am Marktplatz hängt an zwei asymmetrischen Seilen (45°, 60°), weil die Gebäudeankerpunkte auf unterschiedlicher Höhe sitzen. Waagrechte Ampel erfordert: T_1 cos 45° = 150 cos 60° → T_1 = 183,71 N. Gleiche Spannungen beider Seile anzunehmen würde die Ampel um mehrere Zentimeter schief hängen lassen — verschiedene Fahrtrichtungen sähen unterschiedliche Signalgesichter.",
                        "unit": "N"
                },
                "SP1.01.051": {
                        "prompt": "Der Basler Münsterturm erfährt Windkräfte. Wenn eine 2000 N Windkraft horizontal wirkt und Strukturkräfte von 1500 N bei 120° und F bei 240° das Gleichgewicht aufrechterhalten, was ist F?",
                        "feedback": {
                                "correct": "Richtig! Durch Symmetrie und Gleichgewichtsanalyse ist F = 1500 N",
                                "incorrect": "Analysieren Sie die x- und y-Komponenten separat für das Gleichgewicht."
                        },
                        "scenario": "Basler Münsterturm Kräfte",
                        "scenario_desc": "Das Basler Münster mit seinen markanten roten Sandsteintürmen, die 64,5 Meter über dem Rhein aufragen, steht seit 1019. Die Zwillingstürme der gotischen Kathedrale müssen erheblichen Windkräften aus dem Rheintal standhalten. Ingenieure analysieren das Gleichgewicht der Kräfte, die auf die Turmstruktur wirken, wobei Windlasten durch interne Strukturkräfte ausgeglichen werden, die durch das alte Mauerwerk verteilt sind. Die Stabilität der Türme hängt von einer sorgfältigen Kraftverteilung durch Strebepfeiler und Wände ab. Moderne Strukturanalysen stellen sicher, dass die mittelalterliche Architektur Windböen von über 100 km/h, die durch das Rheintal strömen, sicher bewältigen kann. Das Verständnis des Kräftegleichgewichts ist entscheidend für die Erhaltung dieser UNESCO-Welterbestätte und ermöglicht es Besuchern gleichzeitig, die Türme zu besteigen und Panoramablicke auf Basel, den Rhein und den Schwarzwald zu genießen.",
                        "unit": "N"
                },
                "SP1.01.052": {
                        "prompt": "Drei Kräfte halten das Gleichgewicht: 100 N bei 30°, 120 N bei 150° und F bei 270°. Was ist F?",
                        "feedback": {
                                "correct": "Richtig! Summe der y-Komponenten: 100sin(30°) + 120sin(150°) - F = 0, also F = 110 N",
                                "incorrect": "Die Kraft bei 270° wirkt rein in negativer y-Richtung."
                        },
                        "scenario": "Basler Münster — Kryptaschlusstein",
                        "scenario_desc": "Im romanischen Gewölbe der Münsterkrypta (11. Jh.) treffen zwei Rippenschübe auf den Schlussstein: 100 N (30°) und 120 N (150°). Das Eigengewicht F (270°, senkrecht nach unten) schließt das Gleichgewicht. Summe der y-Komponenten: 100 sin 30° + 120 sin 150° = 110 N → F = 110 N. Das stimmt mit dem tatsächlichen Schlussstein-Gewicht überein und belegt die statische Präzision mittelalterlicher Steinmetze.",
                        "unit": "N"
                },
                "SP1.01.053": {
                        "prompt": "Ein Balken wird von zwei Kabeln bei 40° und 50° von der Vertikalen gestützt. Wenn der Balken 500 N wiegt, was ist die Spannung im Kabel bei 40°?",
                        "feedback": {
                                "correct": "Richtig! Mit Gleichgewichtsgleichungen: T_1 = 281.91 N",
                                "incorrect": "Stellen Sie Gleichgewichtsgleichungen für horizontale und vertikale Komponenten auf."
                        },
                        "scenario": "Dreiländereck-Vordach — Schrägkabel asymmetrisch",
                        "scenario_desc": "Das Vordach am Dreiländereck-Aussichtspunkt (Treffpunkt CH-D-F) wird von zwei Schrägkabeln gehalten: 40° von der Vertikalen (Schweizer Seite) und 50° (deutsche Seite). Der 500 N schwere Balken soll waagrecht hängen. Das Gleichungssystem für horizontales und vertikales Gleichgewicht liefert T_1 = 281,91 N. Beide nationalen Ingenieurbüros müssen vor Baubeginn denselben Rechenwert bestätigen.",
                        "unit": "N"
                },
                "SP1.01.054": {
                        "prompt": "Vier Kräfte wirken auf einen Ring: 80 N bei 0°, 60 N bei 90°, 70 N bei 180° und F in einem unbekannten Winkel. Wenn das System im Gleichgewicht ist, was ist F?",
                        "feedback": {
                                "correct": "Richtig! Netto x: 80-70=10 N, Netto y: 60 N. F = √(10^{2} + 60^{2}) = 60.83 N",
                                "incorrect": "Finden Sie die Resultierende der bekannten Kräfte, dann muss F ihr im Betrag entsprechen."
                        },
                        "scenario": "Basler Wasserturm — Flanschring Erdbebensicherung",
                        "scenario_desc": "Der historische Wasserturm St. Johann (Bj. 1880) wird erdbebensicher ertüchtigt. Am Flanschring wirken: 80 kN ost (Wasserdruck), 60 kN auf (Auftrieb), 70 kN west (Wind), unbekannte Schraubenverbindungskraft F. Netto-x = 10 kN, Netto-y = 60 kN → F = 60,83 kN. Das übersteigt die ursprüngliche Schraublast: Schraubenklasse muss hochgestuft werden.",
                        "unit": "N"
                },
                "SP1.01.055": {
                        "prompt": "Ein Kronleuchter mit einem Gewicht von 300 N hängt an drei Kabeln in 120°-Intervallen. Was ist die Spannung in jedem Kabel?",
                        "feedback": {
                                "correct": "Richtig! Durch Symmetrie trägt jedes Kabel 300/3 = 100 N",
                                "incorrect": "Bei symmetrischer Anordnung wird die Last gleichmäßig verteilt."
                        },
                        "scenario": "Basler Rathaus — Kronleuchter Großer Saal",
                        "scenario_desc": "Der historische Kronleuchter im Großen Saal des Basler Rathauses (seit dem 16. Jh. Kantonsratssaal) wiegt 300 N und hängt an drei Ketten (120°-Abstand). Vollständige Symmetrie → jede Kette: 100 N, ohne Trigonometrie. Restauratoren nutzten dieses Ergebnis: Alle drei Ketten sind baugleich und können ohne Neuberechnung einzeln ausgetauscht werden.",
                        "unit": "N"
                },
                "SP1.01.056": {
                        "prompt": "Der Fuß eines Basel-Marathon-Läufers trifft mit 2400 N auf den Boden. Die Bodenreaktionskraft wirkt in einem Winkel von 15° zur Vertikalen. Was ist die horizontale Komponente, die den Läufer vorwärts treibt?",
                        "feedback": {
                                "correct": "Richtig! F_horizontal = 2400 × sin(15°) = 621.18 N",
                                "incorrect": "Die horizontale Komponente ist F × sin(θ), wobei θ von der Vertikalen gemessen wird."
                        },
                        "scenario": "Basel Marathon Biomechanik",
                        "scenario_desc": "Der Basel Marathon, der jährlich über 10.000 Läufer anzieht, zeigt die Physik der menschlichen Fortbewegung durch Basels Straßen. Wenn der Fuß eines Läufers in der Nähe des Marktplatzes auf das Pflaster trifft, treten komplexe Kraftwechselwirkungen auf. Die Bodenreaktionskraft, typischerweise das 2-3-fache des Körpergewichts, wirkt in einem Winkel, der durch die Lauftechnik bestimmt wird. Elite-Läufer optimieren diesen Winkel, um den Vorwärtsantrieb zu maximieren und gleichzeitig die vertikale Oszillation zu minimieren. Die Kraftkomponenten müssen sorgfältig ausbalanciert werden: Zu viel vertikale Kraft verschwendet Energie durch Auf- und Abhüpfen, während unzureichende horizontale Kraft die Geschwindigkeit begrenzt. Sportwissenschaftler analysieren diese Kräfte, um die Laufeffizienz zu verbessern und Verletzungen vorzubeugen. Das Verständnis von Kräftegleichgewicht und -zerlegung hilft Läufern, durch Basels vielfältiges Gelände optimale Form zu halten, von der flachen Rheinpromenade bis zu den anspruchsvollen Hügeln des Bruderholz, um die 42,195 km lange Strecke effizient zu bewältigen.",
                        "unit": "N"
                },
                "SP1.01.057": {
                        "prompt": "Fünf Kräfte wirken auf eine komplexe Struktur: 200 N bei 36°, 150 N bei 108°, 180 N bei 180°, 120 N bei 252° und F bei 324°. Für das Gleichgewicht, was ist F?",
                        "feedback": {
                                "correct": "Richtig! Durch separate Analyse der x- und y-Komponenten und Lösung der Gleichgewichtsgleichungen ist F = 200 N",
                                "incorrect": "Summieren Sie alle x-Komponenten und y-Komponenten separat und lösen Sie dann nach F auf."
                        },
                        "scenario": "Novartis Building 10 — Fassadenhalter Fünfkraft",
                        "scenario_desc": "An jedem Fassadenhalterknoten des Gehry-Gebäudes (Novartis Building 10) greifen fünf Paneelkräfte an (36°, 108°, 180°, 252°, 324°). Vier sind bekannt (200/150/180/120 N), die fünfte F fehlt. Das Gleichungssystem liefert F = 200 N — damit kann der korrekte Bolzendurchmesser für alle 2000 m² Fassade festgelegt werden.",
                        "unit": "N"
                },
                "SP1.01.058": {
                        "prompt": "Eine aufgehängte Plattform wird von vier Kabeln gehalten. Drei Kabel haben Spannungen: 400 N bei 30°, 350 N bei 120° und 380 N bei 210°. Was ist die Spannung im vierten Kabel bei 300°?",
                        "feedback": {
                                "correct": "Richtig! Das Lösen der Gleichgewichtsgleichungen ergibt T_4 = 350 N",
                                "incorrect": "Stellen Sie zwei Gleichgewichtsgleichungen (x und y) auf und lösen Sie nach der unbekannten Spannung auf."
                        },
                        "scenario": "Rheinbrücke Basel — Inspektionsplattform",
                        "scenario_desc": "Eine Inspektionsplattform unter einer Basler Rheinbrücke hängt an vier Kabeln. Drei Kraftmesssensoren lesen 400 N (30°), 350 N (120°), 380 N (210°); der vierte (300°) fällt beim Ausfahren aus. Rückrechnung via ΣF = 0 liefert T_4 = 350 N — innerhalb der Nenntragfähigkeit 900 N. Die Inspektion kann weitergehen; der defekte Sensor wird beim nächsten Einsatz ersetzt.",
                        "unit": "N"
                },
                "SP1.01.059": {
                        "prompt": "Ein Fachwerkknoten erfährt Kräfte: 500 N Druck bei 0°, 400 N Zug bei 60°, 450 N Druck bei 180° und zwei unbekannte Kräfte bei 240° und 300°. Wenn die Kräfte bei 240° und 300° gleich sind, was ist ihr Betrag?",
                        "feedback": {
                                "correct": "Richtig! Mit Symmetrie und Gleichgewichtsgleichungen beträgt jede unbekannte Kraft 200 N",
                                "incorrect": "Nutzen Sie die Tatsache, dass die beiden unbekannten Kräfte gleich sind, um die Gleichgewichtsgleichungen zu vereinfachen."
                        },
                        "scenario": "Rheinhafen Getreidesilo — Fachwerkknoten",
                        "scenario_desc": "Im Stahldachfachwerk des Rheinhafener Getreidesilos sind zwei korrosionsgeschädigte Untergurtdiagonalen (240°, 300°) nicht mehr instrumentierbar. Fünf bekannte Knotenlasten (500/400/450 N) und die Symmetriebedingung (gleiche unbekannte Kräfte) reduzieren das System auf eine Gleichung: je 200 N. Damit steht fest, dass beide Diagonalen vor der nächsten Getreideernte verstärkt werden müssen.",
                        "unit": "N"
                },
                "SP1.01.060": {
                        "prompt": "Ein komplexes Kabelsystem hat sechs Kabel, die sich an einem Punkt treffen. Fünf Kabel haben bekannte Spannungen: 300 N bei 0°, 250 N bei 72°, 280 N bei 144°, 260 N bei 216° und 270 N bei 288°. Was ist die Spannung im sechsten Kabel bei einem optimalen Winkel für das Gleichgewicht?",
                        "feedback": {
                                "correct": "Richtig! Die Resultierende der fünf Kräfte beträgt 89.44 N, daher muss das sechste Kabel diese Kraft bereitstellen.",
                                "incorrect": "Finden Sie die Resultierende aller bekannten Kräfte, dann muss das sechste Kabel sie ausgleichen."
                        },
                        "scenario": "Messe Basel — Kabelnetzdach Knotenanalyse",
                        "scenario_desc": "Nach der Nachspannung 2020 am Innenknotenring der Messe-Halle 1 liegen fünf Seilspannungen vor (300/250/280/260/270 N); das sechste Seil ist unzugänglich. Die Resultierende der fünf Kräfte beträgt 89,44 N — das ist die Ziellast des sechsten Seils. Die errechnete Richtung ermöglichte zusätzlich eine 3°-Korrektur des Ankers, die Spannungskonzentrationen am Knotenblech beseitigt.",
                        "unit": "N"
                },
                "SP1.01.061": {
                        "prompt": "Eine Brückenstütze erfährt eine Windlast von 3000 N horizontal, eine Eigenlast von 8000 N vertikal und drei Stützreaktionen bei 45°, 135° und 225°. Wenn die Reaktionen bei 45° und 225° gleich sind, was ist ihr Betrag?",
                        "feedback": {
                                "correct": "Richtig! Mit Gleichgewichtsgleichungen und Symmetrie beträgt jede gleiche Reaktion 4242.64 N",
                                "incorrect": "Stellen Sie Gleichgewichtsgleichungen für x und y auf und nutzen Sie die Symmetrie der beiden gleichen Reaktionen."
                        },
                        "scenario": "Johanniterbrücke — Pfeilerbemessung Erweiterung",
                        "scenario_desc": "In der Machbarkeitsstudie zur Erweiterung der Johanniterbrücke wird ein Pfeilerknoten mit 3000 N Windlast und 8000 N Eigenlast analysiert. Drei Stützreaktionen (45°, 135°, 225°), wobei 45° und 225° symmetrisch sind → eine Gleichung, Lösung: je 4242,64 N. Das übersteigt die Originalauslegung um 12 % → Pfeilerverstärkung vor jeder Erweiterung erforderlich.",
                        "unit": "N"
                },
                "SP1.01.062": {
                        "prompt": "Eine architektonische Skulptur in Basel hat acht symmetrisch angeordnete Stützkabel in 45°-Intervallen. Wenn die Skulptur 2400 N wiegt, was ist die Spannung in jedem Kabel?",
                        "feedback": {
                                "correct": "Richtig! Durch Symmetrie trägt jedes Kabel 2400/8 = 300 N",
                                "incorrect": "Bei symmetrischer Anordnung wird die Last gleichmäßig auf alle Kabel verteilt."
                        },
                        "scenario": "Art Basel — Freiluftskulptur Achtfach-Symmetrie",
                        "scenario_desc": "Eine 2400-N-Skulptur an der Basler Rheinpromenade bei Art Basel hängt an acht 45°-symmetrischen Kabeln. Vollständige Symmetrie → 2400 ÷ 8 = 300 N je Kabel, kein Taschenrechner nötig. Alle acht Kabel sind baugleich und ohne Neuberechnung austauschbar — ein bewusstes Ingenieurdesign, das Installation und Versicherungsabnahme gleichermaßen vereinfacht.",
                        "unit": "N"
                },
                "SP1.01.063": {
                        "prompt": "Ein Kranhaken trägt eine Last mit vier Ketten in Winkeln von 20°, 110°, 200° und 290° zur Horizontalen. Wenn drei Ketten Spannungen von 800 N, 750 N bzw. 820 N haben, was ist die Spannung in der vierten Kette?",
                        "feedback": {
                                "correct": "Richtig! Das Lösen der Gleichgewichtsgleichungen ergibt T_4 = 750 N",
                                "incorrect": "Berechnen Sie die x- und y-Komponenten aller bekannten Kräfte und lösen Sie dann nach der Unbekannten auf."
                        },
                        "scenario": "Rheinhafen Basel — Vierkettentraverse",
                        "scenario_desc": "Beim Heben eines 15-t-Reaktors im Rheinhafen zeigen drei Kettensensoren 800/750/820 N; der vierte Sensor (290°) versagt beim Anhebevorgang. Rückrechnung via Gleichgewicht: T_4 = 750 N < Nennlast 900 N → Freigabe zum Weiterarbeiten. Ohne diese Echtzeitberechnung hätte die Partie gestoppt werden müssen, bis ein Ersatzsensor beschafft ist.",
                        "unit": "N"
                },
                "SP1.01.064": {
                        "prompt": "Ein Raumfachwerk-Knoten hat sieben Stäbe, die sich bei Winkeln von 0°, 51.43°, 102.86°, 154.29°, 205.71°, 257.14° und 308.57° treffen. Sechs Stäbe haben jeweils Kräfte von 500 N. Welche Kraft muss der siebte Stab für das Gleichgewicht tragen?",
                        "feedback": {
                                "correct": "Richtig! Durch Symmetrie (7 gleiche Winkel) trägt der siebte Stab ebenfalls 500 N",
                                "incorrect": "Suchen Sie nach Symmetrie - sieben gleiche Kräfte in gleichen Winkelabständen bilden ein ausgewogenes System."
                        },
                        "scenario": "Vitra Museum Weil — Siebenfalter Knoten",
                        "scenario_desc": "Im Zaha-Hadid-Vordach des Vitra Design Museum (Weil am Rhein, nahe Basel) gibt es einen seltenen 7-fach-symmetrischen Knoten (je 360°/7 ≈ 51,43°). Sechs Stäbe messen 500 N; der siebte ist unzugänglich. Symmetrieanalyse → siebter Stab ebenfalls 500 N. Dieses Ergebnis wurde später durch FE-Modell bestätigt: Symmetrieerkennung spart Stunden numerischen Aufwands.",
                        "unit": "N"
                },
                "SP1.01.065": {
                        "prompt": "Ein komplexes Rigging-System hat Kräfte: 600 N bei 15°, 550 N bei 75°, 580 N bei 135°, 520 N bei 195°, 590 N bei 255° und F bei 315°. Was ist F für das Gleichgewicht?",
                        "feedback": {
                                "correct": "Richtig! Umfassende Gleichgewichtsanalyse ergibt F = 550 N",
                                "incorrect": "Summieren Sie alle x-Komponenten und y-Komponenten der bekannten Kräfte und lösen Sie dann nach F auf."
                        },
                        "scenario": "Theater Basel — Bühnenzug Hauptbühne Sechskraft",
                        "scenario_desc": "Im 32-m-Schnürboden des Theater Basel konvergieren während einer Wagner-Oper sechs Zugseile (15°, 75°, 135°, 195°, 255°, 315°) an einem Zentralknoten. Fünf Lasten bekannt (600/550/580/520/590 N), das sechste Motorstellglied meldet Kurzfehler. Gleichgewichtsrechnung: F = 550 N — stimmt exakt mit dem gespeicherten Sollwert überein. Fehlalarm bestätigt, Vorstellung kann pünktlich beginnen.",
                        "unit": "N"
                }
        },
        /* SP1.01_DATA_END */

        // --- Global Physics Modules ---
        gp1_01: {
            placeholders: {
                xxx: "xxx",
                xx: "xx",
                minus_4: "-4",
                x: "x",
                v_1: "1",
                v_0: "0"
            },
                back: "Zurück zum Nexus",
                title: "GP1.01 // ATOMKERN",
                difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
                objective_title: "Aktives Missionsziel",
                target_title: "Isotop / Zerfall",
                next: "Nächste Sequenz",
                check: "Verifizieren",
                correct: "Bestätigt",
                incorrect: "Abweichung",
                monitor_title: "GP1.01_ATOM_MONITOR",
                labels: {
                        input: "EINGABEPARAMETER",
                        hints: "HINWEISE",
                        balancing: "KERNREAKTIONSGLEICHUNG",
                        mass: "Massenzahl (A)",
                        atomic: "Ordnungszahl (Z)",
                        nucleus_info: "KERNINFORMATIONEN",
                        protons_z: "Protonen (Z):",
                        neutrons_n: "Neutronen (N):",
                        mass_number_a: "Massenzahl (A):",
                        status: "Status:",
                        stable: "STABIL",
                        unstable: "INSTABIL",
                        binding_energy_semf: "BINDUNGSENERGIE (SEMF)",
                        total_be: "Gesamt-B.E.:",
                        be_per_nucleon: "B.E. pro Nukleon:",
                        decay_mode: "ZERFALLSMODUS",
                        decay_alpha_desc: "Emittiert α-Teilchen (He-4-Kern)",
                        decay_beta_minus_desc: "Neutron → Proton + Elektron + Antineutrino",
                        decay_beta_plus_desc: "Proton → Neutron + Positron + Neutrino",
                        decay_chain: "ZERFALLSKETTE",
                        presets: "VOREINSTELLUNGEN",
                        show_stability_island: "Stabilitätsinsel anzeigen",
                        companion_quiz: "BEGLEITQUIZ"
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
                },
                prompts: {
                        alpha_a_daughter: "Alpha-Zerfallsbilanz: Bestimmen Sie die Tochter-Massenzahl A_daughter.",
                        alpha_z_daughter: "Ladungserhaltung beim Alpha-Zerfall: Bestimmen Sie Z_daughter.",
                        alpha_delta_a: "Alpha-Regelprüfung: Bestimmen Sie die Änderung der Massenzahl Delta A.",
                        beta_z_daughter: "Beta-minus-Bilanz: Bestimmen Sie die Tochter-Ordnungszahl Z_daughter.",
                        beta_a_daughter: "Erhaltungsprüfung bei Beta-minus: Bestimmen Sie A_daughter.",
                        beta_delta_z: "Beta-minus-Regel: Bestimmen Sie die Änderung der Ordnungszahl Delta Z.",
                        gamma_a_daughter: "Gamma-Emission: Bestimmen Sie die Tochter-Massenzahl A_daughter.",
                        gamma_z_daughter: "Gamma-Emission: Bestimmen Sie die Tochter-Ordnungszahl Z_daughter.",
                        gamma_delta_sum: "Gamma-Übergang: Bestimmen Sie Delta A + Delta Z für den Kern."
                }
        },
        gp1_02: {
            placeholders: {
                x_dot_xx: "x.xx",
                x: "x",
                x_dot_x: "x.x"
            },
                back: "Zurück zum Nexus",
                title: "GP5.02 // RELATIVITÄTS-LABOR",
                difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
                objective_title: "Aktives Missionsziel",
                target_title: "Relativistische Effekte",
                next: "Nächste Sequenz",
                check: "Verifizieren",
                correct: "Bestätigt",
                incorrect: "Abweichung",
                monitor_title: "GP5.02_RELATIVITY_MONITOR",
                labels: {
                        velocity: "Geschwindigkeit (v/c)",
                        lorentz_factor: "Lorentz-Faktor (γ)",
                        time_dilation: "Zeitdilatation",
                        length_contraction: "Längenkontraktion",
                        formulas: "Formeln",
                        velocity_value: "{value}% c",
                        gamma_value: "γ = {value}",
                        lorentz_factor_title: "LORENTZ-FAKTOR",
                        velocity_label: "Geschwindigkeit (v/c)",
                        toggle_doppler: "Doppler-Effekt anzeigen",
                        toggle_contraction: "Längenkontraktion anzeigen",
                        companion_quiz: "BEGLEITQUIZ"
                },
                effects: {
                        title: "RELATIVISTISCHE EFFEKTE",
                        time_dilation_label: "Zeitdilatation:",
                        time_dilation_value: "{value}x",
                        length_contraction_label: "Längenkontraktion:",
                        length_contraction_value: "{value}x"
                },
                formulas: {
                        title: "FORMELN",
                        gamma: "γ = 1/√(1-v²/c²)",
                        time: "Δt = γΔt₀",
                        length: "L = L₀/γ",
                        energy: "E = γmc²"
                },
                mission: {
                        title: "MISSION: SPEZIELLE RELATIVITÄT",
                        description: "Erforschen Sie Einsteins spezielle Relativitätstheorie am CERN. Beobachten Sie Zeitdilatation und Längenkontraktion bei Lichtgeschwindigkeit."
                },
                stages: {
                        lorentz: "LORENTZ-FAKTOR",
                        contraction: "LÄNGENKONTRAKTION",
                        dilation: "ZEITDILATATION"
                },
                prompts: {
                        lorentz_l1: "Relativitäts-Checkpoint: Berechnen Sie den Lorentz-Faktor gamma für die gegebene Geschwindigkeit.",
                        lorentz_l2: "Strahlgeschwindigkeits-Prüfung: Berechnen Sie gamma aus dem Verhältnis v/c.",
                        lorentz_l3: "Nahe-Lichtgeschwindigkeit-Fall: Berechnen Sie gamma für präzise Zeitanalyse.",
                        contraction_c1: "Längenkontraktionsaufgabe: Bestimmen Sie die kontrahierte Länge L.",
                        contraction_c2: "Hoher-gamma-Check: Berechnen Sie L aus L_0 und gamma.",
                        contraction_c3: "Relativistische Geometrie: Bestimmen Sie die kontrahierte Länge L im Laborsystem.",
                        dilation_d1: "Zeitdilatations-Basisfall: Bestimmen Sie das beobachtete Zeitintervall Delta t.",
                        dilation_d2: "Uhrenvergleich: Berechnen Sie Delta t im bewegten Bezugssystem.",
                        dilation_d3: "Relativistische Zeitprüfung: Bestimmen Sie Delta t aus gamma und Delta t_0."
                }
        },
        gp1_03: {
            placeholders: {
                x_dot_xx: "x.xx",
                xxxx: "xxxx",
                xx_dot_x: "xx.x",
                v_0_dot_xxxxx: "0.xxxxx",
                xxx: "xxx",
                minus_x_dot_x: "-x.x"
            },
                back: "Zurück zum Nexus",
                title: "GP5.03 // TEILCHENBESCHLEUNIGER",
                difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
                objective_title: "Aktives Missionsziel",
                target_title: "LHC ATLAS DETEKTOR",
                next: "Nächste Sequenz",
                check: "Verifizieren",
                correct: "Bestätigt",
                incorrect: "Abweichung",
                monitor_title: "GP5.03_LHC_MONITOR",
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
                },
                prompts: {
                        acc_gamma_basic: "CERN-Injektorcheck: Berechnen Sie den Lorentz-Faktor gamma aus der gegebenen Strahlgeschwindigkeit.",
                        acc_beam_energy_core: "ATLAS-Vorlauf: Berechnen Sie die Einzelstrahlenergie in GeV zur Magnetabstimmung.",
                        acc_gamma_advanced: "Hochgeschwindigkeitskalibrierung: Berechnen Sie gamma für den nahezu lichtschnellen Protonenstrahl.",
                        acc_momentum_elite: "Impulsdiagnostik: Schätzen Sie den Protonenimpuls p aus den relativistischen Parametern.",
                        col_sqrts_basic: "Kollisionsaufbau: Berechnen Sie die Schwerpunktsenergie sqrt(s) aus den beiden Strahlenergien.",
                        col_event_core: "Luminositätslauf: Berechnen Sie die erwartete Ereigniszahl N aus L, sigma und Laufzeit.",
                        col_ecm_advanced: "Ultrarelativistische Näherung: Berechnen Sie E_cm aus den gegenläufigen Strahlimpulsen.",
                        col_beta_elite: "Geschwindigkeitsanteil-Check: Berechnen Sie beta=v/c aus dem gegebenen gamma.",
                        det_radius_basic: "Tracker-Geometrie: Berechnen Sie den Krümmungsradius r im Magnetfeld B.",
                        det_mass_core: "Invariante-Masse-Rekonstruktion: Berechnen Sie m aus gemessenem E und p.",
                        det_eta_advanced: "Vorwärtsdetektor-Mapping: Berechnen Sie die Pseudorapidität eta aus theta.",
                        det_delta_m_elite: "Higgs-Kanal-Fit: Berechnen Sie das Massenresiduum Delta m = m_reco - m_H."
                },
                reasons: {
                        select_relativistic_gamma: "Verwende die Lorentzfaktor-Formel für ein Teilchen nahe der Lichtgeschwindigkeit.",
                        substitute_collider_values: "Setze die Collider-Werte in die gewählte relativistische Beziehung ein.",
                        select_beam_energy_formula: "Verwende die relativistische Formel für die Strahlenergie.",
                        select_relativistic_momentum: "Verwende den relativistischen Impulsausdruck für ein hochenergetisches Strahlteilchen.",
                        use_ultrarelativistic_limit: "Bei Collider-Energien kann die Teilchengeschwindigkeit näherungsweise als c behandelt werden.",
                        identify_head_on_collision: "Bei einer symmetrischen Frontalkollision addiert sich die Schwerpunktsenergie aus beiden Strahlen.",
                        select_event_rate_formula: "Verwende die Beziehung aus Luminosität und Wirkungsquerschnitt für die Ereigniszahl.",
                        select_beta_formula: "Verknüpfe zuerst beta mit dem Lorentzfaktor und bestimme dann das Geschwindigkeitsverhältnis.",
                        select_track_radius_formula: "Die Krümmung geladener Teilchen im Magnetfeld folgt der Bahnradius-Formel.",
                        select_invariant_mass_formula: "Verwende die Invariantmassen-Beziehung zwischen Gesamtenergie und Impuls.",
                        select_pseudorapidity_formula: "Nutze die Umrechnung vom Detektorwinkel zur Pseudorapidität.",
                        compare_reconstructed_mass: "Vergleiche die rekonstruierte Masse mit der Referenzmasse der Resonanz."
                }
        },
        gp1_04: {
            placeholders: {
                v_1: "1",
                v_0: "0",
                x_dot_xx: "x.xx",
                x_dot_xe_minus_16: "x.xe-16",
                v_0_dot_xxx: "0.xxx",
                v_2: "2",
                x_dot_x: "x.x",
                x_dot_xe14: "x.xe14"
            },
                back: "Zurück zum Nexus",
                title: "GP1.04 // QUANTENTUNNEL",
                difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
                objective_title: "Aktives Missionsziel",
                target_title: "Wellenfunktion",
                next: "Nächste Sequenz",
                check: "Verifizieren",
                correct: "Bestätigt",
                incorrect: "Abweichung",
                monitor_title: "GP1.04_QUANTEN_MONITOR",
                labels: {
                        particle_energy: "PARTIKELENERGIE (E)",
                        barrier_height: "BARRIERENHÖHE (V₀)",
                        barrier_width: "BARRIERENBREITE (a)",
                        transmission: "TRANSMISSIONSKOEFFIZIENT",
                        wave_function: "WELLENFUNKTION",
                        probability_density: "WAHRSCHEINLICHKEITSDICHTE |ψ|^{2}",
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
                },
                prompts: {
                        cl_transmission_basic: "Klassische Barriereprüfung: Bestimmen Sie bei E > V_0 den Transmissionskoeffizienten T.",
                        cl_reflection_core: "Konsistenz im klassischen Grenzfall: Mit T=1 den Reflexionskoeffizienten R berechnen.",
                        cl_wave_number_advanced: "Wellenanalyse im freien Bereich: Berechnen Sie die Wellenzahl k aus der Teilchenenergie.",
                        cl_de_broglie_elite: "Hochenergie-Strahlführung: Berechnen Sie die de-Broglie-Wellenlänge lambda.",
                        tu_transmission_basic: "Quantentunnel-Basisfall: Berechnen Sie T mit dem exponentiellen Abklingmodell.",
                        tu_kappa_core: "Barrierenparameter: Berechnen Sie kappa aus V_0 und E.",
                        tu_transmission_advanced: "Dickere-Barriere-Test: Berechnen Sie die Tunnelwahrscheinlichkeit T für gegebenes kappa und a.",
                        tu_barrier_width_elite: "Barrieren-Design rückwärts: Bestimmen Sie die Breite a für vorgegebenes T.",
                        re_mode_basic: "Resonanzmodus-Bedingung: Bestimmen Sie die ganzzahlige Modenzahl n in 2a=n lambda.",
                        re_energy_level_core: "Quantisierte Zustände: Berechnen Sie E_n aus n^2E_1.",
                        re_delta_energy_advanced: "Übergangsanalyse: Berechnen Sie die Energiedifferenz Delta E zwischen zwei Niveaus.",
                        re_frequency_elite: "Photonenemission: Berechnen Sie die Frequenz f = Delta E / h."
                },
                reasons: {
                        compare_energy_with_barrier: "Vergleiche zuerst die Teilchenenergie mit der Höhe der Barriere.",
                        use_classical_limit: "Im klassischen Grenzfall folgen Transmission und Reflexion direkt aus diesem Energievergleich.",
                        select_wave_number_formula: "Verwende die Wellenzahl-Beziehung für den Teilchenzustand.",
                        substitute_quantum_values: "Setze die Werte des Quantensystems in die gewählte Beziehung ein.",
                        select_de_broglie_relation: "Verwende die de-Broglie-Beziehung für die Wellenlänge eines bewegten Teilchens.",
                        select_tunneling_formula: "Verwende die exponentielle Näherung für die Tunnel-Transmission.",
                        select_decay_constant_formula: "Bestimme zuerst die Abklingkonstante in der Barriere, bevor du die Transmission berechnest.",
                        rearrange_for_barrier_width: "Stelle die Tunnel-Formel nach der Barrierenbreite um.",
                        select_standing_wave_condition: "Verwende die Resonanzbedingung der stehenden Welle im Potentialtopf.",
                        select_quantized_energy_rule: "Verwende die Regel für quantisierte Energieniveaus.",
                        compute_energy_gap: "Bestimme die Übergangsenergie als Differenz zweier Energieniveaus.",
                        select_photon_frequency_relation: "Verwende die Photonenbeziehung zwischen Frequenz und Energie."
                }
        },

        // --- Basel Sek 1 Serie (SP1 - Mechanik) ---

        // SP1.02: Newtonsche Gesetze
        sp1_02: {
                title: "SP1.02 // NEWTONSCHE GESETZE",
                back: "Zurück zum Nexus",
                check: "Verifizieren",
                next: "Weiter",
                correct: "Gesetz Bestätigt",
                incorrect: "Gesetz Fehler",
                monitor_title: "NEWTON_PHYSIK_V1",
                difficulty: {
                        basic: "GRUNDLAGEN",
                        core: "KERN",
                        advanced: "FORTGESCHRITTEN",
                        elite: "ELITE"
                },
                stages: {
                        first_law: "ERSTES GESETZ (TRÄGHEIT)",
                        second_law: "ZWEITES GESETZ (F=ma)",
                        third_law: "DRITTES GESETZ (AKTION-REAKTION)"
                },
                placeholders: {
                        value: "Wert",
                        acceleration_ms2: "m/s²",
                        force_n: "N"
                },
                solver: {
                        constant_label: "konstant",
                        needed_force_label: "benötigt",
                        reaction_force_label: "Reaktionskraft"
                },

                prompts: {
                        first_law_basic: "Trägheitscheck in Basel: Objektgeschwindigkeit {v} m/s bei Nettokraft 0. Aufgabe: F_net angeben.",
                        first_law_core: "Kraftgleichgewicht: Reibung ist {f_friction} N. Aufgabe: erforderliche Antriebskraft für F_net=0 bestimmen.",
                        first_law_adv: "Gegenkraftaufgabe: Antriebskraft ist {f_applied} N. Aufgabe: nötige Reibung für konstante Geschwindigkeit angeben.",
                        first_law_elite: "Schweres System im Gleichgewicht: Gegenkraft {f_friction} N. Aufgabe: ausgleichende Kraft bestimmen.",
                        second_law: "Bewegungsmodell: m={m} kg, F_applied={f} N, F_friction={friction} N. Aufgabe: Beschleunigung a berechnen.",
                        third_law: "Aktion-Reaktion-Check: Objekt A übt {f1} N auf Objekt B aus. Aufgabe: Betrag der Reaktionskraft auf A angeben.",
                        "FIRST_LAW": {
                                "BASIC": [
                                        "Objekt in Ruhe, keine äußere Kraft. Aufgabe: Entscheiden, ob es sich von selbst bewegt.",
                                        "Objekt mit 5 m/s, Nettokraft 0. Aufgabe: Entscheiden, ob sich der Bewegungszustand ändert.",
                                        "Auto steht still, der Fahrer übt keine Kraft aus. Aufgabe: Entscheiden, ob es losfährt.",
                                        "Ball rollt mit 3 m/s auf reibungsfreier Fläche. Aufgabe: Nettokraft bestimmen.",
                                        "Buch liegt auf dem Tisch. Aufgabe: Prüfen, ob Gleichgewicht vorliegt.",
                                        "Puck gleitet mit konstanter Geschwindigkeit über Eis. Aufgabe: Nettokraft bestimmen.",
                                        "Konzeptfrage: Ein ruhendes Objekt bleibt in Ruhe, außer es wirkt was auf es?"
                                ],
                                "CORE": [
                                        "Basler Tram fährt mit 15 m/s, Bremskraft -3000 N, Masse 10000 kg. Aufgabe: Endgeschwindigkeit nach 5 s.",
                                        "Fasnacht-Wagen ruht, Schub 500 N, Reibung 500 N. Aufgabe: Entscheiden, ob er sich bewegt.",
                                        "Rheinboot fährt mit 2 m/s, Motor aus, Reibung 100 N, Masse 500 kg. Aufgabe: Zeit bis zum Stillstand.",
                                        "Objekt mit 10 m/s, Nettokraft 0 N. Aufgabe: Geschwindigkeit nach 10 s.",
                                        "Auto mit 20 m/s, Reibung 2000 N, Masse 1000 kg. Aufgabe: Verzögerung bestimmen.",
                                        "Tram mit konstanter 12 m/s, Antriebskraft = Reibung. Aufgabe: Nettokraft bestimmen.",
                                        "Puck auf Eis mit 5 m/s, keine Reibung. Aufgabe: Geschwindigkeit nach 20 s.",
                                        "Basler Bus in Ruhe, Motorkraft 3000 N, Reibung 3000 N. Aufgabe: Beschleunigung bestimmen."
                                ],
                                "ADVANCED": [
                                        "SBB-Zug in Basel: 50000 kg bei 25 m/s, Bremskraft -10000 N. Aufgabe: Anhalteweg berechnen.",
                                        "Fasnacht-Wagen: 2000 kg, Schub 1000 N, Reibung 800 N. Aufgabe: Beschleunigung berechnen.",
                                        "Rheinboot: 1000 kg bei 5 m/s, Wasserwiderstand 200 N. Aufgabe: Zeit bis 3 m/s.",
                                        "Tram: 15000 kg bei 20 m/s, Notbremsung -12000 N. Aufgabe: Anhalteweg bestimmen.",
                                        "Objekt: 500 kg bei 8 m/s, Reibung 100 N. Aufgabe: Weg bis zum Stillstand.",
                                        "Auto: 1200 kg bei 30 m/s, Bremskraft -4000 N. Aufgabe: Zeit bis zum Stillstand."
                                ],
                                "ELITE": [
                                        "Basler Tramsystem: drei Trams (10000, 12000, 15000 kg) mit je 15 m/s. Aufgabe: Gesamtimpuls.",
                                        "Fasnacht-Wagen: 3000 kg in Ruhe, Kräfte 500 N, 300 N, -200 N. Aufgabe: Nettokraft bestimmen.",
                                        "Rheinboot: 2000 kg bei 4 m/s, Motorschub 1000 N, Wasserwiderstand 800 N. Aufgabe: Endgeschwindigkeit nach 10 s."
                                ]
                        },
                        "SECOND_LAW": {
                                "BASIC": [
                                        "Beschleunigungsübung am Labortisch: Gegeben F=10 N und m=2 kg. Aufgabe: a (m/s^{2}) berechnen. Nutzen: F=ma anwenden.",
                                        "Klassischer Krafttest: Gegeben F=20 N und m=5 kg. Aufgabe: a (m/s^{2}) bestimmen. Nutzen: a=F/m.",
                                        "Dynamik-Einstieg: Gegeben F=15 N und m=3 kg. Aufgabe: Beschleunigung a berechnen. Nutzen: 2. Newton anwenden.",
                                        "Rückwärtsrechnung Kraft: Gegeben m=10 kg und a=2 m/s^{2}. Aufgabe: Kraft F (N) bestimmen.",
                                        "Antriebsdimensionierung: Gegeben m=5 kg und a=4 m/s^{2}. Aufgabe: erforderliche Kraft F (N) bestimmen.",
                                        "Massenbestimmung: Gegeben F=30 N und a=6 m/s^{2}. Aufgabe: m (kg) berechnen. Nutzen: m=F/a.",
                                        "System-Identifikation: Gegeben F=40 N und a=8 m/s^{2}. Aufgabe: Masse m (kg) bestimmen."
                                ],
                                "CORE": [
                                        "Basler Tram-Anfahrfall: m=10000 kg, Ziel a=1,5 m/s^{2}. Aufgabe: Zugkraft F (N) berechnen. Nutzen: Fahrregler auslegen.",
                                        "Fasnacht-Wagen-Test: m=2000 kg, Schubkraft 1000 N. Aufgabe: Beschleunigung a (m/s^{2}) berechnen.",
                                        "Rheinboot-Schubanalyse: m=1500 kg, Motorschub 3000 N. Aufgabe: Beschleunigung a bestimmen.",
                                        "SBB-Bremsanalyse: m=50000 kg, Bremskraft -10000 N. Aufgabe: Verzögerung a (m/s^{2}) berechnen.",
                                        "Tram-Upgrade-Planung: m=12000 kg benötigt a=2 m/s^{2}. Aufgabe: notwendige Kraft F (N) bestimmen.",
                                        "Stadtfahrzeug-Dynamik: m=1000 kg, Nettokraft 2000 N. Aufgabe: Beschleunigung a berechnen.",
                                        "Basler Bus-Taktprüfung: m=8000 kg, a=1 m/s^{2}. Aufgabe: Kraft F (N) berechnen.",
                                        "Sprintmodell Fahrrad: m=80 kg, Kraft 160 N. Aufgabe: Beschleunigung a (m/s^{2}) bestimmen.",
                                        "Lkw-Lastfall: m=5000 kg, a=0,5 m/s^{2}. Aufgabe: Kraft F (N) berechnen."
                                ],
                                "ADVANCED": [
                                        "Basler Tram: 10000 kg, Antriebskraft 18000 N, Reibung 3000 N. Aufgabe: a (m/s^{2}) berechnen.",
                                        "Fasnacht-Wagen: 3000 kg, Schub 2000 N, Reibung 500 N. Aufgabe: a (m/s^{2}) berechnen.",
                                        "Rheinboot: 2000 kg, Schub 4000 N, Wasserwiderstand 1000 N. Aufgabe: a (m/s^{2}) berechnen.",
                                        "SBB-Zug: 60000 kg, Bremskraft -15000 N, Reibung -3000 N. Aufgabe: a (m/s^{2}) berechnen.",
                                        "Tram 15000 kg benötigt 1,8 m/s^{2} bei 2000 N Reibung. Aufgabe: Antriebskraft (N) berechnen.",
                                        "Auto: 1200 kg, Motorkraft 5000 N, Luftwiderstand 800 N. Aufgabe: a (m/s^{2}) berechnen.",
                                        "Basler Bus: 8000 kg, Motorkraft 10000 N, Reibung 2000 N. Aufgabe: a (m/s^{2}) berechnen."
                                ],
                                "ELITE": [
                                        "Basler Tramsystem: drei Trams (10000, 12000, 15000 kg) mit 1,5 m/s^{2}. Aufgabe: Gesamtkraft.",
                                        "Fasnacht-Umzug: 5 Wagen, je 2000 kg, je 1000 N Schub. Aufgabe: Gesamtbeschleunigung bestimmen.",
                                        "Rheinboot: 2500 kg, Schub 5000 N, Wasserwiderstand 20% des Schubs. Aufgabe: a (m/s^{2}) berechnen."
                                ]
                        },
                        "THIRD_LAW": {
                                "BASIC": [
                                        "Wandversuch: Sie drücken mit 50 N gegen die Wand. Aufgabe: Gegenkraft der Wand angeben. Nutzen: 3. Newton prüfen.",
                                        "Raketenbeispiel: Die Rakete übt 1000 N auf das Gas aus. Aufgabe: Reaktionskraft des Gases auf die Rakete bestimmen.",
                                        "Gravitationspaar: Die Erde zieht Sie mit 600 N. Aufgabe: Ihre Kraft auf die Erde angeben.",
                                        "Hammer-Nagel-Fall: Der Hammer wirkt mit 200 N auf den Nagel. Aufgabe: Kraft des Nagels auf den Hammer bestimmen.",
                                        "Konzeptfrage: Wirken Aktions- und Reaktionskraft auf dasselbe oder auf unterschiedliche Objekte?",
                                        "Richtungsfrage: Aktionskraft 100 N nach Osten. Aufgabe: Richtung der Reaktionskraft angeben."
                                ],
                                "CORE": [
                                        "Basler Tram-Schiene-Interaktion: Tram drückt mit 15000 N auf die Schiene. Aufgabe: Reaktionskraft der Schiene auf die Tram bestimmen.",
                                        "Rheinpropeller-Fall: Propeller drückt Wasser mit 3000 N nach hinten. Aufgabe: Reaktionskraft des Wassers auf das Boot angeben.",
                                        "Fasnacht-Wagen-Bodenkontakt: Wagen drückt mit 20000 N auf den Boden. Aufgabe: Gegenkraft des Bodens bestimmen.",
                                        "SBB Rad-Schiene-System: Räder drücken mit 50000 N auf die Schiene. Aufgabe: Gegenkraft der Schiene auf die Räder bestimmen.",
                                        "Schwimmantrieb: Schwimmer drückt Wasser mit 500 N nach hinten. Aufgabe: Reaktionskraft des Wassers auf den Schwimmer angeben.",
                                        "Reifen-Straße-Fall: Reifen drückt mit 4000 N auf die Straße. Aufgabe: Reaktionskraft der Straße auf den Reifen bestimmen.",
                                        "Raketenstrahl-Analyse: Rakete drückt Abgas mit 100000 N. Aufgabe: Reaktionskraft des Abgases auf die Rakete angeben.",
                                        "Mensch-Wand-Interaktion: Person drückt mit 200 N auf die Wand. Aufgabe: Gegenkraft der Wand auf die Person bestimmen."
                                ],
                                "ADVANCED": [
                                        "Basler Tram 10000 kg beschleunigt mit 1,5 m/s^{2}. Aufgabe: Kraft auf die Schiene bestimmen.",
                                        "Rheinboot 2000 kg beschleunigt mit 2 m/s^{2}. Aufgabe: Kraft auf das Wasser bestimmen.",
                                        "Fasnacht-Wagen 3000 kg, Reibung 500 N, Beschleunigung 0,5 m/s^{2}. Aufgabe: Kraft auf den Boden.",
                                        "SBB-Zug 50000 kg verzögert mit -0,2 m/s^{2}. Aufgabe: Kraft auf die Schiene bestimmen.",
                                        "Rakete 5000 kg beschleunigt mit 10 m/s^{2}. Aufgabe: Kraft auf das Abgas bestimmen.",
                                        "Auto 1200 kg beschleunigt mit 3 m/s^{2}. Aufgabe: Kraft auf die Straße bestimmen.",
                                        "Basler Bus 8000 kg beschleunigt mit 1 m/s^{2}. Aufgabe: Kraft auf die Straße bestimmen."
                                ],
                                "ELITE": [
                                        "Basler Tram (10000 kg) kollidiert mit Auto (1000 kg). Tram übt 50000 N auf das Auto aus. Aufgabe: Gegenkraft auf die Tram.",
                                        "Rheinboot 2000 kg drückt Wasser mit 4000 N und beschleunigt mit 2 m/s^{2}. Aufgabe: bewegte Wassermasse abschätzen.",
                                        "Fasnacht-Wagen 3000 kg, Bodenkraft 2000 N, Beschleunigung 0,5 m/s^{2}. Aufgabe: Reibungskraft bestimmen.",
                                        "SBB-Zug 50000 kg, Schub der Schiene 10000 N, Verzögerung -0,2 m/s^{2}. Aufgabe: F=ma prüfen."
                                ]
                        }
                },
                labels: {
                        "ans": "Antwort",
                        "placeholder": "hier eingeben",
                        first_law_statement: "Newtons erstes Gesetz:",
                        constant_state: "konstant"
                },
                answers: {
                        no: "nein",
                        yes: "ja",
                        constant_velocity: "konstante Geschwindigkeit",
                        net_external_force: "äußere Nettokraft",
                        different_objects: "verschiedene Objekte",
                        west: "Westen"
                },
                scenarios: {
                        first_law: "Basel Fasnacht Umzugswagen Bewegung: Während Basels berühmter Fasnacht am Marktplatz demonstrieren aufwendig dekorierte Umzugswagen Newtons Erstes Gesetz der Trägheit. Ein massiver Wagen mit 3.000 kg Masse ruht vor Beginn des Umzugs. Trotz seines farbenfrohen Aussehens widersteht er hartnäckig der Bewegung – er bleibt in Ruhe, es sei denn, eine äußere Kraft wirkt auf ihn ein. Wenn Umzugsteilnehmer mit 2.000 N schieben, während Reibung mit 500 N entgegenwirkt, überwindet die Nettokraft von 1.500 N die Trägheit und beschleunigt den Wagen mit 0,5 m/s^{2}. Sobald er sich mit konstanter Geschwindigkeit durch die Umzugsroute bewegt, fährt der Wagen mit gleichmäßiger Geschwindigkeit weiter, wenn die Schieber eine Kraft gleich der Reibung aufrechterhalten.",
                        second_law: "Basel Tram Beschleunigung und Bremsen: Basels ikonische grüne Trams navigieren durch die Straßen der Stadt und demonstrieren Newtons Zweites Gesetz in Aktion. Am Barfüsserplatz beschleunigt eine Tram mit einer Masse von 10.000 kg aus dem Stillstand, um Reisegeschwindigkeit zu erreichen. Die Elektromotoren erzeugen eine Vorwärtskraft von 15.000 N, während Reibung und Luftwiderstand 3.000 N Gegenkraft liefern. Mit F=ma berechnen wir, dass die Nettokraft (12.000 N) eine Beschleunigung von 1,2 m/s^{2} erzeugt. Beim Annähern an die nächste Haltestelle betätigt der Fahrer die Bremsen mit -10.000 N, kombiniert mit -3.000 N Reibung, was -13.000 N Nettokraft und -1,3 m/s^{2} Verzögerung erzeugt.",
                        third_law: "Rhein Schiffspropulsion: Entlang des Basler Rheins in der Nähe der Mittleren Brücke demonstrieren Passagierschiffe Newtons Drittes Gesetz durch ihre Antriebssysteme. Wenn sich der Propeller eines Bootes dreht, drückt er das Wasser mit enormer Kraft nach hinten – vielleicht 3.000 N für eine typische Rheinfähre. Gemäß Newtons Drittem Gesetz drückt das Wasser gleichzeitig das Boot mit einer gleichen Kraft von 3.000 N in die entgegengesetzte Richtung nach vorne. Dieses Aktions-Reaktions-Paar wirkt auf verschiedene Objekte: Der Propeller wirkt auf das Wasser, während das Wasser auf das Boot wirkt. Die 1.500 kg Masse des Bootes beschleunigt dadurch mit 2 m/s^{2} nach vorne."
                },
                reasons: {
                        state_equilibrium_principle: "Formulieren Sie zuerst das Kraftgleichgewicht, das in dieser Situation gilt.",
                        match_balancing_force: "Bestimmen Sie die Ausgleichskraft aus der Bedingung der verschwindenden Nettokraft.",
                        compute_net_force: "Berechnen Sie zunächst die Nettokraft und danach die Beschleunigung.",
                        apply_newton_second_law: "Wenden Sie Newtons zweites Gesetz an, um Nettokraft, Masse und Beschleunigung zu verknüpfen.",
                        state_action_reaction_pair: "Schreiben Sie zuerst das Wirkungs-Gegenwirkungs-Paar der beiden wechselwirkenden Objekte auf.",
                        match_equal_magnitude: "Nutzen Sie, dass die Gegenkraft gleich groß und entgegengesetzt gerichtet ist."
                }
        },

        // SP1.06: Pendel & Schwingungen
        sp1_06: {
                back: "Zurück zum Nexus",
                title: "SP1.06 // PENDEL & SCHWINGUNGEN",
                canvas_labels: {
                        ke: "KE",
                        pe: "PE",
                        total: "Gesamt"
                }
        },

        // --- Basel Sek 2 Serie (SP2 - Elektrizität) ---

        // SP2.01: Stromkreis Grundlagen
        sp2_01: {
                back: "Zurück zum Nexus",
                title: "SP2.01 // STROMKREIS GRUNDLAGEN",
                check: "Verifizieren",
                next: "Weiter",
                correct: "Stromkreis Bestätigt",
                incorrect: "Stromkreis Fehler",
                monitor_title: "SP2.01_STROMKREIS_LABOR",
                labels: {
                        quest: "Aufgabe",
                        component_name: "Bauteilname",
                        function: "Funktion",
                        symbol: "Symbol",
                        answer: "Antwort",
                        fault_type: "Fehlerart"
                },
                objective_title: "Stromkreis Ziel",
                difficulty: { basic: "BASIS", core: "KERN", advanced: "ERWEITERT", elite: "ELITE" },
                stages: {
                        components: "BAUTEILE",
                        simple_circuits: "EINFACHE STROMKREISE",
                        circuit_diagrams: "SCHALTPLÄNE"
                },
                placeholders: {
                        type_name: "Name eingeben",
                        describe_function: "Funktion beschreiben",
                        select_symbol: "Symbol wählen",
                        type_answer: "Antwort eingeben",
                        identify_fault: "Fehler erkennen"
                },
                visualization: {
                        diagram_drawer: {
                                title: "Schaltplan-Zeichner",
                                description: "Zeichnen Sie Schaltpläne mit IEC-Standardsymbolen",
                                battery: "Batterie",
                                bulb: "Lampe",
                                switch: "Schalter",
                                wire: "Leitung",
                                resistor: "Widerstand",
                                place_symbols: "Klicken Sie, um Symbole im Raster zu platzieren",
                                draw: "Zeichnen",
                                clear: "Löschen"
                        },
                        circuit_builder: {
                                title: "Stromkreis-Builder",
                                description: "Interaktiver Stromkreisbau folgt in Kürze",
                                battery: "Batterie",
                                bulb: "Lampe",
                                switch: "Schalter",
                                wire: "Leitung",
                                resistor: "Widerstand",
                                workspace: "Ziehen Sie Bauteile hierher, um Ihren Stromkreis aufzubauen"
                        }
                },
                scenarios: {
                        components: "Basler Elektrische Sicherheit im Haushalt: Sie sind Auszubildender Elektriker an der Gewerbeschule Basel. Heute lernen Sie, Stromkreiskomponenten für Hausinstallationen zu identifizieren. Das Verständnis der Funktion jeder Komponente ist sicherheitskritisch - eine falsch identifizierte Komponente könnte Brände oder Stromschläge verursachen. In Basels historischen Gebäuden müssen elektrische Systeme strenge Schweizer Sicherheitsstandards (NIV 2020) erfüllen. Sie arbeiten mit Batterien (Stromquellen, die Spannung liefern), Glühbirnen (wandeln elektrische Energie in Licht um), Schaltern (steuern den Stromfluss), Drähten (leiten Elektrizität) und Widerständen (begrenzen den Strom). Jede Komponente hat eine spezifische Rolle beim Schutz von Häusern und der Gewährleistung zuverlässiger Stromversorgung. Dieses Wissen ist für Basels 170.000 Einwohner, die täglich auf sichere elektrische Systeme angewiesen sind, unerlässlich.",
                        simple_circuits: "Basler Weihnachtsbeleuchtung Installation: Sie helfen bei der Installation von Weihnachtslichtern entlang der Basler Freien Strasse. Die Stadt verlangt energieeffiziente LED-Lichterketten, die unabhängig gesteuert werden können. Sie müssen Reihenschaltungen (wo Glühbirnen in einem einzigen Pfad sind - wenn eine ausfällt, erlöschen alle) von Parallelschaltungen (wo Glühbirnen in separaten Pfaden sind - jede kann unabhängig gesteuert werden) verstehen. Reihenschaltungen sind einfacher, aber weniger zuverlässig. Parallelschaltungen verwenden mehr Draht, bieten aber Redundanz. Für Basels 2 km Weihnachtsbeleuchtung ermöglichen Parallelschaltungen mit individuellen Schaltern, Abschnitte tagsüber auszuschalten, um Energie zu sparen. Der Basler Weihnachtsmarkt verwendet über 50.000 LED-Glühbirnen, und ein ordnungsgemäßes Schaltungsdesign stellt sicher, dass sie sicher bei 230V AC betrieben werden und dabei minimalen Strom verbrauchen.",
                        circuit_diagrams: "Basler Elektrotechnik Ausbildung: Im ABB Schweiz Ausbildungszentrum Basel lernen Sie, Schaltpläne zu lesen und zu zeichnen - die universelle Sprache der Elektriker weltweit. Schaltungssymbole sind von der IEC (Internationale Elektrotechnische Kommission) standardisiert, sodass Ingenieure in Basel mit Kollegen in Tokio oder New York zusammenarbeiten können. Eine Batterie wird als zwei parallele Linien dargestellt (lange positive, kurze negative). Eine Glühbirne ist ein Kreis mit einem X darin. Ein Schalter ist eine Lücke in der Linie (offen) oder eine durchgehende Linie (geschlossen). Widerstände sind Rechtecke oder Zickzacklinien. Amperemeter (messen Strom in Ampere) und Voltmeter (messen Spannung in Volt) sind Kreise mit A oder V darin. Diese Symbole erscheinen in jedem elektrischen Schaltplan von einfachen Hausschaltungen bis zu komplexen Industriesystemen bei Basels Roche und Novartis Pharmaunternehmen. Die Beherrschung von Schaltplänen ist für Ihr Eidgenössisches Fähigkeitszeugnis (EFZ) in Elektrotechnik unerlässlich."
                },
                prompts: {
                        component_battery: "Batterie",
                        component_bulb: "Glühbirne",
                        component_switch: "Schalter",
                        component_wire: "Draht",
                        component_resistor: "Widerstand",
                        component_name: "Bei einer Basler Wohnungs-Sicherheitsprüfung erscheint das Symbol {symbol} im Plan. Benennen Sie das Bauteil, damit die Installation freigegeben werden kann.",
                        component_function: "Im Werkstatttraining sollen Sie die Funktion von {component} erklären, damit das Team die Komponente korrekt und sicher positioniert.",
                        component_symbol: "Bei der ABB-Planprüfung wählen Sie das richtige Symbol für {component}, damit alle nach demselben Standard verdrahten.",
                        terminal_question_battery: "Notstrom-Check in einer Basler Wohnung: Es wird eine Standardbatterie verwendet. Wie viele Anschlüsse hat sie, damit die Polarität korrekt verbunden wird?",
                        terminal_question_bulb: "Bei der Treppenhaus-Inbetriebnahme muss geklärt werden, ob die Glühbirne polar ist. Geben Sie die Entscheidung an, um Fehlverdrahtung zu vermeiden.",
                        terminal_question_switch: "In einem Flur-Steuerkreis: Welche zwei Zustände hat ein Schalter, damit Betrieb und Fehlersuche dokumentiert werden können?",
                        terminal_question_wire: "Beim Austausch von Leitungen in einem historischen Basler Gebäude: Welche Eigenschaft muss ein Draht haben, um sicher zu leiten?",
                        terminal_question_resistor: "Auf dem Labortisch: Welche Information geben die Farbringe eines Widerstands an, damit der Strom korrekt begrenzt werden kann?",
                        build_simple_circuit: "Im Schullabor soll eine Testlampe leuchten. Gegeben sind eine Batterie und eine Glühbirne; bauen Sie den geschlossenen Stromkreis und prüfen Sie die Grundfunktion.",
                        build_series_bulbs: "Schaufenster-Aufgabe: Gegeben sind {count} Glühbirnen. Bauen Sie eine Reihenschaltung und nutzen Sie das Ergebnis, um Helligkeit und Zuverlässigkeit zu bewerten.",
                        build_parallel_bulbs: "Campus-Beleuchtungsaufgabe: Gegeben sind {count} Glühbirnen. Bauen Sie eine Parallelschaltung und prüfen Sie, ob ein Ausfall nicht alle Lampen abschaltet.",
                        build_switch_control: "Wohnungs-Upgrade: Bauen Sie eine Schaltung mit Batterie, Lampe und Schalter, sodass der Schalter die Lampe steuert, und verwenden Sie sie für die Sicherheitsabnahme.",
                        draw_iec_diagram: "In der ABB-Lehrlingsprüfung zeichnen Sie mit IEC-Symbolen einen Schaltplan „Batterie mit Glühbirne“, damit das Team konsistent umsetzen kann.",
                        compare_series_three: "Sie vergleichen zwei Beleuchtungsvarianten. Bauen Sie 3 Lampen in Reihe und dokumentieren Sie die Helligkeit, um die Eignung der Variante zu entscheiden.",
                        compare_parallel_three: "Sie vergleichen zwei Beleuchtungsvarianten. Bauen Sie 3 Lampen parallel und dokumentieren Sie die Helligkeit, um die robustere Stadtlösung zu wählen.",
                        troubleshoot_not_working: "Vor Ort bleibt die Lampe dunkel. Finden und beheben Sie den Fehler, damit die Festbeleuchtung sicher wieder läuft.",
                        design_two_switches_one_bulb: "Bahnhofstreppen-Projekt: Entwerfen Sie eine Schaltung, bei der zwei Schalter eine Lampe unabhängig steuern, um die Zwei-Enden-Bedienung zu erfüllen.",
                        design_three_bulbs_independent: "Labor-Zonenprojekt: Entwerfen Sie eine 3-Lampen-Schaltung mit unabhängigen Schaltern, damit eine Zone geändert werden kann, ohne die anderen zu beeinflussen.",
                        design_efficient_four_bulbs: "Kommunales Energiesparprojekt: Entwerfen Sie eine Schaltung für 4 Lampen mit voller Helligkeit und minimalen Komponenten, um Kosten und Wartung zu senken.",
                        design_emergency_backup: "Krankenhaus-Notbeleuchtung: Entwerfen Sie eine Backup-Versorgung, sodass bei Ausfall einer Batterie mindestens eine Lampe für die Evakuierung aktiv bleibt.",
                        design_mixed_series_parallel: "Integrationsaufgabe: Entwerfen Sie eine Mischschaltung, bei der Schalter 1 zwei Lampen in Reihe und Schalter 2 zwei Lampen parallel steuert; beide Gruppen sollen unabhängig laufen."
                },
                faults: {
                        broken_wire: "Drahtbruch",
                        dead_battery: "Leere Batterie",
                        burned_bulb: "Durchgebrannte Lampe",
                        open_switch: "Offener Schalter",
                        unknown: "Unbekannter Fehler"
                },
                answers: {
                        battery_terminals: "2 (Plus und Minus)",
                        bulb_polarity: "Nein, sie funktioniert in beide Richtungen",
                        switch_states: "Offen und geschlossen",
                        wire_property: "Geringer Widerstand",
                        resistor_bands: "Widerstandswert",
                        simple_circuit_complete: "Schaltung vollständig. Die Lampe sollte leuchten.",
                        series_brightness: "Reihenschaltung fertig. Alle {count} Lampen leuchten schwächer als eine einzelne Lampe.",
                        parallel_brightness: "Parallelschaltung fertig. Alle {count} Lampen leuchten mit voller Helligkeit.",
                        switch_circuit_complete: "Schaltung vollständig. Betätigen Sie den Schalter, um die Lampe ein- und auszuschalten.",
                        diagram_correct: "Diagramm korrekt: Batteriesymbol mit Plus- und Minuspol, Lampensymbol als Kreis mit X.",
                        two_way_complete: "Wechselschaltung fertig. Testen Sie beide Schalter.",
                        independent_control_complete: "Schaltung mit unabhängiger Steuerung fertig. Testen Sie jeden Schalter einzeln.",
                        efficient_parallel_complete: "Effiziente Parallelschaltung fertig. Alle Lampen leuchten mit minimalem Bauteileinsatz hell.",
                        redundant_complete: "Redundante Schaltung fertig. Testen Sie sie, indem Sie eine Batterie entfernen.",
                        mixed_circuit_complete: "Komplexe Mischschaltung fertig. Testen Sie beide Schalter und beobachten Sie die Helligkeit."
                },
                hints: {
                        component_usage_battery: "Dieses Bauteil wird in versorgenden Stromkreisen verwendet.",
                        component_usage_bulb: "Dieses Bauteil wird in Beleuchtungsstromkreisen verwendet.",
                        component_usage_switch: "Dieses Bauteil wird zum Steuern von Stromkreisen verwendet.",
                        component_usage_wire: "Dieses Bauteil wird zum Verbinden von Stromkreisen verwendet.",
                        component_usage_resistor: "Dieses Bauteil wird zum Begrenzen des Stroms im Stromkreis verwendet.",
                        look_at_symbol: "Achten Sie auf das Symbol: {symbol}",
                        reveal_answer: "Die Antwort ist: {answer}",
                        check_connections: "Prüfen Sie zuerst, ob alle Komponenten korrekt verbunden sind.",
                        test_components: "Testen Sie jede Komponente einzeln.",
                        problem_is: "Das Problem ist: {fault}",
                        staircase_lights: "Denken Sie daran, wie Treppenhauslicht funktioniert: Man kann es von beiden Enden schalten.",
                        special_switch_configuration: "Sie müssen die Schalter in einer besonderen Konfiguration verdrahten.",
                        spdt_circuit: "Dies ist eine SPDT-Schaltung (Single Pole Double Throw)."
                },
                reasons: {
                        identify_component_feature: "Bestimmen Sie zuerst das entscheidende Merkmal des Bauteils, bevor Sie es benennen.",
                        match_component_role: "Ordnen Sie das Bauteil seiner Funktion oder seinem Standardsymbol zu.",
                        confirm_series_or_parallel: "Prüfen Sie zuerst, ob eine einzelne Schleife oder unabhängige Zweige gefordert sind.",
                        read_iec_diagram: "Lesen Sie zuerst die IEC-Symbole und Leitungsverbindungen, bevor Sie den Aufbau festlegen.",
                        identify_fault_and_fix: "Bestimmen Sie die Störung, die den Stromkreis unterbricht, und nennen Sie die Reparatur.",
                        check_design_requirements: "Prüfen Sie jede Anforderung, bevor Sie die endgültige Schaltung bestätigen."
                },
                feedback: {
                        parallel_reason: "Parallele Verdrahtung gibt jeder Lampe einen eigenen Zweig, sodass die übrigen weiterleuchten, wenn eine ausfällt.",
                        series_reason: "Bei einer Reihenschaltung liegen alle Bauteile in einem gemeinsamen Kreis, daher fließt derselbe Strom durch alle Teile.",
                        draw_reason: "Batterie, Lampe, Schalter und Widerstand brauchen die passenden IEC-Symbole und einen geschlossenen Leitungsweg.",
                        troubleshoot_reason: "Beheben Sie {fault}, damit sich der Stromkreis wieder schließt.",
                        design_reason: "Erfüllen Sie zuerst die genannten Anforderungen an Steuerung, Redundanz und Effizienz, bevor Sie den Aufbau bestätigen.",
                        correct: "Schaltungsanalyse bestätigt.",
                        incorrect: "Schaltungskonfigurationsfehler erkannt."
                }
        },

        // SP2.02: Ohmsches Gesetz & Schaltungen
        sp2_02: {
                title: "SP2.02 // OHMSCHES GESETZ & SCHALTUNGEN",
                back: "Zurück zum Nexus",
                check: "Verifizieren",
                next: "Weiter",
                correct: "Schaltung Bestätigt",
                incorrect: "Schaltungsfehler",
                difficulty: {
                        basic: "BASIS",
                        core: "KERN",
                        advanced: "ERWEITERT",
                        elite: "ELITE"
                },
                stages: {
                        ohms_law: "OHMSCHES GESETZ",
                        series_circuits: "REIHENSCHALTUNG",
                        parallel_circuits: "PARALLELSCHALTUNG"
                },
            placeholders: {
                type_value: "Wert eingeben"
            },
                visualization: {
                        ohms_law_formula: "Ohm'sches Gesetz: U = I × R",
                        voltage: "Spannung",
                        current: "Strom",
                        resistance: "Widerstand",
                        current_flow: "Stromfluss →",
                        series_formula: "Reihenschaltung: R_total = R_1 + R_2 + ...",
                        total: "Gesamt",
                        series_summary: "Spannung: {voltage}V → Strom: {current}A",
                        parallel_formula: "Parallelschaltung: 1/R_total = 1/R_1 + 1/R_2 + ...",
                        total_resistance: "Gesamtwiderstand",
                        total_current: "Gesamtstrom"
                },
                scenarios: {
                        ohms_law: "Elektrotechnik-Labor an der Universität Basel: Sie sind Elektrotechnik-Student im ersten Jahr und lernen Schaltungsgrundlagen. Das heutige Labor konzentriert sich auf das Ohmsche Gesetz (U = I × R), die Grundlage aller Schaltungsanalysen. Ihre Aufgabe ist es, Spannung, Strom oder Widerstand in einfachen Schaltungen zu berechnen. Professor Schmidt betont: 'Das Ohmsche Gesetz zu verstehen ist wie das Alphabet zu lernen - es ist essentiell für alles, was folgt.' Sie werden digitale Multimeter verwenden, um echte Schaltungen zu messen und Ihre Berechnungen zu verifizieren. Dieses Wissen ist entscheidend für die Entwicklung von allem, von Smartphone-Schaltungen bis zu Basels Straßenbahn-Elektrosystemen.",
                        series_circuits: "Novartis Pharma-Gerätedesign: Sie arbeiten mit dem Elektrotechnik-Team bei Novartis Basel und entwerfen die Stromverteilung für neue Laborgeräte. In Reihenschaltungen teilen sich Komponenten denselben Strom, aber die Spannung teilt sich auf sie auf. Ihre Aufgabe ist es, den Gesamtwiderstand (R_gesamt = R_1 + R_2 + ...) und den Stromfluss zu berechnen. Dies ist kritisch, um sicherzustellen, dass empfindliche Analysegeräte die korrekten Spannungspegel erhalten. Eine Fehlberechnung könnte Geräte im Wert von Millionen Schweizer Franken beschädigen oder Arzneimittel-Qualitätstestergebnisse gefährden.",
                        parallel_circuits: "Roche Tower Beleuchtungssystem: Sie entwerfen das Notbeleuchtungssystem für den Roche Tower in Basel. In Parallelschaltungen teilen sich Komponenten dieselbe Spannung, aber der Strom teilt sich auf die Zweige auf. Ihre Aufgabe ist es, den Gesamtstrom und den äquivalenten Widerstand (1/R_gesamt = 1/R_1 + 1/R_2 + ...) zu berechnen. Dieses Design stellt sicher, dass wenn ein Licht ausfällt, andere weiterarbeiten - kritisch für die Sicherheit bei Stromausfällen. Das System muss die 41 Stockwerke des Gebäudes mit Tausenden von LED-Leuchten effizient betreiben."
                },
                prompts: {
                        ohms_find_current: "Basler Labortest: Bestimmen Sie den Zweigstrom. Gegeben U = {voltage} V und R = {resistance} Ω, verwenden Sie I = U/R und geben Sie I in A an.",
                        ohms_find_voltage: "Tram-Controller-Kalibrierung: Gegeben I = {current} A und R = {resistance} Ω, verwenden Sie U = I×R und geben Sie U in V an.",
                        ohms_find_resistance: "Sicherheitsprüfung im Labor: Gegeben I = {current} A und U = {voltage} V, verwenden Sie R = U/I und geben Sie R in Ω an.",
                        series_find_current: "Novartis-Gerätekette (Reihe): {components}, Quellspannung U = {voltage} V. Berechnen Sie zuerst R_total, dann den Strom I.",
                        parallel_find_total_current: "Roche-Notbeleuchtung (Parallelzweige): {components}, Quellspannung U = {voltage} V. Berechnen Sie die Zweigströme und den Gesamtstrom I_total."
                },
                reasons: {
                        select_ohms_formula: "Wählen Sie zuerst die elektrische Beziehung, die zur gesuchten Größe passt.",
                        solve_for_missing_electrical_quantity: "Setzen Sie die bekannten Werte ein und lösen Sie nach der fehlenden Größe auf.",
                        add_series_resistances: "Addieren Sie die Reihenwiderstände zum Gesamtwiderstand.",
                        divide_voltage_by_total_resistance: "Teilen Sie die Versorgungsspannung durch den Gesamtwiderstand, um den Reihenstrom zu bestimmen.",
                        compute_branch_currents: "Berechnen Sie für jeden Parallelzweig den Strom mit derselben Spannung.",
                        sum_parallel_currents: "Addieren Sie die Teilströme zum Gesamtstrom."
                }
        },

        // SP2.03: Elektrische Leistung & Energie
        sp2_03: {
                title: "SP2.03 // ELEKTRISCHE LEISTUNG & ENERGIE",
                back: "Zurück zum Nexus",
                check: "Verifizieren",
                next: "Weiter",
                correct: "Leistung Bestätigt",
                incorrect: "Leistungsfehler",
                difficulty: {
                        basic: "BASIS",
                        core: "KERN",
                        advanced: "ERWEITERT",
                        elite: "ELITE"
                },
                stages: {
                        power_basics: "LEISTUNGSGRUNDLAGEN",
                        energy_consumption: "ENERGIEVERBRAUCH",
                        efficiency: "WIRKUNGSGRAD"
                },
            placeholders: {
                type_value: "Wert eingeben"
            },
                scenarios: {
                        power_basics: "Basler Haushalts-Elektrizität: Sie helfen einem Basler Energieberatungsunternehmen, den Stromverbrauch für Privatkunden zu berechnen. Die elektrische Leistung (P = U × I) bestimmt, wie viel Energie Geräte pro Sekunde verbrauchen, gemessen in Watt. Ihre Aufgabe ist es, die Leistung verschiedener Haushaltsgeräte zu berechnen. Dies hilft Familien, Stromrechnungen und CO_2-Fußabdruck zu reduzieren. Ein typischer Basler Haushalt verbraucht etwa 4.500 kWh pro Jahr, was bei 0,25 CHF/kWh etwa 1.125 CHF kostet. Genaue Leistungsberechnungen helfen, energieverschwendende Geräte zu identifizieren.",
                        energy_consumption: "IWB Basel Energiemanagement: Sie arbeiten für IWB (Industrielle Werke Basel), Basels Hauptstromversorger. Ihre Aufgabe ist es, Energieverbrauch (E = P × t) und Kosten für Geschäftskunden zu berechnen. Energie wird in Kilowattstunden (kWh) gemessen, und Basels Stromtarif beträgt etwa 0,25 CHF/kWh für Haushalte und 0,20 CHF/kWh für Unternehmen. Sie analysieren ein Novartis-Labor, das Geräte rund um die Uhr betreibt. Genaue Berechnungen gewährleisten korrekte Abrechnung und helfen Kunden, den Energieverbrauch zu optimieren, um Kosten und Umweltauswirkungen zu reduzieren.",
                        efficiency: "Basler Solaranlagen-Installation: Sie sind Ingenieur bei Solarville Basel und installieren Solarpaneele auf Wohndächern. Der Wirkungsgrad (η = P_aus/P_ein × 100%) bestimmt, wie viel Sonnenenergie in Elektrizität umgewandelt wird. Moderne Paneele erreichen 18-22% Wirkungsgrad. Ihre Aufgabe ist es, Leistungsabgabe, Energieverluste und Kosteneinsparungen zu berechnen. Ein typisches Basler Haus mit 20 m^{2} Paneelen (4 kW Kapazität) erzeugt etwa 3.800 kWh/Jahr und spart jährlich etwa 950 CHF. Das Verständnis des Wirkungsgrads hilft Kunden, fundierte Investitionsentscheidungen zu treffen."
                },
                prompts: {
                        power_find_power: "Basler Geräte-Audit: Gegeben U = {voltage} V und I = {current} A, berechnen Sie die elektrische Leistung P = U×I.",
                        power_find_power_three_phase: "Prüfung einer Industrieleitung (3-Phasen-Kontext): Gegeben U = {voltage} V und I = {current} A, schätzen Sie die Leistung P.",
                        power_find_current: "IWB-Diagnose: Gegeben P = {power} W und U = {voltage} V, berechnen Sie den Strom I = P/U.",
                        power_find_voltage: "Inbetriebnahme: Gegeben P = {power} W und I = {current} A, berechnen Sie die Spannung U = P/I.",
                        energy_find_wh: "Laufzeitprotokoll: Leistung P = {power} W über t = {time} h. Berechnen Sie den Energieverbrauch E in Wh.",
                        energy_find_kwh: "Abrechnungsschätzung: Leistung P = {power} W über t = {time} h. Rechnen Sie um und geben Sie E in kWh an.",
                        energy_find_cost: "Geschäftsfall Abrechnung: P = {power} W, Laufzeit {days} h, Tarif {rate} CHF/kWh. Berechnen Sie die Gesamtkosten.",
                        efficiency_find_percent: "Umwandlungstest: Eingangsleistung {input} W, Nutzleistung {output} W. Berechnen Sie den Wirkungsgrad η in %.",
                        efficiency_find_output: "Ausgangsplanung: Eingangsleistung {input} W bei η = {efficiency}%. Berechnen Sie die Nutzleistung.",
                        efficiency_find_input: "Versorgungsplanung: Gewünschte Nutzleistung {output} W bei η = {efficiency}%. Berechnen Sie die benötigte Eingangsleistung.",
                        efficiency_find_loss_io: "Verlustanalyse: Eingangsleistung {input} W und Nutzleistung {output} W. Berechnen Sie P_loss.",
                        efficiency_find_loss_input_eff: "Verlustanalyse: Eingangsleistung {input} W bei η = {efficiency}%. Berechnen Sie P_loss.",
                        efficiency_find_loss_output_eff: "Verlustanalyse: Nutzleistung {output} W bei η = {efficiency}%. Berechnen Sie P_loss.",
                        efficiency_device: "Gerätecheck {device}: Eingangsleistung {input} W und Nutzleistung {output} W. Berechnen Sie den Wirkungsgrad η.",
                        e1: "IWB-Abrechnungsfall Haushalt: Wärmepumpe läuft mit P=3 kW für 500 h bei 0.28 CHF/kWh. Aufgabe: Gesamtkosten berechnen.",
                        e2: "Sommer-Kühlbudget: Klimaanlage läuft mit P=1.5 kW für 100 h bei 0.28 CHF/kWh. Aufgabe: Gesamtkosten berechnen.",
                        e3: "Bäckerei-Energiecheck: Basler Läckerli-Ofen läuft mit P=2 kW für 5 h bei 0.28 CHF/kWh. Aufgabe: Gesamtkosten berechnen.",
                        e4: "E-Auto-Niedertarifprüfung: Laden mit P=11 kW für 50 h bei 0.24 CHF/kWh. Aufgabe: Gesamtkosten berechnen.",
                        e5: "Fasnachtsbeleuchtung-Schätzung: Laternen laufen mit P=0.5 kW für 72 h bei 0.28 CHF/kWh. Aufgabe: Gesamtkosten berechnen."
                },
                reasons: {
                        choose_power_formula: "Wählen Sie zuerst die Leistungsbeziehung zwischen Spannung, Strom und Leistung.",
                        solve_for_missing_electrical_quantity: "Setzen Sie die bekannten elektrischen Größen ein und lösen Sie die fehlende Größe.",
                        convert_power_time_to_energy: "Multiplizieren Sie Leistung und Betriebszeit, um die verbrauchte elektrische Energie zu erhalten.",
                        convert_wh_to_kwh: "Wandeln Sie Wattstunden in Kilowattstunden um, bevor Sie den Endwert angeben.",
                        compute_running_cost: "Multiplizieren Sie den Energieverbrauch in Kilowattstunden mit dem Tarif.",
                        apply_efficiency_ratio: "Verwenden Sie das Verhältnis von Nutzleistung zu Eingangsleistung.",
                        solve_for_missing_efficiency_quantity: "Stellen Sie die Wirkungsgradgleichung nach der gesuchten Größe um.",
                        compute_power_loss: "Bestimmen Sie die Verlustleistung als Differenz zwischen Eingangs- und Nutzleistung."
                },
                solver: {
                        cost_label: "Kosten",
                        energy_remains_label: "Die Energie bleibt bei",
                        required_quantity_label: "Gesuchte Größe"
                }
        },

        // --- Basel Sek 3 Serie (Pädagogische Reihenfolge) ---

        // 1. MESSEN (Grundlage)
        sp3_01: {
            placeholders: {
                ellipsis: "..."
            },
                back: "Zurück zum Nexus",
                title: "SP3.01 // MESSEN & EINHEITEN",
                check: "Verifizieren",
                next: "Weiter",
                correct: "Messung Bestätigt",
                incorrect: "Messfehler",
                monitor_title: "SP3.01_MESSLABOR",
                objective_title: "Messziel",
                difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
                stages: { si_units: "SI-EINHEITEN", conversion: "UMRECHNUNG", precision: "PRÄZISION" },
                tools: { ruler: "Lineal", scale: "Waage", timer: "Stoppuhr" },
                labels: {
                        precision: "Messpräzision",
                        measurement_display: "Messanzeige",
                        input_terminal: "Terminal-Eingabe",
                        base_si_unit: "SI-Basiseinheit",
                        unit: "\\text{Einheit}",
                        sig_figs: "\\text{Sig. Stellen}",
                        percent: "\\text{Prozent}"
                },
                prompts: {
                        si_unit: "Was ist die SI-Einheit für {measurement}?",
                        convert: "Rechnen Sie {value} {from} in {to} um",
                        sigfigs: "Wie viele signifikante Stellen hat {value}?",
                        equivalent_unit: "Welche Einheit ist äquivalent zu {expr}?",
                        round_sigfigs: "Runden Sie {value} auf {sigfigs} signifikante Stellen",
                        calculate_with_sigfigs: "Berechnen Sie {expr} mit korrekten signifikanten Stellen",
                        percent_uncertainty: "Wie groß ist die prozentuale Unsicherheit von {measurement} {unit}?",
                        hint_si: "Die SI-Einheit ist {name}",
                        hint_factor: "Multiplizieren Sie mit {factor}",
                        hint_sigfigs: "Zählen Sie alle Ziffern außer führenden Nullen"
                },
                scenarios: {
                        lab_pharma: "Novartis Qualitätssicherung: In den Basler Pharma-Labors ist die korrekte Massenbeurteilung entscheidend. Ein kleiner Fehler kann eine chemische Reaktion verändern.",
                        basel_watch: "Schweizer Präzision: Die Herstellung von Luxusuhren in Basel erfordert Messungen im Mikrometerbereich. Präzision ist die Seele der Basler Industrie."
                },
                reasons: {
                        identify_measurement_category: "Bestimmen Sie zuerst, welche physikalische Größe oder Einheitengruppe gefragt ist.",
                        state_unit_equivalence: "Ordnen Sie die Größe oder den Ausdruck der passenden SI-Einheit oder abgeleiteten Einheit zu.",
                        identify_conversion_factor: "Wählen Sie zuerst den Umrechnungsfaktor zwischen Ausgangs- und Zieleinheit.",
                        apply_squared_or_cubed_factor: "Quadrieren oder kubieren Sie den Umrechnungsfaktor bei Flächen- oder Volumeneinheiten.",
                        count_significant_figures: "Ignorieren Sie führende Nullen und zählen Sie die Ziffern, die die Genauigkeit festlegen.",
                        round_to_requested_sig_figs: "Bestimmen Sie die geforderte signifikante Stelle und runden Sie mit der nächsten Ziffer.",
                        evaluate_expression_with_rounding_rule: "Berechnen Sie zuerst den Rohwert und wenden Sie dann die geforderte Rundungsregel an.",
                        apply_uncertainty_ratio: "Teilen Sie die absolute Unsicherheit durch den Messwert und wandeln Sie das Ergebnis in Prozent um."
                },
                feedback: { correct: "Messung bestätigt.", incorrect: "Kalibrierungsfehler erkannt." },
                hints: {
                        use_metric_prefixes: "Metrische Präfixe verwenden",
                        simplify_base_units: "Basiseinheiten vereinfachen",
                        multiple_steps_needed: "Mehrere Schritte erforderlich",
                        square_or_cube_factor: "Umrechnungsfaktor quadrieren oder kubieren",
                        convert_num_denom: "Zähler und Nenner getrennt umrechnen",
                        count_sig_figs: "Nicht-Null-Ziffern und eingeschlossene Nullen zählen",
                        divide_uncertainty: "Unsicherheit durch Messwert teilen"
                },
                canvas_labels: {
                        ruler: "LINEAL",
                        ruler_unit: "cm",
                        scale: "DIGITALWAAGE",
                        scale_unit: "kg",
                        stopwatch: "STOPPUHR",
                        stopwatch_unit: "s"
                }
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
                stages: {
                        newton_1: "TRÄGHEIT",
                        newton_2: "F = ma",
                        friction: "REIBUNGSKRÄFTE"
                },
                placeholders: {
                        force_n: "N",
                        acceleration_ms2: "m/s²"
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
                        equilibrium: "Kräfte F_1={f1}N (rechts) und F_2={f2}N (links) wirken auf Objekt. Für Gleichgewicht, F_3?",
                        space: "Im Weltraum (keine Reibung), Objekt (m={m}kg) wird mit F={f}N für {t}s geschoben, dann losgelassen. Kraft nach Loslassen?",
                        inertia: "Objekt (m={m}kg) in Ruhe. Welche Eigenschaft widersetzt sich Bewegungsänderung?",
                        "2d_balance": "Zwei senkrechte Kräfte wirken auf Objekt (m={m}kg). Resultierende Kraft?",
                        vector_add: "Kräfte F_1={f}N (Ost) und F_2={f}N (Nord) wirken auf Objekt. Nettokraft?",
                        slope: "Objekt (m={m}kg) auf Hang (θ={theta}°) mit Reibung μ={mu}. Normalkomponente?",
                        space_friction: "Szenario-Check: Jemand behauptet, ein Objekt (m={m}kg) im Weltraum erfahre Reibung mit μ={mu}. Ist das physikalisch realistisch? Erkläre warum.",
                        complex: "Objekt (m={m}kg) wird auf einer horizontalen Fläche mit F={f}N horizontal gezogen (μk={mu}, g=9,8 m/s²). Berechne die Nettokraft F_net.",

                        // NEWTON 2 - F=ma
                        find_f: "Masse m={m}kg beschleunigt mit a={a}m/s^{2}. Finde Nettokraft F.",
                        find_a: "Nettokraft F={f}N wirkt auf Masse m={m}kg. Finde Beschleunigung a.",
                        gravity: "Objekt m={m}kg auf Planet (g={g}m/s^{2}). Gewichtskraft W=mg?",
                        net_force: "Kraft F={f}N wirkt auf m={m}kg. Reibung f={fr}N wirkt entgegen. Nettobeschleunigung?",
                        friction: "Kraft F={f}N zieht m={m}kg horizontal auf einer flachen Oberfläche (μk={mu}, g=9,8 m/s²). Berechne Beschleunigung a.",
                        pulley: "Flaschenzugsystem: Masse m={m}kg, angewandte Kraft F={f}N, Reibung μ={mu}. Beschleunigung?",
                        variable_mass: "Kraft F={f}N wirkt auf variables Massensystem m={m}kg. Effektive Beschleunigung?",
                        coupled: "Zwei gekoppelte Massen: m_1={m}kg, angewandt F={f}N. Systembeschleunigung?",

                        // REIBUNG
                        static: "Kiste m={m}kg auf horizontalem Boden (μs={mu}, g=9,8 m/s²). Berechne die maximale Haftreibungskraft vor dem Rutschen.",
                        kinetic: "Kiste m={m}kg rutscht auf horizontalem Boden (μk={mu}, g=9,8 m/s²). Berechne die Gleitreibungskraft.",
                        max_static: "Kiste m={m}kg auf Oberfläche (μs={mu}). Maximale Haftreibung vor Rutschen?",
                        kinetic_vs_static: "Kiste m={m}kg: μs={mu}, μk={mu}. Welche Reibung ist größer?",
                        slope_friction: "Kiste m={m}kg rutscht den Hang hinunter (θ={theta}°). Gleitreibungskoeffizient μk={mu}, g=9,8 m/s². Berechne die Gleitreibungskraft.",
                        critical: "Kiste m={m}kg gezogen mit F={f}N mit μ={mu}. Am kritischen Punkt, Nettokraft?",

                        // Interdisziplinäre ELITE-Szenarien mit Vektormathematik
                        rhine_bridge_3d: "Rheinbrücke Strukturanalyse: Kabelsystem trägt Masse m={m}kg mit Spannung F={f}N im Winkel θ={theta}° zur Horizontalen. Reibungskoeffizient μ={mu} am Ankerpunkt. Berechnen Sie die Nettokraftkomponente entlang des Brückendecks mit 3D-Vektorzerlegung (\\\\vec{{F}} = F_x\\\\hat{{i}} + F_y\\\\hat{{j}} + F_z\\\\hat{{k}}).",
                        basel_tram_equilibrium: "Basler Tram BVB Linie 8: Tramwagen m={m}kg auf geneigter Strecke (θ={theta}°) erfährt Motorkraft F={f}N aufwärts entlang der Strecke. Streckenreibung μ={mu}. Für Gleichgewicht am Hang, berechnen Sie die Nettokraft. Verwenden Sie 3D-Vektoranalyse mit \\\\vec{{F}}_{{net}} = \\\\vec{{F}}_{{Motor}} + \\\\vec{{F}}_{{Schwerkraft}} + \\\\vec{{f}}_{{Reibung}}.",
                        roche_tower_structural: "Roche Tower Strukturlast: Gebäudekomponente m={m}kg erfährt Windkraft F={f}N im Winkel θ={theta}° zur Vertikalen. Strukturreibung μ={mu} an Verbindungsstelle. Berechnen Sie Beschleunigung mit Vektorkraftzerlegung F = ma mit \\\\vec{{F}} = (F\\\\cos\\\\theta, F\\\\sin\\\\theta, 0).",
                        basel_port_crane: "Basler Hafen Rheinkran: Frachtcontainer m={m}kg wird von Krankabel mit Spannung F={f}N im Winkel θ={theta}° zur Vertikalen gehoben. Kabelreibung μ={mu} an Rolle. Finden Sie Beschleunigung mit 3D-Vektoranalyse: \\\\vec{{a}} = \\\\vec{{F}}_{{net}}/m wobei \\\\vec{{F}}_{{net}} = \\\\vec{{T}} + \\\\vec{{W}} + \\\\vec{{f}}.",
                        hospital_equipment_3d: "Universitätsspital Basel Ausrüstung: Medizinisches Gerät m={m}kg auf geneigter Rampe (θ={theta}°) mit Reibung μ={mu}. Angewandte Kraft F={f}N parallel zur Rampenoberfläche. Berechnen Sie Reibungskraft mit 3D-Vektorzerlegung: \\\\vec{{f}} = \\\\mu\\\\vec{{N}} wobei \\\\vec{{N}} = mg\\\\cos\\\\theta\\\\hat{{n}}.",

                        // Kompatibilitätsschlüssel
                        n1_const_vel: "Objekt (m={m}kg) bewegt sich mit konstanter Geschwindigkeit {v}m/s. Nettokraft ΣF?",
                        n1_equilibrium: "Kräfte F_1={f1}N (rechts) und F_2={f2}N (links) wirken auf Objekt. Für Gleichgewicht, F_3?",
                        n1_rest: "Objekt (m={m}kg) ist in Ruhe. Kraft F={f}N schiebt rechts. Reibung f={fr}N wirkt links. Beschleunigung?",
                        n1_space: "Im Weltraum (keine Reibung), Objekt (m={m}kg) wird mit F={f}N für {t}s geschoben, dann losgelassen. Kraft nach Loslassen?",
                        n1_inertia: "Welche Eigenschaft widersetzt sich Bewegungsänderung für ein {m}kg Objekt?",
                        n2_find_f: "Masse m={m}kg beschleunigt mit a={a}m/s^{2}. Finde Nettokraft F.",
                        n2_find_a: "Nettokraft F={f}N wirkt auf Masse m={m}kg. Finde Beschleunigung a.",
                        n2_find_m: "Nettokraft F={f}N verursacht Beschleunigung a={a}m/s^{2}. Finde Masse m.",
                        n2_complex: "Kraft F={f}N zieht Masse m={m}kg gegen Reibung f={fr}N. Finde Beschleunigung.",
                        n2_gravity: "Objekt m={m}kg fällt auf Planet (g={g}m/s^{2}). Gewichtskraft Fg?",
                        fr_static: "Kiste m={m}kg auf horizontalem Boden (μs={mu}, g=9,8 m/s²). Berechne die maximale Haftreibungskraft vor dem Rutschen.",
                        fr_kinetic: "Kiste m={m}kg rutscht auf horizontalem Boden (μk={mu}, g=9,8 m/s²). Berechne die Gleitreibungskraft.",
                        fr_norm: "Kiste m={m}kg gegen Wand gedrückt mit F={f}N. Normalkraft?",
                        fr_slide: "Kiste m={m}kg rutscht auf ebener Fläche. Reibung f={f}N. Koeffizient μk?",
                        fr_bank: "Auto fährt auf geneigter Straße (θ={theta}°). Benötigte Reibung?"
                },
                hints: {
                        // NEWTON 1
                        rest: "In Ruhe bedeutet v=0, also ΣF=0 (Newtons Erstes Gesetz)",
                        const_v: "Konstante Geschwindigkeit bedeutet a=0, also ΣF=0",
                        equilibrium: "Für Gleichgewicht müssen alle Kräfte ausgeglichen sein: F_1 + F_3 = F_2",
                        space: "Nach Loslassen wirkt keine Kraft (F=0 im Weltraum)",
                        inertia: "Trägheit ist die Eigenschaft, die Bewegungsänderungen widersetzt",
                        "2d_balance": "Verwenden Sie Pythagoras für senkrechte Kräfte",
                        vector_add: "Verwenden Sie Vektoraddition: |F_net| = √(F_1^{2} + F_2^{2})",
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
                        critical: "Am kritischen Punkt, F_angewandt = f_max",

                        // Interdisziplinäre ELITE-Hinweise
                        rhine_bridge_3d: "Zerlegen Sie Spannung in Komponenten: F_x = F cos θ, F_y = F sin θ. Berücksichtigen Sie Reibungskraft f = μN. Nettokraft: F_net = F_x - f - mg sin θ (entlang Deck).",
                        basel_tram_equilibrium: "Für Gleichgewicht am Hang: ΣF = 0. Zerlegen Sie Kräfte in parallele und senkrechte Komponenten. F_Motor muss mg sin θ + f ausgleichen, wobei f = μN = μ(mg cos θ).",
                        roche_tower_structural: "Verwenden Sie F = ma mit Vektorzerlegung. F_net = F - f wobei f = μN. Zerlegen Sie Windkraft: F_x = F sin θ, F_y = F cos θ. Dann a = F_net/m.",
                        basel_port_crane: "Vektorsumme: F_net = T - W - f. Zerlegen Sie Spannung im Winkel θ: T_y = T cos θ (vertikal), T_x = T sin θ (horizontal). Reibung f = μT. Beschleunigung a = F_net/m.",
                        hospital_equipment_3d: "Auf geneigter Ebene: N = mg cos θ (Normalkraft senkrecht zur Oberfläche). Reibungskraft f = μN = μ(mg cos θ) wirkt parallel zur Oberfläche, entgegen der Bewegung."
                },
                reasons: {
                        apply_equilibrium_condition: "Bei Situationen des ersten Newtonschen Gesetzes muss die Nettokraft null sein, wenn sich die Bewegung nicht ändert.",
                        resolve_perpendicular_forces: "Fassen Sie senkrechte Kraftkomponenten mit Vektoraddition zusammen.",
                        apply_newtons_second_law: "Verwenden Sie das zweite Newtonsche Gesetz, um Nettokraft, Masse und Beschleunigung zu verknüpfen.",
                        subtract_resistive_force: "Ziehen Sie Reibung oder andere Widerstandskräfte von der antreibenden Kraft ab, um die Nettokraft zu erhalten.",
                        compute_normal_force: "Bestimmen Sie zuerst die Normalkraft, bevor Sie Reibung oder Komponenten berechnen.",
                        apply_friction_law: "Verwenden Sie das Reibungsgesetz f = μN, sobald die Normalkraft bekannt ist."
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
                stages: { potential: "POTENTIELLE ENERGIE", kinetic: "KINETISCHE ENERGIE", work: "LEISTUNG" },
                monitor: {
                        title: "BASELER ENERGIEAUDIT",
                        hub_label: "IWB",
                        sources: {
                                solar: "SOLAR",
                                hydro: "WASSERKRAFT",
                                grid: "NETZ"
                        },
                        meta: {
                                efficiency: "Wirkungsgrad",
                                grid_load: "Netzlast"
                        }
                },
                placeholders: {
                        joules: "Joule",
                        value: "Wert",
                        j_or_w: "J oder W"
                },
                scenarios: {
                        rhein_hydro: "Rhinstromkraftwerk: Das Wasser des Rheins im Basler Kraftwerk wandelt potentielle Energie in sauberen Strom für die Stadt um.",
                        tram_braking: "BVB Tram Rekuperation: Die Basler Trams nutzen kinetische Energie beim Bremsen, um Strom ins Netz zurückzuspeisen."
                },
                prompts: {
                        // POTENTIELLE ENERGIE
                        basic_ep: "Objekt m={m}kg in Höhe h={h}m. Berechne potentielle Energie Ep (g={g}m/s^{2}).",
                        rhine_hydro: "Rheinwasser m={m}kg fließt von Höhe h={h}m. Potentielle Energie Ep?",
                        total_energy: "Objekt m={m}kg in h={h}m mit Geschwindigkeit v={v}m/s. Gesamtmechanische Energie?",
                        conservation: "Objekt m={m}kg fällt von h={h}m, erreicht v={v}m/s (Luftwiderstand vernachlässigt, g=9,8 m/s²). Wie groß ist die Gesamtmechanikenergie (Ep+Ek) an jedem Punkt?",

                        // KINETISCHE ENERGIE
                        basic_ek: "Objekt m={m}kg bewegt sich mit v={v}m/s. Berechne kinetische Energie Ek.",
                        tram_braking: "Basler Tram m={m}kg bremst von v={v}m/s. Zurückgewonnene kinetische Energie?",
                        velocity_at_bottom: "Objekt m={m}kg fällt von h={h}m mit Anfangsgeschwindigkeit v={v}m/s. Luftwiderstand vernachlässigt (g=9,8 m/s²): Endgeschwindigkeit unten mit Energieerhaltung bestimmen.",
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
                        rhine_hydro: "Potentielle Energie Ep = mgh, wobei g=9.8m/s^{2}",
                        total_energy: "Gesamtenergie E = Ep + Ek = mgh + ½mv^{2}",
                        conservation: "Energieerhaltung: E_gesamt = Ep + Ek = konstant",

                        // KINETISCHE ENERGIE
                        basic_ek: "Verwende Ek = ½mv^{2}",
                        tram_braking: "Kinetische Energie Ek = ½mv^{2}",
                        velocity_at_bottom: "Verwende Energieerhaltung: mgh + ½mv₀^{2} = ½mv^{2}",
                        work_energy: "Arbeit-Energie-Satz: W = ΔEk, also Ek_end = Ek_anfang + W",

                        // ARBEIT & LEISTUNG
                        basic_work: "Arbeit W = Fs (Kraft × Weg)",
                        basic_power: "Leistung P = W/t = Fs/t",
                        power_lifting: "P = W/t = mgh/t",
                        rhine_power_station: "Leistung P = mgh/t"
                },
                reasons: {
                        apply_gravitational_potential_formula: "Verwenden Sie die Formel der potenziellen Energie E_p = mgh.",
                        add_mechanical_energy_terms: "Addieren Sie potenzielle und kinetische Energie zur gesamten mechanischen Energie.",
                        apply_kinetic_energy_formula: "Verwenden Sie die Formel der kinetischen Energie E_k = 1/2 mv^2.",
                        apply_energy_conservation: "Wenden Sie die Erhaltung der mechanischen Energie zwischen Anfangs- und Endzustand an.",
                        apply_work_formula: "Berechnen Sie die Arbeit als Kraft mal Weg.",
                        divide_work_by_time_for_power: "Teilen Sie die verrichtete Arbeit durch die benötigte Zeit, um die Leistung zu erhalten."
                }
        },

        // 4. FLUIDE (Anwendung Mechanik)
        sp3_04: {
                next: "Nächste Sequenz",
                check: "Verifizieren",
                correct: "Bestätigt",
                incorrect: "Abweichung",
                monitor_title: "SP3.04_FLUID_MONITOR",
                objective_title: "Aktives Missionsziel",
                stages: { pressure: "DRUCK", buoyancy: "AUFTRIEB", hydraulics: "HYDRAULIK" },
            placeholders: {
                yes: "yes",
                            v_98000: "98000",
                v_50000: "50000",
                v_50: "50",
                v_400: "400",
                v_20000: "20000",
                v_248000: "248000",
                v_156800: "156800",
                v_1009400: "1009400",
                v_450800: "450800",
                v_10000: "10000",
                v_0_dot_735: "0.735",
                v_1000: "1000",
                v_2119800: "2119800",
                v_113_dot_1: "113.1",
                v_100: "100",
                v_168880: "168880",
                v_40000: "40000",
                v_10_dot_09: "10.09",
                v_980: "980",
                v_490: "490",
                v_2_dot_35: "2.35",
                v_98: "98",
                v_4900: "4900",
                minus_520: "-520",
                v_0_dot_9: "0.9",
                v_500: "500",
                v_2940: "2940",
                v_0_dot_00005: "0.00005",
                v_15: "15",
                v_179_dot_34: "179.34",
                v_100000: "100000",
                v_882: "882",
                v_0_dot_126: "0.126",
                v_0_dot_52: "0.52",
                v_6667: "6667",
                v_2000: "2000",
                v_3000: "3000",
                v_0_dot_5: "0.5",
                v_0_dot_1: "0.1",
                v_1800: "1800",
                v_7_dot_5: "7.5",
                v_5000: "5000",
                v_1900: "1900",
                v_300: "300"
},
                prompts: {
                        pressure_depth: "Ein Schwimmer taucht auf {depth} m im Rhein. Berechnen Sie den Gesamtdruck.",
                        buoyant_force: "Ein Objekt mit {volume} m^{3} ist im Rhein untergetaucht. Berechnen Sie den Auftrieb.",
                        hint_pressure: "P = P₀ + ρgh",
                        hint_archimedes: "F_a = ρ_wasser × V × g",
                        buoyancy: "Auftrieb",

                        buoyancy_basic_1: "\\text{Ein Körper mit Volumen } V = 0{,}1 \\text{ m}^{3} \\text{ ist vollständig in Wasser getaucht } (\\rho = 1000 \\text{ kg/m}^{3},\\; g = 9{,}8 \\text{ m/s}^{2}). \\text{ Berechnen Sie die Auftriebskraft } F_b.",
                        buoyancy_basic_2: "\\text{Ein Festkörper mit Volumen } V = 0{,}05 \\text{ m}^{3} \\text{ ist vollständig in Wasser eingetaucht } (\\rho = 1000,\\; g = 9{,}8). \\text{ Bestimmen Sie die Auftriebskraft } F_b.",
                        buoyancy_basic_3: "\\text{Ein Wetterballon mit Volumen } V = 0{,}2 \\text{ m}^{3} \\text{ schwimmt in Luft } (\\rho_{Luft} = 1{,}2 \\text{ kg/m}^{3},\\; g = 9{,}8). \\text{ Berechnen Sie die Auftriebskraft.}",
                        buoyancy_basic_4: "\\text{Ein Stein mit Volumen } V = 0{,}01 \\text{ m}^{3} \\text{ liegt vollständig unter Wasser } (\\rho = 1000,\\; g = 9{,}8). \\text{ Berechnen Sie die Auftriebskraft } F_b.",
                        buoyancy_basic_5: "\\text{Ein Schiff verdrängt } V = 0{,}5 \\text{ m}^{3} \\text{ Rheinwasser } (\\rho = 1000 \\text{ kg/m}^{3},\\; g = 9{,}8). \\text{ Wie gross ist die Auftriebskraft?}",

                        buoyancy_core_1: "\\text{Ein Holzklotz hat die Masse } m = 10 \\text{ kg} \\text{ und das Volumen } V = 0{,}02 \\text{ m}^{3}. \\text{ Berechnen Sie die Dichte und entscheiden Sie: Schwimmt er in Wasser?}",
                        buoyancy_core_2: "\\text{Ein Objekt wiegt } W = 1500 \\text{ N} \\text{ und hat Volumen } V = 0{,}1 \\text{ m}^{3} \\text{ (vollständig in Wasser). Berechnen Sie die Nettokraft } F_{net} = F_b - W.",
                        buoyancy_core_3: "\\text{Eis hat die Dichte } \\rho_{Eis} = 900 \\text{ kg/m}^{3} \\text{ und schwimmt in Süsswasser } (\\rho_w = 1000). \\text{ Welcher Bruchteil } f \\text{ ist eingetaucht?}",
                        buoyancy_core_4: "\\text{Aluminiumblock: } m = 81 \\text{ kg},\\; V = 0{,}03 \\text{ m}^{3} \\text{ hängt an einem Faden in Wasser. Berechnen Sie das scheinbare Gewicht } W_{app} = W - F_b.",
                        buoyancy_core_5: "\\text{Heissluftballon: Volumen } V = 1000 \\text{ m}^{3},\\; \\rho_{Luft} = 1{,}2 \\text{ kg/m}^{3},\\; \\rho_{heiss} = 0{,}9. \\text{ Berechnen Sie die Netto-Auftriebskraft } F_{lift}.",

                        buoyancy_advanced_1: "\\text{Ein Aräometer der Masse } m = 50 \\text{ g} \\text{ schwimmt im Gleichgewicht in Wasser } (\\rho_w = 1000). \\text{ Im Gleichgewicht gilt } W = F_b. \\text{ Bestimmen Sie das eingetauchte Volumen } V_{sub}.",
                        buoyancy_advanced_2: "\\text{Ein Frachtschiff mit Gesamtmasse } m = 50{,}000 \\text{ kg} \\text{ schwimmt in Süsswasser } (\\rho = 1000 \\text{ kg/m}^{3}). \\text{ Berechnen Sie das verdrängte Wasservolumen.}",
                        buoyancy_advanced_3: "\\text{Korkblock: } \\rho_{Kork} = 250 \\text{ kg/m}^{3},\\; V = 0{,}02 \\text{ m}^{3} \\text{ schwimmt in Wasser. Welche maximale Zusatzmasse } m_{Last} \\text{ kann er tragen, bevor er sinkt?}",
                        buoyancy_advanced_4: "\\text{Goldblock: } m = 19{,}3 \\text{ kg},\\; V = 0{,}001 \\text{ m}^{3} \\text{ hängt vollständig eingetaucht an einem Faden. Berechnen Sie die Fadenspannung } T = W - F_b.",
                        buoyancy_advanced_5: "\\text{U-Boot: Hüllenvolumen } V = 500 \\text{ m}^{3},\\text{ Trockenmasse } m_{U} = 400{,}000 \\text{ kg}. \\text{ Wie viel Ballastwasser } m_{Ballast} \\text{ muss eingelassen werden, um Schwebezustand zu erreichen?}",

                        buoyancy_elite_1: "\\text{Körper mit Gesamtvolumen } V = 0{,}1 \\text{ m}^{3}: \\text{ halb in Wasser } (\\rho_w = 1000), \\text{ halb in Öl } (\\rho_o = 800) \\text{ eingetaucht. Berechnen Sie die gesamte Auftriebskraft } F_b.",
                        buoyancy_elite_2: "\\text{Hohlkugel: Aussenradius } R = 0{,}2 \\text{ m},\\; \\text{Innenradius } r = 0{,}15 \\text{ m},\\; m = 10 \\text{ kg}. \\text{ Berechnen Sie die mittlere Dichte. Schwimmt sie in Wasser?}",
                        buoyancy_elite_3: "\\text{Eisberg } (\\rho_{Eis} = 900 \\text{ kg/m}^{3}) \\text{ schwimmt in Meerwasser } (\\rho_{See} = 1030). \\text{ Berechnen Sie den Anteil } f_{oben} = 1 - \\rho_{Eis}/\\rho_{See} \\text{ über der Wasseroberfläche.}",
                        buoyancy_elite_4: "\\text{Heliumballon: } V = 1 \\text{ m}^{3},\\; \\rho_{He} = 0{,}18,\\; \\rho_{Luft} = 1{,}2 \\text{ kg/m}^{3},\\text{ Hüllenmasse } = 0{,}5 \\text{ kg}. \\text{ Bestimmen Sie die maximale Nutzlast } m_{Nutzlast}.",
                        buoyancy_elite_5: "\\text{Kronenproblem: Gewicht in Luft } W_{Luft} = 10 \\text{ N},\\text{ Gewicht in Wasser } W_{Wasser} = 8{,}5 \\text{ N}. \\text{ Bestimmen Sie mit dem archimedischen Prinzip die Dichte } \\rho \\text{ der Krone.}",

                        hydraulics: "Hydraulik",

                        hydraulics_basic_1: "\\text{Eine Kraft } F = 100 \\text{ N} \\text{ wirkt auf einen Kolben der Fläche } A = 0{,}01 \\text{ m}^{2}. \\text{ Berechnen Sie den Fluiddruck } P = F/A.",
                        hydraulics_basic_2: "\\text{Hydraulikkolben mit Fläche } A = 0{,}02 \\text{ m}^{2}, \\text{ Kraft } F = 200 \\text{ N}. \\text{ Welchen Druck } P \\text{ erzeugt er im Fluid?}",
                        hydraulics_basic_3: "\\text{Kolben mit Fläche } A = 0{,}05 \\text{ m}^{2} \\text{ wird mit Kraft } F = 500 \\text{ N} \\text{ gedrückt. Welchen Fluiddruck erzeugt er?}",
                        hydraulics_basic_4: "\\text{Hydraulikzylinder: Kolbenfläche } A = 0{,}1 \\text{ m}^{2},\\text{ aufgebrachte Kraft } F = 1000 \\text{ N}. \\text{ Berechnen Sie den Fluiddruck.}",
                        hydraulics_basic_5: "\\text{Kleiner Eingangskolben: } A = 0{,}005 \\text{ m}^{2},\\; F = 50 \\text{ N}. \\text{ Welcher Druck } P \\text{ wird durch das Hydraulikfluid übertragen?}",

                        hydraulics_core_1: "\\text{Hydraulikheber: } A_1 = 0{,}01 \\text{ m}^{2},\\; A_2 = 0{,}1 \\text{ m}^{2},\\; F_1 = 100 \\text{ N}. \\text{ Berechnen Sie die Ausgangskraft } F_2 \\text{ (Pascalsches Gesetz).}",
                        hydraulics_core_2: "\\text{Hydraulikbremse: } A_1 = 0{,}005 \\text{ m}^{2},\\; A_2 = 0{,}05 \\text{ m}^{2},\\; F_1 = 50 \\text{ N}. \\text{ Bestimmen Sie die Bremskraft } F_2 \\text{ am Radbremszylinder.}",
                        hydraulics_core_3: "\\text{Hydraulikwagenheber: } A_1 = 0{,}02 \\text{ m}^{2},\\; A_2 = 0{,}2 \\text{ m}^{2},\\; F_1 = 200 \\text{ N}. \\text{ Berechnen Sie die Hubkraft } F_2.",
                        hydraulics_core_4: "\\text{Hydraulikpresse: } A_1 = 0{,}001 \\text{ m}^{2},\\; A_2 = 0{,}1 \\text{ m}^{2},\\; F_1 = 10 \\text{ N}. \\text{ Berechnen Sie die Ausgangskraft } F_2.",
                        hydraulics_core_5: "\\text{Hydrauliksystem: } A_1 = 0{,}03 \\text{ m}^{2},\\; A_2 = 0{,}3 \\text{ m}^{2},\\; F_1 = 300 \\text{ N}. \\text{ Bestimmen Sie } F_2.",

                        hydraulics_advanced_1: "\\text{Hydraulikheber-Auslegung: } A_1 = 0{,}01 \\text{ m}^{2},\\; F_1 = 100 \\text{ N},\\text{ gewünschte Ausgangskraft } F_2 = 5000 \\text{ N}. \\text{ Berechnen Sie die erforderliche Kolbenfläche } A_2.",
                        hydraulics_advanced_2: "\\text{Volumenkonstanz: } A_1 = 0{,}002 \\text{ m}^{2},\\; A_2 = 0{,}2 \\text{ m}^{2}. \\text{ Kolben 1 bewegt sich } d_1 = 10 \\text{ cm}. \\text{ Wie weit bewegt sich Kolben 2?}",
                        hydraulics_advanced_3: "\\text{Hydraulikpresse mit 90\\% Wirkungsgrad: } A_1 = 0{,}01 \\text{ m}^{2},\\; A_2 = 0{,}1 \\text{ m}^{2},\\; F_1 = 200 \\text{ N}. \\text{ Bestimmen Sie die tatsächliche Ausgangskraft } F_2.",
                        hydraulics_advanced_4: "\\text{Hydraulikwagenheber: } A_1 = 0{,}005 \\text{ m}^{2},\\; A_2 = 0{,}5 \\text{ m}^{2},\\; F_1 = 100 \\text{ N}. \\text{ Berechnen Sie den mechanischen Vorteil } \\text{MA} = A_2/A_1.",
                        hydraulics_advanced_5: "\\text{Hydraulikbremse: } A_1 = 0{,}01 \\text{ m}^{2},\\; F_1 = 150 \\text{ N},\\text{ Kolben 1 bewegt sich } d_1 = 5 \\text{ cm}. \\text{ Berechnen Sie die verrichtete Arbeit } W = F_1 \\cdot d_1.",

                        hydraulics_elite_1: "\\text{Dreistufiges Hydrauliksystem: } A_1 = 0{,}001,\\; A_2 = 0{,}01,\\; A_3 = 0{,}1 \\text{ m}^{2},\\; F_1 = 50 \\text{ N}. \\text{ Bestimmen Sie die Ausgangskraft } F_3 \\text{ der dritten Stufe.}",
                        hydraulics_elite_2: "\\text{Hydrauliksystem mit Reibung: } A_1 = 0{,}01,\\; A_2 = 0{,}1 \\text{ m}^{2},\\; F_1 = 200 \\text{ N},\\text{ Reibungsverlust } = 100 \\text{ N}. \\text{ Berechnen Sie die Netto-Ausgangskraft } F_2.",
                        hydraulics_elite_3: "\\text{Hydraulikspeicher bei Druck } P = 2 \\times 10^{6} \\text{ Pa}. \\text{ Ausgangskolbenfläche } A_2 = 0{,}05 \\text{ m}^{2}. \\text{ Berechnen Sie die Ausgangskraft.}",
                        hydraulics_elite_4: "\\text{Hydraulikdämpfer: aufgebrachte Kraft } F_{auf} = 500 \\text{ N},\\text{ Viskositätswiderstand } F_{Wid} = 200 \\text{ N}. \\text{ Berechnen Sie die resultierende Nettokraft } F_{net}.",
                        hydraulics_elite_5: "\\text{Serielles Hydrauliksystem: } A_1 = 0{,}002,\\; A_2 = 0{,}02,\\; A_3 = 0{,}2 \\text{ m}^{2}. \\text{ Berechnen Sie den Gesamtmechanischen Vorteil } \\text{MA}_{ges} = A_3/A_1.",

                        pressure: "Druck",

                        pressure_basic_1: "\\text{Ein Taucher sinkt auf } h = 10 \\text{ m} \\text{ Tiefe in Süsswasser } (\\rho = 1000 \\text{ kg/m}^{3},\\; g = 9{,}8 \\text{ m/s}^{2}). \\text{ Berechnen Sie den Überdruck } P = \\rho g h.",
                        pressure_basic_2: "\\text{Ein Wassertank ist bis zur Tiefe } h = 5 \\text{ m} \\text{ gefüllt } (\\rho = 1000 \\text{ kg/m}^{3},\\; g = 10 \\text{ m/s}^{2}). \\text{ Welcher Druck herrscht am Boden?}",
                        pressure_basic_3: "\\text{Eine Kraft } F = 100 \\text{ N} \\text{ wirkt gleichmässig auf eine Fläche } A = 2 \\text{ m}^{2}. \\text{ Berechnen Sie den entstehenden Druck } P = F/A.",
                        pressure_basic_4: "\\text{Ein Hydraulikkolben überträgt Kraft } F = 200 \\text{ N} \\text{ auf eine Fläche } A = 0{,}5 \\text{ m}^{2}. \\text{ Welcher Druck wird übertragen?}",
                        pressure_basic_5: "\\text{Ein Schwimmer befindet sich } h = 2 \\text{ m} \\text{ unter der Wasseroberfläche } (\\rho = 1000 \\text{ kg/m}^{3},\\; g = 10 \\text{ m/s}^{2}). \\text{ Berechnen Sie den Überdruck.}",

                        pressure_core_1: "\\text{Ein U-Boot befindet sich in } h = 15 \\text{ m} \\text{ Tiefe } (\\rho = 1000 \\text{ kg/m}^{3}). \\text{ Gegeben } P_{atm} = 101{\\,}000 \\text{ Pa}, \\text{ berechnen Sie den absoluten Gesamtdruck.}",
                        pressure_core_2: "\\text{Hydraulikpresse: Kraft } F = 500 \\text{ N} \\text{ wirkt auf Kolbenfläche } A = 0{,}01 \\text{ m}^{2}. \\text{ Welcher Druck entsteht im Fluid?}",
                        pressure_core_3: "\\text{Öltank mit Tiefe } h = 20 \\text{ m} \\;(\\rho_{Öl} = 800 \\text{ kg/m}^{3},\\; g = 9{,}8). \\text{ Berechnen Sie den Überdruck am Tankboden.}",
                        pressure_core_4: "\\text{Kolben mit Fläche } A = 0{,}02 \\text{ m}^{2} \\text{ überträgt Kraft } F = 1000 \\text{ N}. \\text{ Welcher Druck wird durch den Hydraulikkreis geliefert?}",
                        pressure_core_5: "\\text{Meerestiefe } h = 100 \\text{ m} \\text{ in Meerwasser } (\\rho = 1030 \\text{ kg/m}^{3},\\; g = 9{,}8). \\text{ Berechnen Sie den Überdruck in dieser Tiefe.}",

                        pressure_advanced_1: "\\text{Zweischichtiger Flüssigkeitsbehälter: 30 m Wasser } (\\rho_w = 1000) \\text{ über 20 m Öl } (\\rho_o = 800). \\text{ Berechnen Sie den Gesamtdruck am Behälterboden.}",
                        pressure_advanced_2: "\\text{Hydraulikheber: } A_1 = 0{,}001 \\text{ m}^{2},\\; A_2 = 0{,}1 \\text{ m}^{2},\\; F_1 = 100 \\text{ N}. \\text{ Bestimmen Sie die Ausgangskraft } F_2 \\text{ (Pascalsches Gesetz).}",
                        pressure_advanced_3: "\\text{U-Rohr-Manometer: Wassersäule } h_w = 10 \\text{ m} \\text{ links, Quecksilber } (\\rho_{Hg} = 13{,}600 \\text{ kg/m}^{3}) \\text{ rechts. Berechnen Sie die Quecksilberhöhe } h_{Hg} \\text{ im Gleichgewicht.}",
                        pressure_advanced_4: "\\text{Hydraulikbremse: Hauptzylinder } A_1 = 0{,}01 \\text{ m}^{2},\\text{ Radzylinder } A_2 = 0{,}05 \\text{ m}^{2},\\text{ Pedalkraft } F_1 = 200 \\text{ N}. \\text{ Berechnen Sie die Bremskraft } F_2.",
                        pressure_advanced_5: "\\text{Tiefsee-Tauchboot bei } h = 200 \\text{ m} \\;(\\rho = 1030 \\text{ kg/m}^{3},\\; P_{atm} = 101{,}000 \\text{ Pa}). \\text{ Berechnen Sie den absoluten Gesamtdruck.}",

                        pressure_elite_1: "\\text{Marianengraben, Tiefe } h = 11{,}000 \\text{ m} \\;(\\rho = 1050 \\text{ kg/m}^{3},\\; P_{atm} = 101{,}000 \\text{ Pa}). \\text{ Berechnen Sie den Gesamtdruck in MPa.}",
                        pressure_elite_2: "\\text{Hydraulikverstärker: Eingangskolben } A_1 = 0{,}0001 \\text{ m}^{2},\\text{ Ausgangskolben } A_2 = 0{,}01 \\text{ m}^{2}. \\text{ Berechnen Sie den mechanischen Vorteil } \\text{MA} = A_2/A_1.",
                        pressure_elite_3: "\\text{Dreischichtige Flüssigkeitssäule: 2 m Wasser } (\\rho = 1000), \\text{ 2 m Öl } (\\rho = 800), \\text{ 1 m Quecksilber } (\\rho = 13{,}600). \\text{ Gesamtdruck an der Basis?}",
                        pressure_elite_4: "\\text{Hydraulikwagenheber, Wirkungsgrad 80\\%: } F_1 = 500 \\text{ N},\\; A_1 = 0{,}002 \\text{ m}^{2},\\; A_2 = 0{,}2 \\text{ m}^{2}. \\text{ Berechnen Sie die tatsächliche Ausgangskraft } F_2.",
                        pressure_elite_5: "\\text{U-Boot-Luke mit Fläche } A = 1 \\text{ m}^{2} \\text{ in Tiefe } h = 1000 \\text{ m} \\;(\\rho = 1030). \\text{ Berechnen Sie die resultierende Wasserkraft auf die Luke in MN.}",

                        energy_audit: "Energieaudit",
                        energy_audit_heatpump: "Energieaudit - Wärmepumpe",
                        energy_audit_solar: "Energieaudit - Solaranlage",
                        iwb_grid_load: "Netzlast",
                        angle: "Winkel",
                        composition: "Komposition",
                        compound_machine: "Zusammengesetzte Maschine",
                        drift: "Drift",
                        ferry_speed: "Fährgeschwindigkeit",
                        gp2_04: "GP2 Aufgabe 04",
                        navigation: "Navigation",
                        next_mission: "Nächste Mission",
                        resultant_speed: "Resultierende Geschwindigkeit",
                        terminal_input: "Eingabe"
                },
                scenarios: {
                        rhine_swimming: "Schwimmen im Rhein: Taucher erkunden das Rheinbett bei der Mittleren Brücke. Der Wasserdruck steigt mit der Tiefe.",
                        rhine_boat: "Rheinschifffahrt: Das Verständnis von Auftrieb ist entscheidend für die Schiffe zwischen Basel und Rotterdam."
                },
                feedback: { correct: "Fluidmechanik gemeistert!", incorrect: "Überprüfen Sie das archimedische Prinzip." },

                hints: {
                        archimedes_principle: "\\text{Archimedisches Prinzip}",
                        compare_densities: "\\text{Dichten vergleichen}",
                        at_equilibrium: "\\text{Im Gleichgewicht: } W = F_b",
                        weight_equals_buoyancy: "\\text{Gewicht = Auftriebskraft}",
                        pressure_force_per_area: "\\text{Druck ist Kraft pro Fläche}"
                },
                        labels: {
                        float_q: "\\text{Schwimmt?}"
                },
                        targets: {
                        answer: "\\text{Antwort}"
                },
                        corrects: {
                        yes_density_less_water: "\\text{Ja (Dichte < Wasser)}",
                        yes_rho_avg_less_1000: "\\text{Ja (} \\rho_{avg} < 1000 \\text{)}"
                }
        }
,

        // 5. EINFACHE MASCHINEN (Angewandte Mechanik)
        sp3_05: {
            placeholders: {
                ellipsis: "..."
            },
                back: "Zurück zum Nexus",
                title: "SP3.05 // EINFACHE MASCHINEN",
                difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
                next: "Nächste Sequenz",
                check: "Verifizieren",
                correct: "Bestätigt",
                incorrect: "Abweichung",
                monitor_title: "SP3.05_MECHANIK_MONITOR",
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
                        lever_class: "Hebelklasse {class}: Last {load} N, Kraftarm {effortArm} m, Lastarm {loadArm} m. Kraftaufwand?",
                        lever_efficiency: "Hebel mit {efficiency}% Wirkungsgrad: Last {load} N, MA = {ma}. Tatsächlicher Kraftaufwand?",
                        lever_two_stage: "Zweistufiges Hebelsystem: jede Stufe MA = {ma}, Last {load} N. Eingabekraft?",
                        pulley: "Flaschenzug mit {strands} tragenden Seilen hebt {load} N. Welche Kraft ist nötig?",
                        pulley_fixed_movable: "Flaschenzug: {movable} beweglich, {fixed} fest. Last {load} N. Kraftaufwand?",
                        pulley_efficiency: "Flaschenzug: {strands} Stränge, {efficiency}% Wirkungsgrad, Last {load} N. Tatsächlicher Kraftaufwand?",
                        pulley_block_tackle: "Flaschenzugblock: {blocks} Blöcke, {strands} Stränge, Last {load} N. Kraftaufwand?",
                        inclined_plane: "Reibungsfreie schiefe Ebene hebt {load} N auf Höhe {height} m über Länge {length} m. Welche Kraft (parallel zur Ebene) hält die Last bei gleichmäßiger Bewegung?",
                        inclined_angle: "Reibungsfreie schiefe Ebene: Winkel {angle}°, Last {load} N. Welche Kraft parallel zur Ebene (aufwärts gerichtet) hält das Objekt im Gleichgewicht?",
                        inclined_friction: "Schiefe Ebene: h={height} m, l={length} m, Last {load} N, Reibung μ={friction}. Kraftaufwand?",
                        screw_jack: "Spindelheber: Steigung {pitch} cm, Hebelradius {radius} cm, Last {load} N. Kraftaufwand?",
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
                },
                hints: {
                        for_friction_losses: "Reibungsverluste berücksichtigen",
                        pulleys_double_ma: "Bewegliche Rollen verdoppeln die Übersetzung",
                        for_friction: "Reibung berücksichtigen",
                        all_supporting_strands: "Alle tragenden Stränge zählen",
                        friction_component: "Reibungskomponente hinzufügen",
                        is_inclined_plane_wrapped_around_cylinder: "Schraube ist eine um einen Zylinder gewickelte schiefe Ebene"
                }
        },

        // SP3.07: Navigation & Vektoren (von sp1_05)
        // SP3.07: Navigation & Vektoren - Rheinfähre (60 Fragen: 3 Stufen × 4 Schwierigkeiten × 5 Fragen)
        sp3_07: {
                back: "Zurück zum Hub",
                title: "SP3.07 // NAVIGATION & VEKTOREN",
                difficulty: { basic: "BASIS", core: "KERN", advanced: "ERWEITERT", elite: "ELITE" },
                next: "Nächste Sequenz", check: "Verifizieren", correct: "Bestätigt", incorrect: "Abweichung", monitor_title: "SP3.07_FERRY_MONITOR", stages: { composition: "VEKTORADDITION", drift: "ABDRIFT-ANALYSE", navigation: "PRÄZISIONSNAV" },
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
            placeholders: {
                m_s: "m/s",
                deg: "deg",
                s: "s",
                m: "m",
                j: "J"
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
                        n_e5: "\\text{Fähre Masse 1kg, }3\\text{ m/s bei }110^\\circ\\text{, Fluss }1\\text{ m/s. Kinetische Energie?}"
                },
                hints: {
                        c_b1: "\\text{Addiere Geschwindigkeiten: }2 + 1 = 3",
                        c_b2: "\\text{Entgegengesetzte Richtungen heben sich auf: }1.5 - 1.5 = 0",
                        c_b3: "\\text{Addiere Geschwindigkeiten: }3 + 0.5 = 3.5",
                        c_b4: "\\text{Subtrahiere: }3 - 2 = 1",
                        c_b5: "\\text{Addiere Geschwindigkeiten: }4 + 1 = 5",
                        c_c1: "\\text{Pythagoras: }\\sqrt{4^{2} + 3^2} = 5",
                        c_c2: "\\text{Pythagoras: }\\sqrt{1^{2} + 1^2} = \\sqrt{2} \\approx 1.41",
                        c_c3: "\\text{Pythagoras: }\\sqrt{2^{2} + 2^2} = 2\\sqrt{2} \\approx 2.83",
                        c_c4: "\\text{Pythagoras: }\\sqrt{2^{2} + 1.5^2} = 2.5",
                        c_c5: "\\text{Pythagoras: }\\sqrt{12^{2} + 5^2} = 13",
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
                        n_e1: "v_{net} = \\sqrt{(5\\sin(120^\\circ))^{2} + (5\\cos(120^\\circ) + 2.5)^2} \\approx 4.33\\text{ m/s}",
                        n_e2: "\\text{Berechne Überquerungszeit, dann Rückkehrzeit, summiere beide}",
                        n_e3: "d_{total} = \\sqrt{40^{2} + (3 \\times t)^2} \\text{wobei }t = \\frac{40}{6\\sin(120^\\circ)}",
                        n_e4: "\\theta = \\arctan\\left(\\frac{d_{drift}}{30}\\right) \\text{wobei Abdrift von Flussströmung}",
                        n_e5: "E = \\frac{1}{2} \\times 1 \\times v_{net}^{2}, \\text{finde zuerst }v_{net}"
                },
                results: {
                        valid: "Berechnung gültig",
                        invalid: "Vektor-Abweichung",
                        valid_desc: "Physik bestätigt. Weiter zum nächsten Ziel.",
                        invalid_desc: "Vektorkomponenten neu berechnen.",
                        stability: "Vektor-Stabilität"
                }
        },

        // 6. AKUSTIK (Wellenlehre I)
        sp3_06: {
                back: "Zurück zum Nexus",
                title: "SP3.06 // AKUSTIK",
                difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
                objective_title: "Schallsignatur-Analyse",
                monitor_title: "Akustik-Monitor",
                check: "Verifizieren",
                next: "Nächste Stufe",
                correct: "Richtig",
                incorrect: "Falsch",
                stages: { sound_waves: "SCHALLWELLEN", frequency_pitch: "FREQUENZ & TONHÖHE", loudness_intensity: "LAUTSTÄRKE & INTENSITÄT" },
                visualization: {
                        sound_waves: {
                                title: "Schallwelle",
                                compression: "Verdichtung",
                                rarefaction: "Verdünnung",
                                speed_frequency_wavelength: "Geschwindigkeit = Frequenz × Wellenlänge",
                                medium_speeds: "Luft: 343 m/s | Wasser: 1480 m/s"
                        },
                        frequency_pitch: {
                                title: "Frequenz & Tonhöhe",
                                low_frequency: "Niedrige Frequenz",
                                low_frequency_detail: "220 Hz (tiefe Tonhöhe)",
                                high_frequency: "Hohe Frequenz",
                                high_frequency_detail: "880 Hz (hohe Tonhöhe)",
                                musical_notes: "Musikalische Noten",
                                a4: "A4: 440 Hz",
                                a5: "A5: 880 Hz (Oktave)",
                                human_range: "Mensch: 20-20.000 Hz"
                        },
                        loudness_intensity: {
                                title: "Schallintensität (dB)",
                                threshold_of_hearing: "Hörschwelle",
                                whisper: "Flüstern",
                                conversation: "Gespräch",
                                safety_limit: "Sicherheitsgrenze",
                                rock_concert: "Rockkonzert",
                                jet_engine: "Düsentriebwerk (Schmerzgrenze)",
                                distance_effect: "Entfernungseffekt:",
                                double_distance: "2× Abstand → -6 dB",
                                tenfold_distance: "10× Abstand → -20 dB",
                                inverse_square_law: "(Umgekehrtes Quadratgesetz)"
                        }
                },
                scenarios: {
                        stadtcasino_basel: "Stadtcasino Basel: Einer der besten Konzertsäle Europas, berühmt für seine perfekte Akustik und Schallreflexion.",
                        euroairport_noise: "Flughafen Basel-Mulhouse: Überwachung der Dezibel-Werte zum Schutz der umliegenden Gemeinden."
                },
                hints: {
                        sw_b3: "\\text{Wasser ist dichter als Luft}",
                        sw_b4: "\\text{Schall läuft zur Wand und zurück: } 2 \\times 343 \\div 2 = 343",
                        sw_b5: "\\text{Schall ist eine mechanische Welle}",
                        sw_a1: "\\text{Nähernde Quelle = komprimierte Wellen}",
                        sw_a2: "\\text{Wellen löschen sich aus = destruktiv}",
                        sw_a3: "\\text{Geschwindigkeitsänderung verursacht Ablenkung}",
                        sw_a4: "\\text{Wellen breiten sich um Hindernisse aus}",
                        sw_a5: "\\text{Resonanz = übereinstimmende Frequenzen}",
                        sw_e4: "\\text{Überschall = Schockwelle}",
                        sw_e5: "\\text{Unterschiedliche Dichten = Impedanzunterschied}",
                        fp_b1: "\\text{20 Hz bis 20 kHz}",
                        fp_b2: "\\text{Mehr Schwingungen = höhere Tonhöhe}",
                        fp_b4: "\\text{Ultra = jenseits des menschlichen Gehörs}",
                        fp_b5: "\\text{Infra = unterhalb des menschlichen Gehörs}",
                        fp_c3: "\\text{2. Oberschwingung = 2} \\times \\text{Grundfrequenz}",
                        fp_a2: "\\text{Oberschwingungsmix = Klangfarbe}",
                        fp_a5: "50 \\text{ Hz Unterschied ist unterscheidbar}",
                        fp_e3: "\\text{Resonanzspitzen = Formanten}",
                        fp_e5: "\\text{Lauter Ton verdeckt benachbarte Frequenzen}",
                        li_b2: "\\text{Referenzintensität}",
                        li_b4: "\\text{Umgekehrtes Quadratgesetz: } 2\\times \\text{ Abstand} = -6 \\text{ dB}",
                        li_b5: "85 \\text{ dB ist Sicherheitsschwelle}",
                        li_c1: "10 \\text{ dB Unterschied} = 10\\times \\text{ Intensität}",
                        li_a1: "10\\times \\text{ Abstand} = -20 \\text{ dB}, \\quad 60 - 20 = 40",
                        li_e1: "\\text{Phon = wahrgenommene Lautstärke}",
                        li_e2: "\\text{Sone ist lineare Skala}",
                        li_e3: "\\text{A-bewertete Dezibel}",
                        li_e4: "+3 \\text{ dB verdoppelt Intensität, halbiert sichere Zeit}",
                        li_e5: "\\text{Betont empfindlichsten Bereich des Gehörs}"
                },
                labels: {
                        label_yes_no: "\\text{Ja/Nein}",
                        label_ratio: "\\text{Verhältnis}",
                        label_name: "\\text{Name}",
                        label_tf: "\\text{W/F}",
                        label_hl: "\\text{H/N}",
                        label_type: "\\text{Typ}",
                        label_reason: "\\text{Grund}",
                        label_property: "\\text{Eigenschaft}",
                        label_above_below: "\\text{Über/Unter}",
                        label_just_equal: "\\text{Rein/Gleich}",
                        label_term: "\\text{Begriff}",
                        label_effect: "\\text{Effekt}",
                        label_safe: "\\text{Sicher?}",
                        label_unit: "\\text{Einheit}",
                        label_symbol: "\\text{Symbol}",
                        label_dose: "\\text{Dosis (\\%)}",
                        label_application: "\\text{Anwendung}"
                },
                expressions: {
                        fp_a2: "\\text{Unterschiedlicher Oberton-Inhalt}",
                        fp_a5: "\\Delta f > \\text{kritische Bandbreite}",
                        fp_b1: "\\text{Obere Grenze des menschlichen Gehörs}",
                        fp_b2: "\\text{Frequenz} \\uparrow \\Rightarrow \\text{Tonhöhe} \\uparrow",
                        fp_b3: "\\text{Oktave} \\rightarrow \\text{doppelte Frequenz}",
                        fp_b4: "\\text{Über dem Hörbereich}",
                        fp_b5: "\\text{Unter dem Hörbereich}",
                        fp_e3: "\\text{Vokaltrakt-Resonanzen}",
                        fp_e4: "\\text{GGT der Obertöne}",
                        fp_e5: "\\text{Frequenz-Maskierung}",
                        li_a1: "10\\times \\text{ Abstand} \\Rightarrow -20 \\text{ dB}",
                        li_a2: "2\\times \\text{ Intensität} \\Rightarrow +3 \\text{ dB}",
                        li_a5: "4\\times \\text{ Intensität} \\Rightarrow +6 \\text{ dB}",
                        li_b3: "> 85 \\text{ dB} \\rightarrow \\text{Schädigungsrisiko}",
                        li_c3: "2\\times \\text{ Abstand} \\Rightarrow -6 \\text{ dB}",
                        li_e1: "\\text{Einheit wahrgenommener Lautstärke}",
                        li_e2: "\\text{Lineare Lautstärkeskala}",
                        li_e3: "\\text{Gewichteter Dezibel}",
                        li_e4: "+3 \\text{ dB} \\Rightarrow \\text{halbe Zeit}",
                        li_e5: "\\text{Rausch-Messstandard}",
                        sw_a1: "\\text{Doppler-Effekt: nähern} \\rightarrow \\text{höher}",
                        sw_a2: "\\text{Auslöschung} = \\text{destruktive Interferenz}",
                        sw_a3: "\\text{Brechung an Grenzfläche} = \\text{Refraktion}",
                        sw_a4: "\\text{Beugung um Hindernisse} = \\text{Diffraktion}",
                        sw_a5: "\\text{Resonanz bei Eigenfrequenz}",
                        sw_b3: "\\text{Dichteres Medium} \\rightarrow \\text{schnellerer Schall}",
                        sw_b5: "\\text{Schall braucht ein Medium}",
                        sw_c5: "\\text{Verhältnis} = \\frac{v_{\\text{Stahl}}}{v_{\\text{Luft}}}",
                        sw_e4: "v > v_{\\text{Schall}} \\rightarrow \\text{Schockwelle}",
                        sw_e5: "\\text{Großer Impedanzunterschied} \\rightarrow \\text{starke Reflexion}"
                },
                targets: {
                        answer: "\\text{Antwort}",
                        phenomenon: "\\text{Phänomen}"
                },
                corrects: {
                        correct_true: "\\text{Wahr}",
                        correct_no: "\\text{Nein}",
                        sw_b5: "\\text{Nein (braucht Medium)}",
                        sw_c5: "\\approx 17\\text{ mal}",
                        sw_a1: "\\text{Höher (Doppler-Effekt)}",
                        sw_a2: "\\text{Destruktiv}",
                        sw_a3: "\\text{Refraktion}",
                        sw_a4: "\\text{Diffraktion}",
                        sw_e4: "\\text{Überschallknall}",
                        sw_e5: "\\text{Akustische Impedanzfehlanpassung}",
                        fp_b2: "\\text{Höhere Tonhöhe}",
                        fp_c4: "\\text{Ja (Ultraschall)}",
                        fp_a2: "\\text{Klangfarbe (Tonqualität)}",
                        fp_a3: "\\text{Weit darüber (Ultraschall)}",
                        fp_a4: "\\text{Nein (Infraschall)}",
                        fp_a5: "\\text{Ja (jenseits kritischer Bandbreite)}",
                        fp_e2: "\\text{Reine Stimmung (1{,}5 > 1{,}498)}",
                        fp_e3: "\\text{Formanten}",
                        fp_e4: "200\\text{ Hz (fehlende Grundfrequenz)}",
                        fp_e5: "\\text{Auditive Maskierung}",
                        li_b3: "\\text{Nein (verursacht Schmerzen und Schäden)}",
                        li_e1: "\\text{Phon}",
                        li_e2: "2\\times \\text{ mal lauter}",
                        li_e3: "\\text{dB(A) oder dBA}",
                        li_e5: "\\text{Audio-Rauschen/Zischen}"
                },
                prompts: {
                // SOUND_WAVES
                sound_waves_b1: "Die Schallgeschwindigkeit in Luft bei 20°C beträgt 343 m/s. Eine Schallwelle hat die Frequenz 686 Hz. Berechne die Wellenlänge.",
                sound_waves_b2: "Eine Schallwelle hat die Wellenlänge 0,5 m und die Geschwindigkeit 340 m/s. Was ist die Frequenz?",
                sound_waves_b3: "Schall breitet sich in Wasser (1480 m/s) schneller aus als in Luft (343 m/s). Wahr oder falsch?",
                sound_waves_b4: "Ein Echo kehrt nach 2 Sekunden zurück. Die Wand ist 343 m entfernt. Was ist die Schallgeschwindigkeit?",
                sound_waves_b5: "Kann Schall sich im Vakuum ausbreiten?",
                sound_waves_c1: "Schall in Wasser: Geschwindigkeit 1480 m/s, Frequenz 740 Hz. Was ist die Wellenlänge?",
                sound_waves_c2: "Donner ist 3 Sekunden nach dem Blitz zu hören. Wie weit ist das Gewitter entfernt? ($v = 343$ m/s)",
                sound_waves_c3: "Schall in Stahl: Geschwindigkeit 5960 m/s, Wellenlänge 2 m. Was ist die Frequenz?",
                sound_waves_c4: "Schall reflektiert an einer Wand 171,5 m entfernt. Was ist die Echozeit? ($v = 343$ m/s)",
                sound_waves_c5: "Schall breitet sich in Stahl mit 5960 m/s und in Luft mit 343 m/s aus. Wie viel mal schneller ist Schall in Stahl?",
                sound_waves_a1: "Eine Ambulanzsirene mit 500 Hz nähert sich mit 30 m/s. Ist die beobachtete Frequenz höher oder niedriger?",
                sound_waves_a2: "Zwei Lautsprecher senden die gleiche Frequenz in Phase. An einem Punkt löschen sich die Wellen aus. Welche Art von Interferenz?",
                sound_waves_a3: "Schall biegt sich beim Übergang von Luft in Wasser. Wie nennt man dieses Phänomen?",
                sound_waves_a4: "Schall biegt sich um Ecken. Wie nennt man dieses Phänomen?",
                sound_waves_a5: "Eine mit 512 Hz schwingende Stimmgabel wird neben ein offenes Rohr gehalten. Das Rohr resoniert. Was ist die Eigenfrequenz des Rohrs?",
                sound_waves_e1: "Zwei Stimmgabeln: 440 Hz und 444 Hz. Was ist die Schwebungsfrequenz?",
                sound_waves_e2: "Ein einseitig geschlossenes Rohr der Länge 0,5 m. Was ist die Grundfrequenz? ($v = 340$ m/s)",
                sound_waves_e3: "Ein offenes Rohr ist 1 m lang. Was ist die Grundfrequenz? ($v = 340$ m/s)",
                sound_waves_e4: "Ein Flugzeug überschreitet die Schallgeschwindigkeit. Welches Phänomen tritt auf?",
                sound_waves_e5: "Schall reflektiert stark an der Luft-Wasser-Grenzfläche. Warum?",
                // FREQUENCY_PITCH
                frequency_pitch_b1: "Der menschliche Hörbereich reicht ungefähr von 20 Hz bis wie viel Hz?",
                frequency_pitch_b2: "Haben Töne mit höherer Frequenz eine höhere oder niedrigere Tonhöhe?",
                frequency_pitch_b3: "Kammerton A4 hat die Frequenz 440 Hz. A5 liegt eine Oktave höher. Was ist die Frequenz von A5?",
                frequency_pitch_b4: "Ultraschall ist Schall oberhalb von 20.000 Hz. Können Menschen ihn hören?",
                frequency_pitch_b5: "Infraschall ist Schall unterhalb von 20 Hz. Können Menschen ihn hören?",
                frequency_pitch_c1: "C4 ist 262 Hz. C5 liegt eine Oktave höher. Was ist die Frequenz von C5?",
                frequency_pitch_c2: "A4 ist 440 Hz. A#4 (ein Halbton höher) ist 440 × 1,0595. Was ist die Frequenz von A#4?",
                frequency_pitch_c3: "Eine Geige spielt A4 (440 Hz). Was ist die zweite Oberschwingungsfrequenz?",
                frequency_pitch_c4: "Fledermäuse verwenden Ultraschall bei 50.000 Hz zur Echoortung. Liegt das oberhalb des menschlichen Gehörs?",
                frequency_pitch_c5: "Eine Gitarrensaite hat die Grundfrequenz 200 Hz. Was ist die dritte Oberschwingungsfrequenz?",
                frequency_pitch_a1: "Eine reine Quinte hat das Frequenzverhältnis 3:2. Wenn C4 262 Hz ist, was ist die Frequenz von G4?",
                frequency_pitch_a2: "Zwei Instrumente spielen die gleiche Note (440 Hz), klingen aber unterschiedlich. Welche Eigenschaft unterscheidet sich?",
                frequency_pitch_a3: "Medizinischer Ultraschall verwendet 2–10 MHz. Liegt das oberhalb oder unterhalb des menschlichen Gehörs?",
                frequency_pitch_a4: "Ein Erdbeben erzeugt Infraschall bei 5 Hz. Können Menschen ihn hören?",
                frequency_pitch_a5: "Zwei Töne bei 100 Hz und 150 Hz werden zusammen gespielt. Kann das Ohr sie unterscheiden?",
                frequency_pitch_e1: "Die gleichschwebende Temperierung teilt eine Oktave in 12 Halbtöne. Was ist das Frequenzverhältnis pro Halbton?",
                frequency_pitch_e2: "Reine Quinte in reiner Stimmung: Verhältnis 3:2. Gleichschwebende Temperierung: $2^{7/12}$. Welche ist größer?",
                frequency_pitch_e3: "Vokale unterscheiden sich durch Resonanzfrequenzen des Vokaltrakts. Wie nennt man diese?",
                frequency_pitch_e4: "Obertöne bei 400, 600 und 800 Hz sind vorhanden. Welche Grundfrequenz nimmt das Gehirn wahr?",
                frequency_pitch_e5: "Ein lauter 1000-Hz-Ton maskiert einen nahen 1100-Hz-Ton. Wie nennt man diesen Effekt?",
                // LOUDNESS_INTENSITY
                loudness_intensity_b1: "Ein Flüstern ist etwa 30 dB. Ein normales Gespräch ist 60 dB. Wie viel mal intensiver?",
                loudness_intensity_b2: "Die Hörschwelle beträgt 0 dB. Was ist die Intensität in W/m²?",
                loudness_intensity_b3: "Die Schmerzschwelle liegt bei etwa 140 dB. Ist das für das Gehör sicher?",
                loudness_intensity_b4: "Verdopplung des Abstands von der Schallquelle. Die Intensität wird 1/4. Um wie viele dB nimmt die Lautstärke ab?",
                loudness_intensity_b5: "Längere Exposition über 85 dB kann Hörschäden verursachen. Wahr oder falsch?",
                loudness_intensity_c1: "Schall A ist 60 dB, Schall B ist 70 dB. Wie viel mal intensiver ist B?",
                loudness_intensity_c2: "Die Schallintensität beträgt $10^{-10}$ W/m². Was ist der Schallpegel in dB?",
                loudness_intensity_c3: "Bei 1 m: 80 dB. Bei 2 m: wie viele dB?",
                loudness_intensity_c4: "Rockkonzert: 110 dB. Staubsauger: 70 dB. Wie viel mal intensiver ist das Konzert?",
                loudness_intensity_c5: "Der Schallpegel beträgt 30 dB. Was ist die Intensität in W/m²?",
                loudness_intensity_a1: "Bei 10 m: 60 dB. Bei 100 m: wie viele dB?",
                loudness_intensity_a2: "Zwei identische 60-dB-Quellen werden kombiniert. Was ist die Gesamtlautstärke?",
                loudness_intensity_a3: "Die Schallintensität halbiert sich durch Luftabsorption. Um wie viele dB nimmt die Lautstärke ab?",
                loudness_intensity_a4: "Düsentriebwerk bei 100 m: 130 dB. Bei 1 km: wie viele dB?",
                loudness_intensity_a5: "Vier identische 50-dB-Quellen werden kombiniert. Was ist die Gesamtlautstärke?",
                loudness_intensity_e1: "Isophone zeigen, dass die wahrgenommene Lautstärke mit der Frequenz variiert. Was ist die Einheit der wahrgenommenen Lautstärke?",
                loudness_intensity_e2: "Das Sone ist eine Einheit, bei der eine Verdopplung der Sone-Zahl die wahrgenommene Lautstärke verdoppelt. Wie viel lauter ist 2 Sone als 1 Sone?",
                loudness_intensity_e3: "Die A-Bewertung passt dB-Messungen an die menschliche Hörempfindlichkeit an. Was ist das Symbol?",
                loudness_intensity_e4: "85 dB für 8 Stunden entspricht 100 % Lärmbelastung. Was ist die Belastung für 88 dB über 4 Stunden?",
                loudness_intensity_e5: "Die ITU-R 468-Bewertung betont den 6-kHz-Bereich. Wofür wird sie verwendet?"
                },
                placeholders: {
                        true: "wahr",
                        no: "nein",
                        yes: "ja",
                
                    higher: "higher",
                    destructive: "destructive",
                    refraction: "refraction",
                    diffraction: "diffraction",
                    sonic_boom: "sonic boom",
                    impedance: "impedance",
                    timbre: "timbre",
                    above: "above",
                    just: "just",
                    formants: "formants",
                    masking: "masking",
                    phon: "phon",
                    dba: "dBA",
                    noise: "noise",                    v_0_dot_5: "0.5",
                    v_680: "680",
                    v_343: "343",
                    v_2: "2",
                    v_1029: "1029",
                    v_2980: "2980",
                    v_1: "1",
                    v_17: "17",
                    v_512: "512",
                    v_4: "4",
                    v_170: "170",
                    v_20000: "20000",
                    v_880: "880",
                    v_524: "524",
                    v_466: "466",
                    v_600: "600",
                    v_393: "393",
                    v_1_dot_06: "1.06",
                    v_200: "200",
                    v_1000: "1000",
                    v_1e_minus_12: "1e-12",
                    minus_6: "-6",
                    v_10: "10",
                    v_20: "20",
                    v_74: "74",
                    v_10000: "10000",
                    v_1e_minus_9: "1e-9",
                    v_40: "40",
                    v_63: "63",
                    minus_3: "-3",
                    v_110: "110",
                    v_56: "56",
                    v_100: "100"
},
                solver: {
                        medium_reason: "Schall breitet sich in Wasser schneller aus, weil die Teilchen dichter beieinander liegen und Schwingungen effizienter weitergeben.",
                        vacuum_reason: "Im Vakuum gibt es keine Teilchen, daher hat Schall kein Medium zur Ausbreitung.",
                        doppler_reason: "Wenn sich die Quelle nähert, werden die Wellenfronten zusammengedrückt und die beobachtete Frequenz steigt.",
                        interference_reason: "Wenn sich zwei gleichphasige Wellen an einem Punkt aufheben, liegt dort destruktive Interferenz vor.",
                        refraction_reason: "Ein Mediumwechsel verändert die Schallgeschwindigkeit und lenkt die Welle ab; das ist Brechung.",
                        diffraction_reason: "Beugung ist das Biegen von Wellen um Kanten oder Öffnungen.",
                        resonance_freq_reason: "Resonanz tritt auf, wenn die Anregungsfrequenz mit der Eigenfrequenz übereinstimmt, also",
                        hearing_range_reason: "Das menschliche Hörvermögen reicht ungefähr von 20 Hz bis 20000 Hz.",
                        pitch_reason: "Mit steigender Frequenz steigt auch die Tonhöhe.",
                        ultrasound_reason: "Ultraschall liegt über 20 kHz und damit oberhalb des menschlichen Hörbereichs.",
                        infrasound_reason: "Infraschall liegt unter 20 Hz und damit unterhalb des menschlichen Hörbereichs.",
                        bat_echolocation_reason: "Eine Frequenz von 50000 Hz liegt deutlich über dem menschlichen Hörbereich.",
                        timbre_reason: "Wenn zwei Instrumente dieselbe Grundfrequenz haben, aber unterschiedlich klingen, ist die unterschiedliche Eigenschaft die Klangfarbe.",
                        earthquake_reason: "5 Hz liegen unter 20 Hz, daher können Menschen diesen Ton nicht hören.",
                        critical_bands_reason: "Diese Töne liegen frequenzmäßig weit genug auseinander, sodass das Ohr sie unterscheiden kann.",
                        just_intonation_reason: "die reine Quinte ist geringfügig größer.",
                        formants_reason: "Die Resonanzbänder, die die Vokalqualität bestimmen, heißen Formanten.",
                        missing_fundamental_reason: "Der Abstand der Harmonischen beträgt 200 Hz, daher wird die fehlende Grundfrequenz als 200 Hz wahrgenommen.",
                        masking_reason: "Wenn ein starker Ton eine nahe Frequenz schwerer hörbar macht, spricht man vom Maskierungseffekt.",
                        pain_threshold_reason: "Ein Pegel nahe 140 dB ist für das Gehör nicht sicher.",
                        distance_effect_reason: "Bei doppelter Entfernung sinkt die Intensität auf ein Viertel, daher fällt der Pegel um etwa 6 dB.",
                        safe_level_reason: "Längere Belastung über 85 dB kann das Gehör schädigen.",
                        distance_double_reason: "Verdoppelte Entfernung senkt den Pegel um 6 dB, daher werden aus 80 dB etwa 74 dB.",
                        inverse_square_reason: "Von 10 m auf 100 m sinkt die Intensität um den Faktor 100, daher fällt der Pegel um 20 dB auf 40 dB.",
                        combining_sources_reason: "Zwei identische Quellen addieren etwa 3 dB, daher werden aus 60 dB etwa 63 dB.",
                        absorption_reason: "Halbe Intensität ändert den Pegel um etwa -3 dB.",
                        jet_engine_reason: "Eine Verzehnfachung der Entfernung senkt den Pegel um 20 dB, daher werden aus 130 dB etwa 110 dB.",
                        four_sources_reason: "Vier identische Quellen addieren etwa 6 dB, daher werden aus 50 dB etwa 56 dB.",
                        phon_reason: "Die wahrgenommene Lautstärke wird in Phon gemessen.",
                        sone_reason: "Eine Verdopplung der Sone bedeutet eine Verdopplung der wahrgenommenen Lautheit.",
                        a_weighting_reason: "A-bewertete Schallpegel werden als dB(A) angegeben.",
                        noise_dose_reason: "Ein Anstieg um 3 dB halbiert die sichere Expositionszeit, daher entsprechen 88 dB über 4 h immer noch 100 % Dosis.",
                        itu_weighting_reason: "Die ITU-R-468-Bewertung wird für wahrgenommene Geräuschmessungen verwendet, besonders in Audiosystemen.",
                        sonic_boom_reason: "Beim Durchbrechen der Schallmauer entsteht eine Stoßwelle, die als Überschallknall hörbar wird.",
                        acoustic_impedance_reason: "Ein großer akustischer Impedanzunterschied reflektiert den Großteil der Schallenergie an der Grenzfläche."
                }
        },

        // 8. OPTIK (Wellenlehre II)
        sp3_08: {
                title: "SP3.08 // GEOMETRISCHE OPTIK",
                back: "Zurück zum Nexus",
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
                placeholders: {
                        deg: "Grad",
                        mm: "mm",
                        mag: "Vergr."
                },
                stages: {
                        reflection: "REFLEXION",
                        refraction: "BRECHUNG",
                        lenses: "LINSEN"
                },
                labels: {
                        show_prism: "Prismendispersion zeigen",
                        medium_1: "MEDIUM 1 (n_1)",
                        medium_2: "MEDIUM 2 (n_2)",
                        incident_angle: "Einfallswinkel",
                        focal_length: "Brennweite",
                        refraction_title: "BRECHUNG",
                        refracted_angle: "Brechungswinkel (θ_2):",
                        critical_angle: "Grenzwinkel:",
                        total_internal_reflection: "TOTALREFLEXION",
                        angle_value: "{value}°",
                        light_path_correct: "Lichtpfad korrekt!",
                        formula: "Formel",
                        hint: "Hinweis"
                },
                prompts: {
                        reflection_law: "\\text{Reflexionsgesetz: } \\theta_i = {angle}^\\circ",
                        refraction_setup: "\\text{Brechung in } {material}:\\; n_1={n1},\\; n_2={n2},\\; \\theta_1={theta1}^\\circ",
                        lens_setup: "\\text{Linse: } f={f}\\text{mm},\\; u={u}\\text{mm}"
                },
                hints: {
                        refraction: "Licht wird zum Lot hin gebrochen, wenn es in ein dichteres Medium eintritt (n_2 > n_1)"
                },
                snell: { title: "SNELLIUS-GESETZ", line_1: "n_1 sin(θ_1) = n_2 sin(θ_2)", line_2: "θ_c = arcsin(n_2/n_1)", line_3: "v = c/n" },
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
                monitor_title: "GP2.01_THERMO_MONITOR",
                stages: { ideal_gas: "IDEALES GAS", boyles: "BOYLE-MARIOTTE", charles: "GAY-LUSSAC" },
                prompts: {
                        find_p: "Idealgas-Zustandsaufgabe: gegeben n={n} mol, T={T} K und V={V} m^{3}. Aufgabe: Druck P mit PV=nRT berechnen.",
                        find_v: "Zustands-Umkehrung: gegeben n={n} mol, P={P} Pa und T={T} K. Aufgabe: Volumen V aus PV=nRT bestimmen.",
                        find_n: "Stoffmengen-Schätzung: gegeben P={P} Pa, V={V} m^{3} und T={T} K. Aufgabe: n mit dem idealen Gasgesetz berechnen.",
                        find_t: "Temperatur-Rückrechnung: gegeben P={P} Pa, V={V} m^{3} und n={n} mol. Aufgabe: T aus PV=nRT bestimmen.",
                        relation_pt: "Proportionalitätscheck: Temperatur verdoppelt sich bei konstantem Volumen. Aufgabe: Druck-Änderungsfaktor bestimmen.",
                        relation_vn: "Mengen-Volumen-Check: Molzahl verdoppelt sich bei konstantem P und T. Aufgabe: Volumenfaktor bestimmen.",
                        boyle_find_p2: "Boyle-Mariotte-Rechnung: P_1={p1} kPa, V_1={v1} L, V_2={v2} L bei konstanter T. Aufgabe: P_2 berechnen.",
                        boyle_find_v2: "Boyle-Mariotte-Rechnung: P_1={p1} kPa, V_1={v1} L und P_2={p2} kPa bei konstanter T. Aufgabe: V_2 berechnen.",
                        boyle_relation: "Kompressionsverhältnis-Check: Volumen ändert sich isotherm von {v1} L auf {v2} L. Aufgabe: Druck-Multiplikator bestimmen.",
                        boyle_condition: "Konzeptfrage zur Bedingung: Aufgabe ist die Größe zu benennen, die für Boyle-Mariotte konstant bleiben muss.",
                        charles_find_v2: "Charles/Gay-Lussac-Rechnung: V_1={v1} L, T_1={t1} K, T_2={t2} K bei konstantem Druck. Aufgabe: V_2 berechnen.",
                        charles_find_t2: "Charles/Gay-Lussac-Umkehrung: V_1={v1} L, T_1={t1} K und V_2={v2} L bei konstantem Druck. Aufgabe: T_2 berechnen.",
                        charles_relation: "Wärmeausdehnungs-Check: absolute Temperatur verdoppelt sich bei konstantem Druck. Aufgabe: Volumenfaktor bestimmen.",
                        charles_condition: "Konzeptfrage zur Bedingung: Aufgabe ist die Größe zu benennen, die für das Charles-Gesetz konstant bleiben muss.",
                        combined_law: "Allgemeines Gasgesetz bei P, V, T Änderung. Suche nach {target}.",
                        iwb_steam: "IWB Fernwärme: Dampf bei T={T} K, V={V} m^{3}, n={n} mol. Berechne Druck P (Ideal).",
                        roche_tower: "Roche-Turm 40. Stock: Raum V={V} m^{3}, T={T} K, P={P} Pa. Berechne Luftmenge n.",
                        rhine_bubble: "Rhein-Taucher in der Tiefe (P1={p1} kPa) atmet Blase V1={v1} mL aus. Volumen an Oberfläche (P2={p2} kPa)?",
                        weather_balloon: "Basel Wetterballon: Boden V={v1} m^{3}, T1={t1} K. Stratosphäre T2={t2} K (P konstant). Neues Volumen?",
                        novartis_reactor: "Novartis-Reaktor V={V} m^{3}. Spüle mit N2 bei P={P} Pa, T={T} K. Berechne Masse N2 (M=0.028 kg/mol).",
                        boyle_k_find_v: "PV-Konstantenaufgabe: gegeben k=2400 kPa·L und P=600 kPa bei isothermen Bedingungen. Aufgabe: Volumen V berechnen.",
                        boyle_p_increase_factor: "Isothermer Skalierungscheck: der Druck steigt um 25 %. Aufgabe: Volumenänderungsfaktor bestimmen.",
                        boyle_energy_density: "Energiedichte-Form: gegeben PV=5000 J und V=0,01 m^{3}. Aufgabe: Druck P berechnen.",
                        boyle_hyperbola: "Hyperbelmodell-Check: P(V)=k/V mit k=100. Aufgabe: Druck bei V=5 bestimmen.",
                        boyle_isothermal_work: "Isothermer Arbeitsfall: W=nRT·ln(V_2/V_1), mit P_1V_1=1000 J und Expansion auf 2V. Aufgabe: W berechnen.",
                        boyle_compress_v3: "Vorzeichenkonvention: Gas wird isotherm auf V/3 komprimiert. Aufgabe: Vorzeichen der am Gas verrichteten Arbeit angeben.",
                        boyle_real_gas_limit: "Modellgrenzen-Konzeptfrage: Aufgabe ist die Bedingungen zu benennen, bei denen reale Gase am stärksten vom Boyle-Gesetz abweichen.",
                        boyle_compress_atm: "Kompressionsrechnung: P_1=1 atm, V_1=10 L, komprimiert auf P_2=10 atm (ideales Gas). Aufgabe: V_2 berechnen.",
                        boyle_two_bulbs: "Zwei-Behälter-Ausgleich: P_1=2, V_1=1; P_2=0, V_2=1; danach Ventil öffnen. Aufgabe: Enddruck P bestimmen.",
                        charles_celsius_find_v2: "Charles/Gay-Lussac-Erwärmung: V_1=3 L, T_1=27 °C (300 K), T_2=127 °C (400 K). Aufgabe: V_2 berechnen.",
                        charles_find_t2_c2: "Charles/Gay-Lussac-Umkehrung: V_1=2 L, T_1=200 K, V_2=3 L bei konstantem Druck. Aufgabe: T_2 bestimmen.",
                        charles_cool_factor: "Abkühlungsfaktor-Check: Gas kühlt bei konstantem Druck von 400 K auf 100 K. Aufgabe: Volumenfaktor bestimmen.",
                        charles_abs_zero: "Thermodynamik-Konzeptfrage: Aufgabe ist den absoluten Nullpunkt in Grad Celsius anzugeben.",
                        charles_20c_to_80c: "Erwärmungsfall bei konstantem Druck: V_1=5 L bei 20 °C (293 K). Aufgabe: V_2 bei 80 °C (353 K) berechnen.",
                        charles_ke_proportional: "Kinetik-Konzeptcheck: Erwärmung erhöht die mittlere kinetische Energie. Aufgabe: proportionale Größe benennen.",
                        charles_find_t2_a3: "Charles/Gay-Lussac-Umkehrung: V_1=10 L, T_1=500 K, V_2=5 L bei konstantem Druck. Aufgabe: T_2 berechnen.",
                        charles_combined_reduces: "Gleichungsbezug-Check: Aufgabe ist zu benennen, auf welches Gesetz sich das kombinierte Gasgesetz bei konstantem Druck reduziert.",
                        charles_isobaric_work: "Isobare Arbeitsrechnung: W=P(V_2-V_1), mit P=100 Pa und V von 1 auf 2 m^{3}. Aufgabe: W berechnen.",
                        charles_density_factor: "Dichte-Temperatur-Check: für ideales Gas gilt bei konstantem Druck \\rho \\propto 1/T. Aufgabe: Dichtefaktor bei T-Verdopplung bestimmen.",
                        charles_vt_slope: "V-T-Diagramm-Auswertung: Steigung=nR/P bei n=1 mol und P=8,314 Pa. Aufgabe: Steigung berechnen.",
                        charles_piston_work: "Kolben-Expansionsfall: T_1=300 K, V_1=1 m^{3}, isobare Arbeit W=300 J bei P=100 Pa. Aufgabe: V_2 bestimmen.",
                        charles_find_t2_piston: "Folgeaufgabe zur Verhältnisgleichung: T_1/V_1=T_2/V_2 mit T_1=300 K, V_1=1 m^{3}, V_2=4 m^{3}. Aufgabe: T_2 berechnen.",
                        charles_carnot_ke: "Kinetik-Skalierungscheck: Temperatur ist proportional zur mittleren kinetischen Energie. Aufgabe: Exponentenänderung von v_{rms} bei T-Verdopplung bestimmen."
                },
                scenarios: {
                        ideal_gas: "Das ideale Gasgesetz (PV=nRT) beschreibt das Verhalten von Gasen unter verschiedenen Bedingungen.",
                        boyles_law: "Boyle-Mariotte-Gesetz: Bei konstanter Temperatur ist das Volumen umgekehrt proportional zum Druck.",
                        charles_law: "Gesetz von Gay-Lussac: Bei konstantem Druck ist das Volumen direkt proportional zur Temperatur."
                },
                hints: {
                        stp_conditions: "STP-Bedingungen",
                        ideal_substitute_pressure: "Setze n, R, T und V direkt in P = nRT/V ein.",
                        ideal_substitute_moles: "Verwende n = PV/(RT) und halte Druck in Pa sowie Volumen in m^3.",
                        ideal_substitute_temperature: "Stelle zuerst nach T = PV/(nR) um und setze dann ein.",
                        ideal_substitute_pressure_high: "Setze die Werte direkt in P = nRT/V ein.",
                        r_value: "Nutze R = 8,314.",
                        watch_units: "Prüfe vor dem Rechnen Druck-, Volumen- und Temperatureinheiten.",
                        standard_calculation: "Das ist eine direkte Einsetzaufgabe zum idealen Gasgesetz.",
                        check_r_value: "Kontrolliere, dass du die richtige Gaskonstante verwendest.",
                        linear_relationship: "Bei konstantem V und n ist der Druck direkt proportional zur Temperatur.",
                        avogadros_law: "Bei konstantem Druck und konstanter Temperatur ist das Volumen proportional zur Stoffmenge.",
                        high_temperature: "Bei festem Volumen erhöht höhere Temperatur den Druck.",
                        low_temperature: "Eine kleinere Temperatur im Nenner macht n größer.",
                        high_pressure: "Hoher Druck führt zu kleinerem Volumen.",
                        isolate_p2: "Stelle das kombinierte Gasgesetz nach P_2 um.",
                        r_value_si: "Nutze R = 8,314 J/mol·K.",
                        p_in_pa_v_in_m3: "Verwende Druck in Pa und Volumen in m^3.",
                        pressure_halves_volume_doubles: "Bei konstanter Temperatur verdoppelt sich das Volumen, wenn sich der Druck halbiert.",
                        cooling_shrinks_volume: "Bei konstantem Druck schrumpft das Volumen beim Abkühlen.",
                        calculate_n_then_mass: "Berechne zuerst n und multipliziere dann mit 0,028 kg/mol.",
                        volume_halves_pressure_doubles: "Bei konstanter Temperatur verdoppelt sich der Druck, wenn sich das Volumen halbiert.",
                        calculate_constant_first: "Berechne zuerst die Konstante P_1V_1.",
                        pressure_times_five_volume_div_five: "Wird der Druck fünfmal so groß, wird das Volumen auf ein Fünftel reduziert.",
                        isothermal: "Das Boyle-Mariotte-Gesetz gilt für isotherme Prozesse.",
                        inverse_proportion: "Hier sind Druck und Volumen umgekehrt proportional.",
                        two_forty_over_eighty: "Berechne zuerst 240 ÷ 80.",
                        ten_over_two: "Der Faktor ist 10 ÷ 2.",
                        double_value: "Das Ergebnis ist genau doppelt so groß.",
                        twenty_four_hundred_over_six_hundred: "Berechne 2400 ÷ 600.",
                        times_five: "Durch 0,1 teilen entspricht mit 10 multiplizieren und dann mit 0,5 vergleichen.",
                        one_over_one_point_two_five: "Der Volumenfaktor ist 1/1,25.",
                        j_per_m3_equals_pa: "J/m^3 hat dieselbe Einheit wie Pa.",
                        one_thousand_over_one_thousand: "Zähler und Nenner ergeben zusammen 1.",
                        inverse: "Nutze die umgekehrte Proportionalität.",
                        ln_two: "Verwende ln(2) ≈ 0,693.",
                        compression: "Bei Kompression ist die am Gas verrichtete Arbeit in dieser Konvention positiv.",
                        intermolecular_forces_dominate: "Die stärkste Abweichung tritt auf, wenn zwischenmolekulare Kräfte dominieren.",
                        ratio_ten: "Nutze das Druckverhältnis 10.",
                        total_volume_two: "Am Ende füllt das Gas das Gesamtvolumen beider Gefäße.",
                        temperature_doubles_volume_doubles: "Bei konstantem Druck verdoppelt sich mit T auch V.",
                        volume_doubles_temperature_doubles: "Bei konstantem Druck verdoppelt sich mit V auch T.",
                        temperature_halves: "Halbiert sich T, halbiert sich auch V.",
                        proportional: "Nutze die direkte Proportionalität zwischen V und T.",
                        isobaric: "Das Charles-Gesetz erfordert konstanten Druck.",
                        use_kelvin_only: "Wandle zuerst in Kelvin um.",
                        ratio_one_point_five: "Das Verhältnis ist 3/2 = 1,5.",
                        linear: "Das Volumen ändert sich linear mit der absoluten Temperatur.",
                        one_quarter: "100/400 = 1/4.",
                        offset: "Zwischen K und °C gilt der Offset 273,15.",
                        kelvin_conversion: "Wandle beide Temperaturen zuerst in Kelvin um.",
                        temperature_measures_ke: "Die mittlere kinetische Energie ist proportional zur absoluten Temperatur.",
                        halved: "Halbiert sich das Volumen, halbiert sich auch die Temperatur.",
                        name: "Bestimme, welches benannte Gasgesetz hier gemeint ist.",
                        direct_multiply: "Hier reicht die direkte Multiplikation.",
                        w_equals_p_delta_v: "Im isobaren Kolbenfall gilt W = PΔV.",
                        proportional_short: "Nutze die direkte Proportion T_2/T_1 = V_2/V_1.",
                        power_half: "Die RMS-Geschwindigkeit skaliert mit T^(1/2)."
                },
                reasons: {
                        select_ideal_gas_equation: "Beginne mit der idealen Gasgleichung für Druck, Volumen, Stoffmenge und Temperatur.",
                        select_boyle_law: "Verwende das Boyle-Mariotte-Gesetz, weil der Prozess isotherm ist.",
                        select_charles_law: "Verwende das Charles-Gesetz, weil der Druck konstant bleibt.",
                        rearrange_for_target: "Stelle die Gleichung so um, dass die gesuchte Größe allein steht.",
                        substitute_known_values: "Setze die bekannten Werte in die umgestellte Beziehung ein.",
                        apply_inverse_law: "Nutze die umgekehrte Proportionalität zwischen Druck und Volumen bei konstanter Temperatur.",
                        apply_direct_law: "Nutze die direkte Proportionalität in diesem Gasgesetz.",
                        convert_temperatures_to_kelvin: "Wandle alle Temperaturen zuerst in Kelvin um.",
                        identify_constant_condition: "Bestimme die Größe, die für dieses Gesetz konstant bleiben muss.",
                        interpret_physical_condition: "Deute zuerst die physikalische Bedingung, bevor du das Ergebnis angibst.",
                        link_combined_gas_law: "Verknüpfe Anfangs- und Endzustand mit dem kombinierten Gasgesetz.",
                        convert_amount_to_mass: "Wandle nach der Stoffmengenberechnung mit der molaren Masse in eine Masse um.",
                        interpret_concept: "Übersetze die physikalische Aussage in die passende Gasgesetz-Idee.",
                        state_model_limit: "Prüfe, wann das ideale Modell vom Verhalten realer Gase abweicht.",
                        interpret_work_sign: "Nutze die Prozessrichtung, um das Vorzeichen der Arbeit festzulegen."
                },
                labels: {
                        factor: "Faktor",
                        symbol: "Symbol",
                        constant: "Konstante"
                },
                solver: {
                        temperature_constant: "konstant",
                        pressure_constant: "konstant",
                        real_gases_deviate: "Reale Gase weichen bei hohem Druck und tiefer Temperatur ab",
                        celsius_unit: "C",
                        use_kelvin_only: "Verwende nur absolute Temperaturen in Kelvin"
                },
                placeholders: {
                        temperature: "Temperatur",
                        pressure: "Druck",
                        charles: "Charles",
                
                        charles_law: "Charles-Gesetz",
                        positive_work_on_gas: "Positive Arbeit am Gas",
                        high_pressure: "Hoher Druck",
                        square_root: "Quadratwurzel",
                    high: "hoch",                    v_99768: "99768",
                    v_3_dot_01: "3.01",
                    v_0_dot_0224: "0.0224",
                    v_240_dot_56: "240.56",
                    v_145495: "145495",
                    v_123878: "123878",
                    v_0_dot_166: "0.166",
                    v_360_dot_8: "360.8",
                    v_2: "2",
                    v_415700: "415700",
                    v_24_dot_06: "24.06",
                    v_0_dot_00025: "0.00025",
                    p2: "P2",
                    v_149652: "149652",
                    v_20046: "20046",
                    v_40: "40",
                    v_8: "8",
                    v_22_dot_45: "22.45",
                    v_200: "200",
                    v_100: "100",
                    v_1: "1",
                    v_300: "300",
                    v_3: "3",
                    v_5: "5",
                    v_202_dot_6: "202.6",
                    v_4: "4",
                    v_1500: "1500",
                    v_0_dot_8: "0.8",
                    v_500000: "500000",
                    v_20: "20",
                    v_693: "693",
                    plus: "+",
                    v_400: "400",
                    v_500: "500",
                    v_0_dot_25: "0.25",
                    minus_273_dot_15: "-273.15",
                    v_6_dot_02: "6.02",
                    v_250: "250",
                    v_0_dot_5: "0.5",
                    v_1200: "1200"
}
        }
,
        gp2_02: {
                back: "Zurück zum Nexus",
                title: "GP2.02 // THERMODYNAMIK I",
                difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
                objective_title: "Analyse der thermischen Energie",
                next: "Nächste Phase",
                check: "Energie verifizieren",
                correct: "Bestätigt",
                incorrect: "Abweichung",
                monitor_title: "GP2.02_THERMO_MONITOR",
                stages: { first_law: "ERSTER HAUPTSATZ", internal_energy: "INNERE ENERGIE", work_heat: "ARBEIT & WÄRME" },
                reasons: {
                        select_first_law_balance: "Beginne mit der Energiebilanz des ersten Hauptsatzes.",
                        rearrange_energy_balance: "Stelle die Bilanz so um, dass die gesuchte Größe isoliert wird.",
                        apply_process_constraint: "Nutze die definierende Bedingung dieses thermodynamischen Prozesses.",
                        select_internal_energy_model: "Wähle das Modell der inneren Energie passend zu den Freiheitsgraden.",
                        evaluate_temperature_change: "Berechne die temperaturbedingte Energieänderung mit der gegebenen Wärmekapazität.",
                        identify_state_function_behavior: "Nutze die Eigenschaft der Zustandsgröße, um das Verhalten der inneren Energie zu beurteilen.",
                        select_work_formula: "Wähle die Arbeitsformel, die zum Prozessweg passt.",
                        relate_heat_and_work: "Verknüpfe Wärme und Arbeit über die Bilanz des ersten Hauptsatzes.",
                        interpret_sign_convention: "Wende die Vorzeichenkonvention des Moduls auf das Ergebnis an.",
                        read_pv_area: "Deute die Fläche im PV-Diagramm als thermodynamische Arbeit.",
                        substitute_known_values: "Setze die gegebenen Zahlenwerte in die gewählte Beziehung ein."
                },
                prompts: {
                        fl_calc_du: "Energieprotokoll im Basler Labor: Das System absorbiert Q={q} J und leistet W={w} J an die Umgebung. Aufgabe: Berechne die innere Energieänderung mit ΔU=Q-W.",
                        fl_calc_q: "Prozessauswertung: Gegeben sind ΔU={du} J und Systemarbeit W={w} J. Aufgabe: Bestimme die zugeführte/abgeführte Wärme Q über Q=ΔU+W.",
                        fl_calc_w: "Anlagencheck: Das System nimmt Q={q} J auf und seine innere Energie steigt um ΔU={du} J. Aufgabe: Bestimme die Arbeit W mit W=Q-ΔU.",
                        fl_adiabatic: "Adiabatischer Versuch: Q=0 und die am System verrichtete Arbeit beträgt {w} J. Aufgabe: Bestimme ΔU mit korrekter Vorzeichenkonvention.",
                        fl_cycle: "Kreisprozess-Bilanz: Die Nettoarbeit pro Zyklus ist W={w} J. Aufgabe: Ermittle die Nettowärme Q aus der Bilanz des 1. Hauptsatzes.",
                        fl_sign_conv: "Vorzeichenregel-Check: Das System gibt Wärme an die Umgebung ab. Aufgabe: Entscheide, ob Q positiv oder negativ ist.",
                        ie_ideal_u: "Zustandsanalyse eines einatomigen idealen Gases: n={n} mol und T={t} K. Aufgabe: Berechne U mit U=1.5nRT.",
                        ie_delta_u: "Isothermer Schritt im Thermostatbad (ideales Gas). Aufgabe: Bestimme ΔU für den temperaturkonstanten Prozess.",
                        ie_diatomic: "Zweiatomiger Gasspeicher: n={n} mol, T={t} K, Freiheitsgrade f=5. Aufgabe: Berechne U mit dem Freiheitsgradmodell.",
                        ie_change_t: "Heizprotokoll: Ideales Gas mit n={n} mol und Cv={cv} J/(mol·K) wird von {t1} K auf {t2} K erwärmt. Aufgabe: Berechne ΔU über nCvΔT.",
                        ie_state_func: "Konzeptprüfung: Innere Energie ist eine Zustandsgröße. Aufgabe: Gib ΔU für einen vollständigen Kreisprozess an.",
                        wh_isobaric: "Isobare Kolbenbewegung: P={p} Pa und Volumenänderung ΔV={dv} m^{3}. Aufgabe: Berechne die Volumenarbeit W=PΔV.",
                        wh_isochoric: "Erwärmung im starren Behälter (konstantes Volumen). Aufgabe: Bestimme die mechanische Arbeit W im isochoren Prozess.",
                        wh_isothermal_w: "Isotherme Expansion eines idealen Gases mit gemessener Wärme Q={q} J. Aufgabe: Bestimme W unter Verwendung von ΔU=0.",
                        wh_area: "PV-Diagramm-Interpretation: Welche physikalische Größe entspricht der Fläche unter der Prozesskurve?",
                        wh_adiabatic_rel: "Adiabatische Expansion: Die innere Energie nimmt ab. Aufgabe: Bestimme die Temperaturtendenz.",
                        q_fl_b5: "Vorzeichen-Check zum 1. Hauptsatz: Das System nimmt 50 J Wärme auf, und am System werden 20 J Arbeit verrichtet (in System-von-außen-Konvention W=-20). Aufgabe: Bestimme ΔU.",
                        q_fl_c3: "Isochore Abkühlung im starren Behälter: Q=-100 J und W=0. Aufgabe: Berechne ΔU aus der Energiebilanz.",
                        q_ie_b3: "Temperatur-Skalierungscheck: Beim idealen Gas verdoppelt sich T. Aufgabe: Bestimme den Faktor der Änderung von U.",
                        q_ie_b5: "Abkühlungsprozess: Die Gastemperatur sinkt. Aufgabe: Bestimme die qualitative Änderung der inneren Energie U.",
                        q_ie_c3: "Zustandsgrößen-Prüfung: Aufgabe: Entscheide, ob ΔU vom Prozessweg oder nur vom Zustand abhängt.",
                        q_ie_a1: "Erweiterung auf reale Gase: U kann von T und V abhängen. Aufgabe: Erkläre, warum Volumenabhängigkeit außerhalb des Idealmodells auftritt.",
                        q_wh_b4: "Vorzeichenkonvention-Check: Aufgabe: Bestimme, ob Arbeit am System in diesem Modul positiv oder negativ gezählt wird.",
                        q_wh_c2: "Isobare Expansionsaufgabe: Bei 200 Pa wächst das Volumen von 1 m^{3} auf 3 m^{3}. Aufgabe: Berechne die Volumenarbeit.",
                        q_fl_c4: "Isobare Expansionsprüfung: Q=500 J, P=100 Pa und ΔV=2 m³. Aufgabe: Berechne zunächst W und danach ΔU.",
                        q_fl_c5: "Kompression mit Abkühlung: W=-100 J und Q=-50 J. Aufgabe: Bestimme ΔU mit konsistenter Vorzeichenregel.",
                        q_fl_a1: "Kreisprozess-Aufteilung: Weg A hat W=10 J und Q=50 J, Weg B führt zum Start zurück. Aufgabe: Nutze ΔU_zyklus=0 zur Bilanz.",
                        q_fl_a2: "Wärmekapazitätsaufgabe: ΔU=nCvΔT mit n=1, Cv=12,5 und ΔT=10, dazu W=0. Aufgabe: Bestimme Q aus dem 1. Hauptsatz.",
                        q_fl_a3: "Adiabatischer Expansionscheck: Prozessarbeit W=200 J (vom System). Aufgabe: Berechne ΔU bei Q=0.",
                        q_fl_a4: "Referenzfall freie Expansion: ideales Gas ins Vakuum mit Q=0 und W=0. Aufgabe: Bestimme ΔU.",
                        q_fl_a5: "Phasenwechsel-Bilanz: Beim Sieden gilt Q=L_v m und Grenzarbeit W=PΔV. Aufgabe: Beurteile, ob ΔU kleiner als Q ist.",
                        q_fl_e1: "Enthalpie-Identität: H=U+PV. Aufgabe: Gib dH für konstanten Druck in Wärmeform an.",
                        q_fl_e2: "Wärmekapazitätsbeziehung: Cp-Cv=R und für einatomiges Gas Cv=1,5R. Aufgabe: Berechne Cp.",
                        q_fl_e3: "Adiabatische Skalierung: TV^{g-1}=konstant, g=1,67 (einatomig), Volumen halbiert. Aufgabe: Bestimme den Temperaturfaktor.",
                        q_fl_e4: "Polytroper Prozess: PV^{n}=C mit n≠1. Aufgabe: Benenne, wie die Arbeit über das Integral ∫PdV bestimmt wird.",
                        q_fl_e5: "Entropie-Prinzip: dS=dQ/T. Aufgabe: Bestimme dS für einen reversibel-adiabatischen Prozess.",
                        q_ie_a2: "Äquipartitionstheorem-Check: Aufgabe: Gib den mittleren Energiebeitrag pro aktivem Freiheitsgrad an.",
                        q_ie_a3: "Niedrigtemperatur-Szenario: Schwingungsmoden eines zweiatomigen Gases frieren aus. Aufgabe: Bestimme die Tendenz von Cv.",
                        q_ie_a4: "Eigenschaftsübertragung beim idealen Gas: U hängt nur von T ab. Aufgabe: Prüfe, ob das auch für die Enthalpie H gilt.",
                        q_ie_a5: "Mischungsreferenz: Zwei ideale Gase mit gleicher Anfangstemperatur werden gemischt. Aufgabe: Bestimme ΔU des Gesamtsystems.",
                        q_ie_e1: "Joule-Freiexpansion im Vakuum (ideales Gas). Aufgabe: Bestimme die Temperaturänderung dT.",
                        q_ie_e2: "Joule-Expansion realer Gase: Aufgabe: Gib das typische Vorzeichen bzw. die Tendenz von dT im Vergleich zum idealen Gas an.",
                        q_ie_e3: "CO₂ bei hoher Temperatur (lineares dreiatomiges Molekül): Translation, Rotation und Vibration aktiv. Aufgabe: Bestimme die Gesamtzahl der Freiheitsgrade.",
                        q_ie_e4: "Strahlungsthermodynamik: u=U/V=aT^{4} und P=u/3 für Photonengas. Aufgabe: Formuliere die resultierende Zustandsgleichungsbeziehung.",
                        q_ie_e5: "Verknüpfung der Wärmekapazitäten: g=Cp/Cv. Aufgabe: Drücke g über die Freiheitsgrade f aus.",
                        q_wh_b5: "Diagrammdeutung: Aufgabe: Bestimme, in welchem thermodynamischen Diagramm die Fläche unter der Kurve der Arbeit entspricht.",
                        q_wh_c3: "Kompressionsrechnung: Bei 100 kPa wird das Volumen von 5 L auf 2 L reduziert. Aufgabe: Bestimme Vorzeichen und Betrag der Systemarbeit.",
                        q_wh_c4: "Zyklusrichtung im PV-Diagramm: Die Schleife ist im Uhrzeigersinn. Aufgabe: Bestimme das Vorzeichen der Gesamtarbeit.",
                        q_wh_c5: "Einheitenkonsistenz: Aufgabe: Ordne Pa·m^{3} der passenden Energieeinheit zu.",
                        q_wh_a1: "Isotherme Arbeitsaufgabe: n=1, T=300 K, Volumenänderung 1 → 2,718 (e). Aufgabe: Berechne W mit dem Logarithmusansatz.",
                        q_wh_a2: "Adiabatische Verknüpfung mit dem 1. Hauptsatz: Gegeben ΔU=-500 J. Aufgabe: Bestimme W bei Q=0.",
                        q_wh_a3: "Zyklusarbeit summieren: A→B liefert W=100 J, B→A liefert W=-40 J. Aufgabe: Berechne die Nettoarbeit.",
                        q_wh_a4: "Isobare Erwärmung: 1 mol ideales Gas wird bei konstantem Druck um 10 K erwärmt. Aufgabe: Bestimme die vom System geleistete Arbeit.",
                        q_wh_a5: "Funktionsart-Prüfung: Aufgabe: Ordne Arbeit als Wegfunktion oder Zustandsgröße ein.",
                        q_wh_e1: "Polytroper Grenzfall: W=(P2V2-P1V1)/(1-n). Aufgabe: Gib an, wie der Fall n=1 speziell behandelt wird.",
                        q_wh_e2: "Realgas-Arbeitsansatz: Van-der-Waals-Form P=nRT/(V-nb)-... (a-Term ignorieren), isotherme Expansion V1→V2. Aufgabe: Bestimme den Rechenweg für W.",
                        q_wh_e3: "Struktur des Stirling-Zyklus: Aufgabe: Ergänze die zweite Prozesspaarung neben den zwei Isothermen.",
                        q_wh_e4: "Adiabatische Arbeit per Einsetzen: W=(P1V1-P2V2)/(g-1), einatomig g=1,67, P1V1=100, P2V2=50. Aufgabe: Berechne W.",
                        q_wh_e5: "Irreversibilitätsprinzip: Aufgabe: Beschreibe das Verhalten der Entropieproduktion bei irreversibler Arbeit."
                },
                scenarios: {
                        first_law: "Der erste Hauptsatz der Thermodynamik ist der Satz von der Erhaltung der Energie.",
                        internal_energy: "Die innere Energie hängt von der Temperatur und dem Zustand des Systems ab.",
                        work_heat: "Wärme und Arbeit sind die zwei Arten, wie Energie übertragen wird."
                },
                hints: {
                        q_minus_w: "Verwende ΔU = Q - W.",
                        q_equals_du_plus_w: "Stelle zu Q = ΔU + W um.",
                        w_equals_q_minus_du: "Stelle zu W = Q - ΔU um.",
                        heat_loss: "Gibt das System Wärme ab, ist Q negativ.",
                        add_both: "Ein negatives Vorzeichen abzuziehen bedeutet addieren.",
                        compression_warms: "Adiabatische Kompression erhöht die innere Energie.",
                        q_net_equals_w_net: "Für einen vollständigen Kreisprozess gilt ΔU_net = 0, also Q_net = W_net.",
                        direct_change: "Bei W = 0 folgt ΔU direkt aus Q.",
                        calculate_work_first: "Berechne zuerst die Arbeit und setze dann in den 1. Hauptsatz ein.",
                        net_gain: "Ist die zugeführte Arbeit größer als der Wärmeverlust, steigt die innere Energie netto.",
                        state_function: "Die innere Energie ist eine Zustandsgröße.",
                        isochoric: "Im isochoren Prozess gilt W = 0.",
                        cooling: "Abkühlung verringert die innere Energie.",
                        temperature_constant: "Bei idealem Gas gilt bei konstanter Temperatur ΔU = 0.",
                        work_done_expanding: "Ein Teil der zugeführten Wärme geht in Expansionsarbeit.",
                        heat_at_constant_pressure: "Bei konstantem Druck entspricht dH der übertragenen Wärme.",
                        mayers_relation: "Nutze Cp = Cv + R.",
                        power_law: "Wende die adiabatische Potenzbeziehung an.",
                        calculus: "Diese Arbeitsformel stammt aus dem Druckintegral.",
                        isentropic: "Ein reversibel adiabatischer Prozess ist isentrop.",
                        mono_internal_energy: "Für ein einatomiges ideales Gas gilt U = 1,5nRT.",
                        direct_substitution: "Setze die Werte direkt in das Modell ein.",
                        linear_relation: "Hier ist die innere Energie linear proportional zur Temperatur.",
                        kinetic_energy_drops: "Sinkende Temperatur bedeutet geringere mittlere kinetische Energie.",
                        diatomic_internal_energy: "Für f = 5 gilt U = 2,5nRT.",
                        multiply_values: "Multipliziere n, Cv und ΔT sorgfältig.",
                        path_independent: "Zustandsgrößen hängen nicht vom Weg ab.",
                        n_cv_delta_t: "Verwende ΔU = nCvΔT.",
                        potential_energy: "Die Volumenabhängigkeit realer Gase stammt aus zwischenmolekularer potenzieller Energie.",
                        half: "Jeder aktive Freiheitsgrad trägt im Mittel 1/2 kT bei.",
                        behaves_like_monatomic: "Frieren Schwingungsmoden aus, verhält sich das Gas eher einatomig.",
                        also_pure_temperature_function: "Für das ideale Gas hängt auch die Enthalpie nur von der Temperatur ab.",
                        no_reaction_interaction: "Ohne Reaktions- oder Wechselwirkungsänderung bleibt ΔU insgesamt null.",
                        isoenergetic: "Ohne Temperaturänderung ändert sich bei idealem Gas auch die innere Energie nicht.",
                        work_against_forces: "Arbeit gegen Anziehungskräfte kann ein reales Gas abkühlen.",
                        vibration_modes: "Ein lineares dreiatomiges Molekül hat 3N-5 Schwingungsmoden.",
                        radiation_pressure: "Der Druck eines Photonengases beträgt ein Drittel der Energiedichte.",
                        monatomic: "Für einatomige Gase gilt f = 3.",
                        p_delta_v: "Verwende W = PΔV.",
                        no_displacement: "Ohne Volumenänderung gibt es keine Volumenarbeit.",
                        delta_u_zero: "Beim isothermen idealen Gasprozess gilt ΔU = 0.",
                        opposite_to_expansion: "Arbeit am System hat das entgegengesetzte Vorzeichen zur Expansionsarbeit.",
                        pv_diagram: "Mechanische Arbeit liest man im PV-Diagramm ab.",
                        energy: "Wärme und Arbeit sind Energiegrößen.",
                        negative_volume_change: "Bei Kompression ist ΔV negativ, daher auch die Systemarbeit.",
                        net_expansion: "Eine im Uhrzeigersinn durchlaufene Schleife bedeutet positive Nettoarbeit des Systems.",
                        value_8_314_times_300: "Berechne hier RT mit 8,314 × 300.",
                        expense_of_internal_energy: "Bei Q = 0 kommt die Arbeit aus der Abnahme der inneren Energie.",
                        sum: "Addiere die Teilarbeiten zum Gesamtwert.",
                        n_r_delta_t: "In diesem isobaren Fall gilt W = nRΔT.",
                        trajectory_matters: "Arbeit hängt vom thermodynamischen Weg ab.",
                        logarithmic_case: "Für n = 1 braucht man die logarithmische isotherme Formel.",
                        excluded_volume: "Die Van-der-Waals-Korrektur verwendet V - nb.",
                        regeneration: "Der ideale Stirling-Prozess enthält zwei isochore Regenerationsschritte.",
                        approximation: "Runde das Ergebnis sinnvoll.",
                        second_law: "Irreversible Prozesse erzeugen positive Entropie."
                },
                placeholders: {
                        isothermal: "isotherm",
                        constant: "Konstante",
                        state: "Zustand",
                        yes: "ja",
                        yes_label: "Ja",
                        negative: "Negativ",
                        polytropic_index: "Polytropenexponent",
                        decreases: "Nimmt ab",
                        state_function: "Zustandsgröße",
                        forces: "Kräfte",
                        intermolecular_forces: "Zwischenmolekulare Kräfte",
                        negative_cooling: "Negativ (Abkühlung)",
                        nine_approx: "9 (ungefähr)",
                        positive: "Positiv",
                        pressure_label: "Druck",
                        joule: "Joule",
                        joule_label: "Joule",
                        path: "Pfad",
                        path_label: "Pfad",
                        isothermal_logarithmic: "Isotherm (ln)",
                        constant_volume: "Konstantes Volumen"
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
                        optics: "Die CERN-Basel-Kollaboration nutzt fortschrittliche optische Systeme zur Teilchendetektion. Licht gehorcht dem Reflexionsgesetz (θᵢ = θᵣ) und dem Snelliusschen Brechungsgesetz (n_1sinθ_1 = n_2sinθ_2). Totalreflexion tritt auf, wenn Licht vom dichteren ins dünnere Medium bei Winkeln über dem kritischen Winkel übergeht und ermöglicht die Glasfaserkommunikation in Basels Telekommunikationsinfrastruktur. Einzelspaltbeugung erzeugt charakteristische Muster mit Minima bei asinθ = mλ. Beugungsgitter mit der Gleichung d·sinθ = mλ werden in Spektrometern bei Roche und Novartis für chemische Analysen eingesetzt. Das Rayleigh-Kriterium bestimmt die optischen Auflösungsgrenzen für die Teleskope der Basler Sternwarte."
                },
                objective_title: "Wellenanalyse",
                complete: "Modul abgeschlossen!",
                check: "Verifizieren",
                next: "Nächste Herausforderung",
                correct: "Welle verifiziert",
                incorrect: "Berechnung prüfen",
                monitor_title: "GP3.01_WELLEN_MONITOR",
                prompts: {
                        find_velocity: "Rhein-Wellenmonitoring: Berechne die Ausbreitungsgeschwindigkeit für die Navigationsplanung. Gegeben f={f} Hz und λ={lambda} m. Nutze v=fλ.",
                        find_wavelength: "Akustik-Kalibrierung in Basel: Bestimme die Wellenlänge aus Frequenz und Geschwindigkeit. Gegeben f={f} Hz und v={v} m/s. Nutze λ=v/f.",
                        find_frequency: "Signaldiagnose: Bestimme die Frequenz aus Wellengeschwindigkeit und Wellenlänge. Gegeben v={v} m/s und λ={lambda} m. Nutze f=v/λ.",
                        verify_wave_eq: "Technischer Plausibilitätscheck: Prüfe das Ergebnis der Wellengleichung. Gegeben f={f} Hz, λ={lambda} m und Kandidat v={v} m/s. Verifiziere v=fλ.",
                        water_wave: "Rheinoberflächenwelle: Schätze die Fortpflanzungsgeschwindigkeit für Uferreaktionszeiten. Gegeben f={f} Hz und λ={lambda} m. Verwende v=fλ.",
                        find_period: "Schwingungs-Timing: Wandle Frequenz in Periode für Abtastung um. Gegeben f={f} Hz. Nutze T=1/f.",
                        period_to_freq: "Regelkreis-Einstellung: Wandle Periode in Frequenz für den Signalgenerator um. Gegeben T={T} s. Nutze f=1/T.",
                        sound_in_air: "Konzertsaal-Soundcheck: Berechne die Wellenlänge von Schall in Luft. Gegeben v=340 m/s und f={f} Hz. Nutze λ=v/f.",
                        sound_in_water: "Unterwasser-Kommunikationstest: Berechne die Wellenlänge von Schall in Wasser. Gegeben v=1500 m/s und f={f} Hz. Nutze λ=v/f.",
                        speed_ratio: "Medienvergleich: Bestimme den Geschwindigkeitsvorteil von Wasser gegenüber Luft. Gegeben vWasser=1500 m/s und vLuft=340 m/s. Berechne vWasser/vLuft.",
                        doppler_approach: "Akustikmessung am Straßenrand: Die Sirenenquelle bewegt sich auf den Beobachter zu. Aufgabe: Entscheiden, ob die beobachtete Frequenz steigt oder sinkt. Nutzen: Doppler-Regel für Annäherung anwenden.",
                        doppler_recede: "Verkehrslärm-Analyse: Die Sirenenquelle entfernt sich vom Beobachter. Aufgabe: Entscheiden, ob die beobachtete Frequenz steigt oder sinkt. Nutzen: Doppler-Regel für Entfernung anwenden.",
                        constructive_interference: "Konzerthaus-Überlagerungstest: Zwei Wellen mit A=2 m treffen phasengleich zusammen. Aufgabe: Gesamtamplitude berechnen. Nutzen: konstruktive Addition anwenden.",
                        destructive_interference: "Noise-Cancelling-Demo: Zwei Wellen mit A=3 m treffen gegenphasig zusammen. Aufgabe: resultierende Amplitude berechnen. Nutzen: destruktive Subtraktion anwenden.",
                        beat_frequency: "Stimmtest im Proberaum: Zwei Stimmgabeln schwingen mit 440 Hz und 444 Hz. Aufgabe: Schwebungsfrequenz berechnen. Nutzen: |f₁-f₂| verwenden.",
                        de_broglie: "Quanten-Kalibrierung: Elektron mit m=9,1×10^{-31} kg und v=1 m/s. Aufgabe: De-Broglie-Wellenlänge bestimmen. Gegeben h=6,63×10^{-34}, nutze λ=h/(mv).",
                        wave_particle_duality: "Konzeptprüfung im Optiklabor: Bewerten Sie die Aussage, dass Licht Wellen- und Teilcheneigenschaften besitzt. Aufgabe: wahr oder falsch wählen. Nutzen: Welle-Teilchen-Modell sichern.",
                        photon_energy: "Photonenenergie-Check: Gegeben f=5×10^14 Hz und h=6,63×10^{-34}. Aufgabe: Energie E berechnen. Nutzen: Formel E=hf anwenden.",
                        matter_wave: "Materiewellen-Abschätzung: Für ein typisches Elektron gilt λ=h/(mv). Aufgabe: geeignete Größenordnung der Wellenlänge wählen. Nutzen: Materiewellenrelation deuten.",
                        uncertainty: "Messgrenzen-Review: Heisenberg-Beziehung ΔxΔp ≥ h/4π. Aufgabe: Entscheiden, ob Ort und Impuls gleichzeitig exakt bestimmbar sind. Nutzen: Unschärfeprinzip anwenden.",
                        same_phase_add: "Phasengleich-Test: Zwei Wellen mit A=2 m sind in Phase. Aufgabe: kombinierte Amplitude berechnen. Nutzen: direkte Amplitudenaddition.",
                        opposite_phase_cancel: "Gegenphasen-Test: Zwei Wellen mit A=3 m haben 180° Phasendifferenz. Aufgabe: Nettoamplitude berechnen. Nutzen: Differenzregel anwenden.",
                        constructive_max: "Spitzenwert-Check: Zwei Wellen mit A=1 m interferieren konstruktiv. Aufgabe: maximale Resultierende bestimmen. Nutzen: phasengleiche Überlagerung.",
                        partial_destructive: "Teilweise Auslöschung: Wellen mit A_1=5 m und A_2=3 m interferieren destruktiv. Aufgabe: Endamplitude berechnen. Nutzen: Beträge subtrahieren.",
                        interference_type: "Interferenz-Klassifikation: Zwei Wellen überlagern sich ohne Phasenverschiebung. Aufgabe: Interferenztyp bestimmen. Nutzen: Phasenlage korrekt zuordnen.",
                        standing_wave_node: "Resonanzaufgabe an der Saite: stehende Welle mit λ=2 m. Aufgabe: erste Knotenposition x_1 bestimmen. Nutze die Knotenformel.",
                        standing_wave_antinode: "Moden-Check: stehende Welle mit λ=4 m. Aufgabe: erste Bauchposition x_1 bestimmen. Nutze die Bauchformel.",
                        node_count: "Saitenabbildung: Länge 5 m, λ=2 m. Aufgabe: Anzahl der Knoten bestimmen. Nutze λ/2-Abstände.",
                        string_fundamental: "Grundmode der Saite: Beziehung L=λ/2. Gegeben λ=1 m. Aufgabe: L für den Grundton berechnen.",
                        harmonic_wavelength: "Harmonische Umrechnung: Grundwellenlänge λ_1=2 m. Aufgabe: Wellenlänge der 2. Harmonischen λ_2 berechnen.",
                        double_slit_spacing: "Doppelspalt-Kalibrierung: λ=500 nm, L=2 m, d=1 mm. Aufgabe: Streifenabstand Δy mit Δy=λL/d berechnen.",
                        fringe_order: "Interferenzschirm-Aufgabe: λ=600 nm, L=2 m, d=1,2 mm. Aufgabe: Position des 3. hellen Streifens y_3 berechnen.",
                        slit_separation: "Umkehrrechnung im Aufbau: λ=500 nm, L=1 m, Δy=1 mm. Aufgabe: Spaltabstand d aus den Messdaten bestimmen.",
                        wavelength_from_fringes: "Wellenlängenmessung: Δy=0,8 mm, d=0,5 mm, L=1 m. Aufgabe: λ berechnen.",
                        central_maximum: "Referenzprüfung am Doppelspalt: Aufgabe ist die Position des zentralen Maximums y_0 anzugeben.",
                        thin_film_constructive: "Dünnschicht-Design (n=2): λ=500 nm, Ordnung m=1, konstruktiver Fall. Aufgabe: nötige Dicke t berechnen.",
                        thin_film_destructive: "Dünnschicht-Design (n=2): λ=600 nm, Ordnung m=0, destruktiver Fall. Aufgabe: nötige Dicke t berechnen.",
                        newton_rings: "Newton-Ringe-Labor: λ=500 nm und Krümmungsradius R=1 m. Aufgabe: Radius des ersten hellen Rings r_1 berechnen.",
                        soap_bubble: "Seifenfilm-Beobachtung: n=1,33 und Dicke t=300 nm. Aufgabe: stark reflektierte Farbe durch Interferenz bestimmen.",
                        anti_reflection: "Entspiegelungs-Optimierung: Schicht mit n=2, Zielwellenlänge λ=400 nm. Aufgabe: minimale Dicke t berechnen.",
                        reflection_angle: "Spiegelausrichtung: Einfallswinkel beträgt 30 Grad. Aufgabe: Reflexionswinkel θ_r bestimmen.",
                        refraction_basic: "Brechungsaufgabe: Licht von Luft (n=1) nach Glas (n=1,5) bei 30 Grad Einfall. Aufgabe: θ_2 berechnen.",
                        light_speed_medium: "Medium-Geschwindigkeitscheck: Glas mit n=1,5. Aufgabe: Lichtgeschwindigkeit v mit v=c/n berechnen.",
                        refractive_index: "Material-Identifikation: gemessene Lichtgeschwindigkeit v=2×10^8 m/s. Aufgabe: Brechungsindex n bestimmen.",
                        normal_incidence: "Randbedingung: Licht fällt senkrecht auf die Grenzfläche. Aufgabe: Brechungswinkel θ_r angeben.",
                        critical_angle: "TIR-Schwellenwert: Übergang von Glas (n=1,5) zu Luft (n=1). Aufgabe: kritischen Winkel θ_c berechnen.",
                        total_internal_reflection: "Faser-Eintrittsprüfung: Einfallswinkel 50 Grad, θ_c=42 Grad. Aufgabe: entscheiden, ob Totalreflexion auftritt.",
                        fiber_optics: "Konzeptfrage Kommunikation: Aufgabe ist das Prinzip zu benennen, das Licht in Glasfasern einschließt.",
                        prism_dispersion: "Prismen-Spektroskopie: Aufgabe ist den Effekt zu benennen, der weißes Licht in Farben aufspaltet.",
                        brewster_angle: "Polarisationsaufgabe: Glas-Luft-Grenze mit tan θ_B=n_2/n_1. Aufgabe: Brewster-Winkel θ_B berechnen.",
                        single_slit_minima: "Einzelspalt-Aufgabe: a=1 mm und λ=500 nm. Aufgabe: Winkel des ersten Minimums θ_1 bestimmen.",
                        diffraction_width: "Musterbreite am Einzelspalt: a=0,6 mm, λ=600 nm, L=1 m. Aufgabe: Breite des zentralen Maximums w berechnen.",
                        rayleigh_criterion: "Teleskopauflösung: D=0,5 m und λ=500 nm. Aufgabe: minimal auflösbaren Winkel θ_min berechnen.",
                        circular_aperture: "Blendenabbildung: D=10 mm, f=100 mm, λ=500 nm. Aufgabe: Airy-Scheiben-Radius r berechnen.",
                        resolving_power: "Observatoriums-Check: Teleskopdurchmesser D=0,5 m bei λ=500 nm. Aufgabe: Auflösungsvermögen R berechnen.",
                        grating_equation: "Spektrometer-Aufbau: Gitterkonstante d=1 μm, λ=500 nm, Ordnung m=1. Aufgabe: Beugungswinkel θ_1 berechnen.",
                        grating_order: "Ordnungsgrenze: d=2 μm und λ=600 nm. Aufgabe: maximale beobachtbare Ordnung m_max berechnen.",
                        grating_spacing: "Gitter-Kalibrierung rückwärts: λ=500 nm, θ_1=30 Grad, m=1. Aufgabe: Linienabstand d bestimmen.",
                        spectral_resolution: "Spektralplanung: Ordnung m=2 und N=5000 Linien. Aufgabe: spektrale Auflösung R berechnen.",
                        blazed_grating: "Instrumenten-Konzeptfrage: Aufgabe ist den Zweck eines Blazegitters im Spektrometer zu benennen."
                },
                reasons: {
                        select_wave_equation: "Wähle die Wellengleichung, die zur gesuchten Größe passt.",
                        substitute_wave_values: "Setze die gegebenen Wellengrößen in die gewählte Gleichung ein.",
                        link_period_and_frequency: "Nutze die Kehrwertbeziehung zwischen Periodendauer und Frequenz.",
                        interpret_wave_concept: "Bestimme zuerst das maßgebliche Wellenkonzept und bewerte dann die Aussage.",
                        select_superposition_rule: "Wähle die Überlagerungsregel passend zur Phasenlage.",
                        select_interference_formula: "Nutze die Interferenzbeziehung, die zum beschriebenen Muster gehört.",
                        select_thin_film_rule: "Wähle die passende Dünnschichtbedingung für den angegebenen Fall.",
                        select_reflection_refraction_rule: "Wähle das hier passende Reflexions- oder Brechungsgesetz.",
                        select_critical_angle_rule: "Verwende für Totalreflexion die Bedingung zum Grenzwinkel.",
                        select_diffraction_rule: "Wende für Spalt- oder Blendenaufgaben die Beugungsbeziehung an.",
                        select_grating_rule: "Verwende für die angefragte Ordnung die Gittergleichung."
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
                        beats: "Schwebungsfrequenz = |f_1 - f_2|",
                        de_broglie: "λ = h/mv",
                        duality: "Licht ist sowohl Welle als auch Teilchen",
                        photon_energy: "E = hf",
                        matter_wave: "Alle Materie hat Welleneigenschaften",
                        uncertainty: "Beide können nicht genau bekannt sein",
                        in_phase: "Gleiche Phase: Amplituden addieren",
                        out_of_phase: "Gegenphase: Amplituden subtrahieren",
                        max_amplitude: "Konstruktiv: A_1 + A_2",
                        partial_cancel: "Teilweise destruktiv: |A_1 - A_2|",
                        interference_types: "In Phase = konstruktiv",
                        node_position: "Knoten: x = nλ/2",
                        antinode_position: "Bauch: x = (n + 1/2)λ/2",
                        node_count: "Zähle λ/2 Intervalle",
                        fundamental_mode: "Grundton: L = λ/2",
                        second_harmonic: "Zweite Oberschwingung: λ_2 = λ_1/2",
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
                        snells_law: "n_1sinθ_1 = n_2sinθ_2",
                        light_speed: "v = c/n",
                        index_calc: "n = c/v",
                        normal_ray: "Senkrecht: keine Brechung",
                        critical_angle: "sinθc = n_2/n_1",
                        tir_condition: "θ > θc verursacht Totalreflexion",
                        fiber_principle: "Totalreflexion",
                        dispersion: "Verschiedene λ brechen unterschiedlich",
                        brewster: "tanθB = n_2/n_1",
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
                },
                labels: {
                        answer: "\\text{Antwort}",
                        type: "\\text{Typ}",
                        color: "\\text{Farbe}",
                        yes_no: "\\text{Ja/Nein}",
                        principle: "\\text{Prinzip}",
                        effect: "\\text{Effekt}",
                        purpose: "\\text{Zweck}",
                        higher: "\\text{Höher}",
                        lower: "\\text{Niedriger}",
                        both_wave_particle: "\\text{Welle und Teilchen}",
                        yes_heisenberg: "\\text{Ja (Heisenberg)}",
                        constructive: "\\text{Konstruktiv}",
                        green_500nm: "\\text{Grün (500 nm)}",
                        yes_tir: "\\text{Ja (TIR tritt auf)}",
                        total_internal_reflection: "\\text{Totalreflexion}",
                        dispersion: "\\text{Dispersion}",
                        maximize_efficiency: "\\text{Effizienz maximieren}"
                },
                expr: {
                        same_phase_constructive: "\\text{Gleiche Phase} \\rightarrow \\text{konstruktiv}",
                        blaze_angle_efficiency: "\\text{Blazewinkel} \\rightarrow \\text{maximale Effizienz}"
                },
                placeholders: {
                        yes: "Ja",
                
                    higher: "higher",
                    lower: "lower",
                    both: "both",
                    constructive: "constructive",
                    green: "green",
                    tir: "TIR",
                    dispersion: "dispersion",
                    efficiency: "efficiency",                    v_6: "6",
                    v_2: "2",
                    v_4: "4",
                    v_30: "30",
                    v_32: "32",
                    v_0_dot_5: "0.5",
                    v_5: "5",
                    v_0_dot_68: "0.68",
                    v_3: "3",
                    v_4_dot_4: "4.4",
                    v_0: "0",
                    v_6_dot_63e_minus_34: "6.63e-34",
                    v_3_dot_31e_minus_19: "3.31e-19",
                    v_1e_minus_10: "1e-10",
                    v_1: "1",
                    v_400: "400",
                    v_250: "250",
                    v_150: "150",
                    v_100: "100",
                    v_22: "22",
                    v_2e8: "2e8",
                    v_1_dot_5: "1.5",
                    v_42: "42",
                    v_53: "53",
                    v_1e_minus_6: "1e-6",
                    v_1000: "1000",
                    v_10000: "10000"
}
        },

        // GP3.02: Elektromagnetismus Grundlagen
        gp3_02: {
                back: "Zurück zum Nexus",
                title: "GP3.02 // ELEKTROMAGNETISMUS GRUNDLAGEN",
                difficulty: {
                        basic: "BASIS",
                        core: "KERN",
                        advanced: "ERWEITERT",
                        elite: "ELITE"
                },
                stages: {
                        electric_field: "ELEKTRISCHE FELDER",
                        magnetic_field: "MAGNETFELDER",
                        particle_motion: "TEILCHENBEWEGUNG"
                },
                scenarios: {
                        electric_field: "Sie sind Forschungsingenieur im Roche Tower Basel und entwickeln einen fortschrittlichen elektrostatischen Abscheider zur Luftreinigung in pharmazeutischen Reinräumen. Das System nutzt elektrische Felder, um Luftpartikel zu entfernen und sterile Produktionsumgebungen für lebensrettende Medikamente zu gewährleisten. Die elektrische Feldstärke E = kQ/r^{2} (wobei k = 8,99×10^9 N·m^{2}/C^{2}) bestimmt die Kraft auf geladene Teilchen. Eine Punktladung Q erzeugt ein nach außen strahlendes elektrisches Feld, wobei Feldlinien Richtung und Stärke zeigen. Die Kraft auf eine Testladung q in diesem Feld ist F = qE. Das Verständnis elektrischer Felder ist entscheidend für die Entwicklung medizinischer Geräte, Teilchenbeschleuniger bei CERNs Basel-Kollaboration und Halbleiterfertigung bei lokalen Technologieunternehmen. Diese Prinzipien erklären auch Blitzschutzsysteme an Basels historischen Gebäuden und die Funktionsweise von Touchscreens in Smartphones.",
                        magnetic_field: "In der MRT-Abteilung des Universitätsspitals Basel kalibrieren Sie Magnetfeldsysteme für medizinische Bildgebung. Magnetfelder werden durch elektrische Ströme erzeugt und in Tesla (T) gemessen. Ein gerader stromführender Draht erzeugt ein kreisförmiges Magnetfeld mit Stärke B = μ₀I/(2πr), wobei μ₀ = 4π×10^{-7} T·m/A die Permeabilität des Vakuums ist. Die Rechte-Hand-Regel bestimmt die Feldrichtung: Daumen zeigt entlang des Stroms, Finger krümmen sich in Feldrichtung. Spulen (Solenoide) erzeugen im Inneren ein gleichmäßiges Feld B = μ₀nI, das in MRT-Geräten verwendet wird, um Wasserstoffatome im Körper der Patienten auszurichten. Die Kraft auf einen stromführenden Draht in einem Magnetfeld ist F = BILsinθ, was Elektromotoren in Basels Straßenbahnen und Zügen ermöglicht. Magnetschwebetechnik (Maglev) nutzt diese Prinzipien, und Basels Anbindung an das Schweizer Bahnnetz basiert auf elektromagnetischen Systemen.",
                        particle_motion: "Sie sind Physiker an CERNs Basel-Forschungseinrichtung und analysieren Trajektorien geladener Teilchen in elektromagnetischen Feldern für Large Hadron Collider-Experimente. Wenn ein geladenes Teilchen (Ladung q, Masse m) in ein elektrisches Feld E eintritt, erfährt es Kraft F = qE und Beschleunigung a = qE/m und folgt einer parabolischen Bahn wie bei Wurfbewegungen. In einem Magnetfeld B erfährt ein bewegtes geladenes Teilchen die Lorentzkraft F = qvB senkrecht zu Geschwindigkeit und Feld, was zu Kreisbewegung mit Radius r = mv/(qB) führt. Dieses Prinzip ermöglicht Massenspektrometer in Novartis- und Roche-Qualitätskontrolllaboren, Molekülmassen pharmazeutischer Verbindungen zu identifizieren. Geschwindigkeitsselektoren verwenden gekreuzte elektrische und magnetische Felder, wobei Teilchen nur bei v = E/B geradeaus fliegen und Ionen nach Geschwindigkeit trennen. Zyklotrone beschleunigen Teilchen auf Spiralbahnen für Krebsstrahlentherapie im Universitätsspital Basel. Das Verständnis der Teilchenbewegung ist wesentlich für die Entwicklung von Teilchendetektoren, Analyse kosmischer Strahlung und Entwicklung medizinischer Bildgebungstechnologien der nächsten Generation."
                },
                objective_title: "Elektromagnetische Analyse",
                complete: "Modul abgeschlossen!",
                check: "Überprüfen",
                next: "Nächste Herausforderung",
                correct: "Feld verifiziert",
                incorrect: "Berechnung prüfen",
                monitor_title: "GP3.02_EM_MONITOR",
                labels: {
                        loading: "Lädt...",
                        question: "Frage",
                        formula: "Formel",
                        placeholder_value: "Wert eingeben",
                        answer_field: "Feldstärke (N/C oder T)",
                        answer_force: "Kraft (N)",
                        answer_radius: "Radius (m)",
                        answer_velocity: "Geschwindigkeit (m/s)"
                },
                prompts: {
                        ef_field_from_qr: "Basler Reinraum-Elektrostatik: Berechne die elektrische Feldstärke für die Partikelfilterung. Gegeben Q={Q} C und r={r} m. Nutze E=kQ/r^2.",
                        ef_force_from_qr: "CERN-Kalibrierung: Bestimme die Kraft auf eine Testladung im Feld einer Punktladung. Gegeben Q={Q} C, r={r} m und q={q} C. Zuerst E berechnen, dann F=qE.",
                        mf_wire_field: "MRT-Leitungssicherheit: Bestimme das Magnetfeld um einen stromdurchflossenen Leiter. Gegeben I={I} A und r={r} m. Nutze B=μ₀I/(2πr).",
                        mf_solenoid_field: "Spulendesign im Spital: Berechne das homogene Magnetfeld im Solenoid. Gegeben N={N}, I={I} A und L={L} m. Nutze B=μ₀NI/L.",
                        pm_electric_force: "Teilcheninjektor: Berechne die elektrische Kraft im homogenen Feld. Gegeben q={q} C und E={E} N/C. Nutze F=qE.",
                        pm_magnetic_force: "Strahlablenkung: Berechne die Lorentzkraft (Betrag). Gegeben q={q} C, v={v} m/s und B={B} T (senkrecht). Nutze F=qvB.",
                        pm_radius: "Zyklotronbahn: Berechne den Kreisradius eines geladenen Teilchens. Gegeben m={m} kg, v={v} m/s, q={q} C und B={B} T. Nutze r=mv/(qB).",
                        pm_velocity_from_voltage: "Beschleunigungsrohr: Bestimme die Endgeschwindigkeit nach Spannungsgewinn. Gegeben q={q} C, V={V} V und m={m} kg. Nutze v=sqrt(2qV/m)."
                },
                reasons: {
                        select_field_or_force_formula: "Entscheide zuerst, ob nach Feldstärke oder nach Kraft gefragt ist.",
                        substitute_em_values: "Setze die gegebenen elektromagnetischen Größen in die gewählte Gleichung ein.",
                        select_magnetic_field_formula: "Wähle die Magnetfeldformel passend zu Leiter oder Solenoid.",
                        select_particle_motion_formula: "Nutze die Bewegungsgleichung, die zur gesuchten Größe passt."
                }
        },

        // GP3.03: Elektromagnetische Induktion
        gp3_03: {
                back: "Zurück zum Nexus",
                title: "GP3.03 // ELEKTROMAGNETISCHE INDUKTION",
                difficulty: {
                        basic: "BASIS",
                        core: "KERN",
                        advanced: "ERWEITERT",
                        elite: "ELITE"
                },
                stages: {
                        faradays_law: "FARADAYSCHES GESETZ",
                        lenzs_law: "LENZSCHE REGEL",
                        generators: "GENERATOREN & MOTOREN"
                },
                scenarios: {
                        faradays_law: "Sie sind Elektroingenieur im Kraftwerk Birsfelden, einem Wasserkraftwerk am Rhein bei Basel, und analysieren elektromagnetische Induktion in den Generatoren der Anlage. Das Faradaysche Induktionsgesetz besagt, dass eine Änderung des magnetischen Flusses durch eine Spule eine elektromotorische Kraft (EMK) induziert: ε = -N(ΔΦ/Δt), wobei N die Windungszahl, Φ der magnetische Fluss (Φ = BA), B die magnetische Feldstärke und A die Spulenfläche ist. Wenn sich ein Magnet durch eine Spule bewegt oder eine Spule in einem Magnetfeld rotiert, induziert der sich ändernde Fluss einen Strom. Je schneller die Änderung, desto größer die induzierte EMK. Dieses Prinzip versorgt Basels Stromnetz mit Energie und wandelt die kinetische Energie des Rheins in Elektrizität für Haushalte, Krankenhäuser und Industrie um. Das Verständnis des Faradayschen Gesetzes ist wesentlich für die Entwicklung von Transformatoren bei ABB Schweiz, kabellosen Ladesystemen für Elektrofahrzeuge und Induktionskochfeldern in modernen Basler Küchen. Dieselbe Physik ermöglicht Metalldetektoren am Flughafen Basel und Magnetkartenleser im öffentlichen Verkehr.",
                        lenzs_law: "Im Physiklabor der Universität Basel demonstrieren Sie die Lenzsche Regel, die die Richtung des induzierten Stroms bestimmt. Die Lenzsche Regel besagt, dass der induzierte Strom in einer Richtung fließt, die der Änderung des magnetischen Flusses entgegenwirkt, die ihn verursacht hat, und so Energie erhält. Wenn sich der Nordpol eines Magneten einer Spule nähert, erzeugt der induzierte Strom ein Magnetfeld mit einem Nordpol, der dem Magneten zugewandt ist und ihn abstößt. Wenn sich der Magnet entfernt, zeigt der Südpol des induzierten Feldes zum Magneten und zieht ihn an. Dieser Widerstand erfordert Arbeit und wandelt mechanische Energie in elektrische Energie um. Die Lenzsche Regel erklärt elektromagnetisches Bremsen in Basels Straßenbahnen: Wenn Bremsen aktiviert werden, erzeugen induzierte Ströme in Metallscheiben entgegengesetzte Magnetkräfte, die das Fahrzeug ohne Reibung verlangsamen. Wirbelströme in Aluminiumblechen demonstrieren dieses Prinzip, das in Recyclinganlagen zur Metalltrennung verwendet wird. Das Verständnis der Lenzschen Regel ist entscheidend für die Entwicklung regenerativer Bremssysteme in Elektrofahrzeugen, magnetischer Dämpfer in Basels modernen Gebäuden zum Erdbebenschutz und berührungsloser Bremssysteme in Hochgeschwindigkeitszügen.",
                        generators: "Sie sind Energiesystemingenieur bei Axpo Energy und entwickeln und warten Generatoren für das mit Basel verbundene Schweizer Stromnetz. Elektrische Generatoren wandeln mechanische Energie mittels elektromagnetischer Induktion in elektrische Energie um. In einem Wechselstromgenerator rotiert eine Spule in einem Magnetfeld, ändert kontinuierlich den Fluss und induziert eine sinusförmige EMK: ε = NABω sin(ωt), wobei ω die Winkelgeschwindigkeit ist. Die Wasserkraftwerke des Rheins nutzen Turbinen, um Generatorspulen zu drehen und Wechselstrom mit 50 Hz für Basels Stromnetz zu erzeugen. Gleichstromgeneratoren verwenden Kommutatoren zur Erzeugung von Gleichstrom und versorgen Basels Straßenbahnsystem. Elektromotoren arbeiten umgekehrt: Elektrische Energie erzeugt magnetische Kräfte, die Rotation erzeugen, verwendet in allem von Basels Industriemaschinen bis zu Haushaltsgeräten. Transformatoren nutzen gegenseitige Induktion zur Änderung von Spannungsniveaus: Aufwärtstransformatoren erhöhen die Spannung für Fernübertragung von Birsfelden nach Basel, während Abwärtstransformatoren die Spannung für sichere Haushaltsnutzung reduzieren. Das Verständnis von Generatoren und Motoren ist wesentlich für erneuerbare Energiesysteme, Elektrofahrzeugdesign und die Wartung von Basels nachhaltiger Energieinfrastruktur."
                },
                objective_title: "Induktionsanalyse",
                complete: "Modul abgeschlossen!",
                check: "Überprüfen",
                next: "Nächste Herausforderung",
                correct: "Induktion verifiziert",
                incorrect: "Berechnung prüfen",
                monitor_title: "GP3.03_INDUKTION_MONITOR",
                labels: {
                        direction_effect: "Richtung/Effekt",
                        answer: "Antwort",
                        emf: "EMK (V)",
                        voltage: "Spannung (V)",
                        value: "Wert",
                        output_power: "Ausgangsleistung (W)",
                        type_value: "Wert eingeben",
                        type_answer: "Antwort eingeben",
                        loading: "Lädt...",
                        question_id: "Frage {id}"
                },
                expressions: {
                        lenz_law: "\\text{Lenz'sches Gesetz: induzierte Effekte wirken der Änderung entgegen}",
                        generator_principles: "\\text{Generatorprinzipien}",
                        generator_principles_label: "Generatorprinzipien"
                },
                prompts: {
                        faraday_basic: "Rhein-Generatorcheck: Der magnetische Fluss ändert sich um {flux} Wb in {time} s. Aufgabe: Berechnen Sie die induzierte EMK ε mit dem Faraday-Gesetz. Nutzen: Reaktionsverhalten der Anlage abschätzen.",
                        faraday_core: "Spulentest im Netzlabor: N={turns}, Flussänderung {flux} Wb in {time} s. Aufgabe: Berechnen Sie die induzierte EMK ε. Nutzen: Wicklungsparameter verifizieren.",
                        faraday_advanced: "Turbinen-Prüfstand: N={turns}, A={area} m^{2}, Feldänderung {field} T in {time} s. Aufgabe: Bestimmen Sie ε. Nutzen: Sicherheitsreserve des Designs prüfen.",
                        faraday_elite: "Hochlast-Generatorlauf: N={turns}, A={area} m^{2}, B={field} T, f={freq} Hz. Aufgabe: Bestimmen Sie die EMK-Größenordnung. Nutzen: Spitzenbetrieb vorhersagen.",
                        lenz_magnet_approaching: "Bremsdemonstration: Ein Nordpol nähert sich der Spule. Aufgabe: Richtung des induzierten Stroms angeben. Nutzen: Widerstand gegen Flusszunahme erklären.",
                        lenz_magnet_leaving: "Magnet-Entfernungsversuch: Ein Nordpol entfernt sich von der Spule. Aufgabe: Richtung des induzierten Stroms bestimmen. Nutzen: Gegenwirkung bei Flussabnahme begründen.",
                        lenz_field_increasing: "Ansteigendes Feld: Das äußere B-Feld durch die Schleife nimmt zu. Aufgabe: Richtung des induzierten Feldes angeben. Nutzen: Lenz-Regel korrekt anwenden.",
                        lenz_field_decreasing: "Abfallendes Feld: Das äußere B-Feld durch die Schleife nimmt ab. Aufgabe: Richtung des induzierten Feldes angeben. Nutzen: rückstellende Gegenwirkung erklären.",
                        lenz_coil_entering: "Förderband-Spulenversuch: Die Spule tritt in ein Magnetfeld ein. Aufgabe: Verhalten des induzierten Stroms bestimmen. Nutzen: Richtung aus Flussänderung ableiten.",
                        lenz_falling_magnet: "Fallrohr-Aufbau: Ein Magnet fällt durch eine Spule. Aufgabe: den induzierten Effekt beschreiben. Nutzen: Energieumwandlung mechanisch -> elektrisch einordnen.",
                        lenz_rotating_coil: "Rotorbeobachtung: Eine Spule rotiert im Magnetfeld. Aufgabe: Stromart bestimmen. Nutzen: periodische Flussänderung mit Ausgangssignal verknüpfen.",
                        lenz_moving_conductor: "Leiter-Schienenversuch: Ein Leiter bewegt sich im B-Feld. Aufgabe: Kraft-/Stromrichtung bestimmen. Nutzen: Bewegungsinduktion anwenden.",
                        lenz_changing_current: "Induktor-Anlauf: Der Spulenstrom steigt an. Aufgabe: Tendenz der induzierten EMK angeben. Nutzen: Gegenwirkung auf Stromänderung erklären.",
                        lenz_transformer: "Transformator-Prüfstand: AC liegt an der Primärspule an. Aufgabe: Wirkung in der Sekundärspule bestimmen. Nutzen: induktive Energieübertragung erklären.",
                        lenz_eddy_currents: "Metallsortierung: Eine Platte bewegt sich im Magnetfeld. Aufgabe: Haupteffekt bestimmen. Nutzen: Wirbelströme mit Bremsung/Erwärmung verknüpfen.",
                        lenz_self_inductance: "Einspulen-Pulstest: Strom ändert sich in derselben Spule. Aufgabe: Selbstinduktions-Effekt bestimmen. Nutzen: interne Gegenkopplung im Kreis erklären.",
                        lenz_mutual_inductance: "Zweispulen-Kopplung: Strom in Spule A verändert sich. Aufgabe: Einfluss auf Spule B angeben. Nutzen: Richtung/Wirkung der Gegeninduktion deuten.",
                        lenz_lenz_brake: "Elektromagnetische Bremse: Eine leitende Scheibe rotiert im B-Feld. Aufgabe: Rotationsänderung bestimmen. Nutzen: induzierten Bremsmoment erklären.",
                        lenz_induction_heating: "Induktionsheiz-Modell: AC-Spule nahe Metall. Aufgabe: resultierenden Effekt beschreiben. Nutzen: Wärmeentstehung durch Wirbelströme erklären.",
                        lenz_maglev_train: "Maglev-Prototyp: Ein bewegter Magnet fährt über einen Leiter. Aufgabe: Kraftrichtung/Effekt bestimmen. Nutzen: Auftrieb und Bremswirkung erklären.",
                        lenz_induction_motor: "Motortrainer: Rotierendes B-Feld wirkt auf den Rotor. Aufgabe: Rotorverhalten angeben. Nutzen: Richtung des induzierten Drehmoments ableiten.",
                        lenz_wireless_charging: "Wireless-Charging-Test: AC in der Sendespule. Aufgabe: Effekt auf der Empfängerseite bestimmen. Nutzen: induktive Energieübertragung beschreiben.",
                        lenz_metal_detector: "Sicherheitsschleuse: Metall nähert sich der Spule. Aufgabe: Signaländerung bestimmen. Nutzen: Detektionsprinzip begründen.",
                        lenz_regenerative_braking: "Rekuperationsanalyse: Motor arbeitet als Generator. Aufgabe: Energieflussrichtung angeben. Nutzen: Rückgewinnung beim Bremsen erklären.",
                        generator_basic_ac: "Generator-Grundlagen: Eine Spule rotiert im Magnetfeld. Aufgabe: Ausgangsart bestimmen. Nutzen: AC-Erzeugung einordnen.",
                        generator_basic_dc: "Kommutator-Konzept: Generator mit Kommutator. Aufgabe: Ausgangsart bestimmen. Nutzen: DC- und AC-Konfiguration unterscheiden.",
                        generator_basic_frequency: "Netzsynchronisation: Ausgangsfrequenz wird geprüft. Aufgabe: Hauptabhängigkeit benennen. Nutzen: Zusammenhang von Drehzahl/Polzahl verstehen.",
                        generator_basic_voltage: "Inbetriebnahme-Check: Klemmenspannung wird bewertet. Aufgabe: wichtigste Abhängigkeit benennen. Nutzen: Designparameter mit Spannung verknüpfen.",
                        generator_basic_power: "Anlagenbetrieb: Elektrische Leistung wird ausgewertet. Aufgabe: wichtigste Abhängigkeit benennen. Nutzen: Beziehung zu Spannung/Strom/Last verstehen.",
                        generator_core: "Nennbetrieb-Rechnung: N={turns}, A={area} m^{2}, B={field} T, Drehzahl {speed} rpm. Aufgabe: Ausgangsspannung V berechnen. Nutzen: Sollwert vor Netzaufschaltung prüfen.",
                        generator_adv_find_current: "Leistungsabgabe-Prüfung: Gegeben P={power} W und V={voltage} V. Aufgabe: Strom I berechnen. Nutzen: Kabelbelastung validieren.",
                        generator_adv_find_voltage: "Sammelschienen-Prüfung: Gegeben P={power} W und I={current} A. Aufgabe: Spannung V berechnen. Nutzen: Betriebspunkt bestätigen.",
                        generator_adv_find_power: "Lastanalyse: Gegeben V={voltage} V und I={current} A. Aufgabe: Leistung P berechnen. Nutzen: aktuellen Erzeugungsstatus bewerten.",
                        generator_elite: "Wirkungsgrad-Audit: Ein {type}-Generator arbeitet mit {efficiency}% Wirkungsgrad bei {input} W Eingangsleistung. Aufgabe: Ausgangsleistung bestimmen. Nutzen: Anlagenperformance vergleichen.",
                        generator_type_hydro: "Wasserkraft",
                        generator_type_wind: "Windkraft",
                        generator_type_thermal: "Thermisch",
                        generator_type_solar: "Solar",
                        generator_type_nuclear: "Kernkraft"
                },
                reasons: {
                        select_faraday_formula: "Wähle die Form des Faraday-Gesetzes passend zur Flussänderung.",
                        substitute_induction_values: "Setze die gegebenen Induktionsgrößen in die gewählte Formel ein.",
                        apply_lenz_direction_rule: "Nutze die Lenzsche Regel, um Richtung oder Effekt des induzierten Stroms zu bestimmen.",
                        select_generator_formula: "Wähle die Generatorgleichung passend zu Spannung, Leistung oder Wirkungsgrad."
                }
        },

        // SP1.03: Weather & Climate
        sp1_03: {
                title: "SP1.03 // WETTER & KLIMA",
                back: "Zurück",
                difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
                placeholders: {
                        name: "Name",
                        hpa: "hPa",
                        formula: "Formel"
                },
                stages: {
                        atmosphere: "ATMOSPHÄRE",
                        weather: "WETTERPHÄNOMENE",
                        climate: "KLIMASYSTEM"
                },
                check: "Verifizieren",
                next: "Nächste Herausforderung",
                correct: "Daten verifiziert",
                incorrect: "Parameter prüfen",
                monitor_title: "METEOROLOGIE_V1",
                loading: "Lädt...",
                labels: { mission_objective: "METEOROLOGISCHE ANALYSE", terminal_input: "DATENEINGABE", hint: "HINWEIS", sensor_feed: "SENSOR-DATENSTROM", layer: "Schicht", gas: "Gas" },
                prompts: {
                        sp1_03_q1: "Identifizieren Sie die Schicht der Atmosphäre.",
                        sp1_03_q2: "Was ist der Standard-Luftdruck auf Meereshöhe (hPa)?",
                        sp1_03_q3: "Identifizieren Sie das wichtigste Treibhausgas (Formel)."
                },
                answers: {
                        troposphere: "Troposphäre"
                },
                reasons: {
                        atmosphere_focus: "Bestimmen Sie zuerst, auf welche Atmosphärenschicht oder Region sich die Aufgabe bezieht.",
                        weather_focus: "Bestimmen Sie zuerst die Wettergröße oder den Standardwert, der in der Aufgabe beschrieben wird.",
                        climate_focus: "Bestimmen Sie zuerst das Klimasystem-Konzept oder die Treibhausbeziehung, die geprüft wird.",
                        match_expected_term: "Ordnen Sie der gesuchten Größe den passenden Fachbegriff oder Standardwert zu."
                }
        },

        // SP1.04: Astronomy Basics
        sp1_04: {
                title: "SP1.04 // ASTRONOMIE GRUNDLAGEN",
                back: "Zurück",
                difficulty: { basic: "BASIS", core: "KERN", advanced: "FORTGESCHRITTEN", elite: "ELITE" },
                placeholders: {
                        name: "Name",
                        degrees: "Grad"
                },
                stages: {
                        solar_system: "SONNENSYSTEM",
                        moon_phases: "MONDPHASEN",
                        seasons: "JAHRESZEITEN"
                },
                check: "Verifizieren",
                next: "Nächste Herausforderung",
                correct: "Koordinaten bestätigt",
                incorrect: "Orbit-Anomalie",
                monitor_title: "ASTRONOMIE_V1",
                loading: "Lädt...",
                labels: { mission_objective: "ORBITAL-ANALYSE", terminal_input: "TELEMETRIE", hint: "HINWEIS", sensor_feed: "SENSOR-DATENSTROM", planet: "Planet", phase: "Phase" },
                answers: {
                        jupiter: "Jupiter",
                        full: "Vollmond",
                        full_moon: "Vollmond"
                },
                prompts: {
                        sp1_04_q1: "Identifizieren Sie den größten Planeten im Sonnensystem.",
                        sp1_04_q2: "Identifizieren Sie die Phase, wenn der Mond voll beleuchtet ist.",
                        sp1_04_q3: "Wie groß ist die Achsneigung der Erde in Grad?"
                },
                reasons: {
                        solar_system_focus: "Bestimmen Sie zuerst, nach welchem Himmelskörper oder welcher Tatsache des Sonnensystems gefragt wird.",
                        moon_phases_focus: "Bestimmen Sie zuerst, welche Mondphase zur beschriebenen Beleuchtung passt.",
                        seasons_focus: "Bestimmen Sie zuerst die geometrische Größe des Erde-Sonne-Systems, die die Jahreszeiten erklärt.",
                        identify_expected_astronomy_term: "Ordnen Sie der Zielgröße den passenden astronomischen Begriff oder Zahlenwert zu."
                }
        }
};
