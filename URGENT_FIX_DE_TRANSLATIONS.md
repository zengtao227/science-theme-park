# 紧急修复：恢复 DE 翻译

## 问题
`src/lib/i18n/de.ts` 内容为空（只有 `export const de = null;`），导致构建失败。

## 快速修复步骤

### 方法 1: 手动提取（最安全）

1. **打开备份文件**
   ```bash
   code src/lib/i18n.old.ts
   ```

2. **找到 DE 部分**
   - 搜索 `DE: {` (在 line 7475 附近)
   - 选择从 `DE: {` 之后的第一个 `{` 开始
   - 一直选到文件末尾的 `};` 之前的最后一个 `}`

3. **复制内容并创建新文件**
   - 复制选中的内容
   - 打开 `src/lib/i18n/de.ts`
   - 替换为:
   ```typescript
   export const de = {
       // 粘贴复制的内容
   };
   ```

4. **格式化文件**
   ```bash
   npx prettier --write src/lib/i18n/de.ts
   ```

5. **验证**
   ```bash
   npm run build
   ```

### 方法 2: 使用命令行提取（快速）

```bash
# 提取 DE 部分（从 line 7476 到文件结束前）
awk 'NR>=7476 && NR<=8150' src/lib/i18n.old.ts > /tmp/de_content.txt

# 手动编辑 de.ts，将内容包装在 export const de = { ... };
```

### 方法 3: Python 脚本（自动化）

创建 `fix_de.py`:
```python
#!/usr/bin/env python3
import re

# 读取备份文件
with open('src/lib/i18n.old.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 找到 DE 部分
de_start = content.find('    DE: {')
if de_start == -1:
    print("Error: DE section not found")
    exit(1)

# 找到 DE 部分的内容开始（跳过 "DE: {" 这一行）
de_content_start = content.find('{', de_start + 8) + 1

# 找到结束位置（};之前）
de_end = content.rfind('};')
if de_end == -1:
    print("Error: End of translations not found")
    exit(1)

# 回溯找到 DE 部分的结束
# 需要找到正确的闭合括号
lines = content[de_content_start:de_end].split('\n')

# 简单方法：取从 DE 开始到倒数第二个 } 之间的内容
de_content = content[de_content_start:de_end].rstrip()

# 移除最后的 }（这是 translations 对象的闭合括号）
if de_content.rstrip().endswith('}'):
    de_content = de_content.rstrip()[:-1].rstrip()

# 写入新文件
with open('src/lib/i18n/de.ts', 'w', encoding='utf-8') as f:
    f.write('export const de = {\n')
    f.write(de_content)
    f.write('\n};\n')

print("✅ DE translations extracted")
print("Run: npx prettier --write src/lib/i18n/de.ts")
```

运行:
```bash
python3 fix_de.py
npx prettier --write src/lib/i18n/de.ts
npm run build
```

## 验证修复成功

修复后，检查：
```bash
# 1. 文件大小应该 > 150 KB
ls -lh src/lib/i18n/de.ts

# 2. 应该包含 protocol, common, home 等键
head -50 src/lib/i18n/de.ts

# 3. 构建应该成功
npm run build

# 4. 测试德语页面
# 访问任意模块页面，切换到德语，确认翻译显示正确
```

## 注意事项

⚠️ **不要删除 `src/lib/i18n.old.ts`** 直到确认一切正常！

⚠️ DE 部分可能仍有缩进问题，Prettier 会自动修复大部分问题。

⚠️ 如果 Prettier 修复后仍有语法错误，可能需要手动调整括号。
