#!/bin/bash

# This script replaces all remaining hardcoded promptLatex strings with translation keys

FILE="src/app/chamber/sp3-04/page.tsx"

# BUOYANCY BASIC
sed -i 's|promptLatex: `F_b = \\rho Vg\. \\text{ If } V = 0\.1 \\text{ m}\^3, \\rho = 1000, \\text{ find buoyant force } F_b\.|promptLatex: t("sp3_04.prompts.buoyancy_basic_1")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Object volume 0\.05 m}\^3 \\text{ in water\. Buoyant force?}`|promptLatex: t("sp3_04.prompts.buoyancy_basic_2")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Balloon volume 0\.2 m}\^3 \\text{ in air } (\\rho = 1\.2 \\text{ kg/m}\^3)\. \\text{ Buoyant force?}`|promptLatex: t("sp3_04.prompts.buoyancy_basic_3")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Rock volume 0\.01 m}\^3 \\text{ submerged in water\. Buoyant force?}`|promptLatex: t("sp3_04.prompts.buoyancy_basic_4")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Boat displaces 0\.5 m}\^3 \\text{ of water\. Buoyant force?}`|promptLatex: t("sp3_04.prompts.buoyancy_basic_5")|g' "$FILE"

# BUOYANCY CORE
sed -i 's|promptLatex: `\\text{Wood block: mass 10 kg, volume 0\.02 m}\^3\. \\text{ Will it float in water?}`|promptLatex: t("sp3_04.prompts.buoyancy_core_1")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Object: weight 1500 N, volume 0\.1 m}\^3 \\text{ in water\. Net force?}`|promptLatex: t("sp3_04.prompts.buoyancy_core_2")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Ice cube: density 900 kg/m}\^3, \\text{ volume 0\.05 m}\^3\. \\text{ Fraction submerged in water?}`|promptLatex: t("sp3_04.prompts.buoyancy_core_3")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Aluminum block: mass 81 kg, volume 0\.03 m}\^3\. \\text{ Apparent weight in water?}`|promptLatex: t("sp3_04.prompts.buoyancy_core_4")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Hot air balloon: volume 1000 m}\^3, \\rho_{air} = 1\.2, \\rho_{hot} = 0\.9\. \\text{ Lift force?}`|promptLatex: t("sp3_04.prompts.buoyancy_core_5")|g' "$FILE"

# BUOYANCY ADVANCED
sed -i 's|promptLatex: `\\text{Hydrometer: mass 50 g, volume 40 cm}\^3\. \\text{ Depth submerged in water?}`|promptLatex: t("sp3_04.prompts.buoyancy_advanced_1")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Ship: mass 50000 kg\. Volume of water displaced?}`|promptLatex: t("sp3_04.prompts.buoyancy_advanced_2")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Cork: density 250 kg/m}\^3, \\text{ volume 0\.02 m}\^3 \\text{ in water\. Maximum load before sinking?}`|promptLatex: t("sp3_04.prompts.buoyancy_advanced_3")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Gold nugget: mass 19\.3 kg, volume 0\.001 m}\^3\. \\text{ Tension in string when submerged?}`|promptLatex: t("sp3_04.prompts.buoyancy_advanced_4")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Submarine: volume 500 m}\^3, \\text{ mass 400000 kg\. Ballast water needed to submerge?}`|promptLatex: t("sp3_04.prompts.buoyancy_advanced_5")|g' "$FILE"

# BUOYANCY ELITE
sed -i 's|promptLatex: `\\text{Two-fluid system: object half in water, half in oil } (\\rho_o = 800)\. \\text{ Total buoyant force if } V = 0\.1 \\text{ m}\^3?`|promptLatex: t("sp3_04.prompts.buoyancy_elite_1")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Hollow sphere: outer radius 0\.2 m, inner radius 0\.15 m, mass 10 kg\. Will it float?}`|promptLatex: t("sp3_04.prompts.buoyancy_elite_2")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Iceberg: density 900 kg/m}\^3 \\text{ in seawater } (\\rho = 1030)\. \\text{ Fraction above water?}`|promptLatex: t("sp3_04.prompts.buoyancy_elite_3")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Helium balloon: volume 1 m}\^3, \\rho_{He} = 0\.18, \\rho_{air} = 1\.2, \\text{ balloon mass 0\.5 kg\. Max payload?}`|promptLatex: t("sp3_04.prompts.buoyancy_elite_4")|g' "$FILE"
sed -i "s|promptLatex: \`\\\\text{Archimedes' crown: weight in air 10 N, in water 8\.5 N\. Density?}\`|promptLatex: t(\"sp3_04.prompts.buoyancy_elite_5\")|g" "$FILE"

