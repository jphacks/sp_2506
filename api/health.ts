import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorLogger, ErrorRecovery, ErrorMonitor } from '../lib/error-logger';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestId = Math.random().toString(36).substring(7);
  
  try {
    // CORS設定
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('X-Request-ID', requestId);

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // ヘルスチェックの実行
    const healthStatus = await performHealthCheck();
    
    res.status(200).json({
      status: healthStatus.overall ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      requestId,
      checks: healthStatus.checks,
      errorStats: ErrorLogger.getErrorStats(),
      retryStats: ErrorRecovery.getRetryStats(),
      alerts: ErrorMonitor.getAlerts()
    });

  } catch (error) {
    ErrorLogger.log(error, 'Health check handler', 'error');
    res.status(500).json({
      status: 'error',
      message: 'Health check failed',
      requestId
    });
  }
}

async function performHealthCheck(): Promise<{
  overall: boolean;
  checks: Record<string, any>;
}> {
  const checks: Record<string, any> = {};
  let overall = true;

  // 1. システムリソースチェック
  try {
    const memoryUsage = process.memoryUsage();
    checks.memory = {
      status: 'ok',
      used: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
      total: Math.round(memoryUsage.heapTotal / 1024 / 1024), // MB
      usage: Math.round((memoryUsage.heapUsed / memoryUsage.heapTotal) * 100) // %
    };
    
    if (checks.memory.usage > 90) {
      checks.memory.status = 'warning';
      overall = false;
    }
  } catch (error) {
    ErrorLogger.log(error, 'Memory check', 'error');
    checks.memory = { status: 'error', message: 'Failed to check memory' };
    overall = false;
  }

  // 2. 環境変数チェック
  try {
    const requiredEnvVars = [
      'NODE_ENV',
      'OPRF_PRIVATE_KEY'
    ];
    
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    checks.environment = {
      status: missingVars.length === 0 ? 'ok' : 'error',
      missing: missingVars,
      nodeEnv: process.env.NODE_ENV
    };
    
    if (missingVars.length > 0) {
      overall = false;
    }
  } catch (error) {
    ErrorLogger.log(error, 'Environment check', 'error');
    checks.environment = { status: 'error', message: 'Failed to check environment' };
    overall = false;
  }

  // 3. エラー率チェック
  try {
    const errorRate = ErrorMonitor.checkErrorRate();
    checks.errorRate = {
      status: errorRate ? 'warning' : 'ok',
      highErrorRate: errorRate
    };
    
    if (errorRate) {
      overall = false;
    }
  } catch (error) {
    ErrorLogger.log(error, 'Error rate check', 'error');
    checks.errorRate = { status: 'error', message: 'Failed to check error rate' };
    overall = false;
  }

  // 4. 外部サービスチェック（Supabase）
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    checks.supabase = {
      status: (supabaseUrl && supabaseKey) ? 'ok' : 'warning',
      configured: !!(supabaseUrl && supabaseKey),
      url: supabaseUrl ? 'configured' : 'missing'
    };
  } catch (error) {
    ErrorLogger.log(error, 'Supabase check', 'error');
    checks.supabase = { status: 'error', message: 'Failed to check Supabase' };
  }

  // 5. OPRFサービスチェック
  try {
    const oprfKey = process.env.OPRF_PRIVATE_KEY;
    checks.oprf = {
      status: oprfKey ? 'ok' : 'warning',
      configured: !!oprfKey,
      keyLength: oprfKey ? oprfKey.length : 0
    };
  } catch (error) {
    ErrorLogger.log(error, 'OPRF check', 'error');
    checks.oprf = { status: 'error', message: 'Failed to check OPRF' };
  }

  return { overall, checks };
}
