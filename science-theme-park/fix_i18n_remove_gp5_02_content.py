#!/usr/bin/env python3
"""
删除重复的 gp5_02 的内容（第 3401-3431 行）
"""

# 文件路径
file_path = '/Users/zengtao/science-theme-park/src/lib/i18n.ts'

# 读取文件
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"原始文件: {len(lines)} 行")

# 删除第 3401-3431 行（索引 3400-3430）
# 这些是重复的 gp5_02 的内容
start = 3400  # 第 3401 行
end = 3430    # 第 3431 行

print(f"\n删除第 {start+1} 到第 {end+1} 行（重复的 gp5_02 内容）")
print(f"第 {start+1} 行: {repr(lines[start][:50])}")
print(f"第 {end+1} 行: {repr(lines[end][:50])}")

del lines[start:end+1]

print(f"\n✅ 删除了 {end-start+1} 行")

# 写回文件
with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print(f"\n✅ 修复完成，新文件: {len(lines)} 行")
print(f"\n🔍 请运行 'npm run build' 验证修复")
