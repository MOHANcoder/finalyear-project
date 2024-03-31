import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';
import CourseEditorSideBar from './CourseEditorSideBar';
import '../styles/PageEditor.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPage, pageContentUpdated } from '../src/features/page/pageSlice';
import Loader from './Loader';
import { saveToCloud } from '../src/features/page/pageSlice';
import AlertBox from './AlertBox';

export default function PageEditor() {

    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
            ["link", "image", "video"],
            ["clean"],
        ],
    };

    const dispatch = useDispatch();
    const dataStatus = useSelector(state => state.page.status);
    const page = useSelector(state => state.page.data);
    const course = useSelector(state => state.course.data);
    const pageActionMessage = useSelector(state => state.page.message);

    useEffect(() => {
        if (dataStatus == 'idle') {
            if (page.id !== undefined) {
                dispatch(fetchPage(page.id));
            }
        }
    }, [dispatch, dataStatus]);

    return (
        <div style={{
            display: 'flex'
        }}>
            <CourseEditorSideBar />
            {dataStatus === 'succeeded' ?
                <div style={{
                    height: '94dvh',
                    width: '100%',
                    backgroundColor: 'white'
                }}>
                    {pageActionMessage !== null && pageActionMessage.message !== null
                    && <AlertBox
                        message={pageActionMessage.message}
                        type={pageActionMessage.success ? 'success' : 'failed'} />}
                    <div className="page-title">
                        <h2>{course.modules[page.moduleId].chapters[page.chapterId].pages[page.id].title ?? 'Page Title Goes Here'}</h2>
                    </div>
                    <div style={{
                        height: '85%',
                        border: '1px solid'
                    }}>
                        <ReactQuill style={{
                            height: '90%'
                        }} modules={modules}
                            theme="snow"
                            value={page.content}
                            onChange={(value) => dispatch(pageContentUpdated(value))}
                            placeholder="Content goes here..." />
                    </div>
                    <div className='bottom-ribbon' style={{
                        height: '50px',
                        border: '1px solid',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <div onClick={() => dispatch(saveToCloud())}>SAVE</div>
                    </div>
                </div> : 
                <div className='editor-place-holder'>
                    <h2>Create and select a Page to edit</h2>
                </div>}
        </div>
    );
}