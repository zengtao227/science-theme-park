#!/usr/bin/env python3
"""
Fix quest usage - quest is an object, not a translation function
"""

import re

files = [
    'src/app/chamber/sc2-01/page.tsx',
    'src/app/chamber/sm1-03/page.tsx',
    'src/app/chamber/sm1-04/page.tsx',
    'src/app/chamber/sm2-08/page.tsx',
]

for filepath in files:
    print(f"\n🔄 Fixing {filepath}...")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix quest("module.key") back to quest?.key
    content = re.sub(
        r'quest\("[\w_]+\.(\w+)"\)',
        r'quest?.\1',
        content
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Fixed {filepath}")

print("\n✅ All files fixed!")
