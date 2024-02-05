import { Add, ArrowDownward, ArrowUpward, Remove } from "@mui/icons-material";
import { useState } from "react";

export default function ModuleAccordian({ name, editable, chapters, detailsStyle,removeModule,id }) {
    const [courseChapters, setCourseChapters] = useState(chapters);
    const [isModuleOpened, setIsModuleOpened] = useState(false);

    const titleStyles = {
        outline: 'none',
        border: 'none',
        width: '100%',
        boxSizing: 'border-box',
        padding: '5px 0px',
        height: '50px',
        fontSize: 'x-large'
    };

    const ChapterCard = ({ name, id }) => {
        return (
            <div style={{
                boxShadow: '0px 0px 4px 1px grey',
                width: '100%',
                padding: '5px',
                margin: '10px 0px',
                display: 'flex'
            }}>
                <input type="text" defaultValue={name} style={{ ...titleStyles, fontSize: 'large' }} onChange={
                    (e) => setCourseChapters(pre => {
                        const copiedArray = [...pre];
                        copiedArray[id] = e.target.value;
                        return copiedArray;
                    })
                } />
                <button onClick={() => removeChapter(id)}><Remove /></button>
            </div>
        )
    };

    const addChapter = () => {
        setCourseChapters((pre) => [...pre, "new Chapter"])
    };

    const removeChapter = (id) => {
        setCourseChapters((pre) => {
            return [...pre.slice(0, id), ...pre.slice(id + 1)]
        });
    };

    return (
        <div style={{
            // border:'1px solid',
            boxShadow: '0px 0px 2px 1px grey',
            padding: '10px'
        }}>
            <div style={{
                display: 'flex'
            }}>
                {editable ? <input type="text" style={titleStyles} defaultValue={name} /> : <div style={titleStyles}>{name}</div>}
                <button onClick={() => setIsModuleOpened(!isModuleOpened)}>{isModuleOpened ? <ArrowDownward /> : <ArrowUpward />}</button>
                &nbsp;<button onClick={() => removeModule(id)}><Remove/></button>
            </div>
            {isModuleOpened && <>
                <div style={{
                    cursor: 'pointer',
                    boxShadow: '0px 0px 2px 1px grey',
                    margin: '10px 0px',
                    width: 'max-content'
                }} onClick={addChapter}><Add /></div>
                <div style={{
                    padding: '5px 15px'
                }}>
                    {courseChapters.map((chapter, i) => <ChapterCard key={i} id={i} name={chapter} />)}
                </div>
            </>}
        </div>
    )
}