# HYDRAULICS BASIC
sed -i 's|promptLatex: `P = F/A\. \\text{ If } F = 100 \\text{ N on } A = 0\.01 \\text{ m}\^2, \\text{ find pressure } P\.|promptLatex: t("sp3_04.prompts.hydraulics_basic_1")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Hydraulic press: 200 N on 0\.02 m}\^2\. \\text{ Pressure?}`|promptLatex: t("sp3_04.prompts.hydraulics_basic_2")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Piston: 500 N on 0\.05 m}\^2\. \\text{ Pressure?}`|promptLatex: t("sp3_04.prompts.hydraulics_basic_3")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Hydraulic cylinder: 1000 N on 0\.1 m}\^2\. \\text{ Pressure?}`|promptLatex: t("sp3_04.prompts.hydraulics_basic_4")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Small piston: 50 N on 0\.005 m}\^2\. \\text{ Pressure?}`|promptLatex: t("sp3_04.prompts.hydraulics_basic_5")|g' "$FILE"

# HYDRAULICS CORE
sed -i 's|promptLatex: `\\text{Hydraulic lift: } A_1 = 0\.01 \\text{ m}\^2, A_2 = 0\.1 \\text{ m}\^2, F_1 = 100 \\text{ N\. Find } F_2\.|promptLatex: t("sp3_04.prompts.hydraulics_core_1")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Hydraulic brake: } A_1 = 0\.005 \\text{ m}\^2, A_2 = 0\.05 \\text{ m}\^2, F_1 = 50 \\text{ N\. Find } F_2\.|promptLatex: t("sp3_04.prompts.hydraulics_core_2")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Hydraulic jack: } A_1 = 0\.02 \\text{ m}\^2, A_2 = 0\.2 \\text{ m}\^2, F_1 = 200 \\text{ N\. Find } F_2\.|promptLatex: t("sp3_04.prompts.hydraulics_core_3")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Hydraulic press: } A_1 = 0\.001 \\text{ m}\^2, A_2 = 0\.1 \\text{ m}\^2, F_1 = 10 \\text{ N\. Find } F_2\.|promptLatex: t("sp3_04.prompts.hydraulics_core_4")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Hydraulic system: } A_1 = 0\.03 \\text{ m}\^2, A_2 = 0\.3 \\text{ m}\^2, F_1 = 300 \\text{ N\. Find } F_2\.|promptLatex: t("sp3_04.prompts.hydraulics_core_5")|g' "$FILE"

# HYDRAULICS ADVANCED
sed -i 's|promptLatex: `\\text{Hydraulic lift: } A_1 = 0\.01 \\text{ m}\^2, F_1 = 100 \\text{ N, } F_2 = 5000 \\text{ N\. Find } A_2\.|promptLatex: t("sp3_04.prompts.hydraulics_advanced_1")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Hydraulic system: } A_1 = 0\.002 \\text{ m}\^2, A_2 = 0\.2 \\text{ m}\^2, \\text{ piston 1 moves 10 cm\. Piston 2 moves?}`|promptLatex: t("sp3_04.prompts.hydraulics_advanced_2")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Hydraulic press: efficiency 90\\%\. } A_1 = 0\.01 \\text{ m}\^2, A_2 = 0\.1 \\text{ m}\^2, F_1 = 200 \\text{ N\. Find } F_2\.|promptLatex: t("sp3_04.prompts.hydraulics_advanced_3")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Hydraulic jack: } A_1 = 0\.005 \\text{ m}\^2, A_2 = 0\.5 \\text{ m}\^2, F_1 = 100 \\text{ N\. Mechanical advantage?}`|promptLatex: t("sp3_04.prompts.hydraulics_advanced_4")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Hydraulic brake: } A_1 = 0\.01 \\text{ m}\^2, A_2 = 0\.04 \\text{ m}\^2, F_1 = 150 \\text{ N, } d_1 = 5 \\text{ cm\. Work done?}`|promptLatex: t("sp3_04.prompts.hydraulics_advanced_5")|g' "$FILE"

# HYDRAULICS ELITE
sed -i 's|promptLatex: `\\text{Multi-stage hydraulic: } A_1 = 0\.001, A_2 = 0\.01, A_3 = 0\.1 \\text{ m}\^2, F_1 = 50 \\text{ N\. Find } F_3\.|promptLatex: t("sp3_04.prompts.hydraulics_elite_1")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Hydraulic system with friction: } A_1 = 0\.01, A_2 = 0\.1 \\text{ m}\^2, F_1 = 200 \\text{ N, friction } = 100 \\text{ N\. Net } F_2?`|promptLatex: t("sp3_04.prompts.hydraulics_elite_2")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Hydraulic accumulator: } A_1 = 0\.005, A_2 = 0\.05 \\text{ m}\^2, \\text{ pressure } = 2 \\times 10\^6 \\text{ Pa\. Force on } A_2?`|promptLatex: t("sp3_04.prompts.hydraulics_elite_3")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Hydraulic damper: } A = 0\.01 \\text{ m}\^2, \\text{ velocity } = 0\.5 \\text{ m/s, viscosity creates } 200 \\text{ N resistance\. Net force?}`|promptLatex: t("sp3_04.prompts.hydraulics_elite_4")|g' "$FILE"
sed -i 's|promptLatex: `\\text{Hydraulic circuit: } A_1 = 0\.002, A_2 = 0\.02, A_3 = 0\.2 \\text{ m}\^2 \\text{ in series\. } F_1 = 100 \\text{ N\. Total MA?}`|promptLatex: t("sp3_04.prompts.hydraulics_elite_5")|g' "$FILE"

echo "All prompt replacements completed!"
