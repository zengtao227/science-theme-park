#!/usr/bin/env python3
"""
Generate the mapping for SP3-04 prompt replacements
"""

# Define the mapping structure
stages = {
    "PRESSURE": {
        "BASIC": 5,
        "CORE": 5,
        "ADVANCED": 5,
        "ELITE": 5
    },
    "BUOYANCY": {
        "BASIC": 5,
        "CORE": 5,
        "ADVANCED": 5,
        "ELITE": 5
    },
    "HYDRAULICS": {
        "BASIC": 5,
        "CORE": 5,
        "ADVANCED": 5,
        "ELITE": 5
    }
}

# Generate the mapping
for stage_name, difficulties in stages.items():
    stage_lower = stage_name.lower()
    print(f"\n// {stage_name}")
    for diff_name, count in difficulties.items():
        diff_lower = diff_name.lower()
        for i in range(1, count + 1):
            key = f"{stage_lower}_{diff_lower}_{i}"
            print(f'promptLatex: t("sp3_04.prompts.{key}"),')
