#!/bin/bash

# i18n 重构部署脚本
# 用途：整理分散的文件并部署到项目
# 日期：2026-02-15

set -e  # 遇到错误立即退出

echo "🚀 开始 i18n 重构部署..."
echo ""

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 配置
DOWNLOAD_DIR="/Users/zengtao/Downloads/files"
REFACTORED_DIR="$DOWNLOAD_DIR/mnt/user-data/outputs/i18n-refactored"
TEMP_DIR="/tmp/i18n-refactored-$(date +%Y%m%d-%H%M%S)"
PROJECT_ROOT="$(pwd)"
TARGET_DIR="$PROJECT_ROOT/src/lib/i18n"

echo "📁 配置信息:"
echo "  下载目录: $DOWNLOAD_DIR"
echo "  临时目录: $TEMP_DIR"
echo "  项目根目录: $PROJECT_ROOT"
echo "  目标目录: $TARGET_DIR"
echo ""

# 步骤 1: 检查源文件
echo "🔍 步骤 1/6: 检查源文件..."

if [ ! -d "$DOWNLOAD_DIR" ]; then
    echo -e "${RED}❌ 错误: 下载目录不存在: $DOWNLOAD_DIR${NC}"
    exit 1
fi

if [ ! -f "$DOWNLOAD_DIR/index.ts" ]; then
    echo -e "${RED}❌ 错误: 主入口文件不存在${NC}"
    exit 1
fi

echo -e "${GREEN}✅ 源文件检查通过${NC}"
echo ""

# 步骤 2: 创建临时目录并整理文件
echo "📦 步骤 2/6: 整理文件到临时目录..."

mkdir -p "$TEMP_DIR"

# 复制主文件
echo "  复制主文件..."
cp "$DOWNLOAD_DIR/index.ts" "$TEMP_DIR/"
cp "$DOWNLOAD_DIR/types.ts" "$TEMP_DIR/"

# 创建并复制 CN 目录
echo "  整理 CN 文件..."
mkdir -p "$TEMP_DIR/cn"
cp "$DOWNLOAD_DIR/common.ts" "$TEMP_DIR/cn/"
cp "$DOWNLOAD_DIR/math.ts" "$TEMP_DIR/cn/"
cp "$DOWNLOAD_DIR/physics.ts" "$TEMP_DIR/cn/"
cp "$DOWNLOAD_DIR/chemistry.ts" "$TEMP_DIR/cn/"
cp "$DOWNLOAD_DIR/biology.ts" "$TEMP_DIR/cn/"
cp "$REFACTORED_DIR/cn/index.ts" "$TEMP_DIR/cn/"

# 复制 EN 和 DE 目录
echo "  复制 EN 目录..."
cp -r "$REFACTORED_DIR/en" "$TEMP_DIR/"

echo "  复制 DE 目录..."
cp -r "$REFACTORED_DIR/de" "$TEMP_DIR/"

echo -e "${GREEN}✅ 文件整理完成${NC}"
echo ""

# 步骤 3: 验证整理后的文件
echo "🔍 步骤 3/6: 验证整理后的文件..."

EXPECTED_FILES=(
    "index.ts"
    "types.ts"
    "en/index.ts"
    "en/common.ts"
    "en/math.ts"
    "en/physics.ts"
    "en/chemistry.ts"
    "en/biology.ts"
    "cn/index.ts"
    "cn/common.ts"
    "cn/math.ts"
    "cn/physics.ts"
    "cn/chemistry.ts"
    "cn/biology.ts"
    "de/index.ts"
    "de/common.ts"
    "de/math.ts"
    "de/physics.ts"
    "de/chemistry.ts"
    "de/biology.ts"
)

MISSING_FILES=0
for file in "${EXPECTED_FILES[@]}"; do
    if [ ! -f "$TEMP_DIR/$file" ]; then
        echo -e "${RED}  ❌ 缺少文件: $file${NC}"
        MISSING_FILES=$((MISSING_FILES + 1))
    fi
done

if [ $MISSING_FILES -gt 0 ]; then
    echo -e "${RED}❌ 错误: 有 $MISSING_FILES 个文件缺失${NC}"
    exit 1
fi

echo -e "${GREEN}✅ 所有 ${#EXPECTED_FILES[@]} 个文件都存在${NC}"
echo ""

# 步骤 4: 备份原文件
echo "💾 步骤 4/6: 备份原文件..."

if [ -f "$PROJECT_ROOT/src/lib/i18n.ts" ]; then
    BACKUP_FILE="$PROJECT_ROOT/src/lib/i18n.ts.backup-$(date +%Y%m%d-%H%M%S)"
    cp "$PROJECT_ROOT/src/lib/i18n.ts" "$BACKUP_FILE"
    echo -e "${GREEN}✅ 原文件已备份到: $BACKUP_FILE${NC}"
else
    echo -e "${YELLOW}⚠️  原文件不存在，跳过备份${NC}"
fi
echo ""

# 步骤 5: 部署新文件
echo "🚀 步骤 5/6: 部署新文件..."

# 删除旧文件（如果存在）
if [ -f "$PROJECT_ROOT/src/lib/i18n.ts" ]; then
    echo "  删除旧的 i18n.ts..."
    rm "$PROJECT_ROOT/src/lib/i18n.ts"
fi

# 删除旧的 i18n 目录（如果存在）
if [ -d "$TARGET_DIR" ]; then
    echo "  删除旧的 i18n 目录..."
    rm -rf "$TARGET_DIR"
fi

# 创建新目录
echo "  创建新的 i18n 目录..."
mkdir -p "$TARGET_DIR"

# 复制所有文件
echo "  复制新文件..."
cp -r "$TEMP_DIR/"* "$TARGET_DIR/"

echo -e "${GREEN}✅ 新文件部署完成${NC}"
echo ""

# 步骤 6: 验证部署
echo "🔍 步骤 6/6: 验证部署..."

DEPLOYED_COUNT=$(find "$TARGET_DIR" -name "*.ts" | wc -l | tr -d ' ')
echo "  已部署文件数: $DEPLOYED_COUNT"

if [ "$DEPLOYED_COUNT" -lt 20 ]; then
    echo -e "${RED}❌ 错误: 部署的文件数量不足 (期望 21 个，实际 $DEPLOYED_COUNT 个)${NC}"
    exit 1
fi

echo -e "${GREEN}✅ 部署验证通过${NC}"
echo ""

# 清理临时目录
echo "🧹 清理临时目录..."
rm -rf "$TEMP_DIR"
echo -e "${GREEN}✅ 临时目录已清理${NC}"
echo ""

# 完成
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}🎉 部署完成！${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 下一步操作:"
echo "  1. 运行 TypeScript 检查: npx tsc --noEmit"
echo "  2. 运行构建: npm run build"
echo "  3. 测试关键页面"
echo "  4. 如果一切正常，提交到 Git:"
echo "     git add src/lib/i18n/"
echo "     git rm src/lib/i18n.ts.backup-* (如果不需要备份)"
echo "     git commit -m '♻️ 重构: 将 i18n.ts 拆分为多文件结构'"
echo ""
echo "📖 详细信息请查看:"
echo "  - I18N_REFACTOR_VERIFICATION_REPORT.md"
echo "  - $DOWNLOAD_DIR/USAGE_GUIDE.md"
echo ""
