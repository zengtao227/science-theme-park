#!/usr/bin/env python3
"""
Fix SM1.01 module i18n and LaTeX formatting issues
"""

import re

# Read the file
with open('src/app/chamber/sm1-01/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Define replacements for hardcoded English text to i18n keys
replacements = {
    # Hardcoded English scenarios -> i18n keys
    r'\\text\{Basel park rectangular garden\}': r'\\text{${t.quests.basel_park}}',
    r'\\text\{Basel Cathedral roof triangle\}': r'\\text{${t.quests.basel_cathedral_tri}}',
    r'\\text\{Basel Rhine bridge trapezoid support\}': r'\\text{${t.quests.basel_rhine_trap}}',
    r'\\text\{Circular fountain at Basel Marktplatz\}': r'\\text{${t.quests.basel_fountain}}',
    r'\\text\{Roche Tower window \(rectangle\)\}': r'\\text{${t.quests.roche_window}}',
    r'\\text\{Novartis campus trapezoid plaza\}': r'\\text{${t.quests.novartis_trap}}',
    r'\\text\{Basel Zoo circular pond\}': r'\\text{${t.quests.basel_zoo_pond}}',
    r'\\text\{Basel University courtyard \(rectangle\)\}': r'\\text{${t.quests.basel_uni_court}}',
    r'\\text\{Basel SBB station rectangular platform\}': r'\\text{${t.quests.basel_sbb_platform}}',
    r'\\text\{Basel storage cube\}': r'\\text{${t.quests.basel_storage}}',
    r'\\text\{Novartis shipping box\}': r'\\text{${t.quests.novartis_box}}',
    r'\\text\{Basel water tank \(cylinder\)\}': r'\\text{${t.quests.basel_water_tank}}',
    r'\\text\{Basel Museum cube display\}': r'\\text{${t.quests.basel_museum}}',
    r'\\text\{Basel SBB cargo container\}': r'\\text{${t.quests.basel_sbb_cargo}}',
    r'\\text\{Basel storage cube, surface area 150 m\}\^2': r'\\text{${t.quests.basel_storage_sa}}',
    r'\\text\{Novartis lab container, base 6×8 m, height 10 m\}': r'\\text{${t.quests.novartis_lab}}',
    r'\\text\{Basel Rhine water pipe, diameter 8 m, length 12 m\}': r'\\text{${t.quests.basel_rhine_pipe}}',
    r'\\text\{Roche Tower cube room, edge 9 m\}': r'\\text{${t.quests.roche_cube}}',
    r'\\text\{Basel Messe exhibition hall, 20×15×8 m\}': r'\\text{${t.quests.basel_messe_hall}}',
    r'\\text\{Basel University cube lab, diagonal 12 m\}': r'\\text{${t.quests.basel_uni_lab}}',
    r'\\text\{Novartis trapezoid plaza, perimeter 50 m\}': r'\\text{${t.quests.novartis_plaza}}',
    r'\\text\{Basel Rhine cylindrical pipe, diameter 10 m, length 15 m\}': r'\\text{${t.quests.basel_rhine_cyl}}',
    r'\\text\{Roche Tower prism, base 12×10 m, height 20 m\}': r'\\text{${t.quests.roche_prism}}',
    r'\\text\{Basel SBB cube storage, surface area 294 m\}\^2': r'\\text{${t.quests.basel_sbb_storage}}',
    r'\\text\{Basel Museum cube, volume 512 m\}\^3\\text\{, find diagonal\}': r'\\text{${t.quests.basel_museum_vol}}',
    r'\\text\{Novartis cylinder tank, lateral area 314\.16 m\}\^2\\text\{, radius 5 m\}': r'\\text{${t.quests.novartis_tank}}',
    r'\\text\{Basel Rhine bridge trapezoid, area 180 m\}\^2\\text\{, \}a=10\\text\{, \}b=20\\text\{, find \}h': r'\\text{${t.quests.basel_bridge_area}}',
    r'\\text\{Roche Tower prism, volume 1200 m\}\^3\\text\{, base 10×8 m, find height\}': r'\\text{${t.quests.roche_prism_vol}}',
    r'\\text\{Basel water tank cylinder, volume 1570\.8 m\}\^3\\text\{, height 20 m, find radius\}': r'\\text{${t.quests.basel_water_cyl}}',
    r'\\text\{Basel park rectangular path\}': r'\\text{${t.quests.basel_park_path}}',
    r'\\text\{Basel Cathedral triangular roof section\}': r'\\text{${t.quests.basel_cathedral_roof}}',
    r'\\text\{Novartis circular logo\}': r'\\text{${t.quests.novartis_logo}}',
    r'\\text\{Roche warehouse container\}': r'\\text{${t.quests.basel_warehouse}}',
    r'\\text\{Basel Messe exhibition trapezoid booth\}': r'\\text{${t.quests.basel_messe_trap}}',
    r'\\text\{Basel University cube lab, volume 1000 m\}\^3': r'\\text{${t.quests.basel_uni_lab_vol}}',
    r'\\text\{Novartis cylindrical tank, radius 6 m, volume 678\.6 m\}\^3': r'\\text{${t.quests.novartis_tank_vol}}',
    r'\\text\{Roche Tower rectangular prism\}': r'\\text{${t.quests.roche_prism_core}}',
    r'\\text\{Basel water tank cylinder\}': r'\\text{${t.quests.basel_water_cyl_complex}}',
    r'\\text\{Basel Messe exhibition cube\}': r'\\text{${t.quests.basel_messe_cube}}',
    
    # Fix unit formatting: m^2 -> \text{ m}^2
    r'unit: "m\^2"': r'unit: "\\text{m}^2"',
    r'unit: "cm\^2"': r'unit: "\\text{cm}^2"',
    r'unit: "m\^3"': r'unit: "\\text{m}^3"',
    r'unit: "cm\^3"': r'unit: "\\text{cm}^3"',
    
    # Fix hardcoded monitor label
    r'REAL-TIME GEOMETRY': r'{t.quests.realtime_geo}',
}

# Apply replacements
for pattern, replacement in replacements.items():
    content = re.sub(pattern, replacement, content)

# Write back
with open('src/app/chamber/sm1-01/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Fixed SM1.01 i18n and LaTeX formatting")
