#!/usr/bin/env python3
"""
修复 em1_01 之后所有对象的缩进问题
将第 1692 行到第 3696 行之间所有行的缩进减少 4 个空格
"""

import shutil

# 文件路径
file_path = 'src/lib/i18n.ts'

# 创建备份
shutil.copy2(file_path, file_path + '.before_indent_fix')
print(f"✅ 创建备份: {file_path}.before_indent_fix")

# 读取文件
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"原始文件: {len(lines)} 行")

# 修复缩进：从第 1692 行（索引 1691）到第 3696 行（索引 3695）
# 所有以 4+ 个空格开头的行，减少 4 个空格
start = 1691  # 第 1692 行，索引 1691
end = min(3695, len(lines))  # 第 3696 行，索引 3695

fixed_count = 0
for i in range(start, end):
    if i >= len(lines):
        break
    line = lines[i]
    # 如果行以 4 个或更多空格开头，删除前 4 个空格
    if len(line) >= 4 and line[:4] == '    ':
        lines[i] = line[4:]
        fixed_count += 1

print(f"\n✅ 修正了 {fixed_count} 行的缩进（从第 {start+1} 行到第 {end} 行）")

# 写回文件
with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print(f"\n✅ 修复完成，新文件: {len(lines)} 行")
print(f"\n🔍 请运行 'npm run build' 验证修复")
