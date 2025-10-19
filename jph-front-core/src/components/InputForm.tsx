// src/components/InputForm.tsx
import { useForm, useFieldArray, type SubmitHandler } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Send, Lock, Sparkles } from 'lucide-react';
import { type FormData } from './ApiFormContainer'; // 親から型をインポート

type InputFormProps = {
    onSubmit: SubmitHandler<FormData>; // 親から渡される送信ハンドラ
    maxInputs: number;
};

function InputForm({ onSubmit, maxInputs }: InputFormProps) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting }
    } = useForm<FormData>({
        defaultValues: {
            inputs:new Array(3).fill({ text: '' }),
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "inputs",
    });

    return (
        <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
                        <Lock className="w-8 h-8 text-primary-500" />
                        <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-accent-400 animate-pulse" />
                    </div>
                </motion.div>
                
                <h2 className="text-2xl font-bold text-white mb-2">
                    セキュアデータ入力
                </h2>
                <p className="text-secondary-300">
                    最大{maxInputs}個のテキストを安全に処理します
                </p>
            </div>

            {/* 入力フィールド */}
            <div className="space-y-4">
                <AnimatePresence>
                    {fields.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-3"
                        >
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder={`入力テキスト ${index + 1}`}
                                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                                    {...register(`inputs.${index}.text` as const, {
                                        required: "テキストは必須です",
                                    })}
                                />
                                {errors.inputs?.[index]?.text && (
                                    <motion.p
                                        className="text-red-400 text-sm mt-1"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        {errors.inputs[index]?.text?.message}
                                    </motion.p>
                                )}
                            </div>
                            
                            {fields.length > 1 && (
                                <motion.button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Trash2 className="w-5 h-5" />
                                </motion.button>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* 追加ボタン */}
            {fields.length < maxInputs && (
                <motion.button
                    type="button"
                    onClick={() => append({ text: '' })}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-all duration-300 hover:scale-105"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Plus className="w-5 h-5" />
                    入力フィールドを追加 (残り: {maxInputs - fields.length})
                </motion.button>
            )}

            {/* 送信ボタン */}
            <motion.button
                type="submit"
                disabled={isSubmitting || fields.length === 0}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 disabled:from-secondary-400 disabled:to-secondary-500 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {isSubmitting ? (
                    <>
                        <motion.div
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        セキュアに処理中...
                    </>
                ) : (
                    <>
                        <Send className="w-5 h-5" />
                        データを安全に処理
                    </>
                )}
            </motion.button>
        </motion.form>
    );
}

export default InputForm;