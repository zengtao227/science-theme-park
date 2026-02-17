#!/bin/bash
# i18n迁移自动化脚本
# 用法: ./migrate_i18n_module.sh <module-path> <module-key>
# 例如: ./migrate_i18n_module.sh src/app/chamber/gm1-01-advanced gm1_01_advanced

MODULE_PATH=$1
MODULE_KEY=$2
FILE="$MODULE_PATH/page.tsx"

if [ ! -f "$FILE" ]; then
  echo "错误: 文件不存在 $FILE"
  exit 1
fi

echo "开始迁移 $MODULE_KEY..."

# 1. 更新导入 - 删除translations导入，添加useLanguage
sed -i.bak 's/import { translations } from "@\/lib\/i18n";/import { useLanguage } from "@\/lib\/i18n";/' "$FILE"

# 2. 删除类型定义行
sed -i.bak2 "/type.*typeof translations\.EN\./d" "$FILE"

# 3. 替换组件中的t定义
# 这个比较复杂，需要手动处理

# 4. 批量替换 t. 为 ${MODULE_KEY}_t.
sed "s/\([^a-zA-Z_]\)t\\./${MODULE_KEY}_t./g" "$FILE" > "$FILE.tmp" && mv "$FILE.tmp" "$FILE"

# 5. 特殊处理 promptLatex 等
sed -i.bak3 "s/promptLatex: t\\./promptLatex: ${MODULE_KEY}_t./g" "$FILE"

# 清理备份文件
rm -f "$FILE.bak" "$FILE.bak2" "$FILE.bak3"

echo "✓ 基础替换完成"
echo "⚠️  请手动完成以下步骤:"
echo "  1. 更新组件函数签名，添加 const { t } = useLanguage();"
echo "  2. 创建 ${MODULE_KEY}_t 对象，包含所有翻译字段"
echo "  3. 如果需要currentLanguage，从useAppStore导入"
echo "  4. 更新buildStagePool函数参数"
echo "  5. 运行 npm run build 验证"
