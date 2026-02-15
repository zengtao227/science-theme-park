#!/usr/bin/env python3
"""
正确修复 i18n.ts：删除整个重复的 gp5_02 对象（包括其内容）
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

# 步骤 1: 找到重复的 gp5_02 的开始和结束
# 开始：第 3401 行（索引 3400）
# 结束：需要找到匹配的闭合括号

gp5_02_start = 3400  # 索引
if 'gp5_02: {' not in lines[gp5_02_start]:
    print(f"❌ 第 {gp5_02_start+1} 行不是 gp5_02")
    exit(1)

print(f"\n找到重复的 gp5_02 开始于第 {gp5_02_start+1} 行")

# 找到匹配的闭合括号
# gp5_02 的内容应该只有几十行（title, back, labels, effects, formulas, mission）
# 根据你的 AI 助手的分析，gp5_02 的闭合应该在第 3433 行左右

# 查找第一个 4 个空格的 }, 后面跟着另一个对象声明
gp5_02_end = None
for i in range(gp5_02_start + 1, gp5_02_start + 50):
    if i >= len(lines):
        break
    line = lines[i]
    # 查找 4 个空格的 },
    if line == '    },\n':
        # 检查下一行是否是另一个顶层对象（4个空格开头的对象名）
        if i + 1 < len(lines):
            next_line = lines[i + 1]
            if next_line.startswith('    ') and ': {' in next_line and not next_line.startswith('        '):
                gp5_02_end = i
                print(f"找到 gp5_02 结束于第 {gp5_02_end+1} 行")
                print(f"下一个对象: {next_line.strip()}")
                break

if gp5_02_end is None:
    print("❌ 未找到 gp5_02 的结束位置")
    exit(1)

# 步骤 2: 删除从 gp5_02_start 到 gp5_02_end 的所有行
deleted_lines = gp5_02_end - gp5_02_start + 1
print(f"\n删除第 {gp5_02_start+1} 到第 {gp5_02_end+1} 行，共 {deleted_lines} 行")

del lines[gp5_02_start:gp5_02_end+1]

# 步骤 3: 现在处理剩余的缩进问题
# 从删除位置开始，找到所有 8 个空格开头的顶层对象声明
# 这些对象原本被嵌套在 gp5_02 内，现在需要提升到 EN 的顶层

import re
pattern = re.compile(r'^        ([a-z_0-9]+: \{)')  # 8个空格 + 对象名: {

start = gp5_02_start
end = min(start + 300, len(lines))

fixed_count = 0
for i in range(start, end):
    if i >= len(lines):
        break
    line = lines[i]
    match = pattern.match(line)
    if match:
        # 这是一个被错误嵌套的顶层对象，减少缩进到 4 个空格
        lines[i] = '    ' + line[8:]
        fixed_count += 1

print(f"✅ 修正了 {fixed_count} 个对象的缩进")

# 写回文件
with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print(f"\n✅ 修复完成，新文件: {len(lines)} 行")
print(f"删除了 {deleted_lines} 行，修正了 {fixed_count} 个对象的缩进")
print(f"\n🔍 请运行 'npm run build' 验证修复")
