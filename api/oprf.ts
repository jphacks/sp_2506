import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { ErrorLogger, ErrorRecovery } from '../lib/error-logger';
import { circuitBreakerManager } from '../lib/circuit-breaker';

// エラーハンドリング用のユーティリティ
class ErrorHandler {
  static logError(error: any, context: string) {
    const timestamp = new Date().toISOString();
    const errorInfo = {
      timestamp,
      context,
      error: error.message || error,
      stack: error.stack,
      type: error.constructor.name
    };
    
    console.error(`[ERROR] ${timestamp} - ${context}:`, errorInfo);
    
    // 本番環境では外部ログサービスに送信
    if (process.env.NODE_ENV === 'production') {
      // TODO: SentryやLogRocketなどの外部サービスに送信
      this.sendToExternalLogger(errorInfo);
    }
  }
  
  static sendToExternalLogger(errorInfo: any) {
    // 外部ログサービスの実装
    // 例: Sentry.captureException(error)
  }
  
  static createErrorResponse(message: string, code: string, statusCode: number = 500) {
    return {
      error: message,
      code,
      timestamp: new Date().toISOString(),
      requestId: Math.random().toString(36).substring(7)
    };
  }
}

// Supabaseクライアントの初期化（エラーハンドリング付き）
let supabase: any = null;
try {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase credentials not found, running without database features');
  } else {
    supabase = createClient(supabaseUrl, supabaseKey);
  }
} catch (error) {
  ErrorHandler.logError(error, 'Supabase initialization');
  console.warn('Supabase initialization failed, running without database features');
}

// OPRF処理の実装（Node.js互換版・エラーハンドリング強化）
class OPRFService {
  private privateKey: string;
  private isInitialized: boolean = false;
  private retryCount: number = 0;
  private maxRetries: number = 3;

  constructor(privateKey: string) {
    this.privateKey = privateKey;
  }

  async initialize(): Promise<void> {
    try {
      // 初期化処理
      console.log('OPRF Service initializing...');
      
      // 秘密鍵の検証
      if (!this.privateKey || this.privateKey.length < 16) {
        throw new Error('Invalid private key provided');
      }
      
      this.isInitialized = true;
      console.log('OPRF Service initialized successfully');
    } catch (error) {
      ErrorHandler.logError(error, 'OPRF Service initialization');
      throw error;
    }
  }

  async evaluate(input: Uint8Array): Promise<Uint8Array> {
    if (!this.isInitialized) {
      throw new Error('OPRF Service not initialized');
    }

    try {
      // 入力データの検証
      if (!input || input.length === 0) {
        throw new Error('Invalid input data');
      }

      // リトライ機能付きのOPRF処理
      return await this.performOPRFWithRetry(input);
    } catch (error) {
      ErrorHandler.logError(error, 'OPRF evaluation');
      throw error;
    }
  }

  private async performOPRFWithRetry(input: Uint8Array): Promise<Uint8Array> {
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        // 簡易的なOPRF処理（実際の実装では@cloudflare/voprf-tsを使用）
        const hash = await crypto.subtle.digest('SHA-256', input);
        const result = new Uint8Array(hash);
        
        // 成功時はリトライカウントをリセット
        this.retryCount = 0;
        return result;
      } catch (error) {
        this.retryCount++;
        ErrorHandler.logError(error, `OPRF processing attempt ${attempt}`);
        
        if (attempt === this.maxRetries) {
          throw new Error(`OPRF processing failed after ${this.maxRetries} attempts`);
        }
        
        // 指数バックオフでリトライ間隔を調整
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw new Error('OPRF processing failed');
  }

  // ヘルスチェック機能
  async healthCheck(): Promise<boolean> {
    try {
      const testInput = new Uint8Array([1, 2, 3, 4, 5]);
      await this.evaluate(testInput);
      return true;
    } catch (error) {
      ErrorHandler.logError(error, 'OPRF health check');
      return false;
    }
  }
}

