#!/usr/bin/env python3
"""
Fix remaining t.key patterns
"""

import re

def fix_file(filepath, module_key):
    print(f"\n🔄 Fixing {filepath}...")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix t.key pattern (direct property access)
    # But NOT quest.key or other variables
    # Match: t.word but not quest.word
    content = re.sub(
        r'(?<![a-zA-Z])t\.(\w+)(?!\()',
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
