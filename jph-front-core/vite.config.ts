import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // ビルド最適化設定
    target: 'esnext',
    minify: 'esbuild', // terserより高速
    sourcemap: false, // 本番では不要
    rollupOptions: {
      output: {
        manualChunks: {
          // 大きなライブラリを分離
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
          voprf: ['@cloudflare/voprf-ts']
        }
      }
    },
    // チャンクサイズの警告を無効化
    chunkSizeWarningLimit: 1000
  },
  // 開発サーバー最適化
  server: {
    hmr: true
  },
  // 依存関係の最適化
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@mui/material',
      '@mui/icons-material',
      '@cloudflare/voprf-ts'
    ]
  }
})
