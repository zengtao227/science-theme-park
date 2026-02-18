#!/usr/bin/env python3
import re

file = "src/app/chamber/sm2-08/page.tsx"
with open(file, 'r') as f:
    content = f.read()

# 提取所有键
scenarios = set(re.findall(r't\("sm2_08\.scenarios\.([^"]+)"\)', content))
problems = set(re.findall(r't\("sm2_08\.problems\.([^"]+)"\)', content))

# 生成翻译对象
trans_obj = '\n  const sm2_08_t = {\n    scenarios: {\n'
for s in sorted(scenarios):
    trans_obj += f'      {s}: t("sm2_08.scenarios.{s}"),\n'
trans_obj += '    },\n    problems: {\n'
for p in sorted(problems):
    trans_obj += f'      {p}: t("sm2_08.problems.{p}"),\n'
trans_obj += '    },\n  };\n'

# 插入翻译对象
marker = 'const { t, currentLanguage } = useLanguage();'
pos = content.find(marker)
end = content.find('\n', pos) + 1
content = content[:end] + trans_obj + content[end:]

# 修改函数签名
content = content.replace(
    'const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): ProbQuest[] => {',
    'const buildStagePool = useCallback((tObj: typeof sm2_08_t, difficulty: Difficulty, stage: Stage): ProbQuest[] => {'
)

# 替换调用 - 只在 buildStagePool 内部
start = content.find('const buildStagePool = useCallback((tObj:')
end = content.find('}, []);', start) + 7
before = content[:start]
middle = content[start:end]
after = content[end:]

for s in scenarios:
    middle = middle.replace(f't("sm2_08.scenarios.{s}")', f'tObj.scenarios.{s}')
for p in problems:
    middle = middle.replace(f't("sm2_08.problems.{p}")', f'tObj.problems.{p}')

content = before + middle + after

# 更新 buildPool
content = content.replace(
    'const buildPool = useCallback((difficulty: Difficulty, stage: Stage) => buildStagePool(difficulty, stage), [buildStagePool]);',
    'const buildPool = useCallback((difficulty: Difficulty, stage: Stage) => buildStagePool(sm2_08_t, difficulty, stage), [sm2_08_t]);'
)

with open(file, 'w') as f:
    f.write(content)

print(f"✅ SM2-08: {len(scenarios)} scenarios, {len(problems)} problems")
