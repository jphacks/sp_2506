# セットアップガイド

## 📋 前提条件

### 必要なソフトウェア
- **Bun**: 1.0以上 (高速JavaScript/TypeScriptランタイム)
- **Node.js**: 18.0以上 (Vercel Functions対応)
- **Git**: 2.0以上 (バージョン管理)
- **OS**: macOS, Linux, Windows
- **ブラウザ**: Chrome, Firefox, Safari, Edge (最新版)

### 推奨環境
- **メモリ**: 4GB以上
- **ストレージ**: 2GB以上の空き容量
- **ネットワーク**: インターネット接続

## 🛠️ 技術スタック

### フロントエンド
- **フレームワーク**: React 19.1.1
- **言語**: TypeScript 5.9.3
- **ビルドツール**: Vite 7.1.7
- **UI/UX**: Framer Motion 11.11.17 + Tailwind CSS 4.1.0
- **アイコン**: Lucide React 0.460.0
- **フォーム**: React Hook Form 7.65.0

### バックエンド
- **ランタイム**: Bun 1.0+
- **フレームワーク**: Express.js 5.1.0
- **言語**: TypeScript 5.9.3
- **暗号化**: @cloudflare/voprf-ts 1.0.0
- **API仕様**: Swagger OpenAPI 3.0

### デプロイ・インフラ
- **フロントエンド**: Vercel
- **バックエンド**: Vercel Functions
- **CI/CD**: GitHub Actions
- **パッケージマネージャー**: Bun

## 🚀 クイックスタート

### 1. リポジトリのクローン

```bash
git clone https://github.com/jphacks/sp_2506.git
cd sp_2506
```

### 2. 自動セットアップ（推奨）

```bash
# 完全自動セットアップ（推奨）
make setup

# または段階的にセットアップ
make install-tools    # 開発ツールの確認
make setup-backend     # バックエンド環境セットアップ
make setup-frontend    # フロントエンド環境セットアップ
```

### 3. 手動セットアップ（詳細設定が必要な場合）

#### 依存関係のインストール
```bash
# バックエンド
cd jph-back-core
bun install

# フロントエンド
cd ../jph-front-core
bun install
```

#### 環境設定
```bash
# バックエンド設定（秘密鍵は自動生成されます）
cd jph-back-core
make generate-key  # 新しい秘密鍵を生成

# フロントエンド設定
cd jph-front-core
echo "VITE_API_BASE_URL=http://localhost:3000" > .env.local
```

### 4. 開発サーバーの起動

#### 自動起動（推奨）
```bash
# バックエンド + フロントエンドを同時起動
make dev
```

#### 個別起動
```bash
# バックエンドのみ
make dev-backend

# フロントエンドのみ
make dev-frontend
```

### 5. 動作確認

- **バックエンド**: http://localhost:3000
- **フロントエンド**: http://localhost:5173
- **API ドキュメント**: http://localhost:3000/api-docs/

---

## 🔧 詳細セットアップ

### 開発ツールの確認・インストール

#### 自動確認（推奨）
```bash
# 必要な開発ツールの確認
make install-tools
```

#### 手動インストール

##### Bunのインストール
```bash
# macOS/Linux
curl -fsSL https://bun.sh/install | bash

# Windows
powershell -c "irm bun.sh/install.ps1 | iex"

# 代替方法（npm経由）
npm install -g bun
```

##### その他の開発ツール
```bash
# Node.js（Bunの代替として）
# https://nodejs.org/

# Git
# https://git-scm.com/

# OpenSSL（暗号化処理用）
# macOS: brew install openssl
# Ubuntu: sudo apt-get install openssl

# Docker（オプション）
# https://www.docker.com/get-started
```

### プロジェクト構造の確認

```
sp_2506/
├── jph-back-core/          # バックエンドプロジェクト
│   ├── src/               # ソースコード
│   ├── tests/             # テストファイル
│   ├── secrets/           # 秘密鍵ファイル
│   └── package.json       # 依存関係
├── jph-front-core/        # フロントエンドプロジェクト
│   ├── src/               # ソースコード
│   ├── public/            # 静的ファイル
│   └── package.json       # 依存関係
└── docs/                  # ドキュメント
```

---

## 🔐 セキュリティ設定

### 秘密鍵の管理

#### 本番環境用の秘密鍵生成
```bash
cd jph-back-core

# 強力な秘密鍵を生成
openssl rand -base64 32 > secrets/key.priv

# 権限を制限
chmod 600 secrets/key.priv
```

#### 開発環境用の設定
```bash
# 開発用の簡単な秘密鍵
echo "dev-key-$(date +%s)" | base64 > secrets/key.priv
```

### 環境変数の設定

#### バックエンド環境変数
```bash
# .env ファイルを作成
cat > jph-back-core/.env << EOF
PORT=3000
NODE_ENV=development
OPRF_PRIVATE_KEY_PATH=./secrets/key.priv
CORS_ORIGIN=http://localhost:5173
EOF
```

