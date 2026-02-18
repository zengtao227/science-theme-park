#!/usr/bin/env python3
"""
Fix t usage from object notation to function calls
"""

import re

def fix_file(filepath, module_key):
    print(f"\n🔄 Fixing {filepath}...")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace t.scenarios?.key with t("module.scenarios.key")
    content = re.sub(
        r't\.scenarios\?\.(\w+)',
        rf't("{module_key}.scenarios.\1")',
        content
    )
    
    # Replace t.problems?.key with t("module.problems.key")
    content = re.sub(
        r't\.problems\?\.(\w+)',
        rf't("{module_key}.problems.\1")',
        content
    )
    
    # Replace t.stages?.key with t("module.stages.key")
    content = re.sub(
        r't\.stages\?\.(\w+)',
        rf't("{module_key}.stages.\1")',
        content
    )
    
    # Replace t.difficulty?.key with t("module.difficulty.key")
    content = re.sub(
        r't\.difficulty\?\.(\w+)',
        rf't("{module_key}.difficulty.\1")',
        content
    )
    
    # Replace t?.key with t("module.key")
    content = re.sub(
        r't\?\.(\w+)',
        rf't("{module_key}.\1")',
        content
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Fixed {filepath}")

files = [
    ('src/app/chamber/sc2-01/page.tsx', 'sc2_01'),
    ('src/app/chamber/sm1-03/page.tsx', 'sm1_03'),
    ('src/app/chamber/sm1-04/page.tsx', 'sm1_04'),
    ('src/app/chamber/sm2-08/page.tsx', 'sm2_08'),
]

for filepath, module_key in files:
    fix_file(filepath, module_key)

print("\n✅ All files fixed!")
