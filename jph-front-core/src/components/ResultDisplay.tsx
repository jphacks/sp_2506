// src/components/ResultDisplay.tsx
import { Box, Typography, Button } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
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
        <Box>
            <Typography variant="h5" component="h2" gutterBottom color={isError ? 'error.main' : 'primary.main'}>
                **{isError ? '処理エラー' : '処理完了'}** 🎉
            </Typography>

            <Box
                sx={{
                    mt: 2,
                    p: 2,
                    bgcolor: isError ? 'error.light' : 'success.light',
                    borderRadius: 1,
                    overflowX: 'auto'
                }}
            >
                <Typography variant="h6" gutterBottom color={isError ? 'error.contrastText' : 'text.primary'}>
                    **API応答:**
                </Typography>

                {/* apiResultのリスト表示 */}
                <Box component="ul" sx={{ listStyle: 'none', paddingLeft: 0 }}>
                    {/* apiResultの型が DisplayResultItem[] に変わる */}
                    {apiResult.map((item, index) => {
                        return (
                            <Typography
                                component="li"
                                key={index}
                                variant="body1"
                                onClick={() => handleClick(index)}
                                sx={{
                                    cursor: 'pointer',
                                    padding: 1,
                                    border: '1px solid #e0e0e0',
                                    borderRadius: 1,
                                    marginBottom: 1,
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5'
                                    }
                                }}
                            >
                                {/* 🔑 表示するテキストを apiOutput に変更 */}
                                {index === longPressPressindex ? item.originalText : item.apiOutput}
                            </Typography>
                        );
                    })}
                </Box>
            </Box>

            {/* リセットボタン */}
            <Button
                startIcon={<ReplayIcon />}
                onClick={onReset} // 親から渡されたリセット関数を実行
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
            >
                もう一度入力する
            </Button>
        </Box>
    );
}

export default ResultDisplay;