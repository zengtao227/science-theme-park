#!/usr/bin/env python3
"""
按照 AI 助手的方案修复 i18n.ts
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

# 步骤 1: 删除第 3697 行的多余闭合（索引 3696）
line_3697 = 3696
if lines[line_3697].strip() == '},':
    print(f"\n删除第 {line_3697+1} 行: {repr(lines[line_3697].rstrip())}")
    del lines[line_3697]
else:
    print(f"警告：第 {line_3697+1} 行不是 }}, 内容是: {repr(lines[line_3697].rstrip())}")

# 步骤 2: 删除第 3401 行的 gp5_02 声明（索引 3400）
line_3401 = 3400
if 'gp5_02: {' in lines[line_3401]:
    print(f"删除第 {line_3401+1} 行: {repr(lines[line_3401].rstrip())}")
    del lines[line_3401]
else:
    print(f"警告：第 {line_3401+1} 行不是 gp5_02, 内容是: {repr(lines[line_3401].rstrip())}")

# 步骤 3: 修正第 3402-3696 行的缩进（现在变成 3400-3694，因为删除了两行）
# 所有以 8+ 个空格开头的行，减少 4 个空格
start = 3400  # 删除后的索引
end = min(3694, len(lines))

fixed_count = 0
for i in range(start, end):
    if i >= len(lines):
        break
    line = lines[i]
    # 如果行以 8 个或更多空格开头，删除前 4 个空格
    if len(line) >= 8 and line[:8] == '        ':
        lines[i] = line[4:]
        fixed_count += 1

print(f"修正了 {fixed_count} 行的缩进")

# 写回文件
with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print(f"\n✅ 修复完成，新文件: {len(lines)} 行")
print(f"\n🔍 请运行 'npm run build' 验证修复")
