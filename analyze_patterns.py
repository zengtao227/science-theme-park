#!/usr/bin/env python3
import os
import re
from pathlib import Path

chamber_dir = Path("src/app/chamber")

patterns_found = {
    "isAdvanced": [],
    "slice": [],
    "small_push": [],
    "no_structure": []
}

for module_dir in sorted(chamber_dir.iterdir()):
    if not module_dir.is_dir():
        continue
    
    page_file = module_dir / "page.tsx"
    if not page_file.exists():
        continue
    
    module_name = module_dir.name
    content = page_file.read_text()
    lines = len(content.split('\n'))
    
    # 跳过非quest模块
    if "useQuestManager" not in content:
        continue
    
    # 检查 isAdvanced 模式
    isAdvanced_count = len(re.findall(r'\bisAdvanced\b', content))
    if isAdvanced_count > 2:
        patterns_found["isAdvanced"].append((module_name, lines, isAdvanced_count))
    
    # 检查 slice 模式
    slice_count = len(re.findall(r'\.slice\(', content))
    if slice_count > 2:
        patterns_found["slice"].append((module_name, lines, slice_count))
    
    # 检查小数据池 (行数<400 且有 push)
    push_count = len(re.findall(r'quests\.push\(', content))
    if lines < 400 and push_count > 0 and push_count < 20:
        patterns_found["small_push"].append((module_name, lines, push_count))
    
    # 检查是否缺少结构化数据
    has_record = "Record<" in content and "Record<Difficulty" in content
    has_array_from = "Array.from" in content
    has_structured_data = has_record or has_array_from
    
    if not has_structured_data and lines < 500:
        patterns_found["no_structure"].append((module_name, lines))

print("=" * 60)
print("需要模式转换的模块分析")
print("=" * 60)

print("\n1. 使用 isAdvanced 二值模式（需要改为4难度）:")
for module, lines, count in patterns_found["isAdvanced"]:
    print(f"   - {module}: {lines}行, isAdvanced出现{count}次")

print("\n2. 使用 slice 模式（需要改为结构化数据）:")
for module, lines, count in patterns_found["slice"]:
    print(f"   - {module}: {lines}行, slice出现{count}次")

print("\n3. 小数据池模块（数据不足，需要扩充）:")
for module, lines, count in patterns_found["small_push"]:
    print(f"   - {module}: {lines}行, push出现{count}次")

print("\n4. 缺少结构化数据的小模块:")
for module, lines in patterns_found["no_structure"]:
    print(f"   - {module}: {lines}行")

print("\n" + "=" * 60)
print(f"总计需要转换: {sum(len(v) for v in patterns_found.values())} 个模块")
print("=" * 60)
