#!/usr/bin/env python3
import re

file = "src/app/chamber/gc1-02/page.tsx"
with open(file, 'r') as f:
    content = f.read()

scenarios = set(re.findall(r't\("gc1_02\.scenarios\.([^"]+)"\)', content))
problems = set(re.findall(r't\("gc1_02\.problems\.([^"]+)"\)', content))

if not scenarios and not problems:
    print("⚠️ GC1-02: 没有找到翻译键，可能已经修复或使用不同模式")
    exit(0)

trans_obj = '\n  const gc1_02_t = {\n'
if scenarios:
    trans_obj += '    scenarios: {\n'
    for s in sorted(scenarios):
        trans_obj += f'      {s}: t("gc1_02.scenarios.{s}"),\n'
    trans_obj += '    },\n'
if problems:
    trans_obj += '    problems: {\n'
    for p in sorted(problems):
        trans_obj += f'      {p}: t("gc1_02.problems.{p}"),\n'
    trans_obj += '    },\n'
trans_obj += '  };\n'

marker = 'const { t, currentLanguage } = useLanguage();'
pos = content.find(marker)
end = content.find('\n', pos) + 1
content = content[:end] + trans_obj + content[end:]

content = content.replace(
    'const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage)',
    'const buildStagePool = useCallback((tObj: typeof gc1_02_t, difficulty: Difficulty, stage: Stage)'
)

start = content.find('const buildStagePool = useCallback((tObj:')
end = content.find('}, []);', start) + 7
before = content[:start]
middle = content[start:end]
after = content[end:]

for s in scenarios:
    middle = middle.replace(f't("gc1_02.scenarios.{s}")', f'tObj.scenarios.{s}')
for p in problems:
    middle = middle.replace(f't("gc1_02.problems.{p}")', f'tObj.problems.{p}')

content = before + middle + after

content = content.replace(
    'const buildPool = useCallback((difficulty: Difficulty, stage: Stage) => buildStagePool(difficulty, stage), [buildStagePool]);',
    'const buildPool = useCallback((difficulty: Difficulty, stage: Stage) => buildStagePool(gc1_02_t, difficulty, stage), [gc1_02_t]);'
)

with open(file, 'w') as f:
    f.write(content)

print(f"✅ GC1-02: {len(scenarios)} scenarios, {len(problems)} problems")
