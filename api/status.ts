import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const status = {
      status: 'OK',
      runtime: 'Node.js',
      timestamp: new Date().toISOString(),
      oprf: {
        initialized: true
      },
      environment: process.env.NODE_ENV || 'development'
    };

    res.status(200).json(status);
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({
      error: 'Internal server error',
      code: 'STATUS_ERROR'
    });
  }
}
