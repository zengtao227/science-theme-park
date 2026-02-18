#!/usr/bin/env python3
with open('src/app/chamber/sp3-04/page.tsx', 'r') as f:
    content = f.read()

# Quadruple backslashes for template literals
r = [
    ('promptLatex: `\\\\text{Two-layer fluid: 30 m water + 20 m oil } (\\\\rho_w = 1000, \\\\rho_o = 800). \\\\text{ Pressure at bottom?}`', 'promptLatex: t("sp3_04.prompts.pressure_advanced_1")'),
    ('promptLatex: `\\\\text{Hydraulic lift: small piston 0.001 m}^2, \\\\text{ large piston 0.1 m}^2. \\\\text{ Force 100 N on small. Force on large?}`', 'promptLatex: t("sp3_04.prompts.pressure_advanced_2")'),
    ('promptLatex: `\\\\text{U-tube: water on left, mercury on right. Water height 10 m. Mercury height? } (\\\\rho_w = 1000, \\\\rho_{Hg} = 13600)`', 'promptLatex: t("sp3_04.prompts.pressure_advanced_3")'),
    ('promptLatex: `\\\\text{Hydraulic brake: master cylinder 0.01 m}^2, \\\\text{ slave cylinder 0.05 m}^2. \\\\text{ Force 200 N on master. Force on slave?}`', 'promptLatex: t("sp3_04.prompts.pressure_advanced_4")'),
    ('promptLatex: `\\\\text{Deep ocean: 200 m depth. Total pressure? } (P_{atm} = 101000, \\\\rho = 1030)`', 'promptLatex: t("sp3_04.prompts.pressure_advanced_5")'),
    ('promptLatex: `\\\\text{Mariana Trench: 11000 m depth. Pressure? } (\\\\rho = 1050, P_{atm} = 101000)`', 'promptLatex: t("sp3_04.prompts.pressure_elite_1")'),
    ('promptLatex: `\\\\text{Hydraulic system: A}_1 = 0.0001 \\\\text{ m}^2, A_2 = 0.01 \\\\text{ m}^2. \\\\text{ Mechanical advantage?}`', 'promptLatex: t("sp3_04.prompts.pressure_elite_2")'),
    ('promptLatex: `\\\\text{Three-layer fluid: 2 m water, 2 m oil } (\\\\rho = 800), \\\\text{ 1 m mercury } (\\\\rho = 13600). \\\\text{ Total pressure?}`', 'promptLatex: t("sp3_04.prompts.pressure_elite_3")'),
    ('promptLatex: `\\\\text{Hydraulic jack: efficiency 80\\\\%. Input 500 N on 0.002 m}^2, \\\\text{ output area 0.2 m}^2. \\\\text{ Output force?}`', 'promptLatex: t("sp3_04.prompts.pressure_elite_4")'),
    ('promptLatex: `\\\\text{Submarine at 1000 m. Pressure difference across 1 m}^2 \\\\text{ hatch? } (\\\\rho = 1030)`', 'promptLatex: t("sp3_04.prompts.pressure_elite_5")'),
    ('promptLatex: `F_b = \\\\rho Vg. \\\\text{ If } V = 0.1 \\\\text{ m}^3, \\\\rho = 1000, \\\\text{ find buoyant force } F_b.`', 'promptLatex: t("sp3_04.prompts.buoyancy_basic_1")'),
    ('promptLatex: `\\\\text{Object volume 0.05 m}^3 \\\\text{ in water. Buoyant force?}`', 'promptLatex: t("sp3_04.prompts.buoyancy_basic_2")'),
    ('promptLatex: `\\\\text{Balloon volume 0.2 m}^3 \\\\text{ in air } (\\\\rho = 1.2 \\\\text{ kg/m}^3). \\\\text{ Buoyant force?}`', 'promptLatex: t("sp3_04.prompts.buoyancy_basic_3")'),
    ('promptLatex: `\\\\text{Rock volume 0.01 m}^3 \\\\text{ submerged in water. Buoyant force?}`', 'promptLatex: t("sp3_04.prompts.buoyancy_basic_4")'),
    ('promptLatex: `\\\\text{Boat displaces 0.5 m}^3 \\\\text{ of water. Buoyant force?}`', 'promptLatex: t("sp3_04.prompts.buoyancy_basic_5")'),
    ('promptLatex: `\\\\text{Wood block: mass 10 kg, volume 0.02 m}^3. \\\\text{ Will it float in water?}`', 'promptLatex: t("sp3_04.prompts.buoyancy_core_1")'),
    ('promptLatex: `\\\\text{Object: weight 1500 N, volume 0.1 m}^3 \\\\text{ in water. Net force?}`', 'promptLatex: t("sp3_04.prompts.buoyancy_core_2")'),
    ('promptLatex: `\\\\text{Ice cube: density 900 kg/m}^3, \\\\text{ volume 0.05 m}^3. \\\\text{ Fraction submerged in water?}`', 'promptLatex: t("sp3_04.prompts.buoyancy_core_3")'),
    ('promptLatex: `\\\\text{Aluminum block: mass 81 kg, volume 0.03 m}^3. \\\\text{ Apparent weight in water?}`', 'promptLatex: t("sp3_04.prompts.buoyancy_core_4")'),
    ('promptLatex: `\\\\text{Hot air balloon: volume 1000 m}^3, \\\\rho_{air} = 1.2, \\\\rho_{hot} = 0.9. \\\\text{ Lift force?}`', 'promptLatex: t("sp3_04.prompts.buoyancy_core_5")'),
    ('promptLatex: `\\\\text{Hydrometer: mass 50 g, volume 40 cm}^3. \\\\text{ Depth submerged in water?}`', 'promptLatex: t("sp3_04.prompts.buoyancy_advanced_1")'),
    ('promptLatex: `\\\\text{Ship: mass 50000 kg. Volume of water displaced?}`', 'promptLatex: t("sp3_04.prompts.buoyancy_advanced_2")'),
    ('promptLatex: `\\\\text{Cork: density 250 kg/m}^3, \\\\text{ volume 0.02 m}^3 \\\\text{ in water. Maximum load before sinking?}`', 'promptLatex: t("sp3_04.prompts.buoyancy_advanced_3")'),
    ('promptLatex: `\\\\text{Gold nugget: mass 19.3 kg, volume 0.001 m}^3. \\\\text{ Tension in string when submerged?}`', 'promptLatex: t("sp3_04.prompts.buoyancy_advanced_4")'),
    ('promptLatex: `\\\\text{Submarine: volume 500 m}^3, \\\\text{ mass 400000 kg. Ballast water needed to submerge?}`', 'promptLatex: t("sp3_04.prompts.buoyancy_advanced_5")'),
    ('promptLatex: `\\\\text{Two-fluid system: object half in water, half in oil } (\\\\rho_o = 800). \\\\text{ Total buoyant force if } V = 0.1 \\\\text{ m}^3?`', 'promptLatex: t("sp3_04.prompts.buoyancy_elite_1")'),
    ('promptLatex: `\\\\text{Hollow sphere: outer radius 0.2 m, inner radius 0.15 m, mass 10 kg. Will it float?}`', 'promptLatex: t("sp3_04.prompts.buoyancy_elite_2")'),
    ('promptLatex: `\\\\text{Iceberg: density 900 kg/m}^3 \\\\text{ in seawater } (\\\\rho = 1030). \\\\text{ Fraction above water?}`', 'promptLatex: t("sp3_04.prompts.buoyancy_elite_3")'),
    ('promptLatex: `\\\\text{Helium balloon: volume 1 m}^3, \\\\rho_{He} = 0.18, \\\\rho_{air} = 1.2, \\\\text{ balloon mass 0.5 kg. Max payload?}`', 'promptLatex: t("sp3_04.prompts.buoyancy_elite_4")'),
    ("promptLatex: `\\\\text{Archimedes' crown: weight in air 10 N, in water 8.5 N. Density?}`", 'promptLatex: t("sp3_04.prompts.buoyancy_elite_5")'),
    ('promptLatex: `P = F/A. \\\\text{ If } F = 100 \\\\text{ N on } A = 0.01 \\\\text{ m}^2, \\\\text{ find pressure } P.`', 'promptLatex: t("sp3_04.prompts.hydraulics_basic_1")'),
    ('promptLatex: `\\\\text{Hydraulic press: 200 N on 0.02 m}^2. \\\\text{ Pressure?}`', 'promptLatex: t("sp3_04.prompts.hydraulics_basic_2")'),
    ('promptLatex: `\\\\text{Piston: 500 N on 0.05 m}^2. \\\\text{ Pressure?}`', 'promptLatex: t("sp3_04.prompts.hydraulics_basic_3")'),
    ('promptLatex: `\\\\text{Hydraulic cylinder: 1000 N on 0.1 m}^2. \\\\text{ Pressure?}`', 'promptLatex: t("sp3_04.prompts.hydraulics_basic_4")'),
    ('promptLatex: `\\\\text{Small piston: 50 N on 0.005 m}^2. \\\\text{ Pressure?}`', 'promptLatex: t("sp3_04.prompts.hydraulics_basic_5")'),
    ('promptLatex: `\\\\text{Hydraulic lift: } A_1 = 0.01 \\\\text{ m}^2, A_2 = 0.1 \\\\text{ m}^2, F_1 = 100 \\\\text{ N. Find } F_2.`', 'promptLatex: t("sp3_04.prompts.hydraulics_core_1")'),
    ('promptLatex: `\\\\text{Hydraulic brake: } A_1 = 0.005 \\\\text{ m}^2, A_2 = 0.05 \\\\text{ m}^2, F_1 = 50 \\\\text{ N. Find } F_2.`', 'promptLatex: t("sp3_04.prompts.hydraulics_core_2")'),
    ('promptLatex: `\\\\text{Hydraulic jack: } A_1 = 0.02 \\\\text{ m}^2, A_2 = 0.2 \\\\text{ m}^2, F_1 = 200 \\\\text{ N. Find } F_2.`', 'promptLatex: t("sp3_04.prompts.hydraulics_core_3")'),
    ('promptLatex: `\\\\text{Hydraulic press: } A_1 = 0.001 \\\\text{ m}^2, A_2 = 0.1 \\\\text{ m}^2, F_1 = 10 \\\\text{ N. Find } F_2.`', 'promptLatex: t("sp3_04.prompts.hydraulics_core_4")'),
    ('promptLatex: `\\\\text{Hydraulic system: } A_1 = 0.03 \\\\text{ m}^2, A_2 = 0.3 \\\\text{ m}^2, F_1 = 300 \\\\text{ N. Find } F_2.`', 'promptLatex: t("sp3_04.prompts.hydraulics_core_5")'),
    ('promptLatex: `\\\\text{Hydraulic lift: } A_1 = 0.01 \\\\text{ m}^2, F_1 = 100 \\\\text{ N, } F_2 = 5000 \\\\text{ N. Find } A_2.`', 'promptLatex: t("sp3_04.prompts.hydraulics_advanced_1")'),
    ('promptLatex: `\\\\text{Hydraulic system: } A_1 = 0.002 \\\\text{ m}^2, A_2 = 0.2 \\\\text{ m}^2, \\\\text{ piston 1 moves 10 cm. Piston 2 moves?}`', 'promptLatex: t("sp3_04.prompts.hydraulics_advanced_2")'),
    ('promptLatex: `\\\\text{Hydraulic press: efficiency 90\\\\%. } A_1 = 0.01 \\\\text{ m}^2, A_2 = 0.1 \\\\text{ m}^2, F_1 = 200 \\\\text{ N. Find } F_2.`', 'promptLatex: t("sp3_04.prompts.hydraulics_advanced_3")'),
    ('promptLatex: `\\\\text{Hydraulic jack: } A_1 = 0.005 \\\\text{ m}^2, A_2 = 0.5 \\\\text{ m}^2, F_1 = 100 \\\\text{ N. Mechanical advantage?}`', 'promptLatex: t("sp3_04.prompts.hydraulics_advanced_4")'),
    ('promptLatex: `\\\\text{Hydraulic brake: } A_1 = 0.01 \\\\text{ m}^2, A_2 = 0.04 \\\\text{ m}^2, F_1 = 150 \\\\text{ N, } d_1 = 5 \\\\text{ cm. Work done?}`', 'promptLatex: t("sp3_04.prompts.hydraulics_advanced_5")'),
    ('promptLatex: `\\\\text{Multi-stage hydraulic: } A_1 = 0.001, A_2 = 0.01, A_3 = 0.1 \\\\text{ m}^2, F_1 = 50 \\\\text{ N. Find } F_3.`', 'promptLatex: t("sp3_04.prompts.hydraulics_elite_1")'),
    ('promptLatex: `\\\\text{Hydraulic system with friction: } A_1 = 0.01, A_2 = 0.1 \\\\text{ m}^2, F_1 = 200 \\\\text{ N, friction } = 100 \\\\text{ N. Net } F_2?`', 'promptLatex: t("sp3_04.prompts.hydraulics_elite_2")'),
    ('promptLatex: `\\\\text{Hydraulic accumulator: } A_1 = 0.005, A_2 = 0.05 \\\\text{ m}^2, \\\\text{ pressure } = 2 \\\\times 10^6 \\\\text{ Pa. Force on } A_2?`', 'promptLatex: t("sp3_04.prompts.hydraulics_elite_3")'),
    ('promptLatex: `\\\\text{Hydraulic damper: } A = 0.01 \\\\text{ m}^2, \\\\text{ velocity } = 0.5 \\\\text{ m/s, viscosity creates } 200 \\\\text{ N resistance. Net force?}`', 'promptLatex: t("sp3_04.prompts.hydraulics_elite_4")'),
    ('promptLatex: `\\\\text{Hydraulic circuit: } A_1 = 0.002, A_2 = 0.02, A_3 = 0.2 \\\\text{ m}^2 \\\\text{ in series. } F_1 = 100 \\\\text{ N. Total MA?}`', 'promptLatex: t("sp3_04.prompts.hydraulics_elite_5")'),
]

c = 0
for old, new in r:
    if old in content:
        content = content.replace(old, new)
        c += 1

with open('src/app/chamber/sp3-04/page.tsx', 'w') as f:
    f.write(content)

print(f"✅ Replaced {c}/50 prompts!")
