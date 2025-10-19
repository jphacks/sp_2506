// src/components/ResultDisplay.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, CheckCircle, XCircle, Eye, EyeOff, Sparkles } from 'lucide-react';
import { type DisplayResultItem } from './ApiFormContainer'; // 🔑 新しい型をインポート
import { useState } from 'react';

type ResultDisplayProps = {
    // 🔑 型を変更: string[] から DisplayResultItem[] へ
    apiResult: DisplayResultItem[] | null;
    isError: boolean;
    onReset: () => void;
};

function ResultDisplay({ apiResult, isError, onReset}: ResultDisplayProps) {
    const [longPressPressindex, setLongPressIndex] = useState<number | null>(null);
    
    if (!apiResult) {
        // 結果がない場合は何も表示しない（通常、ApiFormContainerで制御される）
        return null;
    }


    // クリックハンドラー（長押しの代わりにクリックで切り替え）
    const handleClick = (index: number) => {
        setLongPressIndex(longPressPressindex === index ? null : index);
    };

    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* ヘッダー */}
            <div className="text-center mb-6 sm:mb-8">
                <motion.div
                    className="flex items-center justify-center mb-4 sm:mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.1 }}
                >
                    <div className="relative">
                        <motion.div
                            animate={{ 
                                scale: [1, 1.1, 1],
                                rotate: isError ? [0, -5, 5, 0] : [0, 5, -5, 0]
                            }}
                            transition={{ 
                                duration: 2, 
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            {isError ? (
                                <XCircle className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />
                            ) : (
                                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" />
                            )}
                        </motion.div>
                        <motion.div
                            animate={{ 
                                scale: [1, 1.3, 1],
                                rotate: [0, 180, 360]
                            }}
                            transition={{ 
                                duration: 1.5, 
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Sparkles className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 text-accent-400" />
                        </motion.div>
                    </div>
                </motion.div>
                
                <motion.h2
                    className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 ${
                        isError ? 'text-red-400' : 'text-green-400'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                >
                    {isError ? '処理エラー' : '処理完了'}
                </motion.h2>
                
                <motion.p
                    className="text-sm sm:text-base text-secondary-300 px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    {isError ? 'エラーが発生しました' : 'データが安全に処理されました'}
                </motion.p>
            </div>

            {/* 結果表示 */}
            <motion.div
                className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border ${
                    isError 
                        ? 'bg-red-500/10 border-red-500/20' 
                        : 'bg-green-500/10 border-green-500/20'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                whileHover={{ scale: 1.01 }}
            >
                <motion.h3 
                    className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0, duration: 0.6 }}
                >
                    <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                    処理結果
                </motion.h3>

                <div className="space-y-2 sm:space-y-3">
                    <AnimatePresence>
                        {apiResult.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: index * 0.1, duration: 0.3 }}
                                className="group cursor-pointer"
                                onClick={() => handleClick(index)}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="p-3 sm:p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg sm:rounded-xl transition-all duration-300 hover:shadow-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs sm:text-sm text-secondary-400">
                                            項目 {index + 1}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <motion.div
                                                animate={{ 
                                                    scale: [1, 1.2, 1],
                                                    rotate: [0, 10, -10, 0]
                                                }}
                                                transition={{ 
                                                    duration: 1.5, 
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                {index === longPressPressindex ? (
                                                    <EyeOff className="w-3 h-3 sm:w-4 sm:h-4 text-accent-400" />
                                                ) : (
                                                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-primary-400" />
                                                )}
                                            </motion.div>
                                        </div>
                                    </div>
                                    
                                    <motion.div
                                        className="text-white font-mono text-sm sm:text-base lg:text-lg break-all"
                                        layout
                                        transition={{ duration: 0.3 }}
                                    >
                                        {index === longPressPressindex ? item.originalText : item.apiOutput}
                                    </motion.div>
                                    
                                    {index === longPressPressindex && (
                                        <motion.div
                                            className="mt-2 text-xs text-accent-400"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            元のテキストを表示中
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* リセットボタン */}
            <motion.button
                onClick={onReset}
                className="w-full flex items-center justify-center gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25 text-sm sm:text-base"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
            >
                <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                >
                    <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
                もう一度入力する
            </motion.button>
        </motion.div>
    );
}

export default ResultDisplay;