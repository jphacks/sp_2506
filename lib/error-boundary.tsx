import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // カスタムエラーハンドラーが指定されている場合は呼び出し
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // エラーログの送信（本番環境）
    if (process.env.NODE_ENV === 'production') {
      this.logErrorToService(error, errorInfo);
    }
  }

  private logErrorToService(error: Error, errorInfo: ErrorInfo) {
    // 外部エラー監視サービスに送信
    // 例: Sentry.captureException(error, { extra: errorInfo })
    console.log('Error logged to external service:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });
  }

  render() {
    if (this.state.hasError) {
      // カスタムフォールバックUI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // デフォルトエラーUI
      return (
        <div style={{
          padding: '20px',
          border: '1px solid #ff6b6b',
          borderRadius: '8px',
          backgroundColor: '#ffe0e0',
          color: '#d63031',
          textAlign: 'center'
        }}>
          <h2>⚠️ エラーが発生しました</h2>
          <p>申し訳ございません。予期しないエラーが発生しました。</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#74b9ff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            ページを再読み込み
          </button>
          {process.env.NODE_ENV === 'development' && (
            <details style={{ marginTop: '20px', textAlign: 'left' }}>
              <summary>エラー詳細（開発環境のみ）</summary>
              <pre style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '10px', 
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '12px'
              }}>
                {this.state.error?.stack}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

// 関数コンポーネント用のエラーハンドラー
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

// エラーハンドリング用のカスタムフック
export function useErrorHandler() {
  const handleError = (error: Error, context?: string) => {
    console.error(`Error in ${context || 'unknown context'}:`, error);
    
    // エラーを外部サービスに送信
    if (process.env.NODE_ENV === 'production') {
      // Sentry.captureException(error, { tags: { context } });
      console.log('Error sent to external service:', { error: error.message, context });
    }
  };

  return { handleError };
}
