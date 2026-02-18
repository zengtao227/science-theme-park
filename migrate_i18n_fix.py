#!/usr/bin/env python3
"""
Fix the buildPool pattern for sm1-03, sm1-04, sm2-08
"""

import re

files_to_fix = [
    'src/app/chamber/sm1-03/page.tsx',
    'src/app/chamber/sm1-04/page.tsx',
    'src/app/chamber/sm2-08/page.tsx',
]

for filepath in files_to_fix:
    print(f"\n🔄 Fixing {filepath}...")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern 1: Fix buildPool definition that still passes t
    # const buildPool = useCallback((difficulty: Difficulty, stage: Stage) => buildStagePool(t, difficulty, stage), [t, buildStagePool]);
    content = re.sub(
        r'const buildPool = useCallback\(\(difficulty: Difficulty, stage: Stage\) => buildStagePool\(t, (difficulty, stage)\), \[t, buildStagePool\]\);',
        r'const buildPool = useCallback((difficulty: Difficulty, stage: Stage) => buildStagePool(\1), [buildStagePool]);',
        content
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Fixed {filepath}")

print("\n✅ All files fixed!")
