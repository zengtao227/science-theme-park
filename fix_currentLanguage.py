#!/usr/bin/env python3
"""
Fix currentLanguage usage - get it from useLanguage hook
"""

import re

files = [
    'src/app/chamber/sm1-03/page.tsx',
    'src/app/chamber/sm1-04/page.tsx',
    'src/app/chamber/sm2-08/page.tsx',
]

for filepath in files:
    print(f"\n🔄 Fixing {filepath}...")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Change const { t } = useLanguage(); to const { t, currentLanguage } = useLanguage();
    content = re.sub(
        r'const \{ t \} = useLanguage\(\);',
        r'const { t, currentLanguage } = useLanguage();',
        content
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Fixed {filepath}")

print("\n✅ All files fixed!")
