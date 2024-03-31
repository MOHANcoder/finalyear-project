import { useState } from "react";
import AccordionItem from "./AccordionItem";
import ModuleAccordionTitle from "./ModuleAccordionTitle";
import { useDispatch, useSelector } from "react-redux";
import { courseModulePageCreated, saveToCloud } from "../src/features/course/courseSlice";
import { fetchPage } from "../src/features/page/pageSlice";

export default function ChapterAccordionContent({moduleId,chapterId}) {
    const pages = useSelector(state => state.course.data.modules[moduleId].chapters[chapterId].pages);
    const dispatch = useDispatch();
    const addNewPage = () => {
        dispatch(courseModulePageCreated({title:'New Page',moduleId,chapterId}));
    }

    const selectPageToEdit = (id) => {
        dispatch(saveToCloud());
        dispatch(fetchPage({id,moduleId,chapterId}));
    };

    const PageSelectComponent = ({id}) => {
        return (
            <div onClick={() => selectPageToEdit(id)}>
                Fetch
            </div>
        )
    };

    return (
        <>
            Pages
            <div className="chapter-add-button">
                <button onClick={addNewPage}>+</button> Add a new Page
            </div>
            {Object.entries(pages).map(([id,page]) =>
                <AccordionItem
                    key={id}
                    title={
                    <ModuleAccordionTitle 
                        defaultTitle={page.title} 
                        type={{name:'page',chapterId,moduleId}}
                        id={id}
                        options={
                            [<PageSelectComponent key={id} id={id}/>]
                        }
                    />}
                    id={id}
                    isAlwaysEmpty={true}
                />
            )}
        </>
    );
}