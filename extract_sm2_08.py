#!/usr/bin/env python3
import re

file_path = "src/app/chamber/sm2-08/page.tsx"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r't\("sm2_08\.(scenarios|problems)\.([^"]+)"\)'
matches = re.findall(pattern, content)

scenarios = set()
problems = set()

for category, key in matches:
    if category == 'scenarios':
        scenarios.add(key)
    elif category == 'problems':
        problems.add(key)

print(f"场景: {len(scenarios)}, 问题: {len(problems)}")
print("\n场景:", sorted(scenarios))
print("\n问题 (前30个):", sorted(problems)[:30])
