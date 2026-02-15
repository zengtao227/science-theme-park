#!/usr/bin/env python3
"""
i18n.ts 自动修复脚本
修复重复的 gp5_02 定义和错误的嵌套结构
"""

import shutil
from datetime import datetime

# 文件路径
file_path = 'src/lib/i18n.ts'

# 恢复之前的备份
backup_file = 'src/lib/i18n.ts.backup.20260215_135650'
shutil.copy2(backup_file, file_path)
print(f"✅ 从备份恢复: {backup_file}")

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"原始文件: {len(lines)} 行")

# 修复步骤
modifications = []

# 1. 删除第 3697 行的多余闭合
if 3696 < len(lines) and lines[3696].strip() == '},':
    print(f"\n删除第 3697 行: {repr(lines[3696].rstrip())}")
    lines.pop(3696)
    modifications.append("删除第 3697 行多余的闭合")

# 2. 删除第 3401 行的 gp5_02 声明
# 注意：删除第 3697 行后，行号会变化
if 3400 < len(lines) and 'gp5_02: {' in lines[3400]:
    print(f"\n删除第 3401 行: {repr(lines[3400].rstrip())}")
    lines.pop(3400)
    modifications.append("删除第 3401 行重复的 gp5_02")

# 3. 修正第 3401-3696 行范围的缩进（现在变成 3400-3695）
# 所有以 8+ 个空格开头的行，减少 4 个空格
start = 3400
end = min(3695, len(lines))

fixed_count = 0
for i in range(start, end):
    line = lines[i]
    if line.startswith('        '):  # 8+ 个空格
        # 删除前 4 个空格
        lines[i] = line[4:]
        fixed_count += 1

print(f"\n修正了 {fixed_count} 行的缩进")
modifications.append(f"修正 {fixed_count} 行缩进")

# 写回文件
with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print(f"\n✅ 修复完成，新文件: {len(lines)} 行")
print(f"\n修改摘要:")
for mod in modifications:
    print(f"  - {mod}")

print(f"\n🔍 请运行 'npm run build' 验证修复")
