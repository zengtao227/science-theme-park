#!/usr/bin/env python3
import re
import sys

module = sys.argv[1]
file = f"src/app/chamber/{module}/page.tsx"

try:
    with open(file, 'r') as f:
        content = f.read()
except:
    print(f"❌ 文件不存在: {file}")
    sys.exit(1)

# 提取模块名（转换为变量名）
mod_var = module.replace('-', '_')

# 提取所有键
scenarios = set(re.findall(rf't\("{mod_var}\.scenarios\.([^"]+)"\)', content))
problems = set(re.findall(rf't\("{mod_var}\.problems\.([^"]+)"\)', content))

if not scenarios and not problems:
    print(f"⚠️  {module}: 未找到翻译键")
    sys.exit(0)

# 生成翻译对象
trans_obj = f'\n  const {mod_var}_t = {{\n'
if scenarios:
    trans_obj += '    scenarios: {\n'
    for s in sorted(scenarios):
        trans_obj += f'      {s}: t("{mod_var}.scenarios.{s}"),\n'
    trans_obj += '    },\n'
if problems:
    trans_obj += '    problems: {\n'
    for p in sorted(problems):
        trans_obj += f'      {p}: t("{mod_var}.problems.{p}"),\n'
    trans_obj += '    },\n'
trans_obj += '  };\n'

# 插入翻译对象
marker = 'const { t, currentLanguage } = useLanguage();'
if marker not in content:
    marker = 'const { t } = useLanguage();'
pos = content.find(marker)
if pos == -1:
    print(f"❌ {module}: 找不到 useLanguage")
    sys.exit(1)
end = content.find('\n', pos) + 1
content = content[:end] + trans_obj + content[end:]

# 查找 buildStagePool 的类型
quest_type_match = re.search(r'const buildStagePool = useCallback\(\(difficulty: Difficulty, stage: Stage\): (\w+)\[\]', content)
if not quest_type_match:
    print(f"❌ {module}: 找不到 buildStagePool")
    sys.exit(1)

quest_type = quest_type_match.group(1)

# 修改函数签名
old_sig = f'const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): {quest_type}[] => {{'
new_sig = f'const buildStagePool = useCallback((tObj: typeof {mod_var}_t, difficulty: Difficulty, stage: Stage): {quest_type}[] => {{'
content = content.replace(old_sig, new_sig)

# 替换调用 - 只在 buildStagePool 内部
start = content.find(f'const buildStagePool = useCallback((tObj:')
end = content.find('}, []);', start) + 7
before = content[:start]
middle = content[start:end]
after = content[end:]

for s in scenarios:
    middle = middle.replace(f't("{mod_var}.scenarios.{s}")', f'tObj.scenarios.{s}')
for p in problems:
    middle = middle.replace(f't("{mod_var}.problems.{p}")', f'tObj.problems.{p}')

content = before + middle + after

# 更新 buildPool
content = content.replace(
    'const buildPool = useCallback((difficulty: Difficulty, stage: Stage) => buildStagePool(difficulty, stage), [buildStagePool]);',
    f'const buildPool = useCallback((difficulty: Difficulty, stage: Stage) => buildStagePool({mod_var}_t, difficulty, stage), [{mod_var}_t]);'
)

with open(file, 'w') as f:
    f.write(content)

print(f"✅ {module}: {len(scenarios)} scenarios, {len(problems)} problems")
