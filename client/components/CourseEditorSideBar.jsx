import ModuleAccordion from './ModuleAccordion';
import AlertBox from './AlertBox';
import '../styles/CourseEditorSideBar.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function CourseEditorSideBar() {
    const { id } = useParams();
    const courseActionMessage = useSelector(state => state.course.message);
    const [isClosed, setIsClosed] = useState(false);

    return (
        <>
            <div className="courseEditorSideBar" style={{
                width: isClosed ? '0dvw' : '35dvw',
                height: '94dvh',
                overflowY: 'scroll'
            }}>
                {courseActionMessage !== null && courseActionMessage.message !== null
                    && <AlertBox
                        message={courseActionMessage.message}
                        type={courseActionMessage.success ? 'success' : 'failed'} />}
                <ModuleAccordion courseId={id} />
            </div>
            <div className="side-bar-divider">
                <div className="side-bar-close" onClick={() => setIsClosed(!isClosed)}>
                    {isClosed ? 'OPEN' : 'CLOSE'}
                </div>
            </div>
        </>
    )
}