// グローバルなOPRFサービスインスタンス
let oprfService: OPRFService | null = null;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestId = Math.random().toString(36).substring(7);
  
  try {
    // CORS設定
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('X-Request-ID', requestId);

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    if (req.method !== 'POST') {
      const errorResponse = ErrorHandler.createErrorResponse(
        'Method not allowed',
        'METHOD_NOT_ALLOWED',
        405
      );
      return res.status(405).json(errorResponse);
    }

    // リクエストサイズの検証
    const contentLength = parseInt(req.headers['content-length'] || '0');
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (contentLength > maxSize) {
      const errorResponse = ErrorHandler.createErrorResponse(
        'Request too large',
        'REQUEST_TOO_LARGE',
        413
      );
      return res.status(413).json(errorResponse);
    }

    // OPRFサービスの初期化（エラーハンドリング付き）
    if (!oprfService) {
      try {
        const privateKey = process.env.OPRF_PRIVATE_KEY || 'default-key';
        oprfService = new OPRFService(privateKey);
        await oprfService.initialize();
      } catch (error) {
        ErrorHandler.logError(error, 'OPRF Service initialization');
        const errorResponse = ErrorHandler.createErrorResponse(
          'Failed to initialize OPRF service',
          'INITIALIZATION_ERROR',
          500
        );
        return res.status(500).json(errorResponse);
      }
    }

    // リクエストボディからバイナリデータを取得
    const binaryData = req.body;
    
    if (!binaryData || binaryData.length === 0) {
      const errorResponse = ErrorHandler.createErrorResponse(
        'Binary data is missing or empty',
        'MISSING_DATA',
        400
      );
      return res.status(400).json(errorResponse);
    }

    // バイナリデータをUint8Arrayに変換
    let inputData: Uint8Array;
    try {
      inputData = new Uint8Array(binaryData);
    } catch (error) {
      ErrorHandler.logError(error, 'Data conversion');
      const errorResponse = ErrorHandler.createErrorResponse(
        'Invalid binary data format',
        'INVALID_DATA_FORMAT',
        400
      );
      return res.status(400).json(errorResponse);
    }

    // OPRF処理を実行（サーキットブレーカー付き）
    let result: Uint8Array;
    try {
      const oprfBreaker = circuitBreakerManager.getBreaker('oprf-service', {
        failureThreshold: 3,
        recoveryTimeout: 30000, // 30秒
        monitoringPeriod: 300000, // 5分
        halfOpenMaxCalls: 2
      });

      result = await oprfBreaker.execute(async () => {
        return await oprfService.evaluate(inputData);
      });
    } catch (error) {
      ErrorLogger.log(error, 'OPRF processing with circuit breaker', 'error');
      
      // サーキットブレーカーが開いている場合
      if (error.message.includes('Circuit breaker is')) {
        const errorResponse = ErrorHandler.createErrorResponse(
          'Service temporarily unavailable',
          'SERVICE_UNAVAILABLE',
          503
        );
        return res.status(503).json(errorResponse);
      }
      
      // エラータイプに応じた適切なレスポンス
      if (error.message.includes('not initialized')) {
        const errorResponse = ErrorHandler.createErrorResponse(
          'OPRF service not ready',
          'SERVICE_NOT_READY',
          503
        );
        return res.status(503).json(errorResponse);
      } else if (error.message.includes('Invalid input')) {
        const errorResponse = ErrorHandler.createErrorResponse(
          'Invalid input data',
          'INVALID_INPUT',
          400
        );
        return res.status(400).json(errorResponse);
      } else {
        const errorResponse = ErrorHandler.createErrorResponse(
          'OPRF processing failed',
          'OPRF_ERROR',
          500
        );
        return res.status(500).json(errorResponse);
      }
    }

    // 結果を返す
    try {
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('X-Request-ID', requestId);
      res.status(200).send(Buffer.from(result));
    } catch (error) {
      ErrorHandler.logError(error, 'Response sending');
      const errorResponse = ErrorHandler.createErrorResponse(
        'Failed to send response',
        'RESPONSE_ERROR',
        500
      );
      return res.status(500).json(errorResponse);
    }

  } catch (error) {
    // 予期しないエラーの処理
    ErrorHandler.logError(error, 'Unexpected error in OPRF handler');
    const errorResponse = ErrorHandler.createErrorResponse(
      'Internal server error',
      'INTERNAL_ERROR',
      500
    );
    return res.status(500).json(errorResponse);
  }
}

// 設定
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}
