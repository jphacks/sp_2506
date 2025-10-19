# 🔐 環境変数設定ガイド

## 📋 概要

このプロジェクトでは機密情報を環境変数で管理し、Gitリポジトリに含めないように設定されています。

## 🚫 Gitで無視されるファイル

以下のファイルは`.gitignore`で除外されており、Gitにコミットされません：

### 環境変数ファイル
```
.env
.env.*
jph-back-core/.env
jph-back-core/.env.*
jph-front-core/.env.local
jph-front-core/.env.*
```

### 秘密鍵ファイル
```
jph-back-core/secrets/
*.priv
*.key
*.pem
config/secrets/
secrets/
```

## 🔧 環境変数の設定

### 1. バックエンド環境変数

`jph-back-core/.env.example`をコピーして`.env`を作成：

```bash
cd jph-back-core
cp .env.example .env
```

#### 必要な環境変数（最小限）
```bash
# OPRF秘密鍵（必須）
OPRF_PRIVATE_KEY=your_oprf_private_key_here

# サーバー設定
PORT=3000
NODE_ENV=development
```

### 2. フロントエンド環境変数

`jph-front-core/.env.example`をコピーして`.env.local`を作成：

```bash
cd jph-front-core
cp .env.example .env.local
```

#### 必要な環境変数（最小限）
```bash
# API設定
VITE_API_BASE_URL=http://localhost:3000

# アプリケーション設定
VITE_APP_NAME=OPRF Client
```

## 🚀 デプロイ環境での設定

### Vercel環境変数

Vercelダッシュボードで以下の環境変数を設定：

```bash
# 本番環境（最小限）
NODE_ENV=production
OPRF_PRIVATE_KEY=your_production_oprf_key
```

### GitHub Secrets

GitHub Actionsで使用するシークレット：

```bash
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

## 🔒 セキュリティベストプラクティス

### 1. 秘密鍵の管理
- 本番環境では強力な秘密鍵を使用
- 定期的に秘密鍵をローテーション
- 秘密鍵は環境変数でのみ管理

### 2. 環境変数の検証
```typescript
// 環境変数の存在確認（最小限）
const requiredEnvVars = [
  'OPRF_PRIVATE_KEY'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
}
```

### 3. 開発環境での注意
- 開発用の秘密鍵は本番環境で使用しない
- `.env`ファイルは絶対にコミットしない
- チーム間で秘密鍵を共有する場合は安全な方法を使用

## 📁 ファイル構造

```
jphacks-one/
├── .gitignore                 # Git無視設定
├── env.example               # ルート環境変数例
├── jph-back-core/
│   ├── .env.example          # バックエンド環境変数例
│   ├── .env                  # バックエンド環境変数（無視）
│   └── secrets/              # 秘密鍵ディレクトリ（無視）
└── jph-front-core/
    ├── .env.example          # フロントエンド環境変数例
    └── .env.local            # フロントエンド環境変数（無視）
```

## 🚨 トラブルシューティング

### よくある問題

#### 1. 環境変数が読み込まれない
```bash
# ファイルの存在確認
ls -la jph-back-core/.env
ls -la jph-front-core/.env.local

# 権限の確認
chmod 600 jph-back-core/.env
chmod 600 jph-front-core/.env.local
```

#### 2. 秘密鍵ファイルが見つからない
```bash
# 秘密鍵ディレクトリの作成
mkdir -p jph-back-core/secrets

# 秘密鍵の生成
openssl rand -hex 32 > jph-back-core/secrets/key.priv
chmod 600 jph-back-core/secrets/key.priv
```

#### 3. 環境変数の検証
```bash
# 環境変数の確認
echo $OPRF_PRIVATE_KEY
echo $VITE_API_BASE_URL

# アプリケーションでの確認
node -e "console.log(process.env.OPRF_PRIVATE_KEY)"
```

## 📚 参考資料

- [Next.js環境変数](https://nextjs.org/docs/basic-features/environment-variables)
- [Vite環境変数](https://vitejs.dev/guide/env-and-mode.html)
- [Vercel環境変数](https://vercel.com/docs/concepts/projects/environment-variables)
- [Supabase環境変数](https://supabase.com/docs/guides/getting-started#local-development)

---

**重要**: 機密情報を含むファイルは絶対にGitリポジトリにコミットしないでください。セキュリティリスクの原因となります。
