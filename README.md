# OPRF セキュアデータ処理システム

[![IMAGE ALT TEXT HERE](https://jphacks.com/wp-content/uploads/2025/05/JPHACKS2025_ogp.jpg)](https://www.youtube.com/watch?v=lA9EluZugD8)

## 🚀 クイックスタート

```bash
# リポジトリのクローン
git clone https://github.com/jphacks/sp_2506.git
cd sp_2506

# 自動セットアップ（推奨）
make setup

# 開発サーバー起動
make dev
```

## 📋 利用可能なコマンド

```bash
make help          # 全コマンド一覧
make setup          # 開発環境セットアップ
make dev            # 開発サーバー起動
make test           # テスト実行
make build          # プロジェクトビルド
make clean          # クリーンアップ
```

## 製品概要

### 背景
プライバシー保護が重要なデータ処理において、従来の暗号化技術では計算処理中にデータが露出するリスクがありました。OPRF（Oblivious Pseudorandom Function）プロトコルを活用することで、データのプライバシーを完全に保護しながら計算を実行できるシステムを開発しました。

### 製品説明
OPRFプロトコルを実装したセキュアなデータ処理システムです。サーバーは入力データを直接見ることができず、クライアントは計算結果のみを取得できる、プライバシー保護された計算環境を提供します。

### 特長
#### 1. 完全なプライバシー保護
- サーバーは入力データを直接見ることができない
- クライアントは計算結果のみを取得
- 中間者攻撃に対する耐性

#### 2. 高性能な処理
- Bunランタイムによる高速実行
- TypeScriptによる型安全性
- 最適化されたOPRF実装

#### 3. 開発者フレンドリー
- 包括的な自動化システム（Makefile）
- 詳細なドキュメント
- インタラクティブなAPI ドキュメント

### 解決出来ること
- プライバシー保護が重要なデータ分析
- セキュアな機械学習処理
- 個人情報を含むデータの安全な処理
- 暗号学的に安全なデータ共有

### 今後の展望
- 分散システム対応
- クラウドネイティブデプロイ
- エンタープライズ機能の追加
- 標準化への貢献

### 注力したこと（こだわり等）
* **完全自動化**: Makefileによる開発・運用の完全自動化
* **包括的ドキュメント**: 2,209行の詳細なドキュメント
* **型安全性**: TypeScriptによる堅牢なコード
* **テストカバレッジ**: 18個のテストケースによる品質保証

## 開発技術

### 活用した技術

#### API・データ
* **OPRFプロトコル**: @cloudflare/voprf-ts
* **RESTful API**: Express.js
* **暗号化**: OpenSSL

#### フレームワーク・ライブラリ・モジュール
* **バックエンド**: Bun + TypeScript + Express.js
* **フロントエンド**: React + TypeScript + Vite
* **UI**: Material-UI
* **テスト**: Bun Test

#### デバイス
* **Webブラウザ**: モダンブラウザ対応
* **サーバー**: Node.js/Bun対応環境

### 独自技術

#### ハッカソンで開発した独自機能・技術
* **自動化システム**: 30以上のMakefileコマンドによる完全自動化
* **秘密鍵管理**: 自動生成・管理システム
* **開発ツール統合**: 開発環境の完全自動セットアップ
* **包括的ドキュメント**: セットアップ〜運用まで完全カバー

## 📚 ドキュメント

詳細なドキュメントは `docs/` ディレクトリを参照してください：

- [プロジェクト概要](docs/project-overview.md)
- [セットアップガイド](docs/setup-guide.md)
- [開発ガイド](docs/development-guide.md)
- [API仕様書](docs/api-specification.md)
- [アーキテクチャ](docs/architecture.md)
- [コントリビューションガイド](docs/contributing.md)
