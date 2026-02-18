#!/usr/bin/env python3
"""
Batch fix all 22 modules with i18n and LaTeX formatting issues
"""

import re
import os
from pathlib import Path

# Module list with priority
MODULES_TO_FIX = [
    # High priority
    'sp3-04', 'sm1-03', 'sc3-01', 'gp2-02', 'sm1-04', 'sm2-08',
    # Medium priority
    'sp3-01', 'sp3-05', 'em1-01', 'gp2-01', 'sc2-05',
    # Low priority
    'gb1-01', 'sc3-05', 'sp3-08', 'sm1-02', 'sm1-05', 'sm3-05',
    'gb2-01', 'sc1-01', 'sc2-01', 'sp3-06'
]

def fix_unit_formatting(content):
    """Fix LaTeX unit formatting"""
    replacements = {
        r'unit: "m\^2"': r'unit: "\\text{m}^2"',
        r'unit: "m\^3"': r'unit: "\\text{m}^3"',
        r'unit: "cm\^2"': r'unit: "\\text{cm}^2"',
        r'unit: "cm\^3"': r'unit: "\\text{cm}^3"',
        r'unit: "kg"': r'unit: "\\text{kg}"',
        r'unit: "Pa"': r'unit: "\\text{Pa}"',
        r'unit: "N"': r'unit: "\\text{N}"',
        r'unit: "W"': r'unit: "\\text{W}"',
        r'unit: "J"': r'unit: "\\text{J}"',
        r'unit: "m/s"': r'unit: "\\text{m/s}"',
        r'unit: "m/s\^2"': r'unit: "\\text{m/s}^2"',
    }
    
    for pattern, replacement in replacements.items():
        content = re.sub(pattern, replacement, content)
    
    return content

def fix_module(module_name):
    """Fix a single module"""
    module_path = Path(f'src/app/chamber/{module_name}/page.tsx')
    
    if not module_path.exists():
        print(f"  ⚠️  Module file not found: {module_path}")
        return False
    
    try:
        with open(module_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Fix unit formatting
        original_content = content
        content = fix_unit_formatting(content)
        
        # Write back if changed
        if content != original_content:
            with open(module_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  ✅ Fixed unit formatting")
            return True
        else:
            print(f"  ℹ️  No unit formatting issues found")
            return False
            
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False

def main():
    print("=" * 80)
    print("BATCH FIX ALL MODULES - I18N AND LATEX FORMATTING")
    print("=" * 80)
    print()
    
    fixed_count = 0
    
    for i, module in enumerate(MODULES_TO_FIX, 1):
        print(f"[{i}/{len(MODULES_TO_FIX)}] Processing {module.upper()}...")
        if fix_module(module):
            fixed_count += 1
        print()
    
    print("=" * 80)
    print(f"SUMMARY: Fixed {fixed_count}/{len(MODULES_TO_FIX)} modules")
    print("=" * 80)
    print()
    print("⚠️  NOTE: Unit formatting has been fixed.")
    print("⚠️  Hardcoded English text still needs manual i18n translation.")
    print("⚠️  Run 'npm run build' to verify changes.")

if __name__ == '__main__':
    main()
