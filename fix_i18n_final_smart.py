#!/usr/bin/env python3
"""
最终智能修复 i18n.ts
只修正真正的顶层对象（模块名），不修改内部属性
"""

import shutil
import re

# 文件路径
file_path = 'src/lib/i18n.ts'

# 恢复备份
backup_file = 'src/lib/i18n.ts.backup.20260215_135650'
shutil.copy2(backup_file, file_path)
print(f"✅ 从备份恢复: {backup_file}")

# 读取文件
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"原始文件: {len(lines)} 行")

# 步骤 1: 删除第 3697 行的多余闭合（索引 3696）
if 3696 < len(lines) and lines[3696].strip() == '},':
    print(f"\n删除第 3697 行: {repr(lines[3696].rstrip())}")
    del lines[3696]

# 步骤 2: 删除第 3401 行的 gp5_02 声明（索引 3400）
if 3400 < len(lines) and 'gp5_02: {' in lines[3400]:
    print(f"删除第 3401 行: {repr(lines[3400].rstrip())}")
    del lines[3400]

# 步骤 3: 智能修正缩进
# 
# 关键策略：
# 1. 只修改模块名对象（如 sb3_01, sp1_08, sc1_05 等）
# 2. 模块名的特征：以字母开头，包含数字和下划线，格式如 sb3_01, gp5_02
# 3. 内部属性（如 difficulty, stages, labels）不修改
#
# 模块名模式：
# - 以 1-2 个字母开头（s, g, e 等）
# - 后跟 1 个字母（b, p, c, m 等）
# - 后跟数字和下划线
# - 例如：sb3_01, sp1_08, sc1_05, gm1_01, em1_01

start = 3400
end = min(3695, len(lines))

# 正则：匹配模块名（8个空格 + 模块名模式 + : {）
# 模块名模式：[a-z]{1,2}[a-z][0-9]_[0-9]{2}
module_pattern = re.compile(r'^        ([a-z]{1,2}[a-z][0-9]_[0-9]{2}[a-z_]*): \{')

fixed_modules = []

for i in range(start, end):
    if i >= len(lines):
        break
    
    line = lines[i]
    match = module_pattern.match(line)
    
    if match:
        # 这是一个模块对象声明
        module_name = match.group(1)
        # 改为 4 个空格
        lines[i] = '    ' + match.group(1) + ': {\n'
        fixed_modules.append((i+1, module_name))
        print(f"修正第 {i+1} 行: {module_name}")

print(f"\n✅ 修正了 {len(fixed_modules)} 个模块对象的缩进")

# 步骤 4: 添加 EN section 的闭合
# 找到 CN: { 的位置
cn_line = None
for i in range(3690, 3710):
    if i < len(lines) and 'CN: {' in lines[i]:
        cn_line = i
        break

if cn_line and cn_line > 0:
    # 检查 CN 之前是否已经有 },
    if lines[cn_line - 1].strip() != '},':
        print(f"\n在第 {cn_line+1} 行之前添加 EN 的闭合")
        lines.insert(cn_line, '    },\n')

# 写回文件
with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print(f"\n✅ 修复完成，新文件: {len(lines)} 行")
print(f"\n修正的模块:")
for line_num, module_name in fixed_modules:
    print(f"  - {module_name} (第 {line_num} 行)")

print(f"\n🔍 请运行 'npm run build' 验证修复")
