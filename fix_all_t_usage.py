#!/usr/bin/env python3
"""
Fix ALL t usage patterns comprehensively
"""

import re

def fix_file(filepath, module_key):
    print(f"\n🔄 Fixing {filepath}...")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern 1: t.scenarios.key (without ?)
    content = re.sub(
        r't\.scenarios\.(\w+)',
        rf't("{module_key}.scenarios.\1")',
        content
    )
    
    # Pattern 2: t.problems.key (without ?)
    content = re.sub(
        r't\.problems\.(\w+)',
        rf't("{module_key}.problems.\1")',
        content
    )
    
    # Pattern 3: t.stages.key (without ?)
    content = re.sub(
        r't\.stages\.(\w+)',
        rf't("{module_key}.stages.\1")',
        content
    )
    
    # Pattern 4: t.difficulty.key (without ?)
    content = re.sub(
        r't\.difficulty\.(\w+)',
        rf't("{module_key}.difficulty.\1")',
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
