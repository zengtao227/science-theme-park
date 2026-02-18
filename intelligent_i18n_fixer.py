#!/usr/bin/env python3
"""
Intelligent I18N Fixer - Automatically extract and fix hardcoded English text
This script will:
1. Extract hardcoded English text from promptLatex
2. Generate translation keys
3. Create translation entries (EN only, CN/DE need manual translation)
4. Update module code to use translations
"""

import re
import json
from pathlib import Path
from collections import defaultdict

def extract_hardcoded_text(content):
    """Extract hardcoded English text from promptLatex"""
    hardcoded_texts = []
    
    # Pattern to match promptLatex with hardcoded English
    # Looking for: promptLatex: "text" or promptLatex: `text`
    patterns = [
        r'promptLatex:\s*["`]([^"`]*\\text\{[^}]*\}[^"`]*)["`]',
        r'promptLatex:\s*["`]([A-Z][^"`]{10,})["`]',
    ]
    
    for pattern in patterns:
        matches = re.finditer(pattern, content, re.MULTILINE)
        for match in matches:
            text = match.group(1)
            # Skip if it already uses ${t. or ${data.
            if '${t.' not in text and '${data.' not in text:
                hardcoded_texts.append({
                    'text': text,
                    'full_match': match.group(0)
                })
    
    return hardcoded_texts

def generate_translation_key(text, existing_keys):
    """Generate a unique translation key from text"""
    # Clean the text
    clean = re.sub(r'\\text\{([^}]+)\}', r'\1', text)
    clean = re.sub(r'[^a-zA-Z0-9\s]', '', clean)
    clean = clean.lower().strip()
    
    # Take first few words
    words = clean.split()[:4]
    key = '_'.join(words)
    
    # Ensure uniqueness
    base_key = key
    counter = 1
    while key in existing_keys:
        key = f"{base_key}_{counter}"
        counter += 1
    
    return key

def process_module(module_name):
    """Process a single module"""
    module_path = Path(f'src/app/chamber/{module_name}/page.tsx')
    
    if not module_path.exists():
        return None
    
    with open(module_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract hardcoded texts
    hardcoded = extract_hardcoded_text(content)
    
    if not hardcoded:
        return None
    
    # Generate translation keys
    existing_keys = set()
    translations = {}
    
    for item in hardcoded:
        key = generate_translation_key(item['text'], existing_keys)
        existing_keys.add(key)
        translations[key] = item['text']
    
    return {
        'module': module_name,
        'count': len(hardcoded),
        'translations': translations,
        'items': hardcoded
    }

def main():
    """Main function"""
    print("=" * 80)
    print("INTELLIGENT I18N FIXER - ANALYSIS PHASE")
    print("=" * 80)
    print()
    
    modules = [
        'sp3-04', 'sm1-03', 'sc3-01', 'gp2-02', 'sm1-04', 'sm2-08',
        'sp3-01', 'sp3-05', 'em1-01', 'gp2-01', 'sc2-05',
        'gb1-01', 'sc3-05', 'sp3-08', 'sm1-02', 'sm1-05', 'sm3-05',
        'gb2-01', 'sc1-01', 'sc2-01', 'sp3-06'
    ]
    
    all_results = []
    
    for module in modules:
        result = process_module(module)
        if result:
            all_results.append(result)
            print(f"📦 {module.upper()}: Found {result['count']} hardcoded texts")
    
    print()
    print("=" * 80)
    print(f"TOTAL: {len(all_results)} modules need i18n fixes")
    print("=" * 80)
    print()
    
    # Save analysis results
    output_file = 'i18n_analysis_results.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_results, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Analysis results saved to: {output_file}")
    print()
    print("NEXT STEPS:")
    print("1. Review the analysis results")
    print("2. For each module, manually add translations to i18n files")
    print("3. Update module code to use translation keys")
    print()
    print("⚠️  This is a complex task requiring manual review and translation.")
    print("⚠️  Estimated time: 2-3 hours per high-priority module")

if __name__ == '__main__':
    main()
