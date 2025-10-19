import { motion } from 'framer-motion';
import { Shield, Lock, Zap, Sparkles, Github, ExternalLink } from 'lucide-react';
import ApiFormContainer from './components/ApiFormContainer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-secondary-900 to-accent-900">
      {/* 背景装飾 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10">
        <ApiFormContainer />
      </div>

      {/* フッター */}
      <motion.footer
        className="relative z-10 py-8 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* 左側: プロジェクト情報 */}
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary-400" />
                <span className="text-white font-semibold">OPRF Secure</span>
              </div>
              <div className="flex items-center gap-1 text-secondary-400">
                <Lock className="w-4 h-4" />
                <span className="text-sm">Privacy Protected</span>
              </div>
            </motion.div>

            {/* 中央: 技術スタック */}
            <motion.div
              className="flex items-center gap-4 text-secondary-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.6 }}
            >
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-accent-400" />
                <span className="text-sm">Bun + TypeScript</span>
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-primary-400" />
                <span className="text-sm">React + Vite</span>
              </div>
            </motion.div>

            {/* 右側: リンク */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.2, duration: 0.6 }}
            >
              <motion.a
                href="https://github.com/jphacks/sp_2506"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-secondary-300 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5" />
                <span className="text-sm">GitHub</span>
              </motion.a>
              
              <motion.a
                href="https://jphacks.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-secondary-300 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-5 h-5" />
                <span className="text-sm">JPHacks</span>
              </motion.a>
            </motion.div>
          </div>

          {/* セパレーター */}
          <motion.div
            className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          />

          {/* コピーライト */}
          <motion.div
            className="text-center text-secondary-400 text-sm mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.6 }}
          >
            © 2025 JPHacks - OPRF Secure Data Processing System
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App
