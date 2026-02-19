#!/usr/bin/env python3
"""
安全的 LaTeX 转义修复脚本
只修复明确的 LaTeX 字段，不影响其他代码
"""

import re
from pathlib import Path

def fix_latex_field_value(value):
    """修复 LaTeX 字段值中的转义"""
    
    # 跳过已经正确的情况
    if '\\\\\\\\text{' in value or '\\\\\\\\frac{' in value:
        return value
    
    # LaTeX 命令列表
    commands = [
        'text', 'frac', 'sqrt', 'begin', 'end',
        'cdot', 'times', 'div', 'pm', 'leq', 'geq',
        'sin', 'cos', 'tan', 'log', 'ln',
        'alpha', 'beta', 'gamma', 'delta', 'theta', 'pi', 'sigma'
    ]
    
    for cmd in commands:
        # 三反斜杠 -> 四反斜杠
        value = value.replace(f'\\\\\\{cmd}{{', f'\\\\\\\\{cmd}{{')
        
        # 双反斜杠 -> 四反斜杠（使用更精确的匹配）
        # 只在不是四反斜杠的情况下替换
        pattern = rf'(?<!\\\\)\\\\{cmd}\{{'
        value = re.sub(pattern, rf'\\\\\\\\{cmd}{{', value)
    
    # 处理 cases 环境中的行分隔符
    if 'cases}' in value or 'pmatrix}' in value:
        # 空格 + 双反斜杠 + 空格 -> 空格 + 八反斜杠 + 空格
        value = re.sub(r' \\\\ ', r' \\\\\\\\ ', value)
    
    return value

def process_file(filepath):
    """处理单个文件"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    modified = False
    new_lines = []
    
    # LaTeX 字段名称
    latex_fields = [
        'expressionLatex', 'promptLatex', 'correctLatex',
        'hintLatex', 'targetLatex', 'labelLatex',
        'solutionLatex', 'formulaLatex'
    ]
    
    for line in lines:
        original_line = line
        
        # 检查这一行是否包含 LaTeX 字段
        for field in latex_fields:
            # 匹配 field: `value` 或 field: "value" 或 field: 'value'
            # 或 field: [`value`, `value`]
            
            # 单个值的情况
            pattern1 = rf'({field}:\s*)([`"\'])([^`"\']*?)(\2)'
            
            def replace_single(match):
                prefix = match.group(1)
                quote = match.group(2)
                value = match.group(3)
                
                fixed_value = fix_latex_field_value(value)
                return prefix + quote + fixed_value + quote
            
            line = re.sub(pattern1, replace_single, line)
            
            # 数组的情况 (简化处理，只处理同一行的)
            if f'{field}: [' in line:
                # 提取数组中的每个字符串并修复
                def replace_array_item(match):
                    quote = match.group(1)
                    value = match.group(2)
                    fixed_value = fix_latex_field_value(value)
                    return quote + fixed_value + quote
                
                line = re.sub(r'([`"\'])([^`"\']*?)(\1)', replace_array_item, line)
        
        if line != original_line:
            modified = True
        
        new_lines.append(line)
    
    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        return True
    
    return False

def main():
    """主函数"""
    
    print("=" * 70)
    print("🎯 安全的 Chamber 模块 LaTeX 转义修复")
    print("=" * 70)
    print()
    
    chamber_dir = Path('src/app/chamber')
    page_files = sorted(chamber_dir.glob('*/page.tsx'), key=lambda p: p.parent.name)
    
    print(f"📊 找到 {len(page_files)} 个模块")
    print()
    
    fixed_count = 0
    
    for page_file in page_files:
        module_code = page_file.parent.name.upper()
        
        try:
            was_fixed = process_file(page_file)
            
            if was_fixed:
                print(f"✅ {module_code}: 已修复")
                fixed_count += 1
            else:
                print(f"⏭️  {module_code}: 无需修复")
        
        except Exception as e:
            print(f"❌ {module_code}: 错误 - {e}")
    
    print()
    print("=" * 70)
    print(f"✅ 修复完成: {fixed_count} 个模块")
    print(f"📊 总计: {len(page_files)} 个模块")
    print("=" * 70)

if __name__ == '__main__':
    main()
