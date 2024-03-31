import { useState } from "react";
import { useDispatch } from "react-redux";
import { Add, Delete, Done, Edit, ExpandLess, ExpandMore, Save } from "@mui/icons-material";
import {  courseModuleChapterTitleUpdated, courseModulePageTitleUpdated, courseModuleUpdated, deleteChapter, deleteModule, deletePage } from "../src/features/course/courseSlice";

export default function ModuleAccordionTitle({id,defaultTitle,type,options}) {
    const [title, setTitle] = useState(defaultTitle);
    const [isEditable, setIsEditable] = useState(false);
    const dispatch = useDispatch();
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleEditOption = () => {
        setIsEditable(!isEditable)
        if(isEditable){
            if(type.name === "module"){
                dispatch(courseModuleUpdated({name:title,id}));
            }else if(type.name === "chapter"){
                dispatch(courseModuleChapterTitleUpdated({name:title,id,moduleId:type.moduleId}));
            }else if(type.name === 'page'){
                dispatch(courseModulePageTitleUpdated({title,id,moduleId:type.moduleId,chapterId:type.chapterId}));
            }
        }
    };

    const handleDeleteOption = () => {
        if(type.name === 'module'){
            dispatch(deleteModule({id}));
        }else if(type.name === 'chapter'){
            dispatch(deleteChapter({id,moduleId:type.moduleId}));
        }else if(type.name === 'page'){
            dispatch(deletePage({id,chapterId:type.chapterId,moduleId:type.moduleId}));
        }
    };

    return (
        <>
            <div className="accordion-item-title">
                <input style={{ width: '100%', padding: '5px' }} type="text" onChange={handleTitleChange} readOnly={!isEditable} placeholder='Enter here' defaultValue={title}/>
            </div>
            <div className="accordion-item-header-options">
                <div className="accordion-item-header-option" onClick={handleEditOption}>
                    {isEditable ? <Done /> : <Edit />}
                </div>
                <div className="accordion-item-header-option" onClick={handleDeleteOption}>
                    <Delete />
                </div>
                {options !== undefined && options.map((option,i) => <div className="accordion-item-header-option" key={i}>{option}</div>)}
            </div>
        </>
    );
}