import { Add, Delete, Done, Edit, ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import "../styles/ModuleAccordion.css";

const titleStyles = {
    outline: 'none',
    border: 'none',
    width: '100%',
    boxSizing: 'border-box',
    padding: '5px 0px',
    height: '50px',
    fontSize: 'large'
};

const ChapterCard = ({ id, setCourseChapters, courseChapters, removeChapter }) => {
    const [chapter, setChapter] = useState(courseChapters[id]);
    
    return (
        <div style={{
            boxShadow: '0px 0px 4px 1px grey',
            width: '100%',
            padding: '5px',
            margin: '10px 0px',
            display: 'flex'
        }}>
            <input type="text" style={{ ...titleStyles, fontSize: 'large', cursor: chapter.editable ? 'auto' : 'pointer' }} onChange={
                (e) => setChapter({
                    chapter: e.target.value,
                    editable: true
                })
            }
                value={chapter.chapter}
                readOnly={!chapter.editable}
            />
            <button onClick={() => removeChapter(id)}><Delete /></button>
            <button onClick={
                () => {
                    setCourseChapters(pre => {
                        const copiedArray = [...pre];
                        copiedArray[id] = { ...chapter, editable: !chapter.editable };
                        return copiedArray;
                    });
                    setChapter(chapter => ({ ...chapter, editable: !chapter.editable }));
                }
            }>{chapter.editable ? <Done /> : <Edit />}</button>
        </div>
    )
};

export default function ModuleAccordion({ name, editable, chapters, removeModule, id, updateModule ,warn}) {
    const [courseChapters, setCourseChapters] = useState(chapters);
    const [isModuleOpened, setIsModuleOpened] = useState(false);
    const [isEditable, setIsEditable] = useState(editable);
    const [title, setTitle] = useState(name);

    const addChapter = () => {
        setCourseChapters((pre) => [...pre, { chapter: "new Chapter", editable: false ,isRemoved : false}])
    };

    const removeChapter = (id) => {
        setCourseChapters((pre) => {
            if(pre[id].id === undefined){
                return [...pre.slice(0,id),...pre.slice(id+1)];
            }
            const copiedArray = [...pre];
            copiedArray[id]['isRemoved'] = true;
            return copiedArray;
        });
    };

    return (
        <div style={{
            padding: '10px',
            cursor: isEditable ? 'auto' : 'pointer'
        }}

        className={`module-accordion ${warn?'uncomplete-warn':''}`}
        >
            <div style={{
                display: 'flex'
            }}
            >
                <input type="text" style={{ ...titleStyles, cursor: isEditable ? 'auto' : 'pointer' }} defaultValue={title}
                    readOnly={!isEditable}
                    onChange={
                        (e) => setTitle(e.target.value)
                    } />
                <button onClick={() => setIsModuleOpened(!isModuleOpened)}>{isModuleOpened ? <ExpandLess/> : <ExpandMore/>}</button>
                &nbsp;<button onClick={() => removeModule(id)}><Delete /></button>
                &nbsp;
                <button onClick={
                    () => setIsEditable(!isEditable)
                }>{!isEditable ? <Edit /> : <Done />}</button>
            </div>
            {isModuleOpened && <>
                <button onClick={
                    () => {
                        updateModule(id,{
                            name:title,
                            chapters:courseChapters
                        })
                    }
                }>Save</button>
                <div style={{
                    cursor: 'pointer',
                    boxShadow: '0px 0px 2px 1px grey',
                    margin: '10px 0px',
                    width: 'max-content'
                }} onClick={addChapter}><Add />
                </div>
                <div style={{
                    padding: '5px 15px'
                }}>
                    {courseChapters.map((chapter, i) => chapter.isRemoved ? '' : <ChapterCard key={chapter.id ?? chapter.chapter+Date.now()} id={i}
                        setCourseChapters={setCourseChapters}
                        courseChapters={courseChapters}
                        removeChapter={removeChapter}
                    />)}
                </div>
            </>}
        </div>
    )
}