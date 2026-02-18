#!/usr/bin/env python3
"""提取 SM1-04 的所有翻译键并生成修复代码"""

import re

file_path = "src/app/chamber/sm1-04/page.tsx"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 提取所有翻译键
pattern = r't\("sm1_04\.(scenarios|problems)\.([^"]+)"\)'
matches = re.findall(pattern, content)

scenarios = set()
problems = set()

for category, key in matches:
    if category == 'scenarios':
        scenarios.add(key)
    elif category == 'problems':
        problems.add(key)

print(f"找到 {len(scenarios)} 个场景, {len(problems)} 个问题")
print(f"\n场景: {sorted(scenarios)}")
print(f"\n问题 (前20个): {sorted(problems)[:20]}")
print(f"问题总数: {len(problems)}")

# 生成翻译对象代码
print("\n\n=== 翻译对象代码 ===\n")
print("  const sm1_04_t = {")
print("    scenarios: {")
for s in sorted(scenarios):
    print(f'      {s}: t("sm1_04.scenarios.{s}"),')
print("    },")
print("    problems: {")
for p in sorted(problems):
    print(f'      {p}: t("sm1_04.problems.{p}"),')
print("    },")
print("  };")
