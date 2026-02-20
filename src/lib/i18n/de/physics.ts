/**
 * DE - PHYSIK Übersetzungen
 * VOLLSTÄNDIGE VERSION - Reorganisiert nach pädagogischer Reihenfolge (Sek 3 Basel).
 */

export const dePhysics = {


        /* SP1.01_DATA_START */
        sp1_01: {
                "title": "SP1.01 // Kräftemodell",
                "back": "Zurück",
                "footer_left": "SP1.01_Mechanik // Knoten: Basel",
                "check": "Kraft prüfen",
                "next": "Nächste Aufgabe",
                "correct": "Gleichgewicht",
                "incorrect": "Abweichung",
                "ready": "BEREIT",
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
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": ""
                },
                "SP1.01.002": {
                        "prompt": "Was ist die SI-Einheit der Kraft?",
                        "feedback": {
                                "correct": "Richtig! Das Newton (N) ist die SI-Einheit der Kraft.",
                                "incorrect": "Die SI-Einheit der Kraft ist das Newton (N)."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.003": {
                        "prompt": "Wandeln Sie 5000 N in kN um.",
                        "feedback": {
                                "correct": "Ausgezeichnet! 5000 N = 5 kN",
                                "incorrect": "Denken Sie daran: 1 kN = 1000 N"
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "kN"
                },
                "SP1.01.004": {
                        "prompt": "Wandeln Sie 2.5 MN in N um.",
                        "feedback": {
                                "correct": "Perfekt! 2.5 MN = 2.500.000 N",
                                "incorrect": "Denken Sie daran: 1 MN = 1.000.000 N"
                        },
                        "scenario": "",
                        "scenario_desc": "",
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
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": ""
                },
                "SP1.01.006": {
                        "prompt": "Eine Kraft von 50 N wirkt auf ein Objekt. Was ist der Betrag dieser Kraft?",
                        "feedback": {
                                "correct": "Richtig! Der Betrag ist 50 N.",
                                "incorrect": "Der Betrag ist der numerische Wert: 50 N."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.007": {
                        "prompt": "Wandeln Sie 750 kN in MN um.",
                        "feedback": {
                                "correct": "Großartig! 750 kN = 0.75 MN",
                                "incorrect": "Denken Sie daran: 1000 kN = 1 MN"
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "MN"
                },
                "SP1.01.008": {
                        "prompt": "Ein Buch liegt auf einem Tisch. Wenn das Buch 20 N wiegt, wie groß ist die Normalkraft vom Tisch?",
                        "feedback": {
                                "correct": "Richtig! Die Normalkraft entspricht dem Gewicht: 20 N.",
                                "incorrect": "Der Tisch drückt mit der gleichen Kraft nach oben wie das Gewicht des Buches."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.009": {
                        "prompt": "Wandeln Sie 0.025 MN in kN um.",
                        "feedback": {
                                "correct": "Ausgezeichnet! 0.025 MN = 25 kN",
                                "incorrect": "Denken Sie daran: 1 MN = 1000 kN"
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "kN"
                },
                "SP1.01.010": {
                        "prompt": "Sie schieben eine Kiste mit einer Kraft von 100 N nach rechts. Was ist die Richtung der Kraft?",
                        "feedback": {
                                "correct": "Richtig! Die Kraft ist nach rechts gerichtet.",
                                "incorrect": "Die Richtung ist nach rechts (0 Grad von der Horizontalen)."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": ""
                },
                "SP1.01.011": {
                        "prompt": "Wandeln Sie 3500 N in kN um.",
                        "feedback": {
                                "correct": "Perfekt! 3500 N = 3.5 kN",
                                "incorrect": "Teilen Sie durch 1000, um N in kN umzuwandeln."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "kN"
                },
                "SP1.01.012": {
                        "prompt": "Eine Kraft wirkt vertikal nach oben. Welchen Winkel bildet sie mit der Horizontalen?",
                        "feedback": {
                                "correct": "Richtig! Vertikal nach oben ist 90 Grad von der Horizontalen.",
                                "incorrect": "Vertikal nach oben ist senkrecht zur Horizontalen: 90 Grad."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "degrees"
                },
                "SP1.01.013": {
                        "prompt": "Wandeln Sie 1.2 MN in N um.",
                        "feedback": {
                                "correct": "Großartig! 1.2 MN = 1.200.000 N",
                                "incorrect": "Multiplizieren Sie mit 1.000.000, um MN in N umzuwandeln."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.014": {
                        "prompt": "Zwei Personen schieben ein Auto. Person A wendet 200 N und Person B 150 N in die gleiche Richtung an. Was ist die Gesamtkraft?",
                        "feedback": {
                                "correct": "Richtig! 200 N + 150 N = 350 N",
                                "incorrect": "Addieren Sie die Kräfte, wenn sie in die gleiche Richtung wirken."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.015": {
                        "prompt": "Wandeln Sie 450 kN in MN um.",
                        "feedback": {
                                "correct": "Ausgezeichnet! 450 kN = 0.45 MN",
                                "incorrect": "Teilen Sie durch 1000, um kN in MN umzuwandeln."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "MN"
                },
                "SP1.01.016": {
                        "prompt": "Eine Kraft von 80 N wirkt in einem Winkel von 30° über der Horizontalen. Was ist die horizontale Komponente dieser Kraft?",
                        "feedback": {
                                "correct": "Richtig! F_x = F × cos(30°) = 80 × 0.866 = 69.28 N",
                                "incorrect": "Verwenden Sie F_x = F × cos(θ), um die horizontale Komponente zu finden."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.017": {
                        "prompt": "Eine Kraft von 80 N wirkt in einem Winkel von 30° über der Horizontalen. Was ist die vertikale Komponente dieser Kraft?",
                        "feedback": {
                                "correct": "Richtig! F_y = F × sin(30°) = 80 × 0.5 = 40 N",
                                "incorrect": "Verwenden Sie F_y = F × sin(θ), um die vertikale Komponente zu finden."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.018": {
                        "prompt": "Eine Kraft hat die Komponenten F_x = 60 N und F_y = 80 N. Was ist der Betrag der Kraft?",
                        "feedback": {
                                "correct": "Richtig! F = √(60^{2} + 80^{2}) = √10000 = 100 N",
                                "incorrect": "Verwenden Sie den Satz des Pythagoras: F = √(F_x^{2} + F_y^{2})"
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.019": {
                        "prompt": "Eine Kraft hat die Komponenten F_x = 60 N und F_y = 80 N. Welchen Winkel bildet sie mit der Horizontalen?",
                        "feedback": {
                                "correct": "Richtig! θ = arctan(80/60) = arctan(1.333) = 53.13°",
                                "incorrect": "Verwenden Sie θ = arctan(F_y/F_x), um den Winkel zu finden."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "degrees"
                },
                "SP1.01.020": {
                        "prompt": "Eine 50 N Kraft wirkt in einem Winkel von 45° über der Horizontalen. Was ist ihre horizontale Komponente?",
                        "feedback": {
                                "correct": "Richtig! F_x = 50 × cos(45°) = 50 × 0.707 = 35.36 N",
                                "incorrect": "Bei 45° ist cos(45°) = sin(45°) = 0.707"
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.021": {
                        "prompt": "Eine 50 N Kraft wirkt in einem Winkel von 45° über der Horizontalen. Was ist ihre vertikale Komponente?",
                        "feedback": {
                                "correct": "Richtig! F_y = 50 × sin(45°) = 50 × 0.707 = 35.36 N",
                                "incorrect": "Bei 45° sind die horizontale und vertikale Komponente gleich."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.022": {
                        "prompt": "Eine Kraft von 100 N wirkt in einem Winkel von 60° über der Horizontalen. Was ist ihre vertikale Komponente?",
                        "feedback": {
                                "correct": "Richtig! F_y = 100 × sin(60°) = 100 × 0.866 = 86.60 N",
                                "incorrect": "Denken Sie daran: sin(60°) = 0.866"
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.023": {
                        "prompt": "Eine Kraft von 100 N wirkt in einem Winkel von 60° über der Horizontalen. Was ist ihre horizontale Komponente?",
                        "feedback": {
                                "correct": "Richtig! F_x = 100 × cos(60°) = 100 × 0.5 = 50 N",
                                "incorrect": "Denken Sie daran: cos(60°) = 0.5"
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.024": {
                        "prompt": "Zwei Kräfte wirken auf ein Objekt: 30 N nach rechts und 40 N nach oben. Was ist der Betrag der resultierenden Kraft?",
                        "feedback": {
                                "correct": "Richtig! F = √(30^{2} + 40^{2}) = 50 N",
                                "incorrect": "Verwenden Sie den Satz des Pythagoras für senkrechte Kräfte."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.042": {
                        "prompt": "Zwei Kräfte von jeweils 50 N wirken rechtwinklig zueinander. Was ist der Betrag der Resultierenden?",
                        "feedback": {
                                "correct": "Richtig! F = √(50^{2} + 50^{2}) = 70.71 N",
                                "incorrect": "Für gleiche senkrechte Kräfte gilt F = F_1√2"
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.043": {
                        "prompt": "Eine Kraft von 20 N wirkt nach Osten und eine weitere 15 N wirkt nach Norden. Was ist der Betrag der Resultierenden?",
                        "feedback": {
                                "correct": "Richtig! F = √(20^{2} + 15^{2}) = 25 N",
                                "incorrect": "Dies ist ein 3-4-5-Dreieck, das um 5 skaliert ist."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.044": {
                        "prompt": "Zwei Kräfte wirken in die gleiche Richtung: 80 N und 120 N. Was ist der Betrag der Resultierenden?",
                        "feedback": {
                                "correct": "Richtig! Kräfte in die gleiche Richtung addieren sich: 80 + 120 = 200 N",
                                "incorrect": "Wenn Kräfte in die gleiche Richtung wirken, addieren Sie sie einfach."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.045": {
                        "prompt": "Zwei Kräfte wirken in entgegengesetzte Richtungen: 150 N nach rechts und 90 N nach links. Was ist der Betrag der Resultierenden?",
                        "feedback": {
                                "correct": "Richtig! Kräfte in entgegengesetzte Richtungen subtrahieren sich: 150 - 90 = 60 N",
                                "incorrect": "Wenn Kräfte einander entgegenwirken, subtrahieren Sie die kleinere von der größeren."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.026": {
                        "prompt": "Zwei Kräfte von 60 N und 80 N wirken rechtwinklig zueinander. Was ist der Betrag der resultierenden Kraft?",
                        "feedback": {
                                "correct": "Richtig! F = √(60^{2} + 80^{2}) = 100 N",
                                "incorrect": "Verwenden Sie den Satz des Pythagoras für senkrechte Kräfte."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.027": {
                        "prompt": "Eine Kraft von 100 N wirkt bei 0° und eine weitere Kraft von 100 N wirkt bei 90°. Welchen Winkel bildet die Resultierende mit der Horizontalen?",
                        "feedback": {
                                "correct": "Richtig! θ = arctan(100/100) = 45°",
                                "incorrect": "Verwenden Sie θ = arctan(F_y/F_x), um den Winkel zu finden."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "degrees"
                },
                "SP1.01.028": {
                        "prompt": "Drei Kräfte wirken auf ein Objekt: 20 N nach Osten, 30 N nach Norden und 10 N nach Westen. Was ist der Betrag der resultierenden Kraft?",
                        "feedback": {
                                "correct": "Richtig! Netto horizontal: 20-10=10 N, vertikal: 30 N. F = √(10^{2} + 30^{2}) = 31.62 N",
                                "incorrect": "Finden Sie zuerst die Nettokraft in jede Richtung, dann verwenden Sie den Satz des Pythagoras."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.029": {
                        "prompt": "Zwei Kräfte gleicher Größe wirken in einem Winkel von 60° zueinander. Wenn jede Kraft 50 N beträgt, was ist der Betrag der Resultierenden?",
                        "feedback": {
                                "correct": "Richtig! Für gleiche Kräfte bei 60°: F = 2F_1cos(30°) = 2(50)(0.866) = 86.60 N",
                                "incorrect": "Verwenden Sie das Parallelogrammgesetz oder zerlegen Sie in Komponenten."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.030": {
                        "prompt": "Eine Kraft von 40 N wirkt in einem Winkel von 30° über der Horizontalen und eine weitere 60 N wirkt horizontal. Was ist die horizontale Komponente der Resultierenden?",
                        "feedback": {
                                "correct": "Richtig! F_x = 40cos(30°) + 60 = 34.64 + 60 = 94.64 N",
                                "incorrect": "Addieren Sie die horizontalen Komponenten beider Kräfte."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.031": {
                        "prompt": "Zwei Kräfte wirken auf einen Punkt: 100 N bei 0° und 100 N bei 120°. Was ist der Betrag der resultierenden Kraft?",
                        "feedback": {
                                "correct": "Richtig! F_x = 100 + 100cos(120°) = 50 N, F_y = 100sin(120°) = 86.6 N. F = √(50^{2} + 86.6^{2}) = 100 N",
                                "incorrect": "Zerlegen Sie jede Kraft in Komponenten, addieren Sie sie und finden Sie den Betrag."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.032": {
                        "prompt": "Vier Kräfte wirken auf ein Objekt: 50 N nach Norden, 30 N nach Süden, 40 N nach Osten und 20 N nach Westen. Was ist der Betrag der Resultierenden?",
                        "feedback": {
                                "correct": "Richtig! Netto: 20 N nach Norden, 20 N nach Osten. F = √(20^{2} + 20^{2}) = 28.28 N",
                                "incorrect": "Finden Sie zuerst die Nettokraft in jede Richtung."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.033": {
                        "prompt": "Eine Kraft von 80 N wirkt bei 45° und eine weitere 60 N wirkt bei 135°. Was ist die vertikale Komponente der Resultierenden?",
                        "feedback": {
                                "correct": "Richtig! F_y = 80sin(45°) + 60sin(135°) = 56.57 + 42.43 = 98.99 N",
                                "incorrect": "Addieren Sie die vertikalen Komponenten beider Kräfte."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.034": {
                        "prompt": "Drei Kräfte wirken auf ein Objekt: 100 N bei 0°, 80 N bei 60° und 60 N bei 150°. Was ist der Betrag der resultierenden Kraft?",
                        "feedback": {
                                "correct": "Richtig! F_x = 100 + 80cos(60°) + 60cos(150°) = 88.04 N, F_y = 80sin(60°) + 60sin(150°) = 99.28 N. F = 118.32 N",
                                "incorrect": "Zerlegen Sie alle Kräfte in x- und y-Komponenten, summieren Sie sie und finden Sie den Betrag."
                        },
                        "scenario": "",
                        "scenario_desc": "",
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
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.037": {
                        "prompt": "Eine Kraft von 200 N wirkt in einem Winkel von 30° über der Horizontalen und eine weitere 150 N wirkt in einem Winkel von 45° unter der Horizontalen. Was ist der Betrag der Resultierenden?",
                        "feedback": {
                                "correct": "Richtig! F_x = 200cos(30°) + 150cos(-45°) = 279.28 N, F_y = 200sin(30°) + 150sin(-45°) = -6.07 N. F = 199.25 N",
                                "incorrect": "Denken Sie daran, dass Winkel unter der Horizontalen negativ sind."
                        },
                        "scenario": "",
                        "scenario_desc": "",
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
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.040": {
                        "prompt": "Eine Kraft von 120 N wirkt bei 25° und eine weitere 80 N wirkt bei 155°. Welchen Winkel bildet die Resultierende mit der Horizontalen?",
                        "feedback": {
                                "correct": "Richtig! F_x = 120cos(25°) + 80cos(155°) = 36.29 N, F_y = 120sin(25°) + 80sin(155°) = 84.51 N. θ = arctan(84.51/36.29) = 52.13°",
                                "incorrect": "Finden Sie die x- und y-Komponenten und verwenden Sie dann arctan(F_y/F_x)."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "degrees"
                },
                "SP1.01.041": {
                        "prompt": "Sechs Kräfte von jeweils 20 N wirken bei 0°, 60°, 120°, 180°, 240° und 300°. Was ist der Betrag der Resultierenden?",
                        "feedback": {
                                "correct": "Richtig! Sechs gleiche Kräfte in 60°-Intervallen bilden ein perfekt ausgewogenes System mit null Resultierender.",
                                "incorrect": "Suchen Sie nach Symmetrie - Kräfte, die in gleichen Abständen um einen Kreis angeordnet sind, heben sich auf."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.025": {
                        "prompt": "Drei Kräfte wirken auf ein Objekt im Gleichgewicht: 50 N nach rechts, 30 N nach oben und eine unbekannte Kraft. Was ist der Betrag der unbekannten Kraft?",
                        "feedback": {
                                "correct": "Richtig! Die unbekannte Kraft muss die anderen beiden ausgleichen: √(50^{2} + 30^{2}) = 58.31 N",
                                "incorrect": "Für das Gleichgewicht muss die Summe aller Kräfte Null sein."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.046": {
                        "prompt": "Zwei Kräfte von jeweils 40 N wirken in einem Winkel von 60° zueinander. Was ist der Betrag der dritten Kraft, die für das Gleichgewicht benötigt wird?",
                        "feedback": {
                                "correct": "Richtig! Die Resultierende der beiden Kräfte beträgt 69.28 N, daher muss die Gleichgewichtskraft gleich und entgegengesetzt sein.",
                                "incorrect": "Finden Sie zuerst die Resultierende der beiden Kräfte, dann entspricht die Gleichgewichtskraft ihr im Betrag."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.047": {
                        "prompt": "Ein Objekt befindet sich im Gleichgewicht unter drei Kräften: 100 N bei 0°, 80 N bei 90° und eine dritte Kraft. Was ist der Betrag der dritten Kraft?",
                        "feedback": {
                                "correct": "Richtig! F = √(100^{2} + 80^{2}) = 128.06 N",
                                "incorrect": "Die dritte Kraft muss die Resultierende der ersten beiden ausgleichen."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.048": {
                        "prompt": "Ein Schild hängt an zwei Kabeln, die einen Winkel von 30° zur Horizontalen bilden. Wenn jedes Kabel eine Spannung von 200 N hat, wie schwer ist das Schild?",
                        "feedback": {
                                "correct": "Richtig! Gewicht = 2 × 200 × sin(30°) = 2 × 200 × 0.5 = 200 N",
                                "incorrect": "Die vertikalen Komponenten beider Kabel müssen dem Gewicht entsprechen."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.049": {
                        "prompt": "Vier Kräfte wirken auf einen Punkt im Gleichgewicht: 60 N bei 0°, 40 N bei 90°, 50 N bei 180° und eine unbekannte Kraft. Was ist der Betrag der unbekannten Kraft?",
                        "feedback": {
                                "correct": "Richtig! Netto x: 60-50=10 N, Netto y: 40 N. Unbekannte Kraft: √(10^{2} + 40^{2}) = 41.23 N",
                                "incorrect": "Finden Sie die Nettokraft in x- und y-Richtung und berechnen Sie dann die Gleichgewichtskraft."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.050": {
                        "prompt": "Eine Ampel hängt an zwei Kabeln: eines bei 45° mit Spannung T_1 und ein anderes bei 60° mit Spannung 150 N. Wenn das System im Gleichgewicht ist, was ist T_1?",
                        "feedback": {
                                "correct": "Richtig! Für horizontales Gleichgewicht: T_1cos(45°) = 150cos(60°), also T_1 = 150×0.5/0.707 = 183.71 N",
                                "incorrect": "Verwenden Sie horizontales Gleichgewicht: Die horizontalen Komponenten müssen sich ausgleichen."
                        },
                        "scenario": "",
                        "scenario_desc": "",
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
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.053": {
                        "prompt": "Ein Balken wird von zwei Kabeln bei 40° und 50° von der Vertikalen gestützt. Wenn der Balken 500 N wiegt, was ist die Spannung im Kabel bei 40°?",
                        "feedback": {
                                "correct": "Richtig! Mit Gleichgewichtsgleichungen: T_1 = 281.91 N",
                                "incorrect": "Stellen Sie Gleichgewichtsgleichungen für horizontale und vertikale Komponenten auf."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.054": {
                        "prompt": "Vier Kräfte wirken auf einen Ring: 80 N bei 0°, 60 N bei 90°, 70 N bei 180° und F in einem unbekannten Winkel. Wenn das System im Gleichgewicht ist, was ist F?",
                        "feedback": {
                                "correct": "Richtig! Netto x: 80-70=10 N, Netto y: 60 N. F = √(10^{2} + 60^{2}) = 60.83 N",
                                "incorrect": "Finden Sie die Resultierende der bekannten Kräfte, dann muss F ihr im Betrag entsprechen."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.055": {
                        "prompt": "Ein Kronleuchter mit einem Gewicht von 300 N hängt an drei Kabeln in 120°-Intervallen. Was ist die Spannung in jedem Kabel?",
                        "feedback": {
                                "correct": "Richtig! Durch Symmetrie trägt jedes Kabel 300/3 = 100 N",
                                "incorrect": "Bei symmetrischer Anordnung wird die Last gleichmäßig verteilt."
                        },
                        "scenario": "",
                        "scenario_desc": "",
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
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.058": {
                        "prompt": "Eine aufgehängte Plattform wird von vier Kabeln gehalten. Drei Kabel haben Spannungen: 400 N bei 30°, 350 N bei 120° und 380 N bei 210°. Was ist die Spannung im vierten Kabel bei 300°?",
                        "feedback": {
                                "correct": "Richtig! Das Lösen der Gleichgewichtsgleichungen ergibt T_4 = 350 N",
                                "incorrect": "Stellen Sie zwei Gleichgewichtsgleichungen (x und y) auf und lösen Sie nach der unbekannten Spannung auf."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.059": {
                        "prompt": "Ein Fachwerkknoten erfährt Kräfte: 500 N Druck bei 0°, 400 N Zug bei 60°, 450 N Druck bei 180° und zwei unbekannte Kräfte bei 240° und 300°. Wenn die Kräfte bei 240° und 300° gleich sind, was ist ihr Betrag?",
                        "feedback": {
                                "correct": "Richtig! Mit Symmetrie und Gleichgewichtsgleichungen beträgt jede unbekannte Kraft 200 N",
                                "incorrect": "Nutzen Sie die Tatsache, dass die beiden unbekannten Kräfte gleich sind, um die Gleichgewichtsgleichungen zu vereinfachen."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.060": {
                        "prompt": "Ein komplexes Kabelsystem hat sechs Kabel, die sich an einem Punkt treffen. Fünf Kabel haben bekannte Spannungen: 300 N bei 0°, 250 N bei 72°, 280 N bei 144°, 260 N bei 216° und 270 N bei 288°. Was ist die Spannung im sechsten Kabel bei einem optimalen Winkel für das Gleichgewicht?",
                        "feedback": {
                                "correct": "Richtig! Die Resultierende der fünf Kräfte beträgt 89.44 N, daher muss das sechste Kabel diese Kraft bereitstellen.",
                                "incorrect": "Finden Sie die Resultierende aller bekannten Kräfte, dann muss das sechste Kabel sie ausgleichen."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.061": {
                        "prompt": "Eine Brückenstütze erfährt eine Windlast von 3000 N horizontal, eine Eigenlast von 8000 N vertikal und drei Stützreaktionen bei 45°, 135° und 225°. Wenn die Reaktionen bei 45° und 225° gleich sind, was ist ihr Betrag?",
                        "feedback": {
                                "correct": "Richtig! Mit Gleichgewichtsgleichungen und Symmetrie beträgt jede gleiche Reaktion 4242.64 N",
                                "incorrect": "Stellen Sie Gleichgewichtsgleichungen für x und y auf und nutzen Sie die Symmetrie der beiden gleichen Reaktionen."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.062": {
                        "prompt": "Eine architektonische Skulptur in Basel hat acht symmetrisch angeordnete Stützkabel in 45°-Intervallen. Wenn die Skulptur 2400 N wiegt, was ist die Spannung in jedem Kabel?",
                        "feedback": {
                                "correct": "Richtig! Durch Symmetrie trägt jedes Kabel 2400/8 = 300 N",
                                "incorrect": "Bei symmetrischer Anordnung wird die Last gleichmäßig auf alle Kabel verteilt."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.063": {
                        "prompt": "Ein Kranhaken trägt eine Last mit vier Ketten in Winkeln von 20°, 110°, 200° und 290° zur Horizontalen. Wenn drei Ketten Spannungen von 800 N, 750 N bzw. 820 N haben, was ist die Spannung in der vierten Kette?",
                        "feedback": {
                                "correct": "Richtig! Das Lösen der Gleichgewichtsgleichungen ergibt T_4 = 750 N",
                                "incorrect": "Berechnen Sie die x- und y-Komponenten aller bekannten Kräfte und lösen Sie dann nach der Unbekannten auf."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.064": {
                        "prompt": "Ein Raumfachwerk-Knoten hat sieben Stäbe, die sich bei Winkeln von 0°, 51.43°, 102.86°, 154.29°, 205.71°, 257.14° und 308.57° treffen. Sechs Stäbe haben jeweils Kräfte von 500 N. Welche Kraft muss der siebte Stab für das Gleichgewicht tragen?",
                        "feedback": {
                                "correct": "Richtig! Durch Symmetrie (7 gleiche Winkel) trägt der siebte Stab ebenfalls 500 N",
                                "incorrect": "Suchen Sie nach Symmetrie - sieben gleiche Kräfte in gleichen Winkelabständen bilden ein ausgewogenes System."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.065": {
                        "prompt": "Ein komplexes Rigging-System hat Kräfte: 600 N bei 15°, 550 N bei 75°, 580 N bei 135°, 520 N bei 195°, 590 N bei 255° und F bei 315°. Was ist F für das Gleichgewicht?",
                        "feedback": {
                                "correct": "Richtig! Umfassende Gleichgewichtsanalyse ergibt F = 550 N",
                                "incorrect": "Summieren Sie alle x-Komponenten und y-Komponenten der bekannten Kräfte und lösen Sie dann nach F auf."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                }
        },
        /* SP1.01_DATA_END */

        // --- Global Physics Modules ---
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
                }
        },

        // --- Basel Sek 1 Serie (SP1 - Mechanik) ---

        // SP1.02: Newtonsche Gesetze
        sp1_02: {
                title: "SP1.02 // NEWTONSCHE GESETZE",
                back: "Zurück zum Nexus",
                footer_left: "SP1.02_MECHANIK // KNOTEN: BASEL",
                check: "Verifizieren",
                next: "Weiter",
                correct: "Gesetz Bestätigt",
                incorrect: "Gesetz Fehler",
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

                prompts: {
                        "FIRST_LAW": {
                                "BASIC": [
                                        "Object at rest, no force applied. Will it move?",
                                        "Object moving at 5 m/s, no net force. What happens?",
                                        "Car at rest. Driver applies no force. Does it move?",
                                        "Ball rolling at 3 m/s on frictionless surface. Net force?",
                                        "Book on table. Is it in equilibrium?",
                                        "Puck sliding on ice at constant speed. Net force?",
                                        "Object at rest stays at rest unless acted upon by?"
                                ],
                                "CORE": [
                                        "Basel tram at 15 m/s. Brakes apply -3000 N. Mass 10000 kg. Final velocity after 5s?",
                                        "Fasnacht float at rest. Push with 500 N. Friction 500 N. Does it move?",
                                        "Rhine boat moving at 2 m/s. Engine off. Friction 100 N. Mass 500 kg. Time to stop?",
                                        "Object moving at 10 m/s. Net force 0 N. Velocity after 10s?",
                                        "Car at 20 m/s. Friction 2000 N. Mass 1000 kg. Deceleration?",
                                        "Tram at constant 12 m/s. Applied force equals friction. Net force?",
                                        "Puck on ice at 5 m/s. No friction. Velocity after 20s?",
                                        "Basel bus at rest. Engine force 3000 N. Friction 3000 N. Acceleration?"
                                ],
                                "ADVANCED": [
                                        "Basel SBB train 50000 kg at 25 m/s. Brakes apply -10000 N. Distance to stop?",
                                        "Fasnacht parade float 2000 kg. Push 1000 N, friction 800 N. Acceleration?",
                                        "Rhine boat 1000 kg at 5 m/s. Water resistance 200 N. Time to reach 3 m/s?",
                                        "Tram 15000 kg at 20 m/s. Emergency brake -12000 N. Stopping distance?",
                                        "Object 500 kg moving at 8 m/s. Friction 100 N. Distance traveled before stopping?",
                                        "Car 1200 kg at 30 m/s. Brake force -4000 N. Time to stop?"
                                ],
                                "ELITE": [
                                        "Basel tram system: 3 trams, masses 10000, 12000, 15000 kg, all at 15 m/s. Total momentum?",
                                        "Fasnacht float 3000 kg at rest. Multiple pushes: 500 N, 300 N, -200 N. Net force?",
                                        "Rhine boat 2000 kg at 4 m/s. Engine thrust 1000 N, water resistance 800 N. Final velocity after 10s?"
                                ]
                        },
                        "SECOND_LAW": {
                                "BASIC": [
                                        "F=10 N, m=2 kg. Find a (m/s^{2})",
                                        "F=20 N, m=5 kg. Find a (m/s^{2})",
                                        "F=15 N, m=3 kg. Find a (m/s^{2})",
                                        "m=10 kg, a=2 m/s^{2}. Find F (N)",
                                        "m=5 kg, a=4 m/s^{2}. Find F (N)",
                                        "F=30 N, a=6 m/s^{2}. Find m (kg)",
                                        "F=40 N, a=8 m/s^{2}. Find m (kg)"
                                ],
                                "CORE": [
                                        "Basel tram 10000 kg accelerates at 1.5 m/s^{2}. Find F (N)",
                                        "Fasnacht float 2000 kg pushed with 1000 N. Find a (m/s^{2})",
                                        "Rhine boat 1500 kg, engine thrust 3000 N. Find a (m/s^{2})",
                                        "SBB train 50000 kg, brake force -10000 N. Find a (m/s^{2})",
                                        "Tram 12000 kg needs 2 m/s^{2} acceleration. Find F (N)",
                                        "Car 1000 kg, net force 2000 N. Find a (m/s^{2})",
                                        "Basel bus 8000 kg accelerates at 1 m/s^{2}. Find F (N)",
                                        "Bicycle 80 kg, force 160 N. Find a (m/s^{2})",
                                        "Truck 5000 kg, acceleration 0.5 m/s^{2}. Find F (N)"
                                ],
                                "ADVANCED": [
                                        "Basel tram 10000 kg, applied force 18000 N, friction 3000 N. Find a (m/s^{2})",
                                        "Fasnacht float 3000 kg, push 2000 N, friction 500 N. Find a (m/s^{2})",
                                        "Rhine boat 2000 kg, thrust 4000 N, water resistance 1000 N. Find a (m/s^{2})",
                                        "SBB train 60000 kg, brake -15000 N, friction -3000 N. Find a (m/s^{2})",
                                        "Tram 15000 kg needs 1.8 m/s^{2} with friction 2000 N. Find applied force (N)",
                                        "Car 1200 kg, engine 5000 N, air resistance 800 N. Find a (m/s^{2})",
                                        "Basel bus 8000 kg, engine 10000 N, friction 2000 N. Find a (m/s^{2})"
                                ],
                                "ELITE": [
                                        "Basel tram system: 3 trams (10000, 12000, 15000 kg) all accelerate at 1.5 m/s^{2}. Total force?",
                                        "Fasnacht parade: 5 floats, each 2000 kg, each pushed with 1000 N. Total acceleration?",
                                        "Rhine boat 2500 kg, thrust 5000 N, water resistance 20% of thrust. Find a (m/s^{2})"
                                ]
                        },
                        "THIRD_LAW": {
                                "BASIC": [
                                        "You push wall with 50 N. Wall pushes back with how many N?",
                                        "Rocket exerts 1000 N on gas. Gas exerts how many N on rocket?",
                                        "Earth pulls you with 600 N. You pull Earth with how many N?",
                                        "Hammer hits nail with 200 N. Nail hits hammer with how many N?",
                                        "Action-reaction forces act on (same/different) objects?",
                                        "Action force 100 N east. Reaction force direction?"
                                ],
                                "CORE": [
                                        "Basel tram 10000 kg pushes track with 15000 N. Track pushes tram with how many N?",
                                        "Rhine boat propeller pushes water backward with 3000 N. Water pushes boat with how many N?",
                                        "Fasnacht float pushes ground with 20000 N. Ground pushes float with how many N?",
                                        "SBB train wheels push track with 50000 N. Track pushes wheels with how many N?",
                                        "Swimmer pushes water backward with 500 N. Water pushes swimmer forward with how many N?",
                                        "Car tire pushes road with 4000 N. Road pushes tire with how many N?",
                                        "Rocket pushes exhaust gas with 100000 N. Gas pushes rocket with how many N?",
                                        "Person pushes wall with 200 N. Wall pushes person with how many N?"
                                ],
                                "ADVANCED": [
                                        "Basel tram 10000 kg accelerates at 1.5 m/s^{2}. Force on track?",
                                        "Rhine boat 2000 kg accelerates at 2 m/s^{2}. Force on water?",
                                        "Fasnacht float 3000 kg, friction 500 N, accelerates at 0.5 m/s^{2}. Force on ground?",
                                        "SBB train 50000 kg decelerates at -0.2 m/s^{2}. Force on track?",
                                        "Rocket 5000 kg accelerates at 10 m/s^{2}. Force on exhaust gas?",
                                        "Car 1200 kg accelerates at 3 m/s^{2}. Force on road?",
                                        "Basel bus 8000 kg accelerates at 1 m/s^{2}. Force on road?"
                                ],
                                "ELITE": [
                                        "Basel tram 10000 kg and car 1000 kg collide. Tram exerts 50000 N on car. Car exerts how many N on tram?",
                                        "Rhine boat 2000 kg pushes water with 4000 N. Boat accelerates at 2 m/s^{2}. Water mass pushed?",
                                        "Fasnacht float 3000 kg, ground pushes with 2000 N. Float accelerates at 0.5 m/s^{2}. Friction force?",
                                        "SBB train 50000 kg, track pushes with 10000 N. Train decelerates at -0.2 m/s^{2}. Verify F=ma?"
                                ]
                        }
                },
                labels: {
                        "ans": "Antwort",
                        "placeholder": "hier eingeben"
                },
                scenarios: {
                        first_law: "Basel Fasnacht Umzugswagen Bewegung: Während Basels berühmter Fasnacht am Marktplatz demonstrieren aufwendig dekorierte Umzugswagen Newtons Erstes Gesetz der Trägheit. Ein massiver Wagen mit 3.000 kg Masse ruht vor Beginn des Umzugs. Trotz seines farbenfrohen Aussehens widersteht er hartnäckig der Bewegung – er bleibt in Ruhe, es sei denn, eine äußere Kraft wirkt auf ihn ein. Wenn Umzugsteilnehmer mit 2.000 N schieben, während Reibung mit 500 N entgegenwirkt, überwindet die Nettokraft von 1.500 N die Trägheit und beschleunigt den Wagen mit 0,5 m/s^{2}. Sobald er sich mit konstanter Geschwindigkeit durch die Umzugsroute bewegt, fährt der Wagen mit gleichmäßiger Geschwindigkeit weiter, wenn die Schieber eine Kraft gleich der Reibung aufrechterhalten.",
                        second_law: "Basel Tram Beschleunigung und Bremsen: Basels ikonische grüne Trams navigieren durch die Straßen der Stadt und demonstrieren Newtons Zweites Gesetz in Aktion. Am Barfüsserplatz beschleunigt eine Tram mit einer Masse von 10.000 kg aus dem Stillstand, um Reisegeschwindigkeit zu erreichen. Die Elektromotoren erzeugen eine Vorwärtskraft von 15.000 N, während Reibung und Luftwiderstand 3.000 N Gegenkraft liefern. Mit F=ma berechnen wir, dass die Nettokraft (12.000 N) eine Beschleunigung von 1,2 m/s^{2} erzeugt. Beim Annähern an die nächste Haltestelle betätigt der Fahrer die Bremsen mit -10.000 N, kombiniert mit -3.000 N Reibung, was -13.000 N Nettokraft und -1,3 m/s^{2} Verzögerung erzeugt.",
                        third_law: "Rhein Schiffspropulsion: Entlang des Basler Rheins in der Nähe der Mittleren Brücke demonstrieren Passagierschiffe Newtons Drittes Gesetz durch ihre Antriebssysteme. Wenn sich der Propeller eines Bootes dreht, drückt er das Wasser mit enormer Kraft nach hinten – vielleicht 3.000 N für eine typische Rheinfähre. Gemäß Newtons Drittem Gesetz drückt das Wasser gleichzeitig das Boot mit einer gleichen Kraft von 3.000 N in die entgegengesetzte Richtung nach vorne. Dieses Aktions-Reaktions-Paar wirkt auf verschiedene Objekte: Der Propeller wirkt auf das Wasser, während das Wasser auf das Boot wirkt. Die 1.500 kg Masse des Bootes beschleunigt dadurch mit 2 m/s^{2} nach vorne."
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
                ready: "Bereit",
                monitor_title: "SP2.01_STROMKREIS_LABOR",
                footer_left: "SP2.01_ELEKTRIZITÄT // KNOTEN: BASEL",
                objective_title: "Stromkreis Ziel",
                difficulty: { basic: "BASIS", core: "KERN", advanced: "ERWEITERT", elite: "ELITE" },
                stages: {
                        components: "BAUTEILE",
                        simple_circuits: "EINFACHE STROMKREISE",
                        circuit_diagrams: "SCHALTPLÄNE"
                },
                scenarios: {
                        components: "Basler Elektrische Sicherheit im Haushalt: Sie sind Auszubildender Elektriker an der Gewerbeschule Basel. Heute lernen Sie, Stromkreiskomponenten für Hausinstallationen zu identifizieren. Das Verständnis der Funktion jeder Komponente ist sicherheitskritisch - eine falsch identifizierte Komponente könnte Brände oder Stromschläge verursachen. In Basels historischen Gebäuden müssen elektrische Systeme strenge Schweizer Sicherheitsstandards (NIV 2020) erfüllen. Sie arbeiten mit Batterien (Stromquellen, die Spannung liefern), Glühbirnen (wandeln elektrische Energie in Licht um), Schaltern (steuern den Stromfluss), Drähten (leiten Elektrizität) und Widerständen (begrenzen den Strom). Jede Komponente hat eine spezifische Rolle beim Schutz von Häusern und der Gewährleistung zuverlässiger Stromversorgung. Dieses Wissen ist für Basels 170.000 Einwohner, die täglich auf sichere elektrische Systeme angewiesen sind, unerlässlich.",
                        simple_circuits: "Basler Weihnachtsbeleuchtung Installation: Sie helfen bei der Installation von Weihnachtslichtern entlang der Basler Freien Strasse. Die Stadt verlangt energieeffiziente LED-Lichterketten, die unabhängig gesteuert werden können. Sie müssen Reihenschaltungen (wo Glühbirnen in einem einzigen Pfad sind - wenn eine ausfällt, erlöschen alle) von Parallelschaltungen (wo Glühbirnen in separaten Pfaden sind - jede kann unabhängig gesteuert werden) verstehen. Reihenschaltungen sind einfacher, aber weniger zuverlässig. Parallelschaltungen verwenden mehr Draht, bieten aber Redundanz. Für Basels 2 km Weihnachtsbeleuchtung ermöglichen Parallelschaltungen mit individuellen Schaltern, Abschnitte tagsüber auszuschalten, um Energie zu sparen. Der Basler Weihnachtsmarkt verwendet über 50.000 LED-Glühbirnen, und ein ordnungsgemäßes Schaltungsdesign stellt sicher, dass sie sicher bei 230V AC betrieben werden und dabei minimalen Strom verbrauchen.",
                        circuit_diagrams: "Basler Elektrotechnik Ausbildung: Im ABB Schweiz Ausbildungszentrum Basel lernen Sie, Schaltpläne zu lesen und zu zeichnen - die universelle Sprache der Elektriker weltweit. Schaltungssymbole sind von der IEC (Internationale Elektrotechnische Kommission) standardisiert, sodass Ingenieure in Basel mit Kollegen in Tokio oder New York zusammenarbeiten können. Eine Batterie wird als zwei parallele Linien dargestellt (lange positive, kurze negative). Eine Glühbirne ist ein Kreis mit einem X darin. Ein Schalter ist eine Lücke in der Linie (offen) oder eine durchgehende Linie (geschlossen). Widerstände sind Rechtecke oder Zickzacklinien. Amperemeter (messen Strom in Ampere) und Voltmeter (messen Spannung in Volt) sind Kreise mit A oder V darin. Diese Symbole erscheinen in jedem elektrischen Schaltplan von einfachen Hausschaltungen bis zu komplexen Industriesystemen bei Basels Roche und Novartis Pharmaunternehmen. Die Beherrschung von Schaltplänen ist für Ihr Eidgenössisches Fähigkeitszeugnis (EFZ) in Elektrotechnik unerlässlich."
                },
                feedback: { correct: "Schaltungsanalyse bestätigt.", incorrect: "Schaltungskonfigurationsfehler erkannt." }
        },

        // SP2.02: Ohmsches Gesetz & Schaltungen
        sp2_02: {
                title: "SP2.02 // OHMSCHES GESETZ & SCHALTUNGEN",
                back: "Zurück zum Nexus",
                footer_left: "SP2.02_SCHALTUNGEN // KNOTEN: BASEL",
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
                scenarios: {
                        ohms_law: "Elektrotechnik-Labor an der Universität Basel: Sie sind Elektrotechnik-Student im ersten Jahr und lernen Schaltungsgrundlagen. Das heutige Labor konzentriert sich auf das Ohmsche Gesetz (U = I × R), die Grundlage aller Schaltungsanalysen. Ihre Aufgabe ist es, Spannung, Strom oder Widerstand in einfachen Schaltungen zu berechnen. Professor Schmidt betont: 'Das Ohmsche Gesetz zu verstehen ist wie das Alphabet zu lernen - es ist essentiell für alles, was folgt.' Sie werden digitale Multimeter verwenden, um echte Schaltungen zu messen und Ihre Berechnungen zu verifizieren. Dieses Wissen ist entscheidend für die Entwicklung von allem, von Smartphone-Schaltungen bis zu Basels Straßenbahn-Elektrosystemen.",
                        series_circuits: "Novartis Pharma-Gerätedesign: Sie arbeiten mit dem Elektrotechnik-Team bei Novartis Basel und entwerfen die Stromverteilung für neue Laborgeräte. In Reihenschaltungen teilen sich Komponenten denselben Strom, aber die Spannung teilt sich auf sie auf. Ihre Aufgabe ist es, den Gesamtwiderstand (R_gesamt = R_1 + R_2 + ...) und den Stromfluss zu berechnen. Dies ist kritisch, um sicherzustellen, dass empfindliche Analysegeräte die korrekten Spannungspegel erhalten. Eine Fehlberechnung könnte Geräte im Wert von Millionen Schweizer Franken beschädigen oder Arzneimittel-Qualitätstestergebnisse gefährden.",
                        parallel_circuits: "Roche Tower Beleuchtungssystem: Sie entwerfen das Notbeleuchtungssystem für den Roche Tower in Basel. In Parallelschaltungen teilen sich Komponenten dieselbe Spannung, aber der Strom teilt sich auf die Zweige auf. Ihre Aufgabe ist es, den Gesamtstrom und den äquivalenten Widerstand (1/R_gesamt = 1/R_1 + 1/R_2 + ...) zu berechnen. Dieses Design stellt sicher, dass wenn ein Licht ausfällt, andere weiterarbeiten - kritisch für die Sicherheit bei Stromausfällen. Das System muss die 41 Stockwerke des Gebäudes mit Tausenden von LED-Leuchten effizient betreiben."
                }
        },

        // SP2.03: Elektrische Leistung & Energie
        sp2_03: {
                title: "SP2.03 // ELEKTRISCHE LEISTUNG & ENERGIE",
                back: "Zurück zum Nexus",
                footer_left: "SP2.03_LEISTUNG // KNOTEN: BASEL",
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
                scenarios: {
                        power_basics: "Basler Haushalts-Elektrizität: Sie helfen einem Basler Energieberatungsunternehmen, den Stromverbrauch für Privatkunden zu berechnen. Die elektrische Leistung (P = U × I) bestimmt, wie viel Energie Geräte pro Sekunde verbrauchen, gemessen in Watt. Ihre Aufgabe ist es, die Leistung verschiedener Haushaltsgeräte zu berechnen. Dies hilft Familien, Stromrechnungen und CO_2-Fußabdruck zu reduzieren. Ein typischer Basler Haushalt verbraucht etwa 4.500 kWh pro Jahr, was bei 0,25 CHF/kWh etwa 1.125 CHF kostet. Genaue Leistungsberechnungen helfen, energieverschwendende Geräte zu identifizieren.",
                        energy_consumption: "IWB Basel Energiemanagement: Sie arbeiten für IWB (Industrielle Werke Basel), Basels Hauptstromversorger. Ihre Aufgabe ist es, Energieverbrauch (E = P × t) und Kosten für Geschäftskunden zu berechnen. Energie wird in Kilowattstunden (kWh) gemessen, und Basels Stromtarif beträgt etwa 0,25 CHF/kWh für Haushalte und 0,20 CHF/kWh für Unternehmen. Sie analysieren ein Novartis-Labor, das Geräte rund um die Uhr betreibt. Genaue Berechnungen gewährleisten korrekte Abrechnung und helfen Kunden, den Energieverbrauch zu optimieren, um Kosten und Umweltauswirkungen zu reduzieren.",
                        efficiency: "Basler Solaranlagen-Installation: Sie sind Ingenieur bei Solarville Basel und installieren Solarpaneele auf Wohndächern. Der Wirkungsgrad (η = P_aus/P_ein × 100%) bestimmt, wie viel Sonnenenergie in Elektrizität umgewandelt wird. Moderne Paneele erreichen 18-22% Wirkungsgrad. Ihre Aufgabe ist es, Leistungsabgabe, Energieverluste und Kosteneinsparungen zu berechnen. Ein typisches Basler Haus mit 20 m^{2} Paneelen (4 kW Kapazität) erzeugt etwa 3.800 kWh/Jahr und spart jährlich etwa 950 CHF. Das Verständnis des Wirkungsgrads hilft Kunden, fundierte Investitionsentscheidungen zu treffen."
                },
                prompts: {
                        e1: "IWB Wärmepumpe: P=3kW für 500h. Tarif: 0.28 CHF/kWh. Kosten?",
                        e2: "Sommer-Klimaanlage: P=1.5kW für 100h. Tarif: 0.28 CHF/kWh. Kosten?",
                        e3: "Basler Läckerli Ofen: P=2kW für 5h. Tarif: 0.28 CHF/kWh. Kosten?",
                        e4: "E-Auto Laden (Niedertarif): P=11kW für 50h. Tarif: 0.24 CHF/kWh. Kosten?",
                        e5: "Fasnachtslaternen: P=0.5kW für 72h. Tarif: 0.28 CHF/kWh. Kosten?"
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
                        equilibrium: "Kräfte F_1={f1}N (rechts) und F_2={f2}N (links) wirken auf Objekt. Für Gleichgewicht, F_3?",
                        space: "Im Weltraum (keine Reibung), Objekt (m={m}kg) wird mit F={f}N für {t}s geschoben, dann losgelassen. Kraft nach Loslassen?",
                        inertia: "Objekt (m={m}kg) in Ruhe. Welche Eigenschaft widersetzt sich Bewegungsänderung?",
                        "2d_balance": "Zwei senkrechte Kräfte wirken auf Objekt (m={m}kg). Resultierende Kraft?",
                        vector_add: "Kräfte F_1={f}N (Ost) und F_2={f}N (Nord) wirken auf Objekt. Nettokraft?",
                        slope: "Objekt (m={m}kg) auf Hang (θ={theta}°) mit Reibung μ={mu}. Normalkomponente?",
                        space_friction: "Im Weltraum, Objekt (m={m}kg) erfährt Reibung μ={mu}. Ist das realistisch?",
                        complex: "Objekt (m={m}kg) gezogen mit F={f}N gegen Reibung μ={mu}. Nettokraft?",

                        // NEWTON 2 - F=ma
                        find_f: "Masse m={m}kg beschleunigt mit a={a}m/s^{2}. Finde Nettokraft F.",
                        find_a: "Nettokraft F={f}N wirkt auf Masse m={m}kg. Finde Beschleunigung a.",
                        gravity: "Objekt m={m}kg auf Planet (g={g}m/s^{2}). Gewichtskraft W=mg?",
                        net_force: "Kraft F={f}N wirkt auf m={m}kg. Reibung f={fr}N wirkt entgegen. Nettobeschleunigung?",
                        friction: "Kraft F={f}N zieht m={m}kg mit Reibung μ={mu}. Beschleunigung?",
                        pulley: "Flaschenzugsystem: Masse m={m}kg, angewandte Kraft F={f}N, Reibung μ={mu}. Beschleunigung?",
                        variable_mass: "Kraft F={f}N wirkt auf variables Massensystem m={m}kg. Effektive Beschleunigung?",
                        coupled: "Zwei gekoppelte Massen: m_1={m}kg, angewandt F={f}N. Systembeschleunigung?",

                        // REIBUNG
                        static: "Kiste m={m}kg auf Boden (μs={mu}). Maximale Haftreibung?",
                        kinetic: "Kiste m={m}kg rutscht (μk={mu}). Gleitreibung?",
                        max_static: "Kiste m={m}kg auf Oberfläche (μs={mu}). Maximale Haftreibung vor Rutschen?",
                        kinetic_vs_static: "Kiste m={m}kg: μs={mu}, μk={mu}. Welche Reibung ist größer?",
                        slope_friction: "Kiste m={m}kg auf Hang (θ={theta}°) mit μ={mu}. Reibungskraft?",
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
                        hospital_equipment_3d: "Auf geneigter Ebene: N = mg cos θ (Normalkraft senkrecht zur Oberfläche). Reibungskraft f = μN = μ(mg cos θ) wirkt parallel zur Oberfläche, entgegen der Bewegung.",
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
                        basic_ep: "Objekt m={m}kg in Höhe h={h}m. Berechne potentielle Energie Ep (g={g}m/s^{2}).",
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
                        buoyant_force: "Ein Objekt mit {volume} m^{3} ist im Rhein untergetaucht. Berechnen Sie den Auftrieb.",
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
                        n_e5: "E = \\frac{1}{2} \\times 1 \\times v_{net}^{2}, \\text{finde zuerst }v_{net}",
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
                ready: "Stabil",
                monitor_title: "GP2.01_THERMO_MONITOR",
                footer_left: "GP2.01_THERMODYNAMIK // KNOTEN: BASEL",
                stages: { ideal_gas: "IDEALES GAS", boyles: "BOYLE-MARIOTTE", charles: "GAY-LUSSAC" },
                prompts: {
                        find_p: "Ideales Gas: n = {n} mol, T = {T} K, V = {V} m^{3}. Finde P.",
                        find_v: "Gas: n = {n} mol, P = {P} Pa, T = {T} K. Finde V.",
                        find_n: "Gas: P = {P} Pa, V = {V} m^{3}, T = {T} K. Finde n.",
                        find_t: "Gas: P = {P} Pa, V = {V} m^{3}, n = {n} mol. Finde T.",
                        relation_pt: "Temperatur bei konstantem Volumen verdoppeln. Um welchen Faktor ändert sich der Druck?",
                        relation_vn: "Molzahl bei konstantem P und T verdoppeln. Um welchen Faktor ändert sich das Volumen?",
                        boyle_find_p2: "Boyle-Mariotte: P_1 = {p1} kPa, V_1 = {v1} L, V_2 = {v2} L. Finde P_2.",
                        boyle_find_v2: "Boyle-Mariotte: P_1 = {p1} kPa, V_1 = {v1} L, P_2 = {p2} kPa. Finde V_2.",
                        boyle_relation: "Komprimiere Gas von {v1} L auf {v2} L bei konst. T. Druck vervielfacht sich um?",
                        boyle_condition: "Welche Größe muss beim Gesetz von Boyle-Mariotte konstant bleiben?",
                        charles_find_v2: "Gay-Lussac (Charles): V_1 = {v1} L, T_1 = {t1} K, T_2 = {t2} K. Finde V_2.",
                        charles_find_t2: "Gay-Lussac (Charles): V_1 = {v1} L, T_1 = {t1} K, V_2 = {v2} L. Finde T_2.",
                        charles_relation: "Absolute Temperatur bei konstantem P verdoppeln. Um welchen Faktor ändert sich das Volumen?",
                        charles_condition: "Welche Größe muss beim Gesetz von Charles (Gay-Lussac) konstant bleiben?",
                        combined_law: "Allgemeines Gasgesetz bei P, V, T Änderung. Suche nach {target}.",
                        iwb_steam: "IWB Fernwärme: Dampf bei T={T} K, V={V} m^{3}, n={n} mol. Berechne Druck P (Ideal).",
                        roche_tower: "Roche-Turm 40. Stock: Raum V={V} m^{3}, T={T} K, P={P} Pa. Berechne Luftmenge n.",
                        rhine_bubble: "Rhein-Taucher in der Tiefe (P1={p1} kPa) atmet Blase V1={v1} mL aus. Volumen an Oberfläche (P2={p2} kPa)?",
                        weather_balloon: "Basel Wetterballon: Boden V={v1} m^{3}, T1={t1} K. Stratosphäre T2={t2} K (P konstant). Neues Volumen?",
                        novartis_reactor: "Novartis-Reaktor V={V} m^{3}. Spüle mit N2 bei P={P} Pa, T={T} K. Berechne Masse N2 (M=0.028 kg/mol)."
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
                        wh_isobaric: "Isobare Expansion: P = {p} Pa, ΔV = {dv} m^{3}. Finde Arbeit W.",
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
                        optics: "Die CERN-Basel-Kollaboration nutzt fortschrittliche optische Systeme zur Teilchendetektion. Licht gehorcht dem Reflexionsgesetz (θᵢ = θᵣ) und dem Snelliusschen Brechungsgesetz (n_1sinθ_1 = n_2sinθ_2). Totalreflexion tritt auf, wenn Licht vom dichteren ins dünnere Medium bei Winkeln über dem kritischen Winkel übergeht und ermöglicht die Glasfaserkommunikation in Basels Telekommunikationsinfrastruktur. Einzelspaltbeugung erzeugt charakteristische Muster mit Minima bei asinθ = mλ. Beugungsgitter mit der Gleichung d·sinθ = mλ werden in Spektrometern bei Roche und Novartis für chemische Analysen eingesetzt. Das Rayleigh-Kriterium bestimmt die optischen Auflösungsgrenzen für die Teleskope der Basler Sternwarte."
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
                        de_broglie: "Elektron (m = 9,1×10^-^{3}¹ kg, v = 1 m/s). De-Broglie-Wellenlänge? (h = 6,63×10^-^{3}^{4})",
                        wave_particle_duality: "Licht zeigt sowohl Wellen- als auch Teilcheneigenschaften. Wahr oder falsch?",
                        photon_energy: "Photon mit f = 5×10¹^{4} Hz. Energie E = hf? (h = 6,63×10^-^{3}^{4})",
                        matter_wave: "Elektronenwellenlänge λ = h/mv. Für typisches Elektron, λ ≈ ?",
                        uncertainty: "Heisenbergsche Unschärfe: ΔxΔp ≥ h/4π. Können wir beide genau kennen?",
                        same_phase_add: "Zwei Wellen (A = 2 m) in Phase. Gesamtamplitude?",
                        opposite_phase_cancel: "Zwei Wellen (A = 3 m) gegenphasig. Gesamtamplitude?",
                        constructive_max: "Zwei Wellen (A = 1 m) konstruktive Interferenz. Maximale Amplitude?",
                        partial_destructive: "Wellen A_1 = 5 m, A_2 = 3 m interferieren destruktiv. Gesamtamplitude?",
                        interference_type: "Zwei Wellen in Phase kombinieren. Interferenztyp?",
                        standing_wave_node: "Stehende Welle λ = 2 m. Erste Knotenposition x_1?",
                        standing_wave_antinode: "Stehende Welle λ = 4 m. Erste Bauchposition x_1?",
                        node_count: "Saitenlänge 5 m, λ = 2 m. Anzahl der Knoten?",
                        string_fundamental: "Saiten-Grundmode: L = λ/2. Wenn λ = 1 m, finde L.",
                        harmonic_wavelength: "Grundton λ_1 = 2 m. Zweite Oberschwingung Wellenlänge λ_2?",
                        double_slit_spacing: "Doppelspalt: λ = 500 nm, L = 2 m, d = 1 mm. Streifenabstand Δy?",
                        fringe_order: "Doppelspalt: λ = 600 nm, L = 2 m, d = 1,2 mm. Dritter heller Streifen y_3?",
                        slit_separation: "Doppelspalt: λ = 500 nm, L = 1 m, Δy = 1 mm. Spaltabstand d?",
                        wavelength_from_fringes: "Doppelspalt: Δy = 0,8 mm, d = 0,5 mm, L = 1 m. Wellenlänge λ?",
                        central_maximum: "Doppelspalt: Position des zentralen Maximums y₀?",
                        thin_film_constructive: "Dünnschicht (n = 2): konstruktive Interferenz für λ = 500 nm, m = 1. Dicke t?",
                        thin_film_destructive: "Dünnschicht (n = 2): destruktive Interferenz für λ = 600 nm, m = 0. Dicke t?",
                        newton_rings: "Newtonsche Ringe: λ = 500 nm, R = 1 m. Erster heller Ring Radius r_1?",
                        soap_bubble: "Seifenblase (n = 1,33, t = 300 nm) reflektiert welche Farbe stark?",
                        anti_reflection: "Entspiegelungsschicht (n = 2): λ = 400 nm. Minimale Dicke t?",
                        reflection_angle: "Licht fällt unter 30° ein. Reflexionswinkel θᵣ?",
                        refraction_basic: "Licht von Luft (n = 1) zu Glas (n = 1,5) bei 30°. Brechungswinkel θ_2?",
                        light_speed_medium: "Licht in Glas (n = 1,5). Geschwindigkeit v = c/n?",
                        refractive_index: "Lichtgeschwindigkeit im Medium: v = 2×10^8 m/s. Brechungsindex n?",
                        normal_incidence: "Licht senkrecht zur Oberfläche. Brechungswinkel θᵣ?",
                        critical_angle: "Glas (n = 1,5) zu Luft (n = 1). Kritischer Winkel θc?",
                        total_internal_reflection: "Licht bei 50° von Glas zu Luft (θc = 42°). Totalreflexion?",
                        fiber_optics: "Glasfasern nutzen welches Prinzip, um Licht einzufangen?",
                        prism_dispersion: "Prisma trennt weißes Licht in Farben. Dieser Effekt heißt?",
                        brewster_angle: "Brewster-Winkel für Glas (n = 1,5) zu Luft. tan θB = n_2/n_1. Finde θB.",
                        single_slit_minima: "Einzelspalt (a = 1 mm): erstes Minimum für λ = 500 nm. Winkel θ_1?",
                        diffraction_width: "Einzelspalt (a = 0,6 mm): λ = 600 nm, L = 1 m. Breite des zentralen Maximums w?",
                        rayleigh_criterion: "Teleskop (D = 0,5 m): λ = 500 nm. Minimal auflösbarer Winkel θmin?",
                        circular_aperture: "Kreisblende (D = 10 mm, f = 100 mm): λ = 500 nm. Airy-Scheibe Radius r?",
                        resolving_power: "Teleskop Durchmesser D = 0,5 m, λ = 500 nm. Auflösungsvermögen R?",
                        grating_equation: "Beugungsgitter (d = 1 μm): λ = 500 nm, m = 1. Winkel θ_1?",
                        grating_order: "Gitter (d = 2 μm): λ = 600 nm. Maximale Ordnung mmax?",
                        grating_spacing: "Gitter: λ = 500 nm, θ_1 = 30°, m = 1. Linienabstand d?",
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
                        magnetic_field: "In der MRT-Abteilung des Universitätsspitals Basel kalibrieren Sie Magnetfeldsysteme für medizinische Bildgebung. Magnetfelder werden durch elektrische Ströme erzeugt und in Tesla (T) gemessen. Ein gerader stromführender Draht erzeugt ein kreisförmiges Magnetfeld mit Stärke B = μ₀I/(2πr), wobei μ₀ = 4π×10^-^7 T·m/A die Permeabilität des Vakuums ist. Die Rechte-Hand-Regel bestimmt die Feldrichtung: Daumen zeigt entlang des Stroms, Finger krümmen sich in Feldrichtung. Spulen (Solenoide) erzeugen im Inneren ein gleichmäßiges Feld B = μ₀nI, das in MRT-Geräten verwendet wird, um Wasserstoffatome im Körper der Patienten auszurichten. Die Kraft auf einen stromführenden Draht in einem Magnetfeld ist F = BILsinθ, was Elektromotoren in Basels Straßenbahnen und Zügen ermöglicht. Magnetschwebetechnik (Maglev) nutzt diese Prinzipien, und Basels Anbindung an das Schweizer Bahnnetz basiert auf elektromagnetischen Systemen.",
                        particle_motion: "Sie sind Physiker an CERNs Basel-Forschungseinrichtung und analysieren Trajektorien geladener Teilchen in elektromagnetischen Feldern für Large Hadron Collider-Experimente. Wenn ein geladenes Teilchen (Ladung q, Masse m) in ein elektrisches Feld E eintritt, erfährt es Kraft F = qE und Beschleunigung a = qE/m und folgt einer parabolischen Bahn wie bei Wurfbewegungen. In einem Magnetfeld B erfährt ein bewegtes geladenes Teilchen die Lorentzkraft F = qvB senkrecht zu Geschwindigkeit und Feld, was zu Kreisbewegung mit Radius r = mv/(qB) führt. Dieses Prinzip ermöglicht Massenspektrometer in Novartis- und Roche-Qualitätskontrolllaboren, Molekülmassen pharmazeutischer Verbindungen zu identifizieren. Geschwindigkeitsselektoren verwenden gekreuzte elektrische und magnetische Felder, wobei Teilchen nur bei v = E/B geradeaus fliegen und Ionen nach Geschwindigkeit trennen. Zyklotrone beschleunigen Teilchen auf Spiralbahnen für Krebsstrahlentherapie im Universitätsspital Basel. Das Verständnis der Teilchenbewegung ist wesentlich für die Entwicklung von Teilchendetektoren, Analyse kosmischer Strahlung und Entwicklung medizinischer Bildgebungstechnologien der nächsten Generation."
                },
                objective_title: "Elektromagnetische Analyse",
                complete: "Modul abgeschlossen!",
                check: "Überprüfen",
                next: "Nächste Herausforderung",
                correct: "Feld verifiziert",
                incorrect: "Berechnung prüfen",
                ready: "Bereit",
                monitor_title: "GP3.02_EM_MONITOR",
                footer_left: "GP3.02_ELEKTROMAGNETISMUS // KNOTEN: BASEL"
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
                ready: "Bereit",
                monitor_title: "GP3.03_INDUKTION_MONITOR",
                footer_left: "GP3.03_INDUKTION // KNOTEN: BASEL"
        },
};
