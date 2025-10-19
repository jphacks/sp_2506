# Vercel + Supabase デプロイガイド

## 🚀 デプロイ手順

### 1. Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com)にアクセス
2. 新しいプロジェクトを作成
3. プロジェクトURLとAPIキーを取得

### 2. Vercelプロジェクトの作成

1. [Vercel](https://vercel.com)にアクセス
2. GitHubリポジトリを接続
3. 環境変数を設定

### 3. 環境変数の設定

Vercelのダッシュボードで以下の環境変数を設定：

```bash
# Supabase設定
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OPRF設定
OPRF_PRIVATE_KEY=your_oprf_private_key

# API設定
API_BASE_URL=https://your-vercel-app.vercel.app
```

### 4. デプロイ実行

```bash
# ローカルでのテスト
npm install
npm run build
npm start

# Vercelへのデプロイ
vercel --prod
```

## 📁 プロジェクト構造

```
jphacks-one/
├── api/                    # Vercel API Routes
│   ├── oprf.ts            # OPRF処理エンドポイント
│   └── status.ts          # ステータス確認エンドポイント
├── jph-front-core/        # フロントエンド（React）
├── jph-back-core/         # バックエンド（元のBun実装）
├── vercel.json           # Vercel設定
├── next.config.js        # Next.js設定
└── package.json          # 依存関係
```

## 🔧 技術スタック

### フロントエンド
- **React** + **TypeScript** + **Vite**
- **Material-UI** コンポーネント
- **Vercel** でホスティング

### バックエンド
- **Next.js API Routes** (Vercel Functions)
- **Node.js** ランタイム
- **Supabase** 統合

### データベース・認証
- **Supabase** (PostgreSQL + 認証)
- **Row Level Security** でセキュリティ

## 🌐 エンドポイント

### API Routes
- `GET /api/status` - システムステータス
- `POST /api/oprf` - OPRF処理

### フロントエンド
- `/` - メインアプリケーション
- `/api-docs` - APIドキュメント

## 🔒 セキュリティ

### 環境変数
- 秘密鍵は環境変数で管理
- SupabaseのRow Level Securityを活用

### CORS設定
- 適切なCORS設定でセキュリティを確保
- 本番環境では特定ドメインのみ許可

## 📊 監視・ログ

### Vercel Analytics
- パフォーマンス監視
- エラー追跡

### Supabase Dashboard
- データベース監視
- 認証ログ

## 🚨 トラブルシューティング

### よくある問題

1. **環境変数が設定されていない**
   ```bash
   # Vercelダッシュボードで確認
   vercel env ls
   ```

2. **OPRF処理でエラーが発生**
   ```bash
   # ログを確認
   vercel logs
   ```

3. **Supabase接続エラー**
   ```bash
   # 接続情報を確認
   echo $NEXT_PUBLIC_SUPABASE_URL
   ```

## 📈 パフォーマンス最適化

### Vercel Functions
- コールドスタートの最適化
- メモリ使用量の監視

### Supabase
- 接続プールの設定
- インデックスの最適化

## 🔄 CI/CD

### 自動デプロイ
- GitHubへのプッシュで自動デプロイ
- プレビューデプロイでテスト

### 環境分離
- 開発環境: `vercel-dev`
- 本番環境: `vercel-prod`
