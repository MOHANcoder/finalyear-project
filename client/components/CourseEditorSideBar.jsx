import ModuleAccordion from './ModuleAccordion';
import AlertBox from './AlertBox';
import '../styles/CourseEditorSideBar.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import {useMediaQuery} from 'react-responsive';

export default function CourseEditorSideBar() {
    const { id } = useParams();
    const courseActionMessage = useSelector(state => state.course.message);
    const [isClosed, setIsClosed] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <>
            <div className={`courseEditorSideBar ${isMobile ? 'mobile' : ''} ${isClosed ? 'closed' : ''} ${isMobile && isClosed ? 'course-editor-sidebar-mobile-closed' : ''}`}>
                {courseActionMessage !== null && courseActionMessage.message !== null
                    && <AlertBox
                        message={courseActionMessage.message}
                        type={courseActionMessage.success ? 'success' : 'failed'} />}
                <ModuleAccordion courseId={id} />
            </div>
            <div className={`side-bar-divider ${isMobile ? 'mobile' : ''}`}>
                <div className="side-bar-close" onClick={() => setIsClosed(!isClosed)}>
                    {isClosed ? 'OPEN' : 'CLOSE'}
                </div>
            </div>
        </>
    )
}