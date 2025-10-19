import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorLogger, ErrorMonitor } from '../lib/error-logger';
import { circuitBreakerManager } from '../lib/circuit-breaker';

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

    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // 監視データの収集
    const monitoringData = await collectMonitoringData();
    
    res.status(200).json({
      timestamp: new Date().toISOString(),
      requestId,
      ...monitoringData
    });

  } catch (error) {
    ErrorLogger.log(error, 'Monitor handler', 'error');
    res.status(500).json({
      status: 'error',
      message: 'Monitoring data collection failed',
      requestId
    });
  }
}

async function collectMonitoringData(): Promise<{
  system: any;
  errors: any;
  circuitBreakers: any;
  performance: any;
  alerts: string[];
}> {
  // システム情報
  const system = {
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch
  };

  // エラー統計
  const errorStats = ErrorLogger.getErrorStats();
  const recentErrors = ErrorLogger.getLogs('error', 50);
  
  const errors = {
    stats: errorStats,
    recent: recentErrors.slice(-10),
    rate: ErrorMonitor.checkErrorRate()
  };

  // サーキットブレーカー状態
  const circuitBreakers = circuitBreakerManager.getAllStats();

  // パフォーマンス指標
  const performance = {
    memoryUsage: Math.round((system.memory.heapUsed / system.memory.heapTotal) * 100),
    uptime: Math.round(system.uptime),
    errorRate: errorStats.total > 0 ? (errorStats.byLevel.error || 0) / errorStats.total : 0
  };

  // アラート
  const alerts = ErrorMonitor.getAlerts();

  return {
    system,
    errors,
    circuitBreakers,
    performance,
    alerts
  };
}
