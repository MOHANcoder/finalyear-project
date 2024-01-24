import { IconButton, InputBase, Pagination, Paper, Stack, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import { useState } from 'react';

export default function Dictionary() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [nodef, setNoDef] = useState(false);

    const search = async (event) => {
        const form = event.target;
        event.preventDefault();
        let word = form.word.value;
        try {
            const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (!res.ok) {
                throw new Error("Definition not found!");
            }
            const data = await res.json();
            setData(data);
            setNoDef(false);
        } catch (error) {
            setData([]);
            setNoDef(true);
        }
    };

    const handlePagination = (event, page) => {
        setCurrentPage(page);
    }

    const Tile = ({ word }) => {
        let phonetic = "";
        let audioSource = "";
        let text = word.word;
        let audioObject;
        let sourceUrls = word.sourceUrls;
        if (word.phonetic !== undefined) {
            phonetic = word.phonetic;
        }
        if (word.phonetics !== undefined) {
            word["phonetics"].sort((v) => v.hasOwnProperty('text') + v.hasOwnProperty('audio'));
            for (let p of word["phonetics"]) {
                if (phonetic != "" && audioSource != "") {
                    break;
                }

                if (phonetic === "" && p.text !== undefined) {
                    phonetic = p.text;
                }

                if (audioSource === "" && p.audio !== undefined) {
                    audioSource = p.audio;
                }
            }
        }

        if (audioSource != "") {
            audioObject = new Audio(audioSource);
        }

        return (
            <Stack key={Date.now()} direction="column" spacing="1rem" sx={{ mt: '5vh' }}>
                <Typography variant="h4">{text}</Typography>
                <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography
                        variant="h6"
                        component="i"
                        sx={{ letterSpacing: '0.2rem ' }}
                    >{phonetic}
                    </Typography>
                    {audioSource && <IconButton sx={{ boxShadow: '0px 0px 5px grey' }} onClick={() => {
                        audioObject.play();
                    }}>
                        <GraphicEqIcon />
                    </IconButton>}
                </Stack>
                {word["meanings"].map(({ partOfSpeech, definitions, synonyms, antonyms }) => <>
                    <Typography variant="h5" key={partOfSpeech}>{partOfSpeech}</Typography>
                    <ul key={definitions}>{definitions.map(({ definition, example }) =>
                        <li key={definition}>
                            <dt>
                                {definition}
                            </dt>
                            {example !== undefined && <dd><Typography component="i" >Example :</Typography>
                                {example}
                            </dd>}
                        </li>
                    )}</ul>
                    {synonyms.length > 0 && <Typography component="i" sx={{ fontWeight: 'bolder' }}>Synonyms : <Typography component="i">{synonyms.join(',')}</Typography> </Typography>}
                    {antonyms.length > 0 && <Typography component="i" sx={{ fontWeight: 'bolder' }}>Antonyms : <Typography component="i">{antonyms.join(',')}</Typography> </Typography>}
                </>)}
                {sourceUrls !== undefined && sourceUrls.length > 0 && <Typography component="a" href={sourceUrls[0]} target="blank">Source : <Typography component="cite">{sourceUrls[0]}</Typography></Typography>}
            </Stack>
        )
    }

    return (
        <>
            <Typography variant="h2">Dictionary</Typography>
            <Paper
                component="form"
                sx={{ p: '5px 15px', display: 'flex', alignItems: 'center', width: '50vw' }}
                onSubmit={search}
            >
                <InputBase
                    sx={{ flex: 1 }}
                    placeholder="Search words"
                    inputProps={{ 'aria-label': 'search words' }}
                    name="word"
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
            {nodef ? <Typography variant="h5" sx={{mt:'2rem'}}>No Definitions Found!</Typography> : <>
                {data.length !== 0 && <Tile word={data[currentPage - 1]} />}
                {data.length > 1 && <Stack direction="row" sx={{ justifyContent: 'center', p: '2rem 0' }}><Pagination count={data.length} onChange={handlePagination} /></Stack>}
            </>}
        </>
    )
}