#### フロントエンド環境変数
```bash
# .env.local ファイルを作成
cat > jph-front-core/.env.local << EOF
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=OPRF Client
VITE_APP_VERSION=1.0.0
EOF
```

---

## 🧪 テスト環境の構築

### テストの実行

#### 自動テスト（推奨）
```bash
# 全テストを実行
make test

# バックエンドテストのみ
make test-backend

# フロントエンドテストのみ
make test-frontend

# テストカバレッジ
make test-coverage
```

#### 手動テスト
```bash
# バックエンドテスト
cd jph-back-core
bun test

# フロントエンドテスト
cd jph-front-core
bun test
```

### テストカバレッジの確認
```bash
# 自動実行
make test-coverage

# 手動実行
cd jph-back-core && bun test --coverage
cd jph-front-core && bun test --coverage
```

---

## 🐳 Docker環境でのセットアップ

### Dockerfileの作成

#### バックエンド用Dockerfile
```dockerfile
# jph-back-core/Dockerfile
FROM oven/bun:1-alpine

WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
EXPOSE 3000

CMD ["bun", "run", "start"]
```

#### フロントエンド用Dockerfile
```dockerfile
# jph-front-core/Dockerfile
FROM oven/bun:1-alpine as builder

WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
```

### docker-compose.yml
```yaml
version: '3.8'
services:
  backend:
    build: ./jph-back-core
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - ./jph-back-core/secrets:/app/secrets:ro

  frontend:
    build: ./jph-front-core
    ports:
      - "5173:80"
    depends_on:
      - backend
```

### Docker環境での起動
```bash
# 自動起動（推奨）
make docker-up

# 手動起動
docker-compose up -d

# ログの確認
make logs
# または
docker-compose logs -f

# 停止
make docker-down
# または
docker-compose down
```

---

## 🔍 トラブルシューティング

### よくある問題

#### 1. Bunのインストールエラー
```bash
# 解決方法
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc  # または ~/.zshrc
```

#### 2. ポートが既に使用されている
```bash
# 使用中のポートを確認
lsof -i :3000
lsof -i :5173

# プロセスを終了
kill -9 <PID>
```

#### 3. 秘密鍵ファイルが見つからない
```bash
# ファイルの存在確認
ls -la jph-back-core/secrets/

# 権限の確認
chmod 600 jph-back-core/secrets/key.priv
```

#### 4. 依存関係のインストールエラー
```bash
# キャッシュをクリア
bun pm cache rm

# 再インストール
rm -rf node_modules bun.lock
bun install
```

### ログの確認

#### バックエンドログ
```bash
cd jph-back-core
bun run dev 2>&1 | tee logs/backend.log
```

#### フロントエンドログ
```bash
cd jph-front-core
bun run dev 2>&1 | tee logs/frontend.log
```

---

## 📊 パフォーマンス最適化

### 開発環境の最適化

#### 自動最適化（推奨）
```bash
# プロジェクト状態の確認
make status

# プロジェクト情報の表示
make info

# ログの確認
make logs
```

#### 手動最適化

##### Bunの設定
```bash
# bunfig.toml を作成
cat > bunfig.toml << EOF
[install]
cache = true
frozen-lockfile = true

[run]
bun = true
EOF
```

##### メモリ使用量の監視
```bash
# メモリ使用量を確認
ps aux | grep bun

# メモリ制限を設定
export NODE_OPTIONS="--max-old-space-size=4096"
```

---

## 🚀 本番環境への準備

### 本番用設定

#### 自動ビルド・デプロイ（推奨）
```bash
# 全プロジェクトをビルド
make build

# デプロイ実行
make deploy
```

#### 手動設定

##### 環境変数の設定
```bash
# 本番用環境変数
export NODE_ENV=production
export PORT=3000
export OPRF_PRIVATE_KEY_PATH=/app/secrets/key.priv
```

##### セキュリティ設定
```bash
# ファイアウォール設定
ufw allow 3000
ufw allow 443

# SSL証明書の設定
# Let's Encryptを使用
certbot --nginx -d yourdomain.com
```

### 監視設定

#### ヘルスチェック
```bash
# ヘルスチェックスクリプト
cat > healthcheck.sh << 'EOF'
#!/bin/bash
curl -f http://localhost:3000/api/status || exit 1
EOF

chmod +x healthcheck.sh
```

---

## 📚 追加リソース

### 公式ドキュメント
- [Bun公式ドキュメント](https://bun.sh/docs)
- [Express.js公式ドキュメント](https://expressjs.com/)
- [React公式ドキュメント](https://react.dev/)

### 学習リソース
- [TypeScript公式ドキュメント](https://www.typescriptlang.org/docs/)
- [OPRFプロトコル仕様](https://datatracker.ietf.org/doc/draft-irtf-cfrg-voprf/)

### サポート
- [GitHub Issues](https://github.com/jphacks/sp_2506/issues)
- [Discussions](https://github.com/jphacks/sp_2506/discussions)
