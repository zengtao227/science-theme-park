#!/usr/bin/env python3
"""
批量修复所有模块的语言切换 Bug
"""

import re
import subprocess
from pathlib import Path

# 需要修复的模块列表
MODULES = [
    "sm1-04",  # 19 translations
    "sm2-08",  # 15 translations
    "gc1-02",
    "sb2-01-tissues",
    "sb2-02-body-systems",
    "sc2-01",
    "sm1-05",
    "sm2-10",
    "sm3-05",
    "sp3-05",
    "sp3-06",
]

def extract_translation_keys(file_path):
    """从文件中提取所有 t() 调用的键"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 查找所有 t("key") 或 t('key') 模式
    pattern = r't\(["\']([^"\']+)["\']\)'
    matches = re.findall(pattern, content)
    
    # 过滤出 scenario 和 context 相关的键
    translation_keys = {}
    for key in matches:
        if '.scenarios.' in key or '.problems.' in key:
            parts = key.split('.')
            if len(parts) >= 3:
                module = parts[0]
                category = parts[1]  # scenarios or problems
                name = '.'.join(parts[2:])
                
                if module not in translation_keys:
                    translation_keys[module] = {'scenarios': set(), 'problems': set()}
                
                if category == 'scenarios':
                    translation_keys[module]['scenarios'].add(name)
                elif category == 'problems':
                    translation_keys[module]['problems'].add(name)
    
    return translation_keys

def generate_translation_object(module_name, keys):
    """生成翻译对象代码"""
    module_var = module_name.replace('-', '_')
    
    lines = [f"  const {module_var}_t = {{"]
    
    # Scenarios
    if keys.get('scenarios'):
        lines.append("    scenarios: {")
        for scenario in sorted(keys['scenarios']):
            lines.append(f'      {scenario}: t("{module_name}.scenarios.{scenario}"),')
        lines.append("    },")
    
    # Problems
    if keys.get('problems'):
        lines.append("    problems: {")
        for problem in sorted(keys['problems']):
            lines.append(f'      {problem}: t("{module_name}.problems.{problem}"),')
        lines.append("    },")
    
    lines.append("  };")
    
    return '\n'.join(lines)

def fix_module(module_name):
    """修复单个模块"""
    print(f"\n{'='*80}")
    print(f"🔧 修复模块: {module_name.upper()}")
    print(f"{'='*80}")
    
    file_path = Path(f"src/app/chamber/{module_name}/page.tsx")
    
    if not file_path.exists():
        print(f"❌ 文件不存在: {file_path}")
        return False
    
    # 读取文件
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取翻译键
    print("📝 提取翻译键...")
    keys = extract_translation_keys(file_path)
    
    if not keys:
        print("⚠️  未找到翻译键，跳过")
        return False
    
    module_key = list(keys.keys())[0] if keys else module_name.replace('-', '_')
    module_var = module_name.replace('-', '_')
    
    scenarios_count = len(keys.get(module_key, {}).get('scenarios', []))
    problems_count = len(keys.get(module_key, {}).get('problems', []))
    print(f"   找到 {scenarios_count} 个场景, {problems_count} 个问题")
    
    # 生成翻译对象
    print("🔨 生成翻译对象...")
    translation_obj = generate_translation_object(module_key, keys.get(module_key, {}))
    
    # 1. 在 useLanguage 后插入翻译对象
    pattern = r'(const \{ t, currentLanguage \} = useLanguage\(\);)'
    replacement = f'\\1\n\n  // Pre-extract all translations\n{translation_obj}'
    content = re.sub(pattern, replacement, content)
    
    # 2. 修改 buildStagePool 函数签名
    # 查找 buildStagePool 的定义
    pattern = r'const buildStagePool = useCallback\(\(([^)]+)\):'
    match = re.search(pattern, content)
    
    if match:
        params = match.group(1)
        # 添加 tObj 参数
        new_params = f'tObj: typeof {module_var}_t, {params}'
        content = re.sub(
            r'const buildStagePool = useCallback\(\(([^)]+)\):',
            f'const buildStagePool = useCallback\\(({new_params}):',
            content
        )
        print("   ✓ 更新 buildStagePool 函数签名")
    
    # 3. 替换所有 t() 调用为 tObj.
    replacements = []
    
    # Scenarios
    for scenario in keys.get(module_key, {}).get('scenarios', []):
        old = f't("{module_key}.scenarios.{scenario}")'
        new = f'tObj.scenarios.{scenario}'
        content = content.replace(old, new)
        replacements.append((old, new))
    
    # Problems
    for problem in keys.get(module_key, {}).get('problems', []):
        old = f't("{module_key}.problems.{problem}")'
        new = f'tObj.problems.{problem}'
        content = content.replace(old, new)
        replacements.append((old, new))
    
    print(f"   ✓ 替换 {len(replacements)} 个翻译调用")
    
    # 4. 更新 buildPool 依赖数组
    # 查找 buildPool 定义
    pattern = r'const buildPool = useCallback\(\([^)]+\) => buildStagePool\(([^)]+)\), \[([^\]]*)\]\);'
    match = re.search(pattern, content)
    
    if match:
        params = match.group(1)
        # 在参数列表开头添加翻译对象
        new_params = f'{module_var}_t, {params}'
        # 更新依赖数组
        content = re.sub(
            r'const buildPool = useCallback\(\(([^)]+)\) => buildStagePool\(([^)]+)\), \[([^\]]*)\]\);',
            f'const buildPool = useCallback\\((\\1) => buildStagePool({new_params}), [{module_var}_t]\\);',
            content
        )
        print("   ✓ 更新 buildPool 依赖数组")
    
    # 写回文件
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ {module_name.upper()} 修复完成")
    
    # 验证构建
    print("🔍 验证构建...")
    result = subprocess.run(['npm', 'run', 'build'], capture_output=True, text=True)
    
    if result.returncode == 0:
        print("✅ 构建成功")
        
        # 提交更改
        print("📦 提交更改...")
        subprocess.run(['git', 'add', str(file_path)])
        subprocess.run(['git', 'commit', '-m', f'fix: {module_name} language switch bug'])
        print("✅ 已提交")
        
        return True
    else:
        print("❌ 构建失败")
        # 输出错误信息
        error_lines = result.stdout.split('\n')
        for line in error_lines:
            if 'error' in line.lower() or 'failed' in line.lower():
                print(f"   {line}")
        return False

def main():
    print("🚀 开始批量修复语言切换 Bug")
    print(f"📊 总共需要修复 {len(MODULES)} 个模块\n")
    
    success_count = 0
    failed_modules = []
    
    for i, module in enumerate(MODULES, 1):
        print(f"\n进度: {i}/{len(MODULES)}")
        
        if fix_module(module):
            success_count += 1
        else:
            failed_modules.append(module)
    
    # 最终报告
    print("\n" + "="*80)
    print("📊 修复完成统计")
    print("="*80)
    print(f"✅ 成功: {success_count}/{len(MODULES)}")
    print(f"❌ 失败: {len(failed_modules)}/{len(MODULES)}")
    
    if failed_modules:
        print("\n失败的模块:")
        for module in failed_modules:
            print(f"  - {module}")
    
    print("\n🎉 所有修复工作完成！")

if __name__ == '__main__':
    main()
