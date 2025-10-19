// src/components/ApiFormContainer.tsx
import { useState, useCallback, useEffect, useRef } from 'react';
import { Oprf, OPRFClient, Evaluation } from '@cloudflare/voprf-ts';
import { type SubmitHandler } from 'react-hook-form';
import anime from 'animejs';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Zap, Sparkles } from 'lucide-react';

// 外部コンポーネントをインポート
import InputForm from './InputForm';
import ResultDisplay from './ResultDisplay';
import { bytesToEmoji } from '../lib/emojiMap256';

// フォームデータの型定義をここで定義し、InputFormと共有します
export type FormInput = {
    text: string;
};

export type FormData = {
    inputs: FormInput[];
};

// 新しい型の定義
export type DisplayResultItem = {
    originalText: string;
    apiOutput: string;
};

type TitleStruct = {
    type: string;
    title: string;
};

const fetchUniqueId = async (title: string): Promise<string> => {
    const normalizedTitle = title.trim().toLowerCase();

    const respJson = await (await fetch(`https://api.jikan.moe/v4/anime?q=${normalizedTitle}&limit=1`)).json();
    const id = respJson.data[0].mal_id;
    console.log(respJson.data[0].titles.filter((t: TitleStruct)=>t.type=="Japanese" || t.type=="Default").pop())
    
    if (normalizedTitle.includes('エラー')) {
        // ID取得エラーをシミュレート
        throw new Error(`ID取得に失敗: ${title}`);
    }

    // 作品名に基づいて、一意のID（例: UUIDやデータベースID）を生成
    // 簡易的な例として、タイトルをMD5ハッシュ化したかのような文字列を返す
    return id;
};

const MAX_INPUTS = 10;

function ApiFormContainer() {
    // 画面切り替えの状態管理
    const [isResultView, setIsResultView] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // API結果とエラー状態の管理
    const [isError, setIsError] = useState<boolean>(false);
    const [displayResults, setDisplayResults] = useState<DisplayResultItem[] | null>(null);
    
    // アニメーション用のref
    const containerRef = useRef<HTMLDivElement>(null);
    const sparkleRefs = useRef<(HTMLDivElement | null)[]>([]);


    // フォームリセットと入力画面に戻る処理
    const handleReset = useCallback(() => {
        setIsResultView(false); // 結果画面を非表示に
        // setApiResult(null);     // 結果をクリア
        setDisplayResults(null);
        setIsError(false);      // エラー状態をリセット
    }, []);

    const [userInputData, setUserInputData] = useState<FormData | null>(null);

    // アニメーション効果
    useEffect(() => {
        if (containerRef.current) {
            anime({
                targets: containerRef.current,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 800,
                easing: 'easeOutExpo'
            });
        }
    }, []);

    // スパークルアニメーション
    const createSparkleAnimation = () => {
        sparkleRefs.current.forEach((ref, index) => {
            if (ref) {
                anime({
                    targets: ref,
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360],
                    opacity: [0, 1, 0],
                    duration: 2000,
                    delay: index * 200,
                    easing: 'easeOutExpo'
                });
            }
        });
    };

    // フォーム送信時の処理（InputFormから渡される）
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const allInputs = data.inputs.map(item => item.text).filter(text => text.trim() !== '');

        if (allInputs.length === 0) {
            setIsError(true);
            setIsResultView(true);
            return;
        }
        
        setUserInputData(data);
        setIsLoading(true);
        createSparkleAnimation();

        const idPromises = allInputs.map(title => fetchUniqueId(title));
        const uniqueIds = await Promise.all(idPromises);

        const suite = Oprf.Suite.P384_SHA384;
        const client = new OPRFClient(suite);

        const batch = uniqueIds.map(text => new TextEncoder().encode(text));
        const [finData, evalReq] = await client.blind(batch);

        const apiUrl = 'http://localhost:3000/upload-binary';

        setIsError(false);
        // setApiResult(null);

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/octet-stream" },
                body: evalReq.serialize() as BodyInit, // ちょっと汚いWA
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `API呼び出しに失敗しました。ステータス: ${response.status}`);
            }

            const uint8array = new Uint8Array(await response.arrayBuffer());
            const evaluation = Evaluation.deserialize(suite, uint8array);

            const outputs = await client.finalize(finData, evaluation);

            const combinedResult = outputs.map(output => {
                // 提案されたグリフ生成ロジック
                // return [...output].map(u => String.fromCodePoint(0x2600 + u)).reduce((acc, c) => acc + c, '');
                return bytesToEmoji(output.slice(0, 8));
            });


            // 🔑 最終表示用のデータ構造を生成
            const combinedDisplayResults: DisplayResultItem[] = allInputs.map((text, index) => ({
                originalText: text,
                apiOutput: combinedResult[index],
            }));

            // 新しいステートに保存
            setDisplayResults(combinedDisplayResults);
            // setApiResult(combinedResult);

        } catch {
            // const errorMessage = error instanceof Error ? error.message : '不明なエラーが発生しました。';
            // setApiResult([`エラー: ${errorMessage}`]);
            setIsError(true);
        } finally {
            setIsLoading(false);
            // 処理完了後、結果画面に切り替え
            setIsResultView(true);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                ref={containerRef}
                className="w-full max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* ヘッダーセクション */}
                <div className="text-center mb-8">
                    <motion.div
                        className="flex items-center justify-center mb-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                        <div className="relative">
                            <Shield className="w-16 h-16 text-primary-500 animate-pulse-slow" />
                            <Sparkles 
                                ref={el => sparkleRefs.current[0] = el}
                                className="absolute -top-2 -right-2 w-6 h-6 text-accent-400"
                            />
                            <Sparkles 
                                ref={el => sparkleRefs.current[1] = el}
                                className="absolute -bottom-2 -left-2 w-4 h-4 text-accent-300"
                            />
                        </div>
                    </motion.div>
                    
                    <motion.h1 
                        className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 via-accent-500 to-primary-400 bg-clip-text text-transparent mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        OPRF セキュア処理
                    </motion.h1>
                    
                    <motion.p 
                        className="text-lg text-secondary-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        プライバシーを完全に保護しながら、データを安全に処理します
                    </motion.p>
                </div>

                {/* メインコンテンツ */}
                <motion.div
                    className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <AnimatePresence mode="wait">
                        {!isResultView || !userInputData ? (
                            <motion.div
                                key="input-form"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <InputForm
                                    onSubmit={onSubmit}
                                    maxInputs={MAX_INPUTS}
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="result-display"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <ResultDisplay
                                    apiResult={displayResults}
                                    isError={isError}
                                    onReset={handleReset}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ローディング状態 */}
                    {isLoading && (
                        <motion.div
                            className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="text-center">
                                <motion.div
                                    className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full mx-auto mb-4"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                <p className="text-lg font-semibold text-primary-700">
                                    セキュアに処理中...
                                </p>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
}

export default ApiFormContainer;