#!/usr/bin/env python3
"""
正确修复缩进：
- 只修改 8 个或更多空格的行
- 4 个空格的行保持不变（它们是正确的对象闭合）
"""

import shutil

# 文件路径
file_path = 'src/lib/i18n.ts'

# 恢复之前的备份
shutil.copy2(file_path + '.before_indent_fix', file_path)
print(f"✅ 从备份恢复: {file_path}.before_indent_fix")

# 读取文件
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"原始文件: {len(lines)} 行")

# 修复策略：
# 从第 1692 行到第 3696 行
# 只修改以 8 个或更多空格开头的行，减少 4 个空格
# 4 个空格的行保持不变

start = 1691  # 第 1692 行，索引 1691
end = 3695    # 第 3696 行，索引 3695

fixed_count = 0
for i in range(start, end):
    if i >= len(lines):
        break
    line = lines[i]
    # 只修改以 8 个或更多空格开头的行
    if len(line) >= 8 and line[:8] == '        ':
        lines[i] = line[4:]  # 删除前 4 个空格
        fixed_count += 1

print(f"\n✅ 修正了 {fixed_count} 行的缩进（只修改 8+ 空格的行）")

# 写回文件
with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print(f"\n✅ 修复完成，新文件: {len(lines)} 行")
print(f"\n🔍 请运行 'npm run build' 验证修复")
