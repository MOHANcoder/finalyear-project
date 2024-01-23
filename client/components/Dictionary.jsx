import { IconButton, InputBase, Paper, Stack, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useState} from 'react';

export default function Dictionary() {
    const [word,setWord] = useState('');
    const [data,setData] = useState({});

    const search = async () => {
        try{
            const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const data = await res.json();
            setData(data);
        }catch(error){
            setData({error:error.message});
        }
    };

    return (
        <>
            <Typography variant="h2">Dictionary</Typography>
            <Paper
                component="form"
                sx={{ p: '5px 15px', display: 'flex', alignItems: 'center', width: '50vw' }}
            >
                <InputBase
                    sx={{ flex: 1 }}
                    placeholder="Search words"
                    inputProps={{ 'aria-label': 'search words' }}
                    onInput={(e) => {
                        setWord(e.target.value);
                    }}
                    value={word}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={search}>
                    <SearchIcon />
                </IconButton>
            </Paper>
            <Stack direction="column" spacing="1rem" sx={{mt:'5vh'}}>
                <Typography variant="h4">{word}</Typography>
                <Typography>{JSON.stringify(data)}</Typography>
            </Stack>
        </>
    )
}