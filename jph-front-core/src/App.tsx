import { motion } from 'framer-motion';
import { Github, ExternalLink, Database, Cloud } from 'lucide-react';
import ApiFormContainer from './components/ApiFormContainer';
import SecretSyncIcon from './components/SecretSyncIcon';
import { useMobileDetection } from './hooks/useMobileDetection';
import { useGSAPAnimations } from './hooks/useGSAPAnimations';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function App() {
  const isMobile = useMobileDetection();
  const gsapAnimations = useGSAPAnimations();
  const containerRef = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (containerRef.current) {
      // コンテナのフェードインアニメーション
      gsapAnimations.fadeIn(containerRef.current, 0);
    }
  }, [gsapAnimations]);

  useEffect(() => {
    // パーティクルアニメーションを設定（軽量版）
    particleRefs.current.forEach((ref, index) => {
      if (ref) {
        if (isMobile) {
          // モバイルでは最小限のアニメーション
          gsap.to(ref, {
            y: -30,
            opacity: 0.4,
            scale: 0.6,
            duration: 10,
            repeat: -1,
            ease: "power1.out",
            delay: index * 1
          });
        } else {
          // デスクトップでも軽量化
          gsap.to(ref, {
            y: -40,
            opacity: 0.4,
            duration: 6,
            repeat: -1,
            ease: "power1.out",
            delay: index * 10
          });
        }
      }
    });
  }, [isMobile]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-secondary-900 to-accent-900 relative overflow-hidden">
      {/* 動的背景装飾 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* メインの動くオーブ */}
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"
          animate={{
            rotate: [0, 180],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* パーティクル効果 */}
        {[...Array(isMobile ? 2 : 4)].map((_, i) => (
          <div
            key={i}
            ref={el => particleRefs.current[i] = el}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* メインコンテンツ */}
      <div ref={containerRef} className="relative z-10">
        <ApiFormContainer />
      </div>

      {/* フッター */}
      <motion.footer
        className="relative z-10 py-6 sm:py-8 px-4 sm:px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            {/* 左側: プロジェクト情報 */}
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 10 }}
                >
                  <SecretSyncIcon size={24} className="text-primary-400" />
                </motion.div>
                <span className="text-white font-semibold text-lg">Secret Sync</span>
              </div>
              <div className="flex items-center gap-1 text-secondary-400">
                <span className="text-sm">Secure Sync</span>
              </div>
            </motion.div>

            {/* 中央: 技術スタック */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-secondary-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.6 }}
            >
              <motion.div
                className="flex items-center gap-1 px-3 py-1 bg-white/5 rounded-full border border-white/10"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  animate={{ rotate: [0, 180] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Database className="w-4 h-4 text-accent-400" />
                </motion.div>
                <span className="text-sm font-medium">OPRF Protocol</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-1 px-3 py-1 bg-white/5 rounded-full border border-white/10"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Cloud className="w-4 h-4 text-primary-400" />
                </motion.div>
                <span className="text-sm font-medium">Secure Sync</span>
              </motion.div>
            </motion.div>

            {/* 右側: リンク */}
            <motion.div
              className="flex items-center gap-3 sm:gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.2, duration: 0.6 }}
            >
              <motion.a
                href="https://github.com/jphacks/sp_2506"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-secondary-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 hover:border-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Github className="w-5 h-5" />
                </motion.div>
                <span className="text-sm font-medium">GitHub</span>
              </motion.a>
              
              <motion.a
                href="https://jphacks.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-secondary-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 hover:border-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  whileHover={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <ExternalLink className="w-5 h-5" />
                </motion.div>
                <span className="text-sm font-medium">JPHacks</span>
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
            © 2025 JPHacks - Secret Sync: Secure Data Synchronization System
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App
