#!/usr/bin/env python3
"""诊断语言切换 Bug - 找出所有使用了 useCallback + 空依赖数组 + t() 函数的模块"""

import os
import re
from pathlib import Path

def analyze_module(file_path):
    """分析单个模块文件"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    issues = []
    
    if 'useCallback' not in content:
        return None
    
    callback_pattern = r'useCallback\s*\(\s*\([^)]*\)\s*(?::\s*[^=]+)?\s*=>\s*\{[\s\S]*?\},\s*\[([^\]]*)\]\s*\)'
    matches = re.finditer(callback_pattern, content)
    
    for match in matches:
        callback_block = match.group(0)
        dependencies = match.group(1).strip()
        
        if 't(' in callback_block or 't.' in callback_block:
            if not dependencies:
                issues.append({
                    'type': 'CRITICAL',
                    'reason': 'useCallback with empty deps but uses t() inside',
                    'snippet': callback_block[:200] + '...'
                })
            elif 't' not in dependencies and 'sm1_01_t' not in dependencies and 'sm1_02_t' not in dependencies:
                issues.append({
                    'type': 'WARNING',
                    'reason': f'useCallback uses t() but deps [{dependencies}] may not include translation object',
                    'snippet': callback_block[:200] + '...'
                })
    
    if 'buildStagePool' in content:
        buildpool_pattern = r'const\s+buildStagePool\s*=\s*useCallback\([^,]+,\s*\[([^\]]*)\]\s*\)'
        buildpool_match = re.search(buildpool_pattern, content)
        
        if buildpool_match:
            deps = buildpool_match.group(1).strip()
            buildpool_block = buildpool_match.group(0)
            start_pos = buildpool_match.start()
            check_region = content[start_pos:start_pos+1000]
            
            if 't("' in check_region or "t('" in check_region:
                if not deps:
                    issues.append({
                        'type': 'CRITICAL',
                        'reason': 'buildStagePool with empty deps but uses t() inside',
                        'snippet': buildpool_block
                    })
    
    return issues if issues else None

def scan_all_modules():
    """扫描所有 chamber 模块"""
    chamber_dir = Path('src/app/chamber')
    
    if not chamber_dir.exists():
        print("❌ Chamber directory not found!")
        return
    
    results = {'critical': [], 'warning': [], 'clean': []}
    
    for module_dir in sorted(chamber_dir.iterdir()):
        if not module_dir.is_dir():
            continue
        
        page_file = module_dir / 'page.tsx'
        if not page_file.exists():
            continue
        
        module_name = module_dir.name
        issues = analyze_module(page_file)
        
        if issues:
            has_critical = any(issue['type'] == 'CRITICAL' for issue in issues)
            if has_critical:
                results['critical'].append((module_name, issues))
            else:
                results['warning'].append((module_name, issues))
        else:
            results['clean'].append(module_name)
    
    return results

def main():
    print("🔍 开始诊断语言切换 Bug...\n")
    
    results = scan_all_modules()
    
    if not results:
        return
    
    print("=" * 80)
    print("🚨 严重问题（CRITICAL）- 语言切换不生效")
    print("=" * 80)
    
    if results['critical']:
        for module_name, issues in results['critical']:
            print(f"\n📦 {module_name.upper()}")
            for i, issue in enumerate(issues, 1):
                if issue['type'] == 'CRITICAL':
                    print(f"  ❌ Issue {i}: {issue['reason']}")
        print(f"\n总计: {len(results['critical'])} 个模块有严重问题")
    else:
        print("✅ 没有发现严重问题")
    
    print("\n" + "=" * 80)
    print("⚠️  警告（WARNING）- 可能有问题")
    print("=" * 80)
    
    if results['warning']:
        for module_name, issues in results['warning']:
            print(f"\n📦 {module_name.upper()}")
            for i, issue in enumerate(issues, 1):
                if issue['type'] == 'WARNING':
                    print(f"  ⚠️  Issue {i}: {issue['reason']}")
        print(f"\n总计: {len(results['warning'])} 个模块有警告")
    else:
        print("✅ 没有发现警告")
    
    print("\n" + "=" * 80)
    print("📊 统计摘要")
    print("=" * 80)
    total = len(results['critical']) + len(results['warning']) + len(results['clean'])
    print(f"总模块数: {total}")
    print(f"严重问题: {len(results['critical'])} ({len(results['critical'])/total*100:.1f}%)")
    print(f"警告: {len(results['warning'])} ({len(results['warning'])/total*100:.1f}%)")
    print(f"正常: {len(results['clean'])} ({len(results['clean'])/total*100:.1f}%)")
    
    if results['critical']:
        print("\n" + "=" * 80)
        print("🎯 需要修复的模块列表")
        print("=" * 80)
        for module_name, _ in results['critical']:
            print(f"  - {module_name}")

if __name__ == '__main__':
    main()
