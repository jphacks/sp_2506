import { NextRequest, NextResponse } from 'next/server';
import { Oprf, OPRFServer } from '@cloudflare/voprf-ts';

// OPRFサーバーの初期化（グローバル変数としてキャッシュ）
let oprfServer: OPRFServer | null = null;

async function initializeOPRF() {
  if (!oprfServer) {
    const suite = Oprf.Suite.P384_SHA384;
    oprfServer = new OPRFServer(suite);
    
    // 秘密鍵の読み込み（環境変数から）
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
      throw new Error('PRIVATE_KEY environment variable is required');
    }
    
    await oprfServer.initialize(privateKey);
  }
  return oprfServer;
}

export async function POST(request: NextRequest) {
  try {
    const server = await initializeOPRF();
    const body = await request.arrayBuffer();
    
    // OPRF処理の実行
    const evaluation = await server.evaluate(new Uint8Array(body));
    
    return new NextResponse(evaluation.serialize(), {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('OPRF processing error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'OPRF processing failed' }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
