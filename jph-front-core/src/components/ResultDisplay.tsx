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
            <div className="text-center">
                <motion.div
                    className="flex items-center justify-center mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                    <div className="relative">
                        {isError ? (
                            <XCircle className="w-12 h-12 text-red-500" />
                        ) : (
                            <CheckCircle className="w-12 h-12 text-green-500" />
                        )}
                        <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-accent-400 animate-pulse" />
                    </div>
                </motion.div>
                
                <motion.h2
                    className={`text-3xl font-bold mb-2 ${
                        isError ? 'text-red-400' : 'text-green-400'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    {isError ? '処理エラー' : '処理完了'}
                </motion.h2>
                
                <motion.p
                    className="text-secondary-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    {isError ? 'エラーが発生しました' : 'データが安全に処理されました'}
                </motion.p>
            </div>

            {/* 結果表示 */}
            <motion.div
                className={`p-6 rounded-2xl border ${
                    isError 
                        ? 'bg-red-500/10 border-red-500/20' 
                        : 'bg-green-500/10 border-green-500/20'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
            >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    処理結果
                </h3>

                <div className="space-y-3">
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
                            >
                                <div className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 hover:scale-105">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-secondary-400">
                                            項目 {index + 1}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            {index === longPressPressindex ? (
                                                <EyeOff className="w-4 h-4 text-accent-400" />
                                            ) : (
                                                <Eye className="w-4 h-4 text-primary-400" />
                                            )}
                                        </div>
                                    </div>
                                    
                                    <motion.div
                                        className="text-white font-mono text-lg break-all"
                                        layout
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
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
            >
                <RotateCcw className="w-5 h-5" />
                もう一度入力する
            </motion.button>
        </motion.div>
    );
}

export default ResultDisplay;