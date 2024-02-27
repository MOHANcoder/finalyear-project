import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Add, ArrowDownward, ArrowUpward, Delete, Done, Edit, ExpandLess, ExpandMore, Save, ViewDay } from "@mui/icons-material";
import '../styles/CourseEditorSideBar.css';

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
    const [isOpened, setIsOpened] = useState(false);
    const [pages, setPages] = useState([]);

    const savePages = async () =>{
        try{
            const response = await fetch('http://localhost:1000/mycourses/edit/pages/',{
                method:'POST',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({title:'new Page'+pages.length})
            });
            const {success,page} = await response.json();
            if(success){
                setPages(pre => [...pre,{...page,content:''}]);
            }
        }catch(error){
            alert('error occurred');
            window.location.reload();
        }
    };

    const addPage = async () => {
        setPages(pre => [...pre,{title:'new Page'+pre.length}]);
    };

    return (
        <div className="chapter-container"
            style={{
                border: '1px solid',
                width: '100%',
                padding: '0px 10px 10px 10px',
                boxSizing:'border-box'
            }}
        >
            <div style={{
                width: '100%',
                padding: '5px',
                boxSizing: 'border-box',
                margin: '5px 0px',
                display: 'flex',
                border: '1px solid',
                flexDirection:'column'
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
                <div style={{
                    display:'flex',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}
                    className="chapter-options-container"
                >
                    <div onClick={() => removeChapter(id)}><Delete /></div>
                    <div onClick={
                        () => {
                            setCourseChapters(pre => {
                                const copiedArray = [...pre];
                                copiedArray[id] = { ...chapter, editable: !chapter.editable };
                                return copiedArray;
                            });
                            setChapter(chapter => ({ ...chapter, editable: !chapter.editable }));
                        }
                    }>{chapter.editable ? <Done /> : <Edit />}</div>
                    <div onClick={() => addPage()}><Add /></div>
                    <div><Save/></div>
                    <div onClick={() => setIsOpened(!isOpened)}>{isOpened ? <ExpandLess /> : <ExpandMore />}</div>
                </div>
            </div>
            {
                isOpened && (
                    <div className="page-list">
                        {pages.map((page,i) => (
                            <div key={page._id ?? i} className="page-list-item"><div className="page-title">
                                <input type="text" value={page.title} />
                            </div>
                            <div className="page-list-item-options">
                            <div><Delete/></div>
                            <div><Edit/></div>
                            </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
};

function ModuleAccordion({ name, editable, chapters, removeModule, id, updateModule, warn }) {
    const [courseChapters, setCourseChapters] = useState(chapters);
    const [isModuleOpened, setIsModuleOpened] = useState(false);
    const [isEditable, setIsEditable] = useState(editable);
    const [title, setTitle] = useState(name);

    const addChapter = () => {
        setCourseChapters((pre) => [...pre, { chapter: "new Chapter", editable: false, isRemoved: false }])
    };

    const removeChapter = (id) => {
        setCourseChapters((pre) => {
            if (pre[id].id === undefined) {
                return [...pre.slice(0, id), ...pre.slice(id + 1)];
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

            className={`module-accordion ${warn ? 'uncomplete-warn' : ''}`}
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
                <button onClick={() => setIsModuleOpened(!isModuleOpened)}>{isModuleOpened ? <ExpandLess /> : <ExpandMore />}</button>
                &nbsp;<button onClick={() => removeModule(id)}><Delete /></button>
                &nbsp;
                <button onClick={
                    () => setIsEditable(!isEditable)
                }>{!isEditable ? <Edit /> : <Done />}</button>
            </div>
            {isModuleOpened && <>
                <button onClick={
                    () => {
                        updateModule(id, {
                            name: title,
                            chapters: courseChapters
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
                    {courseChapters.map((chapter, i) => chapter.isRemoved ? '' : <ChapterCard key={chapter.id ?? chapter.chapter + Date.now()} id={i}
                        setCourseChapters={setCourseChapters}
                        courseChapters={courseChapters}
                        removeChapter={removeChapter}
                    />)}
                </div>
            </>}
        </div>
    )
}

export default function CourseEditorSideBar() {

    const { id } = useParams();
    const [modules, setModules] = useState([]);

    const addModule = () => {
        setModules((pre) => [...pre, { name: "new Module" + pre.length, chapters: [], isRemoved: false }]);
    };

    const removeModule = (id) => {
        setModules((pre) => {
            if (pre[id].id === undefined) {
                return [...pre.slice(0, id), ...pre.slice(id + 1)];
            }
            const copiedArray = [...pre];
            copiedArray[id]['isRemoved'] = true;
            return copiedArray;
        });
    };

    const updateModule = (id, module) => {
        setModules((pre) => {
            const copiedArray = [...pre];
            copiedArray[id].name = module.name;
            copiedArray[id].chapters = module.chapters;
            return copiedArray;
        });
    };

    const fetchCourseBuildDetails = async () => {
        try {
            const response = await fetch(`http://localhost:1000/mycourses/build/${id}`, {
                credentials: 'include'
            });
            const { success, data } = await response.json();
            if (success) {
                if (data.modules.length !== 0) {
                    setModules(data.modules.map(module => ({
                        name: module.name,
                        id: module._id,
                        chapters: module.chapters.map(chapter => ({
                            chapter: chapter.name,
                            editable: false,
                            id: chapter._id,
                            isRemoved: false
                        })),
                        isRemoved: false
                    })));
                }
            } else {
                throw new Error('Course Not found');
            }
        } catch (error) {
            alert(error.message);
            window.location.href = 'http://localhost:5173/mycourses/';
        }
    }

    useEffect(() => {
        fetchCourseBuildDetails();
    }, []);

    return (
        <div className="courseEditorSideBar" style={{
            width: '30dvw',
            minWidth:'250px',
            height:'94dvh',
            overflowY:'scroll'
        }}>
            Click + to add a new Module :
            <div style={{
                cursor: 'pointer',
                boxShadow: '0px 0px 2px 1px grey',
                margin: '10px 0px',
                width: 'max-content'
            }} onClick={addModule}><Add /></div>
            {modules.map((m, i) => m.isRemoved ? '' : <ModuleAccordion key={m.id ?? m.name + Date.now()} warn={false} name={m.name} editable={false} chapters={m.chapters}
                removeModule={removeModule}
                updateModule={updateModule}
                id={i}
            />)}
        </div>
    )
}