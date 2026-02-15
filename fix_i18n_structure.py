#!/usr/bin/env python3
"""
修复 i18n.ts 的结构问题
"""

import shutil
from datetime import datetime

# 文件路径
file_path = 'src/lib/i18n.ts'

# 创建备份
backup_path = f"{file_path}.backup.{datetime.now().strftime('%Y%m%d_%H%M%S')}"
shutil.copy2(file_path, backup_path)
print(f"✅ 备份到: {backup_path}")

# 读取文件
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"原始文件: {len(lines)} 行")

# 找到重复的 gp5_02 定义（第 3401 行，索引 3400）
# 删除这一行，并将后续到第 3696 行的内容缩进减少 4 个空格

# 步骤 1: 找到并删除 gp5_02: { 这一行
gp5_02_line = None
for i in range(3395, 3405):
    if i < len(lines) and 'gp5_02: {' in lines[i] and lines[i].startswith('    '):
        gp5_02_line = i
        print(f"\n找到重复的 gp5_02 在第 {i+1} 行: {repr(lines[i].rstrip())}")
        break

if gp5_02_line is None:
    print("❌ 未找到重复的 gp5_02")
    exit(1)

# 删除 gp5_02: { 这一行
del lines[gp5_02_line]
print(f"✅ 删除第 {gp5_02_line+1} 行")

# 步骤 2: 修正缩进（从删除行的位置到大约第 3695 行）
# 所有以 8+ 个空格开头的行，减少 4 个空格
start = gp5_02_line  # 删除后，后面的行会上移
end = min(start + 295, len(lines))  # 大约 295 行范围

fixed_count = 0
for i in range(start, end):
    if i >= len(lines):
        break
    line = lines[i]
    # 如果行以 8 个或更多空格开头，减少 4 个空格
    if len(line) >= 8 and line[:8] == '        ':
        lines[i] = line[4:]
        fixed_count += 1

print(f"✅ 修正了 {fixed_count} 行的缩进")

# 步骤 3: 找到并删除多余的闭合括号
# 在 CN: { 之前应该只有一个 },
cn_line = None
for i in range(3690, 3710):
    if i < len(lines) and 'CN: {' in lines[i]:
        cn_line = i
        print(f"\n找到 CN 在第 {i+1} 行")
        break

if cn_line and cn_line > 0:
    # 检查 CN 之前的几行
    for i in range(cn_line-1, max(cn_line-5, 0), -1):
        if lines[i].strip() == '},':
            # 检查是否有重复的 },
            if i > 0 and lines[i-1].strip() == '},':
                print(f"找到重复的闭合在第 {i} 行: {repr(lines[i-1].rstrip())}")
                # 不删除，因为我们已经在步骤 1 中处理了

# 写回文件
with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print(f"\n✅ 修复完成，新文件: {len(lines)} 行")
print(f"\n🔍 请运行 'npm run build' 验证修复")
