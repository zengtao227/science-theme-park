#!/usr/bin/env python3
"""
智能修复 i18n.ts：只修正顶层对象声明的缩进，保持内部属性不变
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
# 只修改顶层对象声明（格式：8个空格 + 对象名 + : {），不修改内部属性
# 
# 策略：
# 1. 找到所有 8 个空格开头的对象声明（如 "        sb3_01: {"）
# 2. 这些对象的内部属性应该保持 8 个空格（相对于对象是 4 个空格缩进）
# 3. 只有对象声明本身改为 4 个空格

start = 3400
end = min(3695, len(lines))

# 正则：匹配顶层对象声明（8个空格 + 小写字母数字下划线 + : {）
object_pattern = re.compile(r'^        ([a-z_0-9]+): \{')

fixed_objects = []
in_object = False
object_start = None

for i in range(start, end):
    if i >= len(lines):
        break
    
    line = lines[i]
    match = object_pattern.match(line)
    
    if match:
        # 这是一个顶层对象声明
        object_name = match.group(1)
        # 改为 4 个空格
        lines[i] = '    ' + match.group(1) + ': {\n'
        fixed_objects.append((i+1, object_name))
        in_object = True
        object_start = i
        print(f"修正第 {i+1} 行: {object_name}")

print(f"\n✅ 修正了 {len(fixed_objects)} 个顶层对象的缩进")

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
print(f"\n🔍 请运行 'npm run build' 验证修复")
