# 🔐 最小限環境変数設定ガイド

## 📋 概要

このプロジェクトでは環境変数を必要最小限に絞り込み、シンプルな設定で運用できるようにしています。

## 🎯 必要最小限の環境変数

### **必須設定（3つのみ）**

#### **1. ルート環境変数 (`.env`)**
```bash
# OPRF秘密鍵（必須）
OPRF_PRIVATE_KEY=your_oprf_private_key_here

# 環境設定
NODE_ENV=production
```

#### **2. バックエンド環境変数 (`jph-back-core/.env`)**
```bash
# OPRF秘密鍵（必須）
OPRF_PRIVATE_KEY=your_oprf_private_key_here

# サーバー設定
PORT=3000
NODE_ENV=development
```

#### **3. フロントエンド環境変数 (`jph-front-core/.env.local`)**
```bash
# API設定
VITE_API_BASE_URL=http://localhost:3000

# アプリケーション設定
VITE_APP_NAME=OPRF Client
```

## 🚀 クイックセットアップ

### **1. ファイル作成**
```bash
# ルート環境変数
echo "OPRF_PRIVATE_KEY=your_oprf_private_key_here" > .env
echo "NODE_ENV=production" >> .env

# バックエンド環境変数
echo "OPRF_PRIVATE_KEY=your_oprf_private_key_here" > jph-back-core/.env
echo "PORT=3000" >> jph-back-core/.env
echo "NODE_ENV=development" >> jph-back-core/.env

# フロントエンド環境変数
echo "VITE_API_BASE_URL=http://localhost:3000" > jph-front-core/.env.local
echo "VITE_APP_NAME=OPRF Client" >> jph-front-core/.env.local
```

### **2. 秘密鍵の生成**
```bash
# 強力なOPRF秘密鍵を生成
openssl rand -hex 32
```

### **3. 値の設定**
生成された秘密鍵を各`.env`ファイルの`your_oprf_private_key_here`部分に設定してください。

## 🔧 設定の確認

### **環境変数の検証**
```bash
# バックエンド環境変数の確認
cd jph-back-core
node -e "console.log('OPRF_PRIVATE_KEY:', process.env.OPRF_PRIVATE_KEY ? 'SET' : 'NOT SET')"

# フロントエンド環境変数の確認
cd jph-front-core
node -e "console.log('VITE_API_BASE_URL:', process.env.VITE_API_BASE_URL || 'NOT SET')"
```

## 🚀 デプロイ設定

### **Vercel環境変数（最小限）**
```bash
NODE_ENV=production
OPRF_PRIVATE_KEY=your_production_oprf_key
```

### **GitHub Secrets（最小限）**
```bash
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

## 📊 設定の比較

### **従来の設定（複雑）**
- Supabase設定: 3変数
- 外部サービス設定: 2変数
- ログ設定: 2変数
- セキュリティ設定: 2変数
- **合計: 9変数**

### **最小限設定（シンプル）**
- OPRF秘密鍵: 1変数
- 環境設定: 1変数
- **合計: 2変数**

## ✅ メリット

### **1. シンプルさ**
- 設定項目が大幅に削減
- 初心者でも簡単にセットアップ
- 設定ミスのリスクが低減

### **2. セキュリティ**
- 機密情報の管理が簡単
- 漏洩リスクの削減
- 監査が容易

### **3. 運用性**
- デプロイが高速
- トラブルシューティングが簡単
- メンテナンスが容易

## 🚨 注意事項

### **1. 本番環境での秘密鍵**
```bash
# 開発用（簡単）
OPRF_PRIVATE_KEY=dev-key-123

# 本番用（強力）
OPRF_PRIVATE_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

### **2. 環境変数の検証**
```typescript
// 最小限の必須チェック
const requiredVars = ['OPRF_PRIVATE_KEY'];
const missing = requiredVars.filter(v => !process.env[v]);
if (missing.length > 0) {
  throw new Error(`Missing: ${missing.join(', ')}`);
}
```

## 📚 参考資料

- [Next.js環境変数](https://nextjs.org/docs/basic-features/environment-variables)
- [Vite環境変数](https://vitejs.dev/guide/env-and-mode.html)
- [Vercel環境変数](https://vercel.com/docs/concepts/projects/environment-variables)

---

**重要**: この最小限設定で、OPRFアプリケーションは完全に動作します。必要に応じて追加の環境変数を設定することも可能です。
