import ModuleAccordionTitle from "./ModuleAccordionTitle";
import ChapterAccordionContent from "./ChapterAccordionContent";
import AccordionItem from "./AccordionItem";
import { useDispatch, useSelector } from "react-redux";
import { courseModuleChapterCreated } from "../src/features/course/courseSlice";

export default function ModuleAccordionContent({moduleId}) {

    const dispatch = useDispatch();
    const chapters = useSelector(state => state.course.data.modules[moduleId].chapters);
    const addNewChapter = () => {
        dispatch(courseModuleChapterCreated({name:'New Chapter',moduleId}));
    };

    return (
        <>
            Chapters
            <div className="chapter-add-button">
                <button onClick={addNewChapter}>+</button> Add a new Chapter
            </div>
            {Object.entries(chapters).map(([id,chapter]) =>
                <AccordionItem
                    key={id}
                    title={<ModuleAccordionTitle defaultTitle={chapter.name} type={{name:'chapter',moduleId}} id={id} />}
                    content={<ChapterAccordionContent chapterId={id} moduleId={moduleId} />}
                />
            )}
        </>
    );
}