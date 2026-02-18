#!/usr/bin/env python3
"""
Migrate the final 4 chamber modules to use useLanguage() hook
"""

import re
import os

def migrate_file(filepath, module_key):
    """Migrate a single file to use useLanguage hook"""
    print(f"\n🔄 Processing {filepath}...")
    
    if not os.path.exists(filepath):
        print(f"❌ File not found: {filepath}")
        return False
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Step 1: Replace import
    content = content.replace(
        'import { translations } from "@/lib/i18n";',
        'import { useLanguage } from "@/lib/i18n";'
    )
    
    # Step 2: Remove currentLanguage from useAppStore destructuring
    content = re.sub(
        r'const \{ currentLanguage, (completeStage[^}]*)\} = useAppStore\(\);',
        r'const { \1} = useAppStore();',
        content
    )
    
    # Step 3: Replace locale and t declarations with useLanguage hook
    pattern = r'const locale = translations\[currentLanguage[^\n]+\n\s*const t = locale\.' + module_key + r'[^\n]+;'
    content = re.sub(pattern, 'const { t } = useLanguage();', content)
    
    # Step 4: Remove t parameter from buildStagePool function signature
    content = re.sub(
        r'\(t: typeof translations\.EN\.' + module_key + r', (difficulty: Difficulty, stage: Stage)\)',
        r'(\1)',
        content
    )
    
    # Step 5: Remove t argument from buildPool call
    content = re.sub(
        r'buildPool: \(difficulty, stage\) => buildStagePool\(t, (difficulty, stage as Stage)\)',
        r'buildPool: (difficulty, stage) => buildStagePool(\1)',
        content
    )
    
    # Check if any changes were made
    if content == original_content:
        print(f"⚠️  No changes made to {filepath}")
        return False
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Successfully migrated {filepath}")
    return True

# Migrate all 4 files
files_to_migrate = [
    ('src/app/chamber/sc2-01/page.tsx', 'sc2_01'),
    ('src/app/chamber/sm1-03/page.tsx', 'sm1_03'),
    ('src/app/chamber/sm1-04/page.tsx', 'sm1_04'),
    ('src/app/chamber/sm2-08/page.tsx', 'sm2_08'),
]

print("=" * 60)
print("i18n Migration Script - Final 4 Modules")
print("=" * 60)

success_count = 0
for filepath, module_key in files_to_migrate:
    if migrate_file(filepath, module_key):
        success_count += 1

print("\n" + "=" * 60)
print(f"✅ Migration complete: {success_count}/{len(files_to_migrate)} files migrated")
print("=" * 60)
