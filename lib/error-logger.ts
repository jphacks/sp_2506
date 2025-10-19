// エラーログ機能
export interface ErrorLog {
  timestamp: string;
  level: 'error' | 'warn' | 'info' | 'debug';
  context: string;
  message: string;
  stack?: string;
  requestId?: string;
  userId?: string;
  metadata?: Record<string, any>;
}

export class ErrorLogger {
  private static logs: ErrorLog[] = [];
  private static maxLogs = 1000;

  static log(error: any, context: string, level: 'error' | 'warn' | 'info' | 'debug' = 'error', metadata?: Record<string, any>) {
    const errorLog: ErrorLog = {
      timestamp: new Date().toISOString(),
      level,
      context,
      message: error.message || error.toString(),
      stack: error.stack,
      metadata
    };

    // ログを配列に追加
    this.logs.push(errorLog);

    // 最大ログ数を超えた場合は古いログを削除
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // コンソールに出力
    const logMessage = `[${level.toUpperCase()}] ${errorLog.timestamp} - ${context}: ${errorLog.message}`;
    
    switch (level) {
      case 'error':
        console.error(logMessage, errorLog);
        break;
      case 'warn':
        console.warn(logMessage, errorLog);
        break;
      case 'info':
        console.info(logMessage, errorLog);
        break;
      case 'debug':
        console.debug(logMessage, errorLog);
        break;
    }

    // 本番環境では外部サービスに送信
    if (process.env.NODE_ENV === 'production') {
      this.sendToExternalService(errorLog);
    }
  }

  static getLogs(level?: string, limit: number = 100): ErrorLog[] {
    let filteredLogs = this.logs;
    
    if (level) {
      filteredLogs = this.logs.filter(log => log.level === level);
    }
    
    return filteredLogs.slice(-limit);
  }

  static clearLogs(): void {
    this.logs = [];
  }

  static getErrorStats(): {
    total: number;
    byLevel: Record<string, number>;
    recentErrors: ErrorLog[];
  } {
    const stats = {
      total: this.logs.length,
      byLevel: {} as Record<string, number>,
      recentErrors: this.logs.filter(log => log.level === 'error').slice(-10)
    };

    // レベル別の集計
    this.logs.forEach(log => {
      stats.byLevel[log.level] = (stats.byLevel[log.level] || 0) + 1;
    });

    return stats;
  }

  private static async sendToExternalService(errorLog: ErrorLog): Promise<void> {
    try {
      // Sentry、LogRocket、DataDogなどの外部サービスに送信
      // 例: Sentry.captureException(error)
      
      // 現在はコンソールに出力のみ
      console.log('External logging:', errorLog);
    } catch (error) {
      console.error('Failed to send log to external service:', error);
    }
  }
}

// エラー回復機能
export class ErrorRecovery {
  private static retryAttempts = new Map<string, number>();
  private static maxRetries = 3;

  static async withRetry<T>(
    operation: () => Promise<T>,
    context: string,
    maxRetries: number = this.maxRetries
  ): Promise<T> {
    const operationId = `${context}-${Date.now()}`;
    let attempts = 0;

    while (attempts < maxRetries) {
      try {
        const result = await operation();
        this.retryAttempts.delete(operationId);
        return result;
      } catch (error) {
        attempts++;
        this.retryAttempts.set(operationId, attempts);
        
        ErrorLogger.log(error, `${context} (attempt ${attempts})`, 'warn');
        
        if (attempts >= maxRetries) {
          this.retryAttempts.delete(operationId);
          throw error;
        }
        
        // 指数バックオフでリトライ間隔を調整
        const delay = Math.pow(2, attempts) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw new Error(`Operation failed after ${maxRetries} attempts`);
  }

  static getRetryStats(): Record<string, number> {
    const stats: Record<string, number> = {};
    this.retryAttempts.forEach((attempts, operationId) => {
      stats[operationId] = attempts;
    });
    return stats;
  }
}

// エラー監視機能
export class ErrorMonitor {
  private static errorThreshold = 10; // 10分間で10回以上のエラー
  private static timeWindow = 10 * 60 * 1000; // 10分
  private static alerts: string[] = [];

  static checkErrorRate(): boolean {
    const recentErrors = ErrorLogger.getLogs('error', 1000)
      .filter(log => {
        const logTime = new Date(log.timestamp).getTime();
        const now = Date.now();
        return (now - logTime) < this.timeWindow;
      });

    const errorRate = recentErrors.length;
    
    if (errorRate > this.errorThreshold) {
      const alert = `High error rate detected: ${errorRate} errors in the last 10 minutes`;
      this.alerts.push(alert);
      ErrorLogger.log(new Error(alert), 'ErrorMonitor', 'warn');
      return true;
    }
    
    return false;
  }

  static getAlerts(): string[] {
    return this.alerts;
  }

  static clearAlerts(): void {
    this.alerts = [];
  }
}
