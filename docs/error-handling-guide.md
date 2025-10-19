# 🛡️ エラーハンドリングガイド

## 📋 概要

このプロジェクトでは包括的なエラーハンドリング機能を実装しており、エラーを適切に吸収・処理・監視することができます。

## 🔧 実装された機能

### 1. **エラーログ機能** (`lib/error-logger.ts`)
- 構造化されたエラーログ
- レベル別ログ管理（error, warn, info, debug）
- 外部サービス連携（Sentry、LogRocket等）
- エラー統計とアラート機能

### 2. **サーキットブレーカーパターン** (`lib/circuit-breaker.ts`)
- 障害の連鎖を防ぐ遮断機能
- 自動回復機能
- 半開状態での段階的復旧

### 3. **エラー回復機能** (`lib/error-logger.ts`)
- 指数バックオフによるリトライ
- 最大リトライ回数の制限
- 回復統計の追跡

### 4. **エラー監視機能** (`api/monitor.ts`)
- リアルタイム監視
- パフォーマンス指標
- アラート機能

### 5. **フロントエンドエラーバウンダリー** (`lib/error-boundary.tsx`)
- React コンポーネントのエラーキャッチ
- ユーザーフレンドリーなエラー表示
- 開発環境での詳細エラー情報

## 🚀 使用方法

### APIエンドポイントでのエラーハンドリング

```typescript
import { ErrorLogger, ErrorRecovery } from '../lib/error-logger';
import { circuitBreakerManager } from '../lib/circuit-breaker';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // サーキットブレーカー付きの処理
    const result = await circuitBreakerManager
      .getBreaker('my-service')
      .execute(async () => {
        return await myService.process();
      });
      
    res.status(200).json(result);
  } catch (error) {
    ErrorLogger.log(error, 'API handler', 'error');
    res.status(500).json({ error: 'Internal server error' });
  }
}
```

### フロントエンドでのエラーハンドリング

```tsx
import { ErrorBoundary, withErrorBoundary } from '../lib/error-boundary';

// エラーバウンダリーでコンポーネントをラップ
function App() {
  return (
    <ErrorBoundary
      fallback={<div>エラーが発生しました</div>}
      onError={(error, errorInfo) => {
        console.error('Error caught:', error, errorInfo);
      }}
    >
      <MyComponent />
    </ErrorBoundary>
  );
}

// HOCを使用した方法
const MyComponentWithErrorBoundary = withErrorBoundary(MyComponent);
```

### カスタムエラーハンドリング

```typescript
import { useErrorHandler } from '../lib/error-boundary';

function MyComponent() {
  const { handleError } = useErrorHandler();
  
  const handleAsyncOperation = async () => {
    try {
      await someAsyncOperation();
    } catch (error) {
      handleError(error, 'async operation');
    }
  };
}
```

## 📊 監視とアラート

### ヘルスチェックエンドポイント

```bash
# システム全体のヘルスチェック
GET /api/health

# 詳細な監視データ
GET /api/monitor
```

### 監視データの例

```json
{
  "timestamp": "2024-01-01T00:00:00.000Z",
  "system": {
    "uptime": 3600,
    "memory": { "heapUsed": 50, "heapTotal": 100 },
    "cpu": { "user": 1000, "system": 500 }
  },
  "errors": {
    "stats": { "total": 10, "byLevel": { "error": 5, "warn": 3 } },
    "rate": false
  },
  "circuitBreakers": {
    "oprf-service": { "state": "CLOSED", "failureCount": 0 }
  },
  "performance": {
    "memoryUsage": 50,
    "uptime": 3600,
    "errorRate": 0.1
  },
  "alerts": []
}
```

## 🔍 エラータイプと対応

### 1. **ネットワークエラー**
- 自動リトライ（指数バックオフ）
- サーキットブレーカーによる遮断
- タイムアウト設定

### 2. **データベースエラー**
- 接続プールの管理
- トランザクションのロールバック
- 接続の再確立

### 3. **認証エラー**
- トークンの自動更新
- セッションの再確立
- ユーザーへの適切な通知

### 4. **バリデーションエラー**
- 入力データの検証
- エラーメッセージの国際化
- ユーザーフレンドリーな表示

## 🚨 アラート設定

### エラー率の監視
```typescript
// 10分間で10回以上のエラーでアラート
const errorRate = ErrorMonitor.checkErrorRate();
if (errorRate) {
  // アラートを送信
  sendAlert('High error rate detected');
}
```

### サーキットブレーカーの監視
```typescript
const breakerStats = circuitBreakerManager.getAllStats();
Object.entries(breakerStats).forEach(([name, stats]) => {
  if (stats.state === 'OPEN') {
    sendAlert(`Circuit breaker ${name} is OPEN`);
  }
});
```

## 🔧 設定とカスタマイズ

### サーキットブレーカーの設定
```typescript
const breaker = circuitBreakerManager.getBreaker('my-service', {
  failureThreshold: 5,        // 失敗回数の閾値
  recoveryTimeout: 60000,     // 回復待機時間（ms）
  monitoringPeriod: 300000,  // 監視期間（ms）
  halfOpenMaxCalls: 3        // 半開状態での最大呼び出し数
});
```

### エラーログの設定
```typescript
// ログレベルの設定
ErrorLogger.log(error, 'context', 'error');

// 外部サービスへの送信
if (process.env.NODE_ENV === 'production') {
  // Sentry.captureException(error);
}
```

## 📈 パフォーマンス最適化

### エラーログの最適化
- ログのバッファリング
- 非同期での外部送信
- ログレベルの動的調整

### サーキットブレーカーの最適化
- 適切な閾値設定
- 監視期間の調整
- 回復戦略の最適化

## 🛠️ トラブルシューティング

### よくある問題

#### 1. **サーキットブレーカーが開き続ける**
```typescript
// 手動でリセット
circuitBreakerManager.reset('service-name');
```

#### 2. **エラーログが多すぎる**
```typescript
// ログレベルを調整
ErrorLogger.log(error, 'context', 'warn'); // error → warn
```

#### 3. **外部サービスへの送信が失敗**
```typescript
// フォールバック処理
try {
  sendToExternalService(error);
} catch (sendError) {
  console.error('Failed to send to external service:', sendError);
}
```

## 📚 ベストプラクティス

### 1. **エラーの分類**
- 一時的なエラー（リトライ可能）
- 永続的なエラー（リトライ不可）
- ユーザーエラー（入力ミス等）

### 2. **ログの構造化**
- 一貫したログ形式
- 必要な情報の包含
- 機密情報の除外

### 3. **監視の継続性**
- 定期的なヘルスチェック
- アラートの適切な設定
- ダッシュボードでの可視化

### 4. **ユーザー体験の向上**
- 分かりやすいエラーメッセージ
- 適切なフォールバック
- 復旧手順の提供

---

**注意**: 本番環境では必ず適切なエラー監視サービス（Sentry、DataDog等）を設定し、エラーの追跡と分析を行ってください。
