import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import useFetch from "../src/hooks/useFetch";
import AccordionItem from "./AccordionItem";
import '../styles/CourseView.css';

export default function CourseView() {
    const { id } = useParams();
    const [state, setState] = useState({});
    const [module, setModule] = useState(-1);
    const [chapter, setChapter] = useState(-1);
    const [page, setpage] = useState(-1);
    const [isSideBarClosed,setIsSideBarClosed] = useState(false);

    const fetchCourseDetails = async () => {
        const courseDetails = await useFetch(`/explore/${id}`);
        setState(courseDetails.data);
    };

    useEffect(() => {
        fetchCourseDetails();
    },[]);

    return (
        <section className="course-view">
            <div className={`course-view-sidebar`}
                style={{
                    width:isSideBarClosed ? '0dvh' :'35dvh',
                    zIndex:isSideBarClosed ? -1 : 0
                }}
            >
                {Object.keys(state).length !== 0 && state.modules.map((module, i) =>
                    <AccordionItem
                        title={module.name}
                        key={module._id}
                        content={
                            module.chapters.map((chapter, j) =>
                                <AccordionItem
                                    title={chapter.name}
                                    key={chapter._id}
                                    content={
                                        chapter.pages.map((page, k) =>
                                            <AccordionItem
                                                title={page.title}
                                                key={page._id}
                                                isAlwaysEmpty={true}
                                                onClickHandler={
                                                    () => {
                                                        setModule(i);
                                                        setChapter(j);
                                                        setpage(k);
                                                    }
                                                }
                                            />
                                        )
                                    }
                                />
                            )
                        }
                    />
                )}
            </div>
            <div className="sidebar-divider">
                <div className="sidebar-close" onClick={() => setIsSideBarClosed(!isSideBarClosed)}>
                    {isSideBarClosed ? "OPEN" : "CLOSE"}
                </div>
            </div>
            <div className="course-view-content">
                {module !== -1 && (
                    <>
                        <div className="page-viewer">
                            <div className="page-viewer-title">
                                {state.modules[module].chapters[chapter].pages[page].title}
                            </div>
                            <div className="page-viewer-content" dangerouslySetInnerHTML={{ __html: state.modules[module].chapters[chapter].pages[page].content }} />
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}