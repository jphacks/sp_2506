// サーキットブレーカーパターンの実装
export interface CircuitBreakerConfig {
  failureThreshold: number;    // 失敗回数の閾値
  recoveryTimeout: number;     // 回復待機時間（ms）
  monitoringPeriod: number;   // 監視期間（ms）
  halfOpenMaxCalls: number;   // 半開状態での最大呼び出し数
}

export enum CircuitState {
  CLOSED = 'CLOSED',      // 正常状態
  OPEN = 'OPEN',          // 遮断状態
  HALF_OPEN = 'HALF_OPEN' // 半開状態
}

export class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private failureCount: number = 0;
  private lastFailureTime: number = 0;
  private nextAttemptTime: number = 0;
  private halfOpenCalls: number = 0;
  
  constructor(
    private name: string,
    private config: CircuitBreakerConfig = {
      failureThreshold: 5,
      recoveryTimeout: 60000, // 1分
      monitoringPeriod: 300000, // 5分
      halfOpenMaxCalls: 3
    }
  ) {}

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    // 状態チェック
    if (this.state === CircuitState.OPEN) {
      if (Date.now() < this.nextAttemptTime) {
        throw new Error(`Circuit breaker is OPEN for ${this.name}. Next attempt at ${new Date(this.nextAttemptTime).toISOString()}`);
      }
      this.state = CircuitState.HALF_OPEN;
      this.halfOpenCalls = 0;
    }

    if (this.state === CircuitState.HALF_OPEN && this.halfOpenCalls >= this.config.halfOpenMaxCalls) {
      throw new Error(`Circuit breaker is HALF_OPEN for ${this.name}. Max calls reached.`);
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failureCount = 0;
    this.state = CircuitState.CLOSED;
    this.halfOpenCalls = 0;
  }

  private onFailure(): void {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    this.halfOpenCalls++;

    if (this.state === CircuitState.HALF_OPEN) {
      this.state = CircuitState.OPEN;
      this.nextAttemptTime = Date.now() + this.config.recoveryTimeout;
    } else if (this.failureCount >= this.config.failureThreshold) {
      this.state = CircuitState.OPEN;
      this.nextAttemptTime = Date.now() + this.config.recoveryTimeout;
    }
  }

  getState(): CircuitState {
    return this.state;
  }

  getStats(): {
    state: CircuitState;
    failureCount: number;
    lastFailureTime: number;
    nextAttemptTime: number;
    halfOpenCalls: number;
  } {
    return {
      state: this.state,
      failureCount: this.failureCount,
      lastFailureTime: this.lastFailureTime,
      nextAttemptTime: this.nextAttemptTime,
      halfOpenCalls: this.halfOpenCalls
    };
  }

  reset(): void {
    this.state = CircuitState.CLOSED;
    this.failureCount = 0;
    this.lastFailureTime = 0;
    this.nextAttemptTime = 0;
    this.halfOpenCalls = 0;
  }
}

// サーキットブレーカーマネージャー
export class CircuitBreakerManager {
  private breakers: Map<string, CircuitBreaker> = new Map();

  getBreaker(name: string, config?: CircuitBreakerConfig): CircuitBreaker {
    if (!this.breakers.has(name)) {
      this.breakers.set(name, new CircuitBreaker(name, config));
    }
    return this.breakers.get(name)!;
  }

  getAllStats(): Record<string, any> {
    const stats: Record<string, any> = {};
    this.breakers.forEach((breaker, name) => {
      stats[name] = breaker.getStats();
    });
    return stats;
  }

  resetAll(): void {
    this.breakers.forEach(breaker => breaker.reset());
  }

  reset(name: string): void {
    const breaker = this.breakers.get(name);
    if (breaker) {
      breaker.reset();
    }
  }
}

// グローバルインスタンス
export const circuitBreakerManager = new CircuitBreakerManager();
