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
                      hint_oxy: "Wir atmen dies ein, um Glukose zu verbrennen."
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
