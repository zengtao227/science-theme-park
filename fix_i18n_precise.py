#!/usr/bin/env python3
"""
精确修复 i18n.ts 的缩进问题
只修正顶层对象声明的缩进，不影响内部属性
"""

import shutil
from datetime import datetime

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

# 步骤 1: 删除重复的 gp5_02: { 这一行（第 3401 行，索引 3400）
gp5_02_line = 3400  # 索引
if 'gp5_02: {' in lines[gp5_02_line]:
    print(f"\n删除第 {gp5_02_line+1} 行: {repr(lines[gp5_02_line].rstrip())}")
    del lines[gp5_02_line]
else:
    print(f"❌ 第 {gp5_02_line+1} 行不是 gp5_02")
    exit(1)

# 步骤 2: 只修正顶层对象声明的缩进
# 从删除行的位置开始，找到所有格式为 "        对象名: {" 的行（8个空格开头）
# 改为 "    对象名: {" （4个空格）

import re
pattern = re.compile(r'^        ([a-z_0-9]+: \{)')  # 8个空格 + 对象名: {

start = gp5_02_line  # 从删除的位置开始
end = min(start + 300, len(lines))

fixed_objects = []
for i in range(start, end):
    if i >= len(lines):
        break
    line = lines[i]
    match = pattern.match(line)
    if match:
        # 这是一个顶层对象声明，减少缩进
        object_name = match.group(1).split(':')[0]
        lines[i] = '    ' + match.group(1) + '\n'
        fixed_objects.append((i+1, object_name))

print(f"\n✅ 修正了 {len(fixed_objects)} 个顶层对象的缩进:")
for line_num, obj_name in fixed_objects[:10]:  # 只显示前 10 个
    print(f"  第 {line_num} 行: {obj_name}")
if len(fixed_objects) > 10:
    print(f"  ... 还有 {len(fixed_objects)-10} 个")

# 写回文件
with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print(f"\n✅ 修复完成，新文件: {len(lines)} 行")
print(f"\n🔍 请运行 'npm run build' 验证修复")
