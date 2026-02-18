#!/usr/bin/env python3
"""
Scan all chamber modules for i18n and LaTeX formatting issues
"""

import os
import re
from pathlib import Path

def scan_file(filepath):
    """Scan a single file for issues"""
    issues = []
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        lines = content.split('\n')
    
    # Check for hardcoded English text in promptLatex
    hardcoded_patterns = [
        (r'promptLatex:.*\\text\{[A-Z][a-z]+.*[a-z]+\}', 'Hardcoded English in promptLatex'),
        (r'unit: "[a-z]\^[23]"', 'Incorrect unit format (should use \\text{})'),
        (r'unit: "m\^2"', 'Unit m^2 should be \\text{m}^2'),
        (r'unit: "m\^3"', 'Unit m^3 should be \\text{m}^3'),
        (r'unit: "cm\^2"', 'Unit cm^2 should be \\text{cm}^2'),
        (r'unit: "cm\^3"', 'Unit cm^3 should be \\text{cm}^3'),
        (r'[A-Z][A-Z\s-]+GEOMETRY', 'Hardcoded monitor label'),
        (r'REAL-TIME', 'Hardcoded "REAL-TIME" text'),
    ]
    
    for i, line in enumerate(lines, 1):
        for pattern, description in hardcoded_patterns:
            if re.search(pattern, line):
                issues.append({
                    'line': i,
                    'description': description,
                    'content': line.strip()[:100]
                })
    
    return issues

def main():
    """Scan all chamber modules"""
    chamber_dir = Path('src/app/chamber')
    
    if not chamber_dir.exists():
        print("❌ Chamber directory not found")
        return
    
    all_issues = {}
    
    # Scan all page.tsx files in chamber subdirectories
    for module_dir in sorted(chamber_dir.iterdir()):
        if module_dir.is_dir():
            page_file = module_dir / 'page.tsx'
            if page_file.exists():
                issues = scan_file(page_file)
                if issues:
                    all_issues[module_dir.name] = issues
    
    # Print report
    print("=" * 80)
    print("MODULE I18N AND LATEX FORMATTING SCAN REPORT")
    print("=" * 80)
    print()
    
    if not all_issues:
        print("✅ No issues found! All modules are properly internationalized.")
        return
    
    print(f"Found issues in {len(all_issues)} modules:\n")
    
    for module, issues in all_issues.items():
        print(f"📦 {module.upper()}")
        print(f"   Issues: {len(issues)}")
        for issue in issues[:3]:  # Show first 3 issues
            print(f"   Line {issue['line']}: {issue['description']}")
            print(f"      {issue['content']}")
        if len(issues) > 3:
            print(f"   ... and {len(issues) - 3} more issues")
        print()
    
    print("=" * 80)
    print(f"SUMMARY: {len(all_issues)} modules need fixing")
    print("=" * 80)

if __name__ == '__main__':
    main()
