import { Button, Paper, Stack, Typography } from "@mui/material";
import { Textarea } from '@mui/joy';
import { useState } from "react";
import { LoadingButton } from '@mui/lab';
import { HfInference } from '@huggingface/inference';

export default function Summarizer() {
    const hf = new HfInference(import.meta.env.ML_MODEL_KEY);
    const [text, setText] = useState('');
    const [modelInvoked, setModelInvoked] = useState(false);
    const [summarizedContent, setSummarizedContent] = useState('');

    const summarizeContent = async () => {
        setModelInvoked(true);
        try {
            const { summary_text } = await hf.summarization({
                model: 'Falconsai/text_summarization',//facebook/bart-large-cnn
                inputs: text
            });
            let len = 0;
            const typingInterval = setInterval(() => {
                setSummarizedContent(summary_text.slice(0, len));
                len++;
                if (len > summary_text.length) {
                    clearInterval(typingInterval);
                    setModelInvoked(false);
                }
            }, 20);
        } catch (error) {
            setSummarizedContent("Error During Processing.");
            setModelInvoked(false);
        }
    }


    return (
        <>
            <Typography variant="h2" sx={{
                mt: 4, mb: 4, textAlign: 'center'
            }}>Text Summarizer</Typography>
            <Typography variant="h4">Summarization</Typography>
            <Typography variant="p">
                Summarization is the task of producing a shorter version of a document while
                preserving its important information. Some models can extract text from the
                original input, while other models can generate entirely new text.
            </Typography>
            <Stack
                direction="column"
                sx={{
                    mt: 2
                }}
                spacing={2}
            >
                <Textarea
                    placeholder="Put your sentences...."
                    minRows={5}
                    maxRows={10}
                    maxLength={4000}
                    value={text}
                    onChange={(e) => {
                        if (e.target.value.length <= 4000)
                            setText(e.target.value)
                    }
                    }
                    endDecorator={
                        <Typography variant="body-xs" ml='auto'>
                            {text.length}/4000
                        </Typography>
                    }
                />
                <LoadingButton
                    variant="contained"
                    color="secondary"
                    loadingPosition="end"
                    loading={modelInvoked}
                    onClick={summarizeContent}
                    disabled={modelInvoked}
                >Summarize</LoadingButton>
                <Paper elevation={0} variant="outlined" sx={{
                    p: '1.5rem',
                    textAlign: 'justify'
                }}
                >
                    {summarizedContent}
                </Paper>
            </Stack>
        </>
    );
}