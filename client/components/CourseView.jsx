import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import useFetch from "../src/hooks/useFetch";
import AccordionItem from "./AccordionItem";
import {useMediaQuery} from "react-responsive";
import '../styles/CourseView.css';

export default function CourseView() {
    const { id } = useParams();
    const [state, setState] = useState({});
    const [module, setModule] = useState(-1);
    const [chapter, setChapter] = useState(-1);
    const [page, setpage] = useState(-1);
    const [isSideBarClosed,setIsSideBarClosed] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const fetchCourseDetails = async () => {
        const courseDetails = await useFetch(`/explore/${id}`);
        setState(courseDetails.data);
    };

    useEffect(() => {
        fetchCourseDetails();
    },[]);

    return (
        <section className={`course-view ${isMobile ? 'course-view-mobile' : ''} ${isSideBarClosed ? 'closed' : ''}`}>
            <div className={`course-view-sidebar ${isMobile ? 'course-view-sidebar-mobile' : ''}`}>
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
                <div className="forum-link"><h4><Link to={`/explore/forum/${id}`}>Discussion Forum</Link></h4></div>
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