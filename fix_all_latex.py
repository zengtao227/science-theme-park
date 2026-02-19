#!/usr/bin/env python3
"""
Chamber 模块 LaTeX 转义加固脚本
遵循 CHAMBER_MODULE_STANDARDS.md 第 5.2.1 节四反斜杠规则
"""

import os
import re
from pathlib import Path

def fix_latex_in_file(filepath):
    """修复单个文件中的 LaTeX 转义"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    changes = []
    
    # 1. 修复 expressionLatex, promptLatex, correctLatex, hintLatex, targetLatex, labelLatex 等字段
    # 这些字段通常在 buildStagePool 函数中
    
    # 策略：在这些字段的反引号或引号内容中，将 LaTeX 命令从双反斜杠改为四反斜杠
    
    # 匹配模式：fieldName: `...` 或 fieldName: "..." 或 fieldName: '...'
    latex_fields = [
        'expressionLatex', 'promptLatex', 'correctLatex', 'hintLatex', 
        'targetLatex', 'labelLatex', 'solutionLatex', 'formulaLatex'
    ]
    
    for field in latex_fields:
        # 匹配 field: `content` 或 field: "content" 或 field: 'content'
        # 使用非贪婪匹配
        pattern = rf'({field}:\s*[`"\'])([^`"\']*?)([`"\'])'
        
        def replace_latex(match):
            prefix = match.group(1)
            latex_content = match.group(2)
            suffix = match.group(3)
            
            # 修复 LaTeX 命令
            fixed = fix_latex_commands(latex_content)
            
            if fixed != latex_content:
                changes.append(f"  - {field}: 修复 LaTeX 转义")
            
            return prefix + fixed + suffix
        
        content = re.sub(pattern, replace_latex, content)
    
    # 2. 修复数组中的 LaTeX（如 hintLatex: [...]）
    # 匹配 hintLatex: [`...`, `...`] 或 hintLatex: ["...", "..."]
    for field in latex_fields:
        pattern = rf'{field}:\s*\[(.*?)\]'
        
        def replace_array_latex(match):
            array_content = match.group(1)
            
            # 提取数组中的每个字符串
            string_pattern = r'[`"\']([^`"\']*?)[`"\']'
            
            def replace_string(string_match):
                latex_content = string_match.group(1)
                fixed = fix_latex_commands(latex_content)
                
                if fixed != latex_content:
                    changes.append(f"  - {field} array: 修复 LaTeX 转义")
                
                # 保持原始引号类型
                quote = string_match.group(0)[0]
                return quote + fixed + quote
            
            fixed_array = re.sub(string_pattern, replace_string, array_content)
            return f'{field}: [{fixed_array}]'
        
        content = re.sub(pattern, replace_array_latex, content, flags=re.DOTALL)
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True, changes
    
    return False, []

def fix_latex_commands(latex_str):
    """修复 LaTeX 字符串中的转义"""
    
    # 跳过已经是四反斜杠的情况
    if '\\\\\\\\' in latex_str:
        # 已经有八反斜杠，可能已经修复过
        return latex_str
    
    # 1. 先处理特殊的 begin/end/frac/text 等命令
    # 将 \command 或 \\command 或 \\\command 改为 \\\\command
    
    latex_commands = [
        'text', 'frac', 'sqrt', 'begin', 'end', 'left', 'right',
        'cdot', 'times', 'div', 'pm', 'mp', 'leq', 'geq', 'neq',
        'sin', 'cos', 'tan', 'log', 'ln', 'exp', 'lim', 'sum', 'prod',
        'int', 'partial', 'nabla', 'infty', 'alpha', 'beta', 'gamma',
        'delta', 'theta', 'lambda', 'mu', 'pi', 'sigma', 'omega',
        'Delta', 'Theta', 'Lambda', 'Sigma', 'Omega'
    ]
    
    for cmd in latex_commands:
        # 匹配 \cmd{ 或 \\cmd{ 或 \\\cmd{ (但不是 \\\\cmd{)
        # 替换为 \\\\cmd{
        
        # 三反斜杠 -> 四反斜杠
        latex_str = latex_str.replace(f'\\\\\\{cmd}{{', f'\\\\\\\\{cmd}{{')
        
        # 双反斜杠 -> 四反斜杠 (但要避免已经是四反斜杠的)
        # 使用负向后顾断言
        latex_str = re.sub(rf'(?<!\\)\\\\{cmd}{{', rf'\\\\\\\\{cmd}{{', latex_str)
        
        # 单反斜杠 -> 四反斜杠
        latex_str = re.sub(rf'(?<!\\)\\{cmd}{{', rf'\\\\\\\\{cmd}{{', latex_str)
    
    # 2. 处理 cases 环境中的行分隔符
    # 在 cases 环境中，\\ 应该是 \\\\\\\\（八反斜杠）
    if 'begin{cases}' in latex_str or 'begin{pmatrix}' in latex_str or 'begin{bmatrix}' in latex_str:
        # 匹配空格 + 反斜杠 + 空格的模式
        # 将 " \\ " 改为 " \\\\\\\\ "
        # 将 " \\\\ " 改为 " \\\\\\\\ "
        
        # 先处理四反斜杠（已经正确的情况）
        # 不做处理
        
        # 处理双反斜杠
        latex_str = re.sub(r' \\\\ ', r' \\\\\\\\ ', latex_str)
        
        # 处理单对反斜杠（不太可能，但以防万一）
        latex_str = re.sub(r' \\ ', r' \\\\\\\\ ', latex_str)
    
    return latex_str

def scan_chamber_modules():
    """扫描所有 Chamber 模块"""
    
    chamber_dir = Path('src/app/chamber')
    
    if not chamber_dir.exists():
        print(f"❌ 目录不存在: {chamber_dir}")
        return
    
    print("🔍 扫描 Chamber 模块...")
    print(f"📁 目录: {chamber_dir}")
    print()
    
    # 获取所有 page.tsx 文件
    page_files = list(chamber_dir.glob('*/page.tsx'))
    
    print(f"📊 找到 {len(page_files)} 个模块")
    print()
    
    fixed_count = 0
    skipped_count = 0
    
    # 按模块代码排序
    page_files.sort(key=lambda p: p.parent.name)
    
    for page_file in page_files:
        module_code = page_file.parent.name.upper()
        
        print(f"🔧 处理 {module_code}...", end=' ')
        
        try:
            was_fixed, changes = fix_latex_in_file(page_file)
            
            if was_fixed:
                print(f"✅ 已修复")
                for change in changes[:3]:  # 只显示前3个变更
                    print(change)
                if len(changes) > 3:
                    print(f"  ... 还有 {len(changes) - 3} 处修复")
                fixed_count += 1
            else:
                print("⏭️  无需修复")
                skipped_count += 1
        
        except Exception as e:
            print(f"❌ 错误: {e}")
    
    print()
    print("=" * 60)
    print(f"✅ 修复完成: {fixed_count} 个模块")
    print(f"⏭️  跳过: {skipped_count} 个模块")
    print(f"📊 总计: {len(page_files)} 个模块")
    print("=" * 60)

def verify_latex_standard():
    """验证所有模块是否符合四反斜杠标准"""
    
    print()
    print("🔍 验证 LaTeX 标准...")
    print()
    
    chamber_dir = Path('src/app/chamber')
    page_files = list(chamber_dir.glob('*/page.tsx'))
    
    issues = []
    
    for page_file in page_files:
        module_code = page_file.parent.name.upper()
        
        with open(page_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 检查是否有双反斜杠的 LaTeX 命令（不是四反斜杠）
        # 这是一个简化的检查，可能有误报
        
        # 查找 \text{ 但前面不是 \\\
        if re.search(r'(?<!\\)\\\\text\{', content):
            issues.append(f"{module_code}: 发现双反斜杠 \\\\text{{")
        
        # 查找 \frac{ 但前面不是 \\\
        if re.search(r'(?<!\\)\\\\frac\{', content):
            issues.append(f"{module_code}: 发现双反斜杠 \\\\frac{{")
    
    if issues:
        print("⚠️  发现潜在问题:")
        for issue in issues[:10]:  # 只显示前10个
            print(f"  - {issue}")
        if len(issues) > 10:
            print(f"  ... 还有 {len(issues) - 10} 个问题")
    else:
        print("✅ 所有模块符合四反斜杠标准！")

if __name__ == '__main__':
    print("=" * 60)
    print("🎯 Chamber 模块 LaTeX 转义加固")
    print("=" * 60)
    print()
    
    scan_chamber_modules()
    verify_latex_standard()
    
    print()
    print("✅ 完成！")
