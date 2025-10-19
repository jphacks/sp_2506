#!/bin/bash

# 🚀 自動デプロイスクリプト
# deployブランチにプッシュされたときに実行される

set -e  # エラー時に停止

echo "🚀 デプロイを開始します..."

# カラー出力用
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 現在のブランチを確認
CURRENT_BRANCH=$(git branch --show-current)
echo -e "${BLUE}📋 現在のブランチ: ${CURRENT_BRANCH}${NC}"

if [ "$CURRENT_BRANCH" != "deploy" ]; then
    echo -e "${YELLOW}⚠️  deployブランチではありません。スキップします。${NC}"
    exit 0
fi

echo -e "${BLUE}🔧 依存関係をインストール中...${NC}"

# フロントエンド依存関係
echo -e "${YELLOW}📦 フロントエンド依存関係をインストール中...${NC}"
cd jph-front-core
bun install
cd ..

# バックエンド依存関係
echo -e "${YELLOW}📦 バックエンド依存関係をインストール中...${NC}"
cd jph-back-core
bun install
cd ..

# ルート依存関係
echo -e "${YELLOW}📦 ルート依存関係をインストール中...${NC}"
npm install

echo -e "${BLUE}🧪 テストを実行中...${NC}"

# バックエンドテスト
echo -e "${YELLOW}🧪 バックエンドテストを実行中...${NC}"
cd jph-back-core
bun test
cd ..

# フロントエンドリント
echo -e "${YELLOW}🧪 フロントエンドリントを実行中...${NC}"
cd jph-front-core
bun run lint
cd ..

echo -e "${BLUE}🏗️ プロジェクトをビルド中...${NC}"

# フロントエンドビルド
echo -e "${YELLOW}🏗️ フロントエンドをビルド中...${NC}"
cd jph-front-core
bun run build
cd ..

# バックエンドビルド
echo -e "${YELLOW}🏗️ バックエンドをビルド中...${NC}"
cd jph-back-core
bun run build
cd ..

echo -e "${GREEN}✅ ビルドが完了しました！${NC}"

# Vercelへのデプロイ
echo -e "${BLUE}🚀 Vercelにデプロイ中...${NC}"

if command -v vercel &> /dev/null; then
    vercel --prod --yes
    echo -e "${GREEN}✅ デプロイが完了しました！${NC}"
else
    echo -e "${YELLOW}⚠️  Vercel CLIがインストールされていません。${NC}"
    echo -e "${YELLOW}   GitHub Actionsでデプロイが実行されます。${NC}"
fi

echo -e "${GREEN}🎉 デプロイプロセスが完了しました！${NC}"
