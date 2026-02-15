#!/usr/bin/env python3
"""正确提取所有语言部分"""

with open('src/lib/i18n.old.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# EN: line 7 到 line 3697
en_start = 6  # 0-based
en_end = 3696

# CN: line 3700 到 line 7473
cn_start = 3699
cn_end = 7472

# DE: line 7476 到 line 11276
de_start = 7475
de_end = 11275

print(f"EN: lines {en_start+1} to {en_end+1} ({en_end - en_start + 1} lines)")
print(f"CN: lines {cn_start+1} to {cn_end+1} ({cn_end - cn_start + 1} lines)")
print(f"DE: lines {de_start+1} to {de_end+1} ({de_end - de_start + 1} lines)")

def write_lang_file(lang, start, end):
    with open(f'src/lib/i18n/{lang}.ts', 'w', encoding='utf-8') as f:
        f.write(f'export const {lang} = {{\n')
        for i in range(start, end + 1):
            line = lines[i]
            # 移除开头的 8 个空格（两层缩进）
            if line.startswith('        '):
                f.write(line[8:])
            elif line.startswith('    '):
                f.write(line[4:])
            else:
                f.write(line)
        f.write('};\n')
    
    import os
    size = os.path.getsize(f'src/lib/i18n/{lang}.ts')
    
    # 验证括号
    with open(f'src/lib/i18n/{lang}.ts', 'r') as f:
        content = f.read()
        opens = content.count('{')
        closes = content.count('}')
    
    status = '✅' if opens == closes else '❌'
    print(f"{status} {lang}.ts: {size/1024:.1f} KB, 括号 {opens}/{closes}")

write_lang_file('en', en_start, en_end)
write_lang_file('cn', cn_start, cn_end)
write_lang_file('de', de_start, de_end)

print("\n完成！")
